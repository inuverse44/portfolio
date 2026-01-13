---
title: 統計学入門 第6章の問題 6.8 ワイブル分布
date: '2026-01-13'
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
ワイブル分布の累積分布関数を求めよ。

##　解答
ワイブル分布自体は$x \geq 0$の範囲で
$$
    f(x)
    = b \frac{
        x^{b - 1}
    }{
        a^b
    }
    \exp\left[
        -\left(
            \frac{x}{a}
        \right)^b
    \right]
$$
で、$x < 0$の範囲では$f(x) = 0$の分布です。

したがって累積分布関数は定義より
$$
\begin{align*}
    F(x)
    &= \int_{-\infty}^{x} {\rm d}t\, f(t) \\
    &= \int_{-\infty}^{x} {\rm d}t\,b \frac{
        t^{b - 1}
    }{
        a^b
    }
    \exp\left[
        -\left(
            \frac{t}{a}
        \right)^b
    \right] \\
    &= \frac{
        b
    }{
        a^b
    }
    \int_0^x {\rm d}t\, 
    t^{b - 1} e^{- (t/a)^b} \\
    &= \frac{
        b
    }{
        a^b
    }
    \int^{x/a}_0 {
        {\rm d}y \,a\cdot (ay)^{b - 1} e^{- y^b}
    } \\
    &= b \int^{x/a}_0 {\rm d}y\, y^{b - 1} e^{- y^b} \\
    &= \int_0^{(x/a)^b} {\rm d}z\, e^{-z} \\
    &= 1 - e^{-(x/a)^b}
\end{align*}
$$
です。途中で適当に変数変換を施しています。

したがって、ワイブル分布の累積分布関数は
$$
    F(x)
    = \begin{cases}
        0 & (x < 0) \\
        1 - e^{-(x/a)^b} & (x \geq 0)
    \end{cases}
$$
となります。

## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)