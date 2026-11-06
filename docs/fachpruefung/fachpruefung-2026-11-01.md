# Fachprüfung gekuendigt-abfindung.de — 2026-11-01

> **Zweck:** Fachlich kritische Aussagen auf der gesamten Website finden und zur Prüfung durch Fachanwalt für Arbeitsrecht aufbereiten.
> **Scope:** DE + EN. Alle Content-Quellen in `app/**`, `components/**`, `lib/**`, `data/**` plus die 8 generierten Content-Dateien in `lib/generated-*.ts`.
> **Grundregel:** Formulierungsvorschläge sind **Vorschläge zur Prüfung**, keine Rechtsauskunft. Alle Aktenzeichen in Schritt 4 sind **„zu verifizieren"**.
> **Branch:** `fix/gsc-indexing-cleanup` (Commit `00746bb` hat einen Teil der Audit-Punkte bereits adressiert — gleichartige Fundstellen bleiben, siehe pro Punkt).
> **Hinweis:** Keine Änderungen an Code, Komponenten oder Daten vorgenommen. Nur dieser Bericht + die zugehörige CSV wurden erstellt.

---

## Zusammenfassung

### Funde je Kategorie

| Kategorie | hoch | mittel | niedrig | Σ |
|---|---:|---:|---:|---:|
| S2.1 § 1a KSchG falsch eingeordnet | 1 | 2 | 0 | 3 |
| S2.2 Faustformel 0,5 als "Regel"/"Minimum"/"Anspruch" | 2 | 4 | 0 | 6 |
| S2.3 „Kein Anspruch" ohne vollständige Ausnahmen | 1 | 3 | 0 | 4 |
| S2.4 Klagefrist absolut / „alle Ansprüche verloren" | 2 | 0 | 0 | 2 |
| S2.5 „einziger Weg" / „fast immer Abfindung" / „meisten fristlosen scheitern" | 3 | 4 | 0 | 7 |
| S2.6 RSV „übernimmt" ohne Deckungs-Vorbehalt | 1 | 2 | 1 | 4 |
| S2.7 Streitwert 1 vs 3 BMG (§ 42 Abs. 2 GKG) | 2 | 2 | 0 | 4 |
| S2.8 ALG § 158/§ 159 SGB III — Sperrzeit pauschal | 2 | 2 | 0 | 4 |
| S2.9 Fünftelregelung + Lohnsteuerabzug ab 2025 | 0 | 2 | 1 | 3 |
| S2.10 § 622 Abs. 6 BGB | 0 | 0 | 0 | 0 (adressiert) |
| S2.11 „ab 6 Monaten" statt „mehr als 6 Monate" | 1 | 1 | 0 | 2 |
| S2.12 § 23 KSchG Schwellenwert / Altfall | 0 | 2 | 0 | 2 |
| S2.13 § 14 Abs. 2 KSchG — Auflösungsantrag | 1 | 0 | 0 | 1 |
| S2.14 KSK-Dauer widersprüchlich | 1 | 1 | 0 | 2 |
| S2.15 BUrlG § 4 vs § 5 | 0 | 0 | 0 | 0 (konsistent) |
| S2.16 § 626 BGB — Begründungspflicht/Interessenabwägung | 0 | 1 | 0 | 1 |
| S2.17 Ortsgerichte (110 Ortsseiten) | 1 | 1 | 0 | 2 |
| S3 Werbung / BRAO / UWG | 4 | 3 | 1 | 8 |
| S4 Rechtsprechung (nur Inventur, keine Risikobewertung) | — | — | — | 51 Zitate |
| S5 Weitere Risikoaussagen | 2 | 3 | 2 | 7 |

**Gesamt: 62 priorisierte Funde** (davon 20 hoch, 29 mittel, 5 niedrig, 8 formal) + **51 Aktenzeichen** zur Verifikation + **110 Ortsseiten** zur Konsistenzprüfung.

### Top-Hebel (Fundstellen, die über Templates auf viele Routen durchschlagen)

| Hebel | Textstelle | geschätzter Multiplikator |
|---|---|---|
| `lib/seo-config.ts:100–121` — SEO_CONFIG.reviews (3 fiktive Reviews) | Autor „Mandant/Mandantin", erfundener reviewBody | sitewide via JSON-LD (Startseite + alle Seiten mit `SeoGeoBase`) |
| `components/FAQ.tsx` — zentrale FAQ-Komponente | § 1a KSchG, Fünftelregelung, Schwellenwert, Fristlos-Rhetorik | alle Seiten, die `<FAQ />` einbinden |
| `app/arbeitsrecht-anwalt/[stadt]/page.tsx` — Städte-Template | „> 6 Monate + > 10 MA (Altverträge vor 2004: > 5 MA)", „5,0 / 5,0 – 69 Bewertungen" | 110 Ortsseiten (DE + EN gespiegelt) |
| `app/abfindung-jahre/[slug]/content.tsx` — Jahres-Template | Meta „bekommen Sie ca. X € Abfindung", „Regelabfindung" | 40 Jahresseiten |
| `app/gekuendigt-jahre/[slug]/content.tsx` + `app/fristlose-kuendigung-jahre/[slug]/content.tsx` + `app/abmahnung-seiten/[slug]/content.tsx` + `app/kuendigung/[situation]/content.tsx` + `app/aufhebungsvertrag/[slug]/content.tsx` | „★★★★★ 69 Bewertungen · Über 2.000 erfolgreiche Verfahren" | mehrere Dutzend Jahres-/Situations-/Muster-Seiten |

---

## Methodik & Grenzen

- Werkzeuge: Grep über `app/**`, `components/**`, `lib/**`, `data/**` auf `.ts`/`.tsx`/`.jsx`/`.md`/`.mdx` (ohne `node_modules` und `.next`).
- Für Patterns, deren Varianten vielfältig sind (z. B. Fristlos-Rhetorik), wurde pro Punkt ein Keywordset gesucht und manuell gefiltert.
- `lib/generated-*.ts` (ca. 800k Zeilen zusammen) wurde aus Zeitgründen **nicht Zeile-für-Zeile** gelesen, aber die Generatoren (`scripts/generate-*.ts`) sind erfasst und dort stichprobenartig geprüft. **Prüfung erforderlich**: ob sich dieselben Fehler in den Rohdaten (z. B. Faustformel 0,5 im Jahres-Template) reproduzieren.
- Jurisverifikation der Aktenzeichen wurde **nicht** vorgenommen (per Vorgabe).
- Datumsangaben zu Aktenzeichen stammen ausschließlich aus dem Code selbst — keine Ergänzung aus Gedächtnis.

---

## Funde — sortiert nach Hebel (viele Routen zuerst), dann Risiko

### F001 — Fiktive Reviews im JSON-LD (SEO_CONFIG.reviews) **[HOCH]**

- **Kategorie:** S3 (Werbung/BRAO/UWG)
- **Datei:Zeile:** `lib/seo-config.ts:100–121`
- **Routen:** sitewide über Startseite-Schema (`app/page.tsx:98`), EN-Startseite (`app/en/page.tsx:52`), Base-Schema (`components/SeoGeoBase.tsx:92`).
- **Aktueller Text (gekürzt):**
  - Author: `{ name: 'Mandant' }` / `{ name: 'Mandantin' }` — kein Realname.
  - Review 1: *„Herr Bektas hat meine Kündigung erfolgreich angefochten und eine deutlich höhere Abfindung verhandelt als ursprünglich angeboten. Sehr kompetent und schnell."* (datePublished: 2025-11-15, reviewRating: 5)
  - Review 2: *„Ausgezeichnete Beratung zum Aufhebungsvertrag. Die Sperrzeit konnte vermieden und die Abfindung verdoppelt werden. Klare Empfehlung."* (datePublished: 2025-09-22)
  - Review 3: *„Schnelle Reaktion trotz knapper 3-Wochen-Frist. Kündigungsschutzklage eingereicht, Vergleich mit guter Abfindung erzielt. Sehr professionell."* (datePublished: 2025-07-10)
