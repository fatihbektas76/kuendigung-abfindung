'use client';

import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';
import AddressAutocomplete from '@/components/mandantenaufnahme/AddressAutocomplete';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step1Persoenlich({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step1.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step1.description}
      </p>

      {/* Vorname / Nachname */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div>
          <label htmlFor="a-vorname" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step1.vorname} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="a-vorname"
            type="text"
            value={data.vorname}
            onChange={(e) => onChange('vorname', e.target.value)}
            placeholder={t.step1.placeholderVorname}
            className={`${INPUT_CLASS} ${errors.vorname ? 'border-red-400' : ''}`}
          />
          {errors.vorname && <p className="text-[0.78rem] text-red-500 mt-1">{errors.vorname}</p>}
        </div>
        <div>
          <label htmlFor="a-nachname" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step1.nachname} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="a-nachname"
            type="text"
            value={data.nachname}
            onChange={(e) => onChange('nachname', e.target.value)}
            placeholder={t.step1.placeholderNachname}
            className={`${INPUT_CLASS} ${errors.nachname ? 'border-red-400' : ''}`}
          />
          {errors.nachname && <p className="text-[0.78rem] text-red-500 mt-1">{errors.nachname}</p>}
        </div>
      </div>

      {/* Geburtsdatum */}
      <div>
        <label htmlFor="a-geburtsdatum" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.geburtsdatum} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="a-geburtsdatum"
          type="date"
          value={data.geburtsdatum}
          onChange={(e) => onChange('geburtsdatum', e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
          className={`${INPUT_CLASS} ${errors.geburtsdatum ? 'border-red-400' : ''}`}
        />
        {errors.geburtsdatum && <p className="text-[0.78rem] text-red-500 mt-1">{errors.geburtsdatum}</p>}
      </div>

      {/* Adresse */}
      <AddressAutocomplete
        label={t.step1.adresse}
        id="allgemein-adresse"
        strasseValue={data.strasseHausnummer}
        plzValue={data.plz}
        ortValue={data.ort}
        onAddressChange={({ strasse, plz, ort }) => {
          onChange('strasseHausnummer', strasse);
          onChange('plz', plz);
          onChange('ort', ort);
        }}
        required
        errors={{
          strasse: errors.strasseHausnummer,
          plz: errors.plz,
          ort: errors.ort,
        }}
      />

      {/* Handynummer */}
      <div>
        <label htmlFor="a-handynummer" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.handynummer} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="a-handynummer"
          type="tel"
          value={data.handynummer}
          onChange={(e) => onChange('handynummer', e.target.value)}
          placeholder={t.step1.placeholderPhone}
          className={`${INPUT_CLASS} ${errors.handynummer ? 'border-red-400' : ''}`}
        />
        {errors.handynummer && <p className="text-[0.78rem] text-red-500 mt-1">{errors.handynummer}</p>}
      </div>

      {/* E-Mail */}
      <div>
        <label htmlFor="a-email" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.email} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="a-email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder={t.step1.placeholderEmail}
          className={`${INPUT_CLASS} ${errors.email ? 'border-red-400' : ''}`}
        />
        {errors.email && <p className="text-[0.78rem] text-red-500 mt-1">{errors.email}</p>}
      </div>
    </div>
  );
}
