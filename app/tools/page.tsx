import Link from 'next/link';
import StandAnzeige from '@/components/StandAnzeige';
import FaqAccordion from '@/components/FaqAccordion';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const tools = [
  {
    label: 'Berechnung',
    title: 'Abfindungsrechner',
    text: 'Wie hoch ist Ihre Abfindung? Geben Sie Bruttogehalt und Betriebszugehörigkeit ein und erhalten Sie sofort drei realistische Szenarien basierend auf der anerkannten Abfindungsformel (0,5 \u00d7 Monatsgehalt \u00d7 Beschäftigungsjahr).',
    checks: [
      'Abfindung in 30 Sekunden berechnen',
      'Min-, Mittel- und Max-Szenario',
      'Basiert auf § 1a KSchG Faustformel',
    ],
    linkText: 'Jetzt berechnen',
    href: '/abfindungsrechner',
  },
  {
    label: 'Prüfung',
    title: 'Kündigungscheck',
    text: 'Kündigung erhalten? Unser geführter Fragebogen prüft in 2 Minuten, ob Ihr Kündigungsschutz greift, ob Sondertatbestände vorliegen und welche Abfindung realistisch ist. Am Ende erhalten Sie eine persönliche Ersteinschätzung vom Fachanwalt.',
    checks: [
      'KSchG-Schutz prüfen',
      'Sonderkündigungsschutz erkennen',
      'Kostenlose anwaltliche Ersteinschätzung',
    ],
    linkText: 'Kündigung prüfen',
    href: '/kuendigung-pruefen',
  },
  {
    label: 'Orientierung',
    title: 'Aufhebungsvertrag prüfen',
    text: 'Haben Sie einen Aufhebungsvertrag erhalten? Unser Tool hilft Ihnen, die wichtigsten Klauseln zu verstehen, Ihre Verhandlungsposition einzuschätzen und typische Fallen zu vermeiden — bevor Sie unterschreiben.',
    checks: [
      'Abfindungshöhe realistisch einschätzen',
      'Sperrzeit beim Arbeitslosengeld prüfen',
      'Fristen und Widerrufsrecht beachten',
    ],
    linkText: 'Jetzt prüfen',
    href: '/kuendigung-pruefen',
  },
  {
    label: 'Schwellenwert',
    title: 'Schwellenwert-Rechner §23 KSchG',
    text: 'Gilt das Kündigungsschutzgesetz für Ihren Betrieb? Geben Sie die Mitarbeiterzahlen ein und prüfen Sie sofort, ob der Schwellenwert von 10 Vollzeitäquivalenten (FTE) überschritten wird.',
    checks: [
      'Vollzeit, Teilzeit & Minijobber erfassen',
      'Automatische FTE-Berechnung',
      'Sofort wissen, ob KSchG gilt',
    ],
    linkText: 'Jetzt prüfen',
    href: '/schwellenwert-rechner',
  },
  {
    label: 'Vergütung',
    title: 'Überstundenrechner',
    text: 'Berechnen Sie Ihren Bruttostundenlohn und die Ihnen zustehende Überstundenvergütung. Mit optionalem Zuschlag, Tageswert und Jahreshochrechnung — sofort und kostenlos.',
    checks: [
      'Stundenlohn aus Monatsgehalt berechnen',
      'Überstundenvergütung mit Zuschlag',
      'Jahreshochrechnung auf Knopfdruck',
    ],
    linkText: 'Jetzt berechnen',
    href: '/ueberstundenrechner',
  },
  {
    label: 'Fristen',
    title: 'Kündigungsfrist-Rechner',
    text: 'Wann endet Ihr Arbeitsverhältnis? Geben Sie Kündigungsdatum und Frist ein — der Rechner zeigt Ihnen taggenau den Beendigungstermin, inkl. 3-Wochen-Klagefrist und §622 BGB Referenztabelle.',
    checks: [
      'Taggenau, Monatsende oder Quartalsende',
      'Automatische Klagefrist-Berechnung',
      'Gesetzliche Fristen nach §622 BGB',
    ],
    linkText: 'Frist berechnen',
    href: '/kuendigungsfrist-rechner',
  },
  {
    label: 'Urlaubsabgeltung',
    title: 'Urlaubsabgeltungsrechner',
    text: 'Resturlaub nicht genommen? Berechnen Sie kostenlos Ihren Abgeltungsanspruch nach §11 BUrlG — sofort und ohne Anmeldung.',
    checks: [
      'Berechnung nach §11 BUrlG',
      'Anteiligen Urlaubsanspruch berechnen',
      'Ausschlussfristen im Blick',
    ],
    linkText: 'Jetzt berechnen',
    href: '/urlaubsabgeltung-rechner',
  },
];

