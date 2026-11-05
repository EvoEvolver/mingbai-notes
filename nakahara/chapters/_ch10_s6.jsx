import { BerryLiftRedraw, QuantumFibreRedraw } from "./_redraw_ch09_10.jsx";
// §10.6 Berry 相位 + 章末习题 —— 式 (10.129)–(10.170)，例 10.7–10.8，习题 10.13–10.15，Problem 10.1，图 10.6–10.7，交互图 5
import { Sec, Sub, Tx, Eq, Box, Stmt, Exercise, Derivation, Figure, C, FormulaMap } from "@kit";
import { FM_10_147 } from "./_ch10_fmaps.jsx";
import { BerryLab } from "./_ch10_demos.jsx";

const R = String.raw;
const GM = R`\sym{gm}{g}`;
const SP = R`\sym{pauli}{\sigma}`;
const bR = R`\boldsymbol R`;

export function Sec106() {
  return (
    <Sec n="10.6" title="Berry's phase" zh="Berry 相位"
      gist={R`绝热演化中，第 $n$ 个本征态除动力学相位外还获得几何相位 $\eta_n=\mathrm{i}\oint\langle n,\boldsymbol R|\dd|n,\boldsymbol R\rangle$。几何上：本征态的相位构成参数空间上的 U(1) 主丛，Berry 联络 $\mathcal{A}=\langle\boldsymbol R|\dd|\boldsymbol R\rangle$，Berry 相位就是它的和乐，等于 Berry 曲率的通量。自旋 1/2：简并点是强度 $\frac12$ 的单极子，相位 $=-\frac12\Omega$。`}
      why={R`本章最直接可测的应用：一个量子相位原来是纤维丛联络的和乐。它在分子物理（Born–Oppenheimer）、凝聚态（Hall 电导、拓扑能带）中无处不在。`}
      gives={["10.134", "10.136", "10.140", "10.141", "10.142", "10.149", "10.158", "10.159a", "10.166a", "10.168"]}>
      <p className="muted">本节概念：<C id="berry" /> · <C id="monopole" /></p>
      <Tx>{R`量子力学中，波函数只定义到一个相位。多数情况下相位被当作无关紧要的因子而忽略。Berry（1984）指出：若体系经历绝热变化，这个相位可以有可观测的后果。`}</Tx>
      <Sub10_6_1 />
      <Sub10_6_2 />
    </Sec>);
}

function Sub10_6_1() {
  return (
    <Sub n="10.6.1" title="Derivation of Berry's phase" zh="Berry 相位的推导">
      <Tx>{R`设哈密顿量 $H(${bR})$ 依赖于一组参数，统一记为 $${bR}$。设 $${bR}$ 作为时间的函数绝热地变化，$${bR}=${bR}(t)$。Schrödinger 方程为（$\hbar=1$）`}</Tx>
      <Eq n="10.129" say={R`含时 Schrödinger 方程：哈密顿量通过参数 $\boldsymbol R(t)$ 随时间缓慢变化。`}>{R`H(${bR}(t))|\psi(t)\rangle=\mathrm{i}\frac{\dd}{\dd t}|\psi(t)\rangle.`}</Eq>
      <Tx>{R`设体系在 $t=0$ 处于第 $n$ 个本征态，$|\psi(0)\rangle=|n,${bR}(0)\rangle$，其中`}</Tx>
      <Eq n="10.130" say={R`初态是初始参数下的第 $n$ 个本征态。`}>{R`H(${bR}(0))|n,${bR}(0)\rangle=E_n(${bR}(0))|n,${bR}(0)\rangle.`}</Eq>
      <Tx>{R`之后 $t>0$ 时的态 $|\psi(t)\rangle$ 如何？假设体系始终处于第 $n$ 个态，即不发生能级交叉（**绝热假设**）。`}</Tx>
      <Exercise n="10.13" title="天真的猜测为什么不对" level="★"
        hint={R`把 \eqref{10.131} 代入 \eqref{10.129}，看对时间求导时 $|n,\boldsymbol R(t)\rangle$ 本身随时间的变化贡献了什么。`}
        solution={R`记 $\theta(t)=\int_0^tE_n(\boldsymbol R(s))\dd s$。则

$$\mathrm{i}\frac{\dd}{\dd t}|\psi\rangle=E_n|\psi\rangle+e^{-\mathrm{i}\theta}\,\mathrm{i}\frac{\dd}{\dd t}|n,\boldsymbol R(t)\rangle,\qquad H|\psi\rangle=E_n|\psi\rangle.$$

两者相等要求 $\frac{\dd}{\dd t}|n,\boldsymbol R(t)\rangle=0$，一般不成立。即使只看 $|n\rangle$ 方向的分量（绝热近似允许忽略向其他能级的跃迁），也需要 $\langle n,\boldsymbol R|\frac{\dd}{\dd t}|n,\boldsymbol R\rangle=0$；而它是纯虚数（见下文），一般不为零。缺的正是一个额外的相位 $e^{\mathrm{i}\eta_n(t)}$。`}>
        <Tx>{R`天真的猜测是`}</Tx>
        <Eq n="10.131" say={R`天真的猜测：态始终是瞬时本征态，只累积动力学相位。`}>{R`|\psi(t)\rangle=\exp\Big[-\mathrm{i}\int_0^t\dd s\,E_n(${bR}(s))\Big]|n,${bR}(t)\rangle`}</Eq>
        <Tx>{R`其中归一化的态 $|n,${bR}(t)\rangle$ 满足`}</Tx>
        <Eq n="10.132" say={R`瞬时本征态：在每个时刻冻结参数时的第 $n$ 个本征矢。`}>{R`H(${bR}(t))|n,${bR}(t)\rangle=E_n(${bR}(t))|n,${bR}(t)\rangle.`}</Eq>
        <Tx>{R`证明 \eqref{10.131} *不是* \eqref{10.129} 的解。`}</Tx>
      </Exercise>
      <Tx>{R`既然 \eqref{10.131} 不满足 Schrödinger 方程，就要尝试别的可能。在波函数中引入一个额外相位 $\eta_n(t)$：`}</Tx>
      <Eq n="10.133" say={R`修正的绝热解：瞬时本征态乘上动力学相位，再乘上一个待定的额外相位 $\eta_n(t)$。`}>{R`|\psi(t)\rangle=\exp\Big[\mathrm{i}\eta_n(t)-\mathrm{i}\int_0^tE_n(${bR}(s))\dd s\Big]|n,${bR}(t)\rangle.`}</Eq>
      <Tx>{R`把 \eqref{10.133} 代入 Schrödinger 方程 \eqref{10.129}。左边（见 \eqref{10.132}）为 $H(${bR}(t))|\psi(t)\rangle=E_n(${bR}(t))|\psi(t)\rangle$，右边为

$$\mathrm{i}\frac{\dd}{\dd t}|\psi(t)\rangle=\Big[-\frac{\dd\eta_n(t)}{\dd t}+E_n(${bR}(t))\Big]|\psi(t)\rangle+\exp\Big[\mathrm{i}\eta_n(t)-\mathrm{i}\int E_n(${bR}(s))\dd s\Big]\mathrm{i}\frac{\dd}{\dd t}|n,${bR}(t)\rangle.$$

令二者相等（并用 $\langle n,${bR}(t)|$ 投影——绝热近似下其他分量被略去），得 $\eta_n(t)$ 满足`}</Tx>
      <Eq n="10.134" title="Berry 相位的演化方程" say={R`额外相位的变化率由瞬时本征态"自己与自己的导数"的重叠决定：它只依赖于本征态在参数空间里怎样转动。`}>{R`\frac{\dd\eta_n(t)}{\dd t}=\mathrm{i}\langle n,${bR}(t)|\frac{\dd}{\dd t}|n,${bR}(t)\rangle.`}</Eq>
      <Tx>{R`积分 \eqref{10.134} 得`}</Tx>
      <Eq n="10.135" say={R`Berry 相位写成参数空间中的线积分：被积函数只依赖于路径，不依赖于走得多快——这就是"几何"相位。`}>{R`\eta_n(t)=\mathrm{i}\int_0^t\langle n,${bR}(s)|\frac{\dd}{\dd s}|n,${bR}(s)\rangle\dd s=\mathrm{i}\int_{${bR}(0)}^{${bR}(t)}\langle n,${bR}|\nabla_{${bR}}|n,${bR}\rangle\dd${bR}`}</Eq>
      <Tx>{R`其中 $\nabla_{${bR}}$ 表示 $${bR}$ 空间中的梯度。注意 $\eta_n(t)$ 是实数，因为

$$2\,\mathrm{Re}\langle n,${bR}(s)|\frac{\dd}{\dd s}|n,${bR}(s)\rangle=\langle n,${bR}(s)|\frac{\dd}{\dd s}|n,${bR}(s)\rangle+\Big(\frac{\dd}{\dd s}\langle n,${bR}(s)|\Big)|n,${bR}(s)\rangle=\frac{\dd}{\dd s}\langle n,${bR}(s)|n,${bR}(s)\rangle=0.$$

设体系在 $${bR}$ 空间中走一个闭路：对某个 $T>0$，$${bR}(0)=${bR}(T)$。于是`}</Tx>
      <Eq n="10.136" title="Berry 相位（闭路）" say={R`沿闭路的 Berry 相位：看起来是一个闭合线积分，似乎应为零——但被积函数一般不是全微分。`}>{R`\eta_n(T)=\mathrm{i}\int_0^T\langle n,${bR}(s)|\frac{\dd}{\dd s}|n,${bR}(s)\rangle\dd s=\mathrm{i}\int_{${bR}(0)}^{${bR}(T)}\langle n,${bR}|\nabla_{${bR}}|n,${bR}\rangle\dd${bR}.`}</Eq>
      <Tx>{R`由于 $${bR}(T)=${bR}(0)$，最后一个表达式看起来应为零。然而被积函数不一定是全微分，$\eta_n(T)$ 可以不为零。相位 $\eta_n(T)$ 称为 **Berry 相位**（Berry's phase，Berry 1984）。

首先认识到 Berry 相位深刻几何意义的是 Simon（1983）：Berry 相位的来源是参数空间中的**和乐**。下面沿 Berry（1984）、Simon（1983）、Aitchison（1987）与 Zumino（1987）的思路展开这一观点。`}</Tx>
    </Sub>);
}

