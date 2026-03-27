import type { Metadata } from 'next';
import Link from 'next/link';
import { entries } from '@/lib/betriebszugehoerigkeit';
import FaqAccordion from '@/components/FaqAccordion';
import StandAnzeige from '@/components/StandAnzeige';
import AktuelleRechtslage from '@/components/AktuelleRechtslage';
import AuthorBox from '@/components/AuthorBox';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Fristlose Kündigung — Ihre Rechte nach §626 BGB (${new Date().getFullYear()})`,
  description:
    'Fristlose Kündigung erhalten? Die meisten sind unwirksam. §626 BGB Voraussetzungen, Abfindungschancen, Klagefrist. Fachanwalt für Arbeitsrecht — kostenlose Ersteinschätzung.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/fristlose-kuendigung`,
  },
  openGraph: {
    title: `Fristlose Kündigung — Ihre Rechte nach §626 BGB (${new Date().getFullYear()})`,
    description: 'Fristlose Kündigung erhalten? Die meisten sind unwirksam. §626 BGB Voraussetzungen, Abfindungschancen, Klagefrist. Fachanwalt für Arbeitsrecht.',
    url: `${SEO_CONFIG.baseUrl}/fristlose-kuendigung`,
  },
  twitter: {
    card: 'summary',
    title: `Fristlose Kündigung — Ihre Rechte nach §626 BGB (${new Date().getFullYear()})`,
    description: 'Fristlose Kündigung erhalten? Die meisten sind unwirksam. §626 BGB Voraussetzungen, Abfindungschancen, Klagefrist. Fachanwalt für Arbeitsrecht.',
  },
};

const faqs = [
  {
    q: 'Wann ist eine fristlose Kündigung wirksam?',
    a: 'Eine fristlose Kündigung nach §626 BGB ist nur wirksam, wenn ein "wichtiger Grund" vorliegt, der so schwerwiegend ist, dass dem Arbeitgeber die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der ordentlichen Kündigungsfrist nicht zumutbar ist. Zudem muss die Kündigung innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes ausgesprochen werden. In der Praxis scheitern die meisten fristlosen Kündigungen an diesen hohen Anforderungen.',
  },
  {
    q: 'Was sind typische Gründe für eine fristlose Kündigung?',
    a: 'Typische Gründe sind: Diebstahl oder Unterschlagung (auch bei geringen Werten), Arbeitszeitbetrug, schwere Beleidigung von Vorgesetzten oder Kollegen, Annahme von Schmiergeldern, beharrliche Arbeitsverweigerung, Verrat von Geschäftsgeheimnissen oder sexuelle Belästigung am Arbeitsplatz. Aber: Nicht jeder dieser Gründe rechtfertigt automatisch eine fristlose Kündigung — es kommt immer auf den Einzelfall und die Interessenabwägung an.',
  },
  {
    q: 'Muss vor einer fristlosen Kündigung abgemahnt werden?',
    a: 'Grundsätzlich ja — bei verhaltensbedingten Gründen ist in der Regel eine vorherige Abmahnung erforderlich. Ausnahmen gelten nur bei besonders schweren Pflichtverletzungen, bei denen dem Arbeitnehmer klar sein musste, dass der Arbeitgeber dies nicht dulden würde (z.\u00A0B. Straftaten gegen den Arbeitgeber). Das Fehlen einer Abmahnung ist einer der häufigsten Gründe, warum fristlose Kündigungen vor Gericht scheitern.',
  },
  {
    q: 'Was muss ich nach einer fristlosen Kündigung sofort tun?',
    a: 'Handeln Sie sofort: 1) Notieren Sie das Zustelldatum — die 3-Wochen-Klagefrist nach §4 KSchG läuft. 2) Unterschreiben Sie nichts. 3) Kontaktieren Sie einen Fachanwalt für Arbeitsrecht. 4) Melden Sie sich bei der Agentur für Arbeit arbeitssuchend. 5) Sichern Sie alle Beweise (E-Mails, Zeugen, Dokumente), die die Kündigung entkräften könnten.',
  },
  {
    q: 'Bekomme ich nach einer fristlosen Kündigung Arbeitslosengeld?',
    a: 'Bei einer fristlosen Kündigung verhängt die Agentur für Arbeit in der Regel eine Sperrzeit von 12 Wochen, da sie von einem "versicherungswidrigen Verhalten" ausgeht. Allerdings: Wenn die fristlose Kündigung vor dem Arbeitsgericht als unwirksam festgestellt wird oder im Vergleich in eine ordentliche Kündigung umgewandelt wird, entfällt die Sperrzeit nachträglich. Ein weiterer Grund, sofort Klage einzureichen.',
  },
];

