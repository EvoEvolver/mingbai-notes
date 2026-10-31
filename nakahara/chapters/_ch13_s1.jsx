// 引言 + §13.1 引言 + §13.2 阿贝尔反常 —— 式 (13.1)–(13.35)；交互图 1（FujikawaLab）
import { Sec, Sub, Tx, Eq, Box, Derivation, Stmt, C } from "@kit";
import { FujikawaLab } from "./_ch13_demos.jsx";
import { DN, TR, CH, IND, AN, MR, SP } from "./_ch13_tex.js";

const R = String.raw;
const G5 = R`\gamma^{m+1}`;

export function Intro() {
  return (
    <Sec n="13.0" title="Anomalies in gauge field theories" zh="开篇：经典对称性未必是量子对称性"
      gist={R`模型构建靠对称性，但 Lagrange 量的对称性只是**经典**的；量子化之后（有效作用量层面）它可能保不住。这种失效叫**反常**（anomaly）。本章研究规范理论中反常的几何与拓扑结构。`}
      why={R`反常决定一个规范理论能否自洽：规范反常必须相消（标准模型对费米子量子数的限制由此而来），而手征反常则带来可观测效应（$\pi^0\to\gamma\gamma$）。本章将看到，反常的大小由指标定理与示性类给出——它是拓扑量，所以不会被微扰修正"抹掉"。`}
      gives={[]}>
      <p className="muted">本章概念：<C id="anomaly" /> · <C id="fujikawa" /></p>
      <Tx>{R`粒子物理里，对称性原理是建模的核心：它保证理论可重整、幺正，Lagrange 量必须选得满足观测到的对称性。但要注意，**Lagrange 量的对称性是经典的**。没有任何保证说它能被提升为**量子**对称性——即有效作用量的对称性。如果经典对称性在量子化过程中无法保持，就说理论有**反常**（anomaly）。

反常有很多种：手征反常（chiral anomaly）、规范反常（gauge anomaly）、引力反常、超对称反常……形容词指的是所涉及的对称性。本章考察**规范理论**中出现的反常的几何与拓扑结构。

本章主要依据 Alvarez-Gaumé (1986)、Alvarez-Gaumé 与 Ginsparg (1985) 以及 Sumitani (1985)；完整的处理见 Rennie (1990) 与 Bertlmann (1996)，更数学化的讲法见 Mickelsson (1989) 与 Nash (1991)。

**本章的路线**可以先一句话说清：§13.2 用 Fujikawa 方法证明阿贝尔（手征）反常就是 Dirac 算子的指标（第 12 章的 Atiyah–Singer 指标定理 \sref{T12.2}）；§13.3 给出手征费米子的非阿贝尔（规范）反常，它只影响有效作用量的相位；§13.4 用 BRS 算子写出 Wess–Zumino 一致性条件，并用"下降方程"从 $2l+2$ 维的陈特征构造出它的解；§13.5 解释为什么必须从高两维出发——非阿贝尔反常的相位卷绕本身就是高两维的指标；§13.6 讨论奇数维的宇称反常，并把三者串成"维数阶梯" 4–3–2。`}</Tx>
    </Sec>);
}

