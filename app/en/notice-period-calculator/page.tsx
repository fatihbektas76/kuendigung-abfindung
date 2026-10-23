import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM } from '@/components/NormLink';
import { SEO_CONFIG } from '@/lib/seo-config';
import Calculator from './Calculator';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/notice-period-calculator/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Notice Period Calculator Germany ${new Date().getFullYear()} — § 622 BGB`,
  description:
    'Calculate the minimum statutory notice period for your German employment under § 622 BGB. Years-of-service slider, probation toggle, instant result with legal background.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsfrist-rechner/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsfrist-rechner/`,
    },
  },
  openGraph: {
    title: 'Notice Period Calculator Germany — § 622 BGB',
    description:
      'Instantly calculate the minimum notice period your employer must observe. Reviewed by a German employment-law specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'When does the notice period start running?',
    a: 'The clock starts on the day following receipt of the written dismissal letter. Receipt (Zugang) means the letter has entered the recipient’s sphere of control — typically the day it is placed in the letter-box, provided the daily collection could still be expected on that day.',
  },
  {
    q: 'Does the same period apply to employee-issued notice?',
    a: 'No. The extended notice periods under § 622 (2) BGB apply only to dismissals issued by the employer. For employee-issued notice the basic 4-week rule to the 15th or end of the calendar month applies, unless the contract extends it (within the limits of § 622 (5)/(6) BGB).',
  },
  {
    q: 'What about a summary (without-notice) dismissal?',
    a: 'A summary dismissal (fristlose Kündigung) under § 626 BGB waives the notice period entirely. The employment ends on receipt of the dismissal. But summary dismissal requires a serious cause (wichtiger Grund) and must be issued within 2 weeks of knowing the cause (§ 626 II BGB) — a very high bar.',
  },
  {
    q: 'Can the contract extend the notice period?',
    a: 'Yes — always in favour of the employee. The contract may also set equal notice for both sides, as long as the employee’s notice is never longer than the employer’s (§ 622 (6) BGB). Shorter periods for the employer are only valid in strictly limited exceptions (short-term or seasonal employment).',
  },
  {
    q: 'What if the employer calculates the notice wrong?',
    a: 'A dismissal with the wrong notice period is not automatically void in full. Under BAG 15.12.2005 — 2 AZR 148/05 it is construed as a dismissal to the next lawful termination date, provided the employer’s intention to end the employment is otherwise clear. The 3-week deadline of § 4 KSchG applies regardless.',
  },
  {
    q: 'Do collective agreements change the notice period?',
    a: 'Yes, collective agreements (Tarifverträge) may lengthen or shorten the statutory periods (§ 622 (4) BGB). Shorter periods are, however, valid only within strict limits and only where the collective agreement actually applies to the employment relationship.',
  },
];

export default function NoticePeriodCalculatorEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                inLanguage: 'en',
                name: 'Notice Period Calculator Germany',
                url: PAGE_URL,
                applicationCategory: 'LegalService',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
                creator: { '@type': 'Person', name: SEO_CONFIG.author.name },
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
                  { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SEO_CONFIG.baseUrl}/en/tools/` },
                  { '@type': 'ListItem', position: 3, name: 'Notice-period calculator', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Notice-period calculator"
          title="Statutory notice period — § 622 BGB."
          lede="Calculate the minimum notice your employer must observe based on your length of service. The contract can extend this period; it can never shorten the statutory minimum for employer-issued notice."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/tools', label: 'Tools' },
            { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
          ]}
        />

        {/* Calculator */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <Calculator />

            <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
              <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                <strong>Wrong notice = wrong dismissal.</strong> If your employer set the wrong
                date or used the wrong period, the dismissal can be challenged for that reason
                alone. Send us the letter — a specialist verifies the notice immediately.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              How the calculator works
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              The calculator applies the statutory step-table in{' '}
              <NormLink href={NORM.bgb622}>§&nbsp;622 (2) BGB</NormLink>. Each threshold is reached
              when you have <em>completed</em> the stated number of years of service.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Length of service</strong> is counted from the formal start of the
                employment relationship (date on the contract) to the day the dismissal is
                received.
              </li>
              <li>
                <strong>Parental leave, long-term illness and other interruptions</strong>{' '}
                normally do <em>not</em> suspend the length-of-service count — only an outright
                break in the employment relationship does.
              </li>
              <li>
                <strong>Probation</strong> is capped at 6 months (§ 622 (3) BGB) and triggers a
                flat 2-week notice to any calendar day.
              </li>
              <li>
                <strong>End-dates</strong> are always the 15th or the end of the calendar month,
                except during probation (any day) and the first 2 years after probation (both
                options allowed).
              </li>
            </ul>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/notice-periods', label: 'Notice periods — § 622 BGB' },
                { href: '/en/dismissal', label: 'Dismissal — overview' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
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
              Notice-period calculator — most common questions
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
