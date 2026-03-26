'use client';

import { useState } from 'react';
import Link from 'next/link';
import { musterPages } from '@/lib/muster-data';
import { musterContent } from '@/lib/generated-muster-content';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Kann ich die Muster direkt verwenden?',
    a: 'Die Muster dienen als Orientierung und Ausgangspunkt. Sie sollten die Texte an Ihren individuellen Fall anpassen. Insbesondere bei der Kündigungsschutzklage empfehlen wir dringend, einen Fachanwalt hinzuzuziehen — Fehler in der Klageschrift können Ihre Rechte gefährden.',
  },
  {
    q: 'Muss ich bei einer Abmahnung widersprechen?',
    a: 'Nein, ein Widerspruch ist nicht zwingend erforderlich. Allerdings kann ein Widerspruch oder eine Gegendarstellung wichtig sein, wenn die Abmahnung als Vorstufe einer Kündigung dient. Das Bundesarbeitsgericht hat entschieden, dass ein fehlender Widerspruch nicht als Zustimmung gewertet werden darf.',
  },
  {
    q: 'Was ist der Unterschied zwischen Widerspruch und Gegendarstellung?',
    a: 'Ein Widerspruch fordert die Entfernung der Abmahnung aus der Personalakte. Eine Gegendarstellung stellt Ihre Sicht der Dinge dar und wird zusätzlich zur Abmahnung in die Personalakte aufgenommen. Sie haben nach § 83 Abs. 2 BetrVG das Recht, eine Gegendarstellung zur Personalakte zu geben.',
  },
  {
    q: 'Brauche ich für die Checklisten einen Anwalt?',
    a: 'Die Checklisten helfen Ihnen, wichtige Punkte im Aufhebungsvertrag oder in der Abmahnung selbst zu prüfen. Für eine vollständige rechtliche Bewertung und Verhandlung empfehlen wir jedoch immer die Beratung durch einen Fachanwalt für Arbeitsrecht.',
  },
];

export default function MusterOverviewPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <main>
      <SeoGeoBase
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Start', url: SEO_CONFIG.baseUrl },
          { name: 'Ratgeber', url: `${SEO_CONFIG.baseUrl}/ratgeber` },
          { name: 'Muster & Vorlagen', url: `${SEO_CONFIG.baseUrl}/ratgeber/muster` },
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
            <span>Muster &amp; Vorlagen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlose Vorlagen
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kostenlose Muster &amp; Vorlagen für Arbeitnehmer
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            Professionelle Mustertexte und Checklisten für Abmahnung, Kündigung und Aufhebungsvertrag.
            Kostenlos herunterladen und an Ihren Fall anpassen.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <section className="py-6 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="py-4 px-5 bg-cream rounded-sm border-l-[3px] border-gold max-w-[740px]">
            <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
              <strong>Hinweis:</strong> Diese Muster dienen ausschließlich zur Orientierung und ersetzen
              keine individuelle Rechtsberatung. Passen Sie die Texte an Ihren konkreten Fall an. Bei
              rechtlichen Fragen empfehlen wir dringend, einen Fachanwalt für Arbeitsrecht zu konsultieren.
            </p>
          </div>
        </div>
      </section>

      {/* Muster Cards */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {musterPages.map((entry, i) => {
              const content = (musterContent as unknown as Record<string, { title: string; intro: string }>)[entry.contentKey];
              return (
                <Link
                  key={entry.slug}
                  href={`/ratgeber/muster/${entry.slug}`}
                  className="block border border-border rounded-sm p-6 no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)] transition-all"
                >
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                    {entry.type === 'muster' ? `Vorlage ${i + 1}` : `Checkliste ${i - 2}`}
                  </div>
                  <h2 className="font-serif text-[1.15rem] font-bold text-ink mb-2">
                    {content?.title ?? entry.h1}
                  </h2>
                  <p className="text-[0.84rem] text-ink-muted leading-relaxed mb-3">
                    {content?.intro ? content.intro.slice(0, 150) + '...' : entry.description}
                  </p>
                  <span className="text-[0.84rem] font-semibold text-gold-dark">
                    {entry.type === 'muster' ? 'Muster ansehen' : 'Checkliste ansehen'} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu Mustern &amp; Vorlagen
          </h2>
          <div className="max-w-[740px]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full bg-none border-none cursor-pointer py-[22px] font-sans text-base font-semibold text-ink text-left flex justify-between items-center gap-4 hover:text-gold transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  {faq.q}
                  <span className={`text-[0.9rem] text-ink-muted min-w-[20px] text-center transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}>
                    &#9660;
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 text-[0.92rem] text-ink-light leading-relaxed ${faqOpen === i ? 'max-h-[500px] pb-[22px]' : 'max-h-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] py-4 px-5 border-l-[3px] border-border text-[0.82rem] text-ink-muted leading-relaxed">
            <strong>Haftungsausschluss:</strong> Die auf dieser Seite bereitgestellten Muster, Vorlagen und
            Checklisten dienen ausschließlich der allgemeinen Information und stellen keine Rechtsberatung
            im Sinne des Rechtsdienstleistungsgesetzes (RDG) dar. Eine Haftung für die Richtigkeit,
            Vollständigkeit und Aktualität der bereitgestellten Informationen wird nicht übernommen. Für
            eine verbindliche Rechtsberatung wenden Sie sich bitte an einen Fachanwalt für Arbeitsrecht.
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Muster allein reichen nicht?
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
