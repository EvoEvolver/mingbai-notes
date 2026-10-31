// §13.4 Wess–Zumino 一致性条件 —— 式 (13.58)–(13.83)，习题 13.1，图 13.1，命题 13.1；交互图 2（DescentLab）
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Exercise, Stmt, Proof, C } from "@kit";
import { DescentLab } from "./_ch13_demos.jsx";
import { TR, STR, CH, GA, FA, FG } from "./_ch13_tex.js";

const R = String.raw;
const BA = R`\boldsymbol{A}`, BF = R`\boldsymbol{F}`;
const S = R`\mathcal{S}`;

export function Sec134() {
  return (
    <Sec n="13.4" title="The Wess–Zumino consistency conditions" zh="Wess–Zumino 一致性条件"
      gist={R`引入 BRS 算子 $\mathcal{S}$（规范变换参数空间上的外微分）与 FP 鬼场 $\omega=g^{-1}\mathcal{S}g$：$\mathcal{S}\boldsymbol A=-\mathcal{D}_{\boldsymbol A}\omega$，$\mathcal{S}\omega=-\omega^2$（\eqref{13.63a}–\eqref{13.63b}）→ 几何图像：$\mathfrak{A}\to\mathfrak{A}/\mathfrak{G}$ 是纤维丛，$\mathcal{S}$ 是沿纤维的变分（图 13.1）→ $\mathcal{S}^2=0$ 给出 WZ 条件 $\mathcal{S}G=0$（\eqref{13.73}）→ $\mathbb{A}=\boldsymbol A+\omega$ 的曲率 $\mathbb F=\boldsymbol F$，于是 $\Delta Q(\mathbb A,\mathbb F)=\dd Q(\boldsymbol A,\boldsymbol F)$，按鬼场阶数展开得下降方程 \eqref{13.80a}–\eqref{13.80d} → $G=\int Q^1_{2l}$ 解出 WZ 条件，命题 13.1 给出 $Q^1_{2l}$ 的显式公式。`}
      why={R`§13.3 留下了一个"冗长但直接"的平面波计算。本节换一个角度：不直接算，而是问反常**必须**满足什么代数条件。答案是 Wess–Zumino 一致性条件——它强到只要知道反常的首项，整个反常就被定死；而 Stora–Zumino 的下降方程从高两维的陈特征出发自动构造出它的解，解释了 $\frac12$ 这个系数的来历。`}
      gives={["13.63a", "13.63b", "13.65b", "13.73", "13.78", "13.80b", "13.82", "13.83b"]}>
      <p className="muted">本节概念：<C id="brs" /> · <C id="wz" /> · <C id="descent" /></p>

      <Sub n="13.4.1" title="The Becchi–Rouet–Stora operator and the Faddeev–Popov ghost" zh="BRS 算子与 Faddeev–Popov 鬼场">
        <Tx>{R`设 $W[\mathcal{A}]$ 是规范群 $G$ 的复表示 $\boldsymbol r$ 中 Weyl 费米子的有效作用量（下面略去表示下标 $\boldsymbol r$）。上一节看到，在无穷小规范变换 $\delta_v\mathcal{A}=-\mathcal{D}v$ 下 $W[\mathcal{A}]$ 的变化为`}</Tx>
        <Eq n="13.58" say={R`规范变分把有效作用量变成流的协变散度的积分——这一变化就是非阿贝尔反常。`}>{R`\delta_vW[\mathcal{A}]=-\int(\mathcal{D}_\mu v)^\alpha\frac{\delta}{\delta\mathcal{A}_\mu{}^\alpha}W[\mathcal{A}]=\int v^\alpha\mathcal{D}_\mu\langle j^\mu\rangle_\alpha.`}</Eq>
        <Tx>{R`按 Stora (1984) 与 Zumino (1985)，引入 BRS 算子 $\mathcal{S}$ 与 Faddeev–Popov 鬼场 $\omega$。

**思路。**规范变换参数 $v(x)$ 是一个"方向"；与其逐个方向地写 $\delta_v$，不如把所有规范变换收集成一个空间，在其上做外微分——规范变换的无穷小生成元变成一形式（鬼场），而"两次规范变换的对易子"变成"外微分平方为零"。这样代数约束就有了几何的表述。

令 $\Omega^m(G)$ 为从 $S^m$ 到 $G$ 的映射的集合（不要与 $M$ 上 $m$ 形式的集合 $\Omega^m(M)$ 混淆，由上下文可以区分）。除了普通的外微分 $\dd$，我们在 $\Omega^m(G)$ 上引入另一个外微分 $\mathcal{S}$，称为 **Becchi–Rouet–Stora (BRS) 算子**。一般来说 $\mathcal{S}$ 定义在无穷维空间上，但也可以考虑它在 $\Omega^m(G)$ 的某个有限维紧子空间（例如由 $\lambda^\alpha$ 参数化的 $S^n$）上的限制，这时 $\mathcal{S}$ 可写成 $\mathcal{S}\equiv\dd\lambda^\alpha\partial/\partial\lambda^\alpha$。我们要求 $\dd$ 与 $\mathcal{S}$ 是反导子（anti-derivations）：`}</Tx>
        <Eq n="13.59" say={R`时空外微分 $\dd$ 与"规范方向"外微分 $\mathcal{S}$ 各自幂零，并且彼此反对易。`}>{R`\dd^2=${S}^2=\dd${S}+${S}\dd=0.`}</Eq>
        <Tx>{R`定义 $\Delta\equiv\dd+\mathcal{S}$，则 $\Delta$ 显然幂零：`}</Tx>
        <Eq n="13.60" say={R`总外微分 $\Delta=\dd+\mathcal{S}$ 也幂零——它是乘积空间 $M\times(\text{规范参数})$ 上的外微分。`}>{R`\Delta^2=\dd^2+\dd${S}+${S}\dd+${S}^2=0.`}</Eq>
        <Tx>{R`在 $g=g(x,\lambda^\alpha)$ 作用下，$\mathcal{A}$ 变为`}</Tx>
        <Eq n="13.61" say={R`规范变换后的规范势 $\boldsymbol A$：依赖于参数 $\lambda$（通过 $g$），而原来的 $\mathcal{A}$ 不依赖。`}>{R`\mathcal{A}\to${BA}\equiv g^{-1}(\mathcal{A}+\dd)g.`}</Eq>
        <Tx>{R`注意 $\mathcal{A}$ 与 $\lambda$ 无关，而 $\boldsymbol A$ 通过 $g$ 依赖于 $\lambda$。定义 **Faddeev–Popov (FP) 鬼场**为`}</Tx>
        <Eq n="13.62" title="FP 鬼场" say={R`鬼场 = 沿规范参数方向的 Maurer–Cartan 形式：它是"无穷小规范变换参数"的一形式化身，是 Grassmann 奇的。`}>{R`\omega\equiv g^{-1}${S}g.`}</Eq>
        <Tx>{R`$\mathcal{S}$ 在 $\boldsymbol A$ 与 $\omega$ 上的作用为`}</Tx>
        <Eq n="13.63a" keyEq title="BRS 变换" say={R`BRS 变换就是以鬼场为参数的无穷小规范变换：$\mathcal{S}\boldsymbol A=-\mathcal{D}_{\boldsymbol A}\omega$，与 $\delta_v\mathcal{A}=-\mathcal{D}v$ 同形。`}>{R`\begin{aligned}${S}${BA}&=${S}[g^{-1}(\mathcal{A}+\dd)g]=-g^{-1}${S}g${BA}-g^{-1}\mathcal{A}${S}g+g^{-1}${S}(\dd g)\\&=-\omega${BA}-(${BA}-g^{-1}\dd g)\omega-g^{-1}\dd(${S}g)\\&=-\omega${BA}-${BA}\omega-\dd\omega\equiv-\mathcal{D}_{${BA}}\omega\end{aligned}`}</Eq>
        <Eq n="13.63b" keyEq say={R`鬼场的 BRS 变换是它自身的"平方"：这是规范群李代数结构（$[v_1,v_2]$）的编码，也就是 Maurer–Cartan 方程。`}>{R`${S}\omega=-g^{-1}${S}gg^{-1}${S}g=-\omega^2.`}</Eq>
        <Derivation title={R`\eqref{13.63a}–\eqref{13.63b} 的分级符号`} collapsed steps={[
          { tex: R`\mathcal{S}(XY)=(\mathcal{S}X)Y+(-1)^{|X|}X\,\mathcal{S}Y`, why: R`$\mathcal{S}$ 是反导子；$|X|$ 为总次数 = 形式次数 + 鬼场数。$g$ 次数 0，$\mathcal{A},\boldsymbol A,\omega$ 次数 1，$\mathcal{S}\mathcal{A}=0$。` },
          { tex: R`\mathcal{S}g^{-1}=-g^{-1}(\mathcal{S}g)g^{-1}`, why: R`对 $g^{-1}g=1$ 作用。` },
          { tex: R`\mathcal{S}(g^{-1}\mathcal{A}g)=-g^{-1}\mathcal{S}g\,g^{-1}\mathcal{A}g-g^{-1}\mathcal{A}\,\mathcal{S}g`, why: R`$\mathcal{S}$ 越过一形式 $\mathcal{A}$ 时变号。` },
          { tex: R`\mathcal{S}(g^{-1}\dd g)=-g^{-1}\mathcal{S}g\,g^{-1}\dd g+g^{-1}\mathcal{S}(\dd g),\qquad g^{-1}\mathcal{S}(\dd g)=-g^{-1}\dd(\mathcal{S}g)`, why: R`第二式来自 $\mathcal{S}\dd=-\dd\mathcal{S}$。合并前两式即 \eqref{13.63a} 第一行，前两项之和 $=-\omega\boldsymbol A$。` },
          { tex: R`\dd\omega=-g^{-1}\dd g\,\omega+g^{-1}\dd(\mathcal{S}g)`, why: R`对 $\omega=g^{-1}\mathcal{S}g$ 作用 $\dd$。代入得 $-g^{-1}\mathcal{A}g\,\omega-g^{-1}\dd(\mathcal{S}g)=-(\boldsymbol A-g^{-1}\dd g)\omega-g^{-1}\dd(\mathcal{S}g)=-\boldsymbol A\omega-\dd\omega$，即 \eqref{13.63a}。` },
          { tex: R`\mathcal{S}\omega=\mathcal{S}(g^{-1})\mathcal{S}g=-g^{-1}\mathcal{S}g\,g^{-1}\mathcal{S}g=-\omega^2`, why: R`$\mathcal{S}^2g=0$。` },
        ]} />
        <Tx>{R`容易验证 $\mathcal{S}$ 作用在 $\boldsymbol A$ 与 $\omega$ 上幂零，从而作用在 $\boldsymbol A$ 与 $\omega$ 的任意多项式上也幂零，理应如此；见习题 13.1。定义 $\boldsymbol A$ 的场强为`}</Tx>
        <Eq n="13.64" say={R`规范变换后的场强 = 原场强的伴随共轭；它不依赖于规范参数的"方向"。`}>{R`${BF}\equiv\dd${BA}+${BA}^2=g^{-1}\mathcal{F}g.`}</Eq>
        <Tx>{R`我们还定义`}</Tx>
        <Eq n="13.65a" say={R`扩展联络：把鬼场看成联络在"规范参数方向"上的分量，$\mathbb{A}=\boldsymbol A+\omega$。`}>{R`\mathbb{A}\equiv g^{-1}(\mathcal{A}+\Delta)g=${BA}+g^{-1}${S}g=${BA}+\omega`}</Eq>
        <Eq n="13.65b" keyEq title="横向曲率为零（Russian formula）" say={R`扩展联络的曲率与原场强完全相同：沿规范轨道方向没有曲率。这一条就是下降方程与 WZ 条件的全部来源。`}>{R`\mathbb{F}\equiv\Delta\mathbb{A}+\mathbb{A}^2=g^{-1}\mathcal{F}g=${BF}`}</Eq>
        <Tx>{R`其中 \eqref{13.65b} 成立是因为 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}^2=\Delta\mathcal{A}+\mathcal{A}^2$（注意 $\mathcal{S}\mathcal{A}=0$），而 $\mathbb{A}$ 正是 $\mathcal{A}$ 关于"$\Delta$"的规范变换，曲率按伴随方式变换。由定理 10.1 可知 $\mathbb{A}$ 是主丛上的 Ehresmann 联络，$\mathbb{F}$ 是它的曲率二形式（\sref{T10.1}：丛上的联络一形式局部写成 $g^{-1}\pi^*\mathcal{A}g+g^{-1}\dd_Pg$；把规范参数方向并入丛的方向、$\dd_P\to\Delta$，就得到 $\mathbb{A}$）。

非阿贝尔反常的存在意味着 $W[\boldsymbol A]$ 在 BRS 算子 $\mathcal{S}$ 作用下不为零（$\omega$ 大致对应于 $v$，见 \eqref{13.39} 与 \eqref{13.63a}）：`}</Tx>
        <Eq n="13.66" say={R`反常的 BRS 表述：有效作用量的 BRS 变分 $G[\omega,\boldsymbol A]$ 就是反常，对鬼场是线性的。`}>{R`${S}W[${BA}]=${GA}[\omega,${BA}].`}</Eq>
        <Tx>{R`由于 $W[\boldsymbol A]$ 不依赖于 $\omega$，$\mathcal{S}$ 只通过 $\boldsymbol A$ 起作用。在写下非阿贝尔反常的 Wess–Zumino 一致性条件之前，我们先停下来考虑 BRS 算子与 FP 鬼场的物理含义。`}</Tx>
        <Eq n="13.67" say={R`BRS 算子的幂零性：作用两次为零。`}>{R`${S}^2\sym{BA}{A}=0\qquad${S}^2\omega=0.`}</Eq>
        <Exercise n="13.1" title={R`$\mathcal{S}$ 在 $\boldsymbol A$ 与 $\omega$ 上幂零`} level="★"
          hint={R`用 \eqref{13.63a}、\eqref{13.63b} 与反导子规则 $\mathcal{S}(XY)=(\mathcal{S}X)Y-X\mathcal{S}Y$（$X$ 为奇元），以及 $\mathcal{S}\dd=-\dd\mathcal{S}$。先算 $\mathcal{S}^2\omega$（两行），再把 $\mathcal{S}^2\boldsymbol A$ 拆成 $-\mathcal{S}(\boldsymbol A\omega)-\mathcal{S}(\omega\boldsymbol A)-\mathcal{S}\dd\omega$ 三项。`}
          solution={R`$\boldsymbol A$、$\omega$ 的总次数都是 1（奇），所以对它们的乘积 $\mathcal{S}(XY)=(\mathcal{S}X)Y-X(\mathcal{S}Y)$。

**$\mathcal{S}^2\omega$。**$\mathcal{S}^2\omega=-\mathcal{S}(\omega\omega)=-[(\mathcal{S}\omega)\omega-\omega(\mathcal{S}\omega)]=-[-\omega^3+\omega^3]=0$。

**$\mathcal{S}^2\boldsymbol A$。**由 \eqref{13.63a}，$\mathcal{S}^2\boldsymbol A=-\mathcal{S}(\boldsymbol A\omega)-\mathcal{S}(\omega\boldsymbol A)-\mathcal{S}\dd\omega$。逐项：

$$\mathcal{S}(\boldsymbol A\omega)=(\mathcal{S}\boldsymbol A)\omega-\boldsymbol A(\mathcal{S}\omega)=(\mathcal{S}\boldsymbol A)\omega+\boldsymbol A\omega^2,$$
$$\mathcal{S}(\omega\boldsymbol A)=(\mathcal{S}\omega)\boldsymbol A-\omega(\mathcal{S}\boldsymbol A)=-\omega^2\boldsymbol A-\omega(\mathcal{S}\boldsymbol A),$$
$$\mathcal{S}\dd\omega=-\dd\mathcal{S}\omega=\dd(\omega^2)=(\dd\omega)\omega-\omega\dd\omega.$$

于是 $\mathcal{S}^2\boldsymbol A=-(\mathcal{S}\boldsymbol A)\omega+\omega(\mathcal{S}\boldsymbol A)-\boldsymbol A\omega^2+\omega^2\boldsymbol A-(\dd\omega)\omega+\omega\dd\omega$。代入 $\mathcal{S}\boldsymbol A=-\boldsymbol A\omega-\omega\boldsymbol A-\dd\omega$：

$$-(\mathcal{S}\boldsymbol A)\omega=\boldsymbol A\omega^2+\omega\boldsymbol A\omega+(\dd\omega)\omega,\qquad\omega(\mathcal{S}\boldsymbol A)=-\omega\boldsymbol A\omega-\omega^2\boldsymbol A-\omega\dd\omega.$$

全部相加，$\boldsymbol A\omega^2$、$\omega\boldsymbol A\omega$、$\omega^2\boldsymbol A$、$(\dd\omega)\omega$、$\omega\dd\omega$ 各自成对抵消，$\mathcal{S}^2\boldsymbol A=0$。

**推论。**$\mathcal{S}^2$ 是导子（两个反导子的平方），在生成元 $\boldsymbol A,\omega$（以及 $\dd\boldsymbol A,\dd\omega$，因 $\mathcal{S}^2\dd=\dd\mathcal{S}^2$）上为零，故在它们的任意多项式上为零，即 \eqref{13.72}。

**几何解释。**$\mathcal{S}=\dd\lambda^\alpha\partial/\partial\lambda^\alpha$ 是参数空间上的外微分，$\mathcal{S}^2=0$ 本是恒等式；上面的计算验证了 \eqref{13.63a}–\eqref{13.63b} 与此相容。`}>
          {R`由 \eqref{13.63a}–\eqref{13.63b} 验证 $\mathcal{S}$ 在 $\boldsymbol A$ 与 $\omega$ 上的作用是幂零的，即 \eqref{13.67}（式中 $A$ 即 $\boldsymbol A$）。`}
        </Exercise>
      </Sub>

      <Sub n="13.4.2" title="The BRS operator, FP ghost and moduli space" zh="BRS 算子、FP 鬼场与模空间">
        <Tx>{R`为了找到 $\mathcal{S}$ 与 $\omega$ 的物理意义，需要考察规范场的拓扑（Atiyah 与 Jones 1978，Singer 1985，Sumitani 1985）。设 $\mathfrak{A}$ 是 $S^m$ 上全部规范势构型的空间。为确定起见取 $m=4$，推广到任意 $m$ 是显然的。$\mathfrak{A}$ 的拓扑是平凡的：对任意两个规范势构型 $\mathcal{A}_1$、$\mathcal{A}_2$，组合 $t\mathcal{A}_1+(1-t)\mathcal{A}_2$（$0\le t\le1$）仍是 $S^4$ 上的规范势（两个联络之差是张量，联络空间是仿射空间，因而可缩）。

但 $\mathfrak{A}$ 并不描述规范理论的物理构型空间。必须把由 $G$ 规范变换相联系的场构型等同起来。设 $\mathfrak{G}$ 是 $S^4$ 上全部规范变换的空间（用前面的记号 $\mathfrak{G}=\Omega^4(G)$）。物理构型空间应等同于 $\mathfrak{A}/\mathfrak{G}$，称为规范理论的**模空间**（moduli space）。我们在 §10.5 看到，$S^4$ 上的规范场构型按转移函数 $g:S^3\to G$ 分类，$S^3$ 是 $S^4$ 的赤道。现在 $\mathfrak{A}/\mathfrak{G}$ 也按赤道上的转移函数 $S^3\to G$ 分类，因而`}</Tx>
        <Eq n="13.68" say={R`模空间按赤道上的转移函数 $S^3\to G$ 分类；它的连通分支由 $\pi_3(G)$（瞬子数）标记。`}>{R`${FA}/${FG}\simeq\Omega^3(G).`}</Eq>
        <Tx>{R`于是 $\mathfrak{A}/\mathfrak{G}$ 的每个连通分支由瞬子数 $k$ 标记，这个分支记为 $\Omega^4_k(G)$。`}</Tx>
        <Box kind="note" title={R`注记：如何读 \eqref{13.68}`}>{R`\eqref{13.68} 应理解为"分类意义上的"等同：$\mathfrak{A}/\mathfrak{G}$ 的**连通分支**与 $\pi_0(\Omega^3(G))=\pi_3(G)\cong\Z$（瞬子数）一一对应。它并不是说模空间作为空间同胚于映射空间 $\Omega^3(G)$。严格地说，$\mathfrak{A}$ 本身可缩，不同瞬子数对应 $S^4$ 上不同的 $G$ 丛，各自有自己的联络空间 $\mathfrak{A}_k$；"$\mathfrak{A}$" 应理解为这些仿射空间的并。下面只用到"$\mathfrak{A}\to\mathfrak{A}/\mathfrak{G}$ 是以 $\mathfrak{G}$ 为纤维的丛"这一结构。`}</Box>
        <Figure n="13.1" caption={R`BRS 算子 $\mathcal{S}$ 是 $\delta$ 沿纤维方向的限制。`} width="42%" />
        <Tx>{R`空间 $\mathfrak{A}$ 有自然的投影 $\pi:\mathfrak{A}\to\mathfrak{A}/\mathfrak{G}$，可以做成以 $\mathfrak{G}$ 为纤维的纤维丛，见图 13.1。设 $a\in\mathfrak{A}$ 是类 $[a]\in\mathfrak{A}/\mathfrak{G}$ 的代表元，`}</Tx>
        <Eq n="13.69" say={R`$\mathfrak{A}$ 中的点 = 模空间中的代表元 $a$ + 纤维中的规范变换 $g$：这是 $\mathfrak{A}$ 的"局部平凡化"。`}>{R`\mathcal{A}(x)=g^{-1}(x)(a(x)+\dd)g(x)`}</Eq>
        <Tx>{R`是 $\mathfrak{A}$ 中属于 $[a]$ 的元素。我们用 $\delta$ 表示 $\mathfrak{A}$ 中的外微分算子，它是一个**泛函**变分，不要与通常的微分 $\dd$ 混淆（见 Leinaas 与 Olaussen 1982）。把 $\delta$ 作用到 \eqref{13.69} 上（$\delta$ 越过一形式时变号，与 $\dd$ 反对易），得`}</Tx>
        <Eq n="13.70" say={R`$\mathfrak{A}$ 上的变分分解为两部分：沿模空间的 $g^{-1}\delta a\,g$（"水平"）与沿纤维的 $-\mathcal{D}_{\mathcal{A}}(g^{-1}\delta g)$（"竖直"，即无穷小规范变换）。`}>{R`\begin{aligned}\delta\mathcal{A}&=-g^{-1}\delta g\mathcal{A}+g^{-1}\delta ag-g^{-1}a\delta g-g^{-1}\dd(\delta g)\\&=g^{-1}\delta ag-\dd(g^{-1}\delta g)-g^{-1}\delta g\mathcal{A}-\mathcal{A}g^{-1}\delta g\\&=g^{-1}\delta ag-\mathcal{D}_{\mathcal{A}}(g^{-1}\delta g)\end{aligned}`}</Eq>
        <Tx>{R`其中 $\mathcal{D}_{\mathcal{A}}=\dd+[\mathcal{A},\ \ ]$（作用于奇元 $g^{-1}\delta g$ 时为反对易子）。\eqref{13.70} 的第一项代表 $\mathcal{A}$ 沿 $\mathfrak{A}/\mathfrak{G}$ 方向的导数，第二项代表沿纤维方向的导数；见图 13.1。BRS 变换 $\mathcal{S}$ 就是把变分 $\delta$ **限制在纤维方向**：`}</Tx>
        <Eq n="13.71a" say={R`BRS 变换 = 沿规范轨道（纤维）方向的泛函外微分。`}>{R`${S}\mathcal{A}\equiv\delta\mathcal{A}|_{\rm fibre}=-\mathcal{D}_{\mathcal{A}}\omega`}</Eq>
        <Tx>{R`其中 FP 鬼场 $\omega$ 是 $g^{-1}\mathcal{S}g\equiv g^{-1}\delta g|_{\rm fibre}$——群 $\mathfrak{G}$ 上的 Maurer–Cartan 形式。还可以求出`}</Tx>
        <Eq n="13.71b" say={R`鬼场的 BRS 变换就是纤维 $\mathfrak{G}$ 上 Maurer–Cartan 形式的结构方程。`}>{R`${S}\omega=\delta\omega|_{\rm fibre}=-g^{-1}${S}gg^{-1}${S}g=-\omega^2`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{13.71b} 之后的引用（p.534）`}>{R`原书写"which reproduces (13.63a)"。\eqref{13.71b} 是鬼场的变换 $\mathcal{S}\omega=-\omega^2$，对应的是 \eqref{13.63b}；与 $\mathcal{S}\boldsymbol A$ 对应的是 \eqref{13.71a}。本站改为同时引用二者。`}</Box>
        <Tx>{R`它与 \eqref{13.71a} 一起重现了 \eqref{13.63a}–\eqref{13.63b}。这样，**鬼场就是规范群纤维上的 Maurer–Cartan 形式，BRS 算子就是沿规范轨道的外微分**，$\mathcal{S}^2=0$ 是 $\delta^2=0$ 的限制。`}</Tx>
      </Sub>

      <Sub n="13.4.3" title="The Wess–Zumino conditions" zh="Wess–Zumino 条件">
        <Tx>{R`习题 13.1 说明 $\mathcal{S}$ 在 $\mathcal{A}$ 与 $\omega$ 的任意多项式 $f$ 上**幂零**：`}</Tx>
        <Eq n="13.72" say={R`BRS 算子在规范势与鬼场的任意多项式上平方为零。`}>{R`${S}^2f(\omega,${BA})=0.`}</Eq>
        <Tx>{R`把 $\mathcal{S}$ 解释为外微分算子就要求这种幂零性。特别地，应有`}</Tx>
        <Eq n="13.73" keyEq title="Wess–Zumino 一致性条件" say={R`反常 $G$ 是一个"BRS 闭"的量：$\mathcal{S}G=\mathcal{S}^2W=0$。它对反常的形式有极强的约束——这是两个规范变换的对易子必须等于对易子方向上的规范变换这一事实的鬼场表述。`}>{R`${S}${GA}[\omega,${BA}]=${S}^2W[${BA}]=0.`}</Eq>
        <Tx>{R`这个条件称为 **Wess–Zumino 一致性条件**（WZ 条件），可以用来确定非阿贝尔反常（Wess 与 Zumino 1971，Stora 1984，Zumino 1985，Zumino 等 1984）。若反常 $G$ 在数学上有良好定义，它就应当满足 WZ 条件。这个条件强到只要给出 $G[\omega,\boldsymbol A]$ 的第一项，反常就被完全定死。

（用分量写：若记 $G_v\equiv\delta_vW$，WZ 条件等价于 $\delta_{v_1}G_{v_2}-\delta_{v_2}G_{v_1}=G_{[v_1,v_2]}$——规范变换的群结构在反常上的投影。满足这一条件的反常称为**一致反常**（consistent anomaly），\eqref{13.57} 就是一个；它不按伴随表示协变。另一种定义下得到的"协变反常" $\propto\Tr T_\alpha\epsilon\mathcal{F}\mathcal{F}$ 是规范协变的，但不满足 WZ 条件。）`}</Tx>
      </Sub>

      <Sub n="13.4.4" title="Descent equations and solutions of WZ conditions" zh="下降方程与 WZ 条件的解">
        <Tx>{R`Stora (1984) 与 Zumino (1985) 按如下方式构造了 WZ 条件的解。$(2l+2)$ 维空间中的**阿贝尔**反常由`}</Tx>
        <Eq n="13.74" say={R`高两维的阿贝尔反常密度：第 $l+1$ 个陈特征。`}>{R`${CH}_{l+1}(${BF})=\frac{1}{(l+1)!}${TR}\Big(\frac{\mathrm{i}${BF}}{2\pi}\Big)^{l+1}`}</Eq>
        <Tx>{R`给出，其中 $\boldsymbol F=\dd\boldsymbol A+\boldsymbol A^2$，$\boldsymbol A=g^{-1}(\mathcal{A}+\dd)g$ 同前。设 $Q_{2l+1}(\boldsymbol A,\boldsymbol F)$ 是 $\mathrm{ch}_{l+1}(\boldsymbol F)$ 的陈–Simons 形式（§11.5）：`}</Tx>
        <Eq n="13.75" say={R`陈特征在局部上是恰当的：它是陈–Simons 形式的外微分。`}>{R`${CH}_{l+1}(${BF})=\dd Q_{2l+1}(${BA},${BF}).`}</Eq>
        <Tx>{R`由于三元组 $(\Delta,\mathbb{A},\mathbb{F})$ 的代数结构与 $(\dd,\boldsymbol A,\boldsymbol F)$ 完全相同（$\Delta^2=0$，$\mathbb F=\Delta\mathbb A+\mathbb A^2$，Bianchi 恒等式也同样成立），我们也有`}</Tx>
        <Eq n="13.76" say={R`把陈–Simons 公式里的 $(\dd,\boldsymbol A,\boldsymbol F)$ 换成 $(\Delta,\mathbb A,\mathbb F)$ 仍然成立——纯代数的替换。`}>{R`${CH}_{l+1}(\mathbb{F})=\Delta Q_{2l+1}(\mathbb{A},\mathbb{F})=\Delta Q_{2l+1}(${BA}+\omega,${BF})`}</Eq>
        <Tx>{R`这里用了 $\mathbb{A}=\boldsymbol A+\omega$ 与 $\mathbb{F}=\boldsymbol F$。把 $Q_{2l+1}(\mathbb{A},\mathbb{F})=Q_{2l+1}(\boldsymbol A+\omega,\boldsymbol F)$ 按 $\omega$ 的幂次展开：`}</Tx>
        <Eq n="13.77" say={R`按鬼场数分解陈–Simons 形式：$Q^s_r$ 含 $s$ 个鬼场、是 $r$ 形式，总次数 $r+s=2l+1$ 固定。`}>{R`\begin{aligned}Q_{2l+1}(\mathbb{A},\mathbb{F})=\ &Q^0_{2l+1}(${BA},${BF})+Q^1_{2l}(\omega,${BA},${BF})+Q^2_{2l-1}(\omega,${BA},${BF})\\&+\cdots+Q^{2l+1}_0(\omega,${BA},${BF})\end{aligned}`}</Eq>
        <Tx>{R`其中 $Q^s_r$ 是 $\omega$ 的 $s$ 次项，$r+s=2l+1$。

现在注意到 $\mathrm{ch}_{l+1}(\mathbb{F})=\mathrm{ch}_{l+1}(\boldsymbol F)$，因为 $\mathbb{F}=\boldsymbol F=g^{-1}\mathcal{F}g$。用陈–Simons 形式表示，这就是`}</Tx>
        <Eq n="13.78" keyEq title="下降方程的母式" say={R`同一个陈特征的两种陈–Simons 写法：用总微分 $\Delta$ 作用在扩展联络的 $Q$ 上，等于用 $\dd$ 作用在普通联络的 $Q$ 上。`}>{R`\Delta Q_{2l+1}(\mathbb{A},\mathbb{F})=\dd Q_{2l+1}(${BA},${BF}).`}</Eq>
        <Tx>{R`把 \eqref{13.77} 代入 \eqref{13.78}，得`}</Tx>
        <Eq n="13.79" say={R`展开后两边按鬼场数比较。`}>{R`\begin{aligned}(\dd+${S})[&Q^0_{2l+1}(${BA},${BF})+Q^1_{2l}(\omega,${BA},${BF})\\&+\cdots+Q^{2l+1}_0(\omega,${BA},${BF})]=\dd Q^0_{2l+1}(${BA},${BF}).\end{aligned}`}</Eq>
        <Tx>{R`收集 $\omega$ 同阶的项（注意 $\mathcal{S}$ 使 $\omega$ 的次数加一，见 \eqref{13.63a}–\eqref{13.63b}；$\dd$ 保持鬼场数），就得到**下降方程**（descent equations）：`}</Tx>
        <Eq n="13.80a" say={R`鬼场数 1：首个陈–Simons 形式的 BRS 变分是一个恰当形式 $-\dd Q^1_{2l}$。`}>{R`${S}Q^0_{2l+1}(${BA},${BF})+\dd Q^1_{2l}(\omega,${BA},${BF})=0`}</Eq>
        <Eq n="13.80b" keyEq title="下降方程（反常的一层）" say={R`鬼场数 2：$Q^1_{2l}$ 的 BRS 变分是恰当的——积分后为零，这正是 WZ 条件。`}>{R`${S}Q^1_{2l}(\omega,${BA},${BF})+\dd Q^2_{2l-1}(\omega,${BA},${BF})=0`}</Eq>
        <Tx>{R`$$\vdots$$`}</Tx>
        <Eq n="13.80c" say={R`倒数第二层：一形式与零形式之间的下降关系。`}>{R`${S}Q^{2l}_1(\omega,${BA},${BF})+\dd Q^{2l+1}_0(\omega,${BA},${BF})=0`}</Eq>
        <Eq n="13.80d" say={R`最后一层：纯鬼场的零形式是 BRS 闭的。`}>{R`${S}Q^{2l+1}_0(\omega,${BA},${BF})=0.`}</Eq>
        <Tx>{R`现在看 $2l$ 形式 $Q^1_{2l}(\omega,\boldsymbol A,\boldsymbol F)$。令`}</Tx>
        <Eq n="13.81" title="反常 = 下降方程的第一层" say={R`把鬼场数为 1 的 $2l$ 形式在 $2l$ 维流形上积分，就得到一个满足 WZ 条件的反常泛函。`}>{R`${GA}[\omega,${BA},${BF}]\equiv\int_MQ^1_{2l}(\omega,${BA},${BF})`}</Eq>
        <Tx>{R`$G[\omega,\boldsymbol A,\boldsymbol F]$ 满足 WZ 条件：

$$\mathcal{S}G[\omega,\boldsymbol A,\boldsymbol F]=\int_M\mathcal{S}Q^1_{2l}(\omega,\boldsymbol A,\boldsymbol F)=-\int_M\dd Q^2_{2l-1}(\omega,\boldsymbol A,\boldsymbol F)=-\int_{\partial M}Q^2_{2l-1}(\omega,\boldsymbol A,\boldsymbol F)=0$$

这里假定 $M$ 无边界，并用了 \eqref{13.80b}。（$\mathcal{S}$ 与对 $M$ 的积分可交换，因为 $\mathcal{S}$ 只作用在场上。）这说明一旦求得 $Q^1_{2l}(\omega,\boldsymbol A,\boldsymbol F)$，反常 $G[\omega,\boldsymbol A,\boldsymbol F]$ 就很容易得到。`}</Tx>
        <Stmt id="F:descent13" />
        <Stmt id="F:wz13" />
        <Stmt id="P13.1">
          <Eq n="13.82" keyEq title={R`$Q^1_{2l}$ 的显式公式`} say={R`非阿贝尔反常的通用公式：鬼场 $\omega$ 乘以 $\dd(\mathcal{A}\mathcal{F}_t^{l-1})$ 的对称化迹，再对插值参数以权重 $(1-t)$ 积分。权重 $(1-t)$ 正是 $\frac12$（而非 $\frac23$）的来源。`}>{R`Q^1_{2l}(\omega,\mathcal{A},\mathcal{F})=\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\frac{1}{(l-1)!}\int_0^1\delta t\,(1-t)\,${STR}[\omega\dd(\mathcal{A}\mathcal{F}_t^{l-1})].`}</Eq>
          <Tx>{R`［注：证明中暂时略去归一化因子 $(\mathrm{i}/2\pi)^{l+1}$ 以简化表达式，最后再恢复。积分元写作 $\delta t$ 只是为了与外微分 $\dd$ 区分，它就是普通的 $\dd t$。由于 $\mathbb F=\boldsymbol F$ 中不含 $\omega$，下面的 $\mathcal{A},\mathcal{F}$ 可理解为 $\boldsymbol A,\boldsymbol F$。］`}</Tx>
          <Proof title="命题 13.1 的证明（原书略写处已补全）" steps={[
            { claim: R`从陈–Simons 形式的插值公式（式 (11.105)，此处 $j=l+1$）出发，并略去归一化：`, tex: R`Q_{2l+1}(\mathcal{A}+\omega,\mathcal{F})=\frac1{l!}\int_0^1\delta t\,\Tr[(\mathcal{A}+\omega)\hat{\mathcal{F}}^l_t]`, why: R`式 (11.105) 对联络 $\mathcal{A}+\omega$ 写出；由于 $\Delta$ 作用下的曲率是 $\mathbb F=\mathcal F$，插值曲率为 $t\mathcal{F}+(t^2-t)(\mathcal{A}+\omega)^2$（与 (11.104) 同形：$t\,\mathbb F+(t^2-t)\mathbb A^2$）。`, uses: ["11.105"] },
            { claim: R`插值曲率按 $\omega$ 的阶数分解：`, tex: R`\hat{\mathcal{F}}_t\equiv t\mathcal{F}+(t^2-t)(\mathcal{A}+\omega)^2=\mathcal{F}_t+(t^2-t)\{\mathcal{A},\omega\}+(t^2-t)\omega^2,\qquad\mathcal{F}_t\equiv\dd(t\mathcal{A})+(t\mathcal{A})^2`, why: R`$t\mathcal{F}+(t^2-t)\mathcal{A}^2=t\,\dd\mathcal{A}+t^2\mathcal{A}^2=\mathcal{F}_t$。这里 $\{\mathcal{A},\omega\}=\mathcal{A}\omega+\omega\mathcal{A}$ 是两个奇元的分级对易子 $[\mathcal{A},\omega]$（原书正文写作 $[\mathcal{A},\omega]$）。` },
            { claim: R`代入并只保留 $\omega$ 的一次项：$\omega$ 要么来自前面的因子 $(\mathcal{A}+\omega)$，要么来自 $\hat{\mathcal{F}}^l_t$ 中某一个因子的 $(t^2-t)[\mathcal{A},\omega]$。在对称化迹下各位置等价，得`, tex: R`Q^1_{2l}=\frac1{l!}\int\delta t\,\mathrm{str}\big[\omega\mathcal{F}^l_t+(t^2-t)\,l\,\mathcal{A}[\mathcal{A},\omega]\mathcal{F}^{l-1}_t\big]`, why: R`原书此行把 $[\mathcal{A},\omega]$ 误印为 $[\mathcal{A},v]$。第一项的 $\Tr(\omega\mathcal{F}_t^l)=\mathrm{str}(\omega,\mathcal{F}_t,\ldots)$。`, fill: true },
            { claim: R`用不变多项式的分级不变性（$\mathrm{str}$ 在伴随作用下不变的无穷小形式，对 $\mathcal{A}$ 求"导"）：`, tex: R`\mathrm{str}([\mathcal{A},\mathcal{A}]\omega\mathcal{F}^{l-1}_t)-\mathrm{str}(\mathcal{A}[\mathcal{A},\omega]\mathcal{F}^{l-1}_t)+\mathrm{str}(\mathcal{A}\omega[\mathcal{A},\mathcal{F}^{l-1}_t])=0`, why: R`对 $\mathrm{str}(X_1,X_2,X_3)$ 有 $\sum_i\pm\mathrm{str}(\ldots,[\mathcal{A},X_i],\ldots)=0$，符号为 $(-1)^{|\mathcal{A}|(|X_1|+\cdots+|X_{i-1}|)}$；这里 $X_1=\mathcal{A}$、$X_2=\omega$ 为奇，$X_3=\mathcal{F}^{l-1}_t$ 为偶。`, uses: ["11.8"], fill: true },
            { claim: R`于是 $\mathrm{str}(\mathcal{A}[\mathcal{A},\omega]\mathcal{F}^{l-1}_t)=\mathrm{str}([\mathcal{A},\mathcal{A}]\omega\mathcal{F}^{l-1}_t)+\mathrm{str}(\mathcal{A}\omega[\mathcal{A},\mathcal{F}^{l-1}_t])$；在 $\mathrm{str}$ 下把 $\omega$ 移到最前（越过偶元不变号，越过奇元 $\mathcal{A}$ 变号），并用 $l(t^2-t)=l(t-1)t$、$t\mathcal{A}=\mathcal{A}_t$：`, tex: R`Q^1_{2l}=\frac1{l!}\int\delta t\,\mathrm{str}\big[\omega\big\{\mathcal{F}^l_t+l(t-1)\big(t[\mathcal{A},\mathcal{A}]\mathcal{F}^{l-1}_t-\mathcal{A}[\mathcal{A}_t,\mathcal{F}^{l-1}_t]\big)\big\}\big]`, fill: true },
            { claim: R`现在用 $\mathcal{A}_t=t\mathcal{A}$ 的 Bianchi 恒等式与 $\mathcal{F}_t$ 对 $t$ 的导数：`, tex: R`\mathcal{D}_t\mathcal{F}^{l-1}_t\equiv\dd\mathcal{F}^{l-1}_t+[\mathcal{A}_t,\mathcal{F}^{l-1}_t]=0,\qquad\frac{\partial\mathcal{F}_t}{\partial t}=\dd\mathcal{A}+t[\mathcal{A},\mathcal{A}]`, why: R`$[\mathcal{A},\mathcal{A}]=2\mathcal{A}^2$（分级对易子）。` },
            { claim: R`代入得`, tex: R`Q^1_{2l}=\frac1{l!}\int\delta t\,\mathrm{str}\Big[\omega\Big\{\mathcal{F}^l_t+l(t-1)\Big[\Big(\frac{\partial\mathcal{F}_t}{\partial t}-\dd\mathcal{A}\Big)\mathcal{F}^{l-1}_t+\mathcal{A}\,\dd\mathcal{F}^{l-1}_t\Big]\Big\}\Big]`, why: R`$t[\mathcal{A},\mathcal{A}]=\partial_t\mathcal{F}_t-\dd\mathcal{A}$，$-[\mathcal{A}_t,\mathcal{F}^{l-1}_t]=\dd\mathcal{F}^{l-1}_t$。` },
            { claim: R`整理：在 $\mathrm{str}$ 下 $l\,(\partial_t\mathcal{F}_t)\mathcal{F}^{l-1}_t\simeq\partial_t(\mathcal{F}^l_t)$；而 $-\dd\mathcal{A}\,\mathcal{F}^{l-1}_t+\mathcal{A}\,\dd\mathcal{F}^{l-1}_t=-\dd(\mathcal{A}\mathcal{F}^{l-1}_t)$。所以`, tex: R`Q^1_{2l}=\frac1{l!}\int\delta t\,\mathrm{str}\Big[\omega\Big\{\mathcal{F}^l_t+l(1-t)\dd(\mathcal{A}\mathcal{F}^{l-1}_t)+(t-1)\frac{\partial\mathcal{F}^l_t}{\partial t}\Big\}\Big]`, why: R`$\dd(\mathcal{A}X)=\dd\mathcal{A}\,X-\mathcal{A}\,\dd X$（$\mathcal{A}$ 为一形式）。` },
            { claim: R`对 $t$ 分部积分：`, tex: R`\int_0^1\Big[\mathcal{F}^l_t+(t-1)\frac{\partial\mathcal{F}^l_t}{\partial t}\Big]\delta t=\Big[(t-1)\mathcal{F}^l_t\Big]_0^1=0`, why: R`上限处 $t-1=0$；下限处 $\mathcal{F}_0=0$（$l\ge1$）。原书只写"分部积分"，这里写出两个边界项为何都为零。交互图 2 对每个单项 $t^{l+k}$ 用精确分数核对了这一恒等式。`, fill: true },
            { claim: R`剩下的就是`, tex: R`Q^1_{2l}(\omega,\mathcal{A},\mathcal{F})=\frac{1}{(l-1)!}\int\delta t\,(1-t)\,\mathrm{str}[\omega\,\dd(\mathcal{A}\mathcal{F}^{l-1}_t)]`, why: R`$\frac{l}{l!}=\frac1{(l-1)!}$。` },
            { claim: R`恢复归一化因子 $(\mathrm{i}/2\pi)^{l+1}$，即得 \eqref{13.82}。`, uses: ["13.82"] },
          ]} />
        </Stmt>
        <Tx>{R`对 $m=2l=2$ 与 $m=4$，有`}</Tx>
        <Eq n="13.83a" title="二维非阿贝尔反常" say={R`二维的一致反常：鬼场乘规范势的外微分，系数 $\frac12(\frac{\mathrm{i}}{2\pi})^2=-\frac1{8\pi^2}$。`}>{R`Q^1_2(\omega,${BA},${BF})=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2${TR}(\omega\dd${BA})`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{13.83a} 漏了因子 $\frac12$（p.538）`}>{R`原书印作 $Q^1_2=(\frac{\mathrm{i}}{2\pi})^2\Tr(\omega\dd\boldsymbol A)$。由 \eqref{13.82} 取 $l=1$：$\mathcal{F}^{0}_t=1$，$\int_0^1(1-t)\,\delta t=\frac12$，所以 $Q^1_2=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\omega\dd\boldsymbol A)$。直接验证：$Q_3=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\boldsymbol A\dd\boldsymbol A+\frac23\boldsymbol A^3)$，在 $\delta\boldsymbol A=\mathcal{D}v$ 下 $\delta\Tr(\boldsymbol A\dd\boldsymbol A+\frac23\boldsymbol A^3)=\dd\Tr(v\,\dd\boldsymbol A)$，与 \eqref{13.80a} 比较得到同样的 $\frac12$。（由此 $2\pi\mathrm{i}\,Q^1_2$ 的系数是 $-\frac{\mathrm{i}}{4\pi}$，即熟知的二维一致反常 $\frac1{4\pi}$；协变反常是它的两倍 $\frac1{2\pi}$。）对照 $l=2$ 的 \eqref{13.83b}，由同一公式得到的 $\frac16$ 原书是对的。本站已改正 \eqref{13.83a}。`}</Box>
        <Eq n="13.83b" keyEq title="四维非阿贝尔反常" say={R`四维一致反常：$\omega\,\dd(\boldsymbol A\dd\boldsymbol A+\frac12\boldsymbol A^3)$——与 Bardeen 的 \eqref{13.56} 结构相同，只差归一化。`}>{R`Q^1_4(\omega,${BA},${BF})=\frac16\Big(\frac{\mathrm{i}}{2\pi}\Big)^3${STR}(\omega\dd(${BA}\dd${BA}+\tfrac12${BA}^3)).`}</Eq>
        <Derivation title={R`由 \eqref{13.82} 算出 \eqref{13.83b}`} collapsed steps={[
          { tex: R`l=2:\quad\mathcal{A}\mathcal{F}_t=t\,\mathcal{A}\dd\mathcal{A}+t^2\mathcal{A}^3`, why: R`$\mathcal{F}_t=t\,\dd\mathcal{A}+t^2\mathcal{A}^2$。` },
          { tex: R`\int_0^1(1-t)t\,\dd t=\frac16,\qquad\int_0^1(1-t)t^2\,\dd t=\frac1{12}`, why: R`$\frac12-\frac13=\frac16$，$\frac13-\frac14=\frac1{12}$。` },
          { tex: R`Q^1_4=\Big(\frac{\mathrm{i}}{2\pi}\Big)^3\frac1{1!}\mathrm{str}\Big[\omega\,\dd\Big(\frac16\mathcal{A}\dd\mathcal{A}+\frac1{12}\mathcal{A}^3\Big)\Big]=\frac16\Big(\frac{\mathrm{i}}{2\pi}\Big)^3\mathrm{str}[\omega\,\dd(\mathcal{A}\dd\mathcal{A}+\tfrac12\mathcal{A}^3)]`, why: R`三次项系数 $\frac{1/12}{1/6}=\frac12$。对比陈–Simons 形式 $Q_3\propto\int_0^1\mathrm{str}(\mathcal{A}\mathcal{F}_t)\dd t=\frac12\mathcal{A}\dd\mathcal{A}+\frac13\mathcal{A}^3\propto\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3$：权重 $1$ 与 $(1-t)$ 之别就是 $\frac23$ 与 $\frac12$ 之别。` },
        ]} />
        <Tx>{R`这些结果也可以用直接计算验证。除了归一化因子，\eqref{13.83b} 给出了四维空间中的非阿贝尔反常；参见 \eqref{13.56}。`}</Tx>
        <DescentLab />
        <Tx>{R`Sumitani (1984) 指出，这里处理非阿贝尔反常的方法是*特设*的（ad hoc），没有说清以下两点：

(1) WZ 条件 \eqref{13.73} 不能确定反常的归一化，而且解的唯一性远非平凡（任何 $\mathcal{S}$ 恰当的项 $\mathcal{S}\int(\ldots)$——即有效作用量的局部抵消项——都可以加到 $G$ 上）。

(2) 不清楚为什么我们要从 $(m+2)$ 维空间的阿贝尔反常出发。

要回答这些问题，需要发展一个更精细的指标定理，称为**族指标定理**（family index theorem）；见 Atiyah 与 Singer (1984)、Singer (1985) 以及 Sumitani (1984, 1985)。下一节我们按 Alvarez-Gaumé 与 Ginsparg (1984) 的工作，概述物理学家处理这个问题的方法。`}</Tx>
      </Sub>
    </Sec>);
}
