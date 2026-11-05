// §14.5 The Fisher matrix —— 式 (14.63)–(14.71)，图 14.4；§14.6 Sampling —— 式 (14.72)–(14.76)，图 14.5；§14.7 Summary
import { Sec, Tx, Eq, FormulaMap, Box, Derivation, Figure, C } from "@kit";
import { FM_14_66 } from "./_ch14_fmaps.jsx";
import { FisherEllipse, MCMCDemo } from "./_ch14_plots.jsx";

const R = String.raw;
const VarC = R`\mathrm{Var}\left[\hat C(l)\right]`;

export function Sec145() {
  return (
    <Sec n="14.5" title="The Fisher matrix" zh="Fisher 矩阵"
      gist={R`拿到数据之前预言误差：把 $\chi^2$ 在真值处展开 \eqref{14.64}，曲率 \eqref{14.65} 的系综平均就是 Fisher 信息 \eqref{14.67}；推广到多参数为 Fisher 矩阵 \eqref{14.68}，一般似然形式 \eqref{14.69}。单参数误差 $1/\sqrt F$；多参数时，积掉其余参数后的边缘化误差为 $\sqrt{(F^{-1})_{11}}$ \eqref{14.71}，大于条件误差 $1/\sqrt{F_{11}}$（图 14.4）。`}
      why={R`完整分析链依赖数据集的大量细节；但"这个实验能把参数测多准？"可以只用理论导数与实验规格回答——这让 Fisher 矩阵成为实验设计与理论家判断"信号能否被探测"的标准工具。`}
      gives={["14.63", "14.64", "14.67", "14.68", "14.69", "14.71"]}>
      <p className="muted">本节概念：<C id="fisher" /> · <C id="marginal" /></p>
      <Tx>{R`**预测（forecasting）。**前几节看到，由数据得到宇宙学约束是一个多步过程，极度依赖所考虑数据集的性质。不过有一个简单得多的问题，甚至在拿到数据之前就能回答：我们预期某个实验能把宇宙学参数测到多准？这种工作称为**预测**。为此只需要似然的曲率矩阵——**Fisher 矩阵**，它量化了一个实验能提供的关于一组参数的信息量。而且它可以用前几节的结果直接算出，无需处理真实数据集。因此 Fisher 矩阵也成为理论家的有用工具，用来判断自己预言的新信号能否在实验中被探测到。

以一个 CMB 实验为例。从以下几样出发：
（i）要预测误差的宇宙学参数集合 $\{\lambda_\alpha\}$，以及假定描述真实宇宙的基准值 $\{\bar\lambda_\alpha\}$；
（ii）作为宇宙学参数函数的理论预言 $C^{\rm theory}(l|\lambda_\alpha)$；
（iii）给定实验中 $C(l)$ 的预期不确定度 $${VarC}$。

该实验观测到的 $\hat C(l)$ 会在误差范围内接近真实的 $C^{\rm theory}(l)$；事实上，若构造`}</Tx>
      <Eq n="14.63" say={R`对角协方差下的 $\chi^2$：各 $l$ 上观测与理论之差按方差归一后的平方和。`}>{R`\chi^2(\{\lambda_\alpha\}) = \sum_l\frac{[\hat C(l)-C^{\rm theory}(l,\{\lambda_\alpha\})]^2}{${VarC}},`}</Eq>
      <Tx>{R`（这里为简单起见假设协方差对角），我们预期 $\chi^2$ 在参数空间中 $\{\lambda_\alpha\}=\{\bar\lambda_\alpha\}$ 处——假定描述真实宇宙的参数值——取极小。当然，我们并不知道真实宇宙的这些值；但即使没有这个信息，也可以问：当某个参数 $\lambda_1$ 离开 $\bar\lambda_1$ 时，$\chi^2(\{\lambda_\alpha\})$ 变化得多快？若增加得很快，该参数的误差就很小；若 $\chi^2$ 变化很小，$\lambda_1$ 的误差就很大。

**在极小处展开。**为了量化这一点，把 $\chi^2$ 在其极小值 $\bar\lambda_\alpha$ 附近展开。先做单参数的情形，推广到多参数是直接的。单参数时`}</Tx>
      <Eq n="14.64" say={R`$\chi^2$ 在真值附近是一条抛物线；其开口大小 $\mathcal F$ 决定了误差。`}>{R`\chi^2(\lambda)=\chi^2(\bar\lambda)+\mathcal F(\lambda-\bar\lambda)^2.`}</Eq>
      <Tx>{R`\eqref{14.64} 中没有线性项，因为 $\chi^2$ 在 $\bar\lambda$ 处取极小。二次项的系数为`}</Tx>
      <Eq n="14.65" say={R`曲率：$\chi^2$ 二阶导数的一半。`}>{R`\mathcal F\equiv\frac12\frac{\partial^2\chi^2}{\partial\lambda^2}.`}</Eq>
      <Tx>{R`这里的曲率 $\mathcal F$ 衡量 $\chi^2$ 离开极小值时变化得多快。曲率小，似然变化慢，数据约束力弱，参数不确定度大；反之，曲率大意味着不确定度小。由于假设 $\hat C(l)$ 的似然是高斯的，$\ln\mathcal L=-\chi^2/2$，所以 $\mathcal F$ 是 \eqref{14.12} 中我们对 $\hat w$ 误差估计的推广：$\ln\mathcal L\supset-\frac{\mathcal F}{2}(\lambda-\bar\lambda)^2$。因此 $\lambda$ 的 $1\sigma$ 误差就是 $1/\sqrt{\mathcal F}$。

$\chi^2$ 的二阶导数包含两项：`}</Tx>
      <FormulaMap n="14.66" say={R`曲率 = 理论对参数的灵敏度平方（确定项）+ 残差 $\times$ 理论的二阶导（随实现涨落的项）。`} tree={FM_14_66} start="sens" />
      <Tx>{R`这里与本章其余地方一样，假设 $\hat C(l)$ 的协方差与 $\lambda$ 无关。

**取期望。**我们关心的是 $\lambda$ 的**预期**不确定度——给定实验重复多次会得到什么。所以应取 $\mathcal F$ 的**期望值**，这带来进一步的简化：在期望下，$\hat C(l)-C^{\rm theory}(l,\bar\lambda)$——它在任何单次实现中都因噪声与宇宙方差而非零——在真参数值 $\bar\lambda$ 处按定义为零（注意这里唯一的随机变量是 $\hat C(l)$）。于是期望下只剩第一项：`}</Tx>
      <Eq n="14.67" keyEq title="Fisher 信息" say={R`Fisher 信息只含理论量：理论对参数的灵敏度平方，按每个 $l$ 的测量方差加权求和。`}>{R`F\equiv\langle\mathcal F\rangle=\sum_l\frac{1}{${VarC}}\left[\frac{\partial C^{\rm theory}(l,\bar\lambda)}{\partial\bar\lambda}\right]^2`}</Eq>
      <Tx>{R`注意它现在只含"理论"量：数据向量不出现。似然在极大处（即在真值或基准参数值处）曲率的这个系综平均称为 **Fisher 信息** $F$。推广到多参数，称为 Fisher 信息矩阵，简称 **Fisher 矩阵**：`}</Tx>
      <Eq n="14.68" keyEq title="Fisher 矩阵" say={R`两个参数的 Fisher 矩阵元：两条理论导数在每个 $l$ 上的"内积"，按逆方差加权——导数方向越相似，两参数越简并。`}>{R`F_{\alpha\beta}=\sum_l\frac{1}{${VarC}}\frac{\partial C^{\rm theory}(l,\{\bar\lambda_\gamma\})}{\partial\bar\lambda_\alpha}\frac{\partial C^{\rm theory}(l,\{\bar\lambda_\gamma\})}{\partial\bar\lambda_\beta}.`}</Eq>
      <Tx>{R`要预言参数能测多准，只需要知道实验的规格（以确定 $\mathrm{Var}[\hat C(l)]$）以及 $C^{\rm theory}(l,\{\bar\lambda_\alpha\})$ 在假定真值附近的导数（通常用有限差分数值计算）。\eqref{14.68} 假设了高斯似然以及对角、与 $\{\lambda_\alpha\}$ 无关的协方差。对**任意**形状的似然，推广为`}</Tx>
      <Eq n="14.69" keyEq title="Fisher 矩阵（一般定义）" say={R`对任意似然：Fisher 矩阵 = 对数似然 Hessian 在真值处的期望（取负号）。`}>{R`F_{\alpha\beta}\equiv-\left.\left\langle\frac{\partial^2\ln\mathcal L}{\partial\lambda_\alpha\partial\lambda_\beta}\right\rangle\right|_{\{\lambda_\gamma\}=\{\bar\lambda_\gamma\}}.`}</Eq>
      <Derivation title={R`验证：高斯似然 \eqref{14.23} + 对角协方差时 \eqref{14.69} 化为 \eqref{14.68}`} collapsed steps={[
        { tex: R`-\ln\mathcal L=\frac12\sum_l\frac{(\hat C_l-C_l(\lambda))^2}{V_l}\ \Rightarrow\ -\frac{\partial^2\ln\mathcal L}{\partial\lambda_\alpha\partial\lambda_\beta}=\sum_l\frac{1}{V_l}\left[\frac{\partial C_l}{\partial\lambda_\alpha}\frac{\partial C_l}{\partial\lambda_\beta}-(\hat C_l-C_l)\frac{\partial^2C_l}{\partial\lambda_\alpha\partial\lambda_\beta}\right]`, why: R`记 $C_l\equiv C^{\rm theory}(l,\lambda)$、$V_l\equiv\mathrm{Var}[\hat C(l)]$（与 $\lambda$ 无关）。` },
        { tex: R`\big\langle\hat C_l-C_l(\bar\lambda)\big\rangle=0\ \Rightarrow\ F_{\alpha\beta}=\sum_l\frac{1}{V_l}\frac{\partial C_l}{\partial\bar\lambda_\alpha}\frac{\partial C_l}{\partial\bar\lambda_\beta}`, why: R`在真值处取期望，第二项消失。单参数时即 $F=\langle\mathcal F\rangle$（\eqref{14.67}）。` },
      ]} />
      <Tx>{R`**两个参数：条件误差与边缘化误差。**对高斯分布与单个参数 $\lambda$，预测的 $1\sigma$ 不确定度是 $1/\sqrt F$。若有不止一个参数可变呢？\figref{14.4} 画出了二维情形。若参数 $\lambda_2$ 已知，$\lambda_1$ 的误差为 $1/\sqrt{F_{11}}$。但若 $\lambda_2$ 可变，$\lambda_1$ 的正确误差要在对 $\lambda_2$ 的所有可能值积分之后得到，结果是 $\sqrt{(F^{-1})_{11}}$。`}</Tx>
      <Figure n="14.4" illustration={<FisherEllipse />} caption={R`二维参数空间中的误差椭圆。似然的极大值 $(\bar\lambda_1,\bar\lambda_2)$ 用星号标出。图中给出 $\lambda_1$ 的两种可能误差：若 $\lambda_2$ 完全已知（先验无限窄），$\lambda_1$ 的误差对应椭圆在 $\lambda_2=\bar\lambda_2$ 处的宽度，等于 $1/\sqrt{F_{11}}$；若对 $\lambda_2$ 没有任何先验信息，应报告的误差是对 $\lambda_2$ 边缘化之后分布的宽度，即更大的 $\sqrt{(F^{-1})_{11}}$。**交互版**：调节 Fisher 矩阵三个独立元，看两种误差如何随参数相关性变化。`} />
      <Tx>{R`明确地证明这一点很有启发。先利用 Fisher 矩阵描述似然（以 $\lambda_\alpha$ 表示）在极大处曲率这一事实，把两参数的联合后验写成`}</Tx>
      <Eq n="14.70" say={R`真值附近，联合后验是由 Fisher 矩阵给出"逆协方差"的二维高斯。`}>{R`P(\lambda_1,\lambda_2)\propto\exp\left\{-\frac12\lambda_\alpha F_{\alpha\beta}\lambda_\beta\right\}`}</Eq>
      <Tx>{R`这里简单起见假设真值为 $(\lambda_1,\lambda_2)=(0,0)$（对重复指标求和）。让 $\lambda_2$ 可变，等价于像 \eqref{14.22} 那样对 $\lambda_2$ 的所有可能值积分（边缘化）这个概率分布。于是`}</Tx>
      <Eq n="14.71" keyEq title="边缘化后验与误差" say={R`积掉 $\lambda_2$ 后，$\lambda_1$ 仍是高斯，但"有效曲率"从 $F_{11}$ 降为 $\det F/F_{22}=1/(F^{-1})_{11}$——误差变大。`}>{R`\begin{aligned}P(\lambda_1) &= \int d\lambda_2\,P(\lambda_1,\lambda_2)\\ &\propto \exp\left\{-\frac{\lambda_1^2}{2}\left(\frac{F_{11}F_{22}-F_{12}F_{21}}{F_{22}}\right)\right\}\end{aligned}`}</Eq>
      <Derivation title={R`对 $\lambda_2$ 的 Gauss 积分（配方）`} steps={[
        { tex: R`\lambda_\alpha F_{\alpha\beta}\lambda_\beta=F_{11}\lambda_1^2+2F_{12}\lambda_1\lambda_2+F_{22}\lambda_2^2`, why: R`$F$ 对称，$F_{12}=F_{21}$。` },
        { tex: R`=F_{22}\left(\lambda_2+\frac{F_{12}}{F_{22}}\lambda_1\right)^2+\left(F_{11}-\frac{F_{12}^2}{F_{22}}\right)\lambda_1^2`, why: R`对 $\lambda_2$ 配方。` },
        { tex: R`\int d\lambda_2\,e^{-\frac{F_{22}}{2}(\lambda_2+\ldots)^2}=\sqrt{2\pi/F_{22}}`, why: R`与 $\lambda_1$ 无关的常数，并入比例系数。` },
        { tex: R`P(\lambda_1)\propto\exp\left\{-\frac{\lambda_1^2}{2}\,\frac{F_{11}F_{22}-F_{12}^2}{F_{22}}\right\},\qquad\frac{F_{22}}{F_{11}F_{22}-F_{12}^2}=(F^{-1})_{11}`, why: R`$2\times2$ 矩阵求逆：$(F^{-1})_{11}=F_{22}/\det F$。` },
      ]} result={R`$\sigma(\lambda_1)=\sqrt{(F^{-1})_{11}}=\dfrac{1}{\sqrt{F_{11}}}\dfrac{1}{\sqrt{1-r^2}}\ge\dfrac{1}{\sqrt{F_{11}}}$，其中 $r=F_{12}/\sqrt{F_{11}F_{22}}$（等于参数相关系数的负值）。`} />
      <Tx>{R`第二行来自显式完成对 $\lambda_2$ 的积分。括号中的项为 $[F_{11}F_{22}-F_{12}F_{21}]/F_{22}=1/(F^{-1})_{11}$。所以 $1\sigma$ 误差确实是 $\sqrt{(F^{-1})_{11}}$。`}</Tx>
      <Box kind="key" title="报告哪一个误差？">{R`$1/\sqrt{F_{\alpha\alpha}}$ 是**条件误差**：假装其余所有参数都精确已知。$\sqrt{(F^{-1})_{\alpha\alpha}}$ 是**边缘化误差**：其余参数一并拟合。只要参数之间有相关（$F_{12}\neq0$），后者就更大——在交互图里把 $|r|$ 拉到 0.95，误差会放大 $1/\sqrt{1-0.95^2}\approx3.2$ 倍。CMB 中的典型例子：$\Omega_{\rm K}$ 与 $h$ 的几何简并（\secref{9.7.2}）。另外，独立实验的信息**相加**：$F_{\rm tot}=F_A+F_B$——这就是"打破简并"的数学含义。`}</Box>
    </Sec>);
}

