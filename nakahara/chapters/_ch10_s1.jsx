// 引言 + §10.1 主丛上的联络 —— 式 (10.1)–(10.20)，定义 10.1–10.3，命题 10.1，定理 10.1–10.2，引理 10.1，推论 10.1，
// 例 10.1–10.2，习题 10.1–10.4，图 10.1–10.3
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, Figure, Table, C } from "@kit";

const R = String.raw;
const LG = R`\sym{lie}{\mathfrak{g}}`;     // 李代数 𝔤（避免把 g 误标为群元素）
const OM = R`\sym{forms}{\Omega}`;         // 形式空间 Ω^r（与曲率 Ω 区分）

export function Intro() {
  return (
    <Sec n="10.0" title="Introduction" zh="引言：从 Riemann 联络到纤维丛上的联络"
      gist={R`第 7 章的联络让我们比较不同切空间中的向量；本章在任意主丛上以纯几何的方式定义联络，它的局部形式就是规范势，曲率就是 Yang–Mills 场强。`}
      why={R`规范场论的全部局部结构（势、场强、规范变换、协变导数）与整体结构（单极子、瞬子、Berry 相位）都可以统一在"主丛上的联络"这一个概念下。`}
      gives={[]}>
      <Tx>{R`**本章要做什么。**第 7 章在 Riemann 流形上引入了联络，它让我们能够比较不同点的切向量。本章在一般的纤维丛上以一种抽象但几何的方式定义联络。路线是：

1. 先在**主丛**上定义联络（\secref{10.1}）。抽象定义通过**联络一形式**具体化，它的局部形式正是物理学家熟知的**规范势**。
2. 联络给出平行移动与**和乐**（\secref{10.2}），以及**曲率**（\secref{10.3}）——Yang–Mills 场强就是曲率的局部形式。
3. 主丛上的联络自然地在**相伴矢量丛**上定义协变导数（\secref{10.4}）；用到切丛上，就重现第 7 章的结果。
4. 最后把这套语言用于物理：规范场论（\secref{10.5}）与 Berry 相位（\secref{10.6}）。

原书主要参照 Choquet-Bruhat 等（1982）、Kobayashi（1984）与 Nomizu（1981）的路线；细节见 Kobayashi–Nomizu（1963, 1969）的经典著作，Daniel–Viallet（1980）有简明综述。`}</Tx>
      <Box kind="physics" title="一张对照表：数学名词 ↔ 物理名词">
        <Table head={["纤维丛", "规范场论"]} rows={[
          [R`主丛 $P(M,G)$ 的结构群 $G$`, "规范群"],
          [R`局部截面 $\sigma_i$`, "选定一个规范"],
          [R`联络一形式的拉回 $\mathcal{A}_i=\sigma_i^*\omega$`, R`规范势 $\mathcal{A}_\mu$`],
          [R`转移函数 / 截面之间的 $g$`, "规范变换"],
          [R`曲率的局部形式 $\mathcal{F}$`, R`场强 $\mathcal{F}_{\mu\nu}$`],
          ["相伴矢量丛的截面", "物质场"],
          ["相伴丛上的协变导数", R`最小耦合 $\partial_\mu+\mathcal{A}_\mu$`],
          ["和乐", "Wilson 圈、Aharonov–Bohm / Berry 相位"],
        ]} />
        <Tx>{R`本章读完，这张表的每一行都会变成一条定理或一个公式。`}</Tx>
      </Box>
    </Sec>);
}

export function Sec101() {
  return (
    <Sec n="10.1" title="Connections on principal bundles" zh="主丛上的联络"
      gist={R`联络 = 在 $T_uP$ 中选取与右作用相容的水平补空间；等价地，一个 $\sym{lie}{\mathfrak{g}}$ 值一形式 $\omega$。拉回到底流形就是规范势 $\mathcal{A}_i$，换卡时满足相容条件 \eqref{10.9}。沿曲线的水平提升解出 $\dot g=-\mathcal{A}g$，给出平行移动。`}
      why={R`我们需要一个与坐标无关、能在任意主丛上比较"不同纤维中的点"的结构；它必须在局部化后正好变成规范势与规范变换。`}
      gives={["10.1", "10.3a", "10.3b", "10.4", "10.5", "10.6", "10.7", "10.8", "10.9", "10.10a", "10.13b", "10.14", "10.17", "10.18"]}>
      <Tx>{R`主丛上的联络有好几种等价定义。我们的出发点是把切空间 $T_uP$ **分解**为"竖直"与"水平"两部分。这种做法看似抽象，但优点是几何图像清楚，而且不依赖于特定的局部平凡化。另一种定义是把联络看作满足某些公理的 $${LG}$ 值一形式；我们将证明二者等价。

**李群预备知识**（详见 §5.6）。设 $G$ 是李群。左作用 $L_g$ 与右作用 $R_g$ 定义为 $L_gh=gh$、$R_gh=hg$（$g,h\in G$）。$L_g$ 诱导切映射 $L_{g*}:T_h(G)\to T_{gh}(G)$。左不变向量场 $X$ 满足 $L_{g*}X|_h=X|_{gh}$；左不变向量场构成 $G$ 的李代数，记作 $${LG}$。由于 $X\in${LG}$ 由它在单位元 $e$ 处的值决定（反之亦然），存在向量空间同构 $${LG}\cong T_eG$。$${LG}$ 在李括号下封闭：$[T_\alpha,T_\beta]=f_{\alpha\beta}{}^\gamma T_\gamma$，其中 $\{T_\alpha\}$ 是 $${LG}$ 的生成元，$f_{\alpha\beta}{}^\gamma$ 称为**结构常数**（structure constants）。伴随作用 $\mathrm{ad}:G\to G$ 定义为 $\mathrm{ad}_gh\equiv ghg^{-1}$；它的切映射称为**伴随映射**，记作 $\mathrm{Ad}_g:T_h(G)\to T_{ghg^{-1}}(G)$。限制在 $T_e(G)\simeq${LG}$ 上，$\mathrm{Ad}_g$ 把 $${LG}$ 映到自身：$\mathrm{Ad}_g:${LG}\to${LG}$，$A\mapsto gAg^{-1}$（$A\in${LG}$）。`}</Tx>
      <Sub1011 />
      <Sub1012 />
      <Sub1013 />
      <Sub1014 />
    </Sec>);
}

