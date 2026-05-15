'use client';

import { useState, useRef, useEffect } from 'react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string;
  required?: boolean;
  error?: string;
}

const INPUT_CLASS =
  'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted';

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Suchen oder auswählen...',
  label,
  id,
  required,
  error,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customMode, setCustomMode] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightIdx(-1);
  }, [search]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const total = filtered.length + 1; // +1 for "Sonstige"
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((prev) => (prev + 1) % total);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((prev) => (prev - 1 + total) % total);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < filtered.length) {
        selectOption(filtered[highlightIdx]);
      } else if (highlightIdx === filtered.length) {
        setCustomMode(true);
        setIsOpen(false);
        setSearch('');
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  function selectOption(opt: string) {
    onChange(opt);
    setSearch('');
    setIsOpen(false);
    setCustomMode(false);
  }

  if (customMode) {
    return (
      <div>
        <label htmlFor={id} className="block text-[0.84rem] font-semibold text-ink mb-1.5">
          {label} {required && <span className="text-gold-dark ml-0.5">*</span>}
        </label>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Name der Versicherung eingeben"
          className={`${INPUT_CLASS} ${error ? 'border-red-400' : ''}`}
        />
        <button
          type="button"
          onClick={() => { setCustomMode(false); onChange(''); }}
          className="text-[0.78rem] text-gold-dark mt-1 underline cursor-pointer bg-transparent border-none p-0"
        >
          Aus Liste wählen
        </button>
        {error && <p className="text-[0.78rem] text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="block text-[0.84rem] font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-gold-dark ml-0.5">*</span>}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={isOpen ? search : value}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={value || placeholder}
          className={`${INPUT_CLASS} pr-10 ${error ? 'border-red-400' : ''}`}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => { setIsOpen(!isOpen); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted bg-transparent border-none cursor-pointer p-0"
          tabIndex={-1}
          aria-label="Dropdown öffnen"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-border rounded-sm shadow-lg max-h-[240px] overflow-y-auto">
          {filtered.map((opt, i) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => selectOption(opt)}
                className={`w-full text-left px-4 py-2.5 text-[0.88rem] font-sans cursor-pointer transition-colors border-none ${
                  i === highlightIdx
                    ? 'bg-gold-bg text-gold-dark'
                    : 'bg-white text-ink hover:bg-cream'
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => { setCustomMode(true); setIsOpen(false); setSearch(''); }}
              className={`w-full text-left px-4 py-2.5 text-[0.88rem] font-sans cursor-pointer transition-colors border-none border-t border-border ${
                highlightIdx === filtered.length
                  ? 'bg-gold-bg text-gold-dark'
                  : 'bg-white text-gold-dark hover:bg-cream'
              }`}
            >
              Sonstige eingeben...
            </button>
          </li>
        </ul>
      )}

      {error && <p className="text-[0.78rem] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
