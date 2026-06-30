import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { EN_TENURE_ENTRIES, getEnTenure } from '@/lib/en-tenure';
import { SEO_CONFIG } from '@/lib/seo-config';

type Props = { params: { slug: string } };

export const revalidate = 86400;

export function generateStaticParams() {
  return EN_TENURE_ENTRIES.map((e) => ({ slug: e.slug }));
}

const publicUrl = (slug: string) =>
  `${SEO_CONFIG.baseUrl}/en/summary-dismissal-after-${slug}-years-of-employment/`;

const germanCounterpart = (year: number) => {
  const germanSlug = year === 1 ? '1-jahr' : `${year}-jahren`;
  return `${SEO_CONFIG.baseUrl}/fristlose-kuendigung-nach-${germanSlug}-betriebszugehoerigkeit/`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEnTenure(params.slug);
  if (!entry) return {};
  const title = `Summary dismissal after ${entry.label} of service in Germany — § 626 BGB`;
  const description = `Summary (without-notice) dismissal after ${entry.label} of service in Germany. Strict § 626 BGB test, 2-week deadline, severance prospects in defended cases.`;
  return {
    title,
    description,
    alternates: {
      canonical: publicUrl(entry.slug),
      languages: {
        'de-DE': germanCounterpart(entry.year),
        'en': publicUrl(entry.slug),
        'x-default': germanCounterpart(entry.year),
      },
    },
    openGraph: { title, description, url: publicUrl(entry.slug) },
  };
}

export default function SummaryYearsEn({ params }: Props) {
  const entry = getEnTenure(params.slug);
  if (!entry) notFound();

  const prev = EN_TENURE_ENTRIES.find((e) => e.year === entry.year - 1);
  const next = EN_TENURE_ENTRIES.find((e) => e.year === entry.year + 1);
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
            headline: `Summary dismissal after ${entry.label} of service in Germany`,
            url,
            author: { '@type': 'Person', name: SEO_CONFIG.author.name },
            publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Summary dismissal by tenure"
          title={`Summary dismissal after ${entry.label} of service`}
          lede={`A summary (without-notice) dismissal after ${entry.label} of service faces a particularly tough § 626 BGB proportionality test. Long-tenured employees regularly defeat summary dismissals — and settle with severance well above the standard half-month rule.`}
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/summary-dismissal', label: 'Summary dismissal' },
            { href: `/en/summary-dismissal-after-${entry.slug}-years-of-employment`, label: entry.label },
          ]}
          primaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ Same 3-week filing deadline (§ 4 KSchG) applies
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                Even weak summary dismissals must be challenged within 3 weeks — or they
                become final.
              </p>
            </div>
            <Link
              href="#contact"
              className="bg-gold-dark text-white font-semibold text-[0.88rem] px-5 py-2.5 rounded-sm no-underline whitespace-nowrap hover:bg-[#735F32] transition-colors"
            >
              Send me the letter &rarr;
            </Link>
          </div>
        </section>

        <section className="py-12 px-8 bg-white">
          <div className="max-w-[820px] mx-auto">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              A summary dismissal under <strong>§&nbsp;626 BGB</strong> ends the employment
              immediately and triggers a 12-week unemployment-benefit Sperrzeit. The legal
              test is strict: the employer needs a serious cause (<em>wichtiger Grund</em>)
              that makes it unreasonable to continue the employment even for the notice
              period. After <strong>{entry.label} of service</strong>, the proportionality
              balance shifts further in your favour — courts demand a particularly grave
              breach to outweigh long, untroubled tenure.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-0">
              The employer must also act within <strong>2 weeks</strong> of learning the
              cause (§&nbsp;626 II BGB) — missed deadlines are routine winning arguments.
              Settlement value in defeated summary dismissals is typically materially above
              the half-month rule.
            </p>
          </div>
        </section>

        <section className="py-12 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Compare other tenures</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {prev && (
                <Link
                  href={`/en/summary-dismissal-after-${prev.slug}-years-of-employment`}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                    &larr; One year less
                  </span>
                  <div className="font-semibold mt-1">After {prev.label}</div>
                </Link>
              )}
              <Link
                href="/en/summary-dismissal"
                className="block p-5 border border-border-light rounded bg-white text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                  Hub
                </span>
                <div className="font-semibold mt-1">Summary dismissal — overview</div>
              </Link>
              {next && (
                <Link
                  href={`/en/summary-dismissal-after-${next.slug}-years-of-employment`}
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
