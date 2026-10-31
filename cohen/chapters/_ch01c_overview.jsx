// 第 I 章补充材料的高层理解层：开场、阅读指南、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "扫描隧道显微镜能“看见”单个原子——靠的是一个指数";
export const HOOK = R`1981 年，Binnig 与 Rohrer 把一根针尖移到导体表面上方几埃处，加上约 1 伏的电压，测到了纳安量级的电流。经典地看这不可能：针尖与表面之间是真空，电子能量不足以越过功函数那么高的"墙"。电流之所以存在，是因为电子以**隧道效应**穿过了这层真空——而隧穿概率随间隙按 $\mathrm e^{-2\rho l}$ 指数衰减，间隙每变 1 埃，电流就变一个数量级。正是这种极端敏感，让人第一次"摸"出了单个原子的轮廓。

本页这组补充材料，就是把正文第 I 章那些"波包""不确定关系""方势"的定性图像，变成能算出这种数字的工具：电子的波长到底多长？原子为何不坍缩到核里？波包为什么会越走越胖？粒子撞墙时会被"耽搁"多久？穿墙的概率是 0.78 还是 $10^{-19}$？——每个问题都有一个明确的数。`;

// ---------- 阅读指南（用自己的话重写原书的 Reader's guide） ----------
export const GUIDE = [
  { c: "A_I", title: "物质粒子的波长有多大", role: "量级感：尘埃、热中子、电子、GeV 电子的 $\\lambda=h/p$", pre: "正文 §A–B（de Broglie 关系）", level: "★ 入门", advice: "十分钟读完，配合波长计算器建立数量级直觉。" },
  { c: "B_I", title: "不确定关系的约束有多强", role: "同一条 $\\Delta x\\Delta p\\gtrsim\\hbar$ 对尘埃无害、对 Bohr 轨道致命", pre: "正文 §C-3", level: "★ 入门", advice: "与 $\\mathrm{A}_{\\rm I}$、$\\mathrm{C}_{\\rm I}$ 是一组，建议连读。" },
  { c: "C_I", title: "用不确定关系估算氢原子", role: "零点动能 vs. Coulomb 势：原子为何稳定、$a_0$ 与 13.6 eV 从何而来", pre: "$\\mathrm{B}_{\\rm I}$", level: "★ 入门", advice: "物理思想极重要（\"局域化要付动能\"），全书反复用到。" },
  { c: "D_I", title: "可动缝板实验", role: "想用反冲测路径又保留条纹？板的不确定关系恰好抹平条纹", pre: "正文 §A-2（双缝）", level: "★ 简单，可选读", advice: "概念性强、计算轻，适合想深入理解互补性的读者。" },
  { c: "E_I", title: "二维波包", role: "三列波模型：角弥散 ⇒ 横向宽度有限，即衍射", pre: "正文 §C-2", level: "★ 简单", advice: "图像直观，拖动交互图即可掌握。" },
  { c: "F_I", title: "一维模型的三维依据", role: "三维波包的中心、群速度与 Heisenberg 关系；可分离势把三维问题化为一维", pre: "正文 §C、§D-1", level: "★★ 稍难", advice: "§2 的分离变量是 $\\mathrm{H}_{\\rm I}$ 的逻辑前提，务必读。" },
  { c: "G_I", title: "高斯波包与扩散", role: "唯一能精确算到底的波包：最小不确定度、群速度、宽度的双曲线扩散", pre: "正文 §C；附录 I（Fourier 变换）", level: "★★ 计算稍繁，概念简单", advice: "推导可先跳过折叠部分，抓住 \\eqref{GI-20} 与经典解读。" },
  { c: "H_I", title: "一维方势中的定态", role: "势阶、势垒、势阱：反射、隧穿、共振、能级量子化的定量计算", pre: "正文 §D-2；$\\mathrm{F}_{\\rm I}$ §2", level: "★★ 强烈推荐", advice: "后文大量补充材料与习题直接引用这里的结果，必读。" },
  { c: "J_I", title: "势阶上的波包", role: "用波包追踪粒子：全反射的延迟 $\\tau$、透射波包的压缩", pre: "$\\mathrm{H}_{\\rm I}$ §2-a、$\\mathrm{G}_{\\rm I}$", level: "★★ 中等，对诠释很重要", advice: "建议边读边玩交互图，看延迟与压缩。" },
  { c: "K_I", title: "习题", role: "$\\delta$ 势、双 $\\delta$ 势（化学键模型）、窄阱、半边阱、斜反射", pre: "$\\mathrm{H}_{\\rm I}$、$\\mathrm{J}_{\\rm I}$", level: "★★–★★★", advice: "习题 2–5 构成一个小专题，建议按顺序做。" },
];

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "AI", title: "物质粒子的波长有多大", gist: R`$\lambda=h/p$ 代入数字：宏观物体 $\lambda$ 小到无意义；热中子、百伏电子 $\sim1\,\mathrm{\mathring A}$；GeV 电子要用相对论，$\lambda\simeq hc/E\sim$ fermi。`, gives: ["AI-1", "AI-8", "AI-11"], next: R`波长只管"能否看到波动性"；位置–动量的同时测量另有限制。` },
  { sec: "BI", title: "不确定关系的约束有多强", gist: R`尘埃：要求 $\Delta p/p\sim10^{-8}$，无约束；Bohr 轨道：$\frac{\Delta x}{r}\frac{\Delta p}{p}\gtrsim\frac1n$，低 $n$ 时轨道图像崩溃。`, gives: ["BI-1", "BI-8"], next: R`既然电子不能有轨道，它为什么还待在原子里？` },
  { sec: "CI", title: "用不确定关系估算氢原子", gist: R`局域化动能 $\hbar^2/2mr_0^2$ 与 $-e^2/r_0$ 折中，极小给出 $a_0=\hbar^2/me^2$、$E_0=-me^4/2\hbar^2$；经典能量无下界。`, gives: ["CI-5", "CI-6", "CI-7"], next: R`不确定关系也必须用于"测量仪器"本身——这是下一个思想实验。` },
  { sec: "DI", title: "可动缝板实验", gist: R`测反冲判路径要求 $\Delta p\ll ha/\lambda d$，于是 $\Delta x\gtrsim\lambda d/a$=条纹间距，条纹消失：互补性由不确定关系保证。`, gives: ["DI-6", "DI-7"], next: R`回到波包本身：正文只讲了一维，横向会怎样？` },
  { sec: "EI", title: "二维波包", gist: R`三列方向略异的平面波：$k\Delta\theta\Delta y=2\pi$，$\Delta y\Delta k_y=4\pi$——横向不确定关系，也就是衍射。`, gives: ["EI-5", "EI-7", "EI-8"], next: R`把这类论证系统地推广到三维。` },
  { sec: "FI", title: "一维模型的三维依据", gist: R`稳相给出 $\mathbf r_M=-\nabla_{\mathbf k}\alpha$、$\Delta x_i\Delta p_i\gtrsim\hbar$、$\mathbf V_G=\hbar\mathbf k_0/m$；可分离势使 $E=E_1+E_2+E_3$，一维模型严格成立。`, gives: ["FI-11", "FI-14", "FI-17", "FI-22"], next: R`有了一维模型的合法性，来算一个能精确求解的波包。` },
  { sec: "GI", title: "高斯波包与扩散", gist: R`复 Gauss 积分 \eqref{GI-7} 让一切精确可算：$\Delta x\Delta p=\hbar/2$；中心以 $\hbar k_0/m$ 运动；$\Delta x(t)$ 按双曲线扩散，晚期即经典弥散。`, gives: ["GI-9", "GI-14", "GI-17", "GI-20"], next: R`自由波包讲完，给它加上势：先求方势的定态。` },
  { sec: "HI", title: "一维方势中的定态", gist: R`分段写 $\mathrm e^{\pm ikx}$ / $\mathrm e^{\pm\rho x}$，拼接 $\varphi,\varphi'$：势阶部分反射 / 全反射带相移；势垒共振与隧穿；势阱能级由图解超越方程得到。`, gives: ["HI-18", "HI-22", "HI-30", "HI-42", "HI-58"], next: R`定态是平面波；要问"何时反射""逗留多久"，得把它们叠成波包。` },
  { sec: "JI", title: "势阶上的波包", gist: R`全反射：延迟 $\tau=-2\,\theta'/\omega'$；部分反射：无延迟，透射波包压窄为 $q_0/k_0$，解释 $T$ 中的 $k_2/k_1$。`, gives: ["JI-9", "JI-10", "JI-24", "JI-26"], next: R`最后用习题把 $\delta$ 势与二维反射补齐。` },
  { sec: "KI", title: "习题", gist: R`$\delta$ 势阱的束缚与透射、Fourier 解法与分布导数、双 $\delta$ 势的成键/反键、窄阱极限、半边阱、斜反射的横向位移。` },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "AI-1", to: "AI-8", label: R`$p=\sqrt{2m_eqV}$` },
  { from: "AI-1", to: "AI-11", label: R`相对论 $p\simeq E/c$` },
  { from: "BI-1", to: "BI-8", label: R`除以 $rp=n\hbar$` },
  { from: "BI-1", to: "CI-5", label: R`$\Delta p\sim\hbar/r_0$` },
  { from: "CI-5", to: "CI-6", label: R`$\mathrm dE/\mathrm dr_0=0$` },
  { from: "BI-1", to: "DI-7", label: "缝板也服从" },
  { from: "EI-7", to: "FI-14", label: "连续分布、三维" },
  { from: "FI-11", to: "FI-14", label: R`$\delta\xi\gtrsim1$` },
  { from: "FI-18", to: "FI-22", label: "分离变量" },
];
export const EQMAP_B = [
  { from: "GI-7", to: "GI-9", label: "配方" },
  { from: "GI-9", to: "GI-14", label: "读出宽度" },
  { from: "GI-7", to: "GI-16a", label: R`再配方（复宽度）` },
  { from: "GI-16a", to: "GI-17", label: "取模平方" },
  { from: "GI-17", to: "GI-20", label: "读出宽度" },
  { from: "HI-8", to: "HI-18", label: R`$E>V_0$ 拼接` },
  { from: "HI-8", to: "HI-22", label: R`$E<V_0$ 拼接` },
  { from: "HI-8", to: "HI-30", label: R`三区拼接，$k_2\to-i\rho_2$` },
  { from: "HI-8", to: "HI-42", label: "两侧有界" },
  { from: "HI-42", to: "HI-58", label: R`$V_0\to\infty$` },
  { from: "HI-22", to: "JI-10", label: R`相移对 $k$ 求导` },
  { from: "HI-18", to: "JI-26", label: "波包压缩" },
];
export const EQMAP_LABELS = {
  "AI-1": "de Broglie 关系", "AI-8": "电子波长速算", "AI-11": "GeV 电子", "BI-1": "不确定关系", "BI-8": "Bohr 轨道判据",
  "CI-5": "能量折中", "CI-6": "Bohr 半径", "DI-7": "缝板位置弥散", "EI-7": "角弥散–横宽", "FI-11": "三维波包中心",
  "FI-14": "三维 Heisenberg", "FI-18": "可分离势", "FI-22": "一维模型的能量",
  "GI-7": "复 Gauss 积分", "GI-9": "t=0 高斯波包", "GI-14": "最小不确定度", "GI-16a": "t 时刻波包", "GI-17": "概率密度", "GI-20": "扩散公式",
  "HI-8": "导数连续", "HI-18": "势阶透射", "HI-22": "全反射相移", "HI-30": "隧穿", "HI-42": "量子化条件", "HI-58": "无限深阱能级",
  "JI-10": "反射延迟", "JI-26": R`$T=\frac{q_0}{k_0}|A_2|^2$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "scale", label: "量级与不确定关系" },
  { id: "packet", label: "波包" },
  { id: "square", label: "方势与定态" },
];

export const concepts = [
  {
    id: "debroglie", name_zh: "de Broglie 波长的量级", name_en: "de Broglie wavelength", icon: "📏", section_id: "AI", group: "scale",
    plain: R`$\lambda=h/p$：轻、慢的粒子波长长，只有当它与装置尺度可比时，波动性才看得见。`,
    explain: R`$h\simeq6.6\times10^{-34}\,\mathrm{J\,s}$ 极小，所以宏观物体的波长短到荒唐（尘埃 $\sim10^{-16}\,\mathrm m$）。微观粒子则不同：热中子与百伏电子的 $\lambda\sim1\,\mathrm{\mathring A}$，正好与晶格间距相当，于是出现衍射。

能量很高时必须用相对论求动量：$E=\sqrt{p^2c^2+m_0^2c^4}$，$E\gg m_0c^2$ 时 $\lambda\simeq hc/E$。GeV 电子的波长约 1 fermi，可以分辨核的结构。`,
    analogy: "用一把尺子量东西，刻度必须比被量的东西细。粒子的波长就是它\"看\"世界的刻度：刻度比晶格还粗，就看不见晶格；GeV 电子的刻度细到费米，才看得清质子。",
    book_example: { what: R`$\mathrm{A}_{\rm I}$ 的四个例子：尘埃（式 AI-2）、室温中子 1.4 Å（式 AI-5）、$12.3/\sqrt V$ Å（式 AI-8）、1 GeV 电子 1.2 fermi（式 AI-11）。`, point: "量子效应是否显著，取决于 $\\lambda$ 与问题特征长度之比。" },
    misconception: R`不能用 $\lambda=c/\nu$（$\nu=E/h$）求有质量粒子的波长；正确做法是先由能量求动量，再用 $\lambda=h/p$。`,
  },
  {
    id: "uncertainty", name_zh: "不确定关系的“分量”", name_en: "Weight of the uncertainty relation", icon: "⚖️", section_id: "BI", group: "scale",
    plain: R`$\Delta x\Delta p\gtrsim\hbar$ 处处成立，但只有当系统的作用量与 $\hbar$ 可比时才"咬人"。`,
    explain: R`对尘埃，把位置定到 $0.01\,\mu$ 只要求 $\Delta p/p\sim10^{-8}$——没有仪器能测到这么准，约束形同虚设，波包的峰就是经典粒子的位置。

对原子中的电子，经典轨道要求 $\frac{\Delta x}{r}\frac{\Delta p}{p}\ll1$，而不确定关系配合 Bohr 条件 $pr=n\hbar$ 给出 $\gtrsim1/n$：低量子数时轨道概念自相矛盾。一般判据是"作用量/$\hbar$"：比值巨大则经典，比值为 1 量级则量子。`,
    analogy: "像海平面上的波纹：对万吨巨轮毫无影响，对一片树叶却决定了它的全部运动。",
    book_example: { what: R`$\mathrm{B}_{\rm I}$：尘埃的式 (BI-3) 与 Bohr 轨道的式 (BI-8)；$\mathrm{F}_{\rm I}$ 式 (FI-14) 给出三维各分量的形式。`, point: "不确定关系是普适的，但它的影响以 $\\hbar$/作用量 来衡量。" },
    misconception: "不确定关系不是\"仪器不够好\"造成的测量误差，而是量子态本身的性质；再好的仪器也绕不过去。",
  },
  {
    id: "zero_point", name_zh: "局域化的动能代价", name_en: "Confinement (zero-point) kinetic energy", icon: "🔒", section_id: "CI", group: "scale",
    plain: R`把粒子关进尺度 $r_0$，动能至少 $\sim\hbar^2/2mr_0^2$——这让原子不会坍缩。`,
    explain: R`势能想让电子尽量靠近质子（$-e^2/r_0$ 越小越好），但不确定关系说：局域在 $r_0$ 内就有 $\Delta p\gtrsim\hbar/r_0$，动能随 $1/r_0^2$ 上升，比势能的 $1/r_0$ 更快。两者折中，极小值在 Bohr 半径 $a_0=\hbar^2/me^2\simeq0.53\,\mathrm{\mathring A}$，能量 $-13.6\,\mathrm{eV}$。

经典圆轨道的动能与势能都按 $1/r_0$ 标度，总能量 $-e^2/2r_0$ 没有下界——经典理论无法解释原子的稳定。`,
    analogy: "把一群孩子关进越来越小的房间，他们会越来越躁动；房间小到一定程度，躁动的\"能量\"就抵消了把他们挤在一起的好处。",
    book_example: { what: R`$\mathrm{C}_{\rm I}$ 的式 (CI-4)–(CI-7) 与图 1（本页交互图）；对照经典的式 (CI-11)。`, point: "原子的大小与能量是动能与势能折中的结果，这一折中只有量子力学才有。" },
    misconception: R`估算恰好给出精确的 $a_0$ 和 $-13.6\,\mathrm{eV}$ 是巧合；方法本身只保证量级。`,
  },
  {
    id: "complementarity", name_zh: "互补性与\"量子一视同仁\"", name_en: "Complementarity", icon: "☯️", section_id: "DI", group: "scale",
    plain: "想知道光子走哪条缝，就会抹掉干涉条纹——仪器本身也服从不确定关系。",
    explain: R`可动缝板通过反冲区分路径，需要 $\Delta p\ll|p_2-p_1|\simeq ha/\lambda d$；于是板的位置弥散 $\Delta x\gtrsim\lambda d/a$，恰好是条纹间距，每个光子的条纹随机平移，叠加后条纹消失。

教训：如果板可以当经典物体，就能推翻光的互补性。量子理论必须同时适用于光与物质——一切物理系统。`,
    analogy: "想拍清楚一只蜂鸟翅膀的轨迹，快门就得极短；可快门越短，进光越少、画面越暗。两种信息此消彼长，不能同时最佳。",
    book_example: { what: R`$\mathrm{D}_{\rm I}$ 的式 (DI-3)–(DI-7) 与可动缝板装置。`, point: "互补性不是额外的假设，而是不确定关系应用到整个装置上的结果。" },
    misconception: "并不是\"观测干扰了光子\"这种经典扰动；即使一切相互作用都无比轻柔，路径信息与条纹仍然不可兼得。",
  },
  {
    id: "wavepacket", name_zh: "波包、群速度与横向宽度", name_en: "Wave packets & group velocity", icon: "🌊", section_id: "FI", group: "packet",
    plain: R`平面波叠加成波包：中心以群速度 $\hbar\mathbf k_0/m$ 运动，每个方向上的尺寸都与该方向的波矢弥散成反比。`,
    explain: R`一维波包的纵向长度由 $\Delta k_x$ 决定；$\mathrm{E}_{\rm I}$ 说明横向宽度由波矢的**方向**弥散决定：$k\Delta\theta\Delta y=2\pi$。$\mathrm{F}_{\rm I}$ 把两者统一到三维：$\Delta x_i\Delta k_i\gtrsim1$。

群速度 $\mathrm d\omega/\mathrm dk$ 与能量零点无关，是有物理意义的粒子速度；相速度 $\omega/k$ 依赖零点，没有直接意义。`,
    analogy: "合唱团里每人音高略有不同，合起来的声音会出现\"拍\"——一团一团往前走的声包；声包走的速度不是单个音的速度，而是群速度。",
    book_example: { what: R`$\mathrm{E}_{\rm I}$ 的三波模型（式 EI-5、EI-7），$\mathrm{F}_{\rm I}$ 的式 (FI-11)、(FI-14)、(FI-17)；$\mathrm{A}_{\rm I}$ 评注 (ii)。`, point: "波包的形状与运动完全由 $g(\\mathbf k)$ 的宽度与相位决定。" },
    misconception: "\"粒子就是波包\"只是一种描述方式；波包会扩散、会分裂（$\\mathrm{J}_{\\rm I}$），粒子却总在某处被整个探测到。",
  },
  {
    id: "stationary_phase", name_zh: "稳相法", name_en: "Stationary phase", icon: "🎯", section_id: "FI", group: "packet",
    plain: "所有分波相位对波矢\"不变\"的地方，它们同相相加，波包最大——这就是波包中心。",
    explain: R`把每个分波的相位在峰值 $\mathbf k_0$ 附近展开：一阶项 $\delta\mathbf k\cdot[\mathbf r+\nabla_{\mathbf k}\alpha]$ 为零之处就是中心 $\mathbf r_M=-\nabla_{\mathbf k}\alpha$。离开中心，相位差随 $\delta\mathbf k\cdot\delta\mathbf r$ 增长，达到 1 弧度量级时分波相消，这给出波包的尺寸。

$\mathrm{J}_{\rm I}$ 用同一方法处理反射波：反射相移 $-2\theta(k)$ 对 $k$ 的导数直接变成中心位置的平移——反射延迟。`,
    analogy: "一大群人对着同一个点喊口号，只有在大家声音\"对齐\"的那一点最响，其他地方七嘴八舌互相抵消。",
    book_example: { what: R`$\mathrm{F}_{\rm I}$ 式 (FI-9)–(FI-11)；$\mathrm{J}_{\rm I}$ 式 (JI-6)、(JI-9)、(JI-13)。`, point: "中心位置由相位的一阶导数决定，与振幅细节无关。" },
    misconception: R`稳相法依赖相位在 $\Delta k$ 内可线性化；二阶项不可忽略时（如自由波包晚期），波包比 $\Delta x\Delta k\sim1$ 宽（$\mathrm{G}_{\rm I}$ 评注 ii）。`,
  },
  {
    id: "spreading", name_zh: "波包扩散", name_en: "Spreading of the wave packet", icon: "🫧", section_id: "GI", group: "packet",
    plain: R`自由波包的动量分布不变，但位置宽度按 $\Delta x(t)=\frac a2\sqrt{1+4\hbar^2t^2/m^2a^4}$ 增长。`,
    explain: R`动量弥散 $\Delta p=\hbar/a$ 意味着速度弥散 $\Delta v=\hbar/ma$；晚期波包宽度就是这群"速度不同的经典粒子"散开的宽度 $\hbar|t|/ma$。但在 $t=0$ 附近，量子宽度不能低于 $\hbar/2\Delta p=a/2$——双曲线而不是折线。

越窄的初始波包，动量弥散越大，扩散越快。宏观物体的 $m$ 极大，扩散慢到可以忽略。`,
    analogy: "一群起跑速度略有差别的马拉松选手，起跑时挤在一起，跑得越久拉开得越大。",
    book_example: { what: R`$\mathrm{G}_{\rm I}$ 的式 (GI-17)、(GI-20) 与两张交互图；式 (GI-21) 说明动量分布不变。`, point: "扩散来自色散 $\\omega\\propto k^2$，是自由波包的普遍性质。" },
    misconception: "扩散不意味着粒子\"变大\"或\"弥散成一片\"；它表示我们对位置的预测越来越不确定。",
  },
  {
    id: "separation", name_zh: "分离变量与一维模型", name_en: "Separation of variables", icon: "✂️", section_id: "FI", group: "square",
    plain: R`若 $V=V_1(x)+V_2(y)+V_3(z)$，三维定态是三个一维定态之积，$E=E_1+E_2+E_3$。`,
    explain: R`代入乘积解并除以 $\varphi_1\varphi_2\varphi_3$，方程变成"只含 $x$ 的项 + 只含 $y$ 的项 + 只含 $z$ 的项 $=$ 常数"，每项必须各自为常数。势只依赖 $x$ 时，$y,z$ 方向是平面波，问题严格化为一维，只是总能量多了 $\hbar^2(k_y^2+k_z^2)/2m$。

这就是正文与 $\mathrm{H}_{\rm I}$、$\mathrm{J}_{\rm I}$ 一维模型的合法性来源，也是 $\mathrm{K}_{\rm I}$ 习题 8 斜反射的解法。`,
    analogy: "一张写满数字的乘法表，可以只用一行一列两组数来\"重建\"；可分离的问题就是这样的乘法表。",
    book_example: { what: R`$\mathrm{F}_{\rm I}$ 式 (FI-18)–(FI-22)。`, point: "一维模型不是粗糙的近似，而是在势只依赖一个坐标时的严格约化。" },
    misconception: "势可分离并不意味着粒子在各方向上的运动\"无关联\"的态是唯一的态——一般态是乘积解的线性叠加。",
  },
  {
    id: "matching", name_zh: "拼接条件", name_en: "Matching conditions", icon: "🧩", section_id: "HI", group: "square",
    plain: R`势有有限跳变处，$\varphi$ 与 $\varphi'$ 都连续，只有 $\varphi''$ 跳。`,
    explain: R`把方势看成光滑势的极限，在跳变点附近积分薛定谔方程：右边的积分随区间缩小趋于零，所以 $\varphi'$ 连续。由此，方势问题就是"分段写指数/平面波，然后拼接"。

例外：势无界时（无限高壁、$\delta$ 势），$\varphi$ 仍连续但 $\varphi'$ 可以跳——无限高壁处 $\varphi=0$；$\delta$ 势处 $\varphi'$ 跳 $-\frac{2m\alpha}{\hbar^2}\varphi(0)$。`,
    analogy: "铺铁轨：两段轨道接头处不能错位（$\varphi$ 连续），也不能有折角（$\varphi'$ 连续），否则火车会出轨；只有弯曲程度（$\varphi''$）可以突变。",
    book_example: { what: R`$\mathrm{H}_{\rm I}$ 式 (HI-6)–(HI-8)；$\mathrm{K}_{\rm I}$ 习题 2 的 $\delta$ 势跃变。`, point: "定态问题的全部\"物理\"都在拼接条件里。" },
    misconception: R`并非任何情况下 $\varphi'$ 都连续：这依赖势有界。`,
  },
  {
    id: "tunnel", name_zh: "隧道效应与共振", name_en: "Tunneling & resonance", icon: "🚇", section_id: "HI", group: "square",
    plain: R`$E<V_0$ 时粒子以 $\sim\mathrm e^{-2\rho_2l}$ 的概率穿过势垒；$E>V_0$ 时势垒宽度为半波长整数倍时完全透射。`,
    explain: R`禁区中的波函数是射程 $1/\rho_2$ 的倏逝波，势垒不比射程宽多少时，另一侧仍有可观的振幅。电子穿 1 Å、高出 1 eV 的势垒概率约 0.78；质子同样条件下约 $10^{-19}$。

$E>V_0$ 时，两界面的反射波干涉：$k_2l=n\pi$ 时相消，$T=1$（共振），类似 Fabry–Perot 干涉仪。`,
    analogy: "隧穿像声音透过一堵薄墙：墙越厚声音越弱，但只要不是无限厚，总能听到一点；共振像薄膜的彩色——特定厚度下反射光恰好互相抵消。",
    book_example: { what: R`$\mathrm{H}_{\rm I}$ 式 (HI-29)–(HI-35) 与透射交互图。`, point: "隧穿概率对质量与宽度指数敏感，这解释了为什么它只在微观尺度重要。" },
    misconception: "粒子并不是\"借了能量\"翻过势垒；它的能量始终是 $E$，只是波函数在禁区里不为零。",
  },
  {
    id: "quantization", name_zh: "束缚态的能量量子化", name_en: "Energy quantization", icon: "🪜", section_id: "HI", group: "square",
    plain: "波函数在两侧都必须有界——这个要求只在离散的能量上能满足。",
    explain: R`阱外解是 $\mathrm e^{\pm\rho x}$；要求左侧无增长项，拼接到右侧后一般会出现增长项 $B_3\mathrm e^{\rho x}$。令 $B_3=0$ 就得到超越方程 \eqref{HI-42}，只对特定 $E$ 成立。图解：直线 $k/k_0$ 与 $|\cos(ka/2)|$、$|\sin(ka/2)|$ 的弧交替相交，偶、奇态交替出现；一维对称阱至少一个束缚态。

无限深阱是极限：$\varphi$ 在壁上为零，阱宽恰为半波长整数倍，$E_n=n^2\pi^2\hbar^2/2ma^2$。`,
    analogy: "吉他弦两端固定，只能振出基音与泛音；有限深阱像两端用软胶固定的弦，振动会\"渗\"进支点一点，音调略低。",
    book_example: { what: R`$\mathrm{H}_{\rm I}$ 式 (HI-42)–(HI-58) 与图解交互图。`, point: "量子化来自边界条件（有界性），不是额外假设。" },
    misconception: "有限深阱的能级不是无限深阱能级减去 $V_0$；由于反射相移，它们总略低一些。",
  },
  {
    id: "reflection_delay", name_zh: "反射延迟与透射压缩", name_en: "Reflection delay & packet compression", icon: "⏱️", section_id: "JI", group: "packet",
    plain: R`全反射的波包比经典粒子晚 $\tau=-2\theta'/\omega'$ 返回；部分反射时透射波包被压窄 $q_0/k_0$ 倍。`,
    explain: R`全反射时每个分量的反射相移 $-2\theta(k)$ 依赖 $k$，稳相法把它的导数变成中心位置的平移：粒子"在禁区里逗留"了 $\tau=2m/\hbar k_0\sqrt{K_0^2-k_0^2}$。这个延迟远小于波包撞墙的持续时间。

$E>V_0$ 时反射、透射振幅都是实数，没有延迟；透射一侧粒子变慢，包络被压缩 $q_0/k_0$ 倍、振幅放大 $A_2$ 倍，$T=\frac{q_0}{k_0}|A_2|^2$——这就是 $T$ 中速度比因子的由来。`,
    analogy: "车队从高速公路驶入限速路段，车距缩短（压缩），车流量不变（概率流守恒）。",
    book_example: { what: R`$\mathrm{J}_{\rm I}$ 式 (JI-9)、(JI-10)、(JI-24)–(JI-27) 与波包交互图。`, point: "延迟正比于相移对能量的导数，而不是相移本身。" },
    misconception: R`反射相移 $2\theta(k_0)$ 本身不给出延迟；对无界平面波谈"延迟"没有意义，必须用波包。`,
  },
];

