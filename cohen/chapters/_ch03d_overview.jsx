// 第 III 章补充材料（下）的高层理解层：开场、阅读指南、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一条谱线的宽度、一只二极管的电流、一块硅的能隙";
export const HOOK = R`铯原子钟的"秒"由一条超精细跃迁定义；任何原子谱线都有一个无法消除的最小宽度，它只取决于激发态能活多久——寿命 1 纳秒，线宽就约 $10^{-7}$ 电子伏。共振隧穿二极管里，电子要穿过两道薄薄的势垒，平时几乎过不去，可在某些电压下却几乎畅通无阻。硅之所以是半导体，是因为周期排列的原子在电子能谱上切出了约 1.1 电子伏的"禁区"。

这三件看似无关的事，用的是同一套语言：给定此刻的波函数，有限时间后它是什么（传播子）；能量带上虚部意味着什么（寿命与线宽）；一个势对平面波做了什么，重复 $N$ 次又会怎样（传递矩阵与能带）。这一页就是把这套语言讲清楚——中间夹着一组覆盖第 III 章全部假设的习题。`;

// ---------- 阅读指南（本站自写） ----------
export const GUIDE = [
  { c: "JIII", title: "Schrödinger 方程的传播子", role: "把演化写成积分形式：$\\psi(2)=\\int K(2,1)\\psi(1)$；$K$ 的谱表示、Green 函数方程；路径求和与经典极限", pre: "$\\mathrm F_{\\rm III}$（演化算符）；附录 II 的 $\\delta$ 函数", level: "★★ 概念性强，§3 只作定性介绍", advice: "§2 是硬内容，第 XI 章微扰论会用到；§3 当作 Feynman 表述的导览读，配合两张交互图。" },
  { c: "KIII", title: "不稳定态与寿命", role: "指数衰减、恒定衰变率、平均寿命、自然宽度；用复能量 $E_n-i\\hbar\\gamma_n/2$ 唯象描述", pre: "正文 §D-2（定态、能量–时间不确定关系）", level: "★ 简短", advice: "半小时读完；本页补了 Lorentz 线形的推导与交互图，把 $\\Delta E\\simeq\\hbar/\\tau$ 落实为等号。" },
  { c: "LIII", title: "习题", role: "概率与平均值、Ehrenfest 定理、概率流、位力定理、方阱测量、相互作用绘景、密度算符", pre: "正文全章；16(e)–19 需 $\\mathrm E_{\\rm III}$，15 宜先读 $\\mathrm F_{\\rm III}$", level: "★–★★★", advice: "4、5、10 是常用结论；12–14 练测量假设；16–19 是密度算符的小专题。" },
  { c: "MIII", title: "任意形状势阱中的束缚态", role: "平方可积 ⇒ 能谱分立且在 $(-V_0,0)$ 内；基态严格高于阱底（不确定关系）", pre: "\\Ic{HI}（方势阱）；正文 §D-1", level: "★ 简单而基本", advice: "必读。拖一拖打靶法交互图，量子化的来源会一目了然。" },
  { c: "NIII", title: "任意形状势中的非束缚态", role: "传递矩阵 $M(k)$；实势 ⇒ 结构 $\\begin{pmatrix}F&G^*\\\\G&F^*\\end{pmatrix}$；流守恒 ⇒ $\\det M=1$；左右透射相同；$S$ 矩阵幺正", pre: "\\Ic{HI}、\\Ic{JI}；$\\mathrm M_{\\rm III}$", level: "★★ 代数为主", advice: "§1-b 的两条推理是精华；§3 的方势垒可当作核对练习。是 $\\mathrm O_{\\rm III}$ 的前提。" },
  { c: "OIII", title: "一维周期结构", role: "迭代矩阵 $Q=DM$；$|X(\\alpha)|\\lessgtr1$ ⇒ 允许带/禁带；Bragg 反射；有限晶体的能级 $k\\simeq p\\pi/Nl$；边缘态", pre: "$\\mathrm N_{\\rm III}$（必需）；$\\mathrm M_{\\rm III}$", level: "★★★ 较长", advice: "§1–2 是能带论的核心，务必读；§3 的边界条件分析可先略读结论，再回头细看。" },
];

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "JIII", title: "传播子", gist: R`$K(2,1)=\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle\theta(t_2-t_1)$ 是从 1 到 2 的振幅；按定态展开、满足 $\delta$ 源方程；切分时间后成为一切路径振幅 $\mathrm e^{iS_\Gamma/\hbar}$ 之和，$S\gg\hbar$ 时只剩作用量稳定的经典轨道。`, gives: ["JIII-1", "JIII-6", "JIII-18", "JIII-22", "JIII-30"], next: R`传播子假定了一个封闭系统；真实的激发态却会衰变——下一节处理"不封闭"。` },
  { sec: "KIII", title: "不稳定态与寿命", gist: R`$\mathcal P(t)=\mathrm e^{-t/\tau}$，单位时间衰变概率 $1/\tau$ 恒定，平均寿命 $\tau$，自然宽度 $\Delta E\simeq\hbar/\tau$；唯象地令 $E_n'=E_n-i\hbar\gamma_n/2$，$\gamma_n=1/\tau_n$。`, gives: ["KIII-3", "KIII-7", "KIII-10", "KIII-12"], next: R`在进入一维问题的系统研究之前，用一组习题巩固第 III 章的假设。` },
  { sec: "LIII", title: "习题", gist: R`十九道题：测量概率、Ehrenfest 定理与扩散、匀力场、概率流、位力定理、方阱测量、三能级系统、相互作用绘景、关联与密度算符。` },
  { sec: "MIII", title: "任意势阱的束缚态", gist: R`左右都只能是衰减指数：两个条件、一个旋钮 ⇒ $\tilde B(E)=0$ 给出分立能级；$E=\langle T\rangle+\langle V\rangle$、$\langle T\rangle>0$ ⇒ $-V_0<E_1$。`, gives: ["MIII-7", "MIII-8", "MIII-10", "MIII-17"], next: R`正能量的解不能归一，却是散射的语言——下一节研究它们。` },
  { sec: "NIII", title: "非束缚态与传递矩阵", gist: R`$M(k)$ 由左侧振幅给出右侧振幅；实势与流守恒给出 $M=\begin{pmatrix}F&G^*\\G&F^*\end{pmatrix}$、$|F|^2-|G|^2=1$；$T=1/|F|^2$ 与入射方向无关，$S$ 幺正。`, gives: ["NIII-8", "NIII-18", "NIII-21", "NIII-27", "NIII-29b"], next: R`单个势垒的 $M$ 已知，把它重复 $N$ 次会怎样？` },
  { sec: "OIII", title: "周期结构与能带", gist: R`每个周期乘一次 $Q=DM$，$\det Q=1$，本征值由 $X=\frac12\operatorname{Tr}Q$ 决定：$|X|\le1$ 时 $\mathrm e^{\pm ikl}$（允许带），$|X|>1$ 时 $\varepsilon\mathrm e^{\pm\rho l}$（禁带、Bragg 反射）；有限晶体每带 $N$ 个能级，禁带中只有边缘态。`, gives: ["OIII-17", "OIII-20", "OIII-24", "OIII-34", "OIII-48", "OIII-58"] },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "JIII-2", to: "JIII-5", label: "插入封闭关系" },
  { from: "JIII-5", to: "JIII-6", label: R`乘 $\theta(t_2-t_1)$` },
  { from: "JIII-6", to: "JIII-18", label: R`$U=\sum\mathrm e^{-iE_nt/\hbar}|\varphi_n\rangle\langle\varphi_n|$` },
  { from: "JIII-18", to: "JIII-22", label: R`$\partial_t\theta=\delta$` },
  { from: "JIII-6", to: "JIII-27", label: "切分时间" },
  { from: "JIII-27", to: "JIII-30", label: "Feynman 假设" },
  { from: "KIII-9", to: "KIII-11", label: R`$E_n\to E_n-i\hbar\gamma_n/2$` },
  { from: "KIII-3", to: "KIII-5", label: "恒定衰变率" },
  { from: "KIII-11", to: "KIII-12", label: R`与 $\mathrm e^{-t/\tau}$ 比较` },
  { from: "KIII-3", to: "KIII-7", label: "能量–时间关系" },
];
export const EQMAP_B = [
  { from: "MIII-1", to: "MIII-7", label: "左侧只留衰减项" },
  { from: "MIII-7", to: "MIII-8", label: "穿过势阱积分" },
  { from: "MIII-1", to: "MIII-10", label: R`乘 $\varphi^*$ 积分` },
  { from: "MIII-10", to: "MIII-17", label: R`$\langle T\rangle>0,\ V\ge-V_0$` },
  { from: "NIII-1", to: "NIII-8", label: "两个标准解" },
  { from: "NIII-8", to: "NIII-18", label: R`$V$ 实 ⇒ $v_k'=v_k^*$` },
  { from: "NIII-12", to: "NIII-21", label: "流守恒" },
  { from: "NIII-18", to: "NIII-21", label: "代入流" },
  { from: "NIII-21", to: "NIII-26", label: "入射→出射" },
  { from: "NIII-26", to: "NIII-29b", label: R`$\tilde A'=0$` },
  { from: "NIII-18", to: "OIII-17", label: R`乘 $D(\alpha)$` },
  { from: "OIII-17", to: "OIII-20", label: R`$\det Q=1$` },
  { from: "OIII-20", to: "OIII-26", label: R`$|X|\le1$` },
  { from: "OIII-20", to: "OIII-30", label: R`$|X|>1$` },
  { from: "OIII-30", to: "OIII-34", label: R`$Q^{N-1}$ 增长` },
  { from: "OIII-26", to: "OIII-46", label: "边界相位条件" },
  { from: "OIII-46", to: "OIII-48", label: R`$N\gg1$` },
  { from: "OIII-30", to: "OIII-58", label: "边界相位条件" },
];
export const EQMAP_LABELS = {
  "JIII-2": "演化算符", "JIII-5": "积分形式", "JIII-6": "推迟传播子", "JIII-18": "谱表示", "JIII-22": "Green 函数方程", "JIII-27": "复合律", "JIII-30": "路径振幅",
  "KIII-3": "指数衰减", "KIII-5": "恒定衰变率", "KIII-7": "自然宽度", "KIII-9": "定态概率", "KIII-11": "复能量衰减", "KIII-12": R`$\gamma=1/\tau$`,
  "MIII-1": "定态方程", "MIII-7": "左侧衰减解", "MIII-8": "右侧一般解", "MIII-10": "能量分解", "MIII-17": "能级高于阱底",
  "NIII-1": "定态方程", "NIII-8": "传递矩阵", "NIII-12": "流守恒", "NIII-18": "实势结构", "NIII-21": "det M = 1", "NIII-26": "S 矩阵", "NIII-29b": "透射系数",
  "OIII-17": "迭代矩阵", "OIII-20": "特征方程", "OIII-26": "允许带", "OIII-30": "禁带", "OIII-34": "Bragg 反射", "OIII-46": "带内能级", "OIII-48": R`$k\simeq p\pi/Nl$`, "OIII-58": "边缘态",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "time", label: "时间演化" },
  { id: "bound", label: "束缚与散射" },
  { id: "periodic", label: "周期结构" },
];

