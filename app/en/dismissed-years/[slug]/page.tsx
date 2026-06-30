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
  `${SEO_CONFIG.baseUrl}/en/dismissed-after-${slug}-years-of-employment/`;

const germanCounterpart = (year: number) => {
  const germanSlug = year === 1 ? '1-jahr' : `${year}-jahren`;
  return `${SEO_CONFIG.baseUrl}/gekuendigt-nach-${germanSlug}-betriebszugehoerigkeit/`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEnTenure(params.slug);
  if (!entry) return {};
  const title = `Dismissed after ${entry.label} in Germany — your rights, deadline & severance`;
  const description = `Dismissed after ${entry.label} of service in Germany: 3-week filing deadline, ${entry.notice.split(' (')[0]} notice period, severance of ${(0.5 * entry.year).toFixed(1)}–${(1.5 * entry.year).toFixed(1)} monthly salaries.`;
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

export default function DismissedYearsEn({ params }: Props) {
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
            headline: `Dismissed after ${entry.label} of service in Germany`,
            url,
            author: { '@type': 'Person', name: SEO_CONFIG.author.name },
            publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Dismissed by tenure"
          title={`Dismissed after ${entry.label} of service in Germany`}
          lede={`After ${entry.label} of continuous service, you enjoy full Dismissal Protection Act (KSchG) protection — your employer needs a socially-justified reason. You have 3 weeks to file.`}
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/dismissal', label: 'Dismissal' },
            { href: `/en/dismissed-after-${entry.slug}-years-of-employment`, label: entry.label },
          ]}
          primaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ 3-week filing deadline (§ 4 KSchG) — regardless of tenure
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                Miss this and the dismissal becomes final even if it was unlawful. Send us
                the letter today.
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
              After {entry.label} of service, you fall fully under the German Dismissal
              Protection Act (KSchG) — assuming your employer has more than 10 staff. Every
              ordinary dismissal must be socially justified on conduct, person or operational
              grounds (§&nbsp;1 KSchG). Your employer must observe a notice period of{' '}
              <strong>{entry.notice}</strong>. Settlement leverage is{' '}
              {entry.year >= 10
                ? 'strong — long tenure consistently produces severance factors above the half-month baseline.'
                : entry.year >= 5
                ? 'moderate — formal flaws in the letter or special protection lift the settlement value materially.'
                : 'limited but real — focus on formal errors in the letter and any special protection that applies.'}
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law
              specialist (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        <section className="py-12 px-8 bg-cream">
          <div className="max-w-[820px] mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-4">
              The first 24 hours
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed">
              <li>Note the exact date of receipt — the 3-week clock starts that day.</li>
              <li>Do not sign anything. No exit document, no severance waiver.</li>
              <li>Send us the letter for a free review within 48 hours.</li>
              <li>Register as job-seeker (arbeitsuchend) within 3 days to protect benefit entitlement.</li>
              <li>Notify your legal-expenses insurer, if any.</li>
            </ol>
          </div>
        </section>

        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Compare other tenures</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {prev && (
                <Link
                  href={`/en/dismissed-after-${prev.slug}-years-of-employment`}
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                    &larr; One year less
                  </span>
                  <div className="font-semibold mt-1">After {prev.label}</div>
                </Link>
              )}
              <Link
                href="/en/dismissal"
                className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                <span className="text-[0.78rem] uppercase tracking-wider text-ink-muted">
                  Hub
                </span>
                <div className="font-semibold mt-1">Dismissal — overview</div>
              </Link>
              {next && (
                <Link
                  href={`/en/dismissed-after-${next.slug}-years-of-employment`}
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
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
