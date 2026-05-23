'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { ChatMessage } from '@/lib/chatbot/types';
import { findBestResponse } from '@/lib/chatbot/match-response';
import ChatbotMessage from './ChatbotMessage';
import ChatbotTypingIndicator from './ChatbotTypingIndicator';
import ChatbotLeadForm from './ChatbotLeadForm';

const SESSION_KEY = 'chatbot_messages';
const GREETING =
  'Hallo! Ich bin der digitale Assistent von APOS Legal. Wie kann ich Ihnen helfen? Sie koennen mir Ihre Frage zu Kuendigung, Abfindung oder Arbeitsrecht einfach hier schreiben.';

const SUGGESTIONS = [
  'Ich wurde gekuendigt — was soll ich tun?',
  'Habe ich Anspruch auf eine Abfindung?',
  'Was kostet ein Anwalt?',
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function loadMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveMessages(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {}
}

interface Props {
  onClose: () => void;
}

export default function ChatbotPanel({ onClose }: Props) {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  // Load from session on mount
  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
      setMessageCount(stored.filter((m) => m.role === 'user').length);
    } else {
      setMessages([{ id: uid(), role: 'bot', text: GREETING }]);
    }
    setInitialized(true);
  }, []);

  // Persist messages
  useEffect(() => {
    if (initialized) saveMessages(messages);
  }, [messages, initialized]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showLeadForm]);

  // Focus input on open
  useEffect(() => {
    if (initialized) inputRef.current?.focus();
  }, [initialized]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = { id: uid(), role: 'user', text: trimmed };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setMessageCount((c) => c + 1);

    // Keyword-Matching
    const result = findBestResponse(trimmed);

    // Tipp-Animation: 600ms–1400ms je nach Antwortlaenge
    const delay = Math.min(600 + result.response.length * 3, 1400);

    setTimeout(() => {
      let responseText = result.response;

      // Tool-Link als Text anfuegen
      if (result.toolLink) {
        responseText += `\n\n→ ${result.toolLink.label}`;
      }

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'bot', text: responseText },
      ]);
      setIsTyping(false);
      inputRef.current?.focus();

      // Nach 3 Nachrichten: Lead-Formular vorschlagen
      if (messageCount + 1 >= 3 && !showLeadForm) {
        setMessages((prevMsgs) => {
          if (prevMsgs.some((m) => m.isLeadForm || m.isLeadSuccess)) return prevMsgs;
          return [
            ...prevMsgs,
            {
              id: uid(),
              role: 'bot',
              text: 'Moechten Sie, dass Fachanwalt Fatih Bektas Ihre Situation persoenlich einschaetzt? Die Ersteinschaetzung ist kostenlos. Hinterlassen Sie einfach Ihre Kontaktdaten.',
              isLeadForm: true,
            },
          ];
        });
        setShowLeadForm(true);
      }
    }, delay);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleSuggestion(text: string) {
    sendMessage(text);
  }

  async function handleLeadSubmit(data: { name: string; email: string; phone: string }) {
    setLeadLoading(true);

    const summary = messages
      .filter((m) => !m.isLeadForm && !m.isLeadSuccess)
      .map((m) => `${m.role === 'bot' ? 'Bot' : 'Nutzer'}: ${m.text}`)
      .join('\n\n');

    try {
      await fetch('/api/chatbot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          chatSummary: summary,
          topicCategory: 'Chat-Gespraech',
          pageUrl: pathname,
        }),
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }

    setLeadLoading(false);
    setShowLeadForm(false);

    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: 'bot',
        text: `Vielen Dank, ${data.name}! Fachanwalt Fatih Bektas wird sich in Kuerze bei Ihnen melden. Haben Sie in der Zwischenzeit weitere Fragen?`,
        isLeadSuccess: true,
      },
    ]);
  }

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <div className="fixed bottom-[80px] right-4 md:right-6 z-[60] w-[calc(100vw-32px)] md:w-[380px] max-h-[70vh] md:max-h-[520px] flex flex-col bg-cream border border-border rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] animate-[chatbotSlideUp_0.2s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-ink rounded-t-xl shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green" />
          <span className="text-white text-[0.88rem] font-semibold font-sans">
            APOS Legal Assistent
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Chat schliessen"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((msg, i) => {
          const isFirstBot = msg.role === 'bot' && !messages.slice(0, i).some((m) => m.role === 'bot');
          return <ChatbotMessage key={msg.id} message={msg} isFirstBot={isFirstBot} />;
        })}
        {isTyping && <ChatbotTypingIndicator />}
        {showLeadForm && !messages.some((m) => m.isLeadSuccess) && (
          <ChatbotLeadForm onSubmit={handleLeadSubmit} loading={leadLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only at start) */}
      {showSuggestions && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              className="text-[0.78rem] px-3 py-1.5 bg-white border border-border rounded-full text-ink-light hover:border-gold hover:text-gold-dark transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-border shrink-0 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ihre Frage eingeben..."
          disabled={isTyping}
          className="flex-1 py-2.5 px-3 border border-border rounded-lg font-sans text-[0.85rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gold-dark text-white transition-colors hover:bg-[#635428] disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Nachricht senden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
