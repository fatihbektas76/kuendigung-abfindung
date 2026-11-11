# Städteseiten-Audit /arbeitsrecht-anwalt/*

Datum: 2026-11-11
Datengrundlage: `data/generated/{stadt,gemeinden,bezirke}-contents.json`

## Methode

Je Seite wurde der Content (rechte-, vertretungs-, arbeitsgerichtSection + FAQ)
in Sätze zerlegt. Jeder Satz wurde gegen alle anderen Seiten verglichen:

- **unique**: Satz kommt nur auf dieser einen Seite vor
- **semi-unique**: Satz kommt auf 2–9 Seiten vor
- **boilerplate**: Satz kommt auf 20+ Seiten vor

`unique_ratio` ist der Anteil (unique + semi-unique) am gesamten Satz-Text.

## Zahlen

| Kategorie | Seitenzahl |
|---|---|
| stadt | 40 |
| gemeinde | 54 |
| bezirk | 12 |
| **Σ** | **106** |

| Unique-Quote | Anzahl |
|---|---|
| ≥ 80 % (eigenständiger Content) | 19 |
| 50–80 % | 34 |
| 20–50 % | 48 |
| < 20 % (fast reines Boilerplate) | 5 |

## Benchmarks einzelner Seiten

| Slug | Typ | unique_ratio |
|---|---|---|
| hamburg | stadt | 97 % |
| muenchen | stadt | 95 % |
| stuttgart | stadt | 94 % |
| koeln | stadt | 94 % |
| frankfurt | stadt | 94 % |
| berlin | stadt | 94 % |
| duesseldorf | stadt | 89 % |
| **heidelberg** | **stadt** | **85 %** |
| mannheim | stadt | 86 % |
| dresden | stadt | 84 % |
| berlin-mitte | bezirk | 38 % |

Die 20 schwächsten Seiten sind alle Rhein-Neckar-Nachbargemeinden ohne eigenen
Content (16–28 % unique).

## Vorschlag — Variante A (defensiv, Empfehlung)

- Heidelberg und Berlin bleiben wie bisher Standortseiten.
- Alle 30 Großstadt-Seiten mit unique_ratio ≥ 50 % bleiben indexiert.
- Alle Seiten mit unique_ratio < 50 %:
  - `noindex,follow`
  - aus der Sitemap raus
  - weiterhin für interne Verlinkung erreichbar
- Betrifft laut aktueller Verteilung ca. 53 Seiten (vor allem Gemeinden und Berlin-Bezirke).

## Vorschlag — Variante B (offensiv, verlangt Text-Nachbesserung)

- Seiten mit unique_ratio < 50 % werden umformuliert:
  Aktuelle H1 »Fachanwalt für Arbeitsrecht für Arbeitnehmer in <Ort>«
  →
  »Mandanten aus <Ort> – bundesweite Vertretung per Video«
- Kein Hinweis auf ein Büro vor Ort, keine Standortseite-Anmutung.
- Vorteil: Keine URL stirbt, Linkjuice bleibt erhalten.
- Aufwand: 53 Seiten brauchen neuen Lede + ggf. FAQ-Variation (Texter oder
  Content-Generator anpassen).

## Was ich NICHT gemacht habe

- **Keine Live-Änderungen** an irgendeiner Städteseite (außer Heidelberg).
- **Keine Sitemap-Änderungen**, kein `noindex` gesetzt.

Die Entscheidung A/B holt sich der nächste Umsetzungs-Lauf ab.
