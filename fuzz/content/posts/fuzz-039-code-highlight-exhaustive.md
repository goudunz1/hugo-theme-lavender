---
title: "039: Code — Exhaustive Highlight Attributes"
date: 2020-10-15
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

This post contains fenced blocks with all common Chroma highlight attributes for cross-config testing.

## hl_lines (single lines and ranges)

```python {hl_lines=[1,3,"5-7"]}
# highlighted: line 1
# not highlighted: line 2
# highlighted: line 3
# not highlighted: line 4
# highlighted: lines 5-7
def doit():
    return "done"
## not highlighted: line 8
```

## linenostart offset

```python {linenostart=200}
# This should show line number 200
# This should show line number 201
print("Starting at 200")
```

## hl_lines + linenostart combined

```python {hl_lines=[2,4], linenostart=50}
# line 50 (not highlighted)
# line 51 (highlighted)
# line 52 (not highlighted)
# line 53 (highlighted)
# line 54 (not highlighted)
```

## No attributes (control)

```python
# Simple code block with no extra attributes.
print("Just clean and simple.")
```

## Long language name

```shell-session
$ echo "Hello World"
Hello World
$ ls -la
total 0
```

## Nested code-like content

````markdown
# Title

Here is `inline code` and a code block:

```python
print("nested")
```
````
