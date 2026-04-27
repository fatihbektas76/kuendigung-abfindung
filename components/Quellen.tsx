import type { Quelle, BagUrteil } from '@/lib/quellen-defaults';

interface QuellenProps {
  quellen: Quelle[];
  bagUrteile?: BagUrteil[];
}

export default function Quellen({ quellen, bagUrteile }: QuellenProps) {
  return (
    <section className="py-10 px-8 bg-cream border-t border-border">
      <div className="max-w-content mx-auto">
        <div className="max-w-[740px]">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
            Rechtsgrundlagen &amp; Quellen
          </div>
          <ul className="list-none space-y-2 text-[0.88rem]">
            {quellen.map((q) => (
              <li key={q.url}>
                <a
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  {q.text} &rarr;
                </a>
              </li>
            ))}
          </ul>

          {bagUrteile && bagUrteile.length > 0 && (
            <>
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3 mt-6">
                Rechtsprechung
              </div>
              <ul className="list-none space-y-2 text-[0.88rem]">
                {bagUrteile.map((u) => (
                  <li key={u.az}>
                    {u.url ? (
                      <a
                        href={u.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold no-underline hover:underline"
                      >
                        {u.az}, {u.datum} &mdash; {u.kernaussage} &rarr;
                      </a>
                    ) : (
                      <span className="text-ink-muted">
                        {u.az}, {u.datum} &mdash; {u.kernaussage}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
