import FadeUp from './FadeUp';

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const testimonials = [
  {
    quote:
      'Nach 12 Jahren im Unternehmen wurde mir betriebsbedingt gekündigt. Herr Bektas hat sofort eine Kündigungsschutzklage eingereicht und innerhalb von 8 Wochen eine Abfindung von 45.000 € für mich durchgesetzt — das Dreifache des ersten Angebots.',
    name: 'Thomas M.',
    title: 'Vertriebsleiter',
    company: 'Automobilzulieferer',
    location: 'Stuttgart',
  },
  {
    quote:
      'Mein Arbeitgeber hat mir einen Aufhebungsvertrag mit einer viel zu niedrigen Abfindung vorgelegt. Herr Bektas hat den Vertrag geprüft, nachverhandelt und die Abfindung von 8.000 € auf 28.000 € erhöht — ohne Sperrzeit beim Arbeitslosengeld.',
    name: 'Sandra K.',
    title: 'Teamleiterin Marketing',
    company: 'IT-Dienstleister',
    location: 'München',
  },
  {
    quote:
      'Ich wurde fristlos gekündigt und war völlig verzweifelt. Herr Bektas hat die Kündigung vor dem Arbeitsgericht angefochten — sie war unwirksam. Am Ende habe ich eine Abfindung von 20.000 € erhalten und ein sehr gutes Zeugnis.',
    name: 'Markus W.',
    title: 'Projektmanager',
    company: 'Bauunternehmen',
    location: 'Frankfurt',
  },
];

const stats = [
  { value: '2.000+', label: 'Erfolgreiche Verfahren' },
  { value: '5.0 \u2605', label: 'Mandantenbewertung' },
  { value: '20+', label: 'Jahre Erfahrung' },
  { value: '48h', label: 'Ersteinschätzung' },
];

export default function Testimonials() {
  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Mandantenstimmen
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Was unsere Mandanten sagen
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mb-10">
          Über 2.000 Arbeitnehmer haben uns bereits vertraut — bei Kündigung, Abfindung und
          Aufhebungsvertrag.
        </p>
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i}>
              <article className="bg-white border border-border-light rounded py-8 px-7 transition-all hover:border-gold hover:-translate-y-1 h-full flex flex-col">
                <div className="flex gap-0.5 text-gold-dark mb-4">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="text-[0.92rem] text-ink-light leading-relaxed italic mb-6 flex-1">
                  &bdquo;{t.quote}&ldquo;
                </p>
                <div>
                  <div className="text-[0.95rem] font-bold text-ink">{t.name}</div>
                  <div className="text-[0.82rem] text-ink-muted">
                    {t.title}, {t.company}
                  </div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">{t.location}</div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="flex gap-10 justify-center mt-12 pt-9 border-t border-border max-md:gap-5 max-md:flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[1.6rem] font-bold text-gold-dark">{s.value}</div>
              <div className="text-[0.82rem] text-ink-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
