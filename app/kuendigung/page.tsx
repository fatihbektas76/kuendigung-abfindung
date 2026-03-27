import type { Metadata } from 'next';
import Link from 'next/link';
import { entries } from '@/lib/betriebszugehoerigkeit';
import { lebenssituationData } from '@/lib/lebenssituation-data';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Kündigung erhalten – Rechte & Sofortmaßnahmen (${new Date().getFullYear()})`,
  description:
    'Kündigung erhalten? 3-Wochen-Frist beachten! Sofortmaßnahmen, Kündigungsfristen nach §622 BGB, Ihre Rechte als Arbeitnehmer. Fachanwalt für Arbeitsrecht – kostenlose Ersteinschätzung.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/kuendigung`,
  },
  openGraph: {
    title: `Kündigung erhalten – Rechte & Sofortmaßnahmen (${new Date().getFullYear()})`,
    description: 'Kündigung erhalten? 3-Wochen-Frist beachten! Sofortmaßnahmen, Kündigungsfristen nach §622 BGB, Ihre Rechte als Arbeitnehmer.',
    url: `${SEO_CONFIG.baseUrl}/kuendigung`,
  },
  twitter: {
    card: 'summary',
    title: `Kündigung erhalten – Rechte & Sofortmaßnahmen (${new Date().getFullYear()})`,
    description: 'Kündigung erhalten? 3-Wochen-Frist beachten! Sofortmaßnahmen, Kündigungsfristen nach §622 BGB, Ihre Rechte als Arbeitnehmer.',
  },
};

const faqs = [
  {
    q: 'Was muss ich sofort tun, wenn ich eine Kündigung erhalte?',
    a: 'Notieren Sie das Zustelldatum \u2014 ab diesem Tag läuft die 3-Wochen-Klagefrist nach §4 KSchG. Unterschreiben Sie nichts und stimmen Sie keinem Aufhebungsvertrag zu. Kontaktieren Sie sofort einen Fachanwalt für Arbeitsrecht. Melden Sie sich bei der Agentur für Arbeit arbeitssuchend (innerhalb von 3 Tagen nach Kenntnis der Kündigung).',
  },
  {
    q: 'Wann ist eine Kündigung unwirksam?',
    a: 'Eine Kündigung kann aus vielen Gründen unwirksam sein: fehlende oder fehlerhafte Betriebsratsanhörung (§102 BetrVG), Verstoß gegen die Sozialauswahl bei betriebsbedingter Kündigung (§1 KSchG), Formfehler (fehlende Schriftform nach §623 BGB), Kündigung während besonderem Kündigungsschutz (Schwangerschaft, Elternzeit, Schwerbehinderung) oder Missachtung von Kündigungsfristen.',
  },
  {
    q: 'Kann mein Arbeitgeber mich ohne Abmahnung kündigen?',
    a: 'Bei einer verhaltensbedingten Kündigung ist grundsätzlich eine vorherige Abmahnung erforderlich. Ohne Abmahnung ist die Kündigung in der Regel unwirksam. Ausnahmen gelten nur bei schwerwiegenden Pflichtverletzungen wie Diebstahl oder Arbeitszeitbetrug. Bei betriebsbedingten Kündigungen ist keine Abmahnung erforderlich.',
  },
  {
    q: 'Was passiert, wenn ich die 3-Wochen-Frist verpasse?',
    a: 'Verpassen Sie die Klagefrist nach §4 KSchG, gilt die Kündigung als von Anfang an wirksam \u2014 selbst wenn sie rechtswidrig war. Eine nachträgliche Zulassung der Klage (§5 KSchG) ist nur in Ausnahmefällen möglich, z.\u00A0B. bei Krankheit oder wenn die Kündigung nicht ordnungsgemäß zugestellt wurde.',
  },
  {
    q: 'Muss ich während der Kündigungsfrist weiterarbeiten?',
    a: 'Ja, bis zum Ende der Kündigungsfrist besteht Ihr Arbeitsverhältnis fort \u2014 mit allen Rechten und Pflichten. Der Arbeitgeber kann Sie allerdings unter Fortzahlung der Vergütung freistellen. Prüfen Sie, ob eine Freistellung widerruflich oder unwiderruflich ist, da dies Auswirkungen auf die Urlaubsabgeltung hat.',
  },
];

