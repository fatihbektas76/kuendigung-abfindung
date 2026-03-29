import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import { entries } from '@/lib/betriebszugehoerigkeit';
import ShareButtons from '@/components/ShareButtons';
import RelatedTopics from '@/components/RelatedTopics';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Abfindung bei Kündigung – Anspruch & Höhe (${new Date().getFullYear()})`,
  description:
    'Abfindung nach Kündigung: Wann haben Sie Anspruch? Wie hoch fällt sie aus? Formel, Tabelle und Praxistipps vom Fachanwalt für Arbeitsrecht. Kostenlose Ersteinschätzung.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/abfindung/`,
  },
  openGraph: {
    title: `Abfindung bei Kündigung – Anspruch & Höhe (${new Date().getFullYear()})`,
    description: 'Abfindung nach Kündigung: Wann haben Sie Anspruch? Wie hoch fällt sie aus? Formel, Tabelle und Praxistipps vom Fachanwalt für Arbeitsrecht.',
    url: `${SEO_CONFIG.baseUrl}/abfindung/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Abfindung bei Kündigung – Anspruch & Höhe (${new Date().getFullYear()})`,
    description: 'Abfindung nach Kündigung: Wann haben Sie Anspruch? Wie hoch fällt sie aus? Formel, Tabelle und Praxistipps vom Fachanwalt für Arbeitsrecht.',
  },
};

const faqs = [
  {
    q: 'Habe ich einen gesetzlichen Anspruch auf Abfindung?',
    a: 'Einen automatischen gesetzlichen Anspruch auf Abfindung gibt es nicht. Ein Anspruch besteht nur in Ausnahmefällen, z.\u00A0B. nach §1a KSchG (Abfindungsangebot bei betriebsbedingter Kündigung), in Sozialplänen oder Tarifverträgen. In der Praxis wird eine Abfindung jedoch in über 80\u00A0% der Kündigungsschutzverfahren im Vergleich ausgehandelt.',
  },
  {
    q: 'Wie wird die Abfindung berechnet?',
    a: 'Die gängige Faustformel lautet: 0,5 Bruttomonatsgehälter pro Jahr der Betriebszugehörigkeit. Bei einem Gehalt von 4.000\u00A0\u20AC und 8 Jahren ergibt das 16.000\u00A0\u20AC. Je nach Verhandlungsposition kann der Faktor zwischen 0,25 und über 1,0 liegen.',
  },
  {
    q: 'Muss ich auf die Abfindung Steuern zahlen?',
    a: 'Ja, Abfindungen sind steuerpflichtig. Allerdings gibt es die sogenannte Fünftelregelung (§34 EStG), die die Steuerlast deutlich senken kann. Sozialversicherungsbeiträge fallen auf Abfindungen in der Regel nicht an, sofern sie im Zusammenhang mit der Beendigung des Arbeitsverhältnisses stehen.',
  },
  {
    q: 'Kann ich eine höhere Abfindung verhandeln?',
    a: 'Ja. Die Höhe der Abfindung hängt maßgeblich von Ihrer Verhandlungsposition ab: Formfehler in der Kündigung, fehlerhafte Sozialauswahl, fehlende Betriebsratsanhörung oder besonderer Kündigungsschutz (Schwangerschaft, Schwerbehinderung, Betriebsrat) stärken Ihre Position erheblich.',
  },
  {
    q: 'Bekomme ich eine Abfindung auch bei fristloser Kündigung?',
    a: 'Ja, gerade bei fristlosen Kündigungen nach §626 BGB ist die Abfindungschance oft besonders hoch, weil die Anforderungen an den wichtigen Grund sehr streng sind. Viele fristlose Kündigungen sind unwirksam, was zu guten Vergleichsergebnissen führt.',
  },
];

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const gehalt = 3000;

