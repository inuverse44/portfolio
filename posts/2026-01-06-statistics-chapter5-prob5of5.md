---
title: 統計学入門 第5章の問題 5.5 正n面体の出目
date: '2026-01-06'
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## 正$n$面体の出目

### 問題

正$n$面体で$1, 2, \ldots, n$の乱数を発生させるとする。この乱数の期待値、分散を求めよ。ただし、正$n$面体とは、正四面体、正六面体、正八面体、正十二面体、正二十面体の五種類の立体のことである。


### 解答
この問題の意味は分かりずらいと思うが、例えばサイコロの目を例に見ると良いです。サイコロの目の期待値は
$$
\begin{align*}
  E(X)
  &= \frac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) 
  = \frac{21}{6} 
  = \frac{7}{2}
\end{align*}
$$
であり、これを$正n$面体に拡張しただけです。

$正n$面体の出る目を確率変数$X$とすると、
$$
\begin{align*}
  E(X)
  &=  \sum_{k=1}^n \frac{1}{n} \cdot k 
  = \frac{1}{n} \sum_{k=1}^n k 
  = \frac{1}{n} \cdot \frac{n(n+1)}{2}
  = \frac{n+1}{2}
\end{align*}
$$
です。

分散を求めるために、離散分布の2次のモーメントは
$$
\begin{align*}
  E[X^2] 
  &= \frac{1}{n}\sum_{k = 1}^n k^2 \notag \\
  &= \frac{1}{n} \cdot \frac{n(n+1)(2n+1)}{6} \notag \\
  &= \frac{(n+1)(2n+1)}{6}
\end{align*}
$$
となります。よって分散は
$$
\begin{align*}
  V[X]
  &= E[X^2] - [E(X)]^2 \notag \\
  &= \frac{n^2 - 1}{12}
\end{align*}
$$
となります。


## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)


