'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    window.addEventListener('scroll', closeMenu, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', closeMenu);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen, closeMenu]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto px-8 flex items-center justify-between h-[72px]">
        <Link href="/en/" className="flex items-center gap-3.5 no-underline">
          <Image
            src="/logo.png"
            alt="gekuendigt-abfindung.de — German employment lawyer"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
          <span className="inline-block text-[0.65rem] font-bold text-green bg-green-bg border-[1.5px] border-green/20 rounded px-2 py-0.5 tracking-wider uppercase whitespace-nowrap">
            Employment Law
          </span>
        </Link>

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer border-none bg-none p-1.5"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-ink rounded-sm" />
        </button>

        <ul
          className={`list-none flex items-center gap-7 ${
            menuOpen
              ? 'flex flex-col absolute top-[70px] left-0 right-0 bg-white border-b border-border py-5 px-8 gap-4 md:flex-row md:relative md:top-0 md:border-none md:py-0 md:px-0'
              : 'hidden md:flex'
          }`}
        >
          <li>
            <a
              href="/en/#services"
              onClick={closeMenu}
              className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/en/#process"
              onClick={closeMenu}
              className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]"
            >
              Process
            </a>
          </li>
          <li>
            <a
              href="/en/#faq"
              onClick={closeMenu}
              className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]"
            >
              FAQ
            </a>
          </li>
          <li>
            <Link
              href="/en/team"
              onClick={closeMenu}
              className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/en/guides"
              onClick={closeMenu}
              className="text-[0.85rem] font-medium text-ink-muted no-underline hover:text-gold transition-colors tracking-[0.01em]"
            >
              Guides
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              aria-label="Auf Deutsch ansehen"
              className="text-[0.78rem] font-semibold text-ink-muted no-underline hover:text-gold transition-colors tracking-wider uppercase border border-border rounded-sm px-2 py-1"
            >
              DE
            </Link>
          </li>
          <li>
            <Link
              href="/en/check-dismissal"
              onClick={closeMenu}
              className="bg-gold-dark text-white px-6 py-2.5 rounded-sm font-semibold text-[0.85rem] no-underline hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.2)] transition-all whitespace-nowrap"
            >
              Free case review &rarr;
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
