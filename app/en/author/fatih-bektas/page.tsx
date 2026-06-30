import type { Metadata } from 'next';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/author/fatih-bektas/`;

export const metadata: Metadata = {
  title: 'About Fatih Bektas — German Employment-Law Specialist',
  description:
    'Fatih Bektas — German employment-law specialist (Fachanwalt für Arbeitsrecht) at APOS Legal Heidelberg. 20+ years, 2,000+ proceedings.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/autor/fatih-bektas/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/autor/fatih-bektas/`,
    },
  },
};

export default function AuthorEn() {
  return (
    <main>
      <TopicHero
        eyebrow="About the author"
        title="Fatih Bektas — German employment-law specialist"
        lede="Fachanwalt für Arbeitsrecht. 20+ years in German employment law and 2,000+ proceedings before German labour courts. Former CEO / CFO / COO at Unzer and iCOM Group."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/team', label: 'Team' },
          { href: '/en/author/fatih-bektas', label: 'Fatih Bektas' },
        ]}
        primaryCta={{ href: '#contact', label: 'Get in touch' }}
      />

      {/* Schema.org Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: SEO_CONFIG.author.name,
            jobTitle: 'Fachanwalt für Arbeitsrecht',
            url: PAGE_URL,
            email: SEO_CONFIG.author.email,
            telephone: SEO_CONFIG.author.telephone,
            worksFor: {
              '@type': 'Organization',
              name: SEO_CONFIG.organization.legalName,
            },
            sameAs: SEO_CONFIG.author.sameAs,
          }),
        }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">Practice focus</h2>
          <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed mb-8">
            <li>Unfair-dismissal claims (Kündigungsschutzklagen) before any German Arbeitsgericht</li>
            <li>Severance negotiation, in or outside court</li>
            <li>Summary dismissals under § 626 BGB</li>
            <li>Termination agreements — drafting, review, renegotiation</li>
            <li>Written warnings (Abmahnungen)</li>
            <li>Reference-letter (Zeugnis) disputes</li>
            <li>Executive exit packages and post-contractual non-compete</li>
          </ul>

          <h2 className="font-serif text-[1.4rem] font-bold mb-4">Credentials</h2>
          <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed mb-8">
            <li>Fachanwalt für Arbeitsrecht (specialist title since 2011)</li>
            <li>Certified mediator</li>
            <li>Member of Deutscher Anwaltverein and BVAU</li>
            <li>5.0 ★ across 68 reviews on anwalt.de</li>
          </ul>

          <h2 className="font-serif text-[1.4rem] font-bold mb-4">Background</h2>
          <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
            Operational background as Group CEO/CFO/COO at Unzer and iCOM Group informs the
            commercial pragmatism brought to every matter. The German Arbeitsgerichte are
            settlement-driven — we negotiate from a position of strength because we understand
            the operational pressure on the employer’s side.
          </p>
          <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-0">
            Languages: German, English. Cases handled all over Germany.
          </p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
