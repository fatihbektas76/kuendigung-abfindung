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

  const content = lines.join('\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
