'use client';

import { useState } from 'react';
import Link from 'next/link';

const selectClass =
  'form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]';

export default function TeilzeitRechnerClient() {
  const [vollzeitUrlaub, setVollzeitUrlaub] = useState(30);
  const [unternehmensWoche, setUnternehmensWoche] = useState<5 | 6>(5);
  const [eigeneArbeitstage, setEigeneArbeitstage] = useState(1);
  const [hinweisOffen, setHinweisOffen] = useState(true);

  // §5 Abs. 2 BUrlG: Bruchteile ab 0,5 werden aufgerundet (= Math.round)
  const urlaubTeilzeit = Math.round((vollzeitUrlaub / unternehmensWoche) * eigeneArbeitstage);
  const prozent = Math.round((urlaubTeilzeit / vollzeitUrlaub) * 100);

  return (
    <section className="py-[70px] px-8 bg-white">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-2 gap-8 items-start max-lg:grid-cols-1">

          {/* Linke Karte — Eingaben + Ergebnis */}
          <div className="bg-white border border-border-light rounded overflow-hidden">
            <div className="h-2 bg-gold-dark" />
            <div className="p-8">
              <h2 className="font-serif text-[1.3rem] font-bold mb-6">Urlaubsrechner Teilzeit</h2>

              {/* Feld 1: Slider — Vollzeiturlaubsanspruch */}
              <div className="mb-6 min-h-[90px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">
                    Urlaubsanspruch (bei Vollzeit):
                  </label>
                  <span
                    className="text-ink-muted cursor-help"
                    title="Geben Sie an, wie viel Urlaubsanspruch auf Vollzeitbasis im Unternehmen besteht. Mit dem Schieberegler können Sie die Tage verändern."
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={35}
                  step={1}
                  value={vollzeitUrlaub}
                  onChange={(e) => setVollzeitUrlaub(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-[#7A6530]"
                />
                <div className="text-[0.92rem] font-semibold text-gold-dark mt-2">{vollzeitUrlaub} Tage</div>
              </div>

              {/* Feld 2: Toggle — Arbeitswoche des Unternehmens */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">
                    Arbeitswoche des Unternehmens:
                  </label>
                  <span
                    className="text-ink-muted cursor-help"
                    title="Hat Ihr Unternehmen eine 5- oder eine 6-Tage-Woche?"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <div className="flex rounded-sm overflow-hidden">
                  <button
                    onClick={() => setUnternehmensWoche(5)}
                    className={`flex-1 py-3 font-sans text-[0.88rem] font-semibold border-none cursor-pointer transition-all ${
                      unternehmensWoche === 5
                        ? 'bg-[#2A1F0E] text-white'
                        : 'bg-gold text-white'
                    }`}
                  >
                    5 TAGE
                  </button>
                  <button
                    onClick={() => setUnternehmensWoche(6)}
                    className={`flex-1 py-3 font-sans text-[0.88rem] font-semibold border-none cursor-pointer transition-all ${
                      unternehmensWoche === 6
                        ? 'bg-[#2A1F0E] text-white'
                        : 'bg-gold text-white'
                    }`}
                  >
                    6 TAGE
                  </button>
                </div>
              </div>

              {/* Feld 3: Select — Eigene Arbeitstage */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-[0.84rem] font-semibold text-ink">
                    Ihre Arbeitstage pro Woche:
                  </label>
                  <span
                    className="text-ink-muted cursor-help"
                    title="Hier tragen Sie ein, wie viele Tage pro Woche Sie arbeiten müssen."
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                </div>
                <select
                  value={eigeneArbeitstage}
                  onChange={(e) => setEigeneArbeitstage(Number(e.target.value))}
                  className={selectClass}
                >
                  <option value={1}>1 Arbeitstag</option>
                  <option value={2}>2 Arbeitstage</option>
                  <option value={3}>3 Arbeitstage</option>
                  <option value={4}>4 Arbeitstage</option>
                  <option value={5}>5 Arbeitstage</option>
                  <option value={6}>6 Arbeitstage</option>
                </select>
              </div>

              {/* Ergebnis (live) */}
              <div className="border-t border-border pt-6">
                <div className="text-[0.84rem] font-semibold text-ink mb-3">Ihr Urlaubsanspruch:</div>
                <div
                  id="ergebnis-box"
                  className="py-5 px-6 bg-cream border-2 border-gold/30 rounded-sm text-center"
                >
                  <div className="font-serif text-[2rem] font-bold text-gold-dark">
                    {urlaubTeilzeit} Tage
                  </div>
                </div>
                <div className="text-[0.84rem] text-ink-muted mt-2.5 text-center">
                  Das entspricht {prozent}&nbsp;% des Vollzeiturlaubs.
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Seite — Erklärungen */}
          <div>
            <div className="border border-border rounded-sm overflow-hidden">
              <button
                onClick={() => setHinweisOffen(!hinweisOffen)}
                className="w-full flex items-center justify-between py-3.5 px-5 bg-cream text-[0.88rem] font-semibold text-ink cursor-pointer border-none text-left"
              >
                Hinweis zur Urlaubsberechnung
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
                <div className="p-5 space-y-3">
                  <div className="py-3 px-4 bg-white rounded-sm border border-border">
                    <strong className="text-[0.84rem] text-ink">Urlaubsanspruch (bei Vollzeit):</strong>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0 mt-1">
                      Bitte geben Sie an, wie viel Urlaubsanspruch auf Vollzeitbasis im Unternehmen besteht.
                      Mit dem Schieberegler können Sie die Tage verändern.
                    </p>
                  </div>
                  <div className="py-3 px-4 bg-white rounded-sm border border-border">
                    <strong className="text-[0.84rem] text-ink">Arbeitswoche des Unternehmens:</strong>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0 mt-1">
                      Hat Ihr Unternehmen eine 5 oder eine 6-Tage-Woche?
                    </p>
                  </div>
                  <div className="py-3 px-4 bg-white rounded-sm border border-border">
                    <strong className="text-[0.84rem] text-ink">Ihre Arbeitstage pro Woche:</strong>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0 mt-1">
                      Hier tragen Sie ein, wie viele Tage pro Woche Sie arbeiten müssen.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[0.75rem] text-ink-muted mt-5 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
              Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche
              Einschätzung wenden Sie sich bitte an einen{' '}
              <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>.
            </p>
          </div>
        </div>

        {/* CTA #2 — nach Rechner */}
        <div className="mt-10 border-2 border-gold/20 rounded-sm p-7 bg-cream max-w-[640px] mx-auto text-center">
          <h3 className="font-serif text-[1.15rem] font-bold mb-2">
            Ergebnis berechnet &mdash; nächster Schritt?
          </h3>
          <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-5">
            Wird Ihr Urlaubsanspruch in Teilzeit nicht korrekt berechnet oder verweigert?
            Wir setzen Ihre Rechte durch.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="block w-full py-3.5 bg-[#2A1F0E] text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#1a1408] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Anspruch kostenlos prüfen &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
