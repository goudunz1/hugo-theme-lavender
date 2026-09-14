<h1 style="display: flex; align-items: center; gap: 0.6em;">
  <img src="static/favicon.svg" alt="" width="64" height="64" />
  Hugo Theme Lavender
</h1>

A sidebar-driven Hugo blog theme with switchable light / dark palettes, built
with Tailwind CSS v4 and Tabler Icons. It requires minimum Hugo version **0.165.0**.

Drop it into `themes/`, build its
assets once with `npm run build`, and enjoy.

**NOTE:** this project is in active development; expect new features and bug
fixes.

---

## Features

- **Light / Dark switch**: The light palette uses a green accent (`#5cbf6f`),
  the dark one a purple accent (`#a15ed1`); text and muted colors are chosen for
  WCAG AA contrast.
- **Left sidebar rail** (avatar -> icon menu -> theme toggle) with an expanding
  active-item highlight. Below 900 px it collapses into a slide-in drawer with a
  hamburger button and scrim.
- **Taxonomies**: `params.taxonomyLayout` chooses a **grid** (terms expanded
  into card groups) or a **cloud** (paginated chips) for every taxonomy,
  including custom ones. Defaults: category -> grid, everything else -> cloud.
- **Custom taxonomies**: any taxonomy declared in `[taxonomies]` is rendered by
  the same templates and shown in the post bulletins column.
- **Special pages**: `about` (hero + accordion from `params.aboutItems`),
  `links` (friend cards from `params.friends`) and `search` (client-side
  full-text search over a build-time index).
- **Math**: MathJax 4 is loaded per page only when `math: true`, with optional
  `$...$` inline delimiters.
- **Code**: Chroma with class names and a hand-written `syntax.css` that tracks
  both palettes.
- **CDN or self-hosted deps** (`useCdn`): Tabler Icons, the Fredoka / Maple Mono
  fonts and MiniSearch load from jsDelivr by default; `useCdn = false` serves
  them from the theme instead (built with `npm run build:selfhost`).
- **Internationalization**: ships `i18n/en.toml` and `i18n/zh-hans.toml`; add
  your own language file to translate the UI strings.

---

## Quick start

After cloning the theme you must build some artifacts with Node/npm.

1. Put the theme in your Hugo site:

   ```bash
   git clone <repo-url> themes/lavender
   ```

2. Build the theme's assets:

   ```bash
   cd themes/lavender
   npm install
   npm run build          # generates assets/css/main.css (required)
   npm run build:selfhost # optional, only for useCdn = false
   cd -
   ```

