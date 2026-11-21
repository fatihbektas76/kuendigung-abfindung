import Link from 'next/link';
import { BRAND_NAME, LEGAL_NAME } from '@/lib/seo-config';

export default function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-black/10 bg-[#0f0f0f] py-8 text-[0.78rem] text-white/70">
      <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-3 px-6 md:flex-row md:items-center">
        <div>
          Ein Angebot von{' '}
          <a
            href="https://apos.legal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 underline underline-offset-2 hover:text-[#d4c98a]"
          >
            {BRAND_NAME}, Heidelberg
          </a>{' '}
          — {LEGAL_NAME}
        </div>
        <ul className="flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
          <li>
            <Link href="/legal-notice/" className="text-white/70 no-underline hover:text-white/90">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy/" className="text-white/70 no-underline hover:text-white/90">
              Datenschutz
            </Link>
          </li>
          <li>&copy; {year} gekuendigt-abfindung.de</li>
        </ul>
      </div>
    </footer>
  );
}
