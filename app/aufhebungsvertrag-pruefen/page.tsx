'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StandAnzeige from '@/components/StandAnzeige';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import { PAGE_DATES } from '@/lib/page-dates';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';

/* ───── Types ───── */
interface AufhebungsAnswer {
  abfindungVorhanden: string;
  abfindungHoehe: string;
  abfindungZeitpunkt: string;
  turboklausel: string;
  bonusGeregelt: string;
  urlaubGeregelt: string;
  beendigungsgrund: string;
  sperrzeitHinweis: string;
  freistellungArt: string;
  privatVersichert: string;
  zeugnisVereinbart: string;
  zwischenzeugnis: string;
  bedenkzeit: string;
  druckAusgeubt: string;
}

const initialAnswers: AufhebungsAnswer = {
  abfindungVorhanden: '',
  abfindungHoehe: '',
  abfindungZeitpunkt: '',
  turboklausel: '',
  bonusGeregelt: '',
  urlaubGeregelt: '',
  beendigungsgrund: '',
  sperrzeitHinweis: '',
  freistellungArt: '',
  privatVersichert: '',
  zeugnisVereinbart: '',
  zwischenzeugnis: '',
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
  | 'S10' | 'S11' | 'S12' | 'S13' | 'S19' | 'ERGEBNIS';

const CATEGORIES = [
  'Abfindung',
  'Vergütung & Urlaub',
  'Sperrzeit',
  'Freistellung',
  'Zeugnis',
  'Verhandlung & Druck',
] as const;

function getCategoryForStep(s: StepId): { idx: number; catName: string } {
  switch (s) {
    case 'S1': case 'S2': case 'S3': case 'S19':
      return { idx: 1, catName: 'Abfindung' };
    case 'S4': case 'S5':
      return { idx: 2, catName: 'Vergütung & Urlaub' };
    case 'S6': case 'S7':
      return { idx: 3, catName: 'Sperrzeit' };
    case 'S8': case 'S9':
      return { idx: 4, catName: 'Freistellung' };
    case 'S10': case 'S11':
      return { idx: 5, catName: 'Zeugnis' };
    case 'S12': case 'S13':
      return { idx: 6, catName: 'Verhandlung & Druck' };
    case 'ERGEBNIS':
      return { idx: 6, catName: 'Ergebnis' };
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
    a: 'Grundsätzlich ja. Bei Aufhebungsverträgen verhängt die Agentur für Arbeit regelmäßig eine 12-wöchige Sperrzeit (§159 SGB III), weil der Arbeitnehmer das Arbeitsverhältnis „selbst aufgelöst" hat. Es gibt zwar Ausnahmen, diese sollten Sie mit einem spezialisierten Anwalt besprechen.',
  },
  {
    q: 'Was ist das Gebot fairen Verhandelns?',
    a: 'Das BAG hat entschieden, dass Arbeitgeber beim Abschluss von Aufhebungsverträgen fair verhandeln müssen. Eine psychische Drucksituation — etwa ein unangekündigter Besuch beim erkrankten Arbeitnehmer oder unmittelbarer Unterschriftsdruck ohne jede Bedenkzeit — kann zur Unwirksamkeit des Vertrags führen (BAG 6 AZR 75/18, BAG 6 AZR 333/21).',
  },
  {
    q: 'Wie hoch sollte die Abfindung sein?',
    a: 'Es gibt keinen gesetzlichen Anspruch auf eine bestimmte Abfindungshöhe. In der Praxis hat sich die Faustformel von 0,5 Bruttomonatsgehältern pro Beschäftigungsjahr etabliert. Bei starkem Kündigungsschutz, Verfahrensfehlern des Arbeitgebers oder besonderen Schutztatbeständen sind deutlich höhere Beträge erzielbar. Lassen Sie Ihre Verhandlungsposition prüfen.',
  },
];

/* ───── Main Component ───── */
export default function AufhebungsvertragPruefenPage() {
  const [step, setStep] = useState<StepId>('S1');
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<AufhebungsAnswer>(initialAnswers);
  const [scores, setScores] = useState<StepScore[]>([]);
  const [pendingNext, setPendingNext] = useState<StepId | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { idx: catIdx, catName } = getCategoryForStep(step);
  const progress = step === 'ERGEBNIS' ? 100 : (catIdx / 6) * 100;

  const set = <K extends keyof AufhebungsAnswer>(key: K, value: AufhebungsAnswer[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const addScore = (stepName: string, category: number, color: ScoreColor) => {
    setScores((prev) => {
      const filtered = prev.filter((s) => s.step !== stepName);
      return [...filtered, { step: stepName, category, color }];
    });
  };

  const goTo = (next: StepId) => {
    setPendingNext(null);
    setHistory((prev) => [...prev, step]);
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setPendingNext(null);
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
    setPendingNext(null);
    setTimeout(() => goTo(next), 300);
  };

  const selectWithInfo = <K extends keyof AufhebungsAnswer>(
    key: K,
    value: AufhebungsAnswer[K],
    next: StepId,
    stepName: string,
    category: number,
    color: ScoreColor,
  ) => {
    set(key, value);
    addScore(stepName, category, color);
    setPendingNext(next);
  };

  const continueFromInfo = () => {
    if (pendingNext) {
      goTo(pendingNext);
    }
  };

  const resetAll = () => {
    setStep('S1');
    setHistory([]);
    setAnswers(initialAnswers);
    setScores([]);
    setPendingNext(null);
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
          <a href="tel:+49622295992400" className="block text-[0.88rem] text-ink no-underline hover:text-gold transition-colors">
            +49 6222 9599 2400
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
        <StandAnzeige modifiedAt={PAGE_DATES.aufhebungsvertragPruefen} />
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
            <a href="tel:+49622295992400" className="text-[0.82rem] font-semibold text-gold-dark no-underline">
              +49 6222 9599 2400
            </a>
          </div>

          <div className="flex-1 flex items-start justify-center px-6 py-10">
            <div className="w-full max-w-[600px]">
              {/* Ampel-Ergebnis-Box */}
              <div className="ergebnis-box py-8 px-7 bg-cream rounded-sm border-2 border-gold text-center animate-[fadeIn_0.5s_ease-out]">
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
                  href="/#kontakt"
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
                onClick={() => selectWithInfo('abfindungVorhanden', 'nein', 'S19', 'S1', 1, 'red')}
              />
              <RadioOption
                label="Ich bin unsicher"
                selected={answers.abfindungVorhanden === 'unsicher'}
                onClick={() => autoAdvance('abfindungVorhanden', 'unsicher', 'S19', 'S1', 1, 'yellow')}
              />
            </div>
            {answers.abfindungVorhanden === 'nein' && (
              <InfoBox>
                Kein gesetzlicher Anspruch auf Abfindung, aber bei Aufhebungsverträgen verhandelbar. Faustformel: 0,5 Monatsgehälter &times; Beschäftigungsjahre. Aber oftmals ist mehr drin und Arbeitgeber bieten selten bei einer außergerichtlichen Verhandlung das Maximum an.
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
                onClick={() => selectWithInfo('abfindungHoehe', 'ueber', 'S3', 'S2', 1, 'green')}
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
            {answers.abfindungHoehe === 'ueber' && (
              <InfoBox>
                Bei einer Abfindung über 0,5 Monatsgehälter pro Beschäftigungsjahr droht eine Sperre bzgl. des Arbeitslosengeldes von der Arbeitsagentur.
              </InfoBox>
            )}
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
                onClick={() => autoAdvance('abfindungZeitpunkt', 'sofort', 'S19', 'S3', 1, 'green')}
              />
              <RadioOption
                label="Innerhalb von 4 Wochen nach Beendigung"
                selected={answers.abfindungZeitpunkt === '4wochen'}
                onClick={() => autoAdvance('abfindungZeitpunkt', '4wochen', 'S19', 'S3', 1, 'green')}
              />
              <RadioOption
                label="Erst nach mehreren Monaten"
                selected={answers.abfindungZeitpunkt === 'spaet'}
                onClick={() => autoAdvance('abfindungZeitpunkt', 'spaet', 'S19', 'S3', 1, 'yellow')}
              />
              <RadioOption
                label="Keine Regelung zum Auszahlungszeitpunkt"
                selected={answers.abfindungZeitpunkt === 'keine'}
                onClick={() => autoAdvance('abfindungZeitpunkt', 'keine', 'S19', 'S3', 1, 'green')}
              />
            </div>
          </div>
        );

      case 'S19':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Enthält der Vertrag eine Turboklausel (Sprinterklausel)?
            </h2>
            <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-5">
              Eine Turboklausel gibt Ihnen das Recht, das Arbeitsverhältnis vor dem vereinbarten Beendigungsdatum zu beenden — die ersparte Vergütung wird dann als zusätzliche Abfindung ausgezahlt.
            </p>
            <div className="space-y-3">
              <RadioOption
                label="Ja, eine Turboklausel ist vereinbart"
                selected={answers.turboklausel === 'ja'}
                onClick={() => autoAdvance('turboklausel', 'ja', 'S4', 'S19', 1, 'green')}
              />
              <RadioOption
                label="Nein, keine Turboklausel enthalten"
                selected={answers.turboklausel === 'nein'}
                onClick={() => selectWithInfo('turboklausel', 'nein', 'S4', 'S19', 1, 'yellow')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.turboklausel === 'unsicher'}
                onClick={() => autoAdvance('turboklausel', 'unsicher', 'S4', 'S19', 1, 'yellow')}
              />
            </div>
            {answers.turboklausel === 'nein' && (
              <InfoBox>
                Eine Turboklausel kann für Sie vorteilhaft sein: Finden Sie vor dem Beendigungsdatum eine neue Stelle, können Sie früher wechseln und erhalten die restliche Vergütung als zusätzliche Zahlung. Es lohnt sich, diese Klausel nachzuverhandeln.
              </InfoBox>
            )}
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
                onClick={() => selectWithInfo('bonusGeregelt', 'nein', 'S5', 'S4', 2, 'red')}
              />
              <RadioOption
                label="Ich habe keine solchen Ansprüche"
                selected={answers.bonusGeregelt === 'keine_ansprueche'}
                onClick={() => autoAdvance('bonusGeregelt', 'keine_ansprueche', 'S5', 'S4', 2, 'green')}
              />
            </div>
            {answers.bonusGeregelt === 'nein' && (
              <InfoBox>
                Ohne ausdrückliche Regelung können Bonus- und Provisionsansprüche nach Vertragsende verfallen. Bestehen Sie auf einer klaren Klausel. Zumal die meisten Aufhebungsverträge eine sogenannte Ausgleichsklausel enthalten, so dass später keine Ansprüche mehr geltend gemacht werden können.
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
                onClick={() => selectWithInfo('urlaubGeregelt', 'nein', 'S6', 'S5', 2, 'red')}
              />
            </div>
            {answers.urlaubGeregelt === 'nein' && (
              <InfoBox>
                Resturlaub muss entweder gewährt oder finanziell abgegolten werden (&sect;7 Abs. 4 BUrlG). Achten Sie darauf, diesen bei Beendigung geltend zu machen. Oftmals sind kurze Ausschlussfristen vereinbart (häufig 3 Monate), so dass Sie nicht viel Zeit haben.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 3: Sperrzeit ── */
      case 'S6':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Was ist als Beendigungsgrund im Aufhebungsvertrag genannt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Betriebsbedingte Gründe, zur Vermeidung einer betriebsbedingten Kündigung"
                selected={answers.beendigungsgrund === 'betriebsbedingt'}
                onClick={() => autoAdvance('beendigungsgrund', 'betriebsbedingt', 'S7', 'S6', 3, 'green')}
              />
              <RadioOption
                label="Andere als betriebsbedingte Gründe"
                selected={answers.beendigungsgrund === 'andere'}
                onClick={() => selectWithInfo('beendigungsgrund', 'andere', 'S7', 'S6', 3, 'yellow')}
              />
              <RadioOption
                label="Keine Gründe genannt"
                selected={answers.beendigungsgrund === 'keine'}
                onClick={() => selectWithInfo('beendigungsgrund', 'keine', 'S7', 'S6', 3, 'red')}
              />
            </div>
            {(answers.beendigungsgrund === 'andere' || answers.beendigungsgrund === 'keine') && (
              <InfoBox>
                Es droht eine Sperre durch die Arbeitsagentur bzgl. des Arbeitslosengeldes. Ohne betriebsbedingte Begründung verhängt die Agentur für Arbeit regelmäßig eine 12-wöchige Sperrzeit beim ALG I (&sect;159 SGB III).
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
                onClick={() => selectWithInfo('sperrzeitHinweis', 'nein', 'S8', 'S7', 3, 'red')}
              />
              <RadioOption
                label="Ich weiß es nicht"
                selected={answers.sperrzeitHinweis === 'unsicher'}
                onClick={() => autoAdvance('sperrzeitHinweis', 'unsicher', 'S8', 'S7', 3, 'yellow')}
              />
            </div>
            {(answers.sperrzeitHinweis === 'nein' || answers.sperrzeitHinweis === 'ja' || answers.sperrzeitHinweis === 'unsicher') && (
              <InfoBox>
                Achtung: Bei Aufhebungsverträgen droht regelmäßig eine 12-wöchige Sperrzeit beim ALG I (&sect;159 SGB III). Daher ist es bei jedem Aufhebungsvertrag zwingend, einen Fachanwalt für Arbeitsrecht zu konsultieren.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 4: Freistellung ── */
      case 'S8':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie ist Ihre Freistellung bis Vertragsende geregelt?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Bezahlte Freistellung unter voller Vergütungsfortzahlung"
                selected={answers.freistellungArt === 'bezahlt'}
                onClick={() => autoAdvance('freistellungArt', 'bezahlt', 'S9', 'S8', 4, 'green')}
              />
              <RadioOption
                label="Ich muss bis Vertragsende weiterarbeiten"
                selected={answers.freistellungArt === 'weiterarbeiten'}
                onClick={() => autoAdvance('freistellungArt', 'weiterarbeiten', 'S9', 'S8', 4, 'yellow')}
              />
              <RadioOption
                label="Unbezahlte Freistellung vereinbart"
                selected={answers.freistellungArt === 'unbezahlt'}
                onClick={() => selectWithInfo('freistellungArt', 'unbezahlt', 'S10', 'S8', 4, 'red')}
              />
              <RadioOption
                label="Keine Regelung zur Freistellung"
                selected={answers.freistellungArt === 'keine'}
                onClick={() => autoAdvance('freistellungArt', 'keine', 'S10', 'S8', 4, 'red')}
              />
            </div>
            {answers.freistellungArt === 'unbezahlt' && (
              <InfoBox>
                Bei unbezahlter Freistellung entfällt die Pflichtversicherung in der GKV. Sie müssen sich freiwillig versichern — prüfen Sie Kosten und Fristen unverzüglich.
              </InfoBox>
            )}
          </div>
        );

      case 'S9':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Sind Sie privat krankenversichert?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Nein, ich bin gesetzlich versichert"
                selected={answers.privatVersichert === 'nein'}
                onClick={() => autoAdvance('privatVersichert', 'nein', 'S10', 'S9', 4, 'green')}
              />
              <RadioOption
                label="Ja, ich bin privat versichert"
                selected={answers.privatVersichert === 'ja'}
                onClick={() => selectWithInfo('privatVersichert', 'ja', 'S10', 'S9', 4, 'yellow')}
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
      case 'S10':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist ein Arbeitszeugnis im Vertrag vereinbart?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja, mit vereinbarter Note (sehr gut / gut) — mit Vorschlagsrecht für den Arbeitnehmer"
                selected={answers.zeugnisVereinbart === 'ja_vorschlagsrecht'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'ja_vorschlagsrecht', 'S11', 'S10', 5, 'green')}
              />
              <RadioOption
                label="Ja, mit vereinbarter Note (sehr gut / gut)"
                selected={answers.zeugnisVereinbart === 'ja_note'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'ja_note', 'S11', 'S10', 5, 'yellow')}
              />
              <RadioOption
                label="Ja, aber ohne konkrete Notenvereinbarung"
                selected={answers.zeugnisVereinbart === 'ja_ohne'}
                onClick={() => autoAdvance('zeugnisVereinbart', 'ja_ohne', 'S11', 'S10', 5, 'red')}
              />
              <RadioOption
                label="Nein, kein Zeugnis geregelt"
                selected={answers.zeugnisVereinbart === 'nein'}
                onClick={() => selectWithInfo('zeugnisVereinbart', 'nein', 'S11', 'S10', 5, 'red')}
              />
            </div>
            {answers.zeugnisVereinbart === 'nein' && (
              <InfoBox>
                Sie haben gesetzlichen Anspruch auf ein qualifiziertes Arbeitszeugnis (&sect;109 GewO). Ohne vertragliche Regelung riskieren Sie eine schlechte Beurteilung. Bestehen Sie auf einer Vereinbarung mit einer guten Note. Anderenfalls muss der Arbeitgeber nur ein Zeugnis mit der Note befriedigend ausstellen.
              </InfoBox>
            )}
          </div>
        );

      case 'S11':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Ist ein Zwischenzeugnis vereinbart?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Ja"
                selected={answers.zwischenzeugnis === 'ja'}
                onClick={() => autoAdvance('zwischenzeugnis', 'ja', 'S12', 'S11', 5, 'green')}
              />
              <RadioOption
                label="Nein"
                selected={answers.zwischenzeugnis === 'nein'}
                onClick={() => selectWithInfo('zwischenzeugnis', 'nein', 'S12', 'S11', 5, 'yellow')}
              />
            </div>
            {answers.zwischenzeugnis === 'nein' && (
              <InfoBox>
                Ein Zwischenzeugnis sollte vereinbart werden, insbesondere wenn die Beendigung weit in der Zukunft liegt. Anderenfalls wird es schwer, sich ohne Zwischenzeugnis anderweitig zu bewerben.
              </InfoBox>
            )}
          </div>
        );

      /* ── KATEGORIE 6: Verhandlung & Druck ── */
      case 'S12':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wie lange hatten Sie Zeit, den Vertrag zu prüfen, bevor Sie unterschreiben sollten?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Mehrere Tage oder länger"
                selected={answers.bedenkzeit === 'tage'}
                onClick={() => autoAdvance('bedenkzeit', 'tage', 'S13', 'S12', 6, 'green')}
              />
              <RadioOption
                label="1–2 Tage"
                selected={answers.bedenkzeit === '1_2'}
                onClick={() => autoAdvance('bedenkzeit', '1_2', 'S13', 'S12', 6, 'yellow')}
              />
              <RadioOption
                label="Ich sollte sofort unterschreiben"
                selected={answers.bedenkzeit === 'sofort'}
                onClick={() => selectWithInfo('bedenkzeit', 'sofort', 'S13', 'S12', 6, 'red')}
              />
            </div>
            {answers.bedenkzeit === 'sofort' && (
              <InfoBox>
                Das BAG hat in BAG 6 AZR 333/21 klargestellt: Sofortiger Unterschriftsdruck allein ist noch kein Verstoß gegen das Gebot fairen Verhandelns — aber in Kombination mit anderen Druckmitteln kann der Vertrag anfechtbar sein.
              </InfoBox>
            )}
          </div>
        );

      case 'S13':
        return (
          <div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-6">
              Wurde Ihnen eine Kündigung oder andere Nachteile angedroht für den Fall, dass Sie nicht unterschreiben?
            </h2>
            <div className="space-y-3">
              <RadioOption
                label="Nein, keine Drohungen"
                selected={answers.druckAusgeubt === 'nein'}
                onClick={() => autoAdvance('druckAusgeubt', 'nein', 'ERGEBNIS', 'S13', 6, 'green')}
              />
              <RadioOption
                label="Ja, mit Kündigung gedroht"
                selected={answers.druckAusgeubt === 'kuendigung'}
                onClick={() => selectWithInfo('druckAusgeubt', 'kuendigung', 'ERGEBNIS', 'S13', 6, 'yellow')}
              />
              <RadioOption
                label="Ja, mit anderen Nachteilen gedroht"
                selected={answers.druckAusgeubt === 'andere'}
                onClick={() => selectWithInfo('druckAusgeubt', 'andere', 'ERGEBNIS', 'S13', 6, 'red')}
              />
            </div>
            {answers.druckAusgeubt === 'kuendigung' && (
              <InfoBox>
                Eine Drohung mit Kündigung ist nicht automatisch unzulässig — nur wenn der Arbeitgeber keine realistische Grundlage für eine Kündigung hatte. Lassen Sie dies prüfen. Haben Sie eine Rechtsschutzversicherung, übernimmt diese übrigens nur die Anwaltskosten, sofern eine Kündigung angedroht wurde, wenn der Aufhebungsvertrag nicht unterzeichnet wird.
              </InfoBox>
            )}
            {answers.druckAusgeubt === 'andere' && (
              <InfoBox>
                Widerrechtliche Drohung berechtigt zur Anfechtung des Aufhebungsvertrags (&sect;123 BGB). Handeln Sie schnell und kontaktieren Sie einen Fachanwalt für Arbeitsrecht, falls Sie schon unterschrieben haben — die Anfechtungsfrist beträgt 1 Jahr.
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
        pageUrl={`${SEO_CONFIG.baseUrl}/aufhebungsvertrag-pruefen/`}
        pageTitle="Aufhebungsvertrag prüfen — Ist Ihr Vertrag fair?"
        pageDescription="Aufhebungsvertrag erhalten? Prüfen Sie ob Ihr Vertrag faire Konditionen enthält — Ampelbewertung in 6 Kategorien + kostenlose Ersteinschätzung vom Fachanwalt."
        pageType="WebApplication"
        appName="Aufhebungsvertrag-Checker"
        appCategory="Legal Tool"
        includeRating={false}
        includeOrganization={false}
        speakableSelectors={['.ergebnis-box']}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools/` },
          { name: 'Aufhebungsvertrag prüfen', url: `${SEO_CONFIG.baseUrl}/aufhebungsvertrag-pruefen/` },
        ]}
        isBasedOn={[
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
            description: 'Prüfen Sie in 6 Kategorien ob Ihr Aufhebungsvertrag faire Konditionen enthält.',
            totalTime: 'PT3M',
            step: [
              { '@type': 'HowToStep', position: 1, name: '6 Kategorien beantworten', text: '6 Kategorien zum Vertrag beantworten' },
              { '@type': 'HowToStep', position: 2, name: 'Ampelbewertung erhalten', text: 'Ampelbewertung pro Kategorie erhalten' },
              { '@type': 'HowToStep', position: 3, name: 'Gesamtergebnis ansehen', text: 'Gesamtergebnis und Handlungsempfehlung' },
            ],
          }),
        }}
      />

      {/* GEO-Optimierung */}
      <div itemScope itemType="https://schema.org/WebApplication" style={{ display: 'none' }}>
        <meta itemProp="name" content="Aufhebungsvertrag-Checker" />
        <meta itemProp="description" content="Prüfen Sie ob Ihr Aufhebungsvertrag faire Konditionen enthält — Ampelbewertung in 6 Kategorien." />
        <meta itemProp="author" content="Fatih Bektas, Fachanwalt für Arbeitsrecht" />
        <meta itemProp="inLanguage" content="de" />
        <meta itemProp="applicationCategory" content="Legal Tool" />
        <meta itemProp="isBasedOn" content="§109 GewO, §123 BGB, §159 SGB III, §7 BUrlG, BAG 6 AZR 75/18" />
      </div>

      {sidebar}

      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between py-4 px-6 bg-white border-b border-border">
          <Link href="/" className="flex items-center no-underline">
            <Image src="/logo.png" alt="gekuendigt-abfindung.de" width={120} height={40} className="h-8 w-auto" priority />
          </Link>
          <a href="tel:+49622295992400" className="text-[0.82rem] font-semibold text-gold-dark no-underline">
            +49 6222 9599 2400
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
                Kategorie {catIdx} von 6
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
                    href="/#kontakt"
                    className="inline-block py-3 px-6 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-[0.88rem] font-semibold no-underline text-center transition-all hover:bg-[#1a1409]"
                  >
                    Jetzt kostenlos prüfen lassen &rarr;
                  </Link>
                </div>
              </>
            )}

            {/* Step Content */}
            {stepContent()}

            {/* Weiter-Button (shown when InfoBox is displayed via selectWithInfo) */}
            {pendingNext && (
              <button
                onClick={continueFromInfo}
                className="mt-6 w-full py-4 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-[#1a1409] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,31,14,0.25)]"
              >
                Weiter &rarr;
              </button>
            )}

            {/* Zurück-Button */}
            {history.length > 0 && (
              <button
                onClick={goBack}
                className="mt-4 bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-gold transition-colors p-0"
              >
                &larr; Zurück
              </button>
            )}
          </div>
        </div>

        {/* BERT-Interlinker: Weitere relevante Themen */}
        {step === 'S1' && !history.length && (
          <div className="px-6 pb-6">
            <div className="w-full max-w-[540px] mx-auto">
              <WeitereLinkvorschlaege currentPath="/aufhebungsvertrag-pruefen" />
            </div>
          </div>
        )}

        {/* FAQ Section (below checker) */}
        {step === 'S1' && !history.length && (
          <div className="px-6 pb-10">
            <div className="w-full max-w-[540px] mx-auto">
              <h2 className="font-serif text-[clamp(1.2rem,3vw,1.5rem)] font-bold text-ink mb-5">
                Häufige Fragen zum Aufhebungsvertrag
              </h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-border rounded-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-4 px-5 bg-white border-none cursor-pointer font-sans text-left"
                    >
                      <span className="text-[0.95rem] font-semibold text-ink pr-4">{faq.q}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`min-w-[18px] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4">
                        <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
