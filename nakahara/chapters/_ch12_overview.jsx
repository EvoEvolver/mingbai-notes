// 第 12 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "数零模，量曲率：同一个整数的两种算法";
export const HOOK = R`**一个可以"听"出来的拓扑。**在一个鼓面（闭曲面）上解 Laplace 方程 $\Delta u=0$ 的各阶形式版本，数一数线性无关的解：0 形式有 $b^0$ 个，1 形式有 $b^1$ 个，2 形式有 $b^2$ 个。交错和 $b^0-b^1+b^2$ 是多少？对球面是 2，对甜甜圈是 0。再换一个完全不同的算法：在曲面上逐点量 Gauss 曲率 $K$，积分 $\frac1{2\pi}\int K\,\dd A$——还是 2 和 0。第三种算法：把曲面剖分成三角形，数顶点减边加面——依然是 2 和 0。

**一个会"漏掉"的态。**把 Dirac 费米子放在球面上，穿过 $n$ 个磁通量子：数值求出 Dirac 算子的谱，你会发现恰好有 $|n|$ 个零能态，而且全都是同一种手征。把磁场弄得再不均匀、把球面压扁，零能态一个都不会多、一个都不会少——因为它们的数目等于磁荷 $\frac{\mathrm{i}}{2\pi}\int\mathcal{F}$。

**Atiyah–Singer 指标定理**把这些现象统一起来：一个椭圆算子的零模之差 $\dim\ker D-\dim\ker D^\dagger$（**解析**的，要解微分方程）等于某个示性类的积分（**拓扑**的，只需知道丛怎样扭曲）。Gauss–Bonnet、Riemann–Roch、Hirzebruch 符号差、$\hat A$ 亏格——四个经典定理都是它的特例。物理学家还找到了它的一个优美证明：把指标写成超对称量子力学的配分函数 $\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$，它与 $\beta$ 无关，于是让 $\beta\to0$，路径积分收缩成流形上的一个普通积分。第 13 章的手征反常正是这个整数的局部密度。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "12.1", title: "椭圆算子、Fredholm 算子与椭圆复形", gist: R`主符号 $\sigma(D,\xi)$ 可逆 ⇒ 椭圆；紧流形上椭圆 ⇒ Fredholm，$\ind D=\dim\ker D-\dim\operatorname{coker}D=\dim\ker D-\dim\ker D^\dagger$；椭圆复形的指标 $\sum(-1)^i\dim H^i=\sum(-1)^i\dim\ker\Delta_i$，可卷起成两项复形；de Rham 复形的指标是 $\chi(M)$。`, gives: ["12.4", "12.11", "12.12", "12.19", "12.24", "12.29"], next: R`指标是良定义的整数，但怎么算？` },
  { sec: "12.2", title: "Atiyah–Singer 指标定理", gist: R`$\ind(E,D)=(-1)^{m(m+1)/2}\int_M\mathrm{ch}(\oplus(-1)^rE_r)\mathrm{Td}(TM^{\C})/e(TM)$；两项复形时被积式为 $(\mathrm{ch}E-\mathrm{ch}F)\mathrm{Td}/e$。`, gives: ["12.33", "12.34"], next: R`把四个经典复形代进去。` },
  { sec: "12.3", title: "de Rham 复形", gist: R`$\sigma(\dd,\xi)=\xi\wedge$；分裂原理使被积式化为 $\prod x_i/e=e(TM)$：$\chi(M)=\int_Me(TM)$；二维即 Gauss–Bonnet。`, gives: ["12.36", "12.39", "12.41", "12.42a"], next: R`复流形上用 $\bar\partial$ 代替 $\dd$。` },
  { sec: "12.4", title: "Dolbeault 复形与 Riemann–Roch", gist: R`$\sigma(\bar\partial,\xi)=\xi^{0,1}\wedge$；算术亏格 $\sum(-1)^rb^{0,r}=\int\mathrm{Td}(TM^+)$；扭曲后得 Hirzebruch–Riemann–Roch $\ind\bar\partial_V=\int\mathrm{Td}(TM^+)\mathrm{ch}(V)$；Riemann 面上 $h^0-h^1=(1-g)\dim V+\deg V$。`, gives: ["12.48", "12.50", "12.51"], next: R`同一个 $\dd+\dd^\dagger$，换一种手征分解。` },
  { sec: "12.5", title: "符号差复形", gist: R`$4k$ 维相交形式的符号差 $\tau=b^+-b^-$；$\pi=\mathrm{i}^{r(r-1)+l}*$ 与 $\mathfrak{D}=\dd+\dd^\dagger$ 反对易，$\ind\mathfrak{D}_+=\tau$；Hirzebruch 符号差定理 $\tau=\int L(TM)$，四维 $\tau=\frac13\int p_1$。`, gives: ["12.53", "12.60", "12.67", "12.68", "12.69"], next: R`物理中最重要的：Dirac 算子。` },
  { sec: "12.6", title: "自旋复形", gist: R`手征 $\gamma^{m+1}$ 把旋量分成 $\Delta^\pm$；$\mathrm{i}\not\nabla=\begin{pmatrix}0&D^\dagger\\D&0\end{pmatrix}$；$\nu_+-\nu_-=\int\hat A(TM)$；扭曲后 $\int\hat A\,\mathrm{ch}(E)$：二维 = 磁通量子数，四维 = 瞬子数 + 引力项。`, gives: ["12.79", "12.82", "12.83", "12.85", "12.89", "12.90"], next: R`为什么指标是局部积分？热核给出解释。` },
  { sec: "12.7", title: "热核与 $\zeta$ 函数", gist: R`$\mathrm{e}^{-t\Delta}$：$t\to\infty$ 投影到零模，$t\to0$ 有局部展开；$D^\dagger D$ 与 $DD^\dagger$ 非零谱相同 ⇒ $\ind D=\tilde h_E(t)-\tilde h_F(t)$ 与 $t$ 无关 $=\int[a_0^E-a_0^F]$；$\zeta$ 函数是热核的 Mellin 变换。`, gives: ["12.93", "12.105", "12.108", "12.109", "12.112"], next: R`流形有边界时多出什么？` },
  { sec: "12.8", title: "Atiyah–Patodi–Singer 定理", gist: R`$\eta$ 不变量 = 谱不对称；本征值穿零使 $\eta$ 跳 $\pm2$（谱流）；$\ind D=\int\hat A\,\mathrm{ch}-\frac12\Delta\eta=-$谱流；例：$S^1$ 上谱流 1，零模是 $\theta$ 函数。`, gives: ["12.118", "12.121", "12.123", "12.125", "12.129"], next: R`回到无边情形，用物理方法证明。` },
  { sec: "12.9", title: "超对称量子力学", gist: R`Grassmann 坐标量子化成 Clifford 代数；$L=\frac12\dot x^2+\frac{\mathrm{i}}2\psi\dot\psi$ 的超荷 $Q=\mathrm{i}\psi_jp_j$ 就是 Dirac 算子，$Q^2=-H$；弯曲流形上 $L=\frac12\langle\dot x,\dot x\rangle+\frac{\mathrm{i}}2\langle\psi,D\psi/Dt\rangle$。`, gives: ["12.135", "12.140", "12.146", "12.150", "12.154"], next: R`用它的路径积分计算指标。` },
  { sec: "12.10", title: "指标定理的超对称证明", gist: R`$\ind=\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$ 与 $\beta$ 无关 → 周期边界路径积分 → $\beta\to0$ 局域到常值圈 → 二阶涨落的 $\zeta$ 正规化行列式 $\prod\frac{y_j/2}{\sin(\beta y_j/2)}$ → 费米零模 = 微分形式：$\ind Q=\int_M\hat A(M)$。`, gives: ["12.162", "12.165", "12.171", "12.188", "12.191", "12.194"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "12.4", to: "12.36", label: R`$\dd$ 的符号` },
  { from: "12.11", to: "12.19", label: "推广到复形" },
  { from: "12.19", to: "12.24", label: "卷起" },
  { from: "12.19", to: "12.28", label: "de Rham 复形" },
  { from: "12.28", to: "12.29", label: "例 11.6" },
  { from: "12.33", to: "12.34", label: "两项复形" },
  { from: "12.33", to: "12.39", label: "分裂原理" },
  { from: "12.36", to: "12.39", label: "椭圆复形" },
  { from: "12.39", to: "12.41", label: "奇偶维" },
  { from: "12.41", to: "12.42a", label: R`$m=2$` },
  { from: "12.33", to: "12.48", label: "Dolbeault" },
  { from: "12.48", to: "12.50", label: R`扭曲 $V$` },
  { from: "12.50", to: "12.51", label: R`复一维` },
  { from: "12.60", to: "12.67", label: "手征分解" },
  { from: "12.33", to: "12.68", label: "符号差复形" },
  { from: "12.67", to: "12.68", label: "解析 = 拓扑" },
  { from: "12.34", to: "12.83", label: "自旋复形" },
  { from: "12.83", to: "12.85", label: R`扭曲 $E$` },
  { from: "12.85", to: "12.89", label: R`$S^2$ 单极子` },
  { from: "12.105", to: "12.108", label: "非零谱抵消" },
  { from: "12.108", to: "12.109", label: R`$t\to0$` },
  { from: "12.121", to: "12.123", label: "APS" },
  { from: "12.123", to: "12.125", label: R`$\dot\eta_c$ 抵消体积分` },
  { from: "12.105", to: "12.162", label: "定理 12.5" },
  { from: "12.162", to: "12.165", label: R`$\Gamma=(-1)^F$` },
  { from: "12.150", to: "12.165", label: R`$H=(\mathrm{i}Q)^2$` },
  { from: "12.165", to: "12.171", label: "路径积分" },
  { from: "12.171", to: "12.188", label: R`$\beta\to0$，二阶涨落` },
  { from: "12.188", to: "12.194", label: "费米零模积分" },
  { from: "12.194", to: "12.83", label: "证明" },
];
export const EQMAP_LABELS = {
  "12.4": "主符号", "12.11": "解析指标", "12.19": "复形的指标", "12.24": "卷起", "12.28": "$\chi$ = 调和形式交错数", "12.29": "指标定理原型",
  "12.33": "AS 指标定理", "12.34": "两项复形", "12.36": "d 的符号", "12.39": "de Rham 拓扑指标", "12.41": "Gauss–Bonnet–陈", "12.42a": "Gauss–Bonnet",
  "12.48": "算术亏格", "12.50": "HRR", "12.51": "Riemann–Roch", "12.60": "手征算子 π", "12.67": "$\ind=\tau$", "12.68": "符号差定理",
  "12.83": R`$\hat A$ 指标定理`, "12.85": "扭曲自旋复形", "12.89": "单极子零模", "12.105": "非零谱配对", "12.108": "热核差 = 指标", "12.109": "局部公式",
  "12.121": "$\eta$ 与谱流", "12.123": "APS", "12.125": "$\ind=-$谱流", "12.150": "超对称代数", "12.162": "β 无关", "12.165": "Witten 指标",
  "12.171": "路径积分", "12.188": "涨落行列式", "12.194": "自旋复形指标定理",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "analysis", label: "解析一侧：算子与零模" },
  { id: "theorem", label: "指标定理与四个经典复形" },
  { id: "proof", label: "为什么成立：热核、谱流与超对称" },
];

export const concepts = [
  {
    id: "analytic_index", name_zh: "解析指标", name_en: "Analytical index", icon: "🔢", section_id: "12.1.2", group: "analysis",
    plain: R`零模之差：$\ind D=\dim\ker D-\dim\ker D^\dagger$。`,
    explain: R`对 Fredholm 算子，$\ker D$ 与 $\operatorname{coker}D\cong\ker D^\dagger$（定理 12.1）都是有限维的，指标是一个整数。单独的 $\dim\ker D$ 在形变下会跳变，但零模总是成对地出现或消失，所以差不变（定理 12.4）。

