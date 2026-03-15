'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-[740px]">
      {items.map((faq, i) => (
        <div key={i} className="border-b border-border">
          <button
            className="w-full text-left py-5 flex justify-between items-center gap-4 bg-none border-none cursor-pointer hover:text-gold transition-colors font-sans font-semibold text-[0.95rem] text-ink"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            {faq.q}
            <span
              className={`text-gold text-[0.85rem] min-w-[16px] transition-transform duration-300 ${
                openFaq === i ? 'rotate-180' : ''
              }`}
            >
              &#9660;
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 text-[0.88rem] text-ink-muted leading-relaxed font-sans ${
              openFaq === i ? 'max-h-[400px] pb-5' : 'max-h-0'
            }`}
          >
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  );
}
