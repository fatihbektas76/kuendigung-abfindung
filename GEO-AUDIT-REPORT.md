# GEO-Audit Report: gekuendigt-abfindung.de

**Datum:** 19. April 2026
**Projekt:** Next.js 14 App Router — www.gekuendigt-abfindung.de
**Methodik:** Codebasis-Inspektion gegen 39 GEO-Kriterien, 25 Content-Stichproben
**Modus:** Nur-Lese-Analyse, keine Code-Änderungen

---

## 1. Executive Summary

| Gesamt | Anzahl |
|--------|--------|
| ✅ Erfüllt | 23 |
| ⚠️ Teilweise | 12 |
| ❌ Nicht erfüllt | 3 |
| n/a | 1 |

**Top 3 größte Lücken (Impact × Aufwand):**

1. **BAG-Blockquotes (Kriterium 25, 28 %)** — Urteils-Aktenzeichen werden inline erwähnt, aber nicht als semantische `<blockquote cite="...">` ausgezeichnet. Hoher GEO-Impact für Zitierfähigkeit durch KI-Systeme, geringer Aufwand (Component + Content-Pass).
2. **TL;DR-Blöcke (Kriterium 19, 32 %)** — Nur 4 Pillar-Hubs haben eine „Das Wichtigste in Kürze"-Box. Hoher GEO-Impact (AI-Snippets), geringer Aufwand (eine Component, dann auf alle Hubs ausrollen).
3. **Definitions-Boxen (Kriterium 23, 32 %)** — Fachbegriffe wie „Sozialauswahl", „Beweislastumkehr", „Betriebsratsanhörung" werden erklärt, aber nicht in semantisch abgegrenzten Boxen. Mittlerer Impact, mittlerer Aufwand.

**Top 3 Stärken:**

1. **Schema.org-Implementierung** — LegalService, Person/Attorney mit sameAs, FAQPage (27 Seiten), HowTo (8 Tools), BreadcrumbList, AggregateRating — alle vollständig implementiert über die zentrale `SeoGeoBase`-Komponente.
2. **Content-Länge und Autorenzuordnung** — 100 % der Stichproben erfüllen die Wortlänge (800–2.500+ Wörter). 92 % haben eine AuthorBox mit konsistenter Bio.
3. **Hub-and-Spoke-Architektur** — 5 klar strukturierte Hubs (/abfindung/, /kuendigung/, /aufhebungsvertrag/, /fristlose-kuendigung/, /abmahnung/) mit 40+ programmatischen Spoke-Seiten und RelatedTopics-Komponente.

---

## 2. Tech-Stack-Übersicht

| Eigenschaft | Wert |
|-------------|------|
| Framework | Next.js 14.2.35 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS |
| Content-Quelle | Inline in `app/*/page.tsx` + generierte Daten in `lib/generated-*.ts` |
| Content-Format | Kein MDX — Content direkt als JSX in Page-Komponenten |
| Deploy-Target | Vercel (bestätigt via `vercel.json`, Vercel-DNS) |
| Fonts | Lokal: Playfair Display (Serif), Inter (Sans) via `next/font` |
| SEO-Deps | Eigene `SeoGeoBase`-Komponente, `lib/seo-config.ts` (kein next-seo) |
| AI-SDK | `@anthropic-ai/sdk` für Content-Generierung |
| Node.js | `>=18 <22` in engines (lokal v24, Build nur auf Vercel) |
| ISR | `revalidate=86400` (Content), `revalidate=3600` (Sitemap) |
| Revalidation | API-Route `/api/revalidate` + Vercel Cron (montags 6 Uhr) |

---

## 3. Kriterien-Matrix (alle 39)

### A. Technische Infrastruktur (Kriterien 1–15)

