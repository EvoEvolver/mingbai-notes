// 第 4 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "为什么超导环里的磁通是一份一份的？";
export const HOOK = R`把一个超导圆环冷却到临界温度以下，穿过环孔的磁通只能取 $h/2e$ 的整数倍。原因不在电磁学的细节，而在一个拓扑事实：超导序参量是一个复数 $\Delta_0e^{i\varphi}$，绕环一圈回到原处，相位只能增加 $2\pi$ 的整数倍——圆周到圆周的映射按"绕了几圈"分类，$\pi_1(S^1)=\mathbb{Z}$。

再看一块液晶显示屏的原料。偏光显微镜下，向列相液晶里常能看到从一点发出的"两条刷子"或"四条刷子"。前者（绕一圈指向矢只转半圈）怎么也消不掉；后者（转一整圈）却会在加热时自己"融化"——指向矢逃逸到第三维。这背后是射影平面的基本群 $\pi_1(\RP^2)=\mathbb{Z}_2$：$1+1=0$。

还有转动本身：把一只手托着杯子转 $360°$，手臂拧成一团；再同向转 $360°$，手臂竟然复原了。这是 $\pi_1(\mathrm{SO}(3))=\mathbb{Z}_2$ 的物理表演，也是电子转 $2\pi$ 后波函数变号的根源。

本章就是这些现象的数学：**同伦**——映射之间的连续形变。我们先定义基本群（圈的同伦类），学会在圆周、环面、花束、射影平面、Klein 瓶上计算它；然后推广到高阶同伦群 $\pi_n$（球面的同伦类）；最后把包围缺陷的球面上的序参量看成映射 $S^n\to M$，用 $\pi_n(M)$ 给涡旋、向错、单极子与无奇点织构分类。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "4.0", title: "从数洞到分类映射", gist: R`同伦群把映射 $S^n\to Y$ 按"能否连续变形"分类；物理上分类的是场位形。`, gives: [], next: R`先从最简单的 $S^1$——圈——开始。` },
  { sec: "4.1", title: "基本群", gist: R`道路乘积 $\alpha*\beta$、逆 $\alpha^{-1}$；保持基点的同伦 \eqref{4.3}；同伦类在 $[\alpha]*[\beta]=[\alpha*\beta]$ 下成群 $\pi_1(X,x_0)$。`, gives: ["4.1", "4.3", "4.4"], next: R`定义有了，但直接算太难；需要一般性质来化简。` },
  { sec: "4.2", title: "一般性质：基点、同伦型、形变收缩", gist: R`弧连通 ⇒ 与基点无关；同伦型相同 ⇒ $\pi_1$ 同构；形变收缩核与可缩空间。`, gives: ["4.5", "4.7"], next: R`有了化简手段，算第一个非平凡例子。` },
  { sec: "4.3", title: R`$\pi_1(S^1)=\mathbb{Z}$ 与环面`, gist: R`提升到万有覆叠 $\mathbb{R}$，映射度 $\deg f$ 完全分类圈；积空间 $\pi_1(X\times Y)=\pi_1(X)\oplus\pi_1(Y)$。`, gives: ["4.10", "4.11"], next: R`对一般的可三角剖分空间，需要一个算法。` },
  { sec: "4.4", title: "多面体的基本群", gist: R`自由群与群表示；边群：极大树外的棱 → 生成元，三角形 → 关系；环面 $(x,y;xyx^{-1}y^{-1})$，$\RP^2$ 的 $(x;x^2)$；$H_1=\pi_1/[\pi_1,\pi_1]$。`, gives: ["4.19", "4.22", "4.25", "4.27", "4.31", "4.32"], next: R`把圈换成球面，得到高阶同伦群。` },
  { sec: "4.5", title: "高阶同伦群的定义", gist: R`$n$ 维圈 $I^n\to X$，边界钉在基点；沿 $s_1$ 拼接得群 $\pi_n(X,x_0)$；$\pi_0$ 数分支。`, gives: ["4.37a", "4.38", "4.41"], next: R`它们有什么一般性质？` },
  { sec: "4.6", title: "一般性质与万有覆叠", gist: R`$n\ge2$ 时 $\pi_n$ 交换；万有覆叠诱导 $\pi_n$（$n\ge2$）同构：$\pi_n(\RP^m)=\pi_n(S^m)$，$\mathrm{SO}(3)\leftarrow\mathrm{SU}(2)=S^3$。`, gives: ["4.42", "4.44", "4.48"], next: R`收集具体结果。` },
  { sec: "4.7", title: "高阶同伦群的例子", gist: R`$\pi_n(S^n)=\mathbb{Z}$（映射度），$\pi_3(\mathrm{SO}(3))=\mathbb{Z}$；表 4.1；Bott 周期性。`, gives: ["4.53", "4.55", "4.56"], next: R`现在进入物理：序参量空间。` },
  { sec: "4.8", title: "凝聚态中的序与缺陷分类", gist: R`对称性自发破缺 → 序参量空间 $M$；包围缺陷的 $S^n\to M$；$m$ 维缺陷由 $\pi_{d-m-1}(M)$ 分类。`, gives: ["4.57", "4.59", "4.63a", "4.65a", "4.67"], next: R`最典型的例子：液晶。` },
  { sec: "4.9", title: "向列相液晶", gist: R`$M=\RP^2$：$\pi_1=\mathbb{Z}_2$ 的半整数向错、$\pi_2=\mathbb{Z}$ 的刺猬、$\pi_3=\mathbb{Z}$ 的无奇点织构。`, gives: ["4.68"], next: R`最后是序参量空间为 $\mathrm{SO}(3)$ 的 $^3$He-A。` },
  { sec: "4.10", title: R`超流 $^3$He-A`, gist: R`标架 $(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}})\in\mathrm{SO}(3)$：disgyration（$\mathbb{Z}_2$）、无芯涡旋（$1+1=0$）、没有点缺陷（$\pi_2=0$）、Shankar 单极子（$\pi_3=\mathbb{Z}$）。`, gives: ["4.70", "4.73", "4.74"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "4.1", to: "4.4", label: "取同伦类" },
  { from: "4.3", to: "4.4", label: "良定义（引理 4.1）" },
  { from: "4.4", to: "4.7", label: "同伦不变性" },
  { from: "4.5", to: "4.7", label: "形变收缩" },
  { from: "4.4", to: "4.10", label: R`提升 + 映射度` },
  { from: "4.10", to: "4.11", label: "积空间" },
  { from: "4.19", to: "4.27", label: "边群规则" },
  { from: "4.21", to: "4.22", label: R`2 骨架` },
  { from: "4.19", to: "4.32", label: "边群规则" },
  { from: "4.19", to: "4.31", label: "边群规则" },
  { from: "4.27", to: "4.11", label: "一致" },
  { from: "4.25", to: "4.27", label: "加换位子" },
  { from: "4.3", to: "4.37a", label: R`$I\to I^n$` },
  { from: "4.37a", to: "4.41", label: "沿 $s_1$ 拼接" },
  { from: "4.41", to: "4.42", label: R`$n\ge2$ 可换位` },
  { from: "4.41", to: "4.44", label: "万有覆叠" },
  { from: "4.44", to: "4.48", label: R`$\mathrm{SU}(2)\to\mathrm{SO}(3)$` },
  { from: "4.47", to: "4.48", label: R`$\mathrm{SU}(2)=S^3$` },
  { from: "4.41", to: "4.53", label: "映射度" },
  { from: "4.48", to: "4.55", label: R`$n=3$` },
  { from: "4.32", to: "4.33", label: "同样的图" },
  { from: "4.63a", to: "4.67", label: R`$M$ = 极小集` },
  { from: "4.10", to: "4.67", label: "卷绕数" },
  { from: "4.32", to: "4.67", label: "向错" },
  { from: "4.55", to: "4.73", label: "Shankar" },
  { from: "4.70", to: "4.73", label: R`标架 $\in\mathrm{SO}(3)$` },
];
export const EQMAP_LABELS = {
  "4.1": "道路乘积", "4.3": "同伦", "4.4": "基本群的乘法", "4.5": "形变收缩", "4.7": R`$\pi_1(X)\cong\pi_1(R)$`,
  "4.10": R`$\pi_1(S^1)=\mathbb{Z}$`, "4.11": R`$\pi_1(T^2)$`, "4.19": "群表示", "4.21": R`2 骨架`, "4.22": R`$\pi_1(S^n)=0$`,
  "4.25": "非交换", "4.27": "环面（剖分）", "4.31": "Klein 瓶", "4.32": R`$\pi_1(\RP^2)=\mathbb{Z}_2$`, "4.33": R`$\pi_1(\RP^3)$`,
  "4.37a": R`$n$ 维同伦`, "4.41": R`$\pi_n$ 的乘法`, "4.42": "交换性", "4.44": "覆叠同构", "4.47": R`$\mathrm{SU}(2)$`, "4.48": R`$\pi_n(\mathrm{SO}(3))$`,
  "4.53": R`$\pi_n(S^n)=\mathbb{Z}$`, "4.55": R`$\pi_3(\mathrm{SO}(3))=\mathbb{Z}$`, "4.63a": "凝聚能", "4.67": "缺陷分类", "4.70": R`$^3$He-A 序参量`, "4.73": "Shankar 单极子",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "basic", label: "同伦的基本语言" },
  { id: "calc", label: "计算工具" },
  { id: "higher", label: "高阶同伦" },
  { id: "phys", label: "物理应用" },
];

export const concepts = [
  {
    id: "homotopy", name_zh: "同伦", name_en: "Homotopy", icon: "🫧", section_id: "4.1.3", group: "basic",
    plain: R`两个映射之间的连续形变：$F(s,t)$，$t=0$ 是 $\alpha$，$t=1$ 是 $\beta$。`,
    explain: R`对圈要求形变过程中基点不动（\eqref{4.3}）。同伦是等价关系；等价类叫同伦类 $[\alpha]$。所有"重新安排走法的时间表"（结合律、单位元）都只是同伦，而不是相等。

