import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/guides/employment-law/`;

export const metadata: Metadata = {
  title: 'German Employment-Law Guide — Complete Reference',
  description:
    'Plain-English reference to German employment law: dismissal protection, notice periods, severance, working hours, holiday and special protections.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/ratgeber/arbeitsrecht/`,
    },
  },
};

const SECTIONS = [
  {
    title: '1. Sources of German employment law',
    body: 'Bürgerliches Gesetzbuch (BGB §§ 611a ff., 622 ff., 626), Kündigungsschutzgesetz (KSchG), Mutterschutzgesetz (MuSchG), Arbeitszeitgesetz (ArbZG), Bundesurlaubsgesetz (BUrlG), Allgemeines Gleichbehandlungsgesetz (AGG), Sozialgesetzbücher (notably SGB III & IX), plus collective bargaining agreements (Tarifverträge) and works-council agreements (Betriebsvereinbarungen).',
  },
  {
    title: '2. Forming the contract',
    body: 'Written form is not legally required for the contract itself, but the Nachweisgesetz mandates a written confirmation of the essential terms within 7 days of starting work. Probation periods up to 6 months are standard. Fixed-term contracts under TzBfG are restricted: with cause (§ 14 (1)) or without cause (§ 14 (2) — max 2 years).',
  },
  {
    title: '3. Working hours and overtime',
    body: 'The ArbZG caps daily working time at 8 hours (extendable to 10 with averaging). Rest breaks are mandatory. Overtime is only compensated if ordered, tolerated or necessary — see the overtime calculator.',
  },
  {
    title: '4. Holiday',
    body: 'Statutory minimum 4 weeks of paid holiday per year (§ 3 BUrlG). Most contracts provide 25–30 working days. Holiday no longer forfeits automatically at year end (CJEU C-684/16). Unused holiday at the end of employment is paid out (§ 7 (4) BUrlG).',
  },
  {
    title: '5. Special protections',
    body: 'Pregnant employees (§ 17 MuSchG), parental leavers (§ 18 BEEG), severely disabled employees (§ 168 SGB IX) and works-council members (§ 15 KSchG) enjoy heightened dismissal protection. In all of these, prior authorisation by the supervisory authority is required.',
  },
  {
    title: '6. Anti-discrimination (AGG)',
    body: 'The Allgemeines Gleichbehandlungsgesetz protects against discrimination based on race, ethnic origin, gender, religion, disability, age and sexual identity. Notice periods for filing AGG claims are 2 months (§ 15 (4) AGG).',
  },
  {
    title: '7. Reference letters',
    body: 'Qualified reference (§ 109 GewO) must be truthful and benevolently phrased. Standard target in negotiation is a "very good" overall grade. The wording is codified — read it carefully.',
  },
] as const;

export default function GuideEmploymentLawEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Employment-law guide"
        title="German employment law — practical reference"
        lede="A plain-English orientation to the German employment-law landscape. Use the calculators and topic pages for specifics; this guide is the map."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/guides', label: 'Guides' },
          { href: '/en/guides/employment-law', label: 'Employment-law guide' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-[1.35rem] font-bold mb-3">{s.title}</h2>
              <p className="text-[1rem] text-ink-light leading-relaxed m-0">{s.body}</p>
            </div>
          ))}

          <div className="bg-cream border-l-4 border-gold rounded p-6">
            <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
              For a specific question, jump to the topic page — see{' '}
              <Link href="/en/dismissal" className="text-gold-dark underline">
                dismissal
              </Link>
              ,{' '}
              <Link href="/en/severance-pay" className="text-gold-dark underline">
                severance pay
              </Link>{' '}
              or{' '}
              <Link href="/en/glossary" className="text-gold-dark underline">
                the glossary
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
