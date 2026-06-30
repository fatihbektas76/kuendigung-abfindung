import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export async function GET() {
  const content = `# gekuendigt-abfindung.de — Kündigung & Abfindung

> gekuendigt-abfindung.de (Kanzlei Fatih Bektas) ist eine deutsche Anwaltskanzlei mit Schwerpunkt Arbeitsrecht, Kündigungsschutz und Abfindungsverhandlungen. Fatih Bektas ist seit 2011 Fachanwalt für Arbeitsrecht mit über 20 Jahren Prozesserfahrung. Kanzleistandorte: Heidelberg und Berlin.

## Kernthemen

- [Abfindung nach Kündigung](${BASE_URL}/abfindung): Anspruch, Höhe, Berechnung und Verhandlung von Abfindungen bei Kündigung.
- [Kündigung](${BASE_URL}/kuendigung): Kündigungsschutz, Kündigungsfristen, Kündigungsschutzklage, Abmahnung.
- [Aufhebungsvertrag](${BASE_URL}/aufhebungsvertrag): Aufhebungsvertrag prüfen lassen, Abfindung verhandeln, Sperrzeit vermeiden.
- [Abmahnung](${BASE_URL}/abmahnung): Abmahnung erhalten — Rechte, Reaktionsmöglichkeiten und Gegendarstellung.
- [Fristlose Kündigung](${BASE_URL}/fristlose-kuendigung): Fristlose Kündigung erhalten — Gründe, Fristen, Abfindungschancen.

## Kostenlose Tools

- [Abfindungsrechner](${BASE_URL}/abfindungsrechner): Berechnen Sie Ihre voraussichtliche Abfindung anhand von Betriebszugehörigkeit und Bruttomonatsgehalt.
- [Kündigung prüfen](${BASE_URL}/kuendigung-pruefen): Kostenloser Kündigungscheck — Ersteinschätzung in 2 Minuten.
- [Schwellenwert-Rechner §23 KSchG](${BASE_URL}/schwellenwert-rechner): Prüfen Sie, ob das Kündigungsschutzgesetz für Ihren Betrieb gilt.

## Ratgeber & Vorlagen

- [Ratgeber](${BASE_URL}/ratgeber): Übersicht aller Ratgeber-Themen rund um Arbeitsrecht.
- [Muster & Vorlagen](${BASE_URL}/ratgeber/muster): Kostenlose Muster für Widerspruch, Gegendarstellung, Kündigungsschutzklage.
- [Aktuelle Urteile](${BASE_URL}/ratgeber/urteile): Relevante Urteile im Arbeitsrecht.
- [Glossar Arbeitsrecht](${BASE_URL}/glossar): Die wichtigsten Begriffe im Arbeitsrecht — von Abfindung bis Zeugnis.

## Das Team

- [Team-Übersicht](${BASE_URL}/team): Fatih Bektas (Rechtsanwalt & Fachanwalt für Arbeitsrecht), Georg Willem Büchler (Rechtsanwalt), Dr. Martin Duncker (Rechtsanwalt).

## Kontakt & Beratung

- [Kostenlose Ersteinschätzung](${BASE_URL}/#kontakt): Schildern Sie Ihren Fall — Ersteinschätzung innerhalb von 24 Stunden.
- [Telefontermin buchen](https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp): Kostenloses Erstgespräch per Telefon.
- E-Mail: bektas@apos.legal
- Telefon: +49 6222 9599 2400
- Adresse: Am Paradeplatz 20, 69126 Heidelberg

## Rechtliches

- [Datenschutzerklärung](${BASE_URL}/privacy-policy)
- [Impressum](${BASE_URL}/legal-notice)

---

# English section — German employment law for English speakers

> The /en/ subfolder targets English-speaking employees of German companies (expats, international professionals). The substantive law described is German labour law (KSchG, BGB, BUrlG, ArbZG). All content is written and reviewed by Fatih Bektas, German employment-law specialist (Fachanwalt für Arbeitsrecht).

## Core topics (English)

- [Severance pay (Abfindung)](${BASE_URL}/en/severance-pay): Statutory framework, formula, tax (Fünftelregelung), how severance is negotiated in court settlements.
- [Dismissal in Germany](${BASE_URL}/en/dismissal): The 3-week filing deadline (§ 4 KSchG), permitted grounds, formal requirements.
- [Termination agreement (Aufhebungsvertrag)](${BASE_URL}/en/termination-agreement): When to sign, the 12-week Sperrzeit trap, must-have clauses.
- [Written warning (Abmahnung)](${BASE_URL}/en/written-warning): When the warning is invalid and how to get it removed.
- [Summary dismissal (Fristlose Kündigung)](${BASE_URL}/en/summary-dismissal): The strict § 626 BGB test, 2-week deadline, defence strategy.
- [Redundancy dismissal (Betriebsbedingte Kündigung)](${BASE_URL}/en/redundancy-dismissal): Social selection rules, § 1a KSchG severance offer.
- [Unfair-dismissal claim (Kündigungsschutzklage)](${BASE_URL}/en/unfair-dismissal-claim): Filing procedure, costs, settlement chances.
- [Notice periods (§ 622 BGB)](${BASE_URL}/en/notice-periods): Statutory minimum notice by length of service.
- [Dismissal Protection Act (KSchG)](${BASE_URL}/en/dismissal-protection-act): When the substantive protection applies — 6-month qualification and the small-business threshold.

## Free tools (English)

- [Severance calculator](${BASE_URL}/en/severance-calculator): Estimate severance using the German half-month rule plus negotiation factor.
- [Notice-period calculator](${BASE_URL}/en/notice-period-calculator): Statutory notice under § 622 BGB by tenure.
- [Overtime calculator](${BASE_URL}/en/overtime-calculator): Hourly rate, base pay and supplement.
- [Unused-holiday pay calculator](${BASE_URL}/en/unused-holiday-pay-calculator): Cash-out value under § 7 (4) BUrlG.
- [Part-time holiday calculator](${BASE_URL}/en/part-time-holiday-calculator): Pro-rated statutory entitlement.
- [Small-business threshold calculator](${BASE_URL}/en/small-business-threshold-calculator): Test § 23 KSchG with part-time weighting.
- [Legal-fees calculator (RVG)](${BASE_URL}/en/legal-fees-calculator): Lawyer fees from the value in dispute.
- [Check your dismissal](${BASE_URL}/en/check-dismissal): 5-question quiz with verdict.
- [Check your written warning](${BASE_URL}/en/check-written-warning): Spot formal flaws to demand removal.
- [Check your termination agreement](${BASE_URL}/en/check-termination-agreement): Identify Sperrzeit risk and missing clauses.

## Severance and dismissal by length of service (English)

- Severance after N years of employment: 40 programmatic pages from 1 to 40 years, pattern ${BASE_URL}/en/severance-after-N-years-of-employment/
- Dismissed after N years of employment: 40 programmatic pages, pattern ${BASE_URL}/en/dismissed-after-N-years-of-employment/
- Summary dismissal after N years of employment: 40 programmatic pages, pattern ${BASE_URL}/en/summary-dismissal-after-N-years-of-employment/

## Reference and guides (English)

- [Employment-law guides](${BASE_URL}/en/guides): Plain-English overview index.
- [Complete employment-law reference](${BASE_URL}/en/guides/employment-law): Sources, working hours, holiday, special protections, anti-discrimination, references.
- [Landmark court rulings](${BASE_URL}/en/guides/court-rulings): BAG 6 AZR 333/21 (fair negotiation), BAG 2 AZR 541/09 (Emmely), CJEU C-684/16 (Max-Planck holiday).
- [Dismissal statistics — German labour courts](${BASE_URL}/en/guides/dismissal-statistics-german-labour-courts): Settlement rates, time to first hearing, severance multiples.
- [Letter templates](${BASE_URL}/en/guides/templates): Tailored templates available on request.
- [Severance table by tenure & salary](${BASE_URL}/en/severance-table): Half-month and full-month factors across common salary brackets.
- [Glossary of German employment-law terms](${BASE_URL}/en/glossary): Abmahnung to Sperrzeit, with English definitions.

## English-speaking representation by city

- [Employment lawyer — Germany overview](${BASE_URL}/en/employment-lawyer): English-speaking representation at any German labour court.
- City pages exist for Berlin, Hamburg, Munich (muenchen), Frankfurt, Cologne (koeln), Stuttgart, Düsseldorf (duesseldorf), Heidelberg, Mannheim, Karlsruhe, Leipzig, Dresden, Nuremberg (nuernberg), Bremen, Hanover (hannover) and others. Pattern: ${BASE_URL}/en/employment-lawyer/<city-slug>/

## About and contact (English)

- [About Fatih Bektas](${BASE_URL}/en/author/fatih-bektas): German employment-law specialist, 20+ years, 2,000+ cases.
- [Team](${BASE_URL}/en/team): APOS Legal Heidelberg.
- [Client intake — free case review](${BASE_URL}/en/client-intake): Send your case for review (response within 48 hours).
- [Legal notice (Impressum)](${BASE_URL}/en/legal-notice): English summary; legally binding version in German at ${BASE_URL}/legal-notice
- [Privacy policy](${BASE_URL}/en/privacy-policy): GDPR notice; legally binding version in German at ${BASE_URL}/privacy-policy
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
