const fs = require('fs');
const path = require('path');

// --- Beispielsfälle (fristlose Kündigung context) ---
const vornamen = ['Michael', 'Petra', 'Andreas', 'Claudia', 'Stefan', 'Sabine', 'Markus', 'Martina', 'Jürgen', 'Birgit',
  'Frank', 'Karin', 'Wolfgang', 'Susanne', 'Ralf', 'Monika', 'Bernd', 'Heike', 'Uwe', 'Gabriele',
  'Peter', 'Angelika', 'Holger', 'Ursula', 'Thorsten', 'Andrea', 'Norbert', 'Silke', 'Dirk', 'Christine',
  'Klaus', 'Elke', 'Manfred', 'Doris', 'Harald', 'Anja', 'Gerd', 'Bettina', 'Thomas', 'Sandra'];
const branchen = [
  'Produktion', 'Logistik', 'Einkauf', 'Personalwesen', 'Marketing', 'Kundenservice',
  'Verwaltung', 'Technik', 'Qualitätssicherung', 'Außendienst', 'Controlling', 'Sachbearbeitung',
  'Montage', 'Lager', 'Finanzbuchhaltung', 'Konstruktion', 'Versand', 'Disposition',
  'Instandhaltung', 'Vertriebsinnendienst', 'Facility Management', 'Werkstatt', 'Einzelhandel',
  'Gastronomie', 'Pflege', 'IT-Abteilung', 'Buchhaltung', 'Vertrieb', 'Projektmanagement',
  'Forschung & Entwicklung', 'Redaktion', 'Grafik', 'Eventmanagement', 'Öffentlicher Dienst',
  'Bildung', 'Sozialarbeit', 'Empfang', 'Arbeitsvorbereitung', 'Debitorenbuchhaltung',
  'Geschäftsführungsassistenz'];
const kuendigungsgruende = [
  'Angeblicher Arbeitszeitbetrug', 'Behaupteter Diebstahl geringwertiger Sachen',
  'Vorgeworfene Arbeitsverweigerung', 'Angebliche Beleidigung des Vorgesetzten',
  'Behauptete Verletzung der Verschwiegenheitspflicht', 'Vorgeworfener Vertrauensbruch',
];

