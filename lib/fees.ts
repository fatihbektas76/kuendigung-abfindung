// RVG Anlage 2 (zu § 13 Abs. 1 Satz 3) — ab 01.06.2025 (BGBl. 2025 I Nr. 109)
const RVG_TABLE: [number, number][] = [
  [500, 51.5],
  [1000, 93],
  [1500, 134.5],
  [2000, 176],
  [3000, 235.5],
  [4000, 295],
  [5000, 354.5],
  [6000, 414],
  [7000, 473.5],
  [8000, 533],
  [9000, 592.5],
  [10000, 652],
  [13000, 707],
  [16000, 762],
  [19000, 817],
  [22000, 872],
  [25000, 927],
  [30000, 1013],
  [35000, 1099],
  [40000, 1185],
  [45000, 1271],
  [50000, 1357],
  [65000, 1456.5],
  [80000, 1556],
  [95000, 1655.5],
  [110000, 1755],
  [125000, 1854.5],
  [140000, 1954],
  [155000, 2053.5],
  [170000, 2153],
  [185000, 2252.5],
  [200000, 2352],
  [230000, 2492],
  [260000, 2632],
  [290000, 2772],
  [320000, 2912],
  [350000, 3052],
  [380000, 3192],
  [410000, 3332],
  [440000, 3472],
  [470000, 3612],
  [500000, 3752],
];

// GKG Anlage 2 (zu § 34 Abs. 1 Satz 3) — ab 01.06.2025 (BGBl. 2025 I Nr. 109)
const GKG_TABLE: [number, number][] = [
  [500, 40],
  [1000, 61],
  [1500, 82],
  [2000, 103],
  [3000, 125.5],
  [4000, 148],
  [5000, 170.5],
  [6000, 193],
  [7000, 215.5],
  [8000, 238],
  [9000, 260.5],
  [10000, 283],
  [13000, 313.5],
  [16000, 344],
  [19000, 374.5],
  [22000, 405],
  [25000, 435.5],
  [30000, 476],
  [35000, 516.5],
  [40000, 557],
  [45000, 597.5],
  [50000, 638],
  [65000, 778],
  [80000, 918],
  [95000, 1058],
  [110000, 1198],
  [125000, 1338],
  [140000, 1478],
  [155000, 1618],
  [170000, 1758],
  [185000, 1898],
  [200000, 2038],
  [230000, 2248],
  [260000, 2458],
  [290000, 2668],
  [320000, 2878],
  [350000, 3088],
  [380000, 3298],
  [410000, 3508],
  [440000, 3718],
  [470000, 3928],
  [500000, 4138],
];

function lookupFee(table: [number, number][], value: number, overflowIncrement: number): number {
  for (const [threshold, fee] of table) {
    if (value <= threshold) return fee;
  }
  // Above 500,000: increment per commenced 50,000
  const excess = value - 500000;
  const steps = Math.ceil(excess / 50000);
  return table[table.length - 1][1] + steps * overflowIncrement;
}

/** Single RVG fee (1.0) for a given Gegenstandswert */
export function getRvgFee(value: number): number {
  return lookupFee(RVG_TABLE, value, 175);
}

/** Single GKG fee (1.0) for a given Streitwert */
export function getGkgFee(value: number): number {
  return lookupFee(GKG_TABLE, value, 210);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface AttorneyFees {
  verfahrensgebuehr: number; // 1.3 × RVG
  terminsgebuehr: number; // 1.2 × RVG
  einigungsgebuehr: number; // 1.0 × RVG (only if settlement)
  pauschale: number; // 20€
  subtotalNet: number;
  vat: number; // 19%
  total: number;
}

export interface CostBreakdown {
  disputeValue: number;
  settlement: boolean;
  courtFees: number; // 3.0 × GKG (or 1.0 if settlement)
  courtFeesSaved: number; // savings from settlement
  ownAttorney: AttorneyFees;
  opposingAttorney: AttorneyFees;
  totalFirstInstance: number;
}

function calcAttorneyFees(rvgFee: number, settlement: boolean): AttorneyFees {
  const verfahrensgebuehr = round2(1.3 * rvgFee);
  const terminsgebuehr = round2(1.2 * rvgFee);
  const einigungsgebuehr = settlement ? round2(1.0 * rvgFee) : 0;
  const pauschale = 20;
  const subtotalNet = round2(verfahrensgebuehr + terminsgebuehr + einigungsgebuehr + pauschale);
  const vat = round2(subtotalNet * 0.19);
  const total = round2(subtotalNet + vat);
  return { verfahrensgebuehr, terminsgebuehr, einigungsgebuehr, pauschale, subtotalNet, vat, total };
}

export function calculateCosts(disputeValue: number, settlement: boolean): CostBreakdown {
  const gkgFee = getGkgFee(disputeValue);
  const rvgFee = getRvgFee(disputeValue);

  // Court fees: 3.0 normally, 1.0 if settlement (KV 1210/1211 GKG)
  const courtFeesNormal = round2(3.0 * gkgFee);
  const courtFees = settlement ? round2(1.0 * gkgFee) : courtFeesNormal;
  const courtFeesSaved = settlement ? round2(courtFeesNormal - courtFees) : 0;

  const ownAttorney = calcAttorneyFees(rvgFee, settlement);
  const opposingAttorney = calcAttorneyFees(rvgFee, settlement);

  const totalFirstInstance = round2(courtFees + ownAttorney.total + opposingAttorney.total);

  return {
    disputeValue,
    settlement,
    courtFees,
    courtFeesSaved,
    ownAttorney,
    opposingAttorney,
    totalFirstInstance,
  };
}
