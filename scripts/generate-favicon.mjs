import sharp from 'sharp';
import { writeFileSync } from 'fs';

const gold = '#A68B4B';
const dark = '#1A1A1A';

function createSvg(size) {
  const fontSize = Math.round(size * 0.42);
  const y = Math.round(size * 0.58);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" fill="${dark}"/>
  <text x="50%" y="${y}" text-anchor="middle" font-family="'Playfair Display','Georgia',serif" font-weight="700" font-size="${fontSize}" fill="${gold}">AL</text>
</svg>`);
}

// Generate 192x192 PNG (Apple Touch Icon)
await sharp(createSvg(192)).png().toFile('public/icon.png');
console.log('Created public/icon.png (192x192)');

// Generate 32x32 PNG then convert to ICO
const png32 = await sharp(createSvg(64)).resize(32, 32).png().toBuffer();

// ICO format: header + directory entry + PNG data
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);     // reserved
header.writeUInt16LE(1, 2);     // ICO type
header.writeUInt16LE(1, 4);     // 1 image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(32, 0);     // width
dirEntry.writeUInt8(32, 1);     // height
dirEntry.writeUInt8(0, 2);      // color palette
dirEntry.writeUInt8(0, 3);      // reserved
dirEntry.writeUInt16LE(1, 4);   // color planes
dirEntry.writeUInt16LE(32, 6);  // bits per pixel
dirEntry.writeUInt32LE(png32.length, 8);  // image size
dirEntry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

const ico = Buffer.concat([header, dirEntry, png32]);
writeFileSync('public/favicon.ico', ico);
console.log('Created public/favicon.ico (32x32)');
