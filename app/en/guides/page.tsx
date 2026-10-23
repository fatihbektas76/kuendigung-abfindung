import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `German Employment-Law Guides ${new Date().getFullYear()} — Dismissal, Severance, Notice`,
  description:
    'In-depth English-language guides on dismissal, severance, termination agreements, notice periods, written warnings and the KSchG — written by a German employment-law specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/`,
    },
  },
  openGraph: {
    title: 'German Employment-Law Guides — Dismissal, Severance, Notice',
    description:
      'In-depth English-language guides for employees facing dismissal in Germany. Written and maintained by a specialist.',
    url: PAGE_URL,
  },
};

const TOOLS = [
  {
    href: '/en/severance-calculator',
    title: 'Severance calculator',
    body: 'Instant estimate using the § 1a KSchG half-month rule with a realistic 0.25×–1.5× negotiation range.',
  },
  {
    href: '/en/severance-table',
    title: 'Severance table',
    body: 'Static ready-reckoner by tenure and salary bracket, with 0.5× and 1.0× factor columns.',
  },
  {
    href: '/en/notice-period-calculator',
    title: 'Notice-period calculator',
    body: 'Instantly calculate the minimum notice your employer must observe under § 622 BGB.',
  },
  {
    href: '/en/check-dismissal',
    title: 'Dismissal check',
    body: 'Three-minute self-check: is your dismissal likely attackable before the Arbeitsgericht?',
  },
] as const;

const GUIDES = [
  {
    href: '/en/severance-pay',
    title: 'Severance pay (Abfindung) — complete guide',
    body: 'Formula, entitlement, tax (Fünftelregelung), negotiation leverage.',
  },
  {
    href: '/en/dismissal',
    title: 'Dismissal in Germany — what to do in the first 24 hours',
    body: 'Deadlines, types of dismissal, immediate actions.',
  },
  {
    href: '/en/termination-agreement',
    title: 'Termination agreement (Aufhebungsvertrag)',
    body: 'When to sign, the Sperrzeit trap, must-have clauses.',
  },
  {
    href: '/en/summary-dismissal',
    title: 'Summary dismissal under § 626 BGB',
    body: 'The 2-week rule, defence strategy, severance prospects.',
  },
  {
    href: '/en/written-warning',
    title: 'Written warning (Abmahnung)',
    body: 'When the warning is invalid and how to get it removed.',
  },
  {
    href: '/en/redundancy-dismissal',
    title: 'Redundancy / operational dismissal',
    body: 'Social selection, mass-dismissal rules, § 1a KSchG severance.',
  },
  {
    href: '/en/unfair-dismissal-claim',
    title: 'Unfair-dismissal claim (Kündigungsschutzklage)',
    body: 'Procedure, costs and what to expect at the Arbeitsgericht.',
  },
  {
    href: '/en/notice-periods',
    title: 'Statutory notice periods (§ 622 BGB)',
    body: 'Full table for employer-issued notice.',
  },
  {
    href: '/en/dismissal-protection-act',
    title: 'Dismissal Protection Act (KSchG) — when it applies',
    body: 'The 6-month qualification and the small-business threshold.',
  },
  {
    href: '/en/severance-table',
    title: 'Severance table by tenure and salary',
    body: 'Ready-reckoner for the half-month and full-month factors.',
  },
] as const;

export default function GuidesEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                inLanguage: 'en',
                name: 'German Employment-Law Guides',
                url: PAGE_URL,
                description:
                  'English-language guides to German dismissal, severance and employment-contract law.',
                author: { '@type': 'Person', name: SEO_CONFIG.author.name },
                publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
                hasPart: GUIDES.map((g) => ({
                  '@type': 'Article',
                  name: g.title,
                  description: g.body,
                  url: `${SEO_CONFIG.baseUrl}${g.href}/`,
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.baseUrl}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Guides', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Guides"
          title="English-language guides to German employment law."
          lede="Written and maintained by a German employment-law specialist. Each guide opens with a direct answer, sources German statutes, and ends with a free case-review CTA."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/guides', label: 'Guides' },
          ]}
          primaryCta={{ href: '#contact', label: 'Free case review' }}
          secondaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
        />

        {/* Guides */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
              Core guides
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="block p-7 border border-border-light bg-cream rounded transition-all no-underline hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <h3 className="font-serif text-[1.2rem] font-bold text-ink mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{guide.body}</p>
                  <span className="inline-block mt-4 text-[0.85rem] font-semibold text-gold-dark">
                    Read guide &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
              Free tools
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block p-7 border border-border-light bg-white rounded transition-all no-underline hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <h3 className="font-serif text-[1.2rem] font-bold text-ink mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{tool.body}</p>
                  <span className="inline-block mt-4 text-[0.85rem] font-semibold text-gold-dark">
                    Open tool &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How these guides are structured */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              How these guides are structured
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong className="text-ink">Direct answer at the top.</strong>{' '}
                The first paragraph answers the core question in 2–3 sentences, cites the
                operative statute, and names the author.
              </li>
              <li>
                <strong className="text-ink">Statute and case-law backbone.</strong>{' '}
                Inline links to the German statutes on dejure.org — § 1 KSchG, § 622 BGB,
                § 626 BGB and the rest — plus pin-cites to BAG judgments where they shape the
                practical outcome.
              </li>
              <li>
                <strong className="text-ink">Worked examples and tables.</strong>{' '}
                Every number is explained with a concrete worked example — notice-period
                arithmetic, severance factors, Sperrzeit cost.
              </li>
              <li>
                <strong className="text-ink">FAQ accordion at the bottom.</strong>{' '}
                The most common follow-up questions, structured as FAQPage JSON-LD for AI and
                search-engine ingestion.
              </li>
            </ol>
          </div>
        </section>

        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
