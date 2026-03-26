'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StandAnzeige from '@/components/StandAnzeige';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

/* ───── Types ───── */
interface AufhebungsAnswer {
  abfindungVorhanden: string;
  abfindungHoehe: string;
  abfindungZeitpunkt: string;
  bonusGeregelt: string;
  urlaubGeregelt: string;
  widerrufsfrist: string;
  sperrzeitHinweis: string;
  ausschlussfrist: string;
  freistellungArt: string;
  privatVersichert: string;
  zeugnisVereinbart: string;
  zeugnisdatum: string;
  wettbewerbsverbot: string;
  karenzentschaedigung: string;
  sonderschutz: string;
  sonderschutzEinbezogen: string;
  bedenkzeit: string;
  druckAusgeubt: string;
}

const initialAnswers: AufhebungsAnswer = {
  abfindungVorhanden: '',
  abfindungHoehe: '',
  abfindungZeitpunkt: '',
  bonusGeregelt: '',
  urlaubGeregelt: '',
  widerrufsfrist: '',
  sperrzeitHinweis: '',
  ausschlussfrist: '',
  freistellungArt: '',
  privatVersichert: '',
  zeugnisVereinbart: '',
  zeugnisdatum: '',
  wettbewerbsverbot: '',
  karenzentschaedigung: '',
  sonderschutz: '',
  sonderschutzEinbezogen: '',
  bedenkzeit: '',
  druckAusgeubt: '',
};

/* ───── Score helpers ───── */
type ScoreColor = 'green' | 'yellow' | 'red' | 'skip';

interface StepScore {
  step: string;
  category: number;
  color: ScoreColor;
}

function scoreToPoints(c: ScoreColor): number {
  if (c === 'green') return 2;
  if (c === 'yellow') return 1;
  return 0;
}

/* ───── Radio Option Component (1:1 from kuendigung-pruefen) ───── */
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

/* ───── Info Box Component ───── */
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 py-4 px-5 bg-gold-bg rounded-sm border-l-[3px] border-gold">
      <p className="text-[0.88rem] text-ink leading-relaxed m-0">{children}</p>
    </div>
  );
}

/* ───── Constants ───── */
type StepId =
  | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9'
  | 'S10' | 'S11' | 'S12' | 'S13' | 'S14' | 'S15' | 'S16' | 'S17' | 'S18'
  | 'ERGEBNIS';

const CATEGORIES = [
  'Abfindung',
  'Vergütung & Urlaub',
  'Fristen & Sperrzeit',
  'Freistellung',
  'Zeugnis',
  'Wettbewerbsverbot',
  'Besonderer Schutz',
  'Verhandlung & Druck',
] as const;

function getCategoryForStep(s: StepId): { idx: number; catName: string } {
  switch (s) {
    case 'S1': case 'S2': case 'S3':
      return { idx: 1, catName: 'Abfindung' };
    case 'S4': case 'S5':
      return { idx: 2, catName: 'Vergütung & Urlaub' };
    case 'S6': case 'S7': case 'S8':
      return { idx: 3, catName: 'Fristen & Sperrzeit' };
    case 'S9': case 'S10':
      return { idx: 4, catName: 'Freistellung' };
    case 'S11': case 'S12':
      return { idx: 5, catName: 'Zeugnis' };
    case 'S13': case 'S14':
      return { idx: 6, catName: 'Wettbewerbsverbot' };
    case 'S15': case 'S16':
      return { idx: 7, catName: 'Besonderer Schutz' };
    case 'S17': case 'S18':
      return { idx: 8, catName: 'Verhandlung & Druck' };
    case 'ERGEBNIS':
      return { idx: 8, catName: 'Ergebnis' };
    default:
      return { idx: 1, catName: '' };
  }
}

/* ───── FAQ data ───── */
const faqs = [
  {
    q: 'Muss ich einen Aufhebungsvertrag unterschreiben?',
    a: 'Nein. Ein Aufhebungsvertrag kommt nur durch beidseitige Zustimmung zustande. Sie können ablehnen — dann muss der Arbeitgeber kündigen, wenn er das Arbeitsverhältnis beenden will. Eine Kündigung gibt Ihnen mehr Rechte: 3-Wochen-Klagefrist, KSchG-Schutz und kein automatisches Sperrzeit-Risiko beim ALG I.',
  },
  {
    q: 'Kann ich einen Aufhebungsvertrag rückgängig machen?',
    a: 'Nur unter engen Voraussetzungen: bei widerrechtlicher Drohung (§123 BGB, Frist: 1 Jahr) oder bei Verstoß gegen das Gebot fairen Verhandelns (BAG 6 AZR 75/18). Ein gesetzliches Widerrufsrecht wie bei Verbraucherverträgen gibt es nicht — es sei denn, es ist vertraglich vereinbart.',
  },
  {
    q: 'Droht immer eine Sperrzeit beim Arbeitslosengeld?',
    a: 'Grundsätzlich ja. Bei Aufhebungsverträgen verhängt die Agentur für Arbeit regelmäßig eine 12-wöchige Sperrzeit (§159 SGB III), weil der Arbeitnehmer das Arbeitsverhältnis „selbst aufgelöst" hat. Ausnahmen: drohende betriebsbedingte Kündigung oder wichtiger persönlicher Grund. Eine anwaltliche Beratung kann helfen, die Sperrzeit durch geeignete Formulierung zu vermeiden.',
  },
  {
    q: 'Was ist das Gebot fairen Verhandelns?',
    a: 'Das BAG hat entschieden, dass Arbeitgeber beim Abschluss von Aufhebungsverträgen fair verhandeln müssen. Eine psychische Drucksituation — etwa ein unangekündigter Besuch beim erkrankten Arbeitnehmer oder unmittelbarer Unterschriftsdruck ohne jede Bedenkzeit — kann zur Unwirksamkeit des Vertrags führen (BAG 6 AZR 75/18, BAG 6 AZR 333/21).',
  },
  {
    q: 'Wie hoch sollte die Abfindung sein?',
    a: 'Es gibt keinen gesetzlichen Anspruch auf eine bestimmte Abfindungshöhe. In der Praxis hat sich die Faustformel von 0,5 Bruttomonatsgehältern pro Beschäftigungsjahr etabliert. Bei starkem Kündigungsschutz, Verfahrensfehlern des Arbeitgebers oder besonderen Schutztatbeständen sind deutlich höhere Beträge erzielbar. Lassen Sie Ihre Verhandlungsposition prüfen.',
  },
  {
    q: 'Was gilt beim Wettbewerbsverbot ohne Karenzentschädigung?',
    a: 'Ein nachvertragliches Wettbewerbsverbot ohne Karenzentschädigung von mindestens 50% des letzten Bruttogehalts ist nach §74 HGB unverbindlich. Sie müssen es nicht einhalten — haben dann aber auch keinen Anspruch auf Zahlung. Ob Sie das Verbot trotzdem respektieren wollen, hängt von Ihrer konkreten Situation ab.',
  },
];

