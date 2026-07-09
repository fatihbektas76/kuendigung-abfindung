import Image from 'next/image';

/**
 * Kompakter Autor-Streifen für Above-The-Fold-Positionierung auf
 * Ratgeber-Seiten. E-E-A-T-Signal, das Google und LLMs sofort beim
 * Crawl der ersten Sektion sehen — im Gegensatz zum großen AuthorBox
 * am Artikelende, der oft erst nach Scroll geladen wird.
 *
 * Die Rating-Zeile ist bewusst clickable auf anwalt.de: Google hat
 * mehrfach dokumentiert, dass externe Bestätigung der Autor-Identität
 * (sameAs mit Rating-Quelle) für YMYL-Inhalte (Legal, Health, Finance)
 * ein starkes Autoritätssignal ist.
 */

interface AuthorBylineProps {
  /** Optionales Aktualisierungsdatum („Aktualisiert am …") */
  updatedIso?: string;
  /** Optionales Erstveröffentlichungsdatum */
  publishedIso?: string;
  /** Reviewer-Notiz (z. B. „Fachlich geprüft von …") — Standard ist leer */
  reviewedBy?: string;
  /** Nur einen dünneren Border verwenden (in weißen Sections) */
  compact?: boolean;
}

function formatGermanDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso;
  const [y, m, d] = iso.split('T')[0].split('-');
  return `${d}.${m}.${y}`;
}

export default function AuthorByline({
  updatedIso,
  publishedIso,
  compact = false,
}: AuthorBylineProps) {
  return (
    <div
      className={`flex items-center gap-3 flex-wrap py-3 ${
        compact ? 'border-t border-b border-border-light' : 'border-y border-border'
      } my-4`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border-light">
        <Image
          src="/Fatih.webp"
          alt="Fatih Bektas, Fachanwalt für Arbeitsrecht"
          width={40}
          height={40}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[0.86rem] text-ink leading-tight">
          Verfasst von{' '}
          <a
            href="/autor/fatih-bektas/"
            className="font-semibold text-ink hover:text-gold-dark no-underline transition-colors"
          >
            Fatih Bektas
          </a>
          , Fachanwalt für Arbeitsrecht
        </div>
        <div className="text-[0.76rem] text-ink-muted leading-tight mt-0.5">
          Zulassung seit 2005 · Fachanwalt seit 2011 · APOS Legal Heidelberg
        </div>
      </div>

      <a
        href="https://www.anwalt.de/fatihbektas"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 py-1 px-2 border border-gold/40 rounded-sm bg-white text-[0.78rem] hover:border-gold hover:bg-gold-bg no-underline transition-all"
        aria-label="Bewertungen von Fatih Bektas auf anwalt.de ansehen"
      >
        <span className="text-gold-dark" aria-hidden="true">
          ★★★★★
        </span>
        <span className="font-semibold text-ink">5,0</span>
        <span className="text-ink-muted">· 68 auf anwalt.de</span>
      </a>

      {(updatedIso || publishedIso) && (
        <div className="text-[0.72rem] text-ink-muted basis-full sm:basis-auto">
          {updatedIso ? (
            <>
              Aktualisiert am{' '}
              <time dateTime={updatedIso}>{formatGermanDate(updatedIso)}</time>
            </>
          ) : publishedIso ? (
            <>
              Veröffentlicht am{' '}
              <time dateTime={publishedIso}>{formatGermanDate(publishedIso)}</time>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
