// 第 9 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一张 38 万岁的婴儿照";
export const HOOK = R`Planck 卫星画出的全天温度图，看上去像一张随机的斑点花纹：冷热斑的温差只有 $\pm100\,\mu\mathrm K$，约为平均温度 $2.7255\,\mathrm K$ 的十万分之几。可是把这张图做球谐分解、算出每个角尺度上的涨落方差 $C(l)$，随机花纹立刻变成一条有节奏的曲线：大角度上一片平坦的"高原"，$l\approx220$（约 $1^\circ$）处一个高耸的主峰，其后是一串越来越低的小峰，最后在 $l\gtrsim2000$ 处衰减殆尽。

这条曲线是宇宙学中最精确的测量之一，它的每一个特征都有清楚的物理来源。高原是**原初扰动的原貌**——这些尺度在复合时还在视界外，光子只是从势阱里爬出来损失了能量（Sachs–Wolfe 效应）。峰与谷是**声波**——复合前光子和重子紧紧耦合成一种流体，引力把它往势阱里拉，光子压强把它往外推，于是它像弹簧振子一样振荡；复合那一刻恰好处在振荡极值的模式，就成了峰。峰的位置是一把**标准尺**（声视界）放在 $1.4\times10^4\,\mathrm{Mpc}$ 之外量出的角度，峰的高低次序称出了**重子与暗物质**的多少，小尺度的衰减则来自光子的**扩散**。

这一章，我们从第 5–8 章的 Boltzmann–Einstein 方程出发，用近似解析的办法把这条曲线"推"出来：先在复合时刻求出光子的单极与偶极，再让光子自由穿行到今天，最后把三维的非均匀性投影成二维天空上的各向异性。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "9.1", title: "总览：先看答案", gist: R`数值解显示：视界外模式几乎不演化；进入视界的模式像受迫谐振子那样振荡，复合时恰在极值处的成为峰。重子降低声速、加大奇偶峰不对称；光子扩散抹平小尺度；复合后自由流把尺度 $k$ 投影到 $l\sim k\eta_0$。`, gives: ["9.1", "9.2", "9.3", "9.4"], next: R`先处理最简单的一端：复合时仍在视界外的大尺度。` },
  { sec: "9.2", title: "大尺度各向异性", gist: R`视界外 $\Theta_0+\Phi=\mathcal R$，物质期 $\Phi=\frac35\mathcal R$，于是可观测量 $\Theta_0+\Psi=-\frac15\mathcal R=-\frac16\delta_{\rm c}$：大尺度热斑其实是复合时的欠密区。`, gives: ["9.5", "9.6", "9.8", "9.9"], next: R`进入视界的模式要考虑压强——需要紧耦合下的 Boltzmann 方程。` },
  { sec: "9.3", title: "声学振荡", gist: R`$\tau'\to\infty$ 时只剩单极与偶极：光子–重子是一种流体，满足受迫、带拖曳的振子方程 \eqref{9.22}，声速 $c_s=1/\sqrt{3(1+R)}$。Green 函数解 \eqref{9.26} 只含余弦模，峰在 $kr_s=n\pi$；偶极 \eqref{9.28} 与单极相位差 $90^\circ$。`, gives: ["9.12", "9.20", "9.21", "9.22", "9.24", "9.26", "9.27", "9.28"], next: R`紧耦合不是无限紧——有限的平均自由程带来扩散阻尼。` },
  { sec: "9.4", title: "扩散阻尼", gist: R`保留四极矩并把方程按 $1/\tau'$ 展开到二阶，色散关系获得虚部 \eqref{9.40}：扰动 $\propto e^{-k^2/k_D^2}$，$k_D^{-2}=\int d\eta\,[R^2/(1+R)+8/9]/[6(1+R)n_e\sigma_{\rm T}a]$。`, gives: ["9.36", "9.39", "9.40", "9.41", "9.42", "9.44"], next: R`现在已知复合时的光子分布，下一步是把它送到今天。` },
  { sec: "9.5", title: "从非均匀性到各向异性", gist: R`形式解 \eqref{9.49} 加上 Legendre 投影给出视线积分 \eqref{9.54}；可见度函数 $g(\eta)$ 尖锐，于是 \eqref{9.59}：今天的 $\Theta_l$ = 单极 $\times j_l$ + 偶极 $\times j_l'$ + ISW。$a_{lm}$ 的方差 $C(l)=\frac2\pi\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2$ \eqref{9.74}，宇宙方差 $\sqrt{2/(2l+1)}$。`, gives: ["9.49", "9.54", "9.56", "9.59", "9.66", "9.67", "9.74"], next: R`把各部分组装起来，看 $C(l)$ 的形状。` },
  { sec: "9.6", title: "CMB 功率谱", gist: R`大角度：Sachs–Wolfe 高原 $l(l+1)C(l)=$ 常数（\eqref{9.80}）。小角度：单极给出峰谷，偶极（不相干相加）填平谷底，早期 ISW 与单极相干、主要抬高第一峰；第一峰在 $l\simeq0.75\pi\eta_0/r_s\approx220$。`, gives: ["9.76", "9.78", "9.79", "9.80", "9.81"], next: R`峰的位置和高度都依赖宇宙学参数——这正是 CMB 的威力所在。` },
  { sec: "9.7", title: "宇宙学参数", gist: R`曲率与 $\Lambda$ 只改变到最后散射面的角直径距离，整体平移峰位；$\mathcal A_s$、$n_s$ 改变整体与倾斜，与再电离 $\tau_{\rm rei}$（$e^{-2\tau_{\rm rei}}$）简并；$\Omega_{\rm b}h^2$ 改变奇偶峰比与阻尼，$\Omega_{\rm c}h^2$ 改变驱动与相等时刻。`, gives: ["9.82"], next: R`小结：三种贡献与它们携带的信息。` },
  { sec: "9.8", title: "小结", gist: R`观测到的各向异性 = 单极（$\Theta_0+\Psi$，声学振荡）+ Doppler（$3\Theta_1$，反相振荡）+ ISW（沿视线积分、随尺度平滑）。` },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "9.11", to: "9.12", label: R`$\tau'\gg\Theta_l'$：高阶矩被压低` },
  { from: "9.15", to: "9.17", label: R`按 $1/\tau'$ 展开` },
  { from: "9.14", to: "9.18", label: R`代入 $u_{\rm b}$ (9.17)` },
  { from: "9.17", to: "9.18", label: "" },
  { from: "9.13", to: "9.19", label: R`求导，消去 $\Theta_1'$` },
  { from: "9.18", to: "9.19", label: "" },
  { from: "9.19", to: "9.20", label: R`(9.13) 消去 $\Theta_1$` },
  { from: "9.20", to: "9.22", label: R`改写为 $\Theta_0+\Phi$` },
  { from: "9.22", to: "9.26", label: R`忽略拖曳，Green 函数 (9.25)` },
  { from: "9.26", to: "9.27", label: R`余弦项主导：$kr_s=n\pi$` },
  { from: "9.26", to: "9.28", label: R`对 $\eta$ 求导，用 (9.13)` },
  { from: "9.30", to: "9.39", label: R`(9.35)–(9.37) 代入，展开到 $\tau'^{-2}$` },
  { from: "9.39", to: "9.40", label: R`$\omega=kc_s+\delta\omega$` },
  { from: "9.40", to: "9.42", label: R`$e^{i\int\delta\omega\,d\eta}$` },
  { from: "9.42", to: "9.44", label: R`全电离、$R=0$` },
];
export const EQMAP_B = [
  { from: "9.45", to: "9.49", label: R`积分因子 (9.47)，$\tau(\eta_{\rm init})\to\infty$` },
  { from: "9.49", to: "9.51", label: R`乘 $\mathcal P_l$ 积分 (9.50)` },
  { from: "9.51", to: "9.54", label: R`$\mu\to\frac1{ik}\frac d{d\eta}$，分部积分` },
  { from: "9.54", to: "9.57", label: R`可见度函数 $g$ (9.56)` },
  { from: "9.57", to: "9.59", label: R`$g$ 尖锐：取 $\eta=\eta_*$` },
  { from: "9.65", to: "9.71", label: R`平方取平均 (9.69)` },
  { from: "9.66", to: "9.71", label: "" },
  { from: "9.71", to: "9.74", label: R`Legendre 展开 (9.72)、角积分 (9.90)` },
  { from: "9.59", to: "9.76", label: R`只留单极，代入 $-\mathcal R/5$` },
  { from: "9.6", to: "9.76", label: "" },
  { from: "9.74", to: "9.76", label: "" },
  { from: "9.76", to: "9.79", label: R`$P_{\mathcal R}$ (7.99)，$\Gamma$ 函数积分` },
  { from: "9.79", to: "9.80", label: R`$n_s=1$` },
  { from: "9.59", to: "9.81", label: R`ISW 项分部积分` },
];
export const EQMAP_LABELS = {
  "9.11": "Boltzmann 矩层级", "9.12": "高阶矩的压低", "9.13": "单极方程", "9.14": "偶极方程", "9.15": "重子速度", "9.17": R`$u_{\rm b}$ 的展开`,
  "9.18": "紧耦合偶极方程", "9.19": "二阶方程", "9.20": "受迫、带拖曳的振子", "9.22": R`$\Theta_0+\Phi$ 的振子方程`, "9.26": "紧耦合解（单极）",
  "9.27": "峰位", "9.28": "紧耦合解（偶极）", "9.30": "含四极的偶极方程", "9.39": "色散关系", "9.40": "频率的虚部", "9.42": R`阻尼尺度 $k_D$`, "9.44": R`$k_D$ 的近似式`,
  "9.45": "Boltzmann 方程", "9.49": "形式解", "9.51": R`$\Theta_l$（暂不计 $\mu$）`, "9.54": "视线积分", "9.57": "用可见度函数的源", "9.59": "今天的 $\\Theta_l$",
  "9.65": R`$a_{lm}$`, "9.66": R`$C(l)$ 的定义`, "9.71": R`$C(l)$ 的角积分式`, "9.74": R`$C(l)=\frac2\pi\int k^2P|\mathcal T_l|^2$`, "9.6": "大尺度解", "9.76": "SW 积分",
  "9.79": "SW 解析式", "9.80": "SW 高原", "9.81": "早期 ISW",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "rec", label: "复合前：光子–重子流体" },
  { id: "proj", label: "复合后：投影到天空" },
  { id: "obs", label: "观测量与参数" },
];

