// 第 11 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "看不见的物质，看得见的星系";
export const HOOK = R`第 8 章算出了一条漂亮的曲线——线性物质功率谱 $P_{\rm L}(k,z)$：它在 $k_{\rm eq}$ 处转折，带着百分之几的重子声学振荡，振幅随时间按增长因子增长。可是我们没法直接"看"物质：绝大部分是暗物质，连重子也多半是看不见的稀薄热气体。

天文学家能看见的，是**示踪体**（tracer）：星系、类星体、Lyman-α 森林里的吸收线、热气体对 CMB 光子的散射……DESI 正在测量四千万个星系的三维位置，Euclid 与 Rubin 天文台会拍下数十亿个星系的像。问题在于，这些"路标"并不老实：星系的分布不等于物质的分布（**偏袒**）；星系的红移里混进了它自己的运动（**红移空间畸变**）；把红移换成距离时又必须先假设一个宇宙学（**Alcock–Paczyński 畸变**）；没有红移时，我们只剩下天球上的二维投影。

这一章的妙处在于：每一个"麻烦"都被翻转成了信息。红移空间畸变测量结构的增长率 $f\sigma_8$，检验广义相对论；错误宇宙学引起的形变，配合重子声学振荡这把"标准尺"，量出了距离 $\chi(\bar z)$ 与哈勃率 $H(\bar z)$——这正是 2011 年诺贝尔奖之后暗能量研究的主力。最后我们回到第 5 章的 Boltzmann 方程，看热电子怎样在 CMB 黑体谱上留下一个在 217 GHz 处变号的"指纹"——Sunyaev–Zel'dovich 效应。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "11.1", title: "星系成团：从红移到三维位置", gist: R`观测位置 $\boldsymbol x_{\rm obs}$ 与真实位置 $\boldsymbol x$ 之间差两件事：基准宇宙学的距离误差 $\delta\chi$ 与本动速度的多普勒位移 $u_\parallel/aH$ \eqref{11.5}。用"星系数守恒" \eqref{11.6} 求 Jacobian，得到观测过密度 \eqref{11.15}。`, gives: ["11.1", "11.3", "11.5", "11.14", "11.15"], next: R`先单独处理速度效应——红移空间畸变。` },
  { sec: "11.1.2", title: "红移空间畸变（Kaiser 公式）", gist: R`连续性方程给出线性速度 $\boldsymbol u_{\rm m}=aHf\,i\boldsymbol k\delta/k^2$ \eqref{11.17}；配合线性偏袒 \eqref{11.18} 与远距观测者近似，得 Kaiser 公式 $\delta_{\rm g,RSD}=(b_1+f\mu_k^2)\delta_{\rm m}$ \eqref{11.22} 与 \eqref{11.23}。测量 $f\sigma_8$。`, gives: ["11.17", "11.18", "11.22", "11.23", "11.24"], next: R`再处理"错误宇宙学"：它是零阶的坐标拉伸。` },
  { sec: "11.1.3", title: "BAO 与 Alcock–Paczyński", gist: R`基准宇宙学把横向与视向坐标分别缩放 $1-\alpha_\perp$、$1-\alpha_\parallel$ \eqref{11.31}，在 Fourier 空间就是波矢的缩放 \eqref{11.35}，得完整的观测功率谱 \eqref{11.37}。BAO 作为标准尺量出 $\chi(\bar z)$ 与 $H(\bar z)$。`, gives: ["11.31", "11.32", "11.33", "11.35", "11.37"], next: R`没有红移时怎么办？只能看天球上的投影。` },
  { sec: "11.2", title: "角关联", gist: R`投影过密度 \eqref{11.39} 按球谐展开，得角功率谱的精确式 \eqref{11.44}；小尺度上 Bessel 函数积分近似为 $\delta_{\rm D}$ 函数 \eqref{11.46}，得 Limber 近似 \eqref{11.47}；平空近似下 $w_{\rm g}(\theta)$ 是 $C_{\rm g}(l)$ 的 Hankel 变换 \eqref{11.49}。`, gives: ["11.39", "11.44", "11.46", "11.47", "11.49"], next: R`同样的投影技术，换成热气体的压强，就是 SZ 效应。` },
  { sec: "11.3", title: "Sunyaev–Zel'dovich 效应", gist: R`把 Compton 碰撞项展开到能量转移的二阶，得 Kompaneets 型扩散方程 \eqref{11.56}；小 $y$ 解 \eqref{11.58} 是一个保光子数的谱畸变，零点在 $x=3.83$（217 GHz）；$y$ 是视线方向的电子压强积分 \eqref{11.59}，其角功率谱由 Limber 公式给出 \eqref{11.62}。`, gives: ["11.54", "11.56", "11.58", "11.59", "11.62"], next: R`总结：示踪体能告诉我们什么，又依赖什么假设。` },
  { sec: "11.4", title: "小结", gist: R`观测功率谱 \eqref{11.63}：RSD 测 $f\sigma_8$，AP + BAO 测 $d_A$ 与 $H$；投影统计测形状与振幅；SZ 测压强。全部依赖"大尺度上 $b_1$ 与 $P_N$ 就够了"这一假设——第 12 章来证明。`, gives: ["11.63"] },
];

// ---------- 推导图 ----------
export const EQMAP_3D = [
  { from: "11.1", to: "11.5", label: R`$\chi_{\rm fid}=\chi+\delta\chi$；多普勒 (11.3)` },
  { from: "11.3", to: "11.4", label: R`对 $u_\parallel$ 求导` },
  { from: "11.4", to: "11.5", label: "两种位移相加" },
  { from: "11.6", to: "11.10", label: "星系数守恒" },
  { from: "11.5", to: "11.11", label: "代入 Jacobian" },
  { from: "11.10", to: "11.11", label: "" },
  { from: "11.11", to: "11.14", label: R`窄红移片，丢 $u_\parallel/aHx$` },
  { from: "11.14", to: "11.15", label: R`$n=\bar n(1+\delta)$` },
  { from: "11.16", to: "11.17", label: R`$\delta\propto D_+$` },
  { from: "11.15", to: "11.19", label: R`$\bar J=1$，线性偏袒 (11.18)` },
  { from: "11.17", to: "11.20", label: "" },
  { from: "11.19", to: "11.20", label: "远距观测者近似" },
  { from: "11.20", to: "11.22", label: R`$\int d^3x\to(2\pi)^3\delta_{\rm D}$` },
  { from: "11.22", to: "11.23", label: R`$\langle|\delta|^2\rangle$ + 白噪声` },
  { from: "11.27", to: "11.31", label: "横向" },
  { from: "11.30", to: "11.31", label: "视向" },
  { from: "11.31", to: "11.35", label: "Fourier 变换" },
  { from: "11.23", to: "11.37", label: "" },
  { from: "11.35", to: "11.37", label: R`$k\to k[k_{\rm obs}]$` },
];
export const EQMAP_2D = [
  { from: "11.38", to: "11.39", label: "按距离分布加权投影" },
  { from: "11.39", to: "11.41", label: "平面波的球谐展开 (C.17)" },
  { from: "11.41", to: "11.44", label: "系综平均 + 正交性" },
  { from: "11.44", to: "11.47", label: R`$l\gg1$：(11.46)` },
  { from: "11.46", to: "11.47", label: "" },
  { from: "11.47", to: "11.49", label: "平空 Fourier ⇒ Hankel" },
  { from: "11.51", to: "11.54", label: R`$\delta_{\rm D}$ 展开到二阶 (11.52)–(11.53)` },
  { from: "11.54", to: "11.56", label: R`$x=p/T$，$dy\propto n_eT_e\,dt$` },
  { from: "11.56", to: "11.58", label: R`$y\ll1$，初值 (11.57)` },
  { from: "11.58", to: "11.59", label: R`$a\,d\chi=dt$` },
  { from: "11.59", to: "11.61", label: R`压强 $=$ 背景 $\times(1+\delta_{\mathcal P})$ (11.60)` },
  { from: "11.61", to: "11.62", label: "套用 Limber (11.47)" },
  { from: "11.47", to: "11.62", label: "" },
];
export const EQMAP_LABELS = {
  "11.1": "观测位置", "11.3": "观测红移", "11.4": "RSD 位移", "11.5": R`$\boldsymbol x_{\rm obs}$ 与 $\boldsymbol x$`, "11.6": "星系数守恒", "11.10": "Jacobian 定义", "11.11": "线性 Jacobian",
  "11.14": "简化 Jacobian", "11.15": "观测过密度", "11.16": "连续性方程", "11.17": "线性速度", "11.19": "实空间 + 速度修正", "11.20": "Fourier 变换", "11.22": "Kaiser 公式",
  "11.23": "红移空间功率谱", "11.27": "横向坐标", "11.30": "视向坐标", "11.31": R`$\alpha_\perp$、$\alpha_\parallel$`, "11.35": "波矢缩放", "11.37": "观测功率谱",
  "11.38": "距离分布", "11.39": "投影过密度", "11.41": R`$\Delta_{{\rm g},lm}$`, "11.44": R`精确 $C_{\rm g}(l)$`, "11.46": "Bessel 正交性", "11.47": "Limber 近似", "11.49": R`$w_{\rm g}(\theta)$`,
  "11.51": "Compton 碰撞项", "11.54": "SZ 碰撞项", "11.56": "扩散方程", "11.58": "小 y 解", "11.59": R`Compton $y$`, "11.61": R`$y(\hat{\boldsymbol n})$`, "11.62": R`$C_y(l)$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "3d", label: "三维成团" },
  { id: "dist", label: "距离与标准尺" },
  { id: "proj", label: "投影与 SZ" },
];

