import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/severance-table/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Severance Table Germany ${new Date().getFullYear()} — by Tenure and Salary`,
  description:
    'German severance table: half-month rule (§ 1a KSchG) plus 1.0× and 1.5× columns across the most common gross-monthly-salary brackets. Covers tax treatment, unemployment-benefit interaction, settlement vs. termination agreement.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
    },
  },
};

const YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20] as const;
const SALARIES = [2500, 3500, 5000, 7500, 10000] as const;

function severance(salary: number, years: number, factor: number): number {
  return Math.round(salary * factor * years);
}

const faqs = [
  {
    q: 'How is severance calculated using the half-month rule?',
    a: 'The rule of thumb is 0.5 × gross monthly salary × completed years of service. Example: at €4,000 gross and 10 years of service, 0.5 × 4,000 × 10 = €20,000. In practice the factor ranges from 0.5× to 1.5× depending on bargaining posture; partial years of ≥6 months are rounded up by settled labour-court practice.',
  },
  {
    q: 'Is there a statutory right to severance in Germany?',
    a: 'There is no general right to severance under German law. Narrow exceptions: (1) § 1a KSchG — severance offer in the dismissal letter after operational dismissal in exchange for waiving an unfair-dismissal claim (0.5 months per year), (2) social plan at the works-council level, (3) court settlement or judicial dissolution under § 9 KSchG. In practice severance is almost always negotiated during an unfair-dismissal case.',
  },
  {
    q: 'Which factor (0.5× / 1.0× / 1.5×) applies to my case?',
    a: 'It depends on the strength of your legal position. 0.5× is the statutory baseline under § 1a KSchG. 1.0× is the typical labour-court settlement for a solid case. 1.5× or more is achieved with long tenure, advanced age, obvious invalidity of the dismissal, or when the employer needs rapid closure (e.g. restructuring deadlines).',
  },
  {
    q: 'Does severance reduce my unemployment benefit (Arbeitslosengeld)?',
    a: 'In principle no — severance does not reduce the amount of unemployment benefit as long as the regular notice period was observed. If the notice period is shortened (typical in termination agreements), a dormancy period (§ 158 SGB III) may delay the start of benefits. Have the construct reviewed before signing.',
  },
  {
    q: 'Is severance taxable in Germany?',
    a: 'Yes. Severance is subject to income tax, but exempt from social-security contributions. The one-fifth rule (§ 34 EStG) spreads the taxable event over five years and typically saves several thousand euro on larger payments. Since 2025 the Fünftelregelung is no longer automatically applied on the monthly payslip — it must be claimed in the annual income-tax return.',
  },
];

const FACTOR_SECTIONS = [
  {
    factor: 0.5,
    title: 'Severance table — factor 0.5× (§ 1a KSchG baseline)',
    note: 'The statutory baseline under § 1a KSchG. Most settlements at the Arbeitsgericht land here or above.',
    bg: 'bg-white',
    tableBg: 'bg-cream',
    headBg: 'bg-white',
  },
  {
    factor: 1.0,
    title: 'Severance table — factor 1.0× (settlement in court)',
    note: 'Typical labour-court settlement range for a solid case: formal defects, mid-length tenure, straightforward operational background.',
    bg: 'bg-cream',
    tableBg: 'bg-white',
    headBg: 'bg-cream',
  },
  {
    factor: 1.5,
    title: 'Severance table — factor 1.5× (strong leverage)',
    note: 'Achievable with special protection (pregnancy, severe disability, works council), long tenure, obvious invalidity of the dismissal or when the employer needs rapid closure.',
    bg: 'bg-white',
    tableBg: 'bg-cream',
    headBg: 'bg-white',
  },
];

export default function SeveranceTableEn() {
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
                '@type': 'Article',
                headline: 'German Severance Table — half-month rule by tenure and salary',
                mainEntityOfPage: PAGE_URL,
                author: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
                publisher: { '@id': SEO_CONFIG.organization.id },
                inLanguage: 'en',
                articleSection: 'German employment law',
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
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.baseUrl}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Severance table', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Severance table"
        title="German severance table — half-month rule across tenures and salaries"
        lede="Ready-reckoner for the most common salary brackets at factors 0.5×, 1.0× and 1.5× per completed year of service. For a tailored estimate: use the calculator; for a binding review: send us your dismissal letter."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/severance-table', label: 'Severance table' },
        ]}
        primaryCta={{ href: '/en/severance-calculator', label: 'Use the calculator' }}
        secondaryCta={{ href: '#contact', label: 'Free case review' }}
      />

      {/* Direct-answer block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>German severance follows no fixed statutory amount.</strong> The industry
              baseline is the half-month rule from § 1a KSchG:{' '}
              <strong>0.5 × gross monthly salary × completed years of service</strong>. Court
              settlements most often land between 0.5× and 1.5×, depending on how attackable
              the dismissal is. The tables below cover the common salary brackets at the three
              typical factors.
            </p>
          </div>
        </div>
      </section>

      {FACTOR_SECTIONS.map((s) => (
        <section key={s.factor} className={`py-12 px-8 ${s.bg}`}>
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-3">
              {s.title}
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[760px]">{s.note}</p>
            <div className={`overflow-x-auto border border-border-light rounded ${s.tableBg}`}>
              <table className="w-full text-[0.92rem]">
                <thead className={`text-left ${s.headBg}`}>
                  <tr>
                    <th className="px-5 py-3 font-semibold text-ink">Years of service</th>
                    {SALARIES.map((sal) => (
                      <th key={sal} className="px-5 py-3 font-semibold text-ink">
                        €{sal.toLocaleString('en-GB')}/mo
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {YEARS.map((y) => (
                    <tr key={y} className="border-t border-border-light">
                      <td className="px-5 py-3 text-ink-light font-semibold">
                        {y} {y === 1 ? 'year' : 'years'}
                      </td>
                      {SALARIES.map((sal) => (
                        <td key={sal} className="px-5 py-3 text-ink">
                          €{severance(sal, y, s.factor).toLocaleString('en-GB')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* When does which factor apply? */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Negotiation posture
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-bold mb-4">
            Which factor applies to your case?
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            <strong>Factor 0.5×</strong> is the statutory baseline from § 1a KSchG. An
            employer who offers this amount up-front in a dismissal letter asks the employee
            to waive the unfair-dismissal claim. It is the floor &mdash; not the ceiling.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            <strong>Factor 1.0×</strong> is the typical settlement amount at the labour court
            (Arbeitsgericht) for a plausible case &mdash; formal defects such as a missing
            works-council hearing (§ 102 BetrVG), breach of written form (§ 623 BGB) or
            flawed social selection (§ 1 (3) KSchG).
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            <strong>Factor 1.5× and above</strong> is achievable with special protection
            (pregnancy, severe disability, works-council member), obvious invalidity of the
            dismissal, long tenure combined with advanced age (weaker re-employment prospects),
            or when the employer has an operational need to close the case quickly.
          </p>
        </div>
      </section>

      {/* Severance vs. termination agreement */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Strategic choice
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-bold mb-4">
            Severance in a termination agreement vs. settlement after dismissal
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            A <Link href="/en/termination-agreement/" className="text-gold-dark no-underline hover:underline">termination agreement (Aufhebungsvertrag)</Link>{' '}
            avoids the three-week filing window and lets both sides agree a predictable
            end-date and severance payment. Trade-off: without the right wording the Federal
            Employment Agency can impose a 12-week dormancy on unemployment benefit (§ 158
            SGB III).
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Settlement after an unfair-dismissal claim typically produces higher severance
            but requires a formal filing within three weeks of receiving the letter{' '}
            (§ 4 KSchG). Negotiating leverage almost always arises only through filing the
            claim — see our{' '}
            <Link href="/en/unfair-dismissal-claim/" className="text-gold-dark no-underline hover:underline">
              unfair-dismissal claim overview
            </Link>.
          </p>
        </div>
      </section>

      {/* Tax treatment */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Taxation
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-bold mb-4">
            Taxing German severance — the one-fifth rule
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            Severance is subject to German income tax but exempt from social-security
            contributions. The <strong>Fünftelregelung</strong> under § 34 EStG spreads the
            taxable event over five years and significantly reduces the effective tax rate on
            lump-sum severance.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Example: on a €40,000 severance payment, the one-fifth rule typically saves
            several thousand euro versus flat-tax treatment. Since 2025 (Wachstumschancengesetz)
            the rule is no longer applied automatically on the payslip — it must be claimed in
            the annual income-tax return.
          </p>
        </div>
      </section>

      {/* Unemployment-benefit interaction */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Unemployment benefit
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-bold mb-4">
            Will severance delay or reduce my Arbeitslosengeld?
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            The amount of unemployment benefit (Arbeitslosengeld) is not reduced by severance,
            provided the regular notice period was observed. If the notice period is shortened
            — typical in a termination agreement — a dormancy period applies under{' '}
            § 158 SGB III: the first unemployment-benefit payment is delayed by the number of
            weeks the notice was shortened.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Separately, a <strong>Sperrzeit</strong> (12-week block) under § 159 SGB III can
            arise if the Agency considers the employee responsible for the unemployment
            (e.g. voluntary termination). Precise wording in the termination agreement avoids
            this trap.
          </p>
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
              <li><a href="https://www.gesetze-im-internet.de/kschg/__1a.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 1a KSchG — Statutory severance offer &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/kschg/__9.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 9 KSchG — Judicial dissolution and severance &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/kschg/__10.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 10 KSchG — Severance amount &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 34 EStG — One-fifth rule &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/sgb_3/__158.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 158 SGB III — Dormancy period &rarr;</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/severance-pay', label: 'Severance pay — overview' },
              { href: '/en/severance-calculator', label: 'Severance calculator' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/termination-agreement', label: 'Termination agreement' },
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/notice-periods', label: 'Notice periods' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                {l.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