function Sub1011() {
  return (
    <Sub n="10.1.1" title="Definitions" zh="定义">
      <p className="muted">本小节概念：<C id="connection" /></p>
      <Tx>{R`**竖直方向是天然的。**设 $u$ 是主丛 $P(M,G)$ 的点，$G_p$ 是 $p=\pi(u)$ 处的纤维。**竖直子空间**（vertical subspace）$V_uP$ 是 $T_uP$ 中与 $G_p$ 相切的子空间。（注意：$T_uP$ 是 $P$ 的切空间，不要与 $M$ 的切空间 $T_pM$ 混淆。）

怎样构造 $V_uP$？取 $A\in${LG}$。右作用 $R_{\exp(tA)}u=u\exp(tA)$ 定义了 $P$ 中过 $u$ 的一条曲线。因为 $\pi(u)=\pi(u\exp(tA))=p$，这条曲线整个位于纤维 $G_p$ 内。定义向量 $A^\#\in T_uP$：`}</Tx>
      <Eq n="10.1" say={R`基本向量场：沿着右作用 $u\exp(tA)$ 这条纤维内的曲线求方向导数。每个李代数元 $A$ 都在纤维的每一点上给出一个竖直方向。`}>{R`A^\#f(u)=\frac{\dd}{\dd t}f(u\exp(tA))\Big|_{t=0}`}</Eq>
      <Tx>{R`其中 $f:P\to\mathbb{R}$ 是任意光滑函数。$A^\#$ 在 $u$ 处与 $P$ 相切，而且沿纤维，所以 $A^\#\in V_uP$。在 $P$ 的每一点这样定义，就得到一个向量场 $A^\#$，称为由 $A$ 生成的**基本向量场**（fundamental vector field）。$A\mapsto A^\#$ 给出向量空间同构 $\sharp:${LG}\to V_uP$（$G$ 在纤维上的作用是自由且可迁的，所以 $\dim V_uP=\dim G$，且 $\sharp$ 是单射）。

**水平方向需要选择。****水平子空间**（horizontal subspace）$H_uP$ 是 $V_uP$ 在 $T_uP$ 中的一个补空间；只有在 $P$ 上定义了联络之后，它才被唯一确定。`}</Tx>
      <Exercise n="10.1" title={R`基本向量场的两条性质`} level="★"
        hint={R`(a) $\pi\circ R_{\exp(tA)}u=\pi(u)$ 不随 $t$ 变。(b) 固定 $u$，考虑 $\iota_u:G\to P$，$g\mapsto ug$；证明 $A^\#$ 与 $G$ 上的左不变向量场 $X_A$ 是 $\iota_u$-相关的，再用"相关向量场的括号仍相关"。`}
        solution={R`**(a)** $V_uP$ 中每个向量都是某个 $A^\#$（$\sharp$ 是同构）。对 $M$ 上任意函数 $h$，

$$(\pi_*A^\#)h=A^\#(h\circ\pi)=\frac{\dd}{\dd t}h(\pi(u\exp(tA)))\Big|_{t=0}=\frac{\dd}{\dd t}h(p)\Big|_{t=0}=0,$$

所以 $\pi_*X=0$ 对一切 $X\in V_uP$。（反过来，$\ker\pi_*$ 的维数是 $\dim P-\dim M=\dim G$，所以 $V_uP=\ker\pi_*$。）

**(b)** 设 $X_A$ 是 $G$ 上由 $A$ 生成的左不变向量场，它的流是 $g\mapsto g\exp(tA)$（第 5 章 §5.6：左不变场的积分曲线是右乘单参数子群）。固定 $u$，$\iota_u(g)=ug$。则

$$\iota_u(g\exp(tA))=ug\exp(tA)=R_{\exp(tA)}(ug),$$

即 $\iota_u$ 把 $X_A$ 的流映为 $A^\#$ 的流，所以 $\iota_{u*}X_A=A^\#$（$X_A$ 与 $A^\#$ 是 $\iota_u$-相关的）。相关向量场的李括号仍相关：$\iota_{u*}[X_A,X_B]=[A^\#,B^\#]$。而 $[X_A,X_B]=X_{[A,B]}$ 正是 $${LG}$ 中括号的定义，所以

$$[A^\#,B^\#]=\iota_{u*}X_{[A,B]}=[A,B]^\#$$

在 $\iota_u(G)$（即整根纤维）上成立；$u$ 任意，故处处成立。这说明 $\sharp$ 是李代数同态。`}>
        <Tx>{R`(a) 证明：对 $X\in V_uP$ 有 $\pi_*X=0$。(b) 证明 $\sharp$ 保持李代数结构：`}</Tx>
        <Eq n="10.2" say={R`基本向量场的括号还是基本向量场，对应的李代数元就是原来两个元素的括号：$\sharp$ 是李代数同态。`}>{R`[A^\#,B^\#]=[A,B]^\#.`}</Eq>
      </Exercise>
      <Stmt id="D10.1" />
      <Figure n="10.1" caption={R`水平子空间 $H_{ug}P$ 由 $H_uP$ 经右作用得到。`} width="42%" />
      <Tx>{R`条件 (iii) 说：同一纤维上的水平子空间 $H_uP$ 与 $H_{ug}P$ 由右作用诱导的线性映射 $R_{g*}$ 联系。因此，$u$ 处的一个子空间 $H_uP$ 就生成了整根纤维上的全部水平子空间。这个条件保证：若点 $u$ 被平行移动，它的常数倍 $ug$（$g\in G$）也同样被平行移动（见后文推论 10.1）。

读者此刻也许对这个定义感到不安：乍一看，它与规范势、场强毫无关系。引入联络一形式之后，这些问题就会清楚。我们再次强调：这个以 $T_uP=V_uP\oplus H_uP$ 为基础的定义是**纯几何**的，不依赖任何额外信息。下面联络会变得更易于计算，但几何图像与内禀性质往往随之模糊。`}</Tx>
    </Sub>);
}

