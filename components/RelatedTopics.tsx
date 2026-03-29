import Link from 'next/link';

const allTopics = [
  {
    key: 'kuendigung',
    href: '/kuendigung/',
    title: 'Kündigung erhalten',
    desc: 'Rechte, Fristen und Sofortmaßnahmen nach einer Kündigung.',
  },
  {
    key: 'abfindung',
    href: '/abfindung/',
    title: 'Abfindung',
    desc: 'Anspruch, Höhe und Verhandlungstipps zur Abfindung.',
  },
  {
    key: 'aufhebungsvertrag',
    href: '/aufhebungsvertrag/',
    title: 'Aufhebungsvertrag',
    desc: 'Sperrzeit vermeiden, Abfindung maximieren, Vertrag prüfen.',
  },
  {
    key: 'fristlose-kuendigung',
    href: '/fristlose-kuendigung/',
    title: 'Fristlose Kündigung',
    desc: 'Voraussetzungen nach §626 BGB und Ihre Optionen.',
  },
  {
    key: 'abmahnung',
    href: '/abmahnung/',
    title: 'Abmahnung',
    desc: 'Wirksamkeit prüfen, Widerspruch und Gegendarstellung.',
  },
  {
    key: 'abfindungsrechner',
    href: '/abfindungsrechner/',
    title: 'Abfindungsrechner',
    desc: 'Berechnen Sie Ihre voraussichtliche Abfindung in 30 Sekunden.',
  },
];

interface RelatedTopicsProps {
  /** Key of the current page to exclude from the list */
  current: string;
}

export default function RelatedTopics({ current }: RelatedTopicsProps) {
  const topics = allTopics.filter((t) => t.key !== current);

  return (
    <section className="py-[70px] px-8 bg-cream">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Weiterführende Themen
        </div>
        <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
          Das könnte Sie auch interessieren
        </h2>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {topics.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className="block py-5 px-5 bg-white border border-border rounded-sm no-underline text-ink hover:border-gold hover:text-gold-dark transition-all"
            >
              <span className="font-semibold">{t.title}</span>
              <span className="block text-[0.84rem] text-ink-muted mt-1">{t.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
