// 第 10 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "举着箭头绕地球走一圈";
export const HOOK = R`站在赤道上，手里举一支指向正北的箭头。向北走到北极，再沿另一条经线南下回到赤道，最后沿赤道走回起点——一路上你从不"转动"箭头（每一步都让它与上一步平行）。回到原地，箭头却转过了一个角度，恰好等于你走过的路径所围住的那块球面的面积（以单位球计）。在平直的桌面上这种事不会发生：转角来自**曲率**。

物理里有一个一模一样的现象。电子绕一根细螺线管走一圈，管外磁场为零，波函数却多出相位 $e^{\mathrm{i}e\Phi}$（Aharonov–Bohm 效应）；一个自旋 1/2 粒子在缓慢转动的磁场里转一圈，波函数多出相位 $-\frac12\Omega$，$\Omega$ 是磁场方向扫过的立体角（Berry 相位）。在这些例子里，"箭头"换成了量子态的相位，"平行"换成了规范势规定的"不变"。

本章把这三件事统一成一个数学结构：**纤维丛上的联络**。在主丛的每一点，联络指定哪些方向是"水平的"（不改变内部状态）；沿底空间的曲线走，就沿水平方向把丛里的点抬上去（**水平提升**、**平行移动**）；绕闭路一圈回不到原处的程度是**和乐**；无穷小闭路的和乐是**曲率**。拉回到坐标卡上，联络就是物理学家的**规范势** $\mathcal{A}$，曲率就是**场强** $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$，换坐标卡就是**规范变换**。最后我们用这套语言重新理解 Maxwell 理论、Dirac 磁单极（$2g\in\mathbb{Z}$）、Aharonov–Bohm 效应、Yang–Mills 理论、瞬子数与 Berry 相位。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "10.1.1–10.1.2", title: "联络：水平与竖直的分解", gist: R`竖直子空间 $V_uP$（沿纤维）是典范的；联络是选取与右作用相容的水平补空间 $H_uP$。等价地，给出 $\mathfrak{g}$ 值一形式 $\omega$：$\omega(A^\#)=A$、$R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega$，令 $H_uP=\ker\omega$。`, gives: ["10.1", "10.3a", "10.3b", "10.4", "10.5"], next: R`$\omega$ 活在全空间 $P$ 上——物理学家用的却是 $M$ 上的势。怎样联系？` },
  { sec: "10.1.3", title: "局部形式 = 规范势", gist: R`用局部截面拉回：$\mathcal{A}_i=\sigma_i^*\omega$。反之由 $\mathcal{A}_i$ 可重建 $\omega$（定理 10.1）。换坐标卡时 $\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}$——这就是规范变换。`, gives: ["10.6", "10.7", "10.8", "10.9", "10.10a", "10.12a"], next: R`有了"水平"，就能沿曲线把点水平地抬起来。` },
  { sec: "10.1.4", title: "水平提升与平行移动", gist: R`$\omega(\tilde X)=0$ 局部化为 $\dot g_i=-\mathcal{A}_i(X)g_i$，解为路径排序指数 $\mathcal{P}\exp(-\int\mathcal{A})$。平行移动 $\Gamma(\tilde\gamma)$ 与右作用对易。`, gives: ["10.13b", "10.14", "10.17", "10.18", "10.20"], next: R`沿闭路平行移动，回来时一般不在原处。` },
  { sec: "10.2", title: "和乐", gist: R`闭路 $\gamma$ 诱导纤维上的变换 $\tau_\gamma$，$\tau_\gamma(u)=ug_\gamma$；全体 $g_\gamma$ 组成和乐群 $\Phi_u\subset G$。局部地 $g_\gamma=\mathcal{P}\exp(-\oint\mathcal{A})$——物理中的 Wilson 圈。`, gives: ["10.21", "10.22", "10.23", "10.26", "10.27"], next: R`无穷小闭路的和乐是什么？——曲率。` },
  { sec: "10.3", title: "曲率", gist: R`$\Omega=\mathrm{D}\omega$；Cartan 结构方程 $\Omega=\dd_P\omega+\omega\wedge\omega$；$\Omega(X,Y)=-\omega([X,Y])$ 量出水平提升"闭不上"的竖直偏差。局部形式 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$，换卡时 $\mathcal{F}_j=t_{ij}^{-1}\mathcal{F}_it_{ij}$；Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$。`, gives: ["10.29", "10.32b", "10.35", "10.38a", "10.39", "10.41", "10.42", "10.46"], next: R`物质场不住在主丛里，而住在相伴矢量丛里：怎样对它们求导？` },
  { sec: "10.4", title: "相伴矢量丛上的协变导数", gist: R`截面"平行"当且仅当它相对于水平提升不变；协变导数 $\nabla_Xs$ 局部为 $\big(\frac{\partial\xi^\alpha}{\partial x^\mu}+\mathcal{A}_\mu{}^\alpha{}_\beta\xi^\beta\big)\frac{\dd x^\mu}{\dd t}e_\alpha$。曲率重现为 $\nabla\nabla e_\alpha=e_\beta\otimes\mathcal{F}^\beta{}_\alpha$；保内积 ⇔ 联络取值在 $\mathrm{\mathfrak{o}}(k)$；Hermite 联络的曲率是 $(1,1)$ 形式。`, gives: ["10.49", "10.56b", "10.58", "10.61", "10.70", "10.73", "10.80"], next: R`现在可以把规范场论整个用丛的语言重写。` },
  { sec: "10.5.1–10.5.3", title: R`U(1)：Maxwell、Dirac 单极子、Aharonov–Bohm`, gist: R`Maxwell 方程的一半是 Bianchi 恒等式。$S^2$ 上的 U(1) 丛需要两块卡，转移函数 $e^{\mathrm{i}2g\phi}$ 单值 ⇔ $2g\in\mathbb{Z}$，总通量 $4\pi g$。平坦但非平凡的联络给出 Aharonov–Bohm 相位 $e^{\mathrm{i}e\Phi}$。`, gives: ["10.83c", "10.85a", "10.88b", "10.89", "10.93", "10.94", "10.99", "10.100", "10.104"], next: R`换成非阿贝尔群 $\mathrm{SU}(2)$。` },
  { sec: "10.5.4–10.5.5", title: "Yang–Mills 理论与瞬子", gist: R`场强 $\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+[\mathcal{A}_\mu,\mathcal{A}_\nu]$，运动方程 $\mathcal{D}*\mathcal{F}=0$。有限作用要求无穷远处纯规范 $g^{-1}\dd g$；$\Tr\mathcal{F}^2=\dd K$（Chern–Simons），瞬子数 $=-\frac1{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2=$ 映射 $g:S^3\to\mathrm{SU}(2)$ 的度。`, gives: ["10.106b", "10.109", "10.112", "10.116", "10.120", "10.121", "10.125", "10.128"], next: R`最后一个例子不在时空里，而在参数空间里。` },
  { sec: "10.6", title: "Berry 相位", gist: R`绝热演化中，第 $n$ 个本征态的相位构成参数空间上的 U(1) 丛；Berry 联络 $\mathcal{A}=\langle\boldsymbol R|\dd|\boldsymbol R\rangle$，Berry 相位就是它的和乐 $\eta=\mathrm{i}\oint\mathcal{A}=\mathrm{i}\int_S\mathcal{F}$。自旋 1/2 在磁场中：能级简并点 $\boldsymbol R=0$ 是强度 $\frac12$ 的单极子。`, gives: ["10.134", "10.140", "10.141", "10.142", "10.149", "10.158", "10.166a", "10.168"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "10.3a", to: "10.4", label: R`$H_uP=\ker\omega$` },
  { from: "10.4", to: "10.5", label: R`用 $R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega$` },
  { from: "10.6", to: "10.9", label: R`$\omega$ 作用于 \eqref{10.8}` },
  { from: "10.9", to: "10.10a", label: "同一卡换截面" },
  { from: "10.9", to: "10.12a", label: "U(1)" },
  { from: "10.4", to: "10.13b", label: R`$\omega(\tilde X)=0$` },
  { from: "10.13b", to: "10.14", label: "路径排序解" },
  { from: "10.14", to: "10.26", label: "闭路" },
  { from: "10.29", to: "10.32b", label: "三种情形" },
  { from: "10.32b", to: "10.35", label: "两个水平向量" },
  { from: "10.32b", to: "10.38a", label: R`拉回 $\sigma^*$` },
  { from: "10.38a", to: "10.39", label: "分量" },
  { from: "10.39", to: "10.41", label: R`展开 $T_\alpha$` },
  { from: "10.9", to: "10.42", label: R`代入 $\mathcal{F}_j$` },
  { from: "10.38a", to: "10.42", label: "" },
  { from: "10.32b", to: "10.46", label: R`$\mathrm{D}\Omega=0$ 再拉回` },
  { from: "10.13b", to: "10.56b", label: "相伴丛基截面" },
  { from: "10.56b", to: "10.58", label: "Leibniz" },
  { from: "10.56b", to: "10.70", label: R`$\nabla\nabla$` },
  { from: "10.46", to: "10.83c", label: "U(1) 分量" },
  { from: "10.9", to: "10.91", label: "赤道" },
  { from: "10.91", to: "10.93", label: "单值性" },
  { from: "10.91", to: "10.94", label: "Stokes" },
  { from: "10.26", to: "10.104", label: "平坦联络" },
  { from: "10.120", to: "10.121", label: R`Stokes，$\mathcal{F}|_{S^3}=0$` },
  { from: "10.121", to: "10.128", label: R`$g_1$：密度 $12$` },
  { from: "10.13b", to: "10.158", label: R`$\mathcal{A}=\langle\boldsymbol R|\dd|\boldsymbol R\rangle$` },
  { from: "10.158", to: "10.168", label: "Stokes" },
];
export const EQMAP_LABELS = {
  "10.3a": "联络一形式", "10.4": "水平 = 核", "10.5": "右不变", "10.6": "规范势", "10.9": "相容条件", "10.10a": "规范变换", "10.12a": "U(1) 规范变换",
  "10.13b": "水平提升方程", "10.14": "路径排序指数", "10.26": "和乐 = Wilson 圈",
  "10.29": "曲率定义", "10.32b": "结构方程", "10.35": "几何意义", "10.38a": "场强", "10.39": "场强分量", "10.41": "结构常数形式", "10.42": "场强协变", "10.46": "Bianchi",
  "10.56b": "协变导数", "10.58": "一般截面", "10.70": "曲率重现",
  "10.83c": "齐次 Maxwell 方程", "10.91": "赤道上的变换", "10.93": R`$2g\in\mathbb{Z}$`, "10.94": "总通量", "10.104": "AB 和乐",
  "10.120": "Chern–Simons", "10.121": R`化到 $S^3$`, "10.128": "瞬子数 = 映射度",
  "10.158": "Berry 相位", "10.168": "Berry 通量",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "conn", label: "联络与平行移动" },
  { id: "curv", label: "曲率" },
  { id: "assoc", label: "相伴丛" },
  { id: "phys", label: "物理应用" },
];

