// §11.1.2 的公式树图：式 (11.21)
const R = String.raw;

export const FM_11_21 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "红移空间的模式 = 实空间部分 + 速度部分", role: "const",
  note: R`\eqref{11.20} 里的导数已经算完，速度项写成了密度的积分。右边两项都正比于物质密度，所以只差一步就能合并成 \eqref{11.22}。`,
  kids: [
    { id: "lhs", tex: R`\delta_{\rm g,RSD}(\boldsymbol k)`, w: 5, name: "delta_gal(k)", label: "红移空间星系过密度", role: "result", note: R`观测到的星系过密度的一个 Fourier 模式，只计入红移空间畸变这一种效应（下标 RSD）。` },
    { id: "rhs", tex: R`#real+#vel`, name: "real + velocity", label: "右边：实空间项 + 本动速度修正", role: "const",
      note: R`第一项是没有本动速度时的成团；第二项来自 \eqref{11.19} 的速度梯度。\eqref{11.20} 中的 $-if$ 乘上求导拉下的 $i$，正好变成这里的 $+f$。`,
      kids: [
        { id: "real", tex: R`#bias#dk`, glyph: R`\times`, name: "real_space", label: "实空间项", role: "const",
          note: R`线性偏袒 \eqref{11.18} 的 Fourier 形式。这一项与视线无关。`,
          kids: [
            { id: "bias", tex: R`b_1`, w: 2.5, name: "bias", label: "线性偏袒", role: "known", note: R`星系过密度与物质过密度的比例系数，依赖所选的星系样本，一般也随红移变化。` },
            { id: "dk", tex: R`\delta_{\rm m}(\boldsymbol k)`, w: 2, name: "delta_m(k)", label: "k 处的物质密度", role: "known", note: R`左边要算的那个模式 $\boldsymbol k$ 上的物质过密度。` },
          ] },
        { id: "vel", tex: R`#f#outer`, glyph: R`\times`, name: "velocity_term", label: "本动速度带来的修正", role: "const",
          note: R`本动速度使星系在红移空间里沿视线移位，这一项就是由此带来的密度变化。`,
          kids: [
            { id: "f", tex: R`f`, w: 4.5, name: "growth_rate", label: "增长率：结构长得越快，修正越大", role: "known", note: R`$f=d\ln D_+/d\ln a$。来自速度–密度关系 \eqref{11.17}，其中的 $aH$ 已被抵消。这个系数使速度项携带增长率的信息。` },
            { id: "outer", tex: R`\int#meas#dmp#mu#xint`, name: "for k' in modes", label: "对所有模式 k′ 积分", role: "const",
              note: R`实空间的速度场是所有 Fourier 模式的叠加，所以这里有一个 $\boldsymbol k'$ 积分。积分并不真正起混合作用：最后的 $\boldsymbol x$ 积分只留下 $\boldsymbol k'=\boldsymbol k$。`,
              kids: [
                { id: "meas", tex: R`\frac{d^3k'}{(2\pi)^3}`, w: 1, name: "fourier_measure", label: "Fourier 积分的测度", role: "const", note: R`Fourier 约定带来的标准测度。` },
                { id: "dmp", tex: R`\delta_{\rm m}(\boldsymbol k')`, w: 2, name: "delta_m(k')", label: "k′ 处的物质密度", role: "known", note: R`由 \eqref{11.17}，速度完全由密度决定，所以速度项可以直接写成 $\delta_{\rm m}$。这样两项才能合并。` },
                { id: "mu", tex: R`\left(\hat{\boldsymbol k}'\cdot\hat{\boldsymbol e}_z\right)^2`, w: 7, name: "cos(k', line_of_sight)^2", label: "方向余弦平方：畸变只认视线方向", role: "const", note: R`**全式的物理核心，也是红移空间各向异性的来源。**速度 $\propto\boldsymbol k'/k'^2$ 投影到视线给一个 $\boldsymbol k'\cdot\hat{\boldsymbol e}_z$，沿视线求导又拉下一个，合起来正好是单位矢量点积的平方。波矢平行视线时取 1，垂直视线时为 0。$\hat{\boldsymbol e}_z$ 是远距观测者近似下固定的视线方向。` },
                { id: "xint", tex: R`\int d^3x\,e^{i(\boldsymbol k'-\boldsymbol k)\cdot\boldsymbol x}`, w: 3, name: "delta_D(k' - k)", label: "只留下 k′ = k", role: "const", note: R`这个积分给出 $(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k'-\boldsymbol k)$，把 $\boldsymbol k'$ 积分消掉，并抵消测度里的 $(2\pi)^3$。方向余弦平方因此变成 $\mu_k^2$，得到 \eqref{11.22}。` },
              ] },
          ] },
      ] },
  ],
};
