// §10.5.5 瞬子 —— 式 (10.110)–(10.128)，引理 10.3–10.4，定理 10.7，图 10.5，交互图 4（映射度）
import { Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Figure, C } from "@kit";
import { InstantonLab } from "./_ch10_demos.jsx";

const R = String.raw;
const SP = R`\sym{pauli}{\sigma}`;
const VOL = R`\sym{volS3}{\omega}`;

export function Sub1055() {
  return (
    <Sub n="10.5.5" title="Instantons" zh="瞬子">
      <p className="muted">本小节概念：<C id="instanton" /></p>
      <Tx>{R`**为什么要 Euclid。**路径积分只在 Euclid 度规的空间上有良好定义。计算这个积分时，重要的是找到 **Euclid** 作用量的局部极小，并计算其周围的量子涨落。考虑四维 Euclid 空间 $\mathbb{R}^4$ 上的 SU(2) 规范理论。这个理论的局部极小称为**瞬子**（instantons，或*赝粒子* pseudoparticles，Belavin 等 1975），见 §1.10。容易验证 Euclid 作用量为`}</Tx>
      <Eq n="10.110" say={R`Euclid Yang–Mills 作用量：反 Hermite 生成元下 $\Tr\mathcal{F}^2\le0$，前面的负号使作用量非负。`}>{R`\mathcal{S}^{\rm E}_{\rm YM}[\mathcal{A}]=-\frac14\int_M\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu})=-\frac12\int_M\Tr(\mathcal{F}\wedge*\mathcal{F})`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{10.110} 第一个表达式的符号（p.425）`}>{R`原书印作 $\frac14\int\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu})=-\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})$。在 Euclid 度规下 $\mathcal{F}\wedge*\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\mathcal{F}_{\mu\nu}\,\dd^4x$（约定同第 7 章 \eqref{7.172}，即 \eqref{7.178} 取 $r=2$、$g=\delta$；直接展开：$*(\dd x^\mu\wedge\dd x^\nu)=\frac12\epsilon_{\mu\nu\kappa\lambda}\dd x^\kappa\wedge\dd x^\lambda$，$\epsilon_{\mu\nu\kappa\lambda}\epsilon_{\rho\sigma\kappa\lambda}=2(\delta_{\mu\rho}\delta_{\nu\sigma}-\delta_{\mu\sigma}\delta_{\nu\rho})$），两端相差一个负号。正确的是 $-\frac14$：$\mathcal{F}_{\mu\nu}$ 反 Hermite，$\Tr(\mathcal{F}_{\mu\nu}\mathcal{F}_{\mu\nu})=-\frac12F_{\mu\nu}{}^\alpha F_{\mu\nu}{}^\alpha\le0$，Euclid 作用量必须非负。后面 \eqref{10.112} 用的正是 $-\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})$。正文已改正。`}</Box>
      <Tx>{R`其中 Hodge $*$ 相对于 Euclid 度规。§1.10 已经证明，瞬子对应的场强是自对偶（反自对偶）的：`}</Tx>
      <Eq n="10.111" say={R`瞬子的场强等于（或等于负的）自己的 Hodge 对偶：这是一阶方程，自动满足二阶的 Yang–Mills 方程。`}>{R`\mathcal{F}_{\mu\nu}=\pm*\mathcal{F}_{\mu\nu}.`}</Eq>
      <Tx>{R`（由 Bianchi 恒等式，$\mathcal{D}*\mathcal{F}=\pm\mathcal{D}\mathcal{F}=0$，所以 \eqref{10.111} 的解自动是 Yang–Mills 方程 \eqref{10.109} 的解。）自对偶（反自对偶）场位形的作用量为`}</Tx>
      <Eq n="10.112" keyEq title="瞬子作用量 = 拓扑项" say={R`对自对偶场，作用量化为 $\Tr\mathcal{F}\wedge\mathcal{F}$ 的积分——一个不依赖度规、只依赖拓扑的量。`}>{R`\mathcal{S}^{\rm E}_{\rm YM}[\mathcal{A}]=-\frac12\int_M\Tr(\mathcal{F}\wedge*\mathcal{F})=\mp\frac12\int_M\Tr(\mathcal{F}\wedge\mathcal{F}).`}</Eq>
      <Box kind="physics" title="Bogomol'nyi 不等式：为什么瞬子是极小">{R`对任意 $\mathcal{F}$，$0\le-\frac14\int\Tr\big((\mathcal{F}\mp*\mathcal{F})\wedge*(\mathcal{F}\mp*\mathcal{F})\big)=-\frac12\int\Tr(\mathcal{F}\wedge*\mathcal{F})\pm\frac12\int\Tr(\mathcal{F}\wedge\mathcal{F})$（用了 $**=1$ 与 $\mathcal{F}\wedge*\mathcal{F}$ 的对称性）。所以 $\mathcal{S}^{\rm E}_{\rm YM}\ge\mp\frac12\int\Tr\mathcal{F}^2=\pm4\pi^2n$（下面 \eqref{10.127}），等号当且仅当 $\mathcal{F}=\pm*\mathcal{F}$。在给定拓扑扇区 $n$ 中，作用量的最小值 $4\pi^2|n|$ 由（反）自对偶解达到。`}</Box>
      <Tx>{R`**拓扑性质。**要求作用量有限，必须有`}</Tx>
      <Eq n="10.113" say={R`有限作用的边界条件：在大球面上场强必须趋于零，规范势只能趋于纯规范。`}>{R`\mathcal{A}_\mu(x)\to g(x)^{-1}\partial_\mu g(x)\qquad\text{当 }|x|\to L`}</Eq>
      <Tx>{R`其中 $L$ 是任意正数（理解为足够大）。由于 $|x|=L$ 是球面 $S^3$，\eqref{10.113} 定义了映射 $g:S^3\to\mathrm{SU}(2)$，它按 $\pi_3(\mathrm{SU}(2))\cong\mathbb{Z}$ 分类。这如何反映在转移函数上？把 $\mathbb{R}^4$ 加上无穷远点紧化。设 $S^4$ 的南极代表无穷远点、北极代表原点。在此紧化下，把 $\mathbb{R}^4$ 分成两块，并认同为 $S^4$ 的南半球 $U_{\rm S}$ 与北半球 $U_{\rm N}$：`}</Tx>
      <Eq n="10.114a" say={R`北半球坐标卡：半径略大于 $L$ 的四维球。`}>{R`U_{\rm N}=\{x\in\mathbb{R}^4\mid|x|\le L+\varepsilon\}`}</Eq>
      <Eq n="10.114b" say={R`南半球坐标卡：半径略小于 $L$ 的球的外部，连同无穷远点。`}>{R`U_{\rm S}=\{x\in\mathbb{R}^4\mid|x|\ge L-\varepsilon\}`}</Eq>
      <Figure n="10.5" caption={R`$\mathbb{R}^4$ 到 $S^4$ 的一点紧化。`} width="80%" />
      <Tx>{R`见 \figref{10.5}。假设规范势在 $U_{\rm S}$ 上没有"扭曲"，选取`}</Tx>
      <Eq n="10.115" say={R`在南半球（无穷远附近）选一个规范使势恒为零。`}>{R`\mathcal{A}_{\rm S}(x)\equiv0\qquad x\in U_{\rm S}.`}</Eq>
      <Tx>{R`于是关于丛的所有拓扑信息都包含在 $\mathcal{A}_{\rm N}(x)$ 或"赤道" $S^3$（$=U_{\rm N}\cap U_{\rm S}$）上的转移函数 $t_{\rm NS}(x)$ 中。由于 $\mathcal{A}_{\rm S}=0$，对 $x\in U_{\rm N}\cap U_{\rm S}$，`}</Tx>
      <Eq n="10.116" say={R`南势为零时，北势在赤道上就是转移函数的纯规范：边界条件里的 $g$ 正是丛的转移函数。`}>{R`\mathcal{A}_{\rm N}=t_{\rm NS}^{-1}\mathcal{A}_{\rm S}t_{\rm NS}+t_{\rm NS}^{-1}\dd t_{\rm NS}=t_{\rm NS}^{-1}\dd t_{\rm NS}.`}</Eq>
      <Tx>{R`因此 \eqref{10.113} 中的 $g(x)$ 被认同为转移函数 $t_{\rm NS}(x)$，对映射 $g:S^3\to\mathrm{SU}(2)$ 分类就是按 $\pi_3(\mathrm{SU}(2))=\mathbb{Z}$ 对转移函数分类（见例 9.11）。

