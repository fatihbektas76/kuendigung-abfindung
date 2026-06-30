import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/severance-pay/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Severance Pay in Germany ${new Date().getFullYear()} — Calculation, Entitlement & Negotiation`,
  description:
    'Severance pay after dismissal in Germany: 0.5–1.5 monthly salaries per year of service. Formula, table and how to negotiate. Reviewed by a German employment-law specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abfindung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abfindung/`,
    },
  },
  openGraph: {
    title: 'Severance Pay in Germany — Calculation, Entitlement & Negotiation',
    description:
      'Severance after dismissal in Germany: formula, table and negotiation strategy by a German employment-law specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'Is there a statutory right to severance pay in Germany?',
    a: 'No, German law does not grant an automatic right to severance pay. A statutory claim exists only in narrow cases: §1a KSchG (where the employer offers severance with a redundancy dismissal), social plans (Sozialplan) or collective agreements (Tarifvertrag). In practice, severance is negotiated in more than 80% of unfair-dismissal proceedings as part of a court settlement.',
  },
  {
    q: 'How is severance pay calculated?',
    a: 'The most common formula is 0.5 gross monthly salaries × years of service. With €4,000 gross monthly salary and 8 years of service, that gives €16,000 as a starting point. Depending on the strength of your case, the factor commonly lies between 0.25 and over 1.5.',
  },
  {
    q: 'Do I have to pay tax on severance pay?',
    a: 'Yes — severance is taxable. However, the “one-fifth rule” (Fünftelregelung, §34 EStG) reduces the tax burden significantly by spreading the lump sum mathematically over five years. Social-security contributions usually do not apply to severance paid in connection with the end of the employment relationship.',
  },
  {
    q: 'Can I negotiate a higher severance?',
    a: 'Yes. The amount depends heavily on your negotiating leverage: formal errors in the dismissal letter, flawed social selection (Sozialauswahl), missing works-council consultation or special protection (pregnancy, severe disability, works council membership) all substantially strengthen your position.',
  },
  {
    q: 'Do I still get severance after a summary (without-notice) dismissal?',
    a: 'Yes — counterintuitively, severance prospects are often particularly high after a summary dismissal under §626 BGB, because the legal hurdles for a valid summary dismissal are strict. Many summary dismissals are unlawful, which leads to favourable settlement outcomes.',
  },
];

function severanceFormula(monthlySalary: number, years: number): number {
  return Math.round(monthlySalary * 0.5 * years);
}

const SAMPLE_YEARS = [1, 2, 3, 5, 7, 10, 15, 20] as const;
const SAMPLE_SALARY = 3000;

