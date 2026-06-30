import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/team/`;

export const metadata: Metadata = {
  title: 'Our Team — APOS Legal Heidelberg',
  description:
    'Meet the team at APOS Legal — Fatih Bektas (employment-law specialist), Georg Willem Büchler, Dr Martin Duncker, Tobias Fürniss, Dr Heiko Hofstätter, Vincent Samklu.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/team/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/team/`,
    },
  },
};

interface Member {
  readonly name: string;
  readonly role: string;
  readonly focus: string;
}

const TEAM: readonly Member[] = [
  {
    name: 'Fatih Bektas',
    role: 'German employment-law specialist · Founder',
    focus:
      'Dismissal, severance, summary dismissal, termination agreements. 20+ years, 2,000+ cases. Former CEO / CFO / COO (Unzer, iCOM Group).',
  },
  {
    name: 'Georg Willem Büchler',
    role: 'Rechtsanwalt',
    focus: 'Corporate &amp; commercial litigation.',
  },
  {
    name: 'Dr Martin Duncker',
    role: 'Rechtsanwalt',
    focus: 'M&amp;A and corporate matters.',
  },
  {
    name: 'Tobias Fürniss',
    role: 'Rechtsanwalt',
    focus: 'Commercial contract and dispute work.',
  },
  {
    name: 'Dr Heiko Hofstätter',
    role: 'Rechtsanwalt',
    focus: 'Tax and structuring.',
  },
  {
    name: 'Vincent Samklu',
    role: 'Rechtsanwalt',
    focus: 'Employment and general civil law.',
  },
];

export default function TeamEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Our team"
        title="APOS Legal — Heidelberg"
        lede="Fatih Bektas leads the employment-law practice. The wider APOS Legal firm covers corporate, tax and commercial matters from offices in Heidelberg."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/team', label: 'Team' },
        ]}
        primaryCta={{ href: '#contact', label: 'Get in touch' }}
      />

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {TEAM.map((member) => (
              <div key={member.name} className="p-7 border border-border-light bg-cream rounded">
                <h2 className="font-serif text-[1.2rem] font-bold mb-1">{member.name}</h2>
                <p className="text-[0.85rem] text-gold-dark font-semibold mb-3 uppercase tracking-wide">
                  {member.role}
                </p>
                <p
                  className="text-[0.93rem] text-ink-light leading-relaxed m-0"
                  dangerouslySetInnerHTML={{ __html: member.focus }}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-cream border-l-4 border-gold rounded">
            <h2 className="font-serif text-[1.3rem] font-bold mb-3">About this site</h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              gekuendigt-abfindung.de is the employment-law information portal of APOS Legal. It
              is run by{' '}
              <Link href="/en/author/fatih-bektas" className="text-gold-dark underline">
                Fatih Bektas
              </Link>
              , German employment-law specialist (Fachanwalt für Arbeitsrecht). The English
              section is aimed at expats and English-speaking professionals employed in Germany.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
