---
title: Kotlin in Action 5章 `fun interface`
date: '2026-02-07'
category: 
tags:
  - Kotlin
cover: 
published: true
---



## 関数型インターフェイス

関数型インターフェイスは
- 1つの抽象メソッド
- 複数の追加の非抽象メソッド
含みます。


```kotlin
fun interface IntCondition {
    fun check(i : Int) : Boolean
    fun checkstring(s: String) = check(s.toInt())
    fun checkChar(c: Char) = check(c.digitToInt())
}

fun main() {
    val isOdd = IntCondition { it % 2 != 0 }
    println(isOdd.check(1))
    // true
    println(isOdd.checkstring("2"))
    // false
    println(isOdd.checkChar('3'))
    // true
}
```

`IntCondition` interfaceにラムダを渡すことで、抽象メソッドを実装できます。


```kotlin
fun checkCondition(i: Int, condition: IntCondition): Boolean {
    return condition.check(i)
}

fun main() {
    checkCondition(1) { it % 2 != 0 }
    // true
    val isOdd: (Int) -> Boolean = { it % 2 != 0 }
    val isEven: (Int) -> Boolean = { it % 2 == 0 }
    checkCondition(1, isOdd)
    // true
    checkCondition(1, isEven)
    // false
}
```
の両方のパターンができます。複数、「条件」自体をインスタンス化することができました。
インスタンス化するときに型を明示的に書いているのですが、ラムダの`it`が`Int`型で、その評価が`Boolean`型であることから、このようなSyntaxを書く必要があります。



`fun interface`に関数型インターフェイスを定義できます。