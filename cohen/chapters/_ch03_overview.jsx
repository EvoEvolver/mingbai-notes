// 第 III 章高层理解层：开场、路线图、推导图、六条假设一览、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "同一个态，测一万次，为什么结果不一样？";
export const HOOK = R`今天的量子计算机每天被测量数十亿次。把一个超导量子比特制备在某个确定的态上，然后测量它：有时得到 0，有时得到 1。重复一万次，统计两种结果的比例——这个比例会稳稳地趋向某个数，而这个数可以在测量之前就从态矢量算出来。更奇怪的是：如果紧接着再测一次，结果就不再随机了，总是重复刚才的那个值。

这几条经验规律——**只能得到某些特定的值**、**各个值的概率由态决定**、**测量之后态变了**、**不测量的时候态按一个确定的方程平滑演化**——正是本章要陈述的量子力学基本假设。它们无法从更深的原理推出，却支撑着从原子光谱到量子计算的全部预言。

第 II 章准备好了数学：右矢、厄米算符、本征值与投影。本章把这些数学对象与实验一一挂钩，然后追问其后果：平均值和不确定度如何计算？为什么有些量可以同时测、有些不行？Schrödinger 方程怎样保证概率守恒，又怎样在宏观极限下回到牛顿力学？最后，叠加原理把这一切串起来：何时把概率幅相加，何时把概率相加。`;

// ---------- 六条假设一览（表格，链接到各假设框）----------
export const POSTULATES = [
  { k: "一", id: "postulate-1", what: "态", text: R`$t_0$ 时孤立体系的态由态空间 $\mathcal E$ 中的右矢 $\ket{\psi(t_0)}$ 规定（蕴含叠加原理）。` },
  { k: "二", id: "postulate-2", what: "物理量", text: R`每个可测物理量 $\mathcal A$ 由作用于 $\mathcal E$ 的可观测量 $A$ 描述（量子化规则：在对称化的经典表达式中 $\mathbf r\to\mathbf R$，$\mathbf p\to\mathbf P$）。` },
  { k: "三", id: "postulate-3", what: "可能结果", text: R`测量 $\mathcal A$ 只能得到 $A$ 的本征值。` },
  { k: "四", id: "postulate-4b", what: "概率", text: R`$\mathcal P(a_n)=\sum_i|\braket{u_n^i|\psi}|^2=\bra\psi P_n\ket\psi$；连续谱 $\dd\mathcal P(\alpha)=|\braket{v_\alpha|\psi}|^2\dd\alpha$。` },
  { k: "五", id: "postulate-5", what: "测量后的态", text: R`测得 $a_n$ 后 $\ket\psi\to P_n\ket\psi/\sqrt{\bra\psi P_n\ket\psi}$；连续谱见 \eqref{E-39}。` },
  { k: "六", id: "postulate-6", what: "演化", text: R`$i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=H(t)\ket{\psi(t)}$，$H$ 为总能量对应的可观测量。` },
];

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "A", title: "经典描述的三要素", gist: R`态 = $\{q_i,p_i\}$；物理量是态的函数，测量结果确定；演化由一阶的 Hamilton 方程决定。量子力学要逐条回答：态怎么描述？测量结果怎么预言？态怎么演化？`, gives: ["A-1", "A-2a", "A-2b"], next: R`把这三问的量子答案明确写成假设。` },
  { sec: "B", title: "六条假设与量子化规则", gist: R`右矢（一）；可观测量（二）；本征值（三）；$\mathcal P(a_n)=\bra\psi P_n\ket\psi$（四）；投影并归一（五）；Schrödinger 方程（六）；$\mathbf r\to\mathbf R$、$\mathbf p\to\mathbf P$ 并对称化。整体相因子无意义，相对相位有意义。`, gives: ["B-7", "B-14", "B-17", "B-31", "B-33", "B-39", "B-42", "B-46"], next: R`这些抽象规则在熟悉的问题中给出什么？` },
  { sec: "C", title: "测量假设的物理诠释", gist: R`重现 $|\psi(x)|^2$ 与 $|\overline\psi(p)|^2$ 的概率解释；平均值 $\langle A\rangle=\bra\psi A\ket\psi$；$\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}$ 与 $\Delta X\Delta P_x\geq\hbar/2$；对易 ⇔ 相容（次序无关、可同时测量），完全确定测量后的态需要 ECOC。`, gives: ["C-1", "C-4", "C-23", "C-26", "C-28", "C-44", "C-49"], next: R`测量之外，两次测量之间的演化有什么性质？` },
  { sec: "D-1", title: "Schrödinger 方程的一般性质", gist: R`确定性、线性（演化算符 $U(t,t_0)$）、范数守恒（$H$ 厄米）；局域守恒 $\partial_t\rho+\nabla\cdot\mathbf J=0$；$\frac{d}{dt}\langle A\rangle=\frac1{i\hbar}\langle[A,H]\rangle+\langle\partial_tA\rangle$ ⇒ Ehrenfest 定理与经典极限。`, gives: ["D-1", "D-6", "D-11", "D-17", "D-27", "D-34", "D-35", "D-44"], next: R`$H$ 不显含时间时，演化可以完全解出。` },
  { sec: "D-2", title: "保守体系", gist: R`按 $H$ 的本征态展开，每个分量乘 $e^{-iE_n(t-t_0)/\hbar}$；定态只差整体相因子；运动常量的平均值与概率守恒；$\langle B\rangle(t)$ 以 Bohr 频率振荡、矩阵元为零给出选择定则；$\Delta t\cdot\Delta E\gtrsim h$。`, gives: ["D-51", "D-54", "D-57", "D-58", "D-68", "D-69"], next: R`回到第一假设：叠加原理究竟带来了什么？` },
  { sec: "E", title: "叠加原理与物理预言", gist: R`叠加不等于统计混合：概率多出依赖相对相位的干涉项；不测中间态时对振幅求和；简并、分辨率有限、连续谱时对正交末态的概率求和；连续谱的约化是“截断”波函数。`, gives: ["E-9", "E-19", "E-21", "E-27", "E-29", "E-39"] },
];

