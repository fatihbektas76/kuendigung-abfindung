import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

// German words for numbers 1-40
const yearWords: Record<number, string> = {
  1: "einem", 2: "zwei", 3: "drei", 4: "vier", 5: "fünf",
  6: "sechs", 7: "sieben", 8: "acht", 9: "neun", 10: "zehn",
  11: "elf", 12: "zwölf", 13: "dreizehn", 14: "vierzehn", 15: "fünfzehn",
  16: "sechzehn", 17: "siebzehn", 18: "achtzehn", 19: "neunzehn", 20: "zwanzig",
  21: "einundzwanzig", 22: "zweiundzwanzig", 23: "dreiundzwanzig", 24: "vierundzwanzig",
  25: "fünfundzwanzig", 26: "sechsundzwanzig", 27: "siebenundzwanzig",
  28: "achtundzwanzig", 29: "neunundzwanzig", 30: "dreißig",
  31: "einunddreißig", 32: "zweiunddreißig", 33: "dreiunddreißig",
  34: "vierunddreißig", 35: "fünfunddreißig", 36: "sechsunddreißig",
  37: "siebenunddreißig", 38: "achtunddreißig", 39: "neununddreißig", 40: "vierzig",
};

export interface GeneratedFristlosContent {
  year: number;
  word: string;
  uniqueIntro: string;
  rechtlicheVoraussetzungen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wirksamkeit: string;
    voraussetzungen: string;
    abfindung: string;
    frist: string;
    lohn: string;
  };
}

async function generateContentForYear(year: number): Promise<GeneratedFristlosContent> {
  const word = yearWords[year];
  const yl = year === 1 ? "1 Jahr" : `${year} Jahren`;
  const abfindungMin = (0.5 * year * 3000).toLocaleString("de-DE");
  const abfindungMax = (1.5 * year * 3000).toLocaleString("de-DE");

  const prompt = `Du bist Fachanwalt für Arbeitsrecht. Erstelle Content für 'Fristlose Kündigung nach ${yl} Betriebszugehörigkeit — wirksam oder nicht?'.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "3-4 Sätze spezifisch für ${yl} BZ und fristlose Kündigung. §626 BGB erwähnen. Kernbotschaft: Die meisten fristlosen Kündigungen sind unwirksam. Bei ${yl} BZ: Verhandlungsposition für Abfindung stark (bei 3.000€ Gehalt: ${abfindungMin}€ bis ${abfindungMax}€).",

  "rechtlicheVoraussetzungen": "5-6 Sätze über Voraussetzungen §626 BGB, 2-Wochen-Frist des Arbeitgebers, wichtiger Grund, Verhältnismäßigkeit, Interessenabwägung bei ${yl} BZ (lange BZ spricht gegen fristlose Kündigung).",

  "fallkonstellation": "Konkretes Praxisbeispiel (4-5 Sätze) — fristlose Kündigung nach ${yl} die vor Gericht gescheitert ist und zu Abfindung geführt hat. Realistischer Fall mit konkretem Ergebnis.",

  "praxistipp": "Spezifischer Tipp (2-3 Sätze) für ${yl} BZ bei fristloser Kündigung. Was sollte man als Erstes tun? Konkret und umsetzbar.",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für fristlose Kündigungen relevant ist. Nur echte Aktenzeichen z.B. '2 AZR 140/12'.",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer mit ${yl} BZ relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "wirksamkeit": "Antwort auf 'Ist fristlose Kündigung nach ${yl} wirksam?' — 3-4 Sätze mit §626 BGB, Interessenabwägung, BZ als Faktor",
    "voraussetzungen": "Antwort auf 'Was sind die Voraussetzungen für eine wirksame fristlose Kündigung?' — 3-4 Sätze, §626 BGB, wichtiger Grund, 2-Wochen-Frist, Abmahnung",
    "abfindung": "Antwort auf 'Welche Abfindung ist nach ${yl} möglich?' — 3-4 Sätze mit konkreten Zahlen (${abfindungMin}€ bis ${abfindungMax}€ bei 3.000€ Gehalt)",
    "frist": "Antwort auf 'Wie lange habe ich Zeit gegen die fristlose Kündigung vorzugehen?' — 3 Sätze, 3-Wochen-Klagefrist §4 KSchG, sofort handeln",
    "lohn": "Antwort auf 'Bekomme ich noch Lohn nach fristloser Kündigung?' — 3 Sätze, kein Lohn bei wirksamer fristloser Kündigung, aber Annahmeverzugslohn bei unwirksamer"
  }
}

Wichtig:
- Alle Texte auf Deutsch
- Natürliche, verständliche Sprache — kein Juristendeutsch
- §-Referenzen einbauen wo relevant
- Empathisch aber sachlich
- NUR valides JSON zurückgeben, keine anderen Texte
- Keine Markdown-Formatierung`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  const parsed = JSON.parse(cleaned);

  return {
    year,
    word,
    ...parsed,
  };
}

async function generateAllContent() {
  const results: GeneratedFristlosContent[] = [];
  const outputPath = path.join(
    process.cwd(),
    "lib",
    "generated-fristlos-content.json"
  );

  let existingData: GeneratedFristlosContent[] = [];
  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(`Resuming — ${existingData.length} years already done.`);
  }

  const completedYears = new Set(existingData.map((d) => d.year));

  for (let year = 1; year <= 40; year++) {
    if (completedYears.has(year)) {
      console.log(`✓ Year ${year} already generated — skipping`);
      results.push(existingData.find((d) => d.year === year)!);
      continue;
    }

    console.log(`Generating fristlos content for year ${year}/40...`);

    try {
      const content = await generateContentForYear(year);
      results.push(content);

      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      console.log(`✓ Year ${year} done`);

      if (year < 40) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`✗ Error on year ${year}:`, error);
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      process.exit(1);
    }
  }

  console.log(`\n✅ All 40 fristlose Kündigung entries generated!`);

  const tsOutput = `// Auto-generated by scripts/generate-fristlos-content.ts
// Do not edit manually

export interface GeneratedFristlosContent {
  year: number;
  word: string;
  uniqueIntro: string;
  rechtlicheVoraussetzungen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wirksamkeit: string;
    voraussetzungen: string;
    abfindung: string;
    frist: string;
    lohn: string;
  };
}

export const generatedFristlosContent: GeneratedFristlosContent[] = ${JSON.stringify(results, null, 2)};

export function getFristlosContentForYear(year: number): GeneratedFristlosContent | undefined {
  return generatedFristlosContent.find((c) => c.year === year);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-fristlos-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`Output: lib/generated-fristlos-content.ts`);
}

generateAllContent();
