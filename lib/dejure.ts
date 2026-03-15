const LAW_CODES: Record<string, string> = {
  'SGB III': 'SGB_III',
  'SGB IX': 'SGB_IX',
  'SGB II': 'SGB_II',
  BGB: 'BGB',
  ZPO: 'ZPO',
  HGB: 'HGB',
  KSchG: 'KSchG',
  GmbHG: 'GmbHG',
  AktG: 'AktG',
  ArbGG: 'ArbGG',
  BetrVG: 'BetrVG',
  GVG: 'GVG',
  UWG: 'UWG',
  InsO: 'InsO',
  StGB: 'StGB',
  GKG: 'GKG',
  RVG: 'RVG',
  TzBfG: 'TzBfG',
  MuSchG: 'MuSchG',
  AGG: 'AGG',
  BDSG: 'BDSG',
  GewO: 'GewO',
  EStG: 'EStG',
  TVG: 'TVG',
};

// Sort by key length descending so "SGB III" matches before "SGB"
const lawPattern = Object.keys(LAW_CODES)
  .sort((a, b) => b.length - a.length)
  .map((k) => k.replace(/\s/g, '\\s'))
  .join('|');

const REGEX = new RegExp(
  `(§§?)\\s*(\\d+[a-z]?)(?:\\s+Abs\\.\\s*\\d+)?\\s+(${lawPattern})`,
  'g',
);

export interface DejureSegment {
  type: 'text' | 'link';
  content: string;
  href?: string;
}

export function parseDejure(text: string): DejureSegment[] {
  const segments: DejureSegment[] = [];
  let lastIndex = 0;

  REGEX.lastIndex = 0;
  let match;
  while ((match = REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    const paragraph = match[2];
    const rawLaw = match[3].replace(/\s+/g, ' ');
    const dejurePath = LAW_CODES[rawLaw] ?? rawLaw;

    segments.push({
      type: 'link',
      content: match[0],
      href: `https://dejure.org/gesetze/${dejurePath}/${paragraph}.html`,
    });

    lastIndex = REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}
