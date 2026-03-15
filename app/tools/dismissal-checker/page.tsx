'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToolSchema from '@/components/ToolSchema';

/* ─── Types ─── */

interface FormData {
  companySize: string;
  employmentDuration: string;
  dismissalReason: string;
  priorWarning: string;
  socialSelection: string;
  performanceType: string;
  specialProtection: string[];
  noticePeriod: string;
  writtenForm: string;
}

type StepId =
  | 'companySize'
  | 'employmentDuration'
  | 'dismissalReason'
  | 'priorWarning'
  | 'socialSelection'
  | 'performanceType'
  | 'specialProtection'
  | 'noticePeriod'
  | 'writtenForm';

type RiskLevel = 'high' | 'medium' | 'low';

interface RiskResult {
  level: RiskLevel;
  title: string;
  reasons: string[];
}

/* ─── Constants ─── */

const INITIAL: FormData = {
  companySize: '',
  employmentDuration: '',
  dismissalReason: '',
  priorWarning: '',
  socialSelection: '',
  performanceType: '',
  specialProtection: [],
  noticePeriod: '',
  writtenForm: '',
};

/* ─── Logic ─── */

function getActiveSteps(data: FormData): StepId[] {
  const steps: StepId[] = ['companySize', 'employmentDuration'];
  const kschg = ['11-50', '51-200', '200+'].includes(data.companySize);
  if (kschg) {
    steps.push('dismissalReason');
    if (data.dismissalReason === 'conduct') steps.push('priorWarning');
    else if (data.dismissalReason === 'operational') steps.push('socialSelection');
    else if (data.dismissalReason === 'performance') steps.push('performanceType');
  }
  steps.push('specialProtection', 'noticePeriod', 'writtenForm');
  return steps;
}

function isStepComplete(stepId: StepId, data: FormData): boolean {
  switch (stepId) {
    case 'companySize': return data.companySize !== '';
    case 'employmentDuration': return data.employmentDuration !== '';
    case 'dismissalReason': return data.dismissalReason !== '';
    case 'priorWarning': return data.priorWarning !== '';
    case 'socialSelection': return data.socialSelection !== '';
    case 'performanceType': return data.performanceType !== '';
    case 'specialProtection': return data.specialProtection.length > 0;
    case 'noticePeriod': return data.noticePeriod !== '';
    case 'writtenForm': return data.writtenForm !== '';
  }
}

