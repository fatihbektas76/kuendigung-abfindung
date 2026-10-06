import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/summary-dismissal/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Summary Dismissal (Fristlose Kündigung) in Germany ${new Date().getFullYear()} — Defence & Severance`,
  description:
    'Summary dismissal (fristlose Kündigung) under § 626 BGB: when it is valid, how to defend it, and why severance is often particularly high in these cases.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/fristlose-kuendigung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/fristlose-kuendigung/`,
    },
  },
  openGraph: {
    title: 'Summary Dismissal (Fristlose Kündigung) — Defence & Severance',
    description:
      'Summary dismissal under § 626 BGB. How to defend it, severance prospects. Reviewed by a German employment-law specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'What counts as a summary (without-notice) dismissal in Germany?',
    a: 'A summary dismissal (fristlose Kündigung) under § 626 BGB ends the employment immediately without observing any notice period. It requires a serious cause that makes it unreasonable for the employer to continue the relationship even until the end of the notice period — a very high hurdle.',
  },
  {
    q: 'What is the 2-week rule?',
    a: 'Under § 626 II BGB the employer must declare the summary dismissal within 2 weeks of obtaining full knowledge of the cause. If the deadline is missed the summary dismissal is invalid — a frequent winning argument in court.',
  },
  {
    q: 'Do I get severance after a summary dismissal?',
    a: 'There is no automatic severance, but in practice summary dismissals very often settle with substantial severance, precisely because they so frequently fail in court. Settlements are commonly higher than after an ordinary dismissal because the employer faces a strong risk of complete invalidity.',
  },
  {
    q: 'Does the employer have to warn me first?',
    a: 'Usually yes. For most conduct, a prior Abmahnung is required so you had a chance to correct the behaviour. Only in cases of fundamental breach of trust (theft, fraud, violence) can a summary dismissal be valid without a prior warning.',
  },
  {
    q: 'What about unemployment benefit?',
    a: 'A summary dismissal regularly triggers a 12-week Sperrzeit under § 159 I SGB III. Challenging the dismissal is therefore not only about reinstatement / severance — it also protects your access to unemployment benefit, because a settlement converting the summary dismissal to an ordinary one usually removes the Sperrzeit. The maximum entitlement period is additionally shortened by a quarter if the Sperrzeit stands.',
  },
  {
    q: 'How is severance calculated after a summary dismissal?',
    a: 'There is no statutory formula. Settlements regularly land between 0.5 and 1.5 gross monthly salaries per year of service, often higher where the summary dismissal has weak evidential foundation, where the 2-week deadline is in doubt or where no Abmahnung preceded the dismissal. The weaker the employer’s case, the stronger the employee’s negotiating position — in some cases far above the 0.5× anchor used for ordinary redundancy dismissals.',
  },
  {
    q: 'What if the dismissal letter is signed only by the Personalleiter?',
    a: 'The signatory must have power of attorney to dismiss. If the HR manager (Personalleiter) signs without written authority and did not visibly notify you of their power before, you may reject the dismissal without delay under § 174 BGB — meaning within about a week. If accepted, this makes the dismissal invalid for formal reasons alone.',
  },
];

