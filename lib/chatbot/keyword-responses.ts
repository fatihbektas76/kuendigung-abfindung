export interface KeywordEntry {
  keywords: string[];
  response: string;
  toolLink?: { label: string; href: string };
}

// Jeder Eintrag hat eine Liste von Keywords (lowercase).
// Je mehr Keywords aus der Nutzereingabe matchen, desto besser der Treffer.

export const KEYWORD_RESPONSES: KeywordEntry[] = [
  // ── Kuendigung erhalten ──
  {
    keywords: ['gekuendigt', 'kuendigung', 'kuendigung erhalten', 'entlassen', 'gefeuert', 'rausgeworfen', 'arbeitgeber kuendigt', 'gekündigt', 'kündigung'],
    response:
      'Unterschreiben Sie nichts und bewahren Sie die Kuendigung auf. Notieren Sie das Datum, an dem Sie die Kuendigung erhalten haben. Sie haben nur 3 Wochen ab Zugang, um eine Kuendigungsschutzklage einzureichen (§ 4 KSchG). Lassen Sie die Kuendigung sofort von einem Fachanwalt pruefen.\n\nDie kostenlose Ersteinschaetzung bei APOS Legal hilft Ihnen, Ihre Optionen schnell zu klaeren.',
    toolLink: { label: 'Kuendigung jetzt pruefen', href: '/kuendigung-pruefen' },
  },
  {
    keywords: ['frist', 'zeit', 'reagieren', 'wie lange', '3 wochen', 'drei wochen', 'klagefrist', 'verspaetet', 'zu spaet', 'verspätet', 'zu spät'],
    response:
      'Die Klagefrist betraegt nur 3 Wochen ab Zugang der Kuendigung (§ 4 KSchG). Diese Frist ist streng — wird sie versaeumt, gilt die Kuendigung als wirksam, selbst wenn sie rechtswidrig war. Melden Sie sich daher sofort bei einem Fachanwalt.\n\nWichtig: Sie muessen sich zusaetzlich spaetestens 3 Tage nach Erhalt der Kuendigung bei der Agentur fuer Arbeit arbeitssuchend melden.',
  },
  {
    keywords: ['kuendigungsfrist', 'kündigungsfrist', 'welche frist', 'frist arbeitgeber', '622', 'bgb', 'gesetzlich'],
    response:
      'Die gesetzliche Kuendigungsfrist betraegt 4 Wochen zum 15. oder zum Monatsende (§ 622 BGB). Bei laengerer Betriebszugehoerigkeit verlaengert sich die Frist fuer den Arbeitgeber: nach 2 Jahren auf 1 Monat, nach 5 Jahren auf 2 Monate, bis zu 7 Monaten nach 20 Jahren.\n\nPruefen Sie auch Ihren Arbeitsvertrag — dort koennen abweichende Regelungen stehen.',
    toolLink: { label: 'Frist berechnen', href: '/kuendigungsfrist-rechner' },
  },
  {
    keywords: ['unwirksam', 'ungueltig', 'ungültig', 'fehler', 'formfehler', 'sozialauswahl', 'betriebsrat'],
    response:
      'Ja, eine Kuendigung kann aus vielen Gruenden unwirksam sein: fehlende Sozialauswahl, Formfehler, fehlerhafte Betriebsratsanhoerung, Kuendigung waehrend Schwangerschaft oder Elternzeit, oder fehlende Begruendung bei betriebsbedingter Kuendigung.\n\nEin Fachanwalt prueft das kostenlos fuer Sie bei APOS Legal.',
    toolLink: { label: 'Kuendigung pruefen lassen', href: '/kuendigung-pruefen' },
  },
  {
    keywords: ['weiterarbeiten', 'freistellung', 'freigestellt', 'arbeiten bis', 'kuendigungsfrist arbeiten'],
    response:
      'Grundsaetzlich sind Sie bis zum Ende der Kuendigungsfrist zur Arbeit verpflichtet. Ihr Arbeitgeber kann Sie jedoch freistellen. Bei einer Freistellung behalten Sie Ihren Gehaltsanspruch. Pruefen Sie, ob eine Freistellung in Ihrem Arbeitsvertrag geregelt ist.',
  },
  {
    keywords: ['fristlos', 'fristlose', 'ausserordentlich', 'sofort entlassen', 'sofortige kuendigung', 'wichtiger grund', '626'],
    response:
      'Eine fristlose (ausserordentliche) Kuendigung beendet das Arbeitsverhaeltnis sofort. Sie ist nur bei einem wichtigen Grund zulaessig (§ 626 BGB), z.B. Diebstahl, Arbeitszeitbetrug oder schwere Beleidigung. Auch hier gilt die 3-Wochen-Klagefrist — handeln Sie sofort!\n\nFachanwalt Fatih Bektas prueft kostenlos, ob die fristlose Kuendigung rechtmaessig ist.',
  },

  // ── Abfindung ──
  {
    keywords: ['abfindung', 'abfindungsanspruch', 'anspruch auf abfindung', 'geld bekommen', 'abfindung zustehen'],
    response:
      'Einen automatischen gesetzlichen Anspruch auf Abfindung gibt es nicht. In der Praxis werden Abfindungen aber haeufig im Rahmen von Kuendigungsschutzklagen oder Aufhebungsvertraegen verhandelt. Je besser Ihre Klageposition, desto hoeher faellt die Abfindung in der Regel aus.',
    toolLink: { label: 'Abfindung berechnen', href: '/abfindungsrechner' },
  },
  {
    keywords: ['abfindung berechnen', 'abfindung hoehe', 'abfindungshöhe', 'wie viel abfindung', 'wieviel abfindung', 'faustformel', 'bruttomonatsgehalt'],
    response:
      'Die gaengige Faustformel lautet: 0,5 Bruttomonatsgehaelter pro Beschaeftigungsjahr. Bei guter Verhandlungsposition oder besonderen Umstaenden (Sonderkuendigungsschutz, lange Betriebszugehoerigkeit) kann der Faktor auf 1,0 oder mehr steigen.\n\nBeispiel: Bei 10 Jahren und 4.000 EUR brutto waeren das mindestens 20.000 EUR.',
    toolLink: { label: 'Abfindung berechnen', href: '/abfindungsrechner' },
  },
  {
    keywords: ['abfindung steuer', 'abfindung versteuern', 'fuenftelregelung', 'fünftelregelung', 'steuerpflichtig'],
    response:
      'Ja, Abfindungen sind steuerpflichtig. Es gibt jedoch die Fuenftelregelung (§ 34 EStG), die die Steuerlast deutlich senken kann. Sozialversicherungsbeitraege fallen auf Abfindungen nicht an. Ein Steuerberater kann die optimale Gestaltung berechnen.',
  },
  {
    keywords: ['abfindung verhandeln', 'hoehere abfindung', 'höhere abfindung', 'mehr abfindung', 'abfindung erhoehen', 'abfindung erhöhen'],
    response:
      'Ja, die Hoehe der Abfindung ist fast immer Verhandlungssache. Faktoren, die Ihre Position staerken: unwirksame Kuendigung, lange Betriebszugehoerigkeit, Sonderkuendigungsschutz, gute Leistungen. Ein erfahrener Fachanwalt kann deutlich mehr herausholen als die Faustformel.\n\nFachanwalt Fatih Bektas hat in ueber 2.000 Verfahren Abfindungen verhandelt.',
  },

  // ── Aufhebungsvertrag ──
  {
    keywords: ['aufhebungsvertrag', 'aufhebung', 'einvernehmlich', 'vertrag unterschreiben', 'aufloesung'],
    response:
      'Ein Aufhebungsvertrag ist eine einvernehmliche Beendigung des Arbeitsverhaeltnisses. Wichtig: Sie muessen nicht zustimmen! Lassen Sie den Vertrag vor der Unterschrift pruefen, da er weitreichende Folgen hat (Sperrzeit beim Arbeitslosengeld, Abfindungshoehe).\n\nBei APOS Legal pruefen wir Ihren Aufhebungsvertrag kostenlos.',
    toolLink: { label: 'Aufhebungsvertrag pruefen', href: '/aufhebungsvertrag-pruefen' },
  },
  {
    keywords: ['unterschreiben', 'sofort unterschreiben', 'druck', 'unter druck', 'schnell unterschreiben', 'bedenkzeit'],
    response:
      'Lassen Sie sich nie unter Druck setzen! Sie haben das Recht, den Vertrag in Ruhe zu pruefen und anwaltlich beraten zu lassen. Seriose Arbeitgeber raeumen Ihnen eine Bedenkzeit ein. Eine uebereilte Unterschrift kann Sie teuer zu stehen kommen.\n\nTipp: Sagen Sie „Ich moechte das noch pruefen lassen" — das ist Ihr gutes Recht.',
  },
  {
    keywords: ['sperrzeit', 'arbeitslosengeld', 'arbeitsamt', 'agentur fuer arbeit', 'agentur für arbeit', 'sperrfrist', 'sperre'],
    response:
      'Bei einem Aufhebungsvertrag droht grundsaetzlich eine Sperrzeit von bis zu 12 Wochen beim Arbeitslosengeld. Diese kann jedoch vermieden werden, wenn der Arbeitgeber ohnehin betriebsbedingt gekuendigt haette und die Abfindung nicht mehr als 0,5 Monatsgehaelter pro Jahr betraegt.\n\nEin Fachanwalt kann den Vertrag so gestalten, dass keine Sperrzeit droht.',
  },
  {
    keywords: ['widerruf', 'widerrufen', 'rueckgaengig', 'rückgängig', 'zuruecknehmen', 'zurücknehmen', 'anfechten'],
    response:
      'Ein Widerruf ist nur in seltenen Ausnahmefaellen moeglich, z.B. bei Drohung oder arglistiger Taeuschung. Deshalb gilt: Niemals vorschnell unterschreiben. Einmal unterschrieben, ist der Aufhebungsvertrag in der Regel bindend.\n\nWenn Sie bereits unterschrieben haben, pruefen wir, ob eine Anfechtung moeglich ist.',
  },

  // ── Kuendigungsschutzklage ──
  {
    keywords: ['klage', 'klagen', 'kuendigungsschutzklage', 'kündigungsschutzklage', 'gericht', 'arbeitsgericht', 'vor gericht'],
    response:
      'Eine Kuendigungsschutzklage muss innerhalb von 3 Wochen nach Zugang der Kuendigung eingereicht werden. Im Arbeitsrecht traegt in der ersten Instanz jede Partei ihre eigenen Anwaltskosten. Viele Verfahren enden bereits im Guetetermin mit einem Vergleich und einer Abfindung.\n\nFachanwalt Fatih Bektas hat ueber 2.000 Verfahren vor Arbeitsgerichten gefuehrt.',
  },
  {
    keywords: ['klage kosten', 'klage preis', 'anwalt kosten klage', 'verfahrenskosten', 'gerichtskosten'],
    response:
      'Im Arbeitsrecht traegt in der ersten Instanz jede Partei ihre eigenen Anwaltskosten — auch wenn Sie gewinnen. Die Kosten richten sich nach dem Streitwert (in der Regel 3 Bruttomonatsgehaelter). Bei einem Gehalt von 4.000 EUR brutto liegen die Anwaltskosten bei ca. 2.500 EUR.\n\nHaben Sie eine Rechtsschutzversicherung? Dann werden die Kosten oft uebernommen.',
  },
  {
    keywords: ['klage dauer', 'wie lange klage', 'verfahrensdauer', 'guetetermin', 'gütetermin'],
    response:
      'Eine Kuendigungsschutzklage dauert in der ersten Instanz meist 3 bis 6 Monate. Der erste Termin (Guetetermin) findet bereits nach 2 bis 4 Wochen statt. Viele Verfahren enden bereits im Guetetermin mit einem Vergleich und einer Abfindung.',
  },
  {
    keywords: ['frist verpasst', 'frist versaeumt', 'frist versäumt', 'zu spaet geklagt', 'verspätete klage', 'nachtraeglich klagen'],
    response:
      'Wenn die 3-Wochen-Frist abgelaufen ist, gilt die Kuendigung grundsaetzlich als wirksam — auch wenn sie rechtswidrig war. Nur in Ausnahmefaellen (z.B. Krankheit, nicht nachweislicher Zugang) kann eine nachtraegliche Klagezulassung beantragt werden.\n\nHandeln Sie sofort — kontaktieren Sie uns, um zu pruefen, ob noch Moeglichkeiten bestehen.',
  },

  // ── Kosten & Rechtsschutz ──
  {
    keywords: ['kosten', 'preis', 'teuer', 'was kostet', 'anwaltskosten', 'gebuehren', 'gebühren', 'bezahlen'],
    response:
      'Bei APOS Legal ist die telefonische Ersteinschaetzung kostenlos und unverbindlich. Die weiteren Kosten richten sich nach dem Rechtsanwaltsvergaetungsgesetz (RVG) und dem Streitwert. Bei einem Monatsgehalt von 4.000 EUR brutto liegen die Gebuehren bei ca. 2.000–3.000 EUR fuer die erste Instanz.\n\nMoechten Sie eine kostenlose Ersteinschaetzung?',
  },
  {
    keywords: ['rechtsschutz', 'rechtsschutzversicherung', 'rsv', 'versicherung', 'deckungszusage', 'versicherung zahlt'],
    response:
      'Wenn Ihre Rechtsschutzversicherung einen Arbeitsrechtsschutz umfasst und die Wartezeit abgelaufen ist (meist 3 Monate), werden die Anwalts- und Gerichtskosten in der Regel uebernommen. Holen Sie vor Klageerhebung eine Deckungszusage ein.\n\nWir klaeren die Deckungszusage gerne fuer Sie — kostenlos.',
  },
  {
    keywords: ['erstberatung', 'beratung', 'ersteinschaetzung', 'erstgespräch', 'erstgespraech', 'kostenlos'],
    response:
      'Bei APOS Legal ist die telefonische Ersteinschaetzung kostenlos und unverbindlich. Fachanwalt Fatih Bektas prueft Ihre Situation persoenlich und gibt Ihnen eine ehrliche Einschaetzung, ob sich ein weiteres Vorgehen lohnt.\n\nMoechten Sie Ihre Kontaktdaten hinterlassen? Wir melden uns in Kuerze bei Ihnen.',
  },

  // ── Arbeitslosenmeldung ──
  {
    keywords: ['arbeitslos melden', 'arbeitslos', 'arbeitslosenmeldung', 'agentur melden', 'arbeitssuchend'],
    response:
      'Sie muessen sich spaetestens 3 Tage nach Erhalt der Kuendigung bei der Agentur fuer Arbeit arbeitssuchend melden — auch wenn Sie klagen. Versaeumen Sie dies, kann Ihr Arbeitslosengeld gekuerzt werden.\n\nDie Klage gegen die Kuendigung und die Arbeitslosmeldung schliessen sich nicht aus.',
  },

  // ── Probezeit ──
  {
    keywords: ['probezeit', 'probezeit kuendigung', 'probezeit gekuendigt', 'probezeit frist'],
    response:
      'Waehrend der Probezeit (max. 6 Monate) gilt eine verkuerzte Kuendigungsfrist von nur 2 Wochen. Eine Kuendigungsschutzklage ist in der Probezeit nur eingeschraenkt moeglich, da das Kuendigungsschutzgesetz erst nach 6 Monaten greift.\n\nTrotzdem: Auch in der Probezeit darf nicht willkuerlich gekuendigt werden.',
  },

  // ── Schwangerschaft / Elternzeit ──
  {
    keywords: ['schwangerschaft', 'schwanger', 'elternzeit', 'mutterschutz', 'schwanger kuendigung'],
    response:
      'Waehrend der Schwangerschaft und bis 4 Monate nach der Entbindung besteht ein besonderer Kuendigungsschutz (§ 17 MuSchG). Auch waehrend der Elternzeit ist eine Kuendigung nur in seltenen Ausnahmefaellen mit behoerdlicher Genehmigung zulaessig.\n\nEine Kuendigung in dieser Zeit ist fast immer unwirksam — lassen Sie das sofort pruefen.',
  },

  // ── Betriebsbedingte Kuendigung ──
  {
    keywords: ['betriebsbedingt', 'betriebsbedingte kuendigung', 'stellenabbau', 'restrukturierung', 'umstrukturierung'],
    response:
      'Bei einer betriebsbedingten Kuendigung muss der Arbeitgeber nachweisen, dass der Arbeitsplatz tatsaechlich wegfaellt und keine Weiterbeschaeftigung moeglich ist. Ausserdem muss eine korrekte Sozialauswahl durchgefuehrt werden.\n\nFehler bei der Sozialauswahl machen die Kuendigung angreifbar — das pruefen wir fuer Sie.',
  },

  // ── Abmahnung ──
  {
    keywords: ['abmahnung', 'abgemahnt', 'verwarnung', 'abmahnung erhalten'],
    response:
      'Eine Abmahnung ist noch keine Kuendigung, sondern eine Warnung. Sie ist Voraussetzung fuer eine verhaltensbedingte Kuendigung. Pruefen Sie, ob die Abmahnung berechtigt ist — wenn nicht, sollten Sie eine Gegendarstellung einreichen.\n\nFachanwalt Fatih Bektas prueft Ihre Abmahnung kostenlos.',
  },

  // ── Zeugnis ──
  {
    keywords: ['zeugnis', 'arbeitszeugnis', 'zeugnis schlecht', 'zeugnis pruefen', 'zeugnissprache'],
    response:
      'Sie haben Anspruch auf ein wohlwollendes, wahrheitsgemaesses Arbeitszeugnis. Die Zeugnissprache enthaelt oft versteckte Bewertungen. Ein „stets zu unserer vollen Zufriedenheit" bedeutet Note 1, waehrend „zu unserer Zufriedenheit" nur Note 4 ist.\n\nWir pruefen Ihr Zeugnis und setzen bei Bedarf Korrekturen durch.',
  },

  // ── Kontakt / Termin ──
  {
    keywords: ['kontakt', 'termin', 'anrufen', 'telefon', 'erreichen', 'sprechen', 'melden'],
    response:
      'Sie erreichen APOS Legal in Heidelberg fuer eine kostenlose Ersteinschaetzung. Fachanwalt Fatih Bektas prueft Ihren Fall persoenlich.\n\nMoechten Sie Ihre Kontaktdaten hinterlassen? Wir melden uns schnellstmoeglich bei Ihnen.',
  },

  // ── Allgemeine Begruessung ──
  {
    keywords: ['hallo', 'hi', 'hey', 'guten tag', 'guten morgen', 'guten abend', 'moin'],
    response:
      'Hallo! Wie kann ich Ihnen helfen? Ich beantworte gerne Ihre Fragen zu Kuendigung, Abfindung, Aufhebungsvertrag und Arbeitsrecht.\n\nSie koennen mir einfach Ihre Frage schreiben.',
  },

  // ── Danke ──
  {
    keywords: ['danke', 'vielen dank', 'dankeschoen', 'dankeschön', 'super', 'toll'],
    response:
      'Gerne! Wenn Sie weitere Fragen haben, schreiben Sie mir einfach. Fuer eine persoenliche Einschaetzung Ihrer Situation steht Ihnen Fachanwalt Fatih Bektas kostenlos zur Verfuegung.',
  },
];

export const FALLBACK_RESPONSE =
  'Das kann ich leider nicht genau beantworten. Fuer eine persoenliche Einschaetzung Ihrer Situation empfehle ich Ihnen die kostenlose Ersteinschaetzung durch Fachanwalt Fatih Bektas bei APOS Legal.\n\nSie koennen mir auch eine andere Frage stellen — z.B. zu Kuendigung, Abfindung oder Aufhebungsvertrag.';
