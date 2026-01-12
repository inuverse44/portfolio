---
title: 統計学入門 第6章の問題 6.4 Odd man out
date: '2026-01-12'
tags:
  - 統計学
  - 確率
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## はじめに
この記事は統計学入門[^1]のを読んだことをまとめた振り返り記事です。

## 問題
$(i)$ コインの表、裏の確率を$p, q\, (q = 1 - p)$とする。これらのコイン$n$個を同時に投げとき、ちょうど一個だけが他の$n - 1$個と異なった結果（表、裏）となる確率$P$を求めよ。なお、$n \geq 3$とする。

$(ii)$ $n$人の人がいて、各自このコイン１個を同時に投げる操作を繰り返し、ちょうど1人だけが他の$n - 1$人と異なる結果となったとき、その人は定められた仕事（たとえば、皆のジュースを買いに行くなど）をするものとする。この方法で決まるまでの繰り返し数の期待値を求めよ。

## 解答

### $(i)$
コインの裏表の確率が$1/2$じゃないことに注意しましょう。早とちりは厳禁です。さて、1人（A君としましょう）が表、残りの$n - 1$人が裏である確率は$p q^{n - 1}$です。逆も然りで、1人（A君としましょう）が裏で、残りの$n - 1$人が表である確率は$p^{n - 1} q$です。これらの事象は互いに排反な事象ですので、A君1人が$n - 1$人と異なる確率はこれらを足し合わせて
$$
    p q^{n - 1} + p^{n - 1} q
$$
となります。一方、1人になる可能性はA君だけだけではありません。その選び方は$\binom{n}{1} = n$通りあります。よって、
$$
    P = n(p q^{n - 1} + p^{n - 1} q)
$$
となります。

### $(ii)$
このパシリ決めの試行回数を確率変数$X$とすると、これはある回数$x$でパシリが決まるとすると、$x-1$回目までパシリが決まらないということです。これはちょうど幾何分布を考えればよく、幾何分布の期待値は
$$
    E[X] 
    = \frac{1}{P}
    = \frac{1}{n(p q^{n - 1} + p^{n - 1} q)}
$$
となります。

### 参考

```kotlin
import kotlin.math.pow

fun prob(n: Int, p: Double, q: Double) = n * (p.pow(n - 1) * q + p * q.pow(n - 1))

val nList = (3..20).toList() // 人数 or コインの枚数のリスト 3以上

fun main() {
    val p = 0.3 // コインが表になる確率
    val q = 1.0 - p

    nList.forEach {
        println(
            String.format(
                "n=%2d:\tg=% .6f",
                it, prob(it, p, q)
            )
        )
    }
}
```


| | |
| :---: | :---: |
| ![1](/images/posts/2026-01-12-statistics-chapter6-prob6of4/plot-1.svg#width=300) | ![2](/images/posts/2026-01-12-statistics-chapter6-prob6of4/plot-2.svg#width=300) |



## 参考文献
[リポジトリ](https://github.com/inuverse44/introduction-to-statistics)



[^1]: [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)