function Sub10_6_2() {
  return (
    <Sub n="10.6.2" title="Berry's phase, Berry's connection and Berry's curvature" zh="Berry 相位、Berry 联络与 Berry 曲率">
      <Tx>{R`**丛。**设 $M$ 是描述参数空间的流形，$${bR}=(R_1,\ldots,R_k)$ 是局部坐标。在 $M$ 的每一点 $${bR}$，考虑哈密顿量 $H(${bR})$ 归一化的第 $n$ 个本征态。由于量子态 $|n;${bR}\rangle$ 与 $e^{\mathrm{i}\phi}|n;${bR}\rangle$ 无法区分，物理态由等价类表示：`}</Tx>
      <Eq n="10.137" say={R`物理态是"相差一个相位的本征矢"构成的等价类：这根纤维就是一个 U(1)。`}>{R`[|${bR}\rangle]\equiv\{g|${bR}\rangle\mid g\in\mathrm{U}(1)\}`}</Eq>
      <Tx>{R`其中省去了指标 $n$，因为只关心第 $n$ 个本征矢（\figref{10.6}）。在 $M$ 的每一点 $${bR}$ 有一个 U(1) 自由度，于是得到参数空间 $M$ 上的 U(1) 丛 $P(M,\mathrm{U}(1))$。投影为 $\pi(g|${bR}\rangle)=${bR}$。`}</Tx>
      <Figure illustration={<QuantumFibreRedraw />} n="10.6" caption={R`依赖于绝热参数 $\boldsymbol R$ 的量子力学体系的纤维。`} width="100%" />
      <Tx>{R`在每一点 $${bR}\in M$ 固定 $|${bR}\rangle$ 的相位，就是选取一个截面。设 $\sigma(${bR})=|${bR}\rangle$ 是 $M$ 的坐标卡 $U$ 上的局部截面。典范局部平凡化为`}</Tx>
      <Eq n="10.138" say={R`选定相位约定（截面）后，选定的那个本征矢对应纤维上的单位元。`}>{R`\phi^{-1}(|${bR}\rangle)=(${bR},e).`}</Eq>
      <Tx>{R`"右"作用给出`}</Tx>
      <Eq n="10.139" say={R`乘一个相位 $g$，就在纤维上移动到 $g$。`}>{R`\phi^{-1}(|${bR}\rangle\cdot g)=(${bR},e)g=(${bR},g).`}</Eq>
      <Tx>{R`**联络。**丛的结构定义好了，现在给它配上联络。定义 **Berry 联络**（Berry's connection）：`}</Tx>
      <Eq n="10.140" keyEq title="Berry 联络" say={R`Berry 联络：本征矢与它自己的微分的重叠——它衡量相位约定沿参数空间如何"漂移"。`}>{R`\mathcal{A}=\mathcal{A}_\mu\dd R^\mu\equiv\langle${bR}|(\dd|${bR}\rangle)=-(\dd\langle${bR}|)|${bR}\rangle`}</Eq>
      <Tx>{R`其中 $\dd=(\partial/\partial R^\mu)\dd R^\mu$ 是 $${bR}$ 空间中的外微分。注意 $\mathcal{A}$ 是反 Hermite 的（取值于 $\sym{lie}{\mathfrak{u}}(1)=\mathrm{i}\mathbb{R}$），因为

$$0=\dd(\langle${bR}|${bR}\rangle)=(\dd\langle${bR}|)|${bR}\rangle+\langle${bR}|\dd|${bR}\rangle=\langle${bR}|\dd|${bR}\rangle^*+\langle${bR}|\dd|${bR}\rangle.$$

要说明 \eqref{10.140} 确实是联络的局部形式，必须检验相容条件。设 $U_i$、$U_j$ 是 $M$ 的相交坐标卡，$\sigma_i(${bR})=|${bR}\rangle_i$、$\sigma_j(${bR})=|${bR}\rangle_j$ 是各自的局部截面，由转移函数联系：$|${bR}\rangle_j=|${bR}\rangle_it_{ij}(${bR})$。于是`}</Tx>
      <Eq n="10.141" say={R`换一个相位约定，Berry 联络恰好按 U(1) 规范变换改变：它确实是一个联络的局部形式。`}>{R`\mathcal{A}_j(${bR})={}_j\langle${bR}|\dd|${bR}\rangle_j=t_{ij}(${bR})^{-1}{}_i\langle${bR}|[\dd|${bR}\rangle_it_{ij}(${bR})+|${bR}\rangle\dd t_{ij}(${bR})]=\mathcal{A}_i(${bR})+t_{ij}(${bR})^{-1}\dd t_{ij}(${bR}).`}</Eq>
      <Tx>{R`（$\,{}_j\langle\boldsymbol R|=\bar t_{ij}\,{}_i\langle\boldsymbol R|=t_{ij}^{-1}{}_i\langle\boldsymbol R|$，因为 $|t_{ij}|=1$。）满足 \eqref{10.141} 的一族一形式 $\{\mathcal{A}_i\}$ 在 $P(M,\mathrm{U}(1))$ 上定义了一个 Ehresmann 联络（定理 10.1 与 \eqref{10.9}）。

$\mathcal{A}$ 的场强 $\mathcal{F}$ 称为 **Berry 曲率**（Berry's curvature）：`}</Tx>
      <Eq n="10.142" title="Berry 曲率" say={R`Berry 曲率：本征矢的两个方向导数的"叉积"——它是规范不变的，是参数空间里的"磁场"。`}>{R`\mathcal{F}=\dd\mathcal{A}=(\dd\langle${bR}|)\wedge(\dd|${bR}\rangle)=\Big(\frac{\partial\langle${bR}|}{\partial R^\mu}\Big)\Big(\frac{\partial|${bR}\rangle}{\partial R^\nu}\Big)\dd R^\mu\wedge\dd R^\nu.`}</Eq>
      <Tx>{R`下面先看一个原子物理的例子，再说明这一几何结构如何反映在 Berry 相位中。`}</Tx>
      <Box kind="example" n="10.7" title="快慢自由度：Born–Oppenheimer 近似中诱导的规范势">
        <Tx>{R`考虑含"快"自由度 $\boldsymbol r$ 与"慢"自由度 $${bR}$ 的量子力学体系。例如可以想象电子在缓慢振动的离子势场中运动。设哈密顿量为`}</Tx>
        <Eq n="10.143" say={R`快、慢两组自由度的总哈密顿量：两项动能加上耦合势。`}>{R`H=\frac{\boldsymbol p^2}{2m}+\frac{\boldsymbol P^2}{2M}+V(\boldsymbol r;${bR})`}</Eq>
        <Tx>{R`其中 $\boldsymbol p$（$\boldsymbol P$）是与 $\boldsymbol r$（$${bR}$）正则共轭的动量。作为一级近似，可以把慢自由度"冻结"在某个值 $${bR}$，考虑瞬时子哈密顿量`}</Tx>
        <Eq n="10.144" say={R`冻结慢自由度后，快自由度的哈密顿量。`}>{R`h(${bR})=\frac{\boldsymbol p^2}{2m}+V(\boldsymbol r;${bR})`}</Eq>
        <Tx>{R`及其本征值问题`}</Tx>
        <Eq n="10.145" say={R`快自由度在冻结参数下的本征值问题。`}>{R`h(${bR})|${bR}\rangle=\epsilon_n(${bR})|${bR}\rangle`}</Eq>
        <Tx>{R`其中 $|${bR}\rangle$ 表示快自由度的第 $n$ 个本征矢 $|n;${bR}\rangle$。设本征值孤立且非简并。Berry 联络为 $\mathcal{A}(${bR})=\langle${bR}|\dd|${bR}\rangle$，曲率为 $\mathcal{F}=(\dd\langle${bR}|)\wedge(\dd|${bR}\rangle)$。

有趣的是看快自由度如何影响慢自由度。假设总波函数写成`}</Tx>
        <Eq n="10.146" say={R`Born–Oppenheimer 拟设：总波函数等于慢波函数乘以快自由度的瞬时本征态。`}>{R`\Psi(\boldsymbol r;${bR})=\Phi(${bR})|${bR}\rangle`}</Eq>
        <Tx>{R`并求慢自由度的波函数 $\Phi(${bR})$ 满足的"有效" Schrödinger 方程。哈密顿量 \eqref{10.143} 的本征值问题为

$$\begin{aligned}H\Psi(\boldsymbol r;${bR})=&-\frac1{2M}[\nabla^2_{${bR}}\Phi(${bR})|${bR}\rangle+2\nabla_{${bR}}\Phi(${bR})\cdot\nabla_{${bR}}|${bR}\rangle+\Phi(${bR})\nabla^2_{${bR}}|${bR}\rangle]\\&-\Phi(${bR})\frac1{2m}\nabla^2_{\boldsymbol r}|${bR}\rangle+\Phi(${bR})V(\boldsymbol r;${bR})|${bR}\rangle=E_n(${bR})\Phi(${bR})|${bR}\rangle.\end{aligned}$$

左乘 $\langle${bR}|$ 并用 Schrödinger 方程 \eqref{10.145}，这个方程成为`}</Tx>
        <FormulaMap n="10.147" say={R`投影到快自由度本征态后，慢波函数满足的方程：梯度项与二阶项中出现了 Berry 联络（含散度项，见勘误）。`} tree={FM_10_147} start="berry" />
        <Tx>{R`这里采用了 **Born–Oppenheimer 近似**：除对角元外，所有矩阵元都被略去，`}</Tx>
        <Eq n="10.148" say={R`Born–Oppenheimer 近似：慢参数的变化不引起快自由度的能级之间的跃迁。`}>{R`\langle n;${bR}|\nabla_{${bR}}|n';${bR}\rangle=0\qquad n'\neq n.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{10.147} 漏了散度项（p.433）`}>{R`原书 \eqref{10.147} 方括号内只有 $\nabla^2\Phi+2\nabla\Phi\cdot\langle\boldsymbol R|\nabla|\boldsymbol R\rangle+\Phi(\langle\boldsymbol R|\nabla|\boldsymbol R\rangle)^2$。但 $\langle\boldsymbol R|\nabla^2_{\boldsymbol R}|\boldsymbol R\rangle$ 应这样处理：

$$\langle\boldsymbol R|\nabla^2|\boldsymbol R\rangle=\nabla\cdot\langle\boldsymbol R|\nabla|\boldsymbol R\rangle-(\nabla\langle\boldsymbol R|)\cdot(\nabla|\boldsymbol R\rangle)=\nabla\cdot\mathcal{A}-\sum_{n'}(\nabla\langle\boldsymbol R|)|n'\rangle\cdot\langle n'|(\nabla|\boldsymbol R\rangle).$$

由 \eqref{10.148} 只保留 $n'=n$ 项，且 $(\nabla\langle\boldsymbol R|)|\boldsymbol R\rangle=-\mathcal{A}$，得 $\langle\boldsymbol R|\nabla^2|\boldsymbol R\rangle\approx\nabla\cdot\mathcal{A}+\mathcal{A}\cdot\mathcal{A}$。所以 \eqref{10.147} 还应有 $\Phi\,\nabla\cdot\mathcal{A}$ 一项。只有加上它，方括号才等于 $(\nabla+\mathcal{A})^2\Phi=\nabla^2\Phi+2\mathcal{A}\cdot\nabla\Phi+(\nabla\cdot\mathcal{A})\Phi+\mathcal{A}^2\Phi$，与 \eqref{10.149} 一致。正文已改正。`}</Box>
        <Tx>{R`于是 $|\Phi(${bR})\rangle$ 的有效哈密顿量为`}</Tx>
        <Eq n="10.149" title="诱导规范势" say={R`慢自由度"看到"一个由快自由度诱导的矢势（Berry 联络），以及由快自由度能级给出的势能——规范对称性从无到有地"产生"了。`}>{R`H_{\rm eff}(n)\equiv-\frac1{2M}\Big(\frac{\partial}{\partial R^\mu}+\mathcal{A}_\mu(${bR})\Big)^2+\varepsilon_n(${bR})`}</Eq>
        <Tx>{R`其中 $\mathcal{A}_\mu$ 是 Berry 联络的分量：`}</Tx>
        <Eq n="10.150" say={R`Berry 联络的分量。`}>{R`\mathcal{A}_\mu(${bR})=\langle${bR}|\frac{\partial}{\partial R^\mu}|${bR}\rangle.`}</Eq>
        <Tx>{R`值得注意：快自由度为慢自由度诱导出一个与之耦合的*矢势*。还要注意本征值 $\varepsilon_n(${bR})$ 在 $H_{\rm eff}$ 中起势能的作用。这种规范对称性的"自发产生"反映了波函数 $|${bR}\rangle$ 的相位自由度：换相位约定 $|${bR}\rangle\to e^{\mathrm{i}\chi(${bR})}|${bR}\rangle$ 时 $\Phi\to e^{-\mathrm{i}\chi}\Phi$、$\mathcal{A}\to\mathcal{A}+\mathrm{i}\dd\chi$，$H_{\rm eff}$ 协变。`}</Tx>
      </Box>
      <Tx>{R`**Berry 相位作为和乐。**描述绝热变化的 Schrödinger 方程为`}</Tx>
      <Eq n="10.151a" say={R`含时 Schrödinger 方程，态既显式依赖时间、又通过参数隐式依赖时间。`}>{R`H(${bR}(t))|${bR}(t),t\rangle=\mathrm{i}\frac{\dd}{\dd t}|${bR}(t),t\rangle`}</Eq>
      <Tx>{R`其中 $|${bR}(t),t\rangle$ 既通过 $${bR}(t)$ 隐式依赖于 $t$，也显式依赖于 $t$。Berry 假设`}</Tx>
      <Eq n="10.152a" say={R`绝热解等于动力学相位、Berry 相位与瞬时本征态三者之积。`}>{R`|${bR}(t),t\rangle=\exp\Big(-\mathrm{i}\int_0^tE_n(t)\dd t\Big)e^{\mathrm{i}\eta(t)}|${bR}(t)\rangle`}</Eq>
      <Tx>{R`其中 $|${bR}\rangle$ 是 $H(${bR})$ 的瞬时*归一化*本征态：`}</Tx>
      <Eq n="10.153" say={R`瞬时本征态及其归一化。`}>{R`H(${bR})|${bR}\rangle=E_n(${bR})|${bR}\rangle\qquad\langle${bR}|${bR}\rangle=1.`}</Eq>
      <Tx>{R`第一个指数是通常的动力学相位，第二个是 Berry 相位。为方便起见，定义算符`}</Tx>
      <Eq n="10.154" say={R`把本征能量减掉，动力学相位就消失了，剩下的只有几何相位。`}>{R`\mathcal{H}(${bR})\equiv H(${bR})-E_n(${bR})`}</Eq>
      <Tx>{R`以消去动力学相位。态 $|${bR}\rangle$ 是 $\mathcal{H}(${bR})$ 的零能本征态：$\mathcal{H}(${bR})|${bR}\rangle=0$。修改后的 Schrödinger 方程`}</Tx>
      <Eq n="10.151b" say={R`扣除本征能量后的 Schrödinger 方程。`}>{R`\mathcal{H}(${bR})|${bR}(t),t\rangle=\mathrm{i}\frac{\dd}{\dd t}|${bR}(t),t\rangle`}</Eq>
      <Tx>{R`的解为`}</Tx>
      <Eq n="10.152b" say={R`扣除动力学相位后，绝热解只剩 Berry 相位乘瞬时本征态。`}>{R`|${bR}(t),t\rangle=e^{\mathrm{i}\eta(t)}|${bR}(t)\rangle.`}</Eq>
      <Tx>{R`在 \eqref{10.136} 中已求得 $\eta$：`}</Tx>
      <Eq n="10.155" say={R`Berry 相位：Berry 联络沿参数路径的线积分乘以 $\mathrm{i}$。`}>{R`\eta(t)=\mathrm{i}\int_0^t\dd s\frac{\dd R^\mu}{\dd s}\langle${bR}(s)|\frac{\partial}{\partial R^\mu}|${bR}(s)\rangle=\mathrm{i}\int_{${bR}(0)}^{${bR}(t)}\langle${bR}|\dd|${bR}\rangle.`}</Eq>
      <Tx>{R`我们证明 Berry 相位是联络 \eqref{10.140} 在 $P(M,\mathrm{U}(1))$ 上的和乐。在 $M$ 的坐标卡 $U$ 上取截面 $\sigma(${bR})=|${bR}\rangle$。设 $${bR}:[0,1]\to M$ 是 $U$ 中的闭路（原书脚注：我们在记号上会稍微随意一些）。把 $${bR}(t)$ 相对于联络 \eqref{10.140} 的水平提升写成`}</Tx>
      <Eq n="10.156" say={R`参数闭路的水平提升：在选定的相位约定上再乘一个随时间变化的 U(1) 元。`}>{R`\tilde{\boldsymbol{R}}(t)=\sigma(${bR}(t))g(${bR}(t))`}</Eq>
      <Tx>{R`其中取 $g(${bR}(0))$ 为 U(1) 的单位元。群元 $g(t)$ 满足 \eqref{10.13b}：`}</Tx>
      <Eq n="10.157" say={R`水平提升方程在 Berry 联络下的具体形式。`}>{R`\frac{\dd g(t)}{\dd t}g(t)^{-1}=-\mathcal{A}\Big(\frac{\dd}{\dd t}\Big)=-\langle${bR}(t)|\frac{\dd}{\dd t}|${bR}(t)\rangle`}</Eq>
      <Tx>{R`其中 $g(t)$ 表示 $g(${bR}(t))$。由 $g(t)=\exp(\mathrm{i}\eta(t))$ 得

$$\mathrm{i}\frac{\dd\eta(t)}{\dd t}=-\langle${bR}(t)|\frac{\dd}{\dd t}|${bR}(t)\rangle,$$

它与 \eqref{10.134} 完全相同。积分得`}</Tx>
      <Eq n="10.158" keyEq title="Berry 相位 = 和乐" say={R`Berry 相位就是 Berry 联络沿闭路的环量：绝热定理的相位方程与水平提升方程是同一个方程。`}>{R`\eta(1)=\mathrm{i}\int_0^1\langle${bR}(s)|\frac{\dd}{\dd s}|${bR}(s)\rangle\dd s=\mathrm{i}\oint\langle${bR}|\dd|${bR}\rangle.`}</Eq>
      <Tx>{R`注意 $${bR}(0)=${bR}(1)$，所以 $|${bR}(0)\rangle=|${bR}(1)\rangle$。于是 $\exp[\mathrm{i}\eta(1)]$ 被视为和乐（\figref{10.7}）：`}</Tx>
      <Eq n="10.159a" title="Berry 和乐" say={R`绕参数闭路一周，水平提升回到同一根纤维上的另一点：差一个相位 $e^{-\oint\mathcal{A}}=e^{\mathrm{i}\eta}$。`}>{R`\tilde{\boldsymbol{R}}(1)=\exp\Big(-\oint\langle${bR}|\dd|${bR}\rangle\Big)\cdot|${bR}(0)\rangle.`}</Eq>
      <Stmt id="F:berry" />
      <Figure illustration={<BerryLiftRedraw />} n="10.7" caption={R`自绘 Berry 水平提升：自旋 $1/2$ 正能态沿纬圈绝热演化后，得到相位 $-\Omega/2$，一般不回到同一个代表矢。`} width="100%" />
      <Exercise n="10.14" title="Berry 相位 = Berry 曲率的通量" level="★"
        hint={R`U(1) 阿贝尔，路径排序可以去掉；对 $\oint\mathcal{A}$ 用 Stokes 定理。`}
        solution={R`U(1) 是阿贝尔群，\eqref{10.159a} 中的指数就是普通指数。设闭路 $\boldsymbol R(t)$ 与它所围的曲面 $S$ 都在截面 $\sigma$ 有定义的坐标卡 $U$ 内，由 Stokes 定理 \sref{T6.1}：

$$\oint_{\partial S}\mathcal{A}=\int_S\dd\mathcal{A}=\int_S\mathcal{F},$$

代入 \eqref{10.159a} 即得 \eqref{10.159b}，并且 $\eta(1)=\mathrm{i}\int_S\mathcal{F}$（即 \eqref{10.168}）。

**跨卡的情形：**若 $S$ 不在单个卡内（例如包含 Dirac 弦所在的极点），把 $S$ 分成几块各用自己的截面，各块边界上的相位差由转移函数给出；只要第一陈数是整数（如 $2${GM}\in\mathbb{Z}$），$e^{-\int_S\mathcal{F}}$ 与分割方式无关。$\mathcal{F}$ 是规范不变的，所以 \eqref{10.159b} 显示 Berry 相位（模 $2\pi$）不依赖相位约定。`}>
        <Tx>{R`设 $S$ 是 $M$ 中以闭路 $${bR}(t)$ 为边界的曲面。证明`}</Tx>
        <Eq n="10.159b" say={R`和乐等于 Berry 曲率穿过所围曲面的通量的指数：Berry 相位是参数空间里的"磁通"。`}>{R`\tilde{\boldsymbol{R}}(1)=\exp\Big(-\int_S\mathcal{F}\Big)\cdot|${bR}(0)\rangle`}</Eq>
        <Tx>{R`其中 $\mathcal{F}$ 由 \eqref{10.142} 给出。（原书在面积分上印了闭路积分号 $\oint_S$，这里写作 $\int_S$。）`}</Tx>
      </Exercise>
      <Box kind="example" n="10.8" title="磁场中的自旋 1/2：参数空间里的单极子">
        <Tx>{R`考虑磁场中的自旋 $\frac12$ 粒子，哈密顿量为`}</Tx>
        <Eq n="10.160" say={R`自旋 1/2 在磁场 $\boldsymbol R$ 中：两能级体系，本征值 $\pm|\boldsymbol R|$。`}>{R`H(${bR})=${bR}\cdot\boldsymbol{\sigma}=\begin{pmatrix}R_3&R_1-\mathrm{i}R_2\\ R_1+\mathrm{i}R_2&-R_3\end{pmatrix}.`}</Eq>
        <Tx>{R`参数 $${bR}$ 对应外加磁场。这是本征值为 $\pm|${bR}|$ 的两能级体系。考虑本征值 $R=+|${bR}|$。按上述办法，引入哈密顿量 $\mathcal{H}(${bR})\equiv H(${bR})-|${bR}|$，考虑 $\mathcal{H}(${bR})$ 的零能本征态`}</Tx>
        <Eq n="10.161" say={R`本征值 $+R$ 的归一化本征矢（"北"规范）：在 $R_3=-R$（南极方向）处分母为零。`}>{R`|${bR}\rangle_{\rm N}=[2R(R+R_3)]^{-1/2}\begin{pmatrix}R+R_3\\ R_1+\mathrm{i}R_2\end{pmatrix}.`}</Eq>
        <Tx>{R`（验证：第一行 $R_3(R+R_3)+(R_1-\mathrm{i}R_2)(R_1+\mathrm{i}R_2)=R(R+R_3)$；归一化 $(R+R_3)^2+R_1^2+R_2^2=2R(R+R_3)$。）经过一番直接但繁琐的计算，得到规范势`}</Tx>
        <Eq n="10.162" say={R`北规范下的 Berry 联络，用直角分量写出。`}>{R`\mathcal{A}_{\rm N}={}_{\rm N}\langle${bR}|\dd|${bR}\rangle_{\rm N}=-\mathrm{i}\frac{R_2\dd R_1-R_1\dd R_2}{2R(R+R_3)}.`}</Eq>
        <Tx>{R`场强为`}</Tx>
        <Eq n="10.163" say={R`Berry 曲率：$\frac{\mathrm{i}}{2}$ 乘以从原点看出去的立体角元——一个位于简并点的磁单极子的场。`}>{R`\mathcal{F}=\dd\mathcal{A}=\frac{\mathrm{i}}2\frac{R_1\dd R_2\wedge\dd R_3+R_2\dd R_3\wedge\dd R_1+R_3\dd R_1\wedge\dd R_2}{R^3}.`}</Eq>
        <Tx>{R`到目前为止都假设态 $|${bR}\rangle$ 是孤立的。然而若 $${bR}=0$，这个假设失效：两个本征态简并。令人惊讶的是，这个奇点在 $${bR}$ 空间中表现得像一个**磁单极子**。为看清这一点，在 $${bR}$ 空间引入极坐标 $\theta$、$\phi$：

$$R_1=R\sin\theta\cos\phi\qquad R_2=R\sin\theta\sin\phi\qquad R_3=R\cos\theta.$$

态 \eqref{10.161} 表示为`}</Tx>
        <Eq n="10.164" say={R`北规范本征矢的球坐标形式：在南极 $\theta=\pi$ 处相位 $e^{\mathrm{i}\phi}$ 无定义。`}>{R`|${bR}\rangle_{\rm N}=\begin{pmatrix}\cos(\theta/2)\\e^{\mathrm{i}\phi}\sin(\theta/2)\end{pmatrix}.`}</Eq>
        <Tx>{R`这个态在 $\theta=\pi$ 处奇异，反映了 $|${bR}\rangle_{\rm N}$ 在 $R_3=-R$ 处无定义。考虑另一个本征矢`}</Tx>
        <Eq n="10.165" say={R`"南"规范本征矢：乘以 $e^{-\mathrm{i}\phi}$，奇点挪到了北极。`}>{R`|${bR}\rangle_{\rm S}\equiv e^{-\mathrm{i}\phi}|${bR}\rangle_{\rm N}=\begin{pmatrix}e^{-\mathrm{i}\phi}\cos(\theta/2)\\\sin(\theta/2)\end{pmatrix}=[2R(R-R_3)]^{-1/2}\begin{pmatrix}R_1-\mathrm{i}R_2\\ R-R_3\end{pmatrix}`}</Eq>
        <Tx>{R`它有相同的本征值。这个本征矢在 $\theta=0$，即 $R_3=R$ 处奇异。对应于这两个矢量，在极坐标下有 Berry 规范势`}</Tx>
        <Eq n="10.166a" title="Berry 势（北）" say={R`北规范下的 Berry 联络：形式上就是强度 $\frac12$ 的 Wu–Yang 单极子势。`}>{R`\mathcal{A}_{\rm N}=\tfrac12\mathrm{i}(1-\cos\theta)\dd\phi\qquad\theta\neq\pi`}</Eq>
        <Eq n="10.166b" say={R`南规范下的 Berry 联络。`}>{R`\mathcal{A}_{\rm S}=-\tfrac12\mathrm{i}(1+\cos\theta)\dd\phi\qquad\theta\neq0.`}</Eq>
        <Derivation title="补全：由 (10.164) 计算 (10.166a)" collapsed steps={[
          { tex: R`\mathcal{A}_{\rm N}=\cos\tfrac\theta2\,\dd\cos\tfrac\theta2+e^{-\mathrm{i}\phi}\sin\tfrac\theta2\,\dd\big(e^{\mathrm{i}\phi}\sin\tfrac\theta2\big)`, why: R`$\langle\boldsymbol R|\dd|\boldsymbol R\rangle$，第一分量实。` },
          { tex: R`=-\tfrac12\cos\tfrac\theta2\sin\tfrac\theta2\,\dd\theta+\tfrac12\sin\tfrac\theta2\cos\tfrac\theta2\,\dd\theta+\mathrm{i}\sin^2\tfrac\theta2\,\dd\phi=\tfrac{\mathrm{i}}2(1-\cos\theta)\dd\phi`, why: R`$\dd\theta$ 项相消（正是"$\mathcal{A}$ 反 Hermite"的体现）。` },
          { tex: R`\mathcal{A}_{\rm S}=\mathcal{A}_{\rm N}+e^{\mathrm{i}\phi}\dd e^{-\mathrm{i}\phi}=\tfrac{\mathrm{i}}2(1-\cos\theta)\dd\phi-\mathrm{i}\dd\phi=-\tfrac{\mathrm{i}}2(1+\cos\theta)\dd\phi`, why: R`由 \eqref{10.141}，$t=e^{-\mathrm{i}\phi}$。` },
        ]} />
        <Tx>{R`二者由规范变换联系：`}</Tx>
        <Eq n="10.167" say={R`南北两个 Berry 势在赤道上相差一个 U(1) 规范变换，转移函数是 $e^{-\mathrm{i}\phi}$，绕赤道一圈卷绕一次。`}>{R`\mathcal{A}_{\rm S}=\mathcal{A}_{\rm N}-\mathrm{i}\dd\phi=\mathcal{A}_{\rm N}+e^{\mathrm{i}\phi}\dd e^{-\mathrm{i}\phi}`}</Eq>
        <Tx>{R`其中 $g(\pi/2,\phi)=\exp(-\mathrm{i}\phi)$ 被认同为转移函数 $t_{\rm NS}$。\eqref{10.166a}–\eqref{10.166b} 正是强度为 $\frac12$ 的 Wu–Yang 单极子的矢势（§1.9 与 \secref{10.5}），单极子的总通量为 $\Phi=4\pi\cdot\frac12=2\pi$。`}</Tx>
        <Box kind="warning" title={R`勘误：单极子强度的符号（p.437）`}>{R`原书说 \eqref{10.166a}–\eqref{10.166b} "是强度 $-\frac12$ 的 Wu–Yang 单极子的矢势"，"总通量 $\Phi=4\pi(-\frac12)=-2\pi$"。按本章自己的 \eqref{10.89}，$\mathcal{A}_{\rm N}=\mathrm{i}${GM}(1-\cos\theta)\dd\phi$；与 \eqref{10.166a} $\mathcal{A}_{\rm N}=\frac12\mathrm{i}(1-\cos\theta)\dd\phi$ 比较得 $${GM}=+\frac12$，总通量 $4\pi${GM}=+2\pi$（也可直接由 \eqref{10.163}：$\frac1{\mathrm{i}}\int_{S^2}\mathcal{F}=\frac12\cdot4\pi$）。负号出现在 Berry **相位**里：$\eta=\mathrm{i}\int_S\mathcal{F}=-${GM}\Omega=-\frac12\Omega$。交互图 5 数值验证了 $\eta=-\frac12\Omega$。正文已改正。`}</Box>
        <Tx>{R`**与单极子的类比**到此已很明显。若固定磁场的大小 $R$，受限的参数空间就是 $S^2$。在 $S^2$ 的每一点 $${bR}$，态有一个相位自由度。因此我们面对的是 U(1) 丛 $P(S^2,\mathrm{U}(1))$，它也描述磁单极子。对参数 $${bR}$ 的每个选择，有一根对应于第 $n$ 个本征态 $|n;${bR}\rangle$ 的纤维；$${bR}$ 处的纤维由 \eqref{10.137} 定义的等价类 $[|${bR}\rangle]$ 组成。投影 $\pi$ 把态映到定义它的参数：$\pi:e^{\mathrm{i}\alpha}|${bR}\rangle\mapsto${bR}\in S^2$。如前所见，这个丛是非平凡的，因为它不能用单个联络（单个整体规范势）描述。丛的非平凡性意味着原点存在单极子。注意 $${bR}=0$（即 $\boldsymbol B=0$）是所有本征值简并的奇点。

**和乐。**取 $S^2$ 上的标准点 $${bR}(0)$，选定矢量 $|${bR}(0)\rangle$。在 $S^2$ 上取闭路 $${bR}(t)$，把 $|${bR}(0)\rangle$ 沿 $${bR}(t)$ 平行移动，它回来时成为 $\exp[\mathrm{i}\eta(1)]|${bR}(0)\rangle$。附加的相位 $\eta$ 代表和乐 $\pi^{-1}(${bR})\to\pi^{-1}(${bR})$，对应 Berry 相位。由 \eqref{10.158}，$\eta(1)$ 为`}</Tx>
        <Eq n="10.168" keyEq title="Berry 相位 = 曲率通量" say={R`Berry 相位等于 Berry 曲率穿过闭路所围曲面的"磁通"；对自旋 1/2 就是负的半个立体角。`}>{R`\eta(1)=\mathrm{i}\oint_{${bR}}\mathcal{A}=\mathrm{i}\int_S\mathcal{F}`}</Eq>
        <Tx>{R`其中 $\mathcal{F}=\dd\mathcal{A}$ 是场强，$S$ 是以闭路 $${bR}(t)$ 为边界的曲面。由 \eqref{10.168}，Berry 相位 $\eta(1)$ 代表穿过面积 $S$ 的"磁通"。对本例，$\mathcal{F}=\frac{\mathrm{i}}2\sin\theta\,\dd\theta\wedge\dd\phi$，所以 $\eta(1)=-\frac12\Omega(S)$，$\Omega(S)$ 是闭路对原点所张的立体角。`}</Tx>
      </Box>
      <BerryLab />
      <Exercise n="10.15" title="南规范的 Berry 势与 dφ 的奇异性" level="★"
        hint={R`可以直接对 \eqref{10.165} 的直角分量形式求 $\langle\boldsymbol R|\dd|\boldsymbol R\rangle$；更快的办法是把 \eqref{10.166b} 中的 $1+\cos\theta$ 与 $\dd\phi$ 用直角坐标写出。`}
        solution={R`**$\dd\phi$。**$\phi=\tan^{-1}(R_2/R_1)$，$\dd\phi=\frac{R_1\dd R_2-R_2\dd R_1}{R_1^2+R_2^2}$，而 $R_1^2+R_2^2=R^2-R_3^2=(R+R_3)(R-R_3)$，所以

$$\dd\phi=-\frac{R_2\dd R_1-R_1\dd R_2}{(R+R_3)(R-R_3)},$$

即 \eqref{10.170}。分母在 $R_3=\pm R$（$z$ 轴上）为零：$\dd\phi$ 在两极奇异。

**$\mathcal{A}_{\rm S}$。**由 \eqref{10.166b}，$1+\cos\theta=(R+R_3)/R$：

$$\mathcal{A}_{\rm S}=-\frac{\mathrm{i}}2\frac{R+R_3}{R}\cdot\Big(-\frac{R_2\dd R_1-R_1\dd R_2}{(R+R_3)(R-R_3)}\Big)=\frac{\mathrm{i}}2\frac{R_2\dd R_1-R_1\dd R_2}{R(R-R_3)},$$

即 \eqref{10.169}。（同理 $\mathcal{A}_{\rm N}=\frac{\mathrm{i}}2\frac{R-R_3}{R}\dd\phi=-\mathrm{i}\frac{R_2\dd R_1-R_1\dd R_2}{2R(R+R_3)}$，验证了 \eqref{10.162}。）$(1\pm\cos\theta)$ 因子分别抵消了 $\dd\phi$ 在南/北极的奇异性：$\mathcal{A}_{\rm N}$ 只在南极（$R_3=-R$）奇异，$\mathcal{A}_{\rm S}$ 只在北极奇异。`}>
        <Tx>{R`用 \eqref{10.165} 证明`}</Tx>
        <Eq n="10.169" say={R`南规范 Berry 势的直角分量形式：只在北极 $R_3=R$ 奇异。`}>{R`\mathcal{A}_{\rm S}=\frac{\mathrm{i}}2\frac{R_2\dd R_1-R_1\dd R_2}{R(R-R_3)}.`}</Eq>
        <Tx>{R`再证明`}</Tx>
        <Eq n="10.170" say={R`方位角的微分在直角坐标下：在 $z$ 轴两端都奇异，所以需要 $(1\pm\cos\theta)$ 因子来"修补"。`}>{R`\dd\phi=-\frac{R_2\dd R_1-R_1\dd R_2}{(R+R_3)(R-R_3)}.`}</Eq>
        <Tx>{R`注意 $\dd\phi$ 在 $R_3=\pm R$ 处奇异。`}</Tx>
      </Exercise>
    </Sub>);
}

