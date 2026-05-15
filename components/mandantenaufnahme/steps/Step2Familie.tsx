'use client';

import type { StepProps } from '../types';
import { BEZIEHUNGSSTATUS_OPTIONEN } from '../types';

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

export default function Step2Familie({ data, onChange, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        Familienstatus
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        Diese Angaben sind für die Berechnung der Abfindung und Sozialauswahl relevant.
      </p>

      {/* Beziehungsstatus */}
      <div>
        <label htmlFor="beziehungsstatus" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          Beziehungsstatus <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <select
          id="beziehungsstatus"
          value={data.beziehungsstatus}
          onChange={(e) => onChange('beziehungsstatus', e.target.value)}
          className={`form-select ${INPUT_CLASS} ${errors.beziehungsstatus ? 'border-red-400' : ''}`}
        >
          <option value="" disabled>Bitte wählen</option>
          {BEZIEHUNGSSTATUS_OPTIONEN.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.beziehungsstatus && <p className="text-[0.78rem] text-red-500 mt-1">{errors.beziehungsstatus}</p>}
      </div>

      {/* Kinder */}
      <div>
        <label className="block text-[0.84rem] font-semibold text-ink mb-2">
          Haben Sie Kinder? <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <RadioOption
            label="Ja"
            selected={data.kinder === 'ja'}
            onClick={() => onChange('kinder', 'ja')}
          />
          <RadioOption
            label="Nein"
            selected={data.kinder === 'nein'}
            onClick={() => onChange('kinder', 'nein')}
          />
        </div>
        {errors.kinder && <p className="text-[0.78rem] text-red-500 mt-1">{errors.kinder}</p>}
      </div>

      {/* Conditional: Kinder details */}
      {data.kinder === 'ja' && (
        <div className="space-y-4 pl-0 border-l-[3px] border-gold/20 ml-0 p-4 bg-cream/50 rounded-sm">
          <div>
            <label htmlFor="kinderAnzahl" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              Wie viele Kinder? <span className="text-gold-dark ml-0.5">*</span>
            </label>
            <input
              id="kinderAnzahl"
              type="number"
              min="1"
              max="20"
              value={data.kinderAnzahl}
              onChange={(e) => onChange('kinderAnzahl', e.target.value)}
              placeholder="2"
              className={`${INPUT_CLASS} max-w-[120px] ${errors.kinderAnzahl ? 'border-red-400' : ''}`}
            />
            {errors.kinderAnzahl && <p className="text-[0.78rem] text-red-500 mt-1">{errors.kinderAnzahl}</p>}
          </div>
          <div>
            <label htmlFor="kinderAlter" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              Alter der Kinder
            </label>
            <input
              id="kinderAlter"
              type="text"
              value={data.kinderAlter}
              onChange={(e) => onChange('kinderAlter', e.target.value)}
              placeholder="z.B. 3, 7, 12"
              className={INPUT_CLASS}
            />
            <p className="text-[0.76rem] text-ink-muted mt-1">Kommagetrennt, z.B. &quot;3, 7, 12&quot;</p>
          </div>
        </div>
      )}
    </div>
  );
}
