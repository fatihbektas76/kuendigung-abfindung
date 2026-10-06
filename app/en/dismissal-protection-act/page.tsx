import type { Metadata } from 'next';
import Link from 'next/link';
import TopicHero from '@/components/en/TopicHero';
import ContactForm from '@/components/en/ContactForm';
import CTA from '@/components/en/CTA';
import NormLink, { NORM, bagDejureUrl } from '@/components/NormLink';
import BagQuote from '@/components/BagQuote';
import { SEO_CONFIG } from '@/lib/seo-config';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/en/dismissal-protection-act/`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Dismissal Protection Act (KSchG) — When It Applies to You`,
  description:
    'The German Dismissal Protection Act (Kündigungsschutzgesetz / KSchG) requires 6 months of tenure plus more than 10 employees in the business (§ 23 KSchG). Who counts, part-time weighting, joint operations, burden of proof.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Dismissal Protection Act (KSchG) — When It Applies to You`,
    description:
      'Prerequisites of the KSchG: qualification period, small-business threshold, part-time counting, temp workers, joint operations, burden of proof. German employment-law specialist.',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Dismissal Protection Act (KSchG) — When It Applies to You`,
    description:
      'Prerequisites of the KSchG: qualification period, small-business threshold, part-time counting, temp workers, joint operations, burden of proof.',
  },
};

interface Person {
  group: string;
  status: 'counts' | 'does not' | 'conditional';
  note: string;
}

const countingMatrix: Person[] = [
  { group: 'Managing director (GmbH) / corporate officers', status: 'does not', note: 'Exercise employer functions — § 14 (1) KSchG · BAG 2 AZR 540/20' },
  { group: 'Freelancers (genuine)', status: 'does not', note: 'No employment relationship — if actually self-employed' },
  { group: 'Sham self-employed', status: 'counts', note: 'Decisive is the factual integration into the business' },
  { group: 'Temporary agency workers (permanent need)', status: 'counts', note: 'BAG 24.01.2013 – 2 AZR 140/12' },
  { group: 'Temporary agency workers (peak demand only)', status: 'does not', note: 'Must cover an exceptional, non-regular workload' },
  { group: 'Part-time staff', status: 'counts', note: 'With factors 0.5 / 0.75 / 1.0 — see below' },
  { group: 'Sick leave / long-term illness', status: 'counts', note: 'Remain part of the workforce' },
  { group: 'Maternity protection', status: 'counts', note: 'Remain part of the workforce' },
  { group: 'Parental leave', status: 'counts', note: 'No double counting with substitute' },
  { group: 'Casual/auxiliary workers', status: 'conditional', note: 'Only if the position is regularly staffed' },
  { group: 'Apprentices / trainees', status: 'does not', note: '§ 23 (1) sentences 2 and 3 KSchG' },
  { group: 'The dismissed employee themselves', status: 'counts', note: 'Even if the position is not refilled' },
];

const faqs = [
  {
    q: 'When does the Dismissal Protection Act apply?',
    a: 'The KSchG applies when two cumulative conditions are met: (1) the employment relationship has lasted continuously for more than six months at the same employer (§ 1 (1) KSchG), and (2) the business regularly employs more than 10 employees (§ 23 (1) sentence 3 KSchG). For employment relationships that began before 1 January 2004, a lowered threshold of more than five employees applies.',
  },
  {
    q: 'What is the small-business threshold under the KSchG?',
    a: 'Since 1 January 2004 the threshold is more than 10 employees measured in full-time equivalents (§ 23 (1) sentence 3 KSchG). Apprentices are not counted. Part-time staff count proportionally: up to 20 hours/week with factor 0.5, up to 30 hours/week with factor 0.75, above that with factor 1.0. Decisive is the regularly employed headcount, not the figure on any given day.',
  },
  {
    q: 'Does the probation period count toward the 6-month qualification?',
    a: 'Yes. The 6-month qualification period under § 1 (1) KSchG runs from the beginning of the employment relationship — the agreed probation period is included. The KSchG becomes applicable at the beginning of the seventh month at the earliest. During probation, however, shorter notice periods apply (two weeks under § 622 (3) BGB).',
  },
  {
    q: 'Who is not counted toward the threshold?',
    a: 'Not counted: corporate officers (managing directors of a GmbH, management-board members), genuine freelancers and self-employed persons. Also excluded are apprentices (§ 23 (1) sentences 2 and 3 KSchG — "excluding those employed solely for vocational training") and temporary agency workers used only to cover an exceptional, non-regular workload. Sham self-employed persons are counted.',
  },
  {
    q: 'How are part-time employees counted?',
    a: 'Part-time staff are counted proportionally under § 23 (1) sentence 4 KSchG: 0.5 for up to 20 hours/week, 0.75 for up to 30 hours/week, 1.0 above 30 hours/week. Decisive is the contractually agreed working time, not the actually worked hours. Overtime is disregarded if only temporary.',
  },
  {
    q: 'What is a joint operation and how does it affect counting?',
    a: 'A joint operation (Gemeinschaftsbetrieb) exists when several legally independent companies run a shared business — typically with unified management, a shared HR department, and shared use of resources. In that case the employees of all participating companies are added together. The KSchG can therefore apply even when a single company on its own would not meet the threshold.',
  },
  {
    q: 'What protection do I have if the KSchG does not apply?',
    a: 'Even outside the KSchG, formal rules still apply: written form with an original signature (§ 623 BGB), the statutory notice periods (§ 622 BGB), and special dismissal protection (pregnancy, parental leave, severe disability, works-council membership). Dismissals that violate good faith (§ 242 BGB) or anti-discrimination rules (AGG) are also invalid. And the 3-week filing deadline under § 4 KSchG still applies — miss it and you lose the right to challenge.',
  },
];

export default function DismissalProtectionActPage() {
  const year = new Date().getFullYear();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Dismissal Protection Act (KSchG) — When It Applies to You',
    description: metadata.description,
    datePublished: '2026-05-12',
    dateModified: `${year}-10-06`,
    inLanguage: 'en',
    author: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
    publisher: { '@id': SEO_CONFIG.organization.id },
    mainEntityOfPage: PAGE_URL,
    articleSection: 'Dismissal',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TopicHero
        eyebrow="Dismissal Protection Act (KSchG)"
        title="When does the KSchG actually protect you?"
        lede="The German Dismissal Protection Act (Kündigungsschutzgesetz, KSchG) only applies when two conditions are met cumulatively: more than 6 months of continuous employment (§ 1 (1) KSchG) and more than 10 employees at the business (§ 23 (1) KSchG). Part-time staff count proportionally (0.5 / 0.75 / 1.0 weights)."
      />

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
            Prerequisites
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            The two thresholds of the KSchG
          </h2>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="p-7 bg-white border-l-4 border-gold rounded">
              <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                6-month qualification (<NormLink href={NORM.kschg1}>§&nbsp;1 (1) KSchG</NormLink>)
              </h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                You must have been continuously employed for more than six months with the same
                employer. The agreed probation period is included. If the dismissal lands before
                the end of month six, the substantive KSchG protection does not apply — only
                general rules (good faith, anti-discrimination, special protection) govern.
              </p>
            </div>
            <div className="p-7 bg-white border-l-4 border-gold rounded">
              <h3 className="font-serif text-[1.15rem] font-bold mb-3">
                Small-business threshold (<NormLink href={NORM.kschg23}>§&nbsp;23 (1) KSchG</NormLink>)
              </h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                The business must regularly employ <strong>more than 10 employees</strong>{' '}
                (counted with part-time weighting). Apprentices and the employer themselves do
                not count. Below the threshold the KSchG does not apply — regardless of tenure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Counting matrix
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Who counts toward the threshold?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Not every head counts the same. The following matrix summarises how different
              groups of staff enter the small-business calculation under § 23 (1) KSchG — based
              on the settled BAG case law.
            </p>
          </div>

          <div className="max-w-[900px] overflow-x-auto">
            <table className="w-full border-collapse text-[0.92rem]">
              <thead>
                <tr className="border-b-2 border-gold-dark">
                  <th className="text-left py-2 pr-4 font-semibold text-ink">Group</th>
                  <th className="text-left py-2 px-4 font-semibold text-ink">Status</th>
                  <th className="text-left py-2 pl-4 font-semibold text-ink">Note</th>
                </tr>
              </thead>
              <tbody>
                {countingMatrix.map((p, i) => (
                  <tr key={i} className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">{p.group}</td>
                    <td className="py-3 px-4">
                      <span className={
                        p.status === 'counts'
                          ? 'inline-block px-2 py-0.5 bg-success-bg text-success text-[0.78rem] font-semibold rounded'
                          : p.status === 'does not'
                          ? 'inline-block px-2 py-0.5 bg-danger-bg text-danger text-[0.78rem] font-semibold rounded'
                          : 'inline-block px-2 py-0.5 bg-gold-bg text-gold-dark text-[0.78rem] font-semibold rounded'
                      }>
                        {p.status === 'counts' ? 'counts' : p.status === 'does not' ? 'does not count' : 'depends'}
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-ink-light">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-[740px] mt-10">
            <h3 className="font-serif text-[1.15rem] font-bold mb-3">Managing directors and self-employed</h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
              A GmbH managing director performs employer functions and is not considered an
              employee within the meaning of <NormLink href={NORM.kschg23}>§&nbsp;23 KSchG</NormLink>
              {' '}— they are not counted (<NormLink href={NORM.kschg14}>§&nbsp;14 (1) KSchG</NormLink>;
              see also{' '}
              <a
                href={bagDejureUrl(null, '2 AZR 540/20')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >BAG – 2 AZR 540/20</a>). Genuine freelancers and self-employed persons also
              remain outside. Different for <strong>sham self-employed</strong>: anyone who is
              in fact bound by instructions, personally dependent and integrated into the
              business is counted — regardless of what the contract calls them.
            </p>

            <h3 className="font-serif text-[1.15rem] font-bold mb-3">
              Temporary agency workers — BAG case law
            </h3>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
              The Federal Labour Court has resolved a long-running question: temp workers count
              if they are deployed to cover a <em>regular</em> personnel need of the user
              business. Pure peak-demand coverage for an exceptional workload does not count.
            </p>

            <BagQuote az="2 AZR 140/12" datum="24.01.2013">
              &bdquo;Bei der Bestimmung der nach §&nbsp;23 Abs.&nbsp;1 Satz&nbsp;3 KSchG
              maßgeblichen Beschäftigtenzahl sind im Betrieb eingesetzte Leiharbeitnehmer
              mitzuzählen, wenn ihr Einsatz auf einem in der Regel vorhandenen Personalbedarf
              beruht.&ldquo;
              <br />
              <span className="text-[0.82rem] text-ink-muted italic">
                English translation: &bdquo;When determining the number of employees relevant
                under § 23 (1) sentence 3 KSchG, temporary agency workers deployed in the
                business are to be counted if their deployment is based on a personnel need
                that regularly exists.&ldquo; — BAG, judgment of 24 January 2013 – 2 AZR 140/12
              </span>
            </BagQuote>

            <p className="text-[0.85rem] text-ink-muted mt-2 mb-5">
              Source:{' '}
              <a
                href={bagDejureUrl('24.01.2013', '2 AZR 140/12')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 24.01.2013 – 2 AZR 140/12 on dejure.org &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Part-time weighting
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              How are part-time employees counted?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              <NormLink href={NORM.kschg23}>§&nbsp;23 (1) sentence 4 KSchG</NormLink> prescribes
              statutory weightings. Decisive is the contractually agreed working time, not the
              actually worked hours.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                  <tr className="border-b-2 border-gold-dark">
                    <th className="text-left py-2 pr-4 font-semibold text-ink">Contractual weekly hours</th>
                    <th className="text-left py-2 pl-4 font-semibold text-ink">Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">up to 20 hours</td>
                    <td className="py-3 pl-4 text-ink font-semibold">0.5</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 pr-4 text-ink">up to 30 hours</td>
                    <td className="py-3 pl-4 text-ink font-semibold">0.75</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-ink">more than 30 hours</td>
                    <td className="py-3 pl-4 text-ink font-semibold">1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold mt-6">
              <p className="text-[0.95rem] font-semibold text-ink mb-2">
                Calculation example — threshold reached?
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                A business employs: 8 full-time staff (factor 1.0 each = 8), 3 part-timers at 25
                hours/week (0.75 each = 2.25), 2 part-timers at 15 hours/week (0.5 each = 1.0),
                plus 2 apprentices (do not count). Total:{' '}
                <strong>8 + 2.25 + 1.0 = 11.25</strong>. The threshold &bdquo;more than
                10&ldquo; is met → the KSchG applies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Legacy workforce
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Pre-1 January 2004 contracts — lowered threshold
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              For employment relationships that began before 1 January 2004, a transitional rule
              applies: a lowered small-business threshold of <strong>more than 5 employees</strong>{' '}
              is sufficient — provided that this number of &bdquo;legacy employees&ldquo; (also
              from before 1 January 2004) is still regularly employed. The idea: pre-2004
              workforce should keep the stronger protection they were originally hired under.
            </p>

            <p className="text-[0.85rem] text-ink-muted mt-2 mb-5">
              Reference:{' '}
              <a
                href={bagDejureUrl('21.09.2006', '2 AZR 840/05')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 21.09.2006 – 2 AZR 840/05 on dejure.org &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Special case
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Joint operation of several companies
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              A <strong>joint operation</strong> (<em>Gemeinschaftsbetrieb</em>) exists when
              legally independent companies run a shared business — typical indicators:
              unified management structure, shared premises, shared HR or accounting, identical
              management. In that case the employees of all participating companies are{' '}
              <strong>added together</strong> for the threshold.
            </p>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              According to the settled case law of the Federal Labour Court, a joint operation
              of several companies within the meaning of{' '}
              <NormLink href={NORM.kschg23}>§&nbsp;23 (1) KSchG</NormLink> exists when the
              material and immaterial operating resources available at an establishment are
              used jointly by several employers for a <strong>uniform work-technical purpose</strong>
              {' '}and the deployment of the employees is <strong>institutionally regulated
              through a unified management apparatus</strong>.
            </p>

            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Consequence: a single company that on its own would be a small business can be
              drawn into the scope of the KSchG by being embedded in a joint operation — on
              condition that the joint management is <strong>institutionally entrenched</strong>{' '}
              and does not only emerge in isolated cases.
            </p>

            <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-gold">
              <p className="text-[0.95rem] font-semibold text-ink mb-2">
                Example — KSchG applies through joint operation
              </p>
              <p className="text-[0.9rem] text-ink-light m-0">
                Employee A works at X GmbH with 4 full-time staff. X GmbH and its sister
                company Y GmbH (10 full-time staff) sit in the same premises, share a managing
                director and share HR and accounting. Result: strong indicators of a joint
                operation. The workforces are added (14 employees) — the KSchG applies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              Burden of proof
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Who bears the burden of proof for the threshold?
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              In an unfair-dismissal claim the question &bdquo;does the KSchG apply at all?&ldquo;
              is decisive. The division of the burden of proof is settled:
            </p>

            <ul className="list-disc pl-6 space-y-3 text-[1rem] text-ink-light leading-relaxed mb-5">
              <li>
                <strong>Burden of allegation on the employee:</strong> the dismissed worker must
                first allege, with substance, that the business regularly employs more than 10
                staff — identifying names/positions is enough, no complete payroll required.
              </li>
              <li>
                <strong>Detailed counter-allegation by the employer:</strong> if the employer
                disputes this, it must plead concretely on the number and structure of the
                staff employed — e.g. who is classified as a freelancer, managing director or
                apprentice. The BAG described this allocation in its judgment of 24 February
                2005 – 2 AZR 373/03.
              </li>
              <li>
                <strong>If the facts cannot be clarified:</strong> the uncertainty regularly
                falls on the employer, because the information lies in its sphere of
                organisation.
              </li>
            </ul>

            <p className="text-[0.85rem] text-ink-muted mt-2">
              Reference:{' '}
              <a
                href={bagDejureUrl('24.02.2005', '2 AZR 373/03')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark no-underline hover:underline"
              >
                BAG 24.02.2005 – 2 AZR 373/03 on dejure.org &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              In practice
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              What (non-)applicability of the KSchG means in practice
            </h2>
            <p className="text-[1.05rem] text-ink-light leading-relaxed mb-5">
              Even if the KSchG does <strong>not</strong> apply, you are not left unprotected.
              Many dismissals still fail on formal or special-protection grounds:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[1rem] text-ink-light leading-relaxed">
              <li>
                <strong>Written form:</strong> original signature required
                (<NormLink href="https://dejure.org/gesetze/BGB/623.html">§&nbsp;623 BGB</NormLink>)
                — many dismissals fail here alone.
              </li>
              <li>
                <strong>Notice periods:</strong>{' '}
                <NormLink href="https://dejure.org/gesetze/BGB/622.html">§&nbsp;622 BGB</NormLink>{' '}
                still applies — and the employer must observe it, regardless of KSchG scope.
              </li>
              <li>
                <strong>Special dismissal protection:</strong> pregnancy, parental leave, severe
                disability, works-council membership — these protections apply independently of
                the KSchG.
              </li>
              <li>
                <strong>Good faith / anti-discrimination:</strong> dismissals violating{' '}
                <NormLink href="https://dejure.org/gesetze/BGB/242.html">§&nbsp;242 BGB</NormLink>{' '}
                or the AGG are invalid even outside KSchG.
              </li>
              <li>
                <strong>Apprentices</strong> are not counted
                (<NormLink href={NORM.kschg23}>§&nbsp;23 (1) sentences 2 and 3 KSchG</NormLink>{' '}
                — &bdquo;excluding those employed solely for vocational training&ldquo;).
              </li>
              <li>
                <strong>The dismissed employee</strong> is counted — even if the position is not
                refilled.
              </li>
              <li>
                <strong>Filing deadline still 3 weeks:</strong> the deadline under{' '}
                <NormLink href={NORM.kschg4}>§&nbsp;4 KSchG</NormLink> applies regardless of
                whether substantive KSchG protection applies — miss it and you lose the right
                to challenge.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
              FAQ
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Frequent questions on KSchG applicability
            </h2>
            <div className="space-y-5">
              {faqs.map((f, i) => (
                <details key={i} className="group border-b border-border-light pb-5">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-semibold text-[1rem] text-ink">
                    {f.q}
                    <span className="text-gold-dark text-[1.1rem] group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="text-[0.95rem] text-ink-light leading-relaxed mt-3 mb-0">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[1.4rem] font-bold mb-5">Related topics</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { href: '/en/dismissal', label: 'Dismissal — overview' },
              { href: '/en/unfair-dismissal-claim', label: 'Unfair-dismissal claim' },
              { href: '/en/small-business-threshold-calculator', label: 'Test the 10-employee threshold' },
              { href: '/en/redundancy-dismissal', label: 'Redundancy dismissal' },
              { href: '/en/severance-pay', label: 'Severance pay' },
              { href: '/en/notice-periods', label: 'Statutory notice periods' },
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
