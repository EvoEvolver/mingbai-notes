// 引言 + §9.1 切丛 + §9.2 纤维丛 —— 式 (9.1)–(9.19)，定义 9.1，定理 9.1，推论 9.1，例 9.1–9.2，图 9.1–9.7；交互图 1、3
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Derivation, C } from "@kit";
import { MobiusLab, CocycleLab } from "./_ch09_demos.jsx";

const R = String.raw;
// 交换图：  tl --top--> tr
//           |left        |right
//           bl --bot--> br
export const cd = (tl, top, tr, left, right, bl, bot, br) =>
  R`\begin{matrix}${tl}&\xrightarrow{\;${top}\;}&${tr}\\ {\scriptstyle ${left}}\Big\downarrow&&\Big\downarrow{\scriptstyle ${right}}\\ ${bl}&\xrightarrow{\;${bot}\;}&${br}\end{matrix}`;

export function Intro() {
  return (
    <Sec n="9.0" title="Introduction" zh="引言：局部像乘积，整体可以扭曲"
      gist={R`流形是"局部像 $\R^m$"的空间；纤维丛是"局部像两个空间的直积"的空间。引入坐标卡让我们在流形上做微积分，引入局部平凡化让我们在丛上把"底空间的点"与"纤维中的点"分开处理。`}
      why={R`广义相对论（标架、切丛）与规范场论（相位、内部对称性）都天然地用纤维丛描述：场在每一点取值于一个"内部空间"，而这些内部空间怎样拼在一起，携带了物理上可观测的拓扑信息（磁荷、瞬子数）。`}
      gives={[]}>
      <p className="muted">本章概念：<C id="fibre_bundle" /> · <C id="transition_function" /></p>
      <Tx>{R`回忆第 5 章：**流形**是局部像 $\R^m$、整体未必如此的拓扑空间；给它配上坐标卡，就能照搬多元微积分。**纤维丛**（fibre bundle）则可以说是"局部像两个拓扑空间的**直积**"的拓扑空间：在底空间的每一小块 $U$ 上方，它就是 $U\times F$；但这些小块拼起来之后，整体未必是一个直积。

物理中许多理论——广义相对论、规范场论——都用纤维丛来表述最自然。本章先用切丛作引子（§9.1），然后给出一般定义与基本构造（§9.2），再专门讨论纤维是向量空间的**向量丛**（§9.3）和纤维就是结构群本身的**主丛**（§9.4）。参考书：Choquet-Bruhat 等 (1982)、Eguchi 等 (1980)、Nash 与 Sen (1983)；完整的处理见 Kobayashi 与 Nomizu (1963, 1969) 以及 Steenrod (1951)。`}</Tx>
    </Sec>);
}

