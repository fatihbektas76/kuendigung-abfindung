import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

const yearWords: Record<number, string> = {
  1: "einem", 2: "zwei", 3: "drei", 4: "vier", 5: "fünf",
  6: "sechs", 7: "sieben", 8: "acht", 9: "neun", 10: "zehn",
  11: "elf", 12: "zwölf", 13: "dreizehn", 14: "vierzehn", 15: "fünfzehn",
  16: "sechzehn", 17: "siebzehn", 18: "achtzehn", 19: "neunzehn", 20: "zwanzig",
  21: "einundzwanzig", 22: "zweiundzwanzig", 23: "dreiundzwanzig",
  24: "vierundzwanzig", 25: "fünfundzwanzig", 26: "sechsundzwanzig",
  27: "siebenundzwanzig", 28: "achtundzwanzig", 29: "neunundzwanzig",
  30: "dreißig", 31: "einunddreißig", 32: "zweiunddreißig",
  33: "dreiunddreißig", 34: "vierunddreißig", 35: "fünfunddreißig",
  36: "sechsunddreißig", 37: "siebenunddreißig", 38: "achtunddreißig",
  39: "neununddreißig", 40: "vierzig",
};

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

export interface GeneratedKuendigungContent {
  year: number;
  word: string;
  kuendigungsfrist: string;
  uniqueIntro: string;
  sofortmassnahmen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wasJetzt: string;
    frist: string;
    abfindung: string;
    kuendigungsfristDetails: string;
    arbeitslosengeld: string;
  };
}

