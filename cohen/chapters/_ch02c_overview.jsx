// 第 II 章补充材料：高层理解层（开场、阅读指南、路线图、推导图、核心概念、小结与自测）。
const R = String.raw;

export const HOOK_TITLE = "同一个 $\\mathrm e^{-i\\lambda P/\\hbar}$，四种身份";
export const HOOK = R`把一个波函数整体往右挪 $\lambda$——最朴素的操作。可是在量子力学里，完成这件事的算符 $\mathrm e^{-i\lambda P/\hbar}$ 同时扮演了好几个角色：它是一个**算符函数**（指数怎么作用在算符上？$\mathrm B_{\rm II}$），它是**幺正的**（为什么挪动不改变概率？$\mathrm C_{\rm II}$），它的"生成元"$P$ 在位置表象里恰好是 $\frac\hbar i\frac{\mathrm d}{\mathrm dx}$（$\mathrm D_{\rm II}$、$\mathrm E_{\rm II}$），而所有这些性质追根到底只来自一行 $[X,P]=i\hbar$——甚至这一行就足以证明态空间必须是无穷维的（$\mathrm E_{\rm II}$）。

把"挪动"换成"镜像反射"，就得到宇称算符 $\Pi$（$\mathrm F_{\rm II}$）：它告诉我们为什么对称势阱的定态非奇即偶、为什么原子的电偶极跃迁只发生在宇称相反的能级之间。把一维换成二维，张量积让正方形势阱的问题一下子拆成两个已知的一维问题，还顺便揭示了能级简并的两种来源（$\mathrm G_{\rm II}$）。

这一组补充材料就是第 II 章正文的"工具箱与练习场"：没有新的物理假设，只是把正文给出的数学语言磨利、用熟。`;