// ---------- 推导图 ----------
export const EQMAP_MEAS = [
  { from: "B-3", to: "B-4", label: "第四假设（非简并）" },
  { from: "B-6", to: "B-7", label: "简并：对 i 求和" },
  { from: "B-7", to: "B-12", label: R`投影 $\ket{\psi_n}$ 的模方` },
  { from: "B-11", to: "B-14", label: R`$P_n^\dagger=P_n=P_n^2$` },
  { from: "B-12", to: "B-14", label: "" },
  { from: "B-14", to: "B-31", label: "第五假设：投影并归一" },
  { from: "B-7", to: "C-8", label: R`$N\to\infty$ 的样本平均` },
  { from: "C-8", to: "C-4", label: "封闭关系" },
  { from: "C-4", to: "C-26", label: "方差" },
  { from: "B-33", to: "C-28", label: "Schwarz 不等式" },
  { from: "C-26", to: "C-28", label: "" },
  { from: "B-31", to: "C-44", label: "相继测量对易量" },
  { from: "B-14", to: "E-27", label: R`$P_n\to P_\Delta$` },
  { from: "B-31", to: "E-29", label: R`$P_n\to P_\Delta$` },
  { from: "E-29", to: "E-39", label: "连续谱窗口" },
];
export const EQMAP_DYN = [
  { from: "D-1", to: "D-6", label: R`$H^\dagger=H$` },
  { from: "D-1", to: "D-16", label: "位置表象 + 复共轭" },
  { from: "D-16", to: "D-17", label: "写成散度" },
  { from: "D-17", to: "D-11", label: "连续性方程" },
  { from: "D-1", to: "D-27", label: R`对 $\bra\psi A\ket\psi$ 求导` },
  { from: "D-27", to: "D-34", label: R`$A=\mathbf R$` },
  { from: "D-27", to: "D-35", label: R`$A=\mathbf P$` },
  { from: "D-35", to: "D-44", label: "波包足够窄" },
  { from: "D-1", to: "D-51", label: "投影到本征态" },
  { from: "D-51", to: "D-54", label: "逐项乘相因子" },
  { from: "D-54", to: "D-57", label: "只有一个能级" },
  { from: "D-54", to: "D-68", label: R`代入 $\bra\psi B\ket\psi$` },
  { from: "D-27", to: "D-58", label: R`$[A,H]=0$` },
  { from: "D-68", to: "D-69", label: "两能级 / Fourier" },
];
export const EQMAP_SUP = [
  { from: "E-4", to: "E-7", label: "内积线性" },
  { from: "E-7", to: "E-9", label: "和的模方" },
  { from: "E-5", to: "E-9", label: "缺干涉项" },
  { from: "E-15", to: "E-19", label: R`插入 $\sum_b\ket{w_b}\bra{w_b}$` },
  { from: "E-19", to: "E-21", label: "和的模方" },
  { from: "E-18", to: "E-21", label: "缺交叉项" },
  { from: "E-24", to: "E-25", label: "B-7 用于 $P_\\Delta$" },
];
export const EQMAP_LABELS = {
  "B-3": "按本征基展开", "B-4": "Born 规则", "B-6": "简并展开", "B-7": "谱分解（一般）", "B-11": R`投影算符 $P_n$`, "B-12": "投影的模方", "B-14": R`$\mathcal P=\bra\psi P_n\ket\psi$`, "B-31": "约化", "B-33": "正则对易关系",
  "C-8": R`$\sum a_n\mathcal P(a_n)$`, "C-4": "平均值", "C-26": "方均根偏差", "C-28": "不确定关系", "C-44": "次序无关",
  "E-27": R`$\mathcal P(\text{yes})$`, "E-29": "yes 之后的态", "E-39": "连续谱的约化",
  "D-1": "Schrödinger 方程", "D-6": "范数守恒", "D-16": R`$\partial_t\rho$ 的表达式`, "D-17": "概率流", "D-11": "连续性方程", "D-27": "平均值的演化", "D-34": "Ehrenfest (一)", "D-35": "Ehrenfest (二)", "D-44": "经典极限",
  "D-51": "系数的相位转动", "D-54": "保守体系通解", "D-57": "定态", "D-68": "Bohr 频率展开", "D-58": "运动常量", "D-69": "时间–能量关系",
  "E-4": "叠加态", "E-5": "混合（错）", "E-7": "振幅相加", "E-9": "干涉项", "E-15": "直接测 C", "E-18": "路径概率和（错）", "E-19": "路径振幅和", "E-21": "路径干涉", "E-24": R`$P_\Delta$`, "E-25": R`$\mathcal P(\text{yes})$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "post", label: "假设本身" },
  { id: "meas", label: "测量的推论" },
  { id: "dyn", label: "演化的推论" },
  { id: "sup", label: "叠加原理" },
];

export const concepts = [
  {
    id: "state_vector", name_zh: "态 = 右矢", name_en: "State vector", icon: "➡️", section_id: "B-1", group: "post",
    plain: R`某一时刻体系的全部信息装在态空间的一个矢量 $\ket\psi$ 里。`,
    explain: R`第一假设把“态”从相空间的点换成了矢量空间里的右矢。矢量可以相加，所以两个态的线性组合仍是一个态——叠加原理就这样被写进了最底层。

成比例的右矢代表同一个物理态（§B-3-b-$\gamma$），所以严格说物理态是一条“射线”。归一化 $\braket{\psi|\psi}=1$ 只是方便，不是物理要求。`,
    analogy: "像地图上的一个箭头而不是一个点：箭头可以朝不同方向分解，各方向的分量决定了“往哪边走”的可能性；把箭头整体拉长或转一圈（整体相因子）不改变它指的方向。",
    book_example: { what: R`§B-1：第一假设；§E-1：$\mathbf e=(\mathbf e_x+\mathbf e_y)/\sqrt2$ 的光子。`, point: "态是矢量，因而可以叠加。" },
    misconception: R`“$\ket\psi$ 描述的是我们对体系的无知”——不对。§E 表明叠加态与“不知道处在哪个态”的统计混合给出不同的可观测预言。`,
  },
  {
    id: "observable", name_zh: "物理量 = 可观测量", name_en: "Observable", icon: "🔧", section_id: "B-2", group: "post",
    plain: "每个物理量对应一个厄米算符，它的本征矢能构成整个空间的基。",
    explain: R`第二假设把物理量从“态的函数”换成“作用在态上的算符”。要求是可观测量（厄米 + 本征矢完备），而不只是厄米：完备性保证任何态都能按本征矢展开，第四假设的概率之和才等于 1。

第三假设说测量结果只能是本征值；厄米性保证它们是实数；离散谱意味着量子化。`,
    analogy: "像一把只有某些刻度的尺：无论被量的东西是什么样，读数只能落在刻度上（本征值）；而被量物“偏向”哪个刻度的程度由它在各刻度方向上的分量决定。",
    book_example: { what: R`§B-2、§B-3-a；§C-2 的氢原子能级。`, point: "量子化来自本征值问题，而不是对力的修改。" },
    misconception: R`“所有物理量都是量子化的”——不对，$X$、$P_x$ 的谱是连续的（§C-1、§C-2）。`,
  },
  {
    id: "born_rule", name_zh: "谱分解原理（Born 规则）", name_en: "Spectral decomposition", icon: "🎲", section_id: "B-3-b", group: "post",
    plain: R`得到 $a_n$ 的概率 = $\ket\psi$ 投到 $a_n$ 本征子空间上的长度平方。`,
    explain: R`非简并时 $\mathcal P(a_n)=|\braket{u_n|\psi}|^2$；简并时对子空间中一组正交归一基求和，等价于 $\mathcal P(a_n)=\bra\psi P_n\ket\psi$——与子空间里选哪组基无关。连续谱时给出概率密度 $|\braket{v_\alpha|\psi}|^2$。

由它直接推出平均值 $\langle A\rangle=\bra\psi A\ket\psi$（§C-4），以及第 I 章 $|\psi(x)|^2$ 的位置概率解释（§C-1）。`,
    analogy: "把一根单位长的木棍斜放在几个互相垂直的墙角里，它在每面墙上的投影长度平方加起来正好是 1——这就是各结果的概率。",
    book_example: { what: R`式 (B-4)、(B-7)、(B-14)、(B-17)；本页的测量模拟器。`, point: "概率由投影决定，与基的选择无关。" },
    misconception: R`“$|c_n|^2$ 是体系处于 $\ket{u_n}$ 的概率”——只在“测量 $A$ 时得到 $a_n$”的意义下成立；测量之前体系并不处于某一个 $\ket{u_n}$。`,
  },
  {
    id: "global_phase", name_zh: "整体相位与相对相位", name_en: "Global vs relative phase", icon: "🌀", section_id: "B-3-b", group: "post",
    plain: "整体乘一个相因子什么都不变；分量之间的相对相位却是物理的。",
    explain: R`$\ket\psi$ 与 $e^{i\theta}\ket\psi$ 对任何测量给出相同的概率（式 B-23），所以是同一物理态。但 $\lambda_1e^{i\theta_1}\ket{\psi_1}+\lambda_2e^{i\theta_2}\ket{\psi_2}$ 一般是另一个态。

同一思想在 §D-2 重现：定态只获得整体相因子，所以“不动”；而能量不同的分量获得不同的相因子，改变了相对相位，体系才真正演化。`,
    analogy: "一支乐队整体推迟一秒开始演奏，听众毫无察觉；但如果只让小号手推迟一秒，和声立刻就变了。",
    book_example: { what: R`式 (B-21)–(B-27)；$\mathbf e_1,\dots,\mathbf e_4$（E-11)–(E-14)：只差相对相位，却分别是两种线偏振和两种圆偏振。`, point: "物理信息在相对相位里。" },
    misconception: R`“相位不可观测，所以可以随便取”——只有整体相位如此。`,
  },
  {
    id: "reduction", name_zh: "波包约化", name_en: "Reduction of the wave packet", icon: "✂️", section_id: "B-3-c", group: "post",
    plain: "测得 $a_n$ 后，态变成原来的态在该本征子空间上的投影（再归一）。",
    explain: R`$\ket\psi\to P_n\ket\psi/\sqrt{\bra\psi P_n\ket\psi}$。它解释了“立即重测得到同一结果”；简并时测量后的态保留各简并分量原有的相对系数，所以依赖于测量前的态。

