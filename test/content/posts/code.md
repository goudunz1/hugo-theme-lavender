---
title: "Code: Chroma highlight attributes and languages"
date: 2020-01-10
draft: false
author: "Code Tester"
description: "Merged code coverage: hl_lines, linenostart, diffs, empty fences, long lines, special characters, every common language and the noClasses/noFences config variants."
tags: ["code", "highlight"]
categories: ["Reference"]
series: ["Deep Dive"]
readingTime: true
---

## `hl_lines` (single lines and ranges)

```python {hl_lines=[1,3,"5-7"]}
# highlighted: line 1
# not highlighted: line 2
# highlighted: line 3
# not highlighted: line 4
# highlighted: lines 5-7
def doit():
    return "done"
# not highlighted: line 8
```

## `linenostart`

```go {linenostart=100}
package main

import "fmt"

func main() {
    fmt.Println("This line should be numbered 100+")
    fmt.Println("And this one 100+N")
}
```

## `hl_lines` + `linenostart`

```python {hl_lines=[2,4], linenostart=50}
# line 50 (not highlighted)
# line 51 (highlighted)
# line 52 (not highlighted)
# line 53 (highlighted)
# line 54 (not highlighted)
```

## Multiple languages

```bash
#!/usr/bin/env bash
echo "Bash script"
export FOO="bar"
```

```javascript
const hello = (name) => {
  console.log(`Hello, ${name}!`);
};
```

```rust
fn main() {
    println!("Hello from Rust!");
}
```

```cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```

```sql
SELECT id, name, email
FROM users
WHERE active = 1
ORDER BY name ASC;
```

```css
.foo {
  color: red;
  font-size: 16px;
}
```

## Config formats

```toml
[server]
host = "0.0.0.0"
port = 1313
```

```yaml
server:
  host: "0.0.0.0"
  port: 1313
```

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 1313
  }
}
```

## Diff

```diff
--- a/src/config.py
+++ b/src/config.py
@@ -1,5 +1,7 @@
 DEBUG = True
-DATABASE_URL = "sqlite:///old.db"
-SECRET_KEY = "insecure-old-key"
+DATABASE_URL = "postgresql://user:pass@localhost/newdb"
+SECRET_KEY = "new-secure-random-key"
+MAX_CONNECTIONS = 100
 CACHE_ENABLED = True
-LOG_LEVEL = "DEBUG"
+LOG_LEVEL = "INFO"
+TIMEOUT = 30
```

## Special characters and escaping

```python
# Special characters: < > & " ' `
def special():
    assert x > 0 and y < 100
    result = f"x = {x} && y = {y}"
    escape = "a backslash: \\"
    template = "{{ variable }} interpolation"
    dollars = "$100 and $200"
    return result
```

```html
<div class="container">
  <p>5 &lt; 10 &amp;&amp; 20 &gt; 15</p>
  <code>&lt;div class=&quot;test&quot;&gt;</code>
</div>
```

## Empty and whitespace-only fences

```python

```

```

```

## Plain fence without a language

```
This is a plain code block with no language annotation.
Line 2: $PATH and ${VAR} should not be interpreted.
Line 3: <div class="test"> raw HTML tags.
Line 4: --- front matter-like dashes.
Line 5: `nested backticks` in plain text.
Line 6: 😊 emoji in a plain code block.
```

## Extremely long line (horizontal scroll)

```python {hl_lines=[2]}
x = "begin"
y = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + "end"
```

## Nested code-like content

````markdown
# Title

Here is `inline code` and a code block:

```python
print("nested")
```
````
