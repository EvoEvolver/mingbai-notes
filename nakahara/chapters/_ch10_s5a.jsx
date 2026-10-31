// §10.5.1–10.5.4 规范理论：U(1)、Dirac 单极子、Aharonov–Bohm 效应、Yang–Mills 理论 —— 式 (10.81)–(10.109)，
// 习题 10.12，图 10.4，交互图 2（单极子）
import { Sec, Sub, Tx, Eq, Box, Exercise, Derivation, Figure, C } from "@kit";
import { MonopoleLab } from "./_ch10_demos.jsx";
import { Sub1055 } from "./_ch10_s5b.jsx";

const R = String.raw;
const LG = R`\sym{lie}{\mathfrak{g}}`;
const GM = R`\sym{gm}{g}`;        // 单极强度
const EC = R`\sym{ech}{e}`;       // 电荷
const SP = R`\sym{pauli}{\sigma}`;
const AC = R`\sym{Acomp}{A}`;

export function Sec105() {
  return (
    <Sec n="10.5" title="Gauge theories" zh="规范理论"
      gist={R`规范势 = 主丛联络的局部形式，场强 = 曲率的局部形式。U(1)：Maxwell 方程一半是 Bianchi 恒等式；$S^2$ 上非平凡的 U(1) 丛给出 Dirac 单极子与 $2g\in\mathbb{Z}$；平坦但和乐非平凡的联络给出 Aharonov–Bohm 效应。SU(2)：Yang–Mills 方程 $\mathcal{D}*\mathcal{F}=0$；瞬子数 = 映射 $S^3\to\mathrm{SU}(2)$ 的度。`}
      why={R`把前几节的抽象结构落到物理上：哪些是"几何"（恒等式、量子化条件、拓扑数），哪些是"动力学"（作用量、运动方程）。`}
      gives={["10.82a", "10.83c", "10.85a", "10.88b", "10.89", "10.93", "10.94", "10.99", "10.100", "10.104", "10.106b", "10.108", "10.109", "10.120", "10.121", "10.128"]}>
      <Tx>{R`如前多次指出，规范势可以看作主丛中联络的局部表达式，Yang–Mills 场强则被认同为联络对应曲率的局部形式。本节从几何的观点总结规范理论的有关方面。`}</Tx>
      <Sub1051 />
      <Sub1052 />
      <Sub1053 />
      <Sub1054 />
      <Sub1055 />
    </Sec>);
}