这一变化突变、不可预言、非线性，与 Schrödinger 演化截然不同。连续谱或分辨率有限时，投影算符换成 $P_\Delta$：波函数被“截断”（§E-2-d）。`,
    analogy: "像拿筛子筛一盘混合的豆子：筛出来的只有某一类豆子，但它们原来的相对比例原样保留——筛子不会把它们重新排列。",
    book_example: { what: R`式 (B-28)–(B-32)、图 1；(E-36)–(E-37) 狭缝对波包的截断。`, point: "测量提供信息，也改变态。" },
    misconception: R`“测得简并本征值后态可以是子空间中任意一个矢量”——不对，它是 $\ket\psi$ 的那一部分（§B-3-c、§C-6-b）。`,
  },
  {
    id: "quantization", name_zh: "量子化规则", name_en: "Quantization rules", icon: "🔁", section_id: "B-5", group: "post",
    plain: R`把经典表达式中的 $\mathbf r,\mathbf p$ 换成 $\mathbf R,\mathbf P$，必要时对称化。`,
    explain: R`$[R_i,P_j]=i\hbar\delta_{ij}$ 使 $\mathbf R\cdot\mathbf P\neq\mathbf P\cdot\mathbf R$，且二者都不厄米；取 $\frac12(\mathbf R\cdot\mathbf P+\mathbf P\cdot\mathbf R)$ 才是可观测量。规则只在直角坐标中有这样简单的形式。

