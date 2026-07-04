import { NextRequest, NextResponse } from 'next/server';
import { deleteDraft, getGraphConfig, sendDraft } from '@/lib/graph-mailer';
import { buildIntakeContext, validateRequiredFields, s } from '@/lib/intake-format';
import { sendEchtlyWebhook } from '@/lib/echtly';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Zweiter Schritt des Graph-Upload-Session-Flows.
 *
 * Nachdem der Client alle Dateien direkt zu Graph hochgeladen hat, sagt
 * er uns "fertig". Wir sanitizen die Formulardaten ein zweites Mal
 * (Verify-on-write — der Client darf nichts diktieren), senden den Draft
 * und feuern den Echtly-Webhook. Auf Fehler löschen wir den Draft, damit
 * kein Halbfertiges im Postausgang liegen bleibt.
 */
export async function POST(request: NextRequest) {
  const cfg = getGraphConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: 'Send nicht verfügbar (MS Graph nicht konfiguriert).' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body.' }, { status: 400 });
  }

  const draftId = s(body.draftId, 400);
  if (!draftId) {
    return NextResponse.json({ error: 'draftId fehlt.' }, { status: 400 });
  }

  // Re-validation der Formdata (Client darf nichts diktieren, was
  // auf init nicht schon validiert wurde).
  const validationError = validateRequiredFields(body);
  if (validationError) {
    await deleteDraft(cfg, draftId);
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const attachmentCount = Number.isFinite(Number(body.attachmentCount))
    ? Math.max(0, Math.floor(Number(body.attachmentCount)))
    : 0;
  const ctx = buildIntakeContext(body, attachmentCount);

  try {
    await sendDraft(cfg, draftId);
  } catch (err) {
    console.error('[send] sendDraft fehlgeschlagen:', err);
    await deleteDraft(cfg, draftId);
    return NextResponse.json({ error: 'Mail-Versand fehlgeschlagen.' }, { status: 502 });
  }

  // Echtly-Webhook (fire-and-forget, wie im klassischen Handler).
  const ECHTLY_WEBHOOK_ALLGEMEIN_FALLBACK =
    'https://sign.echtly.de/api/webhooks/incoming/e19067d3-4488-46d1-a7fe-3eb382f36e56';
  const formType = s(body.formType, 20) || 'kuendigung';
  const webhookUrl =
    formType === 'kuendigung'
      ? process.env.ECHTLY_WEBHOOK_URL_KUENDIGUNG || process.env.ECHTLY_WEBHOOK_URL
      : formType === 'allgemein'
        ? process.env.ECHTLY_WEBHOOK_URL_ALLGEMEIN || ECHTLY_WEBHOOK_ALLGEMEIN_FALLBACK
        : process.env.ECHTLY_WEBHOOK_URL;

  try {
    await sendEchtlyWebhook(ctx.webhookData, webhookUrl || undefined);
  } catch (err) {
    console.error('[send] Echtly webhook error (non-fatal):', err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
