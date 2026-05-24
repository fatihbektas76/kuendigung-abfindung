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
  | '';

export interface AllgemeinFormData {
  // Step 1 — Persönliche Daten
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  strasseHausnummer: string;
  plz: string;
  ort: string;
  handynummer: string;
  email: string;

  // Step 2 — Rechtsgebiet
  rechtsgebiet: Rechtsgebiet;
  rechtsgebietSonstiges: string;

  // Step 3 — Gegner
  gegnerName: string;
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
}

export const initialAllgemeinFormData: AllgemeinFormData = {
  vorname: '',
  nachname: '',
  geburtsdatum: '',
  strasseHausnummer: '',
  plz: '',
  ort: '',
  handynummer: '',
  email: '',

  rechtsgebiet: '',
  rechtsgebietSonstiges: '',

  gegnerName: '',
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
