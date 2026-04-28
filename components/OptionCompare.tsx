type Option = {
  number: 1 | 2 | 3;
  title: string;
  body: string;
  detail: string;
  recommended?: boolean;
  recommendationLabel?: string;
};

interface OptionCompareProps {
  options: [Option, Option, Option];
  note?: string;
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function OptionCompare({ options, note }: OptionCompareProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {options.map((opt) => (
          <div
            key={opt.number}
            className={`relative flex flex-col py-6 px-5 bg-white rounded-sm border-2 ${
              opt.recommended ? 'border-gold' : 'border-border'
            }`}
          >
            {opt.recommended && opt.recommendationLabel && (
              <span className="absolute -top-3 left-4 bg-gold text-white text-[0.7rem] font-bold tracking-wider uppercase py-0.5 px-2.5 rounded-sm">
                {opt.recommendationLabel}
              </span>
            )}
            <div className="text-[0.78rem] text-ink-muted mb-1.5">
              Option {opt.number}
            </div>
            <div className="font-serif text-[1.1rem] font-bold leading-tight mb-3">
              {opt.title}
            </div>
            <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">
              {opt.body}
            </p>
            <div className="border-t border-border my-4" />
            <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">
              {renderBold(opt.detail)}
            </p>
          </div>
        ))}
      </div>
      {note && (
        <div className="mt-4 py-5 px-6 bg-[#1C1408] rounded-sm">
          <p className="text-[0.92rem] text-white/90 leading-relaxed m-0">
            {renderBold(note)}
          </p>
        </div>
      )}
    </div>
  );
}
