# i18n-Wörterbuch — DE + EN strukturell gleichhalten

**Ziel:** Wenn eine Textstelle in DE geändert wird, soll das EN-Pendant *strukturell garantiert* denselben Aufbau haben. Keine Sprache „vergisst" einen Abschnitt. Die eigentliche Übersetzung bleibt menschliche Arbeit.

## Wie es funktioniert

Alle wiederverwendeten UI-Texte (Hero, Prozess, CTAs, Trust-Elemente, Kontaktbereich, die zwei neuen FAQs) leben zentral in [`lib/i18n/strings.ts`](../../lib/i18n/strings.ts).

```
lib/i18n/strings.ts
  ├── const de = { hero: {...}, process: {...}, contact: {...}, ... }
  ├── type Translation = typeof de
  └── const en: Translation = { hero: {...}, process: {...}, contact: {...}, ... }
```

Der TypeScript-Compiler erzwingt, dass `en` **exakt dieselben Schlüssel** hat wie `de`. Fehlt oder fügt man einen Schlüssel hinzu, bricht der Build ab.

## Textänderung — Schritt für Schritt

### Fall 1: Du änderst nur den deutschen Wortlaut

```ts
// lib/i18n/strings.ts
const de = {
  hero: {
-   lede: 'Nach einer Kündigung haben Sie nur 3 Wochen …',
+   lede: 'Nach einer Kündigung haben Sie genau 3 Wochen Zeit …',
  },
}
```

Ergebnis: DE-Hero zeigt den neuen Text. **EN-Hero bleibt unverändert** — bis du auch `en.hero.lede` anpasst. So siehst du im Code-Review sofort, dass EN nachgezogen werden muss.

### Fall 2: Du fügst einen ganz neuen Abschnitt hinzu

Du musst ihn in **beiden** Objekten `de` und `en` ergänzen. Sonst → Build-Fehler. Beispiel:

```ts
const de = {
  hero: { … },
+ newBlock: { title: 'Neue Überschrift', body: 'Neuer Text.' },
  …
}
const en: Translation = {
  hero: { … },
+ newBlock: { title: 'New headline', body: 'New text.' },
  …
}
```

Fehlt der `newBlock` in `en`, liefert `tsc` einen Fehler wie:
```
Property 'newBlock' is missing in type '...' but required in type 'Translation'.
```

### Fall 3: Du entfernst einen Abschnitt

Lösche den Schlüssel in **beiden** Objekten.

## Wie du das Wörterbuch in Komponenten benutzt

```tsx
import { getStrings, type Locale } from '@/lib/i18n/strings';

export default function MyComponent({ locale = 'de' }: { locale?: Locale }) {
  const t = getStrings(locale);
  return <h1>{t.hero.titleLine1}</h1>;
}
```

Siehe [`components/Hero.tsx`](../../components/Hero.tsx) und [`components/Process.tsx`](../../components/Process.tsx) als Referenz-Implementation.

## EN-Pendant einer DE-Komponente

Die EN-Version wird kein eigenes Duplikat mit anderem Text, sondern ein **Re-Export** mit `locale='en'`:

```tsx
// components/en/Hero.tsx
import HeroDE from '../Hero';
export default function Hero() {
  return <HeroDE locale="en" />;
}
```

So gibt es **einen einzigen JSX-Baum** für beide Sprachen — keine Struktur-Drift möglich.

## Aktueller Umfang (Stand der Umstellung)

**Umgestellt auf das Wörterbuch:**
- `components/Hero.tsx` ↔ `components/en/Hero.tsx`
- `components/Process.tsx`

**Noch im alten Modus** (DE/EN separat hartkodiert):
- 108 Seiten-Dateien unter `app/*` und `app/en/*`
- Dutzende Komponenten mit eingebettetem Text

Diese sind nicht beim ersten Durchlauf umgestellt worden, weil der Umbau rund 200 Dateien betrifft. Vorgehen für die restliche Migration:

1. Immer eine Komponente nach der anderen auf `getStrings(locale)` umstellen.
2. Alle Texte in `de` + `en` übertragen.
3. Die EN-Datei durch einen Re-Export ersetzen (wie oben).
4. Build laufen lassen — TypeScript prüft die Struktur.

## Was NICHT ins Wörterbuch gehört

- **Content-Templates** mit interpolierten Werten (Jahresseiten, Städteseiten, Fristlos-Jahresseiten). Diese nutzen Daten aus `data/` und bauen Text dynamisch — der Aufbau ist bereits sprachunabhängig, nur das Datenobjekt wechselt.
- **Rechtliche Haftungsausschluss-Texte** in Rechner-Komponenten. Diese sind formale RDG-Hinweise und bleiben hartkodiert bewusst getrennt.
- **FAQ-Antworten mit Normreferenzen** wie § 622 BGB — leben besser in ihrer Fachseite, weil sie dort gewartet werden.

## Zukünftige Erweiterung

Falls der Umfang stark wächst, kann das Wörterbuch auf separate Dateien je Bereich aufgeteilt werden:
```
lib/i18n/
  ├── strings.ts         # Barrel-Export + getStrings()
  ├── hero.ts
  ├── process.ts
  ├── contact.ts
  └── faq.ts
```

Solange die `Translation`-Typisierung bleibt, erzwingt TypeScript weiter die Vollständigkeit der EN-Übersetzung.