export const concepts = [
  {
    id: "connection", name_zh: "联络：水平/竖直分解", name_en: "Connection", icon: "🧭", section_id: "10.1.1", group: "conn",
    plain: R`在主丛每一点选出"水平方向"，且选法与右作用相容。`,
    explain: R`主丛 $P$ 的切空间里，沿纤维的方向 $V_uP$ 是天然的（由 $\mathfrak{g}$ 的基本向量场 $A^\#$ 张成），但"横着走"的方向没有天然选择。联络就是这个选择：$T_uP=H_uP\oplus V_uP$，并要求 $H_{ug}P=R_{g*}H_uP$——同一纤维上各点的水平方向彼此一致。

这个定义完全几何化，不依赖坐标卡；但不便计算。下一步用联络一形式把它代数化。`,
    analogy: R`像一座螺旋停车场：竖直方向（上下楼）是建筑本身决定的；"平着开"的路面坡度却要设计者指定。不同的设计（联络）让同一条平面路线开到不同的楼层。`,
    book_example: { what: R`图 10.1：$H_{ug}P$ 由 $H_uP$ 经右作用得到。`, point: "一根纤维上只需指定一点的水平子空间。" },
    misconception: R`水平子空间不是"与纤维正交"——$P$ 上没有度规，谈不上正交；它是一个额外的选择。`,
  },
  {
    id: "conn_form", name_zh: "联络一形式", name_en: "Connection one-form (Ehresmann)", icon: "📐", section_id: "10.1.2", group: "conn",
    plain: R`$\mathfrak{g}$ 值一形式 $\omega$：把切向量投影到竖直部分并读出对应的李代数元。`,
    explain: R`两条公理：$\omega(A^\#)=A$（竖直方向上就是"读数"），$R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega$（右作用下按伴随表示变）。水平子空间定义为核：$H_uP=\ker\omega$，第二条公理保证它右不变（命题 10.1）。

$\omega$ 在全空间 $P$ 上整体定义，携带丛的全部整体信息。`,
    analogy: R`像一个"高度计"：它只对上下移动有反应，读出你爬了多少层；平着开时读数为零。`,
    book_example: { what: R`例 10.2：$P=(\mathbb{R}^2-\{0\})\times\mathbb{R}$ 上 $\omega=\frac{y\,\dd x-x\,\dd y}{x^2+y^2}+\dd f$。`, point: R`绕原点一圈的水平提升是螺旋线，升高 $2\pi$。` },
    misconception: R`$\omega$ 不是 $M$ 上的形式；在非平凡丛上它不能整体地拉回到 $M$。`,
  },
  {
    id: "gauge_potential", name_zh: "规范势与规范变换", name_en: "Gauge potential & compatibility", icon: "🔀", section_id: "10.1.3", group: "conn",
    plain: R`$\mathcal{A}_i=\sigma_i^*\omega$；换卡时 $\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}$。`,
    explain: R`选一个局部截面（"选规范"），把 $\omega$ 拉回到坐标卡上，就得到物理学家的规范势。不同截面给出的势相差一个规范变换；不同卡上的势通过转移函数满足相容条件。

反过来，一族满足相容条件的 $\{\mathcal{A}_i\}$ 唯一决定 $\omega$（定理 10.1）。单个 $\mathcal{A}_i$ 只活在平凡的局部丛上，看不到整体信息；**全体** $\{\mathcal{A}_i\}$ 连同相容条件才携带丛的拓扑。`,
    analogy: R`同一张地形图可以用不同的坐标网格描述；网格换了，各点坐标按确定的规则变，但地形不变。`,
    book_example: { what: R`例 10.1：U(1) 丛上 $\mathcal{A}_{j\mu}=\mathcal{A}_{i\mu}+\mathrm{i}\partial_\mu\Lambda$。`, point: "熟悉的电磁规范变换。" },
    misconception: R`$t^{-1}\dd t$ 项使 $\mathcal{A}$ 不是一个"张量"：在某规范下 $\mathcal{A}=0$ 不代表联络平凡（纯规范 $g^{-1}\dd g$）。`,
  },
  {
    id: "horizontal_lift", name_zh: "水平提升与平行移动", name_en: "Horizontal lift & parallel transport", icon: "🧵", section_id: "10.1.4", group: "conn",
    plain: R`沿底空间的曲线，始终沿水平方向把丛里的点抬上去。`,
    explain: R`条件 $\omega(\tilde X)=0$ 在局部截面下是线性常微分方程 $\dot g=-\mathcal{A}(X)g$，存在唯一解；形式解是路径排序指数 $g=\mathcal{P}\exp(-\int\mathcal{A}_\mu\dd x^\mu)$。终点 $u_1=\tilde\gamma(1)$ 叫 $u_0$ 的平行移动。

由右不变性，平行移动与右作用对易：$R_g\Gamma(\tilde\gamma)=\Gamma(\tilde\gamma)R_g$。`,
    analogy: R`在螺旋停车场里沿着地面上画好的路线开车，不打方向盘之外的任何操作——你最终到哪一层，完全由路面设计（联络）和路线决定。`,
    book_example: { what: R`例 10.2：$\tilde\gamma(t)=((\cos2\pi t,\sin2\pi t),2\pi t)$。`, point: "单位圆的水平提升是一条螺旋线。" },
    misconception: R`非阿贝尔时不能把 $\exp(-\int\mathcal{A})$ 当普通指数：不同点的 $\mathcal{A}_\mu$ 不对易。`,
  },
  {
    id: "holonomy", name_zh: "和乐群", name_en: "Holonomy group", icon: "🔁", section_id: "10.2", group: "conn",
    plain: R`沿闭路平行移动一圈，回来时差一个群元 $g_\gamma$；它们组成和乐群。`,
    explain: R`闭路 $\gamma$ 在纤维上诱导 $\tau_\gamma(u)=ug_\gamma$，$g_{\alpha*\beta}=g_\beta g_\alpha$，于是 $\Phi_u=\{g_\gamma\}$ 是 $G$ 的子群。局部地 $g_\gamma=\mathcal{P}\exp(-\oint\mathcal{A})$——这就是格点规范论与 QCD 里的 Wilson 圈。

只用零伦闭路得到限制和乐群 $\Phi_u^0$。平坦联络的 $\Phi^0_u$ 平凡，但 $\Phi_u$ 可以非平凡（Aharonov–Bohm）。`,
    analogy: R`举着箭头绕一圈，回来时箭头转了个角度：转角集合就是和乐群。`,
    book_example: { what: R`例 10.3：$\tau_\gamma:g\mapsto g+2\pi$。`, point: R`绕原点一圈，纤维平移 $2\pi$。` },
    misconception: R`和乐依赖于联络，不只依赖于闭路与丛；同一丛上不同联络的和乐群可以完全不同。`,
  },
  {
    id: "curvature", name_zh: "曲率与结构方程", name_en: "Curvature & Cartan structure equation", icon: "🌀", section_id: "10.3.2", group: "curv",
    plain: R`$\Omega=\mathrm{D}\omega=\dd_P\omega+\omega\wedge\omega$；局部 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$。`,
    explain: R`曲率定义为联络一形式的协变导数（只喂水平向量的外微分）。Cartan 结构方程把它写成可计算的形式；拉回到坐标卡上就是 Yang–Mills 场强 $\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+[\mathcal{A}_\mu,\mathcal{A}_\nu]$。

与规范势不同，场强按伴随表示协变地变换：$\mathcal{F}_j=t_{ij}^{-1}\mathcal{F}_it_{ij}$，所以 $\Tr\mathcal{F}^k$ 整体有定义。`,
    analogy: R`规范势像"每个城市各自的时区"，换城市要调表（非齐次项）；场强像"时差的变化率"，它是客观的，只随参照系旋转。`,
    book_example: { what: R`\eqref{10.41}：$F_{\mu\nu}{}^\alpha=\partial_\mu A_\nu{}^\alpha-\partial_\nu A_\mu{}^\alpha+f_{\beta\gamma}{}^\alpha A_\mu{}^\beta A_\nu{}^\gamma$。`, point: "非阿贝尔场强含势的平方项：胶子自相互作用。" },
    misconception: R`$\omega\wedge\omega\neq0$：对李代数值形式，$\omega\wedge\omega=\frac12[\omega,\omega]$。`,
  },
  {
    id: "curv_meaning", name_zh: "曲率的几何意义", name_en: "Curvature as infinitesimal holonomy", icon: "📏", section_id: "10.3.3", group: "curv",
    plain: R`两个水平向量的括号的竖直部分就是曲率：$\Omega(X,Y)=-\omega([X,Y])$。`,
    explain: R`沿无穷小平行四边形做水平提升，终点与起点在同一纤维上相差一个竖直向量 $[X,Y]$；曲率量出这段偏差。于是曲率是"无穷小闭路的和乐"。

Ambrose–Singer 定理把它变成整体陈述：和乐群的李代数由（搬运到同一纤维上的）所有曲率值张成。`,
    analogy: R`在球面上走一个极小的方形，箭头的转角约等于曲率乘以面积。`,
    book_example: { what: R`\eqref{10.34}–\eqref{10.35}：$\pi_*[X,Y]=\epsilon\delta[\partial_1,\partial_2]=0$。`, point: R`$[X,Y]$ 是竖直的。` },
    misconception: R`曲率为零只说明限制和乐群平凡；绕不可缩闭路的和乐仍可以非平凡。`,
  },
  {
    id: "bianchi", name_zh: "Bianchi 恒等式", name_en: "Bianchi identity", icon: "♻️", section_id: "10.3.5", group: "curv",
    plain: R`$\mathrm{D}\Omega=0$；局部 $\mathcal{D}\mathcal{F}=\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0$。`,
    explain: R`由结构方程求外微分，右边的每一项都含 $\omega$，喂水平向量就为零。局部形式是 $\dd\mathcal{F}=\mathcal{F}\wedge\mathcal{A}-\mathcal{A}\wedge\mathcal{F}$。

U(1) 时 $\dd\mathcal{F}=0$：这就是 Maxwell 方程中不含源的那一半（$\nabla\cdot\boldsymbol B=0$、$\nabla\times\boldsymbol E+\partial_t\boldsymbol B=0$）——几何恒等式，而不是动力学。`,
    analogy: R`"边界的边界为零"在曲率层面的回声。`,
    book_example: { what: R`\eqref{10.83b}：$\partial_\lambda\mathcal{F}_{\mu\nu}+\partial_\nu\mathcal{F}_{\lambda\mu}+\partial_\mu\mathcal{F}_{\nu\lambda}=0$。`, point: "磁单极不存在于光滑 U(1) 联络中——除非底空间有洞。" },
    misconception: R`Bianchi 恒等式不是运动方程；运动方程是 $\mathcal{D}*\mathcal{F}=0$，要由作用量变分得到。`,
  },
  {
    id: "assoc_cov", name_zh: "相伴丛上的协变导数", name_en: "Covariant derivative on associated bundles", icon: "🧮", section_id: "10.4.1", group: "assoc",
    plain: R`物质场是相伴丛 $P\times_\rho V$ 的截面；平行 = 相对于水平提升不变。`,
    explain: R`$\nabla_Xs=[(\tilde\gamma(0),\frac{\dd}{\dd t}\eta(t)|_0)]$ 与水平提升和截面选取都无关。局部地 $\nabla_\mu\xi=\partial_\mu\xi+\mathcal{A}_\mu\xi$（$\mathcal{A}_\mu$ 取表示 $\rho$），这就是物理中的"最小耦合"。

例子：切丛（Christoffel 记号 $\Gamma^\alpha{}_{\mu\beta}$）、U(1) 复标量场、SU(2) 二重态、伴随表示中的 $\partial_\mu V+[\mathcal{A}_\mu,V]$。$\nabla\nabla e_\alpha=e_\beta\otimes\mathcal{F}^\beta{}_\alpha$ 重现曲率。`,
    analogy: R`主丛是"所有可能的参照系"，相伴丛是"用这些参照系描述的物体"；联络告诉你参照系怎样随位置平移，物体的导数要扣除参照系自身的变化。`,
    book_example: { what: R`例 10.5：$\nabla_X\phi=X^\mu(\partial_\mu\Phi+\mathcal{A}_{i\mu}\Phi)e$。`, point: "U(1) 规范协变导数。" },
    misconception: R`协变导数依赖表示：同一个联络在不同相伴丛上给出不同的 $\mathcal{A}_\mu{}^\alpha{}_\beta$。`,
  },
  {
    id: "metric_conn", name_zh: "度规联络与 Hermite 联络", name_en: "Metric & Hermitian connections", icon: "📏", section_id: "10.4.4", group: "assoc",
    plain: R`联络保持内积 ⇔ 正交（酉）标架下联络矩阵反对称（反 Hermite）。`,
    explain: R`$\dd[g(s,s')]=g(\nabla s,s')+g(s,\nabla s')$。正交归一标架中这等价于 $\omega^\alpha{}_\beta=-\omega^\beta{}_\alpha$，结构群约化到 $\mathrm{O}(k)$。$E=TM$ 加上无挠条件就是 Levi-Civita 联络。

全纯矢量丛上，相容于 Hermite 结构且 $(0,1)$ 部分等于 $\bar\partial$ 的联络唯一存在；它的联络与曲率都是反 Hermite 的，曲率是 $(1,1)$ 形式。`,
    analogy: R`平行移动一把尺子，它的长度与刻度夹角都不变——这就是"保持内积"。`,
    book_example: { what: R`定理 10.6 的证明：两项联络项因反对称相消。`, point: R`度规联络 ⇔ $\mathrm{\mathfrak{o}}(k)$ 值联络。` },
    misconception: R`度规联络不唯一（可以有挠）；要唯一还需无挠条件（$TM$）或全纯条件（Hermite 联络）。`,
  },
  {
    id: "monopole", name_zh: "Dirac 磁单极与量子化", name_en: "Dirac monopole", icon: "🧲", section_id: "10.5.2", group: "phys",
    plain: R`$S^2$ 上的 U(1) 丛：两块卡、转移函数 $e^{\mathrm{i}2g\phi}$，单值要求 $2g\in\mathbb{Z}$。`,
    explain: R`单极子场无法由一个处处光滑的矢势给出，必须用北、南两块卡上的 Wu–Yang 势，在赤道上以 $t_{\rm NS}=e^{\mathrm{i}\varphi}$ 粘合，$\varphi=2g\phi$。转移函数是 $S^1\to\mathrm{U}(1)$ 的映射，按 $\pi_1(\mathrm{U}(1))=\mathbb{Z}$ 分类，卷绕数就是 $2g$。

总通量 $4\pi g=\oint(A_{\rm N}-A_{\rm S})$ 也等于 $2\pi\times$ 卷绕数：曲率的积分是拓扑整数——第一陈数。`,
    analogy: R`给地球表面铺两张地图（北半球、南半球），在赤道上要求两张图"对得上"：若一张图绕赤道一圈旋转了非整数圈，就对不上。`,
    book_example: { what: R`\eqref{10.92}–\eqref{10.93}：$\Delta\varphi=4\pi g$，$\Delta\varphi/2\pi=2g\in\mathbb{Z}$。`, point: "电荷量子化的拓扑起源。" },
    misconception: R`Dirac 弦不是物理的：它只是"硬用一块卡"的代价；两块卡的描述处处光滑。`,
  },
  {
    id: "ab_effect", name_zh: "Aharonov–Bohm 效应", name_en: "Aharonov–Bohm effect", icon: "🌀", section_id: "10.5.3", group: "phys",
    plain: R`场强处处为零，和乐却非平凡：相位 $e^{\mathrm{i}e\Phi}$ 可以观测。`,
    explain: R`$\mathbb{R}^2-\{0\}$ 上的联络 $\mathcal{A}=\mathrm{i}\frac{\Phi}{2\pi}\dd\theta$ 平坦（$\mathcal{F}=0$），但绕原点一圈的和乐是 $e^{-\mathrm{i}\Phi}$（原书约定）。两条路径的干涉相位差为 $e\Phi$，通量相差 $2\pi/e$ 的整数倍时条纹相同。

这说明规范势（更准确地说：联络的和乐）比场强携带更多的物理信息。`,
    analogy: R`箭头在一个"平坦但有洞"的圆锥上绕一圈也会转——转角集中在锥顶，你走过的地方却处处平坦。`,
    book_example: { what: R`\eqref{10.104}：$\Gamma:\psi(0)\mapsto e^{-\mathrm{i}\Phi}\psi(0)$。`, point: "平坦联络的非平凡和乐。" },
    misconception: R`电子"感受不到磁场"并不意味着没有效应：效应来自整体的和乐，而不是局部的力。`,
  },
  {
    id: "instanton", name_zh: "瞬子数 = 映射度", name_en: "Instanton number", icon: "🌐", section_id: "10.5.5", group: "phys",
    plain: R`$-\frac1{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2=\frac1{24\pi^2}\int_{S^3}\Tr(g^{-1}\dd g)^3=n\in\mathbb{Z}$。`,
    explain: R`有限作用要求无穷远处 $\mathcal{A}\to g^{-1}\dd g$；把 $\mathbb{R}^4$ 紧化成 $S^4$，$g$ 就成了赤道 $S^3$ 上的转移函数，按 $\pi_3(\mathrm{SU}(2))=\mathbb{Z}$ 分类。$\Tr\mathcal{F}^2=\dd K$（Chern–Simons 形式），Stokes 定理把四维积分化为 $S^3$ 上纯规范的积分，它就是映射度。

自对偶解 $\mathcal{F}=\pm*\mathcal{F}$ 的作用量正比于 $|n|$：在给定拓扑扇区里作用量最小。`,
    analogy: R`给一个三维球面"包"一层 $\mathrm{SU}(2)$ 的皮：包了几层就是映射度，不撕破皮就改不了层数。`,
    book_example: { what: R`\eqref{10.124}：$g_1$ 在北极 $\Tr\mathcal{A}^3=12\,\dd x^1\wedge\dd x^2\wedge\dd x^3$，$\int=12\cdot2\pi^2=24\pi^2$。`, point: "恒等映射的度为 1。" },
    misconception: R`$\Tr\mathcal{F}^2$ 局部恰当（$=\dd K$）不等于整体恰当：$K$ 不是规范不变的，在不同卡上不能拼成整体形式。`,
  },
  {
    id: "berry", name_zh: "Berry 相位", name_en: "Berry's phase", icon: "🎯", section_id: "10.6", group: "phys",
    plain: R`绝热演化一圈的几何相位 = 参数空间 U(1) 丛上 Berry 联络的和乐。`,
    explain: R`本征态 $|\boldsymbol R\rangle$ 的相位不定，给参数空间每点附上一个 U(1) 纤维；Berry 联络 $\mathcal{A}=\langle\boldsymbol R|\dd|\boldsymbol R\rangle$（反 Hermite）在换相位时按规范变换变。绝热定理的相位方程恰好是水平提升方程，所以 Berry 相位 $\eta=\mathrm{i}\oint\mathcal{A}=\mathrm{i}\int_S\mathcal{F}$。

自旋 1/2 在磁场 $\boldsymbol R$ 中：简并点 $\boldsymbol R=0$ 像一个强度 $\frac12$ 的磁单极，Berry 相位 $=-\frac12\times$ 立体角。`,
    analogy: R`缓慢地把一个陀螺仪沿闭合路线搬一圈，回来时它的指向多转了一个只取决于路线几何的角度。`,
    book_example: { what: R`例 10.8：$\mathcal{A}_{\rm N}=\frac12\mathrm{i}(1-\cos\theta)\dd\phi$。`, point: "参数空间里的 Wu–Yang 单极子。" },
    misconception: R`Berry 相位不是动力学相位：它与演化快慢无关（只要绝热），只依赖闭路。`,
  },
];

