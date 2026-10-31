// 附录 A 高层理解层：开场、路线图、核心概念、小结、自测、过渡。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一张存不下的表，和一个只需要它的“加权总和”的问题";
export const HOOK = R`\sref{L2.1} 的算法像一位会计：它把每个块里"剩下的端点用了几次红色、几次蓝色……"统统记进一张颜色计数表 $W(\nu,\xi)$，逐块合并，最后只取对角线、乘上阶乘、加起来。问题是这张表的格子数可以多达 $(n+1)^{2r}$。在第 6 节的参数下，$r$ 虽然远小于 $n$，$n^{O(r)}$ 仍是超多项式——时间上我们付得起，内存却装不下。

可是我们自始至终只关心一个数：那个"对角线加权总和"。附录 A 的想法是：把这张表看成某个多项式 $F$ 的系数表；"对角线加权总和"就是作用在 $F$ 上的一个线性泛函 $\cL_r$。线性泛函不必通过系数来算——它也能写成 $F$ 在一组网格点上取值的加权和。于是算法变成：走遍 $(n+1)^{2r}$ 个网格点，每到一点就现算一次 $F$（只需枚举每块的 $S,T$），乘上一个预先算好的权重，加进累加器，然后把这次求值扔掉。

时间不变，空间从"整张表"降到"几个数"。这正是 \sref{T6.1} 能在多项式空间内完成的原因，也是附录 B 处理"共享线性型"时要反复借用的工具。`;

export const ROADMAP = [
  { sec: "A", title: "问题：颜色计数表太大", gist: R`\sref{L2.1} 的表 $W(\nu,\xi)$ 最多有 $(n+1)^{2r}$ 项；对第 6 节的 $r$ 这是超多项式空间。目标：保持时间界，把空间降到多项式。`, next: R`先把"表"翻译成"多项式"。` },
  { sec: "A.1", title: "计数恒等式 = 多项式配对", gist: R`引入颜色变量 $z,w\in\Q^r$，每块写出生成多项式 $F_b$；$F=\prod_bF_b$ 的系数正是 $W(\nu,\xi)$，于是 $\per(B+UV^{\mathsf T})=\cL_r(F)$。在一个数值点求 $F$ 只需 $2^{O(s)}\poly(n)$ 时间与多项式空间。`, gives: ["A.1", "A.2", "A.3"], next: R`能求值了；剩下的是：不展开系数，怎样算 $\cL_r(F)$？` },
  { sec: "A.2", title: "插值泛函，而不是系数表", gist: R`$F$ 的每个变量次数 $\le n$，用张量积 Lagrange 插值把 $F$ 写成网格值的组合；$\cL_r$ 在各坐标上分解，单坐标权重为 $\kappa_{ab}$。得到网格求和公式 \eqref{A.5}：逐点求值、累加、丢弃。`, gives: ["A.4", "A.5"], next: R`把这台"多项式空间的结构化积和式机器"装回主算法。` },
  { sec: "A.3", title: "整个积和式算法的空间", gist: R`\eqref{3.1} 中每个大子矩阵积和式用 \eqref{A.5}；小扰动积和式在 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$ 上用 Ryser；一切顺序枚举，只保留 $\ell h$ 个导数值。故 \sref{T6.1} 在多项式空间内成立。` },
];

export const groups = [
  { id: "alg", label: "代数工具" },
  { id: "res", label: "算法与资源" },
];

