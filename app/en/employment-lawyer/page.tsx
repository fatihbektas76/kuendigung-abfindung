import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/employment-lawyer/`;

export const metadata: Metadata = {
  title: `English-Speaking German Employment Lawyer — Free Case Review`,
  description:
    'German employment-law specialist (Fachanwalt für Arbeitsrecht) handling dismissal, severance and termination-agreement cases in English. Free initial review.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/arbeitsrecht-anwalt/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/arbeitsrecht-anwalt/`,
    },
  },
};

const CITIES = [
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'muenchen', name: 'Munich' },
  { slug: 'frankfurt-am-main', name: 'Frankfurt am Main' },
  { slug: 'koeln', name: 'Cologne' },
  { slug: 'stuttgart', name: 'Stuttgart' },
  { slug: 'duesseldorf', name: 'Düsseldorf' },
  { slug: 'heidelberg', name: 'Heidelberg' },
  { slug: 'mannheim', name: 'Mannheim' },
  { slug: 'karlsruhe', name: 'Karlsruhe' },
  { slug: 'leipzig', name: 'Leipzig' },
  { slug: 'dresden', name: 'Dresden' },
  { slug: 'nuernberg', name: 'Nuremberg' },
  { slug: 'bremen', name: 'Bremen' },
  { slug: 'hannover', name: 'Hanover' },
] as const;

export default function EmploymentLawyerHubEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Employment lawyer in Germany"
        title="English-speaking German employment-law specialist"
        lede="Fatih Bektas, Fachanwalt für Arbeitsrecht at APOS Legal Heidelberg, represents employees and senior executives in dismissal, severance and termination-agreement matters across Germany — in English."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/employment-lawyer', label: 'Employment lawyer' },
        ]}
        primaryCta={{ href: '#contact', label: 'Free case review' }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
            German labour-law cases are filed at the Arbeitsgericht of the employer’s seat
            or the place of work. We act before any German Arbeitsgericht — proceedings are
            handled in German on the court file, but you and we communicate entirely in
            English. Below: the cities where we most frequently act, with city-specific
            information on local case practice.
          </p>
        </div>
      </section>

      <section className="py-12 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-6">Find us by city</h2>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/en/employment-lawyer/${city.slug}`}
                className="block p-4 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline text-center hover:border-gold hover:text-gold-dark transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
          <p className="text-[0.85rem] text-ink-muted mt-6 leading-relaxed max-w-[680px]">
            Not on the list? We act all over Germany regardless of where the matter sits. Use
            the contact form below and tell us where the employer is located — we will tell
            you which Arbeitsgericht is competent.
          </p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
