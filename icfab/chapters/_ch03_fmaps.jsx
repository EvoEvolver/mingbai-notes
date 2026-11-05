// 公式树图：第 3 章的长公式。组件见 framework/app/src/kit/math/fmap.jsx。
const R = String.raw;

export const FM_3_11 = {
  id: "eq", tex: R`#lhs=#mid=#rhs`, name: "rewrite(E_F → n)", label: "同一个浓度：先配 $E_i$，再把 $E_F$ 换成 $n$", role: "const",
  note: R`从式 (3.9) 出发的两步改写，没有新的物理：中间一项在指数里加减 $E_i$，右边一项再用式 A1.13 换掉 $E_F$。工艺建模用的是最右边的形式。`,
  kids: [
    { id: "lhs", tex: R`C_{V^-}^*`, w: 4, name: "C_eq[V-]", label: "负电空位的平衡浓度", role: "result", note: R`要计算的量。上标 $*$ 表示平衡值，$\mathrm{V}^-$ 是俘获了一个电子、带负电的空位。` },
    { id: "mid", tex: R`#c0#ef#lev`, glyph: R`\times`, name: "split_at(E_i)", label: "中间步：在 $E_i$ 处拆开", role: "const",
      note: R`式 (3.9) 的指数 $E_F-E_{V^-}$ 写成 $(E_F-E_i)-(E_{V^-}-E_i)$，拆成两个指数因子：一个含掺杂的影响，一个只含能级位置。`,
      kids: [
        { id: "c0", tex: R`C_{V^0}^*`, w: 1.5, name: "C_eq[V0]", label: "中性空位浓度", role: "known", note: R`只依赖温度、不依赖掺杂，这里作为基准。` },
        { id: "ef", tex: R`\exp\left(\frac{E_F-E_i}{kT}\right)`, w: 3, name: "exp(fermi_shift)", label: "下一步变成 $n/n_i$", role: "const", note: R`费米能级偏离 $E_i$ 多少，这个因子就放大多少。由式 A1.13，它正好等于 $n/n_i$。` },
        { id: "lev", tex: R`\exp\left(-\frac{E_{V^-}-E_i}{kT}\right)`, w: 1.5, name: "exp(-level)", label: "只含能级位置", role: "const", note: R`不含 $E_F$，所以与掺杂无关，改写到右边时不变。` },
      ] },
    { id: "rhs", tex: R`#ratio#c0b#levb`, glyph: R`\times`, name: "doping × base × level", label: "最终形式：掺杂效应单独成一个因子", role: "const",
      note: R`三个因子各管一件事：第一个管掺杂，后两个的乘积是本征时的负电空位浓度。`,
      kids: [
        { id: "ratio", tex: R`\frac{#n}{#ni}`, name: "n / n_i", label: "掺杂只通过这个比值起作用", role: "known", note: R`线性正比：$n$ 翻倍，$C_{V^-}^*$ 也翻倍。本征时比值为 1，这个因子不起作用。`,
          kids: [
            { id: "n", tex: R`n`, w: 7, name: "electrons", label: "全式的调节旋钮：N 型越重，$V^-$ 越多", role: "known", note: R`**全式真正随掺杂变化的量。**右边其余部分在给定温度下都是定值，所以负电空位浓度按电子浓度线性增长。` },
            { id: "ni", tex: R`n_i`, w: 3, name: "intrinsic", label: "门槛：工艺温度下 $n_i$ 很大", role: "known", note: R`掺杂要超过 $n_i$ 才算非本征。1000 ℃ 时 $n_i=7.14\times10^{18}\,\mathrm{cm^{-3}}$，低于这个掺杂水平时比值接近 1，带电空位不会因掺杂而明显增多。` },
          ] },
        { id: "c0b", tex: R`C_{V^0}^*`, w: 2.5, name: "C_eq[V0]", label: "基准：中性空位浓度", role: "known", note: R`负电空位按它的倍数来计，它只依赖温度。` },
        { id: "levb", tex: R`\exp\left(-\frac{E_{V^-}-E_i}{kT}\right)`, w: 3.5, name: "intrinsic_fraction", label: "本征时 $V^-$ 占 $V^0$ 的小分数", role: "const", note: R`$n=n_i$ 时全式只剩这个分数乘 $C_{V^0}^*$。受主能级 $E_{V^-}$ 在 $E_i$ 之上，指数为负，分数小于 1。` },
      ] },
  ],
};
