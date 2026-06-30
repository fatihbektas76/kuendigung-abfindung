'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';

interface StatutoryNotice {
  readonly months: number;
  readonly endpoint: string;
}

function statutoryNotice(years: number, inProbation: boolean): StatutoryNotice {
  if (inProbation) return { months: 0.5, endpoint: 'any day (2 weeks)' };
  if (years < 2) return { months: 1, endpoint: '15th or end of month (4 weeks)' };
  if (years < 5) return { months: 1, endpoint: 'end of month' };
  if (years < 8) return { months: 2, endpoint: 'end of month' };
  if (years < 10) return { months: 3, endpoint: 'end of month' };
  if (years < 12) return { months: 4, endpoint: 'end of month' };
  if (years < 15) return { months: 5, endpoint: 'end of month' };
  if (years < 20) return { months: 6, endpoint: 'end of month' };
  return { months: 7, endpoint: 'end of month' };
}

export default function NoticePeriodCalculatorEn() {
  const [years, setYears] = useState(5);
  const [inProbation, setInProbation] = useState(false);
  const notice = useMemo(() => statutoryNotice(years, inProbation), [years, inProbation]);

  return (
    <main>
      <TopicHero
        eyebrow="Notice-period calculator"
        title="Statutory notice period — § 622 BGB"
        lede="Calculate the minimum notice your employer must observe based on your length of service. The contract can extend this period; never shorten the statutory minimum for employer-issued notice."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
            <div>
              <label className="block text-[0.9rem] font-semibold text-ink mb-2">
                Years of service: {years}
              </label>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-gold-dark"
                disabled={inProbation}
              />

              <label className="flex items-center gap-3 mt-6 text-[0.92rem] text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={inProbation}
                  onChange={(e) => setInProbation(e.target.checked)}
                  className="w-4 h-4 accent-gold-dark"
                />
                I am still within the 6-month probation period
              </label>
              <p className="text-[0.82rem] text-ink-muted mt-2 leading-relaxed">
                During probation the notice period is uniformly 2 weeks (§ 622 (3) BGB) and
                can be given to any day.
              </p>
            </div>

            <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-3">
              <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                Statutory notice period
              </div>
              <div className="font-serif text-[2.2rem] font-extrabold text-ink leading-tight">
                {notice.months === 0.5
                  ? '2 weeks'
                  : `${notice.months} ${notice.months === 1 ? 'month' : 'months'}`}
              </div>
              <div className="text-[0.95rem] text-ink-light leading-relaxed">
                To: <strong>{notice.endpoint}</strong>
              </div>
              <p className="text-[0.85rem] text-ink-muted mt-2 leading-relaxed">
                This is the statutory minimum the employer must observe. Your contract or a
                collective agreement may extend it but cannot shorten it.
              </p>
              <Link
                href="#contact"
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5"
              >
                Check my dismissal &rarr;
              </Link>
            </div>
          </div>

          <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              <strong>Wrong notice = wrong dismissal.</strong> If your employer set the wrong
              date or used the wrong period, the dismissal can be challenged for that reason
              alone. Send us the letter — a specialist verifies the notice immediately.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
