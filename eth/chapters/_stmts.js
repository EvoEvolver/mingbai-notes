// 全文"陈述登记表"：每个编号的定义/引理/命题/定理，以及证明链上起作用的未编号论断（F:…）、外部引用（X:…）与结论（C:…）。
// 这是全站唯一的数据源：<Stmt id> 渲染陈述与学习笔记，<SRef id> 悬停预览、点击跳转，<DepGraph> 画依赖图。
// 字段：kind（definition|lemma|proposition|theorem|fact|cited|corollary）、n（原文编号）、ch（所在页）、en/zh（标题）、page（PDF 页）、
//   stmt（中文陈述，数学与原文逐字符一致）、deps（证明直接用到的陈述/论断）、role（在整体证明中的作用）、
//   key（证明中最关键的一步）、pitfall（读者容易卡住的地方）、status（checked 已逐步核对 | filled 原文略写、本站已补全 | note 有勘误/注记）、statusNote。
const R = String.raw;

export const STMTS = {
  // ======================= §2 =======================
  "F:add": {
    kind: "fact", n: "(2.2)", ch: "ch02", en: "Permanent addition formula", zh: "积和式加法公式", page: 3, eq: "2.2",
    stmt: R`对任意 $n\times n$ 矩阵 $B,C$：$\per(B+C)=\sum_{S,T\subseteq[n],\,|S|=|T|}\per(B[S^c,T^c])\,\per(C[S,T])$，空矩阵的积和式为 1。`,
    deps: [], status: "checked",
    role: R`把"大积和式"拆成"大子矩阵积和式 × 小扰动积和式"之和。§3 用它求导数（$B=A(t_0)$，$C=\Delta(z)$）。`,
    key: R`把 $B+C$ 的每个被选中的元素按来源（来自 $B$ 还是 $C$）展开；用 $C$ 匹配的行列集合记作 $S,T$。`,
    pitfall: R`$S,T$ 是"用 $C$ 匹配的"行与列，$B$ 作用在补集 $S^c,T^c$ 上；两者大小必须相等。`,
  },
  "F:lowrank": {
    kind: "fact", n: "(2.5)", ch: "ch02", en: "Low-rank permanent by color counts", zh: "低秩积和式：数颜色而非数子集", page: 4, eq: "2.5",
    stmt: R`若 $E=UV^{\mathsf T}$ 的秩至多 $r$，则 $\per(E)=\sum_{|\nu|=n}\nu!\,D_L(n,\nu)D_R(n,\nu)$，可在 $O\big(r\binom{n+r}{r}\big)$ 次算术运算内算出（$r\le n$ 时为 $n^{O(r)}$）。`,
    deps: [], status: "checked",
    role: R`引理 2.1 的"低秩"一半；它让秩 $r$ 的修正只付出 $n^{O(r)}$ 而不是 $2^n$。`,
    key: R`每条 $E$-边选一种颜色 $a$，其权重 $U_{ia}V_{ja}$ 拆成左端点权与右端点权；端点着色后，同色端点之间任意配对，共 $\nu!$ 种，权重都相同。`,
    pitfall: R`DP 状态只记录"每种颜色用了几次"（向量 $\nu$），不记录用了哪些端点——这正是从 $2^n$ 降到 $\binom{n+r}{r}$ 的原因。负权重同样成立。`,
  },
  "L2.1": {
    kind: "lemma", n: "2.1", ch: "ch02", en: "Structured permanents", zh: "结构化积和式", page: 4,
    stmt: R`设 $A=B+E$，其中 $B$ 有大小至多 $s$ 的对应对角块，且 $\rank(E)\le r$。则 $A$ 的积和式以及 $A$ 的**每个方子矩阵**的积和式，都可以在 $\poly(n)\,2^{O(s)}n^{O(r)}$ 次算术运算内算出。`,
    deps: ["F:lowrank"], status: "filled",
    statusNote: R`原文对"逐块卷积为何不重不漏"一句带过；本站在证明中补全了按"$B$-边/E-边"分解每个匹配的双射论证。`,
    role: R`特殊点上的计算引擎：§6 在每个特殊点 $t=i$ 得到 $A(i)=B_i+E_{\rm out}$，正好满足本引理的假设，代价 $T_0=2^{O(n/\log^{10}n)}$。`,
    key: R`颜色计数表可以**一块一块地**合并：每块独立枚举由 $B$ 匹配的 $S,T$（$\le 2^{2s}$ 种），剩余端点着色得表 $W_a(\nu,\xi)$，块与块之间只需把计数向量相加（卷积），最后 $\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$。`,
    pitfall: R`"$B$ 好算、$E$ 好算"并不意味着 $B+E$ 好算——关键是 $E$-边可以跨块，但它们只通过颜色计数向量相互作用。另：删去行列不破坏块结构、也不增加秩，所以"每个方子矩阵"同样适用（§3 正需要这一点）。`,
  },
  // ======================= §3 =======================
  "L3.1": {
    kind: "lemma", n: "3.1", ch: "ch03", en: "Derivatives from submatrix permanents", zh: "由子矩阵积和式求导数", page: 5,
    stmt: R`固定 $t_0$，并设 $A(t_0)$ 的每个方子矩阵的积和式都能在时间 $T$ 内算出。则对 $1\le h\le n/2$，全部值 $P(t_0),P'(t_0),\dots,P^{(h-1)}(t_0)$ 可在时间 $T\,\poly(n)(n/h)^{O(h)}$ 内一并算出，只要多项式矩阵元有多项式规模的描述与次数。`,
    deps: ["F:add", "L2.1"], status: "filled",
    statusNote: R`原文的求和上界 $\sum_{a<h}2^{O(a)}\binom{n}{a}^2\le(n/h)^{O(h)}$ 只写结论；本站补全了 Taylor 系数 $P^{(j)}=j!\,[z^j]P(t_0+z)$、$z^{|S|}$ 整除性、小积和式在 $\Q[z]/(z^h)$ 上的代价，以及 $\binom na\le\binom nh\le(en/h)^h$（唯一用到 $h\le n/2$ 之处）。`,
    role: R`把"在一点求 $h$ 阶以内的导数"化为"在该点求许多子矩阵的积和式"。这一步的代价 $(n/h)^{O(h)}$ 正是最终运行时间的主项。`,
    key: R`令 $\Delta(z)=A(t_0+z)-A_0$，每个元素被 $z$ 整除，故 $\per(\Delta(z)[S,T])$ 被 $z^{|S|}$ 整除：$j$ 阶导数只收到 $|S|\le j$ 的项的贡献 —— 式 \eqref{3.1}。`,
    pitfall: R`要的是 $A_0$ 的**子矩阵**积和式，而不是 $A'(t_0)$ 的积和式；导数矩阵完全不需要有结构。小的 $a\times a$ 积和式在 $\Q[z]/(z^h)$ 上用 Ryser 计算。`,
  },
  "F:hermite": {
    kind: "fact", n: "§3.1", ch: "ch03", en: "Hermite interpolation", zh: "Hermite 插值的唯一性", page: 6,
    stmt: R`若 $\deg P<\ell h$，则 $P$ 由它在 $\ell$ 个不同点处的 $0,\dots,h-1$ 阶导数唯一确定：两个候选之差被 $\prod_{i=1}^{\ell}(t-i)^h$ 整除，因而为零。`,
    deps: [], status: "checked",
    role: R`把 $\ell$ 个特殊点上的局部信息拼成整个 $P(t)$，再读出 $P(0)=\per(A)$。`,
    key: R`$\deg P\le nd$，只要 $\ell h>nd$ 即可；插值本身只是一个多项式规模的线性方程组。`,
    pitfall: R`节省来自 $d/\ell\ll1$：每个点只需 $h\approx nd/\ell$ 阶导数，远少于 $n$。`,
  },
  "P3.2": {
    kind: "proposition", n: "3.2", ch: "ch03", en: "Recovery from structured values", zh: "由结构化取值恢复积和式", page: 6,
    stmt: R`设 $A(0)=A$ 且 $\deg A(t)\le d$。对每个 $i\in[\ell]$，设 $A(i)$ 是一个块大小至多 $s$ 的分块矩阵与一个秩至多 $r$ 的矩阵之和。令 $h=\lfloor nd/\ell\rfloor+1\le n/2$。则 $\per(A)$ 可在 \eqref{3.2} 所示时间内算出，假定 $\ell,d$ 与精确输入描述都是多项式有界的。`,
    deps: ["L2.1", "L3.1", "F:hermite"], status: "checked",
    role: R`"算法"与"代数"的分界线：此后只需构造一个 $A(t)$，使特殊点上有结构、且 $d/\ell$ 小。`,
    key: R`在每个特殊点对所有方子矩阵用引理 2.1、用引理 3.1 求前 $h$ 阶导数；$\ell h>nd$ 后 Hermite 插值得 $P(0)$。`,
    pitfall: R`条件 $h\le n/2$ 需要 $d/\ell<1/2$ 左右——这是渐近才成立的条件（见第 6 节参数账本：$n$ 必须极大）。`,
  },
  // ======================= §4 =======================
  "L4.1": {
    kind: "lemma", n: "4.1", ch: "ch04", en: "Balanced greedy labeling", zh: "平衡贪心标号", page: 8,
    stmt: R`对固定的 $\Delta$ 与充分大的 $n$，只要 $4\Delta\sqrt n\le Q=q^\ell\le n$ 且 $q\ge4\Delta\ell$，就能确定性地在多项式时间内找到满足 (i)–(iii) 的标号 $\alpha(u),\beta(v)\in[q]^\ell$。`,
    deps: [], status: "note",
    statusNote: R`证明中"排除的标号总数 $<Q$"的计数本站逐项核对：满标号 $<Q/2$、重复有序对 $\le\Delta^2D\le Q/4$、坐标碰撞 $\le\Delta\ell Q/q\le Q/4$。注：假设 $Q\le n$ 在本引理的证明中没有用到，它用在随后的 \eqref{4.5}；"$n$ 充分大"具体只需 $n\ge4\Delta^2$（保证 $\Delta^2\le Q/8$）。`,
    role: R`给每行每列一个"词"标号，使每个非零元的两端标号**逐坐标都不同**、不同非零元的有序标号对互不相同。这是 §4.3 分解与引理 4.3 分块的前提。`,
    key: R`先标行（共享非零列的两行标号不同），再标列；对每一列，被禁止的词 = 已满的词 + 会造成重复有序对的词 + 与某个相邻行标号在某坐标相同的词，三者合计 $<Q$。`,
    pitfall: R`$D=\lceil2n/Q\rceil$ 是每个词最多被使用的次数；"满"的词不超过 $n/D\le Q/2$。逐坐标不同的约束只排除 $\le\ell Q/q$ 个词（每个坐标固定一个符号的词有 $Q/q$ 个）。`,
  },
  "F:balance": {
    kind: "fact", n: "(4.5)", ch: "ch04", en: "Coordinatewise balance", zh: "逐坐标平衡", page: 9, eq: "4.5",
    stmt: R`对每个位置 $i$ 与符号 $a$，$|I_{i,a}|,|J_{i,a}|\le\frac Qq\lceil\frac{2n}{Q}\rceil\le\frac{2n+Q}{q}\le\frac{3n}{q}$。`,
    deps: ["L4.1"], status: "checked",
    role: R`控制特殊点上每个块的大小 $s\le3n/q$。`,
    key: R`第 $i$ 位为 $a$ 的词有 $Q/q$ 个，每个词至多用 $D$ 次；最后一步用到 $Q\le n$。`,
    pitfall: R`控制块大小的是"第 $i$ 个符号相同的行"这一类，而不是"整个词相同的行"。`,
  },
  "F:factor": {
    kind: "fact", n: "(4.7)", ch: "ch04", en: "Factorization through Boolean cubes", zh: "经由布尔立方体的分解", page: 9, eq: "4.7",
    stmt: R`$A=LR=LIR=L\cJ R'$，其中 $\cJ=I_C\otimes X^{\otimes\ell}$、$R'=\cJ R$；中间坐标 $\Omega\cong C\times\{0,1\}^\ell$ 是 $|C|=\binom q2^\ell$ 个布尔立方体的并。`,
    deps: ["L4.1"], status: "checked",
    role: R`把输入矩阵写成"输入相关的 $L,R'$ 夹着一个与输入无关的中间矩阵"。之后只需变形中间矩阵 $X^{\otimes\ell}$。`,
    key: R`$X^{\otimes\ell}$ 翻转所有方向位，也就是把有序词对 $(a,b)$ 换成 $(b,a)$；$\cJ^2=I$ 保证 $L\cJ R'=LR$。`,
    pitfall: R`$L$ 在有序词对 $(\alpha(u),\beta(v))$ 处存元素值，$R'$ 在**反向**词对 $(\beta(v),\alpha(u))$ 处存列指示——所以把 $\cJ$ 换成 $I$ 后，$L$ 与 $R'$ 读的是同一个词的第一个分量。`,
  },
  "D4.2": {
    kind: "definition", n: "4.2", ch: "ch04", en: "i-nice", zh: R`$i$-好矩阵`, page: 9,
    stmt: R`以 $\{0,1\}^\ell$ 为指标的矩阵 $K$ 称为 **$i$-好的**（$i$-nice），如果把第 $i$ 个张量因子移到最前之后，它形如 $I_2\otimes B$；等价地 $K[x,y]=\one\{x_i=y_i\}\,B[x_{-i},y_{-i}]$ —— 式 \eqref{4.8}。`,
    deps: [], status: "checked",
    role: R`"在第 $i$ 个坐标上什么也不做"的形式化。中间矩阵在特殊点 $t=i$ 处是 $i$-好的，外层矩阵就分块（引理 4.3）。`,
    key: R`$K$ 保持第 $i$ 位，且对其余位的作用与第 $i$ 位的取值无关：按第 $i$ 位分组得到两个**相同**的对角块。`,
    pitfall: R`$I$ 对每个 $i$ 都是 $i$-好的；$X^{\otimes\ell}$ 对任何 $i$ 都不是。$\ell=1$ 时 $i$-好矩阵恰为 $I_2$ 的数量倍。`,
  },
  "L4.3": {
    kind: "lemma", n: "4.3", ch: "ch04", en: "Niceness gives block structure", zh: "好性给出分块结构", page: 10,
    stmt: R`对每个 $i$-好的 $K$，矩阵 $L(I_C\otimes K)R'$ 有以 $a\in[q]$ 为指标的对应对角块，行组为 $I_{i,a}$、列组为 $J_{i,a}$。每块至多 $3n/q$ 行、$3n/q$ 列。`,
    deps: ["F:factor", "D4.2", "F:balance"], status: "checked",
    role: R`把"中间矩阵在第 $i$ 坐标上是恒等"翻译成"外层 $n\times n$ 矩阵按第 $i$ 个符号分块"——引理 2.1 的 $B$ 部分由此而来。`,
    key: R`元素 $(u,v)$ 的贡献经过中间标号 $(\alpha(u),\beta(v'))$ 与 $(\beta(v),\alpha(u'))$；中间矩阵不出立方体且保持方向位 $i$，故第 $i$ 位上的有序对相同，比较第一个符号得 $\alpha(u)_i=\beta(v)_i$。`,
    pitfall: R`证明只用到"保持第 $i$ 位"；更强的 $I_2\otimes B$ 形式之所以被采用，是因为 §5 的多项式构造天然给出它。`,
  },
  "F:survive": {
    kind: "fact", n: "(4.9)", ch: "ch04", en: "Low rank survives the factorization", zh: "低秩在分解中保持", page: 10, eq: "4.9",
    stmt: R`若 $K=K_i+E$，$K_i$ 为 $i$-好的且 $\rank(E)\le\varepsilon2^\ell$，则 $L(I_C\otimes K)R'=B_i+E_{\rm out}$，$E_{\rm out}=L(I_C\otimes E)R'$，$\rank(E_{\rm out})\le\varepsilon M$。`,
    deps: ["L4.3"], status: "checked",
    role: R`允许中间矩阵只是"近似 $i$-好"：误差的秩乘以立方体个数 $|C|$ 后仍是 $M$ 的一个小比例。`,
    key: R`$\rank(I_C\otimes E)=|C|\rank(E)\le|C|\varepsilon2^\ell=\varepsilon M$，再左右乘 $L,R'$ 不增秩。`,
    pitfall: R`误差不是被丢弃的近似，而是被**精确地**作为低秩部分交给引理 2.1。`,
  },
  // ======================= §5 =======================
  "F:hadamard": {
    kind: "fact", n: "(5.2)–(5.4)", ch: "ch05", en: "Hadamard change of basis", zh: "Hadamard 换基：函数 ↔ 对角矩阵", page: 11, eq: "5.4",
    stmt: R`$H_\ell\,p(\sum_jc_jZ_j)\,H_\ell=p(\sum_jc_jX_j)$；对 $g:\{-1,1\}^\ell\to\R$ 有 $H_\ell D_gH_\ell=g(X_1,\dots,X_\ell)$；且 $\rank(H_\ell(D_g-D_h)H_\ell)=|\{x:g(x)\ne h(x)\}|$。`,
    deps: [], status: "checked",
    role: R`把"矩阵多项式的秩"翻译成"布尔函数在多少个输入上不等"——这是定理 5.1 秩界的来源。`,
    key: R`$H_\ell Z_jH_\ell=X_j$，共轭保持加法与乘法；$D_g$ 是对角阵，不等的输入个数就是非零对角元的个数。`,
    pitfall: R`$1/\sqrt2$ 因子只出现在秩的证明里，算法本身只用 (5.7) 的有理矩阵。`,
  },
  "F:parity": {
    kind: "fact", n: "(5.5)–(5.6)", ch: "ch05", en: "A polynomial agreeing with parity on most inputs", zh: "在绝大多数输入上等于奇偶性的低次多项式", page: 11, eq: "5.6",
    stmt: R`取 $d=\lceil100\sqrt{\ell\log\ell}\rceil$，在以 $\ell/2$ 为中心的 $d+1$ 个连续整数 $k$ 上插值 $p(\ell-2k)=(-1)^k$。则 $\Pr_x\big[p(\sum_jx_j)\ne\chi(x)\big]\le2\exp(-d^2/8\ell)\le\ell^{-100}$。`,
    deps: [], status: "filled",
    statusNote: R`原文只说"初等二项尾界"；本站写出所用的 Hoeffding 不等式 $\Pr[|k-\ell/2|>d/4]\le2e^{-2(d/4)^2/\ell}$，并在交互图中验证常数 100 留有很大余量（约 24 已足够）。`,
    role: R`低次多项式**不可能**处处等于奇偶性（需要次数 $\ell$），但可以在除 $\ell^{-100}$ 比例外的所有输入上**精确**相等——误差集合小，就是误差矩阵秩小。`,
    key: R`二项分布集中在 $\ell/2$ 附近 $O(\sqrt\ell)$ 的窗口内；只要插值窗口覆盖 $\pm d/4$，窗口外的概率质量就是 $\ell^{-100}$ 量级。`,
    pitfall: R`这是"在小例外集之外精确相等"，不是数值上的一致逼近：在例外输入上 $p$ 的值可以非常大。`,
  },
  "T5.1": {
    kind: "theorem", n: "5.1", ch: "ch05", en: "Low-degree deformation", zh: "低次变形", page: 10,
    stmt: R`对充分大的 $\ell$，存在可显式构造的矩阵多项式 $J(t)\in\Q[t]^{2^\ell\times2^\ell}$，次数 $d=O(\sqrt{\ell\log\ell})$，满足 $J(0)=X^{\otimes\ell}$，$J(i)=K_i+E\ (i=1,\dots,\ell)$，其中每个 $K_i$ 是 $i$-好的，且**同一个**矩阵 $E$ 满足 $\rank(E)\le2^\ell/\ell^{100}$。构造在 $2^\ell$ 的多项式时间内完成，系数为多项式比特的有理数。指数 100 可换成任意固定常数，只改变次数界中的常数。`,
    deps: ["D4.2", "F:hadamard", "F:parity"], status: "checked",
    role: R`全文的代数核心。精确的 $i$-好变形需要次数 $\ell$（§5.1），允许一个**公共的**低秩误差后次数降到 $\sqrt{\ell\log\ell}$，于是 $d/\ell\to0$。`,
    key: R`$J(t)=p\big(\sum_j(1-t/j)X_j\big)+E$：在 $t=i$ 时 $X_i$ 的系数消失，剩下的多项式不含 $X_i$，自动是 $i$-好的；$E=X^{\otimes\ell}-p(\sum_jX_j)$ 经 Hadamard 换基后是对角阵，非零元个数 = $p$ 偏离奇偶性的输入数。`,
    pitfall: R`$E$ 与 $t$ 无关，在所有特殊点上相同——这让 §6 的 $E_{\rm out}$ 也只有一个。注意 $X^{\otimes\ell}=\chi(X_1,\dots,X_\ell)=X_1\cdots X_\ell$。`,
  },
  // ======================= §6 =======================
  "F:At": {
    kind: "fact", n: "(6.2)", ch: "ch06", en: "The deformation A(t)", zh: R`变形族 $A(t)$`, page: 12, eq: "6.2",
    stmt: R`取参数 \eqref{6.1}，令 $A(t)=L(I_C\otimes J(t))R'$。则 $A(0)=A$、$\deg A(t)\le d$，且对每个 $i\in[\ell]$，$A(i)=B_i+E_{\rm out}$，$s\le3n/q$，$r:=\rank(E_{\rm out})\le M/\ell^{100}$。`,
    deps: ["F:factor", "T5.1", "L4.3", "F:survive", "L4.1"], status: "checked",
    role: R`把 §4 的分解与 §5 的局部多项式拼在一起，得到命题 3.2 所要求的变形族。`,
    key: R`$J(0)=X^{\otimes\ell}$ 给出 $A(0)=L\cJ R'=A$；$J(i)=K_i+E$ 经引理 4.3 与 \eqref{4.9} 给出"小块 + 低秩"。`,
    pitfall: R`参数必须同时满足引理 4.1 的条件 $4\Delta\sqrt n\le Q\le n$、$q\ge4\Delta\ell$；\eqref{6.1} 的取法给出 $16\Delta\sqrt n\le Q<16\Delta q\sqrt n$。`,
  },
  "T6.1": {
    kind: "theorem", n: "6.1", ch: "ch06", en: "Sparse permanent", zh: "稀疏积和式", page: 13,
    stmt: R`对每个固定的 $\Delta$，每行每列至多 $\Delta$ 个非零元、元素为多项式比特有理数的 $n\times n$ 矩阵的积和式，可以精确地、确定性地在时间 \eqref{1.1} 内算出。`,
    deps: ["P3.2", "F:At"], status: "checked",
    role: R`主定理。`,
    key: R`$s=O(n/\log^{10}n)$、$r\log n=o(n/\log^{10}n)$，所以每个特殊点子矩阵积和式代价 $2^{O(n/\log^{10}n)}$；主项是导数代价 $h\log(n/h)=O\big(n(\log\log n)^2/\sqrt{\log n}\big)$。`,
    pitfall: R`精确算术：所有中间数（插值多项式 $p$、$L,R'$、秩分解、Hermite 方程组）都只有多项式比特长度，因此只带来多项式开销。`,
  },
  "X:valiant": {
    kind: "cited", n: "[Val79, BH93]", ch: "ch06", en: "Weighted permanent reductions", zh: "Valiant / Ben-Dor–Halevi 归约", page: 13,
    stmt: R`把 $n$ 个变量、$O(n)$ 个子句的 3-CNF 映到维数 $O(n)$、$O(n)$ 个非零元、有界整数权的矩阵，其积和式是满足赋值个数的一个已知非零倍数。`,
    deps: [], status: "checked",
    role: R`外部引用：把计数问题接到积和式上。`, key: R`线性规模的带权构造。`, pitfall: R`归约后的矩阵只是"总共 $O(n)$ 个非零元"，单个顶点的度可以很大——所以还需要下面的度数约简。`,
  },
  "F:reduce": {
    kind: "fact", n: "§6", ch: "ch06", en: "From sparse 3-CNF to bounded-degree permanent", zh: R`稀疏 3-CNF → 有界度积和式`, page: 13,
    stmt: R`把二部图中度为 $k$ 的顶点换成 $2k-1$ 个顶点的路径（原有边接在奇数位置，路径边权 1），保持带权匹配和不变，得到最大度 3、线性规模的矩阵。于是定理 6.1 在 \eqref{1.1} 时间内计数稀疏 3-CNF。`,
    deps: ["X:valiant", "T6.1"], status: "filled",
    statusNote: R`原文给出"恰好用一条外部边"的奇偶论证；本站补全了"内部完成唯一"与"两侧都替换后度数为 3"的细节，并做了可运行验证。`,
    role: R`把主定理变成 #3SAT 算法（稀疏情形）。`,
    key: R`路径的偶数位置顶点只有路径边，奇数位置比偶数位置多一个：恰有一个奇数位置用外部边，其两侧各是偶数长度的路径，完美匹配唯一。`,
    pitfall: R`两个奇数位置都用外部边会留下奇数长的内部区间；都不用会留下奇数个顶点的路径——两种情况都无完美匹配。`,
  },
  "C:NTIME": {
    kind: "corollary", n: "§6", ch: "ch06", en: "Nondeterministic time", zh: "非确定时间的推论", page: 13,
    stmt: R`借助 [Sub26] 的调度条件编码，$\NTIME(T)\subseteq\DTIME\big(2^{O(T(\log\log T)^3/\sqrt{\log T})}\big)$。`,
    deps: ["F:reduce", "X:sub26"], status: "checked",
    role: R`一个推论；非平凡成分是 [Sub26] 的编码，与本文的积和式算法分开。`,
    key: R`$2^{O(T\log\log T/\log T)}$ 个公式，每个 $N=O(T\log\log T)$ 个变量与子句；$\rho(N)=O(T(\log\log T)^3/\sqrt{\log T})$。`,
    pitfall: R`多出的一个 $\log\log T$ 因子来自公式规模 $N=T\log\log T$。`,
  },
  "X:sub26": {
    kind: "cited", n: "[Sub26]", ch: "ch06", en: "Schedule-conditioned encoding", zh: "调度条件编码", page: 13,
    stmt: R`把时间 $T$ 的固定带数非确定多带图灵机的接受计算归约为至多 $2^{O(T\log\log T/\log T)}$ 个公式，每个有 $O(T\log\log T)$ 个变量与子句。`,
    deps: [], status: "checked", role: R`外部引用。`, key: "", pitfall: "",
  },
  // ======================= 附录 A =======================
  "F:pairing": {
    kind: "fact", n: "(A.3)", ch: "appA", en: "Counting identity as a polynomial pairing", zh: "计数恒等式 = 多项式配对", page: 14, eq: "A.3",
    stmt: R`令 $F=\prod_bF_b$（\eqref{A.1}），则 $z^\nu w^\xi$ 的系数正是 $W(\nu,\xi)$，且 $\per(B+UV^{\mathsf T})=\cL_r(F)$，其中 $\cL_r(z^\nu w^\xi)=\nu!\,[\nu=\xi]$。`,
    deps: ["L2.1"], status: "filled", statusNote: R`本站补全了"展开 $\prod u_i(z)$ ⇔ 端点着色"的对应，并用两个 $1\times1$ 块的小例子说明 $\nu!$ 为何必需。`,
    role: R`把引理 2.1 的颜色计数表看成一个多项式的系数；于是不必存表，只需能**求值**。`,
    key: R`$\prod_iu_i(z)$ 展开时每个 $z_a$ 的指数正好数出颜色 $a$ 的使用次数。`,
    pitfall: R`$F_b$ 在固定数值 $z,w$ 下的求值只需枚举 $2^{2s}$ 对 $S,T$，多项式空间。`,
  },
  "F:numpair": {
    kind: "fact", n: "(A.5)", ch: "appA", en: "Interpolate the functional", zh: "插值泛函而非系数表", page: 14, eq: "A.5",
    stmt: R`$\cL_r(F)=\sum_{a,b\in\{0,\dots,n\}^r}\big(\prod_{c=1}^r\kappa_{a_cb_c}\big)F(a,b)$，其中 $\kappa_{ab}=\sum_kk!\,[t^k]\Lambda_a(t)\,[t^k]\Lambda_b(t)$。`,
    deps: ["F:pairing"], status: "filled",
    statusNote: R`原文"展开到张量积 Lagrange 基"一句；本站写出单变量情形 $\cL_1(\Lambda_a(z)\Lambda_b(w))=\kappa_{ab}$ 的计算并做了数值验证。`,
    role: R`每个网格点求一次 $F$、乘权重、累加、丢弃：时间仍为 $2^{O(s)}n^{O(r)}$，空间降为多项式。`,
    key: R`每个变量次数 $\le n$，所以 $F$ 由它在 $\{0,\dots,n\}^{2r}$ 网格上的值决定；泛函 $\cL_r$ 在各坐标上分解。`,
    pitfall: R`网格点有 $(n+1)^{2r}$ 个——与系数表一样多，但我们只是逐个访问，不存储。`,
  },
  "C:space": {
    kind: "corollary", n: "§A.3", ch: "appA", en: "Polynomial space", zh: R`定理 6.1 可在多项式空间内完成`, page: 15,
    stmt: R`对 \eqref{3.1} 中的每个大子矩阵积和式使用 \eqref{A.5}，顺序枚举特殊点与行列子集；小扰动积和式在 $\Q[z]/(z^h)$ 上用 Ryser；只保留 $\ell h$ 个导数值。于是定理 6.1 在多项式空间内成立。`,
    deps: ["F:numpair", "L3.1", "T6.1", "F:hermite"], status: "filled", statusNote: R`本站逐层补全了空间分析：特殊点、$h$ 个累加器、顺序枚举 $S,T$、Ryser（而非子集 DP）在 $\Q[z]/(z^h)$ 上、Hermite 方程组用无分数（Bareiss）消元。`,
    role: R`空间版本的主定理。`, key: R`所有枚举都是顺序的，只累加。`, pitfall: R`最后的 Hermite 线性方程组也只有多项式规模。`,
  },
  // ======================= 附录 B =======================
  "X:sparsify": {
    kind: "cited", n: "[CIP06, DHMTW14]", ch: "appB", en: "Counting sparsification", zh: "计数稀疏化", page: 15,
    stmt: R`参数 $\sigma$ 的不交计数稀疏化给出至多 $2^{\sigma n}$ 个不交叶子，每个有 $O(n\sigma^{-9})$ 个子句，其满足赋值划分原公式的满足赋值。`,
    deps: [], status: "checked", role: R`外部引用：把任意 3-CNF 化为子句数接近线性的若干公式。`, key: "", pitfall: R`取 $\sigma=1/\lceil\log n\rceil$ 时叶子有 $n\log^{O(1)}n$ 个子句，不能直接套用主定理（变量数会随子句数增长），所以需要附录 B 的新工具。`,
  },
  "LB.1": {
    kind: "lemma", n: "B.1", ch: "appB", en: "Local-product counting", zh: "局部乘积计数", page: 15,
    stmt: R`设 $\phi_1,\dots,\phi_N$ 是 $v$ 个布尔变量上的多项式因子，每个至多依赖 $(\log v)^c$ 个变量；把不同因子中的同一变量出现视为独立的形式输入，$\Phi$ 为它们的乘积，$\deg\Phi\le av$、$N\le av$（$a,c$ 固定），系数可在 $\Q[u]/(u^b)$ 中。则 $\sum_{x\in\{0,1\}^v}\Phi$ 可在 $2^{O_{a,c}(\rho(v))}$ 次算术运算与多项式空间内确定性地算出；预先固定任意一部分变量时同样成立。`,
    deps: ["T5.1", "L4.1", "L4.3", "F:subst", "F:numpair"], status: "filled",
    statusNote: R`原文把 §4–§6 的整套机制平移到"拷贝映射 $C(\theta)$"上，多处只说"与之前相同"。本站逐段对应：贪心标号 ↔ 引理 4.1，分组 ↔ 引理 4.3，替换律 (B.1) ↔ 附录 A，布尔有限差分 (B.2) ↔ 引理 3.1。`,
    role: R`附录 B 唯一的新算法原语：把"矩阵变形"推广为"拷贝映射的变形"，从而对一个乘积式求和。`,
    key: R`拷贝矩阵 $C$（把变量向量送到各因子的输入出现）本身就是一个稀疏 0/1 矩阵，可以像 $A$ 一样分解为 $L(I_{C_*}\otimes X^{\otimes\ell_*})R'$ 并变形；特殊点上"局部部分"按第 $i$ 个符号把变量分组，低秩部分用形式变量 $z$ 与截断指数 $e_D$ 配对。`,
    pitfall: R`导数不再用子矩阵积和式，而用布尔有限差分：$F_{x,j}(y)$ 对 $y$ 的次数 $\le j$，多线性化后用 Möbius 反演 —— 式 \eqref{B.2}。`,
  },
  "F:subst": {
    kind: "fact", n: "(B.1)", ch: "appB", en: "Substitution property", zh: "截断指数的替换律", page: 16, eq: "B.1",
    stmt: R`令 $D=\lceil av\rceil$，$e_D(t)=\sum_{j=0}^Dt^j/j!$。对 $\deg F\le D$，$\cL_r\big(F(z)e_D(w\cdot y)\big)=F(y)$。`,
    deps: ["F:pairing"], status: "checked",
    role: R`把共享线性型 $V^{\mathsf T}x$ 换成形式变量 $z$，事后再"代回"。`,
    key: R`$e_D(w\cdot y)$ 中 $w^\nu$ 的系数是 $y^\nu/\nu!$，与配对中的 $\nu!$ 抵消。`,
    pitfall: R`各组截断指数的乘积在 $w$-次数 $\le D$ 内与 $e_D(w\cdot V^{\mathsf T}x)$ 一致；更高次项与 $z$-次数 $\le D$ 的 $F$ 配不上，自动消失。`,
  },
  "TB.2": {
    kind: "theorem", n: "B.2", ch: "appB", en: "Sparse quartic gap", zh: "稀疏四次多项式的 gap", page: 17,
    stmt: R`对每个固定的 $c$，$\F_2$ 上次数至多 4、显式列出至多 $v(\log v)^c$ 个单项式的多项式的 gap，可在 $2^{O_c(\rho(v))}$ 次比特运算与多项式空间内精确、确定性地算出。`,
    deps: ["LB.1"], status: "checked",
    role: R`计数工具：数一个稀疏四次 $\F_2$-多项式的零点个数 $=(2^v+\gap(Q))/2$。`,
    key: R`$(-1)^{Q(x)}=\prod_e(1-2m_e(x))$ 次数可达 $L$；引入标记 $u$ 并模 $u^b$（$b=v+2$）截断：被丢掉的项在布尔输入上被 $2^b$ 整除，而 $|\gap|\le2^v<2^{b-1}$，取中心剩余即得精确值。`,
    pitfall: R`截断后每个保留项的次数 $\le4(b-1)=O(v)$，正好满足引理 B.1 的 $\deg\Phi\le av$。`,
  },
  "LB.3": {
    kind: "lemma", n: "B.3", ch: "appB", en: "Vandermonde checks", zh: "Vandermonde 校验", page: 18,
    stmt: R`存在 $h_0=O(n/\log n)$ 个可显式构造的 $m$ 比特二元线性校验，使得每个通过全部校验的非零向量的重量都大于 $w$。`,
    deps: [], status: "checked",
    role: R`稠密校验：通过它们的"假"赋值必然违反很多（$>w$）子句，后面的随机短校验才容易抓住它们。`,
    key: R`在 $\F_{2^b}$ 中取互异非零 $\alpha_e$，施加 $\sum_e\alpha_e^jv_e=0\ (j<w)$；支撑 $k\le w$ 的非零解会让一个可逆的 $k\times k$ Vandermonde 矩阵有非零核，矛盾。`,
    pitfall: R`每个 $\F_{2^b}$ 方程按二元基展开成 $b$ 个 $\F_2$ 方程，所以 $h_0=bw$。这就是 BCH/Reed–Solomon 码的校验矩阵。`,
  },
  "LB.4": {
    kind: "lemma", n: "B.4", ch: "appB", en: "Mixed-check counting", zh: "混合校验计数", page: 18,
    stmt: R`给定 $h_0=O(n/\log n)$ 个任意二元线性校验与 $s=O(n)$ 个额外校验（每个至多涉及 $L=\log^{O(1)}n$ 个子句违反位），通过全部校验的赋值个数可在 $2^{O(\rho(n))}$ 次比特运算与多项式空间内算出。`,
    deps: ["TB.2"], status: "checked",
    role: R`把"通过校验的赋值数"写成 $2^{h_0}$ 个四次多项式 gap 的平均。`,
    key: R`对每个校验用 $\one\{b=0\}=\frac12\sum_{a\in\F_2}(-1)^{ab}$；稠密校验用 $u\in\F_2^{h_0}$ 枚举，短校验用新变量 $z_j$ 引入，得到 \eqref{B.4}。`,
    pitfall: R`$z_j\cdot(a_j\cdot v(x))$ 是"一次 × 三次"= 四次；稠密部分 $(u^{\mathsf T}C)\cdot v(x)$ 是三次但可能有 $8m$ 个单项式——仍是 $n\log^{O(1)}n$。`,
  },
  "F:select": {
    kind: "fact", n: "§B.5", ch: "appB", en: "Choose short checks by exact counting", zh: "用精确计数挑选短校验", page: 19,
    stmt: R`每轮枚举全部 $(2m)^L$ 个候选短校验，用引理 B.4 计数，选使计数最小者；$3n$ 轮后假幸存者少于 $2^n(3/4)^{3n}<1$，最后的计数恰为满足赋值数。`,
    deps: ["LB.3", "LB.4"], status: "filled",
    statusNote: R`原文的概率估计 "$>1-e^{-1}$" 与 "$>1/4$" 本站补全为 $(1-k/m)^L\le e^{-wL/m}\le e^{-1}$ 与 $\frac12(1-e^{-1})\approx0.316>\frac14$。`,
    role: R`把概率方法"去随机化"：平均论证保证存在好候选，精确计数把它找出来。`,
    key: R`真满足赋值通过所有候选，所以"总计数最小"⇔"假幸存者最少"；平均意义下随机候选淘汰 $>1/4$ 的假幸存者。`,
    pitfall: R`$2^n(3/4)^{3n}=(27/32)^n<1$。唯一的概率论证只用于证明存在性，算法本身完全确定。`,
  },
  "TB.5": {
    kind: "theorem", n: "B.5", ch: "appB", en: "Arbitrary #3SAT", zh: "任意 #3SAT", page: 19,
    stmt: R`任意 $n$ 变量 3-CNF 的满足赋值个数，可以在 $2^{O\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right)}$ 时间与多项式空间内精确、确定性地算出（不计多项式的输入读取开销）。`,
    deps: ["X:sparsify", "F:select"], status: "checked",
    role: R`全文的最终结论：#3SAT（从而 3SAT）有 $2^{o(n)}$ 时间算法。`,
    key: R`参数 $1/\lceil\log n\rceil$ 的计数稀疏化给出 $2^{O(n/\log n)}$ 个公式，每个用 §B.3–B.5 的流程精确计数后相加。`,
    pitfall: R`没有任何一步丢弃秩误差或计数误差。`,
  },
  "C:ETH": {
    kind: "corollary", n: "标题", ch: "ch01", en: "ETH is false", zh: "指数时间假设不成立", page: 1,
    stmt: R`ETH 断言 3SAT 需要 $2^{\Omega(n)}$ 时间。由定理 B.5（或稀疏情形下的定理 6.1 + 归约），3SAT 可在 $2^{O(n(\log\log n)^2/\sqrt{\log n})}=2^{o(n)}$ 时间内判定，故 ETH 不成立。`,
    deps: ["TB.5", "F:reduce"], status: "checked",
    role: R`论文标题所说的结论。`, key: R`计数算法自然给出判定算法（计数 $>0$ 即可满足）。`, pitfall: R`由稀疏化引理，ETH 对 $O(n)$ 子句的 3-CNF 已等价，所以稀疏情形（第 6 节）就足以推出结论；附录 B 进一步给出任意 3-CNF 的同一界。`,
  },
};

// 全局依赖图默认边集（从 deps 生成）
export const DEP_EDGES = Object.entries(STMTS).flatMap(([id, s]) => (s.deps || []).map(d => ({ from: d, to: id })));

export const KIND_LABEL = { definition: "定义", lemma: "引理", proposition: "命题", theorem: "定理", fact: "论断", cited: "引用", corollary: "推论" };
export const STATUS_LABEL = { checked: "✔ 已逐步核对", filled: "✚ 原文略写，本站已补全", note: "✎ 有注记" };
export const stmtLabel = id => { const s = STMTS[id]; if (!s) return id; const k = KIND_LABEL[s.kind]; return s.kind === "fact" || s.kind === "cited" ? `${s.zh} ${s.n}` : `${k} ${s.n}`; };
