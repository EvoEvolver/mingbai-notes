// 第 2 节高层理解层：开场、路线图、推导图、核心概念、小结、自测、过渡。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "两件各自好办的事，加在一起为什么还好办？";
export const HOOK = R`设想你要数一个 $60\times60$ 的 0/1 矩阵有多少个"完美匹配"——也就是算它的**积和式**（permanent）。行列式有高斯消元，几十万阶都不在话下；积和式却没有这样的捷径。最好的通用办法（Ryser 公式或子集动态规划）要做大约 $n2^n$ 次运算：$n=60$ 时已是 $10^{19}$ 量级。

但有两类矩阵是例外。一类是**分块对角**的：矩阵拆成许多互不相干的小方块，积和式就是各小块积和式之积，只需对每块付出 $2^{\text{块大小}}$。另一类是**低秩**的：秩为 $r$ 的矩阵，积和式只要 $n^{O(r)}$ 次运算——秩一时甚至有闭式 $n!\prod_iu_i\prod_jv_j$。

真正的问题是：如果矩阵是"小块 + 低秩"，即 $A=B+E$，两种结构叠在一起，还能快速算吗？低秩部分 $E$ 的元素到处都是，会把所有的块连在一起，看起来要退回 $2^n$。本节的答案是：能。秘诀是把低秩部分的每条边看成"选一种颜色"，只记录**每种颜色用了几次**，而不记录用了哪些行列；这种计数表可以**一块一块地**合并。这就是 \sref{L2.1}——整篇论文在每个"特殊插值点"上实际运行的计算引擎。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "2", title: "约定：只数算术运算", gist: R`对数以 2 为底；"运算量"只数有理数算术运算，多项式因子略去；数的位长保持多项式。本节的算法**不用稀疏性**。`, gives: [], next: R`先把最一般的情形（任意矩阵）的基线和一个拆分工具摆出来。` },
  { sec: "2.1", title: "一般积和式与加法公式", gist: R`积和式 = 二部图完美匹配的加权和；子集 DP 与 Ryser 公式 \eqref{2.1} 给出 $O(n2^n)$ 基线；加法公式 \eqref{2.2} 按"每条边来自 $B$ 还是 $C$"拆分。`, gives: ["2.1", "2.2"], next: R`$2^n$ 来自"记住用过哪些列"。若矩阵低秩，能否只记更少的信息？` },
  { sec: "2.2", title: "低秩：数颜色而非数子集", gist: R`把 $E_{ij}=\sum_aU_{ia}V_{ja}$ 的每一项看成一种颜色；端点着色后同色任意配对，于是只需记录颜色计数 $\nu$：秩二得 \eqref{2.3}–\eqref{2.4}，秩 $r$ 得 \eqref{2.5}，状态总数 $\binom{n+r}{r}$。`, gives: ["2.3", "2.4", "2.5"], next: R`低秩和小块各自好算；两者相加时，颜色计数表能否逐块合并？` },
  { sec: "2.3", title: "小块 + 低秩：引理 2.1", gist: R`$B$ 有大小 $\le s$ 的对应对角块、$\rank E\le r$：每块枚举由 $B$ 匹配的 $(S,T)$，其余端点着色得表 $W_a$；各块按计数向量卷积，最后 $\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$ \eqref{2.6}；对每个方子矩阵同样成立。`, gives: ["2.6"], next: R`§3 将说明：为什么"每个方子矩阵都好算"正是求导数所需的假设。` },
];

// ---------- 本页公式推导图 ----------
export const EQMAP = [
  { from: "2.3", to: "2.4", label: R`红配红 $k!$、蓝配蓝 $(n-k)!$` },
  { from: "2.4", to: "2.5", label: R`两色 → $r$ 色，$k\to\nu$` },
  { from: "2.5", to: "2.6", label: R`颜色表逐块卷积` },
  { from: "2.2", to: "2.6", label: R`同一思想：按来源拆每条边` },
  { from: "2.1", to: "2.6", label: R`块内 $\per(B[S,T])$ 用 $2^{O(s)}$ 算法` },
];
export const EQMAP_LABELS = { "2.1": "Ryser 公式", "2.2": "加法公式", "2.3": "秩二左表递推", "2.4": "秩二积和式", "2.5": <TxI>{R`秩 $r$ 积和式`}</TxI>, "2.6": "小块 + 低秩" };

// ---------- 核心概念 ----------
export const groups = [
  { id: "base", label: "一般积和式" },
  { id: "rank", label: "低秩：颜色计数" },
  { id: "block", label: "小块 + 低秩" },
];

export const concepts = [
  {
    id: "permanent", name_zh: "积和式", name_en: "Permanent", icon: "🧮", section_id: "2.1", group: "base",
    plain: "行列式去掉正负号：对所有排列求“每行取一个元素”的乘积之和。",
    explain: R`$\per(A)=\sum_\pi\prod_uA_{u,\pi(u)}$。把矩阵看成二部图的邻接矩阵（左侧是行、右侧是列，$A_{uv}$ 是边权），一个排列就是一个完美匹配，积和式就是所有完美匹配的权重之和。

