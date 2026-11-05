// 第 14 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;
const VarC = R`\mathrm{Var}\left[\hat C(l)\right]`;

// §14.4 C(l) 的似然
export const FM_14_42 = {
  id: "eq", tex: R`#L\equiv#P=#rhs.`, name: "likelihood", label: "似然：真实 $a_{lm}$ 积掉后只剩 $C(l)$", role: "const",
  note: R`对 \eqref{14.41} 做高斯积分的结果。每个观测 $a_{lm}$ 成为零均值高斯，方差是信号加噪声。这条式子是后面估计量 \eqref{14.44} 的起点。`,
  kids: [
    { id: "L", tex: R`\mathcal L`, w: 0.8, name: "likelihood", label: "似然的记号", role: "result", note: R`对数似然 $\ln\mathcal L$ 关于 $C(l)$ 取极大，就得到估计量。` },
    { id: "P", tex: R`P\left(\{a_{lm}^{\rm obs}\}|C(l)\right)`, w: 4.5, name: "prob[data | C_l]", label: "给定 $C(l)$ 时得到这组观测的概率", role: "result",
      note: R`条件里只有 $C(l)$，没有真实的 $a_{lm}$：真实值无从得知，已在 \eqref{14.41} 中边缘化掉了。` },
    { id: "rhs", tex: R`#norm#exp`, glyph: R`\times`, name: "normalization × gaussian", label: "$2l+1$ 个高斯相乘", role: "const",
      note: R`前一个因子是高斯的归一化，后一个是指数。两者含同一个方差，它们的拉锯决定了 $C(l)$ 的极大值：\eqref{14.43} 中归一化偏好小功率，指数偏好能容纳观测平方和的大功率。`,
      kids: [
        { id: "norm", tex: R`\left(2\pi\left[#CC#B+#N\right]\right)^{#pow}`, name: "normalization", label: "归一化：方差 = 信号 + 噪声", role: "const",
          note: R`方括号是每个观测的方差。独立高斯变量线性组合后方差相加：真实信号经过波束贡献 $C(l)B_l^2$，噪声贡献 $N(l)$。`,
          kids: [
            { id: "CC", tex: R`C(l)`, w: 7, name: "angular_power", label: "要估计的量：真实角功率谱", role: "unknown",
              note: R`**全式要确定的就是它。**真实 $a_{lm}$ 的方差是 $C(l)$，所以边缘化后它进入观测的方差。同样的数据，$C(l)$ 取不同值时概率不同，这才能由数据估计它。` },
            { id: "B", tex: R`B_l^2`, w: 2.5, name: "beam ** 2", label: "波束平方：信号的乘法因子", role: "known",
              note: R`波束在 $l$ 空间是乘法（\eqref{14.38}），观测到的信号是 $B_la_{lm}$，方差于是带上 $B_l^2$。` },
            { id: "N", tex: R`N(l)`, w: 3, name: "noise_power", label: "噪声功率谱", role: "known",
              note: R`由 \eqref{14.39} 定义。它和信号的方差相加，所以估计量 \eqref{14.44} 要减去它。` },
            { id: "pow", tex: R`-(2l+1)/2`, w: 2.5, name: "exponent", label: R`$2l+1$ 个模式各贡献 $-\frac12$`, role: "const",
              note: R`给定 $l$ 有 $2l+1$ 个 $m$。每个高斯的归一化贡献 $-\frac12$ 次幂，方差又都相同，所以合成这个指数。` },
          ] },
        { id: "exp", tex: R`\exp\left\{-\frac12\sum_{m=-l}^{l}\frac{#data}{#var}\right\}`, glyph: R`\exp\{\cdots\}`, name: "exp(-chi2 / 2)", label: "指数：观测平方和除以方差", role: "const",
          note: R`对 $m$ 求和来自 $2l+1$ 个高斯相乘。方差和 $m$ 无关，所以数据只通过 $\sum_m|a_{lm}^{\rm obs}|^2$ 进入似然。`,
          kids: [
            { id: "data", tex: R`\left|a_{lm}^{\rm obs}\right|^2`, w: 4, name: "observed_power", label: "数据：观测系数的平方", role: "known",
              note: R`似然中唯一含数据的地方。令 $\ln\mathcal L$ 的导数为零，它的平均值减去噪声再除以 $B_l^2$，就是估计量 \eqref{14.44}。` },
            { id: "var", tex: R`C(l)B_l^2+N(l)`, w: 2.5, name: "signal + noise", label: "同一个方差", role: "unknown",
              note: R`和归一化方括号中的完全一样。$C(l)$ 越大，指数因子越接近 1，而归一化因子越小，两者的平衡决定极大值的位置。` },
          ] },
      ] },
  ],
};

