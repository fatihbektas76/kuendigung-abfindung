interface TldrBoxProps {
  items: string[];
}

export default function TldrBox({ items }: TldrBoxProps) {
  return (
    <aside className="my-10 p-7 bg-cream border border-border-light rounded" role="note" aria-label="Zusammenfassung">
      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
        Das Wichtigste in Kürze
      </div>
      <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[0.92rem] text-ink-light leading-relaxed">
            <span className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true">&#10003;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