export default function FristloseKuendigungPage() {
  return (
    <main>
      <SeoGeoBase
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Kündigung', url: `${SEO_CONFIG.baseUrl}/kuendigung` },
          { name: 'Fristlose Kündigung', url: `${SEO_CONFIG.baseUrl}/fristlose-kuendigung` },
        ]}
        datePublished="2025-01-15"
        isBasedOn={[
          { name: 'Bürgerliches Gesetzbuch (BGB) §626', url: 'https://www.gesetze-im-internet.de/bgb/__626.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §4', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
          { name: 'Kündigungsschutzgesetz (KSchG) §13', url: 'https://www.gesetze-im-internet.de/kschg/__13.html' },
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
            <Link href="/kuendigung" className="text-gold no-underline hover:underline">Kündigung</Link>
            <span className="mx-2">/</span>
            <span>Fristlose Kündigung</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Ratgeber Fristlose Kündigung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Fristlose Kündigung &ndash; Ihre Rechte
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            {/* Warning box */}
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold mb-8">
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Wichtig: Bei einer fristlosen Kündigung läuft die 3-Wochen-Klagefrist ab Zugang.
                Handeln Sie sofort &mdash; jeder Tag zählt.
              </p>
            </div>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Eine <strong>fristlose Kündigung</strong> nach &sect;626 BGB beendet Ihr Arbeitsverhältnis von heute auf morgen &mdash;
              ohne Kündigungsfrist, ohne Übergabe, ohne Vorbereitung. Der Schock sitzt tief. Aber die gute Nachricht:
              <strong> Die meisten fristlosen Kündigungen sind unwirksam.</strong>
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Der Arbeitgeber muss nach &sect;626 BGB einen <strong>&bdquo;wichtigen Grund&ldquo;</strong> nachweisen, der so schwerwiegend ist,
              dass ihm die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der ordentlichen Kündigungsfrist nicht
              zumutbar ist. Zudem muss er die <strong>2-Wochen-Frist</strong> einhalten: Die fristlose Kündigung muss
              innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes ausgesprochen werden. Versäumt er diese Frist,
              ist die Kündigung automatisch unwirksam.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Bei der <strong>Interessenabwägung</strong> spielt Ihre Betriebszugehörigkeit eine zentrale Rolle:
              Je länger Sie im Unternehmen sind, desto höher die Hürde für eine fristlose Kündigung. Bei
              Arbeitnehmern mit langer Betriebszugehörigkeit reicht oft selbst ein schwerwiegendes Fehlverhalten
              nicht aus &mdash; der Arbeitgeber muss zunächst abmahnen.
            </p>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-8">
              Ein <strong>Fachanwalt für Arbeitsrecht</strong> prüft die Wirksamkeit Ihrer fristlosen Kündigung:
              Liegt ein wichtiger Grund vor? Wurde die 2-Wochen-Frist eingehalten? War eine Abmahnung erforderlich?
              Fällt die Interessenabwägung zu Ihren Gunsten aus? In vielen Fällen wird die fristlose Kündigung
              vor Gericht in eine ordentliche umgewandelt &mdash; mit Abfindung.
            </p>

            {/* CTA 1 */}
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Fristlose Kündigung kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* §626 BGB Voraussetzungen */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Rechtliche Grundlagen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3.5">
            Voraussetzungen nach &sect;626 BGB
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Eine fristlose Kündigung ist nur unter strengen Voraussetzungen wirksam.
            Fehlt auch nur eine, ist die Kündigung angreifbar.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-[740px] max-md:grid-cols-1">
            {[
              {
                title: 'Wichtiger Grund',
                desc: 'Es muss ein Sachverhalt vorliegen, der so schwerwiegend ist, dass die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der Kündigungsfrist unzumutbar wäre.',
              },
              {
                title: '2-Wochen-Frist',
                desc: 'Die Kündigung muss innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes ausgesprochen werden (§626 Abs. 2 BGB). Verspätung = unwirksam.',
              },
              {
                title: 'Verhältnismäßigkeit',
                desc: 'Die fristlose Kündigung muss das letzte Mittel (Ultima Ratio) sein. In der Regel muss vorher abgemahnt werden — nur bei schwersten Verstößen entfällt das.',
              },
              {
                title: 'Interessenabwägung',
                desc: 'Alter, Betriebszugehörigkeit, Unterhaltspflichten und bisheriges Verhalten werden berücksichtigt. Lange Betriebszugehörigkeit spricht gegen die fristlose Kündigung.',
              },
              {
                title: 'Betriebsratsanhörung',
                desc: 'Der Betriebsrat muss vor jeder Kündigung angehört werden (§102 BetrVG). Eine Kündigung ohne ordnungsgemäße Anhörung ist unwirksam.',
              },
              {
                title: 'Schriftform',
                desc: 'Die Kündigung muss schriftlich erfolgen und eigenhändig unterschrieben sein (§623 BGB). Eine mündliche oder per E-Mail ausgesprochene Kündigung ist nichtig.',
              },
            ].map((item) => (
              <div key={item.title} className="py-5 px-5 bg-white border border-border rounded-sm">
                <span className="font-semibold">{item.title}</span>
                <span className="block text-[0.84rem] text-ink-muted mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Fristlos gekündigt?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir prüfen Ihre fristlose Kündigung kostenlos und schätzen Ihre Chancen ein &mdash;
            innerhalb von 24 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* Fristlose Kündigung nach Jahren */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Nach Betriebszugehörigkeit
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Fristlose Kündigung nach Jahren im Betrieb
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-6">
            Wählen Sie Ihre Betriebszugehörigkeit &mdash; wir zeigen Ihnen, ob Ihre fristlose
            Kündigung wirksam ist und welche Abfindung möglich ist.
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

      {/* Cross-link cards */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link
              href="/kuendigung/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Verwandtes Thema
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Kündigung erhalten (ordentlich)?
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Ordentliche Kündigung mit Kündigungsfrist &mdash; Ihre Rechte und Abfindungsmöglichkeiten. &rarr;
              </span>
            </Link>
            <Link
              href="/abfindungsrechner/"
              className="block py-6 px-6 bg-cream border border-border rounded-sm no-underline text-ink hover:border-gold transition-all"
            >
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                Tool
              </div>
              <span className="font-serif text-[1.05rem] font-bold">
                Abfindung berechnen
              </span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">
                Wie hoch könnte Ihre Abfindung sein? Kostenlos berechnen. &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zur fristlosen Kündigung
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

      <AktuelleRechtslage />

      {/* CTA 3 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Die meisten fristlosen Kündigungen sind unwirksam.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihre fristlose Kündigung prüfen. In vielen Fällen erreichen wir
            die Umwandlung in eine ordentliche Kündigung &mdash; mit Abfindung.
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
