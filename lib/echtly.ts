export async function sendEchtlyWebhook(data: Record<string, unknown>): Promise<void> {
  const url = process.env.ECHTLY_WEBHOOK_URL;

  if (!url) {
    console.warn('ECHTLY_WEBHOOK_URL is not configured — skipping webhook');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Echtly webhook failed:', res.status, text);
    throw new Error(`Echtly webhook failed: ${res.status}`);
  }
}
