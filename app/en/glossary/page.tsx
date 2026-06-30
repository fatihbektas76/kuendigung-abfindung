import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/glossary/`;

export const metadata: Metadata = {
  title: 'German Employment-Law Glossary',
  description:
    'Glossary of the most important German employment-law terms in English — from Abmahnung to Sperrzeit.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/glossar/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/glossar/`,
    },
  },
};

interface Term {
  readonly term: string;
  readonly definition: string;
  readonly href?: string;
}

const TERMS: readonly Term[] = [
  {
    term: 'Abfindung',
    definition:
      'Severance payment. No general statutory entitlement; usually negotiated as a court settlement. Standard formula: 0.5 gross monthly salaries × years of service.',
    href: '/en/severance-pay',
  },
  {
    term: 'Abmahnung',
    definition:
      'Formal written warning. Required as a precondition for a later conduct-related dismissal in most cases.',
    href: '/en/written-warning',
  },
  {
    term: 'Aufhebungsvertrag',
    definition:
      'Termination agreement — bilateral contract ending the employment by mutual consent. Triggers a 12-week unemployment-benefit blocking period unless drafted correctly.',
    href: '/en/termination-agreement',
  },
  {
    term: 'Arbeitsgericht',
    definition: 'German labour court — first-instance court for employment disputes.',
  },
  {
    term: 'BAG',
    definition:
      'Bundesarbeitsgericht — Federal Labour Court of Germany. Highest instance for labour-law decisions.',
  },
  {
    term: 'Betriebsrat',
    definition: 'Works council. Must be consulted before any dismissal (§ 102 BetrVG).',
  },
  {
    term: 'Betriebsbedingte Kündigung',
    definition:
      'Operational / redundancy dismissal. Requires elimination of the position and proper social selection.',
    href: '/en/redundancy-dismissal',
  },
  {
    term: 'Freistellung',
    definition:
      'Release from work duties with continued pay until the end-date of employment.',
  },
  {
    term: 'Fristlose Kündigung',
    definition:
      'Summary (without-notice) dismissal under § 626 BGB. Requires a serious cause and a 2-week reaction window.',
    href: '/en/summary-dismissal',
  },
  {
    term: 'Fünftelregelung',
    definition:
      'Tax rule under § 34 EStG that mitigates the tax burden on severance pay by spreading it mathematically over five years.',
  },
  {
    term: 'Klagefrist',
    definition:
      'Filing deadline. For unfair-dismissal claims it is exactly 3 weeks from receipt of the dismissal (§ 4 KSchG).',
  },
  {
    term: 'Kündigung',
    definition:
      'Unilateral termination of employment, either by the employer or the employee. Must be in writing with an original signature (§ 623 BGB).',
    href: '/en/dismissal',
  },
  {
    term: 'KSchG',
    definition:
      'Kündigungsschutzgesetz — Dismissal Protection Act. Applies when you have been employed more than 6 months at an employer with more than 10 staff.',
    href: '/en/dismissal-protection-act',
  },
  {
    term: 'Kündigungsschutzklage',
    definition: 'Unfair-dismissal claim filed at the Arbeitsgericht within 3 weeks.',
    href: '/en/unfair-dismissal-claim',
  },
  {
    term: 'Rechtsschutzversicherung',
    definition:
      'Legal-expenses insurance. Most policies cover employment matters after a 3-month waiting period.',
  },
  {
    term: 'Sozialauswahl',
    definition:
      'Social selection. In a redundancy dismissal the employer must compare employees on tenure, age, dependants and disability (§ 1 (3) KSchG).',
  },
  {
    term: 'Sperrzeit',
    definition:
      '12-week unemployment-benefit blocking period (§ 159 SGB III), triggered most commonly by a termination agreement without important cause.',
  },
  {
    term: 'Tarifvertrag',
    definition: 'Collective bargaining agreement.',
  },
  {
    term: 'Urlaubsabgeltung',
    definition:
      'Cash-out for unused statutory holiday at the end of the employment (§ 7 (4) BUrlG).',
    href: '/en/unused-holiday-pay-calculator',
  },
  {
    term: 'Zeugnis',
    definition:
      'Reference letter. Qualified reference must be at least "good" in market practice; "very good" is the negotiation target.',
  },
];

export default function GlossaryEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Glossary"
        title="German employment-law terms — English glossary"
        lede="Quick translations and short definitions for the German employment-law terms you will encounter in any dismissal, severance or termination-agreement situation."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/glossary', label: 'Glossary' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <dl className="space-y-7">
            {TERMS.map((t) => (
              <div key={t.term} className="border-b border-border-light pb-5">
                <dt className="font-serif text-[1.2rem] font-bold text-ink mb-1.5">
                  {t.term}
                </dt>
                <dd className="text-[0.97rem] text-ink-light leading-relaxed m-0">
                  {t.definition}
                  {t.href && (
                    <>
                      {' '}
                      <Link href={t.href} className="text-gold-dark underline">
                        Read more &rarr;
                      </Link>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
