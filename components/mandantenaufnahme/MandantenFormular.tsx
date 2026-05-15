'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

import type { MandantenFormData, FileAttachment, StepErrors } from './types';
import { initialFormData } from './types';
import type { Translations } from './translations';
import { LanguageProvider, useLanguage } from './LanguageContext';
import ProgressBar from './ProgressBar';

import Step1Persoenlich from './steps/Step1Persoenlich';
import Step2Familie from './steps/Step2Familie';
import Step3Arbeit from './steps/Step3Arbeit';
import Step4Kuendigung from './steps/Step4Kuendigung';
import Step5Dokumente from './steps/Step5Dokumente';

import StandAnzeige from '@/components/StandAnzeige';
import { PAGE_DATES } from '@/lib/page-dates';

/* ───── Language Toggle ───── */

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0 border border-gray-300 rounded-md overflow-hidden shadow-sm">
      {(['de', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={`px-3 py-1.5 text-[0.8rem] font-bold border-none cursor-pointer transition-all uppercase tracking-wide ${
            locale === lang
              ? 'bg-gold-dark text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800'
          }`}
        >
          {lang === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
        </button>
      ))}
    </div>
  );
}

/* ───── Validation ───── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step: number, data: MandantenFormData, t: Translations): StepErrors {
  const errors: StepErrors = {};
  const v = t.validation;

  if (step === 1) {
    if (!data.vorname.trim()) errors.vorname = v.vorname;
    if (!data.nachname.trim()) errors.nachname = v.nachname;
    if (!data.geburtsdatum) errors.geburtsdatum = v.geburtsdatum;
    if (!data.strasseHausnummer.trim()) errors.strasseHausnummer = v.strasseHausnummer;
    if (!data.plz.trim()) errors.plz = v.plz;
    if (!data.ort.trim()) errors.ort = v.ort;
    if (!data.handynummer.trim()) errors.handynummer = v.handynummer;
    if (!data.email.trim()) {
      errors.email = v.emailRequired;
    } else if (!EMAIL_RE.test(data.email)) {
      errors.email = v.emailInvalid;
    }
  }

  if (step === 2) {
    if (!data.beziehungsstatus) errors.beziehungsstatus = v.beziehungsstatus;
    if (!data.kinder) errors.kinder = v.kinder;
    if (data.kinder === 'ja' && !data.kinderAnzahl) errors.kinderAnzahl = v.kinderAnzahl;
  }

  if (step === 3) {
    if (!data.arbeitgeberName.trim()) errors.arbeitgeberName = v.arbeitgeberName;
    if (!data.arbeitgeberStrasse.trim()) errors.arbeitgeberStrasse = v.arbeitgeberStrasse;
    if (!data.arbeitgeberPlz.trim()) errors.arbeitgeberPlz = v.arbeitgeberPlz;
    if (!data.arbeitgeberOrt.trim()) errors.arbeitgeberOrt = v.arbeitgeberOrt;
    if (!data.berufsbezeichnung.trim()) errors.berufsbezeichnung = v.berufsbezeichnung;
    if (!data.arbeitsort.trim()) errors.arbeitsort = v.arbeitsort;
    if (!data.bruttomonatslohn.trim()) errors.bruttomonatslohn = v.bruttomonatslohn;
    if (!data.eintrittsdatum) errors.eintrittsdatum = v.eintrittsdatum;
    if (!data.betriebsrat) errors.betriebsrat = v.betriebsrat;
  }

  if (step === 4) {
    if (!data.kuendigungsAnzahl) errors.kuendigungsAnzahl = v.kuendigungsAnzahl;
    const count = data.kuendigungsAnzahl === '3+' ? 3 : data.kuendigungsAnzahl === '2' ? 2 : data.kuendigungsAnzahl === '1' ? 1 : 0;
    for (let i = 0; i < count; i++) {
      if (!data.kuendigungen[i]?.kuendigungsDatum) errors[`kuendigungsDatum_${i}`] = v.kuendigungsDatum;
      if (!data.kuendigungen[i]?.zugangsDatum) errors[`zugangsDatum_${i}`] = v.zugangsDatum;
    }
    if (!data.rechtsschutz) errors.rechtsschutz = v.rechtsschutz;
    if (data.rechtsschutz === 'ja' && !data.versicherungsgesellschaft.trim()) {
      errors.versicherungsgesellschaft = v.versicherungsgesellschaft;
    }
  }

  if (step === 5) {
    if (!data.datenschutz) errors.datenschutz = v.datenschutz;
  }

  return errors;
}

/* ───── Inner Component (needs context) ───── */

