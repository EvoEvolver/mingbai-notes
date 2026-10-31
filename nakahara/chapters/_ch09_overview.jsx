// 第 9 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一张纸条、一个罗盘和一根磁单极";
export const HOOK = R`**纸条。**拿一条长纸带，两端对齐粘起来得到圆柱；把一端扭转半圈再粘，得到 Möbius 带。在任何一小段上，二者都一模一样——都是"一小段圆弧 $\times$ 一小段线段"。区别只在**粘合**的那一处：一个用恒等映射 $t\mapsto t$，一个用翻转 $t\mapsto-t$。沿着 Möbius 带的中线走一圈，你手里的"向上"变成了"向下"。

**罗盘。**在地球上每一点都能放一个指南针，于是每一点都有一个切平面上的方向圆。这些圆拼成的空间就是 $S^2$ 上的（单位）切丛。著名的"毛球定理"说你没法在地球上处处连续地选出一个非零方向——这一事实翻译成本章的语言就是：$TS^2$ 不是平凡丛 $S^2\times\R^2$。

**磁单极。**Dirac 发现，若存在磁单极，电子波函数的相位不能在包围单极的球面上被单一地定义；必须在北、南两个半球各用一套相位约定，在赤道上用 $\mathrm{e}^{\mathrm{i}n\phi}$ 粘合，而 $n$ 必须是整数——这就是电荷量子化。这个"$S^2$ 上带整数扭转的 $\mathrm{U}(1)$ 丛"在 $n=1$ 时正是 Hopf 纤维化 $S^3\to S^2$：三维球面被一族两两相扣的圆周填满。

本章的一个核心思想贯穿始终：**局部上是乘积，整体的扭曲全部写在粘合规则（转移函数）里。**规范场论中的规范变换、广义相对论中的标架变换、量子力学中波函数的相位，都是这一思想的不同面孔。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "9.1", title: "切丛：第一个例子", gist: R`把所有切空间 $T_pM$ 拼成 $TM$；局部 $TU_i\cong U_i\times\R^m$，换卡时纤维坐标乘 Jacobi 矩阵 $\partial y^\nu/\partial x^\mu\in\mathrm{GL}(m,\R)$；向量场 = 截面。`, gives: ["9.1", "9.3"], next: R`把"局部乘积 + 用群元粘合"抽象出来。` },
  { sec: "9.2", title: "纤维丛：定义、重构、丛映射、拉回", gist: R`$(E,\pi,M,F,G)$ 与转移函数 $t_{ij}=\phi_{i,p}^{-1}\circ\phi_{j,p}$；相容条件（余循环）；换平凡化 $\tilde t_{ij}=g_i^{-1}t_{ij}g_j$；圆柱 vs Möbius 带；由转移函数重构丛；丛映射、等价丛、拉回丛 $t^*_{ij}=t_{ij}\circ f$；同伦公理：可缩底空间上的丛平凡。`, gives: ["9.4", "9.6c", "9.9", "9.12", "9.18"], next: R`纤维是向量空间时，丛上可以做线性代数。` },
  { sec: "9.3", title: "向量丛", gist: R`纤维 $\R^k$ 或 $\C^k$，结构群 $\mathrm{GL}(k)$；$TS^2$ 的转移函数 \eqref{9.23}；法丛、线丛、典范线丛；标架与换基 \eqref{9.29}；余切丛与对偶丛；截面构成模、零截面、纤维度规；乘积丛、Whitney 和（分块对角转移函数）、张量积丛。`, gives: ["9.21", "9.23", "9.29", "9.31", "9.37", "9.39"], next: R`纤维取成结构群本身，就得到最"原始"的丛。` },
  { sec: "9.4", title: "主丛", gist: R`纤维 = $G$，有与平凡化无关的右作用（自由、可迁）；截面 ↔ 典范平凡化，$s_i=s_jt_{ji}$；单极子丛（$\pi_1(\mathrm{U}(1))=\Z$）、瞬子丛（$\pi_3(\mathrm{SU}(2))=\Z$）、Hopf 纤维化 $S^3\to S^2$、$S^7\to S^4$、$G\to G/H$；相伴丛 $P\times_\rho V$、标架丛、自旋丛；主丛平凡 ⇔ 有整体截面。`, gives: ["9.41", "9.43", "9.45", "9.51", "9.53a", "9.57", "9.66", "9.70", "9.73"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "9.1", to: "9.3", label: "两张卡的分量" },
  { from: "9.3", to: "9.4", label: R`抽象：$\mathrm{GL}(m)\to G$` },
  { from: "9.4", to: "9.6c", label: "三卡重叠相容" },
  { from: "9.4", to: "9.9", label: R`换平凡化 $g_i$` },
  { from: "9.9", to: "9.10", label: R`$t_{ij}=e$` },
  { from: "9.6c", to: "9.12", label: "等价关系" },
  { from: "9.12", to: "9.18", label: "拉回" },
  { from: "9.3", to: "9.21", label: "切丛即向量丛" },
  { from: "9.21", to: "9.23", label: R`$S^2$ 球极坐标` },
  { from: "9.27", to: "9.29", label: "换标架" },
  { from: "9.29", to: "9.31", label: "对偶基" },
  { from: "9.18", to: "9.37", label: R`沿对角映射拉回` },
  { from: "9.4", to: "9.41", label: "右乘与左乘交换" },
  { from: "9.41", to: "9.43", label: "典范平凡化" },
  { from: "9.43", to: "9.73", label: "整体截面" },
  { from: "9.4", to: "9.45", label: R`$G=\mathrm{U}(1)$` },
  { from: "9.53a", to: "9.57", label: "两半球平凡化" },
  { from: "9.57", to: "9.45", label: R`$n=1$` },
  { from: "9.48", to: "9.51", label: R`$n$ 次幂` },
  { from: "9.43", to: "9.66", label: "相伴丛" },
  { from: "9.66", to: "9.70", label: R`$\rho=$ 恒等表示` },
  { from: "9.21", to: "9.70", label: "同一组转移函数" },
];
export const EQMAP_LABELS = {
  "9.1": "切丛", "9.3": "纤维坐标变换", "9.4": "转移函数", "9.6c": "余循环条件", "9.9": "换平凡化", "9.10": "平凡丛",
  "9.12": "由转移函数重构", "9.18": "拉回丛的转移函数", "9.21": "切丛 = 向量丛", "9.23": R`$TS^2$ 的转移函数`,
  "9.27": "换标架", "9.29": "分量反变", "9.31": "余切丛", "9.37": "Whitney 和", "9.41": "主丛的右作用",
  "9.43": "截面的粘合", "9.73": "平凡 ⇔ 整体截面", "9.45": "单极子丛", "9.53a": "Hopf 映射", "9.57": "Hopf 丛的转移函数",
  "9.48": "瞬子丛", "9.51": R`瞬子数 $n$`, "9.66": "相伴丛", "9.70": "标架丛",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "basic", label: "纤维丛的骨架" },
  { id: "vector", label: "向量丛" },
  { id: "principal", label: "主丛与相伴丛" },
  { id: "phys", label: "物理中的丛" },
];

export const concepts = [
  {
    id: "fibre_bundle", name_zh: "纤维丛", name_en: "Fibre bundle", icon: "🧶", section_id: "9.2.1", group: "basic",
    plain: R`局部看是"底空间 $\times$ 纤维"的乘积、整体上可以扭曲的空间。`,
    explain: R`数据 $(E,\pi,M,F,G)$：全空间 $E$ 通过投影 $\pi$ 落在底空间 $M$ 上，每点上方的纤维 $\pi^{-1}(p)$ 都同构于典型纤维 $F$；在每个坐标邻域 $U_i$ 上有局部平凡化 $\phi_i:U_i\times F\to\pi^{-1}(U_i)$。

