---
title: "Page params: TOC, reading time, word count and per-page math"
date: 2020-11-01
draft: false
author: "Dr. Long Loooooooooooooooooooooooooooooooooooooooooooooooooong Author"
description: "A post with per-page overrides: the sticky TOC is turned off, the reading-time and word-count badges are hidden, and a custom author and description are shown instead of the fallbacks."
tags: ["frontmatter", "performance"]
categories: ["Design"]
series: ["Getting Started"]
tableOfContents: false
readingTime: false
wordCount: false
math: true
---

## Per-page overrides

This page disables three theme features that default to on:

- `tableOfContents: false` — the right-hand bulletins column shows taxonomy
  chips only, no TOC card.
- `readingTime: false` — no clock badge in the meta line.
- `wordCount: false` — no file badge in the meta line.

The meta line therefore only shows the custom `author` and the date.

## Custom author and description

The long author name above tests the `truncate` behavior of the meta line and
the list card. The description is used verbatim as the card excerpt instead of
the first 160 characters of the body.

## Math still works

\(e^{i\pi} + 1 = 0\)

## Missing params fall back

Pages that omit `author`, `description`, `math`, `readingTime`, `wordCount` or
`tableOfContents` fall back to the site-level defaults in `[params]`. The
auto-generated fuzz posts are deliberately a mix of set and missing values.
