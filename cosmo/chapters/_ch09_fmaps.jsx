// 第 9 章长公式的结构树（FormulaMap）：面积 = 重要性。
const R = String.raw;

export const FM_9_71 = {
  id: "eq", tex: R`#lhs = #rhs.`, name: "equals", label: "天空上的方差 = 各模式贡献之和", role: "const",
  note: R`把 $a_{lm}$ 的表达式 \eqref{9.65} 平方再取平均：随机的部分缩成功率谱，确定的部分留在两个角积分里。`,
  kids: [
    { id: "lhs", tex: R`C(l)`, w: 3, name: "angular_power[l]", label: "第 l 阶的角功率谱", role: "result",
      note: R`$a_{lm}$ 的方差，定义见 \eqref{9.66}。右边写着 $m$，结果却只标 $l$：统计各向同性保证它与 $m$ 无关，\eqref{9.74} 中这一点会显式体现。` },
    { id: "rhs", tex: R`\int#meas#pk#proj#projc`, name: "for k in modes", label: "每个模式：功率 × 投影 × 投影的共轭", role: "const",
      note: R`两个 $\boldsymbol k$ 的积分只剩一个：功率谱定义 \eqref{9.69} 里的 $\delta_{\rm D}(\boldsymbol k-\boldsymbol k')$ 消去了另一个，所以不同模式互不相干，贡献直接相加。被积函数里，随机的振幅和确定的响应分成了独立的因子。`,
      kids: [
        { id: "meas", tex: R`\frac{d^3k}{(2\pi)^3}`, w: 1, name: "d3k", label: "Fourier 积分测度", role: "const",
          note: R`标准的波数空间测度，没有额外的物理。` },
        { id: "pk", tex: R`P_{\mathcal R}(k)`, w: 5, name: "primordial_power(k)", label: "随机部分：原初曲率扰动的方差", role: "known",
          note: R`暴胀留下的初始振幅是随机变量，取平均后全部的随机性都收进这一个因子。下面的积分里再没有随机量。` },
        { id: "proj", tex: R`\int#dO\,#Yc#T`, name: "project(T, Y_lm)", label: "转移函数在 Y_lm 上的投影", role: "const",
          note: R`对光子方向 $\hat{\boldsymbol p}$ 积分，取出转移函数里与 $Y_{lm}$ 对应的成分。这个积分来自 $a_{lm}$。`,
          kids: [
            { id: "dO", tex: R`d\Omega`, w: 1.2, name: "dOmega", label: "遍历方向", role: "const",
              note: R`对光子方向 $\hat{\boldsymbol p}$ 的立体角积分。` },
            { id: "Yc", tex: R`Y^*_{lm}(\hat{\boldsymbol p})`, w: 2.4, name: "conj(Y_lm)", label: "选出第 l,m 个角模式", role: "const",
              note: R`球谐函数像一个滤波器：根据正交归一性 \eqref{9.64}，投影只留下 $(l,m)$ 这一个成分。` },
            { id: "T", tex: R`#Tf(k,#mu)`, name: "transfer(k, mu)", label: "确定的响应", role: "known",
              note: R`转移函数 \eqref{9.68}：单位初始振幅演化到今天的光子分布。它不是随机量，所以可以从平均中移出。`,
              kids: [
                { id: "Tf", tex: R`\mathcal T`, w: 6, name: "transfer", label: "今天的光子分布 ÷ 初始振幅", role: "known",
                  note: R`**整章物理都在这里：**单极、偶极和自由流的演化都包含在 $\mathcal T$ 中。给定波数后它完全确定，而前面的 $P_{\mathcal R}$ 只负责随机的初始振幅。` },
                { id: "mu", tex: R`\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}`, w: 3, name: "mu = cos(angle)", label: "方向只通过夹角进入", role: "const",
                  note: R`标量扰动的简化 \eqref{9.70}：$\mathcal T$ 只依赖光子方向与波矢的夹角。正因如此，才能用 Legendre 多项式展开 \eqref{9.72} 并算出角积分。` },
              ] },
          ] },
        { id: "projc", tex: R`\int d\Omega'\,Y_{lm}(\hat{\boldsymbol p}')\mathcal T^*(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}')`, w: 3, name: "conj(project)", label: "同一个投影的复共轭", role: "known",
          note: R`来自 $a^*_{lm}$，变量换成 $\hat{\boldsymbol p}'$，内容与前一个积分相同，星号从球谐函数移到了转移函数上。两者相乘就是投影的模方，所以结果是实数且不为负。` },
      ] },
  ],
};

