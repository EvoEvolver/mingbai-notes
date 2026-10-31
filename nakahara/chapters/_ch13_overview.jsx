// 第 13 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一个衰变、一个整数，和一张必须对上的账";
export const HOOK = R`**一个衰变。**中性 $\pi$ 介子几乎总是衰变成两个光子，寿命约 $8\times10^{-17}$ 秒。1960 年代的理论家却算出它"应当"几乎不衰变：手征对称性禁止了这一过程。矛盾的解决是 Adler、Bell 与 Jackiw 发现的**反常**——一个在 Lagrange 量层面成立的对称性，在量子论中被破坏了，而破坏量正比于 $\epsilon^{\mu\nu\rho\sigma}F_{\mu\nu}F_{\rho\sigma}$。把这个"破坏量"代入，$\pi^0\to\gamma\gamma$ 的衰变率与实验符合到百分之几，还顺带证明了夸克有三种颜色。

**一个整数。**Fujikawa 后来指出，反常并非来自某个 Feynman 图的细节，而是来自路径积分的**积分测度**：做手征转动时，测度乘上一个 Jacobian，它的对数恰好是 Dirac 算子的**指标**——正手征零模数减负手征零模数。指标是整数，连续地改变规范场时它不能连续地变化。所以反常是**拓扑的**：第 11 章的陈特征、第 12 章的 Atiyah–Singer 定理（\sref{T12.2}）在这里成为物理。

**一张必须对上的账。**如果被破坏的是**规范**对称性，理论就会失去一致性。标准模型中夸克与轻子各自都有规范反常，只有放在一起才恰好相消：$3\times\frac16+(-\frac12)=0$。为什么非阿贝尔反常的系数是 $\frac1{24\pi^2}$、三次项是 $\frac12$，而阿贝尔反常是 $\frac1{4\pi^2}$、$\frac23$？本章的回答令人惊讶：四维的非阿贝尔反常来自**六维**的阿贝尔反常，经由一串"下降方程"一层一层落下来；而三维的宇称反常恰好夹在中间。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "13.1", title: "两个反常公式", gist: R`三角图给出的阿贝尔反常 \eqref{13.5}（$\frac1{4\pi^2}$、$\frac23$）与 Bardeen 的非阿贝尔反常 \eqref{13.9}（$\frac1{24\pi^2}$、$\frac12$）：形状相似、系数不同。`, gives: ["13.5", "13.9"], next: R`先用几何方法推出第一个。` },
  { sec: "13.2", title: "阿贝尔反常 = 指标（Fujikawa）", gist: R`手征转动下作用量变 $\int\alpha\partial j$，测度变 $\mathrm{e}^{-2\mathrm{i}\int\alpha\boldsymbol A}$，得 $\partial_\mu j^\mu=-2\mathrm{i}\boldsymbol A$；Gauss 截断后非零模成对抵消，$\int\boldsymbol A=\nu_+-\nu_-=\int\mathrm{ch}_l(\mathcal{F})$。`, gives: ["13.22", "13.25", "13.28", "13.32", "13.35"], next: R`若规范场只与一种手征耦合，又会怎样？` },
  { sec: "13.3", title: "非阿贝尔反常：相位问题", gist: R`$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 没有本征值问题，改用非 Hermite 的 $\mathrm{i}\hat D$；$|\det\mathrm{i}\hat D|$ 规范不变，只有相位 $\mathrm{Im}\,W$ 反常；Jacobian 正规化给出 \eqref{13.57}；反常可加 → 标准模型的反常相消。`, gives: ["13.41", "13.43", "13.47", "13.57"], next: R`不直接算，先问反常必须满足什么代数条件。` },
  { sec: "13.4", title: "WZ 条件与下降方程", gist: R`BRS 算子 $\mathcal{S}$ = 沿规范轨道的外微分，鬼场 $\omega$ = 其上的 Maurer–Cartan 形式；$\mathcal{S}^2=0$ ⇒ WZ 条件；"横向曲率为零" $\mathbb{F}=\boldsymbol F$ ⇒ 下降方程，$G=\int Q^1_{2l}$ 解出 WZ 条件；命题 13.1 给出 $Q^1_{2l}$。`, gives: ["13.63a", "13.65b", "13.73", "13.80b", "13.82", "13.83b"], next: R`为什么从高两维出发？归一化怎样定？` },
  { sec: "13.5", title: "m 维相位卷绕 = m+2 维指标", gist: R`规范变换的圈 $g:S^1\wedge S^m\to G$；$\det\mathrm{i}\hat D$ 的相位卷绕数 $\mathcal{N}$ = 圆盘内零点卷绕数之和 = $S^2\times S^m$ 上 Dirac 算子的指标；展开 $\omega$ 的一次项得 $\delta_\omega W=2\pi\mathrm{i}\int Q^1_m$，带归一化地重现 \eqref{13.57}。`, gives: ["13.90", "13.98", "13.101", "13.103", "13.105"], next: R`奇数维中又如何？` },
  { sec: "13.6", title: "宇称反常与维数阶梯", gist: R`Pauli–Villars 正规化：宇称把 $W$ 变成 $\overline W$，破缺部分 $\mathrm{Im}\,W=\frac\pi2\eta$；APS 定理把三维谱流与四维指标相连：4 维阿贝尔 → 3 维宇称 → 2 维非阿贝尔。`, gives: ["13.107", "13.110", "13.114", "13.119"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "13.15", to: "13.25", label: "作用量的变化" },
  { from: "13.22", to: "13.25", label: "测度 Jacobian" },
  { from: "13.25", to: "13.26", label: "Gauss 截断" },
  { from: "13.26", to: "13.28", label: "非零模成对抵消" },
  { from: "13.29", to: "13.32", label: "平面波 + 展开" },
  { from: "13.28", to: "13.35", label: "指标定理" },
  { from: "13.32", to: "13.35", label: R`$=\mathrm{ch}_l$ 密度` },
  { from: "13.43", to: "13.47", label: R`$\mathrm{i}\hat D(\mathrm{i}\hat D)^\dagger$ 分块` },
  { from: "13.41", to: "13.57", label: "Jacobian 正规化" },
  { from: "13.47", to: "13.88", label: "只有相位反常" },
  { from: "13.63a", to: "13.73", label: R`$\mathcal{S}^2=0$` },
  { from: "13.65b", to: "13.78", label: R`$\mathbb{F}=\boldsymbol F$` },
  { from: "13.78", to: "13.80b", label: "按鬼场阶数" },
  { from: "13.80b", to: "13.73", label: R`$\int Q^1_{2l}$ 满足` },
  { from: "13.78", to: "13.82", label: "命题 13.1" },
  { from: "13.82", to: "13.83b", label: R`$l=2$` },
  { from: "13.88", to: "13.90", label: "相位卷绕" },
  { from: "13.90", to: "13.98", label: R`粘成 $S^2\times S^m$` },
  { from: "13.98", to: "13.101", label: "陈–Simons 粘合" },
  { from: "13.98", to: "13.103", label: R`$\omega$ 的一次项` },
  { from: "13.83b", to: "13.103", label: R`$Q^1_4$` },
  { from: "13.103", to: "13.105", label: R`$\theta=0$` },
  { from: "13.107", to: "13.110", label: R`$\tan^{-1}(M/\lambda)$` },
  { from: "13.110", to: "13.119", label: "APS：谱流" },
  { from: "13.101", to: "13.119", label: "同一个卷绕数" },
];
export const EQMAP_LABELS = {
  "13.15": "作用量的变化", "13.22": "测度的 Jacobian", "13.25": "反常守恒律", "13.26": "Gauss 截断", "13.28": "Jacobian = 指标",
  "13.29": R`$(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})^2$`, "13.32": "反常密度", "13.35": "阿贝尔反常 = 指标定理", "13.43": R`手征算子 $\mathrm{i}\hat D$`,
  "13.47": R`$|\det|$ 规范不变`, "13.41": "规范变分", "13.57": "非阿贝尔反常", "13.63a": "BRS 变换", "13.73": "WZ 条件",
  "13.65b": "横向曲率为零", "13.78": "下降方程母式", "13.80b": "下降方程", "13.82": R`$Q^1_{2l}$ 公式`, "13.83b": R`四维 $Q^1_4$`,
  "13.88": "反常相位", "13.90": "相位卷绕数", "13.98": R`卷绕数 = $(m+2)$ 维指标`, "13.101": "指标 = 规范圈卷绕数",
  "13.103": "带归一化的反常", "13.105": "重现 Bardeen", "13.107": "Pauli–Villars", "13.110": R`$\mathrm{Im}\,W=\frac\pi2\eta$`, "13.119": "谱流 = 𝒩",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "basic", label: "反常是什么" },
  { id: "abelian", label: "阿贝尔反常与指标" },
  { id: "gauge", label: "非阿贝尔反常的代数与几何" },
  { id: "odd", label: "奇数维与维数阶梯" },
];

export const concepts = [
  {
    id: "anomaly", name_zh: "反常", name_en: "Anomaly", icon: "⚡", section_id: "13.0", group: "basic",
    plain: R`经典作用量有、但量子有效作用量没有的对称性。`,
    explain: R`Noether 定理保证经典对称性给出守恒流；但量子论还要对场积分，积分测度（以及必须引入的正规化）可能不尊重这一对称性。于是有效作用量 $W$ 不再不变，守恒律被一个"反常项"修正。

