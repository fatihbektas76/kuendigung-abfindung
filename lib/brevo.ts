const BREVO_API_URL = 'https://api.brevo.com/v3';

function getApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key || key === 'your_key_here') {
    throw new Error('BREVO_API_KEY is not configured');
  }
  return key;
}

export async function createContact(data: {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  disputeType?: string;
  disputeValue?: string;
  message: string;
}) {
  const res = await fetch(`${BREVO_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': getApiKey(),
    },
    body: JSON.stringify({
      email: data.email,
      attributes: {
        FIRSTNAME: data.name,
        COMPANY: data.company || '',
        PHONE: data.phone || '',
        DISPUTE_TYPE: data.disputeType || '',
        DISPUTE_VALUE: data.disputeValue || '',
        MESSAGE: data.message,
      },
      listIds: [24],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    console.error('Brevo contact creation failed:', res.status, text);
    throw new Error(`Brevo contact creation failed: ${res.status}`);
  }
}

export async function sendNotificationEmail(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  disputeType?: string;
  disputeValue?: string;
  message: string;
}) {
  const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': getApiKey(),
    },
    body: JSON.stringify({
      sender: { name: 'Website Contact Form', email: 'fb@fb-re.de' },
      to: [{ email: 'bektas@apos.legal', name: 'Fatih Bektas' }],
      subject: `Neue Anfrage: ${data.disputeType || 'Allgemein'} — ${data.name}`,
      htmlContent: `
        <h2>Neue Anfrage über die Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(data.company || 'Keine Angabe')}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(data.phone || 'Keine Angabe')}</p>
        <p><strong>Anliegen:</strong> ${escapeHtml(data.disputeType || 'Keine Angabe')}</p>
        <p><strong>Gehaltsspanne:</strong> ${escapeHtml(data.disputeValue || 'Keine Angabe')}</p>
        <p><strong>Nachricht:</strong><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Brevo email sending failed:', res.status, text);
    throw new Error(`Brevo email sending failed: ${res.status}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
