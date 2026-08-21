import { apiPost, ApiNotConfiguredError } from '@/lib/api';
import { hasBackend } from '@/config/site';
import {
  fallbackResponse,
  greetingResponse,
  knowledgeBase,
  pricingResponse,
  qualifyingQuestions,
  type KnowledgeEntry,
} from './assistantKnowledge';

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  /** Optional deep link offered alongside the answer. */
  link?: { href: string; label: string };
  /** Follow-up prompts the visitor can tap. */
  suggestions?: string[];
}

export interface AssistantReply {
  text: string;
  link?: { href: string; label: string };
  suggestions?: string[];
}

const PRICING_TERMS = [
  'price',
  'pricing',
  'cost',
  'costs',
  'quote',
  'budget',
  'rate',
  'rates',
  'how much',
  'fee',
  'fees',
  'estimate',
  'expensive',
  'charge',
];

const GREETING_TERMS = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];

const normalise = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, ' ');

/** Simple keyword overlap score. Deterministic and cheap — no model required. */
function scoreEntry(entry: KnowledgeEntry, query: string): number {
  const haystack = ` ${query} `;
  let score = 0;

  for (const keyword of entry.keywords) {
    const term = keyword.trim();
    if (!term) continue;

    if (term.includes(' ')) {
      // Multi-word keywords are strong signals when they match exactly.
      if (haystack.includes(` ${term} `)) score += term.split(' ').length * 3;
    } else if (term.length > 2 && haystack.includes(` ${term} `)) {
      score += 2;
    }
  }

  return score;
}

/**
 * Local responder.
 *
 * Answers strictly from the site's own structured content. It is deliberately
 * conservative: below a confidence threshold it says it does not know and
 * routes to a human rather than producing a plausible-sounding guess.
 */
export function answerLocally(input: string, isFirstUserMessage: boolean): AssistantReply {
  const query = normalise(input);

  if (PRICING_TERMS.some((term) => query.includes(term))) {
    return {
      text: pricingResponse,
      link: { href: '/contact', label: 'Start a scoping conversation' },
      suggestions: qualifyingQuestions.slice(0, 2),
    };
  }

  if (isFirstUserMessage && GREETING_TERMS.some((term) => query.trim().startsWith(term))) {
    return {
      text: greetingResponse,
      suggestions: ['What services do you offer?', 'Do you build blockchain systems?'],
    };
  }

  const ranked = knowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  // Threshold: one weak single-word hit is not enough to answer confidently.
  if (!best || best.score < 3) {
    return {
      text: fallbackResponse,
      link: { href: '/contact', label: 'Ask an engineer' },
      suggestions: ['What services do you offer?', 'How do engagements start?'],
    };
  }

  const suggestions = ranked
    .slice(1, 3)
    .map((item) => item.entry.linkLabel)
    .filter((label): label is string => Boolean(label));

  return {
    text: best.entry.answer,
    ...(best.entry.href && best.entry.linkLabel
      ? { link: { href: best.entry.href, label: best.entry.linkLabel } }
      : {}),
    ...(suggestions.length > 0 ? { suggestions } : {}),
  };
}

/**
 * Produces a reply, preferring the backend when one is configured.
 *
 * The request carries only the conversation. No provider key is present in
 * this bundle — the backend holds the credential and calls the model:
 *
 *   browser → /assistant on our API → model provider
 *
 * If the backend is unreachable the local responder takes over, so the
 * assistant degrades to a narrower but still truthful mode rather than
 * failing outright.
 */
export async function getAssistantReply(
  history: AssistantMessage[],
  input: string,
  signal?: AbortSignal,
): Promise<AssistantReply> {
  const isFirstUserMessage = !history.some((message) => message.role === 'user');

  if (!hasBackend) return answerLocally(input, isFirstUserMessage);

  try {
    const response = await apiPost<AssistantReply>(
      '/assistant',
      {
        message: input,
        history: history.map(({ role, text }) => ({ role, text })),
      },
      { signal, timeoutMs: 20000 },
    );

    if (!response?.text) throw new Error('Empty response from assistant endpoint.');
    return response;
  } catch (error) {
    if (error instanceof ApiNotConfiguredError) {
      return answerLocally(input, isFirstUserMessage);
    }
    // Network or server failure: fall back rather than showing an error state
    // for a question the local responder can very likely handle.
    return answerLocally(input, isFirstUserMessage);
  }
}
