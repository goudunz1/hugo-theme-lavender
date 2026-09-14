---
title: "Math disabled on a page (math: false)"
date: 2019-02-01
draft: false
author: "Math Tester"
description: "With math: false, MathJax is not loaded. The delimiters must survive Goldmark's passthrough as raw text."
tags: ["math", "edge"]
categories: ["Internals"]
math: false
---

The `math: false` front matter means MathJax is not loaded.

But `$x^2 = y$` and `$$a+b=c$$` still pass through the Goldmark passthrough
extension and reach the browser untouched, so the delimiters stay visible:

$x^2 = y$

$$a + b = c$$

The rest of this page must render normally without waiting for MathJax.