export const concepts = [
  {
    id: "tracer", name_zh: "示踪体与线性偏袒", name_en: "Tracers and linear bias", icon: "🔦", section_id: "11.1", group: "3d",
    plain: R`星系只是物质分布的"路标"；大尺度上它们的过密度与物质成正比：$\delta_{\rm g}=b_1\delta_{\rm m}$。`,
    explain: R`星系形成是高度非线性的复杂过程，没有理由指望星系密度等于物质密度。但在线性阶、大尺度上，任何局域示踪体的过密度都只能与物质过密度成比例，比例系数 $b_1$ 称为**线性偏袒**（\eqref{11.18}），依赖于样本（亮红星系 $b_1\approx2$）与红移。第 12 章 \secref{12.6} 会证明这一点。

此外示踪体是离散的，所以功率谱多一个与尺度无关的噪声 $P_N$；Poisson 抽样时 $P_N=1/\bar n_{\rm g}$（\eqref{11.24}）。`,
    analogy: R`像夜里从飞机上看城市灯光：灯光（星系）多的地方人口（物质）也多，但每盏灯代表多少人取决于是住宅区还是工业区——这就是 $b_1$；灯是一盏一盏的，所以图像还有颗粒噪声 $P_N$。`,
    book_example: { what: R`图 11.1：SDSS 主样本（黑）与亮红星系 LRG（红）。`, point: R`不同样本描绘同一张宇宙网，但对比度（偏袒）不同。` },
    misconception: R`$b_1$ 不是"星系比物质多的倍数"，而是**过密度**之比；而且线性偏袒只在大尺度成立，小尺度需要更多参数（第 12 章）。`,
  },
  {
    id: "rsd", name_zh: "红移空间畸变", name_en: "Redshift-space distortions", icon: "🥞", section_id: "11.1.2", group: "3d",
    plain: R`星系的本动速度混进红移，使观测到的分布沿视线被压扁（大尺度）或拉长（小尺度）。`,
    explain: R`观测红移 $1+z=(1+u_\parallel)/a_{\rm em}$（\eqref{11.3}），被当成距离时，星系沿视线位移 $u_\parallel/aH$（\eqref{11.4}）。大尺度上物质向过密区相干下落，近侧星系背离我们、远侧星系朝向我们，于是过密区沿视线被**压扁**、视密度对比变大——这就是 Kaiser 效应。

小尺度上（星系团内部）随机速度造成的位移远大于星系间距，结构沿视线被**拉长**成"上帝之指"（fingers of God），四极矩反号。`,
    analogy: R`像透过晃动的水面看池底的石子：水平位置不变，深度却被"看错"了；而且看错的方式与水流方向有关。`,
    book_example: { what: R`图 11.3：线性（左）与非线性（右）红移空间畸变示意。`, point: R`左图过密区被压扁，右图被拉长且近侧与远侧星系互换。` },
    misconception: R`RSD 不改变天球上的角位置——位移严格沿视线（$\Delta\boldsymbol x_{\rm RSD}\propto\hat{\boldsymbol n}$）。`,
  },
  {
    id: "kaiser", name_zh: "Kaiser 公式", name_en: "Kaiser formula", icon: "📐", section_id: "11.1.2", group: "3d",
    plain: R`线性红移空间：$P_{\rm g,RSD}(k,\mu_k)=(b_1+f\mu_k^2)^2P_{\rm L}(k)+P_N$。`,
    explain: R`连续性方程把速度与密度联系起来：$\boldsymbol u_{\rm m}=aHf\,i\boldsymbol k\delta/k^2$（\eqref{11.17}），速度是纵向的、正比于增长率 $f=d\ln D_+/d\ln a$。代入观测过密度并在远距观测者近似下做 Fourier 变换，得 $\delta_{\rm g,RSD}=(b_1+f\mu_k^2)\delta_{\rm m}$（\eqref{11.22}）。

增强只出现在平行视线的波矢上（$\mu_k=1$）；垂直视线的模式（沿视线密度不变）不受影响。按 Legendre 多项式展开得单极 $(b_1^2+\frac23b_1f+\frac15f^2)P_{\rm L}$ 与四极 $(\frac43b_1f+\frac47f^2)P_{\rm L}$（\exref{11.4}）。`,
    analogy: R`像一把只在一个方向上起作用的放大镜：横着看图案原样，顺着视线看图案的对比度被放大了 $(1+\beta)^2$ 倍。`,
    book_example: { what: R`图 11.4：BOSS CMASS 样本的单极与四极功率谱。`, point: R`$P_{\rm L}$ 的振幅未知，所以实际测到的是 $b_1\sigma_8$ 与 $f\sigma_8$ 的组合。` },
    misconception: R`Kaiser 公式只适用于线性大尺度；它假设了 $u_\parallel/aH$ 远小于所考察的尺度，在星系团尺度上完全失效。`,
  },
  {
    id: "fsigma8", name_zh: R`增长率 $f\sigma_8$`, name_en: "Growth rate", icon: "🌱", section_id: "11.1.2", group: "3d",
    plain: R`RSD 测量的是结构增长的速度 $f\sigma_8$，可以同时检验暗能量与引力理论。`,
    explain: R`因为 $P_{\rm L}$ 的整体振幅未知（记作 $\sigma_8$），RSD 能约束的组合是 $f\sigma_8(\bar z)$。在广义相对论中，给定膨胀史 $H(z)$，增长率就唯一确定（\eqref{8.78}，$f\simeq\Omega_{\rm m}(z)^{0.55}$）；修改引力一般会改变这个关系（通常使引力更强、增长更快）。

所以把 RSD 的增长率与 BAO/超新星的膨胀率对比，是检验广义相对论的关键测试。数据（图 11.5）与 $\Lambda$CDM 一致：高红移按物质主导的趋势变化，$z\lesssim0.5$ 处被暗能量压低而出现转折。`,
    analogy: R`膨胀史像一条高速公路的限速，增长率像车流的实际速度：按交规（广义相对论）两者有固定关系，若车速与限速对不上，就说明"交规"可能不是我们以为的那样。`,
    book_example: { what: R`图 11.5：不同巡天的 $f\sigma_8$ 测量与 $\Lambda$CDM 预言。`, point: R`最低红移的两个点来自用超新星等距离指标直接测量的本动速度。` },
    misconception: R`$f\sigma_8$ 不是"$f$ 乘以一个已知常数"：$\sigma_8(z)$ 本身也随红移按 $D_+$ 变化，峰值出现在 $z\approx0.4$ 附近。`,
  },
  {
    id: "jacobian", name_zh: "数守恒与 Jacobian", name_en: "Number conservation", icon: "🧮", section_id: "11.1.1", group: "3d",
    plain: R`无论用哪套坐标，同一块体积里的星系数相同：$n_{\rm g,obs}d^3x_{\rm obs}=n_{\rm g}d^3x$。`,
    explain: R`这是整章推导的出发点（\eqref{11.6}）。坐标映射 $\boldsymbol x\to\boldsymbol x_{\rm obs}$ 改变体积元，密度就要乘以 Jacobian $J=|d^3x/d^3x_{\rm obs}|$。线性阶下 $J$ 分为两部分：只依赖红移的常数因子 $\bar J$（由基准宇宙学误差引起），以及随位置涨落的 $-\frac{1}{aH}\partial u_\parallel/\partial x$（由速度场的视向梯度引起）。

后者正是 RSD 的来源：速度梯度把星系挤到一起或拉开。前者在 AP 推导中与坐标缩放的体积因子恰好抵消（\eqref{11.34}）。`,
    analogy: R`像把一张印着点阵的橡皮膜拉伸：点的个数不变，但单位面积上的点数随拉伸程度改变。`,
    book_example: { what: R`\eqref{11.11}–\eqref{11.15}。`, point: R`$u_\parallel/aHx$ 项因 $x\sim\bar\chi$ 有几百 Mpc 而可忽略，$\partial u_\parallel/\partial x$ 项却不行。` },
    misconception: R`起作用的是速度的**梯度**而不是速度本身：整体平移所有星系不改变密度。`,
  },
  {
    id: "ap", name_zh: "Alcock–Paczyński 效应", name_en: "Alcock–Paczyński effect", icon: "🥚", section_id: "11.1.3", group: "dist",
    plain: R`用错的距离–红移关系换算坐标，横向与视向被不同地缩放，各向同性的结构看起来变成椭球。`,
    explain: R`横向坐标由角度乘以距离得到，缩放因子由 $\chi(\bar z)$ 的误差决定：$\alpha_\perp=\delta\chi/\chi_{\rm fid}$；视向坐标由红移差除以 $H$ 得到，缩放因子由 $H(\bar z)$ 的误差决定：$\alpha_\parallel=\delta H/H_{\rm fid}$（\eqref{11.31}）。

在 Fourier 空间这就是 $\boldsymbol k=([1+\alpha_\perp]k^1_{\rm obs},[1+\alpha_\perp]k^2_{\rm obs},[1+\alpha_\parallel]k^3_{\rm obs})$（\eqref{11.35}）。即使没有速度，$\alpha_\parallel\neq\alpha_\perp$ 也会造成功率谱的各向异性。与 RSD 不同，AP 效应的大小依赖功率谱的**形状**，因此二者可以分开。`,
    analogy: R`像用一把刻度错了的尺子量一个皮球：如果横量和竖量用的是两把错得不一样的尺子，量出来的皮球就是扁的。`,
    book_example: { what: R`图 11.6：AP 畸变示意。`, point: R`不同红移处 $\delta\chi$ 不同，使圆形被拉成椭圆。` },
    misconception: R`AP 并不需要知道物体的真实大小——只需要知道它"本来是各向同性的"；要得到绝对距离还需要标准尺（BAO）。`,
  },
  {
    id: "bao", name_zh: "BAO 标准尺", name_en: "BAO standard ruler", icon: "📏", section_id: "11.1.3", group: "dist",
    plain: R`物质功率谱里 $\cos(kr_s)$ 型的振荡，其共动尺度 $r_s\approx105\,h^{-1}\mathrm{Mpc}$ 由 CMB 精确定出，是一把标准尺。`,
    explain: R`复合前光子–重子流体中的声波在重子分布上留下特征尺度——复合时的声视界 $r_s$（\secref{8.6.1}）；引力把它传给暗物质，于是晚期物质功率谱有小幅振荡，关联函数在 $r\approx r_s$ 处有一个峰。

在星系功率谱中测得这个特征的表观位置 $k_{\rm obs}[k]$，横向给出 $\alpha_\perp$（即 $\chi(\bar z)=d_A$），视向给出 $\alpha_\parallel$（即 $H(\bar z)$）。$r_s$ 主要依赖 $\Omega_{\rm b}h^2$，CMB 或 BBN + 氘丰度就能定出它，不需要近邻宇宙的距离阶梯。`,
    analogy: R`像在远处的建筑上看到一排已知间距的窗户：数一数窗户的角间距就知道建筑有多远。`,
    book_example: { what: R`图 11.7：CMASS 单极功率谱除以平滑谱后的 BAO 振荡。`, point: R`拟合参数 $\alpha_\perp$、$\alpha_\parallel$ 把模型沿 $k$ 轴平移。` },
    misconception: R`BAO 不是"星系排成同心球壳"——它是统计意义上相距 $r_s$ 的星系对略多一点（关联函数中一个百分之几的小峰）。`,
  },
  {
    id: "limber", name_zh: "投影与 Limber 近似", name_en: "Limber approximation", icon: "🔭", section_id: "11.2", group: "proj",
    plain: R`小角度上，只有垂直于视线的三维模式贡献角关联：$C_{\rm g}(l)=\int\frac{d\chi}{\chi^2}W^2P_{\rm g}\big(\frac{l+1/2}{\chi}\big)$。`,
    explain: R`投影过密度 $\Delta_{\rm g}(\hat{\boldsymbol n})$ 是不同距离上三维场的加权和（\eqref{11.39}）。精确的 $C_{\rm g}(l)$ \eqref{11.44} 含三重振荡积分与不等时功率谱。$l\gg1$ 时，$k^2j_l(k\chi)j_l(k\chi')$ 在 $k\chi\approx l+\frac12$ 处尖锐地取峰，并且对 $k$ 积分给出 $\delta_{\rm D}(\chi-\chi')/\chi^2$（\eqref{11.46}），于是只剩等时、$\mu_k=0$ 的贡献（\eqref{11.47}）。

物理图像（图 11.8）：视向波数远大于 $1/\chi$ 的模式沿视线正负相消，不产生角关联。通常 $l\gtrsim20$ 时非常精确；$l=10$ 时误差约 5%，$l=2$ 时误差可达 40%（\exref{11.7}）。`,
    analogy: R`像透过一叠半透明的条纹玻璃看东西：横条纹叠起来依然清晰，斜条纹叠很多层后明暗相抵，什么也看不出。`,
    book_example: { what: R`图 11.9：DES 测得的角关联函数 $\theta w_{\rm g}(\theta)$。`, point: R`投影抹平了 BAO 与 RSD，但形状与振幅仍含宇宙学信息。` },
    misconception: R`Limber 近似并不要求 $W(\chi)$ 很窄；它要求的是 $P_{\rm g}$ 在 $\Delta k\sim1/(l\chi)$ 的范围内变化缓慢。`,
  },
  {
    id: "sz", name_zh: "Sunyaev–Zel'dovich 效应", name_en: "Sunyaev–Zel'dovich effect", icon: "♨️", section_id: "11.3", group: "proj",
    plain: R`CMB 光子被热电子逆 Compton 散射而获得能量，使黑体谱在低频变暗、高频变亮。`,
    explain: R`再电离后的气体温度 $T_e\sim10^4$–$10^8\,\mathrm{K}$ 远高于 CMB 温度，散射时光子平均获得能量。把碰撞项展开到能量转移的二阶，得到动量空间的扩散方程 $\partial_yf=x^{-2}\partial_x(x^4\partial_xf)$（\eqref{11.56}）。小 $y$ 时谱畸变为 $\Delta f=y\,x^{-2}\partial_x(x^4\partial_xf^{(0)})$（\eqref{11.58}）。

它保持光子数（\exref{11.10}），但不能被温度或化学势的改变吸收——是真正的谱畸变。零点在 $x=3.83$，即 $\nu\approx217\,\mathrm{GHz}$（\exref{11.11}）。`,
    analogy: R`像一群慢跑者（光子）穿过一群快跑者（热电子）组成的人群：被撞到的慢跑者都被"带快"了一点，于是慢的少了、快的多了，总人数不变。`,
    book_example: { what: R`图 11.11：$y=0$、$0.02$、$0.05$ 时的 CMB 强度谱。`, point: R`$y>0$ 时 Wien 尾抬高、Rayleigh–Jeans 区降低。` },
    misconception: R`SZ 不是"CMB 被加热"——加热会让整个黑体谱整体移动，而 $y$ 畸变不是黑体；只有在大量散射（大 $y$）后才趋于新的平衡温度 $T_f$。`,
  },
  {
    id: "compton_y", name_zh: R`Compton $y$ 参数`, name_en: "Compton-y parameter", icon: "🗺️", section_id: "11.3", group: "proj",
    plain: R`$y=\frac{\sigma_{\rm T}}{m_e}\int a\,n_eT_e\,d\chi$：沿视线积分的电子压强。`,
    explain: R`$y$ 同时是 Boltzmann 方程的"时间"变量（\eqref{11.55}）与谱畸变的振幅（\eqref{11.58}）。它正比于 $n_eT_e$——电子气体的压强——沿视线的积分（\eqref{11.59}）。

全天 $y$ 图因此是"再电离以来电离气体压强的投影图"：其角功率谱由与星系投影完全相同的 Limber 公式给出（\eqref{11.62}）；$y$ 特别大的点对应大质量星系团，这是寻找远处星系团的有力手段——信号几乎不随距离减弱，因为背光（CMB）无处不在。`,
    analogy: R`像透过一层层蒸汽看路灯：路灯（CMB）在哪儿都一样亮，蒸汽越热越浓（压强越大），透过来的光颜色就变得越多，与蒸汽离你多远几乎无关。`,
    book_example: { what: R`\eqref{11.60}–\eqref{11.62}。`, point: R`$C_y(l)$ 测量电离气体压强涨落的振幅，提供重子热状态的信息。` },
    misconception: R`$y$ 与距离几乎无关不等于星系团越远越容易发现：远处的星系团在天上更小，受望远镜分辨率限制。`,
  },
];

