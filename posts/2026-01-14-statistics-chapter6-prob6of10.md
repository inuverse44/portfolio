---
title: 統計学入門 第6章の問題 6.10 正規分布・指数分布の尖度
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
モーメント母関数の展開式から、正規分布、指数分布の尖度を求めよ。

## 解答
### 正規分布
モーメント母関数の定義から
$$
    M_X(t)
    = \int_{-\infty}^{\infty} {\rm d}x\, e^{xt} f(x)
    = \frac{1}{\sqrt{2\pi}\sigma}
    \int_{-\infty}^{\infty} {\rm d}x\, e^{xt} \exp\left[-\frac{1}{2}\frac{(x-\mu)^2}{\sigma^2}\right]
$$
を計算すればいいだけです。

まずは指数の肩の因子を平方完成しましょう：
$$
\begin{align*}
    - \frac{(x-\mu)^2}{2\sigma^2}
    + tx
    &= - \frac{1}{2\sigma^2}
    \left[
        (x - \mu)^2 - 2\sigma^2 t x
    \right] \\
    &= - \frac{1}{2\sigma^2}
    \left[
        \{x - (\mu - \sigma^2 t) \}^2 - \sigma^4 t^2 - 2 \mu \sigma^2 t
    \right]
\end{align*}
$$

したがって、
$$
\begin{align*}
    M_X(t)
    &= \frac{1}{\sqrt{2\pi}\sigma}
    \int_{-\infty}^{\infty} {\rm d}x\, e^{xt} \exp\left[-\frac{1}{2}\frac{(x-\mu)^2}{\sigma^2}\right] \\[8pt]
    &= \exp \left[
        \mu t + \frac{\sigma^2}{2} t^2
    \right]
    \cdot 
    \frac{1}{\sqrt{2\pi}\sigma}
    \int_{-\infty}^{\infty} {\rm d}x\, 
    \exp\left[
        -\frac{1}{2}\frac{
            \{ x - (\mu - \sigma^2 t) \}^2
        }{
            \sigma^2
        }
    \right] \\[8pt]
    &= \exp \left[
        \mu t + \frac{\sigma^2}{2} t^2
    \right]
\end{align*}
$$
です。最後の行への変換は正規分布の期待値のシフトに対しても全領域の確率分布の積分は変わらないことを利用しています。なので$1$です。

モーメント母関数を$t$で微分すると
$$
\begin{align*}
    \frac{{\rm d} M_X(t)}{{\rm d}t} 
    &= (\mu + \sigma^2 t) e^{\mu t + (\sigma^2/2) t^2} \\[16pt]

    \frac{{\rm d}^2 M_X(t)}{{\rm d}t^2}
    &= \left[
        \sigma^2 
    + (\mu + \sigma^2 t)^2 
    \right] e^{\mu t + (\sigma^2/2) t^2} \\[16pt]

    \frac{{\rm d}^3 M_X(t)}{{\rm d}t^3}
    &= \left[
        (\mu + \sigma t^2) (3 \sigma^2 + (\mu + t \sigma^2)^2)
    \right] e^{\mu t + (\sigma^2/2) t^2} \\[16pt]
    
    \frac{{\rm d}^4 M_X(t)}{{\rm d}t^4}
    &= \left[
        (3 \sigma^4 
        + 6 \sigma^2 (\mu + t\sigma^2)^2
        + (\mu + t \sigma^2)^4)
    \right] e^{\mu t + (\sigma^2/2) t^2} \\[16pt] 
\end{align*}
$$
を得ることができます。従って、1次から4次のモーメントは上記の微分に$t = 0$を代入して、
$$
\begin{align*}
    E(X)
    &= \mu \\[8pt]
    E(X^2)
    &= \mu^2 + \sigma^2 \\[8pt]
    E(X^3)
    &= \mu^3 + 3\mu\sigma^2 \\[8pt]
    E(X^4)
    &= \mu^4 + 6\mu^2\sigma^2 + 3\sigma^4
\end{align*}
$$
となります。ちなみに分散は$V = E[X^2] - E[X]^2 = \sigma^2$となります。

歪度 (skewness) $S$は
$$
\begin{align*}
    S 
    &= \frac{E[(X - \mu)^3]}{\sigma^3} \\[8pt]
    &= \frac{E[X^3] - 3 \mu E[X^2] + 2 \mu^3}{\sigma^3} \\
    &= \frac{
        \mu^3 + 3\mu\sigma^2 - 3\mu(\mu^2 + \sigma^2) + 2\mu^3
    }{
        \sigma^3
    } \\
    &= \frac{
        \mu^3 + 3\mu\sigma^2 - 3\mu^3 - 3\mu\sigma^2 + 2\mu^3
    }{
        \sigma^3
    } 
    = 0
\end{align*}
$$
となります。左右対称なので直感的にも頷けます。