export function Sec131() {
  return (
    <Sec n="13.1" title="Introduction" zh="引言：两个反常公式"
      gist={R`无质量 Dirac 场在外规范场中：经典 Lagrange 量 \eqref{13.1} 有局域规范对称性和整体手征对称性 → 三角图计算显示手征流不守恒，$\partial_\mu j^\mu_5\propto\Tr\epsilon\mathcal{F}\mathcal{F}$（\eqref{13.5}，阿贝尔反常）→ 只与左手 Weyl 费米子耦合时，规范流也不守恒（\eqref{13.9}，非阿贝尔反常）→ 两式极像，但系数 $\frac23$ 与 $\frac12$、整体归一化都不同：这背后有拓扑原因。`}
      why={R`先把要解释的"实验事实"摆出来：两个由 Feynman 图算出的公式。本章其余部分要用几何（指标定理、陈–Simons 形式、下降方程）把它们**推导**出来，并解释二者之间意想不到的联系。`}
      gives={["13.1", "13.5", "13.9"]}>
      <p className="muted">本节概念：<C id="anomaly" /> · <C id="abelian_anomaly" /> · <C id="nonabelian_anomaly" /></p>
      <Tx>{R`在引入拓扑与几何方法之前，先简要回顾一下反常的基本事实。设 $\psi$ 是四维空间中的无质量 Dirac 场，与外规范场 $\mathcal{A}_\mu=A_\mu{}^\alpha T_\alpha$ 相互作用，其中 $\{T_\alpha\}$ 是规范群 $G$（紧致、半单，例如 $\mathrm{SU}(N)$）的一组反 Hermite 生成元。理论由 Lagrange 量`}</Tx>
      <Eq n="13.1" title="Dirac 场与外规范场" say={R`无质量 Dirac 场在外规范场中的 Lagrange 量：普通导数换成规范协变导数 $\partial_\mu+\mathcal{A}_\mu$。`}>{R`\mathcal{L}=\mathrm{i}\bar\psi\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)\psi`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{13.1} 中协变导数的符号（p.521）`}>{R`原书印作 $\mathrm{i}\bar\psi\gamma^\mu(\partial_\mu-\mathcal{A}_\mu)\psi$。在规范变换 \eqref{13.2} 下协变的组合是 $\partial_\mu+\mathcal{A}_\mu$：$(\partial_\mu+g^{-1}\mathcal{A}_\mu g+g^{-1}\partial_\mu g)(g^{-1}\psi)=g^{-1}(\partial_\mu+\mathcal{A}_\mu)\psi$，而 $\partial_\mu-\mathcal{A}_\mu$ 不满足这一点；本章其余各式（\eqref{13.10}、\eqref{13.37}、\eqref{13.43}）也都用 $+\mathcal{A}_\mu$。本站已改正。`}</Box>
      <Tx>{R`描述。它在通常的（局域）规范变换下不变：`}</Tx>
      <Eq n="13.2" say={R`局域规范变换：费米子在每一点被群元 $g^{-1}(x)$ 转动，规范势相应地补偿一项 $g^{-1}\partial_\mu g$。`}>{R`\psi(x)\to g^{-1}\psi(x)\qquad\mathcal{A}_\mu(x)\to g^{-1}[\mathcal{A}_\mu(x)+\partial_\mu]g.`}</Eq>
      <Tx>{R`它还有一个**整体**对称性，`}</Tx>
      <Eq n="13.3" say={R`手征转动：左、右手分量反向转动同一个相位。无质量时经典作用量不变。`}>{R`\psi(x)\to\mathrm{e}^{\mathrm{i}\gamma_5\alpha}\psi(x)\qquad\bar\psi(x)\to\bar\psi(x)\mathrm{e}^{\mathrm{i}\gamma_5\alpha}`}</Eq>
      <Tx>{R`称为**手征对称性**（chiral symmetry）。由此导出的手征流 $j_5$ 是`}</Tx>
      <Eq n="13.4" say={R`轴矢流（手征流）：手征对称性的 Noether 流，经典上守恒。`}>{R`j^\mu_5\equiv\bar\psi\gamma^\mu\gamma_5\psi.`}</Eq>
      <Tx>{R`一般说来，Lagrange 量的对称性在量子化后是否保留并不是平凡的问题。事实上，已经证明 $\mathcal{L}$ 的手征对称性在量子层次被破坏。Adler (1969) 以及 Bell 与 Jackiw (1969) 计算了一个外轴矢流、两个外矢量流的**三角图**，发现朴素的守恒律 $\partial_\mu j^\mu_5=0$ 被破坏：`}</Tx>
      <Eq n="13.5" keyEq title="ABJ 反常（阿贝尔反常）" say={R`轴矢流的散度不为零，而等于场强的"拓扑密度" $\epsilon\Tr\mathcal{F}\mathcal{F}$；它可写成一个陈–Simons 流的全散度——这正是它与拓扑相连的线索。`}>{R`\begin{aligned}\partial_\mu j^\mu_5&=\frac{1}{16\pi^2}\epsilon^{\kappa\lambda\mu\nu}${TR}\,\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\\&=\frac{1}{4\pi^2}${TR}\Big[\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa\Big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big)\Big]\end{aligned}`}</Eq>
      <Tx>{R`其中 $\Tr$ 是对群指标求迹。\eqref{13.5} 中出现的流 $j^\mu_5$ 不带群指标，因此 \eqref{13.5} 称为**阿贝尔反常**（Abelian anomaly）。`}</Tx>
      <Derivation title={R`\eqref{13.5} 两个等号之间的代数`} collapsed steps={[
        { tex: R`\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}=2\epsilon^{\kappa\lambda\mu\nu}(\partial_\kappa\mathcal{A}_\lambda+\mathcal{A}_\kappa\mathcal{A}_\lambda)`, why: R`$\mathcal{F}_{\kappa\lambda}=\partial_\kappa\mathcal{A}_\lambda-\partial_\lambda\mathcal{A}_\kappa+[\mathcal{A}_\kappa,\mathcal{A}_\lambda]$，与反对称的 $\epsilon$ 缩并时每一项都翻倍。` },
        { tex: R`\epsilon\Tr\mathcal{F}\mathcal{F}=4\epsilon^{\kappa\lambda\mu\nu}\Tr\big(\partial_\kappa\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+2\,\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu+\mathcal{A}_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\big)`, why: R`展开乘积；两个交叉项在 $\epsilon$ 与迹的循环性下相等。` },
        { tex: R`\epsilon^{\kappa\lambda\mu\nu}\Tr(\mathcal{A}_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)=0`, why: R`把 $\mathcal{A}_\kappa$ 循环移到最后，指标轮换 $(\kappa\lambda\mu\nu)\to(\lambda\mu\nu\kappa)$ 是奇置换，所以该项等于自身的相反数。` },
        { tex: R`\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa\Tr\Big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big)=\epsilon^{\kappa\lambda\mu\nu}\Tr\big(\partial_\kappa\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+2\,\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\big)`, why: R`$\epsilon\,\mathcal{A}_\lambda\partial_\kappa\partial_\mu\mathcal{A}_\nu=0$；$\partial_\kappa$ 作用在三次项的三个因子上，借助循环性每一项都化成 $\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu$，$\frac23\times3=2$。` },
        { tex: R`\frac1{16\pi^2}\times4=\frac1{4\pi^2}`, why: R`比较前两步即得第二个等号。用形式语言：$\Tr\mathcal{F}^2=\dd\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$——陈–Simons 形式（第 11 章）。` },
      ]} />
      <Tx>{R`研究**带群指标**的流的行为同样有趣。考虑与外规范场耦合的 Weyl 费米子 $\psi$。理论的非阿贝尔规范流也满足一个反常的守恒律，它定义了**非阿贝尔反常**（non-Abelian anomaly）。作用量为`}</Tx>
      <Eq n="13.6" say={R`只有一种手征（$\mathcal{P}_+$ 投影出的分量）参与规范相互作用的 Weyl 费米子。`}>{R`\mathcal{L}\equiv\psi^\dagger(\mathrm{i}${DN})\mathcal{P}_+\psi\qquad\mathcal{P}_\pm=\tfrac12(I\pm\gamma^5).`}</Eq>
      <Tx>{R`Lagrange 量有规范对称性`}</Tx>
      <Eq n="13.7" say={R`与 \eqref{13.2} 相同的局域规范变换。`}>{R`\mathcal{A}_\mu\to g^{-1}(\mathcal{A}_\mu+\partial_\mu)g\qquad\psi\to g^{-1}\psi.`}</Eq>
      <Tx>{R`相应的非阿贝尔流是`}</Tx>
      <Eq n="13.8" say={R`手征费米子的规范流：带群指标 $\alpha$，只含正手征分量。`}>{R`j^{\mu\alpha}\equiv\psi^\dagger\gamma^\mu T^\alpha\mathcal{P}_+\psi.`}</Eq>
      <Tx>{R`Bardeen (1969) 以及 Gross 与 Jackiw (1972) 证明，到单圈为止，这个流不守恒：`}</Tx>
      <Eq n="13.9" keyEq title="非阿贝尔反常（Bardeen）" say={R`手征费米子的规范流协变散度不为零。形状与 \eqref{13.5} 相似，但三次项系数是 $\frac12$ 而不是 $\frac23$，整体系数是 $\frac1{24\pi^2}$ 而不是 $\frac1{4\pi^2}$。`}>{R`(\mathcal{D}_\mu j^\mu)^\alpha=\frac{1}{24\pi^2}${TR}\Big[T^\alpha\partial_\kappa\epsilon^{\kappa\lambda\mu\nu}\Big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac12\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big)\Big].`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{13.9} 左边多余的下标（p.522）`}>{R`原书左边印作 $(\mathcal{D}_\mu j^\mu_\delta)^\alpha$。流 $j^{\mu\alpha}$（\eqref{13.8}）只有一个群指标 $\alpha$，已经写在括号外；下标 $\delta$ 不对应任何量，是排印残留。本站写作 $(\mathcal{D}_\mu j^\mu)^\alpha$，与 \eqref{13.57}、\eqref{13.105} 的 $\mathcal{D}_\mu\langle j^\mu\rangle_\alpha$ 一致。`}</Box>
      <Tx>{R`乍一看，\eqref{13.5} 与 \eqref{13.9} 的右边非常相似。但归一化的差别与数值因子 $\frac23$、$\frac12$ 的差别有深刻的拓扑来源。后面我们将看到，$2l+2$ 维的阿贝尔反常与 $2l$ 维的非阿贝尔反常密切相关，而且以一种意想不到的方式相关：$\frac23$ 来自陈–Simons 形式，$\frac12$ 来自"下降方程"对插值参数 $t$ 的积分 $\int_0^1(1-t)t^k\,\dd t$（§13.4.4，交互图 2）；$\frac1{24\pi^2}=2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3$ 则由 6 维的指标定理定出（§13.5）。`}</Tx>
    </Sec>);
}