// ---------- 阅读指南（用自己的话：定位、前置、难度） ----------
export const GUIDE = [
  { sec: "AII", name: R`$\mathrm A_{\rm II}$ Schwarz 不等式`, role: R`一条基础不等式，保证"夹角"与"概率 $\le1$"有意义；以后推不确定关系要用。`, pre: R`正文 §B（标积）`, level: "入门 · 一页" },
  { sec: "BII", name: R`$\mathrm B_{\rm II}$ 线性算符的有用性质`, role: R`工具箱：迹、对易子、子空间上的限制、算符函数、算符求导、Glauber 公式。全书反复引用，建议先通读、以后当手册查。`, pre: R`正文 §B–§C`, level: "入门 · 必读（尤其 §4、§5）" },
  { sec: "CII", name: R`$\mathrm C_{\rm II}$ 幺正算符`, role: R`"复空间里的转动"：保持标积 $\iff$ 把正交归一基变成正交归一基；算符的幺正变换；无穷小幺正算符与生成元。`, pre: R`正文 §B–§D，$\mathrm B_{\rm II}$`, level: "入门 · 推荐" },
  { sec: "DII", name: R`$\mathrm D_{\rm II}$ $\{\ket{\mathbf r}\}$、$\{\ket{\mathbf p}\}$ 表象`, role: R`把正文 §E 算到底：$\mathbf R$、$\mathbf P$ 及其函数在两个表象中的矩阵元；两个表象中的 Schrödinger 方程。`, pre: R`正文 §E；附录 II（$\delta$ 函数）`, level: "中等 · 读完正文即可读" },
  { sec: "EII", name: R`$\mathrm E_{\rm II}$ 对易子为 $i\hbar$ 的 $Q$、$P$`, role: R`更抽象的视角：只从 $[Q,P]=i\hbar$ 推出连续谱、平移算符、$\frac\hbar i\frac{\mathrm d}{\mathrm dq}$ 与 Fourier 变换。可以留到以后再读。`, pre: R`$\mathrm B_{\rm II}$ §4-c，$\mathrm C_{\rm II}$`, level: "稍难 · 可后读" },
  { sec: "FII", name: R`$\mathrm F_{\rm II}$ 宇称算符`, role: R`本身很重要，又是第 II 章全部概念的一次完整演练：投影算符、可观测量、幺正变换、对易与选择定则。强烈推荐。`, pre: R`正文 §B–§D，$\mathrm C_{\rm II}$ §2`, level: "中等 · 强烈推荐" },
  { sec: "GII", name: R`$\mathrm G_{\rm II}$ 二维无限深势阱`, role: R`张量积（正文 §F）的一道"带解答的例题"；顺带区分系统简并与偶然简并。`, pre: R`正文 §F；\Ic{HI} 一维无限深势阱`, level: "入门 · 例题" },
  { sec: "HII", name: R`$\mathrm H_{\rm II}$ 习题`, role: R`12 题；第 11、12 题（原书附解答）专练对易可观测量与 C.S.C.O.，最好在读正文 §D-3 时同步做。`, pre: R`正文全章`, level: "练习" },
];

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "AII", title: "Schwarz 不等式", gist: R`$\ket\psi=\ket{\varphi_1}+\lambda\ket{\varphi_2}$ 的模方 $\ge0$，取最优 $\lambda$（减去投影）即得 $|\braket{\varphi_1|\varphi_2}|^2\le\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}$。`, gives: ["AII-2", "AII-5"], next: R`有了标积的基本不等式，转向算符本身的运算规则。` },
  { sec: "BII", title: "算符工具箱", gist: R`迹与基无关且可循环；对易子的乘积法则；$F(A)$ 在本征矢上作用为 $F(a)$；$[X,F(P)]=i\hbar F'(P)$；求导保持次序；Glauber 公式。`, gives: ["BII-7a", "BII-27", "BII-47", "BII-63"], next: R`最重要的一类算符函数是"$i\times$厄米"的指数——幺正算符。` },
  { sec: "CII", title: "幺正算符", gist: R`$U^\dagger U=UU^\dagger=\mathbb 1$ $\iff$ 保持标积 $\iff$ 换一组正交归一基；本征值在单位圆上；$\tilde A=UAU^\dagger$ 保谱；$U=\mathbb 1-i\varepsilon F$，$\delta A=-i\varepsilon[F,A]$。`, gives: ["CII-3", "CII-20", "CII-30", "CII-42", "CII-44"], next: R`把这些工具用在 $\mathbf R$、$\mathbf P$ 上。` },
  { sec: "DII", title: "位置与动量表象", gist: R`各算符在自己的表象中对角；$\mathbf P$ 在位置表象中是 $\delta'$ 型核，作用为 $\frac\hbar i\nabla$；Schrödinger 方程在 $\mathbf r$ 表象是微分方程，在 $\mathbf p$ 表象是积分方程。`, gives: ["DII-5", "DII-9", "DII-19", "DII-32"], next: R`这些结果有多少只靠 $[X,P]=i\hbar$？` },
  { sec: "EII", title: "只用 $[Q,P]=i\\hbar$", gist: R`平移算符 $S(\lambda)=\mathrm e^{-i\lambda P/\hbar}$ 使 $Q$ 的谱为整条实轴；$\psi(q)\mapsto\psi(q-\lambda)$；$P\to\frac\hbar i\frac{\mathrm d}{\mathrm dq}$；两表象由 Fourier 变换联系。`, gives: ["EII-6", "EII-9", "EII-18", "EII-23", "EII-27"], next: R`连续的平移之外，还有分立的对称操作：反射。` },
  { sec: "FII", title: "宇称", gist: R`$\Pi^2=\mathbb 1$，厄米且幺正，本征值 $\pm1$；偶奇分解；偶算符与 $\Pi$ 对易、奇算符反对易；选择定则；偶哈密顿量的本征态可取确定宇称。`, gives: ["FII-15", "FII-19", "FII-28", "FII-32", "FII-33"], next: R`对称性与简并的关系，在二维势阱里看得最清楚。` },
  { sec: "GII", title: "二维无限深势阱", gist: R`$H=H_x+H_y$ ⟹ 本征态是张量积，$E_{n,p}\propto n^2+p^2$；$x\leftrightarrow y$ 对称造成系统简并，矩形盒中消失；另有偶然简并。`, gives: ["GII-9", "GII-11", "GII-15", "GII-17"], next: R`最后用习题把这些工具练熟。` },
  { sec: "HII", title: "习题", gist: R`Dirac 记号与矩阵单位、Pauli 矩阵的指数、维里定理、C.S.C.O. 的具体判断。`, gives: [] },
];

