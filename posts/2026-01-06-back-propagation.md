---
title: 誤差逆伝播法
date: '2026-01-06'
tags:
  - 機械学習
cover: https://www.asakura.co.jp/user_data/product_image/13152/1.jpg
published: true
---



## はじめに

ちょっと復讐のために、深層学習（Deep Learning: DL）について、今まで学んだことを何も見ずに再構成したいと思います。まあ、自分用の備忘録ってやつです。



## 学習について

データの羅列を便宜上ベクトルと言うことにします。$ \mathcal{D} =  \\{ \mathbf{x}^{(i)}, \mathbf{y}^{(i)} \\}_{i = 1}^N$というN個のデータのペアが得られるとします。ここで、$i$番目入力ベクトルを$\mathbf{x}^{(i)}$とし、深層学習によって$\mathbf{y}^\mathrm{(model)} = f(\mathbf{x}; W, \mathbf{b})$というモデルを構成します。目指すべきはデータセットにある$\mathbf{x}^{(i)}$でもそれ以外の$\mathbf{x}^{(j)}$に対し、$\mathbf{y} \simeq \mathbf{y}^\mathrm{(model)}$とできることです。

そのような$\mathbf{y}^\mathrm{(model)}$を構築するために、$f$をあるアルゴリズムの下で逐次的に構成することを学習という言うことにします。

さて、この$f$の中身に目を向けましょう！

## 線形変換の限界

今、雑に言えば入力ベクトル$\mathbf{x}^{(i)}$をうまく変換して$\mathbf{y}^{(i)}$に近い$\mathbf{y}^\mathrm{(model)}$としたいわけです。変換という言葉から、ベクトルに対する線形変換を単純に思いつきます。つまり、
```math
    \mathbf{y}
    \simeq \mathbf{y}^\mathrm{(model)}
    = W \mathbf{x} + \mathbf{b}
    \tag{1}
```
をなすという予想です。しかし、これでは豊富な表現力を持たないのです。

すごく簡単な例として入力と出力の両方が1次元であるとしましょう。このとき$(1)$式は
```math
    y 
    \simeq y^\mathrm{(model)}
    = ax + b
    \tag{2}
```
というただの1次関数となります。データの集合が$\mathcal{D} = \\{ x, y \\}_{i = 1}^{4} = \\{(1, 1), (2, 2), (4, 4), (5, 5)) \\}$とします。このデータにおいては、直ちに$a = 1, b = 0$とすれば$x = -1$でも$x = 100$でも$y = -1$、$y = 100$というふう対応関係が説明できそうです。

しかし、もしデータの集合が$\mathcal{D} = \\{ x, y \\}_{i = 1}^{4} = \\{(-2, 4), (-1, 1), (2, 4), 3, 9)) \\}$のようであれば、$(2)$式のモデルは予言能力を持ちません。

仮に線形変換を重ねたとしても、線形変換の線形変換は線形です（それが線形変換の定義でもある）。$\mathbf{x}$に3回変換を施してデモを見てみると
```math
\begin{align}
    &\quad
    W^{(3)}(
        W^{(2)}(
            W^{(1)} \mathbf{x} + \mathbf{b}^{(1)}
        ) + \mathbf{b}^{(2)}
    ) + \mathbf{b}^{(3)} 
    \\[8pt]
    &=
    \underbrace{W^{(3)} W^{(2)} W^{(1)}}_{\text{あらためて}W_{\rm new}\text{とおける}} \mathbf{x}
    \underbrace{
    + W^{(3)} W^{(2)} \mathbf{b}^{(1)}
    + W^{(3)} \mathbf{b}^{(2)}
    + \mathbf{b}^{(2)}
    }_{\text{ここも結局ただの定数ベクトル}\mathbf{b}_{\rm new}\text{となる}}
    \\[8pt]
    &= 
    W_{\rm new} \mathbf{x} + \mathbf{b}_{\rm new}
\end{align}
```
となります。
このため、豊かな表現力のためには非線形性が必要になります。



### 非線形性の導入

$(1)$式の変換は線形変換のために、豊富な表現力を持たないため非線形性を持たせるように拡張しようというアイディアが前節で述べられました。非線形変換を$\sigma$と書いておきます。それを

