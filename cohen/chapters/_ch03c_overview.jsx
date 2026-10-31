// 第 III 章补充材料（上）的高层理解层：开场、阅读指南、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "同一束光，两种“不知道”";
export const HOOK = R`拿一个偏振片去测一束光。如果它是 $45^\circ$ 线偏振光，你会得到一半光子通过、一半被挡；如果它是太阳光（自然光），你也会得到一半对一半。只凭这一个实验，两者无从区分。可是把偏振片转到 $45^\circ$，前者**全部**通过，后者**仍然**一半对一半。

前一种"一半对一半"来自量子叠加，后一种来自我们对光子偏振的**无知**。第 III 章的六条假设只会处理前一种；本页的补充材料要把后一种也装进量子力学（密度算符），并沿途回答一串由假设直接引出的问题：处在能级上的粒子动量是多少？叠加态怎样"晃动"？测量位置会把多少能量塞给粒子？只测复合体系的一半意味着什么？态与算符，到底哪个在随时间变？势不唯一，物理会不会也不唯一？`;

// ---------- 阅读指南（用自己的话重写原书的 Reader's guide） ----------
export const GUIDE = [
  { c: "AIII", t: "A", title: "无限深势阱中的粒子", role: R`在一个可以算到底的模型上演练测量与演化假设：定态的动量分布、两态叠加的振荡、位置测量的扰动`, pre: R`第 III 章 §B–§D；$\mathrm H_{\rm I}$ §2-c`, level: "★ 入门", advice: R`第一遍就读。三个小节相互独立，各配一个交互图。` },
  { c: "BIII", t: "B", title: "几种特殊情形下的概率流", role: R`行波与倏逝波的流各有什么结构；用流重新理解反射、透射与全反射`, pre: R`第 III 章 §D-1（概率流）；$\mathrm H_{\rm I}$、$\mathrm J_{\rm I}$`, level: "★ 入门", advice: R`与 $\mathrm A_{\rm III}$ 一样是直接应用。§3 的斜入射是本节亮点。` },
  { c: "CIII", t: "C", title: "两个共轭可观测量的方均根偏差", role: R`只用 $[Q,P]=i\hbar$ 严格证明 $\Delta P\Delta Q\ge\hbar/2$，并证明取等号的只有高斯波包`, pre: R`第 III 章 §C-5`, level: "★★ 稍形式化", advice: R`证明只有半页，值得读；初读可只记结论 \eqref{CIII-10}、\eqref{CIII-11}、\eqref{CIII-22}。` },
  { c: "DIII", t: "D", title: "只涉及体系一部分的测量", role: R`复合体系中只测一部分：概率、测后态；积态 = 不关联，非积态 = 关联，子体系没有态矢`, pre: R`第 II 章 §F（张量积）；第 III 章 §B`, level: "★★ 简单但形式化", advice: R`初读可跳过；但若要读 $\mathrm E_{\rm III}$ §5-b，它是动机所在。` },
  { c: "EIII", t: "E", title: "密度算符", role: R`把"对态的无知"放进量子力学：纯态与混合、布居与相干、热平衡、部分迹`, pre: R`第 III 章全章；$\mathrm D_{\rm III}$（用于 §5-b）`, level: "★★★ 较高（进阶课程的入门）", advice: R`量子统计力学与开放体系的基本工具。可留待以后，但强烈推荐至少读 §2–§4。` },
  { c: "FIII", t: "F", title: "演化算符", role: R`把"解 Schrödinger 方程"打包成幺正算符 $U(t,t_0)$；保守体系 $U=\mathrm e^{-iH(t-t_0)/\hbar}$`, pre: R`第 III 章 §D-1、§D-2`, level: "★ 简单", advice: R`$\mathrm E$–$\mathrm H$ 中最容易的一篇；$\mathrm G_{\rm III}$ 的前提。` },
  { c: "GIII", t: "G", title: "Schrödinger 绘景与 Heisenberg 绘景", role: R`时间依赖可以放在态上，也可以放在算符上；Heisenberg 方程与经典方程同形`, pre: R`$\mathrm F_{\rm III}$；$\mathrm C_{\rm II}$（幺正变换）`, level: "★★★ 较高", advice: R`篇幅短。读完可回头看第 III 章的 Ehrenfest 定理。` },
  { c: "HIII", t: "H", title: "规范不变性", role: R`势不唯一，预言却只依赖于场：态矢乘位置相关的相因子，真物理量的算符随规范协变`, pre: R`第 III 章 §B-5（带电粒子的 Hamilton 量）；附录 III`, level: "★★★ 较高", advice: R`最长的一篇，经典与量子两半对照着读。若时间不够，读 §1 与 §3-c 的 $\gamma$（密度与流不变）即可。` },
];

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "AIII", title: "无限深势阱中的粒子", gist: R`定态动量分布是两条"单缝衍射"曲线的叠加，$\Delta P_n=n\pi\hbar/a$；$\frac1{\sqrt2}(\varphi_1+\varphi_2)$ 以 $\omega_{21}$ 振荡，$\langle X\rangle$ 振幅仅 $16a/9\pi^2$；位置测量精度 $\varepsilon$ 决定能量分布伸到 $n\sim a/\varepsilon$。`, gives: ["AIII-6", "AIII-10", "AIII-23", "AIII-32"], next: R`$\mathrm A_{\rm III}$ 看的是概率怎么分布；概率怎么"流动"，下一节用概率流来回答。` },
  { sec: "BIII", title: "几种特殊情形下的概率流", gist: R`行波：各分量各自带流、无交叉项；倏逝波：只有交叉项带流。势阶的 $R$、$T$ 就是流之比；全反射时禁区内的流平行于界面、指数衰减。`, gives: ["BIII-4", "BIII-7", "BIII-12", "BIII-26"], next: R`回到不确定关系：第 I 章的估计能否变成严格定理？` },
  { sec: "CIII", title: "共轭可观测量的方均根偏差", gist: R`$\|(Q'+i\lambda P')\psi\|^2\ge0$ 的判别式给出 $\Delta P\Delta Q\ge\hbar/2$；取等号 ⇔ 一阶微分方程 ⇔ 高斯波包。`, gives: ["CIII-10", "CIII-11", "CIII-22"], next: R`到此为止都是单个体系；体系有两部分、只测一部分时会怎样？` },
  { sec: "DIII", title: "只测体系的一部分", gist: R`用延拓的投影算符 $P_n(1)\otimes\mathbb 1(2)$ 计算；积态 ⇔ 不关联；非积态时 (1) 没有态矢；对 (1) 的完全测量产生积态。`, gives: ["DIII-7", "DIII-13", "DIII-16"], next: R`子体系没有态矢，用什么描述它？——密度算符。` },
  { sec: "EIII", title: "密度算符", gist: R`$\rho=\sum p_k\ket{\psi_k}\bra{\psi_k}$；$\langle A\rangle=\Tr\rho A$，$i\hbar\dot\rho=[H,\rho]$，$\Tr\rho^2\le1$；布居与相干；$\rho=Z^{-1}\mathrm e^{-H/kT}$；$\rho(1)=\Tr_2\rho$。`, gives: ["EIII-16", "EIII-28", "EIII-38", "EIII-49", "EIII-57"], next: R`$\rho$ 与 $\ket\psi$ 都由同一个"演化映射"推动；把它单独拿出来研究。` },
  { sec: "FIII", title: "演化算符", gist: R`$U(t,t_0)$：$i\hbar\partial_tU=HU$，组合律、幺正；$H$ 不含时则 $U=\mathrm e^{-iH(t-t_0)/\hbar}$，含时则是时序乘积而不是 $\mathrm e^{-\frac i\hbar\int H}$。`, gives: ["FIII-4", "FIII-9", "FIII-17", "FIII-18"], next: R`既然 $U$ 幺正，就可以把它从态上挪到算符上。` },
  { sec: "GIII", title: "两种绘景", gist: R`$\ket{\psi_H}=\ket{\psi_S(t_0)}$，$A_H=U^\dagger A_SU$；$i\hbar\dot A_H=[A_H,H_H]+i\hbar(\partial_tA_S)_H$；一维粒子得到与经典同形的方程。`, gives: ["GIII-3", "GIII-8", "GIII-12"], next: R`同样的"幺正变换不改变预言"的思想，用在电磁势的不唯一性上。` },
  { sec: "HIII", title: "规范不变性", gist: R`经典：$\mathbf p$ 随规范变，$\mathbf r$、$\boldsymbol\pi$ 不变；量子：$\psi'=\mathrm e^{iq\chi/\hbar}\psi$，$H_{\mathcal J'}=T_\chi H_{\mathcal J}T_\chi^\dagger-q\partial_t\chi$；真物理量 $\tilde G_{\mathcal J}=G_{\mathcal J'}$，概率、密度、流规范不变。`, gives: ["HIII-17", "HIII-43", "HIII-51", "HIII-59", "HIII-75"] },
];

