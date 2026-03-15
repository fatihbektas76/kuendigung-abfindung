import FadeUp from './FadeUp';

export default function Situations() {
  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="your-situation">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Your Situation
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Whether You&rsquo;re Suing or Being Sued — We&rsquo;ve Got You Covered
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-10 max-md:grid-cols-1">
          <FadeUp>
            <article className="bg-cream border border-border-light rounded p-9 px-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-[18px] text-2xl bg-gold/[0.08] text-gold border border-gold/[0.15]">
                &#9878;
              </div>
              <h3 className="font-serif text-[1.2rem] font-bold mb-2.5">You Need to Sue in Germany</h3>
              <p className="text-[0.94rem] text-ink-light leading-relaxed">
                A German company owes you money, breached a contract, or violated your rights. You need a
                German-admitted attorney to bring your claim before a German court or arbitration tribunal.
              </p>
              <div className="mt-3.5 text-[0.86rem] text-ink-muted leading-relaxed">
                <strong className="text-ink-light font-semibold">Typical cases:</strong> Unpaid invoices,
                contract breaches, IP infringement, distributor disputes, warranty claims, shareholder
                conflicts, enforcing foreign judgments.
              </div>
            </article>
          </FadeUp>
          <FadeUp delay={1}>
            <article className="bg-cream border border-border-light rounded p-9 px-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-[18px] text-2xl bg-blue/[0.07] text-blue border border-blue/[0.15]">
                &#9881;
              </div>
              <h3 className="font-serif text-[1.2rem] font-bold mb-2.5">
                You&rsquo;re Being Sued in Germany
              </h3>
              <p className="text-[0.94rem] text-ink-light leading-relaxed">
                You&rsquo;ve received a German lawsuit, a demand letter, or a court order. You need to
                respond quickly — deadlines are strict, and missing them can mean a default judgment against
                you.
              </p>
              <div className="mt-3.5 text-[0.86rem] text-ink-muted leading-relaxed">
                <strong className="text-ink-light font-semibold">Typical cases:</strong> Employee dismissal
                claims, product liability, unfair competition allegations, regulatory proceedings,
                contractual disputes, injunctions.
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
