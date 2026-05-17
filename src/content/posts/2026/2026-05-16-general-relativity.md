---
slug: 2026-05-16-general-relativity
title: リーマンテンソルに関する諸公式
date: '2026-05-16'
category: general-relativity
tags:
  - general-relativity
cover: https://www.saiensu.co.jp/bookImages/2025-978-4-7819-1645-3.jpg
published: true
---


## リーマンテンソル

以前の記事（[[2026-05-12-general-relativity]]）にて、リーマンテンソルとは空間の曲がりぐあいを表す量でした。平坦な空間で、ベクトルを並行移動させ閉曲線をぐるっと一周させても、ベクトル自体は変化しないですが、曲がった空間だとそうはなりません。つまり、リーマンテンソルとは、曲がった空間においてベクトルの閉曲線上で並行移動させ、並行移動前後でのベクトルの差のことです。

リーマン (Riemann) テンソルにはいくつか性質やそれにまつわる公式が存在します。この記事では、リーマンテンソルと、それを使って表されるアインシュタインテンソルの性質を、証明付きで載せています。

ちなみに、リーマンテンソルは
$$
\begin{align}
    {R^\mu}_{\nu\alpha\beta}
    \equiv
    \partial_\alpha {\Gamma^\mu}_{\nu\beta}
    - \partial_\beta {\Gamma^\mu}_{\nu\alpha}
    + {\Gamma^\mu}_{\sigma\alpha} {\Gamma^\sigma}_{\nu\beta}
    - {\Gamma^\mu}_{\sigma\beta} {\Gamma^\sigma}_{\nu\alpha}
\end{align}
$$
です！クリストッフェル記号${\Gamma^\lambda}_{\mu\nu}$は（[[2026-05-09-gr]]）などを参考にしてください。

### 1. 対称・反対称な添字

リーマンテンソル (1)式をよく睨んでみますと、添字$\alpha$と$\beta$について対称です。対称な項をいちいち書くと面倒なので、次のような記法を導入しておきます：
$$
    {R^\mu}_{\nu\alpha\beta}
    = \partial_\alpha {\Gamma^\mu}_{\nu\beta}
    + {\Gamma^\mu}_{\sigma\alpha} {\Gamma^\sigma}_{\nu\beta}
    - (\alpha \leftrightarrow \beta)
$$
これによって、大幅に覚えることが少なくなりました。

計量テンソルで$g_{\mu\lambda}$でリーマンテンソル${R^\lambda}_{\nu\alpha\beta}$の上付き添字を下げた4階共変テンソルを考えてみましょう。つまり
$$
    R_{\mu\nu,\alpha\beta}
    = g_{\mu\lambda} {R^\lambda}_{\nu\alpha\beta}
$$
です（カンマはこの後すぐの議論の見やすさのためにいれています）。このテンソルは$(\mu \leftrightarrow \nu)$の入れ替え、$(\alpha \leftrightarrow \beta)$の入れ替えについて反対称で、ペアの入れ替え$((\mu, \nu) \leftrightarrow (\alpha, \beta))$に対称です。つまり、
$$
    R_{\mu\nu, \alpha\beta}
    = R_{\alpha\beta, \mu\nu}
    = - R_{\nu\mu, \alpha\beta}
    = - R_{\mu\nu, \beta\alpha}
$$
が成り立ちます。

### 2. 反変ベクトルに共変微分の交換関係を作用させる

共変微分自体、並行移動に関係する概念でした。これをリーマンテンソルを定義した議論のときの２通りの並行移動後のベクトルの差をとることと同様に、共変微分を２通り用意してベクトルに作用させて差をとってみましょう：
$$
\begin{align}
    (
        \nabla_\mu \nabla_\nu
        - \nabla_\nu \nabla_\mu
    ) V^\alpha
    \equiv [\nabla_\mu, \nabla_\nu] V^\alpha
    = {R^\alpha}_{\beta \mu\nu} V^\beta
\end{align}
$$

このようにリーマンテンソルが現れます。

$\underline{\textit{Check}}$