- **Problem:** Fiktive Rezensionen im JSON-LD mit Platzhalter-Autor und ausgedachten Inhalten — Verstoßrisiko gegen § 5 Abs. 1 Nr. 1 UWG (irreführende Werbung) und § 6 BORA (sachliche Werbung). Diskrepanz zu `components/Testimonials.tsx`, wo nach Commit `9ba81d5` echte, verifizierte anwalt.de-Reviews stehen.
- **Vorschlag:** Entweder (a) `SEO_CONFIG.reviews` **leeren** und `aggregateRating` auf Grundlage echter anwalt.de-Zahlen beibehalten; oder (b) die drei realen anwalt.de-Reviews aus `components/Testimonials.tsx` mit Quellenangabe + echten (anonymisierten) Autorenangaben in dasselbe Format überführen.
- **Norm:** § 5 UWG, § 6 BORA, § 43b BRAO.

### F002 — reviewCount 69 vs. 68 (sichtbar) **[MITTEL]**

- **Kategorie:** S3
- **Datei:Zeile:** `lib/seo-config.ts:95` → `reviewCount: '69'`; `app/autor/fatih-bektas/page.tsx:279` → sichtbar „68"; `app/en/author/fatih-bektas/page.tsx:150` → „68 reviews"; mindestens **12 weitere Fundstellen** zeigen „69 Bewertungen" an.
- **Routen:** sitewide (JSON-LD vs. zwei Autorseiten vs. Dutzende Content-Seiten).
- **Problem:** Zahl im JSON-LD und sichtbarer Text widersprechen sich; Zahl ist zu einem Zeitpunkt eingefroren und driftet gegenüber dem anwalt.de-Live-Stand.
- **Vorschlag:** Entweder (a) Zahl aus einer einzigen Quelle (`SEO_CONFIG.rating`) ableiten und alle sichtbaren Stellen daran binden, (b) die Rezensionszahl ggf. tagesaktuell nachhalten (Live-Fetch oder manuelles Monthly-Update), oder (c) auf die runde Angabe „über 60" verzichten und stattdessen „siehe anwalt.de-Profil" verlinken.
- **Norm:** § 5 UWG (irreführende Mengenangabe), § 6 BORA.

### F003 — „2.000+ erfolgreiche Verfahren" / „5,0 Sterne" / „★★★★★" auf vielen Templates **[HOCH]**

- **Kategorie:** S3
- **Datei:Zeile:** `app/opengraph-image.tsx:59`, `app/layout.tsx:36`, `app/team/page.tsx:12`, `app/aufhebungsvertrag-pruefen/page.tsx:462`, `app/urlaubsabgeltung-rechner/page.tsx:729`, `app/urlaub-teilzeit-rechner/page.tsx:413`, `app/kuendigung-pruefen/page.tsx:341`, sowie in den Templates:
  - `app/gekuendigt-jahre/[slug]/content.tsx:502, 700`
  - `app/fristlose-kuendigung-jahre/[slug]/content.tsx:636`
  - `app/abmahnung-seiten/[slug]/content.tsx:241, 348, 471`
  - `app/kuendigung/[situation]/content.tsx:184, 291, 430`
  - `app/aufhebungsvertrag/[slug]/content.tsx:165, 272, 426`
  - `app/abfindung-jahre/[slug]/content.tsx:787`
  - `app/arbeitsrecht-anwalt/[stadt]/page.tsx:445`
- **Routen:** 110 Ortsseiten + 40 Jahresseiten + 15 Situationsseiten + 6 Muster-Seiten + mehrere Werkzeug-Seiten.
- **Aktueller Text (Beispiele):** „Über 2.000 erfolgreiche Verfahren, 5,0 Sterne auf anwalt.de", „★★★★★ 69 Bewertungen · Über 2.000 erfolgreiche Verfahren · Bundesweit".
- **Problem:** Zahl „2.000+" ist eine Erfolgskennzahl ohne nachprüfbare Grundlage (nicht aus anwalt.de, nicht aus Gerichtsstatistik). „5,0 Sterne" als Pauschalaussage ohne Zeitraum und Quelle. Nebenbei: „5,0 / 5,0" doppelt (Autorseite, Stadt-Factbox).
- **Vorschlag:** Entweder (a) Zahl entfernen und durch „langjährige Erfahrung" ersetzen oder (b) exakte, belegbare Angabe („seit [Jahr] als Fachanwalt für Arbeitsrecht tätig; verifizierte Rezensionen: anwalt.de-Profil").
- **Norm:** § 43b BRAO, § 6 BORA, § 5 UWG.

### F004 — „Fachanwälte" im Plural (Teamseite) **[HOCH]**

- **Kategorie:** S3
- **Datei:Zeile:** `app/team/page.tsx:10, 12, 17, 18, 23, 24, 158, 174` — mehrfach: `„Fachanwälte Arbeitsrecht"`, `„Spezialisierte Fachanwälte für Arbeitsrecht ..."`.
- **Routen:** `/team` + Meta-Daten/OG + Schema.
- **Problem:** Fachanwaltstitel ist titelgeschützt (§ 43c BRAO + FAO). Nach `CLAUDE.md` führt nur Fatih Bektas den Titel „Fachanwalt für Arbeitsrecht"; die weiteren Teammitglieder sind nicht als Fachanwälte Arbeitsrecht ausgewiesen. „Fachanwälte für Arbeitsrecht" im Plural ist deshalb hochgradig riskant (§ 7 BORA, § 43b BRAO, § 5 UWG).
- **Vorschlag:** Titel-Angaben pro Person überprüfen; Plural nur verwenden, wenn mindestens zwei Teammitglieder den Titel führen. Alternativ: „Anwälte mit Schwerpunkt Arbeitsrecht" / „unser Arbeitsrechts-Team unter Leitung von Fachanwalt Fatih Bektas".
- **Norm:** § 7 BORA, § 43c BRAO, FAO, § 5 UWG.

### F005 — „100% kostenlos & unverbindlich" **[MITTEL]**

- **Kategorie:** S3
- **Datei:Zeile:** `app/tools/page.tsx:194, 348`.
- **Problem:** Absolute Zusage „100% kostenlos" ist für Tools korrekt — aber „unverbindlich" im Kontext einer kostenlosen Ersteinschätzung sollte durch Hinweis auf § 34 RVG / Vergütungsvereinbarung bei Mandatsannahme flankiert sein.
- **Vorschlag:** „100 %" streichen; „kostenlose Ersteinschätzung" + Vorbehalt „im Falle einer späteren Mandatsannahme gelten die gesetzlichen RVG-Gebühren oder eine individuelle Vergütungsvereinbarung" ergänzen.
- **Norm:** § 34 RVG, § 5 UWG.

### F006 — Streitwert 1 BMG vs. 3 BMG (§ 42 Abs. 2 GKG) **[HOCH]**