const RATIO = (t) => R`\frac{\Phi(\boldsymbol k,${t})}{\Phi(\boldsymbol k,0)}`;

export const FM_9_75 = {
  id: "eq", tex: R`#lhs = #rhs.`, name: "equals", label: "复合前单极的完整写法", role: "const",
  note: R`紧耦合解 \eqref{9.26} 换成以 $\mathcal R$ 为单位，再乘上 \eqref{9.41} 的阻尼因子。`,
  kids: [
    { id: "lhs", tex: R`\Theta_0(\boldsymbol k,\eta)`, w: 4, name: "monopole(k, eta)", label: "光子单极：局域温度扰动", role: "result",
      note: R`这一式要算的量。它与势 $\Psi$ 一起决定最后散射面上的单极贡献，再由 \eqref{9.59} 投影成今天的各向异性。` },
    { id: "rhs", tex: R`#R#br#damp`, glyph: R`\times`, name: "amp × response × damping", label: "振幅 × 响应 × 阻尼", role: "const",
      note: R`三个因子各管一件事：随机的初始振幅、确定的动力学、小尺度上的衰减。`,
      kids: [
        { id: "R", tex: R`\mathcal R(\boldsymbol k)`, w: 2.5, name: "primordial_curvature(k)", label: "随机的初始振幅", role: "known",
          note: R`提到方括号外之后，$\Theta_0/\mathcal R$ 不再含随机量，正是转移函数 \eqref{9.68} 需要的形式。` },
        { id: "br", tex: R`\left[#pot + #cos + #drive\right]`, name: "pot + osc + drive", label: "无阻尼的动力学", role: "const",
          note: R`方括号里是紧耦合下的响应：势的直接贡献、初值留下的自由振荡、势驱动的声波。`,
          kids: [
            { id: "pot", tex: R`-\frac23${RATIO(R`\eta`)}`, w: 2, name: "-potential_now", label: "势的直接贡献", role: "known",
              note: R`\eqref{9.26} 的左边是 $\Theta_0+\Phi$，把 $\Phi$ 移到右边就得到这一项。系数来自 $\Phi(0)=\frac23\mathcal R$。它不振荡。` },
            { id: "cos", tex: R`\cos(kr_s)`, w: 7, name: "acoustic_oscillation", label: "声波：相位 kr_s 决定峰的位置", role: "known",
              note: R`**声学峰的来源。**初值 $\Theta_0(0)+\Phi(0)=\mathcal R$ 以声视界 $r_s$ 为时钟振荡，复合时相位 $kr_s=n\pi$ 的模式正好处在极值。系数恰为 1，这是选 $\mathcal R$ 作单位的好处。` },
            { id: "drive", tex: R`#pref\int_0^\eta#dt#phi#sin`, name: "sum(kicks)", label: "势的驱动", role: "const",
              note: R`Green 函数积分：过去每一时刻 $\tilde\eta$ 的势都踢一脚，之后这一脚以声波传播到 $\eta$，全部叠加。`,
              kids: [
                { id: "pref", tex: R`\frac43\frac{k}{\sqrt3}`, w: 1.3, name: "coupling", label: "外力的强度", role: "const",
                  note: R`$\frac43$ 来自 $\Phi-\Psi=2\Phi$ 与 $\Phi(0)=\frac23\mathcal R$；$k/\sqrt3$ 是 \eqref{9.26} 的 Green 函数前因子。` },
                { id: "dt", tex: R`d\tilde\eta`, w: 0.8, name: "dt_past", label: "遍历过去", role: "const",
                  note: R`对 $\eta$ 之前所有时刻 $\tilde\eta$ 积分。` },
                { id: "phi", tex: RATIO(R`\tilde\eta`), w: 3, name: "phi_ratio(t)", label: "那一刻的势", role: "known",
                  note: R`这一脚的强度：$\tilde\eta$ 时刻的势相对其初值的大小。这个比值与初始振幅无关，由演化决定。` },
                { id: "sin", tex: R`\sin[k(r_s(\eta)-r_s(\tilde\eta))]`, w: 4, name: "propagate(t → now)", label: "这一脚传到现在的相位", role: "const",
                  note: R`声波从 $\tilde\eta$ 传到 $\eta$ 积累的相位。宗量只看两时刻声视界之差：踢得越早，相位走得越远。` },
              ] },
          ] },
        { id: "damp", tex: R`e^{-k^2/k_D^2(\eta)}`, w: 6, name: "diffusion_damping", label: "小尺度被光子扩散抹平", role: "known",
          note: R`**全式唯一按 $k$ 强烈压低的因子。**$k\gg k_D$ 的模式被指数压低，$k_D$ 由 \eqref{9.42} 给出。它乘在整个方括号外，三项同时受压。` },
      ] },
  ],
};