把 $t$ 看成时间，同伦就是一部"圈的连续动画"：每一帧都是合法的圈。`,
    analogy: R`橡皮筋套在柱子上可以随意滑动、拉伸，只要不剪断、不越过柱子——这些形变都是同伦；绕柱子几圈则是同伦不变的。`,
    book_example: { what: R`\figref{4.1}：无洞圆盘里任何圈都同伦于一点；有洞圆盘里绕洞的圈 $\alpha$ 不行。`, point: "洞的存在体现为“某些圈缩不掉”。" },
    misconception: R`同伦不是同胚：同伦可以把圈压扁、重叠、多次覆盖。`,
  },
  {
    id: "fundamental_group", name_zh: "基本群", name_en: "Fundamental group", icon: "➰", section_id: "4.1.4", group: "basic",
    plain: R`$\pi_1(X,x_0)$：基点处圈的同伦类，乘法是"先绕这个再绕那个"。`,
    explain: R`单位元是常值圈的类，逆元是反向的圈。弧连通时与基点无关（\sref{T4.2}）；是同伦不变量（\sref{T4.3}）。

它一般**不交换**：花束上 $\alpha*\beta\not\sim\beta*\alpha$。它的交换化就是 $H_1$（\sref{T4.9}）。`,
    analogy: R`像一本"绕法字典"：每个词是一种绕法，词与词可以拼接，有些词（关系）等于"什么都没做"。`,
    book_example: { what: R`$\pi_1(S^1)=\mathbb{Z}$，$\pi_1(T^2)=\mathbb{Z}\oplus\mathbb{Z}$，$\pi_1(\RP^2)=\mathbb{Z}_2$，$\pi_1(\text{3-bouquet})=(x,y,z;\emptyset)$。`, point: "从整数到非交换的自由群，基本群比同调群更“敏锐”。" },
    misconception: R`$\pi_1$ 平凡不意味着空间可缩：$S^2$ 单连通，却有 $\pi_2(S^2)=\mathbb{Z}$。`,
  },
  {
    id: "homotopy_type", name_zh: "同伦型与形变收缩", name_en: "Homotopy type & deformation retract", icon: "🫗", section_id: "4.2.2", group: "calc",
    plain: R`能互相"连续地挤压"成彼此的空间同伦型相同，同伦群相同。`,
    explain: R`$X\simeq Y$：存在 $f,g$ 使 $f\circ g\sim\mathrm{id}$、$g\circ f\sim\mathrm{id}$。实用判据是形变收缩：$R\subset X$ 且 $\mathrm{id}_X$ 能在保持 $R$ 不动的情况下连续地收到 $R$ 上。

