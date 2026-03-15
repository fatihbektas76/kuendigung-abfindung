'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateCosts, type CostBreakdown } from '@/lib/fees';
import ToolSchema from '@/components/ToolSchema';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtEur(n: number): string {
  return `\u20AC${fmt(n)}`;
}

const QUICK_VALUES = [
  { label: '\u20AC50k', value: 50000 },
  { label: '\u20AC250k', value: 250000 },
  { label: '\u20AC500k', value: 500000 },
  { label: '\u20AC1M', value: 1000000 },
  { label: '\u20AC5M', value: 5000000 },
];

function AttorneyBreakdown({ label, fees }: { label: string; fees: CostBreakdown['ownAttorney'] }) {
  return (
    <div className="bg-white border border-border-light rounded p-6">
      <h3 className="text-[0.92rem] font-bold mb-4">{label}</h3>
      <div className="flex flex-col gap-2 text-[0.88rem]">
        <div className="flex justify-between">
          <span className="text-ink-muted">Verfahrensgebühr (1.3)</span>
          <span className="font-medium">{fmtEur(fees.verfahrensgebuehr)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">Terminsgebühr (1.2)</span>
          <span className="font-medium">{fmtEur(fees.terminsgebuehr)}</span>
        </div>
        {fees.einigungsgebuehr > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">Einigungsgebühr (1.0)</span>
            <span className="font-medium">{fmtEur(fees.einigungsgebuehr)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-ink-muted">Auslagenpauschale</span>
          <span className="font-medium">{fmtEur(fees.pauschale)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="text-ink-muted">Subtotal (net)</span>
          <span className="font-medium">{fmtEur(fees.subtotalNet)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">19% VAT</span>
          <span className="font-medium">{fmtEur(fees.vat)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>{fmtEur(fees.total)}</span>
        </div>
      </div>
    </div>
  );
}

export default function CostCalculatorPage() {
  const [disputeValue, setDisputeValue] = useState(100000);
  const [settlement, setSettlement] = useState(false);

  const costs = calculateCosts(disputeValue, settlement);
  const costsWithSettlement = calculateCosts(disputeValue, true);

  function handleInputChange(raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, '');
    const val = parseInt(cleaned, 10);
    if (!isNaN(val)) {
      setDisputeValue(Math.min(Math.max(val, 5000), 100000000));
    }
  }

  function handleSliderChange(val: number) {
    // Logarithmic scale for better UX across wide range
    const min = Math.log(5000);
    const max = Math.log(100000000);
    const actual = Math.round(Math.exp(min + (val / 1000) * (max - min)));
    setDisputeValue(actual);
  }

  function getSliderPosition(): number {
    const min = Math.log(5000);
    const max = Math.log(100000000);
    return ((Math.log(disputeValue) - min) / (max - min)) * 1000;
  }

  // Scenario calculations
  const settleCosts = costsWithSettlement;
  const settleYourShare = Math.round(
    (settleCosts.courtFees / 2 + settleCosts.ownAttorney.total) * 100
  ) / 100;

  return (
    <main>
      <ToolSchema tool="cost-calculator" />
      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-2 text-[0.84rem] text-ink-muted mb-4">
            <Link href="/" className="text-gold no-underline hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/#tools" className="text-gold no-underline hover:underline">
              Tools
            </Link>
            <span>/</span>
            <span>Cost Calculator</span>
          </div>
          <h1 className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold leading-tight">
            German Litigation Cost Calculator
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            Estimate court fees and statutory attorney fees for a first-instance lawsuit in Germany.
            Based on the current RVG and GKG fee tables (effective June 2025).
          </p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-8 py-12">
        {/* Input Section */}
        <div className="bg-white border border-border-light rounded p-8 mb-8">
          <h2 className="font-serif text-[1.3rem] font-bold mb-6">Dispute Value</h2>

          <div className="flex items-center gap-4 mb-4 max-md:flex-col max-md:items-stretch">
            <div className="relative flex-1 max-w-[300px] max-md:max-w-none">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted text-[0.95rem]">
                &euro;
              </span>
              <input
                type="text"
                value={disputeValue.toLocaleString('en-US')}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full py-3 pl-8 pr-4 border border-border rounded-sm font-sans text-[1.1rem] font-semibold text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {QUICK_VALUES.map((q) => (
                <button
                  key={q.value}
                  onClick={() => setDisputeValue(q.value)}
                  className={`py-2 px-4 rounded-full text-[0.82rem] font-semibold cursor-pointer border transition-all ${
                    disputeValue === q.value
                      ? 'bg-gold text-white border-gold'
                      : 'bg-transparent text-ink-muted border-border hover:border-gold hover:text-gold'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={1000}
            value={getSliderPosition()}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-gold"
          />
          <div className="flex justify-between text-[0.78rem] text-ink-muted mt-1">
            <span>&euro;5,000</span>
            <span>&euro;100,000,000</span>
          </div>

          <label className="flex items-center gap-3 mt-6 cursor-pointer">
            <div
              className={`w-11 h-6 rounded-full relative transition-colors ${
                settlement ? 'bg-gold' : 'bg-border'
              }`}
              onClick={() => setSettlement(!settlement)}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  settlement ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </div>
            <span className="text-[0.92rem] font-medium">Include settlement scenario</span>
          </label>
        </div>

        {/* Cost Breakdown */}
        <h2 className="font-serif text-[1.3rem] font-bold mb-5">Cost Breakdown &mdash; First Instance</h2>

        <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
          {/* Court Fees */}
          <div className="bg-white border border-border-light rounded p-6 col-span-2 max-md:col-span-1">
            <h3 className="text-[0.92rem] font-bold mb-4">Court Fees (GKG)</h3>
            <div className="flex justify-between text-[0.88rem]">
              <span className="text-ink-muted">
                {settlement ? 'Reduced fee (1.0 \u00d7 GKG fee)' : 'Standard fee (3.0 \u00d7 GKG fee)'}
              </span>
              <span className="font-bold">{fmtEur(costs.courtFees)}</span>
            </div>
            {settlement && costs.courtFeesSaved > 0 && (
              <div className="flex justify-between text-[0.88rem] mt-2 text-green">
                <span>Settlement discount (saved)</span>
                <span className="font-medium">&minus;{fmtEur(costs.courtFeesSaved)}</span>
              </div>
            )}
          </div>

          <AttorneyBreakdown label="Your Attorney Fees (RVG)" fees={costs.ownAttorney} />
          <AttorneyBreakdown label="Opposing Attorney Fees (RVG)" fees={costs.opposingAttorney} />
        </div>

        {/* Total */}
        <div className="bg-gold/[0.06] border border-gold/[0.12] rounded p-6 mb-10">
          <div className="flex justify-between items-center">
            <span className="font-serif text-[1.1rem] font-bold">Total First Instance Costs</span>
            <span className="font-serif text-[1.4rem] font-bold text-gold">{fmtEur(costs.totalFirstInstance)}</span>
          </div>
        </div>

        {/* Scenarios */}
        <h2 className="font-serif text-[1.3rem] font-bold mb-5">What You Actually Pay &mdash; Three Scenarios</h2>
        <p className="text-[0.95rem] text-ink-muted mb-6 max-w-[620px] leading-relaxed">
          German litigation follows the &ldquo;loser pays&rdquo; principle. Your actual costs depend on the outcome.
        </p>

        <div className="grid grid-cols-3 gap-5 mb-10 max-md:grid-cols-1">
          {/* Win */}
          <div className="bg-white border border-border-light rounded p-6 border-t-[3px] border-t-green">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2">
              Best Case
            </div>
            <h3 className="font-serif text-[1.1rem] font-bold mb-2">If You Win</h3>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-4">
              The opposing party reimburses all court fees and all statutory attorney fees for both sides.
            </p>
            <div className="font-serif text-[1.6rem] font-bold text-green">&euro;0.00</div>
            <div className="text-[0.78rem] text-ink-muted mt-1">Your net cost</div>
          </div>

          {/* Lose */}
          <div className="bg-white border border-border-light rounded p-6 border-t-[3px] border-t-[#C0392B]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#C0392B] mb-2">
              Worst Case
            </div>
            <h3 className="font-serif text-[1.1rem] font-bold mb-2">If You Lose</h3>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-4">
              You bear all costs: court fees, your own attorney fees, and the opposing attorney&rsquo;s statutory fees.
            </p>
            <div className="font-serif text-[1.6rem] font-bold text-[#C0392B]">
              {fmtEur(calculateCosts(disputeValue, false).totalFirstInstance)}
            </div>
            <div className="text-[0.78rem] text-ink-muted mt-1">Your net cost</div>
          </div>

          {/* Settle */}
          <div className="bg-white border border-border-light rounded p-6 border-t-[3px] border-t-gold">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2">
              Settlement (50/50)
            </div>
            <h3 className="font-serif text-[1.1rem] font-bold mb-2">If You Settle</h3>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-4">
              Each side bears its own attorney fees (incl. settlement fee) plus half of the reduced court costs.
            </p>
            <div className="font-serif text-[1.6rem] font-bold text-gold">{fmtEur(settleYourShare)}</div>
            <div className="text-[0.78rem] text-ink-muted mt-1">Your net cost (50/50 split)</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-cream border-l-[3px] border-gold rounded-r p-6 mb-10">
          <h3 className="text-[0.95rem] font-bold mb-2">Important: Statutory Minimum Fees</h3>
          <p className="text-[0.88rem] text-ink-muted leading-relaxed">
            The fees shown above are the statutory minimum fees under the German Lawyers&rsquo; Remuneration
            Act (RVG). In practice, our engagement is generally based on hourly rates, which may exceed the
            statutory fees depending on the complexity of your case. However, in the event of a successful
            outcome, only the statutory RVG fees shown here are reimbursable by the opposing party &mdash;
            not any agreed hourly rates above the statutory minimum.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="font-serif text-[1.3rem] font-bold mb-3">Ready to Discuss Your Case?</h3>
          <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[500px] mx-auto">
            Get a free initial assessment of your dispute. We&rsquo;ll review the merits, estimate costs,
            and outline your options &mdash; usually within 48 hours.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
          >
            Get a Free Case Assessment &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
