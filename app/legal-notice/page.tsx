import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice (Impressum)',
  robots: 'noindex, nofollow',
};

export default function LegalNoticePage() {
  return (
    <main>
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-[720px] mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="font-serif text-[2rem] font-bold mt-4">Legal Notice (Impressum)</h1>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto pt-12 pb-20 px-8 [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-ink [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-ink [&_p]:text-[0.92rem] [&_p]:text-ink-light [&_p]:mb-3 [&_a]:text-gold [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:text-[0.92rem] [&_ul]:text-ink-light [&_li]:mb-1.5">
        
        <h2>RESPONSIBLE WITHIN THE MEANING OF SECTION 5 DDG:</h2>
        <p>
          <strong>Apos Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG</strong>
          <br />
          Local Court (Amtsgericht) Mannheim, HRA 712218
        </p>
        <p>
          Represented by APOS Legal Management- und Rechtsanwaltsgesellschaft mbH
          <br />
          Local Court (Amtsgericht) Mannheim, HRB 752469
        </p>
        <p>
          Represented by the Managing Directors Fatih Bektas, Willem Büchler, Dr. Martin Duncker, Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
        </p>
        <p>
          Am Paradeplatz 20, 69126 Heidelberg, Germany
          <br />
          Phone: <a href="tel:+4962213214470">+49 6221 321 44 70</a>
          <br />
          E-Mail: <a href="mailto:info@apos.legal">info@apos.legal</a>
        </p>
        <p>
          EU platform for online dispute resolution (ODR):{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
        </p>

        <h2>INFORMATION PURSUANT TO SECTION 2 DL-INFOV:</h2>
        <p>
          The statutory professional titles &ldquo;Rechtsanwalt&rdquo; (Attorney at Law) and &ldquo;Rechtsanwältin&rdquo; (Attorney at Law), as well as specialist lawyer designations, were awarded in the Federal Republic of Germany.
        </p>
        <p>
          <strong>Bar Association and competent supervisory authority:</strong>
          <br />
          Karlsruhe Bar Association (Rechtsanwaltskammer Karlsruhe)
          <br />
          Reinhold-Frank-Straße 72
          <br />
          76133 Karlsruhe
          <br />
          Tel. <a href="tel:+49721253400">+49 721 253 40</a>
          <br />
          E-Mail: <a href="mailto:info@rak-karlsruhe.de">info@rak-karlsruhe.de</a>
        </p>

        <h2>PROFESSIONAL LIABILITY INSURANCE:</h2>
        <p>
          Allianz Deutschland AG
          <br />
          Königinstraße 28
          <br />
          80802 Munich
          <br />
          Germany
        </p>
        <p>
          The territorial scope of insurance coverage includes activities within the member states of the European Union.
        </p>

        <h2>PROFESSIONAL REGULATIONS:</h2>
        <p>
          Professional Code of Conduct for Lawyers (BORA), Federal Lawyers’ Act (BRAO), German Lawyers’ Remuneration Act (RVG), Rules of Professional Conduct for Lawyers in the European Union (CCBE), Specialist Lawyers’ Regulations (FAO)
        </p>
        <p>
          These laws and regulations are published in the Federal Law Gazette. They are also available via the German Federal Bar at{' '}
          <a href="https://www.brak.de" target="_blank" rel="noopener noreferrer">
            www.brak.de
          </a>
          .
        </p>

        <h2>ANALYTICS TOOLS AND ADVERTISING:</h2>
        <p>
          The privacy policy can be found{' '}
          <Link href="/privacy-policy">
            here
          </Link>
          .
        </p>

        <h2>RESPONSIBLE PURSUANT TO SECTION 18 PARA. 2 MStV (V.I.S.D.P.):</h2>
        <p>
          <strong>Apos Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG</strong>
          <br />
          Local Court (Amtsgericht) Mannheim, HRA 712218
        </p>
        <p>
          Represented by the Managing Directors Fatih Bektas, Willem Büchler, Dr. Martin Duncker, Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
        </p>
        <p>
          Am Paradeplatz 20, 69126 Heidelberg, Germany
          <br />
          Phone: <a href="tel:+4962213214470">+49 6221 321 44 70</a>
          <br />
          E-Mail: <a href="mailto:info@apos.legal">info@apos.legal</a>
        </p>
      </div>
    </main>
  );
}