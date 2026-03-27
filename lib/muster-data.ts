export interface MusterPageEntry {
  slug: string;
  h1: string;
  description: string;
  keywords: string;
  type: 'muster' | 'checkliste';
  contentKey: string;
}

export const musterPages: MusterPageEntry[] = [
  {
    slug: 'widerspruch-abmahnung',
    h1: 'Widerspruch gegen Abmahnung',
    description: 'Kostenloses Muster: Widerspruch gegen Abmahnung mit Ausfüllhilfe. Vorlage direkt kopieren und an Ihren Fall anpassen. Vom Fachanwalt geprüft.',
    keywords: 'Widerspruch Abmahnung, Abmahnung widersprechen, Muster Widerspruch',
    type: 'muster',
    contentKey: 'widerspruchAbmahnung',
  },
  {
    slug: 'gegendarstellung-abmahnung',
    h1: 'Gegendarstellung zur Abmahnung',
    description: 'Kostenloses Muster: Gegendarstellung zur Abmahnung mit Ausfüllhilfe. Vorlage direkt kopieren und an Ihren Fall anpassen. Vom Fachanwalt geprüft.',
    keywords: 'Gegendarstellung Abmahnung, Stellungnahme Abmahnung, Muster Gegendarstellung',
    type: 'muster',
    contentKey: 'gegendarstellungAbmahnung',
  },
  {
    slug: 'checkliste-aufhebungsvertrag',
    h1: 'Checkliste: Aufhebungsvertrag prüfen',
    description: 'Kostenlose Checkliste: 15 Punkte die Sie im Aufhebungsvertrag prüfen müssen. Vom Fachanwalt für Arbeitsrecht zusammengestellt.',
    keywords: 'Aufhebungsvertrag Checkliste, Aufhebungsvertrag prüfen, Aufhebungsvertrag Punkte',
    type: 'checkliste',
    contentKey: 'aufhebungsvertragCheckliste',
  },
  {
    slug: 'checkliste-abmahnung',
    h1: 'Checkliste: Abmahnung prüfen',
    description: 'Kostenlose Checkliste: 10 Punkte die eine Abmahnung erfüllen muss. Ist Ihre Abmahnung wirksam? Vom Fachanwalt für Arbeitsrecht zusammengestellt.',
    keywords: 'Abmahnung Checkliste, Abmahnung prüfen, Abmahnung unwirksam',
    type: 'checkliste',
    contentKey: 'abmahnungCheckliste',
  },
];

export function getMusterPage(slug: string): MusterPageEntry | undefined {
  return musterPages.find((m) => m.slug === slug);
}