按被破坏的对称性分类：手征（阿贝尔）反常、规范（非阿贝尔）反常、引力反常、宇称反常……整体对称性的反常是物理效应（$\pi^0\to\gamma\gamma$），定域规范对称性的反常则是理论不一致的信号，必须相消。`,
    analogy: "一套房子的设计图纸是完美对称的（经典作用量），但施工时必须用某种标准尺寸的砖（正规化），这批砖本身不对称——盖出来的房子就带上了无法消除的偏差。",
    book_example: { what: R`\eqref{13.5}：Adler–Bell–Jackiw 三角图给出 $\partial_\mu j^\mu_5=\frac1{16\pi^2}\epsilon\Tr\mathcal{F}\mathcal{F}$。`, point: "对称性的破坏量是一个确定的、与正规化细节无关的局部表达式。" },
    misconception: R`反常不是"某种正规化做得不好"的人为产物：任何保持规范不变性的正规化都给出同一个反常，它只能移来移去（如在矢量流与轴矢流之间），不能消掉。`,
  },
  {
    id: "fujikawa", name_zh: "Fujikawa 方法：测度的 Jacobian", name_en: "Fujikawa's method", icon: "📏", section_id: "13.2.1", group: "abelian",
    plain: R`反常来自路径积分测度在手征转动下的 Jacobian。`,
    explain: R`按 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的本征函数展开 $\psi=\sum a_i\psi_i$，测度是 $\prod\dd a_i\dd\bar b_i$。手征转动下 $a'=Ca$，Grassmann 测度乘 $(\det C)^{-1}$；两部分合起来给出 $\exp(-2\mathrm{i}\int\alpha\boldsymbol A)$，$\boldsymbol A(x)=\sum\psi_i^\dagger\gamma^{m+1}\psi_i$。

