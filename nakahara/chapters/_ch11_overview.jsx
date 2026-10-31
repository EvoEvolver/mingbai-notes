// 第 11 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "曲率是局部的，积分却是整数";
export const HOOK = R`**一个奇怪的事实。**在地球表面上随便画一块区域，Gauss 曲率 $K$ 可以是任意实数；把一个气球捏出鼓包、压出凹坑，曲率分布千变万化。可是把 $\frac1{2\pi}K\,\dd A$ 在整个球面上积起来，答案永远是 $2$——一个整数，而且只跟"它是一个球"有关。换成甜甜圈，答案永远是 $0$。

**同样的事在规范场里发生。**单极子周围的磁场 $F$ 可以被任何光滑的扰动搅乱，但穿过包围它的球面的总通量除以 $2\pi$ 只能是整数 $2g$；四维 Yang–Mills 场的 $\frac12\int\Tr(\mathrm{i}\mathcal{F}/2\pi)^2$ 也只能是整数——瞬子数。

**本章回答：为什么？**答案分两步。第一，把曲率代入一个"在规范变换下不变"的多项式 $P$，得到的 $P(\mathcal{F})$ 是闭形式，并且换一个联络它只改变一个恰当形式（Chern–Weil 定理）——所以它在闭流形上的积分与联络无关，只依赖于丛本身。第二，这些上同调类——**示性类**——记录的恰恰是丛的局部片段怎样"拧着"粘在一起：它们是丛不能被拆成平凡乘积的障碍。

按选择的多项式不同，就得到陈类 $\det(I+\mathrm{i}\mathcal{F}/2\pi)$、陈特征 $\Tr\exp(\mathrm{i}\mathcal{F}/2\pi)$、Pontrjagin 类、Euler 类、Todd 类、$\hat A$ 亏格……它们是下一章 Atiyah–Singer 指标定理右边的全部原料。最后，有一类示性类根本不需要曲率：Stiefel–Whitney 类用 $\pm1$ 的符号记录"能不能定向""能不能定义费米子"。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "11.1", title: "不变多项式与 Chern–Weil 同态", gist: R`$\mathrm{Ad}$ 不变的对称多线性型 $\tilde P$ 与其对角化 $P(A)$；推广到 $\mathfrak{g}$ 值形式；Chern–Weil 定理：$\dd P(\mathcal{F})=0$，$P(\mathcal{F}')-P(\mathcal{F})=\dd\,TP$（超渡形式）；Weil 同态与自然性；平凡丛的示性类平凡。`, gives: ["11.3", "11.6", "11.14", "11.20", "11.21", "11.22", "11.24"], next: R`选最自然的不变多项式——行列式。` },
  { sec: "11.2", title: "陈类", gist: R`$c(\mathcal{F})=\det(I+\mathrm{i}\mathcal{F}/2\pi)$；用陈根 $x_j$ 写成初等对称函数；$\mathrm{SU}(2)$ 例子 $c_2=\det(\mathrm{i}\mathcal{F}/2\pi)$；自然性与 Whitney 和公式；分裂原理；Grassmann 流形、万有丛与公理化定义。`, gives: ["11.25", "11.29", "11.31", "11.33", "11.39", "11.41", "11.46c"], next: R`换成"指数的迹"，得到对 $\oplus$ 可加、对 $\otimes$ 可乘的类。` },
  { sec: "11.3", title: "陈特征与 Todd 类", gist: R`$\mathrm{ch}(\mathcal{F})=\Tr\exp(\mathrm{i}\mathcal{F}/2\pi)$，$\mathrm{ch}_2=\frac12(c_1^2-2c_2)$；单极子与瞬子的拓扑荷都是 $\mathrm{ch}_j$ 的积分；$\CP^1$ 上典范线丛的 $\mathrm{Ch}_1=-1$；环同态性质；Todd 类 $\prod x_j/(1-\mathrm{e}^{-x_j})$。`, gives: ["11.47", "11.51c", "11.53", "11.55", "11.60", "11.62a", "11.66"], next: R`实向量丛的曲率是反对称矩阵，需要另一套类。` },
  { sec: "11.4", title: "Pontrjagin 类与 Euler 类", gist: R`$p(\mathcal{F})=\det(I+\mathcal{F}/2\pi)$，只含偶次幂；用迹表达 \eqref{11.75a}–\eqref{11.75d}；$p_j=(-1)^jc_{2j}(E^{\C})$；Euler 类 $e=\mathrm{Pf}(\mathcal{R}/2\pi)$，$e\wedge e=p_l$；Gauss–Bonnet $\int e=\chi$；Hirzebruch $L$ 多项式与 $\hat A$ 亏格；符号差定理。`, gives: ["11.70", "11.75a", "11.77", "11.83", "11.84", "11.88", "11.92", "11.96", "11.99"], next: R`示性类局部是恰当形式——它的"原函数"本身也有用。` },
  { sec: "11.5", title: "陈–Simons 形式", gist: R`局部 $P_j(\mathcal{F})=\dd Q_{2j-1}$，$Q$ 由超渡给出；$Q_3=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$；Cartan 同伦公式；规范变换下 $Q$ 改变一个闭形式加一个恰当形式；三维 Maxwell–Chern–Simons 理论给光子质量。`, gives: ["11.100", "11.105", "11.106b", "11.112", "11.118", "11.120", "11.128"], next: R`最后一类示性类不需要曲率。` },
  { sec: "11.6", title: "Stiefel–Whitney 类", gist: R`自旋结构：把 $\mathrm{SO}(m)$ 转移函数提升到 $\mathrm{SPIN}(m)$；$\Z_2$ 系数的 Čech 上同调；$w_1=[\det t_{ij}]$ 是可定向的障碍；$w_2=[\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}]$ 是自旋结构的障碍；$\CP^m$、$S^m$、$\Sigma_g$ 的例子。`, gives: ["11.129", "11.130", "11.134", "11.135", "11.139", "11.140"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "11.3", to: "11.10", label: "对 $t$ 求导" },
  { from: "11.10", to: "11.14", label: "加 0 + Bianchi" },
  { from: "11.15", to: "11.20", label: "沿直线插值" },
  { from: "11.14", to: "11.22", label: "闭" },
  { from: "11.20", to: "11.22", label: "Stokes" },
  { from: "11.20", to: "11.21", label: "定义超渡" },
  { from: "11.22", to: "11.25", label: R`取 $P=\det$` },
  { from: "11.25", to: "11.29", label: "对角化" },
  { from: "11.29", to: "11.31", label: "用迹表达" },
  { from: "11.25", to: "11.33", label: "分块对角" },
  { from: "11.33", to: "11.39", label: "线丛之和" },
  { from: "11.22", to: "11.47", label: R`取 $P=\Tr\exp$` },
  { from: "11.39", to: "11.51c", label: "Newton 恒等式" },
  { from: "11.47", to: "11.53", label: "单极子" },
  { from: "11.47", to: "11.62a", label: "张量积" },
  { from: "11.39", to: "11.66", label: R`$\prod\frac{x}{1-\mathrm{e}^{-x}}$` },
  { from: "11.22", to: "11.70", label: "实丛" },
  { from: "11.70", to: "11.75a", label: "块对角化" },
  { from: "11.70", to: "11.77", label: "复化" },
  { from: "11.75a", to: "11.80", label: "开平方" },
  { from: "11.84", to: "11.88", label: "Pfaffian" },
  { from: "11.80", to: "11.88", label: "" },
  { from: "11.88", to: "11.83", label: "Gauss–Bonnet" },
  { from: "11.75a", to: "11.92", label: R`$\prod\frac{x}{\tanh x}$` },
  { from: "11.92", to: "11.99", label: "符号差定理" },
  { from: "11.21", to: "11.101", label: R`$\mathcal{A}'=0$` },
  { from: "11.101", to: "11.106b", label: R`$j=2$` },
  { from: "11.112", to: "11.118", label: "规范变换" },
  { from: "11.106b", to: "11.122", label: "三维作用量" },
  { from: "11.135", to: "11.139", label: R`提升到 $\mathrm{SPIN}$` },
];
export const EQMAP_LABELS = {
  "11.3": "不变性", "11.10": "无穷小不变性", "11.14": R`$\dd P(\mathcal{F})=0$`, "11.15": "插值联络", "11.20": "差是恰当形式",
  "11.21": "超渡形式", "11.22": "积分与联络无关", "11.25": "全陈类", "11.29": "陈根展开", "11.31": "陈类的迹表达",
  "11.33": "Whitney 和", "11.39": "分裂原理", "11.47": "陈特征", "11.51c": R`$\mathrm{ch}_2$`, "11.53": "单极子陈数",
  "11.62a": "张量积可乘", "11.66": "Todd 类", "11.70": "Pontrjagin 类", "11.75a": "迹表达", "11.77": "与陈类的关系",
  "11.80": R`$e^2=p_l$`, "11.84": R`$\det=\mathrm{Pf}^2$`, "11.88": "Euler 类", "11.83": "Gauss–Bonnet", "11.92": R`$L$ 多项式`, "11.99": "符号差",
  "11.101": "陈–Simons 形式", "11.106b": R`$Q_3$`, "11.112": "Cartan 同伦公式", "11.118": "CS 的规范变化", "11.122": "MCS 拉氏量",
  "11.135": R`$w_1$`, "11.139": R`$w_2$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "cw", label: "Chern–Weil 理论" },
  { id: "complex", label: "复向量丛的类" },
  { id: "real", label: "实向量丛的类" },
  { id: "beyond", label: "超出上同调类" },
];

export const concepts = [
  {
    id: "invariant_polynomial", name_zh: "不变多项式", name_en: "Invariant polynomial", icon: "🧮", section_id: "11.1.1", group: "cw",
    plain: R`在 $A\to g^{-1}Ag$ 下不变的矩阵多项式，如 $\Tr A^r$、$\det A$。`,
    explain: R`曲率 $\mathcal{F}$ 在规范变换下按 $\mathcal{F}\to g^{-1}\mathcal{F}g$ 变换，所以只有"共轭不变"的组合才有整体意义。不变多项式 $P$ 由对称多线性型 $\tilde P$ 的对角化得到；反过来 $\tilde P$ 由极化恢复。

任何不变多项式都能写成 $\Tr A^r$ 的乘积之和；本章的一切示性类都由某个这样的 $P$ 定义。`,
    analogy: "像矩阵的特征值：换一组基，矩阵元全变了，特征值的对称组合（迹、行列式）却不变——它们才是矩阵\"本身\"的属性。",
    book_example: { what: R`§11.1.1：$\Tr(A^3)$ 的极化是 $\frac12\Tr(A_1A_2A_3+A_2A_1A_3)$。`, point: "极化与对角化互逆。" },
    misconception: R`"不变"指在结构群 $G$ 的伴随作用下不变；李代数相同的两个群，不变多项式的集合可以不同（如 $\mathrm{SO}(2l)$ 有 Pfaffian 而 $\mathrm{O}(2l)$ 没有）。`,
  },
  {
    id: "chern_weil", name_zh: "Chern–Weil 定理与超渡", name_en: "Chern–Weil theorem & transgression", icon: "🔒", section_id: "11.1.1", group: "cw",
    plain: R`$P(\mathcal{F})$ 是闭形式，换联络只差一个恰当形式 $\dd\,TP$。`,
    explain: R`(a) 闭：$\dd$ 作用在 $P(\mathcal{F})$ 上可以换成协变的 $\mathcal{D}$（因为 $P$ 不变），而 Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$。(b) 与联络无关：在 $\mathcal{A}$ 与 $\mathcal{A}'$ 之间直线插值，$\frac{\dd}{\dd t}P(\mathcal{F}_t)$ 恰为外微分，积分得 $P(\mathcal{F}')-P(\mathcal{F})=\dd TP(\mathcal{A}',\mathcal{A})$。

推论：闭流形上 $\int P(\mathcal{F})$ 与联络无关——曲率的局部细节全被"积掉"，只剩丛的拓扑。`,
    analogy: "高度计在山里随处读数不同，但绕一圈回到出发点，海拔变化总是 0；Chern–Weil 说示性类的积分就像这样的\"总变化\"，与走哪条路（选哪个联络）无关。",
    book_example: { what: R`交互图 1：给单极子势加任意整体扰动，场强分布变了，$\frac1{2\pi}\int F$ 不变。`, point: R`差 $\dd\alpha$ 积分为零。` },
    misconception: R`超渡形式 $TP(\mathcal{A}',\mathcal{A})$ 是整体定义的，但单个联络的陈–Simons 形式 $TP(\mathcal{A},0)$ 一般只是局部的。`,
  },
  {
    id: "characteristic_class", name_zh: "示性类与自然性", name_en: "Characteristic class & naturality", icon: "🏷️", section_id: "11.1.1", group: "cw",
    plain: R`丛的"拓扑指纹"：一个只依赖于丛、与拉回相容的上同调类。`,
    explain: R`$\chi_E(P)=[P(\mathcal{F})]\in H^*(M)$。Weil 同态 $P\mapsto\chi_E(P)$ 保持乘法；自然性 $\chi_{f^*E}=f^*\chi_E$。平凡丛是点上丛的拉回，所以示性类平凡——示性类非零就是丛不平凡的证据。

拓扑地看，每个复向量丛都是 Grassmann 流形上万有丛的拉回，示性类就是万有丛的上同调类的拉回。`,
    analogy: "人的指纹：同一个人（丛）换手套（联络）指纹不变；两人指纹不同则一定是两个人，但指纹相同未必是同一人。",
    book_example: { what: R`推论 11.1：平凡丛 $E=f^*E_0$，$E_0$ 是点上的丛。`, point: "点的高阶上同调为零。" },
    misconception: R`示性类全为零不能推出丛平凡；示性类是障碍，不是完全不变量。`,
  },
  {
    id: "chern_class", name_zh: "陈类", name_en: "Chern class", icon: "🌀", section_id: "11.2.1", group: "complex",
    plain: R`$c(\mathcal{F})=\det(I+\mathrm{i}\mathcal{F}/2\pi)=1+c_1+c_2+\cdots$，$c_j$ 是 $2j$ 形式。`,
    explain: R`对角化 $\mathrm{i}\mathcal{F}/2\pi\to\mathrm{diag}(x_1,\ldots,x_k)$ 后 $c=\prod(1+x_j)$，$c_j$ 是 $x$ 的第 $j$ 个初等对称函数；$c_1=\frac{\mathrm{i}}{2\pi}\Tr\mathcal{F}$，$c_k=\det(\mathrm{i}\mathcal{F}/2\pi)$。

性质：自然性、Whitney 和 $c(E\oplus F)=c(E)c(F)$、平凡丛 $c=1$。$\mathrm{SU}(2)$ 丛 $c_1=0$，$c_2=\det(\mathrm{i}\mathcal{F}/2\pi)$——它的积分就是（负的）瞬子数。`,
    analogy: R`像多项式 $\prod(1+x_j t)$ 的系数：根（陈根）本身不是不变量，系数（陈类）才是。`,
    book_example: { what: R`例 11.1：$\mathrm{SU}(2)$ 丛 $c=1+\frac14(\frac{\mathrm{i}}{2\pi})^2\mathcal{F}^\alpha\wedge\mathcal{F}^\alpha$。`, point: "无迹 ⇒ $c_1=0$。" },
    misconception: R`$\mathrm{i}$ 的出现是因为生成元取反 Hermite：$\mathrm{i}\mathcal{F}$ 是 Hermite 的，陈类是实形式。`,
  },
  {
    id: "splitting", name_zh: "分裂原理与陈根", name_en: "Splitting principle & Chern roots", icon: "✂️", section_id: "11.2.3", group: "complex",
    plain: R`计算时可以假装丛是线丛之和，$c=\prod(1+x_i)$。`,
    explain: R`由 Whitney 和公式，线丛之和的全陈类是 $\prod(1+x_i)$，$x_i=c_1(L_i)$，这与把曲率对角化的结果完全一样。于是任何"对 $\oplus$ 可乘"的类都由一个单变量函数 $f$ 决定：$\prod_if(x_i)$，再用初等对称函数（陈类）改写。

$\mathrm{ch}=\sum\mathrm{e}^{x_i}$、$\mathrm{Td}=\prod\frac{x_i}{1-\mathrm{e}^{-x_i}}$、$L=\prod\frac{x_i}{\tanh x_i}$、$\hat A=\prod\frac{x_i/2}{\sinh(x_i/2)}$ 都这样定义。`,
    analogy: "做账时把一笔混合款项拆成若干单币种分账：最后的汇总报表（陈类）只取决于各分账的对称组合，拆法本身无所谓。",
    book_example: { what: R`交互图 2：符号地把 $\prod\frac{x}{1-\mathrm{e}^{-x}}$ 展开成 $c_j$ 的多项式，复现 \eqref{11.67e}。`, point: "Newton 恒等式 + 级数运算。" },
    misconception: R`陈根 $x_i$ 一般不是 $M$ 上的上同调类，只有对称组合才是。`,
  },
  {
    id: "chern_character", name_zh: "陈特征", name_en: "Chern character", icon: "🔤", section_id: "11.3", group: "complex",
    plain: R`$\mathrm{ch}(\mathcal{F})=\Tr\exp(\mathrm{i}\mathcal{F}/2\pi)$：对直和相加、对张量积相乘。`,
    explain: R`$\mathrm{ch}=k+c_1+\frac12(c_1^2-2c_2)+\cdots$。因为 $\mathcal{F}_{E\otimes F}=\mathcal{F}_E\otimes I+I\otimes\mathcal{F}_F$，指数化后正好分解为乘积：$\mathrm{ch}$ 是从向量丛的"加法与乘法"到上同调环的同态。

物理中：单极子荷 $=\int_{S^2}\mathrm{ch}_1$，瞬子数 $=\int_{S^4}\mathrm{ch}_2$，$2m$ 维 U(1) 反常 $\propto\mathrm{ch}_m$。Atiyah–Singer 指标定理的右边就是 $\int\mathrm{ch}\cdot\mathrm{Td}$ 或 $\int\mathrm{ch}\cdot\hat A$。`,
    analogy: "对数把乘法变成加法，指数把加法变成乘法；陈特征就是向量丛世界里的\"指数函数\"。",
    book_example: { what: R`例 11.4：$\CP^1$ 上典范线丛 $\mathrm{Ch}_1(L)=-\frac1\pi\int\frac{r\,\dd r\,\dd\theta}{(1+r^2)^2}=-1$。`, point: "曲率积分 = 整数。" },
    misconception: R`$\mathrm{ch}$ 的零阶项是纤维维数 $k$（不是 1），这是它"可加"的代价。`,
  },
  {
    id: "todd", name_zh: "Todd 类", name_en: "Todd class", icon: "📐", section_id: "11.3.3", group: "complex",
    plain: R`$\mathrm{Td}=\prod\frac{x_j}{1-\mathrm{e}^{-x_j}}=1+\frac12c_1+\frac1{12}(c_1^2+c_2)+\cdots$。`,
    explain: R`乘性：$\mathrm{Td}(E\oplus F)=\mathrm{Td}(E)\mathrm{Td}(F)$。系数由 Bernoulli 数给出。它在 Riemann–Roch–Hirzebruch 定理与 Dolbeault 复形的指标定理中出现：全纯截面的个数（减去障碍）$=\int\mathrm{ch}(E)\mathrm{Td}(TM^+)$。`,
    analogy: R`像一个"修正因子"：数格点时，区域面积是主项，边界与角落还要加 $\frac12$、$\frac1{12}$ 这样的修正——Todd 类正是这类修正的几何化。`,
    book_example: { what: R`\eqref{11.67a}–\eqref{11.67f}：$\mathrm{Td}_4=\frac1{720}(-c_1^4+4c_1^2c_2+3c_2^2+c_1c_3-c_4)$。`, point: "交互图 2 逐项复现。" },
    misconception: R`$\mathrm{Td}$ 不是偶函数（有 $\frac12x$ 项），所以它需要复结构；实丛对应的是 $L$ 与 $\hat A$。`,
  },
  {
    id: "pontrjagin", name_zh: "Pontrjagin 类", name_en: "Pontrjagin class", icon: "🔁", section_id: "11.4.1", group: "real",
    plain: R`实丛的 $p(\mathcal{F})=\det(I+\mathcal{F}/2\pi)$，只含 $\mathcal{F}$ 的偶次幂，$p_j$ 是 $4j$ 形式。`,
    explain: R`实丛有纤维度规时结构群约化为 $\mathrm{O}(k)$，曲率是反对称矩阵，只能化为 $2\times2$ 块。$\det(I+\mathcal{F}/2\pi)=\prod(1+x_i^2)$，$p_j$ 是 $x_i^2$ 的初等对称函数；用迹表达为 \eqref{11.75a}–\eqref{11.75d}。

与陈类的关系：$p_j(E)=(-1)^jc_{2j}(E^{\C})$。$L$ 多项式与 $\hat A$ 亏格都用 $p_j$ 表达。`,
    analogy: "实矩阵的复特征值总是成对出现 $\\pm\\mathrm{i}\\lambda$；Pontrjagin 类只记得每对的\"模方\"，因此只含偶次幂。",
    book_example: { what: R`例 11.5：四维流形 $p_1=-\frac1{8\pi^2}\Tr\mathcal{R}^2$。`, point: R`$\tau(M)=\frac13\int p_1$。` },
    misconception: R`$4j>\dim M$ 时 $p_j(\mathcal{F})$ 作为形式为零，但作为矩阵的多项式 $p_j(A)$ 不为零——Euler 类正是借用这一点定义的。`,
  },
  {
    id: "euler_class", name_zh: "Euler 类与 Pfaffian", name_en: "Euler class & Pfaffian", icon: "⚽", section_id: "11.4.2", group: "real",
    plain: R`$e=\mathrm{Pf}(\mathcal{R}/2\pi)$，是 $p_l$ 的"平方根"；$\int_Me=\chi(M)$。`,
    explain: R`$2l$ 阶反对称矩阵的行列式是一个多项式的平方：$\det A=\mathrm{Pf}(A)^2$。Pfaffian 在 $\mathrm{SO}(2l)$ 下不变、在反射下变号，所以 Euler 类需要定向。二维时 $e=\frac{K}{2\pi}\dd A$，四维时 $e=\frac1{32\pi^2}\epsilon^{ijkl}\mathcal{R}_{ij}\wedge\mathcal{R}_{kl}$。

Gauss–Bonnet：$\int_Me(M)=\chi(M)$，球面 2、环面 0。`,
    analogy: "行列式像面积的平方（无方向），Pfaffian 像带符号的面积（有方向）。",
    book_example: { what: R`例 11.6：$e(S^2)=\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi$，积分为 2；交互图 3 对鼓包球面、椭球、环面验证。`, point: "曲率分布任意，积分固定。" },
    misconception: R`原书 Pfaffian 的相位 $(-1)^l$ 会让二维时 $e=-\frac{K}{2\pi}\dd A$，与 Gauss–Bonnet 矛盾；本站采用标准 Pfaffian（见勘误）。`,
  },
  {
    id: "L_Ahat", name_zh: "L 多项式与 Â 亏格", name_en: R`Hirzebruch $L$-polynomial & $\hat A$-genus`, icon: "🧭", section_id: "11.4.3", group: "real",
    plain: R`$L=\prod\frac{x}{\tanh x}$、$\hat A=\prod\frac{x/2}{\sinh(x/2)}$，都是 $p_j$ 的多项式。`,
    explain: R`二者都是偶函数，所以只依赖于 $x_i^2$，可以用 Pontrjagin 类表达：$L=1+\frac13p_1+\frac1{45}(-p_1^2+7p_2)+\cdots$，$\hat A=1-\frac1{24}p_1+\frac1{5760}(7p_1^2-4p_2)+\cdots$。

$L$ 的积分是符号差（Hirzebruch 符号差定理）；$\hat A$ 的积分是 Dirac 算子的指标（第 12 章）。`,
    analogy: "同一套\"分裂 + 对称化\"的机器，换一个生成函数就得到一个新的拓扑不变量。",
    book_example: { what: R`例 11.8：四维 $\tau(M)=\int L_1=\frac13\int p_1$。`, point: "交互图 2 显示 \\eqref{11.94} 的通项漏了 $2^{-2n}$。" },
    misconception: R`$\hat A$ 的系数很小（$\frac1{24},\frac1{5760}$），但积分仍是整数（对自旋流形）——这本身就是深刻的拓扑约束。`,
  },
  {
    id: "chern_simons", name_zh: "陈–Simons 形式", name_en: "Chern–Simons form", icon: "🪢", section_id: "11.5", group: "beyond",
    plain: R`示性类的局部"原函数"：$P_j(\mathcal{F})=\dd Q_{2j-1}(\mathcal{A},\mathcal{F})$。`,
    explain: R`由超渡 $Q_{2j-1}=TP_j(\mathcal{A},0)$ 得到，如 $Q_3=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$。它不能整体定义（否则闭流形上 $\int P=0$），且不是规范不变的：规范变换下改变 $Q(g^{-1}\dd g,0)+\dd\alpha$——前者积分是整数（绕数），后者积分为零。

物理：三维 Maxwell–Chern–Simons 理论里 $\epsilon AF$ 项让光子获得质量 $m$ 而不破坏规范不变性；第 13 章的反常也由它导出。`,
    analogy: "示性类像一座山的总高度差，陈–Simons 形式像沿途立的里程碑：里程碑的标号依赖于从哪里起算（规范），但两块碑的差有绝对意义。",
    book_example: { what: R`例 11.10：$\mathcal{L}=-\frac14F_{\mu\nu}F^{\mu\nu}+\frac14m\epsilon^{\lambda\mu\nu}F_{\lambda\mu}A_\nu$ 给出 $(\partial^2+m^2)\ast F=0$。`, point: "拓扑项给出质量。" },
    misconception: R`陈–Simons 形式本身不是示性类（不闭）；只有在边界上、积分意义下它才携带拓扑信息（\eqref{11.102}）。`,
  },
  {
    id: "stiefel_whitney", name_zh: "Stiefel–Whitney 类与自旋结构", name_en: "Stiefel–Whitney classes & spin structure", icon: "🧲", section_id: "11.6", group: "beyond",
    plain: R`用 $\pm1$ 记录的障碍：$w_1$ 挡住定向，$w_2$ 挡住自旋结构。`,
    explain: R`$w_1=[\det t_{ij}]\in H^1(M;\Z_2)$：可定向 ⇔ 能把所有 $\det t_{ij}$ 同时变成 $+1$ ⇔ $w_1$ 平凡。$w_2$：把 $\mathrm{SO}(m)$ 转移函数提升到 $\mathrm{SPIN}(m)$，三重重叠上 $\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=\pm I$；能否改提升的符号使之全为 $+I$ ⇔ $w_2$ 平凡 ⇔ 存在自旋结构。

这些类取值于 $\Z_2$ 系数上同调，不能用曲率表达。例：$\CP^2$ 不是自旋流形，所有 $S^m$ 与 Riemann 面都是。`,
    analogy: "地图册的每一页都标了\"顺时针\"方向；能否让相邻页的约定处处一致，就是 $w_1$；再进一步，能否让\"转 360° 回到负号\"的约定处处一致，就是 $w_2$。",
    book_example: { what: R`\eqref{11.140}：$w_2(\CP^m)=0$（$m$ 奇）或 $x$（$m$ 偶）。`, point: R`$\CP^2$ 上没有旋量场。` },
    misconception: R`$w_2=0$ 只保证自旋结构存在，不保证唯一；不同自旋结构由 $H^1(M;\Z_2)$ 计数。`,
  },
];

export const relations = [
  { from: "invariant_polynomial", to: "chern_weil", label: R`代入 $\mathcal{F}$` },
  { from: "chern_weil", to: "characteristic_class", label: "上同调类" },
  { from: "characteristic_class", to: "chern_class", label: R`$P=\det$` },
  { from: "chern_class", to: "splitting", label: "Whitney 和" },
  { from: "splitting", to: "chern_character", label: R`$\sum\mathrm{e}^{x}$` },
  { from: "splitting", to: "todd", label: R`$\prod\frac{x}{1-\mathrm{e}^{-x}}$` },
  { from: "characteristic_class", to: "pontrjagin", label: "实丛" },
  { from: "pontrjagin", to: "chern_class", label: "复化" },
  { from: "pontrjagin", to: "euler_class", label: "开平方" },
  { from: "pontrjagin", to: "L_Ahat", label: "偶函数" },
  { from: "chern_weil", to: "chern_simons", label: "超渡" },
  { from: "chern_character", to: "chern_simons", label: R`$\mathrm{ch}=\dd Q$` },
  { from: "characteristic_class", to: "stiefel_whitney", label: R`$\Z_2$ 系数` },
  { from: "euler_class", to: "stiefel_whitney", label: "都需定向" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**Chern–Weil**：不变多项式 $P$ 代入曲率得闭形式 $P(\mathcal{F})$；换联络只差恰当形式 $\dd TP(\mathcal{A}',\mathcal{A})$。于是 $[P(\mathcal{F})]\in H^*(M)$ 只依赖于丛——示性类；闭流形上的积分是拓扑不变量。示性类与拉回交换，平凡丛的示性类平凡。`}</TxI>,
  <TxI>{R`**复丛**：陈类 $c=\det(I+\frac{\mathrm{i}\mathcal{F}}{2\pi})=\prod(1+x_j)$，陈特征 $\mathrm{ch}=\Tr\mathrm{e}^{\mathrm{i}\mathcal{F}/2\pi}=\sum\mathrm{e}^{x_j}$，Todd 类 $\prod\frac{x_j}{1-\mathrm{e}^{-x_j}}$。分裂原理：都用陈根 $x_j$ 的对称函数计算；$c$、$\mathrm{Td}$ 对 $\oplus$ 可乘，$\mathrm{ch}$ 对 $\oplus$ 可加、对 $\otimes$ 可乘。`}</TxI>,
  <TxI>{R`**实丛**：Pontrjagin 类 $p=\det(I+\frac{\mathcal{F}}{2\pi})=\prod(1+x_i^2)$，$p_j=(-1)^jc_{2j}(E^{\C})$；Euler 类 $e=\mathrm{Pf}(\mathcal{R}/2\pi)$，$e^2=p_l$，Gauss–Bonnet $\int e=\chi$；$L=\prod\frac{x}{\tanh x}$（符号差）、$\hat A=\prod\frac{x/2}{\sinh(x/2)}$（Dirac 指标）。`}</TxI>,
  <TxI>{R`**拓扑荷都是示性数**：单极子 $\int_{S^2}\mathrm{ch}_1=c_1$（$=-2g$），$\CP^1$ 典范线丛 $-1$，瞬子数 $\int_{S^4}\mathrm{ch}_2$，球面 $\int e=2$。`}</TxI>,
  <TxI>{R`**超出上同调类**：陈–Simons 形式 $Q_{2j-1}$ 是示性类的局部原函数，规范变换下只变一个整数类加恰当形式——三维给出拓扑质量。Stiefel–Whitney 类 $w_1$、$w_2\in H^*(M;\Z_2)$ 是定向与自旋结构的障碍，不能用曲率表达。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么 $\int_MP(\mathcal{F})$（$M$ 闭）不依赖于联络的选取？`,
    options: [R`因为 $P(\mathcal{F})$ 处处为零`, R`因为两个联络的 $P(\mathcal{F})$ 之差是整体定义的恰当形式 $\dd TP(\mathcal{A}',\mathcal{A})$，由 Stokes 定理积分为零`, R`因为曲率在规范变换下不变`, R`因为 $P$ 是线性的`],
    answer: 1, why: R`\sref{T11.1}(b) 与 \eqref{11.22}。注意 $\theta=\mathcal{A}'-\mathcal{A}$ 是伴随变换的张量，所以超渡形式 $TP$ 在整个 $M$ 上有定义——这是 Stokes 定理能用的前提。`,
  },
  {
    q: R`$\mathrm{SU}(2)$ 丛的第一陈类 $c_1(\mathcal{F})$ 等于多少？`,
    options: [R`$\frac{\mathrm{i}}{2\pi}\Tr\mathcal{F}$，一般不为零`, R`$0$，因为 $\mathfrak{su}(2)$ 的元素无迹`, R`$\det(\mathrm{i}\mathcal{F}/2\pi)$`, R`$\frac14(\frac{\mathrm{i}}{2\pi})^2\mathcal{F}^\alpha\wedge\mathcal{F}^\alpha$`],
    answer: 1, why: R`$c_1=\frac{\mathrm{i}}{2\pi}\Tr\mathcal{F}$，Pauli 矩阵无迹（例 11.1、\eqref{11.31}）。选项 C、D 是 $c_2$。`,
  },
  {
    q: R`用分裂原理，$\mathrm{ch}_2$ 用陈类表达为：`,
    options: [R`$c_2$`, R`$\frac12(c_1^2-2c_2)$`, R`$c_1^2-c_2$`, R`$\frac12(c_1^2+c_2)$`],
    answer: 1, why: R`$\mathrm{ch}_2=\frac12\sum x_j^2=\frac12[S_1^2-2S_2]=\frac12(c_1^2-2c_2)$（\eqref{11.50}–\eqref{11.51c}）。`,
  },
  {
    q: R`下面哪一个对 Whitney 和 $\oplus$ 是"加性"的而非"乘性"的？`,
    options: [R`全陈类 $c$`, R`Todd 类 $\mathrm{Td}$`, R`陈特征 $\mathrm{ch}$`, R`$\hat A$ 亏格`],
    answer: 2, why: R`$\mathrm{ch}(E\oplus F)=\mathrm{ch}(E)+\mathrm{ch}(F)$（\eqref{11.62b}），因为 $\Tr$ 对分块对角矩阵相加；其余都由 $\det$ 或 $\prod f(x_i)$ 定义，对 $\oplus$ 相乘。`,
  },
  {
    q: R`为什么 Euler 类只对可定向流形有定义，而 Pontrjagin 类不需要定向？`,
    options: [R`因为 Euler 类是奇数次形式`, R`因为 $\mathrm{Pf}(S^{\rm t}AS)=\mathrm{Pf}(A)\det S$，在 $\det S=-1$ 的反射下变号，只是 $\mathrm{SO}(2l)$ 不变量；而 $\det(I+A/2\pi)$ 是 $\mathrm{O}(k)$ 不变量`, R`因为不可定向流形没有曲率`, R`因为 Pontrjagin 类总是零`],
    answer: 1, why: R`\eqref{11.87}。结构群必须约化到 $\mathrm{SO}(2l)$（需要定向）Pfaffian 才是不变多项式。`,
  },
  {
    q: R`关于 Stiefel–Whitney 类 $w_2$，下列说法正确的是：`,
    options: [R`它可以写成曲率的不变多项式`, R`它取值于 $H^2(M;\R)$`, R`它记录把 $\mathrm{SO}(m)$ 转移函数提升到 $\mathrm{SPIN}(m)$ 时三重重叠上的符号 $f(i,j,k)=\pm1$ 的上同调类；平凡 ⇔ 存在自旋结构`, R`所有偶数维流形都有 $w_2\neq0$`],
    answer: 2, why: R`\eqref{11.139} 与\sref{T11.7}。$w_2$ 取值于 $\Z_2$ 系数的 Čech 上同调，不能用曲率表达；$S^{2n}$ 的 $w_2=0$ 而 $\CP^2$ 的 $w_2\neq0$。`,
  },
];

export const BRIDGE = R`本章造好了一整套"曲率的拓扑积分"：$\int\mathrm{ch}$、$\int\mathrm{Td}$、$\int L$、$\int\hat A$、$\int e$。第 12 章把它们与**微分算子的解的个数**联系起来——Atiyah–Singer 指标定理：$\ind D=\dim\ker D-\dim\ker D^\dagger$ 等于某个示性类的积分。de Rham 复形给出 Gauss–Bonnet（$\int e=\chi$），Dolbeault 复形给出 Riemann–Roch（$\int\mathrm{ch}\,\mathrm{Td}$），符号差复形给出 Hirzebruch 定理（$\int L=\tau$），自旋复形给出 $\int\hat A\,\mathrm{ch}$——后者在第 13 章里成为规范反常的公式，而那里的 descent 方程正是由本章的陈–Simons 形式及其规范变换 \eqref{11.118} 推出。`;
