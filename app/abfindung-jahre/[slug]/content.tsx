'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BetriebsEntry } from '@/lib/betriebszugehoerigkeit';

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

/* ── Simplified ESt calculation (§ 32a EStG 2025) ── */
function berechneEStFormula(zvE: number): number {
  if (zvE <= 11784) return 0;
  if (zvE <= 17005) {
    const y = (zvE - 11784) / 10000;
    return Math.floor((922.98 * y + 1400) * y);
  }
  if (zvE <= 66760) {
    const z = (zvE - 17005) / 10000;
    return Math.floor((181.19 * z + 2397) * z + 1025.38);
  }
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 10602.13);
  }
  return Math.floor(0.45 * zvE - 18936.88);
}

function berechneESt(einkommen: number, steuerklasse: number): number {
  if (steuerklasse === 3) return berechneEStFormula(einkommen / 2) * 2;
  return berechneEStFormula(einkommen);
}

/* ── Component ── */
export default function AbfindungJahreContent({ entry, prev, next, yearData }: Props) {
  const [gehalt, setGehalt] = useState(3500);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [abfindungSlider, setAbfindungSlider] = useState(15000);
  const [einkommenSlider, setEinkommenSlider] = useState(40000);
  const [steuerklasse, setSteuerklasse] = useState(1);

  const y = entry.year;
  const yl = y === 1 ? '1 Jahr' : `${y} Jahren`;
  const ylKurz = y === 1 ? '1 Jahr' : `${y} Jahre`;

  /* Tax calculations */
  const steuerOhne = Math.max(0, berechneESt(einkommenSlider + abfindungSlider, steuerklasse) - berechneESt(einkommenSlider, steuerklasse));
  const steuerMit = Math.max(0, 5 * (berechneESt(einkommenSlider + abfindungSlider / 5, steuerklasse) - berechneESt(einkommenSlider, steuerklasse)));
  const ersparnis = Math.max(0, steuerOhne - steuerMit);

  return (
    <main className="pb-20">
      {/* ═══ 1. H1 + Intro + Badges ═══ */}
      <section className="bg-white pt-[120px] pb-8 px-4 sm:px-8 border-b border-gray-200 mb-3">
        <div className="max-w-content mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="text-[#8B7A3A] no-underline hover:underline">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/abfindung" className="text-[#8B7A3A] no-underline hover:underline">Abfindung</Link>
            <span className="mx-2">/</span>
            <span>Abfindung nach {yl}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#6B6626] mb-4 leading-tight max-w-[750px]">
            Abfindung nach {entry.word} {y === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit &mdash; wie viel steht mir zu?
          </h1>
          <p className="text-lg text-gray-600 max-w-[680px] leading-relaxed mb-6">
            Nach {yl} Betriebszugehörigkeit berechnet sich die Abfindung nach der Faustformel:
            0,5 &times; Bruttomonatsgehalt &times; {ylKurz}. Einen gesetzlichen Anspruch auf Abfindung gibt es
            grundsätzlich nicht &mdash; die Abfindung wird in der Praxis fast immer im Rahmen einer
            Kündigungsschutzklage verhandelt.
          </p>

          <div className="flex flex-wrap gap-3">
            {['Fachanwalt für Arbeitsrecht', 'Kostenlose Ersteinschätzung', 'Antwort in 24h'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700">
                <svg width="14" height="14" fill="none" stroke="#6B6626" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. Fakten-Box (2×2 Grid) ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto bg-gray-50 rounded-lg p-4 fakt-box">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Abfindungsformel', value: `0,5 × Gehalt × ${y}`, desc: 'Faustformel — kein gesetzlicher Anspruch' },
              { label: 'Gesetzlicher Anspruch', value: 'Nein', desc: 'Nur bei § 1a KSchG-Angebot oder Vergleich' },
              { label: 'Typischer Faktor', value: '0,5 – 1,5×', desc: 'Je nach Fehler und Verhandlungsstärke' },
              { label: 'Klagefrist', value: '3 Wochen', desc: 'Ab Zugang — Klage schafft Verhandlungsmacht' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="h-[2.5px] bg-[#8B7A3A]" />
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{fact.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2 abfindung-formel">{fact.value}</p>
                  <p className="text-sm text-gray-600">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. CTA #1 — dunkelgrün ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-[#6B6626] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Abfindung kostenlos berechnen lassen</p>
              <p className="text-white/70 text-sm">Ersteinschätzung in 24h &mdash; wir prüfen Ihren Anspruch.</p>
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

      {/* ═══ 4. Wann entsteht Abfindungsanspruch? ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Wann entsteht ein Abfindungsanspruch nach {yl} Betriebszugehörigkeit?
            </h2>

            {/* Red left bar warning */}
            <div className="border-l-4 border-red-700 bg-white rounded-r-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Kein automatischer Anspruch nach &sect; 1a KSchG:</strong> Ein gesetzlicher Abfindungsanspruch
                entsteht nur, wenn der Arbeitgeber in der Kündigung ausdrücklich eine Abfindung anbietet &mdash;
                und der Arbeitnehmer keine Klage erhebt. In der Praxis kommt dies selten vor.
              </p>
            </div>

            {/* 2×2 Grid mit goldenem linken Balken */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Fehler in der Kündigung', desc: 'Formfehler, falsche Fristen oder fehlerhafte Sozialauswahl geben Ihnen Verhandlungsmacht für eine Abfindung.' },
                { title: 'Kündigungsschutzklage', desc: 'Das wichtigste Instrument: Über 80 % aller Klagen enden mit einem Vergleich — und damit einer Abfindung.' },
                { title: 'Einvernehmliche Einigung', desc: 'Aufhebungsvertrag oder gerichtlicher Vergleich — hier wird die Abfindungshöhe direkt verhandelt.' },
                { title: 'Sonderkündigungsschutz', desc: 'Schwangerschaft, Schwerbehinderung, Betriebsrat — besonderer Schutz stärkt Ihre Verhandlungsposition erheblich.' },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-[#8B7A3A] bg-gray-50 rounded-r-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. Abfindungsrechner (Slider) ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Abfindungsrechner &mdash; {ylKurz} Betriebszugehörigkeit
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Verschieben Sie den Regler. Jahre sind fest auf {y} gesetzt.
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

      {/* ═══ 6. Abfindungstabelle ═══ */}
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

      {/* ═══ 7. CTA #2 — dezent, goldener linker Balken ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-[#8B7A3A] bg-white border-y border-r border-gray-200 rounded-r-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Wie viel Abfindung ist in Ihrem Fall realistisch?</p>
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

      {/* ═══ 8. Verhandlungstipps ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Wie maximieren Sie Ihre Abfindung nach {yl} Betriebszugehörigkeit?
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Kündigungsschutzklage einreichen', desc: 'Die Klage ist das wichtigste Druckmittel. Ohne Klage hat der Arbeitgeber keinen Anlass, eine Abfindung zu zahlen. Über 80 % der Verfahren enden mit einem Vergleich.' },
                { title: 'Formfehler identifizieren', desc: 'Fehlende Betriebsratsanhörung, falsche Kündigungsfrist, mangelhafte Sozialauswahl — jeder Fehler erhöht Ihre Verhandlungsposition und damit die Abfindungshöhe.' },
                { title: 'Nicht zu früh einigen', desc: 'Der erste Abfindungsvorschlag des Arbeitgebers liegt fast immer unter dem, was tatsächlich erreichbar ist. Lassen Sie sich anwaltlich beraten, bevor Sie unterschreiben.' },
                { title: 'Zeugnis mitverhandeln', desc: 'Neben der Abfindung sollten Sie ein qualifiziertes Arbeitszeugnis (Note „gut" oder „sehr gut"), Freistellung und Resturlaubsabgeltung mitverhandeln.' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#8B7A3A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{tip.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. Steuer-Block ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-[#8B7A3A] bg-gray-50 rounded-r-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Muss ich die Abfindung versteuern?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Ja, Abfindungen sind einkommensteuerpflichtig. Sozialversicherungsbeiträge (Renten-, Kranken-, Pflege-
              und Arbeitslosenversicherung) fallen dagegen nicht an. Mit der Fünftelregelung (&sect; 34 EStG) können
              Sie die Steuerlast erheblich senken.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { title: 'Ohne Fünftelregelung', desc: 'Die Abfindung wird zum Jahreseinkommen addiert — durch die Steuerprogression fällt ein überproportional hoher Steuersatz an.' },
                { title: 'Mit Fünftelregelung', desc: 'Die Abfindung wird rechnerisch auf 5 Jahre verteilt (§ 34 EStG). Dadurch fällt die Steuerlast deutlich geringer aus.' },
                { title: 'Sozialversicherung', desc: 'Abfindungen sind sozialversicherungsfrei — keine Abzüge für Rente, Krankenkasse, Pflege oder Arbeitslosenversicherung.' },
                { title: 'Auszahlungszeitpunkt', desc: 'Wird die Abfindung in ein Jahr mit geringerem Einkommen verschoben (z.B. nach Beschäftigungsende), sinkt die Steuerbelastung.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Amber warning */}
            <div className="border-l-4 border-amber-500 bg-white rounded-r-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Wichtig ab 2025:</strong> Fünftelregelung muss selbst beantragt werden &mdash;
                seit 01.01.2025 wendet der Arbeitgeber die Fünftelregelung beim Lohnsteuerabzug nicht mehr
                automatisch an. Geltendmachung über Einkommensteuererklärung beim Finanzamt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10. Steuerrechner ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Steuerrechner für Abfindungen</h2>
            <p className="text-sm text-gray-500 mb-4">
              Schätzen Sie die Steuerbelastung Ihrer Abfindung &mdash; mit und ohne Fünftelregelung.
            </p>

            {/* Abfindung slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Abfindungshöhe</label>
                <span className="text-sm font-bold text-[#6B6626]">{fmtPlain(abfindungSlider)} &euro;</span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={abfindungSlider}
                onChange={(e) => setAbfindungSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B7A3A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>500 &euro;</span>
                <span>50.000 &euro;</span>
              </div>
            </div>

            {/* Jahreseinkommen slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Jahreseinkommen (ohne Abfindung)</label>
                <span className="text-sm font-bold text-[#6B6626]">{fmtPlain(einkommenSlider)} &euro;</span>
              </div>
              <input
                type="range"
                min={15000}
                max={120000}
                step={1000}
                value={einkommenSlider}
                onChange={(e) => setEinkommenSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B7A3A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>15.000 &euro;</span>
                <span>120.000 &euro;</span>
              </div>
            </div>

            {/* Steuerklasse dropdown */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Steuerklasse</label>
              <select
                value={steuerklasse}
                onChange={(e) => setSteuerklasse(Number(e.target.value))}
                className="py-2.5 px-4 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-[#8B7A3A]"
              >
                <option value={1}>Steuerklasse 1</option>
                <option value={3}>Steuerklasse 3</option>
                <option value={4}>Steuerklasse 4</option>
              </select>
            </div>

            {/* Ergebnis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold text-red-800 uppercase tracking-wide mb-1">Ohne Fünftelregelung</p>
                <p className="text-2xl font-bold text-red-800">{fmt(steuerOhne)}</p>
                <p className="text-xs text-red-600 mt-1">Steuer auf die Abfindung</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-1">Mit Fünftelregelung</p>
                <p className="text-2xl font-bold text-green-800">{fmt(steuerMit)}</p>
                <p className="text-xs text-green-600 mt-1">Steuer auf die Abfindung</p>
              </div>
            </div>

            {ersparnis > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center mb-3">
                <p className="text-sm text-gray-700">
                  Ihre Ersparnis durch die Fünftelregelung: <strong className="text-[#6B6626]">{fmt(ersparnis)}</strong>
                </p>
              </div>
            )}

            <p className="text-xs text-gray-400">
              Schätzwerte &mdash; kein Steuerberater. Ab 2025: Fünftelregelung selbst beantragen über die Einkommensteuererklärung.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 11. ALG-Block ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="border-l-4 border-green-600 bg-white rounded-r-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-1">Wird die Abfindung auf das Arbeitslosengeld angerechnet?</p>
              <p className="text-sm text-gray-700">
                <strong>Grundsätzlich nein</strong> &mdash; eine Abfindung aus einem Kündigungsschutzverfahren wird
                nicht auf das Arbeitslosengeld I angerechnet.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { title: 'Klage → Abfindung', desc: 'Wird die Abfindung im Rahmen einer Kündigungsschutzklage (Vergleich) gezahlt, erfolgt keine Anrechnung auf das ALG I.' },
                { title: 'Sperrzeit bei Aufhebungsvertrag', desc: 'Bei einem Aufhebungsvertrag kann die Agentur für Arbeit eine Sperrzeit von bis zu 12 Wochen verhängen — kein ALG in dieser Zeit.' },
                { title: 'Ruhenszeitraum § 158 SGB III', desc: 'Wird die ordentliche Kündigungsfrist nicht eingehalten, kann das ALG für die Dauer der verkürzten Frist ruhen.' },
                { title: 'Einfluss auf ALG-Berechnung', desc: 'Die Abfindung selbst beeinflusst die Höhe des ALG I nicht — dieses berechnet sich aus dem letzten Nettoeinkommen.' },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Red warning box */}
            <div className="border-l-4 border-red-700 bg-white rounded-r-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Aufhebungsvertrag niemals ohne anwaltliche Prüfung unterschreiben.</strong> Neben der Sperrzeit
                drohen Verlust des Kündigungsschutzes, ungünstige Abfindungshöhe und nachteilige Klauseln.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 12. Beispielsfall ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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

            {/* Ergebnis-Banner */}
            <div className="bg-green-50 border border-green-200 mx-4 mb-4 rounded-lg px-4 py-3 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-green-800 font-medium">Ergebnis: Abfindung</p>
                <p className="text-2xl font-bold text-green-800">{fmt(yearData.beispielsfall.ergebnis)}</p>
              </div>
              <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                Erfolgreich abgeschlossen
              </span>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                * Anonymisierter Mandantenfall. Jeder Fall ist individuell &mdash; Ergebnisse können abweichen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 13. FAQ Accordion ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Häufige Fragen zur Abfindung nach {yl} Betriebszugehörigkeit
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
              <p className="text-white font-semibold text-lg mb-1">Abfindung kostenlos prüfen lassen</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={`/gekuendigt-nach-${entry.slug}-betriebszugehoerigkeit/`}
              className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
            >
              <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Verwandtes Thema</p>
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Gekündigt nach {yl} &rarr;</p>
              <p className="text-xs text-gray-500 mt-1">Sofortmaßnahmen und Ihre Rechte</p>
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
                href={`/abfindung-nach-${next.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Nächstes Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Abfindung nach {next.year} Jahren &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Tabelle, Rechner und Verhandlungstipps</p>
              </Link>
            ) : prev ? (
              <Link
                href={`/abfindung-nach-${prev.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Vorheriges Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Abfindung nach {prev.year === 1 ? '1 Jahr' : `${prev.year} Jahren`} &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Tabelle, Rechner und Verhandlungstipps</p>
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
                src="/Fatih.png"
                alt="Fatih Bektas — Fachanwalt für Arbeitsrecht"
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
