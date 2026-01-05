---
title: 統計学入門 第5章の問題 5.2 期待値
date: '2026-01-05'
tags:
  - 統計学
  - 確率
published: true
---

## 期待値の問題

### 問題
5.2節の宝くじの期待値を求めよ。

※実際に参考を見ると、5.2節じゃなくて5.3節に宝くじのコラムがあります。

### 回答
単純な計算なので、プログラムで解きます。

```kotlin
data class Prize(
    val grade: String,
    val amount: Long,
    val frequency: Int
)

val prizes = listOf(
    Prize("1等", 40_000_000, 7),
    Prize("1等の前後賞", 10_000_000, 14),
    Prize("1等の組み違い賞", 200_000, 903),
    Prize("2等", 10_000_000, 5),
    Prize("2等の組み違い賞", 100_000, 645),
    Prize("3等", 1_000_000, 130),
    Prize("4等", 140_000, 130),
    Prize("5等", 10_000, 1_300),
    Prize("6等", 1_000, 26_000),
    Prize("7等（未等）", 200, 1_300_000)
)

val totalTickets = prizes.sumOf { it.frequency }
println("Total Tickets: $totalTickets")

val totalPayout = prizes.sumOf { it.amount * it.frequency }
val expectationValue = totalPayout.toDouble() / totalTickets

println("Expectation value: ${expectationValue}")
```

これの結果が

```
Total Tickets: 1329134
Expectation value: 874.4791721526949
```
となりますが、模範回答だと89.41です。誤植かもしれませんし、どこか実装ミスしているのかもしれません。もし何か間違っているところがあればご連絡ください。


## 参考資料

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)
