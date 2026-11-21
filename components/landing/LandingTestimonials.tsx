import { SEO_CONFIG } from '@/lib/seo-config';

/**
 * Social-Proof-Block mit echten Mandanten-Stimmen von anwalt.de.
 *
 * TODO vor dem ersten Ad-Launch: die anwalt.de-Reviews durch 2–3 echte
 * Mandats-Testimonials mit Initialen + Region + Abfindungs-Summe ersetzen,
 * sobald die Zustimmungen der Mandanten vorliegen. Format:
 *   quote: "…"
 *   author: "M. K."
 *   region: "Rhein-Neckar"
 *   outcome: "Abfindung 48.000 €"
 *
 * CXL-Studien: Testimonials mit Foto/Name und konkreten Zahlen heben
 * Conversion stärker als anonyme Sterne-Signale.
 */
export default function LandingTestimonials() {
  // Vorerst: die drei dokumentierten anwalt.de-Reviews aus SEO_CONFIG.
  // Wir zeigen davon zwei – wichtig ist Qualität über Quantität.
  const reviews = SEO_CONFIG.reviews.slice(0, 2);

  return (
    <section className="rounded-xl border border-black/10 bg-[#faf7ee] p-5 md:p-7">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-[1.1rem] font-semibold text-ink md:text-[1.2rem]">
          Was Mandanten über die Zusammenarbeit sagen
        </h2>
        <span className="text-[0.75rem] text-ink-muted">
          <a
            href="https://www.anwalt.de/fatihbektas"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline underline-offset-2 hover:text-[#6B6626]"
          >
            Quelle: anwalt.de ↗
          </a>
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r) => (
          <figure
            key={r.author.name}
            className="relative rounded-lg border border-black/5 bg-white p-4"
          >
            <span className="absolute -top-2 -left-1 font-serif text-[2.2rem] leading-none text-[#d4c98a]" aria-hidden="true">
              &bdquo;
            </span>
            <blockquote className="relative pl-3 text-[0.92rem] leading-relaxed text-ink-light">
              {r.reviewBody}
            </blockquote>
            <figcaption className="mt-3 flex items-center justify-between gap-2 border-t border-black/5 pt-3 text-[0.78rem]">
              <span className="font-semibold text-ink">{r.author.name}</span>
              <span className="text-[#BA7517]" aria-hidden="true">★★★★★</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
