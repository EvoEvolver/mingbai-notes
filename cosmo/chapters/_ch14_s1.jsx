// §14.1 The likelihood function —— 式 (14.1)–(14.22)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";
import { WeighPlot } from "./_ch14_plots.jsx";

const R = String.raw;

export function Sec141() {
  return (
    <Sec n="14.1" title="The likelihood function" zh="似然函数"
      gist={R`用"称体重"这个最简单的例子建立整章的语言：似然 \eqref{14.2}、Bayes 定理与后验 \eqref{14.4}–\eqref{14.5}、最大似然估计量 \eqref{14.8}、\eqref{14.10}、由曲率得到的误差 \eqref{14.13}、方差估计的固有误差（宇宙方差）\eqref{14.21}，以及对冗余参数的边缘化 \eqref{14.22}。`}
      why={R`宇宙学测的大多是**涨落的方差**（功率谱），参数又多又相关。这一节里得到的每一条——$m^{-1/2}$ 律、$\sqrt{2/m}$ 律、"误差 = 曲率的倒数"、边缘化——在后面各节都会原样出现，只是 $m$ 换成 $2l+1$ 或 $m_{k,\alpha}$。`}
      gives={["14.2", "14.5", "14.8", "14.13", "14.21", "14.22"]}>
      <p className="muted">本节概念：<C id="likelihood" /> · <C id="bayes" /> · <C id="estimator" /> · <C id="cosmic_variance" /> · <C id="marginal" /></p>
      <Tx>{R`**似然：给定理论时数据的概率。**当代数据分析的基本构件是**似然函数**（likelihood function）：给定一个理论，实验得到所观测数据的概率。这个看似平淡的定义威力极大——有了似然，就能确定理论的参数及其误差。

**一台秤，100 个读数。**假设你要给某人称体重。作为科学家，你知道除了测量值还要报告不确定度，于是摆了 100 台不同的秤，记下他在每台秤上的读数。拿着这 100 个数，你该报告什么体重、什么误差？

我们的"理论"是：每个读数 = 恒定信号 $w$（真实体重）+ 噪声，噪声来自均值为零、方差为 $\sigma_w^2$ 的高斯分布。于是理论有两个自由参数 $w$ 与 $\sigma_w$。如果只读了一个数 $d$，似然——给定理论时得到 $d$ 的概率——是`}</Tx>
      <Eq n="14.1" title="单次测量的似然" say={R`单次读数服从以真实体重为中心、宽度为秤精度的高斯分布；$\sigma_w\to0$ 时它尖锐地集中在 $d=w$。`}>{R`\mathcal L(\sym{ch14-dat}{d}|w,\sigma_w) \equiv P(\sym{ch14-dat}{d}|w,\sigma_w) = \frac{1}{\sqrt{2\pi\sigma_w^2}}\exp\left\{-\frac{(\sym{ch14-dat}{d}-w)^2}{2\sigma_w^2}\right\}.`}</Eq>
      <Tx>{R`这里及以后 $P(x|y)$ 表示给定 $y$ 时 $x$ 的概率。\eqref{14.1} 只是把两条假设写成了公式：$d-w$ 完全来自噪声；噪声是标准差为 $\sigma_w$ 的高斯。因为 $m=100$ 次测量相互独立，总似然是各次似然的乘积：`}</Tx>
      <Eq n="14.2" keyEq title="m 次独立测量的似然" say={R`独立测量的概率相乘，指数里的平方残差相加：数据越多，似然作为 $w$ 的函数越尖。`}>{R`\mathcal L\left(\{d_i\}_{i=1}^m\Big|w,\sigma_w\right) = \frac{1}{(2\pi\sigma_w^2)^{m/2}}\exp\left\{-\frac{\sum_{i=1}^m(d_i-w)^2}{2\sigma_w^2}\right\}.`}</Eq>
      <Box kind="warning" title="数据是高斯的，似然未必对参数高斯">{R`\eqref{14.2} 作为 $w$ 的函数是高斯的（指数里是 $w$ 的二次式），但作为 $\sigma_w$ 的函数**不是**（$\sigma_w$ 同时出现在前因子和指数分母里）。"数据服从高斯分布"与"似然对参数是高斯的"是两回事——这一点在 \secref{14.2} 讨论宇宙学参数时会变得至关重要。`}</Box>

      <Tx>{R`**从 $P(\text{数据}|\text{理论})$ 到 $P(\text{理论}|\text{数据})$。**我们真正想知道的是参数：不是 $P(\{d_i\}|w,\sigma_w)$（我们写下的似然），而是 $P(w,\sigma_w|\{d_i\})$。从前者得到后者，要用概率论中的一条恒等式：`}</Tx>
      <Eq n="14.3" say={R`联合概率可以用两种顺序拆成"条件概率 $\times$ 边缘概率"——两种拆法必须相等。`}>{R`\begin{aligned}P(\sym{ch14-evB}{B},\sym{ch14-evA}{A}) &= P(\sym{ch14-evB}{B}|\sym{ch14-evA}{A})P(\sym{ch14-evA}{A})\\ &= P(\sym{ch14-evA}{A}|\sym{ch14-evB}{B})P(\sym{ch14-evB}{B}).\end{aligned}`}</Eq>
      <Tx>{R`这里 $A=\{d_i\}$ 是测量集合，$B=\{w,\sigma_w\}$ 是"模型参数"集合。令 \eqref{14.3} 的两行相等：`}</Tx>
      <Eq n="14.4" keyEq title="Bayes 定理" say={R`参数的后验 = 似然 $\times$ 先验 / 证据；分母与参数无关，只负责归一化。`}>{R`P(w,\sigma_w|\{d_i\}) = \frac{P(\{d_i\}|w,\sigma_w)\;P(w,\sigma_w)}{P(\{d_i\})}.`}</Eq>
      <Tx>{R`这就是 **Bayes 定理**。分母不依赖参数 $w,\sigma_w$，可以这样确定：把 $P(w,\sigma_w|\{d_i\})$ 对全部参数值积分（数据固定）必须得 1，所以分母就是分子对 $w,\sigma_w$ 的积分。常数归一化因子不改变似然峰值的位置，也不改变它的宽度——多数时候可以忽略。

要得到我们想要的 $P(w,\sigma_w|\{d_i\})$，需要两样东西：似然（分子第一项）与**先验**（prior）概率 $P(w,\sigma_w)$。如果对参数已有先验知识，就应该用在这里：`}</Tx>
      <Eq n="14.5" keyEq title="后验 $\propto$ 似然 $\times$ 先验" say={R`后验是似然与先验的乘积（差一个与参数无关的常数）：数据通过似然说话，已有知识通过先验说话。`}>{R`P(w,\sigma_w|\{d_i\}) \propto \mathcal L\left(\{d_i\}_{i=1}^m\Big|w,\sigma_w\right)P_{\rm prior}(w,\sigma_w),`}</Eq>
      <Tx>{R`比例常数与参数无关，没什么意思。得到的概率分布称为 $w,\sigma_w$ 在给定数据下的**后验**（posterior）。宇宙学家最关心的，正是暗能量物态方程、张标比这类宇宙学参数的后验。

**先验的"不确定性"。**用先验信息似乎令人不安：它像是给后验引入了任意性。如果想保守、什么都不假设，就对参数取**均匀先验**——但这并不像听起来那么无辜。如果我们把参数取为 $\sigma_w^2$ 而非 $\sigma_w$，并假设对 $\sigma_w^2$ 均匀（等宽的 $\sigma_w^2$ 区间等可能），最终后验就会不同（见下面的推导）。先验的主要目的是让我们**纳入额外信息**：比如秤的厂家告诉你 $\sigma_w$ 低于某个值，先验就能把这个信息自洽地放进来。有大量（声名狼藉的）例子表明考虑先验极其重要（\exref{14.1}）。`}</Tx>
      <Derivation title={R`"试一试"：对 $\sigma_w$ 均匀 vs 对 $\sigma_w^2$ 均匀`} collapsed steps={[
        { tex: R`P_{\rm prior}(\sigma_w)\,d\sigma_w = P_{\rm prior}(\sigma_w^2)\,d(\sigma_w^2) = P_{\rm prior}(\sigma_w^2)\,2\sigma_w\,d\sigma_w`, why: R`概率元在变量替换下守恒。` },
        { tex: R`P_{\rm prior}(\sigma_w^2)=\text{常数}\ \Rightarrow\ P_{\rm prior}(\sigma_w)\propto\sigma_w`, why: R`对 $\sigma_w^2$ 均匀，等价于对 $\sigma_w$ 有一个 $\propto\sigma_w$ 的先验——偏向大的 $\sigma_w$。` },
        { tex: R`P(\sigma_w|\{d_i\})\propto\sigma_w^{-m}e^{-S/2\sigma_w^2}\ \ \text{vs}\ \ \sigma_w^{1-m}e^{-S/2\sigma_w^2},\qquad S\equiv\sum_i(d_i-w)^2`, why: R`代入 \eqref{14.2}。` },
        { tex: R`\sigma_{w,\rm peak}^2=\frac{S}{m}\ \ \text{vs}\ \ \frac{S}{m-1}`, why: R`两种先验给出的后验峰值不同（$m$ 大时差别 $\sim1/m$，消失）。所谓"无信息"先验取决于你选哪个变量来"均匀"。` },
      ]} />

      <Tx>{R`**最大似然估计。**下面对 $w$ 与 $\sigma_w$ 都取均匀先验，于是后验与似然成正比；最佳拟合值就是 $P(w,\sigma_w|\{d_i\})$ 最大处。在这个简单例子中可以解析地对 $\mathcal L$ 求导。先对 $w$：`}</Tx>
      <Eq n="14.6" say={R`似然对 $w$ 的导数正比于残差之和：残差总和为零时导数为零。`}>{R`\frac{\partial\mathcal L}{\partial w} = \frac{\sum_{j=1}^m(d_j-w)}{\sigma_w^2(2\pi\sigma_w^2)^{m/2}}\exp\left\{-\frac{\sum_{i=1}^m(d_i-w)^2}{2\sigma_w^2}\right\}.`}</Eq>
      <Tx>{R`要使它为零，需要`}</Tx>
      <Eq n="14.7" say={R`似然极值条件：正负残差恰好抵消。`}>{R`\frac{\partial\mathcal L}{\partial w}=0\qquad\Leftrightarrow\qquad\sum_{j=1}^m(d_j-w)=0`}</Eq>
      <Tx>{R`也就是说，似然在下式处取极大：`}</Tx>
      <Eq n="14.8" keyEq title="估计量：样本均值" say={R`体重的最大似然估计就是读数的算术平均。`}>{R`w=\hat w=\frac1m\sum_{i=1}^m d_i.`}</Eq>
      <Tx>{R`这就是由数据估计体重的方法；恰如其名，$\hat w$ 称为体重的**估计量**（estimator），此处就是样本均值。在 \exref{14.2} 中你将推导每个数据点误差 $\sigma_{w,i}$ 各不相同时的最大似然值，结果是**逆方差加权**（inverse-variance weighting）。

方差 $\sigma_w^2$ 也是模型参数。给定数据，它的最可能值由`}</Tx>
      <Eq n="14.9" say={R`似然对噪声方差的导数：第一项来自归一化前因子（偏好小方差），第二项来自指数（偏好能容纳残差的大方差）。`}>{R`\frac{\partial\mathcal L}{\partial\sigma_w^2}=\mathcal L\times\left[-\frac{m}{2\sigma_w^2}+\frac{\sum_{i=1}^m(d_i-w)^2}{2\sigma_w^4}\right]`}</Eq>
      <Tx>{R`令其为零求得。解出 $\sigma_w^2$，最可能值为`}</Tx>
      <Eq n="14.10" keyEq title="估计量：方差" say={R`噪声方差的估计就是残差平方的平均（均值已知时）。`}>{R`\widehat{\sigma_w^2}=\frac1m\sum_{i=1}^m(d_i-w)^2.`}</Eq>
      <Tx>{R`这是均值 $w$ 已知时由数据估计方差的估计量。（若 $w$ 也由同一批数据估计，归一化由 $1/m$ 变为 $1/(m-1)$，即通常的样本方差。）`}</Tx>

      <Tx>{R`**误差 = 似然的宽度。**找到了估计量，它们的误差是多少？误差本质上对应似然函数的宽度。更严格地说，后验 $P(w|\{d_i\})$（似然乘先验）让我们能构造置信区间。例如，峰值两侧的两个 $w$ 值——记作 $w_-$ 与 $w_+$——若 (i) 概率相同，且 (ii) 满足`}</Tx>
      <Eq n="14.11" say={R`$1\sigma$ 置信区间：区间两端后验高度相等、区间内包含 68% 的后验概率。`}>{R`\int_{w_-}^{w_+}dw\,P(w|\{d_i\})=0.68`}</Eq>
      <Tx>{R`就定义了 $1\sigma$（68% 置信水平）误差棒：下侧 $1\sigma$ 误差是峰值与 $w_-$ 之差。0.68 来自高斯分布落在均值 $1\sigma$ 以内的概率。对 \eqref{14.2} 这种情形，这一严格定义等价于：在 $1\sigma$ 区间边界上，对数似然比最大值下降 $\Delta\ln\mathcal L=-1/2$。

在我们的例子中似然对 $w$ 是高斯的，误差对称且容易计算。把对数似然在 $w$ 的极大处展开：`}</Tx>
      <Eq n="14.12" say={R`对数似然在峰值处的 Taylor 展开：一阶项为零，二阶项的系数（曲率）是 $-m/2\sigma_w^2$。`}>{R`\begin{aligned}\ln\mathcal L(w) &= \ln\mathcal L(\hat w)+\left.\frac{\partial\ln\mathcal L}{\partial w}\right|_{w=\hat w}(w-\hat w)+\frac12\left.\frac{\partial^2\ln\mathcal L}{\partial w^2}\right|_{w=\hat w}(w-\hat w)^2\\ &= \ln\mathcal L(\hat w)-\frac{m}{2\sigma_w^2}(w-\hat w)^2,\end{aligned}`}</Eq>
      <Tx>{R`因为 $\partial\ln\mathcal L/\partial w$ 在 $\hat w$ 处为零。令它等于 $\ln\mathcal L(\hat w)-1/2$（$1\sigma$ 置信区间的条件），得到`}</Tx>
      <Eq n="14.13" keyEq title="均值的误差" say={R`平均 $m$ 次独立测量，方差缩小为 $1/m$，误差按 $1/\sqrt m$ 下降。`}>{R`\mathrm{Var}\left[\hat w\right]=\frac{\sigma_w^2}{m}.`}</Eq>
      <Tx>{R`这个方差的平方根 $\sigma_w/m^{1/2}$ 就是 $w$ 估计值的 $1\sigma$ 误差。这也很熟悉：测量越多，噪声按独立测量数的平方根被压下去。更一般地，这个推导给出一条规则：**一维高斯分布的方差，等于对数似然中二次项系数（的 2 倍）的倒数**——$\ln\mathcal L\supset-\frac12(w-\hat w)^2/\mathrm{Var}$。\secref{14.5} 的 Fisher 矩阵就是这条规则的多维推广。`}</Tx>
      <WeighPlot />

      <Tx>{R`**另一种算误差的方法：对数据求期望。**上面通过似然宽度求出了 $w$ 估计的不确定度。还有另一种办法，能推广到更复杂的问题；我们用它来求方差估计量 $\widehat{\sigma_w^2}$ 的方差。定义`}</Tx>
      <Eq n="14.14" say={R`估计量的方差：设想把实验重复无穷多次，估计值偏离真值的均方。`}>{R`\mathrm{Var}(\sigma_w^2)\equiv\left\langle\left(\widehat{\sigma_w^2}-\sigma_w^2\right)^2\right\rangle.`}</Eq>
      <Tx>{R`尖括号表示把实验做无穷多次所得的期望值。计算方法是：对所有可能的数据取值，按似然加权积分。一般地，对任何估计量 $\hat O$（即 $m$ 个测量 $\{d_i\}$ 的任意函数），`}</Tx>
      <Eq n="14.15" keyEq title="估计量的期望" say={R`期望 = 对所有可能的数据实现、按其出现概率（似然）加权平均。`}>{R`\left\langle\hat O\right\rangle=\int d(d_1)\int d(d_2)\ldots\int d(d_m)\,\hat O(\{d_i\})\mathcal L(\{d_i\}).`}</Eq>
      <Tx>{R`注意方差表达式里同时出现 $\widehat{\sigma_w^2}(\{d_i\})$ 与 $\sigma_w^2$：后者是一个**数**，刻画秤的精度的真值；前者是一个估计量，其期望等于这个数，$\langle\widehat{\sigma_w^2}\rangle=\sigma_w^2$。这使计算简化为`}</Tx>
      <Eq n="14.16" say={R`展开平方并用无偏性 $\langle\widehat{\sigma_w^2}\rangle=\sigma_w^2$：方差 = 二阶矩 − 均值平方。`}>{R`\begin{aligned}\mathrm{Var}(\widehat{\sigma_w^2}) &= \left\langle(\widehat{\sigma_w^2})^2\right\rangle-2\left\langle\widehat{\sigma_w^2}\right\rangle\sigma_w^2+\sigma_w^4\\ &= \left\langle(\widehat{\sigma_w^2})^2\right\rangle-\sigma_w^4.\end{aligned}`}</Eq>
      <Tx>{R`于是关键在于 $\langle(\widehat{\sigma_w^2})^2\rangle$。为简单起见设均值已知，把 \eqref{14.15} 中的积分变量平移 $d_i\to x_i\equiv d_i-w$，就可以当作均值为零来算：`}</Tx>
      <Eq n="14.17" say={R`估计量平方的期望是 $m^2$ 个四阶矩 $\langle x_i^2x_j^2\rangle$ 的平均。`}>{R`\left\langle(\widehat{\sigma_w^2})^2\right\rangle=\frac{1}{m^2}\sum_{ij}\left\langle x_i^2x_j^2\right\rangle.`}</Eq>
      <Tx>{R`从求和中取一个 $i\neq j$ 的项：`}</Tx>
      <Eq n="14.18" say={R`独立变量的期望因式分解：其余变量的积分都是归一化的 1，剩下两个各自的二阶矩 $\sigma_w^2$。`}>{R`\begin{aligned}\left\langle x_i^2x_j^2\right\rangle &= \left[\prod_{k\neq i,j}\int dx_k\frac{e^{-x_k^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right]\left[\int dx_i\,x_i^2\frac{e^{-x_i^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right]\left[\int dx_j\,x_j^2\frac{e^{-x_j^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right]\\ &= \left[\int dx_i\,x_i^2\frac{e^{-x_i^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right]\left[\int dx_j\,x_j^2\frac{e^{-x_j^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right]\end{aligned}`}</Eq>
      <Tx>{R`因为对 $x_k$ 的积分都等于 1。第二行中每个积分都等于 $\sigma_w^2$；\eqref{14.17} 中对 $j\neq i$ 求和给出因子 $m-1$，再对 $i$ 求和给出因子 $m$，所以`}</Tx>
      <Eq n="14.19" say={R`$m(m-1)$ 个交叉项各贡献 $\sigma_w^4$，$m$ 个对角项贡献四阶矩 $\langle x_i^4\rangle$。`}>{R`\mathrm{Var}(\widehat{\sigma_w^2})=\frac{m-1}{m}\sigma_w^4+\frac{1}{m^2}\sum_i\left\langle x_i^4\right\rangle-\sigma_w^4.`}</Eq>
      <Tx>{R`利用 \eqref{14.15} 并分部积分（或用 Wick 定理），$\langle x_i^4\rangle=3\langle x_i^2\rangle^2=3\sigma_w^4$，所以`}</Tx>
      <Derivation title={R`$\langle x^4\rangle=3\sigma_w^4$（分部积分）`} collapsed steps={[
        { tex: R`\langle x^4\rangle=\int dx\,x^3\cdot x\frac{e^{-x^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}=\int dx\,x^3\cdot\left(-\sigma_w^2\frac{d}{dx}\frac{e^{-x^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}\right)`, why: R`$x\,e^{-x^2/2\sigma^2}=-\sigma^2\frac{d}{dx}e^{-x^2/2\sigma^2}$。` },
        { tex: R`=3\sigma_w^2\int dx\,x^2\frac{e^{-x^2/2\sigma_w^2}}{\sqrt{2\pi\sigma_w^2}}=3\sigma_w^2\langle x^2\rangle=3\sigma_w^4`, why: R`分部积分，边界项为零。Wick 定理的说法：四个 $x$ 两两配对共有 3 种方式，每种贡献 $\sigma_w^4$。` },
        { tex: R`\mathrm{Var}=\frac{m-1}{m}\sigma_w^4+\frac{3m\sigma_w^4}{m^2}-\sigma_w^4=\frac{m-1+3-m}{m}\sigma_w^4=\frac2m\sigma_w^4`, why: R`代回 \eqref{14.19}。` },
      ]} />
      <Eq n="14.20" say={R`方差估计量的方差是 $2\sigma_w^4/m$：比均值估计多一个因子 2，且与方差本身的平方成正比。`}>{R`\mathrm{Var}(\widehat{\sigma_w^2})=\frac2m\sigma_w^4.`}</Eq>
      <Tx>{R`等价地，方差的不确定度为`}</Tx>
      <Eq n="14.21" keyEq title="方差估计的误差（宇宙方差原型）" say={R`用 $m$ 个样本估计方差，相对误差至少是 $\sqrt{2/m}$——与测量多么精确无关。`}>{R`\sqrt{\mathrm{Var}\left[\widehat{\sigma_w^2}\right]}=\sqrt{\frac2m}\,\sigma_w^2.`}</Eq>
      <Tx>{R`**为什么这个"冷门"结果是本章核心。**$\sigma_w$ 的误差看起来很冷门，但宇宙学里我们想测的大部分东西都类似 $\sigma_w^2$：星系密度与 CMB 温度**围绕均值的涨落**远比均值本身有意思。这些涨落来自某些（往往近似高斯的）分布，分布的参数依赖宇宙学模型，正是我们关心的。所以我们想知道 $\sigma_w^2$ 这类参数能测多准——而 \eqref{14.21} 是普适的：估计一个分布的方差时，存在一个正比于该方差、除以测量数平方根的根本不确定度，称为**样本方差**（sample variance）或**宇宙方差**（cosmic variance）。`}</Tx>
      <Box kind="physics" title="两条律，贯穿全章">{R`**均值**：$\mathrm{Var}[\hat w]=\sigma_w^2/m$。噪声可以靠多测几次压下去。

**方差**：$\mathrm{Var}[\widehat{\sigma_w^2}]/\sigma_w^4=2/m$。即使每次测量完美无噪声（这里的 $\sigma_w$ 就是"信号"本身），误差也不为零——只要样本数有限。

在 \secref{14.4} 中，CMB 的 $m\to2l+1$（每个 $l$ 的 $a_{lm}$ 个数），星系的 $m\to m_{k,\alpha}$（$k$ 区间中的 Fourier 模个数）；再加上仪器噪声，就得到 \eqref{14.48} 与 \eqref{14.59}。`}</Box>

      <Tx>{R`**冗余参数与边缘化。**实际应用中，未知参数通常不止一个。如果我们对其中一些——称为"冗余"（nuisance）参数，例如描述观测或天体物理效应的参数——不感兴趣，就应该对它们**边缘化**（marginalize），即对这些参数积分之后再使用似然。在称体重的例子里：我们想测 $w$，但不知道 $\sigma_w$。给定完整后验 $P(w,\sigma_w|\{d_i\})$，所需的**边缘后验**为`}</Tx>
      <Eq n="14.22" keyEq title="边缘化" say={R`不关心的参数要积掉，而不是固定：这样给出的 $w$ 区间正确地包含了"不知道 $\sigma_w$"带来的额外不确定性。`}>{R`P(w|\{d_i\})=\int_0^\infty d\sigma_w\,P(w,\sigma_w|\{d_i\}).`}</Eq>
      <Tx>{R`左边可以用来给出 $w$ 的置信区间，它恰当地计入了我们对 $\sigma_w$ 的无知。在上面的交互图中，蓝色虚线就是这条边缘后验（对 $\sigma_w$ 取均匀先验时它正比于 $[\sum_i(d_i-w)^2]^{-(m-1)/2}$，即 Student-$t$ 型）：$m$ 小时尾巴比已知 $\sigma_w$ 的高斯胖得多。\secref{14.5} 会看到一个更具体的例子：多参数高斯后验的边缘化误差。`}</Tx>
      <Derivation title={R`边缘后验的闭式（均匀先验）`} collapsed steps={[
        { tex: R`P(w|\{d_i\})\propto\int_0^\infty d\sigma_w\,\sigma_w^{-m}\exp\left\{-\frac{S(w)}{2\sigma_w^2}\right\},\qquad S(w)=\sum_i(d_i-w)^2`, why: R`\eqref{14.2} 乘以均匀先验，再按 \eqref{14.22} 积分。` },
        { tex: R`u=\frac{S}{2\sigma_w^2}:\quad\int_0^\infty d\sigma_w\,\sigma_w^{-m}e^{-S/2\sigma_w^2}=\tfrac12\left(\tfrac S2\right)^{-(m-1)/2}\Gamma\!\left(\tfrac{m-1}{2}\right)\propto S(w)^{-(m-1)/2}`, why: R`换元后是 $\Gamma$ 函数积分（需 $m>1$）。` },
        { tex: R`S(w)=m\left[(w-\hat w)^2+s^2\right],\quad s^2=\frac1m\sum_i(d_i-\hat w)^2\ \Rightarrow\ P(w|\{d_i\})\propto\left[1+\frac{(w-\hat w)^2}{s^2}\right]^{-(m-1)/2}`, why: R`Student-$t$ 分布（$m-2$ 个自由度）。$m\to\infty$ 时趋于宽度 $s/\sqrt m$ 的高斯。` },
      ]} />
    </Sec>);
}
