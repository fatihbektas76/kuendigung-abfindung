'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MusterPageEntry } from '@/lib/muster-data';
import { musterPages } from '@/lib/muster-data';
import type { GeneratedMusterPageContent } from '@/lib/generated-muster-page-content';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import TldrBox from '@/components/TldrBox';
import OptionCompare from '@/components/OptionCompare';
import Quellen from '@/components/Quellen';
import { QUELLEN_ABMAHNUNG } from '@/lib/quellen-defaults';
import { PAGE_DATES } from '@/lib/page-dates';
import WeitereLinkvorschlaege from '@/components/WeitereLinkvorschlaege';

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
          <StandAnzeige modifiedAt={PAGE_DATES.musterDetail} />
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

      {/* ───── TL;DR (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <section className="pt-8 pb-0 px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <TldrBox
                items={[
                  'Abmahnung wegen unentschuldigten Fehlens ist Vorstufe zur Kündigung — aber oft angreifbar.',
                  'Die 5 häufigsten Mängel: fehlende Datumsangabe, keine Kündigungsandrohung, Verhältnismäßigkeit, falsche Unterschrift, verspätete Zustellung.',
                  'Drei Reaktionsmöglichkeiten: Gegendarstellung, Widerspruch mit Entfernungsanspruch oder strategisches Abwarten.',
                  'Sie sind nicht verpflichtet, eine Abmahnung gegenzuzeichnen — die Verweigerung hat keine Folgen. Quittieren Sie allenfalls den Empfang, nie den Inhalt.',
                  'Bei bereits bestehender Abmahnung: Fachanwalt einschalten, bevor eine Kündigung folgt.',
                ]}
              />
            </div>
          </div>
        </section>
      )}

      {/* ───── Disclaimer oben ───── */}
      <section className="pt-8 pb-0 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] flex gap-4 py-5 px-6 bg-[#FFF8E7] border border-[#E8D9A0] rounded-sm">
            <div className="text-[1.3rem] mt-0.5" aria-hidden="true">&#9888;</div>
            <p className="text-[0.88rem] text-ink leading-relaxed m-0">
              <strong>Wichtiger Hinweis:</strong> {isMuster ? 'Dieses Muster' : 'Diese Checkliste'} ersetzt keine anwaltliche Beratung. Wir raten dringend, vor dem Versenden solcher Schreiben einen Fachanwalt für Arbeitsrecht zu konsultieren, da sie weitgehende rechtliche Konsequenzen haben können.
            </p>
          </div>

          {entry.slug === 'widerspruch-abmahnung' && (
            <div className="max-w-[740px] flex gap-4 py-5 px-6 bg-[#FEF2F2] border border-[#FECACA] rounded-sm mt-4">
              <div className="text-[1.3rem] mt-0.5" aria-hidden="true">&#9888;</div>
              <p className="text-[0.88rem] text-ink leading-relaxed m-0">
                <strong>Achtung:</strong> Eine Gegendarstellung oder ein Widerspruch sollte immer vorher mit einem spezialisierten Anwalt abgestimmt werden, da jedes falsche Wort sp&auml;ter problematisch sein k&ouml;nnte.
              </p>
            </div>
          )}
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

      {/* ───── Sofortmaßnahmen (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <section className="py-[60px] px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
                Sofort handeln
              </div>
              <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-5">
                3 Sofortmaßnahmen nach Erhalt der Abmahnung
              </h2>
              <div className="space-y-4">
                {[
                  { nr: '1', title: 'Unterschrift verweigern oder nur Empfang quittieren', text: 'Sie sind nicht verpflichtet, eine Abmahnung gegenzuzeichnen — auch keine Empfangsbestätigung. Die Verweigerung der Unterschrift hat keine arbeitsrechtlichen Folgen; den Zugang muss der Arbeitgeber dann über Zeugen oder Einschreiben beweisen. Wenn Sie den Erhalt dennoch quittieren möchten (z. B. weil Sie den Konflikt nicht eskalieren wollen), achten Sie darauf, dass die Unterschrift ausschließlich den Empfang bestätigt — nicht die inhaltliche Richtigkeit der Vorwürfe. Formulierungen wie „Ich erkenne die Abmahnung an" oder „Mit dem Inhalt einverstanden" sollten Sie streichen oder die Unterschrift komplett verweigern.' },
                  { nr: '2', title: 'Beweise sichern', text: 'Dokumentieren Sie sofort Ihre eigene Version der Ereignisse: E-Mails, Krankmeldungen, Chatverläufe, Schichtpläne, Zeugenaussagen. Je schneller Sie Belege sammeln, desto besser ist Ihre Position.' },
                  { nr: '3', title: 'Frist setzen — intern 14 Tage', text: 'Es gibt keine gesetzliche Frist für eine Reaktion, aber planen Sie innerhalb von 14 Tagen eine Entscheidung: Gegendarstellung, Widerspruch oder strategisches Abwarten. Bei Unsicherheit: Fachanwalt konsultieren.' },
                ].map((step) => (
                  <div key={step.nr} className="flex gap-4 py-4 px-5 bg-white rounded-sm border border-border">
                    <div className="w-8 h-8 min-w-[32px] rounded-full bg-gold-dark flex items-center justify-center text-white text-[0.82rem] font-bold mt-0.5">
                      {step.nr}
                    </div>
                    <div>
                      <div className="font-semibold text-[0.92rem] text-ink mb-1">{step.title}</div>
                      <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───── 5 häufigste Mängel (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <section className="py-[60px] px-8 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
                Aktualisiert
              </div>
              <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-5">
                5 typische Mängel — die jede Abmahnung angreifbar machen
              </h2>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {[
                  { title: 'Unbestimmtheit', text: '\u201ESie fehlen häufig\u201C — kein konkreter Fehltag, keine Uhrzeit, keine konkrete Pflicht benannt.' },
                  { title: 'Unrichtige Tatsachen', text: 'Behauptetes Fehlen ist falsch — AU lag vor, Krankmeldung erfolgte fristgerecht, Tag war Urlaub.' },
                  { title: 'Sammelabmahnung', text: 'Ist ein Vorwurf falsch, kippen alle anderen auch.' },
                  { title: 'Fehlende Warnfunktion', text: 'Keine eindeutige Androhung von Konsequenzen für den Wiederholungsfall — bloße Ermahnung.' },
                  { title: 'Unverhältnismäßigkeit / falsche rechtliche Bewertung', text: 'Das Verhalten war keine Pflichtverletzung (z.\u00A0B. genehmigter Arztbesuch, Freistellung, Pause) oder die Abmahnung steht in keinem Verhältnis zum Vorfall.' },
                ].map((item, i) => (
                  <div key={i} className={`py-4 px-5 bg-cream rounded-sm border border-border ${i === 4 ? 'col-span-2 max-md:col-span-1' : ''}`}>
                    <div className="font-semibold text-[0.92rem] text-gold-dark mb-1">{item.title}</div>
                    <p className="text-[0.88rem] text-ink-light leading-relaxed m-0">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───── Abmahnchecker CTA (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <section className="py-[50px] px-8 bg-cream">
          <div className="max-w-content mx-auto text-center">
            <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-3">
              Treffen diese Mängel auf Ihre Abmahnung zu?
            </h2>
            <p className="text-[0.95rem] text-ink-muted max-w-[480px] mx-auto mb-5">
              Unser kostenloser Abmahnchecker prüft in 3 Minuten, ob Ihre Abmahnung formell und inhaltlich angreifbar ist &mdash; mit konkreten BAG-Fundstellen.
            </p>
            <Link
              href="/abmahnung-pruefen/"
              className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Abmahnung jetzt prüfen &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* ───── 3 Reaktionsmöglichkeiten (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <section className="py-[60px] px-8 bg-cream">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
                Ihre Optionen
              </div>
              <h2 className="font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-bold leading-[1.25] mb-5">
                3 Reaktionsmöglichkeiten als Arbeitnehmer
              </h2>
            </div>
            <div className="max-w-[900px]">
              <OptionCompare
                options={[
                  {
                    number: 1,
                    title: 'Nichts unternehmen',
                    body: 'Sie nehmen die Abmahnung schweigend hin — sie verbleibt unkommentiert in der Personalakte.',
                    detail: '**Risiko:** Schweigen wird vom Arbeitgeber später nicht als Zustimmung gewertet — entwertet aber Ihre Verteidigung in einem Kündigungsschutzprozess, weil Ihre Sicht nirgends dokumentiert ist.',
                  },
                  {
                    number: 2,
                    title: 'Gegendarstellung verfassen',
                    body: 'Sie dokumentieren Ihre Sicht des Sachverhalts — die Erklärung wandert nach § 83 Abs. 2 BetrVG mit in die Personalakte.',
                    detail: '**Vorteil:** Belastet das Arbeitsverhältnis kaum, sichert aber Ihre Position für einen späteren Kündigungsschutzprozess. **Wichtig:** Immer vorher Rücksprache mit einem Fachanwalt — eine ungeschickte Formulierung kann mehr schaden als nützen.',
                    recommended: true,
                    recommendationLabel: 'Häufig empfohlen',
                  },
                  {
                    number: 3,
                    title: 'Klage auf Entfernung',
                    body: 'Sie verlangen die Entfernung der Abmahnung aus der Personalakte vor dem Arbeitsgericht (§§ 242, 1004 BGB analog).',
                    detail: '**Wann sinnvoll:** Eine Klage belastet das Arbeitsverhältnis erheblich. Sie ist nur dann zu empfehlen, wenn das Verhältnis ohnehin schon zerrüttet ist und absehbar auf eine Trennung hinausläuft.',
                  },
                ]}
                note="**Unsere Erfahrung:** In der überwiegenden Mehrzahl der Fälle ist Option 2 — die anwaltlich vorbereitete Gegendarstellung — das beste Verhältnis aus Wirkung und Risiko. Sie sichert Ihre Position, ohne den Konflikt zu eskalieren."
              />
            </div>
          </div>
        </section>
      )}

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

      {/* ───── Ausfüllhilfe (nicht bei Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug !== 'abmahnung-unentschuldigtes-fehlen' && <section className="py-[60px] px-8 bg-white">
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
      </section>}

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

      {/* ───── Quellen (nur Abmahnung unentschuldigtes Fehlen) ───── */}
      {entry.slug === 'abmahnung-unentschuldigtes-fehlen' && (
        <Quellen
          quellen={QUELLEN_ABMAHNUNG}
          bagUrteile={[
            {
              az: 'BAG 2 AZR 258/11',
              datum: '19.04.2012',
              kernaussage: 'Anforderungen an die formelle Wirksamkeit einer Abmahnung',
            },
          ]}
        />
      )}

      {/* ───── Autorenbox ───── */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <AuthorBox />
            <ShareButtons url={`/ratgeber/muster/${entry.slug}/`} title={entry.h1} />
          </div>
        </div>
      </section>

      {/* BERT-Interlinker */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <WeitereLinkvorschlaege currentPath={`/ratgeber/muster/${entry.slug}`} />
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
