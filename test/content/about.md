---
title: "About"
type: "custom"
layout: "about"
description: "About the Lavender theme test site."
---

## About this test site

This site is a deterministic regression corpus for the
[Lavender Hugo theme](https://github.com/). It has two halves:

- **Manual posts** under [`/posts/`](/posts/) cover each theme feature by hand:
  Markdown, math, Chroma highlighting, edge cases, custom taxonomies and
  per-page params.
- **Generated fuzz posts** under [`/fuzz/`](/fuzz/) are assembled at build time
  by a Hugo content adapter from a pool of Markdown blocks and a rotating set of
  front matter values.

Build it with different files from `test/config/` to exercise the highlight
matrix, pagination extremes, boundary params, self-hosting and a second
language.
