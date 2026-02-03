---
title: 正準変換のメモ
date: '2026-01-05'
tags:
  - 解析力学
  - 正準変換
  - メモ
cover: 
published: true
---

過去のノートにあった正準変換のメモです。

--- 

$s$自由度における質点系の作用は
$$
\begin{align}
    S = \int {\rm d} t \, L(q, \dot{q}, t)
\end{align}
$$
で表されており、一般化座標$q$と一般化速度$\dot{q}$はそれぞれ
$$
\begin{align}
    q &= \{q_1, \ldots, q_s\}\,, \\
    \dot{q} &= \{
    \dot{q}_1, \ldots, \dot{q}_s
    \}
\end{align}
$$
を省略して書いている。これに正凖共役な運動量$p_i$を
$$
\begin{align}
    p_i = \frac{\partial L}{\partial \dot{q}_i}
\end{align}
$$
としてLegendre変換したものを$H$とおく：
$$
\begin{align}
    H(q, p, t)
    = \sum_i^s p_i \dot{q}_i - L(q, \dot{q}, t)
\end{align}
$$
これはHamiltonianと呼ばれる量であり、系の全エネルギーに対応する。

正凖変換は正凖変数$(p, q)$から新しい正凖変数$(P, Q)$へ移る変換である。ただし、どんな変換でも許されるわけではなく、それぞれの正準変数における変分が同じように停留しなければならない。
よって、新しいHamiltonianを$K(Q, P, t)$と表しておくと、
$$
\begin{align}
    &\delta \int {\rm d} t \, \bigg(
    \sum_i^s p_i \dot{q}_i - H(q, p, t)
    \bigg)
    = 0\, \\
    &\delta \int {\rm d} t \, \bigg(
    \sum_i^s P_i \dot{Q}_i - K(Q, P, t)
    \bigg)
    = 0\,
\end{align}
$$
を保つ変換が正凖変換である。そして被積分関数のなかに時間に関する全微分の項まで含めても物理的意味は変わらないので、上記の条件はより簡単に、
$$
\begin{align}
    \sum_i^s p_i \dot{q}_i - H(q, p, t)
    = \sum_i^s P_i \dot{Q}_i - K(Q, P, t) 
    + \frac{{\rm d} G}{{\rm d}t}
\end{align}
$$
とかける。
いま正凖変換は一見$4s$個あるが、一般に、古い変数$q= (q_1, \ldots, q_s),\, p= (p_1, \ldots, p_s)$と新しい変数$Q= (Q_1, \ldots, Q_s),\, P= (P_1, \ldots, P_s)$は$2s$個の式
$$
\begin{align}
    Q = Q(q, p, t)\,,
    \quad
    P = P(q, p, t)
\end{align}
$$
で関係付けられるので、$2s$個の自由度が残る。
そのため(8)の引数は古い変数の$q, p$のどちらかと、新しい変数の$Q, P$のどちらかを含んでいなければならない。
すると、関数$G$の候補は
$$
\begin{align}
    \begin{aligned}
    &G_1(q, Q, t)\,,\quad
    G_2(q, P, t)\,, \\
    &G_3(p, Q, t)\,, \quad
    G_4(p, P, t)\,,
    \end{aligned}
\end{align}
$$
に絞られる。
この関数を変換に対する母関数(generator)という。

$G_1$による変換を考える。
つまり、$q$と$Q$は独立変数である。
この関数の全微分は
$$
\begin{align}
    \frac{{\rm d} G_1(q, Q, t)}{{\rm d}t}
    =
    \sum_i^s 
    \bigg(
    \frac{\partial G}{\partial q_i} \dot{q}_i 
    + \frac{\partial G_1}{\partial P_i} \dot{Q}_i
    \bigg)
    + \frac{\partial G_1}{\partial t}
