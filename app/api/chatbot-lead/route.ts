import { NextRequest, NextResponse } from 'next/server';
import { createContact, sendNotificationEmail } from '@/lib/brevo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function s(val: unknown, max = 500): string {
  return String(val || '').slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = s(body.name, 200);
    const email = s(body.email, 200);
    const phone = s(body.phone, 50);
    const chatSummary = s(body.chatSummary, 5000);
    const topicCategory = s(body.topicCategory, 200);
    const pageUrl = s(body.pageUrl, 500);

    if (!name || !email) {
      return NextResponse.json({ error: 'Name und E-Mail sind erforderlich.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Ungueltige E-Mail.' }, { status: 400 });
    }

    const contactData = {
      name,
      email,
      phone,
      disputeType: `Chatbot: ${topicCategory}`,
      message: `[Chatbot-Gespraech von ${pageUrl}]\n\n${chatSummary}`,
    };

    const results = await Promise.allSettled([
      createContact(contactData),
      sendNotificationEmail({
        ...contactData,
        disputeType: `Chatbot: ${topicCategory}`,
      }),
    ]);

    const [contactResult, emailResult] = results;
    if (contactResult.status === 'rejected') {
      console.error('Chatbot lead contact creation failed:', contactResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('Chatbot lead email sending failed:', emailResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Chatbot lead error:', error);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten.' }, { status: 500 });
  }
}