可缩空间（如 $\mathbb{R}^n$、凸集）与一点同伦型相同，所有同伦群平凡。`,
    analogy: R`把一块挖了洞的橡皮泥揉成一个环：形状变了，"洞"还在。`,
    book_example: { what: R`例 4.1：圆周是圆环的形变收缩核；习题 4.2：$S^n$ 是 $D^{n+1}-\{0\}$ 的形变收缩核。`, point: "计算前先把空间换成最简单的同伦替身。" },
    misconception: R`收缩核不一定是形变收缩核（\figref{4.8}）。`,
  },
  {
    id: "degree", name_zh: "映射度与卷绕数", name_en: "Degree / winding number", icon: "🌀", section_id: "4.3", group: "calc",
    plain: R`圈 $S^1\to S^1$ 绕了几圈：$\deg f=[\tilde f(x+2\pi)-\tilde f(x)]/2\pi$。`,
    explain: R`提升到 $\mathbb{R}$ 后，周期条件 $\tilde f(x+2\pi)=\tilde f(x)+2\pi n$ 中的整数 $n$ 就是映射度。度数相同 ⇔ 同伦（\sref{L4.2}），度数在圈乘积下相加，所以 $\pi_1(S^1)\cong\mathbb{Z}$。

高维推广：$\pi_n(S^n)=\mathbb{Z}$，整数是"包了几层"。`,
    analogy: R`汽车里程表：表盘读数只告诉你转到哪个角度，累计里程（提升）才知道转了几圈。`,
    book_example: { what: R`\figref{4.9}；例 4.13 的 $(\theta,\phi)\mapsto(\theta,k\phi)$ 属于 $\pi_2(S^2)$ 的类 $k$。`, point: "整数拓扑荷都来自映射度。" },
    misconception: R`圈的乘积 $f*g$ 的度是 $\deg f+\deg g$；映射的复合 $f\circ g$ 的度是 $\deg f\cdot\deg g$。`,
  },
  {
    id: "presentation", name_zh: "自由群与群表示", name_en: "Free group & presentation", icon: "🔤", section_id: "4.4.1", group: "calc",
    plain: R`群 = 生成元的所有"词"，模去由关系生成的正规子群：$(x_1,\ldots;r_1,\ldots)$。`,
    explain: R`自由群 $F[X]$ 的元素是既约词，乘法是并列再约化。任何群都是 $F[X]/\ker\varphi$（\eqref{4.18}）。$\mathbb{Z}_n=(x;x^n)$，$\mathbb{Z}\oplus\mathbb{Z}=(x,y;xyx^{-1}y^{-1})$。