// §14.5 chi^2 的曲率
export const FM_14_66 = {
  id: "eq", tex: R`#F=#rhs,`, name: "equals", label: R`$\chi^2$ 的曲率：确定项 + 随实现涨落的项`, role: "const",
  note: R`对 $\chi^2$ 求两次导再除以 2。这一条还含数据，取期望后才是只含理论量的 Fisher 信息 \eqref{14.67}。`,
  kids: [
    { id: "F", tex: R`\mathcal F`, w: 2.5, name: "curvature", label: "曲率：决定参数误差", role: "result",
      note: R`$\chi^2$ 离开极小值时变化得多快，定义见 \eqref{14.65}。曲率越大，数据约束越强，$\lambda$ 的 $1\sigma$ 误差 $1/\sqrt{\mathcal F}$ 越小。` },
    { id: "rhs", tex: R`\sum_l#wt\left[#sens+#resid\right]`, name: "sum over l", label: "对每个 $l$ 按逆方差加权求和", role: "const",
      note: R`各个 $l$ 的贡献直接相加，因为这里假设协方差对角。方括号里的两项来自对 $[\hat C(l)-C^{\rm theory}]^2$ 求两次导。`,
      kids: [
        { id: "wt", tex: R`\frac{1}{${VarC}}`, w: 3, name: "inverse_variance", label: "逆方差权重：实验规格进入的地方", role: "design",
          note: R`测得越准的 $l$ 权重越大。方差由实验规格决定，并假设它与 $\lambda$ 无关，所以求导时不用管它。` },
        { id: "sens", tex: R`\left(\frac{\partial C^{\rm theory}(l,\lambda)}{\partial\lambda}\right)^2`, w: 8, name: "sensitivity ** 2", label: "灵敏度平方：取期望后只剩这一项", role: "known",
          note: R`**信息的来源。**理论随参数变化越快，这个 $l$ 对参数的约束越强。它不含数据，取期望后原样留下，成为 Fisher 信息 \eqref{14.67}。` },
        { id: "resid", tex: R`(#Cth-#Chat)#d2`, name: "residual_term", label: "残差 × 二阶导：期望为零", role: "const",
          note: R`在任何单次实现中都不为零。但在真值 $\bar\lambda$ 处，残差的期望按定义为零，所以预测误差时可以丢掉整项。`,
          kids: [
            { id: "Cth", tex: R`C^{\rm theory}(l,\lambda)`, w: 1.5, name: "theory", label: "理论预言", role: "known",
              note: R`给定参数时的理论值。` },
            { id: "Chat", tex: R`\hat C(l)`, w: 3, name: "estimate", label: "这里唯一的随机量", role: "known",
              note: R`观测的估计量，带噪声和宇宙方差。全式只有它含数据，也只有它随实现变化。` },
            { id: "d2", tex: R`\frac{\partial^2C^{\rm theory}(l,\lambda)}{\partial\lambda^2}`, w: 1.8, name: "second_derivative", label: "理论对参数的二阶导", role: "known",
              note: R`它只和残差一起出现，所以也随残差一起在期望中消失。` },
          ] },
      ] },
  ],
};

// 习题 14.8 子体积计数的相关函数
export const FM_14_80 = {
  id: "eq", tex: R`#lhs=#rhs,`, name: "equals", label: "相关函数：超出无关联期望的部分", role: "const",
  note: R`把星系计数的两点乘积按平均数归一，再减去无关联时的值 1。没有任何关联时结果为零。`,
  kids: [
    { id: "lhs", tex: R`#xi(#sep)`, glyph: R`\xi_{\rm g}`, name: "xi(r)", label: "只依赖两个子体积的间距", role: "result",
      note: R`自变量只有距离，没有两点各自的位置，也没有方向。`,
      kids: [
        { id: "xi", tex: R`\xi_{\rm g}`, w: 3.5, name: "galaxy_correlation", label: "星系相关函数", role: "result",
          note: R`本题要算的量。Poisson 模型下的结果只在同一个子体积内非零，这就是散粒噪声的来源。` },
        { id: "sep", tex: R`|\boldsymbol x_\alpha-\boldsymbol x_\beta|`, w: 1.5, name: "separation", label: "两个子体积的距离", role: "const",
          note: R`$\boldsymbol x_\alpha$ 是子体积 $\alpha$ 的位置。` },
      ] },
    { id: "rhs", tex: R`\frac{#num}{#den}-#one`, name: "ratio - 1", label: "归一化的乘积减去 1", role: "const",
      note: R`分式是计数乘积相对于无关联期望的比值，减 1 之后只剩超出的部分。`,
      kids: [
        { id: "num", tex: R`\left\langle \sym{ch14-mcount}{m}(\boldsymbol x_\alpha)\sym{ch14-mcount}{m}(\boldsymbol x_\beta)\right\rangle`, w: 7, name: "mean(count_a * count_b)", label: "两处星系数乘积的平均：关联在这里", role: "known",
          note: R`**全式唯一能看出关联的地方。**不同子体积相互独立时，它等于 $\langle m\rangle^2$；同一个子体积时，$\langle m^2\rangle$ 含方差，多出一个 $\langle m\rangle$。` },
        { id: "den", tex: R`\langle \sym{ch14-mcount}{m}\rangle^2`, w: 2.5, name: "mean_count ** 2", label: "无关联时的期望", role: "known",
          note: R`这里假设没有内禀成团，所以每个子体积的 $\langle m\rangle$ 相同。` },
        { id: "one", tex: R`1`, w: 3, name: "uncorrelated_baseline", label: "无关联基准", role: "const",
          note: R`完全无关联时分式等于 1。减去它，$\xi_{\rm g}$ 才在无关联时为零。` },
      ] },
  ],
};
