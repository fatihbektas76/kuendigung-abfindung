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

- [Team-Übersicht](${BASE_URL}/team): Fatih Bektas (Rechtsanwalt & Fachanwalt für Arbeitsrecht), Georg Willem Büchler (Rechtsanwalt & Fachanwalt), Dr. Martin Duncker (Rechtsanwalt & Fachanwalt).

## Kontakt & Beratung

- [Kostenlose Ersteinschätzung](${BASE_URL}/#kontakt): Schildern Sie Ihren Fall — Ersteinschätzung innerhalb von 24 Stunden.
- [Telefontermin buchen](https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp): Kostenloses Erstgespräch per Telefon.
- E-Mail: bektas@apos.legal
- Telefon: +49 6222 9599 2400
- Adresse: Am Paradeplatz 20, 69126 Heidelberg

## Rechtliches

- [Datenschutzerklärung](${BASE_URL}/privacy-policy)
- [Impressum](${BASE_URL}/legal-notice)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