与作用量的变化 $\int\alpha\partial_\mu j^\mu$ 比较，就得 $\partial_\mu j^\mu=-2\mathrm{i}\boldsymbol A$（\eqref{13.25}）。$\boldsymbol A$ 形式上是"$\gamma^{m+1}$ 的迹"，必须正规化。`,
    analogy: R`换货币时不光要看每件商品的标价（作用量），还要看汇率表本身（测度）是否公平；手征转动的"汇率表"对正、负手征不对称，差额就是反常。`,
    book_example: { what: R`\eqref{13.19a}–\eqref{13.22}：$C_{ij}=\delta_{ij}+\mathrm{i}\alpha\langle\psi_i|\gamma^{m+1}\psi_j\rangle$，测度乘 $\exp(-\mathrm{i}\alpha\sum\langle\psi_i|\gamma^{m+1}\psi_i\rangle)$。`, point: R`Grassmann 积分的 Jacobian 是行列式的倒数：$\dd(ca)=\dd a/c$。` },
    misconception: R`$\sum_i\psi_i^\dagger\gamma^{m+1}\psi_i$ 并不是"每个模贡献零所以总和为零"：未正规化时它是 $\infty-\infty$，结果取决于怎样截断。`,
  },
  {
    id: "heat_kernel", name_zh: "热核正规化与成对抵消", name_en: "Heat-kernel regularization", icon: "🔥", section_id: "13.2.1", group: "abelian",
    plain: R`用 $\mathrm{e}^{-\lambda^2/M^2}$ 截断后，非零模成对抵消，只剩零模。`,
    explain: R`$\gamma^{m+1}$ 与 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 反对易，把本征值 $\lambda$ 的态映到 $-\lambda$ 的态；二者正交，故 $\langle\psi|\gamma^{m+1}|\psi\rangle=0$。截断权重只依赖 $\lambda^2$，于是所有非零模的贡献为零，剩下 $\nu_+-\nu_-$——对任意 $M$ 都如此（McKean–Singer，\sref{T12.5}）。

另一方面，取 $M\to\infty$ 时热核展开是局部的：$\boldsymbol A(x)=-\frac1{32\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}$。"整体 = 整数"与"局部 = 陈特征密度"合起来就是指标定理。`,
    analogy: "天平两端成对放砝码：每放一个正本征值的砝码就有一个负本征值的配对，无论放多少对，天平的读数只取决于那几个没有配对的（零模）。",
    book_example: { what: R`交互图 1：环面常磁场下 $\mathrm{Tr}_\pm w$ 各自 $\sim AM^2/4\pi$ 发散，差恒为 $N$。`, point: R`截断必须用规范协变的 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 构造。` },
    misconception: R`"$M\to\infty$" 不是为了让结果收敛——差值对任何 $M$ 都已是整数；$M\to\infty$ 是为了把它写成局部的陈特征密度。`,
  },
  {
    id: "abelian_anomaly", name_zh: "阿贝尔反常 = 指标", name_en: "Abelian anomaly as index", icon: "🔢", section_id: "13.2", group: "abelian",
    plain: R`手征反常的积分 = 正手征零模数 − 负手征零模数 = $\int\mathrm{ch}_l(\mathcal{F})$。`,
    explain: R`$\int\boldsymbol A=\nu_+-\nu_-=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+=\int_M\frac1{l!}\Tr(\frac{\mathrm{i}\mathcal{F}}{2\pi})^l$（\eqref{13.35}）。这是背景几何平凡时扭曲旋量复形的 Atiyah–Singer 定理（\sref{F:spinAS12}）。

