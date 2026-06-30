import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/dismissal-protection-act/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Dismissal Protection Act (KSchG) — When It Applies to You`,
  description:
    'The Kündigungsschutzgesetz (KSchG) is Germany’s central dismissal-protection statute. We explain the small-business threshold, the 6-month qualification and what it means in practice.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsschutzgesetz-anwendung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsschutzgesetz-anwendung/`,
    },
  },
};

export default function KSchGEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Dismissal Protection Act (KSchG)"
        title="When does German dismissal protection apply to me?"
        lede="The KSchG kicks in only above two thresholds: you have been employed for more than 6 months, and your employer has more than 10 staff. Below those thresholds, the protection is much weaker — but never zero."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/dismissal-protection-act', label: 'KSchG' },
        ]}
        primaryCta={{ href: '/en/small-business-threshold-calculator', label: 'Test the threshold' }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
            The Kündigungsschutzgesetz (KSchG) is Germany’s central employment-protection
            statute. Where it applies, every ordinary dismissal must be socially justified on
            conduct, person or operational grounds (§&nbsp;1 KSchG). Two conditions must be
            met: <strong>more than 6 months of employment (§&nbsp;1 (1) KSchG)</strong> and{' '}
            <strong>more than 10 employees at the employer</strong> (§&nbsp;23 (1) KSchG).
            Part-time staff count proportionally (0.5 / 0.75 / 1.0 weights).
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-6">The two thresholds</h2>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="p-7 bg-white border-l-4 border-gold rounded">
              <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                6-month qualification (§ 1 (1) KSchG)
              </h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                You must have been continuously employed for more than 6 months at the same
                employer. Probation periods count. If the dismissal lands before this date, the
                KSchG does not protect you — only general rules (good faith, anti-discrimination,
                special protection) apply.
              </p>
            </div>
            <div className="p-7 bg-white border-l-4 border-gold rounded">
              <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                Small-business threshold (§ 23 (1) KSchG)
              </h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                The employer must have more than 10 employees (counted with part-time weighting).
                Apprentices and the employer themselves do not count. Below this threshold the
                KSchG does not apply — even with long tenure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            What protection do you have if KSchG does not apply?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
            <li>
              <strong>Formal requirements:</strong> written form with original signature
              (§&nbsp;623 BGB) — many dismissals fail here alone.
            </li>
            <li>
              <strong>Notice periods:</strong> § 622 BGB still applies — and the employer must
              observe them.
            </li>
            <li>
              <strong>Special dismissal protection:</strong> pregnancy, parental leave, severe
              disability, works-council membership — these protections apply independently of
              the KSchG.
            </li>
            <li>
              <strong>Good faith / anti-discrimination:</strong> dismissals violating § 242 BGB
              or the AGG are invalid even outside KSchG.
            </li>
            <li>
              <strong>Filing deadline still 3 weeks:</strong> the § 4 KSchG deadline applies
              regardless of whether the substantive KSchG protection applies — miss it and you
              lose the right to challenge.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              {
                href: '/en/small-business-threshold-calculator',
                label: 'Test the 10-employee threshold',
              },
              { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
              { href: '/en/severance-pay', label: 'Severance pay' },
              { href: '/en/notice-periods', label: 'Statutory notice periods' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
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
