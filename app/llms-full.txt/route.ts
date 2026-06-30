import { NextResponse } from 'next/server';
import { entries } from '@/lib/betriebszugehoerigkeit';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import { lebenssituationData } from '@/lib/lebenssituation-data';
import { aufhebungsvertragData } from '@/lib/aufhebungsvertrag-data';
import { musterPages } from '@/lib/muster-data';
import { urteile } from '@/lib/urteile';

export const revalidate = 86400;

const BASE = 'https://www.gekuendigt-abfindung.de';

export async function GET() {
  const lines: string[] = [];

  lines.push('# gekuendigt-abfindung.de — Vollständige Seitenübersicht');
  lines.push('');
  lines.push('> Fachanwalt für Arbeitsrecht Fatih Bektas (APOS Legal Heidelberg) berät Arbeitnehmer zu Kündigung, Abfindung, Aufhebungsvertrag und Arbeitsrecht. Über 2.000 erfolgreiche Verfahren.');
  lines.push('');

  // Pillar-Hubs
  lines.push('## Pillar-Seiten');
  lines.push('');
  lines.push(`- [Startseite](${BASE}/): Kündigung erhalten? Fachanwalt prüft Ihre Abfindungschancen kostenlos.`);
  lines.push(`- [Abfindung](${BASE}/abfindung/): Anspruch, Höhe, Berechnung und Verhandlung von Abfindungen nach Kündigung.`);
  lines.push(`- [Kündigung](${BASE}/kuendigung/): Kündigungsschutz, Fristen, Klage und Sofortmaßnahmen nach einer Kündigung.`);
  lines.push(`- [Aufhebungsvertrag](${BASE}/aufhebungsvertrag/): Aufhebungsvertrag prüfen, Abfindung verhandeln, Sperrzeit vermeiden.`);
  lines.push(`- [Fristlose Kündigung](${BASE}/fristlose-kuendigung/): Fristlose Kündigung erhalten — Gründe, Fristen und Abfindungschancen.`);
  lines.push(`- [Abmahnung](${BASE}/abmahnung/): Abmahnung erhalten — Rechte, Reaktionsmöglichkeiten und Gegendarstellung.`);
  lines.push('');

  // Abfindung nach Jahren
  lines.push('## Abfindung nach Betriebszugehörigkeit');
  lines.push('');
  for (const e of entries) {
    lines.push(`- [Abfindung nach ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'}](${BASE}/abfindung-nach-${e.slug}-betriebszugehoerigkeit/): Abfindungshöhe, Kündigungsfrist und Verhandlungstipps bei ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'} Betriebszugehörigkeit.`);
  }
  lines.push('');

  // Gekündigt nach Jahren
  lines.push('## Gekündigt nach Betriebszugehörigkeit');
  lines.push('');
  for (const e of entries) {
    lines.push(`- [Gekündigt nach ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'}](${BASE}/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit/): Rechte, Fristen und nächste Schritte nach Kündigung bei ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'} im Betrieb.`);
  }
  lines.push('');

  // Fristlose Kündigung nach Jahren
  lines.push('## Fristlose Kündigung nach Betriebszugehörigkeit');
  lines.push('');
  for (const e of entries) {
    lines.push(`- [Fristlose Kündigung nach ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'}](${BASE}/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit/): Abfindungschancen und Klageoptionen bei fristloser Kündigung nach ${e.year} ${e.year === 1 ? 'Jahr' : 'Jahren'}.`);
  }
  lines.push('');

  // Kündigung nach Abmahnungen
  lines.push('## Kündigung nach Abmahnungen');
  lines.push('');
  for (const e of abmahnungEntries) {
    lines.push(`- [Kündigung nach ${e.slug.replace(/-/g, ' ')}](${BASE}/kuendigung-nach-${e.slug}/): Wann ist eine Kündigung nach ${e.slug.replace(/-/g, ' ')} zulässig?`);
  }
  lines.push('');

  // Kündigungssituationen
  lines.push('## Kündigung in besonderen Situationen');
  lines.push('');
  for (const e of lebenssituationData) {
    lines.push(`- [${e.h1}](${BASE}/kuendigung/${e.slug}/): Besonderer Kündigungsschutz (${e.gesetz}) und Rechte.`);
  }
  lines.push('');

  // Aufhebungsvertrag-Themen
  lines.push('## Aufhebungsvertrag — Themen');
  lines.push('');
  for (const e of aufhebungsvertragData) {
    lines.push(`- [${e.h1}](${BASE}/aufhebungsvertrag/${e.slug}/): ${e.description.slice(0, 120)}.`);
  }
  lines.push('');

  // Tools & Rechner
  lines.push('## Kostenlose Tools & Rechner');
  lines.push('');
  lines.push(`- [Abfindungsrechner](${BASE}/abfindungsrechner/): Berechnen Sie Ihre voraussichtliche Abfindung anhand von Betriebszugehörigkeit und Bruttogehalt.`);
  lines.push(`- [Kündigung prüfen](${BASE}/kuendigung-pruefen/): Kostenloser Kündigungscheck — Ersteinschätzung in 2 Minuten.`);
  lines.push(`- [Aufhebungsvertrag prüfen](${BASE}/aufhebungsvertrag-pruefen/): Aufhebungsvertrag-Check — Risiken und Chancen in 3 Minuten erkennen.`);
  lines.push(`- [Schwellenwert-Rechner §23 KSchG](${BASE}/schwellenwert-rechner/): Gilt das Kündigungsschutzgesetz für Ihren Betrieb?`);
  lines.push(`- [Kündigungsfrist-Rechner](${BASE}/kuendigungsfrist-rechner/): Berechnen Sie Ihre gesetzliche Kündigungsfrist nach §622 BGB.`);
  lines.push(`- [Überstundenrechner](${BASE}/ueberstundenrechner/): Berechnen Sie Ihren Überstundenanspruch und die korrekte Vergütung.`);
  lines.push(`- [Urlaubsabgeltungsrechner](${BASE}/urlaubsabgeltung-rechner/): Berechnen Sie Ihren Anspruch auf Urlaubsabgeltung bei Kündigung.`);
  lines.push(`- [Urlaubsrechner Teilzeit](${BASE}/urlaub-teilzeit-rechner/): Urlaubsanspruch bei Teilzeit berechnen — anteilig nach Arbeitstagen.`);
  lines.push(`- [RVG-Rechner](${BASE}/rvg-rechner/): Anwaltskosten im Arbeitsrecht berechnen nach RVG.`);
  lines.push(`- [Alle Tools](${BASE}/tools/): Übersicht aller kostenlosen Arbeitsrecht-Tools.`);
  lines.push('');

  // Ratgeber & Muster
  lines.push('## Ratgeber, Muster & Vorlagen');
  lines.push('');
  lines.push(`- [Ratgeber Übersicht](${BASE}/ratgeber/): Alle Ratgeber-Themen rund um Arbeitsrecht.`);
  lines.push(`- [Muster & Vorlagen](${BASE}/ratgeber/muster/): Kostenlose Muster für Widerspruch, Gegendarstellung, Kündigungsschutzklage.`);
  for (const e of musterPages) {
    lines.push(`- [${e.h1}](${BASE}/ratgeber/muster/${e.slug}/): Kostenlose Vorlage — ${e.description.slice(0, 100)}.`);
  }
  lines.push(`- [Kündigungsstatistik Arbeitsgerichte](${BASE}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/): Aktuelle Statistiken zu Kündigungsschutzklagen an deutschen Arbeitsgerichten.`);
  lines.push('');

  // Urteile
  lines.push('## Aktuelle Urteile im Arbeitsrecht');
  lines.push('');
  lines.push(`- [Urteile Übersicht](${BASE}/ratgeber/urteile/): Relevante BAG- und LAG-Urteile im Arbeitsrecht.`);
  for (const u of urteile) {
    lines.push(`- [${u.titel} (${u.az})](${BASE}/urteile/${u.slug}/): Urteilsbesprechung und Praxisauswirkungen.`);
  }
  lines.push('');

  // Glossar
  lines.push('## Glossar');
  lines.push('');
  lines.push(`- [Glossar Arbeitsrecht](${BASE}/glossar/): Die wichtigsten Begriffe im Arbeitsrecht — von Abfindung bis Zeugnis.`);
  lines.push('');

  // Arbeitsrecht-Anwalt Standorte (zusammengefasst)
  lines.push('## Arbeitsrecht-Anwalt nach Standort');
  lines.push('');
  lines.push(`- [Alle Standorte](${BASE}/arbeitsrecht-anwalt/): Fachanwalt für Arbeitsrecht — bundesweit vertreten, 106+ Standorte.`);
  lines.push(`- Großstädte: [Berlin](${BASE}/arbeitsrecht-anwalt/berlin/), [Hamburg](${BASE}/arbeitsrecht-anwalt/hamburg/), [München](${BASE}/arbeitsrecht-anwalt/muenchen/), [Köln](${BASE}/arbeitsrecht-anwalt/koeln/), [Frankfurt](${BASE}/arbeitsrecht-anwalt/frankfurt/), [Stuttgart](${BASE}/arbeitsrecht-anwalt/stuttgart/), [Düsseldorf](${BASE}/arbeitsrecht-anwalt/duesseldorf/), [Heidelberg](${BASE}/arbeitsrecht-anwalt/heidelberg/) u.v.m.`);
  lines.push('');

  // Autor & Kanzlei
  lines.push('## Autor & Kanzlei');
  lines.push('');
  lines.push(`- [Fatih Bektas — Fachanwalt für Arbeitsrecht](${BASE}/autor/fatih-bektas/): Vita, Schwerpunkte und Qualifikationen.`);
  lines.push(`- [Team](${BASE}/team/): Alle Anwälte der Kanzlei APOS Legal.`);
  lines.push('');

  // Kontakt & Rechtliches
  lines.push('## Kontakt & Rechtliches');
  lines.push('');
  lines.push(`- [Kostenlose Ersteinschätzung](${BASE}/#kontakt): Schildern Sie Ihren Fall — Ersteinschätzung innerhalb von 24 Stunden.`);
  lines.push(`- Telefon: +49 6222 9599 2400`);
  lines.push(`- E-Mail: bektas@apos.legal`);
  lines.push(`- Adresse: Am Paradeplatz 20, 69126 Heidelberg`);
  lines.push(`- [Datenschutzerklärung](${BASE}/privacy-policy/)`);
  lines.push(`- [Impressum](${BASE}/legal-notice/)`);
  lines.push('');

  // -------------------------------------------------------------------
  // English section — full English /en/ tree for AI crawlers / LLMs
  // -------------------------------------------------------------------
  lines.push('---');
  lines.push('');
  lines.push('# English — German employment law for English speakers');
  lines.push('');
  lines.push(`> The /en/ subfolder targets English-speaking employees of German companies. All substantive law is German labour law (KSchG, BGB, BUrlG, ArbZG). Written and reviewed by Fatih Bektas, German employment-law specialist (Fachanwalt für Arbeitsrecht).`);
  lines.push('');

  lines.push('## Pillar pages (English)');
  lines.push('');
  lines.push(`- [Home](${BASE}/en/): Dismissed in Germany? Free severance review by a specialist.`);
  lines.push(`- [Severance pay](${BASE}/en/severance-pay/): Formula, entitlement, tax (Fünftelregelung), negotiation leverage.`);
  lines.push(`- [Dismissal](${BASE}/en/dismissal/): 3-week deadline, types, first-24-hours playbook.`);
  lines.push(`- [Termination agreement](${BASE}/en/termination-agreement/): When to sign, Sperrzeit risk, must-have clauses.`);
  lines.push(`- [Summary dismissal](${BASE}/en/summary-dismissal/): § 626 BGB, 2-week rule, defence strategy.`);
  lines.push(`- [Written warning](${BASE}/en/written-warning/): Invalid warnings and removal claims.`);
  lines.push(`- [Redundancy dismissal](${BASE}/en/redundancy-dismissal/): Social selection, § 1a KSchG offer.`);
  lines.push(`- [Unfair-dismissal claim](${BASE}/en/unfair-dismissal-claim/): Filing procedure, costs, settlement.`);
  lines.push(`- [Notice periods (§ 622 BGB)](${BASE}/en/notice-periods/): Statutory minimum by tenure.`);
  lines.push(`- [Dismissal Protection Act](${BASE}/en/dismissal-protection-act/): When the KSchG applies — 6-month qualification & small-business threshold.`);
  lines.push(`- [Severance table](${BASE}/en/severance-table/): Half-month and full-month factors across salary brackets.`);
  lines.push('');

  lines.push('## Calculators (English)');
  lines.push('');
  lines.push(`- [Severance calculator](${BASE}/en/severance-calculator/): Salary × years × negotiation factor.`);
  lines.push(`- [Notice-period calculator](${BASE}/en/notice-period-calculator/): § 622 BGB stepped notice periods.`);
  lines.push(`- [Overtime calculator](${BASE}/en/overtime-calculator/): Hourly rate, base pay and supplement.`);
  lines.push(`- [Unused-holiday pay calculator](${BASE}/en/unused-holiday-pay-calculator/): § 7 (4) BUrlG cash-out.`);
  lines.push(`- [Part-time holiday calculator](${BASE}/en/part-time-holiday-calculator/): Pro-rated entitlement.`);
  lines.push(`- [Small-business threshold calculator](${BASE}/en/small-business-threshold-calculator/): § 23 KSchG part-time weighting.`);
  lines.push(`- [Legal-fees calculator (RVG)](${BASE}/en/legal-fees-calculator/): Lawyer fees from value in dispute.`);
  lines.push(`- [Check your dismissal](${BASE}/en/check-dismissal/): 5-question quiz with verdict.`);
  lines.push(`- [Check your written warning](${BASE}/en/check-written-warning/): Formal-flaw quiz.`);
  lines.push(`- [Check your termination agreement](${BASE}/en/check-termination-agreement/): Sperrzeit & clause check.`);
  lines.push(`- [Tools overview](${BASE}/en/tools/): Full index.`);
  lines.push('');

  lines.push('## Severance by tenure (English programmatic — 40 pages)');
  lines.push('');
  lines.push(`- [Severance after 1 year](${BASE}/en/severance-after-1-year-of-employment/)`);
  lines.push(`- [Severance after 5 years](${BASE}/en/severance-after-5-years-of-employment/)`);
  lines.push(`- [Severance after 10 years](${BASE}/en/severance-after-10-years-of-employment/)`);
  lines.push(`- [Severance after 15 years](${BASE}/en/severance-after-15-years-of-employment/)`);
  lines.push(`- [Severance after 20 years](${BASE}/en/severance-after-20-years-of-employment/)`);
  lines.push(`- [Severance after 25 years](${BASE}/en/severance-after-25-years-of-employment/)`);
  lines.push(`- [Severance after 30 years](${BASE}/en/severance-after-30-years-of-employment/)`);
  lines.push(`- Pattern for all 1–40 years: ${BASE}/en/severance-after-N-years-of-employment/`);
  lines.push('');

  lines.push('## Dismissed by tenure (English programmatic — 40 pages)');
  lines.push('');
  lines.push(`- [Dismissed after 1 year](${BASE}/en/dismissed-after-1-year-of-employment/)`);
  lines.push(`- [Dismissed after 5 years](${BASE}/en/dismissed-after-5-years-of-employment/)`);
  lines.push(`- [Dismissed after 10 years](${BASE}/en/dismissed-after-10-years-of-employment/)`);
  lines.push(`- [Dismissed after 15 years](${BASE}/en/dismissed-after-15-years-of-employment/)`);
  lines.push(`- [Dismissed after 20 years](${BASE}/en/dismissed-after-20-years-of-employment/)`);
  lines.push(`- Pattern for all 1–40 years: ${BASE}/en/dismissed-after-N-years-of-employment/`);
  lines.push('');

  lines.push('## Summary dismissal by tenure (English programmatic — 40 pages)');
  lines.push('');
  lines.push(`- [Summary dismissal after 1 year](${BASE}/en/summary-dismissal-after-1-year-of-employment/)`);
  lines.push(`- [Summary dismissal after 5 years](${BASE}/en/summary-dismissal-after-5-years-of-employment/)`);
  lines.push(`- [Summary dismissal after 10 years](${BASE}/en/summary-dismissal-after-10-years-of-employment/)`);
  lines.push(`- [Summary dismissal after 20 years](${BASE}/en/summary-dismissal-after-20-years-of-employment/)`);
  lines.push(`- Pattern for all 1–40 years: ${BASE}/en/summary-dismissal-after-N-years-of-employment/`);
  lines.push('');

  lines.push('## English-speaking employment lawyer by city');
  lines.push('');
  lines.push(`- [Employment lawyer — overview](${BASE}/en/employment-lawyer/): English-speaking representation at any German Arbeitsgericht.`);
  lines.push(`- [Berlin](${BASE}/en/employment-lawyer/berlin/)`);
  lines.push(`- [Hamburg](${BASE}/en/employment-lawyer/hamburg/)`);
  lines.push(`- [Munich](${BASE}/en/employment-lawyer/muenchen/)`);
  lines.push(`- [Frankfurt am Main](${BASE}/en/employment-lawyer/frankfurt-am-main/)`);
  lines.push(`- [Cologne](${BASE}/en/employment-lawyer/koeln/)`);
  lines.push(`- [Stuttgart](${BASE}/en/employment-lawyer/stuttgart/)`);
  lines.push(`- [Düsseldorf](${BASE}/en/employment-lawyer/duesseldorf/)`);
  lines.push(`- [Heidelberg](${BASE}/en/employment-lawyer/heidelberg/)`);
  lines.push(`- Pattern: ${BASE}/en/employment-lawyer/<city-slug>/`);
  lines.push('');

  lines.push('## Reference & guides (English)');
  lines.push('');
  lines.push(`- [Guides overview](${BASE}/en/guides/)`);
  lines.push(`- [Employment-law reference](${BASE}/en/guides/employment-law/): Sources, working hours, holiday, special protections, AGG, references.`);
  lines.push(`- [Landmark court rulings](${BASE}/en/guides/court-rulings/): BAG 6 AZR 333/21, BAG 2 AZR 541/09 (Emmely), CJEU C-684/16.`);
  lines.push(`- [Dismissal statistics](${BASE}/en/guides/dismissal-statistics-german-labour-courts/): Settlement rates, time to hearing, severance multiples.`);
  lines.push(`- [Letter templates](${BASE}/en/guides/templates/)`);
  lines.push(`- [Glossary](${BASE}/en/glossary/): English definitions for Abmahnung, Aufhebungsvertrag, Sperrzeit, etc.`);
  lines.push('');

  lines.push('## About and contact (English)');
  lines.push('');
  lines.push(`- [About Fatih Bektas](${BASE}/en/author/fatih-bektas/): Specialist credentials and background.`);
  lines.push(`- [Team](${BASE}/en/team/): APOS Legal Heidelberg.`);
  lines.push(`- [Client intake — free case review](${BASE}/en/client-intake/): Send your case (response within 48 hours).`);
  lines.push(`- [Legal notice](${BASE}/en/legal-notice/) (English summary; legally binding: ${BASE}/legal-notice/)`);
  lines.push(`- [Privacy policy](${BASE}/en/privacy-policy/) (English summary; legally binding: ${BASE}/privacy-policy/)`);
  lines.push('');

  const content = lines.join('\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
