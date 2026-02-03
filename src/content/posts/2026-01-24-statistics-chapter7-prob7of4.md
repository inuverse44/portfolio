---
title: 統計学入門 第7章の問題 7.4 秤量問題
date: '2026-01-24'
category: statistics-intro
tags:
  - 統計学
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。


## 問題
二つの物体$A, B$の重さ$m_A, m_B$を測りたい。$A, B$のそれぞれを天秤の片側に載せて測る方法(I)と、まず一方に$A,B$両方を乗せて重さの和を測り、また天秤の両側に乗せて差を測りそこから算出する方法(II)がある。I, IIのどちらの方が優れた方法か。ただし、天秤の測定誤差の分散はつねに$\sigma^2$とする。

## 解答
I, IIで測定誤差の分散が、どちらのほうが小さいかという問題です。Iの分散は自明なので、IIの場合を計算しましょう。

$A, B$それぞれの測定誤差を確率変数とし、それを$X_A, X_B$で表すとします。このとき(II)の方法に対応する新しい確率変数
$$
    Y
    = \frac{X_a + X_b}{2}\,, 
    \quad
    Z 
    = \frac{X_a - X_b}{2}
$$
を定義しておきます。この確率分布の分散は、分散の性質
$$
    V[aX + bY] = a^2 V[X] + b^2 V[Y] + 2ab\, {\rm Cov}[X, Y]
$$
から、
$$
\begin{align*}
    V[Y]
    &= V\left[
        \frac{X_a + X_b}{2}
    \right] \\[8pt]
    &= \frac{1}{4} V[X_a + X_b] \\[8pt]
    &= \frac{1}{4} (V[X_a] + V[X_b]) \\[8pt]
    &= \frac{\sigma^2}{2}
\end{align*}
$$
となります。$V[Z]$も同様に計算できて、どちらの場合も$\sigma^2/2$となります。

よって、(II)の方法が測定誤差の分散が小さく、優れていると言えます。


## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)