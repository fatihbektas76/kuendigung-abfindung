import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { urteile } from '@/lib/urteile';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG, buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Aktuelle Urteile: Kündigung & Abfindung (${new Date().getFullYear()})`,
  description:
    'Wichtige BAG-Urteile zu Kündigung, Abfindung, Aufhebungsvertrag und Abmahnung. Laufend aktualisiert. Was die Rechtsprechung für Arbeitnehmer bedeutet.',
  path: '/ratgeber/urteile',
});

const faqs = [
  {
    q: 'Warum sind BAG-Urteile für meinen Fall relevant?',
    a: 'Das Bundesarbeitsgericht (BAG) ist die höchste Instanz im deutschen Arbeitsrecht. Seine Urteile prägen die Rechtsprechung aller Arbeitsgerichte. Wenn ein BAG-Urteil zu einer ähnlichen Frage existiert, wird Ihr Arbeitsgericht diesem in der Regel folgen. BAG-Urteile stärken oder schwächen Ihre Position erheblich.',
  },
  {
    q: 'Sind diese Urteile noch aktuell?',
    a: 'Ja, alle hier aufgeführten Urteile sind nach wie vor die maßgebliche Rechtsprechung in ihrem jeweiligen Bereich. BAG-Urteile behalten ihre Gültigkeit, solange sie nicht durch neuere Entscheidungen aufgehoben oder modifiziert werden. Wir aktualisieren diese Seite regelmäßig.',
  },
  {
    q: 'Kann ich mich auf ein BAG-Urteil berufen?',
    a: 'Grundsätzlich ja. BAG-Urteile haben zwar keine formelle Bindungswirkung wie Gesetze, werden aber von allen Arbeitsgerichten als Leitentscheidungen berücksichtigt. Ihr Fachanwalt wird die relevanten Urteile in Ihrem Verfahren zitieren und auf Ihren konkreten Fall anwenden.',
  },
];

export default function UrteilePage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/ratgeber/urteile/`}
        pageTitle="Aktuelle Urteile zu Kündigung und Abfindung"
        pageDescription="Die wichtigsten BAG-Urteile für Arbeitnehmer — verständlich erklärt und auf Ihre Situation angewendet."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
          { name: 'Urteile', url: `${SEO_CONFIG.baseUrl}/ratgeber/urteile/` },
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
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">Ratgeber</Link>
            <span className="mx-2">/</span>
            <span>Urteile</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Rechtsprechung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Aktuelle Urteile zu Kündigung und Abfindung
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            Die wichtigsten BAG-Urteile für Arbeitnehmer &mdash; verständlich erklärt und auf Ihre Situation
            angewendet. Laufend aktualisiert.
          </p>
        </div>
      </div>

      {/* Urteile Grid */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {urteile.map((u) => (
              <Link
                key={u.az}
                href={`/urteile/${u.slug}/`}
                className="block border border-border rounded-sm overflow-hidden no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)] transition-all cursor-pointer"
              >
                <div className="bg-[#1C1408] p-5 border-b-[3px] border-gold">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold">
                      {u.gericht}
                    </span>
                    <span className="text-[0.72rem] text-white/50">{u.jahr}</span>
                  </div>
                  <div className="font-serif text-[1.1rem] font-bold text-white">
                    Az. {u.az}
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{u.titel}</h3>
                  <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-3">{u.kurzfassung}</p>
                  <div className="py-3 px-4 bg-cream rounded-sm border-l-[3px] border-gold">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
                      Bedeutung für Sie
                    </div>
                    <p className="text-[0.84rem] text-ink leading-relaxed m-0">{u.bedeutung}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="inline-block py-1 px-3 rounded-full border border-border text-[0.75rem] font-semibold text-ink-muted">
                      {u.kategorie}
                    </span>
                    <span className="text-[0.88rem] font-semibold text-gold-dark">
                      Urteil lesen &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Welches Urteil ist für Ihren Fall relevant?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Wir analysieren die Rechtsprechung für Ihren konkreten Fall und nutzen die
            relevanten Urteile zu Ihrem Vorteil &mdash; kostenlose Ersteinschätzung.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu BAG-Urteilen
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Die Rechtsprechung auf Ihrer Seite nutzen.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Ein Fachanwalt kennt die aktuelle Rechtsprechung und wendet sie auf Ihren Fall an.
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
