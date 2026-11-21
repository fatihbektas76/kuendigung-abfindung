'use client';

import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/lib/seo-config';
import { trackCta, type LandingVariant } from '@/lib/landing/track';

type Props = {
  variant: LandingVariant;
};

export default function LandingTopbar({ variant }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        <Link
          href="https://apos.legal/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-[1.05rem] font-semibold tracking-tight text-[#6B6626] no-underline hover:opacity-80"
          aria-label="APOS Legal — Kanzlei-Website öffnen"
        >
          APOS&nbsp;Legal
          <span className="ml-2 align-middle text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#8B7A3A]">
            Fachanwalt für Arbeitsrecht
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-right text-[0.72rem] leading-tight text-ink-muted md:block">
            Rückruf in 2&nbsp;Std.
            <br />
            werktags 9–18 Uhr
          </span>
          <a
            href={PHONE_TEL_HREF}
            onClick={() => trackCta(variant, 'tel')}
            data-track="landing_tel_topbar"
            className="inline-flex items-center gap-2 rounded-full bg-[#6B6626] px-4 py-2 text-[0.85rem] font-semibold text-white no-underline shadow-sm transition-colors hover:bg-[#8B7A3A]"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="max-sm:hidden">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Anrufen</span>
          </a>
        </div>
      </div>
    </header>
  );
}