- **Kategorie:** S2.7
- **Datei:Zeile:** Widerspruch zwischen:
  - `app/page.tsx:219` **FAQ-Antwort auf Startseite:** „Die Anwaltskosten richten sich nach dem Streitwert (1 Bruttomonatsgehalt)." (sitewide via JSON-LD + sichtbar)
  - `app/kuendigungsschutzklage/page.tsx:156` **Prozessschritt:** „Streitwert wird typischerweise mit einem Bruttomonatsgehalt angesetzt."
  - `lib/en-faqs.ts:49` **EN:** „Legal fees depend on the amount in dispute (typically one gross monthly salary)."

  gegenüber:
  - `app/kuendigungsschutzklage/page.tsx:49, 347`: Streitwert = 3 Bruttomonatsgehälter.
  - `app/rvg-rechner/page.jsx:977, 980, 1024, 1027`: „in der Regel drei Bruttomonatsgehältern (§ 42 Abs. 2 GKG)".
  - `app/en/legal-fees-calculator/page.tsx:86, 110`: „3 × your gross monthly salary (§ 42 (3) GKG)".
  - `app/en/unfair-dismissal-claim/page.tsx:49`: „capped at three gross monthly salaries (§ 42 (3) GKG)".
- **Problem:** Innerhalb der Kündigungsschutzklage gilt nach § 42 Abs. 2 GKG der **Vierteljahresverdienst** als Höchstwert — in der Praxis also drei Bruttomonatsgehälter. „1 BMG" auf der Startseite und in der KSK-Prozessbeschreibung ist falsch bzw. mindestens stark irreführend.
- **Vorschlag:** Alle „1 BMG"-Angaben auf „bis zu einem Vierteljahresverdienst (§ 42 Abs. 2 GKG), in der Regel drei Bruttomonatsgehälter" korrigieren; EN entsprechend `one gross monthly salary` → `up to a quarterly salary (typically three gross monthly salaries, § 42 (2) GKG)`.
- **Norm:** § 42 Abs. 2 GKG (**Prüfung erforderlich:** ob § 42 Abs. 2 oder Abs. 3 die zutreffende Fundstelle ist — Code zitiert beides uneinheitlich).

### F007 — § 1a KSchG als „einvernehmliche Lösung" (abfindungstabelle) **[MITTEL]**

- **Kategorie:** S2.1
- **Datei:Zeile:** `app/abfindungstabelle/page.tsx:166, 212, 215, 346`.
- **Aktueller Text:** *„Faustformel: 0,5 Bruttomonatsgehälter × Beschäftigungsjahre = Regelabfindung (§ 1a KSchG)."* und *„Gesetzliche Regelabfindung bei betriebsbedingter Kündigung mit Klageverzicht."*
- **Problem:** „Regelabfindung" suggeriert allgemeinen Mindestanspruch. § 1a KSchG regelt tatsächlich nur das **Angebot des Arbeitgebers im Kündigungsschreiben** bei betriebsbedingter Kündigung; Anspruch entsteht durch Verstreichenlassen der Klagefrist. Zudem ist „gesetzliche Regelabfindung" so nicht korrekt — § 1a KSchG ist Angebot, keine Anspruchsgrundlage.
- **Vorschlag:** „Regelabfindung" durch „Faustformel-Betrag" ersetzen; den Absatz um klarstellen: *„Der Anspruch nach § 1a KSchG entsteht nur, wenn der Arbeitgeber im Kündigungsschreiben ausdrücklich das Angebot nach § 1a KSchG unterbreitet und der Arbeitnehmer die Klagefrist verstreichen lässt."*
- **Norm:** § 1a KSchG.

### F008 — „Minimum/Mindestabfindung nach § 1a KSchG" **[HOCH]**

- **Kategorie:** S2.2
- **Datei:Zeile:** `app/abfindungstabelle/page.tsx:57` *(„0,5 ist die gesetzliche Mindestabfindung nach § 1a KSchG")*; `app/abfindungsrechner/page.tsx:121` *(„Minimum (Faktor 0,5), Regelsatz (Faktor 0,5) und Maximum (Faktor 1,5)")*.
- **Problem:** 0,5 BMG/Jahr ist **kein Mindestanspruch** — es ist die Höhe der Abfindung, die der Arbeitgeber nach § 1a KSchG anbieten darf, wenn er diesen Weg wählt. Ohne Angebot gibt es weder Minimum noch Anspruch.
- **Vorschlag:** „Minimum" / „Mindestabfindung" durch „Höhe der Abfindung nach § 1a KSchG" ersetzen; „Regelsatz (Faktor 0,5)" durch „Faustformel-Wert" ersetzen.
- **Norm:** § 1a Abs. 2 KSchG.

### F009 — Meta-Description „bekommen Sie ca. X € Abfindung" (Jahres-Template) **[HOCH]**

- **Kategorie:** S2.2
- **Datei:Zeile:** `app/abfindung-jahre/[slug]/page.tsx:31`.
- **Aktueller Text:** *„Nach ${yl} Betriebszugehörigkeit bekommen Sie ca. ${eurFaustformel} € Abfindung (Faustformel bei 4.000 € Gehalt). Bei guter Verhandlung deutlich mehr …"*.
- **Routen:** 40 Jahresseiten (`/abfindung-nach-N-jahr(en)-betriebszugehoerigkeit/`).
- **Problem:** „bekommen Sie" ist ein Erfolgs- und Zusageversprechen. Verstoßrisiko § 5 UWG. Faustformel ist Erfahrungswert — kein Zahlungsanspruch.
- **Vorschlag:** „bekommen Sie" → „liegt der Faustformel-Richtwert bei"; „deutlich mehr" → „kann im Einzelfall höher ausfallen".
- **Norm:** § 5 UWG; § 1a KSchG.

### F010 — „fast immer eine Abfindung" / „Klage lohnt sich fast immer" **[HOCH]**

- **Kategorie:** S2.5
- **Datei:Zeile:**
  - `app/kuendigung/page.tsx:173`: *„Kündigungsschutzklage ist Ihr stärkstes Werkzeug: Selbst bei wirksamer Kündigung führt die Klage in der Praxis fast immer zu einer Abfindung."*
  - `app/betriebsbedingte-kuendigung/page.tsx:61, 166`: *„In der Praxis wird eine Abfindung fast immer gezahlt … Die Klage lohnt sich fast immer."*
  - `app/kuendigungsschutzklage/page.tsx:61, 392`: *„ohne Klage gibt es in der Regel keine Abfindung."*
  - `app/en/unfair-dismissal-claim/page.tsx:53`: *„Severance is almost always the result of a settlement …"*.
- **Problem:** Verallgemeinernde Erfolgsversprechen. „Fast immer" ist statistisch nicht belastbar; verstößt gegen § 43b BRAO (Werbung mit Erfolgsaussichten), § 5 UWG.
- **Vorschlag:** „fast immer" → „in vielen Fällen" / „häufig"; Satz um Grenze ergänzen: *„Erfolg und Höhe hängen von der konkreten Beweislage, dem Umfang des Kündigungsschutzes und der Verhandlungsposition ab und können nicht garantiert werden."*
- **Norm:** § 43b BRAO, § 5 UWG.

### F011 — „Die meisten fristlosen Kündigungen scheitern" **[HOCH]**

- **Kategorie:** S2.5
- **Datei:Zeile:**
  - `app/page.tsx:195` (FAQ)
  - `components/FAQ.tsx:20`
  - `components/Disputes.tsx:48`
  - `lib/en-faqs.ts:34`
  - `app/en/page.tsx:183`
  - `app/en/summary-dismissal/page.tsx:100`
- **Problem:** Pauschaleaussage über Erfolgsaussichten einer bestimmten Verfahrensart. Keine belastbare Statistik dafür vorhanden; „strict § 626 BGB test" ist nicht gleichbedeutend mit „die meisten scheitern".
- **Vorschlag:** „Die meisten scheitern vor dem Arbeitsgericht" → „Die Hürden für Arbeitgeber sind sehr hoch; der Erfolg hängt stark vom Einzelfall ab." Die EN-Formulierung entsprechend abmildern.
- **Norm:** § 43b BRAO, § 5 UWG.

