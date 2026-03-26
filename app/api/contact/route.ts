import { NextRequest, NextResponse } from 'next/server';
import { createContact, sendNotificationEmail } from '@/lib/brevo';

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

    await Promise.all([
      createContact(contactData),
      sendNotificationEmail(contactData),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}
