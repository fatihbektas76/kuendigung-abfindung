export interface AufhebungsvertragEntry {
  slug: string;
  h1: string;
  description: string;
}

export const aufhebungsvertragData: AufhebungsvertragEntry[] = [
  { slug: 'aufhebungsvertrag-abfindung', h1: 'Abfindung im Aufhebungsvertrag — wie hoch und wie verhandeln?', description: 'Wie hoch sollte die Abfindung sein? Verhandlungstipps und Berechnungsbeispiele.' },
  { slug: 'aufhebungsvertrag-ablehnen', h1: 'Aufhebungsvertrag ablehnen — wann ist das sinnvoll?', description: 'Wann Sie ablehnen sollten und welche Konsequenzen das hat.' },
  { slug: 'aufhebungsvertrag-sperrzeit', h1: 'Aufhebungsvertrag Sperrzeit vermeiden — so geht\u2019s', description: 'So formulieren Sie den Aufhebungsvertrag, dass keine Sperrzeit droht.' },
  { slug: 'aufhebungsvertrag-muster', h1: 'Aufhebungsvertrag Muster & Checkliste', description: 'Worauf Sie achten müssen — Punkt für Punkt.' },
  { slug: 'aufhebungsvertrag-widerruf', h1: 'Aufhebungsvertrag widerrufen — ist das möglich?', description: 'Wann und wie Sie einen Aufhebungsvertrag anfechten können.' },
  { slug: 'aufhebungsvertrag-zeugnis', h1: 'Aufhebungsvertrag und Zeugnis — worauf achten?', description: 'Wie Sie ein gutes Zeugnis im Aufhebungsvertrag absichern.' },
  { slug: 'aufhebungsvertrag-vor-nachteile', h1: 'Aufhebungsvertrag Vor- und Nachteile', description: 'Was für und gegen einen Aufhebungsvertrag spricht.' },
];

export function getAufhebungsvertragEntry(slug: string): AufhebungsvertragEntry | undefined {
  return aufhebungsvertragData.find((e) => e.slug === slug);
}
