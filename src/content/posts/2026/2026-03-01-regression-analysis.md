---
slug: 2026-03-01-regression-analysis
title: 統計学入門 第13章　最小二乗法について
date: '2026-03-01'
category: statistics-intro
tags:
  - 統計学
cover: https://hondana-image.s3.amazonaws.com/book/image/300857/035bc460-8c27-41ce-a4d2-c0e4e5c0f9da.jpg
published: true
---


## 第13章　最小二乗法について

この記事では最小二乗法についての計算をまとめます。


--- 


### 最小二乗法について

２つのデータ$X, Y$があるとき、その標本$X_i, Y_i$ ($i = 1, 2, \dots, n$)を考えます。現実の多くの例では、それぞれに関係があり、時に$X_i$が上昇すると$Y_i$も上昇する、もしくは下降するような関係があります。ここでは線形な関係で$X_i$が$Y_i$を説明することを考えいます。一般にはこの関係は非線形であるものの、変換により線形に帰着できることも多いため、線形な関係を考えることは重要です。この場合を線形回帰と言います。

線形回帰の場合、
$$
  \begin{align}
    Y_i &= \beta_1 + \beta_2 X_i + \epsilon_i
  \end{align}
$$
という関係が成り立つことを期待し、いい感じの$\beta_1, \beta_2$を求めたいです。ここで、$\epsilon_i$は誤差項です。この誤差は次の3つを満たす確率変数であるとします。
$$
  \begin{align}
    E[\epsilon_i] &= 0 \\
    V[\epsilon_i] &= \sigma^2 \\
    {\rm Cov}[\epsilon_i, \epsilon_j] &= E[\epsilon_i \epsilon_j] = 0 \quad (i \neq j)
  \end{align}
$$

いい感じの直線は、安直には誤差の総和が最小になる直線です。線形回帰の式を誤差についての指揮に書き直すと、
$$
  \begin{align}
    \epsilon_i &= Y_i - \beta_1 - \beta_2 X_i
  \end{align}
$$
であります。誤差の総和が符号によって打ち消し合わないように２乗して足しあげると、
$$
  \begin{align}
    S &= \sum \epsilon_i^2 \\
    &= \sum (Y_i - \beta_1 - \beta_2 X_i)^2
  \end{align}
$$
です。この$S$を最小にする$\beta_1, \beta_2$がいま知りたいもので、$\beta_1, \beta_2$の2次式です。明らかに下に凸なので、$\beta_1, \beta_2$によるそれぞれに偏微分の結果を0においた点が最小値となります。よって、$\beta_1, \beta_2$それぞれで偏微分をとると、
$$
  \begin{align}
    \frac{\partial S}{\partial \beta_1} 
    &= -2 \sum (Y_i - \beta_1 - \beta_2 X_i) = 0 \\
    \frac{\partial S}{\partial \beta_2} 
    &= -2 \sum (Y_i - \beta_1 - \beta_2 X_i) X_i = 0
  \end{align}
$$
を満たす$\beta_1, \beta_2$が誤差項の２乗和$S$を最小にする値となります。この式から正規方程式
$$
  \begin{align}
    n \beta_1 + (\sum X_i) \beta_2 &= \sum Y_i \\
    (\sum X_i) \beta_1 + (\sum X_i^2) \beta_2 &= \sum X_i Y_i
  \end{align}
$$
を得ることができます。これを解くと、$\bar{X}, \bar{Y}$を$X_i, Y_i$の標本平均として
$$
  \begin{align}
    \hat\beta_2 &= \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2}\\
    \hat\beta_1 &= \bar{Y} - \hat\beta_2 \bar{X}
  \end{align}
$$
となります。


### 回帰残差
実測値$Y_i$に対して回帰で得られた値$\hat{Y}_i$を引いたものを回帰残差といい
$$
  \begin{align}
    \hat{e}_i &= Y_i - \hat{Y}_i
  \end{align}
$$
と表します。回帰残差は誤差項$\epsilon_i$の推定量であり、次を満たします：
$$
  \begin{align}
    \sum \hat{e}_i &= 0 \\
    \sum \hat{e}_i X_i &= 0
  \end{align}
$$
$\hat{e}_i, X_i$をベクトルとして見た時、２つのベクトルは直交しています。これは**母集団に関わらず常に成り立ちます**。


## 計算の確認

### 正規方程式の解(12)(13)の確認

まずは標本平均の定義から
$$
  \begin{align}
    \sum X_i &= n \bar{X} \\
    \sum Y_i &= n \bar{Y}
  \end{align}
$$
が分かります。よって、正規方程式(10)(11)は
$$
  \begin{align}
    \beta_1 + \bar{X} \beta_2 &= \bar{Y} \\
    \bar{X} \beta_1 + \frac{1}{n} (\sum X_i^2) \beta_2 &= \frac{1}{n} \sum X_i Y_i
  \end{align}
$$
とできます。よって、$\beta_2$について解くと、
$$
  \begin{align}
    \beta_2 &= \frac{\dfrac{1}{n} \sum X_i Y_i - \bar{X} \bar{Y}}{\dfrac{1}{n} \sum X_i^2 - (\bar{X})^2}
  \end{align}
$$
となります。ここで
$$
  \begin{align}
    \sum (X_i - \bar{X})(Y_i - \bar{Y}) &= \sum X_i Y_i - n \bar{X} \bar{Y} \\
    \sum (X_i - \bar{X})^2 &= \sum X_i^2 - n (\bar{X})^2
  \end{align}
$$
が成り立つので、
$$
  \begin{align}
    \hat\beta_2 &= \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2}
  \end{align}
$$
となります。


### 回帰残差の成分の総和が0、直交性の確認
まずは、総和が0であることを確認します：
$$
  \begin{align}
    \sum \hat{e}_i &= \sum (Y_i - \hat{Y}_i) \notag \\
    &= \sum [ Y_i - \hat{\beta}_1 - \hat{\beta}_2  X_i ] \notag \\
    & \underbrace{=}_{(8)} 0
  \end{align}
$$
となりわかりました。最後の行は(8)を満たすような$\hat{\beta}_1, \hat{\beta}_2$がいま選ばれているからです。

次に、直交性を確認します。すると
$$
  \begin{align}
    \sum \hat{e}_i X_i &= \sum (Y_i - \hat{Y}_i) X_i \notag \\
    &= \sum (Y_i - \hat{\beta}_1 - \hat{\beta_2} X_i) X_i \notag \\
    &\underbrace{=}_{(9)} 0
  \end{align}
$$
となります。
