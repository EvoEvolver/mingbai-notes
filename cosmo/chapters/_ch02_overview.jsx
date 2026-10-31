// 第 2 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一颗 $z=13$ 的星系，离我们有多远？";
export const HOOK = R`2022 年起，詹姆斯·韦布空间望远镜陆续拍到红移 $z\approx13$ 的星系——它们的光出发时，宇宙年龄只有约 3 亿年。新闻标题说它"距离我们 330 亿光年"，可宇宙年龄才 138 亿年，光怎么可能走了 330 亿光年？另一份报道又说它"在 135 亿年前发出光"。这两个数字都没错，只是在回答不同的问题：前者是今天的"共动距离"，后者是"回溯时间"。如果你去量这个星系在照片上张多大角度，还会得到第三个"距离"；如果数它有多亮，会得到第四个。

本章要做的，就是把"宇宙在均匀变大"这句话变成一套能算的工具：用度规描述膨胀的空间，用测地线方程追踪光子，于是知道光为什么红移、各种距离之间是什么关系；再用能量守恒和统计力学追踪宇宙里的"东西"——光子、中微子、重子、暗物质、暗能量——各自如何随膨胀稀释。最后我们会清点出宇宙的家底，并解释为什么正是这些"距离"让我们发现了暗能量。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "2.1.1", title: "度规：把坐标变成真实距离", gist: R`用度规 $g_{\mu\nu}$ 描述时空；膨胀的欧氏宇宙就是"空间部分乘上 $a^2(t)$ 的 Minkowski 时空"——FLRW 度规。`, gives: ["2.4", "2.12"], next: R`有了舞台，下一步问：在这个舞台上自由粒子怎么运动？` },
  { sec: "2.1.2", title: "测地线：光子能量为何随 $1/a$ 衰减", gist: R`把"不受力走直线"推广为测地线方程，从度规算出 Christoffel 符号，得到无质量粒子 $E\propto1/a$——红移的严格推导。`, gives: ["2.20", "2.21", "2.24", "2.31"], next: R`光子在走、在红移；它们走了多远？这引出"距离"。` },
  { sec: "2.2", title: "膨胀宇宙中的距离", gist: R`光沿 $d\sym{ch02-interval}{s}^2=0$ 传播 → 共动距离 $\chi(z)$ 与共形时间 $\eta$；用标准尺定义 $d_A=a\chi$，用标准烛光定义 $d_L=\chi/a$。`, gives: ["2.34", "2.35", "2.37", "2.39", "2.43"], next: R`几何讲完，转向宇宙的内容：能量密度怎样随 $a$ 变化？` },
  { sec: "2.3", title: "能量的演化", gist: R`$\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ 在 FLRW 中化为连续性方程，给出 $\rho\propto a^{-3(1+w)}$；用分布函数把 $\rho$、$\mathcal P$ 写成相空间积分，并证明熵密度 $s\propto a^{-3}$。`, gives: ["2.56", "2.61", "2.62", "2.64", "2.70"], next: R`有了 $\rho(T)$ 和演化律，就可以逐项清点今天的宇宙。` },
  { sec: "2.4", title: "宇宙清点：光子、重子、暗物质、中微子", gist: R`$\rho_\gamma=\pi^2T^4/15$ 给出 $\Omega_\gamma h^2$；重子与总物质靠 BBN、CMB、透镜测得约 5% 与 30%；熵守恒给出 $T_\nu/T=(4/11)^{1/3}$ 与 $\Omega_\nu h^2=\sum m_\nu/94\,\mathrm{eV}$。`, gives: ["2.75", "2.76", "2.81", "2.82", "2.84"], next: R`把物质与辐射放在一起比较，就得到两者相等的时刻。` },
  { sec: "2.4.5", title: "物质–辐射相等", gist: R`辐射 $\propto a^{-4}$、物质 $\propto a^{-3}$，二者在 $a_{\rm eq}=4.15\times10^{-5}/\Omega_{\rm m}h^2$（$z_{\rm eq}\approx3400$）相交。`, gives: ["2.85", "2.86", "2.87"], next: R`物质只占 30%，剩下的是什么？距离测量给出答案。` },
  { sec: "2.4.6", title: "暗能量", gist: R`超新星的光度距离（距离模数）与 BAO 测得的 $\dot a(z)$ 直接显示加速膨胀；暗能量完全由 $w_{\rm DE}(a)$ 刻画，观测上 $w\approx-1$。`, gives: ["2.88"], next: R`最后把全章压缩成几条公式。` },
  { sec: "2.5", title: "小结", gist: R`所有距离都来自 $\chi(z)=\int dz/H$；$\chi=\eta_0-\eta$；宇宙清点表与 $a_{\rm eq}$。`, gives: ["2.89", "2.90", "2.91"] },
];

// ---------- 推导图（两张：几何线 11 个节点 + 物质线 13 个节点）----------
export const EQMAP_GEOM = [
  { from: "2.21", to: "2.24", label: "代入 FLRW" },
  { from: "2.12", to: "2.24", label: R`$\partial_t g_{ij}=2a\dot a\delta_{ij}$` },
  { from: "2.20", to: "2.31", label: R`0 分量 + $P^2=0$` },
  { from: "2.24", to: "2.31", label: R`只剩 $\Gamma^0{}_{ij}$` },
  { from: "2.12", to: "2.34", label: R`光线 $d\sym{ch02-interval}{s}^2=0$` },
  { from: "2.12", to: "2.35", label: R`自 $t=0$ 积分` },
  { from: "2.34", to: "2.37", label: "标准尺" },
  { from: "2.37", to: "2.39", label: R`计入 $\Omega_{\rm K}$` },
  { from: "2.34", to: "2.43", label: "标准烛光" },
  { from: "2.31", to: "2.43", label: R`能量、到达率各 $\times a$` },
  { from: "2.43", to: "2.88", label: "换成星等" },
];
export const EQMAP_MATTER = [
  { from: "2.45", to: "2.56", label: R`$\nu=0$ 分量` },
  { from: "2.56", to: "2.61", label: R`$\mathcal P=w\rho$` },
  { from: "2.61", to: "2.72", label: R`以 $\rho_{\rm cr}$ 归一` },
  { from: "2.62", to: "2.67", label: R`$f=f(E/T)$` },
  { from: "2.56", to: "2.70", label: "改写" },
  { from: "2.67", to: "2.70", label: "" },
  { from: "2.62", to: "2.75", label: R`BE 分布，$\mu=0$` },
  { from: "2.75", to: "2.76", label: R`$T_0=2.726\,$K` },
  { from: "2.70", to: "2.81", label: R`$e^\pm$ 湮灭前后 $sa^3$ 守恒` },
  { from: "2.62", to: "2.84", label: "FD + 质量" },
  { from: "2.81", to: "2.84", label: R`$T_\nu$` },
  { from: "2.76", to: "2.85", label: R`$\rho_\gamma$` },
  { from: "2.81", to: "2.85", label: R`$\rho_\nu=0.681\rho_\gamma$` },
  { from: "2.85", to: "2.86", label: R`$\rho_{\rm r}=\rho_{\rm m}$` },
  { from: "2.72", to: "2.86", label: R`物质 $w=0$` },
];
export const EQMAP_LABELS = {
  "2.12": "FLRW 度规", "2.20": "测地线方程", "2.21": "Christoffel 符号", "2.24": R`FLRW 的 $\Gamma^\mu{}_{\alpha\beta}$`, "2.31": R`$E\propto 1/a$`, "2.34": "共动距离", "2.35": "共形时间", "2.37": "角直径距离", "2.39": "弯曲宇宙的 $d_A$",
  "2.43": "光度距离", "2.88": "距离模数", "2.45": "能动张量守恒", "2.56": "连续性方程", "2.61": R`$\rho\propto a^{-3(1+w)}$`,
  "2.72": R`$\rho_s(a)$ 与 $\Omega_s$`, "2.70": R`熵密度 $s\propto a^{-3}$`, "2.62": R`$\rho$ 由分布函数给出`, "2.75": "光子能量密度", "2.76": R`$\Omega_\gamma h^2$`,
  "2.81": R`$T_\nu/T$`, "2.67": R`$\partial\mathcal P/\partial T$ 关系`, "2.84": R`$\Omega_\nu h^2$`, "2.85": "辐射密度", "2.86": R`$a_{\rm eq}$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "geom", label: "时空几何" },
  { id: "light", label: "光与距离" },
  { id: "matter", label: "能量与统计" },
  { id: "inv", label: "宇宙清点" },
];

