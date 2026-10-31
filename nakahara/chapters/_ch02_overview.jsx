// 第 2 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "吃豆人的屏幕、液晶分子与一张纸";
export const HOOK = R`老式街机游戏里，吃豆人从屏幕右边走出去，会从左边走回来；从上边出去，从下边回来。玩家其实生活在一个**环面**上：把矩形的左右边粘起来、上下边也粘起来。固体物理里给电子加"周期边界条件"做的是同一件事——把无限的晶体换成一个紧致的环面，于是波矢变成离散的，Fock 空间可以用离散指标标记。

如果把上下边粘反了（从上边右侧出去，从下边左侧回来），得到的就不再是环面，而是 **Klein 瓶**——一个在三维空间里放不下、没有"正反面"之分的曲面。如果两对边都粘反，就得到**射影平面** $\sym{RP}{\RP^2}$。射影平面并不是数学家的玩具：向列相液晶里的棒状分子"没有头尾"，方向 $\boldsymbol{n}$ 与 $-\boldsymbol{n}$ 是同一个状态，它的序参量空间正是把球面对径点粘合起来的 $\sym{RP}{\RP^2}$。

这一章要回答两个问题。**第一，怎样精确地说"粘起来"？**答案是等价关系与商空间 $X/\sim$。**第二，怎样精确地说"这两个形状本质上一样／不一样"？**答案是拓扑空间、连续映射与同胚；而要证明两个空间"不一样"，就去找一个在同胚下不变、却在两者上取值不同的量——**拓扑不变量**：紧致性、连通性，以及本章的明星 Euler 示性数 $\chi=\nosym{V-E+F}$。中间还有一段线性代数（对偶空间、伴随、张量），它是后面流形上一切微积分的语言；其中的"玩具指标定理"$\dim\ker f-\dim\ker\tilde f=\dim V-\dim W$，是第 12 章 Atiyah–Singer 指标定理最简单的影子。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "2.1", title: "映射与等价关系：怎样“粘起来”", gist: R`单射、满射、双射与复合；等价关系把集合划分为等价类 $[a]$，商空间 $X/\sim$ 把每一类压成一点：$\mathbb{R}/\sim\ =S^1$，正方形粘边得到柱面、Möbius 带、环面、Klein 瓶、$\sym{RP}{\RP^2}$。`, gives: ["2.3", "2.5"], next: R`粘合给出了形状；要在这些形状上做分析，先得有"线性"的语言。` },
  { sec: "2.2", title: "向量空间：对偶、伴随、张量", gist: R`基与分量；维数公式 $\dim V=\dim\ker f+\dim\operatorname{im}f$；对偶基 $e^{*i}(e_j)=\delta^i{}_j$ 与拉回 $f^*$；内积给出伴随 $\tilde f=g^{-1}f^{\rm t}G^{\rm t}$ 与玩具指标定理；$(p,q)$ 型张量。`, gives: ["2.8", "2.10", "2.12", "2.13", "2.19", "2.21", "2.23"], next: R`线性代数描述"局部"；整体的形状要用拓扑来描述。` },
  { sec: "2.3", title: "拓扑空间：只用“开集”说话", gist: R`拓扑 = 规定哪些子集是开集（任意并、有限交）；度量诱导拓扑；连续 = 开集的逆像是开集；邻域、Hausdorff、闭集、紧致（有限子覆盖）、连通、单连通。`, gives: ["2.25", "2.26", "2.27"], next: R`有了连续映射，就能说两个空间"本质相同"。` },
  { sec: "2.4", title: "同胚与拓扑不变量", gist: R`同胚 = 双向连续的双射；拓扑不变量不同 ⇒ 不同胚；同伦型更粗；Euler 示性数 $\chi=V-E+F$ 与剖分无关，$\chi(X\sharp Y)=\chi(X)+\chi(Y)-2$，$\chi(\Sigma_g)=2-2g$。`, gives: ["2.28", "2.29", "2.30", "2.31", "2.33", "2.34"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "2.3", to: "2.5", label: R`等价类 → 商空间` },
  { from: "2.4", to: "2.5", label: R`群作用` },
  { from: "2.6", to: "2.7", label: "线性无关 → 基" },
  { from: "2.7", to: "2.8", label: "数基向量" },
  { from: "2.7", to: "2.9", label: "线性函数由基上取值决定" },
  { from: "2.9", to: "2.10", label: "选对偶基" },
  { from: "2.10", to: "2.12", label: R`$f=f_ie^{*i}$` },
  { from: "2.11", to: "2.12", label: "" },
  { from: "2.12", to: "2.13", label: "复合 $g\\circ f$" },
  { from: "2.14", to: "2.15", label: R`$V\cong V^*$` },
  { from: "2.15", to: "2.16", label: "分量" },
  { from: "2.15", to: "2.17", label: "定义伴随" },
  { from: "2.17", to: "2.18", label: "分量" },
  { from: "2.18", to: "2.19", label: R`对任意 $v,w$` },
  { from: "2.8", to: "2.21", label: R`用两次` },
  { from: "2.19", to: "2.21", label: R`$\operatorname{rank}f=\operatorname{rank}\tilde f$` },
  { from: "2.20", to: "2.19", label: R`复情形：$f^{\rm t}\to f^\dagger$` },
  { from: "2.22", to: "2.23", label: "张量积" },
  { from: "2.22", to: "2.24", label: "缩并" },
  { from: "2.25", to: "2.27", label: R`度量拓扑下检验连续性` },
  { from: "2.28", to: "2.29", label: R`求逆` },
  { from: "2.31", to: "2.33", label: R`定理 2.5` },
  { from: "2.32", to: "2.34", label: "" },
  { from: "2.33", to: "2.34", label: R`归纳` },
];
export const EQMAP_LABELS = {
  "2.3": "等价类", "2.4": R`$\mathrm{SL}(2,\mathbb{Z})$`, "2.5": "模变换",
  "2.6": "线性相关", "2.7": "基展开", "2.8": "维数公式", "2.9": "对偶空间", "2.10": "对偶基", "2.11": "对偶向量展开", "2.12": "配对", "2.13": "拉回",
  "2.14": R`$V\to V^*$`, "2.15": "内积", "2.16": "分量形式", "2.17": "伴随", "2.18": "伴随的分量", "2.19": R`$\tilde f=g^{-1}f^{\rm t}G^{\rm t}$`, "2.20": "复内积", "2.21": "玩具指标定理",
  "2.22": R`$(p,q)$ 型张量`, "2.23": "张量积", "2.24": "缩并",
  "2.25": "开球", "2.27": "不连续函数", "2.28": R`$D^2\cong\mathbb{R}^2$`, "2.29": "逆映射",
  "2.31": R`$\chi=V-E+F$`, "2.32": R`$S^2$ 是单位元`, "2.33": R`$T^2\sharp T^2=\Sigma_2$`, "2.34": R`$\Sigma_g$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "set", label: "集合与映射" },
  { id: "lin", label: "线性代数" },
  { id: "top", label: "拓扑" },
  { id: "inv", label: "同胚与不变量" },
];

