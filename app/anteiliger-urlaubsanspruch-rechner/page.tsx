'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';

const faqs = [
  {
    q: 'Wieviel Urlaub steht mir nach dem Bundesurlaubsgesetz zu?',
    a: 'Der gesetzliche Mindesturlaub beträgt bei einer 5-Tage-Woche 20 Arbeitstage pro Jahr (§ 3 BUrlG). Bei einer 6-Tage-Woche sind es 24 Werktage. Arbeits- oder Tarifverträge können mehr Urlaub vorsehen — dieser vertragliche Anspruch gilt zusätzlich zum gesetzlichen Mindesturlaub.',
  },
  {
    q: 'Was ist die 6-Monats-Wartezeit nach § 4 BUrlG?',
    a: 'Nach § 4 BUrlG entsteht der volle Urlaubsanspruch erstmals nach 6 Monaten ununterbrochener Beschäftigung. Scheiden Sie vor Ablauf dieser 6 Monate aus, haben Sie nur Anspruch auf 1/12 des Jahresurlaubs pro vollen Beschäftigungsmonat (§ 5 Abs. 1 lit. b BUrlG).',
  },
  {
    q: 'Warum ist der 30. Juni bei § 5 BUrlG so wichtig?',
    a: 'Scheiden Sie nach erfüllter Wartezeit in der ersten Hälfte des Kalenderjahres aus (bis 30.06.), haben Sie nur Anspruch auf 1/12 des Jahresurlaubs pro Beschäftigungsmonat im laufenden Kalenderjahr (§ 5 Abs. 1 lit. c BUrlG). Scheiden Sie ab dem 01.07. aus, haben Sie den vollen Jahresurlaub — auch wenn Sie nur einen Tag im zweiten Halbjahr gearbeitet haben.',
  },
  {
    q: 'Wie werden Bruchteile bei anteiligem Urlaub behandelt?',
    a: 'Nach § 5 Abs. 2 BUrlG werden Bruchteile eines Urlaubstages von mindestens einem halben Tag auf einen vollen Tag aufgerundet. Beispiel: 5,4 Tage → 5 Tage; 5,5 Tage → 6 Tage; 5,7 Tage → 6 Tage.',
  },
  {
    q: 'Gilt § 5 BUrlG auch für vertraglichen Mehrurlaub?',
    a: 'Grundsätzlich nur für den gesetzlichen Mindesturlaub (20 bzw. 24 Tage). Für vertraglichen Mehrurlaub gelten die Regelungen im Arbeits- oder Tarifvertrag — häufig wird dort aber auf die BUrlG-Regelungen verwiesen. Im Zweifel ist der gesamte Jahresurlaub nach § 5 BUrlG zu zwölfteln, wenn keine abweichende Regelung besteht.',
  },
];

type Fall = 'wartezeit-nicht-erfuellt' | 'zwoelftel-lfd-jahr' | 'voller-anspruch';

interface AnspruchResult {
  tageBrutto: number;
  tageAufgerundet: number;
  fall: Fall;
  grundlage: string;
  monateGezaehlt: number;
  formel: string;
  wartezeitErfuellt: boolean;
}

function vollMonate(eintritt: Date, beendigung: Date): number {
  let monate = (beendigung.getFullYear() - eintritt.getFullYear()) * 12;
  monate += beendigung.getMonth() - eintritt.getMonth();
  if (beendigung.getDate() < eintritt.getDate()) monate--;
  return Math.max(0, monate);
}

function aufrundenBUrlG(tage: number): number {
  const nachkomma = tage - Math.floor(tage);
  return nachkomma >= 0.5 ? Math.ceil(tage) : Math.floor(tage);
}

