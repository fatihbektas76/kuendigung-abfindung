import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { staedte, type Stadt } from '@/data/staedte';
import { SEO_CONFIG } from '@/lib/seo-config';

type Props = { params: { city: string } };

export const revalidate = 86400;

/**
 * English-name overrides for cities whose German slug differs from the
 * English short name. Used only for display; the slug stays the same so
 * URLs stay identical between the DE and EN trees.
 */
const EN_CITY_NAME: Readonly<Record<string, string>> = {
  muenchen: 'Munich',
  koeln: 'Cologne',
  nuernberg: 'Nuremberg',
  hannover: 'Hanover',
  braunschweig: 'Brunswick',
  duesseldorf: 'Düsseldorf',
};

function displayName(stadt: Stadt): string {
  return EN_CITY_NAME[stadt.slug] ?? stadt.name;
}

export function generateStaticParams() {
  return staedte.map((s) => ({ city: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stadt = staedte.find((s) => s.slug === params.city);
  if (!stadt) return {};
  const name = displayName(stadt);
  const title = `English-Speaking German Employment Lawyer ${name} — Free Case Review`;
  const description = `German employment-law specialist serving employees in ${name}. Filing at ${stadt.arbeitsgericht}. Free initial review, response within 48 hours.`;
  const url = `${SEO_CONFIG.baseUrl}/en/employment-lawyer/${stadt.slug}/`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'de-DE': `${SEO_CONFIG.baseUrl}/arbeitsrecht-anwalt/${stadt.slug}/`,
        'en': url,
        'x-default': `${SEO_CONFIG.baseUrl}/arbeitsrecht-anwalt/${stadt.slug}/`,
      },
    },
    openGraph: { title, description, url },
  };
}

export default function EmploymentLawyerCityEn({ params }: Props) {
  const stadt = staedte.find((s) => s.slug === params.city);
  if (!stadt) notFound();
  const name = displayName(stadt);
  const url = `${SEO_CONFIG.baseUrl}/en/employment-lawyer/${stadt.slug}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            inLanguage: 'en',
            name: `APOS Legal — Employment Lawyer ${name}`,
            url,
            areaServed: { '@type': 'City', name },
            provider: {
              '@type': 'Attorney',
              name: SEO_CONFIG.author.name,
              jobTitle: 'German employment-law specialist',
            },
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow={`Employment lawyer in ${name}`}
          title={`English-speaking employment lawyer for ${name}`}
          lede={`We represent employees and senior executives before the ${stadt.arbeitsgericht}, all matters in English. APOS Legal — Heidelberg, acting nationwide.`}
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/employment-lawyer', label: 'Employment lawyer' },
            { href: `/en/employment-lawyer/${stadt.slug}`, label: name },
          ]}
          primaryCta={{ href: '#contact', label: 'Free case review' }}
          secondaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
        />

        <section className="py-12 px-8 bg-white">
          <div className="max-w-[820px] mx-auto">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              Employment disputes for {name}-based employees are heard at the{' '}
              <strong>{stadt.arbeitsgericht}</strong>
              {stadt.arbeitsgerichtAdresse && (
                <>
                  {' '}({stadt.arbeitsgerichtAdresse})
                </>
              )}
              . Appeals go to the <strong>{stadt.lagName}</strong>. We file your case, attend
              hearings on your behalf, and conduct all communications with you in English.
              German labour-law cases settle in approximately 75–80% of cases at the
              conciliation hearing (Güteverhandlung), typically within 4–6 weeks of filing.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law
              specialist (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        <section className="py-12 px-8 bg-cream">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">
              Local case facts for {name}
            </h2>
            <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-[0.95rem]">
              <dt className="font-semibold text-ink">Federal state</dt>
              <dd className="text-ink-light m-0">{stadt.bundesland}</dd>
              <dt className="font-semibold text-ink">First-instance court</dt>
              <dd className="text-ink-light m-0">{stadt.arbeitsgericht}</dd>
              <dt className="font-semibold text-ink">Court address</dt>
              <dd className="text-ink-light m-0">{stadt.arbeitsgerichtAdresse}</dd>
              <dt className="font-semibold text-ink">Appellate court</dt>
              <dd className="text-ink-light m-0">{stadt.lagName}</dd>
              <dt className="font-semibold text-ink">Region</dt>
              <dd className="text-ink-light m-0">{stadt.region}</dd>
            </dl>
          </div>
        </section>

        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Common matters in {name}</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/dismissal', label: 'Dismissal — overview' },
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/termination-agreement', label: 'Termination agreement' },
                { href: '/en/summary-dismissal', label: 'Summary dismissal' },
                { href: '/en/written-warning', label: 'Written warning' },
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
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
    </>
  );
}
