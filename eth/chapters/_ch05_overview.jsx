// 第 5 页高层理解层：开场、路线图、推导图、核心概念、小结、自测、衔接。
const R = String.raw;

export const HOOK_TITLE = R`$\ell$ 个约束、一个多项式：为什么“差一点点”就够了`;   // ch05.jsx 中以 <TxI> 渲染
export const HOOK = R`设想一块有 $\ell$ 个开关的面板。矩阵 $X^{\otimes\ell}$ 的动作是"把所有开关同时拨一下"。§4 已经告诉我们：如果能造出一族矩阵 $J(t)$，在 $t=0$ 时就是 $X^{\otimes\ell}$，而在第 $i$ 个特殊时刻 $t=i$ "完全不碰第 $i$ 个开关"，那么整个 $n\times n$ 的稀疏积和式就会在 $t=i$ 处按第 $i$ 个符号裂成许多小块。

难点在于次数。把第 $x$ 行、第 $\bar x$ 列（$\bar x$ 是 $x$ 逐位取反）这个元素单独拿出来看：它在 $t=0$ 处必须等于 1（全部翻转），在 $t=1,\dots,\ell$ 处又必须都等于 0（第 $i$ 位不许翻）。一个在 $\ell$ 个点上为零、却不恒为零的多项式，次数至少是 $\ell$。而次数为 $\ell$ 意味着每个特殊点要求约 $n$ 阶导数，§3 的插值省不下任何东西。

本节的出路是：允许"作弊"一点点，但作弊的方式必须完全固定。我们在每个特殊点都加上**同一个**矩阵 $E$，并要求它的秩只有 $2^\ell/\ell^{100}$。换到 Hadamard 基底后，$E$ 变成一个对角矩阵，它的非零元恰好对应"低次多项式 $p(x_1+\cdots+x_\ell)$ 与奇偶函数 $x_1\cdots x_\ell$ 不相等"的那些输入；而二项分布的集中性保证，这样的输入只占 $\ell^{-100}$。于是次数从 $\ell$ 降到 $O(\sqrt{\ell\log\ell})$，$d/\ell\to0$，全文的节省由此而来。`;

export const ROADMAP = [
  { sec: "5.1", title: "精确变形为何做不到低次", gist: R`$\bigotimes_j((1-t/j)X+(t/j)I_2)$ 恰好满足要求但次数为 $\ell$；而且任何**精确**的 $i$-好变形都至少是 $\ell$ 次：$(x,\bar x)$ 元素在 $t=0$ 为 1、在 $t=1,\dots,\ell$ 为 0。随后陈述\sref{T5.1}。`, gives: [], next: R`障碍来自"必须精确为零"；要绕开它，需要一种把"相差很少"变成"相差低秩"的语言。` },
  { sec: "5.2", title: "三个基本矩阵与 Hadamard 换基", gist: R`$X,Z,H$ 满足 $HZH=X$；共轭 $M\mapsto H_\ell MH_\ell$ 保持加法与乘法，把 $Z_j$ 的多项式变成 $X_j$ 的多项式；函数 $g$ 对应对角阵 $D_g$，两函数不相等的输入数 = 换基后差的秩。`, gives: ["5.1", "5.2", "5.3", "5.4"], next: R`于是只需找一个低次多项式，让 $p(\sum x_j)$ 与奇偶函数在几乎所有输入上相等。` },
  { sec: "5.3", title: "在绝大多数输入上等于奇偶性的多项式", gist: R`奇偶 $\chi(x)$ 只依赖负坐标个数 $k$：$\chi=(-1)^k$，$\sum x_j=\ell-2k$。在 $\ell/2$ 附近 $d+1$ 个 $k$ 上插值，二项尾界给出失败概率 $\le2e^{-d^2/8\ell}\le\ell^{-100}$。`, gives: ["5.5", "5.6"], next: R`最后把 $p$ 套到 $X_j$ 上，并让第 $i$ 个系数在 $t=i$ 处消失。` },
  { sec: "5.4", title: "让一个系数在每个特殊点消失", gist: R`$\widetilde J(t)=p(\sum_j(1-t/j)X_j)$，$E=X^{\otimes\ell}-\widetilde J(0)$。$t=i$ 时 $X_i$ 的系数为零，$K_i=I_2\otimes p(S_i)$ 是 $i$-好的；$H_\ell EH_\ell$ 为对角阵，秩 $\le2^\ell/\ell^{100}$。`, gives: ["5.7", "5.8"], next: R`§6 把 $J(t)$ 放进 $A(t)=L(I_C\otimes J(t))R'$，代入参数完成主定理。` },
];

