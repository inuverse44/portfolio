---
title: 統計学入門 第5章の問題 5.7 正規分布の平方変換
date: '2026-01-07'
category: statistics-intro
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## 正規分布の平方変換

### 問題
確率変数$X$が正規分布
$$
    f_X(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-(x-\mu)^2/(2\sigma^2)}
$$
で、$\mu = 0$、$\sigma = 1$に従うとき、$X^2$の累積分布関数、密度関数、期待値、分散を求めよ。


### 解答
確率変数$X \sim {\cal N}(0, 1)$に対して、新しい確率変数$Y = X^2$を考えます。累積分布関数$F_Y(y)$は定義より
$$
    F_Y(y) = P(Y \leq y) = P(X^2 \leq y) = P(-\sqrt{y} \leq X \leq \sqrt{y})
$$
です。ここで正規分布の累積分布関数を$\Phi(x) = P(X \leq x)$と表すことにすると、$F_Y(y)$は
$$
    F_Y(y) = \Phi(\sqrt{y}) - \Phi(-\sqrt{y})
$$
となります。

> ※ここの考え方は$\int_{-\sqrt{y}}^{\sqrt{y}} = \int^{-\sqrt{y}}_{-\infty} + \int^{\sqrt{y}}_{-\infty}$のように積分範囲を分解していることをイメージすると分かりやすいかと思います。

ここで$\Phi(-x) = 1 - \Phi(x)$という性質を用いれば、求める累積分布関数は
$$
    F_Y(y) = \Phi(\sqrt{y}) - (1 - \Phi(\sqrt{y})) = 2\Phi(\sqrt{y}) - 1
$$
となります。


密度関数をこれを微分すると得られることができて、$y \geq 0$で
$$
\begin{align*}
    f_Y(y) 
    &= \frac{d}{dy} F_Y(y) \\
   &= \frac{d}{dy} (2 \Phi(\sqrt{y}) - 1) \\
   &= 2 \Phi^\prime(\sqrt{y}) \cdot \frac{1}{2\sqrt{y}} \\
   &= \frac{1}{\sqrt{2\pi y}} e^{-y/2}
\end{align*}
$$
となります。よって、密度関数は
$$
\begin{align*}
    f_Y(y) 
    &= 
    \left\{
    \begin{aligned}
        \frac{1}{\sqrt{2\pi y}} e^{-y/2} &\quad (y \geq 0)\\
        0 &\quad (y < 0)
    \end{aligned}
    \right.
\end{align*}
$$
です。


期待値は定義より
$$
    E[Y] = E[X^2] = V[X] + (E[X])^2 = 1 + 0^2 = 1
$$
となります。

分散は定義より
$$
\begin{align*}
    V[Y] 
    &= E[Y^2] - [E(Y)]^2 \\
    &= E[X^4] - 1^2 \\
    &= E[X^4] - 1
\end{align*}
$$
です。最後に$E[X^4]$を求めましょう。準備として次の積分を考えます：
$$
    \int_{-\infty}^{\infty} e^{-a x^2} \,{\rm d}x
    = \sqrt{\frac{\pi}{a}}
$$
これに$- \partial/\partial a$をとると
$$
    \int_{-\infty}^{\infty} x^2 e^{-a x^2} \,{\rm d}x
    = \frac{\sqrt{\pi}}{2} a^{-3/2}
$$
となります。もう一度$- \partial/\partial a$をとれば
$$
    \int_{-\infty}^{\infty} x^4 e^{-a x^2} \,{\rm d}x
    = \frac{3\sqrt{\pi}}{4} a^{-5/2}
$$
となります。よって、$E[X^4]$は
$$
\begin{align*}
    E[X^4]
    &= \frac{1}{\sqrt{2\pi}}
    \int_{-\infty}^{\infty} x^4 e^{-x^2/2} \,{\rm d}x \\
    &= \frac{1}{\sqrt{2\pi}} \cdot \frac{3\sqrt{\pi}}{4} 
    \left(\frac{1}{2}\right)^{-5/2} \\
    &= \frac{1}{\sqrt{2\pi}} 
    \cdot \frac{3\sqrt{\pi}}{4} 
    \cdot 4\sqrt{2} \\
    &= 3
\end{align*}
$$
となります。よって分散は
$$
    V[Y] = E[X^4] - 1 = 3 - 1 = 2
$$
となります。

## 余談

確率変数が${\cal N}(0, 1)$に従うとき、$X^2$はガンマ分布${\cal Ga}(1/2, 1/2)$に従います。また、ガンマ分布${\cal Ga}(n/2, 1/2)$は、自由度$n$の$\chi^2$分布と言われます。


## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)


