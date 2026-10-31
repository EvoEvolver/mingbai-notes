// 第 14 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书（PDF pp. 548–579）逐字符核对；原书笔误在 statusNote 中注明，正文已直接改正。
// 注意：String.raw 中不要让 $ 紧跟 {（会被当成插值）。
const R = String.raw;
export const S = {
  // ======================= §14.1 Riemann 面上的微分几何 =======================
  "F:adj14": {
    kind: "fact", n: "（14.23）", ch: "ch14", en: "Adjointness of the two covariant derivatives", zh: "两种协变导数互为（负）伴随", page: 552, eq: "14.23a",
    stmt: R`对 Riemann 面上螺旋度 $n$ 的张量空间 $\mathcal{T}^n$，取全纯坐标变换下不变的内积 $(T,U)=\int\dd^2z\sqrt g(g_{z\bar z})^n\bar TU$，则 $(\nabla^z_{(n)})^\dagger=-\nabla_z^{(n+1)}$，$(\nabla_z^{(n)})^\dagger=-\nabla^z_{(n-1)}$。`,
    deps: ["14.21a", "14.22"], status: "filled",
    statusNote: R`原书 p. 552 的分部积分中把 $\mathrm{e}^{2(n+1)\sigma}$ 误印为 $\mathrm{e}^{(2n+1)\sigma}$、把 $2(n+1)(\partial_z\sigma)$ 误印为 $(2n+1)(\partial_z\sigma)$，最后一个等号多了一道复共轭横线；本站已改正并补出 (14.23b) 的证明（习题 14.2）。`,
    role: R`两个 Laplace 算子 $\Delta^\pm_{(n)}$ 因此是非负自伴算子，$\ker\nabla=\ker\Delta$，Riemann–Roch 定理（\sref{T14.1}）才能用热核计算；弦测度中 $P_1^\dagger$ 的复形式 \eqref{14.101a} 也由此而来。`,
    key: R`$\sqrt g(g_{z\bar z})^{n+1}\cdot g^{z\bar z}=\sqrt g(g_{z\bar z})^n$：升一个指标恰好吃掉一个度规因子，分部积分后剩下的 $\partial_z(\mathrm{e}^{2(n+1)\sigma}U)$ 正是 $\mathrm{e}^{2(n+1)\sigma}\nabla_z^{(n+1)}U$。`,
    pitfall: R`内积对第一个变量是反线性的；分部积分作用在 $\bar U$ 上时 $\partial_{\bar z}\bar U=(\partial_zU)^*$，所以伴随里出现的是 $\nabla_z$ 而不是 $\nabla_{\bar z}$。`,
  },
  "T14.1": {
    kind: "theorem", n: "14.1", ch: "ch14", en: "Riemann–Roch theorem", zh: "Riemann–Roch 定理", page: 553, eq: "14.27",
    stmt: R`设 $\Sigma_g$ 是亏格 $g$ 的 Riemann 面。则算子 $\nabla_z^{(n)}$ 的指标为 $\dim_{\C}\ker\nabla_z^{(n)}-\dim_{\C}\ker\nabla^z_{(n-1)}=(2n-1)(g-1)$。`,
    deps: ["F:adj14", "T12.5", "T12.2", "14.24a", "14.25"], status: "filled",
    statusNote: R`原书按 D'Hoker–Phong 用热核微扰展开证明，只给出两个 Gauss 积分的结果。本站补出：对 $s$ 的积分 $\int_0^t(t-s)(2s-t)\,\dd s/2\pi t^3=-1/12\pi$、$\int_0^t(t-s)\,\dd s/4\pi t^2=1/8\pi$；由 \eqref{14.25} 推出 \eqref{14.29b}；并改正原书第二个 Gauss 积分中间一步漏掉的 $|w|^2$。所用约定 $\dd^2z=2\,\dd\xi^1\dd\xi^2$ 也在正文中写明。`,
    role: R`弦测度的全部"计数"都从这里来：取 $n=-1$ 得 $\dim\ker P_1-\dim\ker P_1^\dagger=3-3g$（\eqref{14.113}），即"共形 Killing 向量数 − 二次微分数 $=3\chi/2$"，由此得到 Teichmüller 空间的维数 \eqref{14.38} 与 CKV 数 \eqref{14.58}。`,
    key: R`指标 $=\mathrm{Tr}\,\mathrm{e}^{-t\Delta^-_{(n)}}-\mathrm{Tr}\,\mathrm{e}^{-t\Delta^+_{(n-1)}}$ 与 $t$ 无关，取 $t\to0$ 只剩热核对角元的常数项 $\frac{1\mp3n}{12\pi}\Delta\sigma$；它是全导数 $\propto\sqrt g\mathcal{R}$，积分给出 Euler 示性数。`,
    pitfall: R`指标只给出两个核维数之差；要得到各自的值还需"消没定理"（如 $g\ge2$ 时没有全纯向量场，$g=0$ 时没有全纯二次微分），这些在 \eqref{14.58}、\eqref{14.118} 中是作为已知事实引用的。`,
  },
  // ======================= §14.2 玻色弦的量子理论 =======================
  "F:teich14": {
    kind: "fact", n: "（14.38）、（14.58）、（14.118）", ch: "ch14", en: "Dimensions of Teichmüller space and of the CKV", zh: "Teichmüller 空间与共形 Killing 向量的维数", page: 558, eq: "14.38",
    stmt: R`亏格 $g$ 的 Riemann 面上，共形 Killing 向量（$\ker P_1$）的实维数 $k$ 与 Teichmüller 空间（$\ker P_1^\dagger$，即全纯二次微分）的实维数为：$g=0$：$k=6$，$\dim_{\R}\mathrm{Teich}=0$；$g=1$：$k=2$，$\dim_{\R}\mathrm{Teich}=2$；$g\ge2$：$k=0$，$\dim_{\R}\mathrm{Teich}=6g-6$。`,
    deps: ["T14.1", "X:max-principle"], status: "filled",
    statusNote: R`原书引"Riemann 面的一般理论"。本站补出：由 \sref{T14.1}（$n=-1$）两者之差（复维数）为 $3-3g$；再用次数论证——全纯 $m$ 次微分是 $K^m$ 的截面，$\deg K^m=m(2g-2)$；负次数的线丛没有非零全纯截面，所以 $g\ge2$ 时没有 CKV、$g=0$ 时没有二次微分；$g=1$ 时 $K$ 平凡，两者都是常数（\sref{X:max-principle}），各 1 个复维数。原书表 \eqref{14.118} 中 $g=0$ 的模群误印为 $\mathrm{SL}(2,R)$，应为平凡群。`,
    role: R`决定了每个亏格的路径积分里剩下多少个有限维积分（模参数 $\dd^nt$）和多少个要除掉的对称体积 $V(\mathrm{CKV})$；$g=0$ 时 Teich 是一点而 $\mathrm{SL}(2,\C)$ 体积无穷，所以 $Z_0=0$。`,
    key: R`实维数 $\dim\mathrm{Teich}-k=6g-6=-3\chi$ 对所有 $g$ 成立；单独的两个数要靠消没定理分开。`,
    pitfall: R`$6g-6$ 只在 $g\ge2$ 时等于 Teichmüller 空间的维数；$g=1$ 时它是 $0=2-2$，$g=0$ 时是 $-6=0-6$。`,
  },
  "X:polyakov14": {
    kind: "cited", n: "（14.84）", ch: "ch14", en: "Polyakov's conformal anomaly", zh: "Polyakov 共形反常", page: 567, eq: "14.84a",
    stmt: R`在 Weyl 变换 $\gamma\to\mathrm{e}^{2\phi}\gamma$ 下，测度按 $\mathcal{D}X\to\exp\big(\frac{D}{24\pi}\int\dd^2\xi\sqrt\gamma(\gamma^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi+\mathcal{R}\phi)\big)\mathcal{D}X$、$\mathcal{D}\gamma\to\exp\big(\frac{-26}{24\pi}\int\dd^2\xi\sqrt\gamma(\gamma^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi+\mathcal{R}\phi)\big)\mathcal{D}\gamma$ 变换。故 $\mathcal{D}X\mathcal{D}\gamma$ 共形不变当且仅当 $D=26$。`,
    deps: ["T14.1"], status: "note",
    statusNote: R`原书引 Polyakov (1981)，不给推导。原书系数印作 $\frac{D}{24\pi^2}$、$\frac{-26}{24\pi^2}$；按 $\int\sqrt\gamma\mathcal{R}=4\pi\chi$ 的归一化，正确系数是 $\frac{c}{24\pi}$（常数 $\phi$ 时给出 $Z\propto\mathrm{e}^{c\chi\phi/6}$，即熟知的 $c\chi/6$ 标度律），本站已改正。临界维数的结论不受影响。`,
    role: R`临界维数 $D=26$ 的来源：只有此时世界面的 Weyl 对称性在量子层面保留，$\int\mathcal{D}\phi$ 才能整体地除掉。`,
    key: R`26 来自鬼场（Faddeev–Popov 行列式 $\det' P_1^\dagger P_1$）的中心荷 $-26$；每个 $X^\mu$ 贡献 $+1$。`,
    pitfall: R`反常不是作用量 $S$ 的性质（经典作用量完全 Weyl 不变 \eqref{14.36}），而是测度的性质：定义测度的度规 \eqref{14.54} 依赖 $\gamma$ 的共形因子（习题 14.3）。`,
  },
  "F:Zg14": {
    kind: "fact", n: "（14.94）、（14.117）", ch: "ch14", en: "The g-loop partition function", zh: "$g$ 圈配分函数", page: 569, eq: "14.94",
    stmt: R`$D=26$ 时，亏格 $g$ 的真空振幅化为模空间上的有限维积分：$Z_g=\int_{\mathrm{Mod}}\frac{\dd^nt}{V(\mathrm{CKV})}\frac{\det(T,\psi)}{\det^{1/2}(\psi,\psi)\det^{1/2}(\Phi,\Phi)}[\det'P_1^\dagger P_1]^{1/2}\Big(\frac{\det'\Delta}{\int\dd^2\xi\sqrt\gamma}\Big)^{-13}$；复形式为 \eqref{14.117}。`,
    deps: ["T14.1", "F:teich14", "X:polyakov14"], status: "filled",
    statusNote: R`原书 \eqref{14.83} 中被积测度的 $\mathcal{D}\tilde X$ 误印为 $\det\tilde X$；"(14.95) 化为" 应为 "(14.94) 化为"。本站补出了 Gauss 积分 $\int\dd^n\delta t\exp(-\frac12\delta t^\top Q\,\delta t)\propto(\det Q)^{-1/2}$ 中 $Q=(T,\psi)(\psi,\psi)^{-1}(\psi,T)$ 的行列式 $\det(T,\psi)^2/\det(\psi,\psi)$。`,
    role: R`本章的主结果：无穷维路径积分 = 模参数的有限维积分 × 三个行列式（鬼场 $\det'P_1^\dagger P_1$、物质 $(\det'\Delta)^{-13}$、模的 Jacobi 因子）。\sref{F:Z114} 是 $g=1$ 的显式计算。`,
    key: R`度规变形的正交分解 $\{\delta\gamma\}=\{\text{conf}\}\oplus\{\operatorname{im}P_1\}\oplus\{\ker P_1^\dagger\}$：Weyl 方向由 $D=26$ 消去，微分同胚方向给出 $V(\mathrm{Diff})$ 与鬼行列式，剩下的有限维方向就是模参数。`,
    pitfall: R`CKV（$\ker P_1$）既属于 Diff 又能被 Weyl 抵消，必须单独除以 $V(\mathrm{CKV})$；否则 $g=0,1$ 时重复计数。`,
  },
  "T14.2": {
    kind: "theorem", n: "14.2", ch: "ch14", en: "Uniformization theorem", zh: "单值化定理", page: 574, eq: "14.119",
    stmt: R`亏格 $g$ 的 Riemann 面 $\Sigma_g$ 共形等价于一个常曲率 Riemann 面：$g=0$ 时为 $\C\cup\{\infty\}$，度规 $\dd s^2=\dd z\otimes\dd\bar z/(1+z\bar z)^2$，$\mathcal{R}>0$；$g=1$ 时为 $\C/L$（$L$ 为格），$\dd s^2=\dd z\otimes\dd\bar z$，$\mathcal{R}=0$；$g\ge2$ 时为 $H/G$（$H$ 为上半平面，$G\subset\mathrm{SL}(2,\R)$ 为 Fuchs 群），$\dd s^2=\dd z\otimes\dd\bar z/(\mathrm{Im}\,z)^2$，$\mathcal{R}<0$。`,
    deps: ["D8.1"], status: "note",
    statusNote: R`原书引 Farkas–Kra (1980)，不给证明。三种度规的标量曲率（习题 14.6）本站已按 \eqref{14.20b} 逐一算出：$\mathcal{R}=8$、$0$、$-2$。原书定理陈述中"a torus with genus $g$"应理解为"亏格 $g$ 的 Riemann 面"。`,
    role: R`让我们在规范切片中总可以取常曲率度规——相当于选定一组特殊的 Beltrami 微分；由此定义 Weil–Petersson 测度 \eqref{14.120}，并在 $g=1$ 时直接用平坦环面 $\C/L(1,\tau)$ 计算 \eqref{14.122}。`,
    key: R`曲率符号由 Gauss–Bonnet 决定：$\int\sqrt\gamma\mathcal{R}=4\pi\chi=4\pi(2-2g)$。`,
    pitfall: R`单值化给出的是共形类中的代表；同一个共形类在 $g=1$ 时由 $\tau$ 标记，$g\ge2$ 时由 Fuchs 群（$6g-6$ 个实参数）标记。`,
  },
  // ======================= §14.3 单圈振幅 =======================
  "X:kronecker14": {
    kind: "cited", n: "（14.136）、（14.139）", ch: "ch14", en: "Kronecker's first limit formula and the functional equation", zh: "Kronecker 第一极限公式与函数方程", page: 578, eq: "14.136",
    stmt: R`非全纯 Eisenstein 级数 $E(\tau,s)=\sum'_{m,n}\tau_2^s/|m+\tau n|^{2s}$ 在 $\mathrm{Re}\,s>1$ 收敛，可解析延拓到全平面，只在 $s=1$ 有单极点：$E(\tau,s)=\frac{\pi}{s-1}+2\pi[\gamma-\ln2-\ln(\sqrt{\tau_2}|\eta(\tau)|^2)]+\mathcal{O}(s-1)$；并满足 $\pi^{-s}\Gamma(s)E(\tau,s)=\pi^{-(1-s)}\Gamma(1-s)E(\tau,1-s)$。`,
    deps: [], status: "note",
    statusNote: R`原书引 Siegel (1980)、Lang (1987)。本站交互图 3 用三种独立方法数值核对：直接格点求和、Chowla–Selberg（Fourier–Bessel）展开、Laurent 近似；三者在 $s\to1$ 时一致到 $\mathcal{O}(s-1)$。`,
    role: R`把发散的无穷乘积 $\det'\Delta=\prod'\frac{2\pi^2}{\tau_2^2}|m+\tau n|^2$ 正规化：$\ln\det'\Delta=-\partial_s\zeta_\Delta(0)$，而 $\zeta_\Delta(s)\propto\tau_2^sE(\tau,s)$；函数方程把 $s=0$ 的值换到 $s=1$ 附近，由极限公式读出。`,
    key: R`由函数方程与极限公式比较 $s^0$、$s^1$ 系数，得 $E(\tau,0)=-1$、$E'(\tau,0)=-2[\ln2\pi+\ln(\sqrt{\tau_2}|\eta|^2)]$。`,
  },
  "F:Z114": {
    kind: "fact", n: "（14.142）、（14.144）", ch: "ch14", en: "The one-loop amplitude of the closed bosonic string", zh: "闭玻色弦的单圈振幅", page: 579, eq: "14.142",
    stmt: R`闭的、可定向玻色弦（$D=26$）的单圈真空振幅为 $Z_1=\int_{\mathrm{Mod}}\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta(\tau)|^{-48}=\int_{\mathrm{Mod}}\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\Delta(\tau)|^{-2}$（略去无关常数），积分区域为模空间 $H/\mathrm{SL}(2,\Z)$ 的基本区域。`,
    deps: ["F:Zg14", "T14.2", "X:kronecker14"], status: "filled",
    statusNote: R`原书 \eqref{14.137} 中 $\eta$ 的乘积下限误印为 $n>1$，应为 $n\ge1$（否则 $\eta$ 不满足 \eqref{14.147}）。本站补出：环面上 CKV 体积 $\tau_2^2$、Weil–Petersson 因子 $\tau_2^{-1}$、$\int\dd^2z=\tau_2$ 的来源；$\det'\Delta/\tau_2$ 在 $\tau\to\tau'$ 下的不变性（谱整体缩放 $|c\tau+d|^2$ 而 $\zeta_\Delta(0)=-1$）；以及习题 14.7 的完整证明。`,
    role: R`本章全部机器的检验：被积函数与测度分别模不变，所以对 $\mathrm{SL}(2,\Z)$ 的基本区域积分有意义；被积函数在 $\tau_2\to\infty$ 时 $\sim\mathrm{e}^{4\pi\tau_2}\tau_2^{-14}$ 发散——这是迅子（tachyon）的信号。`,
    key: R`$\det'\Delta/\tau_2=\tau_2|\eta|^4$（常数除外）：$-13$ 次幂来自 26 个 $X^\mu$，$+1$ 次幂来自鬼场 $\det'\Delta^+_{(1)}=\det'\Delta$，合起来是 $-12$ 次——24 个横向自由度。`,
    pitfall: R`积分是对模空间（基本区域），不是对 Teichmüller 空间（整个上半平面）；后者会把每个环面数无穷多次。`,
  },
  "F:modinv14": {
    kind: "fact", n: "（14.147）", ch: "ch14", en: "Modular invariance of the one-loop integrand", zh: "单圈被积函数的模不变性", page: 579, eq: "14.147",
    stmt: R`$\eta(\tau+1)=\mathrm{e}^{\pi\mathrm{i}/12}\eta(\tau)$，$\eta(-1/\tau)=(-\mathrm{i}\tau)^{1/2}\eta(\tau)$（取 $z>0$ 时 $\sqrt z>0$ 的分支）。因此 $\dd^2\tau/\tau_2^2$ 与 $\tau_2^{-12}|\eta(\tau)|^{-48}$ 在 $\tau\to\tau+1$、$\tau\to-1/\tau$ 下各自不变。`,
    deps: ["14.137"], status: "filled",
    statusNote: R`原书作为习题 14.7。本站给出完整解答：第一式由乘积直接得到；第二式用 $\ln\eta$ 的 Lambert 级数与 Eisenstein 级数 $E_2$ 的准模性，或更简单地用 \eqref{14.141} 的谱论证（$\det'\Delta/\tau_2$ 只依赖于格本身）推出 $\tau_2|\eta|^4$ 的不变性；交互图 1 数值核对到 $10^{-13}$。`,
    role: R`保证 $Z_1$ 只依赖于环面的共形类：被积函数是模空间上的函数，测度 $\dd^2\tau/\tau_2^2$ 是上半平面的 $\mathrm{SL}(2,\R)$ 不变测度（Poincaré 度规的面积元）。`,
    key: R`$\mathrm{Im}(-1/\tau)=\tau_2/|\tau|^2$，$|\eta(-1/\tau)|^{48}=|\tau|^{24}|\eta|^{48}$：两个 $|\tau|^{24}$ 相消。`,
  },
};
