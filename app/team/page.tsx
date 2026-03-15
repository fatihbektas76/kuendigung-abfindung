import type { Metadata } from 'next';
import Link from 'next/link';
import TeamCard from '@/components/TeamCard';

export const metadata: Metadata = {
  title: 'Our Team – APOS Legal | German Litigation Lawyers',
  description:
    'Meet the APOS Legal team: Specialized German litigation attorneys with decades of courtroom experience. Representing US and UK companies in German courts.',
  alternates: {
    canonical: 'https://www.german-litigation-lawyer.com/team',
  },
};

const team = [
  { src: '/Fatih.png', name: 'Fatih Bektas', title: 'Attorney-at-Law & Certified Specialist' },
  { src: '/Buechler.png', name: 'Georg Willem Büchler', title: 'Attorney-at-Law & Certified Specialist' },
  { src: '/Duncker.png', name: 'Dr. Martin Duncker', title: 'Attorney-at-Law & Certified Specialist' },
  { src: '/Fuerniss.png', name: 'Tobias Fürniss, Ph.D. (UIBE)', title: 'Attorney-at-Law' },
  { src: '/Hofstaetter.png', name: 'Dr. Heiko Hofstätter', title: 'Attorney-at-Law & Certified Specialist' },
  { src: '/Samklu.png', name: 'Vincent Samklu', title: 'Attorney-at-Law' },
];

const BASE_URL = 'https://www.german-litigation-lawyer.com';

const personSchemas = [
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#fatih-bektas`,
    name: 'Fatih Bektas',
    givenName: 'Fatih',
    familyName: 'Bektas',
    jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
    description:
      'German-qualified attorney with 20+ years of litigation experience. Certified specialist in employment law (Fachanwalt) since 2011. Former FinTech CEO and board member.',
    image: `${BASE_URL}/Fatih.png`,
    url: `${BASE_URL}/team`,
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
    ],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#georg-buechler`,
    name: 'Georg Willem Büchler',
    givenName: 'Georg Willem',
    familyName: 'Büchler',
    jobTitle: 'Rechtsanwalt & Certified Specialist',
    image: `${BASE_URL}/Buechler.png`,
    url: `${BASE_URL}/team`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['German civil litigation', 'Commercial disputes Germany'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#martin-duncker`,
    name: 'Dr. Martin Duncker',
    givenName: 'Martin',
    familyName: 'Duncker',
    jobTitle: 'Rechtsanwalt & Certified Specialist',
    honorificPrefix: 'Dr.',
    image: `${BASE_URL}/Duncker.png`,
    url: `${BASE_URL}/team`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['German civil litigation', 'Commercial disputes Germany'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#tobias-fuerniss`,
    name: 'Tobias Fürniss',
    givenName: 'Tobias',
    familyName: 'Fürniss',
    jobTitle: 'Rechtsanwalt',
    honorificSuffix: 'Ph.D. (UIBE)',
    image: `${BASE_URL}/Fuerniss.png`,
    url: `${BASE_URL}/team`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['German civil litigation', 'Commercial disputes Germany'],
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}/#heiko-hofstaetter`,
    name: 'Dr. Heiko Hofstätter',
    givenName: 'Heiko',
    familyName: 'Hofstätter',
    jobTitle: 'Rechtsanwalt & Certified Specialist',
    honorificPrefix: 'Dr.',
    image: `${BASE_URL}/Hofstaetter.png`,
    url: `${BASE_URL}/team`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['German civil litigation', 'Commercial disputes Germany'],
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
    knowsAbout: ['German civil litigation', 'Commercial disputes Germany'],
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
            name: 'APOS Legal Team',
            description: 'Attorneys at APOS Legal specializing in German litigation for international businesses.',
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
            &larr; Back to Home
          </Link>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mt-6 mb-2.5">
            Our Firm
          </div>
          <h1 className="font-serif text-[2rem] font-bold">The Team Behind APOS Legal</h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            We are a specialized litigation firm focused on commercial disputes and enforcement
            proceedings in Germany. Our team combines deep legal expertise with courtroom
            experience &mdash; fighting for your interests in German courts.
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