$$
\begin{align}
    [\nabla_\mu, \nabla_\nu] V^\alpha
    &=
        \nabla_\mu (\nabla_\nu V^\alpha)
        - (\mu \leftrightarrow \nu) \notag \\
    &=
        \partial_\mu (\nabla_\nu V^\alpha)
        - {\Gamma^\lambda}_{\mu\nu} \nabla_\lambda V^\alpha
        + {\Gamma^\alpha}_{\mu\lambda} \nabla_\nu V^\lambda
        - (\mu \leftrightarrow \nu) \notag \\
    &=
        \textcolor{red}{\partial_\mu (
            \partial_\nu V^\alpha}
            + {\Gamma^\alpha}_{\nu\beta} V^\beta
        ) \notag \\
        &\qquad
            \textcolor{red}{- {\Gamma^\lambda}_{\mu\nu} (
                \partial_\lambda V^\alpha
                + {\Gamma^\alpha}_{\lambda\beta} V^\beta
            )} \notag \\
        &\qquad
            + {\Gamma^\alpha}_{\mu\lambda} (
                \partial_\nu V^\lambda
                + {\Gamma^\lambda}_{\nu\beta} V^\beta
            ) - (\mu \leftrightarrow \nu) \notag \\
\end{align}
$$
とまで計算できます。ここで赤色の項がそれぞれ$(\mu \leftrightarrow \nu)$の中に異符号で現れるのでキャンセルされます。
すると、
$$
\begin{align}
    [\nabla_\mu, \nabla_\nu] V^\alpha
    &=
        (\partial_\mu {\Gamma^\alpha}_{\nu\beta}) V^\beta
        \textcolor{red}{+ {\Gamma^\alpha}_{\nu\beta} \partial_\mu V^\beta}
        \notag \\
        &\qquad
            \textcolor{blue}{+ {\Gamma^\alpha}_{\mu\lambda} \partial_\nu V^\lambda}
            + {\Gamma^\alpha}_{\mu\lambda} {\Gamma^\lambda}_{\nu\beta} V^\beta
            \notag \\
        &\qquad
            - (\partial_\nu {\Gamma^\alpha}_{\mu\beta}) V^\beta
            \textcolor{blue}{- {\Gamma^\alpha}_{\mu\beta} \partial_\nu V^\beta}
            \notag \\
        &\qquad
            \textcolor{red}{- {\Gamma^\alpha}_{\nu\lambda} \partial_\mu V^\lambda}
            - {\Gamma^\alpha}_{\nu\lambda} {\Gamma^\lambda}_{\mu\beta} V^\beta
            \notag
\end{align}
$$
となります。この式では同じ色同士がキャンセルされます。
よって最終的に
$$
    [\nabla_\mu, \nabla_\nu] V^\alpha
    =
        (
            \partial_\mu {\Gamma^\alpha}_{\nu\beta}
            - \partial_\nu {\Gamma^\alpha}_{\mu\beta}
            + {\Gamma^\alpha}_{\mu\lambda} {\Gamma^\lambda}_{\nu\beta}
            - {\Gamma^\alpha}_{\nu\lambda} {\Gamma^\lambda}_{\mu\beta}
        ) V^\beta
    = {R^\alpha}_{\beta\mu\nu} V^\beta
$$
を示すことができました。
$\blacksquare$

### 3. 共変微分のヤコビ恒等式

非可換の演算について一般に成り立つヤコビ (Jacobi) 恒等式は、もちろん共変微分についても成り立ちます：
$$
\begin{align}
    [
        \nabla_\lambda, [
            \nabla_\mu, \nabla_\nu
        ]
    ]
    + [
        \nabla_\mu, [
            \nabla_\nu, \nabla_\lambda
        ]
    ]
    + [
        \nabla_\nu, [
            \nabla_\lambda, \nabla_\mu
        ]
    ] = 0
\end{align}
$$

$\underline{\textit{Check}}$

