'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import AuthorByline from '@/components/AuthorByline';
import AuthorBox from '@/components/AuthorBox';
import { SEO_CONFIG } from '@/lib/seo-config';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';

const faqs = [
  {
    q: 'Wie viel Resturlaub steht mir bei Kündigung noch zu?',
    a: 'Das hängt vom Monat des Ausscheidens ab. Nach § 5 Abs. 1 BUrlG gilt: Endet das Arbeitsverhältnis nach dem 30. Juni und ist die Wartezeit von 6 Monaten erfüllt, haben Sie Anspruch auf den vollen gesetzlichen Jahresurlaub. Endet es im 1. Halbjahr (Januar bis Juni), erhalten Sie 1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat. Beispiel: Ausscheiden am 31. März bei 24 Tagen Jahresurlaub → 3/12 × 24 = 6 Tage Resturlaub.',
  },
  {
    q: 'Verfällt mein Resturlaub, wenn ich ihn nicht rechtzeitig nehme?',
    a: 'Nein — nicht automatisch. Nach der neueren Rechtsprechung des EuGH (C-684/16 „Max-Planck") und BAG (9 AZR 541/15) verfällt Urlaub nur, wenn der Arbeitgeber Sie rechtzeitig, klar und schriftlich auf den drohenden Verfall hingewiesen hat. Fehlt dieser Hinweis, sammeln sich Urlaubsansprüche über Jahre an. Bei Kündigung müssen sie dann in voller Höhe abgegolten werden (§ 7 Abs. 4 BUrlG).',
  },
  {
    q: 'Was passiert mit Resturlaub, wenn ich nach dem 30. Juni gekündigt werde?',
    a: 'Nach § 5 Abs. 1 lit. c BUrlG haben Sie Anspruch auf den vollen gesetzlichen Mindesturlaub — bei 5-Tage-Woche also 20 Tage, bei 6-Tage-Woche 24 Tage. Für den übergesetzlichen (vertraglichen) Anteil kommt es darauf an, was in Ihrem Arbeitsvertrag steht: Enthält der Vertrag eine wirksame Pro-rata-temporis-Klausel, wird auch der übervertragliche Teil anteilig gekürzt. Ohne solche Klausel steht Ihnen der volle vertragliche Jahresurlaub zu.',
  },
  {
    q: 'Kann ich Resturlaub auszahlen lassen, statt ihn zu nehmen?',
    a: 'Grundsätzlich nein — Urlaub muss nach § 7 Abs. 2 BUrlG in Freizeit gewährt werden. Eine Ausnahme gilt nur bei Beendigung des Arbeitsverhältnisses: Wenn der Resturlaub wegen Ende des Arbeitsverhältnisses nicht mehr genommen werden kann, entsteht ein Anspruch auf Urlaubsabgeltung nach § 7 Abs. 4 BUrlG. Diesen können Sie mit unserem Urlaubsabgeltungsrechner in Euro berechnen.',
  },
  {
    q: 'Muss ich meinen Resturlaub im Kündigungsschreiben erwähnen?',
    a: 'Nein, das ist rechtlich nicht erforderlich. Der Urlaubsanspruch entsteht automatisch aus dem Bundesurlaubsgesetz und dem Arbeitsvertrag. Praktisch empfiehlt es sich aber, den Resturlaub im Rahmen der Kündigung oder eines Aufhebungsvertrags schriftlich zu klären — samt Regelung, ob Sie ihn abbummeln oder abgelten lassen. Sonst drohen Streitigkeiten über den Anspruch.',
  },
  {
    q: 'Wie lange kann ich Resturlaub nach Kündigung noch geltend machen?',
    a: 'Der Urlaubsanspruch selbst verjährt regelmäßig nach 3 Jahren (§ 195 BGB), gerechnet ab Ende des Urlaubsjahres. WICHTIG: Viele Arbeitsverträge enthalten Ausschlussfristen von 3 oder 6 Monaten nach Beendigung. Wer diese Frist verpasst, verliert den Anspruch endgültig — auch auf Urlaubsabgeltung. Deshalb: Sofort nach Zugang der Kündigung Resturlaub schriftlich einfordern.',
  },
  {
    q: 'Wird der Resturlaub anders berechnet, wenn ich Teilzeit arbeite?',
    a: 'Ja. Bei Teilzeit skaliert der Urlaubsanspruch proportional zur Zahl der wöchentlichen Arbeitstage. Formel: gesetzlicher Mindesturlaub × persönliche Arbeitstage / 5 (bzw. 6). Wer 3 Tage die Woche arbeitet, hat also Anspruch auf 20 × 3/5 = 12 Tage gesetzlichen Mindesturlaub — nicht auf 20. Für eine genaue Berechnung bei Teilzeit siehe unseren Teilzeit-Urlaubsrechner.',
  },
];

