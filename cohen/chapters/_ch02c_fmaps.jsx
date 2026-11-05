// 补充材料 D_II 长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §DII-2-c 动量表象中的 Schrödinger 方程
export const FM_DII_32 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "schrodinger(p_rep)", label: "时间演化 = 动能 + 势能的积分算符", role: "const",
  note: R`把抽象的 Schrödinger 方程投影到 $\bra{\mathbf p}$ 上，得到的是积分方程。位置表象的 \eqref{DII-19} 是同一个方程的另一种写法。`,
  kids: [
    { id: "lhs", tex: R`#dt\,#psi`, glyph: R`\times`, name: "time_evolution", label: "动量波函数的时间变化", role: "const",
      note: R`时间导数直接作用在动量波函数上，因为动量本征矢不随时间变化，见 \eqref{DII-27}。`,
      kids: [
        { id: "dt", tex: R`i\hbar\frac\partial{\partial t}`, w: 1.5, name: "i_hbar * d_dt", label: "时间演化算符", role: "const", note: R`和其他表象中完全一样，换表象不影响这一项。` },
        { id: "psi", tex: R`\overline\psi(\mathbf p,t)`, w: 3, name: "psi_p(p, t)", label: "要解的动量波函数", role: "unknown", note: R`态矢量在 $\ket{\mathbf p}$ 上的分量，见 \eqref{DII-25}。它是 $\psi(\mathbf r,t)$ 的 Fourier 变换。` },
      ] },
    { id: "rhs", tex: R`#kin+#pot`, name: "kinetic + potential", label: "动能项 + 势能项", role: "const",
      note: R`这两项在这里的难易和位置表象正好相反：动能变简单了，势能变复杂了。`,
      kids: [
        { id: "kin", tex: R`#T#psik`, glyph: R`\times`, name: "kinetic", label: "动能：只是一个乘法", role: "const",
          note: R`$\mathbf P$ 在这个表象中是对角的，所以动能项只把波函数乘上一个数，见 \eqref{DII-28}。不同 $\mathbf p$ 之间互不相干。`,
          kids: [
            { id: "T", tex: R`\frac{\mathbf p^2}{2m}`, w: 2.5, name: "p ** 2 / (2 * m)", label: R`动量 $\mathbf p$ 对应的动能`, role: "known", note: R`算符 $\mathbf P^2/2m$ 换成了数。如果 $V=0$，方程只剩这一项，解就是一个相位因子。` },
            { id: "psik", tex: R`\overline\psi(\mathbf p,t)`, w: 1.5, name: "psi_p(p, t)", label: "同一动量处的值", role: "unknown", note: R`自变量仍是 $\mathbf p$，和左边相同，所以这一项是局域的。` },
          ] },
        { id: "pot", tex: R`#norm\int#meas\,#V\,#psip`, name: "convolve(V_p, psi_p)", label: "势能：对所有动量的卷积", role: "const",
          note: R`$V(\mathbf R)$ 在动量表象中不是对角的，要插入封闭关系 \eqref{DII-29}，于是出现积分。这一项让方程成为积分方程。`,
          kids: [
            { id: "norm", tex: R`(2\pi\hbar)^{-3/2}`, w: 1.3, name: "fourier_norm", label: "Fourier 约定的因子", role: "const", note: R`来自 $\overline V$ 的定义 \eqref{DII-31} 所用的归一化。` },
            { id: "meas", tex: R`\dd^3p'`, w: 1.5, name: "for p_prime in momenta", label: "对所有来源动量求和", role: "const", note: R`所有动量 $\mathbf p'$ 的分量都能贡献到 $\mathbf p$ 上。这就是方程非局域的原因。` },
            { id: "V", tex: R`\overline V(\mathbf p-\mathbf p')`, w: 7, name: "V_p(p - p_prime)", label: R`势能把 $\mathbf p'$ 散射到 $\mathbf p$`, role: "known",
              note: R`**全式的物理都在这里。**幅度只依赖动量差，由势能在波矢 $(\mathbf p-\mathbf p')/\hbar$ 处的 Fourier 分量决定。势能在空间中变化越快，$\overline V$ 越宽，能交换的动量越大。` },
            { id: "psip", tex: R`\overline\psi(\mathbf p',t)`, w: 2.5, name: "psi_p(p_prime, t)", label: "来源动量处的波函数", role: "unknown", note: R`自变量是 $\mathbf p'$ 而不是 $\mathbf p$。正因如此，$\mathbf p$ 处的时间变化取决于波函数在其他动量处的值。` },
          ] },
      ] },
  ],
};
