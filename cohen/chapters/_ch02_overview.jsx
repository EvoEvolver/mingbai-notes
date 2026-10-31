// 第 II 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一张照片有多少种「存法」？";
export const HOOK = R`同一张数码照片，可以存成逐个像素的亮度表（BMP），也可以存成一组余弦波的振幅（JPEG）。两份文件里的数字完全不同，却是同一张照片；而且 JPEG 之所以能压缩，正是因为在"余弦波基"里，大部分系数都接近零，可以截掉。

量子力学里的态也是这样。第 I 章把粒子写成波函数 $\psi(\mathbf r)$——那其实只是"逐点存储"的一种存法；把它换成平面波的振幅 $\bar\psi(\mathbf p)$，或换成盒中驻波的系数 $c_n$，描述的是同一个态。本章要做的，就是把"态本身"与"它在某组基下的数字"分开：态是一个抽象矢量 $\ket{\psi}$，基是我们选的坐标轴，波函数是分量，算符是矩阵，"换表象"就是换坐标轴。再往前一步：测量对应的算符（可观测量）自带一组特别好的坐标轴——它的本征基；而把几个对易的可观测量放在一起，就能给每个态贴上一组不重复的"量子数标签"。最后，两个系统合在一起时，它们的态空间不是相加而是相乘（张量积）——"纠缠"就从这里来。`;

export const ROADMAP = [
  { sec: "A", title: "波函数构成矢量空间", gist: R`$\mathscr F$ 有标量积 $(\varphi,\psi)$、线性算符与对易子；按正交归一基展开 $\psi=\sum c_iu_i$，分量是标量积；封闭关系保证基"不缺方向"；平面波与 $\delta$ 函数是"连续基"。`, gives: ["A-4", "A-17", "A-21", "A-32", "A-41", "A-57"], next: R`既然函数只是分量，就该直接对"矢量本身"运算。` },
  { sec: "B", title: "Dirac 记号：右矢、左矢、算符", gist: R`态 = 右矢 $\ket{\psi}$；线性泛函 = 左矢 $\bra{\chi}$；$\ket{\psi}\bra{\varphi}$ 是算符（投影算符）；厄米共轭 $A^\dagger$ 的规则：取共轭并倒序。`, gives: ["B-4", "B-32", "B-47", "B-49", "B-55", "B-60"], next: R`有了抽象运算，再选一组基把它们变成数。` },
  { sec: "C", title: "表象：矢量变列、算符变矩阵", gist: R`两条关系（正交归一、$\sum\ket{u_i}\bra{u_i}=\mathbb 1$）足以导出一切表象公式；换基由幺正矩阵 $S$ 实现，$A\to S^\dagger AS$。`, gives: ["C-9", "C-30", "C-37", "C-49", "C-56"], next: R`哪组基最好？让算符变成对角矩阵的那组。` },
  { sec: "D", title: "本征值问题与可观测量", gist: R`久期方程求本征值；厄米算符本征值实、本征矢正交；本征矢完备者称可观测量，$A=\sum a_nP_n$；对易可观测量有共同本征基，CSCO 给出唯一标签。`, gives: ["D-14", "D-30", "D-35", "D-36-b", "D-48", "D-58"], next: R`用最重要的两个可观测量——位置和动量——来演示这一切。` },
  { sec: "E", title: "位置表象与动量表象", gist: R`$\psi(\mathbf r)=\braket{\mathbf r|\psi}$，$\bar\psi(\mathbf p)=\braket{\mathbf p|\psi}$，$\braket{\mathbf r|\mathbf p}$ 是平面波；位置表象中 $\mathbf P=\frac\hbar i\boldsymbol\nabla$，$[R_i,P_j]=i\hbar\delta_{ij}$。`, gives: ["E-5", "E-8-a", "E-16", "E-26", "E-30"], next: R`三维空间是三个一维的"乘积"——这需要张量积。` },
  { sec: "F", title: "张量积", gist: R`$\mathscr E_1\otimes\mathscr E_2$ 的基是乘积基，维数相乘；一般矢量不是乘积（纠缠）；$A(1)+B(2)$ 的本征值相加；CSCO 可以拼接。`, gives: ["F-7", "F-12", "F-30", "F-38", "F-49", "F-55"] },
];

