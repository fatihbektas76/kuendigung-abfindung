const fs = require('fs');
const path = require('path');

// Bezirke aus bezirke.ts parsen
const bezirkeTs = fs.readFileSync(path.join(__dirname, '../data/bezirke.ts'), 'utf8');
const entryRegex = /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?arbeitsgericht:\s*"([^"]+)"/g;
const bezirke = [];
let match;
while ((match = entryRegex.exec(bezirkeTs)) !== null) {
  bezirke.push({ slug: match[1], name: match[2], arbeitsgericht: match[3] });
}

// Bezirksspezifische Beschreibungen
const beschreibungen = {
  "berlin-mitte": {
    wirtschaft: "Regierungsviertel, Startup-Szene und internationale Konzerne",
    arbeitgeber: "Bundesministerien, Tech-Startups, Charité, Hotels und Gastronomie",
    besonderheit: "Als politisches und wirtschaftliches Zentrum Berlins ist Mitte geprägt von einer hohen Konzentration an Arbeitgebern aus Politik, Technologie und Tourismus.",
  },
  "berlin-friedrichshain-kreuzberg": {
    wirtschaft: "Kreativwirtschaft, Gastronomie und Tech-Startups",
    arbeitgeber: "Zalando, Delivery Hero, zahlreiche Agenturen und Kreativunternehmen",
    besonderheit: "Der Bezirk ist Berlins Startup-Hochburg mit einem der jüngsten Arbeitnehmer-Durchschnitte der Stadt.",
  },
  "berlin-pankow": {
    wirtschaft: "Wachsender Wirtschaftsstandort mit Gesundheitswesen und Einzelhandel",
    arbeitgeber: "Helios Kliniken, Biotechnologie-Unternehmen, Einzelhandel",
    besonderheit: "Pankow ist Berlins bevölkerungsreichster Bezirk mit einem dynamisch wachsenden Arbeitsmarkt.",
  },
  "berlin-charlottenburg-wilmersdorf": {
    wirtschaft: "Einzelhandel, Dienstleistungen, Universität und Messe",
    arbeitgeber: "TU Berlin, Messe Berlin, Kurfürstendamm-Geschäfte, Hotels",
    besonderheit: "Der traditionsreiche Westberliner Bezirk vereint Wissenschaft, Handel und internationale Unternehmen rund um den Kurfürstendamm.",
  },
  "berlin-spandau": {
    wirtschaft: "Industrie, Produktion und Logistik",
    arbeitgeber: "Siemens (historischer Standort), BMW-Motorradwerk, Logistikunternehmen",
    besonderheit: "Spandau ist Berlins industrieller Bezirk mit einer langen Tradition in der Fertigungsindustrie.",
  },
  "berlin-steglitz-zehlendorf": {
    wirtschaft: "Wissenschaft, Gesundheitswesen und öffentlicher Dienst",
    arbeitgeber: "Freie Universität Berlin, Bundesamt für Materialforschung, Kliniken",
    besonderheit: "Der grüne Südwesten Berlins ist geprägt von Wissenschaftseinrichtungen und einem stabilen Arbeitsmarkt im öffentlichen Sektor.",
  },
  "berlin-tempelhof-schoeneberg": {
    wirtschaft: "Verwaltung, Einzelhandel und Gesundheitswesen",
    arbeitgeber: "Bezirksverwaltungen, Einkaufszentren, Krankenhäuser",
    besonderheit: "Der zentral gelegene Bezirk mit dem ehemaligen Flughafen Tempelhof ist ein wichtiger Verwaltungs- und Dienstleistungsstandort.",
  },
  "berlin-neukoelln": {
    wirtschaft: "Gastronomie, Einzelhandel und wachsende Kreativwirtschaft",
    arbeitgeber: "Kleine und mittlere Unternehmen, Gastronomie, Einzelhandel",
    besonderheit: "Neukölln hat sich zu einem dynamischen Wirtschaftsstandort mit starkem Wachstum in der Kreativ- und Gastronomieszene entwickelt.",
  },
  "berlin-treptow-koepenick": {
    wirtschaft: "Technologie, Wissenschaft und Medien",
    arbeitgeber: "Adlershof Technologiepark (WISTA), Humboldt-Universität, Medienunternehmen",
    besonderheit: "Mit dem Wissenschafts- und Technologiepark Adlershof beherbergt der Bezirk einen der größten Technologiestandorte Deutschlands.",
  },
  "berlin-marzahn-hellersdorf": {
    wirtschaft: "Gesundheitswirtschaft, Handwerk und öffentlicher Dienst",
    arbeitgeber: "Unfallkrankenhaus Berlin, Handwerksbetriebe, öffentliche Verwaltung",
    besonderheit: "Der östliche Bezirk ist ein wachsender Standort für Gesundheitswirtschaft und bietet vergleichsweise günstige Gewerbeflächen.",
  },
  "berlin-lichtenberg": {
    wirtschaft: "Logistik, Gesundheitswesen und öffentliche Verwaltung",
    arbeitgeber: "Sana Kliniken, Deutsche Bahn (Standort), Bundesnachrichtendienst",
    besonderheit: "Lichtenberg verbindet Wohnquartiere mit wichtigen Arbeitgebern aus Gesundheitswesen und Bundesbehörden.",
  },
  "berlin-reinickendorf": {
    wirtschaft: "Industrie, Handwerk und Dienstleistungen",
    arbeitgeber: "Borsigwerke (historisch), produzierende Betriebe, Handwerk",
    besonderheit: "Der nördliche Bezirk ist ein solider Industriestandort mit einer starken Handwerkstradition.",
  },
};