难点：两个表示是否给出同构的群，一般无法判定；实际靠 Tietze 变换逐个消元。`,
    analogy: R`像魔方的操作记录：$RUR^{-1}U^{-1}$ 是一串字母，有些串（关系）做完等于没做。`,
    book_example: { what: R`例 4.4：$\mathbb{Z}\oplus\mathbb{Z}$ 的表示 $(x,y;xyx^{-1}y^{-1})$。`, point: "交换性本身就是一条关系。" },
    misconception: R`$(x,y;\emptyset)$ 不是 $\mathbb{Z}\oplus\mathbb{Z}$，而是大得多的非交换自由群。`,
  },
  {
    id: "edge_group", name_zh: "边群与极大树", name_en: "Edge group & maximal tree", icon: "🌳", section_id: "4.4.2", group: "calc",
    plain: R`把 $\pi_1$ 变成组合计算：树外的棱给生成元，三角形给关系。`,
    explain: R`取包含全部顶点的单连通子复形 $L$（如极大树），树上的棱记为 1；$K-L$ 的棱 $g_{ij}$（$i<j$）为生成元；每个 2 单形给 $g_{ij}g_{jk}=g_{ik}$。只用到 2 骨架，所以 $\pi_1(S^n)=0$（$n\ge2$）。

生成元数 − 关系数 $=1-\chi$。`,
    analogy: R`修路网：先修一棵连通所有城市的"主干树"（走它不算绕），其余每条路都是一个可能的“绕圈”，每块三角形绿地说明绕它一圈等于没绕。`,
    book_example: { what: R`例 4.9 环面：11 个生成元、10 个关系 → $(x,y;xyx^{-1}y^{-1})$；例 4.10：$\RP^2$ → $(x;x^2)$。`, point: "同一套规则算出交换的、有挠的、非交换的各种基本群。" },
    misconception: R`只有被**实心**三角形（2 单形）填住的三角回路才能跨过；空心三角形正是洞。`,
  },
  {
    id: "hurewicz", name_zh: R`$H_1$ = $\pi_1$ 的交换化`, name_en: "Hurewicz theorem (n=1)", icon: "🔗", section_id: "4.4.3", group: "calc",
    plain: R`$H_1(K)\cong\pi_1(|K|)/F$，$F$ 是换位子群。`,
    explain: R`在 $\pi_1$ 的表示中加上所有生成元的交换关系，就得到 $H_1$；在加法记号下就是关系矩阵的 Smith 标准形（第 3 章算法）。$\pi_1$ 交换时二者相同。

