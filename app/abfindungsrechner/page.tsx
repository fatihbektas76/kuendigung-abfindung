'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const faqs = [
  {
    q: 'Wie genau ist der Abfindungsrechner?',
    a: 'Der Rechner basiert auf der gängigen Abfindungsformel (0,5 Bruttomonatsgehälter pro Beschäftigungsjahr) und gibt Ihnen eine erste Orientierung. Die tatsächliche Abfindung hängt von vielen individuellen Faktoren ab \u2014 Formfehler, Sozialauswahl, besonderer Kündigungsschutz. Ein Fachanwalt kann Ihren konkreten Fall einschätzen.',
  },
  {
    q: 'Ist die Abfindung brutto oder netto?',
    a: 'Die berechnete Abfindung ist ein Bruttobetrag. Abfindungen sind einkommensteuerpflichtig, aber sozialversicherungsfrei. Durch die Fünftelregelung (§34 EStG) kann die Steuerlast deutlich gesenkt werden.',
  },
  {
    q: 'Wann bekomme ich mehr als den Regelsatz?',
    a: 'Faktoren über 0,5 sind realistisch bei: Formfehlern in der Kündigung, fehlerhafter Sozialauswahl, fehlender Betriebsratsanhörung, besonderem Kündigungsschutz (Schwangerschaft, Schwerbehinderung), langer Betriebszugehörigkeit oder hohem Alter. In diesen Fällen kann der Faktor 1,0 oder höher erreichen.',
  },
];

export default function AbfindungsrechnerPage() {
  const [gehalt, setGehalt] = useState('');
  const [jahre, setJahre] = useState('');
  const [risiko, setRisiko] = useState('mittel');
  const [result, setResult] = useState<{ min: number; mid: number; max: number } | null>(null);

  function calculate() {
    const g = parseFloat(gehalt.replace(/\./g, '').replace(',', '.'));
    const j = parseInt(jahre, 10);
    if (!g || g <= 0 || !j || j <= 0) return;
    setResult({
      min: g * 0.25 * j,
      mid: g * 0.5 * j,
      max: g * 1.0 * j,
    });
  }

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <main>
      {/* Schema.org - SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Abfindungsrechner',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/abfindungsrechner`,
            description:
              'Kostenloser Abfindungsrechner: Berechnen Sie Ihre voraussichtliche Abfindung nach Kündigung in 30 Sekunden. Drei Szenarien basierend auf der Abfindungsformel.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            author: {
              '@type': 'Organization',
              name: 'gekuendigt-abfindung.de',
              url: BASE_URL,
            },
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
            <span>Abfindungsrechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Abfindungsrechner: Ihre Abfindung in 30 Sekunden
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie Ihre voraussichtliche Abfindung nach der gängigen Formel.
            Drei Szenarien &mdash; von konservativ bis optimistisch.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Bruttomonatsgehalt (&euro;) <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={gehalt}
                    onChange={(e) => setGehalt(e.target.value)}
                    placeholder="z. B. 4.000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Betriebszugehörigkeit (Jahre) <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={jahre}
                    onChange={(e) => setJahre(e.target.value)}
                    placeholder="z. B. 5"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Risikoeinschätzung
                  </label>
                  <select
                    value={risiko}
                    onChange={(e) => setRisiko(e.target.value)}
                    className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    <option value="niedrig">Niedrig &mdash; Kündigung wahrscheinlich wirksam</option>
                    <option value="mittel">Mittel &mdash; Erfolgsaussichten unklar</option>
                    <option value="hoch">Hoch &mdash; Kündigung wahrscheinlich unwirksam</option>
                  </select>
                  <p className="text-[0.78rem] text-ink-muted mt-1">
                    Je schwächer die Kündigung, desto höher Ihre Verhandlungsposition.
                  </p>
                </div>
                <button
                  onClick={calculate}
                  className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  Abfindung berechnen
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ihre geschätzte Abfindung</h2>
                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                  {/* Minimum */}
                  <div className="rounded-sm border border-border p-5 text-center bg-white">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                      Minimum
                    </div>
                    <div className="text-[0.78rem] text-ink-muted mb-1">Faktor 0,25&times;</div>
                    <div className="font-serif text-[1.6rem] font-bold text-ink">
                      {fmt(result.min)}
                    </div>
                  </div>
                  {/* Realistisch */}
                  <div className="rounded-sm border-2 border-gold p-5 text-center bg-gold-bg">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                      Realistisch
                    </div>
                    <div className="text-[0.78rem] text-gold-dark mb-1">Faktor 0,5&times;</div>
                    <div className="font-serif text-[1.6rem] font-bold text-gold-dark">
                      {fmt(result.mid)}
                    </div>
                  </div>
                  {/* Maximum */}
                  <div className="rounded-sm border border-ink/20 p-5 text-center bg-[#1A1A1A] text-white">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/60 mb-2">
                      Maximum
                    </div>
                    <div className="text-[0.78rem] text-white/60 mb-1">Faktor 1,0&times;</div>
                    <div className="font-serif text-[1.6rem] font-bold text-white">
                      {fmt(result.max)}
                    </div>
                  </div>
                </div>
                <p className="text-[0.78rem] text-ink-muted mt-4">
                  Die Berechnung basiert auf der Formel: Faktor &times; Bruttomonatsgehalt &times; Betriebsjahre.
                  Die tatsächliche Abfindung hängt von den Umständen Ihres Falls ab.
                </p>

                {/* CTA 1 */}
                <div className="mt-8 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Möchten Sie wissen, welches Szenario für Sie realistisch ist?</strong>
                  </p>
                  <a
                    href="/#kontakt"
                    className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428]"
                  >
                    Kostenlose Ersteinschätzung anfordern &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ein Rechner ersetzt keinen Anwalt
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die Berechnung gibt Ihnen eine erste Orientierung. Für eine belastbare Einschätzung
            prüfen wir Ihren individuellen Fall &mdash; kostenlos.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zur Abfindungsberechnung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Kündigung erhalten? Abfindung maximieren.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die 3-Wochen-Klagefrist nach &sect;4 KSchG läuft. Sichern Sie sich jetzt eine
            kostenlose Ersteinschätzung Ihrer Abfindungschancen.
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
