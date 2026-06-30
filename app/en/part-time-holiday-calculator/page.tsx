'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

export default function PartTimeHolidayCalculatorEn() {
  const [contractDays, setContractDays] = useState(20);
  const [partTimeDays, setPartTimeDays] = useState(3);
  const [workWeekDays, setWorkWeekDays] = useState(5);

  const result = useMemo(() => {
    const ratio = partTimeDays / workWeekDays;
    return Math.round(contractDays * ratio * 10) / 10;
  }, [contractDays, partTimeDays, workWeekDays]);

  return (
    <main>
      <TopicHero
        eyebrow="Part-time holiday calculator"
        title="Statutory holiday on a part-time schedule"
        lede="Statutory holiday under § 3 BUrlG is denominated in working days, not calendar weeks. On a less-than-5-day-week you keep the same number of holiday weeks — but the day count is pro-rated."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/part-time-holiday-calculator', label: 'Part-time holiday' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <div>
            <label className="block text-[0.9rem] font-semibold text-ink mb-2">
              Contractual annual holiday on a full 5-day week: {contractDays} days
            </label>
            <input
              type="range"
              min={20}
              max={35}
              step={1}
              value={contractDays}
              onChange={(e) => setContractDays(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Your working days per week: {partTimeDays}
            </label>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={partTimeDays}
              onChange={(e) => setPartTimeDays(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Standard working week at your employer: {workWeekDays} days
            </label>
            <input
              type="range"
              min={4}
              max={6}
              step={1}
              value={workWeekDays}
              onChange={(e) => setWorkWeekDays(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />
          </div>

          <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-3">
            <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
              Your holiday entitlement
            </div>
            <div className="font-serif text-[2.4rem] font-extrabold text-ink leading-tight">
              {result} days
            </div>
            <p className="text-[0.85rem] text-ink-muted mt-1 leading-relaxed">
              Formula: {contractDays} days × ({partTimeDays} ÷ {workWeekDays}) ={' '}
              {result} working days.
            </p>
            <Link
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
            >
              Check my holiday entitlement &rarr;
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
