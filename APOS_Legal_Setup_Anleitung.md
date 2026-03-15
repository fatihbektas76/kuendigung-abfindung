# APOS Legal Website — Setup & Blog Anleitung

## Teil 1: Claude Code Prompt

Kopiere den folgenden Text und füge ihn als Prompt in Claude Code ein. Claude Code wird dann das komplette Projekt aufsetzen.

---

### Prompt für Claude Code:

```
Erstelle ein Next.js 14 Projekt (App Router) für eine englischsprachige Kanzlei-Website. 
Die Seite richtet sich an US/UK-Unternehmen, die Rechtsstreitigkeiten in Deutschland haben 
und einen in Deutschland zugelassenen Anwalt brauchen.

## Anforderungen:

### 1. Projekt-Setup
- Next.js 14 mit App Router
- TypeScript
- Tailwind CSS
- Deployment-Target: Vercel

### 2. Landingpage
Verwende diese HTML-Datei als Basis für Design und Inhalt:
[Füge hier den Inhalt der index.html ein die du von Claude bekommen hast]

Wandle das HTML in Next.js Komponenten um:
- Layout mit Navigation und Footer
- Hero Section
- "Your Situation" Section (Plaintiff vs Defendant)
- "Disputes We Handle" Section 
- "How It Works" Process Steps
- Free Tools Section
- Attorney Profile Section
- FAQ Accordion
- Blog Preview Grid
- CTA Section

### 3. Blog-System mit Markdown
- Erstelle einen /blog Route
- Blog-Posts werden als .mdx Dateien in /content/blog/ gespeichert
- Jeder Post hat Frontmatter (title, date, description, category, slug)
- Blog-Index-Seite mit Liste aller Posts
- Einzelne Blog-Post-Seite mit schönem Layout
- Verwende next-mdx-remote oder contentlayer für MDX Rendering

### 4. SEO
- Alle Schema.org JSON-LD Markups aus der HTML-Datei übernehmen
- Dynamische Meta-Tags für jede Seite
- Automatische Sitemap via next-sitemap
- robots.txt
- Open Graph Images
- Für Blog-Posts: Article Schema.org Markup

### 5. Beispiel Blog-Posts
Erstelle 3 Beispiel-MDX-Dateien in /content/blog/:
- "how-german-courts-work.mdx"
- "enforcing-us-judgment-in-germany.mdx"  
- "firing-employee-germany-guide.mdx"

### 6. Vercel Deployment
- vercel.json konfigurieren
- Environment Variables dokumentieren
- README.md mit Deploy-Anleitung
```

---

## Teil 2: Vercel Deployment (Schritt für Schritt)

### Voraussetzung
- GitHub Account (kostenlos: github.com)
- Vercel Account (kostenlos: vercel.com — mit GitHub verknüpfen)

### Schritte

1. **GitHub Repository erstellen**
   - Gehe zu github.com → "New Repository"
   - Name: z.B. `apos-legal-international`
   - Private Repository (empfohlen)

2. **Code hochladen** (in deinem Projekt-Ordner)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DEIN-USERNAME/apos-legal-international.git
   git push -u origin main
   ```

3. **Vercel verbinden**
   - Gehe zu vercel.com → "Add New Project"
   - Repository auswählen
   - Framework: Next.js (wird automatisch erkannt)
   - "Deploy" klicken
   - Vercel gibt dir eine URL wie: apos-legal-international.vercel.app

4. **Domain verbinden**
   - In Vercel: Settings → Domains → Deine Domain eingeben
   - DNS-Einträge bei deinem Domain-Anbieter setzen (Vercel zeigt dir genau welche)
   - SSL-Zertifikat wird automatisch erstellt

5. **Automatische Updates**
   - Jedes Mal wenn du Code auf GitHub pushst, deployed Vercel automatisch

---

## Teil 3: Blog-Artikel schreiben

### So funktioniert es

Blog-Artikel sind einfache Textdateien mit der Endung `.mdx` im Ordner `/content/blog/`. 
Du kannst sie mit jedem Texteditor erstellen — oder Claude bitten, sie für dich zu schreiben.

### Aufbau einer Blog-Datei

Jede Datei hat zwei Teile:
1. **Frontmatter** (Metadaten zwischen `---` Zeichen)
2. **Inhalt** (normaler Text mit Markdown-Formatierung)

### Beispiel: Neuen Artikel erstellen

Erstelle eine Datei: `/content/blog/suing-in-germany-guide.mdx`

```mdx
---
title: "How to Sue a Company in Germany: A Step-by-Step Guide for US Businesses"
date: "2026-02-15"
description: "Everything US companies need to know about filing a lawsuit in Germany — jurisdiction, costs, timelines, and what to expect from German courts."
category: "Litigation"
author: "Fatih Bektas"
slug: "suing-in-germany-guide"
featured: true
---

Filing a lawsuit in a foreign country sounds daunting. But German litigation 
is actually more structured, faster, and often cheaper than US proceedings. 
Here's exactly how the process works.

## Step 1: Determine Jurisdiction

Before you can sue in Germany, you need to establish that a German court 
has jurisdiction over your dispute. The key question: **does the defendant 
have a registered address or assets in Germany?**