function Sub1051() {
  return (
    <Sub n="10.5.1" title="U(1) gauge theory" zh="U(1) 规范理论">
      <p className="muted">本小节概念：<C id="bianchi" /></p>
      <Tx>{R`Maxwell 电磁理论由规范群 U(1) 描述。U(1) 是阿贝尔的一维群，因此省去所有群指标 $\alpha,\beta,\ldots$，并令结构常数 $f_{\alpha\beta}{}^\gamma=0$。设底空间 $M$ 是四维 Minkowski 时空。由 \sref{C9.1}（可缩底空间上的丛平凡），U(1) 丛 $P$ 是平凡的，即 $P=\mathbb{R}^4\times\mathrm{U}(1)$，只需在 $M$ 上用一个局部平凡化。规范势就是`}</Tx>
      <Eq n="10.81" say={R`平凡丛上只需一个整体的规范势：电磁四维矢势（乘以 $\mathrm{i}$）。`}>{R`\mathcal{A}=\mathcal{A}_\mu\dd x^\mu.`}</Eq>
      <Tx>{R`我们的规范势 $\mathcal{A}$ 与通常的矢势 $A$ 相差李代数因子 $\mathrm{i}$：$\mathcal{A}_\mu=\mathrm{i}A_\mu$。场强为`}</Tx>
      <Eq n="10.82a" say={R`阿贝尔情形 $\mathcal{A}\wedge\mathcal{A}=0$，场强就是势的外微分。`}>{R`\mathcal{F}=\dd\mathcal{A}.`}</Eq>
      <Tx>{R`写成分量，`}</Tx>
      <Eq n="10.82b" say={R`电磁场强张量：矢势的四维"旋度"。`}>{R`\mathcal{F}_{\mu\nu}=\partial\mathcal{A}_\nu/\partial x^\mu-\partial\mathcal{A}_\mu/\partial x^\nu.`}</Eq>
      <Tx>{R`$\mathcal{F}$ 满足 Bianchi 恒等式 \eqref{10.46}：`}</Tx>
      <Eq n="10.83a" say={R`阿贝尔的 Bianchi 恒等式：场强是闭形式。`}>{R`\dd\mathcal{F}=\mathcal{F}\wedge\mathcal{A}-\mathcal{A}\wedge\mathcal{F}=0.`}</Eq>
      <Tx>{R`这从一开始就可以预期：$\mathcal{F}$ 是恰当的，$\mathcal{F}=\dd\mathcal{A}$，从而是闭的，$\dd\mathcal{F}=\dd^2\mathcal{A}=0$。（对阿贝尔群，$\mathcal{F}\wedge\mathcal{A}-\mathcal{A}\wedge\mathcal{F}=0$ 因为二形式与一形式可交换，系数又是数。）写成分量，`}</Tx>
      <Eq n="10.83b" say={R`Bianchi 恒等式的分量形式：场强对三个指标的循环导数和为零。`}>{R`\partial_\lambda\mathcal{F}_{\mu\nu}+\partial_\nu\mathcal{F}_{\lambda\mu}+\partial_\mu\mathcal{F}_{\nu\lambda}=0.`}</Eq>
      <Tx>{R`若把分量 $\mathcal{F}_{\mu\nu}\equiv\mathrm{i}F_{\mu\nu}$ 与电场 $\boldsymbol E$、磁场 $\boldsymbol B$ 认同为`}</Tx>
      <Eq n="10.84" say={R`场强张量的时空分量是电场，空间分量是磁场。`}>{R`E_i=F_{i0},\ B_i=\tfrac12\epsilon_{ijk}F_{jk}\qquad(i,j,k=1,2,3)`}</Eq>
      <Tx>{R`\eqref{10.83b} 就化为 Maxwell 方程中的两个：`}</Tx>
      <Eq n="10.83c" title="齐次 Maxwell 方程" say={R`没有磁荷、法拉第电磁感应定律：这两条 Maxwell 方程不是动力学，而是"场强是某个势的外微分"的几何推论。`}>{R`\nabla\times\boldsymbol E+\frac{\partial\boldsymbol B}{\partial t}=0\qquad\nabla\cdot\boldsymbol B=0.`}</Eq>
      <Derivation title="补全：由 (10.83b) 得 (10.83c)" collapsed steps={[
        { tex: R`(\lambda,\mu,\nu)=(1,2,3):\ \partial_1F_{23}+\partial_3F_{12}+\partial_2F_{31}=\partial_1B_1+\partial_3B_3+\partial_2B_2=\nabla\cdot\boldsymbol B=0`, why: R`$F_{23}=B_1$、$F_{31}=B_2$、$F_{12}=B_3$（由 \eqref{10.84}）。` },
        { tex: R`(\lambda,\mu,\nu)=(0,j,k):\ \partial_0F_{jk}+\partial_kF_{0j}+\partial_jF_{k0}=\epsilon_{ijk}\partial_tB_i-\partial_kE_j+\partial_jE_k=0`, why: R`$F_{0j}=-E_j$、$F_{k0}=E_k$。` },
        { tex: R`\text{乘 }\tfrac12\epsilon_{ljk}\text{ 求和}:\ \partial_tB_l+(\nabla\times\boldsymbol E)_l=0`, why: R`$\frac12\epsilon_{ljk}(\partial_jE_k-\partial_kE_j)=(\nabla\times\boldsymbol E)_l$。` },
      ]} />
      <Tx>{R`这些方程是**几何的**而不是**动力学的**。要得到动力学，必须给出作用量。**Maxwell 作用量** $\mathcal{S}_{\rm M}[\mathcal{A}]$ 是 $\mathcal{A}$ 的泛函：`}</Tx>
      <Eq n="10.85a" title="Maxwell 作用量" say={R`Maxwell 作用量：场强平方的时空积分；由于 $\mathcal{F}=\mathrm{i}F$，两种写法差一个负号。`}>{R`\mathcal{S}_{\rm M}[\mathcal{A}]\equiv\frac14\int_{\mathbb{R}^4}\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\dd^4x=-\frac14\int_{\mathbb{R}^4}F_{\mu\nu}F^{\mu\nu}\dd^4x.`}</Eq>
      <Exercise n="10.12" title="作用量的形式写法与电磁不变量" level="★★"
        hint={R`(a) 先证明二形式的恒等式 $\mathcal{F}\wedge*\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\,\dd x^0\wedge\dd x^1\wedge\dd x^2\wedge\dd x^3$（第 7 章 $\omega\wedge*\omega=\frac1{r!}\omega_{\mu_1\ldots}\omega^{\mu_1\ldots}\sqrt{|g|}\dd^mx$ 的特例）。(b) 把 $F_{\mu\nu}F^{\mu\nu}$ 拆成 $2F_{0i}F^{0i}+F_{ij}F^{ij}$；对 $F_{\mu\nu}*F^{\mu\nu}$，只有"一个时间指标对一对空间指标"的项存活。`}
        solution={R`**(a)** 用第 7 章的 Hodge 星（$\epsilon_{0123}=+1$，$\eta=\mathrm{diag}(-1,1,1,1)$）：$*\mathcal{F}=\frac12(*\mathcal{F})_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，$(*\mathcal{F})_{\mu\nu}=\frac12\mathcal{F}^{\kappa\lambda}\varepsilon_{\kappa\lambda\mu\nu}$，与题中定义一致。直接展开（或用 $\omega\wedge*\omega=\frac1{r!}\omega_{\mu\ldots}\omega^{\mu\ldots}\mathrm{vol}$）得

$$\mathcal{F}\wedge*\mathcal{F}=\tfrac12\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\,\dd^4x,$$

所以 $\mathcal{S}_{\rm M}=\frac14\int\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\dd^4x=\frac12\int\mathcal{F}\wedge*\mathcal{F}$。这与原书印的 $-\frac14$ 不同，见下方勘误框（本站用随机反对称矩阵逐项数值核对了这一恒等式，比值精确为 $\frac12$）。

**(b)** $F_{\mu\nu}F^{\mu\nu}=2F_{0i}F^{0i}+F_{ij}F^{ij}=-2\sum_iF_{i0}^2+\sum_{i,j}F_{ij}^2=-2\boldsymbol E^2+2\boldsymbol B^2$（$F^{0i}=-F_{0i}$；$\sum_{ij}F_{ij}^2=2\boldsymbol B^2$），所以 $-\frac14F_{\mu\nu}F^{\mu\nu}=\frac12(\boldsymbol E^2-\boldsymbol B^2)$，即 \eqref{10.86}。（换成 $\mathrm{diag}(1,-1,-1,-1)$ 结果相同，因为每项含偶数个升指标的符号。）

对 \eqref{10.87}：$F_{\mu\nu}*F^{\mu\nu}=\frac12\varepsilon^{\kappa\lambda\mu\nu}F_{\kappa\lambda}F_{\mu\nu}$。非零项要求四个指标互异，于是 $(\kappa\lambda)$、$(\mu\nu)$ 中恰有一对含时间指标 $0$；按 $0$ 落在哪一对、在对中的哪个位置，共 4 种情形，每种都给出 $\varepsilon^{0ijk}F_{0i}F_{jk}$（交换一对指标时 $\varepsilon$ 与 $F$ 同时变号）。用 $\varepsilon^{0ijk}=\varepsilon^{0123}\epsilon_{ijk}$、$\epsilon_{ijk}F_{jk}=2B_i$、$F_{0i}=-E_i$：

$$F_{\mu\nu}*F^{\mu\nu}=\tfrac12\cdot4\,\varepsilon^{0123}\epsilon_{ijk}F_{0i}F_{jk}=4\varepsilon^{0123}F_{0i}B_i=-4\varepsilon^{0123}\,\boldsymbol E\cdot\boldsymbol B=4\,\boldsymbol E\cdot\boldsymbol B\qquad(\varepsilon_{0123}=+1\Rightarrow\varepsilon^{0123}=-1).$$

即应有因子 $4$（数值核对：随机 $F$ 下比值精确为 $4$）。$\boldsymbol E\cdot\boldsymbol B$ 是第二个 Lorentz 不变量，它的四维积分就是 U(1) 的"$\theta$ 项"，是全导数——与 \secref{10.5.5} 的 $\Tr\mathcal{F}^2=\dd K$ 同源。`}>
        <Tx>{R`(a) 设 $*\mathcal{F}_{\mu\nu}\equiv\frac12\mathcal{F}^{\kappa\lambda}\varepsilon_{\kappa\lambda\mu\nu}$ 是 $\mathcal{F}_{\mu\nu}$ 的对偶。证明`}</Tx>
        <Eq n="10.85b" say={R`Maxwell 作用量的无坐标写法：场强与其 Hodge 对偶的外积在时空上的积分（系数见勘误）。`}>{R`\mathcal{S}_{\rm M}[\mathcal{A}]=\frac12\int_{\mathbb{R}^4}\mathcal{F}\wedge*\mathcal{F}.`}</Eq>
        <Tx>{R`(b) 用 \eqref{10.84} 证明`}</Tx>
        <Eq n="10.86" say={R`Maxwell 拉氏密度就是电场能与磁场能之差的一半。`}>{R`-\tfrac14F_{\mu\nu}F^{\mu\nu}=\tfrac12(\boldsymbol E^2-\boldsymbol B^2).`}</Eq>
        <Tx>{R`再证明`}</Tx>
        <Eq n="10.87" say={R`场强与其对偶的缩并正比于 $\boldsymbol E\cdot\boldsymbol B$：电磁场的第二个 Lorentz 不变量。`}>{R`F_{\mu\nu}*F^{\mu\nu}=4\,\boldsymbol B\cdot\boldsymbol E.`}</Eq>
      </Exercise>
      <Box kind="warning" title={R`勘误：\eqref{10.85b} 的系数与 \eqref{10.87} 的因子 4（p.420）`}>{R`**\eqref{10.85b}**：原书印作 $\mathcal{S}_{\rm M}=-\frac14\int\mathcal{F}\wedge*\mathcal{F}$。约定同第 7 章：Levi-Civita 符号 $\varepsilon_{0123}=+1$（\eqref{7.171a}，坐标次序 $x^0,x^1,x^2,x^3$），指标用 Minkowski 度规 $\eta=\mathrm{diag}(-1,1,1,1)$（\secref{7.1}）升降，故 $\varepsilon^{0123}=-1$（\eqref{7.171b}）；Hodge 星按 \eqref{7.172}（题中的 $*\mathcal{F}_{\mu\nu}=\frac12\mathcal{F}^{\kappa\lambda}\varepsilon_{\kappa\lambda\mu\nu}$ 就是 \eqref{7.173} 取 $r=2$）。恒等式 $\mathcal{F}\wedge*\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\dd^4x$ 正是 \eqref{7.178} 取 $r=2$（它对任何号差都成立，与 $\varepsilon$ 的符号约定无关） 给出 $\mathcal{S}_{\rm M}=\frac14\int\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\dd^4x=+\frac12\int\mathcal{F}\wedge*\mathcal{F}$。这与原书自己在 \eqref{10.108} 右端写的 $\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})$ 一致。

**\eqref{10.87}**：原书印作 $F_{\mu\nu}*F^{\mu\nu}=\boldsymbol B\cdot\boldsymbol E$。按同样的定义，$F_{\mu\nu}*F^{\mu\nu}=4\boldsymbol E\cdot\boldsymbol B$（取 $\varepsilon_{0123}=+1$；若取 $\varepsilon^{0123}=+1$ 则为 $-4\boldsymbol E\cdot\boldsymbol B$）。

两式都已用随机场强做逐项数值核对（Minkowski 度规 $\mathrm{diag}(-1,1,1,1)$，比值分别精确为 $\frac12$ 与 $4$）。正文已改正。`}</Box>
      <Tx>{R`对 $\mathcal{S}_{\rm M}[\mathcal{A}]$ 关于 $\mathcal{A}_\mu$ 变分，得到运动方程`}</Tx>
      <Eq n="10.88a" say={R`Maxwell 作用量的 Euler–Lagrange 方程：场强的四维散度为零（真空中无源）。`}>{R`\partial_\mu\mathcal{F}^{\mu\nu}=0.`}</Eq>
      <Tx>{R`这个方程化为（真空中的）另一组 Maxwell 方程：`}</Tx>
      <Eq n="10.88b" title="非齐次 Maxwell 方程（真空）" say={R`Gauss 定律与 Ampère–Maxwell 定律：它们来自作用量，是真正的动力学方程。`}>{R`\nabla\cdot\boldsymbol E=0\qquad\nabla\times\boldsymbol B-\frac{\partial\boldsymbol E}{\partial t}=0.`}</Eq>
      <Derivation title="补全：变分与分量" collapsed steps={[
        { tex: R`\delta\mathcal{S}_{\rm M}=\frac12\int\mathcal{F}^{\mu\nu}\delta\mathcal{F}_{\mu\nu}\dd^4x=\int\mathcal{F}^{\mu\nu}\partial_\mu\delta\mathcal{A}_\nu\dd^4x=-\int\partial_\mu\mathcal{F}^{\mu\nu}\,\delta\mathcal{A}_\nu\dd^4x`, why: R`$\delta\mathcal{F}_{\mu\nu}=\partial_\mu\delta\mathcal{A}_\nu-\partial_\nu\delta\mathcal{A}_\mu$，两项由反对称性相等；分部积分，边界项为零。` },
        { tex: R`\nu=0:\ \partial_iF^{i0}=-\partial_iF_{i0}=-\nabla\cdot\boldsymbol E=0`, why: R`在 $\mathrm{diag}(-1,1,1,1)$ 下 $F^{i0}=-F_{i0}=-E_i$（$\mathcal{F}=\mathrm{i}F$，常数因子不影响"$=0$"）。` },
        { tex: R`\nu=j:\ \partial_0F^{0j}+\partial_iF^{ij}=\partial_tE_j-(\nabla\times\boldsymbol B)_j=0`, why: R`$F^{0j}=-F_{0j}=F_{j0}=E_j$；$F^{ij}=F_{ij}=\epsilon_{ijk}B_k$，$\partial_i\epsilon_{ijk}B_k=-(\nabla\times\boldsymbol B)_j$。` },
      ]} />
    </Sub>);
}

