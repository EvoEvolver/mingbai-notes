// 附录 B 高层理解层：开场、路线图、核心概念、小结与自测、收束。
// 概念卡、Hook/Bridge/Takeaways/Quiz 都按 Rich 渲染：数学一律写 $…$，引用写 \eqref{}/\sref{}。概念卡的 name_zh/name_en 与 relations 的 label 仍是纯文本。
const R = String.raw;

export const HOOK_TITLE = "子句比变量多一百倍时，还能在亚指数时间里数清满足赋值吗？";
export const HOOK = R`主文的引擎只认"稀疏"的输入：$n$ 个变量、$O(n)$ 个子句的 3-CNF 被归约成一个 $O(n)$ 维、每行每列 $O(1)$ 个非零元的矩阵，然后在 $2^{O(\rho(n))}$ 时间内算出积和式。可一个任意的 3-CNF 可以有 $n^3$ 量级的子句。标准做法是先**稀疏化**：把公式拆成许多"叶子"，每片叶子子句较少。但叶子的子句数仍是 $n\log^{O(1)}n$——如果照旧归约到积和式，矩阵维数跟着子句数膨胀到 $n\log^{9}n$，而 $\rho(n\log^9n)$ 比 $n$ 还大，前功尽弃。

附录 B 的答案是：**不要为子句付变量的钱**。它换了一种计数对象——$\F_2$ 上次数至多 4 的稀疏多项式的 gap（$\pm1$ 号和），这种多项式只用原来的 $n$ 个变量（外加 $O(n)$ 个校验变量）；子句再多，也只是多几个单项式。为了数"所有子句都满足"的赋值，它先用 $O(n/\log n)$ 个 Vandermonde 稠密校验把"违反子句很少"的假赋值全部排除，再用精确计数逐个挑选 $3n$ 个短校验，把剩下的假赋值一网打尽。底层的计数器则把主文"矩阵变形 + 插值"的整套机器原封不动地搬到了一个新对象上：**拷贝映射**。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "B", title: "问题与总体方案", gist: R`写下目标指数 $\rho(v)$；说明为何直接稀疏化（$\sigma=(\log n)^{-1/32}$）只能得到较弱的 $2^{O(n/\log^{1/32}n)}$，而要保住 $2^{O(\rho(n))}$ 必须取 $\sigma=1/\lceil\log n\rceil$ 并"不为子句引入变量"。`, gives: [], next: R`先造一个通用计数器：对"局部因子之积"求和。` },
  { sec: "B.1", title: "局部乘积计数器（引理 B.1）", gist: R`把拷贝矩阵 $C$ 当作稀疏矩阵，照 §4–§5 分解成 $L(I_{\mathcal C_*}\otimes X^{\otimes\ell_*})R'$ 并变形；特殊点上局部部分按变量组分块、低秩部分由截断指数的替换律 \eqref{B.1} 处理；导数改用布尔有限差分 \eqref{B.2}；Hermite 插值回到 $\theta=0$。`, gives: ["B.1", "B.2"], next: R`有了计数器，就能处理 $\pm1$ 号和——只要把 $(-1)^Q$ 写成低次的局部乘积。` },
  { sec: "B.2", title: "稀疏四次多项式的 gap（定理 B.2）", gist: R`$(-1)^{Q}=\prod_e(1-2m_e)$ 次数太高；引入标记 $u$ 并模 $u^b$ 截断 \eqref{B.3}，被截掉的项在布尔点上被 $2^b$ 整除，取中心剩余即得精确 gap。`, gives: ["B.3"], next: R`gap 计数器就位。下面把"所有子句都满足"翻译成若干线性校验。` },
  { sec: "B.3", title: "稠密校验排除小违反集（引理 B.3）", gist: R`在 $\F_{2^b}$ 中施加 $w$ 个 Vandermonde 方程，展开成 $h_0=bw=O(n/\log n)$ 个二元校验：任何通过它们的非零违反向量重量都 $>w$。`, gives: [], next: R`剩下的假赋值违反很多子句；需要一种能边加校验边计数的方法。` },
  { sec: "B.4", title: "混合校验计数（引理 B.4）", gist: R`用 $\one\{\sym{bbit}{b}=0\}=\frac12\sum_{\sym{abit}{a}}(-1)^{\sym{abit}{a}\sym{bbit}{b}}$ 把每个校验写成特征和，得到 \eqref{B.4}：通过全部校验的赋值数 $=2^{-h_0-s}\sum_u\gap(Q_u)$，每个 $Q_u$ 都是稀疏四次多项式。`, gives: ["B.4"], next: R`能精确计数了，就能用它来**挑选**短校验。` },
  { sec: "B.5", title: "用精确计数挑选短校验", gist: R`随机短校验以 $>1/4$ 的概率拒绝任一假幸存者；平均论证保证存在好候选，精确计数把它找出来。$3n$ 轮后假幸存者 $<2^n(3/4)^{3n}<1$。`, gives: [], next: R`最后把各片叶子的计数加起来。` },
  { sec: "B.6", title: "计数稀疏化与最终界（定理 B.5）", gist: R`参数 $1/\lceil\log n\rceil$ 的不交计数稀疏化给出 $2^{O(n/\log n)}$ 片叶子；每片按 B.3–B.5 精确计数后求和，总时间 $2^{O(\rho(n))}$、多项式空间。`, gives: [] },
];