正如流形是"局部像 $\R^m$"的空间，纤维丛是"局部像乘积"的空间；流形用转移函数粘合坐标卡，纤维丛用结构群 $G$ 中的元素粘合局部乘积。`,
    analogy: "一本活页相册：每一页（纤维）都是同样大小的空白页，装订的方式（每页相对前一页转多少角度）决定了整本相册的形状。",
    book_example: { what: R`例 9.1：$S^1$ 上纤维为 $[-1,1]$ 的丛，两张卡在 $B=(\pi,2\pi)$ 上用 $t\mapsto\pm t$ 粘合，得圆柱或 Möbius 带。`, point: "局部完全相同，整体不同。" },
    misconception: R`全空间 $E$ 不必与 $M\times F$ 同胚；"每根纤维都同构于 $F$"不能推出"$E\cong M\times F$"。`,
  },
  {
    id: "transition_function", name_zh: "转移函数与余循环条件", name_en: "Transition functions & cocycle condition", icon: "🔗", section_id: "9.2.1", group: "basic",
    plain: R`重叠区上两套纤维坐标之间的换算规则，取值于结构群。`,
    explain: R`$t_{ij}(p)=\phi_{i,p}^{-1}\circ\phi_{j,p}$，$f_i=t_{ij}(p)f_j$。相容条件 $t_{ii}=e$、$t_{ij}=t_{ji}^{-1}$、$t_{ij}t_{jk}=t_{ik}$ 保证局部片能无矛盾地粘起来。