信息损失：花束的 $\pi_1$ 是自由群，$H_1$ 只是 $\mathbb{Z}^n$；Klein 瓶的 $\pi_1$ 非交换，$H_1=\mathbb{Z}\oplus\mathbb{Z}_2$。`,
    analogy: R`把“先穿袜子再穿鞋”和“先穿鞋再穿袜子”看成一回事——只记每件穿了几次，不记顺序。`,
    book_example: { what: R`例 4.11：Klein 瓶 $(x,y;xyxy^{-1})$ 交换化为 $\mathbb{Z}\oplus\mathbb{Z}_2$。`, point: R`第 3 章的挠 $\mathbb{Z}_2$ 来自 $\pi_1$ 的关系 $x^2$。` },
    misconception: R`同调群相同不等于基本群相同：交换化会丢掉非交换的信息。`,
  },
  {
    id: "higher_homotopy", name_zh: "高阶同伦群", name_en: "Higher homotopy groups", icon: "🎈", section_id: "4.5", group: "higher",
    plain: R`$\pi_n(X)$：$S^n$ 在 $X$ 中的同伦类；$n\ge2$ 时总是交换的。`,
    explain: R`$n$ 维圈 $I^n\to X$ 把边界送到基点，即 $S^n\to X$。沿 $s_1$ 拼接得群；$n\ge2$ 时两块可以"错车"，所以交换（\eqref{4.42}）。

没有通用算法；主要工具是同伦不变性、积空间可加性与万有覆叠（\sref{T4.10}）。`,
    analogy: R`基本群用套索检测“洞”，高阶同伦群用气球检测“空腔”——一个包住球形空腔的气球缩不回一点。`,
    book_example: { what: R`$\pi_2(S^2)=\mathbb{Z}$，$\pi_3(S^2)=\mathbb{Z}$（Hopf），$\pi_3(\mathrm{SO}(3))=\mathbb{Z}$；表 4.1。`, point: R`低维空间也可以有非平凡的高阶同伦群（$\pi_3(S^2)\neq0$）。` },
    misconception: R`$\pi_n$ 与 $H_n$ 不同：$H_3(S^2)=0$ 而 $\pi_3(S^2)=\mathbb{Z}$。`,
  },
  {
    id: "covering", name_zh: "万有覆叠", name_en: "Universal covering", icon: "📚", section_id: "4.6.5", group: "higher",
    plain: R`局部像一摞薄片的单连通"展开"：$\mathbb{R}\to S^1$，$S^n\to\RP^n$，$\mathrm{SU}(2)\to\mathrm{SO}(3)$。`,
    explain: R`覆叠映射 $p$ 满射，且每点有邻域其原像是若干不交的同胚拷贝。万有覆叠展开了全部 $\pi_1$，但对 $n\ge2$ 诱导同构 $\pi_n(\widetilde X)\cong\pi_n(X)$。

