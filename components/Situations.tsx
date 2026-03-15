import FadeUp from './FadeUp';

export default function Situations() {
  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="ihre-situation">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Ihre Situation
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Kündigung oder Aufhebungsvertrag — wir kämpfen für Ihre Rechte
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-10 max-md:grid-cols-1">
          <FadeUp>
            <article className="bg-cream border border-border-light rounded p-9 px-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-[18px] text-2xl bg-gold/[0.08] text-gold border border-gold/[0.15]">
                &#9878;
              </div>
              <h3 className="font-serif text-[1.2rem] font-bold mb-2.5">Sie wurden gekündigt</h3>
              <p className="text-[0.94rem] text-ink-light leading-relaxed">
                Sie haben eine Kündigung erhalten? Die Frist für eine Kündigungsschutzklage beträgt nur
                3 Wochen ab Zugang (§4 KSchG). Wir prüfen, ob Ihre Kündigung wirksam ist — und setzen
                die bestmögliche Abfindung für Sie durch.
              </p>
              <div className="mt-3.5 text-[0.86rem] text-ink-muted leading-relaxed">
                <strong className="text-ink-light font-semibold">Typische Fälle:</strong> Betriebsbedingte
                Kündigung, verhaltensbedingte Kündigung, fristlose Kündigung, Kündigung in der Probezeit,
                Kündigung während Krankheit.
              </div>
            </article>
          </FadeUp>
          <FadeUp delay={1}>
            <article className="bg-cream border border-border-light rounded p-9 px-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-[18px] text-2xl bg-blue/[0.07] text-blue border border-blue/[0.15]">
                &#9881;
              </div>
              <h3 className="font-serif text-[1.2rem] font-bold mb-2.5">
                Aufhebungsvertrag erhalten
              </h3>
              <p className="text-[0.94rem] text-ink-light leading-relaxed">
                Ihr Arbeitgeber bietet Ihnen einen Aufhebungsvertrag an? Vorsicht: Ohne anwaltliche
                Prüfung riskieren Sie eine Sperrzeit beim Arbeitslosengeld und eine zu niedrige
                Abfindung. Wir prüfen und verhandeln — bevor Sie unterschreiben.
              </p>
              <div className="mt-3.5 text-[0.86rem] text-ink-muted leading-relaxed">
                <strong className="text-ink-light font-semibold">Typische Fälle:</strong> Aufhebungsvertrag
                mit Abfindung, Abwicklungsvertrag, Turbo-Klausel, Freistellung.
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