export const concepts = [
  {
    id: "map", name_zh: "映射：单射、满射、双射", name_en: "Maps", icon: "➡️", section_id: "2.1.1", group: "set",
    plain: R`映射 = 定义域、值域与对应规则三者合在一起；双射才有逆映射。`,
    explain: R`$f:X\to Y$ 把每个 $x$ 对应到唯一的 $y$。单射：不同的点不撞车；满射：$Y$ 中没有被漏掉的点；双射：一一对应，存在 $f^{-1}$ 使 $f\circ f^{-1}=\mathrm{id}_Y$、$f^{-1}\circ f=\mathrm{id}_X$。若 $g\circ f=\mathrm{id}_X$，则 $f$ 单、$g$ 满（习题 2.3）。`,
    analogy: R`座位分配：单射 = 没有两个人坐同一个座位；满射 = 没有空座位；双射 = 恰好一人一座。`,
    book_example: { what: R`例 2.1：$\sin:\mathbb{R}\to\mathbb{R}$ 的像是 $[-1,1]$；换成 $\sin:\mathbb{C}\to\mathbb{C}$ 像就是整个 $\mathbb{C}$。`, point: "同一个公式，换了定义域和值域就是不同的映射。" },
    misconception: R`"$\exp x$ 是单射" 与 "$\exp x$ 是满射" 都不是关于公式本身的命题——取决于值域是 $\mathbb{R}$ 还是 $(0,\infty)$。`,
  },
  {
    id: "quotient", name_zh: "等价关系与商空间", name_en: "Equivalence relation & quotient space", icon: "🧵", section_id: "2.1.2", group: "set",
    plain: R`把"认为相同"的点归成一类，每一类当作一个点：这就是 $X/\sim$。`,
    explain: R`自反、对称、传递三条公理保证等价类两两不交、覆盖全集。几何上，商空间就是"粘合"：$\mathbb{R}/(x\sim x+2\pi n)=S^1$；正方形按不同方式粘对边得到柱面、Möbius 带、环面、Klein 瓶与 $\mathbb{R}\mathrm{P}^2$；把 $D^2$ 的边界粘成一点得到 $S^2$。群论里的陪集空间 $G/H$ 也是商空间。`,
    analogy: R`裁缝做衣服：一块布（正方形）按图纸把某些边缝在一起，缝法不同，得到的就是不同的形状。`,
    book_example: { what: R`例 2.5 与图 2.3–2.8。`, point: "同一个正方形，粘合方向不同，结果的拓扑就不同。" },
    misconception: R`商空间的"接近"关系变了：在 $\mathbb{R}$ 中 $\varepsilon$ 与 $2\pi-\varepsilon$ 相距很远，在 $S^1$ 上却很近。`,
  },
  {
    id: "linmap", name_zh: "线性映射与维数公式", name_en: "Linear maps & rank–nullity", icon: "📐", section_id: "2.2.2", group: "lin",
    plain: R`$\dim V=\dim\ker f+\dim\operatorname{im}f$：被压扁的维数加上保留下来的维数等于总维数。`,
    explain: R`线性映射保持加法与数乘。核 $\ker f$ 与像 $\operatorname{im}f$ 都是子空间。取核的基，再给像的每个基向量挑一个原像，合起来恰好是 $V$ 的基。线性映射是同构当且仅当它是双射；$V\to V$ 时这等价于 $\ker f=\{0\}$。`,
    analogy: R`把三维物体投影到墙上：沿投影方向（核）的信息丢失了，墙上的影子（像）保留了其余维数。`,
    book_example: { what: R`定理 2.1 与式 (2.8)。`, point: "它在第 3 章被用来证明 Euler–Poincaré 定理。" },
    misconception: R`维数公式里没有 $\dim W$：值域可以比像大得多。`,
  },
  {
    id: "dual", name_zh: "对偶空间与拉回", name_en: "Dual space & pullback", icon: "🔁", section_id: "2.2.3", group: "lin",
    plain: R`吃一个向量、吐一个数的线性函数也构成向量空间 $V^*$；映射 $f:V\to W$ 反方向诱导 $f^*:W^*\to V^*$。`,
    explain: R`对偶基 $e^{*i}(e_j)=\delta^i{}_j$；对偶向量 $f=f_ie^{*i}$ 作用在 $v=v^je_j$ 上给出 $f_iv^i$——行向量乘列向量。拉回 $f^*(g)=g\circ f$：要在 $V$ 上得到一个函数，先用 $f$ 把点送到 $W$，再用 $g$ 求值。$V$ 与 $V^*$ 同维数，但它们之间的同构**不是典范的**，要靠内积来选。`,
    analogy: R`量子力学里的 bra 与 ket：$\langle\psi|$ 吃掉 $|\phi\rangle$ 给出一个数。`,
    book_example: { what: R`图 2.9：拉回 $f^*(g)=g\circ f$。`, point: R`拉回与 $f$ 方向相反，这是第 5 章微分形式拉回的雏形。` },
    misconception: R`$f^*$ 不是 $f$ 的逆：即使 $f$ 不可逆，$f^*$ 也总有定义。`,
  },
  {
    id: "adjoint", name_zh: "内积、伴随与玩具指标定理", name_en: "Inner product, adjoint & toy index theorem", icon: "⚖️", section_id: "2.2.4", group: "lin",
    plain: R`有了内积就能定义伴随 $\tilde f$；$\dim\ker f-\dim\ker\tilde f=\dim V-\dim W$ 与 $f$ 无关。`,
    explain: R`内积就是选一个同构 $g:V\to V^*$（正定对称矩阵 $g_{ij}$）。伴随由 $G(w,fv)=g(v,\tilde fw)$ 定义，矩阵形式 $\tilde f=g^{-1}f^{\rm t}G^{\rm t}$；正交归一基下就是转置。由于左右乘可逆矩阵不改变秩，$\operatorname{rank}f=\operatorname{rank}\tilde f$，再用两次维数公式即得玩具指标定理。`,
    analogy: R`记账：$f$ 的"零模"个数与 $\tilde f$ 的"零模"个数各自会随 $f$ 变化，但它们的差像是"资产减负债"，只由两个空间的大小决定。`,
    book_example: { what: R`定理 2.2 与式 (2.21)。`, point: R`第 12 章：$\operatorname{ind}D=\dim\ker D-\dim\ker D^\dagger$ 是拓扑不变量。` },
    misconception: R`伴随依赖于内积的选取；但核的维数差不依赖。`,
  },
  {
    id: "tensor", name_zh: "张量", name_en: "Tensors", icon: "🧮", section_id: "2.2.5", group: "lin",
    plain: R`$(p,q)$ 型张量是吃 $p$ 个对偶向量、$q$ 个向量、吐出一个实数的多重线性映射。`,
    explain: R`$(0,1)$ 型是对偶向量，$(1,0)$ 型是向量；线性映射 $f:V\to W$ 是 $(1,1)$ 型张量（习题 2.12）。张量积把两个张量的变量并列、值相乘；缩并把一个上指标与一个下指标配对求和，把 $(p,q)$ 型变成 $(p-1,q-1)$ 型。`,
    analogy: R`多插口的机器：每个插口要么插向量，要么插对偶向量；每个插口单独看都是线性的。`,
    book_example: { what: R`式 (2.22)–(2.24)。`, point: R`度规 $g_{ij}$ 是 $(0,2)$ 型张量，曲率是 $(1,3)$ 型张量（第 7 章）。` },
    misconception: R`"张量 = 带指标的数组"只说对了一半：分量依赖于基，张量本身不依赖。`,
  },
  {
    id: "topology", name_zh: "拓扑空间与开集", name_en: "Topological space", icon: "🫧", section_id: "2.3.1", group: "top",
    plain: R`拓扑 = 规定哪些子集叫"开集"，要求任意并、有限交仍是开集。`,
    explain: R`开集刻画"接近"而不需要距离。度量 $d$ 用开球 $U_\varepsilon(x)$ 生成度量拓扑；子集继承相对拓扑。离散拓扑（所有子集都开）太细，平凡拓扑（只有 $\emptyset,X$）太粗。闭集 = 开集的补；闭包、内部、边界都由开集定义。Hausdorff：不同的点可以用不交的邻域分开。`,
    analogy: R`开集像"每个成员周围都留有余地的集合"：站在开集里的任何一点，稍微挪一点仍在集合里。`,
    book_example: { what: R`例 2.7、习题 2.15（Beatles 拓扑）。`, point: "同一集合上可以有许多拓扑。" },
    misconception: R`开和闭不是反义词：$\emptyset$ 与 $X$ 既开又闭；$[0,1)$ 在 $\mathbb{R}$ 中既不开也不闭。`,
  },
  {
    id: "continuity", name_zh: "连续映射", name_en: "Continuous map", icon: "〰️", section_id: "2.3.2", group: "top",
    plain: R`连续 = 开集的逆像是开集。`,
    explain: R`在通常拓扑下这就是 $\varepsilon$–$\delta$ 定义：$y$ 附近的小开区间拉回来，必须仍然包住每个原像点周围的一个小开区间。跳跃间断点处，某个开区间的逆像会出现"半开半闭"的端点（式 2.27）。`,
    analogy: R`连续 = "不撕裂"：像中靠近的点集，拉回去仍然是"不带硬边"的区域。`,
    book_example: { what: R`式 (2.27)：$f^{-1}((3/4,5/4))=(-1/4,0]$ 不是开集。`, point: "间断就体现在这个闭端点上。" },
    misconception: R`"把开集映成开集"不是连续性（习题 2.14：$x^2$ 把 $(-\varepsilon,\varepsilon)$ 映成 $[0,\varepsilon^2)$）。`,
  },
  {
    id: "compact", name_zh: "紧致", name_en: "Compactness", icon: "📦", section_id: "2.3.5", group: "top",
    plain: R`每个开覆盖都能抽出有限子覆盖；在 $\mathbb{R}^n$ 中等价于闭且有界。`,
    explain: R`紧致是"有限性"的拓扑版本。$(a,b)$ 不紧：$U_n=(a,b-1/n)$ 覆盖它却没有有限子覆盖。$S^n$、$[a,b]$、$T^2$ 紧致。物理上，有限体积或周期边界条件、单点紧化 $\mathbb{R}^n\cup\{\infty\}=S^n$ 都是为了得到紧致空间。`,
    analogy: R`紧致空间像一个"装得满"的盒子：无论怎样用开集去盖，有限块就够了，不会有一个边缘永远差一点盖不到。`,
    book_example: { what: R`例 2.11 与例 2.13(a)(b)。`, point: R`$[-1,1]$ 与 $(-1,1)$ 不同胚，因为一个紧致一个不紧致。` },
    misconception: R`有界不是拓扑不变量（$(-\pi/2,\pi/2)\cong\mathbb{R}$），但紧致是。`,
  },
  {
    id: "connected", name_zh: "连通、弧连通、单连通", name_en: "Connectedness", icon: "🔗", section_id: "2.3.6", group: "top",
    plain: R`连通：不能拆成两个不交的非空开集；弧连通：任意两点有路相连；单连通：任意闭路可缩成一点。`,
    explain: R`弧连通 ⇒ 连通。单连通比连通更细：$S^1$、$T^n$、$\mathbb{R}^2-\{0\}$ 连通但不单连通；$S^n$（$n\ge2$）、$\mathbb{R}^3-\{0\}$ 单连通。"能否缩成一点"在第 4 章被精确化为基本群 $\pi_1$。`,
    analogy: R`一根橡皮筋套在空间里：能不能在不离开空间的前提下把它收成一个点？`,
    book_example: { what: R`例 2.12 与例 2.13(c)(d)。`, point: R`抛物线连通、双曲线不连通，所以不同胚。` },
    misconception: R`连通不等于单连通：环面是连通的，但绕着环的闭路缩不掉。`,
  },
  {
    id: "homeo", name_zh: "同胚与拓扑不变量", name_en: "Homeomorphism & topological invariants", icon: "☕", section_id: "2.4.1", group: "inv",
    plain: R`同胚 = 连续、可逆、逆也连续；不变量不同 ⇒ 不同胚。`,
    explain: R`同胚是"不撕裂、不粘连"的橡皮变形，是一个等价关系。我们不知道同胚类的完全不变量集，只能用已知的不变量（紧致、连通、单连通、Euler 示性数、同调群……）去**否定**同胚。同伦型更粗：允许把空间"压扁"，如 $(0,1)$ 与一点同伦等价但不同胚。`,
    analogy: R`咖啡杯与甜甜圈：用橡皮泥可以把一个捏成另一个，不需要撕开或粘上。`,
    book_example: { what: R`图 2.10、例 2.13、例 2.14。`, point: "嵌入方式不是拓扑性质：相扣的两个环与分开的两个环同胚。" },
    misconception: R`不变量全都相同不能推出同胚——除非你手里有一套"完全的"不变量。`,
  },
  {
    id: "euler", name_zh: "Euler 示性数", name_en: "Euler characteristic", icon: "🔢", section_id: "2.4.4", group: "inv",
    plain: R`$\chi=V-E+F$，与剖分方式无关，是一个整数型的拓扑不变量。`,
    explain: R`四面体 $4-6+4=2$，立方体 $8-12+6=2$：都是 $S^2$。环面 $16-32+16=0$。用带粘合的正方形算更快：Klein 瓶 $1-2+1=0$，$\sym{RP}{\mathbb{R}\mathrm{P}^2}$ $2-2+1=1$。连通和 $\chi(X\sharp Y)=\chi(X)+\chi(Y)-2$ 给出 $\chi(\Sigma_g)=2-2g$。它只依赖于同伦型，所以一点与线段的 $\chi$ 相同。`,
    analogy: R`像会计里的"净值"：剖分得再细，增加的顶点、棱、面在交错和里总是互相抵消。`,
    book_example: { what: R`定义 2.10、例 2.15、定理 2.5。`, point: R`$\chi$ 区分 $S^1$ 与 $S^2$，却区分不了一点与线段。` },
    misconception: R`$\chi$ 不是"洞的个数"；它是 $b_0-b_1+b_2$ 这样的交错和（第 3 章）。`,
  },
];

