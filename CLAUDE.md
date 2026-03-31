# CLAUDE.md — Projektbriefing gender-paygap.de

> Dieses Dokument ist die vollständige Bauspezifikation für gender-paygap.de.
> Claude Code soll dieses Projekt lesen und Schritt für Schritt umsetzen.
> Lies diese Datei vollständig, bevor du eine einzige Zeile Code schreibst.

---

## 0. Ausgangslage & Aufgabe

**Quelle:** Das bestehende Next.js 14 Projekt `gekuendigt-abfindung.de` (Repo: `fatihbektas76/kuendigung-abfindung`) dient als 1:1 technische Basis.

**Ziel:** Neues Projekt `gender-paygap.de` (Repo: `fatihbektas76/gender-paygap`) — gleiche Architektur, gleiche Komponenten, gleiche Code-Qualität — aber komplett neuer Content, neue Farben und neue Seitenstruktur für das Thema **Entgelttransparenz & Gender Pay Gap**.

**Aufgabe:**
1. Projektordner von `gekuendigt-abfindung.de` kopieren → neuer Ordner `gender-paygap`
2. Alle technischen Referenzen auf neue Domain/Thema anpassen
3. Neues Git-Repo initialisieren
4. Alle Seiten nach dieser Spezifikation neu befüllen
5. Programmatische Seiten-Templates anlegen
6. Schema-Markup aktualisieren

---

## 1. Technisches Setup

### Git & Deployment
```bash
# Git-Konfiguration (immer per-Repo, NICHT global)
git config user.email "fb@fb-re.de"
git config user.name "Fatih Bektas"

# Remote
git remote set-url origin https://github.com/fatihbektas76/gender-paygap.git
```

### Vercel / DNS
- **IPv4:** `216.198.79.1`
- **CNAME www:** → project-specific vercel-dns Adresse (nicht generisch)
- **vercel.json:** Projektname auf `gender-paygap` setzen

### package.json anpassen
```json
{
  "name": "gender-paygap",
  "description": "Expertenseite für Entgelttransparenz und Gender Pay Gap — APOS Legal"
}
```

### next.config.js
```js
const nextConfig = {
  // Domain-spezifische Metadaten
  env: {
    SITE_URL: 'https://www.gender-paygap.de',
    SITE_NAME: 'gender-paygap.de',
    KANZLEI_NAME: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    ANWALT_NAME: 'Fatih Bektas',
    ANWALT_TITLE: 'Fachanwalt für Arbeitsrecht',
    PHONE: '+49 6221 XXXXXX', // Telefonnummer aus bestehendem Projekt übernehmen
    CITY: 'Heidelberg',
  }
}
```

---

## 2. Marke & Design

### Farbpalette (Tailwind config ersetzen)

Die Seite bekommt eine **neue, eigenständige Farbwelt** — kein Copy der Abfindungsseite.

```js
// tailwind.config.js — colors section
colors: {
  primary: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  // Haupt-Akzentfarbe (Indigo)
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  secondary: {
    50:  '#f0fdf4',
    500: '#22c55e',  // Grün für Arbeitnehmer-Elemente
    700: '#15803d',
  },
  accent: {
    50:  '#eff6ff',
    500: '#3b82f6',  // Blau für Arbeitgeber-Elemente
    700: '#1d4ed8',
  },
  neutral: {
    // Gleiche Grau-Skala wie Original übernehmen
  }
}
```

### Typografie
- Gleiche Font-Konfiguration wie gekuendigt-abfindung.de übernehmen
- Headline-Font bleibt identisch

