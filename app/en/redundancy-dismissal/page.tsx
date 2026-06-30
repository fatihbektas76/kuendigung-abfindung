import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/redundancy-dismissal/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Redundancy Dismissal in Germany (Betriebsbedingte Kündigung) — Rules & Severance`,
  description:
    'Operational / redundancy dismissals in Germany under § 1 (2) KSchG. Social selection rules, severance under § 1a KSchG, mass-dismissal notification. Reviewed by a specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
    },
  },
};

export default function RedundancyEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Redundancy / operational dismissal"
        title="Betriebsbedingte Kündigung — and how to defend against it"
        lede="The employer eliminates the position for operational reasons. To be valid the dismissal must follow a proper social selection. Errors in that selection — and the offer of severance under § 1a KSchG — are the standard battleground."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
        ]}
        primaryCta={{ href: '#contact', label: 'Free case review' }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
            A redundancy dismissal (<em>betriebsbedingte Kündigung</em>) under{' '}
            <strong>§&nbsp;1 (2) KSchG</strong> is valid only if (1) an operational decision
            actually eliminates the workplace, (2) no comparable vacant position exists, and
            (3) the social selection between comparable employees correctly weighs tenure,
            age, dependants and severe disability (§&nbsp;1 (3) KSchG). The employer also
            owes a severance offer under § 1a KSchG if framed correctly — a useful negotiation
            anchor.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-6">
            Common defence angles
          </h2>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {[
              {
                t: 'Flawed social selection',
                d: 'The employer compared the wrong reference group, ignored relevant tenure/age weights or omitted comparable colleagues. Frequently invalidates the dismissal entirely.',
              },
              {
                t: 'Position not actually eliminated',
                d: 'The tasks continue to be performed — only the formal job title changed. Operational decision is then a sham.',
              },
              {
                t: 'Available vacancy ignored',
                d: 'The employer was obliged to offer you an alternative role on different terms (§ 1 (2) sent. 2 KSchG) before issuing the dismissal.',
              },
              {
                t: 'Mass-dismissal notification missing',
                d: 'For dismissals above the § 17 KSchG thresholds, prior notification to the Agentur für Arbeit is mandatory. Missing notification = invalid dismissal.',
              },
              {
                t: 'Works council not consulted',
                d: 'Without proper consultation under § 102 BetrVG the dismissal is invalid — a common defect.',
              },
              {
                t: 'Severance offer (§ 1a KSchG)',
                d: 'If the employer offered 0.5 monthly salaries per year against waiver of the claim, the offer can usually be improved through negotiation.',
              },
            ].map((item) => (
              <div key={item.t} className="p-6 bg-white border border-border-light rounded">
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">{item.t}</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/severance-pay', label: 'Severance pay' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
              { href: '/en/termination-agreement', label: 'Termination agreement' },
              { href: '/en/severance-calculator', label: 'Severance calculator' },
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

      <ContactForm />
      <CTA />
    </main>
  );
}