export function Sec146() {
  return (
    <Sec n="14.6" title="Sampling the likelihood function" zh="对似然函数采样"
      gist={R`真实似然对参数非高斯、还要积掉冗余参数，只能数值处理；网格法的代价随维数指数增长（$20^{20}$）。若能得到服从后验的样本，均值 \eqref{14.72}、方差 \eqref{14.73} 与直方图就给出一切。MCMC 用 Markov 链实现这一点：满足细致平衡 \eqref{14.74} 即可收敛到后验；Metropolis–Hastings 以 $\min\{P'/P,1\}$ 接受提议 \eqref{14.75}，满足细致平衡 \eqref{14.76}。`}
      why={R`图 14.1 右下角的"采样器"就是它：现代宇宙学的几乎所有参数约束（Planck、DES、DESI……）都是 MCMC 链的直方图。`}
      gives={["14.72", "14.73", "14.74", "14.75", "14.76"]}>
      <p className="muted">本节概念：<C id="mcmc" /> · <C id="detailed_balance" /> · <C id="marginal" /></p>
      <Tx>{R`**为什么要数值采样。**本章已经走过似然所需的全部要素：理论预言、由数据估计的两点函数，以及它们的协方差。现在要用这个似然约束宇宙学参数。像推导地图与两点函数估计量时那样解析地求似然极大值，一般是做不到的，原因有几个。首先，如 \eqref{14.23} 下方所述，似然对宇宙学参数一般远非高斯。此外，通常还要对若干冗余参数积分，这很少能解析完成。所以必须数值地进行。

**网格法不可行。**原则上，可以蛮力地在参数空间许多点上计算似然，找到它的极大值（这就是最佳拟合参数），以及围绕极大值、包含比如 95% 体积的等高线——它就是参数的 95% 置信区域。但对现代实验所需的多维参数集，这种蛮力方法完全不切实际。描述宇宙学数据通常需要十到一百个参数。假设在一维参数空间中画出似然需要 20 次似然计算；二维就是 $20^2$；三个参数 $20^3$，依此类推。有 20 个自由参数时，需要的似然计算次数是 $20^{20}$。即使每次计算只要几秒（实际上似然常常非常昂贵），也很容易算出这种蛮力方法实际上不可行。`}</Tx>
      <Box kind="example" title="算一算 $20^{20}$">{R`$20^{20}\approx1.05\times10^{26}$。每次似然 1 秒，需要约 $3\times10^{18}$ 年——是宇宙年龄（$1.4\times10^{10}$ 年）的两亿倍。而一条典型的 MCMC 链只需 $10^5$–$10^6$ 次似然计算，且这个数随维数大致只线性增长。`}</Box>
      <Tx>{R`于是我们需要新技术来计算似然函数、找到它的极大值与宽度。下面讨论的工具的一大好处是它们也适用于非高斯似然——真实应用中通常如此。

**样本就是一切。**根本上，复杂似然分析面对的问题是：要在一般是高维的参数空间 $\{\lambda_\alpha\}$ 中找到高概率区域。而且找到极大值之后，还要对似然做积分，才能得到单个参数的正确边缘化误差（\secref{14.5}）。如上所述，实践中必须聪明行事。

假设我们有一个算法：给定任意后验——似然与先验之积——它返回参数空间中的点（"样本"）$\{\lambda_\alpha^i\}_{i=1}^{m_{\rm sample}}$，这些点彼此统计独立，且其分布服从后验。\figref{14.5} 是一个一维例子。那么问题就解决了：所需的最佳拟合参数 $\lambda_\alpha$ 由样本均值给出，`}</Tx>
      <Eq n="14.72" keyEq title="样本均值" say={R`参数的估计 = 链中样本的算术平均。`}>{R`\bar\lambda_\alpha=\frac{1}{m_{\rm sample}}\sum_{i=1}^{m_{\rm sample}}\lambda_\alpha^i,`}</Eq>
      <Figure n="14.5" illustration={<MCMCDemo />} caption={R`原创计算图。用 Metropolis–Hastings 在浏览器里真跑一条链；目标后验取均值 0.5、标准差 0.22 的 Gamma 分布（峰值约在 0.40，与原书图形相符）。`} />
      <Tx>{R`其中求和遍历全部 $m_{\rm sample}$ 个样本；而边缘化误差可以用 $\lambda_\alpha^i$ 的样本方差估计：`}</Tx>
      <Eq n="14.73" keyEq title="样本方差" say={R`参数的边缘化误差 = 链中该参数样本的方差（$m_{\rm sample}-1$ 归一化）——其他参数自动被积掉了。`}>{R`\mathrm{Var}[\lambda_\alpha]=\frac{1}{m_{\rm sample}-1}\sum_{i=1}^{m_{\rm sample}}\left(\lambda_\alpha^i-\bar\lambda_\alpha\right)^2.`}</Eq>
      <Tx>{R`样本数很大时，$\bar\lambda_\alpha$ 与 $\mathrm{Var}[\lambda_\alpha]$ 收敛到与样本数无关的中心值。事实上还能做得更多：给定足够大的 $m_{\rm sample}$，$\lambda_\alpha^i$ 的归一化直方图就给出 $\lambda_\alpha$ 的**边缘化**概率分布。由于这是一维函数，找到其全局极大值、推出正确的置信区间都很容易。类似地，可以得到两个参数 $(\lambda_\alpha,\lambda_\beta)$ 的联合概率分布，例如看它们是否简并。显然，如果数值上高效，这个方法就能解决我们的问题。`}</Tx>
      <Box kind="physics" title="为什么样本让边缘化变得免费">{R`边缘化 \eqref{14.22} 是高维积分；但若手里有服从联合后验的样本 $(\lambda_1^i,\lambda_2^i,\ldots)$，只看第一个坐标 $\lambda_1^i$、**忽略其余坐标**，得到的就是服从边缘分布 $P(\lambda_1)$ 的样本。积分被"计数"取代——这正是 Monte Carlo 积分的精髓。`}</Box>
      <Tx>{R`**Markov 链 Monte Carlo。**幸运的是，这样的算法存在；最流行的称为 **Markov 链 Monte Carlo**（MCMC）。"Monte Carlo" 指过程中要掷骰子（即使用随机数生成器）。"Markov 链"指生成第 $i+1$ 个样本时，算法只用前一个样本点 $\lambda^i$ 作为输入（外加随机数）。这是一个重要的限制：算法没有记忆，它不在乎是哪些先前样本 $\lambda^1,\lambda^2,\ldots$（称为**链**）把我们带到了 $\lambda^i$。这里及以下用 $\lambda$ 代表参数向量 $\{\lambda_\alpha\}$。先推导这个算法能够奏效——真正产生服从目标后验 $P(\lambda)$ 的样本——的条件。（严格说是 $P(\lambda|\{d_i\})$，但数据固定、在本节不显式出现，为清晰起见省去。）我们的主要目标是找到一个候选算法：输入当前参数值 $\lambda$，输出下一组参数，记为 $\lambda'$。

**细致平衡。**由于其 Markov 性质，算法完全由从样本 $\lambda$ 到下一个样本 $\lambda'$ 的条件概率 $K(\lambda'|\lambda)$ 描述。为使 MCMC 采样器从正确的后验采样，对 $K$ 的基本要求是**细致平衡**（detailed balance）：`}</Tx>
      <Eq n="14.74" keyEq title="细致平衡" say={R`在后验分布下，从 $\lambda$ 跳到 $\lambda'$ 的"流量"等于反向流量——所以后验是链的平衡分布。`}>{R`P(\lambda)K(\lambda'|\lambda)=P(\lambda')K(\lambda|\lambda').`}</Eq>
      <Tx>{R`若一开始 $\lambda$ 的分布服从 $P(\lambda)$，满足 \eqref{14.74} 的算法会保持这个分布。这与 Boltzmann 方程中碰撞项的细致平衡类似——后者保持平衡分布：把 \eqref{14.74} 写成 $P(\lambda)K(\lambda'|\lambda)-P(\lambda')K(\lambda|\lambda')=0$，就是说正向（$\lambda\to\lambda'$）与反向（$\lambda'\to\lambda$）反应的速率相同（参见 \secref{5.1} 的讨论）。因此，若要从后验 $P(\lambda)$ 采样，就需要找到一个以 $P(\lambda)$ 为平衡分布的"散射过程"，然后模拟这个散射。`}</Tx>
      <Derivation title={R`细致平衡 ⇒ $P$ 是稳态分布`} collapsed steps={[
        { tex: R`p_{n+1}(\lambda')=\int d\lambda\,p_n(\lambda)K(\lambda'|\lambda)`, why: R`设第 $n$ 个样本服从分布 $p_n$，Markov 链走一步后，下一个样本服从 $p_{n+1}$。` },
        { tex: R`p_n=P:\quad\int d\lambda\,P(\lambda)K(\lambda'|\lambda)=\int d\lambda\,P(\lambda')K(\lambda|\lambda')=P(\lambda')\int d\lambda\,K(\lambda|\lambda')=P(\lambda')`, why: R`若 $p_n$ 已是后验 $P$，则 $p_{n+1}=P$。用 \eqref{14.74}，再用 $K$ 的归一化 $\int d\lambda\,K(\lambda|\lambda')=1$。` },
      ]} result={R`后验是链的不动点。（细致平衡是充分条件；收敛到它还需链能到达所有区域——"遍历性"。）`} />
      <Tx>{R`**为什么从远处出发也行：burn-in。**先理解为什么细致平衡 \eqref{14.74} 正是我们需要的。如果初始样本已服从目标后验，\eqref{14.74} 保证继续从正确分布采样，这是清楚的。实践中我们会从某个很可能远离后验极大值的初始猜测出发。\eqref{14.74} 仍能保证正确结果，原因同样来自 Boltzmann 类比：如果从一个远离 Bose–Einstein 分布的光子分布出发，让它与某温度的电子接触，经过多次散射后它会被驱向同一温度的平衡分布。类似地，即使初始样本远离真实后验分布，满足细致平衡的采样算法也保证经过足够多次"散射"（即随机抽样）后，样本分布趋于 $P(\lambda)$。所以趋向真实分布不是立即发生的，而是在一个"**burn-in**"期间完成——这段样本要丢掉。

**Metropolis–Hastings 算法。**$K(\lambda'|\lambda)$ 的一种选择是 1950 年代由 Metropolis 发明、后经 Hastings 推广的 **Metropolis–Hastings 算法**。简单起见只看一个参数：从一个以 $\lambda$ 为中心、对两个自变量对称的分布 $g(\lambda',\lambda)$ 中抽取可能的下一个样本 $\lambda'$。最简单的例子是高斯，$g(\lambda',\lambda)\propto\exp[-(\lambda-\lambda')^2/2\sigma^2]$。然后以概率`}</Tx>
      <Eq n="14.75" keyEq title="Metropolis–Hastings 接受概率" say={R`往后验更高处的提议一定接受；往低处的提议按后验之比接受——只需要比值，不需要归一化。`}>{R`p_{\rm acc}(\lambda',\lambda)=\min\left\{\frac{P(\lambda')}{P(\lambda)},\,1\right\}.`}</Eq>
      <Tx>{R`"接受"这个新样本。也就是说，计算 $\lambda'$ 处的后验，求比值 $\alpha\equiv P(\lambda')/P(\lambda)$。若 $\alpha$ 大于 1，$\lambda'$ 就是链的下一步；若小于 1，就在 0 与 1 之间均匀抽一个随机数，只有当它小于 $\alpha$ 时才把 $\lambda'$ 接受进链。所以若提议的 $\lambda'$ 比先前的 $\lambda$ 可能性小得多，它被接受的可能性就很小（但不是不可能）。另一方面，若随机数大于 $\alpha$，就丢弃 $\lambda'$，**改为把先前的值 $\lambda$ 再插入链中一次**。然后重复这个循环，从链的最后一个元素出发抽取新提议。

**验证细致平衡。**要证明这个配方满足细致平衡，需要`}</Tx>
      <Eq n="14.76" say={R`对称提议下，前后两个方向的转移概率之比只剩接受概率之比，恰好等于后验之比。`}>{R`\begin{aligned}\frac{P(\lambda')}{P(\lambda)} &= \frac{K(\lambda'|\lambda)}{K(\lambda|\lambda')}\\ &= \frac{p_{\rm acc}(\lambda',\lambda)}{p_{\rm acc}(\lambda,\lambda')},\end{aligned}`}</Eq>
      <Tx>{R`第二行成立是因为 $g(\lambda',\lambda)$ 对称（$K(\lambda'|\lambda)=g(\lambda',\lambda)\,p_{\rm acc}(\lambda',\lambda)$，$\lambda'\neq\lambda$）。若 $P(\lambda')<P(\lambda)$，分母为 1，分子恰为 $P(\lambda')/P(\lambda)$；类似地若 $P(\lambda')>P(\lambda)$，分子为 1，分母保证等式成立。所以该算法满足细致平衡。这个算法也很容易推广到多参数：依次在 $\lambda_1,\lambda_2,\ldots$ 上走步，每个参数用同一个函数 $g(\lambda_i',\lambda_i)$，或用不同的函数 $g_i$。

**步长：可调，也必须调。**与此相关的是 Metropolis–Hastings 的一个优点：函数 $g$ 可以调节。例如对上面的高斯选择，$\sigma$ 是自由参数。若取得很小，采样器要很久才能画出似然函数，甚至可能卡在局部极大附近。若 $\sigma$ 太大，接受率会很低，因为大多数 $\lambda'$ 会落在参数空间的低概率区域。因此在 burn-in 阶段常常动态调整步长。这个算法的一个缺点是：由于拒绝采样，生成一个新样本可能需要多次后验计算。此外，相邻样本并非真正统计独立，所以计算 \eqref{14.72}–\eqref{14.73} 中的样本均值与方差时要小心。`}</Tx>
      <Box kind="data" title="交互图实测（Gamma 后验，20000 步，从 $\lambda_0=1.8$ 出发，丢弃前 1000 步）">{R`$\sigma=0.01$：接受率 0.99，但积分自相关时间 $\tau\approx860$，有效样本只有约 20 个，样本均值 0.63（还没走完 burn-in）。
$\sigma=0.1$：接受率 0.85，$\tau\approx38$，均值 0.505、标准差 0.224。
$\sigma=0.5$：接受率 0.44，$\tau\approx6$，有效样本约 3300，均值 0.501、标准差 0.221（真值 0.5、0.22）。
$\sigma=2$：接受率 0.13，$\tau\approx12$。

经验上，一维高斯目标的最优接受率约 0.44，高维时约 0.23（Roberts–Gelman–Gilks）。`}</Box>
      <Tx>{R`**所有采样器的共同问题。**Metropolis–Hastings 是最早的 MCMC 算法之一，此后又发展出许多其他算法，在宇宙学中（当然也在更广阔的数据科学领域中）被广泛使用。上面提到的一些基本问题适用于所有采样器：
（1）优化步长，以最少的计算次数画出似然；
（2）估计 burn-in 期；
（3）判断链何时已经收敛；
（4）理解相邻样本之间的相关。`}</Tx>
    </Sec>);
}

