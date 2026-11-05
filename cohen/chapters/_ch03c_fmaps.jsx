// 补充材料 A_III、D_III 长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// A_III §1 定态的动量振幅
export const FM_AIII_6 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "momentum_amplitude(n, p)", label: "阱中定态换到动量表象后的形状", role: "const",
  note: R`把 \eqref{AIII-5} 的两个指数积分整理成同一种曲线 $F$。右边前面的因子只定高度和相位，$p$ 的分布形状全在方括号里。`,
  kids: [
    { id: "lhs", tex: R`\overline\varphi_n(p)`, w: 2.5, name: "amp[n](p)", label: "第 $n$ 个定态的动量振幅", role: "result",
      note: R`即 $\braket{p|\varphi_n}$。它的模方是测得动量 $p$ 的概率密度，见 \eqref{AIII-3}。` },
    { id: "rhs", tex: R`#half#amp\,#phase#br`, glyph: R`\times`, name: "prefactor * phase * two_peaks", label: "高度 × 相位 × 两条衍射曲线", role: "const",
      note: R`前三个因子都不改变分布的形状：常数不依赖 $p$，相位的模为 1。`,
      kids: [
        { id: "half", tex: R`\frac1{2i}`, w: 0.9, name: "from sin()", label: "来自正弦的展开", role: "const",
          note: R`$\sin\theta=(\mathrm e^{i\theta}-\mathrm e^{-i\theta})/2i$ 留下的系数。取模方后贡献 $1/4$。` },
        { id: "amp", tex: R`\sqrt{\frac a{\pi\hbar}}`, w: 1.6, name: "height(a)", label: "高度只由阱宽决定", role: "known",
          note: R`式中没有 $n$，所以两条曲线的幅度与能级无关。与上一个因子合起来，模方给出 \eqref{AIII-11} 中的 $a/4\pi\hbar$。` },
        { id: "phase", tex: R`\mathrm e^{i\left(\frac{n\pi}2-\frac{pa}{2\hbar}\right)}`, w: 1.3, name: "half_way_phase", label: "半程相位，模为 1", role: "const",
          note: R`把两个指数积分写成 $\sin(ua/2)/(ua/2)$ 时提出来的公共因子。它的模为 1，不影响动量概率。` },
        { id: "br", tex: R`\left[#Fm+#sign#Fp\right]`, name: "peak(+) + sign * peak(-)", label: "两条衍射曲线的叠加", role: "const",
          note: R`**动量分布的全部形状都在这里。**定态是两列反向平面波的叠加，而每一列都被阱壁截断在宽 $a$ 的窗口里，所以各自抹成一条曲线。低能级时两条曲线重叠并干涉，高能级时彼此分开。`,
          kids: [
            { id: "Fm", tex: R`F\!\left(p-\frac{n\pi\hbar}a\right)`, w: 6, name: "peak_at(+n*pi*hbar/a)", label: "中心在 $+n\\pi\\hbar/a$ 的衍射曲线", role: "known",
              note: R`向右传播的那列平面波。曲线的中心随 $n$ 移动，而 $F$ 的形状由 \eqref{AIII-7} 决定，主峰宽度 $4\pi\hbar/a$ 与 $n$ 无关。` },
            { id: "sign", tex: R`(-1)^{n+1}`, w: 2.8, name: "parity_sign", label: "$n$ 奇时相加，$n$ 偶时相减", role: "const",
              note: R`决定两条曲线相加还是相减，也就决定 $p=0$ 附近相长还是相消。方括号因此对 $n$ 奇是偶函数，对 $n$ 偶是奇函数，平方后都是偶函数，于是 $\langle P\rangle_n=0$。` },
            { id: "Fp", tex: R`F\!\left(p+\frac{n\pi\hbar}a\right)`, w: 6, name: "peak_at(-n*pi*hbar/a)", label: "中心在 $-n\\pi\\hbar/a$ 的衍射曲线", role: "known",
              note: R`向左传播的那列平面波，形状与前一条相同。$n\gg1$ 时两个中心恰好落在同能量经典粒子的动量 $\pm p_{cl}$ 上，见 \eqref{AIII-13}。` },
          ] },
      ] },
  ],
};