German jurisdiction rules follow the Brussels Regulation (for EU defendants) 
or the German Code of Civil Procedure (ZPO) for non-EU cases. The most 
common bases for jurisdiction are:

- **Defendant's domicile** (§ 12 ZPO) — you can always sue where the 
  defendant is located
- **Place of performance** (§ 29 ZPO) — where the contractual obligation 
  was to be fulfilled
- **Place of tort** (§ 32 ZPO) — where the harmful act occurred

## Step 2: Send a Demand Letter (Abmahnung)

...weiter schreiben...
```

### Markdown Formatierung — Kurzreferenz

| Was du willst          | Was du schreibst               |
|------------------------|--------------------------------|
| **Fett**               | `**fetter Text**`              |
| *Kursiv*               | `*kursiver Text*`              |
| Überschrift            | `## Überschrift`               |
| Unterüberschrift       | `### Unterüberschrift`         |
| Link                   | `[Linktext](https://url.com)`  |
| Aufzählung             | `- Punkt 1`                    |
| Nummerierung           | `1. Erster Punkt`              |
| Zitat                  | `> Dies ist ein Zitat`         |
| Trennlinie             | `---`                          |

### Blog-Artikel veröffentlichen

1. Erstelle die `.mdx` Datei in `/content/blog/`
2. Speichere sie
3. Pushe auf GitHub:
   ```bash
   git add .
   git commit -m "Neuer Blog: Titel des Artikels"
   git push
   ```
4. Vercel deployed automatisch — dein Artikel ist in ~60 Sekunden live

### Oder noch einfacher: Claude schreibt den Artikel

Du kannst Claude (hier oder in Claude Code) bitten:

```
Schreibe einen SEO-optimierten Blog-Artikel für meine Kanzlei-Website. 
Zielgruppe: US/UK-Unternehmen mit Rechtsstreitigkeiten in Deutschland.

Thema: [DEIN THEMA]

Formatiere den Artikel als MDX-Datei mit Frontmatter. 
Der Artikel soll ca. 1500-2000 Wörter lang sein und 
praktische Tipps für internationale Unternehmen enthalten.
```

---

## Teil 4: SEO-Strategie — Die wichtigsten Blog-Themen

Diese Artikel solltest du als erstes erstellen (nach Priorität):

### Hohe Priorität (sofort schreiben)
1. **"How to Sue a Company in Germany: Complete Guide for US Businesses"**
   → Ziel-Keywords: sue in Germany, German lawsuit, German court foreign company

2. **"German Litigation Costs Explained: What US Companies Can Expect"**
   → Ziel-Keywords: German litigation costs, lawsuit costs Germany, attorney fees Germany

3. **"I've Been Sued in Germany — What Do I Do? (Emergency Guide)"**
   → Ziel-Keywords: sued in Germany, German lawsuit defense, respond to German lawsuit

4. **"How German Courts Work: US vs. Germany Comparison"**
   → Ziel-Keywords: German court system, German civil procedure, Landgericht explained

5. **"Enforcing a US Judgment in Germany: Your Complete Options"**
   → Ziel-Keywords: enforce US judgment Germany, Exequatur Germany

### Mittlere Priorität (innerhalb 1 Monat)
6. **"Firing an Employee in Germany: What Foreign Employers Must Know"**
7. **"German Contract Law Basics for International Businesses"**
8. **"Shareholder Disputes in Germany: Rights and Remedies"**
9. **"Interim Injunctions in Germany: How to Get Fast Relief"**
10. **"The Loser-Pays Rule in Germany: How It Affects Your Litigation Strategy"**

### Langfristig (laufend)
11. **"Arbitration in Germany: ICC, DIS, LCIA Compared"**
12. **"Setting Up a GmbH: Legal Requirements for Foreign Companies"**
13. **"German Non-Compete Clauses: What's Enforceable?"**
14. **"Brexit and German Litigation: What Changed for UK Businesses"**
15. **"Statute of Limitations in Germany: Key Deadlines You Can't Miss"**

### Tipps für gutes SEO
- Jeder Artikel mindestens 1.500 Wörter
- Überschriften als Fragen formulieren (H2, H3)
- Interne Links zwischen Artikeln setzen
- Am Ende jedes Artikels: CTA mit Link zur Erstberatung
- Alle 2 Wochen einen neuen Artikel veröffentlichen
- Google Search Console einrichten und Sitemap einreichen

---

## Teil 5: Nach dem Launch — Checkliste

- [ ] Domain registriert und mit Vercel verbunden
- [ ] Echtes Foto von dir eingebaut (statt "FB" Platzhalter)
- [ ] Canonical URLs auf echte Domain geändert
- [ ] Google Search Console eingerichtet
- [ ] Google Analytics / Plausible Analytics eingerichtet
- [ ] Sitemap bei Google eingereicht
- [ ] Impressum und Datenschutzerklärung erstellt (Pflicht!)
- [ ] Brevo-Terminbuchungslink getestet
- [ ] Erste 5 Blog-Artikel veröffentlicht
- [ ] LinkedIn-Profil mit Website verlinkt
- [ ] Auf Anwaltsverzeichnissen eintragen (mit Link zur Website)