### Logo / Branding
- Datei: `public/logo.svg` — Text: „gender-paygap.de" mit Fachanwalt-Badge
- Favicon: `public/favicon.ico` neu generieren (Initialen „GP" oder Waage-Icon)

---

## 3. Kanzlei-Daten (überall konsistent verwenden)

```
Kanzlei:    APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG
Anwalt:     Fatih Bektas
Titel:      Fachanwalt für Arbeitsrecht
Zusatz:     Ex-CEO / CFO / COO (Unzer, iCOM Group)
Team:       Georg Willem Büchler, Dr. Martin Duncker, Tobias Fürniss,
            Dr. Heiko Hofstätter, Vincent Samklu
Stadt:      Heidelberg
Bewertung:  68 Bewertungen auf anwalt.de
Domain:     www.gender-paygap.de
Analytics:  Neues GA4-Property anlegen (Platzhalter: G-XXXXXXXXXX)
```

---

## 4. Seitenarchitektur — vollständige Struktur

```
/                                    → Startseite (Dual-Audience: AN + AG)
/arbeitnehmer                        → Hub-Seite Arbeitnehmer
/arbeitgeber                         → Hub-Seite Arbeitgeber
/entgelttransparenzgesetz            → Infopage Gesetz + Richtlinie
/gender-pay-gap                      → Was ist der GPG? (Awareness)
/kontakt                             → Kontaktformular + Karte
/impressum                           → Impressum (aus Original übernehmen, Domain anpassen)
/datenschutz                         → DSGVO (aus Original übernehmen, Domain anpassen)

── Cluster A: Arbeitnehmer (Rights & Enforcement) ──
/auskunftsrecht-entgelttransparenz
/equal-pay-klage
/lohndiskriminierung-nachweisen
/entschaedigung-entgeltdiskriminierung
/beweislastumkehr-equal-pay
/gleicher-lohn-gleiche-arbeit
/elternzeit-gehaltsluecke
/rueckkehr-elternzeit-gehalt
/teilzeit-gehaltsvergleich

── Programmatisch: /auskunftsrecht-[branche] ──
/auskunftsrecht-it
/auskunftsrecht-gesundheitswesen
/auskunftsrecht-bankwesen
/auskunftsrecht-einzelhandel
/auskunftsrecht-oeffentlicher-dienst
/auskunftsrecht-produktion
/auskunftsrecht-bildung
/auskunftsrecht-pflege
/auskunftsrecht-versicherung
/auskunftsrecht-logistik
/auskunftsrecht-medien
/auskunftsrecht-beratung
/auskunftsrecht-chemie
/auskunftsrecht-automobil
/auskunftsrecht-handel

── Programmatisch: /equal-pay-klage-[bundesland] ──
/equal-pay-klage-baden-wuerttemberg
/equal-pay-klage-bayern
/equal-pay-klage-nordrhein-westfalen
/equal-pay-klage-hessen
/equal-pay-klage-berlin
/equal-pay-klage-hamburg
/equal-pay-klage-niedersachsen
/equal-pay-klage-sachsen

── Cluster B: Arbeitgeber (Compliance & Audit) ──
/entgelttransparenz-arbeitgeber
/berichtspflichten-gender-pay-gap
/entgeltgleichheit-audit
/stellenanzeige-gehaltsspanne-pflicht
/auskunftsrecht-arbeitnehmer-beantworten
/vergütungssystem-rechtssicher
/esg-gender-pay-gap-berichterstattung
/tarifbindung-entgelttransparenz
/entgelttransparenz-sanktionen-bussgeld

── Programmatisch: /entgelttransparenz-[groesse]-mitarbeiter ──
/entgelttransparenz-50-mitarbeiter
/entgelttransparenz-100-mitarbeiter
/entgelttransparenz-250-mitarbeiter
/entgelttransparenz-500-mitarbeiter
/entgelttransparenz-1000-mitarbeiter

── Programmatisch: /entgelttransparenz-arbeitgeber-[branche] ──
/entgelttransparenz-arbeitgeber-it
/entgelttransparenz-arbeitgeber-gesundheitswesen
/entgelttransparenz-arbeitgeber-bankwesen
/entgelttransparenz-arbeitgeber-einzelhandel
/entgelttransparenz-arbeitgeber-produktion
/entgelttransparenz-arbeitgeber-beratung
/entgelttransparenz-arbeitgeber-oeffentlicher-dienst
/entgelttransparenz-arbeitgeber-logistik
/entgelttransparenz-arbeitgeber-automobil
/entgelttransparenz-arbeitgeber-handel
/entgelttransparenz-arbeitgeber-chemie
/entgelttransparenz-arbeitgeber-medien
/entgelttransparenz-arbeitgeber-versicherung
/entgelttransparenz-arbeitgeber-pflege
/entgelttransparenz-arbeitgeber-bildung

── Cluster C: Information & Glossar ──
/gender-pay-gap-deutschland-2026
/bereinigter-gender-pay-gap
/equal-pay-day-2026
/entgelttransparenzgesetz-2017-2026-vergleich
/bag-urteil-equal-pay-2025

── Programmatisch: /gender-pay-gap-[bundesland] ──
/gender-pay-gap-baden-wuerttemberg
/gender-pay-gap-bayern
/gender-pay-gap-nordrhein-westfalen
/gender-pay-gap-hessen
/gender-pay-gap-berlin
/gender-pay-gap-hamburg
/gender-pay-gap-niedersachsen
/gender-pay-gap-sachsen

── Programmatisch: /gender-pay-gap-[branche] ──
/gender-pay-gap-it
/gender-pay-gap-gesundheitswesen
/gender-pay-gap-bankwesen
/gender-pay-gap-einzelhandel
/gender-pay-gap-oeffentlicher-dienst
/gender-pay-gap-produktion
/gender-pay-gap-bildung
/gender-pay-gap-pflege
/gender-pay-gap-versicherung
/gender-pay-gap-logistik
/gender-pay-gap-finanzwesen
/gender-pay-gap-chemie

── Cluster D: Tools (15 Tools) ──
── Conversion-Tools ──
/compliance-check-arbeitgeber              → Tool 05: 5-Fragen Ampel-Check
/compliance-check-arbeitgeber/sanktionsrechner → Tool 01: Bußgeld- & Risikorechner
/auskunftsrecht-checker                    → Tool 06: 3-Schritt Anspruchsprüfer
/auskunftsrecht-checker/schreiben-generator → Tool 02: Muster-Auskunftsschreiben PDF
/equal-pay-klage/entschaedigung-berechnen  → Tool 04: Entschädigungs-Simulator
/entgeltluecken-ampel                      → Tool 09: GPG-Eingabe → Ampel + Handlungsplan
/vergütungssystem-selbsttest               → Tool 15: 20 Fragen → Reifegrad-Score + Lead
/vergleichsgruppen-finder                  → Tool 14: Stelle beschreiben → Vergleichsgruppe
── Traffic-Tools ──
/gender-pay-gap-rechner                    → Tool 07: Branchenvergleich Gehalt (Destatis)
/stellenanzeigen-checker                   → Tool 11: URL eingeben → Compliance-Prüfung
/berichtspflicht-kalender                  → Tool 08: Deadlines 2026–2032 + ICS-Download
/equal-pay-day-zaehler                     → Tool 12: Live-Countdown + Viral-Widget
── Engagement-Tools ──
/situationscheck                           → Tool 03: KI-Analyse via Anthropic API
/gehaltsverhandlung-vorbereiter            → Tool 13: Argumente + Gesprächsleitfaden
/equal-pay-anspruch-schnellcheck           → Tool 15: 2-Minuten Schnellcheck Anspruch
```

---

## 5. Content-Spezifikation

### 5.1 Startseite (`/`)

**Hero Section:**
```
H1: Ihr Recht auf gleiche Bezahlung.
    Ihr Schutz vor Lohndiskriminierung.

Subtext: Die EU-Entgelttransparenzrichtlinie gibt Arbeitnehmern 
         neue Rechte und Arbeitgebern neue Pflichten. 
         Fachanwalt Fatih Bektas berät beide Seiten.

CTA Links (Arbeitnehmer, grün):  „Mein Auskunftsrecht prüfen →"
CTA Rechts (Arbeitgeber, blau):  „Compliance-Check starten →"
```

**Dual-Audience Karten:**
```
Karte 1 — Arbeitnehmer:
  Überschrift: „Verdienen Sie weniger als Ihre Kollegen?"
  Text: Die neue EU-Richtlinie gibt Ihnen das Recht, 
        Auskunft über Gehälter in Ihrer Vergleichsgruppe 
        zu verlangen. Wir setzen dieses Recht für Sie durch.
  Links: Auskunftsrecht prüfen / Equal-Pay-Klage / Lohndiskriminierung nachweisen

Karte 2 — Arbeitgeber:
  Überschrift: „Sind Ihre Vergütungsstrukturen compliant?"
  Text: Ab Juni 2026 drohen empfindliche Sanktionen bei 
        Verstößen gegen die Entgelttransparenzpflichten. 
        Wir prüfen Ihre Strukturen und machen sie rechtssicher.
  Links: Compliance-Audit / Berichtspflichten / Vergütungssystem prüfen
```

**Dringlichkeits-Banner:**
```
Text: „Umsetzungsfrist EU-Entgelttransparenzrichtlinie: 7. Juni 2026 — 
       Jetzt handeln, bevor Sanktionen drohen."
Stil: Schmales Banner, Indigo-Hintergrund, weiße Schrift
```

**Trust-Sektion (identisch zu Original, Daten anpassen):**
- Fachanwalt für Arbeitsrecht
- 68 Bewertungen anwalt.de
- Ex-CEO / CFO / COO Erfahrung
- APOS Legal Heidelberg
- Ersteinschätzung kostenlos

**FAQ-Sektion (5 Fragen, auch für Schema):**
1. Was ist der Gender Pay Gap in Deutschland? → 16% (Destatis 2025)
2. Habe ich als Arbeitnehmer ein Auskunftsrecht gegenüber meinem Arbeitgeber?
3. Was müssen Arbeitgeber ab Juni 2026 beachten?
4. Kann ich wegen Lohndiskriminierung klagen?
5. Was kostet eine Erstberatung bei APOS Legal?

---

### 5.2 Arbeitnehmer Hub (`/arbeitnehmer`)

```
H1: Ihre Rechte bei ungleicher Bezahlung
Meta: Auskunftsrecht, Equal-Pay-Klage, Entschädigung — Fachanwalt Fatih Bektas berät Sie.

Intro-Paragraph (GEO-optimiert, direkt antwortend):
"Arbeitnehmer haben ab dem 7. Juni 2026 das Recht, von Arbeitgebern 
mit mehr als 50 Mitarbeitern Auskunft über Gehaltskriterien und 
Vergleichsgehälter zu verlangen (Art. 7 EU-Richtlinie 2023/970). 
Bei nachgewiesener Lohndiskriminierung haben Sie Anspruch auf 
Entschädigung für mindestens 3 Jahre rückwirkend."

Themen-Grid (Links zu Unterseiten):
- Auskunftsrecht geltend machen
- Equal-Pay-Klage einreichen  
- Lohndiskriminierung nachweisen
- Entschädigung berechnen
- Beweislastumkehr nutzen
- Elternzeit & Gehaltsrückkehr
- Nach Branche filtern [Dropdown → programmatische Seiten]
```

---

### 5.3 Arbeitgeber Hub (`/arbeitgeber`)

```
H1: Entgelttransparenz-Compliance für Ihr Unternehmen
Meta: Berichtspflichten, Vergütungsaudit, Equal-Pay-Richtlinie 2026 — APOS Legal Heidelberg.

Intro-Paragraph (GEO-optimiert):
"Unternehmen mit mehr als 250 Mitarbeitern müssen ab 2027 erstmals 
über den geschlechtsspezifischen Entgeltunterschied berichten 
(Art. 9 EU-Richtlinie 2023/970). Bei einem Gap über 5% ist eine 
gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht. 
Verstöße können zu Schadensersatz und Bußgeldern führen."

Pflichten nach Unternehmensgröße [Tabelle]:
< 50 MA   | Kriterien auf Anfrage offenlegen
50–99 MA  | Kriterien offenlegen + Auskunftsrecht
100–249 MA | + Berichtspflicht ab 2031
250+ MA   | + Berichtspflicht ab 2027

Themen-Grid:
- Berichtspflichten verstehen
- Vergütungssystem audit-ready machen
- Stellenanzeigen mit Gehaltsspanne
- Auskunftsanfragen korrekt beantworten
- ESG-Berichterstattung
- Nach Unternehmensgröße [Buttons → programmatische Seiten]
- Nach Branche [Dropdown → programmatische Seiten]
```

---

### 5.4 Programmatische Templates

#### Template A: `/auskunftsrecht-[branche]`

**Slug-Parameter:** `branche` (z.B. `it`, `gesundheitswesen`, `bankwesen`)

**Variablen-Objekt (als JSON in `/data/branchen.ts` anlegen):**
```typescript
type BrancheData = {
  slug: string
  name: string           // "IT & Software"
  nameGenitiv: string    // "der IT-Branche"
  gpgProzent: number     // 14 (Branchenspezifischer GPG in %)
  typBerufe: string[]    // ["Softwareentwickler:in", "Projektmanager:in", ...]
  typArbeitgeber: string // "Technologieunternehmen und Startups"
  besonderheiten: string // Branchenspezifische Besonderheit bei Vergütung
  arbGZustaendig: string // "Arbeitsgericht Mannheim / Heidelberg"
}
```

**Seitenstruktur:**
```
H1: Auskunftsrecht in [der IT-Branche] — Equal Pay prüfen lassen
Meta Description: Haben Sie als [Softwareentwickler:in] Anspruch auf 
  gleiches Gehalt? Fachanwalt klärt Ihr Auskunftsrecht in [der IT-Branche]. 
  Kostenlose Ersteinschätzung.

[GEO-Block — direkte Antwort, 3 Sätze]:
Beschäftigte [in der IT-Branche] haben ab dem 7. Juni 2026 das Recht, 
von Arbeitgebern Auskunft über das durchschnittliche Entgelt für gleiche 
oder gleichwertige Arbeit zu verlangen — aufgeschlüsselt nach Geschlecht. 
In [der IT-Branche] beträgt der Gender Pay Gap durchschnittlich [14]%. 
Fachanwalt Fatih Bektas berät Sie zu Ihren Möglichkeiten.

[Statistik-Karte]: GPG in [der IT-Branche]: [14]%

[Content-Abschnitte]:
1. Wie hoch ist der Gender Pay Gap in [der IT-Branche]?
2. Welche Berufsgruppen sind betroffen? ([Softwareentwickler, PMs, ...])
3. Wie stelle ich einen Auskunftsantrag?
4. Was passiert nach dem Auskunftsantrag?
5. Klage bei [Arbeitsgericht Mannheim] einreichen

[FAQ Schema — 5 Fragen, branchenspezifisch]
[CTA]: Kostenlose Ersteinschätzung — Jetzt kontaktieren
```

---

#### Template B: `/entgelttransparenz-[groesse]-mitarbeiter`

**Slug-Parameter:** `groesse` (50, 100, 250, 500, 1000)

**Variablen-Objekt (als JSON in `/data/unternehmensgroesse.ts`):**
```typescript
type GroesseData = {
  slug: string
  anzahl: string          // "50"
  schwellenwert: string   // "mehr als 50 Mitarbeiter"
  pflichten: string[]     // Liste der konkreten Pflichten
  berichtspflichtAb: string | null  // "2027" oder null
  auskunftsrechtAb: string  // "7. Juni 2026" oder "ab 2027"
  besonderheit: string    // Besonderheit für diese Größe
}
```

**Seitenstruktur:**
```
H1: Entgelttransparenz für Unternehmen mit [50–99] Mitarbeitern
Meta: Welche Pflichten gelten ab 2026 für Ihr Unternehmen? 
  Fachanwalt klärt Berichtspflichten & Auskunftsrecht für [50–99 MA].

[Pflichten-Checkliste für diese Unternehmensgröße]
[Zeitplan: Was wann gilt]
[Risiken bei Verstößen]
[CTA Arbeitgeber]: Compliance-Audit anfragen
```

---

#### Template C: `/gender-pay-gap-[branche]`

```
H1: Gender Pay Gap in [der IT-Branche] — aktuelle Zahlen & Rechtslage 2026
[Statistik mit Destatis-Quelle]
[Ursachen branchenspezifisch]
[Rechtliche Konsequenzen]
[CTA für Arbeitnehmer + Arbeitgeber]
```

---

#### Template D: `/equal-pay-klage-[bundesland]`

```
H1: Equal-Pay-Klage in [Baden-Württemberg] — Fachanwalt berät Sie
[Zuständiges Arbeitsgericht]
[Lokale Statistiken]
[Verfahrensablauf am ArbG in [BW]]
[CTA]: Klage prüfen lassen
```

---

#### Template E: `/entgelttransparenz-arbeitgeber-[branche]`

**Slug-Parameter:** `branche` (z.B. `it`, `gesundheitswesen`, `bankwesen`)

**Variablen:** Aus `/data/branchen.ts` — gleiche Datei wie Template A

**Seitenstruktur:**
```
H1: Entgelttransparenz-Pflichten für Arbeitgeber in [der IT-Branche]
Meta: Was müssen Unternehmen in [der IT-Branche] ab 2026 beachten?
  Fachanwalt erklärt Berichtspflichten & Compliance. APOS Legal Heidelberg.

[GEO-Block]:
Arbeitgeber in [der IT-Branche] müssen ab dem 7. Juni 2026 
Auskunft über Gehaltskriterien geben. In [der IT-Branche] beträgt 
der Gender Pay Gap [14]% — bei über 5% ist eine gemeinsame 
Entgeltbewertung mit dem Betriebsrat Pflicht (Art. 9 EU-RL 2023/970).

[Branchenspezifische Pflichten]:
- Typische Vergütungsstrukturen in [der IT-Branche]
- Häufige Compliance-Fallen in [dieser Branche]
- [Typische Arbeitgeber dieser Branche] und ihre Besonderheiten

[Checkliste]: Was Sie als Arbeitgeber in [der IT-Branche] jetzt tun müssen
[Risiken bei Nichthandeln]
[FAQ Schema — 5 branchenspezifische Fragen]
[CTA]: Compliance-Audit für [IT-Unternehmen] anfragen
```

---

### 5.5 Tool-Seiten

Es gibt **15 Tools** — vollständige Spezifikationen mit Berechnungslogik, API-Code und UI-Details stehen in **Abschnitt 13**. Kurzübersicht:


| # | URL | ZG | Priorität | Kernfunktion |
|---|-----|----|-----------|--------------|
| T01 | `/compliance-check-arbeitgeber/sanktionsrechner` | AG | Hoch | Bußgeld- & Nachzahlungsrisiko in € (Slider) |
| T02 | `/auskunftsrecht-checker/schreiben-generator` | AN | Hoch | Fertiges Auskunftsschreiben (Art. 7 EU-RL) als PDF |
| T03 | `/situationscheck` | Beide | Hoch | Freitext → KI-Analyse via Anthropic API |
| T04 | `/equal-pay-klage/entschaedigung-berechnen` | AN | Hoch | Entschädigung berechnen (3 Jahre rückwirkend) |
| T05 | `/compliance-check-arbeitgeber` | AG | Hoch | 5-Fragen Ampel-Check (Grün/Gelb/Rot) + Handlungsplan |
| T06 | `/auskunftsrecht-checker` | AN | Hoch | 3-Klick Anspruchsprüfer → öffnet T02 |
| T07 | `/gender-pay-gap-rechner` | AN | Mittel | Gehalt vs. Branchenmedian (Destatis) nach Geschlecht |
| T08 | `/berichtspflicht-kalender` | AG | Mittel | Alle Deadlines 2026–2032 + ICS-Download |
| T09 | `/entgeltluecken-ampel` | AG | Hoch | Gehaltsstruktur eingeben → bereinigter GPG + Ampel |
| T10 | `/stellenanzeigen-checker` | AG | Mittel | URL eingeben → automatische Compliance-Prüfung |
| T11 | `/equal-pay-day-zaehler` | Beide | Mittel | Live-Countdown GPG + Embeddable Widget (Viral) |
| T12 | `/gehaltsverhandlung-vorbereiter` | AN | Mittel | Auskunft erhalten → Argumente + Gesprächsleitfaden |
| T13 | `/vergleichsgruppen-finder` | AN | Hoch | Stelle beschreiben → rechtliche Vergleichsgruppe |
| T14 | `/vergütungssystem-selbsttest` | AG | Hoch | 20 Fragen → Reifegrad-Score + Maßnahmenplan + Lead |
| T15 | `/equal-pay-anspruch-schnellcheck` | AN | Mittel | 2-Minuten Schnellcheck ob Anspruch wahrscheinlich |
| T16 | `/auskunftsrecht-checker/schreiben-generator` | AN | — | (= T02, Unterseite) |

→ **Vollständige Spezifikation der priorisierten Tools: Abschnitt 13**

---

## 6. Schema-Markup (JSON-LD)

### Startseite — LegalService + Person + AggregateRating
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "name": "APOS Legal — Entgelttransparenz & Gender Pay Gap",
      "url": "https://www.gender-paygap.de",
      "description": "Fachanwalt für Arbeitsrecht berät Arbeitnehmer und Arbeitgeber zu Entgelttransparenz, Equal Pay und Gender Pay Gap.",
      "areaServed": "DE",
      "serviceType": ["Entgelttransparenz", "Equal Pay Beratung", "Lohndiskriminierung", "Compliance Audit"],
      "provider": {
        "@type": "Attorney",
        "name": "Fatih Bektas",
        "jobTitle": "Fachanwalt für Arbeitsrecht",
        "worksFor": {
          "@type": "LegalService",
          "name": "APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Heidelberg",
            "addressCountry": "DE"
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "68",
        "bestRating": "5",
        "ratingCount": "68"
      }
    },
    {
      "@type": "WebSite",
      "url": "https://www.gender-paygap.de",
      "name": "gender-paygap.de",
      "description": "Experten-Seite für Entgelttransparenz und Gender Pay Gap — APOS Legal Heidelberg"
    }
  ]
}
```

### Jede Inhaltsseite — FAQPage
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Frage aus der Seite]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Direkte Antwort, 2-4 Sätze, mit konkreten Gesetzes-Referenzen]"
      }
    }
    // ... 5 Fragen pro Seite
  ]
}
```

