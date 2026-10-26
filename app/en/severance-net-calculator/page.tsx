'use client';

import { useState, useMemo } from 'react';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { calculateNetSeverance, type NetSeveranceResult } from '@/lib/tax-calculator';

const BASE = 'https://www.gekuendigt-abfindung.de';
const PAGE_URL = `${BASE}/en/severance-net-calculator/`;

const faqs = [
  {
    q: 'What stays net from a German severance payment?',
    a: 'German severance is subject to income tax but exempt from social-security contributions. Typically 55–70 % of the gross amount remains as net, depending on annual income, severance size, filing status (married-joint or single) and church tax. The one-fifth rule (§ 34 EStG) significantly reduces progression — in mid-income cases it saves several thousand euro.',
  },
  {
    q: 'How does the German one-fifth rule (Fünftelregelung) work?',
    a: 'The one-fifth rule under § 34 EStG softens progression on one-time payments like severance. The maths: one-fifth of the severance is notionally added to annual taxable income, the additional tax is computed, and multiplied by five. Formula: TaxWithFR = 5 × (Tax(zvE + severance/5) − Tax(zvE)). This flattens the progression curve.',
  },
  {
    q: 'Does the employer apply the one-fifth rule automatically?',
    a: 'Not since 2025. Through 2024, employers applied the Fünftelregelung directly in payroll. Under the Wachstumschancengesetz (effective 2025), employees must claim the one-fifth rule themselves in the annual income-tax return (Anlage N). The employer withholds regular wage tax; any overpayment is refunded via the tax assessment.',
  },
  {
    q: 'What preconditions must the one-fifth rule meet?',
    a: 'The key criterion is "Zusammenballung" (bundling of income): the severance plus regular income in the payment year must exceed the comparable income without the termination. Payment must happen in a single tax year (cash-basis principle, § 11 EStG). Splitting the payment over multiple years typically forfeits the one-fifth benefit.',
  },
  {
    q: 'Does severance trigger the solidarity surcharge (Soli)?',
    a: 'Only above a free-amount threshold (§ 3 SolzG). For single filers the Soli applies when annual income tax exceeds roughly €19,950; for joint filing roughly €39,900. Between the threshold and the full-rate zone a smoothing applies; above, the full 5.5 % on income tax applies.',
  },
  {
    q: 'How does church tax affect the net?',
    a: 'Church tax (Kirchensteuer) is a surcharge on income tax: 8 % in Bavaria and Baden-Württemberg, 9 % in all other federal states. Non-members pay zero. Leaving the church before severance inflow eliminates the surcharge on the severance — the exit must be registered before the actual payment date.',
  },
  {
    q: 'Is this calculator legally binding?',
    a: 'No. The result is a first-orientation estimate based on the standard 2025 tax tariff (§ 32a EStG). The actual tax liability depends on additional factors not captured here: business expenses, extraordinary deductions, Progressionsvorbehalt (unemployment benefit, parental allowance, sick benefit), additional income (capital, rental), and the precise cash-flow year. For a binding figure consult a tax adviser.',
  },
];

