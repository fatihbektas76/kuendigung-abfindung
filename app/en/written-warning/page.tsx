import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/written-warning/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Written Warning (Abmahnung) in Germany ${new Date().getFullYear()} — Rights & Removal`,
  description:
    'Received a written warning (Abmahnung) in Germany? When it is valid, when to object, and how to get it removed from your personnel file. Free review by a specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/abmahnung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/abmahnung/`,
    },
  },
  openGraph: {
    title: 'Written Warning (Abmahnung) — Rights & Removal',
    description:
      'Received a written warning in Germany? Reviewed by a German employment-law specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'What is a written warning (Abmahnung) under German law?',
    a: 'An Abmahnung is a formal, written notice from the employer that a specific behaviour breached your contractual duties and that repetition will lead to dismissal. It serves three functions: documentation, an obligation to perform correctly going forward, and a warning of dismissal. A valid Abmahnung is usually a precondition for a later conduct-related dismissal.',
  },
  {
    q: 'Do I have to sign the warning?',
    a: 'No. Signing only confirms receipt but is often misread as acceptance. A common, cleaner approach is to acknowledge receipt with the date but explicitly add “sachliche Anerkennung wird nicht erklärt” (no substantive acceptance). The best step is usually a written counter-statement filed in your personnel file.',
  },
  {
    q: 'Can I have the warning removed from my personnel file?',
    a: 'Yes. You can demand removal of an unjustified, factually wrong, vague or disproportionate Abmahnung (§ 1004 BGB analog). If the employer refuses, a removal claim before the Arbeitsgericht is a routinely successful route. Removal is particularly useful if the warning could feed into a later dismissal.',
  },
  {
    q: 'How many warnings before a dismissal?',
    a: 'There is no fixed number. Case law usually requires at least one Abmahnung for the same type of misconduct before a conduct-related dismissal, but a single warning can be enough if the breach is serious. For minor breaches more warnings may be required. In exceptional cases (theft, fundamental breach of trust) a dismissal may be valid without any Abmahnung.',
  },
  {
    q: 'When does a warning lose its effect?',
    a: 'There is no formal expiry, but case law accepts that warnings lose their warning-function over time. After roughly 2–3 years a stale Abmahnung normally cannot be used as the basis for a conduct dismissal. The employer would need a fresh warning. BAG 10 October 2002 — 2 AZR 418/01 — confirms this timeline for standard breaches.',
  },
  {
    q: 'What is the difference between Ermahnung and Abmahnung?',
    a: 'An Ermahnung is a lighter rebuke without a warning of dismissal — it merely reminds you that a specific behaviour is undesired. An Abmahnung, by contrast, must contain the explicit threat that repetition will trigger consequences for the employment relationship, including dismissal. Only the Abmahnung carries the full warning function required before a conduct-based dismissal.',
  },
  {
    q: 'Can a warning be issued verbally?',
    a: 'Yes, in principle. German law does not require a written form (§ 125 BGB does not apply). But a verbal Abmahnung is almost impossible for the employer to prove in court — which is why serious cases are always issued in writing. If you are warned verbally, note down the exact wording, time, place and witnesses immediately.',
  },
  {
    q: 'Does the works council have a say?',
    a: 'The works council has no veto over the issuance of an Abmahnung (unlike dismissals under § 102 BetrVG). You do, however, have a statutory right under § 83 BetrVG to view your personnel file in the presence of a works-council member, and to request that a counter-statement be added.',
  },
];

