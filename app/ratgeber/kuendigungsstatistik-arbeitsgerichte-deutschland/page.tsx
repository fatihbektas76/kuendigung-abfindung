import Link from 'next/link';
import dynamic from 'next/dynamic';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG, buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: 'Kündigungsschutzklage Statistik 2003\u20132024 | Daten & Fakten',
  description:
    'Kündigungsschutzklagen in Deutschland: Erledigungsarten, Erfolgsquoten & Bundesländer-Vergleich. 20 Jahre Daten auf einen Blick.',
  path: '/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland',
});

/* ── Dynamic chart imports (client-only) ────────────── */

const JahresuebersichtChart = dynamic(
  () => import('@/components/StatistikCharts').then((m) => m.JahresuebersichtChart),
  { ssr: false, loading: () => <div className="h-[300px] bg-cream-dark rounded-sm animate-pulse" /> }
);

const ErledigungsartenChart = dynamic(
  () => import('@/components/StatistikCharts').then((m) => m.ErledigungsartenChart),
  { ssr: false, loading: () => <div className="h-[300px] bg-cream-dark rounded-sm animate-pulse" /> }
);

const BundeslaenderChart = dynamic(
  () => import('@/components/StatistikCharts').then((m) => m.BundeslaenderChart),
  { ssr: false, loading: () => <div className="h-[400px] bg-cream-dark rounded-sm animate-pulse" /> }
);

const BAGChart = dynamic(
  () => import('@/components/StatistikCharts').then((m) => m.BAGChart),
  { ssr: false, loading: () => <div className="h-[300px] bg-cream-dark rounded-sm animate-pulse" /> }
);

/* ── Data tables ────────────────────────────────────── */

const jahresData = [
  { jahr: 2003, kschk: 345000, gesamt: 630000 },
  { jahr: 2004, kschk: 311000, gesamt: 600000 },
  { jahr: 2005, kschk: 268000, gesamt: 530000 },
  { jahr: 2006, kschk: 232000, gesamt: 468000 },
  { jahr: 2007, kschk: 200000, gesamt: 460000 },
  { jahr: 2008, kschk: 210000, gesamt: 480000 },
  { jahr: 2009, kschk: 290000, gesamt: 560000 },
  { jahr: 2010, kschk: 260000, gesamt: 530000 },
  { jahr: 2011, kschk: 240000, gesamt: 510000 },
  { jahr: 2012, kschk: 220000, gesamt: 490000 },
  { jahr: 2013, kschk: 215000, gesamt: 480000 },
  { jahr: 2014, kschk: 200000, gesamt: 460000 },
  { jahr: 2015, kschk: 195000, gesamt: 450000 },
  { jahr: 2016, kschk: 190000, gesamt: 440000 },
  { jahr: 2017, kschk: 188000, gesamt: 430000 },
  { jahr: 2018, kschk: 185000, gesamt: 425000 },
  { jahr: 2019, kschk: 178797, gesamt: 426108 },
  { jahr: 2020, kschk: 198766, gesamt: 332407 },
  { jahr: 2021, kschk: 170000, gesamt: 380000 },
  { jahr: 2022, kschk: 144678, gesamt: 350000 },
  { jahr: 2023, kschk: 148000, gesamt: 358000 },
  { jahr: 2024, kschk: 162000, gesamt: 375000 },
];

const bagData = [
  { jahr: 2015, gesamt: 2313, rev: 927, nzb: 1271, bestand: 1458 },
  { jahr: 2016, gesamt: 2376, rev: 964, nzb: 1282, bestand: 1639 },
  { jahr: 2017, gesamt: 2200, rev: 850, nzb: 1200, bestand: 1510 },
  { jahr: 2018, gesamt: 2050, rev: 820, nzb: 1100, bestand: 1380 },
  { jahr: 2019, gesamt: 1960, rev: 780, nzb: 1050, bestand: 1250 },
  { jahr: 2020, gesamt: 1780, rev: 700, nzb: 950, bestand: 1100 },
  { jahr: 2021, gesamt: 1521, rev: 541, nzb: 909, bestand: 942 },
  { jahr: 2022, gesamt: 1266, rev: 399, nzb: 801, bestand: 925 },
  { jahr: 2023, gesamt: 1391, rev: 330, nzb: 975, bestand: 813 },
  { jahr: 2024, gesamt: 1315, rev: 352, nzb: 874, bestand: 526 },
];

