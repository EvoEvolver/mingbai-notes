// 第 6 章公式树图：式 (6.21)。组件见 @kit 的 FormulaMap。
const R = String.raw;

const Vt = R`\sym{ch06-vac}{V}^*`;

export const FM_6_21 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "掺杂只改变 $B/A$：本征值乘一个增强因子", role: "const",
  note: R`左边是重掺杂区的线性速率常数，右边把它拆成"本征值 × 增强因子"。抛物线常数 $B$ 不出现在这里：氧化剂穿过氧化层的扩散与硅里的杂质无关。`,
  kids: [
    { id: "lhs", tex: R`\left(\frac{B}{A}\right)_{\rm doping}`, w: 3, name: "linear_rate[doped]", label: "重掺杂区的线性速率常数", role: "result",
      note: R`界面反应控制的生长速率。它受影响最大的是线性区，所以薄氧化层、低温时的掺杂加速最明显。` },
    { id: "rhs", tex: R`#BAi#factor`, glyph: R`\times`, name: "intrinsic × enhancement", label: "基准值 × 增强因子", role: "const",
      note: R`乘法修正：先有轻掺杂硅的速率，再按空位的多少放大。`,
      kids: [
        { id: "BAi", tex: R`\left(\frac{B}{A}\right)_{i}`, w: 2, name: "linear_rate[intrinsic]", label: "本征（轻掺杂）硅的速率常数", role: "known",
          note: R`下标 $i$ 表示本征：轻掺杂硅的 $B/A$，是这条修正的起点。` },
        { id: "factor", tex: R`\left(#one+#boost\right)`, name: "1 + boost", label: "增强因子：基线 1 加额外部分", role: "const",
          note: R`这个括号就是 $B/A$ 被放大的倍数。`,
          kids: [
            { id: "one", tex: R`1`, w: 0.8, name: "baseline", label: "不增强时的基线", role: "const",
              note: R`额外部分为零时，因子回到 1，$B/A$ 就是本征值。` },
            { id: "boost", tex: R`#fit#excess`, glyph: R`\times`, name: "fit × vacancy_excess", label: "额外加速 = 经验因子 × 空位过剩", role: "const",
              note: R`前一半是拟合出来的温度因子，后一半才是掺杂的作用。两者相乘，所以空位不过剩就没有加速。`,
              kids: [
                { id: "fit", tex: R`2.6\times10^{3}\exp\left(-\frac{1.1\,\mathrm{eV}}{kT}\right)`, w: 3.5, name: "empirical_fit(T)", label: "经验拟合：空位对 $B/A$ 的耦合强度", role: "const",
                  note: R`系数和 $1.1$ eV 都来自数据拟合，不是推导出来的，大概代表空位机制与 $B/A$ 其他成分之间的相互作用。代入 1000 °C（$kT\approx0.11$ eV）约为 $0.11$，所以 $B/A$ 要翻倍，空位比要到 10 左右。` },
                { id: "excess", tex: R`\left(\frac{#V}{#Vi}-1\right)`, name: "vacancy_ratio - 1", label: "掺杂只通过这个空位比进入公式", role: "const",
                  note: R`减 1 让本征区的贡献恰好为零：轻掺杂硅里分子分母相等，括号为零，增强消失。**杂质种类不出现在公式里**：只要费米能级相同，用砷还是用磷形成 N$^+$ 区都给出同样的 $B/A$。`,
                  kids: [
                    { id: "V", tex: Vt, w: 7, name: "total_vacancies[doped]", label: "重掺杂表面的总空位浓度：加速的根源", role: "known",
                      note: R`**整条式子的物理就在这里。**界面可以消耗空位来容纳氧化的体积膨胀，空位越多，反应越快。它是各荷电态空位的总和，由温度和费米能级决定：N$^+$ 区比同浓度的 P$^+$ 区多，所以 N$^+$ 加速更明显。计算时要用**表面**浓度，因为反应发生在表面。` },
                    { id: "Vi", tex: R`V_i^*`, w: 2.5, name: "total_vacancies[intrinsic]", label: "本征硅的总空位浓度：参照值", role: "known",
                      note: R`轻掺杂硅的总平衡空位浓度。把它放在分母上，只比较相对变化。` },
                  ] },
              ] },
          ] },
      ] },
  ],
};
