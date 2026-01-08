---
title: 統計学入門 第6章 超幾何分布 二項分布への近似
date: '2026-01-08'
tags:
  - 統計学
  - 確率
published: true
---

## 超幾何分布の二項分布への近似

超幾何分布は
$$
\begin{align}
 f(x)
    &= \frac{
        {}_M C_x \cdot {}_{N - M} C_{n - x}
    }{
        {}_N C_n
    }
\end{align}
$$
で与えられます。この$N, M, n$はそれぞれ母集団の大きさ、母集団の当たりの数、試行回数を表します。また、$x$は当たりの数を表します。$N/M = p$として、母集団とその当たりの数の比を固定したまま、$N$を大きくすることを考えます。


### 準備　ポッホハマー記号
そのまま計算してもいいのですが、見通しをよくするためにポッホハマー記号を導入しておきます。ポッホハマー記号を次のように定義します：
$$
\begin{align*}
    (x)_n
    &= \frac{x!}{(x-n)!} \\[8pt]
    &= (x - 1)(x - 2)\cdots(x - n + 1) \\[8pt]
    &= \prod_{i=0}^{n-1} (x-i)
\end{align*}
$$
このように書いておくと、組み合わせの数は
$$
\begin{align*}
    {}_N C_n
    &= \frac{N!}{n!(N-n)!} \\[8pt]
    &= \frac{N(N-1)\cdots(N-n+1)}{n!} \\[8pt]
    &= \frac{(N)_n}{n!}
\end{align*}
$$
と表せます。また、同じ下付き添え字のポッホハマー記号で表されたもの通しの割り算は
$$
\begin{align*}
    \frac{(N)_n}{(N)_x}
    &= (N - x)_{n - x} 
    \qquad ({\rm where} \quad n > x)
\end{align*}
$$
と表せます。


### 計算
超幾何分布を上記で説明したポッホハマー記号で表すと
$$
\begin{align*}
    f(x)
    &= \frac{
        {}_M C_x \cdot {}_{N - M} C_{n - x}
    }{
        {}_N C_n
    } \\[8pt]
    &= \frac{
        \displaystyle{\frac{(M)_x}{x!}}
        \cdot \displaystyle{\frac{(N-M)_{n-x}}{(n-x)!}}
    }{
        \displaystyle{\frac{(N)_n}{n!}}
    }
    \\[8pt]
    &= 
    {}_n C_x \cdot 
    \frac{
        (M)_x (N-M)_{n-x}
    }{
        (N)_n
    }
\end{align*}
$$
最後の行ではポッホハマー記号とそうでない部分に分離させただけです。そうでない部分は、ちょうど組み合わせの数で書けるので、残りの因子について計算すれば良くなりました。ここで商を思い出すと、
$$
    (N)_n = (N)_x \cdot (N-x)_{n-x}
$$
なので、
$$
\begin{align*}
     \frac{
        (M)_x (N-M)_{n-x}
    }{
        (N)_n
    }
    &= 
    \frac{
        (M)_x (N-M)_{n-x}
    }{
        (N)_x (N-x)_{n-x}
    } \\[8pt]
    &= 
    \frac{ (M)_x }{ (N)_x }
    \cdot 
    \frac{ (N-M)_{n-x} }{ (N - x)_{n-x} }
\end{align*}
$$
となります。さて、残りの因子を計算しましょう。$\frac{ (M)_x }{ (N)_x }$は
$$
\begin{align}
    \frac{ (M)_x }{ (N)_x } 
    &= \prod_{i = 0}^{x - 1} \frac{M - i}{N - i} \notag \\[8pt]
    &= \prod_{i = 0}^{x - 1} 
    \frac{
        \displaystyle{p} - \frac{i}{N}
    }{
        1 - \displaystyle{\frac{i}{N}}
    } \notag \\[8pt]
    &\underset{N \to \infty}{\longrightarrow}
    \prod_{i = 0}^{x - 1} p
    = p^x
\end{align}
$$
となります。また、$\frac{ (N-M)_{n-x} }{ (N-x)_{n-x} }$は
$$
\begin{align}
    \frac{ (N - M)_{n - x} }{ (N - x)_{n - x} }
    &= \prod_{i=0}^{n-x-1} \frac{N - M - i}{N - x - i} \notag \\[8pt]
    &= \prod_{i=0}^{n-x-1} 
    \frac{
        1 - \displaystyle{\frac{M}{N}} - \displaystyle{\frac{i}{N}}
    }{
        1 -  \displaystyle{\frac{x + i}{N}}
    } \notag \\[8pt]
    &= \prod_{i=0}^{n-x-1} 
    \frac{
        1 - p - \displaystyle{\frac{i}{N}}
    }{
        1 -  \displaystyle{\frac{x + i}{N}}
    } \notag \\[8pt]
    &\underset{N \to \infty}{\longrightarrow}
    \prod_{i=0}^{n-x-1} 
    (1 - p)
    = (1 - p)^x
\end{align}
$$
となります。したがって、$M/N = p$とすると、
$$
    f(x)
    \underset{N \to \infty}{\longrightarrow}
    {}_n C_x \cdot p^x (1-p)^{n-x}
$$
となります。これは二項分布の確率密度関数となります。




## 参考資料

- [統計学入門 第6章 超幾何分布 1](/posts/2026-01-07-statistics-chapter6-hypergeometric/)
- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)