在电磁场中，变成 $\mathbf P$ 的是正则动量 $\mathbf p=m\mathbf v+q\mathbf A$，不是机械动量 $m\mathbf v$；哈密顿量为 $\frac1{2m}(\mathbf P-q\mathbf A)^2+qU$。自旋这类没有经典对应的量则直接由可观测量定义。`,
    analogy: "像把一份菜谱从“随便哪个顺序加料都行”翻译成“必须写明顺序”的工艺规程：经典里乘法可交换，翻译到算符时必须决定次序，对称化就是“各取一半”的公平写法。",
    book_example: { what: R`式 (B-33)–(B-39)；(B-42)、(B-46)。`, point: "量子化不是唯一机械的：需要对称化。" },
    misconception: R`“$\mathbf P$ 就是 $m\mathbf v$ 的算符”——有矢势时不是（式 B-45、B-49）。`,
  },
  {
    id: "schrodinger", name_zh: "Schrödinger 演化", name_en: "Schrödinger evolution", icon: "🌊", section_id: "B-4", group: "dyn",
    plain: "两次测量之间，态按一个一阶、线性、确定的方程演化。",
    explain: R`$i\hbar\frac{\dd}{\dd t}\ket{\psi}=H\ket\psi$（第六假设）。一阶 ⇒ 确定性；线性齐次 ⇒ 叠加原理与演化算符 $U(t,t_0)$；$H$ 厄米 ⇒ 范数守恒，概率解释始终自洽。

