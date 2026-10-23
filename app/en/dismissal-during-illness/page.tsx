import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/dismissal-during-illness/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Dismissal During Illness in Germany — Myth and Reality | gekuendigt-abfindung.de',
  description:
    'Can a German employer dismiss an employee who is on sick leave? Yes — the sick note does not prevent dismissal. What really protects you, which deadlines apply, and when the dismissal is attackable.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigung-waehrend-krankheit/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigung-waehrend-krankheit/`,
    },
  },
  openGraph: {
    type: 'article',
    title: 'Dismissal During Illness in Germany — Myth and Reality',
    description:
      'The sick note does not protect against dismissal. What actually does, and the three-week filing deadline.',
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'en',
  },
};

const faqs = [
  {
    q: 'Can a German employer dismiss me while I am on sick leave?',
    a: 'Yes. The sick note (Arbeitsunfähigkeitsbescheinigung) does not prevent dismissal. Being on sick leave is not an obstacle to the dismissal reaching you or taking effect. The dismissal is void only if it lacks a lawful ground, breaches formal requirements (§ 623 BGB) or violates special protection (pregnancy, severe disability, works-council member).',
  },
  {
    q: 'Does the dismissal reach me if I am in hospital?',
    a: 'Yes. A written dismissal reaches you (Zugang) as soon as it is placed in your letterbox at a time when a prudent recipient would be expected to empty it. A hospital stay does not block that. Practical advice: ask a trusted person to check your mail during longer absences so you do not accidentally miss the three-week filing deadline under § 4 KSchG.',
  },
  {
    q: 'Must I tell my employer which illness I have?',
    a: 'No. The sick note tells the employer only that you are unfit for work and until when. You are not obliged to disclose the diagnosis. In litigation it can sometimes help to disclose the medical facts to rebut a negative-prognosis argument, but that is a strategic decision — not a legal obligation.',
  },
  {
    q: 'How many sick days are "too many"?',
    a: 'There is no fixed threshold. In practice courts look at absences of six weeks or more per year sustained over several years as an indicator for the first stage of the three-stage test. Whether a dismissal survives the test depends on prognosis, operational burden on the employer and the overall interest balancing (Interessenabwägung).',
  },
  {
    q: 'Does the protection apply during probation?',
    a: 'During the first six months the Dismissal Protection Act (KSchG) does not apply. The employer does not need a reason to dismiss and can also do so while an employee is sick. The dismissal must still not be immoral (§ 138 BGB) or discriminatory (AGG), and formal requirements (§ 623 BGB) still apply.',
  },
  {
    q: 'Do I get severance if I am dismissed due to illness?',
    a: 'There is no automatic statutory right. Because illness-based dismissals are hard to justify, however, many cases end in a settlement with severance — typically 0.5× to 1.5× monthly gross × years of service. The precondition is almost always a timely filing within the three-week window (§ 4 KSchG).',
  },
  {
    q: 'What happens to my holiday if I am ill for a long time?',
    a: 'Holiday you could not take due to illness does not immediately expire. On termination of the employment, untaken holiday must be paid out (§ 7 (4) BUrlG). For very long illnesses the holiday from year n expires on 31 March of year n+2 at the latest (BAG following CJEU case law).',
  },
];

