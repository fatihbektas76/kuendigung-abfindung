import { createHmac } from 'node:crypto'

const SITE_SLUG = 'gekuendigt-abfindung'

export type IngestAttachment = {
  name: string
  contentType: string
  /** base64 without data:-prefix */
  contentBytes: string
}

type IngestPayload = {
  name?: string | null
  email?: string | null
  phone?: string | null
  rechtsgebiet?: string | null
  message?: string | null
  pageUrl?: string | null
  raw?: unknown
  attachments?: IngestAttachment[]
}

/**
 * Forwards a lead (incl. optional attachments) to the APOS admin ingest endpoint.
 * Fire-and-forget: swallows all errors so the primary flow is never blocked.
 * Returns quickly on missing config. Timeout 15s to allow for larger uploads.
 */
export async function forwardLeadToAdmin(payload: IngestPayload): Promise<void> {
  const url = process.env.APOS_ADMIN_INGEST_URL
  const secret = process.env.APOS_ADMIN_INGEST_SECRET
  if (!url || !secret) return

  try {
    const body = JSON.stringify({
      siteSlug: SITE_SLUG,
      name: payload.name ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      rechtsgebiet: payload.rechtsgebiet ?? null,
      message: payload.message ?? null,
      pageUrl: payload.pageUrl ?? null,
      raw: payload.raw ?? null,
      attachments: payload.attachments ?? [],
    })
    const signature = createHmac('sha256', secret).update(body).digest('hex')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-signature': signature,
          'user-agent': 'gekuendigt-abfindung-ingest/2',
        },
        body,
        signal: controller.signal,
      })
      if (!res.ok) {
        console.warn('[admin-ingest] non-ok response:', res.status)
      }
    } finally {
      clearTimeout(timeout)
    }
  } catch (err) {
    console.warn('[admin-ingest] failed (non-fatal):', err instanceof Error ? err.message : err)
  }
}
