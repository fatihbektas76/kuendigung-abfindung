export interface LebenssituationEntry {
  slug: string;
  h1: string;
  gesetz: string;
}

export const lebenssituationData: LebenssituationEntry[] = [
  { slug: 'kuendigung-schwangerschaft', h1: 'Kündigung während der Schwangerschaft — was tun?', gesetz: '§17 MuSchG' },
  { slug: 'kuendigung-nach-elternzeit', h1: 'Kündigung nach der Elternzeit — was tun?', gesetz: '§18 BEEG' },
  { slug: 'kuendigung-krankschreibung', h1: 'Kündigung während Krankschreibung — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-wegen-krankheit', h1: 'Kündigung wegen Krankheit — wirksam oder nicht?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-kurz-vor-rente', h1: 'Kündigung kurz vor der Rente — Ihre Rechte', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-zwei-jahre-vor-rente', h1: 'Kündigung 2 Jahre vor der Rente — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-fuenf-jahre-vor-rente', h1: 'Kündigung 5 Jahre vor der Rente — Ihre Rechte', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-schwerbehinderung', h1: 'Kündigung bei Schwerbehinderung — besonderer Schutz', gesetz: '§168 SGB IX' },
  { slug: 'kuendigung-probezeit', h1: 'Kündigung in der Probezeit — was gilt?', gesetz: '§622 BGB' },
  { slug: 'kuendigung-minijob', h1: 'Kündigung im Minijob — Ihre Rechte', gesetz: '§622 BGB' },
  { slug: 'kuendigung-teilzeit', h1: 'Kündigung in Teilzeit — was tun?', gesetz: '§1 KSchG' },
  { slug: 'kuendigung-betriebsuebergang', h1: 'Kündigung nach Betriebsübergang — Ihre Rechte', gesetz: '§613a BGB' },
  { slug: 'kuendigung-betriebsrat', h1: 'Kündigung als Betriebsratsmitglied', gesetz: '§15 KSchG' },
  { slug: 'kuendigung-fuehrungskraft', h1: 'Kündigung als Führungskraft — besondere Regeln', gesetz: '§14 KSchG' },
  { slug: 'kuendigung-ausbildung', h1: 'Kündigung in der Ausbildung — was gilt?', gesetz: '§22 BBiG' },
];

export function getLebenssituation(slug: string): LebenssituationEntry | undefined {
  return lebenssituationData.find((e) => e.slug === slug);
}