export const relations = [
  { from: "jacobian", to: "rsd", label: R`$\partial u_\parallel/\partial x$` },
  { from: "tracer", to: "kaiser", label: R`$b_1$` },
  { from: "rsd", to: "kaiser", label: "线性理论" },
  { from: "kaiser", to: "fsigma8", label: R`$f\mu_k^2$ 项` },
  { from: "jacobian", to: "ap", label: R`$\bar J$` },
  { from: "ap", to: "bao", label: "需要标准尺" },
  { from: "bao", to: "fsigma8", label: R`$H(z)$ 与增长对比` },
  { from: "tracer", to: "limber", label: "投影" },
  { from: "limber", to: "compton_y", label: R`$C_y(l)$` },
  { from: "sz", to: "compton_y", label: "振幅" },
];

export const TAKEAWAYS = [
  <TxI>{R`**观测位置不等于真实位置**：$\boldsymbol x_{\rm obs}=\boldsymbol x+\big(\delta\chi+u_\parallel/aH\big)\hat{\boldsymbol n}$。由星系数守恒，观测过密度为 $1+\delta_{\rm g,obs}=\bar J\,[1+\delta_{\rm g}-\frac{1}{aH}\partial u_\parallel/\partial x]$。`}</TxI>,
  <TxI>{R`**Kaiser 公式**：$P_{\rm g,RSD}(k,\mu_k)=(b_1+f\mu_k^2)^2P_{\rm L}(k)+P_N$。RSD 在大尺度上增强视向模式，测得 $f\sigma_8$——给定膨胀史时检验广义相对论。`}</TxI>,
  <TxI>{R`**AP 与 BAO**：错误宇宙学使 $\boldsymbol k=([1+\alpha_\perp]k^{1,2}_{\rm obs},[1+\alpha_\parallel]k^3_{\rm obs})$，$\alpha_\perp=\delta\chi/\chi_{\rm fid}$、$\alpha_\parallel=\delta H/H_{\rm fid}$；配合声视界 $r_s$ 这把标准尺，量出 $d_A(\bar z)$ 与 $H(\bar z)$。`}</TxI>,
  <TxI>{R`**投影**：$C_{\rm g}(l)=\int\frac{d\chi}{\chi^2}W^2(\chi)P_{\rm g,obs}\big(k=\frac{l+1/2}{\chi},\mu_k=0\big)$（Limber，$l\gtrsim20$ 时精确）；$w_{\rm g}(\theta)=\int\frac{dl}{2\pi}lC_{\rm g}(l)J_0(l\theta)$。`}</TxI>,
  <TxI>{R`**SZ**：热电子使 CMB 谱发生 $y$ 型畸变 $\Delta f=y\,x^{-2}\partial_x(x^4\partial_xf^{(0)})$，保光子数、零点在 217 GHz；$y=\frac{\sigma_{\rm T}}{m_e}\int a\,n_eT_e\,d\chi$ 是视线压强积分。`}</TxI>,
  <TxI>{R`**关键假设**：大尺度上示踪体只需 $b_1$ 与 $P_N$，速度无偏（$\boldsymbol u_{\rm g}=\boldsymbol u_{\rm m}$）。否则 RSD 测不准增长率，BAO 尺度也可能偏移——第 12 章证明它们成立。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`大尺度上，一个过密区周围的星系在红移空间中看起来怎样？`,
    options: ["沿视线被拉长", "沿视线被压扁，视密度对比增大", "完全不受影响", "只在横向被压扁"],
    answer: 1, why: R`物质向过密区相干下落：近侧星系背离我们（显得更远），远侧星系朝向我们（显得更近），都被"推"向中心，结构沿视线变扁、密度对比变大；对应 $(b_1+f\mu_k^2)$ 中 $f\mu_k^2\ge0$。`,
  },
  {
    q: R`一个波矢垂直于视线（$\mu_k=0$）的 Fourier 模式，在 Kaiser 公式中受到怎样的 RSD？`,
    options: [R`增强 $(1+\beta)^2$`, "完全不受影响", "被抑制", R`振幅反号`],
    answer: 1, why: R`$\mu_k=0$ 时 $(b_1+f\mu_k^2)^2=b_1^2$：这样的模式沿视线密度不变，视向位移不改变它。`,
  },
  {
    q: R`为什么 RSD 实际约束的是 $f\sigma_8$ 而不是 $f$ 本身？`,
    options: ["因为 f 太小", R`因为 $P_{\rm L}$ 的整体振幅（$\sigma_8$）未知，$b_1$、$f$ 只能以与 $\sigma_8$ 的乘积出现`, "因为 σ8 是 f 的另一个名字", "因为非线性效应"],
    answer: 1, why: R`$P_{\rm g,RSD}=(b_1\sigma_8+f\sigma_8\mu_k^2)^2\,P_{\rm L}/\sigma_8^2$，后者的形状已知、振幅未知，所以测到的是 $b_1\sigma_8$ 与 $f\sigma_8$。`,
  },
  {
    q: R`若基准宇宙学的 $\chi_{\rm fid}(\bar z)$ 比真实距离大（$\delta\chi>0$），BAO 特征在观测功率谱的横向方向上出现在哪里？`,
    options: [R`更大的 $k_{\rm obs}$`, R`更小的 $k_{\rm obs}$`, "位置不变", "特征消失"],
    answer: 1, why: R`$\alpha_\perp>0$，观测坐标被放大 $1+\alpha_\perp$ 倍，尺度变大，故 $k_{\rm obs}=k/(1+\alpha_\perp)$ 变小。`,
  },
  {
    q: R`Limber 近似中为什么只保留 $\mu_k=0$ 的模式？`,
    options: ["因为 RSD 把它们消掉了", R`视向波数 $\mu_kk\gg1/\chi$ 的模式在沿视线投影时正负相消，而相关的横向波数 $l/\chi$ 远大于 $1/\chi$`, R`因为 $\mu_k=0$ 时功率谱最大`, "这是平空近似的定义"],
    answer: 1, why: R`图 11.8：在小角度 $\theta\sim1/l$ 上，只有视向波数 $\lesssim1/\chi$ 的模式能贡献，与 $l/\chi$ 相比可以忽略。`,
  },
  {
    q: R`在 $x=p/T=2$（约 $114\,\mathrm{GHz}$）与 $x=6$（约 $340\,\mathrm{GHz}$）处观测一个大质量星系团，SZ 效应分别表现为？`,
    options: ["都变亮", "都变暗", "低频变暗、高频变亮", "低频变亮、高频变暗"],
    answer: 2, why: R`$\Delta f\propto x\coth(x/2)-4$，在 $x<3.83$ 时为负、$x>3.83$ 时为正：光子被从 Rayleigh–Jeans 区搬到 Wien 区。`,
  },
];

export const BRIDGE = R`这一章处处依赖一个尚未证明的假设：大尺度上，星系这种高度非线性的天体，其过密度只需一个常数 $b_1$ 与一个白噪声 $P_N$ 就能描述，速度也与物质相同。下一章我们走出线性理论：球对称塌缩、暗物质晕与晕质量函数（星系团的计数——SZ 搜寻的目标）、晕模型、微扰论与数值模拟，最后在 \secref{12.6} 证明偏袒展开在大尺度上为什么成立，并给出 Kaiser 公式的非线性修正（图 11.4 中高 $k$ 处的模型正是这样算的）。`;
