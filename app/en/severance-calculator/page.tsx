'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';

function formatEur(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

const BASE = 'https://www.gekuendigt-abfindung.de';

const faqs = [
  {
    q: 'How accurate is the severance calculator?',
    a: 'The calculator applies the standard German half-month rule (0.5 gross monthly salary × years of service) that courts and employers use as a starting point. The actual settlement depends on individual factors — formal defects in the dismissal letter, flawed social selection (§ 1 (3) KSchG), special protection (pregnancy, severe disability) and bargaining posture. For a binding assessment, consult a specialist attorney for German employment law.',
  },
  {
    q: 'Is the severance figure gross or net?',
    a: 'The calculated figure is gross. German severance payments are subject to income tax but exempt from social-security contributions. The Fünftelregelung (one-fifth rule under § 34 EStG) spreads the tax burden over five years and can substantially reduce the effective tax rate — a competent payroll setup is important to realise that benefit.',
  },
  {
    q: 'When do I get more than the standard factor of 0.5?',
    a: 'Factors above 0.5× are realistic when the dismissal is attackable: formal defects (missing works-council hearing § 102 BetrVG, § 623 BGB written-form breach), flawed social selection, special protection (pregnancy, severe disability, works-council members), long tenure or advanced age. In those cases factors of 1.0× to 1.5× — and sometimes above — are negotiated.',
  },
  {
    q: 'Do I need to file a Kündigungsschutzklage to get severance?',
    a: 'In most cases yes. German law does not grant a statutory right to severance except in narrow cases under § 1a KSchG. Negotiating leverage arises almost exclusively from filing an unfair-dismissal claim within the three-week filing deadline (§ 4 KSchG). Without that leverage, employers typically do not pay above-formula severance.',
  },
  {
    q: 'How is partial years of service counted?',
    a: 'Following settled German labour-court practice, incomplete years of six months or more are rounded up. A tenure of 4 years and 7 months is calculated as 5 years for severance purposes. Months below six are not counted.',
  },
];

export default function SeveranceCalculatorEn() {
  const [salary, setSalary] = useState(3500);
  const [years, setYears] = useState(5);
  const [factor, setFactor] = useState(0.5);

  const result = useMemo(() => Math.round(salary * factor * years), [salary, years, factor]);
  const lowEnd = useMemo(() => Math.round(salary * 0.25 * years), [salary, years]);
  const highEnd = useMemo(() => Math.round(salary * 1.5 * years), [salary, years]);

  return (
    <main>
      {/* Schema.org — FAQPage + HowTo + WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'German Severance Calculator (English)',
                url: `${BASE}/en/severance-calculator/`,
                applicationCategory: 'LegalTool',
                operatingSystem: 'Any',
                inLanguage: 'en',
                description:
                  'Free severance estimator based on the German half-month rule (§ 1a KSchG). Three sliders (gross monthly salary, years of service, negotiation factor) plus a realistic settlement range.',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
                isBasedOn: [
                  { '@type': 'CreativeWork', name: '§ 1a KSchG — statutory severance', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
                  { '@type': 'CreativeWork', name: '§ 10 KSchG — severance amount', url: 'https://www.gesetze-im-internet.de/kschg/__10.html' },
                  { '@type': 'CreativeWork', name: '§ 34 EStG — one-fifth rule', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
                ],
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
                '@type': 'HowTo',
                name: 'How to estimate your German severance',
                description: 'Estimate your severance in three steps using the German half-month rule.',
                step: [
                  { '@type': 'HowToStep', position: 1, name: 'Enter gross monthly salary', text: 'Use your current gross monthly salary in Euro. If you have variable pay, use the 12-month average.' },
                  { '@type': 'HowToStep', position: 2, name: 'Enter years of service', text: 'Enter completed years of employment. Partial years of ≥6 months are rounded up by German labour-court practice.' },
                  { '@type': 'HowToStep', position: 3, name: 'Pick a negotiation factor', text: 'Factor 0.5× is the baseline. Choose 1.0× to 1.5× if the dismissal is attackable (formal defects, special protection, flawed social selection).' },
                ],
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/en/tools/` },
                  { '@type': 'ListItem', position: 3, name: 'Severance calculator', item: `${BASE}/en/severance-calculator/` },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Severance calculator"
        title="Estimate your German severance"
        lede="Free online estimator based on the German half-month rule (§ 1a KSchG). For a binding assessment, send us your dismissal letter — we provide a tailored review free of charge."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/severance-calculator', label: 'Severance calculator' },
        ]}
      />

      {/* Direct-answer block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>German severance is not a statutory entitlement in general</strong> — it is
              negotiated once an unfair-dismissal claim has been filed (3-week deadline under{' '}
              § 4 KSchG). The standard baseline formula is{' '}
              <strong>0.5 × gross monthly salary × completed years of service</strong>, derived
              from § 1a KSchG. In practice settlements range from 0.25× (weak case) to 1.5× or
              more (strong leverage).
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
            <div>
              <label className="block text-[0.9rem] font-semibold text-ink mb-2">
                Gross monthly salary: {formatEur(salary)}
              </label>
              <input
                type="range"
                min={1500}
                max={20000}
                step={500}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />

              <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
                Years of service: {years}
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />

              <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
                Negotiation factor: {factor.toFixed(2)}×
              </label>
              <input
                type="range"
                min={0.25}
                max={1.5}
                step={0.05}
                value={factor}
                onChange={(e) => setFactor(Number(e.target.value))}
                className="w-full accent-gold-dark"
              />
              <p className="text-[0.8rem] text-ink-muted mt-2">
                0.25× = weak case · 0.5× = statutory baseline · 1.0–1.5× = strong leverage.
              </p>
            </div>

            <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-4">
              <div>
                <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                  Estimated severance
                </div>
                <div className="font-serif text-[2.6rem] font-extrabold text-ink leading-none">
                  {formatEur(result)}
                </div>
              </div>
              <div className="border-t border-border-light pt-4">
                <div className="text-[0.78rem] text-ink-muted uppercase tracking-wider mb-1">
                  Realistic settlement range
                </div>
                <div className="text-[0.95rem] text-ink font-semibold">
                  {formatEur(lowEnd)} – {formatEur(highEnd)}
                </div>
                <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                  Range is based on factors of 0.25× to 1.5× per year of service.
                </p>
              </div>
              <Link
                href="#contact"
                className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5"
              >
                Get a tailored review &rarr;
              </Link>
            </div>
          </div>

          <div className="mt-10 p-6 bg-cream border-l-4 border-gold rounded">
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              <strong>Disclaimer:</strong> all figures are non-binding estimates based on the
              German half-month rule. Actual severance depends on flaws in the dismissal letter,
              special protection (pregnancy, severe disability, works council), social selection
              and the bargaining posture of both sides. This calculator does not constitute legal
              advice.
            </p>
          </div>
        </div>
      </section>

      {/* How is severance calculated? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Background
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              How is German severance calculated?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              The standard formula is{' '}
              <strong>0.5 × gross monthly salary × completed years of service</strong>. The
              formula is derived from § 1a KSchG, which allows an employer to offer severance
              on this basis in exchange for the employee waiving an unfair-dismissal claim.
              Beyond that specific statute, there is <strong>no general statutory right to
              severance</strong> in German employment law.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              In practice, settlement factors range from 0.25× (weak case) to 1.5× (strong
              leverage) per year of service. The actual factor depends on how attackable the
              dismissal is in the three-week court window after receipt (§ 4 KSchG).
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Partial years of six months or more are rounded up by settled labour-court
              practice. Regularly paid bonuses (Weihnachtsgeld, Urlaubsgeld) are included
              pro-rata in the gross monthly salary.
            </p>
          </div>
        </div>
      </section>

      {/* When is a higher factor realistic? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Negotiation leverage
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              When do I get a higher factor?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              The severance amount is a negotiation outcome &mdash; and your leverage depends
              on how attackable the dismissal is. Formal defects such as{' '}
              <strong>missing works-council hearing</strong> (§ 102 BetrVG), breach of the{' '}
              <strong>written-form requirement</strong> (§ 623 BGB) or <strong>flawed social
              selection</strong> (§ 1 (3) KSchG) significantly raise the factor.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Special protection &mdash; pregnancy (§ 17 MuSchG), severe disability (§ 168 SGB
              IX), parental leave (§ 18 BEEG), works-council membership (§ 15 KSchG) &mdash;
              often makes the dismissal void from the outset and leads to substantially higher
              severance offers.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Long tenure combined with advanced age signals weaker re-employment prospects.
              German labour courts and employers factor this into severance negotiations.
              The rule of thumb: the weaker the dismissal, the higher the severance.
            </p>
          </div>
        </div>
      </section>

      {/* When should I retain a lawyer? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Practice note
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              When should I engage a specialist attorney?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              You have exactly <strong>three weeks</strong> from receipt of the dismissal to
              file an unfair-dismissal claim at the competent labour court (§ 4 KSchG). Miss
              that deadline and the dismissal is treated as valid — regardless of how flawed
              it was. Negotiating room for severance almost always arises only through filing
              that claim.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              A specialist attorney for employment law (Fachanwalt für Arbeitsrecht) knows the
              industry-typical factors, spots formal defects, and can judge whether a factor
              above 0.5× is realistic. In many cases the attorney&apos;s fee is covered many
              times over by the higher severance that is negotiated.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              If you hold a legal-expenses insurance with employment-law cover, the policy
              typically pays all attorney and court costs. Even without insurance, a{' '}
              <Link href="/en/check-dismissal/" className="text-gold no-underline hover:underline">
                free initial case review
              </Link>{' '}
              lets you assess your chances realistically before committing to anything.
            </p>
          </div>
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
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__1a.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 1a KSchG — Statutory severance after operational dismissal &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 4 KSchG — Three-week filing deadline &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__10.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 10 KSchG — Severance amount &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 34 EStG — One-fifth rule (Fünftelregelung) for severance taxation &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ visible */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[820px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              FAQ
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
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
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
