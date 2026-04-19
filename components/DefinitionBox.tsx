interface DefinitionBoxProps {
  term: string;
  definition: string;
}

export default function DefinitionBox({ term, definition }: DefinitionBoxProps) {
  return (
    <div className="my-8 p-6 bg-gold-bg border border-border-light rounded" role="definition">
      <dt className="text-[0.82rem] font-bold tracking-[0.06em] uppercase text-gold-dark mb-1.5">
        {term}
      </dt>
      <dd className="m-0 text-[0.92rem] text-ink-light leading-relaxed">
        {definition}
      </dd>
    </div>
  );
}
