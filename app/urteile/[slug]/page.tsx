import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { urteile, getUrteil } from '@/lib/urteile';
import StandAnzeige from '@/components/StandAnzeige';

export const revalidate = 86400;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return urteile.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const urteil = getUrteil(params.slug);
  if (!urteil) return {};
  const title = `${urteil.titel} — ${urteil.gericht} ${urteil.az} (${new Date().getFullYear()})`;
  const description = urteil.kurzfassung.slice(0, 155) + '...';
  const url = `${BASE_URL}/urteile/${urteil.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary', title, description },
  };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i <= count ? '#A68B4B' : 'none'}
          stroke="#A68B4B"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function UrteilDetailPage({ params }: Props) {
  const urteil = getUrteil(params.slug);
  if (!urteil) notFound();

  const verwandte = urteil.verwandteUrteile
    .map((slug) => getUrteil(slug))
    .filter(Boolean);

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
              { '@type': 'ListItem', position: 2, name: 'Rechtsprechung', item: `${BASE_URL}/ratgeber/urteile` },
              { '@type': 'ListItem', position: 3, name: urteil.titel, item: `${BASE_URL}/urteile/${urteil.slug}` },
            ],
          }),
        }}
      />

      {/* Schema.org - Article + LegalCase */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: urteil.titel,
            datePublished: `${urteil.jahr}-01-01`,
            dateModified: new Date().toISOString().slice(0, 10),
            description: urteil.kurzfassung,
            author: {
              '@type': 'Person',
              name: 'Fatih Bektas',
              jobTitle: 'Fachanwalt für Arbeitsrecht',
            },
            about: {
              '@type': 'Thing',
              name: `${urteil.gericht}, Urteil vom ${urteil.datum}, Az. ${urteil.az}`,
              description: urteil.leitsatz,
            },
            publisher: {
              '@id': `${BASE_URL}/#organization`,
            },
            mainEntityOfPage: `${BASE_URL}/urteile/${urteil.slug}/`,
            inLanguage: 'de',
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber/urteile" className="text-gold no-underline hover:underline">
              Rechtsprechung
            </Link>
            <span className="mx-2">/</span>
            <span>{urteil.titel}</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            {urteil.gericht} &middot; {urteil.senat}
          </div>
          <div className="flex items-baseline gap-4 flex-wrap mb-3">
            <span className="font-serif text-[1.1rem] font-bold text-ink">Az. {urteil.az}</span>
            <span className="text-[0.88rem] text-ink-muted">Urteil vom {urteil.datum}</span>
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            {urteil.titel}
          </h1>
          <span className="inline-block mt-4 py-1 px-3 rounded-full border border-gold/30 text-[0.75rem] font-semibold text-gold-dark bg-gold-bg">
            {urteil.kategorie}
          </span>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            {urteil.kurzfassung}
          </p>
        </div>
      </div>

      {/* Quellenbox */}
      <section className="py-8 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/30 rounded-sm p-5 bg-gold-bg">
            <div className="flex items-start gap-3">
              <svg
                className="min-w-[20px] text-gold mt-0.5"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <div>
                <div className="text-[0.88rem] font-semibold text-ink mb-1">
                  Originalentscheidung: {urteil.gericht}
                </div>
                <a
                  href={urteil.gerichtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.88rem] text-gold-dark no-underline hover:underline break-all"
                >
                  Entscheidung aufrufen &rarr;
                </a>
                <p className="text-[0.78rem] text-ink-muted mt-2 m-0 leading-relaxed">
                  Diese Zusammenfassung basiert auf der Originalentscheidung des {urteil.gericht}.
                  Alle Angaben ohne Gewähr — maßgeblich ist stets der Originaltext.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Content */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-[1fr_340px] gap-10 items-start max-lg:grid-cols-1">
            {/* Left Column - Content */}
            <div>
              {/* Sachverhalt */}
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold mb-4">
                Sachverhalt
              </h2>
              {urteil.sachverhalt.split('\n\n').map((p, i) => (
                <p key={i} className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
                  {p}
                </p>
              ))}

              {/* Entscheidung */}
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold mb-4 mt-10">
                Entscheidung des Gerichts
              </h2>
              {urteil.entscheidung.split('\n\n').map((p, i) => (
                <p key={i} className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
                  {p}
                </p>
              ))}

              {/* Begründung */}
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold mb-4 mt-10">
                Begründung
              </h2>
              {urteil.begruendung.split('\n\n').map((p, i) => (
                <p key={i} className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
                  {p}
                </p>
              ))}

              {/* Leitsatz */}
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold mb-4 mt-10">
                Leitsatz
              </h2>
              <blockquote className="border-l-[3px] border-gold pl-5 py-3 my-6 bg-cream rounded-r-sm">
                <p className="font-serif text-[1rem] text-ink italic leading-relaxed m-0">
                  &bdquo;{urteil.leitsatz}&ldquo;
                </p>
              </blockquote>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:sticky lg:top-[140px]">
              {/* Bewertung Card */}
              <div className="border border-border rounded-sm overflow-hidden">
                <div className="bg-[#1C1408] p-5 border-b-[3px] border-gold">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-3">
                    Einschätzung vom Fachanwalt
                  </div>
                  <Stars count={urteil.bewertung.sterne} />
                  <p className="text-[0.88rem] text-white/80 leading-relaxed mt-3 mb-0">
                    {urteil.bewertung.text}
                  </p>
                </div>
                <div className="bg-white">
                  {/* Für Arbeitnehmer */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-green rounded-full" />
                      <h3 className="text-[0.82rem] font-semibold text-ink m-0">Für Arbeitnehmer</h3>
                    </div>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                      {urteil.bewertung.fuerArbeitnehmer}
                    </p>
                  </div>
                  {/* Für Arbeitgeber */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-gold rounded-full" />
                      <h3 className="text-[0.82rem] font-semibold text-ink m-0">Für Arbeitgeber</h3>
                    </div>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                      {urteil.bewertung.fuerArbeitgeber}
                    </p>
                  </div>
                  {/* Praxishinweis */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-blue rounded-full" />
                      <h3 className="text-[0.82rem] font-semibold text-ink m-0">Praxishinweis</h3>
                    </div>
                    <p className="text-[0.82rem] text-ink-muted leading-relaxed m-0">
                      {urteil.bewertung.praxishinweis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bedeutung Box */}
              <div className="mt-5 py-4 px-5 bg-cream rounded-sm border-l-[3px] border-gold">
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
                  Bedeutung für Sie
                </div>
                <p className="text-[0.84rem] text-ink leading-relaxed m-0">
                  {urteil.bedeutung}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="pb-10 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex flex-wrap gap-2">
            {urteil.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block py-1 px-3 rounded-full border border-border text-[0.75rem] font-semibold text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Verwandte Urteile */}
      {verwandte.length > 0 && (
        <section className="py-[70px] px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Weitere Entscheidungen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Verwandte Urteile
            </h2>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {verwandte.map((u) =>
                u ? (
                  <Link
                    key={u.slug}
                    href={`/urteile/${u.slug}/`}
                    className="block border border-border rounded-sm overflow-hidden no-underline hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)] transition-all"
                  >
                    <div className="bg-[#1C1408] p-4 border-b-[3px] border-gold">
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold">
                          {u.gericht}
                        </span>
                        <span className="text-[0.7rem] text-white/50">{u.jahr}</span>
                      </div>
                      <div className="font-serif text-[0.95rem] font-bold text-white">
                        Az. {u.az}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-serif text-[0.92rem] font-bold text-ink mb-2">
                        {u.titel}
                      </h3>
                      <span className="inline-block py-0.5 px-2.5 rounded-full border border-border text-[0.7rem] font-semibold text-ink-muted">
                        {u.kategorie}
                      </span>
                      <div className="mt-3 text-[0.82rem] font-semibold text-gold-dark">
                        Urteil lesen &rarr;
                      </div>
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Gilt dieses Urteil für Ihre Situation?
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihren Fall anhand der aktuellen Rechtsprechung —
            kostenlos und innerhalb von 24 Stunden.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlos prüfen lassen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