// ---------- 核心概念 ----------
export const groups = [
  { id: "engine", label: "计数引擎（B.1）" },
  { id: "algebra", label: "代数技巧（B.2）" },
  { id: "checks", label: "校验与去随机化（B.3–B.5）" },
  { id: "global", label: "整体框架（B、B.6）" },
];

export const concepts = [
  {
    id: "sparsify", name_zh: "计数稀疏化", name_en: "Counting sparsification", icon: "🌿", section_id: "B", group: "global",
    plain: "把任意 3-CNF 拆成许多子句较少的公式，它们的满足赋值恰好划分原公式的满足赋值。",
    explain: R`参数为 $\sigma$ 的不交计数稀疏化给出至多 $2^{\sigma n}$ 片叶子，每片只有 $O(n\sigma^{-9})$ 个子句，且各叶子的满足赋值集合互不相交、并起来正好是原公式的满足赋值集合。于是 #SAT(原公式) = 各叶子计数之和。

$\sigma$ 越小叶子越少，但每片叶子越稠。取 $\sigma=1/\lceil\log n\rceil$ 时叶子数只有 $2^{O(n/\log n)}$（可被吸收），代价是每片叶子有 $n\log^9n$ 个子句——这正是附录 B 要处理的“近线性但不线性”的情形。`,
    analogy: "像把一大堆账目按“账户”分拣：分得越细，箱子越多；分得越粗，每个箱子越杂。附录 B 选择“箱子不多、但每箱有点杂”，然后发明一种不怕杂的点钞法。",
    book_example: { what: R`§B 引言与 §B.6：$\sigma=(\log n)^{-1/32}$ 只给出 $2^{O(n/\log^{1/32}n)}$；$\sigma=1/\lceil\log n\rceil$ 配合 B.1–B.5 给出 $2^{O(\rho(n))}$。`, point: "瓶颈不在叶子数，而在“每片叶子怎么数”。" },
    misconception: "稀疏化不是近似：叶子的满足赋值精确划分原公式的满足赋值，计数相加没有误差。",
  },
  {
    id: "local_product", name_zh: "局部乘积求和", name_en: "Sum of a product of local factors", icon: "🧩", section_id: "B.1", group: "engine",
    plain: R`对 $2^v$ 个布尔赋值求“许多小因子之积”的和；每个因子只看 $\polylog v$ 个变量。`,
    explain: R`设 $\phi_1,\dots,\phi_N$ 每个只依赖 $(\log v)^c$ 个变量，$\Phi$ 是它们的乘积。我们要的是 $\sum_x\Phi(x)$。如果每个变量只在一个因子里出现，求和会按因子分解，瞬间算完；困难在于同一个变量被许多因子共享。

\sref{LB.1} 的视角：把“共享”写成一个线性映射——拷贝矩阵 $C$ 把变量向量 $x$ 复制到每个因子的输入位置上，目标变成 $\sum_x\Phi(Cx)$，其中 $\Phi$ 在各输入出现上是“独立”的。于是困难全部集中在矩阵 $C$ 上，而 $C$ 是一个稀疏 0/1 矩阵——正是主文的引擎擅长处理的对象。`,
    analogy: "一场许多小组同时开会的投票：每个小组只关心几个人的意见，但同一个人参加了很多小组。“拷贝矩阵”就是记录“谁的意见被抄送到哪个小组”的名册。",
    book_example: { what: R`\sref{TB.2} 中每个因子是一组 $O((\log v)^c)$ 个单项式的截断乘积 $\prod(1-2u\,m_e)$。`, point: "gap 计数正是这种“局部乘积求和”。" },
    misconception: "“每个因子只看少数变量”并不意味着可以逐因子独立求和——变量的共享把它们全耦合在一起，这才需要整套变形机器。",
  },
  {
    id: "copy_map", name_zh: "拷贝映射及其变形", name_en: "Deformed copy map", icon: "🪞", section_id: "B.1", group: "engine",
    plain: R`把主文对矩阵 $A$ 做的“分解 + 变形”原样施加在拷贝矩阵 $C$ 上。`,
    explain: R`给因子和变量各分配一个词标号，每个“因子–变量”关联用标号对作为中间坐标，就得到 $C=L(I_{\mathcal C_*}\otimes X^{\otimes\ell_*})R'$，与主文 \eqref{4.7} 一模一样。再把 $X^{\otimes\ell_*}$ 换成 \sref{T5.1} 的低次矩阵多项式 $J_*(\theta)$，得到 $C(\theta)$。

在特殊点 $\theta=i$，局部部分只把因子 $e$ 的输入送到第 $i$ 个符号与 $e$ 相同的变量上——变量按第 $i$ 个符号分组，每组大小 $O(v/q_*)$；剩下的误差是低秩的。$P(\theta)=\sum_x\Phi(C(\theta)x)$ 是 $\theta$ 的多项式，次数 $\le Dd_*$，在 $\ell_*$ 个特殊点上求够多的导数即可插值出 $P(0)$。`,
    analogy: "主文是“把一张大表格扭成许多小方块 + 一张薄薄的修正层”；这里扭的不是数据表，而是“名册”——在特殊点上，名册把人分到互不往来的小组里，只剩少数跨组的“广播”。",
    book_example: { what: R`原文 p.16：$C(\theta)=L(I_{\mathcal C_*}\otimes J_*(\theta))R'$，$\deg C\le d_*=O(\sqrt{\ell_*\log\ell_*})$，$s=O(v/q_*)$，$r\le M_*/\ell_*^{\sym{Aexp}{A}}$。`, point: "附录 B 唯一的新算法原语，但全部零件都来自 §3–§5。" },
    misconception: R`$C(\theta)$ 在 $\theta\ne0$ 时不再是 0/1 拷贝矩阵，$\Phi(C(\theta)x)$ 也不再对应任何“赋值”——它只是一个辅助多项式，只有 $\theta=0$ 处的值有组合意义。`,
  },
  {
    id: "subst", name_zh: "截断指数的替换律", name_en: "Substitution property of the truncated exponential", icon: "🔁", section_id: "B.1", group: "engine",
    plain: R`用形式变量 $z$ 代替共享线性型，事后靠阶乘配对 $\cL_r$ 把它“代回”。`,
    explain: R`低秩部分 $UV^{\mathsf T}$ 让每个输入都依赖 $r$ 个共享线性型 $V^{\mathsf T}x$——它们横跨所有变量组，破坏了分组求和。办法：先把 $V^{\mathsf T}x$ 换成形式变量 $z$，各组独立求和，同时给每组附上 $e_D(w\cdot V_{G_b}^{\mathsf T}x_{G_b})$，最后用附录 A 的阶乘配对 $\cL_r$ 把 $z$ 与 $w$ 配对。

关键等式 \eqref{B.1}：$\cL_r\big(F(z)\,e_D(w\cdot y)\big)=F(y)$，因为 $e_D(w\cdot y)$ 中 $w^\nu$ 的系数是 $y^\nu/\nu!$，与 $\cL_r$ 的 $\nu!$ 正好抵消。各组截断指数之积与 $e_D(w\cdot V^{\mathsf T}x)$ 在 $w$-次数 $\le D$ 内一致，更高次项配不上 $z$-次数 $\le D$ 的 $F$，自动消失。`,
    analogy: R`像先在每个分店各记一本“欠条”（含未知数 $z$），总部最后统一按汇率 $\cL_r$ 结算——指数函数的“乘法变加法”保证分店的欠条乘起来恰好是总账。`,
    book_example: { what: R`\eqref{B.1} 与紧随其后的“对每个组枚举赋值、附上 $e_D(w\cdot V_{G_b}^{\mathsf T}x_{G_b})$”。`, point: "这是附录 A 配对泛函的新用法：不是数颜色，而是做“代入”。" },
    misconception: R`不能直接用 $\exp$：真正的指数函数是无穷级数；截断到 $D$ 次是安全的，因为 $F$ 的 $z$-次数不超过 $D$。`,
  },
  {
    id: "bool_fd", name_zh: "布尔有限差分", name_en: "Derivatives by Boolean finite differences", icon: "📐", section_id: "B.1", group: "engine",
    plain: R`求 $P(\theta)$ 在特殊点的高阶导数：把扰动的输入换成独立变量 $y$，再用 Möbius 反演只取少数布尔点。`,
    explain: R`主文用积和式加法公式求导数（\sref{L3.1}）；这里的对象是 $\sum_x\Phi(\cdots)$，没有加法公式可用。替代：$P(i+\tau)=\sum_x\Phi\big(C(i)x+\Delta_i(\tau)x\big)$。把第二个 $x$ 换成独立的形式变量 $y$，得到 $F_{x,j}(y)=[\tau^j]\Phi\big(C(i)x+\Delta_i(\tau)y\big)$。由于 $\Delta_i(\tau)$ 被 $\tau$ 整除，每出现一次 $y$ 就带一个 $\tau$，所以 $F_{x,j}$ 对 $y$ 的次数 $\le j$。

次数 $\le j$ 的多线性多项式由它在重量 $\le j$ 的布尔点上的值决定（Möbius 反演），于是只需 $\sum_{j<h}2^j\binom vj=(v/h)^{O(h)}$ 次“带固定变量与平移”的结构化求值。这正是 \sref{L3.1} 中 $(n/h)^{O(h)}$ 的对应物。`,
    analogy: "要知道一条很长的多项式在某点的低阶泰勒系数，不必展开全部——低阶部分只“看得见”少数几个坐标同时变化的情形。",
    book_example: { what: R`\eqref{B.2}：$P^{(j)}(i)/j!$ 写成对 $(S,T)$ 的交错和，内层是固定 $x_S=\mathbf 1$、输入平移 $\Delta_i(\tau)\one_T$ 的结构化求值。`, point: R`代价 $2^{O(s)}v^{O(r)}(v/h)^{O(h)}$，与 \eqref{3.2} 同形。` },
    misconception: R`$y$ 与 $x$ 不同时独立就无法降次：直接对 $\Phi(C(i+\tau)x)$ 展开，$x$ 的次数可以很高；必须先把“扰动部分”的 $x$ 分离成 $y$，最后才代回 $y=x$。`,
  },
  {
    id: "gap", name_zh: "二元域多项式的 gap", name_en: "gap of a polynomial over GF(2)", icon: "⚖️", section_id: "B.2", group: "algebra",
    plain: R`$\gap(Q)=\sum_x(-1)^{Q(x)}$：零点数减去非零点数。`,
    explain: R`对 $Q\in\F_2[x_1,\dots,x_v]$，$\gap(Q)=\#\{Q=0\}-\#\{Q=1\}$，所以零点个数 $=(2^v+\gap(Q))/2$。数零点和算 gap 是一回事。

为什么选 gap 而不是直接数零点？因为 $(-1)^Q$ 是乘法友好的：$(-1)^{\sum_em_e}=\prod_e(-1)^{m_e}=\prod_e(1-2m_e)$，把“和的奇偶”变成“局部因子之积”，正好喂给 \sref{LB.1}。而且混合校验计数 \eqref{B.4} 天然就是若干 gap 之和。`,
    analogy: "投票的“净票数”：赞成减反对。知道总人数和净票数，就知道各有多少人。",
    book_example: { what: R`§B.2 定义与 \sref{TB.2}：次数 $\le4$、至多 $v(\log v)^c$ 个单项式的 $Q$，其 gap 可在 $2^{O(\rho(v))}$ 内精确算出。`, point: "附录 B 的“计数货币”。" },
    misconception: R`gap 不是模 2 的量：它是 $-2^v$ 到 $2^v$ 之间的普通整数，必须精确算出。`,
  },
  {
    id: "mod2b", name_zh: "按标记次数截断与中心剩余", name_en: "Truncation in the marker and centered residue", icon: "✂️", section_id: "B.2", group: "algebra",
    plain: R`高次项都带着 $2$ 的高次幂；把它们截掉只改变答案模 $2^b$ 以外的部分，而答案本身足够小。`,
    explain: R`$\prod_e(1-2m_e)$ 展开后的次数可达 $4L$（$L$ 为单项式数），远超 \sref{LB.1} 允许的 $O(v)$。引入标记 $u$：$\prod_e(1-2u\,m_e)$ 中 $u^k$ 的系数是 $(-2)^ke_k(m(x))$，在布尔点上被 $2^k$ 整除。只保留 $u^0,\dots,u^{b-1}$（$b=v+2$），被丢的项全被 $2^b$ 整除。

于是截断和 $\equiv\gap\pmod{2^b}$。又因 $|\gap|\le2^v<2^{b-1}$，取落在 $(-2^{b-1},2^{b-1}]$ 的代表元（中心剩余）就是 gap 本身。保留的每一项次数 $\le4(b-1)=O(v)$。`,
    analogy: "称一个已知不超过 1 公斤的包裹：只要读数精确到“模 2 公斤”，就能唯一确定重量。",
    book_example: { what: R`\eqref{B.3}：$\Phi(u,x)=\prod_e(1-2u\,m_e(x))\bmod u^b$，$b=v+2$。`, point: R`注意顺序：先在 $\Q[u]/(u^b)$ 里算出截断乘积的系数，最后才令 $u=1$。` },
    misconception: R`若先令 $u=1$ 再截断就什么也没截掉；必须按 $u$ 的次数截断。另外 $b=v+1$ 不够：$\gap=\pm2^v$ 两个值模 $2^{v+1}$ 同余。`,
  },
  {
    id: "violation", name_zh: "子句违反向量", name_en: "Clause-violation vector", icon: "🚨", section_id: "B.3", group: "checks",
    plain: R`$v(x)\in\F_2^m$ 第 $e$ 位为 1 当且仅当赋值 $x$ 违反第 $e$ 个子句；满足赋值 ⇔ $v(x)=0$。`,
    explain: R`子句 $\ell_1\vee\ell_2\vee\ell_3$ 被违反 ⇔ 三个文字都假，所以 $v_e(x)=\prod_k(1+\ell_k(x))$（在 $\F_2$ 上），是次数 $\le3$、至多 8 个单项式的多项式。

“数满足赋值”于是变成“数 $v(x)=0$ 的 $x$”。直接要求 $m$ 个违反位都为 0 需要 $m$ 个校验——太多；附录 B 用 $O(n/\log n)$ 个稠密线性校验加 $O(n)$ 个短线性校验代替，而任何线性校验 $a\cdot v(x)$ 都是 $x$ 的低次稀疏多项式。`,
    analogy: "每个子句是一盏报警灯；满足赋值就是“所有灯都不亮”。我们不逐个看灯，而是看几组灯的“亮灯数奇偶”。",
    book_example: { what: R`§B.3 开头：$v(x)=(v_1(x),\dots,v_m(x))\in\F_2^m$。`, point: R`线性校验 + 多项式 $v_e$ ⇒ 每个校验都是稀疏三次/四次多项式。` },
    misconception: R`线性校验通过不代表 $v(x)=0$：奇偶为 0 也可能是偶数个子句被违反。所以需要“稠密校验排小集合 + 短校验逐步淘汰”两步。`,
  },
  {
    id: "vandermonde", name_zh: "Vandermonde（BCH 型）稠密校验", name_en: "Vandermonde checks", icon: "🧮", section_id: "B.3", group: "checks",
    plain: R`在 $\F_{2^b}$ 中要求 $\sum_e\alpha_e^jv_e=0$（$j<w$）：通过的非零向量至少有 $w+1$ 个 1。`,
    explain: R`取互异的域元素 $\alpha_1,\dots,\alpha_m\in\F_{2^b}$（$b=\lceil\log_2(m+1)\rceil$）。若非零 $v$ 只有 $k\le w$ 个 1，前 $k$ 个方程构成 $k\times k$ Vandermonde 方程组，行列式 $\prod_{s<t}(\alpha_{e_t}-\alpha_{e_s})\ne0$，只有零解——矛盾。

每个 $\F_{2^b}$ 方程按二元基展开成 $b$ 个 $\F_2$ 方程，共 $h_0=bw=O(\log n\cdot n/\log^2n)=O(n/\log n)$ 个二元校验。这就是 Reed–Solomon / BCH 码的校验矩阵：最小距离 $>w$。`,
    analogy: "像一串加密的“校验和”：少量错误一定会被发现（违反子句少的假赋值必被拒），只有大量错误才可能侥幸蒙混过关。",
    book_example: { what: R`\sref{LB.3}：$h_0=O(n/\log n)$ 个可显式构造的二元线性校验，通过它们的非零向量重量 $>w$。`, point: R`$2^{h_0}=2^{O(n/\log n)}$ 是可以被吸收的开销。` },
    misconception: "稠密校验本身不能保证计数正确——它只是把“假幸存者”逼成违反很多子句的赋值，让随机短校验容易抓住它们。",
  },
  {
    id: "mixed", name_zh: "混合校验的特征和表示", name_en: "Mixed checks as character sums", icon: "🎚️", section_id: "B.4", group: "checks",
    plain: R`$\one\{\sym{bbit}{b}=0\}=\frac12\sum_{\sym{abit}{a}}(-1)^{\sym{abit}{a}\sym{bbit}{b}}$：把每个“奇偶为 0”的校验换成一个 $\pm1$ 求和。`,
    explain: R`对每个稠密校验引入 $u_k\in\F_2$、每个短校验引入 $z_j\in\F_2$，交换求和顺序：通过全部校验的赋值数 $=2^{-h_0-s}\sum_u\gap(Q_u)$，其中 $Q_u(x,z)=(u^{\mathsf T}C)\cdot v(x)+\sum_jz_j\big(a_j\cdot v(x)\big)$。

稠密部分对 $u$ 显式枚举（$2^{h_0}$ 种），短校验部分则把 $z$ 作为新变量并入多项式——$z_j$ 乘上三次的 $a_j\cdot v(x)$ 得到四次项。每个 $Q_u$ 有 $n+s=O(n)$ 个变量、$n\polylog n$ 个单项式，交给 \sref{TB.2}。`,
    analogy: "要数“同时通过若干道门”的人：每道门的“通过”写成正负号的平均，所有门乘起来，再整体求和——傅里叶分析里的标准动作。",
    book_example: { what: R`\eqref{B.4} 与 \sref{LB.4} 的证明。`, point: "稠密校验“枚举”，短校验“变量化”——这是两类校验区别对待的原因。" },
    misconception: R`不能把稠密校验也变量化：$(u^{\mathsf T}C)\cdot v(x)$ 若把 $u$ 变成变量，每个 $u_k$ 会乘上多达 $8m$ 个单项式，单项式总数变成 $h_0m$ 量级，超出稀疏范围。`,
  },
  {
    id: "derand", name_zh: "平均论证 + 精确计数 = 确定性挑选", name_en: "Derandomization by exact counting", icon: "🎯", section_id: "B.5", group: "checks",
    plain: R`随机短校验平均淘汰 $>1/4$ 的假幸存者；用精确计数枚举全部候选，选计数最小的那个。`,
    explain: R`固定一个假幸存者（违反 $k>w$ 个子句）。长 $L=\lceil m/w\rceil$ 的随机子句列表一次都没碰到被违反子句的概率 $\le(1-k/m)^L<e^{-1}$；碰到后，首次碰到位置的独立包含位让奇偶均匀，故拒绝概率 $>\frac12(1-e^{-1})\approx0.316>\frac14$。

对候选取平均，某个候选必淘汰 $>1/4$ 的假幸存者。真解永远通过任何校验，所以“总计数最小” ⇔ “假幸存者最少”。每轮假幸存者乘以 $<3/4$，$3n$ 轮后 $<2^n(3/4)^{3n}=(27/32)^n<1$，即为 0。`,
    analogy: "考官不知道哪些考生作弊，但每出一道题都能精确统计“答对人数”。诚实考生永远答对，所以选“答对人数最少”的题，就是选最能抓作弊者的题。",
    book_example: { what: R`§B.5：至多 $3n(2m)^L+1$ 次混合校验计数，$(2m)^L=2^{(\log n)^{O(1)}}$。`, point: "唯一的概率论证只用于证明好候选存在；算法完全确定。" },
    misconception: "这里的随机性不是算法的随机性，也没有“以高概率正确”——每一轮都通过精确计数验证，最终计数恰好等于满足赋值数。",
  },
];

