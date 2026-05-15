'use client';

const STEPS = [
  { label: 'Persönlich', short: '1' },
  { label: 'Familie', short: '2' },
  { label: 'Arbeit', short: '3' },
  { label: 'Kündigung', short: '4' },
  { label: 'Dokumente', short: '5' },
];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="mb-8">
      {/* Step circles */}
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={s.short} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      stepNum <= currentStep ? 'bg-gold' : 'bg-border'
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center text-[0.75rem] font-semibold transition-all ${
                    isCompleted
                      ? 'bg-gold text-white'
                      : isCurrent
                        ? 'border-2 border-gold text-gold bg-gold-bg'
                        : 'border-2 border-border text-ink-muted bg-white'
                  }`}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      stepNum < currentStep ? 'bg-gold' : 'bg-border'
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-[0.68rem] mt-1.5 hidden sm:block ${
                  isCurrent ? 'text-gold-dark font-semibold' : isCompleted ? 'text-gold' : 'text-ink-muted'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
