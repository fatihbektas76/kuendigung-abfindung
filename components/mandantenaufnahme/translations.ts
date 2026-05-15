const de = {
  // Language toggle
  langLabel: 'Sprache',

  // Progress bar
  progress: {
    step1: 'Persönlich',
    step2: 'Familie',
    step3: 'Arbeit',
    step4: 'Kündigung',
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
    warningText: 'Falls Sie eine Kündigung erhalten haben, beachten Sie die 3-Wochen-Klagefrist (§4 KSchG). Bei Fragen erreichen Sie uns telefonisch unter +49 6222 9599 2400.',
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

  // Step 2 — Family
  step2: {
    heading: 'Familienstatus',
    description: 'Diese Angaben sind für die Berechnung der Abfindung und Sozialauswahl relevant.',
    beziehungsstatus: 'Beziehungsstatus',
    selectPlaceholder: 'Bitte wählen',
    kinderFrage: 'Haben Sie Kinder?',
    ja: 'Ja',
    nein: 'Nein',
    wieViele: 'Wie viele Kinder?',
    alterKinder: 'Alter der Kinder',
    placeholderAlter: 'z.B. 3, 7, 12',
    alterHint: 'Kommagetrennt, z.B. "3, 7, 12"',
    kindLabel: 'Kind',
  },

  // Step 3 — Employment
  step3: {
    heading: 'Arbeitsverhältnis',
    description: 'Angaben zu Ihrem Arbeitgeber und Ihrer Beschäftigung.',
    berufsbezeichnung: 'Berufsbezeichnung',
    arbeitsort: 'Arbeitsort',
    bruttomonatslohn: 'Bruttomonatslohn (€)',
    eintrittsdatum: 'Eintritt im Unternehmen',
    betriebsratFrage: 'Gibt es einen Betriebsrat?',
    kuendigungsschutz: 'Besonderer Kündigungsschutz',
    ja: 'Ja',
    nein: 'Nein',
    placeholderBeruf: 'z.B. Projektmanager',
    placeholderOrt: 'z.B. Heidelberg',
    placeholderLohn: '4.500',
  },

  // Step 4 — Termination & Insurance
  step4: {
    heading: 'Kündigung & Versicherung',
    description: 'Angaben zur Kündigung und Rechtsschutzversicherung.',
    anzahlFrage: 'Wie viele Kündigungen sind eingegangen?',
    dreiOderMehr: '3 oder mehr',
    kuendigung: 'Kündigung',
    kuendigungNr: '{n}. Kündigung',
    kuendigungZuWann: 'Kündigung zu wann?',
    wannEingegangen: 'Wann eingegangen?',
    rsvFrage: 'Haben Sie eine Rechtsschutzversicherung (RSV)?',
    ja: 'Ja',
    nein: 'Nein',
    versicherungsgesellschaft: 'Versicherungsgesellschaft',
    versicherungsnummer: 'Versicherungsnummer',
    placeholderVsnr: 'z.B. RS-123456789',
  },

  // Step 5 — Documents & Submit
  step5: {
    heading: 'Dokumente & Absenden',
    description: 'Laden Sie relevante Unterlagen hoch und senden Sie Ihre Mandantenaufnahme ab.',
    warningLabel: 'Wichtiger Hinweis:',
    warningText: 'Falls Sie eine Kündigung erhalten haben, beachten Sie die 3-Wochen-Klagefrist (§ 4 KSchG). Kontaktieren Sie uns umgehend.',
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
    description: 'Laden Sie relevante Dokumente hoch: Kündigungsschreiben, Arbeitsvertrag, Gehaltsabrechnungen etc.',
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

  // Multi select
  multiSelect: {
    placeholder: 'Bitte wählen',
    sonstigPlaceholder: 'Welcher Sonderschutz?',
    removeLabel: '{label} entfernen',
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

  // Company autocomplete
  company: {
    label: 'Name des Arbeitgebers',
    searchPlaceholder: 'Firma suchen...',
    manualEntry: 'Manuell eingeben',
    searchCompany: 'Firma suchen',
    placeholderName: 'Firma GmbH',
  },

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
    beziehungsstatus: 'Bitte Beziehungsstatus wählen.',
    kinder: 'Bitte angeben, ob Sie Kinder haben.',
    kinderAnzahl: 'Bitte Anzahl der Kinder eingeben.',
    arbeitgeberName: 'Bitte Arbeitgeber eingeben.',
    arbeitgeberStrasse: 'Bitte Straße eingeben.',
    arbeitgeberPlz: 'Bitte PLZ eingeben.',
    arbeitgeberOrt: 'Bitte Ort eingeben.',
    berufsbezeichnung: 'Bitte Berufsbezeichnung eingeben.',
    arbeitsort: 'Bitte Arbeitsort eingeben.',
    bruttomonatslohn: 'Bitte Bruttomonatslohn eingeben.',
    eintrittsdatum: 'Bitte Eintrittsdatum eingeben.',
    betriebsrat: 'Bitte angeben, ob ein Betriebsrat existiert.',
    kuendigungsAnzahl: 'Bitte Anzahl der Kündigungen wählen.',
    kuendigungsDatum: 'Bitte Datum eingeben.',
    zugangsDatum: 'Bitte Datum eingeben.',
    rechtsschutz: 'Bitte angeben, ob Sie eine RSV haben.',
    versicherungsgesellschaft: 'Bitte Versicherung wählen.',
    datenschutz: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
  },

  // Options — Beziehungsstatus
  beziehungsstatusOptionen: [
    { value: 'ledig', label: 'Ledig' },
    { value: 'verheiratet', label: 'Verheiratet' },
    { value: 'geschieden', label: 'Geschieden' },
    { value: 'verwitwet', label: 'Verwitwet' },
    { value: 'getrennt', label: 'Getrennt lebend' },
  ],

  // Options — Kündigungsschutz
  kuendigungsschutzOptionen: [
    { value: 'keiner', label: 'Keiner' },
    { value: 'schwangerschaft', label: 'Schwangerschaft / Mutterschutz' },
    { value: 'elternzeit', label: 'Elternzeit' },
    { value: 'schwerbehinderung', label: 'Schwerbehinderung (GdB ≥ 50)' },
    { value: 'gleichstellung', label: 'Gleichstellung (GdB 30–49)' },
    { value: 'betriebsrat', label: 'Betriebsratsmitglied' },
    { value: 'datenschutz', label: 'Datenschutzbeauftragter' },
    { value: 'azubi', label: 'Azubi nach Probezeit' },
    { value: 'sonstig', label: 'Sonstiger' },
  ],
};

type DeepStringify<T> = T extends readonly (infer U)[]
  ? DeepStringify<U>[]
  : T extends object
  ? { [K in keyof T]: DeepStringify<T[K]> }
  : T extends string
  ? string
  : T;

export type Translations = DeepStringify<typeof de>;

const en: Translations = {
  langLabel: 'Language',

  progress: {
    step1: 'Personal',
    step2: 'Family',
    step3: 'Employment',
    step4: 'Termination',
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
    warningText: 'If you have received a termination notice, please note the 3-week filing deadline (§4 KSchG). For questions, call us at +49 6222 9599 2400.',
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

  step2: {
    heading: 'Family status',
    description: 'This information is relevant for severance pay calculation and social selection.',
    beziehungsstatus: 'Relationship status',
    selectPlaceholder: 'Please select',
    kinderFrage: 'Do you have children?',
    ja: 'Yes',
    nein: 'No',
    wieViele: 'How many children?',
    alterKinder: 'Ages of children',
    placeholderAlter: 'e.g. 3, 7, 12',
    alterHint: 'Comma-separated, e.g. "3, 7, 12"',
    kindLabel: 'Child',
  },

  step3: {
    heading: 'Employment',
    description: 'Details about your employer and employment.',
    berufsbezeichnung: 'Job title',
    arbeitsort: 'Place of work',
    bruttomonatslohn: 'Gross monthly salary (€)',
    eintrittsdatum: 'Start date at company',
    betriebsratFrage: 'Is there a works council?',
    kuendigungsschutz: 'Special dismissal protection',
    ja: 'Yes',
    nein: 'No',
    placeholderBeruf: 'e.g. Project Manager',
    placeholderOrt: 'e.g. Heidelberg',
    placeholderLohn: '4,500',
  },

  step4: {
    heading: 'Termination & Insurance',
    description: 'Details about your termination and legal protection insurance.',
    anzahlFrage: 'How many terminations have been received?',
    dreiOderMehr: '3 or more',
    kuendigung: 'Termination',
    kuendigungNr: '{n}. Termination',
    kuendigungZuWann: 'Termination effective date?',
    wannEingegangen: 'Date received?',
    rsvFrage: 'Do you have legal protection insurance?',
    ja: 'Yes',
    nein: 'No',
    versicherungsgesellschaft: 'Insurance company',
    versicherungsnummer: 'Policy number',
    placeholderVsnr: 'e.g. RS-123456789',
  },

  step5: {
    heading: 'Documents & Submit',
    description: 'Upload relevant documents and submit your client intake.',
    warningLabel: 'Important notice:',
    warningText: 'If you have received a termination notice, please note the 3-week filing deadline (§ 4 KSchG). Contact us immediately.',
    datenschutzPre: 'I have read the',
    datenschutzLink: 'privacy policy',
    datenschutzPost: 'and consent to the processing of my data for handling my case.',
    submitButton: 'Submit client intake',
    submitting: 'Submitting...',
    submitHint: 'Your data is transmitted encrypted and used exclusively for processing your case.',
  },

  fileUpload: {
    label: 'Upload documents',
    description: 'Upload relevant documents: termination letter, employment contract, pay slips, etc.',
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

  multiSelect: {
    placeholder: 'Please select',
    sonstigPlaceholder: 'Which special protection?',
    removeLabel: 'Remove {label}',
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

  company: {
    label: 'Employer name',
    searchPlaceholder: 'Search company...',
    manualEntry: 'Enter manually',
    searchCompany: 'Search company',
    placeholderName: 'Company Ltd.',
  },

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
    beziehungsstatus: 'Please select your relationship status.',
    kinder: 'Please indicate whether you have children.',
    kinderAnzahl: 'Please enter the number of children.',
    arbeitgeberName: 'Please enter your employer.',
    arbeitgeberStrasse: 'Please enter the street.',
    arbeitgeberPlz: 'Please enter the postal code.',
    arbeitgeberOrt: 'Please enter the city.',
    berufsbezeichnung: 'Please enter your job title.',
    arbeitsort: 'Please enter your place of work.',
    bruttomonatslohn: 'Please enter your gross monthly salary.',
    eintrittsdatum: 'Please enter your start date.',
    betriebsrat: 'Please indicate whether a works council exists.',
    kuendigungsAnzahl: 'Please select the number of terminations.',
    kuendigungsDatum: 'Please enter the date.',
    zugangsDatum: 'Please enter the date.',
    rechtsschutz: 'Please indicate whether you have legal protection insurance.',
    versicherungsgesellschaft: 'Please select your insurance company.',
    datenschutz: 'Please agree to the privacy policy.',
  },

  beziehungsstatusOptionen: [
    { value: 'ledig', label: 'Single' },
    { value: 'verheiratet', label: 'Married' },
    { value: 'geschieden', label: 'Divorced' },
    { value: 'verwitwet', label: 'Widowed' },
    { value: 'getrennt', label: 'Separated' },
  ],

  kuendigungsschutzOptionen: [
    { value: 'keiner', label: 'None' },
    { value: 'schwangerschaft', label: 'Pregnancy / Maternity protection' },
    { value: 'elternzeit', label: 'Parental leave' },
    { value: 'schwerbehinderung', label: 'Severe disability (GdB ≥ 50)' },
    { value: 'gleichstellung', label: 'Equal status (GdB 30–49)' },
    { value: 'betriebsrat', label: 'Works council member' },
    { value: 'datenschutz', label: 'Data protection officer' },
    { value: 'azubi', label: 'Apprentice after probation' },
    { value: 'sonstig', label: 'Other' },
  ],
};

export type Locale = 'de' | 'en';

export const translations: Record<Locale, Translations> = { de, en };
