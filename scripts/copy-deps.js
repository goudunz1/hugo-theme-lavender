// Copies third-party dependencies for self-hosting (when `useCdn` is false):
//   - non-minified CSS/JS -> assets/lib/{css,js}  (Hugo minifies + fingerprints at build time)
//   - woff2 font files    -> static/lib/fonts/

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const ASSETS_LIB_CSS = path.join(ROOT, "assets", "lib", "css");
const ASSETS_LIB_JS = path.join(ROOT, "assets", "lib", "js");
const STATIC_LIB_FONTS = path.join(ROOT, "static", "lib", "fonts");

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

const getPkgRoot = (pkg) => path.join(ROOT, "node_modules", pkg);

// Installed version of a package, e.g. pkgVersion("@fontsource-variable/fredoka") -> "5.2.10".
// Baked into the rewritten woff2 URLs as a ?v= query so upgrading the package changes
// the URL and busts stale browser caches (the woff2 files themselves are not fingerprinted).
const getPkgVersion = (pkg) => JSON.parse(fs.readFileSync(path.join(getPkgRoot(pkg), "package.json"), "utf8")).version;

// src: url(./files/<name>.woff2) format("woff2");
const WOFF2_URL_RE =
  /^\s*src:\s*url\(['"]?(\.[\/\w._-]*\/)?([\w._-]+\.woff2)[^'")]*['"]?\)\s*format\(['"]([\w-]+)['"]\).*;\s*$/gm;

function copyFonts({ pkg, cssIn, cssOut, fontOutDir }) {
  const pkgRoot = getPkgRoot(pkg);

  if (!fs.existsSync(pkgRoot)) {
    console.error(`[copy-deps] ${pkg} not installed. Run \`npm install\` first.`);
    process.exit(1);
  }

  const version = getPkgVersion(pkg);

  // Copy every referenced woff2 -> static/lib/fonts/<outDir>/
  const fontDest = path.join(STATIC_LIB_FONTS, fontOutDir);
  fs.rmSync(fontDest, { recursive: true, force: true });
  ensureDir(fontDest);

  const cssFile = path.join(pkgRoot, cssIn);
  const cssDir = path.dirname(cssFile);
  let css = fs.readFileSync(cssFile, "utf8");

  // Rewrite font URLs to site-root paths (version-tagged for cache busting) and strip the woff/ttf fallbacks.
  const seen = new Set();
  css = css.replace(WOFF2_URL_RE, function (match, dirname, name, format) {
    if (!seen.has(name)) {
      seen.add(name);
      if (dirname) {
        fs.copyFileSync(path.join(cssDir, dirname, name), path.join(fontDest, name));
      } else {
        fs.copyFileSync(path.join(cssDir, name), path.join(fontDest, name));
      }
    }
    return `src: url(/lib/fonts/${fontOutDir}/${name}?v=${version}) format("${format}");`;
  });

  if (seen.size == 0) {
    console.warn(`[copy-deps] no woff2 fonts detected in ${pkg}, the output may be wrong!`);
  }

  ensureDir(ASSETS_LIB_CSS);
  const cssDest = path.join(ASSETS_LIB_CSS, cssOut);
  fs.writeFileSync(cssDest, css);

  console.log(`[copy-deps] ${pkg} -> ${cssDest}, ${fontDest}/ (${seen.size} woff2)`);
}

function copyJs({ pkg, jsIn, jsOut }) {
  const pkgRoot = getPkgRoot(pkg);

  if (!fs.existsSync(pkgRoot)) {
    console.error(`[copy-deps] ${pkg} not installed. Run \`npm install\` first.`);
    process.exit(1);
  }

  const jsFile = path.join(pkgRoot, jsIn);

  ensureDir(ASSETS_LIB_JS);
  const jsDest = path.join(ASSETS_LIB_JS, jsOut);
  fs.copyFileSync(jsFile, jsDest);

  console.log(`[copy-deps] ${pkg} -> ${jsDest}`);
}

// Maple Mono
copyFonts({
  pkg: "@fontsource/maple-mono",
  cssIn: "latin.css",
  cssOut: "maple-mono.css",
  fontOutDir: "maple-mono",
});

// Fredoka Variable
copyFonts({
  pkg: "@fontsource-variable/fredoka",
  cssIn: "wght.css",
  cssOut: "fredoka-variable.css",
  fontOutDir: "fredoka-variable",
});

// Tabler Icons
copyFonts({
  pkg: "@tabler/icons-webfont",
  cssIn: "dist/tabler-icons.css",
  cssOut: "tabler-icons.css",
  fontOutDir: "tabler-icons",
});

// MiniSearch
copyJs({
  pkg: "minisearch",
  jsIn: "dist/umd/index.js",
  jsOut: "minisearch.js",
});