有限维时 $D:\C^m\to\C^n$ 的指标恒为 $m-n$，与矩阵元无关；无穷维时这个"维数差"由示性类的积分代替。`,
    analogy: "一个账本：收入项与支出项可以同时增减，但净余额只取决于账户的结构。",
    book_example: { what: R`\eqref{12.82}：Dirac 算子 $\ind D=\nu_+-\nu_-$，正、负手征零能模之差。`, point: "物理的指标是手征不对称。" },
    misconception: R`指标为零不代表没有零模：$\nu_+=\nu_-\neq0$ 完全可能（例如 $m\not\equiv0\bmod4$ 时的自旋复形）。`,
  },
  {
    id: "symbol_ellipticity", name_zh: "主符号与椭圆性", name_en: "Principal symbol & ellipticity", icon: "🔍", section_id: "12.1.1", group: "analysis",
    plain: R`只看最高阶导数，把 $\partial_\mu$ 换成 $\xi_\mu$；得到的矩阵在 $\xi\neq0$ 时可逆，算子就是椭圆的。`,
    explain: R`$\sigma(D,\xi)=\sum_{|M|=N}A^M\xi_M$，也可无坐标地写成 $\frac1{N!}D(f^N\tilde s)|_p$。例：$\sigma(\Delta)=|\xi|^2$ 椭圆；$\sigma(\Box)$ 在光锥上为零，不椭圆；$\sigma(\dd)=\xi\wedge$；$\sigma(\mathrm{i}\not\nabla)=\mathrm{i}\not\xi$，$\not\xi^2=\xi^2$。