export const concepts = [
  {
    id: "metric", name_zh: "度规", name_en: "Metric", icon: "📏", section_id: "2.1.1", group: "geom",
    plain: "一张\"换算表\"：把坐标上的间隔换成真实的距离和时间。",
    explain: R`坐标只是给时空中的点贴标签，标签之差本身没有物理意义。度规 $g_{\mu\nu}$ 告诉你：两个相邻点之间的坐标差 $dx^\mu$，对应多大的不变间隔 $d\sym{ch02-interval}{s}^2=g_{\mu\nu}dx^\mu dx^\nu$。换一套坐标，$g_{\mu\nu}$ 的样子会变，但算出的 $d\sym{ch02-interval}{s}^2$ 不变。

在广义相对论里，度规还承担了引力：引力不再是外力，而是"时空弯曲"本身，它就写在 $g_{\mu\nu}$ 里。本章只需要度规的第一个角色——描述一个均匀膨胀的空间。`,
    analogy: "就像地图上的比例尺，只不过它可以随地点、随方向而变：墨卡托地图在两极处的\"比例尺\"和赤道处完全不同，但只要你用对了这张比例尺表，量出的真实距离都是对的。",
    book_example: { what: R`平面上的笛卡尔度规 $\mathrm{diag}(1,1)$ 与极坐标度规 $\mathrm{diag}(1,r^2)$（式 2.2–2.3）描述同一个平面；地球表面的墨卡托投影与温克尔三重投影（图 2.1）描述同一个球面。`, point: "度规的形式依赖坐标，但它算出的距离、面积、角度与坐标无关。" },
    misconception: "度规的分量不同不代表空间不同；只有无论怎么换坐标都无法消去的\"弯曲\"才是真实的几何性质。",
  },
  {
    id: "flrw", name_zh: "FLRW 度规与标度因子", name_en: "FLRW metric & scale factor", icon: "🎈", section_id: "2.1.1", group: "geom",
    plain: "膨胀宇宙 = 空间坐标乘上一个随时间增长的因子 $a(t)$。",
    explain: R`在均匀、各向同性且空间平直的宇宙中，度规就是 Minkowski 度规把空间部分乘上 $a^2(t)$：$d\sym{ch02-interval}{s}^2=-dt^2+a^2(t)\,\delta_{ij}dx^idx^j$。共动坐标 $x^i$ 是贴在"哈勃流"上的标签，两个共动点的物理距离是 $a(t)$ 乘以它们的坐标距离。

因为 $g_{00}=-1$，坐标 $t$ 恰是共动观测者手表上的时间（宇宙时）。今天约定 $a=1$，于是过去 $a<1$，并有 $1+z=1/a$。`,
    analogy: "在气球上画一张经纬网再吹气：网格上的点\"坐标\"不变，但它们之间的真实距离随气球半径一起长大。$a(t)$ 就是这个半径的相对值。",
    book_example: { what: R`式 (2.12)：$g_{\mu\nu}=\mathrm{diag}(-1,a^2,a^2,a^2)$，由第 1 章图 1.1 的膨胀网格直接推广而来。`, point: "宇宙膨胀不是星系在固定空间里飞散，而是度规的空间部分整体变大。" },
    misconception: "星系相互远离并不是在\"空间中运动\"——共动星系的坐标不变，变的是 $a(t)$。",
  },
  {
    id: "geodesic", name_zh: "测地线与 Christoffel 符号", name_en: "Geodesic & Christoffel symbols", icon: "🧭", section_id: "2.1.2", group: "geom",
    plain: "\"不受力走直线\"在任意坐标、弯曲时空中的推广。",
    explain: R`笛卡尔坐标中自由粒子满足 $d^2x^i/dt^2=0$；换到极坐标，基矢逐点转向，方程里就多出"离心项"之类的附加项。把这些附加项的系数收集起来，就是 Christoffel 符号 $\Gamma^\mu{}_{\alpha\beta}$，它可以直接由度规的一阶导数算出（式 2.21）。

测地线方程 $\dfrac{d^2x^\mu}{d\lambda^2}+\Gamma^\mu{}_{\alpha\beta}\dfrac{dx^\alpha}{d\lambda}\dfrac{dx^\beta}{d\lambda}=0$ 是除引力外不受力的粒子的运动方程。在膨胀宇宙中，无论怎样选坐标都消不掉所有 $\Gamma^\mu{}_{\alpha\beta}$，所以这个方程不可或缺。`,
    analogy: "在旋转木马上看，一个直线飞出的球好像被一股\"力\"拐弯了。这股\"力\"其实来自你选的坐标在转——Christoffel 符号就是把这类\"坐标造成的表观力\"系统地记账。",
    book_example: { what: R`FLRW 度规中只有 $\Gamma^0{}_{ij}=\delta_{ij}a\dot a$ 与 $\Gamma^i{}_{0j}=\delta_{ij}\dot a/a$ 非零（式 2.24–2.25）。`, point: "这两个分量就是膨胀\"拖拽\"粒子动量的全部来源。" },
    misconception: "Christoffel 符号不是张量；它为零与否取决于坐标。但在弯曲（或膨胀）时空中不存在处处使它为零的坐标。",
  },
  {
    id: "redshift", name_zh: "宇宙学红移", name_en: "Cosmological redshift", icon: "🔴", section_id: "2.1.2", group: "light",
    plain: R`宇宙每膨胀一倍，光子能量就减半：$E\propto 1/a$。`,
    explain: R`把 FLRW 的 Christoffel 符号代入测地线方程的时间分量，并利用无质量粒子 $P^2=0$，得到 $dE/dt+(\dot a/a)E=0$，解为 $E=E_0/a$。对任何粒子，物理动量 $p$ 都按 $1/a$ 衰减。

于是光在 $a_{\rm emit}$ 发出、今天（$a=1$）被接收时，能量比为 $a_{\rm emit}=1/(1+z)$。这就是红移的严格定义。它也意味着黑体谱在膨胀中保持黑体形式，只是温度 $T\propto 1/a$。`,
    analogy: R`把一根画着波浪的橡皮筋拉长：波长变长了，"波峰数"不变。光子的波长随空间一起被拉长，能量 $\propto 1/$波长 自然下降。`,
    book_example: { what: "式 (2.28)–(2.31) 的推导；同一结论在第 1 章用手势论证得到，第 3 章还会用 Boltzmann 方程第三次得到。", point: "红移是度规随时间变化的几何后果，不是多普勒效应的类比。" },
    misconception: "宇宙学红移不是\"星系在跑开所以多普勒红移\"，而是光在传播途中被膨胀拉长；它只取决于发射与接收时的 $a$ 之比。",
  },
  {
    id: "conformal_time", name_zh: "共形时间与共动视界", name_en: "Conformal time & comoving horizon", icon: "⏳", section_id: "2.2", group: "light",
    plain: "宇宙诞生以来光最多能走多远（共动距离），同时也是一个好用的时钟。",
    explain: R`$\eta=\int dt/a$ 是自 $t=0$ 以来光在共动网格上能走过的最远距离。相距超过 $\eta$ 的两个区域从未有过因果联系——如果它们看起来一模一样，就需要解释（这就是第 7 章暴胀要解决的视界问题）。

因为 $\eta$ 单调增加，它也可以当作时间变量。用 $\eta$ 改写，FLRW 度规变成 $a^2(\eta)[-d\eta^2+d\boldsymbol x^2]$，光线在 $(\eta,x)$ 平面上走 45° 直线。研究扰动时它是最方便的时钟。物质主导时 $\eta\propto a^{1/2}$，辐射主导时 $\eta\propto a$。`,
    analogy: R`像一场从宇宙诞生起就开始扩散的"消息"：$\eta$ 是消息此刻传到的半径。半径之外的地方还不知道发生过什么。`,
    book_example: { what: R`式 (2.35) 定义 $\eta$；小结中 $\chi(z)=\eta_0-\eta(z)$（式 2.91），今天 $\eta_0\approx14\,\mathrm{Gpc}$。`, point: "距离与时间在膨胀宇宙中是同一枚硬币的两面。" },
    misconception: R`$\eta$ 不是宇宙年龄乘以光速；因为早期 $a$ 很小，光在早期走过的共动距离被放大，$\eta_0\approx14\,\mathrm{Gpc}$ 远大于 $13.8\,\mathrm{Gyr}\times c$。`,
  },
  {
    id: "distances", name_zh: "角直径距离与光度距离", name_en: "Angular diameter & luminosity distances", icon: "🔭", section_id: "2.2", group: "light",
    plain: "用\"看起来多大\"和\"看起来多亮\"定义的两种距离，都从共动距离算出。",
    explain: R`所有距离都以共动距离 $\chi(z)=\int dz/H$ 为起点。标准尺：已知物理尺度 $l$ 张角 $\sym{ch02-thang}{\theta}$，定义 $d_A=l/\sym{ch02-thang}{\theta}$；欧氏宇宙中 $d_A=a\chi=\chi/(1+z)$，高红移处反而变小。标准烛光：已知光度 $L$、测得流量 $F$，定义 $F=L/4\pi d_L^2$；由于光子能量与到达速率各降低一个因子 $a$，$d_L=\chi/a$。

普遍关系 $d_L=d_A/a^2$ 在弯曲宇宙中也成立；曲率通过 $\sin$/$\sinh$ 改变 $d_A$。暗能量让过去膨胀更慢，所有距离变大，超新星看起来更暗——这正是暗能量的发现方式。`,
    analogy: R`在雾夜里判断远处路灯：可以看灯罩张开多大角度（标准尺），也可以看它有多亮（标准烛光）。在膨胀的宇宙里，这两种"目测"给出的数值不一样，但都能从同一张"路线图" $\chi(z)$ 算出来。`,
    book_example: { what: R`图 2.3：协调模型中 $d_A$ 在 $z\approx1.6$ 处达到极大约 $1220\,h^{-1}\mathrm{Mpc}$，之后下降；而 $d_L$ 一路上升。`, point: "高红移天体看起来\"更大\"，因为光出发时整个宇宙都更小。" },
    misconception: "$d_A$ 的下降并不说明天体离我们更近了；它只反映光出发时宇宙的尺寸。",
  },
  {
    id: "stress_energy", name_zh: "能动张量守恒与连续性方程", name_en: "Energy-momentum conservation", icon: "⚖️", section_id: "2.3", group: "matter",
    plain: R`能量守恒的相对论版本；在膨胀宇宙中它说：$\dot\rho+3H(\rho+\mathcal P)=0$。`,
    explain: R`对光滑宇宙，各成分只有平均密度 $\rho$ 和压强 $\mathcal P$ 有意义，它们组成能动张量 $\sym{ch02-Tmn}{T}^\mu{}_\nu=\mathrm{diag}(-\rho,\mathcal P,\mathcal P,\mathcal P)$——这个形式完全由 FLRW 的对称性决定，不要求成分真是流体。

守恒律必须用协变导数写成 $\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$。它的时间分量在 FLRW 中化为连续性方程 (2.56)：一个共动体积内的能量减少，恰等于压强对"邻居"做的功，即绝热膨胀的热力学第一定律 $dE=-\mathcal P\,dV$。空间分量在光滑宇宙中平凡为零。`,
    analogy: R`一个被缓慢拉大的活塞气缸：气体对外做功 $\mathcal P\,dV$，内能就减少同样多。宇宙中每个共动体积都像这样的气缸，只是它的"外界"是同样在膨胀的邻居。`,
    book_example: { what: R`(2.54)→(2.56)：$\Gamma^\mu{}_{0\mu}=3\dot a/a$ 和 $\Gamma^\alpha{}_{0\mu}\sym{ch02-Tmn}{T}^\mu{}_\alpha=3(\dot a/a)\mathcal P$ 给出 $\partial\rho/\partial t+(\dot a/a)(3\rho+3\mathcal P)=0$。`, point: "膨胀宇宙中\"能量不守恒\"的说法不准确：局域能量守恒依然成立，只是要用协变导数表述。" },
    misconception: R`不能用普通偏导数 $\partial_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ 表述守恒——那依赖于坐标，在膨胀宇宙中会漏掉 Christoffel 项。`,
  },
  {
    id: "eos", name_zh: R`物态方程参数 $w$`, name_en: "Equation of state w", icon: "📉", section_id: "2.3", group: "matter",
    plain: R`压强与能量密度之比 $w=\mathcal P/\rho$，一个数就决定了成分如何随膨胀稀释。`,
    explain: R`把 $\mathcal P=w\rho$ 代入连续性方程，立即得到 $\rho\propto a^{-3(1+w)}$（常数 $w$）。物质 $w=0$ → $a^{-3}$（只稀释数密度）；辐射 $w=1/3$ → $a^{-4}$（再加上每个光子红移）；宇宙学常数 $w=-1$ → 常数。

由分布函数可以证明：任何普通粒子气体都满足 $0\le w\le 1/3$。所以 $w<0$ 的暗能量不可能是一团普通粒子，而必须是真空能、场的势能或修改引力的效应。`,
    analogy: "三种\"颜料\"在一块不断扩大的画布上：物质像撒了固定数量的沙粒，只是越来越稀；辐射像沙粒同时还在缩小；宇宙学常数像画布本身的底色，怎么拉都一样浓。",
    book_example: { what: R`式 (2.60)–(2.61) 及其后的成分标度表；§2.4.6 指出暗能量对膨胀历史的影响完全由 $w_{\rm DE}(a)$ 决定。`, point: "$w$ 是连接微观成分与宏观膨胀史的唯一参数。" },
    misconception: "\"负压\"并不意味着向内的吸力；它让能量密度在膨胀中几乎不变，并通过 Einstein 方程导致加速膨胀（第 3 章）。",
  },
  {
    id: "distribution", name_zh: "分布函数与平衡统计", name_en: "Distribution function", icon: "🎲", section_id: "2.3", group: "matter",
    plain: R`数清楚每个"位置与动量"小格子里有几个粒子，$\rho$ 和 $\mathcal P$ 就是它的加权积分。`,
    explain: R`$f_s(\boldsymbol x,\boldsymbol p,t)$ 是相空间单元（体积 $(2\pi\hbar)^3$）中成分 $s$ 的平均粒子数。能量密度 $\rho_s=g_s\int\frac{d^3p}{(2\pi)^3}f_sE_s$，压强把权重换成 $p^2/3E$。平衡时 $f$ 是玻色–爱因斯坦或费米–狄拉克分布，只通过 $E/T$ 依赖动量（化学势可忽略时）。

光子取 BE 分布即得 $\rho_\gamma=\pi^2T^4/15$；费米子同样的积分小 7/8。膨胀让每个粒子的 $p\propto 1/a$，而 $T\propto 1/a$，所以 $E/T$ 不变——膨胀本身保持平衡分布的形式。`,
    analogy: "像人口普查按\"住址与年收入\"分格计数：总财富 = 每格人数乘以该格收入，再求和。分布函数就是宇宙粒子的普查表。",
    book_example: { what: R`式 (2.62)、(2.64)–(2.66)；图 2.4 解释为何每个相空间单元体积是 $(2\pi\hbar)^3$。`, point: R`宏观的 $\rho$、$\mathcal P$ 由微观统计给出，这是后面 Boltzmann 方程（第 3 章）的出发点。` },
    misconception: R`脱耦后的中微子仍保持 $1/(e^{p/T_\nu}+1)$ 的形状，但它已不是真正的费米–狄拉克平衡分布——指数里是 $p$ 而不是能量 $E$。`,
  },
  {
    id: "entropy_nu", name_zh: "熵守恒与中微子温度", name_en: "Entropy conservation & neutrino temperature", icon: "🌡️", section_id: "2.4.4", group: "matter",
    plain: R`共动熵守恒；正负电子湮灭把熵只交给了光子，所以光子比中微子热 $(11/4)^{1/3}$ 倍。`,
    explain: R`当化学势可忽略时 $\partial\mathcal P/\partial T=(\rho+\mathcal P)/T$，配合连续性方程可证 $s=(\rho+\mathcal P)/T$ 按 $a^{-3}$ 标度——膨胀是可逆绝热过程。每个无质量玻色自由度贡献 $2\pi^2T^3/45$，费米子乘 7/8。

中微子在 $T\sim1\,\mathrm{MeV}$ 时脱耦，随后 $e^+e^-$ 在 $T\sim m_e$ 湮灭。湮灭前光子 + $e^\pm$ 的有效自由度为 $2+\frac78\cdot4=\frac{11}2$，湮灭后只剩光子的 2。熵守恒要求光子的 $aT$ 提升 $(11/4)^{1/3}$ 倍，而中微子的 $aT_\nu$ 不变，所以 $T_\nu/T=(4/11)^{1/3}$，今天 $T_\nu=1.945\,\mathrm K$。`,
    analogy: R`两兄弟原本收入相同；哥哥（中微子）搬走后，家里一笔遗产（$e^\pm$ 的熵）全给了留在家里的弟弟（光子）。此后两人的收入都按同样比例缩水，但弟弟永远比哥哥多那一笔。`,
    book_example: { what: R`式 (2.78)–(2.81)：$\frac{43}2=4\left[(T/T_\nu)^3+\frac{21}8\right]$ ⇒ $(T/T_\nu)^3=11/4$。`, point: R`三代无质量中微子的能量密度是光子的 $3\cdot\frac78\cdot\left(\frac4{11}\right)^{4/3}=0.681$ 倍。` },
    misconception: R`中微子温度更低不是因为它们"冷却得更快"——两者都按 $1/a$ 冷却；是光子在 $e^\pm$ 湮灭时额外获得了一次加热。`,
  },
  {
    id: "density_params", name_zh: "密度参数与宇宙清点", name_en: "Density parameters & cosmic inventory", icon: "🧾", section_id: "2.4", group: "inv",
    plain: R`把每种成分今天的密度除以临界密度：光子 $5\times10^{-5}$，重子 5%，暗物质 25%，暗能量 70%。`,
    explain: R`$\Omega_s=\rho_s(t_0)/\rho_{\rm cr}$，$\rho_{\rm cr}=3H_0^2/8\pi G$。由于 $H_0$ 有误差，物理密度常以 $\Omega_sh^2$ 报告。光子由 CMB 温度直接给出 $\Omega_\gamma h^2=2.47\times10^{-5}$；重子由 BBN 氘丰度与 CMB 给出 $\Omega_{\rm b}h^2\approx0.022$；总物质由 CMB、透镜、星系团给出 $\Omega_{\rm m}\approx0.3$，因而 80% 以上的物质是非重子暗物质；有质量中微子 $\Omega_\nu h^2=\sum m_\nu/94\,\mathrm{eV}$。

辐射 $\propto a^{-4}$、物质 $\propto a^{-3}$，二者在 $a_{\rm eq}=4.15\times10^{-5}/\Omega_{\rm m}h^2$（$z_{\rm eq}\approx3400$）相等：之前是辐射主导，之后是物质主导，扰动的增长方式在两边截然不同。`,
    analogy: "给宇宙记账：临界密度是\"总预算\"，每种成分占多少比例一目了然；而 $a_{\\rm eq}$ 是账本上辐射与物质两栏交叉换位的那一页。",
    book_example: { what: "式 (2.71)–(2.72)、(2.76)、(2.84)–(2.87)；第 1 章图 1.3 的相等时刻在此得到定量值。", point: "今天辐射微不足道，但早期宇宙由它主导。" },
    misconception: R`$\Omega_s$ 是今天的值；早期各成分的相对比例完全不同（例如 $a_{\rm eq}$ 之前辐射超过物质）。`,
  },
  {
    id: "dark_energy", name_zh: "暗能量与加速膨胀", name_en: "Dark energy", icon: "🌌", section_id: "2.4.6", group: "inv",
    plain: "一种负压、不成团的成分，约占今天能量的 70%，让宇宙加速膨胀。",
    explain: R`三条独立证据：(1) 宇宙几何近乎平直而物质只有 30%，预算有缺口；(2) Ia 型超新星的光度距离比纯物质宇宙中更大（更暗），表明过去膨胀更慢；(3) BAO 直接测出 $\dot a=aH$ 在低红移处随时间增大，即 $\ddot a>0$。

只要知道 $w_{\rm DE}(a)$，暗能量对膨胀历史的影响就完全确定。宇宙学常数 $w=-1$；精质 $w\ge-1$。目前所有数据都与 $w=-1$ 相容——这就是 $\Lambda$CDM 协调模型。不同探针的参数简并方向不同，组合起来威力远大于单独使用。`,
    analogy: "开车下坡时本该越来越慢（引力减速），却发现车速表在近期反而往上走——一定有什么在踩油门。超新星和 BAO 就是那块车速表的读数记录。",
    book_example: { what: R`图 2.6–2.9：超新星哈勃图、$(\Omega_{\rm m},\Omega_\Lambda)$ 限制、$\dot a(z)$ 的 BAO 测量、$(\Omega_{\rm m},w)$ 限制。`, point: "几何探针与结构增长探针在同一模型上一致，是暗能量存在的有力论据。" },
    misconception: "\"暗能量\"不一定是宇宙学常数；它是对\"导致加速膨胀的东西\"的统称，也可能是标量场或引力理论的修改。",
  },
];

