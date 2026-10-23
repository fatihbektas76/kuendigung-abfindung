'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

const BASE = 'https://www.gekuendigt-abfindung.de';
const PAGE_URL = `${BASE}/en/check-dismissal/`;

interface Step {
  readonly id: string;
  readonly question: string;
  readonly help: string;
}

const STEPS: readonly Step[] = [
  {
    id: 'received',
    question: 'When did you receive the dismissal letter?',
    help:
      'The 3-week filing deadline (§ 4 KSchG) starts the day the letter physically arrived in your mailbox.',
  },
  {
    id: 'form',
    question: 'Is the letter on paper, with a handwritten original signature?',
    help:
      'Email, fax or SMS dismissals are invalid in Germany (§ 623 BGB). Only original-signed paper documents count.',
  },
  {
    id: 'tenure',
    question: 'Have you been employed for more than 6 months?',
    help:
      'Below 6 months the Dismissal Protection Act usually does not apply (§ 1 (1) KSchG) — but special protections (pregnancy, severe disability, works council) still do.',
  },
  {
    id: 'staff',
    question: 'Does the employer have more than 10 employees (part-time weighted)?',
    help:
      'The KSchG only applies above the small-business threshold of § 23 KSchG. Apprentices and the employer themselves do not count.',
  },
  {
    id: 'signed',
    question: 'Have you signed anything since receiving the dismissal?',
    help:
      'Never sign a termination agreement, severance waiver or exit document without a legal review first.',
  },
];

type Answer = 'yes' | 'no' | 'unsure' | null;

const faqs = [
  {
    q: 'What is the three-week deadline I keep hearing about?',
    a: 'Under § 4 KSchG you have exactly three weeks from the day the dismissal letter physically reaches your mailbox to file an unfair-dismissal claim (Kündigungsschutzklage) at the competent labour court. Miss that window and the dismissal is treated as valid — regardless of how flawed it was. There is no automatic extension. In rare cases a late filing is admitted under § 5 KSchG only if you were unavoidably prevented from filing on time.',
  },
  {
    q: 'My dismissal letter is only on email / PDF — is that valid?',
    a: 'No. German employment law requires the written form with original handwritten signature on paper (§ 623 BGB). A PDF, scan, email, fax or SMS does not meet the requirement. The dismissal is formally void. In practice an employer who tries to dismiss by email usually faces an immediate win for the employee once the claim is filed.',
  },
  {
    q: 'Does the Dismissal Protection Act (KSchG) apply to my dismissal?',
    a: 'The substantive protection of the KSchG kicks in only when two conditions are met at once (§§ 1 and 23 KSchG): the employee has been with the employer for more than six months, and the business regularly employs more than ten people (part-time weighted). Below those thresholds you still have formal protection (§ 623 BGB), notice-period rules (§ 622 BGB) and special protection (pregnancy, severe disability, works-council membership).',
  },
  {
    q: 'The employer wants me to sign a termination agreement — should I?',
    a: 'Never sign without a specialist review. German case law gives you no general cooling-off period after signing (BAG 7 AZR 1052/06), but recission on grounds of unfair-negotiation (BAG 6 AZR 333/21) is possible if the employer created undue pressure (home visit, sickbed signing, immediate signature demanded). Equally important: wrong wording triggers a 12-week dormancy on unemployment benefit (§ 158 SGB III).',
  },
  {
    q: 'What does the "preliminary verdict" from this tool mean?',
    a: 'It is a non-binding first read based on five inputs. It is designed to flag the obvious wins (invalid form, something already signed, KSchG applies) and the obvious risks. For the binding assessment we need the dismissal letter, the employment contract and the key dates (letter received, prior warnings, salary slips) — we review this free of charge within 48 hours.',
  },
  {
    q: 'What happens next, if the tool says my case looks strong?',
    a: 'The next step is almost always filing an unfair-dismissal claim within the three-week window. Negotiating leverage for a settlement arises almost exclusively from that filing. Typical settlement range is 0.5× to 1.5× monthly gross × years of service, depending on how attackable the dismissal is. If you hold a legal-expenses insurance with employment-law cover, filing and representation are typically fully covered.',
  },
];