量子力学中的随机性**只**来自测量（第五假设），演化本身没有任何不确定性。`,
    analogy: "像一部自动播放的动画：只要第一帧给定，后面每一帧都确定；只有当观众“按下暂停并截图”（测量）时，才会随机地停在某一画面上。",
    book_example: { what: R`§D-1-a、§D-1-b、式 (D-6)。`, point: "演化是确定的，测量才是概率性的。" },
    misconception: R`“量子力学里一切都是随机的”——态的演化完全确定。`,
  },
  {
    id: "mean_rms", name_zh: "平均值与方均根偏差", name_en: "Mean value & r.m.s. deviation", icon: "📊", section_id: "C-4", group: "meas",
    plain: R`$\langle A\rangle=\bra\psi A\ket\psi$；$\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}$。`,
    explain: R`平均值是对大量处于同一态的体系各测一次的结果平均（系综平均），不是时间平均。它不必先解本征值问题就能算出。

$\Delta A$ 量化结果的散布；$\Delta A=0$ 当且仅当 $\ket\psi$ 是 $A$ 的本征态。对 $\mathbf R$、$\mathbf P$ 用这一精确定义，得到 $\Delta X\cdot\Delta P_x\geq\hbar/2$。`,
    analogy: "考试成绩的平均分和标准差：平均分说明大致水平，标准差说明分数有多分散；只有全班同分时标准差才是零。",
    book_example: { what: R`式 (C-4)、(C-23)、(C-26)、(C-28)；图 2。`, point: "平均值不等于最可能值（分布不对称时）。" },
    misconception: R`“$\langle A\rangle$ 是单次测量最可能得到的值”——它甚至可能不是任何本征值。`,
  },
  {
    id: "compatibility", name_zh: "相容性与 ECOC", name_en: "Compatibility", icon: "🤝", section_id: "C-6", group: "meas",
    plain: "对易的可观测量可以同时测量，测量次序无关、信息不丢失。",
    explain: R`$[A,B]=0$ 时存在共同本征基，$\mathcal P(a_n,b_p)=\mathcal P(b_p,a_n)$，测量后的态也相同；测 $B$ 只增加信息。不对易时次序有关，后一次测量会抹掉前一次的信息。

要让测量结果唯一确定测量后的态，必须测量一个对易可观测量完全集（ECOC）——这正是制备一个确定量子态的方法。`,
    analogy: "量一个盒子的长和宽：先量哪个都一样，互不干扰。不对易的量则像用会让物体变形的卡尺去量——每量一次都会改变上一次的结果。",
    book_example: { what: R`式 (C-36)、(C-44)、(C-49)；图 3。`, point: "对易 ⇔ 相容 ⇔ 可同时确定。" },
    misconception: R`“不对易的量在任何态中都不能同时确定”——个别共同本征态可能存在，只是不够构成基。`,
  },
  {
    id: "current", name_zh: "概率流与局域守恒", name_en: "Probability current", icon: "💧", section_id: "D-1-c", group: "dyn",
    plain: R`概率像流体一样流动：$\partial_t\rho+\nabla\cdot\mathbf J=0$。`,
    explain: R`$H$ 厄米保证总概率守恒；对单个粒子还可以更进一步：定义 $\mathbf J=\frac\hbar{2mi}(\psi^*\nabla\psi-\psi\nabla\psi^*)$，它满足连续性方程——概率不会在一处消失、在另一处凭空出现，只能“流”过去。

$\mathbf J$ 是对称化的“密度乘速度”算符的平均值；平面波的 $\mathbf J=\rho\,\hbar\mathbf k/m$。有矢势时 $\frac\hbar i\nabla\to\frac\hbar i\nabla-q\mathbf A$。`,
    analogy: "像城市里的人口：总人口不变，但任何一个街区人口的变化都必须等于穿过街区边界流入流出的人数。",
    book_example: { what: R`式 (D-11)–(D-23)；本页的波包撞势垒交互图。`, point: "概率局域守恒。" },
    misconception: R`“$\rho$ 总量守恒，所以每一点都不变”——不对，局域分布可以随时间变化。`,
  },
  {
    id: "ehrenfest", name_zh: "Ehrenfest 定理与经典极限", name_en: "Ehrenfest theorem", icon: "🎯", section_id: "D-1-d", group: "dyn",
    plain: R`波包中心满足 $m\frac{d^2}{dt^2}\langle\mathbf R\rangle=-\langle\nabla V\rangle$，近似是牛顿方程。`,
    explain: R`由一般公式 $\frac{d}{dt}\langle A\rangle=\frac1{i\hbar}\langle[A,H]\rangle+\langle\partial_tA\rangle$ 得到 $\frac{d}{dt}\langle\mathbf R\rangle=\langle\mathbf P\rangle/m$ 与 $\frac{d}{dt}\langle\mathbf P\rangle=-\langle\nabla V(\mathbf R)\rangle$。

