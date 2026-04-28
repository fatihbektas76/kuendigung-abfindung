'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { questions } from '@/lib/abmahnchecker/questions';
import { evaluate } from '@/lib/abmahnchecker/evaluator';
import type { Answer, Question, Option, Verdict, EvaluationResult } from '@/lib/abmahnchecker/types';

/* ───── Hint tone colors ───── */
const HINT_COLORS: Record<Option['hintTone'], string> = {
  danger: 'text-[#791F1F]',
  warning: 'text-[#633806]',
  success: 'text-[#0F6E56]',
  neutral: 'text-ink-muted',
};

/* ───── Verdict config ───── */
const VERDICT_CONFIG: Record<Verdict, { bg: string; border: string; text: string; label: string; sub: string }> = {
  UNWIRKSAM: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-[#791F1F]',
    label: 'Abmahnung wahrscheinlich nicht wirksam',
    sub: 'Ihre Angaben deuten auf mindestens einen schwerwiegenden Mangel hin, der die Wirksamkeit der Abmahnung in Frage stellt. Eine Klage auf Entfernung aus der Personalakte hat gute Erfolgsaussichten.',
  },
  UNSICHER: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-[#633806]',
    label: 'Wirksamkeit unsicher',
    sub: 'Es liegen Indizien vor, die gegen die Wirksamkeit der Abmahnung sprechen. Eine abschließende Beurteilung erfordert die Sichtung des konkreten Schreibens durch einen Fachanwalt.',
  },
  WIRKSAM: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-[#0F6E56]',
    label: 'Abmahnung wahrscheinlich wirksam',
    sub: 'Nach Ihren Angaben sind keine offensichtlichen formellen oder materiellen Mängel erkennbar. Eine Gegendarstellung zur Personalakte kann dennoch sinnvoll sein.',
  },
};