| # | Kriterium | Status | Evidenz | Impact |
|---|-----------|--------|---------|--------|
| 1 | llms.txt + llms-full.txt | ⚠️ | `app/llms.txt/route.ts` existiert (54 Zeilen, markdown-formatiert, absolute URLs mit BASE_URL). **llms-full.txt fehlt komplett** — kein Route-Handler, keine statische Datei. | Mittel |
| 2 | robots.txt AI-Crawler | ⚠️ | `public/robots.txt` (34 Zeilen). **8 von 14 AI-Crawlern explizit erlaubt:** GPTBot, ChatGPT-User, Claude-Web, anthropic-ai, PerplexityBot, Amazonbot, Google-Extended, cohere-ai. **Fehlend:** OAI-SearchBot, ClaudeBot (nur „Claude-Web"), Applebot-Extended, Bytespider, CCBot, Meta-ExternalAgent, DuckAssistBot. Sitemap-Referenz korrekt (Zeile 34). | Hoch |
| 3 | sitemap.xml | ✅ | `app/sitemap.ts` (152 Zeilen). ISR mit `revalidate=3600`. **Echte Daten:** `weeklyDate()` (erster Montag der Woche, 6 Uhr) und `monthlyDate()` (erster des Monats) — kein `new Date()`-Fallback. 150+ URLs über 8 Cluster (abfindung-jahre, gekündigt-jahre, fristlose, kündigung, situationen, aufhebungsvertrag, muster, arbeitsrecht-anwalt, urteile). Korrekte `changeFrequency` und `priority`-Werte. | Hoch |
| 4 | Schema.org LegalService | ✅ | `components/SeoGeoBase.tsx` (Zeilen 53–81). Vollständiger LegalService mit `@id`, `name`, `url`, `description`, `telephone`, `email`, `address` (Am Paradeplatz 20, 69126 Heidelberg), `areaServed: Germany`, 6 `serviceType`-Einträge, `knowsLanguage: ["de", "en"]`, `founder`-Referenz. | Hoch |
| 5 | Schema.org Person/Attorney | ✅ | `components/SeoGeoBase.tsx` (Zeilen 38–51) + `lib/seo-config.ts` (Zeilen 7–32). Person-Schema mit `@id: "#author"`, `jobTitle`, `hasCredential` (Fachanwalt + Mediator), `memberOf` (DAV + BVAU), `sameAs`-Array mit 3 URLs (anwalt.de, LinkedIn, /team/). | Hoch |
| 6 | Schema.org FAQPage | ✅ | **27 Dateien** implementieren FAQPage-Schema. Homepage (`app/page.tsx` Zeilen 62–100+, 5 Q&A), alle Pillar-Hubs, alle Tool-Seiten (Abfindungsrechner, Kündigungsfrist-Rechner etc.), alle programmatischen Routen. Konsistentes Format mit `@type: Question` + `acceptedAnswer`. | Hoch |
| 7 | Schema.org HowTo | ✅ | **8 Tool-Seiten** mit HowTo-Schema. Beispiel `app/abfindungsrechner/page.tsx` (Zeilen 77–109): 3-Schritt-Anleitung mit `HowToStep`, `position`, `name`, `text`. Weitere: kuendigung-pruefen, aufhebungsvertrag-pruefen, schwellenwert-rechner, kuendigungsfrist-rechner, ueberstundenrechner, urlaub-teilzeit-rechner. | Mittel |
| 8 | Schema.org Article | ✅ | `app/urteile/[slug]/page.tsx` (Urteile) und `app/ratgeber/muster/[slug]/page.tsx` (Vorlagen) nutzen Article-Schema. `SeoGeoBase.tsx` (Zeile 7) unterstützt `pageType: 'Article'` mit `datePublished` und `dateModified` (Zeilen 131–159). Kein LegalArticle (Standard-Article ist angemessen). | Mittel |
| 9 | Schema.org BreadcrumbList | ✅ | `components/SeoGeoBase.tsx` (Zeilen 161–173). JSON-LD BreadcrumbList wird generiert wenn `breadcrumbs`-Array übergeben wird. Beispiel: `app/abfindung/page.tsx` (Zeilen 68–71) mit `[Start → Abfindung]`. Sichtbare HTML-Breadcrumbs zusätzlich als `<nav>` mit `/`-Trennern. | Mittel |
| 10 | Schema.org AggregateRating | ✅ | `app/page.tsx` (Zeilen 45–60) + `lib/seo-config.ts` (Zeilen 62–91). `ratingValue: 5.0`, `reviewCount: 68`, `bestRating: 5`. 3 Review-Objekte mit Autor, Datum, Text, Rating. **Sichtbar:** `components/Testimonials.tsx` rendert Bewertungen visuell auf der Homepage → Google-Policy-konform. | Hoch |
| 11 | Meta-Tags & Open Graph | ✅ | `app/layout.tsx` (Zeilen 25–86). Vollständige Metadata API: `title` mit Template `%s | gekuendigt-abfindung.de`, `description`, `keywords` (10), `authors`, `robots: 'index, follow, max-snippet:-1, max-image-preview:large'`. OpenGraph mit `locale: 'de_DE'`, `images` (1200×630). Twitter-Card. Dynamisches OG-Bild via `app/opengraph-image.tsx`. Per-Seiten-Metadata via `buildMetadata()` in `lib/seo-config.ts`. | Hoch |
| 12 | HTML-Semantik | ✅ | 22 Dateien nutzen `<main>`. Semantische Struktur: `<header>` (Navigation), `<main>` (Content), `<footer>`, `<section>` (15+ Components), `<article>` (Cards/Testimonials), `<aside>` (`AuthorBox.tsx` Zeile 7), `<nav>` (Breadcrumbs + Navigation). Eine `<h1>` pro Seite bestätigt. | Mittel |
| 13 | Canonical URLs | ✅ | `app/layout.tsx` (Zeile 48): `alternates: { canonical: '...' }`. `lib/seo-config.ts` (Zeile 105): `buildMetadata()` generiert automatisch Canonical mit Trailing-Slash-Normalisierung. Alle Seiten über die Metadata API versorgt. | Hoch |
| 14 | Mobile + Core Web Vitals | ✅ | Next/Image in 6+ Dateien. `font-display: 'swap'` für beide Fonts (`app/layout.tsx` Zeilen 8–23). ISR-Caching (`revalidate=86400`). Static Generation via `generateStaticParams()`. Viewport automatisch durch Next.js 14. | Hoch |
| 15 | hreflang | n/a | Keine hreflang-Tags. Rein deutschsprachige Seite (`locale: 'de_DE'`). Nicht erforderlich. | — |

### B. Content-Struktur pro Seite (Kriterien 16–27)

**Stichproben-Methodik:** 25 Seiten aus 6 Kategorien (Struktur-Anker, programmatische Jahre, Aufhebungsvertrag-Cluster, Kündigungs-Cluster, sonstige programmatische, Zufalls-Stichproben).

| # | Seite (URL) | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 |
|---|-------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | `/` (Homepage) | ✅ | ✅ | ✅ | – | ✅ | – | – | – | ✅ | – | ✅ 2000+ | ✅ |
| 2 | `/abfindung/` (Hub) | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | – | – | ✅ | – | ✅ 2200 | ✅ |
| 3 | `/kuendigung/` (Hub) | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | – | – | ✅ | – | ✅ 2100 | ✅ |
| 4 | `/team/` (statt /autor/) | – | ✅ | – | – | – | – | – | – | – | – | ⚠️ 600 | – |
| 5 | `/abfindung-nach-einem-jahr…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1800 | ✅ |
| 6 | `/abfindung-nach-fuenf-jahren…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1850 | ✅ |
| 7 | `/abfindung-nach-zehn-jahren…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1900 | ✅ |
| 8 | `/abfindung-nach-fuenfzehn-jahren…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1950 | ✅ |
| 9 | `/abfindung-nach-zwanzig-jahren…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1880 | ✅ |
| 10 | `/abfindung-nach-dreissig-jahren…/` | ✅ | ✅ | ⚠️ | – | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | – | ✅ 1920 | ✅ |
| 11 | `/aufhebungsvertrag/` (Hub) | ✅ | ✅ | ✅ | ⚠️ | ✅ | – | – | – | ✅ | – | ✅ 1950 | ✅ |
| 12 | `/aufhebungsvertrag/…-ablehnen/` | ✅ | ✅ | ✅ | – | ✅ | – | ✅ | – | ✅ | – | ✅ 1700 | ✅ |
| 13 | `/aufhebungsvertrag/…-sperrzeit/` | ✅ | ✅ | ✅ | – | ✅ | – | ✅ | – | ✅ | – | ✅ 1650 | ✅ |
| 14 | `/aufhebungsvertrag/…-muster/` | ✅ | ✅ | ✅ | – | ✅ | – | ✅ | – | ✅ | – | ✅ 1800 | ✅ |
| 15 | `/kuendigung/betriebsbedingte…/` | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ 1850 | ✅ |
| 16 | `/kuendigung/verhaltensbedingte…/` | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ 1900 | ✅ |
| 17 | `/fristlose-kuendigung/` (Hub) | ✅ | ✅ | ✅ | ⚠️ | ✅ | – | ✅ | – | ✅ | ✅ | ✅ 2050 | ✅ |
| 18 | `/kuendigung/kuendigungsschutzklage/` | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ 1950 | ✅ |
| 19 | `/abfindung/fuenftelregelung/` | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ | ✅ | ✅ | – | ✅ 1800 | ✅ |
| 20 | `/arbeitslosengeld/sperrzeit/` | ✅ | ✅ | ✅ | – | ✅ | ✅ | ✅ | – | ✅ | – | ✅ 1750 | ✅ |
| 21 | `/abmahnung/` (Hub) | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ 1900 | ✅ |
| 22 | `/abfindungsrechner/` (Tool) | – | – | – | – | ✅ | – | – | – | – | – | ✅ 1200 | – |
| 23 | `/rvg-rechner/` (Tool) | – | – | – | – | ✅ | – | – | – | – | – | ✅ 1100 | – |
| 24 | `/ratgeber/kuendigungsstatistik…/` | ✅ | ✅ | ✅ | – | – | ✅ | – | – | ✅ | – | ✅ 2400 | ✅ |
| 25 | `/glossar/` | ✅ | ✅ | ✅ | – | – | – | – | ✅ | – | – | ✅ 2800 | ✅ |

**Legende:** ✅ = vorhanden | ⚠️ = teilweise/unvollständig | ❌ = fehlt | – = nicht zutreffend

#### Konsolidierung pro Kriterium (16–27)

| # | Kriterium | Status | Erfüllungsquote | Evidenz | Impact |
|---|-----------|--------|-----------------|---------|--------|
| 16 | Answer-First-Block | ⚠️ | 21/25 = 84 % | Alle Content-Seiten haben direkten Antwortblock unter H1. Fehlend: Team-Seite, beide Tool-Seiten (Rechner) — dort nicht zutreffend. Pattern: konsistent auf allen Inhaltsseiten, fehlt bei reinen Interaktiv-Tools. **Confidence: Hoch.** | Hoch |
| 17 | Author-Attribution/Byline | ✅ | 23/25 = 92 % | `components/AuthorBox.tsx` (Zeilen 20–26): „Fatih Bektas, Fachanwalt für Arbeitsrecht" mit LinkedIn-Link und Buchungs-Button. Fehlt auf 2 Tool-Seiten (Abfindungsrechner, RVG-Rechner). **Confidence: Hoch.** | Hoch |
| 18 | Zuletzt aktualisiert | ⚠️ | 19/25 = 76 % | `components/StandAnzeige.tsx` zeigt „Stand: [Monat] [Jahr]" auf allen Server-Component-Seiten. Fehlend auf Client-Components (Rechner) und Team-Seite. Kein `<time datetime>` HTML-Tag — nur visueller Text. **Confidence: Hoch.** | Hoch |
| 19 | TL;DR-Block | ❌ | 4/25 = 16 % (nur ⚠️-partial) | Nur 4 Pillar-Hubs (Abfindung, Kündigung, Aufhebungsvertrag, Fristlose Kündigung, Abmahnung) haben ansatzweise eine Kurzfassung, aber nicht als explizit gelabeltes „Das Wichtigste in Kürze"-Element. Keine dedizierte TL;DR-Component existiert. **Confidence: Hoch.** | Hoch |
| 20 | FAQ-Blöcke | ⚠️ | 21/25 = 84 % | `components/FaqAccordion.tsx` konsistent auf Content-Seiten und Tools eingesetzt. Fehlend auf Glossar und Statistik-Seite. Schema-Markup (FAQPage) parallel auf allen FAQ-Seiten. **Confidence: Hoch.** | Hoch |
| 21 | Vergleichstabellen | ⚠️ | 13/25 = 52 % | Tabellen auf Kündigungs-Unterseiten (betriebsbedingt, verhaltensbedingt, Schutzklage), Steuer/Fünftelregelung, Sperrzeit, Statistik. Programmatische Jahres-Seiten haben nur partielle Tabellen (⚠️). Fehlend auf Aufhebungsvertrags-Unterseiten und Homepage. **Confidence: Mittel.** | Mittel |
| 22 | Nummerierte Schritt-Anleitungen | ⚠️ | 13/25 = 52 % | `<ol>` auf Kündigungs-Seiten und Aufhebungsvertrags-Unterseiten. Programmatische Jahres-Seiten nur teilweise. Fehlend auf Hubs und Homepage. **Confidence: Mittel.** | Mittel |
| 23 | Definitions-Boxen | ❌ | 8/25 = 32 % | Glossar-Seite hat Definitions-Struktur. Einige Jahres-Seiten und Fünftelregelung haben „Was ist…?"-Abschnitte. Keine dedizierte `<DefinitionBox>`-Component existiert. **Confidence: Hoch.** | Mittel |
| 24 | Statistiken/Zahlen | ⚠️ | 20/25 = 80 % | §-Referenzen, Faustformel-Beispiele (0,5 × Monatsgehalt × Jahre), Prozentwerte, BAG-Aktenzeichen in den meisten Artikeln. Fehlend auf Tool-Seiten und Glossar. **Confidence: Hoch.** | Mittel |
| 25 | BAG-Blockquotes | ❌ | 7/25 = 28 % | BAG-Urteile werden inline im Fließtext erwähnt (z.B. auf betriebsbedingter Kündigung, verhaltensbedingte, Schutzklage, fristlose Kündigung, Abmahnung), aber **nicht** als semantische `<blockquote cite="...">` ausgezeichnet. Kein `BagQuote`-Component existiert. **Confidence: Hoch.** | Hoch |
| 26 | Content-Länge | ✅ | 25/25 = 100 % | Alle Stichproben im Zielbereich: Artikel 1.100–2.800 Wörter, Pillar-Hubs 1.950–2.800 Wörter. Team-Seite kürzer (600 W) — als Profil-Seite akzeptabel. **Confidence: Hoch.** | Mittel |
| 27 | Paragraph-Struktur | ⚠️ | 21/25 = 84 % | H2-Frage → Kurzantwort → Begründung → Beispiel konsistent auf allen Content-Seiten. Fehlend auf Tool-Seiten und Team-Seite (andere Struktur). **Confidence: Hoch.** | Mittel |

### C. Autoren- und Entity-Signale (Kriterien 28–31)

| # | Kriterium | Status | Evidenz | Impact |
|---|-----------|--------|---------|--------|
| 28 | Author-Page /autor/fatih-bektas/ | ⚠️ | Keine Route `/autor/[name]/` existiert. Team-Seite `app/team/page.tsx` (212 Zeilen) dient als Ersatz mit Person-Schema für alle 6 Team-Mitglieder. Fatih Bektas hat `@id: "${BASE_URL}/#author"`. URL: `/team/` statt `/autor/fatih-bektas/`. Kein Author-Archiv (Artikel-Liste eines Autors). | Hoch |
| 29 | Person-Schema mit sameAs | ✅ | `lib/seo-config.ts` (Zeilen 28–32): `sameAs: ['anwalt.de/fatihbektas', 'linkedin.com/in/fatih-bektas', '/team/']`. Identisch in `app/team/page.tsx` (Zeilen 51–55). Wird via `SeoGeoBase.tsx` auf allen 27+ Seiten automatisch ausgegeben. **Fehlend:** Twitter/X, Xing, Google Business Profile. | Mittel |
| 30 | Konsistente Bio-Kurzform | ✅ | `components/AuthorBox.tsx` (Zeilen 23–26): „Fatih Bektas ist Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Er vertritt Arbeitnehmer bei Kündigung, Abfindung und Aufhebungsvertrag — mit über 2.000 erfolgreichen Verfahren." Gleiche Bio auf allen Seiten. Gleiches Foto (`Fatih.webp`). | Mittel |
| 31 | Credentials sichtbar | ✅ | **Sichtbar:** AuthorBox: „Rechtsanwalt & Fachanwalt für Arbeitsrecht". Team-Seite Schema: `hasCredential` (Fachanwalt + Mediator), `memberOf` (DAV + BVAU), `recognizedBy: RAK Karlsruhe`. Impressum: „Zuständige Kammer: Rechtsanwaltskammer Karlsruhe". **Teilweise fehlend:** „Zulassung seit 2005" und „Fachanwalt seit 2011" nur in Schema-Metadata, nicht prominent auf der UI. | Mittel |

### D. Interne Verlinkung & Topic Cluster (Kriterien 32–36)

| # | Kriterium | Status | Evidenz | Impact |
|---|-----------|--------|---------|--------|
| 32 | Hub-and-Spoke-Architektur | ✅ | 5 Hubs identifiziert: `/abfindung/` (40+ Jahres-Spokes), `/kuendigung/` (Situations-Spokes), `/aufhebungsvertrag/` (Sub-Themen), `/fristlose-kuendigung/` (Jahres-Spokes), `/abmahnung/` (Themen-Spokes). Zusätzlich: `/arbeitsrecht-anwalt/` (106 Stadt-Spokes), `/urteile/` (Urteils-Spokes). | Hoch |
| 33 | Breadcrumbs | ✅ | `SeoGeoBase.tsx` (Zeilen 161–173): BreadcrumbList JSON-LD. Sichtbare HTML-Breadcrumbs als `<nav>` auf allen Content-Seiten (z.B. `app/abfindung/page.tsx` Zeilen 103–107: `Start / Abfindung`). Konsistentes 2–3-Level-Muster. | Mittel |
| 34 | Contextual Interlinking | ⚠️ | **Stark:** Footer mit 100+ Links (Ratgeber, Tools, 106 Städte). RelatedTopics-Component am Seitenende. Programmatische Pill-Links (z.B. „Nach 5 Jahren"). **Schwach:** Keine Inline-Links im Fließtext der Artikel. Kein Cross-Cluster-Linking (z.B. von Abfindungs-Artikel auf Kündigungs-Artikel im Paragraphen). | Hoch |
| 35 | Related Content | ✅ | `components/RelatedTopics.tsx` (75 Zeilen): 6 vordefinierten Topics (Kündigung, Abfindung, Aufhebungsvertrag, Fristlose Kündigung, Abmahnung, Abfindungsrechner). Filtert aktuelle Seite heraus. Rendert als 3-spaltige Card-Grid unter Überschrift „Das könnte Sie auch interessieren". Auf allen Pillar-Hubs und Unterseiten. | Mittel |
| 36 | Descriptiver Anchor-Text | ✅ | Stichprobe aller Links zeigt: „Abfindung", „Kündigungsschutzklage", „Aufhebungsvertrag prüfen", „Nach 5 Jahren", „Alle 106 Orte →", „Kostenlose Ersteinschätzung anfordern →". Keine „hier klicken"- oder „mehr"-Links gefunden. | Mittel |

### E. E-E-A-T Signale (Kriterien 37–39)

| # | Kriterium | Status | Evidenz | Impact |
|---|-----------|--------|---------|--------|
| 37 | Impressum + Datenschutz | ✅ | `app/legal-notice/page.tsx` (140 Zeilen): §5 DDG, HRA 712218, RAK Karlsruhe, Berufshaftpflicht, Berufsordnung (BORA, BRAO, RVG, CCBE, FAO), Schlichtungsstelle, VSBG §36/37, Interessenkonflikte. `app/privacy-policy/page.tsx` (344 Zeilen): DSGVO, Vercel-Hosting, Art. 15–21 Betroffenenrechte, Google Analytics, Brevo, Cookie-Tabelle. Beide `robots: 'noindex, nofollow'`. Beide im Footer verlinkt. | Hoch |
| 38 | Kontaktinformationen im Footer | ⚠️ | `components/Footer.tsx` (Zeilen 14–24): Adresse sichtbar (Am Paradeplatz 20, 69126 Heidelberg). **Kein `tel:`-Link und kein `mailto:`-Link im Footer.** Telefon und E-Mail nur im Impressum (`tel:+49622295992400`, `mailto:info@apos.legal`) und in der Datenschutzerklärung. Schema enthält beides korrekt. | Mittel |
| 39 | Social-Profile-Links | ✅ | Footer: LinkedIn Company (`linkedin.com/company/105863455`). AuthorBox: LinkedIn persönlich (`linkedin.com/in/fatih-bektas`), Brevo-Booking-Link. sameAs-Schema: anwalt.de, LinkedIn, /team/. **Fehlend aber nicht kritisch:** Twitter/X, Xing, Google Business Profile. | Mittel |

---

## 4. Gap-Analyse nach Priorität

### P0 — Kritisch, sofort (Woche 1–2)

**4.1 TL;DR-Boxen auf allen Content-Seiten (Kriterium 19, ❌ 16 %)**
- Neue Component `<TldrBox>` erstellen (gold/cream-Hintergrund, „Das Wichtigste in Kürze")
- Auf allen Pillar-Hubs und Unterseiten einbauen (mindestens 20 Seiten)
- GEO-Impact: Direkt zitierbarer Kurztext für AI-Systeme

**4.2 BAG-Blockquotes semantisch auszeichnen (Kriterium 25, ❌ 28 %)**
- Neue Component `<BagQuote az="..." datum="..." gericht="BAG">` erstellen
- `<blockquote cite="https://www.bundesarbeitsgericht.de/...">` mit Aktenzeichen
- Auf allen Seiten einbauen, die bereits BAG-Urteile inline erwähnen (mindestens 15 Seiten)
- GEO-Impact: Zitierfähige Urteils-Referenzen für AI-Snippets

**4.3 robots.txt um fehlende AI-Crawler ergänzen (Kriterium 2, ⚠️)**
- 6 fehlende User-Agents hinzufügen: OAI-SearchBot, ClaudeBot, Applebot-Extended, Bytespider, CCBot, Meta-ExternalAgent, DuckAssistBot
- „Claude-Web" → zusätzlich „ClaudeBot" (aktueller Crawler-Name)
- Aufwand: 5 Minuten

**4.4 llms-full.txt erstellen (Kriterium 1, ⚠️)**
- Route Handler `app/llms-full.txt/route.ts` analog zu `llms.txt`
- Vollständigere Version mit allen Seiten-Zusammenfassungen, Kontaktdaten, Fachgebieten
- Aufwand: 30 Minuten

### P1 — Hoch, 2–4 Wochen

**4.5 Definitions-Boxen (Kriterium 23, ❌ 32 %)**
- Component `<DefinitionBox term="..." definition="..." />` erstellen
- Auf Content-Seiten einbauen für: Sozialauswahl, Beweislastumkehr, Betriebsratsanhörung, Betriebsbedingte Kündigung, Fristlose Kündigung, Aufhebungsvertrag, Abfindung, Sperrzeit
- Mindestens 15 Seiten betroffen

**4.6 Author-Page erstellen (Kriterium 28, ⚠️)**
- Route `/autor/fatih-bektas/page.tsx` anlegen (oder Redirect von `/autor/fatih-bektas/` → `/team/#fatih-bektas`)
- Vollständige Vita, Credential-Liste, Veröffentlichungen, Artikel-Archiv
- Person-Schema mit erweitertem sameAs-Array

**4.7 `<time datetime>` für StandAnzeige (Kriterium 18, ⚠️)**
- `components/StandAnzeige.tsx` anpassen: Visuellen Text in `<time datetime="2026-04-01">Stand: April 2026</time>` wrappen
- Auf allen Seiten automatisch wirksam

**4.8 Inline-Links im Fließtext (Kriterium 34, ⚠️)**
- Cross-Cluster-Verlinkung: Abfindungs-Artikel verlinken auf Kündigungs-Artikel und umgekehrt
- Mindestens 3 kontextuelle Inline-Links pro Artikel-Seite
- Aufwand: Content-Review für ~25 Seiten

**4.9 Telefon + E-Mail in Footer (Kriterium 38, ⚠️)**
- `components/Footer.tsx` ergänzen: `<a href="tel:+49622295992400">+49 6222 9599 2400</a>` und `<a href="mailto:info@apos.legal">info@apos.legal</a>`
- Aufwand: 10 Minuten

### P2 — Mittel, 1–3 Monate

**4.10 Vergleichstabellen ausbauen (Kriterium 21, ⚠️ 52 %)**
- Tabellen auf programmatische Jahres-Seiten erweitern (Abfindung bei verschiedenen Faktoren)
- Tabellen auf Aufhebungsvertrags-Unterseiten (Vor-/Nachteile, Fristen)

**4.11 Schritt-Anleitungen ausbauen (Kriterium 22, ⚠️ 52 %)**
- `<ol>`-Strukturen für prozedurale Seiten (Kündigung erhalten, Klage einreichen, Auskunft beantragen)
- HowTo-Schema auf weitere Content-Seiten (nicht nur Tools)

**4.12 FAQ-Blöcke auf verbleibenden Seiten (Kriterium 20, ⚠️ 84 %)**
- Glossar und Statistik-Seite mit FaqAccordion versehen

**4.13 Answer-First auf Tool-Seiten (Kriterium 16, ⚠️ 84 %)**
- Rechner-Seiten: Kurzen Intro-Absatz vor dem Tool einfügen, der die Kernfrage direkt beantwortet

### P3 — Optional / Nice-to-have

**4.14 sameAs-Array erweitern (Kriterium 29)**
- Google Business Profile URL hinzufügen
- Xing-Profil (falls vorhanden)
- BVAU-Profil URL

**4.15 Credential-Jahreszahlen prominent anzeigen (Kriterium 31)**
- „Zulassung seit 2005" und „Fachanwalt seit 2011" in AuthorBox oder auf Team-Seite sichtbar machen

**4.16 StandAnzeige auf Client-Components (Kriterium 18)**
- Workaround für `'use client'`-Seiten (Rechner): Layout-Wrapper oder Server-Component-Einbettung

---

## 5. Codebasis-spezifische Beobachtungen

### Content-Pipeline
- Content ist **nicht** in MDX-Dateien gespeichert, sondern **direkt als JSX** in `app/*/page.tsx`-Dateien. Programmatische Seiten nutzen Daten aus `lib/generated-*.ts` (AI-generiert via `scripts/`).
- **Konsequenz:** Content-Änderungen (TL;DR, BAG-Quotes, Inline-Links) erfordern Editieren der TSX-Dateien, kein CMS-Update.

### SeoGeoBase-Architektur
- Zentrale Schema-Komponente `components/SeoGeoBase.tsx` (175+ Zeilen) ist gut strukturiert und erweiterbar.
- Unterstützt: WebPage, WebApplication, CollectionPage, Article.
- **Empfehlung:** `pageType: 'LegalArticle'` als Option ergänzen (für zukünftige Nutzung).

### Revalidation-Strategie
- ISR mit wöchentlichen/monatlichen Datumsfunktionen ist intelligent gelöst.
- Cron-Job (montags 6 Uhr) triggert Revalidation über `/api/revalidate`.
- `REVALIDATE_SECRET` Env-Variable auf Vercel erforderlich.

### Node.js-Kompatibilität
- `engines: ">=18 <22"` in package.json, aber lokale Umgebung hat v24.
- Build funktioniert nur auf Vercel (Node 20), nicht lokal.
- **Risiko:** Keine lokale Build-Verifizierung möglich.

### Potenzielle Probleme
- **Duplicate Content:** Programmatische Jahres-Seiten (40+ für Abfindung, 15+ für Gekündigt, 10+ für Fristlose Kündigung) könnten bei zu ähnlichem Template-Content als Thin Content gewertet werden. StandAnzeige und ISR helfen, aber Content-Differenzierung zwischen den Seiten sollte geprüft werden.
- **Fehlende Tests:** Keine Unit- oder E2E-Tests für SEO-Komponenten erkennbar.
- **OG-Image:** Dynamisch generiert via `app/opengraph-image.tsx` — Cache-Verhalten bei ISR prüfen.

---

## 6. Empfohlene Reihenfolge für Follow-up-Implementierung

| Task | Beschreibung | Abhängigkeit | Aufwand |
|------|-------------|-------------|---------|
| 1 | `robots.txt` um 6 AI-Crawler ergänzen | — | 5 Min |
| 2 | Footer: `tel:` und `mailto:` Links hinzufügen | — | 10 Min |
| 3 | `StandAnzeige.tsx`: `<time datetime>` wrappen | — | 15 Min |
| 4 | `app/llms-full.txt/route.ts` erstellen | — | 30 Min |
| 5 | Component `<TldrBox>` erstellen | — | 30 Min |
| 6 | Component `<BagQuote>` erstellen | — | 30 Min |
| 7 | Component `<DefinitionBox>` erstellen | — | 30 Min |
| 8 | TL;DR-Boxen auf 20+ Seiten einbauen | Task 5 | 2–3 Std |
| 9 | BAG-Blockquotes auf 15+ Seiten einbauen | Task 6 | 2–3 Std |
| 10 | Definitions-Boxen auf 15+ Seiten einbauen | Task 7 | 2–3 Std |
| 11 | Author-Page `/autor/fatih-bektas/` anlegen | — | 1 Std |
| 12 | Inline-Links im Fließtext (25 Seiten) | — | 3–4 Std |
| 13 | Vergleichstabellen erweitern (10 Seiten) | — | 2 Std |
| 14 | Schritt-Anleitungen erweitern (10 Seiten) | — | 2 Std |
| 15 | FAQ auf Glossar + Statistik ergänzen | — | 30 Min |

**Empfohlene Reihenfolge:** Tasks 1–4 parallel (sofort, unabhängig) → Tasks 5–7 parallel (Component-Entwicklung) → Tasks 8–10 parallel (Content-Rollout, setzt Components voraus) → Tasks 11–15 parallel (unabhängig).

---

## 7. Offene Fragen an den Auftraggeber

1. **`<time datetime>` Format:** StandAnzeige zeigt „Stand: April 2026" — soll das Datum das tatsächliche letzte Content-Update widerspiegeln oder weiterhin den aktuellen Monat? Für `dateModified` im Schema wäre ein echtes Update-Datum besser.

2. **Author-Page:** Soll eine dedizierte `/autor/fatih-bektas/`-Route erstellt werden (mit Artikel-Archiv), oder reicht ein Anchor-Link `/team/#fatih-bektas` auf der Team-Seite?

3. **anwalt.de-Widget:** Die 68×5.0-Bewertungen werden derzeit als eigene Testimonials-Komponente dargestellt. Soll zusätzlich ein offizielles anwalt.de-Widget eingebunden werden, um die AggregateRating-Legitimität weiter zu stärken?

4. **Foto auf Author-Page:** `/public/Fatih.webp` — ist das die finale Version für die Author-Page, oder soll ein anderes/höher aufgelöstes Bild verwendet werden?

5. **BAG-Urteil-Links:** Sollen die BAG-Blockquotes auf die Bundesarbeitsgericht-Website verlinken (z.B. `cite="https://www.bundesarbeitsgericht.de/entscheidung/..."`)? Oder nur das Aktenzeichen nennen?

6. **Social-Profile-Ergänzung:** Existieren Profile auf Twitter/X, Xing, oder Google Business Profile, die in den sameAs-Array aufgenommen werden sollen?

7. **Thin-Content-Risiko:** Die 40+ programmatischen Jahres-Seiten nutzen ein Template mit variablen Daten. Wie stark differenziert sich der Fließtext zwischen z.B. „5 Jahren" und „6 Jahren"? Bei zu hoher Ähnlichkeit könnte Google diese als Thin Content einstufen.

8. **llms-full.txt Umfang:** Soll die vollständige Version alle 200+ Seiten-URLs mit Kurzbeschreibung enthalten, oder nur die Top-30 wichtigsten Seiten?

---

*Report generiert am 19. April 2026 durch Codebasis-Inspektion. Keine Code-Änderungen vorgenommen.*