function Sub1012() {
  return (
    <Sub n="10.1.2" title="The connection one-form" zh="联络一形式">
      <p className="muted">本小节概念：<C id="conn_form" /></p>
      <Tx>{R`**动机。**实际计算中需要一种系统的办法把 $T_uP$ 分成 $V_uP$ 与 $H_uP$。办法是引入一个李代数值的一形式 $\omega\in${LG}\otimes T^*P$，称为**联络一形式**（connection one-form）。它就是"竖直投影"：把切向量的竖直部分读成李代数元。`}</Tx>
      <Stmt id="D10.2">
        <Eq n="10.3a" keyEq title="联络一形式公理 (i)" say={R`联络一形式在竖直方向上就是"读数器"：把基本向量场 $A^\#$ 读回为生成它的李代数元 $A$。`}>{R`\text{(i)}\qquad\omega(A^\#)=A\qquad A\in${LG}`}</Eq>
        <Eq n="10.3b" keyEq title="联络一形式公理 (ii)" say={R`沿纤维右移一个群元 $g$，联络一形式按伴随表示变换：在 $ug$ 处读到的值是在 $u$ 处读数的共轭。`}>{R`\text{(ii)}\qquad R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega`}</Eq>
        <Tx>{R`即对 $X\in T_uP$，`}</Tx>
        <Eq n="10.3b'" say={R`公理 (ii) 的显式写法：先把向量右推到 $ug$ 再读数，等于在 $u$ 处读数后用 $g$ 共轭。`}>{R`R_g^*\omega_{ug}(X)=\omega_{ug}(R_{g*}X)=g^{-1}\omega_u(X)g.`}</Eq>
        <Tx>{R`用 $\omega$ 的核定义水平子空间：`}</Tx>
        <Eq n="10.4" keyEq title={R`水平子空间 $=\omega$ 的核`} say={R`水平方向就是联络一形式"读数为零"的方向：在这些方向上移动，不产生任何纤维内的变化。`}>{R`H_uP\equiv\{X\in T_uP\mid\omega(X)=0\}.`}</Eq>
      </Stmt>
      <Tx>{R`**为什么公理 (i) 保证了分解。**$\omega_u:T_uP\to${LG}$ 是线性满射（(i) 说它在 $V_uP$ 上就是 $\sharp^{-1}$），所以 $\ker\omega_u=H_uP$ 的维数是 $\dim P-\dim G=\dim M$，且 $H_uP\cap V_uP=0$（若 $A^\#\in H_uP$，则 $A=\omega(A^\#)=0$）。于是 $T_uP=H_uP\oplus V_uP$，任意 $X$ 分解为 $X^V=(\omega(X))^\#$、$X^H=X-X^V$——这也说明了"$\omega$ 是竖直投影"的含义。

为说明这个定义与定义 10.1 一致，还要证明下面的命题。`}</Tx>
      <Stmt id="P10.1">
        <Eq n="10.5" say={R`由联络一形式定义的水平子空间在右作用下彼此对应：右移把 $u$ 处的水平方向恰好送到 $ug$ 处的水平方向。`}>{R`R_{g*}H_uP=H_{ug}P.`}</Eq>
        <Proof steps={[
          { claim: R`固定 $u\in P$，按 \eqref{10.4} 定义 $H_uP$。取 $X\in H_uP$，构造 $R_{g*}X\in T_{ug}P$。由公理 (ii)：`, tex: R`\omega(R_{g*}X)=R_g^*\omega(X)=g^{-1}\omega(X)g=0`, why: R`因为 $\omega(X)=0$。于是 $R_{g*}X\in H_{ug}P$，即 $R_{g*}H_uP\subset H_{ug}P$。`, uses: ["10.3b"] },
          { claim: R`$R_{g*}$ 是可逆线性映射（逆为 $R_{g^{-1}*}$）。对任意 $Y\in H_{ug}P$，把上一步用于点 $ug$ 与群元 $g^{-1}$：$X\equiv R_{g^{-1}*}Y\in H_uP$，而 $Y=R_{g*}X$。这就证明了 \eqref{10.5}。`, fill: true, why: R`原书一句"$R_{g*}$ 可逆，故任意 $Y$ 都可写成 $R_{g*}X$"；这里明确指出 $X$ 也是水平的。` },
        ]} />
      </Stmt>
      <Tx>{R`我们已经证明：联络一形式的定义与联络的定义等价，因为 $\omega$ 按照定义 10.1 的公理把 $T_uP$ 分成 $H_uP\oplus V_uP$。这里定义的联络一形式 $\omega$ 在文献中称为 **Ehresmann 联络**。（反方向：给定定义 10.1 的分解，令 $\omega(X)\equiv\sharp^{-1}(X^V)$，公理 (i) 显然；公理 (ii) 来自 $R_{g*}$ 保持水平子空间，以及 $R_{g*}A^\#=(\mathrm{Ad}_{g^{-1}}A)^\#$。）`}</Tx>
    </Sub>);
}

