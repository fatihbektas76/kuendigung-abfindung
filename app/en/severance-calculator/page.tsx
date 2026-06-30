'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';

function formatEur(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SeveranceCalculatorEn() {
  const [salary, setSalary] = useState(3500);
  const [years, setYears] = useState(5);
  const [factor, setFactor] = useState(0.5);

  const result = useMemo(() => Math.round(salary * factor * years), [salary, years, factor]);
  const lowEnd = useMemo(() => Math.round(salary * 0.25 * years), [salary, years]);
  const highEnd = useMemo(() => Math.round(salary * 1.5 * years), [salary, years]);

  return (
    <main>
      <TopicHero
        eyebrow="Severance calculator"
        title="Estimate your German severance"
        lede="Quick estimate using the German half-month rule (§ 1a KSchG). For a binding number, send us your dismissal letter — we run a tailored review free of charge."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/severance-calculator', label: 'Severance calculator' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
            <div>
              <label className="block text-[0.9rem] font-semibold text-ink mb-2">
                Gross monthly salary: {formatEur(salary)}
              </label>
              <input
                type="range"
                min={1500}
                max={20000}
                step={500}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />

              <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
                Years of service: {years}
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />

              <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
                Negotiation factor: {factor.toFixed(2)}×
              </label>
              <input
                type="range"
                min={0.25}
                max={1.5}
                step={0.05}
                value={factor}
                onChange={(e) => setFactor(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />
              <p className="text-[0.8rem] text-ink-muted mt-2">
                0.25× = weak case · 0.5× = statutory baseline · 1.0–1.5× = strong leverage.
              </p>
            </div>

            <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-4">
              <div>
                <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                  Estimated severance
                </div>
                <div className="font-serif text-[2.6rem] font-extrabold text-ink leading-none">
                  {formatEur(result)}
                </div>
              </div>
              <div className="border-t border-border-light pt-4">
                <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                  Realistic settlement range
                </div>
                <div className="text-[0.95rem] text-ink font-semibold">
                  {formatEur(lowEnd)} – {formatEur(highEnd)}
                </div>
                <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                  Range is based on factors of 0.25× to 1.5× per year of service.
                </p>
              </div>
              <Link
                href="#contact"
                className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5"
              >
                Get a tailored review &rarr;
              </Link>
            </div>
          </div>

          <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              <strong>Disclaimer:</strong> all figures are non-binding estimates based on the
              German half-month rule. Actual severance depends on flaws in the dismissal letter,
              special protection (pregnancy, severe disability, works council), social selection
              and the bargaining posture of both sides. This calculator does not constitute legal
              advice.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
