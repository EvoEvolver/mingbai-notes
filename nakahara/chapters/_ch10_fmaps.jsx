// 第 10 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;
const bR = R`\boldsymbol R`;

// §10.4 相伴丛上一般截面的协变导数
export const FM_10_58 = {
  id: "eq", tex: R`#lhs=#cls=#comp.`, name: "nabla_X(s) == [class] == components", label: "协变导数的两种局部写法", role: "const",
  note: R`中间是等价类写法，把向量丛的元素写成 $(\sigma_i,\cdot)$；右边是分量写法，用基截面 $e_\alpha$ 展开。两边的结构相同：导数项加规范势作用项。`,
  kids: [
    { id: "lhs", tex: R`\nabla_Xs`, w: 2, name: "nabla_X(s)", label: "截面沿 $X$ 的协变导数", role: "result",
      note: R`$s=\xi_i{}^\alpha e_\alpha$ 是相伴丛 $E$ 的一般截面，$X$ 是曲线的切向量。左边本身不依赖局部平凡化，下标 $i$ 只出现在右边的表达式里。` },
    { id: "cls", tex: R`\Big[\Big(#sig,#dxi+#act\Big|_{t=0}\Big)\Big]`, name: "[(sigma_i, dxi_dt + A(X) xi)]", label: "等价类写法：$E$ 中的元素", role: "const",
      note: R`第一个位置是主丛的点，第二个位置是向量空间 $V$ 的元素，方括号表示等价类。协变导数只改第二个位置。`,
      kids: [
        { id: "sig", tex: R`\sigma_i(0)`, w: 1, name: "local_section", label: "选定的局部截面（参照系）", role: "design", note: R`曲线起点处的局部截面，由平凡化的选择决定。第二个位置的分量都是相对于它读出的。` },
        { id: "dxi", tex: R`\frac{\dd\xi_i}{\dd t}`, w: 2, name: "dxi_dt", label: "分量沿曲线的普通变化率", role: "unknown", note: R`把分量 $\xi_i$ 当成 $V$ 值函数，沿曲线对 $t$ 求导。这一项本身依赖规范。` },
        { id: "act", tex: R`#AX#xi`, glyph: R`\times`, name: "A(X) * xi", label: "规范势作用在场上", role: "const",
          note: R`矩阵乘向量：规范势沿 $X$ 方向的取值作用在 $\xi_i$ 上。`,
          kids: [
            { id: "AX", tex: R`\mathcal{A}_i(X)`, w: 3, name: "gauge_potential(X)", label: "规范势沿 $X$ 的取值", role: "known", note: R`主丛上的联络经 $\sigma_i$ 拉回得到 $\mathcal{A}_i$，再在表示 $\rho$ 中取矩阵。` },
            { id: "xi", tex: R`\xi_i`, w: 1.2, name: "xi", label: "场的分量", role: "unknown", note: R`被矩阵作用的 $V$ 值分量。` },
          ] },
      ] },
    { id: "comp", tex: R`#tan\Big\{#pd+#Aterm\Big\}#ea`, name: "dx_dt * { d_xi + A xi } * e", label: "分量写法：最小耦合", role: "const",
      note: R`花括号就是物理中的 $\partial_\mu\to\partial_\mu+\mathcal{A}_\mu$。这一写法由 \eqref{10.56a} 和 Leibniz 律得到。`,
      kids: [
        { id: "tan", tex: R`\frac{\dd x^\mu}{\dd t}`, w: 1.2, name: "X^mu", label: "切向量的分量", role: "known", note: R`花括号内的量带指标 $\mu$，用它缩并后得到沿曲线的导数。` },
        { id: "pd", tex: R`\frac{\partial\xi_i{}^\alpha}{\partial x^\mu}`, w: 3, name: "d_mu(xi^alpha)", label: "普通偏导数", role: "unknown", note: R`Leibniz 律中导数落在系数 $\xi_i{}^\alpha$ 上的部分，把基 $e_\alpha$ 看作不动。` },
        { id: "Aterm", tex: R`#Amat#xib`, glyph: R`\times`, name: "A_mu^alpha_beta * xi^beta", label: "基截面转动贡献的修正", role: "const",
          note: R`Leibniz 律中导数落在基截面上的部分：$\nabla_Xe_\beta=\frac{\dd x^\mu}{\dd t}\mathcal{A}_{i\mu}{}^\alpha{}_\beta e_\alpha$，再把哑指标重新命名。`,
          kids: [
            { id: "Amat", tex: R`\mathcal{A}_{i\mu}{}^\alpha{}_\beta`, w: 6, name: "A_mu[alpha][beta]", label: "规范势矩阵：把分量混合起来", role: "known",
              note: R`**这是协变导数与普通导数的全部差别。**这个矩阵把 $\xi_i{}^\beta$ 的各分量混合起来。它在换平凡化时的变换律 \eqref{10.9}，恰好抵消了 $\partial_\mu\xi$ 多出来的项，所以 $\nabla_Xs$ 与平凡化无关，见 \eqref{10.59}。` },
            { id: "xib", tex: R`\xi_i{}^\beta`, w: 1.2, name: "xi^beta", label: R`场的分量（$\beta$ 求和）`, role: "unknown", note: R`被规范势矩阵混合的分量。` },
          ] },
        { id: "ea", tex: R`e_\alpha`, w: 1, name: "basis_section", label: "基截面", role: "known", note: R`$e_\alpha(p)=[(\sigma_i(p),e_\alpha{}^0)]$，使结果重新成为 $E$ 的截面。` },
      ] },
  ],
};