async function generateContentForYear(
  year: number
): Promise<GeneratedKuendigungContent> {
  const word = yearWords[year];
  const frist = getKuendigungsfrist(year);
  const abfindungTypisch = (0.5 * year * 3000).toLocaleString("de-DE");

  const prompt = `Du bist ein erfahrener Fachanwalt für Arbeitsrecht in Deutschland mit 20+ Jahren Erfahrung.
Erstelle einzigartigen, informativen Content für eine Seite "Gekündigt nach ${year} Jahren Betriebszugehörigkeit — was jetzt?".

Die Seite richtet sich an Arbeitnehmer die GERADE eine Kündigung erhalten haben und sofort wissen müssen was zu tun ist. Emotionaler Moment — der Nutzer ist gestresst und braucht klare Orientierung.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "Ein einzigartiger Einleitungsabsatz (3-4 Sätze) SPEZIFISCH für ${year} Jahre Betriebszugehörigkeit. Beginne mit einer empathischen Aussage die den emotionalen Moment aufgreift. Erwähne die wichtigste Sofortmaßnahme (3-Wochen-Frist nach §4 KSchG). Gehe auf besondere Aspekte ein die genau für ${year} Jahre relevant sind — z.B.: bei 1-2 Jahren: KSchG möglicherweise noch nicht anwendbar, bei 5 Jahren: wichtige Kündigungsfristschwelle, bei 10+ Jahren: starke Verhandlungsposition wegen langer BZ, bei 20+ Jahren: besonderer Schutz, sehr lange Kündigungsfrist von ${frist}. Mache Mut: Die meisten Kündigungen sind angreifbar.",

  "sofortmassnahmen": "4-5 konkrete Sofortmaßnahmen als Fließtext (kein Array) die SPEZIFISCH für ${year} Jahre BZ sind. Schritt 1: Kündigung nicht unterschreiben/bestätigen. Schritt 2: Datum des Zugangs notieren (3-Wochen-Frist läuft ab jetzt). Schritt 3: Fachanwalt kontaktieren. Schritt 4: Bei der Agentur für Arbeit melden (Sperrzeit vermeiden). Ergänze year-spezifische Hinweise — z.B. bei langer BZ: Prüfung der Sozialauswahl nach §1 KSchG besonders wichtig.",

  "fallkonstellation": "Ein typisches Praxisbeispiel (4-5 Sätze) SPEZIFISCH für ${year} Jahre BZ. Beschreibe einen konkreten Fall: 'Ein Arbeitnehmer mit ${year} Jahren Betriebszugehörigkeit erhielt eine [Kündigungsart]-Kündigung...' Zeige welche Fehler der Arbeitgeber gemacht hat, wie der Anwalt vorgegangen ist und welches Ergebnis erzielt wurde (Abfindung ca. ${abfindungTypisch}€ oder mehr). Muss realistisch und motivierend sein.",

  "praxistipp": "Ein konkreter, einzigartiger Praxistipp (2-3 Sätze) SPEZIFISCH für ${year} Jahre BZ. Zum Beispiel: typische Formfehler bei dieser BZ, Sozialauswahl-Fehler, besondere Schutzrechte, oder Verhandlungstaktiken die bei dieser BZ besonders wirksam sind.",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für Kündigungen bei ~${year} Jahren BZ relevant ist. Nur echte Aktenzeichen z.B. '2 AZR 549/14' oder '6 AZR 456/21'",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer mit ${year} Jahren BZ relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "wasJetzt": "Antwort auf 'Was soll ich jetzt tun nach der Kündigung?' — 3-4 Sätze, spezifisch für ${year} Jahre BZ, Priorität auf 3-Wochen-Frist nach §4 KSchG",
    "frist": "Antwort auf 'Wie lange habe ich Zeit gegen die Kündigung vorzugehen?' — 3 Wochen ab Zugang, §4 KSchG, was passiert bei Fristversäumnis, 3 Sätze",
    "abfindung": "Antwort auf 'Habe ich Anspruch auf Abfindung nach ${year} Jahren?' — realistisch, mit Abfindungsformel (typisch: ${abfindungTypisch}€ bei 3.000€ Gehalt), Verweis auf §1a KSchG, 3-4 Sätze",
    "kuendigungsfristDetails": "Antwort auf 'Wie lange ist meine Kündigungsfrist nach ${year} Jahren?' — ${frist} nach §622 BGB, Kontext und was das bedeutet, 2-3 Sätze",
    "arbeitslosengeld": "Antwort auf 'Wann muss ich mich arbeitslos melden?' — sofort bei Kenntnis der Kündigung, spätestens 3 Tage nach Erhalt, Sperrzeit-Risiko bei Aufhebungsvertrag, 2-3 Sätze"
  }
}

Wichtig:
- Alle Texte auf Deutsch
- Natürliche, verständliche Sprache — kein Juristendeutsch
- §-Referenzen einbauen: §4 KSchG, §622 BGB, §1 KSchG, §23 KSchG wo relevant
- Empathisch aber sachlich — der Nutzer ist in einer Stresssituation
- NUR valides JSON zurückgeben, keine anderen Texte
- Keine Markdown-Formatierung`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
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
  const results: GeneratedKuendigungContent[] = [];
  const outputPath = path.join(
    process.cwd(),
    "lib",
    "generated-kuendigung-content.json"
  );

  let existingData: GeneratedKuendigungContent[] = [];
  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(
      `Resuming — ${existingData.length} years already done.`
    );
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

  console.log(`\n✅ All 40 years generated!`);

  const tsOutput = `// Auto-generated by scripts/generate-kuendigung-content.ts
// Do not edit manually

export interface GeneratedKuendigungContent {
  year: number;
  word: string;
  kuendigungsfrist: string;
  uniqueIntro: string;
  sofortmassnahmen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wasJetzt: string;
    frist: string;
    abfindung: string;
    kuendigungsfristDetails: string;
    arbeitslosengeld: string;
  };
}

export const generatedKuendigungContent: GeneratedKuendigungContent[] = ${JSON.stringify(results, null, 2)};

export function getKuendigungContentForYear(year: number): GeneratedKuendigungContent | undefined {
  return generatedKuendigungContent.find((c) => c.year === year);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-kuendigung-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`Output: lib/generated-kuendigung-content.ts`);
}

generateAllContent();
