import type { Metadata } from 'next';
import Link from 'next/link';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/privacy-policy/`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for gekuendigt-abfindung.de — what data we collect, how we use it and your rights under the GDPR.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/privacy-policy/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/privacy-policy/`,
    },
  },
  robots: 'noindex, follow',
};

export default function PrivacyPolicyEn() {
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
            Data protection
          </p>
          <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-bold text-ink mt-2 leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="text-[0.95rem] text-ink-muted mt-4 max-w-[640px]">
            This is a courtesy English summary. The legally binding version is the German{' '}
            <Link href="/privacy-policy/" className="text-gold-dark underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-8 pt-12 pb-24">
        <section className="mb-10">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">
            Controller (Art. 4 (7) GDPR)
          </h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG<br />
            Am Paradeplatz 20, 69126 Heidelberg, Germany<br />
            Email:{' '}
            <a href="mailto:info@apos.legal" className="text-gold-dark underline">
              info@apos.legal
            </a>
            <br />
            Phone:{' '}
            <a href="tel:+49622295992400" className="text-gold-dark underline">
              +49 6222 9599 2400
            </a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">What data we collect</h2>
          <ul className="list-disc pl-5 space-y-2 text-[0.98rem] text-ink-light leading-relaxed">
            <li>
              <strong>Server log files</strong> (IP address, browser, referrer, time) on every
              request — legal basis Art. 6 (1) (f) GDPR (security &amp; operation), kept for up
              to 7 days.
            </li>
            <li>
              <strong>Contact form / case enquiry</strong> — name, email, employer, phone,
              matter type, salary range, message. Legal basis Art. 6 (1) (b) GDPR (pre-mandate
              steps).
            </li>
            <li>
              <strong>Cookies</strong> for site operation (technically necessary, always set)
              and — only with your consent — Google Analytics (anonymised IP) and Brevo
              tracking. You can change consent at any time via the “Cookie settings” link in
              the footer.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">Recipients</h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Our hosting provider Vercel Inc. (USA) processes site traffic under standard
            contractual clauses. Email sending is handled by Brevo (sendinblue.com,
            France/EU). Google Analytics is operated by Google Ireland Ltd. (Ireland) on the
            basis of your explicit consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">Your rights</h2>
          <ul className="list-disc pl-5 space-y-2 text-[0.98rem] text-ink-light leading-relaxed">
            <li>Right of access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction (Art. 18 GDPR)</li>
            <li>Right to data portability (Art. 20 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
            <li>
              Right to lodge a complaint with a supervisory authority — competent for us:
              Der Landesbeauftragte für den Datenschutz Baden-Württemberg.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-[1.4rem] font-bold mb-3">Retention</h2>
          <p className="text-[0.98rem] text-ink-light leading-relaxed">
            Contact-form data is retained as long as required to handle your enquiry and, if
            a mandate follows, within the statutory retention periods applicable to legal
            files. Otherwise data is deleted within 6 months unless a different period
            results from law.
          </p>
        </section>

        <p className="text-[0.85rem] text-ink-muted leading-relaxed border-t border-border pt-6">
          For the legally binding German privacy policy (Datenschutzerklärung), please see{' '}
          <Link href="/privacy-policy/" className="text-gold-dark underline">
            gekuendigt-abfindung.de/privacy-policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
