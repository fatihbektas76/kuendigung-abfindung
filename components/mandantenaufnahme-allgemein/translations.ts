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
    heading: 'Ihre Daten',
    description: 'Bitte geben Sie an, ob Sie als Privatperson oder als Unternehmen Mandantin/Mandant werden möchten.',
    typFrage: 'Sie sind ...',
    typPrivat: 'Privatperson',
    typUnternehmen: 'Unternehmen',
    vorname: 'Vorname',
    nachname: 'Nachname',
    geburtsdatum: 'Geburtsdatum',
    firmenname: 'Firmenname',
    rechtsform: 'Rechtsform',
    vertretungsberechtigt: 'Vertretungsberechtigte Person',
    adresse: 'Anschrift',
    handynummer: 'Telefonnummer',
    email: 'E-Mail',
    emailHint: 'Wir senden Ihnen die Vollmacht an diese Adresse. Sie wird nach Eingabe automatisch geprüft.',
    didYouMean: 'Meinten Sie',
    useSuggestion: 'übernehmen',
    emailChecking: 'E-Mail wird geprüft …',
    emailValid: 'E-Mail-Adresse ist erreichbar.',
    emailInvalidDomain: 'Diese Domain existiert nicht oder empfängt keine Mails.',
    emailDisposable: 'Wegwerf-Adressen werden nicht akzeptiert. Bitte private E-Mail verwenden.',
    emailInvalidFormat: 'Bitte gültige E-Mail eingeben.',
    emailUnknownWarn: 'Die Adresse konnte nicht geprüft werden. Bitte kontrollieren Sie sie noch einmal.',
    placeholderVorname: 'Max',
    placeholderNachname: 'Mustermann',
    placeholderFirmenname: 'Muster GmbH',
    placeholderRechtsform: 'z.B. GmbH, AG, OHG, e.K., GbR',
    placeholderVertretung: 'Vor- und Nachname (z.B. Geschäftsführer)',
    placeholderPhone: '+49 151 1234 5678',
    placeholderEmail: 'max@beispiel.de',
  },

  // Step 2 — Legal topic
  step3: {
    heading: 'Rechtsgebiet',
    description: 'Wählen Sie das Thema, zu dem Sie Unterstützung benötigen — und ergänzen Sie optional eine eigene Beschreibung.',
    rechtsgebiet: 'Um welches Thema geht es?',
    selectPlaceholder: 'Bitte wählen',
    sonstigesLabel: 'Eigene Beschreibung oder ergänzende Angaben',
    sonstigesHint: 'Optional, kann zusätzlich zur Auswahl ausgefüllt werden.',
    sonstigesHintRequired: 'Bitte beschreiben Sie kurz, um welches Thema es geht.',
    sonstigesPlaceholder: 'z.B. Betriebsvereinbarung, Altersteilzeit, kombiniertes Anliegen ...',
  },

  // Step 4 — Opposing party
  step4: {
    heading: 'Angaben zum Gegner',
    description: 'Geben Sie an, ob die Gegenpartei eine Privatperson oder ein Unternehmen ist.',
    typFrage: 'Der Gegner ist ...',
    typPrivat: 'Privatperson',
    typUnternehmen: 'Unternehmen',
    gegnerName: 'Name / Firma',
    gegnerNamePrivat: 'Vor- und Nachname',
    gegnerNameFirma: 'Firmenname',
    gegnerRechtsform: 'Rechtsform (optional)',
    gegnerStrasse: 'Straße & Hausnummer',
    gegnerPlz: 'PLZ',
    gegnerOrt: 'Ort',
    gegnerAnsprechpartner: 'Ansprechpartner (optional)',
    gegnerEmail: 'E-Mail (optional)',
    placeholderName: 'Firma GmbH',
    placeholderNamePrivat: 'Erika Musterfrau',
    placeholderRechtsformGegner: 'z.B. GmbH, AG, OHG',
    placeholderStrasse: 'Musterstraße 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
    placeholderAnsprechpartner: 'z.B. Frau Müller, Personalabteilung',
    placeholderGegnerEmail: 'info@firma.de',
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
    scanning: 'Fotos werden als Scan-PDF optimiert...',
    selectFile: 'Datei auswählen',
    takePhoto: 'Foto aufnehmen',
    removeLabel: '{name} entfernen',
    errorType: '"{name}" hat einen nicht unterstützten Dateityp.',
    errorSize: 'Maximale Gesamtgröße von {max} MB überschritten.',
    scanBadge: 'Scan-PDF',
    sizeReduced: 'von {from}',
    hintScan: 'Fotos werden automatisch begradigt, aufgehellt und als kompaktes PDF hochgeladen.',
    combineButton: 'Alle Scans zu einem PDF zusammenfassen',
    combineName: 'Dokument-Scan.pdf',
  },

  deskew: {
    title: 'Ecken des Dokuments markieren',
    instruction: 'Ziehen Sie die vier Ecken auf die Ränder des Blatts. Das Bild wird begradigt.',
    loading: 'Bild wird geladen …',
    apply: 'Übernehmen',
    skip: 'Ohne Entzerrung',
    reset: 'Ecken zurücksetzen',
    close: 'Schließen',
  },

  reorder: {
    title: 'Scans zu einem PDF zusammenfassen',
    instruction: 'Reihenfolge der Seiten festlegen. Die einzelnen Scans werden ersetzt durch ein mehrseitiges PDF.',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
    combine: 'Zusammenfassen',
    cancel: 'Abbrechen',
    close: 'Schließen',
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
    { value: 'sonstiges', label: 'Sonstiges / anderes Thema' },
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
    emailNotReachable: 'E-Mail-Adresse konnte nicht bestätigt werden. Bitte prüfen.',
    rechtsgebiet: 'Bitte Rechtsgebiet wählen oder Anliegen beschreiben.',
    gegnerName: 'Bitte Name des Gegners eingeben.',
    gegnerStrasse: 'Bitte Straße eingeben.',
    gegnerPlz: 'Bitte PLZ eingeben.',
    gegnerOrt: 'Bitte Ort eingeben.',
    rechtsschutz: 'Bitte angeben, ob Sie eine RSV haben.',
    rechtsschutzDauer: 'Bitte angeben, wie lange Sie die RSV haben.',
    versicherungsgesellschaft: 'Bitte Versicherung wählen.',
    datenschutz: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    mandantTyp: 'Bitte wählen, ob Sie als Privatperson oder Unternehmen Mandant werden.',
    firmenname: 'Bitte Firmenname eingeben.',
    vertretungsberechtigt: 'Bitte vertretungsberechtigte Person eingeben.',
    gegnerTyp: 'Bitte wählen, ob der Gegner Privatperson oder Unternehmen ist.',
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
    heading: 'Your details',
    description: 'Please indicate whether you wish to be retained as a private individual or as a company.',
    typFrage: 'You are ...',
    typPrivat: 'Private individual',
    typUnternehmen: 'Company',
    vorname: 'First name',
    nachname: 'Last name',
    geburtsdatum: 'Date of birth',
    firmenname: 'Company name',
    rechtsform: 'Legal form',
    vertretungsberechtigt: 'Authorised representative',
    adresse: 'Address',
    handynummer: 'Phone number',
    email: 'Email',
    emailHint: 'We will send the power of attorney to this address. It is verified automatically after entry.',
    didYouMean: 'Did you mean',
    useSuggestion: 'use this',
    emailChecking: 'Verifying email …',
    emailValid: 'Email address is reachable.',
    emailInvalidDomain: 'This domain does not exist or does not accept mail.',
    emailDisposable: 'Disposable addresses are not accepted. Please use a private email.',
    emailInvalidFormat: 'Please enter a valid email.',
    emailUnknownWarn: 'The address could not be verified. Please double-check it.',
    placeholderVorname: 'John',
    placeholderNachname: 'Doe',
    placeholderFirmenname: 'Example Ltd.',
    placeholderRechtsform: 'e.g. Ltd., PLC, GmbH, AG',
    placeholderVertretung: 'First and last name (e.g. CEO)',
    placeholderPhone: '+49 151 1234 5678',
    placeholderEmail: 'john@example.com',
  },

  step3: {
    heading: 'Legal topic',
    description: 'Select the topic you need assistance with — and optionally add your own description.',
    rechtsgebiet: 'What is this about?',
    selectPlaceholder: 'Please select',
    sonstigesLabel: 'Own description or additional notes',
    sonstigesHint: 'Optional — can be filled in alongside the selection.',
    sonstigesHintRequired: 'Please briefly describe the topic.',
    sonstigesPlaceholder: 'e.g. Works agreement, partial retirement, combined matter ...',
  },

  step4: {
    heading: 'Opposing party details',
    description: 'Please indicate whether the opposing party is a private individual or a company.',
    typFrage: 'The opposing party is ...',
    typPrivat: 'Private individual',
    typUnternehmen: 'Company',
    gegnerName: 'Name / Company',
    gegnerNamePrivat: 'First and last name',
    gegnerNameFirma: 'Company name',
    gegnerRechtsform: 'Legal form (optional)',
    gegnerStrasse: 'Street & House number',
    gegnerPlz: 'Postal code',
    gegnerOrt: 'City',
    gegnerAnsprechpartner: 'Contact person (optional)',
    gegnerEmail: 'Email (optional)',
    placeholderName: 'Company Ltd.',
    placeholderNamePrivat: 'Jane Doe',
    placeholderRechtsformGegner: 'e.g. Ltd., PLC, GmbH',
    placeholderStrasse: 'Main Street 1',
    placeholderPlz: '69115',
    placeholderOrt: 'Heidelberg',
    placeholderAnsprechpartner: 'e.g. Mrs. Smith, HR Department',
    placeholderGegnerEmail: 'info@company.com',
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
    scanning: 'Optimising photos as scan PDF...',
    selectFile: 'Select file',
    takePhoto: 'Take photo',
    removeLabel: 'Remove {name}',
    errorType: '"{name}" has an unsupported file type.',
    errorSize: 'Maximum total size of {max} MB exceeded.',
    scanBadge: 'Scan PDF',
    sizeReduced: 'from {from}',
    hintScan: 'Photos are automatically brightened and uploaded as a compact PDF.',
    combineButton: 'Combine all scans into one PDF',
    combineName: 'Document-Scan.pdf',
  },

  deskew: {
    title: 'Mark the document corners',
    instruction: 'Drag the four corners to the edges of the sheet. The image will be straightened.',
    loading: 'Loading image …',
    apply: 'Apply',
    skip: 'Skip straightening',
    reset: 'Reset corners',
    close: 'Close',
  },

  reorder: {
    title: 'Combine scans into one PDF',
    instruction: 'Set the page order. The individual scans will be replaced by one multi-page PDF.',
    moveUp: 'Move up',
    moveDown: 'Move down',
    combine: 'Combine',
    cancel: 'Cancel',
    close: 'Close',
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
    { value: 'sonstiges', label: 'Other / custom topic' },
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
    emailNotReachable: 'Email address could not be verified. Please check.',
    rechtsgebiet: 'Please select a legal topic or describe your concern.',
    gegnerName: 'Please enter the opposing party\'s name.',
    gegnerStrasse: 'Please enter the street.',
    gegnerPlz: 'Please enter the postal code.',
    gegnerOrt: 'Please enter the city.',
    rechtsschutz: 'Please indicate whether you have legal protection insurance.',
    rechtsschutzDauer: 'Please indicate how long you have had your insurance.',
    versicherungsgesellschaft: 'Please select your insurance company.',
    datenschutz: 'Please agree to the privacy policy.',
    mandantTyp: 'Please choose whether you are a private individual or a company.',
    firmenname: 'Please enter the company name.',
    vertretungsberechtigt: 'Please enter the authorised representative.',
    gegnerTyp: 'Please indicate whether the opposing party is a private individual or a company.',
  },
};

export type Locale = 'de' | 'en';

export const allgemeinTranslations: Record<Locale, AllgemeinTranslations> = { de, en };
