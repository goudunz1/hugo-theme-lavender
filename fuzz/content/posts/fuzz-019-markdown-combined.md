---
title: "019: All Features Combined"
date: 2018-10-15
draft: false
author: "Feature Tester"
description: "A post combining multiple Markdown features in proximity."
tags: ["fuzz", "popular", "markdown", "combined"]
categories: ["Big"]
math: true
readingTime: true
---

## Everything Together

Here is *italic*, **bold**, and ~~strikethrough~~. An inline `code span`.

> A blockquote with **bold** and `code`.

| Feature | Status |
|:--------|:------:|
| Lists   | ✓      |
| Tables  | ✓      |
| Quotes  | ✓      |

### Task Progress

- [x] Write content
- [x] Add tables
- [ ] Add images

\( E = mc^2 \) — inline math.

\[
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
\]

```json
{
  "name": "fuzz",
  "version": "1.0.0",
  "features": ["tables", "math", "code", "lists"]
}
```

[^combo]
[^combo]: A footnote in the combined post.

That's all.
