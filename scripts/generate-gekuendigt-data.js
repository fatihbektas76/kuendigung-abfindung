const fs = require('fs');
const path = require('path');

// --- Kündigungsfristen nach § 622 Abs. 2 BGB ---
function getFrist(year) {
  if (year < 2) return { kurz: '4 Wochen', lang: '4 Wochen zum Fünfzehnten oder zum Ende des Kalendermonats', hinweis: 'Zum 15. oder zum Monatsende — Grundkündigungsfrist (§ 622 Abs. 1 BGB)' };
  if (year < 5) return { kurz: '1 Monat', lang: '1 Monat zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 2 Jahren Betriebszugehörigkeit' };
  if (year < 8) return { kurz: '2 Monate', lang: '2 Monate zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 5 Jahren Betriebszugehörigkeit' };
  if (year < 10) return { kurz: '3 Monate', lang: '3 Monate zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 8 Jahren Betriebszugehörigkeit' };
  if (year < 12) return { kurz: '4 Monate', lang: '4 Monate zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 10 Jahren Betriebszugehörigkeit' };
  if (year < 15) return { kurz: '5 Monate', lang: '5 Monate zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 12 Jahren Betriebszugehörigkeit' };
  if (year < 20) return { kurz: '6 Monate', lang: '6 Monate zum Ende des Kalendermonats', hinweis: 'Zum Ende des Kalendermonats — ab 15 Jahren Betriebszugehörigkeit' };
  return { kurz: '7 Monate', lang: '7 Monate zum Ende des Kalendermonats', hinweis: 'Maximale gesetzliche Frist — ab 20 Jahren Betriebszugehörigkeit' };
}

// --- Häufige Fehler des Arbeitgebers (max. 4, keine Dopplungen) ---
function getHaeufigeFehler(year) {
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;
  const frist = getFrist(year);

  if (year < 5) {
    return [
      `Kündigungsfrist falsch berechnet — nach ${yl} gilt: ${frist.lang} (§ 622 BGB)`,
      'Kündigung nicht schriftlich erteilt (§ 623 BGB) — mündliche Kündigung ist unwirksam',
      'Betriebsrat nicht ordnungsgemäß angehört (§ 102 BetrVG) — macht Kündigung unwirksam',
      'Keine vorherige Abmahnung bei verhaltensbedingter Kündigung',
    ];
  }
  if (year < 13) {
    return [
      `Verlängerte Kündigungsfrist von ${frist.kurz} nicht eingehalten (§ 622 Abs. 2 BGB)`,
      'Sozialauswahl fehlerhaft — Alter, Unterhaltspflichten und Betriebszugehörigkeit nicht berücksichtigt (§ 1 Abs. 3 KSchG)',
      'Betriebsrat nicht ordnungsgemäß angehört (§ 102 BetrVG)',
      'Keine Prüfung einer Weiterbeschäftigungsmöglichkeit auf einem anderen Arbeitsplatz',
    ];
  }
  if (year < 20) {
    return [
      `Kündigungsfrist von ${frist.kurz} zum Monatsende nicht beachtet (§ 622 Abs. 2 BGB)`,
      'Langjährige Mitarbeiter bei der Sozialauswahl benachteiligt — Betriebszugehörigkeit ist ein zentrales Kriterium',
      'Betriebsrat nicht ordnungsgemäß angehört (§ 102 BetrVG)',
      `Keine Berücksichtigung der schwierigen Arbeitsmarktlage für Arbeitnehmer mit ${yl} Betriebszugehörigkeit`,
    ];
  }
  return [
    `Kündigungsfrist von ${frist.kurz} zum Monatsende nicht eingehalten (§ 622 Abs. 2 BGB)`,
    'Besonderer Schutz langjähriger Mitarbeiter bei Sozialauswahl missachtet — Alter und Betriebszugehörigkeit wiegen schwer',
    'Betriebsrat nicht ordnungsgemäß angehört (§ 102 BetrVG)',
    `Keine angemessene Berücksichtigung der faktischen Unkündbarkeit nach ${yl}`,
  ];
}

