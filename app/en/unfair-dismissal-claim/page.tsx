import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/unfair-dismissal-claim/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Unfair-Dismissal Claim Germany (Kündigungsschutzklage) ${new Date().getFullYear()} — Process & Cost`,
  description:
    'Unfair-dismissal claim (Kündigungsschutzklage) under § 4 KSchG: 3-week deadline, procedure at the Arbeitsgericht, costs and settlement chances.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'de-DE': `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
      'en': PAGE_URL,
      'x-default': `${SEO_CONFIG.baseUrl}/kuendigungsschutzklage/`,
    },
  },
};

export default function UnfairDismissalClaimEn() {
  return (
    <main>
      <TopicHero
        eyebrow="Unfair-dismissal claim (Kündigungsschutzklage)"
        title="Kündigungsschutzklage — the formal claim against a dismissal."
        lede="Within 3 weeks of receiving the dismissal you file at the competent German labour court (Arbeitsgericht). The claim is the only formal way to challenge the dismissal — and the standard route to a negotiated severance."
        breadcrumbs={[
          { href: '/en/', label: 'Home' },
          { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
        ]}
        primaryCta={{ href: '#contact', label: 'File on my behalf' }}
        secondaryCta={{ href: '/en/check-dismissal', label: 'Check my dismissal' }}
      />

      <section className="py-12 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[1.05rem] text-ink-light leading-relaxed mb-4">
            The Kündigungsschutzklage under <strong>§&nbsp;4 KSchG</strong> is filed at the
            Arbeitsgericht of the employer’s seat or your place of work. Its formal aim is a
            declaratory ruling that the dismissal is invalid and the employment continues.
            In practice the case ends in a court-supervised settlement (Vergleich) in the
            <strong> first conciliation hearing (Güteverhandlung)</strong> in about 70–80% of all
            files — typically with a severance payment.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.5rem] font-bold mb-6">Process at the Arbeitsgericht</h2>
          <ol className="grid grid-cols-4 gap-6 mt-6 list-none p-0 max-md:grid-cols-1">
            {[
              {
                n: '01',
                t: 'File within 3 weeks',
                d: 'We file the Klageschrift at the competent Arbeitsgericht. The court immediately schedules a conciliation hearing.',
              },
              {
                n: '02',
                t: 'Conciliation hearing',
                d: 'Usually within 4–6 weeks of filing. The judge probes both sides — most cases settle here with severance.',
              },
              {
                n: '03',
                t: 'Chamber hearing',
                d: 'If no settlement, the case proceeds to a chamber hearing months later. Evidence is taken, ruling follows.',
              },
              {
                n: '04',
                t: 'Settlement or judgment',
                d: 'Either an enforceable settlement, or a judgment that may be appealed to the Landesarbeitsgericht.',
              },
            ].map((step) => (
              <li key={step.n} className="p-7 bg-white border border-border-light rounded">
                <div className="font-serif text-[1.1rem] font-bold text-gold-dark mb-2">
                  {step.n}
                </div>
                <h3 className="font-serif text-[1.1rem] font-bold mb-2">{step.t}</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif text-[1.5rem] font-bold mb-4">What does it cost?</h2>
          <p className="text-[1rem] text-ink-light leading-relaxed mb-4">
            At first instance no court fees arise as long as the case settles. Each side
            bears its own legal costs regardless of outcome under{' '}
            <strong>§&nbsp;12a ArbGG</strong>. Lawyers’ fees are governed by the RVG and
            calculated from the value in dispute (Streitwert), usually capped at three gross
            monthly salaries (§ 42 (3) GKG).
          </p>
          <p className="text-[1rem] text-ink-light leading-relaxed">
            Most employees in Germany hold a <em>Rechtsschutzversicherung</em> (legal-expenses
            insurance) covering employment matters after a 3-month waiting period — notify your
            insurer immediately. Without insurance, ask us for a fixed-fee quote.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/severance-pay', label: 'Severance pay' },
              { href: '/en/severance-calculator', label: 'Severance calculator' },
              { href: '/en/summary-dismissal', label: 'Summary dismissal' },
              { href: '/en/dismissal-protection-act', label: 'Dismissal Protection Act' },
              { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block p-5 border border-border-light rounded bg-white text-[0.95rem] font-semibold text-ink no-underline hover:border-gold hover:text-gold-dark transition-colors"
              >
                {l.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <CTA />
    </main>
  );
}
