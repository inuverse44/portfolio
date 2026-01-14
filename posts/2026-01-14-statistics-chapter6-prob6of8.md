---
title: 統計学入門 第6章の問題 6.8 ベータ分布
date: '2026-01-14'
category: statistics-intro
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。


## 問題
ベータ分布のモードを求めよ。

## 解答
モードとは分布関数の$f(x)$が最大となる$x$の値$x_0$です。
いまベータ分布とは
$$
    f(x)
    = \frac{x^{\alpha - 1} (1 - x)^{\beta - 1}}{B(\alpha, \beta)}
    \quad \text{where}
    \quad \alpha, \beta > 0
$$
です。$B(\alpha, \beta)$はベータ関数で、
$$
    B(\alpha, \beta)
    = \int_0^1 {\rm d}x\, x^{\alpha - 1} (1 - x)^{\beta - 1}
    \quad \text{where}
    \quad \alpha, \beta > 0
$$
と表されますが、定数です。今回の問題では重要ではありません

したがって、$x$で微分してみると
$$
\begin{align*}
    \frac{{\rm d}f(x)}{{\rm d}x}
    &= \frac{1}{B(\alpha, \beta)}
    \left[
        (\alpha - 1) x^{\alpha - 2} (1 - x)^{\beta - 1}
        + x^{\alpha - 1} \cdot (\beta - 1)  (1 - x)^{\beta - 2} \cdot (-1)
    \right] \\
    &= \frac{x^{\alpha -2} (1 - x)^{\beta - 2}}{B(\alpha, \beta)}
    \left[
        (\alpha - 1)(1 - x)
        + (\beta - 1)x
    \right] \\
\end{align*}
$$
となります。よって、モードは
$$
    x_0
    = \frac{\alpha - 1}{\alpha + \beta - 2}
$$
となります。




## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)