尖度 (kurtosis) $K$は
$$
\begin{align*}
    K 
    &= \frac{E[(X - \mu)^4]}{\sigma^4} - 3 \\[8pt]
    &= \frac{E[X^4] - 4 \mu E[X^3] + 6 \mu^2 E[X^2] - 3 \mu^4}{\sigma^4} - 3 \\[8pt]
    &= \frac{
        (\mu^4 + 6\mu^2\sigma^2 + 3\sigma^4)
        - 4\mu(\mu^3 + 3\mu\sigma^2)
        + 6\mu^2(\mu^2 + \sigma^2)
        - 3\mu^4
    }{
        \sigma^4
    } - 3 \\[8pt]
    &= \frac{
        \mu^4 + 6\mu^2\sigma^2 + 3\sigma^4
        - 4\mu^4 - 12\mu^2 \sigma^2 
        + 6\mu^4 + 6\mu^2\sigma^2
        - 3\mu^4
    }{
        \sigma^4
    } - 3 \\[8pt]
    &= \frac{
       ( 1 - 4 + 6 - 3) \mu^4 
       + (6 - 12 + 6) \mu^2 \sigma^2
       + (3) \sigma^4
    }{
        \sigma^4
    } - 3 \\[8pt]
    &= 0
\end{align*}
$$
となります。[^1]の記述にもあるように、この$-3$する理由は、尖度が正規分布の正規化された4次のモーメントを基準にして定義してるからです。正規分布に比べて尖っているのか鈍いのかを表すので、定義から差がなく0になるということは自然ですね。

よって
$$
\begin{align*}
    E[X] &= \mu \\[8pt]
    V[X] &= \sigma^2 \\[8pt]
    S &= 0 \\[8pt]
    K &= 0 \tag{1}
\end{align*}
$$
となります。

##### 余談
ここまで4次の計算をするためにたくさん微分して、低次の微分をかけたり足したりして計算を進めていきました。このような低次の寄与は初めから除いて、一気に計算できて欲しいです。詳細は省きますが、それを実現するのがキュムラントです。キュムラントを$K_X(t) = \log M_X(t)$と定義すると、
$$
    K_X(t)
    = \log M_X(t)
    = \mu t + \frac{\sigma^2}{2} t^2
$$
となります。この$t$の分母の階乗部分を除いた係数がそれぞれ、期待値、分散、歪度、尖度に対応するので、直ちに$(1)$の答えが求められます。

### 指数分布
指数分布のモーメント母関数は
$$
\begin{align*}
    M_X(t)
    &= \int_{0}^{\infty} {\rm d}x\, e^{xt} f(x) \\[8pt]
    &= \int_{0}^{\infty} {\rm d}x\, \lambda e^{-\lambda x} e^{xt} \\[8pt]   
    &= \lambda \int_{0}^{\infty} {\rm d}x\, e^{(t - \lambda) x} \\[8pt]
    &= \frac{\lambda}{\lambda - t}
\end{align*}
$$
となります。この結果を微分すると
$$
\begin{align*}
    \frac{{\rm d} M_X(t)}{{\rm d}t}
    &= \frac{\lambda}{(\lambda - t)^2} \\[8pt]
    \frac{{\rm d}^2 M_X(t)}{{\rm d}t^2}
    &= \frac{2\lambda}{(\lambda - t)^3} \\[8pt]
    \frac{{\rm d}^3 M_X(t)}{{\rm d}t^3}
    &= \frac{6\lambda}{(\lambda - t)^4} \\[8pt]
    \frac{{\rm d}^4 M_X(t)}{{\rm d}t^4}
    &= \frac{24\lambda}{(\lambda - t)^5}
\end{align*}
$$
を得ることができます。これに$t = 0$を代入した結果が1次, 2次, 3次, 4次のモーメントとなるので、
$$
\begin{align*}
    E[X] &= \frac{1}{\lambda} \\
    E[X^2] &= \frac{2}{\lambda^2} \\
    E[X^3] &= \frac{6}{\lambda^3} \\
    E[X^4] &= \frac{24}{\lambda^4}
\end{align*}
$$
となります。

歪度は
$$
\begin{align*}
    S[X]
    &= \frac{E[(X - \mu)^3]}{\sigma^3} \\[8pt]
    &= \frac{E[X^3] - 3 \mu E[X^2] + 2 \mu^3}{\sigma^3} \\[8pt]
    &= \frac{
        \frac{6}{\lambda^3}
        - 3 \frac{1}{\lambda} \frac{2}{\lambda^2}
        + 2 \left(\frac{1}{\lambda}\right)^3
    }{
        \left(\frac{1}{\lambda}\right)^3
    } \\[8pt]
    &= 2
\end{align*}
$$
となります。

尖度は
$$
\begin{align*}
    K[X]
    &= \frac{E[(X - \mu)^4]}{\sigma^4} - 3 \\[8pt]
    &= \frac{E[X^4] - 4 \mu E[X^3] + 6 \mu^2 E[X^2] - 3 \mu^4}{\sigma^4} - 3 \\[8pt]
    &= \frac{
        \frac{24}{\lambda^4}
        - 4 \frac{1}{\lambda} \frac{6}{\lambda^3}
        + 6 \left(\frac{1}{\lambda}\right)^2 \frac{2}{\lambda^2}
        - 3 \left(\frac{1}{\lambda}\right)^4
    }{
        \left(\frac{1}{\lambda}\right)^4
    } - 3 \\[8pt]
    &= 6
\end{align*}
$$
となります。

よって
$$
\begin{align*}
    E[X] &= \frac{1}{\lambda} \\[8pt]
    V[X] &= \frac{1}{\lambda^2} \\[8pt]
    S[X] &= 2 \\[8pt]
    K[X] &= 6
\end{align*}
$$
となります。


## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)