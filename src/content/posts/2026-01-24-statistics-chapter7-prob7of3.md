---
title: 統計学入門 第7章の問題 7.3 独立と無相関
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
二つのつぼ$A, B$の中に３個のボールを投げ入れる。つぼ$A$の中にはいったボールの数を$X$、ボールの入っているつぼの数を$Y$とするとき、$X, Y$の同時確率分布を求めて、$X, Y$は無相関であるが、独立ではないことを示せ。

## 解答
ボール3つそれぞれについて$A$に入る、入らないという事象があるため、
$AAA, AAB, ABA, ABB, BAB, BAA, BBA, BBB$という8つの可能性が考えられます。一方、$Y$はボールが入っているつぼの数であるから、8つの可能性のうち、$Y = 1$となるのは$AAA, BBB$のとき、$Y = 2$はそれ以外の場合となります。よって同時確率分布は
$$
\begin{array}{c|cc|c}
    & Y = 1 & Y = 2 & Y \\
\hline
X = 0 & \frac{1}{8} & 0 & \frac{1}{8} \\
X = 1 & 0 & \frac{3}{8} & \frac{3}{8} \\
X = 2 & 0 & \frac{3}{8} & \frac{3}{8} \\
X = 3 & \frac{1}{8} & 0 & \frac{1}{8} \\ \hline
X & \frac{1}{4} & \frac{3}{4} & 1 \\
\end{array}
$$
となります。

ここで、
$$
    P(X = 0, Y = 1)
    = \frac{1}{8}
    \neq  P(X = 0) P(Y = 1) = \frac{1}{32}
$$
であるため、2つの事象は独立ではありません。

一方、期待値を考えると
$$
\begin{align*}
    E[X]
    &= \frac{3}{2} \\[8pt]
    E[Y]
    &= \frac{7}{4} \\[8pt]
    E[XY]
    &= \frac{21}{8}
\end{align*}
$$
であるので、共分散が
$$
    {\rm Cov}[X, Y]
    = E[XY] - E[X]E[Y]
    = \frac{21}{8} - \frac{3}{2} \cdot \frac{7}{4}
    = 0
$$
となるため、2つの事象は無相関です。

## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)