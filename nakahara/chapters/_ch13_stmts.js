// 第 13 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 原书本章只有一个编号陈述（命题 13.1）；其余在证明链上起作用的论断登记为 F:…（未编号论断）或 X:…（外部引用）。
// 注意：String.raw 中 "$" 不能紧跟 "{"（会被当成模板插值）。
const R = String.raw;
export const S = {
  // ======================= 外部引用 =======================
  "X:AG1984": {
    kind: "cited", n: "（Alvarez-Gaumé–Ginsparg 1984）", ch: "ch13", en: "Adiabatic computation of the local winding numbers", zh: "局部卷绕数为 ±1", page: 542,
    stmt: R`在 $\det\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 的每个孤立零点 $p_i=(t_i,\theta_i)$ 处，局部卷绕数 $m_i=\pm1$；并且 $(m+2)$ 维 Dirac 算子 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$ 在 $p_i$ 处恰有一个零模，其 $(m+2)$ 维手征 $\chi=m_i$。`,
    deps: [], status: "note",
    statusNote: R`原书只引用 Alvarez-Gaumé 与 Ginsparg (1984) 的绝热微扰计算，不给证明。本站同样作为外部结果使用，并在正文中说明其物理图像：在 $p_i$ 附近只有一个本征值 $\lambda_n(t,\theta)$ 穿过零，它在复平面上绕原点一圈（正或反向），与 $(m+2)$ 维算子的一个手征零模一一对应。`,
    role: R`把 $m$ 维手征行列式的相位卷绕（非阿贝尔反常）与 $(m+2)$ 维的指标（阿贝尔反常）连起来的关键一环。`,
  },

  // ======================= §13.2 阿贝尔反常 =======================
  "F:fujikawa13": {
    kind: "fact", n: "（13.28）（13.35）", ch: "ch13", en: "Fujikawa: the Jacobian is the index", zh: "Fujikawa：Jacobian 即指标", page: 526, eq: "13.35",
    stmt: R`在 $m=2l$ 维紧致欧氏流形上（背景几何平凡，$\hat A(TM)=1$），手征转动的路径积分 Jacobian 经 Gauss 截断正规化后为 $\int\dd x\,\boldsymbol{A}(x)=\sum_i\langle\psi_i|\gamma^{m+1}\mathrm{e}^{-(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}/M)^2}|\psi_i\rangle\big|_{M\to\infty}=\nu_+-\nu_-=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$，且 $\nu_+-\nu_-=\int_M\mathrm{ch}_l(\mathcal{F})=\int_M\frac1{l!}\Tr\big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\big)^l$。局部地（$m=4$）$\boldsymbol{A}(x)=-\frac{1}{32\pi^2}\Tr\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}$，反常的守恒律为 $\partial_\mu j^\mu_{m+1}=-2\mathrm{i}\boldsymbol{A}(x)$。`,
    deps: ["13.22", "13.25", "13.26", "13.27", "13.29", "13.31"], status: "filled",
    statusNote: R`(a) 原书 \eqref{13.33}–\eqref{13.35} 把 $\partial_\mu j^\mu$ 与 $\boldsymbol{A}(x)$ 之间的因子 $-2\mathrm{i}$ 丢掉了；本站按 \eqref{13.25} 改正（见正文勘误框）。(b) 补出非零模成对抵消、平面波计算中 $\mathrm{tr}\,\gamma^5\gamma^\kappa\gamma^\lambda\gamma^\mu\gamma^\nu=-4\epsilon^{\kappa\lambda\mu\nu}$ 与动量积分的每一步，并说明为何高阶项在 $M\to\infty$ 时消失。交互图 1 在环面常磁场背景上数值验证"截断后的和与 $M$ 无关且等于 $\int\mathrm{ch}_1$"。`,
    role: R`本章的出发点：反常不是计算的瑕疵，而是路径积分测度对手征转动不变性的破坏，其大小恰是 Dirac 算子的指标——一个拓扑不变量（指标定理的"局部版本"）。`,
    key: R`$\gamma^{m+1}$ 与 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 反对易，把本征值 $\lambda$ 与 $-\lambda$ 的本征态配对；它们对 $\langle\psi|\gamma^{m+1}\mathrm{e}^{-\lambda^2/M^2}|\psi\rangle$ 的贡献为零，只剩零模。`,
    pitfall: R`未正规化的 $\sum_i\psi_i^\dagger\gamma^{m+1}\psi_i$ 是"$\infty-\infty$"：截断必须用规范协变的 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 本身（按 $|\lambda|$ 排序），若按手征各取相同数目的模，结果会错成 0（交互图 1）。`,
  },

  // ======================= §13.3 非阿贝尔反常 =======================
  "F:absdet13": {
    kind: "fact", n: "（13.47）", ch: "ch13", en: "Only the phase of the chiral determinant is anomalous", zh: "只有手征行列式的相位反常", page: 530, eq: "13.47",
    stmt: R`$\det(\mathrm{i}\hat D)\det((\mathrm{i}\hat D)^\dagger)=\det(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_+)\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-)$。因此 $|\det\mathrm{i}\hat D|$ 与 $\mathrm{Re}\,W_{\boldsymbol r}[\mathcal{A}]$ 规范不变，在规范变换下可能出现反常变化的只有 $\mathrm{Im}\,W_{\boldsymbol r}[\mathcal{A}]$，即 $\det\mathrm{i}\hat D$ 的相位。`,
    deps: ["13.43", "13.48", "13.49"], status: "checked",
    role: R`把非阿贝尔反常定位为一个**相位**问题；§13.5 正是研究这个相位沿规范轨道的卷绕。`,
    key: R`$\mathrm{i}\hat D(\mathrm{i}\hat D)^\dagger$ 是分块对角的，右下块 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-$ 与 Dirac 算子平方的一块相同。`,
    pitfall: R`单个本征值 $\lambda_i$ 不是规范不变的（\eqref{13.46}），所以不能说"谱不变所以行列式不变"；不变的只是模长。`,
  },

  // ======================= §13.4 WZ 条件与下降方程 =======================
  "F:descent13": {
    kind: "fact", n: "（13.80）", ch: "ch13", en: "Stora–Zumino descent equations", zh: "Stora–Zumino 下降方程", page: 536, eq: "13.80b",
    stmt: R`设 $Q_{2l+1}(\boldsymbol A,\boldsymbol F)$ 是 $\mathrm{ch}_{l+1}(\boldsymbol F)$ 的陈–Simons 形式，把 $Q_{2l+1}(\boldsymbol A+\omega,\boldsymbol F)$ 按鬼场 $\omega$ 的阶数展开为 $\sum_{s=0}^{2l+1}Q^s_{2l+1-s}$。则 $\mathcal{S}Q^0_{2l+1}+\dd Q^1_{2l}=0$，$\mathcal{S}Q^1_{2l}+\dd Q^2_{2l-1}=0$，…，$\mathcal{S}Q^{2l}_1+\dd Q^{2l+1}_0=0$，$\mathcal{S}Q^{2l+1}_0=0$。`,
    deps: ["13.63a", "13.63b", "13.65a", "13.65b", "13.75", "13.76"], status: "filled",
    statusNote: R`补出两点：(1) $(\Delta,\mathbb{A},\mathbb{F})$ 与 $(\dd,\boldsymbol A,\boldsymbol F)$ 满足同样的代数关系，所以陈–Simons 公式 $\mathrm{ch}=\dd Q$ 对前者照样成立（\eqref{13.76}）；(2) 因 $\mathbb{F}=\boldsymbol F$ 中不含 $\omega$ 与 $\mathcal S$，比较 \eqref{13.79} 两边鬼场数相同、形式次数相同的项即得各式；鬼场数为 0 的一项给出平凡等式 $\dd Q^0_{2l+1}=\dd Q^0_{2l+1}$。`,
    role: R`把 $(2l+2)$ 维的阿贝尔反常 $\mathrm{ch}_{l+1}$ 一级一级"下降"为 $2l$ 维的非阿贝尔反常 $Q^1_{2l}$。`,
    key: R`"横向曲率为零"：$\mathbb F=\boldsymbol F$（\eqref{13.65b}）是整个构造的发动机。`,
    pitfall: R`$\mathcal S$ 与 $\dd$ 反对易，$\omega$ 是奇元：所有重排都要带分级符号。`,
  },
  "F:wz13": {
    kind: "fact", n: "（13.81）", ch: "ch13", en: "The descent solves the Wess–Zumino condition", zh: "下降方程给出 WZ 条件的解", page: 536, eq: "13.81",
    stmt: R`在无边界流形 $M$ 上，$G[\omega,\boldsymbol A,\boldsymbol F]\equiv\int_MQ^1_{2l}(\omega,\boldsymbol A,\boldsymbol F)$ 满足 Wess–Zumino 一致性条件 $\mathcal{S}G=0$。`,
    deps: ["F:descent13", "13.73"], status: "checked",
    role: R`说明"从 $Q^1_{2l}$ 读出的反常"在代数上是自洽的（与 $\mathcal{S}^2=0$ 相容）；但 WZ 条件本身不能定出归一化，这要等到 §13.5。`,
    key: R`$\mathcal{S}\int Q^1_{2l}=-\int\dd Q^2_{2l-1}=-\int_{\partial M}Q^2_{2l-1}=0$。`,
  },
  "P13.1": {
    kind: "proposition", n: "13.1", ch: "ch13", en: "Explicit form of Q¹₂ₗ", zh: R`$Q^1_{2l}$ 的显式公式`, page: 536, eq: "13.82",
    stmt: R`下降方程中的 $Q^1_{2l}$ 为
$$Q^1_{2l}(\omega,\mathcal{A},\mathcal{F})=\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\frac{1}{(l-1)!}\int_0^1\delta t\,(1-t)\,\mathrm{str}\big[\omega\,\dd(\mathcal{A}\mathcal{F}_t^{l-1})\big],\qquad\mathcal{F}_t=t\,\dd\mathcal{A}+t^2\mathcal{A}^2 .$$`,
    deps: ["F:descent13", "11.105", "11.8"], status: "filled",
    statusNote: R`原书证明的中间几行有笔误：第三行的 $[\mathcal{A},v]$ 应为 $[\mathcal{A},\omega]$，且省略了"$\mathrm{str}$ 的分级不变性"一步与分部积分的边界项；积分元 $\delta t$ 即 $\dd t$（用 $\delta$ 只是为了与外微分 $\dd$ 区分）。本站逐步补全，并在交互图 2 中用精确有理数核对分部积分恒等式与 $l=1,2$ 的系数。由本命题直接得 $Q^1_2=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\omega\dd\mathcal{A})$——原书 \eqref{13.83a} 漏了因子 $\frac12$，已改正。`,
    role: R`给出任意偶数维非阿贝尔反常的显式形式；$l=2$ 时即 \eqref{13.83b}，与 Bardeen 的四维结果 \eqref{13.56} 结构一致（$\frac12\mathcal{A}^3$ 而非阿贝尔情形的 $\frac23\mathcal{A}^3$）。`,
    key: R`只保留 $\omega$ 的一次项后，用 Bianchi 恒等式 $\mathcal{D}_t\mathcal{F}^{l-1}_t=0$ 与 $\partial\mathcal{F}_t/\partial t=\dd\mathcal{A}+t[\mathcal{A},\mathcal{A}]$ 把被积函数整理成 "$\mathcal{F}^l_t+(t-1)\partial_t\mathcal{F}^l_t$ + 全导数" 的形式，前两项对 $t$ 的积分恰为零。`,
    pitfall: R`这里 $\mathcal{F}$ 是 $\mathcal{A}$ 的曲率（不是 $\mathcal{A}+\omega$ 的），因为 $\mathbb{F}=\boldsymbol F$；所以 $\hat{\mathcal{F}}_t=t\mathcal{F}+(t^2-t)(\mathcal{A}+\omega)^2$ 中的 $\omega$ 只来自 $(\mathcal{A}+\omega)^2$。`,
  },

  // ======================= §13.5 阿贝尔反常与非阿贝尔反常 =======================
  "F:ag13": {
    kind: "fact", n: "（13.98）", ch: "ch13", en: "Winding of the chiral phase equals an (m+2)-dimensional index", zh: "相位卷绕数 = (m+2) 维指标", page: 542, eq: "13.98",
    stmt: R`设 $g(\theta,x)$ 是满足 $g(0,x)=g(2\pi,x)=e$ 的规范变换族，$\mathcal{N}=\frac1{2\pi}\int_0^{2\pi}\partial_\theta w\,\dd\theta$ 是 $\det\mathrm{i}\hat D(\mathcal{A}^{g(\theta)})$ 的相位卷绕数。则 $\mathcal{N}=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}=\int_{S^2\times S^m}\mathrm{ch}_{l+1}(\mathbb{F})=(-1)^l\big(\frac{\mathrm{i}}{2\pi}\big)^{l+1}\frac{l!}{(m+1)!}\int_{S^1\times S^m}\Tr(g^{-1}\Delta g)^{m+1}$，即映射 $g:S^{m+1}\to G$ 在 $\pi_{m+1}(G)$ 中的类。`,
    deps: ["13.94", "13.97", "X:AG1984", "F:cs-gauge", "T10.7"], status: "note",
    statusNote: R`"$\sum m_i=\mathcal{N}_+-\mathcal{N}_-$" 依赖外部结果 \sref{X:AG1984}。原书 \eqref{13.95a} 与 \eqref{13.96a} 对 $\theta$ 分量的写法不一致（见正文存疑框）；结论只用到赤道上的粘合关系 $\mathbb{A}_{\rm N}=g^{-1}(\mathbb{A}_{\rm S}+\Delta)g$，不受影响。`,
    role: R`回答 Sumitani 的第 (2) 个疑问：为什么要从 $m+2$ 维的阿贝尔反常出发——因为非阿贝尔反常的相位卷绕本身就是 $S^2\times S^m$ 上一个 $G$ 丛的指标。`,
    key: R`把参数圆盘 $D^2$ 与另一个圆盘粘成 $S^2$，规范变换族 $g(\theta,x)$ 变成 $S^2\times S^m$ 上 $G$ 丛在赤道的转移函数；指标 = 转移函数的卷绕数（式 (11.118)、定理 10.7）。`,
  },
  "F:nonab13": {
    kind: "fact", n: "（13.103）", ch: "ch13", en: "Non-Abelian anomaly with normalization", zh: "带归一化的非阿贝尔反常", page: 543, eq: "13.103",
    stmt: R`$\delta_\omega W[\mathcal{A}]=\int_{S^m}\Tr\,\omega\mathcal{D}_\mu\frac{\delta W[\mathcal{A}]}{\delta\mathcal{A}_\mu}=\mathrm{i}\,\dd_\theta w(\theta,\mathcal{A})=2\pi\mathrm{i}\int_{S^m}Q^1_m(\omega,\mathcal{A}^{g(\theta)},\mathcal{F}^{g(\theta)})$。$m=4$ 时给出 $\mathcal{D}_\mu\langle j^\mu\rangle_\alpha=\frac1{24\pi^2}\Tr T_\alpha\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa\big[\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac12\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\big]$，归一化与微扰计算 \eqref{13.56} 一致。`,
    deps: ["F:ag13", "P13.1", "F:descent13"], status: "filled",
    statusNote: R`补出：(i) 沿 $\theta$ 前进一步等于做规范变换 $v=-\omega$，故 $\delta_\omega W=-\partial_\theta W\,\dd\theta=\mathrm{i}\,\dd_\theta w$（与 \eqref{13.88} 的符号一致）；(ii) $2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3=\frac{1}{24\pi^2}$ 的算术。`,
    role: R`回答 Sumitani 的第 (1) 个疑问：WZ 条件定不出的归一化，由指标定理（整数！）定出。`,
  },

  // ======================= §13.6 宇称反常 =======================
  "F:parity13": {
    kind: "fact", n: "（13.110）", ch: "ch13", en: "Parity anomaly and the η-invariant", zh: "宇称反常与 η 不变量", page: 545, eq: "13.110",
    stmt: R`在 $2l+1$ 维中用 Pauli–Villars 正规化，$\mathrm{e}^{-W}=\prod_i\lambda_i/(\lambda_i+\mathrm{i}M)$。宇称变换使本征值变号，$W[\mathcal{A}^{\rm P}]=\overline{\sym{W}{W[\mathcal{A}]}}$，故 $W-W[\mathcal{A}^{\rm P}]=2\mathrm{i}\,\mathrm{Im}\,W$；而 $\mathrm{Im}\,W[\mathcal{A}]=\lim_{M\to\infty}\sum_i\tan^{-1}(M/\lambda_i)=\frac{\pi}{2}\eta$。`,
    deps: ["13.107", "13.108"], status: "filled",
    statusNote: R`原书 \eqref{13.109} 写作 $W-W[\mathcal{A}^{\rm P}]=2\,\mathrm{Im}\,W$，漏了因子 $\mathrm{i}$（$W-\overline W=2\mathrm{i}\,\mathrm{Im}\,W$），已改正。交互图 3 在 $S^1$ 上的算子 $\mathrm{i}\partial_\theta+t$（例 12.8）上用精确公式 $\mathrm{Im}\,W=\arg\sin\pi(t+\mathrm{i}M)$ 验证 $\mathrm{Im}\,W\to\frac{\pi}{2}\eta$ 与 $\eta=1-2t$。`,
    role: R`奇数维没有规范反常，但宇称在量子层次破缺，破缺量由谱的不对称性 $\eta$ 刻画。`,
    key: R`$\tan^{-1}(M/\lambda)\to\frac\pi2\mathrm{sgn}\lambda$：Pauli–Villars 质量项本身破坏宇称，$M\to\infty$ 时留下"正本征值数减负本征值数"。`,
  },
  "F:ladder13": {
    kind: "fact", n: "（13.119）", ch: "ch13", en: "Dimensional ladder 4–3–2", zh: "维数阶梯 4–3–2", page: 547, eq: "13.119",
    stmt: R`同一个映射 $g:S^2\times S^1\to G$ 的整数 $\mathcal{N}=\frac1{24\pi^2}\int_{S^1\times S^2}\Tr(g^{-1}\dd g)^3$ 有三种身份：(1) $S^2\times S^2$ 上 $G$ 丛的转移函数，给出四维阿贝尔反常的指标；(2) 三维 Dirac 算子 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3$ 在 $\mathcal{A}_0$ 与 $\mathcal{A}_1=g^{-1}(\mathcal{A}_0+\dd)g$ 之间的谱流；(3) 二维非阿贝尔反常（相位卷绕数）。`,
    deps: ["F:ag13", "F:parity13", "F:cs-gauge"], status: "note",
    statusNote: R`原书 \eqref{13.117} 中积分前的负号与 \eqref{13.119} 第一个等号不一致，且 \eqref{13.119} 中的积分区域应为 $S^2\times S^1\times I$（与 \eqref{13.117} 相同），见正文存疑框；结论 "谱流 $=\mathcal{N}$"（在适当的定向约定下）不受影响。`,
    role: R`把本章三种反常串成一条线：$(2l+2)$ 维阿贝尔 → $(2l+1)$ 维宇称 → $2l$ 维非阿贝尔。`,
  },
};