function getBeispielsfall(year) {
  const idx = year - 1;
  const vorname = vornamen[idx % vornamen.length];
  const name = `${vorname} ${vorname[0]}.`;
  const branche = branchen[idx % branchen.length];
  const grund = kuendigungsgruende[idx % kuendigungsgruende.length];
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;

  const basisGehalt = 2800 + (idx % 10) * 350;
  const faktor = [0.8, 1.0, 1.3, 1.5, 0.75, 1.2, 1.4, 0.9, 1.1, 1.0][idx % 10];
  const ergebnis = Math.round(basisGehalt * faktor * year / 100) * 100;

  const zitate = [
    `Die fristlose Kündigung kam völlig überraschend. Nach ${yl} wurde mir ${grund.toLowerCase()} vorgeworfen. Die Kanzlei hat sofort erkannt, dass keine Abmahnung vorlag.`,
    `Mein Arbeitgeber hat die 2-Wochen-Frist nach § 626 BGB nicht eingehalten. Das war der entscheidende Fehler — die fristlose Kündigung war unwirksam.`,
    `Ich wurde fristlos gekündigt wegen eines angeblichen Vorfalls, der Wochen zurücklag. Die Kanzlei hat nachgewiesen, dass die Ausschlussfrist längst abgelaufen war.`,
    `Nach ${yl} fristlos gekündigt — ohne jede Abmahnung. APOS Legal hat die Unwirksamkeit festgestellt und eine Abfindung von ${ergebnis.toLocaleString('de-DE')} € verhandelt.`,
    `Der Betriebsrat wurde bei meiner fristlosen Kündigung nicht angehört. Dieser Formfehler hat die gesamte Kündigung zu Fall gebracht.`,
    `Mir wurde ein angeblicher Pflichtverstoß vorgeworfen, der so nie stattgefunden hat. Im Gütetermin konnte der Arbeitgeber nichts beweisen.`,
    `Die fristlose Kündigung war ein Schock. Aber die Kanzlei hat mir gezeigt, dass über 80 % unwirksam sind — und meine war es auch.`,
    `Ohne anwaltliche Hilfe hätte ich die 3-Wochen-Klagefrist verpasst. So konnte eine Abfindung plus qualifiziertes Zeugnis verhandelt werden.`,
    `Mein Arbeitgeber hat die Interessenabwägung nicht berücksichtigt. Nach ${yl} war eine fristlose Kündigung unverhältnismäßig.`,
    `Die Kündigung war formal fehlerhaft — falsche Zustellung, kein wichtiger Grund. Am Ende stand eine faire Abfindung und ein sehr gutes Zeugnis.`,
  ];

  const geprueftOptionen = [
    'Vorliegen eines wichtigen Grundes (§ 626 BGB)',
    'Einhaltung der 2-Wochen-Ausschlussfrist',
    'Ordnungsgemäße Betriebsratsanhörung',
    'Vorliegen einer vorherigen Abmahnung',
    'Korrekte Interessenabwägung',
    'Formelle Wirksamkeit der Kündigung',
    'Verhältnismäßigkeit der Kündigung',
    'Sonderkündigungsschutz geprüft',
    'Beweislast des Arbeitgebers',
  ];

  const vorgehenOptionen = [
    'Kündigungsschutzklage fristgerecht eingereicht',
    'Unwirksamkeit der fristlosen Kündigung gerügt',
    'Hilfsweise ordentliche Kündigung angegriffen',
    'Gütetermin vor dem Arbeitsgericht wahrgenommen',
    'Abfindungsverhandlung geführt',
    'Vergleich mit Abfindung und Zeugnis geschlossen',
    'Lohnansprüche für Kündigungsfrist durchgesetzt',
    'Qualifiziertes Arbeitszeugnis verhandelt',
  ];

  return {
    initialen: vorname[0] + vorname[vorname.length - 1].toUpperCase(),
    name,
    branche,
    gehalt: basisGehalt,
    kuendigungsgrund: grund,
    zitat: zitate[idx % zitate.length],
    geprueft: [
      geprueftOptionen[idx % geprueftOptionen.length],
      geprueftOptionen[(idx + 3) % geprueftOptionen.length],
      geprueftOptionen[(idx + 6) % geprueftOptionen.length],
    ],
    vorgehen: [
      vorgehenOptionen[idx % vorgehenOptionen.length],
      vorgehenOptionen[(idx + 2) % vorgehenOptionen.length],
      vorgehenOptionen[(idx + 5) % vorgehenOptionen.length],
    ],
    ergebnis,
  };
}