export default function DismissalDuringIllnessEn() {
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
                headline: 'Dismissal During Illness in Germany — Myth and Reality',
                mainEntityOfPage: PAGE_URL,
                author: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
                publisher: { '@id': SEO_CONFIG.organization.id },
                inLanguage: 'en',
                articleSection: 'German employment law',
                datePublished: '2026-10-04',
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
                  { '@type': 'ListItem', position: 2, name: 'Dismissal during illness', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Dismissal during illness"
        title="Can a German employer dismiss me while I am sick? — Myth vs. reality"
        lede="The widely held belief that a sick note protects against dismissal is wrong. German employers can and do dismiss during sick leave. What matters is whether the dismissal has a lawful ground, meets formal requirements, and the three-week filing window is used."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/dismissal-during-illness', label: 'Dismissal during illness' },
        ]}
      />

      {/* Direct-answer block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Yes — a German employer can dismiss you while you are on sick leave.</strong>{' '}
              The sick note (Arbeitsunfähigkeitsbescheinigung) does not create immunity. What
              matters is: did the dismissal meet the written-form requirement (§ 623 BGB)?
              Does the KSchG apply (more than 6 months tenure, more than 10 employees under
              § 23 KSchG)? Was the works council heard (§ 102 BetrVG)? Did you file an
              unfair-dismissal claim within three weeks (§ 4 KSchG)? Illness-based dismissal
              as a substantive reason follows the strict three-stage test of the BAG and
              rarely survives in practice.
            </p>
          </div>
        </div>
      </section>

      {/* The myth */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            The myth
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            &bdquo;Sick note = untouchable&ldquo; is wrong
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            A very common misconception, repeated in HR break rooms and online forums alike:
            while you hold a current sick note, the employer cannot dismiss you. German
            employment law contains no such rule. The sick leave suspends the duty to work
            (and triggers continued-pay rights under § 3 EFZG), but it does not suspend the
            employer&rsquo;s right to end the employment.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            What is true is that <strong>illness-based dismissal is substantively hard to
            justify</strong> &mdash; the Federal Labour Court (BAG) applies a strict
            three-stage test and employers lose a high proportion of these cases. But that
            is the <em>substance</em> of the dismissal in court; it does not stop the letter
            from being delivered or from being effective if left unchallenged.
          </p>
        </div>
      </section>

      {/* The three-stage test */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Substantive test
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            The BAG three-stage test for illness-based dismissal
          </h2>
          <ol className="list-decimal pl-6 text-[0.98rem] text-ink-light leading-relaxed space-y-3 mb-4">
            <li>
              <strong>Negative health prognosis.</strong> At the time of dismissal, continued
              or recurring incapacity for work must be objectively foreseeable. Past absence
              alone is not enough; the employer must show the pattern is likely to continue.
            </li>
            <li>
              <strong>Substantial operational burden.</strong> The absences must impair
              operations or impose significant continued-pay costs (typically more than six
              weeks per year sustained over multiple years).
            </li>
            <li>
              <strong>Interests balanced in favour of the employer.</strong> Length of
              service, age, dependants, cause of illness, workplace-related triggers,
              availability of a cured or lighter-duty workplace all enter the balance. The
              employer must have attempted the statutory <strong>betriebliches
              Eingliederungsmanagement (BEM, § 167 (2) SGB IX)</strong>; omitting it
              dramatically weakens the employer&rsquo;s position.
            </li>
          </ol>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            In practice, cases that fail even one of these three stages regularly end in a
            settlement with above-formula severance.
          </p>
        </div>
      </section>

      {/* What actually protects */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            What really protects
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            Real protection categories under German law
          </h2>
          <ul className="list-disc pl-5 text-[0.98rem] text-ink-light leading-relaxed space-y-2 mb-4">
            <li><strong>Pregnancy and up to 4 months post-delivery</strong> &mdash; § 17 MuSchG, dismissal requires prior administrative consent.</li>
            <li><strong>Parental leave</strong> &mdash; § 18 BEEG, same consent regime.</li>
            <li><strong>Severe disability (Grad der Behinderung ≥ 50)</strong> &mdash; § 168 SGB IX, prior consent of the Integrationsamt required.</li>
            <li><strong>Works-council membership</strong> &mdash; § 15 KSchG, ordinary dismissal excluded during term + 1 year.</li>
            <li><strong>Written-form requirement</strong> &mdash; § 623 BGB applies regardless of illness.</li>
            <li><strong>Works-council hearing</strong> &mdash; § 102 BetrVG, missing hearing = void dismissal.</li>
          </ul>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Illness itself is not on this list &mdash; which is precisely why the myth is so
            dangerous: employees relying on the sick note do not act in time, miss the
            three-week deadline, and lose cases that would have been winnable on the
            substantive illness test.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-cream">
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
      <section className="py-10 px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Legal basis &amp; sources
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li><a href="https://www.gesetze-im-internet.de/kschg/__1.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 1 KSchG — Social justification &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 4 KSchG — Three-week filing deadline &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/sgb_9_2018/__167.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 167 (2) SGB IX — betriebliches Eingliederungsmanagement (BEM) &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/sgb_9_2018/__168.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 168 SGB IX — Dismissal of severely disabled employees &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/muschg_2018/__17.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 17 MuSchG — Dismissal during pregnancy &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/efzg/__3.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 3 EFZG — Continued pay during illness &rarr;</a></li>
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
              { href: '/en/check-dismissal', label: 'Check your dismissal' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/notice-period-calculator', label: 'Notice-period calculator' },
              { href: '/en/severance-calculator', label: 'Severance calculator' },
              { href: '/en/termination-agreement', label: 'Termination agreement' },
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