const fristen = [
  { jahre: 'Probezeit', frist: '2 Wochen', basis: '§622 Abs. 3 BGB' },
  { jahre: '0\u20132 Jahre', frist: '4 Wochen zum 15. / Monatsende', basis: '§622 Abs. 1 BGB' },
  { jahre: '2 Jahre', frist: '1 Monat zum Monatsende', basis: '§622 Abs. 2 Nr. 1' },
  { jahre: '5 Jahre', frist: '2 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 2' },
  { jahre: '8 Jahre', frist: '3 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 3' },
  { jahre: '10 Jahre', frist: '4 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 4' },
  { jahre: '12 Jahre', frist: '5 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 5' },
  { jahre: '15 Jahre', frist: '6 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 6' },
  { jahre: '20 Jahre', frist: '7 Monate zum Monatsende', basis: '§622 Abs. 2 Nr. 7' },
];

export default function KuendigungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/kuendigung`}
        pageTitle="Kündigung erhalten – Was jetzt?"
        pageDescription="Kündigung erhalten? 3-Wochen-Frist beachten! Sofortmaßnahmen, Kündigungsfristen nach §622 BGB, Ihre Rechte als Arbeitnehmer."
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung` },
        ]}
        includeOrganization={false}
        includeRating={false}
        isBasedOn={[
          { name: 'Kündigungsschutzgesetz (KSchG)', url: 'https://www.gesetze-im-internet.de/kschg/' },
          { name: 'Bürgerliches Gesetzbuch (BGB) §622', url: 'https://www.gesetze-im-internet.de/bgb/__622.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §4', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §23', url: 'https://www.gesetze-im-internet.de/kschg/__23.html' },
          { name: 'Betriebsverfassungsgesetz (BetrVG) §102', url: 'https://www.gesetze-im-internet.de/betrvg/__102.html' },
        ]}
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
            <span>Kündigung</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Kündigung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kündigung erhalten &ndash; was jetzt tun?
          </h1>
        </div>
      </div>

      {/* Intro + Urgency box */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            {/* Urgency box */}
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Die Klagefrist beträgt nur 3 Wochen ab Zugang der Kündigung (&sect;4 KSchG).
                Handeln Sie sofort.
              </p>
            </div>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Eine Kündigung zu erhalten ist ein Schock &mdash; aber kein Grund zur Panik, wenn Sie richtig reagieren. Ihr wichtigstes Werkzeug: die <strong>Kündigungsschutzklage</strong>. Innerhalb von nur drei Wochen nach Zugang der Kündigung müssen Sie Klage beim Arbeitsgericht einreichen. Verpassen Sie diese Frist, verlieren Sie alle Ansprüche &mdash; egal wie rechtswidrig die Kündigung war.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Die gute Nachricht: Viele Kündigungen sind angreifbar. Fehler in der <strong>Sozialauswahl</strong>, eine fehlende <strong>Betriebsratsanhörung</strong>, Formfehler oder die Missachtung besonderer Schutzrechte machen die Kündigung unwirksam. Selbst wenn die Kündigung rechtmäßig ist, führt die Klage in der Praxis fast immer zu einer <strong>Abfindung</strong> im Vergleich.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
              Ein Fachanwalt für Arbeitsrecht prüft Ihre Kündigung auf alle Schwachstellen, berechnet Ihre Abfindungschancen und vertritt Sie vor dem Arbeitsgericht. In der ersten Instanz tragen Sie nur Ihre eigenen Anwaltskosten (&sect;12a ArbGG) &mdash; und wenn Sie eine Rechtsschutzversicherung haben, übernimmt diese die Kosten.
            </p>

            {/* CTA 1 */}
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kündigung kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Kündigungsfristen-Tabelle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kündigungsfristen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Gesetzliche Kündigungsfristen nach &sect;622 BGB
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Diese Fristen gelten für Kündigungen durch den Arbeitgeber. Arbeits- oder Tarifverträge
            können abweichende &mdash; aber nicht kürzere &mdash; Fristen vorsehen.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.92rem]">
              <thead>
                <tr className="border-b-2 border-gold/30">
                  <th className="text-left py-3 px-4 font-semibold text-ink">Betriebszugehörigkeit</th>
                  <th className="text-left py-3 px-4 font-semibold text-ink">Kündigungsfrist</th>
                  <th className="text-left py-3 px-4 font-semibold text-ink-muted">Rechtsgrundlage</th>
                </tr>
              </thead>
              <tbody>
                {fristen.map((f, i) => (
                  <tr key={i} className="border-b border-border hover:bg-gold-bg transition-colors">
                    <td className="py-3 px-4 font-semibold">{f.jahre}</td>
                    <td className="py-3 px-4">{f.frist}</td>
                    <td className="py-3 px-4 text-ink-muted text-[0.84rem]">{f.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.78rem] text-ink-muted mt-4">
            Eine zu kurze Kündigungsfrist macht die Kündigung angreifbar. Prüfen Sie auch Ihren Arbeitsvertrag
            auf abweichende Regelungen.
          </p>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ist Ihre Kündigung wirksam?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Viele Kündigungen sind angreifbar. Wir prüfen Ihren Fall kostenlos und schätzen Ihre
            Chancen ein &mdash; innerhalb von 48 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Kündigung nach Betriebszugehörigkeit - Links */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nach Betriebszugehörigkeit
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Gekündigt nach Jahren im Betrieb
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Wählen Sie Ihre Betriebszugehörigkeit &mdash; wir zeigen Ihnen Ihre Rechte,
            Kündigungsfristen und Abfindungschancen.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {entries.map((e) => (
              <Link
                key={e.year}
                href={`/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit/`}
                className="py-2 px-4 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all bg-white"
              >
                {e.year} {e.year === 1 ? 'Jahr' : 'Jahre'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fristlose Kündigung nach Betriebszugehörigkeit - Links */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nach Betriebszugehörigkeit
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Fristlose Kündigung nach Jahren im Betrieb
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Fristlose Kündigung erhalten? Wir prüfen Wirksamkeit, Abmahnung und die
            2-Wochen-Ausschlussfrist &mdash; für jede Betriebszugehörigkeit.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {entries.map((e) => (
              <Link
                key={e.year}
                href={`/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit/`}
                className="py-2 px-4 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all bg-white"
              >
                {e.year} {e.year === 1 ? 'Jahr' : 'Jahre'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fristlose Kündigung - Link Card */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="flex items-center justify-between gap-6 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold max-md:flex-col max-md:items-start">
              <div>
                <p className="text-[1rem] font-semibold text-ink m-0">Fristlose Kündigung erhalten?</p>
                <p className="text-[0.84rem] text-ink-muted mt-1 m-0">
                  Die meisten fristlosen Kündigungen sind unwirksam. &sect;626 BGB stellt sehr hohe Anforderungen.
                </p>
              </div>
              <Link
                href="/fristlose-kuendigung/"
                className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline whitespace-nowrap transition-all hover:bg-[#635428]"
              >
                Zum Ratgeber &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kündigung nach Ihrer Situation */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nach Ihrer Situation
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Kündigung nach Ihrer Lebenssituation
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Besonderer Kündigungsschutz gilt in vielen Lebenssituationen. Finden Sie Ihre Situation
            und erfahren Sie, welche Rechte Sie haben.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {lebenssituationData.map((e) => (
              <Link
                key={e.slug}
                href={`/kuendigung/${e.slug}/`}
                className="py-2 px-4 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all bg-white"
              >
                {e.h1.replace(/ — .*$/, '')}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Abmahnung - Link zur Pillar Page */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="flex items-center justify-between gap-6 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold max-md:flex-col max-md:items-start">
              <div>
                <p className="text-[1rem] font-semibold text-ink m-0">Abmahnung erhalten?</p>
                <p className="text-[0.84rem] text-ink-muted mt-1 m-0">
                  Erfahren Sie, ob Ihre Abmahnung wirksam ist und wie Sie jetzt richtig reagieren.
                </p>
              </div>
              <Link
                href="/abmahnung/"
                className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline whitespace-nowrap transition-all hover:bg-[#635428]"
              >
                Zum Ratgeber Abmahnung &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aktuelle Rechtslage */}
      <AktuelleRechtslage />

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zur Kündigung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Autorenbox */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
          </div>
        </div>
      </section>

      {/* Standort-Hinweis */}
      <section className="py-[40px] px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto text-center">
          <p className="text-[0.92rem] text-ink-muted">
            Wir vertreten Arbeitnehmer bundesweit &mdash; vollständig digital.{' '}
            <a href="/arbeitsrecht-anwalt" className="text-gold-dark font-semibold no-underline hover:underline">
              Fachanwalt für Arbeitsrecht in Ihrer Stadt finden &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            3 Wochen. Danach ist es zu spät.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die Klagefrist nach &sect;4 KSchG läuft ab dem Tag, an dem Sie die Kündigung erhalten.
            Nutzen Sie unsere kostenlose Ersteinschätzung.
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