\end{align}
$$
であるから、$(8)$に代入し、項をすべて左辺に移項すると
$$
\begin{align}
    &\sum_i^s p_i \dot{q}_i - H(q, p, t)
    - \sum_i^s P_i \dot{Q}_i + K(Q, P, t) 
    \nonumber \\
    &\quad
    - \sum_i^s 
    \bigg(
    \frac{\partial G_1}{\partial q_i} \dot{q}_i 
    + \frac{\partial G_1}{\partial Q_i} \dot{Q}_i
    \bigg)
    - \frac{\partial G_1}{\partial t}
    =0
\end{align}
$$
となる。
よって独立変数でくくると、その式恒等的にゼロになるためには
$$
\begin{align}
    p_i &= \frac{\partial G_1}{\partial q_i}\,, 
    \\
    P_i &= -\frac{\partial G_1}{\partial Q_i}\,, 
    \\
    K(Q, P, t) &=
    H(q, p, t) + \frac{\partial G_1}{\partial t}
\end{align}
$$
であればよい。

次に$G_2$による変換を考える。
これは独立変数の一組み$Q$が$P$に変わっている。
ここで\eqref{eq: G1 P Q}を見ると、$P$と$Q$はLegendre変換で結びついてるような示唆をしているようにみえる。
そこで
$$
\begin{align}
    G_2(q, P, t) = G_1(q, Q, t) + \sum_i^s P_i Q_i
\end{align}
$$
のように置けば、この関数の全微分は
$$
\begin{align}
    \frac{{\rm d}G_2(q, P, t)}{{\rm d}t}
    &= \frac{{\rm d}G_1(q, Q, t)}{{\rm d}t}
    + \sum_i^s (\dot{P}_i Q_i + P_i \dot{Q}_i)
\end{align}
$$
として与えられる。
これを$\frac{{\rm d}G_1}{{\rm d}t}$を選んだ$(8)$に代入してみると、
$$
\begin{align}
    \sum_i^s p_i \dot{q}_i - H(q, p, t)
    &= 
    \cancel{\sum_i^s P_i \dot{Q}_i} - K(Q, P, t) 
    + \frac{{\rm d}G_2}{{\rm d}t} 
    \nonumber \\
    &\quad
    - \sum_i^s \dot{P}_i Q_i
    - \cancel{\sum^s_i P_i \dot{Q}_i}
    \nonumber \\
    &= 
    - \sum_i^s \dot{P}_i Q_i
    - K(Q, P, t) + \frac{{\rm d}G_2}{{\rm d}t}
\end{align}
$$
とできるの。
また
$$
\begin{align}
    \frac{{\rm d}G_2(q, P, t)}{{\rm d}t}
    = \sum_i^s\bigg(
    \frac{\partial G_2}{\partial q_i}\dot{q}_i + \frac{\partial G_2}{\partial P_i} \dot{P}_i
    \bigg)
    + \frac{\partial G_2}{\partial t}
\end{align} 
$$
である。よって
$$
\begin{align}
    &\sum_i^s p_i \dot{q}_i
    - H(q, p, t)
    + \sum^s_i \dot{P}_i Q_i
    + K(Q, P, t)
    \nonumber \\
    &
    -\sum_i^s\bigg(
    \frac{\partial G_2}{\partial q_i}\dot{q}_i + \frac{\partial G_2}{\partial P_i} \dot{P}_i
    \bigg)
    - \frac{\partial G_2}{\partial t}
    =0
\end{align}
$$
を満たす必要がある。
いま独立変数が$(q, P)$であることを思い出すと、これが恒等的に成り立つためには
$$
\begin{align}
    \begin{aligned}
        p_i &= \frac{\partial G_2}{\partial q_i}\,, \\
        Q_i &= \frac{\partial G_2}{\partial P_i}\,, \\
        K(Q, P, t)
        &= H(q, p, t) + \frac{\partial G_2}{\partial t}
    \end{aligned}
\end{align}
$$
を満たさなければならない。
