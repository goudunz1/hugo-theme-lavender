---
title: "012: Lists — Ordered, Unordered, Task, Definition"
date: 2018-03-01
draft: false
tags: ["fuzz", "popular", "markdown"]
categories: ["Big"]
---

## Unordered Lists

- Level 1, item 1
- Level 1, item 2
  - Level 2, item 2a
  - Level 2, item 2b
    - Level 3, item 2b-i
      - Level 4, item 2b-i-A
- Level 1, item 3
  * Mixed marker (*)
    + Mixed marker (+)
- Level 1, item with **bold** and *italic*

## Ordered Lists

1. First numbered item
2. Second numbered item
   1. Sub-item a
   2. Sub-item b
      1. Sub-sub-item i
      2. Sub-sub-item ii
3. Third item — allows continuation at top level
4. Fourth item starts at 4, not reset

## Task Lists

- [x] Completed task
- [ ] Pending task
- [x] Another completed with **bold**
- [ ] Pending with ~~strikethrough~~
- [ ] Nested
  - [x] Sub-task done

## Definition Lists (HTML)

<dl>
  <dt>Hugo</dt>
  <dd>The world's fastest static site generator.</dd>
  <dt>Goldmark</dt>
  <dd>Hugo's default Markdown processor.</dd>
</dl>
