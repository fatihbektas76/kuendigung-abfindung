'use client';

import { useEffect, useRef, useState, FormEvent, useMemo } from 'react';
import { readAttribution, formatAttributionLines, type LandingAttribution } from '@/lib/landing/utm';
import { trackCta, type LandingVariant } from '@/lib/landing/track';
import { BOOKING } from '@/lib/booking';
import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/lib/seo-config';

type Props = {
  variant: LandingVariant;
  /** Vorbefüllter `disputeType`-Wert, den wir an `/api/contact` senden. */
  disputeType: string;
  /** Anchor für CTA-Scrolltargets. */
  anchor?: string;
};

/**
 * 3-Feld-Lead-Formular mit Fristen-Einschätzung nach § 193 BGB.
 *
 * Felder: Name, Handy, Kündigungsdatum. Email + Freitext wandern in einen
 * zweiten optionalen Step — den aktivieren wir erst in einer späteren
 * Iteration, wenn Daten zur Drop-off-Rate vorliegen.
 *
 * Die Fristen-Einschätzung ist bewusst konservativ: wir nennen ein
 * voraussichtliches Datum (Kündigungsdatum + 21 Tage) und weisen aus, dass
 * § 193 BGB bei Wochenende oder gesetzlichem Feiertag auf den nächsten
 * Werktag verlängert. Die exakte Berechnung übernimmt der Erstkontakt.
 */
