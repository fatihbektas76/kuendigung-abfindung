import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export const metadata: Metadata = {
  title: 'Ratgeber Arbeitsrecht — Muster, Urteile & mehr (2026)',
  description:
    'Ratgeber Arbeitsrecht: Kostenlose Muster & Vorlagen, aktuelle BAG-Urteile und Praxis-Tipps für Arbeitnehmer. Vom Fachanwalt für Arbeitsrecht.',
  alternates: {
    canonical: `${BASE_URL}/ratgeber`,
  },
};

const categories = [
  {
    eyebrow: 'Vorlagen & Checklisten',
    title: 'Muster & Vorlagen',
    description:
      'Kostenlose Mustertexte und Checklisten für Abmahnung, Kündigung und Aufhebungsvertrag. Sofort verwendbar und an Ihren Fall anpassbar.',
    href: '/ratgeber/muster',
    items: [
      'Widerspruch gegen Abmahnung',
      'Gegendarstellung zur Abmahnung',
      'Kündigungsschutzklage (vereinfacht)',
      'Checkliste Aufhebungsvertrag',
      'Checkliste Abmahnung',
    ],
  },
  {
    eyebrow: 'Rechtsprechung',
    title: 'Aktuelle Urteile',
    description:
      'Die wichtigsten BAG-Urteile zu Kündigung, Abfindung und Aufhebungsvertrag — verständlich erklärt und auf Ihre Situation angewendet.',
    href: '/ratgeber/urteile',
    items: [
      'Kündigungsschutz & Schwellenwert',
      'Abmahnung vor Kündigung',
      'Aufhebungsvertrag & faires Verhandeln',
      'Sozialauswahl bei Kündigung',
      'Besonderer Kündigungsschutz',
    ],
  },
  {
    eyebrow: 'Berechnung',
    title: 'Abfindungsrechner',
    description:
      'Berechnen Sie Ihre voraussichtliche Abfindung in 30 Sekunden. Drei Szenarien basierend auf der gängigen Abfindungsformel.',
    href: '/abfindungsrechner',
    items: [
      'Bruttomonatsgehalt eingeben',
      'Betriebszugehörigkeit angeben',
      'Sofort Ergebnis erhalten',
    ],
  },
];

export default function RatgeberPage() {
  return (
    <main>
      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${BASE_URL}/ratgeber` },
            ],
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <span>Ratgeber</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Wissen & Werkzeuge
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Ratgeber Arbeitsrecht für Arbeitnehmer
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            Kostenlose Muster, aktuelle Urteile und praktische Tools &mdash;
            alles, was Sie nach einer Kündigung oder Abmahnung brauchen.
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block border border-border rounded-sm overflow-hidden no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)] transition-all"
              >
                <div className="p-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    {cat.eyebrow}
                  </div>
                  <h2 className="font-serif text-[1.3rem] font-bold text-ink mb-2">{cat.title}</h2>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">{cat.description}</p>
                  <ul className="list-none space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[0.82rem] text-ink-muted">
                        <span className="text-gold mt-0.5">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-[0.88rem] font-semibold text-gold-dark">
                    Mehr erfahren &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Persönliche Beratung
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Ratgeber allein reichen nicht?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihren Fall von einem Fachanwalt prüfen &mdash; kostenlose Ersteinschätzung
            innerhalb von 24 Stunden.
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