// ---------- 推导图 ----------
export const EQMAP_1 = [
  { from: "AIII-2", to: "AIII-6", label: "Fourier 变换（截断）" },
  { from: "AIII-6", to: "AIII-11", label: R`$n\gg1$ 略去干涉` },
  { from: "AIII-2", to: "AIII-10", label: R`$\langle P^2\rangle=\hbar^2\!\int|\varphi'|^2$` },
  { from: "AIII-14", to: "AIII-18", label: R`$\mathrm e^{-iE_nt/\hbar}$` },
  { from: "AIII-18", to: "AIII-23", label: R`$\braket{\varphi_1|X|\varphi_2}$` },
  { from: "AIII-26", to: "AIII-28", label: R`$\Delta t\sim1/\omega_{21}$` },
  { from: "AIII-30", to: "AIII-32", label: "归一化的窗口态" },
  { from: "BIII-1", to: "BIII-4", label: "行波" },
  { from: "BIII-1", to: "BIII-7", label: "倏逝波" },
  { from: "BIII-4", to: "BIII-12", label: R`流之比` },
  { from: "BIII-23", to: "BIII-25", label: R`代入 $\mathbf J$` },
  { from: "BIII-24", to: "BIII-26", label: R`代入 $\mathbf J$` },
  { from: "CIII-3", to: "CIII-10", label: "判别式 + 居中" },
  { from: "CIII-10", to: "CIII-14", label: "等号 ⇔ 重根" },
  { from: "CIII-14", to: "CIII-22", label: R`$\{\ket q\}$ 表象积分` },
  { from: "DIII-3", to: "DIII-7", label: R`$\braket{\psi|\tilde P_n|\psi}$` },
  { from: "DIII-9", to: "DIII-14", label: "完全测量" },
];
export const EQMAP_2 = [
  { from: "EIII-9", to: "EIII-15", label: "迹的线性" },
  { from: "EIII-9", to: "EIII-16", label: R`Schrödinger 方程` },
  { from: "EIII-15", to: "EIII-28", label: "按 $p_k$ 平均" },
  { from: "EIII-28", to: "EIII-38", label: R`$\rho^2\ne\rho$` },
  { from: "EIII-28", to: "EIII-44", label: "矩阵元" },
  { from: "EIII-16", to: "EIII-49", label: "能量本征基" },
  { from: "EIII-28", to: "EIII-56", label: "部分迹" },
  { from: "EIII-56", to: "EIII-65", label: "子体系平均值" },
  { from: "FIII-1", to: "FIII-4", label: "代入 Schr. 方程" },
  { from: "FIII-4", to: "FIII-18", label: R`$H$ 不含时` },
  { from: "FIII-9", to: "FIII-17", label: R`无穷小算符幺正` },
  { from: "FIII-17", to: "GIII-3", label: R`$U^\dagger$ 作用于算符` },
  { from: "GIII-3", to: "GIII-8", label: "求导" },
  { from: "GIII-8", to: "GIII-12", label: R`$H=P^2/2m+V$` },
  { from: "HIII-2", to: "HIII-14b", label: R`$\boldsymbol\pi$ 规范不变` },
  { from: "HIII-14b", to: "HIII-17", label: "函数恒等" },
  { from: "HIII-14b", to: "HIII-43", label: R`量子对应 $T_\chi$` },
  { from: "HIII-43", to: "HIII-51", label: R`代入 Schr. 方程` },
  { from: "HIII-17", to: "HIII-59", label: "量子化" },
  { from: "HIII-43", to: "HIII-75", label: R`相因子过 $\boldsymbol\nabla$` },
];
export const EQMAP_LABELS = {
  "AIII-2": "阱的本征函数", "AIII-6": "动量振幅", "AIII-10": R`$\Delta P_n$`, "AIII-11": "高能级双峰", "AIII-14": "两态叠加", "AIII-18": "概率密度",
  "AIII-23": "中心的运动", "AIII-26": R`$\Delta H$`, "AIII-28": "时间–能量", "AIII-30": "有限精度", "AIII-32": "能量分布",
  "BIII-1": "概率流", "BIII-4": "行波的流", "BIII-7": "倏逝波的流", "BIII-12": "透射系数", "BIII-23": "反射振幅", "BIII-24": "禁区振幅", "BIII-25": "入射区的流", "BIII-26": "禁区的流",
  "CIII-3": "模方非负", "CIII-10": "不确定关系", "CIII-14": "取等条件", "CIII-22": "最小波包",
  "DIII-3": "延拓投影", "DIII-7": "局部概率", "DIII-9": "测后态", "DIII-14": "(2) 的态",
  "EIII-9": R`纯态 $\rho$`, "EIII-15": "平均值", "EIII-16": "von Neumann", "EIII-28": R`混合 $\rho$`, "EIII-38": "纯度", "EIII-44": "相干", "EIII-49": "布居与相干的演化", "EIII-56": "部分迹", "EIII-65": "约化预言",
  "FIII-1": "定义", "FIII-4": "运动方程", "FIII-9": "组合律", "FIII-17": "幺正", "FIII-18": "保守体系",
  "GIII-3": "Heisenberg 算符", "GIII-8": "Heisenberg 方程", "GIII-12": "算符 Hamilton 方程",
  "HIII-2": "规范变换", "HIII-14b": R`$\mathbf p$ 随规范变`, "HIII-17": "真物理量判据", "HIII-43": R`幺正算符 $T_\chi$`, "HIII-51": R`$H$ 的变换`, "HIII-59": "协变", "HIII-75": "流不变",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "app", label: "假设的应用" },
  { id: "state", label: "态的描述" },
  { id: "dyn", label: "演化与对称性" },
];