function Sub1052() {
  return (
    <Sub n="10.5.2" title="The Dirac magnetic monopole" zh="Dirac 磁单极子">
      <p className="muted">本小节概念：<C id="monopole" /></p>
      <Tx>{R`**从平凡到非平凡。**上面在 $\mathbb{R}^4$ 上研究了 Maxwell 理论：底空间平凡使 U(1) 丛平凡，Poincaré 引理（\sref{T6.3}）保证场强 $\mathcal{F}$ 整体恰当：$\mathcal{F}=\dd\mathcal{A}$。把分析推广到非平凡底空间上的 U(1) 丛是有趣的。为简单起见，设一切与时间无关。

Dirac 单极子定义在挖去原点 O 的 $\mathbb{R}^3$ 中。$\mathbb{R}^3-\{0\}$ 与 $S^2$ 同伦型相同，相关的丛是 U(1) 丛 $P(S^2,\mathrm{U}(1))$。$S^2$ 由两块坐标卡覆盖：

$$U_{\rm N}\equiv\{(\theta,\phi)\mid0\le\theta\le\tfrac12\pi+\epsilon\}\qquad U_{\rm S}\equiv\{(\theta,\phi)\mid\tfrac12\pi-\epsilon\le\theta\le\pi\}$$

其中 $\theta$、$\phi$ 是极坐标。设 $\omega$ 是 $P$ 上的 Ehresmann 联络。在 $U_{\rm N}$（$U_{\rm S}$）上取局部截面 $\sigma_{\rm N}$（$\sigma_{\rm S}$），定义局部规范势 $\mathcal{A}_{\rm N}=\sigma_{\rm N}^*\omega$、$\mathcal{A}_{\rm S}=\sigma_{\rm S}^*\omega$。取 $\mathcal{A}_{\rm N}$、$\mathcal{A}_{\rm S}$ 为 Wu–Yang 形式（§1.9）：`}</Tx>
      <Eq n="10.89" title="Wu–Yang 单极子势" say={R`单极子的两块规范势：北势在南极奇异、南势在北极奇异，各自只在自己的半球（加一条重叠带）上使用。`}>{R`\mathcal{A}_{\rm N}=\mathrm{i}${GM}(1-\cos\theta)\dd\phi\qquad\mathcal{A}_{\rm S}=-\mathrm{i}${GM}(1+\cos\theta)\dd\phi`}</Eq>
      <Tx>{R`其中 $${GM}$ 是单极子的强度。（在北极 $\theta=0$，$1-\cos\theta\sim\theta^2/2$ 抵消了 $\dd\phi$ 的奇异性，$\mathcal{A}_{\rm N}$ 光滑；$\mathcal{A}_{\rm S}$ 在南极同理。）

**转移函数。**设 $t_{\rm NS}$ 是定义在赤道 $U_{\rm N}\cap U_{\rm S}$ 上的转移函数。$t_{\rm NS}$ 定义了从 $S^1$（赤道）到 U(1)（结构群）的映射，按 $\pi_1(\mathrm{U}(1))=\mathbb{Z}$ 分类（见例 9.7）。写成`}</Tx>
      <Eq n="10.90" say={R`赤道上的转移函数是一个相位，由实函数 $\varphi(\phi)$ 给出。`}>{R`t_{\rm NS}(\phi)=\exp[\mathrm{i}\varphi(\phi)]\qquad(\varphi:S^1\to\mathbb{R}).`}</Eq>
      <Tx>{R`规范势 $\mathcal{A}_{\rm N}$ 与 $\mathcal{A}_{\rm S}$ 在 $U_{\rm N}\cap U_{\rm S}$ 上的关系为`}</Tx>
      <Eq n="10.91" say={R`赤道上，北势等于南势加上转移函数的"对数导数"：这是相容条件 \eqref{10.9} 在单极子上的具体形式。`}>{R`\mathcal{A}_{\rm N}=t_{\rm NS}^{-1}\mathcal{A}_{\rm S}t_{\rm NS}+t_{\rm NS}^{-1}\dd t_{\rm NS}=\mathcal{A}_{\rm S}+\mathrm{i}\dd\varphi.`}</Eq>
      <Box kind="note" title={R`记号注记：这里的 $t_{\rm NS}$ 扮演 \eqref{10.9} 中 $t_{\rm SN}$ 的角色`}>{R`按 \eqref{10.9} 的约定（$\sigma_j=\sigma_it_{ij}$，$\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}$），\eqref{10.91} 对应 $i=\mathrm{S}$、$j=\mathrm{N}$，即 $\sigma_{\rm N}=\sigma_{\rm S}t_{\rm NS}$。原书在这里把它记作 $t_{\rm NS}$（例 10.8 中又把 $\sigma_{\rm S}=\sigma_{\rm N}g$ 的 $g$ 称为 $t_{\rm NS}$）。U(1) 阿贝尔，$t_{\rm SN}=t_{\rm NS}^{-1}$，命名的差别只改变卷绕数的符号，不影响量子化条件。`}</Box>
      <Tx>{R`对 \eqref{10.89} 的规范势，

$$\dd\varphi=-\mathrm{i}(\mathcal{A}_{\rm N}-\mathcal{A}_{\rm S})=2${GM}\,\dd\phi.$$

当 $\phi$ 沿赤道从 $0$ 走到 $2\pi$，$\varphi(\phi)$ 的变化范围为`}</Tx>
      <Eq n="10.92" say={R`沿赤道一圈，转移函数的相位总共增加 $4\pi g$。`}>{R`\Delta\varphi\equiv\oint\dd\varphi=\int_0^{2\pi}2${GM}\,\dd\phi=4\pi${GM}.`}</Eq>
      <Tx>{R`要使 $t_{\rm NS}$ 唯一确定（单值），$\Delta\varphi$ 必须是 $2\pi$ 的倍数：`}</Tx>
      <Eq n="10.93" keyEq title="Dirac 量子化条件" say={R`磁单极强度的量子化：转移函数沿赤道必须单值，所以 $2g$ 只能是整数——它就是丛所属的同伦类。`}>{R`\Delta\varphi/2\pi=2${GM}\in\mathbb{Z}`}</Eq>
      <Tx>{R`这就是磁单极子的**量子化条件**。整数 $2${GM}$ 表示这个丛所属的同伦类。这个数也可以通过考虑 $F_{\rm N}=\dd A_{\rm N}$、$F_{\rm S}=\dd A_{\rm S}$（$\mathcal{F}_{\rm N}=\mathrm{i}F_{\rm N}$ 等）得到。总通量 $\Phi$ 为`}</Tx>
      <Eq n="10.94" title="单极子总通量" say={R`穿过球面的总磁通：两块半球各用自己的势做 Stokes 定理，剩下的只是赤道上两个势之差的积分——它由转移函数的卷绕数决定。`}>{R`\Phi=\int_{S^2}\boldsymbol B\cdot\dd\boldsymbol S=\int_{U_{\rm N}}\dd A_{\rm N}+\int_{U_{\rm S}}\dd A_{\rm S}=\int_{S^1}A_{\rm N}-\int_{S^1}A_{\rm S}=2${GM}\int_0^{2\pi}\dd\phi=4\pi${GM}.`}</Eq>
      <Tx>{R`（这里 $U_{\rm N}$、$U_{\rm S}$ 取成以赤道为界的两个闭半球；北半球的边界是逆时针的赤道，南半球的边界是顺时针的赤道，所以出现相减。）因此曲率——即场强的一对 $\dd A_{\rm N}$ 与 $\dd A_{\rm S}$——刻画了丛的扭曲。第 11 章将进一步讨论：$\frac1{2\pi}\int_{S^2}F=2${GM}$ 就是第一陈数。`}</Tx>
      <Box kind="physics" title="与球面切丛的联系">{R`交互图 1 中，$S^2$ 上平行移动的转角在北极正则的标架下是 $\oint(1-\cos\theta)\dd\phi$——与 \eqref{10.89} 的 $\mathcal{A}_{\rm N}/\mathrm{i}$ 在 $${GM}=1$ 时完全相同。也就是说，$S^2$ 的切丛（看作复线丛，即全纯切丛 $TS^{2+}$）正是 $2${GM}=2$ 的单极子丛：它的"总通量" $4\pi$ 等于 $2\pi\chi(S^2)$（Gauss–Bonnet），而 Euler 数 $\chi=2$ 就是转移函数的卷绕数。这也是"不能给毛球梳平毛"的丛论解释。`}</Box>
      <MonopoleLab />
    </Sub>);
}

