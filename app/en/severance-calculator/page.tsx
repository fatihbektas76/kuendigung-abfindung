import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM } from '@/components/NormLink';
import { SEO_CONFIG } from '@/lib/seo-config';
import Calculator from './Calculator';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/severance-calculator/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Severance Calculator Germany ${new Date().getFullYear()} — § 1a KSchG Half-Month Rule`,
  description:
    'Estimate your German severance using the § 1a KSchG half-month rule. Salary + years-of-service + negotiation factor; realistic settlement range from 0.25× to 1.5×.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abfindungsrechner/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abfindungsrechner/`,
    },
  },
  openGraph: {
    title: 'Severance Calculator Germany — § 1a KSchG',
    description:
      'Instantly estimate your German severance under § 1a KSchG with a realistic negotiation range. Reviewed by a specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'How does the German severance formula work?',
    a: 'The statutory anchor under § 1a KSchG is 0.5 gross monthly salaries × years of service. Six months and more count as a full year, less than six months are rounded down. The formula is only binding where the employer expressly offers it in the dismissal letter against waiver of the unfair-dismissal claim. In contested settlements, actual severance regularly reaches 1.0 to 1.5 monthly salaries per year.',
  },
  {
    q: 'Why is the result shown as a range?',
    a: 'Because the real-world severance is driven by negotiation leverage, not by a fixed rule. A dismissal with obvious formal defects, flawed social selection, or missing works-council consultation commands a higher factor. A procedurally clean dismissal where the KSchG does not apply commands less. The 0.25× to 1.5× range reflects what we see in practice at the Arbeitsgericht Mannheim and other first-instance labour courts.',
  },
  {
    q: 'Is the severance taxable?',
    a: 'Yes. German severance is treated as taxable income in the year of payment. The one-fifth rule (Fünftelregelung, § 34 EStG) can substantially reduce the marginal tax on the severance if the payment is concentrated in one year. Social-security contributions, by contrast, are not owed on severance paid against the loss of the employment relationship.',
  },
  {
    q: 'What is the Fünftelregelung?',
    a: 'The one-fifth rule (§ 34 EStG) is a tax-smoothing mechanism. The severance is notionally spread over five years for the purpose of computing the applicable marginal tax rate. The resulting lower marginal rate is then applied to the full severance in the actual payment year. The benefit is highest where regular annual income is otherwise moderate.',
  },
  {
    q: 'Does accepting severance trigger a Sperrzeit?',
    a: 'Not automatically. A severance negotiated through a court-recorded settlement (gerichtlicher Vergleich) after filing an unfair-dismissal claim normally avoids the 12-week unemployment-benefit blocking period. By contrast, signing a termination agreement (Aufhebungsvertrag) typically does trigger the Sperrzeit under § 159 I SGB III, even if a severance was paid.',
  },
  {
    q: 'Is this calculator legal advice?',
    a: 'No. The calculator is a non-binding estimation tool. Actual severance depends on formal defects in the dismissal letter, special-protection categories (pregnancy, severe disability, works council), social-selection analysis and the bargaining posture of both sides. For a binding assessment, send the dismissal letter for a free review.',
  },
];

export default function SeveranceCalculatorEn() {
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
                name: 'Severance Calculator Germany',
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
                  { '@type': 'ListItem', position: 3, name: 'Severance calculator', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Severance calculator"
          title="Estimate your German severance."
          lede="Quick estimate using the German half-month rule (§ 1a KSchG) with a realistic negotiation range. For a binding number, send us the dismissal letter — we run a tailored review free of charge."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/tools', label: 'Tools' },
            { href: '/en/severance-calculator', label: 'Severance calculator' },
          ]}
        />

        {/* Calculator */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <Calculator />

            <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
              <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                <strong>Disclaimer:</strong> all figures are non-binding estimates based on the
                German half-month rule. Actual severance depends on flaws in the dismissal letter,
                special protection (pregnancy, severe disability, works council), social selection
                and the bargaining posture of both sides. This calculator does not constitute legal
                advice.
              </p>
            </div>
          </div>
        </section>

        {/* How to raise the factor */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              What raises the negotiation factor
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              The statutory anchor under{' '}
              <NormLink href={NORM.kschg1a}>§&nbsp;1a KSchG</NormLink> is 0.5 gross monthly
              salaries per year of service. The factor the employer is willing to pay in practice
              rises with each weakness in the dismissal:
            </p>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="p-6 bg-white border-l-4 border-gold rounded">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Formal defects</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                  Missing handwritten signature (<NormLink href={NORM.bgb623}>§&nbsp;623 BGB</NormLink>),
                  defective works-council consultation
                  (<NormLink href={NORM.betrvg102}>§&nbsp;102 BetrVG</NormLink>) or missing
                  signatory authority — each raises the factor substantially.
                </p>
              </div>
              <div className="p-6 bg-white border-l-4 border-gold rounded">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Long tenure</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                  Every year of service increases both the anchor and the employer’s{' '}
                  <em>Annahmeverzugslohn</em> risk. Beyond 10 years of service the practical
                  factor rarely dips below 0.75×.
                </p>
              </div>
              <div className="p-6 bg-white border-l-4 border-gold rounded">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Special protection</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                  Pregnant employees, severely disabled staff, parental-leave takers and
                  works-council members enjoy extra protection — the practical factor climbs
                  towards the 1.5× ceiling.
                </p>
              </div>
              <div className="p-6 bg-white border-l-4 border-gold rounded">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">Flawed social selection</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                  In redundancy dismissals a demonstrably flawed social-selection matrix is often
                  the single biggest lever on the factor — the employer values certainty of
                  outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/severance-pay', label: 'Severance pay — full guide' },
                { href: '/en/severance-table', label: 'Severance table' },
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
                { href: '/en/dismissal-protection-act', label: 'KSchG — when it applies' },
                { href: '/en/termination-agreement', label: 'Termination agreement' },
                { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
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
              Severance calculator — most common questions
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