function assessRisk(data: FormData): RiskResult {
  const reasons: string[] = [];
  let highFactors = 0;
  let medFactors = 0;

  const kschgCompany = ['11-50', '51-200', '200+'].includes(data.companySize);
  const kschgApplies = kschgCompany && data.employmentDuration !== 'less-6m';
  const hasSpecialProtection =
    data.specialProtection.length > 0 && !data.specialProtection.includes('none');

  // 1. Written form (§ 623 BGB)
  if (data.writtenForm === 'email') {
    highFactors++;
    reasons.push(
      'The dismissal was sent by email only. Under \u00a7 623 BGB, a dismissal must be in written form with an original (\u201cwet\u201d) signature. An email dismissal is legally void (nichtig) \u2014 it has no legal effect whatsoever.'
    );
  } else if (data.writtenForm === 'no') {
    highFactors++;
    reasons.push(
      'The dismissal was not delivered in proper written form. Under \u00a7 623 BGB, a termination without an original signed letter is void (nichtig) and has no legal effect.'
    );
  } else {
    reasons.push(
      'The dismissal was delivered in proper written form with an original signature, satisfying the requirement of \u00a7 623 BGB.'
    );
  }

  // 2. Special protection
  if (hasSpecialProtection) {
    highFactors++;
    const labels: Record<string, string> = {
      pregnant: 'pregnant or on maternity/parental leave (\u00a7 17 MuSchG)',
      'works-council': 'a works council member (\u00a7 15 KSchG)',
      disabled: 'severely disabled (\u00a7 168 SGB IX)',
      dpo: 'a data protection officer (\u00a7 6 Abs. 4 BDSG)',
    };
    const protLabels = data.specialProtection
      .filter((p) => p !== 'none')
      .map((p) => labels[p] || p)
      .join('; ');
    reasons.push(
      `The employee has special protection status: ${protLabels}. Dismissing specially protected employees requires additional approvals or is subject to strict restrictions \u2014 violating these rules makes the dismissal voidable or void.`
    );
  } else {
    reasons.push(
      'The employee does not have any special protection status that would require additional authorization for the dismissal.'
    );
  }

  // 3. KSchG / dismissal reason analysis
  if (kschgApplies) {
    if (data.dismissalReason === 'conduct') {
      if (data.priorWarning === 'no') {
        highFactors++;
        reasons.push(
          'For a conduct-related dismissal under the Dismissal Protection Act (KSchG), a prior written warning (Abmahnung) for the same or similar misconduct is generally required. Without a prior warning, German labor courts almost always find the dismissal to be socially unjustified under \u00a7 1 KSchG.'
        );
      } else {
        reasons.push(
          'A prior warning (Abmahnung) was issued for the same or similar misconduct, which strengthens the employer\u2019s position. For a conduct-related dismissal under \u00a7 1 KSchG, this is a key prerequisite.'
        );
      }
    } else if (data.dismissalReason === 'operational') {
      if (data.socialSelection === 'no') {
        highFactors++;
        reasons.push(
          'For an operational/redundancy dismissal, a proper social selection (Sozialauswahl) under \u00a7 1 Abs. 3 KSchG is mandatory. The employer must select the employee for dismissal based on objective criteria (age, tenure, dependents, disability). Without it, courts will almost certainly find the dismissal unfair.'
        );
      } else if (data.socialSelection === 'unsure') {
        medFactors++;
        reasons.push(
          'You indicated uncertainty about whether a proper social selection (Sozialauswahl) was conducted. Under \u00a7 1 Abs. 3 KSchG, this is a mandatory step for any redundancy dismissal. If the selection cannot be demonstrated, the dismissal is likely to be overturned by a labor court.'
        );
      } else {
        reasons.push(
          'A social selection (Sozialauswahl) was conducted as required by \u00a7 1 Abs. 3 KSchG for operational dismissals, considering the employee\u2019s age, tenure, dependents, and disability status.'
        );
      }
    } else if (data.dismissalReason === 'performance') {
      if (data.performanceType === 'long-term-illness') {
        medFactors++;
        reasons.push(
          'A dismissal due to long-term illness (personenbedingte K\u00fcndigung) requires a negative health prognosis, proof of significant operational disruption, and that no reasonable accommodation is possible. German labor courts set a high bar for illness-based dismissals.'
        );
      } else if (data.performanceType === 'frequent-illness') {
        medFactors++;
        reasons.push(
          'A dismissal due to frequent short-term illness requires documented operational disruption, a negative prognosis for future absences, and typically a prior BEM process (Betriebliches Eingliederungsmanagement). Courts scrutinize these dismissals closely.'
        );
      } else {
        reasons.push(
          'A dismissal based on lack of qualifications or skills (personenbedingte K\u00fcndigung) requires proof that the employee is objectively unable to perform the required duties and that no alternative position or retraining is feasible.'
        );
      }
    }
  } else if (kschgCompany && data.employmentDuration === 'less-6m') {
    reasons.push(
      'Although your company has more than 10 employees, the employee has been employed for less than 6 months. Under \u00a7 1 KSchG, the Dismissal Protection Act only applies after a 6-month waiting period. During this period, no justification is required for the dismissal.'
    );
  } else {
    reasons.push(
      'Your company has 10 or fewer employees in Germany \u2014 the Dismissal Protection Act (KSchG) does not apply. No justification for the dismissal is required, and the employee cannot claim \u201csocial unjustification.\u201d However, the dismissal must still comply with written form requirements, notice periods, and anti-discrimination rules.'
    );
  }

  // 4. Notice period (§ 622 BGB)
  if (data.noticePeriod === 'no') {
    highFactors++;
    reasons.push(
      'The statutory notice period was not observed. Under \u00a7 622 BGB, notice periods range from 4 weeks up to 7 months depending on the employee\u2019s length of service. Failure to observe the correct notice period makes the dismissal challengeable.'
    );
  } else if (data.noticePeriod === 'unsure') {
    medFactors++;
    reasons.push(
      'You are unsure whether the correct notice period was observed. Under \u00a7 622 BGB, statutory notice periods increase with the employee\u2019s tenure \u2014 from 4 weeks (basic) up to 7 months for 20+ years of service. An incorrect notice period is a common ground for challenging a dismissal.'
    );
  } else {
    reasons.push(
      'The statutory notice period under \u00a7 622 BGB was observed, which removes one common ground for challenging the dismissal.'
    );
  }

  let level: RiskLevel;
  if (highFactors > 0) level = 'high';
  else if (medFactors > 0) level = 'medium';
  else level = 'low';

  const titles: Record<RiskLevel, string> = {
    high: 'High Risk \u2014 Dismissal Likely Challengeable',
    medium: 'Medium Risk \u2014 Some Uncertainties Remain',
    low: 'Low Risk \u2014 Dismissal Appears Procedurally Sound',
  };

  return { level, title: titles[level], reasons };
}