// ---------- 推导图 ----------
export const EQMAP_OPS = [
  { from: "AII-3", to: "AII-5", label: R`使 $\braket{\psi|\psi}$ 最小` },
  { from: "AII-5", to: "AII-2", label: R`余量模方 $\ge0$` },
  { from: "BII-23", to: "BII-27", label: "作用于本征矢" },
  { from: "BII-12", to: "BII-44", label: "乘积法则 + 归纳" },
  { from: "BII-44", to: "BII-47", label: "逐项求和" },
  { from: "BII-47", to: "BII-51", label: R`只需 $[A,B]$ 与 $A$、$B$ 对易` },
  { from: "BII-51", to: "BII-66", label: R`$F=\mathrm e^{At}$` },
  { from: "BII-66", to: "BII-68", label: R`代入 $\dd F/\dd t$` },
  { from: "BII-68", to: "BII-63", label: "积分，令 $t=1$" },
];
export const EQMAP_UNI = [
  { from: "CII-1", to: "CII-3", label: "保持标积" },
  { from: "CII-3", to: "CII-20", label: "列正交归一" },
  { from: "CII-3", to: "CII-25", label: "本征值模为 1" },
  { from: "CII-27", to: "CII-30", label: "同矩阵元定义" },
  { from: "CII-30", to: "CII-32", label: "谱不变" },
  { from: "CII-36", to: "CII-42", label: "一阶幺正条件" },
  { from: "CII-42", to: "CII-44", label: "代入 (CII-30)" },
  { from: "CII-30", to: "FII-24", label: R`$U=\Pi$` },
  { from: "FII-8a", to: "FII-15", label: R`$\frac12(\mathbb 1\pm\Pi)$` },
  { from: "FII-15", to: "FII-19", label: "偶奇分解" },
  { from: "FII-24", to: "FII-28", label: "偶算符" },
  { from: "FII-28", to: "FII-32", label: "选择定则" },
];
export const EQMAP_QP = [
  { from: "EII-2", to: "EII-5", label: R`(BII-51)` },
  { from: "BII-51", to: "EII-5", label: R`$F=\mathrm e^{-i\lambda P/\hbar}$` },
  { from: "EII-5", to: "EII-6", label: "移项" },
  { from: "EII-6", to: "EII-9", label: "作用于本征矢" },
  { from: "EII-12", to: "EII-18", label: "定相 + 伴随" },
  { from: "EII-18", to: "EII-23", label: "无穷小平移" },
  { from: "EII-23", to: "EII-24", label: "解本征方程" },
  { from: "EII-24", to: "EII-27", label: "Fourier 变换" },
  { from: "DII-4", to: "DII-5", label: R`$\delta'$ 的积分表示` },
  { from: "DII-5", to: "DII-9", label: R`$\int\delta'f=f'$` },
  { from: "DII-9", to: "DII-19", label: "投影 Schrödinger 方程" },
  { from: "DII-23", to: "DII-32", label: "动量表象" },
  { from: "GII-4", to: "GII-8", label: "张量积本征态" },
  { from: "GII-8", to: "GII-9", label: "一维结果" },
  { from: "GII-9", to: "GII-15", label: R`$n\leftrightarrow p$` },
  { from: "GII-15", to: "GII-17", label: R`$a\neq b$ 破坏对称` },
];
export const EQMAP_LABELS = {
  "AII-2": "Schwarz 不等式", "AII-3": "试探矢量", "AII-5": "最优系数",
  "BII-12": "乘积法则", "BII-23": "算符函数", "BII-27": "作用于本征矢", "BII-44": "X 与 P 的幂", "BII-47": "X 与 F(P)", "BII-51": "推广", "BII-66": "指数与 B", "BII-68": "微分方程", "BII-63": "Glauber 公式",
  "CII-1": "幺正", "CII-3": "保持标积", "CII-20": "列正交归一", "CII-25": "本征值", "CII-27": "变换的定义", "CII-30": "算符的变换", "CII-32": "谱不变", "CII-36": "无穷小展开", "CII-42": "生成元", "CII-44": "一阶变化",
  "DII-4": "插入动量基", "DII-5": "动量的核", "DII-9": "求导", "DII-19": "位置表象方程", "DII-23": "位置函数的核", "DII-32": "动量表象方程",
  "EII-2": "正则对易", "EII-5": "Q 与 S", "EII-6": "平移本征值", "EII-9": "谱为整条实轴", "EII-12": "定相", "EII-18": "平移波函数", "EII-23": "P 是导数", "EII-24": "平面波", "EII-27": "Fourier 变换",
  "FII-8a": "平方为 1", "FII-15": "偶奇投影", "FII-19": "偶奇分解", "FII-24": "宇称变换", "FII-28": "偶算符", "FII-32": "选择定则",
  "GII-4": "可分离", "GII-8": "能量相加", "GII-9": "能级", "GII-15": "系统简并", "GII-17": "矩形盒",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "algebra", label: "算符代数" },
  { id: "sym", label: "幺正变换与对称性" },
  { id: "rep", label: "表象与应用" },
];

