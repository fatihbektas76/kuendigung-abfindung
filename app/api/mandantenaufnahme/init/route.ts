import { NextRequest, NextResponse } from 'next/server';
import {
  createDraft,
  createUploadSession,
  deleteDraft,
  getGraphConfig,
} from '@/lib/graph-mailer';
import { buildIntakeContext, validateRequiredFields, s } from '@/lib/intake-format';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface FileMetadata {
  name: string;
  size: number;
  contentType: string;
}

/**
 * Erster Schritt des Graph-Upload-Session-Flows.
 *
 * Client sendet Formulardaten + Datei-Metadaten (Name, Größe, Typ —
 * KEIN Content, deshalb bleibt der Request winzig). Wir validieren, bauen
 * die Mail als Draft im Postfach des Absenders, und erzeugen für jede
 * Datei eine Upload-Session bei Graph. Client lädt anschließend direkt
 * gegen die Upload-URLs (an Vercel vorbei).
 */
export async function POST(request: NextRequest) {
  const cfg = getGraphConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: 'Upload-Modus nicht verfügbar (MS Graph nicht konfiguriert).' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body.' }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ success: true, honeypot: true }, { status: 200 });
  }

  const validationError = validateRequiredFields(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const files: FileMetadata[] = Array.isArray(body.files)
    ? body.files
        .map((f: Record<string, unknown>) => ({
          name: s(f.name, 240),
          size: Number.isFinite(Number(f.size)) ? Math.max(0, Math.floor(Number(f.size))) : 0,
          contentType: s(f.contentType, 200) || 'application/octet-stream',
        }))
        .filter((f) => f.name && f.size > 0)
    : [];

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const HARD_LIMIT = 25 * 1024 * 1024; // 25 MB Sicherheitspuffer
  if (totalSize > HARD_LIMIT) {
    return NextResponse.json({ error: 'Anhänge zu groß.' }, { status: 413 });
  }

  const ctx = buildIntakeContext(body, files.length);

  let draftId: string;
  try {
    draftId = await createDraft(cfg, {
      subject: ctx.subject,
      htmlBody: ctx.htmlContent,
      toRecipients: ['bektas@apos.legal'],
    });
  } catch (err) {
    console.error('[init] Draft-Erstellung fehlgeschlagen:', err);
    return NextResponse.json({ error: 'Draft-Erstellung fehlgeschlagen.' }, { status: 502 });
  }

  const uploadUrls: Array<{ name: string; uploadUrl: string }> = [];
  try {
    for (const f of files) {
      const session = await createUploadSession(cfg, draftId, {
        name: f.name,
        size: f.size,
        contentType: f.contentType,
      });
      uploadUrls.push({ name: f.name, uploadUrl: session.uploadUrl });
    }
  } catch (err) {
    console.error('[init] Upload-Session-Erstellung fehlgeschlagen:', err);
    await deleteDraft(cfg, draftId);
    return NextResponse.json(
      { error: 'Upload-Session konnte nicht erstellt werden.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ draftId, uploadUrls }, { status: 200 });
}
