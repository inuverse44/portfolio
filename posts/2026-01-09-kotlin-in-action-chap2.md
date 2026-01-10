---
title: Kotlin in Action Second Edition 第２章
date: '2026-01-09'
tags:
  - Kotlin
cover: https://m.media-amazon.com/images/I/71gWfGC2pGL._SL1500_.jpg
published: true
---

## はじめに
この記事ではKotlin in Action Second Editionの第2章を読んだことをまとめた振り返り記事です。
途中のコードスニペットは、多くはKotlin in Actionにあるものですが、一部は編集しています。編集したコードはKotlin Notebookで実際に動かしたもので、[^1]のリポジトリで確認することができます。

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


### `String`テンプレート

```kotlin
val input = readln()
val name = if (input.isNotBlank()) input else "Kotlin"
println("Hello, $name!")
```
Stringテンプレートとは`${...}`で囲まれた部分を評価して文字列として埋め込むことができる機能です。とくに変数に対してメソッドを呼び出さない場合には、`{}`を省略することもできます。もしJavaであれば`"Hello, " + name + "!"`のようにStringの結合をしないといけないので、Stringテンプレートの方がより簡潔です。

\$自体を表示させたければ、エスケープシーケンスを使います：
```kotlin
// $を入れたければエスケープシーケンスを入れる
println("\$100")
// --> $100
```

`${...}`で囲まれたStringテンプレートは式として評価されます。つまり、`if`式も使えます：
```kotlin
// Stringテンプレートとif式の条件分岐を合わせれば、より簡潔に書ける
val name = readln()
println("Hello ${if (name.isBlank()) "someone" else name}!")
```

### カプセル化のふるまいとデータ：クラスとプロパティ
まずはPOJO (Plain Old Java Object) の`Person`クラスを考えておき、今のところ`name`プロパティのみが含まれているとします。
```java
public class Person {
    private final String name;

    // constructor
    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```
コンストラクタのボディは全体的に繰り返しがあり、名前に対応するフィールドにパラメーターを割り当てるだけです。`name`フィールドにアクセスするためには、`getName`というgetterメソッドを呼び出す必要があり、これもただ、フィールドを返すだけです。

Kotlinで`Person`クラスを定義しましょう：
```kotlin
class Person(val name: String)
```
このようにデータだけもっていてコードがないクラスの宣言においては、かなり簡単な宣言をすることができまして、このコンセプトはJava14以上の*record*に似ています。ちなみに、`public`修飾子はKotlinではデフォルトです。

### クラスと関連するデータとアクセス可能にする方法：プロパティ
クラスのアイディアについて、原文が少し難しいので簡単に説明します。原文では
> The idea of a class is to encapsulate data and code that works on the data into a single entity.
とあります。この文章をを次のように分解します。
- "The idea of a class is": 「クラスの考え方は...です」。
- "encapsulate A into B: 「AをBへカプセル化（一体化）する」です。
    - A: data and code that works on the data
        - code that works on the dataは関係代名詞になっていて、「そのデータを操作するコード」という風に訳されます。
    - B: a single entityは単一エンティティ

よって、「クラスの考え方は、データとそのデータを操作するコードを単一のエンティティへカプセル化する」が直訳になります。

利用者にデータをアクセスさせる必要があるときは*accessor method（アクセサーメソッド）*を提供します。つまりgetterとsetterを提供するということです。

Javaではフィールドとアクセサーを*property*（プロパティ）と呼びます。

Kotlinではプロパティを変数のときと同様に`val`および`var`で宣言できます。
これをKotlinで表現すると
```kotlin
class Person(
    val name: String, // 読み込み専用プロパティ（フィールドや自明なgetter）
    var isStudent: Boolean // 書き込み可能プロパティ（フィールド、getter, setter）
)
```
です。プロパティを宣言するときは
- `val`にはgetter（書き込みできないので読み取りだけ）
- `var`にはgetterとsetter（書き込みも読み込みもできないといけない）

```kotlin
lass Person(
    val name: String,
    var isStudent: Boolean
)

val inuverse = Person("Inuverse", true) // コンストラクタを呼び出す
println("Person name: ${inuverse.name}")
println("Is the person student?: ${inuverse.isStudent}")

println("===== ${inuverse.name} graduates as a Ph.D. from XXX university. =====")
inuverse.isStudent = false

println("Person name: ${inuverse.name}")
println("Is the person student?: ${inuverse.isStudent}")

// inuverse.name = "nukoverse" // Val cannot be reassigned
```
getter methodを呼び出さなくても、プロパティ名で直接参照できるので、Kotlinでは簡素に書けます（Javaでは`getName`のようなgetterや`setStudent`のようなsetterが必要）。

> Tips: JavaでgetterしかないものはKotlinでは`val`、getterとsetterがあるものは`var`と宣言する

