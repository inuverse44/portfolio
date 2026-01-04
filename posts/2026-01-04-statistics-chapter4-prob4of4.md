---
title: 統計学入門 第4章の問題 4.4 誕生日の問題
date: '2026-01-04'
tags:
  - 統計学
  - 確率
  - Kotlin
published: true
---

## 誕生日の問題

### 問題
$r$人の集団の中に同じ誕生日の人が少なくとも2人ある確率は

$$
\begin{align}
    p_r
    &= 1 - \left(1 - \frac{1}{365} \right)
    \left(1 - \frac{2}{365} \right)
    \left(1 - \frac{3}{365} \right)
    \cdots
    \left(1 - \frac{r - 1}{365} \right) \\
    &= 1 - \prod_{k=1}^r \left(1 - \frac{r - 1}{365}\right)
\end{align}
$$

であることを示せ。さらに5, 10, 15, 20~25, 30m 35, 40, 50, 60に対して$p_r$を計算せよ。

### 解答

$r$人の中で誰も誕生日が被らない時、$365^r$の可能性のうち、1人目が$365$通り、2人目が$364$通り、3人目が$363$通り、$\cdots$、$r$人目が$365 - (r - 1)$通りあります。よって、$r$人いても誰も誕生日が被らない確率$p_r^c$は
$$
\begin{align}
    p_r^c
    &= \frac{365 \cdot 364 \cdot 363 \cdots (365 - (r - 1))}{365^r} \notag \\
    &= \frac{(365 - 1) \cdot (365 - 2) \cdots (365 - (r - 1))}{365^{r - 1}} \notag \\
    &= \left(1 - \frac{1}{365}\right)
    \left(1 - \frac{2}{365}\right)
    \left(1 - \frac{3}{365}\right)
    \cdots
    \left(1 - \frac{r - 1}{365}\right)
\end{align}
$$
です。よって求める「$r$人の中で少なくとも1組は誕生日が同じになる」確率$p_r$は
$$
\begin{align}
    p_r
    &= 1 - p_r^c \notag \\
    &= 1 - \left(1 - \frac{1}{365}\right)
    \left(1 - \frac{2}{365}\right)
    \left(1 - \frac{3}{365}\right)
    \cdots
    \left(1 - \frac{r - 1}{365}\right)
\end{align}
$$
となります。


## プログラムを使って計算してみる

Kotlinを使って計算してみましょう！コードは下記です：  
使用しているライブラリはLet's Plot for Kotlinです。

```kotlin
/*
 * 人数rに対して、少なくとも2人以上が誕生日が同じになる確率を計算する関数
 */
fun getProbabilityAtLeastTwoPeopleShareTheSameBirthday(
    r: Int
): Double {
    var prod = 1.0
    for(i in 1..r) {
        prod *= (1.0 - (i.toDouble() - 1.0)/365.0)
    }
    val result = 1.0 - prod
    return result
}

val rValues = (0..60).toList()
val probabilityDistribution = rValues.map { getProbabilityAtLeastTwoPeopleShareTheSameBirthday(it) }

val data = mapOf(
    "r" to rValues,
    "p" to probabilityDistribution
)

// グラフを描画
letsPlot(data) +
    geomLine(color = "blue") { x = "r"; y = "p" } +
    geomPoint(size = 2.0, color = "red") { x = "r"; y = "p" } +
    ggtitle("Probability of shared birthday (at least 2 people) vs Group size") +
    xlab("Number of people (r)") +
    ylab("Probability p_r")

```

この結果は

![人数rに対して、少なくとも2人以上が誕生日が同じになる確率のプロット](/images/posts/2026-01-04-statistics-chapter4-prob4of4/plot.jpg#width=500)

のようになります。学校の典型的なクラスの人数は35人くらいなので（個人経験談）、その確率は約$81.4\%$です。
実は、同じクラスに同じ誕生日の組がいること自体はそこまで珍しいことでもないことが分かります。



## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)
