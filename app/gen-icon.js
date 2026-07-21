/* Generates assets/tray.png (32x32) and assets/icon.png (256x256):
   a brass rounded square with a dark "P". Pure Node, no dependencies. */
"use strict";
const zlib = require("node:zlib");
const fs = require("node:fs");
const path = require("node:path");

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/* Draw: brass rounded rect, dark P glyph scaled from a 8x10 bitmap */
const P_GLYPH = [
  "111110",
  "111111",
  "110011",
  "110011",
  "111111",
  "111110",
  "110000",
  "110000",
  "110000",
  "110000"
];

function makePng(size) {
  const px = Buffer.alloc(size * size * 4); // RGBA
  const r = size * 0.22; // corner radius
  const brass = [201, 163, 92], dark = [20, 16, 10];
  const gw = P_GLYPH[0].length, gh = P_GLYPH.length;
  const scale = (size * 0.55) / gh;
  const gx0 = (size - gw * scale) / 2 + size * 0.02, gy0 = (size - gh * scale) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // rounded-rect mask
      const cx = Math.max(r - x, x - (size - 1 - r), 0);
      const cy = Math.max(r - y, y - (size - 1 - r), 0);
      const inside = cx * cx + cy * cy <= r * r;
      const i = (y * size + x) * 4;
      if (!inside) continue;
      let col = brass;
      const gx = Math.floor((x - gx0) / scale), gy = Math.floor((y - gy0) / scale);
      if (gy >= 0 && gy < gh && gx >= 0 && gx < gw && P_GLYPH[gy][gx] === "1") col = dark;
      px[i] = col[0]; px[i + 1] = col[1]; px[i + 2] = col[2]; px[i + 3] = 255;
    }
  }
  // scanlines with filter byte 0
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

/* Windows .ico: BMP DIB entries for 16/32/48 + PNG entry for 256 */
function makePixels(size) {
  // re-render just the RGBA pixel buffer (same drawing as makePng)
  const px = Buffer.alloc(size * size * 4);
  const r = size * 0.22;
  const brass = [201, 163, 92], dark = [20, 16, 10];
  const gw = P_GLYPH[0].length, gh = P_GLYPH.length;
  const scale = (size * 0.55) / gh;
  const gx0 = (size - gw * scale) / 2 + size * 0.02, gy0 = (size - gh * scale) / 2;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const cx = Math.max(r - x, x - (size - 1 - r), 0);
    const cy = Math.max(r - y, y - (size - 1 - r), 0);
    if (cx * cx + cy * cy > r * r) continue;
    const i = (y * size + x) * 4;
    let col = brass;
    const gx = Math.floor((x - gx0) / scale), gy = Math.floor((y - gy0) / scale);
    if (gy >= 0 && gy < gh && gx >= 0 && gx < gw && P_GLYPH[gy][gx] === "1") col = dark;
    px[i] = col[0]; px[i + 1] = col[1]; px[i + 2] = col[2]; px[i + 3] = 255;
  }
  return px;
}

function makeDib(size) {
  const px = makePixels(size);
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(size, 4);
  header.writeInt32LE(size * 2, 8); // XOR + AND heights
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  const xor = Buffer.alloc(size * size * 4); // bottom-up BGRA
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const src = (y * size + x) * 4;
    const dst = ((size - 1 - y) * size + x) * 4;
    xor[dst] = px[src + 2]; xor[dst + 1] = px[src + 1]; xor[dst + 2] = px[src]; xor[dst + 3] = px[src + 3];
  }
  const maskRow = Math.ceil(size / 32) * 4;
  const and = Buffer.alloc(maskRow * size); // all zero = fully visible (alpha rules)
  return Buffer.concat([header, xor, and]);
}

function makeIco() {
  const images = [
    { size: 16, data: makeDib(16) },
    { size: 32, data: makeDib(32) },
    { size: 48, data: makeDib(48) },
    { size: 256, data: makePng(256) } // PNG compression allowed at 256
  ];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e[0] = img.size === 256 ? 0 : img.size;
    e[1] = img.size === 256 ? 0 : img.size;
    e.writeUInt16LE(1, 4);  // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(img.data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const dir = path.join(__dirname, "assets");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "tray.png"), makePng(32));
fs.writeFileSync(path.join(dir, "icon.png"), makePng(256));
fs.writeFileSync(path.join(dir, "icon.ico"), makeIco());
console.log("icons written to app/assets/ (tray.png, icon.png, icon.ico)");