多くの場合はプロパティは、プロパティの値を保持する*backing field*（バッキングフィールド）を持ちます。しかし、その値がその場で計算できる場合（たとえば、他のプロパティから導出できる場合）には、カスタム getter を使ってそれを表現できます。

### 値を保持する代わりにプロパティを計算する：カスタムアクセサー
プロパティアクセスのカスタム実装を考えます。ここでは長方形を表す`Rectangle`クラスを考えてみましょう。長方形は正方形を含みます。そこで、長方形の高さと幅が等しければ正方形であることを`isSquare`メソッドで表現することができますが、これは最初にプロパティの高さと幅がわかれば直ちに判明するものです。人間の手で`isSquare`というプロパティを入れるのではなく、計算して得られるものです。

```kotlin
class Rectangle(val height: Int, val width: Int) {
    val isSquare: Boolean
        get() { // property getter declaration
            return height == width
        }
}

val rectangle = Rectangle(3, 3)
println("height: ${rectangle.height}")
println("width: ${rectangle.width}")
println("isSquare: ${rectangle.isSquare}") // true
```
ダメな例は次のように、`isSquare`プロパティを宣言してしまい、プロパティの数を無闇に増やしてしまうことです：
```kotlin
class XRectangle(
    val height: Int,
    val width: Int,
    var isSquare: Boolean
)

val xrectangle = XRectangle(3, 3, true)
println("height: ${xrectangle.height}")
println("width: ${xrectangle.width}")
println("isSquare: ${xrectangle.isSquare}") // true
```

さて、カスタムアクセサーと普通のメソッド、どちらで対応すればいいのだろうか？この本によれば、
- パフォーマンスも実装も違いはない
- だけれども**可読性のみに違いが現れる**

一般的に、クラスの性質であればプロパティ、クラスのふるまいであればメソッドとして書きます。
```kotlin
class Matrix(
    val rows: Int,
    val cols: Int,
    val data: DoubleArray
) {
    val isSquare: Boolean
        get() = rows == cols

    operator fun get(i: Int, j: Int): Double {
        return data[i * cols + j]
    }

    fun transpose(): Matrix {
        val newData = DoubleArray(data.size) { i ->
            data[(i % rows) * cols + (i / rows)]
        }
        return Matrix(cols, rows, newData)
    }
}

val matrixData = doubleArrayOf(
    1.0, 2.0, 3.0,
    4.0, 5.0, 6.0,
    7.0, 8.0, 9.0
)
val matrix = Matrix(3, 3, matrixData)
println("height: ${matrix.rows}")
println("height: ${matrix.cols}")
println("height: ${matrix.isSquare}")
println("matrix[0, 0]: ${matrix[0, 0]}")
println("transposed matrix is:")
println("[${matrix.transpose()[0, 0]}, ${matrix.transpose()[0, 1]}, ${matrix.transpose()[0, 2]}]")
println("[${matrix.transpose()[1, 0]}, ${matrix.transpose()[1, 1]}, ${matrix.transpose()[1, 2]}]")
println("[${matrix.transpose()[2, 0]}, ${matrix.transpose()[2, 1]}, ${matrix.transpose()[2, 2]}]")
```
この例で具体定に説明します。行列を表す`Matrix`クラスは、行列の性質である「正方行列かどうか？」はアクセサメソッドで定義し、行列に対する演算（ふるまい）の転置はメソッドとして定義します。`operator fun get(i: Int, j: Int): Double`は、行列の要素を取得するための演算子オーバーロードで、今後詳細に説明するものです。


### Kotlinソースコードのレイアウト：ディレクトリとパッケージ

Kotlinは複数のクラスを構成するために`package`の概念を有します。全てのファイルは`package`のステートメントが必須です。

```kotlin
package geometry.shapes

class Rectangle(val height: Int, val width: Int) {
    val isSquare: Boolean
        get() = height == width

    fun createUnitSquare(): Rectangle {
        return Rectangle(1, 1)
    }
}
```
他のファイルで定義された宣言も、同じ`package`の中にあれば使えます。同じ`package`に他のファイルを入れるためには文字通り`import`しないといけません。

Kotlinはimportするクラスや関数を特に区別せず、等しく`import`キーワードでimportできます。



### `when` expression の対象を変数にcaptureする

`when`がexpressionとして使われる場合（つまり、その結果が代入や戻り値として用いられる場合）には、コンパイラはその構文が**網羅的**であることを強制します。これは、**考えうるすべての分岐**が値を返さなければならないことを意味します。

その他やdefault値がある場合は`else`節で制御すると、`when` expressionを網羅的にできます。



## 参考文献

- [Kotlin in Action Second Edition](https://www.amazon.co.jp/Kotlin-Action-Second-Sebastian-Aigner/dp/161729960X)

[^1]: [リポジトリ](https://github.com/inuverse44/kotlin-in-action)
