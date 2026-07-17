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
import NormLink, { NORM } from '@/components/NormLink';
import SeoGeoBase from '@/components/SeoGeoBase';
import { PAGE_DATES } from '@/lib/page-dates';

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
      {/* SeoGeoBase ergänzt WebPage + BreadcrumbList + Speakable auf
          #direktantwort. LegalService + Person werden bewusst nicht hier
          gerendert, weil das @graph-Rohschema weiter unten reichere
          Felder (image, url, knowsAbout, review) mitbringt. Beide Person-
          Blöcke tragen dieselbe @id — Google merged sie über @id. */}
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/`}
        pageTitle="gekuendigt-abfindung.de — Fachanwalt für Arbeitsrecht"
        pageDescription="Kündigung erhalten? Fachanwalt für Arbeitsrecht prüft Ihren Fall kostenlos. Abfindung maximieren, Aufhebungsvertrag verhandeln, Kündigungsschutzklage einreichen."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        dateModified={PAGE_DATES.home}
        datePublished="2025-01-15"
        breadcrumbs={[{ name: 'Start', url: `${SEO_CONFIG.baseUrl}/` }]}
      />

      {/* Schema.org - LegalService + Attorney/Person Graph
          Der #author-Anchor ist Grundlage für Article-Schema auf allen
          Unterseiten (article-schema.ts referenziert ihn via @id).
          Ohne diese Definition ist die Referenz „dangling" — Google
          löst dann E-E-A-T-Signale weniger stark auf. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LegalService',
                '@id': SEO_CONFIG.organization.id,
                name: SEO_CONFIG.organization.name,
                legalName: SEO_CONFIG.organization.legalName,
                url: SEO_CONFIG.organization.url,
                description: SEO_CONFIG.organization.description,
                telephone: SEO_CONFIG.organization.telephone,
                email: SEO_CONFIG.organization.email,
                address: {
                  '@type': 'PostalAddress',
                  ...SEO_CONFIG.organization.address,
                },
                areaServed: SEO_CONFIG.organization.areaServed,
                serviceType: SEO_CONFIG.organization.serviceType,
                knowsLanguage: SEO_CONFIG.organization.knowsLanguage,
                founder: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
                employee: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ...SEO_CONFIG.rating,
                },
                review: SEO_CONFIG.reviews,
              },
              {
                '@type': ['Person', 'Attorney'],
                '@id': `${SEO_CONFIG.baseUrl}/#author`,
                name: SEO_CONFIG.author.name,
                jobTitle: SEO_CONFIG.author.jobTitle,
                description: `${SEO_CONFIG.author.credential}, Zulassung ${SEO_CONFIG.author.organization}. Über 2.000 Verfahren im Arbeitsrecht.`,
                image: `${SEO_CONFIG.baseUrl}/Fatih.webp`,
                url: `${SEO_CONFIG.baseUrl}/autor/fatih-bektas/`,
                telephone: SEO_CONFIG.author.telephone,
                email: SEO_CONFIG.author.email,
                worksFor: { '@id': SEO_CONFIG.organization.id },
                memberOf: SEO_CONFIG.author.memberOf,
                hasCredential: SEO_CONFIG.author.hasCredential,
                sameAs: SEO_CONFIG.author.sameAs,
                knowsLanguage: SEO_CONFIG.organization.knowsLanguage,
                knowsAbout: [
                  'Arbeitsrecht',
                  'Kündigungsschutz',
                  'Abfindung',
                  'Aufhebungsvertrag',
                  'Kündigungsschutzklage',
                  'Fristlose Kündigung',
                  'Abmahnung',
                ],
              },
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

        {/* GEO-Direktantwort — zitierfähige Prose-Antwort direkt nach Hero */}
        <section id="direktantwort" className="pt-10 pb-2 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-[760px]">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
                Nach einer Kündigung in Deutschland haben Arbeitnehmer{' '}
                <strong>genau 3 Wochen Zeit</strong>, um beim Arbeitsgericht
                Kündigungsschutzklage zu erheben (
                <NormLink href={NORM.kschg4}>&sect;&nbsp;4 KSchG</NormLink>). Wird diese Frist
                versäumt, gilt die Kündigung in der Regel als wirksam — auch wenn sie
                rechtswidrig war. Einen gesetzlichen Anspruch auf eine{' '}
                <strong>Abfindung</strong> gibt es nur in Sonderfällen (
                <NormLink href={NORM.kschg1a}>&sect;&nbsp;1a KSchG</NormLink>); in der Praxis
                werden Abfindungen in über 80&nbsp;% der Kündigungsschutzverfahren im Vergleich
                ausgehandelt. Die Faustformel: <strong>0,5 Bruttomonatsgehälter pro
                Beschäftigungsjahr</strong>; bei guter Verhandlungsposition deutlich mehr.
                Kündigungsfristen ergeben sich aus{' '}
                <NormLink href={NORM.bgb622}>&sect;&nbsp;622 BGB</NormLink>; die soziale
                Rechtfertigung jeder Kündigung an{' '}
                <NormLink href={NORM.kschg1}>&sect;&nbsp;1 KSchG</NormLink>. Steuerlich greift
                bei Abfindungen die Fünftelregelung (
                <NormLink href={NORM.estg34}>&sect;&nbsp;34 EStG</NormLink>).
              </p>
              <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
                <strong>Verfasst und geprüft von</strong> Fatih Bektas, Fachanwalt für
                Arbeitsrecht (APOS Legal Heidelberg). Über 2.000 erfolgreiche Verfahren vor
                deutschen Arbeitsgerichten.
              </p>
            </div>
          </div>
        </section>

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
