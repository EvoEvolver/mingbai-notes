// 第 7 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §7.2.1 协变导数的定义
export const FM_7_10 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "covariant_derivative = limit", label: R`定义的极限算出来就是 $\partial V+V\Gamma$`, role: "const",
  note: R`左边是定义，右边是把 \eqref{7.9} 代入后的结果。结果是 $x+\Delta x$ 处的向量，因为两个被减的向量在同一点。`,
  kids: [
    { id: "lhs", tex: R`\lim_{\Delta x^\nu\to0}\frac{#actual-#moved}{#dx}#bl`, name: "difference_quotient", label: R`同一点上两个向量之差`, role: "const", note: R`形式上照搬普通导数的差商，区别只在于被减的向量先搬到了同一点。这里只沿 $x^\nu$ 方向位移。`,
      kids: [
        { id: "actual", tex: R`V^\mu(x+\Delta x)`, w: 2.5, name: "V_actual", label: R`场在邻点的实际值`, role: "known", note: R`向量场 $V$ 本身在 $x+\Delta x$ 处的分量。展开到一阶就出现普通偏导数。` },
        { id: "moved", tex: R`\widetilde V^\mu(x+\Delta x)`, w: 4.5, name: "V_transported", label: R`从 $x$ 平行移动来的值`, role: "known", note: R`**这是和普通导数唯一的不同。**流形上没有自然的搬运方式，这个值由 \eqref{7.9} 规定，搬运规则里就带着 $\Gamma$。` },
        { id: "dx", tex: R`\Delta x^\nu`, w: 0.8, name: "dx_nu", label: R`位移`, role: "const", note: R`分子对位移是一阶的，除掉它，极限才有限。` },
        { id: "bl", tex: R`\frac{\partial}{\partial x^\mu}`, w: 0.8, name: "e_mu", label: R`坐标基向量`, role: "const", note: R`把分量拼成向量。差值是向量，这才有意义。` },
      ] },
    { id: "rhs", tex: R`\left(#pd+#vg\right)#br`, name: "(partial + connection) * e_mu", label: R`协变导数的分量乘基`, role: "const", note: R`括号就是 $\nabla_\nu V$ 的第 $\mu$ 个分量：普通偏导数加一项修正。`,
      kids: [
        { id: "pd", tex: R`\frac{\partial V^\mu}{\partial x^\nu}`, w: 2.5, name: "partial_nu(V)", label: R`普通偏导数`, role: "known", note: R`分子一阶展开后，$V^\mu(x)$ 互相抵消，只留下这一项和 $\Gamma$ 项。$\Gamma=0$ 时回到欧氏空间的情形。` },
        { id: "vg", tex: R`#Vl#G`, glyph: R`\times`, name: "V * Gamma", label: R`平行移动贡献的修正`, role: "const", note: R`\eqref{7.9} 里的 $-V^\lambda\Gamma^\mu{}_{\nu\lambda}\Delta x^\nu$ 被减号翻成正号，再除以 $\Delta x^\nu$，就是这一项。`,
          kids: [
            { id: "Vl", tex: R`V^\lambda`, w: 1.5, name: "V", label: R`对 $V$ 线性`, role: "known", note: R`修正项对 $V$ 本身线性，不含 $V$ 的导数。这是条件 \eqref{7.8b} 的要求。` },
            { id: "G", tex: R`\Gamma^\mu{}_{\nu\lambda}`, w: 6, name: "connection", label: R`联络系数：额外给定的结构`, role: "design", note: R`**流形的微分结构不提供它，每选一个 $\Gamma$ 就有一种平行移动。**指标 $\nu$ 对应位移方向，$\lambda$ 对应被搬运的分量，$\mu$ 对应结果的分量。` },
          ] },
        { id: "br", tex: R`\frac{\partial}{\partial x^\mu}`, w: 0.8, name: "e_mu", label: R`坐标基向量`, role: "const", note: R`与左边相同的基，所以比较分量即可。` },
      ] },
  ],
};