export default function SummaryDismissalEn() {
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
                headline: 'Summary Dismissal (Fristlose Kündigung) — Defence & Severance',
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
          eyebrow="Summary dismissal (fristlose Kündigung)"
          title="Summary dismissal under § 626 BGB — almost always defensible."
          lede="A summary dismissal ends your employment immediately and triggers a 12-week unemployment-benefit blocking period. Most summary dismissals fail the strict § 626 BGB test — and settle with substantial severance."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/summary-dismissal', label: 'Summary dismissal' },
          ]}
          primaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Urgency banner */}
        <section className="py-6 px-8 bg-[#1f2937] text-white">
          <div className="max-w-content mx-auto flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-[0.95rem] font-semibold m-0">
                ⚠ Same 3-week filing deadline applies (§ 4 KSchG)
              </p>
              <p className="text-[0.85rem] text-white/70 m-0 mt-1">
                A summary dismissal must be challenged within 3 weeks of receipt — even when the
                ground is plainly weak.
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
              A summary dismissal under{' '}
              <strong><NormLink href={NORM.bgb626}>§&nbsp;626 BGB</NormLink></strong> requires a{' '}
              <em>wichtiger Grund</em> — a cause so serious that continuing the employment even
              for the notice period is unreasonable. The bar is extremely high. The employer must
              additionally act within <strong>2 weeks</strong> of obtaining knowledge of the cause
              (<NormLink href={NORM.bgb626}>§&nbsp;626 II BGB</NormLink>), usually issue an
              Abmahnung first, and prove the cause in court if challenged. In practice the great
              majority of summary dismissals fail and settle with severance materially above the
              standard 0.5×-per-year formula.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* Two-step test */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The two-step test under § 626 BGB
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              German labour courts review every summary dismissal in two strictly separate steps.
              The employer must survive <strong>both</strong>. If either step fails, the summary
              dismissal is invalid — and the employment relationship continues as if the dismissal
              had never been issued.
            </p>
            <ol className="list-decimal pl-6 space-y-5 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong className="text-ink">Abstract capability (Step 1):</strong>{' '}
                Is the alleged conduct, considered in the abstract, in principle capable of
                justifying summary dismissal? Examples that pass this threshold: theft, assault,
                serious fraud, continued refusal to work after warning. Examples that fail already
                here: a single minor incident, isolated tardiness, a tone-of-voice complaint.
              </li>
              <li>
                <strong className="text-ink">Interessenabwägung (Step 2):</strong>{' '}
                Even if Step&nbsp;1 is passed, a comprehensive balancing of interests must find in
                the employer’s favour. Factors: duration of employment, prior conduct, personal
                circumstances, whether an Abmahnung would have sufficed, and the realistic prospect
                of continued cooperation. Long tenure and a clean record tilt the scale strongly in
                the employee’s favour.
              </li>
            </ol>
          </div>
        </section>

        {/* BAG case law */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Leading case
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              BAG 10 October 2002 — the <em>Emmely</em> framework
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-6">
              In the <em>Emmely</em> line of cases the Federal Labour Court made clear that
              Abmahnung is the rule even for property offences at the employer’s expense, provided
              the breach is <em>reparable</em> in the sense that future conduct can realistically
              be restored to the standard required by the contract. A long and unblemished
              employment relationship is a strong factor in the employee’s favour.
            </p>
            <BagQuote az="2 AZR 541/09" datum="10.06.2010">
              Auch bei Vermögensdelikten zu Lasten des Arbeitgebers ist eine Abmahnung nicht
              entbehrlich, wenn das pflichtwidrige Verhalten steuerbar und eine Wiederherstellung
              des Vertrauens erwartbar ist.
            </BagQuote>
            <p className="text-[0.95rem] text-ink-light leading-relaxed italic mt-5 mb-0">
              <strong>English rendering:</strong> Even in property offences committed to the
              employer’s disadvantage, a prior warning is <em>not</em> dispensable where the
              breach is controllable and restoration of trust can realistically be expected.{' '}
              <a
                href={bagDejureUrl('10.06.2010', '2 AZR 541/09')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                Read the judgment on dejure.org →
              </a>
            </p>
          </div>
        </section>

        {/* When is § 626 valid */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              When does § 626 BGB actually apply?
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="p-7 bg-white border-l-4 border-red-500 rounded">
                <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                  Possible serious grounds
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                  <li>Theft, embezzlement, fraud at the employer’s expense</li>
                  <li>Violence or serious harassment at work</li>
                  <li>Repeated unauthorised absence after warnings</li>
                  <li>Severe breach of trust (e.g. trade-secret leaks)</li>
                  <li>Insulting the employer on a public scale</li>
                </ul>
              </div>
              <div className="p-7 bg-white border-l-4 border-green rounded">
                <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                  Routine reasons summary dismissals fail
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                  <li>2-week deadline (<NormLink href={NORM.bgb626}>§&nbsp;626 II BGB</NormLink>) missed</li>
                  <li>No prior Abmahnung where one was required</li>
                  <li>Cause is contested and the employer cannot prove it</li>
                  <li>Disproportionate to the breach</li>
                  <li>No works-council consultation (<NormLink href={NORM.betrvg102}>§&nbsp;102 BetrVG</NormLink>)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sperrzeit / unemployment */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-5">
              The hidden cost: 12-week unemployment-benefit blocking period
            </h2>
            <p className="text-[1rem] text-ink-light leading-relaxed mb-5">
              A summary dismissal has a second financial consequence that is often more painful
              than the dismissal itself: the Federal Employment Agency (Bundesagentur für Arbeit)
              as a rule imposes a <strong>12-week Sperrzeit</strong>
              {' '}(<NormLink href={NORM.sgb3159}>§&nbsp;159 I SGB III</NormLink>), during which no
              unemployment benefit is paid. The maximum entitlement is additionally shortened by a
              quarter.
            </p>
            <div className="p-6 bg-cream border-l-4 border-gold rounded">
              <p className="text-[0.95rem] text-ink leading-relaxed mb-2">
                <strong>Example — Sperrzeit arithmetic:</strong>
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                Monthly ALG&nbsp;I entitlement €2,100 · 12-week Sperrzeit · 3 months without
                benefit = <strong>−€6,300</strong>. On top of that, the entitlement period is
                shortened by a quarter — a further loss that scales with how long you have
                contributed to unemployment insurance.
              </p>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mt-5 mb-0">
              A successful court settlement that converts the summary dismissal into an{' '}
              <em>ordinary</em> dismissal removes the Sperrzeit in most cases — a core strategic
              reason to challenge every summary dismissal that is not plainly justified.
            </p>
          </div>
        </section>

        {/* What to do */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              What to do in the first 24 hours
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed">
              <li>Note the exact date and time of receipt — the 3-week clock starts here.</li>
              <li>Do not sign anything the employer puts in front of you.</li>
              <li>
                Send us a copy of the dismissal letter — a German employment-law specialist
                reviews it for free within 48 hours.
              </li>
              <li>
                Register as job-seeker (arbeitsuchend) within 3 days to preserve benefit
                entitlement.
              </li>
              <li>
                If you have legal-expenses insurance, notify your provider now so cover is in
                place when we file.
              </li>
            </ol>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/dismissal', label: 'Dismissal — overview' },
                { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/written-warning', label: 'Written warning (Abmahnung)' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
                { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {link.label} &rarr;
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
              Summary dismissal — most common questions
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
