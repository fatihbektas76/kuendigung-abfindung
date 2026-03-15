'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      role="navigation"
      aria-label="Hauptnavigation"
    >
      <div className="max-w-content mx-auto px-8 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3.5 no-underline">
          <Image src="/logo.png" alt="gekuendigt-abfindung.de – Fachanwalt für Arbeitsrecht" width={140} height={48} className="h-10 w-auto" priority />
          <span className="inline-block text-[0.65rem] font-bold text-green bg-green-bg border-[1.5px] border-green/20 rounded px-2 py-0.5 tracking-wider uppercase whitespace-nowrap">
            Arbeitsrecht
          </span>
        </Link>

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer border-none bg-none p-1.5"
          aria-label="Menü öffnen"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
        </button>

        <ul
          className={`list-none flex items-center gap-8 ${
            menuOpen
              ? 'flex flex-col absolute top-[70px] left-0 right-0 bg-white border-b border-border py-5 px-8 gap-4 md:flex-row md:relative md:top-0 md:border-none md:py-0 md:px-0'
              : 'hidden md:flex'
          }`}
        >
          <li>
            <a href="/#leistungen" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Leistungen
            </a>
          </li>
          <li>
            <a href="/#ablauf" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Ablauf
            </a>
          </li>
          <li>
            <a href="/#faq" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              FAQ
            </a>
          </li>
          <li>
            <Link href="/team" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Unser Team
            </Link>
          </li>
          <li>
            <Link href="/abmahnung" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Abmahnung
            </Link>
          </li>
          <li>
            <Link href="/muster" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Muster
            </Link>
          </li>
          <li>
            <Link href="/urteile" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Urteile
            </Link>
          </li>
          <li>
            <Link href="/ratgeber" className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]">
              Ratgeber
            </Link>
          </li>
          <li>
            <a
              href="/#kontakt"
              className="bg-gold-dark text-white px-6 py-2.5 rounded-sm font-semibold text-[0.85rem] no-underline hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.2)] transition-all whitespace-nowrap"
            >
              Kostenlos prüfen →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