function Sub1013() {
  return (
    <Sub n="10.1.3" title="The local connection form and gauge potential" zh="局部联络形式与规范势">
      <p className="muted">本小节概念：<C id="gauge_potential" /></p>
      <Tx>{R`**我们要做的事。**$\omega$ 生活在全空间 $P$ 上，而物理学家写下的规范势生活在时空 $M$ 上。桥梁是局部截面：设 $\{U_i\}$ 是 $M$ 的开覆盖，$\sigma_i$ 是每个 $U_i$ 上的局部截面。在 $U_i$ 上引入李代数值一形式 $\mathcal{A}_i$：`}</Tx>
      <Eq n="10.6" keyEq title="规范势 = 联络一形式的拉回" say={R`规范势就是把整体的联络一形式用一个局部截面"拉回"到底流形上——选定截面相当于选定规范。`}>{R`\mathcal{A}_i\equiv\sigma_i^*\omega\in${LG}\otimes${OM}^1(U_i).`}</Eq>
      <Tx>{R`反过来，给定 $U_i$ 上的李代数值一形式 $\mathcal{A}_i$，可以重建一个联络一形式 $\omega$，使它被 $\sigma_i^*$ 拉回后正是 $\mathcal{A}_i$。`}</Tx>
      <Stmt id="T10.1">
        <Tx>{R`**证明的思路。**在 $\pi^{-1}(U_i)$ 上定义 $${LG}$ 值一形式`}</Tx>
        <Eq n="10.7" say={R`由规范势重建联络一形式：第一项把底流形上的势搬到丛上并按纤维位置共轭，第二项是 Maurer–Cartan 形式，负责在竖直方向上读出李代数元。`}>{R`\omega_i\equiv g_i^{-1}\pi^*\mathcal{A}_ig_i+g_i^{-1}\dd_Pg_i`}</Eq>
        <Tx>{R`其中 $\dd_P$ 是 $P$ 上的外微分，$g_i$ 是由 $\phi_i^{-1}(u)=(p,g_i)$（$u=\sigma_i(p)g_i$）定义的**典范局部平凡化**（canonical local trivialization），见 \figref{10.2}。`}</Tx>
        <Figure n="10.2" caption={R`由 $U_i$ 上的局部截面 $\sigma_i$ 定义的典范局部平凡化。`} width="55%" />
        <Proof steps={[
          { claim: R`**$\sigma_i^*\omega_i=\mathcal{A}_i$。**对 $X\in T_pM$：`, tex: R`\sigma_i^*\omega_i(X)=\omega_i(\sigma_{i*}X)=\pi^*\mathcal{A}_i(\sigma_{i*}X)+\dd_Pg_i(\sigma_{i*}X)=\mathcal{A}_i(\pi_*\sigma_{i*}X)+\dd_Pg_i(\sigma_{i*}X)`, why: R`$\sigma_{i*}X\in T_{\sigma_i}P$，而在截面上 $g_i=e$，所以第一项的共轭消失。` },
          { claim: R`又 $\pi_*\sigma_{i*}=\mathrm{id}_{T_p(M)}$（因 $\pi\circ\sigma_i=\mathrm{id}$），且沿 $\sigma_{i*}X$ 有 $g\equiv e$，故 $\dd_Pg_i(\sigma_{i*}X)=0$。于是 $\sigma_i^*\omega_i(X)=\mathcal{A}_i(X)$。` },
          { claim: R`**公理 (i)。**设 $X=A^\#\in V_uP$，$A\in${LG}$。由习题 10.1(a)，$\pi_*X=0$，所以 $\pi^*\mathcal{A}_i(A^\#)=\mathcal{A}_i(\pi_*A^\#)=0$，只剩第二项：`, tex: R`\omega_i(A^\#)=g_i^{-1}\dd_Pg_i(A^\#)=g_i(u)^{-1}\frac{\dd g_i(u\exp(tA))}{\dd t}\Big|_{t=0}=g_i(u)^{-1}g_i(u)\frac{\dd\exp(tA)}{\dd t}\Big|_{t=0}=A.`, why: R`典范平凡化右等变：$u\exp(tA)=\sigma_i(p)g_i(u)\exp(tA)$，故 $g_i(u\exp(tA))=g_i(u)\exp(tA)$。`, fill: true, uses: ["10.2"] },
          { claim: R`**公理 (ii)。**取 $X\in T_uP$、$h\in G$：`, tex: R`R_h^*\omega_i(X)=\omega_i(R_{h*}X)=g_{iuh}^{-1}\mathcal{A}_i(\pi_*R_{h*}X)g_{iuh}+g_{iuh}^{-1}\dd_Pg_{iuh}(R_{h*}X).` },
          { claim: R`由 $g_{iuh}=g_{iu}h$ 与 $\pi_*R_{h*}X=\pi_*X$（因 $\pi R_h=\pi$），并设 $\gamma(t)$ 是过 $u=\gamma(0)$、切向量为 $X$ 的曲线：`, tex: R`g_{iuh}^{-1}\dd_Pg_{iuh}(R_{h*}X)=g_{iuh}^{-1}\frac{\dd}{\dd t}g_{i\gamma(t)h}\Big|_{t=0}=h^{-1}g_{iu}^{-1}\frac{\dd}{\dd t}g_{i\gamma(t)}\Big|_{t=0}h=h^{-1}g_{iu}^{-1}\dd_Pg_{iu}(X)h.` },
          { claim: R`合起来：`, tex: R`R_h^*\omega_i(X)=h^{-1}g_{iu}^{-1}\mathcal{A}_i(\pi_*X)g_{iu}h+h^{-1}g_{iu}^{-1}\dd_Pg_{iu}(X)h=h^{-1}\omega_i(X)h.`, why: R`所以 \eqref{10.7} 定义的 $\omega_i$ 满足 $\mathcal{A}_i=\sigma_i^*\omega_i$ 及联络一形式的两条公理。` },
        ]} />
      </Stmt>
      <Tx>{R`**整体性的要求。**要使 $\omega$ 在 $P$ 上**唯一**地定义（即分解 $T_uP=H_uP\oplus V_uP$ 唯一），必须在 $U_i\cap U_j$ 上有 $\omega_i=\omega_j$；这样就可以用 $\omega|_{U_i}=\omega_i$ 在整个 $P$ 上定义唯一的 $\omega$。为此，局部形式 $\mathcal{A}_i$ 必须满足一种特别的变换性质——与 Christoffel 记号的变换律相似。先证一个技术性引理。`}</Tx>
      <Stmt id="L10.1">
        <Eq n="10.8" say={R`在两个截面重叠处，$\sigma_j$ 的推前等于 $\sigma_i$ 的推前右移 $t_{ij}$，再加上一个沿纤维、由 $t_{ij}^{-1}\dd t_{ij}$ 生成的竖直向量。`}>{R`\sigma_{j*}X=R_{t_{ij}*}(\sigma_{i*}X)+(t_{ij}^{-1}\dd t_{ij}(X))^\#`}</Eq>
        <Proof steps={[
          { claim: R`取曲线 $\gamma:[0,1]\to M$，$\gamma(0)=p$，$\dot\gamma(0)=X$。由转移函数，$\sigma_j(p)=\sigma_i(p)t_{ij}(p)$（\eqref{9.43}）。记 $\sigma_i(t)\equiv\sigma_i(\gamma(t))$，并设 $G$ 是矩阵群（此时 $R_{g*}X=Xg$）：`, tex: R`\begin{aligned}\sigma_{j*}X&=\frac{\dd}{\dd t}\sigma_j(\gamma(t))\Big|_{t=0}=\frac{\dd}{\dd t}\{\sigma_i(t)t_{ij}(t)\}\Big|_{t=0}=\frac{\dd}{\dd t}\sigma_i(t)\cdot t_{ij}(p)+\sigma_i(p)\cdot\frac{\dd}{\dd t}t_{ij}(t)\Big|_{t=0}\\&=R_{t_{ij}*}(\sigma_{i*}X)+\sigma_j(p)t_{ij}(p)^{-1}\frac{\dd}{\dd t}t_{ij}(t)\Big|_{t=0}\end{aligned}` },
          { claim: R`第二项中的李代数元：`, tex: R`t_{ij}(p)^{-1}\dd t_{ij}(X)=t_{ij}(p)^{-1}\frac{\dd}{\dd t}t_{ij}(t)\Big|_{t=0}=\frac{\dd}{\dd t}[t_{ij}(p)^{-1}t_{ij}(t)]\Big|_{t=0}\in T_e(G)\cong${LG}.`, why: R`$t=0$ 时 $t_{ij}(p)^{-1}t_{ij}(\gamma(t))=e$，所以这是过单位元的曲线的切向量。` },
          { claim: R`于是第二项是 $\sigma_j(p)$ 处由 $t_{ij}^{-1}\dd t_{ij}(X)$ 生成的基本向量 $(t_{ij}^{-1}\dd t_{ij}(X))^\#$：曲线 $s\mapsto\sigma_j(p)\exp(sB)$（$B=t_{ij}^{-1}\dd t_{ij}(X)$）在 $s=0$ 的切向量恰为 $\sigma_j(p)B$。`, uses: ["10.1"] },
        ]} />
      </Stmt>
      <Tx>{R`**相容条件。**把联络一形式 $\omega$ 作用在 \eqref{10.8} 上，立刻得到

$$\sigma_j^*\omega(X)=R_{t_{ij}}^*\omega(\sigma_{i*}X)+t_{ij}^{-1}\dd t_{ij}(X)=t_{ij}^{-1}\omega(\sigma_{i*}X)t_{ij}+t_{ij}^{-1}\dd t_{ij}(X),$$

这里用了定义 10.2 的两条公理（第二项用 (i)，第一项用 (ii)）。这对任意 $X\in T_pM$ 成立，所以`}</Tx>
      <Eq n="10.9" keyEq title="相容条件（规范势的变换律）" say={R`在两块坐标卡的重叠处，两个规范势相差一个"转动"（伴随作用）加一个"平移"（$t^{-1}\dd t$）——这就是规范变换；它保证两块卡上的势拼成同一个整体联络。`}>{R`\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}.`}</Eq>
      <Tx>{R`这就是我们要找的**相容条件**（compatibility condition）。反过来，给定开覆盖 $\{U_i\}$、局部截面 $\{\sigma_i\}$ 以及满足 \eqref{10.9} 的局部形式 $\{\mathcal{A}_i\}$，就能构造出 $P$ 上的 $${LG}$ 值一形式 $\omega$（每块上用 \eqref{10.7}，\eqref{10.9} 保证在重叠处 $\omega_i=\omega_j$）。

**物理解读。**非平凡主丛不容许整体截面（\sref{T9.2}），所以拉回 $\mathcal{A}_i=\sigma_i^*\omega$ 只在局部存在，未必在整体上存在。在规范理论中，$\mathcal{A}_i$ 被认同为**规范势**（gauge potential，Yang–Mills 势）。如同在磁单极子的情形所见，单极子场 $\boldsymbol B=g\boldsymbol r/r^3$ 不容许单一的规范势，描述 $S^2$ 上的这个 U(1) 丛至少需要两个 $\mathcal{A}_i$（\secref{10.5.2}）。`}</Tx>
      <Exercise n="10.2" title="同一坐标卡上换截面 = 规范变换" level="★"
        hint={R`把引理 10.1 的证明中的 $t_{ij}$ 换成 $g$，对 $\sigma_2(\gamma(t))=\sigma_1(\gamma(t))g(\gamma(t))$ 求导，再作用 $\omega$。`}
        solution={R`取曲线 $\gamma$，$\gamma(0)=p$，$\dot\gamma(0)=X$。与引理 10.1 完全相同的计算给出

$$\sigma_{2*}X=R_{g*}(\sigma_{1*}X)+(g^{-1}\dd g(X))^\#.$$

作用 $\omega$，第一项用公理 (ii)，第二项用公理 (i)：

$$\mathcal{A}_2(X)=\omega(\sigma_{2*}X)=g^{-1}\omega(\sigma_{1*}X)g+g^{-1}\dd g(X)=g^{-1}\mathcal{A}_1(X)g+g^{-1}\dd g(X).$$

$X$ 任意，得 \eqref{10.10a}。取 $X=\partial/\partial x^\mu$，$\mathcal{A}_k(\partial_\mu)=\mathcal{A}_{k\mu}$、$\dd g(\partial_\mu)=\partial_\mu g$，得 \eqref{10.10b}。

**另一种看法：**$\sigma_1$ 与 $\sigma_2$ 都定义在同一个 $U$ 上，可以把 $U$ "复制"成两块重叠的卡，$g$ 扮演转移函数 $t_{12}$ 的角色，\eqref{10.10a} 就是 \eqref{10.9} 的特例。物理上：换截面 = 换规范，$g(p)$ 是逐点的规范变换。`}>
        <Tx>{R`设 $P(M,G)$ 是 $M$ 上的主丛，$U$ 是 $M$ 的坐标卡。在 $U$ 上取局部截面 $\sigma_1$、$\sigma_2$，使 $\sigma_2(p)=\sigma_1(p)g(p)$。证明相应的局部形式 $\mathcal{A}_1$、$\mathcal{A}_2$ 满足`}</Tx>
        <Eq n="10.10a" keyEq title="规范变换" say={R`同一块坐标卡上换一个截面（换规范），规范势被群元 $g(p)$ 共轭，再加上纯规范项 $g^{-1}\dd g$。`}>{R`\mathcal{A}_2=g^{-1}\mathcal{A}_1g+g^{-1}\dd g.`}</Eq>
        <Tx>{R`写成分量，`}</Tx>
        <Eq n="10.10b" say={R`规范变换的分量形式：正是第 1 章 §1.8 中定义的非阿贝尔规范变换。`}>{R`\mathcal{A}_{2\mu}=g^{-1}(p)\mathcal{A}_{1\mu}(p)g(p)+g^{-1}(p)\partial_\mu g(p)`}</Eq>
        <Tx>{R`这正是 §1.8 中定义的**规范变换**（gauge transformation）。`}</Tx>
      </Exercise>
      <Box kind="example" n="10.1" title="U(1) 丛：熟悉的电磁规范变换">
        <Tx>{R`设 $P$ 是 $M$ 上的 U(1) 丛，取相交的坐标卡 $U_i$、$U_j$，$\mathcal{A}_i$（$\mathcal{A}_j$）是 $U_i$（$U_j$）上的局部联络形式。转移函数 $t_{ij}:U_i\cap U_j\to\mathrm{U}(1)$ 为`}</Tx>
        <Eq n="10.11" say={R`U(1) 的转移函数就是一个逐点的相位因子，由实函数 $\Lambda$ 给出。`}>{R`t_{ij}(p)=\exp[\mathrm{i}\Lambda(p)]\qquad\Lambda(p)\in\mathbb{R}.`}</Eq>
        <Tx>{R`$\mathcal{A}_i$ 与 $\mathcal{A}_j$ 的关系为`}</Tx>
        <Eq n="10.12a" say={R`U(1) 是阿贝尔群，共轭项不起作用，规范变换只剩下加上一个全微分 $\mathrm{i}\dd\Lambda$。`}>{R`\mathcal{A}_j(p)=t_{ij}(p)^{-1}\mathcal{A}_i(p)t_{ij}(p)+t_{ij}(p)^{-1}\dd t_{ij}(p)=\mathcal{A}_i(p)+\mathrm{i}\dd\Lambda(p).`}</Eq>
        <Tx>{R`写成分量，就是熟悉的表达式`}</Tx>
        <Eq n="10.12b" say={R`电磁学教科书里的规范变换：矢势加上一个标量函数的梯度（这里带着李代数因子 $\mathrm{i}$）。`}>{R`\mathcal{A}_{j\mu}=\mathcal{A}_{i\mu}+\mathrm{i}\partial_\mu\Lambda.`}</Eq>
        <Tx>{R`我们的联络 $\mathcal{A}_\mu$ 与通常的矢势 $A_\mu$ 相差一个李代数因子：$\mathcal{A}_\mu=\mathrm{i}A_\mu$（$\sym{lie}{\mathfrak{u}}(1)=\mathrm{i}\mathbb{R}$）。于是 \eqref{10.12b} 就是 $A_{j\mu}=A_{i\mu}+\partial_\mu\Lambda$。`}</Tx>
      </Box>
      <Box kind="physics" title="整体信息在哪里？">{R`再次强调：$\omega$ 在整个丛 $P(M,G)$ 上整体定义。$P(M,G)$ 上有许多联络一形式，但它们共享关于丛的同样的整体信息。相反，单个局部片段（规范势）$\mathcal{A}_i$ 只与**平凡**的局部丛 $\pi^{-1}(U_i)$ 相联系，不可能携带 $P$ 的任何整体信息。携带丛的整体信息的，是 $\omega$——或者等价地，满足相容条件 \eqref{10.9} 的**全体** $\{\mathcal{A}_i\}$。交互图 2 中，单极子的两块势各自都是"平凡"的，转移函数的卷绕数才记录了丛的扭曲。`}</Box>
    </Sub>);
}

