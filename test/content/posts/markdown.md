---
title: "Markdown: every feature in one post"
date: 2018-01-15
draft: false
author: "Markdown Tester"
description: "Headings, emphasis, lists, tables, blockquotes, code, links, footnotes, symbols and raw HTML — merged from the old per-feature posts."
tags: ["markdown", "layout"]
categories: ["Guides"]
series: ["Deep Dive"]
readingTime: true
wordCount: true
---

# H1 (never shown in the TOC)

## Headings depth

Body under `h2`. The sticky TOC starts at level 2 and should include `h2`–`h4`.
Below `h4` is not in the TOC but must still render.

### H3

#### H4 (TOC `endLevel` boundary)

##### H5

###### H6

###### Another H6

##### H5 after H6

#### H4 after H5

## Emphasis, strong, strikethrough

This is _italic_, **bold**, _**bold italic**_, _underscore italic_, **underscore bold**,
~~strikethrough~~ and _**~~bold italic struck through~~**_.

Nested emphasis: _inside a **word** like this_ and **bold with _nested italic_**.
Mid-word em*pha*sis. Edge spacing: * this has space after asterisk *.

## Lists

- Level 1
  - Level 2
    - Level 3
      - Level 4
        - Level 5
          - Level 6
            - Level 7
              - Level 8
                - Level 9
                  - Level 10 — still readable?
- Mixed markers:
  - asterisk
    - plus

1. First
2. Second
   1. Sub a
   2. Sub b
      1. Sub-sub i
3. Third, back at top level

- [x] Completed task
- [ ] Pending task
- [x] Another completed with **bold**
- [ ] Nested task list
  - [x] Sub-task done

## Tables

| Left | Center | Right |
| :--- | :----: | ----: |
| A    |   B    |     C |
| 123  |  456   |   789 |

| Feature | Description                                                                                                                    | Example                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Short   | Short                                                                                                                          | Short                                                                        |
| Long    | A very long description that should wrap inside the table cell once the container gets narrow, while keeping the row readable. | `print("a very long example string that forces the cell to scroll or wrap")` |

| Col A | Col B | Col C |
| ----- | ----- | ----- |
|       | x     |       |
| a     |       | c     |
| one   |       |       |

## Blockquotes

> Level one.
>
> > Level two.
> >
> > > Level three.

> With a code block:
>
> ```python
> def hello():
>     print("Hello from a blockquote")
> ```

> With a list:
>
> 1. Wake up
> 2. Code
> 3. Sleep

## Code

Inline `code`, and an inline span with `$x` and `<tags>`.
A fenced block with a language lives in the [Code post](/posts/code/) to keep
this one focused.

```
Plain fence, no language.
Line 2: $PATH and ${VAR} are not interpreted.
Line 3: <div class="test"> raw tags.
```

## Links and auto-linking

Visit [Hugo](https://gohugo.io) or [a titled link](https://example.com "Example site").

[Reference link][ref1], [another][ref2].

[ref1]: https://gohugo.io
[ref2]: https://github.com

Bare URL auto-links: https://example.com/auto

Email: user@example.com

A [relative link to the posts section](/posts/) and a [broken link](/does/not/exist).

## Horizontal rules and footnotes

Above the rule.

---

Between rules.

---

Below the rule. A sentence with a footnote.[^1] Another with a named one.[^long]

[^1]: This is the footnote content.

[^long]: A footnote with **formatting** and a [link](https://example.com).

## Special characters, symbols and CJK

Angle brackets: `<div class="test">` and `</div>`. Ampersand: AT&T.
Entities: &copy; &mdash; &larr; &rarr; &alpha; &beta; &infin; &ne; &le; &ge;.

Hugo shortcode delimiters shown raw: `{{</* myshort */>}}` and `{{%/* highlight */%}}`.

Symbols: ★ ☆ ☀ ☁ ☂ ∫ ∮ ∑ ∏ √ ∞ ♠ ♣ ♥ ♦ ♪ ♫.
Emoji: 😀 🎉 🚀 ❤️ — line breaking with a dense run: 😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩.

CJK: 这是中文测试文本。日本語のテストです。한국어 테스트 텍스트입니다.
Mixed: 这里有一个 `code` 和 **bold** 混在中文里。

RTL: السلام عليكم ورحمة الله وبركاته. שלום עולם!

Combining marks: re´sume´. Zero-width space (invisible): here​has​none.

## Definition list (raw HTML)

<dl>
  <dt>Hugo</dt>
  <dd>The world's fastest static site generator.</dd>
  <dt>Goldmark</dt>
  <dd>Hugo's default Markdown processor.</dd>
</dl>

## Image

![Avatar sample](/avatar.svg)