$$
\begin{align}
    &
        [
            \nabla_\lambda, [
                \nabla_\mu, \nabla_\nu
            ]
        ]
        + [
            \nabla_\mu, [
                \nabla_\nu, \nabla_\lambda
            ]
        ]
        + [
            \nabla_\nu, [
                \nabla_\lambda, \nabla_\mu
            ]
        ]
        \notag \\
    &=
        \nabla_\lambda (
            \nabla_\mu \nabla_\nu
            - \nabla_\nu \nabla_\mu
        )
        - (
            \nabla_\mu \nabla_\nu
            - \nabla_\nu \nabla_\mu
        ) \nabla_\lambda
        \notag \\
    &\qquad
        + \nabla_\mu (
            \nabla_\nu \nabla_\lambda
            - \nabla_\lambda \nabla_\nu
        )
        - (
            \nabla_\nu \nabla_\lambda
            - \nabla_\lambda \nabla_\nu
        ) \nabla_\mu
        \notag \\
    &\qquad
        + \nabla_\nu (
            \nabla_\lambda \nabla_\mu
            - \nabla_\mu \nabla_\lambda
        )
        - (
            \nabla_\lambda \nabla_\mu
            - \nabla_\mu \nabla_\lambda
        ) \nabla_\nu
        \notag \\
    &=
        \textcolor{red}{\nabla_\lambda \nabla_\mu \nabla_\nu}
        \textcolor{blue}{- \nabla_\lambda \nabla_\nu \nabla_\mu}
        \textcolor{green}{- \nabla_\mu \nabla_\nu \nabla_\lambda}
        \textcolor{orange}{+ \nabla_\nu \nabla_\mu \nabla_\lambda}
        \notag \\
    &\qquad
        \textcolor{green}{+ \nabla_\mu \nabla_\nu \nabla_\lambda}
        \textcolor{magenta}{- \nabla_\mu \nabla_\lambda \nabla_\nu}
        - \nabla_\nu \nabla_\lambda \nabla_\mu
        \textcolor{blue}{+ \nabla_\lambda \nabla_\nu \nabla_\mu}
        \notag \\
    &\qquad
        + \nabla_\nu \nabla_\lambda \nabla_\mu
        \textcolor{orange}{- \nabla_\nu \nabla_\mu \nabla_\lambda}
        \textcolor{red}{- \nabla_\lambda \nabla_\mu \nabla_\nu}
        \textcolor{magenta}{+ \nabla_\mu \nabla_\lambda \nabla_\nu}
    = 0
    \notag
\end{align}
$$
のように同じ色の項がキャンセルして、ヤコビ恒等式を示せます。
$\blacksquare$

### 4. (1,1)型混合テンソルに共変微分の交換関係を作用させる

後のために、(1,1)型混合テンソル${T^\alpha}_\beta$に共変微分の交換関係を作用させた結果
$$
\begin{align}
    [\nabla_\mu, \nabla_\nu] {T^\alpha}_\beta
    = {R^\alpha}_{\lambda\mu\nu} {T^\lambda}_\beta
    - {R^\lambda}_{\beta\mu\nu} {T^\alpha}_\lambda
\end{align}
$$
を求めてみましょう。これはアインシュタイン (Einstein) テンソルの共変微分が０になるというビアンキ (Bianchi) 恒等式へ導出するための道具となります。

$\underline{\textit{Check}}$

1. テンソル${T^\alpha}_\beta$の変換性が反変ベクトル$V^\alpha$と共変ベクトル$\omega_\beta$の積と同じこと、
2. $[\nabla_\mu, \nabla_\nu]$が微分演算子であり、ライプニッツルールに従うこと、
3. $[\nabla_\mu, \nabla_\nu] \omega_\beta = - {R^\lambda}_{\beta\mu\nu} \omega_\lambda$であること、

を用いると、${T^\alpha}_\beta = V^\alpha \omega_\beta$と書くことにして、
$$
\begin{align}
    [\nabla_\mu, \nabla_\nu] {T^\alpha}_\beta
    &=
        ([\nabla_\mu, \nabla_\nu] V^\alpha) \omega_\beta
        + V^\alpha( [\nabla_\mu, \nabla_\nu] \omega_\beta)
        \notag \\
    &=
        {R^\alpha}_{\lambda\mu\nu} V^\lambda \omega_\beta
        - {R^\lambda}_{\beta\mu\nu} V^\alpha \omega_\lambda
        \notag \\
    &= {R^\alpha}_{\lambda\mu\nu} {T^\lambda}_\beta
    - {R^\lambda}_{\beta\mu\nu} {T^\alpha}_\lambda
    \notag