function Sub1014() {
  return (
    <Sub n="10.1.4" title="Horizontal lift and parallel transport" zh="水平提升与平行移动">
      <p className="muted">本小节概念：<C id="horizontal_lift" /></p>
      <Tx>{R`第 7 章把向量的平行移动定义为"不变地"搬运。主丛中的点沿 $M$ 中曲线的平行移动，由曲线的"水平提升"给出。`}</Tx>
      <Stmt id="D10.3" />
      <Tx>{R`设 $\tilde X$ 是 $\tilde\gamma$ 的切向量，按定义它满足 $\omega(\tilde X)=0$。这个条件是一个常微分方程（ODE），ODE 基本定理保证水平提升的局部存在与唯一。`}</Tx>
      <Stmt id="T10.2">
        <Tx>{R`**构造。**设坐标卡 $U_i$ 包含 $\gamma$，在 $U_i$ 上取截面 $\sigma_i$。若水平提升 $\tilde\gamma$ 存在，可以写成 $\tilde\gamma(t)=\sigma_i(\gamma(t))g_i(t)$，其中 $g_i(t)$ 表示 $g_i(\gamma(t))\in G$。不失一般性，可取截面使 $\sigma_i(\gamma(0))=\tilde\gamma(0)$，即 $g_i(0)=e$。设 $X$ 是 $\gamma(t)$ 在 $\gamma(0)$ 处的切向量，则 $\tilde X=\tilde\gamma_*X$ 在 $u_0=\tilde\gamma(0)$ 处与 $\tilde\gamma$ 相切。由于 $\tilde X$ 水平，$\omega(\tilde X)=0$。对 $\tilde\gamma=\sigma_ig_i$ 重复引理 10.1 的求导（把 $t_{ij}$ 换成随 $t$ 变化的 $g_i$）得

$$\tilde X=g_i(t)^{-1}\sigma_{i*}X\,g_i(t)+[g_i(t)^{-1}\dd g_i(X)]^\#,$$

其中第一项是 $R_{g_i(t)*}\sigma_{i*}X$ 在矩阵群中的写法。作用 $\omega$：

$$0=\omega(\tilde X)=g_i(t)^{-1}\omega(\sigma_{i*}X)g_i(t)+g_i(t)^{-1}\frac{\dd g_i(t)}{\dd t}.$$

左乘 $g_i(t)$：`}</Tx>
        <Eq n="10.13a" say={R`水平条件化成群元的一阶线性微分方程：群元的变化率等于负的"联络读数"乘以群元本身。`}>{R`\frac{\dd g_i(t)}{\dd t}=-\omega(\sigma_{i*}X)g_i(t).`}</Eq>
        <Tx>{R`ODE 基本定理保证 \eqref{10.13a} 的解存在且唯一。由于 $\omega(\sigma_{i*}X)=\sigma_i^*\omega(X)=\mathcal{A}_i(X)$，\eqref{10.13a} 的局部形式为`}</Tx>
        <Eq n="10.13b" keyEq title="水平提升方程" say={R`平行移动的局部方程：沿曲线走，群元按规范势在切方向上的分量"转动"；这就是物理中 Wilson 线满足的方程。`}>{R`\frac{\dd g_i(t)}{\dd t}=-\mathcal{A}_i(X)g_i(t)`}</Eq>
        <Tx>{R`满足 $g_i(0)=e$ 的形式解为`}</Tx>
        <Eq n="10.14" keyEq title="路径排序指数" say={R`水平提升的显式解：沿路径把规范势积起来再取指数——但必须按路径顺序排好各点的矩阵，晚到的因子放在左边。`}>{R`g_i(\gamma(t))=\mathcal{P}\exp\Big(-\int_0^t\mathcal{A}_{i\mu}\frac{\dd x^\mu}{\dd t}\dd t\Big)=\mathcal{P}\exp\Big(-\int_{\gamma(0)}^{\gamma(t)}\mathcal{A}_{i\mu}(\gamma(t))\dd x^\mu\Big)`}</Eq>
        <Tx>{R`其中 $\mathcal{P}$ 是沿 $\gamma(t)$ 的**路径排序算符**（path-ordering operator）。水平提升表示为 $\tilde\gamma(t)=\sigma_i(\gamma(t))g_i(\gamma(t))$。`}</Tx>
        <Box kind="note" title="原书脚注：路径排序">{R`$\mathcal{A}_{i\mu}(\gamma(t))$ 与 $\mathcal{A}_{i\nu}(\gamma(s))$ 一般不对易，\eqref{10.14} 中的指数照字面看没有良好定义。设 $A(t)$、$B(t)$ 是依赖于 $t$ 的矩阵，$\mathcal{P}$ 的作用是

$$\mathcal{P}[A(t)B(s)]=\begin{cases}A(t)B(s)&(t>s)\\B(s)A(t)&(s>t).\end{cases}$$

推广到更多矩阵的乘积是显然的。等价地，$g_i(t)=\lim_{N\to\infty}\big(1-\mathcal{A}_i(X_N)\Delta t\big)\cdots\big(1-\mathcal{A}_i(X_1)\Delta t\big)$：把路径切成小段，每段乘上一个"无穷小平行移动"，后到的放在左边——交互图 3 的方圈和乐就是这样数值计算的。`}</Box>
        <Derivation title="补全：解在整个 [0,1] 上存在，且跨越多块坐标卡" collapsed steps={[
          { tex: R`\dot g=-\mathcal{A}(t)g,\quad\mathcal{A}(t)\equiv\mathcal{A}_{i\mu}(\gamma(t))\dot x^\mu(t)`, why: R`这是系数连续的**线性** ODE（把 $g$ 看作矩阵），其解在整个 $[0,1]$ 上存在，不会在有限时间爆破。` },
          { tex: R`\frac{\dd}{\dd t}\big(g^{-1}\big)=-g^{-1}\dot gg^{-1}=g^{-1}\mathcal{A}(t)`, why: R`$g$ 保持可逆。若 $\mathcal{A}(t)\in${LG}$（例如反 Hermite、无迹），则 $g(t)$ 保持在 $G$ 中（例如 $\frac{\dd}{\dd t}(g^\dagger g)=g^\dagger(-\mathcal{A}^\dagger-\mathcal{A})g=0$ 保持酉性）。` },
          { tex: R`[0,1]=[t_0,t_1]\cup\cdots\cup[t_{N-1},t_N],\quad\gamma([t_{k-1},t_k])\subset U_{i_k}`, why: R`曲线跨越多块卡时，由 $[0,1]$ 的紧致性（Lebesgue 数引理）分成有限段，每段在一块卡内求解，以上一段的终点为下一段的初值；唯一性保证拼接结果与分段方式无关。` },
        ]} result={R`因此定理 10.2 对任意分段光滑曲线成立。`} />
      </Stmt>
      <Stmt id="C10.1">
        <Proof steps={[
          { claim: R`先注意水平子空间右不变：$R_{g*}H_uP=H_{ug}P$。设 $\tilde\gamma$ 是 $\gamma$ 的水平提升，则 $\tilde\gamma_g:t\mapsto\tilde\gamma(t)g$ 也是 $\gamma(t)$ 的水平提升，因为它的切向量 $R_{g*}\dot{\tilde\gamma}$ 属于 $H_{\tilde\gamma g}P$（且 $\pi\circ\tilde\gamma_g=\gamma$）。`, uses: ["P10.1"] },
          { claim: R`由定理 10.2，从 $\tilde\gamma(0)g$ 出发的水平提升唯一，所以 $\tilde\gamma'=\tilde\gamma_g$。`, uses: ["T10.2"] },
        ]} />
      </Stmt>
      <Box kind="warning" title={R`勘误：推论 10.1 中的初始条件（p.402）`}>{R`原书印作 "$\tilde\gamma'(0)=\gamma(0)g$"。$\gamma(0)$ 是底流形 $M$ 的点，右作用 $\cdot g$ 只对 $P$ 的点有意义；从证明（"从 $\tilde\gamma(0)g$ 出发的唯一水平提升"）可知应为 $\tilde\gamma'(0)=\tilde\gamma(0)g$。正文已改正。`}</Box>
      <Box kind="example" n="10.2" title={R`平凡 $\mathbb{R}$ 丛上的螺旋线`}>
        <Tx>{R`考虑丛 $P(M,\mathbb{R})\cong M\times\mathbb{R}$，$M=\mathbb{R}^2-\{0\}$。设 $\phi:((x,y),f)\mapsto u\in P$ 是局部平凡化，$(x,y)$ 是 $M$ 的坐标，$f$ 是加法群 $\mathbb{R}$ 的坐标。令

$$\omega=\frac{y\,\dd x-x\,\dd y}{x^2+y^2}+\dd f$$

为联络一形式。容易验证 $\omega$ 满足联络一形式的公理：对 $A^\#=A\,\partial/\partial f$（$A\in\mathbb{R}$ 是加法群李代数的元素），$\omega(A^\#)=A$；又因为 $\mathbb{R}$ 是阿贝尔群且 $\omega$ 不依赖 $f$，$R_g^*\omega=\omega=g^{-1}\omega g$。（注意第一项就是 $-\dd\theta$。）

设 $\gamma:[0,1]\to M$ 为曲线 $t\mapsto(\cos2\pi t,\sin2\pi t)$。求从 $((1,0),0)$ 出发的水平提升。令

$$X=\frac{\dd}{\dd t}\equiv\frac{\dd x}{\dd t}\frac{\partial}{\partial x}+\frac{\dd y}{\dd t}\frac{\partial}{\partial y}+\frac{\dd f}{\dd t}\frac{\partial}{\partial f}$$

与 $\tilde\gamma(t)$ 相切。$X$ 水平要求

$$0=\omega(X)=\frac{\dd x}{\dd t}\frac{y}{r^2}-\frac{\dd y}{\dd t}\frac{x}{r^2}+\frac{\dd f}{\dd t}=-2\pi+\frac{\dd f}{\dd t}.$$

（代入 $\dot x=-2\pi\sin2\pi t$、$\dot y=2\pi\cos2\pi t$、$r=1$：$\dot xy-\dot yx=-2\pi(\sin^2+\cos^2)=-2\pi$。）解为 $f=2\pi t+$常数。于是过 $((1,0),0)$ 的水平提升为`}</Tx>
        <Eq n="10.15" say={R`单位圆的水平提升是一条螺旋线：绕原点一圈，纤维坐标升高 $2\pi$——回不到起点。`}>{R`\tilde\gamma(t)=((\cos2\pi t,\sin2\pi t),2\pi t)`}</Eq>
        <Tx>{R`这是单位圆上方的一条**螺旋线**。在群作用下（左右作用在阿贝尔群上没有区别），$f$ 平移为 $f+g$，$g\in\mathbb{R}$。平移后的水平提升为`}</Tx>
        <Eq n="10.16" say={R`把起点沿纤维平移 $g$，整条水平提升也跟着平移 $g$：这正是推论 10.1。`}>{R`\tilde\gamma_g(t)=((\cos2\pi t,\sin2\pi t),2\pi t+g).`}</Eq>
        <Tx>{R`**值得注意：**这个丛是**平凡**的（$P\cong M\times\mathbb{R}$），联络也是**平坦**的（$\dd\omega=0$，下一节会看到曲率为零），但沿不可缩闭路的水平提升仍然闭不上。这与 Aharonov–Bohm 效应（\secref{10.5.3}）在数学上是同一件事。`}</Tx>
      </Box>
      <Figure n="10.3" caption={R`$M$ 中的曲线 $\gamma(t)$ 及其水平提升 $\tilde\gamma(t)$ 与 $\tilde\gamma(t)g$。`} width="50%" />
      <Tx>{R`**平行移动。**设 $\gamma:[0,1]\to M$ 是曲线，取 $u_0\in\pi^{-1}(\gamma(0))$。过 $u_0$ 有 $\gamma(t)$ 的唯一水平提升 $\tilde\gamma(t)$，因此有唯一点 $u_1=\tilde\gamma(1)\in\pi^{-1}(\gamma(1))$（\figref{10.3}）。点 $u_1$ 称为 $u_0$ 沿曲线 $\gamma$ 的**平行移动**（parallel transport）。这定义了映射 $\Gamma(\tilde\gamma):\pi^{-1}(\gamma(0))\to\pi^{-1}(\gamma(1))$，$u_0\mapsto u_1$。若用局部形式 \eqref{10.14}，`}</Tx>
      <Eq n="10.17" say={R`平行移动的终点：从截面上的点出发，乘上沿整条路径的路径排序指数（Wilson 线）。`}>{R`u_1=\sigma_i(1)\mathcal{P}\exp\Big(-\int_0^1\mathcal{A}_{i\mu}\frac{\dd x^\mu(\gamma(t))}{\dd t}\dd t\Big).`}</Eq>
      <Tx>{R`推论 10.1 保证 $\Gamma(\tilde\gamma)$ 与右作用 $R_g$ 对易。先注意 $R_g\Gamma(\tilde\gamma)(u_0)=u_1g$，而 $\Gamma(\tilde\gamma)R_g(u_0)=\Gamma(\tilde\gamma)(u_0g)$。$\tilde\gamma(t)g$ 是过 $u_0g$ 与 $u_1g$ 的水平提升；由过 $u_0g$ 的水平提升的唯一性，$u_1g=\Gamma(\tilde\gamma)(u_0g)$，即 $R_g\Gamma(\tilde\gamma)(u_0)=\Gamma(\tilde\gamma)R_g(u_0)$。这对任意 $u_0\in\pi^{-1}(\gamma(0))$ 成立，所以`}</Tx>
      <Eq n="10.18" say={R`平行移动与右作用对易：先右移再平行移动，与先平行移动再右移，结果相同。`}>{R`R_g\Gamma(\tilde\gamma)=\Gamma(\tilde\gamma)R_g.`}</Eq>
      <Exercise n="10.3" title="平行移动的逆与复合" level="★"
        hint={R`两问都用水平提升的唯一性（定理 10.2）。$\tilde\gamma^{-1}$ 的切向量是 $-\dot{\tilde\gamma}$，仍水平。对 $\alpha*\beta$：重新参数化不改变"切向量水平"这一性质。`}
        solution={R`**(10.19)** 设 $u_0\in\pi^{-1}(\gamma(0))$，$u_1=\Gamma(\tilde\gamma)(u_0)=\tilde\gamma(1)$。曲线 $\tilde\gamma^{-1}(t)=\tilde\gamma(1-t)$ 满足 $\pi\circ\tilde\gamma^{-1}=\gamma^{-1}$，切向量 $-\dot{\tilde\gamma}(1-t)$ 属于水平子空间（水平子空间是线性子空间），所以它是 $\gamma^{-1}$ 从 $u_1$ 出发的水平提升，终点 $\tilde\gamma^{-1}(1)=u_0$。即 $\Gamma(\tilde\gamma^{-1})(u_1)=u_0$。$\Gamma(\tilde\gamma)$ 是纤维之间的双射（由推论 10.1，它与右作用对易，且右作用在纤维上可迁），对每个 $u_1$ 都如此，故 $\Gamma(\tilde\gamma^{-1})=\Gamma(\tilde\gamma)^{-1}$。

**(10.20)** 设 $u_0\in\pi^{-1}(\alpha(0))$，$\tilde\alpha$ 是从 $u_0$ 出发的水平提升，$u'=\tilde\alpha(1)$；$\tilde\beta$ 是 $\beta$ 从 $u'$ 出发的水平提升。定义 $c(t)=\tilde\alpha(2t)$（$0\le t\le\frac12$）、$c(t)=\tilde\beta(2t-1)$（$\frac12\le t\le1$）。$c$ 连续（$\tilde\alpha(1)=\tilde\beta(0)=u'$），分段光滑，每段的切向量都是水平向量的正数倍，所以水平；且 $\pi\circ c=\alpha*\beta$。由唯一性，$c=\widetilde{\alpha*\beta}$，故

$$\Gamma(\widetilde{\alpha*\beta})(u_0)=c(1)=\tilde\beta(1)=\Gamma(\tilde\beta)(u')=\Gamma(\tilde\beta)\circ\Gamma(\tilde\alpha)(u_0).$$

**注意复合的顺序**：先走的 $\alpha$ 在右边——与 \eqref{10.14} 中"晚到者在左"的路径排序一致。`}>
        <Tx>{R`设 $\tilde\gamma$ 是 $\gamma:[0,1]\to M$ 的水平提升。考虑映射 $\Gamma(\tilde\gamma^{-1}):\pi^{-1}(\gamma(1))\to\pi^{-1}(\gamma(0))$，其中 $\tilde\gamma^{-1}(t)=\tilde\gamma(1-t)$。证明`}</Tx>
        <Eq n="10.19" say={R`沿原路倒着走回去，平行移动正好被撤销。`}>{R`\Gamma(\tilde\gamma^{-1})=\Gamma(\tilde\gamma)^{-1}.`}</Eq>
        <Tx>{R`考虑两条曲线 $\alpha,\beta:[0,1]\to M$，$\alpha(1)=\beta(0)$。定义乘积

$$\alpha*\beta=\begin{cases}\alpha(2t)&0\le t\le\frac12\\\beta(2t-1)&\frac12\le t\le1.\end{cases}$$

设 $\Gamma(\tilde\alpha):\pi^{-1}(\alpha(0))\to\pi^{-1}(\alpha(1))$，$\Gamma(\tilde\beta):\pi^{-1}(\beta(0))\to\pi^{-1}(\beta(1))$。证明`}</Tx>
        <Eq n="10.20" say={R`先走 $\alpha$ 再走 $\beta$ 的平行移动，等于两段平行移动的复合；后走的那段写在左边。`}>{R`\Gamma(\widetilde{\alpha*\beta})=\Gamma(\tilde\beta)\circ\Gamma(\tilde\alpha).`}</Eq>
      </Exercise>
      <Exercise n="10.4" title="水平相连是等价关系" level="★"
        hint={R`"在同一条水平提升上"理解为：存在一条（分段光滑的）水平曲线连接 $u$ 与 $v$。三条公理分别用常值曲线、习题 10.3 的 \eqref{10.19}、\eqref{10.20}。`}
        solution={R`把 $u\sim v$ 理解为：存在 $M$ 中的曲线 $\gamma$ 及其水平提升 $\tilde\gamma$，使 $\tilde\gamma(0)=u$、$\tilde\gamma(1)=v$（即 $v=\Gamma(\tilde\gamma)(u)$）。

**自反性：**常值曲线 $c(t)=\pi(u)$ 的水平提升是常值曲线 $\tilde c(t)=u$（切向量为零，零向量水平），故 $u\sim u$。

**对称性：**若 $v=\Gamma(\tilde\gamma)(u)$，则由 \eqref{10.19}，$u=\Gamma(\tilde\gamma^{-1})(v)$，故 $v\sim u$。

**传递性：**若 $v=\Gamma(\tilde\alpha)(u)$、$w=\Gamma(\tilde\beta)(v)$（$\alpha(1)=\beta(0)=\pi(v)$），则由 \eqref{10.20}，$w=\Gamma(\widetilde{\alpha*\beta})(u)$，故 $u\sim w$。

等价类称为**和乐丛**（holonomy bundle）：过 $u$ 的等价类是 $P$ 的一个子丛，结构群就是下一节的和乐群 $\Phi_u$。`}>
        <Tx>{R`若 $u,v\in P$ 位于同一条水平提升上，记作 $u\sim v$。证明 $\sim$ 是等价关系。`}</Tx>
      </Exercise>
    </Sub>);
}
