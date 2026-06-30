'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

interface Q {
  readonly id: string;
  readonly question: string;
  readonly help: string;
}

const QS: readonly Q[] = [
  {
    id: 'severance',
    question: 'Does the agreement specify a concrete severance amount in euros?',
    help:
      'Without a numeric severance — name an amount in euros — there is little reason to sign instead of waiting for an unfair-dismissal claim.',
  },
  {
    id: 'sperrzeit',
    question: 'Does it contain a clause stating the employer would otherwise have dismissed you on operational grounds, observing the notice period?',
    help:
      'This recital is the standard way to avoid a 12-week unemployment-benefit blocking period under § 159 SGB III.',
  },
  {
    id: 'reference',
    question: 'Does it include a "very good" qualified reference clause?',
    help:
      'The full reference text (Zeugnis) should be annexed or at least committed with a "very good" overall grade.',
  },
  {
    id: 'time',
    question: 'Did you get enough time to review the agreement before signing?',
    help:
      'BAG 6 AZR 333/21 sets a "fair negotiation" standard. Pressure tactics ("sign within an hour") may invalidate the agreement.',
  },
  {
    id: 'release',
    question: 'Does it contain a general release (Erledigungsklausel)?',
    help:
      'A general release bars further claims — make sure outstanding overtime, bonus and holiday claims are settled or excluded from the release.',
  },
];

type Answer = 'yes' | 'no' | 'unsure' | null;

export default function CheckTerminationAgreementEn() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const q = QS[step];

  function answer(value: Answer) {
    setAnswers({ ...answers, [q.id]: value });
    if (step + 1 >= QS.length) setDone(true);
    else setStep(step + 1);
  }

  const verdict = (() => {
    if (!done) return null;
    const risks: string[] = [];
    if (answers.severance === 'no') risks.push('No concrete severance amount');
    if (answers.sperrzeit === 'no') risks.push('Sperrzeit clause missing — 12-week benefit risk');
    if (answers.reference === 'no') risks.push('No "very good" reference clause');
    if (answers.time === 'no') risks.push('Sign-now pressure — BAG 6 AZR 333/21 issue');
    if (answers.release === 'yes')
      risks.push('General release present — make sure all outstanding claims are settled first');

    if (risks.length >= 2) {
      return {
        tone: 'red' as const,
        title: 'Do not sign — material risks',
        body: 'Two or more critical defects. A specialist review is essential before you sign.',
        risks,
      };
    }
    if (risks.length === 1) {
      return {
        tone: 'amber' as const,
        title: 'Renegotiate before signing',
        body: 'One material issue identified — fix it before signing.',
        risks,
      };
    }
    return {
      tone: 'gold' as const,
      title: 'Review by a specialist recommended',
      body:
        'No obvious red flags from the 5 quick questions — but a full review of the wording is still recommended before signing.',
      risks,
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
        eyebrow="Check your termination agreement"
        title="5-question Aufhebungsvertrag check"
        lede="Spot the obvious risks before you sign. Above all: severance, Sperrzeit recital, reference clause, time pressure and general release."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/check-termination-agreement', label: 'Check termination agreement' },
        ]}
      />

      <section className="py-12 px-8 bg-white" id="contact">
        <div className="max-w-[760px] mx-auto">
          {!done ? (
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="flex justify-between mb-6">
                <span className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-gold-dark">
                  Question {step + 1} of {QS.length}
                </span>
                <span className="text-[0.78rem] text-ink-muted">
                  {Math.round(((step + 1) / QS.length) * 100)}%
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
            </div>
          ) : (
            verdict && (
              <div className="bg-cream border border-border-light rounded p-8">
                <span
                  className={`inline-block px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider rounded-sm mb-4 ${
                    verdict.tone === 'red'
                      ? 'bg-red-100 text-red-700'
                      : verdict.tone === 'amber'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gold-bg text-gold-dark'
                  }`}
                >
                  Preliminary verdict
                </span>
                <h2 className="font-serif text-[1.5rem] font-bold mb-3">{verdict.title}</h2>
                <p className="text-[1rem] text-ink-light leading-relaxed mb-4">{verdict.body}</p>
                {verdict.risks.length > 0 && (
                  <ul className="list-disc pl-6 mb-6 text-[0.95rem] text-ink-light leading-relaxed">
                    {verdict.risks.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
                  >
                    Have my agreement reviewed &rarr;
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
