<h1 style="display: flex; align-items: center; gap: 0.6em;">
  <img src="static/favicon.svg" alt="" width="64" height="64" />
  Hugo Theme Lavender
</h1>

A sidebar-driven Hugo blog theme with switchable light / dark palettes,
built with **Tailwind CSS v4** and **Tabler Icons**.
Drop it into your site, build its assets once with npm, and you're ready to go.

It requires minimum Hugo version **0.146.0**.

**NOTE:** This project is in active development, take care of new features and bug fixes.

---

## Features

- **Two WCAG-AA palettes**, switchable in-page and persisted in `localStorage`.
  Body and muted text colors pass WCAG AA contrast in both palettes.
  - Light: white base, near-black text, gray subtext, **green** accent.
  - Dark: near-black base, white text, gray subtext, **purple** accent.
- **No-FOUC palette bootstrap**: an inline script in `<head>` restores the saved
  palette before `<body>` renders, so there is no flash on navigation.
- **Left sidebar rail** (avatar → icon menu → theme toggle) with an expanding
  active-item highlight; below 900 px it collapses into a slide-in drawer with
  hamburger button and scrim.
- **Home page**: large centered avatar with hover depth, bio, social icons.
- **Single post**: two-column layout — article on the left, category/tag chips
  and a **sticky** table of contents on the right. Prev/next navigation,
  floating back-to-top button, and a TOC scrollspy.
- **Posts list** and **term pages**: entries grouped by year, fixed-height
  cards, numbered pagination with prev/next arrows.
- **Taxonomies**: tags as a paginated inline cloud; categories as an expanded
  list grouped by category (uncategorized posts get their own pseudo-category).
- **Special pages**: `about` (hero + accordion of `params.aboutItems`), `links`
  (friend-site cards from `params.friends`), `search` (client-side full-text
  search over a build-time `index.json` via MiniSearch), and a styled 404.
- **Math**: MathJax 4 loaded per page (only when `math: true`), with optional
  `$...$` inline delimiters.
- **Code**: hand-written Chroma syntax theme matching both palettes.
- **Optional CDN / self-hosted deps** (`useCdn`): Tabler Icons, the Fredoka and
  Maple Mono fonts, and MiniSearch are served from jsDelivr by default; set
  `useCdn = false` to self-host them from `assets/lib/` + `static/lib/` (built
  with `npm run build:selfhost`). No third-party CDN other than these and MathJax
  on math pages.
