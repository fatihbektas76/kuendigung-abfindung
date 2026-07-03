export type Rechtsgebiet =
  | 'kuendigung'
  | 'lohnforderung'
  | 'zeugnisberichtigung'
  | 'zeugniserstellung'
  | 'abmahnung'
  | 'aufhebungsvertrag'
  | 'abfindung'
  | 'befristung'
  | 'versetzung'
  | 'diskriminierung'
  | 'mobbing'
  | 'ueberstunden'
  | 'sonstiges'
  | '';

export type PartyType = 'privat' | 'unternehmen' | '';

export interface AllgemeinFormData {
  // Step 1 — Mandant (Privatperson oder Unternehmen)
  mandantTyp: PartyType;
  // ── Felder Privatperson ──
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  // ── Felder Unternehmen ──
  firmenname: string;
  rechtsform: string;
  vertretungsberechtigt: string;
  // ── Anschrift / Kontakt (für beide) ──
  strasseHausnummer: string;
  plz: string;
  ort: string;
  handynummer: string;
  email: string;

  // Step 2 — Rechtsgebiet
  rechtsgebiet: Rechtsgebiet;
  rechtsgebietSonstiges: string;

  // Step 3 — Gegner (Privatperson oder Unternehmen)
  gegnerTyp: PartyType;
  gegnerName: string;
  gegnerRechtsform: string;
  gegnerStrasse: string;
  gegnerPlz: string;
  gegnerOrt: string;
  gegnerAnsprechpartner: string;
  gegnerEmail: string;

  // Step 4 — Rechtsschutzversicherung
  rechtsschutz: 'ja' | 'nein' | '';
  rechtsschutzDauer: 'laenger3' | 'genau3' | 'kuerzer3' | '';
  versicherungsgesellschaft: string;
  versicherungsnummer: string;

  // Step 5 — Dokumente
  datenschutz: boolean;
}

export interface FileAttachment {
  name: string;
  content: string; // base64
  size: number;
  type: string;
  // UI-only: gesetzt, wenn die Datei durch die Scan-Pipeline lief.
  // Wird nicht an das Backend übermittelt.
  originalSize?: number;
  scanned?: boolean;
  /** JPEG-Rohdaten (data-URL) für Multi-Page-Merge. UI-only. */
  scanJpeg?: string;
  /** Seitenverhältnis der Scan-Vorlage (w/h). UI-only. */
  scanAspect?: number;
}

export const initialAllgemeinFormData: AllgemeinFormData = {
  mandantTyp: 'privat',
  vorname: '',
  nachname: '',
  geburtsdatum: '',
  firmenname: '',
  rechtsform: '',
  vertretungsberechtigt: '',
  strasseHausnummer: '',
  plz: '',
  ort: '',
  handynummer: '',
  email: '',

  rechtsgebiet: '',
  rechtsgebietSonstiges: '',

  gegnerTyp: 'unternehmen',
  gegnerName: '',
  gegnerRechtsform: '',
  gegnerStrasse: '',
  gegnerPlz: '',
  gegnerOrt: '',
  gegnerAnsprechpartner: '',
  gegnerEmail: '',

  rechtsschutz: '',
  rechtsschutzDauer: '',
  versicherungsgesellschaft: '',
  versicherungsnummer: '',

  datenschutz: false,
};

export type StepErrors = Record<string, string>;

export interface StepProps {
  data: AllgemeinFormData;
  onChange: <K extends keyof AllgemeinFormData>(field: K, value: AllgemeinFormData[K]) => void;
  errors: StepErrors;
}
