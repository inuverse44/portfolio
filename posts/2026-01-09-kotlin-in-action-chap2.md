---
title: Kotlin in Action Second Edition 第２章
date: '2026-01-09'
tags:
  - Kotlin
published: false
---

## はじめに
この記事ではKotlin in Action Second Editionの第2章を読んだことをまとめた振り返り記事です。

## 2章 Kotlin basics

### Idiomatic Kotlin

- Kotlinのコードについて議論されるときによく使われるフレーズ
- シンプルに言えば、**適切なタイミングで言語特性とシンタックスシュガーを活用して、どのように「Kotlinのネイティブスピーカー」らしくコードを書くか**ということ
- idiomaticに書くためにはそれ相応の時間と鍛錬が必要になる


### 関数と変数


#### Hello world

```kotlin
fun main() {
    println("Hello, World!")
}
```
注意すべきは、
- `fun`は関数を宣言するキーワード
- `main`はエントリーポイントで引数は省略可能
- `println`は標準ライブラリでJavaよりもシンプル
- 文末にセミコロンは必要ない（これもJavaやC/C++ではセミコロン必要）。

です。
Javaだと
```java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
のようになるでしょう。

#### パラメーターと返り値を持つ関数を宣言する

```kotlin
fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}
```
`fun`で関数の宣言を開始し、その後すぐに関数名がきます。今回は2つの数字を受け取り、大きい方の値を返す関数です。C言語のようにパラメーターの後にコロン（:）で型`Int`（整数）を指定しています。さらにその右には返り値の型`Int`を指定しています。`return`キーワードで返り値を返すことができます。
`if`式は三項演算子 (ternary operator) のように使えます（後の章にて解説）。

これをCで書くとおそらく次のようになるでしょう：
```c
int max(int a, int b) {
    return a > b ? a : b;
}
```
欧文は文章を左から読む特性上、${\rm max}: (a, b) \to c$という論理がすっと入ってきますが、C言語の場合には、返ってくる型を覚えておいて読む必要があります。これは$c = {\rm max}(a, b)$のように書くと2つの違いのイメージがつくかと思います。

### `main`関数のパラメーターと返り値の型
すでに言ったように、Kotlinでは`main`関数がエントリーポイントになるわけですが、パラメーターを宣言しなくてもいいし、宣言する時は`args: Array<String>`としてストリングの型を宣言してもいいです。コマンドラインのパラメーターを受け取るときに使うので、後の章でまた解説されます。


### もう少し簡単に関数定義
先の`max`関数はもう少し簡単にできます。この簡単にできる条件は

> 　関数のボディがワンライナーの単一の表現（e.g., `if (a > b) a else b`）なとき

です。このときは中括弧（`{}`）を省略できます。つまり、
```kotlin
fun max(a: Int, b: Int): Int = if (a > b) a else b
```
と書けます。

ここで、中括弧の中に関数のボディがあることを「関数は**block body**を持つ」といい、逆に中括弧がなく直接式を返すことを「関数は**expression body**を持つ」といいます。さらに、返り値が型推論 (type inference) で明らかになる場合、上記の関数はもっと簡単になり
```kotlin
fun max(a: Int, b: Int) = if (a > b) a else b
```
と書けます。

注意：ライブラリを書くときには返り値の型を明示的に書くこと。偶然な変化でライブラリの利用者にエラーがでることを避けたいので。

### データを保持するための変数宣言

Kotlinの型推論が強力なおかげで多くの変数に対して型の指定を省略できるし、明示的に指定することもできます。

```kotlin
// 明示的に型を指定
val question: String = "The Ultimatee Question of Life, the Universe, and Everything"
val answer: Int = 42

// 型推論
val question = "The Ultimatee Question of Life, the Universe, and Everything"
val answer = 42
```
コンパイラは例えば$42$という数字が`Int`であることから、`answer`の型も`Int`であると推測しています。初期化しないこともできますが、そのときには型の宣言が必須です：
```kotlin
var answer: Int
answer = 42
```


### 読み込み専用か再割り当て可能か明示する

ここまで見てもらったように、変数宣言のために変数名の前に`val`キーワードを付けました。実は宣言するときに使うキーワードは`val`または`var`のいずれかです。

- `val`：読み込み専用。変数の値を一度だけ代入する
- `var`：再割り当て可能。変数の値を何度でも再代入する

Tipsとして、基本的には`val`で変数宣言し、必要なときだけ`var`を使うといいです。この効果については関数型プログラミングの章で詳しく説明します。

`val`参照が読み込み専用だとしても、オブジェクトはミュータブルな可能性があります。例えば、
```kotlin
val languages = mutableListOf("Java")
languages.add("Kotlin")
```
はOKです。

また、`var`で変数の再割り当てが可能だとしても、変数の型は固定です。：
```kotlin
var answer = 42 // Int
answer = "no answer" // <-- Error: type mismatch
```