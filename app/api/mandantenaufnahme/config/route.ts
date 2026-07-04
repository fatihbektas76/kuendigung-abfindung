import { NextResponse } from 'next/server';
import { getGraphConfig } from '@/lib/graph-mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Teilt dem Client mit, welcher Upload-Modus verfügbar ist.
 * - graphUpload=true → große Uploads via /init + Chunk-Upload zu Graph + /send
 * - graphUpload=false → Legacy-Pfad: alles in einem Request an /api/mandantenaufnahme
 *
 * Client entscheidet daran zwischen 20-MB-Pfad und 4-MB-Pfad.
 */
export async function GET() {
  const graphEnabled = getGraphConfig() !== null;
  return NextResponse.json(
    {
      graphUpload: graphEnabled,
      maxAttachmentBytes: graphEnabled ? 20 * 1024 * 1024 : 4 * 1024 * 1024,
    },
    {
      headers: { 'Cache-Control': 'public, max-age=300' },
    },
  );
}
