'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BetriebsEntry } from '@/lib/betriebszugehoerigkeit';
import TldrBox from '@/components/TldrBox';
import BagQuote from '@/components/BagQuote';
import DefinitionBox from '@/components/DefinitionBox';

/* ── Types ── */
type Beispielsfall = {
  initialen: string;
  name: string;
  branche: string;
  gehalt: number;
  kuendigungsart: string;
  zitat: string;
  geprueft: string[];
  vorgehen: string[];
  ergebnis: number;
};

type YearData = {
  kuendigungsfristKurz: string;
  kuendigungsfristLang: string;
  kuendigungsfristHinweis: string;
  kschgGilt: boolean;
  haeufigeFehler: string[];
  beispielsfall: Beispielsfall;
  faqs: { frage: string; antwort: string }[];
};

type Props = {
  entry: BetriebsEntry;
  prev: BetriebsEntry | null;
  next: BetriebsEntry | null;
  yearData: YearData;
};

/* ── Helpers ── */
const fmt = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtPlain = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/* ── Component ── */
export default function GekuendigtContent({ entry, prev, next, yearData }: Props) {
  const [gehalt, setGehalt] = useState(3500);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const y = entry.year;
  const yl = y === 1 ? '1 Jahr' : `${y} Jahren`;
  const ylKurz = y === 1 ? '1 Jahr' : `${y} Jahre`;
  const wartezeitErfuellt = y >= 1;

  return (
    <main className="pb-20">
      {/* ═══ 1. H1 + Intro + Badges ═══ */}
      <section className="bg-white pt-[120px] pb-8 px-4 sm:px-8 border-b border-gray-200 mb-3">
        <div className="max-w-content mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="text-[#8B7A3A] no-underline hover:underline">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/kuendigung" className="text-[#8B7A3A] no-underline hover:underline">Kündigung</Link>
            <span className="mx-2">/</span>
            <span>Gekündigt nach {yl}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#6B6626] mb-4 leading-tight max-w-[750px]">
            Gekündigt nach {entry.word} {y === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit &mdash; was jetzt?
          </h1>
          <p className="text-lg text-gray-600 max-w-[680px] leading-relaxed mb-6">
            Sie haben nach {yl} eine Kündigung erhalten? Erfahren Sie, welche Rechte Sie haben,
            wie hoch Ihre Abfindungschancen sind und was Sie jetzt sofort tun müssen.
            Die 3-Wochen-Frist für die Kündigungsschutzklage läuft &mdash; handeln Sie jetzt.
          </p>

          <div className="flex flex-wrap gap-3">
            {['Fachanwalt für Arbeitsrecht', 'Kostenlose Ersteinschätzung', 'Antwort in 24h'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700">
                <svg width="14" height="14" fill="none" stroke="#6B6626" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <TldrBox items={[
              `Kündigungsfrist bei ${yl}: ${entry.kuendigungsfrist} (§ 622 BGB).`,
              `Kündigungsschutzklage innerhalb von 3 Wochen einreichen — sonst wird die Kündigung automatisch wirksam.`,
              `Abfindungschance: Faustformel 0,5 × Bruttomonatsgehalt × ${ylKurz} — verhandelbar auf bis zu 1,5×.`,
              yearData.kschgGilt
                ? 'Das Kündigungsschutzgesetz (KSchG) gilt für Sie — Ihr Arbeitgeber braucht einen anerkannten Kündigungsgrund.'
                : 'Das Kündigungsschutzgesetz (KSchG) gilt erst ab 6 Monaten Betriebszugehörigkeit und 10 Mitarbeitern.',
              'Kostenrisiko: Im Arbeitsrecht 1. Instanz trägt jede Partei ihre eigenen Anwaltskosten (§ 12a ArbGG).',
            ]} />
          </div>
        </div>
      </section>

      {/* ═══ 2. KSchG-Hinweis-Block ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Gilt der allgemeine Kündigungsschutz nach {yl} Betriebszugehörigkeit?
              </h2>

              {/* Bedingungsboxen — grau, nur Dot ist farbig */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${wartezeitErfuellt ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Wartezeit 6 Monate</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {wartezeitErfuellt
                        ? `Nach ${yl} erfüllt (§ 1 Abs. 1 KSchG)`
                        : 'Noch nicht erfüllt — eingeschränkter Kündigungsschutz'}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 bg-[#8B7A3A]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Betriebsgröße &gt;10 Mitarbeiter</p>
                    <p className="text-xs text-gray-500 mt-0.5">Individuell zu prüfen (§ 23 Abs. 1 KSchG)</p>
                  </div>
                </div>
              </div>

              {/* Kleinbetrieb — weißer Hintergrund, roter linker Balken */}
              <div className="border-l-4 border-red-700 bg-white rounded-r-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  In <strong>Kleinbetrieben mit bis zu 10 Mitarbeitern</strong> gilt kein allgemeiner Kündigungsschutz nach dem KSchG.
                  Die Kündigung muss aber dennoch nicht hingenommen werden &mdash; Formfehler, falsche Fristen und Diskriminierung sind auch hier angreifbar.
                </p>
              </div>

              {/* Besonderer Kündigungsschutz — grauer Hintergrund, goldener Balken */}
              <div className="border-l-4 border-[#BA7517] bg-gray-50 rounded-r-lg p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Auch im Kleinbetrieb kann ein besonderer Kündigungsschutz bestehen:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: 'Schwerbehinderung', ref: '§ 168 SGB IX' },
                    { label: 'Schwangerschaft & Mutterschutz', ref: '§ 17 MuSchG' },
                    { label: 'Elternzeit', ref: '§ 18 BEEG' },
                    { label: 'Betriebsratsamt', ref: '§ 15 KSchG' },
                    { label: 'Pflegezeit', ref: '§ 5 PflegeZG' },
                    { label: 'Diskriminierung', ref: 'AGG' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-700">
                      <span className="font-medium">{item.label}</span>{' '}
                      <span className="text-gray-400">({item.ref})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/schwellenwert-rechner/"
              className="block border-t border-gray-200 px-4 py-3 text-sm text-[#8B7A3A] font-medium hover:bg-gray-50 transition-colors no-underline"
            >
              Gilt das KSchG in Ihrem Betrieb? Jetzt prüfen mit dem Schwellenwertrechner &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2b. Definitionsbox Kündigungsschutzklage ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <DefinitionBox term="Kündigungsschutzklage" definition="Die Klage vor dem Arbeitsgericht auf Feststellung, dass eine Kündigung unwirksam ist. Die Klagefrist beträgt 3 Wochen ab Zugang der Kündigung (§ 4 KSchG). In ca. 80 % der Fälle endet das Verfahren mit einem Vergleich — in der Regel einer Abfindung." />
        </div>
      </section>

      {/* ═══ 3. CTA #1 — dunkelgrün ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-[#6B6626] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Jetzt kostenlose Ersteinschätzung anfordern</p>
              <p className="text-white/70 text-sm">3-Wochen-Frist läuft ab Zugang. Kündigung in 24h prüfen lassen.</p>
            </div>
            <a
              href="/#kontakt"
              className="shrink-0 bg-white text-[#6B6626] px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-gray-100 transition-colors"
            >
              Jetzt prüfen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 4. Fakten-Box (2x2 Grid) — bg-gray-50, Kacheln weiß mit goldenem border-top ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto bg-gray-50 rounded-lg p-4 fakt-box">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Klagefrist', value: '3 Wochen', desc: 'Ab Zugang der Kündigung (§ 4 KSchG) — Verpassen der Frist führt zur Wirksamkeit der Kündigung' },
              { label: 'Kündigungsfrist (§ 622 BGB)', value: yearData.kuendigungsfristKurz, desc: yearData.kuendigungsfristHinweis },
              { label: 'Abfindungsformel', value: `0,5 × Gehalt × ${y}`, desc: 'Faustformel — kein gesetzlicher Anspruch' },
              { label: 'KSchG-Wartezeit', value: wartezeitErfuellt ? 'Erfüllt' : 'Noch nicht erfüllt', desc: wartezeitErfuellt ? '6-Monats-Wartezeit nach § 1 KSchG ist erfüllt — voller Kündigungsschutz möglich' : 'Wartezeit von 6 Monaten noch nicht erreicht — eingeschränkter Schutz', color: wartezeitErfuellt ? 'text-green-700' : 'text-red-600' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="h-[3px] bg-[#8B7A3A]" />
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{fact.label}</p>
                  <p className={`text-2xl font-bold mb-2 ${fact.color || 'text-gray-900'}`}>{fact.value}</p>
                  <p className="text-sm text-gray-600">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Sofortmaßnahmen ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Was Sie nach Kündigung nach {yl} Betriebszugehörigkeit sofort tun müssen
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Datum notieren', desc: 'Schreiben Sie sofort das exakte Datum auf, an dem Sie die Kündigung erhalten haben. Ab diesem Tag läuft die 3-Wochen-Frist für die Kündigungsschutzklage (§ 4 KSchG).' },
                { title: 'Nichts unterschreiben', desc: 'Unterschreiben Sie weder die Kündigung noch einen Aufhebungsvertrag. Lassen Sie sich nicht unter Druck setzen — Sie haben Zeit zum Überlegen.' },
                { title: 'Sofort arbeitssuchend melden', desc: 'Melden Sie sich innerhalb von 3 Tagen bei der Agentur für Arbeit arbeitssuchend, um eine Sperrzeit beim Arbeitslosengeld zu vermeiden.' },
                { title: 'Anwalt kontaktieren', desc: `Kontaktieren Sie umgehend einen Fachanwalt für Arbeitsrecht. Die Ersteinschätzung ist kostenlos. Bei ${yl} Betriebszugehörigkeit prüfen wir Kündigungsfrist, Sozialauswahl und Formfehler.` },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#8B7A3A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{step.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. Häufige Fehler — bg-gray-50, roter linker Balken ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Häufige Fehler des Arbeitgebers bei Kündigung nach {yl} Betriebszugehörigkeit
          </h2>
          <div className="border-l-[3px] border-red-700 bg-gray-50 rounded-r-lg p-4">
            <div className="space-y-3">
              {yearData.haeufigeFehler.map((fehler, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-sm mt-0.5 flex-shrink-0">&#10007;</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{fehler}</p>
                </div>
              ))}
            </div>
          </div>

          <BagQuote az="2 AZR 140/22" gericht="BAG" datum="13. Juli 2023">
            Der Arbeitgeber muss die Sozialauswahl nach den Kriterien des § 1 Abs. 3 KSchG ordnungsgemäß durchführen. Eine fehlerhafte Sozialauswahl führt zur Unwirksamkeit der Kündigung.
          </BagQuote>
        </div>
      </section>

      {/* ═══ 7. Beispielsfall ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
            <span className="absolute top-3 right-3 bg-[#7A6528] text-[#F0EAD9] text-xs font-semibold px-2 py-0.5 rounded-full">Beispielfall</span>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#6B6626] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {yearData.beispielsfall.initialen}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{yearData.beispielsfall.name}</p>
                  <p className="text-sm text-gray-500">{yearData.beispielsfall.branche}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{ylKurz} Betriebszugehörigkeit</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{fmtPlain(yearData.beispielsfall.gehalt)} &euro; Gehalt</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{yearData.beispielsfall.kuendigungsart}</span>
              </div>

              <blockquote className="border-l-[3px] border-[#8B7A3A] pl-4 py-2 mb-4">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &bdquo;{yearData.beispielsfall.zitat}&ldquo;
                </p>
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Was wir geprüft haben</p>
                  <ul className="space-y-2">
                    {yearData.beispielsfall.geprueft.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg width="14" height="14" fill="none" stroke="#8B7A3A" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Unser Vorgehen</p>
                  <ul className="space-y-2">
                    {yearData.beispielsfall.vorgehen.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg width="14" height="14" fill="none" stroke="#8B7A3A" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ergebnis — bg-green-50 border border-green-200, text-green-800 */}
            <div className="bg-green-50 border border-green-200 mx-4 mb-4 rounded-lg px-4 py-3 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-green-800 font-medium">Ergebnis: Abfindung</p>
                <p className="text-2xl font-bold text-green-800">{fmt(yearData.beispielsfall.ergebnis)}</p>
              </div>
              <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                Erfolgreich abgeschlossen
              </span>
            </div>

          </div>
          <p className="text-xs text-gray-400 mt-2 italic">* Fiktives Fallbeispiel zur Veranschaulichung. Alle Namen und Angaben sind frei erfunden.</p>
        </div>
      </section>

      {/* ═══ 8. Abfindungstabelle ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Abfindung nach {yl} Betriebszugehörigkeit &mdash; Tabelle nach Gehalt
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Bruttogehalt</th>
                    <th className="text-center py-3 px-4 font-semibold text-white bg-[#8B7A3A] rounded-t">Faktor 0,5&times;</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Faktor 1,0&times;</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Faktor 1,5&times;</th>
                  </tr>
                </thead>
                <tbody>
                  {[2500, 3500, 5000, 7500].map((salary, i) => (
                    <tr key={salary} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium text-gray-900">{fmtPlain(salary)} &euro;</td>
                      <td className="py-3 px-4 text-center font-bold text-[#6B6626] bg-[#8B7A3A]/5">{fmt(salary * 0.5 * y)}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{fmt(salary * 1.0 * y)}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{fmt(salary * 1.5 * y)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Faustformel: Bruttomonatsgehalt &times; Faktor &times; {ylKurz}. Kein Rechtsanspruch &mdash; tatsächliche Höhe abhängig vom Einzelfall.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 9. Abfindungsrechner (Slider) ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Abfindungsrechner &mdash; {ylKurz} Betriebszugehörigkeit
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Verschieben Sie den Regler, um Ihre mögliche Abfindung zu berechnen. Jahre sind fest auf {y} gesetzt.
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Bruttomonatsgehalt</label>
                <span className="text-sm font-bold text-[#6B6626]">{fmtPlain(gehalt)} &euro;</span>
              </div>
              <input
                type="range"
                min={1500}
                max={10000}
                step={100}
                value={gehalt}
                onChange={(e) => setGehalt(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B7A3A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.500 &euro;</span>
                <span>10.000 &euro;</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Regelabfindung</p>
                <p className="text-xl font-bold text-gray-900">{fmt(gehalt * 0.5 * y)}</p>
                <p className="text-xs text-gray-400 mt-1">Faktor 0,5&times;</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Gute Verhandlung</p>
                <p className="text-xl font-bold text-gray-900">{fmt(gehalt * 1.0 * y)}</p>
                <p className="text-xs text-gray-400 mt-1">Faktor 1,0&times;</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border-2 border-[#8B7A3A]">
                <p className="text-xs font-semibold text-[#6B6626] uppercase tracking-wide mb-1">Starke Position</p>
                <p className="text-xl font-bold text-[#6B6626]">{fmt(gehalt * 1.5 * y)}</p>
                <p className="text-xs text-[#8B7A3A] mt-1">Faktor 1,5&times;</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              * Erfahrungswerte. Kein Rechtsanspruch. Tatsächliche Abfindung hängt vom Einzelfall ab.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 10. CTA #2 — dezent, goldener linker Balken ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-[#8B7A3A] bg-white border-y border-r border-gray-200 rounded-r-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Abfindung kostenlos prüfen lassen</p>
              <p className="text-sm text-gray-500">Wir prüfen Ihre Kündigung und berechnen Ihre individuelle Abfindungschance.</p>
            </div>
            <a
              href="/#kontakt"
              className="shrink-0 bg-[#6B6626] text-white px-6 py-2.5 rounded text-sm font-semibold no-underline hover:bg-[#5a5520] transition-colors"
            >
              Jetzt prüfen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 11. 3-Schritte-Ablauf ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">So läuft die Zusammenarbeit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { step: 1, title: 'Sofort-Check', desc: 'Schildern Sie uns Ihren Fall über das Kontaktformular. Wir prüfen Ihre Kündigung kostenlos und geben Ihnen innerhalb von 24 Stunden eine Ersteinschätzung.' },
                { step: 2, title: 'Termin vereinbaren', desc: 'In einem persönlichen Gespräch besprechen wir Ihre Optionen: Kündigungsschutzklage, Abfindungsverhandlung oder Aufhebungsvertrag. Sie entscheiden.' },
                { step: 3, title: 'Kanzlei beauftragen', desc: 'Wir übernehmen die gesamte Korrespondenz, reichen fristgerecht Klage ein und verhandeln Ihre Abfindung. Sie lehnen sich zurück.' },
              ].map((s) => (
                <div key={s.step} className="bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 mb-3">
                    {s.step}
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="/#kontakt"
                className="inline-block bg-[#6B6626] text-white px-8 py-3 rounded font-semibold text-sm no-underline hover:bg-[#5a5520] transition-colors"
              >
                Kündigung kostenlos prüfen lassen &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 12. Trust-Block ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Warum Sie uns vertrauen können</h2>
            <p className="text-sm text-gray-500 mb-4">Spezialisiert auf Kündigungsschutz und Abfindung &mdash; seit über 20 Jahren.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { title: 'Nachweisliche Erfolgsbilanz', desc: 'Über 2.000 erfolgreiche Verfahren, 5,0 Sterne auf anwalt.de. Unsere Erfahrung ist Ihr Vorteil bei der Abfindungsverhandlung.' },
                { title: 'Einfach & Transparent', desc: 'Klare Kommunikation, keine versteckten Kosten. Sie wissen jederzeit, was passiert und was es kostet.' },
                { title: 'Schneller Sofort-Check', desc: 'Formular ausfüllen, Kündigung hochladen, Ersteinschätzung in 24 Stunden erhalten. Alles digital.' },
              ].map((card) => (
                <div key={card.title} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">{card.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: '2.000+', label: 'Beratungen' },
                { value: '2.000+', label: 'Verfahren' },
                { value: '20+', label: 'Jahre Erfahrung' },
                { value: '5,0 \u2605', label: 'Bewertung' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-[#6B6626]">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 13. FAQ Accordion ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Häufige Fragen zur Kündigung nach {yl} Betriebszugehörigkeit
          </h2>
          <div className="max-w-[800px] faq-list">
            {yearData.faqs.map((faq, i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={i} className="border-b border-gray-200">
                  <button
                    className="w-full bg-transparent border-none cursor-pointer py-4 text-left flex items-start justify-between gap-4 hover:text-[#6B6626] transition-colors"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start gap-3">
                      {isOpen && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8B7A3A] mt-1.5 flex-shrink-0" />
                      )}
                      <span className="text-[15px] font-semibold text-gray-900">{faq.frage}</span>
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'}`}>
                    <p className="text-sm text-gray-600 leading-relaxed pl-5 sm:pl-[22px]">{faq.antwort}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 14. CTA #3 — dunkelgrün wie CTA #1 ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-[#6B6626] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Kündigung kostenlos prüfen lassen</p>
              <p className="text-white/70 text-sm">Ersteinschätzung in 24h &mdash; bundesweit und digital.</p>
            </div>
            <a
              href="/#kontakt"
              className="shrink-0 bg-white text-[#6B6626] px-6 py-3 rounded font-semibold text-sm no-underline hover:bg-gray-100 transition-colors"
            >
              Jetzt prüfen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 15. Interne Verlinkung ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="mb-3">
            <Link
              href="/kuendigung"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B6626] font-medium no-underline hover:underline"
            >
              &larr; Zurück zur Übersicht: Kündigung erhalten
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={`/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`}
              className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
            >
              <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Verwandtes Thema</p>
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Abfindung nach {yl} &rarr;</p>
              <p className="text-xs text-gray-500 mt-1">Tabelle, Rechner und Verhandlungstipps</p>
            </Link>
            <Link
              href={`/fristlose-kuendigung-nach-${entry.slug}-betriebszugehoerigkeit/`}
              className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
            >
              <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Verwandtes Thema</p>
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Fristlose Kündigung nach {yl} &rarr;</p>
              <p className="text-xs text-gray-500 mt-1">Sofortmaßnahmen und Ihre Rechte</p>
            </Link>
            {next ? (
              <Link
                href={`/gekuendigt-nach-${next.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Nächstes Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Gekündigt nach {next.year} Jahren &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Rechte und Abfindung im Vergleich</p>
              </Link>
            ) : prev ? (
              <Link
                href={`/gekuendigt-nach-${prev.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Vorheriges Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Gekündigt nach {prev.year === 1 ? '1 Jahr' : `${prev.year} Jahren`} &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Rechte und Abfindung im Vergleich</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* ═══ 16. Autor-Box ═══ */}
      <section className="py-3 px-4 sm:px-8">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-6 items-start max-md:flex-col max-md:items-center max-md:text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/Fatih.webp"
                alt={`Fachanwalt berät nach Kündigung mit ${entry.year} ${entry.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit`}
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">Fatih Bektas</p>
              <p className="text-sm text-[#8B7A3A] font-medium mb-3">Fachanwalt für Arbeitsrecht</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Zugelassen seit 2005, Fachanwalt für Arbeitsrecht seit 2011 (RAK Karlsruhe).
                Spezialisiert auf Kündigungsschutz, Abfindungsverhandlung und Aufhebungsverträge.
                Über 2.000 erfolgreich abgeschlossene Verfahren.
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>{' '}
                5,0 &middot; 68 Bewertungen auf anwalt.de
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
