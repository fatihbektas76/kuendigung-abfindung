import Hero from '@/components/Hero';
import Situations from '@/components/Situations';
import Disputes from '@/components/Disputes';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Tools from '@/components/Tools';
import AttorneyProfile from '@/components/AttorneyProfile';
import TeamTeaser from '@/components/TeamTeaser';
import FAQ from '@/components/FAQ';
import BlogPreview from '@/components/BlogPreview';
import ContactForm from '@/components/ContactForm';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      {/* Schema.org - LegalService + AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LegalService', 'Organization'],
            '@id': 'https://www.german-litigation-lawyer.com/#organization',
            name: 'APOS Legal',
            legalName: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
            url: 'https://www.german-litigation-lawyer.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.german-litigation-lawyer.com/logo.png',
            },
            image: 'https://www.german-litigation-lawyer.com/Fatih.png',
            description:
              'English-speaking German litigation law firm representing US and UK companies in German courts and arbitration proceedings.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Am Paradeplatz 20',
              postalCode: '69126',
              addressLocality: 'Heidelberg',
              addressCountry: 'DE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 49.3988,
              longitude: 8.6724,
            },
            telephone: '+4915127003173',
            email: 'bektas@apos.legal',
            sameAs: [
              'https://www.linkedin.com/company/105863455',
              'https://apos.legal',
              'https://www.anwalt.de/bektas',
            ],
            areaServed: ['US', 'GB', 'EU'],
            availableLanguage: ['English', 'German', 'Turkish'],
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              bestRating: '5',
              worstRating: '1',
              ratingCount: '68',
              reviewCount: '68',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'German Litigation Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Commercial Dispute Litigation',
                    description:
                      'Representation in German commercial courts (Landgericht) for breach of contract, trade disputes, unfair competition and product liability claims.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Employment Litigation',
                    description:
                      'Wrongful dismissal claims, severance disputes, non-compete enforcement and works council conflicts. Certified specialist (Fachanwalt) since 2011.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Shareholder Disputes',
                    description:
                      'Minority shareholder protection, squeeze-outs and breach of fiduciary duties in German GmbH and AG companies.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'International Arbitration',
                    description:
                      'ICC, DIS and LCIA arbitration proceedings seated in Germany. Enforcement of foreign arbitral awards under the New York Convention.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Judgment Enforcement',
                    description:
                      'Enforcing foreign judgments and arbitral awards in Germany via exequatur proceedings and attachment of German assets.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Interim Injunctions',
                    description:
                      'Emergency court orders (einstweilige Verfügung) obtainable within days for IP infringement, non-compete violations and urgent commercial disputes.',
                  },
                },
              ],
            },
            founder: { '@id': 'https://www.german-litigation-lawyer.com/#fatih-bektas' },
            employee: { '@id': 'https://www.german-litigation-lawyer.com/#fatih-bektas' },
          }),
        }}
      />

      {/* Schema.org - Person (Fatih Bektas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://www.german-litigation-lawyer.com/#fatih-bektas',
            name: 'Fatih Bektas',
            givenName: 'Fatih',
            familyName: 'Bektas',
            jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
            description:
              'German-qualified attorney with 20+ years of litigation experience. Certified specialist in employment law (Fachanwalt) since 2011. Former FinTech CEO and board member.',
            url: 'https://www.german-litigation-lawyer.com/team',
            image: 'https://www.german-litigation-lawyer.com/Fatih.png',
            email: 'bektas@apos.legal',
            telephone: '+4915127003173',
            sameAs: [
              'https://www.linkedin.com/in/fatihbektas',
              'https://www.anwalt.de/bektas',
            ],
            worksFor: { '@id': 'https://www.german-litigation-lawyer.com/#organization' },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Fachanwalt für Arbeitsrecht',
                credentialCategory: 'Certified Specialist in Employment Law',
                recognizedBy: {
                  '@type': 'Organization',
                  name: 'Rechtsanwaltskammer Karlsruhe',
                },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Certified Mediator',
                credentialCategory: 'Mediation Certification',
              },
            ],
            memberOf: [
              { '@type': 'Organization', name: 'Deutscher Anwaltverein' },
              { '@type': 'Organization', name: 'BVAU' },
            ],
            knowsAbout: [
              'German civil litigation',
              'Commercial disputes Germany',
              'Employment law Germany',
              'Shareholder disputes',
              'International arbitration',
              'German court procedure',
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I sue a company in Germany from the US or UK?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "To sue in Germany, you need a German-admitted attorney (Rechtsanwalt) — foreign lawyers cannot represent you in German courts. The process starts with a demand letter (Abmahnung), followed by filing a statement of claim (Klageschrift) at the competent court. For claims above €10,000, attorney representation is mandatory (Anwaltszwang). German litigation has no discovery, no jury trials, and follows the 'loser pays' principle. We handle everything in English — you never need to deal with German courts directly.",
                },
              },
              {
                '@type': 'Question',
                name: "I've been sued in Germany — what do I do?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "If you've been served with a German lawsuit (Klageschrift), you typically have 2-4 weeks to respond. Missing this deadline can result in a default judgment (Versäumnisurteil) against you. You need a German-admitted attorney immediately. We can file your defense, request deadline extensions, and represent you through the entire proceeding — all communication with you in English.",
                },
              },
              {
                '@type': 'Question',
                name: 'How long does a lawsuit take in German courts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'First-instance proceedings at a German Regional Court (Landgericht) typically take 6-12 months. Complex cases with expert witnesses may take 12-18 months. Appeals (Berufung) add another 6-12 months. Interim injunctions (einstweilige Verfügungen) can be obtained within days. German litigation is generally faster than US or UK proceedings.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does litigation cost in Germany?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "German litigation costs are calculated from statutory fee schedules based on the amount in dispute — not hourly billing. Germany follows the 'loser pays' rule: the losing party pays court fees and both sides' statutory attorney fees. For a €100,000 dispute, total first-instance costs typically range from €8,000-€15,000. This makes German litigation far more predictable and usually cheaper than US litigation.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I enforce a US or UK judgment in Germany?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'US judgments are generally not directly enforceable in Germany — there is no bilateral enforcement treaty. You need a separate enforcement proceeding (Exequaturverfahren) where a German court reviews the judgment. UK judgments post-Brexit require enforcement under the Hague Convention where applicable. Alternatively, you may need to re-litigate the claim in Germany. We advise on the fastest and most cost-effective enforcement strategy.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use arbitration instead of German courts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if your contract contains an arbitration clause. Germany is a signatory to the New York Convention, making arbitral awards enforceable. Common arbitration institutions include the ICC, DIS (German Arbitration Institute), and LCIA. We represent international clients in both institutional and ad-hoc arbitration proceedings seated in Germany, as well as in enforcement of foreign arbitral awards before German courts.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between Amtsgericht and Landgericht?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Amtsgericht (Local Court) handles civil disputes up to €10,000 — attorney representation is optional but recommended. The Landgericht (Regional Court) handles claims above €10,000 and all commercial matters — attorney representation is mandatory. Commercial disputes can be assigned to specialized Kammern für Handelssachen (Chambers for Commercial Matters) with experienced commercial judges. Appeals go to the Oberlandesgericht (Higher Regional Court) and ultimately to the Bundesgerichtshof (Federal Court of Justice).',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to travel to Germany for my court case?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In most cases, no. Your German attorney represents you in court, and personal appearance is rarely required. If the court orders your personal attendance for a hearing, video conferencing is increasingly accepted. We handle all filings, court appearances, and procedural matters on your behalf — you stay informed through regular English-language updates.',
                },
              },
            ],
          }),
        }}
      />

      <main>
        <Hero />
        <Situations />
        <Disputes />
        <Process />
        <Testimonials />
        <Tools />
        <AttorneyProfile />
        <TeamTeaser />
        <FAQ />
        <BlogPreview />
        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
