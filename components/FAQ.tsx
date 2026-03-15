'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Habe ich Anspruch auf eine Abfindung nach einer Kündigung?',
    a: 'Einen gesetzlichen Abfindungsanspruch gibt es nur in wenigen Fällen, z.\u00A0B. nach §1a KSchG, wenn der Arbeitgeber die Kündigung mit einem Abfindungsangebot verbindet. In der Praxis wird eine Abfindung jedoch in den meisten Fällen im Rahmen einer Kündigungsschutzklage oder eines Aufhebungsvertrags ausgehandelt. Die übliche Faustformel lautet: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr.',
  },
  {
    q: 'Wie lange habe ich Zeit, gegen eine Kündigung vorzugehen?',
    a: 'Die Klagefrist beträgt nur 3 Wochen ab Zugang der Kündigung (§4 KSchG). Verpassen Sie diese Frist, gilt die Kündigung als wirksam — unabhängig davon, ob sie rechtmäßig war oder nicht. Kontaktieren Sie sofort einen Fachanwalt für Arbeitsrecht.',
  },
  {
    q: 'Was ist der Unterschied zwischen Kündigung und Aufhebungsvertrag?',
    a: 'Bei einer Kündigung beendet der Arbeitgeber das Arbeitsverhältnis einseitig — Sie können dagegen klagen. Beim Aufhebungsvertrag einigen sich beide Seiten einvernehmlich auf eine Beendigung, meist gegen Abfindung. Achtung: Ein Aufhebungsvertrag kann zu einer Sperrzeit beim Arbeitslosengeld führen.',
  },
  {
    q: 'Wann ist eine fristlose Kündigung wirksam?',
    a: 'Eine fristlose Kündigung nach §626 BGB setzt einen wichtigen Grund voraus, der es dem Arbeitgeber unzumutbar macht, die Kündigungsfrist abzuwarten. Die Anforderungen sind sehr hoch — die meisten fristlosen Kündigungen scheitern vor dem Arbeitsgericht. Der Arbeitgeber muss zudem innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes handeln.',
  },
  {
    q: 'Gilt der Kündigungsschutz auch für mich?',
    a: 'Das Kündigungsschutzgesetz (KSchG) gilt, wenn Sie länger als 6 Monate im Betrieb beschäftigt sind und der Betrieb mehr als 10 Mitarbeiter hat (§23 KSchG). Ausgenommen sind u.\u00A0a. Geschäftsführer und leitende Angestellte mit besonderem Status.',
  },
  {
    q: 'Wie hoch ist meine Abfindung bei X Jahren Betriebszugehörigkeit?',
    a: 'Die Abfindungsformel lautet: 0,5 × Bruttomonatsgehalt × Anzahl der Beschäftigungsjahre. Bei 10 Jahren und 3.000\u00A0€ Gehalt ergibt das 15.000\u00A0€ als Ausgangspunkt. Je nach Stärke Ihres Falls (Sozialauswahl, Formfehler, Betriebszugehörigkeit) kann erheblich mehr erzielt werden.',
  },
  {
    q: 'Was kostet eine Kündigungsschutzklage?',
    a: 'Im ersten arbeitsgerichtlichen Verfahren trägt jede Seite ihre eigenen Anwaltskosten, unabhängig vom Ausgang (§12a ArbGG). Gerichtskosten fallen in der ersten Instanz bei Vergleich nicht an. Die Anwaltskosten richten sich nach dem Streitwert (in der Regel 3 Bruttomonatsgehälter). Viele Arbeitnehmer haben eine Rechtsschutzversicherung, die die Kosten übernimmt.',
  },
  {
    q: 'Welche Kündigungsfristen gelten für mich?',
    a: 'Die gesetzlichen Kündigungsfristen richten sich nach der Dauer der Betriebszugehörigkeit (§622 BGB). Nach 2 Jahren beträgt die Frist 1 Monat zum Monatsende, nach 5 Jahren 2 Monate, nach 10 Jahren 4 Monate. Arbeits- oder Tarifverträge können abweichende Fristen enthalten. Eine zu kurze Frist macht die Kündigung angreifbar.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Häufige Fragen
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Was unsere Mandanten am häufigsten fragen
        </h2>
        <div className="max-w-[740px] mt-9">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                className="w-full bg-none border-none cursor-pointer py-[22px] font-sans text-base font-semibold text-ink text-left flex justify-between items-center gap-4 hover:text-gold transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span
                  className={`text-[0.9rem] text-ink-muted min-w-[20px] text-center transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                >
                  &#9660;
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 text-[0.92rem] text-ink-light leading-relaxed ${
                  openIndex === i ? 'max-h-[500px] pb-[22px]' : 'max-h-0'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
