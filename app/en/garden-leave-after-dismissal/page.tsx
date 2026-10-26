import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/garden-leave-after-dismissal/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title:
    'Garden Leave After Dismissal (Freistellung) — BAG 5 AZR 108/25 | gekuendigt-abfindung.de',
  description:
    'The German Federal Labour Court (BAG 25 March 2026, 5 AZR 108/25) voids standard garden-leave clauses in employment contracts. What this means for your company car, holiday carry-over and bargaining position.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/freistellung-nach-kuendigung/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/freistellung-nach-kuendigung/`,
    },
  },
  openGraph: {
    type: 'article',
    title: 'Garden Leave After Dismissal — BAG 5 AZR 108/25',
    description:
      'The German Federal Labour Court voids standard garden-leave clauses. Practical consequences for company car, holiday and severance.',
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'en',
  },
};

const faqs = [
  {
    q: 'Does the BAG ruling mean every garden leave after a German dismissal is invalid?',
    a: 'No. BAG 5 AZR 108/25 (25 March 2026) voided only standard-form clauses that give the employer a general right to release the employee from duty after any dismissal "irrespective of the party giving notice". The employer may still release the employee unilaterally if, in the specific case, protectable interests outweigh the right to be employed. Individually negotiated clauses — true deal-by-deal — remain valid.',
  },
  {
    q: 'Can my employer take back the company car when putting me on garden leave?',
    a: 'Not on the basis of an invalid standard clause. A company car with private-use permission is a benefit-in-kind and therefore part of remuneration. Removing it is a unilateral pay cut. Without a lawful basis for the garden leave itself, the company-car withdrawal is also unlawful — a usage-compensation claim arises. In the BAG case €510 gross per month was in dispute.',
  },
  {
    q: 'What is a "heightened interest in actual employment"?',
    a: 'The Federal Labour Court has recognised that an employee may have a special interest in continued actual employment — to preserve or acquire specialist skills, to maintain professional profile, or to protect visibility in the industry (BAG 12.09.2022 — 6 AZR 261/21; BAG 15.06.2021 — 9 AZR 217/20). Asserting this interest in writing forces the employer into a genuine interest balancing instead of relying on a boilerplate clause.',
  },
  {
    q: 'Does the ruling apply if I resigned myself?',
    a: 'Yes. In BAG 5 AZR 108/25 the claimant had resigned effective 30 November 2024. The standard clause allowed release "irrespective of which party gives notice" — that unlimited scope is what the BAG held to be an unreasonable disadvantage under § 307 (1) 1 BGB. The ruling therefore applies regardless of who issued the notice.',
  },
  {
    q: 'What is the difference between revocable and irrevocable garden leave?',
    a: 'Revocable garden leave reserves the employer\'s right to recall the employee to work. Irrevocable garden leave releases the employee definitively; outside employment is permitted and remaining holiday is credited against the release. Both variants require a lawful basis — either a valid individually negotiated clause or outweighing protectable employer interests in the specific case. A boilerplate standard clause is no longer sufficient after BAG 5 AZR 108/25.',
  },
  {
    q: 'Is my accrued holiday credited against the garden leave?',
    a: 'Only if two conditions are met: the garden leave must be irrevocable, and the employer must expressly grant the holiday within the release period. For revocable garden leave, holiday is not credited because the employee lacks free disposition of their time. If the garden leave itself is unlawful (e.g. based on an invalid standard clause), it cannot satisfy holiday entitlements either.',
  },
  {
    q: 'How does this change my severance-negotiation leverage?',
    a: 'Significantly. Many employers still use broken boilerplate clauses and are not yet aware that the standard garden-leave right has fallen. Pointing this out early in a negotiation reveals (a) a continued pay claim including the company-car value, and (b) a legal position that the employer wants to settle rather than litigate. In our practice this typically shifts settlement outcomes by one to two tenths of a monthly salary.',
  },
];

