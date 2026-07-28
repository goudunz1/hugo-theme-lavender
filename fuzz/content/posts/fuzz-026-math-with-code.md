---
title: "026: Math — Mixed With Code Blocks"
date: 2019-07-01
draft: false
tags: ["fuzz", "popular", "math", "code"]
categories: ["Big"]
math: true
---

## Math Followed by Code

The identity $e^{i\pi} + 1 = 0$ is beautiful.

```python
import math

def verify_euler():
    lhs = math.e ** (1j * math.pi) + 1
    return abs(lhs) < 1e-10

print(verify_euler())  # True
```

## Code Followed by Math

```python
def pythagorean(a, b):
    return (a**2 + b**2) ** 0.5
```

As above, we compute the hypotenuse: $c = \sqrt{a^2 + b^2}$.
