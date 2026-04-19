# Widerspruch-Audit: gekuendigt-abfindung.de

## Datum: 2026-04-19
## Durchgeführt von: Claude Code (Opus 4.6)

---

## Zusammenfassung

- **Fundstellen gesamt:** 48
- **FALSCH (Arbeitnehmer widerspricht Kündigung):** 7
- **KORREKT (Abmahnung-Widerspruch, Betriebsübergang, DSGVO, MuSchG):** 41
- **UNKLAR:** 0

---

## Kategorisierung der Fundstellen

### FALSCH — Arbeitnehmer "widerspricht" Kündigung (ENTFERNEN)

| # | Datei | Zeile | Kontext | Art | Aktion |
|---|-------|-------|---------|-----|--------|
| F1 | `app/fristlose-kuendigung-jahre/[slug]/content.tsx` | 271 | Step 2 "Schriftlich widersprechen" in Sofortmaßnahmen-Liste | HowTo-Step | ENTFERNEN + Re-Numbering |
| F2 | `lib/generated-fristlos-content.ts` | 32 | praxistipp: "Widersprechen Sie der fristlosen Kündigung sofort schriftlich" (1 Jahr BZ) | Praxistipp-Fließtext | UMFORMULIEREN |
| F3 | `lib/generated-fristlos-content.ts` | 432 | praxistipp: "Widersprechen Sie der fristlosen Kündigung sofort schriftlich" (20 Jahre BZ) | Praxistipp-Fließtext | UMFORMULIEREN |
| F4 | `lib/generated-fristlos-content.ts` | 672 | praxistipp: "Widersprechen Sie der Kündigung schriftlich" (33 Jahre BZ) | Praxistipp-Fließtext | UMFORMULIEREN |
| F5 | `lib/generated-fristlos-content.json` | 8 | Gleicher Text wie F2 (JSON-Cache) | JSON-Duplikat | UMFORMULIEREN |
| F6 | `lib/generated-fristlos-content.json` | 408 | Gleicher Text wie F3 (JSON-Cache) | JSON-Duplikat | UMFORMULIEREN |
| F7 | `lib/generated-fristlos-content.json` | 648 | Gleicher Text wie F4 (JSON-Cache) | JSON-Duplikat | UMFORMULIEREN |

### KORREKT — Widerspruch gegen Abmahnung (BEHALTEN)

Widerspruch/Gegendarstellung gegen Abmahnung ist ein legitimes Rechtsmittel (§ 83 Abs. 2 BetrVG).

| # | Datei | Zeile | Kontext | Begründung |
|---|-------|-------|---------|------------|
| K1–K5 | `lib/generated-abmahnung-content.json` | 18, 38, 58, 78, 98 | FAQ "widerspruch"-Feld für 1–5 Abmahnungen | Widerspruch gegen Abmahnung ist korrekt |
| K6–K10 | `lib/generated-abmahnung-content.ts` | 20, 42, 62, 82, 102, 122 | Gleiche Felder (TS-Version) | Widerspruch gegen Abmahnung ist korrekt |
| K11 | `app/abmahnung-seiten/[slug]/page.tsx` | 45 | FAQ "Soll ich der Abmahnung widersprechen?" | Korrekte Frage |
| K12 | `app/abmahnung-seiten/[slug]/content.tsx` | 148, 156, 159-160 | Section "Widerspruch gegen die Abmahnung" | Korrekter Kontext |
| K13 | `scripts/generate-abmahnung-content.ts` | 31, 68, 165 | Interface + Prompt für Abmahnung-FAQ | Korrekter Kontext |
| K14 | `app/abmahnung/page.tsx` | 21, 27, 33, 47-48, 66, 155 | Meta-Tags + FAQ + Fließtext zu Abmahnung | Korrekter Kontext |
| K15–K16 | `lib/muster-data.ts` | 12-17 | Muster "Widerspruch gegen Abmahnung" | Korrektes Muster |
| K17 | `scripts/generate-muster-content.ts` | 8, 36-38, 43, 116 | Muster-Generierung Abmahnung-Widerspruch | Korrekter Kontext |
| K18 | `lib/generated-muster-content.ts` | 17, 25-28 | Generierter Muster-Inhalt | Korrekter Kontext |
| K19 | `lib/generated-muster-content.json` | 2-5 | JSON-Cache des Musters | Korrekter Kontext |
| K20 | `lib/generated-muster-page-content.ts` | 21-39 | Slug "widerspruch-abmahnung" + FAQ | Korrekter Kontext |
| K21 | `lib/generated-muster-page-content.json` | 3-21 | JSON-Cache | Korrekter Kontext |
| K22 | `app/ratgeber/page.tsx` | 23, 102 | Liste + FAQ über Muster | Korrekter Kontext |
| K23 | `app/ratgeber/muster/page.tsx` | 17-22 | FAQ Widerspruch vs. Gegendarstellung | Korrekter Kontext |
| K24 | `app/ratgeber/muster/layout.tsx` | 6 | Meta-Description | Korrekter Kontext |
| K25 | `components/RelatedTopics.tsx` | 32 | "Widerspruch und Gegendarstellung" | Korrekter Kontext |
| K26 | `app/llms.txt/route.ts` | 27 | "Muster für Widerspruch, Gegendarstellung..." | Korrekter Kontext |
| K27 | `app/llms-full.txt/route.ts` | 99 | Gleicher Kontext | Korrekter Kontext |
| K28 | `public/.well-known/ai-plugin.json` | 55 | Scope "Widerspruch gegen Abmahnung" | Korrekter Kontext |