const faqs = [
  {
    q: 'Sind die Tools wirklich kostenlos?',
    a: 'Ja, vollständig. Alle Tools auf dieser Seite können ohne Registrierung und ohne Kosten genutzt werden. Auch die anwaltliche Ersteinschätzung im Anschluss ist kostenlos und unverbindlich. Erst wenn Sie sich für eine Mandatierung entscheiden, fallen Kosten an — die bei bestehender Rechtsschutzversicherung häufig vollständig übernommen werden.',
  },
  {
    q: 'Wie genau ist der Abfindungsrechner?',
    a: 'Der Rechner liefert eine realistische Orientierung auf Basis der anerkannten Faustformel nach § 1a KSchG. Die tatsächlich erzielbare Abfindung hängt von weiteren Faktoren ab: Verhandlungsbereitschaft des Arbeitgebers, Stärke des Kündigungsschutzes, Prozesskostenrisiko und wirtschaftliche Lage des Unternehmens. Ein erfahrener Fachanwalt kann diese Faktoren für Sie einschätzen.',
  },
  {
    q: 'Was passiert nach dem Kündigungscheck?',
    a: 'Nach dem Ausfüllen des Fragebogens erhalten Sie eine sofortige Abfindungsschätzung. Zusätzlich nimmt Fachanwalt Fatih Bektas innerhalb von 24 Stunden persönlich Kontakt auf und gibt Ihnen eine fundierte Ersteinschätzung zu Ihrer konkreten Situation — kostenlos und ohne jede Verpflichtung.',
  },
  {
    q: 'Gilt der Kündigungsschutz für mich?',
    a: 'Das Kündigungsschutzgesetz gilt grundsätzlich für Arbeitnehmer, die länger als 6 Monate in einem Betrieb mit mehr als 10 Vollzeit-Mitarbeitern beschäftigt sind. Daneben gibt es besondere Schutztatbestände — etwa bei Schwangerschaft, Elternzeit, Schwerbehinderung oder als Betriebsratsmitglied. Unser Kündigungscheck prüft alle relevanten Faktoren automatisch.',
  },
  {
    q: 'Wofür brauche ich den Schwellenwert-Rechner?',
    a: 'Das Kündigungsschutzgesetz gilt nur in Betrieben mit mehr als 10 Vollzeitäquivalenten (FTE). Der Schwellenwert-Rechner prüft, ob Ihr Betrieb diesen Wert überschreitet — denn davon hängt ab, ob Ihr Arbeitgeber überhaupt einen Kündigungsgrund braucht. Teilzeitkräfte und Minijobber werden anteilig gezählt.',
  },
  {
    q: 'Was ist der Unterschied zwischen Abfindung und Kündigungsschutzklage?',
    a: 'Die Kündigungsschutzklage ist das stärkere Mittel: Sie können damit die Unwirksamkeit der Kündigung gerichtlich feststellen lassen — mit dem Ziel der Weiterbeschäftigung oder einer höheren Abfindung als Vergleich. Die Abfindung nach § 1a KSchG ist dagegen eine einvernehmliche Lösung ohne Klage. Welcher Weg besser ist, hängt von Ihrer konkreten Situation ab.',
  },
];

