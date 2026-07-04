/**
 * Browser-Helper: lädt einen Blob in Chunks direkt an eine Graph-
 * Upload-Session-URL. Umgeht das 4,5-MB-Body-Limit von Vercel Functions,
 * weil die Bytes nie durch unseren Server laufen.
 *
 * Graph erlaubt Chunks bis 4 MB. Wir nutzen 3,2 MB (3355443 Bytes,
 * ein Vielfaches von 320 KB — Empfehlung von Microsoft).
 */

const CHUNK_SIZE = 3_276_800;

export interface UploadProgress {
  fileName: string;
  loaded: number;
  total: number;
}

export interface UploadTarget {
  name: string;
  uploadUrl: string;
  blob: Blob;
}

/**
 * Wandelt eine base64 data URL (wie im FileAttachment gespeichert)
 * zurück in einen Blob.
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(',');
  const mimeMatch = /data:([^;]+)/.exec(meta || '');
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const bytes = atob(b64 || '');
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/**
 * Lädt einen einzelnen Blob per Chunked PUT hoch. Retry pro Chunk (2
 * Versuche) — Handynetze sind flakey.
 */
export async function uploadBlobToGraph(
  target: UploadTarget,
  onProgress?: (p: UploadProgress) => void,
): Promise<void> {
  const total = target.blob.size;
  let offset = 0;
  while (offset < total) {
    const end = Math.min(offset + CHUNK_SIZE, total);
    const chunk = target.blob.slice(offset, end);
    const contentRange = `bytes ${offset}-${end - 1}/${total}`;

    let ok = false;
    let lastErr: unknown = null;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      try {
        const res = await fetch(target.uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Length': String(chunk.size),
            'Content-Range': contentRange,
          },
          body: chunk,
        });
        // 200/201 = fertig, 202 = Chunk akzeptiert, weitere Chunks erwartet
        if (res.status === 200 || res.status === 201 || res.status === 202) {
          ok = true;
        } else if (res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504) {
          // transient — retry
          lastErr = new Error(`Chunk-Upload transient error ${res.status}`);
        } else {
          const text = await res.text().catch(() => '');
          throw new Error(`Chunk-Upload fehlgeschlagen (${res.status}): ${text.slice(0, 300)}`);
        }
      } catch (err) {
        lastErr = err;
      }
    }
    if (!ok) throw lastErr instanceof Error ? lastErr : new Error('Chunk-Upload fehlgeschlagen');

    offset = end;
    onProgress?.({ fileName: target.name, loaded: offset, total });
  }
}

export async function uploadAllBlobs(
  targets: UploadTarget[],
  onProgress?: (p: UploadProgress) => void,
): Promise<void> {
  // Sequentiell — parallele Uploads würden das Handynetz sättigen und
  // Graph rate-limitet ohnehin pro Upload-Session.
  for (const t of targets) {
    await uploadBlobToGraph(t, onProgress);
  }
}