// D_III §1 只测子体系 (1) 后的整体态
export const FM_DIII_9 = {
  id: "eq", tex: R`#lhs=#frac`, name: "state_after_measuring(1)", label: "测 (1) 得 $a_n$ 后，整体处在什么态", role: "const",
  note: R`这是 \eqref{DIII-8} 的展开：投影算符换成 \eqref{DIII-5} 的双重求和，分母换成 \eqref{DIII-7}。两个基都写出来后才能动手计算。`,
  kids: [
    { id: "lhs", tex: R`\ket{\psi'}`, w: 2.5, name: "psi_after", label: "测量后整个体系的态", role: "result",
      note: R`这里是整个体系的态。一般不能把它拆成“(1) 的态”和“(2) 的态”，它通常是若干积态的叠加。` },
    { id: "frac", tex: R`\frac{#num}{\sqrt{#den}}`, name: "project / norm", label: "先投影，再归一化", role: "const",
      note: R`第五假设的具体写法：分子是投影后的态，分母把它的模长调回 1。`,
      kids: [
        { id: "num", tex: R`\displaystyle\sum_{i=1}^{g_n}\sum_k\ket{#u#v}#over`, glyph: R`\sum_i\sum_k\square`, name: "for i in eigvecs(a_n), k in basis(2)", label: "(1) 只留 $a_n$ 的本征矢，(2) 全部保留", role: "const",
          note: R`$i$ 只走 $a_n$ 的 $g_n$ 个本征矢，其余本征值的分量被测量结果排除。$k$ 走遍 $\mathscr E(2)$ 的整组基，因为对 (2) 什么也没有问。每一项是一个积态乘上它的系数。`,
          kids: [
            { id: "u", tex: R`u_n^i(1)`, w: 3.5, name: "eigvec[n][i] of (1)", label: "(1) 的因子：结果 $a_n$ 的本征矢", role: "known",
              note: R`这是测量真正筛选的部分。每一项中 (1) 都落在 $a_n$ 的本征子空间内。` },
            { id: "v", tex: R`v_k(2)`, w: 3.5, name: "basis[k] of (2)", label: "(2) 的因子：可任选的基矢", role: "design",
              note: R`只是计算用的脚手架。\eqref{DIII-3}、\eqref{DIII-8} 中没有它，所以换一组基，$\ket{\psi'}$ 不变。` },
            { id: "over", tex: R`\braket{#pb|#psi}`, name: "coefficient", label: "这个积态的系数", role: "const",
              note: R`测量前的态在这个积态上的分量。各项的相对大小由它决定，所以测后态落在本征子空间的哪一点也由它决定。`,
              kids: [
                { id: "pb", tex: R`u_n^i(1)v_k(2)`, w: 1.5, name: "product_bra", label: "同一个积态的左矢", role: "known",
                  note: R`和前面的右矢配成一个投影，正是 \eqref{DIII-5} 中的一项。` },
                { id: "psi", tex: R`\psi`, w: 6, name: "psi_before", label: "测量前的态：全部信息的来源", role: "known",
                  note: R`**单凭“测得 $a_n$”定不出测后态，因为 $\tilde A(1)$ 的本征值是简并的。**测后态究竟是该本征子空间里的哪一个，要由测量前的 $\ket\psi$ 决定。` },
              ] },
          ] },
        { id: "den", tex: R`\displaystyle\sum_{i=1}^{g_n}\sum_k\left|\braket{u_n^i(1)v_k(2)|\psi}\right|^2`, w: 4.5, name: "prob(a_n)", label: "根号内就是得到 $a_n$ 的概率", role: "const",
          note: R`这个双重求和与 \eqref{DIII-7} 完全相同，也就是 $\mathcal P^{(1)}(a_n)$：不关心 (2) 处于哪个基矢，所以把各种可能的模方加起来。投影后模长的平方恰好是这个概率，开方后除掉，态就归一了。` },
      ] },
  ],
};
