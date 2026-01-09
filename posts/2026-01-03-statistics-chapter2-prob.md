---
title: 統計学入門 第2章の問題について
date: '2026-01-03'
tags:
  - 統計学
  - Kotlin
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---

## 統計学入門 第2章の問題について

### 2.2
1次元データ$x_1, x_2, \ldots, x_n$の散らばりの尺度として、データの各対ごととの隔り$|x_i - x_j|$の平均
$$
    \sum_i \sum_j
    \frac{ | x_i - x_j | }{ n^2 }
$$
を考え、これを平均差という。また、平均差と平均値$\bar{x} \times 2$の比を
$$
    GI
    = \frac{ | x_i - x_j | }{ 2 n^2 \bar{x} }
$$
のように定義し、ジニ係数という。不平等度の指標として用いられる。

35ページの$A, B, C$のデータに対して、平均差、ジニ係数を計算せよ。


```kotlin
import kotlin.math.absoluteValue

val dataA = doubleArrayOf(0.0, 3.0, 3.0, 5.0, 5.0, 5.0, 5.0, 7.0, 7.0, 10.0)
val dataB = doubleArrayOf(0.0, 1.0, 2.0, 3.0, 5.0, 5.0, 7.0, 8.0, 9.0, 10.0)
val dataC = doubleArrayOf(3.0, 4.0, 4.0, 5.0, 5.0, 5.0, 5.0, 6.0, 6.0, 7.0)

fun getMeanDifference(input: DoubleArray): Double {
    val n = input.size
    var sum = 0.0
    for (i in 0 until n) {
        for (j in i + 1 until n) {
            sum += (input[i] - input[j]).absoluteValue
        }
    }
    val result = 2.0 * sum / (n * n) // 対称なので2倍しないいけない
    return result
}

val resultMeanDifferenceA = getMeanDifference(dataA)
val resultMeanDifferenceB = getMeanDifference(dataB)
val resultMeanDifferenceC = getMeanDifference(dataC)

println("平均差:")
println("   A: $resultMeanDifferenceA")
println("   B: $resultMeanDifferenceB")
println("   C: $resultMeanDifferenceC")

fun getGI(input: DoubleArray): Double {
    val total = input.sum()
    val n = input.size
    val mean = total / n
    val meanDifference = getMeanDifference(input)
    val result = meanDifference / (2.0 * mean)
    return result
}

val resultGIA = getGI(dataA)
val resultGIB = getGI(dataB)
val resultGIC = getGI(dataC)

println("ジニ係数:")
println("   A: $resultGIA")
println("   B: $resultGIB")
println("   C: $resultGIC")
```

この結果は
```
平均差:
   A: 2.76
   B: 3.76
   C: 1.2
ジニ係数:
   A: 0.27599999999999997
   B: 0.376
   C: 0.12
```


### 2.3

カテゴリー別に分類されたデータにおいて、各カテゴリーの相対頻度を$\hat{p}_i = f_i / n$としよう。いま
$$
    H(\hat{p}_1, \hat{p}_2, \ldots, \hat{p}_k)
    = - \sum_{i = 1}^k \hat{p}_i \ln \hat{p}_i
$$
と定義すると、
1. $H(\hat{p}_1, \hat{p}_2, \ldots, \hat{p}_k) \geq 0$
2. どれかの$\hat{p}_i = 1$のとき、$H(\hat{p}_1, \hat{p}_2, \ldots, \hat{p}_k) = 0$
3. $H(\hat{p}_1, \hat{p}_2, \ldots, \hat{p}_k) \leq H(1/k, 1/k, \ldots, 1/k)$　（最大値）

が成り立つ。この量をエントロピーという。$H$の大きいほど分布は一様となり、小さいほど集中性がみられる。（なお、$0 \ln 0 = 0$を約束する。

100人の学生に出身地をたずねた。10年前と本年にたいしてしたの結果を得た。集中性という見地から、この出身地の分布を比較せよ。（架空例）

| 地域 | A | B | C | D | E | 計 |
|---|---|---|---|---|---|---|
|本年| 32 | 19 | 10 | 24 | 15 | 100 |
|10年前 | 28 | 13 | 18 | 29 | 12 | 100 |


```kotlin
import kotlin.math.ln

fun entropy(input: DoubleArray): Double {
    val result = input.map { p ->
        - p * ln(p)
    }.sum()
    return result
}

val maxEntropyInput = doubleArrayOf(0.2, 0.2, 0.2, 0.2, 0.2)
val maxEntropy = entropy(maxEntropyInput)

val thisYearInput = doubleArrayOf(32.0, 19.0, 10.0, 24.0, 15.0)
val thisYearTotal = thisYearInput.sum()
val normalizedThisYearInput = thisYearInput.map { it ->
    it / thisYearTotal
}.toDoubleArray()
val thisYearOutput = entropy(normalizedThisYearInput)

val decadeAgoInput = doubleArrayOf(28.0, 13.0, 18.0, 29.0, 12.0)
val decadeAgoTotal = decadeAgoInput.sum()
val normalizedDecadeAgoInput = decadeAgoInput.map { it ->
    it / decadeAgoTotal
}.toDoubleArray()
val decadeAgoOutput = entropy(normalizedDecadeAgoInput)

println("本年：$thisYearOutput")
println("10年前：$decadeAgoOutput")
println("最大エントロピー：$maxEntropy")
```

私の結果は
```
本年：1.537492332302312
10年前：1.5437380015770872
最大エントロピー：1.6094379124341005
```
でした。本書の答えとずれている...？

### 2.4
2.3節のデータ$B$について、標準得点、標準偏差値を計算せよ。

```kotlin
fun getMean(input: DoubleArray): Double {
    val n = input.size
    val total = input.sum()
    val result = total / n
    return result
}

fun getVariance(input: DoubleArray): Double {
    val n = input.size
    val total = input.sum()
    val mean = getMean(input)
    var sum = 0.0
    for (i in 0 until n) {
        sum += (input[i] - mean) * (input[i] - mean)
    }
    val result = sum / n
    return result
}

fun getStdDev(input: DoubleArray): Double {
    val variance = getVariance(input)
    val result = sqrt(variance)
    return  result
}

val v = getVariance(dataB)
val s = getStdDev(dataB)
val mean = getMean(dataB)
val standardScoreB = dataB.map { it ->
    ( it - mean ) / s
}.toDoubleArray()

println(standardScoreB.contentToString())

val hensachi = standardScoreB.map { it ->
    10.0 * it + 50
}.toDoubleArray()

println(hensachi.contentToString())
```

この結果は
```
[
    -1.5214515486254614, 
    -1.217161238900369, 
    -0.9128709291752768, 
    -0.6085806194501845, 
    0.0, 
    0.0, 
    0.6085806194501845, 
    0.9128709291752768, 
    1.217161238900369, 
    1.5214515486254614
]
[
    34.78548451374539, 
    37.82838761099631, 
    40.87129070824723, 
    43.91419380549816, 
    50.0, 
    50.0, 
    56.08580619450184, 
    59.12870929175277, 
    62.17161238900369, 
    65.21451548625461
]
```


## 参考文献

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)