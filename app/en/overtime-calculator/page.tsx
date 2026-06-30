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

export default function OvertimeCalculatorEn() {
  const [grossMonth, setGrossMonth] = useState(3500);
  const [contractHours, setContractHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(20);
  const [supplement, setSupplement] = useState(0);

  const { hourlyRate, basePay, supplementPay, total } = useMemo(() => {
    const monthHours = (contractHours * 52) / 12;
    const hr = grossMonth / monthHours;
    const base = hr * overtimeHours;
    const supp = base * (supplement / 100);
    return { hourlyRate: hr, basePay: base, supplementPay: supp, total: base + supp };
  }, [grossMonth, contractHours, overtimeHours, supplement]);

  return (
    <main>
      <TopicHero
        eyebrow="Overtime calculator"
        title="Overtime pay in Germany — Mehrarbeit"
        lede="In Germany, overtime is only compensated if it was ordered, tolerated or necessary. The base rate equals your hourly rate; a contractual or collective-agreement supplement is added on top."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/overtime-calculator', label: 'Overtime calculator' },
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
              Contractual weekly hours: {contractHours} h
            </label>
            <input
              type="range"
              min={10}
              max={48}
              step={1}
              value={contractHours}
              onChange={(e) => setContractHours(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Overtime hours worked: {overtimeHours} h
            </label>
            <input
              type="range"
              min={0}
              max={120}
              step={1}
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Overtime supplement: {supplement}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={supplement}
              onChange={(e) => setSupplement(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />
            <p className="text-[0.8rem] text-ink-muted mt-2 leading-relaxed">
              Typical contractual supplements: 0% (often the default for non-tariff salaries),
              25% (commonly negotiated), 50% (some tariff agreements).
            </p>
          </div>

          <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-4">
            <div>
              <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                Hourly rate
              </div>
              <div className="font-serif text-[1.6rem] font-extrabold text-ink leading-none">
                {formatEur(hourlyRate)}
              </div>
            </div>
            <div className="border-t border-border-light pt-4 flex flex-col gap-2 text-[0.95rem] text-ink">
              <div className="flex justify-between">
                <span className="text-ink-muted">Base pay ({overtimeHours} h)</span>
                <strong>{formatEur(basePay)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Supplement ({supplement}%)</span>
                <strong>{formatEur(supplementPay)}</strong>
              </div>
              <div className="flex justify-between border-t border-border-light pt-2 mt-1">
                <span className="font-semibold">Total claim</span>
                <span className="font-serif text-[1.4rem] font-extrabold">{formatEur(total)}</span>
              </div>
            </div>
            <Link
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
            >
              Claim unpaid overtime &rarr;
            </Link>
          </div>
        </div>

        <div className="max-w-[860px] mx-auto mt-10 p-6 bg-cream border-l-4 border-gold rounded">
          <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
            <strong>Burden of proof.</strong> You as the employee must prove the overtime
            hours and that they were ordered, tolerated, or necessary for the work. Keep
            written evidence (chat logs, emails, time sheets). Claims expire under § 195 BGB
            after 3 years — and many contracts contain shorter contractual exclusion clauses.
          </p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
