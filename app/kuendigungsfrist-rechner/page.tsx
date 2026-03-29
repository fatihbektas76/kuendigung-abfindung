'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const gesetzlicheFristen = [
  { jahre: 0, frist: '4 Wochen zum 15. oder Monatsende' },
  { jahre: 2, frist: '1 Monat zum Monatsende' },
  { jahre: 5, frist: '2 Monate zum Monatsende' },
  { jahre: 8, frist: '3 Monate zum Monatsende' },
  { jahre: 10, frist: '4 Monate zum Monatsende' },
  { jahre: 12, frist: '5 Monate zum Monatsende' },
  { jahre: 15, frist: '6 Monate zum Monatsende' },
  { jahre: 20, frist: '7 Monate zum Monatsende' },
];

const faqs = [
  {
    q: 'Wann beginnt die Kündigungsfrist zu laufen?',
    a: 'Die Kündigungsfrist beginnt am Tag nach Zugang der Kündigung. Beim Zugang kommt es darauf an, wann die Kündigung in den Machtbereich des Empfängers gelangt ist. Ein Brief gilt in der Regel am Tag des Einwurfs in den Briefkasten als zugegangen — sofern noch mit der täglichen Leerung zu rechnen war.',
  },
  {
    q: 'Gilt die Frist für Arbeitgeber und Arbeitnehmer gleich?',
    a: 'Nein. Die verlängerten Kündigungsfristen nach § 622 Abs. 2 BGB gelten nur für Kündigungen durch den Arbeitgeber. Kündigt der Arbeitnehmer selbst, gilt stets die Grundfrist von vier Wochen — sofern arbeitsvertraglich keine längere Frist vereinbart wurde.',
  },
  {
    q: 'Was ist eine fristlose Kündigung?',
    a: 'Bei einer außerordentlichen (fristlosen) Kündigung aus wichtigem Grund nach § 626 BGB entfallen die Kündigungsfristen vollständig. Das Arbeitsverhältnis endet sofort mit Zugang der Kündigung. Allerdings müssen für eine wirksame fristlose Kündigung strenge Voraussetzungen vorliegen — und sie muss innerhalb von zwei Wochen nach Kenntnis des Kündigungsgrunds ausgesprochen werden.',
  },
  {
    q: 'Kann im Arbeitsvertrag eine längere Frist vereinbart werden?',
    a: 'Ja, zugunsten des Arbeitnehmers immer. Wichtig: Ist im Vertrag vereinbart, dass für beide Seiten die gleiche Frist gilt wie für den Arbeitgeber, ist das zulässig. Die Frist für den Arbeitnehmer darf jedoch nicht länger sein als die für den Arbeitgeber (§ 622 Abs. 6 BGB).',
  },
  {
    q: 'Was passiert, wenn die Kündigungsfrist falsch berechnet wurde?',
    a: 'Eine zu kurz bemessene Kündigungsfrist macht die Kündigung nicht automatisch unwirksam — das Arbeitsverhältnis endet dann zum nächstmöglichen wirksamen Termin (sogenannte Umdeutung). Dies gibt Ihnen jedoch Verhandlungsspielraum, insbesondere wenn Sie auch die inhaltliche Wirksamkeit der Kündigung angreifen wollen.',
  },
];

function berechneEnddatum(
  kuendigungsDatum: Date,
  fristWert: number,
  fristEinheit: string,
  beendigungsart: string,
): Date {
  const rohDatum = new Date(kuendigungsDatum);

  if (fristEinheit === 'tage') {
    rohDatum.setDate(rohDatum.getDate() + fristWert);
  } else if (fristEinheit === 'wochen') {
    rohDatum.setDate(rohDatum.getDate() + fristWert * 7);
  } else if (fristEinheit === 'monate') {
    rohDatum.setMonth(rohDatum.getMonth() + fristWert);
  }

  if (beendigungsart === 'taggenau') {
    return rohDatum;
  }

  if (beendigungsart === 'monatsende') {
    return new Date(rohDatum.getFullYear(), rohDatum.getMonth() + 1, 0);
  }

  if (beendigungsart === '15-oder-monatsende') {
    const tag = rohDatum.getDate();
    if (tag <= 15) {
      return new Date(rohDatum.getFullYear(), rohDatum.getMonth(), 15);
    }
    return new Date(rohDatum.getFullYear(), rohDatum.getMonth() + 1, 0);
  }

  if (beendigungsart === 'quartalsende') {
    const monat = rohDatum.getMonth();
    const quartalEnde = Math.ceil((monat + 1) / 3) * 3 - 1;
    return new Date(rohDatum.getFullYear(), quartalEnde + 1, 0);
  }

  if (beendigungsart === 'halbjahresende') {
    const monat = rohDatum.getMonth();
    if (monat < 6) {
      return new Date(rohDatum.getFullYear(), 6, 0);
    }
    return new Date(rohDatum.getFullYear(), 12, 0);
  }

  if (beendigungsart === 'jahresende') {
    return new Date(rohDatum.getFullYear(), 12, 0);
  }

  return rohDatum;
}

function formatDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatWochentag(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long' });
}

const inputClass =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';
const selectClass =
  'form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';

export default function KuendigungsfristRechnerPage() {
  const [kuendigungsDatum, setKuendigungsDatum] = useState('');
  const [fristWert, setFristWert] = useState(4);
  const [fristEinheit, setFristEinheit] = useState('wochen');
  const [beendigungsart, setBeendigungsart] = useState('15-oder-monatsende');
  const [hinweisOffen, setHinweisOffen] = useState(true);

  const [result, setResult] = useState<{
    enddatum: Date;
    kuendigungsDatum: Date;
    verbleibendeKalendertage: number;
    verbleibendeArbeitswochen: number;
    fristTage: number;
    klagefristEnde: Date;
  } | null>(null);

  function berechnen() {
    if (!kuendigungsDatum) return;
    const kDatum = new Date(kuendigungsDatum);
    const enddatum = berechneEnddatum(kDatum, fristWert, fristEinheit, beendigungsart);
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const verbleibendeKalendertage = Math.ceil((enddatum.getTime() - heute.getTime()) / (1000 * 60 * 60 * 24));
    const verbleibendeArbeitswochen = Math.floor(verbleibendeKalendertage / 7);
    const fristTage = Math.ceil((enddatum.getTime() - kDatum.getTime()) / (1000 * 60 * 60 * 24));
    const klagefristEnde = new Date(kDatum);
    klagefristEnde.setDate(klagefristEnde.getDate() + 21);
    setResult({ enddatum, kuendigungsDatum: kDatum, verbleibendeKalendertage, verbleibendeArbeitswochen, fristTage, klagefristEnde });
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/kuendigungsfrist-rechner/`}
        pageTitle="Kündigungsfrist-Rechner — Wann endet mein Arbeitsverhältnis?"
        pageDescription="Berechnen Sie kostenlos Ihre genaue Kündigungsfrist nach §622 BGB."
        pageType="WebApplication"
        appName="Kündigungsfrist-Rechner — Wann endet mein Arbeitsverhältnis?"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools/` },
          { name: 'Kündigungsfrist berechnen', url: `${SEO_CONFIG.baseUrl}/kuendigungsfrist-rechner/` },
        ]}
        speakableSelectors={['.ergebnis-box']}
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
            name: 'Kündigungsfrist in 3 Schritten berechnen',
            totalTime: 'PT1M',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Datum des Kündigungszugangs eingeben', text: 'Geben Sie das Datum ein, an dem die schriftliche Kündigung bei Ihnen eingegangen ist.' },
              { '@type': 'HowToStep', position: 2, name: 'Kündigungsfrist wählen', text: 'Wählen Sie die Kündigungsfrist in Tagen, Wochen oder Monaten.' },
              { '@type': 'HowToStep', position: 3, name: 'Beendigungstermin auswählen', text: 'Wählen Sie den Beendigungstermin (taggenau, Monatsende, Quartalsende etc.) und erhalten Sie sofort Ihr Ergebnis.' },
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
            <span>Kündigungsfrist berechnen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kündigungsfrist berechnen &mdash; Kostenloser Rechner nach &sect;622 BGB
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Kündigungsfrist berechnen in Sekunden: Geben Sie das Datum der Kündigung und Ihre Frist ein &mdash;
            der Rechner zeigt sofort den genauen Beendigungstermin. Entwickelt von Fachanwalt Fatih Bektas.
          </p>
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
              Kein Login
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sekundengenau
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Kündigungsfrist berechnen</strong> bedeutet, den genauen Beendigungstermin eines Arbeitsverhältnisses zu ermitteln.
              Die Rechtsgrundlage ist <strong>&sect;622 BGB</strong>.
              Die Grundfrist beträgt <strong>4 Wochen zum 15. oder Monatsende</strong>,
              verlängert sich aber mit der Betriebszugehörigkeit auf bis zu <strong>7 Monate zum Monatsende</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #1 */}
      <section className="py-6 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/30 rounded-sm p-5 bg-gold-bg flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[0.95rem] text-ink font-semibold m-0">
              Kündigung erhalten und Frist unklar? Wir prüfen Ihre Kündigung kostenlos — inkl. Abfindungschancen.
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
                <h2 className="font-serif text-[1.3rem] font-bold mb-6">Kündigungsfrist-Rechner</h2>

                {/* Kündigungsdatum */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Kündigung zugegangen am <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Datum, an dem die schriftliche Kündigung bei Ihnen eingegangen ist — nicht das Datum auf dem Kündigungsschreiben."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="date"
                    value={kuendigungsDatum}
                    onChange={(e) => setKuendigungsDatum(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Kündigungsfrist */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Kündigungsfrist <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Geben Sie die Zahl ein und wählen Sie die Einheit. Beispiel: 3 Monate → '3' + 'Monate'."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <div className="grid grid-cols-[1fr_1fr] gap-3">
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={fristWert}
                      onChange={(e) => setFristWert(Number(e.target.value))}
                      className={inputClass}
                    />
                    <select
                      value={fristEinheit}
                      onChange={(e) => setFristEinheit(e.target.value)}
                      className={selectClass}
                    >
                      <option value="tage">Tage</option>
                      <option value="wochen">Wochen</option>
                      <option value="monate">Monate</option>
                    </select>
                  </div>
                </div>

                {/* Beendigungsart */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Kündigung erfolgt zum <span className="text-gold-dark">*</span>
                    </label>
                    <span
                      className="text-ink-muted cursor-help"
                      title="Die meisten Kündigungsfristen enden zum Monatsende. Prüfen Sie Ihren Arbeitsvertrag oder wählen Sie 'Taggenau' wenn nichts anderes vereinbart."
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </span>
                  </div>
                  <select
                    value={beendigungsart}
                    onChange={(e) => setBeendigungsart(e.target.value)}
                    className={selectClass}
                  >
                    <option value="taggenau">Taggenau</option>
                    <option value="15-oder-monatsende">Zum 15. oder Monatsende</option>
                    <option value="monatsende">Zum Monatsende</option>
                    <option value="quartalsende">Zum Quartalsende</option>
                    <option value="halbjahresende">Zum Halbjahresende</option>
                    <option value="jahresende">Zum Jahresende</option>
                  </select>
                </div>

                {/* Berechnen */}
                <button
                  onClick={berechnen}
                  className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  BERECHNEN
                </button>

                <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                  <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung wenden Sie sich bitte an einen{' '}
                  <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</Link>.
                </p>

                {/* Aufklappbarer Hinweis */}
                <div className="mt-6 border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setHinweisOffen(!hinweisOffen)}
                    className="w-full flex items-center justify-between py-3 px-4 bg-cream text-[0.84rem] font-semibold text-ink cursor-pointer border-none text-left"
                  >
                    Hinweis zur Berechnung von Kündigungsfristen
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
                        <strong className="text-ink">Kündigung zugegangen am:</strong> Entscheidend ist der Tag,
                        an dem die Kündigung tatsächlich in Ihren Machtbereich gelangt ist — also z.B. der Tag, an dem
                        der Brief in Ihren Briefkasten eingeworfen wurde.
                      </div>
                      <div className="py-2.5 px-3 bg-white rounded-sm border border-border">
                        <strong className="text-ink">Kündigungsfrist:</strong> Die Frist ergibt sich aus §622 BGB,
                        Ihrem Arbeitsvertrag oder einem anwendbaren Tarifvertrag. Im Zweifel prüfen Sie Ihren
                        Arbeitsvertrag oder lassen Sie die Frist anwaltlich bestimmen.
                      </div>
                      <div className="py-2.5 px-3 bg-white rounded-sm border border-border">
                        <strong className="text-ink">Kündigung erfolgt zum:</strong> Die gesetzliche Grundkündigungsfrist
                        endet zum 15. oder Monatsende. Bei längerer Betriebszugehörigkeit enden die Fristen immer zum
                        Monatsende. Prüfen Sie, ob Ihr Vertrag etwas anderes vorsieht.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rechte Karte — Ergebnis */}
            <div className="ergebnis-box bg-cream border border-border-light rounded p-8">
              {!result ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold mx-auto mb-4">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <p className="text-[0.95rem] text-ink-muted">
                    Füllen Sie das Formular links aus und klicken Sie auf <strong>Berechnen</strong>.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Hauptergebnis */}
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                      Ihr Arbeitsverhältnis endet am
                    </div>
                    <div className="font-serif text-[2rem] font-bold text-gold-dark">
                      {formatDatum(result.enddatum)}
                    </div>
                    <div className="text-[0.92rem] text-ink-muted mt-1">
                      {formatWochentag(result.enddatum)}
                    </div>
                  </div>

                  {/* Kennzahlen */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {result.verbleibendeKalendertage > 0 ? result.verbleibendeKalendertage : 0}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Tage ab heute</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {result.verbleibendeArbeitswochen > 0 ? result.verbleibendeArbeitswochen : 0}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Wochen</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {result.fristTage}
                      </div>
                      <div className="text-[0.72rem] text-ink-muted mt-0.5">Fristdauer (Tage)</div>
                    </div>
                  </div>

                  {/* Klagefrist-Warnung */}
                  <div className="py-4 px-5 bg-white rounded-sm border-l-[3px] border-gold mb-6">
                    <div className="flex items-start gap-2">
                      <span className="text-gold-dark text-[1.1rem] mt-0.5">&#9888;</span>
                      <div>
                        <div className="text-[0.84rem] font-semibold text-ink mb-1">
                          3-Wochen-Frist für Kündigungsschutzklage
                        </div>
                        <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                          Wenn Sie die Kündigung anfechten wollen, müssen Sie innerhalb von 3 Wochen ab Zugang der Kündigung Klage einreichen.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/kuendigung-pruefen"
                    className="block w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                  >
                    Kündigung kostenlos prüfen &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* §622 BGB Tabelle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Gesetzliche Grundlage
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Gesetzliche Kündigungsfristen nach &sect;622 BGB
            </h2>
            <div className="overflow-x-auto mb-5">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-4 font-semibold">Betriebszugehörigkeit</th>
                    <th className="text-left py-3 px-4 font-semibold">Gesetzliche Mindestkündigungsfrist</th>
                  </tr>
                </thead>
                <tbody>
                  {gesetzlicheFristen.map((f, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-3 px-4">
                        {f.jahre === 0 ? 'Grundfrist (ab Beginn)' : `Ab ${f.jahre} Jahren`}
                      </td>
                      <td className="py-3 px-4 font-semibold">{f.frist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.84rem] text-ink-muted leading-relaxed">
              Kürzere Fristen können in Tarifverträgen vereinbart sein. Längere Fristen durch Arbeitsvertrag
              sind immer möglich. In der Probezeit (max. 6 Monate) gilt eine verkürzte Frist von 2 Wochen.
            </p>
          </div>
        </div>
      </section>

      {/* Erklärungstext */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wie wird die Kündigungsfrist berechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die gesetzliche Grundkündigungsfrist für Arbeitnehmer beträgt vier Wochen zum 15. oder zum Ende
              eines Kalendermonats (&sect; 622 Abs. 1 BGB). Mit zunehmender Betriebszugehörigkeit verlängern sich
              die Fristen für den Arbeitgeber — für den Arbeitnehmer bleibt es bei vier Wochen, sofern
              arbeitsvertraglich nichts anderes vereinbart ist.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Entscheidend ist der Tag, an dem die Kündigung tatsächlich zugegangen ist — also in den Machtbereich
              des Empfängers gelangt ist. Ein Brief im Briefkasten gilt als zugegangen, sobald mit einer Leerung
              zu rechnen ist. Wochenend- oder Feiertagszustellungen verschieben den Zugangszeitpunkt bei der
              Berechnung der 3-Wochen-Klagefrist nicht — bei der Berechnung der Kündigungsfrist kann dies in
              manchen Konstellationen aber relevant sein. Im Zweifel gilt: Anwalt fragen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Während der Probezeit (max. 6 Monate) gilt eine verkürzte Kündigungsfrist von nur 2 Wochen —
              ohne den Zusatz &bdquo;zum 15. oder Monatsende&ldquo; (&sect; 622 Abs. 3 BGB).
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Berechnen Sie auch Ihre mögliche Abfindung mit unserem{' '}
              <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindungsrechner</Link>{' '}
              oder prüfen Sie ausstehende Vergütung mit dem{' '}
              <Link href="/ueberstundenrechner" className="text-gold no-underline hover:underline">Überstundenrechner</Link>.
              Alle unsere{' '}
              <Link href="/tools" className="text-gold no-underline hover:underline">kostenlosen Tools</Link>{' '}
              finden Sie auf der Übersichtsseite.
            </p>
          </div>
        </div>
      </section>

      {/* Sonderkündigungsschutz */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtlicher Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wann gelten längere Kündigungsfristen?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Neben den gesetzlichen Fristen nach &sect;622 BGB gibt es Personengruppen, die einen besonderen{' '}
              <Link href="/kuendigung" className="text-gold no-underline hover:underline">Kündigungsschutz</Link> genießen.
              Bei diesen Arbeitnehmern ist eine ordentliche Kündigung entweder ganz ausgeschlossen oder an
              zusätzliche Voraussetzungen geknüpft — unabhängig von der berechneten Frist.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>Schwangere</strong> sind nach &sect;17 MuSchG bis vier Monate nach der Entbindung vor einer Kündigung geschützt.
              <strong> Schwerbehinderte</strong> können nur mit vorheriger Zustimmung des Integrationsamts gekündigt werden (&sect;168 SGB IX).
              <strong> Betriebsratsmitglieder</strong> können während ihrer Amtszeit und ein Jahr danach nur außerordentlich gekündigt werden (&sect;15 KSchG).
              In der <strong>Elternzeit</strong> besteht ein Kündigungsverbot nach &sect;18 BEEG.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Wird eine dieser Schutzvorschriften verletzt, ist die Kündigung in der Regel unwirksam —
              unabhängig davon, ob die Kündigungsfrist korrekt berechnet wurde. Prüfen Sie daher nicht nur die Frist,
              sondern auch, ob besonderer Kündigungsschutz in Ihrem Fall greift.
            </p>
          </div>
        </div>
      </section>

      {/* Erste 3 Schritte nach Kündigung */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Kündigung erhalten &mdash; die ersten 3 Schritte
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>1. Zugang dokumentieren:</strong> Notieren Sie sofort das Datum und die Uhrzeit, zu der
              Sie die Kündigung erhalten haben. Bei persönlicher Übergabe: Bitten Sie einen Zeugen, den Zeitpunkt
              zu bestätigen. Bei Postzustellung zählt der Tag, an dem der Brief im Briefkasten lag.
              Das Zugangsdatum bestimmt den Beginn aller Fristen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>2. 3-Wochen-Frist beachten:</strong> Ab dem Tag des Zugangs läuft die Frist für eine
              Kündigungsschutzklage nach &sect;4 KSchG. Innerhalb dieser drei Wochen müssen Sie entscheiden,
              ob Sie die Kündigung akzeptieren oder gerichtlich anfechten. Versäumen Sie die Frist,
              gilt die Kündigung als wirksam — auch wenn sie rechtlich angreifbar war.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>3. Fachanwalt kontaktieren:</strong> Eine{' '}
              <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">kostenlose Ersteinschätzung</Link>{' '}
              hilft Ihnen, die Situation einzuordnen: Ist die Kündigung wirksam? Lohnt sich eine Klage?
              Besteht Aussicht auf eine{' '}
              <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindung</Link>?
              Handeln Sie schnell — die 3-Wochen-Frist ist nicht verlängerbar.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #2 — Dark Banner */}
      <section className="py-[70px] px-8 bg-[#2A1F0E]">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-white mb-3">
            Frist bekannt — und jetzt?
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Nutzen Sie die verbleibende Zeit. Fachanwalt Fatih Bektas prüft Ihre Kündigung kostenlos und zeigt
            Ihnen, ob eine Abfindung möglich ist.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.35)]"
          >
            Jetzt kostenlos anfragen &rarr;
          </Link>
          <div className="flex justify-center gap-5 mt-5 text-[0.78rem] text-white/50">
            <span>&#10003; Antwort in 24h</span>
            <span>&#10003; Über 68 Fünf-Sterne-Bewertungen</span>
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
                <a href="https://www.gesetze-im-internet.de/bgb/__622.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;622 BGB &mdash; Kündigungsfristen bei Arbeitsverhältnissen &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/kschg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;4 KSchG &mdash; 3-Wochen-Klagefrist &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/bgb/__626.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;626 BGB &mdash; Fristlose Kündigung aus wichtigem Grund &rarr;
                </a>
              </li>
            </ul>
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
            Häufige Fragen zur Kündigungsfrist berechnen
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA #3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/20 rounded-sm p-8 bg-white text-center max-w-[640px] mx-auto">
            <h2 className="font-serif text-[1.3rem] font-bold mb-3">
              Kündigung erhalten — was jetzt konkret tun?
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">
              Neben der Frist ist entscheidend: Ist die Kündigung überhaupt wirksam? Besteht Anspruch auf
              Abfindung? Wir prüfen beides — kostenlos.
            </p>
            <Link
              href="/kuendigung-pruefen"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kostenlose Ersteinschätzung &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