export const concepts = [
  {
    id: "genpoly", name_zh: "颜色生成多项式", name_en: "Color generating polynomial", icon: "🎨", section_id: "A.1", group: "alg",
    plain: "把颜色计数表的每一格当作一个单项式的系数，整张表就是一个多项式。",
    explain: R`\sref{L2.1} 的证明中，每块剩下的左端点要选一种颜色 $a$（权重 $U_{ia}$），右端点同理（权重 $V_{ja}$）。如果给颜色 $a$ 配一个形式变量 $z_a$（右侧配 $w_a$），那么"给左端点 $i$ 选颜色"就是把线性型 $u_i(z)=\sum_aU_{ia}z_a$ 乘进来；展开后，$z_a$ 的指数恰好数出颜色 $a$ 被用了几次。于是块多项式 $F_b$ 的 $z^\nu w^\xi$ 系数就是块表 $W_b(\nu,\xi)$；而多项式相乘时指数相加，恰好就是"逐块卷积计数向量"。

换句话说：表 = 系数，卷积 = 乘法。这一翻译本身不省任何东西，但它把"存表"变成了"能求值的对象"。`,
    analogy: R`就像把一副牌里"红桃几张、黑桃几张"的所有组合列成一张大表，与写出生成函数 $(x+y)^k$（$x$ 记红桃、$y$ 记黑桃）——两者信息相同，但后者可以直接代数字进去算。`,
    book_example: { what: R`\eqref{A.1}：$F_b(z,w)=\sum_{S,T}\per(B[S,T])\prod_{i\in I_b\setminus S}u_i(z)\prod_{j\in J_b\setminus T}v_j(w)$。`, point: R`$F=\prod_bF_b$ 的 $z^\nu w^\xi$ 系数 = \sref{L2.1} 中卷积后的 $W(\nu,\xi)$。` },
    misconception: R`$F$ 不是 $\per(B+UV^{\mathsf T})$ 本身，也不是在某个点上的值；积和式是 $F$ 的系数经过阶乘加权、只取对角（$\nu=\xi$）后的总和。`,
  },
  {
    id: "pairing", name_zh: "阶乘配对泛函", name_en: "Factorial pairing functional", icon: "⚖️", section_id: "A.1", group: "alg",
    plain: R`一个线性规则：$z^\nu w^\xi$ 变成 $\nu!$（若 $\nu=\xi$），否则变成 $0$。`,
    explain: R`\eqref{2.6} 的 $\sum_\nu\nu!\,W(\nu,\nu)$ 用多项式的语言重写，就是对 $F$ 施加线性泛函 $\cL_r$：只保留左右颜色计数相同的单项式（每种颜色左右端点数目相等，才能在同色内配对），并乘上同色内部配对的方式数 $\nu!=\prod_a\nu_a!$。

它对多个坐标"可分解"：若多项式是各坐标因子的乘积 $\prod_cg_c(z_c,w_c)$，则 $\cL_r$ 的值是 $\prod_c\cL_1(g_c)$。这一性质是 \eqref{A.5} 能写成乘积权重的原因。`,
    analogy: "像一台只认\"配成对的袜子\"的机器：左右同色同数才计数，并按能有几种配法给分。",
    book_example: { what: R`\eqref{A.2}–\eqref{A.3}：$\per(B+UV^{\mathsf T})=\cL_r(F)$。`, point: R`$n=2$、两个 $1\times1$ 块的手算例子里，$z^2w^2$ 项的系数要乘 $2!$，少了它就和直接展开对不上。` },
    misconception: R`$\cL_r$ 不是"在某点取值"，它不保乘法：$\cL_r(FG)\ne\cL_r(F)\,\cL_r(G)$。所以必须用很多个点的值，而不是一个点。`,
  },
  {
    id: "lagrange", name_zh: "张量积 Lagrange 插值", name_en: "Tensor-product Lagrange interpolation", icon: "🧮", section_id: "A.2", group: "alg",
    plain: R`每个变量次数 $\le n$ 的多项式，由它在网格 $\{0,\dots,n\}^{2r}$ 上的值唯一确定。`,
    explain: R`单变量情形：次数 $\le n$ 的多项式由 $n+1$ 个点的值决定，$f(t)=\sum_af(a)\Lambda_a(t)$。多变量时，对每个变量各用一次单变量插值（逐个变量归纳），得到 $F(z,w)=\sum_{a,b}F(a,b)\prod_c\Lambda_{a_c}(z_c)\Lambda_{b_c}(w_c)$。

要点是"每个变量单独次数 $\le n$"——这里 $F$ 在 $z$ 上的总次数就 $\le n$（左端点只有 $n$ 个），自然满足。`,
    analogy: R`像用一组"探针"去测一个未知形状：只要探针够密（每个方向 $n+1$ 根），形状就被完全确定。`,
    book_example: { what: "§A.2：\"expand F in the tensor-product Lagrange basis\"。", point: R`网格点数 $(n+1)^{2r}$ 决定了时间，但不决定空间。` },
    misconception: R`插值并不要求先求出 $F$ 的系数；我们插值的是"泛函"，即预先算好每个网格值的权重。`,
  },
  {
    id: "kappa", name_zh: "单坐标配对权重", name_en: "Pairing weights", icon: "🔢", section_id: "A.2", group: "alg",
    plain: R`单个坐标上，"在 $z=a$、$w=b$ 处取值"对阶乘配对的贡献系数 $\kappa_{ab}$。`,
    explain: R`$\kappa_{ab}=\cL_1\big(\Lambda_a(z)\Lambda_b(w)\big)=\sum_kk!\,[t^k]\Lambda_a\,[t^k]\Lambda_b$。用矩阵写：若 $\mathrm{Vd}$ 是 Vandermonde 矩阵（$\mathrm{Vd}_{ck}=c^k$），则 Lagrange 系数矩阵是 $\mathrm{Vd}^{-\mathsf T}$，$\kappa=\mathrm{Vd}^{-\mathsf T}\diag(0!,1!,\dots,n!)\,\mathrm{Vd}^{-1}$。它是一个 $(n+1)\times(n+1)$ 的对称有理矩阵，只依赖 $n$，可一次预计算。

有了它，对任意次数 $\le n$ 的 $f,g$：$\sum_{a,b}\kappa_{ab}f(a)g(b)=\sum_kk!\,f_kg_k$。`,
    analogy: R`像数值积分的求积权重：积分是一个线性泛函，Gauss/Newton–Cotes 公式把它写成函数值的加权和；$\kappa$ 就是"阶乘配对"的求积权重。`,
    book_example: { what: R`\eqref{A.4}。`, point: R`$n=1$ 时 $\Lambda_0=1-t$、$\Lambda_1=t$，$\kappa=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}$。` },
    misconception: R`$\kappa$ 的项可正可负、带分母，单项可能很大；但它们只有多项式比特长度，求和中会大量抵消，最后得到精确整数。`,
  },
  {
    id: "stream", name_zh: "逐点求值、累加、丢弃", name_en: "Streaming evaluation", icon: "🌊", section_id: "A.2", group: "res",
    plain: R`时间照付 $(n+1)^{2r}$ 次求值，但任何时刻只记住当前点和一个累加器。`,
    explain: R`\eqref{A.5} 是一个巨大的和，但每一项彼此独立：第 $(a,b)$ 项 $=\big(\prod_c\kappa_{a_cb_c}\big)\times F(a,b)$。按任意顺序逐项算、加进累加器即可，算完的项不必保留。

这就是"用时间换空间"的标准套路，但这里连时间都没多付：系数表的大小与网格点数同为 $n^{O(r)}$，而每次求值 $F$ 只需 $2^{O(s)}\poly(n)$。`,
    analogy: "统计全国选票不需要把所有选票堆在一个仓库里：每个投票站数完报一个数，总部只维护一个合计。",
    book_example: { what: "§A.2 末段：\"add the product to an accumulator, and discard the evaluation\"。", point: R`空间：$\kappa$ 表 $(n+1)^2$ 个数 + 当前网格点 + 一次 $F$ 的求值工作区 + 累加器。` },
    misconception: "多项式空间不等于多项式时间：本附录完全不改善时间，只改善空间。",
  },
  {
    id: "polyspace", name_zh: "多项式空间", name_en: "Polynomial space", icon: "💾", section_id: "A.3", group: "res",
    plain: "任何时刻只存多项式个数、每个多项式比特长的数。",
    explain: R`空间要同时数"存几个数"与"每个数多长"。附录 A 的网格权重、$F$ 的取值、累加和都是有理数，它们的比特长度由次数（$\le n$）与分母（来自 Lagrange 基，整除 $(n!)^2$ 一类的量）控制，都是多项式级的；累加 $(n+1)^{2r}$ 项只再多出 $O(r\log n)$ 位。

整套算法（\sref{T6.1}）里的每一层枚举——特殊点 $i$、阶数 $a$、子集 $S,T$、网格点——都是顺序的，只保留 $\ell h$ 个导数值和最后的 Hermite 方程组。`,
    analogy: "一位只带一张草稿纸和计算器的算账员：可以算很久，但手边永远只有几行字。",
    book_example: { what: "§A.3：\"Thus Theorem 6.1 holds in polynomial space.\"", point: "附录 B 的 #3SAT 算法也声称多项式空间，正是借用这里的工具。" },
    misconception: R`"多项式空间"不要求枚举本身短；枚举可以有 $2^{o(n)}$ 步，只要每一步用的内存是多项式的。`,
  },
  {
    id: "truncryser", name_zh: "截断环上的 Ryser", name_en: "Ryser over a truncated polynomial ring", icon: "✂️", section_id: "A.3", group: "res",
    plain: R`小扰动积和式 $\per(\Delta(\sym{zh}{z})[S,T])$ 只需前 $h$ 个系数，用 Ryser 公式在截断多项式环里算。`,
    explain: R`\sref{L3.1} 的 \eqref{3.1} 中，另一半是 $a\times a$ 的小积和式 $\per(\Delta(\sym{zh}{z})[S,T])$，其中 $a<h$。Ryser 公式只需遍历 $2^a$ 个列子集，每次累乘 $a$ 个行和；在 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$ 中每个元素是 $h$ 个系数。所以它本来就是多项式空间的，不需要任何新想法。`,
    analogy: R`只保留泰勒展开的前 $h$ 项，就像只看一个函数在某点附近的前几阶导数。`,
    book_example: { what: R`§A.3："computed by Ryser over $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$, storing only polynomially many coefficients"。`, point: R`注意这里的 $\sym{zh}{z}$ 是 §3 的展开变量，与 §A.1 的颜色变量 $z\in\Q^r$ 无关。` },
    misconception: R`子集 DP 也能算小积和式，但它要存 $2^a$ 个状态；为了空间，这里明确选 Ryser。`,
  },
];

