/**
 * Sanitize + HTML-Rendering für Mandantenaufnahme-Formulare.
 *
 * Wird geteilt zwischen dem klassischen /api/mandantenaufnahme-Handler
 * (Brevo-Fallback + Graph-Inline-Path) und den neuen Endpoints
 * /api/mandantenaufnahme/init und /send (Graph-Upload-Session-Path).
 * Ohne diese Extraktion hätten wir die Sanitize-/Format-Logik dreifach.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function s(val: unknown, max = 500): string {
  return String(val || '').slice(0, max);
}

export const RECHTSGEBIET_LABELS: Record<string, string> = {
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
  sonstiges: 'Sonstiges',
};

const TD = 'padding:6px 12px;border:1px solid #ddd';
const TD_LABEL = `${TD};font-weight:600;width:200px`;
const TABLE = 'border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px';
const H3 = 'color:#A68B4B;font-family:sans-serif;margin-top:24px';

function row(label: string, value: string): string {
  return `<tr><td style="${TD_LABEL}">${escapeHtml(label)}</td><td style="${TD}">${escapeHtml(value)}</td></tr>`;
}

/* ─── Kündigung ─── */

export type KuendigungForm = ReturnType<typeof sanitizeKuendigung>;

export function sanitizeKuendigung(body: Record<string, unknown>) {
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
    kuendigungsschutz: Array.isArray(body.kuendigungsschutz)
      ? body.kuendigungsschutz.map((v: unknown) => s(v, 100))
      : [],
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

export function buildKuendigungHtml(formData: KuendigungForm, attachmentCount: number): string {
  const kuendigungenHtml = formData.kuendigungen
    .map(
      (k, i) =>
        `<tr><td style="${TD}">${i + 1}. Kündigung</td><td style="${TD}">Datum: ${escapeHtml(k.kuendigungsDatum)}, Zugang: ${escapeHtml(k.zugangsDatum)}</td></tr>`,
    )
    .join('');

  const kuendigungsschutzText =
    formData.kuendigungsschutz.length > 0
      ? formData.kuendigungsschutz.join(', ') +
        (formData.kuendigungsschutzSonstig ? ` (${formData.kuendigungsschutzSonstig})` : '')
      : 'Keine Angabe';

  const rsvDauerLabel =
    formData.rechtsschutzDauer === 'laenger3'
      ? 'Länger als 3 Monate'
      : formData.rechtsschutzDauer === 'genau3'
        ? 'Genau 3 Monate'
        : formData.rechtsschutzDauer === 'kuerzer3'
          ? 'Kürzer als 3 Monate'
          : 'k.A.';

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

/* ─── Allgemein ─── */

export type AllgemeinForm = ReturnType<typeof sanitizeAllgemein>;

export function sanitizeAllgemein(body: Record<string, unknown>) {
  const rawMandantTyp = s(body.mandantTyp, 20);
  const mandantTyp: 'privat' | 'unternehmen' =
    rawMandantTyp === 'unternehmen' ? 'unternehmen' : 'privat';
  const rawGegnerTyp = s(body.gegnerTyp, 20);
  const gegnerTyp: 'privat' | 'unternehmen' =
    rawGegnerTyp === 'privat' ? 'privat' : 'unternehmen';

  return {
    mandantTyp,
    vorname: s(body.vorname, 200),
    nachname: s(body.nachname, 200),
    geburtsdatum: s(body.geburtsdatum, 20),
    firmenname: s(body.firmenname, 300),
    rechtsform: s(body.rechtsform, 100),
    vertretungsberechtigt: s(body.vertretungsberechtigt, 300),
    strasseHausnummer: s(body.strasseHausnummer, 300),
    plz: s(body.plz, 10),
    ort: s(body.ort, 200),
    handynummer: s(body.handynummer, 50),
    email: s(body.email, 200),
    rechtsgebiet: s(body.rechtsgebiet, 100),
    rechtsgebietSonstiges: s(body.rechtsgebietSonstiges, 500),
    gegnerTyp,
    gegnerName: s(body.gegnerName, 300),
    gegnerRechtsform: s(body.gegnerRechtsform, 100),
    gegnerStrasse: s(body.gegnerStrasse, 300),
    gegnerPlz: s(body.gegnerPlz, 10),
    gegnerOrt: s(body.gegnerOrt, 200),
    gegnerAnsprechpartner: s(body.gegnerAnsprechpartner, 200),
    gegnerEmail: s(body.gegnerEmail, 200),
    rechtsschutz: s(body.rechtsschutz, 10),
    rechtsschutzDauer: s(body.rechtsschutzDauer, 20),
    versicherungsgesellschaft: s(body.versicherungsgesellschaft, 200),
    versicherungsnummer: s(body.versicherungsnummer, 100),
  };
}

export function buildAllgemeinHtml(formData: AllgemeinForm, attachmentCount: number): string {
  const rechtsgebietLabel =
    RECHTSGEBIET_LABELS[formData.rechtsgebiet] ||
    formData.rechtsgebietSonstiges ||
    formData.rechtsgebiet ||
    'Nicht angegeben';
  const rsvDauerLabel =
    formData.rechtsschutzDauer === 'laenger3'
      ? 'Länger als 3 Monate'
      : formData.rechtsschutzDauer === 'genau3'
        ? 'Genau 3 Monate'
        : formData.rechtsschutzDauer === 'kuerzer3'
          ? 'Kürzer als 3 Monate'
          : 'k.A.';

  const mandantTypLabel = formData.mandantTyp === 'unternehmen' ? 'Unternehmen' : 'Privatperson';
  const gegnerTypLabel = formData.gegnerTyp === 'privat' ? 'Privatperson' : 'Unternehmen';

  const mandantRows =
    formData.mandantTyp === 'unternehmen'
      ? `
      ${row('Mandantentyp', mandantTypLabel)}
      ${row('Firmenname', formData.firmenname)}
      ${formData.rechtsform ? row('Rechtsform', formData.rechtsform) : ''}
      ${row('Vertretungsberechtigt', formData.vertretungsberechtigt)}
    `
      : `
      ${row('Mandantentyp', mandantTypLabel)}
      ${row('Name', `${formData.vorname} ${formData.nachname}`)}
      ${row('Geburtsdatum', formData.geburtsdatum)}
    `;

  const gegnerRows =
    formData.gegnerTyp === 'privat'
      ? `
      ${row('Gegnertyp', gegnerTypLabel)}
      ${row('Name', formData.gegnerName)}
    `
      : `
      ${row('Gegnertyp', gegnerTypLabel)}
      ${row('Firma', formData.gegnerName)}
      ${formData.gegnerRechtsform ? row('Rechtsform', formData.gegnerRechtsform) : ''}
    `;

  return `
    <h2 style="color:#333;font-family:sans-serif">Neue Mandantenaufnahme (${escapeHtml(rechtsgebietLabel)})</h2>

    <h3 style="${H3}">Mandant (${escapeHtml(mandantTypLabel)})</h3>
    <table style="${TABLE}">
      ${mandantRows}
      ${row('Adresse', `${formData.strasseHausnummer}, ${formData.plz} ${formData.ort}`)}
      ${row('Telefon', formData.handynummer)}
      ${row('E-Mail', formData.email)}
    </table>

    <h3 style="${H3}">Rechtsgebiet</h3>
    <table style="${TABLE}">
      ${row('Thema', rechtsgebietLabel)}
      ${formData.rechtsgebietSonstiges ? row('Eigene Beschreibung', formData.rechtsgebietSonstiges) : ''}
    </table>

    <h3 style="${H3}">Gegner (${escapeHtml(gegnerTypLabel)})</h3>
    <table style="${TABLE}">
      ${gegnerRows}
      ${row('Adresse', `${formData.gegnerStrasse}, ${formData.gegnerPlz} ${formData.gegnerOrt}`)}
      ${formData.gegnerAnsprechpartner ? row('Ansprechpartner', formData.gegnerAnsprechpartner) : ''}
      ${formData.gegnerEmail ? row('E-Mail', formData.gegnerEmail) : ''}
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

/* ─── Shared build ─── */

export interface IntakeContext {
  subject: string;
  htmlContent: string;
  webhookData: Record<string, unknown>;
}

export function buildIntakeContext(
  body: Record<string, unknown>,
  attachmentCount: number,
): IntakeContext {
  const formType = s(body.formType, 20) || 'kuendigung';
  if (formType === 'allgemein') {
    const formData = sanitizeAllgemein(body);
    const rechtsgebietLabel =
      RECHTSGEBIET_LABELS[formData.rechtsgebiet] ||
      formData.rechtsgebietSonstiges ||
      formData.rechtsgebiet ||
      'Allgemein';
    const mandantLabel =
      formData.mandantTyp === 'unternehmen'
        ? formData.firmenname
        : `${formData.vorname} ${formData.nachname}`;
    return {
      subject: `Neue Mandantenaufnahme (${rechtsgebietLabel}): ${mandantLabel}`,
      htmlContent: buildAllgemeinHtml(formData, attachmentCount),
      webhookData: { ...formData, name: mandantLabel, formType: 'allgemein' },
    };
  }
  const formData = sanitizeKuendigung(body);
  return {
    subject: `Neue Mandantenaufnahme (Kündigung): ${formData.vorname} ${formData.nachname}`,
    htmlContent: buildKuendigungHtml(formData, attachmentCount),
    webhookData: {
      ...formData,
      name: `${formData.vorname} ${formData.nachname}`,
      formType: 'kuendigung',
    },
  };
}

export function validateRequiredFields(body: Record<string, unknown>): string | null {
  const email = s(body.email, 200);
  const formType = s(body.formType, 20) || 'kuendigung';
  const mandantTypRaw = s(body.mandantTyp, 20);
  const isUnternehmen = formType === 'allgemein' && mandantTypRaw === 'unternehmen';

  if (isUnternehmen) {
    const firmenname = s(body.firmenname, 300);
    const vertretung = s(body.vertretungsberechtigt, 300);
    if (!firmenname || !vertretung || !email) return 'Pflichtfelder fehlen.';
  } else {
    const vorname = s(body.vorname, 200);
    const nachname = s(body.nachname, 200);
    if (!vorname || !nachname || !email) return 'Pflichtfelder fehlen.';
  }
  if (!EMAIL_RE.test(email)) return 'Ungültige E-Mail.';
  return null;
}
