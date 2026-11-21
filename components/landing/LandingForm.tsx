'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { readAttribution, formatAttributionLines, type LandingAttribution } from '@/lib/landing/utm';
import { trackCta, type LandingVariant } from '@/lib/landing/track';

type Props = {
  variant: LandingVariant;
  /** Vorbefüllter `disputeType`-Wert, den wir an `/api/contact` senden. */
  disputeType: string;
  /** Headline oberhalb der Felder. */
  heading: string;
  /** Kurzer Subtext. */
  subheading: string;
  /** Anchor für die CTA-Buttons oben auf der Seite. */
  anchor?: string;
};

export default function LandingForm({
  variant,
  disputeType,
  heading,
  subheading,
  anchor = 'anfrage',
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attribRef = useRef<LandingAttribution | null>(null);

  useEffect(() => {
    attribRef.current = readAttribution();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot – ein echter Besucher kann das Feld nicht sehen / nicht ausfüllen.
    if (formData.get('website')) {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const attrib = attribRef.current ?? readAttribution();
    const attribLines = formatAttributionLines(attrib);
    const userMessage = String(formData.get('message') ?? '').trim();
    const combinedMessage = attribLines
      ? `${userMessage}\n\n---\n[Landing-Attribution] ${attribLines}`
      : userMessage;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          disputeType,
          message: combinedMessage,
          website: formData.get('website'),
        }),
      });
      if (!res.ok) throw new Error('bad_status');
      trackCta(variant, 'form_submitted');
      setSubmitted(true);
    } catch {
      setError(
        'Das Formular konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
      );
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id={anchor} className="scroll-mt-24 rounded-xl border border-[#d4c98a] bg-[#f9f6ec] p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#6B6626] text-white">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-[1.3rem] font-bold text-[#4a4318]">Danke — Nachricht ist da.</h2>
        <p className="mx-auto mt-2 max-w-[520px] text-[0.95rem] text-[#5a5020]">
          Sie erhalten in der Regel innerhalb von 24&nbsp;Stunden eine persönliche
          Ersteinschätzung per E-Mail oder Telefon.
        </p>
      </section>
    );
  }

  return (
    <section
      id={anchor}
      className="scroll-mt-24 rounded-xl border border-black/10 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8B7A3A]">
        Anfrage senden
      </div>
      <h2 className="mt-1 font-serif text-[clamp(1.4rem,2.6vw,1.8rem)] font-bold leading-tight text-ink">
        {heading}
      </h2>
      <p className="mt-2 max-w-[560px] text-[0.95rem] text-ink-light">{subheading}</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
        {/* Honeypot – visually hidden, stays reachable for bots only */}
        <label className="hidden" aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-[0.85rem] font-medium text-ink">
            Name
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
            />
          </label>
          <label className="block text-[0.85rem] font-medium text-ink">
            E-Mail
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
            />
          </label>
        </div>

        <label className="block text-[0.85rem] font-medium text-ink">
          Telefon (optional, für schnelleren Rückruf)
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
        </label>

        <label className="block text-[0.85rem] font-medium text-ink">
          Worum geht es?
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Was ist passiert? Datum der Kündigung, Betriebsgröße, kurze Beschreibung — so viel wie Sie wissen."
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
        </label>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] text-red-800" role="alert">
            {error}
          </div>
        )}

        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-[#6B6626] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-sm transition-colors hover:bg-[#8B7A3A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Wird gesendet…' : 'Jetzt kostenlose Ersteinschätzung anfordern'}
          </button>
          <p className="text-[0.75rem] text-ink-muted">
            Mit dem Absenden stimmen Sie unserer{' '}
            <a href="/privacy-policy/" className="underline underline-offset-2">Datenschutzerklärung</a> zu.
          </p>
        </div>
      </form>
    </section>
  );
}
