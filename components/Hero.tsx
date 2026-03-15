import FadeUp from './FadeUp';

export default function Hero() {
  return (
    <header className="pt-[150px] pb-[100px] px-8 bg-cream text-center relative overflow-hidden max-md:pt-[120px] max-md:pb-[70px] max-md:px-6" role="banner">
      <div className="absolute -top-[40%] -right-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(166,139,75,0.07)_0%,transparent_70%)] z-[2]" />
      <div className="max-w-[800px] mx-auto relative z-[3]">
        <div className="font-serif text-[1.1rem] text-gold-dark font-semibold mb-1.5">
          Kanzlei für Arbeitsrecht{' '}
          <span className="inline-block text-[0.68rem] font-bold text-green bg-green-bg border-[1.5px] border-green/20 rounded px-2.5 py-[3px] tracking-wider uppercase ml-2.5 align-middle">
            Kostenlose Ersteinschätzung
          </span>
        </div>
        <h1 className="font-serif text-[clamp(2.1rem,4.5vw,3.2rem)] font-extrabold leading-[1.15] mt-[18px] mb-[22px] tracking-tight max-md:text-[1.9rem]">
          Gekündigt?
          <br />
          Holen Sie das Maximum aus Ihrer Abfindung.
        </h1>
        <p className="text-[1.12rem] text-ink-muted max-w-[620px] mx-auto mb-9 leading-relaxed">
          Nur 3 Wochen Frist nach der Kündigung. Wir prüfen kostenlos, ob Ihre Kündigung wirksam ist
          — und wie hoch Ihre Abfindung sein kann. Fachanwalt für Arbeitsrecht mit über 20 Jahren
          Erfahrung und 5.000+ erfolgreichen Verfahren.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap max-md:flex-col max-md:items-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)] max-md:w-full max-md:justify-center"
          >
            Abfindung kostenlos prüfen &rarr;
          </a>
          <a
            href="/abfindungsrechner"
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-transparent text-ink border-[1.5px] border-border hover:border-gold hover:text-gold max-md:w-full max-md:justify-center"
          >
            Abfindung berechnen
          </a>
        </div>
        <FadeUp className="flex gap-10 justify-center mt-12 pt-9 border-t border-border max-md:gap-5 max-md:flex-wrap">
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">20+</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Jahre Erfahrung</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">5.000+</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Erfolgreiche Verfahren</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">3 Wochen</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Klagefrist beachten</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">5.0 &#9733;</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Bewertung</div>
          </div>
        </FadeUp>
      </div>
    </header>
  );
}