行列式之所以好算，是因为符号 $\operatorname{sgn}(\pi)$ 让它在行变换下有很好的代数性质；积和式没有符号，这些性质全部失去。计算 0/1 矩阵的积和式是 #P 完全的（Valiant），一般认为没有多项式算法。`,
    analogy: R`$n$ 个人、$n$ 份工作，$A_{uv}$ 是第 $u$ 人做第 $v$ 份工作的“满意度”。积和式把所有一一分配方案的满意度乘积全部加起来。`,
    book_example: { what: "§2.1 开头的定义式；本页“积和式实验室”用定义式、Ryser、子集 DP 三种方法计算同一个矩阵。", point: "完美匹配的视角贯穿全节：后面的“边的来源”“端点颜色”都是对匹配中每条边的分类。" },
    misconception: R`积和式不是行列式的“简单版本”。去掉符号反而让它难得多：行列式 $O(n^3)$，积和式目前只有指数算法（在一般矩阵上）。`,
  },
  {
    id: "baseline", name_zh: "指数基线：子集 DP 与 Ryser", name_en: "Subset DP & Ryser's formula", icon: "⏱️", section_id: "2.1", group: "base",
    plain: R`通用算法要付 $2^n$：逐行匹配时必须记住哪些列已经被用掉。`,
    explain: R`子集 DP：按行处理，状态是“已用列的集合”，共 $2^n$ 个，每个状态向下一行转移 $\le n$ 次，合计 $O(n2^n)$。Ryser 公式用容斥：$\prod_u\sum_{v\in S}A_{uv}$ 数的是“每行在 $S$ 里任选一列”的所有函数，容斥掉“像不满”的函数，只剩排列。

Ryser 朴素实现每个 $S$ 要重算 $n$ 个长度 $\le n$ 的行和，是 $O(n^22^n)$；按 Gray 码顺序枚举 $S$，相邻 $S$ 只差一列，行和可以 $O(n)$ 更新，才是 $O(n2^n)$。`,
    analogy: R`子集 DP 像一张签到表：每处理一行，就在表上勾掉一列。表的所有可能状态有 $2^n$ 种——这就是指数代价的来源。`,
    book_example: { what: R`\eqref{2.1} 与正文中的 $O(n2^n)$ 论断。\sref{L2.1} 证明中每块的 $\per(B[S,T])$ 正是用这类算法在 $2^{O(s)}$ 内算出的。`, point: R`$2^n$ 本身不是敌人；敌人是让指数里出现 $n$。把指数换成块大小 $s$，就是本节的目标。` },
    misconception: R`“Ryser 给出同样的 $O(n2^n)$ 界”指的是 Gray 码实现；直接按公式逐项计算会多一个 $n$ 因子。`,
  },
  {
    id: "addition", name_zh: "加法公式", name_en: "Permanent addition formula", icon: "➕", section_id: "2.1", group: "base",
    plain: R`$\per(B+C)$ 按“每条匹配边来自 $B$ 还是 $C$”拆开，变成子矩阵积和式乘积之和。`,
    explain: R`展开 $\prod_u(B_{u\pi(u)}+C_{u\pi(u)})$，每行选 $B$ 或 $C$。记用 $C$ 的行集合为 $S$、它们匹配到的列为 $T$；排列 $\pi$ 就分裂成 $S\to T$ 与 $S^c\to T^c$ 两个独立的双射，求和后正好是 $\per(C[S,T])\cdot\per(B[S^c,T^c])$。

当 $C$ 很“小”（例如每个元素都含因子 $z$），只有 $|S|$ 小的项才重要——这正是 §3 求导数的机制。`,
    analogy: "一支球队的阵容：每个位置要么用老队员（B），要么用新秀（C）。把所有阵容按“新秀打哪些位置”分组，每组内老队员与新秀的安排互不干扰。",
    book_example: { what: R`\eqref{2.2}；§3 取 $B=A(t_0)$、$C=\Delta(z)$ 得到 \eqref{3.1}。本页“加法公式逐项展开”示例列出所有非零项。`, point: "加法公式把一个积和式变成很多子矩阵积和式——所以 §3 需要“每个方子矩阵”都好算。" },
    misconception: R`$S$ 与 $T$ 都是“用 $C$ 匹配的”行与列；$B$ 作用在补集上。把两者搞反，公式就错了。`,
  },
  {
    id: "colors", name_zh: "颜色（秩分解的项）", name_en: "Colors from a rank factorization", icon: "🎨", section_id: "2.2", group: "rank",
    plain: R`$E_{ij}=\sum_aU_{ia}V_{ja}$：一条边选一种颜色 $a$，权重拆成左端点 $U_{ia}$ 与右端点 $V_{ja}$ 两半。`,
    explain: R`秩 $r$ 的矩阵可以写成 $E=UV^{\mathsf T}$（有理高斯消元即可求出 $U,V$）。把乘积 $\prod_iE_{i\pi(i)}$ 展开，每条边要选一个求和项 $a$——称为它的颜色。选定颜色后，权重 $U_{ia}V_{\pi(i)a}$ 是“左端点的事”乘“右端点的事”，与这条边具体连到哪里无关。

这个“可分离”是关键：给所有端点着好色以后，同色端点之间怎么配对都给出同一个权重。`,
    analogy: "跳舞配对：每人先领一种颜色的手环（权重只取决于本人和手环颜色），然后同色手环的人随意配对——不管怎么配，总得分都一样。",
    book_example: { what: R`秩一：只有一种颜色，所有 $n!$ 个匹配权重相同，$\per(E)=n!\prod_iu_i\prod_jv_j$。秩二：红、蓝两色，\eqref{2.3}–\eqref{2.4}。`, point: "颜色把“匹配”问题化成“着色 + 计数”问题。" },
    misconception: R`颜色不要求权重非负。$U,V$ 可以有负数和分数；论证是代数恒等式，不依赖“数边”的组合解释。`,
  },
  {
    id: "countvec", name_zh: String.raw`颜色计数向量 $\nu$`, name_en: "Color-count vector", icon: "🔢", section_id: "2.2", group: "rank",
    plain: R`DP 只记“每种颜色用了几次”，不记“用了哪些端点”：状态从 $2^n$ 降到 $\binom{n+r}{r}$。`,
    explain: R`$D_L(j,\nu)$ 是前 $j$ 个左端点着色、颜色计数为 $\nu$ 的总权重。左右两侧的计数必须相同（每条边两端同色），同色端点配对数为 $\nu!=\prod_a\nu_a!$，于是 $\per(E)=\sum_{|\nu|=n}\nu!\,D_L(n,\nu)D_R(n,\nu)$。

$|\nu|=j$ 的向量有 $\binom{j+r-1}{r-1}$ 个，全部层加起来 $\binom{n+r}{r}$。$r$ 固定时这是 $n$ 的多项式 $O(n^r)$；$r=n$ 时也只是 $\le4^n=2^{O(n)}$。`,
    analogy: "统计一场舞会，不必记下每个人领了哪种手环，只需记“红手环发了几个、蓝手环发了几个”。",
    book_example: { what: R`\eqref{2.5} 与状态数恒等式 $\sum_j\binom{j+r-1}{r-1}=\binom{n+r}{r}$；本页“低秩颜色计数”示例逐层显示状态数。`, point: R`压缩的代价只依赖秩 $r$，与矩阵是否稀疏无关。` },
    misconception: R`状态数不是 $r^n$（那是“每个端点选哪种颜色”的总数），而是计数向量的个数 $\binom{n+r}{r}$。`,
  },
  {
    id: "diagblocks", name_zh: "对应对角块", name_en: "Corresponding diagonal blocks", icon: "🧱", section_id: "2.3", group: "block",
    plain: R`行分组 $I_1,\dots,I_b$、列分组 $J_1,\dots,J_b$，非零元只出现在 $I_a\times J_a$ 内，每组大小 $\le s$。`,
    explain: R`这是“分块对角”的推广：行组与列组一一对应，但对应的两组大小可以不同，也不要求行列相邻（任意分组）。如果某块不是方的，$B$ 自己的积和式为 0（某个行组无法全部匹配到对应的列组）；否则 $\per(B)=\prod_a\per(B[I_a,J_a])$。

允许非方块很重要：删去一些行列之后，原来的方块往往会变成非方块，而 \sref{L2.1} 要对每个方子矩阵成立。`,
    analogy: "公司按部门划分：员工（行）只能做本部门的岗位（列）。部门之间人数与岗位数不必相等——只是那样的话，单靠部门内部无法安排满所有人。",
    book_example: { what: R`§2.3 的定义 $B[I_a,J_c]=0$（$a\ne c$），$|I_a|,|J_a|\le s$。§4 \sref{L4.3} 证明特殊点处的 $B_i$ 按第 $i$ 个标号符号分块，$s\le3n/q$。`, point: R`块大小 $s$ 决定 $2^{O(s)}$ 这一项。` },
    misconception: "“对应对角块”不要求块是方的，也不要求行列连续排列。",
  },
  {
    id: "blockconv", name_zh: "逐块卷积", name_en: "Block-by-block convolution", icon: "🧩", section_id: "2.3", group: "block",
    plain: R`每块单独算一张表 $W_a(\nu,\xi)$，各块之间只通过“颜色计数向量相加”相互作用。`,
    explain: R`对 $B+E$ 的每个匹配，$B$-边一定在某个块内部（块外 $B$ 为 0），它们在每块给出一对 $(S,T)$；其余端点用 $E$ 匹配，各自带颜色。块 $a$ 只关心：自己用 $B$ 匹配了谁、剩余左端点各色几个（$\nu$）、剩余右端点各色几个（$\xi$）。

跨块的 $E$-边只在最后“同色配对”时才出现，而那一步的权重只依赖总计数。所以全局表 $W$ 是各 $W_a$ 的卷积（计数向量相加），最后取 $\nu=\xi$ 并乘 $\nu!$。`,
    analogy: "各地分公司独立上报“剩余男/女舞伴各几人、按手环颜色分类”，总部只需把各地报表相加，再按颜色统一配对。",
    book_example: { what: R`\eqref{2.6}：$\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$。本页“引理 2.1 实验”显示每块枚举次数与最终表大小。`, point: "两个各自好办的结构相加仍然好办，靠的是这张可以逐块合并的计数表。" },
    misconception: R`不能分别算 $\per(B)$ 和 $\per(E)$ 再组合——积和式对加法不是线性的。合并的是计数表，不是积和式。`,
  },
  {
    id: "subclosure", name_zh: "子矩阵封闭性", name_en: "Closure under submatrices", icon: "✂️", section_id: "2.3", group: "block",
    plain: R`删去行列后：块结构仍在（块只会变小），$E$ 的秩不会增加。所以每个方子矩阵都能用同一算法。`,
    explain: R`删去行集 $R_0$ 与列集 $C_0$ 后，块划分变为 $I_a\setminus R_0$ 与 $J_a\setminus C_0$，大小仍 $\le s$，块外仍为 0；低秩部分变为 $U$ 的剩余行乘 $V$ 的剩余行的转置，秩 $\le r$。

这一点看似平凡，却是 §3 能工作的前提：\sref{L3.1} 要求在展开点处“每个方子矩阵的积和式”都能快速算出。`,
    analogy: "把一张按部门排好的座位表撕掉几行几列，剩下的仍是按部门排好的座位表。",
    book_example: { what: R`\sref{L2.1} 证明最后一段；本页示例对随机方子矩阵逐一验证。`, point: R`\sref{L2.1} 的结论是一个“对所有子矩阵一致”的保证，而不只是针对 $A$ 本身。` },
    misconception: "删去行列可能让原本的方块变成非方块——但这不影响算法，因为算法从不要求块是方的。",
  },
];

