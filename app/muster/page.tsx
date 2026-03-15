'use client';

import { useState } from 'react';
import Link from 'next/link';
import { musterContent } from '@/lib/generated-muster-content';

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 py-2 px-4 bg-white border border-border rounded-sm text-[0.82rem] font-semibold text-ink cursor-pointer hover:border-gold hover:text-gold-dark transition-all"
    >
      {copied ? (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Kopieren
        </>
      )}
    </button>
  );
}

function MusterSection({ title, intro, muster }: { title: string; intro: string; muster: string }) {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-3">
        {title}
      </h2>
      <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">{intro}</p>
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={muster.replace(/\\n/g, '\n')} />
        </div>
        <pre className="bg-[#f5f3ee] border border-border rounded-sm p-6 pr-32 text-[0.84rem] text-ink leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
          {muster}
        </pre>
      </div>
      <div className="mt-5">
        <a
          href="/#kontakt"
          className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
        >
          Ihren Fall kostenlos prüfen lassen &rarr;
        </a>
      </div>
    </div>
  );
}

function ChecklisteSection({ title, intro, punkte }: { title: string; intro: string; punkte: string[] }) {
  return (
    <div>
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-3">
        {title}
      </h2>
      <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">{intro}</p>
      <div className="space-y-3">
        {punkte.map((punkt, i) => (
          <div key={i} className="flex gap-3 py-3 px-4 bg-[#f5f3ee] border border-border rounded-sm">
            <div className="w-7 h-7 min-w-[28px] rounded-sm border-2 border-gold flex items-center justify-center font-serif text-[0.85rem] font-bold text-gold-dark mt-0.5">
              {i + 1}
            </div>
            <p className="text-[0.88rem] text-ink leading-relaxed m-0">{punkt}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <a
          href="/#kontakt"
          className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
        >
          Ihren Fall kostenlos prüfen lassen &rarr;
        </a>
      </div>
    </div>
  );
}

export default function MusterPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
              { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.gekuendigt-abfindung.de' },
              { '@type': 'ListItem', position: 2, name: 'Muster & Vorlagen', item: 'https://www.gekuendigt-abfindung.de/muster' },
            ],
          }),
        }}
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

      {/* Muster 1: Widerspruch */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Vorlage 1
            </div>
            <MusterSection
              title={musterContent.widerspruchAbmahnung.title}
              intro={musterContent.widerspruchAbmahnung.intro}
              muster={musterContent.widerspruchAbmahnung.muster}
            />
          </div>
        </div>
      </section>

      {/* Muster 2: Gegendarstellung */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Vorlage 2
            </div>
            <MusterSection
              title={musterContent.gegendarstellungAbmahnung.title}
              intro={musterContent.gegendarstellungAbmahnung.intro}
              muster={musterContent.gegendarstellungAbmahnung.muster}
            />
          </div>
        </div>
      </section>

      {/* Muster 3: Kündigungsschutzklage */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Vorlage 3
            </div>
            <MusterSection
              title={musterContent.kuendigungsschutzklage.title}
              intro={musterContent.kuendigungsschutzklage.intro}
              muster={musterContent.kuendigungsschutzklage.muster}
            />
          </div>
        </div>
      </section>

      {/* Checkliste 1: Aufhebungsvertrag */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Checkliste 1
            </div>
            <ChecklisteSection
              title={musterContent.aufhebungsvertragCheckliste.title}
              intro={musterContent.aufhebungsvertragCheckliste.intro}
              punkte={musterContent.aufhebungsvertragCheckliste.punkte}
            />
          </div>
        </div>
      </section>

      {/* Checkliste 2: Abmahnung */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Checkliste 2
            </div>
            <ChecklisteSection
              title={musterContent.abmahnungCheckliste.title}
              intro={musterContent.abmahnungCheckliste.intro}
              punkte={musterContent.abmahnungCheckliste.punkte}
            />
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