export function Sec132() {
  return (
    <Sec n="13.2" title="Abelian anomalies" zh="阿贝尔反常"
      gist={R`欧氏偶数维、非手征理论 → Fujikawa：把 $\psi,\bar\psi$ 按 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的本征函数展开，手征转动下作用量变化 $\int\alpha\,\partial_\mu j^\mu$，测度变化 Jacobian $\exp(-2\mathrm{i}\int\alpha\boldsymbol{A})$ → 得 $\partial_\mu j^\mu_{m+1}=-2\mathrm{i}\boldsymbol{A}$（\eqref{13.25}）→ Gauss 截断后非零模成对抵消，$\int\boldsymbol{A}=\nu_+-\nu_-=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$（\eqref{13.28}）→ 平面波计算 $\boldsymbol{A}(x)=-\frac1{32\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}$（\eqref{13.32}）→ 局部指标定理 $\nu_+-\nu_-=\int\mathrm{ch}_l(\mathcal{F})$（\eqref{13.35}）。`}
      why={R`三角图给出 \eqref{13.5}，但看不出它为什么是拓扑的。Fujikawa 方法把反常定位在**路径积分测度**上，并把它算成一个热核的迹——这正是第 12 章用热核证明指标定理的那个量。`}
      gives={["13.15", "13.22", "13.25", "13.28", "13.32", "13.35"]}>
      <p className="muted">本节概念：<C id="fujikawa" /> · <C id="heat_kernel" /> · <C id="abelian_anomaly" /></p>
      <Tx>{R`从现在起，我们在**偶数维**、**欧氏号差**的流形 $M$（$\dim M=m=2l$）上工作；令 $m=4$ 就得到四维结果。假定系统是**非手征的**：规范场以同样的方式与左、右手分量耦合。约定如下：

$$\gamma^{\mu\dagger}=\gamma^\mu\qquad\{\gamma^\mu,\gamma^\nu\}=2\delta^{\mu\nu}\qquad\gamma^{m+1}=(\mathrm{i})^l\gamma^1\cdots\gamma^m\qquad\gamma^{m+1\dagger}=\gamma^{m+1}\qquad(\gamma^{m+1})^2=+I.$$

李群生成元 $\{T_\alpha\}$ 满足

$$T^\dagger{}_\alpha=-T_\alpha\qquad[T_\alpha,T_\beta]=f_{\alpha\beta}{}^\gamma T_\gamma\qquad\Tr(T^\alpha T^\beta)=-\tfrac12\delta^{\alpha\beta}.$$

（$m=4$ 时 $\gamma^5=-\gamma^1\gamma^2\gamma^3\gamma^4$，与例 12.4 一致；由此 $\Tr\gamma^5\gamma^1\gamma^2\gamma^3\gamma^4=-4$，这是 \eqref{13.32} 中负号的来源。）`}</Tx>

      <Sub n="13.2.1" title="Fujikawa's method" zh="Fujikawa 方法">
        <Tx>{R`推导反常的方法有好几种，Fujikawa 的方法（Fujikawa 1979, 1980, 1986）最直接地揭示了问题的拓扑与几何本质。它等价于相应指标定理的**热核证明**（§12.7，\sref{T12.5}）。

**思路。**经典作用量在手征转动下不变，Noether 定理给出守恒流；量子理论是路径积分，除了作用量，**积分测度** $\mathcal{D}\psi\mathcal{D}\bar\psi$ 也要跟着变。Fujikawa 的发现是：测度不是不变的，它的变化（一个 Jacobian）恰好给出反常。要把"测度"写清楚，就把场按一组完备基展开，测度变成展开系数的乘积——而最好的基就是 Dirac 算子自身的本征函数。

设 $\psi$ 是与外非阿贝尔规范场 $\mathcal{A}_\mu$ 相互作用的无质量 Dirac 场。有效作用量 $W[\mathcal{A}]$ 由下式给出：`}</Tx>
        <Eq n="13.10" title="有效作用量" say={R`有效作用量：把费米子在外场中积掉，$\mathrm{e}^{-W}$ 就是（正规化的）Dirac 行列式 $\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$。`}>{R`\mathrm{e}^{-W[\mathcal{A}]}=\int\mathcal{D}\psi\mathcal{D}\bar\psi\,\mathrm{e}^{-\int\dd x\,\bar\psi\mathrm{i}${DN}\psi}`}</Eq>
        <Tx>{R`其中 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}=\mathrm{i}\gamma^\mu\nabla_\mu=\mathrm{i}\gamma^\mu(\partial_\mu+\omega_\mu+\mathcal{A}_\mu)$，$${SP}_\mu=\frac12${SP}_{\mu\alpha\beta}\Sigma^{\alpha\beta}$ 是背景空间的自旋联络。我们把空间紧化，使几何（自旋联络）不起作用。例如把 $\R^4$ 紧化为 $S^4=\R^4\cup\{\infty\}$，其 Dirac 亏格 $\hat A(TM)$ 平凡（见例 12.5）。这样自旋联络无关紧要，可以从 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 中略去。经典作用量 $\int\dd x\,\bar\psi\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\psi$ 在手征转动`}</Tx>
        <Eq n="13.11" say={R`欧氏空间中的整体手征转动；$\psi$ 与 $\bar\psi$ 乘同一个 $\mathrm{e}^{\mathrm{i}\gamma^{m+1}\alpha}$，因为 $\gamma^{m+1}$ 与 $\gamma^\mu$ 反对易。`}>{R`\psi\to\mathrm{e}^{\mathrm{i}${G5}\alpha}\psi\qquad\bar\psi\to\bar\psi\,\mathrm{e}^{\mathrm{i}${G5}\alpha}`}</Eq>
        <Tx>{R`下不变（$\bar\psi\mathrm{e}^{\mathrm{i}\gamma^{m+1}\alpha}\gamma^\mu=\bar\psi\gamma^\mu\mathrm{e}^{-\mathrm{i}\gamma^{m+1}\alpha}$，两个相因子抵消）。把 $\psi$ 与 $\bar\psi$ 展开为`}</Tx>
        <Eq n="13.12" say={R`用 Dirac 算子的本征函数作基展开场；展开系数 $a_i,\bar b_i$ 是 Grassmann 数，路径积分测度就是 $\prod_i\dd a_i\dd\bar b_i$。`}>{R`\psi=\sum_ia_i\psi_i\qquad\bar\psi=\sum_i\bar b_i\psi^\dagger{}_i`}</Eq>
        <Tx>{R`其中 $a_i$、$\bar b_i$ 是反对易的 Grassmann 变量，

$$\{a_i,a_j\}=0\qquad\{\bar b_i,\bar b_j\}=0\qquad\{a_i,\bar b_j\}=0,$$

$\psi_i$ 是 Dirac 算子的本征向量：`}</Tx>
        <Eq n="13.13" say={R`Dirac 算子的本征值问题；$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ Hermite，本征值实。`}>{R`\mathrm{i}${DN}\psi_i=\lambda_i\psi_i.`}</Eq>
        <Tx>{R`由于 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 是 Hermite 算子，$\lambda_i$ 为实数；由于 $M$ 紧致，$\psi_i$ 可以归一化为

$$\langle\psi_i|\psi_j\rangle=\int\dd x\,\psi_i^\dagger(x)\psi_j(x)=\delta_{ij}.$$

于是对 $\psi$、$\bar\psi$ 的路径积分换成对 $a_i$、$\bar b_i$ 的积分。

**第一步：作用量的变化。**考虑无穷小手征变换`}</Tx>
        <Eq n="13.14a" say={R`局域（依赖于 $x$）的无穷小手征转动作用在 $\psi$ 上。`}>{R`\psi(x)\to\psi(x)+\mathrm{i}\alpha(x)${G5}\psi(x)`}</Eq>
        <Eq n="13.14b" say={R`同一转动作用在 $\bar\psi$ 上（注意 $\gamma^{m+1}$ 在右边）。`}>{R`\bar\psi(x)\to\bar\psi(x)+\mathrm{i}\bar\psi(x)\alpha(x)${G5}.`}</Eq>
        <Tx>{R`照例取 $\alpha=\alpha(x)$ 依赖于 $x$（这是 Noether 方法的标准技巧：整体对称性下作用量不变，局域化之后的变化正比于 $\partial_\mu\alpha$，其系数就是流）。在这一变化下经典作用量变为`}</Tx>
        <Eq n="13.15" say={R`局域手征转动下，经典作用量只改变 $\int\alpha\,\partial_\mu j^\mu_{m+1}$：若只有这一项，路径积分就会推出手征流守恒。`}>{R`\begin{aligned}\int\dd x\,\bar\psi\mathrm{i}${DN}\psi\to&\int\dd x\,(\bar\psi+\mathrm{i}\bar\psi\alpha${G5})\mathrm{i}${DN}(\psi+\mathrm{i}\alpha${G5}\psi)\\=&\int\dd x\,\bar\psi\mathrm{i}${DN}\psi+\mathrm{i}\int\dd x\,[\alpha\bar\psi${G5}\mathrm{i}${DN}\psi+\bar\psi\mathrm{i}${DN}(\alpha${G5}\psi)]\\=&\int\dd x\,\bar\psi\mathrm{i}${DN}\psi-\int\dd x\,[\alpha\bar\psi${G5}\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)\psi\\&\qquad+\bar\psi\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)(\alpha${G5}\psi)]\\=&\int\dd x\,\bar\psi\mathrm{i}${DN}\psi+\int\dd x\,\alpha(x)\partial_\mu j^\mu_{m+1}(x)\end{aligned}`}</Eq>
        <Tx>{R`这里用了反对易关系 $\{\gamma^\mu,\gamma^{m+1}\}=0$，并且`}</Tx>
        <Eq n="13.16" title="手征流" say={R`$m$ 维的手征流，四维时就是 $j^\mu_5$。`}>{R`j^\mu_{m+1}(x)\equiv\bar\psi(x)\gamma^\mu${G5}\psi(x)`}</Eq>
        <Derivation title={R`\eqref{13.15} 最后一步：把方括号化成 $-\partial_\mu\alpha\,j^\mu$`} collapsed steps={[
          { tex: R`\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)(\alpha\gamma^{m+1}\psi)=(\partial_\mu\alpha)\gamma^\mu\gamma^{m+1}\psi-\alpha\gamma^{m+1}\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)\psi`, why: R`Leibniz 律，再用 $\gamma^\mu\gamma^{m+1}=-\gamma^{m+1}\gamma^\mu$；$\mathcal{A}_\mu$ 作用在群指标上，与 $\gamma$ 矩阵对易。` },
          { tex: R`[\cdots]=(\partial_\mu\alpha)\bar\psi\gamma^\mu\gamma^{m+1}\psi=(\partial_\mu\alpha)\,j^\mu_{m+1}`, why: R`代回方括号，含 $\alpha\bar\psi\gamma^{m+1}\gamma^\mu(\partial+\mathcal{A})\psi$ 的两项相消。` },
          { tex: R`-\int\dd x\,(\partial_\mu\alpha)j^\mu_{m+1}=+\int\dd x\,\alpha\,\partial_\mu j^\mu_{m+1}`, why: R`分部积分；$M$ 紧致无边界，没有边界项。` },
        ]} />
        <Tx>{R`是**手征流**（chiral current），即前面 $j^\mu_5$ 的高维推广。如果 \eqref{13.15} 是变换 \eqref{13.14a}–\eqref{13.14b} 引起的唯一变化，那么朴素地应用 Ward–Takahashi 关系就会得到轴矢流守恒 $\partial_\mu j^\mu_{m+1}=0$。

**第二步：测度的变化。**在量子理论中还有一个额外的变化——路径积分测度的变化。定义手征转动后的场`}</Tx>
        <Eq n="13.17a" say={R`转动后的场仍按同一组本征函数展开，系数变为 $a'_i$。`}>{R`\psi'=\psi+\mathrm{i}\alpha${G5}\psi=\sum a'_i\psi_i`}</Eq>
        <Eq n="13.17b" say={R`$\bar\psi$ 的转动，系数变为 $\bar b'_i$。`}>{R`\bar\psi'=\bar\psi+\mathrm{i}\bar\psi\alpha${G5}=\sum\bar b'_i\psi^\dagger_i.`}</Eq>
        <Tx>{R`测度相应地变为`}</Tx>
        <Eq n="13.18" say={R`路径积分测度被换成新系数的测度——问题是二者相差什么。`}>{R`\int\prod_i\dd a_i\,\dd\bar b_i\to\int\prod_i\dd a'_i\,\dd\bar b'_i.`}</Eq>
        <Tx>{R`由 $\{\psi_i\}$ 的正交归一性得`}</Tx>
        <Eq n="13.19a" say={R`新系数是旧系数的线性组合，组合矩阵 $C_{ij}$ 就是转动算子在本征函数基下的矩阵元。`}>{R`\begin{aligned}a'_i&=\langle\psi_i|\psi'\rangle=\langle\psi_i|(1+\mathrm{i}\alpha${G5})\psi\rangle\\&=\sum_j\langle\psi_i|(1+\mathrm{i}\alpha${G5})\psi_j\rangle a_j\equiv\sum_jC_{ij}a_j\end{aligned}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="13.20" say={R`变换矩阵 = 单位矩阵 + 一个无穷小量；它的"迹"将给出反常。`}>{R`C_{ij}=\langle\psi_i|(1+\mathrm{i}\alpha${G5})\psi_j\rangle=\delta_{ij}+\mathrm{i}\alpha\langle\psi_i|${G5}\psi_j\rangle.`}</Eq>
        <Tx>{R`用新变量表示的测度为`}</Tx>
        <Eq n="13.21" say={R`Grassmann 变量换元时测度乘的是 Jacobian 的**倒数**；对无穷小变换，$\det C\approx1+\Tr(C-1)$，于是测度的变化由 $\gamma^{m+1}$ 的"对角和"决定。`}>{R`\begin{aligned}\prod\dd a'_j&=[\det C_{ij}]^{-1}\prod\dd a_i=\exp(-\Tr\ln C_{ij})\prod\dd a_i\\&=\exp[-\Tr\ln(I+\mathrm{i}\alpha\langle\psi_i|${G5}\psi_j\rangle)]\prod\dd a_i\\&\approx\exp(-\Tr\mathrm{i}\alpha\langle\psi_i|${G5}\psi_j\rangle)\prod\dd a_i\\&=\exp\Big(-\mathrm{i}\alpha\sum_i\langle\psi_i|${G5}\psi_i\rangle\Big)\prod\dd a_i\end{aligned}`}</Eq>
        <Tx>{R`这里出现行列式的**倒数**，是因为 $a_i$、$a'_i$ 是 Grassmann 变量（Berezin 1966）。回忆 §1.5：例如 $\int a\,\dd a=\int ca\,\dd(ca)=1$（$c\in\R$，$a$ 为实 Grassmann 数），这说明 $\dd(ca)=\dd a/c$——与普通积分 $\dd(cx)=c\,\dd x$ 恰好相反。对 $\bar b_i\to\bar b'_i$，有`}</Tx>
        <Eq n="13.19b" say={R`$\bar\psi$ 的系数按转置矩阵 $C_{ji}$ 变换；它的 Jacobian 与 \eqref{13.21} 相同。`}>{R`\bar b'_i=\sum_j\bar b_j\langle\psi_j|(1+\mathrm{i}\alpha${G5})|\psi_i\rangle=\sum_jC_{ji}\bar b_j.`}</Eq>
        <Tx>{R`$\bar b_i\to\bar b'_i$ 的 Jacobian 与 \eqref{13.21} 相同（$\det C^{\mathrm t}=\det C$）。因此，在手征转动 \eqref{13.17a}–\eqref{13.17b} 下（对局域的 $\alpha(x)$，把 $\alpha\sum_i\langle\psi_i|\gamma^{m+1}\psi_i\rangle$ 换成 $\int\dd x\,\alpha(x)\sum_n\psi_n^\dagger\gamma^{m+1}\psi_n$），测度的变换为`}</Tx>
        <Eq n="13.22" title="测度的 Jacobian" say={R`手征转动后的测度等于原测度乘一个 Jacobian 因子 $\exp(-2\mathrm{i}\int\alpha\boldsymbol{A})$——这就是反常的全部来源。`}>{R`\prod_i\dd a'_i\,\dd\bar b'_i=\prod_i\dd a_i\,\dd\bar b_i\,\exp\Big(-2\mathrm{i}\int\dd x\,\alpha(x)\sum_n\psi^\dagger_n(x)${G5}\psi_n(x)\Big).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{13.22}–\eqref{13.23} 的写法（p.525）`}>{R`原书把 \eqref{13.22} 写成"$\prod\dd a_i\dd\bar b_i\to\prod\dd a'_i\dd\bar b'_i\exp(-2\mathrm{i}\cdots)$"，并在 \eqref{13.23} 第二行把带撇的测度与不带撇的场写在同一个被积式里。按 \eqref{13.21}（$\prod\dd a'=\mathrm{e}^{-\mathrm{i}\alpha\sum\langle\psi|\gamma\psi\rangle}\prod\dd a$）与 $\bar b$ 的同样结果，精确的关系是上式：**新测度 = 旧测度乘以** $\mathrm{e}^{-2\mathrm{i}\int\alpha\boldsymbol A}$。\eqref{13.23} 本站写成"先改记积分变量、再换回旧变量"的两步形式。两种写法给出同一个结论 \eqref{13.25}，本站只是把每一步的变量写清楚。`}</Box>
        <Tx>{R`**第三步：比较。**积分变量只是"哑变量"，把 $\psi$ 改记为 $\psi'$ 不改变积分；再用 \eqref{13.15} 与 \eqref{13.22} 换回原变量，有效作用量就有两种表示：`}</Tx>
        <Eq n="13.23" say={R`同一个有效作用量的两种写法：换元后作用量多了 $\int\alpha\partial j$，测度多了 $2\mathrm{i}\int\alpha\boldsymbol{A}$，二者必须相互抵消。`}>{R`\begin{aligned}\mathrm{e}^{-W[\mathcal{A}]}&=\int\prod_i\dd a'_i\,\dd\bar b'_i\,\exp\Big(-\int\dd x\,\bar\psi'\mathrm{i}${DN}\psi'\Big)\\&=\int\prod_i\dd a_i\,\dd\bar b_i\,\exp\Big(-\int\dd x\,\bar\psi\mathrm{i}${DN}\psi-\int\dd x\,\alpha(x)\partial_\mu j^\mu_{m+1}(x)\\&\qquad-2\mathrm{i}\int\dd x\,\alpha(x)${AN}(x)\Big)\end{aligned}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="13.24" title="反常密度" say={R`反常密度：所有本征函数的 $\gamma^{m+1}$ "期望值"之和——形式上是 $\gamma^{m+1}$ 的泛函迹，需要正规化。`}>{R`${AN}(x)\equiv\sum_i\psi^\dagger{}_i(x)${G5}\psi_i(x).`}</Eq>
        <Tx>{R`把第二个表示对 $\alpha$ 展开到一阶，并要求它与 $\mathrm{e}^{-W}$ 相等，得 $\langle\int\dd x\,\alpha(\partial_\mu j^\mu_{m+1}+2\mathrm{i}\boldsymbol{A})\rangle=0$。由于 $\alpha(x)$ 任意，`}</Tx>
        <Eq n="13.25" keyEq title="反常的守恒律" say={R`量子论中手征流不守恒：它的散度等于测度 Jacobian 的密度（乘 $-2\mathrm{i}$）。`}>{R`\partial_\mu j^\mu_{m+1}(x)=-2\mathrm{i}${AN}(x).`}</Eq>
        <Tx>{R`于是，轴矢流的朴素守恒在量子论中不成立。流 $j^\mu_{m+1}$ 的这种不守恒称为**阿贝尔反常**（又称**手征反常**或**轴矢反常**）。（\eqref{13.25} 是算符关系在路径积分期望值中的含义；欧氏空间里 $\bar\psi$ 与 $\psi$ 独立，$\langle\partial_\mu j^\mu\rangle$ 可以是虚的。转回 Minkowski 时空时 $\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}\mathcal{F}$ 中的 $\mathcal{F}_{0i}$ 带出一个 $\mathrm{i}$，得到实的 \eqref{13.5}。）

**与拓扑的关系。**看 Jacobian \eqref{13.22}，并设 $\alpha(x)$ 与 $x$ 无关（即看零动量的 Ward–Takahashi 关系）。\eqref{13.22} 中的积分没有良好定义，必须正规化。我们引入 **Gauss 截断**（热核正规化）：`}</Tx>
        <Eq n="13.26" title="Gauss 截断（热核正规化）" say={R`用 $\mathrm{e}^{-\lambda^2/M^2}$ 压低高能模，把发散的 $\gamma^{m+1}$ 之迹变成热核 $\mathrm{e}^{-t(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})^2}$ 的超迹，$t=1/M^2$。`}>{R`\begin{aligned}\int\dd x\,${AN}(x)&=\int\dd x\sum_i\psi^\dagger{}_i(x)${G5}\psi_i(x)\exp[-(\lambda_i/${MR})^2]\Big|_{${MR}\to\infty}\\&=\sum\langle\psi_i|${G5}\exp[-(\mathrm{i}${DN}/${MR})^2]|\psi_i\rangle\Big|_{${MR}\to\infty}.\end{aligned}`}</Eq>
        <Tx>{R`\eqref{13.26} 中的 $1/M^2$ 对应于上一章的"时间"参数 $t$，$M\to\infty$ 意味着 $t\to\varepsilon$（§12.7）。

**非零模成对抵消。**设 $|\psi_i\rangle$ 是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的本征态，本征值 $\lambda_i$ **不为零**。那么本征态中必有一个态 $|\psi_i\rangle^\chi\equiv\gamma^{m+1}|\psi_i\rangle$，其本征值为 $-\lambda_i$：

$$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}|\psi_i\rangle^\chi=\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\gamma^{m+1}|\psi_i\rangle=-\gamma^{m+1}\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}|\psi_i\rangle=-\lambda_i\gamma^{m+1}|\psi_i\rangle=-\lambda_i|\psi_i\rangle^\chi,$$

