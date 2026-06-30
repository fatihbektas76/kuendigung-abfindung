import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/dismissal-statistics-german-labour-courts/`;

export const metadata: Metadata = {
  title: 'Dismissal Statistics — German Labour Courts',
  description:
    'How often unfair-dismissal claims succeed in Germany, how often they settle and the realistic severance ranges from the Bundesamt für Statistik data.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/`,
    },
  },
};

export default function DismissalStatsEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Statistics"
        title="Dismissal statistics — German labour courts"
        lede="The data points that matter: how often Kündigungsschutzklagen succeed, what proportion settle, and the realistic severance multiples in those settlements."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/guides', label: 'Guides' },
          { href: '/en/guides/dismissal-statistics-german-labour-courts', label: 'Statistics' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto space-y-10">
          <div>
            <h2 className="font-serif text-[1.35rem] font-bold mb-3">Outcomes at first instance</h2>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>~75–80% settle</strong> at the conciliation or chamber hearing — typically
                with a court-supervised severance.
              </li>
              <li>
                <strong>~10–15% are withdrawn</strong> after settlement out of court.
              </li>
              <li>
                <strong>~10% are decided by judgment.</strong> Of those, employees win the majority
                where the KSchG applies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[1.35rem] font-bold mb-3">Time to first hearing</h2>
            <p className="text-[1rem] text-ink-light leading-relaxed m-0">
              Median time from filing to the first conciliation hearing (Güteverhandlung) is{' '}
              <strong>4–6 weeks</strong> across most Arbeitsgerichte. Berlin and Munich tend to
              run longer; smaller courts faster.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.35rem] font-bold mb-3">Severance ranges</h2>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>
                Statutory baseline (§ 1a KSchG): <strong>0.5 monthly salaries / year of service</strong>.
              </li>
              <li>
                Typical settlements: <strong>0.5–1.0×</strong> for short-medium tenure, no special
                leverage.
              </li>
              <li>
                Strong cases (formal errors, long tenure, special protection): <strong>1.0–1.5×</strong>{' '}
                and above.
              </li>
              <li>
                Senior executives and protected categories: regularly{' '}
                <strong>materially above 1.5×</strong>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[1.35rem] font-bold mb-3">Notes on sources</h2>
            <p className="text-[0.92rem] text-ink-muted leading-relaxed m-0">
              Figures are aggregated from Federal Office of Statistics labour-court statistics and
              practitioner data. Individual outcomes depend strongly on the specifics of your case.
              The data is illustrative and does not constitute legal advice. For a tailored
              estimate, send your dismissal letter for a free review.
            </p>
          </div>

          <div className="bg-cream border-l-4 border-gold rounded p-6">
            <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
              Use the{' '}
              <Link href="/en/severance-calculator" className="text-gold-dark underline">
                severance calculator
              </Link>{' '}
              and{' '}
              <Link href="/en/legal-fees-calculator" className="text-gold-dark underline">
                legal-fees calculator
              </Link>{' '}
              for the numerical side of your case.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