export const relations = [
  { from: "connection", to: "conn_form", label: "代数化" },
  { from: "conn_form", to: "gauge_potential", label: R`拉回 $\sigma^*$` },
  { from: "conn_form", to: "horizontal_lift", label: R`$\omega(\tilde X)=0$` },
  { from: "horizontal_lift", to: "holonomy", label: "闭路" },
  { from: "conn_form", to: "curvature", label: R`$\mathrm{D}\omega$` },
  { from: "curvature", to: "curv_meaning", label: "无穷小和乐" },
  { from: "curv_meaning", to: "holonomy", label: "Ambrose–Singer" },
  { from: "curvature", to: "bianchi", label: R`$\mathrm{D}\Omega=0$` },
  { from: "horizontal_lift", to: "assoc_cov", label: "相伴丛" },
  { from: "assoc_cov", to: "metric_conn", label: "保内积" },
  { from: "gauge_potential", to: "monopole", label: "两块卡" },
  { from: "holonomy", to: "ab_effect", label: "平坦但非平凡" },
  { from: "curvature", to: "instanton", label: R`$\Tr\mathcal{F}^2$` },
  { from: "holonomy", to: "berry", label: "参数空间" },
  { from: "monopole", to: "berry", label: R`强度 $\frac12$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**联络** = 与右作用相容的水平子空间 = 满足 $\omega(A^\#)=A$、$R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega$ 的 $\mathfrak{g}$ 值一形式。局部拉回 $\mathcal{A}_i=\sigma_i^*\omega$ 是**规范势**，换卡/换截面就是**规范变换** $\mathcal{A}\to g^{-1}\mathcal{A}g+g^{-1}\dd g$。`}</TxI>,
  <TxI>{R`**平行移动**：水平提升满足 $\dot g=-\mathcal{A}(X)g$，解为 $\mathcal{P}\exp(-\int\mathcal{A})$。沿闭路得到**和乐** $g_\gamma=\mathcal{P}\exp(-\oint\mathcal{A})$（Wilson 圈），全体组成和乐群。`}</TxI>,
  <TxI>{R`**曲率** $\Omega=\mathrm{D}\omega=\dd_P\omega+\omega\wedge\omega$ 是无穷小闭路的和乐；局部 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$ 按 $\mathcal{F}\to t^{-1}\mathcal{F}t$ 协变；**Bianchi** $\mathcal{D}\mathcal{F}=0$ 是 Maxwell 方程的齐次一半。`}</TxI>,
  <TxI>{R`**相伴丛**上的协变导数 $\nabla_\mu=\partial_\mu+\mathcal{A}_\mu$ 就是最小耦合；$\nabla\nabla=\mathcal{F}$。保内积 ⇔ 联络取值于 $\mathrm{\mathfrak{o}}(k)$（或 $\mathfrak{u}(k)$）。`}</TxI>,
  <TxI>{R`**拓扑量子化**：单极子 $2g=\frac{1}{2\pi}\int_{S^2}F\in\mathbb{Z}$，瞬子数 $n=-\frac1{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2\in\mathbb{Z}$，Berry 相位 $=$ 参数空间里的单极通量——它们都是"曲率的积分 = 转移函数的卷绕"，第 11 章的示性类将统一它们。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`在主丛 $P(M,G)$ 上，下面哪一个是**不需要**额外选择、由丛结构本身决定的？`,
    options: [R`水平子空间 $H_uP$`, R`竖直子空间 $V_uP$`, R`联络一形式 $\omega$`, R`规范势 $\mathcal{A}_i$`],
    answer: 1, why: R`$V_uP$ 是纤维 $G_p$ 在 $u$ 处的切空间，由基本向量场 $A^\#$ 张成。$H_uP$ 需要选联络；$\mathcal{A}_i$ 还需要再选局部截面。`,
  },
  {
    q: R`换局部截面 $\sigma_2=\sigma_1g$ 时，场强 $\mathcal{F}$ 如何变化？`,
    options: [R`$\mathcal{F}_2=\mathcal{F}_1$`, R`$\mathcal{F}_2=g^{-1}\mathcal{F}_1g+g^{-1}\dd g$`, R`$\mathcal{F}_2=g^{-1}\mathcal{F}_1g$`, R`$\mathcal{F}_2=g\mathcal{F}_1g^{-1}$`],
    answer: 2, why: R`场强按伴随表示协变（定理 10.5），非齐次项 $g^{-1}\dd g$ 在 $\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$ 中两两相消。只有阿贝尔群时 $\mathcal{F}$ 才不变。交互图 3 可以数值验证。`,
  },
  {
    q: R`Aharonov–Bohm 联络 $\mathcal{A}=\mathrm{i}\frac{\Phi}{2\pi}\dd\theta$ 在 $\mathbb{R}^2-\{0\}$ 上曲率为零。下列说法哪个正确？`,
    options: [R`和乐群平凡，因为曲率为零`, R`限制和乐群平凡，但绕原点的闭路的和乐是 $e^{-\mathrm{i}\Phi}$`, R`和乐群是整个 $\mathrm{U}(1)$`, R`和乐依赖于闭路的形状`],
    answer: 1, why: R`由 Ambrose–Singer，平坦 ⇒ 限制和乐群（零伦闭路）平凡；但 $\pi_1(\mathbb{R}^2-\{0\})=\mathbb{Z}$，不可缩闭路的和乐 $e^{-\mathrm{i}n\Phi}$ 只依赖绕数 $n$，不依赖形状。`,
  },
  {
    q: R`Dirac 单极子的转移函数 $t_{\rm NS}=e^{\mathrm{i}2g\phi}$。为什么要求 $2g\in\mathbb{Z}$？`,
    options: [R`为了使 $\mathcal{A}_{\rm N}$ 在北极光滑`, R`为了使总通量为正`, R`为了使 $t_{\rm NS}$ 在赤道上是单值函数（$\phi=0$ 与 $\phi=2\pi$ 是同一点）`, R`为了使场强满足 Bianchi 恒等式`],
    answer: 2, why: R`转移函数必须是赤道 $S^1$ 上的单值映射；$e^{\mathrm{i}2g\cdot2\pi}=1$ ⇔ $2g\in\mathbb{Z}$。等价地，两块卡算出的 Wilson 圈相位必须一致（交互图 2）。`,
  },
  {
    q: R`在 $S^2$ 上沿纬圈 $\theta=\theta_0$ 平行移动一个切向量，回来时它转过的角度（模 $2\pi$）是？`,
    options: [R`$0$`, R`$2\pi\cos\theta_0$`, R`$2\pi(1-\cos\theta_0)$`, R`$\pi\theta_0^2$`],
    answer: 2, why: R`转角 = 围住的面积 $\times K$ = $2\pi(1-\cos\theta_0)$（Gauss–Bonnet）。在北极正则的标架下，它就是局部联络 $(1-\cos\theta)\dd\phi$ 的线积分——形式上与强度 $g=1$ 的单极子势相同：$TS^2$ 是"陈数 2"的 U(1) 丛。若用沿纬圈的标准标架 $(e_\theta,e_\phi)$ 来量，转角是 $-2\pi\cos\theta_0$，与正确答案只差 $2\pi$（标架自己转了一圈），而不是 $+2\pi\cos\theta_0$。`,
  },
  {
    q: R`为什么 $\int_{S^4}\Tr\mathcal{F}^2$ 能化成 $S^3$ 上的积分，而结果又只依赖 $g:S^3\to\mathrm{SU}(2)$ 的同伦类？`,
    options: [R`因为 $\Tr\mathcal{F}^2=0$`, R`因为局部 $\Tr\mathcal{F}^2=\dd K$，Stokes 定理把积分推到边界；在 $S^3$ 上 $\mathcal{A}=g^{-1}\dd g$，$K=-\frac13\Tr\mathcal{A}^3$`, R`因为 $S^4$ 可缩`, R`因为 $\mathcal{F}$ 是自对偶的`],
    answer: 1, why: R`引理 10.3 与 10.4。$S^4$ 不可缩（$H^4(S^4)=\mathbb{R}$），这正是 $\Tr\mathcal{F}^2$ 可以有非零积分的原因；自对偶只影响作用量与拓扑数的关系，不影响拓扑数本身。`,
  },
];

export const BRIDGE = R`本章发现：曲率的某些积分——单极子的 $\frac{1}{2\pi}\int F$、瞬子的 $-\frac1{8\pi^2}\int\Tr\mathcal{F}^2$、Berry 通量——总是整数，而且不随联络的连续变形而变。原因是它们是闭形式（Bianchi 恒等式保证 $\dd\Tr\mathcal{F}^k=0$），而换联络只让它们相差一个恰当形式（Chern–Simons 形式）。第 11 章把这一观察系统化为**示性类**理论：陈类、Pontrjagin 类、Euler 类都是由曲率构造的、不依赖联络的 de Rham 上同调类；它们刻画丛的扭曲程度，并在第 12 章的指标定理中与 Dirac 算子的零模个数联系起来。`;
