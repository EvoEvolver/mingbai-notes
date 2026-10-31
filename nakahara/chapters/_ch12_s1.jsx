// 引言 + §12.1 椭圆算子与 Fredholm 算子 —— 式 (12.1)–(12.32)，例 12.1–12.2，定理 12.1，习题 12.1
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";
import { FredholmLab } from "./_ch12_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="12.0" title="Introduction" zh="引言：零模的个数是拓扑量"
      gist={R`物理中的微分算子（Laplace、d'Alembert、Dirac）在数学上是向量丛截面之间的映射 $D:\Gamma(M,E)\to\Gamma(M,F)$。它的**解析指标** $\ind D=\dim\ker D-\dim\ker D^\dagger$ 竟然是拓扑不变量，等于某个示性类在 $M$ 上的积分。`}
      why={R`单看 $\dim\ker D$ 很不稳定：稍微改动度规或规范场，零模就可能出现或消失。但"出现与消失总是成对的"，于是差 $\dim\ker D-\dim\ker D^\dagger$ 不随连续形变改变——它只能由拓扑决定。这就是指标定理的直觉，也是第 13 章反常的数学根源。`}
      gives={[]}>
      <p className="muted">本章概念：<C id="analytic_index" /> · <C id="as_theorem" /></p>
      <Tx>{R`物理中经常遇到定义在流形 $M$ 上的微分算子，典型的有 Laplace 算子、d'Alembert 算子和 Dirac 算子。从数学的角度看，这些算子是**截面之间的映射**

$$D:\Gamma(M,E)\to\Gamma(M,F),$$

其中 $E$、$F$ 是 $M$ 上的向量丛。例如 Dirac 算子是映射 $\Gamma(M,E)\to\Gamma(M,E)$，$E$ 是 $M$ 上的自旋丛。如果 $E$、$F$ 上定义了内积（纤维度规），就可以定义 $D$ 的伴随

$$D^\dagger:\Gamma(M,F)\to\Gamma(M,E).$$

作为微分算子，$D$ 携带着关于谱及其简并度的**解析**信息。下面我们只关心 $D$ 与 $D^\dagger$ 的零本征向量（零模）：

$$\ker D\equiv\{s\in\Gamma(M,E)\mid Ds=0\},\qquad\ker D^\dagger\equiv\{s\in\Gamma(M,F)\mid D^\dagger s=0\}.$$

**解析指标**（analytical index）定义为

$$\ind D=\dim\ker D-\dim\ker D^\dagger.$$

令人惊讶的是，这个解析量是一个**拓扑不变量**：它可以写成某个适当的示性类（第 11 章）在 $M$ 上的积分，而后者只携带 $M$ 与丛的拓扑信息。分析与拓扑之间的这种相互作用就是指标定理的主要内容。

**本章的路线**是：先说明什么样的算子有良定义的指标（椭圆 → Fredholm，§12.1），把一串算子组成的椭圆复形也纳入进来；陈述 Atiyah–Singer 指标定理（§12.2）；把它用到四个经典复形——de Rham（§12.3）、Dolbeault（§12.4）、符号差（§12.5）、自旋（§12.6）——分别得到 Gauss–Bonnet–陈、Hirzebruch–Riemann–Roch、Hirzebruch 符号差与 $\hat A$ 亏格的指标定理；然后用热核与 $\zeta$ 函数（§12.7）理解"为什么指标是局部可算的"，用 APS 定理（§12.8）处理带边流形；最后（§12.9–12.10）用超对称量子力学的路径积分**证明**自旋复形的指标定理。

原书的讲述参考 Eguchi 等 (1980)、Gilkey (1984)、Shanahan (1978)、Kulkarni (1975) 与 Booss–Bleecker (1985)；Alvarez (1985) 有一个简明综述，并讨论了在反常与弦论中的应用。`}</Tx>
      <Box kind="physics" title="一个先行的有限维图像">{R`若 $D$ 是从 $\C^m$ 到 $\C^n$ 的矩阵，秩为 $r$，则 $\dim\ker D=m-r$，$\dim\ker D^\dagger=n-r$，差为 $m-n$——**与矩阵元无关**，只由"空间维数"决定。在无穷维情形，$m$、$n$ 都是无穷大，"$m-n$"本身无意义；指标定理告诉我们，这个"维数差"的正确替代物是示性类的积分。交互图 1 让你随意改动矩阵，亲眼看到这一点。`}</Box>
    </Sec>);
}