/* ───── Main Component ───── */
export default function AufhebungsvertragPruefenPage() {
  const [step, setStep] = useState<StepId>('S1');
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<AufhebungsAnswer>(initialAnswers);
  const [scores, setScores] = useState<StepScore[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { idx: catIdx, catName } = getCategoryForStep(step);
  const progress = step === 'ERGEBNIS' ? 100 : (catIdx / 8) * 100;

  const set = <K extends keyof AufhebungsAnswer>(key: K, value: AufhebungsAnswer[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const addScore = (stepName: string, category: number, color: ScoreColor) => {
    setScores((prev) => {
      const filtered = prev.filter((s) => s.step !== stepName);
      return [...filtered, { step: stepName, category, color }];
    });
  };

  const goTo = (next: StepId) => {
    setHistory((prev) => [...prev, step]);
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setHistory((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) setStep(last);
      return copy;
    });
  };

  const autoAdvance = <K extends keyof AufhebungsAnswer>(
    key: K,
    value: AufhebungsAnswer[K],
    next: StepId,
    stepName: string,
    category: number,
    color: ScoreColor,
  ) => {
    set(key, value);
    addScore(stepName, category, color);
    setTimeout(() => goTo(next), 300);
  };

  const resetAll = () => {
    setStep('S1');
    setHistory([]);
    setAnswers(initialAnswers);
    setScores([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ───── Result calculation ───── */
  const result = useMemo(() => {
    const validScores = scores.filter((s) => s.color !== 'skip');
    const totalPoints = validScores.reduce((sum, s) => sum + scoreToPoints(s.color), 0);
    const maxPoints = validScores.length * 2;
    const pct = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

    const catScores = CATEGORIES.map((name, i) => {
      const catItems = validScores.filter((s) => s.category === i + 1);
      if (catItems.length === 0) return { name, color: 'green' as const, avg: 1 };
      const avg = catItems.reduce((sum, s) => sum + scoreToPoints(s.color), 0) / (catItems.length * 2);
      const color: 'green' | 'yellow' | 'red' = avg >= 0.75 ? 'green' : avg >= 0.4 ? 'yellow' : 'red';
      return { name, color, avg };
    });

    return { pct, catScores };
  }, [scores]);

  /* ───── Sidebar ───── */
  const sidebar = (
    <aside className="hidden lg:flex flex-col w-[320px] min-w-[320px] bg-white border-r border-border p-8 min-h-screen">
      <Link href="/" className="flex items-center gap-3 no-underline mb-10">
        <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={140} height={48} className="h-9 w-auto" priority />
      </Link>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-4">
          Der Checker prüft
        </div>
        <div className="space-y-3">
          {CATEGORIES.map((cat, i) => {
            const done = catIdx > i + 1 || step === 'ERGEBNIS';
            const active = catIdx === i + 1 && step !== 'ERGEBNIS';
            return (
              <div key={cat} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center text-[0.65rem] font-bold transition-all ${
                    done
                      ? 'border-gold bg-gold text-white'
                      : active
                      ? 'border-gold text-gold'
                      : 'border-border text-ink-muted'
                  }`}
                >
                  {done ? (
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className={`text-[0.84rem] ${active ? 'font-semibold text-ink' : 'text-ink-muted'}`}>
                  {cat}
                </span>
              </div>
            );
          })}
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
        <StandAnzeige />
        <div className="flex items-center gap-1 text-gold text-[1rem] mt-3">
          {'★★★★★'}
        </div>
        <div className="text-[0.82rem] text-ink-muted mt-1">
          5,0 &middot; 68 Bewertungen
        </div>
      </div>
    </aside>
  );

  /* ───── Ampel Icon ───── */
  const AmpelIcon = ({ color, size = 48 }: { color: 'green' | 'yellow' | 'red'; size?: number }) => {
    const fills = { green: '#22c55e', yellow: '#eab308', red: '#ef4444' };
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke={fills[color]} strokeWidth="3" fill={`${fills[color]}15`} />
        <circle cx="24" cy="24" r="12" fill={fills[color]} />
      </svg>
    );
  };

  const MiniAmpel = ({ color }: { color: 'green' | 'yellow' | 'red' }) => {
    const fills = { green: '#22c55e', yellow: '#eab308', red: '#ef4444' };
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="min-w-[16px]">
        <circle cx="8" cy="8" r="7" fill={fills[color]} />
      </svg>
    );
  };

  /* ───── Hinweis Banner ───── */
  const HinweisBanner = () => (
    <div className="py-4 px-5 bg-amber-50 rounded-sm border border-amber-300">
      <p className="text-[0.88rem] text-amber-900 leading-relaxed m-0">
        <strong>Rechtlicher Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine individuelle anwaltliche Beratung. Alle Ergebnisse sind ohne Gewähr. Unterzeichnen Sie keinen Aufhebungsvertrag ohne vorherige rechtliche Prüfung durch einen Fachanwalt.
      </p>
    </div>
  );

  /* ───── Ergebnis ───── */
  if (step === 'ERGEBNIS') {
    const { pct, catScores } = result;
    const ampelColor = pct >= 80 ? 'green' : pct >= 50 ? 'yellow' : 'red';

    const titles = {
      green: 'Der Vertrag erscheint überwiegend fair.',
      yellow: 'Der Vertrag enthält Verbesserungsbedarf.',
      red: 'Der Vertrag enthält kritische Punkte.',
    };
    const texts = {
      green: 'Die von Ihnen gemachten Angaben deuten auf faire Vertragsbedingungen hin. Dennoch empfehlen wir eine kurze anwaltliche Prüfung vor Unterzeichnung.',
      yellow: 'Mehrere Punkte sind verbesserungswürdig. Eine Nachverhandlung erscheint sinnvoll — wir zeigen Ihnen, was möglich ist.',
      red: 'Mehrere Klauseln sind problematisch. Wir empfehlen dringend eine anwaltliche Prüfung vor Unterzeichnung.',
    };
    const ctaHeadlines = {
      green: 'Gut — aber sicher ist sicher.',
      yellow: 'Nachverhandeln ist möglich.',
      red: 'Bitte nicht ohne Beratung unterschreiben.',
    };
    const ctaTexts = {
      green: 'Auch bei einem fairen Vertrag lohnt sich eine kurze anwaltliche Durchsicht. Nutzen Sie die kostenlose Erstberatung durch Fachanwalt Fatih Bektas.',
      yellow: 'Mehrere Punkte bieten Verbesserungspotenzial. Fachanwalt Fatih Bektas zeigt Ihnen in einer kostenlosen Erstberatung, was Sie nachverhandeln können — Antwort in 24 Stunden.',
      red: 'Ihr Vertrag enthält kritische Punkte. Bevor Sie unterschreiben, nutzen Sie die kostenlose Erstberatung durch Fachanwalt Fatih Bektas — Antwort innerhalb von 24 Stunden.',
    };

    return (
      <div className="flex min-h-screen bg-cream">
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

          <div className="flex-1 flex items-start justify-center px-6 py-10">
            <div className="w-full max-w-[600px]">
              {/* Ampel-Ergebnis-Box */}
              <div className="py-8 px-7 bg-cream rounded-sm border-2 border-gold text-center animate-[fadeIn_0.5s_ease-out]">
                <div className="flex justify-center mb-4">
                  <AmpelIcon color={ampelColor} size={64} />
                </div>
                <div className="text-[0.78rem] font-bold text-ink-muted mb-1">{pct}% Gesamtbewertung</div>
                <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-3">
                  {titles[ampelColor]}
                </h2>
                <p className="text-[0.95rem] text-ink-muted leading-relaxed m-0">
                  {texts[ampelColor]}
                </p>
              </div>

              {/* Kategorie-Details */}
              <div className="mt-6 py-5 px-6 bg-white rounded-sm border border-border">
                <h3 className="text-[0.84rem] font-bold text-ink mb-4 uppercase tracking-wide">Bewertung nach Kategorie</h3>
                <div className="space-y-3">
                  {catScores.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <MiniAmpel color={cat.color} />
                      <span className="text-[0.92rem] text-ink">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hinweis */}
              <div className="mt-6">
                <div className="py-4 px-5 bg-amber-50 rounded-sm border border-amber-300">
                  <p className="text-[0.88rem] text-amber-900 leading-relaxed m-0">
                    <strong>Wichtiger Hinweis:</strong> Diese Bewertung ersetzt keine anwaltliche Beratung. Sie basiert ausschließlich auf Ihren Angaben und gibt eine unverbindliche Erstorientierung ohne Gewähr. Unterzeichnen Sie keinen Aufhebungsvertrag ohne vorherige rechtliche Prüfung durch einen Fachanwalt. Bei roter oder gelber Bewertung empfehlen wir dringend eine persönliche Beratung.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 py-7 px-7 bg-white rounded-sm border-2 border-gold">
                <h3 className="font-serif text-[1.15rem] font-bold text-ink mb-2">
                  {ctaHeadlines[ampelColor]}
                </h3>
                <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-5">
                  {ctaTexts[ampelColor]}
                </p>
                <Link
                  href="/kuendigung-pruefen"
                  className="block w-full py-4 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#1a1409] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,31,14,0.25)]"
                >
                  Kostenlose Erstberatung anfragen &rarr;
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[0.78rem] text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    Kostenlose Erstberatung
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    Antwort in 24h
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    68 Fünf-Sterne-Bewertungen auf anwalt.de
                  </span>
                </div>
              </div>

              {/* Zurück-Link */}
              <div className="mt-6 text-center">
                <button
                  onClick={resetAll}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-gold transition-colors p-0"
                >
                  &larr; Neue Prüfung starten
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── Step Content ───── */
  const stepContent = () => {
    switch (step) {
      /* ── KATEGORIE 1: Abfindung ── */
      case 'S1':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält der Aufhebungsvertrag eine Abfindung?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, eine Abfindung ist vereinbart"
                selected={answers.abfindungVorhanden === 'ja'}
                onClick={() => autoAdvance('abfindungVorhanden', 'ja', 'S2', 'S1', 1, 'green')}
              />
              <RadioOption
                label="Nein, keine Abfindung vorgesehen"
                selected={answers.abfindungVorhanden === 'nein'}
                onClick={() => autoAdvance('abfindungVorhanden', 'nein', 'S4', 'S1', 1, 'red')}
              />
              <RadioOption
                label="Ich bin unsicher"
                selected={answers.abfindungVorhanden === 'unsicher'}
                onClick={() => autoAdvance('abfindungVorhanden', 'unsicher', 'S4', 'S1', 1, 'yellow')}
              />
            </div>
            {answers.abfindungVorhanden === 'nein' && (
              <InfoBox>
                Kein gesetzlicher Anspruch auf Abfindung, aber bei Aufhebungsverträgen verhandelbar. Faustformel: 0,5 Monatsgehälter &times; Beschäftigungsjahre.
              </InfoBox>
            )}
          </div>
        );

      case 'S2':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie hoch ist die Abfindung im Verhältnis zu Gehalt und Betriebszugehörigkeit?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Über 0,5 Monatsgehälter pro Beschäftigungsjahr"
                selected={answers.abfindungHoehe === 'ueber'}
                onClick={() => autoAdvance('abfindungHoehe', 'ueber', 'S3', 'S2', 1, 'green')}
              />
              <RadioOption
                label="Genau 0,5 Monatsgehälter pro Beschäftigungsjahr"
                selected={answers.abfindungHoehe === 'genau'}
                onClick={() => autoAdvance('abfindungHoehe', 'genau', 'S3', 'S2', 1, 'green')}
              />
              <RadioOption
                label="Unter 0,5 Monatsgehälter pro Beschäftigungsjahr"
                selected={answers.abfindungHoehe === 'unter'}
                onClick={() => autoAdvance('abfindungHoehe', 'unter', 'S3', 'S2', 1, 'red')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.abfindungHoehe === 'unsicher'}
                onClick={() => autoAdvance('abfindungHoehe', 'unsicher', 'S3', 'S2', 1, 'yellow')}
              />
            </div>
          </div>
        );

      case 'S3':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wann wird die Abfindung ausgezahlt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Mit letztem Gehalt / zum Beendigungsdatum"
                selected={answers.abfindungZeitpunkt === 'sofort'}
                onClick={() => autoAdvance('abfindungZeitpunkt', 'sofort', 'S4', 'S3', 1, 'green')}
              />
              <RadioOption
                label="Innerhalb von 4 Wochen nach Beendigung"
                selected={answers.abfindungZeitpunkt === '4wochen'}
                onClick={() => autoAdvance('abfindungZeitpunkt', '4wochen', 'S4', 'S3', 1, 'green')}
              />
              <RadioOption
                label="Erst nach mehreren Monaten"
                selected={answers.abfindungZeitpunkt === 'spaet'}
                onClick={() => autoAdvance('abfindungZeitpunkt', 'spaet', 'S4', 'S3', 1, 'yellow')}
              />
              <RadioOption
                label="Keine Regelung zum Auszahlungszeitpunkt"
                selected={answers.abfindungZeitpunkt === 'keine'}
                onClick={() => autoAdvance('abfindungZeitpunkt', 'keine', 'S4', 'S3', 1, 'red')}
              />
            </div>
          </div>
        );

      /* ── KATEGORIE 2: Vergütung & Urlaub ── */
      case 'S4':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Sind ausstehende Vergütungsbestandteile geregelt? (Bonus, Provision, Tantieme, Überstunden)
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, alles explizit geregelt"
                selected={answers.bonusGeregelt === 'ja'}
                onClick={() => autoAdvance('bonusGeregelt', 'ja', 'S5', 'S4', 2, 'green')}
              />
              <RadioOption
                label="Teilweise geregelt"
                selected={answers.bonusGeregelt === 'teilweise'}
                onClick={() => autoAdvance('bonusGeregelt', 'teilweise', 'S5', 'S4', 2, 'yellow')}
              />
              <RadioOption
                label="Nein, keine Regelung"
                selected={answers.bonusGeregelt === 'nein'}
                onClick={() => autoAdvance('bonusGeregelt', 'nein', 'S5', 'S4', 2, 'red')}
              />
              <RadioOption
                label="Ich habe keine solchen Ansprüche"
                selected={answers.bonusGeregelt === 'keine_ansprueche'}
                onClick={() => autoAdvance('bonusGeregelt', 'keine_ansprueche', 'S5', 'S4', 2, 'green')}
              />
            </div>
            {answers.bonusGeregelt === 'nein' && (
              <InfoBox>
                Ohne ausdrückliche Regelung können Bonus- und Provisionsansprüche nach Vertragsende verfallen. Bestehen Sie auf einer klaren Klausel.
              </InfoBox>
            )}
          </div>
        );

      case 'S5':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist Ihr Resturlaub im Vertrag geregelt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja — Freistellung unter Urlaubsanrechnung"
                selected={answers.urlaubGeregelt === 'freistellung'}
                onClick={() => autoAdvance('urlaubGeregelt', 'freistellung', 'S6', 'S5', 2, 'green')}
              />
              <RadioOption
                label="Ja — Urlaubsabgeltung in Geld vereinbart"
                selected={answers.urlaubGeregelt === 'abgeltung'}
                onClick={() => autoAdvance('urlaubGeregelt', 'abgeltung', 'S6', 'S5', 2, 'green')}
              />
              <RadioOption
                label="Nein, Resturlaub nicht geregelt"
                selected={answers.urlaubGeregelt === 'nein'}
                onClick={() => autoAdvance('urlaubGeregelt', 'nein', 'S6', 'S5', 2, 'red')}
              />
            </div>
            {answers.urlaubGeregelt === 'nein' && (
              <InfoBox>
                Resturlaub muss entweder gewährt oder finanziell abgegolten werden (&sect;7 Abs. 4 BUrlG). Ohne Regelung verlieren Sie möglicherweise Ihren Anspruch.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 3: Fristen & Sperrzeit ── */
      case 'S6':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält der Vertrag eine Widerrufsfrist?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mindestens 1 Woche Widerrufsfrist"
                selected={answers.widerrufsfrist === 'ja_1woche'}
                onClick={() => autoAdvance('widerrufsfrist', 'ja_1woche', 'S7', 'S6', 3, 'green')}
              />
              <RadioOption
                label="Ja, weniger als 1 Woche"
                selected={answers.widerrufsfrist === 'ja_kurz'}
                onClick={() => autoAdvance('widerrufsfrist', 'ja_kurz', 'S7', 'S6', 3, 'yellow')}
              />
              <RadioOption
                label="Nein, keine Widerrufsfrist enthalten"
                selected={answers.widerrufsfrist === 'nein'}
                onClick={() => autoAdvance('widerrufsfrist', 'nein', 'S7', 'S6', 3, 'red')}
              />
            </div>
            {answers.widerrufsfrist === 'nein' && (
              <InfoBox>
                Eine Widerrufsfrist ist gesetzlich nicht vorgeschrieben, aber ein wichtiges Qualitätsmerkmal. Das BAG (6 AZR 75/18) hat das Gebot fairen Verhandelns etabliert. Ohne jede Bedenkzeit kann der Vertrag unter Umständen anfechtbar sein.
              </InfoBox>
            )}
          </div>
        );

      case 'S7':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wurden Sie auf die mögliche Sperrzeit beim Arbeitslosengeld hingewiesen?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, ich wurde informiert und habe dem zugestimmt"
                selected={answers.sperrzeitHinweis === 'ja'}
                onClick={() => autoAdvance('sperrzeitHinweis', 'ja', 'S8', 'S7', 3, 'green')}
              />
              <RadioOption
                label="Nein, kein Hinweis im Vertrag enthalten"
                selected={answers.sperrzeitHinweis === 'nein'}
                onClick={() => autoAdvance('sperrzeitHinweis', 'nein', 'S8', 'S7', 3, 'red')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.sperrzeitHinweis === 'unsicher'}
                onClick={() => autoAdvance('sperrzeitHinweis', 'unsicher', 'S8', 'S7', 3, 'yellow')}
              />
            </div>
            {answers.sperrzeitHinweis === 'nein' && (
              <InfoBox>
                Achtung: Bei Aufhebungsverträgen droht regelmäßig eine 12-wöchige Sperrzeit beim ALG I (&sect;159 SGB III). Eine Abfindung vermeidet diese nicht automatisch. Lassen Sie prüfen, ob eine Formulierung als &bdquo;betriebsbedingte&ldquo; Beendigung möglich ist.
              </InfoBox>
            )}
          </div>
        );

      case 'S8':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält der Vertrag Ausschlussfristen für weitere Ansprüche?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mit klarer Frist (mind. 3 Monate)"
                selected={answers.ausschlussfrist === 'ja_3m'}
                onClick={() => autoAdvance('ausschlussfrist', 'ja_3m', 'S9', 'S8', 3, 'green')}
              />
              <RadioOption
                label="Ja, aber Frist unter 3 Monate"
                selected={answers.ausschlussfrist === 'ja_kurz'}
                onClick={() => autoAdvance('ausschlussfrist', 'ja_kurz', 'S9', 'S8', 3, 'red')}
              />
              <RadioOption
                label="Keine Ausschlussfrist enthalten"
                selected={answers.ausschlussfrist === 'keine'}
                onClick={() => autoAdvance('ausschlussfrist', 'keine', 'S9', 'S8', 3, 'yellow')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.ausschlussfrist === 'unsicher'}
                onClick={() => autoAdvance('ausschlussfrist', 'unsicher', 'S9', 'S8', 3, 'yellow')}
              />
            </div>
            {answers.ausschlussfrist === 'ja_kurz' && (
              <InfoBox>
                Sehr kurze Ausschlussfristen können Sie unter Druck setzen, Ansprüche schnell geltend zu machen. Prüfen Sie welche Ansprüche davon betroffen sind.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 4: Freistellung ── */
      case 'S9':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie ist Ihre Freistellung bis Vertragsende geregelt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Bezahlte Freistellung unter voller Vergütungsfortzahlung"
                selected={answers.freistellungArt === 'bezahlt'}
                onClick={() => autoAdvance('freistellungArt', 'bezahlt', 'S10', 'S9', 4, 'green')}
              />
              <RadioOption
                label="Ich muss bis Vertragsende weiterarbeiten"
                selected={answers.freistellungArt === 'weiterarbeiten'}
                onClick={() => autoAdvance('freistellungArt', 'weiterarbeiten', 'S10', 'S9', 4, 'yellow')}
              />
              <RadioOption
                label="Unbezahlte Freistellung vereinbart"
                selected={answers.freistellungArt === 'unbezahlt'}
                onClick={() => autoAdvance('freistellungArt', 'unbezahlt', 'S11', 'S9', 4, 'red')}
              />
              <RadioOption
                label="Keine Regelung zur Freistellung"
                selected={answers.freistellungArt === 'keine'}
                onClick={() => autoAdvance('freistellungArt', 'keine', 'S11', 'S9', 4, 'red')}
              />
            </div>
            {answers.freistellungArt === 'unbezahlt' && (
              <InfoBox>
                Bei unbezahlter Freistellung entfällt die Pflichtversicherung in der GKV. Sie müssen sich freiwillig versichern — prüfen Sie Kosten und Fristen unverzüglich.
              </InfoBox>
            )}
          </div>
        );

      case 'S10':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Sind Sie privat krankenversichert?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Nein, ich bin gesetzlich versichert"
                selected={answers.privatVersichert === 'nein'}
                onClick={() => autoAdvance('privatVersichert', 'nein', 'S11', 'S10', 4, 'green')}
              />
              <RadioOption
                label="Ja, ich bin privat versichert"
                selected={answers.privatVersichert === 'ja'}
                onClick={() => autoAdvance('privatVersichert', 'ja', 'S11', 'S10', 4, 'yellow')}
              />
            </div>
            {answers.privatVersichert === 'ja' && (
              <InfoBox>
                Hinweis: Nach Vertragsende entfällt der Arbeitgeberzuschuss zur PKV (ca. 50% des Beitrags). Kalkulieren Sie den vollen PKV-Beitrag ab dem ersten Monat nach Beendigung ein.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 5: Zeugnis ── */
      case 'S11':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist ein Arbeitszeugnis im Vertrag vereinbart?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mit vereinbarter Note (sehr gut / gut)"
                selected={answers.zeugnisVereinbart === 'ja_note'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'ja_note', 'S12', 'S11', 5, 'green')}
              />
              <RadioOption
                label="Ja, aber ohne konkrete Notenvereinbarung"
                selected={answers.zeugnisVereinbart === 'ja_ohne'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'ja_ohne', 'S12', 'S11', 5, 'yellow')}
              />
              <RadioOption
                label="Nein, kein Zeugnis geregelt"
                selected={answers.zeugnisVereinbart === 'nein'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'nein', 'S12', 'S11', 5, 'red')}
              />
            </div>
            {answers.zeugnisVereinbart === 'nein' && (
              <InfoBox>
                Sie haben gesetzlichen Anspruch auf ein qualifiziertes Arbeitszeugnis (&sect;109 GewO). Ohne vertragliche Regelung riskieren Sie eine schlechte Beurteilung. Bestehen Sie auf einer Vereinbarung.
              </InfoBox>
            )}
          </div>
        );

      case 'S12':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist ein konkretes Ausstellungsdatum für das Zeugnis vereinbart?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, konkretes Datum vereinbart"
                selected={answers.zeugnisdatum === 'ja'}
                onClick={() => autoAdvance('zeugnisdatum', 'ja', 'S13', 'S12', 5, 'green')}
              />
              <RadioOption
                label="Nein, kein Datum vereinbart"
                selected={answers.zeugnisdatum === 'nein'}
                onClick={() => autoAdvance('zeugnisdatum', 'nein', 'S13', 'S12', 5, 'yellow')}
              />
              <RadioOption
                label="Kein Zeugnis im Vertrag vereinbart"
                selected={answers.zeugnisdatum === 'kein_zeugnis'}
                onClick={() => autoAdvance('zeugnisdatum', 'kein_zeugnis', 'S13', 'S12', 5, 'skip')}
              />
            </div>
            {answers.zeugnisdatum === 'nein' && (
              <InfoBox>
                Ohne konkretes Datum kann sich die Ausstellung des Zeugnisses verzögern — was bei Bewerbungen problematisch ist.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 6: Wettbewerbsverbot ── */
      case 'S13':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält der Vertrag ein nachvertragliches Wettbewerbsverbot?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Nein"
                selected={answers.wettbewerbsverbot === 'nein'}
                onClick={() => autoAdvance('wettbewerbsverbot', 'nein', 'S15', 'S13', 6, 'green')}
              />
              <RadioOption
                label="Ja"
                selected={answers.wettbewerbsverbot === 'ja'}
                onClick={() => autoAdvance('wettbewerbsverbot', 'ja', 'S14', 'S13', 6, 'skip')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.wettbewerbsverbot === 'unsicher'}
                onClick={() => autoAdvance('wettbewerbsverbot', 'unsicher', 'S15', 'S13', 6, 'yellow')}
              />
            </div>
          </div>
        );

      case 'S14':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält das Wettbewerbsverbot eine Karenzentschädigung?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mindestens 50% des letzten Bruttogehalts"
                selected={answers.karenzentschaedigung === 'ja_50'}
                onClick={() => autoAdvance('karenzentschaedigung', 'ja_50', 'S15', 'S14', 6, 'green')}
              />
              <RadioOption
                label="Ja, aber unter 50% des letzten Bruttogehalts"
                selected={answers.karenzentschaedigung === 'ja_unter50'}
                onClick={() => autoAdvance('karenzentschaedigung', 'ja_unter50', 'S15', 'S14', 6, 'red')}
              />
              <RadioOption
                label="Nein, keine Karenzentschädigung vereinbart"
                selected={answers.karenzentschaedigung === 'nein'}
                onClick={() => autoAdvance('karenzentschaedigung', 'nein', 'S15', 'S14', 6, 'red')}
              />
            </div>
            {answers.karenzentschaedigung === 'ja_unter50' && (
              <InfoBox>
                Ein Wettbewerbsverbot ohne Karenzentschädigung von mindestens 50% ist nach &sect;74 HGB unverbindlich. Sie müssen es dann nicht einhalten, haben aber auch keinen Anspruch auf Entschädigung.
              </InfoBox>
            )}
            {answers.karenzentschaedigung === 'nein' && (
              <InfoBox>
                Ohne Karenzentschädigung ist das Wettbewerbsverbot für Sie unverbindlich (&sect;74 HGB). Sie können frei entscheiden, ob Sie es einhalten — haben dann aber keinen Anspruch auf Zahlung.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 7: Besonderer Schutz ── */
      case 'S15':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Haben Sie einen besonderen Schutzstatus?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Schwerbehinderung (anerkannt oder beantragt)"
                selected={answers.sonderschutz === 'schwerbehindert'}
                onClick={() => autoAdvance('sonderschutz', 'schwerbehindert', 'S16', 'S15', 7, 'skip')}
              />
              <RadioOption
                label="Betriebsratsmitglied"
                selected={answers.sonderschutz === 'betriebsrat'}
                onClick={() => autoAdvance('sonderschutz', 'betriebsrat', 'S16', 'S15', 7, 'skip')}
              />
              <RadioOption
                label="Schwangerschaft oder Elternzeit"
                selected={answers.sonderschutz === 'schwangerschaft'}
                onClick={() => autoAdvance('sonderschutz', 'schwangerschaft', 'S16', 'S15', 7, 'skip')}
              />
              <RadioOption
                label="Datenschutzbeauftragter"
                selected={answers.sonderschutz === 'datenschutz'}
                onClick={() => autoAdvance('sonderschutz', 'datenschutz', 'S16', 'S15', 7, 'skip')}
              />
              <RadioOption
                label="Nein / Keiner davon"
                selected={answers.sonderschutz === 'nein'}
                onClick={() => autoAdvance('sonderschutz', 'nein', 'S17', 'S15', 7, 'green')}
              />
            </div>
          </div>
        );

      case 'S16':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wurden die erforderlichen Stellen bei Ihrem Schutzstatus einbezogen bzw. wurden Sie umfassend über Ihre Rechte informiert?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, ich wurde vollständig informiert und habe freiwillig zugestimmt"
                selected={answers.sonderschutzEinbezogen === 'ja'}
                onClick={() => autoAdvance('sonderschutzEinbezogen', 'ja', 'S17', 'S16', 7, 'green')}
              />
              <RadioOption
                label="Nein / Ich bin nicht sicher"
                selected={answers.sonderschutzEinbezogen === 'nein'}
                onClick={() => autoAdvance('sonderschutzEinbezogen', 'nein', 'S17', 'S16', 7, 'red')}
              />
            </div>
            {answers.sonderschutzEinbezogen === 'nein' && (
              <InfoBox>
                Besonders wichtig: Bei Schwerbehinderten braucht der Arbeitgeber für eine Kündigung die Zustimmung des Integrationsamts (&sect;168 SGB IX). Beim Aufhebungsvertrag können Sie freiwillig zustimmen — aber nur nach vollständiger Information über Ihre Rechte. Lassen Sie dies unbedingt prüfen.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 8: Verhandlung & Druck ── */
      case 'S17':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie lange hatten Sie Zeit, den Vertrag zu prüfen, bevor Sie unterschreiben sollten?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Mehrere Tage oder länger"
                selected={answers.bedenkzeit === 'tage'}
                onClick={() => autoAdvance('bedenkzeit', 'tage', 'S18', 'S17', 8, 'green')}
              />
              <RadioOption
                label="1–2 Tage"
                selected={answers.bedenkzeit === '1_2'}
                onClick={() => autoAdvance('bedenkzeit', '1_2', 'S18', 'S17', 8, 'yellow')}
              />
              <RadioOption
                label="Ich sollte sofort unterschreiben"
                selected={answers.bedenkzeit === 'sofort'}
                onClick={() => autoAdvance('bedenkzeit', 'sofort', 'S18', 'S17', 8, 'red')}
              />
            </div>
            {answers.bedenkzeit === 'sofort' && (
              <InfoBox>
                Das BAG hat in BAG 6 AZR 333/21 klargestellt: Sofortiger Unterschriftsdruck allein ist noch kein Verstoß gegen das Gebot fairen Verhandelns — aber in Kombination mit anderen Druckmitteln kann der Vertrag anfechtbar sein.
              </InfoBox>
            )}
          </div>
        );

      case 'S18':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wurde Ihnen eine Kündigung oder andere Nachteile angedroht für den Fall, dass Sie nicht unterschreiben?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Nein, keine Drohungen"
                selected={answers.druckAusgeubt === 'nein'}
                onClick={() => autoAdvance('druckAusgeubt', 'nein', 'ERGEBNIS', 'S18', 8, 'green')}
              />
              <RadioOption
                label="Ja, mit Kündigung gedroht"
                selected={answers.druckAusgeubt === 'kuendigung'}
                onClick={() => autoAdvance('druckAusgeubt', 'kuendigung', 'ERGEBNIS', 'S18', 8, 'yellow')}
              />
              <RadioOption
                label="Ja, mit anderen Nachteilen gedroht"
                selected={answers.druckAusgeubt === 'andere'}
                onClick={() => autoAdvance('druckAusgeubt', 'andere', 'ERGEBNIS', 'S18', 8, 'red')}
              />
            </div>
            {answers.druckAusgeubt === 'kuendigung' && (
              <InfoBox>
                Eine Drohung mit Kündigung ist nicht automatisch unzulässig — nur wenn der Arbeitgeber keine realistische Grundlage für eine Kündigung hatte. Lassen Sie dies prüfen.
              </InfoBox>
            )}
            {answers.druckAusgeubt === 'andere' && (
              <InfoBox>
                Widerrechtliche Drohung berechtigt zur Anfechtung des Aufhebungsvertrags (&sect;123 BGB). Handeln Sie schnell — die Anfechtungsfrist beträgt 1 Jahr.
              </InfoBox>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  /* ───── Render (Checker) ───── */
  return (
    <div className="flex min-h-screen bg-cream">
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/aufhebungsvertrag-pruefen`}
        pageTitle="Aufhebungsvertrag prüfen — Ist Ihr Vertrag fair?"
        pageDescription="Aufhebungsvertrag erhalten? Prüfen Sie ob Ihr Vertrag faire Konditionen enthält — Ampelbewertung in 8 Kategorien + kostenlose Ersteinschätzung vom Fachanwalt."
        pageType="WebApplication"
        appName="Aufhebungsvertrag-Checker"
        appCategory="Legal Tool"
        includeRating={true}
        includeOrganization={true}
        speakableSelectors={['#direktantwort', 'h1']}
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools` },
          { name: 'Aufhebungsvertrag prüfen', url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag-pruefen` },
        ]}
        isBasedOn={[
          { name: '§74 HGB — Wettbewerbsverbot', url: 'https://www.gesetze-im-internet.de/hgb/__74.html' },
          { name: '§109 GewO — Zeugnis', url: 'https://www.gesetze-im-internet.de/gewo/__109.html' },
          { name: '§159 SGB III — Sperrzeit', url: 'https://www.gesetze-im-internet.de/sgb_3/__159.html' },
          { name: '§123 BGB — Anfechtung', url: 'https://www.gesetze-im-internet.de/bgb/__123.html' },
          { name: '§7 Abs. 4 BUrlG — Urlaubsabgeltung', url: 'https://www.gesetze-im-internet.de/burlg/__7.html' },
        ]}
        datePublished="2025-01-15"
        dateModified={new Date().toISOString().slice(0, 10)}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
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
            name: 'Aufhebungsvertrag in 3 Minuten prüfen',
            description: 'Prüfen Sie in 8 Kategorien ob Ihr Aufhebungsvertrag faire Konditionen enthält.',
            totalTime: 'PT3M',
            step: [
              { '@type': 'HowToStep', position: 1, name: '8 Kategorien beantworten', text: '8 Kategorien zum Vertrag beantworten' },
              { '@type': 'HowToStep', position: 2, name: 'Ampelbewertung erhalten', text: 'Ampelbewertung pro Kategorie erhalten' },
              { '@type': 'HowToStep', position: 3, name: 'Gesamtergebnis ansehen', text: 'Gesamtergebnis und Handlungsempfehlung' },
            ],
          }),
        }}
      />

      {/* GEO-Optimierung */}
      <div itemScope itemType="https://schema.org/WebApplication" style={{ display: 'none' }}>
        <meta itemProp="name" content="Aufhebungsvertrag-Checker" />
        <meta itemProp="description" content="Prüfen Sie ob Ihr Aufhebungsvertrag faire Konditionen enthält — Ampelbewertung in 8 Kategorien." />
        <meta itemProp="author" content="Fatih Bektas, Fachanwalt für Arbeitsrecht" />
        <meta itemProp="inLanguage" content="de" />
        <meta itemProp="applicationCategory" content="Legal Tool" />
        <meta itemProp="isBasedOn" content="§74 HGB, §109 GewO, §123 BGB, §159 SGB III, §7 BUrlG, BAG 6 AZR 75/18" />
      </div>

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
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.78rem] font-semibold text-gold-dark">
                {catName}
              </span>
              <span className="text-[0.78rem] text-ink-muted">
                Kategorie {catIdx} von 8
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

        {/* Content area */}
        <div className="flex-1 flex flex-col px-6 py-10">
          <div className="w-full max-w-[540px] mx-auto">
            {/* Hero + Direktantwort (only on S1) */}
            {step === 'S1' && !history.length && (
              <>
                {/* Breadcrumb */}
                <nav className="text-[0.84rem] text-ink-muted mb-6">
                  <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
                  <span className="mx-2">/</span>
                  <Link href="/tools" className="text-gold no-underline hover:underline">Tools &amp; Rechner</Link>
                  <span className="mx-2">/</span>
                  <span>Aufhebungsvertrag prüfen</span>
                </nav>

                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
                  Unverbindlich &amp; in 3 Minuten
                </div>

                <h1 className="font-serif text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-[1.2] text-ink mb-4">
                  Aufhebungsvertrag prüfen — Ist Ihr Vertrag fair?
                </h1>

                <div id="direktantwort" className="text-[0.95rem] text-ink-muted leading-relaxed mb-5">
                  Ein Aufhebungsvertrag beendet das Arbeitsverhältnis einvernehmlich. Anders als bei einer Kündigung gibt es keine gesetzlich vorgeschriebenen Mindestinhalte — deshalb variiert die Qualität solcher Verträge erheblich. Dieser Checker prüft die wichtigsten Klauseln und zeigt, ob Ihr Vertrag faire Bedingungen enthält.
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[0.84rem] text-ink-muted mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    Kostenlose Erstberatung
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    Anonym
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                    In 3 Minuten
                  </span>
                </div>

                <div className="mb-6">
                  <HinweisBanner />
                </div>

                {/* CTA #1 */}
                <div className="mb-8 py-5 px-6 bg-gold-bg rounded-sm border-2 border-gold">
                  <p className="text-[0.95rem] font-semibold text-ink mb-3 m-0">
                    Aufhebungsvertrag erhalten und unsicher? Wir prüfen Ihren Vertrag — kostenlose Erstberatung.
                  </p>
                  <Link
                    href="/kuendigung-pruefen"
                    className="inline-block py-2.5 px-6 bg-gold-dark text-white rounded-sm font-sans text-[0.88rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px"
                  >
                    Kostenlose Erstberatung anfragen &rarr;
                  </Link>
                </div>
              </>
            )}

            {/* Step content */}
            {stepContent()}

            {/* Back button */}
            {step !== 'S1' && (
              <div className="mt-8">
                <button
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* Leitfaden-Sektion (after checker, on first step) */}
            {step === 'S1' && !history.length && (
              <div className="mt-12">
                {/* Leitfaden */}
                <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold text-ink mb-5">
                  Was prüft der Aufhebungsvertrag-Checker?
                </h2>

                <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-5">
                  Ein Aufhebungsvertrag ist eine einvernehmliche Beendigung des Arbeitsverhältnisses. Anders als bei einer Kündigung gibt es keine gesetzlich vorgeschriebenen Mindestinhalte — das bedeutet, Arbeitgeber können Verträge zu ihren Gunsten gestalten. Umso wichtiger ist eine sorgfältige Prüfung vor der Unterzeichnung.
                </p>

                <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-5">
                  Unser Checker prüft acht zentrale Bereiche: Abfindung und Vergütung (&sect;74a HGB), Resturlaub (&sect;7 Abs. 4 BUrlG), Freistellung, Widerrufsfrist, Sperrzeit beim Arbeitslosengeld (&sect;159 SGB III), Zeugnis (&sect;109 GewO), Wettbewerbsverbot (&sect;74 HGB) und die Verhandlungssituation nach dem Gebot fairen Verhandelns (BAG 6 AZR 75/18, BAG 6 AZR 333/21). Nutzen Sie auch unseren{' '}
                  <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindungsrechner</Link>, um Ihre{' '}
                  <Link href="/urlaubsabgeltung-rechner" className="text-gold no-underline hover:underline">Urlaubsabgeltung zu berechnen</Link> oder Ihre{' '}
                  <Link href="/kuendigungsfrist-rechner" className="text-gold no-underline hover:underline">Kündigungsfrist zu prüfen</Link>.
                </p>

                <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-8">
                  Besonders wichtig: Bei Aufhebungsverträgen droht regelmäßig eine 12-wöchige Sperrzeit beim Arbeitslosengeld I (&sect;159 SGB III). Dieser Aspekt wird von vielen Arbeitnehmern unterschätzt — und von Arbeitgebern selten thematisiert. Anwaltliche Beratung kann helfen, durch eine geschickte Vertragsgestaltung die Sperrzeit zu vermeiden oder zu verkürzen.
                </p>

                {/* FAQ */}
                <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold text-ink mb-5">
                  Häufige Fragen zum Aufhebungsvertrag
                </h2>

                <div className="max-w-[740px] mb-8">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-border">
                      <button
                        className="w-full text-left py-5 flex justify-between items-center gap-4 bg-none border-none cursor-pointer hover:text-gold transition-colors font-sans font-semibold text-[0.95rem] text-ink"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        {faq.q}
                        <span className={`text-gold text-[0.85rem] min-w-[16px] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                          &#9660;
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 text-[0.88rem] text-ink-muted leading-relaxed font-sans ${openFaq === i ? 'max-h-[400px] pb-5' : 'max-h-0'}`}>
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quellenbox */}
                <div className="mb-8">
                  <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-3">Rechtsgrundlagen</h3>
                  <div className="space-y-1.5 mb-4">
                    <a href="https://www.gesetze-im-internet.de/hgb/__74.html" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">&sect;74 HGB — Wettbewerbsverbot &rarr;</a>
                    <a href="https://www.gesetze-im-internet.de/gewo/__109.html" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">&sect;109 GewO — Zeugnis &rarr;</a>
                    <a href="https://www.gesetze-im-internet.de/bgb/__123.html" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">&sect;123 BGB — Anfechtung &rarr;</a>
                    <a href="https://www.gesetze-im-internet.de/sgb_3/__159.html" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">&sect;159 SGB III — Sperrzeit &rarr;</a>
                    <a href="https://www.gesetze-im-internet.de/burlg/__7.html" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">&sect;7 Abs. 4 BUrlG — Urlaubsabgeltung &rarr;</a>
                    <a href="https://www.bundesarbeitsgericht.de" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">BAG 6 AZR 75/18 — Gebot fairen Verhandelns &rarr;</a>
                    <a href="https://www.bundesarbeitsgericht.de" target="_blank" rel="noopener" className="block text-[0.88rem] text-gold no-underline hover:underline">BAG 6 AZR 333/21 — Unterschriftsdruck &rarr;</a>
                  </div>
                  <p className="text-[0.82rem] text-ink-muted italic m-0">
                    Erstellt und geprüft von Fachanwalt Fatih Bektas, Rechtsanwaltskammer Karlsruhe, Fachanwalt für Arbeitsrecht seit 2011. Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}. Keine Rechtsberatung im Einzelfall.
                  </p>
                </div>

                {/* Hinweis Banner am Ende */}
                <div className="mb-8">
                  <HinweisBanner />
                </div>

                {/* CTA #3 */}
                <div className="py-7 px-7 bg-white rounded-sm border-2 border-gold">
                  <h3 className="font-serif text-[1.15rem] font-bold text-ink mb-2">
                    Aufhebungsvertrag erhalten — jetzt handeln.
                  </h3>
                  <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-5">
                    Fachanwalt Fatih Bektas zeigt Ihnen in einer kostenlosen Erstberatung Ihre Verhandlungsmöglichkeiten — Antwort innerhalb von 24 Stunden.
                  </p>
                  <Link
                    href="/kuendigung-pruefen"
                    className="block w-full py-4 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#1a1409] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,31,14,0.25)]"
                  >
                    Kostenlose Ersteinschätzung &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
