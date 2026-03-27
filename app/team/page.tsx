import type { Metadata } from 'next';
import Link from 'next/link';
import TeamCard from '@/components/TeamCard';

export const metadata: Metadata = {
  title: 'Unser Team | APOS Legal – Fachanwälte Arbeitsrecht',
  description:
    'Lernen Sie unser Team kennen: Spezialisierte Fachanwälte für Arbeitsrecht mit jahrzehntelanger Erfahrung vor deutschen Arbeitsgerichten. Über 2.000 erfolgreiche Verfahren.',
  alternates: {
    canonical: 'https://www.gekuendigt-abfindung.de/team/',
  },
};

const team = [
  { src: '/Fatih.jpg', name: 'Fatih Bektas', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Buechler.png', name: 'Georg Willem Büchler', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Duncker.png', name: 'Dr. Martin Duncker', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Fuerniss.jpg', name: 'Tobias Fürniss, Ph.D. (UIBE)', title: 'Rechtsanwalt' },
  { src: '/Hofstaetter.png', name: 'Dr. Heiko Hofstätter', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Samklu.png', name: 'Vincent Samklu', title: 'Rechtsanwalt' },
];

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const personSchemas = [
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#fatih-bektas`,
    name: 'Fatih Bektas',
    givenName: 'Fatih',
    familyName: 'Bektas',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    description:
      'Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Zertifizierter Mediator. Spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag. Über 2.000 erfolgreiche Verfahren.',
    image: `${BASE_URL}/Fatih.jpg`,
    url: `${BASE_URL}/team`,
    email: 'bektas@apos.legal',
    telephone: '+4915127003173',
    sameAs: [
      'https://www.anwalt.de/fatihbektas',
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
    image: `${BASE_URL}/Buechler.png`,
    url: `${BASE_URL}/team`,
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
    image: `${BASE_URL}/Duncker.png`,
    url: `${BASE_URL}/team`,
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
    image: `${BASE_URL}/Fuerniss.jpg`,
    url: `${BASE_URL}/team`,
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
    image: `${BASE_URL}/Hofstaetter.png`,
    url: `${BASE_URL}/team`,
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
    image: `${BASE_URL}/Samklu.png`,
    url: `${BASE_URL}/team`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Kündigungsschutzrecht', 'Arbeitsrecht'],
  },
];

export default function TeamPage() {
  return (
    <main>
      {/* Schema.org - ItemList of Person entities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Team gekuendigt-abfindung.de',
            description: 'Fachanwälte für Arbeitsrecht — spezialisiert auf Kündigung, Abfindung und Aufhebungsvertrag.',
            url: `${BASE_URL}/team`,
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