export const concepts = [
  {
    id: "propagator", name_zh: "传播子", name_en: "Propagator (Green's function)", icon: "🌀", section_id: "JIII", group: "time",
    plain: R`$K(2,1)$ 是粒子 $t_1$ 时在 $\mathbf r_1$、$t_2$ 时到 $\mathbf r_2$ 的振幅；任意波函数的演化就是与它卷积。`,
    explain: R`传播子是演化算符的位置矩阵元，再乘上阶跃函数 $\theta(t_2-t_1)$ 以保证只向未来传播。它可以用定态展开：$K=\theta\sum_n\varphi_n^*(\mathbf r_1)\varphi_n(\mathbf r_2)\mathrm e^{-iE_n(t_2-t_1)/\hbar}$。

把 Schrödinger 算符作用到 $K$ 上，只剩阶跃函数求导产生的 $\delta$ 函数项，所以 $K$ 是右边为四维 $\delta$ 函数的方程的解——Green 函数；加上因果条件 $K=0\ (t_2<t_1)$ 就唯一确定。`,
    analogy: "像 Huygens 原理：此刻的每一点都是一个小波源，未来某点的波是所有小波源发出的子波的叠加；传播子就是“单位小波源”发出的子波。",
    book_example: { what: R`$\mathrm J_{\rm III}$ 式 (JIII-1)、(JIII-6)、(JIII-18)、(JIII-22)；自由粒子传播子作用于高斯波包的交互图。`, point: "传播子把微分形式的演化改写为积分形式，并把因果性写进了定义。" },
    misconception: R`$K(2,1)$ 不是概率密度，而是振幅：不同 $\mathbf r_1$ 的贡献会干涉，要先求和再取模平方。`,
  },
  {
    id: "path_sum", name_zh: "路径求和与经典极限", name_en: "Sum over paths", icon: "🛤️", section_id: "JIII", group: "time",
    plain: R`$K$ 是所有时空路径的振幅 $\mathrm e^{iS_\Gamma/\hbar}$ 之和；$S\gg\hbar$ 时只有作用量稳定的经典路径附近不被抵消。`,
    explain: R`把时间切成 $N$ 段、在每个中间时刻插入位置的封闭关系，$K$ 就成了沿一串中间点传播的振幅对所有中间位置的积分；$N\to\infty$ 时变成对一切路径求和。Feynman 把这当作出发点：每条路径贡献 $N\mathrm e^{iS_\Gamma/\hbar}$。

当作用量远大于 $\hbar$ 时，相邻路径的相位差很大，贡献相消；唯有作用量稳定（一阶变分为零）的路径附近，相位几乎相同而相长——这正是 Hamilton 原理挑出的经典轨道。`,
    analogy: "像光的 Fermat 原理：光“试遍”所有路径，只有光程稳定的那条附近的子波同相叠加，于是我们看到光走直线、按 Snell 定律折射。",
    book_example: { what: R`$\mathrm J_{\rm III}$ §3，式 (JIII-27)–(JIII-30)；Cornu 螺线交互图。`, point: "经典力学是量子干涉在 $S\\gg\\hbar$ 时的极限。" },
    misconception: "路径求和不是说粒子“真的”走了某条我们不知道的路径；相加的是振幅而不是概率，路径之间会干涉。",
  },
  {
    id: "lifetime", name_zh: "寿命与恒定衰变率", name_en: "Lifetime", icon: "⏳", section_id: "KIII", group: "time",
    plain: R`不稳定态存活概率 $\mathrm e^{-t/\tau}$：任何时刻单位时间的衰变概率都是 $1/\tau$，与“年龄”无关。`,
    explain: R`对大量全同系统，$\mathrm dn=N(t)\,\mathrm dt/\tau$：每个幸存者在下一个 $\mathrm dt$ 内衰变的概率 $\mathrm dt/\tau$ 恒定，所以存活数指数下降。平均停留时间 $\int_0^\infty t\,\mathrm e^{-t/\tau}\mathrm dt/\tau=\tau$，这就是“寿命”的含义。

寿命是不稳定态自身的属性，与它是怎样被制备的无关。`,
    analogy: "放射性原子核不会“变老”：活了一万年的铀核与刚形成的铀核，下一秒衰变的概率完全一样。",
    book_example: { what: R`$\mathrm K_{\rm III}$ 式 (KIII-3)–(KIII-6)。`, point: "指数律 ⇔ 恒定衰变率 ⇔ 无记忆。" },
    misconception: R`寿命 $\tau$ 不是“半衰期”：存活概率降到一半的时间是 $\tau\ln2\approx0.69\tau$。`,
  },
  {
    id: "natural_width", name_zh: "自然宽度与 Lorentz 线形", name_en: "Natural width", icon: "📶", section_id: "KIII", group: "time",
    plain: R`寿命有限的态，能量只能确定到 $\hbar/\tau$ 量级；精确地说，能量分布是半高宽 $\hbar\gamma$ 的 Lorentz 曲线。`,
    explain: R`由能量–时间不确定关系，演化特征时间为 $\tau$ 的态有 $\Delta E\simeq\hbar/\tau$。对衰减振幅 $\mathrm e^{-iE_nt/\hbar-\gamma t/2}$ 做 Fourier 变换，得到 $w(E)\propto1/[(E-E_n)^2+(\hbar\gamma/2)^2]$，半高全宽恰为 $\hbar\gamma=\hbar/\tau$。

对氢原子，线宽（$\sim10^{-7}\,\mathrm{eV}$）远小于能级间距（$\sim\mathrm{eV}$），所以可以把激发态当作定态。`,
    analogy: "敲一下的钟声越快消失，音调越“含糊”；持续很久的音才有清晰的音高。",
    book_example: { what: R`$\mathrm K_{\rm III}$ 式 (KIII-7) 与本页的 Lorentz 线形补充及交互图。`, point: "线宽乘寿命等于 $\\hbar$（半高全宽意义下）。" },
    misconception: "Lorentz 分布的方均根宽度是无穷大；谈线宽时用的是半高全宽。",
  },
  {
    id: "complex_energy", name_zh: "复能量（唯象）", name_en: "Complex energy", icon: "🧮", section_id: "KIII", group: "time",
    plain: R`把 $E_n$ 换成 $E_n-i\hbar\gamma_n/2$，定态的相位因子就带上衰减 $\mathrm e^{-\gamma_nt/2}$，概率按 $\mathrm e^{-\gamma_nt}$ 下降。`,
    explain: R`实能量让 $|\mathrm e^{-iE_nt/\hbar}|^2\equiv1$，这就是定态之“定”。给能量一个负虚部，模就指数衰减；令 $\gamma_n=1/\tau_n$ 即与实验的衰减律一致。

代价是“Hamilton 量”不再厄米、范数不守恒——这反映了原子只是“原子 + 电磁场”这个更大系统的一部分。更严格的处理（$\mathrm D_{\rm XIII}$）证明这种唯象做法是合理的。`,
    analogy: "像在振动方程里加一个阻尼项：频率变成复数，虚部就是阻尼率。",
    book_example: { what: R`$\mathrm K_{\rm III}$ 式 (KIII-10)–(KIII-12) 及评注。`, point: "能量的虚部 = 衰变率的一半乘 $\\hbar$。" },
    misconception: "复能量不意味着孤立系统的量子力学出了问题；它是对开放子系统的有效描述。",
  },
  {
    id: "bound_quant", name_zh: "束缚态的量子化（打靶法）", name_en: "Quantization of bound states", icon: "🎯", section_id: "MIII", group: "bound",
    plain: "两端都要衰减：从左边的衰减尾巴出发，只有特定能量能让右边也不发散。",
    explain: R`阱外 $V=0$，负能量的解是 $\mathrm e^{\pm\rho x}$。左边只留 $\mathrm e^{\rho x}$，积分穿过阱，右边一般是 $\tilde B\mathrm e^{\rho x}+\tilde B'\mathrm e^{-\rho x}$；平方可积要求 $\tilde B(E)=0$，这是关于 $E$ 的一个方程，根是分立的。

正能量的解在无穷远处是不衰减的平面波，不能归一，所以束缚态能量都为负。第 $n$ 个能级的波函数有 $n-1$ 个节点。`,
    analogy: "像打靶：调枪口仰角（能量），只有恰好的角度才能让子弹落在远处的靶心（右侧衰减）；角度稍高或稍低都会偏到天上或地下。",
    book_example: { what: R`$\mathrm M_{\rm III}$ §1，式 (MIII-2)–(MIII-8) 与打靶法交互图。`, point: "量子化来自边界条件，不是额外假设。" },
    misconception: "方程本身对任何能量都有解；被量子化的是“满足边界条件的解”的能量。",
  },
  {
    id: "zero_point_well", name_zh: "基态高于阱底", name_en: "Ground state above the minimum", icon: "🪨", section_id: "MIII", group: "bound",
    plain: R`$E=\langle T\rangle+\langle V\rangle$，$\langle T\rangle>0$、$\langle V\rangle\ge-V_0$ ⇒ 每个能级都严格高于 $-V_0$。`,
    explain: R`把波函数挤到阱底以降低势能，$\Delta X$ 变小，$\Delta P$ 变大，动能 $\langle P^2\rangle/2m\ge(\Delta P)^2/2m$ 随之增大。基态是两者之和最小的折中，因而有一定空间范围，能量高于阱底。

量子力学中不存在“静止在阱底”的能量确定态。`,
    analogy: "想把一群调皮的孩子挤到房间最低的角落：挤得越紧，他们越躁动，总“能量”反而升高。",
    book_example: { what: R`$\mathrm M_{\rm III}$ §2，式 (MIII-9)–(MIII-18)。`, point: "零点能是不确定关系的直接后果，对任意阱形都成立。" },
    misconception: "阱外有正的势垒时，经典上可以有正能量的有界运动，但量子束缚态仍全在 $-V_0$ 与 0 之间——隧道效应让正能量粒子逃逸。",
  },
  {
    id: "transfer_matrix", name_zh: "传递矩阵", name_en: "Transfer (transmission) matrix", icon: "🔁", section_id: "NIII", group: "bound",
    plain: R`势左边的平面波振幅 $(A,A')$ 乘上 $M(k)$ 就得到右边的振幅 $(\tilde A,\tilde A')$。`,
    explain: R`对有限力程的势，正能量定态在两侧都是平面波，势的全部效应浓缩为一个 $2\times2$ 矩阵。势为实 ⇒ $v_k'=v_k^*$ ⇒ $M=\begin{pmatrix}F&G^*\\G&F^*\end{pmatrix}$；概率流处处相等 ⇒ $\det M=|F|^2-|G|^2=1$。

串联的势，传递矩阵相乘（中间夹自由传播的相位矩阵）——这正是 $\mathrm O_{\rm III}$ 的计算工具。`,
    analogy: "像光学中的多层膜：每一层是一个矩阵，整块膜的反射率由矩阵乘积给出。",
    book_example: { what: R`$\mathrm N_{\rm III}$ 式 (NIII-8)、(NIII-18)、(NIII-21)；方势垒的 (NIII-34)、(NIII-38)。`, point: "两条普遍性质只来自“势为实”与“流守恒”。" },
    misconception: R`$M$ 不是幺正矩阵（它按左–右分组）；幺正的是按入–出分组的 $S$ 矩阵。`,
  },
  {
    id: "reciprocity", name_zh: "左右透射相同", name_en: "Reciprocity of transmission", icon: "↔️", section_id: "NIII", group: "bound",
    plain: R`同一能量下，粒子从左边来或从右边来，透射系数都是 $1/|F|^2$——即使势垒左右不对称。`,
    explain: R`左入射：$T_1=|\tilde A/A|^2=1/|F|^2$；右入射：$T_2=|A'/\tilde A'|^2=1/|F|^2$。证明只用到 $M$ 的结构与 $\det M=1$。

另外 $|F|\ge1$：可以有完全透射（共振，$G=0$），却不可能在 $k>0$ 时完全反射。`,
    analogy: "一扇无论从哪边推都同样难推的门——即使门的两面长得完全不一样。",
    book_example: { what: R`$\mathrm N_{\rm III}$ 式 (NIII-29)、(NIII-31)、(NIII-32)；斜坡势垒交互图。`, point: "对称性来自时间反演（势为实）与流守恒，与势的几何形状无关。" },
    misconception: "透射系数相同不代表透射波函数相同：两种入射下势垒内部的波函数形状可以很不一样。",
  },
  {
    id: "s_matrix", name_zh: "S 矩阵", name_en: "S matrix", icon: "🎛️", section_id: "NIII", group: "bound",
    plain: R`$S$ 把入射振幅 $(A,\tilde A')$ 映射为出射振幅 $(\tilde A,A')$，并且是幺正的。`,
    explain: R`由 $M$ 的两行解出出射振幅得 $S=\frac1{F^*}\begin{pmatrix}1&G^*\\-G&1\end{pmatrix}$；用 $|F|^2-|G|^2=1$ 验证 $SS^\dagger=\mathbb 1$。幺正性表示入射的概率流全部变成出射流——也可以从演化算符的幺正性得出。

$S$ 矩阵是碰撞理论的核心对象。`,
    analogy: "一个两进两出的分光器：进来的光全部出去，只是重新分配到两个出口。",
    book_example: { what: R`$\mathrm N_{\rm III}$ 式 (NIII-22)–(NIII-27)。`, point: "幺正 ⇔ 概率守恒。" },
    misconception: "S 矩阵的对角元是透射振幅、非对角元是反射振幅（按本页记号），不要与 M 的元素混淆。",
  },
  {
    id: "bands", name_zh: "允许带与禁带", name_en: "Allowed and forbidden bands", icon: "📊", section_id: "OIII", group: "periodic",
    plain: R`$X(\alpha)=\frac12\operatorname{Tr}Q$：$|X|\le1$ 时波能在周期结构中无衰减地传播（允许带），$|X|>1$ 时指数衰减（禁带）。`,
    explain: R`每走一个周期，平面波系数乘一次迭代矩阵 $Q=DM$，$\det Q=1$，本征值满足 $\lambda^2-2X\lambda+1=0$。$|X|\le1$ 时 $\lambda=\mathrm e^{\pm ikl}$，只改变相位；$|X|>1$ 时 $\lambda=\varepsilon\mathrm e^{\pm\rho l}$，一个增长一个衰减。

有限晶体中每个允许带恰含 $N$ 个能级，$k\simeq p\pi/Nl$，态密度在 $k$ 中均匀；单个势垒越不透明，带越窄，极限下缩成孤立阱的能级。`,
    analogy: "像一排等距的路障：某些“步频”的行人能和路障节奏合拍、畅行无阻，另一些步频则每次都撞上、被挡回。",
    book_example: { what: R`$\mathrm O_{\rm III}$ 式 (OIII-17)–(OIII-30)、(OIII-46)–(OIII-51) 与能带交互图。`, point: "能带是“重复”带来的干涉效应，不需要严格周期或无穷长。" },
    misconception: "允许带中的透射系数不是单个势垒透射系数的 N 次方；后者趋于零，前者不衰减。",
  },
  {
    id: "bragg", name_zh: "Bragg 反射", name_en: "Bragg reflection", icon: "🪞", section_id: "OIII", group: "periodic",
    plain: R`禁带能量下，各势垒散射的波在透射方向完全相消，$T_N\propto\mathrm e^{-2N\rho l}$——哪怕能量高于势垒顶。`,
    explain: R`$|X|>1$ 时 $[Q]^{N-1}$ 指数增长，总传递矩阵的左上角元素指数增长，透射系数指数下降。能量远大于势的起伏时，禁带缩成 Bragg 条件 $l=p\lambda/2$ 附近的窄区。

这与 X 射线在晶面上的 Bragg 反射是同一个干涉机制。`,
    analogy: "多层增反膜：每层只反射一点点，但各层反射光同相叠加，整体几乎全反射。",
    book_example: { what: R`$\mathrm O_{\rm III}$ 式 (OIII-33)–(OIII-34) 与 $T_N(E)$ 交互图。`, point: "完全反射来自相干叠加，而不是能量不够。" },
    misconception: "能量高于所有势垒的粒子也可能被完全反射——经典上不可想象。",
  },
  {
    id: "edge_states", name_zh: "边缘态", name_en: "Edge (surface) states", icon: "🧱", section_id: "OIII", group: "periodic",
    plain: R`禁带中可以有少数定态，波函数局域在晶体一端，数目与 $N$ 无关。`,
    explain: R`禁带中 $Q$ 的本征矢一个随格点指数增长、一个指数衰减。满足左边界条件的解一般含增长分量，到右端就只剩它；要满足右边界条件，必须恰好让这个本征矢自己满足——这给出 $L(\alpha)=0$ 的少数解，与 $N$ 无关。

由增长本征矢构成的态局域在右端，由衰减本征矢构成的局域在左端。三维中对应表面态（Tamm 态）。`,
    analogy: "合唱队里只在队伍边上才能站稳的人：离开边缘一步，他的声音就被整体的节奏淹没了。",
    book_example: { what: R`$\mathrm O_{\rm III}$ §3-c，式 (OIII-53)–(OIII-59)。`, point: "体能级由周期势决定，边缘态由边界决定。" },
    misconception: "边缘态不会随晶体变大而变多，所以对体性质几乎没有影响，但对表面现象可能至关重要。",
  },
];

