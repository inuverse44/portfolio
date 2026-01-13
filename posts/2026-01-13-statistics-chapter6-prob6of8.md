---
title: 統計学入門 第6章の問題 6.8 ワイブル分布の累積分布関数
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
ワイブル分布の累積分布関数を求めよ。

## 解答
ワイブル分布自体は$x \geq 0$の範囲で
$$
    f(x)
    = b \frac{
        x^{b - 1}
    }{
        a^b
    }
    \exp\left[
        -\left(
            \frac{x}{a}
        \right)^b
    \right]
$$
で、$x < 0$の範囲では$f(x) = 0$の分布です。

したがって累積分布関数は定義より
$$
\begin{align*}
    F(x)
    &= \int_{-\infty}^{x} {\rm d}t\, f(t) \\[8pt]
    &= \int_{-\infty}^{x} {\rm d}t\,b \frac{
        t^{b - 1}
    }{
        a^b
    }
    \exp\left[
        -\left(
            \frac{t}{a}
        \right)^b
    \right] \\[8pt]
    &= \frac{
        b
    }{
        a^b
    }
    \int_0^x {\rm d}t\, 
    t^{b - 1} \exp\left[- \left(\frac{t}{a}\right)^b\right] \\[8pt]
    &= \frac{
        b
    }{
        a^b
    }
    \int^{x/a}_0 {
        {\rm d}y \,a\cdot y^{b - 1} \exp\left[- y^b\right]
    } \\[8pt]
    &= b \int^{x/a}_0 {\rm d}y\, y^{b - 1} \exp\left[- y^b\right] \\[8pt]
    &= \int_0^{(x/a)^b} {\rm d}z\, \exp\left[- z\right] \\[8pt]
    &= 1 - \exp\left[- \left(\frac{x}{a}\right)^b\right]
\end{align*}
$$
です。途中で適当に変数変換を施しています。

したがって、ワイブル分布の累積分布関数は
$$
    F(x)
    = \begin{cases}
        0 & (x < 0) \\[8pt]
        1 - \exp\left[- \left(\frac{x}{a}\right)^b\right] & (x \geq 0)
    \end{cases}
$$
となります。


## おまけ

ワイブル分布を可視化しました。$a$と$b$を変えてみると以下のように、$a$は波の高さの位置に対応し、$b$は分布の形状に依存します。$b$が大きくなると尖度が大きくなることが感覚的に見て取れるので、実際に計算して、正規分布と比較してみるのも面白いかもしれませんね。

| | |
| :---: | :---: |
| ![1](/images/posts/2026-01-13-statistics-chapter6-prob6of8/plot-1.svg#width=300) | ![2](/images/posts/2026-01-13-statistics-chapter6-prob6of8/plot-2.svg#width=300) |
| ![3](/images/posts/2026-01-13-statistics-chapter6-prob6of8/plot-3.svg#width=300) | ![4](/images/posts/2026-01-13-statistics-chapter6-prob6of8/plot-4.svg#width=300) |


※実行不可
```kotlin
import kotlin.math.exp
import kotlin.math.pow
import kotlin.math.sqrt
import kotlin.math.PI

data class WeibullParam(val a: Double, val b: Double)

fun weibullDistribution(x: Double, a: Double, b: Double): Double {
    return if (x < 0.0) 0.0
    else b / a * (x / a).pow(b - 1.0) * exp(-(x / a).pow(b))
}

val xList = (0..400).map { it.toDouble() / 100.0 }

val a = 4.0
val bLower = 1
val bUpper = 10
val params = (bLower..bUpper).map { i ->
    WeibullParam(
        a = a,
        b = i.toDouble()
    )
}

println(params)

val xCol       = mutableListOf<Double>()
val densityCol = mutableListOf<Double>()
val bCol       = mutableListOf<Double>()

for (p in params) {
    for (x in xList) {
        xCol.add(x)
        densityCol.add(weibullDistribution(x, p.a, p.b))
        bCol.add(p.b)
    }
}

val data = mapOf(
    "x" to xCol,
    "density" to densityCol,
    "b" to bCol
)

letsPlot(data) +
        geomLine {
            x = "x"
            y = "density"
            color = "b"
            group = "b"
        } +
        scaleColorGradient(
            low = "#2c7bb6",
            high = "#d7191c",
            name = "shape parameter b"
        ) +
        ggtitle("Weibull distributions (a = $a, b = $bLower〜$bUpper)") +
        xlab("x") +
        ylab("density") +
        theme(
            panelBackground = elementRect(fill = "white"),
            plotBackground  = elementRect(fill = "white"),
            panelGridMajor  = elementLine(color = "#e0e0e0"),
            panelGridMinor  = elementBlank(),
            legendBackground = elementRect(fill = "white"),
            legendKey = elementRect(fill = "white"),
            text = elementText(color = "black")
        )
```



## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)


[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)