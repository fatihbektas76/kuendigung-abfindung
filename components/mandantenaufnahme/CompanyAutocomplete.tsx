'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { loadGoogleMaps } from './AddressAutocomplete';
import type { GoogleAutocompleteInstance } from './AddressAutocomplete';
import { useLanguage } from './LanguageContext';

interface CompanyAutocompleteProps {
  nameValue: string;
  strasseValue: string;
  plzValue: string;
  ortValue: string;
  onCompanyChange: (fields: { name: string; strasse: string; plz: string; ort: string }) => void;
  required?: boolean;
  errors?: { name?: string; strasse?: string; plz?: string; ort?: string };
}

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

const ERROR_CLASS = 'text-[0.78rem] text-red-500 mt-1';

export default function CompanyAutocomplete({
  nameValue,
  strasseValue,
  plzValue,
  ortValue,
  onCompanyChange,
  required,
  errors,
}: CompanyAutocompleteProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const autocompleteRef = useRef<GoogleAutocompleteInstance | null>(null);

  const handlePlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();

    const companyName = place.name || '';
    let street = '';
    let number = '';
    let plz = '';
    let ort = '';

    if (place.address_components) {
      for (const comp of place.address_components) {
        if (comp.types.includes('route')) street = comp.long_name;
        if (comp.types.includes('street_number')) number = comp.long_name;
        if (comp.types.includes('postal_code')) plz = comp.long_name;
        if (comp.types.includes('locality')) ort = comp.long_name;
        if (!ort && comp.types.includes('sublocality_level_1')) ort = comp.long_name;
      }
    }

    onCompanyChange({
      name: companyName,
      strasse: number ? `${street} ${number}` : street,
      plz,
      ort,
    });
  }, [onCompanyChange]);

  useEffect(() => {
    let mounted = true;
    loadGoogleMaps().then((loaded) => {
      if (!mounted) return;
      if (loaded) {
        setApiLoaded(true);
      } else {
        setManualMode(true);
      }
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!apiLoaded || !inputRef.current || autocompleteRef.current) return;

    const ac = new window.google!.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'de' },
      fields: ['name', 'address_components'],
      types: ['establishment'],
    });

    ac.addListener('place_changed', handlePlaceChanged);
    autocompleteRef.current = ac;
  }, [apiLoaded, handlePlaceChanged]);

  const labelEl = (text: string, htmlFor: string, isRequired?: boolean) => (
    <label htmlFor={htmlFor} className="block text-[0.84rem] font-semibold text-ink mb-1.5">
      {text} {isRequired && <span className="text-gold-dark ml-0.5">*</span>}
    </label>
  );

  // Autocomplete mode
  if (apiLoaded && !manualMode) {
    return (
      <div className="space-y-3">
        <div>
          {labelEl(t.company.label, 'arbeitgeberName', required)}
          <input
            ref={inputRef}
            id="arbeitgeberName"
            type="text"
            placeholder={t.company.searchPlaceholder}
            className={`${INPUT_CLASS} ${errors?.name ? 'border-red-400' : ''}`}
            defaultValue={nameValue}
          />
          {errors?.name && <p className={ERROR_CLASS}>{errors.name}</p>}
        </div>

        {(nameValue || strasseValue || plzValue || ortValue) && (
          <div className="py-3 px-4 bg-cream/50 border-l-[3px] border-gold/20 rounded-sm">
            <div className="text-[0.82rem] text-ink">
              {nameValue && <div className="font-semibold">{nameValue}</div>}
              {strasseValue && <div className="text-ink-muted">{strasseValue}</div>}
              {(plzValue || ortValue) && <div className="text-ink-muted">{plzValue} {ortValue}</div>}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setManualMode(true)}
          className="text-[0.78rem] text-gold-dark underline cursor-pointer bg-transparent border-none p-0"
        >
          {t.company.manualEntry}
        </button>
      </div>
    );
  }

  // Manual mode
  return (
    <div className="space-y-3">
      <div>
        {labelEl(t.company.label, 'arbeitgeberName', required)}
        <input
          id="arbeitgeberName"
          type="text"
          value={nameValue}
          onChange={(e) => onCompanyChange({ name: e.target.value, strasse: strasseValue, plz: plzValue, ort: ortValue })}
          placeholder={t.company.placeholderName}
          className={`${INPUT_CLASS} ${errors?.name ? 'border-red-400' : ''}`}
        />
        {errors?.name && <p className={ERROR_CLASS}>{errors.name}</p>}
      </div>
      <div>
        {labelEl(t.address.strasse, 'ag-strasse', required)}
        <input
          id="ag-strasse"
          type="text"
          value={strasseValue}
          onChange={(e) => onCompanyChange({ name: nameValue, strasse: e.target.value, plz: plzValue, ort: ortValue })}
          placeholder={t.address.placeholderStrasse}
          className={`${INPUT_CLASS} ${errors?.strasse ? 'border-red-400' : ''}`}
        />
        {errors?.strasse && <p className={ERROR_CLASS}>{errors.strasse}</p>}
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-3 max-md:grid-cols-1">
        <div>
          {labelEl(t.address.plz, 'ag-plz', required)}
          <input
            id="ag-plz"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={plzValue}
            onChange={(e) => onCompanyChange({ name: nameValue, strasse: strasseValue, plz: e.target.value.replace(/\D/g, ''), ort: ortValue })}
            placeholder={t.address.placeholderPlz}
            className={`${INPUT_CLASS} ${errors?.plz ? 'border-red-400' : ''}`}
          />
          {errors?.plz && <p className={ERROR_CLASS}>{errors.plz}</p>}
        </div>
        <div>
          {labelEl(t.address.ort, 'ag-ort', required)}
          <input
            id="ag-ort"
            type="text"
            value={ortValue}
            onChange={(e) => onCompanyChange({ name: nameValue, strasse: strasseValue, plz: plzValue, ort: e.target.value })}
            placeholder={t.address.placeholderOrt}
            className={`${INPUT_CLASS} ${errors?.ort ? 'border-red-400' : ''}`}
          />
          {errors?.ort && <p className={ERROR_CLASS}>{errors.ort}</p>}
        </div>
      </div>
      {apiLoaded && (
        <button
          type="button"
          onClick={() => setManualMode(false)}
          className="text-[0.78rem] text-gold-dark underline cursor-pointer bg-transparent border-none p-0"
        >
          {t.company.searchCompany}
        </button>
      )}
    </div>
  );
}
