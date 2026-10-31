// 第 1 页高层理解层：开场、路线图（纲要九步）、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "一个 1963 年的公式，和一道 2^n 的墙";
export const HOOK = R`积和式（permanent）长得和行列式一模一样，只是把所有的正负号都换成了加号。行列式用高斯消元 $O(n^3)$ 就能算，积和式却是 #P-完全的：1963 年 Ryser 给出的容斥公式要 $2^n$ 量级的运算，此后六十年里，一般矩阵的积和式没有本质更快的精确算法。

指数时间假设（ETH）把这种"墙"写成了一个精确的猜想：3SAT 没有 $2^{o(n)}$ 时间的算法。由于 #3SAT 可以线性规模地归约到稀疏矩阵的积和式，ETH 也意味着：每行每列只有常数个非零元的积和式，同样没有 $2^{o(n)}$ 算法。

这篇论文给出的正是这样一个算法：稀疏积和式可以在 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 时间内确定性地精确算出。它的想法既不是更聪明的枚举，也不是近似，而是**插值**：把 $A$ 嵌入一个低次矩阵多项式 $A(t)$，在少数几个"好算的点"上求积和式的低阶导数，再把 $P(t)=\per(A(t))$ 拼回来。本页先给出完整地图：九个步骤、它们之间的依赖关系，以及参数是怎样一项项"记账"得到最终指数的。`;

export const ROADMAP = [
  { sec: "1(1)", title: "结构化积和式（第 1 步 → §2）", gist: R`小块 $s$ + 低秩 $r$ 的矩阵，积和式（及**每个方子矩阵**的积和式）代价 $2^{O(s)}n^{O(r)}$——引理 2.1。`, gives: [], next: R`光会算"好矩阵"还不够：要把一般稀疏矩阵和好矩阵联系起来。` },
  { sec: "1(2)", title: "导数来自子矩阵积和式（第 2 步 → §3）", gist: R`若 $A(t_0)$ 的每个方子矩阵都好算（时间 $T$），则 $P(t_0),\dots,P^{(h-1)}(t_0)$ 只需 $T\,\poly(n)(n/h)^{O(h)}$——引理 3.1。`, gives: [], next: R`于是只要造一个"有很多好点"的多项式族。` },
  { sec: "1(3)", title: "造一个多好点的族（第 3 步 → §4–§6）", gist: R`$A(0)=A$、$\deg A(t)\le d=O(\sqrt{\log n})$，并在 $\ell=\Theta(\log n/\log\log n)$ 个点 $t=1,\dots,\ell$ 上是"小块 + 低秩"。`, gives: ["1.2"], next: R`有了族，插值的账怎么算？` },
  { sec: "1(4)", title: "用导数插值（第 4 步 → §3.1、§6）", gist: R`$\deg P\le nd$；$\ell h>nd$ 即可唯一确定 $P$。取 $h=\lfloor nd/\ell\rfloor+1$，总时间 \eqref{1.1}。节省来自 $d/\ell\ll1$。`, gives: ["1.1"], next: R`剩下的全是代数：怎样造出 $A(t)$？` },
  { sec: "1(5)", title: "给行列贴词标号（第 5 步 → §4.2）", gist: R`标号取自 $[q]^\ell$，$q=\lceil(\log n)^{10}\rceil$，$Q=q^\ell\approx\sqrt n$；每个非零元的两端标号逐坐标不同——引理 4.1。`, gives: [], next: R`标号把 $A$ 的结构编码进中间坐标。` },
  { sec: "1(6)", title: "经布尔立方体分解（第 6 步 → §4.3）", gist: R`$A=L\cJ R'$，$\cJ=I_C\otimes X^{\otimes\ell}$；中间坐标是 $|C|$ 个 $\{0,1\}^\ell$ 的拷贝。`, gives: [], next: R`中间矩阵与输入无关——只需变形它。` },
  { sec: "1(7)", title: "放过一个坐标（第 7 步 → §4.4）", gist: R`若把 $X^{\otimes\ell}$ 换成 $i$-好的 $K$，则 $L(I_C\otimes K)R'$ 按第 $i$ 个符号分成 $q$ 块，每块 $O(n/q)$——引理 4.3。`, gives: [], next: R`但精确的 $i$-好变形需要次数 $\ell$，太贵。` },
  { sec: "1(8)", title: "允许低秩修正（第 8 步 → §4.4、§5）", gist: R`只需 $J(i)=K_i+E$，$\rank(E)\le2^\ell/\ell^{100}$，同一个 $E$ 用于所有点；输出修正秩 $\le M/\ell^{100}$。`, gives: [], next: R`低秩修正从哪里来？从"几乎处处等于奇偶性"的低次多项式。` },
  { sec: "1(9)", title: "由奇偶性得到多项式（第 9 步 → §5）", gist: R`次数 $d=O(\sqrt{\ell\log\ell})$ 的 $p$ 在除 $\ell^{-100}$ 比例外的输入上等于 $x_1\cdots x_\ell$；\eqref{1.3} 给出所需的 $J(t)$——定理 5.1。`, gives: ["1.3"] },
];