因为是整数，反常不受微扰修正（Adler–Bardeen）；局部密度是陈–Simons 流的散度，$\Tr\mathcal{F}^2=\dd\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$——系数 $\frac23$ 的来源。`,
    analogy: "数一数一座城的人口，可以挨家挨户点（零模计数），也可以对人口密度图积分（陈特征）；两者必然相等，而且城市边界稍微挪一挪也不会让人口出现小数。",
    book_example: { what: R`\eqref{13.32}–\eqref{13.34}：$\boldsymbol A(x)\dd^4x=\mathrm{ch}_2(\mathcal{F})$。`, point: R`$\frac1{16\pi^2}\cdot\pi^2\cdot M^4\cdot\frac1{M^4}$：动量积分与指数展开的幂次恰好抵消。` },
    misconception: R`反常的局部密度不是全导数为零：$\epsilon\Tr\mathcal{F}\mathcal{F}$ 是全导数，但陈–Simons 流本身不规范不变，不能当作"守恒流的修正"随意吸收。`,
  },
  {
    id: "chiral_det", name_zh: "手征行列式的相位", name_en: "Phase of the chiral determinant", icon: "🌀", section_id: "13.3", group: "gauge",
    plain: R`手征费米子的 $|\det|$ 规范不变，反常只在相位里。`,
    explain: R`$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 在两个不同的丛之间映射，没有本征值；补成 $\mathrm{i}\hat D$ 后谱不规范不变（\eqref{13.46}），但 $\det(\mathrm{i}\hat D)\det(\mathrm{i}\hat D)^\dagger\propto\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-)$ 规范不变。所以 $\mathrm{Re}\,W$ 不变，反常只在 $\mathrm{Im}\,W$——行列式的相位。

§13.5 把这个相位沿规范变换的圈 $g(\theta)$ 绕一圈：卷绕数 $\mathcal{N}$ 是拓扑不变量，$\mathcal{N}\neq0$ 就无法用局部抵消项消掉反常（Berry 相位）。`,
    analogy: "一块表的指针长度（模）怎么转都不变，但转一圈回来指针可能多绕了几圈（相位卷绕）——这多出的圈数无法靠重新标刻度消掉。",
    book_example: { what: R`\eqref{13.88}：$\det\mathrm{i}\hat D(\mathcal{A}^{g(\theta)})=[\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}]^{1/2}\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}$；习题 13.2：$\Delta W=-2\pi\mathrm{i}\mathcal{N}$。`, point: "非阿贝尔反常 = 行列式线丛的扭曲。" },
    misconception: R`"本征值不规范不变"不等于"行列式不规范不变"：模长是规范不变的。`,
  },
  {
    id: "nonabelian_anomaly", name_zh: "非阿贝尔（一致）反常", name_en: "Non-Abelian (consistent) anomaly", icon: "🧩", section_id: "13.3", group: "gauge",
    plain: R`手征费米子的规范流不守恒：$\mathcal{D}_\mu\langle j^\mu\rangle_\alpha=\frac1{24\pi^2}\Tr T_\alpha\epsilon\partial(\mathcal{A}\partial\mathcal{A}+\frac12\mathcal{A}^3)$。`,
    explain: R`由有效作用量的规范变分定义，满足 WZ 一致性条件，称为一致反常；它不规范协变（另有一个协变但不满足 WZ 条件的"协变反常"，四维时系数 $\frac1{32\pi^2}\Tr T_\alpha\epsilon\mathcal{F}\mathcal{F}$ 型）。

与阿贝尔反常相比，系数 $\frac1{24\pi^2}$ vs $\frac1{4\pi^2}$、三次项 $\frac12$ vs $\frac23$——前者来自六维的 $\mathrm{ch}_3$ 经下降方程落到四维，后者来自四维自己的 $\mathrm{ch}_2$。`,
    analogy: "同一座楼梯：阿贝尔反常是站在本层（$2l$ 维）看到的地板，非阿贝尔反常是从上两层（$2l+2$ 维）沿楼梯走下来时在本层留下的脚印。",
    book_example: { what: R`\eqref{13.56}–\eqref{13.57}；\eqref{13.103}–\eqref{13.105} 用指标定理带归一化地重现。`, point: R`$2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3=\frac1{24\pi^2}$。` },
    misconception: R`一致反常与协变反常描述同一个物理（差一个局部项，Bardeen–Zumino 多项式），但只有一致反常是有效作用量的变分。`,
  },
  {
    id: "anomaly_cancel", name_zh: "反常相消", name_en: "Anomaly cancellation", icon: "⚖️", section_id: "13.3", group: "gauge",
    plain: R`规范理论自洽要求所有手征费米子的 $d_{\alpha\beta\gamma}=\frac12\Tr(T_\alpha\{T_\beta,T_\gamma\})$ 之和为零。`,
    explain: R`反常对费米子线性可加，表示依赖只在对称迹 $d_{\alpha\beta\gamma}$ 中。实与赝实表示没有反常；复表示的反常必须成套抵消。