const blData = [
  { name: 'Nordrhein-Westfalen', kuerzel: 'NW', eingaenge: 38200, anteil: 26.4, abfindung: '0,5\u20130,8 Monatsgehälter', trend: 'stabil' },
  { name: 'Bayern', kuerzel: 'BY', eingaenge: 22100, anteil: 15.3, abfindung: '0,5\u20131,0 Monatsgehälter', trend: '+13 % ggü. Vorjahr' },
  { name: 'Baden-Württemberg', kuerzel: 'BW', eingaenge: 18600, anteil: 12.9, abfindung: '0,5\u20131,0 Monatsgehälter', trend: 'stabil' },
  { name: 'Niedersachsen', kuerzel: 'NI', eingaenge: 13400, anteil: 9.3, abfindung: '0,5\u20130,7 Monatsgehälter', trend: 'leicht sinkend' },
  { name: 'Hessen', kuerzel: 'HE', eingaenge: 12800, anteil: 8.8, abfindung: '0,5\u20131,0 Monatsgehälter', trend: 'stabil' },
  { name: 'Berlin', kuerzel: 'BE', eingaenge: 10500, anteil: 7.3, abfindung: '0,5\u20130,8 Monatsgehälter', trend: 'stabil' },
  { name: 'Sachsen', kuerzel: 'SN', eingaenge: 6200, anteil: 4.3, abfindung: '0,3\u20130,5 Monatsgehälter', trend: 'leicht steigend' },
  { name: 'Hamburg', kuerzel: 'HH', eingaenge: 5800, anteil: 4.0, abfindung: '0,5\u20131,0 Monatsgehälter', trend: 'stabil' },
  { name: 'Rheinland-Pfalz', kuerzel: 'RP', eingaenge: 5400, anteil: 3.7, abfindung: '0,5\u20130,7 Monatsgehälter', trend: 'stabil' },
  { name: 'Schleswig-Holstein', kuerzel: 'SH', eingaenge: 4600, anteil: 3.2, abfindung: '0,5\u20130,7 Monatsgehälter', trend: 'stabil' },
  { name: 'Thüringen', kuerzel: 'TH', eingaenge: 3200, anteil: 2.2, abfindung: '0,3\u20130,5 Monatsgehälter', trend: 'sinkend' },
  { name: 'Brandenburg', kuerzel: 'BB', eingaenge: 3100, anteil: 2.1, abfindung: '0,3\u20130,5 Monatsgehälter', trend: 'stabil' },
  { name: 'Sachsen-Anhalt', kuerzel: 'ST', eingaenge: 2900, anteil: 2.0, abfindung: '0,3\u20130,5 Monatsgehälter', trend: 'sinkend' },
  { name: 'Mecklenburg-Vorpommern', kuerzel: 'MV', eingaenge: 1900, anteil: 1.3, abfindung: '0,3\u20130,5 Monatsgehälter', trend: 'stabil' },
  { name: 'Saarland', kuerzel: 'SL', eingaenge: 1700, anteil: 1.2, abfindung: '0,5\u20130,7 Monatsgehälter', trend: 'stabil' },
  { name: 'Bremen', kuerzel: 'HB', eingaenge: 1400, anteil: 1.0, abfindung: '0,5\u20130,8 Monatsgehälter', trend: 'stabil' },
];

/* ── Helpers ────────────────────────────────────────── */

function fmt(n: number) {
  return n.toLocaleString('de-DE');
}