export function Sec91() {
  return (
    <Sec n="9.1" title="Tangent bundles" zh="切丛"
      gist={R`把流形所有点的切空间收集起来得到切丛 $TM$（\eqref{9.1}）→ 在一张卡上 $TU_i\cong U_i\times\R^m$，投影 $\pi$ 把向量送到它的根部 → 换卡时纤维坐标乘 Jacobi 矩阵 $\in\mathrm{GL}(m,\R)$（\eqref{9.3}），这就是结构群 → 向量场 = 截面 $s:M\to TM$，$\pi\circ s=\mathrm{id}_M$。`}
      why={R`切丛是最熟悉的纤维丛：读者已经知道向量在换坐标时怎样变换。把这些熟悉的事实重新组织成"局部乘积 + 粘合规则 + 投影 + 截面"，一般定义就呼之欲出。`}
      gives={["9.1", "9.2", "9.3"]}>
      <p className="muted">本节概念：<C id="fibre_bundle" /> · <C id="section" /></p>
      <Tx>{R`我们先从一个有启发性的例子讲起。$m$ 维流形 $M$ 上的**切丛**（tangent bundle）$TM$ 是 $M$ 的所有切空间的集合：`}</Tx>
      <Eq n="9.1" title="切丛" say={R`切丛：把流形上每一点的切空间（所有可能的速度）收集到一起，组成一个新空间。`}>{R`TM\equiv\bigcup_{p\in M}T_pM.`}</Eq>
      <Tx>{R`定义 $TM$ 所在的流形 $M$ 称为**底空间**（base space）。设 $\{U_i\}$ 是 $M$ 的开覆盖。若 $x^\mu=\varphi_i(p)$ 是 $U_i$ 上的坐标，则

$$TU_i\equiv\bigcup_{p\in U_i}T_pM$$

中的一个元素由一个点 $p\in M$ 与一个向量 $V=V^\mu(p)(\partial/\partial x^\mu)|_p\in T_pM$ 确定。$U_i$ 同胚于 $\R^m$ 的开子集 $\varphi(U_i)$，每个 $T_pM$ 同胚于 $\R^m$，所以 $TU_i$ 可以等同于直积 $\R^m\times\R^m$（\figref{9.1}）。若 $(p,V)\in TU_i$，等同的方式是 $(p,V)\mapsto(x^\mu(p),V^\mu(p))$。于是 $TU_i$ 是 $2m$ 维微分流形。

不仅如此，$TU_i$ 还分解为直积 $U_i\times\R^m$：任取 $TU_i$ 中的一点 $u$，我们都能有系统地把 $u$ 所含的信息拆成一个点 $p\in M$ 和一个向量 $V\in T_pM$。这自然引出**投影**（projection）$\pi:TU_i\to U_i$ 的概念（\figref{9.1}）：对任意 $u\in TU_i$，$\pi(u)$ 是向量所在的那个点 $p\in U_i$。向量本身的信息在投影下完全丢失。注意 $\pi^{-1}(p)=T_pM$；在纤维丛理论中，$T_pM$ 称为 $p$ 处的**纤维**（fibre）。`}</Tx>
      <Figure n="9.1" caption={R`切丛 $TM$ 的局部片 $TU_i\simeq\R^m\times\R^m$。投影 $\pi$ 把向量 $V\in T_pM$ 投到 $p$。`} width="55%" />
      <Tx>{R`由构造显然，若 $M=\R^m$，切丛本身就可以写成直积 $\R^m\times\R^m$。但一般并非如此，**切丛的非平凡结构反映了 $M$ 的拓扑非平凡性**。要看清这一点，不能只看一张卡 $U_i$，还必须看其他的卡。设 $U_j$ 是满足 $U_i\cap U_j\neq\emptyset$ 的卡，$y^\mu=\psi(p)$ 是 $U_j$ 上的坐标。取向量 $V\in T_pM$，$p\in U_i\cap U_j$。$V$ 有两种坐标表示：`}</Tx>
      <Eq n="9.2" say={R`同一个切向量在两套坐标下各有一组分量——向量本身不变，变的是"读数"。`}>{R`V=V^\mu\frac{\partial}{\partial x^\mu}\Big|_p=\tilde V^\mu\frac{\partial}{\partial y^\mu}\Big|_p.`}</Eq>
      <Tx>{R`容易看出它们的关系是`}</Tx>
      <Eq n="9.3" keyEq title="纤维坐标的变换" say={R`换坐标卡时，纤维坐标（向量分量）被 Jacobi 矩阵线性地"转动"——这个矩阵属于 $\mathrm{GL}(m,\R)$，就是切丛的结构群。`}>{R`\tilde V^\nu=\frac{\partial y^\nu}{\partial x^\mu}(p)V^\mu.`}</Eq>
      <Derivation title={R`由 \eqref{9.2} 推出 \eqref{9.3}`} collapsed steps={[
        { tex: R`\frac{\partial}{\partial x^\mu}=\frac{\partial y^\nu}{\partial x^\mu}\frac{\partial}{\partial y^\nu}`, why: R`链式法则：$\frac{\partial f}{\partial x^\mu}=\frac{\partial y^\nu}{\partial x^\mu}\frac{\partial f}{\partial y^\nu}$ 对任意函数 $f$ 成立。` },
        { tex: R`V=V^\mu\frac{\partial y^\nu}{\partial x^\mu}\frac{\partial}{\partial y^\nu}\Big|_p`, why: R`代入 \eqref{9.2} 的第一种表示。` },
        { tex: R`\tilde V^\nu=\frac{\partial y^\nu}{\partial x^\mu}(p)V^\mu`, why: R`$\{\partial/\partial y^\nu\}$ 是 $T_pM$ 的基，展开系数唯一，与 \eqref{9.2} 的第二种表示比较。` },
      ]} />
      <Tx>{R`要使 $\{x^\mu\}$ 与 $\{y^\nu\}$ 都是好的坐标系，矩阵 $(G^\nu{}_\mu)\equiv(\partial y^\nu/\partial x^\mu)$ 必须非奇异：$(G^\nu{}_\mu)\in\mathrm{GL}(m,\R)$。因此，每当我们换坐标时，纤维坐标就被 $\mathrm{GL}(m,\R)$ 的一个元素"转动"一下。*群* $\mathrm{GL}(m,\R)$ 称为 $TM$ 的**结构群**（structure group）。纤维正是以这种方式相互交织成切丛，因而切丛可能有相当复杂的拓扑结构。

顺便指出，投影 $\pi$ 可以在 $M$ 上整体地定义：$\pi(u)=p$ 显然与所选坐标无关，所以 $\pi:TM\to M$ 不必借助局部卡就有定义。`}</Tx>
      <Tx>{R`**截面。**设 $X\in\mathcal{X}(M)$ 是 $M$ 上的向量场。$X$ 在每个点 $p\in M$ 指定一个向量 $X|_p\in T_pM$。从现在的观点看，$X$ 是一个光滑映射 $M\to TM$。这个映射并非完全任意：点 $p$ 必须被映到满足 $\pi(u)=p$ 的点 $u\in TM$。我们把满足 $\pi\circ s=\mathrm{id}_M$ 的光滑映射 $s:M\to TM$ 定义为 $TM$ 的**截面**（section，或 cross section）。若截面 $s_i:U_i\to TU_i$ 只在一张卡 $U_i$ 上有定义，就称为**局部截面**（local section）。`}</Tx>
      <Box kind="physics" title="为什么说切丛的扭曲反映了 $M$ 的拓扑">{R`若 $TM$ 平凡，即 $TM\cong M\times\R^m$，那么取 $\R^m$ 的标准基，就得到 $m$ 个处处线性无关的整体向量场（整体标架）。对 $S^2$ 这是不可能的——"毛球定理"说 $S^2$ 上任何连续向量场都至少有一个零点。所以 $TS^2$ 不是直积，这种不可能性完全来自 $S^2$ 的整体拓扑（其 Euler 示性数 $\chi(S^2)=2\neq0$，见第 11、12 章）。反之 $\R^m$、环面 $T^2$、$S^3$ 的切丛都是平凡的。`}</Box>
    </Sec>);
}

