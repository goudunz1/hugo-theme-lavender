// node_modules/bootstrap-icons/font/ -> static/lib/bootstrap-icons/

const fs = require("node:fs");
const path = require("node:path");

const src = path.resolve(__dirname, "..", "node_modules", "bootstrap-icons", "font");
const dest = path.resolve(__dirname, "..", "static", "lib", "bootstrap-icons");

if (!fs.existsSync(src)) {
  console.error("[copy-icons] bootstrap-icons not installed. Run `npm install` first.");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

for (const name of ["bootstrap-icons.css", "bootstrap-icons.min.css"]) {
  fs.copyFileSync(path.join(src, name), path.join(dest, name));
}

const fontsSrc = path.join(src, "fonts");
const fontsDest = path.join(dest, "fonts");
fs.mkdirSync(fontsDest, { recursive: true });
for (const name of fs.readdirSync(fontsSrc)) {
  fs.copyFileSync(path.join(fontsSrc, name), path.join(fontsDest, name));
}
console.log(`[copy-icons] Bootstrap Icons -> ${dest}`);