/* ─── Berechnungslogik nach BUrlG ─── */

interface Ergebnis {
  gesetzlicherAnteil: number;
  uebergesetzlichAnteil: number;
  gesamt: number;
  hinweise: string[];
  szenario: 'erste-hj' | 'zweite-hj' | 'wartezeit-offen';
}

function berechneResturlaub(input: {
  jahresurlaub: number;
  wochenarbeitstage: number;
  ausscheidedatum: Date;
  eintrittsdatum: Date;
  proRataKlausel: boolean;
}): Ergebnis {
  const hinweise: string[] = [];

  // 1) Gesetzlicher Mindesturlaub nach § 3 BUrlG
  //    5-Tage-Woche: 20, 6-Tage-Woche: 24. Skaliert auf persönliche Arbeitstage.
  const mindesturlaubBasis = input.wochenarbeitstage === 6 ? 24 : 20;

  // 2) Jahresurlaub darf nie unter dem gesetzlichen Mindesturlaub liegen
  const effektiverJahresurlaub = Math.max(input.jahresurlaub, mindesturlaubBasis);
  const uebergesetzlich = effektiverJahresurlaub - mindesturlaubBasis;

  // 3) Monat des Ausscheidens (1-12)
  const monatAusscheiden = input.ausscheidedatum.getMonth() + 1;

  // 4) Wartezeit § 4 BUrlG: 6 Monate ab Eintritt
  const wartezeit_ende = new Date(input.eintrittsdatum);
  wartezeit_ende.setMonth(wartezeit_ende.getMonth() + 6);
  const wartezeitErfuellt = input.ausscheidedatum >= wartezeit_ende;

  // 5) Beschäftigungsmonate im Austrittsjahr (angefangene zählen voll,
  //    wenn > 15 Tage — sonst nicht. Vereinfachung: volle Monate zählen)
  const eintrittImAusstrittsjahr =
    input.eintrittsdatum.getFullYear() === input.ausscheidedatum.getFullYear()
      ? input.eintrittsdatum.getMonth() + 1
      : 1;
  const monateImJahr = Math.max(0, monatAusscheiden - eintrittImAusstrittsjahr + 1);

  const anteilig = (tage: number): number => Math.round((tage / 12) * monateImJahr);

  let gesetzlicherAnteil: number;
  let uebergesetzlichAnteil: number;
  let szenario: Ergebnis['szenario'];

  if (!wartezeitErfuellt) {
    // Vor Erfüllung Wartezeit: nur Teilurlaub 1/12 pro Monat (§ 5 Abs. 1 lit. a BUrlG)
    gesetzlicherAnteil = anteilig(mindesturlaubBasis);
    uebergesetzlichAnteil = anteilig(uebergesetzlich);
    szenario = 'wartezeit-offen';
    hinweise.push(
      'Die 6-monatige Wartezeit nach § 4 BUrlG ist noch nicht erfüllt — es besteht daher nur ein anteiliger Teilurlaub von 1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat (§ 5 Abs. 1 lit. a BUrlG).',
    );
  } else if (monatAusscheiden <= 6) {
    // Ausscheiden im 1. Halbjahr: 1/12 pro Monat (§ 5 Abs. 1 lit. c BUrlG)
    gesetzlicherAnteil = anteilig(mindesturlaubBasis);
    uebergesetzlichAnteil = anteilig(uebergesetzlich);
    szenario = 'erste-hj';
    hinweise.push(
      'Ausscheiden im 1. Halbjahr: anteiliger Urlaubsanspruch nach § 5 Abs. 1 lit. c BUrlG — 1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat.',
    );
  } else {
    // Ausscheiden im 2. Halbjahr nach erfüllter Wartezeit:
    // Voller gesetzlicher Mindesturlaub (§ 5 Abs. 1 lit. c BUrlG),
    // übergesetzlicher Teil je nach Klausel.
    gesetzlicherAnteil = mindesturlaubBasis;
    szenario = 'zweite-hj';
    if (input.proRataKlausel) {
      uebergesetzlichAnteil = anteilig(uebergesetzlich);
      hinweise.push(
        'Ausscheiden im 2. Halbjahr: Voller gesetzlicher Mindesturlaub. Der übervertragliche Anteil wird durch die Pro-rata-Klausel Ihres Arbeitsvertrags anteilig gekürzt.',
      );
    } else {
      uebergesetzlichAnteil = uebergesetzlich;
      hinweise.push(
        'Ausscheiden im 2. Halbjahr ohne Pro-rata-Klausel: Voller Jahresurlaub — sowohl der gesetzliche Mindesturlaub als auch der übervertragliche Anteil ungekürzt.',
      );
    }
  }

  return {
    gesetzlicherAnteil,
    uebergesetzlichAnteil,
    gesamt: gesetzlicherAnteil + uebergesetzlichAnteil,
    hinweise,
    szenario,
  };
}

function formatDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/* ─── UI ─── */

export default function ResturlaubRechner() {
  const [jahresurlaub, setJahresurlaub] = useState('30');
  const [wochenarbeitstage, setWochenarbeitstage] = useState('5');
  const [eintritt, setEintritt] = useState('');
  const [austritt, setAustritt] = useState('');
  const [proRata, setProRata] = useState<'ja' | 'nein'>('nein');
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  function handleBerechnen() {
    setFehler(null);
    const u = Number(jahresurlaub);
    const wt = Number(wochenarbeitstage);
    if (!u || u <= 0 || u > 60) {
      setFehler('Bitte einen realistischen Jahresurlaub eingeben (1–60 Tage).');
      return;
    }
    if (![5, 6].includes(wt)) {
      setFehler('Bitte 5 oder 6 Wochenarbeitstage wählen.');
      return;
    }
    if (!eintritt || !austritt) {
      setFehler('Bitte Eintritts- und Ausscheidedatum eingeben.');
      return;
    }
    const eintrittsDatum = new Date(eintritt);
    const austrittsDatum = new Date(austritt);
    if (isNaN(eintrittsDatum.getTime()) || isNaN(austrittsDatum.getTime())) {
      setFehler('Bitte gültige Datumsangaben verwenden.');
      return;
    }
    if (austrittsDatum < eintrittsDatum) {
      setFehler('Das Ausscheidedatum darf nicht vor dem Eintritt liegen.');
      return;
    }

    const r = berechneResturlaub({
      jahresurlaub: u,
      wochenarbeitstage: wt,
      ausscheidedatum: austrittsDatum,
      eintrittsdatum: eintrittsDatum,
      proRataKlausel: proRata === 'ja',
    });
    setErgebnis(r);
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/resturlaub-bei-kuendigung-rechner/`}
        pageTitle="Resturlaub bei Kündigung Rechner — § 5 BUrlG kostenlos berechnen"
        pageDescription="Kostenloser Resturlaub-Rechner bei Kündigung nach § 5 BUrlG. Berechnen Sie anteiligen und vollen Urlaubsanspruch für 1. + 2. Halbjahr. Vom Fachanwalt für Arbeitsrecht."
        pageType="WebApplication"
        appName="Resturlaub-bei-Kündigung-Rechner"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools/` },
          { name: 'Resturlaub bei Kündigung berechnen', url: `${SEO_CONFIG.baseUrl}/resturlaub-bei-kuendigung-rechner/` },
        ]}
        speakableSelectors={['#direktantwort', '#ergebnis-box']}
        isBasedOn={[
          { name: '§ 3 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__3.html' },
          { name: '§ 4 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__4.html' },
          { name: '§ 5 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__5.html' },
          { name: '§ 7 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__7.html' },
        ]}
        includeOrganization={false}
        includeRating={false}
      />

      {/* Schema.org — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Schema.org — HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Resturlaub bei Kündigung berechnen',
            description: 'So berechnen Sie Ihren Resturlaubsanspruch nach § 5 BUrlG in 3 Schritten.',
            totalTime: 'PT1M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Vertragsdaten eingeben',
                text: 'Tragen Sie vertraglichen Jahresurlaub, Wochenarbeitstage sowie Eintritts- und Ausscheidedatum ein.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Pro-rata-Klausel prüfen',
                text: 'Prüfen Sie im Arbeitsvertrag, ob eine Klausel zur anteiligen Kürzung des Urlaubs besteht.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Ergebnis erhalten',
                text: 'Klicken Sie auf „Resturlaub berechnen" und sehen Sie sofort den gesetzlichen, übergesetzlichen und Gesamt-Anspruch in Tagen.',
              },
            ],
          }),
        }}
      />

      {/* Hero + GEO Direktantwort */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="text-gold no-underline hover:underline">Tools &amp; Rechner</Link>
            <span className="mx-2">/</span>
            <span>Resturlaub bei Kündigung berechnen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[750px]">
            Resturlaub bei Kündigung Rechner &mdash; Anspruch nach &sect;&nbsp;5 BUrlG berechnen
          </h1>
          <div className="max-w-[750px]">
            <AuthorByline />
          </div>

          <div
            id="direktantwort"
            className="max-w-[720px] text-[0.98rem] text-ink-light leading-relaxed mt-4"
          >
            <p className="m-0">
              Bei Kündigung richtet sich der <strong>Resturlaubsanspruch</strong> nach{' '}
              <strong>&sect;&nbsp;5 BUrlG</strong>: Endet das Arbeitsverhältnis <strong>im 1. Halbjahr</strong>{' '}
              (Januar bis Juni), erhalten Sie <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat</strong>.
              Endet es <strong>nach dem 30. Juni</strong> und ist die 6-monatige Wartezeit (
              <strong>&sect;&nbsp;4 BUrlG</strong>) erfüllt, steht Ihnen der{' '}
              <strong>volle gesetzliche Mindesturlaub</strong> zu &mdash; bei 5-Tage-Woche 20 Tage, bei
              6-Tage-Woche 24 Tage. Übervertraglicher Urlaub darüber hinaus kann durch eine{' '}
              <strong>Pro-rata-Klausel</strong> im Arbeitsvertrag anteilig gekürzt werden. Nicht mehr
              nehmbarer Resturlaub wird in <strong>Urlaubsabgeltung</strong> nach{' '}
              <strong>&sect;&nbsp;7 Abs.&nbsp;4 BUrlG</strong> umgewandelt.
            </p>
          </div>
        </div>
      </div>

      {/* Rechner */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[720px] p-6 md:p-8 bg-cream border border-border rounded-sm">
            <h2 className="font-serif text-[1.35rem] font-bold text-ink mb-4">Jetzt Resturlaub berechnen</h2>

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <div>
                <label htmlFor="jahresurlaub" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Vertraglicher Jahresurlaub (Tage) <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="jahresurlaub"
                  type="number"
                  min={1}
                  max={60}
                  value={jahresurlaub}
                  onChange={(e) => setJahresurlaub(e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm bg-white text-[0.95rem] outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                />
              </div>
              <div>
                <label htmlFor="wochenarbeitstage" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Wochenarbeitstage <span className="text-gold-dark">*</span>
                </label>
                <select
                  id="wochenarbeitstage"
                  value={wochenarbeitstage}
                  onChange={(e) => setWochenarbeitstage(e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm bg-white text-[0.95rem] outline-none focus:border-gold"
                >
                  <option value="5">5 Tage/Woche</option>
                  <option value="6">6 Tage/Woche</option>
                </select>
              </div>
              <div>
                <label htmlFor="eintritt" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Eintrittsdatum <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="eintritt"
                  type="date"
                  value={eintritt}
                  onChange={(e) => setEintritt(e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm bg-white text-[0.95rem] outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="austritt" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Ausscheidedatum <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="austritt"
                  type="date"
                  value={austritt}
                  onChange={(e) => setAustritt(e.target.value)}
                  className="w-full py-3 px-4 border border-border rounded-sm bg-white text-[0.95rem] outline-none focus:border-gold"
                />
              </div>
              <div className="col-span-2 max-md:col-span-1">
                <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                  Pro-rata-Klausel im Arbeitsvertrag?{' '}
                  <span className="text-ink-muted font-normal">
                    (Formulierung „anteilig entsprechend der Beschäftigungsdauer")
                  </span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setProRata('ja')}
                    className={`flex-1 py-2.5 px-4 border-2 rounded-sm text-[0.92rem] font-medium transition-all ${
                      proRata === 'ja'
                        ? 'border-gold bg-gold-bg text-ink'
                        : 'border-border bg-white text-ink hover:border-gold/50'
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setProRata('nein')}
                    className={`flex-1 py-2.5 px-4 border-2 rounded-sm text-[0.92rem] font-medium transition-all ${
                      proRata === 'nein'
                        ? 'border-gold bg-gold-bg text-ink'
                        : 'border-border bg-white text-ink hover:border-gold/50'
                    }`}
                  >
                    Nein / Weiß nicht
                  </button>
                </div>
              </div>
            </div>

            {fehler && (
              <p className="mt-4 py-2 px-3 bg-red-50 border border-red-200 rounded-sm text-[0.86rem] text-red-800">
                {fehler}
              </p>
            )}

            <button
              type="button"
              onClick={handleBerechnen}
              className="mt-5 w-full py-3.5 bg-gold-dark text-white rounded-sm font-semibold text-base cursor-pointer transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Resturlaub berechnen &rarr;
            </button>
          </div>

          {ergebnis && (
            <div id="ergebnis-box" className="max-w-[720px] mt-6 p-6 md:p-8 bg-white border-2 border-gold rounded-sm">
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Ihr Ergebnis
              </div>
              <div className="font-serif text-[2rem] md:text-[2.4rem] font-bold text-ink leading-tight">
                {ergebnis.gesamt}{' '}
                <span className="text-[1.2rem] text-ink-light">Tage Resturlaub</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border-light">
                <div>
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                    Gesetzlicher Anteil
                  </div>
                  <div className="font-serif text-[1.5rem] font-bold text-ink">
                    {ergebnis.gesetzlicherAnteil} Tage
                  </div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">§ 3, § 5 BUrlG</div>
                </div>
                <div>
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                    Übervertraglich
                  </div>
                  <div className="font-serif text-[1.5rem] font-bold text-ink">
                    {ergebnis.uebergesetzlichAnteil} Tage
                  </div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Vertraglicher Zusatz</div>
                </div>
              </div>

              {ergebnis.hinweise.map((h, i) => (
                <p
                  key={i}
                  className="mt-4 py-3 px-4 bg-cream border-l-[3px] border-gold rounded-sm text-[0.88rem] text-ink-light leading-relaxed"
                >
                  {h}
                </p>
              ))}

              <div className="mt-6 pt-6 border-t border-border-light">
                <p className="text-[0.88rem] text-ink-light mb-3">
                  Können Sie diesen Resturlaub vor Beendigung des Arbeitsverhältnisses nicht mehr nehmen?
                  Dann wandelt er sich in <strong>Urlaubsabgeltung</strong> nach § 7 Abs. 4 BUrlG um &mdash; als
                  Geldbetrag ausgezahlt zusammen mit der letzten Lohnabrechnung.
                </p>
                <Link
                  href="/urlaubsabgeltung-rechner/"
                  className="inline-flex items-center gap-2 py-3 px-5 bg-gold-dark text-white rounded-sm font-semibold text-[0.92rem] no-underline transition-all hover:bg-[#635428]"
                >
                  Urlaubsabgeltung in Euro berechnen &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Erklärung: Formel + Halbjahres-Regel */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtsgrundlage
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
              So funktioniert die Resturlaubs-Berechnung nach &sect;&nbsp;5 BUrlG
            </h2>
            <p className="text-[0.98rem] text-ink-light leading-relaxed mb-5">
              Der Anspruch auf Resturlaub bei Kündigung hängt zwei Fragen: <strong>Ist die 6-monatige
              Wartezeit (&sect;&nbsp;4 BUrlG) erfüllt?</strong> Und <strong>in welchem Halbjahr endet das
              Arbeitsverhältnis?</strong>
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  1. Wartezeit noch nicht erfüllt (unter 6 Monaten Beschäftigung)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Anspruch auf Teilurlaub nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;a BUrlG:{' '}
                  <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat.</strong>
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  2. Ausscheiden im 1. Halbjahr (Januar bis Juni)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  Anteiliger Anspruch nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;c BUrlG:{' '}
                  <strong>1/12 des Jahresurlaubs pro vollem Beschäftigungsmonat.</strong> Beispiel:
                  Ausscheiden am 31.&nbsp;März, 24&nbsp;Tage Jahresurlaub &rarr; 3/12&nbsp;&times;&nbsp;24 =
                  6&nbsp;Tage Resturlaub.
                </p>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-gold rounded-sm">
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  3. Ausscheiden im 2. Halbjahr (Juli bis Dezember)
                </div>
                <p className="text-[0.9rem] text-ink-light m-0 leading-relaxed">
                  <strong>Voller gesetzlicher Mindesturlaub</strong> nach &sect;&nbsp;5 Abs.&nbsp;1 lit.&nbsp;c
                  BUrlG (20 Tage bei 5-Tage-Woche, 24 Tage bei 6-Tage-Woche). Der übervertragliche Anteil
                  bleibt <strong>nur dann anteilig kürzbar</strong>, wenn eine wirksame Pro-rata-Klausel im
                  Arbeitsvertrag steht.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[0.88rem] text-ink-muted leading-relaxed">
              Verfasst von{' '}
              <Link href="/autor/fatih-bektas/" className="font-semibold text-ink no-underline hover:text-gold-dark">
                Fatih Bektas
              </Link>
              , Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg. Stand: Juli 2026 (aktuelle Rechtslage
              zum Bundesurlaubsgesetz).
            </p>
          </div>
        </div>
      </section>

      {/* Verwandte Tools */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Verwandte Rechner
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-4">
              Nächste Schritte bei Kündigung
            </h2>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <Link
                href="/urlaubsabgeltung-rechner/"
                className="p-5 bg-cream border border-border rounded-sm no-underline hover:border-gold hover:bg-gold-bg transition-all"
              >
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Urlaubsabgeltung berechnen &rarr;
                </div>
                <div className="text-[0.86rem] text-ink-light">
                  Resturlaub, der nicht mehr genommen werden kann, in Euro auszahlen lassen (&sect;&nbsp;7 Abs.&nbsp;4 BUrlG)
                </div>
              </Link>
              <Link
                href="/urlaub-teilzeit-rechner/"
                className="p-5 bg-cream border border-border rounded-sm no-underline hover:border-gold hover:bg-gold-bg transition-all"
              >
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Urlaubsanspruch Teilzeit &rarr;
                </div>
                <div className="text-[0.86rem] text-ink-light">
                  Wie viel Urlaub steht Ihnen bei Teilzeit oder verkürzter Woche zu?
                </div>
              </Link>
              <Link
                href="/abfindungsrechner/"
                className="p-5 bg-cream border border-border rounded-sm no-underline hover:border-gold hover:bg-gold-bg transition-all"
              >
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Abfindungsrechner &rarr;
                </div>
                <div className="text-[0.86rem] text-ink-light">
                  Höhe der Abfindung nach Kündigung realistisch schätzen &mdash; 3 Szenarien
                </div>
              </Link>
              <Link
                href="/kuendigungsfrist-rechner/"
                className="p-5 bg-cream border border-border rounded-sm no-underline hover:border-gold hover:bg-gold-bg transition-all"
              >
                <div className="font-serif text-[1.05rem] font-bold text-ink mb-1">
                  Kündigungsfrist-Rechner &rarr;
                </div>
                <div className="text-[0.86rem] text-ink-light">
                  Wann endet Ihr Arbeitsverhältnis tatsächlich? &sect;&nbsp;622 BGB
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Häufige Fragen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Fragen zum Resturlaub bei Kündigung
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* AuthorBox + related */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <AuthorBox />
          </div>
        </div>
      </section>

      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/resturlaub-bei-kuendigung-rechner" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Individuelle Prüfung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Streit um Resturlaub oder Urlaubsabgeltung?
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[620px] mx-auto leading-relaxed mb-6">
            Der Rechner liefert eine Orientierung nach &sect;&nbsp;5 BUrlG. Für die konkrete
            Auseinandersetzung mit dem Arbeitgeber &mdash; besonders bei komplizierter Klausel-Lage,
            Ausschlussfristen im Vertrag oder gleichzeitiger Abfindungsverhandlung &mdash; prüfen wir Ihren
            Fall kostenlos.
          </p>
          <Link
            href="/mandantenaufnahme/"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white rounded-sm font-semibold text-[0.98rem] no-underline transition-all hover:bg-[#635428]"
          >
            Kostenlose Ersteinschätzung anfragen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