export const relations = [
  { from: "sparsify", to: "violation", label: "每片叶子近线性个子句" },
  { from: "copy_map", to: "local_product", label: "把共享写成矩阵" },
  { from: "subst", to: "copy_map", label: "处理低秩部分" },
  { from: "bool_fd", to: "copy_map", label: "特殊点求导" },
  { from: "local_product", to: "gap", label: "符号写成局部乘积" },
  { from: "mod2b", to: "gap", label: "降次到线性" },
  { from: "violation", to: "vandermonde", label: "排除小违反集" },
  { from: "violation", to: "mixed", label: "校验 = 线性型" },
  { from: "gap", to: "mixed", label: "混合校验恒等式" },
  { from: "mixed", to: "derand", label: "精确计数" },
  { from: "vandermonde", to: "derand", label: "假幸存者违反很多子句" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**为什么需要附录 B**：$\sigma=1/\lceil\log n\rceil$ 的稀疏化叶子有 $n\log^{O(1)}n$ 个子句；归约到积和式会让维数跟着子句数膨胀。附录 B 的计数对象（稀疏四次 $\F_2$ 多项式）只有 $O(n)$ 个变量，子句只贡献单项式。`,
  R`**\sref{LB.1}** 把 §3–§5 平移到拷贝映射：$C=L(I_{\mathcal C_*}\otimes X^{\otimes\ell_*})R'$ → $C(\theta)=L(I_{\mathcal C_*}\otimes J_*(\theta))R'$；特殊点上"分组 + 低秩"，低秩部分用替换律 \eqref{B.1}，导数用布尔有限差分 \eqref{B.2}；代价 $2^{O(s)}v^{O(r)}(v/h)^{O(h)}=2^{O(\rho(v))}$。`,
  R`**\sref{TB.2}**：$(-1)^Q=\prod_e(1-2m_e)$，模 $u^b$（$b=v+2$）截断 \eqref{B.3}；丢掉的项被 $2^b$ 整除，$|\gap|\le2^v<2^{b-1}$，中心剩余即精确值。`,
  R`**\sref{LB.3}–\sref{LB.4}**：Vandermonde 稠密校验（$h_0=O(n/\log n)$）让假幸存者违反 $>w$ 个子句；特征和恒等式 \eqref{B.4} 把混合校验计数化为 $2^{h_0}$ 个 gap。`,
  R`**§B.5–B.6**：平均论证 + 精确计数确定性地挑出 $3n$ 个短校验，假幸存者 $<2^n(3/4)^{3n}<1$；对 $2^{O(n/\log n)}$ 片叶子求和得 \sref{TB.5}：任意 #3SAT 在 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 时间、多项式空间内精确计数。`,
];

export const QUIZ = [
  {
    q: R`为什么取 $\sigma=1/\lceil\log n\rceil$ 后，不能把每片叶子直接归约到稀疏积和式（\sref{T6.1}）？`,
    options: [R`叶子数 $2^{O(n/\log n)}$ 太多`, R`叶子有 $n\log^{O(1)}n$ 个子句，归约后矩阵维数随子句数膨胀，$\rho(n\log^9n)$ 已超过 $n$`, R`叶子公式不再是 3-CNF`, R`积和式只能判定可满足性，不能计数`],
    answer: 1, why: R`叶子数 $2^{O(n/\log n)}=2^{o(\rho(n))}$ 可被吸收；问题在于归约会为每个子句引入变量/行列。附录 B 的四次多项式只用 $n+s=O(n)$ 个变量。`,
  },
  {
    q: R`替换律 \eqref{B.1} $\cL_r(F(z)e_D(w\cdot y))=F(y)$ 成立的关键是什么？`,
    options: [R`$e_D$ 是真正的指数函数`, R`$e_D(w\cdot y)$ 中 $w^\nu$ 的系数是 $y^\nu/\nu!$，与 $\cL_r$ 的 $\nu!$ 抵消，且 $\deg F\le D$ 保证截断无损`, R`$F$ 是多线性的`, R`$z$ 与 $w$ 取相同数值`],
    answer: 1, why: R`由多项式定理 $(w\cdot y)^k/k!=\sum_{|\nu|=k}w^\nu y^\nu/\nu!$；$\cL_r(z^\mu w^\nu)=\nu![\mu=\nu]$，所以 $\cL_r(F(z)e_D(w\cdot y))=\sum_{|\mu|\le D}F_\mu y^\mu=F(y)$。`,
  },
  {
    q: R`在 \eqref{B.2} 的推导中，为什么 $F_{x,j}(y)=[\tau^j]\Phi(C(i)x+\Delta_i(\tau)y)$ 对 $y$ 的次数不超过 $j$？`,
    options: [R`因为 $\Phi$ 是多线性的`, R`因为 $\Delta_i(\tau)=C(i+\tau)-C(i)$ 的每个元素都被 $\tau$ 整除，$y$ 每出现一次就带一个 $\tau$`, R`因为 $x$ 是布尔向量`, R`因为 $h\le v/2$`],
    answer: 1, why: R`$y$ 的 $k$ 次项至少带 $\tau^k$，取 $\tau^j$ 系数时只剩 $k\le j$ 的项。多线性化不改变布尔值，于是可用 Möbius 反演只取 $|S|\le j$。`,
  },
  {
    q: R`\sref{TB.2} 中若取 $b=v+1$ 而不是 $v+2$，会出什么问题？`,
    options: [R`截断误差不再被 $2^b$ 整除`, R`保留项的次数超过 $O(v)$`, R`$\gap=2^v$ 与 $\gap=-2^v$ 模 $2^{v+1}$ 同余，中心剩余无法区分这两种极端情形`, R`没有问题，完全等价`],
    answer: 2, why: R`需要 $|\gap|<2^{b-1}$ 严格成立才能由余数唯一确定 gap；$b=v+2$ 给出 $2^v<2^{v+1}$。`,
  },
  {
    q: R`\sref{LB.3} 中，若某个非零向量 $v$ 只有 $k\le w$ 个非零位，为何它不能通过全部校验？`,
    options: [R`因为 $\alpha_e$ 都是本原元`, R`因为前 $k$ 个方程在其支撑上构成 $k\times k$ Vandermonde 方程组，节点互异故可逆，只有零解`, R`因为 $h_0>m$`, R`因为 $v$ 必须是满足赋值的违反向量`],
    answer: 1, why: R`矩阵 $(\alpha_{e_t}^j)_{0\le j<k,\,1\le t\le k}$ 的行列式是 $\prod_{s<t}(\alpha_{e_t}-\alpha_{e_s})\ne0$。`,
  },
  {
    q: R`§B.5 中"选使计数最小的候选"为什么等价于"选淘汰假幸存者最多的候选"？`,
    options: [R`因为随机候选的期望最小`, R`因为真满足赋值 $v(x)=0$ 通过任何线性校验，计数 = 满足赋值数（常数）+ 剩余假幸存者数`, R`因为 Vandermonde 校验已经排除了所有假赋值`, R`因为短校验只涉及 $L$ 个子句`],
    answer: 1, why: R`每个线性校验 $a\cdot v(x)$ 在 $v(x)=0$ 时为 0。所以计数之差完全来自假幸存者，最小化计数就是最小化假幸存者；平均论证保证最优候选使其乘以 $<3/4$。`,
  },
];

export const BRIDGE = R`附录 B 到此把全文收束：主文 §2–§6 证明了稀疏积和式定理（\sref{T6.1}），从而 $O(n)$ 子句的 3-CNF 可在 $2^{O(\rho(n))}$ 内计数；附录 A 把它压到多项式空间；附录 B 用"计数稀疏化 + Vandermonde 稠密校验 + 精确计数挑选短校验 + 稀疏四次 gap + 局部乘积计数"把同一个界推广到**任意** 3-CNF（\sref{TB.5}）。由此 3SAT 有 $2^{o(n)}$ 时间算法，指数时间假设不成立。

回到第 1 页的全局依赖图，可以把整条链再走一遍：\sref{L2.1}（结构化积和式）与 \sref{L3.1}（导数）→ \sref{P3.2}（插值）→ \sref{L4.1}/\sref{L4.3}（标号与分块）+ \sref{T5.1}（低次变形）→ \sref{T6.1}；其中 §4–§5 的分解与变形、附录 A 的配对泛函，又在 \sref{LB.1} 中被重新使用。`;
