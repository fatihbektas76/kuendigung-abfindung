export default function CTA() {
  return (
    <section className="py-20 px-8 bg-ink text-center text-white" id="cta">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-light mb-2.5">
          Jetzt handeln
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-white mb-3.5">
          Kündigung erhalten? Zeit läuft.
        </h2>
        <p className="text-white/65 text-[1.05rem] max-w-[540px] mx-auto mb-8">
          Schildern Sie uns Ihren Fall — wir prüfen kostenlos, ob Ihre Kündigung angreifbar ist und
          wie hoch Ihre Abfindung sein kann. In der Regel innerhalb von 48 Stunden.
        </p>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 px-9 py-4 rounded-sm text-base font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#635428] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
        >
          Jetzt kostenlos prüfen lassen &rarr;
        </a>
        <div className="flex gap-8 justify-center mt-9 flex-wrap max-md:flex-col max-md:items-center">
          <a
            href="mailto:bektas@apos.legal"
            className="text-[0.88rem] text-white/60 no-underline flex items-center gap-2 hover:text-gold-light transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="#A68B4B" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
            bektas@apos.legal
          </a>
          <a
            href="tel:+49622295992400"
            className="text-[0.88rem] text-white/60 no-underline flex items-center gap-2 hover:text-gold-light transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="#A68B4B" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +49 6222 9599 2400
          </a>
          <a
            href="https://apos.legal"
            className="text-[0.88rem] text-white/60 no-underline flex items-center gap-2 hover:text-gold-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" fill="none" stroke="#A68B4B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            apos.legal
          </a>
        </div>
        <p className="mt-7 text-[0.85rem] text-white/60 max-w-[500px] mx-auto">
          Sie haben eine Kündigung erhalten? Die Klagefrist beträgt nur 3 Wochen (§4 KSchG).
          Kontaktieren Sie uns sofort — wir können Fristen wahren, während wir Ihren Fall prüfen.
        </p>
      </div>
    </section>
  );
}
