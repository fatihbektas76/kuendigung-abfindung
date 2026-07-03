'use client';

import { useState, useCallback } from 'react';
import type { StepProps } from '../types';
import { useLanguage } from '../LanguageContext';
import AddressAutocomplete from '../AddressAutocomplete';
import { suggestEmail } from '@/lib/email-suggest';

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

type EmailStatus =
  | { kind: 'idle' }
  | { kind: 'checking' }
  | { kind: 'ok' }
  | { kind: 'invalid-format' }
  | { kind: 'invalid-domain' }
  | { kind: 'disposable' }
  | { kind: 'unknown-warn' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Step1Persoenlich({ data, onChange, errors }: StepProps) {
  const { t } = useLanguage();
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>({ kind: 'idle' });

  const runCheck = useCallback(async (email: string) => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailStatus({ kind: 'idle' });
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setEmailStatus({ kind: 'invalid-format' });
      return;
    }
    setEmailStatus({ kind: 'checking' });
    try {
      const res = await fetch('/api/email-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const body = await res.json();
      if (body?.ok === true) {
        setEmailStatus({ kind: 'ok' });
      } else if (body?.ok === 'unknown') {
        setEmailStatus({ kind: 'unknown-warn' });
      } else if (body?.reason === 'disposable') {
        setEmailStatus({ kind: 'disposable' });
      } else if (body?.reason === 'no-mx') {
        setEmailStatus({ kind: 'invalid-domain' });
      } else {
        setEmailStatus({ kind: 'invalid-format' });
      }
    } catch {
      setEmailStatus({ kind: 'unknown-warn' });
    }
  }, []);

  const handleEmailBlur = () => {
    const suggestion = suggestEmail(data.email);
    setEmailSuggestion(suggestion && suggestion !== data.email ? suggestion : null);
    runCheck(data.email);
  };

  const applySuggestion = () => {
    if (!emailSuggestion) return;
    onChange('email', emailSuggestion);
    setEmailSuggestion(null);
    runCheck(emailSuggestion);
  };

  const showStatusBlock = emailStatus.kind !== 'idle' && data.email.trim().length > 0;

  const statusStyles = (() => {
    switch (emailStatus.kind) {
      case 'ok':
        return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500' };
      case 'checking':
        return { bg: 'bg-neutral-50', border: 'border-neutral-200', text: 'text-neutral-700', dot: 'bg-neutral-400' };
      case 'unknown-warn':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500' };
      default:
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', dot: 'bg-red-500' };
    }
  })();

  const statusMessage = (() => {
    switch (emailStatus.kind) {
      case 'ok':
        return t.step1.emailValid;
      case 'checking':
        return t.step1.emailChecking;
      case 'invalid-format':
        return t.step1.emailInvalidFormat;
      case 'invalid-domain':
        return t.step1.emailInvalidDomain;
      case 'disposable':
        return t.step1.emailDisposable;
      case 'unknown-warn':
        return t.step1.emailUnknownWarn;
      default:
        return '';
    }
  })();

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
          <label htmlFor="vorname" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step1.vorname} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="vorname"
            type="text"
            value={data.vorname}
            onChange={(e) => onChange('vorname', e.target.value)}
            placeholder={t.step1.placeholderVorname}
            className={`${INPUT_CLASS} ${errors.vorname ? 'border-red-400' : ''}`}
          />
          {errors.vorname && <p className="text-[0.78rem] text-red-500 mt-1">{errors.vorname}</p>}
        </div>
        <div>
          <label htmlFor="nachname" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
            {t.step1.nachname} <span className="text-gold-dark ml-0.5">*</span>
          </label>
          <input
            id="nachname"
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
        <label htmlFor="geburtsdatum" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.geburtsdatum} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="geburtsdatum"
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
        id="mandant-adresse"
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
        <label htmlFor="handynummer" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.handynummer} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="handynummer"
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
        <label htmlFor="email" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {t.step1.email} <span className="text-gold-dark ml-0.5">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={data.email}
          onChange={(e) => {
            onChange('email', e.target.value);
            if (emailSuggestion) setEmailSuggestion(null);
            if (emailStatus.kind !== 'idle') setEmailStatus({ kind: 'idle' });
          }}
          onBlur={handleEmailBlur}
          placeholder={t.step1.placeholderEmail}
          className={`${INPUT_CLASS} ${errors.email ? 'border-red-400' : ''}`}
        />
        {errors.email && <p className="text-[0.78rem] text-red-500 mt-1">{errors.email}</p>}
        {!errors.email && emailSuggestion && (
          <p className="text-[0.8rem] text-gold-dark mt-1.5">
            {t.step1.didYouMean}{' '}
            <button
              type="button"
              onClick={applySuggestion}
              className="font-semibold underline underline-offset-2 hover:text-ink transition-colors"
            >
              {emailSuggestion}
            </button>
            {'?'}
          </p>
        )}
        <p className="text-[0.76rem] text-ink-muted mt-1.5">{t.step1.emailHint}</p>

        {/* Status-Block — erscheint erst nach der ersten Eingabe/Blur */}
        {showStatusBlock && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-2 py-2 px-3 border ${statusStyles.border} ${statusStyles.bg} rounded-sm flex items-center gap-2`}
          >
            {emailStatus.kind === 'checking' ? (
              <svg
                className={`animate-spin h-4 w-4 ${statusStyles.text}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
            ) : (
              <span className={`w-2 h-2 rounded-full ${statusStyles.dot}`} aria-hidden="true" />
            )}
            <span className={`text-[0.82rem] ${statusStyles.text}`}>{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
