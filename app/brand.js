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
// resources/app loader: makes even an ARGUMENT-LESS launch of the exe load
// Polymark instead of Electron's welcome screen (Windows app-restart after
// reboot resurrects the exe without args). A plain copied loader — works on
// any filesystem, unlike junctions.
const resApp = path.join(__dirname, "node_modules", "electron", "dist", "resources", "app");
try {
  fs.mkdirSync(resApp, { recursive: true });
  fs.writeFileSync(path.join(resApp, "package.json"), JSON.stringify({ name: "polymark-loader", main: "main.js" }));
  fs.writeFileSync(path.join(resApp, "main.js"), "require(" + JSON.stringify(path.join(__dirname, "main.js")) + ");\n");
  console.log("resources/app loader ok");
} catch (e) { console.error("loader failed:", e.message); }

rcedit(dst, {
  icon: path.join(__dirname, "assets", "icon.ico"),
  "version-string": { ProductName: "Polymark Desk", FileDescription: "Polymark Desk", CompanyName: "Polymark" },
  "product-version": "0.1.0"
}).then(() => console.log("branded:", dst)).catch((e) => { console.error("rcedit failed:", e.message); process.exit(1); });
