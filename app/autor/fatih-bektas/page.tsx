import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StandAnzeige from '@/components/StandAnzeige';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

const BASE_URL = SEO_CONFIG.baseUrl;

export const metadata: Metadata = {
  title: `Fatih Bektas — Fachanwalt für Arbeitsrecht | ${new Date().getFullYear()}`,
  description:
    'Fatih Bektas ist Fachanwalt für Arbeitsrecht bei APOS Legal Heidelberg. Über 20 Jahre Erfahrung, 2.000+ erfolgreiche Verfahren. Spezialist für Kündigung, Abfindung & Aufhebungsvertrag.',
  alternates: {
    canonical: `${BASE_URL}/autor/fatih-bektas/`,
  },
  openGraph: {
    title: 'Fatih Bektas — Fachanwalt für Arbeitsrecht',
    description:
      'Fachanwalt für Arbeitsrecht bei APOS Legal Heidelberg. Über 20 Jahre Erfahrung, 2.000+ erfolgreiche Verfahren.',
    url: `${BASE_URL}/autor/fatih-bektas/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatih Bektas — Fachanwalt für Arbeitsrecht',
    description:
      'Fachanwalt für Arbeitsrecht bei APOS Legal Heidelberg. Über 20 Jahre Erfahrung, 2.000+ erfolgreiche Verfahren.',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': ['Person', 'Attorney'],
  '@id': `${BASE_URL}/#author`,
  name: 'Fatih Bektas',
  givenName: 'Fatih',
  familyName: 'Bektas',
  jobTitle: 'Fachanwalt für Arbeitsrecht',
  description:
    'Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Zertifizierter Mediator. Spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren.',
  image: `${BASE_URL}/Fatih.webp`,
  url: `${BASE_URL}/autor/fatih-bektas/`,
  email: 'bektas@apos.legal',
  telephone: '+49622295992400',
  sameAs: [
    'https://www.anwalt.de/fatihbektas',
    'https://www.linkedin.com/in/fatih-bektas',
    `${BASE_URL}/team/`,
  ],
  worksFor: {
    '@type': 'LegalService',
    '@id': `${BASE_URL}/#organization`,
    name: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    url: BASE_URL,
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
    { '@type': 'Organization', name: 'BVAU — Bundesvereinigung der Arbeitsrechtler in Unternehmen' },
  ],
  knowsAbout: [
    'Kündigungsschutzklage',
    'Abfindung',
    'Aufhebungsvertrag',
    'Fristlose Kündigung §626 BGB',
    'Kündigungsschutzgesetz KSchG',
    'Betriebsbedingte Kündigung',
    'Sozialauswahl',
    'Betriebsratsanhörung §102 BetrVG',
    'Abmahnung Arbeitsrecht',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'Universität Heidelberg',
  },
};

const publications = [
  { title: 'Abfindung nach Kündigung: Was Ihnen zusteht', url: '/abfindung/' },
  { title: 'Kündigung erhalten — was jetzt tun?', url: '/kuendigung/' },
  { title: 'Aufhebungsvertrag: Rechte, Abfindung & Sperrzeit', url: '/aufhebungsvertrag/' },
  { title: 'Fristlose Kündigung — Ihre Rechte nach §626 BGB', url: '/fristlose-kuendigung/' },
  { title: 'Abmahnung im Arbeitsrecht: Ihre Rechte', url: '/abmahnung/' },
];

const expertise = [
  {
    area: 'Kündigungsschutzklage',
    desc: 'Prüfung von Kündigungen auf Formfehler, Sozialauswahl und Betriebsratsanhörung. Vertretung vor Arbeitsgerichten bundesweit.',
  },
  {
    area: 'Abfindungsverhandlung',
    desc: 'Maximierung der Abfindung durch strategische Verhandlungsführung. Durchschnittlich 40 % über der Regelformel.',
  },
  {
    area: 'Aufhebungsvertrag',
    desc: 'Prüfung und Verhandlung von Aufhebungsverträgen. Sperrzeit-Vermeidung und Optimierung aller Klauseln.',
  },
  {
    area: 'Fristlose Kündigung',
    desc: 'Anfechtung von fristlosen Kündigungen nach §626 BGB. Umwandlung in ordentliche Kündigung mit Abfindung.',
  },
];

export default function AutorFatihBektasPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${BASE_URL}/autor/fatih-bektas/`}
        pageTitle="Fatih Bektas — Fachanwalt für Arbeitsrecht"
        pageDescription="Fachanwalt für Arbeitsrecht bei APOS Legal Heidelberg. Über 20 Jahre Erfahrung, 2.000+ erfolgreiche Verfahren."
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: `${BASE_URL}/` },
          { name: 'Team', url: `${BASE_URL}/team/` },
          { name: 'Fatih Bektas', url: `${BASE_URL}/autor/fatih-bektas/` },
        ]}
      />

      {/* Schema.org - Person + Attorney */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/team" className="text-gold no-underline hover:underline">Team</Link>
            <span className="mx-2">/</span>
            <span>Fatih Bektas</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Autor &amp; Fachanwalt
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Fatih Bektas
          </h1>
        </div>
      </div>

      {/* Profile Section */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="flex gap-8 items-start mb-10 max-md:flex-col max-md:items-center">
              <div className="w-[160px] h-[160px] rounded-full overflow-hidden flex-shrink-0 border-2 border-border-light">
                <Image
                  src="/Fatih.webp"
                  alt="Fatih Bektas — Rechtsanwalt & Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="max-md:text-center">
                <div className="text-[0.88rem] text-gold-dark font-semibold mb-2">
                  Rechtsanwalt &amp; Fachanwalt f&uuml;r Arbeitsrecht
                </div>
                <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
                  Fatih Bektas ist Fachanwalt f&uuml;r Arbeitsrecht bei der APOS Legal
                  Rechtsanwaltsgesellschaft mbH &amp; Co. KG in Heidelberg. Mit &uuml;ber
                  20 Jahren Erfahrung und mehr als 2.000 erfolgreichen Verfahren ist er
                  einer der f&uuml;hrenden Arbeitsrechtler in der Metropolregion Rhein-Neckar.
                </p>
                <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
                  Vor seiner T&auml;tigkeit als Anwalt war Fatih Bektas als CEO, CFO und COO
                  in der Wirtschaft t&auml;tig &mdash; unter anderem bei Unzer und der iCOM Group.
                  Diese Erfahrung in F&uuml;hrungspositionen gibt ihm ein besonderes Verst&auml;ndnis
                  f&uuml;r die wirtschaftlichen Zusammenh&auml;nge hinter arbeitsrechtlichen Konflikten.
                </p>
                <div className="flex items-center gap-4 flex-wrap max-md:justify-center">
                  <a
                    href="https://www.linkedin.com/in/fatih-bektas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://www.anwalt.de/fatihbektas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    anwalt.de
                  </a>
                  <a
                    href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Termin buchen
                  </a>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-md:grid-cols-1">
              <div className="py-5 px-5 bg-cream border border-border-light rounded-sm text-center">
                <div className="text-[1.5rem] font-bold text-gold-dark">20+</div>
                <div className="text-[0.82rem] text-ink-muted mt-1">Jahre Erfahrung</div>
              </div>
              <div className="py-5 px-5 bg-cream border border-border-light rounded-sm text-center">
                <div className="text-[1.5rem] font-bold text-gold-dark">2.000+</div>
                <div className="text-[0.82rem] text-ink-muted mt-1">Erfolgreiche Verfahren</div>
              </div>
              <div className="py-5 px-5 bg-cream border border-border-light rounded-sm text-center">
                <div className="text-[1.5rem] font-bold text-gold-dark">68</div>
                <div className="text-[0.82rem] text-ink-muted mt-1">Bewertungen anwalt.de</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Schwerpunkte
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Spezialisierung im Arbeitsrecht
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-[740px] max-md:grid-cols-1">
            {expertise.map((item) => (
              <div key={item.area} className="py-5 px-5 bg-white border border-border rounded-sm">
                <span className="font-semibold">{item.area}</span>
                <span className="block text-[0.84rem] text-ink-muted mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Qualifikationen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Ausbildung &amp; Zulassungen
            </h2>
            <ul className="space-y-3">
              {[
                'Fachanwalt f\u00FCr Arbeitsrecht (Rechtsanwaltskammer Karlsruhe)',
                'Zertifizierter Mediator',
                'Mitglied im Deutschen Anwaltverein (DAV)',
                'Mitglied im BVAU \u2014 Bundesvereinigung der Arbeitsrechtler in Unternehmen',
                'Universit\u00E4t Heidelberg \u2014 Studium der Rechtswissenschaften',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-ink-light">
                  <span className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Ver&ouml;ffentlichungen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Ratgeber von Fatih Bektas
          </h2>
          <div className="max-w-[740px] space-y-3">
            {publications.map((pub) => (
              <Link
                key={pub.url}
                href={pub.url}
                className="flex items-center justify-between py-4 px-5 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold transition-all group"
              >
                <span className="font-semibold group-hover:text-gold-dark transition-colors">{pub.title}</span>
                <span className="text-gold-dark text-[0.84rem]">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kontakt
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Kostenlose Ersteinsch&auml;tzung
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            K&uuml;ndigung, Abfindung oder Aufhebungsvertrag? Fatih Bektas pr&uuml;ft Ihren
            Fall kostenlos und unverbindlich &mdash; innerhalb von 48 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos beraten lassen &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