### Programmatische Seiten — BreadcrumbList
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.gender-paygap.de"},
    {"@type": "ListItem", "position": 2, "name": "Arbeitnehmer", "item": "https://www.gender-paygap.de/arbeitnehmer"},
    {"@type": "ListItem", "position": 3, "name": "Auskunftsrecht IT", "item": "https://www.gender-paygap.de/auskunftsrecht-it"}
  ]
}
```

---

## 7. Data-Dateien anlegen

### `/data/branchen.ts`
Komplette Branchen-Datei mit allen 15 Einträgen. Jeder Eintrag enthält:
- `slug`, `name`, `nameGenitiv`
- `gpgProzent` (aus Destatis-Daten)
- `typBerufe` (3-5 typische Berufsbezeichnungen)
- `typArbeitgeber`
- `besonderheiten`
- `arbGZustaendig`

Werte für GPG nach Branche (Destatis 2025):
```
it:                    14%
gesundheitswesen:      22%
bankwesen:             26%
einzelhandel:          19%
oeffentlicher-dienst:  10%
produktion:            20%
bildung:               14%
pflege:                13%
versicherung:          28%
logistik:              18%
finanzwesen:           26%
chemie:                21%
automobil:             23%
medien:                17%
beratung:              24%
handel:                20%
```

### `/data/unternehmensgroesse.ts`
5 Einträge für 50, 100, 250, 500, 1000 Mitarbeiter mit:
- Konkreten Pflichten-Listen
- Zeitplan (was ab wann gilt)
- Bußgeld-Risiken

### `/data/bundeslaender.ts`
8 Einträge mit:
- `slug`, `name`
- `gpgProzent` (Destatis regional)
- `arbGStadt` (zuständiges Arbeitsgericht)
- `besonderheiten`

### `/data/gehalt-benchmark.ts`
Medianjahresverdienste nach Branche und Geschlecht (Destatis 2025) — wird von Tool 7 (Branchenvergleich) verwendet:
```typescript
const benchmarks: Record<string, { frauen: number; maenner: number }> = {
  it:               { frauen: 62000, maenner: 72000 },
  gesundheitswesen: { frauen: 38000, maenner: 48000 },
  bankwesen:        { frauen: 44000, maenner: 60000 },
  einzelhandel:     { frauen: 28000, maenner: 35000 },
  oeffentlicher_dienst: { frauen: 40000, maenner: 44000 },
  produktion:       { frauen: 32000, maenner: 40000 },
  bildung:          { frauen: 42000, maenner: 48000 },
  pflege:           { frauen: 34000, maenner: 38000 },
  versicherung:     { frauen: 40000, maenner: 54000 },
  logistik:         { frauen: 29000, maenner: 35000 },
  finanzwesen:      { frauen: 48000, maenner: 65000 },
  chemie:           { frauen: 45000, maenner: 57000 },
  automobil:        { frauen: 42000, maenner: 55000 },
  medien:           { frauen: 36000, maenner: 43000 },
  beratung:         { frauen: 52000, maenner: 70000 },
  handel:           { frauen: 30000, maenner: 37000 },
}
```

---

## 8. Komponenten anpassen

Alle Komponenten aus `gekuendigt-abfindung.de` übernehmen und anpassen:

| Komponente | Änderung |
|-----------|----------|
| `<Header>` | Logo, Navigation auf neue Seiten |
| `<Hero>` | Dual-CTA (AN + AG), neuer Text |
| `<TrustBar>` | Gleiche Trust-Elemente, neue Formulierung |
| `<CTASection>` | Zwei Varianten: AN-CTA (grün) + AG-CTA (blau) |
| `<FAQAccordion>` | Übernehmen, neue Inhalte |
| `<ContactForm>` | Neues Feld: „Ich bin: Arbeitnehmer / Arbeitgeber" |
| `<Footer>` | Domain, Rechtsgebiete anpassen |
| `<SchemaTags>` | Neue Schema-Daten |
| `<Breadcrumb>` | Anpassen |
| `<ProgrammaticPage>` | Template für alle programmatischen Seiten |

---

## 9. SEO-Metadaten — Muster

### Startseite
```
title: "Entgelttransparenz & Gender Pay Gap — Fachanwalt Fatih Bektas | gender-paygap.de"
description: "Arbeitnehmer und Arbeitgeber: Fachanwalt für Arbeitsrecht berät zu 
  Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten ab 2026. 
  Kostenlose Ersteinschätzung. APOS Legal Heidelberg."