\end{align}
$$
と、示すことができました。
$\blacksquare$

### 5. 第一ビアンキ恒等式

$$
\begin{align}
    {R^\lambda}_{\alpha\beta\gamma}
    + {R^\lambda}_{\beta\gamma\alpha}
    + {R^\lambda}_{\gamma\alpha\beta}
    = 0
\end{align}
$$

$\underline{\textit{Check}}$

$$
\begin{align}
    &\quad
        {R^\lambda}_{\alpha\beta\gamma}
        + {R^\lambda}_{\beta\gamma\alpha}
        + {R^\lambda}_{\gamma\alpha\beta}
        \notag \\
    &=
        \textcolor{red}{\partial_\alpha {\Gamma^\lambda}_{\beta\gamma}}
        \textcolor{blue}{- \partial_\gamma {\Gamma^\lambda}_{\alpha\beta}}
        \textcolor{green}{+ {\Gamma^\lambda}_{\beta\kappa} {\Gamma^\kappa}_{\alpha\gamma}}
        \textcolor{orange}{- {\Gamma^\lambda}_{\kappa\gamma} {\Gamma^\kappa}_{\alpha\beta}}
        \notag \\
    &\qquad
        \textcolor{magenta}{+ \partial_\beta {\Gamma^\lambda}_{\gamma\alpha}}
        \textcolor{red}{- \partial_\alpha {\Gamma^\lambda}_{\beta\gamma}}
        \textcolor{orange}{+ {\Gamma^\lambda}_{\gamma\kappa} {\Gamma^\kappa}_{\beta\alpha}}
        - {\Gamma^\lambda}_{\kappa\alpha} {\Gamma^\kappa}_{\beta\gamma}
        \notag \\
    &\qquad
        \textcolor{blue}{+ \partial_\gamma {\Gamma^\lambda}_{\alpha\beta}}
        \textcolor{magenta}{- \partial_\beta {\Gamma^\lambda}_{\gamma\alpha}}
        + {\Gamma^\lambda}_{\alpha\kappa} {\Gamma^\kappa}_{\gamma\beta}
        \textcolor{green}{- {\Gamma^\lambda}_{\kappa\beta} {\Gamma^\kappa}_{\gamma\alpha}}
        \notag \\
    &= 0 \notag
\end{align}
$$
と計算できて（同じ色がキャンセルします）、第一ビアンキ恒等式が示されました。
$\blacksquare$

### 6. 第二ビアンキ恒等式

$$
\begin{align}
    \nabla_{\alpha} {R^\mu}_{\nu\beta\gamma}
    + \nabla_{\beta} {R^\mu}_{\nu\gamma\alpha}
    + \nabla_{\gamma} {R^\mu}_{\nu\alpha\beta}
    = 0
\end{align}
$$

$\underline{\textit{Check}}$

共変微分のヤコビ恒等式をベクトル$V^\mu$に作用させることで、導くことができます：
$$
\begin{align}
    0
    &=
        (
            [
                \nabla_\gamma, [
                    \nabla_\alpha, \nabla_\beta
                ]
            ]
            + [
                \nabla_\alpha, [
                    \nabla_\beta, \nabla_\gamma
                ]
            ]
            + [
                \nabla_\beta, [
                    \nabla_\gamma, \nabla_\alpha
                ]
            ]
        ) V^\mu
        \notag \\
    &=
        [
            \nabla_\gamma, [
                \nabla_\alpha, \nabla_\beta
            ]
        ] V^\mu
        + \text{cyclic term}
        \notag \\
    &=
        \nabla_\gamma ([\nabla_\alpha, \nabla_\beta] V^\mu)
        - [\nabla_\alpha, \nabla_\beta] (\nabla_\gamma V^\mu)
        + \text{cyclic term}  
        \notag
