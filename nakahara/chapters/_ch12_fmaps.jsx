// 第 12 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;
const CHI = R`\sym{chi0}{\chi}`;          // Grassmann 换元变量 χ，与 _ch12_s10.jsx 相同

// §12.10 Dirac 算子的指标定理（Grassmann 形式）
export const FM_12_191 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "index == integrate(zero_modes, det_ratio)", label: "指标化成零模上的有限维积分", role: "const",
  note: R`路径积分局域到常值解之后，只剩这些零模。$\chi$ 换元吸收了所有 $\beta$，所以右边不含 $\beta$，和指标与 $\beta$ 无关一致。`,
  kids: [
    { id: "lhs", tex: R`\ind Q`, w: 3, name: "index(Dirac)", label: "Dirac 算子的解析指标", role: "result",
      note: R`一个整数，由零模的数目差决定。这条式子说它可以只用曲率算出来。` },
    { id: "rhs", tex: R`#phase\int#meas#det`, name: "phase * integrate(measure, det)", label: "零模积分：只依赖曲率", role: "const",
      note: R`所有动力学都已积掉，剩下的是对 $M$ 和 Grassmann 变量的普通积分。`,
      kids: [
        { id: "phase", tex: R`\mathrm{i}^n`, w: 1.5, name: "normalization", label: "路径积分的归一化", role: "const",
          note: R`前面求出的 $\mathcal{N}=\mathcal{N}_f\mathcal{N}_b$。只有 $n$ 为偶数时积分才不为零，这时它只取 $\pm1$，并把 $\sin$ 换成 $\sinh$。` },
        { id: "meas", tex: R`\prod_{\mu=1}^{2n}#dx#dchi`, name: "for mu in range(2n)", label: "$2n$ 对玻色、费米零模", role: "const",
          note: R`每个方向一对零模。换元后 $\sqrt{2\pi}$ 和 $\beta$ 的因子都消掉了，测度里不再含 $\beta$。`,
          kids: [
            { id: "dx", tex: R`\dd x^\mu_0`, w: 2, name: "bosonic_zero_mode", label: "玻色零模：$M$ 上的点", role: "known",
              note: R`常值圈的位置。乘起来就是 $M$ 的体积元。` },
            { id: "dchi", tex: R`\dd${CHI}^\mu_0`, w: 2.5, name: "fermionic_zero_mode", label: "费米零模：只挑顶次项", role: "known",
              note: R`Grassmann 积分只留下被积函数中 $\chi$ 的 $2n$ 次项。它的作用相当于把 $2n$ 形式在 $M$ 上积分。` },
          ] },
        { id: "det", tex: R`\det\left(\frac{#num}{#sinz}\right)^{1/2}`, name: "sqrt(det(z / sin(z)))", label: R`$z/\sin z$：Â 亏格的雏形`, role: "const",
          note: R`一阶涨落算子行列式的结果，每个曲率块贡献一个 $z/\sin z$。这里的 $\det$ 要按分块的元读，不是矩阵函数的本征值，§12.10 的注解释了差别。`,
          kids: [
            { id: "num", tex: R`#coef#curv#bil`, glyph: R`\times`, name: "z", label: "$z$：曲率配 Grassmann 双线性", role: "const",
              note: R`$\beta\tilde{\mathcal{R}}/2$ 换元后的样子。它是 Grassmann 偶的，可以当普通数放进函数。`,
              kids: [
                { id: "coef", tex: R`\frac12\frac1{2\pi}\frac12`, w: 1, name: "constants", label: "数值系数", role: "const",
                  note: R`第一个 $\frac12$ 是 $\beta\tilde{\mathcal{R}}/2$ 中的除以 2，后面的 $\frac1{2\pi}\frac12$ 来自用 $\chi$ 表示的 $\beta\tilde{\mathcal{R}}$。` },
                { id: "curv", tex: R`\mathcal{R}_{\mu\nu\rho\sigma}(x_0)`, w: 5, name: "riemann(x0)", label: "曲率：几何的唯一输入", role: "known",
                  note: R`**指标对流形的依赖全部经由它。**它在常值解 $x_0$ 处取值，所以被积函数是 $M$ 上的局部函数。` },
                { id: "bil", tex: R`${CHI}^\rho_0${CHI}^\sigma_0`, w: 3.5, name: "chi * chi", label: R`相当于 $\dd x^\rho\wedge\dd x^\sigma$`, role: "known",
                  note: R`Grassmann 变量的代数就是微分形式的代数，这个双线性对应 \eqref{12.192} 的曲率二形式。它也让展开在有限阶截断。` },
              ] },
            { id: "sinz", tex: R`\sin\frac12\frac1{2\pi}\frac12\mathcal{R}_{\mu\nu\rho\sigma}(x_0)${CHI}^\rho_0${CHI}^\sigma_0`, w: 8, name: "sin(z)", label: R`分母 $\sin z$：决定展开系数`, role: "known",
              note: R`**$\sin$ 来自 \eqref{12.188} 的 Euler 乘积。**$z/\sin z$ 的展开系数决定了每个曲率次数的权重，换成 $\sinh$ 后就是 $\hat A$ 亏格 \eqref{12.193}。` },
          ] },
      ] },
  ],
};
