// 第 3 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "电脑怎么“看见”一个洞？";
export const HOOK = R`一根载流长直导线外面，磁场处处无旋：$\nabla\times\nosym{\boldsymbol{B}}=0$。可是绕导线走一圈，$\oint\nosym{\boldsymbol{B}}\cdot\dd\nosym{\boldsymbol{l}}=\nosym{\mu_0I}\neq0$。若这条闭路是某块"不含导线"的曲面的边界，Stokes 定理会逼它为零——所以它**不是任何曲面的边界**。问题出在空间本身：去掉导线后的空间里有一个洞，绕洞的闭路"没有边界，却又不是边界"。

再换一个场景。拓扑数据分析（TDA）要从一团数据点里判断"有没有环、有没有空腔"。计算机看不见形状，它能做的只有：把点连成三角形网格，写下一些只含 $0,\pm1$ 的整数矩阵，求秩、做整数消元——然后报告"这里有 2 个环、1 个空腔"。

本章就是这套方法的原始版本。我们把空间剖分成**单形**，用整数系数的形式和（**链**）描述"区域"，用**边界算子** $\partial$ 描述"取边界"，证明 $\partial^2=0$（边界没有边界），然后定义**同调群** $H_r=\ker\partial_r/\operatorname{im}\partial_{r+1}$——"没有边界的东西"模去"是边界的东西"。圆周有 $H_1\cong\mathbb{Z}$，球面有 $H_2\cong\mathbb{Z}$，射影平面有一条"绕两圈才成为边界"的闭路，$H_1\cong\mathbb{Z}_2$。最后，Euler 的 $\nosym{V-E+F}$ 会以 $\sum(-1)^rb_r$ 的形式重新出现。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "3.0", title: "指导原则：闭路但不是边界", gist: R`实心三角形与空心三角形的区别：三条边都没有边界，但只有前者是某块区域的边界。`, gives: [], next: R`要把这句话变成数学，先要会算"商"。` },
  { sec: "3.1", title: "Abel 群：商群与结构定理", gist: R`商群 $G/H$ 把子群当作零；同态基本定理 $G_1/\ker f\cong\operatorname{im}f$ 是算商群的万能工具；有限生成 Abel 群 $\cong\mathbb{Z}^r\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}$。`, gives: ["3.3", "3.6", "3.9", "3.10"], next: R`代数备好了，下面准备几何积木。` },
  { sec: "3.2", title: "单形与单纯复形", gist: R`$r$ 单形是 $r+1$ 个几何独立点的凸包；单纯复形要求面封闭、两两之交为公共面；$|K|\cong X$ 给出三角剖分。`, gives: ["3.11", "3.12"], next: R`给积木定向，就能做加减。` },
  { sec: "3.3.1", title: "定向单形", gist: R`$(p_{i_0}\ldots p_{i_r})=\operatorname{sgn}(P)(p_0\ldots p_r)$：反向即取负。`, gives: ["3.13", "3.14"], next: R`有了符号，"边界"就能写成交错和。` },
  { sec: "3.3.2", title: R`链、边界算子与 $\partial^2=0$`, gist: R`$C_r(K)\cong\mathbb{Z}^{I_r}$；$\partial_r(p_0\ldots p_r)=\sum(-1)^i(p_0\ldots\hat p_i\ldots p_r)$；$\partial_r\partial_{r+1}=0$ 推出 $B_r\subset Z_r$。`, gives: ["3.17", "3.20", "3.23", "3.26", "3.27"], next: R`既然边缘都是闭链，就可以做商。` },
  { sec: "3.3.3", title: "同调群与第一批计算", gist: R`$H_r=Z_r/B_r$ 是拓扑不变量；点、线段、圆周、圆盘、球面逐一算出。`, gives: ["3.28", "3.32", "3.37", "3.40", "3.42"], next: R`所有连通的例子 $H_0$ 都是 $\mathbb{Z}$——为什么？` },
  { sec: "3.3.4", title: R`$H_0$ 与连通性`, gist: R`连通 ⇒ 所有顶点同调；"系数和"给出 $H_0\cong\mathbb{Z}$。`, gives: ["3.43"], next: R`接下来挑战不可定向曲面。` },
  { sec: "3.3.5", title: R`Möbius 带、$\sym{RP}{\mathbb{R}P^2}$、$T^2$、Klein 瓶`, gist: R`Möbius 带边界 $\sim2z$；$\sym{RP}{\mathbb{R}P^2}$ 全部三角形之和的边界是 $2z$，于是 $H_1\cong\mathbb{Z}_2$（挠）；$H_1(\Sigma_g)\cong\mathbb{Z}^{2g}$；Klein 瓶 $H_1\cong\mathbb{Z}_2\oplus\mathbb{Z}$。`, gives: ["3.45", "3.47", "3.48", "3.49", "3.51"], next: R`从个例提炼一般结构。` },
  { sec: "3.4", title: "一般性质：分支、挠、Betti 数、Euler–Poincaré", gist: R`$H_r(K)=\bigoplus_iH_r(K_i)$；$H_0\cong\mathbb{Z}^N$；$H_r\cong\mathbb{Z}^f\oplus$ 挠；$b_r=\dim H_r(K;\mathbb{R})$；$\sum(-1)^rI_r=\sum(-1)^rb_r$。`, gives: ["3.52", "3.53", "3.54", "3.56", "3.57"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "3.1", to: "3.6", label: R`核与像是子群` },
  { from: "3.3", to: "3.6", label: R`$\varphi([x])=f(x)$` },
  { from: "3.6", to: "3.9", label: R`$f(n)=nx$` },
  { from: "3.6", to: "3.10", label: R`+ 引理 3.2` },
  { from: "3.11", to: "3.14", label: "给顶点排序" },
  { from: "3.14", to: "3.20", label: R`交错符号` },
  { from: "3.19", to: "3.20", label: "推广" },
  { from: "3.15", to: "3.21", label: "线性延拓" },
  { from: "3.20", to: "3.21", label: "" },
  { from: "3.21", to: "3.23", label: R`串成序列` },
  { from: "3.20", to: "3.26", label: R`删两次，成对相消` },
  { from: "3.26", to: "3.27", label: R`$\partial(\partial d)=0$` },
  { from: "3.27", to: "3.28", label: "商群良定义" },
  { from: "3.28", to: "3.32", label: "定理 3.4" },
  { from: "3.6", to: "3.43", label: R`系数和 $f$` },
  { from: "3.28", to: "3.43", label: "连通" },
  { from: "3.43", to: "3.53", label: "逐分支" },
  { from: "3.52", to: "3.53", label: "" },
  { from: "3.47", to: "3.48", label: R`$2z=\partial(\sum\sigma)$` },
  { from: "3.28", to: "3.47", label: R`$\sym{RP}{\mathbb{R}P^2}$` },
  { from: "3.10", to: "3.54", label: R`用于 $Z_r/B_r$` },
  { from: "3.48", to: "3.54", label: "挠的实例" },
  { from: "3.54", to: "3.55", label: R`$\otimes\mathbb{R}$` },
  { from: "3.55", to: "3.56", label: "取维数" },
  { from: "3.56", to: "3.57", label: "秩–零化度" },
];
export const EQMAP_LABELS = {
  "3.1": "同态", "3.3": "商群加法", "3.6": "同态基本定理", "3.9": "循环群分类", "3.10": "有限生成 Abel 群结构",
  "3.11": R`$r$ 单形`, "3.14": "定向", "3.15": R`$r$ 链`, "3.19": R`$\partial_1$`, "3.20": "边界算子", "3.21": "线性延拓", "3.23": "链复形",
  "3.26": R`$\partial^2=0$`, "3.27": R`$B_r\subset Z_r$`, "3.28": "同调群", "3.32": "空间的同调群", "3.43": R`连通 $\Rightarrow H_0\cong\mathbb{Z}$`,
  "3.52": "分支直和", "3.53": R`$H_0$ 数分支`, "3.47": R`$\sym{RP}{\mathbb{R}P^2}$：全体之和的边界`, "3.48": R`$H_1(\sym{RP}{\mathbb{R}P^2})\cong\mathbb{Z}_2$`,
  "3.54": "同调群 = 自由 + 挠", "3.55": "实系数", "3.56": "Betti 数", "3.57": "Euler–Poincaré",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "alg", label: "代数工具" },
  { id: "geo", label: "几何积木" },
  { id: "hom", label: "同调的核心" },
  { id: "inv", label: "不变量" },
];

export const concepts = [
  {
    id: "quotient", name_zh: "商群", name_en: "Quotient group", icon: "➗", section_id: "3.1.1", group: "alg",
    plain: R`把子群 $H$ 里的元素全部"当作零"，剩下的就是 $G/H$。`,
    explain: R`规定 $x\sim y\iff x-y\in H$，等价类的集合 $G/H$ 继承加法 $[x]+[y]=[x+y]$。良定义的关键是：换代表元只会多出 $H$ 中的元素。Abel 群的每个子群都正规，所以商总是群。

