'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';

const BASE = 'https://www.gekuendigt-abfindung.de';
const PAGE_URL = `${BASE}/en/notice-period-calculator/`;

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

const TABLE = [
  { years: 'Within probation (≤ 6 months)', notice: '2 weeks', endpoint: 'any day', norm: '§ 622 (3) BGB' },
  { years: 'Up to 2 years', notice: '4 weeks', endpoint: '15th or end of month', norm: '§ 622 (1) BGB' },
  { years: '2 to 5 years', notice: '1 month', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '5 to 8 years', notice: '2 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '8 to 10 years', notice: '3 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '10 to 12 years', notice: '4 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '12 to 15 years', notice: '5 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '15 to 20 years', notice: '6 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
  { years: '20 years and above', notice: '7 months', endpoint: 'end of month', norm: '§ 622 (2) BGB' },
];

const faqs = [
  {
    q: 'What is the statutory notice period for an employer-issued dismissal in Germany?',
    a: 'Section 622 BGB sets a staircase: 4 weeks to the 15th or end of month for the first two years; after that the period grows with tenure (1 month at 2 years, 2 months at 5, 3 at 8, up to 7 months at 20 years). During the six-month probation period a uniform two-week notice applies and can be given to any day (§ 622 (3) BGB).',
  },
  {
    q: 'Can my contract shorten the statutory notice period?',
    a: 'For employer-issued notice: no — the statutory period of § 622 (2) BGB is a one-way floor. The contract can extend the period for the employer, but never shorten it. For employee-issued notice (resignation), the contract may stipulate the longer employer-notice applies both ways, but it cannot force a notice longer than the one the employer would owe.',
  },
  {
    q: 'What happens if the employer uses the wrong notice period?',
    a: 'Settled German case law (BAG 2 AZR 36/11, 6 AZR 158/11) interprets a dismissal with a too-short notice as a dismissal at the next correct date, provided the intent to terminate is clear. The three-week filing deadline under § 4 KSchG still applies — if you want to challenge the dismissal as such, you must file within three weeks regardless of the notice-date issue.',
  },
  {
    q: 'Does the notice period change for extraordinary (summary) dismissals?',
    a: 'No. An extraordinary dismissal under § 626 BGB is dismissal without notice — the employment ends on receipt. It requires a "wichtiger Grund" (important cause) that makes it unreasonable to await the regular notice. Employers must act within two weeks of knowing the cause (§ 626 (2) BGB). The regular notice periods of § 622 BGB do not apply.',
  },
  {
    q: 'What about collective agreements (Tarifverträge)?',
    a: 'A binding tariff agreement can modify § 622 BGB — including shorter periods for very specific sectors — because the statute allows deviation by tariff. Check whether your employer is bound to an industry tariff (IG Metall, ver.di, etc.) and whether the agreement is referenced in your contract.',
  },
];

export default function NoticePeriodCalculatorEn() {
  const [years, setYears] = useState(5);
  const [inProbation, setInProbation] = useState(false);
  const notice = useMemo(() => statutoryNotice(years, inProbation), [years, inProbation]);

  return (
    <main>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'German Statutory Notice-Period Calculator (English)',
                url: PAGE_URL,
                applicationCategory: 'LegalTool',
                operatingSystem: 'Any',
                inLanguage: 'en',
                description: 'Statutory notice period under § 622 BGB by tenure, incl. the six-month probation rule.',
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
                  { '@type': 'ListItem', position: 3, name: 'Notice-period calculator', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Notice-period calculator"
        title="Statutory notice period — § 622 BGB"
        lede="Calculate the minimum notice your employer must observe based on your length of service. The contract can extend this period; it cannot shorten the statutory minimum for employer-issued notice."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
        ]}
      />

      {/* Direct-answer block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>The statutory notice period for an employer-issued dismissal in Germany
              is set by § 622 BGB and grows with tenure</strong> — from four weeks in the
              first two years to seven months after 20 years of service. During the six-month
              probation it is a uniform two weeks (§ 622 (3) BGB). The contract may extend
              this period for the employer, but never shorten it. Setting the wrong date on
              the dismissal letter is a classic defect: German courts interpret it as a
              dismissal to the next correct date, but you still have three weeks to challenge
              the dismissal as such (§ 4 KSchG).
            </p>
          </div>
        </div>
      </section>

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
                href="/en/check-dismissal/"
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

      {/* Full table */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] mb-5">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Statutory table
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-3">
              Full § 622 BGB notice-period staircase
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-0">
              The statutory minimum for employer-issued ordinary dismissals.
            </p>
          </div>
          <div className="overflow-x-auto border border-border-light rounded bg-cream">
            <table className="w-full text-[0.92rem]">
              <thead className="text-left bg-white">
                <tr>
                  <th className="px-5 py-3 font-semibold text-ink">Years of service</th>
                  <th className="px-5 py-3 font-semibold text-ink">Notice period</th>
                  <th className="px-5 py-3 font-semibold text-ink">Must end at</th>
                  <th className="px-5 py-3 font-semibold text-ink">Legal basis</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((r) => (
                  <tr key={r.years} className="border-t border-border-light">
                    <td className="px-5 py-3 text-ink-light font-semibold">{r.years}</td>
                    <td className="px-5 py-3 text-ink">{r.notice}</td>
                    <td className="px-5 py-3 text-ink-light">{r.endpoint}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.norm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Common pitfalls
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            When notice-period issues flip a case
          </h2>
          <ul className="list-disc pl-5 text-[0.98rem] text-ink-light leading-relaxed space-y-2 mb-4">
            <li><strong>Wrong termination date:</strong> dismissal to a date that misses the statutory minimum — courts typically reinterpret to the next correct date (BAG 2 AZR 36/11), but it is still a dismissal defect worth filing on.</li>
            <li><strong>Letter arrives too late in the month:</strong> if the letter reaches you after the 15th, a one-month notice to end-of-month skips an entire additional month — commonly overlooked.</li>
            <li><strong>Tenure miscounted:</strong> probation months and training years inside the same company count. Employers sometimes shortchange this to justify a shorter notice.</li>
            <li><strong>Collective agreement override:</strong> an industry tariff can modify § 622 BGB. If your employer applies IG Metall / ver.di terms, the contract and the applicable tariff must be checked together.</li>
          </ul>
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
                <h3 className="font-serif text-[1.05rem] font-semibold text-ink mb-2 leading-snug">
                  {f.q}
                </h3>
                <p className="text-[0.94rem] text-ink-muted leading-relaxed mb-0">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Legal sources */}
      <section className="py-10 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Legal basis &amp; sources
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li><a href="https://www.gesetze-im-internet.de/bgb/__622.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 622 BGB — Notice periods for employment relationships &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/bgb/__623.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 623 BGB — Written-form requirement &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/bgb/__626.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 626 BGB — Summary dismissal for important cause &rarr;</a></li>
            </ul>
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
