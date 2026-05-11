---
slug: 2026-05-11-general-relativity
title: 並行移動 
date: '2026-05-11'
category: general-relativity
tags:
  - general-relativity
cover: https://www.saiensu.co.jp/bookImages/2025-978-4-7819-1645-3.jpg
published: true
---

## 並行移動

### 曲がった空間をどう知覚するか

下記、数学的な厳密な話をしていないので注意しながら読んでください。

ここで述べたいことは、**今いる空間が、それよりも大きな次元の平坦な空間に埋め込むことなしに、曲がっているかどうかを知覚できるか**、ということについて書きます。

簡単のために２次元空間を考えましょう。２次元空間の平面に対し、

- 2次元球面
- 2次元双曲面

は「曲がった空間」です。例えば紙面やボールを想像してみてください。

なぜ、わたしたちがボールのような物体に対して「曲がった空間」であると知覚できるかというと、ボールの全体像をみることができるからです。つまり３次元空間に埋め込まれた２次元の曲がった空間を見ているわけです。

逆にボールの表面を這うアリの視点からみれば、曲がったかどうかは知覚できません。同様に、地球上に住む観測者にとってみれば、地表は日常の感覚でいえば平面です。知識として、わたしたちは地球が球であることを当たり前に知っていますが、地球平面節が蔓延ってきた歴史があるように、なんの前提知識がなければ、球であることを気づくためには工夫が必要です。

### 同じ方向を向いたまま閉曲線を一周する

曲がった空間（２次元球面）として地球を考えてみましょう。点$O$を北極、点$A$、$B$は赤道上の点であるとしましょう。この点$A$は本初子午線（経度$0$度）、点$B$は東経$90$度とします（下記図参照）。

![pararell-transport](/images/posts/2026-05-11-general-relativity/pararell-transport.png)

北極$O$にあるベクトル$\mathbf{v}_1$があるとしましょう。単純に、北極から点$A$方向の南向きに体を向けて、赤道に向けて南下する旅を想像してみてください。

赤道の経度$0$度の点$A$に到着したとき、経度$0$度を沿ったベクトルは$\mathbf{v}_2$となりますね。このときベクトルは南を向いたままですね。

そのまま、1万${\rm km}$ほど東に進み、赤道直下の東経90度である$B$まで向かいましょう。ベクトル$\mathbf{v}_3$もまた南を向いたままです。$\mathbf{v}_2$と$\mathbf{v}_3$の向きは変わらないように見えますね。

ベクトルの方向を南に向けたまま、北極$O$へ戻りましょう。すると$\mathbf{v}_4$になります。

おや、**並行移動しかしていないのに、$\mathbf{v}_1$と$\mathbf{v}_4$が一致していないじゃないですか！**

ここまで、ベクトルへの回転操作は施していません。ただ、同じ方向を指し示したまま**球面上**を並行移動させただけです。

実は、ある空間において、ベクトルを閉曲線$C$上にそって並行移動させると、その前後でベクトルの向きは一般に一致しないのです（経験的に空間が平坦なとき（平面）では、並行移動でベクトルの向きが変わることはありませんでした）。

### 並行移動を定式化する

曲がった空間上での並行移動を考えましょう。点$P$で定義されるベクトル$A^\mu(P)$から微小に離れた点$Q$まで並行移動させたベクトルを、点$P$の情報で
$$
    A^\mu_\parallel(P \to Q)
    \equiv A^\mu(P)
    - {\Gamma^\mu}_{\alpha\beta}(P)
    A^\alpha(P) \Delta x^\beta
$$
と書かれると定義しましょう。ここで$\Gamma$はChristoffel記号です（[[2026-05-09-gr]]）。空間が曲がっているので、$A^\mu(Q)$と点$P$から点$Q$までに並行移動させた$A^\mu_\parallel(P \to Q)$はほとんど一緒なので、$A(Q = P + \Delta x)$だと思って、展開すると
$$
\begin{align}
    A^\mu(Q)
    - A^\mu(Q \to P)
    &= (A^\mu(P) + \partial_\nu A^\mu \cdot \Delta x^\nu)
    - (
        A^\mu(P) - \Gamma^\mu_{\alpha\beta}(P) A^\alpha(P)
        \Delta x^\beta
    )\notag \\
    &= \partial_\nu A^\mu(P) \cdot \Delta x^\nu
    + \Gamma^\mu_{\alpha \nu}(P) \Delta x^\nu \notag \\
    &\equiv \nabla_\nu A^\mu(P) \cdot \Delta x^\nu
\end{align}
$$
となります。最後の行で導入した$\nabla_\nu$は**共変微分**と呼ばれる演算です。

