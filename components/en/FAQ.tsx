'use client';

import { useState } from 'react';
import { EN_FAQS } from '@/lib/en-faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          FAQ
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Most common questions on dismissal &amp; severance
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[640px] leading-relaxed mb-10">
          Direct answers to the questions we most frequently hear from English-speaking
          employees in Germany.
        </p>
        <div className="max-w-[820px]">
          {EN_FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question} className="border-b border-border-light">
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-6 py-5 text-left text-[1.02rem] font-semibold text-ink bg-transparent border-none cursor-pointer transition-colors hover:text-gold-dark"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={`text-gold-dark text-xl font-bold transition-transform ${
                      open ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div className="pb-6 pr-10 text-[0.95rem] text-ink-light leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
