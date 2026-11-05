// §12.6 Galaxy clustering and bias —— 式 (12.77)–(12.89)
import { Sec, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { BiasPlot } from "./_ch12_plots.jsx";
import { FM_12_86, FM_12_88 } from "./_ch12_fmaps.jsx";

const R = String.raw;

export function Sec126() {
  return (
    <Sec n="12.6" title="Galaxy clustering and bias" zh="星系成团与偏袒"
      gist={R`峰–背景分离：长波长扰动 $\delta_\ell$ 把坍缩阈值降低为 $\delta_{\rm cr}-\delta_\ell$ \eqref{12.77}，由质量函数立刻得到线性偏袒 $b_1=-\sigma^{-1}d\ln f/d\nu$ \eqref{12.80}，PS 给出 $b_1=(\nu^2-1)/\delta_{\rm cr}$ \eqref{12.81}。阈值区域的关联函数按 $\xi^{(1)}_R$ 的幂展开 \eqref{12.83}，于是星系密度可以像物质一样做微扰展开，二阶核 \eqref{12.87} 含 $b_1F_2$、$b_2$ 与潮汐偏袒 $b_{K^2}$。`}
      why={R`第 11 章用到两个假设：大尺度上 $\delta_{\rm g}=b_1\delta_{\rm m}$ 加常数噪声，以及星系速度无偏。本节解释它们为何成立、误差多大、如何系统地推广到更高阶。`}
      gives={["12.77", "12.78", "12.80", "12.81", "12.83", "12.84", "12.87", "12.88"]}>
      <p className="muted">本节概念：<C id="bias" /> · <C id="halo" /> · <C id="spt" /></p>
      <Tx>{R`**第 11 章的两个假设。**第 11 章中我们看到，大尺度上的星系成团蕴含大量信息。为此只需做两个简单但非常重要的假设：1）星系过密度 $\delta_{\rm g}$ 与物质过密度线性成正比，比例系数为**偏袒因子** $b_1$，另加一个与尺度无关的噪声贡献；2）大尺度上星系的速度与物质相同。我们留下了一个问题：对星系这样复杂的天体，为什么能做这样简单的假设？它们不可能完全准确，那么误差有多大？

**为什么不直接模拟星系？**一个办法是完整地模拟星系形成，再测量模拟星系的功率谱。不幸的是，模拟真实的星系密度场比得到准确的物质密度场困难得多。对物质，我们论证过重子效应相对较小且局限于小尺度；对星系则不然，因为星系**就是**由重子构成的。例如，次网格模型的微小改变就能强烈影响按（模拟的）光度等挑选的模拟星系的丰度与成团（而实际巡天中的星系常按比总光度更复杂、更难模拟的性质挑选）。所以必须以某种方式把我们对星系形成过程的无知参数化。

本节主体采用微扰论方法——第 11 章的结果正是基于它——此时偏袒 $b_1$ 与噪声振幅在大尺度上装下了我们的无知。我们将同时利用微扰论（\secref{12.2}）与 \secref{12.4.2} 的晕形成玩具模型，推出这为何成立、误差多大。最后简要讨论直接基于模拟的其他近似方法。

**晕的偏袒：峰–背景分离。**从晕的偏袒开始，利用上一节学到的晕形成知识。要计算偏袒，需要预言存在大尺度物质过密度（记为 $\delta_\ell$）时的晕过密度 $\delta_{{\rm h},\ell}$。\secref{12.4.2} 论证过：晕的数密度正比于初始密度场中超过临界阈值 $\delta_{\rm cr}$ 的区域所占比例。可以稍加修改这一假设，以计入长波长密度扰动 $\delta_\ell$（\figref{12.8} 中的红线）。从坍缩区域的角度看——它们的半径远小于这个扰动的波长——这只相当于在小尺度涨落之上加上（或减去，取决于 $\delta_\ell$ 的符号）一个均匀的物质成分。也就是说，用初始线性密度场来表述，所有区域都向坍缩阈值靠近（或远离）了 $\delta_\ell$。坍缩判据 \eqref{12.69} 修改为`}</Tx>
      <Eq n="12.77" title="长波长扰动下的坍缩判据" say={R`长波长过密度相当于把每个小区域“抬高”了 $\delta_\ell$：只需小尺度涨落超过 $\delta_{\rm cr}-\delta_\ell$ 就能坍缩。`}>{R`\delta^{(1)}_R(\boldsymbol x,t) > \delta_{\rm cr} - \delta^{(1)}_\ell(\boldsymbol x,t),`}</Eq>
      <Tx>{R`这里假设长波长扰动按线性演化。把 \eqref{12.77} 代入 \eqref{12.73}，就能算出预期的晕数密度：`}</Tx>
      <Eq n="12.78" say={R`局部的质量函数 = 把阈值换成 $\delta_{\rm cr}-\delta_\ell$ 的 PS 质量函数；对小的 $\delta_\ell$ 展开到一阶，修正正比于 $d\ln f/d\nu$。`}>{R`\begin{aligned}\left.\frac{dn}{d\ln M}\right|_{\delta_\ell} &= \frac{\rho_{\rm m}(t_0)}{M}f_{\rm PS}\left(\frac{\delta_{\rm cr}-\delta^{(1)}_\ell}{\sigma(M,z)}\right)\left|\frac{d\ln\sigma(M,z)}{d\ln M}\right|\\ &\approx \left.\frac{dn}{d\ln M}\right|_0\left[1 - \frac{d\ln f_{\rm PS}}{d\nu}\frac{1}{\sigma(M,z)}\delta^{(1)}_\ell\right]_{\nu=\delta_{\rm cr}/\sigma(M,z)},\end{aligned}`}</Eq>
      <Tx>{R`第二行展开到 $\delta^{(1)}_\ell$ 的一阶，前因子是平均晕质量函数。于是晕数密度的相对扰动为`}</Tx>
      <Eq n="12.79" say={R`晕的过密度定义为局部质量函数相对平均值的偏离；它正比于大尺度物质过密度，比例系数就是偏袒 $b_1$。`}>{R`\delta^{(1)}_{{\rm h},\ell}(\boldsymbol x,t) = \frac{dn/d\ln M|_{\delta_\ell}}{dn/d\ln M|_0} - 1 \equiv b_1(M,z)\,\delta^{(1)}_\ell(\boldsymbol x,t),`}</Eq>
      <Tx>{R`其中偏袒定义为联系晕过密度与物质过密度的系数，所以`}</Tx>
      <Eq n="12.80" keyEq title="峰–背景分离偏袒" say={R`线性偏袒 = 质量函数对峰高 $\nu$ 的对数斜率（取负号）除以 $\sigma$：丰度对阈值越敏感，偏袒越大。`}>{R`b_1(M,z) = -\frac{1}{\sigma(M,z)}\left.\frac{d\ln f_{\rm PS}(\nu)}{d\nu}\right|_{\nu=\delta_{\rm cr}/\sigma(M,z)}.`}</Eq>
      <Tx>{R`代入 Press–Schechter 形式的质量函数，得到`}</Tx>
      <Eq n="12.81" keyEq title="PS 偏袒" say={R`Press–Schechter 晕的偏袒：$\nu=1$ 的晕无偏，稀有的大质量晕（$\nu\gg1$）偏袒约为 $\nu^2/\delta_{\rm cr}$，远大于 1；小质量晕反偏袒。`}>{R`b_1^{\rm PS}(M,z) = \left.\frac{\nu^2-1}{\delta_{\rm cr}}\right|_{\nu=\delta_{\rm cr}/\sigma(M,z)}.`}</Eq>
      <Derivation title={R`从 \eqref{12.80} 到 \eqref{12.81}`} collapsed steps={[
        { tex: R`\ln f_{\rm PS}(\nu)=\frac12\ln\frac2\pi+\ln\nu-\frac{\nu^2}2\ \Rightarrow\ \frac{d\ln f_{\rm PS}}{d\nu}=\frac1\nu-\nu`, why: R`由 \eqref{12.73}。` },
        { tex: R`b_1=-\frac1\sigma\left(\frac1\nu-\nu\right)=\frac{\nu^2-1}{\nu\sigma}=\frac{\nu^2-1}{\delta_{\rm cr}}`, why: R`$\nu\sigma=\delta_{\rm cr}$。` },
      ]} result={R`（编者注）严格说，这是相对于**初始**（拉格朗日）密度场的偏袒：它数的是初条件中的区域。晕随物质一起运动后，大尺度过密区被压缩，相对于演化后物质场的（欧拉）偏袒为 $b_1^{\rm E}=1+b_1$。例如晕模型的一致性条件 $\int d\ln M\,\frac{dn}{d\ln M}\frac{M}{\rho_{\rm m}}b_1(M)=1$（\exref{12.13}）对欧拉偏袒成立；对拉格朗日偏袒，同一积分为 0。`} />
      <Tx>{R`这种推导偏袒的方法称为**峰–背景分离**（peak-background split）论证，最早由 Kaiser (1984) 提出，可以用我们为球坍缩所做的同一种"分离宇宙"论证严格地证明（Desjacques et al., 2018 第 3 节）。此外，计算偏袒时不必采用 Press–Schechter 的 $f_{\rm PS}(\nu)$，可以代入更准确的参数化，例如 \figref{12.9} 所示的那种。`}</Tx>
      <BiasPlot />
      <Tx>{R`**为什么稀有晕偏袒大。**可以看到，$\nu\gg1$ 即稀有的高质量晕偏袒系数很大，这意味着它们比物质成团得强烈得多。仔细看 \figref{12.8} 就明白原因：$\delta_\ell>0$ 时超过阈值 $\delta_{\rm cr}$ 的峰比 $\delta_\ell<0$ 时多得多（此例中为 3 个对 0 个），尽管 $\delta_\ell$ 并不大。所以稀有峰的丰度对物质密度扰动的反应比物质本身敏感得多——这与 $b_1$ 远大于 1 一一对应。

**推广到更小尺度。**我们发现晕的密度扰动正比于物质密度扰动，比例常数为 $b_1$。这个推导是成立的，因为它关注的是**很大尺度**密度扰动的效应，而 \secref{12.2} 告诉我们足够大尺度的扰动可以线性处理。如何推广到更小尺度的扰动？把偏袒关系限于线性又会带来多大误差？

一种方法是沿用得到 \eqref{12.70} 与 \eqref{12.73} 的玩具模型：假设晕对应于初条件中在晕的拉格朗日半径上平滑后超过坍缩阈值 $\delta_{\rm cr}$ 的区域。超阈值区域在间隔 $r$ 处的关联函数定义为：在一个超阈值区域距离 $r$ 处找到另一个超阈值区域的**超额概率**：`}</Tx>
      <Eq n="12.82" say={R`阈值区域的关联函数 = 两点同时超阈值的联合概率相对于“独立时的概率”的超出部分。`}>{R`\xi_{\rm thr}(r) = \frac{p\left(\delta^{(1)}_R(\boldsymbol x+\boldsymbol r)>\delta_{\rm cr},\ \delta^{(1)}_R(\boldsymbol x)>\delta_{\rm cr}\right)}{[p(\delta^{(1)}_R(\boldsymbol x)>\delta_{\rm cr})]^2} - 1.`}</Eq>
      <Tx>{R`这里及以下再次省略时间自变量。由于线性密度场服从多元 Gauss 分布，这些概率都能解析写出。\exref{12.10} 中你将完成这一计算，并证明结果可以写成级数展开`}</Tx>
      <Eq n="12.83" keyEq title="阈值区域关联函数的偏袒展开" say={R`阈值区域的关联 = $b_1^2\times$ 物质关联 + $\frac12b_2^2\times$ 物质关联的平方 + …；大尺度上 $\xi\ll1$，高阶项是小修正，线性偏袒成立。`}>{R`\xi_{\rm thr}(r) = (b_1^{\rm thr})^2\xi^{(1)}_R(r) + \frac12(b_2^{\rm thr})^2[\xi^{(1)}_R(r)]^2 + \cdots,`}</Eq>
      <Tx>{R`其中 $\xi^{(1)}_R$ 是在尺度 $R$ 上平滑的线性物质密度场的关联函数，省略号代表含关联函数三次及更高次幂的高阶项。$b_1^{\rm thr}$ 类似于上面推出的线性偏袒系数：超阈值区域的关联函数正比于物质的关联函数。展开的第二项含一个新的偏袒参数——**二阶偏袒** $b_2^{\rm thr}$（它对应于在 \eqref{12.78} 中展开到 $\delta_\ell$ 二阶时得到的系数；见 \exref{12.11}）。这些系数的精确值不如 \eqref{12.83} 中各项的**形式**重要：只要在足够大的尺度 $r$ 上工作，使 $\xi^{(1)}_R(r)\ll1$，高阶偏袒项就是对线性偏袒的小修正。这就为第 11 章的线性偏袒处理提供了依据。

**Fourier 空间。**简单的阈值图像描述不了我们在观测上测量其功率谱的真实星系，但它给出有用的提示。用 \secref{12.2} 学到的技术，很容易得到 \eqref{12.83} 的 Fourier 空间版本：`}</Tx>
      <Eq n="12.84" say={R`阈值区域的功率谱 = $b_1^2P_{\rm L}$ + 一个与 $P^{(22)}$ 同形式的卷积项（系数 $\frac12b_2^2$）+ …；所以二阶偏袒与物质的单圈修正同阶。`}>{R`\begin{aligned}P_{\rm g,thr}(k) &= (b_1^{\rm thr})^2P_{\rm L}(k)W_R^2(k)\\ &\quad+ \frac12(b_2^{\rm thr})^2\int\frac{d^3p}{(2\pi)^3}P_{\rm L}(p)W_R^2(p)P_{\rm L}(|\boldsymbol k-\boldsymbol p|)W_R^2(|\boldsymbol k-\boldsymbol p|)\\ &\quad+ \cdots,\end{aligned}`}</Eq>
      <Tx>{R`其中 $W_R(k)$ 是 Fourier 空间中的滤波核（见 \eqref{12.4}）。大尺度上（$k\ll1/R$）可以把它设为 1。把 \eqref{12.84} 与 \eqref{12.49} 比较可见，二阶偏袒的贡献形式相似，因而（若 $b_2^{\rm thr}$ 是 1 的量级）与物质功率谱微扰论中的 NLO 贡献 $P^{(22)}(k)$ **同阶**。这提示我们可以把星系的偏袒展开纳入微扰论：仿照 \eqref{12.29} 展开星系密度扰动，`}</Tx>
      <Eq n="12.85" say={R`星系密度也按线性场的幂次逐阶展开，第一阶就是 $b_1\delta^{(1)}$。`}>{R`\delta_{\rm g}(\boldsymbol x,\eta) = \delta^{(1)}_{\rm g}(\boldsymbol x,\eta) + \delta^{(2)}_{\rm g}(\boldsymbol x,\eta) + \cdots + \delta^{(n)}_{\rm g}(\boldsymbol x,\eta),`}</Eq>
      <Tx>{R`其中，如我们现在所知，$\delta^{(1)}_{\rm g}=b_1\delta^{(1)}$。与物质密度场的关键区别在于：必须确定在 $\delta^{(n)}_{\rm g}$ 中——即微扰论的给定阶上——需要包含**哪些**偏袒项，才能描述一般的星系密度场。Desjacques et al. (2018) 第 2 节详细描述了背后的严格理论，这里不展开。在二阶 $\delta^{(2)}_{\rm g}$ 中有两个偏袒项：上面遇到的 $b_2$ 项，以及一个含潮汐场平方、正比于 $b_{K^2}(\partial_i\partial_j\Psi)(\partial^i\partial^j\Psi)$ 的项（\exref{12.12}）。阈值玩具模型中没有出现潮汐场，因为我们假设晕的密度只依赖物质密度的**局域**值。实际上晕与星系的形成受大尺度潮汐场影响，所以偏袒关系中必须包含它们。

仿照基于 \eqref{12.29} 处理物质密度场的方式，可以用 \eqref{12.85} 在 Fourier 空间展开星系密度场，类比物质的 $F_n$（\eqref{12.40}）定义核 $F_{{\rm g},n}$：`}</Tx>
      <FormulaMap n="12.86" say={R`星系的第 $n$ 阶场与物质的 \eqref{12.40} 结构相同，只是核换成含偏袒参数（且依赖时间）的 $F_{{\rm g},n}$。`} tree={FM_12_86} start="F" />
      <Tx>{R`例如，\exref{12.12} 中可以证明二阶核为`}</Tx>
      <Eq n="12.87" keyEq title="星系二阶核" say={R`星系的二阶核 = $b_1\times$ 物质的 $F_2$（物质本身的非线性）+ $\frac12b_2$（对局域密度的二次响应）+ $b_{K^2}\times$ 潮汐项（对大尺度潮汐场的响应）。`}>{R`F_{{\rm g},2}(\boldsymbol k_1,\boldsymbol k_2;\eta) = b_1(\eta)F_2(\boldsymbol k_1,\boldsymbol k_2) + \frac12b_2(\eta) + b_{K^2}(\eta)\left[\frac{(\boldsymbol k_1\cdot\boldsymbol k_2)^2}{k_1^2k_2^2} - \frac13\right].`}</Eq>
      <Tx>{R`由于偏袒参数 $b_1$ 乘的是本身含非线性贡献的物质密度场，$F_{{\rm g},2}$ 中出现 $b_1F_2$ 项。此外，$b_2$ 如预期出现，另外还有**潮汐偏袒**参数 $b_{K^2}$。对给定质量的晕，$b_1$ 与 $b_2$ 可以由上面的峰–背景分离得到；对观测到的星系，这些系数需要由数据确定，即测量星系功率谱等统计量。

**星系双谱。**基于 \eqref{12.85}–\eqref{12.86}，\secref{12.2} 中为物质发展的所有计算技术（包括图示）都可以移植到星系。例如星系双谱可以仿照 \eqref{12.51} 推出：`}</Tx>
      <FormulaMap n="12.88" say={R`星系的树图双谱：形式与物质的 \eqref{12.51} 相同，核换成 $F_{{\rm g},2}$（外线带 $b_1$），另加噪声项。`} tree={FM_12_88} start="F" />
      <Box kind="warning" title={R`勘误：\eqref{12.88} 中的 $b_1^2$`}>{R`原书方括号内第一项印作 $2F_{{\rm g},2}(\boldsymbol k_1,\boldsymbol k_2;\eta)P_{\rm L}(k_1,\eta)P_{\rm L}(k_2,\eta)$。由 \eqref{12.86} 与 $\delta^{(1)}_{\rm g}=b_1\delta^{(1)}$，树图贡献 $\langle\delta^{(1)}_{\rm g}(\boldsymbol k_1)\delta^{(1)}_{\rm g}(\boldsymbol k_2)\delta^{(2)}_{\rm g}(\boldsymbol k_3)\rangle$ 中两条外线各带一个 $b_1$，应为 $2b_1^2F_{{\rm g},2}P_{\rm L}P_{\rm L}$（与 Desjacques et al. 2018 一致），上式已补上。`}</Box>
      <Tx>{R`其中`}</Tx>
      <Eq n="12.89" say={R`星系双谱的噪声：一个常数 $B_{N0}$，加上一个与功率谱成正比、可理解为“线性偏袒中的噪声”的项。`}>{R`B_N(k,\eta) = \frac13B_{N0}(\eta) + b_1(\eta)P_{N,\delta}(\eta)P_{\rm L}(k,\eta)`}</Eq>
      <Tx>{R`是星系双谱的噪声贡献，类似于 \eqref{11.23} 中的 $P_N$。星系双谱中有两个常数噪声振幅 $B_{N0}$ 与 $P_{N,\delta}$。注意后者与功率谱一同出现；事实上 $P_{N,\delta}$ 可以解释为线性偏袒 $b_1$ 中的噪声项。

**星系速度为什么无偏。**到目前为止讨论的星系统计量没有计入任何观测效应，特别是忽略了红移空间畸变（RSD；\secref{11.1.2}）。要计入 RSD，需要为第 11 章推导观测星系成团时所做的另一个假设提供依据：大尺度星系速度是**无偏**的。对物质，我们通过求解测地线方程得到速度——它描述在引力场 $\nabla\Psi$ 中自由下落的有质量粒子的运动。而广义相对论的**等效原理**保证**任何**自由下落的有质量粒子都沿同一测地线运动，从而获得相同的速度。这就是星系速度无偏的根本原因。当然，星系速度在某处会偏离暗物质粒子的速度：第一，有非引力相互作用在起作用，对构成星系的气体产生压强力；第二，即使晕的质心速度也与暗物质粒子的速度不同，因为它是大量粒子的平均。但这两种效应都局限于小尺度：\eqref{12.53} 已经表明压强对物质的影响按 $k^2\delta_{\rm m}(\boldsymbol k)$ 标度，对速度的影响同样按 $k^2\boldsymbol u_{\rm m}(\boldsymbol k)$ 标度；平均效应也一样。于是可以通过把内禀星系密度与红移空间星系密度之间的关系 \eqref{11.6} 做微扰展开，把 RSD 推广到线性阶以外（见 Desjacques et al., 2018 第 9 节）。

**微扰论 vs 经验方法。**以上就是如何在微扰论中处理星系成团。微扰方法的优点是能在微扰论的给定阶包含进入星系–物质关系的**所有可能**效应，因此非常稳健；缺点是只能用于微扰论有效的尺度（$k<k_{\rm NL}(z)$）。还有不依赖微扰论、直接基于模拟的经验方法：

- **晕占据分布**（halo occupation distribution, HOD）方法：假设在质量为 $M_{\rm h}$ 的晕中找到 $N_{\rm g}$ 个星系的概率分布 $P(N_{\rm g}|M_{\rm h})$（连同这些星系在晕内的位置与速度分布），把它应用到 N 体模拟中识别的晕表上，得到相应的星系表。$P(N_{\rm g}|M_{\rm h})$ 中通常有几个自由参数，通过在这份星系表上测量功率谱等统计量并要求其与观测吻合来确定。

- **丰度匹配**（abundance matching）技术：基于还能分辨晕内子结构的高分辨率（但只含引力的）N 体模拟，假设最亮或最重的星系居于晕中最重的束缚子结构。例如大质量椭圆星系通常被分配给晕的主（中心）子结构。除了质量定义的含糊（\secref{12.4.1}；对子结构更为突出），这种方法自由参数更少，但经验上似乎仍能很好地描述星系成团。

HOD 与丰度匹配这类经验方法的缺点是：它们建立在对星系–晕联系的强烈简化假设之上。很难严格评估这些假设的准确度，因为其缺陷可能被所含的自由参数部分吸收，甚至更糟——被宇宙学参数的偏移吸收。另一方面，微扰论对系统误差有更严格的控制，因为可以估计下一阶贡献的大小（同样只在微扰论适用的足够大尺度上可行）。显然，尝试用所有这些方法推断宇宙学、相互独立地交叉检验，是很重要的。`}</Tx>
    </Sec>);
}
