export type Quelle = {
  text: string;
  url: string;
  art: 'gesetz' | 'urteil' | 'amtlich';
};

export type BagUrteil = {
  az: string;
  datum: string;
  kernaussage: string;
  url?: string;
};

// ── Abfindung ──────────────────────────────────────────────
export const QUELLEN_ABFINDUNG: Quelle[] = [
  {
    text: '§ 1a KSchG — Abfindungsanspruch bei betriebsbedingter Kündigung',
    url: 'https://www.gesetze-im-internet.de/kschg/__1a.html',
    art: 'gesetz',
  },
  {
    text: '§ 10 KSchG — Höhe der Abfindung',
    url: 'https://www.gesetze-im-internet.de/kschg/__10.html',
    art: 'gesetz',
  },
  {
    text: '§ 34 EStG — Fünftelregelung bei Abfindungen',
    url: 'https://www.gesetze-im-internet.de/estg/__34.html',
    art: 'gesetz',
  },
];

// ── Kündigung ──────────────────────────────────────────────
export const QUELLEN_KUENDIGUNG: Quelle[] = [
  {
    text: '§ 4 KSchG — Klagefrist (3 Wochen)',
    url: 'https://www.gesetze-im-internet.de/kschg/__4.html',
    art: 'gesetz',
  },
  {
    text: '§ 622 BGB — Kündigungsfristen',
    url: 'https://www.gesetze-im-internet.de/bgb/__622.html',
    art: 'gesetz',
  },
  {
    text: '§ 1 KSchG — Sozial ungerechtfertigte Kündigung',
    url: 'https://www.gesetze-im-internet.de/kschg/__1.html',
    art: 'gesetz',
  },
];

// ── Aufhebungsvertrag ──────────────────────────────────────
export const QUELLEN_AUFHEBUNGSVERTRAG: Quelle[] = [
  {
    text: '§ 623 BGB — Schriftformerfordernis',
    url: 'https://www.gesetze-im-internet.de/bgb/__623.html',
    art: 'gesetz',
  },
  {
    text: '§ 159 SGB III — Sperrzeit bei Arbeitsaufgabe',
    url: 'https://dejure.org/gesetze/SGB_III/159.html',
    art: 'gesetz',
  },
  {
    text: '§ 34 EStG — Fünftelregelung bei Abfindungen',
    url: 'https://www.gesetze-im-internet.de/estg/__34.html',
    art: 'gesetz',
  },
];

// ── Fristlose Kündigung ────────────────────────────────────
export const QUELLEN_FRISTLOSE: Quelle[] = [
  {
    text: '§ 626 BGB — Fristlose Kündigung aus wichtigem Grund',
    url: 'https://www.gesetze-im-internet.de/bgb/__626.html',
    art: 'gesetz',
  },
  {
    text: '§ 4 KSchG — Klagefrist (3 Wochen)',
    url: 'https://www.gesetze-im-internet.de/kschg/__4.html',
    art: 'gesetz',
  },
  {
    text: '§ 314 BGB — Kündigung von Dauerschuldverhältnissen',
    url: 'https://www.gesetze-im-internet.de/bgb/__314.html',
    art: 'gesetz',
  },
];

// ── Betriebsbedingte Kündigung ───────────────────────────────
export const QUELLEN_BETRIEBSBEDINGTE: Quelle[] = [
  {
    text: '§ 1 Abs. 2 KSchG — Soziale Rechtfertigung, betriebsbedingte Gründe',
    url: 'https://www.gesetze-im-internet.de/kschg/__1.html',
    art: 'gesetz',
  },
  {
    text: '§ 1a KSchG — Abfindungsanspruch bei betriebsbedingter Kündigung',
    url: 'https://www.gesetze-im-internet.de/kschg/__1a.html',
    art: 'gesetz',
  },
  {
    text: '§ 1 Abs. 3 KSchG — Sozialauswahl',
    url: 'https://www.gesetze-im-internet.de/kschg/__1.html',
    art: 'gesetz',
  },
];

// ── Kündigungsschutzklage ────────────────────────────────────
export const QUELLEN_KUENDIGUNGSSCHUTZKLAGE: Quelle[] = [
  {
    text: '§ 4 KSchG — Klagefrist (3 Wochen)',
    url: 'https://www.gesetze-im-internet.de/kschg/__4.html',
    art: 'gesetz',
  },
  {
    text: '§ 12a ArbGG — Kosten im Urteilsverfahren des ersten Rechtszugs',
    url: 'https://www.gesetze-im-internet.de/arbgg/__12a.html',
    art: 'gesetz',
  },
  {
    text: '§ 9 KSchG — Auflösung des Arbeitsverhältnisses gegen Abfindung',
    url: 'https://www.gesetze-im-internet.de/kschg/__9.html',
    art: 'gesetz',
  },
];

