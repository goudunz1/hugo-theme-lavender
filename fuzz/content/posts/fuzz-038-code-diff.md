---
title: "038: Code — Diff Format"
date: 2020-09-10
draft: false
tags: ["fuzz", "popular", "code"]
categories: ["Big"]
---

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