export const EQMAP_EDGES = [
  { from: "5.1", to: "5.2", label: R`共轭保持 $+$、$\times$` },
  { from: "5.2", to: "5.3", label: R`$g$ 不含第 $i$ 位` },
  { from: "5.2", to: "5.4", label: R`$H_\ell$ 可逆` },
  { from: "5.5", to: "5.6", label: "二项尾界" },
  { from: "5.5", to: "5.7", label: R`$p$ 代入 $\sum(1-t/j)X_j$` },
  { from: "5.7", to: "5.8", label: R`用 $H_\ell$ 共轭` },
  { from: "5.1", to: "5.8", label: R`$X^{\otimes\ell}\mapsto Z^{\otimes\ell}$` },
  { from: "5.2", to: "5.8", label: R`$X_j\mapsto Z_j$` },
  { from: "5.4", to: "5.8", label: "秩 = 不等个数" },
  { from: "5.6", to: "5.8", label: R`至多 $2^\ell/\ell^{100}$ 个` },
];
export const EQMAP_LABELS = {
  "5.1": "Hadamard 共轭 Z↔X", "5.2": "多项式的共轭", "5.3": "不依赖第 i 位 ⇒ i-好", "5.4": "秩 = 不一致输入数",
  "5.5": "奇偶插值", "5.6": String.raw`例外概率 $\le\ell^{-100}$`, "5.7": "J(t) 的定义", "5.8": "E 换基后是对角阵",
};

export const groups = [
  { id: "obst", label: "障碍与目标" },
  { id: "alg", label: "代数工具" },
  { id: "prob", label: "多项式与概率" },
  { id: "cons", label: "构造" },
];

