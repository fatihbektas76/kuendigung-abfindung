import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';
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
import StandortTeaser from '@/components/StandortTeaser';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import StatistikTeaser from '@/components/StatistikTeaser';
import TldrBox from '@/components/TldrBox';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt (${new Date().getFullYear()})`,
  description:
    'Fachanwalt für Arbeitsrecht: Kündigung prüfen, Abfindung maximieren, Aufhebungsvertrag verhandeln. Kostenlose Ersteinschätzung.',
  alternates: {
    canonical: 'https://www.gekuendigt-abfindung.de/',
  },
  openGraph: {
    type: 'website',
    title: 'Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt für Arbeitsrecht',
    description:
      'Kündigung erhalten? Fachanwalt für Arbeitsrecht prüft Ihren Fall kostenlos. Abfindung maximieren, Aufhebungsvertrag verhandeln. 20+ Jahre Erfahrung.',
    url: 'https://www.gekuendigt-abfindung.de/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gekündigt? Abfindung & Kündigungsschutz – Fachanwalt für Arbeitsrecht',
    description:
      'Kündigung prüfen, Abfindung maximieren. Fachanwalt für Arbeitsrecht. 20+ Jahre Erfahrung.',
  },
};

export default function Home() {
  return (
    <>
      {/* Schema.org - AggregateRating für LegalService (nur auf Startseite, wo Testimonials sichtbar) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': SEO_CONFIG.organization.id,
            aggregateRating: {
              '@type': 'AggregateRating',
              ...SEO_CONFIG.rating,
            },
            review: SEO_CONFIG.reviews,
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
                  text: 'Die Klagefrist beträgt nur 3 Wochen ab Zugang der Kündigung (§4 KSchG). Verpassen Sie diese Frist, gilt die Kündigung in der Regel als wirksam – unabhängig davon, ob sie rechtmäßig war oder nicht (eine nachträgliche Zulassung der Klage nach § 5 KSchG ist nur in seltenen Ausnahmefällen möglich). Kontaktieren Sie sofort einen Fachanwalt für Arbeitsrecht.',
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
        <section className="py-4 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <TldrBox
              items={[
                '3-Wochen-Frist: Nach Zugang der Kündigung haben Sie nur 3 Wochen für eine Klage (§ 4 KSchG).',
                'Abfindungsformel: 0,5 Bruttomonatsgehälter × Beschäftigungsjahre — oft ist deutlich mehr möglich.',
                'Kostenloser Kündigungscheck: Fachanwalt prüft Ihren Fall — kostenlos und unverbindlich.',
                'Über 2.000 erfolgreiche Verfahren vor deutschen Arbeitsgerichten seit 2005.',
              ]}
            />
          </div>
        </section>
        <Situations />
        <Disputes />
        <Process />
        <Testimonials />
        <Tools />
        <AttorneyProfile />
        <TeamTeaser />
        <FAQ />
        <StandortTeaser />
        <StatistikTeaser />
        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
