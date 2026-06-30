import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/`;

export const metadata: Metadata = {
  title: 'German Employment-Law Guides',
  description:
    'In-depth English-language guides on dismissal, severance, termination agreements, notice periods and more — written by a German employment-law specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/`,
    },
  },
};

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
    <main>
      <TopicHero
        eyebrow="Guides"
        title="English-language guides to German employment law"
        lede="Written and maintained by a German employment-law specialist. Each guide opens with a direct answer, sources German statutes, and ends with a free case-review CTA."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/guides', label: 'Guides' },
        ]}
      />

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="block p-7 border border-border-light bg-cream rounded transition-all no-underline hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <h2 className="font-serif text-[1.2rem] font-bold text-ink mb-2">
                  {guide.title}
                </h2>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{guide.body}</p>
                <span className="inline-block mt-4 text-[0.85rem] font-semibold text-gold-dark">
                  Read guide &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
