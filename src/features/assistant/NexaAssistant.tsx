import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ArrowRight, Mic, MessageSquare, Send, X } from 'lucide-react';
import { getAssistantReply, type AssistantMessage } from './assistantEngine';
import { useSpeechInput } from './useSpeechInput';
import { greetingResponse } from './assistantKnowledge';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion, zIndex } from '@/theme/tokens';
import { visuallyHidden } from '@/theme/a11y';

const STARTERS = [
  'What services do you offer?',
  'Do you build blockchain systems?',
  'How much does a project cost?',
  'How do engagements start?',
];

let messageCounter = 0;
const nextId = () => `msg-${(messageCounter += 1)}`;

/**
 * Nexa — the website assistant.
 *
 * Scoped deliberately: it answers from the site's own content, qualifies
 * enquiries, and routes anything it cannot substantiate to a human. It never
 * quotes a price, never claims a client result, and never names a capability
 * the site does not list.
 *
 * No provider credential exists in this bundle. When an API base URL is
 * configured the conversation is sent to our own backend, which holds the key
 * and talks to the model; otherwise a local responder answers from structured
 * site content.
 */
export function NexaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const speech = useSpeechInput((transcript) => {
    setInput(transcript);
    inputRef.current?.focus();
  });

  // Seed the greeting the first time the panel is opened, not on page load.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: 'assistant', text: greetingResponse }]);
    }
  }, [open, messages.length]);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    if (!open) return;
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) {
      // Focus the input so a keyboard user can type immediately.
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  // Escape closes the panel and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || thinking) return;

      const userMessage: AssistantMessage = { id: nextId(), role: 'user', text };
      const history = messages;

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setThinking(true);

      try {
        const reply = await getAssistantReply(history, text);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            text: reply.text,
            ...(reply.link ? { link: reply.link } : {}),
            ...(reply.suggestions ? { suggestions: reply.suggestions } : {}),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            text: 'Something went wrong answering that. The contact form reaches an engineer directly.',
            link: { href: '/contact', label: 'Contact us' },
          },
        ]);
      } finally {
        setThinking(false);
      }
    },
    [messages, thinking],
  );

  return (
    <>
      {/* -------------------------------------------------------- Launcher */}
      <Box
        component="button"
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="nexa-panel"
        aria-label={open ? 'Close the Nexa assistant' : 'Open Nexa, the website assistant'}
        data-color-scheme="dark"
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 24 },
          bottom: `calc(env(safe-area-inset-bottom) + ${open ? 16 : 20}px)`,
          zIndex: zIndex.assistant,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          height: 52,
          px: 2.25,
          border: '1px solid',
          borderColor: 'hairlineStrong',
          borderRadius: '4px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.9375rem',
          fontWeight: 600,
          boxShadow: '0 12px 32px -8px rgba(0,0,0,0.6)',
          transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        {open ? (
          <X size={19} strokeWidth={2} aria-hidden="true" />
        ) : (
          <MessageSquare size={19} strokeWidth={2} aria-hidden="true" />
        )}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          {open ? 'Close' : 'Ask Nexa'}
        </Box>
      </Box>

      {/* ----------------------------------------------------------- Panel */}
      <Box
        id="nexa-panel"
        ref={panelRef}
        role="dialog"
        aria-label="Nexa assistant"
        aria-modal="false"
        {...(!open ? { inert: true } : {})}
        data-color-scheme="dark"
        sx={{
          position: 'fixed',
          right: { xs: 8, md: 24 },
          left: { xs: 8, sm: 'auto' },
          bottom: `calc(env(safe-area-inset-bottom) + 84px)`,
          zIndex: zIndex.assistant,
          width: { xs: 'auto', sm: 400 },
          maxWidth: 'calc(100vw - 16px)',
          height: { xs: 'min(560px, calc(100dvh - 160px))', sm: 560 },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'hairlineStrong',
          borderRadius: '8px',
          boxShadow: '0 28px 64px -20px rgba(0,0,0,0.75)',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
          transformOrigin: 'bottom right',
          transition: reducedMotion
            ? 'none'
            : `opacity ${motion.duration.base}ms ${motion.easing.standard}, transform ${motion.duration.base}ms ${motion.easing.standard}, visibility 0s linear ${open ? '0s' : `${motion.duration.base}ms`}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'hairline',
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography variant="h5" component="h2">
              Nexa
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Big Block Technologies assistant
            </Typography>
          </Box>
          <IconButton
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close the assistant"
            sx={{ mr: -1 }}
          >
            <X size={19} strokeWidth={1.75} aria-hidden="true" />
          </IconButton>
        </Box>

        {/* Conversation */}
        <Box
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation with Nexa"
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2.5,
            py: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '92%',
              }}
            >
              <Box
                sx={{
                  px: 1.75,
                  py: 1.5,
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: message.role === 'user' ? 'transparent' : 'hairline',
                  bgcolor: message.role === 'user' ? 'primary.main' : 'surfaceRaised',
                  color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {message.text}
                </Typography>

                {message.link && (
                  <Button
                    component={RouterLink}
                    to={message.link.href}
                    onClick={() => setOpen(false)}
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowRight size={14} strokeWidth={2} aria-hidden="true" />}
                    sx={{ mt: 1.5 }}
                  >
                    {message.link.label}
                  </Button>
                )}
              </Box>

              {message.suggestions && message.suggestions.length > 0 && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {message.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      onClick={() => void send(suggestion)}
                      variant="outlined"
                      size="small"
                      sx={{ minHeight: 34, fontSize: '0.8125rem', fontWeight: 400 }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}

          {messages.length === 1 && !thinking && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: -0.5 }}>
              {STARTERS.map((starter) => (
                <Button
                  key={starter}
                  onClick={() => void send(starter)}
                  variant="outlined"
                  size="small"
                  sx={{ minHeight: 34, fontSize: '0.8125rem', fontWeight: 400 }}
                >
                  {starter}
                </Button>
              ))}
            </Box>
          )}

          {thinking && (
            <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: 0.75, px: 1.75, py: 1.5 }}>
              {[0, 1, 2].map((dot) => (
                <Box
                  key={dot}
                  aria-hidden="true"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'text.disabled',
                    animation: reducedMotion ? 'none' : 'nexaPulse 1.2s ease-in-out infinite',
                    animationDelay: `${dot * 0.15}s`,
                    '@keyframes nexaPulse': {
                      '0%, 100%': { opacity: 0.25 },
                      '50%': { opacity: 1 },
                    },
                  }}
                />
              ))}
              <Box component="span" sx={visuallyHidden}>
                Nexa is typing
              </Box>
            </Box>
          )}
        </Box>

        {speech.error && (
          <Typography
            variant="caption"
            role="status"
            sx={{ px: 2.5, pb: 1, color: 'warning.main', flexShrink: 0 }}
          >
            {speech.error}
          </Typography>
        )}

        {/* Composer */}
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            p: 2,
            borderTop: '1px solid',
            borderColor: 'hairline',
            flexShrink: 0,
          }}
        >
          <TextField
            inputRef={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about services, process or fit"
            aria-label="Message to Nexa"
            size="small"
            fullWidth
            multiline
            maxRows={3}
            slotProps={{ htmlInput: { enterKeyHint: 'send' } }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
          />

          {/* Rendered only where the browser actually supports recognition. */}
          {speech.supported && (
            <IconButton
              type="button"
              onClick={speech.toggle}
              aria-label={speech.listening ? 'Stop voice input' : 'Start voice input'}
              aria-pressed={speech.listening}
              sx={{ color: speech.listening ? 'brandAzure' : undefined, flexShrink: 0 }}
            >
              <Mic size={19} strokeWidth={1.75} aria-hidden="true" />
            </IconButton>
          )}

          <IconButton
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            sx={{
              flexShrink: 0,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark', color: 'primary.contrastText' },
              '&.Mui-disabled': { bgcolor: 'surfaceRaised', color: 'text.disabled' },
            }}
          >
            <Send size={17} strokeWidth={2} aria-hidden="true" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