// --- 7 FAQ-Antworten generieren ---
function getFaqs(year) {
  const yl = year === 1 ? '1 Jahr' : `${year} Jahren`;
  const ylKurz = year === 1 ? '1 Jahr' : `${year} Jahre`;
  const bsp = (4000 * 0.5 * year).toLocaleString('de-DE');

  return [
    {
      frage: `Ist eine fristlose Kündigung nach ${yl} Betriebszugehörigkeit wirksam?`,
      antwort: `In über 80 % aller Fälle ist die fristlose Kündigung unwirksam. Voraussetzungen nach § 626 BGB: Es muss ein wichtiger Grund vorliegen, der die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der ordentlichen Kündigungsfrist unzumutbar macht. Zusätzlich muss eine Interessenabwägung erfolgen — nach ${yl} Betriebszugehörigkeit wird von den Arbeitsgerichten ein strenger Maßstab angelegt. In der Regel ist zudem eine vorherige Abmahnung erforderlich.`,
    },
    {
      frage: `Muss vor einer fristlosen Kündigung nach ${yl} Betriebszugehörigkeit eine Abmahnung erfolgen?`,
      antwort: `In den meisten Fällen ja. Bei verhaltensbedingten Kündigungen ist eine vorherige Abmahnung grundsätzlich erforderlich — der Arbeitnehmer muss die Chance erhalten, sein Verhalten zu ändern. Nur bei besonders schweren Verstößen (z.B. Straftaten, schwerer Vertrauensbruch) kann eine Abmahnung entbehrlich sein. Nach ${yl} Betriebszugehörigkeit legen Arbeitsgerichte hier einen besonders strengen Maßstab an, da die lange Betriebszugehörigkeit ein erhebliches Vertrauenskapital darstellt.`,
    },
    {
      frage: `Wie lange habe ich Zeit gegen eine fristlose Kündigung nach ${yl} Betriebszugehörigkeit vorzugehen?`,
      antwort: `Sie haben ab Zugang der Kündigung exakt 3 Wochen Zeit, Kündigungsschutzklage beim Arbeitsgericht einzureichen (§ 4 KSchG). Diese Frist gilt auch bei fristloser Kündigung und ist absolut — wird sie versäumt, gilt die Kündigung als wirksam. Bei fristloser Kündigung ist besondere Eile geboten, da sofort kein Gehalt mehr gezahlt wird. Kontaktieren Sie umgehend einen Fachanwalt.`,
    },
    {
      frage: `Was ist die 2-Wochen-Ausschlussfrist bei fristloser Kündigung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Der Arbeitgeber muss die fristlose Kündigung innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes aussprechen (§ 626 Abs. 2 BGB). Liegt der Vorfall oder die Kenntnis länger als 2 Wochen zurück, ist die fristlose Kündigung automatisch unwirksam — unabhängig davon, ob ein wichtiger Grund vorlag. Diese Frist ist einer der häufigsten Angriffspunkte gegen fristlose Kündigungen.`,
    },
    {
      frage: `Bekomme ich eine Abfindung bei fristloser Kündigung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Ja, in der Praxis häufig. Wenn die fristlose Kündigung unwirksam ist (was in über 80 % der Fälle so ist), entsteht erhebliche Verhandlungsmacht. Die Faustformel lautet: 0,5 × Bruttomonatsgehalt × ${ylKurz}. Bei einem Gehalt von 4.000 € wären das ${bsp} €. Zusätzlich können Ansprüche auf Annahmeverzugslohn (Gehalt für die Dauer des Rechtsstreits) geltend gemacht werden, was die Verhandlungsposition weiter stärkt.`,
    },
    {
      frage: `Was sind typische wichtige Gründe für eine fristlose Kündigung nach ${yl} Betriebszugehörigkeit?`,
      antwort: `Als wichtige Gründe kommen in Betracht: Diebstahl oder Unterschlagung (auch geringwertiger Sachen), schwere Beleidigung oder Bedrohung, Straftaten am Arbeitsplatz, beharrliche Arbeitsverweigerung trotz Abmahnung, und schwere Verletzung der Verschwiegenheitspflicht. Entscheidend ist aber immer die Interessenabwägung — nach ${yl} Betriebszugehörigkeit müssen die Gerichte die langjährige beanstandungsfreie Tätigkeit berücksichtigen. Viele vermeintlich „wichtige Gründe" halten dieser Prüfung nicht stand.`,
    },
    {
      frage: `Muss der Arbeitgeber bei einer fristlosen Kündigung nach ${yl} Betriebszugehörigkeit auf Nachfrage die Gründe mitteilen?`,
      antwort: `Es gibt keine gesetzliche Pflicht des Arbeitgebers, die Gründe vorab schriftlich mitzuteilen. Allerdings muss er die Gründe im Kündigungsschutzprozess vollständig offenlegen und beweisen. In der Praxis empfiehlt es sich dennoch, schriftlich nach den Gründen zu fragen — einerseits zur eigenen Vorbereitung, andererseits weil ein Arbeitgeber der die Gründe nicht klar benennen kann, im Gütetermin eine schwache Position hat. Nach § 626 Abs. 2 Satz 3 BGB kann der Arbeitnehmer eine schriftliche Mitteilung der Kündigungsgründe verlangen.`,
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

const outPath = path.join(outDir, 'fristlose-data.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');
console.log(`${Object.keys(data).length} Jahre generiert → ${outPath}`);
