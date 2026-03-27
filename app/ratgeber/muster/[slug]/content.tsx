'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MusterPageEntry } from '@/lib/muster-data';
import { musterPages } from '@/lib/muster-data';
import type { GeneratedMusterPageContent } from '@/lib/generated-muster-page-content';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorBox from '@/components/AuthorBox';

type Props = {
  entry: MusterPageEntry;
  original: { title: string; intro: string; muster?: string; punkte?: string[] };
  generated: GeneratedMusterPageContent;
  faqs: { q: string; a: string }[];
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 py-2 px-4 bg-white border border-border rounded-sm text-[0.82rem] font-semibold text-ink cursor-pointer hover:border-gold hover:text-gold-dark transition-all"
    >
      {copied ? (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Kopieren
        </>
      )}
    </button>
  );
}

export default function MusterPageContent({ entry, original, generated, faqs }: Props) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const isMuster = entry.type === 'muster';

  const otherPages = musterPages.filter((m) => m.slug !== entry.slug).slice(0, 4);

  return (
    <main className="pb-20">
      {/* ───── Header ───── */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber" className="text-gold no-underline hover:underline">Ratgeber</Link>
            <span className="mx-2">/</span>
            <Link href="/ratgeber/muster" className="text-gold no-underline hover:underline">Muster</Link>
            <span className="mx-2">/</span>
            <span>{entry.h1}</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            {isMuster ? 'Kostenlose Vorlage' : 'Kostenlose Checkliste'}
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            {entry.h1}
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            {generated.intro}
          </p>
        </div>
      </div>

      {/* ───── Disclaimer oben ───── */}
      <section className="pt-8 pb-0 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] flex gap-4 py-5 px-6 bg-[#FFF8E7] border border-[#E8D9A0] rounded-sm">
            <div className="text-[1.3rem] mt-0.5" aria-hidden="true">&#9888;</div>
            <p className="text-[0.88rem] text-ink leading-relaxed m-0">
              <strong>Wichtiger Hinweis:</strong> {isMuster ? 'Dieses Muster' : 'Diese Checkliste'} ersetzt keine anwaltliche Beratung. Wir raten dringend, vor dem Versenden solcher Schreiben einen Fachanwalt für Arbeitsrecht zu konsultieren, da sie weitgehende rechtliche Konsequenzen haben können.
            </p>
          </div>
        </div>
      </section>

      {/* ───── Wann benötigt ───── */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Anwendungsbereich
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-4">
              Wann wird {isMuster ? 'dieses Muster' : 'diese Checkliste'} benötigt?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              {generated.wannBenoetigt}
            </p>
          </div>
        </div>
      </section>

      {/* ───── Muster / Checkliste ───── */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              {isMuster ? 'Mustertext' : 'Prüfpunkte'}
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-5">
              {original.title}
            </h2>

            {isMuster && original.muster ? (
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <CopyButton text={original.muster.replace(/\\n/g, '\n')} />
                </div>
                <pre className="bg-[#f5f3ee] border border-border rounded-sm p-6 pr-32 text-[0.84rem] text-ink leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
                  {original.muster}
                </pre>
              </div>
            ) : original.punkte ? (
              <div className="space-y-3">
                {original.punkte.map((punkt, i) => (
                  <div key={i} className="flex gap-3 py-3 px-4 bg-[#f5f3ee] border border-border rounded-sm">
                    <div className="w-7 h-7 min-w-[28px] rounded-sm border-2 border-gold flex items-center justify-center font-serif text-[0.85rem] font-bold text-gold-dark mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[0.88rem] text-ink leading-relaxed m-0">{punkt}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ───── Wichtige Hinweise ───── */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Wichtig zu wissen
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-4">
              Wichtige Hinweise {isMuster ? 'zum Muster' : 'zur Checkliste'}
            </h2>
            <div className="py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                {generated.wichtigeHinweise}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA 1 ───── */}
      <section className="py-[50px] px-8 bg-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-3">
            {isMuster ? 'Unsicher bei der Anpassung?' : 'Unsicher bei der Prüfung?'}
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[480px] mx-auto mb-5">
            Ein Fachanwalt prüft Ihren Fall und passt {isMuster ? 'das Muster' : 'die Checkliste'} an Ihre individuelle Situation an &mdash; kostenlose Ersteinschätzung.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Kostenlose Ersteinschätzung anfordern &rarr;
          </a>
        </div>
      </section>

      {/* ───── Ausfüllhilfe ───── */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              {isMuster ? 'Ausfüllhilfe' : 'Erklärungen'}
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-5">
              {isMuster ? 'So füllen Sie das Muster richtig aus' : 'So nutzen Sie die Checkliste richtig'}
            </h2>
            <div className="space-y-4">
              {generated.ausfuellhilfe.map((tipp, i) => (
                <div key={i} className="flex gap-4 py-4 px-5 bg-cream rounded-sm border border-border">
                  <div className="w-8 h-8 min-w-[32px] rounded-full bg-gold-dark flex items-center justify-center text-white text-[0.82rem] font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-[0.88rem] text-ink leading-relaxed m-0">{tipp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu {isMuster ? 'diesem Muster' : 'dieser Checkliste'}
          </h2>
          <div className="max-w-[740px]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full bg-none border-none cursor-pointer py-[22px] font-sans text-base font-semibold text-ink text-left flex justify-between items-center gap-4 hover:text-gold transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  {faq.q}
                  <span className={`text-[0.9rem] text-ink-muted min-w-[20px] text-center transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}>
                    &#9660;
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 text-[0.92rem] text-ink-light leading-relaxed ${faqOpen === i ? 'max-h-[500px] pb-[22px]' : 'max-h-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Other Muster Links ───── */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.2rem] font-bold mb-4">Weitere Muster &amp; Vorlagen</h2>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/ratgeber/muster"
              className="inline-block py-2 px-4 rounded-full border border-gold bg-gold-bg text-[0.82rem] font-semibold text-gold-dark no-underline hover:bg-gold hover:text-white transition-all"
            >
              Alle Muster &amp; Vorlagen
            </Link>
            {otherPages.map((m) => (
              <Link
                key={m.slug}
                href={`/ratgeber/muster/${m.slug}`}
                className="inline-block py-2 px-4 rounded-full border border-border text-[0.82rem] font-semibold text-ink-muted no-underline hover:border-gold hover:text-gold-dark transition-all"
              >
                {m.h1}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Disclaimer ───── */}
      <section className="py-[40px] px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] py-4 px-5 border-l-[3px] border-border text-[0.82rem] text-ink-muted leading-relaxed">
            <strong>Haftungsausschluss:</strong> {isMuster ? 'Dieses Muster dient' : 'Diese Checkliste dient'} ausschließlich der allgemeinen Information und stellt keine Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes (RDG) dar. Für eine verbindliche Rechtsberatung wenden Sie sich bitte an einen Fachanwalt für Arbeitsrecht.
          </div>
        </div>
      </section>

      {/* ───── Autorenbox ───── */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
          </div>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-[70px] px-8 bg-[#1C1408]">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-white mb-3">
            {isMuster ? 'Ein Muster ersetzt keinen Anwalt' : 'Eine Checkliste ersetzt keinen Anwalt'}
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Lassen Sie Ihren Fall von einem Fachanwalt für Arbeitsrecht prüfen &mdash; kostenlose Ersteinschätzung innerhalb von 24 Stunden.
          </p>
          <a
            href="/#kontakt"
            className="inline-block py-3.5 px-8 bg-gold text-[#1C1408] border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.4)]"
          >
            Kostenlose Ersteinschätzung &rarr;
          </a>
        </div>
      </section>

      {/* ───── Sticky CTA ───── */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-border py-3 px-8 md:hidden">
        <a
          href="/#kontakt"
          className="block w-full text-center py-3 bg-gold-dark text-white rounded-sm font-sans text-[0.92rem] font-semibold no-underline"
        >
          Kostenlos prüfen lassen &rarr;
        </a>
      </div>
    </main>
  );
}