export default function ToolsPage() {
  return (
    <main>
      {/* GEO-Optimierung */}
      <div itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="Arbeitsrecht Tools & Rechner — kostenlos" />
        <meta itemProp="description" content="Kostenlose Arbeitsrechts-Tools: Abfindungsrechner und Kündigungscheck vom Fachanwalt für Arbeitsrecht Fatih Bektas." />
        <meta itemProp="author" content="Fatih Bektas" />
        <meta itemProp="inLanguage" content="de" />
      </div>

      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Tools & Rechner', item: `${BASE_URL}/tools` },
            ],
          }),
        }}
      />

      {/* Schema.org - CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Arbeitsrecht Tools & Rechner',
            description:
              'Kostenlose Arbeitsrechts-Tools: Abfindungsrechner, Kündigungscheck & mehr. Sofortige Ersteinschätzung vom Fachanwalt für Arbeitsrecht — 100% kostenlos & unverbindlich.',
            url: `${BASE_URL}/tools`,
            provider: { '@id': `${BASE_URL}/#organization` },
            inLanguage: 'de',
            datePublished: '2025-01-15',
            dateModified: new Date().toISOString().slice(0, 10),
          }),
        }}
      />

      {/* Schema.org - ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Abfindungsrechner', url: `${BASE_URL}/abfindungsrechner` },
              { '@type': 'ListItem', position: 2, name: 'Kündigungscheck', url: `${BASE_URL}/kuendigung-pruefen` },
              { '@type': 'ListItem', position: 3, name: 'Aufhebungsvertrag prüfen', url: `${BASE_URL}/kuendigung-pruefen` },
              { '@type': 'ListItem', position: 4, name: 'Schwellenwert-Rechner §23 KSchG', url: `${BASE_URL}/schwellenwert-rechner` },
              { '@type': 'ListItem', position: 5, name: 'Überstundenrechner', url: `${BASE_URL}/ueberstundenrechner` },
              { '@type': 'ListItem', position: 6, name: 'Kündigungsfrist-Rechner', url: `${BASE_URL}/kuendigungsfrist-rechner` },
              { '@type': 'ListItem', position: 7, name: 'Urlaubsabgeltungsrechner', url: `${BASE_URL}/urlaubsabgeltung-rechner` },
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <span>Tools &amp; Rechner</span>
          </nav>
          <StandAnzeige />
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5 mt-4">
            Kostenlos &amp; unverbindlich
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Arbeitsrecht Tools &amp; Rechner
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Nutzen Sie unsere kostenlosen Online-Tools, um Ihre arbeitsrechtliche Situation schnell einzuschätzen.
            Entwickelt von Fachanwalt Fatih Bektas &mdash; für Arbeitnehmer, die unkompliziert und fundiert handeln wollen.
          </p>
        </div>
      </div>

      {/* Tool-Karten */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group block bg-cream border border-border-light rounded p-7 no-underline transition-all hover:border-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.12)]"
              >
                <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
                  {tool.label}
                </div>
                <h2 className="font-serif text-[1.25rem] font-bold text-ink mb-3 group-hover:text-gold-dark transition-colors">
                  {tool.title}
                </h2>
                <p className="text-[0.88rem] text-ink-light leading-relaxed mb-4">
                  {tool.text}
                </p>
                <ul className="space-y-2 mb-5">
                  {tool.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-[0.84rem] text-ink-light">
                      <svg className="min-w-[16px] text-gold mt-0.5" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {check}
                    </li>
                  ))}
                </ul>
                <span className="text-[0.88rem] font-semibold text-gold-dark group-hover:underline">
                  {tool.linkText} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Warum diese Tools? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Ihre Vorteile
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-8">
            Warum diese Tools?
          </h2>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink mb-1">In 2 Minuten</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                  Alle Tools sind auf maximale Effizienz ausgelegt &mdash; ohne Registrierung, ohne Wartezeit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink mb-1">100% kostenlos</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                  Kein Abo, keine versteckten Kosten. Die Ersteinschätzung ist und bleibt gratis.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink mb-1">Fachanwalt dahinter</h3>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                  Entwickelt von Fatih Bektas, Fachanwalt für Arbeitsrecht seit 2011.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* So funktionieren unsere Tools */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              So funktionieren unsere Tools
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Unsere Tools sind keine einfachen Rechner &mdash; sie bilden die tatsächliche rechtliche Prüflogik ab,
              die ein Fachanwalt im Erstgespräch anwendet. Der{' '}
              <Link href="/kuendigung-pruefen" className="text-gold no-underline hover:underline">Kündigungscheck</Link>{' '}
              fragt zum Beispiel gezielt nach Betriebsgröße, Beschäftigungsdauer und besonderen
              Schutztatbeständen wie Schwerbehinderung oder Elternzeit &mdash; denn genau diese Faktoren bestimmen,
              ob das Kündigungsschutzgesetz greift.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Der{' '}
              <Link href="/abfindungsrechner" className="text-gold no-underline hover:underline">Abfindungsrechner</Link>{' '}
              basiert auf der in der Praxis anerkannten Faustformel: 0,5 Bruttomonatsgehälter pro
              Beschäftigungsjahr als Ausgangspunkt. Je nach Verhandlungsgeschick, Kündigungsschutzlage und
              wirtschaftlicher Situation des Arbeitgebers sind Abweichungen nach oben oder unten möglich &mdash; das
              Ergebnis zeigt Ihnen daher Min-, Mittel- und Max-Szenario.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Der{' '}
              <Link href="/schwellenwert-rechner" className="text-gold no-underline hover:underline">Schwellenwert-Rechner</Link>{' '}
              beantwortet eine der häufigsten Fragen im Arbeitsrecht: Gilt das Kündigungsschutzgesetz überhaupt für
              meinen Betrieb? Er berechnet die Vollzeitäquivalente (FTE) nach &sect;23 KSchG und zeigt Ihnen sofort,
              ob der Schwellenwert von 10 überschritten wird.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Wichtig: Kein Online-Tool ersetzt eine individuelle anwaltliche Beratung. Die Tools geben Ihnen eine
              fundierte Orientierung &mdash; damit Sie informiert in ein Erstgespräch gehen oder einschätzen können,
              ob sich weiteres Handeln lohnt. Die persönliche Ersteinschätzung durch{' '}
              <Link href="/arbeitsrecht-anwalt" className="text-gold no-underline hover:underline">Fachanwalt Fatih Bektas</Link>{' '}
              ist in jedem Fall kostenlos und unverbindlich.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Fragen zu unseren Tools
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Noch unsicher? Wir helfen persönlich.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas beantwortet Ihre Frage persönlich &mdash;
            kostenlos und innerhalb von 24 Stunden.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
          >
            Jetzt kostenlos anfragen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
