'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';

export default function SmallBusinessThresholdEn() {
  const [fullTime, setFullTime] = useState(8);
  const [pt30, setPt30] = useState(2); // ≤30h => 0.75
  const [pt20, setPt20] = useState(0); // ≤20h => 0.5

  const { weighted, applies } = useMemo(() => {
    const w = fullTime * 1.0 + pt30 * 0.75 + pt20 * 0.5;
    return { weighted: Math.round(w * 100) / 100, applies: w > 10 };
  }, [fullTime, pt30, pt20]);

  return (
    <main>
      <TopicHero
        eyebrow="Small-business threshold"
        title="Does the Dismissal Protection Act apply to my employer?"
        lede="§ 23 (1) KSchG applies only above 10 weighted employees. Part-time staff count proportionally (0.5 / 0.75 / 1.0). Apprentices and the employer themselves do not count."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/tools', label: 'Tools' },
          { href: '/en/small-business-threshold-calculator', label: 'Small-business threshold' },
        ]}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[860px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <div>
            <label className="block text-[0.9rem] font-semibold text-ink mb-2">
              Full-time employees (&gt; 30 h/week): {fullTime}
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={fullTime}
              onChange={(e) => setFullTime(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Part-time, up to 30 h/week (count as 0.75): {pt30}
            </label>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={pt30}
              onChange={(e) => setPt30(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <label className="block text-[0.9rem] font-semibold text-ink mb-2 mt-7">
              Part-time, up to 20 h/week (count as 0.5): {pt20}
            </label>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={pt20}
              onChange={(e) => setPt20(Number(e.target.value))}
              className="w-full accent-gold-dark"
            />

            <p className="text-[0.8rem] text-ink-muted mt-4 leading-relaxed">
              Apprentices and the employer / sole proprietor do not count. Outside-the-business
              free agents do not count either.
            </p>
          </div>

          <div className="bg-cream border border-border-light rounded p-7 flex flex-col gap-3">
            <div className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
              Weighted head count
            </div>
            <div className="font-serif text-[2.4rem] font-extrabold text-ink leading-tight">
              {weighted}
            </div>
            <div
              className={`p-4 rounded-sm border-l-4 ${
                applies
                  ? 'bg-green-bg border-green text-green-dark'
                  : 'bg-yellow-100 border-yellow-500 text-yellow-800'
              }`}
            >
              <p className="text-[0.95rem] font-semibold m-0">
                {applies
                  ? '✓ KSchG applies — you have full dismissal protection'
                  : '⚠ Below threshold — KSchG does not apply'}
              </p>
              <p className="text-[0.85rem] m-0 mt-1.5 opacity-90">
                {applies
                  ? 'Every ordinary dismissal must be socially justified on conduct, person or operational grounds (§ 1 KSchG).'
                  : 'Other protections still apply: § 623 BGB form, § 622 BGB notice, special protection categories.'}
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-[0.92rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32]"
            >
              Discuss my case &rarr;
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
