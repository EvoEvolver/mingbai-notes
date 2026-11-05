// 第 4 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §4.3 散射率与膨胀率之比
export const FM_4_43 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "scatter_rate / expansion_rate", label: "光子每个 Hubble 时间被散射几次", role: "const",
  note: R`比值大于 1，光子和电子保持耦合；小于 1，光子退耦。式子写成基准值乘若干无量纲因子，前三个括号在基准值处都等于 1，最后的方括号是修正。`,
  kids: [
    { id: "lhs", tex: R`\frac{n_e\sigma_{\rm T}}{H}`, w: 3, name: "rate_ratio", label: "散射率除以膨胀率", role: "result",
      note: R`分子是光子被自由电子散射的频率，分母是宇宙的膨胀率。这个比值等于 1 的时候大致就是退耦。` },
    { id: "rhs", tex: R`#coef#xe#ob#om#zf#rad`, glyph: R`\times`, name: "129 * ionization * params * redshift", label: "基准值乘各因子", role: "const",
      note: R`除了 $X_e$ 和含 $z$ 的两个因子，其余都是宇宙学参数，一旦选定就不再变化。`,
      kids: [
        { id: "coef", tex: R`129`, w: 2, name: "fiducial_value", label: "基准情形的比值", role: "const",
          note: R`由 \eqref{4.42} 算出：$0.0692\times\frac{0.022}{\sqrt{0.14}}\times1000^{3/2}\approx129$。它对应 $X_e=1$、$1+z=1000$ 且略去最后方括号的情形，散射远快于膨胀。` },
        { id: "xe", tex: R`X_e`, w: 7, name: "ionization_fraction", label: "电离比例：决定退耦的因子", role: "known",
          note: R`**退耦由它决定。**复合期间 $X_e$ 很快从 1 降到 $10^{-3}$，而前面的系数只有约 129，所以 $X_e$ 降到约 $10^{-2}$ 时比值就跌到 1 以下，因此退耦发生在复合期间。` },
        { id: "ob", tex: R`\left(\frac{\Omega_{\rm b}h^2}{0.022}\right)`, w: 1.5, name: "baryon_density", label: "重子越多，电子越多", role: "known",
          note: R`自由电子数密度 $n_e=X_en_{\rm b}$ 正比于重子密度，见 \eqref{4.40}。基准值取 $\Omega_{\rm b}h^2=0.022$。` },
        { id: "om", tex: R`\left(\frac{0.14}{\Omega_{\rm m}h^2}\right)^{1/2}`, w: 1.5, name: "matter_density^(-1/2)", label: "物质越多，膨胀越快", role: "known",
          note: R`物质主导时 $H\propto\Omega_{\rm m}^{1/2}$，而 $H$ 在分母上，所以物质密度越大，比值越小。` },
        { id: "zf", tex: R`\left(\frac{1+z}{1000}\right)^{3/2}`, w: 4, name: "redshift^(3/2)", label: "越早比值越大", role: "known",
          note: R`电子密度按 $a^{-3}$ 增长，而 $H$ 在物质主导时只按 $a^{-3/2}$ 增长，两者相除剩下 $(1+z)^{3/2}$。即使 $X_e$ 始终为 1，比值也会随膨胀下降，这就是 \eqref{4.44} 的情形。` },
        { id: "rad", tex: R`\left[1+\frac{1+z}{3360}\frac{0.14}{\Omega_{\rm m}h^2}\right]^{-1/2}`, w: 2, name: "radiation_correction", label: "辐射对膨胀率的修正", role: "known",
          note: R`这是 $H$ 中的 $[1+a_{\rm eq}/a]^{1/2}$ 改用红移来写。方括号大于 1，所以比值变小。$z\approx1000$ 时约为 0.88，$z\approx38$ 时可以忽略。` },
      ] },
  ],
};
