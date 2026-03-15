import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-[720px] mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="font-serif text-[2rem] font-bold mt-4">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto pt-12 pb-20 px-8 [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-ink [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-ink [&_p]:text-[0.92rem] [&_p]:text-ink-light [&_p]:mb-3 [&_a]:text-gold [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:text-[0.92rem] [&_ul]:text-ink-light [&_li]:mb-1.5 [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:text-[0.88rem] [&_th]:text-left [&_th]:p-2.5 [&_th]:px-3.5 [&_th]:border [&_th]:border-border [&_th]:bg-cream [&_th]:font-semibold [&_th]:text-ink [&_td]:text-left [&_td]:p-2.5 [&_td]:px-3.5 [&_td]:border [&_td]:border-border [&_td]:text-ink-light">
        <p>
          <strong>Last updated:</strong> February 2026
        </p>

        <h2>1. Controller</h2>
        <p>The controller responsible for data processing on this website is:</p>
        <p>
          APOS Legal Rechtsanw&auml;lte
          <br />
          Fatih Bektas
          <br />
          Am Paradeplatz 20
          <br />
          69126 Heidelberg, Germany
          <br />
          Email: <a href="mailto:info@apos.legal">info@apos.legal</a>
          <br />
          Phone: <a href="tel:+4962213214470">+49 6221 32144-70</a>
        </p>

        <h2>2. Overview of Data Processing</h2>
        <p>
          We take the protection of your personal data seriously. We treat your personal data confidentially
          and in accordance with the statutory data protection regulations, in particular the EU General Data
          Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG).
        </p>

        <h2>3. Hosting</h2>
        <p>
          This website is hosted by Vercel Inc., 440 N Baxter St, Suite 4060, Coppell, TX 75019, USA. When
          you visit our website, Vercel automatically collects and stores information in server log files that
          your browser transmits, including your IP address, date and time of the request, and the page
          visited.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest in secure and efficient
          website operation).
        </p>
        <p>
          We have concluded a Data Processing Agreement (DPA) with Vercel. Vercel participates in the EU-US
          Data Privacy Framework.
        </p>

        <h2>4. Your Rights</h2>
        <p>Under the GDPR, you have the following rights regarding your personal data:</p>
        <ul>
          <li>
            <strong>Right of access</strong> (Art. 15 GDPR) — You may request information about whether and
            which personal data we process about you.
          </li>
          <li>
            <strong>Right to rectification</strong> (Art. 16 GDPR) — You may request correction of
            inaccurate data.
          </li>
          <li>
            <strong>Right to erasure</strong> (Art. 17 GDPR) — You may request deletion of your data,
            subject to legal retention obligations.
          </li>
          <li>
            <strong>Right to restriction of processing</strong> (Art. 18 GDPR) — You may request that we
            restrict the processing of your data.
          </li>
          <li>
            <strong>Right to data portability</strong> (Art. 20 GDPR) — You may request your data in a
            structured, machine-readable format.
          </li>
          <li>
            <strong>Right to object</strong> (Art. 21 GDPR) — You may object to data processing based on
            legitimate interests at any time.
          </li>
          <li>
            <strong>Right to withdraw consent</strong> (Art. 7(3) GDPR) — You may withdraw any consent you
            have given at any time.
          </li>
          <li>
            <strong>Right to lodge a complaint</strong> — You have the right to lodge a complaint with a
            supervisory authority, in particular in the Member State of your habitual residence.
          </li>
        </ul>
        <p>
          The competent supervisory authority is:
          <br />
          Der Landesbeauftragte f&uuml;r den Datenschutz und die Informationsfreiheit
          Baden-W&uuml;rttemberg
          <br />
          <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">
            www.baden-wuerttemberg.datenschutz.de
          </a>
        </p>

        <h2>5. Contact Form</h2>
        <p>When you submit our contact form, the following data is collected:</p>
        <ul>
          <li>Name (required)</li>
          <li>Email address (required)</li>
          <li>Company name (optional)</li>
          <li>Phone number (optional)</li>
          <li>Type of dispute (optional)</li>
          <li>Estimated dispute value (optional)</li>
          <li>Your message (required)</li>
        </ul>
        <p>
          <strong>Purpose:</strong> Processing your inquiry, assessing your legal matter, and contacting you.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(b) GDPR (pre-contractual measures at your request) and
          Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries).
        </p>
        <p>
          <strong>Storage duration:</strong> Your data will be stored until the purpose of the inquiry has
          been fulfilled. If a mandate arises, statutory retention periods of up to 10 years apply (&sect; 50
          BRAO, &sect; 257 HGB).
        </p>
        <p>
          <strong>Recipient:</strong> Your contact form data is transmitted to and stored by Brevo
          (Sendinblue), see Section 8.
        </p>

        <h2>6. Google Analytics</h2>
        <p>
          This website uses Google Analytics 4, a web analytics service provided by Google Ireland Limited,
          Gordon House, Barrow Street, Dublin 4, Ireland (&ldquo;Google&rdquo;).
        </p>
        <p>
          Google Analytics uses cookies and similar technologies to analyze how you use our website. The
          information generated (including your truncated IP address) is transmitted to and stored on Google
          servers. We use Google Analytics with IP anonymization enabled, meaning your IP address is shortened
          within the EU/EEA before transmission.
        </p>
        <p>
          <strong>Purpose:</strong> Analyzing website usage to improve our content and services.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (your consent via the cookie banner).
        </p>
        <p>
          <strong>Data transfer to the US:</strong> Google participates in the EU-US Data Privacy Framework.
          We have also concluded Standard Contractual Clauses (SCCs) with Google.
        </p>
        <p>
          <strong>Opt-out:</strong> You can prevent data collection by Google Analytics by withdrawing your
          consent via the cookie settings on our website or by installing the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>
        <p>
          For more information, see{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&rsquo;s Privacy Policy
          </a>
          .
        </p>

        <h2>7. Fonts (Self-Hosted)</h2>
        <p>
          This website uses self-hosted fonts stored on our own server. No connection to external font
          services (such as Google Fonts) is established when you visit our pages. Your IP address is not
          transmitted to third-party font providers.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest in uniform and appealing
          presentation). Since the fonts are served locally, no personal data is shared with third parties
          for this purpose.
        </p>

        <h2>8. Brevo (Sendinblue)</h2>
        <p>
          We use Brevo (formerly Sendinblue), provided by Brevo SAS, 106 boulevard Haussmann, 75008 Paris,
          France, for the following purposes:
        </p>
        <ul>
          <li>
            <strong>Contact form processing:</strong> Your inquiry data is stored as a contact in our Brevo
            account.
          </li>
          <li>
            <strong>Email notifications:</strong> When you submit the contact form, a notification email is
            sent to us via Brevo&rsquo;s SMTP service.
          </li>
          <li>
            <strong>Appointment scheduling:</strong> We use Brevo&rsquo;s scheduling tool for online
            appointment booking.
          </li>
          <li>
            <strong>Website tracking:</strong> Brevo may use cookies to track your interactions with our
            website for marketing analytics purposes.
          </li>
        </ul>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(b) GDPR (contact form: pre-contractual measures), Art.
          6(1)(a) GDPR (tracking: your consent via cookie banner).
        </p>
        <p>
          We have concluded a Data Processing Agreement (DPA) with Brevo. Brevo stores data within the EU.
        </p>
        <p>
          For more information, see{' '}
          <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Brevo&rsquo;s Privacy Policy
          </a>
          .
        </p>

        <h2>9. Cookies</h2>
        <p>
          Our website uses cookies. Cookies are small text files stored on your device that enable analysis of
          your use of the website.
        </p>

        <h3>9.1 Strictly Necessary Cookies</h3>
        <p>
          These cookies are essential for the website to function and cannot be disabled. They include cookies
          for storing your cookie consent preferences.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest).
        </p>

        <h3>9.2 Analytics Cookies (Google Analytics)</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting information
          anonymously.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (your consent). These cookies are only set after
          you give consent via our cookie banner.
        </p>

        <h3>9.3 Marketing Cookies (Brevo)</h3>
        <p>
          These cookies are used to track visitors and measure the effectiveness of our communications.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (your consent). These cookies are only set after
          you give consent via our cookie banner.
        </p>

        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Duration</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cookie_consent</td>
              <td>This website</td>
              <td>Stores your cookie preferences</td>
              <td>1 year</td>
              <td>Necessary</td>
            </tr>
            <tr>
              <td>_ga</td>
              <td>Google</td>
              <td>Distinguishes users</td>
              <td>2 years</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_ga_*</td>
              <td>Google</td>
              <td>Maintains session state</td>
              <td>2 years</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google</td>
              <td>Distinguishes users</td>
              <td>24 hours</td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>sib_cuid</td>
              <td>Brevo</td>
              <td>Visitor tracking</td>
              <td>13 months</td>
              <td>Marketing</td>
            </tr>
          </tbody>
        </table>

        <p>
          You can manage your cookie preferences at any time by clicking the &ldquo;Cookie Settings&rdquo;
          link in our website footer.
        </p>

        <h2>10. SSL/TLS Encryption</h2>
        <p>
          This website uses SSL/TLS encryption for security reasons and to protect the transmission of
          confidential content. You can recognize an encrypted connection by the &ldquo;https://&rdquo;
          prefix in the address bar of your browser.
        </p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update this privacy policy to reflect changes in our data processing
          practices or legal requirements. The current version is always available on this page.
        </p>
      </div>
    </main>
  );
}
