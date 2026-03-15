'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateDeadline, calculateLimitation, type DeadlineResult, type LimitationResult } from '@/lib/deadlines';
import ToolSchema from '@/components/ToolSchema';

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const DOCUMENT_TYPES = [
  {
    value: 'verteidigungsanzeige',
    label: 'Verteidigungsanzeige (Notice of Intention to Defend)',
    weeks: 2,
    note: 'The court typically sets a 2-week response deadline (Klageerwiderungsfrist), though this can be extended to up to 4 weeks by the judge.',
    consequence: 'If you fail to respond in time, the court may issue a default judgment (Vers\u00e4umnisurteil) against you based solely on the plaintiff\u2019s claims.',
    nextSteps: 'Engage a German attorney immediately. Only a lawyer admitted to a German Landgericht can file the response on your behalf.',
  },
  {
    value: 'mahnbescheid',
    label: 'Mahnbescheid (Payment Order)',
    weeks: 2,
    consequence: 'If you do not file an objection (Widerspruch) within 2 weeks, the creditor can obtain an enforceable Vollstreckungsbescheid, which is equivalent to a court judgment.',
    nextSteps: 'File a written objection (Widerspruch) with the court that issued the order. No attorney is required for this step, but legal advice is strongly recommended.',
  },
  {
    value: 'vollstreckungsbescheid',
    label: 'Vollstreckungsbescheid (Enforcement Order)',
    weeks: 2,
    consequence: 'If you do not file an objection (Einspruch) within 2 weeks, the enforcement order becomes final and enforceable \u2014 the creditor can seize your assets in Germany.',
    nextSteps: 'File an Einspruch immediately. This converts the matter into a regular lawsuit where you can present your defense.',
  },
  {
    value: 'versaeumnisurteil',
    label: 'Vers\u00e4umnisurteil (Default Judgment)',
    weeks: 2,
    consequence: 'If you miss the 2-week deadline for filing an Einspruch, the default judgment becomes final and fully enforceable against you.',
    nextSteps: 'File an Einspruch with the court. This reopens the case and allows you to present your defense as if the default never happened.',
  },
  {
    value: 'berufung',
    label: 'Berufung (Appeal)',
    months: 1,
    consequence: 'If you miss the 1-month appeal deadline, the first-instance judgment becomes final and enforceable. There is generally no way to restore the deadline.',
    nextSteps: 'Engage a lawyer admitted to the Oberlandesgericht to file a notice of appeal (Berufungsschrift). The appeal brief (Berufungsbegr\u00fcndung) is due separately within 2 months.',
  },
  {
    value: 'berufungsbegruendung',
    label: 'Berufungsbegr\u00fcndung (Appeal Brief)',
    months: 2,
    consequence: 'If the appeal brief is not filed within 2 months, the appeal is dismissed as inadmissible and the first-instance judgment becomes final.',
    nextSteps: 'Your appellate attorney must file a substantive brief explaining the legal or factual errors in the first-instance judgment.',
  },
];

const LIMITATION_TYPES = [
  { value: 'general-contract', label: 'Contractual claims (general) \u2014 \u00a7 195 BGB', dateLabel: 'Date you became aware of the claim' },
  { value: 'warranty-sale', label: 'Warranty \u2014 Sale of goods \u2014 \u00a7 438 BGB', dateLabel: 'Date of delivery' },
  { value: 'warranty-work', label: 'Warranty \u2014 Works/services \u2014 \u00a7 634a BGB', dateLabel: 'Date of acceptance' },
  { value: 'construction', label: 'Construction defects \u2014 \u00a7 634a BGB', dateLabel: 'Date of acceptance' },
  { value: 'real-estate', label: 'Real estate claims \u2014 \u00a7 196 BGB', dateLabel: 'Date the claim arose' },
  { value: 'unfair-dismissal', label: 'Unfair dismissal \u2014 \u00a7 4 KSchG', dateLabel: 'Date you received the termination notice' },
  { value: 'unfair-competition', label: 'Unfair competition \u2014 \u00a7 11 UWG', dateLabel: 'Date you became aware of the infringement' },
  { value: 'director-liability', label: 'Director liability \u2014 \u00a7 43 GmbHG', dateLabel: 'Date the claim arose' },
  { value: 'tort', label: 'Tort/delict claims \u2014 \u00a7 199 BGB', dateLabel: 'Date you became aware of the damage' },
];

