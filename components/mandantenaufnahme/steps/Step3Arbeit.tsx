'use client';

import type { StepProps } from '../types';
import { KUENDIGUNGSSCHUTZ_OPTIONEN } from '../types';
import CompanyAutocomplete from '../CompanyAutocomplete';
import MultiSelect from '../MultiSelect';

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

export default function Step3Arbeit({ data, onChange, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        Arbeitsverhältnis
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        Angaben zu Ihrem Arbeitgeber und Ihrer Beschäftigung.
      </p>

      {/* Arbeitgeber Name + Adresse */}
      <CompanyAutocomplete
        nameValue={data.arbeitgeberName}
        strasseValue={data.arbeitgeberStrasse}
        plzValue={data.arbeitgeberPlz}
        ortValue={data.arbeitgeberOrt}
        onCompanyChange={({ name, strasse, plz, ort }) => {
          onChange('arbeitgeberName', name);
          onChange('arbeitgeberStrasse', strasse);
          onChange('arbeitgeberPlz', plz);
          onChange('arbeitgeberOrt', ort);
        }}
        required
        errors={{
          name: errors.arbeitgeberName,
          strasse: errors.arbeitgeberStrasse,
          plz: errors.arbeitgeberPlz,
          ort: errors.arbeitgeberOrt,
        }}
      />

      {/* Berufsbezeichnung + Arbeitsort */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div>
          <label htmlFor="berufsbezeichnung" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            Berufsbezeichnung <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="berufsbezeichnung"
            type="text"
            value={data.berufsbezeichnung}
            onChange={(e) => onChange('berufsbezeichnung', e.target.value)}
            placeholder="z.B. Projektmanager"
            className={`${INPUT_CLASS} ${errors.berufsbezeichnung ? 'border-red-400' : ''}`}
          />
          {errors.berufsbezeichnung && <p className="text-[0.78rem] text-red-500 mt-1">{errors.berufsbezeichnung}</p>}
        </div>
        <div>
          <label htmlFor="arbeitsort" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            Arbeitsort <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="arbeitsort"
            type="text"
            value={data.arbeitsort}
            onChange={(e) => onChange('arbeitsort', e.target.value)}
            placeholder="z.B. Heidelberg"
            className={`${INPUT_CLASS} ${errors.arbeitsort ? 'border-red-400' : ''}`}
          />
          {errors.arbeitsort && <p className="text-[0.78rem] text-red-500 mt-1">{errors.arbeitsort}</p>}
        </div>
      </div>

      {/* Bruttomonatslohn + Eintrittsdatum */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div>
          <label htmlFor="bruttomonatslohn" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            Bruttomonatslohn (€) <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <div className="relative">
            <input
              id="bruttomonatslohn"
              type="text"
              inputMode="numeric"
              value={data.bruttomonatslohn}
              onChange={(e) => onChange('bruttomonatslohn', e.target.value.replace(/[^\d.,]/g, ''))}
              placeholder="4.500"
              className={`${INPUT_CLASS} pr-10 ${errors.bruttomonatslohn ? 'border-red-400' : ''}`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted font-semibold">€</span>
          </div>
          {errors.bruttomonatslohn && <p className="text-[0.78rem] text-red-500 mt-1">{errors.bruttomonatslohn}</p>}
        </div>
        <div>
          <label htmlFor="eintrittsdatum" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            Eintritt im Unternehmen <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="eintrittsdatum"
            type="date"
            value={data.eintrittsdatum}
            onChange={(e) => onChange('eintrittsdatum', e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className={`${INPUT_CLASS} ${errors.eintrittsdatum ? 'border-red-400' : ''}`}
          />
          {errors.eintrittsdatum && <p className="text-[0.78rem] text-red-500 mt-1">{errors.eintrittsdatum}</p>}
        </div>
      </div>

      {/* Betriebsrat */}
      <div>
        <label className="block text-[0.84rem] font-semibold text-ink mb-2">
          Gibt es einen Betriebsrat? <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <RadioOption
            label="Ja"
            selected={data.betriebsrat === 'ja'}
            onClick={() => onChange('betriebsrat', 'ja')}
          />
          <RadioOption
            label="Nein"
            selected={data.betriebsrat === 'nein'}
            onClick={() => onChange('betriebsrat', 'nein')}
          />
        </div>
        {errors.betriebsrat && <p className="text-[0.78rem] text-red-500 mt-1">{errors.betriebsrat}</p>}
      </div>

      {/* Besonderer Kündigungsschutz */}
      <MultiSelect
        options={KUENDIGUNGSSCHUTZ_OPTIONEN}
        selected={data.kuendigungsschutz}
        onChange={(val) => onChange('kuendigungsschutz', val)}
        label="Besonderer Kündigungsschutz"
        id="kuendigungsschutz"
        sonstigValue={data.kuendigungsschutzSonstig}
        onSonstigChange={(val) => onChange('kuendigungsschutzSonstig', val)}
      />
    </div>
  );
}
