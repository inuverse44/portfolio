---
title: 統計学入門 第6章の問題 6.5 密度関数の規格化
date: '2026-01-12'
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。


## 問題
$f(x) = c(1 - x^2)\, (-1 \leq x \leq 1), \, 0\, (\text{otherwise})$が確立密度関数となるように定数$c$を求めよ。また、この確率分布の期待値、分散、歪度、尖度を求めよ。

## 解答
規格化の条件により
$$
\begin{align*}
    1
    &= \int_{-\infty}^{\infty} {\rm d}x \, f(x)  \\
    &= c \int_{-1}^1 {\rm d}x \, (1 - x^2) \\
    &= 2c \int_{0}^1 {\rm d}x \, (1 - x^2) \\
    &= 2c \left(1 - \frac{1}{3} \right) = \frac{4}{3} c 
\end{align*}
$$
となります。よって、
$$
    c = \frac{3}{4}
$$
と求まります。

また、期待値、分散、歪度、尖度を計算するために1次から4次のモーメントを求めると
$$
\begin{align}
    E[X]
    &= \frac{3}{4} \int_{-1}^{1} {\rm d}x \, x (1 - x^2) = 0\,, \\
    E[X^2]
    &= \frac{3}{4} \int_{-1}^{1} {\rm d}x \, x^2 (1 - x^2) = \frac{1}{5}\,, \\
    E[X^3]
    &= \frac{3}{4} \int_{-1}^{1} {\rm d}x \, x^3 (1 - x^2) = 0\,, \\
    E[X^4]
    &= \frac{3}{4} \int_{-1}^{1} {\rm d}x \, x^4 (1 - x^2) = \frac{3}{35}\,, \\
\end{align}
$$
となります。期待値$\mu = E[X] = 0$、分散は$\sigma^2 = V[X] = E[X^2] - (E[X])^2 = \frac{1}{5}$、歪度は$S_{3} = E[(X - \mu)^3] / \sigma^3 = 0$、尖度は$K_{4} = E[(X - \mu)^4] / \sigma^4 - 3 = - \frac{6}{7}$となります。




[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)

