---
title: 統計学入門 第6章の問題 6.3 負の二項分布
date: '2026-01-12'
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
負の二項分布を導出せよ。


## 解答

ベルヌーイ試行を考え、成功($S$)と失敗($F$)をそれぞれ確率$p$と$q = 1 - p$で表すとします。
成功がちょうど$k$回起こるときの分布を求めましょう。失敗の数は$x$回です。

したがって、条件として
- 最後の試行は$S$である
- $k + x - 1$回の試行には$S$が$k - 1$回、$F$が$x$回ある

と言えます。

確率変数$X$を$F$の数とすると、その分布は
$$
   f(x) = \binom{k + x - 1}{k - 1} p^k q^x
$$
が得られます。これが確率分布であるためには$\sum_{x = 0}^{\infty} f(x) = 1$を満たす必要があります。

--- 

ところでこの分布は二項分布ににています。二項分布は
$$
   f(x) = \binom{n}{x} p^x q^{n - x}    
$$
であり、試行回数$n$を固定して、確率変数$X$を成功$S$の数として与えています。これが確率分布であることは二項定理から分かり、
$$
    \sum_{x = 0}^{n} \binom{n}{x} p^x q^{n - x} = (p + q)^n = 1
$$
です。

上記の二項定理は$n, x \in \mathbb{N}$を満たすものですが、負の二項分布はこれを拡張し、$n \in \mathbb{R}$まで許容するようにします。まず、組み合わせの数を次のように拡張します：
$$
    \binom{\alpha}{x} = \frac{
        \alpha(\alpha - 1) \cdots (\alpha - x + 1)
    }{
        x!
    }
    \quad\text{where}\quad
    \alpha \in \mathbb{R}
$$
$\alpha = -k$とすると、
$$
\begin{align*}
    \binom{-k}{x} 
    &= \frac{
        (-k)(-k - 1) \cdots (-k - x + 1)
    }{
        x!
    }\\
    &= (-1)^x
    \frac{
        k(k + 1) \cdots (k + x - 1)
    }{
        x!
    } \\
    &= (-1)^x \binom{k + x - 1}{x}
\end{align*}
$$
です。よって$(1 + z)^{-k}$の展開は
$$
\begin{align*}
    (1 - z)^{-k} 
    &= \sum_{x = 0}^{\infty} \binom{-k}{x} (-z)^x
    \\
    &= \sum_{x = 0}^{\infty} (-1)^x \binom{k + x - 1}{x} (-1)^x z^x
    \\
    &= \sum_{x = 0}^{\infty} \binom{k + x - 1}{x} z^x \tag{1}
\end{align*}
$$
となります。負に拡張しているので下限がなく、そのため無限和になります。

> ※もし正のままなら
> $$
>     {}_n C_{x} = \frac{
>         n(n - 1) \cdots (n - x + 1)
>     }{
>         x!
>     }
> $$
> で、$n = x - 1$のときに分子が$0$になります。有限和になりますが、いま$n$が負になるので、$(n-1)(n - 2)\cdots$をいくら伸ばしても、分子に$0$が現れることはありません。

--- 

さて、上記の負まで拡張した$(1)$に$z = q = 1 - p$を代入すると、
$$
\begin{align*}
    (1 - q)^{-k} 
    &= \sum_{x = 0}^\infty \binom{k + x - 1}{x} q^x \\
    \Leftrightarrow\quad 
    p^{-k}
    &= \sum_{x = 0}^\infty \binom{k + x - 1}{x} q^x \\
    \Leftrightarrow\quad
    1
    &= \sum_{x = 0}^\infty \binom{k + x - 1}{x} p^k q^x \\
\end{align*}
$$
となります。よって、確かに確率分布の性質を満たすことがわかりました。

## ついでに期待値・分散も

### ゴリ押しで計算する方法

期待値を求めます。定義より
$$
\begin{align*}
    E[X]
    &= \sum_{x = 0}^\infty x \cdot \binom{k + x - 1}{x} p^k q^x \\
\end{align*}
$$
を計算します。二項分布とどうようにすればいいです。そこで組み合わせの恒等式を思い出します：
$$
\begin{align*}
    n \cdot \binom{n}{m}
    &= m \cdot\binom{n - 1}{m - 1}
\end{align*}
$$
これを$x \cdot \binom{k + x - 1}{x}$に適用すると
$$
\begin{align*}
    x \cdot \binom{k + x - 1}{x}
    &= (k + x - 1) \cdot \binom{k + x - 2}{x - 1}
\end{align*}
$$
となります。さらに自明な式
$$
\begin{align*}
    \binom{m}{n} = \frac{m}{m - n} \binom{m - 1}{n}
    \tag{2}
\end{align*}
$$
を適用すると
$$
\begin{align*}
    x \cdot \binom{k + x - 1}{x}
    &= (k + x - 1) \cdot \binom{k + x - 2}{x - 1} \\
    &= k \cdot \binom{k + x - 1}{x - 1}
\end{align*}
$$
となります（$(2)$に$m = k + x - 1, n = x - 1$と対応させてください）。よって期待値は
$$
\begin{align*}
    E[X]
    &= \sum_{x = 1}^\infty x \cdot \binom{k + x - 1}{x} p^k q^x \\
    &= \sum_{x = 1}^\infty k \cdot \binom{k + x - 1}{x - 1} p^k q^x \\
    &= k p^k q \sum_{y = 0}^\infty \binom{k + y}{y} q^y \\
    &= k p^k q \cdot \frac{1}{(1 - q)^{k + 1}} \\
    &= k \frac{q}{p}
