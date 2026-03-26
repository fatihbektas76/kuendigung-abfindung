import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import TeilzeitRechnerClient from '@/components/TeilzeitRechnerClient';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const faqs = [
  {
    q: 'Wie viel Urlaub habe ich in Teilzeit?',
    a: 'Teilzeitbeschäftigte haben grundsätzlich denselben Urlaubsanspruch wie Vollzeitbeschäftigte — anteilig nach ihren tatsächlichen Arbeitstagen pro Woche. Die Berechnung erfolgt nach dem Pro-rata-temporis-Grundsatz: Vollzeiturlaubsanspruch ÷ Vollzeit-Arbeitstage/Woche × Ihre Teilzeit-Arbeitstage/Woche. Bei einem 5-Tage-Betrieb mit 30 Tagen Vollzeiturlaub und 3 Arbeitstagen in Teilzeit ergibt das 18 Urlaubstage.',
  },
  {
    q: 'Wie wird Urlaub bei Teilzeit berechnet?',
    a: 'Grundlage ist §3 BUrlG und das Pro-rata-temporis-Prinzip. Die Formel lautet: Vollzeiturlaubsanspruch ÷ Arbeitstage Vollzeit × Ihre Arbeitstage in Teilzeit. Bei einer 5-Tage-Vollzeitwoche mit 20 Tagen Urlaub und 3 Arbeitstagen Teilzeit ergibt sich: 20 ÷ 5 × 3 = 12 Urlaubstage. Bruchteile von mindestens einem halben Tag werden nach §5 Abs. 2 BUrlG auf volle Tage aufgerundet.',
  },
  {
    q: 'Hat Teilzeit weniger Urlaub als Vollzeit?',
    a: 'Nein — der Urlaubsanspruch pro Arbeitstag ist identisch. Er wird lediglich proportional auf die geringere Anzahl an Arbeitstagen umgerechnet. Eine Schlechterstellung von Teilzeitbeschäftigten ist nach §4 TzBfG ausdrücklich verboten.',
  },
  {
    q: 'Was gilt bei der 4-Tage-Woche?',
    a: 'Bei einer 4-Tage-Woche in einem 5-Tage-Betrieb mit 20 Tagen Urlaubsanspruch (Vollzeit) ergibt sich: 20 ÷ 5 × 4 = 16 Urlaubstage. Bei 30 Tagen Vollzeiturlaubsanspruch entsprechend: 30 ÷ 5 × 4 = 24 Urlaubstage.',
  },
  {
    q: 'Gilt das auch für Minijob und 450-Euro-Job?',
    a: 'Ja. Auch geringfügig Beschäftigte haben gesetzlichen Urlaubsanspruch — anteilig nach ihren Arbeitstagen. Dieser Anspruch besteht unabhängig von der Vergütungshöhe und kann nicht durch den Arbeitsvertrag ausgeschlossen werden.',
  },
  {
    q: 'Was passiert beim Wechsel von Vollzeit auf Teilzeit?',
    a: 'Bereits erworbener Vollzeiturlaub bleibt bestehen. Ab dem Wechsel wird der Urlaub anteilig nach neuer Stundenzahl berechnet. Das Bundesarbeitsgericht hat mit Urteil vom 10.02.2015 (9 AZR 53/14) klargestellt, dass ein übertragener Vollzeiturlaubsanspruch auch nach dem Wechsel in Teilzeit in voller Höhe erhalten bleibt.',
  },
  {
    q: 'Kann mein Arbeitgeber Teilzeiturlaubsanspruch verweigern?',
    a: 'Nein. Der Urlaubsanspruch ist ein gesetzliches Recht (§1 BUrlG), das nicht vertraglich ausgeschlossen werden kann. Bei Weigerung des Arbeitgebers können Sie den Anspruch notfalls arbeitsgerichtlich durchsetzen — oft reicht jedoch ein Anwaltsschreiben aus.',
  },
];

const tabelle5Tage = [
  { tage: 1, u20: 4, u25: 5, u30: 6 },
  { tage: 2, u20: 8, u25: 10, u30: 12 },
  { tage: 3, u20: 12, u25: 15, u30: 18 },
  { tage: 4, u20: 16, u25: 20, u30: 24 },
  { tage: 5, u20: 20, u25: 25, u30: 30 },
];

