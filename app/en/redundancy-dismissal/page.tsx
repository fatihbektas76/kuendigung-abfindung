import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/redundancy-dismissal/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Redundancy Dismissal in Germany (Betriebsbedingte Kündigung) ${new Date().getFullYear()} — Rules & Severance`,
  description:
    'Operational / redundancy dismissals in Germany under § 1 (2) KSchG. Social selection, severance under § 1a KSchG, mass-dismissal notification (§ 17 KSchG). Reviewed by a specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/betriebsbedingte-kuendigung/`,
    },
  },
  openGraph: {
    title: 'Redundancy Dismissal in Germany — Rules & Severance',
    description:
      'Operational dismissals under § 1 (2) KSchG. Social selection, § 1a severance, § 17 mass-dismissal notification.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'When is a redundancy dismissal valid in Germany?',
    a: 'Only if three cumulative requirements are met (§ 1 (2) KSchG): (1) an operational decision actually eliminates the workplace, (2) no comparable vacant position exists elsewhere in the establishment, and (3) the social selection between comparable employees correctly balances tenure, age, dependants and severe disability. If any one of these is missing, the dismissal is socially unjustified and invalid.',
  },
  {
    q: 'What is social selection (Sozialauswahl)?',
    a: 'Social selection under § 1 (3) KSchG requires the employer to pick the socially least-protected employee from a group of comparable employees — not the one it would prefer to lose. The four statutory criteria are: duration of employment, age, maintenance obligations (dependants), and severe disability. A flawed selection makes the dismissal invalid.',
  },
  {
    q: 'How much severance can I expect in a redundancy case?',
    a: 'The statutory § 1a KSchG severance is 0.5 gross monthly salaries per year of service and is paid only if the employer explicitly offers it as a waiver of the claim. In contested cases the actually negotiated severance regularly reaches 1.0 to 1.5 monthly salaries per year — more if the social selection is weak, if mass-dismissal notification is missing, or if the works council was improperly consulted.',
  },
  {
    q: 'What is a mass dismissal (Massenentlassung)?',
    a: 'A mass dismissal within the meaning of § 17 KSchG exists above fixed thresholds, e.g. 10 % of the workforce in establishments with 60–499 employees over a 30-day period. The employer must consult the works council and notify the Agentur für Arbeit beforehand. A missing or defective notification makes every single dismissal invalid — a frequent winning argument.',
  },
  {
    q: 'Must the employer offer an alternative position before dismissing me?',
    a: 'Yes. Under § 1 (2) sent. 2 KSchG the dismissal is socially unjustified if a comparable vacant position exists elsewhere in the establishment that could be filled by you — possibly after reasonable retraining or on altered terms. The employer bears the burden of proof that no such position was available.',
  },
  {
    q: 'Does the works council have to be consulted?',
    a: 'Yes, in every establishment with a works council. Under § 102 BetrVG the works council must be informed of the operational decision, the social-selection reasoning and the names of the employees concerned, and given at least one week to respond. Dismissal before the end of this period is invalid.',
  },
  {
    q: 'What is the 3-week deadline?',
    a: 'An unfair-dismissal claim must be filed with the Arbeitsgericht within 3 weeks of receipt of the written dismissal (§ 4 KSchG). If the deadline is missed, the dismissal is treated as valid even if the social selection was plainly wrong. Subsequent admission under § 5 KSchG is granted only in exceptional circumstances.',
  },
];

