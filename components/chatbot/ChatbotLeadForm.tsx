'use client';

import { useState } from 'react';

const INPUT_CLASS =
  'w-full py-2.5 px-3 border border-border rounded-sm font-sans text-[0.85rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

interface Props {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
  loading: boolean;
}

export default function ChatbotLeadForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  }

  return (
    <div className="flex justify-start">
      <div className="w-full bg-white border border-border rounded-xl p-4">
        <p className="text-[0.82rem] font-semibold text-ink mb-3">
          Hinterlassen Sie Ihre Kontaktdaten fuer eine kostenlose Ersteinschaetzung:
        </p>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ihr Name *"
            required
            className={INPUT_CLASS}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre E-Mail *"
            required
            className={INPUT_CLASS}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon (optional)"
            className={INPUT_CLASS}
          />
          <button
            type="submit"
            disabled={loading || !name.trim() || !email.trim()}
            className="w-full py-2.5 bg-gold-dark text-white text-[0.85rem] font-semibold rounded-sm transition-colors hover:bg-[#635428] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Wird gesendet...' : 'Absenden'}
          </button>
          <p className="text-[0.72rem] text-ink-muted leading-tight">
            Mit dem Absenden stimmen Sie unserer{' '}
            <a href="/privacy-policy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
              Datenschutzerklärung
            </a>{' '}
            zu.
          </p>
        </form>
      </div>
    </div>
  );
}