export default function AbmahncheckerFlow() {
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setHistory] = useState<number[]>([]);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  /* ── Compute visible questions based on showIf conditions ── */
  const visibleQuestions = useMemo(() => {
    return questions.filter((q) => !q.showIf || q.showIf(answersMap));
  }, [answersMap]);

  const currentQuestion: Question | undefined = visibleQuestions[currentIndex];
  const totalVisible = visibleQuestions.length;
  const progress = result ? 100 : ((currentIndex) / totalVisible) * 100;

  /* ── Select an answer ── */
  const selectOption = useCallback((questionId: string, optionId: string) => {
    setAnswersMap((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  /* ── Navigate forward ── */
  const goNext = useCallback(() => {
    if (!currentQuestion) return;
    const selectedOptionId = answersMap[currentQuestion.id];
    if (!selectedOptionId) return;

    // Recalculate visible questions with the current answer included
    const nextVisible = questions.filter((q) => {
      if (!q.showIf) return true;
      const nextAnswers = { ...answersMap, [currentQuestion.id]: selectedOptionId };
      return q.showIf(nextAnswers);
    });

    const nextIndex = currentIndex + 1;

    if (nextIndex >= nextVisible.length) {
      // Evaluation
      const answersList: Answer[] = Object.entries(answersMap).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }));
      setResult(evaluate(answersList));
    } else {
      setHistory((prev) => [...prev, currentIndex]);
      setCurrentIndex(nextIndex);
    }
  }, [currentQuestion, answersMap, currentIndex]);

  /* ── Navigate back ── */
  const goBack = useCallback(() => {
    setHistory((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last !== undefined) setCurrentIndex(last);
      return copy;
    });
  }, []);

  /* ── Auto-advance after selection with 300ms delay ── */
  const handleSelect = useCallback((questionId: string, optionId: string) => {
    selectOption(questionId, optionId);
    setTimeout(() => {
      // Recalculate visible after selecting
      const nextAnswers = { ...answersMap, [questionId]: optionId };
      const nextVisible = questions.filter((q) => !q.showIf || q.showIf(nextAnswers));
      const nextIndex = currentIndex + 1;

      if (nextIndex >= nextVisible.length) {
        const answersList: Answer[] = Object.entries(nextAnswers).map(([qId, oId]) => ({
          questionId: qId,
          optionId: oId,
        }));
        setResult(evaluate(answersList));
      } else {
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex(nextIndex);
      }
    }, 300);
  }, [answersMap, currentIndex, selectOption]);

  /* ── Restart ── */
  const restart = useCallback(() => {
    setAnswersMap({});
    setCurrentIndex(0);
    setHistory([]);
    setResult(null);
  }, []);

  /* ───── Sidebar ───── */
  const sidebar = (
    <aside className="hidden lg:flex flex-col w-[320px] min-w-[320px] bg-white border-r border-border p-8 min-h-screen">
      <Link href="/" className="flex items-center gap-3 no-underline mb-10">
        <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={140} height={48} className="h-9 w-auto" priority />
      </Link>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-4">
          Was wird geprüft?
        </div>
        <div className="space-y-4">
          {[
            { title: 'Formelle Wirksamkeit', desc: 'Zugang, Bestimmtheit, Warn- und Hinweisfunktion' },
            { title: 'Materielle Wirksamkeit', desc: 'Richtigkeit der Vorwürfe, Verschulden, Rechtsausübung' },
            { title: 'Sammelabmahnung', desc: 'Mehrere Vorwürfe mit unrichtigem Bestandteil' },
            { title: 'Zeitliche Verwirkung', desc: 'Verzögerung und Vertrauenstatbestand' },
            { title: 'Sonderschutz', desc: 'Betriebsrat, Schwerbehinderte, AGG' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="text-[0.88rem] font-semibold text-ink">{item.title}</div>
                <div className="text-[0.78rem] text-ink-muted">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6 mt-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
          Erstellt von
        </div>
        <div className="text-[0.88rem] font-semibold text-ink">Fatih Bektas</div>
        <div className="text-[0.78rem] text-ink-muted">Fachanwalt für Arbeitsrecht</div>
        <div className="text-[0.78rem] text-ink-muted mt-1">APOS Legal, Heidelberg</div>
        <div className="mt-3">
          <a href="tel:+49622295992400" className="text-[0.82rem] text-gold-dark font-semibold no-underline hover:underline">
            +49 6222 95992 400
          </a>
        </div>
      </div>
    </aside>
  );

  /* ───── Result screen ───── */
  if (result) {
    const vc = VERDICT_CONFIG[result.verdict];
    return (
      <div className="flex min-h-screen bg-cream">
        {sidebar}
        <div className="flex-1 flex flex-col">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between py-4 px-6 bg-white border-b border-border">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={120} height={40} className="h-7 w-auto" />
            </Link>
            <a href="tel:+49622295992400" className="text-[0.82rem] text-gold-dark font-semibold no-underline">
              +49 6222 95992 400
            </a>
          </div>

          {/* Progress bar full */}
          <div className="h-1 bg-cream-dark">
            <div className="h-full bg-gold-dark transition-all duration-300 ease-out" style={{ width: '100%' }} />
          </div>

          <div className="flex-1 flex items-start justify-center px-6 py-10">
            <div className="w-full max-w-[640px]">
              {/* Verdict banner */}
              <div className={`${vc.bg} border ${vc.border} rounded-sm py-5 px-6 mb-8`}>
                <div className={`text-[0.68rem] font-bold tracking-[0.14em] uppercase ${vc.text} mb-1.5`}>
                  Auswertung Ihrer Angaben
                </div>
                <div className={`font-serif text-[1.3rem] font-bold leading-tight ${vc.text} mb-2`}>
                  {vc.label}
                </div>
                <p className={`text-[0.82rem] leading-relaxed ${vc.text} opacity-80 m-0`}>
                  {vc.sub}
                </p>
              </div>

              {/* Findings */}
              {result.findings.length > 0 && (
                <div className="mb-8">
                  <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-4">
                    {result.verdict === 'WIRKSAM' ? 'Geprüfte Hinweise' : 'Konkrete Mängel'}
                  </div>
                  <div className="space-y-3">
                    {result.findings.map((f) => (
                      <div key={f.id} className="py-3.5 px-4 border border-border rounded-sm bg-white">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`inline-block text-[0.65rem] font-bold tracking-wider uppercase py-0.5 px-2 rounded-sm ${
                            f.severity === 'KO' ? 'bg-red-100 text-[#791F1F]' : 'bg-amber-100 text-[#633806]'
                          }`}>
                            {f.severity}
                          </span>
                          <span className="text-[0.88rem] font-semibold text-ink">{f.title}</span>
                        </div>
                        <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0 mb-1.5">
                          {f.body}
                        </p>
                        <div className="text-[0.72rem] text-ink-muted/60 font-mono">
                          {f.citation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA for UNWIRKSAM / UNSICHER */}
              {result.verdict !== 'WIRKSAM' && (
                <div className="bg-[#2A1F0E] rounded-sm py-6 px-6 mb-8">
                  <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#C9B97A] mb-2">
                    Nächster Schritt
                  </div>
                  <div className="font-serif text-[1.1rem] font-bold leading-tight text-[#F0EAD9] mb-2">
                    Kostenlose Erstberatung mit Fachanwalt Bektas
                  </div>
                  <p className="text-[0.82rem] text-[#C9B97A] leading-relaxed m-0 mb-4">
                    Wir prüfen Ihre Abmahnung im Detail und setzen die Entfernung aus der Personalakte für Sie durch — häufig deckt die Rechtsschutzversicherung die Kosten.
                  </p>
                  <a
                    href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-3 px-6 bg-[#F0EAD9] text-[#2A1F0E] text-[0.88rem] font-semibold rounded-sm no-underline hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
                  >
                    Jetzt Termin vereinbaren &rarr;
                  </a>
                </div>
              )}

              {/* CTA for WIRKSAM */}
              {result.verdict === 'WIRKSAM' && (
                <div className="bg-white border border-border rounded-sm py-5 px-6 mb-8">
                  <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    Empfehlung
                  </div>
                  <p className="text-[0.88rem] text-ink-light leading-relaxed m-0 mb-3">
                    Auch bei einer formell wirksamen Abmahnung kann eine Gegendarstellung zur Personalakte sinnvoll sein. Wir beraten Sie kostenlos zu Ihren Optionen.
                  </p>
                  <a
                    href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-3 px-6 bg-gold-dark text-white text-[0.88rem] font-semibold rounded-sm no-underline hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(122,101,40,0.3)] transition-all"
                  >
                    Kostenlose Erstberatung &rarr;
                  </a>
                </div>
              )}

              {/* PDF download */}
              <PDFDownloadButton result={result} answersMap={answersMap} />

              {/* Restart + back links */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={restart}
                  className="text-[0.82rem] text-ink-muted hover:text-ink transition-colors cursor-pointer bg-transparent border-0"
                >
                  &larr; Erneut prüfen
                </button>
                <Link href="/abmahnung-pruefen/" className="text-[0.82rem] text-ink-muted hover:text-ink transition-colors no-underline">
                  Zurück zur Übersicht
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-[0.7rem] text-ink-muted/60 leading-relaxed mt-8 m-0">
                Dieses Ergebnis ist eine automatisierte Orientierungshilfe auf Basis Ihrer Angaben und ersetzt keine individuelle Rechtsberatung. Eine verbindliche Beurteilung kann nur nach Sichtung der konkreten Abmahnung durch einen Rechtsanwalt erfolgen.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── Question screen ───── */
  if (!currentQuestion) return null;

  const selectedOptionId = answersMap[currentQuestion.id];

  return (
    <div className="flex min-h-screen bg-cream">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between py-4 px-6 bg-white border-b border-border">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={120} height={40} className="h-7 w-auto" />
          </Link>
          <span className="text-[0.78rem] text-ink-muted">
            Schritt {currentIndex + 1} / {totalVisible}
          </span>
        </div>

        {/* Progress bar area */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[640px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold tracking-[0.08em] uppercase text-ink-muted border border-border rounded-full py-1 px-3">
                Block {currentQuestion.block} &middot; {currentQuestion.blockLabel}
              </span>
              <span className="text-[0.78rem] text-ink-muted hidden sm:block">
                Schritt {currentIndex + 1} / {totalVisible}
              </span>
            </div>
            <div className="h-1 bg-cream-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-dark rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex items-start justify-center px-6 py-10">
          <div className="w-full max-w-[540px]">
            <h2 className="font-sans text-[1.12rem] font-medium leading-[1.4] text-ink mb-2 mt-0">
              {currentQuestion.text}
            </h2>
            {currentQuestion.help && (
              <p className="text-[0.82rem] text-ink-muted leading-[1.55] mb-6 m-0">
                {currentQuestion.help}
              </p>
            )}

            {/* Options */}
            <div className="space-y-2.5 mt-6">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(currentQuestion.id, opt.id)}
                    className={`w-full text-left rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-2 border-gold-dark bg-gold-bg py-[13px] px-[15px]'
                        : 'border border-border bg-white py-3.5 px-4 hover:border-gold/50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {/* Radio */}
                      <span className={`w-4 h-4 min-w-[16px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                        isSelected ? 'border-gold-dark' : 'border-border'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-gold-dark" />}
                      </span>
                      {/* Label */}
                      <span className="flex-1 text-[0.88rem] text-ink">{opt.label}</span>
                      {/* Hint */}
                      {opt.hint && (
                        <span className={`text-[0.75rem] font-medium whitespace-nowrap ${HINT_COLORS[opt.hintTone]}`}>
                          {opt.hint}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {currentIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-[0.88rem] text-ink-muted hover:text-ink transition-colors cursor-pointer bg-transparent border-0 py-2"
                >
                  &larr; Zurück
                </button>
              ) : (
                <Link href="/abmahnung-pruefen/" className="text-[0.88rem] text-ink-muted hover:text-ink transition-colors no-underline py-2">
                  &larr; Zurück
                </Link>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={!selectedOptionId}
                className={`py-2.5 px-6 rounded-sm text-[0.88rem] font-semibold transition-all ${
                  selectedOptionId
                    ? 'bg-gold-dark text-white cursor-pointer hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(122,101,40,0.3)]'
                    : 'bg-border text-ink-muted cursor-not-allowed'
                }`}
              >
                Weiter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── PDF Download Button (lazy-loaded) ───── */
function PDFDownloadButton({ result, answersMap }: { result: EvaluationResult; answersMap: Record<string, string> }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { generatePDF } = await import('@/lib/abmahnchecker/pdf-generator');
      const blob = await generatePDF(result, answersMap);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Abmahn-Auswertung-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="w-full py-3 px-6 border-2 border-gold-dark text-gold-dark text-[0.88rem] font-semibold rounded-sm bg-transparent cursor-pointer hover:bg-gold-bg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'PDF wird erstellt\u2026' : 'Ergebnis als PDF herunterladen'}
    </button>
  );
}
