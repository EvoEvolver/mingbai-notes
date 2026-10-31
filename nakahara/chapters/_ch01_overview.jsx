// 第 1 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一个粒子，同时走过所有的路";
export const HOOK = R`扔出一个球，它沿抛物线飞行——Newton 说这是因为每一时刻的力决定了加速度。Lagrange 与 Hamilton 换了一个角度：在所有连接起点与终点的轨道里，真实的那一条让**作用量** $S=\int L\,\dd t$ 取极值。这听起来像哲学，直到 Feynman 把它变成了量子力学：量子粒子**不选**轨道，它把每一条可能的路径都走一遍，每条路径贡献一个相位 $\mathrm{e}^{\mathrm{i}S/\hbar}$；$\hbar\to0$ 时，只有作用量稳定的那一条附近的相位不相互抵消——经典轨道就这样"浮现"出来。

同一套语言能走得很远。把时间转到虚轴，振荡的相位变成 Boltzmann 权重，路径积分就成了统计力学的配分函数。电子是费米子，它需要一种"平方为零"的数——Grassmann 数——于是玻色子给出 $1/\sqrt{\det}$，费米子给出 $\det$。再往前一步，要求物理与"相位怎么选"无关，就逼出了规范场；而规范场可以在空间里打一个拓扑的结：磁单极的磁通只能是 $\hbar c/2e$ 的整数倍，瞬子的作用量至少是 $8\pi^2|Q|$。

本章是全书的物理底稿。后面每一个几何概念——流形、微分形式、纤维丛、联络、示性类、指标——都会回到这里找到它的物理身份。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "1.1", title: "分析力学：作用量、Hamilton 方程、Noether", gist: R`$\delta S=0$ ⇒ Euler–Lagrange 方程；Legendre 变换得 $H$ 与正则方程；Poisson 括号 $\dot A=[A,H]$；对称性 ⇒ 守恒量。`, gives: ["1.3", "1.5", "1.15", "1.17", "1.20", "1.25"], next: R`把 Poisson 括号换成对易子，就进入量子力学。` },
  { sec: "1.2", title: "正则量子化", gist: R`态 = Hilbert 空间中的射线，$[\hat q,\hat p]=\mathrm{i}$；Heisenberg/Schrödinger 绘景；$\hat p=-\mathrm{i}\,\dd/\dd x$，$\langle x|p\rangle=\mathrm{e}^{\mathrm{i}px}/\sqrt{2\pi}$；谐振子谱 $(n+\tfrac12)\omega$。`, gives: ["1.32", "1.42", "1.50", "1.55", "1.66", "1.74"], next: R`跃迁振幅 $\langle x_f|\mathrm{e}^{-\mathrm{i}\hat HT}|x_i\rangle$ 能否只用 Lagrange 量写出？` },
  { sec: "1.3", title: "玻色粒子的路径积分", gist: R`切成 $n$ 段，每段是 $\sqrt{m/2\pi\mathrm{i}\varepsilon}\,\mathrm{e}^{\mathrm{i}\Delta S}$；$\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$；虚时间 → 配分函数（周期路径）；源 $J$ → 生成泛函与编时关联函数。`, gives: ["1.92", "1.95", "1.97", "1.109", "1.113", "1.129"], next: R`用一个可以算到底的例子检验这台机器。` },
  { sec: "1.4", title: "谐振子：算到底", gist: R`二次作用量 ⇒ 展开精确截断；Jacobi 行列式的发散与无穷乘积相消，得 $(m\omega/2\pi\mathrm{i}\sin\omega T)^{1/2}\mathrm{e}^{\mathrm{i}S_{\rm c}}$；$\zeta$ 正规化 $\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2)=2\beta$，顺便证明 $\sinh$ 的乘积公式。`, gives: ["1.135", "1.149", "1.150", "1.159", "1.162", "1.165"], next: R`费米子没有经典对应——需要新的"数"。` },
  { sec: "1.5", title: "费米子：Grassmann 数", gist: R`$\theta^2=0$；积分 = 求导，换元乘 $\det a$；$\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*M\theta}=\det M$，$\det a=\operatorname{Pf}(a)^2$；相干态、反周期边界，$Z=2\cosh(\beta\omega/2)$。`, gives: ["1.167", "1.179", "1.181", "1.187", "1.189", "1.199", "1.201", "1.205"], next: R`从一个自由度推广到无穷多个：场。` },
  { sec: "1.6", title: "标量场的量子化", gist: R`Klein–Gordon 方程；$Z_0[J]=Z_0[0]\mathrm{e}^{-\frac{\mathrm{i}}2\int J\Delta J}$，$\Delta$ 为 Feynman 传播子；$Z_0[0]=(\operatorname{Det})^{-1/2}$；相互作用的微扰展开、Green 函数、有效作用量。`, gives: ["1.210", "1.215", "1.216", "1.218", "1.227", "1.228"], next: R`费米场：同样的结构，行列式翻到分子。` },
  { sec: "1.7", title: "Dirac 场的量子化", gist: R`Grassmann 值的场；$Z_0[\bar\eta,\eta]=Z_0[0,0]\mathrm{e}^{-\mathrm{i}\int\bar\eta S\eta}$；$Z_0[0,0]=\operatorname{Det}(\mathrm{i}\partial\!\!\!/-m)$。`, gives: ["1.234", "1.236", "1.240"], next: R`要求局域相位不可观测，就必须引入规范场。` },
  { sec: "1.8", title: "规范理论与 Higgs 机制", gist: R`$A_\mu\to A_\mu+\partial_\mu\chi$；协变导数 $\nabla_\mu$；非 Abel：$\mathcal{F}=\partial\mathcal{A}-\partial\mathcal{A}+g[\mathcal{A},\mathcal{A}]\to U\mathcal{F}U^\dagger$；Higgs 真空期望值给规范场质量 $ev$。`, gives: ["1.244", "1.245", "1.253", "1.262", "1.264", "1.267", "1.274"], next: R`规范势不一定能在全空间用一个函数写出来。` },
  { sec: "1.9", title: "磁单极与电荷量子化", gist: R`$\boldsymbol{B}=g\boldsymbol{r}/r^3$ 没有全局矢势；Wu–Yang 用两张卡 $\boldsymbol{A}^{\rm N},\boldsymbol{A}^{\rm S}$，赤道上差 $\operatorname{grad}(2g\phi)$；波函数单值 ⇒ $2eg/\hbar c\in\mathbb{Z}$。`, gives: ["1.277", "1.280a", "1.281", "1.284", "1.287"], next: R`四维 Euclid 空间里，规范场也能打拓扑结。` },
  { sec: "1.10", title: "瞬子", gist: R`有限作用量 ⇒ 无穷远纯规范 ⇒ $S^3\to\mathrm{SU}(2)$ 的绕数 $Q$；$S\ge8\pi^2|Q|$，自对偶解取等号；BPST：$f=r^2/(r^2+\lambda^2)$，$Q=1$。`, gives: ["1.293", "1.295", "1.297", "1.299", "1.303", "1.305"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "1.3", to: "1.5", label: R`$\delta S=0$` },
  { from: "1.5", to: "1.15", label: "Legendre 变换" },
  { from: "1.15", to: "1.17", label: "+ E–L 方程" },
  { from: "1.17", to: "1.23", label: "链式法则" },
  { from: "1.20", to: "1.23", label: "" },
  { from: "1.23", to: "1.25", label: "对称变换" },
  { from: "1.22", to: "1.32", label: R`$[\,,]_{\rm PB}\to-\mathrm{i}[\,,]$` },
  { from: "1.32", to: "1.50", label: "平移算符" },
  { from: "1.50", to: "1.55", label: "解 ODE" },
  { from: "1.32", to: "1.74", label: "升降算符" },
  { from: "1.55", to: "1.92", label: "插入动量基" },
  { from: "1.91", to: "1.92", label: "Fresnel 积分" },
  { from: "1.92", to: "1.97", label: R`切片 $n\to\infty$` },
  { from: "1.3", to: "1.97", label: R`$\mathrm{e}^{\mathrm{i}S}$` },
  { from: "1.97", to: "1.113", label: R`$t=-\mathrm{i}\tau$，取迹` },
  { from: "1.97", to: "1.129", label: R`加源 $J$` },
  { from: "1.97", to: "1.149", label: "二次展开" },
  { from: "1.149", to: "1.150", label: R`$T=-\mathrm{i}\beta$` },
  { from: "1.159", to: "1.162", label: R`$\zeta(0),\zeta'(0)$` },
  { from: "1.162", to: "1.165", label: "两种算法比较" },
  { from: "1.150", to: "1.165", label: "" },
  { from: "1.181", to: "1.187", label: "换元" },
  { from: "1.187", to: "1.189", label: "两份相乘" },
  { from: "1.187", to: "1.201", label: R`$\det B_N$` },
  { from: "1.199", to: "1.201", label: "反周期" },
  { from: "1.201", to: "1.205", label: R`$\zeta$ 正规化比较` },
  { from: "1.187", to: "1.240", label: "场论版" },
  { from: "1.243", to: "1.253", label: "局域化" },
  { from: "1.253", to: "1.264", label: "非 Abel" },
  { from: "1.281", to: "1.287", label: "波函数单值" },
  { from: "1.295", to: "1.299", label: "Bogomolny" },
  { from: "1.297", to: "1.299", label: "" },
];
export const EQMAP_LABELS = {
  "1.3": "作用量", "1.5": "Euler–Lagrange", "1.15": "Legendre 变换", "1.17": "正则方程", "1.20": "Poisson 括号", "1.22": "基本括号",
  "1.23": R`$\dot A=[A,H]$`, "1.25": "Noether 荷", "1.32": "正则对易关系", "1.50": R`$\hat p=-\mathrm{i}\partial_x$`, "1.55": R`$\langle x|p\rangle$`,
  "1.74": "谐振子谱", "1.91": "Fresnel 积分", "1.92": "短时传播子", "1.97": "路径积分", "1.113": "配分函数", "1.129": "生成泛函",
  "1.149": "谐振子传播子", "1.150": R`$Z=1/2\sinh$`, "1.159": R`$\zeta$ 正规化`, "1.162": R`$\operatorname{Det}=2\beta$`, "1.165": R`$\sinh$ 乘积`,
  "1.181": "Grassmann 换元", "1.187": R`$\int\mathrm{e}^{-\theta^*M\theta}=\det M$`, "1.189": R`$\det=\operatorname{Pf}^2$`, "1.199": "费米子的迹",
  "1.201": R`$Z=2\cosh$`, "1.205": R`$\cosh$ 乘积`, "1.240": "费米子行列式", "1.243": "规范变换", "1.253": "协变导数",
  "1.264": "Yang–Mills 场强", "1.281": "Wu–Yang 转移函数", "1.287": "Dirac 量子化", "1.295": "自对偶", "1.297": "瞬子数", "1.299": R`$S\ge8\pi^2|Q|$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "cl", label: "经典力学" },
  { id: "qm", label: "量子化" },
  { id: "pi", label: "路径积分技术" },
  { id: "gt", label: "规范场与拓扑" },
];

export const concepts = [
  {
    id: "action", name_zh: "作用量与变分原理", name_en: "Action & Hamilton's principle", icon: "🎯", section_id: "1.1.2", group: "cl",
    plain: R`$S=\int L\,\dd t$ 给每条轨道一个数；真实轨道让 $S$ 取稳定值。`,
    explain: R`Hamilton 原理把"每时刻的力"改写成"整条轨道的极值"：$\delta S=0$ 的局部形式就是 Euler–Lagrange 方程 $\partial L/\partial q-\tfrac{\dd}{\dd t}\partial L/\partial\dot q=0$。取 $L=T-V$ 即回到 Newton 方程。

关键在于：作用量对**任意**轨道都有定义，不只是真实轨道。路径积分正是要用到所有非经典轨道的作用量。`,
    analogy: R`像光的 Fermat 原理：光在所有可能路线中走"光程稳定"的那条；作用量就是力学里的"光程"。`,
    book_example: { what: R`式 (1.10)：谐振子 $L=\tfrac12m\dot x^2-\tfrac12kx^2$ 给出 $m\ddot x+kx=0$。`, point: "选对了 L，运动方程就是变分的副产品。" },
    misconception: R`"最小"作用量原理并不总是最小：时间足够长时（谐振子 $T>\pi/\omega$）经典轨道是鞍点，见交互图 1。`,
  },
  {
    id: "hamilton", name_zh: "Hamilton 形式、Poisson 括号与 Noether 定理", name_en: "Hamiltonian formalism", icon: "🌀", section_id: "1.1.3", group: "cl",
    plain: R`用 $(q,p)$ 代替 $(q,\dot q)$：一阶方程 $\dot A=[A,H]$；对称变换的生成元守恒。`,
    explain: R`Legendre 变换 $H=\sum p\dot q-L$ 把二阶 Euler–Lagrange 方程变成相空间中的一阶流。Poisson 括号 $[A,B]=\sum(\partial_qA\,\partial_pB-\partial_pA\,\partial_qB)$ 是 Lie 括号；$H$ 生成时间演化，守恒量 $Q$ 生成对称变换 $\delta q=\varepsilon[q,Q]$（Noether 定理 \sref{T1.1}）。

量子化时，Poisson 括号原封不动地变成对易子（乘 $-\mathrm{i}$）。`,
    analogy: R`相空间像一张"流速图"：$H$ 规定了每一点水往哪里流；守恒量是沿着流不变的"等高线"。`,
    book_example: { what: R`例 1.4：平面中心势的 $H$ 不含 $\theta$，于是 $p_\theta=mr^2\dot\theta$（角动量）守恒。`, point: "找守恒量 = 找使 H 不变的变换。" },
    misconception: R`$[A,H]=0$ 才守恒，$[H,Q]=0$ 等价——但 $\dd Q/\dd t=[Q,H]=-[H,Q]$，符号别弄反（原书证明的最后一步正是在这里差了一个负号）。`,
  },
  {
    id: "canonical_q", name_zh: "正则量子化", name_en: "Canonical quantization", icon: "⚛️", section_id: "1.2.2", group: "qm",
    plain: R`态是 Hilbert 空间中的矢量，物理量是 Hermite 算符，$[\hat q,\hat p]=\mathrm{i}\hbar$。`,
    explain: R`五条公理：态矢（射线）、可观测量 = Hermite 算符、Poisson 括号 → $-\mathrm{i}/\hbar$ 乘对易子、期望值 $\langle\psi|\hat A|\psi\rangle$、任何态都是某个可观测量的本征态。由此推出 Heisenberg 方程、Schrödinger 方程、坐标表象 $\hat p=-\mathrm{i}\,\dd/\dd x$ 与 $\langle x|p\rangle=\mathrm{e}^{\mathrm{i}px}/\sqrt{2\pi}$。`,
    analogy: R`经典力学是"地图上的点"，量子力学是"地图上的波"：$|\psi(x)|^2$ 告诉你在哪里找到粒子的可能性多大。`,
    book_example: { what: R`引理 1.1：$\mathrm{e}^{-\mathrm{i}a\hat p}|x\rangle=|x+a\rangle$——动量是平移的生成元。`, point: R`$\hat p=-\mathrm{i}\,\dd/\dd x$ 不是假设，而是推论。` },
    misconception: R`位置本征态 $|x\rangle$ 不在 $L^2$ 里（范数无穷），只能归一化到 $\delta$ 函数——严格处理需要装备 Hilbert 空间。`,
  },
  {
    id: "oscillator", name_zh: "谐振子", name_en: "Harmonic oscillator", icon: "🎵", section_id: "1.2.5", group: "qm",
    plain: R`$E_n=(n+\tfrac12)\omega$；升降算符 $[\hat a,\hat a^\dagger]=1$；路径积分可以精确算出。`,
    explain: R`代数解法：$\hat H=(\hat N+\tfrac12)\omega$，$\hat a$ 降、$\hat a^\dagger$ 升，正定性迫使谱从 0 开始。路径积分解法（§1.4）：二次作用量使围绕经典解的展开精确截断，传播子为 $(m\omega/2\pi\mathrm{i}\sin\omega T)^{1/2}\mathrm{e}^{\mathrm{i}S_{\rm c}}$，配分函数为 $1/(2\sinh\tfrac{\beta\omega}2)$。

自由场是无穷多个谐振子；费米振子是它的反对易版本。`,
    analogy: R`像一架只有等间距琴键的钢琴：最低的一个键也有声音——零点能 $\tfrac12\omega$。`,
    book_example: { what: R`式 (1.149) 与 (1.151)：两种方法得到同一个配分函数。`, point: "能精确求解的例子是检验整台机器的标尺。" },
    misconception: R`零点能 $\tfrac12\omega$ 不是可以随便丢掉的常数：它决定了 $\beta\to\infty$ 时 $-\tfrac1\beta\ln Z\to\tfrac12\omega$，费米振子则给出 $-\tfrac12\omega$。`,
  },
  {
    id: "path_integral", name_zh: "路径积分", name_en: "Path integral", icon: "🕸️", section_id: "1.3.1", group: "pi",
    plain: R`跃迁振幅 = 对所有路径求 $\mathrm{e}^{\mathrm{i}S}$ 之和。`,
    explain: R`把时间切成 $n$ 段，每段的短时传播子 $\sqrt{m/2\pi\mathrm{i}\varepsilon}\,\mathrm{e}^{\mathrm{i}\Delta S}$（命题 1.2），对中间点积分：$\langle x_f,t_f|x_i,t_i\rangle=\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$。测度与作用量各自没有良好定义，它们的组合（\eqref{1.95} 的极限）有。被积函数是普通的数，所以路径积分自动给出编时乘积。

推广到场：$Z[J]=\int\mathcal{D}\phi\,\mathrm{e}^{\mathrm{i}S[\phi]+\mathrm{i}\int J\phi}$。`,
    analogy: R`像水波穿过有无数小孔的屏：到达终点的振幅是从每一条路线传来的小波的叠加，相位相近的叠加，相位乱的相消。`,
    book_example: { what: R`例 1.5：自由粒子用路径积分算出的振幅与正则量子化的结果 (1.101) 完全一致，对每个 $n$ 都精确成立。`, point: "两种量子化给出同一个物理。" },
    misconception: R`路径积分中的"路径"大多处处不可微（布朗运动式的），$v=(x_k-x_{k-1})/\varepsilon$ 发散；连续写法 $\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$ 只是记号。`,
  },
  {
    id: "euclid", name_zh: "虚时间、配分函数与生成泛函", name_en: "Euclidean time & generating functional", icon: "🌡️", section_id: "1.3.2", group: "pi",
    plain: R`$t=-\mathrm{i}\tau$：$\mathrm{e}^{\mathrm{i}S}\to\mathrm{e}^{-S_E}$，取迹 = 周期路径；加源 $J$ 求导得关联函数。`,
    explain: R`Wick 转动把量子力学变成统计力学：$Z(\beta)=\Tr\,\mathrm{e}^{-\beta\hat H}=\int_{\rm periodic}\bar{\mathcal{D}}x\,\mathrm{e}^{-S_E}$。无穷长虚时间投影出基态，于是生成泛函 $Z[J]=\langle0|U^J|0\rangle$ 对 $J$ 的 $n$ 阶泛函导数给出 $n$ 点编时关联函数。

玻色子的迹是周期路径，费米子的迹是**反周期**路径。`,
    analogy: R`虚时间像"冷却"：$\mathrm{e}^{-E\tau}$ 让高能态迅速衰减，长时间后只剩基态——就像热水放久了只剩室温。`,
    book_example: { what: R`式 (1.113)：配分函数是长度为 $\beta$ 的周期路径上的积分。`, point: "逆温度 = 虚时间的周期。" },
    misconception: R`Wick 转动不是简单的变量替换：它依赖于 $\mathrm{e}^{-\mathrm{i}\hat Ht}$ 在下半平面的解析性，即 $\hat H$ 的谱有下界。`,
  },
  {
    id: "zeta_reg", name_zh: R`函数行列式与 $\zeta$ 正规化`, name_en: "Functional determinant & zeta-regularization", icon: "♾️", section_id: "1.4.2", group: "pi",
    plain: R`Gauss 路径积分 = 算符行列式的 $-\tfrac12$ 次方；发散的本征值乘积用 $\exp(-\zeta'(0))$ 定义。`,
    explain: R`$\int\bar{\mathcal{D}}y\,\mathrm{e}^{-\frac12\int y\mathcal{O}y}=(\operatorname{Det}\mathcal{O})^{-1/2}$。本征值之积发散；谱 $\zeta$ 函数 $\zeta_{\mathcal{O}}(s)=\sum\lambda_n^{-s}$ 在大 $\mathrm{Re}\,s$ 收敛，解析延拓后 $\operatorname{Det}\mathcal{O}=\exp[-\zeta'_{\mathcal{O}}(0)]$。例：$\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2)=2\beta$（Riemann $\zeta$），反周期版本给出 2（Hurwitz $\zeta$）。`,
    analogy: R`像给一个发散级数"开发票"：不是说 $1+1+1+\cdots$ 真等于 $-\tfrac12$，而是在一套自洽的记账规则下它只能记作 $-\tfrac12$。`,
    book_example: { what: R`式 (1.162)–(1.165)：比较两种算法，"证明"了 $\prod(1+x^2/n^2)=\sinh\pi x/\pi x$。`, point: "用物理的两种算法得到数学恒等式。" },
    misconception: R`有意义的是行列式的**比值**或对参数的依赖；整体常数依赖于测度的归一化。`,
  },
  {
    id: "grassmann", name_zh: "Grassmann 数与 Berezin 积分", name_en: "Grassmann numbers", icon: "🔀", section_id: "1.5.2", group: "qm",
    plain: R`反对易的数：$\theta_i\theta_j=-\theta_j\theta_i$，$\theta^2=0$；积分就是求导。`,
    explain: R`Grassmann 代数就是外代数（$\theta_i\leftrightarrow\dd x^i$）。Berezin 积分 $\int\dd\theta\,1=0$、$\int\dd\theta\,\theta=1$；换元 $\theta'=a\theta$ 时 $\dd\theta=\det a\,\dd\theta'$（与普通积分相反）。所以 Gauss 积分给出 $\det M$ 而不是 $(\det M)^{-1}$；实反对称型给出 Pfaffian，$\det a=\operatorname{Pf}(a)^2$。相干态 $|\theta\rangle=|0\rangle+|1\rangle\theta$ 把费米算符变成 Grassmann 变量。`,
    analogy: R`像只能用一次的车票：每个 $\theta_i$ 在一个乘积里最多出现一次，交换顺序要付一个负号。`,
    book_example: { what: R`式 (1.187)：$\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*M\theta}=\det M$；交互图 3 在浏览器里逐项展开验证。`, point: "费米子的行列式在分子上。" },
    misconception: R`Grassmann 数没有大小、不能比较，也不能做除法；"$\int\dd\theta$ 是面积"的直觉完全不适用。`,
  },
  {
    id: "fermion_det", name_zh: "费米子路径积分与行列式", name_en: "Fermionic path integral", icon: "🧲", section_id: "1.5.10", group: "pi",
    plain: R`费米振子：$Z=2\cosh(\beta\omega/2)$；迹 = 反周期路径；场论里 $Z=\operatorname{Det}(\mathrm{i}\partial\!\!\!/-m)$。`,
    explain: R`费米振子 $H=(c^\dagger c-\tfrac12)\omega$ 只有两个能级。用相干态的完备性插入切片，迹要求 $\langle-\theta|$（引理 1.4），即反周期边界；离散化后是 $\det B_N=1+(1-\beta\omega/N)^N$。Dirac 场的生成泛函同样给出 $\operatorname{Det}$（\eqref{1.240}）。`,
    analogy: R`玻色子与费米子像账本的借方与贷方：玻色子贡献 $1/\sqrt{\det}$，费米子贡献 $\det$；若谱配对，两者恰好对冲——这就是超对称与指标定理的会计学。`,
    book_example: { what: R`式 (1.201) 与 (1.204)：两种算法比较得到 $\cosh$ 的无穷乘积 (1.205)。`, point: "反周期频率 $\pi(2n-1)/\beta$ 正是 cosh 的零点。" },
    misconception: R`若把迹中的 $\langle-\theta|$ 换成 $\langle\theta|$（周期边界），算出的不是配分函数而是 $\Tr(-1)^F\mathrm{e}^{-\beta H}$——指标定理恰恰要用后者。`,
  },
  {
    id: "gauge", name_zh: "规范对称性与协变导数", name_en: "Gauge symmetry", icon: "🔗", section_id: "1.8", group: "gt",
    plain: R`要求局域相位变换不可观测，就必须有规范场；$\nabla_\mu=\partial_\mu-\mathrm{i}eA_\mu$。`,
    explain: R`$\psi\to\mathrm{e}^{-\mathrm{i}e\alpha(x)}\psi$ 时 $\partial_\mu\psi$ 多出 $\partial_\mu\alpha$ 项，由 $A_\mu\to A_\mu-\partial_\mu\alpha$ 抵消。非 Abel 推广：$\mathcal{A}\to U\mathcal{A}U^\dagger+g^{-1}U\partial U^\dagger$，场强 $\mathcal{F}=\partial\mathcal{A}-\partial\mathcal{A}+g[\mathcal{A},\mathcal{A}]=g^{-1}[\nabla,\nabla]$ 协变变换。Higgs 机制让规范场获得质量 $ev$。

几何上：$\mathcal{A}$ 是纤维丛上的联络，$\mathcal{F}$ 是曲率（第 10 章）。`,
    analogy: R`像各地使用不同的货币：要比较两地的价格，必须知道沿途的"汇率"——规范场就是这张汇率表，场强是绕一圈回来汇率不闭合的程度。`,
    book_example: { what: R`式 (1.251)–(1.254)：最小耦合 $\partial\to\nabla$ 使 QED Lagrange 量规范不变。`, point: "对称性决定相互作用的形式。" },
    misconception: R`规范"对称性"其实是描述上的冗余，不是真正的物理对称性；非 Abel 场强本身也不是规范不变的，只有 $\Tr\mathcal{F}^2$ 等才是。`,
  },
  {
    id: "monopole", name_zh: "Dirac 单极与电荷量子化", name_en: "Dirac monopole", icon: "🧭", section_id: "1.9", group: "gt",
    plain: R`磁单极没有全局矢势；两张卡上的矢势差一个规范变换，单值性要求 $2eg/\hbar c\in\mathbb{Z}$。`,
    explain: R`$\boldsymbol{B}=g\boldsymbol{r}/r^3$ 的磁通 $4\pi g\neq0$，而 $\oint\operatorname{curl}\boldsymbol{A}\cdot\dd\boldsymbol{S}=0$，所以不存在处处光滑的 $\boldsymbol{A}$。Wu–Yang：北半球 $\boldsymbol{A}^{\rm N}$、南半球 $\boldsymbol{A}^{\rm S}$，赤道上 $\boldsymbol{A}^{\rm N}-\boldsymbol{A}^{\rm S}=\operatorname{grad}(2g\phi)$；磁通 = 转移函数的增量。波函数相位 $\mathrm{e}^{-2\mathrm{i}eg\phi/\hbar c}$ 单值 ⇒ Dirac 量子化。`,
    analogy: R`像给地球画地图：一张平面地图总有一处要撕开（Dirac 弦），用南北两张地图在赤道处粘起来就没有撕口——但粘合方式里藏着一个整数。`,
    book_example: { what: R`式 (1.284)：$\Phi=\oint_{\rm equator}\operatorname{grad}(2g\phi)\cdot\dd\boldsymbol{s}=4\pi g$。`, point: "拓扑荷住在粘合处。" },
    misconception: R`Dirac 弦不是物理的：它的位置可以通过规范变换移动；物理的是那个整数 $n=2eg/\hbar c$（第一 Chern 数）。`,
  },
  {
    id: "instanton", name_zh: "瞬子与拓扑荷", name_en: "Instanton", icon: "🌐", section_id: "1.10", group: "gt",
    plain: R`Euclid 规范场的拓扑非平凡局部极小：$Q\in\mathbb{Z}$，$S\ge8\pi^2|Q|$，自对偶时取等号。`,
    explain: R`有限作用量要求无穷远处 $\mathcal{A}\to U^{-1}\partial U$，$U:S^3\to\mathrm{SU}(2)\cong S^3$ 有绕数 $Q$（$\pi_3(S^3)=\mathbb{Z}$）。$-\int\Tr(\mathcal{F}\pm*\mathcal{F})^2\ge0$ 给出 Bogomolny 下界；自对偶方程 $\mathcal{F}=*\mathcal{F}$ 是一阶的，且自动满足二阶场方程。BPST 解：$\mathcal{A}=\tfrac{r^2}{r^2+\lambda^2}U^{-1}\partial U$，$Q=1$，$S=8\pi^2$，大小 $\lambda$ 任意（四维 Yang–Mills 的标度不变性）。`,
    analogy: R`像把一条皮带扣在柱子上拧了一圈：只要两端固定（无穷远纯规范），这一圈拧转就解不开，而拧转需要的最小"弹性能"正比于拧的圈数。`,
    book_example: { what: R`式 (1.299)–(1.305)；交互图 4 数值核对 $\mathcal{F}=*\mathcal{F}$、$S=8\pi^2$、$Q=1$。`, point: "拓扑给出能量的下界。" },
    misconception: R`瞬子不是粒子，而是 Euclid 时空中局域的"事件"；物理上它描述不同拓扑真空之间的隧穿，振幅 $\propto\mathrm{e}^{-8\pi^2/g^2}$。`,
  },
];

