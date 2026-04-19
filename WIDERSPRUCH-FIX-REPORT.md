# Widerspruch-Fix: Implementierungsbericht

## Datum: 2026-04-19
## Durchgeführt von: Claude Code (Opus 4.6)

---

## Ergebnis

- **Fundstellen gesamt:** 48
- **Entfernt/korrigiert:** 7 (alle FALSCH-Kategorien)
- **Als KORREKT belassen:** 41
- **Offene TODOs (UNKLAR):** 0

---

## Geänderte Dateien

### Commit 1: `docs: add widerspruch audit analysis`
- `WIDERSPRUCH-AUDIT.md` — Audit-Report mit vollständiger Kategorisierung

### Commit 2: `fix(content): remove incorrect widerspruch step from fristlose-kuendigung`

| Datei | Änderung |
|-------|----------|
| `app/fristlose-kuendigung-jahre/[slug]/content.tsx` | Step "Schriftlich widersprechen" aus 5-Schritt-Liste entfernt → 4 Schritte. Re-Numbering automatisch (Array mit `.map((step, i)` → `i+1`). |
| `lib/generated-fristlos-content.ts` Zeile 32 | praxistipp: "Widersprechen Sie der fristlosen Kündigung sofort schriftlich" → "Notieren Sie sofort das Zugangsdatum der Kündigung" |
| `lib/generated-fristlos-content.ts` Zeile 432 | praxistipp: "Widersprechen Sie der fristlosen Kündigung sofort schriftlich" → "Notieren Sie sofort das Zugangsdatum der Kündigung" |
| `lib/generated-fristlos-content.ts` Zeile 672 | praxistipp: "Widersprechen Sie der Kündigung schriftlich" → "Reichen Sie fristgerecht Kündigungsschutzklage ein (§ 4 KSchG, 3-Wochen-Frist)" |
| `lib/generated-fristlos-content.json` Zeile 8 | JSON-Cache: gleicher Fix wie .ts Zeile 32 |
| `lib/generated-fristlos-content.json` Zeile 408 | JSON-Cache: gleicher Fix wie .ts Zeile 432 |
| `lib/generated-fristlos-content.json` Zeile 648 | JSON-Cache: gleicher Fix wie .ts Zeile 672 |

---

## HowTo-Schema-Updates

Die Seite `app/fristlose-kuendigung-jahre/[slug]/content.tsx` hat **kein** JSON-LD HowTo-Schema. Die Schritt-Liste wird rein visuell als nummeriertes Array gerendert mit `.map((step, i) => ... {i+1})`. Durch die Entfernung des Array-Elements erfolgt das Re-Numbering automatisch (5→4 Schritte, Nummerierung 1–4 lückenlos).

---

## Content-Script-Prevention

Die Generierungs-Scripts wurden geprüft:
- `scripts/generate-fristlos-content.ts` — enthält **keine** explizite Anweisung zum "Widersprechen". Der fehlerhafte Content wurde von der KI generiert ohne expliziten Prompt dafür.
- `scripts/generate-content.ts` — keine "Widerspruch"-Referenzen.
- `scripts/generate-abmahnung-content.ts` — korrekte Referenzen zu Abmahnung-Widerspruch (§ 83 BetrVG), unverändert.
- `scripts/generate-muster-content.ts` — korrekte Referenzen zu Muster "Widerspruch gegen Abmahnung", unverändert.

**Empfehlung:** Falls Content periodisch regeneriert wird, sollte im System-Prompt der generate-fristlos-content.ts eine Negativ-Anweisung ergänzt werden:
```
WICHTIG: Erwähne NIE „Widerspruch einlegen" oder „schriftlich widersprechen" als
Handlungsempfehlung für Arbeitnehmer bei Kündigungen. Gegen eine Kündigung gibt es
im deutschen Arbeitsrecht keinen Widerspruch – der einzige Rechtsweg ist die
Kündigungsschutzklage nach § 4 KSchG (3 Wochen Frist).
```
Aktuell wurde diese Änderung **nicht** implementiert, da der Content statisch gecached ist und nicht automatisch regeneriert wird.

---

## Belassene Fundstellen (KORREKT)

| Kontext | Anzahl | Rechtsgrundlage |
|---------|--------|-----------------|
| Widerspruch gegen Abmahnung | 28 | § 83 Abs. 2 BetrVG |
| Widerspruchsrecht bei Betriebsübergang | 3 | § 613a Abs. 6 BGB |
| Widerspruch MuSchG (Schwangerschaft mitteilen) | 6 | § 17 Abs. 1 Satz 3 MuSchG |
| Widerspruchsrecht DSGVO | 2 | Art. 21 DSGVO |
| Narrativ in Fallkonstellationen ("widersprach er") | 4 | Keine Empfehlung, nur Erzählung |

---

## Offene TODOs

Keine.

---

## Build-Test

`npm run build` — erfolgreich, keine Fehler.

---

## Haftungs-Hinweis

Die Fundstellen waren Content-Fehler mit potenziellem Haftungsrisiko (§ 43a BRAO). Falls die Seite archiviert/gecached ist (Wayback Machine, Google Cache), sollte eine Pressemitteilung oder ein Hinweis-Banner erwogen werden — das ist aber außerhalb dieses Laufs.
