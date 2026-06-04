import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: 'noindex, nofollow',
};

const sections = [
  { id: 'verantwortlicher', label: 'Verantwortlicher' },
  { id: 'uebersicht', label: 'Übersicht der Datenverarbeitung' },
  { id: 'hosting', label: 'Hosting (Vercel)' },
  { id: 'server-logs', label: 'Server-Log-Daten' },
  { id: 'rechte', label: 'Ihre Rechte' },
  { id: 'kontakt', label: 'Kontaktformular' },
  { id: 'analytics', label: 'Google Analytics' },
  { id: 'fonts', label: 'Schriften (selbst gehostet)' },
  { id: 'brevo', label: 'Brevo (Sendinblue)' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'ssl', label: 'SSL-/TLS-Verschlüsselung' },
  { id: 'aenderungen', label: 'Änderungen dieser Erklärung' },
];

function SectionHeader({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-serif text-gold text-base font-semibold tracking-[0.1em] tabular-nums">{number}</span>
      <h2 id={id} className="font-serif text-[1.35rem] md:text-[1.5rem] font-bold text-ink leading-tight scroll-mt-32">
        {title}
      </h2>
    </div>
  );
}

function SubHeader({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="font-sans text-[1.02rem] font-semibold text-ink mt-7 mb-3 scroll-mt-32">
      {children}
    </h3>
  );
}