**计算映射度**（依 Coleman 1979）。先注意 $\mathrm{SU}(2)\simeq S^3$，因为

$$t^4I_2+\mathrm{i}t^i${SP}_i\in\mathrm{SU}(2)\ \leftrightarrow\ \boldsymbol t^2+(t^4)^2=1.$$

（$(t^4+\mathrm{i}\boldsymbol t\cdot\boldsymbol\sigma)^\dagger(t^4+\mathrm{i}\boldsymbol t\cdot\boldsymbol\sigma)=(t^4)^2+\boldsymbol t^2$，$\det=(t^4)^2+\boldsymbol t^2$。）于是映射 $g:S^3\to\mathrm{SU}(2)$ 按 $\pi_3(\mathrm{SU}(2))\cong\pi_3(S^3)\cong\mathbb{Z}$ 分类。容易看出：

(a) 常值映射`}</Tx>
      <Eq n="10.117a" say={R`常值映射：把整个球面映到单位元，不绕任何圈。`}>{R`g_0:x\in S^3\mapsto e\in\mathrm{SU}(2)`}</Eq>
      <Tx>{R`属于 $\pi_3(\mathrm{SU}(2))$ 的类 0（即不卷绕）。

(b) *恒等*映射（这实际上就是恒等映射 $S^3\to S^3$）`}</Tx>
      <Eq n="10.117b" keyEq title="单位映射度的映射" say={R`把 $S^3$ 上的点 $(x^4,\boldsymbol x)$ 直接当作 SU(2) 元素 $x^4+\mathrm{i}\boldsymbol x\cdot\boldsymbol\sigma$：恒等映射，卷绕一次。`}>{R`g_1:x\mapsto\frac1r[x^4I_2+\mathrm{i}x^i${SP}_i],\quad r^2=\boldsymbol x^2+(x^4)^2`}</Eq>
      <Tx>{R`定义 $\pi_3(\mathrm{SU}(2))$ 的类 1。对应于这个同伦类的规范势的显式形式见 §1.10。

