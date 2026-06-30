import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/notice-periods/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Statutory Notice Periods Germany ${new Date().getFullYear()} — § 622 BGB Explained`,
  description:
    'Statutory notice periods under § 622 BGB: 4 weeks during probation, rising to 7 months after 20 years of service. Full table for employer-issued notice.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
    },
  },
};

interface NoticeRow {
  readonly tenure: string;
  readonly notice: string;
  readonly endpoint: string;
}

const NOTICE_TABLE: readonly NoticeRow[] = [
  { tenure: 'During probation (≤ 6 months)', notice: '2 weeks', endpoint: 'any day' },
  { tenure: 'After probation, < 2 years', notice: '4 weeks', endpoint: '15th or end of month' },
  { tenure: '≥ 2 years', notice: '1 month', endpoint: 'end of month' },
  { tenure: '≥ 5 years', notice: '2 months', endpoint: 'end of month' },
  { tenure: '≥ 8 years', notice: '3 months', endpoint: 'end of month' },
  { tenure: '≥ 10 years', notice: '4 months', endpoint: 'end of month' },
  { tenure: '≥ 12 years', notice: '5 months', endpoint: 'end of month' },
  { tenure: '≥ 15 years', notice: '6 months', endpoint: 'end of month' },
  { tenure: '≥ 20 years', notice: '7 months', endpoint: 'end of month' },
];

export default function NoticePeriodsEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Notice periods (§ 622 BGB)"
        title="Statutory notice periods in Germany"
        lede="§ 622 BGB sets the minimum notice the employer must observe when ending the employment. The periods rise with your length of service and apply unless contract or collective agreement is more favourable to you."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/notice-periods', label: 'Notice periods' },
        ]}
        primaryCta={{ href: '/en/notice-period-calculator', label: 'Calculate my notice' }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[820px] mb-10">
            <p className="text-[1.05rem] text-ink-light leading-relaxed">
              The statutory notice period for an employer-issued dismissal grows with the years
              of service you have completed (§&nbsp;622 (2) BGB). The probationary notice is 2
              weeks, then 4 weeks rising to up to 7 months after 20 years. Notice in the wrong
              length or to the wrong end-date makes the dismissal invalid for the period claimed
              — sometimes for the entire dismissal if the letter is unsalvageable.
            </p>
          </div>

          <div className="overflow-x-auto bg-cream border border-border-light rounded">
            <table className="w-full text-[0.94rem]">
              <thead className="bg-white text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-ink">Length of service</th>
                  <th className="px-5 py-3 font-semibold text-ink">Notice period</th>
                  <th className="px-5 py-3 font-semibold text-ink">Effective date</th>
                </tr>
              </thead>
              <tbody>
                {NOTICE_TABLE.map((row) => (
                  <tr key={row.tenure} className="border-t border-border-light">
                    <td className="px-5 py-3 text-ink-light">{row.tenure}</td>
                    <td className="px-5 py-3 font-semibold text-ink">{row.notice}</td>
                    <td className="px-5 py-3 text-ink-light">{row.endpoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[0.92rem] text-ink-muted leading-relaxed mt-4 max-w-[820px]">
            Note: the contract may impose <em>longer</em> employer notice. A contractual notice
            shorter than the statutory minimum is invalid; the statutory period applies. For
            employee-issued notice the rule is 4 weeks to the 15th or end of the calendar month,
            unless the contract extends it (with the limits of § 622 (5) BGB).
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
              { href: '/en/severance-pay', label: 'Severance pay' },
              { href: '/en/summary-dismissal', label: 'Summary dismissal' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/dismissal-protection-act', label: 'KSchG — when it applies' },
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