export default function LandingShortForm({
  variant,
  disputeType,
  anchor = 'anfrage',
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kuendigungDate, setKuendigungDate] = useState<string>('');
  const attribRef = useRef<LandingAttribution | null>(null);

  useEffect(() => {
    attribRef.current = readAttribution();
  }, []);

  const fristInfo = useMemo(() => computeFrist(kuendigungDate), [kuendigungDate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get('website')) {
      // Honeypot – sauber abschließen ohne tatsächlichen Versand
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const attrib = attribRef.current ?? readAttribution();
    const attribLines = formatAttributionLines(attrib);

    const phone = String(formData.get('phone') ?? '').trim();
    const name = String(formData.get('name') ?? '').trim();
    const dateStr = String(formData.get('kuendigungDate') ?? '').trim();
    const userEmail = String(formData.get('email') ?? '').trim();
    // `/api/contact` verlangt eine E-Mail — wenn der User keine angegeben
    // hat, nutzen wir eine Platzhalter-Adresse. Der Lead geht via
    // Telegram-Alert mit Name + Handy + Nachricht zuverlässig raus.
    const effectiveEmail = userEmail || `landing+${variant}@gekuendigt-abfindung.de`;

    const messageLines = [
      `Zugang der Kündigung: ${dateStr || 'nicht angegeben'}`,
      fristInfo.messageForBackend,
      attribLines ? `\n---\n[Landing-Attribution] ${attribLines}` : '',
    ].filter(Boolean);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: effectiveEmail,
          phone,
          disputeType,
          message: messageLines.join('\n'),
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
      <section id={anchor} className="scroll-mt-24 rounded-xl border border-[#d4c98a] bg-[#f9f6ec] p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B6626] text-white">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-[1.25rem] font-bold text-[#4a4318]">
              Wir melden uns innerhalb von 2&nbsp;Stunden (werktags 9–18 Uhr).
            </h2>
            <p className="mt-2 max-w-[560px] text-[0.95rem] text-[#5a5020]">
              Außerhalb dieser Zeiten: Rückruf am nächsten Werktag frühzeitig. Wenn es
              besonders eilt, buchen Sie direkt einen Telefon-Slot oder rufen Sie an.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <a
            href={BOOKING.firstCheck}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta(variant, 'booking')}
            data-track="landing_thanks_booking"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#6B6626] px-5 py-3 text-[0.95rem] font-semibold text-white no-underline hover:bg-[#8B7A3A]"
          >
            Telefontermin direkt buchen →
          </a>
          <a
            href={PHONE_TEL_HREF}
            onClick={() => trackCta(variant, 'tel')}
            data-track="landing_thanks_tel"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#6B6626] bg-white px-5 py-3 text-[0.95rem] font-semibold text-[#6B6626] no-underline hover:bg-[#f9f6ec]"
          >
            Jetzt anrufen: {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id={anchor}
      className="scroll-mt-24 rounded-xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(107,102,38,0.08)] md:p-7"
    >
      <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8B7A3A]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#6B6626]" aria-hidden="true" />
        Kostenlose Ersteinschätzung
      </div>
      <h2 className="mt-1 font-serif text-[clamp(1.3rem,2.4vw,1.6rem)] font-bold leading-tight text-ink">
        Rückruf in 2 Stunden — werktags 9–18 Uhr
      </h2>
      <p className="mt-1.5 text-[0.9rem] text-ink-light">
        Drei Pflichtangaben. Fatih Bektas meldet sich persönlich.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4" noValidate>
        {/* Honeypot für Bots */}
        <label className="hidden" aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="block text-[0.85rem] font-medium text-ink">
          Ihr Name
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
        </label>

        <label className="block text-[0.85rem] font-medium text-ink">
          Handynummer für den Rückruf
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="z. B. 0151 1234567"
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
        </label>

        <label className="block text-[0.85rem] font-medium text-ink">
          E-Mail <span className="text-ink-muted font-normal">(optional)</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Falls wir Sie telefonisch nicht erreichen"
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
        </label>

        <label className="block text-[0.85rem] font-medium text-ink">
          Datum der Kündigung (Zugang)
          <input
            type="date"
            name="kuendigungDate"
            required
            value={kuendigungDate}
            onChange={(e) => setKuendigungDate(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-[#6B6626] focus:ring-2 focus:ring-[#6B6626]/20"
          />
          <span className="mt-1 block text-[0.75rem] font-normal leading-relaxed text-ink-muted">
            Maßgeblich ist der Zugang (§&nbsp;130 BGB) — also der Einwurf in Ihren
            Briefkasten oder die persönliche Übergabe, <strong>nicht</strong> der Tag,
            an dem Sie die Kündigung tatsächlich gelesen haben. Bei Briefkasten-Einwurf
            nach üblicher Leerungszeit zählt häufig erst der nächste Werktag.
          </span>
        </label>

        {fristInfo.kind !== 'idle' && (
          <div
            className={
              fristInfo.kind === 'expired'
                ? 'rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[0.88rem] leading-relaxed text-red-800'
                : 'rounded-md border border-[#d4c98a] bg-[#f9f6ec] px-4 py-3 text-[0.88rem] leading-relaxed text-[#4a4318]'
            }
            role="status"
          >
            <strong className="block">{fristInfo.headline}</strong>
            <span className="mt-1 block text-[0.82rem] opacity-90">{fristInfo.detail}</span>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] text-red-800" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#6B6626] px-6 py-3.5 text-[0.98rem] font-semibold text-white shadow-sm transition-colors hover:bg-[#8B7A3A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Wird gesendet…' : 'Jetzt kostenlose Ersteinschätzung anfordern'}
        </button>

        <p className="text-[0.72rem] leading-relaxed text-ink-muted">
          Ihre Daten werden ausschließlich für die Kontaktaufnahme verarbeitet.
          Details in der{' '}
          <a href="/privacy-policy/" className="underline underline-offset-2">Datenschutzerklärung</a>.
          Keine Weitergabe an Dritte, kein Newsletter.
        </p>
      </form>
    </section>
  );
}

// ─── Fristen-Logik ───────────────────────────────────────────────────────────

type FristInfo = {
  kind: 'idle' | 'ok' | 'tight' | 'expired';
  headline: string;
  detail: string;
  messageForBackend: string;
};

/**
 * Berechnet eine konservative Fristen-Einschätzung nach § 4 KSchG i.V.m.
 * §§ 187 ff. BGB. Hinweis auf § 193 BGB (Wochenende/Feiertag → nächster
 * Werktag) ist Teil des Textes — eine exakte, bundeslandabhängige
 * Feiertagsprüfung machen wir bewusst nicht auf dem Client, weil sie
 * ohne Angabe des zuständigen Arbeitsgerichts juristisch ungenau wäre.
 */
function computeFrist(dateStr: string): FristInfo {
  if (!dateStr) {
    return {
      kind: 'idle',
      headline: '',
      detail: '',
      messageForBackend: 'Fristen-Check: kein Datum angegeben.',
    };
  }
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return {
      kind: 'idle',
      headline: '',
      detail: '',
      messageForBackend: 'Fristen-Check: ungültiges Datum.',
    };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);

  // Frist = Zugang + 21 Tage (§ 4 KSchG, §§ 187 I, 188 II BGB)
  const deadline = new Date(parsed);
  deadline.setDate(parsed.getDate() + 21);

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.round((deadline.getTime() - today.getTime()) / msPerDay);

  const formatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const deadlineStr = formatter.format(deadline);

  const bgb193 =
    '§ 193 BGB: fällt das Fristende auf Samstag, Sonntag oder gesetzlichen Feiertag Ihres Bundeslands, verlängert sich die Frist auf den nächsten Werktag.';

  if (daysLeft < 0) {
    return {
      kind: 'expired',
      headline: 'Ihre 3-Wochen-Frist ist voraussichtlich bereits abgelaufen.',
      detail:
        `Berechnete Frist: ${deadlineStr}. In engen Ausnahmefällen ist eine nachträgliche Klagezulassung nach § 5 KSchG möglich — wir prüfen das kurzfristig. ${bgb193}`,
      messageForBackend: `Fristen-Check: voraussichtlich ABGELAUFEN (Ende ${deadlineStr}, ${Math.abs(daysLeft)} Tage her).`,
    };
  }

  if (daysLeft <= 7) {
    return {
      kind: 'tight',
      headline: `Ihre Klagefrist läuft voraussichtlich am ${deadlineStr} ab.`,
      detail:
        `Das sind noch ${daysLeft} Tag(e). Bitte heute Kontakt aufnehmen — Fristen im Arbeitsrecht sind hart. ${bgb193}`,
      messageForBackend: `Fristen-Check: KNAPP (Ende ${deadlineStr}, noch ${daysLeft} Tage).`,
    };
  }

  return {
    kind: 'ok',
    headline: `Ihre Klagefrist läuft voraussichtlich am ${deadlineStr} ab.`,
    detail: `Das sind noch ${daysLeft} Tage. Die exakte Frist berechnen wir im Erstkontakt. ${bgb193}`,
    messageForBackend: `Fristen-Check: offen (Ende ${deadlineStr}, noch ${daysLeft} Tage).`,
  };
}
