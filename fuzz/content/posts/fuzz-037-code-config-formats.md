---
title: "037: Code — TOML, YAML, JSON"
date: 2020-08-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

```toml
[server]
host = "0.0.0.0"
port = 1313

[server.headers]
  For = "/*"
  [server.headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

```yaml
server:
  host: "0.0.0.0"
  port: 1313
  headers:
    - path: "/*"
      values:
        X-Frame-Options: DENY
        X-Content-Type-Options: nosniff
```

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 1313,
    "headers": {
      "/*": {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff"
      }
    }
  }
}
```
