'use client';

import { useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [open, setOpen] = useState(true);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-10 border border-border-light rounded bg-cream/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-none border-none cursor-pointer text-left font-sans"
      >
        <span className="text-[0.82rem] font-bold tracking-[0.08em] uppercase text-ink-muted">
          Table of Contents
        </span>
        <span
          className={`text-[0.8rem] text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}
        >
          &#9660;
        </span>
      </button>
      {open && (
        <ul className="list-none m-0 px-6 pb-5 flex flex-col gap-0">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-[0.88rem] text-ink-light no-underline hover:text-gold transition-colors leading-relaxed py-[5px] ${
                  h.level === 3 ? 'pl-4 text-[0.84rem] text-ink-muted' : ''
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
