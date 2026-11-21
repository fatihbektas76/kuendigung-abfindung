'use client';

import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/lib/seo-config';
import { trackCta, type LandingVariant } from '@/lib/landing/track';

/**
 * Sticky Click-to-Call-Bar am unteren Bildschirmrand.
 *
 * NUR auf Mobile sichtbar (md:hidden). 88 % des Legal-Traffics kommt mobil
 * (Unbounce 2025); eine Above-the-fold sichtbare Call-Bar kann die mobile
 * Conversion laut CXL deutlich steigern. Desktop-User haben die Nummer
 * bereits in der Topbar.
 */
export default function LandingStickyCall({
  variant,
  reassurance = 'Rückruf in 2 h · werktags 9–18 Uhr',
}: {
  variant: LandingVariant;
  reassurance?: string;
}) {
  return (
    <a
      href={PHONE_TEL_HREF}
      onClick={() => trackCta(variant, 'tel')}
      data-track="landing_sticky_call"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-2 bg-[#6B6626] px-4 py-3 text-white no-underline shadow-[0_-6px_18px_rgba(0,0,0,0.12)] md:hidden"
      aria-label={`Jetzt anrufen: ${PHONE_DISPLAY}`}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </span>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-[0.95rem] font-semibold">Jetzt anrufen</span>
        <span className="text-[0.72rem] text-white/80">{reassurance}</span>
      </div>
    </a>
  );
}
