function isRealUrl(v: string | undefined): v is string {
  if (!v) return false
  const s = v.trim()
  if (s.length === 0) return false
  if (/^placeholder[_-]/i.test(s)) return false
  if (/^(todo|xxx|changeme)/i.test(s)) return false
  if (!/^https?:\/\//i.test(s)) return false
  return true
}

export async function sendEchtlyWebhook(data: Record<string, unknown>, webhookUrl?: string): Promise<void> {
  const url = webhookUrl || process.env.ECHTLY_WEBHOOK_URL;

  if (!isRealUrl(url)) {
    console.warn('[Echtly] Webhook-URL nicht konfiguriert oder Placeholder — skip');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[Echtly] webhook failed:', res.status, text.slice(0, 400));
    throw new Error(`Echtly webhook failed: ${res.status}`);
  }
}
