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