function berechneAnspruch(eintritt: Date, beendigung: Date, jahresUrlaub: number): AnspruchResult {
  const gesamtMonate = vollMonate(eintritt, beendigung);
  const wartezeitErfuellt = gesamtMonate >= 6;

  if (!wartezeitErfuellt) {
    const anspruch = (jahresUrlaub / 12) * gesamtMonate;
    return {
      tageBrutto: anspruch,
      tageAufgerundet: aufrundenBUrlG(anspruch),
      fall: 'wartezeit-nicht-erfuellt',
      grundlage: '§ 5 Abs. 1 lit. b BUrlG (Ausscheiden vor erfüllter 6-Monats-Wartezeit)',
      monateGezaehlt: gesamtMonate,
      formel: `${jahresUrlaub} × ${gesamtMonate} ÷ 12 = ${anspruch.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Tage`,
      wartezeitErfuellt: false,
    };
  }

  const monatBeendigung = beendigung.getMonth() + 1;

  if (monatBeendigung >= 7) {
    return {
      tageBrutto: jahresUrlaub,
      tageAufgerundet: jahresUrlaub,
      fall: 'voller-anspruch',
      grundlage: '§ 4 BUrlG (Ausscheiden ab 01.07. nach erfüllter Wartezeit)',
      monateGezaehlt: 12,
      formel: `Voller Jahresurlaub = ${jahresUrlaub} Tage`,
      wartezeitErfuellt: true,
    };
  }

  const jahrEintritt = eintritt.getFullYear();
  const jahrBeendigung = beendigung.getFullYear();
  const monateImJahr = jahrEintritt === jahrBeendigung
    ? vollMonate(eintritt, beendigung)
    : monatBeendigung;
  const anspruch = (jahresUrlaub / 12) * monateImJahr;

  return {
    tageBrutto: anspruch,
    tageAufgerundet: aufrundenBUrlG(anspruch),
    fall: 'zwoelftel-lfd-jahr',
    grundlage: '§ 5 Abs. 1 lit. c BUrlG (Ausscheiden im 1. Halbjahr nach erfüllter Wartezeit)',
    monateGezaehlt: monateImJahr,
    formel: `${jahresUrlaub} × ${monateImJahr} ÷ 12 = ${anspruch.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Tage`,
    wartezeitErfuellt: true,
  };
}

const inputClass =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';

