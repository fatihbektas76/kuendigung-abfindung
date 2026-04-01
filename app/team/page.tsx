import type { Metadata } from 'next';
import Link from 'next/link';
import TeamCard from '@/components/TeamCard';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Unser Team | APOS Legal – Fachanwälte Arbeitsrecht',
  description:
    'Spezialisierte Fachanwälte für Arbeitsrecht. Jahrzehntelange Erfahrung & über 2.000 erfolgreiche Verfahren.',
  alternates: {
    canonical: 'https://www.gekuendigt-abfindung.de/team/',
  },
  openGraph: {
    title: 'Unser Team | APOS Legal – Fachanwälte Arbeitsrecht',
    description: 'Spezialisierte Fachanwälte für Arbeitsrecht mit jahrzehntelanger Erfahrung vor deutschen Arbeitsgerichten.',
    url: 'https://www.gekuendigt-abfindung.de/team/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unser Team | APOS Legal – Fachanwälte Arbeitsrecht',
    description: 'Spezialisierte Fachanwälte für Arbeitsrecht mit jahrzehntelanger Erfahrung vor deutschen Arbeitsgerichten.',
  },
};

const team = [
  { src: '/Fatih.webp', name: 'Fatih Bektas', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Buechler.webp', name: 'Georg Willem Büchler', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Duncker.webp', name: 'Dr. Martin Duncker', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Fuerniss.webp', name: 'Tobias Fürniss, Ph.D. (UIBE)', title: 'Rechtsanwalt' },
  { src: '/Hofstaetter.webp', name: 'Dr. Heiko Hofstätter', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Samklu.webp', name: 'Vincent Samklu', title: 'Rechtsanwalt' },
];

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const personSchemas = [
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#author`,
    name: 'Fatih Bektas',
    givenName: 'Fatih',
    familyName: 'Bektas',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    description:
      'Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Zertifizierter Mediator. Spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren.',
    image: `${BASE_URL}/Fatih.webp`,
    url: `${BASE_URL}/team/`,
    email: 'bektas@apos.legal',
    telephone: '+49622295992400',
    sameAs: [
      'https://www.anwalt.de/fatihbektas',
      'https://www.linkedin.com/in/fatih-bektas',
      'https://www.gekuendigt-abfindung.de/team/',
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
    ],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#georg-buechler`,
    name: 'Georg Willem Büchler',
    givenName: 'Georg Willem',
    familyName: 'Büchler',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    image: `${BASE_URL}/Buechler.webp`,
    url: `${BASE_URL}/team/`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#martin-duncker`,
    name: 'Dr. Martin Duncker',
    givenName: 'Martin',
    familyName: 'Duncker',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    honorificPrefix: 'Dr.',
    image: `${BASE_URL}/Duncker.webp`,
    url: `${BASE_URL}/team/`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#tobias-fuerniss`,
    name: 'Tobias Fürniss',
    givenName: 'Tobias',
    familyName: 'Fürniss',
    jobTitle: 'Rechtsanwalt',
    honorificSuffix: 'Ph.D. (UIBE)',
    image: `${BASE_URL}/Fuerniss.webp`,
    url: `${BASE_URL}/team/`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#heiko-hofstaetter`,
    name: 'Dr. Heiko Hofstätter',
    givenName: 'Heiko',
    familyName: 'Hofstätter',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    honorificPrefix: 'Dr.',
    image: `${BASE_URL}/Hofstaetter.webp`,
    url: `${BASE_URL}/team/`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#vincent-samklu`,
    name: 'Vincent Samklu',
    givenName: 'Vincent',
    familyName: 'Samklu',
    jobTitle: 'Rechtsanwalt',
    image: `${BASE_URL}/Samklu.webp`,
    url: `${BASE_URL}/team/`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
];

export default function TeamPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/team/`}
        pageTitle="Unser Team — APOS Legal"
        pageDescription="Spezialisierte Fachanwälte für Arbeitsrecht mit jahrzehntelanger Erfahrung vor deutschen Arbeitsgerichten."
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Team', url: `${SEO_CONFIG.baseUrl}/team/` },
        ]}
      />

      {/* Schema.org - ItemList of Person entities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Team gekuendigt-abfindung.de',
            description: 'Fachanwälte für Arbeitsrecht — spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag.',
            url: `${BASE_URL}/team/`,
            numberOfItems: personSchemas.length,
            itemListElement: personSchemas.map((person, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: person,
            })),
          }),
        }}
      />

      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Zurück zur Startseite
          </Link>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mt-6 mb-2.5">
            Unsere Kanzlei
          </div>
          <h1 className="font-serif text-[2rem] font-bold">Unser Team</h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            Wir sind eine spezialisierte Kanzlei für Kündigungsschutz und Arbeitsrecht. Unser Team
            verbindet tiefgreifende juristische Expertise mit langjähriger Erfahrung vor deutschen
            Arbeitsgerichten &mdash; und kämpft für Ihre Rechte.
          </p>
        </div>
      </div>

      <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {team.map((member) => (
              <TeamCard key={member.name} src={member.src} name={member.name} title={member.title} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
