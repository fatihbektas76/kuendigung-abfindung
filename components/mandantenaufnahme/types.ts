export interface MandantenFormData {
  // Step 1 — Persönliche Daten
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  strasseHausnummer: string;
  plz: string;
  ort: string;
  handynummer: string;
  email: string;

  // Step 2 — Familienstatus
  beziehungsstatus: string;
  kinder: 'ja' | 'nein' | '';
  kinderAnzahl: string;
  kinderAlter: string;

  // Step 3 — Arbeitsverhältnis
  arbeitgeberName: string;
  arbeitgeberStrasse: string;
  arbeitgeberPlz: string;
  arbeitgeberOrt: string;
  berufsbezeichnung: string;
  arbeitsort: string;
  bruttomonatslohn: string;
  eintrittsdatum: string;
  betriebsrat: 'ja' | 'nein' | '';
  kuendigungsschutz: string[];
  kuendigungsschutzSonstig: string;

  // Step 4 — Kündigung & Versicherung
  kuendigungsAnzahl: '1' | '2' | '3+' | '';
  kuendigungen: Array<{ kuendigungsDatum: string; zugangsDatum: string }>;
  rechtsschutz: 'ja' | 'nein' | '';
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

export const initialFormData: MandantenFormData = {
  vorname: '',
  nachname: '',
  geburtsdatum: '',
  strasseHausnummer: '',
  plz: '',
  ort: '',
  handynummer: '',
  email: '',

  beziehungsstatus: '',
  kinder: '',
  kinderAnzahl: '',
  kinderAlter: '',

  arbeitgeberName: '',
  arbeitgeberStrasse: '',
  arbeitgeberPlz: '',
  arbeitgeberOrt: '',
  berufsbezeichnung: '',
  arbeitsort: '',
  bruttomonatslohn: '',
  eintrittsdatum: '',
  betriebsrat: '',
  kuendigungsschutz: [],
  kuendigungsschutzSonstig: '',

  kuendigungsAnzahl: '',
  kuendigungen: [{ kuendigungsDatum: '', zugangsDatum: '' }],
  rechtsschutz: '',
  versicherungsgesellschaft: '',
  versicherungsnummer: '',

  datenschutz: false,
};

export const VERSICHERUNGEN = [
  'ADAC Rechtsschutz',
  'Advocard',
  'Allianz',
  'ARAG',
  'AXA',
  'Concordia',
  'D.A.S.',
  'Debeka',
  'DEURAG',
  'DMB Rechtsschutz',
  'ERGO',
  'Generali',
  'Gothaer',
  'HDI',
  'HUK-COBURG',
  'LVM',
  'ÖRAG',
  'R+V',
  'Roland',
  'Signal Iduna',
  'WGV',
  'Württembergische',
  'Zurich',
];

export const KUENDIGUNGSSCHUTZ_OPTIONEN = [
  { value: 'keiner', label: 'Keiner' },
  { value: 'schwangerschaft', label: 'Schwangerschaft / Mutterschutz' },
  { value: 'elternzeit', label: 'Elternzeit' },
  { value: 'schwerbehinderung', label: 'Schwerbehinderung (GdB ≥ 50)' },
  { value: 'gleichstellung', label: 'Gleichstellung (GdB 30–49)' },
  { value: 'betriebsrat', label: 'Betriebsratsmitglied' },
  { value: 'datenschutz', label: 'Datenschutzbeauftragter' },
  { value: 'azubi', label: 'Azubi nach Probezeit' },
  { value: 'sonstig', label: 'Sonstiger' },
];

export const BEZIEHUNGSSTATUS_OPTIONEN = [
  { value: 'ledig', label: 'Ledig' },
  { value: 'verheiratet', label: 'Verheiratet' },
  { value: 'geschieden', label: 'Geschieden' },
  { value: 'verwitwet', label: 'Verwitwet' },
  { value: 'getrennt', label: 'Getrennt lebend' },
];

export type StepErrors = Record<string, string>;

export interface StepProps {
  data: MandantenFormData;
  onChange: <K extends keyof MandantenFormData>(field: K, value: MandantenFormData[K]) => void;
  errors: StepErrors;
}
