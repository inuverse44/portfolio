---
title: ピアソン積率相関係数について
date: '2026-01-03'
tags:
  - 統計学
  - ピアソン積率相関係数
published: true
---

## ピアソン積率相関係数について

### 定義
データが${\cal D} = \{ (x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n) \}$で与えられた場合、変数$x$と$y$の相関係数は
$$
\begin{align}
  r_{xy}
  &= \frac{
        \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y}) / n
      }{
        \sqrt{
          \sum_{i=1}^n (x_i - \bar{x})^2 / n
          \sum_{i=1}^n (y_i - \bar{y})^2 / n
        }
      }
  \\
  &= \frac{
      \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})
    }{
      \sqrt{
        \sum_{i=1}^n (x_i - \bar{x})^2 \sum_{i=1}^n (y_i - \bar{y})^2
      }
    }
\end{align}
$$
と定義されます。ここで、共分散は
$$
\begin{align}
  C_{xy}
  &= \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{n}
\end{align}
$$
であり、標準偏差が
$$
\begin{align}
  S_x
  &= \sqrt{\frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n}}
\end{align}
$$
です。なので、ピアソン積率相関係数は
$$
\begin{align}
  r_{xy}
  &= \frac{C_{xy}}{S_x S_y}
\end{align}
$$
のように簡単に表すことができます。

### 標準化の観点からみた相関係数

次のように、データ$x_i$をその平均値$\bar{x}$と標準偏差$S_x$を使って線形変換することを、**標準化**するといういいます。具体的には
$$
\begin{align}
  z_i
  &= \frac{x_i - \bar{x}}{S_x}
\end{align}
$$
と表すことができます。このように変換する動機は、新しく得られたデータ$z_i$の平均が0にシフトし、標準偏差が$1$になるためです。

さて、$x_i, y_i$の標準化をそれぞれ$z_i, w_i$とすると、ピアソン積率相関係数は
$$
\begin{align}
  r_{xy}
  &= 
  \frac{
    \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y}) / n
  }{
    S_x S_y
  } \notag \\
  &= \frac{1}{n}
  \sum_{i=1}^n z_i w_i
\end{align}
$$
のように表されます。つまり、ピアソン積率相関係数とは**標準化されたデータの共分散に等しい**ことがわかります。

### とりうる範囲
ピアソン積率相関係数$r_{xy}$はとりうる範囲は$-1 \leq r_{xy} \leq 1$です。これは次のように示されます。

\[*proof*\]
$$
\begin{align}
  \frac{1}{n} \sum_{i=1}^n (z_i \pm w_i)^2
  &= \frac{1}{n} \sum_{i=1}^n (z_i^2 \pm 2 z_i w_i + w_i^2) \notag \\
  &= \frac{1}{n} \sum_{i=1}^n z_i^2 \pm \frac{2}{n} \sum_{i=1}^n z_i w_i + \frac{1}{n} \sum_{i=1}^n w_i^2 \notag \\
  &= 1 \pm r_{xy} + 1 \notag \\
  &= 2(1 \pm r_{xy})
\end{align}
$$
左辺は常に正であるため、右辺も常に正です。なので$-1 \leq r_{xy} \leq 1$が成り立つことがわかりました。$\Box$

### 線形変換の不変性

$x^\prime = ax + b$と$y^\prime = cy + d$とデータ$x, y$にそれぞれ線形変換を施すと、ピアソン積率相関係数は

$$
\begin{align}
  r_{x^\prime y^\prime}
  &= \frac{C_{x^\prime y^\prime}}{S_{x^\prime} S_{y^\prime}} \notag \\
  &= \frac{
      \frac{ac}{n} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})
    }{
      |a| |c| S_x S_y
    } \notag \\
  &= \frac{ac}{|a| |c|} r_{xy}
\end{align}
$$

となるので、$ac > 1$のとき、データの線形変換の下でピアソン積率相関係数は不変です。


## 参考文献

- [統計学入門　東京大学教養学部統計学教室編 東京大学出版会](https://www.utp.or.jp/book/b300857.html)