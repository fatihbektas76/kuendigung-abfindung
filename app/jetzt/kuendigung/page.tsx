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

        {/* ─────────── TESTIMONIALS (direkt nach Hero) ─────────── */}
        <section className="mt-12 md:mt-16">
          <LandingTestimonials />
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