export const concepts = [
  {
    id: "schwarz", name_zh: "Schwarz 不等式", name_en: "Schwarz inequality", icon: "📐", section_id: "AII", group: "algebra",
    plain: R`两个矢量标积的模方不超过各自模方之积：复空间里的"$|\cos\theta|\le1$"。`,
    explain: R`$|\braket{\varphi_1|\varphi_2}|^2\le\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}$，等号当且仅当二者成比例。证明只用"模方 $\ge0$"：从 $\ket{\varphi_1}$ 中减去它沿 $\ket{\varphi_2}$ 的投影，余量的长度平方不能为负。

对归一化的态，它给出 $|\braket{\varphi|\psi}|^2\le1$——跃迁概率不超过 1；以后它还是推导 $\Delta X\Delta P\ge\hbar/2$ 的关键一步。`,
    analogy: "影子不会比物体本身长：一根棍子投在任何方向上的影长，都不超过棍长；只有棍子顺着那个方向放时才相等。",
    book_example: { what: R`$\ket\psi=\ket{\varphi_1}+\lambda\ket{\varphi_2}$，取 $\lambda=-\braket{\varphi_2|\varphi_1}/\braket{\varphi_2|\varphi_2}$ \eqref{AII-5}。`, point: R`最优的 $\lambda$ 就是减去投影。` },
    misconception: R`只用实数 $\lambda$ 的"判别式"证法在复空间里只能得到 $(\mathrm{Re}\braket{\varphi_1|\varphi_2})^2\le\cdots$，不完整。`,
  },
  {
    id: "trace", name_zh: "迹", name_en: "Trace", icon: "➕", section_id: "BII-1", group: "algebra",
    plain: "对角元之和；换基不变，乘积在迹号下可以循环换位。",
    explain: R`$\Tr A=\sum_i\braket{u_i|A|u_i}$。插两次封闭关系就能证明它与基无关，所以它是算符本身的属性；可观测量的迹是本征值（按简并度计）之和。

$\Tr AB=\Tr BA$（循环性）让很多计算变简单；它也给出一个漂亮的反证：有限维中不可能有 $[Q,P]=i\hbar$，因为左边的迹为零，右边是 $Ni\hbar$。`,
    analogy: "像一张表格的'总分'：无论把行列按什么顺序（基）排，同一组成绩的总分不变。",
    book_example: { what: R`\eqref{BII-5} 迹与基无关；\eqref{BII-7a} 循环性；$\mathrm E_{\rm II}$ 脚注中的迹论证。`, point: "迹是换基不变量。" },
    misconception: R`循环 $\neq$ 任意置换：$\Tr ABC=\Tr BCA$，但一般 $\Tr ABC\neq\Tr ACB$。`,
  },
  {
    id: "opfunc", name_zh: "算符的函数", name_en: "Function of an operator", icon: "🧮", section_id: "BII-4", group: "algebra",
    plain: R`把幂级数里的 $z$ 换成算符；在本征矢上它就是把函数作用到本征值。`,
    explain: R`$F(A)=\sum f_nA^n$；若 $A\ket{\varphi_a}=a\ket{\varphi_a}$，则 $F(A)\ket{\varphi_a}=F(a)\ket{\varphi_a}$。对可观测量，也可以直接在本征基里把对角元 $a_i$ 换成 $F(a_i)$。

代价是次序：一般 $\mathrm e^A\mathrm e^B\neq\mathrm e^{A+B}$；只有 $[A,B]=0$ 时才相等。与 $X$ 的对易子中，$P$ 的函数表现得像被"求导"：$[X,F(P)]=i\hbar F'(P)$。`,
    analogy: "在一组'各自独立的频道'（本征基）里，函数逐个频道调音量；换到别的基去看，就是一个复杂的混合器。",
    book_example: { what: R`$\mathrm e^{\sigma_z}=\mathrm{diag}(\mathrm e,1/\mathrm e)$ \eqref{BII-29}；$V(X)\ket x=V(x)\ket x$ \eqref{BII-34}。`, point: "本征基里算符函数是对角的。" },
    misconception: R`$\frac{\mathrm d}{\mathrm dt}\mathrm e^{A(t)}$ 一般不等于 $\dot A\,\mathrm e^{A(t)}$，除非 $A$ 与 $\dot A$ 对易。`,
  },
  {
    id: "glauber", name_zh: "Glauber 公式", name_en: "Glauber's formula", icon: "🔗", section_id: "BII-5-d", group: "algebra",
    plain: R`若 $A$、$B$ 都与 $[A,B]$ 对易，则 $\mathrm e^A\mathrm e^B=\mathrm e^{A+B}\mathrm e^{\frac12[A,B]}$。`,
    explain: R`把 $F(t)=\mathrm e^{At}\mathrm e^{Bt}$ 对 $t$ 求导，利用 $\mathrm e^{At}B\mathrm e^{-At}=B+t[A,B]$，得到系数互相对易的一阶微分方程，像数一样积分即可。

最常见的应用对象是 $X$、$P$（对易子是数）和谐振子的 $a$、$a^\dagger$；平移算符、相干态的乘法规则都由它而来。`,
    analogy: "两段路先后走与'合成一段'走，终点只差一个固定的'修正量'——前提是这段修正本身不再随路线变化。",
    book_example: { what: R`推导链 \eqref{BII-64}、\eqref{BII-68}、\eqref{BII-70}，令 $t=1$。`, point: "化为可积的微分方程。" },
    misconception: R`它不适用于角动量分量这类"对易子还是算符、不与原算符对易"的情形；那时需要完整的 BCH 级数。`,
  },
  {
    id: "unitary", name_zh: "幺正算符", name_en: "Unitary operator", icon: "🔄", section_id: "CII-1", group: "sym",
    plain: R`$U^\dagger U=UU^\dagger=\mathbb 1$：复空间中的"转动"，保持一切标积。`,
    explain: R`三个等价刻画：伴随等于逆；保持标积（有限维）；把一组正交归一基变成另一组正交归一基。矩阵的各列（各行）正交归一。

本征值都在单位圆上（$|u|=1$），不同本征值的本征矢正交。厄米算符的指数 $\mathrm e^{iA}$ 总是幺正的——时间演化、平移、转动都属此类。`,
    analogy: "转动一个刚体：每个点的位置都变了，但任意两点的距离、任意两条线的夹角都不变。",
    book_example: { what: R`\eqref{CII-21} 实转动；\eqref{CII-22} 自旋 1/2 转动（本页已改正一个相位）。`, point: "列正交归一一眼可验。" },
    misconception: R`幺正不等于厄米：幺正算符的本征值一般是复数（模为 1）。宇称 $\Pi$ 两者兼有，是特例。`,
  },
  {
    id: "unitary_tf", name_zh: "算符的幺正变换", name_en: "Unitary transformation of operators", icon: "🎭", section_id: "CII-2", group: "sym",
    plain: R`$\tilde A=UAU^\dagger$：把算符"跟着系统一起转"；本征值不变，本征矢变成 $U\ket{\varphi_a}$。`,
    explain: R`定义：$\tilde A$ 在新基中的矩阵元与 $A$ 在旧基中的相同。由此 $\tilde A=UAU^\dagger$。它保持厄米性、乘积、函数（$\widetilde{F(A)}=F(\tilde A)$），因而保持全部算符代数关系。

宇称变换 $\Pi B\Pi$、平移变换 $S^\dagger QS=Q+\lambda$ 都是例子。`,
    analogy: "把整个舞台连同演员一起旋转 90°：观众（新坐标）看到的剧情与原来完全一样。",
    book_example: { what: R`\eqref{CII-30}、\eqref{CII-32}；$\mathrm F_{\rm II}$ \eqref{FII-24}。`, point: "谱不变，本征矢跟着转。" },
    misconception: R`注意顺序：是 $UAU^\dagger$ 而不是 $U^\dagger AU$（后者对应逆变换）；两种约定都常见，要看清定义。`,
  },
  {
    id: "generator", name_zh: "生成元", name_en: "Generator (infinitesimal unitary operator)", icon: "🌱", section_id: "CII-3", group: "sym",
    plain: R`离恒等无穷近的幺正算符写成 $\mathbb 1-i\varepsilon F$，$F$ 厄米；算符变化 $-i\varepsilon[F,A]$。`,
    explain: R`一阶幺正条件给出 $G+G^\dagger=0$，令 $F=iG$ 即厄米。有限变换是无穷小变换的累积：$\mathrm e^{-i\lambda F}$。

平移的生成元是 $P/\hbar$（$\mathrm E_{\rm II}$），时间演化的是 $H/\hbar$，转动的是 $J/\hbar$。"与生成元对易 $\iff$ 在变换下不变"，这是对称性与守恒量联系的起点。`,
    analogy: "方向盘的一点点转角决定了整条弯道：知道每一小步怎么转（生成元），就知道整段路怎么走（有限变换）。",
    book_example: { what: R`\eqref{CII-42}、\eqref{CII-44}；$S(-\varepsilon)=\mathbb 1+i\varepsilon P/\hbar$ \eqref{EII-19}。`, point: "厄米算符生成幺正变换。" },
    misconception: R`生成元乘的是 $-i$（或 $+i$，看约定），不是 1：$\mathbb 1+\varepsilon F$ 配厄米的 $F$ 并不幺正。`,
  },
  {
    id: "representation", name_zh: "位置与动量表象", name_en: "r and p representations", icon: "🗺️", section_id: "DII", group: "rep",
    plain: "同一个态、同一个方程，在两组基下的两种坐标写法；各算符在自己的表象中是乘法。",
    explain: R`位置表象：$\mathbf R$ 乘以 $\mathbf r$，$\mathbf P$ 作用为 $\frac\hbar i\nabla$（矩阵元是 $\delta'$），$G(\mathbf P)$ 是只依赖 $\mathbf r-\mathbf r'$ 的卷积核。动量表象完全对称，$\mathbf R$ 作用为 $i\hbar\nabla_{\mathbf p}$，势能变成以 $\overline V(\mathbf p-\mathbf p')$ 为核的积分算符。

于是 Schrödinger 方程在位置空间是微分方程，在动量空间是积分方程——两者通过 Fourier 变换互译。`,
    analogy: "同一首曲子可以写成'随时间变化的波形'，也可以写成'频谱'；乘法在一边，就是卷积在另一边。",
    book_example: { what: R`\eqref{DII-5}、\eqref{DII-9}、\eqref{DII-19}、\eqref{DII-32}。`, point: "在自己的表象里简单，在对方表象里求导。" },
    misconception: R`$\braket{\mathbf r|P_x|\mathbf r'}$ 不是对角的；"$P$ 就是 $\frac\hbar i\partial_x$"只是它在位置表象中的作用形式。`,
  },
  {
    id: "translation", name_zh: "平移算符", name_en: "Translation operator", icon: "➡️", section_id: "EII-3-b", group: "rep",
    plain: R`$S(\lambda)=\mathrm e^{-i\lambda P/\hbar}$ 把波函数整体右移：$\psi(q)\mapsto\psi(q-\lambda)$。`,
    explain: R`由 $[Q,P]=i\hbar$ 得 $QS(\lambda)=S(\lambda)(Q+\lambda)$：$S$ 把 $Q$ 的本征值抬高 $\lambda$，所以 $Q$ 的谱是整条实轴、各本征值简并度相同；在 $\{\ket q\}$ 表象中它就是平移。无穷小平移给出 $P\to\frac\hbar i\frac{\mathrm d}{\mathrm dq}$。

一个顺带的结论：有限维空间中不存在对易子为 $i\hbar$ 的一对可观测量。`,
    analogy: "Taylor 定理的算符版：$\psi(q-\lambda)=\sum\frac{(-\lambda)^n}{n!}\psi^{(n)}(q)$，而 $\frac{\hbar}{i}\frac{\mathrm d}{\mathrm dq}$ 正是 $P$。",
    book_example: { what: R`\eqref{EII-6}、\eqref{EII-9}、\eqref{EII-18}、\eqref{EII-23}。`, point: "动量是平移的生成元。" },
    misconception: R`宗量是 $q-\lambda$ 但波形是向 $+q$ 方向移动；左矢 $\bra qS(\lambda)=\bra{q-\lambda}$ 与右矢方向相反。`,
  },
  {
    id: "parity", name_zh: "宇称与选择定则", name_en: "Parity and selection rules", icon: "🪞", section_id: "FII", group: "sym",
    plain: R`$\Pi\psi(\mathbf r)=\psi(-\mathbf r)$；本征值 $\pm1$；偶算符不连接相反宇称，奇算符只连接相反宇称。`,
    explain: R`$\Pi^2=\mathbb 1$，厄米又幺正；$P_\pm=\frac12(\mathbb 1\pm\Pi)$ 把任何态分成偶部与奇部。偶算符与 $\Pi$ 对易，奇算符（$\mathbf R$、$\mathbf P$）与之反对易。

选择定则：$\braket{\varphi|B_+|\psi}=0$ 若宇称相反；$\braket{\varphi|B_-|\psi}=0$ 若宇称相同。偶哈密顿量的本征态可选为确定宇称；不简并的必然如此。`,
    analogy: "照镜子：左右对称的图案（偶）照出来不变，反对称的图案（奇）照出来整体变号；任何图案都是这两者之和。",
    book_example: { what: R`\eqref{FII-15}–\eqref{FII-23} 偶奇分解；\eqref{FII-32}、\eqref{FII-33} 选择定则。`, point: "对称性直接给出哪些矩阵元为零。" },
    misconception: R`$\ket{-\mathbf r_0}$ 与 $-\ket{\mathbf r_0}$ 是完全不同的态：前者在对径点，后者只差一个负号。`,
  },
  {
    id: "tensor_sep", name_zh: "可分离哈密顿量与张量积", name_en: "Separable Hamiltonian, tensor product", icon: "🧩", section_id: "GII-1", group: "rep",
    plain: R`$H=H_x+H_y$ 时，本征态是一维本征态的张量积，能量相加。`,
    explain: R`二维方盒的势 $V_\infty(x)+V_\infty(y)$ 可加，$H_x$、$H_y$ 分别作用在 $\mathcal E_x$、$\mathcal E_y$ 上并对易。于是 $\ket{\varphi_n}_x\ket{\varphi_p}_y$ 构成完备本征基，$E_{n,p}=E_n+E_p$，波函数是两个正弦之积。

这把一个偏微分方程问题化成了两个已解的常微分方程问题。`,
    analogy: "两个互不干扰的旋钮：总音量 = 两路音量之和，每一路各调各的。",
    book_example: { what: R`\eqref{GII-4}、\eqref{GII-8}、\eqref{GII-9}、\eqref{GII-11}。`, point: "二维问题 = 两个一维问题。" },
    misconception: R`不是所有二维势都能这样分：圆形盒子的势不能写成 $x$ 部分加 $y$ 部分。`,
  },
  {
    id: "degeneracy", name_zh: "系统简并与偶然简并", name_en: "Systematic vs accidental degeneracy", icon: "🎲", section_id: "GII-2-c", group: "rep",
    plain: R`对称性造成的简并（交换 $x$、$y$）与数值巧合造成的简并（如 $50=5^2+5^2=7^2+1^2$）。`,
    explain: R`若有与 $H$ 对易的对称操作把一个本征态变成另一个**独立**的本征态，简并就不可避免——正方形中 $\Phi_{n,p}\to\Phi_{p,n}$。改成矩形，对称性没了，这种简并消失。

"偶然简并"没有明显的对称性来源，往往在扰动下解除；但物理上有些"偶然"后来被发现源自隐藏的更大对称性（氢原子）。`,
    analogy: "双胞胎长得一样是因为同一套基因（对称性）；两个陌生人恰好同名则只是巧合（偶然）。",
    book_example: { what: R`\eqref{GII-15}–\eqref{GII-18}；$E_{5,5}=E_{7,1}$，$E_{7,4}=E_{8,1}$。`, point: "破坏对称性，系统简并消失。" },
    misconception: R`中心反演也是正方形的对称性，却不产生简并——因为每个 $\Phi_{n,p}$ 自己就是它的本征态（只乘相位 $(-1)^{n+p}$）。`,
  },
];

