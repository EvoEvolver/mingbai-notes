// 第 6 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "绕着螺线管走一圈";
export const HOOK = R`一根无限长螺线管外面，磁场为零，可是矢势 $\nosym{\boldsymbol{A}}$ 不为零：在柱坐标里 $\nosym{A}=\frac{\nosym{\Phi}}{2\pi}\,\dd\theta$，其中 $\nosym{\Phi}$ 是管内磁通。外部的场强 $\dd \nosym{A}=0$——$\nosym{A}$ 是**闭形式**。它是不是某个标量的梯度（**恰当形式**）？局部看是：$\nosym{A}=\dd\big(\frac{\nosym{\Phi}}{2\pi}\theta\big)$。可是 $\theta$ 绕一圈要增加 $2\pi$，不是螺线管外空间上的单值函数；而 $\oint \nosym{A}=\nosym{\Phi}\neq0$，按 Stokes 定理，任何恰当形式绕闭路的积分都必须为零。于是 $\nosym{A}$ 闭而不恰当。电子绕螺线管一圈，波函数获得相位 $e\nosym{\Phi}/\hbar$——Aharonov–Bohm 效应在实验上看到的，正是这个"闭而不恰当"。

本章把这件事变成一套精确的不变量。第 3 章用链与边界算子 $\partial$ 数洞，得到同调群 $H_r=\ker\partial/\operatorname{im}\partial$；这里换用微分形式与外微分 $\dd$，得到 **de Rham 上同调群** $H^r(M)=\{\text{闭形式}\}/\{\text{恰当形式}\}$。连接两者的桥是 **Stokes 定理** $\int_c\dd\omega=\int_{\partial c}\omega$：$\dd$ 与 $\partial$ 互为伴随，积分把二者配成一对——这就是 **de Rham 定理**：$H^r(M)$ 恰好是 $H_r(M)$ 的对偶。**Poincaré 引理**告诉我们：闭形式局部总是恰当的，所以上同调只记录**整体**拓扑。最后，上同调比同调多出漂亮的结构：Poincaré 对偶、外积给出的环结构、乘积空间的 Künneth 公式，以及同伦不变性。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "6.1.1", title: "积分的准备：标准单形、奇异链", gist: R`在标准单形 $\bar\sigma_r$ 上积 $r$ 形式就是普通的 $r$ 重积分；把 $\bar\sigma_r$ 光滑地映入 $M$ 得到奇异单形 $s_r$，$\int_{s_r}\omega=\int_{\bar\sigma_r}f^*\omega$，再线性延拓到实系数链。`, gives: ["6.1", "6.2", "6.5", "6.6", "6.7"], next: R`有了"在链上积形式"，就可以陈述 Stokes 定理。` },
  { sec: "6.1.2", title: "Stokes 定理", gist: R`$\int_c\dd\omega=\int_{\partial c}\omega$。拉回到标准单形后，只需对 $x^r$ 用微积分基本定理；$\partial\bar\sigma_r$ 中只有两个面有贡献。Gauss 定理与经典 Stokes 定理都是特例。`, gives: ["6.8", "6.9b", "6.10"], next: R`$\dd$ 与 $\partial$ 互为伴随——于是可以仿照同调来造"上同调"。` },
  { sec: "6.2.1", title: "de Rham 上同调群", gist: R`$H^r(M)=Z^r(M)/B^r(M)$：闭形式模恰当形式。$H^0$ 数连通分支；$H^1(\mathbb{R})=0$；$H^1(S^1)\cong\mathbb{R}$（周期映射 $\lambda$）。`, gives: ["6.11", "6.12", "6.14", "6.16", "6.17"], next: R`$H^1(S^1)$ 由"绕一圈的积分"决定——这是普遍现象吗？` },
  { sec: "6.2.2", title: "对偶与 de Rham 定理", gist: R`$(c,\omega)=\int_c\omega$ 满足 $(c,\dd\omega)=(\partial c,\omega)$，诱导 $\Lambda:H_r\times H^r\to\mathbb{R}$；de Rham 定理：它非退化。于是 $b^r=b_r$，$\chi(M)=\sum(-1)^rb^r$；周期完全刻画上同调类。`, gives: ["6.20", "6.21", "6.24", "6.25", "6.26", "6.27"], next: R`为什么上同调只看整体？因为局部一切闭形式都恰当。` },
  { sec: "6.3", title: "Poincaré 引理", gist: R`同伦算子 $P$ 满足 $\dd P+P\dd=f_1^*-f_0^*$；在可缩区域上 $\omega=\dd(-PF^*\omega)$。于是 $H^r(\mathbb{R}^n)=0$（$r\ge1$）。`, gives: ["6.29", "6.31", "6.32", "6.34"], next: R`上同调有哪些同调没有的结构？` },
  { sec: "6.4.1–6.4.3", title: "Poincaré 对偶、上同调环、Künneth 公式", gist: R`$\int_M\omega\wedge\eta$ 给出 $H^r\cong H^{m-r}$，$b_r=b_{m-r}$，奇数维 $\chi=0$；$[\omega]\wedge[\eta]=[\omega\wedge\eta]$ 使 $H^*(M)$ 成为环；$H^*(M_1\times M_2)=H^*(M_1)\otimes H^*(M_2)$，$H^r(T^n)$ 由 $\dd\theta^{i_1}\wedge\cdots\wedge\dd\theta^{i_r}$ 生成。`, gives: ["6.35", "6.36", "6.37", "6.39", "6.44", "6.45", "6.51"], next: R`映射怎样作用在上同调上？` },
  { sec: "6.4.4–6.4.5", title: R`拉回、同伦不变性与 $H^1$`, gist: R`$f^*[\omega]=[f^*\omega]$ 保持环结构；同伦的映射诱导相同的拉回（引理 6.1、定理 6.4）；单连通 ⇒ $H^1=0$；$H^*(S^n)$ 只在 $0$ 与 $n$ 维非零，体积形式闭而不恰当。`, gives: ["6.53", "6.54", "6.55", "6.59", "6.61", "6.63", "6.64"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "6.2", to: "6.6", label: "拉回到标准单形" },
  { from: "6.6", to: "6.7", label: "线性延拓" },
  { from: "6.7", to: "6.8", label: "" },
  { from: "6.9b", to: "6.8", label: R`标准单形上算清 + \eqref{5.75}` },
  { from: "6.8", to: "6.10", label: R`$\mathbb{R}^3$ 中翻译` },
  { from: "6.8", to: "6.20", label: "内积记号" },
  { from: "6.11", to: "6.16", label: R`周期映射 $\lambda$` },
  { from: "6.20", to: "6.21", label: "代表元无关" },
  { from: "6.11", to: "6.21", label: "" },
  { from: "6.21", to: "6.24", label: "de Rham 定理：对偶基" },
  { from: "6.21", to: "6.25", label: "非退化 ⇒ 维数相等" },
  { from: "6.25", to: "6.26", label: "Euler–Poincaré" },
  { from: "6.29", to: "6.31", label: R`逐项相消` },
  { from: "6.31", to: "6.32", label: R`$\eta=F^*\omega$，$\dd\omega=0$` },
  { from: "6.32", to: "6.34", label: R`$\mathbb{R}^n$ 可缩` },
  { from: "6.31", to: "6.55", label: R`$f=F\circ f_0$，$g=F\circ f_1$` },
  { from: "6.55", to: "6.59", label: R`闭路 $\simeq$ 常值 + Stokes` },
  { from: "6.35", to: "6.36", label: "非退化" },
  { from: "6.36", to: "6.37", label: "取维数" },
  { from: "6.37", to: "6.38", label: R`$m$ 为奇数` },
  { from: "6.39", to: "6.40", label: "直和成环" },
  { from: "6.44", to: "6.45", label: "取维数" },
  { from: "6.45", to: "6.51", label: R`$T^n=(S^1)^n$` },
  { from: "6.51", to: "6.52", label: R`二项式定理` },
  { from: "6.36", to: "6.61", label: R`$S^n$` },
];
export const EQMAP_LABELS = {
  "6.2": "标准单形上的积分", "6.6": "奇异单形上的积分", "6.7": "链上的积分", "6.8": "Stokes 定理", "6.9b": "标准单形版", "6.10": "经典 Stokes/Gauss",
  "6.11": "de Rham 上同调", "6.16": R`$H^1(S^1)\cong\mathbb{R}$`, "6.20": R`$\dd$ 是 $\partial$ 的伴随`, "6.21": "配对 Λ", "6.24": "对偶基", "6.25": R`$b^r=b_r$`, "6.26": R`$\chi$ 的解析表达`,
  "6.29": R`同伦算子 $P$`, "6.31": "同伦公式", "6.32": "Poincaré 引理", "6.34": R`$H^r(\mathbb{R}^n)=0$`, "6.55": "引理 6.1", "6.59": R`闭路积分为零`,
  "6.35": "对偶配对", "6.36": "Poincaré 对偶", "6.37": R`$b_r=b_{m-r}$`, "6.38": R`奇数维 $\chi=0$`, "6.39": "上积", "6.40": "上同调环",
  "6.44": "Künneth 公式", "6.45": "Betti 数版", "6.51": R`$b^r(T^n)$`, "6.52": R`$\chi(T^n)=0$`, "6.61": R`$H^*(S^n)$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "int", label: "积分与 Stokes" },
  { id: "coh", label: "上同调" },
  { id: "dual", label: "对偶与不变量" },
  { id: "str", label: "代数结构" },
];