椭圆性是逐点的代数条件，却保证了整体的分析性质：紧流形上谱离散、核有限维、正规性（解光滑）。`,
    analogy: "看一个乐器在高音区的音色：高频行为由最高阶项决定，低阶项只是小修正。",
    book_example: { what: R`例 12.1 与习题 12.1：二阶算子椭圆 ⇔ $\sigma=1$ 是椭圆（"椭圆算子"名称的由来）。`, point: "椭圆 vs 双曲。" },
    misconception: R`复形中的单个 $D_i$ 未必椭圆（符号甚至不是方阵）；椭圆复形要求的是符号序列正合。`,
  },
  {
    id: "elliptic_complex", name_zh: "椭圆复形", name_en: "Elliptic complex", icon: "⛓️", section_id: "12.1.3", group: "analysis",
    plain: R`一串满足 $D_i\circ D_{i-1}=0$ 的算子；指标是上同调维数的交错和。`,
    explain: R`$\ind=\sum(-1)^i\dim H^i(E,D)=\sum(-1)^i\dim\ker\Delta_i$（Hodge 理论）。可卷起成两项复形 $A=\oplus(D_{2r}+D^\dagger_{2r-1}):E_+\to E_-$。

四个经典例子：de Rham（$\dd$）、Dolbeault（$\bar\partial$）、符号差（$\dd+\dd^\dagger$ 在 $\pi=\pm1$ 子空间间）、自旋（Dirac）。`,
    analogy: "流水线上每道工序的输出都被下一道完全吸收（$D^2=0$）；上同调数的是\"漏网之鱼\"。",
    book_example: { what: R`例 12.2：de Rham 复形的指标 $=\chi(M)$，卷起后 $A=\dd+\dd^\dagger$ 限制在偶形式上。`, point: "Euler 示性数是指标的原型。" },
    misconception: R`$\ker\dd$ 是无穷维的，$\dd$ 本身不是 Fredholm 算子；有限的是上同调。`,
  },
  {
    id: "as_theorem", name_zh: "Atiyah–Singer 指标定理", name_en: "Atiyah–Singer index theorem", icon: "⚖️", section_id: "12.2.1", group: "theorem",
    plain: R`解析指标 = 示性类的积分：$\ind(E,D)=(-1)^{m(m+1)/2}\int_M\mathrm{ch}(\oplus(-1)^rE_r)\mathrm{Td}/e$。`,
    explain: R`左边要解微分方程，右边只需丛的拓扑。奇数维时指标为零。证明有 K 理论、热核、超对称路径积分三条路。

