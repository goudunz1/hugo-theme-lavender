---
title: "032: Code — All Supported Languages"
date: 2020-03-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

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

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}
```

```cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```

```ruby
def hello
  puts "Hello from Ruby!"
end
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

```html
<!DOCTYPE html>
<html>
<body><p>Hello</p></body>
</html>
```

```yaml
name: fuzz
version: "1.0"
features:
  - math
  - code
  - tables
```

```toml
[project]
name = "fuzz"
version = "1.0.0"
```

```diff
- removed line
+ added line
  unchanged line
```