这里用了反对易关系 $\{\gamma^{m+1},\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\}=0$。由于 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 是 Hermite 算子，属于不同本征值的本征向量正交，因此 $\langle\psi_i|\psi_i\rangle^\chi=\langle\psi_i|\gamma^{m+1}|\psi_i\rangle=0$。这说明

$$\langle\psi_i|\gamma^{m+1}\exp[-(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}/M)^2]|\psi_i\rangle=\langle\psi_i|\gamma^{m+1}|\psi_i\rangle\exp[-(\lambda_i/M)^2]=0.$$

于是 \eqref{13.26} 右边只有**零能模**有贡献。设 $|0,i\rangle$（$1\le i\le n_0$）是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的零能模。$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 在零模空间上为零，与 $\gamma^{m+1}$ 对易，所以零模不必构成旋量代数的不可约表示，而应按 $\gamma^{m+1}$ 的本征值分类：`}</Tx>
        <Eq n="13.27" say={R`零模可以同时取成 $\gamma^{m+1}$ 的本征态：每个零模有确定的手征 $\pm$。`}>{R`${G5}|0,i\rangle_\pm=\pm|0,i\rangle_\pm.`}</Eq>
        <Tx>{R`于是 \eqref{13.26} 变为`}</Tx>
        <Eq n="13.28" keyEq title="Jacobian = 指标" say={R`正规化后的 Jacobian 只数零模：正手征零模数减负手征零模数，正是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 的解析指标——一个与截断 $M$ 无关的整数。`}>{R`\begin{aligned}\int\dd x\,${AN}(x)&=\sum\langle\psi_i|${G5}\exp[-(\mathrm{i}${DN}/${MR})^2]|\psi_i\rangle\Big|_{${MR}\to\infty}\\&=\sum\nolimits_i^+\langle0,i|0,i\rangle_+-\sum\nolimits_i^-\langle0,i|0,i\rangle_-\\&=\nu_+-\nu_-=${IND}\,\mathrm{i}${DN}_+\end{aligned}`}</Eq>
        <Tx>{R`其中 $\nu_+$（$\nu_-$）是正（负）手征零能模的个数（$\nu_++\nu_-=n_0$），$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 由分块形式