标准模型一代：$[\mathrm{SU}(3)]^3$、$[\mathrm{SU}(3)]^2\mathrm{U}(1)$、$[\mathrm{SU}(2)]^2\mathrm{U}(1)$、$[\mathrm{U}(1)]^3$、引力反常全为零，Witten 条件也满足——但只有夸克与轻子合在一起才成立。`,
    analogy: "一本账：夸克这一栏是赤字，轻子这一栏是盈余，单看哪一栏都对不上，合起来恰好平衡。",
    book_example: { what: R`交互图 4：逐项计算 $\sum Y^3=6(\frac16)^3+3(-\frac23)^3+3(\frac13)^3+2(-\frac12)^3+1=0$。`, point: "反常相消约束了费米子量子数。" },
    misconception: R`反常相消不是"微扰论里的偶然巧合"：反常是拓扑量（指标），相消是精确的、所有阶都成立。`,
  },
  {
    id: "brs", name_zh: "BRS 算子与鬼场", name_en: "BRS operator & FP ghost", icon: "👻", section_id: "13.4.1", group: "gauge",
    plain: R`$\mathcal{S}$ = 沿规范轨道的外微分，$\omega=g^{-1}\mathcal{S}g$ = 规范群上的 Maurer–Cartan 形式。`,
    explain: R`$\mathfrak{A}\to\mathfrak{A}/\mathfrak{G}$ 是以规范群 $\mathfrak{G}$ 为纤维的丛；联络空间上的泛函外微分 $\delta$ 限制到纤维方向就是 $\mathcal{S}$（图 13.1）。$\mathcal{S}\boldsymbol A=-\mathcal{D}_{\boldsymbol A}\omega$ 是以鬼场为参数的规范变换，$\mathcal{S}\omega=-\omega^2$ 编码了李括号。

$\mathcal{S}^2=0$ 是 $\delta^2=0$ 的限制；$\Delta=\dd+\mathcal{S}$ 也幂零，$\mathbb{A}=\boldsymbol A+\omega$ 是扩展空间上的联络，其曲率 $\mathbb{F}=\boldsymbol F$ 在鬼场方向为零。`,
    analogy: "在一张地图上，沿等高线（规范轨道）走动海拔不变；BRS 算子就是只沿等高线方向求导的那个梯度。",
    book_example: { what: R`\eqref{13.70}：$\delta\mathcal{A}=g^{-1}\delta a\,g-\mathcal{D}_{\mathcal{A}}(g^{-1}\delta g)$，第二项是竖直（纤维）方向。`, point: "鬼场的几何意义：规范群纤维上的左不变一形式。" },
    misconception: R`这里的鬼场不是需要量子化的动力学场，而是一个记账工具（Grassmann 奇的一形式），用来把"对所有规范参数"的条件写成一个方程。`,
  },
  {
    id: "wz", name_zh: "Wess–Zumino 一致性条件", name_en: "Wess–Zumino consistency condition", icon: "🔒", section_id: "13.4.3", group: "gauge",
    plain: R`反常必须满足 $\mathcal{S}G=\mathcal{S}^2W=0$。`,
    explain: R`分量形式：$\delta_{v_1}G_{v_2}-\delta_{v_2}G_{v_1}=G_{[v_1,v_2]}$——两次规范变换的对易子必须与反常相容。它强到给定首项（$\propto d_{\alpha\beta\gamma}\epsilon\partial\mathcal{A}\partial\mathcal{A}$）就定下整个反常，包括 $\frac12\mathcal{A}^3$ 项的系数。

但它不能定出整体归一化，也不能排除 $\mathcal{S}$ 恰当的平凡解（局部抵消项）——这两点由族指标定理解决（§13.5）。`,
    analogy: "数独的规则：填进第一个数之后，其余的格子都被规则逼出来了，但规则本身不告诉你第一个数填几。",
    book_example: { what: R`\eqref{13.81}：$\mathcal{S}\int Q^1_{2l}=-\int_{\partial M}Q^2_{2l-1}=0$。`, point: "下降方程自动给出 WZ 条件的解。" },
    misconception: R`满足 WZ 条件的并非一定是"真正的"反常：$\mathcal{S}(\text{局部泛函})$ 也满足，但它可以被抵消项吸收。`,
  },
  {
    id: "descent", name_zh: "下降方程（Stora–Zumino）", name_en: "Descent equations", icon: "🪜", section_id: "13.4.4", group: "gauge",
    plain: R`$\mathrm{ch}_{l+1}$ 的陈–Simons 形式按鬼场阶数展开，一层一层落下：$\mathcal{S}Q^s+\dd Q^{s+1}=0$。`,
    explain: R`因 $\mathbb{F}=\boldsymbol F$，$\Delta Q_{2l+1}(\mathbb{A},\mathbb{F})=\dd Q_{2l+1}(\boldsymbol A,\boldsymbol F)$；按鬼场数比较得 \eqref{13.80a}–\eqref{13.80d}。第二层 $Q^1_{2l}$ 积分即反常。