```

### Programmatische Seiten
```
title: "Auskunftsrecht in der IT-Branche — Equal Pay prüfen lassen | gender-paygap.de"
description: "Gender Pay Gap in der IT: 14%. Fachanwalt klärt Ihr Auskunftsrecht 
  und hilft bei Equal-Pay-Klage. Kostenlose Ersteinschätzung. APOS Legal."
```

---

## 10. GEO-Optimierung — Schreibregeln

Jede Seite muss folgende GEO-Anforderungen erfüllen, damit KI-Systeme (ChatGPT, Perplexity, Gemini) die Seite als Quelle zitieren:

1. **Direktantwort ganz oben** — Erste 3 Sätze beantworten die Kernfrage direkt und vollständig. Kein Intro, kein „In diesem Artikel erfahren Sie...".

2. **Konkrete Zahlen mit Quellenangabe** — Immer: „16% Gender Pay Gap (Statistisches Bundesamt, Dezember 2025)", „Art. 7 EU-Richtlinie 2023/970", „BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025"

3. **Signatur auf jeder Seite** — „Verfasst von Fatih Bektas, Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg. Zuletzt aktualisiert: [Datum]"

4. **FAQ-Block sichtbar auf der Seite** (nicht nur im Schema) — Mindestens 5 Q&A als Accordion, direkt unter dem Hauptinhalt.

5. **Definitive Statements** — „Arbeitnehmer haben das Recht..." statt „Arbeitnehmer könnten eventuell..."

6. **BAG-Urteil 8 AZR 300/24 auf jeder Arbeitnehmer-Seite erwähnen** — Dieses Urteil vom 23.10.2025 stärkt die Position von Arbeitnehmern massiv (Paarvergleich reicht aus). Es ist ein hochrelevanter, zitierfähiger Fakt.

---

## 11. Reihenfolge der Umsetzung

```
Phase 1 — Fundament (zuerst):
[ ] 1. Projektordner kopieren, umbenennen
[ ] 2. Git init, user.email setzen, Remote setzen
[ ] 3. package.json, next.config.js, tailwind.config.js anpassen
[ ] 4. Farbpalette (Indigo/Grün/Blau) ersetzen
[ ] 5. Kanzlei-Daten als globale Konstanten anlegen (/lib/config.ts)
[ ] 6. Data-Dateien anlegen (branchen.ts, unternehmensgroesse.ts, bundeslaender.ts)