export const relations = [
  { from: "schwarz", to: "unitary", label: "夹角/概率" },
  { from: "trace", to: "translation", label: "有限维不可能" },
  { from: "opfunc", to: "glauber", label: "指数的乘法" },
  { from: "opfunc", to: "unitary", label: "厄米的指数" },
  { from: "unitary", to: "unitary_tf", label: "作用于算符" },
  { from: "unitary", to: "generator", label: "无穷小" },
  { from: "generator", to: "translation", label: "动量生成平移" },
  { from: "glauber", to: "translation", label: "平移合成" },
  { from: "translation", to: "representation", label: "导数" },
  { from: "unitary_tf", to: "parity", label: "宇称变换" },
  { from: "parity", to: "degeneracy", label: "对称性致简并" },
  { from: "tensor_sep", to: "degeneracy", label: "交换量子数" },
];

export const TAKEAWAYS = [
  R`**算符不是数，次序是一切。**迹可以循环、对易的指数可以合并；否则 $\mathrm e^A\mathrm e^B\neq\mathrm e^{A+B}$，求导也要保持次序。$A$、$B$ 与 $[A,B]$ 对易时，差别恰好是 $\mathrm e^{\frac12[A,B]}$（Glauber）。`,
  R`**幺正 = 复空间中的转动。**保持标积、把正交归一基变成正交归一基、本征值在单位圆上；$\tilde A=UAU^\dagger$ 保谱；无穷小幺正 $\mathbb 1-i\varepsilon F$ 由厄米生成元决定。`,
  R`**一行 $[Q,P]=i\hbar$ 推出一整套结构：**连续谱、平移算符 $\mathrm e^{-i\lambda P/\hbar}$、$P\to\frac\hbar i\frac{\mathrm d}{\mathrm dq}$、Fourier 变换，并且态空间必须无穷维。`,
  R`**对称性给出零与简并。**宇称把态分为偶奇，选择定则让许多矩阵元直接为零；可分离的 $H$ 让本征态成为张量积，对称操作把一个本征态变成另一个时就产生系统简并。`,
];

