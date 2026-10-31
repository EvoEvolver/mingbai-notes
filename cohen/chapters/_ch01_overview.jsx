// 第 I 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "一次只来一个光子，条纹照样出现";
export const HOOK = R`把激光衰减到极弱，弱到装置里任何时刻最多只有一个光子在飞——然后让它穿过两条狭缝，打在一块能记录单光子的感光屏上。头几十个光子留下的是一片毫无章法的亮点，看不出任何"波"的样子；但等上几分钟，几万个亮点叠在一起，屏上浮现出的正是清清楚楚的干涉条纹。1909 年 G. I. Taylor 就用极弱的光拍出过这样的衍射照片，今天这已是本科实验室的演示，电子、中子、乃至由几十个原子组成的大分子都做出了同样的图样。

这个实验同时打败了两种"常识"：如果光只是粒子，单个光子怎么"知道"另一条缝开着？如果光只是波，为什么能量总是一份一份、落在一个个点上？本章的全部内容，就是从这个矛盾出发，一步步建立起量子力学的基本语言：概率幅、波函数、Schrödinger 方程、波包与不确定关系、定态与能量量子化。

这一章不追求严格（形式化留给第 II、III 章），它要做的是让你相信：放弃"轨道"和"决定论"并不是哲学上的任性，而是实验逼出来的唯一自洽的出路。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "A-1", title: "光量子：Planck–Einstein 关系", gist: R`光与物质只能以 $h\nu$ 为单位交换能量；粒子参数 $(E,\mathbf p)$ 与波动参数 $(\omega,\mathbf k)$ 由 $E=\hbar\omega$、$\mathbf p=\hbar\mathbf k$ 联系。`, gives: ["A-1", "A-2"], next: R`光是粒子？那干涉条纹怎么解释——看双缝。` },
  { sec: "A-2", title: "波粒二象性：双缝实验", gist: R`$I\neq I_1+I_2$；单光子逐个到达仍积累出条纹。出路：波 $\mathbf E(\mathbf r,t)$ 是**概率幅**，在 $x$ 处出现的概率 $\propto|E(x)|^2$。`, gives: ["A-3", "A-4", "A-5"], next: R`有了"概率"，就要问：测量究竟给出什么？用偏振实验回答。` },
  { sec: "A-3", title: "谱分解原理：偏振与测量", gist: R`测量只能给出若干"本征结果"；把态按测量仪器的本征态展开，系数模方给出概率；测量后态突变为相应本征态。`, gives: ["A-8", "A-9", "A-10"], next: R`这些规则对光成立；de Broglie 说：物质也一样。` },
  { sec: "B-1", title: "物质波：de Broglie 关系", gist: R`原子光谱的分立谱线 $\Rightarrow$ 能级量子化；物质粒子也伴随波：$E=\hbar\omega$，$\mathbf p=\hbar\mathbf k$，$\lambda=h/|\mathbf p|$。`, gives: ["B-1", "B-2", "B-3"], next: R`把 §A 的三条规则搬到电子身上。` },
  { sec: "B-2", title: "波函数与 Schrödinger 方程", gist: R`粒子的态是 $\psi(\mathbf r,t)$；$|\psi|^2$ 为概率密度；测量服从谱分解；演化由线性、对时间一阶的 Schrödinger 方程决定；$\psi$ 必须平方可积。`, gives: ["B-4", "B-6", "B-7", "B-8", "B-12"], next: R`先看最简单的情形：不受力的粒子。` },
  { sec: "C-1", title: "自由粒子与波包", gist: R`平面波 $\mathrm e^{i(\mathbf k\cdot\mathbf r-\omega t)}$ 是解，条件 $\omega=\hbar k^2/2m$（即 $E=p^2/2m$）；但它不可归一化，物理态是平面波的叠加——波包。`, gives: ["C-3", "C-4", "C-7", "C-9"], next: R`一个波包在某一时刻长什么样？` },
  { sec: "C-2", title: "某一时刻的波包形状", gist: R`各平面波在 $x_0=-[\mathrm d\alpha/\mathrm dk]_{k_0}$ 处同相（稳相），离开 $\Delta x\sim1/\Delta k$ 就相消：$\Delta x\,\Delta k\gtrsim1$。`, gives: ["C-10", "C-11", "C-16", "C-18"], next: R`乘上 $\hbar$，Fourier 的性质就变成了物理。` },
  { sec: "C-3", title: "Heisenberg 关系", gist: R`$|g(k)|^2$ 给出动量分布；位置与动量的弥散满足 $\Delta x\,\Delta p\gtrsim\hbar$。`, gives: ["C-19", "C-20", "C-22", "C-23"], next: R`波包会怎样运动？` },
  { sec: "C-4", title: "自由波包的演化：群速度", gist: R`各分量以相速度 $\omega/k=\hbar k/2m$ 前进；包络（概率最大处）以群速度 $V_G=\mathrm d\omega/\mathrm dk=\hbar k_0/m$ 前进——恰是经典速度。`, gives: ["C-24", "C-28", "C-30", "C-31", "C-32"], next: R`真正的量子效应出现在势变化比波长还快的地方。` },
  { sec: "D-1", title: "定态：分离变量", gist: R`$V$ 不含时 $\Rightarrow\psi=\varphi(\mathbf r)\mathrm e^{-iEt/\hbar}$，$H\varphi=E\varphi$；能量是 $H$ 的本征值；一般解是定态的叠加。`, gives: ["D-7", "D-9", "D-10", "D-14"], next: R`把它用到最简单的势：分段常数。` },
  { sec: "D-2", title: "一维方势：光学类比", gist: R`常数势区中定态方程与光在折射率 $n$ 的介质中的波动方程同形；$E<V$ 对应虚折射率（倏逝波）。由此读出：势阶上的反射、隧道效应、势阱中的能量量子化与共振透射。`, gives: ["D-17", "D-20", "D-21", "D-23", "D-25"] },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "A-1", to: "B-2", label: "推广到物质粒子" },
  { from: "B-2", to: "B-3", label: R`$\lambda=2\pi/|\mathbf k|$` },
  { from: "A-5", to: "B-4", label: "振幅模方 → 概率" },
  { from: "A-10", to: "B-6", label: "谱分解原理" },
  { from: "B-5", to: "B-6", label: "归一化" },
  { from: "B-4", to: "B-12", label: R`总概率为 1` },
  { from: "B-2", to: "B-8", label: "（作为假设引入）" },
];
export const EQMAP_C = [
  { from: "B-8", to: "C-3", label: R`$V=0$，代入平面波` },
  { from: "C-3", to: "C-4", label: R`de Broglie` },
  { from: "C-3", to: "C-7", label: "线性叠加" },
  { from: "C-7", to: "C-9", label: R`$t=0$，Fourier 反演` },
  { from: "C-9", to: "C-16", label: R`稳相：$g=|g|\mathrm e^{i\alpha}$` },
  { from: "C-16", to: "C-18", label: R`偏离 $x_0$ 一个振荡` },
  { from: "C-18", to: "C-23", label: R`$p=\hbar k$` },
  { from: "C-9", to: "C-22", label: R`$|g|^2$ 即动量分布` },
  { from: "C-16", to: "C-30", label: R`$\alpha\to\alpha-\omega t$` },
  { from: "C-30", to: "C-31", label: R`对 $t$ 求导` },
  { from: "C-31", to: "C-32", label: R`$\omega=\hbar k^2/2m$` },
];
export const EQMAP_D = [
  { from: "D-1", to: "D-7", label: R`分离变量 $\psi=\varphi\chi$` },
  { from: "D-7", to: "D-9", label: R`$E=\hbar\omega$` },
  { from: "D-9", to: "D-14", label: "线性叠加" },
  { from: "D-9", to: "D-17", label: R`一维、$V$ 为常数` },
  { from: "D-17", to: "D-20", label: R`与 $E''+n^2\Omega^2E/c^2=0$ 对比` },
  { from: "D-20", to: "D-21", label: R`解出 $n$` },
  { from: "D-21", to: "D-23", label: R`势阶右侧` },
  { from: "D-21", to: "D-25", label: R`势阱内` },
];
export const EQMAP_LABELS = {
  "A-1": "Planck–Einstein", "A-5": "双缝光强", "A-10": "偏振分解", "B-2": "de Broglie", "B-3": "de Broglie 波长", "B-4": "概率密度",
  "B-5": "按本征函数展开", "B-6": "测得 a 的概率", "B-8": "Schrödinger 方程", "B-12": "归一化",
  "C-3": "自由粒子色散", "C-4": R`$E=p^2/2m$`, "C-7": "一维波包", "C-9": "Fourier 变换", "C-16": "波包中心（稳相）", "C-18": R`$\Delta x\Delta k\gtrsim1$`,
  "C-22": "动量概率", "C-23": "Heisenberg 关系", "C-30": R`$x_M(t)$`, "C-31": "群速度", "C-32": R`$V_G=2V_\varphi$`,
  "D-1": R`$V(\mathbf r)$ 不含时`, "D-7": "定态", "D-9": "本征值方程", "D-14": "定态叠加", "D-17": "常数势区", "D-20": "光学类比", "D-21": "等效折射率",
  "D-23": R`势阶右侧 $n_2$`, "D-25": R`阱内 $n_2$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "light", label: "光：二象性与测量" },
  { id: "matter", label: "物质波与波包" },
  { id: "stat", label: "定态与势" },
];