(c) 映射`}</Tx>
      <Eq n="10.117c" say={R`把恒等映射自乘 $n$ 次：卷绕 $n$ 次。`}>{R`g_n\equiv(g_1)^n:x\mapsto r^{-n}[x^4I_2+\mathrm{i}x^i${SP}_i]^n`}</Eq>
      <Tx>{R`定义 $\pi_3(\mathrm{SU}(2))$ 的类 $n$。`}</Tx>
      <Box kind="warning" title={R`勘误：\eqref{10.117b}、\eqref{10.117c} 及 $\mathrm{SU}(2)\simeq S^3$ 中漏了 $\mathrm{i}$（p.426）`}>{R`原书印作 $t^4I_2+t^i\sigma_i$、$g_1:x\mapsto\frac1r[x^4I_2+x^i\sigma_i]$、$g_n:x\mapsto r^{-n}[x^4I_2+x^i\sigma_i]^n$。但 $x^4I_2+x^i\sigma_i$ 是 Hermite 矩阵，行列式 $(x^4)^2-\boldsymbol x^2$，一般不是酉矩阵，不属于 SU(2)。正确的是 $x^4I_2+\mathrm{i}x^i\sigma_i$；原书自己在 \eqref{10.123} 中写 $\frac1r(x^4+\mathrm{i}x^l\sigma_l)$，正是这个形式。正文与交互图 4 都已按改正后的形式计算。`}</Box>
      <Tx>{R`**积什么。**回忆：磁单极子的强度（荷）由场强 $\mathcal{F}=\dd\mathcal{A}$ 在 $S^2$ 上的积分给出。我们预期瞬子数也有类似的关系。瞬子定义在 $S^4$ 上，所以要找一个四形式在 $S^4$ 上积分。自然的四形式是 $\mathcal{F}\wedge\mathcal{F}$。下面在不引起混淆时省略外积符号（$\mathcal{F}^2$ 表示 $\mathcal{F}\wedge\mathcal{F}$）。注意 $\Tr\mathcal{F}^2$ 是闭的：`}</Tx>
      <Eq n="10.118" say={R`场强平方的迹是闭形式：Bianchi 恒等式让外微分变成对易子，而对易子在迹下消失。`}>{R`\dd\Tr\mathcal{F}^2=\Tr[\dd\mathcal{F}\,\mathcal{F}+\mathcal{F}\,\dd\mathcal{F}]=\Tr\{-[\mathcal{A},\mathcal{F}]\mathcal{F}-\mathcal{F}[\mathcal{A},\mathcal{F}]\}=0`}</Eq>
      <Tx>{R`其中用了 Bianchi 恒等式 $\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0$。（展开：$-\Tr(\mathcal{A}\mathcal{F}\mathcal{F}-\mathcal{F}\mathcal{A}\mathcal{F}+\mathcal{F}\mathcal{A}\mathcal{F}-\mathcal{F}\mathcal{F}\mathcal{A})=-\Tr(\mathcal{A}\mathcal{F}^2)+\Tr(\mathcal{F}^2\mathcal{A})=0$，最后一步是分次循环性：$\mathcal{A}$ 是一形式、$\mathcal{F}^2$ 是四形式，$(-1)^{1\cdot4}=1$。）[**注**：在目前情形，\eqref{10.118} 似乎平凡，因为 $S^4$ 上任何四形式都是闭的。但 \eqref{10.118} 在更高维流形上依然成立。] 由 Poincaré 引理，闭形式 $\Tr\mathcal{F}^2$ *局部地*恰当：`}</Tx>
      <Eq n="10.119" say={R`$\Tr\mathcal{F}^2$ 局部是一个三形式的外微分；这个三形式一般不能整体定义——否则积分为零。`}>{R`\Tr\mathcal{F}^2=\dd K`}</Eq>
      <Tx>{R`其中 $K$ 是局部的三形式。因此 $\Tr\mathcal{F}^2$ 是 de Rham 上同调群 $H^4(S^4)$ 的元素。之后 $\Tr\mathcal{F}^2$ 将被认同为第二陈特征（Chern character），$K$ 是它的 Chern–Simons 形式，见第 11 章。`}</Tx>
      <Stmt id="L10.3">
        <Eq n="10.120" keyEq title="Chern–Simons 形式" say={R`Chern–Simons 三形式：它的外微分恰好是 $\Tr\mathcal{F}^2$。`}>{R`K=\Tr[\mathcal{A}\,\dd\mathcal{A}+\tfrac23\mathcal{A}^3].`}</Eq>
        <Proof steps={[
          { claim: R`直接计算（$\dd(\mathcal{A}\dd\mathcal{A})=(\dd\mathcal{A})^2$；$\dd\mathcal{A}^3=\dd\mathcal{A}\,\mathcal{A}^2-\mathcal{A}\,\dd\mathcal{A}\,\mathcal{A}+\mathcal{A}^2\dd\mathcal{A}$）：`, tex: R`\begin{aligned}\dd K&=\Tr[(\dd\mathcal{A})^2+\tfrac23(\dd\mathcal{A}\,\mathcal{A}^2-\mathcal{A}\,\dd\mathcal{A}\,\mathcal{A}+\mathcal{A}^2\dd\mathcal{A})]\\&=\Tr[(\mathcal{F}-\mathcal{A}^2)(\mathcal{F}-\mathcal{A}^2)+\tfrac23\{(\mathcal{F}-\mathcal{A}^2)\mathcal{A}^2-\mathcal{A}(\mathcal{F}-\mathcal{A}^2)\mathcal{A}+\mathcal{A}^2(\mathcal{F}-\mathcal{A}^2)\}]\\&=\Tr[\mathcal{F}^2-\mathcal{A}^2\mathcal{F}-\mathcal{F}\mathcal{A}^2+\mathcal{A}^4+\tfrac23(\mathcal{F}\mathcal{A}^2-\mathcal{A}\mathcal{F}\mathcal{A}+\mathcal{A}^2\mathcal{F}-\mathcal{A}^4)]\end{aligned}`, why: R`用了恒等式 $\dd\mathcal{A}=\mathcal{F}-\mathcal{A}^2$。` },
          { claim: R`**迹恒等式。**对矩阵值的 $p$ 形式 $\alpha$ 与 $q$ 形式 $\beta$，$\Tr(\alpha\beta)=(-1)^{pq}\Tr(\beta\alpha)$（迹的循环性 + 形式的分次交换）。由此`, tex: R`\Tr\mathcal{A}^4=0\qquad\Tr\mathcal{A}\mathcal{F}\mathcal{A}=-\Tr\mathcal{A}^2\mathcal{F}=-\Tr\mathcal{F}\mathcal{A}^2.`, why: R`$\Tr(\mathcal{A}\cdot\mathcal{A}^3)=(-1)^{1\cdot3}\Tr(\mathcal{A}^3\cdot\mathcal{A})$ ⇒ $\Tr\mathcal{A}^4=-\Tr\mathcal{A}^4$；$\Tr((\mathcal{A}\mathcal{F})\mathcal{A})=(-1)^{3\cdot1}\Tr(\mathcal{A}\,\mathcal{A}\mathcal{F})$；$\Tr(\mathcal{F}\mathcal{A}^2)=(-1)^{2\cdot2}\Tr(\mathcal{A}^2\mathcal{F})$。`, fill: true },
          { claim: R`例如（原书的分量验证）：`, tex: R`\Tr\mathcal{A}\mathcal{F}\mathcal{A}=\tfrac12\Tr\mathcal{A}_\kappa\mathcal{F}_{\lambda\mu}\mathcal{A}_\nu\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=-\tfrac12\Tr\mathcal{A}_\nu\mathcal{A}_\kappa\mathcal{F}_{\lambda\mu}\dd x^\nu\wedge\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu=-\Tr\mathcal{A}^2\mathcal{F}`, why: R`迹的循环性把 $\mathcal{A}_\nu$ 移到最前，$\dd x^\nu$ 移过三个 $\dd x$ 得到 $(-1)^3$。` },
          { claim: R`代回，$\dd K$ 成为`, tex: R`\dd K=\Tr[\mathcal{F}^2-\mathcal{A}^2\mathcal{F}-\mathcal{F}\mathcal{A}^2+\tfrac23\{\mathcal{F}\mathcal{A}^2+\tfrac12(\mathcal{F}\mathcal{A}^2+\mathcal{A}^2\mathcal{F})+\mathcal{A}^2\mathcal{F}\}]=\Tr\mathcal{F}^2`, why: R`花括号内三项之迹都等于 $\Tr\mathcal{A}^2\mathcal{F}$，合计 $3\Tr\mathcal{A}^2\mathcal{F}$，乘 $\frac23$ 恰好抵消前面的 $-2\Tr\mathcal{A}^2\mathcal{F}$。` },
        ]} />
      </Stmt>
      <Stmt id="L10.4">
        <Eq n="10.121" keyEq title="瞬子数化为边界积分" say={R`四维球面上场强平方的积分，只取决于赤道三维球面上纯规范 $g^{-1}\dd g$ 的立方——一个只依赖于 $g$ 的同伦类的量。`}>{R`\int_{S^4}\Tr\mathcal{F}^2=-\frac13\int_{S^3}\Tr\mathcal{A}^3.`}</Eq>
        <Proof steps={[
          { claim: R`由 Stokes 定理，`, tex: R`\int_{U_{\rm N}}\Tr\mathcal{F}^2=\int_{U_{\rm N}}\dd K=\int_{S^3}K`, why: R`$U_{\rm N}$ 由 \eqref{10.114a} 定义，$S^3=\partial U_{\rm N}$；在 $U_{\rm N}$ 上 $\mathcal{A}_{\rm N}$ 光滑，$K$ 在其上良定义。`, uses: ["T6.1", "L10.3"] },
          { claim: R`在 $S^3$ 上 $\mathcal{F}=0$（纯规范，习题 10.7），所以`, tex: R`K=\Tr[\mathcal{A}\dd\mathcal{A}+\tfrac23\mathcal{A}^3]=\Tr[\mathcal{A}(\mathcal{F}-\mathcal{A}^2)+\tfrac23\mathcal{A}^3]=-\tfrac13\Tr\mathcal{A}^3` },
          { claim: R`于是`, tex: R`\int_{U_{\rm N}}\Tr\mathcal{F}^2=\int_{S^4}\Tr\mathcal{F}^2=-\frac13\int_{S^3}\Tr\mathcal{A}^3`, why: R`这里加上了 $\int_{U_{\rm S}}\Tr\mathcal{F}^2=0$，因为 $\mathcal{A}_{\rm S}\equiv0$（重叠带的宽度 $\varepsilon\to0$）。` },
        ]} />
      </Stmt>
      <Tx>{R`**规范不变性。**注意 $\Tr\mathcal{F}^2$ 在规范变换下不变：

