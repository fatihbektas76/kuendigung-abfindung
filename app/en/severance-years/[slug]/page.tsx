import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import {
  EN_TENURE_ENTRIES,
  getEnTenure,
  severanceRange,
} from '@/lib/en-tenure';
import { SEO_CONFIG } from '@/lib/seo-config';

type Props = { params: { slug: string } };

export const revalidate = 86400;

export function generateStaticParams() {
  return EN_TENURE_ENTRIES.map((e) => ({ slug: e.slug }));
}

const publicUrl = (slug: string) =>
  `${SEO_CONFIG.baseUrl}/en/severance-after-${slug}-years-of-employment/`;

const germanCounterpart = (slug: string, year: number) => {
  const germanSlug = year === 1 ? '1-jahr' : `${year}-jahren`;
  return `${SEO_CONFIG.baseUrl}/abfindung-nach-${germanSlug}-betriebszugehoerigkeit/`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEnTenure(params.slug);
  if (!entry) return {};
  const title = `Severance after ${entry.label} of service in Germany — 0.5×–1.5× monthly salaries`;
  const description = `Severance after ${entry.label} of employment in Germany: ${(0.5 * entry.year).toFixed(1)}–${(1.5 * entry.year).toFixed(1)} gross monthly salaries. Calculator, table, free case review.`;
  return {
    title,
    description,
    alternates: {
      canonical: publicUrl(entry.slug),
      languages: {
        'de-DE': germanCounterpart(entry.slug, entry.year),
        'en': publicUrl(entry.slug),
        'x-default': germanCounterpart(entry.slug, entry.year),
      },
    },
    openGraph: { title, description, url: publicUrl(entry.slug) },
  };
}

const SAMPLE_SALARIES = [2500, 3500, 5000, 7500] as const;

export default function SeveranceYearsEn({ params }: Props) {
  const entry = getEnTenure(params.slug);
  if (!entry) notFound();

  const prev = EN_TENURE_ENTRIES.find((e) => e.year === entry.year - 1);
  const next = EN_TENURE_ENTRIES.find((e) => e.year === entry.year + 1);
  const lowFactor = (0.5 * entry.year).toFixed(1);
  const highFactor = (1.5 * entry.year).toFixed(1);
  const url = publicUrl(entry.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en',
            headline: `Severance after ${entry.label} of service in Germany`,
            url,
            author: { '@type': 'Person', name: SEO_CONFIG.author.name },
            publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Severance pay by tenure"
          title={`Severance after ${entry.label} of service in Germany`}
          lede={`After ${entry.label} of continuous service, the German severance rule of thumb sits between ${lowFactor} and ${highFactor} gross monthly salaries. The notice period your employer must observe: ${entry.notice}.`}
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/severance-pay', label: 'Severance pay' },
            { href: `/en/severance-after-${entry.slug}-years-of-employment`, label: entry.label },
          ]}
          primaryCta={{ href: '#contact', label: 'Get my exact number' }}
          secondaryCta={{ href: '/en/severance-calculator', label: 'Use the calculator' }}
        />

        <section className="py-12 px-8 bg-white">
          <div className="max-w-[820px] mx-auto">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              With <strong>{entry.label}</strong> of continuous service, the German half-month
              rule (§&nbsp;1a KSchG / standard settlement formula) sets the baseline at{' '}
              <strong>{lowFactor}</strong> gross monthly salaries — that is, 0.5 × your monthly
              salary × {entry.year}. In a strong case (formal errors in the dismissal letter,
              special protection, flawed social selection) the factor can reach 1.0×–1.5× per
              year, lifting the figure to <strong>{highFactor}</strong> monthly salaries.
              Your employer must observe a notice period of <strong>{entry.notice}</strong>.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law
              specialist (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        <section className="py-12 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-4">
              Severance at common salary brackets ({entry.label})
            </h2>
            <div className="overflow-x-auto bg-white border border-border-light rounded">
              <table className="w-full text-[0.95rem]">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-ink">Gross monthly salary</th>
                    <th className="px-5 py-3 font-semibold text-ink">Baseline (0.5×)</th>
                    <th className="px-5 py-3 font-semibold text-ink">Strong case (1.0×)</th>
                    <th className="px-5 py-3 font-semibold text-ink">Top end (1.5×)</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_SALARIES.map((salary) => {
                    const r = severanceRange(entry.year, salary);
                    const mid = Math.round(salary * 1.0 * entry.year);
                    return (
                      <tr key={salary} className="border-t border-border-light">
                        <td className="px-5 py-3 text-ink-light">
                          €{salary.toLocaleString('en-GB')}
                        </td>
                        <td className="px-5 py-3 font-semibold text-ink">
                          €{r.low.toLocaleString('en-GB')}
                        </td>
                        <td className="px-5 py-3 text-ink">€{mid.toLocaleString('en-GB')}</td>
                        <td className="px-5 py-3 text-ink">
                          €{r.high.toLocaleString('en-GB')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[0.85rem] text-ink-muted mt-4 max-w-[760px]">
              These are illustrative numbers based on the standard half-month rule. Your real
              settlement depends on flaws in the dismissal, social selection, special
              protection, and bargaining posture.
            </p>
          </div>
        </section>

        <section className="py-12 px-8 bg-white">
          <div className="max-w-[820px] mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-4">
              What matters at {entry.label} of service
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>3-week filing deadline (§ 4 KSchG)</strong> applies regardless of tenure.
                Send the letter to a specialist immediately.
              </li>
              <li>
                <strong>KSchG protection</strong> applies once you have been employed{' '}
                {entry.year >= 1 ? 'more than 6 months — which you are' : 'more than 6 months'}.
                The employer must show conduct, person or operational grounds.
              </li>
              <li>
                <strong>Notice period:</strong> {entry.notice}. A dismissal with the wrong
                notice is invalid for the period claimed.
              </li>
              <li>
                <strong>Settlement leverage</strong> at {entry.label} of service is{' '}
                {entry.year >= 10
                  ? 'strong — factors of 1.0× and above are routinely achievable'
                  : entry.year >= 5
                  ? 'moderate — 0.5×–0.75× is normal; more with formal flaws'
                  : 'limited but real — focus on formal flaws and special protection'}
                .
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">
              Compare neighbouring tenures
            </h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {prev && (
                <Link
                  href={`/en/severance-after-${prev.slug}-years-of-employment`}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                    &larr; One year less
                  </span>
                  <div className="font-semibold mt-1">After {prev.label}</div>
                </Link>
              )}
              <Link
                href="/en/severance-pay"
                className="block p-5 border border-border-light rounded bg-white text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                  Hub
                </span>
                <div className="font-semibold mt-1">Severance pay — overview</div>
              </Link>
              {next && (
                <Link
                  href={`/en/severance-after-${next.slug}-years-of-employment`}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                    One year more &rarr;
                  </span>
                  <div className="font-semibold mt-1">After {next.label}</div>
                </Link>
              )}
            </div>
          </div>
        </section>

        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
