'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Wann habe ich Anspruch auf Urlaubsabgeltung?',
    a: 'Der Anspruch entsteht, wenn das Arbeitsverhältnis endet und offene Urlaubstage nicht mehr genommen werden können. Voraussetzung: Der Urlaub konnte wegen Beendigung des Arbeitsverhältnisses tatsächlich nicht gewährt werden — unabhängig davon, ob Sie gekündigt wurden, selbst gekündigt haben oder einen Aufhebungsvertrag unterzeichnet haben.',
  },
  {
    q: 'Wie wird die Urlaubsabgeltung berechnet?',
    a: 'Nach §11 BUrlG: Durchschnittlicher Verdienst der letzten 13 Wochen geteilt durch die Arbeitstage in diesen 13 Wochen, multipliziert mit den ausstehenden Urlaubstagen. Überstundenzuschläge bleiben unberücksichtigt, Lohnerhöhungen werden einbezogen.',
  },
  {
    q: 'Verfällt mein Urlaubsanspruch automatisch?',
    a: 'Nein — nicht ohne Weiteres. Seit den Grundsatzentscheidungen des EuGH und des BAG 2018/2019 verfällt Urlaub nur, wenn der Arbeitgeber Sie rechtzeitig und transparent auf den drohenden Verfall hingewiesen hat. Fehlt dieser Hinweis, können Urlaubsansprüche über Jahre angesammelt und bei Beendigung des Arbeitsverhältnisses vollständig als Urlaubsabgeltung gefordert werden.',
  },
  {
    q: 'Wird die Urlaubsabgeltung wie Gehalt versteuert?',
    a: 'Ja. Die Urlaubsabgeltung ist voll steuer- und sozialversicherungspflichtig wie normales Arbeitsentgelt. Die Fünftelregelung (§34 EStG) gilt hier nicht — anders als bei Abfindungen.',
  },
  {
    q: 'Kann mein Arbeitgeber Urlaubsabgeltung verweigern?',
    a: 'Nein. Die Urlaubsabgeltung ist ein zwingendes gesetzliches Recht (§13 Abs. 1 BUrlG) — sie kann weder im Arbeitsvertrag noch im Aufhebungsvertrag wirksam ausgeschlossen werden. Verweigert der Arbeitgeber die Zahlung, können Sie den Anspruch arbeitsgerichtlich durchsetzen.',
  },
  {
    q: 'Gilt auch Urlaub aus dem Vorjahr?',
    a: 'Ja, sofern der Urlaub nicht wirksam verfallen ist. Urlaubstage aus dem Vorjahr, die übertragen wurden oder mangels Hinweis durch den Arbeitgeber nicht verfallen konnten, sind bei Beendigung des Arbeitsverhältnisses ebenfalls vollständig abzugelten.',
  },
  {
    q: 'Wie lange habe ich Zeit, Urlaubsabgeltung zu fordern?',
    a: 'Die gesetzliche Verjährungsfrist beträgt 3 Jahre (§195 BGB). Viele Arbeitsverträge enthalten jedoch Ausschlussfristen von 3–6 Monaten nach Fälligkeit. Wer diese Frist verpasst, verliert den Anspruch — daher sofort nach Beendigung des Arbeitsverhältnisses handeln.',
  },
];

const mindesturlaubTabelle = [
  { tage: 6, werktage: 24, arbeitstage: 24 },
  { tage: 5, werktage: 24, arbeitstage: 20 },
  { tage: 4, werktage: 24, arbeitstage: 16 },
  { tage: 3, werktage: 24, arbeitstage: 12 },
  { tage: 2, werktage: 24, arbeitstage: 8 },
];

