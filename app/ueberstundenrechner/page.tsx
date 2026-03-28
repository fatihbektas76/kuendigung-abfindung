'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Muss mein Arbeitgeber Überstunden bezahlen?',
    a: 'Grundsätzlich ja — aber nur, wenn die Überstunden angeordnet oder geduldet wurden und keine Pauschalabgeltung vereinbart ist. Enthält Ihr Arbeitsvertrag einen Satz wie „Überstunden sind mit dem Gehalt abgegolten", kann das wirksam sein — allerdings nur im Rahmen von AGB-Kontrolle und Mindestlohnrecht. Lassen Sie die Klausel prüfen.',
  },
  {
    q: 'Wie lange kann ich Überstunden rückwirkend fordern?',
    a: 'Die gesetzliche Verjährungsfrist beträgt 3 Jahre (§ 195 BGB), läuft jedoch meist kürzer ab, weil Arbeitsverträge oder Tarifverträge Ausschlussfristen von 3–6 Monaten vorsehen. Wer diese Fristen verpasst, verliert seinen Anspruch — unabhängig davon, wie viele Überstunden tatsächlich geleistet wurden.',
  },
  {
    q: 'Was gilt als Nachweis für Überstunden?',
    a: 'Stundennachweise, E-Mails, Arbeitszeiterfassungssysteme, Zeugenaussagen von Kollegen oder projektbezogene Dokumentation können als Nachweis dienen. Seit dem EuGH-Urteil „CCOO" (2019) und der Folgeentscheidung des BAG sind Arbeitgeber verpflichtet, Arbeitszeiten zu erfassen — was Ihnen im Streitfall helfen kann.',
  },
  {
    q: 'Was passiert, wenn mein Arbeitsvertrag Überstunden pauschal abgilt?',
    a: 'Pauschalabgeltungsklauseln sind nur wirksam, wenn sie transparent und angemessen sind. Das BAG hat solche Klauseln wiederholt für unwirksam erklärt, wenn unklar ist, wie viele Überstunden damit abgegolten sein sollen. Lassen Sie die Klausel von einem Fachanwalt prüfen — oft ist mehr möglich als der Arbeitsvertrag vermuten lässt.',
  },
  {
    q: 'Gilt der Mindestlohn auch bei Überstunden?',
    a: 'Ja. Überstunden müssen mindestens zum gesetzlichen Mindestlohn vergütet werden (aktuell 12,82 €/Std. ab 2025). Auch wenn eine Abgeltungsklausel vereinbart ist: Unterschreitet die effektive Vergütung pro Stunde den Mindestlohn, ist die Klausel insoweit unwirksam.',
  },
];

