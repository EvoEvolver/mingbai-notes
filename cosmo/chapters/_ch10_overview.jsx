// 第 10 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "天空上的一根根\"小棒\"";
export const HOOK = R`2014 年 3 月，BICEP2 团队宣布在南极上空的一小块天区里看到了 CMB 偏振中的"旋涡"——B 模，并把它解读为暴胀产生的原初引力波。一年之后，与 Planck 的联合分析表明，那片信号几乎全部来自银河系尘埃的偏振辐射。这场乌龙恰恰说明了 B 模为什么值得全世界的实验组前赴后继：**在线性理论中，普通的密度（标量）扰动根本产生不了 B 模**。只要能把前景和引力透镜扣干净，任何残留的原初 B 模都直接指向引力波，进而指向暴胀的能标 $H_{\rm inf}$。

偏振本身来自一个朴素的过程：复合前后，自由电子把光子散射进我们的视线。如果电子"看到"的入射辐射各向同性，散射光不偏振；只有入射辐射存在**四极**各向异性——两个方向热、另外两个方向冷——散射光才会在一个方向上更亮。于是 CMB 偏振是四极矩的一张快照，比温度各向异性小两个数量级，却携带着温度给不了的信息：TE 互相关在大角度上为负，证明扰动在进入视界之前就已存在；最低几个多极矩上的"再电离凸起"直接称出再电离光深 $\tau_{\rm rei}$。这一章，我们把偏振图样分解成 E 和 B 两部分，用 Thomson 散射的几何算出单个平面波产生的偏振，解出偏振的 Boltzmann 方程，最后说明为什么引力波会留下 B 模。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "10.1", title: "偏振的描述：Stokes 参数与 E/B 分解", gist: R`偏振是"无头矢量"，由 $2\times2$ 对称张量 $I_{ij}$ 描述（\eqref{10.1}–\eqref{10.2}）；$Q$、$U$ 依赖坐标。平直天空下把无迹部分按二维波矢 $\boldsymbol l$ 分解为标量 $E$ 与赝标量 $B$（\eqref{10.5}–\eqref{10.11}）。`, gives: ["10.2", "10.5", "10.7", "10.9", "10.11", "10.12"], next: R`有了描述偏振的语言，接下来问：物理上是什么产生了偏振？` },
  { sec: "10.2", title: "Compton 散射如何产生偏振（图像）", gist: R`散射光不能沿出射方向偏振。单向入射 → 完全偏振；各向同性或偶极入射 → 不偏振；只有**四极**入射产生偏振。紧耦合压低四极，故偏振很弱。`, gives: [], next: R`把图像变成公式：对入射方向积分，看四极如何进入 $Q$、$U$。` },
  { sec: "10.3", title: "单个平面波产生的偏振", gist: R`偏振依赖的散射截面 \eqref{10.13} 对入射方向积分，得 $Q\propto-\int f\sin^2\theta'\cos2\phi'$（\eqref{10.19}），只挑出 $Y_{2,\pm2}$。代入标量平面波的四极，$Q=4\pi A\sin^2\theta_k\Theta_2$ 且无 $U$——标量扰动只产生 E 模（\eqref{10.28}–\eqref{10.29}）。`, gives: ["10.19", "10.20", "10.25", "10.27", "10.28", "10.29"], next: R`散射源已知，就能写出偏振的 Boltzmann 方程并求解。` },
  { sec: "10.4", title: "偏振的 Boltzmann 方程及其解", gist: R`$\Theta_P$ 满足与 $\Theta$ 相同的自由流项，源为 $\frac34(1-\mu^2)\Pi$（\eqref{10.31}）。视线积分 + 瞬时退耦近似 + 小尺度近似给出 $E_l\simeq\frac{15}{8}\Theta_2(\eta_*)\frac{l^2}{(k\eta_0)^2}j_l$，紧耦合下 $\propto(k/\tau')\Theta_1$（\eqref{10.42}）。`, gives: ["10.31", "10.35", "10.38", "10.40", "10.41", "10.42"], next: R`把单个平面波的结果叠加，就得到可观测的功率谱。` },
  { sec: "10.5", title: "偏振功率谱", gist: R`$C_{EE}$ 与 $C_{TE}$ 由 \eqref{10.44}、\eqref{10.46} 给出；$C_{BB}=0$。EE 约为 TT 的 $1/50$、峰更尖锐、与 TT 反相、阻尼更弱；$30\lesssim l\lesssim200$ 的 TE 反相关证明扰动起源于视界外；$l<10$ 的再电离凸起测出 $\tau_{\rm rei}$。`, gives: ["10.43", "10.44", "10.45", "10.46"], next: R`标量只给 E。那什么能给 B？` },
  { sec: "10.6", title: "探测引力波", gist: R`张量扰动的光子分布绕 $\hat{\boldsymbol k}$ 不对称（$\propto\sin2\phi$、$\cos2\phi$），产生的四极相对标量情形转 $45^\circ$。$h_\times$ 在投影沿 $x$ 轴的配置下产生 $U\propto\cos\alpha$（\eqref{10.50}），即 B 模——原初 B 模是引力波的"确凿证据"。`, gives: ["10.47", "10.48", "10.49", "10.50"], next: R`小结：偏振的两个自由度各自讲了什么。` },
  { sec: "10.7", title: "小结", gist: R`E 模：标量扰动的第二套观测量（TE 反相关、再电离光深）；B 模：引力波的探针，受透镜与前景污染。` , gives: [] },
];

