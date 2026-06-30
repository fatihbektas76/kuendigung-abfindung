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

/**
 * Simplified RVG fee table — table 2 of the 2025 RVG (Anlage 2 to § 13 RVG).
 * Returns the 1.0 fee unit for a given value in dispute.
 *
 * Caps at the dispute-value brackets used by the labour-courts (§ 42 (3) GKG
 * caps the value at 3 × gross monthly salary).
 */
function rvgUnit(value: number): number {
  if (value <= 500) return 49;
  if (value <= 1000) return 88;
  if (value <= 1500) return 127;
  if (value <= 2000) return 166;
  if (value <= 3000) return 222;
  if (value <= 4000) return 278;
  if (value <= 5000) return 334;
  if (value <= 6000) return 390;
  if (value <= 7000) return 446;
  if (value <= 8000) return 502;
  if (value <= 9000) return 558;
  if (value <= 10000) return 614;
  if (value <= 13000) return 712;
  if (value <= 16000) return 810;
  if (value <= 19000) return 908;
  if (value <= 22000) return 1006;
  if (value <= 25000) return 1104;
  if (value <= 30000) return 1219;
  if (value <= 35000) return 1334;
  if (value <= 40000) return 1449;
  if (value <= 45000) return 1564;
  if (value <= 50000) return 1679;
  return 1679; // simplified — for higher values use full table
}

export default function LegalFeesCalculatorEn() {
  const [grossMonth, setGrossMonth] = useState(3500);
  const [includeSettlement, setIncludeSettlement] = useState(true);

  const calc = useMemo(() => {
    // GKG § 42(3): Streitwert capped at 3 × gross monthly salary
    const value = grossMonth * 3;
    const unit = rvgUnit(value);

    // Procedural fee (Verfahrensgebühr) 1.3 × unit (RVG VV 3100)
    const procedural = unit * 1.3;
    // Court fee (Termingebühr) 1.2 × unit (RVG VV 3104)
    const court = unit * 1.2;
    // Settlement fee 1.5 × unit only on amicable settlement (RVG VV 1003)
    const settlement = includeSettlement ? unit * 1.5 : 0;

    const subtotal = procedural + court + settlement + 20; // 20 € postal flat (VV 7002)
    const vat = subtotal * 0.19;
    const totalLawyer = subtotal + vat;

    return {
      value,
      unit,
      procedural,
      court,
      settlement,
      subtotal,
      vat,
      totalLawyer,
    };
  }, [grossMonth, includeSettlement]);

  return (
    <main>
      <TopicHero
        eyebrow="Legal-fees calculator (RVG)"
        title="What does an unfair-dismissal claim cost?"
        lede="Legal fees in Germany are set by the Rechtsanwaltsvergütungsgesetz (RVG) and depend on the value in dispute. For labour-court cases the value is capped at 3 × your gross monthly salary (§ 42 (3) GKG)."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/legal-fees-calculator', label: 'Legal-fees calculator' },
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
              max={20000}
              step={250}
              value={grossMonth}
              onChange={(e) => setGrossMonth(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />
            <p className="text-[0.82rem] text-ink-muted mt-2 leading-relaxed">
              Value in dispute = {formatEur(calc.value)} (3× monthly salary).
              <br />
              RVG unit (1.0): {formatEur(calc.unit)} per Anlage 2 RVG.
            </p>

            <label className="flex items-center gap-3 mt-6 text-[0.92rem] text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={includeSettlement}
                onChange={(e) => setIncludeSettlement(e.target.checked)}
                className="w-4 h-4 accent-gold-dark"
              />
              Case settles at first hearing (Vergleich)
            </label>
            <p className="text-[0.8rem] text-ink-muted mt-2 leading-relaxed">
              ~80% of unfair-dismissal claims settle. The settlement fee (1.5×) covers the
              court-supervised severance agreement.
            </p>
          </div>

          <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-3 text-[0.95rem]">
            <div className="flex justify-between">
              <span className="text-ink-muted">Procedural fee (1.3×)</span>
              <strong>{formatEur(calc.procedural)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Hearing fee (1.2×)</span>
              <strong>{formatEur(calc.court)}</strong>
            </div>
            {includeSettlement && (
              <div className="flex justify-between">
                <span className="text-ink-muted">Settlement fee (1.5×)</span>
                <strong>{formatEur(calc.settlement)}</strong>
              </div>
            )}
            <div className="flex justify-between border-t border-border-light pt-3">
              <span className="text-ink-muted">19% VAT</span>
              <strong>{formatEur(calc.vat)}</strong>
            </div>
            <div className="flex justify-between border-t border-border-light pt-3 text-[1rem]">
              <span className="font-semibold">Total lawyer fee</span>
              <span className="font-serif text-[1.4rem] font-extrabold">
                {formatEur(calc.totalLawyer)}
              </span>
            </div>
            <Link
              href="#contact"
              className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
            >
              Free initial review &rarr;
            </Link>
          </div>
        </div>

        <div className="max-w-[860px] mx-auto mt-10 p-6 bg-cream border-l-4 border-gold rounded">
          <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
            <strong>No court fees at first instance</strong> if the case settles (§ 12a ArbGG).
            Each side bears its own lawyer fees regardless of outcome. Most employees in Germany
            hold legal-expenses insurance (Rechtsschutzversicherung) which covers labour-law
            matters after a 3-month waiting period — notify your insurer now.
          </p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
