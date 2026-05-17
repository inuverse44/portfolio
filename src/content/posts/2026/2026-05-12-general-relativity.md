---
slug: 2026-05-12-general-relativity
title: リーマンテンソル・リッチテンソル・リーマン曲率
date: '2026-05-12'
category: general-relativity
tags:
  - general-relativity
cover: https://www.saiensu.co.jp/bookImages/2025-978-4-7819-1645-3.jpg
published: true
---


## リーマン曲率

（[[2026-05-12-general-relativity]]）では、ベクトルを閉曲線に沿って並行移動させることで、空間の曲がりぐあいを定量的に評価できそうであることを確認しました。このノートでは、空間の曲がりぐあいを表現するときによく使われる**リーマン (Riemann) テンソル、リッチ (Ricci) テンソル、リーマン曲率**を見てきましょう！

### リーマンテンソル

ある空間上の4つの点$A, B, C, D$があるとき、これにそって沿ってベクトルを並行移動させて、最初と最後のベクトル$V^\mu(A)$の状態を評価してみましょう。つまり

$$
    V^\mu(A \to B \to C) - V^\mu(A \to D \to C)
$$

です。区間$A \to B \to C$は、$V^\mu(A)$を$B$まで並行移動させて、その後に$C$まで並行移動させるという意味です。点$A$から$B$までの並行移動が
$$
    V_\parallel^\mu(B)
    = V^\mu(A)
    + {\Gamma^\mu}_{\alpha\beta}(A) V^\mu(A)
    \left.
        \frac{\partial x^\beta}{\partial u}
    \right|_A
$$
と表現されます（[[2026-05-12-general-relativity]]）。さらに、これを並行移動するので、
$$
    V_\parallel^\mu(B \to C)
    = V_\parallel^\mu(B)
    + {\Gamma^\mu}_{\alpha\beta}(B)
    V_\parallel^\alpha(B)
    \left.
        \frac{\partial x^\beta}{\partial v}
    \right|_B \Delta v
$$
とできます。

上記の計算を実行する前に、準備として、点$B$でのChristoffel記号の値と$(\partial x^\beta/\partial v)|_B$を計算しておきましょう。Christoffel記号を点$A$のまわりで展開して、
$$
    {\Gamma^\mu}_{\alpha\beta}(B)
    = {\Gamma^\mu}_{\alpha\beta}(A)
    + \partial_\gamma {\Gamma^\mu}_{\alpha\beta}(A)
    \left.\frac{\partial x^\gamma}{\partial u}\right|_{A}
    \Delta u
$$
です。また$(\partial x^\beta/\partial v)|_B$も同様にして、
$$
    \left.\frac{\partial x^\beta}{\partial v}\right|_B
    = \left.\frac{\partial x^\beta}{\partial v}\right|_A
    + \left.\frac{\partial^2 x^\beta}{\partial u \partial v}\right|_A \Delta u
$$
と展開できます。

したがって、$V^\mu_\parallel(B \to C)$は（以降、点$A$での引数は省略しています）
$$
\begin{align}
    V^\mu_\parallel(B \to C)
    &= V^\mu(B)
    - {\Gamma^\mu}_{\alpha\beta}(B) V_\parallel^\alpha(B)
    \left.
        \frac{\partial x}{\partial v}
    \right|_{B} \Delta v \notag
    \\
    &= \left(
        V^\mu - {\Gamma^\mu}_{\rho\sigma} V^\rho
        \frac{\partial x^\sigma}{\partial u} \Delta u
    \right)
    - \left(
        {\Gamma^\mu}_{\alpha\beta}
        + \partial_\gamma {\Gamma^\mu}_{\alpha\beta}
        \frac{\partial x^\gamma}{\partial u} \Delta u
    \right) \notag \\
    &\qquad \times
    \left(
        V^\alpha - {\Gamma^\alpha}_{\lambda\kappa} V^\lambda
        \frac{\partial x^\kappa}{\partial u} \Delta u
    \right)\left(
        \frac{\partial x^\beta}{\partial v}
        + \frac{\partial^2 x^\beta}{\partial u \partial v}
        \Delta u
    \right) \Delta v \\
    &= V^\mu - {\Gamma^\mu}_{\rho\sigma} V^\rho
    \frac{}{}
\end{align}
$$
