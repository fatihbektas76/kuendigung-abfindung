import type { Metadata } from 'next';
import Link from 'next/link';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/legal-notice/`;

export const metadata: Metadata = {
  title: 'Legal Notice (Impressum)',
  description:
    'Legal notice and provider information for gekuendigt-abfindung.de — APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG, Heidelberg, Germany.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/legal-notice/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/legal-notice/`,
    },
  },
  robots: 'noindex, follow',
};

export default function LegalNoticeEn() {
  return (
    <main className="bg-white">
      <header className="bg-cream pt-[120px] pb-12 px-8 border-b border-border">
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/en/"
            className="inline-flex items-center gap-2 text-ink-light text-[0.85rem] font-medium hover:text-gold transition-colors no-underline"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
          <p className="font-sans text-[0.7rem] tracking-[0.22em] uppercase text-gold font-semibold mt-6">
            Legal information
          </p>
          <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-bold text-ink mt-2 leading-[1.05]">
            Legal Notice
          </h1>
          <p className="text-[0.95rem] text-ink-muted mt-4 max-w-[640px]">
            This is a courtesy English translation. The legally binding version is the
            German{' '}
            <Link href="/legal-notice/" className="text-gold-dark underline">
              Impressum
            </Link>
            , which conforms to § 5 DDG, § 2 DL-InfoV and the rules of the German
            Bundesrechtsanwaltsordnung.
          </p>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-8 pt-12 pb-24">
        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Provider (§ 5 DDG)
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG<br />
            Am Paradeplatz 20<br />
            69126 Heidelberg<br />
            Germany
          </p>
          <p className="text-[0.98rem] text-ink-light leading-relaxed mt-4">
            Phone:{' '}
            <a href="tel:+49622295992400" className="text-gold-dark underline">
              +49 6222 9599 2400
            </a>
            <br />
            Email:{' '}
            <a href="mailto:info@apos.legal" className="text-gold-dark underline">
              info@apos.legal
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Responsible attorney
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Fatih Bektas, German employment-law specialist (Fachanwalt für Arbeitsrecht).
            Admitted to the German Bar (Rechtsanwaltskammer Karlsruhe).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Professional regulations
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            The professional title <em>Rechtsanwalt</em> was conferred in the Federal
            Republic of Germany. Applicable professional regulations include the
            Bundesrechtsanwaltsordnung (BRAO), the Berufsordnung für Rechtsanwälte (BORA),
            the Fachanwaltsordnung (FAO), the Rechtsanwaltsvergütungsgesetz (RVG), the
            Geldwäschegesetz (GwG) and the CCBE Code of Conduct. The current texts are
            available at{' '}
            <a
              href="https://www.brak.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark underline"
            >
              brak.de
            </a>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Professional liability insurance
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Insurer: HDI Versicherung AG, HDI-Platz 1, 30659 Hannover, Germany. The
            policy covers professional activity worldwide subject to the policy terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Out-of-court dispute resolution
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            For disputes between attorneys and clients an out-of-court conciliation
            procedure exists at the Schlichtungsstelle der Rechtsanwaltschaft, Neue
            Grünstraße 17, 10179 Berlin (
            <a
              href="https://www.s-d-r.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark underline"
            >
              s-d-r.org
            </a>
            ). We are not willing or obliged to participate in consumer dispute
            resolution proceedings under § 36 VSBG.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">Conflicts of interest</h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Before retaining us, please contact us so we can verify the absence of any
            conflict of interest under § 43a BRAO.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-[1.4rem] font-bold mb-4">
            Editorial responsibility (§ 18 (2) MStV)
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Fatih Bektas, address as above.
          </p>
        </section>

        <p className="text-[0.85rem] text-ink-muted leading-relaxed border-t border-border pt-6">
          For the legally binding German version (Impressum) please see{' '}
          <Link href="/legal-notice/" className="text-gold-dark underline">
            gekuendigt-abfindung.de/legal-notice
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