export function Sec121() {
  return (
    <Sec n="12.1" title="Elliptic operators and Fredholm operators" zh="椭圆算子与 Fredholm 算子"
      gist={R`用主符号 $\sigma(D,\xi)$ 定义椭圆性（最高阶部分在每个余切方向可逆）→ 紧流形上椭圆算子是 Fredholm 算子，指标 $\ind D=\dim\ker D-\dim\operatorname{coker}D$ 良定义，且 $\operatorname{coker}D\cong\ker D^\dagger$（定理 12.1）→ 推广到椭圆复形：指标 $=\sum(-1)^i\dim H^i(E,D)=\sum(-1)^i\dim\ker\Delta_i$，可"卷起"成两项复形；de Rham 复形的指标就是 Euler 示性数。`}
      why={R`无穷维空间上的 $\dim\ker$ 未必有限；只有一类"足够好"的算子才能谈指标。椭圆性是一个可以逐点检验的代数条件（只看最高阶系数），它保证了有限性。复形的语言则把 $\dd$、$\bar\partial$ 这类"平方为零"的算子统一纳入。`}
      gives={["12.3", "12.4", "12.11", "12.12", "12.19", "12.24", "12.28", "12.29"]}>
      <p className="muted">本节概念：<C id="symbol_ellipticity" /> · <C id="analytic_index" /> · <C id="elliptic_complex" /></p>
      <Tx>{R`下面我们只考虑**无边紧流形** $M$ 上向量丛之间的微分算子，并且只处理一类性质良好的算子——Fredholm 算子。`}</Tx>

      <Sub n="12.1.1" title="Elliptic operators" zh="椭圆算子">
        <Tx>{R`**我们要做的事**：给"椭圆"一个可以逐点检验的定义。办法是只看算子的最高阶导数项——它的系数在余切方向 $\xi$ 上组成的矩阵叫做**符号**；符号可逆，算子就椭圆。

设 $E$、$F$ 是流形 $M$ 上的复向量丛。**微分算子** $D$ 是线性映射`}</Tx>
        <Eq n="12.1" say={R`微分算子把丛 $E$ 的截面送到丛 $F$ 的截面——它不是函数到函数的映射，而是"场"到"场"的映射。`}>{R`D:\Gamma(M,E)\to\Gamma(M,F).`}</Eq>
        <Tx>{R`取 $M$ 的一张卡 $U$，使 $E$、$F$ 在 $U$ 上都平凡，记 $U$ 的局部坐标为 $x^\mu$。引入**多重指标**记号：

$$\sym{mi}{M}\equiv(\mu_1,\mu_2,\ldots,\mu_m)\qquad\mu_j\in\Z,\ \mu_j\ge0$$
$$|\sym{mi}{M}|\equiv\mu_1+\mu_2+\cdots+\mu_m$$
$$D_M=\frac{\partial^{|M|}}{\partial x^M}\equiv\frac{\partial^{\mu_1+\cdots+\mu_m}}{\partial(x^1)^{\mu_1}\ldots\partial(x^m)^{\mu_m}}.$$

（这里的 $M$ 是多重指标，不要与流形 $M$ 混淆；原书沿用了同一字母。）若 $\dim E=k$、$\dim F=k'$，$D$ 的最一般形式是`}</Tx>
        <Eq n="12.2" say={R`在局部平凡化下，任何 $N$ 阶微分算子都是"矩阵系数 $\times$ 各阶偏导数"之和：$k$ 个分量进，$k'$ 个分量出。`}>{R`[Ds(x)]^\alpha=\sum_{\substack{|M|\le N\\ 1\le a\le k}}A^{M\alpha}{}_a(x)D_Ms^a(x)\qquad1\le\alpha\le k'`}</Eq>
        <Tx>{R`其中 $s(x)$ 是 $E$ 的截面。注意 $x$ 表示坐标为 $x^\mu$ 的点——这种轻微的记号滥用让式子简洁。$A^M\equiv(A^M)^\alpha{}_a$ 是可以依赖于位置 $x$ 的 $k'\times k$ 矩阵（行指标 $\alpha$ 取 $k'$ 个值，列指标 $a$ 取 $k$ 个值）。\eqref{12.2} 中的正整数 $N$ 称为 $D$ 的**阶**（order）。我们关心的是 $N=1$（Dirac 算子）与 $N=2$（Laplace 算子）。例如，若 $E$ 是 $M$ 上的自旋丛，Dirac 算子 $D\equiv\mathrm{i}\gamma^\mu\partial_\mu+m:\Gamma(M,E)\to\Gamma(M,E)$ 作用在 $E$ 的截面 $\psi(x)$ 上：

$$[D\psi(x)]^\alpha=\mathrm{i}(\gamma^\mu)^\alpha{}_\beta\partial_\mu\psi^\beta(x)+m\psi^\alpha(x).$$

（这里的 $m$ 是质量，不是维数。）

$D$ 的**符号**（symbol）是 $k'\times k$ 矩阵`}</Tx>
        <Eq n="12.3" title="主符号" say={R`符号：只保留最高阶（$N$ 阶）导数项，把每个 $\partial/\partial x^\mu$ 换成一个实数 $\xi_\mu$——相当于看算子作用在高频平面波 $\mathrm{e}^{\mathrm{i}\xi\cdot x}$ 上的主导行为。`}>{R`\sigma(D,\xi)\equiv\sum_{|M|=N}A^{M\alpha}{}_a(x)\xi_M`}</Eq>
        <Tx>{R`其中 $\xi$ 是实的 $m$ 元组 $\xi=(\xi_1,\ldots,\xi_m)$，$\xi_M\equiv(\xi_1)^{\mu_1}\cdots(\xi_m)^{\mu_m}$。

符号也可以**不依赖坐标**地定义。设 $E\xrightarrow{\pi}M$ 是向量丛，$p\in M$，$\xi\in T^*_pM$，$s\in\pi_E^{-1}(p)$。取截面 $\tilde s\in\Gamma(M,E)$ 使 $\tilde s(p)=s$，取函数 $f\in\sym{fun}{\mathcal{F}}(M)$ 使 $f(p)=0$、$\dd f(p)=\xi\in T^*_pM$。于是符号可以定义为`}</Tx>
        <Eq n="12.4" keyEq title="符号的无坐标定义" say={R`让算子作用在 $f^N\tilde s$ 上再取 $p$ 点的值：因为 $f(p)=0$，只有 $N$ 个导数全部落在 $f$ 上的那一项存活，于是自动挑出最高阶部分，并把 $\partial_\mu$ 换成了 $\partial_\mu f=\xi_\mu$。`}>{R`\sigma(D,\xi)s=\frac1{N!}D(f^N\tilde s)|_p.`}</Eq>
        <Tx>{R`条件 $f(p)=0$ 使得因子 $f^N$ 自动挑出 $N$ 阶项。\eqref{12.4} 给出的符号与 \eqref{12.3} 相同。`}</Tx>
        <Derivation title={R`为什么 \eqref{12.4} 与 \eqref{12.3} 一致`} collapsed steps={[
          { tex: R`D_M(f^N\tilde s)=\sum(\text{把 }|M|\text{ 个导数分配到 }f^N\text{ 与 }\tilde s\text{ 上的各项})`, why: R`Leibniz 法则。每一项中，落在 $f^N$ 上的导数个数为 $j\le|M|\le N$。` },
          { tex: R`\partial^{j}(f^N)\big|_p=0\quad(j<N)`, why: R`$f^N$ 的 $j$ 阶导数中每一项都至少保留 $N-j\ge1$ 个未求导的 $f$ 因子，而 $f(p)=0$。所以只有 $|M|=N$ 且全部 $N$ 个导数都落在 $f^N$ 上的项存活。` },
          { tex: R`\frac{\partial^N(f^N)}{\partial x^M}\Big|_p=N!\,(\partial_1f)^{\mu_1}\cdots(\partial_mf)^{\mu_m}\big|_p=N!\,\xi_M`, why: R`同理，$N$ 个导数必须分别作用在 $N$ 个不同的 $f$ 因子上（否则仍留下一个 $f(p)=0$）；这样的分配方式共 $N!$ 种。` },
          { tex: R`\frac1{N!}D(f^N\tilde s)|_p=\sum_{|M|=N}A^{M\alpha}{}_a\xi_Ms^a=\sigma(D,\xi)s`, why: R`代回 \eqref{12.2} 即得 \eqref{12.3}。由于 \eqref{12.4} 的左边只用到 $\dd f(p)=\xi$，符号是余切向量 $\xi$ 的函数，与坐标无关。` },
        ]} />
        <Tx>{R`若对每个 $x\in M$ 与每个 $\xi\in\R^m-\{0\}$，矩阵 $\sigma(D,\xi)$ 都可逆，就称算子 $D$ 是**椭圆的**（elliptic）。显然这个定义只在 $k=k'$ 时有意义。注意复合算子 $D=D_1\circ D_2$ 的符号是符号的复合：$\sigma(D,\xi)=\sigma(D_1,\xi)\sigma(D_2,\xi)$。这说明椭圆算子的复合仍是椭圆的。一般地，椭圆算子的幂与根也是椭圆的。`}</Tx>
        <Box kind="example" n="12.1" title={R`Laplace 算子是椭圆的，d'Alembert 算子不是`}>
          <Tx>{R`设 $x^\mu$ 是 $\R^m$ 的自然坐标。若 $E$、$F$ 是 $\R^m$ 上的实线丛，Laplace 算子 $\Delta:\Gamma(\R^m,E)\to\Gamma(\R^m,F)$ 定义为`}</Tx>
          <Eq n="12.5" say={R`平直空间的 Laplace 算子：所有方向的二阶导数同号相加。`}>{R`\Delta\equiv\frac{\partial^2}{\partial(x^1)^2}+\cdots+\frac{\partial^2}{\partial(x^m)^2}.`}</Eq>
          <Tx>{R`按 \eqref{12.3}，符号为

$$\sigma(\Delta,\xi)=\sum_\mu(\xi_\mu)^2.$$

这与由 \eqref{12.4} 得到的结果一致：

$$\begin{aligned}\sigma(\Delta,\xi)s&=\frac12\Delta(f^2\tilde s)|_p=\frac12\sum\frac{\partial^2}{\partial(x^\mu)^2}(f^2\tilde s)|_p\\&=\frac12\Big(f^2\Delta\tilde s+2f\Delta f\tilde s+4f\sum\frac{\partial f}{\partial x^\mu}\frac{\partial\tilde s}{\partial x^\mu}+2\sum\frac{\partial f}{\partial x^\mu}\frac{\partial f}{\partial x^\mu}\tilde s\Big)\Big|_p\\&=\sum(\xi_\mu)^2s.\end{aligned}$$

（第二行中含因子 $f$ 的前三项在 $p$ 点为零，只剩最后一项。交叉项 $2\nabla(f^2)\cdot\nabla\tilde s=4f\nabla f\cdot\nabla\tilde s$ 的系数原书印作 $2$，因该项在 $p$ 点为零，不影响结果。）这个符号在 $\xi\neq0$ 时显然可逆，所以 $\Delta$ 是椭圆的。

然而 d'Alembert 算子`}</Tx>
          <Eq n="12.6" say={R`d'Alembert 算子：最后一个方向（时间）的二阶导数带负号——符号在光锥上为零，所以不是椭圆的。`}>{R`\Box\equiv\frac{\partial^2}{\partial(x^1)^2}+\cdots+\frac{\partial^2}{\partial(x^{m-1})^2}-\frac{\partial^2}{\partial(x^m)^2}`}</Eq>
          <Tx>{R`不是椭圆的，因为它的符号

$$\sigma(\Box,\xi)=(\xi^1)^2+\cdots+(\xi^{m-1})^2-(\xi^m)^2$$

在整个光锥 $(\xi^m)^2=(\xi^1)^2+\cdots+(\xi^{m-1})^2$ 上都为零。`}</Tx>
          <Box kind="physics" title="椭圆 vs 双曲：为什么指标理论用 Euclid 号差">{R`椭圆算子的解"处处光滑、由边界值决定"（如静电势）；双曲算子允许沿特征线（光锥）传播的奇异性（如波前）。光锥上的零模有无穷多个，所以 $\Box$ 不可能是 Fredholm 算子。这就是本章（以及第 13 章计算反常时）始终假设度规为 Euclid 号差的原因：Wick 转动把 $\Box$ 变成 $\Delta$。`}</Box>
        </Box>
        <Exercise n="12.1" title="二阶椭圆算子与椭圆" level="★"
          hint={R`把符号写成二次型 $\sigma=\xi^{\rm T}A\xi$，$A=\begin{pmatrix}A_{11}&A_{12}\\ A_{12}&A_{22}\end{pmatrix}$。椭圆 ⇔ $\xi\neq0$ 时 $\sigma\neq0$ ⇔ $A$ 正定或负定 ⇔ $\det A>0$。再看二次曲线 $\xi^{\rm T}A\xi=1$ 的分类。`}
          solution={R`$D$ 是标量算子（$k=k'=1$），符号是 $1\times1$ 矩阵，可逆即非零。所以 $D$ 椭圆 ⇔ 对所有 $\xi\neq0$ 有 $\sigma(D,\xi)\neq0$。

把 $\sigma$ 看成实对称矩阵 $A$ 的二次型，设其本征值为 $a_1,a_2$。$\xi\mapsto\sigma$ 在 $\xi\neq0$ 上无零点 ⇔ 二次型定号 ⇔ $a_1a_2=\det A=A_{11}A_{22}-A_{12}^2>0$。（若 $\det A<0$，二次型不定号，在两条直线上为零——这正是双曲型；若 $\det A=0$，在一条直线上为零——抛物型。）

另一方面，在主轴坐标中 $\sigma=a_1\eta_1^2+a_2\eta_2^2$，曲线 $\sigma=1$：$a_1,a_2>0$ 时是椭圆；一正一负时是双曲线；一个为零时是一对平行直线；都为负时是空集。

所以：若 $\sigma=1$ 是椭圆，则 $a_1,a_2>0$，$D$ 椭圆；反之若 $D$ 椭圆，则 $A$ 正定或负定——正定时 $\sigma=1$ 是椭圆，负定时把 $D$ 换成 $-D$（椭圆性不变）即可。命题在"差一个整体符号"的意义下成立，"椭圆算子"之名即由此而来。`}>
          {R`设 $M=\R^2$，考虑二阶微分算子 $D$。$D$ 的符号形如 $\sigma(D,\xi)=A_{11}\xi^1\xi^1+2A_{12}\xi^1\xi^2+A_{22}\xi^2\xi^2$。证明：$D$ 是椭圆的当且仅当 $\sigma(D,\xi)=1$ 是 $\xi$ 空间中的椭圆。`}
        </Exercise>
      </Sub>

      <Sub n="12.1.2" title="Fredholm operators" zh="Fredholm 算子">
        <Tx>{R`**我们要做的事**：给指标下定义，并把"余核"换成可计算的"伴随的核"。

设 $D:\Gamma(M,E)\to\Gamma(M,F)$ 是椭圆算子。$D$ 的**核**是零本征向量的集合`}</Tx>
        <Eq n="12.7" say={R`核：被 $D$ 消灭的截面——物理上就是零能模（零模）。`}>{R`\ker D\equiv\{s\in\Gamma(M,E)\mid Ds=0\}.`}</Eq>
        <Tx>{R`设 $E$、$F$ 分别带有纤维度规 $\langle\ ,\ \rangle_E$、$\langle\ ,\ \rangle_F$。$D$ 的**伴随** $D^\dagger:\Gamma(M,F)\to\Gamma(M,E)$ 由下式定义：`}</Tx>
        <Eq n="12.8" say={R`伴随算子的定义：在 $F$ 中把 $D$ 作用在右边，等于在 $E$ 中把 $D^\dagger$ 作用在左边（内积包括对 $M$ 的积分，相当于分部积分）。`}>{R`\langle s',Ds\rangle_F\equiv\langle D^\dagger s',s\rangle_E`}</Eq>
        <Tx>{R`其中 $s\in\Gamma(M,E)$，$s'\in\Gamma(M,F)$。（这里的内积指先逐点用纤维度规、再对 $M$ 积分。）定义 $D$ 的**余核**为`}</Tx>
        <Eq n="12.9" say={R`余核：目标空间中"打不到"的方向——$F$ 的截面模去 $D$ 的像。`}>{R`\operatorname{coker}D\equiv\Gamma(M,F)/\operatorname{im}D.`}</Eq>
        <Tx>{R`在椭圆算子中，我们关心核与余核都是有限维的那一类。满足这一条件的椭圆算子称为 **Fredholm 算子**。对 Fredholm 算子，**解析指标**`}</Tx>
        <Eq n="12.10" title="解析指标" say={R`指标 = 方程 $Ds=0$ 的独立解数 − 方程 $Ds=f$ 可解所需的独立约束数。`}>{R`\ind D\equiv\dim\ker D-\dim\operatorname{coker}D`}</Eq>
        <Tx>{R`是良定义的。此后我们只考虑 Fredholm 算子。由一般的算子理论可知，**紧**流形上的椭圆算子是 Fredholm 算子（\sref{X:elliptic-Fredholm}）。定理 12.1 说明 $\ind D$ 也可以写成`}</Tx>
        <Eq n="12.11" keyEq title="指标 = 两个核的维数差" say={R`物理学家常用的指标：$D$ 的零模数减去 $D^\dagger$ 的零模数。`}>{R`\ind D=\dim\ker D-\dim\ker D^\dagger.`}</Eq>
        <Stmt id="T12.1">
          <Eq n="12.12" say={R`余核同构于伴随算子的核：每个"打不到"的方向都可以选一个与 $\operatorname{im}D$ 正交的代表，它正好满足 $D^\dagger s=0$。`}>{R`\operatorname{coker}D\cong\ker D^\dagger\equiv\{s\in\Gamma(M,F)\mid D^\dagger s=0\}.`}</Eq>
          <Proof steps={[
            { claim: R`设 $[s]\in\operatorname{coker}D$ 为等价类 $[s]=\{s'\in\Gamma(M,F)\mid s'=s+Du,\ u\in\Gamma(M,E)\}$。考虑映射 $\Phi:\ker D^\dagger\to\operatorname{coker}D$，$s_0\mapsto[s_0]$。先证**满射**：每个 $[s]$ 都有一个属于 $\ker D^\dagger$ 的代表 $s_0$。` },
            { claim: R`定义（$D^\dagger D$ 的逆理解为在 $(\ker D)^\perp$ 上的逆，见下一步）`, tex: R`s_0\equiv s-D\frac{1}{D^\dagger D}D^\dagger s.`, uses: ["12.13"] },
            { claim: R`这个定义有意义：$D^\dagger s\in\operatorname{im}D^\dagger$，而 $\operatorname{im}D^\dagger\perp\ker D$（若 $Du=0$，则 $\langle u,D^\dagger s\rangle=\langle Du,s\rangle=0$）。$D^\dagger D$ 在 $(\ker D)^\perp$ 上没有零本征值，因而在其上可逆（Fredholm 性保证非零本征值不聚集于零）。原书直接写 $(D^\dagger D)^{-1}$，当 $\ker D\neq0$ 时需要这样理解。`, fill: true, uses: ["X:elliptic-Fredholm"] },
            { claim: R`$s_0\in\ker D^\dagger$：`, tex: R`D^\dagger s_0=D^\dagger s-D^\dagger D(D^\dagger D)^{-1}D^\dagger s=D^\dagger s-D^\dagger s=0,`, why: R`而 $s_0-s\in\operatorname{im}D$，所以 $[s_0]=[s]$。` },
            { claim: R`再证**单射**：设 $s_0,s_0'\in\ker D^\dagger$ 且 $s_0\neq s_0'$，要证 $[s_0]\neq[s_0']$。若 $[s_0]=[s_0']$，则存在 $u\in\Gamma(M,E)$ 使 $s_0-s_0'=Du$。于是`, tex: R`0=\langle u,D^\dagger(s_0-s_0')\rangle_E=\langle u,D^\dagger Du\rangle_E=\langle Du,Du\rangle_F\ge0,`, uses: ["12.8"] },
            { claim: R`因此 $Du=0$，即 $s_0=s_0'$，与假设矛盾。所以 $\Phi$ 是双射（而且是线性的），$\operatorname{coker}D\cong\ker D^\dagger$。` },
          ]} />
        </Stmt>
        <Eq n="12.13" say={R`从任意代表 $s$ 中减去它在 $\operatorname{im}D$ 上的正交投影 $D(D^\dagger D)^{-1}D^\dagger s$，剩下的部分正交于 $\operatorname{im}D$，即落在 $\ker D^\dagger$ 中。`}>{R`s_0\equiv s-D\frac{1}{D^\dagger D}D^\dagger s.`}</Eq>
        <Box kind="note" title={R`\eqref{12.13} 的几何意义`}>{R`$P\equiv D(D^\dagger D)^{-1}D^\dagger$ 满足 $P^2=P$、$P^\dagger=P$，且 $P$ 在 $\operatorname{im}D$ 上是恒等：它是到 $\operatorname{im}D$ 的正交投影。所以 $s_0=(1-P)s$ 是 $s$ 在 $(\operatorname{im}D)^\perp=\ker D^\dagger$ 上的投影。定理 12.1 本质上就是正交分解 $\Gamma(M,F)=\operatorname{im}D\oplus\ker D^\dagger$——有限维线性代数中 $\C^n=\operatorname{im}A\oplus\ker A^\dagger$ 的推广。`}</Box>
        <FredholmLab />
      </Sub>

      <Sub n="12.1.3" title="Elliptic complexes" zh="椭圆复形">
        <Tx>{R`**我们要做的事**：$\dd$、$\bar\partial$ 这类算子平方为零，自然排成一串。把单个算子的指标推广到一串算子，得到"交错和"的指标——它推广了 Euler 示性数。

考虑一列 Fredholm 算子`}</Tx>
        <Eq n="12.14" say={R`一列算子首尾相接：$D_i$ 把第 $i$ 个丛的截面送到第 $i+1$ 个丛。`}>{R`\cdots\to\Gamma(M,E_{i-1})\xrightarrow{D_{i-1}}\Gamma(M,E_i)\xrightarrow{D_i}\Gamma(M,E_{i+1})\xrightarrow{D_{i+1}}\cdots`}</Eq>
        <Tx>{R`其中 $\{E_i\}$ 是紧流形 $M$ 上的一列向量丛。若对每个 $i$，$D_i$ 是**幂零的**（nilpotent），即 $D_i\circ D_{i-1}=0$，就称序列 $(E_i,D_i)$ 为**椭圆复形**（elliptic complex）。读者可以想 $\Gamma(M,E_i)=\Omega^i(M)$、$D_i=\dd$（外微分）这个例子。$D_i:\Gamma(M,E_i)\to\Gamma(M,E_{i+1})$ 的伴随记作

$$D_i^\dagger:\Gamma(M,E_{i+1})\to\Gamma(M,E_i).$$

**Laplace 算子** $\Delta_i:\Gamma(M,E_i)\to\Gamma(M,E_i)$ 是`}</Tx>
        <Eq n="12.15" say={R`复形的 Laplace 算子：从左边进来再出去，加上从右边出去再回来——与 $\dd\dd^\dagger+\dd^\dagger\dd$ 同构。`}>{R`\Delta_i\equiv D_{i-1}D_{i-1}^\dagger+D_i^\dagger D_i.`}</Eq>
        <Box kind="warning" title="椭圆复形的确切定义">{R`严格地说，复形中单个 $D_i$ 一般**不是**椭圆的（$E_i$、$E_{i+1}$ 维数不同时符号根本不是方阵），也未必是 Fredholm 算子（§12.3 指出 $\ker\dd$ 是无穷维的）。正确的定义是：**符号序列** $\cdots\to E_{i,p}\xrightarrow{\sigma(D_i,\xi)}E_{i+1,p}\to\cdots$ 对每个 $\xi\neq0$ 是**正合的**；等价地，每个 Laplace 算子 $\Delta_i$ 是椭圆的。原书"Fredholm 算子序列"的说法应在这个意义下理解：有限维的是上同调 $H^i(E,D)$。`}</Box>
        <Tx>{R`Hodge 分解对此也成立（\sref{F:hodge12}）：`}</Tx>
        <Eq n="12.16" say={R`Hodge 分解：任何截面都唯一地拆成"恰当"（来自左边）+"余恰当"（来自右边的伴随）+"调和"三块，两两正交。`}>{R`s_i=D_{i-1}s_{i-1}+D_i^\dagger s_{i+1}+h_i`}</Eq>
        <Tx>{R`其中 $s_{i\pm1}\in\Gamma(M,E_{i\pm1})$，$h_i$ 属于 $\Delta_i$ 的核：$\Delta_ih_i=0$。仿照 de Rham 上同调群，定义`}</Tx>
        <Eq n="12.17" say={R`复形的上同调：$D_i$ 的核模去 $D_{i-1}$ 的像——"闭"模去"恰当"。`}>{R`H^i(E,D)\equiv\ker D_i/\operatorname{im}D_{i-1}.`}</Eq>
        <Tx>{R`与 de Rham 理论一样，可以证明 $H^i(E,D)$ 同构于 $\Delta_i$ 的核。于是`}</Tx>
        <Eq n="12.18" say={R`上同调的维数 = 调和截面的个数：一个代数/拓扑量变成了一个解析量。`}>{R`\dim H^i(E,D)=\dim\mathrm{Harm}^i(E,D)`}</Eq>
        <Tx>{R`其中 $\mathrm{Harm}^i(E,D)$ 是由 $\{h_i\}$ 张成的向量空间。`}</Tx>
        <Stmt id="F:hodge12">
          <Proof title="证明要点（与第 7 章平行）" collapsed steps={[
            { claim: R`$\Delta_ih=0\iff D_ih=0$ 且 $D_{i-1}^\dagger h=0$：`, tex: R`\langle h,\Delta_ih\rangle=\langle D_{i-1}^\dagger h,D_{i-1}^\dagger h\rangle+\langle D_ih,D_ih\rangle=\|D_{i-1}^\dagger h\|^2+\|D_ih\|^2.`, fill: true },
            { claim: R`三个子空间两两正交：$\langle D_{i-1}a,D_i^\dagger b\rangle=\langle D_iD_{i-1}a,b\rangle=0$（幂零性）；$\langle D_{i-1}a,h\rangle=\langle a,D_{i-1}^\dagger h\rangle=0$；$\langle D_i^\dagger b,h\rangle=\langle b,D_ih\rangle=0$。`, fill: true },
            { claim: R`它们张满整个空间：这一步需要 $\Delta_i$ 的椭圆性（$\operatorname{im}\Delta_i$ 闭，$\Gamma(M,E_i)=\operatorname{im}\Delta_i\oplus\ker\Delta_i$），与第 7 章的 \sref{X:Hodge-analysis} 同理。`, uses: ["T7.7", "X:elliptic-Fredholm"] },
            { claim: R`若 $D_is_i=0$，则 $0=\langle D_i^\dagger s_{i+1},D_is_i\rangle$ 中取 $s_i$ 的分解可知余恰当部分 $D_i^\dagger s_{i+1}$ 满足 $\|D_i^\dagger s_{i+1}\|^2=\langle s_{i+1},D_iD_i^\dagger s_{i+1}\rangle=\langle s_{i+1},D_is_i\rangle=0$。所以闭截面 = 恰当 + 调和，$[s_i]\mapsto h_i$ 是 $H^i(E,D)\to\mathrm{Harm}^i$ 的同构。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`这个椭圆复形的**指标**定义为`}</Tx>
        <Eq n="12.19" keyEq title="椭圆复形的指标" say={R`复形的指标是各级上同调维数的交错和，也等于各级调和截面个数的交错和——Euler 示性数的推广。`}>{R`\ind D\equiv\sum_{i=0}^m(-1)^i\dim H^i(E,D)=\sum_{i=0}^m(-1)^i\dim\ker\Delta_i.`}</Eq>
        <Tx>{R`这样定义的指标推广了 Euler 示性数，见例 12.2。

**它与 \eqref{12.10} 是什么关系？**考虑复形 $\Gamma(M,E)\xrightarrow{D}\Gamma(M,F)$。我们可以在两边形式地补上零：`}</Tx>
        <Eq n="12.20" say={R`单个算子也是一个复形：两端补上零空间，左边是包含映射，右边是零映射。`}>{R`0\xrightarrow{i}\Gamma(M,E)\xrightarrow{D}\Gamma(M,F)\xrightarrow{\varphi}0`}</Eq>
        <Tx>{R`其中 $i$ 是包含映射。按 \eqref{12.19}，指标为

$$\dim\ker D-\{\dim\Gamma(M,F)-\dim\operatorname{im}D\}=\dim\ker D-\dim\operatorname{coker}D$$

这里用到了 $\dim\operatorname{im}i=0$、$\ker\varphi=\Gamma(M,F)$ 以及 $\operatorname{coker}D=\ker\varphi/\operatorname{im}D$。（"$\dim\Gamma(M,F)-\dim\operatorname{im}D$"是形式写法，二者都是无穷维的，有意义的是商空间的维数。）所以 \eqref{12.19} 给出与 \eqref{12.10} 相同的指标。

**卷起。**常常方便的做法是把复形换成一个**两项**椭圆复形，它与原复形 $(E,D)$ 有相同的指标。这一"卷起"（rolling up）的做法是定义`}</Tx>
        <Eq n="12.21" say={R`把所有偶数级的丛直和起来，所有奇数级的丛直和起来——就像把形式按奇偶次数分组。`}>{R`E_+\equiv\mathop{\oplus}_rE_{2r},\qquad E_-\equiv\mathop{\oplus}_rE_{2r+1}`}</Eq>
        <Tx>{R`分别称为**偶丛**与**奇丛**（even bundle、odd bundle）。相应地考虑算子`}</Tx>
        <Eq n="12.22" say={R`卷起后的算子：从偶级出发，既可以用 $D$ 往上走一级，也可以用 $D^\dagger$ 往下走一级——两条路都到奇级。`}>{R`A\equiv\mathop{\oplus}_r(D_{2r}+D_{2r-1}^\dagger),\qquad A^\dagger\equiv\mathop{\oplus}_r(D_{2r+1}+D_{2r}^\dagger).`}</Eq>
        <Tx>{R`容易验证 $A:\Gamma(M,E_+)\to\Gamma(M,E_-)$、$A^\dagger:\Gamma(M,E_-)\to\Gamma(M,E_+)$。由 $A$ 与 $A^\dagger$ 构造两个 Laplace 算子`}</Tx>
        <Eq n="12.23a" say={R`$A^\dagger A$ 恰好是所有偶数级 Laplace 算子的直和：交叉项因幂零性 $D^2=0$ 而消失。`}>{R`\begin{aligned}\Delta_+\equiv A^\dagger A&=\mathop{\oplus}_{r,s}(D_{2r+1}+D_{2r}^\dagger)(D_{2s}+D_{2s-1}^\dagger)\\&=\mathop{\oplus}_r(D_{2r-1}D_{2r-1}^\dagger+D_{2r}^\dagger D_{2r})=\mathop{\oplus}_r\Delta_{2r}\end{aligned}`}</Eq>
        <Eq n="12.23b" say={R`同理，$AA^\dagger$ 是所有奇数级 Laplace 算子的直和。`}>{R`\Delta_-\equiv AA^\dagger=\mathop{\oplus}_r\Delta_{2r+1}.`}</Eq>
        <Derivation title={R`\eqref{12.23a} 中交叉项为何消失`} collapsed steps={[
          { tex: R`(D_{2r+1}+D_{2r}^\dagger)(D_{2s}+D_{2s-1}^\dagger)\Big|_{\Gamma(E_{2s})}`, why: R`作用在 $E_{2s}$ 的截面上。$D_{2s}$ 把它送到 $E_{2s+1}$，$D^\dagger_{2s-1}$ 把它送到 $E_{2s-1}$。` },
          { tex: R`D_{2s+1}D_{2s}=0,\qquad D_{2s-2}^\dagger D_{2s-1}^\dagger=(D_{2s-1}D_{2s-2})^\dagger=0`, why: R`从 $E_{2s+1}$ 继续往上（$D_{2s+1}$）或从 $E_{2s-1}$ 继续往下（$D^\dagger_{2s-2}$）的两条"走两步"路径都因幂零性为零。` },
          { tex: R`\text{剩下}\ D_{2s}^\dagger D_{2s}+D_{2s-1}D_{2s-1}^\dagger=\Delta_{2s}`, why: R`只有"上去再下来"与"下去再上来"两条回到 $E_{2s}$ 的路径存活，正是 \eqref{12.15}。奇数级同理。` },
        ]} />
        <Tx>{R`于是`}</Tx>
        <Eq n="12.24" say={R`卷起后的两项复形与原复形有相同的指标：偶数级零模数减奇数级零模数。`}>{R`\begin{aligned}\ind(E_\pm,A)&=\dim\ker\Delta_+-\dim\ker\Delta_-\\&=\sum(-1)^r\dim\ker\Delta_r=\ind(E,D).\end{aligned}`}</Eq>
        <Stmt id="F:rollup12" />
        <Box kind="example" n="12.2" title={R`de Rham 复形与 Euler 示性数`}>
          <Tx>{R`考虑无边紧流形 $M$ 上的 de Rham 复形 $\Omega(M)$：`}</Tx>
          <Eq n="12.25" say={R`de Rham 复形：0 形式、1 形式……$m$ 形式由外微分 $\dd$ 依次连接，$\dd^2=0$。`}>{R`0\xrightarrow{i}\Omega^0(M)\xrightarrow{\dd}\Omega^1(M)\xrightarrow{\dd}\cdots\xrightarrow{\dd}\Omega^m(M)\xrightarrow{\dd}0`}</Eq>
          <Tx>{R`其中 $m=\dim M$，$\dd$ 代表 $\dd_r:\Omega^r(M)\to\Omega^{r+1}(M)$。由 \eqref{12.25} 定义的 $H^r(E,D)$ 就是 de Rham 上同调群 $H^r(M;\R)$（原书误印为下标 $H_r$）。指标就是 Euler 示性数：`}</Tx>
          <Eq n="12.26" say={R`de Rham 复形的指标 = Betti 数的交错和 = Euler 示性数。`}>{R`\ind(\Omega^*(M),\dd)=\sum_{r=0}^m(-1)^r\dim H^r(M;\R)=\chi(M).`}</Eq>
          <Tx>{R`第 7 章已经知道，$b^r\equiv\dim H^r(M;\R)$ 等于线性无关的调和 $r$ 形式个数：$\dim H^r(M;\R)=\dim\mathrm{Harm}^r(M)=\dim\ker\Delta_r$（\sref{T7.8}），其中 $\Delta_r$ 是 Laplace 算子`}</Tx>
          <Eq n="12.27" say={R`形式上的 Laplace 算子是 $\dd+\dd^\dagger$ 的平方。`}>{R`\Delta_r=(\dd+\dd^\dagger)^2=\dd_{r-1}\dd_{r-1}^\dagger+\dd_r^\dagger\dd_r`}</Eq>
          <Tx>{R`$\dd_r^\dagger:\Omega^{r+1}(M)\to\Omega^r(M)$ 是 $\dd_r$ 的伴随。现在得到`}</Tx>
          <Eq n="12.28" title="Euler 示性数 = 调和形式的交错计数" say={R`左边可以由三角剖分数出来（纯拓扑），右边是偏微分方程 $\Delta_ru=0$ 的解空间维数（纯分析）——二者相等。`}>{R`\chi(M)=\sum_{r=0}^m(-1)^r\dim\ker\Delta_r.`}</Eq>
          <Tx>{R`这个关系非常有意思：左边是纯拓扑量，例如可以通过对 $M$ 作三角剖分算出；右边由解析方程 $\Delta_ru=0$ 的解给出。例 11.6 中指出，$\chi(M)$ 等于 Euler 类在 $M$ 上的积分：$\chi(M)=\int_Me(TM)$。于是 \eqref{12.28} 变成`}</Tx>
          <Eq n="12.29" keyEq title="指标定理的典型形式" say={R`指标定理的原型：左边是解析指标（调和形式个数的交错和），右边是拓扑指标（示性类的积分）。`}>{R`\sum_{r=0}^m(-1)^r\dim\ker\Delta_r=\int_Me(TM).`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{12.29} 的求和下限`}>{R`原书 \eqref{12.29} 印作 $\sum_{r=1}^m$，漏了 $r=0$ 项（常函数，$\dim\ker\Delta_0=b^0=1$）。由 \eqref{12.28}，求和应从 $r=0$ 开始；例如 $S^2$ 上 $b^0-b^1+b^2=1-0+1=2=\chi(S^2)$，从 $r=1$ 开始只得 $1$。另：原书正文把左边称为"解析指标"、右边称为"拓扑指标"（the RHS is an analytic index while the LHS is …）恰好说反了，这里已按式子的实际左右写对。`}</Box>
          <Tx>{R`这是指标定理的典型形式：左边是**解析指标**，右边是由某些示性类的积分给出的**拓扑指标**。§12.3 将从 Atiyah–Singer 指标定理推出 \eqref{12.29}。

对应的两项复形是`}</Tx>
          <Eq n="12.30" say={R`卷起 de Rham 复形：偶次形式与奇次形式。`}>{R`\Omega^+(M)\equiv\mathop{\oplus}_r\Omega^{2r}(M)\qquad\Omega^-(M)\equiv\mathop{\oplus}_r\Omega^{2r+1}(M).`}</Eq>
          <Tx>{R`相应的算子是`}</Tx>
          <Eq n="12.31" say={R`卷起后的算子就是 $\dd+\dd^\dagger$ 分别限制在偶形式与奇形式上。`}>{R`A\equiv\mathop{\oplus}_r(\dd_{2r}+\dd_{2r-1}^\dagger)\qquad A^\dagger\equiv\mathop{\oplus}_r(\dd_{2r+1}+\dd_{2r}^\dagger).`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{12.31} 中 $A^\dagger$ 的下标`}>{R`原书印作 $A^\dagger\equiv\oplus_r(\dd_{2r-1}+\dd^\dagger_{2r})$。按一般公式 \eqref{12.22}，应为 $\oplus_r(\dd_{2r+1}+\dd^\dagger_{2r})$：$A^\dagger$ 作用在奇形式 $\Omega^{2r+1}$ 上，$\dd_{2r+1}$ 才是从 $\Omega^{2r+1}$ 出发的外微分（而 $\dd_{2r-1}$ 从 $\Omega^{2r-1}$ 出发，与 $\dd^\dagger_{2r}$ 的定义域 $\Omega^{2r+1}$ 不一致）。`}</Box>
          <Tx>{R`留给读者证明（下面已补全）`}</Tx>
          <Eq n="12.32" say={R`卷起后的 de Rham 复形指标仍是 Euler 示性数：偶次调和形式数减奇次调和形式数。`}>{R`\ind(\Omega^\pm(M),A)=\dim\ker A-\dim\ker A^\dagger=\chi(M).`}</Eq>
          <Derivation title={R`证明 \eqref{12.32}`} collapsed steps={[
            { tex: R`\ker A=\ker A^\dagger A=\ker\Big(\mathop{\oplus}_r\Delta_{2r}\Big)=\mathop{\oplus}_r\mathrm{Harm}^{2r}(M)`, why: R`$\langle\omega,A^\dagger A\omega\rangle=\|A\omega\|^2$，所以 $\ker A=\ker A^\dagger A$；再用 \eqref{12.23a}（这里 $D_r=\dd_r$）。` },
            { tex: R`\ker A^\dagger=\ker AA^\dagger=\mathop{\oplus}_r\mathrm{Harm}^{2r+1}(M)`, why: R`同理用 \eqref{12.23b}。` },
            { tex: R`\dim\ker A-\dim\ker A^\dagger=\sum_r b^{2r}-\sum_rb^{2r+1}=\sum_r(-1)^rb^r=\chi(M)`, why: R`由 Hodge 定理 $\dim\mathrm{Harm}^r=b^r$，再用 \eqref{12.26}。原书把左边写成"$\dim\ker A_+-\dim\ker A_-$"，指的就是 $A$ 与 $A^\dagger$ 的核。` },
          ]} />
        </Box>
      </Sub>
    </Sec>);
}