命题 13.1：$Q^1_{2l}=(\frac{\mathrm{i}}{2\pi})^{l+1}\frac1{(l-1)!}\int_0^1(1-t)\,\mathrm{str}[\omega\dd(\mathcal{A}\mathcal{F}_t^{l-1})]\dd t$。权重 $(1-t)$（而非陈–Simons 的 $1$）把 $\frac23$ 变成 $\frac12$。`,
    analogy: "从楼顶（$2l+2$ 维的陈特征）沿楼梯往下走：每下一级，形式次数减一、鬼场数加一；走到第二级就是我们要的反常。",
    book_example: { what: R`\eqref{13.83b}：$Q^1_4=\frac16(\frac{\mathrm{i}}{2\pi})^3\mathrm{str}(\omega\dd(A\dd A+\frac12A^3))$；交互图 2 逐项核对。`, point: R`$\int_0^1(1-t)t\,\dd t=\frac16$，$\int_0^1(1-t)t^2\dd t=\frac1{12}$。` },
    misconception: R`下降方程只在差恰当形式的意义下确定各 $Q^s_r$；不同选择对应于加局部抵消项。`,
  },
  {
    id: "phase_winding", name_zh: "相位卷绕 = 高两维的指标", name_en: "Winding = index in m+2 dimensions", icon: "🧭", section_id: "13.5", group: "odd",
    plain: R`$m$ 维手征行列式沿规范圈的相位卷绕数 = $S^2\times S^m$ 上 Dirac 算子的指标。`,
    explain: R`把规范轨道上的圈填成圆盘（$t\mathcal{A}^{g(\theta)}$），卷绕数 = 圆盘内行列式零点的局部卷绕数之和（辐角原理）；每个零点对应 $(m+2)$ 维 Dirac 算子的一个手征零模（Alvarez-Gaumé–Ginsparg）。再把圆盘与另一圆盘粘成 $S^2$，$g$ 成为转移函数，指标 = $\pi_{m+1}(G)$ 中的卷绕数。