$$\Tr\mathcal{F}^2\to\Tr[g^{-1}\mathcal{F}^2g]=\Tr\mathcal{F}^2.$$

因此有理由认为 $\Tr\mathcal{F}^2$ 确实包含一定的、与具体联络无关的丛的拓扑信息。考察前面给出的规范场 (10.117a–c)：

**(a)** 对 $g_0(x)\equiv e$，$S^3$ 上 $\mathcal{A}=0$。由于丛平凡，可以在整个 $S^4$ 上取 $\mathcal{A}=0$，于是 $\mathcal{F}=0$，`}</Tx>
      <Eq n="10.122" say={R`平凡丛：拓扑积分为零。`}>{R`\int_{S^4}\Tr\mathcal{F}^2=-\frac13\int_{S^3}\Tr\mathcal{A}^3=0.`}</Eq>
      <Tx>{R`注意这对于由 $\mathcal{A}=0$ 经光滑规范变换得到的任何规范势都成立，即对形如 $\mathcal{A}(x)=g(x)^{-1}\dd g(x)$（$x\in S^4$，$g$ 在整个 $S^4$ 上光滑）的规范势成立。

**(b)** 再考虑在 $S^3$ 上取值由 \eqref{10.117b} 给出的规范势：`}</Tx>
      <Eq n="10.123" say={R`单位映射度的纯规范：$g_1^{-1}\dd g_1$，其中 $g_1^{-1}=g_1^\dagger$ 把 $\mathrm{i}$ 变号。`}>{R`\mathcal{A}=\frac1r(x^4-\mathrm{i}x^k${SP}_k)\,\dd\Big(\frac1r(x^4+\mathrm{i}x^l${SP}_l)\Big).`}</Eq>
      <Tx>{R`一个相当大的简化来自这样的观察：被积函数 $\Tr\mathcal{A}^3$ 不应依赖于在 $S^3$ 上的哪一点计算，因为 $g_1$ 以均匀的方式把 $S^3$ 映到 $\mathrm{SU}(2)\cong S^3$ 上。（精确地说：$g_1$ 与 $\mathrm{SU}(2)\times\mathrm{SU}(2)$ 在 $S^3$ 上的等距作用（左右乘）可交换，而 $\Tr(g^{-1}\dd g)^3$ 在左右乘下不变，所以它是 $S^3$ 上的不变三形式，只能是体元的常数倍。）于是可以在单位球面的北极（$x^4=1$，$\boldsymbol x=\boldsymbol0$）计算。此时 $\mathcal{A}=\mathrm{i}${SP}_k\dd x^k$，`}</Tx>
      <Eq n="10.124" say={R`在北极计算 $\Tr\mathcal{A}^3$：Pauli 矩阵三重积的迹给出全反对称符号，结果是 12 倍的体元。`}>{R`\Tr\mathcal{A}^3=\mathrm{i}^3\Tr[${SP}_i${SP}_j${SP}_k]\dd x^i\wedge\dd x^j\wedge\dd x^k=2\varepsilon_{ijk}\dd x^i\wedge\dd x^j\wedge\dd x^k=12\,\dd x^1\wedge\dd x^2\wedge\dd x^3.`}</Eq>
      <Tx>{R`（$\Tr(\sigma_i\sigma_j\sigma_k)=2\mathrm{i}\varepsilon_{ijk}$，$\mathrm{i}^3\cdot2\mathrm{i}=2$；$\varepsilon_{ijk}\dd x^i\wedge\dd x^j\wedge\dd x^k=3!\,\dd x^1\wedge\dd x^2\wedge\dd x^3$。）其次注意 $(x^1,x^2,x^3)$ 在 $S^3$ 的*每个*半球上都是好的坐标系，$${VOL}\equiv\dd x^1\wedge\dd x^2\wedge\dd x^3$ 是北极处的体元。得到