export const relations = [
  { from: "metric", to: "flrw", label: "具体化为" },
  { from: "flrw", to: "geodesic", label: "算出 Γ" },
  { from: "geodesic", to: "redshift", label: R`推出 $E\propto 1/a$` },
  { from: "flrw", to: "conformal_time", label: R`光线 $d\sym{ch02-interval}{s}^2=0$` },
  { from: "conformal_time", to: "distances", label: R`$\chi=\eta_0-\eta$` },
  { from: "redshift", to: "distances", label: R`$d_L$ 多出 $1/a$` },
  { from: "geodesic", to: "stress_energy", label: R`协变导数用 $\Gamma^\mu{}_{\alpha\beta}$` },
  { from: "stress_energy", to: "eos", label: R`$\rho\propto a^{-3(1+w)}$` },
  { from: "distribution", to: "eos", label: R`给出 $0\le w\le 1/3$` },
  { from: "distribution", to: "entropy_nu", label: R`$\partial\mathcal P/\partial T$ 关系` },
  { from: "stress_energy", to: "entropy_nu", label: R`推出 $s\propto a^{-3}$` },
  { from: "entropy_nu", to: "density_params", label: R`给出 $\rho_\nu$` },
  { from: "distribution", to: "density_params", label: R`给出 $\rho_\gamma$` },
  { from: "eos", to: "density_params", label: R`决定 $a_{\rm eq}$` },
  { from: "distances", to: "dark_energy", label: "超新星/BAO 证据" },
  { from: "eos", to: "dark_energy", label: R`$w\approx-1$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**几何**：膨胀的欧氏宇宙由 FLRW 度规 $d\sym{ch02-interval}{s}^2=-dt^2+a^2\delta_{ij}dx^idx^j$ 描述；测地线方程给出物理动量 $p\propto1/a$，光子能量 $E\propto1/a$，即 $1+z=1/a$。`}</TxI>,
  <TxI>{R`**距离**：一切从共动距离 $\chi=\int_0^z dz'/H(z')$ 出发；欧氏宇宙中 $d_A=a\chi$、$d_L=\chi/a$，普遍地 $d_L=d_A/a^2$；共形时间 $\eta$ 是因果视界，也是扰动理论的时钟。`}</TxI>,
  <TxI>{R`**演化**：$\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ ⇒ $\dot\rho+3H(\rho+\mathcal P)=0$ ⇒ $\rho_s\propto a^{-3(1+w_s)}$；共动熵守恒 $s\propto a^{-3}$。`}</TxI>,
  <TxI>{R`**清点**：$\Omega_\gamma h^2=2.47\times10^{-5}$；$T_\nu/T=(4/11)^{1/3}$；$\Omega_\nu h^2=\sum m_\nu/94\,\mathrm{eV}$；重子 $\approx5\%$，总物质 $\approx30\%$，暗能量 $\approx70\%$；$a_{\rm eq}=4.15\times10^{-5}/\Omega_{\rm m}h^2$。`}</TxI>,
  <TxI>{R`**暗能量**：超新星（$d_L$）与 BAO（$d_A$、$\dot a$）直接显示加速；暗能量对背景的影响完全由 $w_{\rm DE}(a)$ 决定，观测与 $w=-1$ 相符。`}</TxI>,
];