const tabelle6Tage = [
  { tage: 1, u24: 4, u28: 5, u30: 5 },
  { tage: 2, u24: 8, u28: 9, u30: 10 },
  { tage: 3, u24: 12, u28: 14, u30: 15 },
  { tage: 4, u24: 16, u28: 19, u30: 20 },
  { tage: 5, u24: 20, u28: 23, u30: 25 },
  { tage: 6, u24: 24, u28: 28, u30: 30 },
];

export default function UrlaubTeilzeitRechnerPage() {
  return (
    <main>
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
              { '@type': 'ListItem', position: 3, name: 'Urlaub Teilzeit berechnen', item: `${BASE_URL}/urlaub-teilzeit-rechner` },
            ],
          }),
        }}
      />

      {/* Schema.org - WebApplication + AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Urlaubsrechner Teilzeit — Pro-rata-temporis-Berechnung',
            applicationCategory: 'Legal Tool',
            operatingSystem: 'Any',
            url: `${BASE_URL}/urlaub-teilzeit-rechner`,
            description:
              'Kostenloser Urlaubsrechner für Teilzeitbeschäftigte. Berechnet den anteiligen Urlaubsanspruch nach dem Pro-rata-temporis-Grundsatz (§3 BUrlG).',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '68',
              bestRating: '5',
              worstRating: '1',
            },
            provider: { '@id': `${BASE_URL}/#organization` },
            author: {
              '@type': 'Person',
              name: 'Fatih Bektas',
              jobTitle: 'Fachanwalt für Arbeitsrecht',
              hasCredential: 'Fachanwalt für Arbeitsrecht seit 2011',
              memberOf: 'Rechtsanwaltskammer Karlsruhe',
              sameAs: ['https://www.anwalt.de/fatihbektas', `${BASE_URL}/team`],
            },
            datePublished: '2025-01-15',
            dateModified: new Date().toISOString().slice(0, 10),
            inLanguage: 'de',
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

      {/* Schema.org - HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Urlaubsanspruch Teilzeit in 3 Schritten berechnen',
            description:
              'So berechnen Sie Ihren Teilzeit-Urlaubsanspruch nach dem Pro-rata-temporis-Grundsatz.',
            totalTime: 'PT1M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Vollzeiturlaubsanspruch eingeben',
                text: 'Geben Sie den Urlaubsanspruch ein, der im Unternehmen bei Vollzeit gilt — laut Arbeitsvertrag oder Tarifvertrag.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Arbeitswoche des Unternehmens wählen',
                text: 'Wählen Sie, ob Ihr Unternehmen auf Basis einer 5-Tage- oder 6-Tage-Woche arbeitet.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Ihre Teilzeit-Arbeitstage angeben',
                text: 'Wählen Sie, wie viele Tage pro Woche Sie tatsächlich arbeiten — und erhalten Sie sofort Ihren anteiligen Urlaubsanspruch.',
              },
            ],
          }),
        }}
      />

      {/* Schema.org - WebPage + Speakable */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Urlaub Teilzeit berechnen ${new Date().getFullYear()}`,
            url: `${BASE_URL}/urlaub-teilzeit-rechner`,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['#direktantwort', 'h1', '#ergebnis-box'],
            },
            isBasedOn: [
              {
                '@type': 'Legislation',
                name: '§3 Bundesurlaubsgesetz (BUrlG)',
                url: 'https://www.gesetze-im-internet.de/burlg/__3.html',
              },
              {
                '@type': 'Legislation',
                name: '§4 Teilzeit- und Befristungsgesetz (TzBfG)',
                url: 'https://www.gesetze-im-internet.de/tzbfg/__4.html',
              },
            ],
          }),
        }}
      />

      {/* Schema.org - LegalService Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': `${BASE_URL}/#organization`,
            name: 'APOS Legal — Kanzlei Fatih Bektas',
            url: BASE_URL,
            telephone: '+4915127003173',
            email: 'bektas@apos.legal',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '68',
            },
          }),
        }}
      />

      {/* GEO-Optimierung */}
      <div itemScope itemType="https://schema.org/WebApplication" style={{ display: 'none' }}>
        <meta itemProp="name" content="Urlaubsrechner Teilzeit" />
        <meta
          itemProp="description"
          content="Kostenloser Urlaubsrechner für Teilzeitbeschäftigte nach §3 BUrlG und Pro-rata-temporis-Prinzip."
        />
        <meta itemProp="author" content="Fatih Bektas, Fachanwalt für Arbeitsrecht" />
        <meta itemProp="inLanguage" content="de" />
        <meta itemProp="applicationCategory" content="Legal Tool" />
        <meta itemProp="isBasedOn" content="§3 BUrlG, §4 TzBfG, Pro-rata-temporis" />
      </div>

      {/* Hero */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="text-gold no-underline hover:underline">Tools &amp; Rechner</Link>
            <span className="mx-2">/</span>
            <span>Urlaub Teilzeit berechnen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Kostenlos &amp; sofort
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Urlaub Teilzeit berechnen &mdash; Ihr Urlaubsanspruch auf einen Blick
          </h1>

          {/* Direktantwort (GEO) */}
          <div id="direktantwort" className="max-w-[640px] text-[0.95rem] text-ink-light leading-relaxed mt-4">
            <p className="m-0">
              <strong>Teilzeitbeschäftigte</strong> haben denselben Urlaubsanspruch wie Vollzeitbeschäftigte &mdash;
              anteilig umgerechnet auf ihre tatsächlichen Arbeitstage (<strong>Pro-rata-temporis-Prinzip, &sect;3 BUrlG</strong>).
              Die Formel lautet: <strong>Vollzeiturlaubsanspruch &divide; Arbeitstage Vollzeit &times; Ihre Arbeitstage
              in Teilzeit</strong>. Bei 20 Tagen Vollzeiturlaubsanspruch (5-Tage-Betrieb) und 3 Tagen Teilzeit ergibt
              das <strong>12 Urlaubstage</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kostenlos
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Nach &sect;3 BUrlG
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sofortergebnis
            </span>
          </div>
        </div>
      </div>

      {/* CTA #1 */}
      <section className="py-6 px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/30 rounded-sm p-5 bg-gold-bg flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[0.95rem] text-ink font-semibold m-0">
              Urlaubsanspruch nicht gewährt oder falsch berechnet? Wir prüfen Ihre Ansprüche kostenlos.
            </p>
            <Link
              href="/kuendigung-pruefen"
              className="inline-block py-2.5 px-6 bg-gold-dark text-white border-none rounded-sm font-sans text-[0.88rem] font-semibold no-underline transition-all hover:bg-[#635428] whitespace-nowrap"
            >
              Jetzt kostenlos prüfen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Rechner (Client Component) */}
      <TeilzeitRechnerClient />

      {/* Erklärung: Wie wird Urlaub bei Teilzeit berechnet? */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Berechnungsformel
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Wie wird Urlaub bei Teilzeit berechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Grundlage der Berechnung ist das sogenannte <strong>Pro-rata-temporis-Prinzip</strong>. Es besagt,
              dass der Urlaubsanspruch eines Teilzeitbeschäftigten im selben Verhältnis steht wie seine Arbeitszeit
              zur Vollzeit. Rechtlich verankert ist dies in <strong>&sect;3 BUrlG</strong> in Verbindung mit
              <strong> &sect;4 TzBfG</strong>, der eine Benachteiligung von Teilzeitbeschäftigten ausdrücklich verbietet.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Die Berechnung erfolgt nach folgender Formel:
              <strong> Urlaubsanspruch Teilzeit = Vollzeiturlaubsanspruch &divide; Arbeitstage Vollzeit
              &times; Ihre Arbeitstage in Teilzeit</strong>.
              Beispiel: 30 Tage Vollzeiturlaubsanspruch, 5-Tage-Betrieb, Sie arbeiten 3 Tage
              &rarr; 30 &divide; 5 &times; 3 = <strong>18 Tage</strong>.
            </p>

            {/* Formel-Box */}
            <div className="my-8 py-6 px-8 bg-white border-2 border-gold/30 rounded-sm text-center">
              <div className="text-[0.82rem] font-bold tracking-[0.1em] uppercase text-gold-dark mb-4">
                Pro-rata-temporis-Formel
              </div>
              <div className="font-serif text-[1.1rem] leading-[1.8] text-ink">
                <strong>Urlaub Teilzeit</strong> =<br />
                <span className="inline-block border-b-2 border-ink/30 px-2">
                  Vollzeiturlaubsanspruch
                </span>
                <br />
                <span className="text-[0.88rem] text-ink-muted">Arbeitstage Vollzeit/Woche</span>
                <br />
                <span className="text-[1.2rem]">&times;</span> <strong>Ihre Arbeitstage/Woche</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urlaubstabelle */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Übersicht
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-8">
            Urlaubsanspruch Teilzeit &mdash; Tabelle für alle Konstellationen
          </h2>

          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {/* Tabelle 1: 5-Tage-Betrieb */}
            <div>
              <h3 className="font-serif text-[1.05rem] font-bold mb-4">Betrieb mit 5-Tage-Woche</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.88rem]">
                  <thead>
                    <tr className="border-b-2 border-gold/30">
                      <th className="text-left py-2.5 px-3 font-semibold">Arbeitstage/Woche</th>
                      <th className="text-right py-2.5 px-3 font-semibold">20 Tage</th>
                      <th className="text-right py-2.5 px-3 font-semibold">25 Tage</th>
                      <th className="text-right py-2.5 px-3 font-semibold">30 Tage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelle5Tage.map((row) => (
                      <tr key={row.tage} className="border-b border-border">
                        <td className="py-2.5 px-3">{row.tage} Tag{row.tage > 1 ? 'e' : ''}/Woche</td>
                        <td className="py-2.5 px-3 text-right">{row.u20} Tage</td>
                        <td className="py-2.5 px-3 text-right">{row.u25} Tage</td>
                        <td className="py-2.5 px-3 text-right font-semibold">{row.u30} Tage</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabelle 2: 6-Tage-Betrieb */}
            <div>
              <h3 className="font-serif text-[1.05rem] font-bold mb-4">Betrieb mit 6-Tage-Woche</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.88rem]">
                  <thead>
                    <tr className="border-b-2 border-gold/30">
                      <th className="text-left py-2.5 px-3 font-semibold">Arbeitstage/Woche</th>
                      <th className="text-right py-2.5 px-3 font-semibold">24 Tage</th>
                      <th className="text-right py-2.5 px-3 font-semibold">28 Tage</th>
                      <th className="text-right py-2.5 px-3 font-semibold">30 Tage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelle6Tage.map((row) => (
                      <tr key={row.tage} className="border-b border-border">
                        <td className="py-2.5 px-3">{row.tage} Tag{row.tage > 1 ? 'e' : ''}/Woche</td>
                        <td className="py-2.5 px-3 text-right">{row.u24} Tage</td>
                        <td className="py-2.5 px-3 text-right">{row.u28} Tage</td>
                        <td className="py-2.5 px-3 text-right font-semibold">{row.u30} Tage</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-[0.84rem] text-ink-muted leading-relaxed mt-6">
            Alle Werte gerundet. Bruchteile von Urlaubstagen werden nach &sect;5 Abs. 2 BUrlG auf volle Tage
            aufgerundet, wenn sie mindestens einen halben Tag ergeben.
          </p>
        </div>
      </section>

      {/* Wechsel Vollzeit → Teilzeit */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Sonderfall
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Was gilt bei Wechsel von Vollzeit auf Teilzeit?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Wechselt ein Arbeitnehmer im laufenden Urlaubsjahr von Vollzeit auf Teilzeit, wird das Jahr anteilig
              aufgeteilt. Für die Vollzeitmonate gilt der Vollzeiturlaubsanspruch, für die Teilzeitmonate der
              entsprechend umgerechnete Teilzeitanspruch. Bereits genommener Urlaub wird angerechnet.
              Das <strong>Bundesarbeitsgericht</strong> hat mit Urteil vom 10.02.2015 (9 AZR 53/14) klargestellt,
              dass ein übertragener Vollzeiturlaubsanspruch auch nach dem Wechsel in Teilzeit in voller Höhe erhalten
              bleibt. Prüfen Sie auch Ihre{' '}
              <Link href="/kuendigungsfrist-rechner" className="text-gold no-underline hover:underline">Kündigungsfrist</Link>
              , falls ein Wechsel im Zusammenhang mit einer Kündigung steht.
            </p>
          </div>
        </div>
      </section>

      {/* Das müssen Sie wissen */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Urlaub bei Teilzeit &mdash; Das müssen Sie wissen
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              <strong>&sect;4 TzBfG</strong> verbietet ausdrücklich die Benachteiligung von Teilzeitbeschäftigten
              gegenüber Vollzeitkräften. Dies bedeutet: Pro Arbeitstag steht jedem Arbeitnehmer der gleiche
              Urlaubsanspruch zu &mdash; unabhängig davon, ob er 5 oder 3 Tage pro Woche arbeitet.
              Wer als Teilzeitkraft weniger Urlaub pro Arbeitstag erhält als ein vergleichbarer Vollzeitbeschäftigter,
              kann auf Gleichbehandlung bestehen.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              Auch geringfügig Beschäftigte (<strong>Minijob</strong>) haben Anspruch auf bezahlten Urlaub &mdash;
              anteilig nach ihren tatsächlichen Arbeitstagen. Wer nur einen Tag pro Woche arbeitet, erhält bei einem
              5-Tage-Betrieb mit 20 Tagen Vollzeiturlaubsanspruch immerhin <strong>4 Tage</strong> bezahlten Urlaub
              pro Jahr. Viele Minijobber wissen nicht von diesem Anspruch &mdash; und verlieren ihn durch Nichtinanspruchnahme.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Erkrankt ein Teilzeitbeschäftigter während des Urlaubs, werden die Krankheitstage nicht auf den Urlaub
              angerechnet (<strong>&sect;9 BUrlG</strong>) &mdash; genau wie bei Vollzeitbeschäftigten. Der Urlaub gilt
              als nicht genommen und kann nachgeholt werden. Wurde Ihr Resturlaub bei Beendigung des Arbeitsverhältnisses
              nicht gewährt? Berechnen Sie Ihre{' '}
              <Link href="/urlaubsabgeltung-rechner" className="text-gold no-underline hover:underline">Urlaubsabgeltung</Link>.
              Prüfen Sie außerdem, ob Ihnen{' '}
              <Link href="/ueberstundenrechner" className="text-gold no-underline hover:underline">Überstundenvergütung</Link>{' '}
              zusteht.
            </p>
          </div>
        </div>
      </section>

      {/* CTA #3 — Dark Banner */}
      <section className="py-[70px] px-8 bg-[#2A1F0E]">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-gold mb-3">
            Urlaubsanspruch nicht gewährt?
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Verweigert Ihr Arbeitgeber Ihren Teilzeiturlaubsanspruch oder berechnet ihn falsch?
            Fachanwalt Fatih Bektas prüft Ihre Ansprüche &mdash; kostenlos und innerhalb von 24 Stunden.
          </p>
          <Link
            href="/kuendigung-pruefen"
            className="inline-block py-3.5 px-8 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.35)]"
          >
            Jetzt kostenlos anfragen &rarr;
          </Link>
          <div className="flex justify-center gap-5 mt-5 text-[0.78rem] text-white/50">
            <span>&#10003; Antwort in 24h</span>
            <span>&#10003; Kein Kostenrisiko</span>
            <span>&#10003; 68 Fünf-Sterne-Bewertungen auf anwalt.de</span>
          </div>
        </div>
      </section>

      {/* Quellenblock */}
      <section className="py-10 px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/burlg/__3.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  &sect;3 BUrlG &mdash; Dauer des Urlaubs &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/tzbfg/__4.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  &sect;4 TzBfG &mdash; Verbot der Diskriminierung &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/burlg/__9.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  &sect;9 BUrlG &mdash; Erkrankung während des Urlaubs &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://www.bundesarbeitsgericht.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold no-underline hover:underline"
                >
                  BAG 9 AZR 53/14 (10.02.2015) &mdash; Urlaubsanspruch bei Teilzeitwechsel &rarr;
                </a>
              </li>
            </ul>
            <p className="text-[0.78rem] text-ink-muted mt-4 italic leading-relaxed">
              Alle Inhalte wurden von Fachanwalt Fatih Bektas (Rechtsanwaltskammer Karlsruhe, Fachanwalt für
              Arbeitsrecht seit 2011) erstellt und geprüft.
              Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.
              Keine Rechtsberatung im Einzelfall.
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
            Häufige Fragen zum Urlaubsanspruch in Teilzeit
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA #4 */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="border-2 border-gold/20 rounded-sm p-8 bg-cream text-center max-w-[640px] mx-auto">
            <h2 className="font-serif text-[1.3rem] font-bold mb-3">
              Ergebnis berechnet &mdash; weitere Ansprüche prüfen?
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6">
              Neben dem Urlaubsanspruch können nach einer Kündigung oder bei Problemen im Arbeitsverhältnis
              weitere Rechte bestehen: Abfindung, Überstunden, Abgeltung. Wir prüfen alles kostenlos.
            </p>
            <Link
              href="/kuendigung-pruefen"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
            >
              Kostenlose Ersteinschätzung vom Fachanwalt &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
