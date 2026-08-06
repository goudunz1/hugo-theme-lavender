# Lavender Theme Fuzz Site

Deterministic test site for fuzzing the [Lavender Hugo theme](../).  
50 posts exercise every markdown feature, math rendering, code highlighting
variants, edge cases, and taxonomy stress patterns.

## Quick Start

From the **repo root**:

```bash
# Baseline (lineNos off, all params default)
hugo --config fuzz/config/_base.toml --buildDrafts

# With a highlight variant
hugo --config fuzz/config/_base.toml,fuzz/config/highlight-lineNos-on.toml --buildDrafts

# With params boundary testing
hugo --config fuzz/config/_base.toml,fuzz/config/params-boundary.toml --buildDrafts

# Server mode
hugo server --config fuzz/config/_base.toml --buildDrafts --disableFastRender
```

Merge multiple config files: later files override earlier ones.  
`_base.toml` sets shared defaults. Each variant file only overrides what it tests.

## Config Variants

### Highlight Matrix

| File                          | noClasses | lineNos | lineNumbersInTable | anchorLineNos | lineAnchors  |
|-------------------------------|-----------|---------|---------------------|---------------|--------------|
| `_base.toml`                  | false     | false   | —                   | —             | —            |
| `highlight-lineNos-on.toml`   | false     | true    | (table, default)    | false         | —            |
| `highlight-lineNos-off.toml`  | false     | false   | —                   | —             | —            |
| `highlight-lineNos-inline.toml` | false   | true    | **false**           | false         | —            |
| `highlight-anchors.toml`      | false     | true    | true                | **true**      | **"fuzz-anchor"** |
| `highlight-noclasses-true.toml` | **true** | true   | —                   | —             | —            |
| `highlight-hllines.toml`      | false     | true    | true                | —             | —            |

### Params Variants

| File                     | What it tests                                                                 |
|--------------------------|-------------------------------------------------------------------------------|
| `params-boundary.toml`   | `themeDefault=light`, TOC/backToTop off, empty avatar/blogName/author, `pagination.tags=1` |
| `pagination-extreme.toml`| `pagination.tags=1` — forces pagination on every taxonomy page                |
| `math-inline-off.toml`   | `markdownInlineMath=false` — only `\(...\)` inline math, `$...$` is disabled  |

## Content Summary

| Range   | Count | Description |
|---------|-------|-------------|
| 000–009 | 10    | Empty posts — front matter only, no body |
| 010–019 | 10    | Markdown features: headings, emphasis, lists, tables, blockquotes, code, links, footnotes, special chars |
| 020–029 | 10    | Math: `\(...\)`, `\[...\]`, `$...$`, `$$...$$`, escaped `\$`, matrices, aligned equations, CJK |
| 030–039 | 10    | Code: `hl_lines`, `linenostart`, all languages, empty blocks, long lines, diff format |
| 040–049 | 10    | Edge cases: long Latin/CJK/RTL text, emoji, unicode, deep nesting, wide tables, HTML-heavy, whitespace body |

---

The avatar style Lorelei is a remix of: Lorelei by Lisa Wischofsky, licensed under CC0 1.0 .
