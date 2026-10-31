// 第 11 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书逐字符核对；原书笔误在 statusNote 中注明并已直接改正。
// 注意：String.raw 中 "$" 不能紧跟 "{"（会被当成模板插值）。
const R = String.raw;
export const S = {
  // ======================= 外部引用 / 未编号论断 =======================
  "F:charclass": {
    kind: "definition", n: "（§11.1）", ch: "ch11", en: "Characteristic class", zh: "示性类", page: 445,
    stmt: R`设 $P$ 是不变多项式，$\mathcal{F}$ 是纤维丛 $E$ 上某个联络的曲率。由\sref{T11.1}，$P(\mathcal{F})$ 是闭形式，且其 de Rham 上同调类与联络的选取无关。这个上同调类称为由 $P$ 定义的**示性类**（characteristic class），记作 $\chi_E(P)\in H^*(M)$。$E$ 可以是主丛，也可以是相伴向量丛（二者共用同一组规范势与场强）。`,
    deps: ["T11.1", "D6.2"], status: "checked",
    role: R`本章一切对象（陈类、陈特征、Todd 类、Pontrjagin 类、Euler 类、$L$ 多项式、$\hat A$ 亏格）都是这一构造对不同 $P$ 的特例：选一个不变多项式，代入曲率，取上同调类。`,
    key: R`曲率依赖于联络，但 $P(\mathcal{F})$ 的上同调类不依赖：两个联络的差异只贡献一个恰当形式（超渡形式 \eqref{11.21} 的外微分）。`,
    pitfall: R`示性类是**上同调类**，不是具体的微分形式。同一个丛换一个联络，$P(\mathcal{F})$ 逐点改变，但在闭流形上的积分不变。`,
  },
  "X:splitting": {
    kind: "cited", n: "（Shanahan 1978；Hirzebruch 1966）", ch: "ch11", en: "Splitting principle", zh: "分裂原理", page: 449, eq: "11.39",
    stmt: R`在计算由不变多项式给出的示性类时，可以假装任何 $k$ 维复向量丛 $E$ 是 $k$ 个复线丛的 Whitney 和 $L_1\oplus\cdots\oplus L_k$：$c(E)=\prod_{i=1}^k(1+x_i)$，其中 $x_i=c_1(L_i)$ 称为**陈根**（Chern roots）。任何关于 $x_i$ 的对称多项式恒等式，换成用 $c_j(E)$ 表达后，对一般的 $E$ 也成立。`,
    deps: ["T11.3"], status: "note",
    statusNote: R`原书"不加证明地接受"。本站在正文补充两种理由：(1) 代数层面——不变多项式在对角化矩阵（稠密）上的值决定其全体值，对角元就是 $x_i$；(2) 拓扑层面——存在旗丛 $\sigma:F(E)\to M$，使 $\sigma^*E$ 真的分裂为线丛之和，且 $\sigma^*:H^*(M)\to H^*(F(E))$ 是单射。`,
    role: R`把所有陈类、陈特征、Todd 类、$L$、$\hat A$ 的计算化为"对称函数"的代数：先在线丛上写出 $\prod f(x_i)$，再用初等对称函数（即陈类）表达。交互图 2 就是这个原理的计算器。`,
    key: R`$\det$、$\Tr$ 及其组合都是不变多项式，在 $g^{-1}(\mathrm{i}\mathcal{F}/2\pi)g=\mathrm{diag}(x_1,\ldots,x_k)$ 下取值不变。`,
    pitfall: R`$x_i$ 本身一般不是 $M$ 上的上同调类（只有它们的对称组合才是）；它们只是记账工具。`,
  },
  "X:chern1979": {
    kind: "cited", n: "（Chern 1979）", ch: "ch11", en: "Classification of vector bundles by maps into Grassmannians", zh: "向量丛的 Grassmann 流形分类", page: 450,
    stmt: R`紧流形上的复向量丛 $E$ 可以嵌入平凡丛：存在 $\bar E$ 使 $E\oplus\bar E\cong M\times\C^n$；由此得到映射 $f:M\to G_{k,n}(\C)$，$p\mapsto F_p$，且 $E\cong f^*L_{k,n}(\C)$；同伦的映射拉回等价的丛。`,
    deps: ["T9.1"], status: "note",
    statusNote: R`原书引 Chern (1979)，不给证明。存在 $\bar E$ 的一种构造：取 $M$ 的有限覆盖与单位分解，用 $E$ 的局部标架把 $E$ 逐点嵌入 $\C^n$，$\bar E$ 取正交补。"同伦 ⇒ 拉回等价"就是第 9 章的同伦公理（\sref{T9.1}）。`,
    role: R`定理 11.4 的来源；它把丛的分类化为映射 $M\to G_k(\C)$ 的同伦分类，示性类就是 $H^*(G_k(\C))$ 中的类经 $f^*$ 拉回。`,
  },
  "X:gauss-bonnet": {
    kind: "cited", n: "（§12.3 证明）", ch: "ch11", en: "Gauss–Bonnet theorem", zh: "Gauss–Bonnet 定理", page: 460, eq: "11.83",
    stmt: R`对紧致可定向的偶数维 Riemann 流形 $M$，Euler 类的积分等于 Euler 示性数：$\int_Me(M)=\chi(M)$。奇数维时两边都为零。`,
    deps: ["D2.10"], status: "note",
    statusNote: R`本章只用 $S^2$（$\int e=2$）与平坦环面（$e\equiv0$）两例说明；一般证明见第 12 章（Gauss–Bonnet 是 de Rham 复形的指标定理）。交互图 3 对任意旋转曲面数值验证：鼓包球面积分恒为 2，环面恒为 0。`,
    role: R`第一个"曲率积分 = 拓扑整数"的经典定理，是 Atiyah–Singer 指标定理的原型。`,
    pitfall: R`$e(M)$ 的符号依赖于定向与 Pfaffian 的相位约定；本站采用标准 Pfaffian，使 $S^2$ 上 $e=K\,\dd A/2\pi$ 处处为正（见 §11.4.2 的勘误）。`,
  },
  "X:signature": {
    kind: "cited", n: "（§12.5 证明）", ch: "ch11", en: "Hirzebruch signature theorem", zh: "Hirzebruch 符号差定理", page: 463, eq: "11.99",
    stmt: R`紧致连通可定向的四维流形 $M$ 的符号差 $\tau(M)=p-q$（相交形式 $\sigma([\alpha],[\beta])=\int_M\alpha\wedge\beta$ 的正、负本征值个数之差）由 $L$ 多项式给出：$\tau(M)=\int_ML_1(M)=\frac13\int_Mp_1(M)$。`,
    deps: ["F:charclass"], status: "note",
    statusNote: R`本章只陈述，证明见第 12 章（符号差复形的指标定理）。`,
    role: R`说明 $L$ 多项式的意义：它的积分是纯拓扑量。例：$\CP^2$ 的 $\tau=1$，所以 $\int_{\CP^2}p_1=3$。`,
  },

  // ======================= §11.1 Chern–Weil =======================
  "T11.1": {
    kind: "theorem", n: "11.1", ch: "ch11", en: "Chern–Weil theorem", zh: "Chern–Weil 定理", page: 442, eq: "11.20",
    stmt: R`设 $P$ 是不变多项式。则 $P(\mathcal{F})$ 满足：(a) $\dd P(\mathcal{F})=0$；(b) 若 $\mathcal{F}$ 与 $\mathcal{F}'$ 是对应于不同联络 $\mathcal{A}$ 与 $\mathcal{A}'$ 的曲率二形式，则差 $P(\mathcal{F}')-P(\mathcal{F})$ 是恰当形式。`,
    deps: ["11.3", "11.10", "11.12", "10.46", "10.38a"], status: "filled",
    statusNote: R`原书证明完整，本站补出两处符号细节：(1) (11.12) 由 (11.10) 得到时公共的符号因子 $(-1)^{p(p_1+\cdots+p_i)}$ 的来历（把 $\eta$ 移到最前面）；(2) 在 (b) 中用 (11.12) 时取 $\Omega_1=A=\theta$、$\Omega_2=\cdots=\Omega_r=\mathcal{F}_t$（原书误印下标 $\Omega_m$），并逐项写出 $[\theta,\theta]=2\theta^2$。`,
    role: R`整章的基石：(a) 让 $P(\mathcal{F})$ 定义上同调类；(b) 让这个类与联络无关，从而只依赖于丛本身——这就是"示性类"。`,
    key: R`(a) 不变性的无穷小形式 \eqref{11.10} + Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$：$\dd$ 作用在 $\tilde P(\mathcal{F},\ldots,\mathcal{F})$ 上可以换成 $\mathcal{D}$。(b) 沿直线 $\mathcal{A}_t=\mathcal{A}+t(\mathcal{A}'-\mathcal{A})$ 插值，$\frac{\dd}{\dd t}P(\mathcal{F}_t)$ 恰是一个外微分。`,
    pitfall: R`$\mathcal{A}$ 本身不是张量（换卡时有非齐次项），但差 $\theta=\mathcal{A}'-\mathcal{A}$ 是（伴随变换），所以超渡形式 $TP_r$ 是整体定义的形式。`,
  },
  "T11.2": {
    kind: "theorem", n: "11.2", ch: "ch11", en: "Weil homomorphism and naturality", zh: "Weil 同态与自然性", page: 445, eq: "11.24",
    stmt: R`设 $P\in I^*(G)$ 是不变多项式，$E$ 是 $M$ 上结构群为 $G$ 的纤维丛。(a) 映射 $\chi_E:I^*(G)\to H^*(M)$，$P\mapsto\chi_E(P)$，是同态（**Weil 同态**）。(b) 设 $f:N\to M$ 是可微映射，则对拉回丛 $f^*E$ 有**自然性** $\chi_{f^*E}=f^*\chi_E$。`,
    deps: ["T11.1", "11.2", "10.9", "9.18"], status: "filled",
    statusNote: R`原书 (a) 的证明中 $\tilde P_n(T_{\beta_1},\ldots,T_{\beta_s})$ 应为 $\tilde P_s$，且积 $P_rP_s$ 的对称化与 $\mathcal{F}^\alpha$（二形式，彼此交换）的交换性是关键，本站补出这一点。`,
    role: R`(a) 说示性类之间可以相乘，乘法与多项式的乘法一致；(b) 说示性类与拉回交换——这正是公理化定义 \eqref{11.44a} 的来源。`,
    key: R`拉回联络 $f^*\mathcal{A}_i$ 满足拉回丛的相容条件，其曲率是 $f^*\mathcal{F}_i$；而 $f^*$ 与 $\wedge$、多项式运算交换。`,
  },
  "C11.1": {
    kind: "corollary", n: "11.1", ch: "ch11", en: "Characteristic classes of a trivial bundle", zh: "平凡丛的示性类平凡", page: 446,
    stmt: R`平凡丛的示性类是平凡的。`,
    deps: ["T11.2"], status: "checked",
    role: R`示性类是"非平凡性的障碍"：只要某个示性类非零（如单极子丛的 $c_1$），丛就一定不平凡。`,
    key: R`平凡丛是点上丛的拉回，点的高阶上同调为零。`,
    pitfall: R`逆命题不成立：示性类全为零的丛不一定平凡（例如有些丛只被 $\Z_2$ 系数的 Stiefel–Whitney 类或挠元检测到）。`,
  },

  // ======================= §11.2 陈类 =======================
  "T11.3": {
    kind: "theorem", n: "11.3", ch: "ch11", en: "Properties of Chern classes", zh: "陈类的性质", page: 448, eq: "11.33",
    stmt: R`设 $E\xrightarrow{\pi}M$ 是 $G=\mathrm{GL}(k,\C)$、$F=\C^k$ 的向量丛。(a)（自然性）设 $f:N\to M$ 光滑，则 $c(f^*E)=f^*c(E)$。(b) 设 $F\xrightarrow{\pi'}M$ 是 $F=\C^l$、$G=\mathrm{GL}(l,\C)$ 的另一个向量丛，则 Whitney 和的全陈类为 $c(E\oplus F)=c(E)\wedge c(F)$。`,
    deps: ["T11.2", "11.25", "9.37"], status: "checked",
    statusNote: R`原书写"(a) 直接由定理 11.2(a) 得到"，应为 11.2(b)（自然性）。`,
    role: R`陈类的两条结构性质：与拉回交换、对 Whitney 和相乘。它们加上 \eqref{11.46d} 的归一化，唯一确定陈类（公理化定义）。`,
    key: R`Whitney 和的曲率是分块对角的，分块对角矩阵的行列式等于各块行列式之积。`,
  },
  "T11.4": {
    kind: "theorem", n: "11.4", ch: "ch11", en: "Classification by Grassmannians", zh: "复向量丛的分类定理", page: 450, eq: "11.41",
    stmt: R`设 $\dim M=m$，$E\xrightarrow{\pi}M$ 是纤维为 $\C^k$ 的复向量丛。则存在自然数 $N$，使对 $n>N$：(a) 存在映射 $f:M\to G_{k,n}(\C)$ 使 $E\cong f^*L_{k,n}(\C)$；(b) $f^*L_{k,n}(\C)\cong g^*L_{k,n}(\C)$ 当且仅当 $f,g:M\to G_{k,n}(\C)$ 同伦。`,
    deps: ["X:chern1979", "T9.1"], status: "note",
    statusNote: R`原书引 Chern (1979)，不证明。(b) 的"⇐"就是同伦公理；"⇒"需要 $n$ 足够大，使任何两个分类映射之间都能构造同伦。`,
    role: R`向量丛的分类 = 映射 $M\to G_{k,n}(\C)$ 的同伦类；示性类 = 万有丛的上同调类的拉回。`,
    pitfall: R`$n$ 必须足够大（相对于 $\dim M$）；对固定的小 $n$，(b) 的"⇒"可能失败。`,
  },
  "F:chern-axioms": {
    kind: "fact", n: "（11.46）", ch: "ch11", en: "Axioms for Chern classes", zh: "陈类的公理化刻画", page: 451, eq: "11.46a",
    stmt: R`陈类可由下列公理唯一刻画：(i) 自然性 $c(f^*E)=f^*c(E)$；(ii) $c(E)=c_0(E)\oplus c_1(E)\oplus\cdots\oplus c_k(E)$，$c_i(E)\in H^{2i}(M)$，$i>k$ 时 $c_i(E)=0$；(iii) Whitney 和 $c(E\oplus F)=c(E)c(F)$；(iv) 归一化 $c(L)=1+x$，$L$ 是 $\CP^n$ 上的典范线丛。`,
    deps: ["T11.3", "X:splitting"], status: "note",
    statusNote: R`原书 \eqref{11.46c} 印作 $c(E\oplus F)=c(E)c(E)$，应为 $c(E)c(F)$，本站已改正。"唯一性"原书只说"可以证明"：由 (i)(iii) 与分裂原理，任何复向量丛的陈类都被线丛的陈类决定；线丛由到 $\CP^n$ 的映射拉回典范线丛得到，(i)(iv) 定出其陈类。归一化中 $x$ 的符号约定见例 11.4（用本章的曲率约定，典范线丛的 $\int c_1=-1$）。`,
    role: R`给出不依赖微分几何（联络、曲率）的陈类定义，适用于拓扑范畴。`,
  },
  "T11.5": {
    kind: "theorem", n: "11.5", ch: "ch11", en: "Properties of Chern characters", zh: "陈特征的性质", page: 454, eq: "11.62a",
    stmt: R`(a)（自然性）设 $E\xrightarrow{\pi}M$ 是 $F=\C^k$ 的向量丛，$f:N\to M$ 光滑，则 $\mathrm{ch}(f^*E)=f^*\mathrm{ch}(E)$。(b) 设 $E$、$F$ 是 $M$ 上的向量丛，则 $\mathrm{ch}(E\otimes F)=\mathrm{ch}(E)\wedge\mathrm{ch}(F)$，$\mathrm{ch}(E\oplus F)=\mathrm{ch}(E)+\mathrm{ch}(F)$。`,
    deps: ["T11.2", "11.47"], status: "filled",
    statusNote: R`原书证明中三处笔误已改正：(1) "(a) 由定理 11.2(a)" 应为 11.2(b)；(2) 二项展开 $\sum_{m=1}^j$ 应从 $m=0$ 开始（否则漏掉 $\Tr C^j$ 项）；(3) 直和的计算中 $(1/2\pi)^j$ 应为 $(\mathrm{i}/2\pi)^j$。本站另补出：$B\otimes I$ 与 $I\otimes C$ 可交换，所以二项式定理成立，且 $\Tr(B^m\otimes C^{j-m})=\Tr B^m\,\Tr C^{j-m}$。`,
    role: R`陈特征是"从向量丛的半环（$\oplus,\otimes$）到上同调环的环同态"——这使它成为 K 理论与指标定理的天然语言。`,
    key: R`张量积丛的曲率是 $\mathcal{F}_E\otimes I+I\otimes\mathcal{F}_F$，两项交换，所以 $\exp$ 分解为乘积。`,
    pitfall: R`$\mathrm{ch}$ 对 $\oplus$ 是**加法**，而 $c$、$\mathrm{Td}$、$p$、$L$、$\hat A$ 对 $\oplus$ 都是**乘法**。`,
  },

  // ======================= §11.4 Pontrjagin 与 Euler =======================
  "F:pfaffian": {
    kind: "fact", n: "（11.87）", ch: "ch11", en: "Pfaffian lemma", zh: R`Pfaffian 的变换律与 $\det=\mathrm{Pf}^2$`, page: 461, eq: "11.84",
    stmt: R`对 $2l$ 阶反对称矩阵 $A$ 与任意 $2l$ 阶矩阵 $X$，有 $\mathrm{Pf}(X^{\rm t}AX)=\mathrm{Pf}(A)\det X$。由此及块对角标准形，$\det A=\mathrm{Pf}(A)^2$；$\mathrm{Pf}$ 在 $\mathrm{SO}(2l)$ 下不变，在非正常转动下变号。`,
    deps: ["P1.3"], status: "filled",
    statusNote: R`原书脚注 3 先由 $\det(X^{\rm t}AX)=(\det X)^2\det A$ 得到"$\mathrm{Pf}(X^{\rm t}AX)=\pm\mathrm{Pf}(A)\det X$"，再用"$\mathrm{Pf}(I^{\rm t}AI)=\mathrm{Pf}(A)$"定号，这只对与 $I$ 连通（$\det X>0$）的 $X$ 有效。本站补出直接证明：用 $\epsilon$ 记号写 $\mathrm{Pf}(A)=\frac1{2^ll!}\epsilon^{i_1\cdots i_{2l}}A_{i_1i_2}\cdots$，代入后 $\epsilon^{i_1\cdots}X_{j_1i_1}\cdots=\det X\,\epsilon^{j_1\cdots}$。另，本站采用第 1 章的标准 Pfaffian（无相位 $(-1)^l$），见 §11.4.2 的勘误。`,
    role: R`Euler 类 $e=\mathrm{Pf}(\mathcal{R}/2\pi)$ 是 $\mathrm{SO}(2l)$ 不变多项式但不是 $\mathrm{O}(2l)$ 不变的：这就是为什么 Euler 类需要定向。`,
    key: R`化到块对角形 $\Lambda=S^{\rm t}AS$：$\mathrm{Pf}(\Lambda)=\prod\lambda_i$，$\det\Lambda=\prod\lambda_i^2$。`,
  },

  // ======================= §11.5 陈–Simons =======================
  "F:cartan-homotopy": {
    kind: "fact", n: "（11.112）", ch: "ch11", en: "Cartan's homotopy formula", zh: "Cartan 同伦公式", page: 465, eq: "11.112",
    stmt: R`设 $\mathcal{A}_t=\mathcal{A}_0+t(\mathcal{A}_1-\mathcal{A}_0)$，$\mathcal{F}_t=\dd\mathcal{A}_t+\mathcal{A}_t^2$，反导子 $l_t$ 由 $l_t\mathcal{A}_t=0$、$l_t\mathcal{F}_t=\delta t(\mathcal{A}_1-\mathcal{A}_0)$ 定义，$k_{01}=\int_0^1\delta t\,l_t$。则对 $\mathcal{A}$、$\mathcal{F}$ 的任意多项式 $S$：$S(\mathcal{A}_1,\mathcal{F}_1)-S(\mathcal{A}_0,\mathcal{F}_0)=(\dd k_{01}+k_{01}\dd)S(\mathcal{A}_t,\mathcal{F}_t)$。`,
    deps: ["11.109", "11.110", "10.46"], status: "filled",
    statusNote: R`原书在生成元 $\mathcal{A}_t$、$\mathcal{F}_t$ 上验证 $(\dd l_t+l_t\dd)=\delta t\,\partial_t$。本站补出：两边都是满足 Leibniz 律的"偶"导子（两个反导子的反对易子），所以在生成元上成立即对一切多项式成立；并说明为何 $S$ 中的 $\dd\mathcal{A}$、$\dd\mathcal{F}$ 必须先用 $\mathcal{F}-\mathcal{A}^2$、$-[\mathcal{A},\mathcal{F}]$ 消去。`,
    role: R`一把"万能钥匙"：既能重新推出陈–Simons 形式（例 11.9），又能计算它在规范变换下的变化 \eqref{11.118}，后者是第 13 章反常的 descent 方程的起点。`,
    key: R`$\dd l_t+l_t\dd$ 在 $\mathcal{A}_t$ 上给出 $\delta t\,\partial_t\mathcal{A}_t$，在 $\mathcal{F}_t$ 上用 Bianchi 恒等式给出 $\delta t\,\mathcal{D}_t(\mathcal{A}_1-\mathcal{A}_0)=\delta t\,\partial_t\mathcal{F}_t$。`,
  },
  "F:cs-gauge": {
    kind: "fact", n: "（11.118）", ch: "ch11", en: "Gauge variation of the Chern–Simons form", zh: "陈–Simons 形式的规范变换", page: 466, eq: "11.118",
    stmt: R`在规范变换 $\mathcal{A}\to\mathcal{A}^g=g^{-1}(\mathcal{A}+\dd)g$ 下，陈特征的陈–Simons 形式变为 $Q_{2j+1}(\mathcal{A}^g,\mathcal{F}^g)-Q_{2j+1}(\mathcal{A},\mathcal{F})=Q_{2j+1}(g^{-1}\dd g,0)+\dd\alpha_{2j}$，其中 $Q_{2j+1}(g^{-1}\dd g,0)=(-1)^j\frac{j!}{(2j+1)!}\big(\frac{\mathrm{i}}{2\pi}\big)^{j+1}\Tr[(g^{-1}\dd g)^{2j+1}]$ 是闭形式（其积分是映射度型的整数），$\alpha_{2j}=k_{01}Q_{2j+1}(\mathcal{A}_t+v,\mathcal{F}_t)$，$v=\dd g\,g^{-1}$。`,
    deps: ["F:cartan-homotopy", "11.114", "11.120"], status: "filled",
    statusNote: R`本站补出：(1) $\mathcal{F}^g_t=g^{-1}\mathcal{F}_tg$ 的验证；(2) $Q_{2j+1}$ 作为 $\mathcal{A}$、$\mathcal{F}$ 的迹多项式在共轭下不变，故 $Q(\mathcal{A}^g_t,\mathcal{F}^g_t)=Q(g\mathcal{A}^g_tg^{-1},g\mathcal{F}^g_tg^{-1})=Q(\mathcal{A}_t+v,\mathcal{F}_t)$；(3) 积分 $\int_0^1(t^2-t)^j\dd t$ 的 Beta 函数计算。原书"$Q_{2j+1}(g\dd g,0)$"应为 $Q_{2j+1}(g^{-1}\dd g,0)$。`,
    role: R`陈–Simons 作用量的规范不变性"只差整数"：$\dd\alpha_{2j}$ 在闭流形上积分为零，$Q(g^{-1}\dd g,0)$ 的积分是绕数。这是 3 维 CS 理论"能级量子化"与第 13 章反常的根源。`,
  },

  // ======================= §11.6 Stiefel–Whitney =======================
  "T11.6": {
    kind: "theorem", n: "11.6", ch: "ch11", en: "Orientability and w₁", zh: "可定向 ⇔ $w_1$ 平凡", page: 471, eq: "11.135",
    stmt: R`设 $TM\xrightarrow{\pi}M$ 是带纤维度规的切丛。$M$ 可定向当且仅当 $w_1(M)$ 平凡。`,
    deps: ["11.135", "11.136", "D5.6"], status: "filled",
    statusNote: R`原书方括号中的例子只处理了单个重叠区。本站补出一般论证：若 $f=\delta f_0$，令 $\bar e_{i\alpha}=h_ie_{i\alpha}$，$\det h_i=f_0(i)$，则 $\det\bar t_{ij}=f_0(i)f_0(j)f(i,j)=f(i,j)^2=1$ 对**所有**重叠区同时成立。`,
    role: R`第一 Stiefel–Whitney 类是可定向性的障碍。它取值于 $\Z_2$ 系数的 Čech 上同调，不能用曲率表达。`,
    key: R`$\det t_{ij}=\pm1$ 构成 Čech 1-上闭链；换标架改变它一个上边缘；可定向 ⇔ 能把所有 $\det t_{ij}$ 同时变成 $+1$ ⇔ 上闭链是上边缘。`,
  },
  "T11.7": {
    kind: "theorem", n: "11.7", ch: "ch11", en: "Spin structure and w₂", zh: "存在自旋结构 ⇔ $w_2$ 平凡", page: 471, eq: "11.139",
    stmt: R`设 $TM$ 是可定向流形 $M$ 上的切丛。$M$ 上存在自旋丛当且仅当 $w_2(M)$ 平凡。`,
    deps: ["11.137", "11.138", "11.139", "T11.6"], status: "filled",
    statusNote: R`原书证明中 $\delta f_1(i,j,k)=f_1(j,k)f_1(i,k)f_1(k,i)$ 应为 $f_1(j,k)f_1(i,k)f_1(i,j)$（按 \eqref{11.130}；原写法由对称性等于 $f_1(j,k)$，不是上边缘），本站已改正。并补出：新提升 $\tilde t'_{ij}=\tilde t_{ij}f_1(i,j)$ 仍满足 $\varphi(\tilde t'_{ij})=t_{ij}$、$\tilde t'_{ji}=\tilde t'^{-1}_{ij}$。`,
    role: R`第二 Stiefel–Whitney 类是"能否在流形上定义旋量（费米子）"的障碍。例：$\CP^2$ 的 $w_2\neq0$，所以 $\CP^2$ 上没有自旋结构。`,
    key: R`把 $\mathrm{SO}(m)$ 的转移函数提升到 $\mathrm{SPIN}(m)$，三重重叠上的余循环条件只差一个符号 $f(i,j,k)=\pm1$；能否通过改变提升的符号消掉它，正是 $[f]\in H^2(M;\Z_2)$ 是否平凡。`,
    pitfall: R`即使 $w_2=0$，自旋结构也可能不唯一：不同的自旋结构由 $H^1(M;\Z_2)$ 计数（如环面 $T^2$ 有 4 个）。`,
  },
};
