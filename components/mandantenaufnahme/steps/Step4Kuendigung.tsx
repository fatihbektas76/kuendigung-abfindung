'use client';

import type { StepProps } from '../types';
import { VERSICHERUNGEN } from '../types';
import { useLanguage } from '../LanguageContext';
import SearchableSelect from '../SearchableSelect';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

function RadioOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left py-4 px-5 rounded-sm border-2 font-sans text-[0.95rem] font-medium cursor-pointer transition-all ${
        selected
          ? 'border-gold bg-gold-bg text-ink'
          : 'border-border bg-white text-ink hover:border-gold/50'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? 'border-gold' : 'border-border'
          }`}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-gold" />}
        </span>
        {label}
      </span>
    </button>
  );
}

export default function Step4Kuendigung({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();
  const anzahl = data.kuendigungsAnzahl === '3+' ? 3 : data.kuendigungsAnzahl === '2' ? 2 : data.kuendigungsAnzahl === '1' ? 1 : 0;

  function updateKuendigung(index: number, field: 'kuendigungsDatum' | 'zugangsDatum', value: string) {
    const updated = [...data.kuendigungen];
    while (updated.length <= index) {
      updated.push({ kuendigungsDatum: '', zugangsDatum: '' });
    }
    updated[index] = { ...updated[index], [field]: value };
    onChange('kuendigungen', updated);
  }

  function handleAnzahlChange(val: '1' | '2' | '3+') {
    onChange('kuendigungsAnzahl', val);
    const count = val === '3+' ? 3 : val === '2' ? 2 : 1;
    const updated = [...data.kuendigungen];
    while (updated.length < count) {
      updated.push({ kuendigungsDatum: '', zugangsDatum: '' });
    }
    onChange('kuendigungen', updated.slice(0, count));
  }

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step4.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step4.description}
      </p>

      {/* Anzahl Kündigungen */}
      <div>
        <label className="block text-[0.84rem] font-semibold text-ink mb-2">
          {t.step4.anzahlFrage} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          <RadioOption label="1" selected={data.kuendigungsAnzahl === '1'} onClick={() => handleAnzahlChange('1')} />
          <RadioOption label="2" selected={data.kuendigungsAnzahl === '2'} onClick={() => handleAnzahlChange('2')} />
          <RadioOption label={t.step4.dreiOderMehr} selected={data.kuendigungsAnzahl === '3+'} onClick={() => handleAnzahlChange('3+')} />
        </div>
        {errors.kuendigungsAnzahl && <p className="text-[0.78rem] text-red-500 mt-1">{errors.kuendigungsAnzahl}</p>}
      </div>

      {/* Kündigung Details */}
      {anzahl > 0 && (
        <div className="space-y-4">
          {Array.from({ length: anzahl }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-cream/50 border-l-[3px] border-gold/20 rounded-sm space-y-3"
            >
              <div className="text-[0.84rem] font-semibold text-ink">
                {anzahl > 1 ? t.step4.kuendigungNr.replace('{n}', String(i + 1)) : t.step4.kuendigung}
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label
                    htmlFor={`kuendigungsDatum-${i}`}
                    className="block text-[0.84rem] font-semibold text-ink mb-1.5"
                  >
                    {t.step4.kuendigungZuWann} <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    id={`kuendigungsDatum-${i}`}
                    type="date"
                    value={data.kuendigungen[i]?.kuendigungsDatum || ''}
                    onChange={(e) => updateKuendigung(i, 'kuendigungsDatum', e.target.value)}
                    className={`${INPUT_CLASS} ${errors[`kuendigungsDatum_${i}`] ? 'border-red-400' : ''}`}
                  />
                  {errors[`kuendigungsDatum_${i}`] && (
                    <p className="text-[0.78rem] text-red-500 mt-1">{errors[`kuendigungsDatum_${i}`]}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`zugangsDatum-${i}`}
                    className="block text-[0.84rem] font-semibold text-ink mb-1.5"
                  >
                    {t.step4.wannEingegangen} <span className="text-gold-dark ml-0.5">*</span>
                  </label>
                  <input
                    id={`zugangsDatum-${i}`}
                    type="date"
                    value={data.kuendigungen[i]?.zugangsDatum || ''}
                    onChange={(e) => updateKuendigung(i, 'zugangsDatum', e.target.value)}
                    className={`${INPUT_CLASS} ${errors[`zugangsDatum_${i}`] ? 'border-red-400' : ''}`}
                  />
                  {errors[`zugangsDatum_${i}`] && (
                    <p className="text-[0.78rem] text-red-500 mt-1">{errors[`zugangsDatum_${i}`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rechtsschutzversicherung */}
      <div>
        <label className="block text-[0.84rem] font-semibold text-ink mb-2">
          {t.step4.rsvFrage} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <RadioOption
            label={t.step4.ja}
            selected={data.rechtsschutz === 'ja'}
            onClick={() => onChange('rechtsschutz', 'ja')}
          />
          <RadioOption
            label={t.step4.nein}
            selected={data.rechtsschutz === 'nein'}
            onClick={() => onChange('rechtsschutz', 'nein')}
          />
        </div>
        {errors.rechtsschutz && <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsschutz}</p>}
      </div>

      {/* Conditional: Versicherung Details */}
      {data.rechtsschutz === 'ja' && (
        <div className="space-y-4 p-4 bg-cream/50 border-l-[3px] border-gold/20 rounded-sm">
          <SearchableSelect
            options={VERSICHERUNGEN}
            value={data.versicherungsgesellschaft}
            onChange={(val) => onChange('versicherungsgesellschaft', val)}
            label={t.step4.versicherungsgesellschaft}
            id="versicherungsgesellschaft"
            required
            error={errors.versicherungsgesellschaft}
          />

          <div>
            <label htmlFor="versicherungsnummer" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step4.versicherungsnummer}
            </label>
            <input
              id="versicherungsnummer"
              type="text"
              value={data.versicherungsnummer}
              onChange={(e) => onChange('versicherungsnummer', e.target.value)}
              placeholder={t.step4.placeholderVsnr}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
