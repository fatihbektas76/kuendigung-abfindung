const de = {
  // Language toggle
  langLabel: 'Sprache',

  // Progress bar
  progress: {
    step1: 'Persönlich',
    step2: 'Thema',
    step3: 'Gegner',
    step4: 'Versicherung',
    step5: 'Dokumente',
  },

  // Sidebar
  sidebar: {
    heading: 'Mandantenaufnahme',
    secureTransfer: 'Sichere Datenübertragung',
    secureTransferSub: 'SSL-verschlüsselt',
    fastProcessing: 'Schnelle Bearbeitung',
    fastProcessingSub: 'Vollmacht direkt per E-Mail',
    dataProtection: 'Datenschutz garantiert',
    dataProtectionSub: 'DSGVO-konform',
    helpContact: 'Hilfe und Kontakt',
    notice: 'Ihre Daten werden ausschließlich zur Bearbeitung Ihres Mandats verwendet und nicht an Dritte weitergegeben.',
    noticeLabel: 'Hinweis:',
    reviews: 'Bewertungen',
  },

  // Navigation
  nav: {
    next: 'Weiter',
    back: 'Zurück',
  },

  // Thank you page
  thankYou: {
    heading: 'Vielen Dank!',
    message: 'Ihre Mandantenaufnahme wurde erfolgreich übermittelt. Sie erhalten in Kürze eine E-Mail mit den Unterlagen zur Vollmacht und den Mandantsbedingungen.',
    warningLabel: 'Wichtiger Hinweis:',
    warningText: 'Wir melden uns zeitnah bei Ihnen. Bei dringenden Fragen erreichen Sie uns telefonisch unter +49 6222 9599 2400.',
    bookCall: 'Telefontermin buchen',
    backHome: 'Zur Startseite',
  },

  // Error alert
  submitError: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an bektas@apos.legal',

  // Step 1 — Personal data
  step1: {
    heading: 'Ihre persönlichen Daten',
    description: 'Bitte geben Sie Ihre Kontaktdaten ein, damit wir Sie erreichen können.',
    vorname: 'Vorname',
    nachname: 'Nachname',
    geburtsdatum: 'Geburtsdatum',
    adresse: 'Ihre Adresse',
    handynummer: 'Handynummer',
    email: 'E-Mail',
    placeholderVorname: 'Max',
    placeholderNachname: 'Mustermann',
    placeholderPhone: '+49 151 1234 5678',
    placeholderEmail: 'max@beispiel.de',
  },

  // Step 2 — Legal topic
  step3: {
    heading: 'Rechtsgebiet',
    description: 'Wählen Sie das Thema, zu dem Sie Unterstützung benötigen.',
    rechtsgebiet: 'Um welches Thema geht es?',
    selectPlaceholder: 'Bitte wählen',
    sonstigesLabel: 'Bitte beschreiben Sie Ihr Anliegen',
    sonstigesPlaceholder: 'z.B. Betriebsvereinbarung, Altersteilzeit, ...',
  },

  // Step 4 — Opposing party
  step4: {
    heading: 'Angaben zum Gegner',
    description: 'Angaben zur Gegenpartei (z.B. Arbeitgeber, Vertragspartner).',
    gegnerName: 'Name / Firma',
    gegnerStrasse: 'Straße & Hausnummer',
    gegnerPlz: 'PLZ',
    gegnerOrt: 'Ort',
    gegnerAnsprechpartner: 'Ansprechpartner (optional)',
    placeholderName: 'Firma GmbH',
    placeholderStrasse: 'Musterstraße 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
    placeholderAnsprechpartner: 'z.B. Frau Müller, Personalabteilung',
  },

  // Step 5 — Insurance
  step5: {
    heading: 'Rechtsschutzversicherung',
    description: 'Angaben zu Ihrer Rechtsschutzversicherung.',
    rsvFrage: 'Haben Sie eine Rechtsschutzversicherung (RSV)?',
    ja: 'Ja',
    nein: 'Nein',
    rsvDauerFrage: 'Wie lange haben Sie die Rechtsschutzversicherung?',
    rsvDauerLaenger3: 'Länger als 3 Monate',
    rsvDauerGenau3: 'Genau 3 Monate',
    rsvDauerKuerzer3: 'Kürzer als 3 Monate',
    versicherungsgesellschaft: 'Versicherungsgesellschaft',
    versicherungsnummer: 'Versicherungsnummer',
    placeholderVsnr: 'z.B. RS-123456789',
  },

  // Step 6 — Documents & Submit
  step6: {
    heading: 'Dokumente & Absenden',
    description: 'Laden Sie relevante Unterlagen hoch und senden Sie Ihre Mandantenaufnahme ab.',
    warningLabel: 'Wichtiger Hinweis:',
    warningText: 'Bitte laden Sie alle relevanten Dokumente hoch (z.B. Verträge, Schreiben, Korrespondenz). Bei dringenden Fällen kontaktieren Sie uns umgehend.',
    datenschutzPre: 'Ich habe die',
    datenschutzLink: 'Datenschutzerklärung',
    datenschutzPost: 'gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meines Anliegens zu.',
    submitButton: 'Mandantenaufnahme absenden',
    submitting: 'Wird gesendet...',
    submitHint: 'Ihre Daten werden verschlüsselt übertragen und ausschließlich zur Bearbeitung Ihres Mandats verwendet.',
  },

  // File upload
  fileUpload: {
    label: 'Dokumente hochladen',
    description: 'Laden Sie relevante Dokumente hoch: Verträge, Schreiben, Korrespondenz etc.',
    dragHint: 'Dateien hierher ziehen',
    processing: 'Wird verarbeitet...',
    selectFile: 'Datei auswählen',
    takePhoto: 'Foto aufnehmen',
    removeLabel: '{name} entfernen',
    errorType: '"{name}" hat einen nicht unterstützten Dateityp.',
    errorSize: 'Maximale Gesamtgröße von {max} MB überschritten.',
  },

  // Searchable select
  searchableSelect: {
    placeholder: 'Suchen oder auswählen...',
    customPlaceholder: 'Name der Versicherung eingeben',
    fromList: 'Aus Liste wählen',
    enterOther: 'Sonstige eingeben...',
    openDropdown: 'Dropdown öffnen',
  },

  // Address autocomplete
  address: {
    enterAddress: 'Adresse eingeben...',
    manualEntry: 'Manuell eingeben',
    useAutocomplete: 'Google Autocomplete verwenden',
    strasse: 'Straße + Hausnummer',
    plz: 'PLZ',
    ort: 'Ort',
    placeholderStrasse: 'Musterstraße 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
  },

  // Rechtsgebiet options
  rechtsgebietOptionen: [
    { value: 'kuendigung', label: 'Kündigung' },
    { value: 'lohnforderung', label: 'Lohnforderung' },
    { value: 'zeugnisberichtigung', label: 'Zeugnisberichtigung' },
    { value: 'zeugniserstellung', label: 'Zeugniserstellung' },
    { value: 'abmahnung', label: 'Abmahnung' },
    { value: 'aufhebungsvertrag', label: 'Aufhebungsvertrag' },
    { value: 'abfindung', label: 'Abfindung' },
    { value: 'befristung', label: 'Befristung' },
    { value: 'versetzung', label: 'Versetzung' },
    { value: 'diskriminierung', label: 'Diskriminierung' },
    { value: 'mobbing', label: 'Mobbing' },
    { value: 'ueberstunden', label: 'Überstunden' },
    { value: 'sonstiges', label: 'Sonstiges Arbeitsrecht' },
  ],

  // Validation errors
  validation: {
    vorname: 'Bitte Vorname eingeben.',
    nachname: 'Bitte Nachname eingeben.',
    geburtsdatum: 'Bitte Geburtsdatum eingeben.',
    strasseHausnummer: 'Bitte Straße und Hausnummer eingeben.',
    plz: 'Bitte PLZ eingeben.',
    ort: 'Bitte Ort eingeben.',
    handynummer: 'Bitte Handynummer eingeben.',
    emailRequired: 'Bitte E-Mail eingeben.',
    emailInvalid: 'Bitte gültige E-Mail eingeben.',
    rechtsgebiet: 'Bitte Rechtsgebiet wählen.',
    rechtsgebietSonstiges: 'Bitte beschreiben Sie Ihr Anliegen.',
    gegnerName: 'Bitte Name des Gegners eingeben.',
    gegnerStrasse: 'Bitte Straße eingeben.',
    gegnerPlz: 'Bitte PLZ eingeben.',
    gegnerOrt: 'Bitte Ort eingeben.',
    rechtsschutz: 'Bitte angeben, ob Sie eine RSV haben.',
    rechtsschutzDauer: 'Bitte angeben, wie lange Sie die RSV haben.',
    versicherungsgesellschaft: 'Bitte Versicherung wählen.',
    datenschutz: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
  },
};