// §7.2.5 联络系数的变换律
export const FM_7_29 = {
  id: "eq", tex: R`#lhs=#hom+#inhom.`, name: "Gamma_new = tensor_part + inhomogeneous", label: R`张量式的一项，加不是张量的一项`, role: "const",
  note: R`由 \eqref{7.28} 代入 $f_\alpha=(\partial x^\mu/\partial y^\alpha)e_\mu$ 得到。$\nabla_{f_\alpha}$ 按乘积法则作用：落在基 $e_\mu$ 上给第一项，落在系数上给第二项。`,
  kids: [
    { id: "lhs", tex: R`\widetilde\Gamma^\gamma{}_{\alpha\beta}`, w: 2, name: "Gamma_in_y", label: R`$y$ 坐标中的联络系数`, role: "result", note: R`新坐标 $y$ 中的联络系数，由 \eqref{7.28} 定义。` },
    { id: "hom", tex: R`#ja#jb#jc#G`, glyph: R`\times`, name: "tensor_transform(Gamma)", label: R`像 $(1,2)$ 型张量那样变换`, role: "const", note: R`如果只有这一项，$\Gamma$ 就是张量：一个 Jacobi 因子对应一个指标。`,
      kids: [
        { id: "ja", tex: R`\frac{\partial x^\lambda}{\partial y^\alpha}`, w: 1.2, name: "jac[lambda, alpha]", label: R`下指标 $\alpha$`, role: "known", note: R`把第一个下指标从 $x$ 换到 $y$，来自 $f_\alpha$ 展开成 $e_\lambda$。` },
        { id: "jb", tex: R`\frac{\partial x^\mu}{\partial y^\beta}`, w: 1.2, name: "jac[mu, beta]", label: R`下指标 $\beta$`, role: "known", note: R`把第二个下指标从 $x$ 换到 $y$，来自 $f_\beta$ 的系数。` },
        { id: "jc", tex: R`\frac{\partial y^\gamma}{\partial x^\nu}`, w: 1.2, name: "jac_inv[gamma, nu]", label: R`上指标 $\gamma$`, role: "known", note: R`两边乘这个因子，把 $e_\nu$ 上的系数读成 $f_\gamma$ 上的系数。` },
        { id: "G", tex: R`\Gamma^\nu{}_{\lambda\mu}`, w: 3.5, name: "Gamma_in_x", label: R`$x$ 坐标中的联络系数`, role: "known", note: R`由 $\nabla_{e_\lambda}e_\mu$ 而来。如果它在 $x$ 坐标中为零，第一项就整个消失，第二项却还在，所以 $y$ 坐标中的 $\widetilde\Gamma$ 可以不为零。张量做不到这一点：它在一个坐标系里为零，在所有坐标系里都为零。` },
      ] },
    { id: "inhom", tex: R`#d2#jd`, glyph: R`\times`, name: "inhomogeneous", label: R`不含 $\Gamma$ 的非齐次项`, role: "const", note: R`**这一项不依赖 $\Gamma$，所以 $\Gamma$ 不是张量。**也因为它不依赖 $\Gamma$，两个联络之差是张量，见习题 7.5。`,
      kids: [
        { id: "d2", tex: R`\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}`, w: 7, name: "second_derivative(x, y)", label: R`坐标变换的二阶导数`, role: "known", note: R`**$\nabla_{f_\alpha}$ 求导时落在系数 $\partial x^\nu/\partial y^\beta$ 上的结果。**它恰好抵消 $\partial Y$ 的非张量部分，使 $\nabla_XY$ 与坐标无关；线性坐标变换下它为零。` },
        { id: "jd", tex: R`\frac{\partial y^\gamma}{\partial x^\nu}`, w: 1.8, name: "jac_inv[gamma, nu]", label: R`上指标 $\gamma$`, role: "known", note: R`和第一项相同的因子：把 $e_\nu$ 上的系数换成 $f_\gamma$ 上的系数。` },
      ] },
  ],
};