（Christoffel記号は基底ベクトルの変化率です。この変化の影響を差し引いた微分が共変微分です。スカラーは基底ベクトルをもたないので、共変微分と偏微分が等しくなります）

### 共変ベクトルの共変微分

スカラーの共変微分はただの偏微分になるので、$A^\mu$の変換性がスカラーになるように$A^\mu A_\mu$を作って、これを共変微分してみましょう：すると共変ベクトルの共変微分は
$$
\begin{align*}
    \nabla_\nu (A^\mu A_\mu)
    &= \partial_\nu (A^\mu A_\mu) \\
    (\nabla_\nu A^\mu) A_\mu
    + A^\mu \nabla_\nu A_\mu
    &= (\partial_\nu A^\mu) A_\mu
    + A^\mu \partial_\nu A_\mu \\
    A^\mu
    (
        \nabla_\nu A_\mu
        - (
            \partial_\nu A_\mu
            - {\Gamma^\alpha}_{\mu\nu}
            A_\alpha
        )
    )
    &= 0 \\
    \Rightarrow
    \quad
    \nabla_\nu A_\mu
    &= \partial_\nu A_\mu
    - {\Gamma^\alpha}_{\mu\nu}
    A_\alpha
\end{align*}
$$
となります。

### 2階テンソルの共変微分

2つの共変ベクトルの積が2階テンソルと同じ変換性になることから、２階共変テンソル$T_{\mu\nu}$の共変微分は
$$
    \nabla_\mu T_{\alpha\beta}
    = \partial_\mu T_{\alpha\beta}
    - {\Gamma^\nu}_{\mu\alpha} T_{\nu\beta}
    - {\Gamma^\nu}_{\mu\beta} T_{\alpha\nu}
$$
となります。

反変テンソル$T^{\mu\nu}$、混合テンソル${T^\mu}_\nu$も同様ですし、さらに高階のテンソルについても同様です。

### 計量テンソルの共変微分

計量テンソルは一般相対性理論におけるテンソルのなかでもっとも重要と言っても過言ではありません。これの共変微分は
$$
    \nabla_\mu g_{\alpha \beta}
    = 0
$$
となります。

Christoffel記号${\Gamma^\mu}_{\alpha\beta}$（[[2026-05-09-gr]]）が計量テンソルで書ける場合を採用すると、
$$
\begin{align*}
    \nabla_\mu g_{\alpha\beta}
    &= \partial_\mu g_{\alpha\beta}
    - {\Gamma^\nu}_{\mu\alpha} g_{\nu\beta}
    - {\Gamma^\nu}_{\mu\beta} g_{\alpha\nu} \\
    &= \partial_\mu g_{\alpha\beta}
    - \frac{1}{2}g^{\nu\rho}(
        \partial_\alpha g_{\mu\rho}
        + \partial_\mu g_{\rho\alpha}
        - \partial_\rho g_{\mu\alpha}
    ) g_{\nu\beta} \\
    &\qquad\qquad
    - \frac{1}{2}g^{\nu\rho}(
        \partial_\beta g_{\mu\rho}
        + \partial_\mu g_{\rho\beta}
        - \partial_\rho g_{\mu\beta}
    ) g_{\alpha\nu} \\
    &= \partial_\mu g_{\alpha\beta}
    - \frac{1}{2} (
        \textcolor{red}{\partial_\alpha g_{\mu\beta}}
        + \partial_\mu g_{\beta\alpha}
        \textcolor{blue}{- \partial_\beta g_{\mu\alpha}}
    ) \\
    &\qquad\qquad
    - \frac{1}{2} (
        \textcolor{blue}{\partial_\beta g_{\mu\alpha}}
        + \partial_\mu g_{\alpha\beta}
        \textcolor{red}{- \partial_\alpha g_{\mu\beta}}
    ) \\
    &= \partial_\mu g_{\alpha\beta}
    - \partial_\mu g_{\alpha\beta}
    =0
\end{align*}
$$
と、計量テンソルの共変微分が確かに$0$になることを示せました。

---

あとがき。

[須山輝明『重力波』(2025),SGCライブラリ](https://www.saiensu.co.jp/search/?isbn=978-4-7819-1645-3&y=2025)
を読んで、えっちらおっちら計算を追っていいます。一般相対論自体は勉強している前提なので、並行移動についても知っている前提になっています。

このノートには基底の議論からやろうと最初は考えましたが、仕事が忙しいので、別の教科書をよんで補足を書きます🙇

久しぶりにテンソル（の成分）の計算をして楽しかった〜。
