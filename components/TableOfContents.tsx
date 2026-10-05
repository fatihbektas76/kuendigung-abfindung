'use client';

import { useEffect, useState } from 'react';

export interface TocEntry {
  /** Section id — must match an h2's id attribute */
  id: string;
  /** Visible label */
  label: string;
}

/**
 * Inhaltsverzeichnis für längere Ratgeber-Artikel.
 *
 * Verwendung: statische Liste von Section-Entries übergeben; die Komponente
 * rendert auf Desktop eine Sticky-Sidebar und auf Mobile einen aufklappbaren
 * Button direkt oben. Scrollposition hebt den aktuellen Abschnitt per
 * IntersectionObserver hervor.
 */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (observations) => {
        const visible = observations
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    entries.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <>
      {/* Mobile: dropdown */}
      <div className="md:hidden my-6">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-cream border border-border-light rounded text-left"
        >
          <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark">
            Inhaltsverzeichnis
          </span>
          <span className={`text-gold-dark text-[0.9rem] transition-transform ${mobileOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {mobileOpen && (
          <ol className="mt-2 py-2 px-2 bg-cream/50 border border-border-light rounded list-none">
            {entries.map((e, i) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-[0.9rem] text-ink-light hover:text-ink hover:bg-cream no-underline rounded"
                >
                  <span className="text-ink-muted tabular-nums mr-2">{i + 1}.</span>
                  {e.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden md:block" aria-label="Inhaltsverzeichnis">
        <nav className="sticky top-24 max-w-[260px] p-5 bg-cream border border-border-light rounded">
          <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
            Inhalt
          </div>
          <ol className="list-none m-0 p-0 space-y-1.5">
            {entries.map((e, i) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  className={`block text-[0.84rem] leading-snug no-underline py-1 pl-3 border-l-2 transition-colors ${
                    activeId === e.id
                      ? 'border-gold text-ink font-semibold'
                      : 'border-transparent text-ink-light hover:text-ink hover:border-border'
                  }`}
                >
                  <span className="text-ink-muted tabular-nums mr-1.5">{i + 1}.</span>
                  {e.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </>
  );
}
