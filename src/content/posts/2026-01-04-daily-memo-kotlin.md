---
title: Kotlinの関数参照に出会ってしまった
date: '2026-01-04'
tags:
  - Kotlin
  - 日常
cover: https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png
published: true
---


Let's plot for Kotlinでコードを眺めていると、見慣れないコードに出会いました（[Categorical Data Type](https://nbviewer.org/github/JetBrains/lets-plot-docs/blob/master/source/kotlin_examples/cookbook/factor_levels.ipynb)）。

```bash
val mpg = DataFrame.readCSV("https://raw.githubusercontent.com/JetBrains/lets-plot-docs/master/data/mpg.csv")
val mpgData = mpg.toMap()
val brandsByCount = mpg.valueCounts { manufacturer }.manufacturer.toList()
brandsByCount.forEach(::println)
```

これはCSVをデータフレームに格納して、マップへ変換し、さらに各値をリストにしています。
最終的には`brandsByCount`ブランドのリストが入ります。

問題は
```bash
brandsByCount.forEach(::println)
```
の部分です。

通常はラムダ式で
```bash
brandsByCount.forEach { it -> println(it) }
```
もしくは、`it`は暗黙な引数なので
```bash
brandsByCount.forEach { println(it) }
```
とも書くことが多いと思います。

シンプルさのためにこのような書き方をしているのかもしれませんが、調べてみると高階関数に関係があるようです。
e.g.,  [Kotlin Function References: Complete Professional Guide](https://proandroiddev.com/kotlin-function-references-complete-professional-guide-63ef4d80f8de)

私はまだまだKotlinについて体系的に説明できないので、今一度基礎に戻って勉強しようかなと思います。
最近[Kotlin in Action 2nd Edition](https://www.amazon.co.jp/dp/161729960X?ref=ppx_yo2ov_dt_b_fed_asin_title)を購入したので、そこにも書いてあるかもしれませんね。
期待しながら到着を待つことにしましょう。

どうでもいい愚痴ですが、このKotlin in Actionの第２版はまだ日本語版が出版されていないみたいです。ゆっくり読んでいきますか。。。