export const relations = [
  { from: "action", to: "hamilton", label: "Legendre 变换" },
  { from: "hamilton", to: "canonical_q", label: R`括号 → 对易子` },
  { from: "canonical_q", to: "oscillator", label: "升降算符" },
  { from: "action", to: "path_integral", label: R`权重 $\mathrm{e}^{\mathrm{i}S}$` },
  { from: "canonical_q", to: "path_integral", label: "切片 + 完备基" },
  { from: "path_integral", to: "euclid", label: "Wick 转动" },
  { from: "euclid", to: "zeta_reg", label: "Gauss → Det" },
  { from: "oscillator", to: "zeta_reg", label: "精确可解" },
  { from: "grassmann", to: "fermion_det", label: "Berezin 积分" },
  { from: "euclid", to: "fermion_det", label: "反周期" },
  { from: "hamilton", to: "gauge", label: "对称性" },
  { from: "gauge", to: "monopole", label: "两张卡" },
  { from: "gauge", to: "instanton", label: "纯规范" },
  { from: "fermion_det", to: "instanton", label: "反常 / 指标" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**作用量是主角**：$\delta S=0$ 给出经典力学（Euler–Lagrange、Hamilton 方程、Noether 定理）；$\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$ 给出量子力学，经典轨道是稳相点。`}</TxI>,
  <TxI>{R`**两种量子化，一个物理**：正则量子化 $[\hat q,\hat p]=\mathrm{i}$ 与路径积分对自由粒子 \eqref{1.101}/\eqref{1.104}、谐振子 \eqref{1.149}–\eqref{1.151} 给出相同的结果；路径积分自动编时，Wick 转动后就是配分函数。`}</TxI>,
  <TxI>{R`**Gauss 积分三兄弟**：实玻色 $(\det)^{-1/2}$，复玻色 $(\det)^{-1}$，费米（Grassmann）$(\det)^{+1}$；$\det a=\operatorname{Pf}(a)^2$。无穷维时用 $\zeta$ 函数正规化 $\operatorname{Det}\mathcal{O}=\mathrm{e}^{-\zeta'_{\mathcal{O}}(0)}$。`}</TxI>,
  <TxI>{R`**边界条件即统计**：玻色子的迹是周期路径（$Z=1/2\sinh\tfrac{\beta\omega}2$），费米子的迹是反周期路径（$Z=2\cosh\tfrac{\beta\omega}2$）；两种算法相比较"证明"了 $\sinh$、$\cosh$ 的无穷乘积。`}</TxI>,
  <TxI>{R`**规范场携带拓扑**：局域相位不变性 ⇒ 协变导数与场强；磁单极要两张卡，单值性 ⇒ $2eg/\hbar c\in\mathbb{Z}$；瞬子数 $Q\in\mathbb{Z}$ 给出 $S\ge8\pi^2|Q|$。这些整数就是后面各章的同伦群、Chern 数与指标。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`在交互图 1 中，谐振子（$\omega=1$）的时间 $T$ 从 2 增加到 4，$n=1$ 扰动模式的二阶变分系数 $\tfrac T4[(\pi/T)^2-1]$ 发生了什么？这说明什么？`,
    options: [R`始终为正：经典轨道永远是作用量的最小值`, R`在 $T=\pi$ 处变号：越过焦点后经典轨道只是稳定点（鞍点），不是最小值`, R`始终为零：作用量与扰动无关`, R`在 $T=2\pi$ 处变号`],
    answer: 1, why: R`$(\pi/T)^2-1$ 在 $T=\pi$ 处变号。路径积分只需要 $\delta S=0$（稳相），不需要极小值；越过焦点时传播子 \eqref{1.149} 的前因子 $1/\sqrt{\sin\omega T}$ 多出 Maslov 相位。`,
  },
  {
    q: R`为什么短时传播子 \eqref{1.92} 中势能取在中点 $V(\tfrac{x+y}2)$？`,
    options: [R`这是任意的约定，取端点完全等价且误差相同`, R`推导中 $\mathcal{O}(\varepsilon)$ 的修正项 $\tfrac{\mathrm{i}\varepsilon}2(x-y)V'(x)$ 恰好把 $V(x)$ 平移到中点（Weyl 排序）`, R`为了使传播子幺正`, R`因为 $V$ 必须是偶函数`],
    answer: 1, why: R`见命题 1.2 证明第 5 步。不同的取法在 $N\to\infty$ 时都收敛到同一结果，但收敛速度不同——交互图 2 显示中点规则误差 $\propto1/N$，端点平均 $\propto1/N^2$。`,
  },
  {
    q: R`$\int\dd\theta_1^*\dd\theta_1\dd\theta_2^*\dd\theta_2\,\exp(-\sum_{ij}\theta_i^*M_{ij}\theta_j)$，$M=\begin{pmatrix}2&1\\0&3\end{pmatrix}$，等于多少？`,
    options: [R`$\pi^2/6$`, R`$1/6$`, R`$6$`, R`$\sqrt6$`],
    answer: 2, why: R`Grassmann Gauss 积分等于 $\det M=6$（\eqref{1.187}）。普通复 Gauss 积分才给出 $\pi^2/\det M$（\eqref{1.153}）。`,
  },
  {
    q: R`费米振子配分函数的路径积分中，为什么要用反周期边界条件 $\theta(\beta)=-\theta(0)$？`,
    options: [R`因为 Pauli 原理禁止周期轨道`, R`为了让行列式不为零`, R`在相干态中写出迹时，Grassmann 数越过左矢产生的符号使迹等于 $\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*\theta}\langle-\theta|\mathrm{e}^{-\beta H}|\theta\rangle$（引理 1.4）`, R`这只是为了与玻色子区分的约定`],
    answer: 2, why: R`负号是 Grassmann 代数的代数后果。若用周期边界，得到的是 $\Tr(-1)^F\mathrm{e}^{-\beta H}=\mathrm{e}^{\beta\omega/2}-\mathrm{e}^{-\beta\omega/2}$，即 $\det B_N$ 中 $1+\to1-$。`,
  },
  {
    q: R`Wu–Yang 磁单极中，为什么不能用一个处处光滑的矢势？`,
    options: [R`因为 $\boldsymbol{B}$ 在原点发散`, R`因为闭曲面上 $\oint\operatorname{curl}\boldsymbol{A}\cdot\dd\boldsymbol{S}=0$，而磁通是 $4\pi g\neq0$`, R`因为 Maxwell 方程不允许磁荷`, R`因为球坐标在两极奇异`],
    answer: 1, why: R`Stokes/Gauss 定理：闭曲面没有边界，光滑矢势的旋度通量必为零。于是必须用两张卡，磁通被转移函数 $\Lambda=2g\phi$ 的增量"记录"下来（\eqref{1.284}）。`,
  },
  {
    q: R`BPST 瞬子满足 $S=8\pi^2$。若一个规范场位形的瞬子数 $Q=-2$，它的 Euclid 作用量至少是多少？`,
    options: [R`$0$`, R`$8\pi^2$`, R`$16\pi^2$`, R`$-16\pi^2$`],
    answer: 2, why: R`Bogomolny 下界 $S\ge8\pi^2|Q|=16\pi^2$（\eqref{1.299}），在反自对偶解上取等号。作用量非负，下界只依赖于拓扑。`,
  },
];

export const BRIDGE = R`本章用物理学家的语言反复遇到了几何与拓扑：位形空间是"空间 $M$"、相空间带着辛结构、Grassmann 代数就是外代数、磁单极要用两张坐标卡粘起来、瞬子由 $S^3\to\mathrm{SU}(2)$ 的绕数刻画。第 2 章先把需要的数学准备齐全——映射、向量空间、拓扑空间、同胚与拓扑不变量（如 Euler 示性数）。从第 3 章起，我们将逐一把本章的"整数"精确化：同调群（第 3 章）、同伦群 $\pi_3(S^3)=\mathbb{Z}$（第 4 章）、流形与微分形式（第 5–6 章）、纤维丛与联络（第 9–10 章）以及 Chern 数（第 11 章）。`;
