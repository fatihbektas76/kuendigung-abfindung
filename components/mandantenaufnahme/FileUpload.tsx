'use client';

import { useState, useRef, useCallback } from 'react';
import type { FileAttachment } from './types';

interface FileUploadProps {
  files: FileAttachment[];
  onFilesChange: (files: FileAttachment[]) => void;
  maxTotalSizeMB?: number;
}

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.heic,.heif,.pdf,.doc,.docx';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function FileUpload({
  files,
  onFilesChange,
  maxTotalSizeMB = 10,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const maxBytes = maxTotalSizeMB * 1024 * 1024;

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError('');
      setProcessing(true);

      const newFiles: FileAttachment[] = [];
      let runningTotal = totalSize;

      for (const file of Array.from(fileList)) {
        // Type check
        if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(heic|heif)$/i)) {
          setError(`"${file.name}" hat einen nicht unterstützten Dateityp.`);
          continue;
        }

        // Size check
        if (runningTotal + file.size > maxBytes) {
          setError(`Maximale Gesamtgröße von ${maxTotalSizeMB} MB überschritten.`);
          break;
        }

        // Duplicate check
        if (files.some((f) => f.name === file.name && f.size === file.size)) {
          continue;
        }

        const content = await readFileAsBase64(file);
        newFiles.push({ name: file.name, content, size: file.size, type: file.type });
        runningTotal += file.size;
      }

      if (newFiles.length > 0) {
        onFilesChange([...files, ...newFiles]);
      }

      setProcessing(false);
    },
    [files, onFilesChange, totalSize, maxBytes, maxTotalSizeMB]
  );

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
    setError('');
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }

  return (
    <div>
      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
        Dokumente hochladen
      </label>
      <p className="text-[0.82rem] text-ink-muted mb-3">
        Laden Sie relevante Dokumente hoch: Kündigungsschreiben, Arbeitsvertrag, Gehaltsabrechnungen etc.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-sm p-8 text-center transition-all ${
          dragOver
            ? 'border-gold bg-gold-bg'
            : 'border-border hover:border-gold/50'
        }`}
      >
        <svg className="mx-auto mb-3 text-ink-muted" width="40" height="40" fill="none" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[0.88rem] text-ink-muted mb-3">
          {processing ? 'Wird verarbeitet...' : 'Dateien hierher ziehen'}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={processing}
            className="py-2.5 px-5 border-2 border-gold text-gold-dark font-semibold text-[0.85rem] rounded-sm cursor-pointer transition-all bg-white hover:bg-gold-bg disabled:opacity-50"
          >
            Datei auswählen
          </button>
          {/* Camera button — shown on all devices, only functional on mobile */}
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={processing}
            className="py-2.5 px-5 border-2 border-border text-ink-light font-semibold text-[0.85rem] rounded-sm cursor-pointer transition-all bg-white hover:border-gold/50 disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Foto aufnehmen
            </span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={(e) => e.target.files && processFiles(e.target.files)}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Size indicator */}
      <div className="flex items-center justify-between mt-2 text-[0.76rem] text-ink-muted">
        <span>JPG, PNG, HEIC, PDF, DOC, DOCX</span>
        <span>
          {formatSize(totalSize)} / {maxTotalSizeMB} MB
        </span>
      </div>

      {/* Progress bar for total size */}
      {totalSize > 0 && (
        <div className="h-1 bg-border rounded-full overflow-hidden mt-1">
          <div
            className={`h-full rounded-full transition-all ${
              totalSize / maxBytes > 0.9 ? 'bg-red-400' : 'bg-gold'
            }`}
            style={{ width: `${Math.min((totalSize / maxBytes) * 100, 100)}%` }}
          />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-[0.78rem] text-red-500 mt-2">{error}</p>}

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between py-2 px-3 bg-cream rounded-sm border border-border-light"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg className="min-w-[16px] text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2v6h6M16 13H8M16 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[0.82rem] text-ink truncate">{file.name}</span>
                <span className="text-[0.72rem] text-ink-muted whitespace-nowrap">({formatSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-ink-muted hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-1"
                aria-label={`${file.name} entfernen`}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
