import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

const entries = [
  { slug: 'kuendigung-schwangerschaft', h1: 'Kündigung während der Schwangerschaft — was tun?', gesetz: '§17 MuSchG' },
  { slug: 'kuendigung-nach-elternzeit', h1: 'Kündigung nach der Elternzeit — was tun?', gesetz: '§18 BEEG' },
  { slug: 'kuendigung-krankschreibung', h1: 'Kündigung während Krankschreibung — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-wegen-krankheit', h1: 'Kündigung wegen Krankheit — wirksam oder nicht?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-kurz-vor-rente', h1: 'Kündigung kurz vor der Rente — Ihre Rechte', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-zwei-jahre-vor-rente', h1: 'Kündigung 2 Jahre vor der Rente — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-fuenf-jahre-vor-rente', h1: 'Kündigung 5 Jahre vor der Rente — Ihre Rechte', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-schwerbehinderung', h1: 'Kündigung bei Schwerbehinderung — besonderer Schutz', gesetz: '§168 SGB IX' },
  { slug: 'kuendigung-probezeit', h1: 'Kündigung in der Probezeit — was gilt?', gesetz: '§622 BGB' },
  { slug: 'kuendigung-minijob', h1: 'Kündigung im Minijob — Ihre Rechte', gesetz: '§622 BGB' },
  { slug: 'kuendigung-teilzeit', h1: 'Kündigung in Teilzeit — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-betriebsuebergang', h1: 'Kündigung nach Betriebsübergang — Ihre Rechte', gesetz: '§613a BGB' },
  { slug: 'kuendigung-betriebsrat', h1: 'Kündigung als Betriebsratsmitglied', gesetz: '§15 KSchG' },
  { slug: 'kuendigung-fuehrungskraft', h1: 'Kündigung als Führungskraft — besondere Regeln', gesetz: '§14 KSchG' },
  { slug: 'kuendigung-ausbildung', h1: 'Kündigung in der Ausbildung — was gilt?', gesetz: '§22 BBiG' },
];

export interface GeneratedLebenssituationContent {
  slug: string;
  h1: string;
  gesetz: string;
  uniqueIntro: string;
  besondererSchutz: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    schutz: string;
    frist: string;
    abfindung: string;
    vorgehen: string;
    kosten: string;
  };
}

async function generateContentForEntry(
  entry: (typeof entries)[0]
): Promise<GeneratedLebenssituationContent> {
  const prompt = `Du bist Fachanwalt für Arbeitsrecht. Erstelle Content für '${entry.h1}'.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "3-4 Sätze spezifisch für diese Situation. Beginne empathisch. Erkläre den rechtlichen Hintergrund mit ${entry.gesetz} und anderen relevanten §-Referenzen. Erwähne die 3-Wochen-Klagefrist (§4 KSchG).",

  "besondererSchutz": "5-6 Sätze über besonderen Kündigungsschutz in dieser Situation. Erkläre ${entry.gesetz} im Detail, welche Voraussetzungen für eine wirksame Kündigung erfüllt sein müssen, welche behördlichen Genehmigungen ggf. erforderlich sind. §-Referenzen einbauen.",

  "fallkonstellation": "Konkretes Praxisbeispiel (4-5 Sätze) das zeigt wie dieser Fall erfolgreich gelöst wurde. Realistischer Fall mit konkretem Ergebnis (Abfindung, Weiterbeschäftigung, etc.). Motivierend für den Leser.",

  "praxistipp": "Spezifischer Tipp (2-3 Sätze) NUR für diese Situation. Was sollte man in genau dieser Lebenssituation als Erstes tun? Konkret und umsetzbar.",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für diese Situation relevant ist. Nur echte Aktenzeichen.",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer in dieser Situation relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "schutz": "Antwort auf 'Welchen besonderen Schutz gibt es in dieser Situation?' — 3-4 Sätze mit §-Referenzen",
    "frist": "Antwort auf 'Welche Fristen gelten?' — 3 Sätze über 3-Wochen-Klagefrist + situationsspezifische Fristen",
    "abfindung": "Antwort auf 'Welche Abfindung ist realistisch?' — 3-4 Sätze mit konkreten Zahlen/Faktoren",
    "vorgehen": "Antwort auf 'Wie soll ich konkret vorgehen?' — 3-4 Sätze Schritt-für-Schritt",
    "kosten": "Antwort auf 'Was kostet eine Kündigungsschutzklage?' — 3 Sätze über Kosten, §12a ArbGG, Rechtsschutzversicherung"
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
    slug: entry.slug,
    h1: entry.h1,
    gesetz: entry.gesetz,
    ...parsed,
  };
}

async function generateAllContent() {
  const results: GeneratedLebenssituationContent[] = [];
  const outputPath = path.join(
    process.cwd(),
    "lib",
    "generated-lebenssituation-content.json"
  );

  let existingData: GeneratedLebenssituationContent[] = [];
  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(`Resuming — ${existingData.length} entries already done.`);
  }

  const completedSlugs = new Set(existingData.map((d) => d.slug));

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (completedSlugs.has(entry.slug)) {
      console.log(`✓ ${entry.slug} already generated — skipping`);
      results.push(existingData.find((d) => d.slug === entry.slug)!);
      continue;
    }

    console.log(`Generating content for ${i + 1}/${entries.length}: ${entry.slug}...`);

    try {
      const content = await generateContentForEntry(entry);
      results.push(content);

      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      console.log(`✓ ${entry.slug} done`);

      if (i < entries.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`✗ Error on ${entry.slug}:`, error);
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      process.exit(1);
    }
  }

  console.log(`\n✅ All ${entries.length} Lebenssituation entries generated!`);

  const tsOutput = `// Auto-generated by scripts/generate-lebenssituation-content.ts
// Do not edit manually

export interface GeneratedLebenssituationContent {
  slug: string;
  h1: string;
  gesetz: string;
  uniqueIntro: string;
  besondererSchutz: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    schutz: string;
    frist: string;
    abfindung: string;
    vorgehen: string;
    kosten: string;
  };
}

export const generatedLebenssituationContent: GeneratedLebenssituationContent[] = ${JSON.stringify(results, null, 2)};

export function getLebenssituationContent(slug: string): GeneratedLebenssituationContent | undefined {
  return generatedLebenssituationContent.find((c) => c.slug === slug);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-lebenssituation-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`Output: lib/generated-lebenssituation-content.ts`);
}

generateAllContent();