// --- Beispielsfälle ---
const vornamen = ['Thomas', 'Sandra', 'Michael', 'Petra', 'Andreas', 'Claudia', 'Stefan', 'Sabine', 'Markus', 'Martina',
  'Jürgen', 'Birgit', 'Frank', 'Karin', 'Wolfgang', 'Susanne', 'Ralf', 'Monika', 'Bernd', 'Heike',
  'Uwe', 'Gabriele', 'Peter', 'Angelika', 'Holger', 'Ursula', 'Thorsten', 'Andrea', 'Norbert', 'Silke',
  'Dirk', 'Christine', 'Klaus', 'Elke', 'Manfred', 'Doris', 'Harald', 'Anja', 'Gerd', 'Bettina'];
const branchen = [
  'Vertrieb', 'Buchhaltung', 'IT-Abteilung', 'Produktion', 'Logistik', 'Einkauf', 'Personalwesen',
  'Marketing', 'Kundenservice', 'Verwaltung', 'Technik', 'Qualitätssicherung', 'Forschung & Entwicklung',
  'Außendienst', 'Controlling', 'Sachbearbeitung', 'Projektmanagement', 'Montage', 'Lager',
  'Geschäftsführungsassistenz', 'Finanzbuchhaltung', 'Konstruktion', 'Versand', 'Empfang',
  'Disposition', 'Arbeitsvorbereitung', 'Instandhaltung', 'Vertriebsinnendienst', 'Debitorenbuchhaltung',
  'Facility Management', 'Werkstatt', 'Einzelhandel', 'Gastronomie', 'Pflege', 'Sozialarbeit',
  'Redaktion', 'Grafik', 'Eventmanagement', 'Öffentlicher Dienst', 'Bildung'];
const kuendigungsarten = [
  'Betriebsbedingte Kündigung', 'Verhaltensbedingte Kündigung', 'Personenbedingte Kündigung',
  'Betriebsbedingte Kündigung', 'Fristlose Kündigung', 'Betriebsbedingte Kündigung',
];