// Content generieren
const contents = {};
for (const bezirk of bezirke) {
  const info = beschreibungen[bezirk.slug] || {
    wirtschaft: "vielfältige Wirtschaftsstruktur",
    arbeitgeber: "lokale Unternehmen und Institutionen",
    besonderheit: `${bezirk.name} ist ein wichtiger Berliner Bezirk mit eigenem Arbeitsmarkt.`,
  };

  contents[bezirk.slug] = {
    slug: bezirk.slug,
    metaDescription: `Kündigung in ${bezirk.name}? Fachanwalt für Arbeitsrecht – Abfindung, Aufhebungsvertrag, ${bezirk.arbeitsgericht}. APOS Legal. Kostenlose Ersteinschätzung.`,
    rechteSection: `<p>${info.besonderheit} Wichtige Arbeitgeber sind ${info.arbeitgeber}.</p><p>Als Arbeitnehmer in ${bezirk.name} gelten alle bundesweiten Schutzrechte des KSchG. Bei Kündigung haben Sie das Recht auf Kündigungsschutzklage beim zuständigen ${bezirk.arbeitsgericht} – die 3-Wochen-Frist gilt ab Zugang der schriftlichen Kündigung.</p>`,
    vertretungSection: `<p>Wir vertreten Mandanten aus ${bezirk.name} vollständig digital. Das ${bezirk.arbeitsgericht} kennen wir aus langjähriger Praxis. Ersteinschätzung per E-Mail oder Telefon binnen 24 Stunden, Klageeinreichung elektronisch.</p><p>Ob ${info.wirtschaft} – wir sind mit den branchenspezifischen Besonderheiten in ${bezirk.name} vertraut und verhandeln regelmäßig vor dem ${bezirk.arbeitsgericht}.</p>`,
    faqs: [
      {
        frage: `Wie läuft die Beratung ab, wenn ich in ${bezirk.name} wohne?`,
        antwort: `<p>Vollständig digital: Ersteinschätzung per E-Mail oder Telefon binnen 24 Stunden. Klageeinreichung beim ${bezirk.arbeitsgericht} elektronisch – kein Anfahrtsweg erforderlich.</p>`,
      },
      {
        frage: `Ist das ${bezirk.arbeitsgericht} arbeitnehmerfreundlich?`,
        antwort: `<p>Das ${bezirk.arbeitsgericht} urteilt sachlich nach Gesetz und Sachverhalt. Eine pauschale Bewertung als arbeitnehmerfreundlich ist nicht möglich – entscheidend sind der Einzelfall und die Qualität der anwaltlichen Vertretung. Im Gütetermin wird stets eine gütliche Einigung angestrebt.</p>`,
      },
      {
        frage: `Wie lange dauert ein Verfahren vor dem ${bezirk.arbeitsgericht}?`,
        antwort: `<p>Der Gütetermin findet in der Regel 4 bis 8 Wochen nach Klageeinreichung statt. Kommt keine Einigung zustande, folgt der Kammertermin nach weiteren 3 bis 6 Monaten. Gesamtdauer: 4 bis 10 Monate. Die meisten Verfahren enden bereits im Gütetermin per Vergleich.</p>`,
      },
      {
        frage: `Welches Arbeitsgericht ist für ${bezirk.name} zuständig?`,
        antwort: `<p>Für ${bezirk.name} ist das <strong>${bezirk.arbeitsgericht}</strong> (Magdeburger Platz 1, 10785 Berlin) zuständig. Die Kündigungsschutzklage muss dort binnen 3 Wochen nach Zugang der Kündigung eingereicht werden. Berufungsinstanz: Landesarbeitsgericht Berlin-Brandenburg.</p>`,
      },
      {
        frage: `Wie hoch ist meine Abfindungschance in ${bezirk.name}?`,
        antwort: `<p>Faustformel: 0,5 × Bruttomonatsgehalt × Beschäftigungsjahre. Mit anwaltlicher Unterstützung ist ein höherer Faktor häufig erzielbar.</p>`,
      },
      {
        frage: `Was kostet ein Anwalt für Arbeitsrecht in ${bezirk.name}?`,
        antwort: `<p>Kosten nach RVG. Rechtsschutzversicherung deckt alle Kosten. Ersteinschätzung kostenlos.</p>`,
      },
    ],
    generatedAt: new Date().toISOString(),
  };
}

const outPath = path.join(__dirname, '../data/generated/bezirke-contents.json');
fs.writeFileSync(outPath, JSON.stringify(contents, null, 2) + '\n');
console.log(`${Object.keys(contents).length} Bezirke-Contents generiert → ${outPath}`);