```math
    \mathbf{y}^\mathrm{(model)}
    = \boldsymbol{\sigma}(W \mathbf{x} + \mathbf{b})
    \tag{3}
```
と書くことにします。$\boldsymbol{\sigma}(\mathbf{v})$は、任意のベクトル$\mathbf{v}$の各成分$v_i$に対して、$\sigma(v_i)$を作用させていることを表しています。添字の方が議論しやすいこともあるので$(3)$を添字で表記しておくと、
```math
    y_i^\mathrm{(model)}
    = \sigma\left(
        \sum_{j}W_{ij} x_j + b_i
    \right)
```
となりますね。$\sigma$は
```math
    \lim_{x \to -\infty} \sigma(x) = 0\,,
    \quad
    \lim_{x \to \infty} \sigma(x) = 1
```
を満たす関数です。また、ここで同じ添字が２回でてきたら和$(\sum)$をとることは明らかなので、省略します[^2]。行列の復讐みたくなりますが、行列の積などを添字表記で表しておきましょう。この２回現れた添字は`for`文の`for (i in 0..10)`のように絶対的な意味がないので、意味がある添字と区別ができる限り、どんな文字でおいても構いません。
```math
\begin{align}
    (AB)_{ij} 
    &= \sum_k A_{ik} B_{kj}
    = A_{ik} B_{kj} = A_{iゆ} B_{ゆj}
    \tag{行列の積}
    \\[8pt]
    \mathbf{u} \cdot \mathbf{v} 
    &= \sum_i u_i v_i
    = u_i v_i
    \tag{内積}
    \\[8pt]
    \nabla \cdot \mathbf{A}(\mathbf{x})
    &= \sum_i \partial_i A_i(\mathbf{x})
    = \partial_i A_i(\mathbf{x})
    \tag{発散}
\end{align}
```