3. Enable and configure it in your site's `hugo.toml`:

   ```toml
   theme = "lavender"

   [params]
     blogName     = "My Blog"
     author       = "Me"
     avatar       = "/avatar.png"   # a file under static/, or a URL
     intro        = "Welcome to my blog."
     themeDefault = "auto"          # "light" | "dark" | "auto"

   [[params.social]]
     name = "GitHub"
     icon = "brand-github"          # any Tabler Icons name
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

The defaults below are the values in this theme's own
[`hugo.toml`](./hugo.toml), which Hugo merges into your site config (your site
wins).

| param | default | description |
| ----- | ------- | ----------- |
| `blogName` | `"My Blog"` (falls back to site title) | Branding on the home hero, the sidebar tooltip and the footer |
| `avatar` | `"/favicon.svg"` | Avatar image path (relative to site root) or URL; hidden if empty |
| `intro` | `"Welcome to my blog."` | Bio under the home avatar |
| `themeDefault` | `"auto"` | Initial palette: `"light"`, `"dark"` or `"auto"` (OS preference) |
| `backToTop` | `true` | Show the floating back-to-top button |
| `tableOfContents` | `true` | Show the sticky TOC on posts that have headings |
| `faviconPath` | `"/"` | Directory holding your favicon files, relative to `static/` |
| `faviconSvg` | `true` | Also link `favicon.svg` (modern SVG favicon) |
| `markdownInlineMath` | `true` | Enable `$...$` inline math delimiters (see [Math](#math-latex)) |
| `searchEnabled` | `true` | Enable the search page and the build-time `index.json` |
| `useCdn` | `true` | Serve Tabler Icons, Fredoka/Maple Mono and MiniSearch from jsDelivr; `false` self-hosts them |
| `author` | `"Anonymous"` | Fallback author for posts that don't set one |
| `math` | `false` | Default for the per-page `math` switch |
| `readingTime` | `true` | Default for the per-page "N min read" badge |
| `wordCount` | `true` | Default for the per-page word-count badge |
| `pageSize.grid` | `9` | Items per page on section/term/taxonomy-grid pages; falls back to Hugo's `[pagination]` if unset |
| `pageSize.cloud` | `12` | Items per page on taxonomy-cloud pages |
| `taxonomyLayout.<singular>` | category -> `"grid"`, tag (and any taxons you defined) -> `"cloud"` | Template used for a taxonomy page: `"grid"` or `"cloud"` |
| `[[params.social]]` | - | `{ name, icon, url }` - social icons on home/about |
| `[[params.aboutItems]]` | - | `{ title, content }` - accordion entries on the about page (content is Markdown) |
| `[[params.friends]]` | - | `{ name, url, avatar, desc }` - cards on the links page |

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

The active entry (and its ancestor) is highlighted automatically.

### Taxonomies

By default Hugo exposes `tags` and `categories`, and the theme renders both.
`taxonomyLayout` maps the **singular** taxonomy name to a template:

```toml
[taxonomies]
  category = "categories"
  tag      = "tags"
  series   = "series"   # any custom taxonomy works

[params.taxonomyLayout]
  category = "grid"
  tag      = "cloud"
  series   = "grid"
```

- `grid` lists each term as a heading followed by its posts (paginated across
  the flattened post list, so a term can continue onto the next page).
- `cloud` lists the terms as chips sorted by post count, with the post count on
  each chip.

Every taxonomy a post belongs to gets its own card in the bulletins column, so
custom taxonomies need no template changes.

### Special pages

To make Hugo generate a special page (e.g. `/about`), add a plain content page
under `content/` and select its layout via front matter. The theme does the
rest. Note the `type: "custom"` line - the layouts live in
[`layouts/custom/`](./layouts/custom/):

```toml
+++
title = "About"
type = "custom"
layout = "about"
+++
```

Supported layouts: `about`, `links`, `search`. Any Markdown body is rendered
below the page-specific block (accordion / friend cards / search box).

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
description = "Shown as the card excerpt instead of the first 160 characters."
tags = ["foo"]
categories = ["Bar"]
series = ["Baz"]        # custom taxonomy, if you declare one
math = true             # load MathJax on this page
readingTime = true      # show "N min read"
wordCount = true        # show the word count
tableOfContents = false # hide the sticky TOC on this page
+++
```

Hugo counts CJK characters and emoji as words, so Chinese/Japanese/Korean text
is counted correctly out of the box.

The default archetype in [`archetypes/default.md`](./archetypes/default.md)
scaffolds the main fields for `hugo new`.

### Search

The search page (`type = "custom"`, `layout = "search"`) is a client-side
full-text search:

- At build time the theme emits `/index.json` (a list of `title`, `url`, `date`,
  `author` and plain-text `content` for every regular page in a section). It is
  generated only when `searchEnabled = true` (otherwise it is an empty array).
- On the search page, **MiniSearch** indexes that JSON and searches as you type.
  The tokenizer is unicode-aware: CJK text is split into single characters, so
  `搜索` matches posts containing `搜索功能`. Title matches are boosted.
- Hits are rendered as post cards, six at a time, with **Load more** /
  **Load less** buttons; matched terms are highlighted with `<mark>`.

```toml
[params]
  searchEnabled = true   # + a menu entry pointing at /search
```

