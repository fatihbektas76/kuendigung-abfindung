import type { Metadata } from 'next';
import Hero from '@/components/en/Hero';
import FAQ from '@/components/en/FAQ';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { EN_FAQS } from '@/lib/en-faqs';
import { SEO_CONFIG } from '@/lib/seo-config';

const EN_URL = 'https://www.gekuendigt-abfindung.de/en/';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Dismissed in Germany? Severance & Unfair Dismissal — Employment Lawyer (${new Date().getFullYear()})`,
  description:
    'German employment-law specialist for English speakers: check your dismissal, maximise severance, negotiate termination agreements. Free first check.',
  alternates: {
    canonical: EN_URL,
    languages: {
      'de-DE': 'https://www.gekuendigt-abfindung.de/',
      'en': EN_URL,
      'x-default': 'https://www.gekuendigt-abfindung.de/',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Dismissed in Germany? Severance & Unfair Dismissal — Employment Lawyer',
    description:
      'German employment-law specialist for English speakers. Free first check, maximise severance, navigate termination agreements.',
    url: EN_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dismissed in Germany? Severance & Unfair Dismissal',
    description:
      'German employment-law specialist for English speakers. Free first check.',
  },
};

export default function HomeEn() {
  return (
    <>
      {/* Schema.org — LegalService + AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': SEO_CONFIG.organization.id,
            inLanguage: 'en',
            aggregateRating: {
              '@type': 'AggregateRating',
              ...SEO_CONFIG.rating,
            },
            review: SEO_CONFIG.reviews,
          }),
        }}
      />

      {/* Schema.org — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: 'en',
            mainEntity: EN_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <main>
        <Hero />

        {/* GEO direct answer — citable prose right after the hero */}
        <section id="direct-answer" className="pt-10 pb-2 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-[760px]">
              <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
                After a dismissal in Germany, employees have{' '}
                <strong>exactly three weeks</strong> to file an unfair-dismissal claim
                (Kündigungsschutzklage) at the competent labour court (
                <a className="text-gold-dark underline" href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer">§&nbsp;4&nbsp;KSchG</a>
                ). If this deadline is missed, the dismissal is generally treated as
                valid — even if it was unlawful. There is no general statutory right to
                severance pay (
                <a className="text-gold-dark underline" href="https://www.gesetze-im-internet.de/kschg/__1a.html" target="_blank" rel="noopener noreferrer">§&nbsp;1a&nbsp;KSchG</a>
                ); in practice, around 80 % of proceedings before the German labour courts end
                without a contested judgment (Statistisches Bundesamt, Fachserie 10 Reihe 2.8)
                — often with a settlement and severance. Outcome and amount depend on the
                individual case. The rule-of-thumb figure is{' '}
                <strong>0.5 gross monthly salaries per year of service</strong>; with strong
                negotiating leverage, materially more is achievable. Notice periods are set in{' '}
                <a className="text-gold-dark underline" href="https://www.gesetze-im-internet.de/bgb/__622.html" target="_blank" rel="noopener noreferrer">§&nbsp;622&nbsp;BGB</a>
                ; the social justification for every dismissal in{' '}
                <a className="text-gold-dark underline" href="https://www.gesetze-im-internet.de/kschg/__1.html" target="_blank" rel="noopener noreferrer">§&nbsp;1&nbsp;KSchG</a>
                . For tax, the “one-fifth rule” (
                <a className="text-gold-dark underline" href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer">§&nbsp;34&nbsp;EStG</a>
                ) can reduce progression in individual cases; since 1 Jan 2025 it must be claimed
                in the annual tax return.
              </p>
              <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
                <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law
                specialist (APOS Legal Heidelberg). 20+ years of employment-law experience,
                Fachanwalt title since 2011.
              </p>
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="py-8 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <aside
              className="my-6 p-7 bg-cream border border-border-light rounded"
              role="note"
              aria-label="Summary"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
                Key points
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {[
                  '3-week deadline: after receiving the written dismissal you have only 3 weeks to file (§ 4 KSchG).',
                  'Severance formula: 0.5 gross monthly salaries × years of service — meaningfully more is often achievable.',
                  'Free first check: a specialist employment lawyer tells you whether action is worthwhile and what it would cost – no obligation.',
                  '20+ years of employment-law experience, Fachanwalt title since 2011.',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.92rem] text-ink-light leading-relaxed"
                  >
                    <span className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Services teaser */}
        <section id="services" className="py-[80px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Services
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
              How we help English-speaking employees in Germany
            </h2>
            <p className="text-[1.05rem] text-ink-muted max-w-[640px] leading-relaxed mb-10">
              Every assignment starts with a free first check. Below are the most
              common situations we handle.
            </p>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {[
                {
                  href: '/en/check-dismissal',
                  title: 'Check your dismissal',
                  body: 'We examine whether your dismissal is legally sound and how strong a Kündigungsschutzklage would be.',
                },
                {
                  href: '/en/severance-calculator',
                  title: 'Severance calculator',
                  body: 'Estimate the likely severance using the standard formula and case-specific factors.',
                },
                {
                  href: '/en/termination-agreement',
                  title: 'Termination agreement',
                  body: 'Avoid a 12-week unemployment-benefit blocking period (Sperrzeit) and negotiate better terms.',
                },
                {
                  href: '/en/summary-dismissal',
                  title: 'Summary dismissal',
                  body: 'The § 626 BGB test is strict — we challenge summary dismissals, enforce the written-reasons duty (§ 626 (2) sentence 3 BGB) and protect your reputation.',
                },
                {
                  href: '/en/written-warning',
                  title: 'Written warning',
                  body: 'A warning (Abmahnung) is often the prelude to a dismissal. We get unjustified warnings withdrawn.',
                },
                {
                  href: '/en/notice-period-calculator',
                  title: 'Notice-period calculator',
                  body: 'Statutory notice periods under § 622 BGB based on your length of service.',
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block p-7 border border-border-light bg-white rounded transition-all no-underline hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <h3 className="font-serif text-[1.2rem] font-bold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
                    {item.body}
                  </p>
                  <span className="inline-block mt-4 text-[0.85rem] font-semibold text-gold-dark">
                    Learn more &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-[80px] px-8 bg-cream max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Process
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
              From enquiry to outcome — in four steps
            </h2>
            <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed">
              Costs clear before you instruct us.
            </p>
            <ol className="grid grid-cols-4 gap-6 mt-10 list-none p-0 max-md:grid-cols-1">
              {[
                {
                  n: '01',
                  t: 'Free first check',
                  d: 'Tell us what happened. Usually within 48 hours we tell you whether action is worthwhile, which deadlines apply and what it would cost.',
                },
                {
                  n: '02',
                  t: 'Offer & mandate',
                  d: 'You receive a cost quote, or we clarify cover with your legal-expenses insurance. Costs arise only once you instruct us.',
                },
                {
                  n: '03',
                  t: 'Review, negotiation or claim',
                  d: 'We review your documents, negotiate with your employer or file the unfair-dismissal claim within the deadline.',
                },
                {
                  n: '04',
                  t: 'Outcome',
                  d: 'Severance, an improved termination agreement or continued employment. Most cases end in a settlement.',
                },
              ].map((step) => (
                <li key={step.n} className="p-7 bg-white border border-border-light rounded">
                  <div className="font-serif text-[1.1rem] font-bold text-gold-dark mb-2">
                    {step.n}
                  </div>
                  <h3 className="font-serif text-[1.15rem] font-bold mb-2">{step.t}</h3>
                  <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FAQ />
        <ContactForm />
        <CTA />
      </main>
    </>
  );
}
