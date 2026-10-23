import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/notice-periods/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Statutory Notice Periods Germany ${new Date().getFullYear()} — § 622 BGB Explained`,
  description:
    'Statutory notice periods under § 622 BGB: 2 weeks during probation, rising to 7 months after 20 years of service. Full table, end-date rules, defective-notice consequences.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsfristen/`,
    },
  },
  openGraph: {
    title: 'Statutory Notice Periods in Germany — § 622 BGB',
    description:
      'Full § 622 BGB notice-period table and the practical consequences of defective notice. Reviewed by a specialist.',
    url: PAGE_URL,
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

const FAQS = [
  {
    q: 'How is the notice period calculated under § 622 BGB?',
    a: 'Length of service is counted from the formal start of the employment relationship up to the day the dismissal is received. Periods below 6 months count as probation (2 weeks notice). From 7 months the general rule applies: 4 weeks to the 15th or end of the calendar month. From 2 years the period rises in defined steps, up to 7 months after 20 years of service.',
  },
  {
    q: 'Can the employment contract shorten the notice period?',
    a: 'No. A contractual notice period shorter than § 622 BGB is invalid. The statutory minimum always applies to employer-issued notice. The contract may, however, impose a longer notice — and even extend employee-issued notice within the limits of § 622 (5) BGB (never longer than the employer-side period).',
  },
  {
    q: 'What happens if the employer calculates the notice wrong?',
    a: 'A dismissal with the wrong notice period is not automatically invalid in full. Under settled BAG case law the dismissal is treated as valid for the next lawful termination date (BAG 15 December 2005 — 2 AZR 148/05). You still must file an unfair-dismissal claim within 3 weeks of receipt to challenge any invalidity grounds beyond the notice error.',
  },
  {
    q: 'Does periods of parental leave count towards tenure?',
    a: 'Yes. All periods during which the employment contract was legally in force — including parental leave, long-term illness and other forms of release — count towards length of service for § 622 BGB purposes. The clock only stops if the employment itself was interrupted.',
  },
  {
    q: 'What about dismissal during probation?',
    a: 'During the probation period of up to 6 months (§ 622 (3) BGB) the statutory notice is a flat 2 weeks and may end on any calendar day. The Dismissal Protection Act (KSchG) does not apply, so the employer need not justify the dismissal — but the formal requirements (written form, signatory authority) still apply.',
  },
  {
    q: 'Can collective agreements change the notice period?',
    a: 'Yes, collective agreements may lengthen or shorten the statutory periods (§ 622 (4) BGB). Shorter periods are, however, only valid within strict limits and only where the collective agreement actually applies to the employment relationship.',
  },
];

export default function NoticePeriodsEn() {
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
                headline: 'Statutory Notice Periods Germany — § 622 BGB',
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
                  { '@type': 'ListItem', position: 2, name: 'Notice periods', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Notice periods (§ 622 BGB)"
          title="Statutory notice periods in Germany."
          lede="§ 622 BGB sets the minimum notice the employer must observe when ending the employment. The periods rise with your length of service and apply unless contract or collective agreement is more favourable to you."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/notice-periods', label: 'Notice periods' },
          ]}
          primaryCta={{ href: '/en/notice-period-calculator', label: 'Calculate my notice' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              The statutory notice period for an employer-issued dismissal grows with the years of
              service you have completed under{' '}
              <strong><NormLink href={NORM.bgb622}>§&nbsp;622 (2) BGB</NormLink></strong>. The
              probationary notice is <strong>2 weeks</strong>, then <strong>4 weeks</strong>{' '}
              rising to up to <strong>7 months</strong> after 20 years of service. A dismissal
              with the wrong notice length or the wrong end-date is not automatically void in
              full — but the dismissal usually only takes effect on the next lawful termination
              date, and other invalidity grounds must still be raised within the 3-week deadline
              of <NormLink href={NORM.kschg4}>§&nbsp;4 KSchG</NormLink>.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Table */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              The § 622 BGB notice-period table
            </h2>
            <div className="overflow-x-auto bg-white border border-border-light rounded">
              <table className="w-full text-[0.94rem]">
                <thead className="bg-cream text-left">
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
              unless the contract extends it (with the limits of{' '}
              <NormLink href={NORM.bgb622}>§&nbsp;622 (5) BGB</NormLink>).
            </p>
          </div>
        </section>

        {/* Worked example */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              Worked example — a 12-year employee
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              An employee hired on <strong>1 March 2014</strong> receives a written dismissal on{' '}
              <strong>15 March 2026</strong>. Length of service: 12 years and 14 days. The
              applicable notice is <strong>5 months to the end of the calendar month</strong>.
            </p>
            <div className="p-6 bg-cream border-l-4 border-gold rounded">
              <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                <li>Receipt of dismissal: <strong>15 March 2026</strong>.</li>
                <li>Count 5 months forward: 15 August 2026.</li>
                <li>
                  Not an end-of-month date — move to the next possible end-of-month:{' '}
                  <strong>31 August 2026</strong>.
                </li>
                <li>Employment ends on 31 August 2026; salary is owed in full until that day.</li>
                <li>
                  If the employer’s letter states an earlier date, the dismissal is defective but
                  usually takes effect on 31 August 2026 — not void in full.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* BAG case law */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Leading case
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              BAG 15 December 2005 — wrong notice date, dismissal survives
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              The Federal Labour Court has clarified that a dismissal issued with an incorrect
              notice period or wrong end-date is <em>not</em> automatically void. By operation of
              interpretation (<em>Umdeutung</em>) it is treated as effective for the next lawful
              termination date — provided the employer’s intention to end the employment is
              otherwise unambiguous.
            </p>
            <BagQuote az="2 AZR 148/05" datum="15.12.2005">
              Eine Kündigung mit falsch berechneter Kündigungsfrist ist nicht insgesamt unwirksam,
              sondern wird in eine Kündigung zum nächstzulässigen Kündigungstermin umgedeutet,
              wenn der Beendigungswille eindeutig erkennbar ist.
            </BagQuote>
            <p className="text-[0.95rem] text-ink-light leading-relaxed italic mt-5 mb-0">
              <strong>English rendering:</strong> A dismissal with an incorrectly calculated notice
              period is <em>not</em> void in full; it is construed as a dismissal to the next
              lawful termination date, provided the employer’s intention to end the employment is
              clearly recognisable.{' '}
              <a
                href={bagDejureUrl('15.12.2005', '2 AZR 148/05')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                Read the judgment on dejure.org →
              </a>
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
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
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {l.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-8 bg-cream" id="faq">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              FAQ
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
              Notice periods — most common questions
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
