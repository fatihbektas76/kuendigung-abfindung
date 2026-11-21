'use client';

import { BOOKING } from '@/lib/booking';
import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/lib/seo-config';
import { trackCta, type LandingVariant } from '@/lib/landing/track';

type Props = {
  variant: LandingVariant;
  /** Anchor-Id des Inline-Formulars auf der gleichen Seite. */
  formAnchor?: string;
};

export default function LandingCTACluster({ variant, formAnchor = 'anfrage' }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {/* Primär – Formular */}
      <a
        href={`#${formAnchor}`}
        onClick={() => trackCta(variant, 'form')}
        data-track="landing_cta_form"
        className="group flex flex-col items-start justify-between rounded-xl bg-[#6B6626] p-5 text-left text-white no-underline shadow-[0_8px_24px_rgba(107,102,38,0.25)] transition-transform hover:-translate-y-0.5"
      >
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4l-10 8L2 4" />
          </svg>
        </span>
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            Empfohlen
          </div>
          <div className="mt-1 font-serif text-[1.15rem] font-semibold leading-tight">
            Kostenlose Ersteinschätzung
          </div>
          <div className="mt-1 text-[0.85rem] text-white/80">
            Formular ausfüllen — Rückmeldung in der Regel in 24 Stunden.
          </div>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-white">
          Formular ausfüllen
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>

      {/* Sekundär – Termin buchen */}
      <a
        href={BOOKING.firstCheck}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta(variant, 'booking')}
        data-track="landing_cta_booking"
        className="group flex flex-col items-start justify-between rounded-xl border border-[#d4c98a] bg-[#f9f6ec] p-5 text-left text-[#4a4318] no-underline transition-transform hover:-translate-y-0.5"
      >
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6B6626]/10 text-[#6B6626]">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8B7A3A]">
            Fester Termin
          </div>
          <div className="mt-1 font-serif text-[1.15rem] font-semibold leading-tight">
            Telefontermin buchen
          </div>
          <div className="mt-1 text-[0.85rem] text-[#5a5020]">
            Selbst einen Slot im Kalender von Fatih Bektas wählen.
          </div>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-[#6B6626]">
          Termin wählen
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>

      {/* Tertiär – Anrufen */}
      <a
        href={PHONE_TEL_HREF}
        onClick={() => trackCta(variant, 'tel')}
        data-track="landing_cta_tel"
        className="group flex flex-col items-start justify-between rounded-xl border border-black/10 bg-white p-5 text-left text-[#1f1f1f] no-underline transition-transform hover:-translate-y-0.5"
      >
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#6B6626]">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        </span>
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/50">
            Direkt
          </div>
          <div className="mt-1 font-serif text-[1.15rem] font-semibold leading-tight">
            Jetzt anrufen
          </div>
          <div className="mt-1 text-[0.85rem] text-black/60">
            Werktags 9–18 Uhr erreichbar.
          </div>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-[#6B6626]">
          {PHONE_DISPLAY}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
  );
}
