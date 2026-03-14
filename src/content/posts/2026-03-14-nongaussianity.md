---
title: バイスペクトル（Bispectrum）の計算
date: '2026-03-14'
category: cosmology
tags:
  - 宇宙論
cover: /images/thumbnail/Planck_s_view_of_the_cosmic_microwave_background.jpg
published: true
---

## 局所型のバイスペクトルを求める

この記事では局所型（local-type）のバイスペクトル（bispectrum）
$$
    B_\zeta^{\rm (local)}(k_1, k_2, k_3)
    = \frac{6}{5} f^{\rm (local)}_{\rm NL} [P(k_1) P(k_2) + P(k_2) P(k_3) + P(k_3) P(k_1)]
$$
を示します。

### 準備

#### 曲率ゆらぎ
ある点$\mathbf{x}_i$における曲率ゆらぎ$\zeta(\mathbf{x}_i)$を期待値$0$のガウス分布に従うゆらぎ$\zeta_g(\mathbf{x}_i)$を用いて、２次ののオーダーで表現できているとします。すなわち、
$$
\begin{align}
    \zeta(\mathbf{x}_i)
    &= \zeta_g(\mathbf{x}_i)
    + \frac{3}{5} f_{\rm NL}^{\rm (local)}
    \zeta_g(\mathbf{x}_i)^2
\end{align}
$$
とします。また、下付き添え字の$c$はキュムラントを表すことを示すものです。

#### パワースペクトル
曲率ゆらぎ$\zeta(\mathbf{x}_i)$のフーリエ成分を$\zeta_{\mathbf{k}_i}$として
$$
    \braket{\zeta_{\mathbf{k}_1} \zeta_{\mathbf{k}_2}}_c
    = (2\pi)^3 P_\zeta(k_1) \delta^3(\mathbf{k}_1 + \mathbf{k}_2)
$$
とします。ここで$P_\zeta(k)$はパワースペクトルです。


#### バイスペクトル
$$
    \braket{\zeta_{\mathbf{k}_1} \zeta_{\mathbf{k}_2} \zeta_{\mathbf{k}_3}}_c
    = (2\pi)^6 B_\zeta(k_1, k_2, k_3) \delta^3(\mathbf{k}_1 + \mathbf{k}_2 + \mathbf{k}_3)
$$
とします。ここで$B_\zeta(k_1, k_2, k_3)$はバイスペクトルです。


#### その他、暗に使うこと
- ガウス分布の**モーメント**は奇数次の項が0となること
- ガウス分布の**キュムラント**は2次までしかなく、3次以上は0になること

### 方針

バイスペクトルは曲率ゆらぎのキュムラントで表されています。曲率ゆらぎはほぼガウス分布であり、２通りの方法で表現します。すなわち、
- ガウス分布で表現してからキュムラント展開
- キュムラントで表現してからガウス分布で表現

で表現し、これらが等しいという関係を用います。最後にフーリエ変換をすれば求める式が現れます。パワースペクトル、バイスペクトルの定義にデルタ関数が現れるので、計算を進めすぎてデルタ関数を消さないように注意しましょう。デルタ関数をあえて残すことで、比較が容易になります。


### 計算

#### ガウス分布で表現してキュムラント展開
まずは曲率ゆらぎの3次のモーメントを、(1)で展開してみます。愚直に計算しましょう。すると、
$$
\begin{align}
    \braket{
        \zeta({\mathbf{x}_1})
        \zeta({\mathbf{x}_2})
        \zeta({\mathbf{x}_3})
    }
    &= 
    \Braket{
        \left(
            \zeta_{g}(\mathbf{x}_1)
            + \frac{3}{5} f_{\rm NL}^{\rm (local)}
            \zeta_{g}(\mathbf{x}_1)^2
        \right)
        \left(
            \zeta_{g}(\mathbf{x}_2)
            + \frac{3}{5} f_{\rm NL}^{\rm (local)}
            \zeta_{g}(\mathbf{x}_2)^2
        \right)
        \left(
            \zeta_{g}(\mathbf{x}_3)
            + \frac{3}{5} f_{\rm NL}^{\rm (local)}
            \zeta_{g}(\mathbf{x}_3)^2
        \right)
    } \notag \\
    &= 
    \bigg\langle
        \zeta_{g}(\mathbf{x}_1) \zeta_{g}(\mathbf{x}_2) \zeta_{g}(\mathbf{x}_3) \notag \\
        &\qquad
        + \frac{3}{5} f_{\rm NL}^{\rm (local)}
        \left(
            \zeta_{g}(\mathbf{x}_1)^2 \zeta_{g}(\mathbf{x}_2) \zeta_{g}(\mathbf{x}_3)
            + \zeta_{g}(\mathbf{x}_1) \zeta_{g}(\mathbf{x}_2)^2 \zeta_{g}(\mathbf{x}_3)
            + \zeta_{g}(\mathbf{x}_1) \zeta_{g}(\mathbf{x}_2) \zeta_{g}(\mathbf{x}_3)^2
        \right) \notag \\
        &\qquad + 
        \frac{9}{25} \left( f_{\rm NL}^{\rm (local)} \right)^2 
        \left(
            \zeta_{g}(\mathbf{x}_1) \zeta_{g}(\mathbf{x}_2)^2 \zeta_{g}(\mathbf{x}_3)^2
            + \text{perms.}
        \right) \notag \\
        &\qquad + 
        \frac{27}{125}\left(f_{\rm NL}^{\rm (local)} \right)^3 
        \left(
            \zeta_{g}(\mathbf{x}_1)^2 \zeta_{g}(\mathbf{x}_2)^2 \zeta_{g}(\mathbf{x}_3)^2
        \right)
    \bigg\rangle
