const fs = require('fs');
const path = require('path');

// --- Beispielsfälle (different rotation than gekuendigt pages) ---
const vornamen = ['Claudia', 'Stefan', 'Sabine', 'Markus', 'Martina', 'Jürgen', 'Birgit', 'Frank', 'Karin', 'Wolfgang',
  'Susanne', 'Ralf', 'Monika', 'Bernd', 'Heike', 'Uwe', 'Gabriele', 'Peter', 'Angelika', 'Holger',
  'Ursula', 'Thorsten', 'Andrea', 'Norbert', 'Silke', 'Dirk', 'Christine', 'Klaus', 'Elke', 'Manfred',
  'Doris', 'Harald', 'Anja', 'Gerd', 'Bettina', 'Thomas', 'Sandra', 'Michael', 'Petra', 'Andreas'];
const branchen = [
  'Buchhaltung', 'IT-Abteilung', 'Produktion', 'Logistik', 'Einkauf', 'Personalwesen',
  'Marketing', 'Kundenservice', 'Verwaltung', 'Technik', 'Qualitätssicherung', 'Forschung & Entwicklung',
  'Außendienst', 'Controlling', 'Sachbearbeitung', 'Projektmanagement', 'Montage', 'Lager',
  'Geschäftsführungsassistenz', 'Finanzbuchhaltung', 'Konstruktion', 'Versand', 'Empfang',
  'Disposition', 'Arbeitsvorbereitung', 'Instandhaltung', 'Vertriebsinnendienst', 'Debitorenbuchhaltung',
  'Facility Management', 'Werkstatt', 'Einzelhandel', 'Gastronomie', 'Pflege', 'Sozialarbeit',
  'Redaktion', 'Grafik', 'Eventmanagement', 'Öffentlicher Dienst', 'Bildung', 'Vertrieb'];
const kuendigungsarten = [
  'Betriebsbedingte Kündigung', 'Betriebsbedingte Kündigung', 'Personenbedingte Kündigung',
  'Betriebsbedingte Kündigung', 'Verhaltensbedingte Kündigung', 'Betriebsbedingte Kündigung',
];