export const FM_9_79 = {
  id: "eq", tex: R`#lhs \simeq #rhs.`, name: "simeq", label: "SW 谱的闭式解", role: "const",
  note: R`约等号沿用 \eqref{9.76} 的近似：大角度上只留单极，并用了 $\eta_*\ll\eta_0$。积分 \eqref{9.78} 用 \eqref{C.18} 算出后得到这个结果。`,
  kids: [
    { id: "lhs", tex: R`C(l)^{\rm SW}`, w: 3, name: "sachs_wolfe_power[l]", label: "大角度的 SW 谱", role: "result",
      note: R`上标 SW 指 Sachs–Wolfe：只保留复合时 $\Theta_0+\Psi=-\mathcal R/5$ 的贡献，不含偶极和积分项。` },
    { id: "rhs", tex: R`#num#As#tilt#lr#nr`, glyph: R`\times`, name: "const × amp × tilt × ratio(l) × ratio(n_s)", label: "五个因子，只有一个含 l", role: "const",
      note: R`除了那个 $\Gamma$ 比值，其余因子都只决定整体高度，与 $l$ 无关。`,
      kids: [
        { id: "num", tex: R`2^{n_s-2}\frac{\pi^2}{25}`, w: 1, name: "number", label: "数值系数", role: "const",
          note: R`$\frac{1}{25}$ 来自 $(\mathcal R/5)^2$，其余是积分带来的数值因子。` },
        { id: "As", tex: R`\mathcal A_s`, w: 4.5, name: "primordial_amplitude", label: "原初振幅：决定整体高度", role: "known",
          note: R`原初谱 $k^3P_{\mathcal R}/2\pi^2=\mathcal A_s(k/k_{\rm p})^{n_s-1}$ 的振幅。$C(l)^{\rm SW}$ 正比于它，所以大角度谱的高度能直接量出 $\mathcal A_s$，见 \eqref{9.80}。` },
        { id: "tilt", tex: R`(\eta_0k_{\rm p})^{1-n_s}`, w: 2, name: "pivot_factor", label: "枢轴尺度换算，n_s=1 时为 1", role: "known",
          note: R`今天的共形时间 $\eta_0$ 只通过这个组合进入。$k_{\rm p}$ 是定义原初振幅所用的枢轴尺度，尺度不变时它不起作用。` },
        { id: "lr", tex: R`\frac{#top}{#bot}`, name: "l_dependence", label: "全部 l 依赖：大 l 时约为 l^(n_s-3)", role: "const",
          note: R`**谱的形状全在这个比值里。**上下宗量相差 $3-n_s$，所以大 $l$ 时比值 $\approx l^{n_s-3}$，从而 $l(l+1)C(l)\propto l^{n_s-1}$。$n_s=1$ 时它恰为 $[l(l+1)]^{-1}$，得到 \eqref{9.80} 的高原。`,
          kids: [
            { id: "top", tex: R`\Gamma\left(l+\frac{n_s}{2}-\frac12\right)`, w: 5.5, name: "gamma(l + n_s/2 - 1/2)", label: "分子：宗量较小", role: "const",
              note: R`$n_s=1$ 时为 $\Gamma(l)$。宗量中的 $+\frac{n_s}{2}$ 与分母的 $-\frac{n_s}{2}$ 方向相反，所以 $n_s$ 的变化会改变上下之差，也就是谱的斜率。` },
            { id: "bot", tex: R`\Gamma\left(l+\frac52-\frac{n_s}{2}\right)`, w: 5, name: "gamma(l + 5/2 - n_s/2)", label: "分母：宗量较大", role: "const",
              note: R`$n_s=1$ 时为 $\Gamma(l+2)$，比分子的宗量大 2，给出 $l^{-2}$ 的下降。` },
          ] },
        { id: "nr", tex: R`\frac{\Gamma(3-n_s)}{\Gamma^2\left(2-\frac{n_s}{2}\right)}`, w: 1.5, name: "n_s_constant", label: "只含 n_s 的常数", role: "const",
          note: R`不含 $l$，只影响高度。$n_s=1$ 时为 $\Gamma(2)/\Gamma^2(3/2)=4/\pi$。` },
      ] },
  ],
};