// §10.4 伴随丛上的协变导数
export const FM_10_68b = {
  id: "eq", tex: R`#lhs=#cls=#comp.`, name: "D_X(s) == [class] == components", label: "伴随丛协变导数：普通导数加对易子", role: "const",
  note: R`这是 \eqref{10.58} 在伴随表示下的版本。场本身取值在李代数里，规范势通过对易子作用在它上面，分量上由结构常数给出。`,
  kids: [
    { id: "lhs", tex: R`\mathcal{D}_Xs`, w: 2, name: "D_X(s)", label: "伴随丛截面的协变导数", role: "result",
      note: R`$s=[(\sigma_i,V)]$ 是伴随丛的截面，$V=V^\alpha T_\alpha$ 取值在李代数。定义见 \eqref{10.68a}。` },
    { id: "cls", tex: R`\Big[\Big(#sig,#dV+#comm\Big|_{t=0}\Big)\Big]`, name: "[(sigma_i, dV_dt + [A(X), V])]", label: "等价类写法", role: "const",
      note: R`第二个位置是把 \eqref{10.68a} 中的 $\frac{\dd}{\dd t}(g^{-1}Vg)$ 在 $t=0$ 算出来的结果，这里用了 $g(0)=e$ 和 $\dot g=-\mathcal{A}_i(X)g$。`,
      kids: [
        { id: "sig", tex: R`\sigma_i(0)`, w: 1, name: "local_section", label: "局部截面（参照系）", role: "design", note: R`在 $t=0$ 处水平提升和局部截面重合，所以 \eqref{10.68a} 的 $\tilde\gamma(0)$ 在这里写成 $\sigma_i(0)$。` },
        { id: "dV", tex: R`\frac{\dd V(t)}{\dd t}`, w: 2, name: "dV_dt", label: "场沿曲线的普通变化率", role: "unknown", note: R`来自导数落在 $V$ 上的部分。` },
        { id: "comm", tex: R`[#AX,#Vt]`, name: "commutator(A(X), V)", label: "对易子：规范势的伴随作用", role: "const",
          note: R`$g^{-1}Vg$ 两侧的 $g$ 都被求导，给出 $\mathcal{A}_i(X)V-V\mathcal{A}_i(X)$，这就是对易子。与 \eqref{10.58} 的矩阵作用相比，这里是伴随表示的作用。`,
          kids: [
            { id: "AX", tex: R`\mathcal{A}_i(X)`, w: 2.5, name: "gauge_potential(X)", label: "规范势沿 $X$ 的取值", role: "known", note: R`李代数值，因此可以和 $V$ 取对易子。` },
            { id: "Vt", tex: R`V(t)`, w: 1.2, name: "V", label: "李代数值的场", role: "unknown", note: R`伴随表示的场，例如 Higgs 三重态。` },
          ] },
      ] },
    { id: "comp", tex: R`#Xm\Big(#pd+#adj\Big)#basis`, name: "X^mu * ( d_V + f A V ) * basis", label: "分量写法：结构常数出现", role: "const",
      note: R`把 $V=V^\alpha T_\alpha$、$\mathcal{A}_i(X)=X^\mu\mathcal{A}_{i\mu}{}^\beta T_\beta$ 代入，再用 $[T_\beta,T_\gamma]=f_{\beta\gamma}{}^\alpha T_\alpha$ 展开。`,
      kids: [
        { id: "Xm", tex: R`X^\mu`, w: 1.2, name: "X^mu", label: "切向量的分量", role: "known", note: R`和 \eqref{10.58} 中的 $\dd x^\mu/\dd t$ 是同一个东西。` },
        { id: "pd", tex: R`\frac{\partial V^\alpha}{\partial x^\mu}`, w: 2.5, name: "d_mu(V^alpha)", label: "分量的普通偏导数", role: "unknown", note: R`由 $\frac{\dd V}{\dd t}=X^\mu\partial_\mu V^\alpha T_\alpha$ 而来。` },
        { id: "adj", tex: R`#f#Amu#Vg`, glyph: R`\times`, name: "f * A^beta * V^gamma", label: "对易子的分量", role: "const",
          note: R`括号内的矩阵元 $f_{\beta\gamma}{}^\alpha\mathcal{A}_{i\mu}{}^\beta$ 相当于 \eqref{10.58} 中的 $\mathcal{A}_{i\mu}{}^\alpha{}_\gamma$，只是换成了伴随表示。`,
          kids: [
            { id: "f", tex: R`f_{\beta\gamma}{}^\alpha`, w: 6, name: "structure_constants", label: "结构常数：李代数的乘法表", role: "const",
              note: R`**群的非交换性全部由它体现。**它由 $[T_\beta,T_\gamma]=f_{\beta\gamma}{}^\alpha T_\alpha$ 定义。若结构常数为零，这一项消失，伴随场的协变导数退化成普通导数。` },
            { id: "Amu", tex: R`\mathcal{A}_{i\mu}{}^\beta`, w: 2.5, name: "A_mu^beta", label: "规范势的李代数分量", role: "known", note: R`这里只带一个李代数指标 $\beta$，不像 \eqref{10.58} 那样是 $V$ 上的矩阵。` },
            { id: "Vg", tex: R`V^\gamma`, w: 1.2, name: "V^gamma", label: "场的李代数分量", role: "unknown", note: R`与上面的 $V(t)$ 对应，按基 $T_\gamma$ 展开。` },
          ] },
        { id: "basis", tex: R`[(\sigma_i(0),T_\alpha)]`, w: 1.2, name: "adjoint_basis", label: "伴随丛的基截面", role: "known", note: R`和 \eqref{10.58} 中 $e_\alpha$ 的角色相同。` },
      ] },
  ],
};