export const concepts = [
  {
    id: "duality", name_zh: "波粒二象性", name_en: "Wave–particle duality", icon: "🌗", section_id: "A-2", group: "light",
    plain: "光（和物质）既不是纯粹的波，也不是纯粹的粒子；两种面貌缺一不可。",
    explain: R`双缝实验给出两条互相"打架"的事实：探测总是一个光子一个光子、一个点一个点地发生（粒子性）；而大量点的分布是 $|E_1+E_2|^2$ 的干涉条纹，并且在光子逐个到达时也不消失（波动性）。

量子力学的统一方式是：用波来**计算概率**，用粒子来**描述探测事件**。波满足线性方程，可以叠加、干涉；每个光子落在哪里只能以 $|E(x)|^2$ 为概率预言。这种统一的代价是放弃"粒子一定沿某条轨道、一定从某一条缝穿过"的观念。`,
    analogy: "像一场只能抽签决定座位的音乐会：每位观众（光子）都只坐一个座位（粒子性），但抽签的权重表（波）是由两扇门的“干涉”算出来的——座位分布呈条纹，而权重表本身谁也不会坐上去。",
    book_example: { what: R`杨氏双缝：$I(x)\neq I_1(x)+I_2(x)$ \eqref{A-3}；光子逐个到达仍积累出条纹；在缝后放探测器则条纹消失。`, point: "粒子性与波动性在同一实验里都不可或缺。" },
    misconception: "“光有时是波、有时是粒子”并不准确：同一个光子在同一实验里两种性质同时起作用——波决定概率，粒子是被探测到的样子。",
  },
  {
    id: "prob_amp", name_zh: "概率幅", name_en: "Probability amplitude", icon: "🎲", section_id: "A-2", group: "light",
    plain: R`波的振幅不是"多少光"，而是"在哪儿出现"的概率幅；概率 $\propto|\text{振幅}|^2$。`,
    explain: R`经典光学里 $|E|^2$ 是光强；对单个光子，它变成在该点被探测到的**概率**。关键在于：叠加发生在振幅层面（$E=E_1+E_2$），取模方之后才得到概率——于是出现交叉项 $2\,\mathrm{Re}(E_1^*E_2)$，这就是干涉。

对物质粒子，$\psi(\mathbf r,t)$ 扮演同样角色：$\mathrm d\mathscr P=C|\psi|^2\mathrm d^3r$。量子力学中 $\psi$ 本质上是复的（经典光学的复数只是计算方便）。`,
    analogy: R`像两列水波的"高度"可以相加相消，而你关心的是水面"能量"——高度平方。量子力学里，相加的是振幅，你看到的是平方。`,
    book_example: { what: R`$I(x)\propto|E_1(x)+E_2(x)|^2$ \eqref{A-5}；$\mathrm d\mathscr P(\mathbf r,t)=C|\psi(\mathbf r,t)|^2\mathrm d^3r$ \eqref{B-4}。`, point: "叠加振幅、再取模方——干涉的全部秘密。" },
    misconception: R`概率不能直接相加：两缝同开时找到粒子的概率不是两个单缝概率之和（除非测了路径）。`,
  },
  {
    id: "spectral", name_zh: "谱分解原理", name_en: "Principle of spectral decomposition", icon: "🔀", section_id: "A-3", group: "light",
    plain: "测量只能给出若干特许结果；把态按仪器的本征态展开，系数模方就是各结果的概率。",
    explain: R`偏振实验把测量的规则说得最干净：检偏器只有"过/不过"两种结果（测量结果量子化）；$\mathbf e_p=\mathbf e_x$ 或 $\mathbf e_y$ 时结果确定（本征态）；一般的 $\mathbf e_p=\mathbf e_x\cos\theta+\mathbf e_y\sin\theta$ 时，通过的概率是 $\cos^2\theta$。

推广到任意物理量：$\psi=\sum_ac_a\psi_a$，测得 $a$ 的概率 $\mathscr P_a=|c_a|^2/\sum|c_a|^2$。展开用哪一组本征态，由**测的是什么**决定。`,
    analogy: "像把一个斜放的箭头投影到仪器规定的两条坐标轴上：投影长度的平方就是“被判为沿该轴”的概率。换一台仪器（换一组坐标轴），投影就不同。",
    book_example: { what: R`$\mathbf e_p=\mathbf e_x\cos\theta+\mathbf e_y\sin\theta$ \eqref{A-10}：每个光子以 $\cos^2\theta$ 通过，$N$ 个光子中约 $N\cos^2\theta$ 个通过，回到 Malus 定律。`, point: "量子概率在大量重复下重现经典规律。" },
    misconception: R`"$\cos^2\theta$ 的光子通过"不是说每个光子通过了一部分——探测器从不记录"半个光子"。`,
  },
  {
    id: "collapse", name_zh: "测量扰动与态的约化", name_en: "Measurement and state reduction", icon: "📏", section_id: "A-3", group: "light",
    plain: "测量得到结果 a 之后，系统的态立刻变成对应的本征态。",
    explain: R`光子通过第一个检偏器后，第二个同向检偏器让它百分之百通过——说明通过后的态已是 $\mathbf e_x$，而不再是原来的 $\mathbf e_p$。物质粒子同样：测得 $a$ 后 $\psi'(\mathbf r,t_0)=\psi_a(\mathbf r)$ \eqref{B-7}。

这体现了微观测量的本质特征：测量**根本性地**扰动系统。宏观世界里我们总能设想扰动任意小的测量仪器，微观世界里不行。双缝中"测路径就没有条纹"正是这一点的表现。`,
    analogy: "像问一个人“你是选 A 还是选 B？”——问完之后他就真的站到了 A 或 B 那边，再问一遍答案不变；但原先他可能处于“还没决定”的状态。",
    book_example: { what: R`两个同轴检偏器 $A$、$A'$：通过 $A$ 的光子全部通过 $A'$。`, point: "测量后态变为与所得结果对应的本征态。" },
    misconception: "“扰动”不是仪器做得不够精巧导致的技术问题，而是量子测量的原则性特征。",
  },
  {
    id: "debroglie", name_zh: "de Broglie 物质波", name_en: "de Broglie matter waves", icon: "〰️", section_id: "B-1", group: "matter",
    plain: R`每个粒子都伴随一个波，波长 $\lambda=h/p$。`,
    explain: R`de Broglie（1923）大胆地把光子的关系 $E=\hbar\omega$、$\mathbf p=\hbar\mathbf k$ 搬到电子等物质粒子上。原子的分立能级于是像弦的简正模式一样自然出现；Davisson–Germer（1927）的电子衍射证实了物质波。

$h$ 极小，所以宏观物体的 de Broglie 波长小得无法观测——这就是日常生活中看不到物质波的原因（数量级见补充材料 A_I）。`,
    analogy: "像吉他弦只能以整数个半波长振动：一旦电子是波，被束缚的电子就只能取某些“音高”——分立的能级。",
    book_example: { what: R`$\lambda=2\pi/|\mathbf k|=h/|\mathbf p|$ \eqref{B-3}；原子谱线 $h\nu_{ij}=|E_i-E_j|$ \eqref{B-1}。`, point: "能级量子化与物质波是同一枚硬币的两面。" },
    misconception: "物质波不是粒子在“摆动着”前进；它是概率幅的波，粒子本身仍在一点被探测到。",
  },
  {
    id: "wavefunction", name_zh: "波函数与 Schrödinger 方程", name_en: "Wave function & Schrödinger equation", icon: "Ψ", section_id: "B-2", group: "matter",
    plain: R`粒子的全部可知信息都在 $\psi(\mathbf r,t)$ 里，它按线性的 Schrödinger 方程演化。`,
    explain: R`经典粒子的态是 6 个数 $(x,y,z,v_x,v_y,v_z)$；量子粒子的态是一个函数——无穷多个数。Schrödinger 方程 \eqref{B-8} 有两个关键性质：

**线性齐次** $\Rightarrow$ 叠加原理，配合概率幅解释就产生一切波动效应；**对时间一阶** $\Rightarrow$ 知道 $\psi(\mathbf r,t_0)$ 就决定以后的全部演化。另外，单粒子的 $\psi$ 必须平方可积，通常归一化 $\int|\psi|^2\mathrm d^3r=1$。`,
    analogy: "经典力学像记录一辆车的“位置+速度”；量子力学像记录一张随时间变化的天气云图——云图本身按确定的方程演化，但“雨落在哪一点”只能给概率。",
    book_example: { what: R`$i\hbar\partial_t\psi=-\frac{\hbar^2}{2m}\Delta\psi+V\psi$ \eqref{B-8}；$\int|\psi|^2\mathrm d^3r=1$ \eqref{B-12}。`, point: "态的演化是确定的，测量结果是概率的。" },
    misconception: R`Schrödinger 方程本身是决定论的；不确定性只出现在"测量结果"这一步。`,
  },
  {
    id: "wavepacket", name_zh: "波包与 Fourier 变换", name_en: "Wave packet", icon: "📦", section_id: "C-1", group: "matter",
    plain: R`单色平面波无法归一化；真实粒子是一束平面波的叠加——波包。`,
    explain: R`$\psi(x,0)=\frac1{\sqrt{2\pi}}\int g(k)\mathrm e^{ikx}\mathrm dk$：$g(k)$ 正是 $\psi(x,0)$ 的 Fourier 变换。各分量在 $x_0=-\mathrm d\alpha/\mathrm dk|_{k_0}$ 处同相叠加（稳相条件），这里 $|\psi|$ 最大；离开 $x_0$ 约 $1/\Delta k$ 后它们开始相消。

于是"窄的 $|g(k)|$ $\Leftrightarrow$ 宽的 $|\psi(x)|$"：$\Delta x\,\Delta k\gtrsim1$。这只是 Fourier 分析的一般性质，在经典波动中同样成立。`,
    analogy: "像合唱：频率略有不同的歌手同时起音，在开头那一瞬声音最响（同相），随后渐渐互相抵消。频率差越小，“同相”维持得越久——波包越长。",
    book_example: { what: R`三平面波模型 \eqref{C-10}：$|\psi|\propto1+\cos(\Delta k\,x/2)$，零点间距满足 $\Delta x\,\Delta k=4\pi$ \eqref{C-11}。`, point: "宽度反比关系来自干涉，不需要任何量子假设。" },
    misconception: R`$\Delta x\,\Delta k\gtrsim1$ 是下界，不是等式：加上相位"啁啾"可以让乘积任意大。`,
  },
  {
    id: "heisenberg", name_zh: "Heisenberg 不确定关系", name_en: "Heisenberg relation", icon: "⚖️", section_id: "C-3", group: "matter",
    plain: R`位置与动量不能同时任意精确：$\Delta x\,\Delta p\gtrsim\hbar$。`,
    explain: R`平面波 $\mathrm e^{ikx}$ 是动量 $p=\hbar k$ 的本征态，所以 $|g(k)|^2$（或 $|\overline\psi(p)|^2$）就是动量的概率分布；Parseval–Plancherel 等式保证两种分布的总概率相同。

把 Fourier 关系 $\Delta x\,\Delta k\gtrsim1$ 乘以 $\hbar$ 就得到 \eqref{C-23}。限制来自 $h\neq0$；$h$ 在宏观尺度上极小，所以经典力学感觉不到它。`,
    analogy: "像在一段很短的录音里辨认音高：录音越短（时间越确定），频率就越模糊。粒子的“位置”与“波长（动量）”就是这样一对。",
    book_example: { what: R`$\Delta x\cdot\Delta p\gtrsim\hbar$ \eqref{C-23}；$\overline{\mathrm d\mathscr P}(p)=\frac1C|\overline\psi(p)|^2\mathrm dp$ \eqref{C-22}。`, point: "量子力学的新内容只是 de Broglie 关系；Fourier 性质是旧的。" },
    misconception: "它不是“测量仪器不够精确”的问题，而是“粒子本来就没有同时确定的 x 与 p”。",
  },
  {
    id: "groupvel", name_zh: "相速度与群速度", name_en: "Phase vs group velocity", icon: "🏃", section_id: "C-4", group: "matter",
    plain: R`波包中心以群速度 $\mathrm d\omega/\mathrm dk$ 前进；对自由粒子它等于经典速度 $p/m$，是相速度的两倍。`,
    explain: R`物质波是色散的：$\omega=\hbar k^2/2m$，相速度 $\omega/k=\hbar k/2m$ 随 $k$ 增大。各分量跑得不一样快，相长干涉的位置就不再跟着某个特定分量走，而以 $V_G=[\mathrm d\omega/\mathrm dk]_{k_0}=\hbar k_0/m$ 移动。

这正是对应原理的体现：当 $\Delta x$ 与 $\Delta p$ 都可忽略时，波包中心像经典粒子一样以 $p_0/m$ 运动。此外，自由波包会随时间展宽（补充材料 G_I）。`,
    analogy: "像一群在跑步机传送带上走路的人：每个人（波峰）以自己的步速前进，但“人群最密集的地方”（包络）移动的速度可以和任何一个人都不同。",
    book_example: { what: R`三波模型 $x_M(t)=\frac{\Delta\omega}{\Delta k}t$ \eqref{C-28}；$V_G=\hbar k_0/m=2V_\varphi$ \eqref{C-32}。`, point: "量子描述自动回到经典速度。" },
    misconception: R`物质波的相速度 $\hbar k/2m$ 并不是粒子的速度；粒子速度对应的是群速度。`,
  },
  {
    id: "stationary", name_zh: "定态与能量本征值", name_en: "Stationary states", icon: "⏸️", section_id: "D-1", group: "stat",
    plain: R`势不含时时，存在概率分布不随时间变的态 $\varphi(\mathbf r)\mathrm e^{-iEt/\hbar}$，能量完全确定。`,
    explain: R`把 $\psi=\varphi(\mathbf r)\chi(t)$ 代入，"只依赖 $t$ 的一边 = 只依赖 $\mathbf r$ 的一边"，两边都只能是常数 $\hbar\omega=E$。于是 $\chi=\mathrm e^{-iEt/\hbar}$，$\varphi$ 满足本征值方程 $H\varphi=E\varphi$。

允许的能量就是 $H$ 的本征值；平方可积的要求只在某些 $E$ 有解，这就是能量量子化的来源。一般的态是定态的叠加 $\sum c_n\varphi_n\mathrm e^{-iE_nt/\hbar}$，各项相因子转速不同——这才产生随时间变化的物理。`,
    analogy: "像一根弦的各个简正模：单独一个模只是原地上下振动（定态），形状不变；多个模叠加才会出现来回跑动的波形。",
    book_example: { what: R`$H\varphi=E\varphi$，$H=-\frac{\hbar^2}{2m}\Delta+V(\mathbf r)$ \eqref{D-9}–\eqref{D-10}；$\psi=\sum_nc_n\varphi_n\mathrm e^{-iE_nt/\hbar}$ \eqref{D-14}。`, point: "求定态 = 解本征值问题。" },
    misconception: R`"不含时 Schrödinger 方程"并不取代含时方程；它只是用来找出那些特殊的定态。`,
  },
  {
    id: "optical", name_zh: "光学类比与倏逝波", name_en: "Optical analogy", icon: "🔦", section_id: "D-2", group: "stat",
    plain: R`常数势区里的定态方程就是光在折射率 $n\propto\sqrt{E-V}$ 的介质中的波动方程。`,
    explain: R`比较 $\varphi''+\frac{2m}{\hbar^2}(E-V)\varphi=0$ 与 $E''+\frac{n^2\Omega^2}{c^2}E=0$：令 $\frac{2m}{\hbar^2}(E-V)=\frac{n^2\Omega^2}{c^2}$ 即完全相同；边界条件（函数与导数连续）也相同。

$E>V$：实折射率，透明介质，波 $\mathrm e^{ikx}$；$E<V$：虚折射率，倏逝波 $\mathrm e^{-\rho x}$。于是光学中的反射、全反射、受抑全反射、Fabry–Perot 共振，统统可以翻译成量子力学的结论。`,
    analogy: "像把一个陌生问题翻译成老朋友熟悉的语言：光学家一眼就知道玻璃板会部分反射、薄金属膜会漏光——量子粒子在势阶、势垒上也是如此。",
    book_example: { what: R`\eqref{D-20}–\eqref{D-21}：$n(\Omega)=\frac1{\hbar\Omega}\sqrt{2mc^2(E-V)}$；势阶、势垒、势阱三例。`, point: "类比只是数学同构；对波函数的物理诠释完全不同。" },
    misconception: "倏逝波并不意味着粒子“一部分”在禁区里；它给出的是在那里被找到的（非零）概率。",
  },
  {
    id: "tunnel", name_zh: "隧道效应与量子反射", name_en: "Tunnel effect & quantum reflection", icon: "🚇", section_id: "D-2", group: "stat",
    plain: "能量不足的粒子能穿过势垒；能量足够的粒子也可能被弹回。",
    explain: R`$E<V_0$ 时势垒相当于一层虚折射率的薄层：若厚度不比衰减长度 $1/\rho$ 大多少，波就能部分透过——隧道效应，透射率随厚度指数衰减。$E>V_0$ 时经典粒子必过，量子粒子却在势阶处有反射概率；势阱（玻璃片）在某些"共振能量"处完全透射。

这些效应都来自势在比波长还短的距离上剧变——方势是理想化的"陡变"。`,
    analogy: "像光的“受抑全反射”：两块棱镜贴得足够近（小于一个波长）时，本该全反射的光会“漏”到另一块棱镜里。",
    book_example: { what: R`图 8–10 的势阶、势垒、势阱；势阱中 $n_2>n_1=n_3$，类似空气中的玻璃片，多次反射干涉。`, point: "量子与经典的差别集中在势的不连续处。" },
    misconception: "隧穿的粒子在垒内并没有“负动能”被观测到；能量守恒没有被破坏，被破坏的是经典的“轨道”图像。",
  },
];