Phase 2 — Kern-Seiten:
[ ] 7. Startseite (/) — komplett neu
[ ] 8. /arbeitnehmer Hub
[ ] 9. /arbeitgeber Hub
[ ] 10. /entgelttransparenzgesetz
[ ] 11. /gender-pay-gap (Awareness-Seite)
[ ] 12. /kontakt (aus Original übernehmen, anpassen)

Phase 3 — Programmatische Seiten:
[ ] 13. Template /auskunftsrecht-[branche] + alle 15 Seiten generieren
[ ] 14. Template /entgelttransparenz-[groesse]-mitarbeiter + 5 Seiten
[ ] 15. Template /equal-pay-klage-[bundesland] + 8 Seiten
[ ] 16. Template /gender-pay-gap-[branche] + 12 Seiten
[ ] 17. Template /entgelttransparenz-arbeitgeber-[branche] + 15 Seiten
[ ] 18. Manuelle Arbeitnehmer-Seiten (9 Seiten)
[ ] 19. Manuelle Arbeitgeber-Seiten (9 Seiten)

Phase 4 — Tools & Conversion (Priorität 1 — sofort):
[ ] 20. T05: /compliance-check-arbeitgeber (5-Fragen Ampel)
[ ] 21. T06: /auskunftsrecht-checker (3-Klick Prüfer)
[ ] 22. T02: /auskunftsrecht-checker/schreiben-generator (PDF-Generator, jsPDF)
[ ] 23. T01: /compliance-check-arbeitgeber/sanktionsrechner (Risikorechner)
[ ] 24. T15: /equal-pay-anspruch-schnellcheck (2-Min Schnellcheck)
[ ] 25. T14: /vergütungssystem-selbsttest (20 Fragen + E-Mail Lead-Capture)
[ ] 26. T09: /entgeltluecken-ampel (GPG-Eingabe → Ampel + Handlungsplan)

Phase 4b — Tools & Conversion (Priorität 2):
[ ] 27. T04: /equal-pay-klage/entschaedigung-berechnen (Entschädigungs-Simulator)
[ ] 28. T07: /gender-pay-gap-rechner (Branchenvergleich mit Destatis-Daten)
[ ] 29. T13: /vergleichsgruppen-finder (Anthropic API — API-Route zuerst!)
[ ] 30. T03: /situationscheck (KI-Analyse — Anthropic API)

Phase 4c — Tools & Conversion (Priorität 3 — nach Launch):
[ ] 31. T10: /stellenanzeigen-checker (Anthropic API)
[ ] 32. T12: /gehaltsverhandlung-vorbereiter (Leitfaden-Generator)
[ ] 33. T11: /equal-pay-day-zaehler (Viral + Embeddable Widget)
[ ] 34. T08: /berichtspflicht-kalender (ICS-Export, npm: ics)

[ ] 35. Doppelter CTA (AN/AG) auf allen Seiten einbauen
[ ] 36. Schema-Markup auf allen Seiten prüfen

Phase 5 — Launch:
[ ] 37. sitemap.xml (dynamisch, alle 200+ URLs)
[ ] 38. robots.txt
[ ] 39. WCAG-Accessibility-Check (wie auf gekuendigt-abfindung.de)
[ ] 40. Vercel deployen
[ ] 41. Google Analytics + GSC einrichten
[ ] 42. Erstes Deployment testen
```

---

## 12. Wichtige technische Hinweise

- **git commit email:** Immer `git config user.email "fb@fb-re.de"` ohne `--global`
- **Vercel DNS:** CNAME www → project-specific vercel-dns (NICHT generisch). IPv4: `216.198.79.1`
- **Next.js Static Generation:** Alle programmatischen Seiten mit `generateStaticParams()` — kein Server-Side-Rendering für Performance
- **Interne Verlinkung:** Arbeitnehmer-Seiten müssen auf verwandte Arbeitgeber-Seiten verlinken und umgekehrt (Modul: „Auch relevant für Arbeitgeber / Arbeitnehmer")
- **Bilder:** Alle Alt-Tags auf Deutsch, mit Keyword. Kein generisches „image.jpg"
- **WCAG:** Alle interaktiven Elemente müssen keyboard-navigierbar sein (wie auf gekuendigt-abfindung.de)
- **Keine halluzinierten BAG-Urteile:** Nur das verifizierte Urteil Az. 8 AZR 300/24 vom 23.10.2025 erwähnen. Für andere Urteile: nur zitieren wenn aus dem bestehenden Projekt bekannt.

---

*Ende des Briefings. Bei Unklarheiten: Fragen stellen, bevor Code geschrieben wird.*

---

## 13. Tools — vollständige Spezifikation (15 Tools)

Alle Tools sind React-Komponenten unter `/components/tools/` und haben eigene Seiten unter `/app/[slug]/page.tsx`. Jedes Tool endet mit einem CTA, der zur Kontaktaufnahme führt.

---

### Tool 1: Sanktionsrechner (`/compliance-check-arbeitgeber/sanktionsrechner`)
**Zielgruppe:** Arbeitgeber | **Conversion: sehr hoch** (Fear-of-Loss-Mechanismus)

**Inputs (Slider):**
- Mitarbeiterzahl (50–5.000)
- Geschätzter Gender Pay Gap in % (0–40%)
- Ø Jahresgehalt Frauen (30.000–120.000 €)
- Anteil weiblicher Mitarbeiter (10–90%)

**Berechnungslogik:**
```typescript
const frauen = Math.round(ma * anteil / 100)
const diffPerson = salary * (gpg / 100)
const lueckeJahr = frauen * diffPerson
const nachzahlung3Jahre = lueckeJahr * 3          // Art. 21 EU-RL: 3 Jahre rückwirkend
const zinsen = nachzahlung3Jahre * 0.05 * 1.5     // § 288 BGB Verzugszinsen
const immateriell = frauen * 2500                  // Pauschale immat. Schaden
const bussgeld = Math.min(ma * 500 + lueckeJahr * 0.1, 5_000_000)  // Art. 23 EU-RL
const gesamtrisiko = nachzahlung3Jahre + zinsen + immateriell
```

**Ausgabe:**
- 3 Metrikkarten: Jährliche Nachzahlung / 3-Jahres-Risiko / Max. Bußgeld
- Risikoampel-Balken (Grün/Gelb/Rot)
- Aufschlüsselung aller Positionen
- CTA: „Ihr Gesamtrisiko liegt bei ca. X € — Audit anfragen"

---

### Tool 2: Muster-Auskunftsschreiben Generator (`/auskunftsrecht-checker/schreiben-generator`)
**Zielgruppe:** Arbeitnehmer | **Conversion: sehr hoch** (Sofortiger Mehrwert → Dankbarkeit → Mandat)

**3-Schritt-Flow:**
1. **Daten eingeben:** Name, Adresse, Datum, Arbeitgeber, Stelle, Betriebszugehörigkeit seit, Mitarbeiterzahl
2. **Vorschau prüfen:** Vollständiges Schreiben in Echtzeit generiert
3. **Verwenden + CTA:** Download-Button + „Antwort prüfen lassen" CTA

**Schreiben-Template (rechtlich geprüft):**
```
[Name] [Adresse] [Datum]

