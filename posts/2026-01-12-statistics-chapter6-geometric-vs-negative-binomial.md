---
title: 統計学入門 第6章 幾何分布と負の二項分布
date: '2026-01-12'
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## 幾何分布と負の二項分布
幾何分布は確率$p$のベルヌーイ試行において、試行回数が$x$回で初めて成功するときの分布でした。
$$
    f(x)
    = p q^{x - 1} \qquad \text{where } q = 1 - p
$$
一方、負の二項分布は幾何分布の一般化として知られています。$k$回目の成功を得るまでの失敗の回数を$x$とすれば、
$$
    f(x)
    = \binom{k + x - 1}{k - 1} p^k q^x
$$
であります。ここで$k = 1$であれば
$$
    f(x)
    = p q^x
$$
となります。教科書[^1]では幾何分布の方の確率変数が成功までの試行回数に対して、負の二項分布の確率変数が失敗の回数であることに注意しないといけません。幾何分布の確率変数を失敗の数だと思って、最初の$x$回は全部失敗したという風に再解釈すれば、互いに分布は$k = 1$のときに等しくなります。


次のコードで`k = 1`のときの幾何分布と負の二項分布を比較してみましょう。

```kotlin
import kotlin.math.exp
import kotlin.math.pow
import kotlin.math.min
import kotlin.math.ln

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

fun geometricFromFailures(p: Double, x: Int): Double {
    val q = 1.0 - p
    return p * q.pow(x.toDouble())
}

fun negativeBinomialDistribution(k: Int, p: Double, x: Int): Double {
    val q = 1.0 - p
    return exp((k + x - 1).logCombination(x)) * p.pow(k) * q.pow(x)
}

fun main() {
    val k = 2
    val p = 0.5
    val n = 10

    val geometricMean = (1.0 - p) / p
    val geometricStd = kotlin.math.sqrt((1.0 - p) / (p * p))
    val nbMean = k * geometricMean
    val nbStd = kotlin.math.sqrt(k * (1.0 - p) / (p * p))

    val xData = (0..n).toList()
    val negativeBinomialData = xData.map{ negativeBinomialDistribution(k, p, it) }
    val geometricData = xData.map { geometricFromFailures(p, it)}
    geometricData
        .zip(negativeBinomialData)
        .mapIndexed { x, (g, nb) ->
            Triple(x, g, nb)
        }
        .forEach { (x, g, nb) ->
            println(
                String.format(
                    "x=%2d:\tg=% .6f,\tnb=% .6f,\tdiff=% .6e",
                    x, g, nb, g - nb
                )
            )
}
}
```

また実際にプロットすると下記のようなイメージになります。


| | |
| :---: | :---: |
| ![1](/images/posts/2026-01-12-statistics-chapter6-geometric-vs-negative-binomial/plot-geometric-vs-negativeBinomial-1.svg#width=300) | ![2](/images/posts/2026-01-12-statistics-chapter6-geometric-vs-negative-binomial/plot-geometric-vs-negativeBinomial-2.svg#width=300) |
| ![3](/images/posts/2026-01-12-statistics-chapter6-geometric-vs-negative-binomial/plot-geometric-vs-negativeBinomial-3.svg#width=300) | ![4](/images/posts/2026-01-12-statistics-chapter6-geometric-vs-negative-binomial/plot-geometric-vs-negativeBinomial-4.svg#width=300) |






## 参考資料

[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)

