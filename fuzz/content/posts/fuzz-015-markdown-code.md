---
title: "015: Code — Inline, Fenced, Multi-language"
date: 2018-06-01
draft: false
tags: ["fuzz", "popular", "markdown", "code"]
categories: ["Big"]
---

## Inline Code

Use the `fmt.Println()` function to print output. The variable `$x` is an integer.
An extremely long inline code span: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`

## Fenced Code Blocks

```c
#include <stdio.h>
int main() {
    printf("Hello, world!\\n");
    return 0;
}
```

```python
def fibonacci(n):
    """Return the nth Fibonacci number."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```go
package main
import "fmt"
func main() {
    fmt.Println("Hello from Go!")
}
```

## Plain Fence (no language)

```
This is a plain fenced block with no language annotation.
It should render as a code block without syntax highlighting.
```
