'use client';

import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';
import SearchableSelect from '@/components/mandantenaufnahme/SearchableSelect';
import { VERSICHERUNGEN } from '@/components/mandantenaufnahme/types';

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

export default function Step5Rechtsschutz({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step5.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step5.description}
      </p>

      {/* RSV Frage */}
      <div>
        <label className="block text-[0.84rem] font-semibold text-ink mb-2">
          {t.step5.rsvFrage} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <RadioOption
            label={t.step5.ja}
            selected={data.rechtsschutz === 'ja'}
            onClick={() => onChange('rechtsschutz', 'ja')}
          />
          <RadioOption
            label={t.step5.nein}
            selected={data.rechtsschutz === 'nein'}
            onClick={() => onChange('rechtsschutz', 'nein')}
          />
        </div>
        {errors.rechtsschutz && <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsschutz}</p>}
      </div>

      {/* Conditional: RSV details */}
      {data.rechtsschutz === 'ja' && (
        <div className="space-y-5 pl-0 border-l-[3px] border-gold/20 ml-0 p-4 bg-cream/50 rounded-sm">
          {/* Dauer */}
          <div>
            <label className="block text-[0.84rem] font-semibold text-ink mb-2">
              {t.step5.rsvDauerFrage} <span className="text-gold-dark ml-0.5">*</span>
            </label>
            <div className="space-y-2">
              {([
                { value: 'laenger3', label: t.step5.rsvDauerLaenger3 },
                { value: 'genau3', label: t.step5.rsvDauerGenau3 },
                { value: 'kuerzer3', label: t.step5.rsvDauerKuerzer3 },
              ] as const).map((opt) => (
                <RadioOption
                  key={opt.value}
                  label={opt.label}
                  selected={data.rechtsschutzDauer === opt.value}
                  onClick={() => onChange('rechtsschutzDauer', opt.value)}
                />
              ))}
            </div>
            {errors.rechtsschutzDauer && <p className="text-[0.78rem] text-red-500 mt-1">{errors.rechtsschutzDauer}</p>}
          </div>

          {/* Versicherungsgesellschaft */}
          <div>
            <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step5.versicherungsgesellschaft} <span className="text-gold-dark ml-0.5">*</span>
            </label>
            <SearchableSelect
              options={VERSICHERUNGEN}
              value={data.versicherungsgesellschaft}
              onChange={(val) => onChange('versicherungsgesellschaft', val)}
              label={t.step5.versicherungsgesellschaft}
              id="a-versicherungsgesellschaft"
              error={errors.versicherungsgesellschaft}
            />
          </div>

          {/* Versicherungsnummer */}
          <div>
            <label htmlFor="versicherungsnummer" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step5.versicherungsnummer}
            </label>
            <input
              id="versicherungsnummer"
              type="text"
              value={data.versicherungsnummer}
              onChange={(e) => onChange('versicherungsnummer', e.target.value)}
              placeholder={t.step5.placeholderVsnr}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
