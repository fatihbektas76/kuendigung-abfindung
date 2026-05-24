'use client';

import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step4Gegner({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step4.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step4.description}
      </p>

      {/* Gegner Name */}
      <div>
        <label htmlFor="gegnerName" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step4.gegnerName} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="gegnerName"
          type="text"
          value={data.gegnerName}
          onChange={(e) => onChange('gegnerName', e.target.value)}
          placeholder={t.step4.placeholderName}
          className={`${INPUT_CLASS} ${errors.gegnerName ? 'border-red-400' : ''}`}
        />
        {errors.gegnerName && <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerName}</p>}
      </div>

      {/* Gegner Straße */}
      <div>
        <label htmlFor="gegnerStrasse" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step4.gegnerStrasse} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="gegnerStrasse"
          type="text"
          value={data.gegnerStrasse}
          onChange={(e) => onChange('gegnerStrasse', e.target.value)}
          placeholder={t.step4.placeholderStrasse}
          className={`${INPUT_CLASS} ${errors.gegnerStrasse ? 'border-red-400' : ''}`}
        />
        {errors.gegnerStrasse && <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerStrasse}</p>}
      </div>

      {/* PLZ + Ort */}
      <div className="grid grid-cols-[120px_1fr] gap-4 max-md:grid-cols-1">
        <div>
          <label htmlFor="gegnerPlz" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step4.gegnerPlz} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="gegnerPlz"
            type="text"
            value={data.gegnerPlz}
            onChange={(e) => onChange('gegnerPlz', e.target.value)}
            placeholder={t.step4.placeholderPlz}
            className={`${INPUT_CLASS} ${errors.gegnerPlz ? 'border-red-400' : ''}`}
          />
          {errors.gegnerPlz && <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerPlz}</p>}
        </div>
        <div>
          <label htmlFor="gegnerOrt" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step4.gegnerOrt} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="gegnerOrt"
            type="text"
            value={data.gegnerOrt}
            onChange={(e) => onChange('gegnerOrt', e.target.value)}
            placeholder={t.step4.placeholderOrt}
            className={`${INPUT_CLASS} ${errors.gegnerOrt ? 'border-red-400' : ''}`}
          />
          {errors.gegnerOrt && <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerOrt}</p>}
        </div>
      </div>

      {/* Ansprechpartner (optional) */}
      <div>
        <label htmlFor="gegnerAnsprechpartner" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step4.gegnerAnsprechpartner}
        </label>
        <input
          id="gegnerAnsprechpartner"
          type="text"
          value={data.gegnerAnsprechpartner}
          onChange={(e) => onChange('gegnerAnsprechpartner', e.target.value)}
          placeholder={t.step4.placeholderAnsprechpartner}
          className={INPUT_CLASS}
        />
      </div>

      {/* E-Mail Gegner (optional) */}
      <div>
        <label htmlFor="gegnerEmail" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step4.gegnerEmail}
        </label>
        <input
          id="gegnerEmail"
          type="email"
          value={data.gegnerEmail}
          onChange={(e) => onChange('gegnerEmail', e.target.value)}
          placeholder={t.step4.placeholderGegnerEmail}
          className={INPUT_CLASS}
        />
      </div>
    </div>
  );
}
