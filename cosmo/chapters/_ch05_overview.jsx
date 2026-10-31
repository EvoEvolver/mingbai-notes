// 第 5 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一张温度图，十万分之一的起伏";
export const HOOK = `打开 Planck 卫星的全天 CMB 图：整片天空的温度是 2.7255 K，但不同方向之间有大约十万分之一的起伏——蓝斑与红斑。这张图是一个特定时刻（复合时期）、一个特定地点（地球）的光子，按到达方向排出来的"温度地图"。要预言它，我们必须知道：每个位置、每个传播方向上的光子温度，怎样随时间演化？

同一时期，暗物质正在引力势阱里慢慢聚集，重子（电子和原子核）被光子的"辐射压"推来推去，中微子以近光速四处穿行而不受任何碰撞；而所有这些成分又共同决定了引力势本身。这一章做的事情，就是给宇宙中每一种"演员"写出它们扰动的运动方程——光子、冷暗物质、重子、中微子各一套——并把它们统一写成 Fourier 空间中、以共形时间为自变量的一组线性常微分方程。下一章再补上引力（Einstein 方程），整台"宇宙线性扰动机器"就完整了。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "5.1", title: "光子的无碰撞 Boltzmann 方程", gist: R`把分布函数写成"温度被扰动的玻色–爱因斯坦分布" \eqref{5.2}，一阶展开后零阶部分给出 $T\propto1/a$，一阶部分给出 $\Theta$ 的自由流 + 引力项 \eqref{5.9}。`, gives: ["5.2", "5.3", "5.9"], next: R`左边有了；右边的碰撞项决定光子如何被电子"搅匀"。` },
  { sec: "5.2", title: "碰撞项：Compton 散射", gist: R`利用非相对论 Compton 散射几乎弹性（$|p'-p|/p\ll1$）这一事实，把碰撞积分展开到能量转移的一阶，得到 $C[f]\propto n_e\sigma_{\rm T}[\Theta_0-\Theta+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}]$。`, gives: ["5.14", "5.18", "5.20", "5.22"], next: R`把左右两边拼起来，再换成最方便的变量。` },
  { sec: "5.3", title: "光子 Boltzmann 方程", gist: R`换用共形时间、转到 Fourier 空间（Box 5.1），引入方向余弦 $\mu$ 与光深 $\tau$，得到每个 $k$ 模式独立的光子方程 \eqref{5.35}。`, gives: ["5.24", "5.26", "5.31", "5.33", "5.35"], next: R`光子之外，最重要的成分是只感受引力的暗物质。` },
  { sec: "5.4", title: "冷暗物质", gist: R`对非相对论、无碰撞的暗物质不必知道分布函数的形状：取 Boltzmann 方程的零阶矩与一阶矩，丢掉 $(p/E)^2$ 项，得到封闭的连续性方程与 Euler 方程。`, gives: ["5.41", "5.45", "5.50", "5.51", "5.52"], next: R`重子也是非相对论流体，但多了与光子的 Compton 耦合。` },
  { sec: "5.5", title: "重子", gist: R`电子与原子核被库仑散射锁成一体；连续性方程与暗物质相同，Euler 方程多出 Compton 拖曳力——用动量守恒从光子碰撞项的一阶矩（偶极矩 $\Theta_1$）直接得到。`, gives: ["5.55", "5.57", "5.59", "5.60", "5.61"], next: R`最后一种丰富的粒子是中微子。` },
  { sec: "5.6", title: "中微子", gist: R`中微子像光子一样用温度扰动 $\mathcal N$ 描述，但无碰撞；有质量时出现 $p/E_\nu$ 因子，$\mathcal N$ 还依赖 $p$。复合之前可当作无质量处理。`, gives: ["5.62", "5.65"], next: R`汇总：一组耦合的线性方程。` },
  { sec: "5.7", title: "小结：全部方程", gist: R`引入一般多极矩 $\Theta_l$ \eqref{5.66}，计入 Compton 角依赖与偏振的 $\Pi$ 项，列出光子、暗物质、重子、中微子的全套方程 \eqref{5.67}–\eqref{5.73} 与 $R$ 的定义。`, gives: ["5.66", "5.67", "5.72", "5.74"] },
];