- **Fuzz-tested**: ships with a 50-post fuzz site plus config variants that
  exercise every Markdown feature, math delimiters, the Chroma highlight matrix,
  taxonomy stress patterns and boundary params (see [Fuzz testing](#fuzz-testing)).
- **Responsive**: fluid type and avatar sizes via `clamp()`; sidebar/desktop
  switch at 900 px.

---

## Quick start

The theme's compiled assets (`assets/css/theme.css`, `assets/lib/`, `static/lib/`)
are **git-ignored build artifacts**, so after cloning you must build them with
Node/npm.

1. Drop the theme into your Hugo site:

   ```bash
   git clone <repo-url> themes/lavender
   ```

2. Build the theme's assets (requires Node; everything installs locally inside
   the theme folder):

   ```bash
   cd themes/lavender
   npm install
   npm run build          # generates theme.css
   npm run build:selfhost # only needed if you self-host (useCdn = false)
   cd -
   ```

   The default `useCdn = true` setup only needs `theme.css`; the `build:selfhost`
   step (vendor CSS/JS to `assets/lib/`, fonts to `static/lib/`) is for sites
   that want to avoid the CDN.

3. Enable and configure it in your site's `hugo.toml`:

   ```toml
   theme = "lavender"

   [params]
     blogName = "My Blog"
     author   = "Me"
     avatar   = "/avatar.png"        # a file under static/, or a URL
     intro    = "Welcome to my blog."
     themeDefault = "auto"           # "light" | "dark" | "auto"

     [[params.social]]
       name = "GitHub"
       icon = "brand-github"         # any Tabler Icons name
       url  = "https://github.com/you"

   [[menus.main]]
     name = "Home"
     pageRef = "/"
     weight = 10
     params = { icon = "home" }
   # ...Posts / Tags / Categories / About / Links / Search
   ```

4. Build your site as usual:

   ```bash
   hugo server
   ```

> **Tip**: copy the `[params]`, `[[menus.main]]`, `[markup]` and `[outputs]`
> blocks from this theme's own [`hugo.toml`](./hugo.toml) into your site config
> and tweak them. The theme config acts as a set of defaults: `[params]` is
> deep-merged and `[menus]` is shallow-merged with your site config.

---

## Configuration

All options live under `[params]` unless noted otherwise.

### Site params

| param                 | default      | description                                                      |
| --------------------- | ------------ | ---------------------------------------------------------------- |
| `blogName`            | site title   | Branding on the home hero and the sidebar avatar tooltip         |
| `author`              | `"Author"`   | Fallback author for posts that don't set one                     |
| `avatar`              | `""`         | Avatar image path (relative to site root) or URL; hidden if empty |
| `intro`               | `""`         | Bio shown under the home avatar                                  |
| `themeDefault`        | `"auto"`     | Initial palette: `"light"`, `"dark"` or `"auto"` (OS preference) |
| `backToTop`           | `true`       | Show the floating back-to-top button                             |
| `tableOfContents`     | `true`       | Show the sticky TOC on posts that have headings                  |
| `faviconSvg`          | `false`      | Also link `favicon.svg` (modern SVG favicon)                     |
| `faviconPath`         | `""`         | Directory holding your favicon files, relative to `static/`      |
| `markdownInlineMath`  | `true`       | Enable `$...$` inline math delimiters (see [Math](#math-latex))  |
| `searchEnabled`       | `false`      | Enable the search page (build-time `index.json` + MiniSearch)   |
| `useCdn`              | `true`       | Serve Tabler Icons, Fredoka/Maple Mono and MiniSearch from jsDelivr; `false` self-hosts them |
| `oldBrowserNotice`    | `true`       | Show a dismissible banner for browsers missing modern CSS       |
| `seo`                 | —            | `{ description, keywords, robots, image, ogLocale, twitterCard }` |
| `pagination.posts`    | `12`         | Posts per list page; falls back to Hugo's `[pagination]` config  |
| `pagination.tags`     | `24`         | Entries per taxonomy term page                                   |
| `[[params.social]]`   | —            | `{ name, icon, url }` — social icons on home/about               |
| `[[params.aboutItems]]` | —          | `{ title, content }` — accordion entries on the about page       |
| `[[params.friends]]`  | —            | `{ name, url, avatar, desc }` — friend cards on the links page   |

### Menus

Menu entries come from `[[menus.main]]` and accept a Tabler Icons name via
`params.icon` (browse names at <https://tabler.io/icons>):

```toml
[[menus.main]]
  name = "Posts"
  pageRef = "/posts"
  weight = 20
  params = { icon = "files" }
```

### Special pages

To make Hugo generate your special page (e.g. `/about`), just put a plain
content page under `content/` and select its layout via front matter.
The theme will do the rest of the work.

```toml
+++
title = "About"
layout = "about"
+++
```

Currently supported layouts: `about`, `links`, `search`.

Note that any Markdown body of the page will be rendered below the page-specific
block (accordion, friend cards, search box).

A typical `content/` structure:

```
content/
├── _index.md
├── about.md
├── links.md
├── search.md
└── posts/
    ├── blog-A.md
    ├── blog-B.md
    └── blog-C.md
```

### Post front matter

```toml
+++
title = "My post"
author = "Me"
date = 2024-05-01T10:00:00-07:00
draft = false
description = "Shown as the card excerpt."
tags = ["foo"]
categories = ["Bar"]
math = true           # enable MathJax on this page
readingTime = true    # show "N min read" in the post header
+++
```

The post header also shows a **word count** (`{{ i18n "wordCount" }}`). Hugo
counts CJK characters and emoji as words, so Chinese/Japanese/Korean text is
counted correctly out of the box.

The default archetype in [`archetypes/default.md`](./archetypes/default.md)
scaffolds these fields for `hugo new`.

### Search

The search page (`layout = "search"`) is a client-side full-text search:

- At build time the theme emits `/index.json` (a list of `title`, `url`, `date`
  and plain-text `content` for every post in a section). It is generated only
  when `searchEnabled = true` (the file is an empty array otherwise).
- On the search page, **MiniSearch** (loaded from jsDelivr CDN, or self-hosted
  from `assets/lib/js/minisearch.js` when `useCdn = false`) indexes that JSON
  and searches as you type. The tokenizer is unicode-aware: CJK text is split
  into single characters, so `搜索` matches posts containing `搜索功能`.
- Results are rendered as post cards, six at a time, with a **Load more**
  button to reveal the next batch.

```toml
[params]
  searchEnabled = true   # + a Search menu entry pointing at /search
```

### Internationalization

The theme ships `i18n/en.toml` and `i18n/zh-Hans.toml` for the strings it
renders (word count, reading time, search status, back-to-top, old-browser
notice, pagination). The default single-language site uses `en.toml`; add your
own `i18n/<lang>.toml` to translate. For a Chinese site:

```toml
defaultContentLanguage = "zh-Hans"
[languages.zh-Hans]
  languageCode = "zh-Hans"
  title = "我的博客"
```

### SEO

A lightweight SEO framework is emitted on every page — a description (from
`description` front matter, falling back to `params.seo.description`), keywords,
robots, canonical link, Open Graph, Twitter Card, and JSON-LD (`WebSite` on the
home page, `BlogPosting` on posts). Fields the theme cannot guess are left empty
until you fill them in:

```toml
[params.seo]
  description = "My blog about X."
  keywords = ["hugo", "blog"]
  robots = "index, follow"
  image = "/og-image.png"
  ogLocale = "en_US"
  twitterCard = "summary_large_image"
```

### Math (LaTeX)

Math is rendered by **MathJax 4** (loaded from the jsDelivr CDN) and only on
pages that opt in with `math: true` in front matter, so non-math pages never
pay the cost. The theme
configures the Goldmark passthrough delimiters to match:

```toml
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block  = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)'], ['$', '$']]
```

MathJax can take a moment to typeset on first load — that's normal.

#### A note on dollar signs

Offline Markdown editors (e.g. Obsidian) treat `\$` as an escaped dollar sign.
Hugo, however, processes Markdown escapes *before* emitting HTML, and MathJax
runs on that HTML — so a standalone dollar sign needs a **double escape** in
Hugo source for MathJax to see the backslash:

```markdown
I'll give you \\$1 if you can resolve $x+1=2$.
```

A single `\$` is more portable across editors, but if an inline `$...$` math
block and a `\$` appear on the same line, rendering breaks — use a `$$...$$`
block or double-escape in that situation.

If you'd rather not deal with this, disable dollar-delimited inline math and
stick to `\(...\)`:

```toml
[params]
  markdownInlineMath = false
[markup.goldmark.extensions.passthrough.delimiters]
  inline = [['\(', '\)']]
```

### Syntax highlighting

The theme sets `[markup.highlight] noClasses = false`, so Chroma emits class
names styled by [`assets/css/syntax.css`](./assets/css/syntax.css), a
hand-written theme whose colors track the light/dark palettes. If you prefer
inline colors, set `noClasses = true` in your own config and remove the
`syntax.css` link from `layouts/_partials/head/css.html`.

`[markup.tableOfContents]` defaults to `startLevel = 2`, `endLevel = 4`.

### Favicon

Overwrite the standard favicon files — `favicon.ico`, `favicon-16x16.png`,
`favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`,
`android-chrome-512x512.png` — and put them in a directory under `static/`.
They are trivial to generate with an online tool such as
[favicon.io](https://favicon.io/favicon-converter/). Then point the theme at
them:

```toml
[params]
  faviconPath = "/"        # directory under static/, "/" = static root
  faviconSvg = true        # also link favicon.svg from the same directory
```

---

## Building your site

No theme-specific tooling is involved; use plain Hugo commands:

```bash
# Local development with live reload (serves unminified assets for debugging)
hugo server

# Production build into public/, minifying the HTML output
hugo --minify

# Recommended for deployment: also prune stale build caches
hugo --gc --minify
```

Regardless of `--minify`, the theme's CSS/JS assets are minified and
fingerprinted automatically whenever the build is not a development server (see
the next section).

Note that the theme's `hugo.toml` sets `[outputs] home = ["HTML", "JSON"]`, which
disables the default RSS output for the home page and adds the `/index.json`
search index. Re-add `"RSS"` there (or in your site config) if you want a feed.

---

## Fuzz testing

The [`fuzz/`](./fuzz/) directory is a deterministic test site that turns this
repository root into a Hugo project (the theme's own `layouts/`, `assets/` and
`static/` are used directly) with swapped-in content and config:

- **50 posts** covering: empty/front-matter-only posts, every Markdown feature
  (headings, lists, tables, blockquotes, code, links, special characters), math
  in all delimiter styles (including escaped dollars and CJK), code
  highlighting options (`hl_lines`, `linenostart`, diffs, long lines, many
  languages), and edge cases (long Latin/CJK/RTL text, emoji overload, deep
  nesting, wide tables, HTML-heavy bodies).
- **Config variants** that merge on top of `fuzz/config/_base.toml`:
  a Chroma highlight matrix (`lineNos` on/off/inline, anchors, `noClasses`,
  `hl_lines`), boundary params (empty avatar/blogName/author, disabled
  TOC/back-to-top, `pagination.tags = 1` forcing pagination everywhere), and
  `markdownInlineMath = false`.

Run it from the repository root:

```bash
# Baseline build
hugo --config fuzz/config/_base.toml --buildDrafts

# Merge in one or more variants (later files override earlier ones)
hugo --config fuzz/config/_base.toml,fuzz/config/highlight-lineNos-on.toml --buildDrafts

# Server mode
hugo server --config fuzz/config/_base.toml --buildDrafts --disableFastRender
```

See [`fuzz/README.md`](./fuzz/README.md) for the full variant matrix and
content summary. When you change templates or styles, build the fuzz site under
a few variants to catch rendering regressions.

---

## Project structure

```
hugo-theme-lavender/
├── hugo.toml                 # Theme defaults: params, menus, markup, outputs
├── package.json              # Local dev deps + build/watch scripts
├── .prettierrc.json          # Prettier: go-template + tailwindcss plugins
├── archetypes/
│   └── default.md            # Front matter scaffold for `hugo new`
│
├── assets/                   # Processed by Hugo's asset pipeline
│   ├── css/
│   │   ├── src/input.css     # ★ Tailwind v4 source (tokens + components)
│   │   ├── theme.css         # ★ Generated Tailwind output (git-ignored)
│   │   └── syntax.css        # Hand-written Chroma theme for both palettes
│   ├── js/
│   │   ├── main.js           # All client behavior (framework-free ES5)
│   │   └── search.js         # Search page: MiniSearch wiring (search page only)
│   └── lib/                  # ★ Copied by `npm run build:selfhost` (git-ignored)
│       ├── css/              # Non-min vendor CSS, minified/fingerprinted by Hugo:
│       │   ├── tabler-icons.css       #   Tabler Icons webfont
│       │   ├── fredoka-variable.css   #   Fredoka Variable @font-face
│       │   └── maple-mono.css         #   Maple Mono @font-face
│       └── js/
│           └── minisearch.js # MiniSearch UMD (self-host mode)
│
├── layouts/
│   ├── baseof.html             # Shell: <head> + sidebar + main + footer + back-to-top
│   ├── home.html               # Home hero (avatar, bio, social)
│   ├── single.html             # Root pages → plain; posts → article + sticky TOC
│   ├── section.html            # Posts grouped by year + pagination
│   ├── taxonomy.html           # Categories expanded / tags cloud
│   ├── term.html               # One tag/category: posts grouped by year
│   ├── 404.html                # Styled not-found page
│   ├── index.json              # Search index (title/url/date/content per post)
│   ├── _default/
│   │   ├── about.html          # Hero + aboutItems accordion
│   │   ├── links.html          # friends card grid
│   │   └── search.html         # Search page (MiniSearch over index.json)
│   └── _partials/
│       ├── head.html           # <meta>, favicons, <title>, palette + feature detection
│       ├── head/css.html       # theme.css + syntax.css (minified/fingerprinted in prod)
│       ├── head/js.html        # main.js (deferred, minified/fingerprinted in prod)
│       ├── head/seo.html       # SEO meta + Open Graph/Twitter/JSON-LD framework
│       ├── sidebar.html        # Rail: avatar + menu + theme toggle; burger + scrim
│       ├── sidebar-menu.html   # Renders menus.main with active-state highlight
│       ├── avatar.html         # Big avatar (home/about)
│       ├── social.html         # Social icon row
│       ├── chips.html          # Category/tag chip links (post sidebar)
│       ├── separator.html      # Year-group separator on list pages
│       ├── post-card.html      # A single fixed-height list card
│       ├── post-cards.html     # Card grid wrapper
│       ├── post-nav.html       # Previous/Next post links
│       ├── pagination.html     # Numbered pagination + prev/next arrows + jump-to-page
│       ├── math.html           # Conditional MathJax snippet
│       ├── search-scripts.html # Injects search.js (deferred, minified/fingerprinted)
│       ├── head/vendor-css.html # Emits a self-hosted vendor CSS <link> (useCdn = false)
│       └── footer.html         # Gradient separator + copyright
│
├── static/
│   └── lib/                    # ★ Copied by `npm run build:selfhost`, served verbatim (git-ignored)
│       ├── tabler-icons/       # tabler-icons.woff2
│       ├── fredoka-variable/   # Fredoka Variable woff2 (hebrew/latin-ext/latin)
│       └── maple-mono/         # Maple Mono woff2 (latin 100–800)
│
├── scripts/
│   └── copy-deps.js            # node_modules → assets/lib + static/lib (build:selfhost)
│
├── fuzz/                       # Fuzz test site (content + config variants)
│   ├── content/                # 50 fuzz posts + about/links/search pages
│   ├── config/                 # _base.toml + 9 mergeable variants
│   └── README.md               # Fuzz documentation
│
├── data/                       # Reserved (empty)
└── i18n/                       # en.toml + zh-Hans.toml (theme strings)
```

The `fuzz/` site doubles as the development playground — there is no separate
`exampleSite/`; build or serve the fuzz configs to preview changes.

★ = generated artifact — git-ignored, produced by `npm run build` (see
Development).

---

## Development

The asset build is required at least once after cloning — the compiled files
are git-ignored — and again whenever you edit Tailwind classes, the source
stylesheet, or bump the vendored packages. Everything is **local** to this
folder — nothing is installed globally.

```bash
npm install          # one-time: tailwindcss, tabler icons, fonts, prettier
npm run build        # theme.css (Tailwind)
npm run build:selfhost  # optional: copy vendor deps for useCdn = false
npm run watch        # rebuild theme.css on every change
npm run clean        # remove theme.css + the self-hosted copies
```

| script            | what it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `build:tailwind`  | `tailwindcss -i assets/css/src/input.css -o assets/css/theme.css`   |
| `build:selfhost`  | `node scripts/copy-deps.js` → non-min vendor CSS/JS to `assets/lib/`, woff2 to `static/lib/` |

`npm run build` only produces `theme.css` — that's all a `useCdn = true` site
needs. Only run `build:selfhost` when you self-host (`useCdn = false`): it copies
the Tabler Icons / Fredoka / Maple Mono / MiniSearch vendor files that Hugo then
minifies, fingerprints and serves.

> When you bump a vendored package (`@tabler/icons-webfont`, `@fontsource-*`,
> `minisearch`), re-run `npm run build:selfhost` **and** update the pinned CDN
> URLs in `layouts/_partials/head/css.html` / `layouts/_default/search.html`
> (the version in each jsDelivr link).

### Coding principles and style

- **Go template whitespace control**: actions that *emit content* use plain
  `{{ ... }}` with no dashes; *pure control* actions — `if`, `range`, `with`,
  `define`, variable assignments, `end`, comments — start with `{{-` to trim
  the preceding whitespace:

  ```go-template
  {{- if $avatar }}
    <img src="{{ $avatar | relURL }}" alt="{{ $blogName }}" />
  {{- end }}
  ```

  This keeps rendered HTML free of stray blank lines without collapsing
  whitespace that is meaningful around inline output.
- **Formatting is automated.** Prettier (with `prettier-plugin-go-template` for
  `layouts/**/*.html` and `prettier-plugin-tailwindcss`) enforces the style —
  120-column width, `bracketSameLine`. Run `npx prettier --write .` before
  committing; don't hand-format around it.
- **Defensive templates.** Every param lookup has a `| default ...` fallback so
  a missing config key degrades gracefully instead of breaking the build — the
  fuzz site's `params-boundary` variant exists to keep this honest.
- **CSS architecture**: design tokens are CSS custom properties on
  `:root` / `.dark`, bridged into Tailwind via `@theme` in `input.css`;
  component classes live in `@layer components` and follow BEM-ish naming
  (`block`, `block__element`, `block--modifier`, e.g. `sidebar-card__icon`,
  `accordion--open`). The sidebar/desktop switch is a custom `sidebar:` variant
  at 900 px. No fancy CSS — flexbox, grid, transforms and transitions only.
- **JavaScript**: a single framework-free, ES5-compatible IIFE
  (`assets/js/main.js`) — `var`, `function`, and
  `Array.prototype.slice.call(...)` instead of modern syntax, no build step,
  every feature guarded by DOM existence checks.
- **Git-ignored artifacts**: `theme.css` and `static/lib/**` are never
  committed; run `npm run build` after cloning and after touching `input.css`
  or the vendored packages.
---

### Built for a static site, not a SPA

A Hugo blog is a multi-page site: every navigation is a full document load, and
there is no client-side runtime to keep state or share code between pages. The
theme's CSS/JS loading strategy is shaped by that:

- **Palette restore must happen before `<body>` renders.** Since state can't
  survive navigation in memory, the palette is persisted in
  `localStorage["theme-palette"]` and re-applied by a tiny **inline blocking
  script in `<head>`** ([`head.html`](./layouts/_partials/head.html)) on every
  page. Doing it in an external, deferred script would flash the wrong theme.
- **`main.js` is deferred and page-agnostic.** It is loaded once per page with
  `defer` ([`head/js.html`](./layouts/_partials/head/js.html)) and every feature
  is guarded by an existence check, so one bundle serves all page types.
- **Minify + fingerprint only in production.** `theme.css`, `syntax.css` and
  `main.js` are piped through `minify | fingerprint` (with SRI `integrity`)
  unless `hugo.IsDevelopment`, so `hugo server` gives you readable files while
  deployed sites get cache-busting hashes.
- **Conditional heavy assets.** MathJax is only included on pages with
  `math: true`; it is never loaded site-wide.
- **CDN or self-hosted vendor assets.** Third-party deps (Tabler Icons, the
  Fredoka/Maple Mono fonts, MiniSearch) load from jsDelivr when `useCdn = true`
  (default). With `useCdn = false` they self-host: the non-minified CSS/JS are
  copied into `assets/lib/` (minified + fingerprinted by Hugo, so they are only
  published when referenced) and the woff2 fonts into `static/lib/` (served
  verbatim).
- **Per-site caching.** Head asset partials are rendered through
  `partialCached`, because their output is identical on every page.

---

### `main.js` reference

`assets/js/main.js` wires up all client-side behavior. It is written so you can
reuse its hooks when customizing the theme — define the documented ids/classes
and the script picks them up automatically.

#### Theme palette switch

- Palettes are selected by the `.dark` class on the root `<html>` element.
- Define a button with id `theme-toggle` to toggle it; the choice is persisted
  to `localStorage["theme-palette"]`.
- Because Hugo sites are multi-page, the saved palette must be re-applied on
  every load *before* `<body>` renders to avoid a flash of the wrong theme.
  That part is deliberately **not** in `main.js` — see the inline script in
  [`head.html`](./layouts/_partials/head.html) for the bootstrap; `main.js`
  only handles the click.

#### Sidebar drawer

Four ways the drawer state changes: clicking `#sidebar-burger` toggles it;
clicking `#sidebar-scrim` or any `<a>` inside `#sidebar` always closes it; and
it auto-closes when the viewport grows past 900 px.

- `#sidebar-burger` may contain a `#sidebar-burger-icon` element, whose icon is
  swapped between `ti-list` (☰) and `ti-x` (✕) as the drawer opens/closes.
- `.sidebar--open` is applied to `#sidebar` — CSS translates the drawer in/out.
- `.sidebar-open` is applied to `<body>` — CSS disables body scrolling so only
  the sidebar scrolls while it's open.
- `#sidebar-scrim` is the semi-transparent overlay behind the drawer; define it
  if you want the overlay effect.

#### Back to top

A `#back-to-top` button scrolls smoothly to the top on click. The class
`back-to-top--show` is toggled on it once the user has scrolled 400 px — there
is no point showing it at the top of the page — so hook your show/hide styles
onto that class.

#### TOC scrollspy

Hugo's table of contents is displayed inside `.post-toc`; the link for the
section currently being read gets the class `toc-link--active` — select
`a.toc-link--active` to style the reading position. A heading counts as
"current" when its top edge passes a threshold at 25 % of the viewport height.
Scroll handling is throttled with `requestAnimationFrame` (at most one update
per frame), and the heading map is rebuilt on the window `load` event in case
late-loading images or fonts shifted the layout.

#### Accordion

Each `.accordion` element pairs an `.accordion-head` (clickable title) with an
`.accordion-body` (collapsible content). Clicking the head toggles the body by
setting its inline `maxHeight` (to `scrollHeight` when opening, `0` when
closing), so animations should target the `max-height` property. An accordion
can detect its own state via the `.accordion--open` class on itself.

---

## License

GPL v3 — see [LICENSE](./LICENSE).
