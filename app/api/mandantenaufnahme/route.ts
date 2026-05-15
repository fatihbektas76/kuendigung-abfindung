import { NextRequest, NextResponse } from 'next/server';
import { sendEchtlyWebhook } from '@/lib/echtly';

export const maxDuration = 30;

const BREVO_API_URL = 'https://api.brevo.com/v3';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key || key === 'your_key_here') {
    throw new Error('BREVO_API_KEY is not configured');
  }
  return key;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

    // Required fields
    const vorname = s(body.vorname, 200);
    const nachname = s(body.nachname, 200);
    const email = s(body.email, 200);

    if (!vorname || !nachname || !email) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail.' }, { status: 400 });
    }

    // Sanitize all fields
    const formData = {
      vorname,
      nachname,
      geburtsdatum: s(body.geburtsdatum, 20),
      strasseHausnummer: s(body.strasseHausnummer, 300),
      plz: s(body.plz, 10),
      ort: s(body.ort, 200),
      handynummer: s(body.handynummer, 50),
      email,
      beziehungsstatus: s(body.beziehungsstatus, 50),
      kinder: s(body.kinder, 10),
      kinderAnzahl: s(body.kinderAnzahl, 10),
      kinderAlter: s(body.kinderAlter, 200),
      arbeitgeberName: s(body.arbeitgeberName, 300),
      arbeitgeberStrasse: s(body.arbeitgeberStrasse, 300),
      arbeitgeberPlz: s(body.arbeitgeberPlz, 10),
      arbeitgeberOrt: s(body.arbeitgeberOrt, 200),
      berufsbezeichnung: s(body.berufsbezeichnung, 200),
      arbeitsort: s(body.arbeitsort, 200),
      bruttomonatslohn: s(body.bruttomonatslohn, 20),
      eintrittsdatum: s(body.eintrittsdatum, 20),
      betriebsrat: s(body.betriebsrat, 10),
      kuendigungsschutz: Array.isArray(body.kuendigungsschutz) ? body.kuendigungsschutz.map((v: unknown) => s(v, 100)) : [],
      kuendigungsschutzSonstig: s(body.kuendigungsschutzSonstig, 300),
      kuendigungsAnzahl: s(body.kuendigungsAnzahl, 5),
      kuendigungen: Array.isArray(body.kuendigungen)
        ? body.kuendigungen.map((k: Record<string, unknown>) => ({
            kuendigungsDatum: s(k.kuendigungsDatum, 20),
            zugangsDatum: s(k.zugangsDatum, 20),
          }))
        : [],
      rechtsschutz: s(body.rechtsschutz, 10),
      versicherungsgesellschaft: s(body.versicherungsgesellschaft, 200),
      versicherungsnummer: s(body.versicherungsnummer, 100),
    };

    // Build attachments from files
    const attachments: Array<{ name: string; content: string }> = [];
    if (Array.isArray(body.files)) {
      for (const f of body.files) {
        if (f.name && f.content) {
          // Strip data URI prefix if present
          const base64 = String(f.content).replace(/^data:[^;]+;base64,/, '');
          attachments.push({
            name: String(f.name).slice(0, 200),
            content: base64,
          });
        }
      }
    }

    // Build HTML email
    const kuendigungenHtml = formData.kuendigungen
      .map(
        (k: { kuendigungsDatum: string; zugangsDatum: string }, i: number) =>
          `<tr><td style="padding:6px 12px;border:1px solid #ddd">${i + 1}. Kündigung</td><td style="padding:6px 12px;border:1px solid #ddd">Datum: ${escapeHtml(k.kuendigungsDatum)}, Zugang: ${escapeHtml(k.zugangsDatum)}</td></tr>`,
      )
      .join('');

    const kuendigungsschutzText = formData.kuendigungsschutz.length > 0
      ? formData.kuendigungsschutz.join(', ') + (formData.kuendigungsschutzSonstig ? ` (${formData.kuendigungsschutzSonstig})` : '')
      : 'Keine Angabe';

    const htmlContent = `
      <h2 style="color:#333;font-family:sans-serif">Neue Mandantenaufnahme</h2>

      <h3 style="color:#A68B4B;font-family:sans-serif;margin-top:24px">Persönliche Daten</h3>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600;width:200px">Name</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.vorname)} ${escapeHtml(formData.nachname)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Geburtsdatum</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.geburtsdatum)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Adresse</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.strasseHausnummer)}, ${escapeHtml(formData.plz)} ${escapeHtml(formData.ort)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Handynummer</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.handynummer)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">E-Mail</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.email)}</td></tr>
      </table>

      <h3 style="color:#A68B4B;font-family:sans-serif;margin-top:24px">Familienstatus</h3>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600;width:200px">Beziehungsstatus</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.beziehungsstatus)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Kinder</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.kinder)}${formData.kinder === 'ja' ? ` (Anzahl: ${escapeHtml(formData.kinderAnzahl)}, Alter: ${escapeHtml(formData.kinderAlter || 'k.A.')})` : ''}</td></tr>
      </table>

      <h3 style="color:#A68B4B;font-family:sans-serif;margin-top:24px">Arbeitsverhältnis</h3>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600;width:200px">Arbeitgeber</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.arbeitgeberName)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">AG-Adresse</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.arbeitgeberStrasse)}, ${escapeHtml(formData.arbeitgeberPlz)} ${escapeHtml(formData.arbeitgeberOrt)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Berufsbezeichnung</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.berufsbezeichnung)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Arbeitsort</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.arbeitsort)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Bruttomonatslohn</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.bruttomonatslohn)} €</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Eintritt</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.eintrittsdatum)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Betriebsrat</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.betriebsrat)}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Kündigungsschutz</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(kuendigungsschutzText)}</td></tr>
      </table>

      <h3 style="color:#A68B4B;font-family:sans-serif;margin-top:24px">Kündigung & Versicherung</h3>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600;width:200px">Anzahl Kündigungen</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.kuendigungsAnzahl)}</td></tr>
        ${kuendigungenHtml}
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Rechtsschutzversicherung</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.rechtsschutz)}</td></tr>
        ${formData.rechtsschutz === 'ja' ? `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">Versicherung</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(formData.versicherungsgesellschaft)} (Nr: ${escapeHtml(formData.versicherungsnummer || 'k.A.')})</td></tr>` : ''}
      </table>

      ${attachments.length > 0 ? `<p style="font-family:sans-serif;font-size:14px;margin-top:24px"><strong>${attachments.length} Datei(en) angehängt.</strong></p>` : ''}
    `;

    // Send email via Brevo with attachments
    const emailPayload: Record<string, unknown> = {
      sender: { name: 'Mandantenaufnahme', email: 'fb@fb-re.de' },
      to: [{ email: 'bektas@apos.legal', name: 'Fatih Bektas' }],
      subject: `Neue Mandantenaufnahme: ${formData.vorname} ${formData.nachname}`,
      htmlContent,
    };

    if (attachments.length > 0) {
      emailPayload.attachment = attachments;
    }

    const emailRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': getApiKey(),
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailRes.ok) {
      const text = await emailRes.text();
      console.error('Brevo email failed:', emailRes.status, text);
      throw new Error(`Brevo email failed: ${emailRes.status}`);
    }

    // Echtly webhook (fire-and-forget, no files)
    try {
      await sendEchtlyWebhook(formData);
    } catch (err) {
      console.error('Echtly webhook error (non-fatal):', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mandantenaufnahme error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten.' },
      { status: 500 },
    );
  }
}