export const relations = [
  { from: "map", to: "quotient", label: "投影 $x\\mapsto[x]$" },
  { from: "map", to: "linmap", label: "保持线性结构" },
  { from: "linmap", to: "dual", label: "线性函数" },
  { from: "dual", to: "adjoint", label: "内积 = $V\\to V^*$" },
  { from: "linmap", to: "adjoint", label: "维数公式" },
  { from: "dual", to: "tensor", label: "多重线性" },
  { from: "topology", to: "continuity", label: "逆像" },
  { from: "map", to: "continuity", label: "" },
  { from: "topology", to: "compact", label: "开覆盖" },
  { from: "topology", to: "connected", label: "" },
  { from: "continuity", to: "homeo", label: "双向连续" },
  { from: "quotient", to: "homeo", label: "粘合得到的空间" },
  { from: "compact", to: "homeo", label: "不变量" },
  { from: "connected", to: "homeo", label: "不变量" },
  { from: "homeo", to: "euler", label: "整数型不变量" },
  { from: "adjoint", to: "euler", label: "都是“指标”型的交错和" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**粘合 = 商空间**：等价关系把集合划分为等价类 $[a]=\{x\in X\mid x\sim a\}$，$X/\sim$ 把每一类看作一点。正方形粘对边：同向得柱面、反向得 Möbius 带；两对都同向得 $T^2$，一对反向得 Klein 瓶，两对都反向得 $\sym{RP}{\RP^2}$；$D^2/S^1=S^2$。`}</TxI>,
  <TxI>{R`**线性代数工具箱**：$\dim V=\dim\ker f+\dim\operatorname{im}f$；对偶基 $e^{*i}(e_j)=\delta^i{}_j$，拉回 $f^*(g)=g\circ f$；伴随 $\tilde f=g^{-1}f^{\rm t}G^{\rm t}$；玩具指标定理 $\dim\ker f-\dim\ker\tilde f=\dim V-\dim W$。`}</TxI>,
  <TxI>{R`**拓扑只用开集说话**：任意并、有限交；连续 = 开集的逆像是开集；紧致 = 每个开覆盖有有限子覆盖（$\mathbb{R}^n$ 中 ⇔ 闭且有界）；连通、弧连通、单连通依次更细。`}</TxI>,
  <TxI>{R`**同胚与不变量**：同胚是双向连续的双射；拓扑不变量不同 ⇒ 不同胚，但反之不成立。有界不是不变量：$(-\pi/2,\pi/2)\cong\mathbb{R}$，开圆盘 $\cong\mathbb{R}^2$。`}</TxI>,
  <TxI>{R`**Euler 示性数**：$\chi=V-E+F$ 与剖分无关；$\chi(S^2)=2$、$\chi(T^2)=\chi(\text{Klein})=0$、$\chi(\sym{RP}{\RP^2})=1$；$\chi(X\sharp Y)=\chi(X)+\chi(Y)-2$，$\chi(\Sigma_g)=2-2g$；它只依赖于同伦型。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`把正方形 $\{|x|\le1,|y|\le1\}$ 的左右边按 $(-1,y)\sim(1,y)$、上下边按 $(-x,-1)\sim(x,1)$ 粘合，得到什么？`,
    options: [R`环面 $T^2$`, R`Klein 瓶`, R`射影平面 $\sym{RP}{\RP^2}$`, R`球面 $S^2$`],
    answer: 1, why: R`一对边同向粘（柱面），另一对反向粘：把柱面两端的圆周反向粘起来，就是 Klein 瓶（图 2.5(a)）。粘合后 1 个顶点、2 条棱、1 个面，$\chi=0$；又有一对边同方向出现在边界字里，故不可定向。`,
  },
  {
    q: R`线性映射 $f:\mathbb{R}^5\to\mathbb{R}^3$ 的秩为 2。$\dim\ker f$ 与 $\dim\ker\tilde f$ 各是多少？`,
    options: [R`$3$ 与 $1$`, R`$2$ 与 $1$`, R`$3$ 与 $0$`, R`$2$ 与 $3$`],
    answer: 0, why: R`$\dim\ker f=5-2=3$；$\tilde f:\mathbb{R}^3\to\mathbb{R}^5$ 同样秩 2，$\dim\ker\tilde f=3-2=1$。差 $3-1=2=5-3$，正是玩具指标定理 \eqref{2.21}。`,
  },
  {
    q: R`下列哪一条**不是**拓扑空间公理所要求的？`,
    options: [R`$\emptyset$ 与 $X$ 是开集`, R`任意多个开集的并是开集`, R`任意多个开集的交是开集`, R`有限个开集的交是开集`],
    answer: 2, why: R`只要求**有限**交。$\bigcap_{n}(-1/n,1/n)=\{0\}$ 在通常拓扑下不是开集；若强行要求无限交封闭，单点集都成了开集，通常拓扑退化为离散拓扑（习题 2.13）。`,
  },
  {
    q: R`为什么 $[-1,1]$ 与 $S^1$ 不同胚？`,
    options: [R`一个紧致一个不紧致`, R`一个连通一个不连通`, R`去掉 $[-1,1]$ 的一个内点后不连通，去掉 $S^1$ 的任何一点后仍连通`, R`它们的 Euler 示性数都为 0`],
    answer: 2, why: R`两者都紧致、连通。例 2.13(d)：同胚把"去掉一点后的空间"也同胚地对应起来，而连通性是不变量。（另一个理由：$[-1,1]$ 单连通而 $S^1$ 不是。$\chi([-1,1])=1\neq0=\chi(S^1)$ 也能区分。）`,
  },
  {
    q: R`$\chi(T^2\sharp T^2\sharp T^2)$ 等于多少？`,
    options: [R`$0$`, R`$-2$`, R`$-4$`, R`$2$`],
    answer: 2, why: R`由定理 2.5 连用两次：$0+0-2=-2$，再 $-2+0-2=-4$；或直接用 $\chi(\Sigma_g)=2-2g$，$g=3$。`,
  },
  {
    q: R`一个点与一条闭线段 $[0,1]$：`,
    options: [R`同胚，因为 $\chi$ 相同`, R`不同胚，但同伦型相同，所以 $\chi$ 相同`, R`同伦型不同，$\chi$ 也不同`, R`同胚，因为都紧致连通`],
    answer: 1, why: R`去掉线段内点会断开，去掉"一点"空间的点就什么也不剩——两者不同胚（基数也不同）。但线段可以连续地缩成一点，同伦型相同，于是 $\chi=1$ 相同（例 2.16(b)）。`,
  },
];

export const BRIDGE = R`Euler 示性数是一个整数，它把"顶点、棱、面"的交错计数变成了拓扑不变量——但它丢掉了太多信息：一点与线段、$T^2$ 与 Klein 瓶，$\chi$ 都分不开。第 3 章把这套数法**升级为群**：给单形定向、定义边界算子 $\partial$，证明 $\partial^2=0$，再取"没有边界却又不是边界"的商 $H_r=\ker\partial_r/\operatorname{im}\partial_{r+1}$。本章的工具会全部用上：商群就是 §2.1.2 的商空间加上群结构（例 2.6），维数公式 \sref{T2.1} 是 Euler–Poincaré 定理的引擎，而 $\chi=\sum_r(-1)^rb_r$ 将解释为什么 $V-E+F$ 与剖分无关（\sref{T2.4}）。`;
