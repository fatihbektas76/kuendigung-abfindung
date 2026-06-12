import Link from 'next/link';

/**
 * Sitewide legal disclaimer: clarifies that the content does not constitute
 * legal advice, plus a CTA to book a free consultation.
 *
 * Rendered once in LayoutClient so it appears above the Footer on every page.
 */
export default function LegalDisclaimer() {
  return (
    <section
      aria-labelledby="legal-disclaimer-heading"
      className="border-t border-border bg-cream"
    >
      <div className="max-w-content mx-auto px-8 py-10">
        <div className="grid grid-cols-[1fr_auto] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div>
            <h2
              id="legal-disclaimer-heading"
              className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2"
            >
              Rechtlicher Hinweis
            </h2>
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              <strong>Diese Webseite ersetzt keine anwaltliche Beratung.</strong> Alle Inhalte
              dienen ausschließlich der allgemeinen Information und stellen keine rechtsverbindliche
              Auskunft im Einzelfall dar. Für eine rechtssichere Bewertung Ihres konkreten Falls
              ist eine individuelle Prüfung durch einen Fachanwalt für Arbeitsrecht erforderlich.
              Trotz sorgfältiger Recherche kann sich die Rechtslage durch neue Gesetze oder Urteile
              ändern; eine Haftung für die Aktualität und Vollständigkeit der Informationen wird
              nicht übernommen.
            </p>
          </div>
          <Link
            href="/#kontakt"
            className="inline-block whitespace-nowrap py-3.5 px-7 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.95rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] max-md:w-full max-md:text-center"
          >
            Kostenlose Ersteinschätzung &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
