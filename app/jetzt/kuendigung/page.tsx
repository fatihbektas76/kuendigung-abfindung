import type { Metadata } from 'next';
import Image from 'next/image';
import LandingTopbar from '@/components/landing/LandingTopbar';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingShortForm from '@/components/landing/LandingShortForm';
import LandingStickyCall from '@/components/landing/LandingStickyCall';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import { SEO_CONFIG } from '@/lib/seo-config';

/**
 * Werbe-Landing-Page V2 für Arbeitnehmer mit frischer Kündigung.
 *
 * Design-Grundlage: oikon-Referenzanalyse + Benchmark-Studien (Unbounce 2025,
 * NP Digital Form Fields 2024, CXL Social Proof, NextAfter Countdown Tests,
 * WordStream Legal Benchmarks). Hebelwirkung-Reihenfolge:
 *   1. Single-primary CTA statt 3-Wege-Cluster (+29 % relativ)
 *   2. 3-Feld-Formular (Peak-Conversion-Range)
 *   3. Live-Fristen-Einschätzung nach § 193 BGB (echter Deadline-Hebel)
 *   4. Sticky Mobile Call-Bar (88 % Legal-Traffic kommt mobil)
 *   5. Zeitzusage „2 Stunden werktags 9–18" wiederholt im Flow
 *   6. Ort NICHT im Hero — nur in Impressum/Footer
 *   7. Echte Testimonials (anwalt.de bis Mandanten-Zitate vorliegen)
 */

export const metadata: Metadata = {
  title: 'Kündigung erhalten? Fachanwalt ruft in 2 Stunden zurück',
  description:
    'Kündigung bekommen? Fachanwalt für Arbeitsrecht Fatih Bektas meldet sich innerhalb von 2 Stunden werktags. Kostenlose Ersteinschätzung. 3-Wochen-Klagefrist beachten.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SEO_CONFIG.baseUrl}/jetzt/kuendigung/` },
  openGraph: {
    title: 'Kündigung erhalten? Fachanwalt ruft in 2 Stunden zurück',
    description:
      'Fachanwalt für Arbeitsrecht. Kostenlose Ersteinschätzung — Rückruf in 2 Stunden werktags 9–18 Uhr.',
    type: 'website',
  },
};

const VARIANT = 'kuendigung' as const;

/**
 * Rechenbeispiele für den Abfindungs-Vergleich.
 * Faustformel: Faktor 0,5 × Monatsbrutto × Jahre Betriebszugehörigkeit.
 * Mit anwaltlicher Verhandlung sind Faktoren von 0,75–1,25 realistisch,
 * bei stark angreifbaren Kündigungen auch mehr. Alle Werte sind Beispiele —
 * im sichtbaren Text steht der entsprechende Disclaimer.
 */
const calcExamples = [
  { label: 'Berufseinsteiger', salary: 3800, years: 3 },
  { label: 'Fachkraft, Mitte 30', salary: 4800, years: 8 },
  { label: 'Senior-Position', salary: 6500, years: 15 },
] as const;

/**
 * Prozess-Schritte für die Beratung.
 * Ziel: Transparenz schaffen, Kostenangst nehmen, den „Was passiert als Nächstes?"
 * -Frage-Reflex der Mandanten direkt beantworten.
 */
const prozessSteps = [
  {
    nr: 1,
    title: 'Sie melden sich',
    text: 'Formular (3 Angaben) oder Anruf — beides kostenlos und unverbindlich. Sie entscheiden den Weg.',
    duration: '2 Minuten',
  },
  {
    nr: 2,
    title: 'Rückruf in 2 Stunden',
    text: 'Fatih Bektas meldet sich persönlich (werktags 9–18 Uhr). Erstgespräch 15–30 Minuten — Einschätzung Ihrer Erfolgsaussichten.',
    duration: 'noch am selben Tag',
  },
  {
    nr: 3,
    title: 'Kostenangebot vor Mandat',
    text: 'Bevor wir tätig werden: transparente Kostenstruktur (RVG, Pauschale oder Rechtsschutz-Klärung). Kein Mandat ohne Ihre ausdrückliche Beauftragung.',
    duration: 'unverbindlich',
  },
  {
    nr: 4,
    title: 'Klage + Verhandlung',
    text: 'Fristgerechte Klageeinreichung beim Arbeitsgericht, danach Verhandlung über Abfindung und Konditionen. Viele Fälle enden im Gütetermin.',
    duration: 'ca. 4–12 Wochen bis Gütetermin',
  },
] as const;