这解释了为什么 $m$ 维非阿贝尔反常要从 $m+2$ 维的阿贝尔反常出发，并定出了归一化。`,
    analogy: "要知道一个圆圈（规范轨道）绕没绕过某个洞，就往里面糊一张膜（圆盘），数膜上被戳穿的点。",
    book_example: { what: R`图 13.3、13.4；\eqref{13.98}、\eqref{13.101}。`, point: R`$\pi_{m+1}(G)=\pi_1(\mathfrak{G})$：规范群的圈。` },
    misconception: R`$\mathcal{A}^{t,\theta}$ 圆盘内部的构型不是规范等价的——正因如此行列式才可能为零。`,
  },
  {
    id: "parity_anomaly", name_zh: "宇称反常与 η 不变量", name_en: "Parity anomaly & eta invariant", icon: "🪞", section_id: "13.6.1", group: "odd",
    plain: R`奇数维中宇称把 $W$ 变成 $\overline W$；破缺部分 $\mathrm{Im}\,W=\frac\pi2\eta$。`,
    explain: R`奇数维没有复旋量表示，没有规范反常；但为了正规化必须加的 Pauli–Villars 质量项本身破坏宇称。宇称使本征值变号，$\prod\frac{\lambda}{\lambda+\mathrm{i}M}$ 变成复共轭；$\mathrm{Im}\,W=\sum\tan^{-1}(M/\lambda)\to\frac\pi2(\#\lambda>0-\#\lambda<0)=\frac\pi2\eta$。

$\eta$ 在规范变换下不变，但在大规范变换的路径上会因本征值穿过零而跳 2——谱流。`,
    analogy: "镜子里的你左右颠倒；如果你的'正负资产表'不对称（正本征值多于负本征值），照镜子后的账面就不同了，差额就是 $\eta$。",
    book_example: { what: R`\eqref{13.110}；交互图 3：$\mathrm{i}\partial_\theta+t$ 上 $\mathrm{Im}\,W=\tan^{-1}[\cot\pi t\tanh\pi M]\to\frac\pi2(1-2\{t\})$。`, point: R`$\eta$ 是正规化的"正本征值数减负本征值数"。` },
    misconception: R`宇称反常不是"规范反常在奇数维的版本"：被破坏的是离散的宇称对称性，规范不变性保持（以宇称为代价）。`,
  },
  {
    id: "ladder", name_zh: "维数阶梯 4–3–2", name_en: "Dimensional ladder", icon: "🏛️", section_id: "13.6.2", group: "odd",
    plain: R`同一个整数 $\mathcal{N}$：四维的指标、三维的谱流、二维的相位卷绕。`,
    explain: R`$g:S^2\times S^1\to G$ 三种读法：(1) $S^2\times S^2$ 上 $G$ 丛的转移函数 → 四维阿贝尔反常的指标；(2) 三维规范势 $\mathcal{A}_0$ 与 $g^{-1}(\mathcal{A}_0+\dd)g$ 之间 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3$ 的谱流（APS 定理，两端 $\eta$ 相等）；(3) 规范群的圈 $S^1\to\mathfrak{G}$ → 二维非阿贝尔反常的相位卷绕。

推广：$(2l+2)$ 维阿贝尔 → $(2l+1)$ 维宇称 → $2l$ 维非阿贝尔。`,
    analogy: "同一座山的高度，可以在山顶用气压计量（四维指标），沿山路数台阶（三维谱流），或在山脚看等高线绕了几圈（二维相位）。",
    book_example: { what: R`\eqref{13.114}、\eqref{13.115a}、\eqref{13.119}。`, point: R`$\mathcal{N}=\frac1{24\pi^2}\int\Tr(g^{-1}\dd g)^3$ 贯穿三层。` },
    misconception: R`谱流不为零不意味着两端的谱不同——两端完全相同，只是本征值整体"挪了一格"。`,
  },
];

export const relations = [
  { from: "anomaly", to: "fujikawa", label: "来源：测度" },
  { from: "fujikawa", to: "heat_kernel", label: "需正规化" },
  { from: "heat_kernel", to: "abelian_anomaly", label: "= 指标" },
  { from: "anomaly", to: "nonabelian_anomaly", label: "规范对称性" },
  { from: "nonabelian_anomaly", to: "chiral_det", label: "只在相位" },
  { from: "nonabelian_anomaly", to: "anomaly_cancel", label: "必须相消" },
  { from: "brs", to: "wz", label: R`$\mathcal{S}^2=0$` },
  { from: "wz", to: "nonabelian_anomaly", label: "约束形式" },
  { from: "descent", to: "wz", label: "给出解" },
  { from: "abelian_anomaly", to: "descent", label: R`$\mathrm{ch}_{l+1}$ 起点` },
  { from: "chiral_det", to: "phase_winding", label: "绕规范圈" },
  { from: "phase_winding", to: "abelian_anomaly", label: "高两维指标" },
  { from: "phase_winding", to: "nonabelian_anomaly", label: "定归一化" },
  { from: "parity_anomaly", to: "ladder", label: "谱流" },
  { from: "phase_winding", to: "ladder", label: "同一整数" },
  { from: "abelian_anomaly", to: "ladder", label: "四维一级" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**反常来自测度。**手征转动下作用量变 $\int\alpha\partial_\mu j^\mu$，Grassmann 测度乘 $\exp(-2\mathrm{i}\int\alpha\boldsymbol A)$，于是 $\partial_\mu j^\mu_{m+1}=-2\mathrm{i}\boldsymbol A$；$\boldsymbol A=\sum\psi_i^\dagger\gamma^{m+1}\psi_i$ 必须用规范协变的 $\mathrm{e}^{-(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})^2/M^2}$ 正规化。`}</TxI>,
  <TxI>{R`**阿贝尔反常 = 指标。**非零模成对抵消，$\int\boldsymbol A=\nu_+-\nu_-=\int_M\mathrm{ch}_l(\mathcal{F})$；四维局部密度 $-\frac1{32\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}=\mathrm{ch}_2$，其陈–Simons 形式给出 $\frac23\mathcal{A}^3$。`}</TxI>,
  <TxI>{R`**非阿贝尔反常只在相位里**（$|\det\mathrm{i}\hat D|$ 规范不变），满足 Wess–Zumino 条件 $\mathcal{S}G=0$；BRS 算子是沿规范轨道的外微分，$\mathbb{F}=\boldsymbol F$ 给出下降方程，$G=\int Q^1_{2l}$，$Q^1_{2l}$ 由命题 13.1 给出（权重 $1-t$ ⇒ $\frac12\mathcal{A}^3$）。反常对费米子可加，必须相消（标准模型）。`}</TxI>,
  <TxI>{R`**为什么高两维：**$\det\mathrm{i}\hat D$ 沿规范圈的相位卷绕数 = $S^2\times S^m$ 上的指标 = $g:S^{m+1}\to G$ 的卷绕数；$\delta_\omega W=2\pi\mathrm{i}\int Q^1_m$ 连归一化一并定出：四维 $\frac1{24\pi^2}$。`}</TxI>,
  <TxI>{R`**奇数维：**宇称反常 $\mathrm{Im}\,W=\frac\pi2\eta$；APS 定理把三维谱流与四维指标相连，得到维数阶梯 4–3–2：同一个 $\mathcal{N}=\frac1{24\pi^2}\int\Tr(g^{-1}\dd g)^3$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`Fujikawa 方法中，为什么 Grassmann 变量换元 $a'=Ca$ 时测度乘的是 $(\det C)^{-1}$ 而不是 $\det C$？`,
    options: [R`因为 $C$ 是幺正矩阵`, R`因为 Grassmann 积分 $\int a\,\dd a=1$ 要求 $\dd(ca)=\dd a/c$：Berezin 积分的换元规则与普通积分相反`, R`因为手征转动是反幺正的`, R`这是一个约定，取 $\det C$ 也可以`],
    answer: 1, why: R`脚注 1：$\int ca\,\dd(ca)=1=\int a\,\dd a$ 迫使 $\dd(ca)=\dd a/c$。若取 $\det C$，反常的符号会反过来，与三角图结果矛盾。`,
  },
  {
    q: R`Gauss 截断后 $\sum_i\langle\psi_i|\gamma^{m+1}\mathrm{e}^{-(\lambda_i/M)^2}|\psi_i\rangle$ 只剩零模的贡献，关键原因是：`,
    options: [R`$M\to\infty$ 时 $\mathrm{e}^{-\lambda^2/M^2}\to1$`, R`$\gamma^{m+1}$ 与 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 反对易，把 $\lambda$ 与 $-\lambda$ 的本征态联系起来，二者正交，故每个非零模的 $\langle\psi|\gamma^{m+1}|\psi\rangle=0$`, R`非零模的本征函数在无穷远处衰减`, R`$\Tr\gamma^{m+1}=0$`],
    answer: 1, why: R`$|\psi\rangle^\chi=\gamma^{m+1}|\psi\rangle$ 的本征值为 $-\lambda$；Hermite 算子不同本征值的本征态正交，所以 $\langle\psi|\gamma^{m+1}|\psi\rangle=0$。这对任何 $M$ 都成立（交互图 1）。`,
  },
  {
    q: R`为什么手征费米子有效作用量的**实部** $\mathrm{Re}\,W_{\boldsymbol r}$ 规范不变？`,
    options: [R`因为 $\mathrm{i}\hat D$ 是 Hermite 的`, R`因为 $\mathrm{i}\hat D$ 的每个本征值规范不变`, R`因为 $\det(\mathrm{i}\hat D)\det(\mathrm{i}\hat D)^\dagger\propto\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-)$，后者是（规范不变的）Dirac 行列式的一块`, R`因为反常总是纯虚的常数`],
    answer: 2, why: R`\eqref{13.47}：$\mathrm{i}\hat D(\mathrm{i}\hat D)^\dagger$ 分块对角。$\mathrm{i}\hat D$ 不是 Hermite 的，本征值也不规范不变（\eqref{13.46}）；只有模长不变，所以反常全在相位 $\mathrm{Im}\,W$ 中。`,
  },
  {
    q: R`四维非阿贝尔反常中 $\mathcal{A}^3$ 项系数是 $\frac12$，而阿贝尔反常中是 $\frac23$。按本章，这个差别来自：`,
    options: [R`费米子圈的对称因子不同`, R`非阿贝尔反常来自六维 $\mathrm{ch}_3$ 的下降方程，$t$ 积分权重为 $(1-t)$：$\int(1-t)t^2/\int(1-t)t=\frac12$；阿贝尔反常来自四维 $\mathrm{ch}_2$ 的陈–Simons 形式，权重为 $1$：$\frac{1/3}{1/2}=\frac23$`, R`正规化方案不同`, R`$\mathrm{SU}(N)$ 与 $\mathrm{U}(1)$ 的结构常数不同`],
    answer: 1, why: R`\eqref{13.82}–\eqref{13.83b}：$\frac{1/12}{1/6}=\frac12$；陈–Simons $\int_0^1\mathrm{str}(\mathcal{A}\mathcal{F}_t)\dd t=\frac12\mathcal{A}\dd\mathcal{A}+\frac13\mathcal{A}^3$ 给出 $\frac23$。交互图 2 精确核对。`,
  },
  {
    q: R`Wess–Zumino 一致性条件 $\mathcal{S}G=0$ 不能确定的是：`,
    options: [R`反常对 $\mathcal{A}$ 的依赖形式`, R`反常的整体归一化（以及可以被局部抵消项吸收的平凡解）`, R`$\mathcal{A}^3$ 项与 $\mathcal{A}\partial\mathcal{A}$ 项的相对系数`, R`反常是否依赖于时空维数`],
    answer: 1, why: R`给定首项后 WZ 条件定死其余各项（包括 $\frac12$），但 $G\to cG$ 仍满足条件，$\mathcal{S}(\text{局部泛函})$ 也满足。归一化由 §13.5 的指标论证（$2\pi\mathrm{i}\int Q^1_m$）定出。`,
  },
  {
    q: R`三维中用 Pauli–Villars 正规化，宇称变换后 $W[\mathcal{A}^{\rm P}]=\overline{\sym{W}{W[\mathcal{A}]}}$。下列哪一项正确？`,
    options: [R`$W$ 是实的，所以没有宇称反常`, R`宇称破缺部分是 $W-W[\mathcal{A}^{\rm P}]=2\mathrm{i}\,\mathrm{Im}\,W$，而 $\mathrm{Im}\,W=\frac\pi2\eta$`, R`$\eta$ 在大规范变换下会改变，所以三维有规范反常`, R`$\mathrm{Im}\,W$ 与 $M$ 无关`],
    answer: 1, why: R`\eqref{13.108}–\eqref{13.110}（\eqref{13.109} 原书漏了 $\mathrm{i}$）。$\eta$ 规范不变（谱规范不变），奇数维没有规范反常；有限 $M$ 时 $\mathrm{Im}\,W$ 依赖于 $M$（交互图 3），$M\to\infty$ 才趋于 $\frac\pi2\eta$。`,
  },
];

export const BRIDGE = R`本章的反常都与**规范**对称性（或手征对称性）相关，而几何背景被刻意选成平凡的（$\hat A=1$）。下一章转向弦论，那里最重要的反常是**共形（Weyl）反常**：二维世界面上的度规有 Weyl 对称性 $g\to\mathrm{e}^{2\sigma}g$，但量子化后有效作用量对 $\sigma$ 的变分正比于 $(D-26)$ 乘以世界面的曲率 $R$——这同样是一个指标定理型的热核系数（第 12 章 Gauss–Bonnet 的 $\chi(\Sigma)=\frac1{4\pi}\int R$）。要求这个反常相消，就得到玻色弦的临界维数 $D=26$。第 14 章将用 Polyakov 路径积分、模空间与 Faddeev–Popov 鬼场（与本章 §13.4 的鬼场同一来源）把这一切讲清楚。`;
