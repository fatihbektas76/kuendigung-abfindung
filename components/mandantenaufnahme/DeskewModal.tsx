'use client';

/**
 * Modales Overlay, in dem der Mandant die vier Ecken des Dokuments
 * setzt. Pointer-Events funktionieren für Maus, Touch und Stift.
 *
 * Ergebnis: entweder ein Quad im Koordinatensystem des ORIGINAL-Bildes
 * (nicht der Preview-Skalierung) oder null, wenn übersprungen.
 */

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { Quad } from '@/lib/perspective-transform';
import { loadImageIntoCanvas } from '@/lib/scan-image';
import { useLanguage } from './LanguageContext';

interface DeskewModalProps {
  file: File;
  onConfirm: (quad: Quad | null) => void;
  onCancel: () => void;
}

interface Corner {
  key: 'tl' | 'tr' | 'br' | 'bl';
  x: number;
  y: number;
}

const HANDLE_RADIUS = 22; // px auf dem Bildschirm — grob genug für Finger

export default function DeskewModal({ file, onConfirm, onCancel }: DeskewModalProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [renderedSize, setRenderedSize] = useState<{ w: number; h: number } | null>(null);
  const [corners, setCorners] = useState<Corner[] | null>(null);
  const [dragging, setDragging] = useState<Corner['key'] | null>(null);

  // Bild als ObjectURL laden + Original-Auflösung ermitteln
  useEffect(() => {
    let url: string | null = null;
    let cancelled = false;
    (async () => {
      try {
        const { width, height } = await loadImageIntoCanvas(file);
        if (cancelled) return;
        setImgSize({ w: width, h: height });
        url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } catch {
        // Kann Bild nicht dekodieren → einfach überspringen
        onConfirm(null);
      }
    })();
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, onConfirm]);

  // Preview-Größe messen (was das <img> tatsächlich rendert)
  useEffect(() => {
    if (!imgRef.current) return;
    const measure = () => {
      const el = imgRef.current;
      if (!el) return;
      setRenderedSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(imgRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [previewUrl]);

  // Ecken initialisieren, sobald Preview-Größe bekannt ist —
  // 5 % Innenrand als Startposition.
  useEffect(() => {
    if (!renderedSize || corners) return;
    const { w, h } = renderedSize;
    const inset = 0.05;
    setCorners([
      { key: 'tl', x: w * inset, y: h * inset },
      { key: 'tr', x: w * (1 - inset), y: h * inset },
      { key: 'br', x: w * (1 - inset), y: h * (1 - inset) },
      { key: 'bl', x: w * inset, y: h * (1 - inset) },
    ]);
  }, [renderedSize, corners]);

  const previewToOriginal = useCallback(
    (px: number, py: number): { x: number; y: number } => {
      if (!imgSize || !renderedSize) return { x: 0, y: 0 };
      const sx = imgSize.w / renderedSize.w;
      const sy = imgSize.h / renderedSize.h;
      return { x: px * sx, y: py * sy };
    },
    [imgSize, renderedSize],
  );

  const handlePointerDown = (key: Corner['key']) => (e: React.PointerEvent<SVGCircleElement>) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(key);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging || !renderedSize || !corners) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(renderedSize.w, e.clientX - rect.left));
    const y = Math.max(0, Math.min(renderedSize.h, e.clientY - rect.top));
    setCorners((prev) =>
      prev?.map((c) => (c.key === dragging ? { ...c, x, y } : c)) ?? null,
    );
  };

  const handlePointerUp = () => setDragging(null);

  const polygonPath = useMemo(() => {
    if (!corners) return '';
    const order: Corner['key'][] = ['tl', 'tr', 'br', 'bl'];
    return order
      .map((k, i) => {
        const c = corners.find((x) => x.key === k)!;
        return `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`;
      })
      .join(' ') + ' Z';
  }, [corners]);

  const confirm = () => {
    if (!corners) {
      onConfirm(null);
      return;
    }
    const map: Record<Corner['key'], { x: number; y: number }> = {
      tl: previewToOriginal(corners.find((c) => c.key === 'tl')!.x, corners.find((c) => c.key === 'tl')!.y),
      tr: previewToOriginal(corners.find((c) => c.key === 'tr')!.x, corners.find((c) => c.key === 'tr')!.y),
      br: previewToOriginal(corners.find((c) => c.key === 'br')!.x, corners.find((c) => c.key === 'br')!.y),
      bl: previewToOriginal(corners.find((c) => c.key === 'bl')!.x, corners.find((c) => c.key === 'bl')!.y),
    };
    onConfirm(map);
  };

  const skip = () => onConfirm(null);

  const reset = () => setCorners(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.deskew.title}
      className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-3xl bg-white rounded-sm overflow-hidden flex flex-col max-h-[95vh]">
        <header className="flex items-start justify-between gap-3 py-3 px-5 border-b border-border">
          <div>
            <h2 className="font-serif text-[1.1rem] font-bold text-ink">{t.deskew.title}</h2>
            <p className="text-[0.82rem] text-ink-muted mt-0.5">{t.deskew.instruction}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label={t.deskew.close}
            className="text-ink-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer p-1"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div
          ref={containerRef}
          className="relative flex-1 overflow-auto bg-neutral-100 flex items-center justify-center p-4"
          style={{ touchAction: 'none' }}
        >
          {previewUrl && (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={previewUrl}
                alt=""
                className="block max-w-full max-h-[70vh] select-none"
                draggable={false}
              />
              {renderedSize && corners && (
                <svg
                  ref={svgRef}
                  className="absolute inset-0"
                  width={renderedSize.w}
                  height={renderedSize.h}
                  viewBox={`0 0 ${renderedSize.w} ${renderedSize.h}`}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{ touchAction: 'none' }}
                >
                  <path d={polygonPath} fill="rgba(166,139,75,0.2)" stroke="#a68b4b" strokeWidth="2" />
                  {corners.map((c) => (
                    <circle
                      key={c.key}
                      cx={c.x}
                      cy={c.y}
                      r={HANDLE_RADIUS}
                      fill="#fff"
                      stroke="#a68b4b"
                      strokeWidth="3"
                      style={{ cursor: 'grab', touchAction: 'none' }}
                      onPointerDown={handlePointerDown(c.key)}
                    />
                  ))}
                </svg>
              )}
            </div>
          )}
          {!previewUrl && (
            <p className="text-ink-muted text-[0.9rem]">{t.deskew.loading}</p>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 py-3 px-5 border-t border-border bg-cream/40 flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="text-[0.82rem] text-gold-dark underline cursor-pointer bg-transparent border-none p-0"
          >
            {t.deskew.reset}
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={skip}
              className="py-2 px-4 border-2 border-border text-ink-light font-semibold text-[0.85rem] rounded-sm cursor-pointer bg-white hover:border-gold/50"
            >
              {t.deskew.skip}
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={!corners}
              className="py-2 px-5 border-2 border-gold text-white bg-gold-dark font-semibold text-[0.85rem] rounded-sm cursor-pointer hover:opacity-90 disabled:opacity-50"
            >
              {t.deskew.apply}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