/* ─── Sub-components ─── */

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left py-4 px-5 rounded border transition-all cursor-pointer ${
        selected
          ? 'border-gold bg-gold-bg shadow-sm'
          : 'border-border-light bg-white hover:border-gold/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? 'border-gold' : 'border-border'
          }`}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
        </div>
        <span className="text-[0.92rem] font-medium text-ink">{children}</span>
      </div>
    </button>
  );
}

function CheckCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left py-4 px-5 rounded border transition-all cursor-pointer ${
        selected
          ? 'border-gold bg-gold-bg shadow-sm'
          : 'border-border-light bg-white hover:border-gold/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 min-w-[20px] rounded border-2 flex items-center justify-center transition-all ${
            selected ? 'border-gold bg-gold' : 'border-border'
          }`}
        >
          {selected && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
        <span className="text-[0.92rem] font-medium text-ink">{children}</span>
      </div>
    </button>
  );
}

function HintBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gold-bg border border-gold/[0.12] rounded p-4 mt-4 text-[0.88rem] text-ink-light leading-relaxed">
      {children}
    </div>
  );
}

/* ─── Main Component ─── */

export default function DismissalCheckerPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const activeSteps = getActiveSteps(formData);
  const totalSteps = activeSteps.length;
  const safeIndex = Math.min(stepIndex, totalSteps - 1);
  const currentStep = activeSteps[safeIndex];

  function setField(field: keyof FormData, value: string) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'companySize' && !['11-50', '51-200', '200+'].includes(value)) {
        next.dismissalReason = '';
        next.priorWarning = '';
        next.socialSelection = '';
        next.performanceType = '';
      }
      if (field === 'dismissalReason') {
        next.priorWarning = '';
        next.socialSelection = '';
        next.performanceType = '';
      }
      return next;
    });
  }

  function toggleProtection(value: string) {
    setFormData((prev) => {
      let updated: string[];
      if (value === 'none') {
        updated = prev.specialProtection.includes('none') ? [] : ['none'];
      } else {
        const without = prev.specialProtection.filter((p) => p !== 'none');
        updated = without.includes(value)
          ? without.filter((p) => p !== value)
          : [...without, value];
      }
      return { ...prev, specialProtection: updated };
    });
  }

  function handleNext() {
    if (safeIndex === totalSteps - 1) {
      setShowResult(true);
    } else {
      setStepIndex(safeIndex + 1);
    }
  }

  function handleBack() {
    if (showResult) {
      setShowResult(false);
    } else if (safeIndex > 0) {
      setStepIndex(safeIndex - 1);
    }
  }

  function handleStartOver() {
    setFormData(INITIAL);
    setStepIndex(0);
    setShowResult(false);
  }

  const canProceed = isStepComplete(currentStep, formData);
  const result = showResult ? assessRisk(formData) : null;

  const riskColors: Record<RiskLevel, { bg: string; border: string; text: string; badge: string }> = {
    high: {
      bg: 'bg-[#FDF2F2]',
      border: 'border-[#F5C6CB]',
      text: 'text-[#C0392B]',
      badge: 'bg-[#C0392B] text-white',
    },
    medium: {
      bg: 'bg-[#FFF8E7]',
      border: 'border-[#F0DCA0]',
      text: 'text-[#856404]',
      badge: 'bg-[#F0DCA0] text-[#856404]',
    },
    low: {
      bg: 'bg-green-bg',
      border: 'border-green/20',
      text: 'text-green',
      badge: 'bg-green-bg text-green',
    },
  };

  function renderStep() {
    switch (currentStep) {
      case 'companySize':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              How many employees does your company have in Germany?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: '1-5', label: '1 \u2013 5 employees' },
                { value: '6-10', label: '6 \u2013 10 employees' },
                { value: '11-50', label: 'More than 10 \u2013 50 employees' },
                { value: '51-200', label: '51 \u2013 200 employees' },
                { value: '200+', label: 'More than 200 employees' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.companySize === opt.value}
                  onClick={() => setField('companySize', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'employmentDuration':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              How long has the employee been employed?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'less-6m', label: 'Less than 6 months' },
                { value: '6m-2y', label: '6 months \u2013 2 years' },
                { value: '2-5y', label: '2 \u2013 5 years' },
                { value: '5-10y', label: '5 \u2013 10 years' },
                { value: '10y+', label: 'More than 10 years' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.employmentDuration === opt.value}
                  onClick={() => setField('employmentDuration', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'dismissalReason':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              What is the reason for the dismissal?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'performance', label: 'Performance-related (Personenbedingt)' },
                { value: 'conduct', label: 'Conduct-related (Verhaltensbedingt)' },
                { value: 'operational', label: 'Operational / Redundancy (Betriebsbedingt)' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.dismissalReason === opt.value}
                  onClick={() => setField('dismissalReason', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'priorWarning':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              Did you issue a prior written warning (Abmahnung) for the same or similar misconduct?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'multiple', label: 'Multiple warnings issued' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.priorWarning === opt.value}
                  onClick={() => setField('priorWarning', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'socialSelection':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              Did you conduct a social selection (Sozialauswahl) considering the employee&rsquo;s age,
              tenure, dependents, and disability status?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'unsure', label: 'Not sure' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.socialSelection === opt.value}
                  onClick={() => setField('socialSelection', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'performanceType':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              Is the performance issue based on illness/disability or lack of skills?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'long-term-illness', label: 'Long-term illness' },
                { value: 'frequent-illness', label: 'Frequent short-term illness' },
                { value: 'lack-of-skills', label: 'Lack of qualifications / skills' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.performanceType === opt.value}
                  onClick={() => setField('performanceType', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
          </>
        );

      case 'specialProtection':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-2">
              Does the employee have any special protection status?
            </h3>
            <p className="text-[0.84rem] text-ink-muted mb-5">Select all that apply.</p>
            <div className="flex flex-col gap-3">
              {[
                { value: 'pregnant', label: 'Pregnant or on maternity / parental leave' },
                { value: 'works-council', label: 'Works council member (Betriebsrat)' },
                { value: 'disabled', label: 'Severely disabled (Schwerbehindert)' },
                { value: 'dpo', label: 'Data protection officer' },
                { value: 'none', label: 'None of the above' },
              ].map((opt) => (
                <CheckCard
                  key={opt.value}
                  selected={formData.specialProtection.includes(opt.value)}
                  onClick={() => toggleProtection(opt.value)}
                >
                  {opt.label}
                </CheckCard>
              ))}
            </div>
          </>
        );

      case 'noticePeriod':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              Was the correct notice period observed?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'unsure', label: 'Not sure' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.noticePeriod === opt.value}
                  onClick={() => setField('noticePeriod', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
            <HintBox>
              <strong>Note:</strong> German statutory notice periods range from 4 weeks to 7 months
              depending on the length of employment (&sect; 622 BGB). Collective bargaining agreements or
              the employment contract may provide for longer periods.
            </HintBox>
          </>
        );

      case 'writtenForm':
        return (
          <>
            <h3 className="font-serif text-[1.15rem] font-bold mb-5">
              Was the dismissal delivered in writing (signed original letter)?
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'email', label: 'It was sent by email only' },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={formData.writtenForm === opt.value}
                  onClick={() => setField('writtenForm', opt.value)}
                >
                  {opt.label}
                </OptionCard>
              ))}
            </div>
            <HintBox>
              <strong>Note:</strong> Under German law (&sect; 623 BGB), a dismissal must be in written form
              with an original signature. Email, fax, or verbal dismissals are legally void.
            </HintBox>
          </>
        );
    }
  }

  return (
    <main>
      <ToolSchema tool="dismissal-checker" />
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .step-animate { animation: fadeSlideIn 0.3s ease-out; }
      `}</style>

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-2 text-[0.84rem] text-ink-muted mb-4">
            <Link href="/" className="text-gold no-underline hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/#tools" className="text-gold no-underline hover:underline">
              Tools
            </Link>
            <span>/</span>
            <span>Dismissal Checker</span>
          </div>
          <h1 className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold leading-tight">
            Dismissal Risk Checker
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[620px] leading-relaxed mt-3">
            Answer a few questions about the dismissal to get an initial risk assessment under German
            employment law. Takes about 3 minutes.
          </p>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto px-8 py-12">
        {!showResult ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[0.84rem] font-semibold text-ink">
                  Step {safeIndex + 1} of {totalSteps}
                </span>
                <span className="text-[0.78rem] text-ink-muted">
                  {Math.round(((safeIndex + 1) / totalSteps) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((safeIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border border-border-light rounded p-8" key={`${safeIndex}-${currentStep}`}>
              <div className="step-animate">{renderStep()}</div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={safeIndex === 0}
                  className={`py-2.5 px-6 rounded-sm text-[0.92rem] font-semibold transition-all ${
                    safeIndex === 0
                      ? 'text-border cursor-not-allowed'
                      : 'text-ink-muted border border-border hover:border-gold hover:text-gold cursor-pointer'
                  }`}
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`py-2.5 px-6 rounded-sm text-[0.92rem] font-semibold transition-all ${
                    canProceed
                      ? 'bg-gold text-white hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(166,139,75,0.2)] cursor-pointer'
                      : 'bg-border text-white cursor-not-allowed'
                  }`}
                >
                  {safeIndex === totalSteps - 1 ? 'See Result' : 'Next \u2192'}
                </button>
              </div>
            </div>
          </>
        ) : result ? (
          <div className="step-animate">
            {/* Risk Badge */}
            <div
              className={`${riskColors[result.level].bg} ${riskColors[result.level].border} border rounded p-8 mb-6`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-block text-[0.78rem] font-bold rounded px-3 py-1 ${riskColors[result.level].badge}`}
                >
                  {result.level === 'high'
                    ? 'HIGH RISK'
                    : result.level === 'medium'
                      ? 'MEDIUM RISK'
                      : 'LOW RISK'}
                </span>
              </div>
              <h2 className={`font-serif text-[1.4rem] font-bold ${riskColors[result.level].text}`}>
                {result.title}
              </h2>
            </div>

            {/* Explanation Points */}
            <div className="bg-white border border-border-light rounded p-8 mb-6">
              <h3 className="font-serif text-[1.1rem] font-bold mb-5">Assessment Details</h3>
              <div className="flex flex-col gap-4">
                {result.reasons.map((reason, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 min-w-[24px] rounded-full bg-cream flex items-center justify-center text-[0.78rem] font-bold text-ink-muted mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[0.88rem] text-ink leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Week Reminder */}
            <div className="bg-[#FDF2F2] border border-[#F5C6CB] rounded p-6 mb-6">
              <p className="text-[0.88rem] text-ink leading-relaxed">
                <strong>Remember:</strong> The employee has only 3 weeks from receipt of the termination
                letter to file a claim (&sect; 4 KSchG). If no claim is filed within this period, the
                dismissal is considered valid regardless of any deficiencies.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#FFF8E7] border border-[#F0DCA0] rounded p-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 min-w-[32px] rounded-full bg-[rgba(166,139,75,0.06)] border border-gold/[0.12] flex items-center justify-center mt-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A68B4B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <p className="text-[0.88rem] text-ink leading-relaxed">
                  <strong>Important:</strong> This assessment provides general guidance only and is based on
                  simplified legal criteria. Employment law cases are highly fact-specific. The actual risk
                  depends on many additional factors that cannot be captured in a questionnaire. This tool is
                  not a substitute for professional legal advice. We strongly recommend consulting a qualified
                  employment attorney before or after issuing a dismissal.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
              >
                Discuss Your Case With an Employment Law Specialist &rarr;
              </a>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-[0.88rem] text-ink-muted hover:text-gold transition-colors cursor-pointer"
                >
                  &larr; Back to last question
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="text-[0.88rem] text-ink-muted hover:text-gold transition-colors cursor-pointer"
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