// ---------- 推导图 ----------
export const EQMAP_EB = [
  { from: "10.1", to: "10.2", label: R`对称；非偏振 $\propto\delta_{ij}$` },
  { from: "10.2", to: "10.4", label: "分出迹" },
  { from: "10.4", to: "10.5", label: R`按 $\boldsymbol l$ 分解` },
  { from: "10.5", to: "10.7", label: R`缩并 $l^il^j/l^2$` },
  { from: "10.5", to: "10.8", label: R`减去 $E$ 部分` },
  { from: "10.8", to: "10.9", label: "定义 B" },
  { from: "10.7", to: "10.11", label: "" },
  { from: "10.9", to: "10.11", label: "" },
  { from: "10.11", to: "10.12", label: R`$\phi_l=0$` },
];
export const EQMAP_SC = [
  { from: "10.13", to: "10.15", label: R`对 $\hat{\boldsymbol n}'$ 积分` },
  { from: "10.15", to: "10.19", label: R`基矢 (10.16)–(10.18)` },
  { from: "10.19", to: "10.23", label: R`$f\to-5\Theta_2\mathcal P_2$ (10.22)` },
  { from: "10.23", to: "10.25", label: R`积分 $=\frac\pi2\cdot\frac{16}{15}$` },
  { from: "10.25", to: "10.27", label: R`$\hat{\boldsymbol k}$ 在 $x$–$z$ 平面` },
  { from: "10.27", to: "10.28", label: R`一般 $\phi_k$（习题 10.2）` },
  { from: "10.12", to: "10.28", label: R`纯 $Q$ ⇒ 纯 E` },
  { from: "10.28", to: "10.29", label: R`$\cos\theta_k\to\hat{\boldsymbol n}\cdot\hat{\boldsymbol k}$` },
];
export const EQMAP_BZ = [
  { from: "10.27", to: "10.30", label: R`源 $\propto-\tau'(1-\mu^2)\Theta_2$` },
  { from: "10.30", to: "10.31", label: "加入入射偏振" },
  { from: "10.31", to: "10.33", label: "视线积分" },
  { from: "10.33", to: "10.35", label: R`可见度 $g$` },
  { from: "10.35", to: "10.36", label: "瞬时退耦" },
  { from: "10.36", to: "10.38", label: R`取 $\mathcal P_l$ 矩` },
  { from: "10.38", to: "10.40", label: R`(10.39)：$l\gg1$` },
  { from: "10.40", to: "10.41", label: R`$\Pi=\frac52\Theta_2$` },
  { from: "10.41", to: "10.42", label: "(9.36)" },
  { from: "10.42", to: "10.44", label: R`叠加，$\mathcal T^E_l$` },
  { from: "10.43", to: "10.46", label: "与温度相关" },
  { from: "10.47", to: "10.49", label: R`绕 $y$ 轴转 $-\alpha$` },
  { from: "10.48", to: "10.49", label: "" },
  { from: "10.49", to: "10.50", label: R`代入 (10.20)` },
];
export const EQMAP_LABELS = {
  "10.1": "探测强度", "10.2": "偏振张量", "10.4": "迹 + 无迹", "10.5": "E / TT 分解", "10.7": R`$E$ 与 $Q,U$`, "10.8": R`$I^{\rm TT}_{12}$`, "10.9": R`$B$ 与 $Q,U$`, "10.11": "E/B 矩阵形式", "10.12": "单个模式",
  "10.13": "偏振截面", "10.15": R`出射 $Q$`, "10.19": R`$Q\propto Y_{2,\pm2}$`, "10.23": R`$\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_x$`, "10.25": R`$Q=4\pi A\Theta_2$`, "10.27": R`$\sin^2\theta_k$`, "10.28": "一般方向", "10.29": R`$E(\hat{\boldsymbol n},\boldsymbol k)$`,
  "10.30": "启发式方程", "10.31": "偏振 Boltzmann", "10.33": "形式解", "10.35": "可见度形式", "10.36": "瞬时退耦", "10.38": R`$E_l$`, "10.40": "小尺度", "10.41": R`$E_l\propto\Theta_2$`, "10.42": R`$E_l\propto\Theta_1$`,
  "10.43": R`$\mathcal T^E_l$`, "10.44": R`$C_{EE}$`, "10.46": R`$C_{TE}$`, "10.47": R`$\hat{\boldsymbol k}(\alpha)$`, "10.48": R`$h_\times$ 四极`, "10.49": "旋转", "10.50": R`$U\propto\cos\alpha$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "describe", label: "描述偏振" },
  { id: "generate", label: "偏振如何产生" },
  { id: "observe", label: "观测意义" },
];

export const concepts = [
  {
    id: "stokes", name_zh: "Stokes 参数与偏振张量", name_en: "Stokes parameters", icon: "🕶️", section_id: "10.1", group: "describe",
    plain: R`用一个 $2\times2$ 对称矩阵记下"哪个方向更亮"：迹是强度 $I$，另外两个数是 $Q$、$U$。`,
    explain: R`在探测器前放一个偏振片并旋转它，探测到的强度随偏振片方向 $\hat{\boldsymbol m}$ 变化。由于偏振片转 $180^\circ$ 结果不变，强度只能是 $\hat{\boldsymbol m}$ 的二次型 $I_{ij}\hat m^i\hat m^j$。对称矩阵 $I_{ij}$ 有三个独立分量：$I$（总强度）、$Q$（$x$ 方向比 $y$ 方向亮多少）、$U$（$45^\circ$ 方向比 $-45^\circ$ 方向亮多少）。第四个 Stokes 参数 $V$ 描述圆偏振，宇宙学扰动不产生它。

于是光子不再只由一个分布函数描述，而要多出 $f_Q$、$f_U$ 两个。`,
    analogy: R`像描述一块布的纹理：总亮度之外，还要记下"纹理沿哪个方向"以及"纹理有多明显"。$Q$ 与 $U$ 分别是在两套相差 $45^\circ$ 的十字尺上读到的纹理强度。`,
    book_example: { what: R`\figref{10.2}：$Q>0$ 沿 $x$，$Q<0$ 沿 $y$，$U>0$ 沿 $45^\circ$，$U<0$ 沿 $-45^\circ$。`, point: R`四种基本形态各对应一个 Stokes 参数的正负号。` },
    misconception: R`$Q$、$U$ 不是"两种偏振"，而是同一个偏振在某个坐标系下的两个分量；换个坐标系，它们就互相混合。`,
  },
  {
    id: "headless", name_zh: "无头矢量与自旋 2", name_en: "Headless vector (spin 2)", icon: "↕️", section_id: "10.1", group: "describe",
    plain: R`偏振方向没有箭头，转 $180^\circ$ 不变；因此 $Q$、$U$ 在坐标转 $\alpha$ 时按 $2\alpha$ 混合。`,
    explain: R`温度在天空上是标量：换坐标轴，每一点的温度不变。偏振不是：若坐标绕视线转 $\alpha$，$Q'=Q\cos2\alpha+U\sin2\alpha$、$U'=-Q\sin2\alpha+U\cos2\alpha$（\exref{10.1}）。角度加倍是"无头"的直接后果：转 $180^\circ$ 必须回到原样，所以只能出现 $2\alpha$。这类量叫自旋 2 量。

正因为 $Q$、$U$ 依赖坐标，不能直接拿它们做功率谱——这就是 E/B 分解要解决的问题。`,
    analogy: R`一根筷子放在桌上：转 $180^\circ$ 和没转一模一样，而一支箭转 $180^\circ$ 就掉头了。偏振像筷子，不像箭。`,
    book_example: { what: R`\figref{10.1}：偏振片转 $180^\circ$ 测得同样的强度。`, point: R`"无头"决定了 $I_{\rm det}$ 是 $\hat{\boldsymbol m}$ 的二次函数（\eqref{10.1}）。` },
    misconception: R`坐标转 $90^\circ$ 时 $Q\to-Q$、$U\to-U$，并不是偏振"反了"，偏振本身没动，只是参考轴换了。`,
  },
  {
    id: "flatsky", name_zh: "平直天空近似", name_en: "Flat-sky approximation", icon: "🗺️", section_id: "10.1", group: "describe",
    plain: R`小块天空近似成平面，用二维 Fourier 波矢 $\boldsymbol l$ 代替球谐函数的 $(l,m)$。`,
    explain: R`在全天上描述自旋 2 场要用自旋加权球谐函数，代数繁重。本章把天空上的位置 $\boldsymbol\theta$ 当作平面上的二维矢量，Fourier 变换后每个模式由二维波矢 $\boldsymbol l$ 标记（\eqref{10.3}）。代价是结果只在小角尺度（$l\gg1$）上严格成立，但物理一点不少。

同样的数学在第 13 章描述星系形状（引力透镜剪切）时几乎原封不动地再用一次。`,
    analogy: R`站在地上看脚下的一小块地面，它看起来是平的；用平面地图做局部测量足够精确，只是不能拿来画整个地球。`,
    book_example: { what: R`温度的二维 Fourier 变换 $T(\boldsymbol l)=\int d^2\theta\,T(\boldsymbol\theta)e^{i\boldsymbol l\cdot\boldsymbol\theta}$（\eqref{10.3}）。`, point: R`$\boldsymbol l$ 的模就是多极数 $l$，方向 $\phi_l$ 是全天处理中没有的新信息。` },
    misconception: R`平直天空不是"假设天空是平的"，而是只关心小于一弧度的尺度；\eqref{10.44}、\eqref{10.46} 本身在全天也成立。`,
  },
  {
    id: "eb", name_zh: "E 模与 B 模", name_en: "E and B modes", icon: "🌀", section_id: "10.1", group: "describe",
    plain: R`以每个 Fourier 模式自己的波矢为参照，偏振平行/垂直于它的是 E，与它成 $45^\circ$ 的是 B。`,
    explain: R`$Q$、$U$ 依赖固定的 $x$、$y$ 轴；但每个 Fourier 模式自带一个方向 $\boldsymbol l$。以它为参照重新定义：$E=\cos2\phi_l\,Q+\sin2\phi_l\,U$，$B=-\sin2\phi_l\,Q+\cos2\phi_l\,U$（\eqref{10.7}、\eqref{10.9}）。这相当于把 $Q$、$U$ 转到"沿 $\boldsymbol l$ 的坐标系"中读数，所以与外部坐标无关。

E 模的偏振方向与强度变化方向平行或垂直，像点电荷的电场；B 模与之成 $45^\circ$，像磁场，在径向波叠加时呈旋涡状（\figref{10.4}）。`,
    analogy: R`麦田里的垄沟：垄沟方向与"起伏方向"一致或垂直是 E；斜着 $45^\circ$ 走是 B。无论你站在哪个角度拍照，这个判断都不变。`,
    book_example: { what: R`\figref{10.3}：沿 $x$ 方向的单个平面波，E 模棒在波峰沿 $x$、波谷沿 $y$；B 模棒都是 $\pm45^\circ$。`, point: R`沿 $x$ 的模只有 $Q$ 就是纯 E，只有 $U$ 就是纯 B（\eqref{10.12}）。` },
    misconception: R`E/B 不是在某一点上就能判断的局部性质——单独一根偏振棒无所谓 E 或 B，要看它与周围强度变化方向的关系（即 Fourier 空间中的定义）。`,
  },
  {
    id: "parity", name_zh: "宇称：E 偶 B 奇", name_en: "Parity of E and B", icon: "🪞", section_id: "10.1", group: "describe",
    plain: R`镜像翻转后 E 图样不变，B 图样的旋向反转、变号。`,
    explain: R`在二维中宇称相当于只翻转 $x$ 轴：$Q\to Q$，$U\to-U$，$\phi_l\to\pi-\phi_l$，于是 $E\to E$，$B\to-B$（\exref{10.1}）。所以 E 是真正的标量（与温度同类），B 是赝标量。

推论：若宇宙在统计上宇称守恒，$C_{TB}$ 与 $C_{EB}$ 应为零；标量扰动的方位对称保证它不产生 B。`,
    analogy: R`左手和右手的螺纹：镜子里右旋螺丝变成左旋（B），而一排辐条（E）照镜子还是辐条。`,
    book_example: { what: R`\figref{10.4} 中 B 模的"旋涡"在镜像后转向相反。`, point: R`B 的符号记录了手征。` },
    misconception: R`"B 是赝标量"不等于 B 违反宇称；它只是说 B 在宇称下变号，B 的功率谱 $C_{BB}$ 仍是宇称偶的。`,
  },
  {
    id: "thomson", name_zh: "Thomson 散射的偏振依赖", name_en: "Polarization dependence of Thomson scattering", icon: "⚡", section_id: "10.2", group: "generate",
    plain: R`散射光只保留垂直于出射方向的那部分电场，截面正比于 $|\hat{\boldsymbol\epsilon}\cdot\hat{\boldsymbol\epsilon}'|^2$。`,
    explain: R`电子在入射电场驱动下振荡，向外辐射；沿振荡方向它不辐射。所以一束从 $+x$ 入射、被散射到 $+z$ 的光，原来沿 $z$ 振荡的分量完全丢失，只剩沿 $y$ 的分量——出射光完全偏振（\figref{10.5} 左）。定量地说，出射偏振 $i$ 的散射振幅平方多出因子 $\sum_j|\hat{\boldsymbol\epsilon}_i\cdot\hat{\boldsymbol\epsilon}'_j|^2$（\eqref{10.13}）。

这是第 5 章忽略了的散射角依赖；它也产生了 \eqref{5.67} 中的 $\frac12\mathcal P_2(\mu)\Pi$ 项。`,
    analogy: R`像透过百叶窗看光：入射光的"振动方向"若沿着你的视线，就被窗叶挡住，只有横向的振动漏得进来。`,
    book_example: { what: R`\figref{10.5} 左：沿 $x$ 入射的非偏振光被散射到 $z$ 后只剩 $y$ 偏振。`, point: R`单个方向入射时，散射天然产生偏振。` },
    misconception: R`Thomson 散射是弹性的（频率不变），它产生的是线偏振，不改变光子能量，也不产生圆偏振。`,
  },
  {
    id: "quad_source", name_zh: "只有四极产生偏振", name_en: "Quadrupole as the sole source", icon: "✚", section_id: "10.3", group: "generate",
    plain: R`各向同性和偶极入射都给出非偏振散射光；只有入射强度的四极矩（$l=2$）才产生偏振。`,
    explain: R`出射 $Q$ 的角权重为 $-\sin^2\theta'\cos2\phi'\propto Y_{2,2}+Y_{2,-2}$，$U$ 的为 $-\sin^2\theta'\sin2\phi'\propto Y_{2,2}-Y_{2,-2}$（\eqref{10.19}–\eqref{10.20}）。球谐函数正交，积分只挑出入射分布的 $l=2,m=\pm2$ 分量。

图像上（\figref{10.6}）：出射的 $x$ 向强度来自 $\pm y$ 入射，$y$ 向强度来自 $\pm x$ 入射。偶极下 $+x$ 热、$-x$ 冷，平均后与 $\pm y$ 一样，不偏振；四极下 $\pm x$ 都热、$\pm y$ 都冷，出射 $y$ 向更亮——偏振了。`,
    analogy: R`像两组人从四面推一根柱子：东西两边一强一弱（偶极）合力只是平移，不会把柱子"压扁"；东西两边都强、南北两边都弱（四极）才会把它压成椭圆。`,
    book_example: { what: R`\figref{10.6} 右：$\pm x$ 方向较热的四极入射产生 $Q<0$、$U=0$ 的偏振。`, point: R`四极转 $45^\circ$，偏振就转到 $U$。` },
    misconception: R`偏振不是由温度扰动本身（单极）产生的；温度很大的单极扰动若没有四极，偏振为零。`,
  },
  {
    id: "scalar_E", name_zh: "标量扰动只产生 E 模", name_en: "Scalars produce only E", icon: "🎯", section_id: "10.3", group: "generate",
    plain: R`单个标量平面波绕 $\hat{\boldsymbol k}$ 方位对称，偏振只能对齐（或垂直于）$\hat{\boldsymbol k}$ 的投影——纯 E。`,
    explain: R`标量模式只有一个特殊方向 $\hat{\boldsymbol k}$；光子分布只依赖 $\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'$。取 $\hat{\boldsymbol k}$ 在 $x$–$z$ 平面内，散射只产生 $Q=4\pi A\sin^2\theta_k\Theta_2$，没有 $U$（\eqref{10.27}）；由 \eqref{10.12}，沿 $x$ 的模只有 $Q$ 就是纯 E。一般方向下 $Q$、$U$ 按 $\cos2\phi_k$、$\sin2\phi_k$ 变化，恰是 E 模的形式（\eqref{10.28}）。

偏振的两个方向——偏振方向与强度变化方向——都只能"看向" $\boldsymbol k$，所以必然平行或垂直。`,
    analogy: R`一个完全轴对称的陀螺：无论从哪个角度看，它的纹理都只能沿着轴或绕着轴，不可能"斜着拧"。`,
    book_example: { what: R`\figref{10.8}：沿 $x$ 的标量扰动在电子处产生绕 $x$ 轴对称的四极，观测到的偏振棒沿 $x$ 或 $y$。`, point: R`对照 \figref{10.3}，毫无疑问是 E 模。` },
    misconception: R`这只对**线性**标量扰动成立；引力透镜等非线性效应会把 E 转化成 B。`,
  },
  {
    id: "tight_supp", name_zh: "紧耦合压低与相位", name_en: "Tight-coupling suppression", icon: "🔒", section_id: "10.4", group: "generate",
    plain: R`紧耦合时四极被 $k/\tau'$ 压低，所以偏振小；又因四极 $\propto$ 偶极，偏振与温度的声学振荡错开半拍。`,
    explain: R`紧耦合下 $\Theta_2=-\frac{4k}{9\tau'}\Theta_1$（\eqref{9.36}），于是 $E_l\simeq-\frac{5k}{6\tau'(\eta_*)}\Theta_1\frac{l^2}{(k\eta_0)^2}j_l$（\eqref{10.42}）。三个结论：(1) 偏振比温度小一个因子 $k/\tau'$（退耦时）；(2) $E_l\propto\Theta_1$，偶极与单极相位差 $90^\circ$，所以 EE 的峰谷与 TT 错开；(3) 没有 ISW 类比——偏振不受晚期变化的势影响。

又因为偶极受光子扩散影响较小，EE 在小尺度上的阻尼比 TT 弱。`,
    analogy: R`一群人手拉手跑步（紧耦合），队形几乎不会变形（四极小）；只有在松手前一刻、跑得最快的地方，队形才被拉扯得略微变形——这正是速度（偶极）最大的时刻。`,
    book_example: { what: R`\figref{10.9}：EE 约为 TT 的 $1/50$，峰更尖锐，与 TT 交错。`, point: R`都由 $E_l\propto\Theta_1$ 解释。` },
    misconception: R`EE 比 TT 小不是因为探测器不灵敏，而是物理上四极被紧耦合压低。`,
  },
  {
    id: "te_anti", name_zh: "TE 反相关", name_en: "TE anticorrelation", icon: "⚖️", section_id: "10.5", group: "observe",
    plain: R`$30\lesssim l\lesssim200$ 上温度与 E 模反相关，说明扰动在进入视界之前就已存在。`,
    explain: R`只有余弦模被激发（视界外初条件，\eqref{9.26}、\eqref{9.28}）时，温度与偏振才有确定的相位关系，给出相干的峰谷与 TE 符号。$l\sim30$ 对应复合时仍在视界外的尺度；在视界内产生扰动的模型（哪怕小心地只产生余弦模）也无法在这些尺度上产生关联。

所以大角度上的负 $C_{TE}$ 是"扰动起源于很早（暴胀）"的有力证据，Planck 已高精度测到（\figref{10.10}）。`,
    analogy: R`若一群钟摆在你推之前就已同步摆动，你在任何距离上都能看到它们步调一致；若是你临时去推，远处（视界外）的钟摆根本还没收到消息。`,
    book_example: { what: R`\figref{10.10}：Planck 测得的 $\mathcal D^{TE}_l$，在 $30\lesssim l\lesssim200$ 为负。`, point: R`理论曲线与数据在全部尺度上吻合。` },
    misconception: R`TE 反相关不是来自"有余弦模"这一点就能在视界内解释的；关键是它出现在复合时的**超视界**尺度。`,
  },
  {
    id: "reion", name_zh: "再电离凸起", name_en: "Reionization bump", icon: "🌅", section_id: "10.5", group: "observe",
    plain: R`再电离后电子再次散射 CMB 的四极，在 $l<10$ 产生偏振凸起，振幅 $\propto\tau_{\rm rei}^2$。`,
    explain: R`温度谱中，再电离使 $l\gtrsim100$ 的各向异性压低 $e^{-\tau_{\rm rei}}$，与原初振幅 $\mathcal A_s$ 简并（\secref{9.7.2}）。偏振中，再电离却**产生**信号：自由电子看到的温度四极再次被散射成偏振。\eqref{10.41} 仍然适用，只需 $\eta_*\to\eta_{\rm rei}$、$\eta_0\to\eta_0-\eta_{\rm rei}$。

再电离时只有仍在视界外（$k\lesssim aH(\eta_{\rm rei})$）的模式保有可观的四极，所以凸起只在最大角尺度上。它单独确定 $\tau_{\rm rei}$，从而打破简并。`,
    analogy: R`像傍晚太阳落山后天空又被城市灯光照亮一次：这次照明很弱，只能把最大的轮廓（大角尺度）重新勾勒出来。`,
    book_example: { what: R`\figref{10.10} 中 $l<10$ 的抬升（在 $C_{EE}$ 中更明显）。`, point: R`振幅 $\propto\tau_{\rm rei}^2$，可独立于温度谱约束 $\tau_{\rm rei}$。` },
    misconception: R`再电离并不只是"抹掉"信号——它在温度中抹平小尺度，但在偏振中新造了大尺度信号。`,
  },
  {
    id: "bmode_gw", name_zh: "B 模：引力波的确凿证据", name_en: "B modes from gravitational waves", icon: "🌊", section_id: "10.6", group: "observe",
    plain: R`张量扰动的四极绕 $\hat{\boldsymbol k}$ 有 $\sin2\phi$/$\cos2\phi$ 依赖，产生 B 模；标量不能产生，所以原初 B 模直接指认引力波。`,
    explain: R`引力波的光子分布不绕 $\hat{\boldsymbol k}$ 对称，多出一个方向可"选"，偏振方向不再必须对齐强度变化方向。以 $h_\times$ 为例，$\hat{\boldsymbol k}=\cos\alpha\,\hat{\boldsymbol e}_z+\sin\alpha\,\hat{\boldsymbol e}_x$ 时产生 $U\propto h_\times\cos\alpha$（\eqref{10.50}）——投影沿 $x$ 轴的模出现 $U$，就是 B 模。几何上：张量四极相对 \figref{10.8} 转了 $45^\circ$。

温度与 E 模中标量与张量难以区分，参数简并使张量振幅无法确定；B 模没有标量污染，原则上再小的 $r$ 也能测。实际限制来自银河系尘埃/同步辐射前景与引力透镜 B 模（\secref{13.3}）。`,
    analogy: R`在一片只会顺着风向倒伏的麦田里（标量只产生 E），如果你看到麦子被"拧"成了旋涡，那一定有别的东西来过——引力波。`,
    book_example: { what: R`\figref{10.11}：$r=0.05$ 与 $r=0.001$ 的 GW B 模（峰在 $l\sim100$ 与 $l<10$）及已测到的透镜 B 模。`, point: R`固定 $\mathcal A_s$ 时 $C_{BB}\propto r$；目前约 $r<0.05$。` },
    misconception: R`"测到 B 模"不等于"测到引力波"：透镜与尘埃都产生 B 模（BICEP2 的教训）；要看谱形、频率依赖与大尺度。`,
  },
];

