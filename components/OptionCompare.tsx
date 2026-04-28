type Option = {
  number: 1 | 2 | 3;
  title: string;
  subtitle: string;
  body: string;
  recommended?: boolean;
  recommendationLabel?: string;
};

interface OptionCompareProps {
  options: [Option, Option, Option];
}

export default function OptionCompare({ options }: OptionCompareProps) {
  return (
    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
      {options.map((opt) => (
        <div
          key={opt.number}
          className={`relative py-6 px-5 bg-white rounded-sm border-2 ${
            opt.recommended ? 'border-gold' : 'border-border'
          }`}
        >
          {opt.recommended && opt.recommendationLabel && (
            <span className="absolute -top-3 left-4 bg-gold text-white text-[0.7rem] font-bold tracking-wider uppercase py-0.5 px-2.5 rounded-sm">
              {opt.recommendationLabel}
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-cream border border-border flex items-center justify-center text-[0.85rem] font-bold text-gold-dark mb-3">
            {opt.number}
          </div>
          <div className="font-serif text-[1.1rem] font-bold leading-tight mb-1">
            {opt.title}
          </div>
          <div className="text-[0.78rem] font-semibold text-gold-dark mb-3">
            {opt.subtitle}
          </div>
          <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">{opt.body}</p>
        </div>
      ))}
    </div>
  );
}
