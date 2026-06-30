import Link from 'next/link';

/**
 * English-language sitewide legal disclaimer.
 *
 * The content makes clear that information on this site does not constitute
 * legal advice and that German labour law applies. CTA links to the free
 * consultation form on the English homepage.
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
              Legal notice
            </h2>
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              <strong>This website does not replace legal advice.</strong> All content is
              provided for general information only and does not constitute legally binding
              advice on any individual matter. A legally reliable assessment of your specific
              situation requires an individual review by a German employment-law specialist.
              Despite careful research, the legal position may change through new statutes
              or court decisions; we accept no liability for the accuracy or completeness
              of the information.
            </p>
          </div>
          <Link
            href="/en/#contact"
            className="inline-block whitespace-nowrap py-3.5 px-7 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.95rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] max-md:w-full max-md:text-center"
          >
            Free case review &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
