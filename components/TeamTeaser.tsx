'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeUp from './FadeUp';

const teamPreview = [
  { src: '/Fatih.png', name: 'Fatih Bektas', title: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht' },
  { src: '/Buechler.png', name: 'Georg Willem Büchler', title: 'Rechtsanwalt & Fachanwalt' },
  { src: '/Duncker.png', name: 'Dr. Martin Duncker', title: 'Rechtsanwalt & Fachanwalt' },
];

export default function TeamTeaser() {
  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="team">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Unser Team
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Erfahrene Fachanwälte an Ihrer Seite
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed">
          Unser Team vertritt Arbeitnehmer bei Kündigung,
          Abfindung und Aufhebungsvertrag — mit über 5.000 erfolgreichen Verfahren.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-9 max-md:grid-cols-1">
          {teamPreview.map((member, i) => (
            <FadeUp key={member.name} delay={i}>
              <div className="bg-white border border-border-light rounded-[12px] py-8 px-6 text-center">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-5 bg-gradient-to-br from-cream-dark to-border relative">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <div className="fallback absolute inset-0 items-center justify-center font-serif text-[2rem] text-gold opacity-40 hidden">
                    &sect;
                  </div>
                </div>
                <h3 className="font-serif text-[1.1rem] font-bold leading-tight mb-1">{member.name}</h3>
                <p className="text-[0.84rem] text-ink-muted leading-relaxed">{member.title}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#8B7332] no-underline hover:text-gold-dark transition-colors"
          >
            Das gesamte Team kennenlernen &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
