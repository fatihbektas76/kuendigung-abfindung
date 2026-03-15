import Link from 'next/link';
import FadeUp from './FadeUp';

const disputes = [
  {
    title: 'Kündigungsschutzklage',
    badge: 'Kernleistung',
    desc: 'Klage gegen unwirksame Kündigung vor dem Arbeitsgericht. 3-Wochen-Frist beachten (§4 KSchG). Betriebsbedingt, personenbedingt, verhaltensbedingt.',
    href: '/kuendigung',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    delay: 0,
  },
  {
    title: 'Abfindung verhandeln',
    badge: 'Kernleistung',
    desc: 'Durchsetzung angemessener Abfindung. Faustformel: 0,5 Monatsgehälter \u00D7 Betriebszugehörigkeit. Oft deutlich mehr möglich.',
    href: '/abfindung',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
    ),
    delay: 1,
  },
  {
    title: 'Aufhebungsvertrag prüfen',
    badge: 'Kernleistung',
    desc: 'Prüfung und Verhandlung von Aufhebungsverträgen. Abfindungshöhe, Sperrzeit, Zeugnis, Wettbewerbsverbot, Freistellung.',
    href: '/aufhebungsvertrag',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    delay: 2,
  },
  {
    title: 'Fristlose Kündigung',
    badge: '§626 BGB',
    desc: 'Prüfung der Rechtmäßigkeit. 2-Wochen-Frist des Arbeitgebers. Die meisten fristlosen Kündigungen scheitern vor Gericht.',
    href: null,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l3 3" />
      </svg>
    ),
    delay: 3,
  },
  {
    title: 'Abmahnung & Vorstufen',
    badge: 'Prävention',
    desc: 'Prüfung der Rechtmäßigkeit von Abmahnungen. Formfehler können eine spätere Kündigung zu Fall bringen.',
    href: null,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    delay: 0,
  },
  {
    title: 'Zeugnis & Abschlussregelungen',
    badge: 'Abschluss',
    desc: 'Qualifiziertes Arbeitszeugnis, Resturlaub, Überstunden, Bonusansprüche, Wettbewerbsverbote.',
    href: null,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    delay: 1,
  },
];

export default function Disputes() {
  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="leistungen">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Unsere Leistungen
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Von der Kündigungsschutzklage bis zur Abfindungsverhandlung
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed">
          Wir vertreten Arbeitnehmer im gesamten Spektrum des Kündigungsschutzrechts.
        </p>
        <div className="grid grid-cols-2 gap-5 mt-10 max-md:grid-cols-1">
          {disputes.map((d) => {
            const card = (
              <article className={`bg-white border border-border-light rounded py-[30px] px-7 flex items-start gap-[18px] transition-all border-l-[3px] border-l-transparent hover:border-l-gold hover:translate-x-1${d.href ? ' h-full' : ''}`}>
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  {d.icon}
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-bold mb-1.5">
                    {d.title}{' '}
                    <span className="inline-block text-[0.62rem] font-bold text-green bg-green-bg rounded-[3px] px-[7px] py-[2px] tracking-wider uppercase ml-2 align-middle">
                      {d.badge}
                    </span>
                  </h3>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed">{d.desc}</p>
                  {d.href && (
                    <span className="text-[0.82rem] text-gold-dark font-semibold mt-2 inline-block">
                      Mehr erfahren &rarr;
                    </span>
                  )}
                </div>
              </article>
            );
            return (
              <FadeUp key={d.title} delay={d.delay}>
                {d.href ? (
                  <Link href={d.href} className="no-underline text-inherit block">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