$\mathrm{Spin}(n)$ 是 $\mathrm{SO}(n)$ 的万有覆叠群：$\mathrm{Spin}(3)=\mathrm{SU}(2)$。`,
    analogy: R`螺旋楼梯与它的俯视图：俯视看是一个圆，走楼梯却能分辨绕了几圈。`,
    book_example: { what: R`\eqref{4.45}：$\pi_n(S^1)=0$；\eqref{4.48}：$\pi_n(\mathrm{SO}(3))=\pi_n(S^3)$（$n\ge2$）。`, point: "高阶同伦群看不见覆叠的多层结构。" },
    misconception: R`对 $n=1$ 不成立：$\pi_1(\mathbb{R})=0$，$\pi_1(S^1)=\mathbb{Z}$。`,
  },
  {
    id: "order_parameter", name_zh: "序参量空间", name_en: "Order parameter space", icon: "🧲", section_id: "4.8.3", group: "phys",
    plain: R`对称性破缺后均匀基态可取的全部值 $M$：超导 $\mathrm{U}(1)$，铁磁 $S^2$，向列相 $\RP^2$。`,
    explain: R`凝聚能的极小集就是 $M$（\figref{4.21} 的“墨西哥帽”底部是一个圆）。非均匀但缓变的位形是映射 $\psi:X\to M$。

$M$ 的拓扑决定了哪些缺陷稳定；向列相因为 $\boldsymbol{n}\sim-\boldsymbol{n}$ 而是 $\RP^2$ 而非 $S^2$，这一点改变了全部分类结果。`,
    analogy: R`罗盘的指针可以指向任何方向（$S^1$）；一根没有箭头的筷子只能区分“沿哪条线”（$\RP^1$）。`,
    book_example: { what: R`\eqref{4.63a}：$T<T_{\rm c}$ 时极小在圆周 $|\Psi|=\Delta_0$ 上；§4.10：$^3$He-A 的标架 $\in\mathrm{SO}(3)$。`, point: R`先找 $M$，再算 $\pi_n(M)$。` },
    misconception: R`$M$ 不是哈密顿量的对称群 $G$，而是商 $G/H$（$H$ 为剩余对称性）：铁磁体 $\mathrm{SO}(3)/\mathrm{SO}(2)=S^2$。`,
  },
  {
    id: "defect_class", name_zh: "缺陷的同伦分类", name_en: "Homotopy classification of defects", icon: "🧭", section_id: "4.8.3", group: "phys",
    plain: R`$d$ 维介质中 $m$ 维缺陷的拓扑荷 $\in\pi_n(M)$，$n=d-m-1$。`,
    explain: R`用 $S^n$ 包围缺陷，读出 $S^n\to M$ 的同伦类。缺陷合并 = 同伦类相乘；属于单位元的缺陷可以被熨平。

超导涡旋 $\mathbb{Z}$（磁通量子化）；向列相向错 $\mathbb{Z}_2$（$1+1=0$）；向列相刺猬 $\mathbb{Z}$；$^3$He-A 无点缺陷。`,
    analogy: R`绳结：只要不剪断，怎么拉扯都解不开的结就是“拓扑荷”；两个相反的结可以互相抵消。`,
    book_example: { what: R`\eqref{4.67}；Ising 畴壁 $n=0$；习题 4.9：整数向列向错是假的。`, point: "稳定性来自拓扑，而不是能量细节。" },
    misconception: R`同伦平凡的缺陷能被消除，但可能需要越过能垒；同伦非平凡的缺陷在连续形变下**绝对**消不掉。`,
  },
  {
    id: "texture", name_zh: "无奇点织构", name_en: "Non-singular texture", icon: "🧶", section_id: "4.10.3", group: "phys",
    plain: R`处处光滑、远处均匀，却由 $\pi_d(M)$ 的非平凡类“打了结”的场位形。`,
    explain: R`远处均匀把空间紧化成 $S^d$：二维铁磁体的斯格明子（$\pi_2(S^2)$），三维向列相的 $\pi_3(\RP^2)$ 织构，$^3$He-A 的 Shankar 单极子（$\pi_3(\mathrm{SO}(3))$）。

