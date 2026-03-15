import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

const entries = [
  { count: 1, word: "einer", slug: "einer-abmahnung" },
  { count: 2, word: "zwei", slug: "zwei-abmahnungen" },
  { count: 3, word: "drei", slug: "drei-abmahnungen" },
  { count: 4, word: "vier", slug: "vier-abmahnungen" },
  { count: 5, word: "fünf", slug: "fuenf-abmahnungen" },
];

export interface GeneratedAbmahnungContent {
  count: number;
  word: string;
  uniqueIntro: string;
  rechtlicheGrundlagen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wirksamkeit: string;
    formfehler: string;
    abfindung: string;
    widerspruch: string;
    kuendigungsschutz: string;
  };
}

async function generateContentForCount(
  count: number
): Promise<GeneratedAbmahnungContent> {
  const entry = entries.find((e) => e.count === count)!;
  const abmahnungText = count === 1 ? "1 Abmahnung" : `${count} Abmahnungen`;

  const prompt = `Du bist ein erfahrener Fachanwalt für Arbeitsrecht in Deutschland mit 20+ Jahren Erfahrung.
Erstelle einzigartigen, informativen Content für eine Seite "Kündigung nach ${abmahnungText} — wirksam oder nicht?"

Die Seite richtet sich an Arbeitnehmer die nach ${abmahnungText} eine Kündigung erhalten haben und wissen müssen, ob die Kündigung wirksam ist und was sie tun können.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "Ein einzigartiger Einleitungsabsatz (3-4 Sätze) SPEZIFISCH für eine Kündigung nach ${abmahnungText}. Beginne empathisch. Erkläre wann ${count === 1 ? 'eine einzige Abmahnung' : `${count} Abmahnungen`} für eine verhaltensbedingte Kündigung ${count === 1 ? 'ausreichen kann und wann nicht' : 'ausreichen und wann nicht'}. Erwähne die 3-Wochen-Klagefrist (§4 KSchG). ${count === 1 ? 'Bei 1 Abmahnung: oft reicht eine einzige Abmahnung NICHT für eine wirksame Kündigung — es gibt aber Ausnahmen bei schweren Pflichtverletzungen.' : count <= 3 ? `Bei ${count} Abmahnungen: die Erfolgsaussichten des Arbeitgebers steigen, aber es kommt auf die Gleichartigkeit der Verstöße an.` : `Bei ${count} Abmahnungen: der Arbeitgeber hat eine stärkere Position, aber selbst hier gibt es häufig Formfehler oder die Abmahnungen sind nicht einschlägig.`}",

  "rechtlicheGrundlagen": "Rechtliche Grundlagen (4-5 Sätze) SPEZIFISCH für ${abmahnungText} vor der Kündigung. Erkläre: Abmahnerfordernis bei verhaltensbedingter Kündigung (§1 KSchG), Prognoseprinzip, Gleichartigkeit der Verstöße (die Abmahnung muss das GLEICHE Fehlverhalten betreffen wie die Kündigung), Warnfunktion der Abmahnung. ${count === 1 ? 'Bei 1 Abmahnung: wann reicht eine einzige Abmahnung — nur bei gleichartigem Verstoß und wenn die Abmahnung formell korrekt war.' : count <= 3 ? `Bei ${count} Abmahnungen: Bedeutung der Steigerung (jede Abmahnung muss den gleichen Pflichtenkreis betreffen), Verhältnismäßigkeit.` : `Bei ${count} Abmahnungen: Risiko der Entwertung (zu viele Abmahnungen ohne Konsequenz können die Warnfunktion abschwächen), sog. Abmahnungsinflation.`} §-Referenzen einbauen.",

  "fallkonstellation": "Ein typisches Praxisbeispiel (4-5 Sätze) SPEZIFISCH für Kündigung nach ${abmahnungText}. Beschreibe einen konkreten Fall: Arbeitnehmer erhielt ${abmahnungText} wegen [konkretes Fehlverhalten] und dann eine verhaltensbedingte Kündigung. Zeige welche Fehler der Arbeitgeber gemacht hat (z.B. Abmahnungen nicht gleichartig, Formfehler, keine Anhörung Betriebsrat) und welches Ergebnis erzielt wurde. Realistisch und motivierend.",

  "praxistipp": "Ein konkreter, einzigartiger Praxistipp (2-3 Sätze) SPEZIFISCH für Kündigung nach ${abmahnungText}. ${count === 1 ? 'Z.B.: Prüfen ob die Abmahnung formell korrekt war (konkrete Beschreibung des Fehlverhaltens, Androhung arbeitsrechtlicher Konsequenzen), ob der Verstoß gleichartig ist.' : count <= 3 ? 'Z.B.: Prüfen ob alle Abmahnungen den gleichen Pflichtenkreis betreffen, ob der zeitliche Abstand zwischen Abmahnungen und Kündigung angemessen ist.' : 'Z.B.: Prüfen ob die Vielzahl der Abmahnungen die Warnfunktion entwertet hat (Abmahnungsinflation), ob der Arbeitgeber durch bloßes Abmahnen ein Verhalten konkludent geduldet hat.'}",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für Kündigungen nach Abmahnungen relevant ist. Nur echte Aktenzeichen z.B. '2 AZR 840/16' oder '2 AZR 170/17'",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer mit ${abmahnungText} vor der Kündigung relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "wirksamkeit": "Antwort auf 'Ist die Kündigung nach ${abmahnungText} wirksam?' — 3-4 Sätze, spezifisch für ${count} Abmahnung(en), Prognoseprinzip, Gleichartigkeit, §1 KSchG",
    "formfehler": "Antwort auf 'Welche Formfehler machen die Abmahnung unwirksam?' — 3 Sätze, konkrete Beschreibung des Fehlverhaltens erforderlich, Androhung von Konsequenzen, Zugang",
    "abfindung": "Antwort auf 'Habe ich trotz Abmahnung Anspruch auf Abfindung?' — 3-4 Sätze, Kündigungsschutzklage, Vergleich, realistische Einschätzung",
    "widerspruch": "Antwort auf 'Soll ich der Abmahnung widersprechen?' — 3 Sätze, Gegendarstellung nach §83 Abs. 2 BetrVG, Vor- und Nachteile",
    "kuendigungsschutz": "Antwort auf 'Gilt mein Kündigungsschutz trotz Abmahnung?' — 3 Sätze, KSchG gilt weiterhin, Beweislast beim Arbeitgeber, §1 KSchG"
  }
}

Wichtig:
- Alle Texte auf Deutsch
- Natürliche, verständliche Sprache — kein Juristendeutsch
- §-Referenzen einbauen: §1 KSchG, §4 KSchG, §626 BGB, §314 BGB, §102 BetrVG wo relevant
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
    count,
    word: entry.word,
    ...parsed,
  };
}

async function generateAllContent() {
  const results: GeneratedAbmahnungContent[] = [];
  const outputPath = path.join(
    process.cwd(),
    "lib",
    "generated-abmahnung-content.json"
  );

  let existingData: GeneratedAbmahnungContent[] = [];
  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(`Resuming — ${existingData.length} entries already done.`);
  }

  const completedCounts = new Set(existingData.map((d) => d.count));

  for (let count = 1; count <= 5; count++) {
    if (completedCounts.has(count)) {
      console.log(`✓ Count ${count} already generated — skipping`);
      results.push(existingData.find((d) => d.count === count)!);
      continue;
    }

    console.log(`Generating content for ${count}/5 Abmahnung(en)...`);

    try {
      const content = await generateContentForCount(count);
      results.push(content);

      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      console.log(`✓ Count ${count} done`);

      if (count < 5) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`✗ Error on count ${count}:`, error);
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      process.exit(1);
    }
  }

  console.log(`\n✅ All 5 Abmahnung entries generated!`);

  const tsOutput = `// Auto-generated by scripts/generate-abmahnung-content.ts
// Do not edit manually

export interface GeneratedAbmahnungContent {
  count: number;
  word: string;
  uniqueIntro: string;
  rechtlicheGrundlagen: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    wirksamkeit: string;
    formfehler: string;
    abfindung: string;
    widerspruch: string;
    kuendigungsschutz: string;
  };
}

export const generatedAbmahnungContent: GeneratedAbmahnungContent[] = ${JSON.stringify(results, null, 2)};

export function getAbmahnungContentForCount(count: number): GeneratedAbmahnungContent | undefined {
  return generatedAbmahnungContent.find((c) => c.count === count);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-abmahnung-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`Output: lib/generated-abmahnung-content.ts`);
}

generateAllContent();