export default function WrittenWarningEn() {
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
                headline: 'Written Warning (Abmahnung) — Rights & Removal',
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
            ],
          }),
        }}
      />

      <main>
        <TopicHero
          eyebrow="Written warning (Abmahnung)"
          title="Received a written warning? It is often the prelude to a dismissal."
          lede="A written warning is documentation that the employer will later use to justify a conduct-based dismissal. If the warning is factually wrong, vague or disproportionate, we get it removed from your personnel file before it can be used against you."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/written-warning', label: 'Written warning' },
          ]}
          primaryCta={{ href: '/en/check-written-warning', label: 'Check my warning' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              A valid Abmahnung in Germany must (1) describe one concrete breach of duty with date
              and detail, (2) demand specific corrective behaviour, and (3) expressly threaten
              dismissal on repetition. Vague accusations, collective warnings or warnings without
              a clear behavioural demand are normally invalid and can be removed from your
              personnel file. Removal is grounded in{' '}
              <strong>
                <NormLink href={NORM.bgb242}>§&nbsp;242</NormLink>,{' '}
                <a href="https://dejure.org/gesetze/BGB/1004.html" target="_blank" rel="noopener noreferrer" className="text-gold-dark no-underline hover:underline">
                  §&nbsp;1004 BGB
                </a>
              </strong>{' '}
              analog. Where the Abmahnung is groundless, fight it now — before it can feed a
              conduct-based dismissal.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* The three functions */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The three functions a valid Abmahnung must fulfil
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              German labour courts review every warning against three functions. The warning must
              satisfy <strong>all three</strong>. A warning that misses any one of them is
              invalid — and can be removed from your personnel file.
            </p>
            <ol className="list-decimal pl-6 space-y-5 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong className="text-ink">Documentation (Dokumentationsfunktion).</strong>{' '}
                The warning must describe <em>one</em> specific breach with date, time, place and
                concrete factual detail. Collective warnings or vague references to
                &ldquo;repeated misconduct&rdquo; fail this requirement.
              </li>
              <li>
                <strong className="text-ink">Instruction (Rügefunktion).</strong>{' '}
                The warning must label the described behaviour as a breach of contractual duty and
                demand corrective behaviour for the future. Simple information or a neutral
                enquiry is not enough.
              </li>
              <li>
                <strong className="text-ink">Warning (Warnfunktion).</strong>{' '}
                The warning must expressly state that repetition will trigger consequences for the
                employment relationship, including dismissal. Without this explicit threat, the
                warning cannot ground a later conduct-based dismissal.
              </li>
            </ol>
          </div>
        </section>

        {/* When is it invalid */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              When is a written warning invalid?
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {[
                {
                  t: 'Vague accusation',
                  d: 'No concrete date, no specific behaviour, only generalisations like “you have repeatedly underperformed”. Without specificity the warning fails.',
                },
                {
                  t: 'Wrong facts',
                  d: 'The incident did not happen as described, you were not the cause, or the timeline is wrong. Removal claim is straightforward.',
                },
                {
                  t: 'No warning of dismissal',
                  d: 'Without an explicit threat of consequences for the employment relationship, the warning has no warning function and cannot ground a later dismissal.',
                },
                {
                  t: 'Disproportionate',
                  d: 'A minor breach — a single late arrival, a minor mistake — does not justify the heavy artillery of an Abmahnung if a verbal Ermahnung would have sufficed.',
                },
                {
                  t: 'Statute of limitations',
                  d: 'Warning issued for an incident long past or based on stale events the employer tolerated for months.',
                },
                {
                  t: 'Wrong signatory',
                  d: 'Issued by a person without HR authority — challengeable under § 174 BGB if rejected without delay.',
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

        {/* BAG case law */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Leading case
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              BAG 10 October 2002 — warnings lose their effect over time
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              The Federal Labour Court has clarified that a warning has no fixed expiry date but
              loses its warning-function as time passes without repeated misconduct. The exact
              timeline depends on the severity of the breach — for standard breaches, roughly two
              to three years is the accepted outer limit. The practical consequence: a conduct
              dismissal based on an old warning rarely survives in court.
            </p>
            <BagQuote az="2 AZR 418/01" datum="10.10.2002">
              Eine Abmahnung verliert ihre Warnfunktion, wenn der Arbeitnehmer über längere Zeit
              beanstandungsfrei gearbeitet hat. Die Dauer bemisst sich nach Schwere und Häufigkeit
              der Pflichtverletzung.
            </BagQuote>
            <p className="text-[0.95rem] text-ink-light leading-relaxed italic mt-5 mb-0">
              <strong>English rendering:</strong> A written warning loses its warning-function once
              the employee has performed without complaint over an extended period. The duration
              is measured by the severity and frequency of the breach.{' '}
              <a
                href={bagDejureUrl('10.10.2002', '2 AZR 418/01')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                Read the judgment on dejure.org →
              </a>
            </p>
          </div>
        </section>

        {/* What to do */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              Your three options
            </h2>
            <ol className="list-decimal pl-6 space-y-4 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Counter-statement (Gegendarstellung).</strong> File a written rebuttal that
                goes into your personnel file alongside the warning. Low-conflict, immediate, and
                preserves your position.
              </li>
              <li>
                <strong>Removal demand.</strong> Demand in writing that the employer remove the
                Abmahnung from your personnel file within a set deadline (typically 2 weeks).
              </li>
              <li>
                <strong>Court action.</strong> If the employer refuses, file a removal claim before
                the Arbeitsgericht. Worth it especially where the warning could later trigger a
                conduct-related dismissal.
              </li>
            </ol>
          </div>
        </section>

        {/* Personnel-file viewing rights */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              Your statutory right to view the personnel file
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              Independent of any dispute, you have a statutory right under{' '}
              <NormLink href={NORM.betrvg83}>§&nbsp;83 BetrVG</NormLink> to view your personnel
              file. The employer must grant access on request and may not delay without good
              cause. You may also:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>Bring a works-council member to the viewing session.</li>
              <li>Request copies of any documents, including every Abmahnung on file.</li>
              <li>
                Have a written counter-statement (<em>Gegendarstellung</em>) added to the file,
                which the employer must preserve alongside the original document.
              </li>
              <li>
                Request removal of entries that are factually wrong, no longer relevant or
                otherwise unlawful — the removal demand is the first step before any court
                action.
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
                { href: '/en/check-written-warning', label: 'Check my written warning' },
                { href: '/en/dismissal', label: 'Dismissal' },
                { href: '/en/summary-dismissal', label: 'Summary dismissal' },
                { href: '/en/guides/templates', label: 'Templates' },
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-5 border border-border-light rounded bg-cream text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {link.label} &rarr;
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
              Written warning — most common questions
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
