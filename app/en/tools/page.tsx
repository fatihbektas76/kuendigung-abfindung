import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/tools/`;

export const metadata: Metadata = {
  title: 'German Employment-Law Tools & Calculators',
  description:
    'Free calculators and checks for German employment law: severance, notice period, overtime, unused-holiday pay, small-business threshold and more.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/tools/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/tools/`,
    },
  },
};

const TOOLS = [
  {
    href: '/en/check-dismissal',
    title: 'Check your dismissal',
    body: 'Send us the dismissal letter — we tell you within 48 hours whether it is challengeable.',
  },
  {
    href: '/en/severance-calculator',
    title: 'Severance calculator',
    body: 'Estimate the realistic severance for your salary and length of service.',
  },
  {
    href: '/en/notice-period-calculator',
    title: 'Notice-period calculator',
    body: 'Statutory notice period under § 622 BGB based on your length of service.',
  },
  {
    href: '/en/small-business-threshold-calculator',
    title: 'Small-business threshold',
    body: 'Test whether the KSchG applies to your employer using the part-time-weighted count.',
  },
  {
    href: '/en/overtime-calculator',
    title: 'Overtime calculator',
    body: 'Calculate overtime balance and compensation entitlement.',
  },
  {
    href: '/en/unused-holiday-pay-calculator',
    title: 'Unused-holiday pay',
    body: 'Cash-out value for unused statutory holiday at the end of the employment.',
  },
  {
    href: '/en/part-time-holiday-calculator',
    title: 'Part-time holiday calculator',
    body: 'Statutory holiday entitlement on a non-5-day week.',
  },
  {
    href: '/en/check-written-warning',
    title: 'Check written warning',
    body: 'Review whether your Abmahnung is valid and how to challenge it.',
  },
  {
    href: '/en/check-termination-agreement',
    title: 'Check termination agreement',
    body: 'Identify the Sperrzeit trap and missing severance clauses before you sign.',
  },
] as const;

export default function ToolsEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Tools &amp; calculators"
        title="Free tools for German employment law"
        lede="Quick numbers and checks for the most common dismissal, severance and notice-period scenarios. None of these replaces a legal review — every output ends with a free case-review CTA."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
        ]}
      />

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-7 border border-border-light bg-cream rounded transition-all no-underline hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <h2 className="font-serif text-[1.2rem] font-bold text-ink mb-2">
                  {tool.title}
                </h2>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{tool.body}</p>
                <span className="inline-block mt-4 text-[0.85rem] font-semibold text-gold-dark">
                  Open tool &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