export default function AnteiligerUrlaubsanspruchPage() {
  const [eintrittDatum, setEintrittDatum] = useState('');
  const [beendigungsDatum, setBeendigungsDatum] = useState('');
  const [jahresUrlaub, setJahresUrlaub] = useState('20');
  const [result, setResult] = useState<AnspruchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function berechnen() {
    setError(null);
    if (!eintrittDatum || !beendigungsDatum) {
      setError('Bitte Eintritts- und Beendigungsdatum angeben.');
      return;
    }
    const eintritt = new Date(eintrittDatum);
    const beendigung = new Date(beendigungsDatum);
    if (beendigung <= eintritt) {
      setError('Das Beendigungsdatum muss nach dem Eintrittsdatum liegen.');
      return;
    }
    const ju = parseFloat(jahresUrlaub.replace(',', '.'));
    if (!ju || ju < 1 || ju > 50) {
      setError('Jahresurlaub muss zwischen 1 und 50 Tagen liegen.');
      return;
    }
    setResult(berechneAnspruch(eintritt, beendigung, ju));
  }

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/anteiliger-urlaubsanspruch-rechner/`}
        pageTitle="Anteiliger Urlaubsanspruch Rechner — § 5 BUrlG"
        pageDescription="Kostenloser Rechner für den anteiligen Urlaubsanspruch bei Ausscheiden. Berechnung nach § 5 BUrlG mit Halbjahres-Regel, Wartezeit und Aufrundung."
        pageType="WebApplication"
        appName="Anteiliger Urlaubsanspruch Rechner — § 5 BUrlG"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Tools & Rechner', url: `${SEO_CONFIG.baseUrl}/tools/` },
          { name: 'Anteiliger Urlaubsanspruch', url: `${SEO_CONFIG.baseUrl}/anteiliger-urlaubsanspruch-rechner/` },
        ]}
        speakableSelectors={['#ergebnis-box']}
        isBasedOn={[
          { name: '§ 4 BUrlG — Wartezeit', url: 'https://www.gesetze-im-internet.de/burlg/__4.html' },
          { name: '§ 5 BUrlG — Teilurlaub', url: 'https://www.gesetze-im-internet.de/burlg/__5.html' },
        ]}
        includeOrganization={false}
        includeRating={false}
      />

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

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="text-gold no-underline hover:underline">Tools &amp; Rechner</Link>
            <span className="mx-2">/</span>
            <span>Anteiliger Urlaubsanspruch</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[720px]">
            Anteiliger Urlaubsanspruch berechnen &mdash; wieviel Urlaub steht mir zu?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            Beim Ausscheiden im laufenden Kalenderjahr entscheidet <strong>§ 5 BUrlG</strong>, wieviel Urlaub Ihnen anteilig
            zusteht. Der Rechner berücksichtigt die 6-Monats-Wartezeit, die Halbjahres-Regel und die Aufrundung nach BUrlG.
          </p>
        </div>
      </div>

      {/* Direktantwort */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              Der <strong>anteilige Urlaubsanspruch</strong> im Ausscheidejahr richtet sich nach <strong>§ 5 BUrlG</strong>:
              Vor Ablauf der 6-Monats-Wartezeit gilt <strong>Zwölftelung nach vollen Beschäftigungsmonaten</strong>. Nach
              erfüllter Wartezeit entscheidet der Ausscheidungsmonat &mdash; ab dem <strong>01.07.</strong> steht der volle
              Jahresurlaub zu, bei Ausscheiden bis zum 30.06. gilt Zwölftelung. Bruchteile ab 0,5 Tagen werden aufgerundet
              (§ 5 Abs. 2 BUrlG).
            </p>
          </div>
        </div>
      </section>

      {/* Rechner */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-8 items-start max-lg:grid-cols-1">
            {/* Eingaben */}
            <div className="bg-white border border-border-light rounded overflow-hidden">
              <div className="h-2 bg-gold-dark" />
              <div className="p-8">
                <h2 className="font-serif text-[1.3rem] font-bold mb-6">Ihre Angaben</h2>

                <div className="mb-5">
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Eintrittsdatum <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="date"
                    value={eintrittDatum}
                    onChange={(e) => setEintrittDatum(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Beendigungsdatum <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="date"
                    value={beendigungsDatum}
                    onChange={(e) => setBeendigungsDatum(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Jahresurlaub (Tage) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    step="0.5"
                    value={jahresUrlaub}
                    onChange={(e) => setJahresUrlaub(e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1">
                    Gesetzlicher Mindestanspruch: 20 Tage bei 5-Tage-Woche (§ 3 BUrlG)
                  </p>
                </div>

                <button
                  onClick={berechnen}
                  className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  Anteiligen Anspruch berechnen
                </button>

                {error && (
                  <div className="mt-4 py-3 px-4 bg-red-50 rounded-sm border border-red-300">
                    <p className="text-[0.85rem] text-red-800 m-0">{error}</p>
                  </div>
                )}

                <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                  <strong>Hinweis:</strong> Bereits genommener Urlaub muss vom Ergebnis abgezogen werden. Für eine
                  verbindliche Prüfung wenden Sie sich an einen{' '}
                  <a href="/#kontakt" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</a>.
                </p>
              </div>
            </div>

            {/* Ergebnis + Berechnungsweg */}
            <div id="ergebnis-box" className="bg-cream border border-border-light rounded p-8">
              {!result ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold mx-auto mb-4">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
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
                      Ihr anteiliger Urlaubsanspruch
                    </div>
                    <div className="font-serif text-[2.4rem] font-bold text-gold-dark leading-none">
                      {result.tageAufgerundet}{' '}
                      <span className="text-[1.4rem]">Tage</span>
                    </div>
                    {result.tageAufgerundet !== result.tageBrutto && (
                      <div className="text-[0.84rem] text-ink-muted mt-2">
                        Berechnet: {result.tageBrutto.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Tage &rarr; aufgerundet nach § 5 Abs. 2 BUrlG
                      </div>
                    )}
                  </div>

                  {/* Berechnungsweg */}
                  <div className="mb-6">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
                      So wurde gerechnet
                    </div>
                    <div className="bg-white border border-border rounded-sm p-4 space-y-3 text-[0.88rem]">
                      <div className="flex justify-between gap-4 pb-2 border-b border-border">
                        <span className="text-ink-muted">Eintrittsdatum</span>
                        <span className="font-semibold text-ink tabular-nums">{formatDate(eintrittDatum)}</span>
                      </div>
                      <div className="flex justify-between gap-4 pb-2 border-b border-border">
                        <span className="text-ink-muted">Beendigungsdatum</span>
                        <span className="font-semibold text-ink tabular-nums">{formatDate(beendigungsDatum)}</span>
                      </div>
                      <div className="flex justify-between gap-4 pb-2 border-b border-border">
                        <span className="text-ink-muted">6-Monats-Wartezeit erfüllt?</span>
                        <span className="font-semibold text-ink">
                          {result.wartezeitErfuellt ? 'Ja' : 'Nein'}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 pb-2 border-b border-border">
                        <span className="text-ink-muted">Anzuwendender Fall</span>
                        <span className="font-semibold text-ink text-right">
                          {result.fall === 'voller-anspruch' && 'Voller Jahresurlaub'}
                          {result.fall === 'wartezeit-nicht-erfuellt' && 'Zwölftelung (§ 5 Abs. 1 b)'}
                          {result.fall === 'zwoelftel-lfd-jahr' && 'Zwölftelung (§ 5 Abs. 1 c)'}
                        </span>
                      </div>
                      {result.fall !== 'voller-anspruch' && (
                        <div className="flex justify-between gap-4 pb-2 border-b border-border">
                          <span className="text-ink-muted">Gezählte Beschäftigungsmonate</span>
                          <span className="font-semibold text-ink tabular-nums">{result.monateGezaehlt}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4 pb-2 border-b border-border">
                        <span className="text-ink-muted">Formel</span>
                        <span className="font-semibold text-ink text-right font-mono text-[0.82rem]">{result.formel}</span>
                      </div>
                      {result.tageAufgerundet !== result.tageBrutto && (
                        <div className="flex justify-between gap-4 pb-2 border-b border-border">
                          <span className="text-ink-muted">Aufrundung § 5 Abs. 2 BUrlG</span>
                          <span className="font-semibold text-ink tabular-nums">
                            {result.tageBrutto.toLocaleString('de-DE', { maximumFractionDigits: 2 })} &rarr; {result.tageAufgerundet} Tage
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="text-ink-muted">Rechtsgrundlage</span>
                        <span className="font-semibold text-gold-dark text-right text-[0.82rem]">{result.grundlage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weitere Schritte */}
                  <div className="py-4 px-5 bg-white rounded-sm border-l-[3px] border-gold mb-5">
                    <div className="text-[0.84rem] font-semibold text-ink mb-2">Wieviel Urlaubsabgeltung bekomme ich dafür?</div>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                      Ziehen Sie bereits genommene Urlaubstage vom Ergebnis ab &mdash; der Rest wird in Euro abgegolten.{' '}
                      <Link href="/urlaubsabgeltung-rechner" className="text-gold-dark font-semibold no-underline hover:underline">
                        Urlaubsabgeltung berechnen &rarr;
                      </Link>
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="py-3 px-4 bg-amber-50 rounded-sm border border-amber-300 mb-4">
                    <p className="text-[0.82rem] text-amber-900 leading-relaxed m-0">
                      <strong>Hinweis:</strong> Der Rechner behandelt den gesetzlichen Mindesturlaub. Bei tariflichem oder
                      vertraglichem Mehrurlaub können abweichende Regelungen gelten. Für verbindliche Prüfung: {' '}
                      <a href="/#kontakt" className="text-amber-900 underline hover:text-amber-700">Fachanwalt kontaktieren</a>.
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="/#kontakt"
                    className="block w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#635428]"
                  >
                    Kostenlose Ersteinschätzung anfordern &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Erklärung */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtlicher Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie berechnet § 5 BUrlG den anteiligen Urlaubsanspruch?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              § 5 BUrlG unterscheidet drei Fälle, wenn ein Arbeitsverhältnis nicht das ganze Kalenderjahr besteht:
            </p>

            <div className="space-y-5 mb-6">
              <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Fall 1 &mdash; § 5 Abs. 1 lit. a &amp; b BUrlG
                </div>
                <div className="font-semibold text-ink mb-1.5">Wartezeit noch nicht erfüllt</div>
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  Beschäftigungsdauer unter 6 Monaten &mdash; Zwölftelung nach vollen Beschäftigungsmonaten insgesamt.
                  Beispiel: 4 volle Monate beschäftigt, 20 Tage Jahresurlaub &rarr; 4/12 &times; 20 = 6,67 Tage &rarr;
                  aufgerundet 7 Tage.
                </p>
              </div>

              <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Fall 2 &mdash; § 5 Abs. 1 lit. c BUrlG
                </div>
                <div className="font-semibold text-ink mb-1.5">Ausscheiden im 1. Halbjahr nach Wartezeit</div>
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  Wartezeit erfüllt, Beendigung bis 30.06. &mdash; Zwölftelung nach vollen Beschäftigungsmonaten im
                  Ausscheidejahr. Beispiel: Ausscheiden am 15.03. bei 20 Tagen Jahresurlaub &rarr; 3/12 &times; 20 = 5 Tage.
                </p>
              </div>

              <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Fall 3 &mdash; § 4 BUrlG
                </div>
                <div className="font-semibold text-ink mb-1.5">Ausscheiden ab 01.07. nach Wartezeit</div>
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  Wartezeit erfüllt und Beendigung ab 01.07. &mdash; voller Jahresurlaub. Selbst wer am 02.07. ausscheidet,
                  hat Anspruch auf 20 volle Urlaubstage (bei 20 Tagen Jahresurlaub).
                </p>
              </div>
            </div>

            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>§ 5 Abs. 2 BUrlG</strong>: Bruchteile eines Urlaubstages, die mindestens einen halben Tag ergeben, sind
              auf volle Urlaubstage aufzurunden. 5,4 Tage bleiben 5 Tage &mdash; 5,5 Tage werden 6 Tage.
            </p>
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
                <a href="https://www.gesetze-im-internet.de/burlg/__4.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 4 BUrlG &mdash; Wartezeit &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/burlg/__5.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 5 BUrlG &mdash; Teilurlaub &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/burlg/__3.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  § 3 BUrlG &mdash; Dauer des Urlaubs &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum anteiligen Urlaubsanspruch
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Interlinker */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/anteiliger-urlaubsanspruch-rechner" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Resturlaub nicht ausgezahlt oder verweigert?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihren gesamten Anspruch &mdash; Urlaubsabgeltung, Zeugnis, Abfindung und mehr. Kostenlos.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
