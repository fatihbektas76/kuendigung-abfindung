'use client';

import type { StepErrors, FileAttachment } from '../types';
import { useLanguage } from '../LanguageContext';
import FileUpload from '@/components/mandantenaufnahme/FileUpload';

interface Step6Props {
  files: FileAttachment[];
  onFilesChange: (files: FileAttachment[]) => void;
  datenschutz: boolean;
  onDatenschutzChange: (value: boolean) => void;
  errors: StepErrors;
  loading: boolean;
  onSubmit: () => void;
}

export default function Step6Dokumente({
  files,
  onFilesChange,
  datenschutz,
  onDatenschutzChange,
  errors,
  loading,
  onSubmit,
}: Step6Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-[clamp(1.3rem,3vw,1.6rem)] font-bold text-ink mb-2">
        {t.step6.heading}
      </h2>
      <p className="text-[0.88rem] text-ink-muted mb-4">
        {t.step6.description}
      </p>

      {/* File Upload */}
      <FileUpload files={files} onFilesChange={onFilesChange} maxTotalSizeMB={10} />

      {/* Disclaimer */}
      <div className="py-4 px-5 bg-amber-50 border border-amber-200 rounded-sm">
        <div className="flex gap-3">
          <svg className="min-w-[20px] text-amber-600 mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[0.82rem] text-amber-800 m-0 leading-relaxed">
            <strong>{t.step6.warningLabel}</strong> {t.step6.warningText}
          </p>
        </div>
      </div>

      {/* Datenschutz */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={datenschutz}
            onChange={(e) => onDatenschutzChange(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-gold min-w-[20px]"
          />
          <span className="text-[0.85rem] text-ink leading-relaxed">
            {t.step6.datenschutzPre}{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline">
              {t.step6.datenschutzLink}
            </a>{' '}
            {t.step6.datenschutzPost}
            <span className="text-gold-dark ml-0.5">*</span>
          </span>
        </label>
        {errors.datenschutz && <p className="text-[0.78rem] text-red-500 mt-1 ml-8">{errors.datenschutz}</p>}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-4 bg-gold text-white border-none rounded-sm font-sans text-[1.05rem] font-semibold cursor-pointer transition-all hover:bg-gold-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            {t.step6.submitting}
          </span>
        ) : (
          <>{t.step6.submitButton} &rarr;</>
        )}
      </button>

      <p className="text-[0.76rem] text-ink-muted text-center leading-relaxed">
        {t.step6.submitHint}
      </p>
    </div>
  );
}