// §10.6 Born–Oppenheimer：慢波函数的方程
export const FM_10_147 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "H_slow(Phi) == E * Phi", label: "投影到快本征态后的慢自由度方程", role: "const",
  note: R`这是总本征方程左乘 $\langle${bR}|$ 的结果，其中已用 \eqref{10.148} 略去非对角元。快自由度只留下两样东西：Berry 联络和能级 $\epsilon_n$。`,
  kids: [
    { id: "lhs", tex: R`#kin+#pot`, name: "kinetic(Phi) + potential(Phi)", label: "慢自由度的动能和有效势能", role: "const",
      note: R`形式上和一个粒子的 Schrödinger 方程相同，但动能项里多了含 $\langle${bR}|\nabla_{${bR}}|${bR}\rangle$ 的项。`,
      kids: [
        { id: "kin", tex: R`#pref[#lap+#cross+#div+#sq]`, name: "-1/(2M) * [(grad + A)^2 Phi]", label: R`方括号展开后就是 $(\nabla+\mathcal{A})^2\Phi$`, role: "const",
          note: R`**四项合起来正是 $(\nabla+\mathcal{A})^2\Phi$，其中 $\mathcal{A}=\langle${bR}|\nabla_{${bR}}|${bR}\rangle$。**所以慢自由度感受到的是一个诱导矢势，见 \eqref{10.149}。`,
          kids: [
            { id: "pref", tex: R`-\frac1{2M}`, w: 1, name: "-1/(2M)", label: "慢自由度动能的系数", role: "const", note: R`$M$ 是慢自由度的质量，见 \eqref{10.143}。` },
            { id: "lap", tex: R`\nabla^2_{${bR}}\Phi(${bR})`, w: 2, name: "laplacian(Phi)", label: "没有规范势时的动能", role: "unknown", note: R`由 $\langle${bR}|${bR}\rangle=1$ 得到。如果快自由度不随 $${bR}$ 变化，方括号里就只剩这一项。` },
            { id: "cross", tex: R`#grad\cdot#berry`, name: "2 grad(Phi) . A", label: "交叉项：Berry 联络首次出现", role: "const",
              note: R`Laplace 算符作用在乘积 $\Phi|${bR}\rangle$ 上，产生两个梯度相乘的交叉项，再左乘 $\langle${bR}|$ 得到这一项。`,
              kids: [
                { id: "grad", tex: R`2\nabla_{${bR}}\Phi(${bR})`, w: 1.5, name: "2 grad(Phi)", label: "慢波函数的梯度", role: "unknown", note: R`系数 2 来自乘积求导，和 $(\nabla+\mathcal{A})^2$ 展开时的 $2\mathcal{A}\cdot\nabla$ 一致。` },
                { id: "berry", tex: R`\langle${bR}|\nabla_{${bR}}|${bR}\rangle`, w: 6, name: "berry_connection", label: "Berry 联络：快自由度留下的矢势", role: "known",
                  note: R`**这是整条方程的关键量。**它度量快本征态随 $${bR}$ 的变化，由 \eqref{10.150} 给出分量，并在 $H_{\rm eff}$ 中起矢势的作用。` },
              ] },
            { id: "div", tex: R`\Phi(${bR})\nabla_{${bR}}\cdot\langle${bR}|\nabla_{${bR}}|${bR}\rangle`, w: 2.5, name: "Phi * div(A)", label: "散度项：凑成平方必需", role: "unknown",
              note: R`算符 $\nabla_{${bR}}\cdot$ 只作用在联络上，不作用在 $\Phi$ 上。它来自 $\langle${bR}|\nabla^2_{${bR}}|${bR}\rangle$ 的处理。没有它，方括号就不等于 $(\nabla+\mathcal{A})^2\Phi$，见下面的勘误。` },
            { id: "sq", tex: R`\Phi(${bR})(\langle${bR}|\nabla_{${bR}}|${bR}\rangle)^2`, w: 2.5, name: "Phi * A^2", label: "联络的平方", role: "unknown",
              note: R`和散度项同样来自 $\langle${bR}|\nabla^2_{${bR}}|${bR}\rangle$，这里用 \eqref{10.148} 只保留了对角元 $n'=n$。` },
          ] },
        { id: "pot", tex: R`\epsilon_n(${bR})\Phi(${bR})`, w: 3, name: "level(R) * Phi", label: "快能级成为慢自由度的势能", role: "known",
          note: R`快自由度的动能和势能合起来就是 $h(${bR})$，用 \eqref{10.145} 换成本征值 $\epsilon_n$。它在 $H_{\rm eff}$ 中起势能的作用。` },
      ] },
    { id: "rhs", tex: R`E_n(${bR})\Phi(${bR})`, w: 1.5, name: "E * Phi", label: "总本征值乘慢波函数", role: "unknown",
      note: R`来自总哈密顿量的本征方程，右边左乘 $\langle${bR}|$ 后 $|${bR}\rangle$ 被归一化条件消去。` },
  ],
};