export const relations = [
  { from: "debroglie", to: "uncertainty", label: "同源于波动性" },
  { from: "uncertainty", to: "zero_point", label: "局域化要付动能" },
  { from: "uncertainty", to: "complementarity", label: "用于仪器" },
  { from: "wavepacket", to: "uncertainty", label: R`$\Delta x\Delta k\gtrsim1$` },
  { from: "stationary_phase", to: "wavepacket", label: "定出中心" },
  { from: "wavepacket", to: "spreading", label: "色散导致" },
  { from: "separation", to: "matching", label: "化为一维" },
  { from: "matching", to: "tunnel", label: "势垒" },
  { from: "matching", to: "quantization", label: "势阱" },
  { from: "matching", to: "reflection_delay", label: "势阶相移" },
  { from: "stationary_phase", to: "reflection_delay", label: "相移的导数" },
  { from: "debroglie", to: "tunnel", label: R`射程 $1/\rho$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**量级**：$\lambda=h/p$——宏观物体波长可忽略；热中子、百伏电子 $\sim1\,\mathrm{\mathring A}$；GeV 电子须用相对论，$\lambda\simeq hc/E$。不确定关系的"分量"由作用量/$\hbar$ 决定。`}</TxI>,
  <TxI>{R`**原子为何存在**：局域化动能 $\hbar^2/2mr_0^2$ 与 $-e^2/r_0$ 折中，给出 $a_0=\hbar^2/me^2$、$E_0=-me^4/2\hbar^2$；经典能量无下界。量子理论必须同样用于仪器（缝板），互补性才自洽。`}</TxI>,
  <TxI>{R`**波包**：中心 $\mathbf r_M=-\nabla_{\mathbf k}\alpha$，群速度 $\hbar\mathbf k_0/m$，每个方向 $\Delta x_i\Delta p_i\gtrsim\hbar$；高斯波包 $t=0$ 时 $\Delta x\Delta p=\hbar/2$，此后按 $\Delta x(t)=\frac a2\sqrt{1+4\hbar^2t^2/m^2a^4}$ 扩散。`}</TxI>,
  <TxI>{R`**方势**：分段写解、拼接 $\varphi$ 与 $\varphi'$。势阶 $T=4k_1k_2/(k_1+k_2)^2$；势垒有共振（$k_2l=n\pi$）与隧穿（$T\sim\mathrm e^{-2\rho_2l}$）；势阱的能级由有界性量子化，无限深阱 $E_n=n^2\pi^2\hbar^2/2ma^2$。`}</TxI>,
  <TxI>{R`**波包撞墙**：全反射延迟 $\tau=2m/\hbar k_0\sqrt{K_0^2-k_0^2}$；部分反射无延迟，透射波包压缩 $q_0/k_0$ 倍，解释了 $T$ 中的 $k_2/k_1$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`一个动能为 $1\,\mathrm{GeV}$ 的电子，其 de Broglie 波长最接近？`,
    options: [R`$12.3/\sqrt{10^9}\,\mathrm{\mathring A}\approx3.9\times10^{-4}\,\mathrm{\mathring A}$`, R`$\approx1.2\,$fermi`, R`$c/\nu$，$\nu=E/h$ 再加上静能`, R`$\approx1.4\,\mathrm{\mathring A}$`],
    answer: 1, why: R`$1\,\mathrm{GeV}\gg m_ec^2=0.5\,\mathrm{MeV}$，须用相对论：$p\simeq E/c$，$\lambda\simeq hc/E\simeq1.2\times10^{-15}\,\mathrm m$。非相对论公式 (AI-8) 会差 30 多倍。`,
  },
  {
    q: "为什么氢原子的电子不会落到质子上？",
    options: ["电子的角动量守恒阻止它下落", R`电子局域得越紧，动能至少按 $\hbar^2/2mr_0^2$ 增加，比势能下降得更快`, "质子与电子之间存在短程斥力", "电子加速时辐射能量补充了它的动能"],
    answer: 1, why: R`不确定关系给出局域化动能 $\propto1/r_0^2$，Coulomb 势能只 $\propto-1/r_0$；总能量在 $r_0=a_0$ 有极小。经典理论中两者同按 $1/r_0$ 标度，没有极小。`,
  },
  {
    q: R`在可动缝板实验中，若能可靠地由板的反冲判断光子走了哪条缝，屏上会看到什么？`,
    options: ["清晰的干涉条纹", "条纹位置整体移动但仍清晰", "条纹消失，只剩两单缝强度之和", "屏上没有任何光"],
    answer: 2, why: R`分辨路径要求 $\Delta p\ll|p_2-p_1|$，于是板位置弥散 $\gtrsim\lambda d/a$（条纹间距），各光子的条纹随机错位，叠加后条纹被抹平。`,
  },
  {
    q: R`自由高斯波包从 $t=0$ 开始演化，下列哪个量保持不变？`,
    options: [R`位置宽度 $\Delta x$`, R`峰值高度 $|\psi|^2_{\max}$`, R`动量分布 $|g(k,t)|$`, R`乘积 $\Delta x\cdot\Delta p$`],
    answer: 2, why: R`自由演化只给每个动量分量乘相位 $\mathrm e^{-i\omega t}$，$|g(k,t)|=|g(k,0)|$；而 $\Delta x$ 增大、峰值降低、$\Delta x\Delta p$ 增大。`,
  },
  {
    q: R`能量 $E<V_0$ 的波包撞上高为 $V_0$ 的势阶。与经典粒子相比，反射波包：`,
    options: ["部分透射，部分反射", "没有任何区别", R`全部反射，但晚了一段 $\tau$，且 $E$ 越接近 $V_0$ 延迟越长`, "全部反射，并且提前返回"],
    answer: 2, why: R`全反射时 $|A_1'/A_1|=1$，但相移 $-2\theta(k)$ 随 $k$ 变；稳相给出延迟 $\tau=2m/\hbar k_0\sqrt{K_0^2-k_0^2}$，$k_0\to K_0$ 时增大。`,
  },
  {
    q: R`对称一维方势阱，深度 $V_0$ 很小（$V_0\ll\pi^2\hbar^2/2ma^2$）时，束缚态有几个？`,
    options: ["零个", "恰好一个（偶态）", "恰好一个（奇态）", "无穷多个"],
    answer: 1, why: R`图解中直线 $k/k_0$ 总会与从 1 下降的第一段偶态弧相交，所以至少有一个偶束缚态；$k_0a\le\pi$ 时只有这一个（式 HI-50）。`,
  },
];

export const BRIDGE = R`第 I 章与这组补充材料一直在"用波函数做计算"：叠加平面波、求 Fourier 变换、拼接定态、算概率。可我们还没有说清楚这些操作的数学本质——波函数构成什么样的空间？$\varphi(x)$ 与它的 Fourier 变换 $\overline\varphi(p)$ 为什么是"同一个态的两种表示"？$\delta$ 函数、不可归一的平面波该如何严格对待？第 II 章引入 Hilbert 空间、Dirac 记号与算符，把这些问题一次性理顺；第 III 章再用它们陈述量子力学的基本假设，届时 $\mathrm{H}_{\rm I}$ 的反射、透射系数会用概率流严格定义，$\mathrm{G}_{\rm I}$ 的"方均根宽度"也会有精确的含义。`;
