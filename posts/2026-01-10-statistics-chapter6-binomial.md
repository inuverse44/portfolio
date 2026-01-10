---
title: 
date: '2026-01-10'
tags:
  - 統計
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。

## 二項分布

### ベルヌーイ試行
ある事象において成功の確率を$p$、失敗の確率を$q = 1 - p$としたときに、毎回同じ条件でかつ独立に試行を$n$回行うことを考えます。この試行をベルヌーイ試行と言います。

### 二項分布
いま、成功が$x$回、失敗が$n-x$回であるとき、その確率分布は
$$
\begin{align}
    f(x) 
    = {}_{n} C_x p^x q^{n-x}
\end{align}
$$
と与えられます。この確率分布を二項分布 (binomial distribution) と言い${\rm Bi}(n, p)$で表します。この分布は確率の条件$\sum_x f(x) = 1$を確かに満たしており、二項定理により
$$
\begin{align}
    \sum_{x=0}^{n} f(x)
    = \sum_{x=0}^{n} {}_{n} C_x p^x q^{n-x}
    = (p + q)^n
    = 1
\end{align}
$$
です。

### 二項分布の期待値と分散
期待値は定義より
$$
\begin{align*}
    E[X]
    &= \sum_{x=0}^{n} x f(x) \\[8pt]
    &= \sum_{x=0}^{n} x\cdot {}_{n} C_x p^x q^{n-x}
\end{align*}
$$
であり、ここで組み合わせの数が
$$
\begin{align*}
    x\cdot {}_{n} C_x 
    &= x \cdot \frac{n!}{x!(n-x)!} \\[8pt]
    &= n\cdot \frac{(n - 1)!}{(x-1)!\{(n - 1)-(x - 1)\}!} \\[8pt]
    &= n\cdot {}_{n-1} C_{x-1}
\end{align*}
$$
となることから、
$$
\begin{align*}
    E[X]
    &= \sum_{x=0}^{n} x\cdot {}_{n} C_x p^x q^{n-x}  \qquad \text{（$x=0$は0に注意）} \\[8pt]
    &= \sum_{x=1}^{n} n\cdot {}_{n-1} C_{x-1} p^x q^{n-x} \\[8pt]
    &= np \sum_{x=1}^{n} {}_{n-1} C_{x-1} p^{x-1} q^{n-x} \\[8pt]
    &= np \sum_{y=0}^{n} {}_{n-1} C_{y} p^y q^{(n-1)-y} \qquad (y = x - 1)\\[8pt]
    &= np \sum_{y = 0}^n {\rm Bi}(n - 1, p)
    = np \cdot 1
    = np
\end{align*}
$$
となります。

分散もまた同様な式変形がで求められます。まず2次のモーメントは
$$
\begin{align*}
    E[X^2]
    &= \sum_{x=0}^{n} x^2\cdot {}_{n} C_x p^x q^{n-x} \\[8pt]
    &= n p \sum_{x=1}^{n} x \cdot {}_{n-1} C_{x-1} p^x q^{n-x} \\[8pt]
    &= n p \sum_{x=1}^{n} \left [
        (x - 1) \cdot {}_{n-1} C_{x-1} p^{x - 1} q^{n - x}
        + {}_{n-1} C_{x-1} p^{x-1} q^{n-x}
    \right ] \\[8pt]
    &= n p \sum_{x=1}^{n} \left [
        (x - 1) \cdot {}_{n-1} C_{x-1} p^{x - 1} q^{n - x}
        + {}_{n-1} C_{x-1} p^{x-1} q^{n-x}
    \right ] \\[8pt]
    &= n p \left [
        \sum_{x=1}^{n} 
        (x - 1) \cdot {}_{n-1} C_{x-1} p^{x - 1} q^{n - x}
        + \sum_{x=1}^{n} 
        {}_{n-1} C_{x-1} p^x q^{n-x}
    \right ] \\[8pt]
\end{align*}
$$
ここで括弧内の第1項は
$$
\begin{align*}
    \sum_{x=1}^{n} 
    (x - 1) \cdot {}_{n-1} C_{x-1} p^{x - 1} q^{n - x}
    = (n - 1) p \sum_{x=2}^{n} 
    {}_{n-2} C_{x-2} p^{x - 2} q^{n - x}
\end{align*}
$$
であり、結局総和は1であるので
$$
\begin{align*}
    E[X^2]
    &=
    n(n - 1)p^2 + np
\end{align*}
$$
となります。よって、分散は
$$
\begin{align*}
    V[X]
    &= E[X^2] - (E[X])^2 \\[8pt]
    &= n(n - 1)p^2 + np - (np)^2 \\[8pt]
    &= np (1 - p)
\end{align*}
$$
と導けます。

分散は$V[X] = np (1 - p)$で、$p$について上に凸の2次関数であり、かつ$0 \leq p \leq 1$です。この$p$としての関数は明らかに$p = 0, 1$で分散が0になるので、その間の$p = 1/2$が2次関数の軸となります。$p = 1/2$で分散が最大となり、$V[X] = n/4$となります。

結局確率が$1/2$のときが、成功・失敗のどちらの可能性もあり、正直どっちやねんという気持ちになります。一番当てにならないという直感が、分散が最大ということに表れています。

[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)