function formatEur(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SeveranceNetCalculatorEn() {
  const [regular, setRegular] = useState(55000);
  const [severance, setSeverance] = useState(30000);
  const [splitting, setSplitting] = useState(false);
  const [kistRate, setKistRate] = useState<0 | 0.08 | 0.09>(0);
  const [result, setResult] = useState<NetSeveranceResult | null>(null);

  function calculate() {
    if (regular < 0 || severance <= 0) return;
    setResult(
      calculateNetSeverance({
        regularAnnualIncome: regular,
        severanceGross: severance,
        splitting,
        churchTaxRate: kistRate,
      }),
    );
  }

  const netRatio = useMemo(() => {
    if (!result) return null;
    return severance > 0 ? Math.round((result.netSeverance / severance) * 100) : null;
  }, [result, severance]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'German Severance Net Calculator (English)',
                url: PAGE_URL,
                applicationCategory: 'LegalTool',
                operatingSystem: 'Any',
                inLanguage: 'en',
                description:
                  'Free calculator for the net amount of a German severance payment, including the one-fifth rule (§ 34 EStG), solidarity surcharge and church tax — based on the 2025 income-tax tariff.',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/en/tools/` },
                  { '@type': 'ListItem', position: 3, name: 'Severance net calculator', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Severance net calculator"
        title="German severance net calculator — with Fünftelregelung"
        lede="Free calculator for the net amount of a German severance after income tax, solidarity surcharge and church tax, including the one-fifth rule (§ 34 EStG). Standard-case orientation, not a binding tax computation."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/severance-net-calculator', label: 'Severance net calculator' },
        ]}
      />

      {/* GEO direct-answer */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>A German severance payment typically leaves 55–70 % as net after tax</strong>,
              depending on annual income, severance size, filing status and church-tax
              membership. Severance is subject to income tax (§ 24 Nr. 1 EStG) but exempt
              from social-security contributions. The <strong>one-fifth rule
              (Fünftelregelung, § 34 EStG)</strong> softens the progression and typically
              saves €500 to several thousand euro. Since 2025 the one-fifth rule must be
              claimed in the annual income-tax return — the employer no longer applies it
              automatically through payroll.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="bg-cream border border-border-light rounded p-8">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div>
                <label className="block text-[0.9rem] font-semibold text-ink mb-2">
                  Annual gross income without severance: {formatEur(regular)}
                </label>
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={2500}
                  value={regular}
                  onChange={(e) => setRegular(Number(e.target.value))}
                  className="w-full accent-gold-dark"
                />
                <p className="text-[0.8rem] text-ink-muted mt-1">
                  Annual gross in the year the severance is paid.
                </p>

                <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-6">
                  Severance gross: {formatEur(severance)}
                </label>
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={2500}
                  value={severance}
                  onChange={(e) => setSeverance(Number(e.target.value))}
                  className="w-full accent-gold-dark"
                />
              </div>

              <div>
                <label className="block text-[0.9rem] font-semibold text-ink mb-2">
                  Filing status
                </label>
                <select
                  value={splitting ? 'splitting' : 'single'}
                  onChange={(e) => setSplitting(e.target.value === 'splitting')}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold"
                >
                  <option value="single">Single / individual assessment</option>
                  <option value="splitting">Married / joint assessment (Splitting)</option>
                </select>

                <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-5">
                  Church tax
                </label>
                <select
                  value={String(kistRate)}
                  onChange={(e) => setKistRate(Number(e.target.value) as 0 | 0.08 | 0.09)}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold"
                >
                  <option value="0">None (no church membership)</option>
                  <option value="0.09">9 % (all states except BY and BW)</option>
                  <option value="0.08">8 % (Bavaria, Baden-Württemberg)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculate}
              data-track="rechner_severance_net_calculate_en"
              className="w-full mt-6 py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer hover:bg-[#635428] transition-colors"
            >
              Calculate net severance
            </button>

            <p className="text-[0.72rem] text-ink-muted mt-3 leading-relaxed">
              Based on the standard 2025 German income-tax tariff. For a binding figure,
              consult a tax adviser — see disclaimer below.
            </p>
          </div>

          {result && (
            <div className="mt-8 space-y-5">
              <div className="rounded-sm border-2 border-gold p-7 bg-gold-bg text-center">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Net severance
                </div>
                <div className="font-serif text-[2.6rem] font-extrabold text-ink leading-none">
                  {formatEur(result.netSeverance)}
                </div>
                {netRatio !== null && (
                  <div className="text-[0.9rem] text-gold-dark mt-2">
                    {netRatio}% of gross · effective tax rate {result.effectiveTaxRate}%
                  </div>
                )}
              </div>

              <div className="rounded-sm border border-border p-6 bg-white">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
                  Tax burden on the severance
                </div>
                <dl className="grid grid-cols-2 gap-y-2.5 text-[0.95rem]">
                  <dt className="text-ink-light">Income tax (with one-fifth rule)</dt>
                  <dd className="text-ink text-right font-medium">{formatEur(result.severanceTax)}</dd>
                  <dt className="text-ink-light">Solidarity surcharge</dt>
                  <dd className="text-ink text-right font-medium">{formatEur(result.severanceSoli)}</dd>
                  <dt className="text-ink-light">Church tax</dt>
                  <dd className="text-ink text-right font-medium">{formatEur(result.severanceChurchTax)}</dd>
                  <dt className="text-ink pt-2 border-t border-border font-semibold">Total deduction</dt>
                  <dd className="text-ink text-right font-semibold pt-2 border-t border-border">
                    {formatEur(result.severanceTax + result.severanceSoli + result.severanceChurchTax)}
                  </dd>
                </dl>
              </div>

              {result.fifthRuleSaving > 0 && (
                <div className="rounded-sm border-l-[3px] border-gold bg-cream p-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    One-fifth rule saving
                  </div>
                  <p className="text-[1.05rem] text-ink leading-relaxed mb-2">
                    The Fünftelregelung saves{' '}
                    <strong className="text-gold-dark">{formatEur(result.fifthRuleSaving)}</strong>{' '}
                    in income tax.
                  </p>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-0">
                    Without the one-fifth rule the income tax on the severance would be{' '}
                    {formatEur(result.taxWithoutFifthRule - result.regularTax)} instead of{' '}
                    {formatEur(result.severanceTax)}. Since 2025 you must claim it in your
                    annual tax return — the employer withholds regular wage tax.
                  </p>
                </div>
              )}

              <div className="rounded-sm border border-border py-4 px-5 bg-cream">
                <p className="text-[0.82rem] text-ink-muted leading-relaxed mb-0">
                  <strong>Note:</strong> Based on the German income-tax tariff{' '}
                  {result.tarifJahr} (§ 32a EStG). Includes income tax, Soli threshold
                  (§ 3 SolzG), one-fifth rule (§ 34 EStG) and optional church tax.
                  Not included: business expenses, extraordinary deductions,
                  Progressionsvorbehalt (unemployment benefit, parental allowance),
                  additional income.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How does the calculator work */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Calculation path
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            How the calculator produces the net figure
          </h2>
          <ol className="list-decimal pl-6 text-[0.95rem] text-ink-light leading-relaxed space-y-2.5">
            <li><strong>Regular income tax</strong> on annual income without severance — § 32a EStG, 5-zone tariff (basic allowance, two progression zones, 42 % top rate, 45 % reichensteuer).</li>
            <li><strong>One-fifth rule</strong> (§ 34 EStG): tax on the severance is computed as{' '}
              <code className="bg-white px-1.5 py-0.5 rounded">5 × (Tax(zvE + severance/5) − Tax(zvE))</code>,
              flattening progression.
            </li>
            <li><strong>Solidarity surcharge</strong>: 5.5 % on income tax, only above the threshold (§ 3 SolzG). Below: nothing. In the smoothing zone: a lower, linearly-interpolated amount.</li>
            <li><strong>Church tax</strong>: 8 % (BY, BW) or 9 % (rest), applied to the income tax. Zero if not a church member.</li>
            <li><strong>Net severance</strong> = Gross severance − (income tax + Soli + church tax). No social-security contributions apply to severance payments (§ 14 SGB IV).</li>
          </ol>
        </div>
      </section>

      {/* One-fifth rule deep dive */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Fünftelregelung in detail
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            When the one-fifth rule applies — and when it doesn&apos;t
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            The Fünftelregelung is a tax relief for extraordinary one-off income. Instead
            of pushing the full severance into the next tax bracket, only one-fifth is
            notionally added, the additional tax computed, and multiplied by five.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-3">
            <strong>Requirements</strong> (settled BFH case law, e.g. VI R 29/14):
          </p>
          <ul className="list-disc pl-5 text-[0.98rem] text-ink-light leading-relaxed space-y-2 mb-4">
            <li><strong>Zusammenballung</strong> (bundling of income): severance + regular income &gt; comparable income without the termination.</li>
            <li><strong>Payment in a single tax year</strong> (cash-basis principle, § 11 EStG) — multi-year staggered payments typically forfeit the benefit.</li>
            <li><strong>Nexus to employment termination</strong> (§ 24 Nr. 1 a EStG).</li>
          </ul>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            <strong>Since 2025 (Wachstumschancengesetz)</strong>: the one-fifth rule is no
            longer applied automatically by the employer. Employees claim the relief in
            the annual tax return (Anlage N). Any excess wage tax withheld is refunded
            via the tax assessment.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            <strong>Practice tip</strong>: when you receive severance, plan the tax
            return carefully for that year — business expenses from the termination year
            (relocation, professional literature, upskilling) further reduce zvE and
            raise the net amount.
          </p>
        </div>
      </section>

      {/* Legal sources */}
      <section className="py-10 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Legal basis &amp; sources
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li><a href="https://www.gesetze-im-internet.de/estg/__32a.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 32a EStG — Income-tax tariff &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 34 EStG — One-fifth rule &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/estg/__24.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 24 EStG — Severance as extraordinary income &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/solzg_1995/__3.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 3 SolzG — Solidarity surcharge threshold &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/estg/__11.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 11 EStG — Cash-basis principle &rarr;</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            FAQ
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold leading-[1.25] mb-6">
            Frequently asked questions
          </h2>
          <ul className="list-none m-0 p-0">
            {faqs.map((f, idx) => (
              <li key={f.q} className={`py-5 ${idx === 0 ? 'border-t' : ''} border-b border-border`}>
                <h3 className="font-serif text-[1.05rem] font-semibold text-ink mb-2 leading-snug">{f.q}</h3>
                <p className="text-[0.94rem] text-ink-muted leading-relaxed mb-0">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[820px] bg-white border-l-[4px] border-amber-500 rounded-sm p-6">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-amber-800 mb-3">
              Legal disclaimer
            </div>
            <h2 className="font-serif text-[1.1rem] font-bold text-ink mb-3">
              Not tax advice — orientation only
            </h2>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-3">
              This calculator provides a <strong>non-binding first orientation</strong>{' '}
              based on the current German income-tax tariff. It does not constitute tax
              advice and does not replace it.
            </p>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-3">
              The actual tax liability depends on factors not captured here: business
              expenses, extraordinary deductions, Progressionsvorbehalt (unemployment
              benefit, parental allowance, sick pay), additional income (capital, rental,
              side jobs), the precise cash-flow year, the Zusammenballung requirement
              and loss carry-forwards.
            </p>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-0">
              For the <strong>binding tax computation</strong> the responsible authority
              is the Finanzamt; for tax structuring, a{' '}
              <strong>Steuerberater (tax adviser)</strong>. APOS Legal advises on the
              employment-law side of severance; the tax structuring is best coordinated
              with your tax adviser.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