function MandantenFormularInner() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<MandantenFormData>(initialFormData);
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [errors, setErrors] = useState<StepErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const onChange = useCallback(
    <K extends keyof MandantenFormData>(field: K, value: MandantenFormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  /* Navigation */
  const goNext = () => {
    const stepErrors = validateStep(step, data, t);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 5));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  /* Submit */
  const handleSubmit = async () => {
    const stepErrors = validateStep(5, data, t);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/mandantenaufnahme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          files: files.map((f) => ({
            name: f.name,
            content: f.content,
            type: f.type,
          })),
          website: honeypot,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setLoading(false);
      alert(t.submitError);
    }
  };

  /* ───── Sidebar ───── */
  const sidebar = (
    <aside className="hidden lg:flex flex-col w-[320px] min-w-[320px] bg-white border-r border-border p-8 min-h-screen">
      <div className="mb-10">
        <LanguageToggle />
      </div>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-4">
          {t.sidebar.heading}
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">{t.sidebar.secureTransfer}</div>
              <div className="text-[0.78rem] text-ink-muted">{t.sidebar.secureTransferSub}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">{t.sidebar.fastProcessing}</div>
              <div className="text-[0.78rem] text-ink-muted">{t.sidebar.fastProcessingSub}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="min-w-[20px] text-gold mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div>
              <div className="text-[0.88rem] font-semibold text-ink">{t.sidebar.dataProtection}</div>
              <div className="text-[0.78rem] text-ink-muted">{t.sidebar.dataProtectionSub}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-3">
          {t.sidebar.helpContact}
        </div>
        <div className="space-y-2">
          <a href="tel:+49622295992400" className="block text-[0.88rem] text-ink no-underline hover:text-gold transition-colors">
            +49 6222 9599 2400
          </a>
          <a href="mailto:bektas@apos.legal" className="block text-[0.88rem] text-ink no-underline hover:text-gold transition-colors">
            bektas@apos.legal
          </a>
        </div>
      </div>

      <div className="mb-8 py-4 px-4 bg-cream rounded-sm border border-border">
        <p className="text-[0.75rem] text-ink-muted leading-relaxed m-0">
          <strong>{t.sidebar.noticeLabel}</strong> {t.sidebar.notice}
        </p>
      </div>

      <div className="mt-auto">
        <StandAnzeige modifiedAt={PAGE_DATES.mandantenaufnahme} />
        <div className="flex items-center gap-1 text-gold text-[1rem] mt-3">
          {'★★★★★'}
        </div>
        <div className="text-[0.82rem] text-ink-muted mt-1">
          5,0 &middot; 68 {t.sidebar.reviews}
        </div>
      </div>
    </aside>
  );

  /* ───── Thank You ───── */
  if (submitted) {
    return (
      <div className="flex min-h-screen bg-cream pt-[72px]">
        {sidebar}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-[520px] text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="#A68B4B" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-serif text-[1.8rem] font-bold text-ink mb-3">
              {t.thankYou.heading}
            </h1>
            <p className="text-[1rem] text-ink-muted leading-relaxed mb-6">
              {t.thankYou.message}
            </p>
            <div className="py-4 px-5 bg-amber-50 rounded-sm border border-amber-300 mb-6">
              <p className="text-[0.82rem] text-amber-900 leading-relaxed m-0">
                <strong>{t.thankYou.warningLabel}</strong> {t.thankYou.warningText}
              </p>
            </div>
            <a
              href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3.5 px-8 bg-gold-dark text-white rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#635428] hover:-translate-y-px"
            >
              {t.thankYou.bookCall} &rarr;
            </a>
            <div className="mt-4">
              <Link href="/" className="text-[0.88rem] text-ink-muted no-underline hover:text-gold transition-colors">
                {t.thankYou.backHome}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── Step Content ───── */
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Persoenlich data={data} onChange={onChange} errors={errors} />;
      case 2:
        return <Step2Familie data={data} onChange={onChange} errors={errors} />;
      case 3:
        return <Step3Arbeit data={data} onChange={onChange} errors={errors} />;
      case 4:
        return <Step4Kuendigung data={data} onChange={onChange} errors={errors} />;
      case 5:
        return (
          <Step5Dokumente
            files={files}
            onFilesChange={setFiles}
            datenschutz={data.datenschutz}
            onDatenschutzChange={(val) => onChange('datenschutz', val)}
            errors={errors}
            loading={loading}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  /* ───── Render ───── */
  return (
    <div className="flex min-h-screen bg-cream pt-[72px]">
      {sidebar}

      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between py-4 px-6 bg-white border-b border-border">
          <LanguageToggle />
          <a href="tel:+49622295992400" className="text-[0.82rem] font-semibold text-gold-dark no-underline">
            +49 6222 9599 2400
          </a>
        </div>

        {/* Content area */}
        <div className="flex-1 flex items-start justify-center px-6 py-10">
          <div className="w-full max-w-[640px]">
            <h1 className="sr-only">Mandantenaufnahme — APOS Legal</h1>

            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            <ProgressBar currentStep={step} />

            {renderStep()}

            {/* Navigation Buttons (not shown on step 5 — it has its own submit) */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-8 gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                  >
                    &larr; {t.nav.back}
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={goNext}
                  className="py-3 px-8 bg-gold text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  {t.nav.next} &rarr;
                </button>
              </div>
            )}

            {/* Back button on step 5 */}
            {step === 5 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-none border-none text-[0.88rem] text-ink-muted cursor-pointer font-sans hover:text-ink transition-colors p-0"
                >
                  &larr; {t.nav.back}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Exported Component with Provider ───── */

export default function MandantenFormular() {
  return (
    <LanguageProvider>
      <MandantenFormularInner />
    </LanguageProvider>
  );
}
