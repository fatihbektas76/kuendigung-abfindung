/**
 * FAQs for the English homepage.
 *
 * Lives in `lib/` (not inside a 'use client' module) so both the server
 * component that emits the FAQPage JSON-LD and the client-side accordion
 * can import the same source of truth without crossing the server/client
 * serialisation boundary.
 */

export interface EnFaqItem {
  readonly question: string;
  readonly answer: string;
}

export const EN_FAQS: readonly EnFaqItem[] = [
  {
    question: 'Do I have a right to severance pay after a dismissal in Germany?',
    answer:
      'German law does not give a general entitlement to severance pay. A statutory claim exists only in narrow cases (e.g. § 1a KSchG, when the employer ties an offer of severance to the dismissal). In practice, severance is negotiated during the unfair-dismissal proceedings (Kündigungsschutzklage) or in a termination agreement. The typical formula is 0.5 gross monthly salaries per year of service.',
  },
  {
    question: 'How long do I have to challenge my dismissal?',
    answer:
      'Only three weeks from receipt of the written dismissal (§ 4 KSchG). If you miss this deadline the dismissal is generally final, regardless of whether it was lawful. Subsequent admission of a late claim under § 5 KSchG is granted only in rare cases. Contact a German employment-law specialist immediately.',
  },
  {
    question: 'What is the difference between a dismissal and a termination agreement?',
    answer:
      'A dismissal (Kündigung) ends the contract unilaterally — you can sue against it. A termination agreement (Aufhebungsvertrag) is a mutual settlement, usually with severance. Important: a termination agreement can trigger a 12-week unemployment-benefit blocking period (Sperrzeit) unless you have a recognised important reason.',
  },
  {
    question: 'When is a summary (without-notice) dismissal valid?',
    answer:
      'A summary dismissal under § 626 BGB requires a serious cause that makes it unreasonable for the employer to wait out the notice period. The hurdle is very high — most summary dismissals fail in court. The employer must also act within two weeks of learning the cause.',
  },
  {
    question: 'Does the Dismissal Protection Act (KSchG) apply to me?',
    answer:
      'The KSchG applies if you have been employed for more than six months and the employer has more than 10 employees (§ 23 KSchG, “Schwellenwert”). Managing directors and certain senior executives are excluded.',
  },
  {
    question: 'How is my severance calculated for a given length of service?',
    answer:
      'The standard formula is 0.5 × gross monthly salary × years of service. With 10 years at €3,000 gross monthly salary that gives €15,000 as a starting point. Depending on the strength of the case (social selection, formal errors, tenure, age) considerably more is regularly achievable.',
  },
  {
    question: 'What does an unfair-dismissal claim cost?',
    answer:
      'In the first instance at the labour court each side bears its own legal costs regardless of outcome (§ 12a ArbGG). No court fees are incurred at first instance. Legal fees depend on the amount in dispute (typically one gross monthly salary). Many employees in Germany hold legal-expenses insurance (Rechtsschutzversicherung) that covers the costs.',
  },
  {
    question: 'Can my employer dismiss me during pregnancy?',
    answer:
      'No. Pregnant employees enjoy special protection under § 17 MuSchG. A dismissal during pregnancy and up to four months after birth is generally invalid and requires prior approval by the supervisory authority. Exceptions are rare.',
  },
];
