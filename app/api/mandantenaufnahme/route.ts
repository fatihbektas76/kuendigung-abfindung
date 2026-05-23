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

const RECHTSGEBIET_LABELS: Record<string, string> = {
  kuendigung: 'Kündigung',
  lohnforderung: 'Lohnforderung',
  zeugnisberichtigung: 'Zeugnisberichtigung',
  zeugniserstellung: 'Zeugniserstellung',
  abmahnung: 'Abmahnung',
  aufhebungsvertrag: 'Aufhebungsvertrag',
  abfindung: 'Abfindung',
  befristung: 'Befristung',
  versetzung: 'Versetzung',
  diskriminierung: 'Diskriminierung',
  mobbing: 'Mobbing',
  ueberstunden: 'Überstunden',
  sonstiges: 'Sonstiges Arbeitsrecht',
};

const TD = 'padding:6px 12px;border:1px solid #ddd';
const TD_LABEL = `${TD};font-weight:600;width:200px`;
const TABLE = 'border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px';
const H3 = 'color:#A68B4B;font-family:sans-serif;margin-top:24px';

function row(label: string, value: string): string {
  return `<tr><td style="${TD_LABEL}">${escapeHtml(label)}</td><td style="${TD}">${escapeHtml(value)}</td></tr>`;
}

function buildAttachments(body: Record<string, unknown>): Array<{ name: string; content: string }> {
  const attachments: Array<{ name: string; content: string }> = [];
  if (Array.isArray(body.files)) {
    for (const f of body.files) {
      if (f.name && f.content) {
        const base64 = String(f.content).replace(/^data:[^;]+;base64,/, '');
        attachments.push({
          name: String(f.name).slice(0, 200),
          content: base64,
        });
      }
    }
  }
  return attachments;
}

/* ─── Kündigung form ─── */

function sanitizeKuendigung(body: Record<string, unknown>) {
  return {
    vorname: s(body.vorname, 200),
    nachname: s(body.nachname, 200),
    geburtsdatum: s(body.geburtsdatum, 20),
    strasseHausnummer: s(body.strasseHausnummer, 300),
    plz: s(body.plz, 10),
    ort: s(body.ort, 200),
    handynummer: s(body.handynummer, 50),
    email: s(body.email, 200),
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
    rechtsschutzDauer: s(body.rechtsschutzDauer, 20),
    versicherungsgesellschaft: s(body.versicherungsgesellschaft, 200),
    versicherungsnummer: s(body.versicherungsnummer, 100),
  };
}