export const concepts = [
  {
    id: "mom_dist", name_zh: "截断平面波的动量分布", name_en: "Momentum distribution of a truncated wave", icon: "📐", section_id: "AIII", group: "app",
    plain: R`阱中定态是两列反向平面波被截断在宽 $a$ 的窗口里，动量分布是两条宽 $4\pi\hbar/a$ 的衍射峰。`,
    explain: R`$\varphi_n$ 的 Fourier 变换是 $F(p\mp n\pi\hbar/a)$ 两项之和或差，$F(p)=\sin(pa/2\hbar)/(pa/2\hbar)$。峰宽只取决于窗口宽度，峰位随 $n$ 线性增加。

低能级两峰重叠，动量很不确定；高能级两峰分离，测量几乎必得 $\pm p_{cl}$，这时 $\Delta P_n=n\pi\hbar/a$ 衡量的是两峰的间距而不是峰宽。`,
    analogy: "光通过一条宽为 a 的单缝，角分布被抹开的程度只取决于缝宽；阱壁就是动量空间里的“单缝”。",
    book_example: { what: R`$\mathrm A_{\rm III}$ 式 (6)、(10)、(11)，及其图 1–3（本页以交互图代替）。`, point: "定态的动量不是单值，但高能级时趋于经典的两个值。" },
    misconception: R`$\Delta P_n$ 随 $n$ 增大并不意味着高能级"动量更模糊"：$|p|$ 越来越确定，只是符号各占一半。`,
  },
  {
    id: "bohr_beat", name_zh: "Bohr 频率的拍", name_en: "Beating at the Bohr frequency", icon: "🎵", section_id: "AIII", group: "app",
    plain: R`两个能级的叠加中，只有干涉项随时间变化，频率是 $(E_2-E_1)/h$。`,
    explain: R`每个分量只转自己的相位，物理上只有相对相位 $\mathrm e^{-i\omega_{21}t}$ 有意义；概率密度、$\langle X\rangle$ 等都以 $\omega_{21}$ 振荡。

在无限深阱中，波包中心 $\langle X\rangle$ 的振幅只有 $16a/9\pi^2\approx0.18a$——波包整体宽度与阱相当，墙的作用总是先碰到它的边缘。由于 $E_n\propto n^2$，任何波包都在 $T_{\rm rev}=4ma^2/\pi\hbar$ 时精确复现。`,
    analogy: "两个音高稍有不同的音叉一起响，你听到的是以频率差起伏的“拍”，而不是两个音各自的频率。",
    book_example: { what: R`$\mathrm A_{\rm III}$ 式 (14)–(23) 与图 4–6（本页交互图）；密度矩阵语言见 $\mathrm E_{\rm III}$ 式 (49)。`, point: "演化只在能量的差里显现。" },
    misconception: "波包中心并不按经典粒子那样碰墙反弹：势在波包尺度上变化剧烈时，Ehrenfest 定理给不出经典轨道。",
  },
  {
    id: "meas_kick", name_zh: "测量的反作用", name_en: "Back-action of a position measurement", icon: "📍", section_id: "AIII", group: "app",
    plain: R`位置测得越准（精度 $\varepsilon$），测量后粒子的能量分布伸得越远（到 $n\sim a/\varepsilon$）。`,
    explain: R`把测量后的态取成 $\delta$ 函数是错误的：它无法归一化，会给出"所有奇数能级概率相等"的荒谬结论。正确做法是用宽 $\varepsilon$ 的归一化窗口函数，得到 $\mathcal P(E_n)\propto\sin^2(n\pi\varepsilon/2a)/n^2$。

物理上这就是不确定关系：位置弥散 $\varepsilon$ 意味着动量弥散 $\hbar/\varepsilon$，测量把 $\sim\hbar^2/m\varepsilon^2$ 量级的能量注入了粒子。`,
    analogy: "要用手指精确按住一颗弹珠的位置，就难免把它弹出去；按得越准，弹得越狠。",
    book_example: { what: R`$\mathrm A_{\rm III}$ §3，式 (29)–(32) 与图 7（本页交互图）。`, point: "测量后的态由仪器精度决定，不能随手取理想极限。" },
    misconception: R`"测得 $x=a/2$ 后态就是 $\delta(x-a/2)$"——连续谱测量永远只有有限精度，这一细节恰恰决定答案。`,
  },
  {
    id: "current", name_zh: "概率流的结构", name_en: "Structure of the probability current", icon: "🌊", section_id: "BIII", group: "app",
    plain: R`行波各自带流、彼此无交叉项；倏逝波单独不带流，只有增长支与衰减支的交叉项带流。`,
    explain: R`$\mathbf J=\frac\hbar m\mathrm{Im}(\psi^*\boldsymbol\nabla\psi)$。行波区 $J=\frac{\hbar k}m(|A|^2-|A'|^2)$，密度有条纹而流是常数；倏逝区 $J\propto\mathrm{Im}(B^*B')$，这正是隧穿的机制。

势阶全反射时禁区里有概率但净流为零（进出两股相等）；斜入射时禁区中出现平行于界面、按 $\mathrm e^{-2\rho_xx}$ 衰减的流，对应反射波包的侧向位移。`,
    analogy: "河道里的水：入射与反射像相向而行的两股水流，在拐角处叠加；斜着冲向堤坝的水，会有一层贴着堤坝流走。",
    book_example: { what: R`$\mathrm B_{\rm III}$ 式 (4)、(7)、(12)、(25)、(26)。`, point: "反射、透射系数本质上是流之比，$T$ 中的 $k_2/k_1$ 是速度比。" },
    misconception: "全反射时粒子并非完全不进入禁区；被抵消的只是垂直于界面的净流。",
  },
  {
    id: "robertson", name_zh: "严格的不确定关系与最小波包", name_en: "Robertson inequality & minimum packet", icon: "⚖️", section_id: "CIII", group: "state",
    plain: R`$\Delta P\Delta Q\ge\hbar/2$ 只需对易关系和"模方非负"；取等号的唯一可能是高斯波包。`,
    explain: R`$\|(Q'+i\lambda P')\psi\|^2=\lambda^2(\Delta P)^2-\lambda\hbar+(\Delta Q)^2\ge0$ 对一切实 $\lambda$ 成立，判别式非正即得不等式。一般地 $\Delta A\Delta B\ge\frac12|\langle[A,B]\rangle|$，下界依赖于态。

取等号时抛物线碰到零，$(Q'+i\lambda_0P')\ket\psi=0$；在 $q$ 表象中这是一阶线性微分方程，解为高斯函数（带平均动量的相因子）。`,
    analogy: "一个开口向上、处处不低于地面的抛物线，最多只能“擦到”地面一次——擦到的那一刻就是最小不确定态。",
    book_example: { what: R`$\mathrm C_{\rm III}$ 式 (3)、(10)、(11)、(14)、(22)。`, point: "不确定关系是对易关系的直接代数后果，与表象无关。" },
    misconception: "不确定关系不描述“测一个量扰动另一个量”，而是同一制备下两个量统计弥散的下限。",
  },
  {
    id: "correlation", name_zh: "积态与关联", name_en: "Product states & correlations", icon: "🔗", section_id: "DIII", group: "state",
    plain: R`积态 $\ket{\varphi(1)}\ket{\chi(2)}$ 意味着两部分互不关联；非积态意味着关联，此时单个子体系没有态矢。`,
    explain: R`只测 (1) 时用 $\tilde P_n(1)=P_n(1)\otimes\mathbb 1(2)$ 计算概率与测后态；结果与 $\mathscr E(2)$ 中基的选取无关。积态下关于 (1) 的预言只依赖 $\ket{\varphi(1)}$。

相互作用一般把积态变为非积态，产生关联。对 (1) 的完全测量会把整体变回积态，但 (2) 的态依赖于测量结果——这是 EPR 讨论的起点。`,
    analogy: "两枚各自抛出的硬币是“积态”；一副手套被拆开分装两盒，打开一盒就知道另一盒是左手还是右手，这是“关联”（量子关联比这更强）。",
    book_example: { what: R`$\mathrm D_{\rm III}$ 式 (7)、(13)、(14)、(16)。`, point: "子体系的描述需要比态矢更一般的工具。" },
    misconception: "关联并不允许超光速通信：只看 (2) 的统计，与对 (1) 做了什么无关。",
  },
  {
    id: "mixture", name_zh: "统计混合 vs. 叠加", name_en: "Statistical mixture vs. superposition", icon: "🎲", section_id: "EIII", group: "state",
    plain: R`混合是"以概率 $p_k$ 处于 $\ket{\psi_k}$"，没有干涉项；叠加 $\sum c_k\ket{\psi_k}$ 有干涉项。`,
    explain: R`混合中概率出现两次：一次来自我们对初态的无知（经典也有），一次来自量子测量。两者不能合并成一个"平均态矢"。

$\frac1{\sqrt2}(\ket++\ket-)$ 与 50/50 混合在 $\ket\pm$ 基中统计相同，但在 $\frac1{\sqrt2}(\ket+\pm\ket-)$ 基中截然不同：前者必得第一个结果。`,
    analogy: "一枚“正反面各一半”的硬币是你不知道结果；一个 45° 偏振的光子不是“不知道是水平还是竖直”，而是确定地处在另一个方向上。",
    book_example: { what: R`$\mathrm E_{\rm III}$ §2 的说明 (ii)、(iii)，式 (1)、(2)。`, point: "混合要用平均算符，而不是平均右矢来描述。" },
    misconception: R`"叠加态就是体系以概率 $|c_k|^2$ 处于 $\ket{\psi_k}$"——只在测量以 $\ket{\psi_k}$ 为本征矢的量时才对。`,
  },
  {
    id: "density_op", name_zh: "密度算符", name_en: "Density operator", icon: "🧮", section_id: "EIII", group: "state",
    plain: R`$\rho=\sum_kp_k\ket{\psi_k}\bra{\psi_k}$：厄米、正、迹为 1；一切预言都是 $\rho$ 的线性函数。`,
    explain: R`纯态 $\rho=\ket\psi\bra\psi$ 消去了整体相位的冗余；$\langle A\rangle=\Tr\rho A$、$\mathcal P(a_n)=\Tr P_n\rho$、$i\hbar\dot\rho=[H,\rho]$ 对 $\rho$ 线性，因此对混合原样成立。

纯态 ⇔ $\rho^2=\rho$ ⇔ $\Tr\rho^2=1$；混合时 $\Tr\rho^2<1$。同一个 $\rho$ 可由许多不同的混合得到（多重制备），它们在任何测量中都不可区分。热平衡 $\rho=Z^{-1}\mathrm e^{-H/kT}$。`,
    analogy: "记账时只关心各项“加权平均”的报表（密度算符），而不在乎原始流水（具体是哪些态、多少概率）——不同流水可以给出同一张报表。",
    book_example: { what: R`$\mathrm E_{\rm III}$ 式 (9)、(15)、(16)、(28)、(38)、(51)。`, point: "密度算符是量子统计力学的基本对象。" },
    misconception: R`$\Tr\rho^2<1$ 不一定来自"我们不知道"：整体纯态的子体系也是混合（见部分迹）。`,
  },
  {
    id: "coherence", name_zh: "布居与相干", name_en: "Populations and coherences", icon: "🌈", section_id: "EIII", group: "state",
    plain: R`对角元 $\rho_{nn}$ 是找到 $\ket{u_n}$ 的平均概率；非对角元 $\rho_{np}$ 衡量 $\ket{u_n}$、$\ket{u_p}$ 之间残存的干涉能力。`,
    explain: R`$\rho_{nn}=\sum p_k|c_n^{(k)}|^2\ge0$，$\rho_{np}=\sum p_kc_n^{(k)}c_p^{(k)*}$ 是复数之和，可以相消为零。$|\rho_{np}|^2\le\rho_{nn}\rho_{pp}$。

能量本征基中，布居不随时间变化，相干以 Bohr 频率转动；热平衡没有相干。区分依赖于基：总有使 $\rho$ 对角化的基。`,
    analogy: "合唱团：布居是每个声部有多少人，相干是他们是否“对齐节拍”——人数相同，合不合拍效果天差地别。",
    book_example: { what: R`$\mathrm E_{\rm III}$ 式 (43)、(44)、(49)、(50)、(54)。`, point: "干涉效应全部藏在非对角元里。" },
    misconception: "布居与相干不是密度算符的内禀性质，而是相对于所选基而言的。",
  },
  {
    id: "partial_trace", name_zh: "部分迹与约化密度算符", name_en: "Partial trace", icon: "✂️", section_id: "EIII", group: "state",
    plain: R`$\rho(1)=\Tr_2\rho$ 给出关于子体系 (1) 的全部预言，仿佛 (1) 是孤立的。`,
    explain: R`矩阵元 $\braket{u_n|\rho(1)|u_{n'}}=\sum_p\braket{u_nv_p|\rho|u_{n'}v_p}$。对任何 $A(1)$，$\langle A(1)\otimes\mathbb 1\rangle=\Tr\rho(1)A(1)$。

整体是纯态时 $\rho(1)$ 一般是混合；$\rho(1)\otimes\rho(2)$ 一般不等于 $\rho$——关联丢失了。$\rho(1)$ 的演化一般不能写成某个只属于 (1) 的 Hamilton 量的 von Neumann 方程。`,
    analogy: "只看双人舞中一个人的动作录像：你能统计出他的一切动作习惯，却看不出他和舞伴的配合。",
    book_example: { what: R`$\mathrm E_{\rm III}$ 式 (56)–(65) 与说明 (i)–(v)。`, point: "子体系的“混合性”可以完全来自与外界的关联。" },
    misconception: R`对 $\rho(1)$ 与 $\rho(2)$ 做张量积并不能复原整体 $\rho$。`,
  },
  {
    id: "evolution_op", name_zh: "演化算符", name_en: "Evolution operator", icon: "⏩", section_id: "FIII", group: "dyn",
    plain: R`$U(t,t_0)$ 把 $t_0$ 的态映射到 $t$ 的态：幺正，满足组合律；$H$ 不含时则 $U=\mathrm e^{-iH(t-t_0)/\hbar}$。`,
    explain: R`$i\hbar\partial_tU=HU$、$U(t_0,t_0)=\mathbb 1$ 唯一确定 $U$。$U(t,t'')=U(t,t')U(t',t'')$，$U^\dagger=U^{-1}$。

$H$ 含时且不同时刻不对易时，$U$ 是按时间排序的乘积，不能写成 $\mathrm e^{-\frac i\hbar\int H\mathrm dt'}$。`,
    analogy: "录像机的“快进”：从甲时刻快进到乙时刻、再快进到丙时刻，与直接快进到丙时刻一样；倒带就是逆操作。",
    book_example: { what: R`$\mathrm F_{\rm III}$ 式 (4)、(9)、(17)、(18)、(20)。`, point: "演化可以与具体初态分开研究。" },
    misconception: R`含时 $H$ 的演化算符不是 $\int H$ 的指数——次序很重要。`,
  },
  {
    id: "pictures", name_zh: "Schrödinger 与 Heisenberg 绘景", name_en: "Schrödinger & Heisenberg pictures", icon: "🔄", section_id: "GIII", group: "dyn",
    plain: R`时间依赖可以放在态上，也可以放在算符上：$A_H(t)=U^\dagger A_SU$，$\ket{\psi_H}$ 不变，预言相同。`,
    explain: R`所有预言都是矩阵元，对态和算符做同一幺正变换不改变它们。取变换为 $U^\dagger$，态冻结、算符演化，满足 $i\hbar\dot A_H=[A_H,H_H]+i\hbar(\partial_tA_S)_H$。

运动常量在 Heisenberg 绘景中真的是常量；一维粒子的 $X_H$、$P_H$ 满足与经典 Hamilton 方程同形的算符方程。`,
    analogy: "看旋转木马：可以盯着转动的木马（态在动），也可以站在木马上看周围的景物在转（算符在动）；看到的相对运动是一样的。",
    book_example: { what: R`$\mathrm G_{\rm III}$ 式 (2)、(3)、(8)、(12)。`, point: "量子方程与经典方程的形式对应在 Heisenberg 绘景中最清楚。" },
    misconception: R`Heisenberg 方程是 $[A_H,H]$，密度算符方程是 $[H,\rho]$——符号相反，不能混用。`,
  },
  {
    id: "gauge", name_zh: "规范不变性与真物理量", name_en: "Gauge invariance & true physical quantities", icon: "🧭", section_id: "HIII", group: "dyn",
    plain: R`势不唯一；换规范时波函数乘 $\mathrm e^{iq\chi/\hbar}$，真物理量（$\mathbf r$、$\boldsymbol\pi$、动能）的预言不变，$\mathbf p$、$\mathbf L$ 则不是物理量。`,
    explain: R`经典：$\mathbf p'=\mathbf p+q\boldsymbol\nabla\chi$，真物理量的函数满足 $\mathcal G_{\mathcal J}[\mathbf r,\mathbf p]=\mathcal G_{\mathcal J'}[\mathbf r,\mathbf p+q\boldsymbol\nabla\chi]$。

量子：$\mathbf R$、$\mathbf P$ 在所有规范中相同，态矢由幺正的 $T_\chi$ 联系；$H_{\mathcal J'}=\tilde H_{\mathcal J}-q\partial_t\chi$ 保证 Schrödinger 方程形式不变；真物理量满足 $\tilde G_{\mathcal J}=G_{\mathcal J'}$，于是本征值、概率、密度与流都不变。`,
    analogy: "地图上海拔可以从海平面算，也可以从山脚算（零点任意），但两地的高度差、坡度不变；势就像“零点”，场才是“坡度”。",
    book_example: { what: R`$\mathrm H_{\rm III}$ 式 (2)、(14b)、(17)、(43)、(51)、(59)、(75)。`, point: "只依赖于场的才是物理。" },
    misconception: R`"有矢势时 $\mathbf p$ 就是 $m\mathbf v$"——错，$m\mathbf v=\mathbf p-q\mathbf A$；正则动量不是真物理量。`,
  },
];