function Sub1053() {
  return (
    <Sub n="10.5.3" title="The Aharonov–Bohm effect" zh="Aharonov–Bohm 效应">
      <p className="muted">本小节概念：<C id="ab_effect" /> · <C id="holonomy" /></p>
      <Tx>{R`**势比场更基本？**在电磁学的初等学习中，电场与磁场（即 $F_{\mu\nu}$）是中心对象，矢势 $\boldsymbol A$ 与标势 $\varphi=A_0$ 被认为是次要的。但在量子力学中，有许多情形 $F_{\mu\nu}$ 不足以描述现象，必须用 $A_\mu=(\boldsymbol A,A_0)$。**Aharonov–Bohm 效应**就是其中之一。

Aharonov–Bohm（AB）实验如 \figref{10.4} 所示。电荷为 $${EC}$ 的电子束从左边远处入射，在屏 C 上形成干涉图样。束流中间放一个无限长的螺线管；屏障 S 阻止电子进入螺线管。因此电子完全感受不到磁场。那么规范场 $A_\mu$ 呢？`}</Tx>
      <Figure n="10.4" caption={R`Aharonov–Bohm 实验。螺线管外 $\boldsymbol B=0$。`} width="55%" />
      <Tx>{R`为简单起见，让螺线管半径趋于无穷小，同时保持总通量 $\Phi=\int_S\boldsymbol B\cdot\dd\boldsymbol S$ 不变。容易验证`}</Tx>
      <Eq n="10.95" say={R`无限细螺线管外的矢势：绕螺线管旋转、按 $1/r$ 衰减；它的旋度为零，但绕一圈的环量等于管内磁通。`}>{R`\boldsymbol A(\boldsymbol r)=\Big(-\frac{y\Phi}{2\pi r^2},\frac{x\Phi}{2\pi r^2},0\Big)\qquad A_0=0`}</Eq>
      <Tx>{R`满足 $\int(\nabla\times\boldsymbol A)\cdot\dd\boldsymbol S=\Phi$ 且对 $r\neq0$ 有 $\nabla\times\boldsymbol A=\boldsymbol0$。（$\boldsymbol A=\frac{\Phi}{2\pi}\nabla\theta$ 局部是梯度，但 $\theta$ 不是单值函数——这正是第 6 章习题 6.3 的角形式。）螺线管外矢势不为零。经典地，螺线管对电子没有任何影响，因为 Lorentz 力 $${EC}(\boldsymbol v\times\boldsymbol B)$ 在电子束经过的路径上为零。

量子力学中，这个体系的哈密顿量为`}</Tx>
      <Eq n="10.96" say={R`带电粒子在矢势中的哈密顿量：动量被"最小耦合"换成 $\partial_\mu-\mathrm{i}eA_\mu$。`}>{R`\mathcal{H}=-\frac1{2m}\Big(\frac{\partial}{\partial x^\mu}-\mathrm{i}${EC}A_\mu\Big)^2+V(\boldsymbol r)`}</Eq>
      <Tx>{R`其中 $V(\boldsymbol r)$ 代表实验装置的作用。半经典地，可以区分 \figref{10.4} 中的路径 $\gamma_{\rm I}$ 与 $\gamma_{\rm II}$。当 $\boldsymbol A=0$ 时，把对应 $\gamma_{\rm I}$（$\gamma_{\rm II}$）的波函数记作 $\psi_{\rm I}$（$\psi_{\rm II}$）。若 $\boldsymbol A\neq0$，波函数由规范变换后的形式给出：`}</Tx>
      <Eq n="10.97" say={R`有矢势时，沿某条路径传播的波函数多出一个相位：矢势沿路径的线积分乘以电荷。`}>{R`\psi^{\boldsymbol A}_i(\boldsymbol r)\equiv\exp\Big(\mathrm{i}${EC}\int_P^{\boldsymbol r}\boldsymbol A(\boldsymbol r')\cdot\dd\boldsymbol r'\Big)\psi_i(\boldsymbol r)\qquad(i=\mathrm{I},\mathrm{II})`}</Eq>
      <Tx>{R`其中 $P$ 是远离装置的参考点。（在单连通区域内，这个相位因子把 $\mathcal{H}$ 中的 $\partial-\mathrm{i}eA$ 变回 $\partial$：$(\partial_\mu-\mathrm{i}${EC}A_\mu)\psi^{\boldsymbol A}=e^{\mathrm{i}${EC}\int\boldsymbol A}\partial_\mu\psi$；沿两条路径各自所在的单连通区域都成立。）考虑叠加 $\psi_{\rm I}^{\boldsymbol A}+\psi_{\rm II}^{\boldsymbol A}$，使 $\psi_{\rm I}^{\boldsymbol A}(P)=\psi_{\rm II}^{\boldsymbol A}(P)$。它在屏上一点 $Q$ 的振幅为`}</Tx>
      <Eq n="10.98" say={R`两条路径的振幅之和：提出公共相位后，相对相位是矢势沿闭路 $\gamma_{\rm I}-\gamma_{\rm II}$ 的环量，即和乐。`}>{R`\begin{aligned}\psi_{\rm I}^{\boldsymbol A}(Q)+\psi_{\rm II}^{\boldsymbol A}(Q)&=\exp\Big(\mathrm{i}${EC}\int_{\gamma_{\rm I}}\boldsymbol A(\boldsymbol r')\cdot\dd\boldsymbol r'\Big)\psi_{\rm I}(Q)+\exp\Big(\mathrm{i}${EC}\int_{\gamma_{\rm II}}\boldsymbol A(\boldsymbol r')\cdot\dd\boldsymbol r'\Big)\psi_{\rm II}(Q)\\&=\exp\Big(\mathrm{i}${EC}\int_{\gamma_{\rm II}}\boldsymbol A\cdot\dd\boldsymbol r'\Big)\Big[\exp\Big(\mathrm{i}${EC}\oint_\gamma\boldsymbol A\cdot\dd\boldsymbol r'\Big)\psi_{\rm I}(Q)+\psi_{\rm II}(Q)\Big]\end{aligned}`}</Eq>
      <Tx>{R`其中 $\gamma\equiv\gamma_{\rm I}-\gamma_{\rm II}$。显然，尽管电子经过的空间各点 $\boldsymbol B=0$，波函数仍依赖于矢势 $\boldsymbol A$。由 Stokes 定理，`}</Tx>
      <Eq n="10.99" say={R`沿包围螺线管的闭路，矢势的环量等于穿过任一张以它为边界的曲面的磁通——而磁通全部集中在电子到不了的管内。`}>{R`\oint_\gamma\boldsymbol A\cdot\dd\boldsymbol r'=\int_S(\nabla\times\boldsymbol A)\cdot\dd\boldsymbol S=\int_S\boldsymbol B\cdot\dd\boldsymbol S=\Phi`}</Eq>
      <Tx>{R`其中 $S$ 是以 $\gamma$ 为边界的曲面（它必须穿过螺线管——在 $M=\mathbb{R}^2-\{0\}$ 内部没有这样的曲面，这里的 Stokes 定理是在包含螺线管的 $\mathbb{R}^2$ 中使用的）。由此与 \eqref{10.98}，若两个通量值 $\Phi_{\rm a}$、$\Phi_{\rm b}$ 满足`}</Tx>
      <Eq n="10.100" title="AB 效应的周期性" say={R`干涉图样随磁通周期变化，周期是磁通量子 $2\pi/e$：只有和乐 $e^{\mathrm{i}e\Phi}$ 是可观测的。`}>{R`${EC}(\Phi_{\rm a}-\Phi_{\rm b})=2\pi n\qquad n\in\mathbb{Z}`}</Eq>
      <Tx>{R`则干涉图样相同。

**背后的几何。**问题本质上是二维的，考虑区域 $M=\mathbb{R}^2-\{\boldsymbol0\}$，螺线管在原点。相关的丛是主丛 $P(M,\mathrm{U}(1))$ 及其相伴丛 $E=P\times_\rho\mathbb{C}$，U(1) 以显然的方式作用在 $\mathbb{C}$ 上。$E$ 是 $M$ 上的复线丛，它的截面是波函数 $\psi$。

定义李代数值一形式 $\mathcal{A}=\mathrm{i}A=\mathrm{i}A_\mu\dd x^\mu$。与这个局部联络相关的协变导数为 $\mathcal{D}=\dd+\mathcal{A}$，$\boldsymbol A$ 由 \eqref{10.95} 给出。由于 $\dd\mathcal{A}=\mathcal{F}=0$，这个联络是**局部平坦**的。考虑包围原点处螺线管的单位圆 $S^1$，参数化为 $e^{\mathrm{i}\theta}$（$0\le\theta\le2\pi$），$S^1$ 上的联络写成`}</Tx>
      <Eq n="10.101" say={R`单位圆上的 AB 联络：一个常系数乘以 $\dd\theta$——处处平坦，但绕一圈积出 $\mathrm{i}\Phi$。`}>{R`\mathcal{A}=\mathrm{i}\frac{\Phi}{2\pi}\dd\theta.`}</Eq>
      <Tx>{R`这由 \eqref{10.95} 令 $r=1$ 得到。要求波函数 $\psi$ 沿 $S^1$ 相对于这个局部联络平行移动，即`}</Tx>
      <Eq n="10.102" say={R`平行移动条件：波函数沿圆周的协变导数为零。`}>{R`\mathcal{D}\psi(\theta)=\Big(\dd+\mathrm{i}\frac{\Phi}{2\pi}\dd\theta\Big)\psi(\theta)=0.`}</Eq>
      <Tx>{R`\eqref{10.102} 的解很容易求出：`}</Tx>
      <Eq n="10.103" say={R`平行移动的波函数沿圆周均匀地旋转相位，绕一圈转过 $\Phi$。`}>{R`\psi(\theta)=e^{-\mathrm{i}\Phi\theta/2\pi}.`}</Eq>
      <Tx>{R`取这样的截面 $\psi$ 相当于忽略电子的速度。和乐 $\Gamma:\pi^{-1}(\theta=0)\to\pi^{-1}(\theta=2\pi)=\pi^{-1}(\theta=0)$ 为`}</Tx>
      <Eq n="10.104" keyEq title="AB 和乐" say={R`绕螺线管一圈的和乐是相位 $e^{-\mathrm{i}\Phi}$：曲率为零，和乐却非平凡——它来自空间的洞，而不是来自局部的场。`}>{R`\Gamma:\psi(0)\longmapsto e^{-\mathrm{i}\Phi}\psi(0).`}</Eq>
      <Box kind="note" title="存疑：电荷与符号约定">{R`本小节前后用了两套约定。\eqref{10.96}–\eqref{10.97} 中协变导数是 $\partial_\mu-\mathrm{i}${EC}A_\mu$，绕一圈的相位是 $e^{+\mathrm{i}${EC}\Phi}$；而丛的部分用 $\mathcal{D}=\dd+\mathrm{i}A$（电荷吸收进 $A$，且符号相反），得到 $e^{-\mathrm{i}\Phi}$。与 \eqref{10.96} 一致的联络应是 $\mathcal{A}=-\mathrm{i}${EC}A$，此时和乐为 $e^{+\mathrm{i}${EC}\Phi}$。两种写法的物理内容（干涉条纹以 $2\pi/${EC}$ 为周期）完全相同；本站保留原书的公式，只在此提醒读者不要混用。`}</Box>
      <Tx>{R`实验上用了环形的坡莫合金（20% Fe、80% Ni）以消除边缘效应（Tonomura 等 1983）。坡莫合金的尺寸为数微米，并镀金以防电子穿入磁场。

**丛论的教训。**这个联络的曲率处处为零，所以由 Ambrose–Singer 定理，限制和乐群平凡；但 $\pi_1(M)=\mathbb{Z}$，绕原点的闭路给出非平凡的和乐 $e^{-\mathrm{i}n\Phi}$。和乐群（$\{e^{-\mathrm{i}n\Phi}\}$，$\Phi/2\pi$ 无理时在 U(1) 中稠密）是联络的真正可观测量——这正是例 10.2–10.3 的螺旋线在物理中的化身。`}</Tx>
    </Sub>);
}

