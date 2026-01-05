---
title: 統計学入門 第5章の問題 5.1 一様分布
date: '2026-01-05'
tags:
  - 統計学
  - 確率
published: true
---

#### 一様分布の問題

### 問題
いくつかの一様分布に対して、次の計算を行え。  
(i) $[0, 6]$上の一様分布の密度関数、期待値、分散。　　
(ii) 同じく、チェビチェフの不等式の成立
(iii) $[0, 1]$上の一様分布の歪度、尖度


### 解答

#### (i)  
密度関数$f(x)$は、ある定数を$C$として
$$
\begin{align}
    f(x) = 
    \left\{
    \begin{aligned}
        C &\quad (0 \leq x \leq 6)\\
        0 &\quad (otherwise)
    \end{aligned}
    \right.
\end{align}
$$
です。確率の規格化条件により、
$$
\begin{align*}
    1=
    \int_{-\infty}^{\infty} f(x) dx 
    = C \int_{0}^{6} dx 
    = 6C
\end{align*}
$$
を$C$が満たさなければならないので、$C = 1/6$となることが分かります。よって、求める密度関数は
$$
\begin{align}
    f(x) = 
    \left\{
    \begin{aligned}
        \frac{1}{6} &\quad (0 \leq x \leq 6)\\
        0 &\quad (otherwise)
    \end{aligned}
    \right.
\end{align}
$$
です。

期待値$\mu$は
$$
\begin{align*}
    \mu
    &= \int_{0}^{6} x f(x) {\rm d}x 
    = \frac{1}{6} \int_{0}^{6} x {\rm d}x = 3
\end{align*}
$$
です。

分散$\sigma^2$を求めるために2次のモーメントは
$$
\begin{align*}
    E(X^2)
    &= \int_{0}^{6} x^2 f(x) {\rm d}x 
    = \frac{1}{6} \int_{0}^{6} x^2 {\rm d}x 
    = \frac{1}{6} \left[ \frac{x^3}{3} \right]_{0}^{6} 
    = 12
\end{align*}
$$
です。よって、分散は
$$
\begin{align*}
    \sigma^2
    &= E(X^2) - \mu^2 
    = 12 - 3^2 
    = 12 - 9 
    = 3
\end{align*}
$$
となります。


#### (ii)
チェビチェフの不等式が
$$
\begin{align}
    P(|X - \mu| \geq k\sigma)
    &\leq \frac{1}{k^2}
\end{align}
$$
であることを思い出すと、確率変数$x$の範囲は
$$
\begin{align*}
    &~\quad|x - 3| \geq \sqrt{3} k \\
    &\Leftrightarrow 
    x \leq 3 - \sqrt{3} k \quad \text{または} \quad x \geq 3 + \sqrt{3} k
\end{align*}
$$
となります。この窓に非ゼロの確率含まれるのかどうかで条件を分けることができ、(a) $0 < k \leq \sqrt{3}$、(b) $k > \sqrt{3}$とします。

(a) $0 < k \leq \sqrt{3}$で、
$$
\begin{align}
    P(|X - 3| \geq \sqrt{3}k)
    &= \int_0^{3-\sqrt{3}k} \frac{1}{6}\, {\rm d}x
    + \int_{3 + \sqrt{3}}^6 \frac{1}{6}\, {\rm d}x \notag \\
    &= \frac{1}{6}(3 - \sqrt{3}k) \notag \\
    &= 1 - \frac{\sqrt{3}}{3} k
\end{align}
$$
となります。これをチェビチェフの不等式$(3)$と比較すると、
$$
    1 - \frac{\sqrt{3}}{3} k \leq \frac{1}{k^2}
$$
となるので、うまく式変形して
$$
    g(k) = k^2 - \frac{\sqrt{3}}{3} k^3 \leq 1
$$
となります。$g(k)$の最大値を求めます。これを$k$で微分すると
$$
    g^\prime(k) = 2k(2 - \sqrt{3} k)
$$
なので、極大値（兼最大値）は$k = 2/\sqrt{3}$です。この値を$g(k)$に代入すれば$g(2/\sqrt{3}) = 4/9 < 1$であり、チェビチェフの不等式を満たします。

一方、(b) $k > \sqrt{3}$のとき明らかに$P(|X - 3| \geq \sqrt{3}k) = 0$です。なので、$0 < 1/k^2\, (k > \sqrt{3})$なので、自明にチェビチェフの不等式を満たします。


#### (iii)
歪度・尖度はそれぞれ3次のモーメント$\alpha_3$、４次のモーメント$\alpha_4$を用いてそれぞれ
$$
    S = \frac{E[(X - \mu)^3]}{\sigma^3}\,, 
    \quad
    K = \frac{E[(X - \mu)^4]}{\sigma^4} - 3\,, 
$$
で定義されます。

まずは、3次のモーメントを計算します。期待値が$\mu = 1/2$なので、
$$
    E[(X - \mu)^3]
    = \int_{0}^{1} \left(x - \frac{1}{2}\right)^3 \, {\rm d}x 
    = \int_{-1/2}^{1/2} t^3 \, {\rm d}t 
    = 0
$$
となります。よって、歪度$S = 0$です。

次に4次のモーメントを計算します：
$$
\begin{align}
    E[(X - \mu)^4]
    &= \int_{0}^{1} \left(x - \frac{1}{2}\right)^4 \, {\rm d}x 
    = 2 \int_{0}^{1/2} t^4 \, {\rm d}t 
    = \frac{1}{80}
\end{align}
$$
2次のモーメントが$1/3$であることから分散は$\sigma^2 = 1/12$です。よって４次のモーメントは
$$
    \alpha_4 = \frac{1}{80} \cdot 12^2 = \frac{9}{5}
$$
となります。よって尖度は
$$
    K = \alpha_4 - 3 = \frac{9}{5} - 3 = -\frac{6}{5}
$$
となります。

※尖度の定義にある$-3$はガウス分布の4次のモーメントの値です。なので、$K < 0$であるので、$[0, 1]$の一様分布はガウス分布よりも「鈍く丸っこい」分布であることが分かります。



## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)