export const relations = [
  { from: "mom_dist", to: "robertson", label: "不确定关系实例" },
  { from: "bohr_beat", to: "coherence", label: "相干的振荡" },
  { from: "meas_kick", to: "robertson", label: "不确定关系" },
  { from: "current", to: "gauge", label: "流规范不变" },
  { from: "correlation", to: "partial_trace", label: "子体系描述" },
  { from: "mixture", to: "density_op", label: "平均算符" },
  { from: "density_op", to: "coherence", label: "矩阵元" },
  { from: "density_op", to: "partial_trace", label: "约化" },
  { from: "evolution_op", to: "pictures", label: "幺正变换" },
  { from: "evolution_op", to: "density_op", label: "密度算符演化" },
  { from: "pictures", to: "gauge", label: "同一思想" },
  { from: "bohr_beat", to: "evolution_op", label: "保守体系" },
];

export const TAKEAWAYS = [
  R`**会用假设算具体问题。**动量分布 = 截断平面波的 Fourier 变换；演化 = 各能量分量转各自的相位，只有能量差可观测；测量后的态必须是可归一化的，仪器精度会进入答案（$\mathrm A_{\rm III}$）。`,
  R`**流的两条规则。**行波各自带流、交叉项不带流；倏逝波只有交叉项带流。$R$、$T$ 是流之比，$R+T=1$ 是流守恒（$\mathrm B_{\rm III}$）。`,
  R`**不确定关系是对易关系的代数推论**：$\Delta A\Delta B\ge\frac12|\langle[A,B]\rangle|$；对共轭量下界为 $\hbar/2$，只有高斯波包取到（$\mathrm C_{\rm III}$）。`,
  R`**密度算符统一了两种概率。**$\rho=\sum p_k\ket{\psi_k}\bra{\psi_k}$，一切预言对它线性；纯度 $\Tr\rho^2$ 区分纯态与混合；子体系由部分迹描述，整体纯态的子体系一般是混合（$\mathrm D_{\rm III}$、$\mathrm E_{\rm III}$）。`,
  R`**演化是幺正的，放在态上或算符上都行；势不唯一，物理唯一。**$U$ 是时序乘积；Heisenberg 方程与经典方程同形；规范变换是位置相关的相位，预言只依赖于场（$\mathrm F$–$\mathrm H_{\rm III}$）。`,
];