export const concepts = [
  {
    id: "sw", name_zh: "Sachs–Wolfe 效应", name_en: "Sachs–Wolfe effect", icon: "🧗", section_id: "9.2", group: "rec",
    plain: R`大尺度上我们看到的温度 = 本征温度 $\Theta_0$ + 爬出势阱的引力红移 $\Psi$，合起来是 $-\mathcal R/5$。`,
    explain: R`视界外的模式不受因果物理影响：$\Theta_0+\Phi$ 守恒，等于 $\mathcal R$。复合时（物质期）$\Phi=\frac35\mathcal R$，于是 $\Theta_0=\frac25\mathcal R$；光子还要爬出势阱 $\Psi\simeq-\Phi$，可观测量 $\Theta_0+\Psi=-\frac15\mathcal R=-\frac16\delta_{\rm c}$。

关键结论是**符号**：过密区的光子本来更热（$\Theta_0>0$），但爬出势阱损失的能量更多，所以过密区在天上表现为**冷斑**。系数 $1/6$ 把 $\delta T/T\sim10^{-5}$ 与 $\delta\rho/\rho\sim6\times10^{-5}$ 联系起来。`,
    analogy: R`像从深井里往外扔球：井底的人扔得再用力（本征更热），球飞到地面时剩下的速度（我们看到的温度）也被井深（势阱）扣掉一大截，扣掉的比多给的还多。`,
    book_example: { what: R`式 (9.6)、(9.9) 与图 9.11 的 SW 高原。`, point: R`$l(l+1)C(l)$ 在低 $l$ 处近似为常数——原初扰动的"原貌"。` },
    misconception: R`"CMB 热斑 = 物质多的地方"——在大尺度上恰好相反；只有在声学峰尺度上，单极的符号随振荡相位而变。`,
  },
  {
    id: "tight", name_zh: "紧耦合与流体近似", name_en: "Tight coupling", icon: "🔗", section_id: "9.3.1", group: "rec",
    plain: R`复合前光子的平均自由程远小于扰动尺度，光子与重子像一种流体：只需单极（密度）和偶极（速度）。`,
    explain: R`Boltzmann 矩层级 \eqref{9.11} 中，散射项 $\tau'\Theta_l$ 远大于时间导数项，给出 $\Theta_l\sim(k/\tau')\Theta_{l-1}$：每升高一阶就多一个小因子 $k\lambda_{\rm MFP}$。物理上，观测者只能看到一个平均自由程以内的光子，那么小的区域里温度几乎均匀，看不到四极及以上的各向异性。

于是光子与重子由两个变量描述，重子速度锁定为 $u_{\rm b}=-3i\Theta_1$。把重子的惯性计入（展开到 $1/\tau'$ 一阶），就得到声速 $c_s=1/\sqrt{3(1+R)}$ 的振子方程。`,
    analogy: R`像拥挤的地铁车厢：每个人（光子）走一步就撞上别人（电子），没人能单独跑远，整车人只能整体涌动——这就是流体。`,
    book_example: { what: R`图 9.6 与式 (9.12)。`, point: R`$k/|\tau'|\ll1$ 的扰动只产生单极和很小的偶极。` },
    misconception: R`紧耦合不是"完全没有高阶矩"——四极矩 $\Theta_2\simeq-\frac{4k}{9\tau'}\Theta_1$ 虽小却不为零，扩散阻尼正来自它。`,
  },
  {
    id: "oscillator", name_zh: "受迫谐振子与声学峰", name_en: "Acoustic oscillations", icon: "🎻", section_id: "9.3.2", group: "rec",
    plain: R`光子压强是弹簧、重子是质量、引力势是外力；复合时恰好处在振荡极值的模式成为功率谱的峰。`,
    explain: R`\eqref{9.22}：$[\frac{d^2}{d\eta^2}+\frac{R'}{1+R}\frac{d}{d\eta}+k^2c_s^2](\Theta_0+\Phi)=\frac{k^2}3[\frac{\Phi}{1+R}-\Psi]$。暴胀给出的初条件只激发余弦模，所以 $\Theta_0+\Phi\propto\cos(kr_s)$，峰在 $k_{\rm pk}=n\pi/r_s$。

外力把振荡的零点推离原点：压缩（奇数峰）与引力同向、更深；稀疏（偶数峰）与引力反向、更浅。重子越多（$R$ 越大），零点偏移越大，奇偶峰越不对称。`,
    analogy: R`像挂在弹簧上、同时被重力拉着的砝码：平衡点下移，向下摆得比向上更远；砝码越重，不对称越明显。`,
    book_example: { what: R`箱 9.1、图 9.3 与图 9.2。`, point: R`低 $\Omega_{\rm b}$ 时振荡更快（峰更密），低 $\Omega_{\rm c}$ 时奇偶不对称减弱。` },
    misconception: R`峰对应的不是"最大的扰动尺度"，而是复合时刻**恰好处于振幅极值**的模式；单极为零的模式（谷）并不缺扰动，只是时机不对。`,
  },
  {
    id: "soundhorizon", name_zh: "声视界", name_en: "Sound horizon", icon: "📏", section_id: "9.3.2", group: "rec",
    plain: R`复合之前声波走过的共动距离 $r_s(\eta_*)\approx144\,\mathrm{Mpc}$——CMB 与 BAO 共用的标准尺。`,
    explain: R`$r_s(\eta)=\int_0^\eta c_s\,d\tilde\eta$ \eqref{9.24}，振荡相位就是 $kr_s$。它只依赖复合前的物理：$\Omega_{\rm b}h^2$（通过 $R$）与 $\Omega_{\rm m}h^2$（通过膨胀史与 $a_{\rm eq}$）。

声视界在天上张开的角度 $\theta_s=r_s/D_A$ 决定峰位，$l_{\rm pk}\sim\pi D_A/r_s$；这把尺的角大小测得极其精确（$\sim0.03\%$）。`,
    analogy: R`像在海边扔石子激起的波纹：波纹扩展的半径只取决于水的性质和时间；从远处看波纹的角大小，就能推算距离。`,
    book_example: { what: R`式 (9.27) 与图 9.7 的竖虚线；习题 9.4 的解析式 (9.85)。`, point: R`$k_{\rm pk}=n\pi/r_s$ 与完整数值解相差在 10% 以内。` },
    misconception: R`声视界不是光的视界：$c_s<1/\sqrt3$，所以 $r_s<\eta_*/\sqrt3$。`,
  },
  {
    id: "silk", name_zh: "扩散（Silk）阻尼", name_en: "Diffusion damping", icon: "🌫️", section_id: "9.4", group: "rec",
    plain: R`光子在两次散射之间随机行走，把小于扩散长度的温度起伏抹平：$\propto e^{-k^2/k_D^2}$。`,
    explain: R`粗略估计：一个哈勃时间里散射 $N=n_e\sigma_{\rm T}/H$ 次，随机行走距离 $\lambda_D\sim\lambda_{\rm MFP}\sqrt N$ \eqref{9.4}。严格处理把方程展开到 $1/\tau'$ 二阶，色散关系获得虚部 $\delta\omega\propto-ik^2/\tau'$，得到 \eqref{9.42}。

复合时自由电子骤减、平均自由程骤增，$k_D^{-1}$ 迅速变大（图 9.8 实线的上翘）；复合时 $k_D\approx0.14\,\mathrm{Mpc^{-1}}$，对应 $l\sim2000$ 以上的强烈衰减。重子越多，$n_e$ 越大，阻尼越弱。`,
    analogy: R`像一滴墨水在水中扩散：时间越长、分子碰撞越"松"，墨迹就越模糊，细节先消失。`,
    book_example: { what: R`图 9.4、9.8 与图 9.17 的 $l>1000$ 区域。`, point: R`高 $\Omega_{\rm b}h^2$ 时小尺度功率更高（阻尼移向更小尺度）。` },
    misconception: R`阻尼不是复合"之后"发生的；它在整个紧耦合期间累积，并在复合那一刻急剧加强——所以要用可见度函数加权 \eqref{9.60}。`,
  },
  {
    id: "visibility", name_zh: "可见度函数与最后散射面", name_en: "Visibility function", icon: "👁️", section_id: "9.5.1", group: "proj",
    plain: R`$g(\eta)=-\tau'e^{-\tau}$：光子在 $\eta$ 时刻最后一次被散射的概率密度，在 $z\approx1090$ 处有一个尖峰。`,
    explain: R`$\int g\,d\eta=1$。复合前 $\tau$ 极大，$e^{-\tau}$ 让 $g$ 为零；复合后散射率 $-\tau'$ 很小，$g$ 也很小。峰的宽度 $\Delta z\approx200$，远小于单极与 Bessel 函数变化的时间尺度（图 9.9）。

因此在视线积分里可以把慢变的因子在 $\eta_*$ 处取值、提出积分号外，$\int g\,d\eta=1$——这就是 \eqref{9.59} 的来源。这层"球壳"就是最后散射面。`,
    analogy: R`像透过逐渐散去的浓雾看灯塔：雾太浓时什么也看不见，雾全散了光已不再被它改变；我们看到的图像基本定格在"雾刚散开"的那一刻。`,
    book_example: { what: R`图 9.9（$l=220$、$k=0.02\,\mathrm{Mpc^{-1}}$）。`, point: R`$g$ 的宽度远窄于 $\Theta_0+\Psi$ 与 $j_l$ 的变化尺度。` },
    misconception: R`最后散射面并非无限薄：有限厚度会进一步抹平极小尺度的涨落，这正是要用 \eqref{9.60} 改进阻尼因子的原因之一。`,
  },
  {
    id: "freestream", name_zh: "自由流与投影", name_en: "Free streaming & projection", icon: "🔭", section_id: "9.5.1", group: "proj",
    plain: R`复合后光子直线飞来；波数 $k$ 的平面波在距离 $\chi_*$ 处张开的角度约 $1/(k\chi_*)$，于是贡献到 $l\sim k\eta_0$。`,
    explain: R`数学上，平面波 $e^{ik\mu(\eta-\eta_0)}$ 的 Legendre 投影是球 Bessel 函数 $j_l(k(\eta_0-\eta))$ \eqref{9.50}。$j_l(x)$ 在 $x<l$ 时极小（\eqref{9.61}），在 $l$ 略小于 $x$ 处达到峰值（图 9.13）。

所以一个 $k$ 模式主要贡献到 $l\lesssim k\eta_0$——真实峰位比 $k_{\rm pk}\eta_0$ 低约 25%；许多 $k$ 共同贡献同一个 $l$，把单模式的零点抹成了谷。`,
    analogy: R`像从远处看一堵画着条纹的墙：条纹正对你时看到的间距最小；墙上斜着的条纹投影到你视线上间距会变大——所以同一组条纹贡献到一系列（更大的）角尺度上。`,
    book_example: { what: R`图 9.5、图 9.13 与 \eqref{9.59}。`, point: R`第一峰 $l_{\rm pk}\simeq0.75\pi\eta_0/r_s\approx220$。` },
    misconception: R`复合后光子扰动不再"长大"：引力势太弱，困不住光子；与物质扰动增长几个数量级形成鲜明对比。`,
  },
  {
    id: "doppler", name_zh: "Doppler 项（偶极）", name_en: "Doppler term", icon: "🚑", section_id: "9.6.2", group: "proj",
    plain: R`复合时流体的速度（偶极 $3\Theta_1$）也产生各向异性；它与单极反相，并且不相干地相加。`,
    explain: R`紧耦合解中偶极 $\propto\sin(kr_s)$、单极 $\propto\cos(kr_s)$，两者相位差 $90^\circ$（就像振子的速度与位移）。偶极在投影中乘以 $j_l'$，单极乘以 $j_l$；对所有 $k$ 积分时交叉项 $\int j_lj_l'$ 很小（\exref{9.11}），二者的功率直接相加。

结果：偶极主要填平单极的谷，使峰显得不那么突出；振幅为单极 30% 的偶极只贡献约 10% 的 $C(l)$。`,
    analogy: R`像荡秋千：位移最大时速度为零，速度最大时位移为零；两者的"能量"轮流登场，总和比任一项都平滑。`,
    book_example: { what: R`图 9.7（单极与偶极）、图 9.12（红色虚线）。`, point: R`加入偶极后谷底被明显抬高。` },
    misconception: R`偶极并不比单极"小到可以忽略"——它在谷底处是主导贡献。`,
  },
  {
    id: "isw", name_zh: "积分 Sachs–Wolfe 效应", name_en: "Integrated Sachs–Wolfe", icon: "🎢", section_id: "9.6.2", group: "proj",
    plain: R`光子穿过随时间变化的势阱时，进出的能量不再抵消；早期（辐射残余）与晚期（暗能量）各产生一份。`,
    explain: R`\eqref{9.59} 最后一行 $\int d\eta\,e^{-\tau}(\Psi'-\Phi')j_l$。物质期势恒定，此项为零。复合时辐射尚未完全退场，势还在衰减——**早期 ISW**，发生在 $\eta_*$ 附近，与单极几乎同相（\eqref{9.81}），主要抬高第一峰；5% 的 ISW 振幅就能造成约 10% 的 $C(l)$ 变化。

$z\lesssim1$ 暗能量使势衰减——**晚期 ISW**，只影响 $l\lesssim30$，在图 9.11 中表现为最低 $l$ 处的上翘；最直接的探测是与低红移星系做互相关。`,
    analogy: R`像穿过一个正在变浅的山谷：下坡时得到的速度，在上坡时只需要还一部分，于是净赚了能量。`,
    book_example: { what: R`图 9.12 绿色点划线与图 9.11 的低 $l$ 上翘。`, point: R`$\Omega_{\rm c}h^2$ 越大，相等越早，复合后势衰减越少，早期 ISW 越弱。` },
    misconception: R`"ISW 只与暗能量有关"——早期 ISW 来自复合时残余的辐射，对第一峰的影响比晚期 ISW 大得多。`,
  },
  {
    id: "cl", name_zh: R`角功率谱 $C(l)$`, name_en: "Angular power spectrum", icon: "📊", section_id: "9.5.2", group: "obs",
    plain: R`把温度图展开成球谐函数，$a_{lm}$ 的方差就是 $C(l)$；$l(l+1)C(l)/2\pi$ 是每个对数 $l$ 区间的涨落方差。`,
    explain: R`理论只能预言 $a_{lm}$ 所服从分布的方差，不能预言具体值：$\langle a_{lm}a^*_{l'm'}\rangle=\delta_{ll'}\delta_{mm'}C(l)$。把随机的初始振幅 $\mathcal R$ 与确定的演化 $\mathcal T$ 分开，得到 $C(l)=\frac2\pi\int dk\,k^2P_{\mathcal R}(k)|\mathcal T_l(k)|^2$ \eqref{9.74}。

$l(l+1)C(l)$ 与三维的 $k^3P(k)$ 地位相同：尺度不变谱下在大角度近似为常数。`,
    analogy: R`像分析一段乐曲的频谱：我们不关心某一秒的具体波形，只关心每个音高上有多少"能量"。`,
    book_example: { what: R`式 (9.66)、(9.74) 与图 9.10。`, point: R`同一 $l$ 的 $2l+1$ 个 $a_{lm}$ 来自同一高斯分布。` },
    misconception: R`$C(l)$ 中的 $l$ 与 $\Theta_l$ 中的 $l$ 是同一个——这不是记号冲突，而是 \eqref{9.73} 角积分的结果。`,
  },
  {
    id: "cosmicvar", name_zh: "宇宙方差", name_en: "Cosmic variance", icon: "🎲", section_id: "9.5.2", group: "obs",
    plain: R`我们只有一个天空：每个 $l$ 只有 $2l+1$ 个样本，$C(l)$ 的估计有不可消除的相对误差 $\sqrt{2/(2l+1)}$。`,
    explain: R`四极矩 $l=2$ 只有 5 个 $a_{2m}$，即使测量完美，$C(2)$ 也有约 63% 的不确定度；$l=100$ 时降到约 10%。部分天区被银河系前景遮挡时，误差再放大约 $1/\sqrt{f_{\rm sky}}$。

这就是为什么低 $l$ 的数据点误差棒总是很大（图 9.11），也是为什么晚期 ISW、再电离等只影响低 $l$ 的效应很难被 CMB 单独约束。`,
    analogy: R`像只能掷 5 次骰子来估计骰子的方差——掷得再准也没用，样本太少。`,
    book_example: { what: R`式 (9.67) 与图 9.11 的误差棒。`, point: R`Planck 在 $l\lesssim2000$ 已达到宇宙方差极限。` },
    misconception: R`宇宙方差不是仪器噪声，更好的望远镜无法消除它；只有观测更多的"独立宇宙"（不可能）才行。`,
  },
  {
    id: "params", name_zh: "参数依赖与简并", name_en: "Parameters & degeneracies", icon: "🎛️", section_id: "9.7", group: "obs",
    plain: R`峰位量出角直径距离（曲率、$\Lambda$），峰高比量出 $\Omega_{\rm b}h^2$ 与 $\Omega_{\rm c}h^2$，整体振幅与 $\tau_{\rm rei}$ 简并。`,
    explain: R`CMB 物理关心的是**物理密度** $\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$，而不是 $\Omega$ 本身。曲率与 $\Lambda$ 只在晚期起作用，通过 $D_A$ 整体平移峰位，二者彼此简并（需要大尺度结构打破）。再电离让 $l\gtrsim100$ 的 $C(l)$ 乘以 $e^{-2\tau_{\rm rei}}$，与 $\mathcal A_s$ 简并——$\tau_{\rm rei}$ 是 $\mathcal A_s$ 误差的最大来源。

$\Omega_{\rm b}h^2$：奇偶峰比 + 声视界 + 阻尼尺度；$\Omega_{\rm c}h^2$：驱动力 + 相等时刻 + 早期 ISW。这些"指纹"各不相同，所以两者都被测到百分之一以内。`,
    analogy: R`像用一张远处的照片推断一栋楼：楼层间距（峰距）告诉你距离，窗户的明暗交替（奇偶峰）告诉你结构，照片整体的亮度（振幅）却和天气（再电离雾）分不开。`,
    book_example: { what: R`图 9.15–9.18。`, point: R`Planck 数据排除了图中所示的全部参数变化。` },
    misconception: R`"CMB 测出了 $H_0$"——CMB 直接测的是 $\Omega_{\rm m}h^2$ 与角直径距离的组合；推出 $H_0$ 需要假设平直 $\Lambda$CDM 等模型。`,
  },
];