在每张卡里换平凡化（$g_i$）会改变转移函数：$\tilde t_{ij}=g_i^{-1}t_{ij}g_j$，但丛不变。丛的拓扑 = 转移函数模去这种"规范变换"。规范场论中，$t_{ij}$ 是粘合两张卡所需的规范变换。`,
    analogy: "国际航班换时区：每个国家用自己的时间（局部平凡化），边境上有固定的时差（转移函数）；绕地球一圈，时差加起来必须自洽（余循环），否则会\"多出一天\"——日期变更线就是为此设的。",
    book_example: { what: R`\eqref{9.23}：$TS^2$ 上 $t_{\rm SN}=\partial(U,V)/\partial(X,Y)$，是"转 $2\theta$ 再缩放"的矩阵。`, point: "转移函数就是 Jacobi 矩阵的推广。" },
    misconception: R`转移函数本身不是丛的不变量：同一个丛可以有很多组转移函数，只要它们相差 $g_i^{-1}(\cdot)g_j$。`,
  },
  {
    id: "section", name_zh: "截面", name_en: "Section", icon: "✂️", section_id: "9.1", group: "basic",
    plain: R`在每一点的纤维里光滑地挑一个点：$\pi\circ s=\mathrm{id}_M$。`,
    explain: R`向量场是切丛的截面，波函数是复线丛的截面，规范变换的"原点选择"是主丛的截面。局部截面总存在，整体截面不一定。

向量丛总有零截面；主丛有整体截面当且仅当它平凡（\sref{T9.2}）。所以"能不能处处光滑地选"是检验扭曲的探针。`,
    analogy: "在每根头发上选一个高度涂上颜色，涂色点连成的曲面就是截面；毛球定理说你不能把每根头发都平平地梳顺。",
    book_example: { what: R`§9.3.4：$\CP^n$ 上典范线丛的局部截面 $s_\mu$，换卡时 $s_\nu=(z^\mu/z^\nu)s_\mu$。`, point: "截面在卡之间按转移函数变换。" },
    misconception: R`截面不是"纤维的子集"，而是从底空间出发的映射；它的像是全空间中与每根纤维恰好交于一点的子流形。`,
  },
  {
    id: "trivial_bundle", name_zh: "平凡丛与扭曲", name_en: "Trivial vs twisted bundles", icon: "🎀", section_id: "9.2.1", group: "basic",
    plain: R`能整体写成 $M\times F$ 的丛是平凡的；否则就是扭曲的。`,
    explain: R`判据：所有转移函数可同时取为恒等（\eqref{9.10}：$t_{ij}=g_i^{-1}g_j$）；对主丛，等价于存在整体截面；对向量丛，等价于存在整体标架。

可缩底空间上的丛都平凡（\sref{C9.1}），所以扭曲只能来自底空间的拓扑：$S^1$ 上有 Möbius 带，$S^2$ 上有 $TS^2$ 与单极子丛，$S^4$ 上有瞬子丛。`,
    analogy: R`圆柱 vs Möbius 带：在任何一小段上无法区分；只有绕一圈回来，才知道"上"是不是变成了"下"。`,
    book_example: { what: R`例 9.1、交互图 1：$t_{12}=-1$ 时沿底圆走一圈，纤维坐标 $t_0\to-t_0$。`, point: R`结构群 $\Z_2$ 的非平凡元素无法被规范掉。` },
    misconception: R`平凡丛也可以有看上去"不平凡"的转移函数（如 $t_{ij}=g_i^{-1}g_j$ 的任意选择）；要看能否规范掉，而不是看它是否等于 $e$。`,
  },
  {
    id: "pullback", name_zh: "丛映射与拉回丛", name_en: "Bundle map & pullback bundle", icon: "⤵️", section_id: "9.2.5", group: "basic",
    plain: R`映射 $f:N\to M$ 把 $M$ 上的丛"拉"到 $N$ 上：$N$ 的点 $p$ 上方放 $f(p)$ 处的纤维。`,
    explain: R`$f^*E=\{(p,u)\in N\times E\mid f(p)=\pi(u)\}$，转移函数 $t^*_{ij}(p)=t_{ij}(f(p))$。丛映射把纤维映到纤维；等价丛 = 覆盖恒等映射的微分同胚丛映射。

