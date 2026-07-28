// static/lib/fonts/fonts.css (one unified stylesheet)
// static/lib/fonts/<outDir>/ (woff files per font package)

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const FONTS_DEST = path.join(ROOT, "static", "lib", "fonts");

const FONTS = [
  {
    pkg: "@fontsource-variable/fredoka",
    sourceFamily: "Fredoka Variable", // we use it to find font subsets
    family: "Fredoka", // use it in your website
    outDir: "fredoka",
    cssFiles: ["index.css"], // css to scan, e.g. italic.css
  },
  {
    pkg: "@fontsource/maple-mono",
    sourceFamily: "Maple Mono",
    family: "Maple Mono",
    outDir: "maple-mono",
    cssFiles: ["latin.css"],
  },
  // Add your favorites here.
];

/* REF
\/\* fredoka-latin-wght-normal \*\/
@font-face {
  font-family: 'Fredoka Variable';
  font-style: normal;
  font-display: swap;
  font-weight: 300 700;
  src: url(./files/fredoka-latin-wght-normal.woff2) format('woff2-variations');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,...;
}
*/
const BLOCK_RE = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
const URL_RE = /url\((\.\/files\/[^)]+)\)/;

if (!fs.existsSync(FONTS_DEST)) fs.mkdirSync(FONTS_DEST, { recursive: true });

let cssOut = "";
let copied = 0;

for (const cfg of FONTS) {
  const pkgRoot = path.join(ROOT, "node_modules", cfg.pkg);
  const srcFiles = path.join(pkgRoot, "files");
  if (!fs.existsSync(pkgRoot)) {
    console.error(`[copy-fonts] ${cfg.pkg} not installed. Run \`npm install\` first.`);
    process.exit(1);
  }

  const destDir = path.join(FONTS_DEST, cfg.outDir);
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });

  for (const cssFile of cfg.cssFiles) {
    const srcCss = path.join(pkgRoot, cssFile);
    if (!fs.existsSync(srcCss)) continue;
    const css = fs.readFileSync(srcCss, "utf8");

    for (const match of css.matchAll(BLOCK_RE)) {
      const subsetName = match[1]; // subset name
      const blockBody = match[2]; // @font-face body

      // Skip non-latin fonts.
      // This produces small output, otherwise global access will be slow
      if (!subsetName.includes("latin")) continue;

      const urlMatch = blockBody.match(URL_RE);
      if (!urlMatch) continue;

      const woffName = path.basename(urlMatch[1]);
      fs.copyFileSync(path.join(srcFiles, woffName), path.join(destDir, woffName));
      copied++;

      // Fix URL and rename
      const newBody = blockBody
        .replace(/\.\/files\//g, `/lib/fonts/${cfg.outDir}/`)
        .replace(new RegExp(`'${cfg.sourceFamily}'`, "g"), `'${cfg.family}'`);

      cssOut += `/* ${subsetName} */\n@font-face {${newBody}}\n\n`;
    }
  }

  console.log(`[copy-fonts] ${cfg.pkg} -> ${destDir}`);
}

let FONTS_CSS_DEST = path.join(FONTS_DEST, "fonts.css");
fs.writeFileSync(FONTS_CSS_DEST, cssOut.trimEnd() + "\n");
console.log(`[copy-fonts] wrote ${FONTS_CSS_DEST}, copied ${copied} woff2 files`);