\end{align}
$$
となります。ここで、1行目の項は奇数次なので0となり、3行目の項も同様に0となります。また、最後の項はガウス分布のキュムラント展開を考えると$\braket{\zeta \zeta}_c\braket{\zeta \zeta}_c\braket{\zeta \zeta}_c$という形式で現れます。これは$P_\zeta(k)$の3乗に比例する項なので、いま考える領域では無視できます。よって、
$$
\begin{align}
    \braket{\zeta(\mathbf{x}_1)\zeta(\mathbf{x}_2)\zeta(\mathbf{x}_3)}
    &= 
    \frac{3}{5} f_{\rm NL}^{\rm (local)}
    \left(
        \braket{\zeta_g^2(\mathbf{x}_1)\zeta_g(\mathbf{x}_2)\zeta_g(\mathbf{x}_3)}
        + \braket{\zeta_g(\mathbf{x}_1)\zeta_g^2(\mathbf{x}_2)\zeta_g(\mathbf{x}_3)}
        + \braket{\zeta_g(\mathbf{x}_1)\zeta_g(\mathbf{x}_2)\zeta_g^2(\mathbf{x}_3)}
    \right)
\end{align}
$$

次に、残った各項にたいしてキュムラント展開を施します。ガウス分布のキュムラント展開は2次までしかなく、ガウス分布を$g(\mathbf{x}_i)$とすると、次のように展開できます。
$$
    \begin{align}
        \braket{
            g(\mathbf{x}_1) 
            g(\mathbf{x}_2)
            g(\mathbf{x}_3)
            g(\mathbf{x}_4)
        }
        &= 
        \braket{g(\mathbf{x}_1)g(\mathbf{x}_2)}_c
        \braket{g(\mathbf{x}_3)g(\mathbf{x}_4)}_c \notag \\
        &\quad + \braket{g(\mathbf{x}_1)g(\mathbf{x}_3)}_c
        \braket{g(\mathbf{x}_2)g(\mathbf{x}_4)}_c \notag \\
        &\quad + \braket{g(\mathbf{x}_1)g(\mathbf{x}_4)}_c
        \braket{g(\mathbf{x}_2)g(\mathbf{x}_3)}_c
    \end{align}
$$
これを例えば(3)の1項目に適用すると、
$$
    \begin{align}
        \braket{\zeta_g^2(\mathbf{x}_1)\zeta_g(\mathbf{x}_2)\zeta_g(\mathbf{x}_3)}
        &= 
        \braket{\zeta_g^2(\mathbf{x}_1)}_c
        \braket{\zeta_g(\mathbf{x}_2) \zeta_g(\mathbf{x}_3)}_c + 
        2 \braket{\zeta_g(\mathbf{x}_1)\zeta_g(\mathbf{x}_2)}_c
        \braket{\zeta_g(\mathbf{x}_1)\zeta_g(\mathbf{x}_3)}_c
    \end{align}
$$
とできます。(3)の各項に同様の計算を適用すれば、(3)は
$$
    \begin{align}
        &\braket{\zeta(\mathbf{x}_1)\zeta(\mathbf{x}_2)\zeta(\mathbf{x}_3)} 
        \notag \\
        &= 
        \frac{3}{5}
        f_{\rm NL}^{\rm (local)}
        (
            \braket{\zeta_g^2(\mathbf{x}_1)}_c 
            \braket{\zeta_g(\mathbf{x}_2) \zeta_g(\mathbf{x}_3)}_c
            + \braket{\zeta_g^2(\mathbf{x}_2)}_c 
            \braket{\zeta_g(\mathbf{x}_3) \zeta_g(\mathbf{x}_1)}_c
            + \braket{\zeta_g^2(\mathbf{x}_3)}_c 
            \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_2)}_c
        ) \notag \\
        &\quad + \frac{6}{5} f_{\rm NL}^{\rm (local)}
        (
            \braket{
                \zeta_g (\mathbf{x}_1) 
                \zeta_g (\mathbf{x}_2)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_1)
                \zeta_g (\mathbf{x}_3)
            }_c
            + \braket{
                \zeta_g (\mathbf{x}_2)
                \zeta_g (\mathbf{x}_3)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_2)
                \zeta_g (\mathbf{x}_1)
            }_c
            + \braket{
                \zeta_g (\mathbf{x}_3)
                \zeta_g (\mathbf{x}_1)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_3)
                \zeta_g (\mathbf{x}_2)
            }_c
        )
    \end{align}
