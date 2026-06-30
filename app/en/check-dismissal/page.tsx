'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

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

      <div id="contact-form" />
      <ContactForm />
    </main>
  );
}