function buildKuendigungHtml(formData: ReturnType<typeof sanitizeKuendigung>, attachmentCount: number): string {
  const kuendigungenHtml = formData.kuendigungen
    .map(
      (k: { kuendigungsDatum: string; zugangsDatum: string }, i: number) =>
        `<tr><td style="${TD}">${i + 1}. Kündigung</td><td style="${TD}">Datum: ${escapeHtml(k.kuendigungsDatum)}, Zugang: ${escapeHtml(k.zugangsDatum)}</td></tr>`,
    )
    .join('');

  const kuendigungsschutzText = formData.kuendigungsschutz.length > 0
    ? formData.kuendigungsschutz.join(', ') + (formData.kuendigungsschutzSonstig ? ` (${formData.kuendigungsschutzSonstig})` : '')
    : 'Keine Angabe';

  const rsvDauerLabel = formData.rechtsschutzDauer === 'laenger3' ? 'Länger als 3 Monate' : formData.rechtsschutzDauer === 'genau3' ? 'Genau 3 Monate' : formData.rechtsschutzDauer === 'kuerzer3' ? 'Kürzer als 3 Monate' : 'k.A.';

  return `
    <h2 style="color:#333;font-family:sans-serif">Neue Mandantenaufnahme (Kündigung)</h2>

    <h3 style="${H3}">Persönliche Daten</h3>
    <table style="${TABLE}">
      ${row('Name', `${formData.vorname} ${formData.nachname}`)}
      ${row('Geburtsdatum', formData.geburtsdatum)}
      ${row('Adresse', `${formData.strasseHausnummer}, ${formData.plz} ${formData.ort}`)}
      ${row('Handynummer', formData.handynummer)}
      ${row('E-Mail', formData.email)}
    </table>

    <h3 style="${H3}">Familienstatus</h3>
    <table style="${TABLE}">
      ${row('Beziehungsstatus', formData.beziehungsstatus)}
      ${row('Kinder', formData.kinder + (formData.kinder === 'ja' ? ` (Anzahl: ${formData.kinderAnzahl}, Alter: ${formData.kinderAlter || 'k.A.'})` : ''))}
    </table>

    <h3 style="${H3}">Arbeitsverhältnis</h3>
    <table style="${TABLE}">
      ${row('Arbeitgeber', formData.arbeitgeberName)}
      ${row('AG-Adresse', `${formData.arbeitgeberStrasse}, ${formData.arbeitgeberPlz} ${formData.arbeitgeberOrt}`)}
      ${row('Berufsbezeichnung', formData.berufsbezeichnung)}
      ${row('Arbeitsort', formData.arbeitsort)}
      ${row('Bruttomonatslohn', `${formData.bruttomonatslohn} €`)}
      ${row('Eintritt', formData.eintrittsdatum)}
      ${row('Betriebsrat', formData.betriebsrat)}
      ${row('Kündigungsschutz', kuendigungsschutzText)}
    </table>

    <h3 style="${H3}">Kündigung & Versicherung</h3>
    <table style="${TABLE}">
      ${row('Anzahl Kündigungen', formData.kuendigungsAnzahl)}
      ${kuendigungenHtml}
      ${row('Rechtsschutzversicherung', formData.rechtsschutz)}
      ${formData.rechtsschutz === 'ja' ? row('RSV-Dauer', rsvDauerLabel) : ''}
      ${formData.rechtsschutz === 'ja' ? row('Versicherung', `${formData.versicherungsgesellschaft} (Nr: ${formData.versicherungsnummer || 'k.A.'})`) : ''}
    </table>

    ${attachmentCount > 0 ? `<p style="font-family:sans-serif;font-size:14px;margin-top:24px"><strong>${attachmentCount} Datei(en) angehängt.</strong></p>` : ''}
  `;
}

/* ─── Allgemein form ─── */

function sanitizeAllgemein(body: Record<string, unknown>) {
  return {
    vorname: s(body.vorname, 200),
    nachname: s(body.nachname, 200),
    geburtsdatum: s(body.geburtsdatum, 20),
    strasseHausnummer: s(body.strasseHausnummer, 300),
    plz: s(body.plz, 10),
    ort: s(body.ort, 200),
    handynummer: s(body.handynummer, 50),
    email: s(body.email, 200),
    rechtsgebiet: s(body.rechtsgebiet, 100),
    rechtsgebietSonstiges: s(body.rechtsgebietSonstiges, 500),
    gegnerName: s(body.gegnerName, 300),
    gegnerStrasse: s(body.gegnerStrasse, 300),
    gegnerPlz: s(body.gegnerPlz, 10),
    gegnerOrt: s(body.gegnerOrt, 200),
    gegnerAnsprechpartner: s(body.gegnerAnsprechpartner, 200),
    rechtsschutz: s(body.rechtsschutz, 10),
    rechtsschutzDauer: s(body.rechtsschutzDauer, 20),
    versicherungsgesellschaft: s(body.versicherungsgesellschaft, 200),
    versicherungsnummer: s(body.versicherungsnummer, 100),
  };
}

