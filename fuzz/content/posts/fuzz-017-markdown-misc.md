---
title: "017: Horizontals, Footnotes, HTML Mixed"
date: 2018-08-01
draft: false
tags: ["fuzz", "popular", "markdown"]
categories: ["Big"]
---

## Horizontal Rules

Above the rule.

---

Between rules.

***

Below the rule.

## Footnotes

Here is a sentence with a footnote.[^1]

Another footnote reference.[^longnote]

[^1]: This is the footnote content.

[^longnote]: This footnote has **bold**, *italic*, and `code` inside it. It can also span multiple paragraphs.

    Here is the second paragraph of the footnote.

## Mixed HTML and Markdown

<div align="center">

This paragraph is inside a centered div.

**Bold text** still works.

</div>

<details>
<summary>Click to expand</summary>

Hidden content revealed! This is inside an HTML `<details>` tag.

</details>
