import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-[720px] mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Zurück zur Startseite
          </Link>
          <h1 className="font-serif text-[2rem] font-bold mt-4">Datenschutzerklärung</h1>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto pt-12 pb-20 px-8 [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-ink [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-ink [&_p]:text-[0.92rem] [&_p]:text-ink-light [&_p]:mb-3 [&_a]:text-gold [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:text-[0.92rem] [&_ul]:text-ink-light [&_li]:mb-1.5 [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:text-[0.88rem] [&_th]:text-left [&_th]:p-2.5 [&_th]:px-3.5 [&_th]:border [&_th]:border-border [&_th]:bg-cream [&_th]:font-semibold [&_th]:text-ink [&_td]:text-left [&_td]:p-2.5 [&_td]:px-3.5 [&_td]:border [&_td]:border-border [&_td]:text-ink-light">
        <p>
          <strong>Stand:</strong> Februar 2026
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
        <p>
          APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG
          <br />
          Fatih Bektas
          <br />
          Am Paradeplatz 20
          <br />
          69126 Heidelberg
          <br />
          E-Mail: <a href="mailto:info@apos.legal">info@apos.legal</a>
          <br />
          Telefon: <a href="tel:+49622295992400">+49 6222 9599 2400</a>
        </p>

        <h2>2. Übersicht der Datenverarbeitung</h2>
        <p>
          Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Wir behandeln Ihre Daten
          vertraulich und in Übereinstimmung mit den gesetzlichen Datenschutzvorschriften,
          insbesondere der EU-Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz
          (BDSG).
        </p>

        <h2>3. Hosting</h2>
        <p>
          Diese Website wird über die Infrastruktur von Vercel Inc., 440 N Barranca Ave #4133,
          Covina, CA 91723, USA gehostet. Vercel verarbeitet beim Aufruf der Website technisch
          notwendige Daten (u.&nbsp;a. IP-Adressen) als Auftragsverarbeiter. Grundlage der
          Datenübermittlung in die USA sind die Standardvertragsklauseln der EU-Kommission.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          einem sicheren und effizienten Betrieb der Website).
        </p>
        <p>
          Weitere Informationen finden Sie in der{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>

        <h2>4. Ihre Rechte</h2>
        <p>Nach der DSGVO stehen Ihnen folgende Rechte bezüglich Ihrer personenbezogenen Daten zu:</p>
        <ul>
          <li>
            <strong>Auskunftsrecht</strong> (Art. 15 DSGVO) &mdash; Sie können Auskunft darüber
            verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten.
          </li>
          <li>
            <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO) &mdash; Sie können die
            Berichtigung unrichtiger Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Löschung</strong> (Art. 17 DSGVO) &mdash; Sie können die Löschung
            Ihrer Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </li>
          <li>
            <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) &mdash; Sie
            können verlangen, dass wir die Verarbeitung Ihrer Daten einschränken.
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) &mdash; Sie können Ihre
            Daten in einem strukturierten, maschinenlesbaren Format anfordern.
          </li>
          <li>
            <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO) &mdash; Sie können der
            Datenverarbeitung auf Grundlage berechtigter Interessen jederzeit widersprechen.
          </li>
          <li>
            <strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) &mdash; Sie
            können eine erteilte Einwilligung jederzeit widerrufen.
          </li>
          <li>
            <strong>Beschwerderecht</strong> &mdash; Sie haben das Recht, sich bei einer
            Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen
            Aufenthaltsorts.
          </li>
        </ul>
        <p>
          Die zuständige Aufsichtsbehörde ist:
          <br />
          Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
          <br />
          <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">
            www.baden-wuerttemberg.datenschutz.de
          </a>
        </p>

        <h2>5. Kontaktformular</h2>
        <p>Wenn Sie unser Kontaktformular absenden, werden folgende Daten erhoben:</p>
        <ul>
          <li>Name (Pflichtfeld)</li>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Arbeitgeber (optional)</li>
          <li>Telefonnummer (optional)</li>
          <li>Art der Angelegenheit (optional)</li>
          <li>Bruttomonatsgehalt (optional)</li>
          <li>Ihre Nachricht (Pflichtfeld)</li>
        </ul>
        <p>
          <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage, Einschätzung Ihres rechtlichen Anliegens
          und Kontaktaufnahme.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen
          auf Ihre Anfrage hin) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Beantwortung von Anfragen).
        </p>
        <p>
          <strong>Speicherdauer:</strong> Ihre Daten werden gespeichert, bis der Zweck der Anfrage
          erfüllt ist. Bei Mandatserteilung gelten gesetzliche Aufbewahrungsfristen von bis zu
          10 Jahren (&sect;50 BRAO, &sect;257 HGB).
        </p>
        <p>
          <strong>Empfänger:</strong> Ihre Kontaktformulardaten werden an Brevo (Sendinblue)
          übermittelt und dort gespeichert, siehe Abschnitt 8.
        </p>

        <h2>6. Google Analytics</h2>
        <p>
          Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland
          Limited, Gordon House, Barrow Street, Dublin 4, Irland (&bdquo;Google&ldquo;).
        </p>
        <p>
          Google Analytics verwendet Cookies und ähnliche Technologien, um die Nutzung unserer
          Website zu analysieren. Die erzeugten Informationen (einschließlich Ihrer gekürzten
          IP-Adresse) werden an Google-Server übermittelt und dort gespeichert. Wir verwenden
          Google Analytics mit aktivierter IP-Anonymisierung, sodass Ihre IP-Adresse innerhalb der
          EU/des EWR vor der Übermittlung gekürzt wird.
        </p>
        <p>
          <strong>Zweck:</strong> Analyse der Websitenutzung zur Verbesserung unserer Inhalte und
          Dienstleistungen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung über den
          Cookie-Banner).
        </p>
        <p>
          <strong>Datenübermittlung in die USA:</strong> Google nimmt am EU-US Data Privacy Framework
          teil. Zusätzlich haben wir mit Google Standardvertragsklauseln (SCCs) abgeschlossen.
        </p>
        <p>
          <strong>Widerspruch:</strong> Sie können die Datenerfassung durch Google Analytics
          verhindern, indem Sie Ihre Einwilligung über die Cookie-Einstellungen auf unserer Website
          widerrufen oder das{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>
          {' '}installieren.
        </p>
        <p>
          Weitere Informationen finden Sie in der{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Google
          </a>
          .
        </p>

        <h2>7. Schriften (selbst gehostet)</h2>
        <p>
          Diese Website verwendet selbst gehostete Schriften, die auf unserem eigenen Server
          gespeichert sind. Es wird keine Verbindung zu externen Schriftdiensten (wie z.&nbsp;B. Google
          Fonts) hergestellt, wenn Sie unsere Seiten besuchen. Ihre IP-Adresse wird nicht an
          Drittanbieter von Schriften übermittelt.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          einer einheitlichen und ansprechenden Darstellung). Da die Schriften lokal bereitgestellt
          werden, werden zu diesem Zweck keine personenbezogenen Daten an Dritte weitergegeben.
        </p>

        <h2>8. Brevo (Sendinblue)</h2>
        <p>
          Wir verwenden Brevo (ehemals Sendinblue), bereitgestellt von Brevo SAS, 106 boulevard
          Haussmann, 75008 Paris, Frankreich, für folgende Zwecke:
        </p>
        <ul>
          <li>
            <strong>Kontaktformular-Verarbeitung:</strong> Ihre Anfragedaten werden als Kontakt in
            unserem Brevo-Konto gespeichert.
          </li>
          <li>
            <strong>E-Mail-Benachrichtigungen:</strong> Bei Absenden des Kontaktformulars wird eine
            Benachrichtigungs-E-Mail über den SMTP-Dienst von Brevo an uns versendet.
          </li>
          <li>
            <strong>Terminbuchung:</strong> Wir nutzen das Terminplanungstool von Brevo für
            Online-Terminbuchungen.
          </li>
          <li>
            <strong>Website-Tracking:</strong> Brevo kann Cookies verwenden, um Ihre Interaktionen
            mit unserer Website für Marketinganalysen zu verfolgen.
          </li>
        </ul>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Kontaktformular:
          vorvertragliche Maßnahmen), Art. 6 Abs. 1 lit. a DSGVO (Tracking: Ihre Einwilligung über
          den Cookie-Banner).
        </p>
        <p>
          Wir haben mit Brevo einen Auftragsverarbeitungsvertrag (AVV) geschlossen. Brevo speichert
          Daten innerhalb der EU.
        </p>
        <p>
          Weitere Informationen finden Sie in der{' '}
          <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Brevo
          </a>
          .
        </p>

        <h2>9. Cookies</h2>
        <p>
          Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Gerät
          gespeichert werden und die Analyse der Websitenutzung ermöglichen.
        </p>

        <h3>9.1 Technisch notwendige Cookies</h3>
        <p>
          Diese Cookies sind für die Funktion der Website unerlässlich und können nicht deaktiviert
          werden. Sie umfassen Cookies zur Speicherung Ihrer Cookie-Einstellungen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
        </p>

        <h3>9.2 Analyse-Cookies (Google Analytics)</h3>
        <p>
          Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren,
          indem sie Informationen anonymisiert sammeln.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung). Diese
          Cookies werden erst nach Ihrer Zustimmung über unseren Cookie-Banner gesetzt.
        </p>

        <h3>9.3 Marketing-Cookies (Brevo)</h3>
        <p>
          Diese Cookies werden verwendet, um Besucher zu verfolgen und die Wirksamkeit unserer
          Kommunikation zu messen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung). Diese
          Cookies werden erst nach Ihrer Zustimmung über unseren Cookie-Banner gesetzt.
        </p>

        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Anbieter</th>
              <th>Zweck</th>
              <th>Dauer</th>
              <th>Typ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cookie_consent</td>
              <td>Diese Website</td>
              <td>Speichert Ihre Cookie-Einstellungen</td>
              <td>1 Jahr</td>
              <td>Notwendig</td>
            </tr>
            <tr>
              <td>_ga</td>
              <td>Google</td>
              <td>Unterscheidung von Nutzern</td>
              <td>2 Jahre</td>
              <td>Analyse</td>
            </tr>
            <tr>
              <td>_ga_*</td>
              <td>Google</td>
              <td>Sitzungsstatus aufrechterhalten</td>
              <td>2 Jahre</td>
              <td>Analyse</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google</td>
              <td>Unterscheidung von Nutzern</td>
              <td>24 Stunden</td>
              <td>Analyse</td>
            </tr>
            <tr>
              <td>sib_cuid</td>
              <td>Brevo</td>
              <td>Besucher-Tracking</td>
              <td>13 Monate</td>
              <td>Marketing</td>
            </tr>
          </tbody>
        </table>

        <p>
          Sie können Ihre Cookie-Einstellungen jederzeit über den Link
          &bdquo;Cookie-Einstellungen&ldquo; in der Fußzeile unserer Website verwalten.
        </p>

        <h2>10. SSL-/TLS-Verschlüsselung</h2>
        <p>
          Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
          Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an dem
          Präfix &bdquo;https://&ldquo; in der Adresszeile Ihres Browsers.
        </p>

        <h2>11. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um Änderungen unserer
          Datenverarbeitungspraktiken oder rechtlicher Anforderungen widerzuspiegeln. Die aktuelle
          Fassung ist stets auf dieser Seite verfügbar.
        </p>
      </div>
    </main>
  );
}
