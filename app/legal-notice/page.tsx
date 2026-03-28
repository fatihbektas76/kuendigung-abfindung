import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: 'noindex, nofollow',
};

export default function LegalNoticePage() {
  return (
    <main>
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-[720px] mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Zurück zur Startseite
          </Link>
          <h1 className="font-serif text-[2rem] font-bold mt-4">Impressum</h1>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto pt-12 pb-20 px-8 [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-ink [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-ink [&_p]:text-[0.92rem] [&_p]:text-ink-light [&_p]:mb-3 [&_a]:text-gold [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:text-[0.92rem] [&_ul]:text-ink-light [&_li]:mb-1.5">

        <h2>Angaben gemäß &sect;5 DDG</h2>
        <p>
          <strong>APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG</strong>
          <br />
          Amtsgericht Mannheim, HRA 712218
        </p>
        <p>
          Vertreten durch die APOS Legal Management- und Rechtsanwaltsgesellschaft mbH
          <br />
          Amtsgericht Mannheim, HRB 752469
        </p>
        <p>
          Vertreten durch die Geschäftsführer Fatih Bektas, Willem Büchler, Dr. Martin Duncker, Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
        </p>
        <p>
          Am Paradeplatz 20, 69126 Heidelberg
          <br />
          Telefon: <a href="tel:+49622295992400">+49 6222 9599 2400</a>
          <br />
          E-Mail: <a href="mailto:info@apos.legal">info@apos.legal</a>
        </p>
        <h2>Angaben gemäß &sect;2 DL-InfoV</h2>
        <p>
          Die gesetzlichen Berufsbezeichnungen &bdquo;Rechtsanwalt&ldquo; und &bdquo;Rechtsanwältin&ldquo; sowie die Fachanwaltsbezeichnungen wurden in der Bundesrepublik Deutschland verliehen.
        </p>
        <p>
          <strong>Zuständige Kammer und Aufsichtsbehörde:</strong>
          <br />
          Rechtsanwaltskammer Karlsruhe
          <br />
          Reinhold-Frank-Straße 72
          <br />
          76133 Karlsruhe
          <br />
          Tel. <a href="tel:+49721253400">+49 721 253 40</a>
          <br />
          E-Mail: <a href="mailto:info@rak-karlsruhe.de">info@rak-karlsruhe.de</a>
        </p>

        <h2>Berufshaftpflichtversicherung</h2>
        <p>
          Allianz Deutschland AG
          <br />
          Königinstraße 28
          <br />
          80802 München
        </p>
        <p>
          Der räumliche Geltungsbereich des Versicherungsschutzes umfasst Tätigkeiten in den Mitgliedstaaten der Europäischen Union.
        </p>

        <h2>Berufsrechtliche Regelungen</h2>
        <p>
          Berufsordnung für Rechtsanwälte (BORA), Bundesrechtsanwaltsordnung (BRAO), Rechtsanwaltsvergütungsgesetz (RVG), Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE), Fachanwaltsordnung (FAO)
        </p>
        <p>
          Diese Regelungen sind im Bundesgesetzblatt veröffentlicht. Sie sind auch über die Bundesrechtsanwaltskammer unter{' '}
          <a href="https://www.brak.de" target="_blank" rel="noopener noreferrer">
            www.brak.de
          </a>
          {' '}abrufbar.
        </p>

        <h2>Datenschutz</h2>
        <p>
          Unsere Datenschutzerklärung finden Sie{' '}
          <Link href="/privacy-policy">
            hier
          </Link>
          .
        </p>

        <h2>Verantwortlich gemäß &sect;18 Abs. 2 MStV (V.i.S.d.P.)</h2>
        <p>
          <strong>APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG</strong>
          <br />
          Amtsgericht Mannheim, HRA 712218
        </p>
        <p>
          Vertreten durch die Geschäftsführer Fatih Bektas, Willem Büchler, Dr. Martin Duncker, Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
        </p>
        <p>
          Am Paradeplatz 20, 69126 Heidelberg
          <br />
          Telefon: <a href="tel:+49622295992400">+49 6222 9599 2400</a>
          <br />
          E-Mail: <a href="mailto:info@apos.legal">info@apos.legal</a>
        </p>
      </div>
    </main>
  );
}
