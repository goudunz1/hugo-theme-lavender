---
title: "018: Emoji, Symbols, Special Characters"
date: 2018-09-01
draft: false
tags: ["fuzz", "popular", "markdown"]
categories: ["Big"]
---

## Special Characters

Angle brackets: `<div class="test">` and `</div>`

Ampersand escape: AT&T — the `&` should render correctly.

Copyright: &copy; &mdash; &larr; &rarr; &alpha; &beta;

Hugo shortcode delimiters: `{{</* myshort */>}}` and `{{%/* highlight */%}}` — raw display (escaped with Hugo comment trick).

## Unicode Symbols

★ ☆ ☀ ☁ ☂ ☃ ☄ ★ ☆ — star symbols.

∫ ∮ ∑ ∏ √ ∞ ≈ ≠ ≤ ≥ — math symbols.

♠ ♣ ♥ ♦ ♪ ♫ ♬ ♭ — card suits and music.

## CJK Characters

这是中文测试文本。日本語のテストテキストです。한국어 테스트 텍스트입니다。

Chinese + English mixed: 这里有一个 `code` 和 **bold** 混在中文里。

## Combining and Control Characters

re\u0301sume\u0301 — with combining acute accent: résumé.

Zero-width space test: this\u200bhas\u200bhidden\u200bspaces.
