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
    'German severance table: half-month rule (§ 1a KSchG) calculated for 1–20 years of service across typical salary brackets.',
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

export default function SeveranceTableEn() {
  return (
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
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">
            How to read these numbers
          </h2>
          <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
            The figures are simple multiplications of the half-month or full-month rule.
            Real-world settlements deviate based on (a) the strength of the formal/substantive
            objections to the dismissal, (b) special protection (pregnancy, severe disability,
            works council), (c) age and dependants, and (d) the bargaining posture of both
            sides. A specialist review on your actual letter usually narrows the realistic
            range to ±20%.
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

      <ContactForm />
      <CTA />
    </main>
  );
}