// ---------- 推导图（光子线 12 个节点 + 物质线 12 个节点）----------
export const EQMAP_PHOTON = [
  { from: "5.2", to: "5.3", label: R`对 $\Theta$ 一阶展开` },
  { from: "5.1", to: "5.9", label: R`代入 $f=f^{(0)}-p\partial_pf^{(0)}\Theta$` },
  { from: "5.3", to: "5.9", label: "" },
  { from: "5.11", to: "5.16", label: R`近弹性：展开 $\delta_{\rm D}$` },
  { from: "5.16", to: "5.22", label: R`角平均 $|\mathcal M|^2$，积掉 $\boldsymbol q$、$\boldsymbol p'$` },
  { from: "5.9", to: "5.24", label: R`左 = 右，换成 $\eta$` },
  { from: "5.22", to: "5.24", label: "" },
  { from: "5.24", to: "5.35", label: R`Fourier + $\mu$ + $\tau$` },
  { from: "5.35", to: "5.59", label: R`取 $\mu$ 的一阶矩` },
  { from: "5.59", to: "5.66", label: R`推广到第 $l$ 阶` },
  { from: "5.35", to: "5.67", label: R`加 Compton 角依赖与偏振` },
  { from: "5.66", to: "5.67", label: R`$\Pi$ 含 $\Theta_2$` },
];
export const EQMAP_MATTER = [
  { from: "5.36", to: "5.41", label: R`零阶矩 $\int d^3p$` },
  { from: "5.41", to: "5.51", label: R`一阶部分 + Fourier` },
  { from: "5.36", to: "5.49", label: R`一阶矩 $\int d^3p\,p\hat p^j/E$` },
  { from: "5.49", to: "5.52", label: R`$n_{\rm c}\to\bar n_{\rm c}\propto a^{-3}$` },
  { from: "5.51", to: "5.55", label: "数守恒，碰撞项为零" },
  { from: "5.49", to: "5.57", label: R`$\times m_p$，加力 $F_{e\gamma}$` },
  { from: "5.22", to: "5.60", label: "光子动量损失 = 电子动量获得" },
  { from: "5.57", to: "5.61", label: "" },
  { from: "5.60", to: "5.61", label: R`代入、换 $\eta$` },
  { from: "5.61", to: "5.72", label: R`$1/R=4\rho_\gamma/3\rho_{\rm b}$` },
  { from: "5.63", to: "5.65", label: R`线性化 + Fourier` },
];
export const EQMAP_LABELS = {
  "5.1": "光子 Boltzmann 左边", "5.2": "被扰动的 BE 分布", "5.3": R`$f$ 的一阶展开`, "5.9": R`$\Theta$ 的左边`, "5.11": "Compton 碰撞积分",
  "5.16": "近弹性展开后", "5.22": "Compton 碰撞项", "5.24": R`$\Theta$ 方程（实空间）`, "5.35": "光子 Boltzmann 方程", "5.59": "偶极矩",
  "5.66": R`多极矩 $\Theta_l$`, "5.67": "完整光子方程",
  "5.36": "CDM 无碰撞方程", "5.41": "连续性（零阶矩）", "5.51": "CDM 连续性", "5.49": "一阶矩", "5.52": "CDM Euler",
  "5.55": "重子连续性", "5.57": "重子 Euler（含力）", "5.60": "Compton 拖曳力", "5.61": "重子 Euler", "5.72": "重子 Euler（R）",
  "5.63": "中微子无碰撞方程", "5.65": "中微子扰动方程",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "rad", label: R`辐射：$\Theta$ 与自由流` },
  { id: "coll", label: "碰撞：Compton 散射" },
  { id: "matter", label: "物质：流体方程" },
  { id: "tools", label: "数学工具" },
];