同调群 $H_r=Z_r/B_r$ 就是一个商群：在闭链中把边缘当作零。`,
    analogy: R`钟表算术：把 12 的倍数当作零，整数就变成 $\mathbb{Z}_{12}$——13 点和 1 点是同一个时刻。`,
    book_example: { what: R`例 3.1：$\mathbb{Z}/2\mathbb{Z}=\{[0],[1]\}\cong\mathbb{Z}_2$。`, point: "商群的元素是等价类，不是具体的数。" },
    misconception: R`$G/H$ 不是 $G$ 的子群：它的元素是陪集。$\mathbb{Z}_2$ 也不是 $\mathbb{Z}$ 的子群。`,
  },
  {
    id: "fund_hom", name_zh: "同态基本定理", name_en: "Fundamental theorem of homomorphism", icon: "🔑", section_id: "3.1.1", group: "alg",
    plain: R`$G_1/\ker f\cong\operatorname{im}f$：同态丢掉的恰好是它的核。`,
    explain: R`计算商群最常用的手法：要算 $Z/B$，找一个满同态 $f:Z\to G$ 使 $\ker f=B$，就得到 $Z/B\cong G$。本章算 $H_0$ 时反复使用"系数和"同态 $f(\sum n_ip_i)=\sum n_i$。`,
    analogy: R`给照片拍"投影"：同一条投影线上的点都被压成一个点（核），被压扁之后的样子就是投影图像（像）。`,
    book_example: { what: R`例 3.7、3.8 与定理 3.5：$\ker f=B_0(K)$，故 $H_0(K)\cong\mathbb{Z}$。`, point: "不用列举等价类，只需证明一个核等于边缘群。" },
    misconception: R`定理要求 $f$ 是同态；而"$\cong\operatorname{im}f$"中的像不一定是整个 $G_2$。`,
  },
  {
    id: "fg_abelian", name_zh: "有限生成 Abel 群与秩", name_en: "Finitely generated Abelian group", icon: "🧱", section_id: "3.1.3", group: "alg",
    plain: R`任何有限生成 Abel 群 $\cong\mathbb{Z}^r\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}$。`,
    explain: R`自由部分 $\mathbb{Z}^r$ 的秩 $r$ 是同构不变量；有限循环部分是挠子群。证明的核心是：自由 Abel 群的子群在适当的基下由 $k_1x_1,\ldots,k_px_p$ 生成（引理 3.2），即整数矩阵的 Smith 标准形。`,
    analogy: R`像晶格：$\mathbb{Z}^r$ 是 $r$ 个方向上无限延伸的格点，$\mathbb{Z}_k$ 是一个只有 $k$ 格的"圆环跑道"。`,
    book_example: { what: R`式 (3.10)；§3.4.2 把它用于同调群 (3.54)。`, point: "算同调群 = 算出一个秩和一串挠因子。" },
    misconception: R`有限生成不等于自由：$\mathbb{Z}_2$ 由 $1$ 生成，但 $1+1=0$。`,
  },
  {
    id: "simplex", name_zh: "单形与单纯复形", name_en: "Simplex & simplicial complex", icon: "🔺", section_id: "3.2", group: "geo",
    plain: "点、线段、三角形、四面体……以及它们规规矩矩拼成的整体。",
    explain: R`$r$ 单形是 $r+1$ 个几何独立点的凸包，有 $\binom{r+1}{q+1}$ 个 $q$ 面。单纯复形 $K$ 要求：单形的面都在 $K$ 中；两个单形要么不交、要么交于公共面。与 $X$ 同胚的多面体 $|K|$ 给出 $X$ 的三角剖分。`,
    analogy: "乐高积木：只用标准块，而且块与块必须严丝合缝地扣在一整面上，不允许“错位搭接”。",
    book_example: { what: R`例 3.5：圆柱面的"简单"剖分图 3.5(b) 不合格——两个三角形交于两个分离的顶点。`, point: "粘合图要切得足够细。" },
    misconception: R`三角剖分不是唯一的；同调群与剖分无关，但 $C_r$、$Z_r$、$B_r$ 与剖分有关。`,
  },
  {
    id: "orientation", name_zh: "定向", name_en: "Orientation", icon: "🔄", section_id: "3.3.1", group: "geo",
    plain: R`顶点的顺序决定方向；奇置换使单形变号。`,
    explain: R`$(p_{i_0}\ldots p_{i_r})=\operatorname{sgn}(P)(p_0\ldots p_r)$。有了它，"反向走"就是"负的走"，链才能加减，边界才能相消。`,
    analogy: R`像外微分形式 $\dd x\wedge\dd y=-\dd y\wedge\dd x$：交换两个方向就变号。`,
    book_example: { what: R`式 (3.13)：$(p_0p_1)=-(p_1p_0)$；$(p_0p_1p_2)=(p_1p_2p_0)=-(p_0p_2p_1)$。`, point: "轮换（偶置换）不变号，对换变号。" },
    misconception: "给每个单形选哪个定向都可以——同调群不受影响；但同一单形在不同地方出现时必须按同一约定比较。",
  },
  {
    id: "chain", name_zh: "链群", name_en: "Chain group", icon: "⛓️", section_id: "3.3.2", group: "hom",
    plain: R`单形的整系数形式组合：$C_r(K)\cong\mathbb{Z}^{I_r}$。`,
    explain: R`每个定向 $r$ 单形是一个基向量，$r$ 链就是整数向量。这样"区域的拼接"变成了加法，"取边界"变成了矩阵乘法。`,
    analogy: R`像电路网络里的"电流分配"：每条导线上流过整数单位的电流，方向由符号表示。`,
    book_example: { what: R`§3.3.3：三角形的边 $C_1\cong\mathbb{Z}^3$，正方形的边 $C_1\cong\mathbb{Z}^4$。`, point: "链群依赖剖分，不是拓扑不变量。" },
    misconception: "链不是单形的集合，而是带整数系数的形式和；系数可以为负、可以大于 1。",
  },
  {
    id: "boundary_op", name_zh: R`边界算子与 $\partial^2=0$`, name_en: "Boundary operator", icon: "🔲", section_id: "3.3.2", group: "hom",
    plain: R`$\partial(p_0\ldots p_r)=\sum_i(-1)^i(p_0\ldots\hat p_i\ldots p_r)$，且边界的边界为零。`,
    explain: R`交错符号是为了让"内部的边界"相消：切开的线段中点、拼起的三角形公共边都不应算作边界。$\partial_r\partial_{r+1}=0$ 的证明：每个删去两个顶点的面恰好出现两次，符号相反。`,
    analogy: R`相当于向量分析里的"旋度的散度为零、梯度的旋度为零"——同一个"$\dd^2=0$"结构：边界没有边界，正如旋度场没有源。`,
    book_example: { what: R`式 (3.26) 与图 3.7：$\partial_1[(p_0p_1)+(p_1p_2)+(p_2p_0)]=0$。`, point: "符号规则不是随意的，是相消所必需的。" },
    misconception: R`$\partial$ 降低维数一维；$\partial_0$ 规定为零映射，所以每个 0 链都是闭链。`,
  },
  {
    id: "cycle_boundary", name_zh: "闭链与边缘", name_en: "Cycles & boundaries", icon: "⭕", section_id: "3.3.2", group: "hom",
    plain: R`闭链：$\partial c=0$（没有边界）。边缘：$c=\partial d$（是边界）。边缘都是闭链。`,
    explain: R`$Z_r=\ker\partial_r$，$B_r=\operatorname{im}\partial_{r+1}$，$B_r\subset Z_r$。不是边缘的闭链围住了一个"洞"。判断一条闭链是否边缘是一个**整数**线性方程组的可解性问题。`,
    analogy: "一根橡皮筋套在甜甜圈上绕一圈：它是封闭的（闭链），但不是甜甜圈表面任何一块区域的边（不是边缘）。",
    book_example: { what: R`例 3.10：Möbius 带的中线 $z$ 不是边缘，它的边界 $z''$ 与 $2z$ 只差一个边缘。`, point: R`$z\sim z'$ 当且仅当 $z-z'$ 是边缘。` },
    misconception: "闭链不必是一条“简单闭曲线”：任何边界为零的整系数组合都是闭链。",
  },
  {
    id: "homology", name_zh: "同调群", name_en: "Homology group", icon: "🕳️", section_id: "3.3.3", group: "hom",
    plain: R`$H_r(K)=Z_r(K)/B_r(K)$：没有边界的东西，模去是边界的东西。`,
    explain: R`$H_0$ 数连通分支，$H_1$ 数独立的"环洞"，$H_2$ 数被包住的"空腔"。它的元素是同调类 $[z]$；$[z]=0$ 意味着 $z$ 是边缘。`,
    analogy: "把所有能“扫”成彼此的闭路归为一类，只数有多少本质不同的类。",
    book_example: { what: R`$H_*(S^1)=(\mathbb{Z},\mathbb{Z})$，$H_*(S^2)=(\mathbb{Z},0,\mathbb{Z})$，$H_*(T^2)=(\mathbb{Z},\mathbb{Z}^2,\mathbb{Z})$。`, point: "同调群把形状的“洞”分维数记录下来。" },
    misconception: R`同调群相同并不意味着同胚；同调群是必要条件型的不变量。`,
  },
  {
    id: "invariance", name_zh: "拓扑不变性", name_en: "Topological invariance", icon: "🧭", section_id: "3.3.3", group: "inv",
    plain: R`同胚的空间，无论怎么剖分，同调群都同构。`,
    explain: R`定理 3.4（原书不证）。由此 $H_r(X)\equiv H_r(K)$ 有意义，Betti 数与 Euler 示性数都是拓扑不变量。证明需要单纯逼近与重心重分。`,
    analogy: "无论用多细的网格去量同一块布，量出的“有几个窟窿”都一样。",
    book_example: { what: R`习题 3.2：三角形的边与正方形的边，$C_1$ 不同，$H_*$ 相同。`, point: "剖分的细节在商群中被抵消。" },
    misconception: "同调群是拓扑不变量，但不是“完全不变量”：存在同调群相同而不同胚的空间。",
  },
  {
    id: "torsion", name_zh: "挠与扭转", name_en: "Torsion", icon: "🌀", section_id: "3.4.2", group: "inv",
    plain: R`有些闭链自己不是边缘，但它的 $k$ 倍是：$H_r$ 中出现 $\mathbb{Z}_k$。`,
    explain: R`$\mathbb{R}\mathrm{P}^2$ 中 $z$ 不是边缘而 $2z$ 是，$H_1\cong\mathbb{Z}_2$。挠源于整数不能做除法：方程 $\partial_2c=z$ 有有理解 $c=\tfrac12\sum\sigma$，无整数解。挠探测空间的"扭转"（不可定向性）；实系数同调看不到挠。`,
    analogy: "Möbius 带式的“拧了一下”：沿边走一圈回到原处时方向反了，要走两圈才能“闭合成边界”。",
    book_example: { what: R`例 3.11 (3.47)–(3.48)；例 3.13：Klein 瓶 $H_1\cong\mathbb{Z}_2\oplus\mathbb{Z}$。`, point: "挠只有整数系数看得见。" },
    misconception: R`挠不影响 Betti 数与 Euler 示性数：$\mathbb{R}\mathrm{P}^2$ 的 $b_1=0$。`,
  },
  {
    id: "betti_euler", name_zh: "Betti 数与 Euler–Poincaré", name_en: "Betti numbers & Euler–Poincaré", icon: "🔢", section_id: "3.4.3", group: "inv",
    plain: R`$b_r=\dim H_r(K;\mathbb{R})$；$\sum(-1)^rI_r=\sum(-1)^rb_r$。`,
    explain: R`左边是数单形的交错和（依赖剖分），右边是拓扑不变量；二者相等说明 Euler 示性数与剖分无关。证明：$I_r=\dim Z_r+\dim B_{r-1}$，$b_r=\dim Z_r-\dim B_r$，交错和中 $B$ 项望远镜相消。`,
    analogy: "会计对账：每一维的“资产”（单形数）拆成“留存”（闭链）和“流出到下一维”（边缘），交错求和时流出与流入互相抵消。",
    book_example: { what: R`$T^2$：$9-27+18=0=1-2+1$；$S^2$：$4-6+4=2=1-0+1$。`, point: R`$\chi=2-2g$ 对亏格 $g$ 的曲面成立。` },
    misconception: R`$b_0$ 不是顶点数，而是连通分支数。`,
  },
];

export const relations = [
  { from: "quotient", to: "fund_hom", label: "计算工具" },
  { from: "fund_hom", to: "fg_abelian", label: "证明结构定理" },
  { from: "simplex", to: "orientation", label: "排序" },
  { from: "orientation", to: "chain", label: "反向即负" },
  { from: "chain", to: "boundary_op", label: R`$\partial$ 是线性映射` },
  { from: "boundary_op", to: "cycle_boundary", label: R`$\ker$ 与 $\operatorname{im}$` },
  { from: "cycle_boundary", to: "homology", label: R`$Z/B$` },
  { from: "quotient", to: "homology", label: "同调群是商群" },
  { from: "homology", to: "invariance", label: "定理 3.4" },
  { from: "fg_abelian", to: "torsion", label: R`$\mathbb{Z}_k$ 部分` },
  { from: "homology", to: "torsion", label: R`$\mathbb{R}\mathrm{P}^2$` },
  { from: "homology", to: "betti_euler", label: "自由部分的秩" },
  { from: "invariance", to: "betti_euler", label: R`$\chi$ 与剖分无关` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**原则**：洞 = 没有边界、却又不是边界的东西。代数化之后就是 $H_r(K)=Z_r(K)/B_r(K)=\ker\partial_r/\operatorname{im}\partial_{r+1}$。`}</TxI>,
  <TxI>{R`**机器**：定向单形 $(p_{i_0}\ldots p_{i_r})=\operatorname{sgn}(P)(p_0\ldots p_r)$；边界 $\partial_r(p_0\ldots p_r)=\sum_i(-1)^i(p_0\ldots\hat p_i\ldots p_r)$；核心恒等式 $\partial_r\partial_{r+1}=0$。`}</TxI>,
  <TxI>{R`**代数**：同态基本定理 $G_1/\ker f\cong\operatorname{im}f$ 是计算商群的主力；有限生成 Abel 群 $\cong\mathbb{Z}^r\oplus\bigoplus\mathbb{Z}_{k_i}$，同调群也是如此。`}</TxI>,
  <TxI>{R`**结果**：$H_*(S^1)=(\mathbb{Z},\mathbb{Z})$；$H_*(S^2)=(\mathbb{Z},0,\mathbb{Z})$；$H_*(T^2)=(\mathbb{Z},\mathbb{Z}^2,\mathbb{Z})$；$H_1(\Sigma_g)=\mathbb{Z}^{2g}$；$H_*(\sym{RP}{\mathbb{R}P^2})=(\mathbb{Z},\mathbb{Z}_2,0)$；Klein 瓶 $(\mathbb{Z},\mathbb{Z}\oplus\mathbb{Z}_2,0)$。`}</TxI>,
  <TxI>{R`**一般性质**：$H_0\cong\mathbb{Z}^{\#\text{分支}}$；挠子群探测扭转，只有 $\mathbb{Z}$ 系数看得见；$b_r=\dim H_r(K;\mathbb{R})$；Euler–Poincaré：$\sum(-1)^rI_r=\sum(-1)^rb_r$，所以 $\chi$ 是拓扑不变量。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`实心三角形与空心三角形（只有三条边）的 $H_1$ 分别是什么？`,
    options: [R`都是 $\mathbb{Z}$`, R`实心为 $0$，空心为 $\mathbb{Z}$`, R`实心为 $\mathbb{Z}$，空心为 $0$`, R`都是 $0$`],
    answer: 1, why: R`空心时绕一圈的闭链不是边缘（没有 2 单形），$H_1\cong\mathbb{Z}$；实心时它是 $\partial_2(p_0p_1p_2)$，$H_1=0$（例 3.8、3.9）。`,
  },
  {
    q: R`为什么 $\partial_1(p_0p_1)$ 规定为 $p_1-p_0$ 而不是 $p_0+p_1$？`,
    options: ["这只是约定，换成加号也一样", "为了让拼接处的“假边界”相消，使三角形三边的边界为零", "为了让同调群成为自由群", "因为 0 单形没有方向"],
    answer: 1, why: R`若用加号，$(p_0p_1)+(p_1p_2)$ 的边界会多出 $2p_1$，三角形三边的边界也不为零；减号使内部点相消（图 3.7）。`,
  },
  {
    q: R`射影平面中 $z=(p_3p_5)+(p_5p_4)+(p_4p_3)$ 为什么不是边缘，而 $2z$ 是？`,
    options: [R`因为 $z$ 不是闭链`, R`若 $\partial_2c=z$，内部棱迫使 $c$ 的系数全相等为 $m$，而 $\partial_2c=2mz$，$2m=1$ 无整数解`, R`因为 $\sym{RP}{\mathbb{R}P^2}$ 不连通`, R`因为 $H_2(\sym{RP}{\mathbb{R}P^2})=\mathbb{Z}$`],
    answer: 1, why: R`这正是 \eqref{3.47}：全体三角形之和的边界是 $2z$。整数里不能除以 2，于是产生挠 $\mathbb{Z}_2$。`,
  },
  {
    q: R`某复形有 $I_0=9$、$I_1=27$、$I_2=18$，且 $b_0=1$、$b_2=0$。$b_1$ 是多少？`,
    options: ["0", "1", "2", "3"],
    answer: 1, why: R`由 Euler–Poincaré：$9-27+18=0=b_0-b_1+b_2=1-b_1+0$，所以 $b_1=1$。这就是 Klein 瓶（$H_1\cong\mathbb{Z}\oplus\mathbb{Z}_2$，挠不计入 $b_1$）。`,
  },
  {
    q: R`下列哪个说法正确？`,
    options: [R`$C_r(K)$ 是拓扑不变量`, R`$H_0(K)\cong\mathbb{Z}$ 当且仅当 $K$ 连通`, R`实系数同调群能看到挠`, R`$Z_r(K)\cong B_r(K)$ 就足以推出 $H_r(K)=0$`],
    answer: 1, why: R`定理 3.5 与推论 3.1。$C_r$ 依赖剖分；实系数消去挠；同构不够，必须相等（例如 $2\mathbb{Z}\cong\mathbb{Z}$ 但 $\mathbb{Z}/2\mathbb{Z}\neq0$——这正是原书例 3.9 的一处笔误）。`,
  },
  {
    q: R`$\partial_r\partial_{r+1}=0$ 在本章中最直接的作用是什么？`,
    options: [R`证明同调群是拓扑不变量`, R`保证 $B_r\subset Z_r$，从而商群 $Z_r/B_r$ 有定义`, R`计算 Betti 数`, R`说明链群是自由的`],
    answer: 1, why: R`引理 3.3 ⇒ 定理 3.3 ⇒ 定义 3.5。没有它，"闭链模去边缘"无从谈起。`,
  },
];

export const BRIDGE = R`同调群用"链"（区域的整系数组合）数洞，得到的永远是 **Abel 群**。第 4 章换一种语言：直接研究闭路本身以及它们的**连续形变**（同伦），得到基本群 $\pi_1$ 与高阶同伦群 $\pi_n$。基本群一般**不交换**，比同调群包含更多信息；二者的关系由 Hurewicz 定理给出——$H_1$ 恰好是 $\pi_1$ 的交换化。再往后，第 6 章的 de Rham 上同调会把本章的 $\partial$ 与外微分 $\dd$ 通过 Stokes 定理 $\int_c\dd\omega=\int_{\partial c}\omega$ 配成一对，而 Betti 数将变成"闭形式模恰当形式"的维数——开场那条绕导线的闭路，正是 $H_1$ 与 de Rham 上同调相互对偶的物理例子。`;