An die Personalabteilung [Arbeitgeber]

Auskunftsverlangen gemäß Art. 7 EU-Richtlinie 2023/970 / § EntgTranspG

Sehr geehrte Damen und Herren,

ich bin seit dem [Datum] in Ihrem Unternehmen als [Stelle] tätig und bitte Sie 
hiermit um Auskunft gemäß Art. 7 der EU-Entgelttransparenzrichtlinie (Richtlinie 
2023/970/EU) in Verbindung mit dem Entgelttransparenzgesetz (EntgTranspG).

Ich bitte um Mitteilung:

1. Nach welchen objektiven und geschlechtsneutralen Kriterien wird mein Entgelt 
festgelegt und weiterentwickelt (Art. 6 und 7 Abs. 1 lit. a der Richtlinie)?

2. Wie hoch ist das durchschnittliche Entgeltniveau (aufgeschlüsselt nach Geschlecht) 
für Beschäftigte, die gleiche oder gleichwertige Arbeit wie ich verrichten 
(Art. 7 Abs. 1 lit. b der Richtlinie)?

Bitte teilen Sie mir alle Entgeltbestandteile mit, einschließlich Grundgehalt, 
Boni, Sachleistungen und sonstiger Vergütungsbestandteile.

Gemäß Art. 7 Abs. 3 der Richtlinie 2023/970/EU bitte ich um Beantwortung 
innerhalb von zwei Monaten nach Zugang dieses Schreibens.

Ich weise darauf hin, dass gemäß Art. 18 der Richtlinie bei Vergütungsunterschieden 
auf Grundlage des Geschlechts eine Beweislastumkehr zu Ihren Lasten eintritt.

Mit freundlichen Grüßen,
[Name]
```

**Download:** `react-to-pdf` oder `jsPDF` — Schreiben als PDF mit APOS Legal Footer

---

### Tool 3: KI-Situationscheck (`/situationscheck`)
**Zielgruppe:** Beide | **Conversion: sehr hoch** (Personalisierte Antwort → direkter CTA)

**Technisch:** Anthropic API (`claude-sonnet-4-20250514`), API-Key über Next.js API Route `/api/situationscheck` (nie Client-seitig exponieren!)

**API Route `/app/api/situationscheck/route.ts`:**
```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic() // ANTHROPIC_API_KEY aus .env

export async function POST(req: Request) {
  const { situation, audience } = await req.json()
  
  const systemPrompt = audience === 'an' 
    ? `Du bist ein Assistent von APOS Legal Heidelberg. Analysiere die Situation 
       eines Arbeitnehmers zur Entgelttransparenz (EU-RL 2023/970, BAG 8 AZR 300/24).
       Antworte auf Deutsch. Format: Einschätzung (3 Sätze) | Relevante Norm | 
       Chancen/Risiken | 3 Nächste Schritte | Bewertung: STARK/MITTEL/SCHWACH`
    : `Du bist ein Assistent von APOS Legal Heidelberg. Analysiere die Compliance-
       Situation eines Arbeitgebers (EU-RL 2023/970). Antworte auf Deutsch.
       Format: Risikoeinschätzung | Relevante Pflicht | Handlungsbedarf | 
       3 Empfohlene Schritte | Risiko: HOCH/MITTEL/GERING`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 600,
    system: systemPrompt,
    messages: [{ role: 'user', content: situation }]
  })
  
  return Response.json({ text: message.content[0].text })
}
```

**UI-Features:**
- Zwei Tabs: „Ich bin Arbeitnehmer" / „Ich bin Arbeitgeber"
- 4 vorausgefüllte Beispiel-Chips je Zielgruppe (klickbar)
- Freitext-Eingabe
- Ergebnis: Rechtliche Einschätzung + Verdikt-Badge (STARK/MITTEL/SCHWACH)
- CTA: „Kostenlose Ersteinschätzung anfragen" (vorausgefülltes Kontaktformular)
- Disclaimer: „Keine anwaltliche Beratung — ersetzt nicht die persönliche Beratung"

---

### Tool 4: Entschädigungs-Simulator (`/equal-pay-klage/entschaedigung-berechnen`)
**Zielgruppe:** Arbeitnehmer | **Conversion: sehr hoch** (konkreter € Betrag → Handlungsmotivation)

**Inputs:**
- Mein Bruttogehalt (€/Monat)
- Gehalt der Vergleichsperson (€/Monat) — oder: „Ich kenne es nicht" → Schätzung
- Seit wann besteht die Differenz (Jahre, max. 3 für Verjährung)
- Betriebszugehörigkeit (Jahre)

**Berechnungslogik:**
```typescript
const monatsDiff = vergleich - meins
const jaehrlicheDiff = monatsDiff * 13  // inkl. Urlaubsgeld
const nachzahlung = jaehrlicheDiff * Math.min(jahre, 3)
const zinsen = nachzahlung * 0.05 * (jahre / 2)
const immateriell = monatsDiff > 500 ? 5000 : monatsDiff > 200 ? 2500 : 1000
const gesamt = nachzahlung + zinsen + immateriell
```

**Ausgabe:** „Mögliche Entschädigung: ca. XX.XXX €" — groß und prominent

**Rechtsgrundlage-Badge:** „Grundlage: Art. 21 EU-RL 2023/970 + BAG Az. 8 AZR 300/24"

---

### Tool 5: Compliance-Check Arbeitgeber (`/compliance-check-arbeitgeber`)
**Zielgruppe:** Arbeitgeber | **Conversion: hoch** (5 Fragen → Ampelergebnis → Audit-Mandat)

**Fragen:**
1. Wie viele Mitarbeiter hat Ihr Unternehmen? `[< 50 / 50–99 / 100–249 / 250–499 / 500+]`
2. Enthalten Ihre Stellenanzeigen transparente Gehaltsspannen? `[Ja / Nein / Teilweise]`
3. Haben Sie dokumentierte, objektive Kriterien für die Gehaltsfestlegung? `[Ja / Nein / In Arbeit]`
4. Wissen Sie, wie hoch Ihr Gender Pay Gap ist? `[Ja, unter 5% / Ja, über 5% / Nein]`
5. Haben Sie Ihr Vergütungssystem in den letzten 2 Jahren geprüft? `[Ja / Nein]`

**Auswertungslogik:**
```typescript
// Score 0-10, dann Ampel
// Ampel Grün (8-10): "Gut aufgestellt — kleiner Feinschliff nötig"
// Ampel Gelb (5-7):  "Handlungsbedarf in 2-3 Bereichen — jetzt handeln"
// Ampel Rot (0-4):   "Dringender Handlungsbedarf — Risiko erheblich"
```

**Ergebnis:** Score + Ampel + individuelle Handlungsempfehlungen pro Frage
**CTA Rot/Gelb:** „Beratungstermin buchen" | **CTA Grün:** „Audit zur Absicherung anfragen"

---

### Tool 6: Auskunftsrecht-Checker (`/auskunftsrecht-checker`)
**Zielgruppe:** Arbeitnehmer | **Conversion: hoch** (3 Klicks → personalisiertes Ergebnis)

**3-Schritt-Flow:**
1. Unternehmensgröße: `[Unter 50 MA / 50–199 MA / 200–499 MA / 500+ MA]`
2. Betriebszugehörigkeit: `[Unter 6 Monate / 6–24 Monate / Über 2 Jahre]`
3. Situation: `[Ich verdiene vermutlich weniger / Ich möchte mein Gehalt einordnen / Ich wurde abgelehnt]`

**Ergebnis-Texte (nach Kombination):**
- `≥50 MA + ≥6 Monate`: „Sie haben Anspruch auf Auskunft. Ihr Arbeitgeber muss innerhalb von 2 Monaten antworten."
- `<50 MA`: „Ihr Arbeitgeber ist aktuell noch nicht zur Auskunft verpflichtet — aber das ändert sich ab Juni 2026. Eine Equal-Pay-Klage ist dennoch möglich."

**CTA:** Muster-Auskunftsschreiben Generator öffnen (Tool 2) + Kontakt

---

### Tool 7: Branchenvergleich Gehalt (`/gender-pay-gap-rechner`)
**Zielgruppe:** Arbeitnehmer | **Traffic: sehr hoch** (SEO-Magnet, hohe Shareability)

**Inputs:**
- Mein Bruttogehalt (Slider, 20.000–150.000 €/Jahr)
- Branche (Dropdown, aus `branchen.ts`)
- Geschlecht
- Bundesland
- Berufserfahrung (0–30 Jahre)
- Vollzeit / Teilzeit

**Ausgabe:**
- „Im Vergleich zum Median [Ihrer Branche] in [Bundesland] verdienen Sie: X% [mehr/weniger]"
- Balkendiagramm: Mein Gehalt vs. Median Frauen vs. Median Männer
- Wenn unter Median Frauen: „Ihr Gehalt liegt unter dem Branchenmedian für Frauen — das könnte auf Lohndiskriminierung hindeuten"
- Datenquelle-Badge: „Daten: Statistisches Bundesamt 2025"

**Datengrundlage** (in `/data/gehalt-benchmark.ts`):
```typescript
// Destatis-Medianjahresverdienste nach Branche und Geschlecht
const benchmarks = {
  it:              { frauen: 62000, maenner: 72000 },
  gesundheitswesen:{ frauen: 38000, maenner: 48000 },
  bankwesen:       { frauen: 44000, maenner: 60000 },
  // ... alle Branchen
}
```

---

### Tool 8: Berichtspflicht-Kalender (`/berichtspflicht-kalender`)
**Zielgruppe:** Arbeitgeber | **Backlinks: hoch** (HR-Bookmark-Tool)

**Input:** Unternehmensgröße auswählen
**Ausgabe:** Personalisierter Zeitplan aller Deadlines 2026–2032 als visueller Kalender
**Download:** ICS-Datei für Kalender-Import + PDF-Export

**Deadlines-Daten:**
```typescript
const deadlines = {
  '50-99':  [
    { datum: '2026-06-07', pflicht: 'Auskunftsrecht auf Anfrage' },
    { datum: '2026-06-07', pflicht: 'Kriterien-Offenlegung' },
  ],
  '250+': [
    { datum: '2026-06-07', pflicht: 'Vollständige Auskunftspflicht' },
    { datum: '2027-06-07', pflicht: 'Erster Entgelttransparenz-Bericht' },
    { datum: '2030-06-07', pflicht: 'Dritter Bericht' },
  ]
}
```

---

### Tools-Reihenfolge in der Implementierung

```
Priorität 1 (sofort, da höchste Conversion):
[ ] Tool 5: Compliance-Check Arbeitgeber    → /compliance-check-arbeitgeber
[ ] Tool 6: Auskunftsrecht-Checker         → /auskunftsrecht-checker
[ ] Tool 2: Auskunftsschreiben Generator   → /auskunftsrecht-checker/schreiben-generator
[ ] Tool 1: Sanktionsrechner               → Unterseite von /compliance-check-arbeitgeber

