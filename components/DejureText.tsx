'use client';

import { parseDejure } from '@/lib/dejure';

export default function DejureText({ text, className }: { text: string; className?: string }) {
  const segments = parseDejure(text);

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.type === 'link' ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold no-underline hover:underline"
          >
            {seg.content}
          </a>
        ) : (
          <span key={i}>{seg.content}</span>
        ),
      )}
    </span>
  );
}
