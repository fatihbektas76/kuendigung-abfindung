'use client';

import { useState, useEffect } from 'react';
import ChatbotPanel from './ChatbotPanel';

const SESSION_OPEN_KEY = 'chatbot_open';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(SESSION_OPEN_KEY);
      if (stored === 'true') setIsOpen(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        sessionStorage.setItem(SESSION_OPEN_KEY, String(isOpen));
      } catch {}
    }
  }, [isOpen, mounted]);

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <ChatbotPanel onClose={() => setIsOpen(false)} />
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 md:right-6 z-[60] w-14 h-14 rounded-full bg-gold-dark text-white shadow-[0_4px_16px_rgba(166,139,75,0.35)] transition-all hover:bg-[#635428] hover:shadow-[0_6px_20px_rgba(166,139,75,0.45)] hover:-translate-y-0.5 flex items-center justify-center"
        aria-label={isOpen ? 'Chat schliessen' : 'Chat oeffnen'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