// ── Kündigungsfristen ────────────────────────────────────────
export const QUELLEN_KUENDIGUNGSFRISTEN: Quelle[] = [
  {
    text: '§ 622 BGB — Kündigungsfristen bei Arbeitsverhältnissen',
    url: 'https://www.gesetze-im-internet.de/bgb/__622.html',
    art: 'gesetz',
  },
  {
    text: '§ 626 BGB — Fristlose Kündigung aus wichtigem Grund',
    url: 'https://www.gesetze-im-internet.de/bgb/__626.html',
    art: 'gesetz',
  },
  {
    text: '§ 622 Abs. 4 BGB — Abweichende Regelungen durch Tarifvertrag',
    url: 'https://www.gesetze-im-internet.de/bgb/__622.html',
    art: 'gesetz',
  },
];

// ── Abfindungstabelle ────────────────────────────────────────
export const QUELLEN_ABFINDUNGSTABELLE: Quelle[] = [
  {
    text: '§ 1a KSchG — Abfindungsanspruch bei betriebsbedingter Kündigung',
    url: 'https://www.gesetze-im-internet.de/kschg/__1a.html',
    art: 'gesetz',
  },
  {
    text: '§ 10 KSchG — Höhe der Abfindung',
    url: 'https://www.gesetze-im-internet.de/kschg/__10.html',
    art: 'gesetz',
  },
  {
    text: '§ 9 KSchG — Auflösung gegen Abfindung',
    url: 'https://www.gesetze-im-internet.de/kschg/__9.html',
    art: 'gesetz',
  },
];

// ── Anwendung KSchG ──────────────────────────────────────────
export const QUELLEN_KSCHG_ANWENDUNG: Quelle[] = [
  {
    text: '§ 1 Abs. 1 KSchG — Wartezeit von sechs Monaten',
    url: 'https://dejure.org/gesetze/KSchG/1.html',
    art: 'gesetz',
  },
  {
    text: '§ 23 KSchG — Geltungsbereich (Schwellenwert)',
    url: 'https://dejure.org/gesetze/KSchG/23.html',
    art: 'gesetz',
  },
  {
    text: '§ 14 KSchG — Anwendung auf Organmitglieder',
    url: 'https://dejure.org/gesetze/KSchG/14.html',
    art: 'gesetz',
  },
  {
    text: '§ 4 KSchG — 3-Wochen-Klagefrist',
    url: 'https://dejure.org/gesetze/KSchG/4.html',
    art: 'gesetz',
  },
  {
    text: 'BAG 24.02.2005 – 2 AZR 373/03 — Regelmäßige Beschäftigtenzahl (Rückblick + Prognose)',
    url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=24.02.2005&Aktenzeichen=2%20AZR%20373%2F03',
    art: 'urteil',
  },
  {
    text: 'BAG 24.01.2013 – 2 AZR 140/12 (NZA 2013, 726) — Leiharbeitnehmer beim Schwellenwert',
    url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=24.01.2013&Aktenzeichen=2%20AZR%20140%2F12',
    art: 'urteil',
  },
  {
    text: 'BAG 21.09.2006 – 2 AZR 840/05 (NZA 2007, 438) — Verlust Kündigungsschutz Altarbeitnehmer',
    url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Datum=21.09.2006&Aktenzeichen=2%20AZR%20840%2F05',
    art: 'urteil',
  },
  {
    text: 'BAG – 2 AZR 560/20 — Gemeinschaftsbetrieb mehrerer Unternehmen (einheitlicher Leitungsapparat)',
    url: 'https://dejure.org/dienste/vernetzung/rechtsprechung?Gericht=BAG&Aktenzeichen=2%20AZR%20560%2F20',
    art: 'urteil',
  },
];

// ── Abmahnung ──────────────────────────────────────────────
export const QUELLEN_ABMAHNUNG: Quelle[] = [
  {
    text: '§ 314 BGB — Kündigung von Dauerschuldverhältnissen',
    url: 'https://www.gesetze-im-internet.de/bgb/__314.html',
    art: 'gesetz',
  },
  {
    text: '§ 83 BetrVG — Einsicht in Personalakten',
    url: 'https://www.gesetze-im-internet.de/betrvg/__83.html',
    art: 'gesetz',
  },
  {
    text: '§ 1 KSchG — Sozial ungerechtfertigte Kündigung',
    url: 'https://www.gesetze-im-internet.de/kschg/__1.html',
    art: 'gesetz',
  },
];