export const groups = [
  { id: "goal", label: "目标与背景" },
  { id: "algo", label: "算法引擎" },
  { id: "alg", label: "代数构造" },
  { id: "acct", label: "参数账本" },
];

export const concepts = [
  { id: "permanent", name_zh: "积和式", name_en: "permanent", icon: "🧮", group: "goal",
    plain: "行列式去掉正负号：所有完美匹配的权重之和。",
    explain: R`$\per(A)=\sum_{\pi\in S_n}\prod_uA_{u,\pi(u)}$。把 $A$ 看成二部图（行在左、列在右，非零元是带权的边），积和式就是全部完美匹配的权重和。

没有符号意味着没有消元：行列式的多重线性 + 反对称让高斯消元成立，积和式只有多重线性。0/1 矩阵的积和式数二部图的完美匹配，是 #P-完全的（Valiant 1979）。`,
    analogy: "行列式像带正负号的账本，许多项互相抵消，所以可以走捷径；积和式像只进不出的账本，每一笔都要算进去。",
    book_example: { what: R`§2.1 的子集 DP 与 Ryser 公式 \eqref{2.1} 都是 $2^n$ 量级。`, point: "这是要打破的基线。" },
    misconception: "积和式不是行列式的绝对值，也不能通过对行列式做小修改得到。" },
  { id: "eth", name_zh: "指数时间假设", name_en: "Exponential Time Hypothesis (ETH)", icon: "⏳", group: "goal",
    plain: R`猜想：3SAT 需要 $2^{\Omega(n)}$ 时间。`,
    explain: R`ETH（Impagliazzo–Paturi 2001）断言存在 $\delta>0$ 使 $n$ 变量 3SAT 不能在 $2^{\delta n}$ 时间内判定。由稀疏化引理，它对子句数 $O(n)$ 的 3-CNF 同样等价。

#3SAT 经线性规模归约变成稀疏积和式（第 6 节），所以稀疏积和式的 $2^{o(n)}$ 算法 ⇒ #3SAT 的 $2^{o(n)}$ 算法 ⇒ 3SAT 的 $2^{o(n)}$ 算法，即 ETH 不成立（\sref{C:ETH}）。`,
    analogy: "像一条关于“没有任何捷径能把指数墙削低到亚指数”的公理；本文的算法就是这样一条捷径。",
    book_example: { what: R`论文标题与第 6 节的归约；附录 B 把结论推广到任意 3-CNF（\sref{TB.5}）。`, point: "计数算法自然给出判定算法。" },
    misconception: R`$2^{o(n)}$ 不等于多项式时间：$2^{n(\log\log n)^2/\sqrt{\log n}}$ 仍是超多项式的，与 P≠NP 无关。` },
  { id: "structured", name_zh: "小块 + 低秩", name_en: "blocks plus low rank", icon: "🧱", group: "algo",
    plain: "分块矩阵加一个低秩矩阵，积和式仍好算。",
    explain: R`$B$ 有大小 $\le s$ 的对应对角块、$\rank(E)\le r$，则 $\per(B+E)$ 只需 $2^{O(s)}n^{O(r)}$（\sref{L2.1}）。块内枚举由 $B$ 匹配的端点（$\le2^{2s}$ 种），其余端点交给 $E$ 并只记录"每种颜色用了几次"。

关键是表可以一块一块地合并；而且删去任何行列都保持这个结构，所以每个方子矩阵也好算——这正是第 3 节求导所需要的。`,
    analogy: "拼图：每一小块内部可以暴力拼；块与块之间的连接只看“颜色的数量”，不看具体是谁。",
    book_example: { what: R`§6：每个特殊点 $A(i)=B_i+E_{\rm out}$，$s\le3n/q$、$r\le M/\ell^{100}$。`, point: R`代价 $T_0=2^{O(n/\log^{10}n)}$。` },
    misconception: R`"$B$ 好算、$E$ 好算"不意味着 $B+E$ 好算；引理 2.1 用的是块与颜色计数的特定配合。` },
  { id: "derivative", name_zh: "导数 ← 子矩阵积和式", name_en: "derivatives from submatrix permanents", icon: "∂", group: "algo",
    plain: "积和式多项式的低阶导数，只需要展开点矩阵的子矩阵积和式。",
    explain: R`$P(t)=\per(A(t))$。令 $\Delta(z)=A(t_0+z)-A_0$，由加法公式 $P(t_0+z)=\sum\per(A_0[S^c,T^c])\per(\Delta(z)[S,T])$；后一个因子被 $z^{|S|}$ 整除，所以 $j$ 阶导数只用到 $|S|\le j$ 的子矩阵。

于是 $h$ 阶以内的全部导数代价是 $T\cdot(n/h)^{O(h)}$——导数矩阵本身完全不需要有结构。`,
    analogy: "要知道一座桥在某点附近的形状，只需测量那一点附近的几段，而不必测量整座桥。",
    book_example: { what: R`\sref{L3.1} 与式 \eqref{3.1}。`, point: "这是最终运行时间的主项来源。" },
    misconception: R`需要的不是导数矩阵 $A'(t_0)$ 的积和式，而是 $A(t_0)$ 的许多子矩阵的积和式。` },
  { id: "interp", name_zh: "多点 Hermite 插值", name_en: "Hermite interpolation", icon: "📈", group: "algo",
    plain: R`$\ell$ 个点各 $h$ 阶导数，足以确定次数小于 $\ell h$ 的多项式。`,
    explain: R`$\deg P\le nd$。在 $\ell$ 个特殊点各求 $0,\dots,h-1$ 阶导数，只要 $\ell h>nd$，$P$ 就被唯一确定，$P(0)=\per(A)$ 随之得出。

于是每个点只需 $h\approx nd/\ell$ 阶导数；若 $d/\ell\to0$，则 $h=o(n)$，导数代价 $(n/h)^{O(h)}=2^{o(n)}$。`,
    analogy: "用几个观测站各自的局部读数（位置、速度、加速度……）拼出整条轨道。",
    book_example: { what: R`§3.1 与 \sref{P3.2}。`, point: R`节省完全来自 $d/\ell\ll1$。` },
    misconception: "插值本身只有多项式代价，昂贵的是在每个点求导数。" },
  { id: "labels", name_zh: "词标号", name_en: "word labels", icon: "🏷️", group: "alg",
    plain: R`给每行每列一个长度 $\ell$ 的“词”，非零元两端逐位不同。`,
    explain: R`标号取自 $[q]^\ell$，每个词至多用 $D=\lceil2n/Q\rceil$ 次；不同非零元的有序标号对不同；非零元两端在每个坐标上都不同（\sref{L4.1}，平衡贪心）。

这样对每个坐标 $i$，按第 $i$ 个符号分组的行/列都只有 $\le3n/q$ 个——这就是特殊点 $t=i$ 上块的大小。`,
    analogy: "给每个人一个多位编号，保证任何一对“打过交道”的人在每一位上都不撞号。",
    book_example: { what: R`§4.2，\sref{L4.1} 与式 \eqref{4.5}。`, point: R`$\ell$ 个坐标对应 $\ell$ 个特殊点。` },
    misconception: R`控制块大小的是“第 $i$ 位相同”，而不是“整个词相同”。` },
  { id: "cube", name_zh: "经布尔立方体分解", name_en: "factorization through Boolean cubes", icon: "🎲", group: "alg",
    plain: R`$A=L\cdot(\text{与输入无关的中间矩阵})\cdot R'$。`,
    explain: R`每个可能的有序词对 $(a,b)$（逐位不同）是一个中间坐标，共 $M=(q(q-1))^\ell$ 个；固定每位的无序对，剩下 $\ell$ 个方向位——一个 $\{0,1\}^\ell$。于是 $A=L(I_C\otimes X^{\otimes\ell})R'$。

$X^{\otimes\ell}$ 翻转所有方向位（交换两个词）；输入只出现在 $L,R'$ 中。之后只需变形 $2^\ell\times2^\ell$ 的中间矩阵。`,
    analogy: "把一张复杂的交通网写成“出站口 × 中转站 × 进站口”，中转站的规则对所有乘客都一样。",
    book_example: { what: R`§4.1（$\ell=1$）与 §4.3，式 \eqref{4.3}、\eqref{4.7}。`, point: R`把 $\cJ$ 换成 $I$ 立刻得到块对角的 \eqref{4.4}。` },
    misconception: R`换成 $I$ 后得到的 $B$ 与 $A$ 的积和式毫无关系——所以需要一个从 $X^{\otimes\ell}$ 出发的低次多项式族。` },
  { id: "inice", name_zh: String.raw`$i$-好`, name_en: "i-nice", icon: "🎯", group: "alg",
    plain: R`在第 $i$ 个坐标上什么也不做的矩阵。`,
    explain: R`$K$ 是 $i$-好的，若 $K=I_2\otimes B$（第 $i$ 个因子移到最前）。中间矩阵在 $t=i$ 时 $i$-好 ⇒ 外层矩阵按第 $i$ 个符号分块（\sref{L4.3}）。

精确的 $i$-好族需要次数 $\ell$；允许一个公共低秩误差后，次数降为 $O(\sqrt{\ell\log\ell})$。`,
    analogy: "第 i 个开关被“锁定”，其余开关随便动——系统就自然分成两个互不相通的部分。",
    book_example: { what: R`\sref{D4.2}，式 \eqref{4.8}。`, point: R`$I$ 对每个 $i$ 都是 $i$-好的，$X^{\otimes\ell}$ 对任何 $i$ 都不是。` },
    misconception: R`$i$-好不要求矩阵在其余坐标上有任何结构。` },
  { id: "parity", name_zh: "几乎处处等于奇偶性的多项式", name_en: "polynomial agreeing with parity", icon: "⚖️", group: "alg",
    plain: R`低次多项式在绝大多数输入上精确等于 $x_1\cdots x_\ell$。`,
    explain: R`$x_1+\dots+x_\ell=\ell-2k$ 时奇偶为 $(-1)^k$。在中间 $d+1$ 层插值 $p(\ell-2k)=(-1)^k$，二项分布的集中性使例外比例 $\le\ell^{-100}$。

Hadamard 换基把"在多少输入上不等"变成"误差矩阵的秩"，于是 $E=X^{\otimes\ell}-p(\sum_jX_j)$ 的秩 $\le2^\ell/\ell^{100}$。`,
    analogy: "考试只出中等难度的题：极少数人会落在题库覆盖不到的区间里。",
    book_example: { what: R`§5.3–5.4，式 \eqref{5.5}–\eqref{5.8}。`, point: R`$d=O(\sqrt{\ell\log\ell})\ll\ell$。` },
    misconception: R`这不是数值逼近：在例外输入上 $p$ 的值可以很大，但例外集合很小。` },
  { id: "ledger", name_zh: "参数账本", name_en: "parameter ledger", icon: "📒", group: "acct",
    plain: R`$q,\ell,d,h,s,r$ 怎么选，每一步代价怎么乘。`,
    explain: R`$q=\lceil(\log n)^{10}\rceil$，$\ell\approx\log n/(20\log\log n)$，$d=\Theta(\sqrt{\log n})$，$h\approx nd/\ell=\Theta(n\log\log n/\sqrt{\log n})$。

特殊点代价 $2^{O(s+r\log n)}=2^{O(n/\log^{10}n)}$；导数代价 $(n/h)^{O(h)}=2^{O(h\log(n/h))}$ 是主项，即 \eqref{1.1}。`,
    analogy: "一份预算表：每个参数都在两个相反的约束之间找平衡。",
    book_example: { what: R`§6 的 \eqref{6.1} 与本页的交互账本。`, point: R`这是渐近界；按文中常数，$n$ 要极大时各项才进入渐近区。` },
    misconception: R`指数里的 $(\log\log n)^2$ 不是"记账误差"，而是 $h$ 中的 $\log\log n$ 与 $\log(n/h)$ 中的 $\log\log n$ 相乘。` },
];

