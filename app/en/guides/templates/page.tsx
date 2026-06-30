import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/templates/`;

export const metadata: Metadata = {
  title: 'Letter Templates for German Employment Matters',
  description:
    'Tested templates for common English-speaker employment-law situations in Germany — objection to written warning, request for reference, severance counter-offer.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/muster/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/muster/`,
    },
  },
};

const TEMPLATES = [
  {
    title: 'Objection to a written warning (Gegendarstellung)',
    body:
      'Formal reply that goes into your personnel file next to the Abmahnung. Useful when you do not want to escalate but want the record corrected.',
  },
  {
    title: 'Request to remove a written warning',
    body:
      'Pre-litigation demand letter requiring the employer to remove an unjustified Abmahnung within a fixed deadline (typically 14 days).',
  },
  {
    title: 'Severance counter-offer',
    body:
      'Counter to a § 1a KSchG offer or to a lowball termination-agreement proposal — anchored on the half-month rule and your leverage points.',
  },
  {
    title: 'Refusal of a termination agreement',
    body:
      'Formal reply rejecting a termination agreement without burning the bridge to a renegotiated severance.',
  },
  {
    title: 'Request for a reference letter',
    body:
      'Demand for a qualified reference (§ 109 GewO) and the standard "very good" overall grade.',
  },
  {
    title: 'Notification to legal-expenses insurance',
    body:
      'Pre-filing notification triggering cover under your Rechtsschutzversicherung.',
  },
] as const;

export default function TemplatesEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Templates"
        title="Letter templates for German employment matters"
        lede="We supply tailored, individually drafted letters to clients — built from the templates below and adapted to your specific facts. Request the relevant template through the contact form."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/guides', label: 'Guides' },
          { href: '/en/guides/templates', label: 'Templates' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {TEMPLATES.map((t) => (
              <div key={t.title} className="p-6 border border-border-light bg-cream rounded">
                <h2 className="font-serif text-[1.1rem] font-bold mb-2">{t.title}</h2>
                <p className="text-[0.94rem] text-ink-light leading-relaxed m-0">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
            <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
              <strong>Why no public download?</strong> Letter templates are useful only when
              tailored to your specific facts. A generic template often does more harm than good
              because it concedes leverage. Use the{' '}
              <Link href="#contact" className="text-gold-dark underline">
                contact form
              </Link>{' '}
              and we send you a tailored draft.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