export const QUIZ = [
  {
    q: R`无限深阱中 $n=10$ 的定态，测量动量。下列说法哪个正确？`,
    options: [R`几乎必定得到 $0$`, R`几乎必定得到 $+10\pi\hbar/a$ 或 $-10\pi\hbar/a$，各约一半`, R`结果在 $[-10\pi\hbar/a,10\pi\hbar/a]$ 上均匀分布`, R`$\Delta P$ 很大，所以结果完全无法预料`],
    answer: 1,
    why: R`高能级时两条衍射峰远离、宽度 $4\pi\hbar/a$ 远小于间距，结果集中在 $\pm p_{cl}$。$\Delta P_n=n\pi\hbar/a$ 大只是反映两峰间距。`,
  },
  {
    q: R`在倏逝区 $\psi=B\mathrm e^{\rho x}+B'\mathrm e^{-\rho x}$ 中，概率流不为零的条件是：`,
    options: [R`$B'\ne0$`, R`$B\ne0$`, R`$B$ 与 $B'$ 都不为零，且 $\mathrm{Im}(B^*B')\ne0$`, R`永远为零`],
    answer: 2,
    why: R`由 \eqref{BIII-7}，$J_x=-\frac{2\hbar\rho}m\mathrm{Im}(B^*B')$：单支实指数不带流，只有两支的交叉项带流，并且需要两者有非平凡的相对相位。`,
  },
  {
    q: R`两个角动量分量满足 $[L_x,L_y]=i\hbar L_z$。下列哪种说法正确？`,
    options: [R`对任何态都有 $\Delta L_x\Delta L_y\ge\hbar/2$`, R`对任何态都有 $\Delta L_x\Delta L_y\ge\frac\hbar2|\langle L_z\rangle|$，在 $\langle L_z\rangle=0$ 的态中下界为零`, R`$L_x$ 与 $L_y$ 永远不能同时确定`, R`$\Delta L_x\Delta L_y$ 恒等于 $\frac\hbar2|\langle L_z\rangle|$`],
    answer: 1,
    why: R`Robertson 不等式 \eqref{CIII-11} 的下界依赖于态；角动量为零的态中 $L_x$、$L_y$ 都确定。`,
  },
  {
    q: R`一个两能级体系的密度矩阵为 $\rho=\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix}$。下列哪个说法正确？`,
    options: [R`它一定是 $\ket0$、$\ket1$ 各一半的混合`, R`它可能是 $\ket0,\ket1$ 等权混合，也可能是 $\ket{\pm x}$ 等权混合，任何测量都无法区分`, R`它是叠加态 $\frac1{\sqrt2}(\ket0+\ket1)$`, R`它的纯度为 1`],
    answer: 1,
    why: R`同一个 $\rho$ 有多重"制备"，所有预言只依赖 $\rho$；$\Tr\rho^2=1/2$，是完全混合，与有相干的叠加态不同。`,
  },
  {
    q: R`整体处于纯态 $\frac1{\sqrt2}(\ket{+}\ket{-}-\ket{-}\ket{+})$。子体系 (1) 的约化密度算符是：`,
    options: [R`$\ket+\bra+$`, R`$\frac12(\ket++\ket-)(\bra++\bra-)$`, R`$\frac12\mathbb 1$`, R`无法定义`],
    answer: 2,
    why: R`对 (2) 取部分迹，交叉项因 $\braket{-|+}=0$ 消失，得 $\frac12(\ket+\bra++\ket-\bra-)$：整体纯而局部完全混合。`,
  },
  {
    q: R`带电粒子在规范变换下，下列哪个量的平均值会改变？`,
    options: [R`$\langle\mathbf R\rangle$`, R`$\langle\mathbf P-q\mathbf A(\mathbf R;t)\rangle$`, R`$\langle\mathbf P\rangle$`, R`概率流 $\mathbf J(\mathbf r,t)$`],
    answer: 2,
    why: R`正则动量不是真物理量：$\langle\mathbf P\rangle'=\langle\mathbf P\rangle+q\langle\boldsymbol\nabla\chi\rangle$。位置、机械动量与概率流都规范不变（见交互图）。`,
  },
];

export const BRIDGE = R`本页是第 III 章补充材料的前半：前四篇把假设用到具体问题上，后四篇（$\mathrm E$–$\mathrm H$）打开了通往进阶课程的几扇门——密度算符、演化算符、绘景与规范。下半（$\mathrm J$–$\mathrm N$）将继续这条路：$\mathrm J_{\rm III}$ 用传播子把演化算符写成"Huygens 原理"的形式，$\mathrm K_{\rm III}$ 讨论不稳定能级与寿命，随后是习题，以及任意形状势阱中的束缚态与非束缚态、周期势中的能带。`;