export function Problems() {
  return (
    <Sec n="10.P" title="Problems" zh="章末习题">
      <Tx>{R`本章只有一道章末习题：它把 Berry 相位的几何（\secref{10.6}）与能级简并点联系起来，是分子物理中"锥形交叉"（conical intersection）的经典判据。`}</Tx>
      <Exercise n="P10.1" title="相位翻转意味着简并点（Longuet-Higgins）" level="★★"
        hint={R`(1) 题中的波函数在绝热变化下只能变号，提示哈密顿量是实对称的（时间反演不变），本征函数可取为实函数。(2) 反证：若闭路所围的圆盘 $D$ 内处处无简并，在可缩的 $D$ 上能否选出光滑的实归一化本征函数？它的 Berry 联络是多少？(3) 一个具体的例子：$H=R_1\sigma_3+R_2\sigma_1$。`}
        solution={R`**设定。**$M=\mathbb{R}^2$，$\boldsymbol R(t)$ 是闭路，围成圆盘 $D$。所讨论的本征态 $\psi(\boldsymbol r,\boldsymbol R)$ 在闭路上绝热演化（动力学相位已扣除），回来时变号：$\psi(\boldsymbol r,\boldsymbol R(1))=-\psi(\boldsymbol r,\boldsymbol R(0))$，即和乐为 $e^{\mathrm{i}\eta}=-1$。这种"只能是 $\pm1$"的相位来自实哈密顿量：$H(\boldsymbol R)$ 实对称时，非简并本征函数可以取为实的，Berry 相位只能是 $0$ 或 $\pi$（模 $2\pi$）。

**反证。**假设所讨论的能级在整个闭圆盘 $D$ 上都非简并（绝热假设处处成立）。

(i) 非简并的实本征函数在每个 $\boldsymbol R$ 处唯一确定到一个符号 $\pm$。这些符号选择构成 $D$ 上的二重覆叠（实线丛的单位球丛，结构群 $\mathbb{Z}_2$）。$D$ 可缩，由 \sref{C9.1}，这个丛平凡：存在 $D$ 上**连续（光滑）选取符号**的实归一化本征函数 $\psi_0(\boldsymbol r,\boldsymbol R)$。

(ii) 对实归一化的 $\psi_0$，Berry 联络为零：$\mathcal{A}=\langle\psi_0|\dd\psi_0\rangle=\frac12\dd\langle\psi_0|\psi_0\rangle=0$。所以平行移动（\eqref{10.157}：$\dot g=-\mathcal{A}g=0$）就是沿着 $\psi_0$ 走，绕闭路回来仍是 $\psi_0(\boldsymbol r,\boldsymbol R(0))$——和乐为 $+1$。（等价地：$\mathcal{F}=\dd\mathcal{A}=0$，由 \eqref{10.168}，$\eta=\mathrm{i}\int_D\mathcal{F}=0$。）

(iii) 但绝热演化给出的态（模动力学相位）就是水平提升（\eqref{10.158}），它是唯一的；与题设 $\psi(\boldsymbol R(1))=-\psi(\boldsymbol R(0))$ 矛盾。

所以 $D$ 内必有一点使所讨论的能级与别的能级简并——在那里本征函数（作为线丛的截面）没有定义，绝热假设失效。$\square$

**拓扑解读：**去掉简并点后，$D-\{\text{点}\}$ 不再可缩，$\pi_1=\mathbb{Z}$，符号覆叠可以是非平凡的（Möbius 型）。实哈密顿量的 Berry 联络是平坦的 $\mathbb{Z}_2$ 联络，它的和乐只能在不可缩闭路上非平凡——与 Aharonov–Bohm 效应同一机制。

**具体例子。**$H=R_1\sigma_3+R_2\sigma_1=R\begin{pmatrix}\cos\phi&\sin\phi\\\sin\phi&-\cos\phi\end{pmatrix}$（实对称，$R_1=R\cos\phi$、$R_2=R\sin\phi$）。本征值 $\pm R$，在 $R=0$ 简并（锥形交叉）。$+R$ 的本征矢为 $(\cos\frac\phi2,\sin\frac\phi2)^{\rm T}$：$\phi$ 从 $0$ 走到 $2\pi$，它连续地变成 $(-1,0)^{\rm T}=-(1,0)^{\rm T}$——绕简并点一圈，波函数变号。这也是自旋 1/2 例子（例 10.8）限制在大圆 $R_2=0$ 平面上的版本：大圆所张立体角 $2\pi$，Berry 相位 $-\frac12\cdot2\pi=-\pi$，$e^{\mathrm{i}\eta}=-1$（交互图 5 取 $\theta_0=\pi/2$ 即可看到）。`}>
        <Tx>{R`考虑坐标为 $${bR}$ 的二维平面 $M$，以及绝热地依赖于 $${bR}$ 的波函数 $\psi=\psi(\boldsymbol r,${bR})$。设 $${bR}:[0,1]\to M$ 是 $M$ 中的闭路，并设 $\psi(\boldsymbol r,${bR}(1))=-\psi(\boldsymbol r,${bR}(0))$，即沿闭路绝热变化后 $\psi$ 的相位改变了 $\pi$。证明闭路内必有一点，在那里绝热假设失效。参见 Longuet-Higgins（1975）。`}</Tx>
      </Exercise>
    </Sec>);
}
