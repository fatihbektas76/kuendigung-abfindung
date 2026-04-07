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
  kuendigungsgrund: string;
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

/* ── Component ── */
export default function FristlosContent({ entry, prev, next, yearData }: Props) {
  const [gehalt, setGehalt] = useState(3500);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const y = entry.year;
  const yl = y === 1 ? '1 Jahr' : `${y} Jahren`;
  const ylKurz = y === 1 ? '1 Jahr' : `${y} Jahre`;

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
            <span>Fristlose Kündigung nach {yl}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#6B6626] mb-4 leading-tight max-w-[750px]">
            Fristlose Kündigung nach {entry.word} {y === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit &mdash; wirksam oder nicht?
          </h1>
          <p className="text-lg text-gray-600 max-w-[680px] leading-relaxed mb-6">
            Über 80 % aller fristlosen Kündigungen sind unwirksam. Nach &sect; 626 BGB müssen drei Voraussetzungen
            gleichzeitig erfüllt sein: ein wichtiger Grund, eine vorherige Abmahnung (in den meisten Fällen) und
            die Einhaltung der 2-Wochen-Ausschlussfrist. Fehlt auch nur eine Voraussetzung, ist die Kündigung
            angreifbar &mdash; und Ihre Abfindungschancen steigen erheblich.
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
              { label: 'Klagefrist Arbeitnehmer', value: '3 Wochen', desc: 'Ab Zugang (§ 4 KSchG) — auch bei fristloser Kündigung absolut' },
              { label: 'Ausschlussfrist Arbeitgeber', value: '2 Wochen', desc: 'Ab Kenntnis des Grundes (§ 626 Abs. 2 BGB) — danach automatisch unwirksam' },
              { label: 'Unwirksame Kündigungen', value: 'Über 80 %', desc: 'Scheitern an fehlendem Grund, fehlender Abmahnung oder Formfehler' },
              { label: 'Abmahnung erforderlich', value: 'Meist ja', desc: 'Verhaltensbedingte Kündigung ohne Abmahnung fast immer unwirksam' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="h-[2.5px] bg-[#8B7A3A]" />
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{fact.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{fact.value}</p>
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
              <p className="text-white font-semibold text-lg mb-1">Fristlose Kündigung kostenlos prüfen lassen</p>
              <p className="text-white/70 text-sm">Ersteinschätzung in 24h &mdash; über 80 % sind unwirksam.</p>
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

      {/* ═══ 4. Wirksamkeitsvoraussetzungen ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Wirksamkeitsvoraussetzungen der fristlosen Kündigung
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { title: '1. Wichtiger Grund (§ 626 BGB)', desc: 'Es muss ein Sachverhalt vorliegen, der die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der ordentlichen Kündigungsfrist unzumutbar macht.' },
                { title: '2. Interessenabwägung', desc: `Die Interessen beider Seiten müssen abgewogen werden. Nach ${yl} wird ein strenger Maßstab angelegt — die lange beanstandungsfreie Tätigkeit wiegt schwer.` },
                { title: '3. 2-Wochen-Ausschlussfrist', desc: 'Die Kündigung muss innerhalb von 2 Wochen nach Kenntnis des Grundes erklärt werden (§ 626 Abs. 2 BGB). Danach ist sie automatisch unwirksam.' },
                { title: '4. Abmahnung (meist erforderlich)', desc: 'Bei verhaltensbedingten Gründen muss in der Regel vorher abgemahnt werden. Nur bei schweren Pflichtverletzungen kann die Abmahnung entfallen.' },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-[#8B7A3A] bg-gray-50 rounded-r-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Grüne Statistik-Zeile */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-green-800">
                80 %+ aller fristlosen Kündigungen sind unwirksam &mdash; prüfen Sie Ihre jetzt kostenlos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. Wirksame vs. Unwirksame Gründe ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Wirksame vs. unwirksame Gründe für eine fristlose Kündigung
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Wirksame Gründe — roter Balken */}
              <div className="border-l-4 border-red-700 bg-gray-50 rounded-r-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Mögliche wirksame Gründe</p>
                <ul className="space-y-2">
                  {[
                    'Diebstahl oder Unterschlagung',
                    'Schwere Beleidigung oder Bedrohung',
                    'Straftaten am Arbeitsplatz',
                    'Beharrliche Arbeitsverweigerung nach Abmahnung',
                    'Schwere Verschwiegenheitspflichtverletzung',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">&#10007;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unwirksame Gründe — grüner Balken */}
              <div className="border-l-4 border-green-600 bg-gray-50 rounded-r-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Häufige Unwirksamkeitsgründe</p>
                <ul className="space-y-2">
                  {[
                    'Keine vorherige Abmahnung',
                    '2-Wochen-Frist des Arbeitgebers versäumt',
                    'Fehlende Schriftform der Kündigung',
                    'Fehlerhafte Betriebsratsanhörung',
                    'Grund nicht schwerwiegend genug',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. Abmahnungserfordernis ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-[#8B7A3A] bg-gray-50 rounded-r-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ist eine Abmahnung vor der fristlosen Kündigung nötig?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              In den meisten Fällen ja. Der Arbeitnehmer muss die Möglichkeit erhalten, sein Verhalten zu ändern.
              Nur bei besonders schweren Vertrauensbrüchen kann die Abmahnung entfallen.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Abmahnung nötig', desc: 'Bei verhaltensbedingten Gründen wie Verspätung, mangelhafter Arbeitsleistung, Verstößen gegen Betriebsordnung.' },
                { title: 'Keine Abmahnung nötig', desc: 'Nur bei schweren Straftaten, Diebstahl, schwerer Körperverletzung, Bestechung — wenn das Vertrauen unwiederbringlich zerstört ist.' },
                { title: `Nach ${yl} Betriebszugehörigkeit`, desc: `Je länger die Betriebszugehörigkeit, desto strenger die Anforderungen an den Arbeitgeber. Nach ${yl} beanstandungsfreier Tätigkeit wiegt eine fehlende Abmahnung besonders schwer.` },
                { title: 'Entscheidend', desc: 'Liegt keine wirksame Abmahnung vor, ist die fristlose Kündigung in der Regel unwirksam — unabhängig davon, ob der Vorwurf zutrifft.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. 2-Wochen-Ausschlussfrist ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-red-700 bg-gray-50 rounded-r-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2-Wochen-Ausschlussfrist (&sect; 626 Abs. 2 BGB)</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Der Arbeitgeber muss die fristlose Kündigung innerhalb von 2 Wochen nach Kenntnis des
              Kündigungsgrundes aussprechen. Wird diese Frist überschritten, ist die fristlose Kündigung
              automatisch unwirksam &mdash; selbst bei einem an sich ausreichenden Grund.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: '1', title: 'Kenntniserlangung', desc: 'Der Arbeitgeber erfährt vom Kündigungsgrund. Ab diesem Zeitpunkt beginnt die 2-Wochen-Frist zu laufen.' },
                { step: '2', title: '2 Wochen Frist', desc: 'Der Arbeitgeber muss in dieser Zeit die fristlose Kündigung erklären, inklusive Betriebsratsanhörung.' },
                { step: '3', title: 'Frist versäumt', desc: 'Wird die Frist überschritten, ist die fristlose Kündigung automatisch unwirksam — kein Ermessensspielraum.' },
              ].map((item) => (
                <div key={item.step} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center text-xs font-bold mb-2 flex-shrink-0">
                    {item.step}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. Sofortmaßnahmen ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Was Sie nach fristloser Kündigung nach {yl} Betriebszugehörigkeit sofort tun müssen
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Datum notieren', desc: 'Notieren Sie sofort das exakte Datum des Zugangs der Kündigung. Ab diesem Tag läuft die 3-Wochen-Frist für die Kündigungsschutzklage (§ 4 KSchG).' },
                { title: 'Schriftlich widersprechen', desc: 'Widersprechen Sie der fristlosen Kündigung schriftlich. Dokumentieren Sie, dass Sie die Vorwürfe bestreiten und zur Weiterarbeit bereit sind.' },
                { title: 'Nichts unterschreiben', desc: 'Unterschreiben Sie weder die Kündigung noch einen Aufhebungsvertrag. Lassen Sie sich nicht unter Druck setzen — Sie haben Rechte.' },
                { title: 'Sofort Anwalt kontaktieren', desc: `Kontaktieren Sie umgehend einen Fachanwalt für Arbeitsrecht. Bei fristloser Kündigung nach ${yl} prüfen wir kostenlos: wichtiger Grund, Abmahnung, 2-Wochen-Frist.` },
                { title: 'Arbeitssuchend melden', desc: 'Melden Sie sich innerhalb von 3 Tagen bei der Agentur für Arbeit arbeitssuchend, um eine Sperrzeit beim Arbeitslosengeld zu vermeiden.' },
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

      {/* ═══ 9. CTA #2 — dezent, goldener linker Balken ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="border-l-4 border-[#8B7A3A] bg-white border-y border-r border-gray-200 rounded-r-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Fristlose Kündigung jetzt prüfen lassen</p>
              <p className="text-sm text-gray-500">Über 80 % sind unwirksam &mdash; wir prüfen Ihren Fall kostenlos.</p>
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

      {/* ═══ 10. Abfindungsrechner (Slider) ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Abfindungsrechner &mdash; {ylKurz} Betriebszugehörigkeit
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Wird die fristlose Kündigung als unwirksam erkannt, entsteht erhebliche Verhandlungsmacht.
              In den meisten Fällen wird eine Abfindung im Vergleich vereinbart.
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
              * Erfahrungswerte. Kein Rechtsanspruch. Jahre fest auf {y} gesetzt.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 11. Beispielsfall ═══ */}
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
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{yearData.beispielsfall.kuendigungsgrund}</span>
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
                <p className="text-sm text-green-800 font-medium">Ergebnis: Abfindung + Zeugnis</p>
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
          <p className="text-xs text-gray-400 mt-2 italic">* Fiktives Fallbeispiel zur Veranschaulichung. Alle Namen und Angaben sind frei erfunden.</p>
        </div>
      </section>

      {/* ═══ 12. FAQ Accordion ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Häufige Fragen zur fristlosen Kündigung nach {yl} Betriebszugehörigkeit
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

      {/* ═══ 13. CTA #3 — dunkelgrün wie CTA #1 ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="bg-[#6B6626] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Fristlose Kündigung kostenlos prüfen lassen</p>
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

      {/* ═══ 14. Interne Verlinkung ═══ */}
      <section className="py-3 px-4 sm:px-8 mb-3">
        <div className="max-w-content mx-auto">
          <div className="mb-3">
            <Link
              href="/fristlose-kuendigung"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B6626] font-medium no-underline hover:underline"
            >
              &larr; Zurück zur Übersicht: Fristlose Kündigung
            </Link>
          </div>
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
              href={`/abfindung-nach-${entry.slug}-betriebszugehoerigkeit/`}
              className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
            >
              <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Verwandtes Thema</p>
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Abfindung nach {yl} &rarr;</p>
              <p className="text-xs text-gray-500 mt-1">Tabelle, Rechner und Verhandlungstipps</p>
            </Link>
            {next ? (
              <Link
                href={`/fristlose-kuendigung-nach-${next.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Nächstes Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Fristlose Kündigung nach {next.year} Jahren &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Rechte und Abfindung im Vergleich</p>
              </Link>
            ) : prev ? (
              <Link
                href={`/fristlose-kuendigung-nach-${prev.slug}-betriebszugehoerigkeit/`}
                className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
              >
                <p className="text-xs font-semibold text-[#8B7A3A] uppercase tracking-wide mb-1">Vorheriges Jahr</p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626]">Fristlose Kündigung nach {prev.year === 1 ? '1 Jahr' : `${prev.year} Jahren`} &rarr;</p>
                <p className="text-xs text-gray-500 mt-1">Rechte und Abfindung im Vergleich</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* ═══ 15. Autor-Box ═══ */}
      <section className="py-3 px-4 sm:px-8">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-6 items-start max-md:flex-col max-md:items-center max-md:text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/Fatih.webp"
                alt={`Fachanwalt prüft fristlose Kündigung nach ${entry.year} ${entry.year === 1 ? 'Jahr' : 'Jahren'}`}
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
