'use client';

import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step3Rechtsgebiet({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();

  const isSonstiges = data.rechtsgebiet === 'sonstiges';
  const sonstigesRequired = isSonstiges;
  const sonstigesEmpty = !data.rechtsgebietSonstiges.trim();
  const hasError = !!errors.rechtsgebiet && !data.rechtsgebiet && sonstigesEmpty;
  const sonstigesError = !!errors.rechtsgebiet && sonstigesRequired && sonstigesEmpty;

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step3.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step3.description}
      </p>

      {/* Rechtsgebiet Dropdown */}
      <div>
        <label htmlFor="rechtsgebiet" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step3.rechtsgebiet} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <select
          id="rechtsgebiet"
          value={data.rechtsgebiet}
          onChange={(e) => onChange('rechtsgebiet', e.target.value as typeof data.rechtsgebiet)}
          className={`form-select ${INPUT_CLASS} ${hasError ? 'border-red-400' : ''}`}
        >
          <option value="" disabled>{t.step3.selectPlaceholder}</option>
          {t.rechtsgebietOptionen.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Freitext — Pflicht bei "Sonstiges", sonst optionale Zusatzinfo */}
      <div>
        <label htmlFor="rechtsgebietSonstiges" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step3.sonstigesLabel}
          {sonstigesRequired && <span className="text-gold-dark ml-0.5">*</span>}
        </label>
        <p className="text-[0.78rem] text-ink-muted mb-1.5">
          {sonstigesRequired ? t.step3.sonstigesHintRequired : t.step3.sonstigesHint}
        </p>
        <textarea
          id="rechtsgebietSonstiges"
          value={data.rechtsgebietSonstiges}
          onChange={(e) => onChange('rechtsgebietSonstiges', e.target.value)}
          placeholder={t.step3.sonstigesPlaceholder}
          rows={4}
          className={`${INPUT_CLASS} resize-y ${sonstigesError ? 'border-red-400' : ''}`}
        />
      </div>

      {(hasError || sonstigesError) && (
        <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsgebiet}</p>
      )}
    </div>
  );
}