function getBeispielsfall(year) {
  const idx = year - 1;
  const vorname = vornamen[idx % vornamen.length];
  const initial = vorname[0] + '.';
  const name = `${vorname} ${initial.replace('.', '')}` + '.';
  const branche = branchen[idx % branchen.length];
  const kuendigungsart = kuendigungsarten[idx % kuendigungsarten.length];
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;
  const frist = getFrist(year);

  // Gehalt variiert realistisch
  const basisGehalt = 2800 + (idx % 12) * 300;

  // Abfindung: typischerweise 0,75-1,5x Faustformel
  const faktor = [0.75, 1.0, 1.25, 1.5, 0.8, 1.1, 1.3, 1.0, 0.9, 1.2][idx % 10];
  const ergebnis = Math.round(basisGehalt * faktor * year / 100) * 100;

  const zitate = [
    `Ich war völlig geschockt. Nach ${yl} dachte ich, mein Job sei sicher. APOS Legal hat mir gezeigt, dass ich starke Rechte habe.`,
    `Die Kündigung kam aus heiterem Himmel. Ohne anwaltliche Hilfe hätte ich nicht gewusst, dass die Sozialauswahl fehlerhaft war.`,
    `Mein Arbeitgeber wollte mich mit einer minimalen Abfindung abspeisen. Dank APOS Legal konnte ich deutlich mehr herausholen.`,
    `Ich hatte Angst, alles zu verlieren. Die schnelle Reaktion der Kanzlei hat die Frist gerettet und eine gute Abfindung erzielt.`,
    `Nach ${yl} im Betrieb fühlte ich mich wie ein Stück Inventar, das man entsorgt. Die Kanzlei hat für meine Rechte gekämpft.`,
    `Die Kündigung war formal fehlerhaft — das hätte ich ohne Anwalt nie erkannt. Am Ende stand eine faire Abfindung.`,
    `Ich wurde unter Druck gesetzt, einen Aufhebungsvertrag zu unterschreiben. APOS Legal hat mich davor bewahrt und eine Abfindung verhandelt.`,
    `Mein Arbeitgeber hat die Kündigungsfrist falsch berechnet. Das war der Hebel für eine erfolgreiche Verhandlung.`,
    `Nach der Kündigung war ich wie gelähmt. Die Kanzlei hat alles übernommen und ein gutes Ergebnis erzielt.`,
    `Ohne rechtliche Hilfe hätte ich die 3-Wochen-Frist verpasst. So konnte eine Abfindung von ${ergebnis.toLocaleString('de-DE')} € erreicht werden.`,
  ];

  const geprueftOptionen = [
    'Einhaltung der Kündigungsfrist',
    'Ordnungsgemäße Betriebsratsanhörung',
    'Korrekte Sozialauswahl',
    'Formelle Wirksamkeit der Kündigung',
    'Vorliegen einer Abmahnung',
    'Betriebsbedingte Gründe nachprüfbar',
    'Weiterbeschäftigungsmöglichkeit',
    'Sonderkündigungsschutz',
    'Inhaltliche Begründung der Kündigung',
  ];

  const vorgehenOptionen = [
    'Kündigungsschutzklage fristgerecht eingereicht',
    'Gütetermin vor dem Arbeitsgericht wahrgenommen',
    'Abfindungsverhandlung geführt',
    'Vergleich im Gütetermin geschlossen',
    'Gegnerische Kündigungsgründe widerlegt',
    'Zeugenaussagen eingeholt',
    'Freistellung bis Vertragsende verhandelt',
    'Qualifiziertes Arbeitszeugnis durchgesetzt',
  ];

  // Select 3-4 items for geprueft and vorgehen
  const geprueft = [
    geprueftOptionen[idx % geprueftOptionen.length],
    geprueftOptionen[(idx + 3) % geprueftOptionen.length],
    geprueftOptionen[(idx + 5) % geprueftOptionen.length],
  ];
  const vorgehen = [
    vorgehenOptionen[idx % vorgehenOptionen.length],
    vorgehenOptionen[(idx + 2) % vorgehenOptionen.length],
    vorgehenOptionen[(idx + 4) % vorgehenOptionen.length],
  ];

  return {
    initialen: vorname[0] + (vorname.includes(' ') ? vorname.split(' ')[1][0] : vorname[vorname.length - 1]).toUpperCase(),
    name,
    branche,
    gehalt: basisGehalt,
    kuendigungsart,
    zitat: zitate[idx % zitate.length],
    geprueft,
    vorgehen,
    ergebnis,
  };
}

