'use client';

import Image from 'next/image';

export default function TeamCard({
  src,
  name,
  title,
  headingLevel = 'h2',
}: {
  src: string;
  name: string;
  title: string;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <div className="bg-cream border border-border-light rounded overflow-hidden">
      <div className="aspect-[4/5] relative bg-gradient-to-br from-cream-dark to-border">
        <Image
          src={src}
          alt={`${name} — ${title}`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.parentElement?.querySelector('.fallback');
            if (fallback) (fallback as HTMLElement).style.display = 'flex';
          }}
        />
        <div className="fallback absolute inset-0 items-center justify-center font-serif text-[2.5rem] text-gold opacity-40 hidden">
          &sect;
        </div>
      </div>
      <div className="py-5 px-6">
        <Heading className="font-serif text-[1.1rem] font-bold leading-tight mb-1">{name}</Heading>
        <p className="text-[0.84rem] text-ink-muted leading-relaxed">{title}</p>
      </div>
    </div>
  );
}