export const relations = [
  { from: "duality", to: "prob_amp", label: "化解矛盾" },
  { from: "prob_amp", to: "spectral", label: "推广到测量" },
  { from: "spectral", to: "collapse", label: "测量之后" },
  { from: "duality", to: "debroglie", label: "推广到物质" },
  { from: "debroglie", to: "wavefunction", label: "波的方程" },
  { from: "prob_amp", to: "wavefunction", label: "模方即概率" },
  { from: "wavefunction", to: "wavepacket", label: "叠加平面波" },
  { from: "wavepacket", to: "heisenberg", label: "乘以 ħ" },
  { from: "spectral", to: "heisenberg", label: "给出动量分布" },
  { from: "wavepacket", to: "groupvel", label: "色散演化" },
  { from: "wavefunction", to: "stationary", label: "V 不含时" },
  { from: "stationary", to: "optical", label: "常数势区" },
  { from: "optical", to: "tunnel", label: "倏逝波" },
  { from: "collapse", to: "duality", label: "测路径毁条纹" },
];

// ---------- 小结与自测 ----------
export const TAKEAWAYS = [
  R`**波算概率，粒子是事件。**光与物质的波满足线性方程、可以干涉；单次探测总在一点发生，在 $\mathbf r$ 处的概率 $\propto|\psi(\mathbf r,t)|^2$。代价是放弃轨道与严格决定论。`,
  R`**测量规则（谱分解）：**结果只能是本征值 $a$；$\psi=\sum c_a\psi_a$ 时概率 $|c_a|^2/\sum|c_a|^2$；测后态变为 $\psi_a$。`,
  R`**de Broglie + Schrödinger：**$E=\hbar\omega$、$\mathbf p=\hbar\mathbf k$；$i\hbar\partial_t\psi=-\frac{\hbar^2}{2m}\Delta\psi+V\psi$ 线性、对时间一阶。`,
  R`**波包：**$\psi(x,0)$ 与 $g(k)$ 互为 Fourier 变换；$\Delta x\,\Delta k\gtrsim1\Rightarrow\Delta x\,\Delta p\gtrsim\hbar$；中心以群速度 $\hbar k_0/m$（经典速度）运动。`,
  R`**定态：**$V$ 不含时 $\Rightarrow H\varphi=E\varphi$；能量是 $H$ 的本征值；方势借光学类比给出量子反射、隧穿、束缚态量子化与共振透射。`,
];