export const relations = [
  { from: "permanent", to: "baseline", label: "通用算法" },
  { from: "permanent", to: "addition", label: "按边的来源拆分" },
  { from: "permanent", to: "colors", label: "低秩时展开为颜色" },
  { from: "colors", to: "countvec", label: "只记计数" },
  { from: "countvec", to: "blockconv", label: "计数表可相加" },
  { from: "diagblocks", to: "blockconv", label: "B-边留在块内" },
  { from: "baseline", to: "blockconv", label: "块内用 2ᴼ⁽ˢ⁾" },
  { from: "addition", to: "blockconv", label: "同一拆分思想" },
  { from: "blockconv", to: "subclosure", label: "删行列仍适用" },
  { from: "diagblocks", to: "subclosure", label: "块只会变小" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**基线**：积和式 = 二部图完美匹配的加权和；子集 DP 与（Gray 码实现的）Ryser 公式 \eqref{2.1} 都是 $O(n2^n)$。指数来自"记住用过哪些列"。`}</TxI>,
  <TxI>{R`**加法公式** \eqref{2.2}：按每条匹配边来自 $B$ 还是 $C$ 展开，$\per(B+C)$ 化为 $\per(B[S^c,T^c])\per(C[S,T])$ 之和——§3 求导数的工具。`}</TxI>,
  <TxI>{R`**低秩 = 数颜色**：$E=UV^{\mathsf T}$ 的每条边选一种颜色，权重拆到两个端点；同色端点任意配对权重相同，于是 $\per(E)=\sum_{|\nu|=n}\nu!\,D_L(n,\nu)D_R(n,\nu)$ \eqref{2.5}，代价 $O\big(r\binom{n+r}{r}\big)=n^{O(r)}$。负权重同样成立。`}</TxI>,
  <TxI>{R`**小块 + 低秩**（引理 2.1）：每块枚举由 $B$ 匹配的 $(S,T)$（$\le2^{2s}$ 种），剩余端点着色得 $W_a$；各块按计数向量卷积，$\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$ \eqref{2.6}；总代价 $\poly(n)2^{O(s)}n^{O(r)}$。`}</TxI>,
  <TxI>{R`**子矩阵封闭**：删行列不破坏块划分、不增加秩，所以 $A$ 的**每个方子矩阵**都同样好算——这正是 §3 引理 3.1 的输入假设。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`子集动态规划计算积和式需要 $O(n2^n)$ 次运算，$2^n$ 来自哪里？`,
    options: [R`排列的总数 $n!$`, R`DP 状态要记录已经用过的列的集合`, R`Ryser 公式中的符号 $(-1)^{n-|S|}$`, R`矩阵元素的位长`],
    answer: 1, why: R`按行处理时，状态是"已用列集合"，共 $2^n$ 种；每个状态转移 $\le n$ 次。低秩 DP 的改进正是把"集合"换成"各颜色的计数"。`,
  },
  {
    q: R`秩一矩阵 $E_{ij}=u_iv_j$ 的积和式为什么等于 $n!\prod_iu_i\prod_jv_j$？`,
    options: [R`因为秩一矩阵的行列式为零`, R`因为每个排列 $\pi$ 的乘积都等于 $\prod_iu_i\prod_jv_j$，共 $n!$ 个排列`, R`因为只有恒等排列有贡献`, R`因为 Ryser 公式只剩一项`],
    answer: 1, why: R`$\prod_iu_iv_{\pi(i)}=\prod_iu_i\cdot\prod_jv_j$ 与 $\pi$ 无关（$\pi$ 只是把 $v$ 重新排序），所以 $n!$ 个排列贡献相同。`,
  },
  {
    q: R`在 \eqref{2.5} 中，为什么要乘 $\nu!=\prod_a\nu_a!$？`,
    options: [R`为了抵消 $D_L$ 中的重复计数`, R`端点着色后，颜色 $a$ 的 $\nu_a$ 个左端点与 $\nu_a$ 个右端点之间有 $\nu_a!$ 种配对，每种权重相同`, R`它是 Ryser 公式中的容斥系数`, R`它来自 $E=UV^{\mathsf T}$ 的分解不唯一`],
    answer: 1, why: R`权重只依赖端点颜色，与同色端点之间怎样配对无关；每种颜色独立配对，共 $\prod_a\nu_a!$ 种。`,
  },
  {
    q: R`引理 2.1 的算法中，各块的表 $W_a(\nu,\xi)$ 是怎样合并的？`,
    options: [R`逐元素相乘`, R`把各块的 $\per(B[I_a,J_a])$ 相乘`, R`卷积：对所有满足 $\sum_a\nu^{(a)}=\nu$、$\sum_a\xi^{(a)}=\xi$ 的分配，把 $\prod_aW_a$ 相加`, R`只取每块 $\nu=\xi$ 的项再相乘`],
    answer: 2, why: R`跨块的 $E$-边只在最后的同色配对中出现，它只关心总计数；所以合并就是计数向量相加（卷积）。注意每块内部 $\nu^{(a)}$ 与 $\xi^{(a)}$ 不必相等，只要求总和相等。`,
  },
  {
    q: R`为什么引理 2.1 对 $A$ 的每个方子矩阵都成立？`,
    options: [R`因为子矩阵的积和式可由 $\per(A)$ 推出`, R`删去行列后块划分仍在（块只变小）、低秩部分的秩不增加，同一算法照用`, R`因为子矩阵一定是分块对角的方块`, R`因为删行列后秩变为 0`],
    answer: 1, why: R`$I_a\setminus R_0$、$J_a\setminus C_0$ 仍是大小 $\le s$ 的对应对角块；$U,V$ 只删去一些行，秩 $\le r$。块可能变成非方的——算法不要求方块。`,
  },
];

export const BRIDGE = R`本节交付了一个"计算引擎"：只要矩阵在某点长成"小块 + 低秩"，它的**每一个**方子矩阵的积和式都能在 $\poly(n)\,2^{O(s)}n^{O(r)}$ 内算出。可是输入矩阵 $A$ 本身并没有这种结构。

§3 的策略是：构造一条矩阵多项式曲线 $A(t)$，使 $A(0)=A$，而在若干特殊点 $t=1,\dots,\ell$ 处 $A(i)$ 有结构；再在这些点求 $P(t)=\per(A(t))$ 的前 $h$ 阶导数，用 Hermite 插值拼出 $P(0)$。\sref{L3.1} 将说明：求导数只需要展开点处**子矩阵**的积和式——正是本节"每个方子矩阵"结论派上用场的地方；而它用到的工具，就是本节的加法公式 \eqref{2.2}。`;
