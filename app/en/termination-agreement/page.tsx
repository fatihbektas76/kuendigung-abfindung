import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/termination-agreement/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Termination Agreement (Aufhebungsvertrag) ${new Date().getFullYear()} — When to Sign, When to Refuse`,
  description:
    'Termination agreement in Germany: when it makes sense, the 12-week unemployment-benefit blocking period and how to negotiate higher severance. Reviewed by a specialist.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/aufhebungsvertrag/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/aufhebungsvertrag/`,
    },
  },
  openGraph: {
    title: 'Termination Agreement (Aufhebungsvertrag) — When to Sign, When to Refuse',
    description:
      'Termination agreement in Germany: the Sperrzeit trap and how to negotiate. Reviewed by a German employment-law specialist.',
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: 'What is a termination agreement (Aufhebungsvertrag)?',
    a: 'A termination agreement is a mutual contract between employer and employee that ends the employment relationship by agreement, usually with a specific end-date and a severance payment. It bypasses the regular notice period and dismissal-protection rules, which is exactly why it is risky to sign without prior review.',
  },
  {
    q: 'Does signing trigger a Sperrzeit (unemployment-benefit blocking period)?',
    a: 'Often yes. Signing a termination agreement is treated as voluntarily ending the employment, which usually leads to a 12-week blocking period of unemployment benefit (§ 159 SGB III) unless you can show an important cause — for instance, an imminent operational dismissal that would have ended the employment anyway. The exact wording of the agreement is decisive.',
  },
  {
    q: 'Should I always demand severance?',
    a: 'Yes. If the employer wants you to sign, the leverage is on your side — they are avoiding an unfair-dismissal claim. Realistic ranges are 0.5–1.5 gross monthly salaries per year of service, sometimes more. Without severance, the agreement almost never makes sense.',
  },
  {
    q: 'Can I withdraw a signed termination agreement?',
    a: 'In principle no. There is no general right to withdraw a termination agreement. Only narrow exceptions exist: rescission for fraud or threat (§ 123 BGB), gross breach of the “fair negotiation” doctrine (BAG 6 AZR 333/21), or a Widerruf clause expressly written into the agreement.',
  },
  {
    q: 'What about my reference letter and remaining holiday?',
    a: 'Both should be settled in the agreement. Demand a “very good” qualified reference (§ 109 GewO), pay-out of remaining holiday in cash (§ 7 IV BUrlG), continued use of the company car until the end-date, plus a release from further work duties with continued pay (Freistellung).',
  },
];

export default function TerminationAgreementEn() {
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
                headline:
                  'Termination Agreement (Aufhebungsvertrag) — When to Sign, When to Refuse',
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
          eyebrow="Termination agreement (Aufhebungsvertrag)"
          title="Termination agreement: don’t sign without legal review."
          lede="A termination agreement bypasses the German dismissal-protection rules. That is convenient for your employer — and risky for you. Before you sign, we tell you the severance you can realistically demand and whether a 12-week unemployment-benefit blocking period is on the table."
          breadcrumbs={[
            { href: '/en/', label: 'Home' },
            { href: '/en/termination-agreement', label: 'Termination agreement' },
          ]}
          primaryCta={{ href: '/en/check-termination-agreement', label: 'Review my agreement' }}
          secondaryCta={{ href: '#contact', label: 'Free case review' }}
        />

        {/* Direct answer */}
        <section className="py-12 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[820px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
              A termination agreement (Aufhebungsvertrag) ends the employment by mutual contract,
              usually faster than the statutory notice period and almost always with severance.
              The catch: it is treated by the unemployment office as a voluntary termination,
              which typically triggers a <strong>12-week blocking period</strong> for unemployment
              benefit under <strong>§&nbsp;159 SGB III</strong>. The Federal Labour Court ruling{' '}
              <strong>BAG 6 AZR 333/21 (“faires Verhandeln”)</strong> additionally requires fair
              negotiation conditions — pressure tactics by the employer can invalidate the
              agreement.
            </p>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-0">
              <strong>Written and reviewed by</strong> Fatih Bektas, German employment-law specialist
              (APOS Legal Heidelberg).
            </p>
          </div>
        </section>

        {/* When it makes sense / when not */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              When to consider signing — and when not
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="p-7 bg-white border-l-4 border-green rounded">
                <h3 className="font-serif text-[1.15rem] font-bold mb-3 text-green-dark">
                  Reasonable to consider
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                  <li>You have a new job lined up and the start date is close</li>
                  <li>The agreement contains a severance and a clean reference</li>
                  <li>
                    The employer would have had a strong operational dismissal anyway (avoids
                    Sperrzeit)
                  </li>
                  <li>You want to leave the role for personal reasons</li>
                </ul>
              </div>
              <div className="p-7 bg-white border-l-4 border-red-500 rounded">
                <h3 className="font-serif text-[1.15rem] font-bold mb-3 text-red-600">
                  Refuse or renegotiate
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                  <li>No severance offered, or a token figure</li>
                  <li>You are under pressure (“sign within an hour”) — BAG 6 AZR 333/21 issue</li>
                  <li>You hold strong dismissal protection (pregnancy, severe disability, works council)</li>
                  <li>The reference clause is missing or weak</li>
                  <li>No express clause protecting your unemployment benefit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What every termination agreement should include */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-content mx-auto max-w-[860px]">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,1.9rem)] font-bold mb-6">
              The clauses every termination agreement should contain
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Severance:</strong> specific amount in € gross, due-date, payment to a named
                bank account, plus an explicit tax-allocation clause (Fünftelregelung).
              </li>
              <li>
                <strong>End-date and freistellung:</strong> last day of employment, full pay until
                that date, you released from work duties (Freistellung) with holiday set off.
              </li>
              <li>
                <strong>Reference:</strong> qualified, “very good” (sehr gut) overall grade, agreed
                text annexed to the agreement.
              </li>
              <li>
                <strong>Holiday and overtime:</strong> remaining holiday paid out in cash, overtime
                balance compensated.
              </li>
              <li>
                <strong>Company car / equipment:</strong> dates for return, condition expectations,
                no offset against severance.
              </li>
              <li>
                <strong>Confidentiality and non-compete:</strong> ensure any post-contractual
                non-compete is properly compensated under § 74 HGB — or waive it.
              </li>
              <li>
                <strong>“No Sperrzeit” framing:</strong> a recital that the employer would have
                dismissed otherwise on operational grounds, observing the notice period.
              </li>
              <li>
                <strong>General release (Erledigungsklausel):</strong> understand its scope before
                signing — it bars further claims.
              </li>
            </ol>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {[
                { href: '/en/severance-pay', label: 'Severance pay' },
                { href: '/en/check-termination-agreement', label: 'Check my termination agreement' },
                { href: '/en/dismissal', label: 'Dismissal' },
                { href: '/en/severance-calculator', label: 'Severance calculator' },
                {
                  href: '/en/unfair-dismissal-claim',
                  label: 'Unfair-dismissal claim (alternative)',
                },
                { href: '/en/notice-periods', label: 'Statutory notice periods' },
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
              Termination agreement — most common questions
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