export function Sec147() {
  return (
    <Sec n="14.7" title="Summary" zh="小结"
      gist={R`现代分析链：两次压缩（原始数据 → 地图 → 两点函数）+ 理论两点函数 + 协方差 → 似然 → MCMC。对角协方差足以做预测，但对真实数据已不够；系统误差是另一大挑战，前向建模与零检验是对策。`}
      why={R`数据分析是本书第二版改动最大的一章；新方法（无似然推断、整图前向建模、机器学习）正在出现，但都建立在本章的高斯统计之上。`}>
      <Tx>{R`**变化最快的一章。**本书第一版出版于 2003 年。鉴于宇宙学的种种进展，这一章是最需要修订的几章之一，这并不奇怪。数据分析领域在过去几十年变化迅速；作者坦言，呈现本章这些步骤时有些忐忑，因为已经有许多工具出现在地平线上——例如**无似然推断**（likelihood-free inference），或作为功率谱替代的**整张地图的前向建模**，也许再结合机器学习——它们可能取代这里概述的似然分析。

**仍然是基石。**尽管如此，本章聚焦的高斯统计仍是一切统计推断方法的基石。而且即使将来更先进的技术，也很可能依赖 \figref{14.1} 中的一个或几个步骤。其中包括两个**压缩**步骤：一个把原始数据变成地图，另一个从地图估计两点函数。理论部分——在给定模型中计算两点函数——基本涵盖了本书之前的所有章节，在未来的分析中依然重要。还有一个额外的理论步骤：得到两点函数的协方差矩阵；本章只在最简单的情形下描述了它。这里给出的 $C(l)$ 与星系功率谱的对角协方差常用于预测，但用于真实数据的分析早已不够。协方差实际上是当前宇宙学数据分析链中的主要挑战之一。最后，有了这三样东西，计算似然并得到参数约束就变成一个数值统计问题，目前最广泛使用的解决方案是 Markov 链 Monte Carlo。

**系统误差。**在结束本章与本书之前，还应提到另一个主要挑战：**系统效应**。星系成团领域的常见例子有：样本被银河系恒星污染、红移估计错误、以及不完善的理论模型（例如星系密度与物质密度之间的偏袒关系）。CMB 中，银河系前景与波束等仪器效应是突出的例子。纳入许多此类系统误差最有希望的方法之一是**前向建模**。例如，通过测量不同频率的天空亮度，可以构造各种银河前景辐射源的模板图；然后允许 CMB 图被这些模板污染，用自由的振幅系数参数化，与宇宙学参数一起由数据约束——这与我们处理星系偏袒的方式类似。不过这只对**已知**的系统误差有效。对任何其他未知来源的系统误差，可以用一系列**零检验**（null tests）——在没有系统误差时应给出零结果的估计量——去搜寻。所有这些技术都在一定程度上依赖于所考虑的观测量（CMB、星系成团、透镜等等），值得写成单独的教科书，所以我们在此不再深入。`}</Tx>
      <Box kind="warning" title="系统误差为什么越来越要紧">{R`统计误差按 $m^{-1/2}$ 下降（\eqref{14.13}），系统误差不会。数据量每增加 100 倍，统计误差缩小 10 倍，原先藏在大误差棒下面、从未被考虑的各种问题就会冒出来——无论是仪器伪迹还是理论预言中没有正确建模的物理效应。\exref{14.10} 与 \exref{14.12} 用 Fisher 矩阵量化了这种偏差：$\delta\lambda_\alpha=(F^{-1})_{\alpha\beta}B_\beta$。`}</Box>
    </Sec>);
}
