'use client';

import Link from 'next/link';

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings: () => void }) {
  return (
    <footer className="pt-12 pb-8 px-8 bg-[#111] text-white/60 text-[0.82rem]">
      <div className="max-w-content mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-8 mb-8 pb-8 border-b border-white/10">
          <div>
            <div className="font-serif text-gold text-base font-semibold">gekuendigt-abfindung.de</div>
            <div className="mt-1">Am Paradeplatz 20 &middot; 69126 Heidelberg</div>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Ratgeber</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/abfindung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Abfindung
                </Link>
              </li>
              <li>
                <Link href="/kuendigung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Kündigung
                </Link>
              </li>
              <li>
                <Link href="/aufhebungsvertrag" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Aufhebungsvertrag
                </Link>
              </li>
              <li>
                <Link href="/abmahnung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Abmahnung
                </Link>
              </li>
              <li>
                <Link href="/ratgeber/muster" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Muster &amp; Vorlagen
                </Link>
              </li>
              <li>
                <Link href="/ratgeber/urteile" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Urteile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Nach Jahren</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/abfindung-nach-einem-jahr-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 1 Jahr
                </Link>
              </li>
              <li>
                <Link href="/abfindung-nach-fuenf-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 5 Jahren
                </Link>
              </li>
              <li>
                <Link href="/abfindung-nach-zehn-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 10 Jahren
                </Link>
              </li>
              <li>
                <Link href="/abfindung-nach-zwanzig-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 20 Jahren
                </Link>
              </li>
              <li>
                <Link href="/abfindung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Alle anzeigen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Gekündigt</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/gekuendigt-nach-einem-jahr-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 1 Jahr
                </Link>
              </li>
              <li>
                <Link href="/gekuendigt-nach-fuenf-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 5 Jahren
                </Link>
              </li>
              <li>
                <Link href="/gekuendigt-nach-zehn-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 10 Jahren
                </Link>
              </li>
              <li>
                <Link href="/gekuendigt-nach-zwanzig-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 20 Jahren
                </Link>
              </li>
              <li>
                <Link href="/kuendigung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Alle anzeigen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Fristlos</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/fristlose-kuendigung-nach-einem-jahr-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 1 Jahr
                </Link>
              </li>
              <li>
                <Link href="/fristlose-kuendigung-nach-fuenf-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 5 Jahren
                </Link>
              </li>
              <li>
                <Link href="/fristlose-kuendigung-nach-zehn-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 10 Jahren
                </Link>
              </li>
              <li>
                <Link href="/fristlose-kuendigung-nach-zwanzig-jahren-betriebszugehoerigkeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Nach 20 Jahren
                </Link>
              </li>
              <li>
                <Link href="/fristlose-kuendigung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Alle anzeigen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Situationen</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/kuendigung/kuendigung-schwangerschaft/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Schwangerschaft
                </Link>
              </li>
              <li>
                <Link href="/kuendigung/kuendigung-probezeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Probezeit
                </Link>
              </li>
              <li>
                <Link href="/kuendigung/kuendigung-wegen-krankheit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Wegen Krankheit
                </Link>
              </li>
              <li>
                <Link href="/kuendigung/kuendigung-schwerbehinderung/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Schwerbehinderung
                </Link>
              </li>
              <li>
                <Link href="/kuendigung" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Alle anzeigen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Aufhebungsvertrag</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/aufhebungsvertrag/aufhebungsvertrag-abfindung/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Abfindung
                </Link>
              </li>
              <li>
                <Link href="/aufhebungsvertrag/aufhebungsvertrag-sperrzeit/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Sperrzeit
                </Link>
              </li>
              <li>
                <Link href="/aufhebungsvertrag/aufhebungsvertrag-ablehnen/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Ablehnen
                </Link>
              </li>
              <li>
                <Link href="/aufhebungsvertrag/aufhebungsvertrag-widerruf/" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Widerruf
                </Link>
              </li>
              <li>
                <Link href="/aufhebungsvertrag" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Alle anzeigen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold text-[0.78rem] uppercase tracking-wider mb-2">Tools</div>
            <ul className="list-none flex flex-col gap-1.5">
              <li>
                <Link href="/abfindungsrechner" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Abfindungsrechner
                </Link>
              </li>
              <li>
                <Link href="/schwellenwert-rechner" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                  Schwellenwert-Rechner
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <ul className="list-none flex gap-6">
            <li>
              <Link href="/privacy-policy" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/legal-notice" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/ratgeber" className="text-white/60 no-underline hover:text-gold-light transition-colors">
                Ratgeber
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
                Cookie-Einstellungen
              </button>
            </li>
          </ul>
          <div>&copy; 2026 gekuendigt-abfindung.de — Ein Angebot der APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG</div>
        </div>
      </div>
    </footer>
  );
}
