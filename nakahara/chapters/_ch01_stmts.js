// 第 1 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书逐字符核对（原书笔误已在 statusNote 中注明并直接改正）。
const R = String.raw;
export const S = {
  // ======================= §1.1 分析力学 =======================
  "T1.1": {
    kind: "theorem", n: "1.1", ch: "ch01", en: "Noether's theorem", zh: "Noether 定理", page: 27, eq: "1.25",
    stmt: R`设 Hamilton 量 $H(q_k,p_k)$ 在无穷小坐标变换 $q_k\to q'_k=q_k+\varepsilon f_k(q)$ 下不变。则 $Q=\sum_kp_kf_k(q)$ 守恒。`,
    deps: ["1.20", "1.23"], status: "filled",
    statusNote: R`原书证明最后一步写成 $\varepsilon[H,Q]=\varepsilon\,\dd Q/\dd t$，应为 $-\varepsilon\,\dd Q/\dd t$（由 \eqref{1.23} 与反对称性）；结论不受影响。本站已改正。`,
    role: R`把"对称性"翻译成"守恒量"：中心势 ⇒ 角动量，平移不变 ⇒ 动量。守恒量同时是对称变换的生成元：$\delta q_i=\varepsilon[q_i,Q]$——量子化后这就是"对称性由与 $H$ 对易的算符生成"。`,
    key: R`动量作为余切矢量按 Jacobi 矩阵的逆变换：$p_i\to p_i-\varepsilon\sum_jp_j\,\partial f_j/\partial q_i$。把 $H$ 的一阶变化写出来，恰好是 Poisson 括号 $[H,Q]$。`,
    pitfall: R`变换只作用于坐标（点变换），动量的变换是被诱导出来的，不能令 $p'=p$。另外 $[H,Q]=-\dd Q/\dd t$，不要把符号弄反。`,
  },
  // ======================= §1.2 正则量子化 =======================
  "L1.1": {
    kind: "lemma", n: "1.1", ch: "ch01", en: "Momentum generates translations", zh: "动量生成平移", page: 34, eq: "1.47",
    stmt: R`算符 $\hat U(a)=\mathrm{e}^{-\mathrm{i}a\hat p}$ 满足 $\hat U(a)|x\rangle=|x+a\rangle$。`,
    deps: ["1.32"], status: "filled",
    statusNote: R`补全了 $[\hat x,\hat p^n]=\mathrm{i}n\hat p^{n-1}$ 的归纳，并说明"由幺正性得等号"实际还需要一个相位约定。`,
    role: R`由它推出坐标表象中 $\hat p=-\mathrm{i}\,\dd/\dd x$（\eqref{1.50}），进而得到 $\langle x|p\rangle$（\sref{P1.1}）与 Schrödinger 方程。`,
    key: R`$[\hat x,\hat U(a)]=a\hat U(a)$，即 $\hat x\hat U(a)=\hat U(a)(\hat x+a)$：$\hat U(a)$ 把 $\hat x$ 的本征值抬高 $a$。`,
    pitfall: R`幺正性只能确定 $\hat U(a)|x\rangle$ 与 $|x+a\rangle$ 相差一个模为 1 的相因子；取 $|x\rangle\equiv\hat U(x)|0\rangle$ 才能令它等于 1。`,
  },
  "P1.1": {
    kind: "proposition", n: "1.1", ch: "ch01", en: "Position–momentum overlap", zh: "位置与动量本征态的重叠", page: 35, eq: "1.55",
    stmt: R`$\langle x|p\rangle=\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{\mathrm{i}px}$，$\langle p|x\rangle=\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\mathrm{i}px}$。`,
    deps: ["L1.1", "1.50", "1.36", "1.37"], status: "filled",
    statusNote: R`原书把 (1.56) 留作习题，本站补全。`,
    role: R`动量本征态在坐标表象中是平面波：波函数的两种表象由 Fourier 变换联系（\eqref{1.57}）；路径积分推导（\sref{P1.2}）与自由粒子传播子 \eqref{1.101} 都要插入它。`,
    key: R`$\hat p$ 在坐标表象中是 $-\mathrm{i}\,\dd/\dd x$，所以 $\langle x|p\rangle$ 满足一阶常微分方程；常数由 $\delta$ 函数归一化 $\int\dd p\,\mathrm{e}^{\mathrm{i}p(x-y)}=2\pi\delta(x-y)$ 确定。`,
    pitfall: R`归一化常数只确定到一个相位，约定取实数 $C>0$。$\hbar\neq1$ 时为 $(2\pi\hbar)^{-1/2}\mathrm{e}^{\mathrm{i}px/\hbar}$。`,
  },
  // ======================= §1.3 路径积分 =======================
  "L1.2": {
    kind: "lemma", n: "1.2", ch: "ch01", en: "Fresnel integral", zh: "Fresnel 积分", page: 41, eq: "1.91",
    stmt: R`设 $a$ 为正常数。则 $\displaystyle\int_{-\infty}^{\infty}\mathrm{e}^{-\mathrm{i}ap^2}\,\dd p=\sqrt{\frac{\pi}{\mathrm{i}a}}$。`,
    deps: [], status: "filled",
    statusNote: R`补全了圆弧路径 2、4 的贡献趋于零的估计（Jordan 不等式）。`,
    role: R`路径积分中每个"动量积分"与"中间位置积分"都是这种振荡 Gauss 积分；它产生前因子 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$。`,
    key: R`把积分围道转到 $z=(1-\mathrm{i})x$ 的直线上，振荡积分变成普通的衰减 Gauss 积分；被积函数解析，Cauchy 定理保证结果不变。`,
    pitfall: R`$\sqrt{\mathrm{i}}$ 要取 $\mathrm{e}^{\mathrm{i}\pi/4}$（主值）；$a<0$ 时结果是 $\sqrt{\pi/\mathrm{i}a}=\mathrm{e}^{\mathrm{i}\pi/4}\sqrt{\pi/|a|}$，围道要转向另一侧。`,
  },
  "P1.2": {
    kind: "proposition", n: "1.2", ch: "ch01", en: "Short-time transition amplitude", zh: "无穷小时间的跃迁振幅", page: 41, eq: "1.92",
    stmt: R`设 $\hat H=\hat p^2/2m+V(\hat x)$，$\varepsilon$ 为无穷小正数。则对任意 $x,y\in\mathbb{R}$，$\langle x|\mathrm{e}^{-\mathrm{i}\hat H\varepsilon}|y\rangle=\sqrt{\dfrac{m}{2\pi\mathrm{i}\varepsilon}}\exp\left[\mathrm{i}\varepsilon\left\{\dfrac m2\left(\dfrac{x-y}{\varepsilon}\right)^2-V\left(\dfrac{x+y}{2}\right)\right\}+\mathcal{O}(\varepsilon^2)+\mathcal{O}(\varepsilon(x-y)^2)\right]$。`,
    deps: ["L1.2", "P1.1", "1.36"], status: "filled",
    statusNote: R`原书 (1.92) 的前因子印作 $1/\sqrt{2\pi\mathrm{i}\varepsilon}$（漏了 $m$），本站按原书证明的最后一行改为 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$；证明中配方与 $p\partial_x$ 项的两个符号印反、相互抵消，本站一并改正，并补全了 $\mathcal{O}(\varepsilon)$ 项的逐项核算。`,
    role: R`路径积分的"原子"：把有限时间的振幅切成 $n$ 段，每段用这个公式，就得到 \eqref{1.95}–\eqref{1.97}。指数恰是短时间的作用量 $\Delta S$。`,
    key: R`把 $\mathrm{e}^{-\mathrm{i}\varepsilon\hat H_x}$ 越过平面波 $\mathrm{e}^{\mathrm{i}kx}$ 时 $\partial_x\to\partial_x+\mathrm{i}k$；对 $k$ 配方后做 Fresnel 积分，一阶修正 $\tfrac{\mathrm{i}\varepsilon}{2}(x-y)V'(x)$ 把 $V(x)$ 平移成 $V(\tfrac{x+y}{2})$（Weyl 排序）。`,
    pitfall: R`$x-y$ 并不小——只是 $|x-y|\gg\sqrt\varepsilon$ 的区域因快速振荡在分布意义下贡献为零。所以误差项要写成 $\mathcal{O}(\varepsilon(x-y)^2)$，它与 $\mathcal{O}(\varepsilon^2)$ 同阶。`,
  },
  // ======================= §1.5 费米子 =======================
  "P1.3": {
    kind: "proposition", n: "1.3", ch: "ch01", en: "Pfaffian and determinant", zh: "Pfaffian 的平方是行列式", page: 64, eq: "1.189",
    stmt: R`设 $a$ 是 $2n$ 阶反对称矩阵，定义其 **Pfaffian** $\operatorname{Pf}(a)=\dfrac{1}{2^nn!}\sum_P\operatorname{sgn}(P)a_{i_1i_2}\ldots a_{i_{2n-1}i_{2n}}$（对 $\{i_1,\ldots,i_{2n}\}$ 的全部置换 $P$ 求和）。则 $\det a=\operatorname{Pf}(a)^2$。`,
    deps: ["1.181", "1.187"], status: "filled",
    statusNote: R`原书证明中的换元 $\eta_k^*=(\theta_k-\theta'_k)/\sqrt2\mathrm{i}$ 不能把 $\theta a\theta+\theta'a\theta'$ 化成 $2\eta^*a\eta$；本站改用 $\eta_k=(\theta_k+\mathrm{i}\theta'_k)/\sqrt2$、$\eta_k^*=(\theta_k-\mathrm{i}\theta'_k)/\sqrt2$，并用"取标准形定常数"代替逐项追踪 Jacobi 因子。交互图 3 对随机整数矩阵逐个验证。`,
    role: R`把"实"费米子（Majorana）的 Gauss 积分 $\int\dd\theta\,\mathrm{e}^{\frac12\theta a\theta}=\operatorname{Pf}(a)$ 与"复"费米子的 $\det$ 联系起来；第 11 章 Euler 类的定义 $e(F)=\operatorname{Pf}(F/2\pi)$ 正是这个 Pfaffian。`,
    key: R`把两份实 Grassmann 积分相乘，合成一份复 Grassmann 积分：$\eta=(\theta+\mathrm{i}\theta')/\sqrt2$。Jacobi 因子与 $a$ 无关，用标准形 $\mathrm{diag}(J,\ldots,J)$ 定出它等于 1。`,
    pitfall: R`$\operatorname{Pf}(a)$ 有符号，而 $\sqrt{\det a}$ 只确定到符号；在 $a\to O^{\rm t}aO$ 下 $\operatorname{Pf}$ 乘 $\det O$（可以变号）。奇数阶反对称矩阵的行列式恒为零。`,
  },
  "L1.3": {
    kind: "lemma", n: "1.3", ch: "ch01", en: "Completeness of fermionic coherent states", zh: "费米相干态的完备性", page: 66, eq: "1.197",
    stmt: R`设 $|\theta\rangle=|0\rangle+|1\rangle\theta$，$\langle\theta|=\langle0|+\theta^*\langle1|$。则完备性关系为 $\displaystyle\int\dd\theta^*\dd\theta\,|\theta\rangle\langle\theta|\mathrm{e}^{-\theta^*\theta}=I$。`,
    deps: ["1.179", "1.194", "1.195"], status: "filled",
    statusNote: R`补全了逐项的 Grassmann 积分（哪些项有贡献、符号从何而来）。`,
    role: R`费米子路径积分的"切片"工具：在每个时间步插入它，就把 $\Tr\,\mathrm{e}^{-\beta H}$ 写成 Grassmann 变量的多重积分（\sref{L1.4}、\eqref{1.200}）。`,
    key: R`相干态不正交（$\langle\theta'|\theta\rangle=\mathrm{e}^{\theta'^*\theta}$），权重 $\mathrm{e}^{-\theta^*\theta}$ 正好补偿；只有同时含 $\theta^*$ 与 $\theta$ 的项对 Berezin 积分有贡献。`,
    pitfall: R`$\int\dd\theta^*\dd\theta\,\theta^*\theta=-1$ 而 $\int\dd\theta^*\dd\theta\,\theta\theta^*=+1$：积分测度的顺序与被积单项式的顺序都要盯紧。`,
  },
  "L1.4": {
    kind: "lemma", n: "1.4", ch: "ch01", en: "Fermionic trace", zh: "费米子的迹：反周期边界", page: 67, eq: "1.199",
    stmt: R`设 $H$ 为费米谐振子的 Hamilton 量。则配分函数可写为 $\Tr\,\mathrm{e}^{-\beta H}=\displaystyle\int\dd\theta^*\dd\theta\,\langle-\theta|\mathrm{e}^{-\beta H}|\theta\rangle\mathrm{e}^{-\theta^*\theta}$。`,
    deps: ["L1.3"], status: "filled",
    statusNote: R`补全了最后一步：逐项比较 $\langle-\theta|X|\theta\rangle$ 的展开；并指出若用 $\langle\theta|$ 得到的是 $\Tr[(-1)^FX]$。`,
    role: R`说明费米子的迹对应虚时间上的**反周期**边界条件 $\theta(\beta)=-\theta(0)$，从而得到反周期 Matsubara 频率 $\pi(2n+1)/\beta$、$\cosh$ 的乘积公式（\eqref{1.205}）；周期边界条件给出指标 $\Tr(-1)^F\mathrm{e}^{-\beta H}$——第 12 章指标定理的路径积分证明的起点。`,
    key: R`插入完备性关系后，含奇数个 Grassmann 生成元的项积分为零，可以随意改变它的符号；把 $\theta^*\to-\theta^*$ 后整体重组为 $\langle-\theta|$。`,
    pitfall: R`负号来自把 Grassmann 数 $\theta$ 从右矢的系数移到左矢 $\langle n|$ 的另一侧时的反对易，而不是什么"物理"假设。`,
  },
};