話はもどりますが、実は、$(3)$のような変換
```math
\begin{align}
    \left\{
    \begin{aligned}
        \mathbf{u}^{(i)} 
        &= W^{(i)}\mathbf{z}^{(i-1)} + \mathbf{b}^{(i)} 
        \\[8pt]
        \mathbf{z}^{(i)}
        &= \boldsymbol{\sigma}(\mathbf{u}^{(i)})
    \end{aligned}
    \right.
\end{align}
```
を繰り返すことでニューラルネットを構成できるのです。この$i$ごとのステップが「層」であり、層の数が「深さ」と表現されます。一方、中間の層で$W$の行と列の大きさを変えることもでき、行列のサイズの方を「幅」といいます。[万能近似定理 (universal approximation theorem)](https://en.wikipedia.org/wiki/Universal_approximation_theorem)の結果によれば、無限の幅を持つ1層のニューラルネットで、任意の連続関数に近似できます。この結果から動機づけされて、深さのあるニューラルネットでも同様の近似ができるものだと期待されています。


## 誤差関数の計算

深さ$L$のニューラルネットを考えると、得られるモデル（まだ学習していない）は

```math
    \begin{align}
    &~~~~
    \mathbf{z}^{(1)} = \mathbf{x}
    \\[8pt]
    &
    \left\{
    \begin{aligned}
        \mathbf{u}^{(i)} 
        &= W^{(i)}\mathbf{z}^{(i-1)} + \mathbf{b}^{(i)} 
        \\[8pt]
        \mathbf{z}^{(i)}
        &= \boldsymbol{\sigma}^{(i)}(\mathbf{u}^{(i)})
    \end{aligned}
    \right.
    \\[8pt]
    &~~~~
    \mathbf{y}^\mathrm{(model)} = \mathbf{z}^{(L)}
\end{align}
```
です。これをまとめて書けば下記のようになりますが、かなり煩雑になります。
```math
    \mathbf{y}^{\rm (model)}
    = 
    \boldsymbol{\sigma}^{(L)} ( W^{(L)} (\cdots 
        \boldsymbol{\sigma}^{(2)} ( 
            W^{(2)}(
                \boldsymbol{\sigma}^{(2)}(W^{(2)} \mathbf{x} + \mathbf{b}^{(2)})
            ) + \mathbf{b}^{(2)}
        ) \cdots )+ \mathbf{b}^{(L-1)}
    )
```

次に、誤差関数$\mathcal{E}_\mathcal{D}$が最小となる$W$を$\mathbf{b}$を探すことが必要です。何を動かせばいいかと言うと、$W^{(i)}, \mathbf{b}^{(i)}$というパラメタです（それぞれ重みとバイアスと言われます）。以降、簡単のために
```math
\begin{align}
    W 
    &= (W^{(2)}, \ldots, W^{(L)}) 
    \\[8pt]
    \mathbf{b} 
    &= (\mathbf{b}^{(2)}, \ldots, \mathbf{b}^{(L)})
    \\[8pt]
    \boldsymbol{\sigma}
    &= (\boldsymbol{\sigma}^{(2)}, \ldots, \boldsymbol{\sigma}^{(L)})
\end{align}
```
と表すことがあります。いま誤差関数はこれらのパラメタや活性化関数により陽に
```math
    \mathcal{E}_\mathcal{D}(\mathbf{y}^{(i)}, \mathbf{y}^{\rm (model)}(\mathbf{x}^{(i)}; W, \boldsymbol{\sigma}, \mathbf{b}))
```
と表されるはずです。

さーて、微分タイムです。本によっては$\partial {\cal E}/\partial W$や$\partial {\cal E}/\partial \mathbf{b}$のように書かれている計算です。しかし、正直この記法はあまり好きじゃありません。なぜなら、この書き方はいかにも行列やベクトルで微分しているように見えるからです。実際は各成分にたいして微分を施した量であるため、計算は成分表示でやるほうが親切だと思います。まずは$k$番目の重み行列の$(ij)$成分である$W^{(k)}_{ij}$を変数と思って微分しましょう。その前に、ニューラルネットの関係式を添字表記で表しておきますと
```math
\begin{align}
    \left\{
    \begin{aligned}
        u^{(k)}_i
        &= W_{ij}^{(k)} z^{(k-1)}_j + b^{(k)}_i\,, \\
        z^{(k)}_i
        &= \sigma^{(k)}(u_i^{(k)})
    \end{aligned}
    \right.
\end{align}
```
と表されます。これを使って誤差関数を微分しましょう。活性化関数を作用する中間の$u_i^{(k)}$を使うことで、
```math
\begin{align}
    \frac{\partial {\cal E}_{\cal D}}{\partial W_{ij}^{(k)}}
    &= 
    \frac{\partial {\cal E}_{\cal D}}{\partial u_l^{(k)}}
    \frac{\partial u_l^{(k)}}{\partial W_{ij}^{(k)}}
    \tag{4}
\end{align}
```
とできます（再度言及しておきますが、アインシュタインの縮約規則を使っています。$l$がダミー添字であり、和が省略されています）。$(4)$右辺の最初の因子は
```math
    \Delta^{(k)}_l
    = \frac{\partial {\cal E}_{\cal D}}{\partial u_l^{(k)}}
    \tag{5}
```
とし定義しておき、$(4)$右辺の最後の因子は
```math
\begin{align}
    \frac{\partial u_l^{(k)}}{\partial W_{ij}^{(k)}}
    &= \frac{\partial}{\partial W_{ij}^{(k)}} (
        W_{lm}^{(k)} z_m^{(k-1)} + b_l^{(k)}
    )
    \\
    &= \delta_{il} \delta _{jm} z_m^{(k-1)} = \delta_{li} z_j^{(k-1)}
    \tag{6}
\end{align}
```
と計算されます。微分の途中に登場する$\delta_{ij}$はクロネッカーのデルタと呼ばれ、$i = j$のとき$\delta_{ij} = 1$、$i \neq j$のとき$\delta_{ij} = 0$となります。慣れていないと上の$(6)$式で何の計算をしているかわからないかもしれませんが、簡単な例で説明すると、$q_i = (x, y, z)$としたとき
```math
    \frac{\partial q_i}{\partial q_j}
```
を計算しているようなものです。$x$を$x$で微分すれば$1$だし、$x$を$y$で微分すれば0です。クロネネッカーのデルタを使えば、微分の結果をまとめて表現できるのです。

$(5)(6)$を$(4)$に代入すると
```math
    \frac{\partial {\cal E}_{\cal D}}{\partial W_{ij}^{(k)}}
    = \Delta_l^{(k)} \delta_{li} z_j^{(k-1)}
    = \Delta_i^{(k)} z_j^{(k-1)}
```
とできますね。

## 層同士の関係

```math
\begin{align}
    \left\{
    \begin{aligned}
        u^{(k)}_i
        &= W_{ij}^{(k)} z^{(k-1)}_j + b^{(k)}_i\,, 
        \\[8pt]
        z^{(k)}_i
        &= \sigma^{(k)}(u_i^{(k)})
    \end{aligned}
    \right.
\end{align}
```
の関係から$k$番目と$k+1$番目の層に関係をつけることができます。$\Delta_l^{(k)}$を使うと
```math
\begin{align}
    \Delta_l^{(k)}
    &= \frac{\partial {\cal E}_{\cal D}}{\partial u^{(k)}_l}
    \notag \\[8pt]
    &= \frac{\partial {\cal E}_{\cal D}}{\partial u^{(k+1)}_m}
    \frac{\partial u^{(k+1)}_m}{\partial u^{(k)}_l}
    \notag \\[8pt]
    &= \delta_m^{(k+1)} \frac{\partial}{\partial u_l^{(k)}} 
    (W_{ln}^{(k+1)} z_n^{(k)})
    \notag \\[8pt]
    &= \delta_m^{(k+1)} W_{ln}^{(k+1)} 
    \frac{\partial}{\partial u_l^{(k)}} \sigma^{(k)} (u_n^{(k)})
    \notag \\[8pt]
    &= \delta_m^{(k+1)} W_{ln}^{(k+1)}
    \sigma^{(k)\prime}(u_l^{(k)})
    \frac{\partial u_n^{(k)}}{\partial u_l^{(k)}}
    \notag \\[8pt]
    &= \delta_m^{(k+1)} W_{ln}^{(k+1)}
    \sigma^{(k)\prime}(u_l^{(k)})
    \delta_{ln}
    \notag \\[8pt]
    &= \delta_m^{(k+1)} W_{lm}^{(k+1)}
    \sigma^{(k)\prime}(u_l^{(k)})
\end{align}
```
です。






[^2]: アインシュタインの縮約規則といいます。