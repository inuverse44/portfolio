---
slug: 2026-05-09-gr
title: 測地線方程式の導出 
date: '2026-05-09'
category: general-relativity
tags:
  - general-relativity
cover: https://www.saiensu.co.jp/bookImages/2025-978-4-7819-1645-3.jpg
published: true
---


## 測地線方程式

求める式は、
$$
  \frac{{\rm d}^2 x^\mu}{{\rm d}\tau^2}
  + {\Gamma^\mu}_{\alpha\beta}
  \frac{{\rm d}x^\alpha}{{\rm d}\tau}
  \frac{{\rm d}x^\beta}{{\rm d}\tau}
  = 0
$$
で、ここで
$$
  {\Gamma^\mu}_{\alpha\beta}
  = \frac{1}{2}
  g^{\mu\lambda}
  (
    g_{\lambda\alpha,\beta}
    + g_{\lambda\beta,\alpha}
    - g_{\alpha\beta,\lambda}
  )
$$
です。この${\Gamma^\mu}_{\alpha\beta}$をChrstoffel記号といいます。

---

### 質点の作用

質点の作用は
$$
  S[x^\mu]
  = -m \int {\rm d} \lambda  
  \sqrt{
    - g_{\mu\nu} 
    \frac{{\rm d} x^\mu}{{\rm d}\lambda}
    \frac{{\rm d} x^\nu}{{\rm d}\lambda}
  }
$$
と表されます。ここで $m$ は質点の質量、$\lambda$ は経路を指定する**任意のパラメータ**です（$\dot{x}^\mu \equiv {\rm d}x^\mu/{\rm d}\lambda$）。作用の値は経路に沿った固有時の長さそのものです。

固有時 $\tau$ は線素 ${\rm d}s$ を用いて
$$
  {\rm d}\tau^2 
  = - {\rm d}s^2
  = - g_{\mu\nu} {\rm d}x^\mu {\rm d}x^\nu
$$
で定義されます。$\lambda = \tau$ と選べば $\sqrt{-\dot{x}^2} = 1$ が成立しますが、これは変分を実行した**後に**行う操作です。ここで、$g_{\mu\nu}$は計量テンソルの成分です。

### 変分をとる

通常、Euler-Lagrange方程式を得るには、
$$
  \frac{{\rm d}}{{\rm d}t}
  \left(
    \frac{\partial L}{\partial \dot{q}^s}
  \right)
  - \frac{\partial L}{\partial q^s} = 0
$$
について、$L$を具体的に指定して計算すればいいです。

しかし、一般相対性理論の計算においては、表面項をテクニカルに計算することがあるので、変分の定義を愚直に計算するほうが、見通しがいい場合があります。今回は愚直に変分を実行します。

加速度系の座標$x^\mu$の変分$\delta x^\mu$を考慮すると、$\delta S[x^\mu] = S[x^\mu + \delta x^\mu] - S[x^\mu]$は
$$
\begin{align}
  \delta S[x^\mu]
  &= -m \int {\rm d} \lambda
  [
    -g_{\mu\nu}(x + \delta x)
    (x^\mu + \delta x^\mu)^\cdot
    (x^\nu + \delta x^\nu)^\cdot
  ]^{1/2}
  - S[x^\mu] \notag \\
  &= -m \int {\rm d} \lambda
  [
    -
    (g_{\mu\nu} + g_{\mu\nu, \alpha} \delta x^\alpha)
    (\dot{x}^\mu \dot{x}^\nu + 2\dot{x}^\mu \delta \dot{x}^\nu)
    + {\cal O}(\delta x^2)
  ]^{1/2} - S[x^\mu] \notag \\
  &= -m \int {\rm d} \lambda
  [
    - g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu
    - 2 g_{\mu\nu} \dot{x}^\mu \delta \dot{x}^\nu
    - g_{\mu\nu, \alpha} \dot{x}^\mu \dot{x}^\nu \delta x^\alpha
    + {\cal O}(\delta x^2)
  ]^{1/2}
  - S[x^\mu] \notag \\
  &= -m \int {\rm d} \lambda\,
  \sqrt{- \dot{x}^2}
  \left[
    1
    -
    \frac{
      2 g_{\mu\nu} \dot{x}^\mu \delta \dot{x}^\nu
      + g_{\mu\nu, \alpha} \dot{x}^\mu \dot{x}^\nu \delta x^\alpha
    }{
      - \dot{x}^2
    }
    + {\cal O}(\delta x^2)
  \right]^{1/2}
  - S[x^\mu] \notag \\
  &= \frac{m}{2} \int {\rm d} \lambda\,
  \frac{
    2 g_{\mu\nu} \dot{x}^\mu \delta \dot{x}^\nu
    + g_{\mu\nu, \alpha} \dot{x}^\mu \dot{x}^\nu \delta x^\alpha
  }{
    \sqrt{- \dot{x}^2}
  }
  + \mathcal{O}(\delta x^2)