Priorität 2 (nach Core-Seiten):
[ ] Tool 4: Entschädigungs-Simulator       → /equal-pay-klage/entschaedigung-berechnen
[ ] Tool 7: Branchenvergleich/GPG-Rechner  → /gender-pay-gap-rechner
[ ] Tool 3: KI-Situationscheck             → /situationscheck  ← API-Route zuerst!

Priorität 3 (nach Launch):
[ ] Tool 8: Berichtspflicht-Kalender       → /berichtspflicht-kalender
```

### Wichtig für alle Tools
- Jedes Tool hat `generateMetadata()` mit keyword-optimiertem Titel
- Jedes Tool endet mit einem `<CTASection>` (aus bestehendem Projekt übernehmen)
- Alle Berechnungen haben einen Disclaimer: „Alle Berechnungen sind Schätzungen und ersetzen keine anwaltliche Beratung."
- Tool 3 (KI-Check): `ANTHROPIC_API_KEY` in `.env.local` — NIE client-seitig
- Tool 2 (Schreiben): PDF-Download mit `jsPDF` — `npm install jspdf`
- Tool 8 (Kalender): ICS-Export mit `ics` — `npm install ics`

---

### Tool 9: Entgeltlücken-Ampel (`/entgeltluecken-ampel`)
**Zielgruppe:** Arbeitgeber | **Conversion: sehr hoch** (Einstieg ins Audit-Mandat)

**Inputs:**
- Anzahl Mitarbeiter gesamt
- Anzahl weiblicher Mitarbeiter
- Ø Jahresgehalt Männer (€)
- Ø Jahresgehalt Frauen (€)
- Haben Sie variable Gehaltsbestandteile? [Ja/Nein]
- Sind Sie tarifgebunden? [Ja/Nein]

**Berechnungslogik:**
```typescript
const unbereinigterGPG = ((gehaltM - gehaltF) / gehaltM) * 100
// Bereinigung: Strukturfaktoren schätzen (Teilzeit, Hierarchie)
const bereinigtGPG = unbereinigterGPG * 0.6  // Faustregel: ~40% strukturell erklärbar
const risiko = bereinigtGPG < 2 ? 'grün' : bereinigtGPG < 5 ? 'gelb' : 'rot'
```

**Ausgabe:**
- Große Ampel (Grün/Gelb/Rot) mit Prozentwert
- „Bei einem GPG über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht (Art. 9 EU-RL)"
- Handlungsempfehlungen je nach Ampelfarbe
- Rot: Sofortiger CTA „Compliance-Audit anfragen"

---

### Tool 10: Stellenanzeigen-Checker (`/stellenanzeigen-checker`)
**Zielgruppe:** Arbeitgeber | **Traffic: hoch** | **Viral-Potenzial**

**Input:** URL einer Stellenanzeige (oder Freitext einfügen)

**Prüfkriterien (via KI-Analyse, Anthropic API):**
```typescript
const checks = [
  { id: 'gehalt',    label: 'Gehaltsspanne angegeben',           pflicht: 'ab Juni 2026' },
  { id: 'neutral',  label: 'Geschlechtsneutrale Formulierung',   pflicht: 'sofort' },
  { id: 'kriterien',label: 'Entgeltkriterien transparent',       pflicht: 'ab Juni 2026' },
  { id: 'diskrim',  label: 'Keine mittelbar diskriminierenden Anforderungen', pflicht: 'sofort' },
]
```

**Ausgabe:** Checkliste mit Häkchen/Kreuz + Ampel gesamt
**CTA:** „Stellenanzeigen-Paket prüfen lassen" (für Unternehmen mit vielen Stellen)

**API Route `/app/api/stellenanzeigen-check/route.ts`:**
Anthropic API analysiert den eingefügten Text auf die 4 Kriterien, gibt strukturiertes JSON zurück.

---

### Tool 11: Equal Pay Day Zähler (`/equal-pay-day-zaehler`)
**Zielgruppe:** Beide | **Viral-Potenzial** | **PR + Backlinks**

**Hauptfeature:** Live-Animation
```
Frauen in Deutschland arbeiten bis zum [27. Februar 2027] gratis.
Das sind [58] Tage unbezahlte Arbeit im Jahr.
```

**Interaktiv:** Branche auswählen → individueller Equal Pay Day für diese Branche
```typescript
// Equal Pay Day = 365 * (gpgProzent / 100) Tage ab 1. Januar
const equalPayDay = new Date(year, 0, 1)
equalPayDay.setDate(equalPayDay.getDate() + Math.round(365 * gpg / 100))
```

**Embeddable Widget:** `<script src="https://gender-paygap.de/widget/epd.js">` → andere Seiten können einbetten → Backlinks

**Countdown bis nächster Equal Pay Day** (letzter Freitag im Februar)

---

### Tool 12: Gehaltsverhandlungs-Vorbereiter (`/gehaltsverhandlung-vorbereiter`)
**Zielgruppe:** Arbeitnehmer | **Engagement: hoch**

**Voraussetzung:** Nutzer hat bereits Auskunft vom Arbeitgeber erhalten

**Inputs:**
- Mein aktuelles Gehalt (€)
- Vergleichsgehalt laut Auskunft (€)
- Differenz besteht seit (Monate)
- Meine Leistungsbeurteilung [Sehr gut / Gut / Befriedigend]
- Grund laut Arbeitgeber [Erfahrung / Marktlage / Leistung / Keiner genannt]

**Output — strukturierter Gesprächsleitfaden:**
```
1. Eröffnung: „Ich habe von meinem Auskunftsrecht gemäß Art. 7 EU-RL Gebrauch 
   gemacht und festgestellt, dass ich X€ weniger verdiene als der Median meiner 
   Vergleichsgruppe..."

