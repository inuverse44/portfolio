---
title: 統計学入門 第5章の問題 5.4 最小平均二乗
date: '2026-01-06'
tags:
  - 統計学
  - 確率
published: true
---


## 最小平均二乗

### 問題

$E[(X - a)^2]$を最小にする$a$およびその最小値を求めよ。


### 解答

$$
\begin{align}
  E[(X - a)^2]
  &= \int_{-\infty}^\infty (x - a)^2 f(x) \,{\rm d}x
\end{align}
$$
を$a$の関数だと思って$a$で微分すると
$$
\begin{align}
  \frac{\partial E[(X - a)^2]}{\partial a}
  &= -2a \int_{-\infty}^\infty (x - a) f(x) \,{\rm d}x \notag \\
  &= -2a E[(X - a)]
\end{align}
$$
となります。この微分が0になるところが最小値なので（$f(x) \geq 0, (x - a)^2 \geq 0$）、
$$
\begin{align}
  E[(X - a)]
  &= 0
\end{align}
$$
から$a = E(X)$が最小値をとる$a$となります。最後に期待値の線形性を使いました。



## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)