没有奇点，但不能连续地解开成均匀态。`,
    analogy: R`把床单的四角钉住，中间拧一个漩涡：处处平滑，却拧不回去。`,
    book_example: { what: R`\eqref{4.73}–\eqref{4.74}：转角从中心的 $2\pi$ 降到远处的 0，扫过 $\mathrm{SO}(3)$ 两遍，类 1。`, point: "织构与缺陷由同一套同伦群分类，只是“包围球面”换成整个空间。" },
    misconception: R`中心处转角 $2\pi$ 看似奇点，其实等于恒等转动，是光滑的。`,
  },
];

export const relations = [
  { from: "homotopy", to: "fundamental_group", label: "同伦类成群" },
  { from: "homotopy", to: "homotopy_type", label: "推广到空间" },
  { from: "homotopy_type", to: "fundamental_group", label: "同伦不变" },
  { from: "covering", to: "degree", label: R`提升到 $\mathbb{R}$` },
  { from: "degree", to: "fundamental_group", label: R`$\pi_1(S^1)=\mathbb{Z}$` },
  { from: "presentation", to: "edge_group", label: "生成元+关系" },
  { from: "edge_group", to: "fundamental_group", label: "算法" },
  { from: "fundamental_group", to: "hurewicz", label: "交换化" },
  { from: "fundamental_group", to: "higher_homotopy", label: R`$S^1\to S^n$` },
  { from: "covering", to: "higher_homotopy", label: R`$n\ge2$ 同构` },
  { from: "order_parameter", to: "defect_class", label: R`$S^n\to M$` },
  { from: "higher_homotopy", to: "defect_class", label: R`$\pi_n(M)$` },
  { from: "degree", to: "defect_class", label: "卷绕数" },
  { from: "defect_class", to: "texture", label: "紧化空间" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**同伦**是保持基点的连续形变；圈的同伦类在 $[\alpha]*[\beta]=[\alpha*\beta]$ 下构成**基本群** $\pi_1(X,x_0)$——弧连通时与基点无关，同伦型相同的空间基本群同构。`}</TxI>,
  <TxI>{R`**圆周**：提升到 $\mathbb{R}$，映射度完全分类圈，$\pi_1(S^1)\cong\mathbb{Z}$；积空间可加，$\pi_1(T^n)\cong\mathbb{Z}^n$；可缩空间与 $S^n$（$n\ge2$）单连通。`}</TxI>,
  <TxI>{R`**多面体**：极大树外的棱给生成元，2 单形给关系 $g_{ij}g_{jk}=g_{ik}$。环面 $(x,y;xyx^{-1}y^{-1})$，Klein 瓶 $(x,y;xyxy^{-1})$，$\RP^2$ 的 $(x;x^2)\cong\mathbb{Z}_2$，花束是自由群；$H_1$ 是 $\pi_1$ 的交换化。`}</TxI>,
  <TxI>{R`**高阶同伦群** $\pi_n$（$n\ge2$）交换，由万有覆叠不变：$\pi_n(S^n)=\mathbb{Z}$，$\pi_n(\RP^m)=\pi_n(S^m)$，$\pi_3(\mathrm{SO}(3))=\pi_3(S^3)=\mathbb{Z}$；表 4.1 与 Bott 周期性。`}</TxI>,
  <TxI>{R`**物理**：序参量空间 $M$ 上，$d$ 维介质中的 $m$ 维缺陷由 $\pi_{d-m-1}(M)$ 分类——超导涡旋 $\mathbb{Z}$、向列相向错 $\mathbb{Z}_2$、刺猬 $\pi_2(\RP^2)=\mathbb{Z}$、$^3$He-A 的无芯涡旋与 Shankar 单极子。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么常值圈 $c_x$ 在"圈的集合"上不是单位元，而在 $\pi_1$ 中是？`,
    options: [R`因为 $c_x$ 不连续`, R`$\alpha*c_x$ 与 $\alpha$ 作为映射不相等（走法时间表不同），但二者同伦`, R`因为基点可以移动`, R`因为 $\pi_1$ 总是交换的`],
    answer: 1, why: R`$\alpha*c_x$ 前半时间走 $\alpha$、后半时间原地不动；\sref{T4.1} (2) 的同伦把常值段逐渐"挤掉"。群公理只在同伦类层面成立。`,
  },
  {
    q: R`3-花束的 $\pi_1$ 与 $H_1$ 分别是？`,
    options: [R`都是 $\mathbb{Z}^3$`, R`$\pi_1=(x,y,z;\emptyset)$ 自由群，$H_1=\mathbb{Z}^3$`, R`$\pi_1=\mathbb{Z}^3$，$H_1$ 是自由群`, R`$\pi_1=\{e\}$，$H_1=\mathbb{Z}^3$`],
    answer: 1, why: R`例 4.7：没有 2 单形，所以没有关系，$\pi_1$ 是三个生成元的自由群，非交换（\eqref{4.25}）；交换化后得 $\mathbb{Z}^3$（\sref{T4.9}）。`,
  },
  {
    q: R`在用边群规则计算 $\pi_1(\RP^2)$ 时，关系 $x^2=1$ 来自哪里？`,
    options: [R`来自极大树`, R`来自一个 2 单形 $\langle v_2v_3v_5\rangle$，其中两条棱都等于 $x$、第三条在 $L$ 中`, R`来自 Euler 示性数`, R`来自 $\RP^2$ 不可定向的定义，与剖分无关`],
    answer: 1, why: R`例 4.10 (f)：$g_{23}g_{35}=g_{25}$，$g_{23}=g_{35}=x$、$g_{25}=1$。对径粘合使同一条"半圈"在一个三角形的边界上出现两次。`,
  },
  {
    q: R`为什么 $\pi_n(\RP^2)\cong\pi_n(S^2)$ 对 $n\ge2$ 成立，但 $n=1$ 时不成立？`,
    options: [R`因为 $\RP^2$ 不可定向`, R`$S^2$ 是 $\RP^2$ 的万有覆叠；覆叠映射诱导 $\pi_n$（$n\ge2$）同构，但会"展开"掉 $\pi_1$`, R`因为 $\pi_1$ 不交换`, R`两者在所有 $n$ 都同构`],
    answer: 1, why: R`\sref{T4.10}。$\pi_1(S^2)=0$ 而 $\pi_1(\RP^2)=\mathbb{Z}_2$：后者正是覆叠的叶数信息。`,
  },
  {
    q: R`三维向列相液晶中，平面内绕一圈指向矢转了整整一圈（$k=1$）的线缺陷：`,
    options: [R`属于 $\pi_1(\RP^2)$ 的非平凡类，稳定`, R`属于平凡类：指向矢可以逃逸到第三维，把奇点消除（$1+1=0$）`, R`属于 $\pi_2(\RP^2)$，是点缺陷`, R`无法用同伦分类`],
    answer: 1, why: R`习题 4.9。$k=1$ 相当于两个"半圈" $\beta*\beta$，在 $\pi_1(\RP^2)=\mathbb{Z}_2$ 中是单位元。只有半整数向错（\figref{4.24}）稳定。交互图 2 可验证。`,
  },
  {
    q: R`Shankar 单极子的转角在原点为 $2\pi$。下面哪个说法正确？`,
    options: [R`原点处有奇点，所以它是 $\pi_2$ 缺陷`, R`转 $2\pi$ 等于恒等元，织构处处光滑；空间紧化为 $S^3$，属于 $\pi_3(\mathrm{SO}(3))=\mathbb{Z}$ 的类 1`, R`它属于 $\pi_1(\mathrm{SO}(3))=\mathbb{Z}_2$`, R`它可以连续地解开`],
    answer: 1, why: R`\eqref{4.73}–\eqref{4.74}。$\pi_2(\mathrm{SO}(3))=0$，$^3$He-A 没有点缺陷；但 $\pi_3=\mathbb{Z}$ 允许这种无奇点的点状结构。`,
  },
];

export const BRIDGE = R`本章的同伦群与第 3 章的同调群都是"代数地数洞"，前者更细（可以不交换、可以在高维给出出人意料的 $\pi_3(S^2)=\mathbb{Z}$），后者更好算。第 5 章转向**流形**：在每一点附近像 $\mathbb{R}^m$ 的空间，可以在上面做微积分——切矢量、微分形式、积分。到第 6 章，外微分 $\dd$ 与边界算子 $\partial$ 通过 Stokes 定理配成一对，de Rham 上同调与同调群对偶；本章的卷绕数将重新出现为 $\frac{1}{2\pi}\oint\dd\varphi$ 这样的积分。更远处，第 9–10 章的纤维丛把本章的映射 $S^n\to M$ 变成"粘合函数"：$\pi_1(\mathrm{U}(1))=\mathbb{Z}$ 分类 Dirac 单极子，$\pi_3(\mathrm{SU}(2))=\mathbb{Z}$ 分类瞬子（例 9.8），而习题 4.3 的 Hopf 映射将作为 $S^3\to S^2$ 的纤维丛再次出现（例 9.9）。`;
