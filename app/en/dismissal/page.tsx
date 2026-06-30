import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/dismissal/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Dismissal in Germany ${new Date().getFullYear()} — Rights, Deadlines & What to Do`,
  description:
    'Dismissed in Germany? You have only 3 weeks to file. Statutory rights, notice periods, how to challenge a dismissal. Free case review by a German employment-law specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigung/`,
    },
  },
  openGraph: {
    title: 'Dismissal in Germany — Rights, Deadlines & What to Do',
    description:
      'You have only 3 weeks to challenge a dismissal in Germany. Statutory rights, notice periods, expert review.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'What is the deadline to challenge a dismissal in Germany?',
    a: 'Exactly three weeks from receipt of the written dismissal letter (§ 4 KSchG). If you miss the deadline the dismissal is generally treated as valid even if it was unlawful. Subsequent admission under § 5 KSchG is granted only in rare exceptional cases (e.g. serious illness). Contact a German employment-law specialist immediately.',
  },
  {
    q: 'Does the employer need a reason to dismiss me?',
    a: 'Yes, where the Dismissal Protection Act (KSchG) applies — i.e. when you have been employed for more than 6 months and the employer has more than 10 employees (§ 23 KSchG). Permitted grounds are: conduct-related (verhaltensbedingt), person-related (personenbedingt, often health-related) or operational (betriebsbedingt). Without one of these grounds the dismissal is socially unjustified and invalid.',
  },
  {
    q: 'What notice periods apply?',
    a: 'Statutory notice periods are set out in § 622 BGB. During probation: 2 weeks. After probation: 4 weeks to the 15th or end of the calendar month; rising to up to 7 months after 20 years of service. The employment contract or a collective agreement may extend these periods, but not shorten the statutory minimum for the employer.',
  },
  {
    q: 'Does the dismissal letter have to be on paper?',
    a: 'Yes — a dismissal in Germany must be in writing with an original handwritten signature (§ 623 BGB). Email, fax, SMS or messenger notice is invalid. The signatory must also have actual or apparent authority to dismiss; otherwise you can reject the dismissal without delay under § 174 BGB.',
  },
  {
    q: 'Can I claim severance pay if I challenge the dismissal?',
    a: 'There is no general statutory severance entitlement, but in practice severance is negotiated in over 80% of dismissal-protection proceedings as part of a court settlement. Typical range: 0.5–1.5 gross monthly salaries per year of service.',
  },
];

export default function DismissalEn() {
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
                headline: 'Dismissal in Germany — Rights, Deadlines & What to Do',
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
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Dismissal (Kündigung)"
          title="Dismissed in Germany? 3 weeks to act."
          lede="A dismissal in Germany must be in writing, signed by an authorised person, and — where the KSchG applies — socially justified. You have just 21 days to file an unfair-dismissal claim. We review your case for free."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/dismissal', label: 'Dismissal' },
          ]}
          primaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Urgency banner */}
        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ Filing deadline: 3 weeks from receipt of the written dismissal (§ 4 KSchG)
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                If you miss this deadline the dismissal becomes final — regardless of whether it
                was lawful. Send us the letter today.
              </p>
            </div>
            <Link
              href="#contact"
              className="bg-gold-dark text-white font-semibold text-[0.88rem] px-5 py-2.5 rounded-sm no-underline whitespace-nowrap hover:bg-[#735F32] transition-colors"
            >
              Send me the letter &rarr;
            </Link>
          </div>
        </section>

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              In Germany, a dismissal must be in writing with a handwritten signature (§&nbsp;623 BGB)
              and — where the Dismissal Protection Act (KSchG) applies — must be socially justified
              on conduct, person or operational grounds (§ 1 KSchG). The KSchG kicks in once you have
              been employed for more than 6 months at an employer with more than 10 staff. From
              receipt of the dismissal letter you have <strong>3 weeks</strong> to file an
              unfair-dismissal claim at the competent Arbeitsgericht (§&nbsp;4 KSchG). Missed
              deadlines are almost always fatal.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law
              specialist (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Types of dismissal */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              Types of dismissal under German law
            </h2>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {[
                {
                  t: 'Conduct-related (verhaltensbedingt)',
                  d: 'Based on a culpable breach of duty. Usually requires a prior written warning (Abmahnung) for the same type of misconduct. Without a valid Abmahnung this type of dismissal often fails.',
                },
                {
                  t: 'Person-related (personenbedingt)',
                  d: 'Most often health/long-term-sickness grounds. Strict tests apply: negative prognosis, substantial business interference and balancing of interests. Reintegration management (BEM) is a prerequisite.',
                },
                {
                  t: 'Operational (betriebsbedingt)',
                  d: 'Driven by an operational decision that eliminates the position. Requires a proper social selection (Sozialauswahl) across comparable employees on tenure, age, dependants and disability.',
                },
              ].map((item) => (
                <div key={item.t} className="p-7 bg-white border border-border-light rounded">
                  <h3 className="font-serif text-[1.15rem] font-bold mb-2">{item.t}</h3>
                  <p className="text-[0.93rem] text-ink-light leading-relaxed m-0">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to do */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              What to do in the first 24 hours
            </h2>
            <ol className="list-decimal pl-6 space-y-4 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Note the date of receipt.</strong> The 3-week clock starts the day you
                physically receive the letter — not the date on the letter itself.
              </li>
              <li>
                <strong>Do not sign anything.</strong> Especially no termination agreement, no
                exit waiver, no severance acceptance. Read it, take it home, do not sign.
              </li>
              <li>
                <strong>Send us the letter.</strong> A specialist reviews it for free, identifies
                formal errors and tells you whether challenging it makes sense.
              </li>
              <li>
                <strong>Register as job-seeker (arbeitsuchend).</strong> Within 3 days at the
                Agentur für Arbeit to avoid unemployment-benefit reductions.
              </li>
              <li>
                <strong>If you have legal-expenses insurance:</strong> notify them now so cover
                is in place when we file.
              </li>
            </ol>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/notice-periods', label: 'Notice periods (§ 622 BGB)' },
                { href: '/en/summary-dismissal', label: 'Summary dismissal' },
                { href: '/en/redundancy-dismissal', label: 'Redundancy / operational dismissal' },
                { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {link.label} &rarr;
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
              Dismissal — most common questions
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
