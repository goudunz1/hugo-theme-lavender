---
title: "Edge cases: long text, RTL, emoji, deep nesting and wide tables"
date: 2021-01-15
draft: false
author: "Edge Tester"
description: "Merged edge coverage: very long Latin/CJK/RTL runs, emoji and Unicode symbol overload, deep list nesting, a 10-column table, HTML-heavy bodies and URL/email auto-linking stress."
tags: ["edge", "accessibility"]
categories: ["Internals"]
series: ["Internals"]
readingTime: true
wordCount: true
---

## Very long Latin text

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.

## Very long CJK text

君子曰：学不可以已。青，取之于蓝，而青于蓝；冰，水为之，而寒于水。木直中绳，輮以为轮，其曲中规。虽有槁暴，不复挺者，輮使之然也。故木受绳则直，金就砺则利，君子博学而日参省乎己，则知明而行无过矣。

吾尝终日而思矣，不如须臾之所学也；吾尝跂而望矣，不如登高之博见也。登高而招，臂非加长也，而见者远；顺风而呼，声非加疾也，而闻者彰。假舆马者，非利足也，而致千里；假舟楫者，非能水也，而绝江河。

日本語の長文テキスト：春はあけぼの。やうやう白くなりゆく山際、少しあかりて、紫だちたる雲の細くたなびきたる。夏は夜。月の頃はさらなり、闇もなほ、蛍の多く飛びちがひたる。

한국어도 추가합니다: 이 긴 텍스트는 한국어로 작성된 문장입니다. 테마의 폰트 렌더링과 줄바꿈 동작을 테스트하기 위한 것입니다. 한글은 자모음의 조합으로 이루어져 있어 영어와 다른 텍스트 레이아웃 특성을 보여줍니다.

## RTL text

السلام عليكم ورحمة الله وبركاته.

هذا نص طويل باللغة العربية لاختبار عرض النص من اليمين إلى اليسار في القالب. اللغة العربية لغة غنية وجميلة، وتحتوي على العديد من الحروف والأشكال المختلفة.

שלום עולם! זהו טקסט בעברית לבדיקת תצוגת טקסט מימין לשמאל.

Mixed LTR and RTL: This is English followed by العربية then back to English.

Numbers in RTL: السعر 100 ريال. التاريخ ٢٠٢٤-٠١-٠١.

## Emoji overload

😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗☺️😚😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁☹️😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾

❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝

👋🤚🖐✋🖖👌🤌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👂🦻👃🧠🫀🫁🦷🦴👀👁👅👄

## Unicode symbols, Dingbats and box drawing

Math symbols: ∀ ∃ ∄ ∅ ∆ ∇ ∈ ∉ ∋ ∌ ∏ ∐ ∑ − ∓ ∔ ∕ ∖ ∗ ∘ ∙ √ ∛ ∜ ∝ ∞ ∟ ∠ ∡ ∢ ∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∫ ∬ ∭ ∮ ∴ ∵ ∼ ∽ ≈ ≉ ≌ ≠ ≡ ≢ ≤ ≥ ≪ ≫ ⊂ ⊃ ⊆ ⊇ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚.

Dingbats: ✁ ✂ ✃ ✅ ✆ ✈ ✉ ✊ ✋ ✌ ✍ ✎ ✏ ✐ ✑ ✒ ✓ ✔ ✕ ✖ ✗ ✘ ✨ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ✱ ✲ ✳ ✴ ✵ ✶ ✷ ✸ ✹ ✺ ✻ ✼ ✽ ✾ ✿ ❀ ❁ ❂ ❃ ❄ ❅ ❆ ❇ ❈ ❉ ❊ ❋.

```
┌─┬─┐    ╔═╦═╗
│ │ │    ║ ║ ║
├─┼─┤    ╠═╬═╣
│ │ │    ║ ║ ║
└─┴─┘    ╚═╩═╝
```

Arrows: ← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ⟵ ⟶ ⟷ ➔ ➘ ➙ ➚ ➛ ➜ ➝ ➞ ➟ ➠ ➡ ➢ ➣ ➤.

## Deeply nested lists and blockquotes

- Level 1
  - Level 2
    - Level 3
      - Level 4
        - Level 5
          - Level 6
            - Level 7
              - Level 8
                - Level 9
                  - Level 10
                    - Level 11
                      - Level 12
                        - Level 13
                          - Level 14
                            - Level 15 — extreme depth

> > > > > > > > > > Deeply nested blockquotes at level 10 — heavily indented and may run out of horizontal space.

###### H6 at the end of the document

It must still get an anchor id from Goldmark.

## Extremely wide table (10 columns)

| C1                                   | C2              | C3            | C4             | C5            | C6            | C7      | C8     | C9    | C10   |
| ------------------------------------ | --------------- | ------------- | -------------- | ------------- | ------------- | ------- | ------ | ----- | ----- |
| a                                    | b               | c             | d              | e             | f             | g       | h      | i     | j     |
| k                                    | l               | m             | n              | o             | p             | q       | r      | s     | t     |
| u                                    | v               | w             | x              | y             | z             | 1       | 2      | 3     | 4     |
| AlongWord                            | AnotherLongWord | ThirdLongWord | FourthLongWord | FifthLongWord | SixthLongWord | Seventh | Eighth | Ninth | Tenth |
| VeryVeryVeryVeryVeryVeryVeryLongCell | short           | short         | short          | short         | short         | short   | short  | short | end   |

## HTML-heavy bodies

<div class="custom-wrapper" style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">

<h3 style="color: #333;">HTML Section Title</h3>

<p>This entire section uses raw HTML tags instead of Markdown.</p>

<table border="1" cellpadding="5" cellspacing="0">
  <thead>
    <tr><th>Name</th><th>Value</th></tr>
  </thead>
  <tbody>
    <tr><td>Alpha</td><td>1</td></tr>
    <tr><td>Beta</td><td>2</td></tr>
    <tr><td>Gamma</td><td>3</td></tr>
  </tbody>
</table>

<pre><code># Raw HTML code block
def test():
    pass
</code></pre>

<blockquote style="border-left: 3px solid blue; padding-left: 8px;">
  This is an HTML-styled blockquote, not a Markdown one.
</blockquote>

</div>

Back to Markdown after the HTML section.

## URL and email auto-linking stress

https://example.com
https://gohugo.io/documentation/
https://github.com/gohugoio/hugo
https://example.com/path/to/resource?query=value&foo=bar
ftp://ftp.example.com/file.zip
https://example.com/path%20with%20spaces

user@example.com
first.last@domain.co.uk
user+tag@example.org
name@subdomain.domain.tld
a@b.c

Visit https://example.com or email user@example.com for details.
