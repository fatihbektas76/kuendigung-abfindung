'use client';

import Link from 'next/link';

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings: () => void }) {
  return (
    <footer className="pt-12 pb-8 px-8 bg-[#111] text-white/60 text-[0.82rem]">
      <div className="max-w-content mx-auto flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="font-serif text-gold text-base font-semibold">APOS Legal</div>
          <div className="mt-1">Am Paradeplatz 20 &middot; 69126 Heidelberg &middot; Germany</div>
        </div>
        <ul className="list-none flex gap-6">
          <li>
            <Link href="/privacy-policy" className="text-white/60 no-underline hover:text-gold-light transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/legal-notice" className="text-white/60 no-underline hover:text-gold-light transition-colors">
              Legal Notice
            </Link>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/105863455"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 no-underline hover:text-gold-light transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <button
              onClick={onOpenCookieSettings}
              className="bg-none border-none text-white/60 text-[0.82rem] cursor-pointer underline p-0 hover:text-gold-light transition-colors"
            >
              Cookie Settings
            </button>
          </li>
        </ul>
        <div>&copy; 2026 APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG. All rights reserved.</div>
      </div>
    </footer>
  );
}
