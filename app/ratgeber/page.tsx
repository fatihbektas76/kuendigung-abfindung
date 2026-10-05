import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import SeoGeoBase from '@/components/SeoGeoBase';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';
import { SEO_CONFIG, buildMetadata } from '@/lib/seo-config';

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: `Ratgeber Arbeitsrecht — Muster, Urteile & mehr (${new Date().getFullYear()})`,
  description:
    'Ratgeber Arbeitsrecht: Kostenlose Muster & Vorlagen, aktuelle BAG-Urteile und Praxis-Tipps für Arbeitnehmer. Vom Fachanwalt für Arbeitsrecht.',
  path: '/ratgeber',
});

const categories = [
  {
    eyebrow: 'Praxis-Artikel',
    title: 'Arbeitsrecht-Ratgeber',
    description:
      'Vertiefte Praxis-Artikel zu Kündigungsschutz, Kündigungsfristen, betriebsbedingter Kündigung und Abfindung — mit BAG-Urteilen, Gesetzes-Links und Beispielen.',
    href: '/ratgeber/arbeitsrecht',
    items: [
      'Wann gilt das Kündigungsschutzgesetz?',
      'Kündigungsschutzklage: Ablauf & Kosten',
      'Betriebsbedingte Kündigung & Sozialauswahl',
      'Kündigungsfristen nach § 622 BGB',
      'Abfindungstabelle nach Betriebszugehörigkeit',
    ],
  },
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
    eyebrow: 'Nachschlagewerk',
    title: 'Glossar Arbeitsrecht',
    description:
      'Die wichtigsten Begriffe im Arbeitsrecht — von Abfindung bis Zeugnis. Verständlich erklärt mit Rechtsgrundlage und weiterführenden Links.',
    href: '/glossar',
    items: [
      'Abfindung & Abfindungsformel',
      'Kündigungsschutzklage & Klagefrist',
      'Aufhebungsvertrag & Sperrzeit',
      'Sozialauswahl & Schwellenwert',
      'Sonderkündigungsschutz',
    ],
  },
  {
    eyebrow: 'Tools',
    title: 'Tools & Rechner',
    description:
      'Kostenlose Tools für Kündigung, Abfindung und Aufhebungsvertrag — schnell, verständlich, sofort nutzbar.',
    href: '/tools',
    items: [
      'Abfindungsrechner',
      'Kündigungscheck',
      'Aufhebungsvertrag prüfen',
    ],
  },
];

export default function RatgeberPage() {
  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/ratgeber/`}
        pageTitle="Ratgeber Arbeitsrecht für Arbeitnehmer"
        pageDescription="Ratgeber Arbeitsrecht: Kostenlose Muster & Vorlagen, aktuelle BAG-Urteile und Praxis-Tipps für Arbeitnehmer."
        pageType="WebPage"
        includeOrganization={false}
        includeRating={false}
        speakableSelectors={['.faq-section']}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber/` },
        ]}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Welche kostenlosen Muster gibt es für Arbeitnehmer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wir bieten kostenlose Muster und Vorlagen für Widerspruch gegen Abmahnung, Gegendarstellung, Checkliste Aufhebungsvertrag und Checkliste Abmahnung. Alle Vorlagen sind sofort verwendbar und an Ihren Fall anpassbar.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wo finde ich aktuelle Urteile zum Kündigungsschutz?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In unserem Ratgeber-Bereich „Aktuelle Urteile" finden Sie die wichtigsten BAG-Urteile zu Kündigung, Abfindung und Aufhebungsvertrag — verständlich erklärt und auf Ihre Situation angewendet.',
                },
              },
              {
                '@type': 'Question',
                name: 'Gibt es kostenlose Tools für die Abfindungsberechnung?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, wir bieten mehrere kostenlose Tools: den Abfindungsrechner zur Berechnung Ihrer voraussichtlichen Abfindung, den Kündigungscheck zur Ersteinschätzung Ihres Falls und den Schwellenwert-Rechner zur Prüfung, ob das Kündigungsschutzgesetz für Ihren Betrieb gilt.',
                },
              },
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


      {/* Aktuelle Artikel - prominently featured */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
            Aktuelle Artikel
          </div>
          <h2 className="font-serif text-[1.75rem] font-bold text-ink mb-6">
            Neu im Ratgeber
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/kuendigung-waehrend-krankheit/" className="block border border-border rounded-sm p-5 bg-white no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.1)] transition-all">
              <div className="text-[0.68rem] font-bold tracking-widest uppercase text-gold-dark mb-1.5">Mythos & Wahrheit</div>
              <h3 className="font-serif text-[1.1rem] font-bold text-ink leading-tight mb-2">Kündigung während Krankheit</h3>
              <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">Darf der Arbeitgeber während der Krankschreibung kündigen? Was wirklich schützt und wann die Kündigung angreifbar ist.</p>
            </Link>
            <Link href="/freistellung-nach-kuendigung/" className="block border border-border rounded-sm p-5 bg-white no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.1)] transition-all">
              <div className="text-[0.68rem] font-bold tracking-widest uppercase text-gold-dark mb-1.5">BAG-Urteil 2026</div>
              <h3 className="font-serif text-[1.1rem] font-bold text-ink leading-tight mb-2">Freistellung nach Kündigung</h3>
              <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">BAG 5 AZR 108/25: Standardklauseln sind unwirksam. Folgen für Dienstwagen, Urlaub und Abfindung.</p>
            </Link>
            <Link href="/urlaubsabgeltung-rechner/" className="block border border-border rounded-sm p-5 bg-white no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.1)] transition-all">
              <div className="text-[0.68rem] font-bold tracking-widest uppercase text-gold-dark mb-1.5">Rechner</div>
              <h3 className="font-serif text-[1.1rem] font-bold text-ink leading-tight mb-2">Urlaubsabgeltung berechnen</h3>
              <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">Nicht genommener Urlaub bei Kündigung: § 7 Abs. 4 BUrlG mit korrekter Bruchteil-Rundung.</p>
            </Link>
          </div>
        </div>
      </section>

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

      {/* Share */}
      <section className="px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <ShareButtons url="/ratgeber/" title="Ratgeber Arbeitsrecht für Arbeitnehmer" />
          </div>
        </div>
      </section>

      {/* BERT-Interlinker: Weitere relevante Themen */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath="/ratgeber" />
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