function euro(val: number): string {
  return val.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function anteilUrlaub(eintritt: Date, beendigung: Date, jahresUrlaub: number): number {
  const monate = Math.floor((beendigung.getTime() - eintritt.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  if (monate >= 6) return jahresUrlaub;
  return Math.round((jahresUrlaub / 12) * Math.max(monate, 0));
}

const inputClass =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';
const selectClass =
  'form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';

export default function UrlaubsabgeltungRechnerPage() {
  const [gehalt, setGehalt] = useState('');
  const [arbeitstage, setArbeitstage] = useState(5);
  const [urlaubstage, setUrlaubstage] = useState('');
  const [anteilOffen, setAnteilOffen] = useState(false);
  const [jahresUrlaub, setJahresUrlaub] = useState(20);
  const [eintrittDatum, setEintrittDatum] = useState('');
  const [beendigungsDatum, setBeendigungsDatum] = useState('');
  const [hinweisOffen, setHinweisOffen] = useState(true);

  const [result, setResult] = useState<{
    tagesgehalt: number;
    abgeltungBrutto: number;
    abgeltungNetto: number;
    offeneTage: number;
  } | null>(null);

  const [anteilResult, setAnteilResult] = useState<{
    anspruch: number;
  } | null>(null);

  function berechneAnteil() {
    if (!eintrittDatum || !beendigungsDatum) return;
    const anspruch = anteilUrlaub(new Date(eintrittDatum), new Date(beendigungsDatum), jahresUrlaub);
    setAnteilResult({ anspruch });
  }

  function berechnen() {
    const g = parseFloat(gehalt.replace(/\./g, '').replace(',', '.'));
    const u = parseInt(urlaubstage, 10);
    if (!g || g <= 0 || !u || u <= 0) return;

    const wochengehalt = (g * 3) / 13;
    const tagesgehalt = wochengehalt / arbeitstage;
    const abgeltungBrutto = tagesgehalt * u;
    const abgeltungNetto = abgeltungBrutto * 0.65;

    setResult({ tagesgehalt, abgeltungBrutto, abgeltungNetto, offeneTage: u });
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/urlaubsabgeltung-rechner`}
        pageTitle="Urlaubsabgeltungsrechner — §7 Abs. 4 BUrlG"
        pageDescription="Kostenloser Urlaubsabgeltungsrechner nach §11 BUrlG. Berechnen Sie Ihren Resturlaub-Abgeltungsanspruch nach Kündigung oder Aufhebungsvertrag."
        pageType="WebApplication"
        appName="Urlaubsabgeltungsrechner — §7 Abs. 4 BUrlG"
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools` },
          { name: 'Urlaubsabgeltung berechnen', url: `${SEO_CONFIG.baseUrl}/urlaubsabgeltung-rechner` },
        ]}
        speakableSelectors={['#ergebnis-box']}
        isBasedOn={[
          { name: '§7 Abs. 4 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__7.html' },
          { name: '§11 Bundesurlaubsgesetz (BUrlG)', url: 'https://www.gesetze-im-internet.de/burlg/__11.html' },
        ]}
        includeOrganization={false}
        includeRating={false}
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
            name: 'Urlaubsabgeltung berechnen in 3 Schritten',
            description: 'So berechnen Sie Ihren Urlaubsabgeltungsanspruch nach §11 BUrlG mit unserem kostenlosen Rechner.',
            totalTime: 'PT1M',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Bruttomonatsgehalt eingeben', text: 'Geben Sie das durchschnittliche Bruttomonatsgehalt der letzten 13 Wochen vor Beendigung des Arbeitsverhältnisses ein — ohne Überstundenzuschläge.' },
              { '@type': 'HowToStep', position: 2, name: 'Arbeitstage und Urlaubstage angeben', text: 'Wählen Sie Ihre wöchentlichen Arbeitstage und tragen Sie die ausstehenden Urlaubstage ein.' },
              { '@type': 'HowToStep', position: 3, name: 'Ergebnis erhalten', text: "Klicken Sie auf 'Berechnen' und erhalten Sie sofort Ihren Urlaubsabgeltungsanspruch brutto nach §11 BUrlG." },
            ],
          }),
        }}
      />

      {/* Hero */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="text-gold no-underline hover:underline">Tools &amp; Rechner</Link>
            <span className="mx-2">/</span>
            <span>Urlaubsabgeltung berechnen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Urlaubsabgeltung berechnen &mdash; Ihr Anspruch nach &sect;7 Abs. 4 BUrlG
          </h1>

          {/* Direktantwort (GEO) */}
          <div id="direktantwort" className="max-w-[640px] text-[0.95rem] text-ink-light leading-relaxed mt-4">
            <p className="m-0">
              Die <strong>Urlaubsabgeltung</strong> ist der finanzielle Ersatz für Resturlaub, der bei Beendigung eines
              Arbeitsverhältnisses nicht mehr genommen werden kann (<strong>&sect;7 Abs. 4 BUrlG</strong>). Sie wird nach der Formel
              des <strong>&sect;11 BUrlG</strong> berechnet: <strong>Durchschnittliches Tagesentgelt der letzten 13 Wochen &times; ausstehende
              Urlaubstage</strong>. Der Anspruch entsteht bei jeder Beendigungsart &mdash; Kündigung, Eigenkündigung oder Aufhebungsvertrag.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kostenlos
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Nach &sect;11 BUrlG
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sofortergebnis
            </span>
          </div>
        </div>
      </div>

      {/* CTA #1 */}
      <section className="py-6 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/30 rounded-sm p-5 bg-gold-bg flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[0.95rem] text-ink font-semibold m-0">
              Wurde Ihr Resturlaub nach der Kündigung nicht ausgezahlt? Wir prüfen Ihren Abgeltungsanspruch kostenlos.
            </p>
            <Link
              href="/kuendigung-pruefen"
              className="inline-block py-2.5 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.88rem] font-semibold no-underline transition-all hover:bg-[#635428] whitespace-nowrap"
            >
              Jetzt kostenlos prüfen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Rechner */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-8 items-start max-lg:grid-cols-1">

            {/* Linke Karte — Eingaben */}
            <div className="bg-white border border-border-light rounded overflow-hidden">
              <div className="h-2 bg-gold-dark" />
              <div className="p-8">
                <h2 className="font-serif text-[1.3rem] font-bold mb-6">Urlaubsabgeltungsrechner</h2>

                {/* Bruttomonatsgehalt */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Bruttomonatsgehalt (&Oslash; letzte 13 Wochen) <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Das durchschnittliche Bruttomonatsgehalt der letzten 13 Wochen vor Beendigung — ohne Überstundenzuschläge (§11 BUrlG)."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={gehalt}
                    onChange={(e) => setGehalt(e.target.value)}
                    placeholder="z. B. 3.500"
                    className={inputClass}
                  />
                </div>

                {/* Arbeitstage */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Arbeitstage pro Woche <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Ihre vertraglich vereinbarte wöchentliche Arbeitszeit in Tagen."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <select value={arbeitstage} onChange={(e) => setArbeitstage(Number(e.target.value))} className={selectClass}>
                    <option value={1}>1 Tag/Woche</option>
                    <option value={2}>2 Tage/Woche</option>
                    <option value={3}>3 Tage/Woche</option>
                    <option value={4}>4 Tage/Woche</option>
                    <option value={5}>5 Tage/Woche</option>
                    <option value={6}>6 Tage/Woche</option>
                  </select>
                </div>

                {/* Urlaubstage */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Ausstehende Urlaubstage <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Urlaubstage, die bei Beendigung des Arbeitsverhältnisses noch nicht genommen wurden."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={366}
                    value={urlaubstage}
                    onChange={(e) => setUrlaubstage(e.target.value)}
                    placeholder="z. B. 12"
                    className={inputClass}
                  />
                </div>

                {/* Anteiliger Urlaub Accordion */}
                <div className="mb-6 border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setAnteilOffen(!anteilOffen)}
                    className="w-full flex items-center justify-between py-3 px-4 bg-cream text-[0.84rem] font-semibold text-ink cursor-pointer border-none text-left"
                  >
                    Anteiligen Urlaubsanspruch berechnen
                    <svg
                      className={`transition-transform ${anteilOffen ? 'rotate-180' : ''}`}
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {anteilOffen && (
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                          Jahresurlaub (Tage) <span className="text-gold-dark">*</span>
                        </label>
                        <input
                          type="number"
                          min={20}
                          max={50}
                          value={jahresUrlaub}
                          onChange={(e) => setJahresUrlaub(Number(e.target.value))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Eintrittsdatum</label>
                        <input type="date" value={eintrittDatum} onChange={(e) => setEintrittDatum(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Beendigungsdatum</label>
                        <input type="date" value={beendigungsDatum} onChange={(e) => setBeendigungsDatum(e.target.value)} className={inputClass} />
                      </div>
                      <button
                        onClick={berechneAnteil}
                        className="w-full py-2.5 bg-cream border border-gold/30 rounded-sm font-sans text-[0.88rem] font-semibold text-ink cursor-pointer transition-all hover:bg-gold-bg"
                      >
                        Anteil berechnen
                      </button>
                      {anteilResult && (
                        <div className="py-3 px-4 bg-gold-bg border border-gold/20 rounded-sm text-[0.88rem] text-ink">
                          Ihr anteiliger Urlaubsanspruch: <strong>{anteilResult.anspruch} Tage</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Berechnen */}
                <button
                  onClick={berechnen}
                  className="w-full py-3.5 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#1a1408] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  BERECHNEN
                </button>

                <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                  <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung.
                  Für eine verbindliche Einschätzung wenden Sie sich bitte an einen{' '}
                  <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</Link>.
                </p>

                {/* Hinweis-Accordion */}
                <div className="mt-6 border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setHinweisOffen(!hinweisOffen)}
                    className="w-full flex items-center justify-between py-3 px-4 bg-cream text-[0.84rem] font-semibold text-ink cursor-pointer border-none text-left"
                  >
                    Hinweis zur Berechnung der Urlaubsabgeltung
                    <svg
                      className={`transition-transform ${hinweisOffen ? 'rotate-180' : ''}`}
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {hinweisOffen && (
                    <div className="p-4 space-y-3 text-[0.82rem] text-ink-muted leading-relaxed">
                      <div className="py-2.5 px-3 bg-white rounded-sm border border-border">
                        <strong className="text-ink">Bruttomonatsgehalt:</strong> Maßgeblich ist der Durchschnitt der letzten 13 Wochen
                        vor Beendigung. Überstundenzuschläge bleiben unberücksichtigt, Lohnerhöhungen werden einbezogen (&sect;11 BUrlG).
                      </div>
                      <div className="py-2.5 px-3 bg-white rounded-sm border border-border">
                        <strong className="text-ink">Arbeitstage pro Woche:</strong> Die vertraglich vereinbarte wöchentliche Arbeitszeit
                        in Tagen bestimmt die Umrechnung. Bei einer 5-Tage-Woche entsprechen 24 Werktage 20 Arbeitstagen.
                      </div>
                      <div className="py-2.5 px-3 bg-white rounded-sm border border-border">
                        <strong className="text-ink">Ausstehende Urlaubstage:</strong> Alle nicht genommenen Urlaubstage bei Beendigung —
                        einschließlich übertragener Tage aus dem Vorjahr, sofern sie nicht wirksam verfallen sind.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rechte Karte — Ergebnis */}
            <div id="ergebnis-box" className="bg-cream border border-border-light rounded p-8">
              {!result ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold mx-auto mb-4">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-[0.95rem] text-ink-muted">
                    Füllen Sie das Formular aus und klicken Sie auf <strong>Berechnen</strong>.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Hauptergebnis */}
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                      Ihr Urlaubsabgeltungsanspruch
                    </div>
                    <div className="font-serif text-[2rem] font-bold text-gold-dark">
                      {euro(result.abgeltungBrutto)} brutto
                    </div>
                  </div>

                  {/* Kennzahlen */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {euro(result.tagesgehalt)}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Tagesgehalt brutto</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {result.offeneTage}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Urlaubstage offen</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        ~{euro(result.abgeltungNetto)}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Ca. netto*</div>
                    </div>
                  </div>

                  <p className="text-[0.75rem] text-ink-muted italic mb-5">
                    *Schätzwert. Abhängig von Steuerklasse und Sozialabgaben. Keine Steuerberatung.
                  </p>

                  {/* Warnung */}
                  <div className="py-4 px-5 bg-white rounded-sm border-l-[3px] border-gold mb-6">
                    <div className="flex items-start gap-2">
                      <span className="text-gold-dark text-[1.1rem] mt-0.5">&#9888;</span>
                      <div>
                        <div className="text-[0.84rem] font-semibold text-ink mb-1">
                          Ausschlussfrist beachten
                        </div>
                        <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                          Viele Arbeitsverträge enthalten Fristen von 3&ndash;6 Monaten. Fordern Sie Ihren Anspruch
                          unverzüglich schriftlich ein &mdash; sonst können Urlaubsabgeltungsansprüche verfallen.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/kuendigung-pruefen"
                    className="block w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                  >
                    Anspruch jetzt kostenlos prüfen &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Was bedeutet Urlaubsabgeltung? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Was bedeutet Urlaubsabgeltung?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Das Bundesurlaubsgesetz (&sect;1 BUrlG) legt fest, dass jeder Arbeitnehmer in jedem Kalenderjahr
              Anspruch auf bezahlten Erholungsurlaub hat. Bei einer 6-Tage-Woche sind es <strong>24 Werktage</strong> (&sect;3 BUrlG),
              bei der üblichen 5-Tage-Woche entspricht das <strong>20 Urlaubstagen</strong> pro Jahr.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Kann dieser Resturlaub aufgrund einer{' '}
              <Link href="/kuendigung" className="text-gold no-underline hover:underline">Kündigung</Link>,
              eines <Link href="/aufhebungsvertrag" className="text-gold no-underline hover:underline">Aufhebungsvertrags</Link>{' '}
              oder einer sonstigen Beendigung des Arbeitsverhältnisses nicht mehr genommen werden, sieht
              <strong> &sect;7 Abs. 4 BUrlG</strong> eine finanzielle Abgeltung vor &mdash; den sogenannten Urlaubsabgeltungsanspruch.
              Dieser Anspruch entsteht kraft Gesetzes und kann nicht abbedungen werden.
            </p>
          </div>
        </div>
      </section>

      {/* Wie wird die Urlaubsabgeltung berechnet? */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Berechnungsformel
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wie wird die Urlaubsabgeltung berechnet? (&sect;11 BUrlG)
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Berechnung des Urlaubsabgeltungsanspruchs richtet sich nach <strong>&sect;11 BUrlG</strong>. Maßgeblich ist
              der durchschnittliche Verdienst der letzten <strong>13 Wochen</strong> vor Beginn des Urlaubs &mdash; bzw. bei Abgeltung
              vor Beendigung des Arbeitsverhältnisses. Überstundenvergütungen bleiben dabei unberücksichtigt.
              Lohnerhöhungen werden einbezogen; Verdienstminderungen durch Kurzarbeit, Arbeitsausfälle oder
              unverschuldetes Fehlen bleiben außer Betracht.
            </p>

            {/* Formel-Box */}
            <div className="my-8 py-6 px-8 bg-cream border-2 border-gold/30 rounded-sm text-center">
              <div className="text-[0.82rem] font-bold tracking-[0.1em] uppercase text-gold-dark mb-4">Formel nach &sect;11 BUrlG</div>
              <div className="font-serif text-[1.1rem] leading-[1.8] text-ink">
                <strong>Urlaubsabgeltung</strong> =<br />
                <span className="inline-block border-b-2 border-ink/30 px-2">
                  &Oslash; Verdienst letzte 13 Wochen
                </span>
                <br />
                <span className="text-[0.88rem] text-ink-muted">Arbeitstage in 13 Wochen</span>
                <br />
                <span className="text-[1.2rem]">&times;</span> <strong>Resturlaubstage</strong>
              </div>
            </div>

            <h3 className="font-serif text-[1.15rem] font-bold mb-4">Schritte zur Berechnung:</h3>
            <ol className="text-[0.95rem] text-ink-light leading-relaxed space-y-3 pl-5 mb-5">
              <li>
                <strong>Durchschnittlicher Verdienst ermitteln:</strong> Summe des Arbeitsverdienstes (ohne Überstunden)
                der letzten 13 Wochen vor Beendigung.
              </li>
              <li>
                <strong>Durchschnittliches Tagesentgelt berechnen:</strong> Durchschnittlicher Verdienst &divide; Arbeitstage
                in diesen 13 Wochen.
              </li>
              <li>
                <strong>Urlaubsabgeltung berechnen:</strong> Tagesentgelt &times; Anzahl nicht genommener Urlaubstage.
              </li>
            </ol>

            <div className="py-4 px-5 bg-cream rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                Diese Formel berücksichtigt, dass Verdienstausfälle durch Kurzarbeit, unverschuldetes Fehlen
                oder Arbeitsausfälle außer Betracht bleiben (&sect;11 Abs. 1 Satz 3 BUrlG).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gesetzliche Urlaubstabelle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Gesetzliche Grundlage
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Gesetzlicher Mindesturlaub nach BUrlG &mdash; Übersicht
            </h2>
            <div className="overflow-x-auto mb-5">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-4 font-semibold">Arbeitstage/Woche</th>
                    <th className="text-right py-3 px-4 font-semibold">Werktage (gesetzl.)</th>
                    <th className="text-right py-3 px-4 font-semibold">Arbeitstage</th>
                  </tr>
                </thead>
                <tbody>
                  {mindesturlaubTabelle.map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-3 px-4">{row.tage} Tage/Woche</td>
                      <td className="py-3 px-4 text-right">{row.werktage} Werktage</td>
                      <td className="py-3 px-4 text-right font-semibold">{row.arbeitstage} Tage</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed">
              Viele Arbeits- und Tarifverträge sehen mehr Urlaub vor &mdash; dieser vertragliche Anspruch gilt vorrangig.
              Der gesetzliche Mindesturlaub ist nicht abdingbar (&sect;13 BUrlG).
            </p>
          </div>
        </div>
      </section>

      {/* Erklärungs-Sektion */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Urlaubsabgeltung berechnen &mdash; Das müssen Sie wissen
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Im laufenden Urlaubsjahr steht Ihnen Urlaub anteilig zu. Wer zum Beispiel im Juli ausscheidet
              (nach 6 Monaten), hat bereits den <strong>vollen Jahresurlaubsanspruch</strong> erworben (&sect;4 BUrlG).
              Wer früher ausscheidet, erhält <strong>1/12 des Jahresurlaubs pro vollendeten Beschäftigungsmonat</strong>.
              Nicht genommene Tage aus diesem anteiligen Anspruch sind ebenso abzugelten wie Resturlaub aus dem Vorjahr.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Urlaubsabgeltungsansprüche unterliegen der <strong>3-jährigen Verjährungsfrist</strong> nach &sect;195 BGB.
              Gefährlicher sind jedoch arbeitsvertragliche Ausschlussfristen: Viele Verträge sehen vor, dass Ansprüche
              innerhalb von <strong>3 bis 6 Monaten</strong> nach Fälligkeit schriftlich geltend gemacht werden müssen.
              Wer diese Frist verpasst, verliert den Anspruch &mdash; unabhängig von der tatsächlich geleisteten Urlaubszeit.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Seit den Grundsatzentscheidungen des EuGH (C-619/16 und C-684/16) und des BAG (9 AZR 541/15)
              verfällt Urlaub nur noch, wenn der Arbeitgeber den Arbeitnehmer <strong>rechtzeitig und klar</strong> darauf
              hingewiesen hat, dass nicht genommener Urlaub verfällt. Fehlt dieser Hinweis, können sich Urlaubsansprüche
              über mehrere Jahre ansammeln &mdash; und müssen bei Beendigung vollständig abgegolten werden.
              Auch{' '}
              <Link href="/ueberstundenrechner" className="text-gold no-underline hover:underline">Überstunden</Link>{' '}
              sollten Sie in diesem Zusammenhang prüfen. Berechnen Sie außerdem Ihre mögliche{' '}
              <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindung</Link>{' '}
              und prüfen Sie Ihre{' '}
              <Link href="/kuendigungsfrist-rechner" className="text-gold no-underline hover:underline">Kündigungsfrist</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #2 — Dark Banner */}
      <section className="py-[70px] px-8 bg-[#2A1F0E]">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-white mb-3">
            Resturlaub nicht ausgezahlt?
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Neben der Urlaubsabgeltung können nach einer Kündigung weitere Ansprüche bestehen: Abfindung,
            Überstundenvergütung, Zeugnis. Fachanwalt Fatih Bektas prüft alles &mdash; kostenlos und innerhalb von 24 Stunden.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.35)]"
          >
            Jetzt kostenlos anfragen &rarr;
          </Link>
          <div className="flex justify-center gap-5 mt-5 text-[0.78rem] text-white/50">
            <span>&#10003; Antwort in 24h</span>
            <span>&#10003; Kein Kostenrisiko</span>
            <span>&#10003; 68 Fünf-Sterne-Bewertungen auf anwalt.de</span>
          </div>
        </div>
      </section>

      {/* Quellenblock */}
      <section className="py-10 px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a href="https://www.gesetze-im-internet.de/burlg/__7.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;7 BUrlG &mdash; Zeitpunkt, Übertragbarkeit und Abgeltung des Urlaubs &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/burlg/__11.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;11 BUrlG &mdash; Urlaubsentgelt &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.bundesarbeitsgericht.de" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  Bundesarbeitsgericht &mdash; Rechtsprechung zur Urlaubsabgeltung &rarr;
                </a>
              </li>
            </ul>
            <p className="text-[0.78rem] text-ink-muted mt-4 italic leading-relaxed">
              Alle Inhalte wurden von Fachanwalt Fatih Bektas (Rechtsanwaltskammer Karlsruhe, Fachanwalt für
              Arbeitsrecht seit 2011) erstellt und geprüft. Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.
              Keine Rechtsberatung im Einzelfall.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zur Urlaubsabgeltung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA #3 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/20 rounded-sm p-8 bg-cream text-center max-w-[640px] mx-auto">
            <h2 className="font-serif text-[1.3rem] font-bold mb-3">
              Ergebnis berechnet &mdash; was jetzt?
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">
              Neben der Urlaubsabgeltung können nach einer Kündigung weitere Ansprüche bestehen.
              Wir prüfen Ihren gesamten Fall &mdash; kostenlos und unverbindlich.
            </p>
            <Link
              href="/kuendigung-pruefen"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kostenlose Ersteinschätzung vom Fachanwalt &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
