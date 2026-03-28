import Link from 'next/link';

const topStaedte = [
  { name: 'Berlin', slug: 'berlin' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'München', slug: 'muenchen' },
  { name: 'Köln', slug: 'koeln' },
  { name: 'Frankfurt', slug: 'frankfurt' },
  { name: 'Stuttgart', slug: 'stuttgart' },
  { name: 'Düsseldorf', slug: 'duesseldorf' },
  { name: 'Dortmund', slug: 'dortmund' },
  { name: 'Leipzig', slug: 'leipzig' },
  { name: 'Hannover', slug: 'hannover' },
  { name: 'Nürnberg', slug: 'nuernberg' },
  { name: 'Heidelberg', slug: 'heidelberg' },
];

export default function StandortTeaser() {
  return (
    <section className="py-[70px] px-8 bg-cream max-md:py-[50px] max-md:px-6">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Bundesweit für Sie da
        </div>
        <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
          Fachanwalt für Arbeitsrecht in Ihrer Nähe
        </h2>
        <p className="text-[1rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
          Wir vertreten Arbeitnehmer in ganz Deutschland &mdash; vollständig digital,
          persönlich erreichbar. Finden Sie Ihr zuständiges Arbeitsgericht und
          regionale Informationen zu Kündigung &amp; Abfindung.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {topStaedte.map((stadt) => (
            <Link
              key={stadt.slug}
              href={`/arbeitsrecht-anwalt/${stadt.slug}`}
              className="bg-white border border-border rounded-sm py-3 px-4 text-[0.88rem] font-medium text-ink no-underline transition-all hover:border-gold hover:text-gold-dark hover:bg-gold-bg"
            >
              {stadt.name}
            </Link>
          ))}
        </div>

        <Link
          href="/arbeitsrecht-anwalt"
          className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-gold-dark no-underline hover:underline"
        >
          Alle {106} Orte anzeigen &rarr;
        </Link>
      </div>
    </section>
  );
}