右边是力在整个波包上的平均，一般不等于中心处的力；差别 $\propto V'''(\Delta X)^2$。对至多二次的势严格相等；波包足够窄时近似相等——这就是经典力学的来源。`,
    analogy: "一群鸟的“重心”的运动：如果风场在鸟群范围内处处相同，重心就像一只鸟那样飞；如果风场在鸟群尺度上变化剧烈，重心就会偏离单只鸟的轨迹。",
    book_example: { what: R`式 (D-34)–(D-44)；本页的非谐振子交互图。`, point: "经典力学是窄波包的极限。" },
    misconception: R`“Ehrenfest 定理说明 $\langle\mathbf R\rangle$ 总是沿经典轨道运动”——只有 $\langle\nabla V\rangle=\nabla V(\langle\mathbf R\rangle)$ 时才如此。`,
  },
  {
    id: "stationary", name_zh: "定态与运动常量", name_en: "Stationary states & constants of motion", icon: "⏸️", section_id: "D-2", group: "dyn",
    plain: R`$H$ 的本征态只获得整体相因子，物理上不变；与 $H$ 对易的量守恒。`,
    explain: R`保守体系的通解：按 $H$ 本征态展开，每个分量乘 $e^{-iE_n(t-t_0)/\hbar}$。只含一个能量的态（定态）只差整体相因子，一切物理性质不随时间变化；测得能量 $E_k$ 后再测必得 $E_k$——这就是能量守恒的量子形式。

运动常量 $A$（$\partial_tA=0$，$[A,H]=0$）：任何态中 $\langle A\rangle$ 与各 $\mathcal P(a_p)$ 都不随时间变化；其本征值称为好量子数。`,
    analogy: "旋转木马上的每匹马以不同的速度转圈（不同的 $E_n$）：如果只有一匹马，整体转动看不出任何变化；有几匹以不同速度转的马，它们之间的相对位置就会不断改变。",
    book_example: { what: R`式 (D-54)、(D-57)、(D-58)–(D-65)。`, point: "能量完全确定 ⇔ 不演化。" },
    misconception: R`“定态中粒子静止不动”——静止的是所有可观测量的概率分布，不是“粒子”。`,
  },
  {
    id: "bohr", name_zh: "Bohr 频率、选择定则与时间–能量关系", name_en: "Bohr frequencies", icon: "🎵", section_id: "D-2-d", group: "dyn",
    plain: R`平均值以能级差决定的频率 $|E_{n'}-E_n|/h$ 振荡；能量越不确定，变化越快。`,
    explain: R`$\langle B\rangle(t)=\sum c^*_{n'}c_nB_{n'n}e^{i(E_{n'}-E_n)t/\hbar}$：频率只取决于体系（Bohr 频率），权重取决于矩阵元 $B_{n'n}$ 和初态。矩阵元为零的频率永远不出现——选择定则。

两个能级的叠加以 $\nu_{21}$ 振荡，演化时间 $\Delta t\simeq h/|E_2-E_1|\simeq h/\Delta E$；一般地 $\Delta t\cdot\Delta E\gtrsim h$。但 $t$ 只是参数，不是可观测量。`,
    analogy: "两支音叉频率略有不同，同时敲响就会听到“拍”：拍频等于频率差。能级是音叉，Bohr 频率就是拍频；频率差越大（能量越不确定），拍得越快。",
    book_example: { what: R`式 (D-68)、(D-69)–(D-81)；本页的三能级交互图。`, point: "光谱频率 = 能级差 / h。" },
    misconception: R`“$\Delta t$ 是时间测量的不确定度”——不对，它是体系显著演化所需的时间。`,
  },
  {
    id: "amplitude", name_zh: "振幅相加 vs 概率相加", name_en: "Amplitudes vs probabilities", icon: "➕", section_id: "E-1", group: "sup",
    plain: "同一末态：先加振幅再平方；正交末态：直接加概率。",
    explain: R`叠加态 $\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2}$ 不是统计混合：概率中多出 $2\mathrm{Re}\{\lambda_1\lambda_2^*\cdots\}$ 干涉项。不测量中间态时，必须对各“路径”的振幅求和；测量中间态（第五假设的扰动）会破坏干涉。

反之，当同一测量结果对应若干**正交**末态（简并、仪器分辨率有限、连续谱），要对这些末态的概率求和——但每一项本身可能仍是“和的平方”。`,
    analogy: "两股水波在同一点相遇，要把波高相加再看能量（可能相消）；而统计两个不同水池各有多少能量，直接相加即可。",
    book_example: { what: R`式 (E-5)/(E-9)、(E-18)/(E-21)、(E-25)；图 5、6、8。`, point: "和的平方 vs 平方的和。" },
    misconception: R`“偏振 45° 的光子就是一半 $x$ 偏振、一半 $y$ 偏振的光子”——用垂直检偏器一试便知不同（图 5）。`,
  },
];

export const relations = [
  { from: "state_vector", to: "born_rule", label: "投影给概率" },
  { from: "observable", to: "born_rule", label: "本征基" },
  { from: "born_rule", to: "reduction", label: "投影后归一" },
  { from: "state_vector", to: "global_phase", label: "射线" },
  { from: "quantization", to: "observable", label: "构造 A" },
  { from: "born_rule", to: "mean_rms", label: "加权平均" },
  { from: "reduction", to: "compatibility", label: "相继测量" },
  { from: "schrodinger", to: "current", label: "H 厄米" },
  { from: "schrodinger", to: "ehrenfest", label: "平均值演化" },
  { from: "schrodinger", to: "stationary", label: "H 不含 t" },
  { from: "global_phase", to: "stationary", label: "整体相因子" },
  { from: "stationary", to: "bohr", label: "多能级叠加" },
  { from: "state_vector", to: "amplitude", label: "叠加原理" },
  { from: "reduction", to: "amplitude", label: "测量破坏干涉" },
  { from: "global_phase", to: "amplitude", label: "相对相位" },
  { from: "mean_rms", to: "ehrenfest", label: R`$\Delta X$ 修正` },
];

export const TAKEAWAYS = [
  <TxI>{R`**六条假设**：态 = 右矢；物理量 = 可观测量；结果 = 本征值；$\mathcal P(a_n)=\bra\psi P_n\ket\psi$；测量后 $\ket\psi\to P_n\ket\psi/\|P_n\psi\|$；两次测量之间 $i\hbar\,\dd\ket\psi/\dd t=H\ket\psi$。外加量子化规则：$\mathbf r\to\mathbf R$，$\mathbf p\to\mathbf P$，对称化。`}</TxI>,
  <TxI>{R`**测量的统计**：$\langle A\rangle=\bra\psi A\ket\psi$，$\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}$，$\Delta X\Delta P_x\geq\hbar/2$；对易 ⇔ 相容，次序无关；ECOC 的测量唯一确定（并因此可以制备）末态。`}</TxI>,
  <TxI>{R`**演化**：确定、线性、保范；$\partial_t\rho+\nabla\cdot\mathbf J=0$；$\frac{d}{dt}\langle A\rangle=\frac1{i\hbar}\langle[A,H]\rangle+\langle\partial_tA\rangle$ ⇒ Ehrenfest 定理，窄波包回到牛顿力学。`}</TxI>,
  <TxI>{R`**保守体系**：每个能量分量乘 $e^{-iE_nt/\hbar}$；定态不变；运动常量守恒；平均值以 Bohr 频率振荡，零矩阵元给出选择定则；$\Delta t\cdot\Delta E\gtrsim h$。`}</TxI>,
  <TxI>{R`**叠加原理**：整体相位无意义、相对相位有意义；叠加不等于混合；**同一末态加振幅，正交末态加概率**；连续谱上的测量把波函数“截断”到分辨率窗口内。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`态 $\ket\psi=\frac1{\sqrt3}\ket{u_1}+\sqrt{\frac23}e^{i\pi/5}\ket{u_2}$（$\ket{u_1},\ket{u_2}$ 为 $A$ 的非简并本征矢，本征值 $a_1=1$、$a_2=-2$）。$\langle A\rangle$ 等于多少？`,
    options: [R`$-1/2$`, R`$-1$`, R`$1/3$`, R`取决于相位 $\pi/5$`],
    answer: 1, why: R`$\langle A\rangle=\sum a_n\mathcal P(a_n)=1\cdot\frac13+(-2)\cdot\frac23=-1$。$A$ 在自身本征基中对角，所以相对相位不出现在 $\langle A\rangle$ 中（但会出现在不与 $A$ 对易的量的平均值中）。`,
  },
  {
    q: R`测得一个**二重简并**本征值 $a_n$ 后，体系的态是什么？`,
    options: [R`本征子空间 $\mathcal E_n$ 中随机的一个归一化矢量`, R`$\mathcal E_n$ 的某个预先选定的基矢 $\ket{u_n^1}$`, R`$P_n\ket\psi$ 归一化后的结果，保留了两个简并分量原有的相对系数`, R`仍是 $\ket\psi$，因为结果简并时测量不改变态`],
    answer: 2, why: R`第五假设：$\ket\psi\to P_n\ket\psi/\sqrt{\bra\psi P_n\ket\psi}$（式 B-31）。它是 $\ket\psi$ 落在 $\mathcal E_n$ 中的那一部分，依赖于测量前的态——这也是为什么要测 ECOC 才能唯一确定末态（§C-6-b）。`,
  },
  {
    q: R`对处于 $H$ 的两个本征态叠加 $c_1\ket{\varphi_1}+c_2\ket{\varphi_2}$ 的保守体系，下面哪个量一定不随时间变化？`,
    options: [R`任意可观测量 $B$ 的平均值`, R`$\ket{\psi(t)}$ 与 $\ket{\psi(0)}$ 的内积`, R`测量能量得到 $E_1$ 的概率`, R`$\ket{\psi(t)}$ 的相对相位 $\arg(c_2/c_1)$`],
    answer: 2, why: R`$H$ 是运动常量，$\mathcal P(E_1)=|c_1|^2$ 不变（式 D-65）。相对相位以 $(E_2-E_1)t/\hbar$ 转动，因而不与 $H$ 对易的 $B$ 的平均值以 Bohr 频率振荡（式 D-73）。`,
  },
  {
    q: R`Ehrenfest 定理 $\frac{d}{dt}\langle P\rangle=-\langle V'(X)\rangle$ 在下列哪种势中**不能**保证 $\langle X\rangle(t)$ 严格沿经典轨道运动？`,
    options: [R`$V=0$`, R`$V=Fx$`, R`$V=\frac12m\omega^2x^2$`, R`$V=\lambda x^4$`],
    answer: 3, why: R`$\langle V'(X)\rangle=V'(\langle X\rangle)$ 只对至多二次的势严格成立（$n=0,1,2$，§D-1-d-$\gamma$）。对 $x^4$，$\langle X^3\rangle\neq\langle X\rangle^3$，偏差 $\propto V'''(\Delta X)^2$。`,
  },
  {
    q: R`光子处于 $\mathbf e=(\mathbf e_x+\mathbf e_y)/\sqrt2$。另有一束光是 $\mathbf e_x$ 与 $\mathbf e_y$ 各一半的统计混合。下面哪种检偏器**能**区分两者？`,
    options: [R`透振方向沿 $\mathbf e_x$`, R`透振方向沿 $\mathbf e_y$`, R`透振方向与 $\mathbf e_x$ 成 $135^\circ$`, R`任何线偏振检偏器都不能`],
    answer: 2, why: R`沿 $\mathbf e_x$ 或 $\mathbf e_y$ 时两者透过率都是 $1/2$；沿 $135^\circ$（即 $\mathbf e'\perp\mathbf e$）时叠加态透过率为 0，混合仍为 $1/2$——差别来自 \eqref{E-9} 的干涉项（图 5 与交互图）。`,
  },
  {
    q: R`在区间 $[x_1,x_2]$ 内找到粒子的概率为什么是 $\int_{x_1}^{x_2}\dd x\int\dd y\int\dd z\,|\psi|^2$，即“平方的和”，而不是先对振幅积分再平方？`,
    options: [R`因为位置算符没有本征态`, R`因为不同的 $\ket{x,y,z}$ 是正交的末态：对应同一结果 “yes” 的不同正交末态要加概率`, R`因为波函数是实的`, R`因为测量装置不够理想`],
    answer: 1, why: R`规则是“同一末态加振幅，正交末态加概率”（§E-2-c）。“yes” 对应一整个子空间 $\mathcal E_\Delta$；把 \eqref{B-7} 用于 $P_\Delta$ 的本征值 $+1$，就得到对正交基 $\ket{x,y,z}$ 的模方求和（积分）\eqref{E-30}。`,
  },
];

export const BRIDGE = R`本章陈述了量子力学的全部基本假设，并从中推出了平均值、不确定关系、相容性、概率流、Ehrenfest 定理、定态与 Bohr 频率，以及“加振幅还是加概率”的规则。紧随其后的补充材料会把这些工具用于具体问题：一维势阱与势垒中的粒子、不确定关系的严格证明（C$_{\rm III}$）、演化算符（F$_{\rm III}$）、密度算符（它才是“统计混合”的正确描述）等。第 IV 章则选取最简单、却完全没有经典对应的体系——自旋 1/2 与两能级体系——把每一条假设都在 Stern–Gerlach 实验中具体演示一遍：态的制备、相继测量、Larmor 进动中的 Bohr 频率，都将在二维态空间里一目了然。`;
