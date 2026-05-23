import { KEYWORD_RESPONSES, FALLBACK_RESPONSE, type KeywordEntry } from './keyword-responses';

interface MatchResult {
  response: string;
  toolLink?: { label: string; href: string };
  score: number;
}

/**
 * Normalisiert Text: lowercase, Umlaute aufloesen, Sonderzeichen entfernen.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Prueft ob der normalisierte Input einen Keyword-Ausdruck enthaelt.
 * Unterstuetzt auch mehrteilige Keywords wie "3 wochen".
 */
function containsKeyword(normalizedInput: string, keyword: string): boolean {
  const normalizedKeyword = normalize(keyword);
  return normalizedInput.includes(normalizedKeyword);
}

/**
 * Berechnet einen Score fuer einen KeywordEntry basierend auf der Nutzereingabe.
 * Hoehere Scores = bessere Uebereinstimmung.
 */
function scoreEntry(normalizedInput: string, entry: KeywordEntry): number {
  let matchCount = 0;
  let totalKeywordLength = 0;

  for (const keyword of entry.keywords) {
    if (containsKeyword(normalizedInput, keyword)) {
      matchCount++;
      // Laengere Keywords geben mehr Punkte (spezifischer)
      totalKeywordLength += normalize(keyword).length;
    }
  }

  if (matchCount === 0) return 0;

  // Score: Anzahl Matches * 10 + Gesamtlaenge der gematchten Keywords
  // So gewinnen spezifischere Matches (laengere Keywords, mehr Treffer)
  return matchCount * 10 + totalKeywordLength;
}

/**
 * Findet die beste Antwort fuer eine Nutzereingabe.
 */
export function findBestResponse(userInput: string): MatchResult {
  const normalizedInput = normalize(userInput);

  let bestEntry: KeywordEntry | null = null;
  let bestScore = 0;

  for (const entry of KEYWORD_RESPONSES) {
    const score = scoreEntry(normalizedInput, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore > 0) {
    return {
      response: bestEntry.response,
      toolLink: bestEntry.toolLink,
      score: bestScore,
    };
  }

  return {
    response: FALLBACK_RESPONSE,
    score: 0,
  };
}