function Sub1054() {
  return (
    <Sub n="10.5.4" title="Yang–Mills theory" zh="Yang–Mills 理论">
      <p className="muted">本小节概念：<C id="curvature" /></p>
      <Tx>{R`考虑定义在 $\mathbb{R}^4$ 上的 SU(2) 规范理论。描述它的丛是 $P(\mathbb{R}^4,\mathrm{SU}(2))$。由于 $\mathbb{R}^4$ 可缩，只有一个规范势`}</Tx>
      <Eq n="10.105" say={R`SU(2) 规范势：三个"色"分量的实势乘以三个生成元。`}>{R`\mathcal{A}=A_\mu{}^\alpha T_\alpha\dd x^\mu`}</Eq>
      <Tx>{R`其中 $T_\alpha\equiv${SP}_\alpha/2\mathrm{i}$ 生成李代数 $\sym{lie}{\mathfrak{su}}(2)$：

$$[T_\alpha,T_\beta]=\epsilon_{\alpha\beta\gamma}T_\gamma.$$

（验证：$[\frac{${SP}_\alpha}{2\mathrm{i}},\frac{${SP}_\beta}{2\mathrm{i}}]=-\frac14\cdot2\mathrm{i}\epsilon_{\alpha\beta\gamma}${SP}_\gamma=\epsilon_{\alpha\beta\gamma}\frac{${SP}_\gamma}{2\mathrm{i}}$。）场强为`}</Tx>
      <Eq n="10.106a" say={R`SU(2) 场强：势的外微分加上势的外平方，展开为二形式。`}>{R`\mathcal{F}\equiv\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}=\tfrac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="10.106b" title="Yang–Mills 场强分量" say={R`场强分量：旋度加对易子，再按生成元展开成三个色分量。`}>{R`\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+[\mathcal{A}_\mu,\mathcal{A}_\nu]=F_{\mu\nu}{}^\alpha T_\alpha`}</Eq>
      <Eq n="10.106c" say={R`SU(2) 场强的色分量：结构常数就是 $\epsilon_{\alpha\beta\gamma}$，二次项是两个势的叉乘。`}>{R`F_{\mu\nu}{}^\alpha=\partial_\mu${AC}_{\nu\alpha}-\partial_\nu${AC}_{\mu\alpha}+\epsilon_{\alpha\beta\gamma}${AC}_{\mu\beta}${AC}_{\nu\gamma}.`}</Eq>
      <Tx>{R`（这里 $${AC}_{\mu\alpha}\equiv A_\mu{}^\alpha$。）Bianchi 恒等式为`}</Tx>
      <Eq n="10.107" say={R`非阿贝尔的 Bianchi 恒等式：场强的协变外微分为零——它不再意味着 $\dd\mathcal{F}=0$。`}>{R`\mathcal{D}\mathcal{F}=\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0.`}</Eq>
      <Tx>{R`Yang–Mills 作用量为`}</Tx>
      <Eq n="10.108" title="Yang–Mills 作用量" say={R`Yang–Mills 作用量：场强平方的迹的积分，它在规范变换 $\mathcal{F}\to g^{-1}\mathcal{F}g$ 下不变。`}>{R`\mathcal{S}_{\rm YM}[\mathcal{A}]\equiv\frac14\int_M\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu})=\frac12\int_M\Tr(\mathcal{F}\wedge*\mathcal{F}).`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{10.108} 第一个表达式的符号（p.425）`}>{R`原书印作 $\mathcal{S}_{\rm YM}\equiv-\frac14\int\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu})=\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})$。由恒等式 $\mathcal{F}\wedge*\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\dd^4x$（约定同第 7 章 \eqref{7.172}：这就是 \eqref{7.178} 取 $r=2$，对每个 Lie 代数分量成立后再取迹；见习题 10.12 的解答与勘误），两端相差一个负号。与 U(1) 情形 \eqref{10.85a}（$+\frac14\int\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}$，其中 $\mathcal{F}=\mathrm{i}F$ 使它等于 $-\frac14\int F_{\mu\nu}F^{\mu\nu}$）保持一致的写法是 $+\frac14$：反 Hermite 生成元下 $\Tr(T_\alpha T_\beta)=-\frac12\delta_{\alpha\beta}$，于是 $\frac14\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu})=-\frac18F_{\mu\nu}{}^\alpha F^{\mu\nu\alpha}$，正是标准的 Yang–Mills 拉氏量（相差归一化）。正文改用 $+\frac14$；右端 $\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})$ 不变。`}</Box>
      <Tx>{R`对 $\mathcal{A}_\mu$ 变分得`}</Tx>
      <Eq n="10.109" keyEq title="Yang–Mills 方程" say={R`Yang–Mills 方程：场强对偶的协变外微分为零——非阿贝尔版本的无源 Maxwell 方程。`}>{R`\mathcal{D}_\mu\mathcal{F}^{\mu\nu}=0\qquad\text{或}\qquad\mathcal{D}*\mathcal{F}=0.`}</Eq>
      <Derivation title="补全：Yang–Mills 方程的变分推导" collapsed steps={[
        { tex: R`\delta\mathcal{F}=\dd\delta\mathcal{A}+\delta\mathcal{A}\wedge\mathcal{A}+\mathcal{A}\wedge\delta\mathcal{A}=\mathcal{D}\delta\mathcal{A}`, why: R`由 \eqref{10.47}，对一形式 $\eta$，$[\mathcal{A},\eta]=\mathcal{A}\wedge\eta+\eta\wedge\mathcal{A}$。` },
        { tex: R`\delta\mathcal{S}_{\rm YM}=\int\Tr(\delta\mathcal{F}\wedge*\mathcal{F})=\int\Tr(\mathcal{D}\delta\mathcal{A}\wedge*\mathcal{F})`, why: R`$\Tr(\delta\mathcal{F}\wedge*\mathcal{F})=\Tr(\mathcal{F}\wedge*\delta\mathcal{F})$（Hodge 内积的对称性），两项合并抵消 $\frac12$。` },
        { tex: R`\Tr(\mathcal{D}\delta\mathcal{A}\wedge*\mathcal{F})=\dd\Tr(\delta\mathcal{A}\wedge*\mathcal{F})+\Tr(\delta\mathcal{A}\wedge\mathcal{D}*\mathcal{F})`, why: R`$\mathcal{D}$ 在迹下满足 Leibniz 律（对易子项在迹下抵消）；$\delta\mathcal{A}$ 是一形式，带一个 $(-1)$，这里已移项。全微分项积分为零。` },
      ]} result={R`$\delta\mathcal{A}$ 任意，故 $\mathcal{D}*\mathcal{F}=0$；分量形式即 $\partial_\mu\mathcal{F}^{\mu\nu}+[\mathcal{A}_\mu,\mathcal{F}^{\mu\nu}]=0$。`} />
      <Tx>{R`**几何与动力学的分工**：Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$ 是联络的几何性质，对任何联络成立；Yang–Mills 方程 $\mathcal{D}*\mathcal{F}=0$ 要用到度规（Hodge 星），是从作用量变分得到的动力学方程——正如 Maxwell 方程的两半。交互图 3 在 $\mathbb{R}^3$ 上数值检验了 $\mathcal{F}$ 的三种算法、规范协变性与 Bianchi 恒等式。`}</Tx>
    </Sub>);
}