export const relations = [
  { from: "eth", to: "permanent", label: "归约到" },
  { from: "structured", to: "derivative", label: "提供 T" },
  { from: "derivative", to: "interp", label: "提供数据" },
  { from: "interp", to: "permanent", label: "恢复 P(0)" },
  { from: "labels", to: "cube", label: "定义坐标" },
  { from: "cube", to: "inice", label: "变形中间阵" },
  { from: "inice", to: "structured", label: "给出分块" },
  { from: "parity", to: "inice", label: "近似 i-好" },
  { from: "parity", to: "structured", label: "给出低秩" },
  { from: "ledger", to: "interp", label: "定 h" },
  { from: "ledger", to: "labels", label: String.raw`定 $q,\ell$` },
];

export const TAKEAWAYS = [
  R`策略是**插值**：$P(t)=\per(A(t))$ 次数 $\le nd$；在 $\ell$ 个好点各求 $h\approx nd/\ell$ 阶导数即可恢复 $P(0)=\per(A)$。`,
  R`好点上的矩阵是"小块 + 低秩"，引理 2.1 让它的**每个方子矩阵**都只需 $2^{O(n/\log^{10}n)}$；引理 3.1 把导数化为这些子矩阵积和式。`,
  R`$A(t)=L(I_C\otimes J(t))R'$：输入只在 $L,R'$ 里，变形只发生在 $2^\ell\times2^\ell$ 的中间矩阵上；词标号保证 $t=i$ 时按第 $i$ 个符号分块。`,
  R`精确的 $i$-好变形需次数 $\ell$；允许一个公共低秩误差后次数降到 $O(\sqrt{\ell\log\ell})$——低次多项式几乎处处等于奇偶性，Hadamard 换基把"例外个数"变成"秩"。`,
  R`最终指数 $h\log(n/h)=\Theta\big(n(\log\log n)^2/\sqrt{\log n}\big)=o(n)$：稀疏积和式与 #3SAT 都有 $2^{o(n)}$ 算法，ETH 不成立。`,
];