$$
を得ます。

#### キュムラント展開してガウス分布で表現
逆に、3次の$\braket{\zeta(\mathbf{x}_1) \zeta(\mathbf{x}_2) \zeta(\mathbf{x}_3)}$を先にキュムラント展開して、ガウス分布で表現してみましょう。ガウス分布であるという性質は使えないので、素のキュムラント展開をすると、
$$
\begin{align}
    \braket{\zeta(\mathbf{x}_1) \zeta(\mathbf{x}_2) \zeta(\mathbf{x}_3)}
    &= 
    \braket{
        \zeta_g(\mathbf{x}_1)
        \zeta_g(\mathbf{x}_2)
        \zeta_g(\mathbf{x}_3)
    }_c \notag \\
    &\quad + \braket{
        \zeta_g(\mathbf{x}_1)
    }_c
    \braket{
        \zeta_g(\mathbf{x}_2)
        \zeta_g(\mathbf{x}_3)
    }_c
    + \braket{
        \zeta_g(\mathbf{x}_2)
    }_c
    \braket{
        \zeta_g(\mathbf{x}_3)
        \zeta_g(\mathbf{x}_1)
    }_c
    + \braket{
        \zeta_g(\mathbf{x}_3)
    }_c
    \braket{
        \zeta_g(\mathbf{x}_1)
        \zeta_g(\mathbf{x}_2)
    }_c
\end{align}
$$
となります。これをガウス分布で表現すると、偶数次しか残らない条件と、$\zeta$の4次までしか取らない条件から
$$
    \begin{align}
         \braket{\zeta(\mathbf{x}_1) \zeta(\mathbf{x}_2) \zeta(\mathbf{x}_3)}
    &= 
    \braket{
        \zeta_g(\mathbf{x}_1)
        \zeta_g(\mathbf{x}_2)
        \zeta_g(\mathbf{x}_3)
    }_c \notag \\
   &\quad + \frac{3}{5}
        f_{\rm NL}^{\rm (local)}
        (
            \braket{\zeta_g^2(\mathbf{x}_1)}_c 
            \braket{\zeta_g(\mathbf{x}_2) \zeta_g(\mathbf{x}_3)}_c
            + \braket{\zeta_g^2(\mathbf{x}_2)}_c 
            \braket{\zeta_g(\mathbf{x}_3) \zeta_g(\mathbf{x}_1)}_c
            + \braket{\zeta_g^2(\mathbf{x}_3)}_c 
            \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_2)}_c
        )
    \end{align}
$$
となります。

#### 両者を比較する
先の節で得た最後の式は、(6)式の係数が$3/5$の項たちに一致します。よって、両者を比較して、3次のキュムラント
$$
    \begin{align}
        \braket{
            \zeta_g (\mathbf{x}_1)
            \zeta_g (\mathbf{x}_2)
            \zeta_g (\mathbf{x}_3)
        }_c
        =
        \frac{6}{5} f_{\rm NL}^{\rm (local)}
        (
            \braket{
                \zeta_g (\mathbf{x}_1) 
                \zeta_g (\mathbf{x}_2)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_1)
                \zeta_g (\mathbf{x}_3)
            }_c
            + \braket{
                \zeta_g (\mathbf{x}_2)
                \zeta_g (\mathbf{x}_3)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_2)
                \zeta_g (\mathbf{x}_1)
            }_c
            + \braket{
                \zeta_g (\mathbf{x}_3)
                \zeta_g (\mathbf{x}_1)
            }_c
            \braket{
                \zeta_g (\mathbf{x}_3)
                \zeta_g (\mathbf{x}_2)
            }_c
        )
    \end{align}
$$

