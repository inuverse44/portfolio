---
title: 統計学入門 第6章 ポアソン分布
date: '2026-01-10'
tags:
  - 統計
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。


## ポアソン分布
二項分布
$$
    f(x)
    = {}_n C_x p^x (1-p)^{n-x}
$$
において$n$が大きいが$p$が小さいとき状況は往々にしてあります。つまり大量の観測データはあるが、特定のイベントが非常にレアで起こりにくいときです。二項分布の期待値は$np$でした。なので、たとえ確率$p$が非常に小さいレアなイベントでも$n$が大きいので、現実的には$x$が$np$周りでそこそこ大きくなるはずです。

さらに二項分布の計算として冪の数が非常に多くなります。数値計算すれば問題ないかもしれませんが、$n$が大きく、$p$が非常に小さいという状況は近似が使えて、より簡単な形式でこの系を記述することができるはずです。

つまり、二項分布に対して
$$
    n \to \infty, \quad p \to 0, \quad np \to \lambda
$$
です。このとき、二項分布は**ポアソン分布**に近似するといえます。

### 導出

まずは愚直に計算して、
$$
\begin{align*}
    {\rm Bi}(n, p)(x)
    &= {}_n C_x p^x (1-p)^{n-x} \\
    &= \frac{(n)_x}{x!} p^x (1-p)^{n-x} \\
    &= \frac{(n)_x}{n^x} \frac{1}{x!} \cdot (np)^x
    \left(1 - \frac{np}{n}\right)^{n-x} (1 - p)^{-x} \\
    &= \frac{(n)_x}{n^x} \frac{\lambda^x}{x!} 
    \left(1 - \frac{\lambda}{n}\right)^n (1 - p)^{-x} \\
\end{align*}
$$
となります。ここで$(n)_x$はポッドハマー記号で$(n)_x := n!/(n - x)!$と定義されます。
ここで、$n \to \infty, p \to 0$をとると
$$
\begin{align*}
    \lim_{n \to \infty, p \to 0} 
    {\rm Bi}(n , p)(x)
    &= \lim_{n \to \infty, p \to 0} 
    \frac{(n)_x}{n^x} \frac{\lambda^x}{x!} 
    \left(1 - \frac{\lambda}{n}\right)^n (1 - p)^{-x} \\[8pt]
    &= \frac{\lambda^x}{x!} e^{-\lambda}
\end{align*}
$$
となります。ここで
$$
\begin{align*}
    \lim_{n \to \infty}
    \frac{(n)_x}{n^x} &= 
    \lim_{n \to \infty}
    \prod_{i=0}^{x-1} \left(1 - \frac{i}{n}\right) = 1 \\
    \lim_{n \to \infty}
    \left(1 - \frac{\lambda}{n}\right)^n 
    &= e^{-\lambda} \\
    \lim_{p \to 0}
    (1 - p)^{-x}
    &= 1
\end{align*}
$$
を用いました。よってポアソン分布とは
$$
    f(x)
    = \frac{\lambda^x}{x!} e^{-\lambda}
$$
と表されます。

ポアソン分布は明らかに確率の総和が1であることを満たします：
$$
    \sum_{x=0}^{\infty} \frac{\lambda^x}{x!} e^{-\lambda}
    = e^{-\lambda} \sum_{x=0}^{\infty} \frac{\lambda^x}{x!}
    = e^{-\lambda} e^{\lambda}
    = 1
$$
となります。

### 期待値と分散
定義により
$$
\begin{align*}
    E[X]
    &= \sum_{x=0}^{\infty} x \frac{\lambda^x}{x!} e^{-\lambda}
    &= \lambda e^{-\lambda} \sum_{x=1}^{\infty} \frac{\lambda^{x-1}}{(x-1)!} 
    &= \lambda
\end{align*}
$$
です。
2次のモーメントは
$$
\begin{align*}
    E[X^2]
    &= \sum_{x=0}^{\infty} x^2 \frac{\lambda^x}{x!} e^{-\lambda} \\
    &= \lambda e^{-\lambda} \sum_{x=1}^{\infty} x \frac{\lambda^{x-1}}{(x-1)!} \\
    &= \lambda e^{-\lambda} 
    \sum_{x = 1}^\infty \left[
        (x - 1) \frac{\lambda^{x-1}}{(x-1)!}
        + \frac{\lambda^{x - 1}}{(x - 1)!}
    \right] \\[8pt]
    &= \lambda e^{-\lambda} 
    \sum_{x = 1}^\infty \left[
        (x - 1) \frac{\lambda^{x-1}}{(x-1)!}
        + \frac{\lambda^{x - 1}}{(x - 1)!}
    \right] \\
    &= \lambda e^{-\lambda}
    \left[
        \lambda \sum_{x = 2}^\infty \frac{\lambda^{x - 2}}{(x - 2)!}
        + \sum_{x = 1}^\infty \frac{\lambda^{x - 1}}{(x - 1)!}
    \right] \\
    &= \lambda^2 + \lambda
