import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Minimal typing for the Web Speech API, which is not in the DOM lib and is
 * still vendor-prefixed in Chromium.
 */
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

/**
 * Voice input via browser speech recognition.
 *
 * `supported` is false wherever the API is unavailable — Firefox and most
 * mobile browsers — and the UI hides the microphone entirely in that case
 * rather than offering a control that cannot work.
 */
export function useSpeechInput(onTranscript: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const callbackRef = useRef(onTranscript);

  callbackRef.current = onTranscript;

  useEffect(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;

    setSupported(true);
    const recognition = new Ctor();
    recognition.lang = 'en-GB';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) callbackRef.current(transcript);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setError(
        event.error === 'not-allowed'
          ? 'Microphone access was blocked. Type your question instead.'
          : 'Voice input did not work. Type your question instead.',
      );
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.stop();
      } catch {
        /* already stopped */
      }
    };
  }, []);

  const toggle = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    setError(null);

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    try {
      recognition.start();
      setListening(true);
    } catch {
      // start() throws if called while already running; treat as a no-op.
      setListening(false);
    }
  }, [listening]);

  return { supported, listening, error, toggle } as const;
}
