---
title: Gauss分布のモーメント生成母関数
date: '2026-01-05'
tags:
  - 統計学
  - 数学
published: true
---

## Gauss分布のモーメント生成母関数

Gauss分布
$$
\begin{align}
    p(x)
    = \frac{1}{\sqrt{2\pi}\sigma}
    \exp \left[
        - \frac{(x - \mu)^2}{2\sigma^2}
    \right]
\end{align}
$$
が与えられた時、$n$次のモーメント$\braket{(x-\mu)^n}$が
$$
\begin{align}
    \braket{(x-\mu)^n}
    &=
    \begin{cases}
        (n-1)!!\sigma^n ,   & \text{$n$ is even}  ,\\
        0,          & \text{$n$ is odd} \,.\\
    \end{cases}
\end{align}
$$
となります。


定義より、平均値周りの$n$次のモーメントは
$$
\begin{align}
    \braket{(x-\mu)^n} 
    = \frac{1}{\sqrt{2\pi}\sigma} 
    \int_{-\infty}^\infty dx \, 
    (x - \mu)^n e^{-(x - \mu)^2/(2\sigma^2)}
\end{align}
$$
で与えられます。

$n$が奇数次のとき$\braket{(x - \mu)^n}$は
$$
\begin{align}
    \braket{(x-\mu)^n}
    &= \frac{1}{\sqrt{2\pi}\sigma} 
    \int_{-\infty}^\infty dx \, 
    (x - \mu)^n e^{-(x - \mu)^2/(2\sigma^2)} \notag \\
    &= \frac{1}{\sqrt{2\pi}\sigma} 
    \int_{-\infty}^\infty dy \, 
    y^n e^{-y^2/(2\sigma^2)} \notag \\
    &= 0
\end{align}
$$
です。ここで、$x$に対し$y = x - \mu$と変数変換を施しました。

$n$が偶数次の場合の積分を求める。Gauss積分の結果が
$$
\begin{align}
    \sqrt{\frac{\pi}{a}} 
    = \int_{-\infty}^\infty dy\, 
    e^{-ay^2}
\end{align}
$$
なので、これを$a$で偏微分すると
$$
\begin{align}
    - \frac{1}{2}\sqrt{\pi} a^{-3/2} 
    = - \int^\infty_{-\infty} dy\, 
    y^2 e^{- a y^2}
\end{align}
$$
となります。
さらに繰り返し微分することで
$$
\begin{align}
    (-1)^2 \sqrt{\pi} \frac{1 \cdot 3}{2^2} a^{-5/2} 
    &= (-1)^2 \int^\infty_{-\infty} dy\, 
    y^4 e^{- a y^2} \notag \\
    (-1)^3 \sqrt{\pi} \frac{1 \cdot 3 \cdot 5}{2^3} a^{-7/2} 
    &= (-1)^3 \int^\infty_{-\infty} dy\, 
    y^6 e^{- a y^2} \notag \\
    &\vdots \notag \\
     \sqrt{\pi} \frac{(2n - 1)!!}{2^n} a^{-(2n + 1)/2} 
    &= \int^\infty_{-\infty} dy\, 
    y^{2n} e^{- a y^2} \notag \\
\end{align}
$$
が分かります。

ここで、$m = 2n$と$a = 1/2\sigma^2$であることを使うと
$$
\begin{align*}
    \sqrt{\pi}
    \frac{(m - 1)!!}{2^{m/2}} \left(
        \frac{1}{2\sigma^2} 
    \right)^{-(m + 1)/2} 
    &= \int_{-\infty}^{\infty} dy\, y^m e^{- y^2/(2\sigma^2)} \\
    % ---------- %
    \Leftrightarrow
    \sqrt{\pi}
    \frac{(m - 1)!!}{2^{m/2}}
    2^{(m+1)/2} \sigma^{m + 1}
    &= \int_{-\infty}^{\infty} dy\, y^m e^{- y^2/(2\sigma^2)} \\
    % ---------- %
    \Leftrightarrow
    (m - 1)!!
    \sqrt{2\pi} \sigma^{m + 1}
    &= \int_{-\infty}^{\infty} dy\, y^m e^{- y^2/(2\sigma^2)} \\
    % ---------- %
    \Leftrightarrow
    (m - 1)!!
    \sigma^m
    &= \frac{1}{\sqrt{2\pi}\sigma }\int_{-\infty}^{\infty} dy\, y^m e^{- y^2/(2\sigma^2)}
\end{align*}
$$
です。よって、$m$を$n$に再びラベルすれば$(2)$が得られます。