function buildAllgemeinHtml(formData: ReturnType<typeof sanitizeAllgemein>, attachmentCount: number): string {
  const rechtsgebietLabel = RECHTSGEBIET_LABELS[formData.rechtsgebiet] || formData.rechtsgebiet;
  const rsvDauerLabel = formData.rechtsschutzDauer === 'laenger3' ? 'Länger als 3 Monate' : formData.rechtsschutzDauer === 'genau3' ? 'Genau 3 Monate' : formData.rechtsschutzDauer === 'kuerzer3' ? 'Kürzer als 3 Monate' : 'k.A.';

  return `
    <h2 style="color:#333;font-family:sans-serif">Neue Mandantenaufnahme (${escapeHtml(rechtsgebietLabel)})</h2>

    <h3 style="${H3}">Persönliche Daten</h3>
    <table style="${TABLE}">
      ${row('Name', `${formData.vorname} ${formData.nachname}`)}
      ${row('Geburtsdatum', formData.geburtsdatum)}
      ${row('Adresse', `${formData.strasseHausnummer}, ${formData.plz} ${formData.ort}`)}
      ${row('Handynummer', formData.handynummer)}
      ${row('E-Mail', formData.email)}
    </table>

    <h3 style="${H3}">Rechtsgebiet</h3>
    <table style="${TABLE}">
      ${row('Thema', rechtsgebietLabel)}
      ${formData.rechtsgebiet === 'sonstiges' ? row('Beschreibung', formData.rechtsgebietSonstiges) : ''}
    </table>

    <h3 style="${H3}">Gegner</h3>
    <table style="${TABLE}">
      ${row('Name / Firma', formData.gegnerName)}
      ${row('Adresse', `${formData.gegnerStrasse}, ${formData.gegnerPlz} ${formData.gegnerOrt}`)}
      ${formData.gegnerAnsprechpartner ? row('Ansprechpartner', formData.gegnerAnsprechpartner) : ''}
    </table>

    <h3 style="${H3}">Rechtsschutzversicherung</h3>
    <table style="${TABLE}">
      ${row('RSV vorhanden', formData.rechtsschutz)}
      ${formData.rechtsschutz === 'ja' ? row('RSV-Dauer', rsvDauerLabel) : ''}
      ${formData.rechtsschutz === 'ja' ? row('Versicherung', `${formData.versicherungsgesellschaft} (Nr: ${formData.versicherungsnummer || 'k.A.'})`) : ''}
    </table>

    ${attachmentCount > 0 ? `<p style="font-family:sans-serif;font-size:14px;margin-top:24px"><strong>${attachmentCount} Datei(en) angehängt.</strong></p>` : ''}
  `;
}

/* ─── POST handler ─── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Required fields (shared)
    const vorname = s(body.vorname, 200);
    const nachname = s(body.nachname, 200);
    const email = s(body.email, 200);

    if (!vorname || !nachname || !email) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail.' }, { status: 400 });
    }

    const formType = s(body.formType, 20) || 'kuendigung';
    const attachments = buildAttachments(body);

    let htmlContent: string;
    let subject: string;
    let webhookData: Record<string, unknown>;

    if (formType === 'allgemein') {
      const formData = sanitizeAllgemein(body);
      const rechtsgebietLabel = RECHTSGEBIET_LABELS[formData.rechtsgebiet] || formData.rechtsgebiet;
      htmlContent = buildAllgemeinHtml(formData, attachments.length);
      subject = `Neue Mandantenaufnahme (${rechtsgebietLabel}): ${formData.vorname} ${formData.nachname}`;
      webhookData = { ...formData, name: `${formData.vorname} ${formData.nachname}`, formType: 'allgemein' };
    } else {
      const formData = sanitizeKuendigung(body);
      htmlContent = buildKuendigungHtml(formData, attachments.length);
      subject = `Neue Mandantenaufnahme (Kündigung): ${formData.vorname} ${formData.nachname}`;
      webhookData = { ...formData, name: `${formData.vorname} ${formData.nachname}`, formType: 'kuendigung' };
    }

    // Send email via Brevo
    const emailPayload: Record<string, unknown> = {
      sender: { name: 'Mandantenaufnahme', email: 'fb@fb-re.de' },
      to: [{ email: 'bektas@apos.legal', name: 'Fatih Bektas' }],
      subject,
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
      await sendEchtlyWebhook(webhookData);
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
