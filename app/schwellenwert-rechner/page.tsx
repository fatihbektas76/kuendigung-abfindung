'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const faqs = [
  {
    q: 'Was ist der Schwellenwert nach §23 KSchG?',
    a: 'Das Kündigungsschutzgesetz (KSchG) gilt nur in Betrieben mit mehr als 10 Arbeitnehmern in Vollzeitäquivalenten (FTE). Teilzeitkräfte werden anteilig gezählt: bis 20 Stunden/Woche mit Faktor 0,5, bis 30 Stunden/Woche mit Faktor 0,75. Auszubildende zählen nicht mit.',
  },
  {
    q: 'Was passiert, wenn der Schwellenwert nicht erreicht wird?',
    a: 'Wird der Schwellenwert von 10 FTE nicht überschritten, gilt das KSchG nicht \u2014 Ihr Arbeitgeber braucht keinen Kündigungsgrund. Aber: Auch in Kleinbetrieben gibt es Mindestschutz, z.\u00A0B. Kündigungsfristen nach §622 BGB, Schutz vor sittenwidriger oder diskriminierender Kündigung und Mutterschutz.',
  },
  {
    q: 'Werden Minijobber beim Schwellenwert mitgezählt?',
    a: 'Ja, Minijobber werden mit Faktor 0,5 mitgezählt, wenn sie regelmäßig nicht mehr als 20 Stunden pro Woche arbeiten. Bei mehr als 20 bis 30 Stunden liegt der Faktor bei 0,75. Entscheidend ist die regelmäßige wöchentliche Arbeitszeit, nicht der Verdienst.',
  },
];

