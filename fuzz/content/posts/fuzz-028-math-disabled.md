---
title: "028: Math Disabled (math: false)"
date: 2019-09-01
draft: false
tags: ["fuzz", "popular", "math"]
categories: ["Big"]
math: false
---

The `math: false` frontmatter means MathJax is not loaded.
But $x^2 = y$ and $$a+b=c$$ still pass through Goldmark as raw HTML.
The raw text will appear as-is: $...$ and $$...$$ delimiters visible.
