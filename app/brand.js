/* Creates a branded "Polymark Desk.exe" beside electron.exe (Windows only).
   Re-run after npm install or an Electron update: node brand.js */
"use strict";
if (process.platform !== "win32") { console.log("brand: Windows only, skipping"); process.exit(0); }
const fs = require("node:fs");
const path = require("node:path");
const src = path.join(__dirname, "node_modules", "electron", "dist", "electron.exe");
const dst = path.join(__dirname, "node_modules", "electron", "dist", "Polymark Desk.exe");
fs.copyFileSync(src, dst);
const m = require("rcedit");
const rcedit = m.default || m;
rcedit(dst, {
  icon: path.join(__dirname, "assets", "icon.ico"),
  "version-string": { ProductName: "Polymark Desk", FileDescription: "Polymark Desk", CompanyName: "Polymark" },
  "product-version": "0.1.0"
}).then(() => console.log("branded:", dst)).catch((e) => { console.error("rcedit failed:", e.message); process.exit(1); });