export const EQMAP = [
  { from: "A-4", to: "A-21", label: "与基函数作标量积" },
  { from: "A-18", to: "A-21", label: "正交归一筛选" },
  { from: "A-21", to: "A-32", label: "代回展开式" },
  { from: "A-32", to: "A-57", label: R`$\sum_i\to\int\dd\alpha$` },
  { from: "A-41", to: "A-57", label: "平面波为例" },
  { from: "A-4", to: "B-4", label: "标量积定义左矢" },
  { from: "B-4", to: "B-32", label: "反序并排成算符" },
  { from: "B-4", to: "B-47", label: "右矢↔左矢对应" },
  { from: "B-47", to: "B-49", label: "取复共轭" },
  { from: "B-32", to: "C-9", label: "投影到全空间" },
  { from: "C-9", to: "C-30", label: "插入 $\\mathbb 1$" },
  { from: "B-49", to: "C-37", label: "取矩阵元" },
  { from: "C-9", to: "C-56", label: "两边插入 $\\mathbb 1$" },
  { from: "C-30", to: "D-14", label: "齐次方程有解" },
  { from: "C-37", to: "D-30", label: "厄米" },
  { from: "D-30", to: "D-35", label: "完备 ⇒ 可观测量" },
  { from: "D-35", to: "D-36-b", label: "谱分解" },
  { from: "D-30", to: "D-48", label: "对易" },
  { from: "D-48", to: "D-58", label: "子空间内再对角化" },
  { from: "A-41", to: "E-16", label: "平面波 = 变换矩阵" },
  { from: "E-16", to: "E-26", label: "Fourier 积分求导" },
  { from: "E-26", to: "E-30", label: "莱布尼茨法则" },
  { from: "A-17", to: "E-30", label: R`乘 $\hbar/i$` },
  { from: "D-58", to: "F-30", label: R`$C=A(1)+B(2)$` },
  { from: "F-7", to: "F-55", label: "乘积态 = 无关联" },
];
export const EQMAP_LABELS = {
  "A-4": "标量积", "A-17": R`$[X,D_x]=-1$`, "A-18": "正交归一", "A-21": "分量公式", "A-32": "封闭关系", "A-41": "平面波正交归一", "A-57": "连续基封闭",
  "B-4": "左矢", "B-32": "投影算符", "B-47": R`$A^\dagger$ 定义`, "B-49": R`$A^\dagger$ 矩阵元`, "C-9": R`$\sum\ket{u_i}\bra{u_i}=\mathbb 1$`, "C-30": "矩阵乘列",
  "C-37": "转置共轭", "C-56": "换基", "D-14": "久期方程", "D-30": "本征矢正交", "D-35": "可观测量", "D-36-b": "谱分解", "D-48": "分块对角", "D-58": "共同本征矢",
  "E-16": R`$\braket{\mathbf r|\mathbf p}$`, "E-26": R`$\mathbf P=\frac\hbar i\nabla$`, "E-30": "正则对易", "F-7": "一般矢量", "F-30": "本征值相加", "F-55": "无关联态",
};

export const groups = [
  { id: "space", label: "空间与基" },
  { id: "dirac", label: "Dirac 记号与算符" },
  { id: "obs", label: "本征值与可观测量" },
  { id: "comp", label: "复合系统" },
];

