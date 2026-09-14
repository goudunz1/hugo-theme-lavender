---
title: "Taxonomies: custom terms, multiple values and long names"
date: 2022-03-01
draft: false
author: "Taxonomy Tester"
description: "Exercises the theme's custom-taxonomy support: a third taxonomy (`series`) plus multiple categories/tags and a very long term name, all rendered as chips and on taxonomy/term pages."
tags: ["taxonomy", "frontmatter"]
categories: ["Recipes"]
series: ["Getting Started"]
readingTime: true
wordCount: true
---

## Custom taxonomy

The test config declares three taxonomies:

```toml
[taxonomies]
category = "categories"
tag = "tags"
series = "series"
```

`series` is a **custom taxonomy**. `layouts/taxonomy.html` looks up
`params.taxonomyLayout.<singular>` to pick `grid` or `cloud`, so this page's
term pages prove that custom taxonomies flow through the same templates.

## Multiple values

This post belongs to one category (`Recipes`), two tags (`taxonomy`,
`frontmatter`) and one series. The bulletins next to the article iterate
`site.Taxonomies`, so every taxonomy the post belongs to gets its own card.

## Long term names

The front matter also feeds a deliberately long tag so the chip and cloud
layouts are forced to truncate:

<https://example.com/irrelevant>

Actually the long term is set in the generated posts; here we just link to the
[tags cloud](/tags/) and [categories grid](/categories/).

## Reversed layout

Build the test site with the `taxonomy-layout-swap` variant
(`hugo --config test/config/base.toml,test/config/taxonomy-layout-swap.toml`)
to render categories as a cloud and tags as a grid instead.