### F012 — Klagefrist „absolut" + „alle Ansprüche verlieren" **[HOCH]**

- **Kategorie:** S2.4
- **Datei:Zeile:**
  - `app/fristlose-kuendigung-jahre/[slug]/content.tsx:107`: *„Klagefrist Arbeitnehmer | 3 Wochen | Ab Zugang (§ 4 KSchG) — auch bei fristloser Kündigung absolut"*.
  - `app/kuendigung/page.tsx:172`: *„3-Wochen-Klagefrist ab Zugang der Kündigung (§ 4 KSchG) — verpassen Sie diese Frist, verlieren Sie alle Ansprüche."*
- **Routen:** 40 Fristlos-Jahresseiten + `/kuendigung`.
- **Problem:** Verkürzt. Die Rechtsfolge der Versäumung ist § 7 KSchG (Wirksamkeitsfiktion); nicht alle Ansprüche sind damit untergegangen (z. B. Entgelt-, Urlaubsabgeltungsansprüche, Lohn-/Zeugnisansprüche bleiben unberührt). Zudem § 5 KSchG (nachträgliche Zulassung) bleibt möglich.
- **Vorschlag:** „alle Ansprüche" → „die Möglichkeit, die Unwirksamkeit der Kündigung geltend zu machen"; „absolut" entfernen oder durch „ohne Ausnahme — eine nachträgliche Klagezulassung nach § 5 KSchG ist nur in engen Ausnahmefällen möglich" ersetzen.
- **Norm:** §§ 4, 5, 7 KSchG.

### F013 — „Grundsätzlich ja" zu Sperrzeit bei jedem Aufhebungsvertrag **[HOCH]**

- **Kategorie:** S2.8
- **Datei:Zeile:**
  - `app/aufhebungsvertrag-pruefen/page.tsx:143–144`: *„Droht immer eine Sperrzeit beim Arbeitslosengeld? — Grundsätzlich ja. Bei Aufhebungsverträgen verhängt die Agentur für Arbeit regelmäßig eine 12-wöchige Sperrzeit (§ 159 SGB III) …"*
  - `app/aufhebungsvertrag-pruefen/page.tsx:548`: *„Bei einer Abfindung über 0,5 Monatsgehälter pro Beschäftigungsjahr droht eine Sperre bzgl. des Arbeitslosengeldes von der Arbeitsagentur."*
