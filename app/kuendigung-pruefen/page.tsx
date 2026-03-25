'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ───── Types ───── */
interface Answers {
  situation: string;
  wichtigste: string;
  fall: string;
  kuendigungsDatum: string;
  arbeitsBeginn: string;
  mitarbeiter: string;
  gehalt: string;
  rechtsschutz: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  datenschutz: boolean;
}

const initialAnswers: Answers = {
  situation: '',
  wichtigste: '',
  fall: '',
  kuendigungsDatum: new Date().toISOString().slice(0, 10),
  arbeitsBeginn: '',
  mitarbeiter: '',
  gehalt: '3000',
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

function yearsAndMonths(from: string): { years: number; months: number } {
  if (!from) return { years: 0, months: 0 };
  const start = new Date(from);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (now.getDate() < start.getDate() && months > 0) {
    months--;
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

/* ───── Main Component ───── */
export default function KuendigungPruefenPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const progress = (step / 9) * 100;

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const autoAdvance = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    set(key, value);
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  /* Abfindung calculation */
  const betriebsjahre = useMemo(() => {
    const { years, months } = yearsAndMonths(answers.arbeitsBeginn);
    return Math.max(1, years + (months >= 6 ? 1 : 0));
  }, [answers.arbeitsBeginn]);

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
  const handleSubmit = () => {
    if (!answers.email || !answers.datenschutz) return;

    const body = [
      `Situation: ${answers.situation}`,
      `Wichtigstes Anliegen: ${answers.wichtigste}`,
      `Fall: ${answers.fall}`,
      `Kündigungsdatum: ${answers.kuendigungsDatum}`,
      `Arbeitsbeginn: ${answers.arbeitsBeginn}`,
      `Betriebszugehörigkeit: ${betriebsjahre} Jahre`,
      `Mitarbeiter: ${answers.mitarbeiter}`,
      `Bruttogehalt: ${answers.gehalt} €`,
      `Mögliche Abfindung: ${fmt(abfindungMin)} – ${fmt(abfindungMax)}`,
      `Rechtsschutzversicherung: ${answers.rechtsschutz}`,
      ``,
      `Name: ${answers.vorname} ${answers.nachname}`,
      `E-Mail: ${answers.email}`,
      `Telefon: ${answers.telefon || '—'}`,
      `Klagefrist verbleibend: ${fristTage} Tage`,
    ].join('\n');

    const subject = encodeURIComponent(`Kündigungscheck: ${answers.vorname} ${answers.nachname}`);
    const mailBody = encodeURIComponent(body);
    window.location.href = `mailto:bektas@apos.legal?subject=${subject}&body=${mailBody}`;

    setSubmitted(true);
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
      /* ── Step 1 ── */
      case 1:
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              In welcher Situation können wir Ihnen helfen?
            </h2>
            <div className="space-y-3">
              {[
                'Kündigung erhalten',
                'Aufhebungsvertrag erhalten',
                'Abmahnung erhalten',
                'Arbeitszeugnis',
                'Ausstehende Zahlung',
                'Sonstiges',
              ].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.situation === opt}
                  onClick={() => autoAdvance('situation', opt)}
                />
              ))}
            </div>
          </div>
        );

      /* ── Step 2 ── */
      case 2:
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Was ist Ihnen im Moment am wichtigsten?
            </h2>
            <div className="space-y-3">
              {[
                'Eine mögliche Abfindung prüfen',
                'Gegen die Kündigung vorgehen',
                'Anwaltliche Beratung einholen',
              ].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.wichtigste === opt}
                  onClick={() => autoAdvance('wichtigste', opt)}
                />
              ))}
            </div>
          </div>
        );

      /* ── Step 3 ── */
      case 3:
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Welcher Fall trifft auf Sie zu?
            </h2>
            <div className="space-y-3">
              {[
                'Schriftliche Kündigung erhalten',
                'Kündigung erwartet',
              ].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers.fall === opt}
                  onClick={() => autoAdvance('fall', opt)}
                />
              ))}
            </div>
          </div>
        );

      /* ── Step 4 ── */
      case 4:
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wann haben Sie die Kündigung erhalten?
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
                    Nur noch {fristTage} {fristTage === 1 ? 'Tag' : 'Tage'} Zeit für einen möglichen Widerspruch!
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

      /* ── Step 5 ── */
      case 5: {
        const bz = yearsAndMonths(answers.arbeitsBeginn);
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Seit wann arbeiten Sie in Ihrem Unternehmen?
            </h2>
            <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              Erster Arbeitstag
            </label>
            <input
              type="date"
              value={answers.arbeitsBeginn}
              onChange={(e) => set('arbeitsBeginn', e.target.value)}
              className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.95rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] transition-all"
            />
            {answers.arbeitsBeginn && (
              <div className="mt-4 space-y-2">
                <div className="py-3 px-4 bg-gold-bg rounded-sm border border-gold/20">
                  <span className="text-[0.88rem] font-semibold text-gold-dark">
                    Betriebszugehörigkeit: {bz.years} {bz.years === 1 ? 'Jahr' : 'Jahre'} und {bz.months} {bz.months === 1 ? 'Monat' : 'Monate'}
                  </span>
                </div>
                {fristTage > 0 && (
                  <div className="py-3 px-4 bg-cream rounded-sm border border-border">
                    <span className={`text-[0.84rem] font-medium ${fristTage <= 7 ? 'text-red-700' : 'text-ink-muted'}`}>
                      Noch {fristTage} {fristTage === 1 ? 'Tag' : 'Tage'} bis zur Klagefrist
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      /* ── Step 6 ── */
      case 6:
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie viele Mitarbeiter beschäftigt Ihr Unternehmen?
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Mehr als 10 Mitarbeiter', value: '>10' },
                { label: '1–10 Mitarbeiter', value: '1-10' },
              ].map((opt) => (
                <div key={opt.value}>
                  <RadioOption
                    label={opt.label}
                    selected={answers.mitarbeiter === opt.value}
                    onClick={() => autoAdvance('mitarbeiter', opt.value)}
                  />
                </div>
              ))}
            </div>
            {answers.mitarbeiter && (
              <div className={`mt-4 py-4 px-5 rounded-sm border-l-[3px] ${
                answers.mitarbeiter === '>10' ? 'bg-gold-bg border-gold' : 'bg-cream border-gold'
              }`}>
                <p className="text-[0.88rem] text-ink m-0">
                  {answers.mitarbeiter === '>10'
                    ? 'Gut — das Kündigungsschutzgesetz gilt für Sie.'
                    : 'Wichtig: Bei kleinen Betrieben gelten besondere Regeln.'}
                </p>
              </div>
            )}
          </div>
        );

      /* ── Step 7 ── */
      case 7:
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
            {gehaltNum > 0 && answers.arbeitsBeginn && (
              <div className="mt-4 py-5 px-5 bg-gold-bg rounded-sm border-2 border-gold">
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
            )}
          </div>
        );

      /* ── Step 8 ── */
      case 8:
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
                  onClick={() => autoAdvance('rechtsschutz', opt)}
                />
              ))}
            </div>
            <div className="mt-4 py-4 px-5 bg-gold-bg rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.88rem] text-ink m-0">
                Ob mit oder ohne Rechtsschutzversicherung &mdash; wir unterstützen Sie ohne Kostenrisiko!
              </p>
            </div>
          </div>
        );

      /* ── Step 9 ── */
      case 9:
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
              disabled={!answers.email || !answers.datenschutz || !answers.vorname || !answers.nachname}
              className="w-full mt-6 py-4 bg-[#2A1F0E] text-gold border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-[#1C1408] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,31,14,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Jetzt Ergebnis anfordern &rarr;
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

      default:
        return null;
    }
  };

  const canAdvance = () => {
    switch (step) {
      case 4: return !!answers.kuendigungsDatum;
      case 5: return !!answers.arbeitsBeginn;
      case 7: return !!answers.gehalt && gehaltNum > 0;
      default: return true;
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
                Jetzt mögliche Abfindung prüfen
              </span>
              <span className="text-[0.78rem] text-ink-muted">
                Schritt {step} von 9
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

            {/* Navigation buttons for non-auto-advance steps */}
            {[4, 5, 7].includes(step) && (
              <div className="flex items-center justify-between mt-8 gap-4">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
                <button
                  onClick={() => canAdvance() && setStep((s) => s + 1)}
                  disabled={!canAdvance()}
                  className="py-3 px-8 bg-[#2A1F0E] text-gold border-none rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-[#1C1408] hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter &rarr;
                </button>
              </div>
            )}

            {/* Back button for auto-advance steps (except step 1) */}
            {![1, 4, 5, 7, 9].includes(step) && (
              <div className="mt-8">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* Step 9 back button */}
            {step === 9 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep(8)}
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