export const concepts = [
  {
    id: "hilbert", name_zh: "波函数空间", name_en: "Wave function space", icon: "🧺", section_id: "A", group: "space",
    plain: "所有'像样的'平方可积函数组成的矢量空间，带有标量积。",
    explain: R`波函数可以相加、可以乘复数，结果仍是合法的波函数（平方可积性在叠加下保持）——所以它们构成矢量空间 $\mathscr F$。再配上标量积 $(\varphi,\psi)=\int\varphi^*\psi$，就有了"长度"和"夹角"。

物理上我们只保留足够光滑、处处有定义的函数，于是 $\mathscr F$ 比数学上的 $L^2$ 小一些；这个细节在本书中故意不深究。`,
    analogy: "像三维空间里的箭头：能相加、能拉伸、能量长度和夹角——只是这里的'箭头'是整个函数，坐标轴有无穷多根。",
    book_example: { what: R`(A-2)–(A-3)：两个平方可积函数的线性组合仍平方可积。`, point: "叠加原理在数学上之所以能成立，是因为波函数构成矢量空间。" },
    misconception: "标量积不是对称的：$(\\varphi,\\psi)=(\\psi,\\varphi)^*$，左边的函数要取复共轭。",
  },
  {
    id: "basis", name_zh: "正交归一基与分量", name_en: "Orthonormal basis & components", icon: "📐", section_id: "A-2", group: "space",
    plain: "选一组互相垂直的单位'坐标轴函数'，任何波函数都变成一串数。",
    explain: R`若 $(u_i,u_j)=\delta_{ij}$ 且每个 $\psi$ 都能唯一写成 $\sum c_iu_i$，$\{u_i\}$ 就是正交归一基。分量由标量积给出：$c_i=(u_i,\psi)$；标量积化为 $\sum b_i^*c_i$，范数平方化为 $\sum|c_i|^2$。

同一个函数换一组基，分量就变；函数本身不变。`,
    analogy: "同一首曲子可以记成时间上的波形，也可以记成各个音符（频率）的强度——两份记录，一首曲子。",
    book_example: { what: R`(A-19)–(A-27) 与三维矢量公式 (A-22)–(A-28) 的逐条对照。`, point: "积分 $\\int\\varphi^*\\psi$ 可以换成数列的'点积'。" },
    misconception: "正交归一的函数组不一定是基——可能'缺方向'，需要封闭关系来检验。",
  },
  {
    id: "closure", name_zh: "封闭关系", name_en: "Closure relation", icon: "🔒", section_id: "C-2", group: "space",
    plain: R`各基矢方向的投影加起来等于单位算符：$\sum_i\ket{u_i}\bra{u_i}=\mathbb 1$。`,
    explain: R`封闭关系表达"基是完备的"：把任何矢量投影到所有基矢方向再加起来，原封不动。在波函数语言里它写成 $\sum_iu_i(\mathbf r)u_i^*(\mathbf r')=\delta(\mathbf r-\mathbf r')$。

它是表象计算的万能钥匙：在任何地方插入 $\mathbb 1$，分量、矩阵乘法、换基公式就自动出现。`,
    analogy: "把一束光用棱镜分成所有颜色，再全部合回去，还是原来的白光；少了一种颜色就合不回来。",
    book_example: { what: R`(C-15)：三维空间中 $P_1+P_2+P_3=\mathbb 1$，而 $P_1+P_2\neq\mathbb 1$。`, point: "正交归一管'不重叠'，封闭关系管'不遗漏'。" },
    misconception: "封闭关系不是正交归一关系的推论，需要单独成立。",
  },
  {
    id: "continuous_basis", name_zh: "连续基与广义右矢", name_en: "Continuous bases", icon: "🌊", section_id: "A-3", group: "space",
    plain: "平面波和 $\delta$ 函数不能归一化，却能当作'坐标轴'来展开任何波函数。",
    explain: R`平面波 $v_{\mathbf p}$ 和 $\delta$ 函数 $\xi_{\mathbf r_0}$ 不平方可积，但满足 Dirac 意义下的正交归一 $\delta(\mathbf p-\mathbf p')$ 与封闭关系。把求和换成积分、Kronecker $\delta$ 换成 Dirac $\delta$，离散基的公式全部照搬。

对应的 $\ket{\mathbf p}$、$\ket{\mathbf r}$ 是"广义右矢"：好用的计算中介，但不是物理态。`,
    analogy: "理想单色光：光学计算离不开它，但没有任何激光器能造出严格单色的光。",
    book_example: { what: R`(A-52)：$\psi(\mathbf r_0)=(\xi_{\mathbf r_0},\psi)$——函数值本身就是一种分量。`, point: "波函数 $\psi(\mathbf r)$ 只是态在位置基下的分量。" },
    misconception: "不能把 $\ket{\mathbf r_0}$ 当作'粒子正好在 $\mathbf r_0$'的物理态——它不可归一。",
  },
  {
    id: "ket_bra", name_zh: "右矢与左矢", name_en: "Kets and bras", icon: "🔤", section_id: "B-2", group: "dirac",
    plain: "态是右矢；'和某个态作标量积'这台机器是左矢。",
    explain: R`右矢 $\ket{\psi}$ 是态空间 $\mathscr E$ 的元素；左矢 $\bra{\chi}$ 是 $\mathscr E$ 上的线性泛函，它把右矢变成数 $\braket{\chi|\psi}$。每个右矢 $\ket{\varphi}$ 对应左矢 $\bra{\varphi}$，对应是反线性的：$\lambda\ket{\varphi}\to\lambda^*\bra{\varphi}$。

Dirac 记号的核心规则是"并排书写"：左矢在左、右矢在右是数；右矢在左、左矢在右是算符。`,
    analogy: "右矢像一份文件，左矢像一台'打分机'：插进文件，吐出一个分数。",
    book_example: { what: R`(B-14)–(B-22)：$\bra{\xi_{x_0}}$ 与 $\bra{v_{p_0}}$ 是存在的左矢，却没有真正的右矢与之对应。`, point: "无穷维中左右矢的对称性需要靠'广义右矢'来恢复。" },
    misconception: R`$\bra{\lambda\psi}=\lambda^*\bra{\psi}$，不是 $\lambda\bra{\psi}$。`,
  },
  {
    id: "projector", name_zh: "投影算符", name_en: "Projector", icon: "🔦", section_id: "B-3", group: "dirac",
    plain: R`$P_\psi=\ket{\psi}\bra{\psi}$ 取出任意矢量沿 $\ket{\psi}$ 的分量。`,
    explain: R`$P_\psi\ket{\varphi}=\ket{\psi}\braket{\psi|\varphi}$；投影两次等于一次，$P^2=P$；它是厄米的，本征值只有 1 和 0。投影到子空间：$P_q=\sum_{i\le q}\ket{\varphi_i}\bra{\varphi_i}$；$q$ 等于全空间维数时就是封闭关系。`,
    analogy: "正午的影子：物体在地面上的投影；再投影一次，影子不变。",
    book_example: { what: R`(D-40)–(D-42)：任何矢量都能拆成沿 $\ket\psi$ 与垂直于 $\ket\psi$ 两部分，所以 $P_\psi$ 是可观测量。`, point: "第 III 章中投影算符将描述'测量后态的坍缩'。" },
    misconception: "投影算符不可逆（除了单位算符），信息在投影中丢失了。",
  },
  {
    id: "adjoint", name_zh: "厄米共轭与厄米算符", name_en: "Adjoint & Hermitian operators", icon: "🪞", section_id: "B-4", group: "dirac",
    plain: R`$A^\dagger$ 是 $A$ 在'左矢世界'的镜像；$A=A^\dagger$ 时称厄米。`,
    explain: R`定义：$A\ket\psi=\ket{\psi'}\iff\bra\psi A^\dagger=\bra{\psi'}$，等价于 $\bra\psi A^\dagger\ket\varphi=\bra\varphi A\ket\psi^*$。规则：常数取共轭、右矢左矢互换、算符取伴随、次序颠倒，如 $(AB)^\dagger=B^\dagger A^\dagger$。

在矩阵语言里，伴随就是转置再取复共轭；厄米矩阵的对角元为实数。`,
    analogy: "照镜子：左右颠倒、顺序反转——先穿袜子后穿鞋，脱的时候先脱鞋。",
    book_example: { what: R`(E-32)–(E-33)：$\partial/\partial x$ 不厄米，$\frac\hbar i\partial/\partial x$ 厄米。`, point: "动量算符里的 $i$ 不是装饰，是厄米性必需的。" },
    misconception: "两个厄米算符的乘积不一定厄米，除非它们对易。",
  },
  {
    id: "representation", name_zh: "表象与表象变换", name_en: "Representations", icon: "🗺️", section_id: "C", group: "dirac",
    plain: "选定基后：右矢 = 列矩阵，左矢 = 行矩阵，算符 = 方阵；换基用幺正矩阵。",
    explain: R`$A_{ij}=\bra{u_i}A\ket{u_j}$；$\ket{\psi'}=A\ket\psi$ 化为 $c'_i=\sum_jA_{ij}c_j$；$\bra\varphi A\ket\psi=\sum b_i^*A_{ij}c_j$。换基矩阵 $S_{ik}=\braket{u_i|t_k}$ 是幺正的，算符矩阵按 $S^\dagger AS$ 变换。`,
    analogy: "同一张地图可以用经纬度，也可以用 UTM 坐标；两套坐标之间有固定的换算表。",
    book_example: { what: R`(E-16)–(E-18)：位置表象与动量表象之间的变换矩阵就是平面波，变换就是 Fourier 变换。`, point: "Fourier 变换不是额外的数学技巧，而是一次换基。" },
    misconception: "换表象不改变物理：本征值、标量积、迹都与表象无关。",
  },
  {
    id: "eigen", name_zh: "本征值与本征矢", name_en: "Eigenvalues & eigenvectors", icon: "🎯", section_id: "D-1", group: "obs",
    plain: R`$A\ket\psi=\lambda\ket\psi$：算符只把这个矢量拉伸，不改方向。`,
    explain: R`有限维时，本征值是久期方程 $\mathrm{Det}[\mathscr A-\lambda I]=0$ 的根。属于同一本征值的本征矢构成本征子空间，其维数为简并度。一般算符可能本征矢不够而不能对角化；厄米算符总能对角化，且简并度等于根的重数。`,
    analogy: "揉面团时，有些方向只被拉长而不被扭转——那就是'本征方向'。",
    book_example: { what: R`(D-7)：投影算符的本征值是 1（单重）和 0（无穷重简并）。`, point: "简并 = 同一个本征值对应不止一个方向。" },
    misconception: "本征矢只定到一个常数因子；即使归一化，也还有一个整体相位不确定。",
  },
  {
    id: "observable", name_zh: "可观测量与谱分解", name_en: "Observable & spectral decomposition", icon: "🔭", section_id: "D-2", group: "obs",
    plain: "本征矢构成完备基的厄米算符；它可以写成本征值乘投影算符之和。",
    explain: R`厄米算符的本征值是实数，属于不同本征值的本征矢正交；若全部本征矢还构成基（$\sum_{n,i}\ket{\psi_n^i}\bra{\psi_n^i}=\mathbb 1$），就称为可观测量，并且 $A=\sum_na_nP_n$。

无穷维时"完备"不是自动成立的，所以需要这个单独的概念。$\mathbf R$、$\mathbf P$、投影算符都是可观测量。`,
    analogy: "一台完美的分拣机：每种'读数'有自己的出口（本征子空间），所有出口加起来覆盖全部输入。",
    book_example: { what: R`(D-36-b)：$A=\sum_na_nP_n$。`, point: "知道谱和本征子空间，就完全知道了这个算符。" },
    misconception: "厄米 $\neq$ 可观测量；无穷维中还要求本征矢完备。",
  },
  {
    id: "csco", name_zh: "对易可观测量完全集（CSCO）", name_en: "Complete set of commuting observables", icon: "🏷️", section_id: "D-3", group: "obs",
    plain: "一组两两对易的可观测量，其本征值组合唯一确定一个基矢。",
    explain: R`对易的可观测量有共同本征基（定理 III）。若单个可观测量有简并，就再加一个与之对易的，用新的本征值区分简并子空间中的矢量，直到每组本征值 $(a_n,b_p,\dots)$ 只对应一个基矢。

CSCO 不唯一：$\{X,Y,Z\}$、$\{P_x,P_y,P_z\}$、$\{X,P_y,P_z\}$ 都是 $\mathscr E_{\mathbf r}$ 中的 CSCO。`,
    analogy: "找人：只说'姓张'不够，再加'住北京'、'1990 年生'……直到只剩一个人。",
    book_example: { what: R`§E-2-d：$X$ 在 $\mathscr E_x$ 中单独是 CSCO，在 $\mathscr E_{\mathbf r}$ 中却无穷重简并。`, point: "是否'完全'取决于态空间。" },
    misconception: "不要求每个可观测量自己非简并；只要求本征值的组合不重复。",
  },
  {
    id: "canonical", name_zh: "正则对易关系", name_en: "Canonical commutation relations", icon: "⚖️", section_id: "E-2", group: "obs",
    plain: R`$[R_i,P_j]=i\hbar\delta_{ij}$：位置与同方向动量不对易。`,
    explain: R`在位置表象中 $X$ 是乘以 $x$，$P_x$ 是 $\frac\hbar i\partial_x$；对任意波函数，$xP_x\psi-P_x(x\psi)=i\hbar\psi$。数学上它就是 §A 的 $[X,D_x]=-1$ 乘以 $\hbar/i$。

它是不确定关系的根源，也决定了 $X$、$P_x$ 不可能有共同本征基。`,
    analogy: "先量长度再量宽度和反过来顺序一样；但'先乘 $x$ 再求导'和'先求导再乘 $x$'差一项——量子力学里位置和动量就是这样一对。",
    book_example: { what: R`(E-28)：在位置表象中逐行算出 $[X,P_x]=i\hbar$。`, point: "对易关系与表象无关，但在位置表象中最容易计算。" },
    misconception: R`不同方向的位置与动量是对易的：$[X,P_y]=0$。`,
  },
  {
    id: "tensor", name_zh: "张量积与纠缠", name_en: "Tensor product & entanglement", icon: "🔗", section_id: "F", group: "comp",
    plain: "复合系统的态空间是各部分态空间的张量积；维数相乘。",
    explain: R`$\mathscr E_1\otimes\mathscr E_2$ 的基是 $\ket{u_i(1)}\ket{v_l(2)}$；乘积矢量的分量是 $a_ib_l$，但一般矢量 $\sum c_{il}\ket{u_i}\ket{v_l}$ 的系数不能分解——这样的态称为纠缠态。分属两部分的算符对易，$A(1)+B(2)$ 的本征值是 $a_n+b_p$。

三维粒子 $=$ 三个一维的张量积；两粒子系统 $=$ 两个单粒子空间的张量积。`,
    analogy: "两个骰子的结果表是 $6\times6$ 的格子（不是 $6+6$）；大多数概率分布不能写成'两个骰子各自分布的乘积'——那就是关联。",
    book_example: { what: R`(F-55)：乘积态的波函数可分解为 $\psi_1(\mathbf r_1)\psi_2(\mathbf r_2)$，两粒子无关联。`, point: "不能分解的态描述的是有关联的两粒子。" },
    misconception: R`$\ket\psi\ket\varphi$（两个同一空间的右矢）在 $\mathscr E$ 中没有定义，它属于 $\mathscr E\otimes\mathscr E$。`,
  },
];

