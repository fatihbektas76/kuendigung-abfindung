import { NextRequest, NextResponse } from 'next/server';
import { createContact, sendNotificationEmail } from '@/lib/brevo';
import { forwardLeadToAdmin } from '@/lib/admin-ingest';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    // Honeypot: if filled, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const contactData = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      company: body.company ? String(body.company).slice(0, 200) : undefined,
      phone: body.phone ? String(body.phone).slice(0, 50) : undefined,
      disputeType: body.disputeType ? String(body.disputeType).slice(0, 100) : undefined,
      disputeValue: body.disputeValue ? String(body.disputeValue).slice(0, 100) : undefined,
      message: String(message).slice(0, 5000),
    };

    // Fire-and-forget: APOS-Admin-Ingest (Telegram-Alert + Admin-Dashboard-Lead).
    // Fehler werden intern geschluckt, blockieren niemals den Brevo-Flow.
    const pageUrl = request.headers.get('referer') ?? null;
    const adminIngest = forwardLeadToAdmin({
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone ?? null,
      rechtsgebiet: contactData.disputeType ?? null,
      message: contactData.message,
      pageUrl,
      raw: {
        source: 'contact_form',
        company: contactData.company ?? null,
        disputeValue: contactData.disputeValue ?? null,
      },
    });

    const results = await Promise.allSettled([
      createContact(contactData),
      sendNotificationEmail(contactData),
      adminIngest,
    ]);

    const [contactResult, emailResult, adminResult] = results;
    if (contactResult.status === 'rejected') {
      console.error('Brevo contact creation failed:', contactResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('Brevo email sending failed:', emailResult.reason);
    }
    if (adminResult.status === 'rejected') {
      console.error('APOS admin ingest failed:', adminResult.reason);
    }

    // Return success to user even if one fails, but log errors
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}