export const relations = [
  { from: "genpoly", to: "pairing", label: "积和式 = 配对" },
  { from: "lagrange", to: "kappa", label: "单坐标泛函值" },
  { from: "pairing", to: "kappa", label: "作用在 Lagrange 基上" },
  { from: "kappa", to: "stream", label: "网格权重" },
  { from: "genpoly", to: "stream", label: "逐点求值" },
  { from: "stream", to: "polyspace", label: "只存累加器" },
  { from: "truncryser", to: "polyspace", label: "小积和式" },
];

export const TAKEAWAYS = [
  <TxI>{R`**表 = 系数**：\sref{L2.1} 的颜色计数表 $W(\nu,\xi)$ 正是 $F=\prod_bF_b$ 的系数，$F_b$ 由 \eqref{A.1} 给出；逐块卷积就是多项式乘法。`}</TxI>,
  <TxI>{R`**积和式 = 配对**：$\per(B+UV^{\mathsf T})=\cL_r(F)$，$\cL_r(z^\nu w^\xi)=\nu!\,[\nu=\xi]$ —— 即 \eqref{2.6} 的多项式写法。`}</TxI>,
  <TxI>{R`**求值很便宜**：在一个数值点，$F_b$ 只需枚举 $\le2^{2s}$ 对 $S,T$ 并用 Ryser 求 $\per(B[S,T])$：$2^{O(s)}\poly(n)$ 时间、多项式空间。`}</TxI>,
  <TxI>{R`**插值泛函**：每变量次数 $\le n$ ⇒ 张量积 Lagrange 插值；$\cL_r$ 按坐标分解 ⇒ $\cL_r(F)=\sum_{a,b}\big(\prod_c\kappa_{a_cb_c}\big)F(a,b)$，单坐标权重 $\kappa_{ab}=\sum_kk!\,[t^k]\Lambda_a\,[t^k]\Lambda_b$。`}</TxI>,
  <TxI>{R`**资源**：$(n+1)^{2r}$ 个网格点逐个处理，时间仍是 $2^{O(s)}n^{O(r)}\poly(n)$，空间是多项式；装回 \eqref{3.1} 并顺序枚举，\sref{T6.1} 在多项式空间内成立。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么 $F=\prod_bF_b$ 中 $z^\nu w^\xi$ 的系数恰好是 \sref{L2.1} 的 $W(\nu,\xi)$？`,
    options: [R`因为 $F$ 在 $z=w=\one$ 处的值等于 $\per(B+UV^{\mathsf T})$`, R`展开 $\prod u_i(z)$ 时每个剩余左端点选一种颜色 $a$，$z_a$ 的指数数出颜色 $a$ 的次数；多项式相乘时指数相加，正是计数向量的卷积`, R`因为 Lagrange 插值保持系数`, R`因为 $\per(B[S,T])$ 与 $z,w$ 无关`],
    answer: 1, why: R`$u_i(z)=\sum_aU_{ia}z_a$：选第 $a$ 项 = 给端点 $i$ 着颜色 $a$、权重 $U_{ia}$，并让 $z_a$ 的指数加一。块与块相乘即计数向量相加。`,
  },
  {
    q: R`在 $n=2$、两个 $1\times1$ 块、$r=1$ 的例子里，$F$ 含 $u_1v_1u_2v_2\,z^2w^2$ 项。$\cL_1$ 把它变成多少？`,
    options: [R`$u_1v_1u_2v_2$`, R`$2\,u_1v_1u_2v_2$`, R`$0$`, R`$4\,u_1v_1u_2v_2$`],
    answer: 1, why: R`$\cL_1(z^2w^2)=2!=2$。直接展开积和式也确实得到 $2u_1u_2v_1v_2$：两条 $E$-边的端点同色，可以"直配"或"交叉配"。`,
  },
  {
    q: R`为什么 \eqref{A.5} 的权重可以写成 $\prod_c\kappa_{a_cb_c}$ 这种乘积形式？`,
    options: [R`因为 $F$ 本身是各坐标因子的乘积`, R`因为 $\cL_r$ 在单项式上满足 $\nu![\nu=\xi]=\prod_c\nu_c![\nu_c=\xi_c]$，作用在乘积型多项式上时分解为各坐标 $\cL_1$ 之积；而张量积 Lagrange 基正是乘积型`, R`因为 $\kappa$ 是对称矩阵`, R`因为网格点是整数`],
    answer: 1, why: R`$F$ 本身一般不是乘积型；是插值基 $\prod_c\Lambda_{a_c}(z_c)\Lambda_{b_c}(w_c)$ 为乘积型，再加上 $\cL_r$ 的可分解性。`,
  },
  {
    q: R`与 \sref{L2.1} 的原始算法相比，附录 A 的做法在时间与空间上分别如何？`,
    options: [R`时间变快，空间不变`, R`时间同为 $2^{O(s)}n^{O(r)}\poly(n)$，空间从 $n^{O(r)}$ 降到多项式`, R`时间与空间都降到多项式`, R`空间降低，但时间多了一个 $2^n$ 因子`],
    answer: 1, why: R`网格点 $(n+1)^{2r}=n^{O(r)}$ 个，每点求 $F$ 用 $2^{O(s)}\poly(n)$；与原算法同一量级。改变的只是不再存表。`,
  },
  {
    q: R`§A.3 中，小扰动积和式 $\per(\Delta(z)[S,T])$ 为什么用 Ryser 而不是子集 DP？`,
    options: [R`Ryser 更快`, R`子集 DP 要存 $2^a$ 个状态，Ryser 只需遍历子集，内存是 $O(ah)$ 个系数`, R`子集 DP 不能在 $\Q[z]/(z^h)$ 上运行`, R`Ryser 不需要截断`],
    answer: 1, why: R`两者时间同为 $2^{O(a)}\poly(n)$；但 DP 的状态表是指数大小的，Ryser 的容斥求和可以流式进行。`,
  },
];

export const BRIDGE = R`附录 A 把"颜色计数表"换成了一个线性泛函 $\cL_r$ 与一台"按点求值"的机器。附录 B 要把主定理推广到任意 3-CNF：那里的对象不再是积和式，而是"局部多项式乘积之和"，共享的线性型 $V^{\mathsf T}x$ 被换成形式变量 $z$。把它们"代回去"的工具，正是同一个阶乘配对 $\cL_r$——它与截断指数 $e_D$ 满足替换律 \eqref{B.1}；而在多项式空间内计算这一配对，用的就是本附录的网格公式 \eqref{A.5}。`;