套用到四个复形：$\chi=\int e$；$\sum(-1)^rb^{0,r}=\int\mathrm{Td}$（扭曲后 HRR）；$\tau=\int L$；$\nu_+-\nu_-=\int\hat A\,\mathrm{ch}(E)$。`,
    analogy: "数一个国家的人口有两种办法：挨家挨户普查（解方程），或者看出生率减死亡率的积分（示性类）——两者必须一致。",
    book_example: { what: R`推论 12.1：两项复形 $\ind D=(-1)^{m(m+1)/2}\int(\mathrm{ch}E-\mathrm{ch}F)\mathrm{Td}/e$。`, point: "物理应用几乎都用这一形式。" },
    misconception: R`右边不是"零模密度"的积分——零模本身是非局部的；只有零模**之差**有局部密度（热核的 $a_0^E-a_0^F$）。`,
  },
  {
    id: "gauss_bonnet", name_zh: "Gauss–Bonnet–陈定理", name_en: "Gauss–Bonnet–Chern theorem", icon: "🍩", section_id: "12.3", group: "theorem",
    plain: R`$\chi(M)=\int_Me(TM)$；二维时 $\frac1{2\pi}\int K\,\dd A=2-2g$。`,
    explain: R`de Rham 复形的 AS 定理：$\mathrm{ch}(\oplus(-1)^r\wedge^rT^*M)\mathrm{Td}=\prod_{i=1}^mx_i=(-1)^le^2$，除以 $e$ 并配上符号恰得 $e(TM)$。

三种算法给出同一整数：三角剖分 $V-E+F$、调和形式交错数 $\sum(-1)^rb^r$、曲率积分 $\int e$。`,
    analogy: "无论怎样捏橡皮泥球，凸起处多出的曲率必被凹陷处补回——总量锁定为 $4\pi$。",
    book_example: { what: R`例 12.3 与交互图 2：变形球面、椭球、环面上数值积分 $\frac1{2\pi}\int K\,\dd A$。`, point: "局部可变，总量拓扑。" },
    misconception: R`Euler 类只在偶数维非零；奇数维流形 $\chi=0$。`,
  },
  {
    id: "riemann_roch", name_zh: "Hirzebruch–Riemann–Roch", name_en: "Hirzebruch–Riemann–Roch", icon: "🧮", section_id: "12.4.1", group: "theorem",
    plain: R`$\sum_r(-1)^r\dim H^{0,r}(M;V)=\int_M\mathrm{Td}(TM^+)\mathrm{ch}(V)$；Riemann 面上 $h^0-h^1=(1-g)\,\mathrm{rk}V+\deg V$。`,
    explain: R`Dolbeault 复形的 AS 定理。全纯截面的个数 $h^0$ 本身随丛变化，但 $h^0-h^1$ 只依赖于陈类。配合消没定理（$\deg L>2g-2$ 时 $h^1=0$）就能精确算出 $h^0$。

