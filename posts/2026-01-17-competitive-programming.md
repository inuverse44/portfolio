---
title: 【競技プログラミング初心者の学び】入力をパースする、数える
date: '2026-01-17'
tags:
  - 競技プログラミング
  - Kotlin
cover: https://img.atcoder.jp/logo/atcoder/logo.png
published: true
---

## はじめに

この記事では、初めてやる競技プログラミングの中で詰まったところをまとめていくシリーズです。
私が認知しているのは

- AtCoder[^1]
- LeetCode[^2]

ですが、ここ記事ではAtCoderを軸にします。

## 詰まったところ

### `main`関数を忘れない
エントリーポイントは`fun main() {...}`で宣言します。Jupyter Notebookでは`main`を宣言しなくても実行できるので忘れがちなのですが、AtCoderでは`main`を宣言しないとコンパイルエラーになります。

### パースする
AtCoderでは標準入力が連続で入ってくるので、その形式に則ってパースしなければなりません。
例えば、初心者用問題の[Welcome to AtCoder](https://atcoder.jp/contests/abs/tasks/practice_1)では
```
a
b c
s
```
という入力が与えられます。`a, b, c`は`Int`で`s`が`String`という感じです。
これは次のようにして変数に詰め込むことができます。

```kotlin
fun main() {
    val a = readln().toInt()
    val (b, c) = readln().split(" ").map { it.toInt() }
    val s = readln()
}
```

`a, s`は簡単なのですが、問題は`b, c`のように横に連なって入ってくる時です。ここではPair型として受け取ります。明示的には`val (b, c): Pair<Int, Int>`と書きます。`b c`はスペースで区切られているので、`split(" ")`で分割し、`map { it.toInt() }`で`Int`に変換しています。その後、`val (b, c) = ...`で`b, c`にそれぞれ代入しています。


### 数える

```bash
101
```
のような`String`の標準有力があるとします。この文字列に含まれる`1`の数を数えたいです。
`for`で数えてもいいのですが、Kotlinらしく書くと
```kotlin
fun main() {
    val s = readln()
    val ans = s.count { it == '1' }
    println(ans)
}
```
です。

## 解法







[1]: https://info.atcoder.jp
[2]: https://leetcode.com/