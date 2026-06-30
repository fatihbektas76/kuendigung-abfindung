'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

function formatEur(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function UnusedHolidayPayCalculatorEn() {
  const [grossMonth, setGrossMonth] = useState(3500);
  const [weekDays, setWeekDays] = useState(5);
  const [unusedDays, setUnusedDays] = useState(8);

  const { dailyRate, total } = useMemo(() => {
    const monthDays = (weekDays * 52) / 12;
    const dr = grossMonth / monthDays;
    return { dailyRate: dr, total: dr * unusedDays };
  }, [grossMonth, weekDays, unusedDays]);

  return (
    <main>
      <TopicHero
        eyebrow="Unused-holiday pay calculator"
        title="Cash-out value for unused holiday (Urlaubsabgeltung)"
        lede="When the employment ends and you have unused statutory holiday left, the employer must pay it out in cash (§ 7 (4) BUrlG). The pay-out equals your average daily wage × untaken holiday days."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/unused-holiday-pay-calculator', label: 'Unused-holiday pay' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <div>
            <label className="block text-[0.9rem] font-semibold text-ink mb-2">
              Gross monthly salary: {formatEur(grossMonth)}
            </label>
            <input
              type="range"
              min={1500}
              max={15000}
              step={250}
              value={grossMonth}
              onChange={(e) => setGrossMonth(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Working days per week: {weekDays}
            </label>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={weekDays}
              onChange={(e) => setWeekDays(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Untaken holiday days: {unusedDays}
            </label>
            <input
              type="range"
              min={0}
              max={45}
              step={1}
              value={unusedDays}
              onChange={(e) => setUnusedDays(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />
          </div>

          <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-4">
            <div>
              <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                Daily rate
              </div>
              <div className="font-serif text-[1.6rem] font-extrabold text-ink leading-none">
                {formatEur(dailyRate)}
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-1 leading-relaxed">
                Based on a 4.33-week average month.
              </p>
            </div>
            <div className="border-t border-border-light pt-4">
              <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                Cash-out claim
              </div>
              <div className="font-serif text-[2.4rem] font-extrabold text-ink leading-none">
                {formatEur(total)}
              </div>
            </div>
            <Link
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
            >
              Enforce my holiday claim &rarr;
            </Link>
          </div>
        </div>

        <div className="max-w-[860px] mx-auto mt-10 p-6 bg-cream border-l-4 border-gold rounded">
          <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
            <strong>Forfeiture warning.</strong> Holiday no longer forfeits automatically at year
            end. The CJEU (Max-Planck judgment, C-684/16) requires the employer to warn you about
            unused holiday — otherwise it carries over. The Urlaubsabgeltung claim itself becomes
            statute-barred 3 years after the end of the calendar year in which the employment ended.
          </p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
