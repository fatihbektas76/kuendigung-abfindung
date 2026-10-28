'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { calculateNetSeverance, type NetSeveranceResult } from '@/lib/tax-calculator';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/abfindung-netto-rechner/`;

const faqs = [
  {
    q: 'Was bleibt netto von meiner Abfindung übrig?',
    a: 'Abfindungen sind in Deutschland einkommensteuerpflichtig, aber sozialversicherungsfrei. Der Netto-Betrag hängt vom Jahresgehalt, der Höhe der Abfindung, dem Veranlagungsstatus (Ehepaar oder alleinstehend) und ggf. der Kirchensteuer ab. Faustregel: Bei einer mittleren Einkommenslage bleiben nach Fünftelregelung etwa 55 bis 70 % der Brutto-Abfindung netto übrig.',
  },
  {
    q: 'Wie funktioniert die Fünftelregelung nach § 34 EStG?',
    a: 'Die Fünftelregelung mindert die Steuerprogression auf einmalige Zahlungen wie Abfindungen. Rechnerisch wird 1/5 der Abfindung zum Jahreseinkommen addiert, die Mehrsteuer gegenüber dem Jahreseinkommen ohne Abfindung bestimmt und dann mit 5 multipliziert. Dadurch wird die Progression gedämpft. Formel: Steuer_mit_FR = 5 × (ESt(zvE + Abfindung/5) − ESt(zvE)).',
  },
  {
    q: 'Wird die Fünftelregelung automatisch angewendet?',
    a: 'Nein, seit dem Wachstumschancengesetz (2025) nicht mehr. Bis einschließlich 2024 wendete der Arbeitgeber die Fünftelregelung direkt in der Lohnabrechnung an. Ab 2025 müssen Arbeitnehmer die Fünftelregelung selbst in ihrer Einkommensteuererklärung beantragen (ESt-Formular, Anlage N). Die Abfindung wird dann im Steuerbescheid günstiger abgerechnet.',
  },
  {
    q: 'Welche Voraussetzungen muss die Fünftelregelung erfüllen?',
    a: 'Zentral ist das Erfordernis der sogenannten "Zusammenballung von Einkünften" (BFH-Rechtsprechung): Die Abfindung muss zusammen mit den regulären Einkünften zu höheren Einkünften im Jahr führen als ohne Beendigung. Außerdem muss die Zahlung in einem einzigen Veranlagungszeitraum erfolgen (Zuflussprinzip, § 11 EStG). Teilzahlungen über mehrere Jahre heben die Fünftelregelung in der Regel auf.',
  },
  {
    q: 'Fällt auf Abfindungen auch der Solidaritätszuschlag an?',
    a: 'Ja, aber erst oberhalb einer Freigrenze (§ 3 SolzG). Für Alleinstehende greift der Soli ab einer Jahreseinkommensteuer von ca. 19.950 €, bei Zusammenveranlagung ab ca. 39.900 €. Dazwischen gibt es eine Milderungszone, danach volle 5,5 % auf die Einkommensteuer. Für kleinere Abfindungen bei mittlerem Einkommen fällt häufig kein Soli an.',
  },
  {
    q: 'Wie wirkt sich die Kirchensteuer aus?',
    a: 'Kirchensteuer wird als Prozentsatz auf die Einkommensteuer berechnet: 8 % in Bayern und Baden-Württemberg, 9 % in allen anderen Bundesländern. Wer aus der Kirche ausgetreten ist, zahlt keine Kirchensteuer. Beim Austritt vor Zufluss der Abfindung wird keine Kirchensteuer auf die Abfindung fällig — der Austritt muss aber zeitlich vor dem Zufluss erfolgt sein.',
  },
  {
    q: 'Ist dieser Rechner rechtlich verbindlich?',
    a: 'Nein. Der Rechner liefert eine erste Orientierung auf Basis des Standard-Steuertarifs 2025 (§ 32a EStG). Für die verbindliche Steuerberechnung ist das Finanzamt zuständig; die tatsächliche Steuerlast hängt von zusätzlichen Faktoren ab: Werbungskosten, Sonderausgaben, außergewöhnliche Belastungen, Progressionsvorbehalt (ALG I, Elterngeld, Krankengeld), weitere Einkünfte (Kapital, Vermietung) und das genaue Zuflussjahr. Bei komplexeren Fällen empfiehlt sich ein Steuerberater.',
  },
];

