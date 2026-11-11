#!/usr/bin/env node
/**
 * IndexNow-Submission für gekuendigt-abfindung.de.
 *
 * Reicht eine URL-Liste bei https://api.indexnow.org/indexnow ein. Der Key
 * muss unverändert als Textdatei unter https://www.gekuendigt-abfindung.de/<KEY>.txt
 * ausgespielt werden (siehe public/<KEY>.txt). Ohne diese Datei lehnt
 * IndexNow die Submission als "unverified" ab.
 *
 * Usage (per Deploy-Hook oder manuell):
 *   node scripts/indexnow-submit.mjs                       # pusht alle URLs aus der Sitemap
 *   node scripts/indexnow-submit.mjs url1 url2 ...         # pusht nur die übergebenen URLs
 *
 * Environment:
 *   INDEXNOW_KEY   — 32-stelliger Hex-Key (Fallback: Datei .indexnow-key)
 *   INDEXNOW_HOST  — Zielhost (Fallback: www.gekuendigt-abfindung.de)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { URL } from 'node:url';

const HOST = process.env.INDEXNOW_HOST ?? 'www.gekuendigt-abfindung.de';
const KEY = process.env.INDEXNOW_KEY ?? discoverKey();
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BATCH = 10_000; // IndexNow erlaubt bis 10.000 URLs pro Request

/**
 * Findet den IndexNow-Key automatisch – in dieser Reihenfolge:
 *  1. `.indexnow-key` (lokale Dev-Datei, in .gitignore)
 *  2. 32-stellige Hex-Datei unter `public/<KEY>.txt` (die Datei, die
 *     Bing/Yandex sowieso zur Verifikation lesen – wird mit deployt)
 * Der Key ist bewusst öffentlich (wer ihn hat, kann nur unsere eigene
 * Sitemap anpingen), also kein Secret-Management nötig.
 */
function discoverKey() {
  try {
    return readFileSync('.indexnow-key', 'utf8').trim();
  } catch {
    // weiter mit public/-Scan
  }
  try {
    const files = readdirSync('public');
    const match = files.find((f) => /^[a-f0-9]{32}\.txt$/i.test(f));
    if (match) {
      return readFileSync(`public/${match}`, 'utf8').trim();
    }
  } catch {
    // weiter mit Fehlermeldung
  }
  console.error('[indexnow] Kein Key gefunden — weder .indexnow-key noch public/<hex>.txt noch INDEXNOW_KEY env gesetzt.');
  process.exit(1);
}

async function loadUrlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`sitemap fetch failed: ${res.status}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim()).filter(Boolean);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

async function submit(urls) {
  if (urls.length === 0) {
    console.log('[indexnow] keine URLs — nichts zu tun.');
    return;
  }
  for (const batch of chunk(urls, BATCH)) {
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`[indexnow] ${batch.length} URLs → ${res.status} ${res.statusText}`);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[indexnow] Fehlerdetail: ${text}`);
    }
  }
}

async function main() {
  const explicit = process.argv.slice(2).filter(Boolean);
  const urls = explicit.length > 0 ? explicit : await loadUrlsFromSitemap();
  // Nur URLs akzeptieren, die zum angegebenen Host gehören – alles andere
  // würde die Submission für die ganze Charge verwerfen.
  const filtered = urls.filter((u) => {
    try {
      return new URL(u).hostname === HOST;
    } catch {
      return false;
    }
  });
  console.log(`[indexnow] key=${KEY.slice(0, 6)}… host=${HOST} urls=${filtered.length}`);
  await submit(filtered);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