原书 \eqref{12.51} 把 $2-2g$ 误印为 $2-g$，本站已改正。`,
    analogy: "可用的解 − 解的障碍 = 由拓扑决定的\"自由度预算\"。",
    book_example: { what: R`交互图 3：$\CP^1$ 上 $\mathcal{O}(d)$ 的截面 $1,z,\ldots,z^d$，$h^0=d+1$；环面上平凡丛 $h^0=h^1=1$。`, point: "指标稳定，单项不稳定。" },
    misconception: R`Riemann–Roch 不直接给出 $h^0$；它给出的是欧拉特征数。`,
  },
  {
    id: "signature", name_zh: "符号差与 Hirzebruch 定理", name_en: "Signature & Hirzebruch theorem", icon: "🔀", section_id: "12.5", group: "theorem",
    plain: R`$4k$ 维流形中间维数相交形式的 $b^+-b^-$，等于 $L$ 多项式的积分。`,
    explain: R`$\tau=\dim\mathrm{Harm}^{2k}_+-\dim\mathrm{Harm}^{2k}_-$（自对偶减反自对偶调和形式）。手征算子 $\pi=\mathrm{i}^{r(r-1)+l}*$ 平方为 1、与 $\dd+\dd^\dagger$ 反对易；非中间维数的贡献成对抵消。四维 $\tau=\frac13\int p_1=-\frac1{24\pi^2}\int\mathrm{tr}\,\mathcal{R}^2$。`,
    analogy: "同一台机器（$\dd+\dd^\dagger$），换一种\"左右\"的划分方式（Hodge 星而非形式奇偶），读出新的拓扑量。",
    book_example: { what: R`$\CP^2$：$\tau=1$，$p_1=3$；$S^2\times S^2$：$\tau=0$。`, point: R`$\int p_1$ 必为 3 的倍数。` },
    misconception: R`按形式次数奇偶分解只得到 $\chi$（习题 12.3），"不给出新东西"。`,
  },
  {
    id: "dirac_index", name_zh: "Dirac 指标、手征与 Â 亏格", name_en: "Dirac index, chirality & Â-genus", icon: "🌀", section_id: "12.6", group: "theorem",
    plain: R`$\nu_+-\nu_-=\int_M\hat A(TM)\mathrm{ch}(E)$；$\hat A=\prod\frac{x_j/2}{\sinh(x_j/2)}=1-\frac{p_1}{24}+\cdots$。`,
    explain: R`手征 $\gamma^{m+1}=\mathrm{i}^l\gamma^1\cdots\gamma^m$ 与 Dirac 算子反对易，把旋量分成 $\Delta^\pm$，Dirac 算子是非对角的 $\begin{pmatrix}0&D^\dagger\\D&0\end{pmatrix}$。