function getBeispielsfall(year) {
  const idx = year - 1;
  const vorname = vornamen[idx % vornamen.length];
  const initial = vorname[0];
  const name = `${vorname} ${initial}.`;
  const branche = branchen[idx % branchen.length];
  const kuendigungsart = kuendigungsarten[idx % kuendigungsarten.length];
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;

  const basisGehalt = 3000 + (idx % 10) * 350;
  const faktor = [0.8, 1.0, 1.2, 1.5, 0.75, 1.1, 1.3, 0.9, 1.0, 1.4][idx % 10];
  const ergebnis = Math.round(basisGehalt * faktor * year / 100) * 100;

  const zitate = [
    `Mein Arbeitgeber bot mir nach ${yl} nur eine minimale Abfindung an. Dank anwaltlicher Hilfe konnte ich das Dreifache herausholen.`,
    `Ohne Klage hätte ich gar keine Abfindung bekommen. Der Vergleich im Gütetermin war die richtige Entscheidung.`,
    `Ich wusste nicht, dass die Sozialauswahl fehlerhaft war. Das war der entscheidende Hebel für meine Abfindung.`,
    `Die Kanzlei hat mir gezeigt, dass ich nach ${yl} eine starke Verhandlungsposition hatte. Am Ende stand ein faires Ergebnis.`,
    `Mein Arbeitgeber hat die Kündigungsfrist falsch berechnet — das hat meine Abfindung deutlich erhöht.`,
    `Ich wurde gedrängt, einen Aufhebungsvertrag zu unterschreiben. Gut, dass ich vorher zum Anwalt gegangen bin.`,
    `Die Ersteinschätzung war kostenlos und hat mir sofort gezeigt, welche Fehler in meiner Kündigung steckten.`,
    `Nach ${yl} fühlte ich mich machtlos. Die Kündigungsschutzklage hat alles verändert — der Arbeitgeber lenkte schnell ein.`,
    `Ich hätte nie gedacht, dass eine Abfindung von ${ergebnis.toLocaleString('de-DE')} € möglich ist. Die anwaltliche Vertretung hat sich mehr als gelohnt.`,
    `Der Betriebsrat wurde nicht richtig angehört. Dieser Formfehler war Gold wert bei der Abfindungsverhandlung.`,
  ];

  const geprueftOptionen = [
    'Einhaltung der gesetzlichen Kündigungsfrist',
    'Ordnungsgemäße Betriebsratsanhörung',
    'Korrekte Sozialauswahl',
    'Formelle Wirksamkeit der Kündigung',
    'Vorliegen einer vorherigen Abmahnung',
    'Betriebsbedingte Gründe nachprüfbar',
    'Weiterbeschäftigungsmöglichkeit geprüft',
    'Sonderkündigungsschutz ausgeschlossen',
    'Inhaltliche Begründung der Kündigung',
  ];

  const vorgehenOptionen = [
    'Kündigungsschutzklage fristgerecht eingereicht',
    'Gütetermin vor dem Arbeitsgericht wahrgenommen',
    'Abfindungsverhandlung geführt',
    'Vergleich im Gütetermin geschlossen',
    'Fehlerhafte Kündigungsgründe widerlegt',
    'Freistellung bis Vertragsende verhandelt',
    'Qualifiziertes Arbeitszeugnis durchgesetzt',
    'Turboklausel mit Abfindungserhöhung vereinbart',
  ];

  const geprueft = [
    geprueftOptionen[idx % geprueftOptionen.length],
    geprueftOptionen[(idx + 3) % geprueftOptionen.length],
    geprueftOptionen[(idx + 6) % geprueftOptionen.length],
  ];
  const vorgehen = [
    vorgehenOptionen[idx % vorgehenOptionen.length],
    vorgehenOptionen[(idx + 2) % vorgehenOptionen.length],
    vorgehenOptionen[(idx + 5) % vorgehenOptionen.length],
  ];

  return {
    initialen: vorname[0] + vorname[vorname.length - 1].toUpperCase(),
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

// --- 8 FAQ-Antworten generieren ---
function getFaqs(year) {
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;
  const ylKurz = year === 1 ? '1 Jahr' : `${year} Jahre`;
  const regel05 = (0.5 * year).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const bsp4000 = (4000 * 0.5 * year).toLocaleString('de-DE');
  const bsp4000oben = (4000 * 1.5 * year).toLocaleString('de-DE');

  return [
    {
      frage: `Wie hoch ist die Abfindung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Die Faustformel lautet: 0,5 × Bruttomonatsgehalt × ${ylKurz} Betriebszugehörigkeit. Bei einem Gehalt von 4.000 € ergibt sich eine Regelabfindung von ${bsp4000} €. In der Praxis liegt der Faktor zwischen 0,5 und 1,5 — je nach Fehlern in der Kündigung, Verhandlungsposition und Arbeitsmarktlage. Damit sind ${bsp4000oben} € durchaus realistisch.`,
    },
    {
      frage: `Habe ich einen gesetzlichen Anspruch auf Abfindung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Nein, einen automatischen gesetzlichen Abfindungsanspruch gibt es nicht. Ein Anspruch kann sich aus § 1a KSchG ergeben (Abfindungsangebot bei betriebsbedingter Kündigung), aus einem Sozialplan, einem Tarifvertrag oder einer individuellen Vereinbarung. In der Praxis wird die große Mehrheit aller Abfindungen im Rahmen eines Kündigungsschutzverfahrens im Vergleich ausgehandelt — die Klage ist das wichtigste Druckmittel.`,
    },
    {
      frage: `Lohnt sich eine Klage um eine Abfindung nach ${yl} Betriebszugehörigkeit zu erzielen?`,
      antwort: `Ja, in der Regel lohnt sich eine Kündigungsschutzklage. Über 80 % aller Verfahren enden mit einem Vergleich im Gütetermin — und damit einer Abfindung. Die Regelabfindung nach ${yl} liegt bei ${regel05} Monatsgehältern, mit guter Verhandlung sind Faktoren von 1,0 bis 1,5 realistisch. Kosten: Bei Rechtsschutzversicherung übernimmt diese alles; ohne RSV trägt in erster Instanz jede Partei ihre eigenen Kosten.`,
    },
    {
      frage: `Muss ich die Abfindung nach ${yl} Betriebszugehörigkeit versteuern?`,
      antwort: `Ja, Abfindungen sind einkommensteuerpflichtig. Sie können aber die Fünftelregelung (§ 34 EStG) nutzen, die die Steuerlast deutlich senken kann. Wichtig seit 2025: Die Fünftelregelung wird vom Arbeitgeber nicht mehr automatisch angewendet — Sie müssen sie selbst über Ihre Einkommensteuererklärung beim Finanzamt beantragen. Sozialversicherungsbeiträge fallen auf Abfindungen nicht an.`,
    },
    {
      frage: `Wie hoch sind die Abgaben auf eine Abfindung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Abfindungen sind sozialversicherungsfrei — es fallen keine Beiträge zur Renten-, Kranken-, Pflege- und Arbeitslosenversicherung an. Es wird ausschließlich Einkommensteuer (zzgl. Solidaritätszuschlag und ggf. Kirchensteuer) fällig. Mit der Fünftelregelung (§ 34 EStG) können Sie die Steuerlast erheblich reduzieren, da die Abfindung rechnerisch auf 5 Jahre verteilt wird.`,
    },
    {
      frage: 'Wird die Abfindung auf das Arbeitslosengeld angerechnet?',
      antwort: 'Grundsätzlich nein: Eine Abfindung aus einem Kündigungsschutzverfahren wird nicht auf das Arbeitslosengeld I angerechnet. Vorsicht ist bei Aufhebungsverträgen geboten — hier droht eine Sperrzeit von bis zu 12 Wochen. Auch ein Ruhenszeitraum nach § 158 SGB III ist möglich, wenn die ordentliche Kündigungsfrist durch den Aufhebungsvertrag nicht eingehalten wird.',
    },
    {
      frage: 'Was hat sich 2025 bei der Fünftelregelung geändert?',
      antwort: 'Seit dem 01.01.2025 wendet der Arbeitgeber die Fünftelregelung beim Lohnsteuerabzug nicht mehr automatisch an. Die Vergünstigung muss vom Arbeitnehmer selbst über die Einkommensteuererklärung beim Finanzamt beantragt werden. Das bedeutet: Die Steuerersparnis kommt nicht mehr sofort bei der Auszahlung, sondern erst mit dem Steuerbescheid. Lassen Sie sich beraten, um die Fünftelregelung korrekt geltend zu machen.',
    },
    {
      frage: `Gibt es eine Abfindung bei Aufhebungsvertrag nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Ja, bei einem Aufhebungsvertrag wird fast immer eine Abfindung vereinbart. Die Höhe richtet sich nach der Faustformel (0,5 × Gehalt × ${ylKurz}) und Ihrer Verhandlungsposition. Wichtig: Unterschreiben Sie einen Aufhebungsvertrag niemals ohne anwaltliche Prüfung — es drohen Sperrzeit beim Arbeitslosengeld, Verlust von Kündigungsschutzrechten und ungünstige Klauseln (z.B. Verzicht auf Zeugnis oder Resturlaub).`,
    },
  ];
}

// --- Daten für alle 40 Jahre generieren ---
const data = {};
for (let year = 1; year <= 40; year++) {
  data[year] = {
    year,
    beispielsfall: getBeispielsfall(year),
    faqs: getFaqs(year),
  };
}

const outDir = path.join(__dirname, '../data/generated');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, 'abfindung-data.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');
console.log(`${Object.keys(data).length} Jahre generiert → ${outPath}`);
