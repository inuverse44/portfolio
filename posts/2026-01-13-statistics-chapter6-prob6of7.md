---
title: 統計学入門 第6章の問題 6.7 正規分布のパーセント点
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
確率変数$Z$が標準正規分布に従うとき、数表から、条件
$$
    P(|Z| \geq c) = 0.01, 0.02, 0.05, 0.10
$$
を満たす$c$の値をそれぞれ求めよ。また、条件
$$
    P(Z \geq c) = 0.01, 0.02, 0.05, 0.10
$$
に対してはどうか？

##　解答
$P(|Z| \geq c)$に関しては、標準正規分布の累積分布関数を$\Phi(x)$で表すものtすると
$$
\begin{align*}
    P(|Z| \geq c) 
    &= 2 ( 1 - \Phi(c) ) \\
    \Rightarrow\quad
    \Phi(c) 
    &= 1 - \frac{P(|Z| \geq c)}{2}    
\end{align*}
$$
と表現できます。一方で、$P(|Z| \geq c)$の場合は
$$
\begin{align*}
    P(|Z| \geq c) 
    &= 1 - \Phi(c)\\
    \Rightarrow\quad
    \Phi(c) 
    &= 1 - P(|Z| \geq c)
\end{align*}
$$
です。なのでこれをそれぞれの$c$について解けば求まるという話ですが、代数的には誤差関数を解可なければならず無理ゲーです。
よって数表を使うという問題なのですが、答えも略にされているし、目がつかれるのでプログラムで解決します。
必要なものは積分と根の探査です。

```kotlin
import kotlin.math.exp
import kotlin.math.sqrt
import kotlin.math.PI
import kotlin.math.abs

fun compositeSimpson(
    f: (Double) -> Double,
    a: Double,
    b: Double,
    n: Int
): Double {
    require(n % 2 == 0) { "n must be even" }

    val h = (b - a) / n
    var sumOdd = 0.0
    var sumEven = 0.0

    for (i in 1 until n) {
        val x = a + i * h
        if (i % 2 == 0) {
            sumEven += f(x)
        } else {
            sumOdd += f(x)
        }
    }

    return (h / 3.0) * (f(a) + 4.0 * sumOdd + 2.0 * sumEven + f(b))
}

fun adaptiveSimpson(
    f: (Double) -> Double,
    a: Double,
    b: Double,
    eps: Double,
    maxIter: Int = 20
): Double {
    var n = 2
    var sPrev = compositeSimpson(f, a, b, n)

    repeat(maxIter) {
        n *= 2
        val sCurr = compositeSimpson(f, a, b, n)

        if (abs(sCurr - sPrev) < 15.0 * eps) {
            return sCurr
        }

        sPrev = sCurr
    }

    error("Adaptive Simpson did not converge")
}

fun findCriticalValue(
    f: (Double) -> Double,
    targetProb: Double,
    left: Double = - 10.0,
    right: Double = 10.0,
    eps: Double = 1e-8
): Double {
    var l = left
    var r = right

    while (r - l > eps) {
        val mid = 0.5 * (l + r)
        val cdf = f(mid)

        if (cdf < targetProb) {
            l = mid
        } else {
            r = mid
        }
    }

    return 0.5 * (l + r)
}

fun standardNormalDistribution(x: Double): Double = exp(-0.5 * x * x) / sqrt(2.0 * PI)
fun cumulativeNormalDistribution(x: Double, eps: Double = 1e-8): Double {
    val L = -8.0
    return adaptiveSimpson(
        f = ::standardNormalDistribution,
        a = L,
        b = x,
        eps = eps
    )
}

fun main() {

    // prob (i)
    // Φ(c) = 1 - P(|Z|>=c) / 2
    println("===== Prob (i) =====")
    val lst1 = listOf(0.01, 0.02, 0.05, 0.10).map {
        1.0 - (it / 2.0)
    }
    val ansLst1 = lst1.map {
        findCriticalValue(
            f = ::cumulativeNormalDistribution,
            targetProb = it,
        )
    }
    ansLst1.mapIndexed { i, c ->
        println(
            String.format(
                "i=%2d \t c=%.4f\t P(|Z|>=c)=%.4f",
                i, c, 2.0 * (1.0 - cumulativeNormalDistribution(c))
            )
        )
    }

    // prob (ii)
    // Φ(c) = 1 - P(Z>c)
    println("===== Prob (ii) =====")
    val lst2 = listOf(0.01, 0.02, 0.05, 0.10).map {
        1.0 - it
    }
    val ansLst2 = lst2.map {
        findCriticalValue(
            f = ::cumulativeNormalDistribution,
            targetProb = it,
        )
    }
    ansLst2.mapIndexed { i, c ->
        println(
            String.format(
                "i=%2d \t c=%.4f\t P(Z>c)=%.4f",
                i, c, 1.0 - cumulativeNormalDistribution(c)
            )
        )
    }

}
```


## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)