export const concepts = [
  {
    id: "singular_chain", name_zh: "奇异单形与链上的积分", name_en: "Singular chains & integration", icon: "📐", section_id: "6.1.1", group: "int",
    plain: R`把标准单形光滑地"贴"进流形，就能在上面积分：$\int_{s_r}\omega=\int_{\bar\sigma_r}f^*\omega$。`,
    explain: R`流形上没有"直线"和"几何独立"，无法像第 3 章那样剖分；于是允许任意光滑映射 $f:\bar\sigma_r\to M$（甚至把整个单形压成一点）。像 $s_r=f(\bar\sigma_r)$ 叫奇异单形，实系数形式和叫链。积分通过拉回定义，链上的积分线性延拓。

边界 $\partial s_r=f(\partial\bar\sigma_r)$ 沿用第 3 章的交错和，所以仍有 $\partial^2=0$，可以定义奇异同调 $H_r(M)$。`,
    analogy: R`像用一张张有弹性的三角形贴纸去覆盖曲面：贴纸可以拉伸、折叠，只要贴得光滑就能在上面"计量"。`,
    book_example: { what: R`例：$\int_{\bar\sigma_2}\dd x\wedge\dd y=\int_0^1\dd x\int_0^{1-x}\dd y=\frac12$。`, point: R`标准 2 单形的面积是 $\frac12$。` },
    misconception: R`奇异单形不要求 $f$ 是嵌入；奇异链群是无穷维的，但它的同调在温和条件下与单纯同调（实系数）一致。`,
  },
  {
    id: "stokes", name_zh: "Stokes 定理", name_en: "Stokes' theorem", icon: "🔁", section_id: "6.1.2", group: "int",
    plain: R`$\int_c\dd\omega=\int_{\partial c}\omega$：内部的"导数"之和等于边界上的值。`,
    explain: R`微积分基本定理 $\int_a^bF'\,\dd x=F(b)-F(a)$ 的高维版本。Green 公式、Gauss 散度定理、经典 Stokes 公式都是它在 $\mathbb{R}^2$、$\mathbb{R}^3$ 中的特例。

证明的要点：拉回到标准单形（外微分与拉回交换），再只对一个坐标用基本定理——$\partial\bar\sigma_r$ 的 $r+1$ 个面里只有两个有贡献。`,
    analogy: R`一块区域里所有小格子的"环流"加起来，内部的边两两抵消，只剩下最外面一圈。`,
    book_example: { what: R`习题 6.1：$\int_S\operatorname{curl}\boldsymbol\omega\cdot\dd\mathbf{S}=\oint_C\boldsymbol\omega\cdot\dd\boldsymbol{l}$ 与 Gauss 定理。`, point: "向量分析的三大积分定理是一个定理。" },
    misconception: R`前提是 $\omega$ 在整个链上光滑。$\dd\theta$ 在含原点的圆盘上不满足前提，所以 $\oint\dd\theta=2\pi$ 并不与 $\dd(\dd\theta)=0$ 矛盾。`,
  },
  {
    id: "closed_exact", name_zh: "闭形式与恰当形式", name_en: "Closed & exact forms", icon: "🔒", section_id: "6.2.1", group: "coh",
    plain: R`闭：$\dd\omega=0$。恰当：$\omega=\dd\psi$。恰当必闭，反之不然。`,
    explain: R`恰当 ⇒ 闭就是 $\dd^2=0$。闭不一定恰当：$\mathbb{R}^2-\{0\}$ 上的 $\dd\theta$ 闭，但绕原点积分为 $2\pi\neq0$，而恰当形式绕任何闭路积分为零（Stokes）。

物理里：无旋场 $\nabla\times\boldsymbol{E}=0$ 是否有势、磁场 $\nabla\cdot\boldsymbol{B}=0$ 是否有矢势，都是"闭是否恰当"的问题；答案取决于空间的拓扑。`,
    analogy: R`"无旋"是一个局部检查（每一小块都不打转），"有势"是一个全局承诺（存在一张处处一致的高度地图）。螺旋楼梯每一小段都像普通楼梯，却画不出全局的高度图。`,
    book_example: { what: R`习题 6.3：$\omega=\frac{-y\,\dd x+x\,\dd y}{x^2+y^2}$，"$\omega=\dd\tan^{-1}(y/x)$" 只在局部成立。`, point: "局部原函数存在，整体原函数不存在。" },
    misconception: R`"$\omega=\dd F$ 看起来成立"不够：$F$ 必须是整个 $M$ 上的光滑单值函数。`,
  },
  {
    id: "derham", name_zh: "de Rham 上同调群", name_en: "de Rham cohomology", icon: "🧮", section_id: "6.2.1", group: "coh",
    plain: R`$H^r(M)=\{\text{闭 }r\text{ 形式}\}/\{\text{恰当 }r\text{ 形式}\}$。`,
    explain: R`与 $H_r=\ker\partial/\operatorname{im}\partial$ 一模一样的构造，只是把链复形换成 de Rham 复形 $\Omega^0\xrightarrow{\dd}\Omega^1\xrightarrow{\dd}\cdots$。元素是上同调类 $[\omega]$，$[\omega]=[\omega']$ 当且仅当二者相差恰当形式。

例：$H^0$ 数连通分支；$H^1(\mathbb{R})=0$；$H^1(S^1)\cong\mathbb{R}$；$H^r(\mathbb{R}^n)=0$（$r\ge1$）；$H^*(S^n)$ 只在 $0$、$n$ 维非零。`,
    analogy: R`像"规范等价类"：$A$ 与 $A+\dd\chi$ 描述同一个物理；上同调类就是规范变换下不变、而且场强为零时仍可能残留的那部分信息。`,
    book_example: { what: R`例 6.3：$\lambda(\omega)=\int_0^{2\pi}\omega$，$B^1(S^1)=\ker\lambda$，$H^1(S^1)=\operatorname{im}\lambda=\mathbb{R}$。`, point: "上同调类由周期决定。" },
    misconception: R`上同调群是实向量空间：第 3 章的挠（如 $\mathbb{R}P^2$ 的 $\mathbb{Z}_2$）在这里看不见。`,
  },
  {
    id: "period", name_zh: "周期与 de Rham 定理", name_en: "Periods & de Rham's theorem", icon: "🔗", section_id: "6.2.2", group: "dual",
    plain: R`把闭形式在闭链上积分（周期），得到 $H_r\times H^r\to\mathbb{R}$ 的非退化配对。`,
    explain: R`Stokes 定理 $(c,\dd\omega)=(\partial c,\omega)$ 保证配对 $\Lambda([c],[\omega])=\int_c\omega$ 与代表元无关。de Rham 定理说它非退化：一个闭形式恰当，当且仅当它在所有闭链上的周期都为零；而且周期可以任意指定。

于是 $H^r(M)\cong H_r(M)^*$，$\dim H^r=b_r$，Euler 示性数可以由解偏微分方程 $\dd\omega=0$ 算出。`,
    analogy: R`闭链是"量具"，闭形式是"被量的东西"。de Rham 定理说：用一套基本量具（同调基）量出的读数，恰好是被量物（上同调类）的完整坐标。`,
    book_example: { what: R`推论 6.1：$\int_{c_i}\omega_j=\delta_{ij}$ 的对偶基；$\omega=\sum b_i\omega_i$ 的周期为 $b_i$。`, point: "周期 = 上同调类的坐标。" },
    misconception: R`周期为零只对**一条**闭链成立不够；必须对一组同调基的每一条都为零。`,
  },
  {
    id: "betti_analytic", name_zh: "Betti 数的解析刻画", name_en: "Betti numbers via forms", icon: "📊", section_id: "6.2.2", group: "dual",
    plain: R`$b^r=\dim H^r(M)=\dim H_r(M)=b_r$；$\chi(M)=\sum_{r=0}^m(-1)^rb^r$。`,
    explain: R`左边是拓扑（数洞），右边是分析（闭形式方程的解空间模去恰当形式）。这种"拓扑 = 分析"的等式是全书后半部分的主线：Hodge 理论（第 7 章）、Gauss–Bonnet 与示性类（第 11 章）、Atiyah–Singer 指标定理（第 12 章）。`,
    analogy: R`像鼓的"能听出形状"问题的最简单版本：从微分方程的解的个数读出空间有几个洞。`,
    book_example: { what: R`$T^n$：$b^r=\binom nr$，$\chi=(1-1)^n=0$；$S^n$：$\chi=1+(-1)^n$。`, point: R`Betti 数可以用显式的形式 $\dd\theta^{i_1}\wedge\cdots$ 生成。` },
    misconception: R`原书 (6.26) 的求和从 $r=1$ 开始是笔误：$b^0$ 必须计入（否则 $\chi(S^2)$ 会算成 $1$）。`,
  },
  {
    id: "poincare_lemma", name_zh: "Poincaré 引理与同伦算子", name_en: "Poincaré lemma & homotopy operator", icon: "🎯", section_id: "6.3", group: "coh",
    plain: R`在可缩区域上闭形式都恰当：$\omega=\dd(-PF^*\omega)$。`,
    explain: R`构造性的证明：把区域沿收缩 $F$ 拉到一点，同伦算子 $P$ 把 $\dd t$ 方向积掉，满足 $\dd P+P\dd=f_1^*-f_0^*$。对星形区域和直线收缩，$-PF^*\omega$ 就是"沿径向线段积分"，对 1 形式就是熟悉的势函数公式 $\varphi(x)=\int_{p_0}^x\omega$。

结论：闭形式局部总是恰当的；上同调是"局部可解、整体不可解"的障碍。`,
    analogy: R`像把一张网收拢成一个点：收拢的过程中，网上每条线扫过的"轨迹面"记录了原函数。`,
    book_example: { what: R`例 6.4：$H^r(\mathbb{R}^n)=0$（$1\le r\le n$），但 $H^0(\mathbb{R}^n)=\mathbb{R}$。`, point: "可缩空间的上同调与一点相同。" },
    misconception: R`对 $r=0$ 不成立：常数函数闭，但不是任何东西的 $\dd$。`,
  },
  {
    id: "homotopy_inv", name_zh: "拉回与同伦不变性", name_en: "Pullback & homotopy invariance", icon: "🧲", section_id: "6.4.5", group: "dual",
    plain: R`同伦的映射在上同调上诱导同一个拉回；单连通 ⇒ $H^1=0$。`,
    explain: R`$f^*$ 把闭形式送到闭形式、恰当送到恰当，所以 $f^*[\omega]=[f^*\omega]$ 良定义，且保持外积。引理 6.1 用同伦公式证明 $f^*\omega-g^*\omega$ 恰当。

推论：同伦等价的空间上同调同构（$\mathbb{R}^2-\{0\}\simeq S^1$）；闭形式沿零伦闭路的积分为零，于是单连通流形上 $\int_{p_0}^p\omega$ 与路径无关。`,
    analogy: R`连续地扭动一个映射，就像连续地改变观察角度：看到的细节变了，"洞的个数"这种整体读数不变。`,
    book_example: { what: R`例 6.6：$S^n$（$n\ge2$）单连通，$H^1(S^n)=0$。`, point: "同伦论的信息直接转化成上同调信息。" },
    misconception: R`$H^1=0$ 不推出单连通：$\mathbb{R}P^2$ 有 $H^1=0$，但 $\pi_1=\mathbb{Z}_2$。`,
  },
  {
    id: "poincare_duality", name_zh: "Poincaré 对偶", name_en: "Poincaré duality", icon: "🪞", section_id: "6.4.1", group: "str",
    plain: R`紧致可定向 $m$ 维流形上 $H^r\cong H^{m-r}$，$b_r=b_{m-r}$。`,
    explain: R`配对 $\langle\omega,\eta\rangle=\int_M\omega\wedge\eta$ 在上同调上良定义（Stokes + $\partial M=\emptyset$）且非退化。推论：奇数维紧致可定向流形 $\chi=0$。

需要可定向：$\mathbb{R}P^2$ 有 $b_0=1$、$b_2=0$，对偶失效（交互图 4 可以看到）。`,
    analogy: R`像一本书的目录：第 $r$ 章与第 $m-r$ 章一一配对，配对的方式是把两章"拼"成整本书再读一遍（对 $M$ 积分）。`,
    book_example: { what: R`$H^0(T^2)=H^2(T^2)=\mathbb{R}$；$H^0(S^n)\cong H^n(S^n)=\mathbb{R}$。`, point: "最高阶上同调由体积形式生成。" },
    misconception: R`原书陈述没写"可定向"，但积分 $\int_M\omega\wedge\eta$ 本身就要求定向。`,
  },
  {
    id: "cohomology_ring", name_zh: "上同调环（上积）", name_en: "Cohomology ring", icon: "💍", section_id: "6.4.2", group: "str",
    plain: R`$[\omega]\wedge[\eta]=[\omega\wedge\eta]$ 使 $H^*(M)=\bigoplus_rH^r(M)$ 成为一个环。`,
    explain: R`闭 ∧ 闭 = 闭，闭 ∧ 恰当 = 恰当（习题 6.2），所以外积下降到上同调。链之间没有自然的乘积，同调群没有这种结构——这是上同调的一大优势。

环结构比 Betti 数看得更多：例如（用奇异上同调）$S^2\vee S^1\vee S^1$ 与 $T^2$ 有相同的 Betti 数，前者上两个一维类的乘积为零，但 $T^2$ 上 $[\dd\theta_1]\wedge[\dd\theta_2]\neq0$。`,
    analogy: R`不只数有几种"洞"，还知道两种洞"相乘"会不会围出更高维的洞。`,
    book_example: { what: R`\eqref{6.39}：$[\omega']\wedge[\eta]=[\omega\wedge\eta+\dd(\psi\wedge\eta)]=[\omega\wedge\eta]$。`, point: "换代表元只多出恰当项。" },
    misconception: R`$H^*$ 应包含 $H^0$（环的单位元 $[1]$ 就在其中）；原书 (6.40) 求和从 $r=1$ 开始是笔误。`,
  },
  {
    id: "kunneth", name_zh: "Künneth 公式", name_en: "Künneth formula", icon: "✖️", section_id: "6.4.3", group: "str",
    plain: R`$H^*(M_1\times M_2)=H^*(M_1)\otimes H^*(M_2)$，$b^r=\sum_{p+q=r}b^pb^q$。`,
    explain: R`乘积空间的上同调由两个因子的上同调类的外积 $\omega^p_i\wedge\eta^{q}_j$ 生成。Betti 数是"卷积"：Poincaré 多项式相乘。推论 $\chi(M_1\times M_2)=\chi(M_1)\chi(M_2)$。

应用：$T^n=(S^1)^n$ 的上同调由 $\dd\theta^{i_1}\wedge\cdots\wedge\dd\theta^{i_r}$ 生成，$b^r=\binom nr$。`,
    analogy: R`像两组独立的开关：系统的状态是"第一组的状态"与"第二组的状态"的张量积，总数相乘。`,
    book_example: { what: R`例 6.5：$H^1(T^2)=(\mathbb{R}\otimes\mathbb{R})\oplus(\mathbb{R}\otimes\mathbb{R})=\mathbb{R}^2$。`, point: R`$\mathbb{R}\otimes\mathbb{R}=\mathbb{R}$（张量积，不是直积）。` },
    misconception: R`整数系数时还有额外的 Tor 项（挠的贡献）；实系数的 de Rham 版本没有这一项。`,
  },
  {
    id: "volume_form", name_zh: "体积形式：闭而不恰当", name_en: "Volume form", icon: "🌐", section_id: "6.4.5", group: "dual",
    plain: R`紧致无边流形上体积形式的积分非零，所以它不是恰当形式，生成 $H^m(M)$。`,
    explain: R`$m$ 形式在 $m$ 维流形上自动是闭的。若 $\Omega=\dd\psi$，则 $\int_M\Omega=\int_{\partial M}\psi=0$，与 $\int_M\Omega>0$ 矛盾。

$S^2$ 上 $\Omega=\sin\theta\,\dd\theta\wedge\dd\phi$ 形式上等于 $-\dd(\cos\theta\,\dd\phi)$，但 $\dd\phi$ 在两极无定义——这正是 Dirac 磁单极的矢势必须有"弦"（或必须用两块坐标卡）的原因。`,
    analogy: R`给一个封闭气球打气：总通量 $4\pi$ 不可能来自一个"处处定义"的矢势——就像不能给整个地球表面梳平头发。`,
    book_example: { what: R`例 6.7：$\int_{S^2}\Omega=4\pi\neq0$。`, point: R`$H^2(S^2)\cong\mathbb{R}$ 由 $[\Omega]$ 生成。` },
    misconception: R`"能写成 $\dd$（某物）"必须是整体光滑的某物；带奇点或多值的势不算。`,
  },
];

