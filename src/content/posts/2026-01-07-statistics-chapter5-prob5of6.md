---
title: 統計学入門 第5章の問題 5.6 一様分布の平方変換
date: '2026-01-07'
category: statistics-intro
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## 一様分布の平方変換

### 問題

確率変数$X$が$[0, 1]$上の一様分布に従うとき、$Y = X^2$の累積分布関数、密度関数、期待値、分散を求めよ。


### 解答

新しい確率変数を$Y = X^2$とおきます。このとき確率変数$X, Y$に対する2つの密度関数の関係は、
$$
    f_Y(y) = f_X(x) \left| \frac{dx}{dy} \right|
$$
となります。

よって、$X = [0, 1]$であることに注意すれば、確率変数$Y$の密度関数は
$$
\begin{align*}
    f_Y(y) = 
    \left\{
    \begin{aligned}
        \frac{1}{2\sqrt{y}} &\quad (0 \leq y \leq 1)\\
        0 &\quad (\text{otherwise})
    \end{aligned}
    \right.
\end{align*}
$$
となります。

確率変数$Y$の累積分布関数は$F_Y(y) = \int_{-\infty}^{y} f_Y(y^\prime) \,{\rm d}y^\prime$なので、(i)$y < 0$、(ii)$0 \leq y < 1$、(iii)$y \geq 1$のときに場合分けする必要があります。(i)と(iii)はそれぞれ明らかに$0$と$1$なので、(ii)を計算すればよいです。実際に計算すると、
$$
\begin{align*}
    F_Y(y) 
    &= \int_{-\infty}^{y} f_Y(y^\prime) \,{\rm d}y^\prime \
    &= \int_{0}^{y} \frac{1}{2\sqrt{y^\prime}} \,{\rm d}y^\prime \
    &= \sqrt{y}
\end{align*}
$$
なので、したがって累積分布関数は
$$
    F_Y(y) = 
    \left\{
    \begin{aligned}
        0 &\quad (y < 0)\\
        \sqrt{y} &\quad (0 \leq y < 1)\\
        1 &\quad (y \geq 1)
    \end{aligned}
    \right.
$$
となります。

期待値は
$$
\begin{align*}
    E(Y) 
    &= \int_{-\infty}^{\infty} y f_Y(y) \,{\rm d}y \\
    &= \int_{0}^{1} y \cdot \frac{1}{2\sqrt{y}} \,{\rm d}y \\
    &= \int_{0}^{1} \frac{\sqrt{y}}{2} \,{\rm d}y \\
    &= \left[ \frac{1}{2} \cdot\frac{2}{3} y^{3/2} \right]_{0}^{1} \\
    &= \frac{1}{3}
\end{align*}
$$
です。

分散を求めるために2次のモーメントを計算すると、
$$
\begin{align*}
    E(Y^2)
    &= \int_{-\infty}^{\infty} y^2 f_Y(y) \,{\rm d}y \\
    &= \int_{0}^{1} y^2 \cdot \frac{1}{2\sqrt{y}} \,{\rm d}y \\
    &= \int_{0}^{1} \frac{y^{3/2}}{2} \,{\rm d}y \\
    &= \left[ \frac{1}{2} \cdot \frac{2}{5} y^{5/2} \right]_{0}^{1} \\
    &= \frac{1}{5}
\end{align*}
$$
となります。よって分散は
$$
\begin{align*}
    V(Y)
    &= E(Y^2) - [E(Y)]^2 \\
    &= \frac{1}{5} - \left(\frac{1}{3}\right)^2 \\
    &= \frac{1}{5} - \frac{1}{9} \\
    &= \frac{4}{45}
\end{align*}
$$
となります。



## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)