二维：$\nu_+-\nu_-=\frac{\mathrm{i}}{2\pi}\int\mathrm{tr}\,\mathcal{F}$（磁通量子数）；四维：$-\frac1{8\pi^2}\int\mathrm{tr}\,\mathcal{F}^2+\frac{\dim E}{192\pi^2}\int\mathrm{tr}\,\mathcal{R}^2$（瞬子数 + 引力）。消没定理常常使 $\nu_-=0$，于是零模数完全确定。`,
    analogy: "磁通穿过曲面就像往漏斗里倒水：每一个磁通量子都\"压\"下一个零能态。",
    book_example: { what: R`例 12.6 与交互图 4：$S^2$ 上 $n$ 个单极子 ⇒ 恰好 $|n|$ 个同手征零模。`, point: "零模数是拓扑荷。" },
    misconception: R`$\hat A$ 只有 $4j$ 形式；二维的 $\nu_+-\nu_-$ 全部来自 $\mathrm{ch}(E)$，与引力无关。`,
  },
  {
    id: "heat_kernel", name_zh: "热核", name_en: "Heat kernel", icon: "🔥", section_id: "12.7", group: "proof",
    plain: R`$\mathrm{e}^{-t\Delta}$：大 $t$ 时投影到零模，小 $t$ 时由局部曲率决定。`,
    explain: R`$\tilde h(t)=\sum\mathrm{e}^{-t\lambda_n}$；$t\to\infty$ 给出零模数，$t\to0$ 有渐近展开 $\sum a_it^i$（从 $t^{-m/2}$ 开始），$a_i(x)$ 是局部不变量。$\ind D=\tilde h_E(t)-\tilde h_F(t)$ 与 $t$ 无关，所以 $=\int[a_0^E-a_0^F]$——整体的整数等于局部量的积分。$\zeta$ 函数是热核的 Mellin 变换，用来正规化行列式。`,
    analogy: "在一块金属板上滴一滴热：很短时间内热只感受到附近的形状（局部），很久以后只剩稳态（零模）。",
    book_example: { what: R`例 12.7：$S^1$ 上 $\sqrt\pi t^{-1/2}-1<\tilde h(t)<\sqrt\pi t^{-1/2}+1$。`, point: R`首项 $\propto$ 体积 $\times t^{-\dim M/2}$。` },
    misconception: R`单个热核迹在 $t\to0$ 发散；只有两者之差有限。`,
  },
  {
    id: "susy_pairing", name_zh: "非零谱配对（超对称）", name_en: "Spectral pairing (supersymmetry)", icon: "👯", section_id: "12.7.1", group: "proof",
    plain: R`$D^\dagger D$ 与 $DD^\dagger$ 的非零本征值一一对应：$|\lambda\rangle\mapsto D|\lambda\rangle$。`,
    explain: R`$\mathrm{Spec}'D^\dagger D=\mathrm{Spec}'DD^\dagger$（\eqref{12.105}）。这是指标一切"刚性"的根源：非零模在任何依赖谱的量中成对抵消，零模才能单独被看到。

在超对称量子力学中，$D^\dagger D$ 与 $DD^\dagger$ 是"玻色"与"费米"两个扇区的 Hamilton 量，超荷 $Q$ 在两者之间互换态。`,
    analogy: "舞会上除了几个落单者，所有人都成双成对；人数怎么变，落单者之差不变。",
    book_example: { what: R`交互图 1：随机矩阵的 $D^\dagger D$ 与 $DD^\dagger$ 非零谱逐一相同；交互图 4：单极子背景中两种手征的非零能级相同。`, point: "配对 ⇒ 指标不变。" },
    misconception: R`零本征值不必配对——这正是指标可以非零的原因。`,
  },
  {
    id: "eta_spectral_flow", name_zh: "$\eta$ 不变量与谱流", name_en: "eta-invariant & spectral flow", icon: "🌊", section_id: "12.8", group: "proof",
    plain: R`奇数维 Dirac 算子的谱不对称；本征值穿过零时 $\eta$ 跳 $\pm2$。`,
    explain: R`$\eta=\lim_{s\to0}\sum\mathrm{sgn}\lambda|\lambda|^{-s}$。随外场演化：$\Delta\eta=\int\dot\eta_c+2\times$谱流。APS 定理：带边流形 $M\times I$ 上 $\ind=\int\hat A\,\mathrm{ch}-\frac12\Delta\eta=-$谱流。

例 12.8：$S^1$ 上 $\lambda_n=n+t$，$\eta=1-2\{t\}$，一个周期谱流为 1，$\ind=-1$，零模是 $\theta$ 函数。`,
    analogy: "楼梯式的自动扶梯：每个台阶（本征值）都匀速上升，周期性地有一个台阶越过地面（零）。",
    book_example: { what: R`交互图 5：用 \eqref{12.120} 数值积分得到 $\eta(t)$ 的锯齿。`, point: "跳变是整数，连续部分被体积分抵消。" },
    misconception: R`$\eta$ 不变量本身不是拓扑不变量；它的跳变（谱流）才是。`,
  },
  {
    id: "witten_index", name_zh: "Witten 指标与超对称证明", name_en: "Witten index & SUSY proof", icon: "🧭", section_id: "12.10", group: "proof",
    plain: R`$\ind=\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$，与 $\beta$ 无关；$\beta\to0$ 时路径积分局域化给出 $\int\hat A$。`,
    explain: R`$H=(\mathrm{i}Q)^2$，$(-1)^F=\gamma_{2n+1}$。插入 $(-1)^F$ 使费米子取周期边界条件。$t=\beta s$ 后动能项 $\frac1\beta\int\dot x^2$ 把路径压到常值圈；二阶涨落的行列式给出 $\prod\frac{y_j/2}{\sin(\beta y_j/2)}$；费米零模 $\psi_0^\mu\leftrightarrow\dd x^\mu$，Grassmann 积分变成 $\int_M$。`,
    analogy: "既然答案与温度无关，就在最方便的温度（无穷高温，$\beta\to0$）下计算：那时粒子来不及走远，只感受到局部曲率。",
    book_example: { what: R`\eqref{12.188}：$\det'\begin{pmatrix}-\frac{\dd}{\dd t}&y\\-y&-\frac{\dd}{\dd t}\end{pmatrix}=\big(\frac{\sin\beta y/2}{y/2}\big)^2$（Euler 乘积）。`, point: R`$\sinh$ 来自周期边界下的行列式。` },
    misconception: R`费米子取周期而非反周期边界：这里算的是带 $(-1)^F$ 的迹，不是配分函数。`,
  },
];

