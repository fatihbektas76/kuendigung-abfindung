'use client';

/**
 * Reorder-Modal für Multi-Page-Scan-PDF.
 *
 * Listet die vorhandenen Scan-Fotos als Thumbnails mit „nach oben/unten"-
 * Buttons — bewusst kein HTML5-Drag-and-Drop, weil DnD auf Touch-Geräten
 * ohne Zusatzlibraries unzuverlässig ist. Für maximal 20 Seiten reicht
 * das Pfeil-Modell locker.
 */

import { useState } from 'react';
import { useLanguage } from './LanguageContext';

export interface ReorderItem {
  id: string;
  name: string;
  /** Data-URL des JPEGs für die Thumbnail-Vorschau. */
  thumb: string;
}

interface ReorderModalProps {
  items: ReorderItem[];
  onConfirm: (orderedIds: string[]) => void;
  onCancel: () => void;
}

export default function ReorderModal({ items, onConfirm, onCancel }: ReorderModalProps) {
  const { t } = useLanguage();
  const [order, setOrder] = useState<ReorderItem[]>(items);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setOrder((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      return next;
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.reorder.title}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg bg-white rounded-sm overflow-hidden flex flex-col max-h-[95vh]">
        <header className="flex items-start justify-between gap-3 py-3 px-5 border-b border-border">
          <div>
            <h2 className="font-serif text-[1.1rem] font-bold text-ink">{t.reorder.title}</h2>
            <p className="text-[0.82rem] text-ink-muted mt-0.5">{t.reorder.instruction}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label={t.reorder.close}
            className="text-ink-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer p-1"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <ol className="flex-1 overflow-auto p-3 space-y-2">
          {order.map((it, idx) => (
            <li
              key={it.id}
              className="flex items-center gap-3 py-2 px-3 bg-cream/60 border border-border rounded-sm"
            >
              <span className="font-serif text-[1rem] font-bold text-gold-dark w-6 text-center">
                {idx + 1}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.thumb}
                alt=""
                className="w-14 h-14 object-cover border border-border-light rounded-sm bg-white"
              />
              <span className="flex-1 min-w-0 text-[0.82rem] text-ink truncate">{it.name}</span>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  aria-label={t.reorder.moveUp}
                  className="w-8 h-6 flex items-center justify-center border border-border rounded-sm bg-white text-ink-muted hover:text-ink hover:border-gold/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === order.length - 1}
                  aria-label={t.reorder.moveDown}
                  className="w-8 h-6 flex items-center justify-center border border-border rounded-sm bg-white text-ink-muted hover:text-ink hover:border-gold/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ol>

        <footer className="flex items-center justify-end gap-2 py-3 px-5 border-t border-border bg-cream/40">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border-2 border-border text-ink-light font-semibold text-[0.85rem] rounded-sm cursor-pointer bg-white hover:border-gold/50"
          >
            {t.reorder.cancel}
          </button>
          <button
            type="button"
            onClick={() => onConfirm(order.map((o) => o.id))}
            className="py-2 px-5 border-2 border-gold text-white bg-gold-dark font-semibold text-[0.85rem] rounded-sm cursor-pointer hover:opacity-90"
          >
            {t.reorder.combine}
          </button>
        </footer>
      </div>
    </div>
  );
}