export const concepts = [
  {
    id: "theta", name_zh: R`温度扰动 $\Theta$`, name_en: "Temperature perturbation", icon: "🌡️", section_id: "5.1", group: "rad",
    plain: R`不直接扰动光子数，而是扰动玻色–爱因斯坦分布里的温度：$\Theta=\delta T/T$。`,
    explain: R`光子分布写成 $f=\left[\exp\{p/T(1+\Theta)\}-1\right]^{-1}$：零阶温度 $T(t)$ 只依赖时间，扰动 $\Theta(\boldsymbol x,\hat{\boldsymbol p},t)$ 既依赖位置（非均匀）又依赖传播方向（各向异性）。我们在天上测到的 CMB 温度图，就是地球处、今天、$\Theta$ 作为到达方向 $\hat{\boldsymbol p}$ 的函数。

关键假设是 $\Theta$ 不依赖动量大小 $p$——也就是扰动后仍然是黑体谱，只是温度因地因向而异。这之所以成立，是因为主导的相互作用（Compton 散射）几乎不改变光子能量。`,
    analogy: "像给每个方向的光子各配一只温度计：读数不同，但每只温度计测的都还是一条完整的黑体曲线，只是\"刻度\"略有平移。",
    book_example: { what: R`式 (5.2)–(5.3)：$f\simeq f^{(0)}-p\,\partial f^{(0)}/\partial p\cdot\Theta$；地球上测到的 $\delta T/T(\hat{\boldsymbol p})=\Theta(\boldsymbol x_{\rm Earth},\hat{\boldsymbol p},t_0)$。`, point: R`一个函数 $\Theta$ 就编码了全部的 CMB 各向异性。` },
    misconception: R`$\Theta$ 的单极矩 $\Theta_0$ 不能被吸收进零阶温度 $T$——$T$ 在全空间是常数，而 $\Theta_0$ 随位置变化（图 5.2）。`,
  },
  {
    id: "free_stream", name_zh: "自由流", name_en: "Free streaming", icon: "🛤️", section_id: "5.1", group: "rad",
    plain: R`没有碰撞时，光子沿直线带着自己的温度一路跑：$\Theta'+ik\mu\Theta=$ 引力项。`,
    explain: R`Boltzmann 方程左边的前两项 $\dot\Theta+(\hat p^i/a)\partial\Theta/\partial x^i$ 就是沿（零阶）光线的全导数：每束光子把它出发处的温度"搬运"到别处。在 Fourier 空间它变成 $\Theta'+ik\mu\Theta$，解为 $\Theta\propto e^{-ik\mu\eta}$——一个平面波随传播被"卷"进越来越高的多极矩（$\Theta_l\propto j_l(k\eta)$）。

这就是为什么复合时期大尺度的不均匀，到今天变成了天空上的角度各向异性：空间结构 → 方向结构。`,
    analogy: "像从远处一排灯笼射来的光：你站的位置不变，但看到的是来自不同距离、不同方向的灯笼的颜色——空间的明暗变成了你眼中视角的明暗。",
    book_example: { what: "式 (5.9) 的前两项被称为\"自由流\"；§5.2 末尾指出，复合之后 Boltzmann 方程仍然有效并描述光子漫长的自由流。", point: "自由流把空间各向异性转换成高阶多极矩。" },
    misconception: "自由流不是\"扩散\"：没有散射时光子走直线，信息不会被抹平，只会被转换到更高的 $l$。",
  },
  {
    id: "grav_terms", name_zh: R`引力源项 $\Phi$ 与 $\Psi$`, name_en: "Gravitational source terms", icon: "🕳️", section_id: "5.1", group: "rad",
    plain: R`$\Psi$ 让光子爬出势阱时红移，$\dot\Phi$ 是局域膨胀率的改变；它们出现在每一种成分的方程里。`,
    explain: R`共形牛顿规范下 $g_{00}=-(1+2\Psi)$，$g_{ij}=a^2\delta_{ij}(1+2\Phi)$。光子方程中的 $ik\mu\Psi$ 是引力红移：沿势梯度方向运动的光子能量改变；$\Phi'$ 则像局域多出来的一点哈勃膨胀，使光子额外红移——式 (5.1) 中 $H+\dot\Phi$ 是"局域哈勃率"。

对物质，$-3\Phi'$ 是局域体积变化导致的密度变化，$-ik\Psi$ 是牛顿引力加速度。$\Phi$、$\Psi$ 由所有成分共同决定（第 6 章），所以引力是把各成分耦合在一起的公共媒介。`,
    analogy: R`像一片起伏的地形（$\Psi$）同时还在被缓慢拉伸（$\dot\Phi$）：滚过它的弹珠（粒子）既会在坡上加减速，也会因为地面被拉伸而"变慢"。`,
    book_example: { what: R`式 (5.35)：$\Theta'+ik\mu\Theta+\Phi'+ik\mu\Psi=\dots$；式 (5.69)–(5.70)：$\delta_{\rm c}'+iku_{\rm c}=-3\Phi'$，$u_{\rm c}'+(a'/a)u_{\rm c}=-ik\Psi$。`, point: "同一对势函数驱动光子、暗物质、重子、中微子。" },
    misconception: R`$\Psi$ 和 $\Phi$ 不是两种"不同的引力"：它们是度规的两个分量；在没有各向异性应力时它们大小相等、符号相反（第 6 章）。`,
  },
  {
    id: "compton", name_zh: "Compton 碰撞项", name_en: "Compton collision term", icon: "💥", section_id: "5.2", group: "coll",
    plain: R`散射把每个点的光子温度拉向该处的平均值 $\Theta_0$，再加上电子运动带来的多普勒偶极。`,
    explain: R`完整的碰撞积分 (5.11) 涉及四个动量，看起来吓人。但非相对论电子的动量 $q\sim\sqrt{2m_eT}$ 远大于光子动量 $p\sim T$，所以每次散射几乎不改变光子能量：$|p'-p|/p\lesssim2q/m_e\ll1$。于是可以把能量守恒的 $\delta$ 函数按能量转移展开到一阶，再对电子动量和散射后光子方向积分。

结果极其简洁：$C[f]=-p\,\partial f^{(0)}/\partial p\cdot n_e\sigma_{\rm T}[\Theta_0-\Theta(\hat{\boldsymbol p})+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}]$。第一部分把 $\Theta$ 推向 $\Theta_0$（各向同性化），第二部分是电子整体运动产生的多普勒偶极。速率由 $n_e\sigma_{\rm T}$ 决定。`,
    analogy: "像一个嘈杂的房间里人们不停交谈：每个人的观点（温度）都被周围人的平均意见拉近；如果整群人在朝一个方向走，迎面和背面听到的声音还会略有不同（多普勒）。",
    book_example: { what: R`式 (5.14)：$p'-p\simeq(\boldsymbol p'-\boldsymbol p)\cdot\boldsymbol q/m_e$；式 (5.22)：最终的碰撞项。习题 5.4 补上被忽略的角依赖，给出 $-\mathcal P_2\Theta_2/2$ 一项。`, point: R`几乎弹性的散射，使 $\Theta$ 不依赖 $p$ 的假设自洽。` },
    misconception: "Compton 散射在这里不是\"让光子变冷/变热\"的能量交换（那是 SZ 效应等二阶效应），一阶上它只是改变光子的方向。",
  },
  {
    id: "tight", name_zh: "紧耦合与光子流体", name_en: "Tight coupling", icon: "🔗", section_id: "5.2", group: "coll",
    plain: "散射极频繁时，光子只剩单极和偶极——光子与电子像一种流体一起运动。",
    explain: R`如果 Compton 散射很有效，光子的平均自由程很短：到达某点的光子都在附近最后一次被散射，而附近电子的温度几乎与本地一样，所以各方向温度相同，$\Theta=\Theta_0$。电子有整体速度时会再产生一个偶极，但四极及更高阶都被抹掉。

只有单极（密度）和偶极（速度）的分布，正是流体的特征。复合之前光子与重子组成一种"光子–重子流体"；复合后散射停止，光子开始自由流。`,
    analogy: "像一团浓雾里的光：你只能看到身边一小圈雾的亮度，四面八方一样亮；但从雾中的不同位置看，这一圈的亮度可以不同——单极矩随位置变化。",
    book_example: { what: "图 5.2：平面波温度扰动中，每个观测点的\"最后散射圆\"内温度几乎均匀，但不同观测点的圆温度不同。", point: R`紧耦合时 $\Theta\approx\Theta_0(\boldsymbol x)$，各向异性只能在散射停止后产生。` },
    misconception: R`紧耦合不意味着没有扰动：单极矩 $\Theta_0$ 仍然随位置变化，并在声学振荡中起主角（第 9 章）。`,
  },
  {
    id: "tau", name_zh: R`光深 $\tau$`, name_en: "Optical depth", icon: "🌫️", section_id: "5.3", group: "coll",
    plain: "从某时刻到今天，一个光子平均会被散射多少次。",
    explain: R`$\tau(\eta)\equiv\int_\eta^{\eta_0}d\eta'\,n_e\sigma_{\rm T}a$，所以 $\tau'=-n_e\sigma_{\rm T}a$ 是共形时间里的散射率（取负号是因为 $\tau$ 从今天往回累积）。早期自由电子很多，$\tau\gg1$，光子与电子紧耦合；复合后自由电子骤减，$\tau\ll1$，光子几乎不再散射。

在光子方程里，碰撞项写成 $-\tau'[\Theta_0-\Theta+\mu u_{\rm b}]$；在重子 Euler 方程里写成 $(\tau'/R)[u_{\rm b}+3i\Theta_1]$。$|\tau'|$ 与 $k$ 或 $\mathcal H$ 的比较决定了某个模式是否处于紧耦合区。`,
    analogy: R`隔着一层雾看路灯：$\tau$ 就是雾的"厚度"。$\tau\gg1$ 时完全看不见远处，只看到身边的雾；$\tau\ll1$ 时视线畅通。`,
    book_example: { what: "式 (5.33)–(5.34)，以及光子方程 (5.35)。", point: R`$\tau=1$ 附近就是"最后散射面"——CMB 光子的出发点。` },
    misconception: R`$\tau'$ 是负数：不要把 $-\tau'$ 项的符号弄反。正的 $-\tau'$ 表示正的散射率。`,
  },
  {
    id: "fourier", name_zh: R`Fourier 模式与方向余弦 $\mu$`, name_en: "Fourier modes & direction cosine", icon: "〰️", section_id: "5.3", group: "tools",
    plain: R`线性方程的系数只依赖时间，所以每个波矢 $\boldsymbol k$ 各自独立演化；光子方向用 $\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}$ 描述。`,
    explain: R`扰动很小时方程是线性的，且背景均匀使系数只依赖时间。Fourier 变换把 $\partial/\partial x^i$ 变成 $ik_i$，偏微分方程化为对每个 $\boldsymbol k$ 独立的常微分方程（Box 5.1）。

对光子，还需要描述传播方向；由于只有 $\boldsymbol k$ 一个特殊方向，$\Theta$ 只依赖 $\hat{\boldsymbol p}$ 与 $\hat{\boldsymbol k}$ 的夹角余弦 $\mu$。$\mu=\pm1$ 是沿温度梯度传播，$\mu=0$ 是垂直于梯度。速度在宇宙学中是纵向的（$\boldsymbol u\parallel\boldsymbol k$），所以 $\boldsymbol u_{\rm b}\cdot\hat{\boldsymbol p}=u_{\rm b}\mu$。`,
    analogy: "就像把一段复杂的音乐分解成一个个纯音：每个音高（$k$）的音量如何变化，可以单独计算，最后再叠加回去。",
    book_example: { what: R`Box 5.1，式 (5.25)–(5.30)；式 (5.31) 定义 $\mu$；式 (5.32) 纵向速度。`, point: "线性阶上\"每个 k 独立\"的技巧在宇宙学中每次都管用。" },
    misconception: R`本书去掉了 Fourier 变量的波浪号；看到 $\mu$ 或 $k$ 而没有空间导数，就说明式子在 Fourier 空间。`,
  },
  {
    id: "multipoles", name_zh: "多极矩与 Legendre 层级", name_en: "Multipole hierarchy", icon: "🎼", section_id: "5.7", group: "tools",
    plain: R`把 $\Theta(\mu)$ 展开成 Legendre 多项式：$\Theta_0$ 单极、$\Theta_1$ 偶极、$\Theta_2$ 四极……`,
    explain: R`$\Theta_l(k,\eta)\equiv(-i)^{-l}\int\frac{d\mu}{2}\mathcal P_l(\mu)\Theta(\mu)$。$\mathcal P_l$ 在 $[-1,1]$ 上有 $l$ 个零点，越高阶振荡越快，所以高阶多极矩描述小角度上的各向异性。单极 $\Theta_0$ 对应光子密度（温度）扰动，偶极 $\Theta_1$ 对应光子流体速度。

把 Boltzmann 方程按多极展开，第 $l$ 阶方程会牵涉 $l\pm1$ 阶——一个无穷层级。对非相对论物质，可以在一阶矩处截断；对光子和中微子则不行，必须保留很多阶（或回到 $\Theta(\mu)$ 本身）。`,
    analogy: R`像用越来越细的笔描一幅画：单极是整体亮度，偶极是"一边亮一边暗"，四极是"两头亮中间暗"，$l$ 越高笔越细。`,
    book_example: { what: R`式 (5.20)、(5.59)、(5.66) 与图 5.3（$\mathcal P_0$、$\mathcal P_1$、$\mathcal P_3$、$\mathcal P_{40}$）。`, point: R`Fourier 空间的 $\Theta_l$ 将直接对应天空上的角功率谱 $C_l$（第 9 章）。` },
    misconception: R`$\Theta_l$ 中的 $1/(-i)^l$ 只是约定，使自由流解的多极矩为实数（$\Theta_l\propto j_l$）；不要把它当成物理相位。`,
  },
  {
    id: "moments", name_zh: "取矩：从 Boltzmann 到流体", name_en: "Taking moments", icon: "🧮", section_id: "5.4", group: "matter",
    plain: "对动量积分 Boltzmann 方程：零阶矩给连续性方程，一阶矩给 Euler 方程。",
    explain: R`对冷暗物质，我们不需要知道分布函数的具体形状。把无碰撞 Boltzmann 方程乘以 $d^3p/(2\pi)^3$ 积分，得到数密度 $n_{\rm c}$ 的方程（连续性方程，含膨胀稀释 $3(H+\dot\Phi)$）；乘以 $p\hat p^j/E$ 再积分，得到流体速度 $\boldsymbol u_{\rm c}$ 的方程（Euler 方程）。

第 $l$ 阶矩的方程依赖第 $l+1$ 阶矩——一个无穷层级。冷暗物质的速度弥散 $(p/E)^2$ 可以忽略，于是在二阶矩处截断，得到封闭的两个方程；而有质量中微子速度大，不能这样截断。`,
    analogy: "描述一群鱼时不必追踪每条鱼：知道每处鱼群的密度和平均游速就够了——只要鱼群\"步调一致\"（速度弥散小）。",
    book_example: { what: "式 (5.37)–(5.41) 零阶矩，(5.46)–(5.50) 一阶矩，(5.51)–(5.52) Fourier 版本。", point: "冷 = 速度弥散可忽略 = 层级可在一阶截断。" },
    misconception: R`Euler 方程中没有 $(\boldsymbol u\cdot\nabla)\boldsymbol u$ 项不是遗漏：它是二阶小量，在第 12 章非线性理论中才出现。`,
  },
  {
    id: "cdm", name_zh: "冷暗物质的连续性与 Euler 方程", name_en: "CDM fluid equations", icon: "🌑", section_id: "5.4", group: "matter",
    plain: R`$\delta_{\rm c}'+iku_{\rm c}=-3\Phi'$，$u_{\rm c}'+(a'/a)u_{\rm c}=-ik\Psi$：只受引力和膨胀支配。`,
    explain: R`连续性方程说：密度变化来自流体的汇聚（$iku_{\rm c}$）与局域体积的变化（$-3\Phi'$）。Euler 方程说：速度被引力势梯度驱动（$-ik\Psi$），并因膨胀而衰减（$a'/a$ 项，即本动速度 $\propto1/a$ 的"哈勃摩擦"）。

由于速度只由标量势的梯度驱动，它天然是无旋（纵向）的；任何旋度分量只能来自初始条件，并会按 $1/a$ 衰减。`,
    analogy: "像一盆在缓慢变大的盆里的沙：沙粒顺着地形往低处流（引力），流动又因盆子的拉伸而越来越慢（哈勃摩擦）。",
    book_example: { what: R`式 (5.45)/(5.51) 与 (5.50)/(5.52)；零阶部分 (5.43) 再次给出 $\bar n_{\rm c}\propto a^{-3}$。`, point: "暗物质是结构增长的骨架：它只听从引力。" },
    misconception: R`$\delta_{\rm c}$ 不是"暗物质粒子数的绝对变化"，而是相对于平均密度的分数涨落 $\delta\rho_{\rm c}/\rho_{\rm c}$。`,
  },
  {
    id: "drag", name_zh: R`Compton 拖曳与 $R$`, name_en: "Compton drag & R", icon: "🌬️", section_id: "5.5", group: "matter",
    plain: R`光子偶极对电子施加一股"逆风"，整个重子流体被拖着走；拖曳强度 $\propto1/R=4\rho_\gamma/3\rho_{\rm b}$。`,
    explain: R`光子与电子散射时交换动量。若辐射场有偶极（一边热一边冷），电子迎着热的一边运动就像顶风，受到反向的力。动量守恒意味着电子得到的动量恰好等于光子失去的——所以只需对光子碰撞项取一阶矩，就能得到重子 Euler 方程中的力项，结果正比于 $i\Theta_1+u_{\rm b}/3$。

力被重子密度 $\rho_{\rm b}$ 除：电子被库仑力锁在沉重的质子上，推动电子就是推动整个重子流体。定义 $R\equiv3\rho_{\rm b}/4\rho_\gamma$（$\propto a$），方程写成 $u_{\rm b}'+(a'/a)u_{\rm b}=-ik\Psi+(\tau'/R)[u_{\rm b}+3i\Theta_1]$。紧耦合时 $u_{\rm b}\simeq-3i\Theta_1$：重子与光子同速。`,
    analogy: "一个小孩（电子）牵着一头大象（质子）在风中行走：风（光子偶极）吹在小孩身上，但能把这对组合推动多少，取决于大象有多重。",
    book_example: { what: R`式 (5.58)–(5.61) 与 (5.74)；脚注强调 $R$ 不是光子–重子数密度比 $\eta_{\rm b}$。`, point: R`重子惯性 $R$ 将改变声学振荡的平衡点与声速（第 9 章）。` },
    misconception: "电子虽然只占重子质量的 1/1836，但不能只看电子：库仑耦合让 Compton 力作用在全部重子上。",
  },
  {
    id: "neutrino", name_zh: R`中微子扰动 $\mathcal N$`, name_en: "Neutrino perturbation", icon: "👻", section_id: "5.6", group: "rad",
    plain: R`像光子一样用温度扰动描述，但没有碰撞；有质量后 $\mathcal N$ 还依赖动量大小 $p$。`,
    explain: R`中微子在核合成后只感受引力，零阶是温度 $T_\nu$ 的费米–狄拉克形分布。扰动写成 $f_\nu=\left[1-\mathcal N p\,\frac{d}{dp}\right]f_\nu^{(0)}$。方程与光子相比没有碰撞项，并在自由流项和 $\Psi$ 项中多出 $p/E_\nu$ 与 $E_\nu/p$：慢中微子流得慢、在势阱中停留更久。

由于不同动量的中微子速度不同，$\mathcal N$ 不能再假设与 $p$ 无关，每个质量本征态也要各自一个 $\mathcal N$。幸好复合之前中微子是相对论性的，可令 $p/E_\nu=1$，此时 $\mathcal N$ 满足无碰撞版的光子方程，三代可共用一个 $\mathcal N$。`,
    analogy: "光子是一群步伐完全一致的跑者；有质量的中微子则是快慢不一的人群——必须按速度分组追踪。",
    book_example: { what: "式 (5.62)–(5.65)、(5.73)。", point: "中微子质量在晚期宇宙中会压低小尺度结构（第 8、12 章）。" },
    misconception: R`中微子没有碰撞并不意味着它们没有扰动；它们的自由流会产生各向异性应力，从而让 $\Phi\neq-\Psi$（第 6 章）。`,
  },
];