export default function RedundancyEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                inLanguage: 'en',
                headline: 'Redundancy Dismissal in Germany (Betriebsbedingte Kündigung)',
                url: PAGE_URL,
                author: { '@type': 'Person', name: SEO_CONFIG.author.name },
                publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.legalName },
              },
              {
                '@type': 'FAQPage',
                inLanguage: 'en',
                mainEntity: FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.baseUrl}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Redundancy dismissal', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Redundancy / operational dismissal"
          title="Betriebsbedingte Kündigung — and how to defend against it."
          lede="The employer eliminates the position for operational reasons. To be valid the dismissal must follow a proper social selection. Errors in that selection — and the severance offer under § 1a KSchG — are the standard battleground."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
          ]}
          primaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Urgency banner */}
        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ Filing deadline: 3 weeks from receipt (§ 4 KSchG)
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                Social-selection errors are winnable — but only if the claim is filed in time.
              </p>
            </div>
            <Link
              href="#contact"
              className="bg-gold-dark text-white font-semibold text-[0.88rem] px-5 py-2.5 rounded-sm no-underline whitespace-nowrap hover:bg-[#735F32] transition-colors"
            >
              Send me the letter &rarr;
            </Link>
          </div>
        </section>

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              A redundancy dismissal (<em>betriebsbedingte Kündigung</em>) under{' '}
              <strong><NormLink href={NORM.kschg1}>§&nbsp;1 (2) KSchG</NormLink></strong> is valid
              only if (1)&nbsp;an operational decision actually eliminates the workplace,
              (2)&nbsp;no comparable vacant position exists, and (3)&nbsp;the social selection
              between comparable employees correctly weighs tenure, age, dependants and severe
              disability (<NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink>). The employer
              may frame a severance offer under{' '}
              <NormLink href={NORM.kschg1a}>§&nbsp;1a KSchG</NormLink> (0.5 gross monthly salaries
              per year of service) — a useful anchor, almost never the ceiling.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Three cumulative requirements */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[920px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The three cumulative requirements of § 1 (2) KSchG
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              German labour courts examine every redundancy dismissal against three cumulative
              requirements. The employer must satisfy <strong>all three</strong>. A single defect
              invalidates the dismissal entirely.
            </p>
            <ol className="list-decimal pl-6 space-y-5 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong className="text-ink">Operational decision eliminating the workplace.</strong>{' '}
                Outsourcing, restructuring, site closure, loss of a key customer. The decision
                itself is only lightly reviewed — but the court does check whether the position in
                fact disappears. If the tasks continue to be performed under a different label, the
                decision is a sham.
              </li>
              <li>
                <strong className="text-ink">No comparable vacant position available.</strong>{' '}
                Before dismissing, the employer must offer any comparable role elsewhere in the{' '}
                <em>Betrieb</em> — possibly after short retraining or on altered terms. The employer
                bears the burden of proof that no such position exists.
              </li>
              <li>
                <strong className="text-ink">Correct social selection.</strong>{' '}
                Among comparable employees, the socially least-protected person must be selected.
                The four statutory criteria (<NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink>)
                are duration of employment, age, maintenance obligations and severe disability.
                Mistakes here are the most frequent winning argument in redundancy litigation.
              </li>
            </ol>
          </div>
        </section>

        {/* Social selection scoring */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[920px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              How social selection is scored in practice
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              There is no mandatory formula, but courts and the BAG have accepted point-score
              systems where the four criteria are weighted and summed. A typical rough weighting:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                  <tr className="border-b-2 border-gold-dark">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Criterion</th>
                    <th className="text-left py-2 px-4 font-semibold text-ink">Typical scoring</th>
                    <th className="text-left py-2 pl-4 font-semibold text-ink">Statute</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Duration of employment</td>
                    <td className="py-3 px-4 text-ink-light">1 point / year, capped at ~15–20 years</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink></td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Age</td>
                    <td className="py-3 px-4 text-ink-light">1 point / full year of age, capped around 55/60</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink></td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">Maintenance obligations</td>
                    <td className="py-3 px-4 text-ink-light">4–8 points / spouse or child dependant</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORM.kschg1}>§&nbsp;1 (3) KSchG</NormLink></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-ink">Severe disability (GdB ≥ 50)</td>
                    <td className="py-3 px-4 text-ink-light">5 points + 1 / further 10 GdB above 50</td>
                    <td className="py-3 pl-4 text-ink"><NormLink href={NORM.sgb9168}>§&nbsp;168 SGB IX</NormLink></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[0.9rem] text-ink-muted leading-relaxed mt-5">
              Reality check: the employer may deviate from a strict social-selection outcome only
              where key employees are necessary to maintain a balanced personnel structure. These
              exemption lists (<em>Leistungsträger</em>) are a frequent litigation flashpoint and
              often cannot be substantiated.
            </p>
          </div>
        </section>

        {/* Mass dismissal thresholds */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[920px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              Mass-dismissal thresholds — <NormLink href={NORM.kschg17}>§&nbsp;17 KSchG</NormLink>
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              If the number of dismissals within a 30-day period exceeds the following thresholds,
              the employer must consult the works council <em>and</em> notify the Agentur für
              Arbeit <strong>before</strong> issuing the dismissal letters. A missing or defective
              notification invalidates every single dismissal in the wave.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                  <tr className="border-b-2 border-gold-dark">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Establishment size</th>
                    <th className="text-left py-2 pl-4 font-semibold text-ink">Threshold (30-day window)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">21–59 employees</td>
                    <td className="py-3 pl-4 text-ink-light">More than 5 dismissals</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">60–499 employees</td>
                    <td className="py-3 pl-4 text-ink-light">10 % of workforce <em>or</em> more than 25</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-ink">500+ employees</td>
                    <td className="py-3 pl-4 text-ink-light">At least 30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* § 1a severance offer */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The <NormLink href={NORM.kschg1a}>§&nbsp;1a KSchG</NormLink> severance offer — the anchor
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              The employer <em>may</em> frame a severance offer under § 1a KSchG together with the
              redundancy dismissal. The statutory formula is strictly fixed:
            </p>
            <div className="p-6 bg-cream border-l-4 border-gold rounded">
              <p className="text-[1.05rem] text-ink font-semibold m-0 mb-2">
                Severance = 0.5 × gross monthly salary × years of service
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                Six months and more count as a full year, less than six months are rounded down.
                The offer is binding only if (a) the dismissal letter expressly refers to § 1a
                KSchG and (b) you refrain from filing an unfair-dismissal claim within the 3-week
                deadline.
              </p>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mt-5 mb-0">
              Decision point: filing the claim <em>almost always</em> improves the result. In
              practice the negotiated severance in contested proceedings regularly reaches 1.0 to
              1.5 monthly salaries per year — twice to three times the § 1a anchor. The § 1a offer
              is the floor, not the ceiling.
            </p>
          </div>
        </section>

        {/* BAG case law */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Leading case
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              BAG 20 January 2016 — strict mass-dismissal notification
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              The Federal Labour Court aligns German practice with EU jurisprudence (Case
              C-188/03 <em>Junk</em>): the mass-dismissal notification under § 17 KSchG must be
              fully compliant and submitted <strong>before</strong> any dismissal letter is signed.
              Defective or late notifications invalidate every dismissal in the wave — a core
              defence angle in collective redundancy scenarios.
            </p>
            <BagQuote az="6 AZR 601/14" datum="20.01.2016">
              Ein Verstoß gegen die Anzeigepflicht aus § 17 KSchG führt zur Unwirksamkeit sämtlicher
              im Rahmen der Massenentlassung ausgesprochenen Kündigungen.
            </BagQuote>
            <p className="text-[0.95rem] text-ink-light leading-relaxed italic mt-5 mb-0">
              <strong>English rendering:</strong> A breach of the mass-dismissal notification
              obligation under § 17 KSchG renders <em>all</em> dismissals issued as part of that
              mass dismissal invalid.{' '}
              <a
                href={bagDejureUrl('20.01.2016', '6 AZR 601/14')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                Read the judgment on dejure.org →
              </a>
            </p>
          </div>
        </section>

        {/* Common defence angles */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              Common defence angles
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {[
                {
                  t: 'Flawed social selection',
                  d: 'The employer compared the wrong reference group, ignored relevant tenure/age weights or omitted comparable colleagues. Frequently invalidates the dismissal entirely.',
                },
                {
                  t: 'Position not actually eliminated',
                  d: 'The tasks continue to be performed — only the formal job title changed. The operational decision is then a sham.',
                },
                {
                  t: 'Available vacancy ignored',
                  d: 'The employer was obliged to offer you an alternative role on different terms (§ 1 (2) sent. 2 KSchG) before issuing the dismissal.',
                },
                {
                  t: 'Mass-dismissal notification missing',
                  d: 'For dismissals above the § 17 KSchG thresholds, prior notification to the Agentur für Arbeit is mandatory. Missing notification = invalid dismissal.',
                },
                {
                  t: 'Works council not consulted',
                  d: 'Without proper consultation under § 102 BetrVG the dismissal is invalid — a common defect.',
                },
                {
                  t: 'Severance offer (§ 1a KSchG) below market',
                  d: 'If the employer offered 0.5 monthly salaries per year against waiver of the claim, the offer can usually be materially improved through negotiation.',
                },
              ].map((item) => (
                <div key={item.t} className="p-6 bg-cream border border-border-light rounded">
                  <h3 className="font-serif text-[1.05rem] font-bold mb-2">{item.t}</h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
                { href: '/en/dismissal', label: 'Dismissal — overview' },
                { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
                { href: '/en/termination-agreement', label: 'Termination agreement' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {l.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-8 bg-white" id="faq">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              FAQ
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
              Redundancy dismissal — most common questions
            </h2>
            <div>
              {FAQS.map((faq) => (
                <details key={faq.q} className="border-b border-border-light py-5 group">
                  <summary className="cursor-pointer text-[1.02rem] font-semibold text-ink list-none flex items-center justify-between gap-6 marker:hidden">
                    {faq.q}
                    <span
                      aria-hidden="true"
                      className="text-gold-dark text-xl font-bold transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-[0.95rem] text-ink-light leading-relaxed mt-3 mb-1">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