export const relations = [
  { from: "singular_chain", to: "stokes", label: "积分区域" },
  { from: "stokes", to: "closed_exact", label: R`恰当 ⇒ 周期为零` },
  { from: "closed_exact", to: "derham", label: "闭 / 恰当" },
  { from: "stokes", to: "period", label: R`$\dd$ 是 $\partial$ 的伴随` },
  { from: "derham", to: "period", label: "配对" },
  { from: "period", to: "betti_analytic", label: R`$b^r=b_r$` },
  { from: "poincare_lemma", to: "derham", label: "局部平凡" },
  { from: "poincare_lemma", to: "homotopy_inv", label: "同一个同伦公式" },
  { from: "derham", to: "cohomology_ring", label: "外积" },
  { from: "derham", to: "poincare_duality", label: R`$\int_M\omega\wedge\eta$` },
  { from: "cohomology_ring", to: "kunneth", label: "乘积空间" },
  { from: "poincare_duality", to: "betti_analytic", label: R`$b_r=b_{m-r}$` },
  { from: "stokes", to: "volume_form", label: R`$\int_M\dd\psi=0$` },
  { from: "volume_form", to: "poincare_duality", label: R`生成 $H^m$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**Stokes 定理** $\int_c\dd\omega=\int_{\partial c}\omega$ 统一了 Green、Gauss、经典 Stokes；它说外微分 $\dd$ 是边界算子 $\partial$ 的伴随：$(c,\dd\omega)=(\partial c,\omega)$。`}</TxI>,
  <TxI>{R`**de Rham 上同调** $H^r(M)=Z^r/B^r$ = 闭形式模恰当形式。$H^0$ 数分支，$H^1(S^1)\cong\mathbb{R}$，$H^1(\mathbb{R}^2-\{0\})\cong\mathbb{R}$ 由 $[\dd\theta]$ 生成。`}</TxI>,
  <TxI>{R`**de Rham 定理**：$\Lambda([c],[\omega])=\int_c\omega$ 非退化，$H^r\cong(H_r)^*$，$b^r=b_r$；闭形式恰当 ⇔ 所有周期为零。`}</TxI>,
  <TxI>{R`**Poincaré 引理**：可缩区域上闭 ⇒ 恰当，$\omega=\dd(-PF^*\omega)$；同一个同伦公式 $\dd P+P\dd=f_1^*-f_0^*$ 还给出同伦不变性与"单连通 ⇒ $H^1=0$"。`}</TxI>,
  <TxI>{R`**结构**：Poincaré 对偶 $H^r\cong H^{m-r}$（紧致可定向）；上同调环 $[\omega]\wedge[\eta]$；Künneth $H^*(M_1\times M_2)=H^*(M_1)\otimes H^*(M_2)$；$H^*(T^n)$ 是 $\dd\theta^i$ 生成的外代数，$H^*(S^n)=\mathbb{R}\oplus\mathbb{R}$（$0$ 维与 $n$ 维）。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`$\mathbb{R}^2-\{0\}$ 上 $\omega=\dd\theta$ 闭但不恰当。下面哪个理由**最直接**？`,
    options: [R`$\theta=\tan^{-1}(y/x)$ 在 $x=0$ 处没有定义`, R`$\oint_{S^1}\omega=2\pi\neq0$，而恰当形式沿任何闭链的积分都为零`, R`$\omega$ 的系数在原点发散`, R`$\mathbb{R}^2-\{0\}$ 不是紧致的`],
    answer: 1, why: R`若 $\omega=\dd F$，Stokes 给出 $\oint\dd F=\int_{\partial S^1}F=0$。选项 A 不够：换一个分支（如用 $\cot^{-1}$）可以避开 $x=0$，问题出在**任何**单值分支都不存在。`,
  },
  {
    q: R`在 $\mathbb{R}^3$ 中，经典的 Gauss 散度定理对应 Stokes 定理 $\int_c\dd\omega=\int_{\partial c}\omega$ 中的哪种情形？`,
    options: [R`$\omega$ 为 0 形式，$c$ 为曲线`, R`$\omega$ 为 1 形式，$c$ 为曲面`, R`$\omega$ 为 2 形式，$c$ 为三维区域`, R`$\omega$ 为 3 形式，$c$ 为三维区域`],
    answer: 2, why: R`$\psi=\frac12\psi_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$ 对应向量场 $\boldsymbol\psi$，$\dd\psi=(\nabla\cdot\boldsymbol\psi)\,\dd V$（习题 6.1）。1 形式对应经典 Stokes，0 形式对应梯度定理。`,
  },
  {
    q: R`紧致流形 $M$ 上的闭 1 形式 $\psi$ 在**某一条**不可缩闭路上的积分为零。能否断定 $\psi$ 恰当？`,
    options: [R`能，de Rham 定理保证`, R`不能，必须在 $H_1(M)$ 的一组基的**每一条**闭链上积分都为零（推论 6.1）`, R`能，因为 Poincaré 引理`, R`不能，因为 $\psi$ 可能不闭`],
    answer: 1, why: R`例如环面上的 $\dd\theta_2$：沿 $\theta_1$ 方向的闭路积分为零，但沿 $\theta_2$ 方向为 $2\pi$，所以不恰当。`,
  },
  {
    q: R`Poincaré 引理的证明中，同伦公式 $\dd(P\eta)+P(\dd\eta)=f_1^*\eta-f_0^*\eta$ 被用于 $\eta=F^*\omega$。哪一项因为 $\omega$ 闭而消失？`,
    options: [R`$\dd(PF^*\omega)$`, R`$P\,\dd(F^*\omega)$`, R`$f_1^*F^*\omega$`, R`$f_0^*F^*\omega$`],
    answer: 1, why: R`$\dd F^*\omega=F^*\dd\omega=0$（\eqref{5.75}）。$f_1^*F^*\omega=(F\circ f_1)^*\omega$ 消失是因为 $F\circ f_1$ 是常值映射（且 $r\ge1$），与闭性无关。交互图 3 中选"不闭"的形式就能看到 $P\,\dd\eta$ 项的贡献。`,
  },
  {
    q: R`由 Künneth 公式，$S^2\times S^1$ 的 Betti 数是？`,
    options: [R`$(1,1,1,1)$`, R`$(1,0,1,0)$`, R`$(1,2,2,1)$`, R`$(1,1,0,1)$`],
    answer: 0, why: R`$(1+t^2)(1+t)=1+t+t^2+t^3$。$\chi=0=\chi(S^2)\chi(S^1)=2\times0$；Poincaré 对偶 $b_r=b_{3-r}$ 也成立。`,
  },
  {
    q: R`下列哪个说法是**错误**的？`,
    options: [R`$H^1(S^n)=0$ 对 $n\ge2$`, R`任何紧致可定向奇数维流形的 Euler 示性数为零`, R`$H^r(M)$ 能区分 $\mathbb{R}P^2$ 与一个点`, R`同伦的映射诱导相同的上同调拉回`],
    answer: 2, why: R`$H^*(\mathbb{R}P^2;\mathbb{R})=(\mathbb{R},0,0)$，与一点相同；$\mathbb{R}P^2$ 的拓扑信息（挠 $\mathbb{Z}_2$、不可定向）只在整数同调或 $\pi_1$ 里看得见。`,
  },
];

export const BRIDGE = R`本章把"洞"翻译成了微分方程：$b_r$ 等于闭形式模恰当形式的维数。但每个上同调类里有无穷多个代表元，选哪一个？第 7 章给流形配上**度规**之后，就可以定义 Hodge 星算子 $*$ 与余微分 $\dd^\dagger$，在每个类里挑出唯一的**调和形式**（$\Delta\omega=0$）——**Hodge 定理**说 $H^r(M)\cong\operatorname{Harm}^r(M)$，Betti 数从此等于 Laplace 方程零模的个数。再往后，第 9–11 章的示性类是纤维丛曲率构成的闭形式的上同调类，它们的周期（陈数、Pontrjagin 数）就是规范场论里的拓扑荷；第 12 章的指标定理把本章的 $\chi(M)=\sum(-1)^rb^r$ 推广成了"解析指标 = 拓扑指标"。`;