\end{align*}
$$
となります。


分散も同様に計算します。まず2次のモーメントは
$$
\begin{align*}
    E[X^2]
    &= \sum_{x = 1}^\infty x^2 \cdot \binom{k + x - 1}{x} p^k q^x \\
\end{align*}
$$
です。ここで係数について
$$
\begin{align*}
    x(x - 1) \binom{k + x - 1}{x}
    &= \frac{(k + x - 1)!}{(x - 2)!(k - 1)!} \\
    &= k(k + 1) \frac{(k + x - 1)!}{(x - 2)!(k + 1)!} \\
    &= k(k + 1) \binom{k + x - 1}{x - 2}
\end{align*}
$$
という恒等式が成り立つので、2次のモーメントの式に対して無理やりこの形を作ります。つまり
$$
\begin{align*}
    E[X^2]
    &= \sum_{x = 1}^\infty x(x - 1) \cdot \binom{k + x - 1}{x} p^k q^x 
    + \sum_{x = 1}^\infty x \cdot \binom{k + x - 1}{x} p^k q^x \
\end{align*}
$$
です。右辺第２項は$E[X]$なので右辺第１項を計算しましょう。
$$
\begin{align*}
    \sum_{x = 1}^\infty x(x - 1) \cdot \binom{k + x - 1}{x} p^k q^x 
    &= \sum_{x = 1}^\infty k(k + 1) \cdot \binom{k + x - 1}{x - 2} p^k q^x \\
    &= k(k + 1) p^k q^2 \sum_{y = 0}^\infty \binom{k + y}{y} q^y \\
    &= k(k + 1) p^k q^2 \cdot \frac{1}{(1 - q)^{k + 2}} \\
    &= k(k + 1) \frac{q^2}{p^2}
\end{align*}
$$
と変形できます。よって、2次のモーメントが$E[X^2] = k(k + 1)q^2/p^2 + kq/p$と求まりました。分散の定義から
$$
\begin{align*}
    V[X]
    &= E[X^2] - (E[X])^2 \\
    &= k(k + 1)\frac{q^2}{p^2} + k\frac{q}{p} - \left(\frac{kq}{p}\right)^2 \\
    &= \cancel{k^2 \frac{q^2}{p^2}} + k \frac{q^2}{p^2} + k \frac{q}{p} - \cancel{k^2 \frac{q^2}{p^2}} \\
    &= k \frac{q^2 + qp}{p^2} \\
    &= k \frac{q(q + p)}{p^2} \\
    &= k \frac{q}{p^2}
\end{align*}
$$
となります（$p + q = 1$を用いています）。

### モーメント母関数を用いて計算する方法

モーメント母関数とは５章ででてきたように
$$
\begin{align*}
    M_X(t)
    &= \sum_{x = 0}^\infty e^{tx} f(x) \\
\end{align*}
$$
で与えられます（明らかに$M_X(0) = 1$）。期待値・分散は
$$
\begin{align*}
    E[X]
    &= M_X^\prime(t) |_{t = 0}
    \\
    V[X]
    &= M_X^{\prime\prime} (t) |_{t = 0} - (M_X^\prime(t) |_{t = 0})^2
\end{align*}
$$
となりますが、対数を使うと計算が楽になります。具体的に計算すると
$$
\begin{align*}
    M_X^\prime (t)
    = M_X(t) \frac{\rm d}{\rm d t} \log M_X(t)
\end{align*}
$$
であることを使います。このとき分散は
$$
\begin{align}
    V[X] 
    &= M_X^{\prime\prime} (t) |_{t = 0} - (M_X^\prime(t) |_{t = 0})^2
    \notag \\
    &= M_X (t)|_{t = 0}^2
    \frac{
        M_X^{\prime\prime} (t) - (M_X^\prime(t))^2
    }{
        (M_X(t))^2
    }
    \notag \\
    &= 1^2 \cdot \frac{\rm d}{\rm d t} 
    \left(
    \frac{M_X^\prime(t)}{M_X(t)}
    \right)
    \notag \\
    &= \frac{{\rm d}^2}{\rm d t^2}
    \left(
    \log M_X(t)
    \right)
\end{align}
$$
のようにモーメント母関数に対数をとって２階微分し、$t = 0$を置いただけになります。あとは機械的に計算します。まずモーメント母関数の対数の微分は
$$
\begin{align*}
    \log M_X(t)
    &= k (\log p - \log (1 - q e^t))
\end{align*}
$$
です。$t$で微分して
$$
\begin{align}
    \frac{{\rm d}}{\rm d t} \log M_X(t)
    &= k \frac{q e^t}{1 - q e^t}
\end{align}
$$
なので、
$$
    E[X]
    = M_X(0) \cdot k \frac{q}{1 - q} = k \frac{q}{p}
$$
と期待値が求まりました。

分散も同様に計算します：
$$
\begin{align*}
    \frac{{\rm d}^2}{\rm d t^2}
    \log M_X(t)
    &= k \frac{q e^t (1 - q e^t) + q^2 e^{2t}}{(1 - q e^t)^2}
    \\
    &= k \frac{q e^t}{(1 - q e^t)^2}
\end{align*}
$$
よって、
$$
    V[X]
    = k \frac{q e^t}{(1 - q e^t)^2} \bigg|_{t = 0}
    = k \frac{q}{p^2}
$$
と分散が求まりました。



[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)

