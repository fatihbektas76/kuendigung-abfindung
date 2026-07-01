/**
 * E-Mail-Tippfehler-Erkennung (mailcheck-Style).
 *
 * Vergleicht die eingegebene Domain via Levenshtein-Distanz mit einer Liste
 * bekannter Provider-Domains (DE + international). Gibt einen Korrekturvorschlag
 * zurück, wenn die Domain sehr wahrscheinlich vertippt wurde
 * (z. B. "max@gmial.con" → "max@gmail.com").
 *
 * Rückgabe null = keine Korrektur nötig oder keine sinnvolle Vermutung möglich.
 */

const KNOWN_DOMAINS: readonly string[] = [
  // Google
  'gmail.com', 'googlemail.com',
  // Microsoft
  'hotmail.com', 'hotmail.de', 'outlook.com', 'outlook.de',
  'live.com', 'live.de', 'msn.com',
  // Yahoo
  'yahoo.com', 'yahoo.de', 'ymail.com',
  // Apple
  'icloud.com', 'me.com', 'mac.com',
  // AOL
  'aol.com', 'aol.de',
  // GMX / United Internet
  'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'gmx.com',
  '1und1.de', 'kabelmail.de',
  // Weitere deutsche Provider
  'web.de', 't-online.de', 'freenet.de', 'arcor.de',
  'mail.de', 'posteo.de', 'mailbox.org',
  'vodafone.de', 'o2online.de',
  // Sicherheits-/Privacy-Provider
  'protonmail.com', 'proton.me', 'tutanota.com', 'tuta.io',
  'fastmail.com', 'hey.com',
];

/**
 * Für Fälle, in denen der Domain-Präfix eindeutig ein bekannter Provider ist,
 * aber die TLD unpassend ist (z. B. "gmail.de" → "gmail.com").
 * Nur solche Präfixe, die außerhalb ihrer kanonischen TLD nicht existieren.
 */
const CANONICAL_TLD: Record<string, string> = {
  gmail: 'com',
  googlemail: 'com',
  outlook: 'com',
  hotmail: 'com',
  live: 'com',
  msn: 'com',
  icloud: 'com',
  ymail: 'com',
  fastmail: 'com',
  protonmail: 'com',
  tutanota: 'com',
  proton: 'me',
  web: 'de',
  't-online': 'de',
  freenet: 'de',
  arcor: 'de',
  '1und1': 'de',
  kabelmail: 'de',
  posteo: 'de',
  mailbox: 'org',
};

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      dp[j] =
        a.charCodeAt(i - 1) === b.charCodeAt(j - 1)
          ? prev
          : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = temp;
    }
  }
  return dp[b.length];
}

function commonPrefixLen(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++;
  return i;
}

/**
 * Berechnet einen Korrekturvorschlag oder gibt null zurück.
 * Nicht destruktiv — der Aufrufer entscheidet, ob der Vorschlag akzeptiert wird.
 */
export function suggestEmail(input: string): string | null {
  if (!input) return null;
  const email = input.trim();
  const atIdx = email.lastIndexOf('@');
  if (atIdx <= 0 || atIdx === email.length - 1) return null;

  const local = email.slice(0, atIdx);
  const rawDomain = email.slice(atIdx + 1);
  const domain = rawDomain.toLowerCase();

  if (domain.length < 4 || !domain.includes('.')) return null;
  if (domain.startsWith('.') || domain.endsWith('.')) return null;

  // Exakter Treffer → nichts zu tun.
  if (KNOWN_DOMAINS.includes(domain)) return null;

  const lastDot = domain.lastIndexOf('.');
  const domainPart = domain.slice(0, lastDot);
  const tld = domain.slice(lastDot + 1);

  // Regel A: Bekannter Provider-Präfix, aber falsche TLD.
  const canonicalTld = CANONICAL_TLD[domainPart];
  if (canonicalTld && canonicalTld !== tld) {
    return `${local}@${domainPart}.${canonicalTld}`;
  }

  // Regel B: Fuzzy-Match gegen die volle Domain.
  const threshold = domain.length >= 10 ? 3 : 2;

  let best: { candidate: string; distance: number; prefix: number } | null = null;
  for (const known of KNOWN_DOMAINS) {
    const dist = levenshtein(domain, known);
    if (dist === 0 || dist > threshold) continue;
    const prefix = commonPrefixLen(domain, known);
    if (
      !best ||
      dist < best.distance ||
      (dist === best.distance && prefix > best.prefix)
    ) {
      best = { candidate: known, distance: dist, prefix };
    }
  }

  if (best && best.candidate !== domain) {
    return `${local}@${best.candidate}`;
  }

  return null;
}
