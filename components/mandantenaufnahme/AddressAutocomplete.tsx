'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

interface AddressAutocompleteProps {
  label: string;
  strasseValue: string;
  plzValue: string;
  ortValue: string;
  onAddressChange: (fields: { strasse: string; plz: string; ort: string }) => void;
  required?: boolean;
  id: string;
  errors?: { strasse?: string; plz?: string; ort?: string };
}

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

const ERROR_CLASS = 'text-[0.78rem] text-red-500 mt-1';

export interface GoogleAutocompleteInstance {
  addListener: (event: string, cb: () => void) => void;
  getPlace: () => {
    name?: string;
    address_components?: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  };
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => GoogleAutocompleteInstance;
        };
      };
    };
    __googleMapsLoading?: boolean;
  }
}

export function loadGoogleMaps(): Promise<boolean> {
  if (window.google?.maps?.places) return Promise.resolve(true);

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.resolve(false);

  if (window.__googleMapsLoading) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(check);
          resolve(true);
        }
      }, 200);
      setTimeout(() => { clearInterval(check); resolve(false); }, 10000);
    });
  }

  window.__googleMapsLoading = true;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export default function AddressAutocomplete({
  label,
  strasseValue,
  plzValue,
  ortValue,
  onAddressChange,
  required,
  id,
  errors,
}: AddressAutocompleteProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const autocompleteRef = useRef<GoogleAutocompleteInstance | null>(null);

  const handlePlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place.address_components) return;

    let street = '';
    let number = '';
    let plz = '';
    let ort = '';

    for (const comp of place.address_components) {
      if (comp.types.includes('route')) street = comp.long_name;
      if (comp.types.includes('street_number')) number = comp.long_name;
      if (comp.types.includes('postal_code')) plz = comp.long_name;
      if (comp.types.includes('locality')) ort = comp.long_name;
      if (!ort && comp.types.includes('sublocality_level_1')) ort = comp.long_name;
    }

    onAddressChange({
      strasse: number ? `${street} ${number}` : street,
      plz,
      ort,
    });
  }, [onAddressChange]);

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
      fields: ['address_components'],
      types: ['address'],
    });

    ac.addListener('place_changed', handlePlaceChanged);
    autocompleteRef.current = ac;
  }, [apiLoaded, handlePlaceChanged]);

  const labelEl = (text: string, htmlFor: string, isRequired?: boolean) => (
    <label htmlFor={htmlFor} className="block text-[0.84rem] font-semibold text-ink mb-1.5">
      {text} {isRequired && <span className="text-gold-dark ml-0.5">*</span>}
    </label>
  );

  // Autocomplete mode: single input that fills all fields
  if (apiLoaded && !manualMode) {
    return (
      <div>
        {labelEl(label, id, required)}
        <input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={t.address.enterAddress}
          className={INPUT_CLASS}
          defaultValue={strasseValue ? `${strasseValue}, ${plzValue} ${ortValue}` : ''}
        />
        {(strasseValue || plzValue || ortValue) && (
          <div className="mt-2 text-[0.82rem] text-ink-muted">
            {strasseValue && <span>{strasseValue}, </span>}
            {plzValue && <span>{plzValue} </span>}
            {ortValue && <span>{ortValue}</span>}
          </div>
        )}
        <button
          type="button"
          onClick={() => setManualMode(true)}
          className="text-[0.78rem] text-gold-dark mt-1 underline cursor-pointer bg-transparent border-none p-0"
        >
          {t.address.manualEntry}
        </button>
        {errors?.strasse && <p className={ERROR_CLASS}>{errors.strasse}</p>}
      </div>
    );
  }

  // Manual mode: 3 separate fields
  return (
    <div className="space-y-3">
      <div>
        {labelEl(t.address.strasse, `${id}-strasse`, required)}
        <input
          id={`${id}-strasse`}
          type="text"
          value={strasseValue}
          onChange={(e) => onAddressChange({ strasse: e.target.value, plz: plzValue, ort: ortValue })}
          placeholder={t.address.placeholderStrasse}
          className={`${INPUT_CLASS} ${errors?.strasse ? 'border-red-400' : ''}`}
        />
        {errors?.strasse && <p className={ERROR_CLASS}>{errors.strasse}</p>}
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-3 max-md:grid-cols-1">
        <div>
          {labelEl(t.address.plz, `${id}-plz`, required)}
          <input
            id={`${id}-plz`}
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={plzValue}
            onChange={(e) => onAddressChange({ strasse: strasseValue, plz: e.target.value.replace(/\D/g, ''), ort: ortValue })}
            placeholder={t.address.placeholderPlz}
            className={`${INPUT_CLASS} ${errors?.plz ? 'border-red-400' : ''}`}
          />
          {errors?.plz && <p className={ERROR_CLASS}>{errors.plz}</p>}
        </div>
        <div>
          {labelEl(t.address.ort, `${id}-ort`, required)}
          <input
            id={`${id}-ort`}
            type="text"
            value={ortValue}
            onChange={(e) => onAddressChange({ strasse: strasseValue, plz: plzValue, ort: e.target.value })}
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
          {t.address.useAutocomplete}
        </button>
      )}
    </div>
  );
}
