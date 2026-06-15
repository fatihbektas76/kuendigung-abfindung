'use client';

import type { StepProps, PartyType } from '../types';
import { useLanguage } from '../LanguageContext';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step4Gegner({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();
  const isFirma = data.gegnerTyp === 'unternehmen';
  const nameLabel = isFirma ? t.step4.gegnerNameFirma : t.step4.gegnerNamePrivat;
  const namePlaceholder = isFirma ? t.step4.placeholderName : t.step4.placeholderNamePrivat;

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step4.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step4.description}
      </p>

      {/* Typ-Selector (Privatperson / Unternehmen) */}
      <fieldset>
        <legend className="block text-[0.84rem] font-semibold text-ink mb-2">
          {t.step4.typFrage} <span className="text-gold-dark ml-0.5">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {(['privat', 'unternehmen'] as PartyType[]).filter(Boolean).map((typ) => {
            const active = data.gegnerTyp === typ;
            const label = typ === 'privat' ? t.step4.typPrivat : t.step4.typUnternehmen;
            return (
              <label
                key={typ}
                className={`flex items-center gap-2.5 py-3 px-4 border rounded-sm cursor-pointer transition-all ${
                  active
                    ? 'border-gold bg-cream'
                    : 'border-border bg-white hover:border-gold-dark'
                }`}
              >
                <input
                  type="radio"
                  name="gegnerTyp"
                  value={typ}
                  checked={active}
                  onChange={() => onChange('gegnerTyp', typ)}
                  className="accent-gold-dark"
                />
                <span className="text-[0.9rem] font-medium text-ink">{label}</span>
              </label>
            );
          })}
        </div>
        {errors.gegnerTyp && (
          <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerTyp}</p>
        )}
      </fieldset>

      {/* Name / Firma */}
      <div>
        <label htmlFor="gegnerName" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {nameLabel} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="gegnerName"
          type="text"
          value={data.gegnerName}
          onChange={(e) => onChange('gegnerName', e.target.value)}
          placeholder={namePlaceholder}
          className={`${INPUT_CLASS} ${errors.gegnerName ? 'border-red-400' : ''}`}
        />
        {errors.gegnerName && <p className="text-[0.78rem] text-red-500 mt-1">{errors.gegnerName}</p>}
      </div>

      {/* Rechtsform (nur bei Unternehmen, optional) */}
      {isFirma && (
        <div>
          <label htmlFor="gegnerRechtsform" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step4.gegnerRechtsform}
          </label>
          <input
            id="gegnerRechtsform"
            type="text"
            value={data.gegnerRechtsform}
            onChange={(e) => onChange('gegnerRechtsform', e.target.value)}
            placeholder={t.step4.placeholderRechtsformGegner}
            className={INPUT_CLASS}
          />
        </div>
      )}

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
      {isFirma && (
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
      )}

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