export const QUIZ = [
  {
    q: "在 FLRW 度规中，为什么无质量粒子的能量随 $1/a$ 下降？",
    options: ["因为光源在远离我们，产生多普勒效应", R`测地线方程的时间分量中 $\Gamma^0{}_{ij}\propto a\dot a$ 项使 $dE/dt=-(\dot a/a)E$`, "因为光子在传播中被星际介质吸收", "因为光速随宇宙膨胀而变慢"],
    answer: 1, why: R`红移是测地线方程的直接结果：$\Gamma^0{}_{ij}=\delta_{ij}a\dot a$ 加上 $P^2=0$ 给出 $dE/dt+(\dot a/a)E=0$，解为 $E\propto 1/a$。`,
  },
  {
    q: "欧氏宇宙中，为什么非常遥远的星系的角直径距离 $d_A$ 反而会变小？",
    options: ["因为它们离我们的共动距离变小了", R`因为光发出时宇宙整体更小，物体与我们的物理距离 $a\chi$ 更小`, "因为引力透镜把它们放大了", "因为光度距离与角直径距离相等"],
    answer: 1, why: R`$d_A=a\chi$：$\chi$ 随 $z$ 增长变缓，而 $a=1/(1+z)$ 持续变小，两者乘积在 $z\sim1.6$（协调模型）后下降。`,
  },
  {
    q: "某成分的物态方程 $w=-1/3$，它的能量密度如何随标度因子变化？",
    options: ["$a^{-3}$", "$a^{-4}$", "$a^{-2}$", "不变"],
    answer: 2, why: R`$\rho\propto a^{-3(1+w)}=a^{-3\cdot(2/3)}=a^{-2}$，与 Friedmann 方程中的曲率项相同。`,
  },
  {
    q: "为什么今天中微子的温度比光子低？",
    options: ["中微子有质量，冷却得更快", "$e^+e^-$ 湮灭发生在中微子脱耦之后，释放的熵几乎全给了光子", "中微子是费米子，温度天然低 7/8", "中微子从未与光子处于平衡"],
    answer: 1, why: R`两者都按 $1/a$ 冷却；但 $e^\pm$ 湮灭时光子的 $aT$ 被提升了 $(11/4)^{1/3}$ 倍，而已脱耦的中微子没有份。`,
  },
  {
    q: "下列哪项不是本章给出的暗能量证据？",
    options: ["Ia 型超新星比纯物质宇宙中更暗", R`BAO 测得 $\dot a$ 在低红移处随时间增大`, "宇宙近乎平直但物质只占约 30%", "中微子振荡表明中微子有质量"],
    answer: 3, why: R`中微子振荡关乎中微子质量与 $\Omega_\nu$，与暗能量无关；其余三项都是本章列出的暗能量证据。`,
  },
  {
    q: R`若今天物质密度 $\Omega_{\rm m}h^2$ 增大，物质–辐射相等的红移 $z_{\rm eq}$ 会怎样？`,
    options: ["升高", "降低", "不变", "取决于暗能量"],
    answer: 0, why: R`$1+z_{\rm eq}=2.38\times10^4\,\Omega_{\rm m}h^2$：物质越多，越早追上按 $a^{-4}$ 下降的辐射。`,
  },
];

export const BRIDGE = R`本章把膨胀的"舞台"（度规）和"演员"（各成分的分布函数）都摆好了，但还有两件事没回答：第一，$a(t)$ 本身由什么决定？——需要把度规与能动张量联系起来的 Einstein 方程，它将给出 Friedmann 方程并解释为什么负压导致加速。第二，分布函数怎样偏离平衡、又怎样随时间演化？——需要 Boltzmann 方程，它的碰撞项将描述核合成、复合与暗物质的冻结。第 3 章正是从这两个方程开始，并会第三次推出 $E\propto 1/a$。`;