type DeepStringify<T> = T extends readonly (infer U)[]
  ? DeepStringify<U>[]
  : T extends object
  ? { [K in keyof T]: DeepStringify<T[K]> }
  : T extends string
  ? string
  : T;

export type AllgemeinTranslations = DeepStringify<typeof de>;

const en: AllgemeinTranslations = {
  langLabel: 'Language',

  progress: {
    step1: 'Personal',
    step2: 'Topic',
    step3: 'Opponent',
    step4: 'Insurance',
    step5: 'Documents',
  },

  sidebar: {
    heading: 'Client Intake',
    secureTransfer: 'Secure data transfer',
    secureTransferSub: 'SSL encrypted',
    fastProcessing: 'Fast processing',
    fastProcessingSub: 'Power of attorney via email',
    dataProtection: 'Data protection guaranteed',
    dataProtectionSub: 'GDPR compliant',
    helpContact: 'Help & Contact',
    notice: 'Your data will be used exclusively for processing your case and will not be shared with third parties.',
    noticeLabel: 'Note:',
    reviews: 'Reviews',
  },

  nav: {
    next: 'Next',
    back: 'Back',
  },

  thankYou: {
    heading: 'Thank you!',
    message: 'Your client intake has been successfully submitted. You will shortly receive an email with the power of attorney and client agreement documents.',
    warningLabel: 'Important notice:',
    warningText: 'We will get back to you shortly. For urgent questions, call us at +49 6222 9599 2400.',
    bookCall: 'Book a call',
    backHome: 'Back to homepage',
  },

  submitError: 'Something went wrong. Please try again or contact us directly at bektas@apos.legal',

  step1: {
    heading: 'Your personal details',
    description: 'Please enter your contact details so we can reach you.',
    vorname: 'First name',
    nachname: 'Last name',
    geburtsdatum: 'Date of birth',
    adresse: 'Your address',
    handynummer: 'Mobile number',
    email: 'Email',
    placeholderVorname: 'John',
    placeholderNachname: 'Doe',
    placeholderPhone: '+49 151 1234 5678',
    placeholderEmail: 'john@example.com',
  },

  step3: {
    heading: 'Legal topic',
    description: 'Select the topic you need assistance with.',
    rechtsgebiet: 'What is this about?',
    selectPlaceholder: 'Please select',
    sonstigesLabel: 'Please describe your concern',
    sonstigesPlaceholder: 'e.g. Works agreement, partial retirement, ...',
  },

  step4: {
    heading: 'Opposing party details',
    description: 'Details about the opposing party (e.g. employer, contractual partner).',
    gegnerName: 'Name / Company',
    gegnerStrasse: 'Street & House number',
    gegnerPlz: 'Postal code',
    gegnerOrt: 'City',
    gegnerAnsprechpartner: 'Contact person (optional)',
    placeholderName: 'Company Ltd.',
    placeholderStrasse: 'Main Street 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
    placeholderAnsprechpartner: 'e.g. Mrs. Smith, HR Department',
  },

  step5: {
    heading: 'Legal protection insurance',
    description: 'Details about your legal protection insurance.',
    rsvFrage: 'Do you have legal protection insurance?',
    ja: 'Yes',
    nein: 'No',
    rsvDauerFrage: 'How long have you had your legal protection insurance?',
    rsvDauerLaenger3: 'More than 3 months',
    rsvDauerGenau3: 'Exactly 3 months',
    rsvDauerKuerzer3: 'Less than 3 months',
    versicherungsgesellschaft: 'Insurance company',
    versicherungsnummer: 'Policy number',
    placeholderVsnr: 'e.g. RS-123456789',
  },

  step6: {
    heading: 'Documents & Submit',
    description: 'Upload relevant documents and submit your client intake.',
    warningLabel: 'Important notice:',
    warningText: 'Please upload all relevant documents (e.g. contracts, letters, correspondence). For urgent cases, contact us immediately.',
    datenschutzPre: 'I have read the',
    datenschutzLink: 'privacy policy',
    datenschutzPost: 'and consent to the processing of my data for handling my case.',
    submitButton: 'Submit client intake',
    submitting: 'Submitting...',
    submitHint: 'Your data is transmitted encrypted and used exclusively for processing your case.',
  },

  fileUpload: {
    label: 'Upload documents',
    description: 'Upload relevant documents: contracts, letters, correspondence, etc.',
    dragHint: 'Drag files here',
    processing: 'Processing...',
    selectFile: 'Select file',
    takePhoto: 'Take photo',
    removeLabel: 'Remove {name}',
    errorType: '"{name}" has an unsupported file type.',
    errorSize: 'Maximum total size of {max} MB exceeded.',
  },

  searchableSelect: {
    placeholder: 'Search or select...',
    customPlaceholder: 'Enter insurance name',
    fromList: 'Select from list',
    enterOther: 'Enter other...',
    openDropdown: 'Open dropdown',
  },

  address: {
    enterAddress: 'Enter address...',
    manualEntry: 'Enter manually',
    useAutocomplete: 'Use Google Autocomplete',
    strasse: 'Street + Number',
    plz: 'Postal code',
    ort: 'City',
    placeholderStrasse: 'Main Street 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
  },

  rechtsgebietOptionen: [
    { value: 'kuendigung', label: 'Termination' },
    { value: 'lohnforderung', label: 'Wage claim' },
    { value: 'zeugnisberichtigung', label: 'Certificate correction' },
    { value: 'zeugniserstellung', label: 'Certificate creation' },
    { value: 'abmahnung', label: 'Warning' },
    { value: 'aufhebungsvertrag', label: 'Termination agreement' },
    { value: 'abfindung', label: 'Severance' },
    { value: 'befristung', label: 'Fixed-term contract' },
    { value: 'versetzung', label: 'Transfer' },
    { value: 'diskriminierung', label: 'Discrimination' },
    { value: 'mobbing', label: 'Workplace bullying' },
    { value: 'ueberstunden', label: 'Overtime' },
    { value: 'sonstiges', label: 'Other employment law' },
  ],

  validation: {
    vorname: 'Please enter your first name.',
    nachname: 'Please enter your last name.',
    geburtsdatum: 'Please enter your date of birth.',
    strasseHausnummer: 'Please enter street and house number.',
    plz: 'Please enter postal code.',
    ort: 'Please enter city.',
    handynummer: 'Please enter your mobile number.',
    emailRequired: 'Please enter your email.',
    emailInvalid: 'Please enter a valid email.',
    rechtsgebiet: 'Please select a legal topic.',
    rechtsgebietSonstiges: 'Please describe your concern.',
    gegnerName: 'Please enter the opposing party\'s name.',
    gegnerStrasse: 'Please enter the street.',
    gegnerPlz: 'Please enter the postal code.',
    gegnerOrt: 'Please enter the city.',
    rechtsschutz: 'Please indicate whether you have legal protection insurance.',
    rechtsschutzDauer: 'Please indicate how long you have had your insurance.',
    versicherungsgesellschaft: 'Please select your insurance company.',
    datenschutz: 'Please agree to the privacy policy.',
  },
};

export type Locale = 'de' | 'en';

export const allgemeinTranslations: Record<Locale, AllgemeinTranslations> = { de, en };
