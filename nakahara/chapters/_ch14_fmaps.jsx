// 第 14 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §14.1 用度规把所有 z̄ 指标换成 z 指标
export const FM_14_14 = {
  id: "eq", tex: R`#orig\to#pure=#rhs.`, name: "T[mixed] -> T[pure_z]", label: "任何张量都能换成只带 $z$ 指标的张量", role: "const",
  note: R`度规只有混合分量 $g_{z\bar z}$，所以它降指标或升指标时都会把 $\bar z$ 变成 $z$。这个对应是同构，以后只需研究纯 $z$ 指标的张量。`,
  kids: [
    { id: "orig", tex: R`T^{#qa#qb}{}_{#pa#pb}`, name: "T[q1, q2; p1, p2]", label: "原来的张量：四类指标", role: "known",
      note: R`一般张量同时带 $z$ 和 $\bar z$ 指标，上下各两类，共四个计数。下面只有 $\bar z$ 的两类需要处理。`,
      kids: [
        { id: "qa", tex: R`\overbrace{z\ldots z}^{q_1}`, w: 1.5, name: "upper_z", label: "$q_1$ 个上 $z$：不动", role: "known",
          note: R`已经是 $z$ 指标，留在上面。` },
        { id: "qb", tex: R`\overbrace{\bar z\ldots\bar z}^{q_2}`, w: 3.5, name: "upper_zbar", label: R`$q_2$ 个上 $\bar z$：要降下来`, role: "known",
          note: R`和 $g_{z\bar z}$ 缩并后变成下 $z$ 指标，与 \eqref{14.12} 的 $\omega_{\bar z}=g_{\bar zz}V^z$ 是同一种操作。` },
        { id: "pa", tex: R`\underbrace{z\ldots z}_{p_1}`, w: 1.5, name: "lower_z", label: "$p_1$ 个下 $z$：不动", role: "known",
          note: R`已经是 $z$ 指标，留在下面。` },
        { id: "pb", tex: R`\underbrace{\bar z\ldots\bar z}_{p_2}`, w: 3.5, name: "lower_zbar", label: R`$p_2$ 个下 $\bar z$：要升上去`, role: "known",
          note: R`和 $g^{z\bar z}$ 缩并后变成上 $z$ 指标。` },
      ] },
    { id: "pure", tex: R`T^{#up}{}_{#dn}`, name: "T[pure_z]", label: "只剩 $z$ 指标", role: "result",
      note: R`四个计数合并成两个。下一步 \eqref{14.15} 说明，在坐标变换下要紧的只是上下指标个数之差，也就是螺旋度 $n$。`,
      kids: [
        { id: "up", tex: R`\overbrace{z\ldots z}^{q_1+p_2}`, w: 6, name: "upper_count", label: "上指标 $=q_1+p_2$", role: "result",
          note: R`**上 $z$ 指标由两部分组成：原有的 $q_1$ 个，加上从下 $\bar z$ 升上来的 $p_2$ 个。**记住 $\bar z$ 指标换成 $z$ 时一定换了位置，这个计数就不会错。` },
        { id: "dn", tex: R`\underbrace{z\ldots z}_{p_1+q_2}`, w: 6, name: "lower_count", label: "下指标 $=p_1+q_2$", role: "result",
          note: R`原有的 $p_1$ 个，加上从上 $\bar z$ 降下来的 $q_2$ 个。这个张量的螺旋度是 $n=(q_1+p_2)-(p_1+q_2)$。` },
      ] },
    { id: "rhs", tex: R`#low#rai\,#again`, glyph: R`\times`, name: "metric_factors * T", label: "具体做法：乘上度规因子", role: "const",
      note: R`左边的箭头只说换成什么，这里给出换法。每换一个 $\bar z$ 指标，就乘一个度规分量。`,
      kids: [
        { id: "low", tex: R`(g_{z\bar z})^{q_2}`, w: 5, name: "lower_q2_indices", label: R`把 $q_2$ 个上 $\bar z$ 降成下 $z$`, role: "const",
          note: R`每降一个指标乘一个 $g_{z\bar z}$，共 $q_2$ 次。由 \eqref{14.6a}，$g_{z\bar z}=\frac12\mathrm{e}^{2\sigma}$ 处处不为零，这一步总可以做。` },
        { id: "rai", tex: R`(g^{z\bar z})^{p_2}`, w: 5, name: "raise_p2_indices", label: R`把 $p_2$ 个下 $\bar z$ 升成上 $z$`, role: "const",
          note: R`每升一个指标乘一个 $g^{z\bar z}$，共 $p_2$ 次。两种因子都可逆，所以这个对应是同构，不丢信息。` },
        { id: "again", tex: R`T^{\overbrace{z\ldots z}^{q_1}\overbrace{\bar z\ldots\bar z}^{q_2}}{}_{\underbrace{z\ldots z}_{p_1}\underbrace{\bar z\ldots\bar z}_{p_2}}`, w: 4, name: "T[q1, q2; p1, p2]", label: "原来的张量", role: "known",
          note: R`和最左边是同一个张量，度规因子就作用在它上面。` },
      ] },
  ],
};
