'use client';

import type { StepProps, PartyType } from '../types';
import { useLanguage } from '../LanguageContext';
import AddressAutocomplete from '@/components/mandantenaufnahme/AddressAutocomplete';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function Step1Persoenlich({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();
  const isFirma = data.mandantTyp === 'unternehmen';

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step1.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step1.description}
      </p>

      {/* Typ-Selector (Privatperson / Unternehmen) */}
      <fieldset>
        <legend className="block text-[0.84rem] font-semibold text-ink mb-2">
          {t.step1.typFrage} <span className="text-gold-dark ml-0.5">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {(['privat', 'unternehmen'] as PartyType[]).filter(Boolean).map((typ) => {
            const active = data.mandantTyp === typ;
            const label = typ === 'privat' ? t.step1.typPrivat : t.step1.typUnternehmen;
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
                  name="mandantTyp"
                  value={typ}
                  checked={active}
                  onChange={() => onChange('mandantTyp', typ)}
                  className="accent-gold-dark"
                />
                <span className="text-[0.9rem] font-medium text-ink">{label}</span>
              </label>
            );
          })}
        </div>
        {errors.mandantTyp && (
          <p className="text-[0.78rem] text-red-500 mt-1">{errors.mandantTyp}</p>
        )}
      </fieldset>

      {/* ── Felder Privatperson ── */}
      {!isFirma && (
        <>
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
        </>
      )}

      {/* ── Felder Unternehmen ── */}
      {isFirma && (
        <>
          <div>
            <label htmlFor="a-firmenname" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step1.firmenname} <span className="text-gold-dark ml-0.5">*</span>
            </label>
            <input
              id="a-firmenname"
              type="text"
              value={data.firmenname}
              onChange={(e) => onChange('firmenname', e.target.value)}
              placeholder={t.step1.placeholderFirmenname}
              className={`${INPUT_CLASS} ${errors.firmenname ? 'border-red-400' : ''}`}
            />
            {errors.firmenname && <p className="text-[0.78rem] text-red-500 mt-1">{errors.firmenname}</p>}
          </div>

          <div>
            <label htmlFor="a-rechtsform" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step1.rechtsform}
            </label>
            <input
              id="a-rechtsform"
              type="text"
              value={data.rechtsform}
              onChange={(e) => onChange('rechtsform', e.target.value)}
              placeholder={t.step1.placeholderRechtsform}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="a-vertretung" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
              {t.step1.vertretungsberechtigt} <span className="text-gold-dark ml-0.5">*</span>
            </label>
            <input
              id="a-vertretung"
              type="text"
              value={data.vertretungsberechtigt}
              onChange={(e) => onChange('vertretungsberechtigt', e.target.value)}
              placeholder={t.step1.placeholderVertretung}
              className={`${INPUT_CLASS} ${errors.vertretungsberechtigt ? 'border-red-400' : ''}`}
            />
            {errors.vertretungsberechtigt && (
              <p className="text-[0.78rem] text-red-500 mt-1">{errors.vertretungsberechtigt}</p>
            )}
          </div>
        </>
      )}

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
