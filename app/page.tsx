import Hero from '@/components/Hero';
import Situations from '@/components/Situations';
import Disputes from '@/components/Disputes';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Tools from '@/components/Tools';
import AttorneyProfile from '@/components/AttorneyProfile';
import TeamTeaser from '@/components/TeamTeaser';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import CTA from '@/components/CTA';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';

export const revalidate = 86400;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

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
            '@id': `${BASE_URL}/#organization`,
            name: 'APOS Legal – Kündigung & Abfindung',
            legalName: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
            url: BASE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/logo.png`,
            },
            image: `${BASE_URL}/Fatih.png`,
            description:
              'Fachanwalt für Arbeitsrecht – spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren. Kostenlose Ersteinschätzung.',
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
            areaServed: 'DE',
            availableLanguage: ['German', 'English', 'Turkish'],
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
              name: 'Leistungen Kündigung & Abfindung',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Kündigungsschutzklage',
                    description:
                      'Klage gegen eine unwirksame Kündigung vor dem Arbeitsgericht. 3-Wochen-Frist beachten. Fachanwalt für Arbeitsrecht seit 2011.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Abfindung verhandeln',
                    description:
                      'Durchsetzung einer angemessenen Abfindung nach Kündigung oder im Rahmen eines Aufhebungsvertrags. Formel: 0,5 Monatsgehälter × Betriebszugehörigkeit.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Aufhebungsvertrag prüfen',
                    description:
                      'Prüfung und Verhandlung von Aufhebungsverträgen – Abfindung, Sperrzeit, Zeugnis, Wettbewerbsverbot.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Fristlose Kündigung anfechten',
                    description:
                      'Prüfung der Rechtmäßigkeit einer fristlosen Kündigung nach §626 BGB. Die meisten fristlosen Kündigungen scheitern vor Gericht.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Abmahnung prüfen',
                    description:
                      'Prüfung der Rechtmäßigkeit von Abmahnungen als Vorstufe zur verhaltensbedingten Kündigung. Formfehler können die gesamte Kündigung zu Fall bringen.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'LegalService',
                    name: 'Zeugnis & Abschlussregelungen',
                    description:
                      'Durchsetzung eines qualifizierten Arbeitszeugnisses sowie Verhandlung aller Abschlussregelungen beim Ausscheiden aus dem Arbeitsverhältnis.',
                  },
                },
              ],
            },
            founder: { '@id': `${BASE_URL}/#fatih-bektas` },
            employee: { '@id': `${BASE_URL}/#fatih-bektas` },
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
            '@id': `${BASE_URL}/#fatih-bektas`,
            name: 'Fatih Bektas',
            givenName: 'Fatih',
            familyName: 'Bektas',
            jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
            description:
              'Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Zertifizierter Mediator. Spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren.',
            url: `${BASE_URL}/anwalt`,
            image: `${BASE_URL}/Fatih.png`,
            email: 'bektas@apos.legal',
            telephone: '+4915127003173',
            sameAs: [
              'https://www.linkedin.com/in/fatihbektas',
              'https://www.anwalt.de/bektas',
            ],
            worksFor: { '@id': `${BASE_URL}/#organization` },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Fachanwalt für Arbeitsrecht',
                credentialCategory: 'Fachanwaltschaft',
                recognizedBy: {
                  '@type': 'Organization',
                  name: 'Rechtsanwaltskammer Karlsruhe',
                },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Zertifizierter Mediator',
                credentialCategory: 'Mediationsausbildung',
              },
            ],
            memberOf: [
              { '@type': 'Organization', name: 'Deutscher Anwaltverein' },
              { '@type': 'Organization', name: 'BVAU' },
            ],
            knowsAbout: [
              'Kündigungsschutzklage',
              'Abfindung',
              'Aufhebungsvertrag',
              'Fristlose Kündigung §626 BGB',
              'Kündigungsschutzgesetz KSchG',
              'Betriebsbedingte Kündigung',
              'Sozialauswahl §1 KSchG',
              'Abmahnung',
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
                name: 'Habe ich Anspruch auf eine Abfindung nach einer Kündigung?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Einen gesetzlichen Abfindungsanspruch gibt es nur in wenigen Fällen, z.B. nach §1a KSchG wenn der Arbeitgeber die Kündigung mit einer Abfindungsangebot verbindet. In der Praxis wird eine Abfindung jedoch in den meisten Fällen im Rahmen einer Kündigungsschutzklage oder eines Aufhebungsvertrags ausgehandelt. Die übliche Formel lautet: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie lange habe ich Zeit, gegen eine Kündigung vorzugehen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Die Klagefrist beträgt nur 3 Wochen ab Zugang der Kündigung (§4 KSchG). Verpassen Sie diese Frist, gilt die Kündigung als wirksam – unabhängig davon, ob sie rechtmäßig war oder nicht. Kontaktieren Sie sofort einen Fachanwalt für Arbeitsrecht.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was ist der Unterschied zwischen Kündigung und Aufhebungsvertrag?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bei einer Kündigung beendet der Arbeitgeber das Arbeitsverhältnis einseitig – Sie können dagegen klagen. Beim Aufhebungsvertrag einigen sich beide Seiten einvernehmlich auf eine Beendigung, meist gegen Abfindung. Achtung: Ein Aufhebungsvertrag kann zu einer Sperrzeit beim Arbeitslosengeld führen.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wann ist eine fristlose Kündigung wirksam?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eine fristlose Kündigung nach §626 BGB setzt einen wichtigen Grund voraus, der es dem Arbeitgeber unzumutbar macht, die Kündigungsfrist abzuwarten. Die Anforderungen sind sehr hoch – die meisten fristlosen Kündigungen scheitern vor dem Arbeitsgericht. Der Arbeitgeber muss zudem innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes handeln.',
                },
              },
              {
                '@type': 'Question',
                name: 'Gilt der Kündigungsschutz auch für mich?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Das Kündigungsschutzgesetz (KSchG) gilt, wenn Sie länger als 6 Monate im Betrieb beschäftigt sind und der Betrieb mehr als 10 Mitarbeiter hat (§23 KSchG, sog. Schwellenwert). Ausgenommen sind u.a. Geschäftsführer und leitende Angestellte mit besonderem Status.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie hoch ist meine Abfindung bei X Jahren Betriebszugehörigkeit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Die Abfindungsformel lautet: 0,5 × Bruttomonatsgehalt × Anzahl der Beschäftigungsjahre. Bei 10 Jahren und 3.000 € Gehalt ergibt das 15.000 € als Ausgangspunkt. Je nach Stärke Ihres Falls (Sozialauswahl, Formfehler, Betriebszugehörigkeit) kann erheblich mehr erzielt werden.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was kostet eine Kündigungsschutzklage?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Im ersten arbeitsgerichtlichen Verfahren trägt jede Seite ihre eigenen Anwaltskosten, unabhängig vom Ausgang (§12a ArbGG). Gerichtskosten fallen in der ersten Instanz nicht an. Die Anwaltskosten richten sich nach dem Streitwert (1 Bruttomonatsgehalt). Viele Arbeitnehmer haben eine Rechtsschutzversicherung, die die Kosten übernimmt.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kann ich während der Schwangerschaft gekündigt werden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Nein. Schwangere genießen besonderen Kündigungsschutz nach §17 MuSchG. Eine Kündigung während der Schwangerschaft und bis zu 4 Monate nach der Entbindung ist grundsätzlich unzulässig und bedarf der behördlichen Zustimmung. Ausnahmen sind nur in seltenen Fällen möglich.',
                },
              },
            ],
          }),
        }}
      />

      <main>
        <Hero />
        <AktuelleRechtslage />
        <Situations />
        <Disputes />
        <Process />
        <Testimonials />
        <Tools />
        <AttorneyProfile />
        <TeamTeaser />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