### Internationalization

The theme ships [`i18n/en.toml`](./i18n/en.toml) and
[`i18n/zh-hans.toml`](./i18n/zh-hans.toml) for the strings it renders
(pagination, search status, reading time, TOC alias, 404, …). A
single-language site uses `en.toml`; add your own `i18n/<lang>.toml` to
translate. For a Chinese site:

```toml
defaultContentLanguage = "zh-hans"

[languages.zh-hans]
  locale = "zh-hans"
  title = "我的博客"
```

### Math (LaTeX)

Math is rendered by **MathJax 4** (loaded from the jsDelivr CDN) and only on
pages that opt in with `math: true` in front matter, so non-math pages never pay
the cost. The theme configures the Goldmark passthrough delimiters to match:

```toml
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block  = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)'], ['$', '$']]
```

MathJax can take a moment to typeset on first load - that's normal.

#### A note on dollar signs

Offline Markdown editors (e.g. Obsidian) treat `\$` as an escaped dollar sign.
Hugo, however, processes Markdown escapes *before* emitting HTML, and MathJax
runs on that HTML - so a standalone dollar sign needs a **double escape** in
Hugo source for MathJax to see the backslash:

```markdown
I'll give you \\$1 if you can resolve $x+1=2$.
```

A single `\$` is more portable across editors, but if an inline `$...$` math
block and a `\$` appear on the same line, rendering breaks - use a `$$...$$`
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
hand-written theme whose colors track the light/dark palettes. `lineNos`,
`lineNumbersInTable`, `anchorLineNos`, `hl_lines` and `linenostart` are all
supported.

`[markup.tableOfContents]` defaults to `startLevel = 2`, `endLevel = 4`.

If you prefer inline colors, set `noClasses = true` in your own config and
remove the `syntax.css` link from
[`layouts/_partials/layouts/head/head.html`](./layouts/_partials/layouts/head/head.html)
(or keep both and accept that the class-based theme is unused).

### Favicon

Provide these files in a directory under `static/` and point the theme at it:

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