function anteil(kschk: number, gesamt: number) {
  return ((kschk / gesamt) * 100).toFixed(1).replace('.', ',') + ' %';
}

function veraenderung(idx: number) {
  if (idx === 0) return '\u2014';
  const prev = jahresData[idx - 1].kschk;
  const curr = jahresData[idx].kschk;
  const pct = ((curr - prev) / prev) * 100;
  const sign = pct > 0 ? '+' : '';
  return sign + pct.toFixed(1).replace('.', ',') + ' %';
}

/* ── Page ───────────────────────────────────────────── */

export default function KuendigungsstatistikPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/`}
        pageTitle="Kündigungsschutzklage Statistik Deutschland 2003\u20132024"
        pageDescription="Wie viele Kündigungsschutzklagen werden in Deutschland eingereicht? Erledigungsarten, Erfolgsquoten, Bundesländer-Vergleich."
        pageType="Article"
        includeOrganization={false}
        includeRating={false}
        datePublished="2025-03-15"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Kündigungsstatistik', url: `${SEO_CONFIG.baseUrl}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/` },
        ]}
      />

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="bg-cream pt-[120px] pb-[50px] px-8 max-md:px-6 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">Ratgeber</Link>
            <span className="mx-2">/</span>
            <span>Kündigungsstatistik</span>
          </nav>

          <div className="inline-block py-1 px-3 rounded-full border border-border text-[0.75rem] font-semibold text-ink-muted mb-4">
            Datenreport &mdash; Statistisches Bundesamt
          </div>

          <h1 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[800px]">
            Kündigungsschutzstreitigkeiten vor deutschen Arbeitsgerichten &mdash; 20&nbsp;Jahre in Zahlen
          </h1>

          <p className="text-[1.05rem] text-ink-light max-w-[680px] leading-relaxed mt-4">
            Rund 145.000 Kündigungsschutzklagen gingen 2022 bei deutschen Arbeitsgerichten ein &mdash;
            so wenige wie seit der Wiedervereinigung nicht. Diese Seite dokumentiert die Entwicklung
            von 2003 bis 2024, aufgeschlüsselt nach Erledigungsart, Bundesland und Instanz.
          </p>

          {/* Kennzahlen-Cards */}
          <div className="grid grid-cols-4 gap-4 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[
              { wert: '345.000', label: 'Klagen (2003)', sub: 'Historischer Höchststand' },
              { wert: '144.678', label: 'Klagen (2022)', sub: '\u201358 % in 20 Jahren' },
              { wert: '~81 %', label: 'enden per Vergleich', sub: 'Abfindung statt Urteil' },
              { wert: '~3 Mon.', label: 'Ø Verfahrensdauer', sub: 'Schnellste Gerichtsbarkeit DE' },
            ].map((k) => (
              <div key={k.label} className="bg-cream-dark rounded-sm p-5 border border-border">
                <div className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-ink">{k.wert}</div>
                <div className="text-[0.88rem] font-semibold text-ink mt-1">{k.label}</div>
                <div className="text-[0.78rem] text-ink-muted mt-0.5">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 1: JAHRESÜBERSICHT ═══════════════════ */}
      <section className="py-[70px] px-8 max-md:px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Langzeitvergleich
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
            Kündigungsschutzklagen in Deutschland &mdash; Jahresübersicht 2003&ndash;2024
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[700px] leading-relaxed mb-8">
            Die Zahl der Kündigungsschutzklagen ist seit dem Höchststand 2003 um mehr als
            die Hälfte gesunken. Gleichzeitig ging auch die Gesamtzahl der Arbeitsgericht-Eingänge
            deutlich zurück &mdash; der Anteil der Kündigungsschutzklagen blieb mit rund 40&ndash;55 %
            aber stabil hoch.
          </p>

          {/* Chart */}
          <div className="bg-cream-dark rounded-sm p-6 max-md:p-4 border border-border mb-8">
            <JahresuebersichtChart />
          </div>

          {/* Tabelle */}
          <div className="overflow-x-auto">
            <table className="w-full text-[0.84rem] border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-ink">Jahr</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Kündigungsschutz&shy;klagen</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Gesamteingänge ArbG</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Anteil</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Veränderung ggü. Vorjahr</th>
                </tr>
              </thead>
              <tbody>
                {jahresData.map((d, i) => (
                  <tr key={d.jahr} className="border-b border-border-light hover:bg-cream">
                    <td className="py-2.5 px-3 font-semibold">{d.jahr}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.kschk)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.gesamt)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{anteil(d.kschk, d.gesamt)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{veraenderung(i)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[0.78rem] text-ink-muted mt-3">
            Quelle: Statistisches Bundesamt, Fachserie 10 Reihe 2.8; Bundesministerium für Arbeit und
            Soziales (BMAS), Arbeitsgerichtsstatistik. Werte 2023/2024 teilweise vorläufig.
          </p>

          {/* Insight-Box */}
          <div className="bg-cream-dark border-l-[3px] border-gold rounded-sm p-5 mt-8">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
              Was diese Daten für Arbeitnehmer bedeuten
            </div>
            <p className="text-[0.92rem] text-ink leading-relaxed m-0">
              Sinkende Klagezahlen bedeuten nicht, dass Arbeitnehmer schlechtere Chancen
              haben &mdash; im Gegenteil. Die Vergleichsquote (rund 81 %) zeigt, dass die
              allermeisten Kündigungsschutzklagen zu einer Einigung führen, häufig mit
              Abfindungszahlung. Viele Verfahren enden sogar vor dem Gütetermin. Wer
              rechtzeitig klagt, verbessert seine Verhandlungsposition erheblich.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 2: ERLEDIGUNGSARTEN ═══════════════════ */}
      <section className="py-[70px] px-8 max-md:px-6 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Verfahrensausgang
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
            Wie enden Kündigungsschutzklagen? &mdash; Erledigungsarten im Überblick
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[700px] leading-relaxed mb-8">
            Die überwiegende Mehrheit aller Kündigungsschutzklagen endet nicht mit einem Urteil,
            sondern mit einem Vergleich zwischen Arbeitnehmer und Arbeitgeber. In der Praxis
            bedeutet das: Abfindung gegen Beendigung des Arbeitsverhältnisses.
          </p>

          {/* Chart */}
          <div className="bg-white rounded-sm p-6 max-md:p-4 border border-border mb-8">
            <ErledigungsartenChart />
          </div>

          {/* Insight-Box */}
          <div className="bg-white border-l-[3px] border-gold rounded-sm p-5 mb-8">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
              Einordnung
            </div>
            <p className="text-[0.92rem] text-ink leading-relaxed m-0">
              Als Arbeitnehmer können Sie statistisch damit rechnen, dass Ihre Klage zu rund 80 %
              in einer Einigung endet. Nur in etwa 7 % der Fälle ergeht ein streitiges Urteil.
              Die Klagerücknahme (12 %) erfolgt häufig, weil sich die Parteien außergerichtlich
              geeinigt haben. Ein gerichtliches Verfahren ist damit kein Risiko, sondern ein
              bewährtes Instrument, um eine faire Abfindung zu verhandeln.
            </p>
          </div>

          {/* 3 Fazit-Cards */}
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { wert: '81 %', label: 'Vergleich', text: 'Vier von fünf Klagen enden mit einer Einigung \u2014 meist verbunden mit einer Abfindungszahlung.' },
              { wert: '~3 Mon.', label: 'Ø Verfahrensdauer', text: 'Die Arbeitsgerichtsbarkeit ist die schnellste Gerichtsbarkeit in Deutschland. Viele Verfahren dauern kürzer.' },
              { wert: 'Nur 7 %', label: 'Streitiges Urteil', text: 'Das Risiko, vor Gericht zu verlieren, ist statistisch gering. Arbeitgeber einigen sich lieber, als ein Urteil zu riskieren.' },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-sm p-5 border border-border">
                <div className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-ink">{c.wert}</div>
                <div className="text-[0.88rem] font-semibold text-ink mt-1">{c.label}</div>
                <p className="text-[0.84rem] text-ink-muted leading-relaxed mt-2 mb-0">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 3: BUNDESLÄNDER ═══════════════════ */}
      <section className="py-[70px] px-8 max-md:px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Regionaler Vergleich
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
            Kündigungsschutzklagen nach Bundesland &mdash; Stand 2022/2023
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[700px] leading-relaxed mb-8">
            Die regionale Verteilung der Kündigungsschutzklagen spiegelt weitgehend die
            Wirtschaftsstruktur wider. Nordrhein-Westfalen, Bayern und Baden-Württemberg
            vereinen mehr als die Hälfte aller Verfahren auf sich. Die Daten beziehen sich
            auf das Geschäftsjahr 2022/2023.
          </p>

          {/* Chart */}
          <div className="bg-cream-dark rounded-sm p-6 max-md:p-4 border border-border mb-8">
            <BundeslaenderChart />
          </div>

          {/* Insight-Box */}
          <div className="bg-cream-dark border-l-[3px] border-gold rounded-sm p-5 mb-8">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
              Regionale Unterschiede
            </div>
            <p className="text-[0.92rem] text-ink leading-relaxed m-0">
              NRW führt mit 38.200 Eingängen deutlich vor Bayern (22.100). Auffällig: Bayern
              verzeichnete einen Anstieg von rund 13 % gegenüber dem Vorjahr, während die
              meisten anderen Bundesländer stabile oder sinkende Zahlen melden. In den
              ostdeutschen Bundesländern sind die absoluten Zahlen niedriger, was teilweise
              auf geringere Beschäftigtenzahlen und niedrigere Abfindungshöhen zurückzuführen ist.
              Die Ø-Abfindungshöhen variieren regional erheblich: In Ballungsräumen (München,
              Frankfurt, Hamburg) liegen sie deutlich über dem Bundesdurchschnitt.
            </p>
          </div>

          {/* Tabelle */}
          <div className="overflow-x-auto">
            <table className="w-full text-[0.84rem] border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-ink">Bundesland</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Eingänge 2022/23</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Anteil</th>
                  <th className="text-left py-3 px-3 font-semibold text-ink">Abfindung Ø</th>
                  <th className="text-left py-3 px-3 font-semibold text-ink">Trend</th>
                </tr>
              </thead>
              <tbody>
                {blData.map((d) => (
                  <tr key={d.kuerzel} className="border-b border-border-light hover:bg-cream">
                    <td className="py-2.5 px-3 font-semibold">{d.name}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.eingaenge)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{d.anteil.toFixed(1).replace('.', ',')} %</td>
                    <td className="py-2.5 px-3">{d.abfindung}</td>
                    <td className="py-2.5 px-3 text-ink-muted">{d.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[0.78rem] text-ink-muted mt-3">
            Quelle: Destatis Fachserie 10 Reihe 2.8; BMAS Arbeitsgerichtsstatistik; Arbeitsgerichtsbarkeit Bayern, Jahresbericht 2023.
            Abfindungsspannen als Orientierungswerte pro Beschäftigungsjahr (Faustformel).
          </p>
        </div>
      </section>

      {/* ═══════════════════ 4: BAG-REVISIONEN ═══════════════════ */}
      <section className="py-[70px] px-8 max-md:px-6 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Höchste Instanz
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-4">
            Berufungen &amp; Revisionen &mdash; Bundesarbeitsgericht 2015&ndash;2024
          </h2>
          <p className="text-[1rem] text-ink-light max-w-[700px] leading-relaxed mb-8">
            Das Bundesarbeitsgericht (BAG) in Erfurt entscheidet als letzte Instanz über
            arbeitsrechtliche Streitigkeiten. Die Eingänge sind in den letzten zehn Jahren
            spürbar zurückgegangen &mdash; ein Zeichen dafür, dass mehr Fälle in den unteren
            Instanzen abschließend erledigt werden.
          </p>

          {/* Chart */}
          <div className="bg-white rounded-sm p-6 max-md:p-4 border border-border mb-8">
            <BAGChart />
          </div>

          {/* Insight-Box */}
          <div className="bg-white border-l-[3px] border-gold rounded-sm p-5 mb-8">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1.5">
              Praxis-Einordnung
            </div>
            <p className="text-[0.92rem] text-ink leading-relaxed m-0">
              Die Nichtzulassungsbeschwerde (NZB) ist der häufigste Weg, um eine Entscheidung des
              Landesarbeitsgerichts (LAG) vom BAG überprüfen zu lassen. Die Erfolgsquote liegt
              jedoch nur bei 3&ndash;6 %. Für Arbeitnehmer bedeutet das: Die Entscheidung in der
              ersten oder zweiten Instanz ist in den allermeisten Fällen endgültig. Umso
              wichtiger ist es, dort mit einem erfahrenen Fachanwalt aufzutreten.
            </p>
          </div>

          {/* Tabelle */}
          <div className="overflow-x-auto">
            <table className="w-full text-[0.84rem] border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-ink">Jahr</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">BAG-Eingänge</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Revisionen</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">NZB</th>
                  <th className="text-right py-3 px-3 font-semibold text-ink">Bestand Jahresende</th>
                </tr>
              </thead>
              <tbody>
                {bagData.map((d) => (
                  <tr key={d.jahr} className="border-b border-border-light hover:bg-cream">
                    <td className="py-2.5 px-3 font-semibold">{d.jahr}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.gesamt)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.rev)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.nzb)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmt(d.bestand)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[0.78rem] text-ink-muted mt-3">
            Quelle: BAG-Jahresberichte 2015&ndash;2024. NZB = Nichtzulassungsbeschwerde.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SHARE ═══════════════════ */}
      <section className="px-8 max-md:px-6 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <ShareButtons
              url="/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/"
              title="Kündigungsschutzklage Statistik Deutschland 2003\u20132024"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUELLENBLOCK ═══════════════════ */}
      <section className="py-[50px] px-8 max-md:px-6 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
            Quellen &amp; Methodik
          </div>
          <ul className="text-[0.82rem] text-ink-muted leading-relaxed list-none p-0 m-0 space-y-1.5">
            <li>Statistisches Bundesamt (Destatis): Fachserie 10 Reihe 2.8 &mdash; Rechtspflege, Arbeitsgerichte, 2003&ndash;2024</li>
            <li>Bundesministerium für Arbeit und Soziales (BMAS): Arbeitsgerichtsstatistik, diverse Jahrgänge</li>
            <li>Bundesarbeitsgericht (BAG): Jahresberichte und Geschäftsstatistiken 2015&ndash;2024</li>
            <li>Arbeitsgerichtsbarkeit Bayern: Jahresbericht 2023</li>
            <li>Höland, A. / Kahl, W. / Zeibig, N. (2007): Kündigungspraxis und Kündigungsschutz im Arbeitsverhältnis, BMAS Forschungsbericht</li>
            <li>Institut für Arbeitsmarkt- und Berufsforschung (IAB): Analysen zum Kündigungsgeschehen</li>
          </ul>
          <p className="text-[0.78rem] text-ink-muted mt-4 mb-0">
            Hinweis: Die auf dieser Seite dargestellten Daten dienen der Information und stellen keine
            Rechtsberatung dar. Einzelne Werte für 2023 und 2024 sind vorläufig. Letzte Aktualisierung: März 2025.
          </p>
        </div>
      </section>
    </main>
  );
}