export default function AbfindungPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/abfindung/`}
        pageTitle="Abfindung nach Kündigung"
        pageDescription="Abfindung nach Kündigung: Wann haben Sie Anspruch? Wie hoch fällt sie aus? Formel, Tabelle und Praxistipps vom Fachanwalt."
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Abfindung', url: `${SEO_CONFIG.baseUrl}/abfindung/` },
        ]}
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        isBasedOn={[
          { name: 'Kündigungsschutzgesetz (KSchG) §1a', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
          { name: 'Bürgerliches Gesetzbuch (BGB) §622', url: 'https://www.gesetze-im-internet.de/bgb/__622.html' },
          { name: 'Einkommensteuergesetz (EStG) §34', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §4', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §9', url: 'https://www.gesetze-im-internet.de/kschg/__9.html' },
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
            <span>Abfindung</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Abfindung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Abfindung nach Kündigung: Was Ihnen zusteht
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Wenn Ihr Arbeitgeber Ihnen kündigt, stellt sich sofort die Frage: <strong>Steht mir eine Abfindung zu?</strong> Obwohl es in Deutschland keinen automatischen gesetzlichen Abfindungsanspruch gibt, erhalten Arbeitnehmer in der Praxis in der großen Mehrheit aller Kündigungsschutzverfahren eine Abfindung &mdash; oft deutlich mehr als erwartet.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Die gängige <strong>Abfindungsformel</strong> lautet: <span className="font-semibold text-ink">0,5 Bruttomonatsgehälter &times; Jahre der Betriebszugehörigkeit</span>. Bei einem Bruttogehalt von 4.000&nbsp;&euro; und 10 Jahren Betriebszugehörigkeit ergibt das 20.000&nbsp;&euro; als Ausgangspunkt. Je nach Verhandlungsposition &mdash; etwa bei Formfehlern in der Kündigung, fehlerhafter Sozialauswahl oder besonderem Kündigungsschutz &mdash; kann der Faktor auf 1,0 oder höher steigen.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
              Entscheidend ist, dass Sie die <strong>3-Wochen-Klagefrist</strong> nach &sect;4 KSchG nicht verpassen. Nur wer rechtzeitig Kündigungsschutzklage erhebt, hat die Verhandlungsposition, eine angemessene Abfindung durchzusetzen. Ein Fachanwalt für Arbeitsrecht kann Ihre Chancen und die realistische Höhe einschätzen.
            </p>

            {/* CTA 1 */}
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kostenlose Ersteinschätzung anfordern &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Abfindungstabelle */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Abfindungstabelle
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Abfindung bei {gehalt.toLocaleString('de-DE')}&nbsp;&euro; Bruttogehalt
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Die folgende Tabelle zeigt die Abfindung nach der Regelformel (Faktor 0,5) sowie
            realistische Bandbreiten bei erfolgreicher Verhandlung.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.92rem]">
              <thead>
                <tr className="border-b-2 border-gold/30">
                  <th className="text-left py-3 px-4 font-semibold text-ink">Jahre</th>
                  <th className="text-right py-3 px-4 font-semibold text-ink">Minimum (0,25&times;)</th>
                  <th className="text-right py-3 px-4 font-semibold text-gold-dark">Regelformel (0,5&times;)</th>
                  <th className="text-right py-3 px-4 font-semibold text-ink">Maximum (1,0&times;)</th>
                </tr>
              </thead>
              <tbody>
                {years.map((y) => (
                  <tr key={y} className="border-b border-border hover:bg-gold-bg transition-colors">
                    <td className="py-3 px-4 font-semibold">{y} {y === 1 ? 'Jahr' : 'Jahre'}</td>
                    <td className="py-3 px-4 text-right text-ink-muted">
                      {(gehalt * 0.25 * y).toLocaleString('de-DE')}&nbsp;&euro;
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gold-dark">
                      {(gehalt * 0.5 * y).toLocaleString('de-DE')}&nbsp;&euro;
                    </td>
                    <td className="py-3 px-4 text-right text-ink-muted">
                      {(gehalt * 1.0 * y).toLocaleString('de-DE')}&nbsp;&euro;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.78rem] text-ink-muted mt-4">
            Beispielberechnung bei {gehalt.toLocaleString('de-DE')}&nbsp;&euro; Bruttomonatsgehalt.
            Die tatsächliche Abfindung hängt von vielen Faktoren ab. Lassen Sie Ihren Fall individuell prüfen.
          </p>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Wie hoch ist Ihre Abfindung?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihren Fall kostenlos und schätzen Ihre realistische Abfindungshöhe ein &mdash;
            innerhalb von 48 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Abfindung nach Betriebszugehörigkeit - alle 40 Jahre */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nach Betriebszugehörigkeit
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Abfindung nach Jahren im Betrieb
          </h2>
          <div className="flex flex-wrap gap-3">
            {entries.map((e) => (
              <Link
                key={e.year}
                href={`/abfindung-nach-${e.slug}-betriebszugehoerigkeit/`}
                className="py-2.5 px-5 rounded-full border border-border bg-cream text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all"
              >
                Nach {e.year} {e.year === 1 ? 'Jahr' : 'Jahren'}
              </Link>
            ))}
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
            Fragen zur Abfindung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Autorenbox */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url="/abfindung/" title="Abfindung bei Kündigung – Anspruch & Höhe" />
          </div>
        </div>
      </section>

      <RelatedTopics current="abfindung" />

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
            Kündigung erhalten? Abfindung sichern.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Die 3-Wochen-Klagefrist läuft. Kontaktieren Sie uns jetzt für eine kostenlose
            Ersteinschätzung Ihrer Abfindungschancen.
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
