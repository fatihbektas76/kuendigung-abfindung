'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How do I sue a company in Germany from the US or UK?',
    a: 'To sue in Germany, you need a German-admitted attorney (Rechtsanwalt) \u2014 foreign lawyers cannot represent you in German courts. The process starts with a demand letter, followed by filing a statement of claim (Klageschrift) at the competent court. For claims above \u20AC10,000, attorney representation is mandatory. German litigation has no discovery, no jury trials, and follows the \u201Closer pays\u201D principle. We handle everything in English \u2014 you never need to deal with German courts directly.',
  },
  {
    q: "I've been sued in Germany \u2014 what do I do?",
    a: "If you\u2019ve been served with a German lawsuit, you typically have 2\u20134 weeks to respond. Missing this deadline can result in a default judgment (Vers\u00E4umnisurteil) against you. You need a German-admitted attorney immediately. We can file your defense, request deadline extensions, and represent you through the entire proceeding \u2014 all communication with you in English.",
  },
  {
    q: 'How long does a lawsuit take in German courts?',
    a: 'First-instance proceedings at a Regional Court (Landgericht) typically take 6\u201312 months. Complex cases with expert witnesses may take 12\u201318 months. Appeals add another 6\u201312 months. Interim injunctions can be obtained within days. German litigation is generally faster than US or UK proceedings.',
  },
  {
    q: 'What does litigation cost in Germany?',
    a: 'German litigation costs are calculated from statutory fee schedules based on the amount in dispute \u2014 not hourly billing. Germany follows the \u201Closer pays\u201D rule. For a \u20AC100,000 dispute, total first-instance costs typically range from \u20AC8,000\u2013\u20AC15,000. This makes German litigation far more predictable and usually cheaper than US litigation.',
  },
  {
    q: 'Can I enforce a US or UK judgment in Germany?',
    a: 'US judgments are generally not directly enforceable in Germany \u2014 there is no bilateral enforcement treaty. You need a separate enforcement proceeding (Exequaturverfahren) where a German court reviews the judgment. UK judgments post-Brexit require enforcement under the Hague Convention where applicable. We advise on the fastest and most cost-effective strategy.',
  },
  {
    q: 'Can I use arbitration instead of German courts?',
    a: 'Yes, if your contract contains an arbitration clause. Germany is a signatory to the New York Convention. We represent international clients in ICC, DIS, and LCIA arbitration proceedings seated in Germany, as well as in enforcement of foreign arbitral awards before German courts.',
  },
  {
    q: 'What is the difference between Amtsgericht and Landgericht?',
    a: 'The Amtsgericht (Local Court) handles disputes up to \u20AC10,000. The Landgericht (Regional Court) handles claims above \u20AC10,000 and all commercial matters \u2014 attorney representation is mandatory here. Commercial disputes go to specialized chambers (Kammern f\u00FCr Handelssachen). Appeals go to the Oberlandesgericht and ultimately the Bundesgerichtshof.',
  },
  {
    q: 'Do I need to travel to Germany for my court case?',
    a: 'In most cases, no. Your German attorney represents you in court, and personal appearance is rarely required. Video conferencing is increasingly accepted. We handle all filings, court appearances, and procedural matters on your behalf \u2014 you stay informed through regular English-language updates.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Frequently Asked Questions
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          What International Clients Ask Us Most
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