// §7.4 从 L 换到 F = L²/2
export const FM_7_60 = {
  id: "eq", tex: R`#lhs=#mid=#end.`, name: "EL[F] = L * EL[L] + extra = extra", label: R`$F$ 的 E-L 表达式只比 $L$ 多一项`, role: "const",
  note: R`第一个等号是把 $F=L^2/2$ 代入求导，第二个等号用了 $L$ 的 Euler–Lagrange 方程 \eqref{7.59}。`,
  kids: [
    { id: "lhs", tex: R`#Fp-#Fq`, name: "EL[F]", label: R`对 $F$ 的 E-L 表达式`, role: "result", note: R`$F=\frac12g_{\mu\nu}x'^\mu x'^\nu=L^2/2$。目标是证明 $L$ 的解也让它为零。`,
      kids: [
        { id: "Fp", tex: R`\frac{\dd}{\dd s}\left(\frac{\partial F}{\partial x'^\lambda}\right)`, w: 2, name: "d_ds(dF_dxp)", label: R`对速度求偏导再求 $\dd/\dd s$`, role: "result", note: R`$\partial F/\partial x'^\lambda=L\,\partial L/\partial x'^\lambda$。再对 $s$ 求导时乘积法则给出两项，其中一项就是后面多出来的那一项。` },
        { id: "Fq", tex: R`\frac{\partial F}{\partial x^\lambda}`, w: 1.5, name: "dF_dx", label: R`对坐标的偏导`, role: "result", note: R`$\partial F/\partial x^\lambda=L\,\partial L/\partial x^\lambda$，只多一个因子 $L$。` },
      ] },
    { id: "mid", tex: R`#elpart+#extra`, name: "L * EL[L] + extra", label: R`乘积法则展开的结果`, role: "const", note: R`第一块是 $L$ 乘原来的 E-L 表达式，第二块是导数落在因子 $L$ 上多出来的。`,
      kids: [
        { id: "elpart", tex: R`#L\left[#Lp-#Lq\right]`, name: "L * EL[L]", label: R`方括号为零`, role: "const", note: R`方括号就是 \eqref{7.59} 的左边，在 $L$ 的极值曲线上为零，所以第二个等号把这一整块去掉了。`,
          kids: [
            { id: "L", tex: R`L`, w: 1.2, name: "L", label: R`公共因子`, role: "known", note: R`来自 $\partial F=L\,\partial L$。` },
            { id: "Lp", tex: R`\frac{\dd}{\dd s}\left(\frac{\partial L}{\partial x'^\lambda}\right)`, w: 2, name: "d_ds(dL_dxp)", label: R`$L$ 的速度项`, role: "known", note: R`$L$ 的 E-L 表达式的第一项。` },
            { id: "Lq", tex: R`\frac{\partial L}{\partial x^\lambda}`, w: 1.5, name: "dL_dx", label: R`$L$ 的坐标项`, role: "known", note: R`$L$ 的 E-L 表达式的第二项。` },
          ] },
        { id: "extra", tex: R`#Lv#dL`, glyph: R`\times`, name: "extra", label: R`导数落在因子 $L$ 上的多余项`, role: "const", note: R`这是 $F$ 和 $L$ 的 E-L 表达式之间唯一的实质差别。`,
          kids: [
            { id: "Lv", tex: R`\frac{\partial L}{\partial x'^\lambda}`, w: 1.5, name: "dL_dxp", label: R`对速度的偏导`, role: "known", note: R`一般不为零，所以多余项能否消失全看另一个因子。` },
            { id: "dL", tex: R`\frac{\dd L}{\dd s}`, w: 6, name: "dL_ds", label: R`弧长参数下为零`, role: "known", note: R`**沿曲线 $L\equiv1$，所以 $\dd L/\dd s=0$，多余项消失。**这正是用弧长作参数的好处：$L$ 的解因此也满足 $F$ 的方程。` },
          ] },
      ] },
    { id: "end", tex: R`\frac{\partial L}{\partial x'^\lambda}\frac{\dd L}{\dd s}`, w: 2.5, name: "only extra left", label: R`用 \eqref{7.59} 后只剩多余项`, role: "result", note: R`方括号已经为零。再用 $\dd L/\dd s=0$，整个式子为零：$L$ 的解也满足 $F$ 的方程。` },
  ],
};