$$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}=\begin{pmatrix}0&\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-\\ \mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+&0\end{pmatrix}\qquad\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-=(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+)^\dagger$$

定义（$\ker\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_\pm$ 恰好是手征 $\pm$ 的零模空间）。注意推导中没有用到 $M\to\infty$：在紧流形上，对**任意** $M$ 截断后的和都等于 $\nu_+-\nu_-$；$M\to\infty$ 只在把它写成局部积分 \eqref{13.32} 时才需要——这正是 McKean–Singer 公式（\sref{T12.5}）的物理版本。现在 Atiyah–Singer 指标定理（\sref{T12.2}）进入了问题。`}</Tx>
        <FujikawaLab />
        <Tx>{R`**局部计算。**为了证明 \eqref{13.28} 确实是相应陈特征的积分，先注意到`}</Tx>
        <Eq n="13.29" title="Dirac 算子的平方（Lichnerowicz 型公式）" say={R`Dirac 算子的平方 = 协变 Laplace 算子 + 场强与自旋的耦合 $\frac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}$；正是后一项在迹中留下反常。`}>{R`\begin{aligned}(\mathrm{i}${DN})^2&=-\gamma^\mu\gamma^\nu\nabla_\mu\nabla_\nu=-\{\delta^{\mu\nu}+\tfrac12[\gamma^\mu,\gamma^\nu]\}\tfrac12[\{\nabla_\mu,\nabla_\nu\}+\mathcal{F}_{\mu\nu}]\\&=-\nabla_\mu\nabla^\mu-\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}\end{aligned}`}</Eq>
        <Tx>{R`这里用了 $[\nabla_\mu,\nabla_\nu]=\mathcal{F}_{\mu\nu}$（对称的 $\delta^{\mu\nu}$ 只与 $\frac12\{\nabla_\mu,\nabla_\nu\}$ 缩并出 $\nabla^2$，反对称的 $\frac12[\gamma^\mu,\gamma^\nu]$ 只与 $\frac12\mathcal{F}_{\mu\nu}$ 缩并）。于是`}</Tx>
        <Eq n="13.30" say={R`反常密度写成热核 $\exp[(\nabla^2+\frac14[\gamma,\gamma]\mathcal{F})/M^2]$ 的对角元的 $\gamma^{m+1}$ 迹。`}>{R`${AN}(x)=\sum_i\langle\psi_i|x\rangle\langle x|${G5}\exp[(\nabla^2+\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu})/${MR}^2]|\psi_i\rangle\Big|_{${MR}\to\infty}.`}</Eq>
        <Tx>{R`为确定起见取 $m=4$。引入平面波基