export default function CheckDismissalEn() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const current = STEPS[step];

  function answer(value: Answer) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (step + 1 >= STEPS.length) {
      setComplete(true);
    } else {
      setStep(step + 1);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setComplete(false);
  }

  const verdict = (() => {
    if (!complete) return null;
    const tenure = answers.tenure;
    const staff = answers.staff;
    const form = answers.form;
    const signed = answers.signed;

    if (form === 'no') {
      return {
        tone: 'green' as const,
        title: 'Likely invalid on formal grounds',
        body:
          'A dismissal in Germany must be signed on paper (§ 623 BGB). Email, fax or scan is invalid. Send us the document — this is usually a fast win.',
      };
    }
    if (signed === 'yes') {
      return {
        tone: 'amber' as const,
        title: 'Urgent: review what you signed',
        body:
          'Anything you signed since the dismissal — termination agreement, severance waiver, settlement — must be reviewed immediately to identify rescission grounds (§ 123 BGB, BAG 6 AZR 333/21).',
      };
    }
    if (tenure === 'yes' && staff === 'yes') {
      return {
        tone: 'green' as const,
        title: 'KSchG protection applies — strong starting position',
        body:
          'The Dismissal Protection Act applies. Every ordinary dismissal must be socially justified on conduct, person or operational grounds. Settlement chances are high.',
      };
    }
    if (tenure === 'no' || staff === 'no') {
      return {
        tone: 'amber' as const,
        title: 'KSchG may not apply — but other rights still do',
        body:
          'Even outside the KSchG you have formal protections (§ 623 BGB), notice-period rights (§ 622 BGB) and special protection categories. A specialist review is still worthwhile.',
      };
    }
    return {
      tone: 'gold' as const,
      title: 'Send us the dismissal letter for a free review',
      body:
        'Based on your answers a full review is recommended. We respond within 48 hours.',
    };
  })();

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
                '@type': 'WebApplication',
                name: 'German Dismissal Check (English)',
                url: PAGE_URL,
                applicationCategory: 'LegalTool',
                operatingSystem: 'Any',
                inLanguage: 'en',
                description:
                  'Free 5-question screening on the validity of a German dismissal — form (§ 623 BGB), KSchG applicability, three-week filing deadline (§ 4 KSchG).',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
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
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en/` },
                  { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/en/tools/` },
                  { '@type': 'ListItem', position: 3, name: 'Check your dismissal', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      <TopicHero
        eyebrow="Check your dismissal"
        title="5-question dismissal check"
        lede="Answer 5 quick questions and get an instant first read on your case. For the binding assessment, send us the letter — free review within 48 hours."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/check-dismissal', label: 'Check your dismissal' },
        ]}
      />

      {/* Direct-answer block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Four hard questions decide most German dismissal cases:</strong> was it
              on paper with a handwritten signature (§ 623 BGB)? Have you been with the
              employer for more than six months, in a company with more than ten employees
              (§§ 1 and 23 KSchG — the small-business threshold)? Have you filed within the
              three-week window (§ 4 KSchG)? Have you signed anything since receipt? The
              checker below walks through these, flags the obvious wins and risks, and
              produces a preliminary verdict.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-8 bg-white" id="contact">
        <div className="max-w-[760px] mx-auto">
          {!complete && current ? (
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-gold-dark">
                  Question {step + 1} of {STEPS.length}
                </span>
                <span className="text-[0.78rem] text-ink-muted">
                  {Math.round(((step + 1) / STEPS.length) * 100)}%
                </span>
              </div>
              <h2 className="font-serif text-[1.5rem] font-bold mb-3">{current.question}</h2>
              <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">{current.help}</p>
              <div className="flex gap-3 flex-wrap">
                {(['yes', 'no', 'unsure'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => answer(value)}
                    className="flex-1 min-w-[100px] py-3.5 px-6 bg-white border border-border-light text-ink font-semibold rounded-sm cursor-pointer transition-all hover:border-gold hover:text-gold-dark"
                  >
                    {value === 'yes' ? 'Yes' : value === 'no' ? 'No' : 'Not sure'}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mt-5 text-[0.85rem] text-ink-muted underline cursor-pointer bg-transparent border-none"
                >
                  &larr; Go back
                </button>
              )}
            </div>
          ) : (
            verdict && (
              <div className="bg-cream border border-border-light rounded p-8">
                <span
                  className={`inline-block px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider rounded-sm mb-4 ${
                    verdict.tone === 'green'
                      ? 'bg-green-bg text-green-dark'
                      : verdict.tone === 'amber'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gold-bg text-gold-dark'
                  }`}
                >
                  Preliminary verdict
                </span>
                <h2 className="font-serif text-[1.6rem] font-bold mb-3">{verdict.title}</h2>
                <p className="text-[1rem] text-ink-light leading-relaxed mb-6">{verdict.body}</p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5"
                  >
                    Send my dismissal letter &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold transition-all bg-transparent text-ink border-[1.5px] border-border hover:border-gold hover:text-gold cursor-pointer"
                  >
                    Start over
                  </button>
                </div>
                <p className="text-[0.85rem] text-ink-muted mt-6 leading-relaxed">
                  This preliminary verdict is based on the 5 inputs above and does not
                  constitute legal advice. For the binding assessment we need the actual
                  dismissal letter and your contract.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* The three-week deadline */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Hard deadline
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            The three-week filing deadline (§ 4 KSchG) is non-negotiable
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            From the day the dismissal letter physically reaches you, the clock starts. Within
            <strong> 21 calendar days</strong> an unfair-dismissal claim must be received at
            the competent labour court. The filing is the single most important act in any
            German dismissal matter &mdash; it is also the only event that creates leverage
            for settlement negotiations.
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mb-4">
            There is <strong>no automatic extension</strong>. Late filings are admitted under
            § 5 KSchG only when the employee was unavoidably prevented from filing in time
            &mdash; a very high bar in practice (illness alone is not enough; you had to be
            incapable of appointing a lawyer).
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            The practical implication: even if you intend to accept the dismissal and
            negotiate a severance, filing within three weeks preserves every option. Without
            the filing, you have no leverage.
          </p>
        </div>
      </section>

      {/* Formal defects */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-[820px] mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Common formal defects
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold mb-4">
            What makes a German dismissal formally invalid
          </h2>
          <ul className="list-disc pl-5 text-[0.98rem] text-ink-light leading-relaxed space-y-2 mb-4">
            <li><strong>Not on paper:</strong> email, PDF, fax or scan is void (§ 623 BGB).</li>
            <li><strong>Signature missing or illegible:</strong> handwritten original required; printed name or copy is not enough.</li>
            <li><strong>Signatory lacks authority:</strong> the letter must be signed by someone with representation power; absent a power-of-attorney, you may reject the letter without delay (§ 174 BGB).</li>
            <li><strong>Works-council not heard:</strong> every dismissal requires prior consultation of the works council (§ 102 BetrVG) &mdash; failure voids the dismissal.</li>
            <li><strong>Special-protection notice bypassed:</strong> dismissals of pregnant employees, severely disabled persons and works-council members require prior administrative or committee consent.</li>
          </ul>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Any one of these defects is often enough to win the case &mdash; which in turn
            typically translates into a higher severance in the settlement phase.
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
              <li><a href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 4 KSchG — Three-week filing deadline &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/kschg/__5.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 5 KSchG — Late filing (narrow exception) &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/kschg/__23.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 23 KSchG — Small-business threshold &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/bgb/__623.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 623 BGB — Written-form requirement &rarr;</a></li>
              <li><a href="https://www.gesetze-im-internet.de/betrvg/__102.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">§ 102 BetrVG — Works-council hearing &rarr;</a></li>
            </ul>
          </div>
        </div>
      </section>

      <div id="contact-form" />
      <ContactForm />
    </main>
  );
}
