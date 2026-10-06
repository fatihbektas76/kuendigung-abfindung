import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/unfair-dismissal-claim/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Unfair-Dismissal Claim Germany (Kündigungsschutzklage) ${new Date().getFullYear()} — Process, Cost, Severance`,
  description:
    'Unfair-dismissal claim (Kündigungsschutzklage) under § 4 KSchG: 3-week deadline, procedure at the Arbeitsgericht, costs under § 12a ArbGG, and realistic severance expectations.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
    },
  },
  openGraph: {
    title: 'Unfair-Dismissal Claim Germany — Process, Cost, Severance',
    description:
      'Kündigungsschutzklage under § 4 KSchG: 3-week deadline, Güteverhandlung, costs under § 12a ArbGG. Reviewed by a specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'What is a Kündigungsschutzklage?',
    a: 'A Kündigungsschutzklage (unfair-dismissal claim) is the formal declaratory action under § 4 KSchG asking the Arbeitsgericht to declare that a dismissal has not ended the employment. It is the only legal route to challenge a German dismissal. If the claim is not filed within 3 weeks of receipt, the dismissal is treated as valid (§ 7 KSchG) even if it was socially unjustified.',
  },
  {
    q: 'What is the deadline for filing?',
    a: 'Exactly 3 weeks from receipt of the written dismissal letter (§ 4 KSchG). Weekends and public holidays do not extend the deadline unless the final day itself falls on one, in which case the deadline moves to the next working day. Later admission under § 5 KSchG is granted only in rare cases where the employee was prevented from filing in time without their fault (e.g. serious illness).',
  },
  {
    q: 'What happens at the Güteverhandlung?',
    a: 'The Güteverhandlung is the mandatory first conciliation hearing — usually scheduled 4–6 weeks after filing. The chairing judge probes the strengths and weaknesses of both sides and actively suggests settlement. Roughly 70–80 % of cases are resolved at this stage, almost always with a severance payment.',
  },
  {
    q: 'How much does an unfair-dismissal claim cost?',
    a: 'Under § 12a ArbGG each side bears its own legal costs at first instance, regardless of outcome. Court fees are waived entirely if the case settles. Lawyers’ fees follow the statutory RVG schedule and are calculated from the value in dispute, which is normally capped at three gross monthly salaries (§ 42 (3) GKG). Most employees have Rechtsschutzversicherung (legal-expenses insurance) covering employment matters after a 3-month waiting period.',
  },
  {
    q: 'Do I automatically get severance?',
    a: 'No. There is no statutory right to severance just because a dismissal exists. Severance is almost always the result of a settlement — because the employer wants to buy certainty, and because an invalid dismissal would mean reinstatement plus months of back pay. The rule-of-thumb anchor is 0.5 gross monthly salaries per year of service; the actually negotiated amount regularly reaches 1.0 to 1.5 monthly salaries per year, depending on the strength of the claim.',
  },
  {
    q: 'What if I accept a termination agreement instead of filing?',
    a: 'A termination agreement (Aufhebungsvertrag) usually triggers a 12-week unemployment-benefit blocking period (§ 159 I SGB III), even if a severance was paid. Filing the Kündigungsschutzklage first and letting the court record a settlement typically avoids the Sperrzeit. Never sign an Aufhebungsvertrag presented together with a dismissal letter without a lawyer’s review.',
  },
  {
    q: 'Can I keep working during the claim?',
    a: 'Legally yes — until the end of the (contested) notice period you remain employed. In practice the employer usually places you on garden leave (Freistellung). A proper garden leave counts as full working time for salary purposes; a defective one may leave you with Annahmeverzugslohn claims (default-of-acceptance wages) if the dismissal is later held invalid.',
  },
  {
    q: 'What is the Weiterbeschäftigungsanspruch?',
    a: 'If the first-instance court finds the dismissal invalid, you may have a provisional right to continued employment until the appeal is decided (BAG GS 1/84). The employer must then re-employ you despite having filed an appeal — a substantial pressure point in negotiations after a successful first-instance ruling.',
  },
];

const PROCESS_STEPS = [
  {
    n: '01',
    t: 'File within 3 weeks',
    d: 'We file the Klageschrift at the competent Arbeitsgericht. The court immediately schedules a conciliation hearing (Güteverhandlung).',
  },
  {
    n: '02',
    t: 'Güteverhandlung',
    d: 'Usually within 4–6 weeks of filing. The judge probes both sides — around 70–80 % of all cases settle here, almost always with a severance payment.',
  },
  {
    n: '03',
    t: 'Kammertermin',
    d: 'If no settlement is reached, the case proceeds to a full chamber hearing (Kammertermin), typically 3–6 months later. Evidence is taken, witnesses may be heard, judgment follows.',
  },
  {
    n: '04',
    t: 'Judgment or appeal',
    d: 'The chamber issues an enforceable judgment. Either side may appeal to the Landesarbeitsgericht within one month — the appeal is reviewed in full as to facts and law.',
  },
];

export default function UnfairDismissalClaimEn() {
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
                headline: 'Unfair-Dismissal Claim Germany (Kündigungsschutzklage)',
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
                  { '@type': 'ListItem', position: 2, name: 'Unfair-dismissal claim', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Unfair-dismissal claim (Kündigungsschutzklage)"
          title="Kündigungsschutzklage — the formal claim against a dismissal."
          lede="Within 3 weeks of receiving the dismissal you file at the competent German labour court (Arbeitsgericht). The claim is the only formal route to challenge the dismissal — and the standard path to a negotiated severance."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
          ]}
          primaryCta={{ href: '#contact', label: 'File on my behalf' }}
          secondaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
        />

        {/* Urgency banner */}
        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ Hard deadline: 3 weeks from receipt (§ 4 KSchG)
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                Miss the deadline and the dismissal is treated as valid under § 7 KSchG — even if
                it was obviously unjustified. Later admission under § 5 KSchG is granted only in
                rare exceptional cases.
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
              The Kündigungsschutzklage under{' '}
              <strong><NormLink href={NORM.kschg4}>§&nbsp;4 KSchG</NormLink></strong> is filed at
              the Arbeitsgericht of the employer’s seat or your place of work. Its formal aim is a
              declaratory ruling that the dismissal is invalid and the employment continues. In
              practice the case ends in a court-supervised settlement (Vergleich) in the first
              conciliation hearing (<em>Güteverhandlung</em>) in about <strong>70–80 %</strong> of
              all files — typically with a severance payment. If you miss the 3-week deadline, the
              dismissal is treated as valid by{' '}
              <NormLink href={NORM.kschg7}>§&nbsp;7 KSchG</NormLink> regardless of substance.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Deadline calculator */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The 3-week deadline — how it is calculated
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              The clock starts on the day you <em>receive</em> the written dismissal letter — not
              the day it was signed, dated or dropped in the post. For a dismissal placed in your
              letter-box, the day of receipt is the day on which it could normally be expected to
              be picked up (usually that same day if delivered before late afternoon).
            </p>
            <div className="p-6 bg-white border-l-4 border-gold rounded">
              <p className="text-[0.95rem] text-ink leading-relaxed mb-2">
                <strong>Worked example:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[0.95rem] text-ink-light leading-relaxed m-0">
                <li>Letter received Monday, 1 January.</li>
                <li>3-week deadline runs until <strong>Monday, 22 January</strong>, 23:59.</li>
                <li>
                  If 22 January is a Sunday or public holiday, the deadline moves to the next
                  working day.
                </li>
                <li>
                  Filing by fax or electronic filing (<em>beA</em>) counts the moment the court’s
                  server receives the document — not the moment of sending.
                </li>
              </ul>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mt-5 mb-0">
              Important: the 3-week deadline applies to <strong>every</strong> dismissal, including
              summary dismissals (<em>fristlose Kündigung</em>), redundancy dismissals and
              dismissals during probation. There is no shorter and no longer deadline for any
              variant.
            </p>
          </div>
        </section>

        {/* Process steps */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              Process at the Arbeitsgericht
            </h2>
            <ol className="grid grid-cols-4 gap-6 mt-6 list-none p-0 max-md:grid-cols-1">
              {PROCESS_STEPS.map((step) => (
                <li key={step.n} className="p-7 bg-cream border border-border-light rounded">
                  <div className="font-serif text-[1.1rem] font-bold text-gold-dark mb-2">
                    {step.n}
                  </div>
                  <h3 className="font-serif text-[1.1rem] font-bold mb-2">{step.t}</h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cost */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              What does it cost?
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              At first instance each side bears its own legal costs regardless of outcome under{' '}
              <NormLink href={NORM.arbgg12a}>§&nbsp;12a ArbGG</NormLink>. Court fees are waived
              entirely if the case settles. Lawyers’ fees follow the statutory{' '}
              <strong>RVG</strong> schedule and are calculated from the value in dispute
              (<em>Streitwert</em>), which is normally capped at three gross monthly salaries
              (§&nbsp;42 (3) GKG).
            </p>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="p-6 bg-white border border-border-light rounded">
                <h3 className="font-serif text-[1.1rem] font-bold mb-2">With Rechtsschutz</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Most employees in Germany hold a <em>Rechtsschutzversicherung</em> (legal-expenses
                  insurance) covering employment matters after a 3-month waiting period. Notify your
                  insurer <strong>immediately</strong>; cover must exist at the time the matter
                  becomes legally relevant (<em>Rechtsschutzfall</em>), typically the day of the
                  dismissal.
                </p>
              </div>
              <div className="p-6 bg-white border border-border-light rounded">
                <h3 className="font-serif text-[1.1rem] font-bold mb-2">Without insurance</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  Without insurance, ask us for a fixed-fee quote. In most cases the fee is offset
                  by the severance negotiated at the Güteverhandlung — the economic break-even is
                  usually reached in the first hearing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BAG case law */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Leading case
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              BAG — the fiction effect of § 7 KSchG
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              The Federal Labour Court has consistently held that a dismissal not challenged within
              the § 4 KSchG deadline is treated as valid by operation of § 7 KSchG — <em>even if</em>
              {' '}it would otherwise have been socially unjustified. This fiction effect
              (<em>Fiktionswirkung</em>) is near-absolute: subsequent admission under § 5 KSchG is
              granted only in narrow, strictly documented exceptional situations.
            </p>
            <BagQuote az="2 AZR 840/05" datum="21.09.2006">
              Wird die Klage nicht innerhalb der Drei-Wochen-Frist des § 4 KSchG erhoben, so gilt
              die Kündigung von Anfang an als rechtswirksam (§ 7 KSchG). Diese Fiktion erfasst alle
              Unwirksamkeitsgründe.
            </BagQuote>
            <p className="text-[0.95rem] text-ink-light leading-relaxed italic mt-5 mb-0">
              <strong>English rendering:</strong> If no claim is filed within the three-week period
              of § 4 KSchG, the dismissal is deemed valid from the outset (§ 7 KSchG). This fiction
              covers <em>all</em> grounds of invalidity.{' '}
              <a
                href={bagDejureUrl('21.09.2006', '2 AZR 840/05')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                Read the judgment on dejure.org →
              </a>
            </p>
          </div>
        </section>

        {/* Severance expectations */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              Realistic severance expectations
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              German law does not grant an automatic right to severance just because a dismissal
              exists. Severance is almost always the result of a court-supervised settlement at the
              Güteverhandlung. The rule-of-thumb anchor is{' '}
              <strong>0.5 gross monthly salaries per year of service</strong>
              {' '}(<NormLink href={NORM.kschg1a}>§&nbsp;1a KSchG</NormLink>) — the actually
              negotiated amount, however, regularly reaches 1.0 to 1.5 monthly salaries per year.
            </p>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              The negotiating leverage is driven by three factors:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Strength of the claim.</strong> A dismissal with obvious formal defects
                (missing works-council consultation, flawed social selection, § 174 BGB
                authorisation defect) commands a higher severance.
              </li>
              <li>
                <strong>Length of service.</strong> Each additional year of service is a direct
                lever on the anchor formula and increases the employer’s{' '}
                <em>Annahmeverzugslohn</em> risk if the dismissal is later held invalid.
              </li>
              <li>
                <strong>Likely alternative outcome.</strong> If reinstatement is realistically
                unattractive to both sides, the employer values certainty more highly and the
                severance multiplier rises accordingly.
              </li>
            </ul>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/dismissal', label: 'Dismissal — overview' },
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
                { href: '/en/summary-dismissal', label: 'Summary dismissal' },
                { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
                { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {l.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-8 bg-cream" id="faq">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              FAQ
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-8">
              Unfair-dismissal claim — most common questions
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