export const relations = [
  { from: "stokes", to: "headless", label: "Q,U 依赖坐标" },
  { from: "headless", to: "eb", label: "需要不变量" },
  { from: "flatsky", to: "eb", label: R`用 $\boldsymbol l$ 定义` },
  { from: "eb", to: "parity", label: "E 偶 B 奇" },
  { from: "thomson", to: "quad_source", label: "对入射方向积分" },
  { from: "quad_source", to: "scalar_E", label: "标量四极" },
  { from: "scalar_E", to: "eb", label: "只填 E" },
  { from: "quad_source", to: "tight_supp", label: "四极被压低" },
  { from: "tight_supp", to: "te_anti", label: "确定相位" },
  { from: "quad_source", to: "reion", label: "再散射四极" },
  { from: "quad_source", to: "bmode_gw", label: R`张量四极转 $45^\circ$` },
  { from: "bmode_gw", to: "eb", label: "填 B" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**描述**：偏振是无头矢量，由对称张量 $I_{ij}$ 描述，$Q$、$U$ 在坐标转 $\alpha$ 下按 $2\alpha$ 混合。以每个 Fourier 模式的 $\boldsymbol l$ 为参照，$E=\cos2\phi_lQ+\sin2\phi_lU$（标量）、$B=-\sin2\phi_lQ+\cos2\phi_lU$（赝标量）是坐标无关的两个自由度。`}</TxI>,
  <TxI>{R`**产生**：Thomson 散射只把入射辐射的**四极**变成偏振：$Q\propto-\int f\sin^2\theta'\cos2\phi'$，只挑出 $Y_{2,\pm2}$。单个标量平面波给出 $Q=4\pi A\sin^2\theta_k\Theta_2$、无 $U$——纯 E 模。`}</TxI>,
  <TxI>{R`**求解**：$\Theta_P'+ik\mu\Theta_P=-\tau'[-\Theta_P+\frac34(1-\mu^2)\Pi]$；在瞬时退耦与小尺度近似下 $E_l\simeq\frac{15}{8}\Theta_2(\eta_*)\frac{l^2}{(k\eta_0)^2}j_l(k\eta_0)\simeq-\frac{5k}{6\tau'_*}\Theta_1\frac{l^2}{(k\eta_0)^2}j_l$：偏振小 $k/\tau'$ 倍、与 TT 反相、无 ISW。`}</TxI>,
  <TxI>{R`**观测**：$C_{EE}\approx C_{TT}/50$；$30\lesssim l\lesssim200$ 的 TE 反相关证明扰动来自视界外；$l<10$ 的再电离凸起 $\propto\tau_{\rm rei}^2$ 打破 $\mathcal A_s$–$\tau_{\rm rei}$ 简并。`}</TxI>,
  <TxI>{R`**B 模**：线性标量扰动 $C_{BB}=0$；张量扰动（引力波）的四极转了 $45^\circ$，产生 B 模，$C_{BB}\propto r$。原初 B 模是暴胀引力波的确凿证据，现实中需要扣除透镜 B 模与银河系前景。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`把坐标轴绕视线转 $90^\circ$，一束沿原 $x$ 轴偏振的光的 $Q$、$U$ 如何变化？`,
    options: [R`不变`, R`$Q\to-Q$，$U\to-U$`, R`$Q\leftrightarrow U$`, R`$Q\to U$，$U\to-Q$`],
    answer: 1, why: R`$Q'=Q\cos2\alpha+U\sin2\alpha$，$\alpha=90^\circ$ 时 $\cos2\alpha=-1$。原来沿 $x$（$Q>0$）的偏振在新坐标里沿 $y'$ 方向，$Q'<0$；偏振本身没动。`,
  },
  {
    q: R`入射辐射在 $+x$ 方向较热、$-x$ 方向较冷（纯偶极），散射到 $z$ 方向的光是否偏振？`,
    options: [R`沿 $x$ 偏振`, R`沿 $y$ 偏振`, R`不偏振`, R`沿 $45^\circ$ 偏振`],
    answer: 2, why: R`出射 $y$ 向强度来自 $\pm x$ 入射，一热一冷平均为平均值；出射 $x$ 向强度来自 $\pm y$ 入射，也是平均值。数学上偶极（$l=1$）与 $Y_{2,\pm2}$ 正交。`,
  },
  {
    q: R`为什么单个标量平面波只产生 E 模？`,
    options: [R`因为标量扰动的振幅太小`, R`因为光子分布绕 $\hat{\boldsymbol k}$ 方位对称，偏振方向只能对齐或垂直于 $\hat{\boldsymbol k}$ 的投影`, R`因为 Thomson 散射不产生 $U$`, R`因为平直天空近似`],
    answer: 1, why: R`Thomson 散射当然能产生 $U$（四极转 $45^\circ$ 即可）；但标量模的唯一方向是 $\hat{\boldsymbol k}$，在投影沿 $x$ 轴的坐标中只出现 $Q$，由 \eqref{10.12} 即纯 E。`,
  },
  {
    q: R`紧耦合下 $E_l\propto\Theta_1$。这意味着 EE 谱的声学峰`,
    options: [R`与 TT 的峰位置相同`, R`与 TT 错开（反相），且比 TT 更尖锐`, R`不存在`, R`只出现在 $l<10$`],
    answer: 1, why: R`TT 主要来自单极 $\Theta_0$；偶极与单极相差 $90^\circ$ 相位，所以平方后峰谷交错。EE 只有一个成分（偶极），不像 TT 那样由单极与偶极叠加"填平"，所以振荡更明显。`,
  },
  {
    q: R`大角度（$30\lesssim l\lesssim200$）的负 $C_{TE}$ 最直接地说明了什么？`,
    options: [R`宇宙是平直的`, R`存在暗能量`, R`扰动在复合时已存在于超视界尺度上，如暴胀所预言`, R`再电离发生得很早`],
    answer: 2, why: R`$l\sim30$ 的尺度在复合时仍在视界外，任何在视界内产生扰动的机制都无法在这些尺度上建立温度–偏振的相干关联。`,
  },
  {
    q: R`为什么 B 模被称为原初引力波的"确凿证据"，但实际探测仍很困难？`,
    options: [R`B 模只由引力波产生，没有任何污染`, R`线性标量扰动不产生 B 模，但引力透镜和银河系尘埃/同步辐射也产生 B 模`, R`B 模比 E 模大，容易被饱和`, R`B 模只出现在 $l>1000$`],
    answer: 1, why: R`原则上 B 模没有标量污染，所以任何残余都来自张量；实际上透镜把 E 转成 B，尘埃辐射本身偏振，都要仔细扣除（\figref{10.11}）。`,
  },
];

export const BRIDGE = R`至此，我们完成了 CMB 的全部线性理论：温度（第 9 章）与偏振（本章）。下一章转向宇宙晚期的结构：星系与星系团如何示踪第 8 章算出的物质分布——偏袒、红移空间畸变、重子声学振荡。本章 \secref{10.1} 的 E/B 分解还会在第 13 章重新登场：星系形状的引力透镜剪切也是天空上的自旋 2 场，线性标量扰动同样只产生 E 模；而本章提到的"透镜 B 模"也正是第 13 章透镜理论作用在 CMB 上的结果。`;