export const concepts = [
  {
    id: "exact_barrier", name_zh: "精确变形的次数障碍", name_en: "Degree barrier for exact niceness", icon: "🧱", section_id: "5.1", group: "obst",
    plain: R`要在 $\ell$ 个特殊点上都精确地 $i$-好，矩阵多项式至少是 $\ell$ 次。`,
    explain: R`看 $(x,\bar x)$ 这个元素：$X^{\otimes\ell}$ 把 $x$ 的每一位都翻转，所以它在 $t=0$ 处为 1；而 $i$-好矩阵从不改变第 $i$ 位，$x$ 与 $\bar x$ 的第 $i$ 位不同，所以在 $t=i$ 处它必须为 0。一个在 $1,\dots,\ell$ 处都为零、在 0 处为 1 的多项式，至少有 $\ell$ 个根而又不恒为零，次数 $\ge\ell$。

次数为 $\ell$ 时，§3 要求的导数阶数 $h=\lfloor nd/\ell\rfloor+1$ 就是 $n+1$，等于什么都没省。`,
    analogy: R`要求一条曲线在 0 点高度为 1，又要它在 $1,2,\dots,\ell$ 处都贴着地面——它至少要弯 $\ell$ 次。`,
    book_example: { what: R`§5.1：精确构造 $\bigotimes_j\big((1-t/j)X+(t/j)I_2\big)$ 的 $(x,\bar x)$ 元素恰为 $\prod_j(1-t/j)$。`, point: "下界是紧的；只有放宽“精确”二字才能降次。" },
    misconception: "障碍不在于构造不够聪明，而在于单个元素的根的个数——任何精确方案都绕不开。",
  },
  {
    id: "nice_recap", name_zh: String.raw`$i$-好矩阵（回顾）`, name_en: "i-nice matrix", icon: "🔒", section_id: "5.4", group: "obst",
    plain: R`把第 $i$ 个张量因子挪到最前面后形如 $I_2\otimes B$：不碰第 $i$ 位，对其余位的作用与第 $i$ 位无关。`,
    explain: R`\sref{D4.2} / 式 \eqref{4.8}：$K[x,y]=\one\{x_i=y_i\}\,B[x_{-i},y_{-i}]$。\sref{L4.3} 说明：中间矩阵 $i$-好，外层矩阵 $L(I_C\otimes K)R'$ 就按第 $i$ 个符号分块。本节的任务就是在每个特殊点 $t=i$ 处产生这样的矩阵（加上一个公共低秩修正）。`,
    analogy: R`一台多声道调音台：第 $i$ 个声道的推子被锁死在“直通”，其余声道怎么调都与第 $i$ 声道的输入无关。`,
    book_example: { what: R`$K_i=I_2\otimes p(S_i)$：$X_i$ 的系数在 $t=i$ 消失，剩下的 $X_j$ 都在第 $i$ 个因子上是恒等。`, point: R`多项式构造“天然”给出 $I_2\otimes B$ 这种强形式。` },
    misconception: R`$i$-好不是“第 $i$ 个对角块为零”，而是两个对角块完全相同、非对角块为零。`,
  },
  {
    id: "pauli", name_zh: String.raw`$X$、$Z$ 与 Hadamard 换基`, name_en: "Pauli X, Z and Hadamard", icon: "🔄", section_id: "5.2", group: "alg",
    plain: R`$X$ 翻转一位，$Z$ 按位给出 $\pm1$ 符号；Hadamard $H$ 把两者互换：$HZH=X$。`,
    explain: R`$X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$，$Z=\diag(1,-1)$，$H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，$H^2=I_2$。在 $\ell$ 位上，$X_j$、$Z_j$ 只作用于第 $j$ 个张量因子，$H_\ell=H^{\otimes\ell}$。由张量积的混合乘积律，$H_\ell Z_jH_\ell=X_j$，$H_\ell Z^{\otimes\ell}H_\ell=X^{\otimes\ell}$。

关键在于 $Z_j$ 全是对角阵：关于它们的问题（多项式、秩）都只是关于对角元的问题，也就是关于 $\{-1,1\}^\ell$ 上函数的问题。`,
    analogy: R`同一段声音，在时域里是“翻转”，在频域里是“乘以 $\pm1$”——Hadamard 变换就是布尔立方体上的傅里叶变换。`,
    book_example: { what: R`式 \eqref{5.1}。`, point: "把“翻转位的矩阵”翻译成“对角的符号矩阵”。" },
    misconception: R`$1/\sqrt2$ 只出现在证明里；算法实际使用的 \eqref{5.7} 全是有理矩阵。`,
  },
  {
    id: "conj_hom", name_zh: "共轭是代数同态", name_en: "Conjugation is an algebra homomorphism", icon: "🪞", section_id: "5.2", group: "alg",
    plain: R`$M\mapsto H_\ell MH_\ell$ 保持加法和乘法，所以它与“代入多项式”可交换。`,
    explain: R`因为 $H_\ell^2=I$，$(H_\ell MH_\ell)(H_\ell NH_\ell)=H_\ell MNH_\ell$。于是对任何多项式 $p$，$H_\ell\,p(A)\,H_\ell=p(H_\ell AH_\ell)$。取 $A=\sum_jc_jZ_j$ 就得到式 \eqref{5.2}：一个关于 $Z_j$ 的多项式（对角阵）被共轭成同一个多项式关于 $X_j$ 的版本。`,
    analogy: "换一种语言转述一道算术题：先翻译再计算，与先计算再翻译，结果一样。",
    book_example: { what: R`式 \eqref{5.2}；以及 $H_\ell D_gH_\ell=g(X_1,\dots,X_\ell)$。`, point: R`我们可以在对角的 $Z$ 世界里分析，在 $X$ 世界里构造。` },
    misconception: R`这里不需要 $X_j$ 与 $Z_j$ 交换；只需要共轭保持运算。`,
  },
  {
    id: "Dg", name_zh: "函数即对角矩阵", name_en: "Functions as diagonal matrices", icon: "🧮", section_id: "5.2", group: "alg",
    plain: R`把函数 $g:\{-1,1\}^\ell\to\R$ 的 $2^\ell$ 个取值摆在对角线上，得到 $D_g$；它就是 $g(Z_1,\dots,Z_\ell)$。`,
    explain: R`$D_g[b,b]=g\big((-1)^{b_1},\dots,(-1)^{b_\ell}\big)$。$Z_1,\dots,Z_\ell$ 的联合对角元恰好不重不漏地遍历 $\{-1,1\}^\ell$，所以只要把 $g$ 写成多线性多项式再代入 $Z_j$，就得到 $D_g$。

两条推论：$g$ 不依赖第 $i$ 位 ⇒ $D_g=I_2\otimes D_{g'}$，换基后仍形如 $I_2\otimes(\cdots)$，是 $i$-好的（式 \eqref{5.3}）；$H_\ell$ 可逆 ⇒ $H_\ell(D_g-D_h)H_\ell$ 的秩 = 对角差的非零个数 = $g$、$h$ 不相等的输入数（式 \eqref{5.4}）。`,
    analogy: "一张成绩单：每个学生（输入）一行分数；两张成绩单的“差异秩”就是分数不一样的学生人数。",
    book_example: { what: R`式 \eqref{5.3}、\eqref{5.4}。`, point: "“在多数输入上相等”= “换基后相差一个低秩矩阵”。" },
    misconception: "秩等于不相等的输入**个数**，与差值的大小无关——差一点点和差很多，对秩的贡献一样。",
  },
  {
    id: "parity_sym", name_zh: "奇偶函数是对称函数", name_en: "Parity depends only on the count", icon: "⚖️", section_id: "5.3", group: "prob",
    plain: R`$\chi(x)=x_1\cdots x_\ell$ 只取决于负坐标个数 $k$：$\chi=(-1)^k$，而 $\sum_jx_j=\ell-2k$。`,
    explain: R`所以“关于 $\sum_jx_j$ 的单变量多项式 $p$”就能描述 $\chi$：只需在 $z=\ell-2k$ 这些点上让 $p(z)=(-1)^k$。要在全部 $\ell+1$ 个 $k$ 上都对，需要次数 $\ell$；只在中间 $d+1$ 个 $k$ 上对，次数 $d$ 就够。`,
    analogy: "要判断一排灯里亮着的灯是奇数还是偶数盏，只需要数亮灯的个数，与哪几盏亮无关。",
    book_example: { what: R`式 \eqref{5.5}：在以 $\ell/2$ 为中心的 $d+1$ 个连续整数 $k$ 上插值。`, point: R`把 $\ell$ 元布尔函数的问题压缩成一个单变量插值问题。` },
    misconception: R`$p$ 不是 $\chi$ 的“近似”；在窗口内它与 $\chi$ 逐点精确相等。`,
  },
  {
    id: "binom_conc", name_zh: "二项分布的集中性", name_en: "Binomial concentration", icon: "🔔", section_id: "5.3", group: "prob",
    plain: R`随机 $x$ 的负坐标个数 $k\sim\Bin(\ell,1/2)$，几乎总落在 $\ell/2$ 附近 $O(\sqrt\ell)$ 的范围内。`,
    explain: R`Hoeffding 不等式：$\Pr(|k-\ell/2|\ge s)\le2\exp(-2s^2/\ell)$。插值窗口覆盖 $|k-\ell/2|\le d/4$，取 $s=d/4$ 得 $2\exp(-d^2/8\ell)$。$d=\lceil100\sqrt{\ell\log\ell}\rceil$ 时这比 $\ell^{-100}$ 小得多。

标准差只有 $\sqrt\ell/2$，而窗口半宽约为 $\sqrt{\ell\log\ell}$ 的常数倍——多出的 $\sqrt{\log\ell}$ 因子正是把失败概率从常数压到 $\ell^{-100}$ 所需的代价。`,
    analogy: R`抛 1000 枚硬币，正面数落在 400–600 之外的概率小于 $10^{-9}$。`,
    book_example: { what: R`式 \eqref{5.6}。`, point: R`次数 $d$ 只需比 $\sqrt\ell$ 多一个 $\sqrt{\log\ell}$ 因子。` },
    misconception: R`失败的输入并不“随机分布”在各层：它们全部集中在 $k$ 很小或很大的极端层。`,
  },
  {
    id: "exact_vs_approx", name_zh: "例外集外精确相等", name_en: "Exact agreement off a small set", icon: "🎯", section_id: "5.3", group: "prob",
    plain: "我们要的是“在小例外集之外完全相等”，而不是“处处数值接近”。",
    explain: R`秩只数不相等的输入个数，不在乎差多少。所以 $p$ 在例外输入上的值哪怕大得离谱也无妨。反过来，一致逼近（处处误差小）对秩毫无帮助：只要每个输入都差一点点，换基后的对角阵就是满秩的。`,
    analogy: "考试只看“对/错”而不看“错得多离谱”：答错 5 题，不管错成什么样都是扣 5 题的分。",
    book_example: { what: R`§5.3 末：On the exceptional inputs, $p$ may be large。`, point: "这是低秩框架与通常的“多项式逼近”最大的不同。" },
    misconception: R`不要用 Chebyshev 型一致逼近来理解这里的 $p$；那会导致满秩误差。`,
  },
  {
    id: "vanish", name_zh: "让一个系数在每个特殊点消失", name_en: "Vanishing coefficient trick", icon: "🕳️", section_id: "5.4", group: "cons",
    plain: R`把 $X_j$ 的系数取成 $1-t/j$：$t=0$ 时全是 1，$t=i$ 时恰好第 $i$ 个为 0。`,
    explain: R`$\widetilde J(t)=p\big(\sum_j(1-t/j)X_j\big)$。$t=0$ 时就是 $p(\sum_jX_j)$；$t=i$ 时 $X_i$ 从和式中消失，剩下的每个 $X_j$ 在第 $i$ 个因子上都是恒等，它们的任何多项式也是——所以 $K_i=\widetilde J(i)=I_2\otimes p(S_i)$ 是 $i$-好的。次数只是 $p$ 的次数 $d$，与 $\ell$ 无关。`,
    analogy: R`$\ell$ 盏灯各配一个调光旋钮，第 $j$ 个旋钮在 $t=j$ 时恰好拧到 0：每个时刻都有一盏灯熄灭，其余的灯随意。`,
    book_example: { what: R`式 \eqref{5.7} 与 $K_i$ 的公式。`, point: R`§5.1 的精确构造用的是同一套系数 $1-t/j$，只是把 $p$ 换成了张量积。` },
    misconception: R`$j<i$ 时系数 $1-i/j$ 是负数，这完全允许；$i$-好只要求 $X_i$ 不出现。`,
  },
  {
    id: "common_E", name_zh: String.raw`公共的低秩修正 $E$`, name_en: "One error matrix for all special points", icon: "🧩", section_id: "5.4", group: "cons",
    plain: R`$E=X^{\otimes\ell}-\widetilde J(0)$ 与 $t$ 无关：所有特殊点共用同一个修正，秩 $\le2^\ell/\ell^{100}$。`,
    explain: R`$J(t)=\widetilde J(t)+E$ 保证 $J(0)=X^{\otimes\ell}$；在 $t=i$ 处 $J(i)=K_i+E$。换基后 $H_\ell EH_\ell=Z^{\otimes\ell}-p(\sum_jZ_j)$ 是对角阵，元素 $\chi(x)-p(\sum_jx_j)$，非零个数 $\le2^\ell\ell^{-100}$。

因为 $E$ 不依赖 $i$，§6 中输出端的修正 $E_{\rm out}=L(I_C\otimes E)R'$ 也只有一个，秩 $\le M/\ell^{100}$。§5.1 的障碍元素 $(x,\bar x)$ 恰好全由 $E$ 承担（当 $d<\ell$ 时 $E[x,\bar x]=1$）。`,
    analogy: "每个特殊时刻都戴同一副“矫正眼镜”：眼镜本身很简单（低秩），却让每个时刻看到的画面都整齐分块。",
    book_example: { what: R`式 \eqref{5.7}、\eqref{5.8}；\eqref{4.9} 与 \eqref{6.2} 使用它。`, point: R`低秩部分不是被丢弃的误差，而是被精确地交给 \sref{L2.1} 处理。` },
    misconception: R`$E$ 不是“小”矩阵（元素可以很大），它只是秩小。`,
  },
];

