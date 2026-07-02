'use client';

import { useState, useRef, useCallback } from 'react';
import type { FileAttachment } from './types';
import { useLanguage } from './LanguageContext';
import { isProcessableImage, photoToScanPdf } from '@/lib/scan-image';
import { combineJpegsToPdf } from '@/lib/pdf-combine';
import type { Quad } from '@/lib/perspective-transform';
import DeskewModal from './DeskewModal';
import ReorderModal, { type ReorderItem } from './ReorderModal';

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

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function FileUpload({
  files,
  onFilesChange,
  maxTotalSizeMB = 25,
}: FileUploadProps) {
  const { t } = useLanguage();
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Deskew-Queue: alle noch nicht verarbeiteten Bild-Dateien
  const [deskewQueue, setDeskewQueue] = useState<File[]>([]);
  // Reorder-Modal-Sichtbarkeit
  const [showReorder, setShowReorder] = useState(false);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const maxBytes = maxTotalSizeMB * 1024 * 1024;

  const scannableCount = files.filter((f) => f.scanned && f.scanJpeg && f.scanAspect).length;

  const validateAndSplit = useCallback(
    (fileList: FileList | File[]): { images: File[]; others: File[] } => {
      const images: File[] = [];
      const others: File[] = [];
      for (const raw of Array.from(fileList)) {
        if (!ACCEPTED_TYPES.includes(raw.type) && !raw.name.match(/\.(heic|heif)$/i)) {
          setError(t.fileUpload.errorType.replace('{name}', raw.name));
          continue;
        }
        if (files.some((f) => f.name === raw.name && (f.originalSize ?? f.size) === raw.size)) {
          continue;
        }
        if (isProcessableImage(raw)) images.push(raw);
        else others.push(raw);
      }
      return { images, others };
    },
    [files, t],
  );

  /**
   * Nicht-Bild-Dateien direkt in die Liste hängen. Bilder werden über die
   * Deskew-Queue verarbeitet (siehe processImageWithQuad).
   */
  const appendOthers = useCallback(
    async (others: File[]) => {
      const newFiles: FileAttachment[] = [];
      let runningTotal = totalSize;
      for (const raw of others) {
        if (runningTotal + raw.size > maxBytes) {
          setError(t.fileUpload.errorSize.replace('{max}', String(maxTotalSizeMB)));
          break;
        }
        const content = await readFileAsBase64(raw);
        newFiles.push({ name: raw.name, content, size: raw.size, type: raw.type });
        runningTotal += raw.size;
      }
      if (newFiles.length > 0) onFilesChange([...files, ...newFiles]);
    },
    [files, onFilesChange, totalSize, maxBytes, maxTotalSizeMB, t],
  );

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError('');
      const { images, others } = validateAndSplit(fileList);
      if (others.length > 0) {
        setProcessing(true);
        await appendOthers(others);
        setProcessing(false);
      }
      if (images.length > 0) {
        // Deskew-Modal öffnet automatisch, sobald deskewQueue nicht leer ist.
        setDeskewQueue((prev) => [...prev, ...images]);
      }
    },
    [validateAndSplit, appendOthers],
  );

  /**
   * Wird vom DeskewModal aufgerufen — quad=null bedeutet „ohne Entzerrung".
   */
  const processImageWithQuad = useCallback(
    async (raw: File, quad: Quad | null) => {
      setProcessing(true);
      try {
        let attachment: FileAttachment;
        try {
          const result = await photoToScanPdf(raw, { warpQuad: quad ?? undefined });
          if (result.pdf.size >= raw.size && !quad) {
            // Scan-Version wäre größer als Original UND es wurde nicht entzerrt → Original nehmen.
            const content = await readFileAsBase64(raw);
            attachment = { name: raw.name, content, size: raw.size, type: raw.type };
          } else {
            const content = await readFileAsBase64(result.pdf);
            attachment = {
              name: result.pdf.name,
              content,
              size: result.pdf.size,
              type: result.pdf.type,
              scanned: true,
              originalSize: raw.size,
              scanJpeg: result.jpegDataUrl,
              scanAspect: result.aspect,
            };
          }
        } catch {
          // HEIC auf Chrome / OOM → Rohdatei durchlassen
          const content = await readFileAsBase64(raw);
          attachment = { name: raw.name, content, size: raw.size, type: raw.type };
        }

        // Size check erst nach der Konvertierung
        if (totalSize + attachment.size > maxBytes) {
          setError(t.fileUpload.errorSize.replace('{max}', String(maxTotalSizeMB)));
        } else {
          onFilesChange([...files, attachment]);
        }
      } finally {
        setProcessing(false);
        setDeskewQueue((prev) => prev.slice(1));
      }
    },
    [files, onFilesChange, totalSize, maxBytes, maxTotalSizeMB, t],
  );

  const currentDeskewFile = deskewQueue[0] ?? null;

  const handleDeskewConfirm = (quad: Quad | null) => {
    if (currentDeskewFile) processImageWithQuad(currentDeskewFile, quad);
  };

  const handleDeskewCancel = () => {
    // Aktuelles Bild komplett verwerfen und mit dem nächsten weitermachen.
    setDeskewQueue((prev) => prev.slice(1));
  };

  const combineScans = useCallback(
    async (orderedIds: string[]) => {
      setShowReorder(false);
      setProcessing(true);
      try {
        const scans = files.filter((f) => f.scanned && f.scanJpeg && f.scanAspect);
        const ordered = orderedIds
          .map((id) => scans.find((s) => s.name === id))
          .filter((s): s is FileAttachment => Boolean(s));
        if (ordered.length < 2) return;

        const pdfBlob = await combineJpegsToPdf(
          ordered.map((s) => ({ jpegDataUrl: s.scanJpeg!, aspect: s.scanAspect! })),
        );
        const content = await blobToBase64(pdfBlob);
        const combined: FileAttachment = {
          name: t.fileUpload.combineName,
          content,
          size: pdfBlob.size,
          type: 'application/pdf',
          scanned: true,
        };

        // Alle bisherigen Scans entfernen, kombiniertes PDF anhängen
        const remaining = files.filter((f) => !(f.scanned && f.scanJpeg && f.scanAspect));
        // Größen-Check
        const newTotal = remaining.reduce((s, f) => s + f.size, 0) + pdfBlob.size;
        if (newTotal > maxBytes) {
          setError(t.fileUpload.errorSize.replace('{max}', String(maxTotalSizeMB)));
          return;
        }
        onFilesChange([...remaining, combined]);
      } catch {
        setError(t.fileUpload.errorType.replace('{name}', t.fileUpload.combineName));
      } finally {
        setProcessing(false);
      }
    },
    [files, onFilesChange, maxBytes, maxTotalSizeMB, t],
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

  const scanItems: ReorderItem[] = files
    .filter((f) => f.scanned && f.scanJpeg && f.scanAspect)
    .map((f) => ({ id: f.name, name: f.name, thumb: f.scanJpeg! }));

  return (
    <div>
      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
        {t.fileUpload.label}
      </label>
      <p className="text-[0.82rem] text-ink-muted mb-3">
        {t.fileUpload.description}
      </p>

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
          {processing ? t.fileUpload.scanning : t.fileUpload.dragHint}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={processing}
            className="py-2.5 px-5 border-2 border-gold text-gold-dark font-semibold text-[0.85rem] rounded-sm cursor-pointer transition-all bg-white hover:bg-gold-bg disabled:opacity-50"
          >
            {t.fileUpload.selectFile}
          </button>
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
              {t.fileUpload.takePhoto}
            </span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={(e) => {
            if (e.target.files) processFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            if (e.target.files) processFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-[0.76rem] text-ink-muted">
        <span>JPG, PNG, HEIC, PDF, DOC, DOCX</span>
        <span>
          {formatSize(totalSize)} / {maxTotalSizeMB} MB
        </span>
      </div>
      <p className="text-[0.72rem] text-ink-muted mt-1">{t.fileUpload.hintScan}</p>

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

      {error && <p className="text-[0.78rem] text-red-500 mt-2">{error}</p>}

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
                <span className="text-[0.72rem] text-ink-muted whitespace-nowrap">
                  ({formatSize(file.size)}
                  {file.scanned && file.originalSize
                    ? ` · ${t.fileUpload.sizeReduced.replace('{from}', formatSize(file.originalSize))}`
                    : ''}
                  )
                </span>
                {file.scanned && (
                  <span className="text-[0.68rem] font-semibold text-gold-dark bg-gold-bg py-0.5 px-1.5 rounded-sm whitespace-nowrap">
                    {t.fileUpload.scanBadge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-ink-muted hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-1"
                aria-label={t.fileUpload.removeLabel.replace('{name}', file.name)}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {scannableCount >= 2 && (
        <button
          type="button"
          onClick={() => setShowReorder(true)}
          disabled={processing}
          className="mt-3 py-2 px-4 border-2 border-gold text-gold-dark font-semibold text-[0.82rem] rounded-sm cursor-pointer bg-white hover:bg-gold-bg disabled:opacity-50"
        >
          {t.fileUpload.combineButton}
        </button>
      )}

      {currentDeskewFile && (
        <DeskewModal
          file={currentDeskewFile}
          onConfirm={handleDeskewConfirm}
          onCancel={handleDeskewCancel}
        />
      )}

      {showReorder && (
        <ReorderModal
          items={scanItems}
          onConfirm={combineScans}
          onCancel={() => setShowReorder(false)}
        />
      )}
    </div>
  );
}
