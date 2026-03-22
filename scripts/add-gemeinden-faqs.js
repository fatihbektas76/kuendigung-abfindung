const fs = require('fs');
const path = require('path');

// Read gemeinden.ts and extract slug → { name, arbeitsgericht }
const gemeindenTs = fs.readFileSync(path.join(__dirname, '../data/gemeinden.ts'), 'utf8');
const entryRegex = /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?arbeitsgericht:\s*"([^"]+)"/g;
const gemeindenData = {};
let match;
while ((match = entryRegex.exec(gemeindenTs)) !== null) {
  gemeindenData[match[1]] = { name: match[2], arbeitsgericht: match[3] };
}

// Read gemeinden-contents.json
const contentsPath = path.join(__dirname, '../data/generated/gemeinden-contents.json');
const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));

let updated = 0;
for (const [slug, content] of Object.entries(contents)) {
  const data = gemeindenData[slug];
  if (!data) {
    console.warn(`Keine Daten für slug: ${slug}`);
    continue;
  }

  // Skip if already present
  if (content.faqs.some(f => f.frage.includes('arbeitnehmerfreundlich'))) {
    console.log(`${slug}: FAQs bereits vorhanden, übersprungen.`);
    continue;
  }

  const faq1 = {
    frage: `Ist das ${data.arbeitsgericht} arbeitnehmerfreundlich?`,
    antwort: `<p>Das ${data.arbeitsgericht} urteilt sachlich nach Gesetz und Sachverhalt. Eine pauschale Bewertung als arbeitnehmerfreundlich ist nicht möglich – entscheidend sind der Einzelfall und die Qualität der anwaltlichen Vertretung. Im Gütetermin wird stets eine gütliche Einigung angestrebt.</p>`,
  };

  const faq2 = {
    frage: `Wie lange dauert ein Verfahren vor dem ${data.arbeitsgericht}?`,
    antwort: `<p>Der Gütetermin findet in der Regel 4 bis 8 Wochen nach Klageeinreichung statt. Kommt keine Einigung zustande, folgt der Kammertermin nach weiteren 3 bis 6 Monaten. Gesamtdauer: 4 bis 10 Monate. Die meisten Verfahren enden bereits im Gütetermin per Vergleich.</p>`,
  };

  // Insert after "Wie läuft die Beratung ab" FAQ, else after first FAQ
  const beratungIdx = content.faqs.findIndex(f => f.frage.includes('Wie läuft die Beratung ab'));
  const insertAt = beratungIdx !== -1 ? beratungIdx + 1 : 1;
  content.faqs.splice(insertAt, 0, faq1, faq2);
  updated++;
}

fs.writeFileSync(contentsPath, JSON.stringify(contents, null, 2) + '\n');
console.log(`${updated} Gemeinden aktualisiert.`);
