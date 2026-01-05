---
title: シュレディンガー方程式のユニタリ変換
date: '2026-01-18'
tags:
  - 量子力学
published: false
---


Schr\"{o}dinger方程式が
$$
\begin{align}
    \hat{H} \ket{\psi(t)} = i \frac{{\rm d}}{{\rm d} t}\ket{\psi(t)}
\end{align}
$$
で表される。
状態ベクトル$\ket{\psi}$が時間発展演算子$\hat{U}(t)$で$\ket{\psi} = \hat{U}(t) \ket{\psi(0)}$で表されているとすると、この時間発展演算子についても同様に
$$
\begin{align}
    \hat{H}\hat{U} = i \frac{{\rm d}}{{\rm d} t} \hat{U}
\end{align}
$$
が成り立つ。
ただし$\hat{U} = \hat{1}$で恒等演算子である。

さて状態ベクトルがあるunitary演算子$\hat{\mathcal{U}}(t)$で$\ket{\psi} \to \ket{\psi^\prime} = \mathcal{U}(t) \ket{\psi}$と変換されても、その変換後の状態とHamiltonian $\hat{H}^\prime$もまたSchr\"{o}dinger方程式を満たさなければならない。
したがって、
$$
\begin{align}
    &\hat{H}^\prime \psi^\prime 
    = i \dot\psi^\prime
    \nonumber \\
    &\Rightarrow\quad
    \hat{H}^\prime \hat{\mathcal{U}} \psi
    = i \dot{\hat{\mathcal{U}}} \psi + i \hat{\mathcal{U}} \dot{\psi}
    \nonumber \\
    &\Rightarrow\quad
    \underbrace{(\hat{\mathcal{U}}^\dag \hat{H}^\prime \hat{\mathcal{U}} - i \hat{\mathcal{U}}^\dag \dot{\hat{\mathcal{U}}})}_{= \hat{H}}\psi
    =
    i \dot{\psi}
\end{align}
$$
であるから、変換前後のHamiltonianの関係は
$$
\begin{align}
    &\hat{H} = 
    \hat{\mathcal{U}}^\dag \hat{H}^\prime \hat{\mathcal{U}} - i \hat{\mathcal{U}}^\dag \dot{\hat{\mathcal{U}}}
    \nonumber \\
    &\Rightarrow\quad
    \hat{\mathcal{U}} \hat{H} \hat{\mathcal{U}}^\dag
    + i \dot{\hat{\mathcal{U}}} \hat{\mathcal{U}}^\dag
    = \hat{H}^\prime
    \nonumber \\
    &\underbrace{\Rightarrow}_{h.c.}\quad
    \hat{\mathcal{U}} \hat{H} \hat{\mathcal{U}}^\dag
    - i \hat{\mathcal{U}} \dot{\hat{\mathcal{U}}}^\dag 
    = \hat{H}^\prime
\end{align}
$$
であることがわかった。

ところで量子力学における正凖変換はSqueezing変換に帰着でき、逆も然りであることが\cite{bib: Cervero28Jun2001}で示されている。
これを示すために、\cite{bib: Cervero28Jun2001}に則って議論を進める。
そしてこの目的を示すということは、非常にシンプルで、上記のunitary演算子$\hat{\mathcal{U}}$がいつでもSqueezing演算子のコンビネーションで書けることを示す。

時間依存のunitary変換$\hat{\mathcal{U}}_1$と$\hat{\mathcal{U}}_2$を考え、Hamiltonianを$\hat{\mathcal{U}}_1$で変換した後に今度は$\hat{\mathcal{U}}_2$で変換する。1回目に変換した後のHamiltonianを$\hat{H}_1(t)$、2回目に変換した後のHamiltonianを$\hat{H}_{12}(t) \equiv \hat{H}_0(t)$とおくと、その両方は
$$
\begin{align}
    \hat{\mathcal{U}}_1(t) \hat{H}(t) \hat{\mathcal{U}}_1^\dag(t)
    - i \hat{\mathcal{U}}_1(t) \dot{\hat{\mathcal{U}}}^\dag_1(t)
    &= \hat{H}_1(t)
    \\
    \hat{\mathcal{U}}_2(t) \hat{H}_1(t) \hat{\mathcal{U}}_2^\dag(t)
    - i \hat{\mathcal{U}}_2(t) \dot{\hat{\mathcal{U}}}^\dag_2(t)
    &= \hat{H}_{12}(t) = \hat{H}_0(t)
\end{align}
$$
を満たす。またこの２回の変換をまとめて１つの変換とみなした、すなわち$\hat{\mathcal{U}}(t) = \hat{\mathcal{U}}_2(t) \hat{\mathcal{U}}_1(t)$もまた
$$
\begin{align}
    \hat{\mathcal{U}}(t) \hat{H}(t) \hat{\mathcal{U}}^\dag(t)
    - i \hat{\mathcal{U}}(t) \dot{\hat{\mathcal{U}}}^\dag(t)
    &= \hat{H}_0(t)
\end{align}
$$
である。

