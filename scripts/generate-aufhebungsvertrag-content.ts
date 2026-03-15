import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

const entries = [
  { slug: 'aufhebungsvertrag-abfindung', h1: 'Abfindung im Aufhebungsvertrag — wie hoch und wie verhandeln?' },
  { slug: 'aufhebungsvertrag-ablehnen', h1: 'Aufhebungsvertrag ablehnen — wann ist das sinnvoll?' },
  { slug: 'aufhebungsvertrag-sperrzeit', h1: 'Aufhebungsvertrag Sperrzeit vermeiden — so geht\u2019s' },
  { slug: 'aufhebungsvertrag-muster', h1: 'Aufhebungsvertrag Muster & Checkliste' },
  { slug: 'aufhebungsvertrag-widerruf', h1: 'Aufhebungsvertrag widerrufen — ist das möglich?' },
  { slug: 'aufhebungsvertrag-zeugnis', h1: 'Aufhebungsvertrag und Zeugnis — worauf achten?' },
  { slug: 'aufhebungsvertrag-vor-nachteile', h1: 'Aufhebungsvertrag Vor- und Nachteile' },
];

export interface GeneratedAufhebungsvertragContent {
  slug: string;
  h1: string;
  uniqueIntro: string;
  hauptteil: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    grundsatz: string;
    sperrzeit: string;
    abfindung: string;
    frist: string;
    risiken: string;
  };
}

async function generateContentForEntry(
  entry: (typeof entries)[0]
): Promise<GeneratedAufhebungsvertragContent> {
  const prompt = `Du bist Fachanwalt für Arbeitsrecht. Erstelle Content für '${entry.h1}'.

Erstelle NUR das folgende JSON-Objekt, ohne Markdown-Backticks oder sonstige Formatierung:

{
  "uniqueIntro": "3-4 Sätze spezifisch für dieses Thema. Beginne empathisch. Erkläre den rechtlichen Hintergrund mit relevanten §-Referenzen (§159 SGB III für Sperrzeit, §623 BGB für Schriftform, etc.). Mache deutlich warum anwaltliche Prüfung wichtig ist.",

  "hauptteil": "5-6 Sätze ausführliche Erklärung des Themas. Rechtliche Grundlagen mit §-Referenzen. Was gilt in der Praxis? Worauf muss man besonders achten? Konkrete Empfehlungen.",

  "fallkonstellation": "Konkretes Praxisbeispiel (4-5 Sätze) das zeigt wie dieser Fall erfolgreich gelöst wurde. Realistischer Fall mit konkretem Ergebnis (bessere Abfindung, Sperrzeit vermieden, etc.). Motivierend für den Leser.",

  "praxistipp": "Spezifischer Tipp (2-3 Sätze) NUR für dieses Thema. Was sollte man als Erstes tun? Konkret und umsetzbar.",

  "bagUrteil": {
    "aktenzeichen": "Ein REALES BAG-Urteil das für dieses Thema relevant ist. Nur echte Aktenzeichen z.B. '6 AZR 75/18'.",
    "kurzbeschreibung": "Kurze Beschreibung des Urteils in 1-2 Sätzen",
    "relevanz": "Warum dieses Urteil für Arbeitnehmer in dieser Situation relevant ist (1 Satz)"
  },

  "faqAnswers": {
    "grundsatz": "Antwort auf die Grundsatzfrage zu diesem Thema — 3-4 Sätze mit §-Referenzen",
    "sperrzeit": "Antwort auf 'Wie vermeidet man die Sperrzeit beim Aufhebungsvertrag?' — 3-4 Sätze, §159 SGB III, Gestaltungsmöglichkeiten",
    "abfindung": "Antwort auf 'Welche Abfindung ist realistisch?' — 3-4 Sätze mit konkreten Zahlen/Faktoren",
    "frist": "Antwort auf 'Welche Fristen gelten?' — 3 Sätze, keine Widerrufsfrist, Bedenkzeit, Überrumpelungsverbot",
    "risiken": "Antwort auf 'Was sind die größten Risiken beim Aufhebungsvertrag?' — 3-4 Sätze über Sperrzeit, zu niedrige Abfindung, fehlende Regelungen"
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
    ...parsed,
  };
}

async function generateAllContent() {
  const results: GeneratedAufhebungsvertragContent[] = [];
  const outputPath = path.join(
    process.cwd(),
    "lib",
    "generated-aufhebungsvertrag-content.json"
  );

  let existingData: GeneratedAufhebungsvertragContent[] = [];
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

  console.log(`\n✅ All ${entries.length} Aufhebungsvertrag entries generated!`);

  const tsOutput = `// Auto-generated by scripts/generate-aufhebungsvertrag-content.ts
// Do not edit manually

export interface GeneratedAufhebungsvertragContent {
  slug: string;
  h1: string;
  uniqueIntro: string;
  hauptteil: string;
  fallkonstellation: string;
  praxistipp: string;
  bagUrteil: {
    aktenzeichen: string;
    kurzbeschreibung: string;
    relevanz: string;
  };
  faqAnswers: {
    grundsatz: string;
    sperrzeit: string;
    abfindung: string;
    frist: string;
    risiken: string;
  };
}

export const generatedAufhebungsvertragContent: GeneratedAufhebungsvertragContent[] = ${JSON.stringify(results, null, 2)};

export function getAufhebungsvertragContent(slug: string): GeneratedAufhebungsvertragContent | undefined {
  return generatedAufhebungsvertragContent.find((c) => c.slug === slug);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", "generated-aufhebungsvertrag-content.ts"),
    tsOutput,
    "utf-8"
  );
  console.log(`Output: lib/generated-aufhebungsvertrag-content.ts`);
}

generateAllContent();
