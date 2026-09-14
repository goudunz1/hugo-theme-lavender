---
title: "No taxonomies at all"
date: 2022-01-01
draft: false
tags: []
categories: []
series: []
description: "Empty tag/category/series arrays: the taxonomy bulletins next to the article must simply render nothing, and the post still shows up on /posts."
---

## Empty taxonomies

This post declares `tags: []`, `categories: []` and `series: []`. The bulletins
column iterates `site.Taxonomies` and calls `$.GetTerms`, so the template's
empty branch is exercised here: no taxonomy card should appear beside this
article.

The post must still be reachable from the [posts list](/posts/), where it lands
in its own year group.
