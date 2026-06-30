import type { Metadata } from 'next';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/client-intake/`;

export const metadata: Metadata = {
  title: 'Client Intake — Free Case Review',
  description:
    'Tell us about your German employment-law case. Free initial review, response within 48 hours. APOS Legal Heidelberg.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/mandantenaufnahme/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/mandantenaufnahme/`,
    },
  },
  robots: 'noindex, follow',
};

export default function ClientIntakeEn() {
  return (
    <main className="pt-[120px] bg-cream">
      <div className="max-w-content mx-auto px-8 pb-12">
        <p className="font-sans text-[0.7rem] tracking-[0.22em] uppercase text-gold font-semibold">
          Free case review
        </p>
        <h1 className="font-serif text-[clamp(2rem,3.5vw,2.6rem)] font-extrabold text-ink mt-2 mb-4 leading-[1.1]">
          Tell us about your case
        </h1>
        <p className="text-[1.05rem] text-ink-muted max-w-[640px] leading-relaxed">
          We review every case for free and respond within 48 hours on working days. If you have
          a dismissal letter or termination agreement, please attach it to your follow-up email
          once we reply — that lets us give you a binding initial assessment.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