function DeadlineDisclaimer() {
  return (
    <div className="bg-[#FFF8E7] border border-[#F0DCA0] rounded p-5 mt-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 min-w-[32px] rounded-full bg-[rgba(166,139,75,0.06)] border border-gold/[0.12] flex items-center justify-center mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A68B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <p className="text-[0.88rem] text-ink leading-relaxed">
          <strong>Important:</strong> This calculator provides a general indication of procedural
        deadlines only. The exact deadline in your case must be calculated by a qualified attorney based on
        the specific circumstances, including the method of service, applicable regional holidays, and any
        court-specific orders. This tool is not a substitute for professional legal advice. If you have
        received a German court document, contact an attorney immediately &mdash; do not rely solely on this
        calculator.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ days }: { days: number }) {
  if (days < 0)
    return (
      <span className="inline-block text-[0.78rem] font-bold text-white bg-[#C0392B] rounded px-3 py-1">
        EXPIRED
      </span>
    );
  if (days < 3)
    return (
      <span className="inline-block text-[0.78rem] font-bold text-white bg-[#C0392B] rounded px-3 py-1">
        URGENT &mdash; {days} days left
      </span>
    );
  if (days <= 7)
    return (
      <span className="inline-block text-[0.78rem] font-bold text-[#856404] bg-[#FFF3CD] rounded px-3 py-1">
        {days} days remaining
      </span>
    );
  return (
    <span className="inline-block text-[0.78rem] font-bold text-green bg-green-bg rounded px-3 py-1">
      {days} days remaining
    </span>
  );
}

