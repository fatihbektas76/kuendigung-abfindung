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
      'A summary dismissal under § 626 BGB requires a serious cause that makes it unreasonable for the employer to wait out the notice period. The hurdle is very high — outcome depends strongly on the individual case, particularly the balancing of interests and the strict two-week deadline (§ 626 (2) sentence 1 BGB). On written request, the employer must state the reasons promptly in writing (§ 626 (2) sentence 3 BGB).',
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
      'In the first instance at the labour court each side bears its own legal costs regardless of outcome (§ 12a ArbGG). Court fees are waived entirely if the case settles. Legal fees depend on the value in dispute, which for an unfair-dismissal claim is capped at a quarterly salary — typically three gross monthly salaries (§ 42 (2) GKG). Many employees in Germany hold legal-expenses insurance (Rechtsschutzversicherung) that covers the costs, subject to waiting period, cover confirmation and any deductible.',
  },
  {
    question: 'What does the free first check include?',
    answer:
      'A short reply by email or phone (up to about 15 minutes): whether action is worthwhile, which deadlines apply and what our help would cost. It does not include a review of contracts or other documents or detailed legal advice.',
  },
  {
    question: 'What does a termination agreement review cost?',
    answer:
      'After the free first check you receive a cost quote for the detailed review and, if you wish, for negotiation with your employer. Costs arise only once you instruct us. Legal-expenses insurance does not always cover the review of a termination agreement; we clarify this for you.',
  },
  {
    question: 'Can my employer dismiss me during pregnancy?',
    answer:
      'No. Pregnant employees enjoy special protection under § 17 MuSchG. A dismissal during pregnancy and up to four months after birth is generally invalid and requires prior approval by the supervisory authority. Exceptions are rare.',
  },
];