export const relations = [
  { from: "propagator", to: "path_sum", label: "切分时间" },
  { from: "propagator", to: "complex_energy", label: "定态相位因子" },
  { from: "lifetime", to: "natural_width", label: "Fourier 对偶" },
  { from: "complex_energy", to: "lifetime", label: "虚部=衰变率" },
  { from: "complex_energy", to: "natural_width", label: "虚部=半宽" },
  { from: "bound_quant", to: "zero_point_well", label: "能级范围" },
  { from: "bound_quant", to: "transfer_matrix", label: "同一套指数解" },
  { from: "transfer_matrix", to: "reciprocity", label: "det M = 1" },
  { from: "transfer_matrix", to: "s_matrix", label: "重新分组" },
  { from: "transfer_matrix", to: "bands", label: "乘 N 次" },
  { from: "bands", to: "bragg", label: "|X|>1" },
  { from: "bands", to: "edge_states", label: "禁带+边界" },
  { from: "bound_quant", to: "edge_states", label: "边界条件" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**传播子**：$\psi(\mathbf r_2,t_2)=\int\mathrm d^3r_1K(2,1)\psi(\mathbf r_1,t_1)$，$K=\langle\mathbf r_2|U|\mathbf r_1\rangle\theta(t_2-t_1)=\theta\sum_n\varphi_n^*(\mathbf r_1)\varphi_n(\mathbf r_2)\mathrm e^{-iE_n(t_2-t_1)/\hbar}$，是 Schrödinger 算符的推迟 Green 函数。切分时间后 $K$ 是一切路径的 $\mathrm e^{iS_\Gamma/\hbar}$ 之和，经典极限只剩作用量稳定的路径。`}</TxI>,
  <TxI>{R`**不稳定态**：$\mathcal P(t)=\mathrm e^{-t/\tau}$，恒定衰变率 $1/\tau$，平均寿命 $\tau$；唯象地 $E_n'=E_n-i\hbar\gamma_n/2$，$\gamma_n=1/\tau_n$；能量分布是半高全宽 $\hbar/\tau$ 的 Lorentz 线形。`}</TxI>,
  <TxI>{R`**束缚态**：两端都必须衰减 ⇒ $\tilde B(E)=0$ ⇒ 分立能级，全在 $(-V_0,0)$ 内；$E=\langle T\rangle+\langle V\rangle$ 与 $\langle T\rangle>0$ 使基态严格高于阱底。`}</TxI>,
  <TxI>{R`**散射态**：$M(k)=\begin{pmatrix}F&G^*\\G&F^*\end{pmatrix}$，$|F|^2-|G|^2=1$；$T=1/|F|^2$、$R=|G/F|^2$，与入射方向无关；$S$ 幺正；可以完全透射（共振），不能在 $k>0$ 时完全反射。`}</TxI>,
  <TxI>{R`**周期结构**：迭代矩阵 $Q=DM$，$X=\operatorname{Re}[\mathrm e^{i\alpha l}F]$；$|X|\le1$ 允许带（$\lambda=\mathrm e^{\pm ikl}$），$|X|>1$ 禁带（$T_N\propto\mathrm e^{-2N\rho l}$，Bragg 反射）；有限晶体每带 $N$ 个能级 $k\simeq p\pi/Nl$，与边缘无关；禁带中只有局域在边缘的少数态。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`传播子定义中的阶跃函数 $\theta(t_2-t_1)$ 起什么作用？`,
    options: ["保证传播子归一化", R`让“次级波源”只向未来辐射，并使 $K$ 满足右边为 $\delta$ 函数的 Green 函数方程`, R`把演化算符变成厄米算符`, "消除不同路径之间的干涉"],
    answer: 1, why: R`$\theta$ 把因果性写进定义（推迟传播子）；对它求导产生 $\delta(t_2-t_1)$，于是 $[i\hbar\partial_{t_2}-H]K=i\hbar\delta(t_2-t_1)\delta(\mathbf r_2-\mathbf r_1)$。`,
  },
  {
    q: "在 Feynman 的表述中，为什么 $S\\gg\\hbar$ 时粒子“沿经典轨道运动”？",
    options: ["因为只有经典轨道的振幅不为零", "因为远离经典轨道的路径作用量太大、振幅太小", "因为作用量稳定的路径附近相位几乎相同而相长叠加，其余路径的贡献相互抵消", "因为 $\\hbar\\to0$ 时路径积分发散"],
    answer: 2, why: R`每条路径的振幅模都相同（$N\mathrm e^{iS/\hbar}$），区别只在相位。$S\gg\hbar$ 时相位随路径剧烈变化而相消，唯独作用量稳定处例外——Hamilton 原理。`,
  },
  {
    q: R`一个激发态的寿命为 $\tau$。下列哪个说法正确？`,
    options: [R`它已存活 $\tau$ 之后，下一个 $\mathrm dt$ 内衰变的概率变大`, R`存活概率降到一半的时间就是 $\tau$`, R`它的能量分布是半高全宽 $\hbar/\tau$ 的 Lorentz 曲线`, R`它的寿命取决于它是怎样被激发的`],
    answer: 2, why: R`复能量 $E_n-i\hbar/2\tau$ 的振幅做 Fourier 变换得 Lorentz 线形，半高全宽 $\hbar/\tau$。衰变率与年龄无关；半衰期是 $\tau\ln2$；寿命与制备过程无关。`,
  },
  {
    q: R`任意形状的一维势阱（无穷远处 $V=0$，最低处 $-V_0$）的束缚态能量 $E$：`,
    options: [R`可以取 $-V_0$ 与 $0$ 之间的任何值`, R`构成分立集合，且 $-V_0<E<0$`, R`构成分立集合，最低可以恰好等于 $-V_0$`, R`若阱被正势垒包围，可以是正的`],
    answer: 1, why: R`两端衰减的要求使能级分立；$E<0$ 因为正能量解不可归一；$E=\langle T\rangle+\langle V\rangle>\langle V\rangle\ge-V_0$。正势垒挡不住正能量粒子（隧穿）。`,
  },
  {
    q: R`一个左右明显不对称的势垒（例如斜坡），同一能量下从左入射与从右入射的透射系数：`,
    options: ["从陡的一侧入射更大", "从缓的一侧入射更大", R`相同，都等于 $1/|F(k)|^2$`, "取决于入射波包的宽度"],
    answer: 2, why: R`由 $M=\begin{pmatrix}F&G^*\\G&F^*\end{pmatrix}$ 与 $\det M=1$，$T_1=T_2=1/|F|^2$。只用到势为实与流守恒。`,
  },
  {
    q: R`$N$ 个相同势垒组成的结构，能量落在 $|X(\alpha)|<1$ 的区间内。$N\to\infty$ 时透射系数 $T_N$：`,
    options: [R`趋于单个势垒透射系数的 $N$ 次方，即趋于零`, R`按 $\mathrm e^{-2N\rho l}$ 指数衰减`, R`不趋于零，在 0 与 1 之间振荡（有 $N-1$ 个透射峰）`, R`恒等于 1`],
    answer: 2, why: R`允许带中 $Q$ 的本征值模为 1，$[Q]^{N-1}$ 不增长，$T_N$ 不衰减——这是波动性的纯量子效应；指数衰减只发生在禁带（Bragg 反射）。`,
  },
];

export const BRIDGE = R`到这里，第 III 章的假设已经被用在了几乎所有一维问题上：束缚态、散射态、周期势，以及用密度算符描述的统计混合与关联。原书第 IV 章接着把同一套假设用于最简单的有限维系统——自旋 1/2 与二能级系统：Stern–Gerlach 实验、Larmor 进动、两个能级的耦合与 Rabi 振荡。那里没有波函数和势，只有 $2\times2$ 矩阵；而 $\mathrm O_{\rm III}$ 结尾提到的"隧穿把孤立阱的能级展宽成能带"，在第 IV 章会以最简单的形式——两个耦合态的能级排斥——重新出现。（本站目前覆盖第 I–III 章及其补充材料。）`;