const BUNDESLAND_OPTIONS = [
  { value: '0.09', label: '9 % (alle außer BY und BW)' },
  { value: '0.08', label: '8 % (Bayern, Baden-Württemberg)' },
  { value: '0', label: 'Keine Kirchensteuer' },
];

function formatEur(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AbfindungNettoRechnerPage() {
  const [regular, setRegular] = useState('55000');
  const [severance, setSeverance] = useState('30000');
  const [splitting, setSplitting] = useState(false);
  const [kistRate, setKistRate] = useState<'0' | '0.08' | '0.09'>('0.09');
  const [result, setResult] = useState<NetSeveranceResult | null>(null);

  function calculate() {
    const reg = parseFloat(regular.replace(/\./g, '').replace(',', '.'));
    const sev = parseFloat(severance.replace(/\./g, '').replace(',', '.'));
    if (isNaN(reg) || reg < 0 || isNaN(sev) || sev <= 0) return;
    setResult(
      calculateNetSeverance({
        regularAnnualIncome: reg,
        severanceGross: sev,
        splitting,
        churchTaxRate: kistRate === '0' ? 0 : kistRate === '0.08' ? 0.08 : 0.09,
      }),
    );
  }

  const netRatio = useMemo(() => {
    if (!result) return null;
    const sev = parseFloat(severance.replace(/\./g, '').replace(',', '.'));
    return sev > 0 ? Math.round((result.netSeverance / sev) * 100) : null;
  }, [result, severance]);

  return (
    <main>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'Abfindung Netto Rechner mit Fünftelregelung',
                url: PAGE_URL,
                applicationCategory: 'LegalTool',
                operatingSystem: 'Any',
                inLanguage: 'de-DE',
                description:
                  'Kostenloser Netto-Rechner für Abfindungen in Deutschland. Berechnet die Steuerlast mit Fünftelregelung (§ 34 EStG), Soli und Kirchensteuer auf Basis des Einkommensteuertarifs 2025.',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
                isBasedOn: [
                  { '@type': 'CreativeWork', name: '§ 32a EStG — Einkommensteuertarif', url: 'https://www.gesetze-im-internet.de/estg/__32a.html' },
                  { '@type': 'CreativeWork', name: '§ 34 EStG — Fünftelregelung', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
                  { '@type': 'CreativeWork', name: 'SolzG — Solidaritätszuschlag', url: 'https://www.gesetze-im-internet.de/solzg_1995/__3.html' },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
              {
                '@type': 'HowTo',
                name: 'Netto-Abfindung berechnen in 3 Schritten',
                step: [
                  { '@type': 'HowToStep', position: 1, name: 'Jahresbrutto ohne Abfindung eingeben', text: 'Geben Sie Ihr voraussichtliches Jahreseinkommen im Jahr des Abfindungszuflusses ein — inkl. anteiliger Monate wenn Sie unterjährig ausscheiden.' },
                  { '@type': 'HowToStep', position: 2, name: 'Abfindungsbetrag (brutto) eingeben', text: 'Die vereinbarte Brutto-Abfindung aus Aufhebungsvertrag oder Vergleich.' },
                  { '@type': 'HowToStep', position: 3, name: 'Status und Kirchensteuer wählen', text: 'Alleinstehend oder Zusammenveranlagung (Splitting); Kirchensteuer 8 % (BY/BW), 9 % (Rest) oder keine.' },
                ],
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Start', item: `${SEO_CONFIG.baseUrl}/` },
                  { '@type': 'ListItem', position: 2, name: 'Abfindung Netto Rechner', item: PAGE_URL },
                ],
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/abfindung/" className="text-gold no-underline hover:underline">Abfindung</Link>
            <span className="mx-2">/</span>
            <span>Netto-Rechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenloser Rechner &mdash; Steuertarif 2025
          </div>
          <h1 className="font-serif text-[clamp(1.9rem,4.2vw,2.6rem)] font-bold leading-[1.2] max-w-[760px]">
            Abfindung Netto Rechner &mdash; was bleibt nach Steuern übrig?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[640px] leading-relaxed mt-3">
            Mit Fünftelregelung (§&nbsp;34 EStG), Solidaritätszuschlag und
            Kirchensteuer. Standardfall, Orientierungswert &mdash; keine
            verbindliche Steuerermittlung.
          </p>
        </div>
      </div>

      {/* GEO Direktantwort */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Von einer Brutto-Abfindung in Deutschland bleiben
              typischerweise 55 bis 70 % netto übrig</strong>, abhängig von
              Jahreseinkommen, Höhe der Abfindung, Veranlagungsstatus und
              Kirchensteuer. Abfindungen sind einkommensteuerpflichtig
              (§&nbsp;24 Nr.&nbsp;1 EStG), aber sozialversicherungsfrei. Die{' '}
              <strong>Fünftelregelung (§&nbsp;34 EStG)</strong> mildert die
              Steuerprogression auf die einmalige Zahlung und spart je nach
              Fallkonstellation 500 bis mehrere tausend Euro. Seit 2025 muss
              die Fünftelregelung in der Einkommensteuererklärung beantragt
              werden &mdash; der Arbeitgeber führt die Lohnsteuer regulär ab.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Jahresbrutto ohne Abfindung (&euro;) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={regular}
                    onChange={(e) => setRegular(e.target.value)}
                    placeholder="z. B. 55.000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1 leading-relaxed">
                    Jahresgehalt im Zuflussjahr der Abfindung
                  </p>
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Abfindung brutto (&euro;) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={severance}
                    onChange={(e) => setSeverance(e.target.value)}
                    placeholder="z. B. 30.000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mt-5">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Veranlagungsstatus
                  </label>
                  <select
                    value={splitting ? 'splitting' : 'single'}
                    onChange={(e) => setSplitting(e.target.value === 'splitting')}
                    className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    <option value="single">Alleinstehend / Einzelveranlagung</option>
                    <option value="splitting">Verheiratet / Zusammenveranlagung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Kirchensteuer
                  </label>
                  <select
                    value={kistRate}
                    onChange={(e) => setKistRate(e.target.value as '0' | '0.08' | '0.09')}
                    className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    {BUNDESLAND_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculate}
                data-track="rechner_abfindung_netto_calculate"
                className="w-full mt-6 py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
              >
                Netto-Abfindung berechnen
              </button>

              <p className="text-[0.72rem] text-ink-muted mt-3 leading-relaxed">
                Dieser Rechner liefert eine Orientierung auf Basis des Standard-Steuertarifs
                2025. Für die verbindliche Berechnung ist das Finanzamt zuständig &mdash;
                siehe Disclaimer unten.
              </p>
            </div>

            {result && (
              <div className="mt-8 space-y-5">
                {/* Hauptergebnis */}
                <div className="rounded-sm border-2 border-gold p-7 bg-gold-bg text-center">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    Netto-Abfindung
                  </div>
                  <div className="font-serif text-[2.8rem] font-extrabold text-ink leading-none">
                    {formatEur(result.netSeverance)}
                  </div>
                  {netRatio !== null && (
                    <div className="text-[0.9rem] text-gold-dark mt-2">
                      {netRatio}% der Brutto-Abfindung · effektiver Steuersatz {result.effectiveTaxRate}%
                    </div>
                  )}
                </div>

                {/* Breakdown */}
                <div className="rounded-sm border border-border p-6 bg-white">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
                    Steuerlast auf die Abfindung
                  </div>
                  <dl className="grid grid-cols-2 gap-y-2.5 text-[0.95rem]">
                    <dt className="text-ink-light">Einkommensteuer (mit Fünftelregelung)</dt>
                    <dd className="text-ink text-right font-medium">{formatEur(result.severanceTax)}</dd>
                    <dt className="text-ink-light">Solidaritätszuschlag</dt>
                    <dd className="text-ink text-right font-medium">{formatEur(result.severanceSoli)}</dd>
                    <dt className="text-ink-light">Kirchensteuer</dt>
                    <dd className="text-ink text-right font-medium">{formatEur(result.severanceChurchTax)}</dd>
                    <dt className="text-ink pt-2 border-t border-border font-semibold">Steuerlast gesamt</dt>
                    <dd className="text-ink text-right font-semibold pt-2 border-t border-border">
                      {formatEur(result.severanceTax + result.severanceSoli + result.severanceChurchTax)}
                    </dd>
                  </dl>
                </div>

                {/* Fünftelregelung-Ersparnis */}
                {result.fifthRuleSaving > 0 && (
                  <div className="rounded-sm border-l-[3px] border-gold bg-cream p-6">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                      Fünftelregelung
                    </div>
                    <p className="text-[1.05rem] text-ink leading-relaxed mb-2">
                      Sie sparen durch die Fünftelregelung{' '}
                      <strong className="text-gold-dark">
                        {formatEur(result.fifthRuleSaving)}
                      </strong>{' '}
                      Einkommensteuer.
                    </p>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-0">
                      Ohne Fünftelregelung läge die ESt-Last auf die Abfindung bei{' '}
                      {formatEur(result.taxWithoutFifthRule - result.regularTax)} statt{' '}
                      {formatEur(result.severanceTax)}. Seit 2025 muss die Fünftelregelung
                      in der Einkommensteuererklärung beantragt werden &mdash; der
                      Arbeitgeber führt zunächst die reguläre Lohnsteuer ab.
                    </p>
                  </div>
                )}

                <div className="rounded-sm border border-border py-4 px-5 bg-cream">
                  <p className="text-[0.82rem] text-ink-muted leading-relaxed mb-0">
                    <strong>Hinweis:</strong> Diese Berechnung basiert auf dem
                    Einkommensteuertarif {result.tarifJahr} (§&nbsp;32a EStG). Berücksichtigt
                    sind: ESt, Soli-Freigrenze (§&nbsp;3 SolzG), Fünftelregelung (§&nbsp;34
                    EStG) und ggf. Kirchensteuer. Nicht berücksichtigt: Werbungskosten,
                    Sonderausgaben, Progressionsvorbehalt (ALG&nbsp;I, Elterngeld),
                    weitere Einkünfte.
                  </p>
                </div>

                <div className="rounded-sm py-5 px-6 bg-cream border-l-[3px] border-gold">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Möchten Sie prüfen lassen, ob eine höhere Abfindung
                    verhandelbar ist?</strong>
                  </p>
                  <a
                    href="/#kontakt"
                    className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline hover:bg-[#635428] transition-colors"
                  >
                    Kostenlose Ersteinschätzung anfordern &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* So funktioniert der Rechner */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechenweg
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              So berechnet der Rechner Ihre Netto-Abfindung
            </h2>
            <ol className="list-decimal pl-6 text-[0.95rem] text-ink-light leading-relaxed space-y-3">
              <li>
                <strong>Reguläre Einkommensteuer</strong> auf das Jahreseinkommen ohne
                Abfindung &mdash; nach §&nbsp;32a EStG, 5-Zonen-Tarif (Grundfreibetrag,
                zwei Progressionszonen, Spitzensteuersatz 42&nbsp;%, Reichensteuer 45&nbsp;%).
              </li>
              <li>
                <strong>Fünftelregelung</strong> (§&nbsp;34 EStG): Die Steuerlast auf die
                Abfindung wird nicht direkt auf das volle zvE aufgeschlagen, sondern über
                die Formel{' '}
                <code className="bg-white px-1.5 py-0.5 rounded text-[0.88rem]">
                  5 × (ESt(zvE + Abfindung/5) &minus; ESt(zvE))
                </code>
                . Dadurch wird die Progression gedämpft.
              </li>
              <li>
                <strong>Solidaritätszuschlag</strong>: 5,5&nbsp;% auf die ESt, aber nur
                oberhalb der Freigrenze (§&nbsp;3 SolzG). Für Alleinstehende greift der
                Soli ab einer ESt von ca. 19.950&nbsp;€, bei Zusammenveranlagung ab ca.
                39.900&nbsp;€.
              </li>
              <li>
                <strong>Kirchensteuer</strong>: 8&nbsp;% in Bayern und Baden-Württemberg,
                9&nbsp;% in allen anderen Bundesländern &mdash; berechnet auf die ESt.
                Ohne Konfession entfällt sie.
              </li>
              <li>
                <strong>Netto-Abfindung</strong> = Brutto-Abfindung &minus; (ESt + Soli +
                KiSt). Sozialversicherungsbeiträge entfallen bei Abfindungen (§&nbsp;14
                SGB&nbsp;IV).
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Fünftelregelung Deep-Dive */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Fünftelregelung im Detail
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wann die Fünftelregelung greift &mdash; und wann nicht
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Die Fünftelregelung ist eine Steuerermäßigung für außerordentliche
              Einkünfte. Sie wirkt progressions-dämpfend: Statt die Abfindung direkt
              in den höheren Steuersatz zu drücken, wird nur ein Fünftel ins zvE
              aufgenommen, die Mehrsteuer berechnet und dann mal fünf genommen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              <strong>Voraussetzungen</strong> (BFH-Rechtsprechung, u.&nbsp;a. VI R
              29/14):
            </p>
            <ul className="list-disc pl-5 text-[0.95rem] text-ink-light leading-relaxed space-y-2 mb-4">
              <li>
                <strong>Zusammenballung</strong> der Einkünfte: Abfindung + reguläre
                Einkünfte &gt; Vergleichseinkommen ohne Beendigung
              </li>
              <li>
                <strong>Zufluss in einem Veranlagungszeitraum</strong>
                (§&nbsp;11&nbsp;EStG) &mdash; Teilzahlungen über mehrere Jahre heben die
                Fünftelregelung in der Regel auf
              </li>
              <li>
                <strong>Einkünftezusammenhang</strong> mit der Beendigung des
                Arbeitsverhältnisses (§&nbsp;24&nbsp;Nr.&nbsp;1&nbsp;a EStG)
              </li>
            </ul>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              <strong>Seit 2025 (Wachstumschancengesetz)</strong>: Die Fünftelregelung
              wird nicht mehr automatisch bei der Lohnsteuer angewendet. Arbeitnehmer
              beantragen die Ermäßigung in der Einkommensteuererklärung (Anlage N).
              Zu viel gezahlte Lohnsteuer wird im Steuerbescheid erstattet.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>Praxis-Tipp</strong>: Wenn Sie eine Abfindung erhalten, planen
              Sie die Steuererklärung für dieses Jahr sorgfältig &mdash; Werbungskosten
              aus dem Beendigungsjahr (Umzug, Fachliteratur, Weiterbildung) senken das
              zvE zusätzlich und erhöhen damit die Netto-Abfindung.
            </p>
          </div>
        </div>
      </section>

      {/* Rechtsquellen */}
      <section className="py-10 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[760px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__32a.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  §&nbsp;32a EStG &mdash; Einkommensteuertarif &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__34.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  §&nbsp;34 EStG &mdash; Fünftelregelung &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__24.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  §&nbsp;24 EStG &mdash; Einkünfte-Katalog (Abfindungen als außerordentliche Einkünfte) &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/solzg_1995/__3.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  §&nbsp;3 SolzG &mdash; Solidaritätszuschlag und Freigrenze &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/estg/__11.html" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  §&nbsp;11 EStG &mdash; Zuflussprinzip &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[820px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Häufige Fragen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Häufige Fragen zur Netto-Abfindung
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Großer Disclaimer */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[820px] bg-white border-l-[4px] border-amber-500 rounded-sm p-6">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-amber-800 mb-3">
              Rechtlicher Disclaimer
            </div>
            <h2 className="font-serif text-[1.1rem] font-bold text-ink mb-3">
              Keine Steuerberatung &mdash; nur Orientierung
            </h2>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-3">
              Dieser Rechner liefert eine <strong>unverbindliche
              Erstorientierung</strong> auf Basis des aktuellen deutschen
              Einkommensteuertarifs. Er stellt keine Steuerberatung dar und
              ersetzt diese nicht.
            </p>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-3">
              Die tatsächliche Steuerlast weicht in Einzelfällen ab &mdash; sie hängt
              von Faktoren ab, die hier nicht erfasst werden: Werbungskosten,
              Sonderausgaben, außergewöhnliche Belastungen, Progressionsvorbehalt
              (Arbeitslosengeld I, Elterngeld, Krankengeld), weitere Einkünfte
              (Kapital, Vermietung, Nebenjobs), das genaue Zuflussjahr, die
              Erfüllung der Zusammenballungs-Voraussetzung sowie
              Verlustvorträge.
            </p>
            <p className="text-[0.92rem] text-ink-light leading-relaxed mb-0">
              Für die <strong>verbindliche Steuerberechnung</strong> ist das
              Finanzamt zuständig; für die Steuergestaltung ein{' '}
              <strong>Steuerberater</strong>. APOS Legal berät zu
              arbeitsrechtlichen Fragen rund um die Abfindung &mdash; die
              steuerliche Optimierung geschieht idealerweise in Abstimmung
              mit Ihrem Steuerberater.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Abfindung verhandeln &mdash; nicht nur rechnen
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[560px] mx-auto mb-6">
            Je höher die Brutto-Abfindung, desto höher auch die Netto-Abfindung.
            Prüfen Sie Ihren Fall &mdash; kostenlos und unverbindlich.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
