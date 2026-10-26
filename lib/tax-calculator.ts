/**
 * Berechnet die deutsche Einkommensteuerlast auf eine Abfindung
 * mit und ohne Fünftelregelung (§ 34 EStG).
 *
 * Verwendet den Einkommensteuertarif nach § 32a EStG — Stand 2025.
 * Die Grenzwerte und Koeffizienten müssen jährlich aktualisiert werden.
 *
 * MVP-Scope: Standardfall (Arbeitseinkommen + Abfindung, einmaliger
 * Zufluss im Jahr der Abfindung). Nicht berücksichtigt:
 *  - weitere Einkünfte (Kapital, Vermietung)
 *  - Werbungskosten, Sonderausgaben, außergewöhnliche Belastungen
 *  - Progressionsvorbehalt (ALG I, Elterngeld, Krankengeld)
 *  - Zuflussprinzip bei Beendigung Jahr n und Zahlung Jahr n+1
 *
 * Diese Berechnung ist eine Orientierung, keine verbindliche Steuerermittlung.
 */

/** Einkommensteuertarif 2025 (§ 32a EStG). */
const TARIF_2025 = {
  jahr: 2025,
  grundfreibetrag: 12_096,
  zone2Start: 17_443,
  zone3Start: 68_480,
  zone4Start: 277_825,
  // Zone 1 (12.097 – 17.443 €): progressiv 14% → 24%
  zone1: { a: 932.30, b: 1400 },
  // Zone 2 (17.444 – 68.480 €): progressiv 24% → 42%
  zone2: { a: 176.64, b: 2397, c: 1015.13 },
  // Zone 3 (68.481 – 277.825 €): flach 42%
  zone3: { rate: 0.42, abzug: 10911.92 },
  // Zone 4 (ab 277.826 €): flach 45%
  zone4: { rate: 0.45, abzug: 19246.67 },
} as const;

/**
 * Berechnet die Einkommensteuer nach § 32a EStG auf ein zu versteuerndes
 * Einkommen (zvE), Grundtarif (keine Zusammenveranlagung).
 */
export function calculateIncomeTax(zvE: number): number {
  if (zvE <= TARIF_2025.grundfreibetrag) return 0;

  if (zvE <= TARIF_2025.zone2Start) {
    const y = (zvE - TARIF_2025.grundfreibetrag) / 10_000;
    return (TARIF_2025.zone1.a * y + TARIF_2025.zone1.b) * y;
  }

  if (zvE <= TARIF_2025.zone3Start) {
    const z = (zvE - TARIF_2025.zone2Start) / 10_000;
    return (TARIF_2025.zone2.a * z + TARIF_2025.zone2.b) * z + TARIF_2025.zone2.c;
  }

  if (zvE <= TARIF_2025.zone4Start) {
    return TARIF_2025.zone3.rate * zvE - TARIF_2025.zone3.abzug;
  }

  return TARIF_2025.zone4.rate * zvE - TARIF_2025.zone4.abzug;
}

/**
 * Splitting-Tarif für Ehepaare / eingetragene Lebenspartnerschaften
 * (Zusammenveranlagung). Grundlage: zvE wird halbiert, der Grundtarif
 * auf das halbe zvE angewandt, das Ergebnis verdoppelt.
 */
export function calculateIncomeTaxSplitting(zvE: number): number {
  return 2 * calculateIncomeTax(zvE / 2);
}

/** Wählt die passende Tarif-Funktion anhand des Veranlagungsstatus. */
function tarif(zvE: number, splitting: boolean): number {
  return splitting ? calculateIncomeTaxSplitting(zvE) : calculateIncomeTax(zvE);
}

/**
 * Soli-Freigrenze 2025: Soli wird nur fällig, wenn die ESt eine Freigrenze
 * übersteigt (§ 3 SolzG). Für Alleinstehende: 19.950 €. Für Zusammenveranlagung:
 * 39.900 €. Darüber bis zu einer Milderungszone, danach volle 5,5 %.
 *
 * Vereinfacht: wir nehmen das untere Ende der Milderungszone und wenden 5,5 %
 * oberhalb der Freigrenze an. Für den MVP-Scope ausreichend genau.
 */