export const relations = [
  { from: "symbol_ellipticity", to: "analytic_index", label: "椭圆 ⇒ Fredholm" },
  { from: "analytic_index", to: "elliptic_complex", label: "推广到复形" },
  { from: "elliptic_complex", to: "as_theorem", label: "指标公式" },
  { from: "as_theorem", to: "gauss_bonnet", label: "de Rham" },
  { from: "as_theorem", to: "riemann_roch", label: "Dolbeault" },
  { from: "as_theorem", to: "signature", label: "符号差复形" },
  { from: "as_theorem", to: "dirac_index", label: "自旋复形" },
  { from: "susy_pairing", to: "analytic_index", label: "形变不变" },
  { from: "susy_pairing", to: "heat_kernel", label: "热核差与 t 无关" },
  { from: "heat_kernel", to: "as_theorem", label: "局部公式" },
  { from: "eta_spectral_flow", to: "dirac_index", label: "带边推广" },
  { from: "witten_index", to: "dirac_index", label: "超对称证明" },
  { from: "susy_pairing", to: "witten_index", label: R`$\beta$ 无关` },
];

export const TAKEAWAYS = [
  <TxI>{R`**指标是刚性的整数。**$\ind D=\dim\ker D-\dim\ker D^\dagger$；$D^\dagger D$ 与 $DD^\dagger$ 的非零谱配对，零模只能成对地产生或消失，所以指标在连续形变下不变。有限维时它就是 $m-n$。`}</TxI>,
  <TxI>{R`**椭圆性只看最高阶符号。**$\sigma(\Delta)=|\xi|^2$、$\sigma(\dd)=\xi\wedge$、$\sigma(\bar\partial)=\xi^{0,1}\wedge$、$\sigma(\mathrm{i}\not\nabla)=\mathrm{i}\not\xi$。紧流形上椭圆 ⇒ Fredholm；椭圆复形的指标是上同调维数的交错和，可卷起成两项复形。`}</TxI>,
  <TxI>{R`**AS 定理 = 解析指标 = 拓扑指标：**$\ind=(-1)^{m(m+1)/2}\int\mathrm{ch}(\oplus(-1)^rE_r)\mathrm{Td}/e$。四个复形：$\chi=\int e$（Gauss–Bonnet–陈），$h^0-h^1=d+1-g$（Riemann–Roch），$\tau=\int L$（符号差），$\nu_+-\nu_-=\int\hat A\,\mathrm{ch}(E)$（Dirac）。`}</TxI>,
  <TxI>{R`**热核解释了"局部性"：**$\ind D=\mathrm{Tr}\,\mathrm{e}^{-tD^\dagger D}-\mathrm{Tr}\,\mathrm{e}^{-tDD^\dagger}$ 与 $t$ 无关；$t\to\infty$ 数零模，$t\to0$ 积曲率。**带边时**多出 $\eta$ 不变量：$\ind=\int\hat A\,\mathrm{ch}-\frac12\Delta\eta=-$谱流。`}</TxI>,
  <TxI>{R`**超对称证明：**Witten 指标 $\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$ 写成费米子周期边界的路径积分，$\beta\to0$ 局域到常值圈，二阶涨落给出 $\det^{1/2}\frac{\mathcal{R}/4\pi}{\sinh(\mathcal{R}/4\pi)}$，即 $\int\hat A$。`}</TxI>,
  <TxI>{R`**本站改正的原书笔误**（均有勘误框）：\eqref{12.29}、\eqref{12.48} 求和下限；\eqref{12.31} 下标；\eqref{12.46} 漏符号 $(-1)^m$；\eqref{12.51} $2-g\to2-2g$；\eqref{12.106a} 漏 $t$；\eqref{12.119} 指数；\eqref{12.122b} 符号；\eqref{12.183} 零模；瞬子论证中 $\bar\sigma_{\mu\nu}$ 的次序。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`$D:\C^5\to\C^3$ 是一个秩为 1 的矩阵。$\dim\ker D$、$\dim\ker D^\dagger$、$\ind D$ 分别是多少？`,
    options: [R`$4,2,2$`, R`$1,1,0$`, R`$4,0,4$`, R`$2,4,-2$`],
    answer: 0, why: R`$\dim\ker D=5-1=4$，$\dim\ker D^\dagger=3-1=2$，差 $=2=5-3$。加任意扰动后秩可能变成 3，零模变为 $2,0$，差仍是 2（交互图 1）。`,
  },
  {
    q: R`为什么 d'Alembert 算子 $\Box$ 不是椭圆的？`,
    options: [R`因为它是二阶的`, R`因为它的符号 $\xi_1^2+\cdots-\xi_m^2$ 在光锥上为零`, R`因为它不自伴`, R`因为它的系数不是常数`],
    answer: 1, why: R`椭圆性要求符号在每个 $\xi\neq0$ 处可逆。光锥上 $\sigma(\Box,\xi)=0$；光锥方向的平面波都是零模，核无穷维。`,
  },
  {
    q: R`亏格 $g=2$ 的 Riemann 面上，$\deg L=5$ 的全纯线丛有多少个线性无关的全纯截面？`,
    options: [R`$5$`, R`$6$`, R`$4$`, R`取决于 $L$`],
    answer: 2, why: R`$h^0-h^1=d+1-g=4$；又 $d=5>2g-2=2$，由 Serre 对偶 $h^1=h^0(K-L)=0$。所以 $h^0=4$。（按原书误印的 $(2-g)+d$ 会得到 5。）`,
  },
  {
    q: R`$S^2$ 上（$\hat A=1$）Dirac 费米子在单极子数 $n=-3$ 的背景中，下列哪项正确？`,
    options: [R`$\nu_+=3,\nu_-=0$`, R`$\nu_+=0,\nu_-=3$`, R`$\nu_+=\nu_-=3$`, R`没有零模，因为二维 $\hat A$ 积分为零`],
    answer: 1, why: R`由 \eqref{12.89} $\nu_+-\nu_-=n=-3$；消没定理（$n<0$ 时 $D^\dagger D$ 正定）给出 $\nu_+=0$，于是 $\nu_-=3$。$\hat A$ 积分为零，但 $\mathrm{ch}(E)$ 贡献了 $n$（交互图 4）。`,
  },
  {
    q: R`热核证明中，为什么 $\tilde h_E(t)-\tilde h_F(t)$ 与 $t$ 无关？`,
    options: [R`因为热方程是线性的`, R`因为 $D^\dagger D$ 与 $DD^\dagger$ 的非零本征值（含简并度）相同，$\mathrm{e}^{-t\lambda}$ 项逐对抵消`, R`因为零模的 $\mathrm{e}^{-t\cdot0}$ 与 $t$ 无关`, R`因为 $M$ 是紧的`],
    answer: 1, why: R`\eqref{12.105}：$D$ 把 $D^\dagger D$ 的 $\lambda\neq0$ 本征向量映到 $DD^\dagger$ 的同一本征值。非零模成对抵消后只剩零模的 $1$，差即指标。选项 3 只是结论的一半。`,
  },
  {
    q: R`超对称路径积分证明中，为什么可以只算 $\beta\to0$ 的极限，而且只保留二阶涨落？`,
    options: [R`因为高温时量子效应消失`, R`因为 $\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$ 与 $\beta$ 无关，而 $O(\beta)$ 的修正必须为零`, R`因为 $M$ 是平坦的`, R`因为费米子取反周期边界条件`],
    answer: 1, why: R`定理 12.5：Witten 指标与 $\beta$ 无关。$\beta\to0$ 时动能项 $\frac1\beta\int\dot x^2$ 把积分局域到常值圈；鞍点展开中高于二阶的修正正比于 $\beta$ 的正幂，既然结果与 $\beta$ 无关，它们必须为零。费米子取的是**周期**边界条件。`,
  },
];

export const BRIDGE = R`本章的指标 $\nu_+-\nu_-=\int\hat A\,\mathrm{ch}(\mathcal{F})$ 是一个**整体**的整数。第 13 章将看到它的**局部**版本：量子化手征费米子时，路径积分测度在手征变换下不再不变，其 Jacobi 行列式正是热核系数 $a_0^E(x)-a_0^F(x)$——于是轴矢流不再守恒，$\partial_\mu j^\mu_5\propto\mathrm{tr}\,\mathcal{F}\wedge\mathcal{F}$（Fujikawa 方法的**手征反常**）。对整个时空积分，反常就变成了指标。§13.2 用热核证明 $\hat A=1$ 时的扭曲自旋复形指标定理；§13.6 用本章的 APS 定理与 $\eta$ 不变量研究奇数维的宇称反常；规范反常与引力反常则由 $\hat A\,\mathrm{ch}$ 的高维形式经陈–Simons 形式的"下降方程"给出。`;