export default function SeverancePayEn() {
  return (
    <>
      {/* Schema.org — Article + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                inLanguage: 'en',
                headline: 'Severance Pay in Germany — Calculation, Entitlement & Negotiation',
                url: PAGE_URL,
                author: {
                  '@type': 'Person',
                  name: SEO_CONFIG.author.name,
                  jobTitle: 'German employment-law specialist',
                },
                publisher: {
                  '@type': 'Organization',
                  name: SEO_CONFIG.organization.legalName,
                },
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
          eyebrow="Severance pay (Abfindung)"
          title="Severance pay in Germany — entitlement, formula & how to negotiate it"
          lede="A statutory right to severance does not exist in Germany — but in practice, severance is paid in over 80% of dismissal cases through court settlements. We show the formula, the leverage points and the realistic numbers."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/severance-pay', label: 'Severance pay' },
          ]}
          primaryCta={{ href: '#contact', label: 'Free severance review' }}
          secondaryCta={{ href: '/en/severance-calculator', label: 'Calculate severance' }}
        />

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[800px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              In Germany, there is <strong>no general statutory right</strong> to severance pay
              after a dismissal. The standard rule-of-thumb negotiated in court settlements is{' '}
              <strong>0.5 gross monthly salaries per year of service</strong> (§ 1a KSchG, §§ 9, 10 KSchG).
              In practice, more than 80% of unfair-dismissal proceedings end in a settlement that
              includes severance, frequently between 0.5 and 1.5 monthly salaries per year — depending
              on tenure, age, social context and the legal flaws in the dismissal.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Formula + table */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-4">
              The standard severance formula
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6 max-w-[720px]">
              The classic German severance formula is{' '}
              <strong>0.5 × gross monthly salary × years of service</strong>. It is not a hard
              statutory rule, but the labour courts and most employers treat it as the baseline.
              Length of service of more than six months counts as a full year.
            </p>
            <div className="overflow-x-auto bg-white border border-border-light rounded">
              <table className="w-full text-[0.92rem]">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-ink">Years of service</th>
                    <th className="px-5 py-3 font-semibold text-ink">
                      Severance at €{SAMPLE_SALARY.toLocaleString('en-GB')} gross/month
                    </th>
                    <th className="px-5 py-3 font-semibold text-ink">Range (0.5×–1.0×)</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_YEARS.map((y) => {
                    const base = severanceFormula(SAMPLE_SALARY, y);
                    return (
                      <tr key={y} className="border-t border-border-light">
                        <td className="px-5 py-3 text-ink-light">{y} {y === 1 ? 'year' : 'years'}</td>
                        <td className="px-5 py-3 font-semibold text-ink">
                          €{base.toLocaleString('en-GB')}
                        </td>
                        <td className="px-5 py-3 text-ink-light">
                          €{base.toLocaleString('en-GB')} – €
                          {(base * 2).toLocaleString('en-GB')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[0.85rem] text-ink-muted leading-relaxed mt-5 max-w-[720px]">
              These figures are illustrative only — your actual settlement value depends on the
              flaws in the dismissal, social factors and your negotiation strategy. Use the{' '}
              <Link href="/en/severance-calculator" className="text-gold-dark underline">
                severance calculator
              </Link>{' '}
              for a tailored estimate, or send us your dismissal letter for a free review.
            </p>
          </div>
        </section>

        {/* Leverage points */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-4">
              What lifts severance above the rule of thumb
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-6 max-md:grid-cols-1">
              {[
                {
                  title: 'Formal errors in the dismissal letter',
                  body:
                    'Missing signature, wrong notice period, no works-council consultation — any of these makes the dismissal invalid and dramatically improves the settlement value.',
                },
                {
                  title: 'Special dismissal protection',
                  body:
                    'Pregnancy (§ 17 MuSchG), severe disability (§ 168 SGB IX), works-council membership or parental leave shift the leverage sharply in your favour.',
                },
                {
                  title: 'Flawed social selection',
                  body:
                    'In redundancy dismissals the employer must select on tenure, age, dependants and disability (§ 1 III KSchG). Errors in this selection are a common winning argument.',
                },
                {
                  title: 'Long tenure & high salary',
                  body:
                    'Older employees and long tenures attract higher factors. For tenures above 10 years, factors of 1.0× or more are routinely achievable.',
                },
              ].map((point) => (
                <div
                  key={point.title}
                  className="p-7 border border-border-light bg-cream rounded"
                >
                  <h3 className="font-serif text-[1.15rem] font-bold mb-2">{point.title}</h3>
                  <p className="text-[0.93rem] text-ink-light leading-relaxed m-0">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tax */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[820px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-4">
              Tax on severance pay (Fünftelregelung)
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
              Severance pay is fully taxable as ordinary income, but the German Tax Code mitigates
              the progression effect through the “one-fifth rule” of <strong>§&nbsp;34 EStG</strong>.
              Mathematically, the lump sum is treated as if it were paid in equal parts over five
              years, which softens the spike in marginal tax.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-0">
              No employer or employee social-security contributions are usually levied on severance
              paid in connection with the termination of employment.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                {
                  href: '/en/unfair-dismissal-claim',
                  label: 'Unfair-dismissal claim (Kündigungsschutzklage)',
                },
                {
                  href: '/en/termination-agreement',
                  label: 'Termination agreement (Aufhebungsvertrag)',
                },
                { href: '/en/summary-dismissal', label: 'Summary dismissal (fristlose Kündigung)' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
                { href: '/en/severance-table', label: 'Severance table by tenure' },
                {
                  href: '/en/dismissal-protection-act',
                  label: 'Dismissal Protection Act (KSchG)',
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {link.label} &rarr;
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
              Severance pay — most common questions
            </h2>
            <div>
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="border-b border-border-light py-5 group"
                >
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