$$\int_{S^3}\Tr\mathcal{A}^3=12\int_{S^3}${VOL}=12(2\pi^2)=24\pi^2$$

其中 $2\pi^2$ 是单位球面 $S^3$ 的面积（三维体积）。最后得到`}</Tx>
      <Eq n="10.125" say={R`恒等映射对应的瞬子数为 1。`}>{R`-\frac1{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2=\frac1{24\pi^2}\int_{S^3}\Tr\mathcal{A}^3=1.`}</Eq>
      <Tx>{R`**(c)** 再考虑由 \eqref{10.117c} 给出的映射 $g_n:S^3\to\mathrm{SU}(2)$。我们证明 $g_2=g_1g_1$ 的卷绕数为 2。把 $S^3$ 分成北半球 $U^{(3)}_{\rm N}$ 与南半球 $U^{(3)}_{\rm S}$。给定映射 $g_1:S^3\to\mathrm{SU}(2)$，总可以把 $g_1$ 光滑地变形为卷绕数为 1、且对 $x\in U^{(3)}_{\rm S}$ 有 $g_{1\rm N}(x)=e$ 的 $g_{1\rm N}$：全部变化发生在 $U^{(3)}_{\rm N}$ 上。类似地，$g_1$ 可以变形为卷绕数相同、对 $x\in U^{(3)}_{\rm N}$ 有 $g_{1\rm S}(x)=e$ 的 $g_{1\rm S}$。在这一变形下，$g_2$ 变为

$$g_2(x)\to g_2'(x)=\begin{cases}g_{1\rm N}(x)&x\in U^{(3)}_{\rm N}\\g_{1\rm S}(x)&x\in U^{(3)}_{\rm S}.\end{cases}$$

（因为 $g_{1\rm N}g_{1\rm S}$ 在每个半球上都只有一个因子不是 $e$。）对 $\mathcal{A}(x)=g_2'(x)^{-1}\dd g_2'(x)$（$x\in S^3$），`}</Tx>
      <Eq n="10.126" say={R`两个各自只在一个半球上变化的映射之积：积分拆成两个半球之和，每个贡献 1，总卷绕数为 2。`}>{R`\frac1{24\pi^2}\int_{S^3}\Tr\mathcal{A}^3=\frac1{24\pi^2}\Big(\int_{U^{(3)}_{\rm N}}\Tr(g_{1\rm N}^{-1}\dd g_{1\rm N})^3+\int_{U^{(3)}_{\rm S}}\Tr(g_{1\rm S}^{-1}\dd g_{1\rm S})^3\Big)=1+1=2.`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{10.126} 左端的系数（p.429）`}>{R`原书印作 $\frac1{24\pi^3}\int_{S^3}\Tr\mathcal{A}^3$。由 \eqref{10.125}，归一化系数应为 $\frac1{24\pi^2}$（右端第二项原书也写的是 $\frac1{24\pi^2}$）。正文已改正。另外，"变形不改变积分值"这一步需要积分的同伦不变性，见下面定理 10.7 的补全说明。`}</Box>
      <Tx>{R`重复同样的步骤，对 $\mathcal{A}(x)=g_n^{-1}\dd g_n$ 得`}</Tx>
      <Eq n="10.127" say={R`卷绕 $n$ 次的映射对应瞬子数 $n$。`}>{R`-\frac1{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2=\frac1{24\pi^2}\int_{S^3}\Tr\mathcal{A}^3=n.`}</Eq>
      <Tx>{R`汇总这些结果，得到下面的定理。`}</Tx>
      <Stmt id="T10.7">
        <Eq n="10.128" keyEq title="瞬子数 = 映射度" say={R`映射 $S^3\to\mathrm{SU}(2)$ 的度可以用纯规范的三次形式积出来，也等于场强平方在 $S^4$ 上的积分：拓扑整数由曲率给出。`}>{R`n=\frac1{24\pi^2}\int_{S^3}\Tr(g^{-1}\dd g)^3=\frac12\int_{S^4}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^2.`}</Eq>
        <Derivation title="补全：为什么积分只依赖同伦类、且对乘积可加" collapsed steps={[
          { tex: R`\theta\equiv g^{-1}\dd g,\qquad g\to g e^{\epsilon X}\ \Rightarrow\ \delta\theta=\dd X+[\theta,X]`, why: R`对 $g$ 做无穷小变形（$X$ 是 $S^3$ 上的 $\sym{lie}{\mathfrak{su}}(2)$ 值函数）。` },
          { tex: R`\delta\Tr\theta^3=3\Tr(\delta\theta\,\theta^2)=3\Tr\big((\dd X+[\theta,X])\theta^2\big)=3\,\dd\Tr(X\theta^2)`, why: R`用 Maurer–Cartan 方程 $\dd\theta=-\theta^2$：$\dd\Tr(X\theta^2)=\Tr(\dd X\theta^2)+\Tr(X\dd(\theta^2))$，而 $\dd(\theta^2)=\dd\theta\,\theta-\theta\,\dd\theta=0$；对易子项 $\Tr([\theta,X]\theta^2)=0$（分次循环性）。` },
          { tex: R`\delta\int_{S^3}\Tr\theta^3=3\int_{S^3}\dd\Tr(X\theta^2)=0`, why: R`$S^3$ 无边界（Stokes 定理）。所以积分在连续变形下不变，只依赖于 $g$ 的同伦类。` },
          { tex: R`\Tr\big((gh)^{-1}\dd(gh)\big)^3=\Tr(g^{-1}\dd g)^3+\Tr(h^{-1}\dd h)^3+\dd(\cdots)`, why: R`逐点乘积 $gh$ 的 Polyakov–Wiegmann 型恒等式：$(gh)^{-1}\dd(gh)=h^{-1}(g^{-1}\dd g)h+h^{-1}\dd h\equiv A+B$，$\Tr(A+B)^3=\Tr A^3+\Tr B^3+3\Tr(A^2B+AB^2)$，而 $\Tr A^3=\Tr(g^{-1}\dd g)^3$，交叉项可以合并成一个全微分（用 Maurer–Cartan 方程直接验证）。故积分对乘积可加：$\deg(gh)=\deg g+\deg h$。` },
        ]} result={R`由 $\deg g_1=1$ 与可加性，$\deg g_n=n$；由 $\pi_3(\mathrm{SU}(2))\cong\mathbb{Z}$ 由 $[g_1]$ 生成、积分同伦不变，\eqref{10.128} 对任意 $g$ 成立。第二个等号来自 \eqref{10.127}：$\frac12\Tr(\frac{\mathrm{i}\mathcal{F}}{2\pi})^2=-\frac1{8\pi^2}\Tr\mathcal{F}^2$。`} />
      </Stmt>
      <InstantonLab />
    </Sub>);
}
