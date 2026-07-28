---
title: "010: Headings Depth Test"
date: 2018-01-15
draft: false
tags: ["fuzz", "popular", "markdown"]
categories: ["Big"]
---

## Heading Level 2

Body text under h2. The quick brown fox jumps over the lazy dog.

### Heading Level 3

More body under h3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Heading Level 4 (TOC endLevel boundary)

Content under h4. The TOC should include this if `endLevel >= 4`.

##### Heading Level 5

This heading is too deep for the TOC (default endLevel=4) but should still render as HTML `<h5>`.

###### Heading Level 6

Even deeper — `<h6>`.

###### Yet Another H6

H6 adjacent to another H6.

##### Another H5 After H6

Back up to H5.

#### H4 After H5

And back to H4 — verifying heading hierarchy doesn't need to be strict.
