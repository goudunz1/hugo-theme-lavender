---
title: "Math: all delimiter styles in one post"
date: 2019-01-15
draft: false
author: "Math Tester"
description: "Merged math coverage: \\(..\\), \\[..\\], $..$, $$..$$, escaped dollars, matrices, aligned equations, limits and CJK text."
tags: ["math", "layout"]
categories: ["Reference"]
series: ["Deep Dive"]
math: true
readingTime: true
---

## Inline `\(...\)`

The Pythagorean theorem: \(a^2 + b^2 = c^2\).
Euler: \(e^{i\pi} + 1 = 0\).
Quadratic: \(x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}\).

## Block `\[...\]`

\[
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
\]

\[
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
\]

## Inline `$...$`

Pythagorean: $a^2 + b^2 = c^2$. Euler: $e^{i\pi} + 1 = 0$.
Multiple inline formulas $a_1$ and $b_2$ with text $c_3$ between them.

## Block `$$...$$`

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

## Escaped and literal dollars

The price is $5, but the equation is $x + 1 = 2$.
An escaped dollar needs a double escape in Hugo so MathJax sees it:
I have \\$50 in my wallet, solve $z = a + b$.

## Fractions, sums, integrals, limits

$$
\frac{\frac{a}{b}}{\frac{c}{d}} = \frac{ad}{bc}
$$

$$
\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x \qquad
\iint_D f(x,y)\,dx\,dy \qquad
\oint_C \mathbf{F} \cdot d\mathbf{r}
$$

## Matrices, determinants and cases

$$
\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
\quad
\det(A) =
\begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
$$

$$
f(x) =
\begin{cases}
x^2, & \text{if } x \geq 0 \\
-x^2, & \text{if } x < 0
\end{cases}
$$

## Aligned multi-line equations

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## Long equation (overflow test)

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} + \frac{-d \pm \sqrt{d^2 - 4ef}}{2e} + \sum_{n=1}^{\infty} \frac{1}{n^2} + \int_{0}^{\infty} e^{-t^2} dt + \lim_{x \to \infty} \frac{\ln x}{x}
$$

## Math mixed with code

The identity $e^{i\pi} + 1 = 0$ is beautiful.

```python
import math

def verify_euler():
    lhs = math.e ** (1j * math.pi) + 1
    return abs(lhs) < 1e-10

print(verify_euler())  # True
```

## Math mixed with CJK

欧拉公式 $e^{i\pi} + 1 = 0$ 是数学中最美的公式。
勾股定理：\(a^2 + b^2 = c^2\)，其中 \(c\) 是斜边长度。

\[
\text{面积} = \int_{a}^{b} f(x) \, dx
\]

二次方程式の解の公式: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ です。
