'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function SidebarToc({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-4">
        On This Page
      </div>
      <ul className="list-none m-0 p-0 flex flex-col gap-0 border-l border-border">
        {headings
          .filter((h) => h.level === 2)
          .map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-[0.84rem] no-underline leading-relaxed py-[6px] pl-4 -ml-px border-l-2 transition-colors ${
                  activeId === h.id
                    ? 'border-l-gold text-gold-dark font-medium'
                    : 'border-l-transparent text-ink-muted hover:text-ink-light hover:border-l-border'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