function euro(val: number): string {
  return val.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function UeberstundenrechnerPage() {
  const [gehalt, setGehalt] = useState(3200);
  const [wochenstunden, setWochenstunden] = useState(40);
  const [ueberstunden, setUeberstunden] = useState(7);
  const [zuschlagAktiv, setZuschlagAktiv] = useState(false);
  const [zuschlag, setZuschlag] = useState(25);
  const [result, setResult] = useState<{
    stundenlohn: number;
    verguetung: number;
    tageswert: number;
    jahresHochrechnung: number;
  } | null>(null);

  function berechnen() {
    const monatsstunden = wochenstunden * 4.33;
    const stundenlohn = gehalt / monatsstunden;
    const zuschlagFaktor = zuschlagAktiv ? 1 + zuschlag / 100 : 1;
    const verguetung = stundenlohn * ueberstunden * zuschlagFaktor;
    const tageswert = stundenlohn * (wochenstunden / 5);
    const jahresHochrechnung = verguetung * 12;
    setResult({ stundenlohn, verguetung, tageswert, jahresHochrechnung });
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/ueberstundenrechner/`}
        pageTitle="Überstundenrechner — Stundenlohn & Vergütung"
        pageDescription="Berechnen Sie kostenlos Ihren Stundenlohn und ausstehende Überstundenvergütung."
        pageType="WebApplication"
        appName="Überstundenrechner — Stundenlohn & Vergütung"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools/` },
          { name: 'Überstundenrechner', url: `${SEO_CONFIG.baseUrl}/ueberstundenrechner/` },
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
            name: 'Überstundenvergütung berechnen in 3 Schritten',
            totalTime: 'PT1M',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Bruttomonatsgehalt eingeben', text: 'Geben Sie Ihr monatliches Bruttogehalt laut Arbeitsvertrag ein.' },
              { '@type': 'HowToStep', position: 2, name: 'Wochenstunden und Überstunden eintragen', text: 'Tragen Sie Ihre vertraglich vereinbarte Wochenarbeitszeit und die angesammelten Überstunden ein.' },
              { '@type': 'HowToStep', position: 3, name: 'Sofortiges Ergebnis erhalten', text: 'Erhalten Sie sofort Ihren Stundenlohn und die Ihnen zustehende Überstundenvergütung.' },
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
            <span>Überstundenrechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Überstunden berechnen &mdash; Stundenlohn &amp; Vergütung kostenlos
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie in Sekunden Ihren genauen Stundenlohn und die Ihnen zustehende
            Überstundenvergütung nach Kündigung. Entwickelt von Fachanwalt Fatih Bektas für Arbeitsrecht.
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
              Sofortergebnis
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Überstunden berechnen</strong> bedeutet, den Stundenlohn und die ausstehende Vergütung zu ermitteln.
              Der Anspruch ergibt sich aus <strong>&sect;612 BGB</strong> (Vergütungspflicht für Arbeit).
              Die Formel lautet: <strong>Bruttomonatsgehalt &divide; (Wochenstunden &times; 4,33) &times; geleistete Überstunden</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #1 */}
      <section className="py-6 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/30 rounded-sm p-5 bg-gold-bg flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[0.95rem] text-ink font-semibold m-0">
              Haben Sie unbezahlte Überstunden? Wir prüfen Ihre Ansprüche kostenlos.
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
            <div className="bg-white border border-border-light rounded p-8">
              <h2 className="font-serif text-[1.3rem] font-bold mb-6">Überstundenrechner</h2>

              {/* Bruttomonatsgehalt */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">Bruttomonatsgehalt</label>
                  <span className="text-[0.84rem] text-ink-muted" title="Ihr monatliches Bruttogehalt laut Arbeitsvertrag">
                    <svg className="inline text-ink-muted" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={100}
                  value={gehalt}
                  onChange={(e) => setGehalt(Number(e.target.value))}
                  className="w-full accent-gold-dark"
                />
                <div className="text-[0.92rem] font-semibold text-ink mt-1">
                  {gehalt.toLocaleString('de-DE')} &euro;
                </div>
              </div>

              {/* Wöchentliche Arbeitszeit */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">Wöchentliche Arbeitszeit (Soll)</label>
                  <span className="text-[0.84rem] text-ink-muted" title="Vertraglich vereinbarte Wochenstunden">
                    <svg className="inline text-ink-muted" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={48}
                  step={1}
                  value={wochenstunden}
                  onChange={(e) => setWochenstunden(Number(e.target.value))}
                  className="w-full accent-gold-dark"
                />
                <div className="text-[0.92rem] font-semibold text-ink mt-1">
                  {wochenstunden} Std.
                </div>
              </div>

              {/* Gesamte Überstunden */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">Gesamte Überstunden</label>
                  <span className="text-[0.84rem] text-ink-muted" title="Angesammelte unbezahlte Überstunden">
                    <svg className="inline text-ink-muted" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={ueberstunden}
                  onChange={(e) => setUeberstunden(Number(e.target.value))}
                  className="w-full accent-gold-dark"
                />
                <div className="text-[0.92rem] font-semibold text-ink mt-1">
                  {ueberstunden} Std.
                </div>
              </div>

              {/* Zuschlag Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={zuschlagAktiv}
                    onClick={() => setZuschlagAktiv(!zuschlagAktiv)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${zuschlagAktiv ? 'bg-gold-dark' : 'bg-border'}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${zuschlagAktiv ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                  <span className="text-[0.84rem] font-semibold text-ink">
                    Überstundenzuschlag vereinbart?
                  </span>
                </label>
                {zuschlagAktiv && (
                  <div className="mt-4 pl-14">
                    <label className="text-[0.84rem] font-semibold text-ink mb-1.5 block">Zuschlag</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={zuschlag}
                      onChange={(e) => setZuschlag(Number(e.target.value))}
                      className="w-full accent-gold-dark"
                    />
                    <div className="text-[0.92rem] font-semibold text-ink mt-1">{zuschlag} %</div>
                  </div>
                )}
              </div>

              {/* Berechnen-Button */}
              <button
                onClick={berechnen}
                className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
              >
                BERECHNEN
              </button>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung Ihres Falls wenden Sie sich bitte an einen{' '}
                <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</Link>.
              </p>
            </div>

            {/* Rechte Karte — Ergebnis */}
            <div className="bg-cream border border-border-light rounded p-8">
              {!result ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold mx-auto mb-4">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <p className="text-[0.95rem] text-ink-muted">
                    Geben Sie Ihre Daten ein und klicken Sie <strong>Berechnen</strong>.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-[1.2rem] font-bold mb-6">Ihr Ergebnis</h3>

                  {/* Stundenlohn */}
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                      Ihr Bruttostundenlohn
                    </div>
                    <div className="font-serif text-[1.6rem] font-bold text-ink">
                      {euro(result.stundenlohn)}<span className="text-[0.88rem] text-ink-muted font-sans font-normal">/Std.</span>
                    </div>
                  </div>

                  {/* Überstundenvergütung */}
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                      Mögliche Vergütung
                    </div>
                    <div className="font-serif text-[2rem] font-bold text-gold-dark">
                      {euro(result.verguetung)}
                    </div>
                    {zuschlagAktiv && (
                      <div className="text-[0.78rem] text-ink-muted mt-1">
                        inkl. {zuschlag} % Zuschlag
                      </div>
                    )}
                  </div>

                  {/* Tageswert */}
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                      Tageswert
                    </div>
                    <div className="font-serif text-[1.3rem] font-bold text-ink">
                      {euro(result.tageswert)}<span className="text-[0.88rem] text-ink-muted font-sans font-normal">/Tag</span>
                    </div>
                  </div>

                  {/* Jahreshochrechnung */}
                  {ueberstunden > 0 && (
                    <div className="mb-6">
                      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                        Jahreshochrechnung
                      </div>
                      <div className="font-serif text-[1.3rem] font-bold text-ink">
                        {euro(result.jahresHochrechnung)}<span className="text-[0.88rem] text-ink-muted font-sans font-normal">/Jahr</span>
                      </div>
                      <div className="text-[0.75rem] text-ink-muted mt-1">
                        Hochrechnung bei gleichem Tempo
                      </div>
                    </div>
                  )}

                  {/* CTA in Ergebnis */}
                  <div className="mt-6 py-4 px-5 bg-white rounded-sm border-l-[3px] border-gold">
                    <p className="text-[0.88rem] font-semibold text-ink mb-3 m-0">
                      Stehen Ihnen diese Überstunden noch zu?
                    </p>
                    <Link
                      href="/kuendigung-pruefen"
                      className="inline-block py-2.5 px-5 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.85rem] font-semibold no-underline transition-all hover:bg-[#635428]"
                    >
                      Kostenlos prüfen &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Erklärungstext */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wie wird die Überstundenvergütung berechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Grundlage jeder Berechnung ist der Bruttostundenlohn. Er ergibt sich aus dem Bruttomonatsgehalt
              dividiert durch die monatlich geschuldeten Arbeitsstunden. Der gesetzliche Faktor für die
              durchschnittliche Monatsstunden beträgt 4,33 Wochen &times; vertraglich vereinbarte Wochenstunden.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Viele Arbeitnehmer haben Anspruch auf Überstundenzuschläge — entweder durch Tarifvertrag,
              Betriebsvereinbarung oder individuelle Regelung im Arbeitsvertrag. Typische Zuschläge liegen
              zwischen 10 % und 50 %. Ohne ausdrückliche Regelung besteht in der Regel kein gesetzlicher
              Anspruch auf einen Zuschlag — wohl aber auf die Grundvergütung.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Wichtig: Überstundenvergütungsansprüche unterliegen Ausschlussfristen. Viele Arbeitsverträge
              enthalten Verfallklauseln von 3–6 Monaten nach Fälligkeit. Ohne rechtzeitige Geltendmachung
              können diese Ansprüche verloren gehen — auch wenn die Überstunden unstrittig geleistet wurden.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Wurden Sie gekündigt? Berechnen Sie auch Ihre mögliche Abfindung mit unserem{' '}
              <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindungsrechner</Link>.
              Oder nutzen Sie unsere{' '}
              <Link href="/tools" className="text-gold no-underline hover:underline">weiteren kostenlosen Tools</Link>{' '}
              für eine umfassende Einschätzung Ihrer arbeitsrechtlichen Situation.
            </p>
          </div>
        </div>
      </section>

      {/* Überstunden bei Kündigung */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wann habe ich Anspruch auf Überstundenvergütung?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Werden Sie gekündigt, stellt sich die Frage: Was passiert mit angesammelten Überstunden?
              Grundsätzlich hat der Arbeitgeber das Recht, Ihnen die Überstunden während der{' '}
              <Link href="/kuendigungsfrist-rechner" className="text-gold no-underline hover:underline">Kündigungsfrist</Link>{' '}
              als Freizeitausgleich zu gewähren. Ist das aufgrund der Restarbeitszeit nicht mehr möglich,
              entsteht ein <strong>Auszahlungsanspruch</strong>.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Bei einem <Link href="/aufhebungsvertrag" className="text-gold no-underline hover:underline">Aufhebungsvertrag</Link>{' '}
              sollten offene Überstunden unbedingt in die Verhandlung einbezogen werden. In der Praxis werden
              Überstundenansprüche häufig in die Abfindungssumme eingerechnet — achten Sie darauf, dass dies
              im Aufhebungsvertrag klar geregelt ist, damit keine Ansprüche untergehen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Wichtig: Ausschlussfristen laufen auch nach Beendigung des Arbeitsverhältnisses weiter.
              Viele Arbeitsverträge enthalten Verfallklauseln von 3&ndash;6 Monaten. Wer seine Überstunden
              nicht rechtzeitig schriftlich geltend macht, riskiert den Verlust des gesamten Anspruchs.
            </p>
          </div>
        </div>
      </section>

      {/* Pauschalabgeltungsklausel */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtlicher Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Was ist eine Pauschalabgeltungsklausel &mdash; und wann ist sie unwirksam?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Klausel &bdquo;Überstunden sind mit dem Gehalt abgegolten&ldquo; findet sich in zahlreichen
              Arbeitsverträgen. Das Bundesarbeitsgericht hat jedoch wiederholt entschieden: Solche
              Pauschalabgeltungsklauseln sind <strong>nur wirksam, wenn der Umfang der abgegoltenen Überstunden
              klar bestimmt</strong> ist — zum Beispiel &bdquo;bis zu 10 Überstunden pro Monat&ldquo;.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Bei vorformulierten Arbeitsverträgen (AGB) unterliegen solche Klauseln der Inhaltskontrolle
              nach &sect;&sect;305&thinsp;ff. BGB. Eine pauschale, unbegrenzte Abgeltung benachteiligt den Arbeitnehmer
              unangemessen und ist in der Regel unwirksam. In diesem Fall besteht ein Vergütungsanspruch
              für <strong>jede einzelne Überstunde</strong>.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Unabhängig von der vertraglichen Regelung gilt: Unterschreitet die effektive Vergütung pro Stunde
              den gesetzlichen Mindestlohn, ist die Abgeltungsklausel insoweit unwirksam. Lassen Sie Ihre
              Vertragsklausel von einem{' '}
              <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">Fachanwalt prüfen</Link> —
              oft ist deutlich mehr möglich, als der Arbeitsvertrag vermuten lässt.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #2 — Dark Banner */}
      <section className="py-[70px] px-8 bg-[#2A1F0E]">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-white mb-3">
            Überstunden nicht ausgezahlt?
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihre Ansprüche — kostenlos und innerhalb von 24 Stunden.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.35)]"
          >
            Jetzt kostenlos anfragen &rarr;
          </Link>
          <div className="flex justify-center gap-5 mt-5 text-[0.78rem] text-white/50">
            <span>&#10003; Kein Kostenrisiko</span>
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
                <a href="https://www.gesetze-im-internet.de/bgb/__612.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;612 BGB &mdash; Vergütungspflicht für geleistete Dienste &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/bgb/__305.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  &sect;&sect;305&thinsp;ff. BGB &mdash; AGB-Kontrolle (Abgeltungsklauseln) &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/arbzg/" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  Arbeitszeitgesetz (ArbZG) &mdash; Höchstarbeitszeiten &rarr;
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
            Häufige Fragen zu Überstunden
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA #3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/20 rounded-sm p-8 bg-white text-center max-w-[640px] mx-auto">
            <h2 className="font-serif text-[1.3rem] font-bold mb-3">
              Ihr Ergebnis liegt vor — was jetzt?
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">
              Wenn Ihnen Überstunden zustehen, die nicht ausgezahlt wurden, sollten Sie handeln.
              Ausschlussfristen laufen schnell ab. Wir prüfen Ihren Fall kostenlos.
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
