import FadeUp from './FadeUp';

const steps = [
  {
    num: 1,
    title: 'Free Case Assessment',
    desc: 'Tell us about your dispute. We assess the merits, jurisdiction, and likely costs — at no charge. Usually within 48 hours.',
  },
  {
    num: 2,
    title: 'Strategy & Cost Estimate',
    desc: 'We outline your legal options, success probability, and provide a transparent cost estimate based on German statutory fees.',
  },
  {
    num: 3,
    title: 'We Handle Everything',
    desc: 'Court filings, hearings, negotiations, expert witnesses — we manage the entire proceeding. You get regular English updates.',
  },
  {
    num: 4,
    title: 'Resolution & Enforcement',
    desc: 'Judgment, settlement, or arbitral award — we see it through to the end, including enforcement of the outcome if needed.',
  },
];

export default function Process() {
  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="how-it-works">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          How It Works
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          From First Contact to Resolution — in Four Steps
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed">
          We make German litigation straightforward for international clients. No surprises, no language
          barriers.
        </p>
        <FadeUp className="grid grid-cols-4 gap-6 mt-10 max-md:grid-cols-2 max-md:gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="absolute top-7 -right-3 w-6 h-0.5 bg-border max-md:hidden" />
              )}
              <div className="w-14 h-14 rounded-full bg-gold-bg border-2 border-gold/[0.15] flex items-center justify-center mx-auto mb-4 font-serif text-[1.2rem] font-bold text-gold">
                {step.num}
              </div>
              <h3 className="text-[0.95rem] font-bold mb-1.5">{step.title}</h3>
              <p className="text-[0.84rem] text-ink-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