2. Rechtliche Grundlage nennen:
   „Das BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein 
   Paarvergleich ausreicht um Diskriminierungsvermutung auszulösen..."

3. Ihr genannter Grund [Erfahrung] ist nur dann zulässig, wenn...

4. Mein Zielgehalt: [Vergleichswert] — Zeitrahmen: sofort / ab [Datum]

5. Falls keine Einigung: Hinweis auf mögliche Klage
```

**CTA:** „Antwort des Arbeitgebers anwaltlich prüfen lassen"

---

### Tool 13: Vergleichsgruppen-Finder (`/vergleichsgruppen-finder`)
**Zielgruppe:** Arbeitnehmer | **Conversion: hoch** (hilft beim Beweis-Aufbau)

**Technisch:** Anthropic API

**Input (Freitext):**
„Beschreiben Sie Ihre Tätigkeit: Was tun Sie täglich? Welche Qualifikationen brauchen Sie? Wem berichten Sie?"

**API-Prompt:** Analysiert die Beschreibung anhand der 4 Kriterien aus Art. 4 EU-RL:
- Kompetenz
- Verantwortung
- Belastungen
- Arbeitsbedingungen

**Output:**
- Liste potenzieller Vergleichspositionen im Unternehmen
- Rechtliche Einschätzung: „Diese Positionen gelten rechtlich als gleichwertig"
- Hinweis: „Das BAG-Urteil 8 AZR 300/24 bestätigt: Ein einzelner Paarvergleich reicht aus"
- CTA: „Klage-Chancen prüfen lassen"

**API Route `/app/api/vergleichsgruppen/route.ts`**

---

### Tool 14: Vergütungssystem-Selbsttest (`/vergütungssystem-selbsttest`)
**Zielgruppe:** Arbeitgeber | **Lead-Capture: sehr hoch**

**20 Fragen in 4 Kategorien (je 5 Fragen):**

Kategorie 1 — Transparenz (Art. 6 EU-RL):
1. Haben Sie schriftlich dokumentierte Vergütungsrichtlinien?
2. Kennen alle Mitarbeiter die Kriterien für ihre Gehaltseinstufung?
3. Sind Beförderungskriterien geschlechtsneutral formuliert?
4. Enthalten Ihre Stellenanzeigen Gehaltsspannen?
5. Informieren Sie Mitarbeiter jährlich über ihr Auskunftsrecht?

Kategorie 2 — Gleichwertigkeit (Art. 4 EU-RL):
6. Haben Sie eine Stellenbewertung nach objektiven Kriterien?
7. Werden Kompetenzen, Verantwortung, Belastung und Arbeitsbedingungen bewertet?
8. Sind „typisch weibliche" Tätigkeiten gleichwertig zu „typisch männlichen" eingestuft?
9. Ist Teilzeitarbeit bei der Gehaltseinstufung neutral behandelt?
10. Gibt es keine unbewussten Vorurteile bei der Stellenbewertung?

Kategorie 3 — Reporting (Art. 9 EU-RL):
11. Wissen Sie, wie hoch Ihr unbereinigter Gender Pay Gap ist?
12. Haben Sie Ihren bereinigten GPG berechnet?
13. Haben Sie Daten über GPG nach Abteilung / Hierarchieebene?
14. Können Sie den GPG objektiv erklären (nicht-diskriminierend)?
15. Sind Sie auf die Berichtspflicht 2027 vorbereitet?

Kategorie 4 — Prozesse (Art. 7, 10 EU-RL):
16. Haben Sie einen Prozess für Auskunftsanfragen?
17. Antworten Sie auf Auskunftsanfragen innerhalb von 2 Monaten?
18. Gibt es bei Ihnen eine Beschwerdestelle für Entgeltdiskriminierung?
19. Schulen Sie HR und Führungskräfte zu Entgeltgleichheit?
20. Haben Sie den Betriebsrat in die Vergütungsstrategie eingebunden?

**Scoring:** Je Ja = 1 Punkt (max. 20)
- 16–20: Grün — „Gut aufgestellt, kleiner Feinschliff"
- 10–15: Gelb — „Handlungsbedarf in mehreren Bereichen"
- 0–9:   Rot — „Dringend: Strukturelle Lücken mit hohem Haftungsrisiko"

**Lead-Capture:** Ergebnis-Report per E-Mail → Pflichtfeld E-Mail-Adresse vor Anzeige des vollständigen Reports
**CTA:** „Vollständiges Audit anfragen — wir schließen die Lücken"

---

### Tool 15: Equal-Pay-Anspruch Schnellcheck (`/equal-pay-anspruch-schnellcheck`)
**Zielgruppe:** Arbeitnehmer | **Traffic: hoch** (kurz, schnell, teilbar)

**Nur 4 Fragen (< 2 Minuten):**
1. Arbeiten Sie im selben Unternehmen wie eine Person des anderen Geschlechts mit ähnlicher Tätigkeit? [Ja / Nein / Weiß nicht]
2. Verdienen Sie vermutlich weniger? [Ja / Nein / Weiß nicht]
3. Seit wann ungefähr? [< 1 Jahr / 1–3 Jahre / > 3 Jahre]
4. Hat Ihr Unternehmen mehr als 50 Mitarbeiter? [Ja / Nein / Weiß nicht]

**Ergebnis in 3 Varianten:**
- Alle Ja: „Starke Anzeichen für einen Equal-Pay-Anspruch. Nächster Schritt: Auskunftsrecht nutzen →"
- Gemischt: „Möglicher Anspruch — eine Ersteinschätzung klärt mehr →"
- Überwiegend Nein/Weiß nicht: „Kein eindeutiger Anspruch erkennbar — trotzdem prüfen lassen →"

**CTA:** Öffnet direkt den Auskunftsschreiben-Generator (Tool 02)

---

## 14. Aktualisierte Tools-Reihenfolge (alle 15 Tools)

```
Priorität 1 — Sofort (höchste Conversion):
[ ] T05: /compliance-check-arbeitgeber          (5-Fragen Ampel)
[ ] T06: /auskunftsrecht-checker                (3-Klick Prüfer)
[ ] T02: /auskunftsrecht-checker/schreiben-generator (PDF-Generator)
[ ] T01: /compliance-check-arbeitgeber/sanktionsrechner
[ ] T15: /equal-pay-anspruch-schnellcheck       (2-Min Schnellcheck)
[ ] T14: /vergütungssystem-selbsttest           (20 Fragen + Lead)
[ ] T09: /entgeltluecken-ampel                  (GPG Ampel AG)

Priorität 2 — Nach Core-Seiten:
[ ] T04: /equal-pay-klage/entschaedigung-berechnen
[ ] T07: /gender-pay-gap-rechner                (Branchenvergleich)
[ ] T13: /vergleichsgruppen-finder              (Anthropic API)
[ ] T03: /situationscheck                       (Anthropic API — API-Route zuerst!)

Priorität 3 — Nach Launch:
[ ] T10: /stellenanzeigen-checker               (Anthropic API)
[ ] T12: /gehaltsverhandlung-vorbereiter
[ ] T11: /equal-pay-day-zaehler                 (Viral + Embeddable)
[ ] T08: /berichtspflicht-kalender              (ICS-Export)
```
