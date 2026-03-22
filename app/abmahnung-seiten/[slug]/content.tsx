'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AbmahnungEntry } from '@/lib/abmahnung-content';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import DejureText from '@/components/DejureText';
import StandAnzeige from '@/components/StandAnzeige';
import AuthorBox from '@/components/AuthorBox';

type Props = {
  entry: AbmahnungEntry;
  prev: AbmahnungEntry | null;
  next: AbmahnungEntry | null;
  faqs: { q: string; a: string }[];
  uniqueIntro: string;
  rechtlicheGrundlagen: string;
  praxistipp: string;
};

export default function AbmahnungContent({ entry, prev, next, faqs, uniqueIntro, rechtlicheGrundlagen, praxistipp }: Props) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const label = entry.count === 1 ? '1 Abmahnung' : `${entry.count} Abmahnungen`;

  return (
    <main className="pb-20">
      {/* ───── a. Header ───── */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/abmahnung" className="text-gold no-underline hover:underline">Abmahnung</Link>
            <span className="mx-2">/</span>
            <span>Nach {label}</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kündigung &middot; Abmahnung
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Kündigung nach {entry.word} {entry.count === 1 ? 'Abmahnung' : 'Abmahnungen'} &mdash; wirksam oder nicht?
          </h1>
          <p className="text-[1.05rem] text-ink-light max-w-[640px] leading-relaxed mt-4">
            <DejureText text={uniqueIntro} />
          </p>
        </div>
      </div>

      {/* ───── b. Warning Box ───── */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-start gap-4 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
            <svg className="min-w-[24px] text-gold mt-0.5" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-[0.95rem] font-semibold text-ink m-0">
                Nur 3 Wochen Frist! Ab Zugang der Kündigung haben Sie 3 Wochen Zeit,
                Kündigungsschutzklage einzureichen.
              </p>
              <p className="text-[0.84rem] text-ink-muted mt-1 m-0">
                Frist verpasst = Kündigung wirksam, auch wenn sie rechtswidrig war.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── b2. Was bedeutet diese Abmahnung? ───── */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Einordnung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was bedeutet {label === '1 Abmahnung' ? 'diese Abmahnung' : `die ${entry.count}. Abmahnung`} für Ihr Arbeitsverhältnis?
            </h2>
            {entry.count === 1 ? (
              <p className="text-[0.95rem] text-ink-light leading-relaxed">
                Eine erste Abmahnung ist ein Warnsignal, aber noch kein Grund zur Panik. Der Arbeitgeber
                dokumentiert damit, dass er ein bestimmtes Verhalten beanstandet. In den meisten Fällen
                reicht eine einzelne Abmahnung nicht aus, um eine Kündigung zu rechtfertigen &mdash;
                es sei denn, der Verstoß war besonders schwerwiegend. Trotzdem sollten Sie die Abmahnung
                ernst nehmen und prüfen lassen, ob sie formell und inhaltlich korrekt ist.
              </p>
            ) : entry.count === 2 ? (
              <p className="text-[0.95rem] text-ink-light leading-relaxed">
                Bei zwei Abmahnungen wegen gleichartiger Verstöße wird die Lage ernster. Der Arbeitgeber
                hat Ihnen bereits eine Chance zur Verhaltensänderung gegeben. Eine dritte gleichartige
                Pflichtverletzung kann unter Umständen eine verhaltensbedingte Kündigung rechtfertigen.
                Umso wichtiger ist es, jetzt die Wirksamkeit beider Abmahnungen zu prüfen &mdash; denn
                wenn auch nur eine unwirksam ist, fehlt die Grundlage für eine Kündigung.
              </p>
            ) : (
              <p className="text-[0.95rem] text-ink-light leading-relaxed">
                Nach {label} ist die Situation ernst: Der Arbeitgeber hat dokumentiert, dass er Ihnen
                mehrfach die Chance zur Verhaltensänderung gegeben hat. Eine weitere gleichartige
                Pflichtverletzung kann eine verhaltensbedingte Kündigung rechtfertigen. Allerdings gilt:
                Je mehr Abmahnungen es gibt, desto eher kann argumentiert werden, dass der Arbeitgeber
                die Warnfunktion selbst nicht ernst nimmt. Lassen Sie alle Abmahnungen auf Formfehler
                und inhaltliche Richtigkeit prüfen.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ───── b3. Ist diese Abmahnung wirksam? ───── */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Prüfschema
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Ist diese Abmahnung wirksam? &mdash; 5-Punkte-Prüfung
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Prüfen Sie Ihre Abmahnung anhand dieser 5 Kriterien. Wenn auch nur ein Punkt nicht
              erfüllt ist, ist die Abmahnung angreifbar:
            </p>
            <div className="space-y-3">
              {[
                { nr: 1, title: 'Konkreter Vorwurf', check: 'Ist das beanstandete Verhalten mit Datum, Uhrzeit und genauer Beschreibung benannt?' },
                { nr: 2, title: 'Berechtigte Person', check: 'Wurde die Abmahnung von einem weisungsbefugten Vorgesetzten oder der Personalabteilung ausgesprochen?' },
                { nr: 3, title: 'Inhaltlich zutreffend', check: 'Stimmt der Vorwurf? Haben Sie das beanstandete Verhalten tatsächlich so gezeigt?' },
                { nr: 4, title: 'Verhältnismäßigkeit', check: 'Steht die Abmahnung in einem angemessenen Verhältnis zum Verstoß? Keine Bagatelle?' },
                { nr: 5, title: 'Androhung von Konsequenzen', check: 'Enthält die Abmahnung den Hinweis, dass bei Wiederholung die Kündigung droht?' },
              ].map((item) => (
                <div key={item.nr} className="flex items-start gap-4 py-4 px-5 bg-cream rounded-sm border border-border">
                  <div className="w-8 h-8 min-w-[32px] rounded-sm border-2 border-gold flex items-center justify-center font-serif text-[0.9rem] font-bold text-gold-dark">
                    {item.nr}
                  </div>
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink mb-1">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed">{item.check}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── b4. Widerspruch gegen die Abmahnung ───── */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Ihre Optionen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Widerspruch gegen die Abmahnung
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Sie sind nicht verpflichtet, einer Abmahnung zu widersprechen &mdash; Ihr Schweigen
              macht die Abmahnung nicht automatisch wirksam. Dennoch kann ein Widerspruch sinnvoll sein:
            </p>
            <div className="bg-white border border-border rounded p-6 mb-5">
              <h3 className="font-serif text-[1.05rem] font-bold mb-3">Gegendarstellung nach &sect;83 Abs.&nbsp;2 BetrVG</h3>
              <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-3">
                Sie haben das Recht, eine schriftliche Gegendarstellung zu verfassen und deren Aufnahme
                in die Personalakte zu verlangen. In der Gegendarstellung sollten Sie:
              </p>
              <ul className="text-[0.88rem] text-ink-muted leading-relaxed list-disc pl-5 space-y-1">
                <li>Den Sachverhalt aus Ihrer Sicht darstellen</li>
                <li>Konkrete Gegenbeweise benennen (Zeugen, E-Mails, Zeiterfassung)</li>
                <li>Formfehler der Abmahnung aufzeigen</li>
                <li>Sachlich und faktenbasiert argumentieren</li>
              </ul>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>Tipp:</strong> Lassen Sie die Gegendarstellung von einem Fachanwalt prüfen,
              bevor Sie sie einreichen. Eine ungeschickt formulierte Gegendarstellung kann Ihre
              Position in einem späteren Kündigungsschutzprozess schwächen.
            </p>
          </div>
        </div>
      </section>

      {/* ───── b5. Wie verhalten Sie sich jetzt richtig? ───── */}
      <section className="py-[60px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Handlungsempfehlung
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie verhalten Sie sich jetzt richtig?
            </h2>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <div className="bg-cream border border-border rounded p-5">
                <div className="text-gold-dark text-[1.2rem] mb-2">&#10003;</div>
                <h3 className="font-serif text-[0.95rem] font-bold mb-2">Das sollten Sie tun</h3>
                <ul className="text-[0.84rem] text-ink-muted leading-relaxed list-disc pl-4 space-y-1.5">
                  <li>Abmahnung als &bdquo;erhalten&ldquo; bestätigen (nicht als inhaltlich richtig)</li>
                  <li>Kopie anfertigen und sicher aufbewahren</li>
                  <li>Beweise für Ihre Sicht sammeln</li>
                  <li>Fachanwalt konsultieren</li>
                  <li>Beanstandetes Verhalten abstellen</li>
                </ul>
              </div>
              <div className="bg-cream border border-border rounded p-5">
                <div className="text-red-600 text-[1.2rem] mb-2">&#10007;</div>
                <h3 className="font-serif text-[0.95rem] font-bold mb-2">Das sollten Sie vermeiden</h3>
                <ul className="text-[0.84rem] text-ink-muted leading-relaxed list-disc pl-4 space-y-1.5">
                  <li>Abmahnung inhaltlich unterschreiben</li>
                  <li>Emotional oder aggressiv reagieren</li>
                  <li>Das beanstandete Verhalten wiederholen</li>
                  <li>Die Abmahnung ignorieren</li>
                  <li>Ohne anwaltliche Beratung handeln</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── c. Urgency CTA #1 ───── */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="border-[1.5px] border-gold rounded bg-cream p-8 text-center">
              <h2 className="font-serif text-[1.4rem] font-bold mb-4">Kündigung nach Abmahnung prüfen lassen</h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
                Wir prüfen Ihre Kündigung und Ihre Abmahnung(en) kostenlos und geben Ihnen
                innerhalb von 24 Stunden eine Ersteinschätzung zu Ihren Chancen.
              </p>
              <a
                href="/#kontakt"
                className="block w-full py-3.5 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
              >
                Kündigung jetzt kostenlos prüfen &rarr;
              </a>
              <p className="text-[0.78rem] text-ink-muted text-center mt-3">
                ★★★★★ 68 Bewertungen &middot; Über 2.000 erfolgreiche Verfahren &middot; Bundesweit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── d. Rechtliche Grundlagen ───── */}
      <section className="py-[60px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Rechtliche Grundlagen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Abmahnung und Kündigung &mdash; was sagt das Gesetz?
            </h2>
            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] text-ink leading-relaxed m-0">
                <DejureText text={rechtlicheGrundlagen} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── f. Praxistipp ───── */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2">
              Praxistipp
            </div>
            <p className="text-[0.95rem] text-ink leading-relaxed m-0">
              <DejureText text={praxistipp} />
            </p>
          </div>
        </div>
      </section>

      {/* ───── h. 3 Schritte ───── */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Wie ist der Ablauf?
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-8">
            In 3 einfachen Schritten Ihre Rechte sichern!
          </h2>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {[
              { step: 1, title: 'Sofort-Check', desc: 'Schildern Sie uns Ihren Fall über das Kontaktformular. Wir prüfen Ihre Kündigung und Abmahnung(en) kostenlos und geben Ihnen innerhalb von 24 Stunden eine Ersteinschätzung.' },
              { step: 2, title: 'Termin vereinbaren', desc: 'In einem persönlichen Gespräch besprechen wir Ihre Optionen: Kündigungsschutzklage, Abfindungsverhandlung oder Aufhebungsvertrag. Sie entscheiden.' },
              { step: 3, title: 'Kanzlei beauftragen', desc: 'Wir übernehmen die gesamte Korrespondenz, reichen fristgerecht Klage ein und verhandeln Ihre Abfindung. Sie lehnen sich zurück.' },
            ].map((s) => (
              <div key={s.step} className="bg-white border border-border rounded p-6">
                <div className="w-10 h-10 rounded-sm border-2 border-gold flex items-center justify-center font-serif text-[1.1rem] font-bold text-gold-dark mb-4">
                  {s.step}
                </div>
                <h3 className="font-serif text-[1.05rem] font-bold mb-2">{s.title}</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/#kontakt"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kündigung kostenlos prüfen lassen &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ───── i. Urgency CTA #2 ───── */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between gap-6 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold max-md:flex-col max-md:items-start">
            <div>
              <p className="text-[1rem] font-semibold text-ink m-0">Nur 3 Wochen Frist &mdash; jetzt handeln.</p>
              <p className="text-[0.84rem] text-ink-muted mt-1 m-0">Kündigung anwaltlich prüfen lassen, bevor die Frist abläuft.</p>
            </div>
            <a
              href="/#kontakt"
              className="inline-block py-3 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline whitespace-nowrap transition-all hover:bg-[#635428]"
            >
              Jetzt kontaktieren &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ───── j. Warum Section ───── */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
            Warum Sie unsere Kanzlei beauftragen sollten!
          </h2>
          <p className="text-[0.95rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
            Wir sind auf Kündigungsschutz und Abfindung spezialisiert &mdash; mit über 20 Jahren Erfahrung
            und mehr als 2.000 erfolgreichen Verfahren.
          </p>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {[
              {
                title: 'Nachweisliche Erfolgsbilanz',
                desc: 'Über 2.000 erfolgreiche Verfahren, 5,0 Sterne auf anwalt.de. Unsere Erfahrung ist Ihr Vorteil bei der Abfindungsverhandlung.',
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
              },
              {
                title: 'Einfach & Transparent',
                desc: 'Klare Kommunikation, keine versteckten Kosten. Sie wissen jederzeit, was passiert und was es kostet. Ersteinschätzung immer kostenlos.',
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
              },
              {
                title: 'Einfacher Prozess: Sofort-Check',
                desc: 'Formular ausfüllen, Kündigung hochladen, Ersteinschätzung in 24 Stunden erhalten. Alles digital, schnell und unkompliziert.',
                icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-border rounded overflow-hidden flex">
                <div className="w-[56px] min-w-[56px] bg-gold flex items-center justify-center text-white">{card.icon}</div>
                <div className="p-5">
                  <h3 className="font-serif text-[1rem] font-bold mb-2">{card.title}</h3>
                  <p className="text-[0.84rem] text-ink-muted leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── k. Trust Bar ───── */}
      <section className="py-[40px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-4 gap-0 border border-gold rounded-sm overflow-hidden bg-cream max-md:grid-cols-2">
            {[
              { value: '5.000+', label: 'Beratungen' },
              { value: '2.000+', label: 'Verfahren' },
              { value: '20+', label: 'Jahre Erfahrung' },
              { value: '5,0 \u2605', label: 'Bewertung' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-5 px-4${i < 3 ? ' border-r border-gold/30 max-md:border-r-0' : ''}${i < 2 ? ' max-md:border-b max-md:border-gold/30' : ''}`}
              >
                <div className="font-serif text-[1.3rem] font-bold text-gold-dark">{stat.value}</div>
                <div className="text-[0.78rem] text-ink-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── l. FAQ Accordion ───── */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zur Kündigung nach {label}
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
                <div className={`overflow-hidden transition-all duration-300 text-[0.92rem] text-ink-light leading-relaxed ${faqOpen === i ? 'max-h-[500px] pb-[22px]' : 'max-h-0'}`}>
                  <DejureText text={faq.a} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── m. Internal Navigation ───── */}
      <section className="py-[50px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex flex-wrap gap-3">
            {prev && (
              <Link href={`/kuendigung-nach-${prev.slug}/`} className="py-2.5 px-5 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all">
                &larr; {prev.count} {prev.count === 1 ? 'Abmahnung' : 'Abmahnungen'}
              </Link>
            )}
            {next && (
              <Link href={`/kuendigung-nach-${next.slug}/`} className="py-2.5 px-5 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all">
                {next.count} Abmahnungen &rarr;
              </Link>
            )}
            {abmahnungEntries.filter((e) => e.count !== entry.count && e.count !== prev?.count && e.count !== next?.count).map((e) => (
              <Link key={e.count} href={`/kuendigung-nach-${e.slug}/`} className="py-2.5 px-5 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all">
                {e.count} {e.count === 1 ? 'Abmahnung' : 'Abmahnungen'}
              </Link>
            ))}
            <Link href="/abmahnung" className="py-2.5 px-5 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all">
              Abmahnung Übersicht
            </Link>
            <Link href="/kuendigung" className="py-2.5 px-5 rounded-full border border-border text-[0.85rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-all">
              Kündigung Übersicht
            </Link>
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

      {/* ───── n. Final CTA Hero ───── */}
      <section className="py-[80px] px-8 bg-[#1C1408] text-white">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-4">
            Jetzt kostenlose Erstberatung sichern
          </h2>
          <p className="text-white/60 text-[0.92rem] mb-6">
            ★★★★★ &middot; 5,0 &middot; 68 Bewertungen auf anwalt.de
          </p>
          <div className="flex justify-center gap-6 mb-8 text-[0.88rem] text-white/80 flex-wrap">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              Kostenlose Erstberatung
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              Über 2.000 erfolgreiche Verfahren
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
              Rückruf innerhalb 24h
            </span>
          </div>
          <a
            href="/#kontakt"
            className="inline-block py-4 px-10 bg-gold text-white border-none rounded-sm font-sans text-[1.05rem] font-semibold no-underline transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.35)]"
          >
            Kündigung kostenlos prüfen lassen &rarr;
          </a>
        </div>
      </section>

      {/* ───── o. Sticky CTA Bar ───── */}
      <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#1C1408] border-t-2 border-gold py-3 px-8">
        <div className="max-w-content mx-auto flex items-center justify-between gap-4">
          <div className="text-white">
            <span className="font-semibold text-[0.92rem]">Kündigung prüfen lassen</span>
            <span className="text-white/50 text-[0.78rem] ml-2 max-md:hidden">Kostenlos &middot; Antwort in 24h</span>
          </div>
          <a href="/#kontakt" className="inline-block py-2.5 px-6 bg-gold text-white border-none rounded-sm font-sans text-[0.88rem] font-semibold no-underline whitespace-nowrap transition-all hover:bg-gold-dark">
            Jetzt prüfen &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
