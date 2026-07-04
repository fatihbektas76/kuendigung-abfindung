/**
 * Microsoft-Graph-Client für die Mandantenaufnahme.
 *
 * Ersetzt den Brevo-Versand, sobald alle vier MS_GRAPH_*-Env-Variablen
 * gesetzt sind. Client Credentials Flow (App-Only) — kein User-Login.
 *
 * Iteration 1 (dieser Stand): Attachments werden als base64 inline in
 * die sendMail-API übergeben. Damit sind ≤3 MB pro Mail und ≤4,5 MB
 * Vercel-Body-Limit unverändert die Grenze. Der einzige Unterschied
 * zu Brevo: die Mail kommt jetzt aus dem eigenen M365-Postfach
 * (bessere Zustellbarkeit, kein SaaS-Umweg mehr).
 *
 * Iteration 2 (folgt): Upload Sessions für Dateien >3 MB, mit direktem
 * Client-zu-Graph-Chunk-Upload. Dann fällt die 4,5-MB-Grenze weg.
 */

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
const LOGIN_BASE = 'https://login.microsoftonline.com';

export interface GraphConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  senderEmail: string;
}

export function getGraphConfig(): GraphConfig | null {
  const tenantId = process.env.MS_GRAPH_TENANT_ID;
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  const senderEmail = process.env.MS_GRAPH_SENDER_EMAIL;
  if (!tenantId || !clientId || !clientSecret || !senderEmail) return null;
  return { tenantId, clientId, clientSecret, senderEmail };
}

interface TokenCacheEntry {
  token: string;
  expiresAt: number;
}
// Ein einziger Token pro Function-Instance. Fluid Compute wiederverwendet
// warme Instanzen, sodass wir uns pro Aufruf einen Login sparen.
let tokenCache: TokenCacheEntry | null = null;

async function getAccessToken(cfg: GraphConfig): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token;
  }
  const body = new URLSearchParams({
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });
  const res = await fetch(`${LOGIN_BASE}/${cfg.tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph-Auth fehlgeschlagen (${res.status}): ${text.slice(0, 400)}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    token: json.access_token,
    expiresAt: now + json.expires_in * 1000,
  };
  return json.access_token;
}

export interface GraphAttachment {
  name: string;
  contentType: string;
  /** base64 ohne data:-Prefix. */
  contentBytes: string;
}

export interface GraphMailInput {
  subject: string;
  htmlBody: string;
  toRecipients: string[];
  attachments: GraphAttachment[];
}

/**
 * Verschickt eine Mail via /users/{sender}/sendMail. Attachments werden
 * inline im Message-Body übergeben — Graph erlaubt so bis ~3 MB pro
 * Datei und ~4 MB pro Mail (Server-seitig; die Vercel-Body-Grenze ist
 * separat).
 */
export async function sendMailViaGraph(cfg: GraphConfig, input: GraphMailInput): Promise<void> {
  const token = await getAccessToken(cfg);

  const graphAttachments = input.attachments.map((a) => ({
    '@odata.type': '#microsoft.graph.fileAttachment',
    name: a.name.slice(0, 240),
    contentType: a.contentType || 'application/octet-stream',
    contentBytes: a.contentBytes,
  }));

  const body = {
    message: {
      subject: input.subject.slice(0, 250),
      body: {
        contentType: 'HTML',
        content: input.htmlBody,
      },
      toRecipients: input.toRecipients.map((email) => ({
        emailAddress: { address: email },
      })),
      attachments: graphAttachments,
    },
    saveToSentItems: true,
  };

  const url = `${GRAPH_BASE}/users/${encodeURIComponent(cfg.senderEmail)}/sendMail`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (res.status !== 202 && !res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph-sendMail fehlgeschlagen (${res.status}): ${text.slice(0, 400)}`);
  }
  // 202 Accepted = queued for delivery.
}

/* ─── Draft + Upload Session Path (für große Anhänge) ─── */

export interface DraftInput {
  subject: string;
  htmlBody: string;
  toRecipients: string[];
}

/**
 * Legt einen Draft im Postfach des Senders an. Retourniert die
 * Message-ID, mit der wir Upload-Sessions anhängen und am Ende
 * senden können.
 */
export async function createDraft(cfg: GraphConfig, input: DraftInput): Promise<string> {
  const token = await getAccessToken(cfg);
  const body = {
    subject: input.subject.slice(0, 250),
    body: { contentType: 'HTML', content: input.htmlBody },
    toRecipients: input.toRecipients.map((email) => ({ emailAddress: { address: email } })),
  };
  const url = `${GRAPH_BASE}/users/${encodeURIComponent(cfg.senderEmail)}/messages`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph createDraft fehlgeschlagen (${res.status}): ${text.slice(0, 400)}`);
  }
  const json = (await res.json()) as { id: string };
  if (!json.id) throw new Error('Graph createDraft: keine Message-ID zurück');
  return json.id;
}

export interface UploadSessionInput {
  name: string;
  size: number;
  contentType: string;
}

/**
 * Erzeugt eine Upload-Session für eine große Datei am Draft. Der Client
 * lädt dann per PUT + Content-Range direkt zu der zurückgegebenen URL —
 * die Datei geht NICHT durch unsere Vercel-Function, also kein 4,5-MB-
 * Body-Limit.
 */
export async function createUploadSession(
  cfg: GraphConfig,
  draftId: string,
  input: UploadSessionInput,
): Promise<{ uploadUrl: string; expirationDateTime: string }> {
  const token = await getAccessToken(cfg);
  const body = {
    AttachmentItem: {
      attachmentType: 'file',
      name: input.name.slice(0, 240),
      size: input.size,
      contentType: input.contentType || 'application/octet-stream',
    },
  };
  const url = `${GRAPH_BASE}/users/${encodeURIComponent(cfg.senderEmail)}/messages/${encodeURIComponent(draftId)}/attachments/createUploadSession`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph createUploadSession fehlgeschlagen (${res.status}): ${text.slice(0, 400)}`);
  }
  const json = (await res.json()) as { uploadUrl: string; expirationDateTime: string };
  if (!json.uploadUrl) throw new Error('Graph createUploadSession: keine uploadUrl');
  return { uploadUrl: json.uploadUrl, expirationDateTime: json.expirationDateTime };
}

/**
 * Verschickt den vollständig hochgeladenen Draft. Ergebnis: die Mail
 * liegt sofort im Postausgang und beim Empfänger.
 */
export async function sendDraft(cfg: GraphConfig, draftId: string): Promise<void> {
  const token = await getAccessToken(cfg);
  const url = `${GRAPH_BASE}/users/${encodeURIComponent(cfg.senderEmail)}/messages/${encodeURIComponent(draftId)}/send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 202 && !res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph sendDraft fehlgeschlagen (${res.status}): ${text.slice(0, 400)}`);
  }
}

/**
 * Löscht einen Draft, wenn wir den Prozess abbrechen müssen (z. B. wenn
 * einer der Upload-Sessions fehlschlägt und wir keinen halben Draft
 * stehenlassen wollen).
 */
export async function deleteDraft(cfg: GraphConfig, draftId: string): Promise<void> {
  try {
    const token = await getAccessToken(cfg);
    const url = `${GRAPH_BASE}/users/${encodeURIComponent(cfg.senderEmail)}/messages/${encodeURIComponent(draftId)}`;
    await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // Best effort — Draft kann auch später manuell aufgeräumt werden.
  }
}