- **Problem:** Erste Aussage ist zu absolut: Nach den Fachlichen Weisungen der BA zu § 159 SGB III wird bei einem Aufhebungsvertrag ein wichtiger Grund (= **keine** Sperrzeit) **vermutet**, wenn die Abfindung zwischen 0,25 und 0,5 Bruttomonatsgehältern pro Beschäftigungsjahr liegt UND bestimmte weitere Voraussetzungen (betriebsbedingte Kündigung drohte, Kündigungsfrist eingehalten) erfüllt sind. Die zweite Aussage dreht die Richtung sogar um („> 0,5 BMG/Jahr → Sperre") — richtig ist: 0,25–0,5 ist die „sichere Zone", außerhalb muss der wichtige Grund konkret dargelegt werden.
- **Vorschlag:** Komplett neu formulieren; Fachliche Weisungen BA zu § 159 SGB III, Rz 159.1.2.1.1 zitieren. Sperrzeit-Risiko als **Prüfungsfrage mit Voraussetzungen** darstellen, nicht als Regel.
- **Norm:** § 159 SGB III + Fachliche Weisungen BA (Prüfung erforderlich — genaue aktuelle Rz).

### F014 — § 158 SGB III (Ruhen) nicht sauber von Sperrzeit abgegrenzt **[MITTEL]**

- **Kategorie:** S2.8
- **Datei:Zeile:** `app/abfindungstabelle/page.tsx:61` erwähnt § 158 kurz; `app/abfindungstabelle/page.tsx:515–538` erklärt es ausführlicher, aber mischt Ruhen (§ 158) und Sperrzeit (§ 159) in benachbarten Absätzen.
- **Problem:** Zwei verschiedene Rechtsfolgen (Ruhen vs. Sperre) werden nicht klar getrennt; Leser kann die Voraussetzungen (Einhaltung ordentliche Kündigungsfrist, Mitwirkung an Beendigung) verwechseln.
- **Vorschlag:** Zwei getrennte Textblöcke: „Ruhen des ALG (§ 158 SGB III)" vs. „Sperrzeit (§ 159 SGB III)". Pro Block: Voraussetzungen, Dauer, Vermeidung.
- **Norm:** §§ 158, 159 SGB III.

### F015 — „Rechtsschutz … übernimmt in der Regel" ohne vollständige Qualifikation **[MITTEL]**

- **Kategorie:** S2.6
- **Datei:Zeile:**
  - `app/abfindungsrechner/page.tsx:401` (Fließtext, keine Qualifikation sichtbar).
  - `app/en/check-dismissal/page.tsx:75`: *„typically fully covered"* — gleicher Mangel.
- **Problem:** Commit `00746bb` hat sechs Fundstellen durch den Zusatz „vorbehaltlich Wartezeit, Deckungszusage und etwaiger Selbstbeteiligung" harmonisiert; die genannten beiden Fundstellen sind noch nicht angeglichen.
- **Vorschlag:** Zusatz wie in `app/kuendigung/page.tsx:209` und `app/page.tsx:219` übernehmen; EN mit „subject to waiting period, cover confirmation and any deductible".
- **Norm:** § 5 UWG.

### F016 — § 23 KSchG Schwellenwert ohne Altfall in Städte-Factbox **[MITTEL]**

- **Kategorie:** S2.12
- **Datei:Zeile:** `app/arbeitsrecht-anwalt/[stadt]/page.tsx:260`: *„Kündigungsschutz | Ab 6 Monate | > 6 Monate + > 10 MA (Altverträge vor 2004: > 5 MA)".*
- **Routen:** 110 Ortsseiten (DE).
- **Problem:** „Ab 6 Monate" statt „nach mehr als 6 Monaten"; Altfall ist zwar erwähnt, aber Teilzeit-Gewichtung nach § 23 Abs. 1 Satz 3 KSchG fehlt. Zudem widersprüchlich zu Startseite-FAQ (`app/page.tsx:203`), wo Altfall sauber erklärt ist.
- **Vorschlag:** Factbox-Zeile: *„Nach mehr als 6 Monaten; > 10 Vollzeitäquivalenten (§ 23 Abs. 1 KSchG). Für Arbeitsverhältnisse vor 01.01.2004: > 5 Arbeitnehmer. Teilzeit zählt anteilig."*
- **Norm:** § 23 Abs. 1 KSchG, § 1 Abs. 1 KSchG.

### F017 — „Ab 6 Monate" vs. „mehr als 6 Monate" (gekuendigt-jahre Template) **[MITTEL]**

- **Kategorie:** S2.11
- **Datei:Zeile:** `app/gekuendigt-jahre/[slug]/content.tsx:102`: *„Das KSchG gilt erst ab 6 Monaten Betriebszugehörigkeit und mehr als 10 Mitarbeitern (§ 23 KSchG)."*
- **Routen:** 40 Gekündigt-Jahresseiten.
- **Problem:** § 1 Abs. 1 KSchG verlangt eine Betriebszugehörigkeit von **mehr als sechs Monaten** (Wartezeit). „Ab 6 Monaten" greift zu früh.
- **Vorschlag:** „ab 6 Monaten" → „nach mehr als 6 Monaten".
- **Norm:** § 1 Abs. 1 KSchG.

### F018 — § 14 Abs. 2 KSchG: Auflösungsantrag ohne Begründung fehlt **[HOCH]**

- **Kategorie:** S2.13
- **Datei:Zeile:**
  - `components/FAQ.tsx:24` (sitewide FAQ): *„Ausgenommen sind u. a. Geschäftsführer und leitende Angestellte mit besonderem Status."*
  - `app/page.tsx:203` (Startseite): identische Formulierung.
- **Problem:** Für leitende Angestellte iSv § 14 Abs. 2 KSchG gilt die Besonderheit, dass der Arbeitgeber einen **Auflösungsantrag ohne Begründung** stellen kann. Diese Besonderheit fehlt sitewide bis auf die eine (schon in `00746bb` ergänzte) Lebenssituation.
- **Vorschlag:** Satz ergänzen: *„Für leitende Angestellte (§ 14 Abs. 2 KSchG) gilt die Besonderheit, dass der Arbeitgeber im Kündigungsschutzprozess einen Auflösungsantrag ohne Begründung stellen kann — gegen Abfindung nach §§ 9, 10 KSchG."*
- **Norm:** § 14 Abs. 2 KSchG, §§ 9, 10 KSchG.

### F019 — KSK-Dauer: Chatbot sagt 3–6 Monate, Hauptseite 9–12 Monate **[HOCH]**

- **Kategorie:** S2.14
- **Datei:Zeile:**
  - `lib/chatbot/keyword-responses.ts:115`: *„Eine Kuendigungsschutzklage dauert in der ersten Instanz meist 3 bis 6 Monate."*
  - `app/kuendigungsschutzklage/page.tsx:53, 174, 300, 543`: 9–12 Monate.
  - `app/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/page.tsx:168, 286`: „~3 Mon." Ø.
- **Problem:** Widerspruch zwischen Chatbot und Hauptseite nach dem Fix in `00746bb`. Statistik-Ratgeber-Seite nennt zudem einen Ø-Wert ohne Trennung Gütetermin / Kammertermin.
- **Vorschlag:** Chatbot-Antwort auf „Gütetermin in 2–4 Wochen; Gesamtdauer bis zur Entscheidung meist 9–12 Monate" angleichen. Statistikseite kurz ergänzen: Ø ~3 Monate wird stark von früh endenden Vergleichen beeinflusst.
- **Norm:** —

### F020 — „ca. 80 % Vergleichsquote" **[MITTEL]**

- **Kategorie:** S5 (eigene Funde)
- **Datei:Zeile:**
  - `app/kuendigungsschutzklage/page.tsx:49, 53` (FAQ)
  - `app/gekuendigt-jahre/[slug]/content.tsx:184` (sitewide DefinitionBox)
- **Problem:** Konkrete Prozentzahl ohne Quelle (Destatis-Zahlen variieren über Jahre). Risiko § 5 UWG, wenn als Erfolgsaussicht gelesen.
- **Vorschlag:** „ca. 80 %" durch „ein großer Teil" ersetzen oder mit Quelle („Statistisches Bundesamt, Arbeitsgerichtsbarkeit 2024") und Jahr belegen.
- **Norm:** § 5 UWG.

### F021 — Fristlose Kündigung: § 626 Abs. 2 S. 3 BGB (Begründung auf Verlangen) fehlt **[MITTEL]**

- **Kategorie:** S2.16
- **Datei:Zeile:** Suchlauf ergibt keinen Treffer für § 626 Abs. 2 S. 3 BGB; die sitewide FAQ (`components/FAQ.tsx:20`, `app/page.tsx:195`) erwähnt nur die 2-Wochen-Frist nach Kenntnis.
- **Problem:** Verlangt der Arbeitnehmer schriftlich die Mitteilung des Kündigungsgrunds, hat der Arbeitgeber diesen unverzüglich schriftlich mitzuteilen (§ 626 Abs. 2 S. 3 BGB). Diese Information fehlt sitewide — für Mandanten eines der wichtigsten ersten Schritte.
- **Vorschlag:** Entweder zentral in `components/FAQ.tsx:20` und `app/fristlose-kuendigung/page.tsx` als eigener Punkt ergänzen: *„Der Arbeitgeber muss Ihnen auf schriftliches Verlangen den Kündigungsgrund unverzüglich schriftlich mitteilen (§ 626 Abs. 2 S. 3 BGB)."*
- **Norm:** § 626 Abs. 2 S. 3 BGB.

### F022 — § 23 KSchG „> 10 Vollzeit" ohne Normreferenz zur Teilzeitgewichtung **[MITTEL]**

- **Kategorie:** S2.12
- **Datei:Zeile:**
  - `app/tools/page.tsx:149, 153`: *„mehr als 10 Vollzeit-Mitarbeitern"*, *„mehr als 10 Vollzeitäquivalenten (FTE)"*.
  - `app/schwellenwert-rechner/page.tsx:14`: Teilzeit-Gewichtung + Faktoren beschrieben.
- **Problem:** Nicht alle Fundstellen nennen die Teilzeit-Gewichtung. Die Faktoren 0,5 / 0,75 / 1,0 stammen aus § 23 Abs. 1 Satz 4 KSchG — diese Normreferenz fehlt im Rechner-FAQ (`page.tsx:14`).
- **Vorschlag:** Normreferenz § 23 Abs. 1 S. 4 KSchG in den Antworten ergänzen; „Vollzeit-Mitarbeiter" durch „Vollzeitäquivalenten (gewichtet nach § 23 Abs. 1 S. 4 KSchG)" ersetzen.
- **Norm:** § 23 Abs. 1 S. 3–4 KSchG.

### F023 — Fünftelregelung: „deutlich senken" ohne Fallgrenzen **[MITTEL]**

- **Kategorie:** S2.9
- **Datei:Zeile:**
  - `app/abfindungstabelle/page.tsx:65`: *„die Fünftelregelung (§ 34 EStG) kann die Steuerlast erheblich senken"*.
  - `app/abfindungsrechner/page.tsx:19, 270`: *„deutlich gesenkt werden"*, *„Mit Fünftelregelung … rechnen"*.
  - `app/abfindung-jahre/[slug]/content.tsx:382–405, 495`: Ersparnis groß beziffert, Hinweis Lohnsteuerabzug seit 2025 vorhanden.
- **Problem:** Steuerersparnis durch Fünftelregelung hängt stark von Höhe der Abfindung und laufendem Einkommen ab; „deutlich" ist Pauschale. Hinweis „seit 2025 nur noch über die Steuererklärung" ist auf einigen Fundstellen vorhanden, auf anderen fehlt er.
- **Vorschlag:** „deutlich" → „kann im Einzelfall erheblich sein — die konkrete Ersparnis hängt vom individuellen Steuersatz und übrigen Einkommen ab". Hinweis zum Veranlagungszeitraum (ab 2025) sitewide einheitlich ergänzen.
- **Norm:** § 34 EStG, § 39b Abs. 3 EStG a. F. (gestrichen durch Wachstumschancengesetz).

### F024 — Doppel-Zitate 6 AZR 75/18 vs. 6 AZR 333/21 **[NIEDRIG]**

- **Kategorie:** S4
- **Datei:Zeile:**
  - `app/aufhebungsvertrag-pruefen/page.tsx:148`: beide gemeinsam zitiert.
  - `app/aufhebungsvertrag/page.tsx:58`: nur 6 AZR 75/18.
  - `app/en/check-dismissal/page.tsx:67, 121`, `app/en/check-termination-agreement/page.tsx:37, 68`, `app/en/termination-agreement/page.tsx:49, 118, 160`: nur 6 AZR 333/21.
- **Problem:** 6 AZR 75/18 (BAG 07.02.2019) ist das **Grundsatzurteil** zum „Gebot fairen Verhandelns"; 6 AZR 333/21 (BAG 24.02.2022) führt die Linie fort und zieht die Grenzen enger. Entweder nur das Grundsatzurteil oder beide zitieren — nicht in EN nur die Fortführung ohne das Grundsatzurteil.
- **Vorschlag:** Sitewide beide zitieren, z. B.: „BAG v. 07.02.2019 – 6 AZR 75/18, bestätigt durch BAG v. 24.02.2022 – 6 AZR 333/21". (**Prüfung erforderlich** zu Datum, Senat, exakter Fundstelle.)
- **Norm:** —

### F025 — Slug-Fehler `waghaeuseldorf` (statt `waghaeusel`) **[NIEDRIG]**

- **Kategorie:** S5 (eigener Fund)
- **Datei:Zeile:** `data/gemeinden.ts:235`.
- **Problem:** Slug suggeriert fiktiven Ortsnamen; URL `/arbeitsrecht-anwalt/waghaeuseldorf/` passt nicht zum Städtenamen „Waghäusel" im `name`-Feld.
- **Vorschlag:** `slug: "waghaeusel"` + 301-Redirect vom alten Slug.
- **Norm:** —

### F026 — Heidelberg: ArbG-Bezeichnung „Nebenstelle" vs. amtlich „Kammern" **[NIEDRIG]**

- **Kategorie:** S2.17
- **Datei:Zeile:** `data/staedte.ts:436`: *„Arbeitsgericht Mannheim (Nebenstelle Heidelberg)"*.
- **Problem:** Amtliche Bezeichnung nach § 1 Abs. 2 ArbGG / Gerichtsorganisation BW ist **„Arbeitsgericht Mannheim — Kammern Heidelberg"** (ständige auswärtige Kammern), nicht „Nebenstelle". Die Adresse Vangerowstraße 20, 69115 Heidelberg ist korrekt. Kein „Arbeitsgericht Heidelberg" gefunden — gut.
- **Vorschlag:** Umbenennung auf „Arbeitsgericht Mannheim — Kammern Heidelberg".
- **Norm:** § 1 Abs. 2 ArbGG, GerOrgG BW.

---

## Ortsseiten-Tabelle (110 Städte)

Legende: alle Datensätze stammen aus `data/staedte.ts` (42 Städte) + `data/gemeinden.ts` (55 Gemeinden) + `data/bezirke.ts` (13 Berlin-Bezirke). Konsistenz = ob Title/Meta/Factbox/Fließtext der 1 Routen-Datei (`app/arbeitsrecht-anwalt/[stadt]/page.tsx`) alle `ort.arbeitsgericht` und `ort.arbeitsgerichtAdresse` zieht — Antwort: **ja**, keine Hard-Codings pro Stadt. Konsistenzprobleme reduzieren sich daher auf die Datenzeilen in den drei Datendateien. Anmerkungen in der letzten Spalte markieren alle **nicht trivialen** Beobachtungen.

| Slug | Stadt | Arbeitsgericht | Adresse | Anmerkung |
|---|---|---|---|---|
| berlin | Berlin | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-mitte | Berlin-Mitte | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-friedrichshain-kreuzberg | Berlin Friedrichshain-Kreuzberg | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-pankow | Berlin-Pankow | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-charlottenburg-wilmersdorf | Berlin Charlottenburg-Wilmersdorf | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-spandau | Berlin-Spandau | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-steglitz-zehlendorf | Berlin Steglitz-Zehlendorf | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-tempelhof-schoeneberg | Berlin Tempelhof-Schöneberg | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-neukoelln | Berlin-Neukölln | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-treptow-koepenick | Berlin Treptow-Köpenick | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-marzahn-hellersdorf | Berlin Marzahn-Hellersdorf | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-lichtenberg | Berlin-Lichtenberg | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| berlin-reinickendorf | Berlin-Reinickendorf | Arbeitsgericht Berlin | Magdeburger Platz 1, 10785 Berlin | — |
| hamburg | Hamburg | Arbeitsgericht Hamburg | Osterbekstraße 96, 22083 Hamburg | Prüfung erforderlich: Postanschrift vs. Hausanschrift |
| muenchen | München | Arbeitsgericht München | Winzererstraße 106, 80797 München | — |
| koeln | Köln | Arbeitsgericht Köln | Blumenthalstraße 33, 50670 Köln | — |
| frankfurt | Frankfurt am Main | Arbeitsgericht Frankfurt am Main | Gutleutstraße 130, 60327 Frankfurt am Main | — |
| stuttgart | Stuttgart | Arbeitsgericht Stuttgart | Johannesstraße 86, 70176 Stuttgart | — |
| duesseldorf | Düsseldorf | Arbeitsgericht Düsseldorf | Ludwig-Erhard-Allee 21, 40227 Düsseldorf | — |
| leipzig | Leipzig | Arbeitsgericht Leipzig | Erich-Weinert-Straße 18, 04105 Leipzig | — |
| dortmund | Dortmund | Arbeitsgericht Dortmund | Ruhrallee 3, 44139 Dortmund | — |
| essen | Essen | Arbeitsgericht Essen | Zweigertstraße 52, 45130 Essen | — |
| bremen | Bremen | Arbeitsgericht Bremen | Am Wall 198, 28195 Bremen | — |
| dresden | Dresden | Arbeitsgericht Dresden | Hans-Oster-Straße 4, 01099 Dresden | — |
| hannover | Hannover | Arbeitsgericht Hannover | Leonhardtstraße 15, 30175 Hannover | — |
| nuernberg | Nürnberg | Arbeitsgericht Nürnberg | Roonstraße 20, 90429 Nürnberg | — |
| duisburg | Duisburg | Arbeitsgericht Duisburg | Mülheimer Straße 54, 47057 Duisburg | — |
| bochum | Bochum | Arbeitsgericht Bochum | Josef-Neuberger-Straße 1, 44787 Bochum | — |
| wuppertal | Wuppertal | Arbeitsgericht Wuppertal | Eiland 2, 42103 Wuppertal | — |
| bielefeld | Bielefeld | Arbeitsgericht Bielefeld | Gerichtstraße 6, 33602 Bielefeld | — |
| bonn | Bonn | Arbeitsgericht Bonn | Kreuzbergweg 5, 53115 Bonn | — |
| muenster | Münster | Arbeitsgericht Münster | Alter Steinweg 45, 48143 Münster | — |
| karlsruhe | Karlsruhe | Arbeitsgericht Karlsruhe | Ritterstraße 12, 76133 Karlsruhe | — |
| mannheim | Mannheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| augsburg | Augsburg | Arbeitsgericht Augsburg | Frohsinnstraße 2, 86150 Augsburg | — |
| wiesbaden | Wiesbaden | Arbeitsgericht Wiesbaden | Mainzer Straße 124, 65189 Wiesbaden | — |
| gelsenkirchen | Gelsenkirchen | Arbeitsgericht Gelsenkirchen | Bochumer Straße 79, 45886 Gelsenkirchen | — |
| moenchengladbach | Mönchengladbach | Arbeitsgericht Mönchengladbach | Hohenzollernstraße 155, 41061 Mönchengladbach | — |
| aachen | Aachen | Arbeitsgericht Aachen | Adalbertsteinweg 92, 52070 Aachen | — |
| braunschweig | Braunschweig | Arbeitsgericht Braunschweig | Grünewaldstraße 11A, 38104 Braunschweig | — |
| kiel | Kiel | Arbeitsgericht Kiel | Deliusstraße 22, 24114 Kiel | — |
| halle | Halle | Arbeitsgericht Halle | Thüringer Straße 16, 06112 Halle (Saale) | — |
| magdeburg | Magdeburg | Arbeitsgericht Magdeburg | Breiter Weg 203-206, 39104 Magdeburg | — |
| freiburg | Freiburg | Arbeitsgericht Freiburg | Habsburgerstraße 103, 79104 Freiburg im Breisgau | — |
| krefeld | Krefeld | Arbeitsgericht Krefeld | Preußenring 49, 47798 Krefeld | — |
| mainz | Mainz | Arbeitsgericht Mainz | Ernst-Ludwig-Straße 6-8, 55116 Mainz | — |
| luebeck | Lübeck | Arbeitsgericht Lübeck | Neustraße 2a, 23568 Lübeck | — |
| erfurt | Erfurt | Arbeitsgericht Erfurt | Rudolfstraße 46, 99092 Erfurt | — |
| oberhausen | Oberhausen | Arbeitsgericht Oberhausen | Friedrich-List-Straße 18, 46045 Oberhausen | — |
| rostock | Rostock | Arbeitsgericht Rostock | August-Bebel-Straße 15-20, 18055 Rostock | — |
| **heidelberg** | Heidelberg | **Arbeitsgericht Mannheim (Nebenstelle Heidelberg)** | Vangerowstraße 20, 69115 Heidelberg | **F026** — amtlich „— Kammern Heidelberg" |
| darmstadt | Darmstadt | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |
| schwetzingen | Schwetzingen | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| ketsch | Ketsch | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| bruehl-rhein-neckar | Brühl (Rhein-Neckar) | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| plankstadt | Plankstadt | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| oftersheim | Oftersheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| hockenheim | Hockenheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| reilingen | Reilingen | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| st-leon-rot | St. Leon-Rot | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| walldorf | Walldorf | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| wiesloch | Wiesloch | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| leimen | Leimen | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| nussloch | Nußloch | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| sandhausen | Sandhausen | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| eppelheim | Eppelheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| heddesheim | Heddesheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| edingen-neckarhausen | Edingen-Neckarhausen | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| ladenburg | Ladenburg | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| schriesheim | Schriesheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| dossenheim | Dossenheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| weinheim | Weinheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| hirschberg-bergstrasse | Hirschberg (Bergstraße) | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| neckargemuend | Neckargemünd | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| bammental | Bammental | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| meckesheim | Meckesheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| sinsheim | Sinsheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| **waghaeuseldorf** | Waghäusel | Arbeitsgericht Karlsruhe | Ritterstraße 12, 76133 Karlsruhe | **F025** — Slug falsch |
| altlussheim | Altlußheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| neulussheim | Neulußheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| malsch-rhein-neckar | Malsch (Rhein-Neckar) | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| dielheim | Dielheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| ilvesheim | Ilvesheim | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| angelbachtal | Angelbachtal | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| muehlhausen-rhein-neckar | Mühlhausen (Rhein-Neckar) | Arbeitsgericht Mannheim | E7, 21, 68159 Mannheim | — |
| philippsburg | Philippsburg | Arbeitsgericht Karlsruhe | Ritterstraße 12, 76133 Karlsruhe | — |
| frankenthal | Frankenthal | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| speyer | Speyer | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| neustadt-weinstrasse | Neustadt an der Weinstraße | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| schifferstadt | Schifferstadt | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| hassloch | Haßloch | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| mutterstadt | Mutterstadt | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| limburgerhof | Limburgerhof | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| boehl-iggelheim | Böhl-Iggelheim | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| dannstadt-schauernheim | Dannstadt-Schauernheim | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| maxdorf | Maxdorf | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| worms | Worms | Arbeitsgericht Mainz | Ernst-Ludwig-Straße 6-8, 55116 Mainz | Prüfung erforderlich: Zuständigkeit Mainz vs. Ludwigshafen |
| bad-duerkheim | Bad Dürkheim | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| roemerberg | Römerberg | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| dudenhofen | Dudenhofen | Arbeitsgericht Ludwigshafen | Wredestraße 6, 67059 Ludwigshafen am Rhein | — |
| viernheim | Viernheim | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | Prüfung erforderlich — Viernheim gehört zu BW, bei Zuständigkeit ArbG Darmstadt (Hessen) klären |
| lampertheim | Lampertheim | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |
| bensheim | Bensheim | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |
| lorsch | Lorsch | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |
| heppenheim | Heppenheim | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |
| biblis | Biblis | Arbeitsgericht Darmstadt | Steubenplatz 14, 64293 Darmstadt | — |

Zählung: 42 Städte + 55 Gemeinden + 13 Bezirke = **110 Datensätze**. Alle Hausanschriften und Zuständigkeiten sind durch den Fachanwalt gegen die aktuelle Gerichtsorganisation zu validieren („Prüfung erforderlich"-Zeilen priorisieren).

---

## Aktenzeichen-Inventur (nur Inventur, keine Risikobewertung — alle "zu verifizieren")

| AZ | Gericht | Fundort(e) | Hinweis |
|---|---|---|---|
| 1 ABR 22/21 | BAG | `lib/urteile.ts:301` | — |
| 2 AZR 138/21 | BAG | diverse | zu verifizieren |
| 2 AZR 140/12 | BAG | `lib/urteile.ts:33`, `/schwellenwert-rechner`, `/ratgeber/arbeitsrecht` | Leiharbeit-Schwellenwert |
| 2 AZR 140/22 | BAG | `app/gekuendigt-jahre/[slug]/content.tsx:275` (BagQuote) | 13.07.2023 angegeben |
| 2 AZR 148/01 | BAG | `app/kuendigung-waehrend-krankheit/page.tsx:381` | 12.04.2002 angegeben |
| 2 AZR 17/23 | BAG | `lib/urteile.ts:189` | — |
| 2 AZR 170/17 | BAG | — | zu verifizieren |
| 2 AZR 258/11 | BAG | `app/ratgeber/muster/[slug]/content.tsx:433` | — |
| 2 AZR 265/21 | BAG | `app/fristlose-kuendigung-jahre/[slug]/content.tsx:171` (BagQuote) | 17.03.2022 angegeben |
| 2 AZR 36/11 | BAG | — | zu verifizieren |
| 2 AZR 373/03 | BAG | — | zu verifizieren |
| 2 AZR 537/21 | BAG | — | zu verifizieren |
| 2 AZR 540/20 | BAG | `app/ratgeber/arbeitsrecht/page.tsx:43` | Organmitglieder |
| 2 AZR 541/09 | BAG | `lib/urteile.ts:72`, `/llms.txt`, EN court-rulings | „Emmely" |
| 2 AZR 549/14 | BAG | — | zu verifizieren |
| 2 AZR 593/09 | BAG | — | zu verifizieren |
| 2 AZR 603/07 | BAG | — | zu verifizieren |
| 2 AZR 675/07 | BAG | — | zu verifizieren |
| 2 AZR 755/13 | BAG | `app/kuendigung-waehrend-krankheit/page.tsx:160, 392` | 20.11.2014 angegeben |
| 2 AZR 773/13 | BAG | `lib/urteile.ts:150` | — |
| 2 AZR 807/06 | BAG | `app/ratgeber/arbeitsrecht/page.tsx:81` | § 1a-Rechtsprechung |
| 2 AZR 840/05 | BAG | — | zu verifizieren |
| 2 AZR 840/16 | BAG | — | zu verifizieren |
| 5 AZR 108/25 | BAG | `app/freistellung-nach-kuendigung/page.tsx` | **Datum: 25.03.2026** — Prüfung erforderlich: Datum liegt in der Zukunft relativ zu heute (01.11.2026) → OK; Senat 5 angegeben |
| 5 AZR 133/90 | BAG | — | zu verifizieren |
| 5 AZR 137/23 | BAG | `app/kuendigung-waehrend-krankheit/page.tsx:161` | 13.12.2023 angegeben |
| 5 AZR 716/15 | BAG | `lib/urteile.ts:264` | — |
| 6 AZR 158/11 | BAG | `app/kuendigungsfrist-berechnen-arbeitnehmer/page.tsx:83, 365` | 15.12.2011 angegeben |
| 6 AZR 261/21 | BAG | `app/freistellung-nach-kuendigung/page.tsx:66, 432` | 12.09.2022 angegeben |
| 6 AZR 333/21 | BAG | `lib/urteile.ts:111`, mehrere DE+EN FAQ-Seiten | Fortführung „faires Verhandeln" |
| 6 AZR 456/21 | BAG | — | zu verifizieren |
| 6 AZR 601/14 | BAG | — | zu verifizieren |
| 6 AZR 75/18 | BAG | `app/aufhebungsvertrag-pruefen/page.tsx:140, 148, 1019`, `app/aufhebungsvertrag/page.tsx:58` | **F024**: Grundsatzurteil „faires Verhandeln" |
| 6 Sa 367/05 | LAG | — | zu verifizieren |
| 7 ABR 69/13 | BAG | — | zu verifizieren |
| 7 AZR 1052/06 | BAG | `app/en/check-dismissal/page.tsx:67` | kein Cooling-off |
| 7 Ca 581/22 | ArbG | — | zu verifizieren (Instanz: ArbG, geringe Autorität) |
| 8 AZR 300/24 | BAG | `app/ratgeber/arbeitsrecht/page.tsx:151` | Equal Pay |
| 8 AZR 4/22 | BAG | `app/urlaubsanspruch-bei-kuendigung/page.tsx:70, 495` | 22.09.2022 angegeben, Ausschlussfristen Urlaubsabgeltung |
| 9 AZR 217/20 | BAG | `app/freistellung-nach-kuendigung/page.tsx:66, 432` | 15.06.2021 angegeben |
| 9 AZR 405/99 | BAG | `app/urlaubsanspruch-bei-kuendigung/page.tsx:66` | 20.06.2000 angegeben |
| 9 AZR 53/14 | BAG | — | zu verifizieren |
| 9 AZR 541/15 | BAG | `lib/urteile.ts:227`, `app/urlaubsanspruch-bei-kuendigung/page.tsx:84, 216, 421` | 19.02.2019 angegeben, Max-Planck-Umsetzung |
| C-188/03 | EuGH | — | zu verifizieren |
| C-214/10 | EuGH | — | zu verifizieren („Schulte"?) |
| C-55/18 | EuGH | — | zu verifizieren (CCOO/Arbeitszeitaufzeichnung?) |
| C-555/07 | EuGH | — | zu verifizieren („Kücükdeveci"?) |
| C-619/16 | EuGH | — | zu verifizieren (Kreuziger?) |
| C-684/16 | EuGH | `/llms.txt`, `app/urlaubsanspruch-bei-kuendigung/page.tsx:54`, `/ratgeber/arbeitsrecht` | „Max-Planck" |

**Hinweis zur Verifikation:** Alle Datumsangaben stammen aus dem Code. Keine Daten wurden ergänzt. 51 Aktenzeichen gesamt gefunden; davon haben 29 nur eine Fundstelle und können bei Nichtverifikation isoliert korrigiert werden; 22 erscheinen in mehreren Seiten (Multi-Site-Hebel).

---

## Abgleich gegen bereits adressierte Punkte (`00746bb` + `9ba81d5`)

| Punkt aus Audit-Spec | Status nach aktueller Pr. | Verbleibende Fundstellen |
|---|---|---|
| S2.1 § 1a KSchG falsch | teilweise | **F007** (abfindungstabelle), **F008** (abfindungsrechner/-tabelle) |
| S2.2 Faustformel 0,5 „Regel" | teilweise | **F008**, **F009** (sitewide Meta Jahrestemplate), weitere in abfindungstabelle |
| S2.3 „Kein Anspruch" ohne Ausnahmen | teilweise | aufhebungsvertrag-pruefen:152, abfindungsrechner:333, EN unfair-dismissal-claim:53 |
| S2.4 Klagefrist „absolut" | teilweise (eine Stelle entfernt) | **F012** |
| S2.5 „einziger Weg" / „fast immer" | teilweise (eine Stelle gefixt) | **F010**, **F011**, betriebsbedingte-kuendigung:166 |
| S2.6 RSV „alle Kosten" | weitgehend (6 Stellen vereinheitlicht) | **F015** (zwei Rest-Fundstellen) |
| S2.7 Streitwert 1 vs 3 BMG | nicht adressiert | **F006** |
| S2.8 ALG / Sperrzeit pauschal | nicht adressiert | **F013**, **F014** |
| S2.9 Fünftelregelung | nicht adressiert | **F023** |
| S2.10 § 622 Abs. 6 BGB | adressiert | 0 verbleibende Fundstellen |
| S2.11 „ab 6 Monaten" | teilweise (2 im Rechner gefixt) | **F016**, **F017** |
| S2.12 § 23 KSchG + Altfall | weitgehend (108 Stellen gefixt) | **F022** (Rechner-FAQ Normreferenz) |
| S2.13 § 14 Abs. 2 KSchG | eine Stelle gefixt | **F018** (sitewide FAQ fehlt noch) |
| S2.14 KSK-Dauer | weitgehend (4 Stellen vereinheitlicht) | **F019** (Chatbot) |
| S2.15 § 4 vs § 5 BUrlG | konsistent | 0 Fundstellen |
| S2.16 § 626 Abs. 2 S. 3 BGB | nicht adressiert | **F021** |
| S2.17 ArbG Heidelberg | geprüft | **F026** (Umbenennung Nebenstelle → Kammern), **F025** (Slug `waghaeuseldorf`) |
| S3 Werbung — Testimonials | **adressiert** (`9ba81d5`) | — |
| S3 Werbung — 40 % Erfolgsangabe | **adressiert** (`00746bb`) | — |
| S3 Werbung — SEO_CONFIG.reviews | nicht adressiert | **F001** |
| S3 Werbung — 68 vs 69 | nicht adressiert | **F002** |
| S3 Werbung — 2.000+ / 5,0 Sterne | nicht adressiert | **F003** |
| S3 Werbung — „Fachanwälte" Plural | nicht adressiert | **F004** |
| S3 Werbung — „100 % kostenlos" | nicht adressiert | **F005** |

---

## Zu beachtende Grenzen des Berichts

- **Nicht geprüft:** Rohdaten in `lib/generated-*.ts` (ca. 800k Zeilen; Trefferfilter `grep -v "generated-"` oben war bewusst — die Prüfung dieser Zeilen übersteigt den Rahmen eines Einzel-Audits und müsste über die Generatoren laufen).
- **Nicht geprüft:** Chatbot-Antworten in `lib/chatbot/keyword-responses.ts` jenseits der KSK-Dauer (F019).
- **Nicht geprüft:** Vollständigkeit der 51 Aktenzeichen hinsichtlich Datum, Senat und tatsächlicher Rechtsaussage.
- **Nicht geprüft:** PDF/Download-Mustertexte in `/ratgeber/muster/`.

---

*Erstellt automatisch durch Audit-Lauf am 2026-11-01. Vollständige Fund-Datenbank mit maschinenlesbaren Spalten in `fachpruefung-2026-11-01.csv`.*
