'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface MultiSelectProps {
  options: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  id: string;
  error?: string;
  sonstigValue?: string;
  onSonstigChange?: (value: string) => void;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  label,
  id,
  error,
  sonstigValue,
  onSonstigChange,
}: MultiSelectProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleOption(value: string) {
    if (value === 'keiner') {
      onChange(selected.includes('keiner') ? [] : ['keiner']);
      return;
    }

    const without = selected.filter((s) => s !== 'keiner');
    if (without.includes(value)) {
      onChange(without.filter((s) => s !== value));
    } else {
      onChange([...without, value]);
    }
  }

  const displayText = selected.length === 0
    ? t.multiSelect.placeholder
    : selected.map((s) => options.find((o) => o.value === s)?.label ?? s).join(', ');

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="block text-[0.84rem] font-semibold text-ink mb-1.5">
        {label}
      </label>

      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-3 px-4 border rounded-sm font-sans text-[0.92rem] text-left bg-white transition-all outline-none flex items-center justify-between cursor-pointer ${
          error ? 'border-red-400' : isOpen ? 'border-gold shadow-[0_0_0_3px_rgba(166,139,75,0.1)]' : 'border-border'
        }`}
      >
        <span className={selected.length === 0 ? 'text-ink-muted' : 'text-ink truncate'}>
          {displayText}
        </span>
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          className={`min-w-[16px] text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Selected tags */}
      {selected.length > 0 && !selected.includes('keiner') && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((s) => {
            const opt = options.find((o) => o.value === s);
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold-bg border border-gold/20 rounded-sm text-[0.76rem] font-medium text-gold-dark"
              >
                {opt?.label ?? s}
                <button
                  type="button"
                  onClick={() => toggleOption(s)}
                  className="bg-transparent border-none cursor-pointer p-0 text-gold-dark/60 hover:text-gold-dark"
                  aria-label={t.multiSelect.removeLabel.replace('{label}', opt?.label ?? s)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-sm shadow-lg max-h-[280px] overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-cream ${
                selected.includes(opt.value) ? 'bg-gold-bg' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-[0.88rem] font-sans text-ink">{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {selected.includes('sonstig') && onSonstigChange && (
        <input
          type="text"
          value={sonstigValue ?? ''}
          onChange={(e) => onSonstigChange(e.target.value)}
          placeholder={t.multiSelect.sonstigPlaceholder}
          className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted mt-2"
        />
      )}

      {error && <p className="text-[0.78rem] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
