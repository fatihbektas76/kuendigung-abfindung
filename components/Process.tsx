import FadeUp from './FadeUp';
import { getStrings, type Locale } from '@/lib/i18n/strings';

/**
 * Sprachunabhängige Prozess-Komponente.
 * Texte kommen aus lib/i18n/strings.ts — DE und EN strukturell identisch.
 */
export default function Process({ locale = 'de' }: { locale?: Locale }) {
  const t = getStrings(locale);
  const steps = [
    { num: 1, title: t.process.step1Title, desc: t.process.step1Desc },
    { num: 2, title: t.process.step2Title, desc: t.process.step2Desc },
    { num: 3, title: t.process.step3Title, desc: t.process.step3Desc },
    { num: 4, title: t.process.step4Title, desc: t.process.step4Desc },
  ];

  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="ablauf">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          {t.process.eyebrow}
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          {t.process.headline}
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed">
          {t.process.tagline}
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
