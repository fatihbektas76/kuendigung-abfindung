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

// §622 BGB Kündigungsfristen
function getKuendigungsfrist(years: number): string {
  if (years < 2) return "4 Wochen zum 15. oder zum Monatsende";
  if (years < 5) return "1 Monat zum Monatsende";
  if (years < 8) return "2 Monate zum Monatsende";
  if (years < 10) return "3 Monate zum Monatsende";
  if (years < 12) return "4 Monate zum Monatsende";
  if (years < 15) return "5 Monate zum Monatsende";
  if (years < 20) return "6 Monate zum Monatsende";
  return "7 Monate zum Monatsende";
}

export interface GeneratedContent {
  year: number;
  word: string;
  kuendigungsfrist: string;
  uniqueIntro: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    anspruch: string;
    kuendigungsfrist: string;
    hoehe: string;
    teilzeit: string;
    steuer: string;
  };
}

async function generateContentForYear(year: number): Promise<GeneratedContent> {
  const word = yearWords[year];
  const frist = getKuendigungsfrist(year);
  const abfindungMin = (0.5 * year * 3000).toLocaleString("de-DE");
  const abfindungMax = (1.5 * year * 3000).toLocaleString("de-DE");

  const prompt = `Du bist ein erfahrener Fachanwalt für Arbeitsrecht in Deutschland mit 20+ Jahren Erfahrung. 
Erstelle einzigartigen, informativen Content für eine Seite über "Abfindung nach ${year} Jahren Betriebszugehörigkeit".

Die Seite richtet sich an Arbeitnehmer die gerade gekündigt wurden und schnell wissen wollen was ihnen zusteht.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "Ein einzigartiger Einleitungsabsatz (3-4 Sätze) der SPEZIFISCH für ${year} Jahre Betriebszugehörigkeit ist. Erwähne die Kündigungsfrist von ${frist} nach §622 BGB. Erwähne die typische Abfindungsspanne (bei 3.000€ Gehalt: zwischen ${abfindungMin}€ und ${abfindungMax}€). Gehe auf besondere rechtliche Aspekte ein die GENAU für diese Betriebszugehörigkeit relevant sind (z.B. bei 2 Jahren: KSchG greift gerade noch nicht wenn Probezeit, bei 5 Jahren: wichtige Schwelle für Kündigungsfrist, bei 10 Jahren: lange Betriebszugehörigkeit stärkt Verhandlungsposition erheblich, bei 20 Jahren: 7-Monats-Frist, besonderer Schutz).",
  
  "fallkonstellation": "Ein typisches Praxisbeispiel (4-5 Sätze) das SPEZIFISCH für ${year} Jahre Betriebszugehörigkeit ist. Beschreibe einen konkreten Fall z.B. 'Ein Arbeitnehmer mit ${year} Jahren Betriebszugehörigkeit und einem Bruttogehalt von 3.500€ erhielt eine betriebsbedingte Kündigung...' Zeige wie der Fall gelöst wurde und welche Abfindung erzielt wurde. Muss realistisch und spezifisch sein.",

  "praxistipp": "Ein konkreter, einzigartiger Praxistipp (2-3 Sätze) der SPEZIFISCH für ${year} Jahre Betriebszugehörigkeit gilt. Zum Beispiel besondere Verhandlungstaktiken, Formfehler die bei dieser BZ häufig vorkommen, oder besondere Schutzrechte die bei dieser BZ relevant sind.",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für Abfindungen oder Kündigungen bei ~${year} Jahren Betriebszugehörigkeit relevant ist. Nur echte Aktenzeichen verwenden z.B. '2 AZR 140/12' oder '6 AZR 456/21'",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer mit ${year} Jahren BZ relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "anspruch": "Antwort auf 'Gibt es einen Anspruch auf Abfindung nach ${year} Jahren?' — spezifisch für diese BZ, 3-4 Sätze, mit §-Referenzen",
    "kuendigungsfrist": "Antwort auf 'Was ist meine Kündigungsfrist nach ${year} Jahren?' — ${frist} nach §622 BGB, 2-3 Sätze mit Kontext",
    "hoehe": "Antwort auf 'Wie hoch ist meine Abfindung nach ${year} Jahren?' — spezifische Berechnung, Verhandlungsspielraum, 3-4 Sätze",
    "teilzeit": "Antwort auf Teilzeit/Minijob-Frage — gleiche Rechte, Berechnung auf Basis tatsächliches Gehalt, 2 Sätze",
    "steuer": "Antwort auf Steuerfrage — Fünftelregelung, keine Sozialabgaben, 2-3 Sätze"
  }
}

Wichtig:
- Alle Texte auf Deutsch
- Natürliche, verständliche Sprache (kein Juristendeutsch)
- §-Referenzen einbauen wo relevant (§622 BGB, §1a KSchG, §23 KSchG etc.)
- NUR valides JSON zurückgeben, keine anderen Texte
- Keine Markdown-Formatierung`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  // Clean response — remove any markdown fences
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

  const parsed = JSON.parse(cleaned);

  return {
    year,
    word,
    kuendigungsfrist: frist,
    ...parsed,
  };
}

async function generateAllContent() {
  const results: GeneratedContent[] = [];
  const outputPath = path.join(process.cwd(), "lib", "generated-content.json");

  // Load existing progress if any
  let existingData: GeneratedContent[] = [];
  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(`Resuming from existing data — ${existingData.length} years already done.`);
  }

  const completedYears = new Set(existingData.map((d) => d.year));

  for (let year = 1; year <= 40; year++) {
    if (completedYears.has(year)) {
      console.log(`✓ Year ${year} already generated — skipping`);
      results.push(existingData.find((d) => d.year === year)!);
      continue;
    }

    console.log(`Generating content for year ${year}/40...`);

    try {
      const content = await generateContentForYear(year);
      results.push(content);

      // Save progress after each year
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      console.log(`✓ Year ${year} done — saved to lib/generated-content.json`);

      // Rate limit — wait 1 second between requests
      if (year < 40) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`✗ Error generating year ${year}:`, error);
      console.log(`Saving progress and stopping. Re-run to resume from year ${year}.`);
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      process.exit(1);
    }
  }

  console.log(`\n✅ All 40 years generated successfully!`);
  console.log(`Output: lib/generated-content.json`);

  // Also generate TypeScript export
  const tsOutput = `// Auto-generated by scripts/generate-content.ts
// Do not edit manually — re-run the script to regenerate

import type { GeneratedContent } from './generate-content';

export const generatedContent: GeneratedContent[] = ${JSON.stringify(results, null, 2)};

export function getContentForYear(year: number): GeneratedContent | undefined {
  return generatedContent.find((c) => c.year === year);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`TypeScript export: lib/generated-content.ts`);
}

generateAllContent();