\end{align}
$$
以降、$\delta x$の2次の項は無視します。また、簡単な記法のために、任意の４元ベクトルの成分$A^\mu$に対して、$g_{\mu\nu} A^\mu A^\nu = A^2$と表記しています。

### $\lambda$の選択

$\lambda$ として固有時 $\tau$ を選べます。すなわち $g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu = -1$、つまり $\sqrt{-\dot{x}^2} = 1$ とおきます（以降 $\dot{x}^\mu \equiv {\rm d}x^\mu/{\rm d}\tau$）。これを代入すると、

$$
  \delta S = m \int {\rm d}\tau
  \left(
    g_{\mu\nu} \dot{x}^\mu \delta\dot{x}^\nu
    + \frac{1}{2} g_{\mu\nu,\alpha} \dot{x}^\mu \dot{x}^\nu \delta x^\alpha
  \right)
$$

### 部分積分

第1項について、$\delta\dot{x}^\nu = \frac{\rm d}{{\rm d}\tau}\delta x^\nu$として部分積分を行います。端点では$\delta x^\nu = 0$なので表面項は消え、

$$
  \int {\rm d}\tau\, g_{\mu\nu}\dot{x}^\mu \delta\dot{x}^\nu
  = - \int {\rm d}\tau\, \frac{\rm d}{{\rm d}\tau}(g_{\mu\nu}\dot{x}^\mu)\, \delta x^\nu
$$

となります。ここで、

$$
  \frac{\rm d}{{\rm d}\tau}(g_{\mu\nu}\dot{x}^\mu)
  = g_{\mu\nu,\alpha}\dot{x}^\alpha \dot{x}^\mu + g_{\mu\nu}\ddot{x}^\mu
$$

です。第2項のダミー添字を$(\mu,\nu,\alpha) \to (\mu,\alpha,\nu)$と付け替えると、

$$
  \delta S = m \int {\rm d}\tau
  \left[
    - g_{\mu\nu}\ddot{x}^\mu
    - g_{\mu\nu,\alpha}\dot{x}^\alpha \dot{x}^\mu
    + \frac{1}{2} g_{\mu\alpha,\nu} \dot{x}^\mu \dot{x}^\alpha
  \right] \delta x^\nu
$$

### 対称化

$\dot{x}^\mu\dot{x}^\alpha$は$\mu \leftrightarrow \alpha$について対称なので、

$$
  g_{\mu\nu,\alpha}\dot{x}^\alpha\dot{x}^\mu
  = \frac{1}{2}(g_{\mu\nu,\alpha} + g_{\alpha\nu,\mu})\dot{x}^\mu\dot{x}^\alpha
$$

と書き直せます。代入して整理すると、

$$
  \delta S = m \int {\rm d}\tau
  \left[
    - g_{\mu\nu}\ddot{x}^\mu
    - \frac{1}{2}(g_{\mu\nu,\alpha} + g_{\alpha\nu,\mu} - g_{\mu\alpha,\nu})
    \dot{x}^\mu\dot{x}^\alpha
  \right] \delta x^\nu
  = 0
$$

$\delta x^\nu$は任意なので、

$$
  g_{\mu\nu}\ddot{x}^\mu
  + \frac{1}{2}(g_{\mu\nu,\alpha} + g_{\alpha\nu,\mu} - g_{\mu\alpha,\nu})
  \dot{x}^\mu\dot{x}^\alpha
  = 0
$$

### 計量をかける

両辺に$g^{\nu\lambda}$をかけ、$g^{\nu\lambda}g_{\mu\nu} = \delta^\lambda_\mu$を使うと、

$$
  \ddot{x}^\lambda
  + \underbrace{
    \frac{1}{2}g^{\nu\lambda}
    (g_{\mu\nu,\alpha} + g_{\alpha\nu,\mu} - g_{\mu\alpha,\nu})
  }_{= {\Gamma^\lambda}_{\mu\alpha}}
  \dot{x}^\mu\dot{x}^\alpha
  = 0
$$

括弧内の$\frac{1}{2}g^{\nu\lambda}(\cdots)$はChristoffel記号${\Gamma^\lambda}_{\mu\alpha}$そのものです。よって、

$$
  \ddot{x}^\lambda + {\Gamma^\lambda}_{\mu\alpha}\dot{x}^\mu\dot{x}^\alpha = 0
$$

これが測地線方程式となります。$\blacksquare$
