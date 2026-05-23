'use client';

import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step3Rechtsgebiet({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();

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
          className={`form-select ${INPUT_CLASS} ${errors.rechtsgebiet ? 'border-red-400' : ''}`}
        >
          <option value="" disabled>{t.step3.selectPlaceholder}</option>
          {t.rechtsgebietOptionen.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.rechtsgebiet && <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsgebiet}</p>}
      </div>

      {/* Sonstiges Freitext */}
      {data.rechtsgebiet === 'sonstiges' && (
        <div>
          <label htmlFor="rechtsgebietSonstiges" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step3.sonstigesLabel} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <textarea
            id="rechtsgebietSonstiges"
            value={data.rechtsgebietSonstiges}
            onChange={(e) => onChange('rechtsgebietSonstiges', e.target.value)}
            placeholder={t.step3.sonstigesPlaceholder}
            rows={3}
            className={`${INPUT_CLASS} resize-y ${errors.rechtsgebietSonstiges ? 'border-red-400' : ''}`}
          />
          {errors.rechtsgebietSonstiges && <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsgebietSonstiges}</p>}
        </div>
      )}
    </div>
  );
}
