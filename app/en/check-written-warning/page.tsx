'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

interface Question {
  readonly id: string;
  readonly question: string;
  readonly help: string;
}

const QUESTIONS: readonly Question[] = [
  {
    id: 'specific',
    question:
      'Does the warning describe one specific incident with date, place and concrete behaviour?',
    help:
      'A valid Abmahnung must point to one concrete breach. Vague statements like "you regularly underperform" are not enough.',
  },
  {
    id: 'demand',
    question: 'Does it tell you specifically what behaviour the employer expects going forward?',
    help:
      'The warning must demand corrective behaviour — otherwise you have no chance to adjust.',
  },
  {
    id: 'threat',
    question: 'Does it expressly threaten dismissal if the behaviour is repeated?',
    help:
      'Without a clear threat of consequences for the employment, the warning has no warning function and cannot ground a later conduct dismissal.',
  },
  {
    id: 'true',
    question: 'Are the facts in the warning correct?',
    help:
      'Wrong facts are the strongest ground for removal of the Abmahnung from your personnel file.',
  },
  {
    id: 'proportionate',
    question: 'Is the warning proportionate to the breach described?',
    help:
      'A minor infraction (one late arrival, a small mistake) usually warrants only a verbal Ermahnung, not a formal Abmahnung.',
  },
];

type Answer = 'yes' | 'no' | 'unsure' | null;

export default function CheckWrittenWarningEn() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[step];

  function answer(value: Answer) {
    setAnswers({ ...answers, [q.id]: value });
    if (step + 1 >= QUESTIONS.length) setDone(true);
    else setStep(step + 1);
  }

  const verdict = (() => {
    if (!done) return null;
    const flaws = [
      answers.specific === 'no' && 'No specific incident described',
      answers.demand === 'no' && 'No specific corrective behaviour demanded',
      answers.threat === 'no' && 'No express threat of dismissal',
      answers.true === 'no' && 'Facts are wrong',
      answers.proportionate === 'no' && 'Disproportionate to the breach',
    ].filter(Boolean) as string[];

    if (flaws.length >= 2) {
      return {
        tone: 'green' as const,
        title: 'Strong removal case',
        body: 'Two or more formal flaws — a removal claim has good prospects of success.',
        flaws,
      };
    }
    if (flaws.length === 1) {
      return {
        tone: 'amber' as const,
        title: 'Single defect identified — worth a closer look',
        body: 'One material flaw is present — depending on its nature, a removal demand may succeed.',
        flaws,
      };
    }
    return {
      tone: 'gold' as const,
      title: 'No obvious formal flaws — counter-statement still recommended',
      body:
        'Even without formal flaws, filing a counter-statement (Gegendarstellung) protects your position.',
      flaws,
    };
  })();

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  return (
    <main>
      <TopicHero
        eyebrow="Check your written warning"
        title="5-question Abmahnung check"
        lede="Quick test whether your written warning has formal defects you can use to get it removed from your personnel file."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/check-written-warning', label: 'Check written warning' },
        ]}
      />

      <section className="py-12 px-8 bg-white" id="contact">
        <div className="max-w-[760px] mx-auto">
          {!done ? (
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="flex justify-between mb-6">
                <span className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-gold-dark">
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <span className="text-[0.78rem] text-ink-muted">
                  {Math.round(((step + 1) / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <h2 className="font-serif text-[1.4rem] font-bold mb-3">{q.question}</h2>
              <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">{q.help}</p>
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
                <h2 className="font-serif text-[1.5rem] font-bold mb-3">{verdict.title}</h2>
                <p className="text-[1rem] text-ink-light leading-relaxed mb-4">{verdict.body}</p>
                {verdict.flaws.length > 0 && (
                  <ul className="list-disc pl-6 mb-6 text-[0.95rem] text-ink-light leading-relaxed">
                    {verdict.flaws.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
                  >
                    Send my Abmahnung for review &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold transition-all bg-transparent text-ink border-[1.5px] border-border hover:border-gold hover:text-gold cursor-pointer"
                  >
                    Start over
                  </button>
                </div>
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