They are trivial to generate with an online tool such as
[favicon.io](https://favicon.io/favicon-converter/).

```toml
[params]
  faviconPath = "/"     # directory under static/, "/" = static root
  faviconSvg  = true    # also link favicon.svg from the same directory
```

The theme's own [`static/favicon.svg`](./static/favicon.svg) is only a
placeholder; the other files are not shipped and will 404 until you add them.

---

## Building your site

No theme-specific tooling is involved; use plain Hugo commands:

```bash
# Local development with live reload (serves unminified assets)
hugo server

# Production build into public/, minifying the HTML output
hugo --minify

# Recommended for deployment: also prune stale build caches
hugo --gc --minify
```

Regardless of `--minify`, the theme's own CSS/JS assets are minified,
fingerprinted and given an SRI `integrity` attribute whenever the build is not a
development server.

The theme's `hugo.toml` sets `[outputs] home = ["HTML", "JSON"]`, which disables
the default RSS output for the home page and adds the `/index.json` search
index. Re-add `"RSS"` in your own config if you want a feed.

---

## Testing

The [`test/`](./test/) directory is a deterministic test site. From the
repository root it turns the theme repository into a Hugo project
(`contentDir`/`dataDir`/`staticDir` point at `test/`, while `layouts/`,
`assets/` and `static/` are used directly) and contains two corpora:

- **Manual posts** in `test/content/posts/` cover each feature by hand:
  Markdown, math and its delimiters, Chroma attributes, edge cases, custom
  taxonomies, per-page params and the empty-taxonomy branch.
- **Generated fuzz posts** in `test/content/fuzz/` are produced at build time by
  a [Hugo content adapter](./test/content/fuzz/_content.gotmpl). No case is
  committed: each page's body is a rotating combination of Markdown blocks from
  `test/data/fuzz-blocks.yaml`, and its title, date, description, author and
  taxonomy terms are computed (tags/categories/series are assigned round-robin
  so counts stay evenly distributed).

**Config variants** merge on top of `test/config/base.toml`: a Chroma highlight
matrix (`lineNos` table/inline/off, anchors, `noClasses`, `codeFences = false`),
boundary params (empty avatar/blogName/author, disabled TOC/back-to-top/inline
math, `pageSize = 1`), a taxonomy-layout swap, `useCdn = false` and a second
language.

```bash
# Baseline build (drafts are part of the corpus)
hugo --config test/config/base.toml --buildDrafts

# Merge in one or more variants (later files override earlier ones)
hugo --config test/config/base.toml,test/config/highlight-linenos-table.toml --buildDrafts

# Server mode
hugo server --config test/config/base.toml --buildDrafts --disableFastRender
```

See [`test/README.md`](./test/README.md) for the full variant matrix and content
map. When you change templates, styles or scripts, build the test site under a
few variants to catch rendering regressions.

---

## Project structure

```
hugo-theme-lavender/
├── hugo.toml                 # Theme defaults: params, menus, taxonomy layout, markup, outputs
├── package.json              # Local dev deps + build/watch scripts
├── .prettierrc.json          # Prettier: go-template + tailwindcss plugins
├── archetypes/
│   └── default.md            # Front matter scaffold for `hugo new`
│
├── assets/                   # Processed by Hugo's asset pipeline
│   ├── css/
│   │   ├── src/main.css      # ★ Tailwind v4 source (tokens + components)
│   │   ├── main.css          # ★ Generated Tailwind output (git-ignored)
│   │   └── syntax.css        # Hand-written Chroma theme for both palettes
│   ├── js/
│   │   ├── main.js           # All shared client behavior (vanilla JS IIFE)
│   │   └── search.js         # Search page only: MiniSearch wiring
│   └── lib/                  # ★ Copied by `npm run build:selfhost` (git-ignored)
│       ├── css/              #   tabler-icons.css, fredoka-variable.css, maple-mono.css
│       └── js/               #   minisearch.js
│
├── layouts/
│   ├── baseof.html           # Shell: <head> + sidebar + main + footer + back-to-top
│   ├── home.html             # Home hero (avatar, name, intro, social)
│   ├── single.html           # Article + bulletins (taxonomies + sticky TOC)
│   ├── section.html          # Section posts grouped by year + pagination
│   ├── taxonomy.html         # Decides grid vs cloud via params.taxonomyLayout
│   ├── term.html             # One term: posts grouped by year + pagination
│   ├── 404.html              # Styled not-found page
│   ├── index.json            # Search index (title/url/date/author/content)
│   ├── custom/
│   │   ├── about.html        # Hero + aboutItems accordion
│   │   ├── links.html        # friends card grid
│   │   └── search.html       # Search page (MiniSearch over index.json)
│   └── _partials/
│       ├── helpers/
│       │   ├── funcs/paginate.html       # Picks params.pageSize, falls back to Hugo
│       │   ├── funcs/visible-pages.html  # Pagination window (1 … curr±1 … last)
│       │   ├── link-css.html             # minify + fingerprint a CSS resource
│       │   ├── link-js.html              # minify + fingerprint a JS resource
│       │   └── math.html                 # Conditional MathJax snippet
│       └── layouts/
│           ├── head/head.html            # <meta>, favicons, assets, palette bootstrap
│           ├── head/title.html           # <title>
│           ├── sidebar.html              # Rail + drawer + scrim + back-to-top
│           ├── profile.html              # Big avatar (home/about)
│           ├── footer.html               # Gradient separator + copyright
│           ├── front.html                # Page title + description block
│           ├── pagination.html           # Numbered pagination + jump-to-page
│           ├── taxonomy/cloud.html       # Chips sorted by count
│           ├── taxonomy/grid.html        # Terms expanded into card groups
│           ├── article/meta.html         # Author / date / reading time / word count
│           ├── article/bulletins.html    # Taxonomy cards + sticky TOC
│           ├── article/bottom-nav.html   # Previous / next post
│           └── items/                    # post-card, card-grid, menu-entry, social-link
│
├── static/
│   ├── favicon.svg           # Placeholder; add the other favicon files yourself
│   └── lib/                  # ★ Copied by `npm run build:selfhost` (git-ignored)
│
├── scripts/
│   └── copy-deps.js          # node_modules -> assets/lib + static/lib (build:selfhost)
│
├── test/                     # Test site: manual posts, generated fuzz, config variants
│   ├── config/               # base.toml + mergeable variants
│   ├── content/              # posts/ (manual) + fuzz/ (content adapter) + special pages
│   ├── data/fuzz-blocks.yaml # Block pool for the generated cases
│   └── README.md             # Test documentation
│
├── data/                     # Reserved (empty)
└── i18n/                     # en.toml + zh-hans.toml (theme strings)
```

★ = generated artifact - git-ignored, produced by `npm run build` /
`npm run build:selfhost` (see [Development](#development)).

The `test/` site doubles as the development playground - there is no separate
`exampleSite/`; build it to preview changes.

---

## Development

The asset build is required at least once after cloning - the compiled files
are git-ignored - and again whenever you edit Tailwind classes or the source
stylesheet. Everything is **local** to this folder; nothing is installed
globally.

```bash
npm install             # one-time: tailwindcss, tabler icons, fonts, minisearch, prettier
npm run build           # main.css (Tailwind)
npm run build:selfhost  # optional: copy vendor deps for useCdn = false
npm run watch           # rebuild main.css on every change
npm run clean           # remove main.css + the self-hosted copies
npm run format          # format templates, assets, scripts and the content adapter
npm run format:check    # same, but only check (no writes)
```

| script | what it does |
| ------ | ------------ |
| `build:tailwind` | `tailwindcss -i assets/css/src/main.css -o assets/css/main.css` |
| `build:selfhost` | `node scripts/copy-deps.js` -> vendor CSS/JS to `assets/lib/` and woff2 fonts to `static/lib/fonts/` |
| `format` / `format:check` | Prettier over an explicit glob list (see below) |

`npm run build` only produces `main.css` - that is all a `useCdn = true` site
needs. Run `build:selfhost` only when you self-host (`useCdn = false`): the
copied vendor files are then minified, fingerprinted and served by Hugo. The
fonts are written to `static/lib/fonts/` and referenced with a `?v=` cache
buster, so re-run the script after upgrading a font package.

> When you bump a vendored package (`@tabler/icons-webfont`, `@fontsource-*`,
> `minisearch`), re-run `npm run build:selfhost` **and** update the pinned CDN
> URLs in
> [`layouts/_partials/layouts/head/head.html`](./layouts/_partials/layouts/head/head.html)
> and
> [`layouts/custom/search.html`](./layouts/custom/search.html).

### Coding principles and style

- **Go template whitespace control**: Normally, hugo templates ends with `-}}`
  to trim the trailing whitespace. This keeps the HTML free of stray blank lines
  without collapsing meaningful inline whitespace. Partial templates is designed
  to always have a suffixed LF and no preceding space characters, therefore it's
  safe to end partial references with `-}}`.
- **Formatting is automated.** Prettier (with `prettier-plugin-go-template` for
  `layouts/**/*.html` and `**/*.gotmpl`, and `prettier-plugin-tailwindcss`)
  enforces the style - 120-column width, `bracketSameLine`. You can also run
  `npm run format` before committing. Note that the Tailwind plugin reads
  `assets/css/main.css`, so run `npm run build` first if prettier fails.
- **Defensive templates.** Every param lookup has a `| default ...` fallback so
  a missing config key degrades gracefully instead of breaking the build - the
  test site's `params-boundary` variant exists to keep this honest.
- **CSS architecture**: design tokens are CSS custom properties on `:root` /
  `.dark`, bridged into Tailwind via `@theme`; component classes live in
  `@layer components` and follow BEM-ish naming
  (`block`, `block__element`, `block--modifier`, e.g. `accordion--open`). The
  sidebar switch is a custom `sidebar:` breakpoint at 900 px. Layout is flexbox
  and grid only.
- **JavaScript**: framework-free IIFEs in `assets/js/`, no bundler. `main.js` is
  loaded on every page and each feature is guarded by DOM existence checks;
  `search.js` bails out unless the search markup is present.
- **Git-ignored artifacts**: `main.css`, `assets/lib/**` are never committed;
  run `npm run build` after cloning and after touching the source stylesheet.

---

## Notes for a static site

A Hugo blog is a multi-page site: every navigation is a full document load and
there is no client-side runtime to keep state between pages. The CSS/JS loading
strategy follows from that:

- **Palette restore happens before `<body>` renders.** State cannot survive
  navigation in memory, so the palette is persisted in
  `localStorage["palette"]` and re-applied by a tiny **inline blocking script in
  `<head>`** ([`head.html`](./layouts/_partials/layouts/head/head.html)) on
  every page. An external deferred script would flash the wrong theme.
- **`main.js` is deferred and page-agnostic.** It is loaded once per page with
  `defer` and every feature checks for its own DOM hooks first.
- **Minify + fingerprint only in production.** `main.css`, `syntax.css` and
  `main.js` are piped through `minify | fingerprint` (with an SRI hash) unless
  `hugo.IsDevelopment`, so `hugo server` gives you readable files while deployed
  sites get cache-busting hashes.
- **Conditional heavy assets.** MathJax is only included on pages with
  `math: true`; it is never loaded site-wide.
- **CDN or self-hosted vendor assets.** Tabler Icons, the Fredoka/Maple Mono
  fonts and MiniSearch load from jsDelivr when `useCdn = true` (default). With
  `useCdn = false` the non-minified CSS/JS are copied into `assets/lib/`
  (minified + fingerprinted by Hugo, so they are only published when referenced)
  and the woff2 fonts into `static/lib/fonts/`.

---

## `main.js` hooks

`assets/js/main.js` wires up all shared client behavior. Define the documented
ids/classes and the script picks them up automatically.

### Theme palette switch

- Palettes are selected by the `.dark` class on the root `<html>` element.
- A button with id `theme-toggle` toggles it; the choice is persisted to
  `localStorage["palette"]`.
- The saved palette is re-applied before `<body>` renders by the inline script
  in `head.html`; `main.js` only handles the click.

### Sidebar drawer

- `#sidebar-burger` toggles the drawer; `#sidebar-scrim` and any `<a>` inside
  `#sidebar` close it; it also auto-closes past 900 px.
- `#sidebar-burger` may contain `#sidebar-burger-icon`, whose class is swapped
  between `ti-list` (☰) and `ti-x` (✕).
- `.sidebar--open` is set on `#sidebar` (CSS translates it in/out);
  `.sidebar-open` is set on `<body>` (CSS disables body scrolling).

### Back to top

A button with id `back-to-top` scrolls smoothly to the top and receives
`.back-to-top--show` once the page is scrolled more than 400 px.

### TOC scrollspy

The TOC lives inside `.post-toc`; the link for the section currently being read
gets the class `.toc-link--active`. The heading map is rebuilt on the window
`load` event, and scroll handling is throttled with `requestAnimationFrame`.

### Accordion

Each `.accordion` pairs an `.accordion-head` (clickable title) with an
`.accordion-body` (collapsible content). Clicking toggles the body's inline
`maxHeight` and the `.accordion--open` class.

### Pagination jump-to-page

`#pagination-goto` is a form whose `data-pages` attribute holds a
`pageNumber -> URL` JSON map; the input only accepts digits and submitting
navigates to the page.

---

## License

GPL v3 - see [LICENSE](./LICENSE).
