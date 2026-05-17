---
slug: 2026-05-10-category-theory
title: 関手は同型を保つ 
date: '2026-05-10'
category: category-theory
tags:
  - category-theory
  - mathematics
cover: 
published: true
---


## 関手は同型を保つ

関手が同型を保つとは、次を意味します：

２つの圏$\mathscr{A}, \mathscr{B}$があって、関手$F: \mathscr{A} \to \mathscr{B}$があるとき、対象$A, A^\prime \in \mathscr{A}$とすると、$\mathcal{A} \cong \mathcal{A}^\prime \implies F(A) \cong F(A^\prime)$が成り立ちます。

### 証明

$A, A^\prime$が同型であるので、同型射$f, g$が存在します。それぞれ、$f: A \to A^\prime, g: A^\prime \to A$であり、同型射の定義から$gf = \mathbf{1}_A, fg = \mathbf{1}_{A^\prime}$を満たします。

関手$F$によって写される射$F(f), F(g)$もまた同型射であるかどうかを確認しましょう。つまり、$F(g)F(f) = \mathbf{1}_{F(A)}, F(f)F(g) = \mathbf{1}_{F(A^\prime)}$であることを確認すればいいのです。

関手の定義から、関手もまた結合律・単位律を保ちます：
$$
\begin{align}
  F(gf) &= F(g)F(f) = F(\mathbf{1}_A) = \mathbf{1}_{F(A)}\\
  F(fg) &= F(f)F(g) = F(\mathbf{1}_{A^\prime}) = \mathbf{1}_{F(A^\prime)}
\end{align}
$$
となります。したがって、$F(A) \cong F(A)^\prime$です。$\blacksquare$

### イメージ

- 対象が同型である　→ 対象が同型射を持つ
- 同型射を持つ　→ 互いを指し示す射が存在する

関手は圏の構造を保つように定義されているので、同型という情報が関手で写された後の圏にも伝播したというイメージ。

![isomorphic](/images/posts/2026-05-10-category-theory/isomorphic.png)