export const QUIZ = [
  {
    q: R`双缝实验中把光源调到"光子一个一个地到达"，长时间曝光后屏上会看到什么？`,
    options: ["条纹消失，只剩两个单缝衍射图样之和", "依然是同样的干涉条纹，由一个个点累积而成", "条纹变暗但图样本身连续，没有分立的点", "每个光子都形成一套很淡的完整条纹"],
    answer: 1,
    why: R`实验否定了两种纯粹理论：条纹不消失（否定"光子间相互作用"的粒子解释），每个光子只留下一个点（否定纯波动解释）。点的密度 $\propto|E_1+E_2|^2$。`,
  },
  {
    q: R`偏振方向与检偏器透光轴夹角 $\theta=60^\circ$，发送 1000 个光子。下列说法正确的是：`,
    options: ["每个光子以 1/4 的强度通过", "恰好 250 个光子通过", "大约 250 个光子通过，具体哪个通过无法预言", "大约 750 个光子通过"],
    answer: 2,
    why: R`单个光子要么整个通过要么整个被吸收；通过的概率 $\cos^2 60^\circ=1/4$。只能预言统计结果 $N\cos^2\theta\approx250$（涨落约 $\pm14$）。`,
  },
  {
    q: R`为什么 Schrödinger 方程必须对时间是**一阶**的？`,
    options: ["为了保证能量守恒", "这样已知 $\\psi(\\mathbf r,t_0)$ 就足以决定以后的演化——态由 $\\psi$ 完全描述", "因为 de Broglie 关系中 $E$ 是一次的", "为了让方程是线性的"],
    answer: 1,
    why: R`波函数被假定包含了粒子的全部信息。若方程对时间二阶，还需额外给出 $\partial_t\psi$，那 $\psi$ 本身就不再是"完整的态"。`,
  },
  {
    q: R`一个波包的 $|g(k)|$ 宽度 $\Delta k$ 减半（$g$ 的辐角不变），$t=0$ 时位置的弥散 $\Delta x$ 会怎样？`,
    options: ["减半", "不变", "大约加倍", "变为原来的四倍"],
    answer: 2,
    why: R`Fourier 宽度反比：$\Delta x\sim1/\Delta k$（三波模型中精确地有 $\Delta x\,\Delta k=4\pi$）。更窄的动量分布意味着更宽的空间分布。`,
  },
  {
    q: R`自由粒子的波包中心以多大速度运动？`,
    options: [R`相速度 $\hbar k_0/2m$`, R`群速度 $\hbar k_0/m$`, R`光速 $c$`, R`$\hbar\Delta k/m$`],
    answer: 1,
    why: R`中心由稳相条件决定：$x_M(t)=[\mathrm d\omega/\mathrm dk]_{k_0}t-[\mathrm d\alpha/\mathrm dk]_{k_0}$。对 $\omega=\hbar k^2/2m$ 得 $V_G=\hbar k_0/m=p_0/m$，正是经典速度，是相速度的两倍。`,
  },
  {
    q: R`粒子以 $E<V_0$ 入射到有限宽的方势垒上。量子力学的预言是：`,
    options: ["必定反射，与经典相同", "以一定概率穿过，垒越厚概率越小（近似指数地）", "必定穿过", "穿过的概率与垒的厚度无关"],
    answer: 1,
    why: R`垒内是倏逝波 $\mathrm e^{-\rho x}$；若厚度不远大于 $1/\rho$，部分波透过——隧道效应。透射率近似 $\propto\mathrm e^{-2\rho(x_2-x_1)}$。`,
  },
];

export const BRIDGE = R`本章用"讲道理"的方式引入了波函数、测量与 Schrödinger 方程。第 II 章将为这些概念配上精确的数学：波函数所在的空间（平方可积函数构成的 Hilbert 空间）、Dirac 的右矢 $\ket{\psi}$ 与左矢 $\bra{\phi}$、线性算符与本征值问题、表象与基变换——本章的 Fourier 变换 $\psi(x)\leftrightarrow g(k)$ 将成为"位置表象与动量表象"之间的一次基变换。第 III 章再以这些工具把本章的规则写成量子力学的基本假设。在此之前，紧随本章的补充材料把这里的定性讨论变为定量计算：de Broglie 波长的数量级、不确定关系的估算、高斯波包的扩散、方势问题的完整解。`;
