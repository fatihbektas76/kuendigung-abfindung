'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ───── Types ───── */
interface Answers {
  fall: string;
  kuendigungErwartet: string;
  tage21: string;
  kuendigungsDatum: string;
  sechsMonate: string;
  mitarbeiter: string;
  besondereUmstaende: string;
  umstandBekannt: string;
  besondereRolle: string;
  rolleBekannt: string;
  arbeitsBeginnMonat: string;
  arbeitsBeginnJahr: string;
  gehalt: string;
  rechtsschutz: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  datenschutz: boolean;
}

const initialAnswers: Answers = {
  fall: '',
  kuendigungErwartet: '',
  tage21: '',
  kuendigungsDatum: new Date().toISOString().slice(0, 10),
  sechsMonate: '',
  mitarbeiter: '',
  besondereUmstaende: '',
  umstandBekannt: '',
  besondereRolle: '',
  rolleBekannt: '',
  arbeitsBeginnMonat: '',
  arbeitsBeginnJahr: '',
  gehalt: '',
  rechtsschutz: '',
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  datenschutz: false,
};

/* ───── Helpers ───── */
function daysBetween(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function yearsAndMonths(monat: string, jahr: string): { years: number; months: number } {
  if (!monat || !jahr) return { years: 0, months: 0 };
  const start = new Date(parseInt(jahr), parseInt(monat) - 1, 1);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years: Math.max(0, years), months: Math.max(0, months) };
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ───── Radio Option Component ───── */
function RadioOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left py-4 px-5 rounded-sm border-2 font-sans text-[0.95rem] font-medium cursor-pointer transition-all ${
        selected
          ? 'border-gold bg-gold-bg text-ink'
          : 'border-border bg-white text-ink hover:border-gold/50'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? 'border-gold' : 'border-border'
          }`}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-gold" />}
        </span>
        {label}
      </span>
    </button>
  );
}

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const pruefenFaqs = [
  {
    q: 'Wie lange dauert die kostenlose Prüfung?',
    a: 'Die Online-Einschätzung dauert nur 2 Minuten. Innerhalb von 24 Stunden erhalten Sie eine persönliche Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
  },
  {
    q: 'Ist die Prüfung wirklich kostenlos?',
    a: 'Ja, die Ersteinschätzung ist 100% kostenlos und unverbindlich. Es entstehen keine versteckten Kosten. Erst wenn Sie sich für eine anwaltliche Vertretung entscheiden, fallen Gebühren an — die bei Rechtsschutzversicherung oft vollständig übernommen werden.',
  },
  {
    q: 'Welche 3-Wochen-Frist muss ich beachten?',
    a: 'Nach §4 KSchG müssen Sie innerhalb von 3 Wochen nach Zugang der Kündigung Kündigungsschutzklage beim Arbeitsgericht erheben. Versäumen Sie diese Frist, gilt die Kündigung als wirksam — unabhängig davon, ob sie rechtmäßig war.',
  },
];

/* ───── Step Progress Config ───── */
type StepId = 'S1' | 'S1b' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S6a' | 'S6b' | 'S6c' | 'S7' | 'S8' | 'S9' | 'S10' | 'KEIN';

const MONATE = [
  { value: '1', label: 'Januar' },
  { value: '2', label: 'Februar' },
  { value: '3', label: 'März' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mai' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Dezember' },
];

function getStepProgress(s: StepId): { idx: number; total: number; cat: string } {
  switch (s) {
    case 'S1':   return { idx: 1, total: 10, cat: 'Ihre Situation' };
    case 'S1b':  return { idx: 2, total: 5,  cat: 'Ihre Situation' };
    case 'S2':   return { idx: 1, total: 10, cat: 'Ihre Situation' };
    case 'S3':   return { idx: 3, total: 10, cat: 'Ihr Arbeitsverhältnis' };
    case 'S4':   return { idx: 4, total: 10, cat: 'Ihr Arbeitsverhältnis' };
    case 'S5':   return { idx: 5, total: 10, cat: 'Ihr Arbeitsverhältnis' };
    case 'S6':   return { idx: 6, total: 10, cat: 'Sonderschutz' };
    case 'S6a':  return { idx: 7, total: 10, cat: 'Sonderschutz' };
    case 'S6b':  return { idx: 7, total: 10, cat: 'Sonderschutz' };
    case 'S6c':  return { idx: 8, total: 10, cat: 'Sonderschutz' };
    case 'S7':   return { idx: 8, total: 10, cat: 'Ihre Abfindung' };
    case 'S8':   return { idx: 9, total: 10, cat: 'Ihre Abfindung' };
    case 'S9':   return { idx: 9, total: 10, cat: 'Fast fertig' };
    case 'S10':  return { idx: 10, total: 10, cat: 'Ihre Kontaktdaten' };
    case 'KEIN': return { idx: 6, total: 10, cat: 'Ergebnis' };
    default:     return { idx: 1, total: 10, cat: '' };
  }
}

/* ───── Main Component ───── */
export default function KuendigungPruefenPage() {
  const [step, setStep] = useState<StepId>('S1');
  const [, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warn21, setWarn21] = useState(false);

  const { idx, total, cat } = getStepProgress(step);
  const progress = (idx / total) * 100;

  const currentYear = new Date().getFullYear();
  const jahre = Array.from({ length: 41 }, (_, i) => currentYear - i);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const goTo = (next: StepId) => {
    setHistory((prev) => [...prev, step]);
    setStep(next);
  };

  const goBack = () => {
    setHistory((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) setStep(last);
      return copy;
    });
  };

  const autoAdvance = <K extends keyof Answers>(key: K, value: Answers[K], next: StepId) => {
    set(key, value);
    setTimeout(() => goTo(next), 300);
  };

  /* Abfindung calculation */
  const betriebsjahre = useMemo(() => {
    const { years, months } = yearsAndMonths(answers.arbeitsBeginnMonat, answers.arbeitsBeginnJahr);
    return Math.max(1, years + (months >= 6 ? 1 : 0));
  }, [answers.arbeitsBeginnMonat, answers.arbeitsBeginnJahr]);

  const gehaltNum = parseFloat(answers.gehalt.replace(/\./g, '').replace(',', '.')) || 0;
  const abfindungMin = gehaltNum * 0.5 * betriebsjahre;
  const abfindungMax = gehaltNum * 1.5 * betriebsjahre;

  /* Frist calculation */
  const fristTage = useMemo(() => {
    if (!answers.kuendigungsDatum) return 21;
    const days = daysBetween(answers.kuendigungsDatum, new Date().toISOString().slice(0, 10));
    return 21 - days;
  }, [answers.kuendigungsDatum]);

  /* Submit handler */
  const handleSubmit = async () => {
    if (!answers.email || !answers.datenschutz || loading) return;
    setLoading(true);

    const message = [
      `Fall: ${answers.fall}`,
      answers.kuendigungErwartet ? `Kündigung erwartet: ${answers.kuendigungErwartet}` : '',
      answers.kuendigungsDatum ? `Kündigungsdatum: ${answers.kuendigungsDatum}` : '',
      answers.sechsMonate ? `Länger als 6 Monate beschäftigt: ${answers.sechsMonate}` : '',
      answers.mitarbeiter ? `Mehr als 10 Mitarbeiter: ${answers.mitarbeiter}` : '',
      answers.besondereUmstaende ? `Besondere Umstände: ${answers.besondereUmstaende}` : '',
      answers.umstandBekannt ? `Umstand AG bekannt: ${answers.umstandBekannt}` : '',
      answers.besondereRolle ? `Besondere Rolle: ${answers.besondereRolle}` : '',
      answers.rolleBekannt ? `Rolle AG bekannt: ${answers.rolleBekannt}` : '',
      answers.arbeitsBeginnMonat && answers.arbeitsBeginnJahr ? `Arbeitsbeginn: ${answers.arbeitsBeginnMonat}/${answers.arbeitsBeginnJahr}` : '',
      `Betriebszugehörigkeit: ${betriebsjahre} Jahre`,
      answers.gehalt ? `Bruttogehalt: ${answers.gehalt} €` : '',
      abfindungMin > 0 ? `Mögliche Abfindung: ${fmt(abfindungMin)} – ${fmt(abfindungMax)}` : '',
      answers.rechtsschutz ? `Rechtsschutzversicherung: ${answers.rechtsschutz}` : '',
      fristTage < 21 ? `Klagefrist verbleibend: ${fristTage} Tage` : '',
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${answers.vorname} ${answers.nachname}`,
          email: answers.email,
          phone: answers.telefon || undefined,
          disputeType: answers.fall === 'Kündigung erhalten' ? 'kuendigung' : answers.fall === 'Kündigung erwartet' ? 'kuendigung' : 'abfindung',
          message: `[Kündigungscheck]\n\n${message}`,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setLoading(false);
      alert('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an bektas@apos.legal');
    }
  };

  /* canAdvance for manual steps */
  const canAdvance = () => {
    switch (step) {
      case 'S3': return !!answers.kuendigungsDatum;
      case 'S7': return !!answers.arbeitsBeginnMonat && !!answers.arbeitsBeginnJahr;
      case 'S8': return !!answers.gehalt && gehaltNum > 0;
      default: return true;
    }
  };

  const manualSteps: StepId[] = ['S3', 'S7', 'S8'];
  const autoAdvanceSteps: StepId[] = ['S1', 'S1b', 'S2', 'S4', 'S5', 'S6', 'S6a', 'S6b', 'S6c', 'S9'];

  const getNextManualStep = (): StepId => {
    switch (step) {
      case 'S3': return 'S4';
      case 'S7': return 'S8';
      case 'S8': return 'S9';
      default: return 'S1';
    }
  };

  /* ───── Sidebar ───── */
  const sidebar = (
    <aside className="hidden lg:flex flex-col w-[320px] min-w-[320px] bg-white border-r border-border p-8 min-h-screen">
      <Link href="/" className="flex items-center gap-3 no-underline mb-10">
        <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={140} height={48} className="h-9 w-auto" priority />
      </Link>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-4">
          Unsere Vorteile
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">Kostenfrei &amp; unverbindlich</div>
              <div className="text-[0.78rem] text-ink-muted">Keine versteckten Kosten</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">Schnell</div>
              <div className="text-[0.78rem] text-ink-muted">In 2 min Online-Einschätzung</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">100% Datensicherheit</div>
              <div className="text-[0.78rem] text-ink-muted">SSL-verschlüsselt</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
          Hilfe und Kontakt
        </div>
        <div className="space-y-2">
          <a href="tel:+4915127003173" className="block text-[0.88rem] text-ink no-underline hover:text-gold transition-colors">
            +49 151 2700 3173
          </a>
          <a href="mailto:bektas@apos.legal" className="block text-[0.88rem] text-ink no-underline hover:text-gold transition-colors">
            bektas@apos.legal
          </a>
        </div>
      </div>

      <div className="mb-8 py-4 px-4 bg-cream rounded-sm border border-border">
        <p className="text-[0.75rem] text-ink-muted leading-relaxed m-0">
          <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung.
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-1 text-gold text-[1rem]">
          {'★★★★★'}
        </div>
        <div className="text-[0.82rem] text-ink-muted mt-1">
          5,0 &middot; 68 Bewertungen
        </div>
      </div>
    </aside>
  );

  /* ───── Thank You ───── */
  if (submitted) {
    return (
      <div className="flex min-h-screen bg-cream">
        {sidebar}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-[520px] text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="#A68B4B" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-serif text-[1.8rem] font-bold text-ink mb-3">
              Vielen Dank!
            </h1>
            <p className="text-[1rem] text-ink-muted leading-relaxed mb-6">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen mit einer kostenlosen Ersteinschätzung.
            </p>
            {abfindungMin > 0 && (
              <div className="py-5 px-6 bg-white rounded-sm border border-border mb-6">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Ihre geschätzte Abfindung
                </div>
                <div className="font-serif text-[1.4rem] font-bold text-ink">
                  {fmt(abfindungMin)} &ndash; {fmt(abfindungMax)}
                </div>
                <div className="text-[0.78rem] text-ink-muted mt-1">
                  Basierend auf {betriebsjahre} {betriebsjahre === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit
                </div>
              </div>
            )}
            <a
              href="https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px"
            >
              Telefontermin buchen &rarr;
            </a>
            <div className="mt-4">
              <Link href="/" className="text-[0.88rem] text-ink-muted no-underline hover:text-gold transition-colors">
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── Step Content ───── */
  const stepContent = () => {
    switch (step) {
      /* ── S1 ── */
      case 'S1':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Welcher Fall trifft auf Sie zu?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Kündigung erhalten"
                selected={answers.fall === 'Kündigung erhalten'}
                onClick={() => autoAdvance('fall', 'Kündigung erhalten', 'S2')}
              />
              <RadioOption
                label="Kündigung erwartet"
                selected={answers.fall === 'Kündigung erwartet'}
                onClick={() => autoAdvance('fall', 'Kündigung erwartet', 'S1b')}
              />
              <RadioOption
                label="Abfindung berechnen"
                selected={answers.fall === 'Abfindung berechnen'}
                onClick={() => autoAdvance('fall', 'Abfindung berechnen', 'S7')}
              />
            </div>
          </div>
        );

      /* ── S1b ── */
      case 'S1b':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wann erwarten Sie Ihre Kündigung?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="In den nächsten 30 Tagen"
                selected={answers.kuendigungErwartet === 'In den nächsten 30 Tagen'}
                onClick={() => autoAdvance('kuendigungErwartet', 'In den nächsten 30 Tagen', 'S7')}
              />
              <RadioOption
                label="Ich weiß es noch nicht"
                selected={answers.kuendigungErwartet === 'Ich weiß es noch nicht'}
                onClick={() => autoAdvance('kuendigungErwartet', 'Ich weiß es noch nicht', 'S7')}
              />
            </div>
          </div>
        );

      /* ── S2 ── */
      case 'S2':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Sind bereits mehr als 21 Tage seit Erhalt der Kündigung vergangen?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja"
                selected={answers.tage21 === 'Ja'}
                onClick={() => {
                  set('tage21', 'Ja');
                  setWarn21(true);
                  setTimeout(() => goTo('S3'), 300);
                }}
              />
              <RadioOption
                label="Nein"
                selected={answers.tage21 === 'Nein'}
                onClick={() => {
                  set('tage21', 'Nein');
                  setWarn21(false);
                  setTimeout(() => goTo('S3'), 300);
                }}
              />
            </div>
          </div>
        );

      /* ── S3 ── */
      case 'S3':
        return (
          <div>
            {warn21 && (
              <div className="mb-6 py-4 px-5 bg-red-50 rounded-sm border-l-[3px] border-red-500">
                <p className="text-[0.92rem] font-semibold text-red-700 m-0">
                  ⚠ Achtung: Die 3-Wochen-Frist könnte abgelaufen sein &mdash; handeln Sie jetzt sofort.
                </p>
              </div>
            )}
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wann wurde Ihnen die Kündigung zugestellt?
            </h2>
            <input
              type="date"
              value={answers.kuendigungsDatum}
              onChange={(e) => set('kuendigungsDatum', e.target.value)}
              className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
            />
            {answers.kuendigungsDatum && (
              <div
                className={`mt-4 py-4 px-5 rounded-sm border-l-[3px] ${
                  fristTage <= 0
                    ? 'bg-red-50 border-red-500'
                    : fristTage <= 7
                    ? 'bg-red-50 border-red-500'
                    : 'bg-gold-bg border-gold'
                }`}
              >
                {fristTage > 0 ? (
                  <p className={`text-[0.92rem] font-semibold m-0 ${fristTage <= 7 ? 'text-red-700' : 'text-gold-dark'}`}>
                    Nur noch {fristTage} {fristTage === 1 ? 'Tag' : 'Tage'} Zeit Einreichung einer Kündigungsschutzklage!
                  </p>
                ) : (
                  <p className="text-[0.92rem] font-semibold text-red-700 m-0">
                    Frist abgelaufen &mdash; trotzdem kontaktieren!
                  </p>
                )}
                <p className="text-[0.78rem] text-ink-muted mt-1 m-0">
                  Die 3-Wochen-Klagefrist nach &sect;4 KSchG beginnt ab Zugang der Kündigung.
                </p>
              </div>
            )}
          </div>
        );

      /* ── S4 ── */
      case 'S4':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Arbeiten Sie bereits länger als 6 Monate bei Ihrem Arbeitgeber?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja"
                selected={answers.sechsMonate === 'Ja'}
                onClick={() => autoAdvance('sechsMonate', 'Ja', 'S5')}
              />
              <RadioOption
                label="Nein"
                selected={answers.sechsMonate === 'Nein'}
                onClick={() => autoAdvance('sechsMonate', 'Nein', 'KEIN')}
              />
            </div>
          </div>
        );

      /* ── S5 ── */
      case 'S5':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie viele Vollzeit-Mitarbeiter beschäftigt Ihr Unternehmen?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mehr als 10 Mitarbeiter"
                selected={answers.mitarbeiter === 'Ja, mehr als 10 Mitarbeiter'}
                onClick={() => autoAdvance('mitarbeiter', 'Ja, mehr als 10 Mitarbeiter', 'S6')}
              />
              <RadioOption
                label="Nein, 10 oder weniger Mitarbeiter"
                selected={answers.mitarbeiter === 'Nein, 10 oder weniger Mitarbeiter'}
                onClick={() => autoAdvance('mitarbeiter', 'Nein, 10 oder weniger Mitarbeiter', 'KEIN')}
              />
            </div>
          </div>
        );

      /* ── S6 ── */
      case 'S6':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Liegen bei Ihnen besondere Umstände vor?
            </h2>
            <div className="space-y-3">
              {['Schwerbehinderung', 'Elternzeit', 'Pflegezeit', 'Schwangerschaft'].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.besondereUmstaende === opt}
                  onClick={() => autoAdvance('besondereUmstaende', opt, 'S6a')}
                />
              ))}
              <RadioOption
                label="Nein / Keiner davon"
                selected={answers.besondereUmstaende === 'Nein / Keiner davon'}
                onClick={() => autoAdvance('besondereUmstaende', 'Nein / Keiner davon', 'S6b')}
              />
            </div>
          </div>
        );

      /* ── S6a ── */
      case 'S6a':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist dieser Umstand dem Arbeitgeber bekannt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, ist bekannt"
                selected={answers.umstandBekannt === 'Ja, ist bekannt'}
                onClick={() => autoAdvance('umstandBekannt', 'Ja, ist bekannt', 'S6b')}
              />
              <RadioOption
                label="Nein, ist nicht bekannt"
                selected={answers.umstandBekannt === 'Nein, ist nicht bekannt'}
                onClick={() => autoAdvance('umstandBekannt', 'Nein, ist nicht bekannt', 'S6b')}
              />
            </div>
            {answers.umstandBekannt === 'Nein, ist nicht bekannt' && (
              <div className="mt-4 py-4 px-5 bg-gold-bg rounded-sm border-l-[3px] border-gold">
                <p className="text-[0.88rem] text-ink m-0">
                  Wichtig: Teilen Sie diesen Umstand Ihrem Arbeitgeber unverzüglich mit, um den Sonderschutz zu sichern.
                </p>
              </div>
            )}
          </div>
        );

      /* ── S6b ── */
      case 'S6b':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Haben Sie eine besondere Rolle im Unternehmen?
            </h2>
            <div className="space-y-3">
              {[
                'Betriebsratsmitglied',
                'Datenschutzbeauftragter',
                'Immissionsschutzbeauftragter',
                'Auszubildende(r) außerhalb der Probezeit',
                'Jugend- und Auszubildendenvertreter',
                'Andere geschützte Rollen',
              ].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.besondereRolle === opt}
                  onClick={() => autoAdvance('besondereRolle', opt, 'S6c')}
                />
              ))}
              <RadioOption
                label="Nein"
                selected={answers.besondereRolle === 'Nein'}
                onClick={() => autoAdvance('besondereRolle', 'Nein', 'S7')}
              />
            </div>
          </div>
        );

      /* ── S6c ── */
      case 'S6c':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist dieser Umstand dem Arbeitgeber bekannt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, ist bekannt"
                selected={answers.rolleBekannt === 'Ja, ist bekannt'}
                onClick={() => autoAdvance('rolleBekannt', 'Ja, ist bekannt', 'S7')}
              />
              <RadioOption
                label="Nein, ist nicht bekannt"
                selected={answers.rolleBekannt === 'Nein, ist nicht bekannt'}
                onClick={() => autoAdvance('rolleBekannt', 'Nein, ist nicht bekannt', 'S7')}
              />
            </div>
          </div>
        );

      /* ── S7 ── */
      case 'S7':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Seit wann sind Sie im Unternehmen beschäftigt?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Monat
                </label>
                <select
                  value={answers.arbeitsBeginnMonat}
                  onChange={(e) => set('arbeitsBeginnMonat', e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                >
                  <option value="">&mdash;</option>
                  {MONATE.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Jahr
                </label>
                <select
                  value={answers.arbeitsBeginnJahr}
                  onChange={(e) => set('arbeitsBeginnJahr', e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                >
                  <option value="">&mdash;</option>
                  {jahre.map((j) => (
                    <option key={j} value={String(j)}>{j}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      /* ── S8 ── */
      case 'S8':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie hoch ist Ihr Monatsgehalt (brutto)?
            </h2>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={answers.gehalt}
                onChange={(e) => set('gehalt', e.target.value)}
                placeholder="z. B. 4.000"
                className="w-full py-3 px-4 pr-10 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted text-[0.92rem]">&euro;</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                gehaltNum > 0 ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="py-5 px-5 bg-gold-bg rounded-sm border-2 border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Mögliche Abfindung
                </div>
                <div className="font-serif text-[1.4rem] font-bold text-gold-dark">
                  {fmt(abfindungMin)} &ndash; {fmt(abfindungMax)}
                </div>
                <div className="text-[0.78rem] text-ink-muted mt-1">
                  Basierend auf {betriebsjahre} {betriebsjahre === 1 ? 'Jahr' : 'Jahren'} &times; {answers.gehalt} &euro; Brutto
                </div>
              </div>
            </div>
          </div>
        );

      /* ── S9 ── */
      case 'S9':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Sind Sie rechtsschutzversichert?
            </h2>
            <div className="space-y-3">
              {['Ja', 'Nein', 'Unsicher'].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.rechtsschutz === opt}
                  onClick={() => autoAdvance('rechtsschutz', opt, 'S10')}
                />
              ))}
            </div>
            <div className="mt-4 py-4 px-5 bg-gold-bg rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.88rem] text-ink m-0">
                Kein Problem, auch wenn Sie keine Rechtsschutzversicherung haben &mdash; wir unterstützen Sie trotzdem und finden gemeinsam eine passende Lösung für Sie.
              </p>
            </div>
          </div>
        );

      /* ── S10 ── */
      case 'S10':
        return (
          <div>
            <div className="inline-block py-1 px-3 bg-gold-bg border border-gold/20 rounded-full text-[0.78rem] font-semibold text-gold-dark mb-4">
              Fast geschafft!
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wohin soll die kostenlose Ersteinschätzung gehen?
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Vorname <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={answers.vorname}
                    onChange={(e) => set('vorname', e.target.value)}
                    placeholder="Max"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Nachname <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={answers.nachname}
                    onChange={(e) => set('nachname', e.target.value)}
                    placeholder="Mustermann"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  E-Mail <span className="text-gold-dark">*</span>
                </label>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="max@beispiel.de"
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Telefon <span className="text-ink-muted font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={answers.telefon}
                  onChange={(e) => set('telefon', e.target.value)}
                  placeholder="+49 151 ..."
                  className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers.datenschutz}
                  onChange={(e) => set('datenschutz', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-gold"
                />
                <span className="text-[0.82rem] text-ink-muted leading-relaxed">
                  Ich habe die{' '}
                  <Link href="/privacy-policy" className="text-gold no-underline hover:underline" target="_blank">
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen und stimme der Verarbeitung meiner Daten zu. <span className="text-gold-dark">*</span>
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!answers.email || !answers.datenschutz || !answers.vorname || !answers.nachname || loading}
              className="w-full mt-6 py-4 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-[#1C1408] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,31,14,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? 'Wird gesendet...' : 'Jetzt Ergebnis anfordern \u2192'}
            </button>

            <div className="flex items-center justify-center gap-6 mt-4">
              <span className="flex items-center gap-1.5 text-[0.78rem] text-ink-muted">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
                100% Kostenfrei
              </span>
              <span className="flex items-center gap-1.5 text-[0.78rem] text-ink-muted">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                SSL Secure
              </span>
            </div>
          </div>
        );

      /* ── KEIN ── */
      case 'KEIN':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Die Kündigung könnte wirksam sein.
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">
              Bei Betrieben mit bis zu 10 Mitarbeitern oder einer Beschäftigung unter 6 Monaten greift das Kündigungsschutzgesetz nicht.
              Dennoch können andere Ansprüche bestehen &mdash; z.&nbsp;B. ausstehende Vergütung, Zeugnis oder Sonderkündigungsschutz. Wir empfehlen daher dringend eine anwaltliche Beratung.
            </p>
            <button
              onClick={() => goTo('S10')}
              className="w-full py-4 bg-[#8B7A3A] text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-[#6B6626] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(139,122,58,0.3)]"
            >
              Trotzdem kostenlos prüfen lassen &rarr;
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ───── Render ───── */
  return (
    <div className="flex min-h-screen bg-cream">
      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Kündigung prüfen', item: `${BASE_URL}/kuendigung-pruefen` },
            ],
          }),
        }}
      />

      {/* Schema.org - WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kündigungscheck — Kündigung kostenlos prüfen',
            applicationCategory: 'Legal Tool',
            operatingSystem: 'Any',
            url: `${BASE_URL}/kuendigung-pruefen`,
            description:
              'Kostenloser Kündigungscheck: Prüfen Sie in 2 Minuten Ihre Abfindungschancen. Ersteinschätzung vom Fachanwalt für Arbeitsrecht — 100% kostenlos & unverbindlich.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            provider: {
              '@id': `${BASE_URL}/#organization`,
            },
            datePublished: '2025-01-15',
            dateModified: new Date().toISOString().slice(0, 10),
            inLanguage: 'de',
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: pruefenFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* Schema.org - HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Kündigung kostenlos prüfen lassen — in 2 Minuten',
            description:
              'Prüfen Sie in 9 Schritten kostenlos Ihre Abfindungschancen nach einer Kündigung. Ersteinschätzung vom Fachanwalt für Arbeitsrecht.',
            totalTime: 'PT2M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Situation beschreiben',
                text: 'Wählen Sie Ihre Situation: Kündigung, Aufhebungsvertrag, Abmahnung oder anderes.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Angaben zu Beschäftigung machen',
                text: 'Geben Sie Kündigungsdatum, Arbeitsbeginn, Unternehmensgröße und Bruttogehalt ein.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Ergebnis erhalten',
                text: 'Sie erhalten sofort eine Abfindungsschätzung und innerhalb von 24 Stunden eine persönliche Ersteinschätzung vom Fachanwalt.',
              },
            ],
          }),
        }}
      />

      {sidebar}

      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between py-4 px-6 bg-white border-b border-border">
          <Link href="/" className="flex items-center no-underline">
            <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={120} height={40} className="h-8 w-auto" priority />
          </Link>
          <a href="tel:+4915127003173" className="text-[0.82rem] font-semibold text-gold-dark no-underline">
            +49 151 2700 3173
          </a>
        </div>

        {/* Progress bar */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[640px] mx-auto px-6 py-4">
            <h1 className="sr-only">Kündigung kostenlos prüfen lassen — Ersteinschätzung in 2 Minuten</h1>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.78rem] font-semibold text-gold-dark">
                {cat}
              </span>
              <span className="text-[0.78rem] text-ink-muted">
                Schritt {idx} von {total}
              </span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 flex items-start justify-center px-6 py-10">
          <div className="w-full max-w-[540px]">
            {stepContent()}

            {/* Manual steps: Zurück + Weiter */}
            {manualSteps.includes(step) && (
              <div className="flex items-center justify-between mt-8 gap-4">
                <button
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
                <button
                  onClick={() => canAdvance() && goTo(getNextManualStep())}
                  disabled={!canAdvance()}
                  className="py-3 px-8 bg-[#2A1F0E] text-gold border-none rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-[#1C1408] hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter &rarr;
                </button>
              </div>
            )}

            {/* Auto-advance back button (except S1) */}
            {autoAdvanceSteps.includes(step) && step !== 'S1' && (
              <div className="mt-8">
                <button
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* S10 back button */}
            {step === 'S10' && (
              <div className="mt-4 text-center">
                <button
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* KEIN back button */}
            {step === 'KEIN' && (
              <div className="mt-4 text-center">
                <button
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