export const relations = [
  { from: "theta", to: "free_stream", label: "左边描述" },
  { from: "grav_terms", to: "free_stream", label: "引力源项" },
  { from: "compton", to: "tight", label: "强散射极限" },
  { from: "compton", to: "tau", label: R`速率 $n_e\sigma_{\rm T}$` },
  { from: "theta", to: "compton", label: "右边描述" },
  { from: "fourier", to: "multipoles", label: R`$\mu$ 的展开` },
  { from: "free_stream", to: "multipoles", label: R`推向高 $l$` },
  { from: "tight", to: "multipoles", label: R`只剩 $l\le1$` },
  { from: "moments", to: "cdm", label: "截断于一阶" },
  { from: "grav_terms", to: "cdm", label: R`$-3\Phi'$，$-ik\Psi$` },
  { from: "compton", to: "drag", label: "动量守恒" },
  { from: "multipoles", to: "drag", label: R`偶极 $\Theta_1$` },
  { from: "moments", to: "drag", label: "同样的矩" },
  { from: "theta", to: "neutrino", label: "同样的写法" },
  { from: "tau", to: "drag", label: R`$\tau'/R$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**光子**：把扰动写成温度扰动 $\Theta(\boldsymbol x,\hat{\boldsymbol p},\eta)$，Boltzmann 方程化为 $\Theta'+ik\mu\Theta+\Phi'+ik\mu\Psi=-\tau'[\Theta_0-\Theta+\mu u_{\rm b}]$——左边是自由流与引力，右边是 Compton 散射。`}</TxI>,
  <TxI>{R`**Compton 散射**几乎弹性（$|p'-p|/p\lesssim2\sqrt{2T/m_e}$），一阶上只改变方向：把 $\Theta$ 拉向单极 $\Theta_0$，并通过电子速度产生偶极。强散射（紧耦合）时光子像流体，只剩单极与偶极。`}</TxI>,
  <TxI>{R`**冷暗物质**：取 Boltzmann 方程的零阶矩与一阶矩，丢掉 $(p/E)^2$，得到 $\delta_{\rm c}'+iku_{\rm c}=-3\Phi'$、$u_{\rm c}'+\frac{a'}{a}u_{\rm c}=-ik\Psi$。`}</TxI>,
  <TxI>{R`**重子**：连续性方程同暗物质；Euler 方程多一项 Compton 拖曳 $\frac{\tau'}{R}[u_{\rm b}+3i\Theta_1]$，$R=3\rho_{\rm b}/4\rho_\gamma$——由动量守恒从光子偶极得到。**中微子**：无碰撞的"光子方程"，有质量时带 $p/E_\nu$ 因子且 $\mathcal N$ 依赖 $p$。`}</TxI>,
  <TxI>{R`**工具**：线性 + 背景均匀 ⇒ 每个 Fourier 模式独立；共形时间 $\eta$ 为自变量；光子方向用 $\mu$，并展开为 Legendre 多极矩 $\Theta_l$（无穷层级）。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么可以假设光子温度扰动 $\Theta$ 不依赖光子动量大小 $p$？`,
    options: ["因为光子没有质量", "因为主导的相互作用（非相对论 Compton 散射）几乎不改变光子能量", "因为 CMB 是完美黑体，从来没有扰动", "因为我们只关心大尺度"],
    answer: 1, why: R`$|p'-p|/p\lesssim2q/m_e\sim2\sqrt{2T/m_e}\ll1$：散射几乎弹性，不会在不同能量的光子之间造成不同的温度扰动。`,
  },
  {
    q: R`在没有电子整体运动（$u_{\rm b}=0$）且散射非常频繁时，Compton 碰撞项会把 $\Theta$ 推向什么？`,
    options: ["零", R`单极矩 $\Theta_0$`, R`偶极矩 $\Theta_1$`, R`引力势 $\Psi$`],
    answer: 1, why: R`$C[f]\propto[\Theta_0-\Theta(\hat{\boldsymbol p})+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}]$；$u_{\rm b}=0$ 时它驱动 $\Theta\to\Theta_0$，所有各向异性在每个点被抹平，但单极仍随位置变化。`,
  },
  {
    q: R`冷暗物质的流体方程为什么只需要两个（$\delta_{\rm c}$ 与 $u_{\rm c}$）就能封闭？`,
    options: ["因为暗物质没有引力", R`因为暗物质速度弥散 $(p/E)^2$ 可忽略，二阶矩可以设为零`, "因为暗物质与光子紧耦合", "因为暗物质是玻色子"],
    answer: 1, why: R`第 $l$ 阶矩方程依赖第 $l+1$ 阶矩；"冷"意味着丢掉 $(p/E)^2$ 及更高阶，层级在一阶截断。`,
  },
  {
    q: R`重子 Euler 方程中 Compton 拖曳项为什么被总重子密度 $\rho_{\rm b}$（而不是电子密度）除？`,
    options: ["这是一个笔误", "电子与原子核被库仑散射紧锁在一起，推动电子就是推动整个重子流体", "因为光子直接与质子散射", R`因为 $\rho_{\rm b}$ 与 $\rho_\gamma$ 相等`],
    answer: 1, why: R`光子–核子散射被 $m_e^2/m_p^2$ 压低；但库仑耦合使电子获得的动量立刻分给原子核，惯性由 $\rho_{\rm b}=m_p\bar n_{\rm b}$ 决定。`,
  },
  {
    q: R`在 Fourier 空间中，$\mu=0$ 的光子是在怎样传播？`,
    options: ["沿温度梯度方向", "逆温度梯度方向", "垂直于温度梯度、沿等温线方向", "静止不动"],
    answer: 2, why: R`$\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}$；$\mu=0$ 表示 $\hat{\boldsymbol p}\perp\boldsymbol k$，即沿温度不变的方向传播（图 5.2 中竖直方向），此时自由流项 $ik\mu\Theta$ 为零。`,
  },
  {
    q: "与光子方程相比，有质量中微子方程的一个本质新特点是什么？",
    options: ["多了 Compton 碰撞项", R`扰动 $\mathcal N$ 依赖动量大小 $p$，且出现 $p/E_\nu$ 因子`, R`不受 $\Psi$ 影响`, "零阶分布是玻色–爱因斯坦分布"],
    answer: 1, why: R`不同动量的中微子速度不同（$p/E_\nu$），自由流与引力作用都依赖 $p$，所以 $\mathcal N=\mathcal N(k,p,\mu,\eta)$ 并多出 $-aHp\,\partial\mathcal N/\partial p$ 项。`,
  },
];

export const BRIDGE = R`本章写出了每种成分在"给定的扰动时空"中如何演化，方程里到处出现度规扰动 $\Phi$ 和 $\Psi$——但它们本身由什么决定，我们还没说。第 6 章将计算扰动度规的 Einstein 方程，把 $\Phi$、$\Psi$ 与各成分的 $\delta$、$u$、$\Theta_l$、$\mathcal N_l$ 联系起来；到那时，方程组就闭合了。再配上第 7 章由暴胀给出的初始条件，第 8、9 章就能真正解出物质功率谱与 CMB 各向异性。`;