export default function GardenLeaveEn() {
  return (
    <main>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: 'Garden Leave After Dismissal in Germany — BAG 5 AZR 108/25',
                mainEntityOfPage: PAGE_URL,
                author: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
                publisher: { '@id': SEO_CONFIG.organization.id },
                inLanguage: 'en',
                articleSection: 'German employment law',
                datePublished: '2026-04-01',
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_CONFIG.baseUrl}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Garden leave after dismissal', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Garden leave after dismissal"
        title="BAG strikes down standard garden-leave clauses (5 AZR 108/25)"
        lede="The German Federal Labour Court (25 March 2026) held that boilerplate clauses granting a general right to release the employee after any dismissal unreasonably disadvantage the employee under § 307 (1) 1 BGB — and are therefore void. Practical consequences for company car, holiday carry-over and severance posture."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/garden-leave-after-dismissal', label: 'Garden leave after dismissal' },
        ]}
      />

      {/* Direct-answer block */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>German garden leave (Freistellung) is lawful only on a sound legal
              basis</strong> &mdash; a valid individually negotiated clause or outweighing
              employer interests in the specific case. The widespread{' '}
              <strong>standard-form clause</strong> that grants a blanket release right
              &bdquo;irrespective of which party gave notice&ldquo; was held void by BAG{' '}
              <strong>5 AZR 108/25</strong> (25 March 2026). Consequence: unlawful garden
              leave means the pay continues, the company car cannot be withdrawn, and
              bargaining posture improves markedly.
            </p>
          </div>
        </div>
      </section>

      {/* Case summary */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Case summary
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            BAG 25 March 2026 — 5 AZR 108/25
          </h2>
          <div className="rounded border-l-4 border-gold bg-cream p-5 mb-5">
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-2">
              <strong>Clause under review:</strong> &bdquo;After notice of termination has
              been given, irrespective of which party gave it, the employer may release the
              employee from work.&ldquo;
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
              <strong>Court holding:</strong> such a boilerplate release right unreasonably
              disadvantages the employee under § 307 (1) 1 BGB. The clause is void. The
              employer cannot rely on it to withdraw benefits-in-kind (here: a company car
              with private use valued at €510 gross per month).
            </p>
          </div>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            The decision follows a line of BAG authority that treats the right to be
            employed as a protectable interest, and standard-form derogations from it as
            disproportionate when they are not tied to a specific trigger (loss of trust,
            competition risk, concrete operational need).
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Note the breadth: the clause applied regardless of who gave notice. That
            unlimited scope was the decisive factor — a narrower clause (e.g. &bdquo;after
            an employer-issued dismissal for cause&ldquo;) may still survive the
            proportionality test.
          </p>
        </div>
      </section>

      {/* Practical consequences */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Practical consequences
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            What this means for employees and HR after a German dismissal
          </h2>
          <ul className="list-disc pl-5 text-[0.98rem] text-ink-light leading-relaxed space-y-2 mb-4">
            <li><strong>Pay continues through the notice period.</strong> Without a lawful release basis, the employer cannot stop paying. Any attempt to do so creates a pay-arrears claim.</li>
            <li><strong>Company car with private-use permission stays with the employee.</strong> Withdrawal based on an invalid clause is a unilateral pay cut — compensation claim arises.</li>
            <li><strong>Holiday is only credited if the release is irrevocable and expressly grants holiday.</strong> Many employers get this wrong.</li>
            <li><strong>Severance negotiations shift.</strong> Employees asserting the invalidity before signing a termination agreement often achieve a 10–20 % uplift.</li>
            <li><strong>HR should audit contract templates.</strong> Clauses using the &bdquo;irrespective of party&ldquo; wording should be redrafted with concrete triggers and interest balancing.</li>
          </ul>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Executives (managing directors, board members) are not covered by § 307 BGB in
            the same way, but comparable control under service-contract case law applies.
            For executive separations see our{' '}
            <Link href="/en/termination-agreement" className="text-gold-dark no-underline hover:underline">
              termination-agreement overview
            </Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            FAQ
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold leading-[1.25] mb-6">
            Frequently asked questions
          </h2>
          <ul className="list-none m-0 p-0">
            {faqs.map((f, idx) => (
              <li key={f.q} className={`py-5 ${idx === 0 ? 'border-t' : ''} border-b border-border`}>
                <h3 className="font-serif text-[1.05rem] font-semibold text-ink mb-2 leading-snug">
                  {f.q}
                </h3>
                <p className="text-[0.94rem] text-ink-muted leading-relaxed mb-0">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Legal sources */}
      <section className="py-10 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Legal basis &amp; sources
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li><strong>BAG 25.03.2026 — 5 AZR 108/25</strong> — Standard garden-leave clause void under § 307 (1) 1 BGB.</li>
              <li><strong>BAG 12.09.2022 — 6 AZR 261/21</strong> — Heightened interest in actual employment.</li>
              <li><strong>BAG 15.06.2021 — 9 AZR 217/20</strong> — Garden leave and holiday credit.</li>
              <li><a href="https://www.gesetze-im-internet.de/bgb/__307.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 307 BGB — Review of standard terms &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/burlg/__7.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 7 (4) BUrlG — Holiday pay-out on termination &rarr;</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/termination-agreement', label: 'Termination agreement' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/severance-calculator', label: 'Severance calculator' },
              { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
              { href: '/en/dismissal-during-illness', label: 'Dismissal during illness' },
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

      <ContactForm />
      <CTA />
    </main>
  );
}
