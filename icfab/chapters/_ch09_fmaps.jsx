// 第 9 章公式树图：式 (9.24)。
const R = String.raw;
const Pf = R`\sym{ch09-Pf}{\mathrm{Pf}}`;

export const FM_9_24 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "局部抛光速率由图形因子决定", role: "const",
  note: R`硬抛光模型比 Warnock 模型简单得多：它不计算压力分布，只用一个图形因子决定每一点按多快的速率磨。`,
  kids: [
    { id: "lhs", tex: R`\sym{ch09-RR}{\mathrm{RR}}`, w: 3, name: "removal_rate", label: "局部去除速率", role: "result",
      note: R`硬抛光模型算出的 CMP 抛光速率。它更像磨削过程：哪里高，就先磨哪里。` },
    { id: "rhs", tex: R`#hi+#lo`, name: "lerp(max, min, Pf)", label: "两个速率按图形因子线性插值", role: "const",
      note: R`两项的权重 $1-\mathrm{Pf}$ 和 $\mathrm{Pf}$ 加起来正好是 1，所以结果总在两个速率之间。`,
      kids: [
        { id: "hi", tex: R`#maxh\,(1-#pfA)`, glyph: R`\times`, name: "max × weight", label: "凸起处起作用的一项", role: "const",
          note: R`$\mathrm{Pf}\to0$ 时这一项占满，局部按最大速率磨。`,
          kids: [
            { id: "maxh", tex: R`\sym{ch09-MAXH}{\mathrm{MAX.HARD}}`, w: 3, name: "bump_rate", label: "凸起处的速率", role: "design",
              note: R`Athena 硬抛光模型的参数：$\mathrm{Pf}\to0$ 时的去除速率。` },
            { id: "pfA", tex: Pf, w: 6, name: "pattern_factor", label: "图形因子：平坦为 1，凸起更小", role: "known",
              note: R`**全式唯一随位置变化的量。**平坦表面上为 1，高出平面的区域更小。正是它让高处磨得快、低处磨得慢，表面才能被磨平。` },
          ] },
        { id: "lo", tex: R`#minh\,(#pfB)`, glyph: R`\times`, name: "min × weight", label: "平坦处起作用的一项", role: "const",
          note: R`$\mathrm{Pf}=1$ 时只剩这一项，局部按最小速率磨。`,
          kids: [
            { id: "minh", tex: R`\sym{ch09-MINH}{\mathrm{MIN.HARD}}`, w: 3, name: "flat_rate", label: "平坦处的速率", role: "design",
              note: R`Athena 硬抛光模型的参数：$\mathrm{Pf}=1$ 时的去除速率。` },
            { id: "pfB", tex: Pf, w: 3, name: "pattern_factor", label: "同一个图形因子，权重互补", role: "known",
              note: R`和前一项里是同一个 $\mathrm{Pf}$，只是这里直接作为权重。` },
          ] },
      ] },
  ],
};