export function calculateSoli(est: number, splitting: boolean): number {
  const freigrenze = splitting ? 39_900 : 19_950;
  if (est <= freigrenze) return 0;
  // Milderungszone: lineare Abdeckung bis zur vollen 5,5 %-Belastung
  const milderungObergrenze = splitting ? 50_000 : 33_912;
  if (est < milderungObergrenze) {
    const uebergang = (est - freigrenze) * 0.119;
    const vollerSoli = est * 0.055;
    return Math.min(uebergang, vollerSoli);
  }
  return est * 0.055;
}

/** Kirchensteuer: 8 % (BY, BW) oder 9 % (Rest). */
export function calculateChurchTax(est: number, rate: 0 | 0.08 | 0.09): number {
  return est * rate;
}

export interface NetSeveranceInput {
  /** Jahresbrutto ohne Abfindung, € */
  regularAnnualIncome: number;
  /** Abfindungshöhe (brutto), € */
  severanceGross: number;
  /** Zusammenveranlagung (Splitting) für Ehepaare / Lebenspartnerschaften */
  splitting: boolean;
  /** 0 = keine KiSt, 0.08 = BY/BW, 0.09 = alle anderen Bundesländer */
  churchTaxRate: 0 | 0.08 | 0.09;
}

export interface NetSeveranceResult {
  /** Reguläre ESt auf das Jahreseinkommen ohne Abfindung */
  regularTax: number;
  /** ESt-Last mit Fünftelregelung (§ 34 EStG) auf regular + Abfindung */
  taxWithFifthRule: number;
  /** ESt-Last ohne Fünftelregelung (nur zum Vergleich) */
  taxWithoutFifthRule: number;
  /** Marginale ESt-Last durch die Abfindung (mit Fünftelregelung) */
  severanceTax: number;
  /** Soli auf die marginale Steuerlast */
  severanceSoli: number;
  /** Kirchensteuer auf die marginale Steuerlast */
  severanceChurchTax: number;
  /** Netto-Abfindung nach allen Abzügen */
  netSeverance: number;
  /** Ersparnis durch die Fünftelregelung (positiv = Ersparnis) */
  fifthRuleSaving: number;
  /** Effektiver Steuersatz auf die Abfindung in Prozent */
  effectiveTaxRate: number;
  /** Zur Transparenz: Tarifjahr der Berechnung */
  tarifJahr: number;
}

/**
 * Hauptfunktion: berechnet die Netto-Abfindung nach ESt + Soli + KiSt
 * mit Fünftelregelung. Vergleicht zusätzlich mit der Variante ohne
 * Fünftelregelung, um die Ersparnis zu zeigen.
 */
export function calculateNetSeverance(input: NetSeveranceInput): NetSeveranceResult {
  const { regularAnnualIncome, severanceGross, splitting, churchTaxRate } = input;

  const regularTax = tarif(regularAnnualIncome, splitting);

  // Fünftelregelung § 34 EStG:
  // Steuer_mit_FR = regularTax + 5 × (Tarif(regular + Abfindung/5) − Tarif(regular))
  const fifthDelta = tarif(regularAnnualIncome + severanceGross / 5, splitting) - regularTax;
  const taxWithFifthRule = regularTax + 5 * fifthDelta;

  // Variante ohne Fünftelregelung: komplette Abfindung ins zvE
  const taxWithoutFifthRule = tarif(regularAnnualIncome + severanceGross, splitting);

  const severanceTax = taxWithFifthRule - regularTax;
  const severanceSoli = calculateSoli(taxWithFifthRule, splitting) - calculateSoli(regularTax, splitting);
  const severanceChurchTax = calculateChurchTax(severanceTax, churchTaxRate);

  const totalDeductions = severanceTax + severanceSoli + severanceChurchTax;
  const netSeverance = severanceGross - totalDeductions;
  const fifthRuleSaving = taxWithoutFifthRule - taxWithFifthRule;
  const effectiveTaxRate = severanceGross > 0 ? (totalDeductions / severanceGross) * 100 : 0;

  return {
    regularTax: Math.round(regularTax),
    taxWithFifthRule: Math.round(taxWithFifthRule),
    taxWithoutFifthRule: Math.round(taxWithoutFifthRule),
    severanceTax: Math.round(severanceTax),
    severanceSoli: Math.round(severanceSoli),
    severanceChurchTax: Math.round(severanceChurchTax),
    netSeverance: Math.round(netSeverance),
    fifthRuleSaving: Math.round(fifthRuleSaving),
    effectiveTaxRate: Math.round(effectiveTaxRate * 10) / 10,
    tarifJahr: TARIF_2025.jahr,
  };
}