$$\langle x|\psi_i\rangle=\int\frac{\dd^4k}{(2\pi)^4}\langle x|k\rangle\langle k|\psi_i\rangle.$$

于是 \eqref{13.30} 变为`}</Tx>
        <Eq n="13.31" say={R`用平面波完备性把对本征函数的求和换成对动量的积分；$\nabla^2\to-k^2$，剩下一个 Gauss 积分乘以 $\gamma^5$ 与场强耦合项的迹。`}>{R`\begin{aligned}${AN}(x)&=\int\frac{\dd k}{(2\pi)^4}\int\frac{\dd k'}{(2\pi)^4}\sum_i\langle\psi_i|k'\rangle\langle k'|x\rangle\\&\qquad\times${G5}\exp[(\nabla^2+\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu})/${MR}^2]\langle x|k\rangle\langle k|\psi_i\rangle\Big|_{\substack{${MR}\to\infty\\ y\to x}}\\&=\int\frac{\dd k}{(2\pi)^4}${TR}\,${G5}\exp[(-k^2+\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu})/${MR}^2]_{${MR}\to\infty}\end{aligned}`}</Eq>
        <Tx>{R`这里用了完备性 $\sum_i\langle k|\psi_i\rangle\langle\psi_i|k'\rangle=(2\pi)^4\delta^4(k-k')$。在 \eqref{13.31} 中我们把 $\nabla^2$ 换成了符号 $-k^2$，因为含 $\mathcal{A}$ 的剩余项在 $M\to\infty$ 时不会存活（它们带更高的 $1/M$ 幂次，见下面的计数）。令 $\tilde k^\mu\equiv k^\mu/M$，\eqref{13.31} 化为

$$\boldsymbol{A}(x)=\Tr\big[\gamma^5\exp\big(\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}/M^2\big)\big]M^4\int\frac{\dd\tilde k}{(2\pi)^4}\exp(-\tilde k^2).$$

把第一个指数展开，并用

$$\Tr\gamma^5=\Tr\gamma^5\gamma^\mu\gamma^\nu=0\qquad\Tr\gamma^5\gamma^\kappa\gamma^\lambda\gamma^\mu\gamma^\nu=-4\epsilon^{\kappa\lambda\mu\nu}\qquad\int\dd\tilde k\,\exp(-\tilde k^2)=\pi^2$$

得到`}</Tx>
        <Eq n="13.32" keyEq title="反常密度的局部表达式" say={R`Gauss 积分给出 $M^4/16\pi^2$，恰好与展开的二阶项 $1/M^4$ 抵消；$\gamma^5$ 迹挑出 $\epsilon^{\kappa\lambda\mu\nu}$。结果有限、与 $M$ 无关，是陈特征 $\mathrm{ch}_2$ 的密度。`}>{R`\begin{aligned}${AN}(x)&=\frac12${TR}\Big[\gamma^5\frac1{4^2}\{[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}\}^2\Big]\frac1{16\pi^2}\\&=\frac{-1}{32\pi^2}${TR}\,\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}(x)\mathcal{F}_{\mu\nu}(x).\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{13.32} 的每一步与 $M$ 的幂次计数`} collapsed steps={[
          { tex: R`M^4\int\frac{\dd^4\tilde k}{(2\pi)^4}\mathrm{e}^{-\tilde k^2}=\frac{M^4\pi^2}{16\pi^4}=\frac{M^4}{16\pi^2}`, why: R`四维 Gauss 积分 $\int\dd^4\tilde k\,\mathrm{e}^{-\tilde k^2}=(\sqrt\pi)^4=\pi^2$。` },
          { tex: R`\exp(X/M^2)=1+\frac{X}{M^2}+\frac{X^2}{2M^4}+O(M^{-6}),\quad X=\tfrac14[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}`, why: R`$\Tr\gamma^5=0$、$\Tr\gamma^5\gamma^\mu\gamma^\nu=0$ 使前两项为零；$X^2/2M^4$ 乘 $M^4/16\pi^2$ 有限；更高阶项 $\propto M^{-2},M^{-4},\ldots\to0$。被我们换成 $-k^2$ 时丢掉的含 $\mathcal{A}$、$\partial$ 的项同样只带来 $1/M$ 的正幂次压低。` },
          { tex: R`[\gamma^\mu,\gamma^\nu]\mathcal{F}_{\mu\nu}=2\gamma^\mu\gamma^\nu\mathcal{F}_{\mu\nu}\ \Rightarrow\ X^2=\tfrac14\gamma^\kappa\gamma^\lambda\gamma^\mu\gamma^\nu\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}`, why: R`$\mathcal{F}_{\mu\nu}$ 反对称，$\gamma^\mu\gamma^\nu$ 中的对称部分 $\delta^{\mu\nu}$ 不贡献。` },
          { tex: R`\Tr_{\rm spin}\gamma^5X^2=\tfrac14(-4)\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}=-\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}`, why: R`用 $\Tr\gamma^5\gamma^\kappa\gamma^\lambda\gamma^\mu\gamma^\nu=-4\epsilon^{\kappa\lambda\mu\nu}$（$\gamma^5=-\gamma^1\gamma^2\gamma^3\gamma^4$）。` },
          { tex: R`\boldsymbol{A}(x)=\frac12\cdot\frac1{16\pi^2}\cdot(-1)\Tr\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}=-\frac1{32\pi^2}\Tr\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}`, why: R`剩下的 $\Tr$ 是对群指标求迹。` },
          { tex: R`\boldsymbol{A}(x)\,\dd^4x=-\frac1{8\pi^2}\Tr\mathcal{F}\wedge\mathcal{F}=\frac12\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^2=\mathrm{ch}_2(\mathcal{F})`, why: R`$\mathcal{F}\wedge\mathcal{F}=\frac14\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\frac14\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\dd^4x$。这就是 \eqref{13.34}。` },
        ]} />
        <Tx>{R`注意指数展开中的高阶项在 $M\to\infty$ 时消失。由 \eqref{13.25}，反常的守恒律现在成为`}</Tx>
        <Eq n="13.33" title="四维手征反常（欧氏）" say={R`把 \eqref{13.32} 代入 \eqref{13.25}：手征流的散度等于（$\mathrm{i}$ 乘）陈–Simons 流的散度——欧氏版本的 ABJ 反常。`}>{R`\begin{aligned}\partial_\mu j^\mu_5&=\frac{\mathrm{i}}{16\pi^2}${TR}\,\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\\&=\frac{\mathrm{i}}{4\pi^2}${TR}[\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\tfrac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)].\end{aligned}`}</Eq>
        <Tx>{R`这可以看作 AS 指标定理的**局部版本**。用场强形式 $\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$ 改写 \eqref{13.33}，容易验证（见上面推导的最后一步）`}</Tx>
        <Eq n="13.34" say={R`积分形式：正、负手征零模数之差 = 陈特征 $\mathrm{ch}_2$ 的积分 = 正规化 Jacobian 的积分，这就是背景几何平凡（$\hat A=1$）时扭曲旋量复形的指标定理。`}>{R`\nu_+-\nu_-=\int_M\dd x\,${AN}(x)=\frac{\mathrm{i}}2\int_M\dd x\,\partial_\mu j^\mu_{m+1}=\int_M${CH}_2(\mathcal{F}).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{13.33}–\eqref{13.35}、\eqref{13.113} 中 $\partial_\mu j^\mu$ 与 $\boldsymbol A$ 之间的因子（pp.528, 545）`}>{R`原书写作 $\partial_\mu j^\mu_5=\frac1{16\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}$ 与 $\nu_+-\nu_-=\int\dd x\,\partial_\mu j^\mu_{m+1}=\int\mathrm{ch}$。但本节自己的推导给出 $\partial_\mu j^\mu_{m+1}=-2\mathrm{i}\boldsymbol A$（\eqref{13.25}）与 $\boldsymbol A=-\frac1{32\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}$（\eqref{13.32}），二者相乘是 $+\frac{\mathrm{i}}{16\pi^2}$；而 $\nu_+-\nu_-=\int\boldsymbol A=\frac{\mathrm{i}}2\int\partial_\mu j^\mu$。原书的形式实际上是 Minkowski 版本 \eqref{13.5} 的系数（Wick 转动带出的 $\mathrm{i}$ 正好抵消），但在本节的欧氏约定下应带上这些因子。本站已在 \eqref{13.33}、\eqref{13.34}、\eqref{13.35}、\eqref{13.113} 中改正。**拓扑结论 $\nu_+-\nu_-=\int\boldsymbol A=\int\mathrm{ch}_l(\mathcal{F})$ 不受影响**。另外，$\int_M\partial_\mu j^\mu$ 对处处有定义的流本应为零；它在这里不为零，正说明有零模时 $\langle j^\mu\rangle$ 不是一个光滑的整体流（有零模时 $\mathrm{e}^{-W}=0$，需插入零模才能定义期望值），所以最好把 $\int\boldsymbol A$ 当作指标的**定义式**来读。`}</Box>
        <Tx>{R`这是背景几何平凡（$\hat A(TM)=1$）时**扭曲旋量复形**的指标定理（§12.6.2，\sref{F:spinAS12}）。对 $\dim M=m=2l$，有如下恒等式：`}</Tx>
        <Eq n="13.35" keyEq title="m 维阿贝尔反常 = 指标定理" say={R`任意偶数维：手征零模数之差 = 第 $l$ 个陈特征的积分。阿贝尔反常的积分是一个拓扑不变量。`}>{R`\nu_+-\nu_-=\frac{\mathrm{i}}{2}\int_M\dd x\,\partial_\mu j^\mu_{m+1}=\int_M${CH}_l(\mathcal{F})=\int_M\frac1{l!}${TR}\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^l.`}</Eq>
        <Stmt id="F:fujikawa13" />
        <Box kind="physics" title="为什么说反常是“拓扑的”">{R`(1) \eqref{13.28} 是整数，在 $\mathcal{A}$ 的连续形变下不能连续变化——所以反常的积分不会被高阶圈图修正（Adler–Bardeen 定理的几何根源）。(2) 局部密度 $\boldsymbol A(x)$ 是陈–Simons 流的散度，$\Tr\mathcal{F}^2=\dd\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$，所以在 $\R^4$ 上只有当规范场在无穷远处"缠绕"（瞬子）时积分才不为零；紧化到 $S^4$ 后它就是第 10 章的瞬子数。(3) Fujikawa 的 Gauss 截断恰好是第 12 章热核 $\mathrm{e}^{-tD^\dagger D}$ 的"超迹"，非零模成对抵消就是 McKean–Singer 论证（\sref{T12.5}）：路径积分推导本身就是指标定理的一个证明。`}</Box>
      </Sub>
    </Sec>);
}