export const relations = [
  { from: "hilbert", to: "basis", label: "选坐标轴" },
  { from: "basis", to: "closure", label: "检验完备" },
  { from: "basis", to: "continuous_basis", label: "求和→积分" },
  { from: "hilbert", to: "ket_bra", label: "抽象化" },
  { from: "ket_bra", to: "projector", label: "反序并排" },
  { from: "ket_bra", to: "adjoint", label: "共轭对应" },
  { from: "projector", to: "closure", label: "投影到全空间" },
  { from: "closure", to: "representation", label: "插入单位算符" },
  { from: "adjoint", to: "observable", label: "厄米" },
  { from: "eigen", to: "observable", label: "本征矢完备" },
  { from: "representation", to: "eigen", label: "久期方程" },
  { from: "observable", to: "csco", label: "对易+完全" },
  { from: "continuous_basis", to: "canonical", label: "r、p 表象" },
  { from: "csco", to: "tensor", label: "CSCO 拼接" },
];

export const TAKEAWAYS = [
  R`**态是矢量，波函数是分量。**$\psi(\mathbf r)=\braket{\mathbf r|\psi}$、$\bar\psi(\mathbf p)=\braket{\mathbf p|\psi}$、$c_i=\braket{u_i|\psi}$ 地位平等；Fourier 变换就是换基。`,
  R`**两条关系管全部计算：**$\braket{u_i|u_j}=\delta_{ij}$ 与 $\sum_i\ket{u_i}\bra{u_i}=\mathbb 1$。需要什么公式，就在合适的地方插入 $\mathbb 1$。`,
  R`**Dirac 记号的语法：**并排即运算；$\braket{\varphi|\psi}$ 是数，$\ket\psi\bra\varphi$ 是算符；取厄米共轭时常数取共轭、次序颠倒。`,
  R`**可观测量 = 本征矢完备的厄米算符**：本征值实、本征矢正交、$A=\sum a_nP_n$；对易的可观测量可同时对角化，CSCO 给每个基矢一组唯一的量子数。`,
  R`**位置与动量**：$\mathbf P=\frac\hbar i\boldsymbol\nabla$（位置表象），$[R_i,P_j]=i\hbar\delta_{ij}$；复合系统用张量积，非乘积态即纠缠态。`,
];

