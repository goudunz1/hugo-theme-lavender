---
title: "035: Code — Special Characters in Blocks"
date: 2020-06-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

```python
# Special characters: < > & " ' `
def special():
    assert x > 0 and y < 100
    result = f"x = {x} && y = {y}"
    escape = "this is a \\"backslash\\" in string"
    template = "{{ variable }} interpolation"
    dollars = "$100 and $200"  # dollar signs in code
    return result
```

```html
<div class="container">
  <p>5 &lt; 10 &amp;&amp; 20 &gt; 15</p>
  <code>&lt;div class=&quot;test&quot;&gt;</code>
</div>
```
