# Lavender Theme Test Site

Test site for the [Lavender Hugo theme](../).

The repository root doubles as the Hugo project: `test/config/base.toml` points
`contentDir`/`dataDir`/`staticDir` at `test/`, while `layouts/`, `assets/` and
the rest of the theme are used directly. There is no `exampleSite/`.

The site has two complementary corpora:

- **Manual posts** in [`content/posts/`](./content/posts/) cover each theme
  feature by hand and are the readable documentation of what the theme supports.
- **Generated fuzz posts** in [`content/fuzz/`](./content/fuzz/) are created at
  build time by a Hugo
  [content adapter](https://gohugo.io/content-management/content-adapters/). No
  case is committed as a file: the body is a combination of Markdown blocks and
  the front matter is computed, including tags/categories/series.

## Quick start

Run everything from the **repository root**:

```bash
# Baseline build (drafts are part of the corpus)
hugo --config test/config/base.toml --buildDrafts

# Merge one or more variants; later files override earlier ones
hugo --config test/config/base.toml,test/config/highlight-linenos-table.toml --buildDrafts

# Preview (disable fast render so config changes are picked up)
hugo server --config test/config/base.toml,test/config/params-boundary.toml -D --disableFastRender

# Self-hosted vendor assets (run once, Node required)
npm run build:selfhost
hugo --config test/config/base.toml,test/config/selfhost.toml --buildDrafts
```

`base.toml` sets all shared defaults; a variant file only overrides what it
tests. `--buildDrafts` matters because some generated cases (and the manual
draft case) are drafts.

## Config variants

### Highlight matrix

| File | noClasses | lineNos | lineNumbersInTable | anchorLineNos | lineAnchors |
| ---- | --------- | ------- | ------------------ | ------------- | ----------- |
| `base.toml` (baseline) | false | false | - | - | - |
| `highlight-linenos-table.toml` | false | true | **true** | false | - |
| `highlight-linenos-inline.toml` | false | true | **false** | false | - |
| `highlight-anchors.toml` | false | true | true | **true** | **`test-anchor`** |
| `highlight-noclasses.toml` | **true** | true | - | - | - |
| `highlight-off.toml` | - | - | - | - | - (sets `codeFences = false`) |

### Params and structure

| File | What it tests |
| ---- | ------------- |
| `params-boundary.toml` | Light palette, TOC/back-to-top/favicons/inline math off, empty avatar/blogName/author (the fallbacks), `pageSize.grid = cloud = 1` forcing pagination everywhere |
| `pagination-extreme.toml` | `pageSize.grid = cloud = 1` only - pagination on every list/taxonomy/term |
| `taxonomy-layout-swap.toml` | `taxonomyLayout`: categories -> cloud, tags -> grid, custom `series` -> cloud |
| `math-inline-off.toml` | `markdownInlineMath = false` - only `\(...\)`, `$...$` is disabled |
| `selfhost.toml` | `useCdn = false` - Tabler Icons / Fredoka / Maple Mono / MiniSearch self-hosted from `assets/lib` + `static/lib` |
| `i18n.toml` | Adds `zh-hans` as a second language so `bilingual.zh-hans.md` and the theme's `i18n/zh-hans.toml` strings are exercised |

## Manual content map

| File | Coverage |
| ---- | -------- |
| `markdown.md` | H1–H6 (TOC `endLevel` boundary), emphasis/strong/strikethrough, ordered/unordered/task lists, tables with alignment, nested blockquotes, inline + plain code, reference/auto/broken links, horizontal rules, footnotes, HTML entities, emoji, CJK, RTL, combining marks, definition list, image |
| `math.md` | `\(...\)`, `\[...\]`, `$...$`, `$$...$$`, escaped dollars, fractions/sums/integrals/limits, matrices/determinants/cases, aligned equations, overflow equation, math mixed with code and CJK |
| `math-disabled.md` | `math: false` - MathJax is not loaded but passthrough delimiters survive |
| `code.md` | `hl_lines`, `linenostart`, combined attributes, many languages, TOML/YAML/JSON, diff, special characters, empty fences, plain fence, very long line, nested fence |
| `edge-cases.md` | Long Latin/CJK text, RTL, emoji overload, Unicode symbols/box drawing, 15-level lists, 10-column table, HTML-heavy body, URL/email auto-linking |
| `custom-taxonomy.md` | The custom `series` taxonomy, multiple categories/tags, long term names, taxonomy/term landing pages |
| `theme-features.md` | Per-page `tableOfContents: false`, `readingTime: false`, `wordCount: false`, long author, custom description, `math: true` |
| `no-taxonomies.md` | `tags/categories/series: []` - the bulletins template's empty branch |
| `bilingual.md` + `bilingual.zh-hans.md` | Translation pair for the `i18n.toml` variant |
| `about.md`, `links.md`, `search.md` | The `about`, `links` and `search` custom layouts (`type: custom`) |

## Generated fuzz corpus

[`content/fuzz/_content.gotmpl`](./content/fuzz/_content.gotmpl) registers 72
pages. For each index `i` it computes:

- **Body** - `3 + i % 3` blocks taken from
  [`data/fuzz-blocks.yaml`](./data/fuzz-blocks.yaml), starting at a rotating
  offset, joined into one Markdown document. The block pool contains headings,
  tables, lists, blockquotes, Go/Python code, display/inline math, task lists,
  footnotes, images, raw HTML and long inline code, so every case is a different
  combination.
- **Front matter** - `title` and `description` are `printf`-built, the date is
  derived from `i`, `author` is empty on every 5th case, `description` on every
  4th, `math` flips every 3rd, `tableOfContents` every 6th, `readingTime` every
  7th, `wordCount` every 11th and `draft` every 19th. Nothing is copied from a
  real post.
- **Taxonomies** - one category, two tags and one series per page, assigned
  round-robin, so the 6 categories and 12 base tags stay evenly distributed (12
  pages each) and the 3 series get 24 each. Every 23rd page also gets a very
  long tag name to stress chip/cloud truncation.

Output pages live under `/fuzz/generated-NNN/`. The `/fuzz/` section page,
search index and taxonomy pages pick them up automatically.

To change the corpus, edit the block pool or the modulus in the adapter; no
Markdown files need to be added or regenerated.

## Content summary

| Section   | Source               | Count                                     |
| --------- | -------------------- | ----------------------------------------- |
| `/posts/` | `content/posts/*.md` | 9 English posts + 1 `zh-hans` translation |
| `/fuzz/`  | content adapter      | 72 generated posts                        |

Taxonomies in the base config: 6 categories (`Guides`, `Reference`,
`Internals`, `Recipes`, `Design`, `Changelog`), 13 tags and the custom
`series` taxonomy (`Getting Started`, `Deep Dive`, `Internals`).

---

The avatar style Lorelei is a remix of: Lorelei by Lisa Wischofsky, licensed under CC0 1.0 .