function Divider() {
  return (
    <div className="my-12 flex items-center gap-4" aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <div className="h-1 w-1 rounded-full bg-gold/60" />
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Legal({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-gold bg-cream-dark/40 pl-5 pr-4 py-4 my-5">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold mb-1.5">
        Rechtsgrundlage
      </p>
      <p className="text-ink-light text-[0.92rem] leading-relaxed">{children}</p>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-ink-light text-[0.95rem] leading-relaxed mb-4">{children}</p>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-gold no-underline hover:underline"
    >
      {children}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <header className="relative bg-gradient-to-b from-cream-dark via-cream to-white pt-[120px] pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative max-w-[760px] mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-light text-[0.85rem] font-medium hover:text-gold transition-colors"
          >
            <span aria-hidden="true">&larr;</span> Zurück zur Startseite
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-sans text-[0.7rem] tracking-[0.22em] uppercase text-gold font-semibold">
                Rechtliche Hinweise
              </p>
              <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-bold text-ink mt-2 leading-[1.05]">
                Datenschutzerklärung
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-medium text-ink-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Stand: Februar 2026
            </div>
          </div>

          <div className="mt-7 h-[2px] w-16 bg-gold" />

          <p className="mt-7 text-ink-light text-[0.95rem] leading-relaxed max-w-[640px]">
            Diese Erklärung informiert Sie nach Art. 13 DSGVO über Art, Umfang und Zweck der
            Verarbeitung personenbezogener Daten auf dieser Website.
          </p>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-6 pt-14 pb-24">
        <nav aria-label="Inhalt" className="mb-14 rounded-xl border border-border bg-cream/50 p-6">
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ink-muted font-semibold mb-4">
            Inhalt
          </p>
          <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2 list-none m-0 p-0">
            {sections.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3 text-[0.9rem]">
                <span className="font-serif text-gold text-xs tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-ink-light hover:text-gold transition-colors no-underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section>
          <SectionHeader number="01" title="Verantwortlicher" id="verantwortlicher" />
          <P>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</P>
          <div className="rounded-xl border border-border bg-cream/40 p-6 space-y-3">
            <p className="text-ink font-semibold text-base">
              APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Fatih Bektas
              <br />
              Am Paradeplatz 20
              <br />
              69126 Heidelberg
            </p>
            <dl className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4 text-[0.92rem] pt-2 border-t border-border">
              <dt className="text-ink-muted font-medium">E-Mail</dt>
              <dd>
                <A href="mailto:info@apos.legal">info@apos.legal</A>
              </dd>
              <dt className="text-ink-muted font-medium">Telefon</dt>
              <dd>
                <A href="tel:+49622295992400">+49 6222 9599 2400</A>
              </dd>
            </dl>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeader number="02" title="Übersicht der Datenverarbeitung" id="uebersicht" />
          <P>
            Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Wir behandeln Ihre Daten
            vertraulich und in Übereinstimmung mit den gesetzlichen Datenschutzvorschriften,
            insbesondere der EU-Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz
            (BDSG).
          </P>
        </section>

        <Divider />

        <section>
          <SectionHeader number="03" title="Hosting (Vercel)" id="hosting" />
          <P>
            Diese Website wird über die <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut,
            CA 91789, USA, betrieben (Hosting in EU-Regionen, u.&nbsp;a. Frankfurt-Edge). Beim
            Aufruf der Website verarbeitet Vercel die Server-Log-Daten, die Ihr Browser automatisch
            übermittelt (siehe Ziff. 4).
          </P>
          <P>
            Bei Vercel handelt es sich um ein US-amerikanisches Unternehmen; eine Verarbeitung
            Ihrer Daten kann daher auch in den USA erfolgen. Rechtsgrundlage des Datentransfers in
            die USA ist der Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023
            zum <strong>EU-U.S. Data Privacy Framework (DPF)</strong> gemäß Art. 45 DSGVO; Vercel
            ist unter dem DPF zertifiziert. Ergänzend hat Vercel die EU-Standardvertragsklauseln
            (Art. 46 Abs. 2 DSGVO) in Form eines Data Processing Addendum vereinbart, die
            insbesondere für nicht vom Angemessenheitsbeschluss erfasste Konstellationen greifen.
            Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Data Processing Addendum) gemäß
            Art. 28 DSGVO.
          </P>
          <div className="rounded-xl border border-border bg-cream/40 p-5 my-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-2">
              Weitere Informationen
            </p>
            <ul className="list-none m-0 p-0 space-y-1.5 text-[0.92rem]">
              <li>
                <A href="https://vercel.com/legal/privacy-policy">
                  vercel.com/legal/privacy-policy
                </A>
              </li>
              <li>
                <A href="https://vercel.com/legal/dpa">vercel.com/legal/dpa</A>
              </li>
            </ul>
          </div>
          <Legal>
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien
            Darstellung und Auslieferung der Website).
          </Legal>
        </section>

        <Divider />

        <section>
          <SectionHeader number="04" title="Server-Log-Daten" id="server-logs" />
          <P>
            Beim Aufruf dieser Website werden durch Ihren Browser automatisch technische
            Informationen übermittelt und in sogenannten Server-Log-Dateien gespeichert. Erfasst
            werden insbesondere:
          </P>
          <ul className="list-disc pl-5 text-ink-light text-[0.95rem] leading-relaxed space-y-1.5 mb-5">
            <li>IP-Adresse des anfragenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene URL und übertragene Datenmenge</li>
            <li>Referrer (zuvor besuchte Seite)</li>
            <li>verwendeter Browser, Betriebssystem und Spracheinstellungen</li>
          </ul>
          <P>
            Diese Daten sind technisch erforderlich, um Ihnen die Website auszuliefern, die
            Stabilität und Sicherheit zu gewährleisten und Angriffe abzuwehren. Eine
            Zusammenführung mit anderen Datenquellen oder eine personenbezogene Auswertung findet
            nicht statt.
          </P>
          <Legal>
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und störungsfreien
            Betrieb der Website).
          </Legal>
        </section>

        <Divider />

        <section>
          <SectionHeader number="05" title="Ihre Rechte" id="rechte" />
          <P>Nach der DSGVO stehen Ihnen folgende Rechte bezüglich Ihrer personenbezogenen Daten zu:</P>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              ['Auskunftsrecht', 'Art. 15 DSGVO', 'Auskunft, ob und welche Daten wir verarbeiten.'],
              ['Berichtigung', 'Art. 16 DSGVO', 'Berichtigung unrichtiger Daten.'],
              [
                'Löschung',
                'Art. 17 DSGVO',
                'Löschung, soweit keine Aufbewahrungspflichten entgegenstehen.',
              ],
              ['Einschränkung', 'Art. 18 DSGVO', 'Einschränkung der Verarbeitung Ihrer Daten.'],
              [
                'Datenübertragbarkeit',
                'Art. 20 DSGVO',
                'Erhalt Ihrer Daten in strukturiertem, maschinenlesbarem Format.',
              ],
              ['Widerspruch', 'Art. 21 DSGVO', 'Widerspruch gegen Verarbeitung auf berechtigtem Interesse.'],
              ['Widerruf', 'Art. 7 Abs. 3 DSGVO', 'Widerruf einer erteilten Einwilligung.'],
              ['Beschwerde', 'Aufsichtsbehörde', 'Beschwerde bei einer Datenschutz-Aufsichtsbehörde.'],
            ].map(([title, ref, desc]) => (
              <div
                key={title}
                className="rounded-lg border border-border bg-white p-4 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <p className="text-ink font-semibold text-[0.92rem]">{title}</p>
                  <p className="font-serif text-gold text-[0.72rem] tabular-nums whitespace-nowrap">
                    {ref}
                  </p>
                </div>
                <p className="text-ink-light text-[0.85rem] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-cream/40 p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-2">
              Zuständige Aufsichtsbehörde
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
              Baden-Württemberg
              <br />
              <A href="https://www.baden-wuerttemberg.datenschutz.de">
                www.baden-wuerttemberg.datenschutz.de
              </A>
            </p>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeader number="06" title="Kontaktformular" id="kontakt" />
          <P>Wenn Sie unser Kontaktformular absenden, werden folgende Daten erhoben:</P>
          <ul className="list-disc pl-5 text-ink-light text-[0.95rem] leading-relaxed space-y-1.5 mb-5">
            <li>Name (Pflichtfeld)</li>
            <li>E-Mail-Adresse (Pflichtfeld)</li>
            <li>Arbeitgeber (optional)</li>
            <li>Telefonnummer (optional)</li>
            <li>Art der Angelegenheit (optional)</li>
            <li>Bruttomonatsgehalt (optional)</li>
            <li>Ihre Nachricht (Pflichtfeld)</li>
          </ul>
          <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 gap-x-5 text-[0.92rem] mb-5">
            <dt className="text-ink-muted font-medium">Zweck</dt>
            <dd className="text-ink-light">
              Bearbeitung Ihrer Anfrage, Einschätzung Ihres rechtlichen Anliegens und
              Kontaktaufnahme.
            </dd>
            <dt className="text-ink-muted font-medium">Speicherdauer</dt>
            <dd className="text-ink-light">
              Bis Erfüllung des Zwecks. Bei Mandatserteilung gelten gesetzliche
              Aufbewahrungsfristen von bis zu 10 Jahren (§50 BRAO, §257 HGB).
            </dd>
            <dt className="text-ink-muted font-medium">Empfänger</dt>
            <dd className="text-ink-light">
              Kontaktformulardaten werden an Brevo (Sendinblue) übermittelt und dort gespeichert,
              siehe Ziff. 9.
            </dd>
          </dl>
          <Legal>
            Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Beantwortung von Anfragen).
          </Legal>
        </section>

        <Divider />

        <section>
          <SectionHeader number="07" title="Google Analytics" id="analytics" />
          <P>
            Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google").
          </P>
          <P>
            Google Analytics verwendet Cookies und ähnliche Technologien, um die Nutzung unserer
            Website zu analysieren. Die erzeugten Informationen (einschließlich Ihrer gekürzten
            IP-Adresse) werden an Google-Server übermittelt und dort gespeichert. Wir verwenden
            Google Analytics mit aktivierter IP-Anonymisierung, sodass Ihre IP-Adresse innerhalb der
            EU/des EWR vor der Übermittlung gekürzt wird.
          </P>
          <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 gap-x-5 text-[0.92rem] mb-5">
            <dt className="text-ink-muted font-medium">Zweck</dt>
            <dd className="text-ink-light">
              Analyse der Websitenutzung zur Verbesserung unserer Inhalte.
            </dd>
            <dt className="text-ink-muted font-medium">USA-Transfer</dt>
            <dd className="text-ink-light">
              Google nimmt am EU-US Data Privacy Framework teil. Zusätzlich bestehen
              Standardvertragsklauseln.
            </dd>
            <dt className="text-ink-muted font-medium">Widerspruch</dt>
            <dd className="text-ink-light">
              Über den Cookie-Banner widerrufbar oder via{' '}
              <A href="https://tools.google.com/dlpage/gaoptout">Opt-out-Add-on</A>.
            </dd>
          </dl>
          <Legal>
            Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung über den Cookie-Banner).
          </Legal>
          <P>
            Weitere Informationen in der{' '}
            <A href="https://policies.google.com/privacy">Datenschutzerklärung von Google</A>.
          </P>
        </section>

        <Divider />

        <section>
          <SectionHeader number="08" title="Schriften (selbst gehostet)" id="fonts" />
          <P>
            Diese Website verwendet selbst gehostete Schriften, die auf unserem eigenen Server
            gespeichert sind. Es wird keine Verbindung zu externen Schriftdiensten (wie z.&nbsp;B.
            Google Fonts) hergestellt, wenn Sie unsere Seiten besuchen. Ihre IP-Adresse wird nicht
            an Drittanbieter von Schriften übermittelt.
          </P>
          <Legal>
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen und
            ansprechenden Darstellung). Da die Schriften lokal bereitgestellt werden, werden zu
            diesem Zweck keine personenbezogenen Daten an Dritte weitergegeben.
          </Legal>
        </section>

        <Divider />

        <section>
          <SectionHeader number="09" title="Brevo (Sendinblue)" id="brevo" />
          <P>
            Wir verwenden Brevo (ehemals Sendinblue), bereitgestellt von Brevo SAS, 106 boulevard
            Haussmann, 75008 Paris, Frankreich, für folgende Zwecke:
          </P>
          <ul className="list-disc pl-5 text-ink-light text-[0.95rem] leading-relaxed space-y-2 mb-5">
            <li>
              <strong>Kontaktformular-Verarbeitung:</strong> Ihre Anfragedaten werden als Kontakt
              in unserem Brevo-Konto gespeichert.
            </li>
            <li>
              <strong>E-Mail-Benachrichtigungen:</strong> Beim Absenden des Kontaktformulars wird
              eine Benachrichtigungs-E-Mail über den SMTP-Dienst von Brevo an uns versendet.
            </li>
            <li>
              <strong>Terminbuchung:</strong> Wir nutzen das Terminplanungstool von Brevo für
              Online-Terminbuchungen.
            </li>
            <li>
              <strong>Website-Tracking:</strong> Brevo kann Cookies verwenden, um Ihre
              Interaktionen mit unserer Website für Marketinganalysen zu verfolgen.
            </li>
          </ul>
          <Legal>
            Art. 6 Abs. 1 lit. b DSGVO (Kontaktformular: vorvertragliche Maßnahmen), Art. 6 Abs. 1
            lit. a DSGVO (Tracking: Ihre Einwilligung über den Cookie-Banner).
          </Legal>
          <P>
            Wir haben mit Brevo einen Auftragsverarbeitungsvertrag (AVV) geschlossen. Brevo
            speichert Daten innerhalb der EU. Weitere Informationen in der{' '}
            <A href="https://www.brevo.com/legal/privacypolicy/">Datenschutzerklärung von Brevo</A>.
          </P>
        </section>

        <Divider />

        <section>
          <SectionHeader number="10" title="Cookies" id="cookies" />
          <P>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Gerät
            gespeichert werden und die Analyse der Websitenutzung ermöglichen.
          </P>

          <SubHeader id="cookies-notwendig">10.1 Technisch notwendige Cookies</SubHeader>
          <P>
            Diese Cookies sind für die Funktion der Website unerlässlich und können nicht
            deaktiviert werden. Sie umfassen Cookies zur Speicherung Ihrer Cookie-Einstellungen.
          </P>
          <Legal>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</Legal>

          <SubHeader id="cookies-analyse">10.2 Analyse-Cookies (Google Analytics)</SubHeader>
          <P>
            Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren,
            indem sie Informationen anonymisiert sammeln.
          </P>
          <Legal>
            Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung). Diese Cookies werden erst nach Ihrer
            Zustimmung über unseren Cookie-Banner gesetzt.
          </Legal>

          <SubHeader id="cookies-marketing">10.3 Marketing-Cookies (Brevo)</SubHeader>
          <P>
            Diese Cookies werden verwendet, um Besucher zu verfolgen und die Wirksamkeit unserer
            Kommunikation zu messen.
          </P>
          <Legal>
            Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung). Diese Cookies werden erst nach Ihrer
            Zustimmung über unseren Cookie-Banner gesetzt.
          </Legal>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <table className="w-full border-collapse text-[0.88rem]">
              <thead>
                <tr className="bg-cream">
                  <th className="text-left p-3 font-semibold text-ink border-b border-border">Cookie</th>
                  <th className="text-left p-3 font-semibold text-ink border-b border-border">Anbieter</th>
                  <th className="text-left p-3 font-semibold text-ink border-b border-border">Zweck</th>
                  <th className="text-left p-3 font-semibold text-ink border-b border-border">Dauer</th>
                  <th className="text-left p-3 font-semibold text-ink border-b border-border">Typ</th>
                </tr>
              </thead>
              <tbody className="text-ink-light">
                {[
                  ['cookie_consent', 'Diese Website', 'Speichert Ihre Cookie-Einstellungen', '1 Jahr', 'Notwendig'],
                  ['_ga', 'Google', 'Unterscheidung von Nutzern', '2 Jahre', 'Analyse'],
                  ['_ga_*', 'Google', 'Sitzungsstatus aufrechterhalten', '2 Jahre', 'Analyse'],
                  ['_gid', 'Google', 'Unterscheidung von Nutzern', '24 Stunden', 'Analyse'],
                  ['sib_cuid', 'Brevo', 'Besucher-Tracking', '13 Monate', 'Marketing'],
                ].map((row, idx) => (
                  <tr
                    key={row[0]}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-cream/30'}
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className="p-3 border-b border-border last:border-b-0 align-top"
                      >
                        {i === 0 ? (
                          <code className="font-mono text-[0.82rem] text-ink">{cell}</code>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <P>
            Sie können Ihre Cookie-Einstellungen jederzeit über den Link „Cookie-Einstellungen" in
            der Fußzeile unserer Website verwalten.
          </P>
        </section>

        <Divider />

        <section>
          <SectionHeader number="11" title="SSL-/TLS-Verschlüsselung" id="ssl" />
          <P>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an
            dem Präfix „https://" in der Adresszeile Ihres Browsers.
          </P>
        </section>

        <Divider />

        <section>
          <SectionHeader number="12" title="Änderungen dieser Datenschutzerklärung" id="aenderungen" />
          <P>
            Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um Änderungen
            unserer Datenverarbeitungspraktiken oder rechtlicher Anforderungen widerzuspiegeln. Die
            aktuelle Fassung ist stets auf dieser Seite verfügbar.
          </P>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-8 text-[0.85rem] text-ink-muted">
          <span>Stand: Februar 2026</span>
          <a href="#" className="text-gold no-underline hover:underline">
            Zur Übersicht ↑
          </a>
        </div>
      </div>
    </main>
  );
}