export const relations = [
  { from: "tight", to: "oscillator", label: "两变量流体" },
  { from: "oscillator", to: "soundhorizon", label: R`相位 $kr_s$` },
  { from: "tight", to: "silk", label: R`有限 $\lambda_{\rm MFP}$` },
  { from: "sw", to: "cl", label: "大角度高原" },
  { from: "oscillator", to: "cl", label: "声学峰" },
  { from: "silk", to: "cl", label: "小尺度衰减" },
  { from: "visibility", to: "freestream", label: R`在 $\eta_*$ 处取值` },
  { from: "freestream", to: "cl", label: R`$l\sim k\eta_0$` },
  { from: "doppler", to: "cl", label: "填平谷底" },
  { from: "isw", to: "cl", label: "抬高第一峰 / 低 l" },
  { from: "cl", to: "cosmicvar", label: R`$2l+1$ 个样本` },
  { from: "soundhorizon", to: "params", label: "标准尺" },
  { from: "cl", to: "params", label: "形状 → 参数" },
];

export const TAKEAWAYS = [
  <TxI>{R`**大尺度（SW）**：视界外 $\Theta_0+\Phi=\mathcal R$；物质期复合时可观测量 $\Theta_0+\Psi=-\frac15\mathcal R=-\frac16\delta_{\rm c}$，过密区是冷斑；$l(l+1)C(l)$ 在低 $l$ 近似为常数。`}</TxI>,
  <TxI>{R`**声学振荡**：紧耦合下光子–重子是流体，$\Theta_0+\Phi$ 满足受迫振子方程 \eqref{9.22}，声速 $c_s=1/\sqrt{3(1+R)}$；绝热初条件只激发余弦模，峰在 $k_{\rm pk}=n\pi/r_s$，重子加大奇偶峰不对称。偶极与单极相差 $90^\circ$。`}</TxI>,
  <TxI>{R`**扩散阻尼**：保留四极、展开到 $1/\tau'^2$ 得到 $e^{-k^2/k_D^2}$，$k_D^{-2}=\int d\eta\,[R^2/(1+R)+8/9]/[6(1+R)n_e\sigma_{\rm T}a]$；复合时阻尼长度急剧增大。`}</TxI>,
  <TxI>{R`**自由流**：视线积分 + 尖锐的可见度函数给出 \eqref{9.59}：$\Theta_l(\eta_0)=(\Theta_0+\Psi)j_l+3\Theta_1j_l'+\text{ISW}$；$k$ 模式贡献到 $l\lesssim k\eta_0$；$C(l)=\frac2\pi\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2$，宇宙方差 $\sqrt{2/(2l+1)}$。`}</TxI>,
  <TxI>{R`**参数**：峰位 ↔ $D_A/r_s$（曲率、$\Lambda$）；奇偶峰比与阻尼 ↔ $\Omega_{\rm b}h^2$；驱动与早期 ISW ↔ $\Omega_{\rm c}h^2$；整体振幅 $\mathcal A_se^{-2\tau_{\rm rei}}$；倾斜 ↔ $n_s$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`大尺度上，复合时过密区（$\Psi<0$）的光子在今天看来是：`,
    options: ["更热，因为本征温度更高", R`更冷，因为爬出势阱损失的能量超过了本征温度的增加`, "与平均温度相同", "取决于观测频率"],
    answer: 1, why: R`$\Theta_0=-\frac23\Psi>0$，但 $\Theta_0+\Psi=\frac13\Psi<0$（\eqref{9.6}、\eqref{9.9}）。`,
  },
  {
    q: R`为什么紧耦合时光子的四极及更高阶矩可以忽略？`,
    options: ["因为引力势很小", R`因为每升高一阶矩就多一个因子 $k/\tau'=k\lambda_{\rm MFP}\ll1$`, "因为偏振抵消了它们", "因为复合前宇宙是均匀的"],
    answer: 1, why: R`由 \eqref{9.11}：$\Theta_l\sim-\frac{k}{\tau'}\frac{l}{2l+1}\Theta_{l-1}$（\eqref{9.12}）。`,
  },
  {
    q: R`增加重子密度（其他不变），声学峰会怎样？`,
    options: ["所有峰等比例升高", R`声速降低，峰位移向更大 $l$（略），奇数峰相对偶数峰升高，阻尼移向更小尺度`, "峰位不变，只有第一峰升高", "峰消失"],
    answer: 1, why: R`$c_s=1/\sqrt{3(1+R)}$ 变小，$r_s$ 变小；零点偏移 $\propto R$ 加大奇偶不对称；$n_e$ 变大使 $k_D$ 变大（图 9.17）。`,
  },
  {
    q: R`为什么偶极（Doppler）项对 $C(l)$ 的贡献比"直觉"小？`,
    options: ["偶极在复合时为零", R`它与单极反相，并且投影后交叉项 $\int j_lj_l'$ 几乎为零，功率不相干地相加：30% 的振幅只贡献约 10% 的 $C(l)$`, "偶极被扩散完全抹掉", "偶极只影响 l=1"],
    answer: 1, why: R`见 \secref{9.6.2} 与 \exref{9.11}。`,
  },
  {
    q: R`在保持其他参数不变的情况下让宇宙变为开放（$\Omega_K>0$），峰会：`,
    options: [R`移向更大的 $l$（更小角尺度）`, R`移向更小的 $l$`, "高度改变而位置不变", "完全不受影响"],
    answer: 0, why: R`开放宇宙中光线发散，到最后散射面的角直径距离更大，同一物理尺度张角更小（图 9.14、9.15）。`,
  },
  {
    q: R`再电离光深 $\tau_{\rm rei}$ 增大时，$C(l)$ 的变化是：`,
    options: ["所有 l 都乘以相同因子", R`$l\gtrsim100$ 乘以 $e^{-2\tau_{\rm rei}}$，最大尺度几乎不变——因此与 $\mathcal A_s$ 简并`, "只有低 l 降低", "峰位移动"],
    answer: 1, why: R`只有再电离时已在视界内的扰动被散射抹平（\eqref{9.82}），图 9.16。`,
  },
];

export const BRIDGE = R`本章只处理了温度。可是 Thomson 散射还会让 CMB 线偏振：只要最后散射时光子分布有四极矩，散射后的光就带有偏振。下一章我们会看到，偏振在紧耦合期同样被压低、在复合时由四极矩（$\propto k\Theta_1/\tau'$）产生，因而与偶极同相；它把温度谱中简并的参数（尤其是再电离光深 $\tau_{\rm rei}$）分离开来，而 B 模偏振更是寻找原初引力波（张量–标量比 $r$）最灵敏的探针——本章习题 9.15–9.17 已经初步算出了引力波对温度谱的贡献。`;