export const relations = [
  { from: "exact_barrier", to: "common_E", label: "用低秩修正绕开" },
  { from: "nice_recap", to: "exact_barrier", label: "(x,x̄) 元素必须为 0" },
  { from: "pauli", to: "conj_hom", label: String.raw`$H^2=I$` },
  { from: "conj_hom", to: "Dg", label: "g(Z) ↦ g(X)" },
  { from: "Dg", to: "common_E", label: "秩 = 不等个数" },
  { from: "parity_sym", to: "binom_conc", label: String.raw`$k\sim\Bin(\ell,1/2)$` },
  { from: "binom_conc", to: "exact_vs_approx", label: String.raw`例外 $\le\ell^{-100}$` },
  { from: "exact_vs_approx", to: "common_E", label: "只数个数" },
  { from: "vanish", to: "nice_recap", label: String.raw`$K_i=I_2\otimes p(S_i)$` },
  { from: "parity_sym", to: "vanish", label: "p 代入 Xⱼ" },
];

export const TAKEAWAYS = [
  R`**障碍**：精确的 $i$-好变形必须 $\ge\ell$ 次——$(x,\bar x)$ 元素在 $t=0$ 为 1、在 $t=1,\dots,\ell$ 为 0；次数 $\ell$ 意味着 $h\approx n$，毫无节省。`,
  R`**换基**：$HZH=X$，共轭保持加法与乘法；函数 $g$ ↔ 对角阵 $D_g=g(Z_1,\dots,Z_\ell)$；$\rank(H_\ell(D_g-D_h)H_\ell)=|\{g\ne h\}|$——"多数输入相等"即"相差低秩"。`,
  R`**奇偶插值**：$\chi=(-1)^k$、$\sum x_j=\ell-2k$；在 $\ell/2$ 附近 $d+1$ 个 $k$ 上插值得到 $\deg p\le d$，失败概率 $\le2e^{-d^2/8\ell}\le\ell^{-100}$，$d=\lceil100\sqrt{\ell\log\ell}\rceil$。`,
  R`**构造**：$J(t)=p\big(\sum_j(1-t/j)X_j\big)+E$，$E=X^{\otimes\ell}-p(\sum_jX_j)$。$t=i$ 时 $X_i$ 的系数消失，$K_i=I_2\otimes p(S_i)$ 是 $i$-好的；$E$ 对所有 $i$ 相同，$\rank E=|\{x:p(\sum x_j)\ne\chi(x)\}|\le2^\ell/\ell^{100}$。`,
  R`**结果**：次数 $d=O(\sqrt{\ell\log\ell})$，所以 $d/\ell\to0$——§3 的导数阶数 $h\approx nd/\ell$ 远小于 $n$，这就是全文的指数节省。`,
];