export const QUIZ = [
  { q: "整个算法节省时间的根本来源是什么？", options: ["Ryser 公式的常数优化", R`$d/\ell\ll1$：每个特殊点只需 $h\approx nd/\ell=o(n)$ 阶导数`, "把矩阵近似为低秩矩阵并丢弃误差", "随机采样"], answer: 1, why: R`插值本身是多项式代价；$(n/h)^{O(h)}$ 在 $h=o(n)$ 时是 $2^{o(n)}$。误差从不丢弃，算法是确定性的。` },
  { q: R`为什么 \sref{L2.1} 要对“每个方子矩阵”成立？`, options: ["为了处理非方阵", R`因为 \sref{L3.1} 求导数需要 $A(t_0)$ 的许多子矩阵积和式`, "为了多项式空间", "为了数值稳定"], answer: 1, why: R`式 \eqref{3.1} 中出现的是 $\per(A_0[S^c,T^c])$。` },
  { q: R`在 $A=L\cJ R'$ 中把 $\cJ$ 换成单位阵 $I$，会怎样？`, options: ["积和式不变", R`得到块对角矩阵 $B$，但 $\per(B)$ 与 $\per(A)$ 一般无关`, "得到零矩阵", "得到 A 的转置"], answer: 1, why: R`所以需要一族从 $X^{\otimes\ell}$ 出发、在好点处"近似 $i$-好"的低次多项式，用插值把好点的信息带回 $t=0$。` },
  { q: R`为什么不能直接用 $\bigotimes_j\big((1-t/j)X+(t/j)I_2\big)$ 这个精确构造？`, options: ["它不是有理矩阵", R`它在 $t=0$ 不等于 $X^{\otimes\ell}$`, R`它的次数是 $\ell$，导致每点需要约 $n$ 阶导数，没有节省`, R`它在特殊点不是 $i$-好的`], answer: 2, why: R`次数 $d=\ell$ 时 $h\approx n$；而且精确 $i$-好必然迫使次数 $\ge\ell$（§5.1）。` },
  { q: R`误差矩阵 $E$ 的低秩从哪里来？`, options: ["高斯消元", R`$p$ 在除 $\ell^{-100}$ 比例外的输入上精确等于奇偶性，Hadamard 换基后 $E$ 变成对角阵`, "随机投影", "矩阵的稀疏性"], answer: 1, why: R`$H_\ell EH_\ell$ 的非零对角元个数 = $p$ 偏离奇偶性的输入个数 \eqref{5.4}、\eqref{5.8}。` },
];

export const BRIDGE = R`地图已经画好。第 2 节从最底层的发动机开始：Ryser 公式、积和式加法公式，以及"数颜色而不数子集"的低秩 DP，最后把它们合成引理 2.1——一个对"小块 + 低秩"矩阵及其所有方子矩阵都有效的积和式算法。`;