export default function DeadlineCheckerPage() {
  // Response Deadlines state
  const [docType, setDocType] = useState(DOCUMENT_TYPES[0].value);
  const [serviceDate, setServiceDate] = useState(today());
  const [deadlineResult, setDeadlineResult] = useState<DeadlineResult | null>(null);

  // Statute of Limitations state
  const [limType, setLimType] = useState(LIMITATION_TYPES[0].value);
  const [limDate, setLimDate] = useState(today());
  const [limResult, setLimResult] = useState<LimitationResult | null>(null);

  function calcDeadline() {
    const doc = DOCUMENT_TYPES.find((d) => d.value === docType);
    if (!doc || !serviceDate) return;
    const date = new Date(serviceDate + 'T00:00:00');
    const result = calculateDeadline(date, doc.weeks, doc.months);
    setDeadlineResult(result);
  }

  function calcLimitation() {
    if (!limDate) return;
    const date = new Date(limDate + 'T00:00:00');
    const result = calculateLimitation(limType, date);
    setLimResult(result);
  }

  const selectedDoc = DOCUMENT_TYPES.find((d) => d.value === docType);
  const selectedLim = LIMITATION_TYPES.find((l) => l.value === limType);

  return (
    <main>
      <ToolSchema tool="deadline-checker" />
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
            <span>Deadline Checker</span>
          </div>
          <h1 className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold leading-tight">
            Deadline &amp; Statute of Limitations Checker
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            Check response deadlines for German court documents and calculate statute of limitations
            periods for common types of claims.
          </p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-8 py-12">
        {/* ──────────── SECTION 1: Response Deadlines ──────────── */}
        <div className="mb-16">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Section 1
          </div>
          <h2 className="font-serif text-[1.4rem] font-bold mb-2">Response Deadlines</h2>
          <p className="text-[0.95rem] text-ink-muted mb-6 max-w-[620px] leading-relaxed">
            Select the type of court document you received and enter the date it was served on you.
          </p>

          <div className="bg-white border border-border-light rounded p-8">
            <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
              <div>
                <label htmlFor="docType" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Document Type
                </label>
                <select
                  id="docType"
                  value={docType}
                  onChange={(e) => { setDocType(e.target.value); setDeadlineResult(null); }}
                  className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                >
                  {DOCUMENT_TYPES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Date of Service
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => { setServiceDate(e.target.value); setDeadlineResult(null); }}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                />
              </div>
            </div>

            <button
              onClick={calcDeadline}
              className="py-3 px-8 bg-gold text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.2)]"
            >
              Calculate Deadline
            </button>

            {deadlineResult && selectedDoc && (
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-serif text-[1.1rem] font-bold">Your Deadline</h3>
                  <StatusBadge days={deadlineResult.daysRemaining} />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
                  <div className="bg-cream rounded p-5">
                    <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                      Deadline
                    </div>
                    <div className="font-serif text-[1.2rem] font-bold text-ink">
                      {fmtDate(deadlineResult.effectiveDeadline)}
                    </div>
                  </div>
                  <div className="bg-cream rounded p-5">
                    <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                      Time Remaining
                    </div>
                    <div className={`font-serif text-[1.2rem] font-bold ${
                      deadlineResult.daysRemaining < 0
                        ? 'text-[#C0392B]'
                        : deadlineResult.daysRemaining <= 3
                          ? 'text-[#C0392B]'
                          : deadlineResult.daysRemaining <= 7
                            ? 'text-[#856404]'
                            : 'text-green'
                    }`}>
                      {deadlineResult.daysRemaining < 0
                        ? `Expired ${Math.abs(deadlineResult.daysRemaining)} days ago`
                        : `${deadlineResult.daysRemaining} days`}
                    </div>
                  </div>
                </div>

                {deadlineResult.extended && deadlineResult.extensionReason && (
                  <div className="bg-gold-bg border border-gold/[0.12] rounded p-4 mb-5 text-[0.88rem] text-ink-light leading-relaxed">
                    <strong>Note:</strong> The original deadline ({fmtDate(deadlineResult.originalDeadline)})
                    falls on a {deadlineResult.extensionReason}. Under German procedural law (&sect; 222 ZPO),
                    the deadline is extended to the next business day.
                  </div>
                )}

                {selectedDoc.note && (
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">
                    {selectedDoc.note}
                  </p>
                )}

                <div className="bg-[#FDF2F2] border border-[#F5C6CB] rounded p-4 mb-4">
                  <p className="text-[0.88rem] text-ink leading-relaxed">
                    <strong>If you miss this deadline:</strong> {selectedDoc.consequence}
                  </p>
                </div>

                <div className="bg-green-bg border border-green/20 rounded p-4">
                  <p className="text-[0.88rem] text-ink leading-relaxed">
                    <strong>Recommended next steps:</strong> {selectedDoc.nextSteps}
                  </p>
                </div>
              </div>
            )}
          </div>

          <DeadlineDisclaimer />
        </div>

        {/* ──────────── SECTION 2: Statute of Limitations ──────────── */}
        <div className="mb-16">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Section 2
          </div>
          <h2 className="font-serif text-[1.4rem] font-bold mb-2">Statute of Limitations Calculator</h2>
          <p className="text-[0.95rem] text-ink-muted mb-6 max-w-[620px] leading-relaxed">
            Select the type of claim and enter the relevant date to calculate when the statute of
            limitations expires.
          </p>

          <div className="bg-white border border-border-light rounded p-8">
            <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
              <div>
                <label htmlFor="limType" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Type of Claim
                </label>
                <select
                  id="limType"
                  value={limType}
                  onChange={(e) => { setLimType(e.target.value); setLimResult(null); }}
                  className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                >
                  {LIMITATION_TYPES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  {selectedLim?.dateLabel || 'Relevant Date'}
                </label>
                <input
                  type="date"
                  value={limDate}
                  onChange={(e) => { setLimDate(e.target.value); setLimResult(null); }}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                />
              </div>
            </div>

            <button
              onClick={calcLimitation}
              className="py-3 px-8 bg-gold text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.2)]"
            >
              Calculate Limitation Period
            </button>

            {limResult && (
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-serif text-[1.1rem] font-bold">Limitation Period</h3>
                  <StatusBadge days={limResult.daysRemaining} />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
                  <div className="bg-cream rounded p-5">
                    <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                      Expires On
                    </div>
                    <div className="font-serif text-[1.2rem] font-bold text-ink">
                      {fmtDate(limResult.expiryDate)}
                    </div>
                  </div>
                  <div className="bg-cream rounded p-5">
                    <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                      Time Remaining
                    </div>
                    <div className={`font-serif text-[1.2rem] font-bold ${
                      limResult.daysRemaining < 0
                        ? 'text-[#C0392B]'
                        : limResult.daysRemaining <= 90
                          ? 'text-[#856404]'
                          : 'text-green'
                    }`}>
                      {limResult.daysRemaining < 0
                        ? `Expired ${Math.abs(limResult.daysRemaining)} days ago`
                        : limResult.daysRemaining > 365
                          ? `${Math.floor(limResult.daysRemaining / 365)} years, ${Math.floor((limResult.daysRemaining % 365) / 30)} months`
                          : limResult.daysRemaining > 30
                            ? `${Math.floor(limResult.daysRemaining / 30)} months, ${limResult.daysRemaining % 30} days`
                            : `${limResult.daysRemaining} days`}
                    </div>
                  </div>
                </div>

                <p className="text-[0.88rem] text-ink-light leading-relaxed mb-4">
                  {limResult.description}
                </p>

                {limResult.yearEndRule && (
                  <div className="bg-gold-bg border border-gold/[0.12] rounded p-4 mb-4 text-[0.88rem] text-ink-light leading-relaxed">
                    <strong>Year-end rule (&sect; 199 BGB):</strong> The limitation period does not begin on
                    the date of the event itself, but at the end of the calendar year in which the claim
                    arose and you became (or should have become) aware of it. This means the limitation
                    always expires on December 31.
                  </div>
                )}

                <div className="bg-cream border border-border-light rounded p-4">
                  <p className="text-[0.88rem] text-ink leading-relaxed mb-2">
                    <strong>What can stop the clock?</strong> The limitation period can be suspended
                    (gehemmt) by:
                  </p>
                  <ul className="text-[0.88rem] text-ink-muted leading-relaxed list-disc pl-5 flex flex-col gap-1">
                    <li>Filing a lawsuit (Klageerhebung)</li>
                    <li>Filing for a payment order (Mahnbescheid)</li>
                    <li>Entering into settlement negotiations (Verhandlungen)</li>
                    <li>Initiating mediation or arbitration proceedings</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <DeadlineDisclaimer />
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="font-serif text-[1.3rem] font-bold mb-3">Received a German Court Document?</h3>
          <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[500px] mx-auto">
            Don&rsquo;t risk missing a deadline. Contact us for a free assessment &mdash; we typically
            respond within 48 hours, or faster for urgent deadline matters.
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