同伦公理（\sref{T9.1}）：同伦的映射拉回等价的丛。所以丛只依赖于映射的同伦类，这是用同伦群给丛分类的根源。Whitney 和是 $E\times E'$ 沿对角映射的拉回。`,
    analogy: "把一张世界气温图沿你的旅行路线\"拉回\"：路线上每一刻都对应地图上一个位置的温度——路线本身可以绕圈、回头，拉回总有定义。",
    book_example: { what: R`图 9.7：$t^*_{ij}=t_{ij}\circ f$；例 9.2：$f$ 满秩时 $TN\cong f^*(TM)$。`, point: "拉回只是\"复合\"。" },
    misconception: R`拉回丛的纤维维数与原丛相同，与 $N$、$M$ 的维数无关。`,
  },
  {
    id: "vector_bundle", name_zh: "向量丛与线丛", name_en: "Vector bundle & line bundle", icon: "↗️", section_id: "9.3.1", group: "vector",
    plain: R`纤维是向量空间 $\R^k$ 或 $\C^k$、转移函数是可逆矩阵的丛。`,
    explain: R`结构群 $\mathrm{GL}(k,\R)$ 或 $\mathrm{GL}(k,\C)$；纤维维数 $k=\dim E$。切丛、余切丛、法丛、张量丛都是向量丛。$k=1$ 时称线丛：圆柱、Möbius 带是实线丛；$\CP^n$ 上的典范线丛把每一点（一条复直线）上方就放这条直线本身。

截面可以逐点相加、乘函数，构成模；零截面总存在。纤维度规 $h_{\mu\nu}$ 给每根纤维一个内积。`,
    analogy: "每个气象站上方都有一个风速向量空间；风场就是这个向量丛的截面。",
    book_example: { what: R`例 9.4：$S^2\subset\R^3$ 的法丛 $NS^2=S^2\times\R$ 平凡，而切丛 $TS^2$ 不平凡；二者的 Whitney 和是平凡的 $S^2\times\R^3$（例 9.6）。`, point: "两个丛之和平凡，不代表每个都平凡。" },
    misconception: R`"总有零截面"不代表平凡：Möbius 带有零截面却不平凡。`,
  },
  {
    id: "frame", name_zh: "标架与对偶丛", name_en: "Frames & dual bundles", icon: "📐", section_id: "9.3.2", group: "vector",
    plain: R`标架 = 一组逐点线性无关的局部截面 $\{e_\alpha\}$，相当于一个局部平凡化。`,
    explain: R`给定标架，$V=V^\alpha e_\alpha(p)\mapsto\{V^\alpha\}$ 就是局部平凡化。换标架 $\tilde e_\beta=e_\alpha G^\alpha{}_\beta$ 时分量按逆矩阵变：$\tilde V^\beta=(G^{-1})^\beta{}_\alpha V^\alpha$——这就是"反变"。

对偶丛 $E^*$ 的纤维是 $F$ 的对偶空间，对偶基 $\langle\theta^\alpha,e_\beta\rangle=\delta^\alpha{}_\beta$。余切丛 $T^*M$ 是切丛的对偶，其截面是一形式。`,
    analogy: R`一把局部尺子：同一个向量在两把尺子下读数不同，读数换算用尺子换算的逆。`,
    book_example: { what: R`\eqref{9.27}–\eqref{9.29}：转移函数 $t_{ji}=G^{-1}$；\eqref{9.31}：一形式分量用 $\partial x^\nu/\partial y^\mu$。`, point: "基向量与分量反向变换，乘积不变。" },
    misconception: R`整体标架不一定存在；它存在 ⇔ 向量丛平凡（\sref{C9.2}）。`,
  },
  {
    id: "bundle_algebra", name_zh: "Whitney 和与张量积丛", name_en: "Whitney sum & tensor product", icon: "➕", section_id: "9.3.5", group: "vector",
    plain: R`逐点做直和或张量积；转移函数分别是分块对角矩阵和 Kronecker 积。`,
    explain: R`Whitney 和 $E\oplus E'$：纤维 $F_p\oplus F'_p$，$T_{ij}=\mathrm{diag}(t^E_{ij},t^{E'}_{ij})$。乘积丛 $E\times E'$ 的底空间是 $M\times M'$；Whitney 和是它沿对角映射 $p\mapsto(p,p)$ 的拉回。

张量积丛 $E\otimes E'$ 的纤维 $F_p\otimes F'_p$，转移函数 $t^E_{ij}\otimes t^{E'}_{ij}$；全反对称部分 $\Lambda^r(T^*M)$ 的截面就是 $r$ 形式。`,
    analogy: R`两个独立的旋钮面板并排（直和）vs 所有旋钮组合的总控台（张量积）。`,
    book_example: { what: R`习题 P9.1：任意实线丛 $L$ 都有 $L\oplus L$ 平凡——Möbius 带 $\oplus$ 自身的转移函数 $-I_2$ 可以连续转到 $I_2$。`, point: R`$-I_2\in\mathrm{SO}(2)$ 与 $I_2$ 道路连通，$-1\in\mathrm{GL}(1,\R)$ 却不与 $1$ 连通。` },
    misconception: R`$\dim(E\oplus E')=\dim E+\dim E'$，$\dim(E\otimes E')=\dim E\cdot\dim E'$——指纤维维数，不是全空间维数。`,
  },
  {
    id: "principal_bundle", name_zh: "主丛与右作用", name_en: "Principal bundle", icon: "👑", section_id: "9.4.1", group: "principal",
    plain: R`纤维就是结构群 $G$ 本身；$G$ 还能从右边自由且可迁地作用在每根纤维上。`,
    explain: R`右作用 $ua=\phi_i(p,g_ia)$ 与平凡化无关，因为转移函数从左边乘、右作用从右边乘，二者交换。每根纤维是 $G$ 的一个"没有原点的副本"（torsor）：选一个截面 $s_i$ 就选定了原点，得到典范平凡化 $\phi_i(p,g)=s_i(p)g$。

截面在卡间满足 $s_i=s_jt_{ji}$；主丛平凡 ⇔ 有整体截面（\sref{T9.2}）。规范场（联络）住在主丛上（第 10 章）。`,
    analogy: "每个城市都有一个钟面（纤维 = 转动群），但没有统一的\"12 点\"方向；选定一个截面就是给每个城市规定 12 点朝哪。右作用是\"所有钟同时拨快 3 小时\"，不需要知道 12 点在哪。",
    book_example: { what: R`例 9.10：$G\to G/H$ 是 $H$ 主丛，如 $\mathrm{SU}(2)\to\mathrm{SU}(2)/\mathrm{U}(1)=S^2$。`, point: "齐性空间天然是主丛的底空间。" },
    misconception: R`左作用（转移函数）依赖于平凡化，右作用不依赖；不要把二者混为一谈（只有 $G$ 交换时才可以随意互换）。`,
  },
  {
    id: "monopole_bundle", name_zh: "单极子丛与瞬子丛", name_en: "Monopole & instanton bundles", icon: "🧲", section_id: "9.4.1", group: "phys",
    plain: R`两半球用 $\mathrm{e}^{\mathrm{i}n\phi}$ 粘合的 $\mathrm{U}(1)$ 丛；整数 $n$ 就是磁荷。`,
    explain: R`$S^2=U_{\rm N}\cup U_{\rm S}$，重叠区是赤道 $S^1$；转移函数 $t_{\rm NS}:S^1\to\mathrm{U}(1)$ 的同伦类由 $\pi_1(\mathrm{U}(1))=\Z$ 中的整数 $n$ 标记：$t_{\rm NS}=\mathrm{e}^{\mathrm{i}n\phi}$。$n=0$ 平凡，$n\neq0$ 扭曲。

同样，$S^4$ 上的 $\mathrm{SU}(2)$ 丛由 $t_{\rm NS}:S^3\to\mathrm{SU}(2)\cong S^3$ 的同伦类 $\pi_3(\mathrm{SU}(2))=\Z$ 分类，这个整数就是瞬子数。`,
    analogy: R`在赤道上绕一圈，相位转了 $n$ 圈——像给一根绳子拧了 $n$ 个整圈，拧的圈数不能连续地改变。`,
    book_example: { what: R`\eqref{9.45}：$\mathrm{e}^{\mathrm{i}\alpha_{\rm N}}=\mathrm{e}^{\mathrm{i}n\phi}\mathrm{e}^{\mathrm{i}\alpha_{\rm S}}$；\eqref{9.51}：$t_{\rm NS}=R^{-n}(t\boldsymbol{1}+\mathrm{i}\sum_ix^i\sigma_i)^n$。`, point: "拓扑荷 = 转移函数的同伦类。" },
    misconception: R`$n$ 必须是整数并非出于物理假设，而是因为 $t_{\rm NS}$ 必须在赤道上单值。`,
  },
  {
    id: "hopf", name_zh: "Hopf 纤维化", name_en: "Hopf fibration", icon: "🌀", section_id: "9.4.1", group: "phys",
    plain: R`$S^3\to S^2$：把 $(z^0,z^1)$ 送到比值 $z^0/z^1$；每根纤维是一个圆，任意两根相扣一次。`,
    explain: R`$S^3=\{|z^0|^2+|z^1|^2=1\}$，$\pi(z^0,z^1)=[z^0:z^1]\in\CP^1=S^2$，纤维 $\{(\lambda z^0,\lambda z^1)\mid|\lambda|=1\}\cong\mathrm{U}(1)$。两半球的平凡化给出 $t_{\rm NS}=\xi^1+\mathrm{i}\xi^2=\mathrm{e}^{\mathrm{i}\phi}$（赤道上），即 $n=1$ 的单极子丛。

四元数版本 $S^7\to S^4$（纤维 $S^3=\mathrm{SU}(2)$）描述单位瞬子；八元数版本 $S^{15}\to S^8$ 的纤维 $S^7$ 不是群。`,
    analogy: "一团毛线圈填满了整个三维空间（加一个无穷远点），每两根线圈都恰好互相套住一次——像一串永远解不开的钥匙环。",
    book_example: { what: R`\eqref{9.53a}–\eqref{9.57}；交互图 2 中立体投影出的 Villarceau 圆与数值环绕数。`, point: R`Hopf 不变量 $=1$（习题 P9.2(e)）。` },
    misconception: R`$S^3$ 不等于 $S^2\times S^1$（$\pi_1(S^2\times S^1)=\Z$，而 $S^3$ 单连通）；Hopf 丛不平凡。`,
  },
  {
    id: "associated_bundle", name_zh: "相伴丛、标架丛与自旋丛", name_en: "Associated, frame & spin bundles", icon: "🧬", section_id: "9.4.2", group: "principal",
    plain: R`用主丛的转移函数（经表示 $\rho$）去粘合别的纤维 $V$，得到 $P\times_\rho V$。`,
    explain: R`等同 $(u,v)\sim(ug,\rho(g)^{-1}v)$；转移函数 $\rho(t_{ij})$。反过来，向量丛 $E$ 诱导主丛 $P(E)$。切丛 $TM$ 对应的主丛就是标架丛 $LM$：纤维是 $p$ 处所有标架，$\mathrm{GL}(m,\R)$ 从右边换基。

有度规时结构群约化为 $\mathrm{O}(m)$（vierbein）；在定向、时向的 Lorentz 流形上约化为 $\mathrm{O}^+_\uparrow(3,1)$，再提升到二重覆盖 $\mathrm{SL}(2,\C)$ 得到自旋丛；Weyl、Dirac 旋量是其相伴丛的截面。`,
    analogy: "一套官方汇率表（主丛的转移函数）可以同时用来换算美元、欧元、日元（不同表示的相伴丛）——汇率表是\"主\"，各币种账本是\"相伴\"。",
    book_example: { what: R`例 9.11：标架丛的转移函数 $t^L_{ij}=(\partial x^\mu/\partial y^\nu)$，与切丛相同（\eqref{9.70}）。`, point: "同一组转移函数，不同的纤维。" },
    misconception: R`并非每个流形都有自旋丛：$\mathrm{SO}(k)$ 丛能否提升到 $\mathrm{SPIN}(k)$ 有拓扑障碍（第 11 章的 Stiefel–Whitney 类）。`,
  },
];

