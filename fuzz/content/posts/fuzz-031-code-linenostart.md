---
title: "031: Code — lineNoStart"
date: 2020-02-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

Test non-default starting line numbers.

```go {linenostart=100}
package main

import "fmt"

func main() {
    fmt.Println("This line should be numbered 100+")
    fmt.Println("And this one 100+N")
}
```

```python {linenostart=1}
print("Explicit start at 1")
print("Same as default")
print("Nothing special here")
```