export default function LandingKuendigungV2() {
  return (
    <>
      <LandingTopbar variant={VARIANT} />

      <main className="mx-auto max-w-[1180px] px-5 pb-28 pt-8 md:px-6 md:pt-14 md:pb-16">
        {/* ─────────── HERO ─────────── */}
        <section className="grid items-start gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <div>
            {/* Fristen-Badge (echte Deadline, Loss-Framing) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-red-700">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" aria-hidden="true" />
              3 Wochen Klagefrist nach § 4 KSchG
            </div>

            {/* Message-Match H1 */}
            <h1 className="mt-4 font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.06] text-ink">
              Kündigung erhalten?
              <br />
              <span className="text-[#6B6626]">Fachanwalt ruft in 2 Stunden zurück.</span>
            </h1>

            {/* Loss-Frame-Sub-Headline */}
            <p className="mt-5 max-w-[540px] text-[1.05rem] leading-relaxed text-ink-light">
              Ohne Klage binnen 3 Wochen verfallen Ihre Ansprüche auf
              Weiterbeschäftigung und Abfindung — endgültig. Fatih Bektas,
              Fachanwalt für Arbeitsrecht, prüft Ihren Fall kostenlos und
              meldet sich noch heute (werktags 9–18 Uhr).
            </p>

            {/* Trust-Zeile mit konkreten Signalen, Ort NICHT dabei */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-ink-light">
              <li className="inline-flex items-center gap-1.5">
                <span className="text-[#BA7517]" aria-hidden="true">★★★★★</span>
                <strong className="text-ink">5,0</strong>
                <span className="text-ink-muted">· 69 Bewertungen anwalt.de</span>
              </li>
              <li className="h-3 w-px bg-black/15" aria-hidden="true" />
              <li>Fachanwalt für Arbeitsrecht seit 2011</li>
              <li className="h-3 w-px bg-black/15" aria-hidden="true" />
              <li>Zugelassen RAK Karlsruhe</li>
            </ul>

            {/* Fatih-Vorstellung – groß, prominent, nicht Aside */}
            <div className="mt-8 flex items-start gap-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm md:items-center">
              <Image
                src="/Fatih.webp"
                alt="Fatih Bektas, Fachanwalt für Arbeitsrecht"
                width={88}
                height={88}
                className="h-[88px] w-[88px] shrink-0 rounded-full border-2 border-[#d4c98a] object-cover"
                priority
              />
              <div>
                <div className="font-serif text-[1.15rem] font-semibold text-ink">Fatih Bektas</div>
                <div className="text-[0.85rem] text-[#8B7A3A]">Fachanwalt für Arbeitsrecht</div>
                <p className="mt-1.5 text-[0.88rem] leading-snug text-ink-light">
                  &bdquo;Viele Kündigungen sind angreifbar — oft lassen sich
                  erhebliche Abfindungen verhandeln. Wichtig ist nur: die
                  3-Wochen-Frist nicht verpassen.&ldquo;
                </p>
              </div>
            </div>
          </div>

          {/* Hero-Formular direkt rechts – der einzige primäre CTA above the fold */}
          <div>
            <LandingShortForm
              variant={VARIANT}
              disputeType="Kündigung"
              anchor="anfrage"
            />
          </div>
        </section>

        {/* ─────────── PROBLEM-AGITATION (Loss-Framing verstärken) ─────────── */}
        <section className="mt-14 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 p-6 md:mt-20 md:p-10">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-red-800">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
              </svg>
              Was passiert, wenn Sie die Frist verpassen
            </div>
            <h2 className="mt-3 font-serif text-[clamp(1.4rem,3vw,1.85rem)] font-bold leading-tight text-ink">
              Nach 21 Tagen ist jede Kündigung wirksam — auch wenn sie unwirksam war.
            </h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-light">
              Die 3-Wochen-Frist aus § 4 KSchG ist eine Ausschlussfrist. Wer sie
              verpasst, verliert die Klagemöglichkeit <strong>endgültig</strong> —
              und damit:
            </p>
          </div>

          <ul className="mt-5 grid list-none gap-3 p-0 md:mt-6 md:grid-cols-2">
            {[
              {
                title: 'Keine Abfindungsverhandlung mehr',
                text: 'Ohne Druck einer fristgerechten Klage hat Ihr Arbeitgeber keinen Grund mehr, über eine Abfindung zu reden. Der Verhandlungshebel ist weg.',
              },
              {
                title: 'Kein Anspruch auf Weiterbeschäftigung',
                text: 'Die Kündigung gilt als wirksam — Ihr Arbeitsverhältnis endet mit dem im Kündigungsschreiben genannten Datum.',
              },
              {
                title: 'Rechtsschutzversicherung übernimmt nicht mehr',
                text: 'Die meisten Policen decken nur, solange eine fristgerechte Klage noch möglich ist. Nach der Frist tragen Sie alle Kosten selbst.',
              },
              {
                title: 'Risiko Sperrzeit beim Arbeitslosengeld',
                text: 'Bei bestimmten Konstellationen (z. B. Aufhebungsvertrag unter Druck unterschrieben) droht eine 12-Wochen-Sperrzeit. Prüfung ist Teil der Ersteinschätzung.',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3 rounded-lg bg-white/70 p-4 ring-1 ring-black/5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600/90 text-white">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
                <div>
                  <div className="font-serif text-[0.98rem] font-semibold text-ink">{item.title}</div>
                  <p className="mt-0.5 text-[0.88rem] leading-relaxed text-ink-light">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-3 rounded-xl bg-ink px-5 py-4 text-white md:flex-row md:items-center md:justify-between md:gap-4">
            <p className="text-[0.95rem] leading-snug">
              <strong>Deshalb:</strong> Prüfen Sie Ihre Kündigung, solange die Frist
              läuft. Die Ersteinschätzung ist kostenlos — und bindet Sie an nichts.
            </p>
            <a
              href="#anfrage"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[0.85rem] font-semibold text-ink no-underline hover:bg-white/90"
            >
              Jetzt prüfen lassen
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        {/* ─────────── TESTIMONIALS (direkt nach Hero) ─────────── */}
        <section className="mt-12 md:mt-16">
          <LandingTestimonials />
        </section>

        {/* ─────────── RECHENBEISPIEL ABFINDUNG ─────────── */}
        <section className="mt-12 md:mt-16">
          <div className="mb-5 max-w-[720px]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8B7A3A]">
              Rechenbeispiel
            </div>
            <h2 className="mt-1 font-serif text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold leading-tight text-ink">
              Was eine erfolgreiche Verhandlung bringen kann
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-light">
              Die klassische Faustformel lautet 0,5 Bruttomonatsgehälter pro Jahr
              Betriebszugehörigkeit. Mit anwaltlicher Verhandlung sind in vielen
              Fällen deutlich bessere Faktoren erzielbar — besonders bei
              angreifbaren Kündigungen.
            </p>
          </div>

          {/* Desktop: Tabelle. Mobile: Karten. */}
          <div className="hidden overflow-hidden rounded-xl border border-black/10 bg-white md:block">
            <table className="w-full border-collapse text-[0.9rem]">
              <thead className="bg-[#f9f6ec] text-[0.78rem] uppercase tracking-wide text-[#6B6626]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Fallbeispiel</th>
                  <th className="px-4 py-3 text-left font-semibold">Monatsbrutto</th>
                  <th className="px-4 py-3 text-left font-semibold">Jahre</th>
                  <th className="px-4 py-3 text-left font-semibold">Faustformel (Faktor 0,5)</th>
                  <th className="px-4 py-3 text-left font-semibold">Mit Fachanwalt (0,75–1,25)</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#6B6626]">Differenz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {calcExamples.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-ink">{row.label}</td>
                    <td className="px-4 py-3 text-ink-light">{row.salary.toLocaleString('de-DE')} €</td>
                    <td className="px-4 py-3 text-ink-light">{row.years}</td>
                    <td className="px-4 py-3 text-ink-light">
                      {(row.salary * 0.5 * row.years).toLocaleString('de-DE')} €
                    </td>
                    <td className="px-4 py-3 text-ink-light">
                      {(row.salary * 0.75 * row.years).toLocaleString('de-DE')}–
                      {(row.salary * 1.25 * row.years).toLocaleString('de-DE')} €
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#6B6626]">
                      +{(row.salary * 0.25 * row.years).toLocaleString('de-DE')}–
                      {(row.salary * 0.75 * row.years).toLocaleString('de-DE')} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile-Karten */}
          <div className="grid gap-3 md:hidden">
            {calcExamples.map((row) => (
              <div key={row.label} className="rounded-xl border border-black/10 bg-white p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-[1rem] font-semibold text-ink">{row.label}</h3>
                  <span className="text-[0.78rem] text-ink-muted">
                    {row.salary.toLocaleString('de-DE')} € · {row.years} Jahre
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[0.85rem]">
                  <dt className="text-ink-muted">Faustformel 0,5:</dt>
                  <dd className="text-right text-ink">{(row.salary * 0.5 * row.years).toLocaleString('de-DE')} €</dd>
                  <dt className="text-ink-muted">Mit Fachanwalt:</dt>
                  <dd className="text-right text-ink">
                    {(row.salary * 0.75 * row.years).toLocaleString('de-DE')}–{(row.salary * 1.25 * row.years).toLocaleString('de-DE')} €
                  </dd>
                  <dt className="font-semibold text-[#6B6626]">Differenz:</dt>
                  <dd className="text-right font-semibold text-[#6B6626]">
                    +{(row.salary * 0.25 * row.years).toLocaleString('de-DE')}–{(row.salary * 0.75 * row.years).toLocaleString('de-DE')} €
                  </dd>
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-muted">
            Rechenbeispiele auf Basis typischer Verhandlungsergebnisse. Die
            tatsächlich erzielbare Abfindung hängt vom Einzelfall ab:
            Erfolgsaussichten der Kündigungsschutzklage, Verhandlungsposition des
            Arbeitgebers, Branche, Dauer und Angreifbarkeit der Kündigung. Es
            besteht kein gesetzlicher Abfindungsanspruch (außer Sonderfällen nach
            § 1a KSchG, Sozialplan oder Tarifvertrag).
          </p>
        </section>

        {/* ─────────── WAS WIR PRÜFEN ─────────── */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-serif text-[1.3rem] font-semibold text-ink md:text-[1.5rem]">
            Was Fatih Bektas in der Ersteinschätzung prüft
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Formfehler + Zugang',
                text: 'Unterschrift, Zustellung, Vertretungsmacht, Betriebsratsanhörung nach § 102 BetrVG — jeder Formfehler macht die Kündigung angreifbar.',
              },
              {
                title: 'Soziale Auswahl',
                text: 'Bei betriebsbedingten Kündigungen: Dauer der Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten, Schwerbehinderung — häufigster Angriffspunkt.',
              },
              {
                title: 'Abfindungs-Hebel',
                text: 'Verhandlungsspielraum über die 0,5-Faktor-Faustformel hinaus. Realistisch sind in vielen Fällen 0,75–1,5 Bruttomonatsgehälter pro Jahr.',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-black/10 bg-white p-5">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6B6626]/10 text-[#6B6626]">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1.05rem] font-semibold text-ink">{card.title}</h3>
                <p className="mt-1 text-[0.9rem] text-ink-light">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────── PROZESS-VISUALISIERUNG ─────────── */}
        <section className="mt-14 md:mt-20">
          <div className="mb-6 max-w-[720px] md:mb-8">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8B7A3A]">
              So läuft es ab
            </div>
            <h2 className="mt-1 font-serif text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold leading-tight text-ink">
              Von der ersten Nachricht bis zur fristgerechten Klage
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-light">
              Keine versteckten Kosten, keine Mandatsbindung ohne Ihre
              Zustimmung. Erst die Ersteinschätzung — dann entscheiden Sie.
            </p>
          </div>

          <ol className="relative grid list-none gap-4 p-0 md:grid-cols-4 md:gap-5">
            {/* Verbindungslinie (Desktop) */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#d4c98a] to-transparent md:block"
              aria-hidden="true"
            />
            {prozessSteps.map((step) => (
              <li key={step.nr} className="relative rounded-xl border border-black/10 bg-white p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6B6626] font-serif text-[1.05rem] font-bold text-white shadow-sm">
                  {step.nr}
                </div>
                <h3 className="font-serif text-[1.05rem] font-semibold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-light">
                  {step.text}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f9f6ec] px-2.5 py-0.5 text-[0.72rem] font-medium text-[#6B6626]">
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {step.duration}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-center text-[0.9rem] text-ink-light md:text-left">
            <strong className="text-ink">Von Anruf bis Klageeinreichung:</strong>{' '}
            in dringenden Fällen in 48&nbsp;Stunden — auch wenn Ihre Frist bereits
            nächste Woche abläuft.
          </p>
        </section>

        {/* ─────────── VORQUALIFIZIERUNGS-FAQ (oikon-Lehre) ─────────── */}
        <section className="mt-14 md:mt-20">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-10">
            <div>
              <h2 className="font-serif text-[1.3rem] font-semibold text-ink md:text-[1.55rem]">
                Häufige Fragen
              </h2>
              <p className="mt-2 max-w-[360px] text-[0.9rem] text-ink-light">
                Ihre Frage ist nicht dabei? Rufen Sie an —
                die Erstberatung klärt sie direkt.
              </p>
            </div>
            <div className="space-y-2">
              {[
                {
                  q: 'Für wen ist diese Beratung geeignet?',
                  a: 'Für Arbeitnehmerinnen und Arbeitnehmer, die eine ordentliche oder fristlose Kündigung erhalten haben — unabhängig von Branche, Position und Dienstalter. Für Führungskräfte und Geschäftsführer-Dienstverträge gibt es eine eigene Executive-Beratung. Nicht geeignet: Arbeitgeber-Mandate (dafür berät APOS Legal separat).',
                },
                {
                  q: 'Was kostet die Ersteinschätzung?',
                  a: 'Die Ersteinschätzung per Telefon oder E-Mail ist kostenlos und unverbindlich. Für eine weiterführende anwaltliche Prüfung Ihrer Unterlagen erhalten Sie vorab ein Kostenangebot — oder wir klären die Kostenübernahme mit Ihrer Rechtsschutzversicherung (unter Vorbehalt von Wartezeit, Deckungszusage und Selbstbeteiligung).',
                },
                {
                  q: 'Wie schnell melden Sie sich zurück?',
                  a: 'Innerhalb von 2 Stunden werktags zwischen 9 und 18 Uhr — persönlich durch Fatih Bektas. Außerhalb dieser Zeiten: Rückruf am nächsten Werktag frühzeitig. Bei akuten Fristfällen priorisieren wir.',
                },
                {
                  q: 'Wie wird die 3-Wochen-Frist genau berechnet?',
                  a: 'Nach § 4 KSchG beginnt die Frist mit Zugang der schriftlichen Kündigung. Sie beträgt 21 Kalendertage (§§ 187, 188 BGB). Fällt das Fristende auf Samstag, Sonntag oder einen gesetzlichen Feiertag Ihres Bundeslands, verlängert sich die Frist nach § 193 BGB auf den nächsten Werktag. Die exakte Berechnung übernehmen wir für Ihren Einzelfall.',
                },
                {
                  q: 'Muss ich nach Heidelberg kommen?',
                  a: 'Nein. Beratung erfolgt per Telefon oder Video, Schriftsätze digital über das besondere elektronische Anwaltspostfach (beA). Vertretung bundesweit vor jedem deutschen Arbeitsgericht. Persönlicher Termin am Kanzleisitz möglich, aber nicht erforderlich.',
                },
              ].map((item) => (
                <details key={item.q} className="group rounded-lg border border-black/10 bg-white p-4 open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[0.95rem] text-ink">
                    {item.q}
                    <span aria-hidden="true" className="ml-3 shrink-0 text-ink-muted transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-light">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── FINALER CTA (zurück zum Formular) ─────────── */}
        <section className="mt-14 rounded-2xl bg-[#6B6626] p-7 text-center md:mt-20 md:p-10">
          <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.75rem)] font-bold leading-tight text-white">
            Jetzt kostenlose Ersteinschätzung anfordern
          </h2>
          <p className="mx-auto mt-2 max-w-[520px] text-[0.95rem] text-white/80">
            Rückruf in 2&nbsp;Stunden werktags 9–18 Uhr.
            Drei Angaben reichen.
          </p>
          <a
            href="#anfrage"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#6B6626] no-underline shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Zum Formular
            <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <LandingStickyCall variant={VARIANT} />
      <LandingFooter />
    </>
  );
}
