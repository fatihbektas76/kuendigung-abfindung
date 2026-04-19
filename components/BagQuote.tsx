interface BagQuoteProps {
  az: string;
  gericht?: string;
  datum?: string;
  children: React.ReactNode;
}

export default function BagQuote({ az, gericht = 'BAG', datum, children }: BagQuoteProps) {
  const label = `${gericht}, ${datum ? `Urteil vom ${datum} — ` : ''}Az. ${az}`;

  return (
    <figure className="my-8 mx-0">
      <blockquote
        className="m-0 pl-5 border-l-[3px] border-gold py-4 pr-4 bg-cream/50 rounded-r-sm text-[0.94rem] text-ink-light leading-relaxed italic"
        cite={`https://www.bundesarbeitsgericht.de/entscheidung/${az.replace(/\s+/g, '-')}`}
      >
        {children}
      </blockquote>
      <figcaption className="mt-2 pl-5 text-[0.8rem] text-ink-muted">
        — {label}
      </figcaption>
    </figure>
  );
}