export default function SchwellenwertRechnerPage() {
  const [vollzeit, setVollzeit] = useState('');
  const [teilzeit30, setTeilzeit30] = useState('');
  const [teilzeit20, setTeilzeit20] = useState('');
  const [minijob, setMinijob] = useState('');
  const [result, setResult] = useState<{ fte: number; gilt: boolean } | null>(null);

  function calculate() {
    const vz = parseInt(vollzeit, 10) || 0;
    const tz30 = parseInt(teilzeit30, 10) || 0;
    const tz20 = parseInt(teilzeit20, 10) || 0;
    const mj = parseInt(minijob, 10) || 0;

    const fte = vz * 1.0 + tz30 * 0.75 + tz20 * 0.5 + mj * 0.5;
    setResult({ fte: Math.round(fte * 100) / 100, gilt: fte > 10 });
  }

  return (
    <main>
      {/* Schema.org - SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Schwellenwert-Rechner §23 KSchG',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/schwellenwert-rechner`,
            description:
              'Prüfen Sie kostenlos, ob das Kündigungsschutzgesetz für Ihren Betrieb gilt. Berechnung nach §23 KSchG mit Vollzeitäquivalenten (FTE).',
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
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Schwellenwert-Rechner §23 KSchG', item: `${BASE_URL}/schwellenwert-rechner` },
            ],
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
            name: 'KSchG-Schwellenwert prüfen — gilt das Kündigungsschutzgesetz?',
            description:
              'Prüfen Sie in 4 Schritten, ob das Kündigungsschutzgesetz (KSchG) für Ihren Betrieb gilt. Der Schwellenwert von 10 Vollzeitäquivalenten entscheidet.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Vollzeitkräfte eingeben',
                text: 'Geben Sie die Anzahl der Mitarbeiter mit mehr als 30 Wochenstunden ein. Diese zählen mit Faktor 1,0.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Teilzeitkräfte erfassen',
                text: 'Erfassen Sie Teilzeitkräfte getrennt: Mitarbeiter mit 20–30 Wochenstunden (Faktor 0,75) und Mitarbeiter bis 20 Wochenstunden (Faktor 0,5).',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Minijobber angeben',
                text: 'Geben Sie die Anzahl der Minijobber ein. Diese werden mit Faktor 0,5 gezählt. Auszubildende zählen nicht mit.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Ergebnis prüfen',
                text: 'Der Rechner addiert alle Vollzeitäquivalente (FTE). Liegt die Summe über 10, gilt das KSchG — Ihr Arbeitgeber braucht einen Kündigungsgrund.',
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
            <span>Schwellenwert-Rechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Gilt das Kündigungsschutzgesetz für Sie? &sect;23 KSchG prüfen
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Das KSchG gilt nur in Betrieben mit mehr als 10 Vollzeitäquivalenten. Prüfen Sie hier,
            ob der Schwellenwert in Ihrem Betrieb erreicht wird.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <h2 className="font-serif text-[1.2rem] font-bold mb-5">Mitarbeiter im Betrieb</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Vollzeit-Mitarbeiter (&gt;30 Std./Woche)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vollzeit}
                    onChange={(e) => setVollzeit(e.target.value)}
                    placeholder="z. B. 8"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1">Faktor: 1,0 pro Person</p>
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Teilzeit &gt;20 bis 30 Std./Woche
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={teilzeit30}
                    onChange={(e) => setTeilzeit30(e.target.value)}
                    placeholder="z. B. 2"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1">Faktor: 0,75 pro Person</p>
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Teilzeit &le;20 Std./Woche
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={teilzeit20}
                    onChange={(e) => setTeilzeit20(e.target.value)}
                    placeholder="z. B. 3"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1">Faktor: 0,5 pro Person</p>
                </div>
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Minijobber
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minijob}
                    onChange={(e) => setMinijob(e.target.value)}
                    placeholder="z. B. 1"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                  />
                  <p className="text-[0.78rem] text-ink-muted mt-1">
                    Faktor: 0,5 pro Person (bei &le;20 Std.) bzw. 0,75 (bei &gt;20 Std.). Hier vereinfacht als 0,5.
                  </p>
                </div>
                <button
                  onClick={calculate}
                  className="w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  Schwellenwert prüfen
                </button>
              </div>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung Ihres Falls wenden Sie sich bitte an einen <a href="/#kontakt" className="text-gold no-underline hover:underline">Fachanwalt für Arbeitsrecht</a>.
              </p>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ergebnis</h2>
                <div
                  className={`rounded-sm border-2 p-6 text-center ${
                    result.gilt
                      ? 'border-green bg-green-bg'
                      : 'border-gold bg-cream'
                  }`}
                >
                  <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-2 text-ink-muted">
                    Vollzeitäquivalente (FTE)
                  </div>
                  <div className="font-serif text-[2rem] font-bold mb-3">
                    {result.fte.toLocaleString('de-DE')}
                  </div>
                  {result.gilt ? (
                    <div>
                      <div className="inline-block py-1.5 px-4 bg-green text-white rounded-sm text-[0.85rem] font-semibold mb-3">
                        KSchG gilt
                      </div>
                      <p className="text-[0.92rem] text-ink-light leading-relaxed">
                        Mit {result.fte} FTE liegt Ihr Betrieb <strong>über dem Schwellenwert von 10</strong>.
                        Das Kündigungsschutzgesetz gilt &mdash; Ihr Arbeitgeber braucht einen anerkannten
                        Kündigungsgrund (betriebsbedingt, verhaltensbedingt oder personenbedingt).
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="inline-block py-1.5 px-4 bg-gold-dark text-white rounded-sm text-[0.85rem] font-semibold mb-3">
                        KSchG gilt nicht
                      </div>
                      <p className="text-[0.92rem] text-ink-light leading-relaxed">
                        Mit {result.fte} FTE liegt Ihr Betrieb <strong>bei oder unter dem Schwellenwert von 10</strong>.
                        Das KSchG findet keine Anwendung. Aber: Kündigungsfristen nach &sect;622 BGB,
                        Schutz vor sittenwidriger Kündigung und besonderer Kündigungsschutz
                        (Schwangerschaft, Schwerbehinderung) gelten weiterhin.
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA 1 */}
                <div className="mt-8 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Unsicher, ob die Berechnung korrekt ist? Wir prüfen es für Sie.</strong>
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

      {/* Explanation */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              So wird der Schwellenwert berechnet
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Nach &sect;23 Abs. 1 KSchG gilt das Kündigungsschutzgesetz nur in Betrieben, in denen
              <strong> mehr als 10 Arbeitnehmer</strong> in Vollzeitäquivalenten beschäftigt sind. Die Berechnung:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-4 font-semibold">Arbeitszeit</th>
                    <th className="text-right py-3 px-4 font-semibold">Faktor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Vollzeit (&gt;30 Std./Woche)</td>
                    <td className="py-3 px-4 text-right font-semibold">1,0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Teilzeit &gt;20 bis 30 Std./Woche</td>
                    <td className="py-3 px-4 text-right font-semibold">0,75</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Teilzeit &le;20 Std./Woche</td>
                    <td className="py-3 px-4 text-right font-semibold">0,5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Auszubildende zählen nicht mit. Leiharbeitnehmer werden mitgezählt, wenn sie regelmäßig
              beschäftigt sind. Entscheidend ist die <strong>regelmäßige</strong> Beschäftigtenzahl,
              nicht die Zahl am Kündigungstag.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            KSchG gilt nicht? Sie haben trotzdem Rechte.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Auch in Kleinbetrieben gelten Kündigungsfristen, Diskriminierungsschutz und
            besonderer Kündigungsschutz. Wir beraten Sie.
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
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zum Schwellenwert &sect;23 KSchG
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Gekündigt? Wir prüfen Ihren Schutz.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Ob Kleinbetrieb oder Konzern &mdash; wir prüfen Ihre Kündigung auf alle Schwachstellen
            und beraten Sie zu Ihren Optionen.
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
