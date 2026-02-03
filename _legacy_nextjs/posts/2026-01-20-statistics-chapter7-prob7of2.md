---
title: 統計学入門 第7章の問題 7.2 ポートフォリオ
date: '2026-01-20'
category: statistics-intro
tags:
  - 統計学
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。


## 問題
二つの確率変数$R_1, R_2$があり、$E[R_1] = e_1, V[R_1] = \sigma_1^2, E[R_2] = e_2, V[R_2] = \sigma_2^2$、$R_1, R_2$の相関係数を$\rho$とする。$0 \leq x \leq 1$に対して、確率変数
$$
    R_p = xR_1 + (1-x)R_2
$$
を定義する。

i) $R_p$の期待値$E[R_p]$、分散$V[R_p]$を求めよ。  
ii) $V[R_p]$の最小値を求めよ。  
iii) $e_1 = 0.198, \sigma_1 = 0.357, e_2 = 0.055, \sigma_2 = 0.203, \rho = 0.18$のとき、$E[R_p], V[R_p]$を$x$の関数としてグラフにせよ。



## 解答
i) 

期待値は
$$
\begin{align*}
    E[R_p]
    &= 
    E[xR_1 + (1-x)R_2] \\
    &= 
    xE[R_1] + (1-x)E[R_2] \\
    &= 
    xe_1 + (1-x)e_2
\end{align*}
$$

分散は
$$
\begin{align*}
    V[R_p]
    &= 
    E[(x R_1 + (1 - x)R_2)^2]
    - (E[x R_1 + (1 - x)R_2])^2 \\[8pt]
    &= 
    E[
        x^2 R_1^2 
        + 2x(1 - x) R_1 R_2
        + (1 - x)^2 R_2^2
    ] \\[8pt]
    &\qquad - (
        x^2 E[R_1]^2
        + 2 x (1 - x) E[R_1] E[R_2]
        + (1 - x)^2 E[R_2]^2
    ) \\[8pt]
    &= 
    x^2 (E[R_1] - E[R_2])^2
    + 
    (1 - x)^2 (E[R_2] - E[R_1])^2
    \\[8pt]
    &\qquad + 2x (1 - x) (E[R_1 R_2] - E[R_1] E[R_2])
    \\[8pt]
    &= 
    x^2 \sigma_1^2
    + (1 - x)^2 \sigma_2^2
    + 2x (1 - x) \rho \sigma_1 \sigma_2
\end{align*}
$$


ii)

$x$の2次間数とみなします：
$$
\begin{align*}
    V[R_p]
    &= 
    x^2 \sigma_1^2
    + (1 - x)^2 \sigma_2^2
    + 2x (1 - x) \rho \sigma_1 \sigma_2 \\[8pt]
    &= 
    (\sigma_1^2 + \sigma_2^2 - 2\rho \sigma_1 \sigma_2) x^2
    + 2 2\sigma_2(\rho \sigma_1 - \sigma_2) x 
    + \sigma_2^2 \\[8pt]
    &= (\sigma_1^2 + \sigma_2^2 - 2\rho \sigma_1 \sigma_2) \left\{
        x^2
        + 2 \frac{
            \sigma_2 (\rho \sigma_1 - \sigma_2)
        }{
            \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
        }
        x
    \right\} + \sigma_2^2 \\[8pt]
    &= (\sigma_1^2 + \sigma_2^2 - 2\rho \sigma_1 \sigma_2)
    \left\{
        x + \frac{
            \sigma_2 (\rho \sigma_1 - \sigma_2)
        }{
            \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
        }
    \right\}^2
    - \frac{
        \sigma_2^2 (\rho \sigma_1 - \sigma_2)^2
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
    + \sigma_2^2
\end{align*}
$$
と平方完成できます。最後の2つの定数項はまとめると
$$
\begin{align*}
    - \frac{
        \sigma_2^2 (\rho \sigma_1 - \sigma_2)^2
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
    + \sigma_2^2
    = \frac{
        (1 - \rho)^2 \sigma_1^2 \sigma_2^2
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
\end{align*}
$$
です。よって$x$の2次関数は
$$
    V[R_p]
    =
    (\sigma_1^2 + \sigma_2^2 - 2\rho \sigma_1 \sigma_2)
    \left\{
        x - \frac{
            \sigma_2 ( \sigma_2 - \rho \sigma_1)
        }{
            \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
        }
    \right\}^2
    +
    \frac{
        (1 - \rho)^2 \sigma_1^2 \sigma_2^2
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
$$
と表されます。

$x$の範囲は$0 \leq x \leq 1$であることから、最小値のとりうるパターンは三通りあります。
まずはこの二次関数の軸が$x \leq 0$である場合です。このとき
$$
\frac{
        \sigma_2 ( \sigma_2 - \rho \sigma_1)
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
}
\leq 0
$$
から$\rho \geq \sigma_2/\sigma_1$のとき、${\rm min}(V[R_p]) = \sigma_2^2$です。

次に二次関数の軸が$x \geq 1$であるとき、
$$
    \frac{
        \sigma_2 ( \sigma_2 - \rho \sigma_1)
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
    \geq 1
$$
から$\rho \geq \sigma_1 / \sigma_2$のとき、${\rm min}(V[R_p]) = \sigma_1^2$です。

最後に二次関数の軸が$0 < x < 1$にあるとき、
$$
    x = \frac{
            \sigma_2 ( \sigma_2 - \rho \sigma_1)
        }{
            \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
        }
$$
で、最小値
$$
    V[R_p]
    = 
    \frac{
        (1 - \rho)^2 \sigma_1^2 \sigma_2^2
    }{
        \sigma_1^2 + \sigma_2^2 - 2 \rho \sigma_1 \sigma_2
    }
$$
を取ります。

※
分母は常に正です。  
$\because$
$$
\begin{align*}
    \sigma_1^2 + \sigma_2^2 - 2\rho \sigma_1 \sigma_2
    &= \sigma_1^2 + \sigma_2^2 - 2\sigma_1 \sigma_2 + 2\sigma_1 \sigma_2 - 2\rho \sigma_1 \sigma_2
    \\[8pt]
    &= (\sigma_1 - \sigma_2)^2 + 2\sigma_1 \sigma_2 \underbrace{(1 - \rho)}_{\geq 0}
    \\
    &\geq 0
\end{align*}
$$



iii)


![fig1](/images/posts/2026-01-20-statistics-chapter7-prob7of2/plot.jpg)


## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)