export function Sec92() {
  return (
    <Sec n="9.2" title="Fibre bundles" zh="纤维丛"
      gist={R`一般定义（\sref{D9.1}）：$(E,\pi,M,F,G)$、局部平凡化 $\phi_i$、转移函数 $t_{ij}=\phi_{i,p}^{-1}\circ\phi_{j,p}$，相容条件 \eqref{9.6a}–\eqref{9.6c}；换平凡化 $\tilde t_{ij}=g_i^{-1}t_{ij}g_j$；截面 → 例 9.1：圆柱与 Möbius 带 → 由 $\{U_i,t_{ij},F,G\}$ 重构丛 → 丛映射、等价丛、拉回丛（$t^*_{ij}=t_{ij}\circ f$）→ 同伦公理（\sref{T9.1}）：可缩底空间上的丛平凡（\sref{C9.1}）。`}
      why={R`切丛的所有特征——局部乘积、投影、结构群、粘合规则、截面——都不依赖于"纤维是切空间"这件事。把它们抽象出来，同一套语言就能描述法丛、线丛、规范场的相位丛、自旋丛。`}
      gives={["9.4", "9.6a", "9.6b", "9.6c", "9.9", "9.10", "9.12", "9.18"]}>
      <p className="muted">本节概念：<C id="fibre_bundle" /> · <C id="transition_function" /> · <C id="section" /> · <C id="trivial_bundle" /> · <C id="pullback" /></p>
      <Tx>{R`上一节的切丛是一个更一般的框架——**纤维丛**——的例子。现在给出定义。`}</Tx>

      <Sub n="9.2.1" title="Definitions" zh="定义">
        <Stmt id="D9.1">
          <Eq n="9.4" keyEq title="转移函数（定义）" say={R`同一个点 $u$ 在 $j$ 卡里的纤维坐标是 $f$，那么它在 $i$ 卡里的纤维坐标就是 $t_{ij}(p)f$：转移函数把 $j$ 卡的读数翻译成 $i$ 卡的读数。`}>{R`\phi_j(p,f)=\phi_i(p,t_{ij}(p)f).`}</Eq>
        </Stmt>
        <Figure n="9.2" caption={R`在重叠区 $U_i\cap U_j$ 上，给 $u\in\pi^{-1}(p)$（$p\in U_i\cap U_j$）指定了 $F$ 的两个元素 $f_i,f_j$，二者由 $t_{ij}(p)$ 联系：$f_i=t_{ij}(p)f_j$。`} width="55%" />
        <Tx>{R`［**注：**我们常用简写 $E\xrightarrow{\pi}M$ 或干脆用 $E$ 表示纤维丛 $(E,\pi,M,F,G)$。

严格地说，纤维丛的定义应当与 $M$ 的特定覆盖 $\{U_i\}$ 无关。在数学文献中，上面的定义用来定义一个**坐标丛**（coordinate bundle）$(E,\pi,M,F,G,\{U_i\},\{\phi_i\})$。两个坐标丛 $(E,\pi,M,F,G,\{U_i\},\{\phi_i\})$ 与 $(E,\pi,M,F,G,\{V_i\},\{\psi_i\})$ 称为等价的，若 $(E,\pi,M,F,G,\{U_i\}\cup\{V_j\},\{\phi_i\}\cup\{\psi_j\})$ 仍是一个坐标丛；纤维丛定义为坐标丛的等价类。不过在物理的实际应用中，我们总是使用某个确定的覆盖，不区分坐标丛与纤维丛。］

**逐点看清定义。**取底空间 $M$ 的一张卡 $U_i$。$\pi^{-1}(U_i)$ 是与 $U_i\times F$ 微分同胚的直积，$\phi_i^{-1}:\pi^{-1}(U_i)\to U_i\times F$ 就是这个微分同胚。若 $U_i\cap U_j\neq\emptyset$，在 $U_i\cap U_j$ 上就有两个映射 $\phi_i$ 与 $\phi_j$。取一点 $u$，$\pi(u)=p\in U_i\cap U_j$。于是 $\phi_i^{-1}$ 与 $\phi_j^{-1}$ 分别给它指定 $F$ 的一个元素：`}</Tx>
        <Eq n="9.5" say={R`同一个点 $u$ 在两种局部平凡化下的"读数"：底空间分量都是 $p$，纤维分量 $f_i$、$f_j$ 一般不同。`}>{R`\phi_i^{-1}(u)=(p,f_i),\qquad\phi_j^{-1}(u)=(p,f_j)`}</Eq>
        <Tx>{R`（见\figref{9.2}）。存在映射 $t_{ij}:U_i\cap U_j\to G$ 把 $f_i$ 与 $f_j$ 联系起来：$f_i=t_{ij}(p)f_j$。这也就是 \eqref{9.4}。

我们要求转移函数满足下面的**相容条件**（consistency conditions）：`}</Tx>
        <Eq n="9.6a" say={R`一张卡与自己之间不需要任何换算。`}>{R`t_{ii}(p)=\text{identity map}\qquad(p\in U_i)`}</Eq>
        <Eq n="9.6b" say={R`从 $j$ 换到 $i$ 再换回 $j$ 等于什么都没做：反方向的转移函数是逆元。`}>{R`t_{ij}(p)=t_{ji}(p)^{-1}\qquad(p\in U_i\cap U_j)`}</Eq>
        <Eq n="9.6c" keyEq title="余循环条件" say={R`三卡重叠处，从 $k$ 先换到 $j$ 再换到 $i$，与直接从 $k$ 换到 $i$ 结果相同：局部片能无矛盾地粘起来的条件。`}>{R`t_{ij}(p)\cdot t_{jk}(p)=t_{ik}(p)\qquad(p\in U_i\cap U_j\cap U_k).`}</Eq>
        <Derivation title={R`由定义 \eqref{9.7a} 直接验证 \eqref{9.6a}–\eqref{9.6c}`} collapsed steps={[
          { tex: R`t_{ii}(p)=\phi_{i,p}^{-1}\circ\phi_{i,p}=\mathrm{id}_F`, why: R`(a)：$\phi_{i,p}:F\to F_p$ 是微分同胚。` },
          { tex: R`t_{ij}(p)\circ t_{ji}(p)=\phi_{i,p}^{-1}\circ\phi_{j,p}\circ\phi_{j,p}^{-1}\circ\phi_{i,p}=\mathrm{id}_F`, why: R`(b)：中间两个因子相消。` },
          { tex: R`t_{ij}(p)\circ t_{jk}(p)=\phi_{i,p}^{-1}\circ\phi_{j,p}\circ\phi_{j,p}^{-1}\circ\phi_{k,p}=\phi_{i,p}^{-1}\circ\phi_{k,p}=t_{ik}(p)`, why: R`(c)：同理。所以只要转移函数**来自**一族局部平凡化，相容条件自动成立；反过来，在 §9.2.2 中只给出 $t_{ij}$ 去**造**丛时，它们才是必须验证的条件。交互图 3 在 $TS^2$ 上数值验证这三条。` },
        ]} />
        <Tx>{R`这些条件不满足，丛的各个局部片就无法一致地粘起来。如果所有的转移函数都能取成恒等映射，这个纤维丛就称为**平凡丛**（trivial bundle）。平凡丛就是直积 $M\times F$。

**转移函数远非唯一。**给定纤维丛 $E\xrightarrow{\pi}M$，可能的转移函数显然很多。设 $\{U_i\}$ 是 $M$ 的覆盖，$\{\phi_i\}$ 与 $\{\tilde\phi_i\}$ 是给出同一个纤维丛的两组局部平凡化。它们各自的转移函数为`}</Tx>
        <Eq n="9.7a" say={R`转移函数的定义：先用 $j$ 卡的平凡化把纤维坐标"放进"纤维，再用 $i$ 卡的平凡化"读出来"。`}>{R`t_{ij}(p)=\phi_{i,p}^{-1}\circ\phi_{j,p}`}</Eq>
        <Eq n="9.7b" say={R`换一组局部平凡化，按同样的方式得到另一组转移函数。`}>{R`\tilde t_{ij}(p)=\tilde\phi_{i,p}^{-1}\circ\tilde\phi_{j,p}.`}</Eq>
        <Tx>{R`在每一点 $p\in M$ 定义映射 $g_i(p):F\to F$：`}</Tx>
        <Eq n="9.8" say={R`同一张卡上两种平凡化之间的换算——相当于在这张卡内做一次"规范变换"。`}>{R`g_i(p)\equiv\phi_{i,p}^{-1}\circ\tilde\phi_{i,p}.`}</Eq>
        <Tx>{R`我们要求 $g_i(p)$ 是属于 $G$ 的同胚。如果 $\{\phi_i\}$ 与 $\{\tilde\phi_i\}$ 描述的是同一个纤维丛，这一要求当然必须满足。由 \eqref{9.7a}、\eqref{9.7b} 与 \eqref{9.8} 容易看出`}</Tx>
        <Eq n="9.9" keyEq title="换平凡化（规范变换）" say={R`每张卡内各自换一次平凡化，转移函数就被两边各乘一个群元：粘合规则只确定到这种"规范等价"。`}>{R`\tilde t_{ij}(p)=g_i(p)^{-1}\circ t_{ij}(p)\circ g_j(p).`}</Eq>
        <Derivation title={R`推导 \eqref{9.9}`} collapsed steps={[
          { tex: R`\tilde\phi_{i,p}=\phi_{i,p}\circ g_i(p)`, why: R`由 \eqref{9.8} 两边左复合 $\phi_{i,p}$。` },
          { tex: R`\tilde t_{ij}(p)=\big(\phi_{i,p}\circ g_i(p)\big)^{-1}\circ\phi_{j,p}\circ g_j(p)=g_i(p)^{-1}\circ\phi_{i,p}^{-1}\circ\phi_{j,p}\circ g_j(p)`, why: R`代入 \eqref{9.7b}，用 $(a\circ b)^{-1}=b^{-1}\circ a^{-1}$。` },
          { tex: R`=g_i(p)^{-1}\circ t_{ij}(p)\circ g_j(p)`, why: R`中间两个因子是 \eqref{9.7a}。` },
        ]} />
        <Tx>{R`在后面将会遇到的实际情形中，$t_{ij}$ 是把局部卡粘合起来所需的**规范变换**，而 $g_i$ 对应于一张卡 $U_i$ 之内的**规范自由度**。若丛是平凡的，可以把所有转移函数都取为恒等映射；于是转移函数最一般的形式是`}</Tx>
        <Eq n="9.10" title="平凡丛的转移函数" say={R`平凡丛的转移函数总能写成"两张卡各自规范变换之差"；反过来，若转移函数能写成这种形式，丛就是平凡的。`}>{R`t_{ij}(p)=g_i(p)^{-1}g_j(p).`}</Eq>
        <Box kind="note" title="余循环、上边缘与第 11 章">{R`把满足 \eqref{9.6c} 的一族 $\{t_{ij}\}$ 称为**余循环**，形如 \eqref{9.10} 的称为**上边缘**。"丛的同构类 = 余循环模去规范变换 \eqref{9.9}"，这正是 Čech 上同调的语言。对 $G=\mathrm{U}(1)$ 这样的交换群，$\tilde t_{ij}=g_i^{-1}g_jt_{ij}$，丛的分类化为上同调群的计算，引出第 11 章的陈类。`}</Box>
        <Tx>{R`**截面。**设 $E\xrightarrow{\pi}M$ 是纤维丛。**截面**（section 或 cross section）$s:M\to E$ 是满足 $\pi\circ s=\mathrm{id}_M$ 的光滑映射。显然 $s(p)=s|_p$ 是 $F_p=\pi^{-1}(p)$ 的元素。$M$ 上截面的集合记作 $\Gamma(M,F)$。若 $U\subset M$，可以谈论只在 $U$ 上有定义的**局部截面**；$\Gamma(U,F)$ 表示 $U$ 上局部截面的集合。例如 $\Gamma(M,TM)$ 就等同于向量场的集合 $\mathcal{X}(M)$。应当注意，**并非所有纤维丛都容许整体截面。**`}</Tx>

        <Box kind="example" n="9.1" title="圆柱与 Möbius 带">
          <Tx>{R`设 $E\xrightarrow{\pi}S^1$ 是典型纤维为 $F=[-1,1]$ 的纤维丛。取 $S^1$ 的开覆盖 $U_1=(0,2\pi)$、$U_2=(-\pi,\pi)$，交集 $U_1\cap U_2$ 由 $A=(0,\pi)$ 与 $B=(\pi,2\pi)$ 两段组成（\figref{9.3}）。局部平凡化 $\phi_1,\phi_2$ 在 $\theta\in A$、$t\in F$ 上取为

$$\phi_1^{-1}(u)=(\theta,t),\qquad\phi_2^{-1}(u)=(\theta,t),$$

于是 $A$ 上的转移函数 $t_{12}(\theta)$ 是恒等映射 $t_{12}(\theta):t\mapsto t$。在 $B$ 上有两种选择：

(I) $\phi_1^{-1}(u)=(\theta,t)$，$\phi_2^{-1}(u)=(\theta,t)$；

(II) $\phi_1^{-1}(u)=(\theta,t)$，$\phi_2^{-1}(u)=(\theta,-t)$。

情形 (I) 中 $t_{12}(\theta)$ 处处是恒等映射，两个局部片粘成**圆柱**（\figref{9.4}(a)）。情形 (II) 中 $\theta\in B$ 时 $t_{12}(\theta):t\mapsto-t$，得到 **Möbius 带**（\figref{9.4}(b)）。因此圆柱的结构群是平凡群 $G=\{e\}$（$e$ 为 $F$ 到自身的恒等映射），而 Möbius 带的结构群是 $G=\{e,g\}$，$g:t\mapsto-t$。由于 $g^2=e$，$G\cong\Z_2$。圆柱是平凡丛 $S^1\times F$，Möbius 带则不是。［**注：**群 $\Z_2$ 不是李群。这是本书唯一一次用离散群作结构群。］（严格地说，离散群可以看作零维李群；原书的意思是它不连通、没有非零的李代数，第 10 章的联络在这样的丛上是平凡的。）`}</Tx>
          <Tx>{R`**为什么 Möbius 带不是平凡丛（补充论证）。**若它平凡，就能找到 $g_1:U_1\to\Z_2$、$g_2:U_2\to\Z_2$ 使 $t_{12}=g_1^{-1}g_2$（\eqref{9.10}）。但 $U_1$、$U_2$ 都连通，$\Z_2$ 离散，所以 $g_1,g_2$ 都是常数，$g_1^{-1}g_2$ 在 $A$ 与 $B$ 上取同一个值——与 $t_{12}|_A=e$、$t_{12}|_B=g$ 矛盾。交互图 1 用"沿底圆走一圈纤维是否翻转"把这一点做成可以看见的实验。`}</Tx>
        </Box>
        <Figure n="9.3" caption={R`底空间 $S^1$ 与两张卡 $U_1$、$U_2$，丛在每张卡上是平凡的。`} width="40%" />
        <Figure n="9.4" caption={R`$S^1$ 上的两个纤维丛：(a) 圆柱，是平凡丛 $S^1\times I$；(b) Möbius 带。`} width="65%" />
        <MobiusLab />
        <CocycleLab />
      </Sub>

      <Sub n="9.2.2" title="Reconstruction of fibre bundles" zh="纤维丛的重构">
        <Tx>{R`构造一个纤维丛最少需要哪些信息？我们现在证明：给定 $M$、$\{U_i\}$、$t_{ij}(p)$、$F$ 与 $G$，就能重构纤维丛 $(E,\pi,M,F,G)$——也就是从给定的数据中找出唯一的 $\pi$、$E$ 与 $\phi_i$（\sref{F:recon9}）。定义`}</Tx>
        <Eq n="9.11" say={R`先把所有局部乘积 $U_i\times F$ 互不相交地摆在一起——同一个底空间点在不同卡里的副本暂时被当作不同的点。`}>{R`X\equiv\bigcup_iU_i\times F.`}</Eq>
        <Tx>{R`（这里的并是**不交并**。）在 $(p,f)\in U_i\times F$ 与 $(q,f')\in U_j\times F$ 之间引入等价关系 $\sim$：$(p,f)\sim(q,f')$ 当且仅当 $p=q$ 且 $f=t_{ij}(p)f'$。于是纤维丛 $E$ 定义为`}</Tx>
        <Eq n="9.12" keyEq title="由转移函数重构丛" say={R`把各张卡里代表同一点的副本按转移函数粘起来：纤维丛就是"局部乘积的不交并模去粘合关系"。`}>{R`E=X/\sim.`}</Eq>
        <Tx>{R`把 $E$ 的元素记作 $[(p,f)]$。投影为`}</Tx>
        <Eq n="9.13" say={R`投影只读出等价类中共同的底空间点——与用哪张卡的代表元无关。`}>{R`\pi:[(p,f)]\mapsto p.`}</Eq>
        <Tx>{R`局部平凡化 $\phi_i:U_i\times F\to\pi^{-1}(U_i)$ 由下式给出：`}</Tx>
        <Eq n="9.14" say={R`第 $i$ 张卡的局部平凡化就是把 $U_i\times F$ 中的点送到它的等价类。`}>{R`\phi_i:(p,f)\mapsto[(p,f)].`}</Eq>
        <Box kind="warning" title={R`勘误：等价关系的方向（p.373）`}>{R`原书把等价关系写作"$(p,f)\sim(q,f')$ 当且仅当 $p=q$ 且 $f'=t_{ij}(p)f$"，其中 $(p,f)\in U_i\times F$、$(q,f')\in U_j\times F$。这与本书自己的约定 \eqref{9.4}、图 9.2（$f_i=t_{ij}(p)f_j$，即 $i$ 卡坐标 = $t_{ij}\times$ $j$ 卡坐标）方向相反：按原书写法，重构出来的丛的转移函数是 $t_{ji}$ 而非 $t_{ij}$。正确的写法是 $f=t_{ij}(p)f'$（等价地 $f'=t_{ji}(p)f$），本站正文已改正。对交换的结构群且 $t_{ij}$ 取值 $\pm1$（如 Möbius 带）时两种写法给出同一个丛，所以这一笔误在例 9.1 中看不出来。`}</Box>
        <Derivation title={R`验证：$E,\pi,\{\phi_i\}$ 满足纤维丛的全部公理（原书"留给读者"）`} collapsed steps={[
          { tex: R`(p,f)\sim(p,f)`, why: R`自反性：$f=t_{ii}(p)f$ 由 \eqref{9.6a}。` },
          { tex: R`f=t_{ij}f'\ \Rightarrow\ f'=t_{ij}^{-1}f=t_{ji}f`, why: R`对称性：由 \eqref{9.6b}。` },
          { tex: R`f=t_{ij}f',\ f'=t_{jk}f''\ \Rightarrow\ f=t_{ij}t_{jk}f''=t_{ik}f''`, why: R`传递性：由 \eqref{9.6c}（$p\in U_i\cap U_j\cap U_k$）。所以 $\sim$ 确是等价关系，$E$ 有定义；相容条件恰好就是"$\sim$ 是等价关系"的三个公理。` },
          { tex: R`\pi\circ\phi_i(p,f)=\pi([(p,f)])=p`, why: R`\eqref{9.13} 与等价类代表元无关，因为等价的元素有相同的 $p$；这就是\sref{D9.1}(vi) 的条件。` },
          { tex: R`\phi_i:U_i\times F\to\pi^{-1}(U_i)\ \text{是双射}`, why: R`满：$\pi^{-1}(U_i)$ 中任一类 $[(p,f')]$（代表元在 $U_j\times F$）都等于 $[(p,t_{ij}(p)f')]$，后者在 $\phi_i$ 的像中。单：$U_i\times F$ 中两个不同元素不等价，因为 $t_{ii}=e$。$E$ 取商拓扑与使 $\phi_i$ 为微分同胚的光滑结构。` },
          { tex: R`\phi_{i,p}^{-1}\circ\phi_{j,p}(f')=f\ \text{其中}\ [(p,f)]=[(p,f')]\ \Rightarrow\ f=t_{ij}(p)f'`, why: R`所以重构出的丛的转移函数正是给定的 $t_{ij}$。` },
        ]} />
        <Tx>{R`因此给定的数据唯一地重构出纤维丛 $E$。

这一程序可以用来**从旧丛造新丛**。设 $(E,\pi,M,F,G)$ 是纤维丛。与它相伴的有一个新丛：底空间仍是 $M$，转移函数仍是 $t_{ij}(p)$，结构群仍是 $G$，纤维换成 $G$ 作用在其上的另一个 $F'$。相伴丛的例子将在后面（§9.4.2）给出。`}</Tx>
      </Sub>

      <Sub n="9.2.3" title="Bundle maps" zh="丛映射">
        <Tx>{R`设 $E\xrightarrow{\pi}M$ 与 $E'\xrightarrow{\pi'}M'$ 是纤维丛。*光滑*映射 $\bar f:E'\to E$ 若把 $E'$ 的每根纤维 $F'_p$ 映到 $E$ 的某根纤维 $F_q$ 上，就称为**丛映射**（bundle map）。这时 $\bar f$ 自然诱导出光滑映射 $f:M'\to M$，$f(p)=q$（\figref{9.5}）。注意下面的图交换：`}</Tx>
        <Eq n="9.15" say={R`丛映射的本质：先在全空间里映射再投影，与先投影再在底空间里映射，结果相同——它把纤维整根地送到纤维。`}>{cd(R`E'`, R`\bar f`, R`E`, R`\pi'`, R`\pi`, R`M'`, R`f`, R`M`) + R`\qquad\left(` + cd(R`u`, R`\bar f`, R`\bar f(u)`, R`\pi'`, R`\pi`, R`p`, R`f`, R`q`) + R`\right)`}</Eq>
        <Tx>{R`［**注意：**光滑映射 $\bar f:E'\to E$ 不一定是丛映射。它可能把 $u,v\in F'_p$ 映到 $E$ 的不同纤维上，使 $\pi(\bar f(u))\neq\pi(\bar f(v))$。］`}</Tx>
        <Figure n="9.5" caption={R`丛映射 $\bar f:E'\to E$ 诱导映射 $f:M'\to M$。`} width="60%" />
      </Sub>

      <Sub n="9.2.4" title="Equivalent bundles" zh="等价丛">
        <Tx>{R`两个丛 $E'\xrightarrow{\pi'}M$ 与 $E\xrightarrow{\pi}M$ 称为**等价的**（equivalent），若存在丛映射 $\bar f:E'\to E$，使 $f:M\to M$ 是恒等映射，且 $\bar f$ 是微分同胚：`}</Tx>
        <Eq n="9.16" say={R`等价丛：一个逐纤维的微分同胚，在底空间上什么也不动——两个丛只是"同一个丛的两种写法"。`}>{cd(R`E'`, R`\bar f`, R`E`, R`\pi'`, R`\pi`, R`M`, R`\mathrm{id}_M`, R`M.`)}</Eq>
        <Tx>{R`这个等价丛的定义与\sref{D9.1} 之后的注中所给的定义是协调的。用转移函数说：在公共的加细覆盖上，两个丛等价当且仅当它们的转移函数相差 \eqref{9.9} 形式的规范变换（取 $g_i(p)=\phi_{i,p}^{-1}\circ\bar f\circ\phi'_{i,p}$）。`}</Tx>
      </Sub>

      <Sub n="9.2.5" title="Pullback bundles" zh="拉回丛">
        <Tx>{R`设 $E\xrightarrow{\pi}M$ 是典型纤维为 $F$ 的纤维丛。若给定映射 $f:N\to M$，则对 $(E,f)$ 可以在 $N$ 上定义一个纤维仍为 $F$ 的新丛（\figref{9.6}）。令 $f^*E$ 是 $N\times E$ 的子空间，由满足 $f(p)=\pi(u)$ 的点 $(p,u)$ 组成：$f^*E\equiv\{(p,u)\in N\times E\mid f(p)=\pi(u)\}$ 称为 $E$ 被 $f$ 的**拉回**（pullback）。$f^*E$ 的纤维 $F_p$ 就是 $E$ 的纤维 $F_{f(p)}$ 的一个副本。若用 $\pi_1:(p,u)\mapsto p$ 定义 $f^*E\xrightarrow{\pi_1}N$，用 $(p,u)\mapsto u$ 定义 $f^*E\xrightarrow{\pi_2}E$，则拉回 $f^*E$ 可以被赋予纤维丛的结构，并得到下面的丛映射：`}</Tx>
        <Figure n="9.6" caption={R`给定纤维丛 $E\xrightarrow{\pi}M$，映射 $f:N\to M$ 在 $N$ 上定义拉回丛 $f^*E$。`} width="60%" />
        <Eq n="9.17" title="拉回丛" say={R`拉回丛：$N$ 的点 $p$ 上方放的就是 $f(p)$ 上方的那根纤维；$\pi_2$ 是把它"认回"原丛的丛映射。`}>{cd(R`f^*E`, R`\pi_2`, R`E`, R`\pi_1`, R`\pi`, R`N`, R`f`, R`M`) + R`\qquad\left(` + cd(R`(p,u)`, R`\pi_2`, R`u`, R`\pi_1`, R`\pi`, R`p`, R`f`, R`f(p)`) + R`\right).`}</Eq>
        <Tx>{R`图的交换性来自：对 $(p,u)\in f^*E$，$\pi(\pi_2(p,u))=\pi(u)=f(p)=f(\pi_1(p,u))$。特别地，若 $N=M$、$f=\mathrm{id}_M$，则两个纤维丛 $f^*E$ 与 $E$ 等价。

**拉回丛的转移函数。**设 $\{U_i\}$ 是 $M$ 的覆盖，$\{\phi_i\}$ 是局部平凡化。$\{f^{-1}(U_i)\}$ 给出 $N$ 的覆盖，在其上 $f^*E$ 是局部平凡的。取 $u\in E$，使 $\pi(u)=f(p)\in U_i$（某个 $p\in N$）。若 $\phi_i^{-1}(u)=(f(p),f_i)$，则 $\psi_i^{-1}(p,u)=(p,f_i)$，其中 $\psi_i$ 是 $f^*E$ 的局部平凡化。$f(p)\in U_i\cap U_j$ 处的转移函数 $t_{ij}$ 把 $f_j$ 映到 $f_i=t_{ij}(f(p))f_j$；$f^*E$ 在 $p\in f^{-1}(U_i)\cap f^{-1}(U_j)$ 处相应的转移函数 $t^*_{ij}$ 也把 $f_j$ 映到 $f_i$（\figref{9.7}）。这说明`}</Tx>
        <Figure n="9.7" caption={R`拉回丛 $f^*E$ 的转移函数 $t^*_{ij}$ 是 $E$ 的转移函数 $t_{ij}$ 的拉回。`} width="70%" />
        <Eq n="9.18" keyEq title="拉回丛的转移函数" say={R`拉回丛的粘合规则就是把原丛的粘合规则与 $f$ 复合：在 $p$ 处用 $f(p)$ 处的转移函数。`}>{R`t^*_{ij}(p)=t_{ij}(f(p)).`}</Eq>
        <Box kind="example" n="9.2" title={R`$TN$ 何时是 $TM$ 的拉回`}>
          <Tx>{R`设 $M$、$N$ 是微分流形，$\dim M=\dim N=m$，$f:N\to M$ 光滑。映射 $f$ 诱导映射 $\pi_2:TN\to TM$，使下图交换：`}</Tx>
          <Eq n="9.19" say={R`切丛之间的映射 $\pi_2$（就是推前 $f_*$）覆盖底空间映射 $f$——它是一个丛映射。`}>{cd(R`TN`, R`\pi_2`, R`TM`, R`\pi_1`, R`\pi`, R`N`, R`f`, R`M.`)}</Eq>
          <Tx>{R`设 $W=W^\nu\partial/\partial y^\nu$ 是 $T_pN$ 的向量，$V=V^\mu\partial/\partial x^\mu$ 是 $T_{f(p)}M$ 中对应的向量（$\pi_2=f_*$，$V^\mu=W^\nu\partial f^\mu/\partial y^\nu$）。若 $TN$ 是拉回丛 $f^*(TM)$，则 $\pi_2$ 把 $T_pN$ 微分同胚地映到 $T_{f(p)}M$。这当且仅当 $\pi_2$ 在 $TN$ 的每一点都有最大秩 $m$ 时才可能。设 $\varphi(f(p))=(f^1(y),\ldots,f^m(y))$ 是 $f(p)$ 在 $M$ 的卡 $(U,\varphi)$ 中的坐标，其中 $y=\psi(p)$ 是 $p$ 在 $N$ 的卡 $(V,\psi)$ 中的坐标。最大秩条件就是：对任意 $p\in N$，$\det(\partial f^\mu(y)/\partial y^\nu)\neq0$——即 $f$ 是局部微分同胚。`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.2.6" title="Homotopy axiom" zh="同伦公理">
        <Tx>{R`设 $f$、$g$ 是从 $M'$ 到 $M$ 的映射。若存在光滑映射 $F:M'\times[0,1]\to M$，使对任意 $p\in M'$ 有 $F(p,0)=f(p)$、$F(p,1)=g(p)$，就说 $f$ 与 $g$ **同伦**（homotopic），见 §4.2。（这里的 $F$ 是同伦，不是纤维。）`}</Tx>
        <Stmt id="T9.1">
          <Proof title="证明思路（原书只引 Steenrod，本站补充要点）" collapsed steps={[
            { claim: R`设 $F:N\times I\to M$ 是从 $f$ 到 $g$ 的同伦，$I=[0,1]$。把 $E$ 沿 $F$ 拉回，得到 $N\times I$ 上的丛 $F^*E$。由 \eqref{9.18}，它限制在 $N\times\{0\}$、$N\times\{1\}$ 上分别是 $f^*E$ 与 $g^*E$。`, uses: ["9.17", "9.18"], fill: true },
            { claim: R`覆叠同伦定理：$N\times I$ 上的任何丛都等价于 $(F^*E|_{N\times\{0\}})\times I$，即"沿 $I$ 方向是乘积"。直观地说，可以沿 $t$ 方向把纤维逐段搬运（在每个 $f^{-1}(U_i)\times[t_k,t_{k+1}]$ 上丛是平凡的，再用单位分解粘合）。`, uses: ["X:Steenrod-homotopy"], fill: true },
            { claim: R`于是 $g^*E=F^*E|_{N\times\{1\}}\cong F^*E|_{N\times\{0\}}=f^*E$，并且这个同构覆盖 $\mathrm{id}_N$，所以二者等价（\eqref{9.16}）。`, uses: ["9.16"], fill: true },
          ]} />
        </Stmt>
        <Tx>{R`证明见 Steenrod (1951)。**一个重要推论。**设 $M$ 是可缩到一点的流形，则存在同伦 $F:M\times I\to M$，使

$$F(p,0)=p\qquad F(p,1)=p_0,$$

其中 $p_0\in M$ 是一个固定点。设 $E\xrightarrow{\pi}M$ 是 $M$ 上的纤维丛，考虑拉回丛 $h_0^*E$ 与 $h_1^*E$，其中 $h_t(p)\equiv F(p,t)$。纤维丛 $h_1^*E$ 是纤维丛 $\{p_0\}\times F$ 的拉回，因而是平凡丛：$h_1^*E\simeq M\times F$。另一方面 $h_0^*E=E$，因为 $h_0$ 是恒等映射。由\sref{T9.1}，$h_0^*E=E$ 与 $h_1^*E=M\times F$ 等价，所以 $E$ 是平凡丛。例如切丛 $T\R^m$ 是平凡的。我们得到下面的推论。`}</Tx>
        <Stmt id="C9.1">
          <Proof steps={[
            { claim: R`$M$ 可缩：恒等映射 $h_0=\mathrm{id}_M$ 与常值映射 $h_1:p\mapsto p_0$ 同伦。`, uses: ["D4.9"] },
            { claim: R`由 \eqref{9.18}，$h_1^*E$ 的转移函数 $t^*_{ij}(p)=t_{ij}(p_0)$ 与 $p$ 无关（且 $h_1^{-1}(U_i)$ 要么是整个 $M$，要么是空集，只有含 $p_0$ 的卡参与）。取含 $p_0$ 的一张卡 $U_1$，令常值规范变换 $g_i=t_{i1}(p_0)$，由 \eqref{9.9} 得 $\tilde t^*_{ij}=t_{1i}t_{ij}t_{j1}=t_{11}=e$。所以 $h_1^*E\simeq M\times F$。`, uses: ["9.18", "9.9"], fill: true },
            { claim: R`$h_0^*E=\mathrm{id}_M^*E$ 与 $E$ 等价（\eqref{9.17} 之后的说明）。`, uses: ["9.17"] },
            { claim: R`由\sref{T9.1}，$E\simeq h_0^*E\simeq h_1^*E\simeq M\times F$。`, uses: ["T9.1"] },
          ]} />
        </Stmt>
        <Box kind="physics" title="扭曲只能来自底空间的拓扑">{R`由\sref{C9.1}，任何丛限制到一个可缩的坐标邻域上都是平凡的——这正是"局部平凡"能够成立的深层原因。物理上，$\R^3$ 上的规范场在拓扑上没有什么可分类的；只有当底空间有"洞"（去掉单极所在点的 $\R^3-\{0\}\simeq S^2$）或被紧化（$\R^4\cup\{\infty\}=S^4$）时，才会出现磁荷、瞬子数这样的整数拓扑不变量（例 9.7、9.8）。`}</Box>
      </Sub>
    </Sec>);
}