export const QUIZ = [
  {
    q: R`同一个态在 $\{\ket{u_i}\}$ 基中的分量 $c_i$ 与它的波函数值 $\psi(\mathbf r_0)$ 是什么关系？`,
    options: [R`$c_i$ 是近似，$\psi(\mathbf r_0)$ 才是"真的"`, R`二者都是同一右矢的分量，只是相对于不同的基（$\ket{u_i}$ 与 $\ket{\mathbf r_0}$）`, R`$c_i=\psi(\mathbf r_i)$`, R`只有平方可积的基才能给出分量`],
    answer: 1, why: R`由 (E-8-a)，$\psi(\mathbf r_0)=\braket{\mathbf r_0|\psi}$，与 $c_i=\braket{u_i|\psi}$ 完全同类；表 (II-5) 把它们并列。`,
  },
  {
    q: R`$R^3$ 中两个正交的单位矢 $\mathbf e_1,\mathbf e_2$ 满足正交归一关系，它们构成 $R^3$ 的基吗？`,
    options: ["构成，因为正交归一", R`不构成：$P_1+P_2\neq\mathbb 1$，封闭关系不成立`, "构成，只要再归一化一次", "取决于选哪个坐标系"],
    answer: 1, why: R`正交归一只说明"不重叠"；$(P_1+P_2)\mathbf e_3=0$ 说明缺了一个方向，见 (C-15) 后的讨论。`,
  },
  {
    q: R`$\ket{\psi}$ 是 $A$ 的本征矢，本征值 $\lambda$。若 $A$ 不是厄米的，关于 $\bra\psi A$ 能说什么？`,
    options: [R`$\bra\psi A=\lambda\bra\psi$`, R`$\bra\psi A=\lambda^*\bra\psi$`, R`一般什么也说不出；能确定的是 $\bra\psi A^\dagger=\lambda^*\bra\psi$`, R`$\bra\psi A=0$`],
    answer: 2, why: R`对 (D-1) 取厄米共轭得 (D-8)，涉及的是 $A^\dagger$；只有 $A$ 厄米时才有 (D-25)。`,
  },
  {
    q: R`$A$ 有一个二重简并本征值，$B$ 与 $A$ 对易。下面哪个说法一定正确？`,
    options: [R`$A$ 的任何本征矢都是 $B$ 的本征矢`, R`$B$ 把该二维本征子空间映入自身，可以在其中选出 $A$、$B$ 的共同本征矢`, R`$B$ 必然也有简并`, R`$A$ 与 $B$ 构成 CSCO`],
    answer: 1, why: R`定理 I'：对易时 $A$ 的本征子空间在 $B$ 下整体不变；在其中对角化 $B$ 的 $2\times2$ 块即得共同本征矢 (D-57)。`,
  },
  {
    q: R`为什么动量算符写成 $\frac{\hbar}{i}\frac{\partial}{\partial x}$ 而不是 $\hbar\frac{\partial}{\partial x}$？`,
    options: ["只是习惯", R`分部积分使 $\partial/\partial x$ 反厄米；乘以 $1/i$ 才得到厄米算符（实本征值）`, "为了让平面波可以归一化", R`为了让 $[X,P_x]=-1$`],
    answer: 1, why: R`见 (E-32)–(E-33)：边界项为零后多出一个负号，$(1/i)^*=-1/i$ 正好把它抵消。`,
  },
  {
    q: R`两比特态 $\ket\psi=\frac{1}{\sqrt2}(\ket0\ket1+\ket1\ket0)$ 能否写成 $\ket{\varphi(1)}\ket{\chi(2)}$？`,
    options: ["能，取两个叠加态的乘积", R`不能：系数矩阵行列式 $-\frac12\neq0$，Schmidt 秩为 2`, "能，因为它是归一化的", "取决于选哪组基"],
    answer: 1, why: R`乘积态的系数 $c_{il}=a_ib_l$ 构成秩 1 矩阵，行列式为零；这里 $\det=-\frac12$。这正是 (F-31) 所说"不是张量积的本征矢"的例子。`,
  },
];

export const BRIDGE = R`工具已经备齐：态是 $\mathscr E$ 中的矢量，可观测量是本征矢完备的厄米算符，表象是基的选择，复合系统用张量积。第 III 章将把这些数学对象与物理一一对接：第一条假设说态由 $\mathscr E$ 中的右矢描述；测量结果只能是可观测量的本征值，得到 $a_n$ 的概率是 $\bra\psi P_n\ket\psi$；测量后态被投影到 $P_n\ket\psi$；时间演化由哈密顿量生成。本章的谱分解、投影算符和正则对易关系，将分别变成概率规则、"坍缩"规则和不确定关系。（本章的补充材料——Schwarz 不等式、幺正算符、算符函数、宇称算符、求解实例——见下一页。）`;
