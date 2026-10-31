// 第 12 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书逐字符核对；原书笔误在 statusNote 中注明并已直接改正。
// 注意：String.raw 中 "$" 不能紧跟 "{"（会被当成模板插值）。
const R = String.raw;
export const S = {
  // ======================= 外部引用 / 未编号论断 =======================
  "X:elliptic-Fredholm": {
    kind: "cited", n: "（一般算子理论）", ch: "ch12", en: "Elliptic operators on compact manifolds are Fredholm", zh: "紧流形上的椭圆算子是 Fredholm 算子", page: 476,
    stmt: R`设 $M$ 是无边紧流形，$D:\Gamma(M,E)\to\Gamma(M,F)$ 是椭圆微分算子。则 $\ker D$ 与 $\operatorname{coker}D$ 都是有限维的，即 $D$ 是 Fredholm 算子；此外 $\operatorname{im}D$ 是闭子空间，$\Gamma(M,F)=\operatorname{im}D\oplus\ker D^\dagger$（正交直和）。`,
    deps: [], status: "note",
    statusNote: R`原书只说"由一般算子理论可知"。证明要用椭圆正则性与 Sobolev 空间的紧嵌入（Rellich 引理），构造参数逆 $Q$ 使 $QD-1$、$DQ-1$ 为紧算子；见 Gilkey (1984)、Booss–Bleecker (1985)。本站作为外部引用列出。`,
    role: R`整个指标理论的分析学地基：只有 $\dim\ker D$、$\dim\operatorname{coker}D$ 有限，$\ind D$ 才有意义；"$\operatorname{im}D$ 闭"保证了定理 12.1 证明中的正交分解。`,
    pitfall: R`"紧"不可少：$\R$ 上的 $\dd/\dd x$ 是椭圆的，但核（常数）不平方可积、余核无穷维，不是 Fredholm 算子；习题 P12.1 正是非紧情形的补救。`,
  },
  "F:hodge12": {
    kind: "fact", n: "（12.16）–（12.18）", ch: "ch12", en: "Hodge theory for elliptic complexes", zh: "椭圆复形的 Hodge 理论", page: 477, eq: "12.16",
    stmt: R`设 $(E_i,D_i)$ 是紧流形上的椭圆复形，$\Delta_i=D_{i-1}D_{i-1}^\dagger+D_i^\dagger D_i$。则每个截面唯一地分解为 $s_i=D_{i-1}s_{i-1}+D_i^\dagger s_{i+1}+h_i$，$\Delta_ih_i=0$，三部分两两正交；且 $H^i(E,D)=\ker D_i/\operatorname{im}D_{i-1}\cong\ker\Delta_i$，故 $\dim H^i(E,D)=\dim\mathrm{Harm}^i(E,D)$。`,
    deps: ["T7.7", "T7.8", "X:elliptic-Fredholm"], status: "filled",
    statusNote: R`原书写"与 de Rham 理论一样可以证明"。本站在 §12.1.3 补出与第 7 章完全平行的论证：$\Delta_ih=0\iff D_ih=0$ 且 $D_{i-1}^\dagger h=0$；正交性来自 $D_iD_{i-1}=0$；同构 $[s]\mapsto h$ 由分解唯一性给出。`,
    role: R`把"上同调维数"（拓扑/代数量）变成"调和截面个数"（分析量），使 \eqref{12.19} 的两种写法相等——这是指标定理能把分析与拓扑连起来的第一步。`,
    key: R`$\langle h,\Delta_ih\rangle=\|D_ih\|^2+\|D_{i-1}^\dagger h\|^2$。`,
  },
  "F:rollup12": {
    kind: "fact", n: "（12.24）", ch: "ch12", en: "Rolling up an elliptic complex", zh: "椭圆复形的卷起（化为两项复形）", page: 478, eq: "12.24",
    stmt: R`令 $E_+=\oplus_rE_{2r}$，$E_-=\oplus_rE_{2r+1}$，$A=\oplus_r(D_{2r}+D_{2r-1}^\dagger):\Gamma(M,E_+)\to\Gamma(M,E_-)$。则 $A^\dagger A=\oplus_r\Delta_{2r}$，$AA^\dagger=\oplus_r\Delta_{2r+1}$，从而 $\ind(E_\pm,A)=\dim\ker A-\dim\ker A^\dagger=\sum_r(-1)^r\dim\ker\Delta_r=\ind(E,D)$。`,
    deps: ["12.22", "12.23a", "12.23b", "F:hodge12"], status: "filled",
    statusNote: R`原书"readily verify"。本站补出 \eqref{12.23a} 中交叉项 $D_{2r+1}D_{2r}=0$、$D_{2r}^\dagger D_{2r+1}^\dagger=0$ 的消去，以及 $\ker A=\ker A^\dagger A$。`,
    role: R`把任意长的椭圆复形压缩成一个算子 $A:E_+\to E_-$，于是所有指标定理都可以写成"$\dim\ker-\dim\ker^\dagger$"的形式；de Rham 复形卷起来就是 $\dd+\dd^\dagger$ 限制在偶形式上。`,
    pitfall: R`$A$ 不是 $\oplus D_{2r}$：必须同时加上伴随 $D^\dagger_{2r-1}$，否则 $A^\dagger A$ 不是 Laplace 算子，核也不对。`,
  },

  // ======================= §12.1 =======================
  "T12.1": {
    kind: "theorem", n: "12.1", ch: "ch12", en: "Cokernel ≅ kernel of the adjoint", zh: "余核同构于伴随算子的核", page: 476, eq: "12.12",
    stmt: R`设 $D:\Gamma(M,E)\to\Gamma(M,F)$ 是 Fredholm 算子。则 $\operatorname{coker}D\cong\ker D^\dagger\equiv\{s\in\Gamma(M,F)\mid D^\dagger s=0\}$。`,
    deps: ["12.8", "12.9", "12.13", "X:elliptic-Fredholm"], status: "filled",
    statusNote: R`原书 \eqref{12.13} 中的 $(D^\dagger D)^{-1}$ 当 $\ker D\neq0$ 时没有定义。本站补正：$D^\dagger s\in\operatorname{im}D^\dagger=(\ker D)^\perp$，而 $D^\dagger D$ 在 $(\ker D)^\perp$ 上可逆，所以 $(D^\dagger D)^{-1}$ 理解为在 $(\ker D)^\perp$ 上的逆即可。另外原书把单射与满射两步都写成"映射 $s_0\mapsto[s]$"，本站把二者理清为 $\ker D^\dagger\to\operatorname{coker}D$，$s_0\mapsto[s_0]$ 的满射性与单射性。`,
    role: R`把"余核"这个商空间换成一个可计算的子空间 $\ker D^\dagger$，得到物理中常用的 $\ind D=\dim\ker D-\dim\ker D^\dagger$（\eqref{12.11}）：正手征零模数减负手征零模数。`,
    key: R`单射性：若 $s_0-s_0'=Du$ 且 $D^\dagger(s_0-s_0')=0$，则 $\|Du\|^2=\langle u,D^\dagger Du\rangle=0$。`,
    pitfall: R`同构依赖于纤维度规（内积）的选取，但维数不依赖。有限维时它就是线性代数中的 $\mathbb{C}^n=\operatorname{im}A\oplus\ker A^\dagger$。`,
  },

  // ======================= §12.2 =======================
  "T12.2": {
    kind: "theorem", n: "12.2", ch: "ch12", en: "Atiyah–Singer index theorem", zh: "Atiyah–Singer 指标定理", page: 479, eq: "12.33",
    stmt: R`设 $(E,D)$ 是 $m$ 维无边紧流形 $M$ 上的椭圆复形。则它的指标为 $\ind(E,D)=(-1)^{m(m+1)/2}\int_M\mathrm{ch}\big(\oplus_r(-1)^rE_r\big)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}$，其中被积式只取 $m$ 形式部分。$m$ 为奇数时指标恒为零。`,
    deps: ["12.19", "X:splitting", "F:hodge12"], status: "note",
    statusNote: R`原书不给证明，只引 Atiyah–Singer (1968)、Shanahan (1978)、Palais (1965)、Gilkey (1984)（K 理论或热核方法）。本章 §12.7 给出热核思路，§12.9–12.10 用超对称量子力学证明了它在自旋复形上的特例（\sref{T12.6}）。除以 $e(TM)$ 是形式运算：在分裂原理下分子总含因子 $\prod_ix_i$，可以约去。`,
    role: R`本章的中心定理：左边是解析量（零模个数之差），右边是示性类积分（拓扑量）。de Rham、Dolbeault、符号差、自旋四个经典复形分别给出 Gauss–Bonnet–陈、Hirzebruch–Riemann–Roch、Hirzebruch 符号差与 $\hat A$ 亏格指标定理。`,
    key: R`右边只依赖于各 $E_r$ 的陈特征与 $TM$ 的示性类——在连续形变下不变，所以左边也不变（参见 \sref{T12.4}）。`,
    pitfall: R`整体符号 $(-1)^{m(m+1)/2}$ 与 $\mathrm{ch}$、$\mathrm{Td}$ 的约定相关；套用其他文献的公式时要统一约定。`,
  },
  "C12.1": {
    kind: "corollary", n: "12.1", ch: "ch12", en: "Index theorem for a two-term complex", zh: "两项复形的指标定理", page: 480, eq: "12.34",
    stmt: R`设 $\Gamma(M,E)\xrightarrow{D}\Gamma(M,F)$ 是两项椭圆复形。则 $\ind D=\dim\ker D-\dim\ker D^\dagger=(-1)^{m(m+1)/2}\int_M(\mathrm{ch}E-\mathrm{ch}F)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}$。`,
    deps: ["T12.2", "T12.1", "12.20"], status: "filled",
    statusNote: R`原书称"直接推论"。本站补出：两项复形 $E_0=E$、$E_1=F$，$\mathrm{ch}(E_0-E_1)=\mathrm{ch}E-\mathrm{ch}F$（陈特征对直和可加），左边由 \eqref{12.20} 与 \sref{T12.1} 化为 $\dim\ker D-\dim\ker D^\dagger$。`,
    role: R`自旋复形 \eqref{12.83}、扭曲自旋复形 \eqref{12.85} 都直接套用这一形式。`,
  },

  // ======================= §12.3–12.6 经典复形 =======================
  "F:deRham12": {
    kind: "fact", n: "（12.41）", ch: "ch12", en: "Index theorem for the de Rham complex (Gauss–Bonnet–Chern)", zh: "de Rham 复形的指标定理（Gauss–Bonnet–陈定理）", page: 481, eq: "12.41",
    stmt: R`设 $M$ 是无边紧可定向流形。则 $\chi(M)=\int_Me(TM)$；$\dim M$ 为奇数时两边都为零。二维时即 Gauss–Bonnet 定理 $\chi(M)=\frac1{2\pi}\int_M\mathcal{R}_{12}$。`,
    deps: ["T12.2", "12.37", "12.38", "X:splitting"], status: "filled",
    statusNote: R`原书由 \eqref{12.38} 直接写出 \eqref{12.39}。本站补出两处：(i) $\mathrm{ch}(\oplus(-1)^r\wedge^rT^*M^{\C})\,\mathrm{Td}=\prod_{i=1}^m x_i$，以及复化切丛的陈根成对 $x_{l+i}=-x_i$ 带来的符号 $(-1)^l$；(ii) 用 $e=\prod_{i\le l}x_i$ 约去后，总符号 $(-1)^{l(2l+1)}(-1)^l=+1$。`,
    role: R`第 11 章引用的 Gauss–Bonnet 定理（\sref{X:gauss-bonnet}）在此由 AS 定理推出：三角剖分算出的 $\chi$（拓扑）= 调和形式个数的交错和（分析）= 曲率的积分（几何）。`,
  },
  "F:HRR12": {
    kind: "fact", n: "（12.50）", ch: "ch12", en: "Hirzebruch–Riemann–Roch theorem", zh: "Hirzebruch–Riemann–Roch 定理", page: 483, eq: "12.50",
    stmt: R`设 $M$ 是无边紧复流形，$V$ 是 $M$ 上的全纯向量丛。则扭曲 Dolbeault 复形的指标为 $\ind\bar\partial_V=\sum_r(-1)^r\dim_{\C}H^{0,r}(M;V)=\int_M\mathrm{Td}(TM^+)\mathrm{ch}(V)$。复一维（亏格 $g$ 的 Riemann 面）时 $\ind\bar\partial_V=(1-g)\dim V+\int_Mc_1(V)$。`,
    deps: ["T12.2", "12.45", "12.48"], status: "filled",
    statusNote: R`原书 \eqref{12.51} 写 $\int_Mc_1(TM^+)=2-g$ 与 $(2-g)\dim V$，有误：亏格 $g$ 曲面 $\chi=2-2g$，故应为 $(1-g)\dim V$。本站已改正（见 §12.4.1 勘误框）。从 \eqref{12.46} 到 \eqref{12.48} 的化简原书引 Shanahan，本站补出分裂原理下的计算。`,
    role: R`代数几何中经典 Riemann–Roch 定理 $h^0(L)-h^1(L)=\deg L+1-g$ 的高维推广；物理上它数出复流形上（扭曲）的零模，例如 $S^2$ 上单极子背景中 Dirac 零模的个数。`,
    pitfall: R`指标只给出 $h^0-h^1$；单独的 $h^0$ 要再用消没定理（如 $\deg L>2g-2$ 时 $h^1=0$）。`,
  },
  "F:sign12": {
    kind: "fact", n: "（12.68）", ch: "ch12", en: "Hirzebruch signature theorem", zh: "Hirzebruch 符号差定理", page: 487, eq: "12.68",
    stmt: R`设 $M$ 是 $4k$ 维无边紧可定向 Riemann 流形。则符号差复形 $\mathfrak{D}_+:\Omega^+(M)\to\Omega^-(M)$ 的指标等于 Hirzebruch 符号差，且 $\tau(M)=\int_ML(TM)|_{\rm vol}$。四维时 $\tau(M)=\int_M\frac13p_1(TM)=-\frac1{24\pi^2}\int_M\mathrm{tr}\,\mathcal{R}^2$。`,
    deps: ["T12.2", "12.66", "12.54"], status: "note",
    statusNote: R`原书解析一侧（\eqref{12.65}–\eqref{12.67}）给出完整论证，本站补出 $\pi$ 与 $\mathfrak{D}$ 反对易的验证（\eqref{12.62}）以及配对映射 $\omega+\pi\omega\mapsto\omega-\pi\omega$ 为何保持核；拓扑一侧的化简原书引 Shanahan，本站只核对了最后一步的标度 $2^l\prod\frac{x_i/2}{\tanh(x_i/2)}\to\prod\frac{x_i}{\tanh x_i}$。`,
    role: R`证明了第 11 章引用的符号差定理（\sref{X:signature}）；推出 $p_1$ 在 4 维紧流形上的积分是 3 的倍数。`,
  },
  "F:spinAS12": {
    kind: "fact", n: "（12.83）、（12.85）", ch: "ch12", en: "Index theorem for (twisted) spin complexes", zh: "（扭曲）自旋复形的指标定理", page: 490, eq: "12.85",
    stmt: R`设 $M$ 是 $m=2l$ 维无边紧自旋流形，$E$ 是 $M$ 上带联络的复向量丛。则扭曲 Dirac 算子 $D_E:\Delta^+(M)\otimes E\to\Delta^-(M)\otimes E$ 的指标为 $\nu_+-\nu_-=\int_M\hat A(TM)\mathrm{ch}(E)|_{\rm vol}$；$E$ 为平凡线丛时为 $\nu_+-\nu_-=\int_M\hat A(TM)|_{\rm vol}$。`,
    deps: ["C12.1", "12.82", "T12.6"], status: "note",
    statusNote: R`原书直接写出结果，"不深入 Clifford 代数细节"。未扭曲的情形由 §12.10 的超对称路径积分证明（\sref{T12.6}）；扭曲情形的证明在第 13 章用热核完成（$\hat A=1$ 时）。`,
    role: R`物理中最常用的指标定理：瞬子背景中费米子零模数（\eqref{12.90}）、单极子背景中零模数（\eqref{12.89}），以及第 13 章的手征反常都由它给出。`,
    pitfall: R`$\hat A$ 只含 $4j$ 形式，所以未扭曲时 $m\not\equiv0\pmod4$ 的流形上 $\nu_+=\nu_-$，但不意味着二者都为零。`,
  },

  // ======================= §12.8 =======================
  "T12.3": {
    kind: "theorem", n: "12.3", ch: "ch12", en: "Atiyah–Patodi–Singer theorem", zh: "Atiyah–Patodi–Singer 定理", page: 498, eq: "12.123",
    stmt: R`设 $M$ 是奇数维流形，$\mathrm{i}\not\nabla(\mathcal{A}_t)$ 是 $M$ 上与外规范场 $\mathcal{A}_t$（$t\in[0,1]$）相互作用的 Dirac 算子。则 \eqref{12.122a} 的 $D$ 满足 $\ind D=\dim\ker D-\dim\ker D^\dagger=\int_{M\times I}\hat A(\mathcal{R})\mathrm{ch}(\mathcal{F})|_{\rm vol}-\frac12[\eta(\mathrm{i}\not\nabla(\mathcal{A}_1))-\eta(\mathrm{i}\not\nabla(\mathcal{A}_0))]$。`,
    deps: ["12.118", "12.119", "12.122a", "F:spinAS12"], status: "note",
    statusNote: R`原书不证明，引 Atiyah–Patodi–Singer (1975–76) 与 Alvarez-Gaumé 等 (1985)。$\ker D$ 等指在 $M\times I$ 上满足 APS 谱边界条件的截面。本站用例 12.8 与交互图 5 数值核对了等价形式 \eqref{12.125}：$\ind=-$谱流。`,
    role: R`带边流形上的指标定理：体积分（局部量）之外多出边界上的 $\eta$ 不变量（谱不对称）。结合 \eqref{12.124} 得到 $\ind=-$谱流，第 13 章用来研究奇数维宇称反常。`,
    key: R`$\eta$ 的变化 = 连续部分 + $2\times$谱流；连续部分正好被体积分抵消。`,
    pitfall: R`η 不变量本身不是拓扑不变量（随度规、联络连续变化），只有它的跳跃（谱流）是整数。`,
  },

  // ======================= §12.10 =======================
  "T12.4": {
    kind: "theorem", n: "12.4", ch: "ch12", en: "Stability of the index under small deformations", zh: "指标在小形变下不变", page: 508,
    stmt: R`数 $\ind\mathcal{D}$ 在 $\mathcal{D}$ 的"小"形变下不变。`,
    deps: ["12.161"], status: "filled",
    statusNote: R`原书证明的核心是"非零本征值成对"：$\psi_n=\mathcal{D}\phi_n/\sqrt{\lambda_n}$ 给出 $(\ker\mathcal{D})^\perp$ 与 $(\ker\mathcal{D}^\dagger)^\perp$ 中本征截面的一一对应。本站补出：(i) $\ker\mathcal{D}=\ker\mathcal{D}^\dagger\mathcal{D}$ 由 $\langle\phi,\mathcal{D}^\dagger\mathcal{D}\phi\rangle=\|\mathcal{D}\phi\|^2$ 推出；(ii) "小形变"应理解为在 Fredholm 算子中的连续形变；本征值连续变化时，离开零的模式必须带着一个配对伙伴，所以两边零模数同增同减。交互图 1 可以直接看到这一点。`,
    role: R`指标是"刚性"的：它不能连续地改变，因为它是整数且连续。这正是它能等于拓扑不变量（AS 定理右边）的根本原因，也是 \sref{T12.5} 中 $\beta$ 无关性的根源。`,
    key: R`$\mathcal{D}^\dagger\mathcal{D}$ 与 $\mathcal{D}\mathcal{D}^\dagger$ 的非零谱（含简并度）完全相同（\eqref{12.105}）。`,
  },
  "T12.5": {
    kind: "theorem", n: "12.5", ch: "ch12", en: "Heat-kernel (Witten-index) formula for the index", zh: "指标的热核（Witten 指标）表示", page: 508, eq: "12.162",
    stmt: R`设 $\mathcal{D}$ 是 Fredholm 微分算子。则对任意实数 $\beta>0$，$\ind\mathcal{D}=\mathrm{Tr}\,\mathrm{e}^{-\beta\mathcal{D}^\dagger\mathcal{D}}-\mathrm{Tr}\,\mathrm{e}^{-\beta\mathcal{D}\mathcal{D}^\dagger}$；特别地右边与 $\beta$ 无关。`,
    deps: ["T12.4", "12.105"], status: "checked",
    role: R`把指标写成 $\mathrm{Tr}\,\Gamma\mathrm{e}^{-\beta H}$（\eqref{12.165}）——超对称量子力学的 Witten 指标。$\beta\to\infty$ 只剩零模（解析指标）；$\beta\to0$ 由局部热核系数给出（拓扑指标）。两端相等就是指标定理。`,
    key: R`非零本征值的贡献 $\mathrm{e}^{-\beta\lambda_n}(\langle\phi_n|\phi_n\rangle-\langle\psi_n|\psi_n\rangle)=0$ 逐对抵消。`,
    pitfall: R`两个迹各自发散（$\beta\to0$ 时 $\sim\beta^{-m/2}$），只有差是有限的、与 $\beta$ 无关的。`,
  },
  "T12.6": {
    kind: "theorem", n: "12.6", ch: "ch12", en: "Index theorem for a spin complex", zh: "自旋复形的指标定理", page: 520, eq: "12.194",
    stmt: R`$M$ 上 Dirac 算子的指标为 $\ind Q=\int_M\hat A(M)$，其中 $\hat A(M)=\prod_{j=1}^n\frac{x_j/2}{\sinh x_j/2}$，$x_j$ 由 $\frac1{2\pi}\mathcal{R}_{\mu\nu}$ 的分块对角化定义（\eqref{12.193}）。`,
    deps: ["T12.5", "12.171", "12.175", "12.186", "12.188", "12.191"], status: "note",
    statusNote: R`这是"物理学家的证明"：路径积分测度、Grassmann 零模的归一化 $\mathcal{N}=\mathrm{i}^n$、只保留二阶涨落（$O(\beta)$ 修正因 $\beta$ 无关性必须为零）等步骤在数学上是形式的。本站逐步核对了 \eqref{12.181}–\eqref{12.191} 的代数（包括 Grassmann 换元的反 Jacobi 因子与 \eqref{12.188} 的 ζ 正规化），并在正文注明了 $\sin\to\sinh$ 的形式替换为何成立。`,
    role: R`本章用超对称量子力学完成的唯一一个完整证明：Witten 指标 $\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$ 在 $\beta\to0$ 时局域到常值圈，高斯积分给出 $\det^{1/2}\frac{\mathcal{R}/4\pi}{\sinh(\mathcal{R}/4\pi)}$。`,
    key: R`(i) 指标与 $\beta$ 无关 ⇒ 可取 $\beta\to0$，路径积分局域化；(ii) 周期边界下玻色与费米非零模行列式之比只依赖曲率 $\tilde{\mathcal{R}}$；(iii) 费米零模积分挑出 $2n$ 次项，即 $M$ 上的体积形式。`,
    pitfall: R`费米子用**周期**边界条件（因为插入了 $(-1)^F$），不是计算配分函数时的反周期边界条件。`,
  },
};
