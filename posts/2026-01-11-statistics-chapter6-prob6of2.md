---
title: 統計学入門 第6章の問題 6.2 急患用ベッド数
date: '2026-01-11'
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。

## 問題
東京都内のA医大病院は、救急患者のために常時4床の空ベッドを確保しているという。ここへ収容される救急患者数$X$が$\lambda = 2.5$の
ポアソン分布${\cal Po}(2.5)$に従うとき、ベッドが不足する確率を計算せよ。

※ポアソン分布は
$$
    {\cal Po}(\lambda)
    = \frac{\lambda^x}{x!} e^{-\lambda}
$$
を満たす確率分布です。


## 解答
ベッドが不足するということは患者が4人以上いるときですので、その確率は$P(X \geq 4)$に対応します。つまり$P(X > 4) = 1 - P(X \leq 4)$となります。$P(X \leq 4)$はまさに累積分布関数$F(x)$です。結局やっていることは

$$
\begin{align*}
    P(X \geq 4)
    &= 1 - P(X \leq 4)
    \\
    &= 1 - F(4) \\
    &= 1 - e^{-2.5} \left(
        \frac{2.5^0}{0!}
        + \frac{2.5^1}{1!}
        + \frac{2.5^2}{2!}
        + \frac{2.5^3}{3!}
        + \frac{2.5^4}{4!}
    \right)
    \simeq 0.1088
\end{align*}
$$
の計算になります。プログラミングで計算すると下記のようになります。

```kotlin
import kotlin.math.exp
import kotlin.math.pow

fun factorial(n: Int, acc: Int = 1): Int {
    if (n == 0) return acc
    return factorial(n - 1, n * acc)
}

fun poissonDistribution(lambda: Double, x: Int): Double {
    return exp(- lambda) * lambda.pow(x.toDouble()) / factorial(x).toDouble()
}

fun main() {
    val x = 4
    val lambda = 2.5
    var sum = 0.0
    for (k in 0..x) {
        sum += exp(-lambda) * lambda.pow(k) / factorial(k)
    }
    println("F(x) = $sum")
    println("P(X <= 4) = ${1.0 - sum}")
    // 0.1088
}
```

## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)



[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)

