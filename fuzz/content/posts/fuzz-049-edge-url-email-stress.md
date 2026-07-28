---
title: "049: Edge — URL and Email Auto-Linking Stress"
date: 2021-10-01
draft: false
tags: ["fuzz", "popular", "edge"]
categories: ["Big"]
---

## Many URLs

https://example.com
https://gohugo.io/documentation/
https://github.com/gohugoio/hugo
https://example.com/path/to/resource?query=value&foo=bar
ftp://ftp.example.com/file.zip
https://example.com/path%20with%20spaces

## Many Emails

user@example.com
first.last@domain.co.uk
user+tag@example.org
name@subdomain.domain.tld
test@localhost.localdomain
a@b.c

## Mixed

Visit https://example.com or email user@example.com for details.

https://example.com/path?email=user@example.com&next=https://other.example.com
