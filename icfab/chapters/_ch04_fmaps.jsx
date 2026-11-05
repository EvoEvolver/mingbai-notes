// 公式树图：第 4 章的长公式。组件见 framework/app/src/kit/math/fmap.jsx。
const R = String.raw;

export const FM_4_26 = {
  id: "eq", tex: R`#Y=#prod\cong#merged`, name: "yield ≅ merged", label: "逐道相乘，近似后可并成一个式子", role: "const",
  note: R`等号给出各道独立时的总良率。$\cong$ 右边要求各道 $C_i$ 取同一值，而且只在一阶上一致：两边展开都是 $1-\sum_iA_{{\rm C}i}D_{{\rm O}i}+\cdots$，二阶项不同。`,
  kids: [
    { id: "Y", tex: R`Y`, w: 4, name: "total_yield", label: "走完全部工序后的芯片良率", role: "result", note: R`一颗芯片要在每一道工序都不遇上致命缺陷才算合格，所以这个数只会随工序增加而下降。` },
    { id: "prod", tex: R`\prod_{i=1}^{#lv}#step`, name: "for level in process", label: "左端：每道一个良率，全部相乘", role: "const",
      note: R`连乘对应串行：任何一道引入的缺陷都会累积到最后。写成乘积相当于假设各层缺陷的成团彼此独立。`,
      kids: [
        { id: "lv", tex: R`{\rm levels}`, w: 7, name: "n_levels", label: "工序道数，它让良率指数式下跌", role: "design", note: R`**整条式子的要点，却只印在连乘号的上标里。**每道 99%、共 50 道，总良率约 $(0.99)^{50}\approx60\%$；每道 95% 时只剩百分之几。单步缺陷指标必须非常苛刻，原因就在这里。` },
        { id: "step", tex: R`\left(1+\frac{#AD}{#Cin}\right)^{#Cex}`, name: "neg_binom[i]", label: "第 $i$ 道的负二项良率", role: "const",
          note: R`和单步的负二项模型同一个形式，只是每个量都带上了工序下标 $i$。`,
          kids: [
            { id: "AD", tex: R`#Ac#Do`, glyph: R`\times`, name: "mean_defects[i]", label: "每颗芯片的平均致命缺陷数", role: "known", note: R`面积乘密度，就是这一道工序落在一颗芯片致命区域内的平均缺陷数。实际产线建模的难点之一，就是确定每一道的这两个数。`,
              kids: [
                { id: "Ac", tex: R`A_{{\rm C}i}`, w: 3, name: "A_crit[i]", label: "第 $i$ 道的关键面积", role: "known", note: R`芯片上一旦落入缺陷就会致命的面积，不超过芯片面积，且不同工序各不相同。` },
                { id: "Do", tex: R`D_{{\rm O}i}`, w: 5, name: "defect_density[i]", label: "第 $i$ 道的平均缺陷密度", role: "known", note: R`单位面积上的致命缺陷数，是产线要压低的指标。先进产线的单步要求低于 $0.01\,\mathrm{cm^{-2}}$。` },
              ] },
            { id: "Cin", tex: R`C_i`, w: 2.5, name: "clustering[i]", label: "聚集因子：缺陷有多扎堆", role: "known", note: R`$C_i\to\infty$ 表示几乎不聚集，这一项回到 Poisson 良率；$C_i=1$ 时回到 Seeds 模型。工业上常取约 2。` },
            { id: "Cex", tex: R`-C_i`, w: 1.2, name: "pow(-C_i)", label: "负二项的指数", role: "const", note: R`与分母中是同一个 $C_i$，两处一起构成负二项的形式。` },
          ] },
      ] },
    { id: "merged", tex: R`\left\{1+\left(#sum\right)\Big/#Cm\right\}^{#Cmex}`, name: "neg_binom(all)", label: "右端：总缺陷数代入一次负二项", role: "const",
      note: R`形式上只用一次负二项公式。物理上相当于所有层的缺陷密度一起涨落（完全相关），聚集更强，算出的良率比左端高。总缺陷数与 $C$ 相当时，两端的差别已经可观。`,
      kids: [
        { id: "sum", tex: R`\sum_{i=1}^{\rm levels}#ADm`, name: "sum", label: "全部工序的平均缺陷数相加", role: "const", note: R`相乘变成相加，这是近似式的方便之处：只需要一个总数，不用逐道代入。`,
          kids: [
            { id: "ADm", tex: R`A_{{\rm C}i}D_{{\rm O}i}`, w: 3, name: "defects[i]", label: "每道的平均缺陷数", role: "known", note: R`和左端括号内分子相同的量。` },
          ] },
        { id: "Cm", tex: R`C_i`, w: 2, name: "clustering", label: "须各道相同", role: "known", note: R`$C_i$ 写在求和之外，只有各道取同一个值 $C$ 时才说得通，这正是该近似的前提。` },
        { id: "Cmex", tex: R`-C_i`, w: 1, name: "pow(-C)", label: "负二项的指数", role: "const", note: R`同样要求是各道共同的 $C$。` },
      ] },
  ],
};
