import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/court-rulings/`;

export const metadata: Metadata = {
  title: 'Landmark German Labour-Court Decisions',
  description:
    'Key Bundesarbeitsgericht (BAG) rulings every German employee should know — fair-negotiation doctrine, social selection, summary dismissal and severance.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/urteile/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/urteile/`,
    },
  },
};

const CASES = [
  {
    cite: 'BAG 6 AZR 333/21',
    title: 'Fair negotiation of a termination agreement (faires Verhandeln)',
    body:
      'Where the employer creates a pressure situation that materially impairs the employee’s free decision, the resulting termination agreement is invalid. Practical relevance: "sign within an hour" tactics now routinely fail.',
  },
  {
    cite: 'BAG 2 AZR 541/09 — Emmely',
    title: 'Trust-breach dismissal requires proportionality',
    body:
      'Even a manifest breach of trust does not automatically justify a summary dismissal. A balancing of interests is required, taking into account long tenure and the magnitude of the loss.',
  },
  {
    cite: 'BAG 2 AZR 140/12',
    title: 'Temporary workers count for the small-business threshold',
    body:
      'Leiharbeitnehmer (temporary agency workers) deployed on a regular basis count towards the 10-employee threshold of § 23 (1) KSchG.',
  },
  {
    cite: 'CJEU C-684/16 — Max-Planck',
    title: 'Holiday only forfeits if the employer has warned',
    body:
      'EU law requires the employer to warn the employee about unused holiday before it can forfeit. Otherwise unused days carry over indefinitely.',
  },
] as const;

export default function CourtRulingsEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Court rulings"
        title="Landmark German labour-court decisions"
        lede="The BAG and CJEU decisions every employee in Germany should know — short, plain-English summaries with the practical takeaway."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/guides', label: 'Guides' },
          { href: '/en/guides/court-rulings', label: 'Court rulings' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto space-y-8">
          {CASES.map((c) => (
            <article
              key={c.cite}
              className="p-6 border border-border-light bg-cream rounded"
            >
              <div className="text-[0.78rem] font-bold tracking-[0.12em] uppercase text-gold-dark mb-2">
                {c.cite}
              </div>
              <h2 className="font-serif text-[1.2rem] font-bold mb-2">{c.title}</h2>
              <p className="text-[0.97rem] text-ink-light leading-relaxed m-0">{c.body}</p>
            </article>
          ))}

          <div className="bg-cream border-l-4 border-gold rounded p-6">
            <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
              See also:{' '}
              <Link href="/en/glossary" className="text-gold-dark underline">
                glossary
              </Link>{' '}
              and the topic pages on{' '}
              <Link href="/en/termination-agreement" className="text-gold-dark underline">
                termination agreements
              </Link>{' '}
              and{' '}
              <Link href="/en/summary-dismissal" className="text-gold-dark underline">
                summary dismissals
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