### KORREKT — Betriebsübergang § 613a BGB (BEHALTEN)

| # | Datei | Zeile | Kontext | Begründung |
|---|-------|-------|---------|------------|
| K29 | `app/glossar/page.tsx` | 102 | "hat ein Widerspruchsrecht" bei Betriebsübergang | § 613a Abs. 6 BGB — korrektes Widerspruchsrecht |
| K30 | `lib/generated-lebenssituation-content.ts` | 273 | "einmonatiges Widerspruchsrecht gegen den Übergang" | § 613a Abs. 6 BGB — korrekt |
| K31 | `lib/generated-lebenssituation-content.json` | 248 | JSON-Cache, gleicher Inhalt | Korrekt |

### KORREKT — MuSchG § 17 (BEHALTEN)

Schwangere Arbeitnehmerinnen haben ein spezifisches Mitteilungsrecht nach § 17 Abs. 1 Satz 3 MuSchG (innerhalb von 2 Wochen Schwangerschaft mitteilen, damit der Kündigungsschutz greift). Die Formulierung "Widerspruch" ist hier zwar umgangssprachlich, aber der gesetzliche Kontext (MuSchG) ist korrekt referenziert.

| # | Datei | Zeile | Kontext | Begründung |
|---|-------|-------|---------|------------|
| K32 | `lib/generated-lebenssituation-content.ts` | 37 | BAG-Urteil Beschreibung: "fristgerecht Widerspruch einlegt" | MuSchG-Kontext, BAG-Urteil |
| K33 | `lib/generated-lebenssituation-content.ts` | 41 | FAQ "schutz": "Widerspruch eingelegt werden" (§17 MuSchG) | MuSchG-Kontext |
| K34 | `lib/generated-lebenssituation-content.ts` | 42 | FAQ "frist": "Widerspruch gegen die Kündigung einzulegen" (§17 MuSchG) | MuSchG-Kontext |
| K35 | `lib/generated-lebenssituation-content.ts` | 44 | FAQ "vorgehen": "Legen Sie sofort schriftlich Widerspruch ... ein" | MuSchG-Kontext |
| K36–K39 | `lib/generated-lebenssituation-content.json` | 12, 16, 17, 19 | JSON-Cache, gleiche Inhalte | MuSchG-Kontext |

### KORREKT — DSGVO Art. 21 (BEHALTEN)

| # | Datei | Zeile | Kontext | Begründung |
|---|-------|-------|---------|------------|
| K40 | `app/privacy-policy/page.tsx` | 92-93 | "Widerspruchsrecht (Art. 21 DSGVO)" | DSGVO — korrektes Recht |
| K41 | `app/privacy-policy/page.tsx` | 170 | "Widerspruch" gegen Google Analytics | DSGVO-Kontext |

### KORREKT — Fallkonstellation (narrativ, BEHALTEN)

Diese Texte beschreiben fiktive Fallbeispiele, in denen "widersprach er der Kündigung" als narrative Beschreibung einer Handlung (= Klageerhebung) verwendet wird. Der Kontext ist keine Handlungsempfehlung.

| # | Datei | Zeile | Kontext | Begründung |
|---|-------|-------|---------|------------|
| K42 | `lib/generated-content.ts` | 91 | "widersprach er der Kündigung" (4 Jahre BZ Fallkonstellation) | Narrativ, keine Empfehlung |
| K43 | `lib/generated-content.ts` | 551 | "widersprach er der Kündigung" (27 Jahre BZ Fallkonstellation) | Narrativ, keine Empfehlung |
| K44 | `lib/generated-content.ts` | 651 | "widersprach er der Kündigung" (32 Jahre BZ Fallkonstellation) | Narrativ, keine Empfehlung |
| K45 | `lib/generated-content.ts` | 771 | "widersprach er der Kündigung" (38 Jahre BZ Fallkonstellation) | Narrativ, keine Empfehlung |
| K46–K49 | `lib/generated-content.json` | 67, 527, 627, 747 | JSON-Cache, gleiche Fallkonstellationen | Narrativ, keine Empfehlung |

---

## Entscheidungsmatrix — Aktionen

| Datei | Zeile | Kategorie | Aktion | Begründung |
|-------|-------|-----------|--------|------------|
| `app/fristlose-kuendigung-jahre/[slug]/content.tsx` | 271 | FALSCH | ENTFERNEN + Re-Numbering | Step 2 von 5: "Schriftlich widersprechen" — juristisch falsch, kein Widerspruchsrecht bei Kündigung |
| `lib/generated-fristlos-content.ts` | 32 | FALSCH | UMFORMULIEREN | "Widersprechen Sie der fristlosen Kündigung sofort schriftlich" → ersetzen durch korrekte Empfehlung |
| `lib/generated-fristlos-content.ts` | 432 | FALSCH | UMFORMULIEREN | Gleicher Fehler, andere BZ-Stufe |
| `lib/generated-fristlos-content.ts` | 672 | FALSCH | UMFORMULIEREN | Gleicher Fehler, andere BZ-Stufe |
| `lib/generated-fristlos-content.json` | 8, 408, 648 | FALSCH | UMFORMULIEREN | JSON-Cache — muss konsistent mit .ts-Datei sein |
| Alle anderen | — | KORREKT | BEHALTEN | Abmahnung, Betriebsübergang, MuSchG, DSGVO, narrativ |