export const QUIZ = [
  {
    q: R`为什么任何精确满足 $J(0)=X^{\otimes\ell}$、$J(i)$ 为 $i$-好（$i=1,\dots,\ell$）的矩阵多项式次数都至少为 $\ell$？`,
    options: [R`因为 $X^{\otimes\ell}$ 的秩是 $2^\ell$`, R`因为 $(x,\bar x)$ 元素在 $t=0$ 为 1、在 $t=1,\dots,\ell$ 处都为 0，非零多项式有 $\ell$ 个根`, R`因为 Hadamard 矩阵含 $1/\sqrt2$`, R`因为二项分布的尾部太重`],
    answer: 1, why: R`$i$-好矩阵不改变第 $i$ 位，而 $x$ 与 $\bar x$ 每一位都不同，所以 $(x,\bar x)$ 元素在每个 $t=i$ 处为 0；它在 $t=0$ 处为 1，不恒为零，故次数 $\ge\ell$。`,
  },
  {
    q: R`式 \eqref{5.4} 中 $\rank(H_\ell(D_g-D_h)H_\ell)$ 等于什么？`,
    options: [R`$|g-h|$ 的最大值`, R`$g$ 与 $h$ 不相等的输入 $x$ 的个数`, R`$g$ 与 $h$ 的次数之差`, R`$2^\ell$ 减去相等输入数的一半`],
    answer: 1, why: R`$H_\ell$ 可逆不改变秩；$D_g-D_h$ 是对角阵，秩 = 非零对角元个数 = $|\{x:g(x)\ne h(x)\}|$。`,
  },
  {
    q: R`插值多项式 $p$ 在窗口外（极端的 $k$）上的取值有什么特点？`,
    options: [R`与 $(-1)^k$ 很接近`, R`恒为 0`, R`可以非常大，但这不影响秩界`, R`必须有界，否则 $E$ 的秩会变大`],
    answer: 2, why: R`秩只数不相等的输入**个数**；$p$ 在例外输入上的值多大都无所谓。这是"例外集外精确相等"，不是一致逼近。`,
  },
  {
    q: R`在 $t=i$ 处，$K_i=\widetilde J(i)$ 为什么是 $i$-好的？`,
    options: [R`因为 $\deg p<\ell$`, R`因为 $X_i$ 的系数 $1-i/i=0$，其余 $X_j$ 在第 $i$ 个因子上都是恒等，所以 $K_i=I_2\otimes p(S_i)$`, R`因为 $E$ 吸收了所有非 $i$-好的部分`, R`因为 $H_\ell$ 与 $X_i$ 交换`],
    answer: 1, why: R`$\widetilde J(i)=p\big(\sum_{j\ne i}(1-i/j)X_j\big)$；每个 $X_j$（$j\ne i$）的第 $i$ 个因子是 $I_2$，和与幂都保持这种形式。`,
  },
  {
    q: R`\sref{T5.1} 中"**同一个**矩阵 $E$"为什么重要？`,
    options: [R`它让 $E$ 是对角阵`, R`它使 §6 中输出端只需一个低秩修正 $E_{\rm out}$，在所有特殊点相同`, R`它让 $p$ 的系数是有理数`, R`它保证 $J(0)=X^{\otimes\ell}$`],
    answer: 1, why: R`$E$ 与 $t$ 无关，经 \eqref{4.9} 得到的 $E_{\rm out}=L(I_C\otimes E)R'$ 也与 $i$ 无关。`,
  },
  {
    q: R`把 $d$ 取成 $\lceil c\sqrt{\ell\log_2\ell}\rceil$，要保证 $2\exp(-d^2/8\ell)\le\ell^{-100}$，常数 $c$ 大约需要多大？`,
    options: [R`$c\ge1$`, R`$c>\sqrt{800\ln2}\approx23.6$（取 24 即可吸收因子 2）`, R`$c\ge100$ 才行`, R`$c\ge\ell$`],
    answer: 1, why: R`$d^2/8\ell\ge(c^2/8)\log_2\ell=\frac{c^2}{8\ln2}\ln\ell$，需要 $c^2/(8\ln2)>100$。论文取 100，留有很大余量。`,
  },
];

export const BRIDGE = R`本节在一个布尔立方体 $\{0,1\}^\ell$ 上造好了局部多项式 $J(t)$：$J(0)=X^{\otimes\ell}$，$J(i)=K_i+E$，次数 $d=O(\sqrt{\ell\log\ell})$，$\rank E\le2^\ell/\ell^{100}$。§6 把它放回 §4 的分解：$A(t)=L(I_C\otimes J(t))R'$。于是 $A(0)=A$；在每个特殊点 $A(i)=B_i+E_{\rm out}$，$B_i$ 按第 $i$ 个符号分成大小 $\le3n/q$ 的块（\sref{L4.3}），$E_{\rm out}$ 的秩 $\le M/\ell^{100}$（\eqref{4.9}）。再按 \eqref{6.1} 取 $q=\lceil(\log n)^{10}\rceil$、$\ell=\Theta(\log n/\log\log n)$，得 $d=\Theta(\sqrt{\log n})$、$d/\ell\to0$，§3 的插值就给出主定理 \sref{T6.1} 的时间界。`;
