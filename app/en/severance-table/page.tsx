import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM } from '@/components/NormLink';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/severance-table/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Severance Table Germany ${new Date().getFullYear()} — by Tenure and Salary`,
  description:
    'German severance table: half-month rule (§ 1a KSchG) calculated for 1–20 years of service across typical salary brackets.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abfindungstabelle/`,
    },
  },
  openGraph: {
    title: 'Severance Table Germany — by Tenure and Salary',
    description:
      '§ 1a KSchG half-month-rule severance figures for 1–20 years of service across typical salary brackets.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'Where do the figures come from?',
    a: 'The 0.5× column reproduces the statutory anchor under § 1a KSchG (0.5 gross monthly salaries × years of service). The 1.0× column shows the realistic settlement level in stronger cases, matching the range we see in practice at the first-instance labour courts (Arbeitsgerichte).',
  },
  {
    q: 'How precise are these figures?',
    a: 'They are static multiplications. Real-world settlements regularly land between the two columns, occasionally above the 1.0× line — e.g. special-protection cases (pregnancy, severe disability, works council) or dismissals with clearly defective formal requirements. A specialist review on the actual dismissal letter normally narrows the realistic range to ±20 %.',
  },
  {
    q: 'How are partial years counted?',
    a: 'Under § 1a KSchG, 6 months and more count as a full year; less than 6 months are rounded down. The table rounds up visually to full-year rows for readability — the calculator at /en/severance-calculator supports any fractional year.',
  },
  {
    q: 'Is severance taxable in Germany?',
    a: 'Yes. Severance is taxable income in the payment year. The one-fifth rule (Fünftelregelung, § 34 EStG) can materially reduce the marginal tax by spreading the severance notionally over five years for rate-determination purposes. Social-security contributions, by contrast, are generally not owed on severance paid against the loss of the employment relationship.',
  },
  {
    q: 'Why do real settlements vary so much?',
    a: 'Because severance is a negotiated price for certainty, not a fixed entitlement. The weaker the employer’s legal position — missing works-council consultation, flawed social selection, § 174 BGB authorisation defects — the higher the factor it will pay to buy out the risk of a court-ordered reinstatement plus Annahmeverzugslohn.',
  },
];

const YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20] as const;
const SALARIES = [2500, 3500, 5000, 7500, 10000] as const;

function severance(salary: number, years: number, factor: number): number {
  return Math.round(salary * factor * years);
}

export default function SeveranceTableEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                inLanguage: 'en',
                headline: 'Severance Table Germany — § 1a KSchG Half-Month Rule',
                url: PAGE_URL,
                author: { '@type': 'Person', name: SEO_CONFIG.author.name },
                publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
              },
              {
                '@type': 'FAQPage',
                inLanguage: 'en',
                mainEntity: FAQS.map((f) => ({
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

    <main>
      <TopicHero
        eyebrow="Severance table"
        title="German severance table — half-month rule across tenures"
        lede="The half-month rule of § 1a KSchG (0.5 × gross monthly salary × years of service) is the baseline most settlements rest on. Below: ready-reckoner for the most common salary brackets, with a 1.0× column for stronger cases."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/severance-table', label: 'Severance table' },
        ]}
        primaryCta={{ href: '/en/severance-calculator', label: 'Use the calculator' }}
        secondaryCta={{ href: '#contact', label: 'Free case review' }}
      />

      {[0.5, 1.0].map((factor) => (
        <section
          key={factor}
          className={`py-12 px-8 ${factor === 0.5 ? 'bg-white' : 'bg-cream'}`}
        >
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-4">
              Severance at factor {factor.toFixed(1)}× per year
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[760px]">
              {factor === 0.5
                ? 'The statutory baseline under § 1a KSchG. Most settlements at the Arbeitsgericht land here or above.'
                : 'Achievable in strong cases: special protection, formal errors, long tenure, or attractive operational-restructuring leverage.'}
            </p>
            <div
              className={`overflow-x-auto border border-border-light rounded ${
                factor === 0.5 ? 'bg-cream' : 'bg-white'
              }`}
            >
              <table className="w-full text-[0.92rem]">
                <thead
                  className={`text-left ${factor === 0.5 ? 'bg-white' : 'bg-cream'}`}
                >
                  <tr>
                    <th className="px-5 py-3 font-semibold text-ink">Years of service</th>
                    {SALARIES.map((s) => (
                      <th key={s} className="px-5 py-3 font-semibold text-ink">
                        €{s.toLocaleString('en-GB')}/mo
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
                      {SALARIES.map((s) => (
                        <td key={s} className="px-5 py-3 text-ink">
                          €{severance(s, y, factor).toLocaleString('en-GB')}
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

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto max-w-[820px]">
          <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
            How to read these numbers
          </h2>
          <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
            The 0.5× column reproduces the statutory anchor under{' '}
            <NormLink href={NORM.kschg1a}>§&nbsp;1a KSchG</NormLink>. The 1.0× column shows a
            realistic settlement outcome where the dismissal is formally or substantively
            attackable. Real-world settlements deviate based on:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed mb-4">
            <li>
              The strength of the formal and substantive objections to the dismissal (handwritten
              signature under <NormLink href={NORM.bgb623}>§&nbsp;623 BGB</NormLink>,
              works-council consultation under <NormLink href={NORM.betrvg102}>§&nbsp;102 BetrVG</NormLink>,
              social-selection correctness under <NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink>).
            </li>
            <li>
              Special protection — pregnancy, severe disability, parental leave, works-council
              membership.
            </li>
            <li>Age and maintenance obligations (dependants).</li>
            <li>The bargaining posture of both sides and the realistic cost of litigation.</li>
          </ul>
          <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-0">
            A specialist review on your actual dismissal letter usually narrows the realistic
            range to ±20 %. Use the{' '}
            <Link href="/en/severance-calculator" className="text-gold-dark no-underline hover:underline">
              severance calculator →
            </Link>{' '}
            for a figure tailored to your salary, tenure and estimated leverage.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
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
                className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                {l.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-8 bg-white" id="faq">
        <div className="max-w-content mx-auto max-w-[860px]">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            FAQ
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
            Severance table — most common questions
          </h2>
          <div>
            {FAQS.map((faq) => (
              <details key={faq.q} className="border-b border-border-light py-5 group">
                <summary className="cursor-pointer text-[1.02rem] font-semibold text-ink list-none flex items-center justify-between gap-6 marker:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-gold-dark text-xl font-bold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mt-3 mb-1">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
    </>
  );
}