export const QUIZ = [
  {
    q: R`$A$、$B$ 是任意两个 $3\times3$ 矩阵。下列哪个等式**一定**成立？`,
    options: [R`$\Tr(ABC)=\Tr(ACB)$`, R`$\mathrm e^A\mathrm e^B=\mathrm e^{A+B}$`, R`$\Tr(AB-BA)=0$`, R`$(AB)^\dagger=A^\dagger B^\dagger$`],
    answer: 2,
    why: R`迹的循环性给出 $\Tr AB=\Tr BA$，所以对易子的迹为零。这也说明有限维中 $[Q,P]=i\hbar\mathbb 1$ 不可能（右边的迹不为零）。其余三项都要求对易或次序反转。`,
  },
  {
    q: R`某幺正算符 $U$ 的一个本征值可能是：`,
    options: [R`$2$`, R`$\mathrm e^{i\pi/3}$`, R`$i/2$`, R`$0$`],
    answer: 1,
    why: R`幺正算符保持模长，$|u|=1$ \eqref{CII-25}。只有 $\mathrm e^{i\pi/3}$ 在单位圆上。`,
  },
  {
    q: R`$S(\lambda)=\mathrm e^{-i\lambda P/\hbar}$ 作用在中心位于 $q=1$ 的波包上，$\lambda=3$。新波包的中心在：`,
    options: [R`$q=-2$`, R`$q=1$`, R`$q=4$`, R`$q=3$`],
    answer: 2,
    why: R`$\braket{q|S(\lambda)|\psi}=\psi(q-\lambda)$ \eqref{EII-18}：原来在 $q_0$ 的峰移到 $q_0+\lambda=4$。等价地 $S^\dagger QS=Q+\lambda$，$\langle Q\rangle$ 增加 $\lambda$。`,
  },
  {
    q: R`一维偶势 $V(x)=V(-x)$ 中，某个不简并的定态 $\ket\varphi$。下列哪个**一定**为零？`,
    options: [R`$\braket{\varphi|X^2|\varphi}$`, R`$\braket{\varphi|P|\varphi}$ 以外的一切矩阵元`, R`$\braket{\varphi|X|\varphi}$`, R`$\braket{\varphi|\Pi|\varphi}$`],
    answer: 2,
    why: R`不简并 ⟹ $\ket\varphi$ 有确定宇称；$X$ 是奇算符，宇称相同的态之间的矩阵元为零 \eqref{FII-33}。$X^2$ 是偶的，平均值一般不为零；$\braket{\Pi}=\pm1$。`,
  },
  {
    q: R`二维方盒改为 $a\times b$ 的矩形（$b\neq a$）。关于能级 $(1,2)$ 与 $(2,1)$：`,
    options: ["仍然简并，因为都有一个量子数等于 2", R`一般不再简并：$x\leftrightarrow y$ 对称性被破坏`, "必然出现偶然简并", "两个态都不再是本征态"],
    answer: 1,
    why: R`$E_{n,p}-E_{p,n}\propto(n^2-p^2)(1/a^2-1/b^2)\neq0$ \eqref{GII-17}。态仍是张量积本征态；只有特殊边长比才可能出现偶然简并。`,
  },
  {
    q: R`无穷小幺正算符 $U(\varepsilon)=\mathbb 1-i\varepsilon F$，若某个可观测量 $A$ 在该变换下不变，则：`,
    options: [R`$F$ 必须是幺正的`, R`$[F,A]=0$`, R`$A$ 必须等于 $F$`, R`$F$ 必须是反厄米的`],
    answer: 1,
    why: R`\eqref{CII-44}：$\tilde A-A=-i\varepsilon[F,A]$。不变 $\iff$ 与生成元对易。$F$ 是厄米的（不是反厄米）。`,
  },
];

export const BRIDGE = R`第 II 章及其补充材料把"语言"准备齐了：态空间与 Dirac 记号、可观测量与本征分解、表象与幺正变换、对易与对称性。第 III 章将正式陈述量子力学的基本假设——态由右矢描写、物理量由可观测量描写、测量结果是本征值、概率由投影给出、演化由 Schrödinger 方程 $i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi}=H\ket\psi$ 决定。这里磨好的工具会立刻派上用场：Schwarz 不等式给出不确定关系，$[X,F(P)]=i\hbar F'(P)$ 给出 Ehrenfest 定理，幺正演化算符 $\mathrm e^{-iHt/\hbar}$ 正是"$i\times$厄米"的指数，宇称与对易可观测量帮我们给定态分类。`;
