// §14.4 Two-point functions —— 式 (14.35)–(14.62)，图 14.3
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { CosmicVariancePlot, GalaxyErrPlot } from "./_ch14_plots.jsx";

const R = String.raw;
const n = R`\hat{\boldsymbol n}`;
const DK = R`\nosym{\Delta}k`;
const bin = (k, ka) => R`||${k}|-${ka}|<${DK}/2`;

export function Sec144() {
  return (
    <Sec n="14.4" title="Two-point functions" zh="两点函数"
      gist={R`从地图估计功率谱并求出它的协方差。CMB：波束在 $l$ 空间是乘法 \eqref{14.38}；对真实 $a_{lm}$ 边缘化得到 $C(l)$ 的似然 \eqref{14.42}，最大化得无偏估计量 \eqref{14.44}，误差 $\sqrt{2/(2l+1)}\,[C+NB_l^{-2}]$ \eqref{14.47}。星系：离散 Fourier 模 \eqref{14.49}、模式计数 \eqref{14.53}、估计量 \eqref{14.54}，Wick 定理给出对角协方差 \eqref{14.59}；窗函数使模式耦合 \eqref{14.62}。`}
      why={R`似然 \eqref{14.23} 需要两样来自数据的东西：观测两点函数 $\hat C(l)$ 与它的协方差。两者都由 \secref{14.1} 的方法得到——只是"称体重"换成了"量涨落的方差"。`}
      gives={["14.38", "14.42", "14.44", "14.47", "14.48", "14.53", "14.54", "14.59", "14.60"]}>
      <p className="muted">本节概念：<C id="estimator" /> · <C id="cosmic_variance" /> · <C id="covariance" /></p>
      <Tx>{R`**从地图到 $\hat C(l)$。**有了 CMB 地图（或投影星系密度场），现在要找到一种方法确定代入似然 \eqref{14.23} 的 $\hat C(l)$。构造角功率谱估计量所需的要素我们在 \secref{14.1} 中都学过了，很快就会用上。主要的新问题是：测量过程不像从秤上读体重那么简单，必须计入一些观测效应，例如仪器的有限分辨率。

**处理数据，还是前向建模理论？**这引出一个大概所有科学家拿到数据时都会面对的老问题：是把数据处理成能与简单理论预言干净比较的形式，还是保持数据原样、把理论预言**前向建模**（forward-model）以计入全部观测复杂性？第二种做法原则上是正确的，因为它把数据与诠释（例如分析中假定的基准宇宙学模型）干净地分开。另一方面，第一种做法的结果不仅能与"简单"理论比较，还能在不同实验之间比较。这里采用第一种，因为它让我们能直接使用前几章发展的理论预言：\eqref{14.23} 中的 $C^{\rm theory}(l,\lambda_\alpha)$ 对 CMB 温度来说正是第 9 章算出的 $C(l)$。于是 \figref{14.1} 中的理论方框变得直接，本节集中讨论从地图得到两点函数的**估计量**，即图中标着"观测两点函数"的方框。为保持简单，对 CMB 的 $C(l)$ 只考虑一种实验复杂性：仪器的有限分辨率——波束或点扩散函数。对星系成团则考虑三维功率谱，那里的主要复杂性是巡天的窗函数。`}</Tx>

      <Sub n="14.4.1" title="CMB power spectrum" zh="CMB 功率谱">
        <Tx>{R`**球谐分解。**设给定天空上观测到的温度各向异性地图 $\Delta(${n})$——例如由 \secref{14.3} 的估计量得到的像素信号 $\{s_i\}$。设像素足够小，像素化带来的等效平滑可以忽略，把温度当作连续场。把观测图分解为球谐函数：`}</Tx>
        <Eq n="14.35" say={R`观测到的温度图向球谐函数投影，得到观测多极系数。`}>{R`a_{lm}^{\rm obs} = \int d\Omega\,Y^*_{lm}(${n})\Delta(${n}).`}</Eq>
        <Tx>{R`$a_{lm}$ 上的"obs"表示这是观测量，被实验的波束平滑过、并经过其他处理。简单起见只考虑波束效应。在射电天文术语中，波束描述仪器有限角分辨率造成的平滑；光学望远镜中则称为点扩散函数。二者本质上等价。计入波束平滑后，天空位置 $${n}$ 处像素中报告的分数温度涨落 $\Delta=(T-T_0)/T_0$ 为`}</Tx>
        <Eq n="14.36" say={R`观测图 = 真实温度扰动与波束的卷积 + 噪声。`}>{R`\Delta(${n}) = \int d\Omega'\,\Theta(${n}')B(${n},${n}')+\eta(${n})`}</Eq>
        <Tx>{R`其中 $B(${n},${n}')$ 是位置 $${n}$ 处的波束形状，$\Theta$ 是真实的温度扰动，$\eta(${n})$ 是该处的地图噪声。作为例子，\figref{14.3} 给出 Planck 仪器 30 GHz 的波束：图中是固定位置 $${n}$（星号）周围、作为 $${n}'$ 的函数的波束形状。`}</Tx>
        <Figure n="14.3" width="60%" caption={R`Planck 仪器 30 GHz 的波束形状。等高线依次表示波束从最大值下降到 50%、10%、1% 与 0.1% 的区域。50% 下降大约发生在 $30'$。来源：Planck wiki（另见 Aghanim et al., 2014）。`} />
        <Tx>{R`把 \eqref{14.36} 代入 \eqref{14.35}，得到`}</Tx>
        <Eq n="14.37" say={R`一般波束把不同的 $(l',m')$ 混合进观测的 $(l,m)$；噪声直接相加。`}>{R`a_{lm}^{\rm obs} = \sum_{l'm'}B_{lm,l'm'}a_{l'm'}+\eta_{lm},`}</Eq>
        <Tx>{R`其中 $a_{l'm'}$ 是真实的 CMB 多极矩（没有波束平滑与噪声时会观测到的），$\eta_{lm}$ 是噪声的多极矩，$B_{lm,l'm'}$ 是波束形状在其两个自变量 $${n},${n}'$ 上的多极展开。第二项是显然的：$\eta(${n})$ 直接加在 $\Delta(${n})$ 上。波束的效应可以在 \exref{14.4} 中推导。

**各向同性波束 = 乘法。**\eqref{14.37} 非常一般，对各向异性、随位置变化的波束都成立。很多情况下，一个合理的一阶近似是假设波束在天空上处处相同且各向同性。可以证明（\exref{14.4}）这大大简化了波束对 $a_{lm}^{\rm obs}$ 的效应：`}</Tx>
        <Eq n="14.38" keyEq title="波束在 l 空间是乘法" say={R`各向同性波束只把每个 $a_{lm}$ 乘以一个只依赖 $l$ 的衰减因子 $B_l$，再加上噪声。`}>{R`a_{lm}^{\rm obs} = a_{lm}B_l+\eta_{lm},`}</Eq>
        <Tx>{R`这里对 $l$ 不求和。波束效应在实空间是卷积，若波束处处相同且各向同性，在多极（$lm$）空间就变成简单的乘法。对高斯波束，$B_l=\exp(-l^2\theta_{\rm beam}^2/2)$，$\theta_{\rm beam}$ 与波束的半高全宽相关。一般地，波束的 Fourier 变换 $B_l$ 在大尺度（$l\theta_{\rm beam}\ll1$）上接近 1，在小尺度上衰减到 0——这对应于波束抹掉了小于 $\theta_{\rm beam}$ 的各向异性。噪声在地图中和在 $lm$ 空间中都只是简单相加。`}</Tx>

        <Tx>{R`**观测 $a_{lm}$ 的概率。**为了把数据 $a_{lm}^{\rm obs}$ 变成底层角功率谱的估计 $\hat C(l)$ 与理论比较，先问：给定理论（真实的 $a_{lm}$），得到数据（$a_{lm}^{\rm obs}$）的概率是多少？这与 \eqref{14.2} 类似。若噪声均值为零、功率谱为`}</Tx>
        <Eq n="14.39" say={R`噪声多极系数零均值、彼此不相关，方差为噪声功率谱 $N(l)$。`}>{R`\left\langle\eta_{lm}\eta^*_{l'm'}\right\rangle = N(l)\delta_{ll'}\delta_{mm'},`}</Eq>
        <Tx>{R`那么对给定多极矩 $lm$，这个概率是（\exref{14.5}）`}</Tx>
        <Eq n="14.40" say={R`真实 $a_{lm}$ 固定时，观测值围绕 $B_la_{lm}$ 作方差为 $N(l)$ 的高斯涨落。`}>{R`P(a_{lm}^{\rm obs}|a_{lm}) = \frac{1}{\sqrt{2\pi N(l)}}\exp\left[-\frac{1}{2N(l)}|a_{lm}^{\rm obs}-B_la_{lm}|^2\right].`}</Eq>
        <Tx>{R`也就是说，对固定的真实 $a_{lm}$，观测 $a_{lm}^{\rm obs}$ 服从均值为 $B_la_{lm}$（噪声平均为零）、方差为噪声方差 $N(l)$ 的多元高斯分布。给定全部 $2l+1$ 个 $a_{lm}^{\rm obs}$ 的测量，我们要确定的量是 $C(l)$——CMB 各向异性的真实底层功率谱。为此把 $a_{lm}$ 当作要积掉的随机变量；它们的分布 $P(a_{lm}|C(l))$ 就是 \secref{9.5.2} 推出的。于是`}</Tx>
        <Eq n="14.41" say={R`我们不知道真实的 $a_{lm}$，所以把它们边缘化：对所有可能的真值按其在 $C(l)$ 下的概率积分。`}>{R`P\left(\{a_{lm}^{\rm obs}\}|C(l)\right) = \prod_{m=-l}^{l}\int da_{lm}\,P(a_{lm}^{\rm obs}|a_{lm})P(a_{lm}|C(l)).`}</Eq>
        <Tx>{R`右边的被积函数可以看作 $P(a_{lm}^{\rm obs},a_{lm}|C(l))$——给定 $C(l)$ 时得到真实 $a_{lm}$ 与观测 $a_{lm}^{\rm obs}$ 的联合概率。由于无法知道真实的 $a_{lm}$，必须对它们边缘化（\eqref{14.22}）。

$P(a_{lm}|C(l))$ 是均值为零、方差为 $C(l)$ 的高斯，所以积分可以做出来，得到`}</Tx>
        <Eq n="14.42" keyEq title="C(l) 的似然" say={R`边缘化后，每个观测 $a_{lm}$ 是方差为"信号 + 噪声" $C B_l^2+N$ 的零均值高斯；$2l+1$ 个相乘就是 $C(l)$ 的似然。`}>{R`\mathcal L\equiv P\left(\{a_{lm}^{\rm obs}\}|C(l)\right) = \left(2\pi\left[C(l)B_l^2+N(l)\right]\right)^{-(2l+1)/2}\exp\left\{-\frac12\sum_{m=-l}^{l}\frac{\left|a_{lm}^{\rm obs}\right|^2}{C(l)B_l^2+N(l)}\right\}.`}</Eq>
        <Derivation title={R`从 \eqref{14.41} 到 \eqref{14.42}：两个高斯的卷积`} collapsed steps={[
          { tex: R`\int da\,\frac{e^{-(a^{\rm obs}-B_la)^2/2N}}{\sqrt{2\pi N}}\frac{e^{-a^2/2C}}{\sqrt{2\pi C}}`, why: R`单个 $m$ 的积分（与原书 \eqref{14.40} 的约定一致，把每个 $a_{lm}$ 当作一个实高斯变量）。` },
          { tex: R`a^{\rm obs}=B_la+\eta,\quad a\sim\nosym{\mathcal{N}}(0,C),\ \eta\sim\nosym{\mathcal{N}}(0,N)\ \Rightarrow\ a^{\rm obs}\sim\nosym{\mathcal{N}}(0,\,CB_l^2+N)`, why: R`独立高斯变量的线性组合仍是高斯，方差相加：$\mathrm{Var}(B_la)=B_l^2C$。` },
          { tex: R`\Rightarrow\ \frac{1}{\sqrt{2\pi(CB_l^2+N)}}\exp\left[-\frac{(a^{\rm obs})^2}{2(CB_l^2+N)}\right]`, why: R`也可以直接配方完成积分（\exref{14.5}）。对 $m=-l\ldots l$ 共 $2l+1$ 个因子相乘即得 \eqref{14.42}。` },
        ]} />
        <Tx>{R`**估计量。**有了这个似然，就能得到两点函数 $C(l)$ 的估计量及其误差。前者只需最大化似然，或更方便地最大化其对数。对数似然对 $C(l)$ 的一阶导数为`}</Tx>
        <Eq n="14.43" say={R`第一项来自归一化（偏好小功率），第二项来自指数（偏好能容纳观测平方和的大功率）——与 \eqref{14.9} 结构完全相同。`}>{R`\frac{d\ln\mathcal L}{dC(l)} = -\frac{(2l+1)B_l^2/2}{C(l)B_l^2+N(l)}+\frac12\sum_{m=-l}^{l}\frac{\left|a_{lm}^{\rm obs}\right|^2B_l^2}{[C(l)B_l^2+N(l)]^2}.`}</Eq>
        <Tx>{R`令其为零，得到 $C(l)$ 的估计量：`}</Tx>
        <Eq n="14.44" keyEq title="角功率谱估计量" say={R`把 $2l+1$ 个观测系数的平方取平均，减去噪声偏差，再除以波束平方——这就是 $\hat C(l)$。`}>{R`\hat C(l) = B_l^{-2}\left(\frac{1}{2l+1}\sum_{m=-l}^{l}\left|a_{lm}^{\rm obs}\right|^2-N(l)\right).`}</Eq>
        <Tx>{R`**误差。**可以用 \eqref{14.21} 中算 $\sigma_w^2$ 估计方差的同样方法估计这个估计量的误差。$\hat C(l)$ 的方差为`}</Tx>
        <Eq n="14.45" say={R`估计量的方差 = 二阶矩 − 真值平方（估计量无偏）。`}>{R`\mathrm{Var}\left[\hat C(l)\right] = \left\langle\hat C(l)^2\right\rangle-C(l)^2.`}</Eq>
        <Tx>{R`展开右边第一项，并利用由 \eqref{14.38}–\eqref{14.39} 得到的 $\langle|a_{lm}^{\rm obs}|^2\rangle=C(l)B_l^2+N(l)$：
$$\begin{aligned}\left\langle B_l^{-4}\left(\frac{1}{2l+1}\sum_{m=-l}^{l}\left|a_{lm}^{\rm obs}\right|^2-N(l)\right)^2\right\rangle-C(l)^2 &= \left\langle B_l^{-4}\left(\frac{1}{2l+1}\sum_{m=-l}^{l}\left|a_{lm}^{\rm obs}\right|^2\right)^2\right\rangle\\ &\quad-2B_l^{-4}N(l)\left(C(l)B_l^2+N(l)\right)+B_l^{-4}N(l)^2-C(l)^2.\end{aligned}$$
最后一行等于 $-(C(l)+N(l)B_l^{-2})^2$。由 \eqref{14.42} 的分布，右边第一项为`}</Tx>
        <Eq n="14.46" say={R`$2l+1$ 个独立高斯平方的平均，其平方的期望 = 均值平方 $\times$ $(1+\frac{2}{2l+1})$——额外的 $\frac{2}{2l+1}$ 就是宇宙方差。`}>{R`\left\langle B_l^{-4}\left(\frac{1}{2l+1}\sum_{m=-l}^{l}\left|a_{lm}^{\rm obs}\right|^2\right)^2\right\rangle = \frac{2l+3}{2l+1}\left[C(l)+N(l)B_l^{-2}\right]^2`}</Eq>
        <Derivation title={R`\eqref{14.46} 的来历：与 \eqref{14.17}–\eqref{14.20} 同一个计算`} collapsed steps={[
          { tex: R`S\equiv C(l)B_l^2+N(l),\qquad \left\langle\Big(\sum_m|a_{lm}^{\rm obs}|^2\Big)^2\right\rangle=\sum_{m\neq m'}S^2+\sum_m3S^2=\big[(2l+1)(2l)+3(2l+1)\big]S^2`, why: R`各 $a_{lm}^{\rm obs}$ 独立、方差 $S$；交叉项 $(2l+1)2l$ 个，对角项用 $\langle x^4\rangle=3S^2$。` },
          { tex: R`\frac{(2l+1)(2l+3)}{(2l+1)^2}S^2B_l^{-4}=\frac{2l+3}{2l+1}\left[C(l)+N(l)B_l^{-2}\right]^2`, why: R`除以 $(2l+1)^2$，乘 $B_l^{-4}$；$SB_l^{-2}=C+NB_l^{-2}$。` },
          { tex: R`\mathrm{Var}[\hat C]=\left(\frac{2l+3}{2l+1}-1\right)\left[C+NB_l^{-2}\right]^2=\frac{2}{2l+1}\left[C+NB_l^{-2}\right]^2`, why: R`减去上面的最后一行 $(C+NB_l^{-2})^2$。正是 \eqref{14.20} 中 $m\to2l+1$、$\sigma_w^2\to C+NB_l^{-2}$。` },
        ]} />
        <Tx>{R`所以 $C(l)$ 的估计量 \eqref{14.44} 的误差为`}</Tx>
        <Eq n="14.47" keyEq title="C(l) 的误差" say={R`功率谱的相对误差 = $\sqrt{2/(2l+1)}$ $\times$（1 + 噪声/信号）：前者是宇宙方差，后者是被波束放大的噪声。`}>{R`\sqrt{\mathrm{Var}\left[\hat C(l)\right]} = \sqrt{\frac{2}{2l+1}}\left[C(l)+N(l)B_l^{-2}\right].`}</Eq>
        <Tx>{R`更准确地说，应代入 \eqref{14.23} 的角功率谱协方差是**对角的**——可以计算 $l\neq l'$ 时的 $\langle\hat C(l)\hat C(l')\rangle$ 并利用 \eqref{14.39} 来验证。所以`}</Tx>
        <Eq n="14.48" keyEq title="C(l) 的协方差" say={R`全天、各向同性噪声时不同 $l$ 的估计互不相关；对角元是宇宙方差与噪声之和的平方乘 $2/(2l+1)$。`}>{R`\mathrm{Cov}_{ll'} = \frac{2}{2l+1}\left[C(l)+N(l)B_l^{-2}\right]^2\delta_{ll'}.`}</Eq>
        <Tx>{R`**两项的含义。**方括号中第二项是地图噪声造成的方差，被波束的逆放大，所以在大 $l$（波束的 Fourier 变换衰减到 0 处）爆发。即使完全没有噪声，方差也不为零，因为第一项仍在。它对应于天空上可用来估计方差 $C(l)$ 的 $a_{lm}$ 只有有限个这一根本不确定性。的确，两项都按所用模式数 $2l+1$ 被压低。如果实验没有观测全部 $4\pi$ 天空、只覆盖了比例 $f_{\rm sky}$，方差 $\mathrm{Cov}_{ll'}$ 近似增大 $1/f_{\rm sky}$ 倍。

这些特征对两点函数估计相当普遍：测到的模式越多，不确定度越小；有一个噪声项，可以靠造更灵敏的实验来降低；但还有一个由有限样本数造成的**宇宙方差**项。通常（这里也是如此）噪声项主导小尺度（$B_l^{-2}\gg1$ 处），宇宙方差主导大尺度。`}</Tx>
        <CosmicVariancePlot />
        <Box kind="example" title="数一数">{R`四极矩 $l=2$：$\sqrt{2/5}=63\%$——不管仪器多好。

$l=10$：$\sqrt{2/21}=31\%$；$l=1000$：$\sqrt{2/2001}=3.2\%$。

只观测 1% 的天空（$f_{\rm sky}=0.01$，如 \exref{14.9} 中的 BICEP/Keck），误差再乘 $10$。

这就是为什么大尺度 CMB 测量"已经到头"：Planck 的 $l\lesssim1000$ 温度谱早已是宇宙方差主导，进一步的改进只能来自更小尺度、偏振，或者其他探针。`}</Box>
      </Sub>

      <Sub n="14.4.2" title="Galaxy power spectrum" zh="星系功率谱">
        <Tx>{R`**从球谐到 Fourier。**上一节的许多内容可以搬到三维星系成团，但有几处值得指出的显著差别。我们不再通过（大体上）对 $a_{lm}^{\rm obs}$ 平方并平均来测角功率谱 $C(l)$，而是通过对 Fourier 振幅 $\delta_{\rm g,obs}(\boldsymbol k)$ 平方并平均来测三维星系功率谱。先想想怎样测 $\delta_{\rm g,obs}(\boldsymbol k)$。在下面的推导中不会遇到"真实的"星系过密度，所以为清晰起见令 $\delta_{\rm g,obs}\to\delta_{\rm g}$。

**立方盒子。**首先假设巡天是共动边长为 $L$ 的立方体。这样的巡天当然不存在，但这个假设使 $\delta_{\rm g}(\boldsymbol k)$ 的测量变得直接；而且它直接适用于模拟的密度场（\secref{12.3}）。设想用一个有 $K_{\rm grid}^3$ 个格点的立方网格覆盖三维巡天体积（格点数决定能测到的最大 $|\boldsymbol k|$，但具体数值在下面无关紧要）。然后按 \eqref{14.34} 在网格上构造密度场 $\delta_{\rm g}(\boldsymbol x_i)=\delta_{{\rm g},i}$。星系密度场的离散 Fourier 变换为`}</Tx>
        <Eq n="14.49" say={R`网格上的离散 Fourier 变换；可用的波矢只能是基本波数 $k_F$ 的整数倍。`}>{R`\delta_{\rm g}(\boldsymbol k) = \frac{L^{3/2}}{K_{\rm grid}^3}\sum_i^{K_{\rm grid}^3}\delta_{\rm g}(\boldsymbol x_i)e^{-i\boldsymbol k\cdot\boldsymbol x_i},\qquad\text{where}\quad\boldsymbol k\in(n_x,n_y,n_z)\,k_F,`}</Eq>
        <Tx>{R`以及`}</Tx>
        <Eq n="14.50" say={R`基本波数：恰好在盒子里放下一个完整周期的模式。`}>{R`k_F\equiv\frac{2\pi}{L}`}</Eq>
        <Tx>{R`是基本模式的波数，它恰好以一个完整周期覆盖盒子。$(n_x,n_y,n_z)$ 是一组从 $-K_{\rm grid}/2$ 到 $K_{\rm grid}/2$ 的整数。前因子 $L^{3/2}/K_{\rm grid}^3$（即格元体积 $(L/K_{\rm grid})^3$ 除以 $L^{3/2}$）是为了后面方便：它使 $\delta_{\rm g}(\boldsymbol k)$ 近似等于连续变换 $\int d^3x\,\delta_{\rm g}e^{-i\boldsymbol k\cdot\boldsymbol x}$ 除以 $\sqrt V$。逆 Fourier 变换为`}</Tx>
        <Eq n="14.51" say={R`逆变换：对 Nyquist 频率以下的全部离散模式求和，重建网格上的密度场。`}>{R`\delta_{\rm g}(\boldsymbol x) = \frac{1}{L^{3/2}}\sum_{\boldsymbol k}^{k_{\rm Ny}}\delta_{\rm g}(\boldsymbol k_i)e^{i\boldsymbol k_i\cdot\boldsymbol x},`}</Eq>
        <Tx>{R`其中对 $\boldsymbol k$ 的求和一直到网格的 Nyquist 频率 $k_{\rm Ny}\equiv K_{\rm grid}k_F/2$。\eqref{14.49}–\eqref{14.51} 中 Fourier 模式的**离散性**很重要，因为它编码了宇宙方差：我们只有有限个 Fourier 模式可用。在 CMB 中，这种离散性从一开始就体现在多极分解里，因为天空面积有限；这里则来自巡天的有限体积 $V=L^3$。

**数模式。**把 Fourier 模式按 $\boldsymbol k$ 的大小分进等间距的区间 $\alpha$：区间 $\alpha$ 包含所有满足 $k_\alpha-\Delta k/2\le|\boldsymbol k|<k_\alpha+\Delta k/2$ 的模式，其个数记为 $m_{k,\alpha}$。功率谱 $\hat P_{\rm g}(k_\alpha)$ 就通过对这 $m_{k,\alpha}$ 个模式求平均来估计，这个数在 $\hat P_{\rm g}$ 的误差中起重要作用。$k_\alpha$ 周围球壳在 Fourier 空间的体积为 $4\pi k_\alpha^2\Delta k$；除以 Fourier 空间基本格元的体积 $k_F^3$，就得到其中包含的模式数：`}</Tx>
        <Eq n="14.52" say={R`球壳体积除以单个模式占据的格元体积：壳层内离散波矢的总数。`}>{R`m_{k,\alpha} = \frac{4\pi k_\alpha^2${DK}}{k_F^3}.`}</Eq>
        <Tx>{R`这里**不**再除以 2（见下方勘误）。密度场是实的，实性条件 $\delta_{\rm g}(-\boldsymbol k)=\delta_{\rm g}^*(\boldsymbol k)$ 使只有一半**复**模式独立；但每个复模式含实部、虚部两个实自由度，所以壳层内的**实**自由度数恰好等于波矢总数 $m_{k,\alpha}$——正如 CMB 中每个 $l$ 有 $2l+1$ 个实自由度。实性条件的效应体现在下面 $\boldsymbol k'=-\boldsymbol k$ 的配对中。因此`}</Tx>
        <Eq n="14.53" keyEq title="模式数" say={R`一个 $k$ 区间里的模式数（实自由度数）正比于巡天体积、$k^2$ 与区间宽度——这就是三维版的“$2l+1$”。`}>{R`m_{k,\alpha} = \frac{1}{2\pi^2}Vk_\alpha^2${DK}.`}</Eq>
        <Tx>{R`**估计量。**星系功率谱的估计量与 \eqref{14.44} 直接类比。而且对星系红移巡天不必计入波束或点扩散函数，因为望远镜的角分辨率极高。网格本身的分辨率有限，但它只是数值工具，必要时总可以加密。所以把 \eqref{14.44} 译成三维情形并令 $B_l\to1$：`}</Tx>
        <Eq n="14.54" keyEq title="星系功率谱估计量" say={R`把区间内所有模式的 $|\delta_{\rm g}(\boldsymbol k)|^2$ 平均，再减去噪声功率。`}>{R`\hat P_{\rm g}(k_\alpha) = \frac{1}{m_{k,\alpha}}\sum_{\boldsymbol k}^{${bin(R`\boldsymbol k`, R`k_\alpha`)}}|\delta_{\rm g}(\boldsymbol k)|^2-P_N,`}</Eq>
        <Tx>{R`其中 $P_N$ 是噪声。对 Poisson 噪声（预测中通常这样假设）$P_N=\bar n_{\rm g}^{-1}$（\exref{14.8}）；一般情形下噪声需要由数据确定。$\hat P_{\rm g}$ 的误差同样可以类比 CMB 情形 \eqref{14.47} 得到。不过推导很有启发性，这里简要走一遍。协方差定义为`}</Tx>
        <Eq n="14.55" say={R`两个区间功率谱估计的协方差，化为区间内各模式四点函数与两点函数乘积之差的双重平均。`}>{R`\begin{aligned}\mathrm{Cov}_{\alpha\beta} &\equiv \left\langle\hat P_{\rm g}(k_\alpha)\hat P_{\rm g}(k_\beta)\right\rangle-\left\langle\hat P_{\rm g}(k_\alpha)\right\rangle\left\langle\hat P_{\rm g}(k_\beta)\right\rangle\\ &= \frac{1}{m_{k,\alpha}}\sum_{\boldsymbol k}^{${bin(R`\boldsymbol k`, R`k_\alpha`)}}\frac{1}{m_{k,\beta}}\sum_{\boldsymbol k'}^{${bin(R`\boldsymbol k'`, R`k_\beta`)}}\left[\left\langle|\delta_{\rm g}(\boldsymbol k)|^2|\delta_{\rm g}(\boldsymbol k')|^2\right\rangle-\left\langle|\delta_{\rm g}(\boldsymbol k)|^2\right\rangle\left\langle|\delta_{\rm g}(\boldsymbol k')|^2\right\rangle\right],\end{aligned}`}</Eq>
        <Tx>{R`第二行代入了 \eqref{14.54} 并丢掉了 $P_N$：$P_N$ 只是常数，可以提到期望之外，从 \eqref{14.55} 中消去（请自己检验并说服自己）。看 \eqref{14.55} 中第一个期望值，它包含四个 $\delta_{\rm g}$，可以用 Wick 定理（见 Box 12.1）展开：`}</Tx>
        <Eq n="14.56" say={R`四点函数 = 三种两两配对之和（Wick 定理）+ 连通部分（只在场非高斯时出现）。`}>{R`\begin{aligned}\left\langle|\delta_{\rm g}(\boldsymbol k)|^2|\delta_{\rm g}(\boldsymbol k')|^2\right\rangle &= \left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(-\boldsymbol k)\delta_{\rm g}(\boldsymbol k')\delta_{\rm g}(-\boldsymbol k')\right\rangle\\ &= \left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(-\boldsymbol k)\right\rangle\left\langle\delta_{\rm g}(\boldsymbol k')\delta_{\rm g}(-\boldsymbol k')\right\rangle\\ &\quad+\left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(\boldsymbol k')\right\rangle\left\langle\delta_{\rm g}(-\boldsymbol k)\delta_{\rm g}(-\boldsymbol k')\right\rangle\\ &\quad+\left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(-\boldsymbol k')\right\rangle\left\langle\delta_{\rm g}(-\boldsymbol k)\delta_{\rm g}(\boldsymbol k')\right\rangle\\ &\quad+\left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(-\boldsymbol k)\delta_{\rm g}(\boldsymbol k')\delta_{\rm g}(-\boldsymbol k')\right\rangle_{\rm conn}.\end{aligned}`}</Eq>
        <Tx>{R`这四项对应 Wick 定理给出的三项，外加最后一项标有下标 conn 的"连通"项：只有当场 $\delta_{\rm g}$ 非高斯时它才存在。先忽略它，稍后讨论其意义。

**配对。**\eqref{14.56} 的第一项恰好抵消 \eqref{14.55} 协方差中的第二项，所以只需考虑 \eqref{14.56} 的第二、三项。对我们定义的离散 Fourier 空间场（\eqref{14.49}），功率谱由下式给出：`}</Tx>
        <Eq n="14.57" keyEq title="离散功率谱" say={R`不同的离散模式互不相关；同一模式（与其反向）的方差就是功率谱加噪声。`}>{R`\left\langle\delta_{\rm g}(\boldsymbol k)\delta_{\rm g}(\boldsymbol k')\right\rangle = \delta_{\boldsymbol k,-\boldsymbol k'}\left[P_{\rm g}(k)+P_N\right],`}</Eq>
        <Tx>{R`其中 Kronecker 符号 $\delta_{\boldsymbol k,-\boldsymbol k'}$ 在 $\boldsymbol k$ 与 $-\boldsymbol k'$ 相等时为 1，否则为 0；回忆 $\boldsymbol k$ 与 $\boldsymbol k'$ 的分量都是 $k_F$ 的整数倍。注意 \eqref{14.54} 与 \eqref{14.57} 的简单形式——由连续版本 \eqref{C.22} 通过替换`}</Tx>
        <Eq n="14.58" say={R`连续 Fourier 空间的 $\delta$ 函数（乘 $(2\pi)^3$）在有限盒子里变成 Kronecker $\delta$。`}>{R`(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')\to\delta_{\boldsymbol k,-\boldsymbol k'},`}</Eq>
        <Tx>{R`得到——之所以成立，要归功于我们在 $\delta_{\rm g}(\boldsymbol k)$ 定义中加入的归一化因子 $L^{3/2}/K_{\rm grid}^3$。与 \eqref{14.55} 对比可见，\eqref{14.56} 的第二、三项只在波数区间 $\alpha$ 与 $\beta$ 重叠时才有贡献；对通常的不重叠区间，这意味着只有 $\alpha=\beta$ 时协方差才非零。此外，在 $\alpha=\beta$ 时考虑 \eqref{14.55} 中对 $\boldsymbol k$ 求和的某一项，对 $\boldsymbol k'$ 的求和只有两个值有贡献：$\boldsymbol k'=\boldsymbol k$ 与 $\boldsymbol k'=-\boldsymbol k$（回忆求和遍历所有波矢方向，$\boldsymbol k$、$\boldsymbol k'$ 的大小限制在所选区间内）。所以若 $\alpha=\beta$，\eqref{14.55} 中的求和给出 $2/m_{k,\alpha}$ 乘以功率谱（加噪声）的平方。星系功率谱的协方差因此为`}</Tx>
        <Eq n="14.59" keyEq title="星系功率谱协方差" say={R`与 CMB 的 \eqref{14.48} 同构：$2l+1$ 换成区间内的模式数，没有波束。`}>{R`\mathrm{Cov}_{\alpha\beta} = \frac{2}{m_{k,\alpha}}\left[P_{\rm g}(k_\alpha)+P_N\right]^2\delta_{\alpha\beta}.`}</Eq>
        <Tx>{R`这与 CMB 结果 \eqref{14.48} 非常类似，唯一的差别是模式数（$m_{k,\alpha}$ 对 $2l+1$）以及没有波束。一个直接的推论是 $P_{\rm g}(k_\alpha)$ 的误差，即对角协方差元的平方根：`}</Tx>
        <Eq n="14.60" keyEq title="星系功率谱误差" say={R`相对误差 = $\sqrt{2/m_{k,\alpha}}\times(1+1/\bar n_{\rm g}P_{\rm g})$：样本方差 + 散粒噪声。`}>{R`\sqrt{\mathrm{Var}\left[\hat P_{\rm g}(k_\alpha)\right]} = \sqrt{\frac{2}{m_{k,\alpha}}}\left[P_{\rm g}(k_\alpha)+P_N\right].`}</Eq>
        <Box kind="warning" title="勘误：离散 Fourier 归一化（14.49、14.51）与模式计数（14.52、14.53）">{R`**(1) \eqref{14.49}、\eqref{14.51} 的前因子。原书印作** $\delta_{\rm g}(\boldsymbol k)=L^{3/2}\sum_i\delta_{\rm g}(\boldsymbol x_i)e^{-i\boldsymbol k\cdot\boldsymbol x_i}$ 与 $\delta_{\rm g}(\boldsymbol x)=\frac{1}{K_{\rm grid}^3L^{3/2}}\sum_{\boldsymbol k}\dots$。**正确为** 前因子 $L^{3/2}/K_{\rm grid}^3$ 与 $L^{-3/2}$（上式已改）。**依据：**原书两式彼此互逆，但由 $\langle\delta_{\rm g}(\boldsymbol x_i)\delta_{\rm g}(\boldsymbol x_j)\rangle=\xi_{\rm g}$ 直接算得 $\langle|\delta_{\rm g}(\boldsymbol k)|^2\rangle=K_{\rm grid}^6P_{\rm g}$，依赖于网格分辨率，\eqref{14.57} 不可能成立。要使 \eqref{14.57}、\eqref{14.58} 成立，$\delta_{\rm g}(\boldsymbol k)$ 必须是连续变换 $\int d^3x\,\delta_{\rm g}e^{-i\boldsymbol k\cdot\boldsymbol x}\simeq(L/K_{\rm grid})^3\sum_i\dots$ 除以 $L^{3/2}$（因为 $(2\pi)^3\delta_{\rm D}^{(3)}(0)\to V$）。习题 \eqref{14.81} 同此改正。

**(2) \eqref{14.52}、\eqref{14.53} 中的因子 $\frac12$。原书印作** $m_{k,\alpha}=\frac12\frac{4\pi k_\alpha^2\Delta k}{k_F^3}=\frac{1}{4\pi^2}Vk_\alpha^2\Delta k$。**正确为** $m_{k,\alpha}=\frac{4\pi k_\alpha^2\Delta k}{k_F^3}=\frac{1}{2\pi^2}Vk_\alpha^2\Delta k$（上式已改）。**依据：**\eqref{14.54} 的求和遍历壳层内全部波矢（共 $4\pi k_\alpha^2\Delta k/k_F^3$ 个），若除以原书的 $m_{k,\alpha}$（一半），$\langle\hat P_{\rm g}\rangle=2P_{\rm g}$，估计量有偏；推导 \eqref{14.59} 时"$\boldsymbol k'=\pm\boldsymbol k$ 两项"的论证用的也是全部波矢。按改正后的计数，\eqref{14.54} 无偏，\eqref{14.59}、\eqref{14.60} 保持原样即成立，与标准的 Feldman–Kaiser–Peacock 结果 $\sigma_P/P=\sqrt{2/N_k}$、$N_k=Vk^2\Delta k/2\pi^2$ 一致（也与 CMB 的 $2l+1$ 个实自由度对应）。照原书计数，误差会被高估 $\sqrt2$ 倍。本页交互图与 \exref{14.11}、\exref{14.12} 的数值都按改正后的计数计算。`}</Box>
        <Tx>{R`**散粒噪声与样本方差。**即使星系样本无限稠密，$P_N\to0$，仍有一个最小误差：由巡天体积 $V$ 内可用模式数有限造成的样本方差（\eqref{14.53}）。简单起见，这里考虑的波矢区间对 $\boldsymbol k$ 的所有方向求平均，这意味着我们实际估计的是星系功率谱的**单极**部分。也可以在 \eqref{14.54} 中按 $\mathcal P_l(\mu)$ 加权（$\mu=\hat{\boldsymbol k}\cdot${n}$），测量各向异性星系功率谱 \eqref{11.23} 的高阶多极 $l>0$；或者把每个波数区间 $\alpha$ 再按 $\mu$ 细分。

**小尺度的诱惑与陷阱。**\eqref{14.60} 与 \eqref{14.53} 一起表明，只要 $P_{\rm g}(k_\alpha)$ 不比噪声 $P_N$ 小很多，星系功率谱的测量精度随 $k_\alpha$ 增大而迅速提高（等间距线性区间 $\Delta k$ 时 $\sqrt{2/m_{k,\alpha}}\propto1/k_\alpha$）。要利用小尺度上这些表面上大量的信息，有两个挑战。第一，第 12 章告诉我们，由于物质与星系偏袒的非线性，小尺度上星系功率谱的理论预言越来越难。第二，一旦星系密度场变得中度非线性，我们推导所依赖的高斯假设就不准确了：\eqref{14.59}–\eqref{14.60} 会获得来自 \eqref{14.56} 最后那个连通项的额外贡献，它由非线性演化诱导（可以沿 \secref{12.2} 与 \secref{12.6} 的思路用微扰论计算）。与高斯贡献不同，连通协方差项会耦合不同的 $k$ 区间。由于这些挑战，星系功率谱的分析通常限制在 $k_\alpha\le k_{\rm max}$，$k_{\rm max}$ 一般取微扰论有效的尺度（$k_{\rm max}\lesssim0.2\,h\,{\rm Mpc}^{-1}$，依红移而定）。`}</Tx>
        <GalaxyErrPlot />
        <Tx>{R`**真实的巡天几何：窗函数。**到目前为止我们假设巡天体积是立方体（而且带周期性边界条件，这已内置于 \eqref{14.49} 的离散 Fourier 变换中）。为了转向真实的巡天几何，回到 \eqref{14.34} 附近的讨论：那里描述了怎样把巡天实际覆盖的空间区域嵌入一个更大的立方体积。这里考虑的立方体积就是嵌入实际巡天的那个网格。\eqref{14.34} 只适用于网格中真正位于观测体积内的格元。于是可以写`}</Tx>
        <Eq n="14.61" say={R`观测场 = 窗函数 $\times$ 完整场：巡天外与被遮挡的格元直接置零。`}>{R`\delta_{\rm g}^{\rm obs}(\boldsymbol x_i) = \mathcal W(\boldsymbol x_i)\delta_{\rm g}(\boldsymbol x_i),`}</Eq>
        <Tx>{R`其中 $\delta_{\rm g}$ 是若所有像素都属于巡天时会测到的星系密度，$\mathcal W(\boldsymbol x_i)$ 是**窗函数**（window function）。最简单时窗函数只取两个值：$\boldsymbol x_i$ 在巡天体积内为 1，否则为 0。粗略地说，$\mathcal W$ 为 1 的区域是一个截头圆锥：横向由巡天在天空上的覆盖区限定，视线方向由巡天的最小与最大红移限定。实际上掩膜通常还有一些小洞，来自需要遮挡的亮前景星以及其他观测效应。在 Fourier 空间中，\eqref{14.61} 变为`}</Tx>
        <Eq n="14.62" say={R`实空间的乘法 = Fourier 空间的卷积：窗函数把不同的 $\boldsymbol k$ 模式混在一起。`}>{R`\delta_{\rm g}^{\rm obs}(\boldsymbol k_i) = \sum_{\boldsymbol k_j}\mathcal W(\boldsymbol k_j)\delta_{\rm g}(\boldsymbol k_i-\boldsymbol k_j).`}</Eq>
        <Tx>{R`这个观测到的、加窗的密度场的似然仍然是高斯的（或者与 $\delta_{\rm g}$ 本身一样接近高斯），但协方差不再具有 \eqref{14.59} 的简单形式：窗函数耦合了不同的 Fourier 模式，使协方差变成复杂的非对角形式。除了这一复杂性，构造星系功率谱最大似然估计量的原理与前面相同。`}</Tx>
      </Sub>
    </Sec>);
}
