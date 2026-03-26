'use client';

import Link from 'next/link';

const linkClass = 'text-white/50 no-underline hover:text-gold-light transition-colors';
const headingClass = 'text-white/90 font-semibold text-[0.75rem] uppercase tracking-[0.12em] mb-3';

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings: () => void }) {
  return (
    <footer className="pt-14 pb-8 px-8 bg-[#0f0f0f] text-[0.82rem] leading-relaxed max-md:px-6">
      <div className="max-w-content mx-auto">

        {/* ── Brand header ── */}
        <div className="flex justify-between items-start flex-wrap gap-6 mb-10 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="font-serif text-gold text-[1.1rem] font-semibold tracking-tight">
              APOS Legal
            </div>
            <div className="text-white/40 mt-1.5 text-[0.8rem]">
              Am Paradeplatz 20 &middot; 69126 Heidelberg
            </div>
            <div className="text-white/40 mt-0.5 text-[0.8rem]">
              Ein Angebot der APOS Legal Rechtsanwaltsgesellschaft mbH&nbsp;&amp;&nbsp;Co.&nbsp;KG
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/105863455"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 no-underline hover:text-gold-light transition-colors text-[0.8rem]"
            >
              LinkedIn
            </a>
            <span className="text-white/20">|</span>
            <Link href="/ratgeber" className="text-white/40 no-underline hover:text-gold-light transition-colors text-[0.8rem]">
              Ratgeber
            </Link>
          </div>
        </div>

        {/* ── Link grid — 4 columns, 2 rows ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-10 pb-10 border-b border-white/[0.08]">

          {/* Ratgeber */}
          <div>
            <div className={headingClass}>Ratgeber</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/abfindung" className={linkClass}>Abfindung</Link></li>
              <li><Link href="/kuendigung" className={linkClass}>Kündigung</Link></li>
              <li><Link href="/aufhebungsvertrag" className={linkClass}>Aufhebungsvertrag</Link></li>
              <li><Link href="/abmahnung" className={linkClass}>Abmahnung</Link></li>
              <li><Link href="/fristlose-kuendigung" className={linkClass}>Fristlose Kündigung</Link></li>
              <li><Link href="/ratgeber/muster" className={linkClass}>Muster &amp; Vorlagen</Link></li>
              <li><Link href="/ratgeber/urteile" className={linkClass}>Urteile</Link></li>
            </ul>
          </div>

          {/* Abfindung nach Jahren */}
          <div>
            <div className={headingClass}>Abfindung nach Jahren</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/abfindung-nach-einem-jahr-betriebszugehoerigkeit/" className={linkClass}>Nach 1 Jahr</Link></li>
              <li><Link href="/abfindung-nach-fuenf-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 5 Jahren</Link></li>
              <li><Link href="/abfindung-nach-zehn-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 10 Jahren</Link></li>
              <li><Link href="/abfindung-nach-zwanzig-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 20 Jahren</Link></li>
              <li><Link href="/abfindung" className={linkClass}>Alle anzeigen &rarr;</Link></li>
            </ul>
          </div>

          {/* Gekündigt nach Jahren */}
          <div>
            <div className={headingClass}>Gekündigt nach Jahren</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/gekuendigt-nach-einem-jahr-betriebszugehoerigkeit/" className={linkClass}>Nach 1 Jahr</Link></li>
              <li><Link href="/gekuendigt-nach-fuenf-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 5 Jahren</Link></li>
              <li><Link href="/gekuendigt-nach-zehn-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 10 Jahren</Link></li>
              <li><Link href="/gekuendigt-nach-zwanzig-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 20 Jahren</Link></li>
              <li><Link href="/kuendigung" className={linkClass}>Alle anzeigen &rarr;</Link></li>
            </ul>
          </div>

          {/* Fristlose Kündigung nach Jahren */}
          <div>
            <div className={headingClass}>Fristlos nach Jahren</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/fristlose-kuendigung-nach-einem-jahr-betriebszugehoerigkeit/" className={linkClass}>Nach 1 Jahr</Link></li>
              <li><Link href="/fristlose-kuendigung-nach-fuenf-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 5 Jahren</Link></li>
              <li><Link href="/fristlose-kuendigung-nach-zehn-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 10 Jahren</Link></li>
              <li><Link href="/fristlose-kuendigung-nach-zwanzig-jahren-betriebszugehoerigkeit/" className={linkClass}>Nach 20 Jahren</Link></li>
              <li><Link href="/fristlose-kuendigung" className={linkClass}>Alle anzeigen &rarr;</Link></li>
            </ul>
          </div>

          {/* Situationen */}
          <div>
            <div className={headingClass}>Situationen</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/kuendigung/kuendigung-schwangerschaft/" className={linkClass}>Schwangerschaft</Link></li>
              <li><Link href="/kuendigung/kuendigung-probezeit/" className={linkClass}>Probezeit</Link></li>
              <li><Link href="/kuendigung/kuendigung-wegen-krankheit/" className={linkClass}>Wegen Krankheit</Link></li>
              <li><Link href="/kuendigung/kuendigung-schwerbehinderung/" className={linkClass}>Schwerbehinderung</Link></li>
              <li><Link href="/kuendigung" className={linkClass}>Alle anzeigen &rarr;</Link></li>
            </ul>
          </div>

          {/* Aufhebungsvertrag */}
          <div>
            <div className={headingClass}>Aufhebungsvertrag</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/aufhebungsvertrag/aufhebungsvertrag-abfindung/" className={linkClass}>Abfindung</Link></li>
              <li><Link href="/aufhebungsvertrag/aufhebungsvertrag-sperrzeit/" className={linkClass}>Sperrzeit</Link></li>
              <li><Link href="/aufhebungsvertrag/aufhebungsvertrag-ablehnen/" className={linkClass}>Ablehnen</Link></li>
              <li><Link href="/aufhebungsvertrag/aufhebungsvertrag-widerruf/" className={linkClass}>Widerruf</Link></li>
              <li><Link href="/aufhebungsvertrag" className={linkClass}>Alle anzeigen &rarr;</Link></li>
            </ul>
          </div>

          {/* Tools & Rechner */}
          <div>
            <div className={headingClass}>Tools &amp; Rechner</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/abfindungsrechner" className={linkClass}>Abfindungsrechner</Link></li>
              <li><Link href="/schwellenwert-rechner" className={linkClass}>Schwellenwert-Rechner</Link></li>
              <li><Link href="/kuendigung-pruefen" className={linkClass}>Kündigung prüfen</Link></li>
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <div className={headingClass}>Standorte</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/arbeitsrecht-anwalt/berlin" className={linkClass}>Berlin</Link></li>
              <li><Link href="/arbeitsrecht-anwalt/hamburg" className={linkClass}>Hamburg</Link></li>
              <li><Link href="/arbeitsrecht-anwalt/muenchen" className={linkClass}>München</Link></li>
              <li><Link href="/arbeitsrecht-anwalt/heidelberg" className={linkClass}>Heidelberg</Link></li>
              <li><Link href="/arbeitsrecht-anwalt" className={linkClass}>Alle 106 Standorte &rarr;</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex justify-between items-center flex-wrap gap-4 text-[0.78rem] text-white/35">
          <ul className="list-none flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="text-white/35 no-underline hover:text-white/60 transition-colors">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/legal-notice" className="text-white/35 no-underline hover:text-white/60 transition-colors">
                Impressum
              </Link>
            </li>
            <li>
              <button
                onClick={onOpenCookieSettings}
                className="bg-transparent border-none text-white/35 text-[0.78rem] cursor-pointer p-0 hover:text-white/60 transition-colors"
              >
                Cookie-Einstellungen
              </button>
            </li>
          </ul>
          <div>&copy; {new Date().getFullYear()} gekuendigt-abfindung.de</div>
        </div>
      </div>
    </footer>
  );
}