// --- FAQ-Antworten generieren ---
function getFaqs(year) {
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;
  const ylBez = year === 1 ? '1 Jahr' : `${year} Jahre`;
  const frist = getFrist(year);
  const kschgGilt = year >= 1; // Wartezeit 6 Monate ist nach 1 Jahr erfüllt

  return [
    {
      frage: `Gilt das KSchG nach ${yl} Betriebszugehörigkeit?`,
      antwort: kschgGilt
        ? `Ja. Nach ${yl} Betriebszugehörigkeit ist die 6-monatige Wartezeit des § 1 Abs. 1 KSchG erfüllt. Voraussetzung für den allgemeinen Kündigungsschutz ist zusätzlich, dass der Betrieb regelmäßig mehr als 10 Vollzeitarbeitnehmer beschäftigt (§ 23 Abs. 1 KSchG). Ist das der Fall, braucht Ihr Arbeitgeber einen anerkannten Kündigungsgrund — betriebsbedingt, personenbedingt oder verhaltensbedingt.`
        : `Nach ${yl} Betriebszugehörigkeit ist die 6-monatige Wartezeit des § 1 Abs. 1 KSchG noch nicht erfüllt. Allerdings kann ein besonderer Kündigungsschutz bestehen (Schwangerschaft, Schwerbehinderung, Betriebsrat etc.). Zudem müssen Kündigungsfristen und Formvorschriften eingehalten werden.`,
    },
    {
      frage: `Wie lange ist die Kündigungsfrist nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Nach ${yl} Betriebszugehörigkeit beträgt die gesetzliche Kündigungsfrist ${frist.lang} (§ 622 Abs. 2 BGB). Diese Frist kann durch Arbeitsvertrag oder Tarifvertrag verlängert, aber nicht verkürzt werden. Eine zu kurze Kündigungsfrist macht die Kündigung zwar nicht unwirksam, aber angreifbar — sie wird dann zum nächstmöglichen Termin wirksam.`,
    },
    {
      frage: `Wie lange habe ich Zeit gegen die Kündigung nach ${yl} Betriebszugehörigkeit vorzugehen?`,
      antwort: `Sie haben ab Zugang der schriftlichen Kündigung exakt 3 Wochen Zeit, Kündigungsschutzklage beim Arbeitsgericht einzureichen (§ 4 KSchG). Diese Frist ist absolut — wird sie versäumt, gilt die Kündigung als wirksam, selbst wenn sie rechtswidrig war. Nur in seltenen Ausnahmefällen ist eine nachträgliche Klagezulassung nach § 5 KSchG möglich (z.B. bei Krankheit oder fehlender Kenntnis).`,
    },
    {
      frage: `Habe ich Anspruch auf Abfindung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Einen automatischen gesetzlichen Abfindungsanspruch gibt es nicht. Die Faustformel lautet: 0,5 × Bruttomonatsgehalt × ${ylBez} Betriebszugehörigkeit. Bei einem Gehalt von 3.500 € wären das ${(3500 * 0.5 * year).toLocaleString('de-DE')} €. In der Praxis werden Abfindungen im Rahmen von Kündigungsschutzverfahren verhandelt — mit anwaltlicher Vertretung sind Faktoren von 1,0 bis 1,5 keine Seltenheit.`,
    },
    {
      frage: `Sollte ich bei einer Kündigung nach ${yl} Betriebszugehörigkeit Klage einreichen?`,
      antwort: `In den allermeisten Fällen ja. Die Kündigungsschutzklage ist das wichtigste Druckmittel für eine Abfindungsverhandlung. Ohne Klage hat der Arbeitgeber keinen Anlass, eine Abfindung zu zahlen. Über 80 % aller Kündigungsschutzverfahren enden mit einem Vergleich im Gütetermin — also einer Abfindung. Die Kosten trägt bei Rechtsschutzversicherung diese vollständig; ohne RSV gilt: Erste Instanz trägt jede Partei ihre eigenen Kosten.`,
    },
    {
      frage: `Lohnt sich eine Klage bei Kündigung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Ja, in der Regel lohnt sich eine Klage. Nach ${yl} Betriebszugehörigkeit liegt die Regelabfindung bei 0,5 Monatsgehältern × ${ylBez} = ${(0.5 * year).toLocaleString('de-DE', { minimumFractionDigits: 1 })} Monatsgehälter. Bei guter Verhandlung kann der Faktor auf 1,0 bis 1,5 steigen. Die meisten Verfahren werden bereits im Gütetermin (4–8 Wochen nach Klage) per Vergleich beigelegt. Eine Rechtsschutzversicherung übernimmt alle Kosten.`,
    },
    {
      frage: `Was tun nach Kündigung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Sofort handeln: 1. Datum des Kündigungszugangs notieren — die 3-Wochen-Frist läuft. 2. Nichts unterschreiben (keinen Aufhebungsvertrag, keine Empfangsbestätigung). 3. Innerhalb von 3 Tagen bei der Agentur für Arbeit arbeitssuchend melden. 4. Fachanwalt für Arbeitsrecht kontaktieren — Ersteinschätzung ist kostenlos. 5. Alle Unterlagen sichern (Arbeitsvertrag, Kündigungsschreiben, Gehaltsabrechnungen, E-Mails).`,
    },
  ];
}

// --- Daten für alle 40 Jahre generieren ---
const data = {};
for (let year = 1; year <= 40; year++) {
  const frist = getFrist(year);
  data[year] = {
    year,
    kuendigungsfristKurz: frist.kurz,
    kuendigungsfristLang: frist.lang,
    kuendigungsfristHinweis: frist.hinweis,
    kschgGilt: year >= 1, // Wartezeit 6 Monate → ab Jahr 1 erfüllt
    haeufigeFehler: getHaeufigeFehler(year),
    beispielsfall: getBeispielsfall(year),
    faqs: getFaqs(year),
  };
}

const outPath = path.join(__dirname, '../data/generated/gekuendigt-data.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');
console.log(`${Object.keys(data).length} Jahre generiert → ${outPath}`);
