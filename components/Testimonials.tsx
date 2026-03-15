import FadeUp from './FadeUp';

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const testimonials = [
  {
    quote:
      'We had a complex trade dispute with a German distributor and needed someone who could navigate the Landgericht in Frankfurt efficiently. The team resolved the case in just four months — far faster than we expected. Their strategic approach and clear English communication made the entire process seamless.',
    name: 'James R.',
    title: 'General Counsel',
    company: 'US Technology Company',
    location: 'San Francisco',
  },
  {
    quote:
      'When we were served with a lawsuit from a former German partner, we had no idea where to start. They secured a deadline extension, built a strong defense, and the claim was ultimately dismissed. We never had to appear in Germany — everything was handled remotely and entirely in English.',
    name: 'Sarah M.',
    title: 'CEO',
    company: 'UK SaaS Startup',
    location: 'London',
  },
  {
    quote:
      'As a minority shareholder in a German GmbH, I felt powerless against the majority. The team understood both the legal and the business dynamics, enforced my information rights, and negotiated a fair buyout. Their expertise in shareholder disputes was exactly what I needed.',
    name: 'Michael K.',
    title: 'Managing Director',
    company: 'US Manufacturing Corp.',
    location: 'Chicago',
  },
];

const stats = [
  { value: '5000+', label: 'Clients Represented' },
  { value: '5.0 \u2605', label: 'Client Rating' },
  { value: '20+', label: 'Years Experience' },
  { value: '100%', label: 'English Communication' },
];

export default function Testimonials() {
  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Client Testimonials
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          What Our International Clients Say
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mb-10">
          Trusted by businesses across the US, UK, and Europe to handle their most critical disputes in
          Germany.
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
                  &ldquo;{t.quote}&rdquo;
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
