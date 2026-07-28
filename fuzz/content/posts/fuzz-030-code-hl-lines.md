---
title: "030: Code — hl_lines Attribute"
date: 2020-01-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

Test highlighting specific lines in fenced code blocks.

```python {hl_lines=[2,4]}
def example():
    # This line is highlighted (line 2)
    x = 10
    # This line is highlighted (line 4)
    y = 20
    # Not highlighted
    return x + y
```

```python {hl_lines=["1-3",6]}
# Lines 1-3 are highlighted
def greet(name):
    return f"Hello, {name}!"

# Line 6 is highlighted
if __name__ == "__main__":
    print(greet("World"))
```