\end{align}
$$
となりますが、ここで第一項は(2)式、第二項は(4)式を用いることで計算できます。なぜなら、共変微分は共変ベクトルとしての変換性をもち、それによって$(\nabla_\gamma V^\mu)$が(1,1)型混合テンソルとしての変換性をもつためです。ちなみに、$\text{cyclic term}$とは、$\alpha \to \beta \to \gamma$のように添字を入れ替えた項が隠れているという意味です。それぞれの式を適用させると、
$$
\begin{align}
    0
    &=
        \nabla_\gamma ({R^\mu}_{\nu \alpha\beta} V^\nu)
        - (
            {R^\mu}_{\nu\alpha\beta} \nabla_\gamma V^\nu
            - {R^\lambda}_{\gamma\alpha\beta} \nabla_\lambda V^\mu
        )
        + \text{cyclic term}
        \notag \\
    &=
        (\nabla_\gamma {R^\mu}_{\nu \alpha\beta}) V^\nu
        \textcolor{red}{+ {R^\mu}_{\nu \alpha\beta} \nabla_\gamma V^\nu}
        \textcolor{red}{- {R^\mu}_{\nu\alpha\beta} \nabla_\gamma V^\mu}
        + {R^\lambda}_{\gamma\alpha\beta} \nabla_\lambda V^\mu
        + \text{cyclic term}
        \notag \\
    &=
        (
            \nabla_\gamma {R^\mu}_{\nu \alpha\beta} + \text{cyclic term}
        ) V^\nu
        + (
            {R^\lambda}_{\gamma\alpha\beta}
            + \text{cyclic term}
        ) \nabla_\lambda V^\mu
\end{align}
$$
となります。赤文字はキャンセルした項を表しています。この式の第二項は第一ビアンキ恒等式ですので０になります。任意のベクトル$V^\nu$についてこの式が成り立つためには
$$
    \nabla_\gamma {R^\mu}_{\nu \alpha\beta} + \text{cyclic term}
    = 0
$$
が要請されるので、これはまさに示したかった第二ビアンキ恒等式となります。
$\blacksquare$

### 7. アインシュタインテンソルの発散が０

$$
\begin{align}
    \nabla^\mu G_{\mu\nu} = 0
\end{align}
$$

> （どうでもいい注）この式があるからこそ、アインシュタイン方程式$G_{\mu\nu} = 8\pi G T_{\mu\nu}$は$\nabla^\mu T_{\mu\nu} = 0$というエネルギー・運動量保存則を自動的に満たすのです！

$\underline{\textit{Check}}$

$$
\begin{align}
    \nabla_\alpha {R^\mu}_{\nu\beta\gamma}
    + \nabla_\beta {R^\mu}_{\nu\gamma\alpha}
    + \nabla_\gamma {R^\mu}_{\nu\alpha\beta}
    = 0 \notag
\end{align}
$$
に対して、$\mu$と$\beta$で縮約をとります。つまり$\beta = \mu$としますと、
$$
\begin{align}
    \nabla_\alpha R_{\nu\gamma}
    + \nabla_\mu {R^\mu}_{\nu\gamma\alpha}
    - \nabla_\gamma R_{\nu\alpha}
    = 0 \notag
\end{align}
$$
とリッチ（Ricci）テンソルでかける項が現れます。さらに$g^{\nu\gamma}$掛けてさらに縮約をすすめると、
$$
\begin{align}
    \nabla_\alpha R
    - \nabla^\mu R_{\mu\alpha}
    - \nabla^\nu R_{\nu\alpha}
    &= 0
    \notag \\
    \Rightarrow
    \nabla^\mu (
        R_{\mu\alpha}
        - \frac{1}{2} g_{\mu\alpha} R
    )
    &= 0
    \notag
\end{align}
$$
となり、$\nabla^\mu G_{\mu\nu} = 0$が成り立つことが示されました！
$\blacksquare$

---

## あとがき

やっぱりテンソル（の成分）の計算ってめんどくさい笑

ビアンキ恒等式の証明を忘れていたので、もう一度示すのが大変でした。
昔のノートはいったいどこに消えたのかわかりませんが、今後はこのようにしてデジタル媒体に残しておかないと、また計算しないといけない時に大変な目にあっていしまいます。

**複雑な計算は絶対わすれるので、Webに残そう！**

読んでる本：[須山輝明『重力波』(2025),SGCライブラリ](https://www.saiensu.co.jp/search/?isbn=978-4-7819-1645-3&y=2025)