export const relations = [
  { from: "fibre_bundle", to: "transition_function", label: "粘合规则" },
  { from: "transition_function", to: "trivial_bundle", label: "可否规范掉" },
  { from: "fibre_bundle", to: "section", label: R`$\pi\circ s=\mathrm{id}$` },
  { from: "section", to: "trivial_bundle", label: "主丛判据" },
  { from: "fibre_bundle", to: "pullback", label: R`$f^*E$` },
  { from: "pullback", to: "trivial_bundle", label: "同伦公理" },
  { from: "fibre_bundle", to: "vector_bundle", label: "纤维 = 向量空间" },
  { from: "vector_bundle", to: "frame", label: "局部基" },
  { from: "vector_bundle", to: "bundle_algebra", label: R`$\oplus$ / $\otimes$` },
  { from: "pullback", to: "bundle_algebra", label: "对角拉回" },
  { from: "fibre_bundle", to: "principal_bundle", label: R`纤维 $=G$` },
  { from: "principal_bundle", to: "associated_bundle", label: R`$\times_\rho V$` },
  { from: "frame", to: "associated_bundle", label: "标架丛" },
  { from: "principal_bundle", to: "monopole_bundle", label: R`$G=\mathrm{U}(1),\mathrm{SU}(2)$` },
  { from: "monopole_bundle", to: "hopf", label: R`$n=1$` },
  { from: "transition_function", to: "monopole_bundle", label: "同伦类 = 荷" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**纤维丛 = 局部乘积 + 粘合规则。**$(E,\pi,M,F,G)$，局部平凡化 $\phi_i:U_i\times F\to\pi^{-1}(U_i)$；在重叠区 $f_i=t_{ij}(p)f_j$，$t_{ij}\in G$ 满足余循环条件 $t_{ij}t_{jk}=t_{ik}$。丛由 $\{U_i,t_{ij},F,G\}$ 完全重构。`}</TxI>,
  <TxI>{R`**转移函数只在"规范等价"意义下确定**：$\tilde t_{ij}=g_i^{-1}t_{ij}g_j$。平凡丛 ⇔ $t_{ij}=g_i^{-1}g_j$。扭曲只能来自底空间的拓扑：可缩底空间上的丛都平凡（同伦公理）。拉回丛的转移函数是 $t_{ij}\circ f$。`}</TxI>,
  <TxI>{R`**向量丛**：纤维 $\R^k$/$\C^k$，结构群 $\mathrm{GL}(k)$；标架 ↔ 局部平凡化，换标架时分量按逆矩阵变。切丛、余切丛、法丛、线丛；Whitney 和（分块对角）、张量积（Kronecker 积）、$\Lambda^r(T^*M)$ 的截面是 $r$ 形式。`}</TxI>,
  <TxI>{R`**主丛**：纤维 $=G$，有与平凡化无关的自由可迁右作用；截面 ↔ 典范平凡化，$s_i=s_jt_{ji}$；主丛平凡 ⇔ 有整体截面；向量丛平凡 ⇔ 有整体标架。相伴丛 $P\times_\rho V$ 的转移函数是 $\rho(t_{ij})$；标架丛、自旋丛都是例子。`}</TxI>,
  <TxI>{R`**拓扑荷 = 转移函数的同伦类**：单极子丛 $t_{\rm NS}=\mathrm{e}^{\mathrm{i}n\phi}$，$n\in\pi_1(\mathrm{U}(1))=\Z$；瞬子丛 $n\in\pi_3(\mathrm{SU}(2))=\Z$。Hopf 纤维化 $S^3\to S^2$ 是 $n=1$ 的单极子丛，纤维两两相扣（Hopf 不变量 1）。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`圆柱与 Möbius 带都是 $S^1$ 上纤维为 $[-1,1]$ 的丛。下面哪一说法正确？`,
    options: [R`二者的局部平凡化不同：Möbius 带在某处不是局部乘积`, R`二者只在粘合规则上不同：在 $B=(\pi,2\pi)$ 上 $t_{12}$ 分别为 $t\mapsto t$ 与 $t\mapsto-t$`, R`Möbius 带的底空间不是 $S^1$`, R`Möbius 带的结构群是 $\mathrm{GL}(1,\R)$ 的连通分支`],
    answer: 1, why: R`例 9.1：两张卡都给出局部乘积，区别只在 $B$ 上的转移函数。Möbius 带的结构群是 $\Z_2=\{e,g\}$，$g:t\mapsto-t$；它不与 $e$ 连通，所以不能被连续地"规范掉"。`,
  },
  {
    q: R`在同一张卡里换局部平凡化 $\tilde\phi_{i,p}=\phi_{i,p}\circ g_i(p)$，转移函数如何变化？`,
    options: [R`$\tilde t_{ij}=t_{ij}$`, R`$\tilde t_{ij}=g_it_{ij}g_j^{-1}$`, R`$\tilde t_{ij}=g_i^{-1}t_{ij}g_j$`, R`$\tilde t_{ij}=g_j^{-1}t_{ij}g_i$`],
    answer: 2, why: R`$\tilde t_{ij}=\tilde\phi_{i,p}^{-1}\circ\tilde\phi_{j,p}=g_i^{-1}\phi_{i,p}^{-1}\phi_{j,p}g_j=g_i^{-1}t_{ij}g_j$（\eqref{9.9}）。新的一组仍满足余循环条件：$\tilde t_{ij}\tilde t_{jk}=g_i^{-1}t_{ij}t_{jk}g_k=\tilde t_{ik}$。`,
  },
  {
    q: R`为什么 $\R^m$ 上的任何纤维丛都是平凡的？`,
    options: [R`因为 $\R^m$ 可以用一张卡覆盖，所以根本没有转移函数`, R`因为 $\R^m$ 可缩，由同伦公理 $E=h_0^*E\simeq h_1^*E\simeq\R^m\times F$`, R`因为 $\R^m$ 非紧`, R`因为结构群必须是 $\{e\}$`],
    answer: 1, why: R`\sref{C9.1}。注意选项 A 的论证只对"在 $\R^m$ 上给定的这一组覆盖"有效，而丛的定义允许任意覆盖；同伦公理给出与覆盖无关的结论。`,
  },
  {
    q: R`向量丛总有零截面。下面哪一个才是"向量丛平凡"的判据？`,
    options: [R`存在一个处处非零的截面`, R`存在 $k$ 个处处线性无关的整体截面（整体标架），即 $P(E)$ 有整体截面`, R`纤维维数为 1`, R`底空间紧致`],
    answer: 1, why: R`\sref{C9.2}。一个处处非零的截面只能分出一个平凡线丛；例如 $S^5$ 上有处处非零的向量场，但 $TS^5$ 不平凡。`,
  },
  {
    q: R`单极子丛 $P_n$ 的转移函数为 $t_{\rm NS}=\mathrm{e}^{\mathrm{i}n\phi}$。为什么 $n$ 必须是整数，又为什么不同的 $n$ 给出不等价的丛？`,
    options: [R`为了让 $t_{\rm NS}$ 在赤道上单值；$n$ 是 $\phi\mapsto t_{\rm NS}$ 作为 $S^1\to\mathrm{U}(1)$ 的卷绕数，即 $\pi_1(\mathrm{U}(1))=\Z$ 中的类，连续形变（规范变换）不改变它`, R`因为电荷是整数`, R`为了让 $t_{\rm NS}$ 是实数`, R`$n$ 可以是任意实数，只是习惯取整数`],
    answer: 0, why: R`$\phi$ 与 $\phi+2\pi$ 是同一点，所以 $\mathrm{e}^{\mathrm{i}n(\phi+2\pi)}=\mathrm{e}^{\mathrm{i}n\phi}$ 要求 $n\in\Z$。在每个半球内的规范变换 $g_{\rm N},g_{\rm S}$ 都可缩到常值，卷绕数在 $g_{\rm N}^{-1}t_{\rm NS}g_{\rm S}$ 下不变。物理上，这正是 Dirac 量子化条件。`,
  },
  {
    q: R`Hopf 映射 $\pi:S^3\to S^2$，$\pi(z^0,z^1)=z^0/z^1$（在 $U_{\rm S}$ 上）。下列说法错误的是：`,
    options: [R`每根纤维是圆周 $\{(\lambda z^0,\lambda z^1)\mid|\lambda|=1\}$`, R`赤道上 $t_{\rm NS}=\xi^1+\mathrm{i}\xi^2$，绕赤道一圈卷绕 1 次`, R`$S^3\cong S^2\times S^1$`, R`立体投影到 $\R^3$ 后，任意两根纤维相扣一次`],
    answer: 2, why: R`$S^3$ 单连通，而 $\pi_1(S^2\times S^1)=\Z$，所以二者不同胚；Hopf 丛是 $n=1$ 的非平凡 $\mathrm{U}(1)$ 丛。`,
  },
];

export const BRIDGE = R`本章只搭好了"舞台"：丛是什么、怎样粘合、怎样分类。还没有回答的问题是——**怎样在丛上求导？**一个截面（如波函数）在相邻两根纤维上的值，本来无法比较，因为纤维之间没有典范的对应。第 10 章在主丛上引入**联络**（connection）：在全空间中选定"水平方向"，从而能把纤维沿底空间中的曲线平移。联络的局部表示就是规范势 $A_\mu$，它的曲率就是场强 $F_{\mu\nu}$；转移函数 $t_{ij}$ 的作用将变成规范变换 $A_j=t_{ij}^{-1}A_it_{ij}+t_{ij}^{-1}\dd t_{ij}$。届时例 9.7 的单极子与例 9.8 的瞬子会以具体的规范势重新出现，而本章的整数 $n$ 将等于曲率的积分——第 11 章的示性类。`;
