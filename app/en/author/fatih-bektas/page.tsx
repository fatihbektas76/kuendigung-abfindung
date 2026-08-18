import type { Metadata } from 'next';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/author/fatih-bektas/`;

export const metadata: Metadata = {
  title: 'About Fatih Bektas — German Employment-Law Specialist',
  description:
    'Fatih Bektas — German employment-law specialist at APOS Legal Heidelberg. Representation of employees, senior executives, board members (Vorstand) and managing directors (Geschäftsführer). 20+ years, 2,000+ proceedings.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/autor/fatih-bektas/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/autor/fatih-bektas/`,
    },
  },
  openGraph: {
    title: 'Fatih Bektas — German Employment-Law Specialist',
    description:
      'Representation of employees, executives, board members and managing directors in German employment and service-contract disputes. APOS Legal Heidelberg.',
    url: PAGE_URL,
  },
};

export default function AuthorEn() {
  return (
    <main>
      <TopicHero
        eyebrow="About the author"
        title="Fatih Bektas — German employment-law specialist"
        lede="Fachanwalt für Arbeitsrecht. 20+ years and 2,000+ proceedings before German labour courts. We represent employees, senior executives, board members (Vorstand) and managing directors (Geschäftsführer). Former CEO / CFO / COO at Unzer and iCOM Group."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/team', label: 'Team' },
          { href: '/en/author/fatih-bektas', label: 'Fatih Bektas' },
        ]}
        primaryCta={{ href: '#contact', label: 'Get in touch' }}
      />

      {/* Schema.org Person + Attorney */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Person', 'Attorney'],
            '@id': `${SEO_CONFIG.baseUrl}/#author`,
            name: SEO_CONFIG.author.name,
            givenName: 'Fatih',
            familyName: 'Bektas',
            jobTitle: 'Fachanwalt für Arbeitsrecht (German employment-law specialist)',
            description:
              'German employment-law specialist with 20+ years of experience. Certified mediator. Representation of employees, senior executives, board members (Vorstand) and managing directors (Geschäftsführer) in employment and service-contract disputes. 2,000+ proceedings.',
            image: `${SEO_CONFIG.baseUrl}/Fatih.webp`,
            url: PAGE_URL,
            email: SEO_CONFIG.author.email,
            telephone: SEO_CONFIG.author.telephone,
            knowsLanguage: ['de', 'en'],
            worksFor: {
              '@type': 'LegalService',
              '@id': `${SEO_CONFIG.baseUrl}/#organization`,
              name: SEO_CONFIG.organization.legalName,
              url: SEO_CONFIG.baseUrl,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Heidelberg',
                addressCountry: 'DE',
              },
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Fachanwalt für Arbeitsrecht',
                credentialCategory: 'Specialist attorney certification',
                recognizedBy: {
                  '@type': 'Organization',
                  name: 'Rechtsanwaltskammer Karlsruhe (Bar Association Karlsruhe)',
                },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Certified Mediator',
                credentialCategory: 'Mediation certification',
              },
            ],
            memberOf: [
              { '@type': 'Organization', name: 'Deutscher Anwaltverein (German Bar Association)' },
              { '@type': 'Organization', name: 'BVAU — Federal Association of In-House Employment Lawyers' },
            ],
            alumniOf: {
              '@type': 'Organization',
              name: 'Heidelberg University',
            },
            knowsAbout: [
              'German unfair-dismissal claims (Kündigungsschutzklage)',
              'Severance negotiation (Abfindung)',
              'Termination agreements (Aufhebungsvertrag)',
              'Summary dismissal under § 626 BGB',
              'Executive representation (Führungskräfte)',
              'Managing-director service contracts (§ 35 GmbHG)',
              'Board-member service contracts (§ 84 AktG)',
              'Removal of managing directors and board members',
              'D&O insurance in executive exits',
              'Post-contractual non-compete clauses',
            ],
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
          </ul>

          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Executives, board members &amp; managing directors
          </h2>
          <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
            A dedicated part of the practice is the representation of <strong>senior
            executives, board members (Vorstand, § 84 AktG) and managing directors
            (Geschäftsführer, § 35 GmbHG)</strong>. Unlike ordinary employees, their
            relationship with the company is governed by service contract, not employment
            law — which requires a different negotiation playbook.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed mb-8">
            <li>Negotiation and termination of Vorstand and Geschäftsführer service contracts</li>
            <li>Removal from office (Abberufung) and separation of office / service contract</li>
            <li>Executive exit packages, bonus and LTI claims, garden-leave clauses</li>
            <li>D&amp;O insurance questions in the context of an exit</li>
            <li>Post-contractual non-compete clauses and their compensation</li>
            <li>Representation of leitende Angestellte (§ 5 (3) BetrVG)</li>
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
