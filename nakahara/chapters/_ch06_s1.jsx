// 引言 + §6.1 Stokes 定理 —— 式 (6.1)–(6.10)，定理 6.1，习题 6.1，图 6.1，交互图 1
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Exercise, Derivation, Erratum, C } from "@kit";
import { StokesLab } from "./_ch06_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="6.0" title="Introduction" zh="引言：从链到形式"
      gist={R`流形上可以用微分形式造出同调群的**对偶**——de Rham 上同调群。它与同调群携带同样的 Betti 数信息，却多出物理学家熟悉的语言（外微分、积分）和更丰富的代数结构。`}
      why={R`第 3 章的同调要先三角剖分，再做整数线性代数；物理里的场却是微分形式。若能直接用形式"数洞"，拓扑就进入了场论的日常计算。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="derham" /> · <C id="closed_exact" /></p>
      <Tx>{R`第 3 章给拓扑空间定义了同调群：用链与边界算子 $\partial$，把"没有边界的东西"模去"是边界的东西"。若拓扑空间 $M$ 碰巧是一个**流形**，它上面就有微分形式（第 5 章），而外微分 $\dd$ 同样满足 $\dd^2=0$。于是可以照猫画虎：把"闭形式"（$\dd\omega=0$）模去"恰当形式"（$\omega=\dd\psi$）。得到的群叫 **de Rham 上同调群**（de Rham cohomology groups）。名字里的"上"（co-）表示它是同调群的**对偶**——这一点要到 \secref{6.2.2} 由 de Rham 定理说清楚。

为什么要多造一套？除了物理学家本来就熟悉微分形式之外，上同调相比同调还有几项优势：它天然是向量空间，带有由外积给出的**乘法**（上同调环，\secref{6.4.2}），映射通过**拉回**自然地作用在上面（\secref{6.4.4}），而且大量物理量——磁通、Aharonov–Bohm 相位、瞬子数、陈数——本身就是闭形式的积分。

本章的组织：**§6.1** 准备积分工具并证明 Stokes 定理；**§6.2** 定义 de Rham 上同调群，用 Stokes 定理把它与同调群配对，引出 de Rham 定理；**§6.3** 证明 Poincaré 引理（局部闭 ⇒ 恰当）；**§6.4** 介绍上同调特有的结构：Poincaré 对偶、上同调环、Künneth 公式、拉回与同伦不变性。原书的讲法主要依据 Nash and Sen (1983) 与 Flanders (1963)，更深入的内容见 Bott and Tu (1982)。`}</Tx>
    </Sec>);
}

export function Sec61() {
  return (
    <Sec n="6.1" title="Stokes' theorem" zh="Stokes 定理"
      gist={R`在标准单形上积分就是普通重积分；把它光滑映入 $M$ 得到奇异单形与链，$\int_{s_r}\omega=\int_{\bar\sigma_r}f^*\omega$。**Stokes 定理** $\int_c\dd\omega=\int_{\partial c}\omega$：拉回到标准单形后，就是对一个坐标用微积分基本定理。`}
      why={R`de Rham 理论的一切——上同调与同调的配对、"体积形式不恰当"、周期——都依赖 Stokes 定理。它也把电磁学里的 Gauss 定理与 Stokes 定理统一成一个公式。`}
      gives={["6.2", "6.6", "6.7", "6.8", "6.9b", "6.10"]}>
      <p className="muted">本节概念：<C id="singular_chain" /> · <C id="stokes" /></p>
      <Tx>{R`研究 de Rham 上同调的头号工具是 **Stokes 定理**。物理学家从电磁学里就熟悉它的两个特例——Gauss 散度定理与（经典的）Stokes 定理；这里把它们统一处理。`}</Tx>

      <Sub n="6.1.1" title="Preliminary consideration" zh="预备：在单形与链上积分">
        <Tx>{R`**我们要做的事**：给"在 $M$ 中的一个 $r$ 维区域上积一个 $r$ 形式"下一个可操作的定义。思路分两步：先在欧氏空间里一个最简单的区域——标准单形——上积分；再把标准单形光滑地映进 $M$，用拉回把积分搬回欧氏空间。

**标准单形。**在 $\mathbb{R}^r$ 中取 $r+1$ 个点`}</Tx>
        <Tx>{R`$$p_0=(0,0,\ldots,0),\quad p_1=(1,0,\ldots,0),\quad\ldots,\quad p_r=(0,0,\ldots,1),$$

它们张成的定向单形 $\bar\sigma_r=(p_0p_1\ldots p_r)$ 称为**标准 $r$ 单形**（standard $r$-simplex），见 \figref{6.1}。若 $\{x^\mu\}$ 是 $\mathbb{R}^r$ 的坐标，则`}</Tx>
        <Eq n="6.1" say={R`标准 $r$ 单形就是第一卦限里被超平面 $\sum x^\mu=1$ 切下的那一角：所有坐标非负、坐标和不超过 1。`}>{R`\bar\sigma_r=\left\{(x^1,\ldots,x^r)\in\mathbb{R}^r\ \middle|\ x^\mu\ge0,\ \sum_{\mu=1}^rx^\mu\le1\right\}.`}</Eq>
        <Figure n="6.1" caption={R`标准 2 单形 $\bar\sigma_2=(p_0p_1p_2)$ 与标准 3 单形 $\bar\sigma_3=(p_0p_1p_2p_3)$。`} width="72%" />
        <Erratum kind="erratum" loc="p.246 §6.1.1" title={R`"standard $n$-simplex" 应为 "standard $r$-simplex"`}>{R`原书在定义 $\bar\sigma_r$ 时把它称为 "standard $n$-simplex"，而符号与 \eqref{6.1} 都是 $r$ 维的。正文已统一为"标准 $r$ 单形"。`}</Erratum>
        <Tx>{R`$\mathbb{R}^r$ 中的 $r$ 形式只有一个分量（它就是"体积元"的倍数）：

$$\omega=a(x)\,\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^r.$$

定义 $\omega$ 在 $\bar\sigma_r$ 上的积分为`}</Tx>
        <Eq n="6.2" say={R`在标准单形上积一个 $r$ 形式，就是把楔积换成普通的体积元，做一个 $r$ 重积分；定向由坐标顺序 $x^1,\ldots,x^r$ 给定。`}>{R`\int_{\bar\sigma_r}\omega\equiv\int_{\bar\sigma_r}a(x)\,\dd x^1\dd x^2\ldots\dd x^r`}</Eq>
        <Tx>{R`右边是通常的 $r$ 重积分。例如 $r=2$、$\omega=\dd x\wedge\dd y$：

$$\int_{\bar\sigma_2}\omega=\int_{\bar\sigma_2}\dd x\,\dd y=\int_0^1\dd x\int_0^{1-x}\dd y=\tfrac12 .$$

注意定义里隐含了**定向**：若把 $\omega$ 写成 $a\,\dd x^2\wedge\dd x^1\wedge\cdots$，要先用反对称性换回 $\dd x^1\wedge\dd x^2\wedge\cdots$ 的顺序（多一个负号）再积分——这和第 3 章"顶点的奇置换使单形变号"\eqref{3.14} 是同一件事。`}</Tx>
        <Tx>{R`**奇异单形与链。**现在回到 $m$ 维流形 $M$。设 $\sigma_r$ 是 $\mathbb{R}^r$ 中的 $r$ 单形，$f:\sigma_r\to M$ 是光滑映射。（为了避免 $f$ 在 $\sigma_r$ 边界上可微性的细节，可以假定 $f$ 定义在包含 $\sigma_r$ 的某个开集 $U\subset\mathbb{R}^r$ 上。）这里**不要求** $f$ 可逆——例如 $\operatorname{im}f$ 可以只是 $M$ 中的一个点。$\sigma_r$ 在 $M$ 中的像记作 $s_r$，称为 $M$ 中的（**奇异**）**$r$ 单形**（singular $r$-simplex）。之所以叫"奇异"，是因为它们并不给出 $M$ 的三角剖分，而且在流形上"点的几何独立性"（§3.2）根本无从谈起。

设 $\{s_{r,i}\}$ 是 $M$ 中 $r$ 单形的集合。$M$ 中的 **$r$ 链**（$r$-chain）定义为 $\{s_{r,i}\}$ 的**实系数**形式和：`}</Tx>
        <Eq n="6.3" say={R`流形上的 $r$ 链就是奇异 $r$ 单形的实系数形式组合，系数可以理解为"这块区域被计了几次（可以是分数）"。`}>{R`c=\sum_ia_is_{r,i}\qquad a_i\in\mathbb{R}.`}</Eq>
        <Tx>{R`以下只考虑 $\mathbb{R}$ 系数，并省略"$\mathbb{R}$"。$M$ 中 $r$ 链的全体构成**链群** $C_r(M)$。在 $f:\sigma_r\to M$ 下，边界 $\partial\sigma_r$ 也被映成 $M$ 的子集；$\partial s_r\equiv f(\partial\sigma_r)$ 是 $M$ 中的一组 $(r-1)$ 单形，称为 $s_r$ 的**边界**，带有第 3 章 §3.3 定义的诱导定向。于是有映射`}</Tx>
        <Eq n="6.4" say="边界算子把 r 链送到 r−1 链：流形上的“取边界”和单纯复形上一样，是一个线性映射。">{R`\partial:C_r(M)\to C_{r-1}(M).`}</Eq>
        <Tx>{R`§3.3 的结果告诉我们 $\partial$ 是幂零的：$\partial^2=0$（引理 \sref{L3.3} 的证明只用到交错符号，与系数是 $\mathbb{Z}$ 还是 $\mathbb{R}$ 无关）。

**闭链、边缘与奇异同调。**闭链与边缘的定义与 §3.3 完全相同（只是把 $\mathbb{Z}$ 换成 $\mathbb{R}$）：若 $\partial c_r=0$，$c_r$ 是 **$r$ 闭链**（$r$-cycle）；若存在 $(r+1)$ 链 $c_{r+1}$ 使 $c_r=\partial c_{r+1}$，$c_r$ 是 **$r$ 边缘**（$r$-boundary）。$r$ 边缘的全体是**边缘群** $B_r(M)$，$r$ 闭链的全体是**闭链群** $Z_r(M)$。组成 $C_r(M)$、$B_r(M)$、$Z_r(M)$ 的奇异单形有无穷多个。由 $\partial^2=0$ 得 $Z_r(M)\supset B_r(M)$（参见 \sref{T3.3}）。**奇异同调群**（singular homology group）定义为`}</Tx>
        <Eq n="6.5" say="流形的（实系数）奇异同调群：闭链模去边缘，与第 3 章完全同一个构造，只是单形换成了光滑映入的奇异单形。">{R`H_r(M)\equiv Z_r(M)/B_r(M).`}</Eq>
        <Tx>{R`在温和的拓扑假设下，奇异同调群与（$\mathbb{R}$ 系数的）单纯同调群同构，我们用同一个符号表示二者。`}</Tx>
        <Box kind="note" title="为什么这里改用实系数？">{R`第 3 章用 $\mathbb{Z}$ 系数，看得见挠（如 $H_1(\mathbb{R}P^2;\mathbb{Z})=\mathbb{Z}_2$）。本章要与微分形式配对，形式的积分是实数，所以链也取实系数。代价是挠消失：$H_r(M;\mathbb{R})\cong\mathbb{R}^{b_r}$（第 3 章 \eqref{3.55}）。de Rham 上同调能告诉我们的，正是 Betti 数及其上的代数结构。`}</Box>
        <Tx>{R`**在链上积分。**先定义 $r$ 形式 $\omega$ 在 $M$ 的 $r$ 单形 $s_r$ 上的积分：`}</Tx>
        <Eq n="6.6" keyEq title="奇异单形上的积分" say={R`在流形里的一块弯曲单形上积分，就是把形式拉回到标准单形上，做普通的重积分。`}>{R`\int_{s_r}\omega=\int_{\bar\sigma_r}f^*\omega`}</Eq>
        <Tx>{R`其中 $f:\bar\sigma_r\to M$ 是满足 $s_r=f(\bar\sigma_r)$ 的光滑映射。$f^*\omega$ 是 $\mathbb{R}^r$ 中的 $r$ 形式，所以右边是通常的 $r$ 重积分 \eqref{6.2}。对一般的 $r$ 链 $c=\sum_ia_is_{r,i}\in C_r(M)$，线性地定义`}</Tx>
        <Eq n="6.7" say="在链上积分就按系数加权，把各个单形上的积分加起来。">{R`\int_c\omega=\sum_ia_i\int_{s_{r,i}}\omega.`}</Eq>
        <Box kind="physics" title="一个熟悉的例子：线积分">{R`$r=1$ 时 $\bar\sigma_1=[0,1]$，奇异 1 单形就是一条参数化曲线 $f:[0,1]\to M$。若 $\omega=\omega_\mu\dd x^\mu$，则 $f^*\omega=\omega_\mu(f(t))\frac{\dd f^\mu}{\dd t}\dd t$，\eqref{6.6} 就是

$$\int_{s_1}\omega=\int_0^1\omega_\mu(f(t))\,\frac{\dd f^\mu}{\dd t}\,\dd t,$$

即力学里"功"的线积分。重新参数化（保持方向）不改变积分值，因为拉回与链式法则相容——这正是用形式而不是函数做被积对象的好处。`}</Box>
      </Sub>

      <Sub n="6.1.2" title="Stokes' theorem" zh="Stokes 定理">
        <Stmt id="T6.1">
          <Eq n="6.8" keyEq title="Stokes 定理" say={R`形式的外微分在一块区域上的积分，等于形式本身在区域边界上的积分：微积分基本定理的任意维推广。`}>{R`\int_c\dd\omega=\int_{\partial c}\omega.`}</Eq>
          <Tx>{R`**证明思路**：两边对 $c$ 都是线性的，所以只需对单个奇异单形证明；再用拉回把问题搬到标准单形上；最后在标准单形上直接计算——只对最后一个坐标 $x^r$ 用微积分基本定理，并数清边界上哪些面有贡献。`}</Tx>
          <Proof steps={[
            { claim: R`**化归到单形。**$c$ 是 $r$ 单形的线性组合，\eqref{6.7} 两边都线性，故只需对一个 $r$ 单形 $s_r$ 证明 \eqref{6.8}。设 $f:\bar\sigma_r\to M$ 满足 $f(\bar\sigma_r)=s_r$。由 \eqref{6.6} 与"外微分与拉回交换"\eqref{5.75}：`, tex: R`\int_{s_r}\dd\omega=\int_{\bar\sigma_r}f^*(\dd\omega)=\int_{\bar\sigma_r}\dd(f^*\omega)`, uses: ["5.75"] },
            { claim: R`同理（$\partial s_r=f(\partial\bar\sigma_r)$，对 $\partial\bar\sigma_r$ 的每个面用 \eqref{6.6}）：`, tex: R`\int_{\partial s_r}\omega=\int_{\partial\bar\sigma_r}f^*\omega` },
            { claim: R`$f^*\omega$ 是 $\mathbb{R}^r$ 中的 $(r-1)$ 形式。所以要证 \eqref{6.9a}，只需对 $\mathbb{R}^r$ 中任意 $(r-1)$ 形式 $\psi$ 证明 \eqref{6.9b}。` },
          ]} />
          <Eq n="6.9a" say={R`对一个奇异 $r$ 单形的 Stokes 定理。`}>{R`\int_{s_r}\dd\omega=\int_{\partial s_r}\omega`}</Eq>
          <Eq n="6.9b" say={R`只需在标准单形这一块最简单的区域上证明 Stokes 定理，弯曲的一般情形由拉回自动得到。`}>{R`\int_{\bar\sigma_r}\dd\psi=\int_{\partial\bar\sigma_r}\psi`}</Eq>
          <Proof title={R`\eqref{6.9b} 的证明`} steps={[
            { claim: R`**化归到一项。**$\mathbb{R}^r$ 中 $(r-1)$ 形式的最一般形式是`, tex: R`\psi=\sum a_\mu(x)\,\dd x^1\wedge\ldots\wedge\dd x^{\mu-1}\wedge\dd x^{\mu+1}\wedge\ldots\wedge\dd x^r` },
            { claim: R`积分是可加的，所以只需对 $\psi=a(x)\,\dd x^1\wedge\ldots\wedge\dd x^{r-1}$（缺 $\dd x^r$ 的那一项）证明。其余各项（缺 $\dd x^\mu$）可由坐标的置换化归为这一项：交换坐标 $x^\mu\leftrightarrow x^r$ 把 $\bar\sigma_r$ 映为自身、只交换顶点 $p_\mu\leftrightarrow p_r$，两边同时乘上同一个符号 $-1$。`, fill: true, why: R`坐标的线性置换是 $\bar\sigma_r$ 到自身的微分同胚，\eqref{6.9b} 两边在它下面的变化一致（都由 \eqref{5.75} 与顶点置换的符号 \eqref{3.14} 决定）。` },
            { claim: R`计算外微分。$\dd\psi$ 中只有 $\partial a/\partial x^r$ 那一项不被楔积杀死，把 $\dd x^r$ 移过 $r-1$ 个一形式到最后：`, tex: R`\dd\psi=\frac{\partial a}{\partial x^r}\dd x^r\wedge\dd x^1\wedge\ldots\wedge\dd x^{r-1}=(-1)^{r-1}\frac{\partial a}{\partial x^r}\dd x^1\wedge\ldots\wedge\dd x^{r-1}\wedge\dd x^r` },
            { claim: R`**左边：先对 $x^r$ 积分。**由 \eqref{6.2}，固定 $x^1,\ldots,x^{r-1}$ 时 $x^r$ 从 $0$ 跑到 $1-\sum_{\mu=1}^{r-1}x^\mu$，用微积分基本定理：`, tex: R`\begin{aligned}\int_{\bar\sigma_r}\dd\psi&=(-1)^{r-1}\int_{\bar\sigma_r}\frac{\partial a}{\partial x^r}\dd x^1\ldots\dd x^{r-1}\dd x^r\\&=(-1)^{r-1}\int_{x^\mu\ge0,\sum_{\mu=1}^{r-1}x^\mu\le1}\dd x^1\ldots\dd x^{r-1}\int_0^{1-\sum_{\mu=1}^{r-1}x^\mu}\frac{\partial a}{\partial x^r}\dd x^r\\&=(-1)^{r-1}\int\dd x^1\ldots\dd x^{r-1}\left[a\Big(x^1,\ldots,x^{r-1},1-\sum_{\mu=1}^{r-1}x^\mu\Big)-a\big(x^1,\ldots,x^{r-1},0\big)\right]\end{aligned}` },
            { claim: R`**右边：边界的各个面。**由第 3 章的边界公式 \eqref{3.20}：`, tex: R`\partial\bar\sigma_r=(p_1,p_2,\ldots,p_r)-(p_0,p_2,\ldots,p_r)+\cdots+(-1)^r(p_0,p_1,\ldots,p_{r-1})`, uses: ["3.20"] },
            { claim: R`$\psi=a\,\dd x^1\wedge\ldots\wedge\dd x^{r-1}$ 在 $x^1,\ldots,x^{r-1}$ 中任何一个为常数的面上都为零（该面上对应的 $\dd x^\mu$ 拉回为零）。例如面 $(p_0,p_2,\ldots,p_r)$ 上 $x^1\equiv0$，故 $\int_{(p_0,p_2,\ldots,p_r)}\psi=0$。删去 $p_\mu$（$1\le\mu\le r-1$）的面都在超平面 $x^\mu=0$ 上，全部没有贡献，只剩两个面：`, tex: R`\int_{\partial\bar\sigma_r}\psi=\int_{(p_1,p_2,\ldots,p_r)}\psi+(-1)^r\int_{(p_0,p_1,\ldots,p_{r-1})}\psi` },
            { claim: R`**底面**：$(p_0,p_1,\ldots,p_{r-1})$ 就是 $x^r=0$ 上的标准 $(r-1)$ 单形（$x^\mu\ge0$，$\sum_{\mu=1}^{r-1}x^\mu\le1$），定向与 $x^1,\ldots,x^{r-1}$ 的顺序一致：`, tex: R`(-1)^r\int_{(p_0,p_1,\ldots,p_{r-1})}\psi=(-1)^r\int_{\bar\sigma_{r-1}}a(x^1,\ldots,x^{r-1},0)\,\dd x^1\ldots\dd x^{r-1}` },
            { claim: R`**斜面**：$(p_1,\ldots,p_r)$ 在超平面 $\sum_{\mu=1}^rx^\mu=1$ 上，用 $x^1,\ldots,x^{r-1}$ 作参数，$x^r=1-\sum_{\mu=1}^{r-1}x^\mu$。沿 $x^r$ 方向把它投影到 $x^r=0$，$p_r\mapsto p_0$，定向保持，得到 $(p_1,\ldots,p_{r-1},p_0)$；它与 $(p_0,p_1,\ldots,p_{r-1})$ 相差 $r$ 个顶点的一次轮换，符号为 $(-1)^{r-1}$：`, tex: R`\begin{aligned}\int_{(p_1,p_2,\ldots,p_r)}\psi&=\int_{(p_1,\ldots,p_{r-1},p_0)}a\Big(x^1,\ldots,x^{r-1},1-\sum_{\mu=1}^{r-1}x^\mu\Big)\dd x^1\ldots\dd x^{r-1}\\&=(-1)^{r-1}\int_{\bar\sigma_{r-1}}a\Big(x^1,\ldots,x^{r-1},1-\sum_{\mu=1}^{r-1}x^\mu\Big)\dd x^1\ldots\dd x^{r-1}\end{aligned}`, why: R`$r$ 个元素的轮换 $(0\,1\,\cdots\,r-1)$ 是 $r-1$ 个对换之积，故 $\operatorname{sgn}=(-1)^{r-1}$（\eqref{3.14}）。原书只写了结果，这里补出了符号的来由。`, fill: true },
            { claim: R`**合并。**两面之和为 $(-1)^{r-1}\int_{\bar\sigma_{r-1}}[a(\ldots,1-\sum x^\mu)-a(\ldots,0)]$，与左边逐项相同（$(-1)^r=-(-1)^{r-1}$）。\eqref{6.9b} 得证，从而 \eqref{6.8} 得证。` },
          ]} />
        </Stmt>
        <Derivation title={R`对 $r=2$ 与 $r=3$ 逐项核对（原书建议读者对照图 6.1 自行验证）`} collapsed steps={[
          { tex: R`r=2:\ \psi=a(x,y)\,\dd x,\qquad\dd\psi=-\frac{\partial a}{\partial y}\,\dd x\wedge\dd y`, why: R`$(-1)^{r-1}=-1$。` },
          { tex: R`\int_{\bar\sigma_2}\dd\psi=-\int_0^1\dd x\,\big[a(x,1-x)-a(x,0)\big]`, why: R`先对 $y$ 从 $0$ 积到 $1-x$。` },
          { tex: R`\partial\bar\sigma_2=(p_1p_2)-(p_0p_2)+(p_0p_1)`, why: R`$(p_0p_2)$ 在 $x=0$ 上，$\dd x$ 拉回为 0，无贡献。` },
          { tex: R`\int_{(p_0p_1)}a\,\dd x=\int_0^1a(x,0)\,\dd x,\qquad\int_{(p_1p_2)}a\,\dd x=\int_1^0a(x,1-x)\,\dd x=-\int_0^1a(x,1-x)\,\dd x`, why: R`$(p_1p_2)$ 从 $(1,0)$ 走到 $(0,1)$，$x$ 从 1 减到 0——这正是"投影成 $(p_1p_0)=-(p_0p_1)$"，符号 $(-1)^{r-1}=-1$。` },
          { tex: R`\int_{\partial\bar\sigma_2}\psi=\int_0^1\big[a(x,0)-a(x,1-x)\big]\dd x=\int_{\bar\sigma_2}\dd\psi\quad\checkmark`, why: R`这就是三角形上的 Green 公式。` },
          { tex: R`r=3:\ \psi=a\,\dd x\wedge\dd y,\quad\dd\psi=\frac{\partial a}{\partial z}\dd z\wedge\dd x\wedge\dd y=+\frac{\partial a}{\partial z}\dd x\wedge\dd y\wedge\dd z`, why: R`$(-1)^{r-1}=+1$。` },
          { tex: R`\int_{\bar\sigma_3}\dd\psi=\int_{\bar\sigma_2}\dd x\,\dd y\,\big[a(x,y,1-x-y)-a(x,y,0)\big]`, why: "先对 $z$ 积分。" },
          { tex: R`\partial\bar\sigma_3=(p_1p_2p_3)-(p_0p_2p_3)+(p_0p_1p_3)-(p_0p_1p_2)`, why: R`$(p_0p_2p_3)$ 在 $x=0$、$(p_0p_1p_3)$ 在 $y=0$ 上，$\dd x\wedge\dd y$ 拉回为零。` },
          { tex: R`-\int_{(p_0p_1p_2)}\psi=-\int_{\bar\sigma_2}a(x,y,0)\,\dd x\,\dd y,\qquad\int_{(p_1p_2p_3)}\psi=\int_{(p_1p_2p_0)}a(x,y,1-x-y)=+\int_{\bar\sigma_2}a(x,y,1-x-y)`, why: R`$(p_1p_2p_0)$ 是 $(p_0p_1p_2)$ 的轮换（偶置换），符号 $(-1)^{r-1}=+1$。从 \figref{6.1} 右图看：斜面的外法向朝外上方，投影到 $xy$ 平面保持定向；底面外法向朝下，所以带负号。` },
        ]} result={R`两种情形两边逐项相等。$r=3$ 正是四面体上的 Gauss 散度定理（$\boldsymbol\psi=(0,0,a)$ 的通量）。`} />
        <Box kind="warning" title="定向是 Stokes 定理的灵魂">{R`$\partial$ 中的交错符号 $(-1)^i$ 不是装饰：它保证 (i) 两个相邻单形的公共面在 $\partial(s+s')$ 中相消，从而 $\int_{\partial c}$ 只"看到"真正的边界；(ii) 结果与单形的定向约定相容。习惯的说法"外法向 + 右手定则"只是 $\mathbb{R}^3$ 中对这一符号规则的翻译。交互图 1 的圆环中，内圈必须顺时针走——那就是诱导定向。`}</Box>
        <Exercise n="6.1" title={R`在 $\mathbb{R}^3$ 中翻译 Stokes 定理`} level="★"
          hint={R`把 $\dd\omega$ 写成 $\dd y\wedge\dd z$、$\dd z\wedge\dd x$、$\dd x\wedge\dd y$ 的组合；把有向面元记为 $\dd\mathbf{S}=(\dd y\wedge\dd z,\dd z\wedge\dd x,\dd x\wedge\dd y)$。Gauss 情形用 $\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\varepsilon^{\lambda\mu\nu}\dd x\wedge\dd y\wedge\dd z$。`}
          solution={R`**(i) 经典 Stokes。**$\omega=a\,\dd x+b\,\dd y+c\,\dd z$，

$$\dd\omega=\Big(\frac{\partial c}{\partial y}-\frac{\partial b}{\partial z}\Big)\dd y\wedge\dd z+\Big(\frac{\partial a}{\partial z}-\frac{\partial c}{\partial x}\Big)\dd z\wedge\dd x+\Big(\frac{\partial b}{\partial x}-\frac{\partial a}{\partial y}\Big)\dd x\wedge\dd y=\operatorname{curl}\boldsymbol\omega\cdot\dd\mathbf{S},$$

其中 $\boldsymbol\omega=(a,b,c)$。而 $\omega=\boldsymbol\omega\cdot\dd\boldsymbol{l}$，$\dd\boldsymbol{l}=(\dd x,\dd y,\dd z)$。取 $c$ 为曲面 $S$，$\partial S=C$，\eqref{6.8} 即 $\int_S\operatorname{curl}\boldsymbol\omega\cdot\dd\mathbf S=\oint_C\boldsymbol\omega\cdot\dd\boldsymbol l$，曲面的定向与边界绕向按 $\partial$ 的诱导定向（右手定则）配合。

**(ii) Gauss。**$\psi=\frac12\psi_{\mu\nu}\dd x^\mu\wedge\dd x^\nu=\psi_{23}\dd y\wedge\dd z+\psi_{31}\dd z\wedge\dd x+\psi_{12}\dd x\wedge\dd y$。令 $\psi^\lambda=\frac12\varepsilon^{\lambda\mu\nu}\psi_{\mu\nu}$，即 $\boldsymbol\psi=(\psi_{23},\psi_{31},\psi_{12})$，则 $\psi=\boldsymbol\psi\cdot\dd\mathbf S$。而

$$\dd\psi=\tfrac12\partial_\lambda\psi_{\mu\nu}\,\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\tfrac12\varepsilon^{\lambda\mu\nu}\partial_\lambda\psi_{\mu\nu}\,\dd x\wedge\dd y\wedge\dd z=(\operatorname{div}\boldsymbol\psi)\,\dd V.$$

取 $c$ 为体积 $V$，$\partial V=S$，\eqref{6.8} 即 $\int_V\operatorname{div}\boldsymbol\psi\,\dd V=\oint_S\boldsymbol\psi\cdot\dd\mathbf S$。（0 形式的情形 $\int_\gamma\dd f=f(\text{终点})-f(\text{起点})$ 是梯度定理。）`}>
          <Tx>{R`设 $M=\mathbb{R}^3$，$\omega=a\,\dd x+b\,\dd y+c\,\dd z$。证明 Stokes 定理可写成`}</Tx>
          <Eq n="6.10" say={R`三维空间中一形式的 Stokes 定理：旋度穿过曲面的通量等于沿边界曲线的环流。`}>{R`\int_S\operatorname{curl}\boldsymbol\omega\cdot\dd\mathbf{S}=\oint_C\boldsymbol\omega\cdot\dd\boldsymbol{l}\qquad\text{(Stokes 定理)}`}</Eq>
          <Tx>{R`其中 $\boldsymbol\omega=(a,b,c)$，$C$ 是曲面 $S$ 的边界。类似地，对 $\psi=\frac12\psi_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，证明

$$\int_V\operatorname{div}\boldsymbol\psi\,\dd V=\oint_S\boldsymbol\psi\cdot\dd\mathbf{S}\qquad\text{(Gauss 定理)}$$

其中 $\psi^\lambda=\frac12\varepsilon^{\lambda\mu\nu}\psi_{\mu\nu}$，$S$ 是体积 $V$ 的边界。`}</Tx>
        </Exercise>
        <Box kind="warning" title={R`勘误：习题 6.1 的两处记号（p.250）`}>{R`(1) 原书 \eqref{6.10} 右边写作 $\oint_C\boldsymbol\omega\cdot\dd\mathbf{S}$；沿曲线的积分应是线元 $\dd\boldsymbol{l}$（面元 $\dd\mathbf S$ 只出现在左边）。(2) 原书写 $\psi^\lambda=\varepsilon^{\lambda\mu\nu}\psi_{\mu\nu}$，缺因子 $\frac12$：例如 $\psi^1=\varepsilon^{123}\psi_{23}+\varepsilon^{132}\psi_{32}=2\psi_{23}$，而 $\psi$ 中 $\dd y\wedge\dd z$ 的系数是 $\psi_{23}$。不加 $\frac12$ 时 Gauss 定理两边同乘 2，等式本身仍对，但 $\boldsymbol\psi$ 与 $\psi$ 的对应差了一倍。正文已改正。`}</Box>
        <StokesLab />
        <Tx>{R`**小结与过渡。**Stokes 定理把"区域上的导数"与"边界上的值"联系起来。下一节最关键的推论只有一行：若 $\omega=\dd\psi$ 是恰当形式、$c$ 是闭链（$\partial c=0$），则 $\int_c\omega=\int_{\partial c}\psi=0$。恰当形式在闭链上的积分永远为零——反过来，**积分不为零的闭形式一定不恰当**。这就是检测 de Rham 上同调的基本手段。`}</Tx>
      </Sub>
    </Sec>);
}
