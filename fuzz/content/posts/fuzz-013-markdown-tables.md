---
title: "013: Tables — Alignment, Long Cells, Empty Cells"
date: 2018-04-01
draft: false
tags: ["fuzz", "popular", "markdown"]
categories: ["Big"]
---

## Basic Table

| Left   | Center | Right  |
|:-------|:------:|-------:|
| A      | B      | C      |
| 123    | 456    | 789    |

## Table With Long Content

| Feature | Description | Example |
|---------|-------------|---------|
| Short   | Short       | Short   |
| Medium  | This is a medium-length description that spans a bit. | `code` |
| Long    | This is a very long description that should test how the table handles cells with significant amounts of text content. The browser should wrap this appropriately depending on the container width. | `print("hello world this is a very long line of code that goes on and on and on and on and on and on and on and on")` |

## Table With Empty and Short Cells

| Col A | Col B | Col C |
|-------|-------|-------|
|       | x     |       |
| a     |       | c     |
| one   |       |       |
|       |       |       |

## Wide Table (7 columns)

| H1 | H2 | H3 | H4 | H5 | H6 | H7 |
|:---|:---|:---|:---|:---|:---|:---|
| v1 | v2 | v3 | v4 | v5 | v6 | v7 |
| aaaaaaaaaaaaaaaaaaaaaaaaaaaaa | b | c | d | e | f | g |