よく使われる調和振動子のHamiltonianを拡張して、一般的な形の時間依存する2次のそれを
$$
\begin{align}
    \hat{H}(t)
    &= 
    \frac{1}{2m} \beta_3(t) \hat{p}^2
    + \frac{1}{2}\beta_2(t)\omega_0 (\hat{x}\hat{p} + \hat{p} \hat{x} )
    \nonumber \\
    &\quad
    + \frac{1}{2} \beta_1(t) m \omega_0^2 \hat{x}^2
\end{align}
$$
と与える。
さらにunitary変換をそれぞれ
$$
\begin{align}
    \hat{\mathcal{U}}_1(t) 
    &=
    \exp\bigg\{
    \frac{i}{4} [\ln \beta_3(t)] (\hat{x}\hat{p} + \hat{p} \hat{x})
    \bigg\}\,, \\
    \hat{\mathcal{U}}_2(t) 
    &=
    \exp\bigg\{
    \frac{im}{2}\Big(
    \omega_0 \beta_2(t)
    - \frac{\dot{\beta}_3(t)}{2 \beta_3(t)}
    \Big)\hat{x}^2
    \bigg\}
\end{align}
$$
とする。
初期のHamiltonian $\hat{H}(t)$に\eqref{eq: unitary trans 1}で\eqref{eq: app canonical trans quant 1}を施すと
$$
\begin{align}
    \hat{H}_1(t)
    &= \frac{\hat{p}^2}{2m}
    + \frac{1}{2}\bigg(\omega_0 \beta_2(t)
    - \frac{\dot{\beta}_3(t)}{2\beta_3(t)}
    \bigg)
    (\hat{x}\hat{p} + \hat{p}\hat{x})
    \nonumber \\
    &\quad
    + \frac{1}{2}m \omega_0^2 \beta_1(t) \beta_3(t) \hat{x}^2
\end{align}
$$
を得る。
続いて同じように$\hat{H}_1(t)$\eqref{eq: unitary trans 2}で\eqref{eq: app canonical trans quant 2}を施すと
$$
\begin{align}
    \hat{H}_0(t)
    &=
    \frac{\hat{p}^2}{2m}
    + \frac{1}{2}m
    \bigg\{
    \omega_0^2(\beta_1\beta_3 - \beta_2^2)
    +
    \omega_0 
    \frac{\dot{\beta}_3\beta_2 - \dot{\beta}_2 \beta_3}{\beta_3}
    +
    \frac{\ddot{\beta}_3}{2\beta_3} - \frac{3}{4}
    \frac{\dot{\beta}_3^2}{\beta_3^2}
    \bigg\}
\end{align}
$$
を得る。

CBH formulaをゴリゴリ使えば導出できる。
表記をシンプルにするために$\hat{\mathcal{U}}_1 = e^{i\hat{\mathcal{A}}}$となるような$\hat{\mathcal{A}}$を導入する。
すると$\hat{\mathcal{U}}_1 \hat{H} \hat{\mathcal{U}}_1^\dag$の第１項は
$$
\begin{align}
    e^{i\hat{\mathcal{A}}} \frac{1}{2m}\beta_3 \hat{p}^2 e^{-i\hat{\mathcal{A}}}
\end{align}
$$
である。
交換関係
$$
\begin{align}
    \bigg[i \hat{\mathcal{A}}, \frac{1}{2m}\beta_3 \hat{p}^2\bigg]
    &= \frac{i}{8m}\beta_3\ln\beta_3
    [\hat{x}\hat{p} + \hat{p}\hat{x}, \hat{p}^2]
    \nonumber \\
    &=
    - (\ln\beta_3) \frac{1}{2m}\beta_3 \hat{p}^2
\end{align}
$$
と計算できることから\eqref{eq: app u1Hu1 first term}は$\frac{1}{2m} \hat{p}^2$となる。
続いて$\hat{\mathcal{U}}_1 \hat{H} \hat{\mathcal{U}}_1^\dag$の第2項だが、これは$\hat{x}\hat{p} + \hat{p}\hat{x}$というまとまった演算子で見ればそれが交換するため計算する必要なない。
$\hat{\mathcal{U}}_1 \hat{H} \hat{\mathcal{U}}_1^\dag$の第３項も同様に計算できて、結果として$(1/2)\beta_1\beta_3 \hat{x}^2$を得る。
したがって、
$$
\begin{align}
    \hat{\mathcal{U}}_1 \hat{H} \hat{\mathcal{U}}_1^\dag
    &= 
    \frac{1}{2m} \hat{p}^2
    + \frac{1}{2} \beta_2\omega_0(\hat{x}\hat{p}+\hat{p}\hat{x})
    \nonumber \\
    &\quad
    + \frac{1}{2} \beta_1\beta_3 m \omega_0^2 \hat{x}^2
\end{align}
$$
である。
また$-i \hat{\mathcal{U}}_1 \dot{\hat{\mathcal{U}}}_1^\dag$は
$$
\begin{align}
    -i \hat{\mathcal{U}}_1 \dot{\hat{\mathcal{U}}}_1^\dag
    = - \frac{1}{4} \frac{\dot{\beta}_3}{\beta_3}
    (\hat{x}\hat{p}+\hat{p}\hat{x})
\end{align}
$$
である。こうして\eqref{eq: app Hamiltonian 1}は示せた。

さらに\eqref{eq: app Hamiltonian 1}に対して$\hat{\mathcal{U}}_2$を用いて同様の手続きを施す。
