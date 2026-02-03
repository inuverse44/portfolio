---
title: 【翻訳】KotlinのASCIIアートロゴをターミナルで回転させる
date: '2026-01-19'
tags:
  - Kotlin
cover: https://logos-world.net/wp-content/uploads/2023/07/Medium-Logo.jpg
published: true
---

## はじめに
Kotlinでの技術力をあげたいなあとしみじみと思っているのですが、いかんせん作りプロダクトを思いつかないのです。とくに人に役に立つようなツールやマネタイズは僕は心底大嫌いで、これ何の役に立つんだろう、というものの方が好きなのです。そんな中、Youtube上で[Making a 3D rotating ASII cube in the terminal](https://youtu.be/VzGw7CiEiJY?si=IWkUas7RdzfXSLGI)という動画を見つけて、自分でもこれKotlinで作ってみたいなあと思いました。

ですが、ふと思いつくことは大体誰かが先にやっているものです。実際調べてみると、今回翻訳する記事を見つけることになりました[^1]。まずはこの記事で基礎的なことを学んで、数学をおさらいしてから、また別の記事で実装を試みたいと思います。

--- 

## Rotating the Kotlin Logo with ASCII art in terminal

おそらく古典的な[ターミナルで回転するASCIIドーナツ](https://www.a1k0n.net/2011/07/20/donut-math.html)を一度は見たことがあるでしょう。スクラッチのKotlinで3Dターミナルレンダラーを作ろうと決めました。ドーナツの代わりに、自分自身のチャレンジとしてKotlinのロゴををレンダリングすることにしました。

[ソースコードはこちらです](https://github.com/jashioq/ASCII_kotlin_logo)。

こちらは、その様子です。


これは数学的な変換だけで、ターミナル画面全体で動きます。

$$
    \ast \qquad \ast \qquad \ast
$$


### プロセスの概略
アニメーションをレンダリングするために、レンダラーは9つのステップを実行します。

1. 3次元空間の面として幾何学を定義する
2. それぞれの面について、局所座標系を作成する
3. *point-in-polygon*テストを使用して、面の内部の局所座標系にある点を見つける
4. 面に3次元回転を適用する
5. それぞれの点で色のアタを計算する
6. ランベルトの余弦則[^2]を用いてそれぞれの面の光の角度を計算する
7. 3次元上面を2次元の視点に射影する
8. 射影された2次元の点をASCII文字に置き換える
9. バッファを使ってocclusionを扱う


$$
    \ast \qquad \ast \qquad \ast
$$


### ステップ1: 幾何学的な表現

Kotlinのロゴは3つの主要な部分で構成されています。2つの三角形のピースと1つの台形のピースです。それぞれが面の集合としてモデル化されます。

> 訳註：
> ![kotlin logo](/images/posts/2026-01-19-kotlin-terminal-ascii-renderer/fig1.png#width=300)
> このように2つの三角形のピースと1つの台形のピースに分解できるという意味ですが、現在のロゴは紫のグラデーションの単一の図形で構成されており、分解はできません。

面の垂直方向は面がどの方向に向いているかを示してくれます。

$$
  \mathbf{n}
  = 
  \frac{
    (\mathbf{v}_1 - \mathbf{v}_0)
    \times
    (\mathbf{v}_2 - \mathbf{v}_0)
  }{
    \left|
      (\mathbf{v}_1 - \mathbf{v}_0)
      \times
      (\mathbf{v}_2 - \mathbf{v}_0)
    \right|
  }
$$

外積$\times$は両端のベクトルに対する垂直なベクトルを生成し、それを規格化して長さ1にします。

> 訳註： 視覚的には次のような図を考えてください。
> ![kotlin logo](/images/posts/2026-01-19-kotlin-terminal-ascii-renderer/fig2.png)

面の定義の例です：

```kotlin
Face(
    points = listOf(
        Vector3d(0.0, 1.0, 0.25),
        Vector3d(-1.0, 1.0, 0.25),
        Vector3d(-1.0, 0.0, 0.25),
    ),
    color = FaceColor.Gradient(
        Vector3d(-1.0, 0.0, 0.25), 
        Vector3d(0.0, 1.0, 0.25),
        Color.KOTLIN_BLUE, 
        Color.KOTLIN_PURPLE
    )
)
```

$$
    \ast \qquad \ast \qquad \ast
$$

### ステップ2: 局所座標系を作成する

**問題**：3次元空間の頂点(vertex) $v_0, v_1, v_2, \ldots$によって定義される面があります。点がなす面を効率的に決定する必要があるとします。2次元座標が面の中の点へ写すかどうかテストするために、3次元面を2次元平面上へ平坦化する必要があります。

**解**：
面の表面上に平坦に存在する、互いに直交する2本の基底ベクトル$\mathbf{u}$と$\mathbf{v}$を構成します。

1. （$\mathbf{n}$に並行であることを除いて）任意のベクトルをとります

```kotlin
val arbitrary = if (abs(normal.x) > 0.5) 
    Vector3d(0.0, 1.0, 0.0) 
else 
    Vector3d(1.0, 0.0, 0.0)
```

2. 法線方向に平行な成分を射影によって取りのぞきます：

$$  
  \mathbf{u}
  = \mathbf{a}
  - (\mathbf{a} \cdot \mathbf{n}) \mathbf{n}
 $$

> 訳註： 視覚的には次のような図を考えてください。
> ![kotlin logo](/images/posts/2026-01-19-kotlin-terminal-ascii-renderer/fig3.png)

それから規格化します：
$$
  \frac{\mathbf{u}}{\left| \mathbf{u} \right|}
  \to \mathbf{u}
$$


3. 直交基底（ベクトル）を完成させます：
$$
  \mathbf{v}
  = \mathbf{n} \times \mathbf{u}
$$

よって今、面上の任意の点は次のように書けるようになります：
$$
  \mathbf{p}
  = \mathbf{v}_0
  + x \mathbf{u}
  + y \mathbf{v}
$$
ここで、$x$と$y$は局所座標系の2次元座標です。

> 訳註： 視覚的には次のような図を考えてください。
> ![kotlin logo](/images/posts/2026-01-19-kotlin-terminal-ascii-renderer/fig4.png#width=300)


### ステップ3: point-in-polygonテスト

**レイキャスティングアルゴリズム**：判定したい点から左方向に水平な半直線（ray = 光線）を伸ばします。この半直線が多角形の辺と交差する回数を数えます。
交差回数が奇数なら内部、偶数なら外部と判断します。

頂点$i$から$i+1$のそれぞれの辺に対して、

1. 辺が水平ならスキップします（$y_1 = y_2$）
2. テスト点の$y$座標が$y_1$と$y_2$の間に入っていない場合はスキップする
3. 半直線がその辺と交差する$x$座標を計算する

$$
  x_{\rm intersect}
  = x_1 + \frac{
    (y_{\rm test} - y_1)(x_2 - x_1)
  }{
    y_2 - y_1
  }
$$

4. $x_{\rm test} < x_{\rm intersect}$であれば、交差回数をインクリメントする

```kotlin
private fun pointInPolygon(testX: Double, testY: Double): Boolean {
    var intersections = 0
    for (i in projected2D.indices) {
        val vertex1 = projected2D[i]
        val vertex2 = projected2D[(i + 1) % projected2D.size]

        if (vertex1.y == vertex2.y) continue
        if (testY < min(vertex1.y, vertex2.y) || 
            testY >= max(vertex1.y, vertex2.y)) continue

        val xIntersect = vertex1.x + (testY - vertex1.y) * 
                        (vertex2.x - vertex1.x) / (vertex2.y - vertex1.y)
        if (testX < xIntersect) intersections++
    }
    return intersections % 2 == 1
}
```

> 訳註： 視覚的には次のような図を考えてください。
> ![kotlin logo](/images/posts/2026-01-19-kotlin-terminal-ascii-renderer/fig5.png)


$$
    \ast \qquad \ast \qquad \ast
$$


### ステップ4: 3次元回転変換

回転するロゴをアニメとして映すためには、3次元の点に対して回転行列を作用させる必要があります。


**$x$軸回転 (pitch)**

$$
R_x(\theta)
= 
\begin{pmatrix}
  1 & 0 & 0 \\
  0 & \cos \theta & -\sin \theta \\
  0 & \sin \theta & \cos \theta
\end{pmatrix}
$$

**$y$軸回転 (yaw)**

$$
R_y(\theta)
= 
\begin{pmatrix}
  \cos \theta & 0 & \sin \theta \\
  0 & 1 & 0 \\
  -\sin \theta & 0 & \cos \theta
\end{pmatrix}
$$


**合成された変換**：まずは$x$軸回転、次に$y$軸回転：
$$
  \mathbf{p}^\prime
  = R_y(\theta_y) R_x(\theta_x) \mathbf{p}
$$

注意：回転行列は交換しないので、順番は重要です！

点の位置と面上の法線の両方が変換されます：

```kotlin
val rotatedPoint = Rotation.rotateXY(point, angleX, angleY)
val rotatedNormal = Rotation.rotateXY(normal, angleX, angleY)
```

$$
    \ast \qquad \ast \qquad \ast
$$


### ステップ5: グラデーションカラーの計算

Kotlinロゴはカラーグラデーションが使用されています。点色$C_{\rm start}$の$P_{\rm start}$から点色$C_{\rm end}$の$P_{\rm end}$までのグラデーションを計算する必要があります。


1. 勾配方向のベクトルを定義します：
$$
  \mathbf{g}
  = \mathbf{p}_{\rm end} - \mathbf{p}_{\rm start}
$$

2. 現在の点から勾配へ射影します
$$
  t = 
  \frac{
    (\mathbf{p} - \mathbf{p}_{\rm start}) \cdot \mathbf{g}
  }{
    |\mathbf{g}|^2
  }
$$

この値$t$は：
- $t = 0$は開始の点を意味します
- $t = 1$は終了の点を意味します
- $0 < t < 1$は開始と終了のどこかの間を意味します

色の線形補完：
$$
  C(\mathbf{p})
  = C_{\rm start}
  + t (C_{\rm end} - C_{\rm start})
$$

RGB成分に対して：
$$
\begin{align*}
  R(\mathbf{p})
  &= R_{\rm start}
  + t (R_{\rm end} - R_{\rm start}) \\
  G(\mathbf{p})
  &= G_{\rm start}
  + t (G_{\rm end} - G_{\rm start}) \\
  B(\mathbf{p})
  &= B_{\rm start}
  + t (B_{\rm end} - B_{\rm start})
\end{align*}
$$

**例** 赤RGB(255, 0, 0)から青RGB(0, 0, 255)まで線形補完するときの$t = 0.5$（半分の地点）の場合、
$$
\begin{align*}
  R(\mathbf{p})
  &= 255 + 0.5 \times (0 - 255) = 127.5 \\
  G(\mathbf{p})
  &= 0 + 0.5 \times (0 - 0) = 0 \\
  B(\mathbf{p})
  &= 0 + 0.5 \times (255 - 0) = 127.5
\end{align*}
$$

結果：紫RGB(128, 0, 128)

$$
    \ast \qquad \ast \qquad \ast
$$


### ステップ6: Lambertの余弦則による拡散反射ライティング

位置$\mathbf{L}$にある点光源をシミュレートします。明るさは表面と光の間の角度に依存します。

1. 表面上の点から光源への光の方向を計算する：

$$
  \mathbf{\ell}
  = \mathbf{L} - \mathbf{p}^\prime
$$

2. 両方のベクトルを規格化する：
$$
  \hat{\mathbf{n}}
  = \frac{\mathbf{n}}{\left| \mathbf{n} \right|}
  \,,
  \qquad
  \hat{\mathbf{\ell}}
  = \frac{\mathbf{\ell}}{\left| \mathbf{\ell} \right|}
$$

3. ライティングの強度を計算します：
$$
  I
  = \max(0, \hat{\mathbf{n}} \cdot \hat{\mathbf{\ell}})
$$

内積は$\cos({\rm angle})$を計算します：
- もし表面が光源に相対していたら：角度は$0^\circ$で$\cos(0^\circ) = 1$、明るい
- もし表面が光源の垂直であったら：角度は$90^\circ$で$\cos(90^\circ) = 0$、暗い
- もし表面が光源の裏側にあったら：角度$>90^\circ$で$\cos({\rm angle}) < 0$、強度を0に固定する、暗い


```kotlin
fun calculateDiffuseLighting(
    surfacePoint: Vector3d, 
    surfaceNormal: Vector3d
): Double {
    val toLightVector = Vector3d(position).sub(surfacePoint)
    val normalUnit = Vector3d(surfaceNormal).normalize()
    val lightUnit = toLightVector.normalize()
    return normalUnit.dot(lightUnit).coerceAtLeast(0.0)
}
```


$$
    \ast \qquad \ast \qquad \ast
$$


### ステップ7: 視点の射影
いま3次元空間の世界は2次元のスクリーン上に射影されています。遠くにあるオブジェクトほど小さく現れます。

1. $z$座標（深さ）で割る

$$
  z_{\rm inv}
  = \frac{1}{z^\prime + z_{\rm offset}}
$$

2. スクリーンの座標を計算する

$$
\begin{align*}
  x_{\rm screen}
  &= \frac{W}{2}
  + x^\prime \cdot s_x \cdot z_{\rm inv} \\
  y_{\rm screen}
  &= \frac{H}{2}
  - y^\prime \cdot s_y \cdot z_{\rm inv}
\end{align*}
$$

ここで、
- $W, H$はスクリーンの幅と高さ
- $s_x, s_y$は視野をコントロールするスケール因子
- $z_{\rm offset}$はカメラの距離（ゼロで割ることを防ぐため）

```kotlin
val oneOverZ = 1.0 / (point.z + config.zOffset)
val xScreen = (config.screenWidth / 2 + 
               point.x * config.scaleX * oneOverZ).toInt()
val yScreen = (config.screenHeight / 2 - 
               point.y * config.scaleY * oneOverZ).toInt()
```

### ステップ8: ASCII文字へのマッピング
明るさと色を色付きASCII文字に変換します。

1. 明るさに基づく文字選択：
$$
  {\tt char}
  = {\rm ramp}[ \lfloor I \cdot 11 \rfloor]
$$
ここで、ramp=".,- ␠:;=!*#$@"です。

訳註：$\lfloor x \rfloor$はフロア記号で、$x$以下の最大の整数をとります。例えば$\lfloor 3.2 \rfloor = 3$、$\lfloor 3.8 \rfloor = 3$、$\lfloor 4.0 \rfloor = 4$です。

疎な文字（例：.）は暗い領域を表し、密な文字（例：@）は明るい領域を表す。

2. 照明に基づく色の暗化（減光処理）：
$$
\begin{align*}
  m &= m_{\rm min}
  + (1 - m_{\rm min}) \cdot I \\
  C_{\rm final}
  &= \lfloor m \cdot C(\mathbf{p}) \rfloor
\end{align*}
$$
ここで$m_{\rm min}$は最小の明るさの閾値です（0.85くらいがいい結果であることが分かりました）。これは影の中で色が完全に黒になることを防ぎます。

それぞれのRGB成分：
$$
\begin{align*}
  R_{\rm final}
  &= \lfloor m \cdot R(\mathbf{p}) \rfloor \\
  G_{\rm final}
  &= \lfloor m \cdot G(\mathbf{p}) \rfloor \\
  B_{\rm final}
  &= \lfloor m \cdot B(\mathbf{p}) \rfloor
\end{align*}
$$

### ステップ9: オクルージョン(遮蔽）のための$z$バッファ

**可視性の問題**: 複数の表面が同じスクリーン上のピクセルに投影された場合、どれを表示すべきでしょうか？

解決策は各ピクセルについて、これまでに描画された中で最もカメラに近い表面の深度を保存することです。

$$
  \text{if}~z_{\rm inv}^{\rm new} > z_{\rm buffer}[x, y]~\text{then update pixel}
$$

なぜなら、$z_{\rm inv} = 1/z$であり、この値が大きいということは小さい$z$を意味するので、それはカメラに近いことを意味します。

```kotlin
fun trySetPixel(x: Int, y: Int, depth: Double, content: String): Boolean {
    val index = x + y * width
    if (depth > zBuffer[index]) {
        zBuffer[index] = depth
        displayBuffer[index] = content
        return true
    }
    return false
}
```

$$
    \ast \qquad \ast \qquad \ast
$$

以上です！
これらすべての要素を組み合わせれば、美しいグラデーションと回転を備えた、ほぼあらゆる形状をターミナル上で描画できます。

詳細を学び、実際に動かしてみたい方は、私の GitHub にあるソースコードを確認してください。

[https://github.com/jashioq/ASCII_kotlin_logo](https://github.com/jashioq/ASCII_kotlin_logo)


## 翻訳中のメモ
- Chances are (that) ...: 多分...であろう
- occlusion: 排除、閉塞、閉鎖、妨害、閉塞症、咬合、遮閉法



--- 


[^1]: [Rotating the Kotlin Logo with ASCII art in terminal](https://janwylegala.medium.com/rotating-the-kotlin-logo-with-ascii-art-in-terminal-0aa176284a1d)

[^2]: [ランベルトの余弦則](https://en.wikipedia.org/wiki/Lambert%27s_cosine_law)