\end{align*}
$$
となります。
よって分散は
$$
    V[X]
    = E[X^2] - (E[X])^2
    = \lambda^2 + \lambda - \lambda^2
    = \lambda
$$
となります。

ポアソン分布では期待値と分散が等しいという性質があります。また二項分布の期待値と分散をよく観察して、$n \to \infty, p \to 0, np \to \lambda$を思い出しておくと、二項分布の期待値$np$は明らかにポアソン分布の期待値$\lambda$ですし、二項分布の分散$np(1-p)$もまた、$\lambda(1 - p) \underset{p \to 0}{\longrightarrow} \lambda$となります。


### 図で比較する
Kotlinで二項分布とポアソン分布を比較してみましょう。コードは下記のような感じで書いています。
```kotlin
import kotlin.math.ln
import kotlin.math.exp
import kotlin.math.min
import kotlin.math.pow

fun factorial(n: Int, acc: Int = 1): Int {
    if (n == 0) return acc
    return factorial(n - 1, n * acc)
}

fun Int.logCombination(k: Int): Double {
    if (k < 0 || k > this) return Double.NEGATIVE_INFINITY
    val kk = min(k, this - k) // 対称性を利用する
    return (1..kk).sumOf { i ->
        ln((this - i + 1).toDouble()) - ln(i.toDouble())
    }
}

fun binomialDistribution(n: Int, p: Double, x: Int): Double {
    val nDouble = n.toDouble()
    val xDouble = x.toDouble()
    val pp = exp(n.logCombination(x)) *
            p.pow(xDouble).toDouble() *
            (1.0 - p).pow(nDouble - xDouble).toDouble()
    return pp
}

fun poissonDistribution(lambda: Double, x: Int): Double {
    return exp(- lambda) * lambda.pow(x.toDouble()) / factorial(x).toDouble()
}

// =====　計算チェック　=====
fun main() {
    println("factorial: ${factorial(10)}")
    println("combination: ${exp(10.logCombination(3)).roundToInt()}")
    val totalTrials = 1000
    val probability = 0.002
    val lambda = totalTrials * probability
    val tryal = 3
    println("binomial: ${binomialDistribution(totalTrials, probability, tryal)}")
    println("poisson: ${poissonDistribution(lambda, tryal)}")
}
```

実際のプロットとして、4パターンで見ています。

| | |
| :---: | :---: |
| ![1](/images/posts/2026-01-09-statistics-chapter6-poisson/plot-1.svg#width=300) | ![2](/images/posts/2026-01-09-statistics-chapter6-poisson/plot-2.svg#width=300) |
| ![3](/images/posts/2026-01-09-statistics-chapter6-poisson/plot-3.svg#width=300) | ![4](/images/posts/2026-01-09-statistics-chapter6-poisson/plot-4.svg#width=300) |

1. $n = 5,\, p = 0.4,\, \lambda = 2$ （左上）
2. $n = 10,\, p = 0.2,\, \lambda = 2$ （右上）
3. $n = 100,\, p = 0.02,\, \lambda = 2$ （左下）
4. $n = 1000,\, p = 0.002,\, \lambda = 2$ （右下）

確かに$n$が大きくなるほど、$p$が大きくなるほど、2つの分布を示す赤と青の点は互いに近づいていくことが見てとれます。
プロット用のコードは
```kotlin
val tries = (0..10).toList()
val binomialDistData = tries.map { binomialDistribution(totalTrials, probability, it) }
val poissonDistData = tries.map { poissonDistribution(lambda, it) }

// データをLong形式に変換（凡例を表示するため）
val triesLong = tries + tries
val probabilities = binomialDistData + poissonDistData
val types = List(tries.size) { "Binomial" } + List(tries.size) { "Poisson" }

val data = mapOf(
    "tries" to triesLong,
    "probability" to probabilities,
    "type" to types
)
// グラフを描画
letsPlot(data) +
        geomPoint(size = 4.0) { x = "tries"; y = "probability"; color = "type" } +
        ggtitle("n = $totalTrials, p = $probability, and lambda = $lambda ") +
        xlab("tries") +
        ylab("Probability")
```
です（実行できません）。


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)