#### フーリエ変換する
(9)の左辺をフーリエ変換すると
$$
\begin{align}
    \braket{
        \zeta(\mathbf{x}_1)
        \zeta(\mathbf{x}_2)
        \zeta(\mathbf{x}_3)
    }
    &= 
    \int \frac{d^3k_1 d^3k_2 d^3k_3}{(2\pi)^9}
    e^{-i (\mathbf{k}_1 \cdot \mathbf{x}_1 + \mathbf{k}_2 \cdot \mathbf{x}_2 + \mathbf{k}_3 \cdot \mathbf{x}_3)}
    \braket{
        \zeta_{\mathbf{k}_1}
        \zeta_{\mathbf{k}_2}
        \zeta_{\mathbf{k}_3}
    }_c
\end{align}
$$
です。積分の中のキュムラントはバイスペクトルの定義から
$$
\begin{align}
\braket{
        \zeta(\mathbf{x}_1)
        \zeta(\mathbf{x}_2)
        \zeta(\mathbf{x}_3)
    }
    &= 
    \int \frac{d^3k_1 d^3k_2 d^3k_3}{(2\pi)^6}
    e^{-i (\mathbf{k}_1 \cdot \mathbf{x}_1 + \mathbf{k}_2 \cdot \mathbf{x}_2 + \mathbf{k}_3 \cdot \mathbf{x}_3)}
    B_\zeta(k_1, k_2, k_3)
    \delta^3 (\mathbf{k}_1 + \mathbf{k}_2 + \mathbf{k}_3)
\end{align}
$$
と表されます。

一方、(9)の右辺をフーリエ変換しましょう。いきなり積分すると大変なので、まずは
$$
\begin{align}
    \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_2)}_c &= \int \frac{d^3k_1 d^3k_2}{(2\pi)^6} e^{-i (\mathbf{k}_1 \cdot \mathbf{x}_1 + \mathbf{k}_2 \cdot \mathbf{x}_2)} \braket{\zeta_{\mathbf{k}_1} \zeta_{\mathbf{k}_2}}_c \notag \\
    &= \int \frac{d^3k_1 d^3k_2}{(2\pi)^3} e^{-i (\mathbf{k}_1 \cdot \mathbf{x}_1 + \mathbf{k}_2 \cdot \mathbf{x}_2)} P_\zeta(k_2) \delta^3 (\mathbf{k}_1 + \mathbf{k}_2)
\end{align}
$$
です。よって、
$$
\begin{align}
    \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_2)}_c 
    \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_3)}_c
    &= \int \frac{d^3k_1 d^{3}k^\prime_1 d^3k_2 d^3k_2 }{(2\pi)^6} 
    e^{-i ((\mathbf{k}_1 + \mathbf{k}^\prime_1) \cdot \mathbf{x}_1 + \mathbf{k}_2 \cdot \mathbf{x}_2 + \mathbf{k}_3 \cdot \mathbf{x}_3)} 
    P_\zeta(k_2) P_\zeta(k_3) 
    \delta^3 (\mathbf{k}_1 + \mathbf{k}_2)
    \delta^3 (\mathbf{k}^\prime_1 + \mathbf{k}_3)
\end{align}
$$
となります。ここで$\mathbf{k}_1, \mathbf{k}_1^\prime$は積分変数として重複してしまったので文字を変更しました。
変数変換$\mathbf{p}_1 = \mathbf{k}_1 + \mathbf{k}^\prime_1$、$\mathbf{p}_2 = \mathbf{k}_2$、$\mathbf{p}_3 = \mathbf{k}_3$を行い、$\mathbf{k}_1^\prime = \mathbf{p}_1 - \mathbf{k}_1$を消去すると
$$
\begin{align}
    \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_2)}_c 
    \braket{\zeta_g(\mathbf{x}_1) \zeta_g(\mathbf{x}_3)}_c
    &= \int \frac{d^3p_1 d^3p_2 d^3p_3}{(2\pi)^3}
    e^{-i (\mathbf{p}_1 \cdot \mathbf{x}_1 + \mathbf{p}_2 \cdot \mathbf{x}_2 + \mathbf{p}_3 \cdot \mathbf{x}_3)}
    P_\zeta(p_2) P_\zeta(p_3)
    \delta^3 (\mathbf{p}_1 + \mathbf{p}_2 + \mathbf{p}_3)
\end{align}
$$
となりました。同様に他の項も計算すればよく、(9)に再び代入して被積分関数を比較すれば
$$
    B_\zeta^{\rm (local)}(k_1, k_2, k_3)
    = \frac{6}{5} f^{\rm (local)}_{\rm NL} [P(k_1) P(k_2) + P(k_2) P(k_3) + P(k_3) P(k_1)]
$$
と、私たちが求めたい式を導出できました。

## 参考

- Tomo Takahashi, [Primordial non-Gaussianity and the inflationary Universe](https://academic.oup.com/ptep/article/2014/6/06B105/1559723?login=false) Progress of Theoretical and Experimental Physics, Volume 2014, Issue 6, June 2014