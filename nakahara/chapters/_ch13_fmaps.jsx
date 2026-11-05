// 第 13 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
import { TR } from "./_ch13_tex.js";

const R = String.raw;

// §13.1 非阿贝尔反常：和 ABJ 反常对比
export const FM_13_9 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "cov_div(j)[alpha] == anomaly", label: "规范流的散度不为零，骨架和 ABJ 反常相同", role: "const",
  note: R`到单圈为止，手征费米子的规范流不再守恒。把它和 \eqref{13.5} 的第二行对比：两个括号的骨架一样，差别只在两个数值，整体系数和三次项系数。这两个数的来源要到后面几节才讲清。`,
  kids: [
    { id: "lhs", tex: R`(\mathcal{D}_\mu j^\mu)^\alpha`, w: 3.5, name: "cov_div(current)[alpha]", label: "规范流的协变散度", role: "result",
      note: R`流 $j^{\mu\alpha}$ 由 \eqref{13.8} 定义，只含正手征分量，带一个群指标 $\alpha$。这里用的是协变导数 $\mathcal{D}_\mu$，因为流带群指标；轴矢流 \eqref{13.5} 用的是普通的 $\partial_\mu$。` },
    { id: "rhs", tex: R`#coef#body`, glyph: R`\times`, name: "coef * trace(...)", label: "反常：数值系数 × 规范场的迹", role: "const",
      note: R`右边只含外规范场 $\mathcal{A}$，不含费米子场。`,
      kids: [
        { id: "coef", tex: R`\frac{1}{24\pi^2}`, w: 6, name: "overall_coef", label: R`比 ABJ 的 $\frac1{4\pi^2}$ 小 6 倍`, role: "const",
          note: R`**第一个差别。**它不是凑出来的：§13.5 将说明它等于 $2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3$，由六维的指标定理定出。` },
        { id: "body", tex: R`${TR}\Big[#T#de#cs\Big]`, name: "trace(T * d(form))", label: R`带群指标 $\alpha$ 的迹`, role: "const",
          note: R`$\mathcal{A}$ 取值于 Lie 代数，是矩阵。迹把方括号里的矩阵乘积变成一个数，每个 $\alpha$ 对应一个数。`,
          kids: [
            { id: "T", tex: R`T^\alpha`, w: 3, name: "generator[alpha]", label: R`挑出群指标 $\alpha$ 的分量`, role: "const",
              note: R`\eqref{13.5} 的方括号里没有这个因子，所以那边的流不带群指标。这里多了 $T^\alpha$，左边才有对应的 $\alpha$。` },
            { id: "de", tex: R`\partial_\kappa\epsilon^{\kappa\lambda\mu\nu}`, w: 2, name: "antisym_derivative", label: "全反对称地求导", role: "const",
              note: R`括号里的量带指标 $\lambda\mu\nu$，这个组合把它们和求导指标 $\kappa$ 全反对称地缩并，右边因此是一个全散度的形状。` },
            { id: "cs", tex: R`\Big(#prim+#cub\Big)`, name: "A dA + (1/2) A^3", label: "两项，和 ABJ 的括号同形", role: "known",
              note: R`\eqref{13.5} 的括号是陈–Simons 形式 $\mathcal{A}\partial\mathcal{A}+\frac23\mathcal{A}^3$。这里两项不变，只是三次项的系数变了。`,
              kids: [
                { id: "prim", tex: R`\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu`, w: 3.5, name: "A dA", label: "二次项：两种反常都有", role: "known",
                  note: R`对 $\mathcal{A}$ 是二次的，两种反常里系数都是 1，所以这一项是比较的基准。` },
                { id: "cub", tex: R`#half#aaa`, glyph: R`\times`, name: "(1/2) * A^3", label: "三次项", role: "const",
                  note: R`这一项的系数把非阿贝尔反常和 ABJ 反常区分开来。`,
                  kids: [
                    { id: "half", tex: R`\frac12`, w: 8, name: "cubic_coef", label: R`是 $\frac12$，不是 $\frac23$`, role: "const",
                      note: R`**第二个差别，也是这条公式最值得记住的数。**$\frac23$ 来自陈–Simons 形式；$\frac12$ 来自下降方程对插值参数 $t$ 的积分，积分带权重 $(1-t)$（§13.4.4，交互图 2）。` },
                    { id: "aaa", tex: R`\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu`, w: 2, name: "A A A", label: "三个规范场的乘积", role: "known",
                      note: R`三个 $\mathcal{A}$ 和全反对称的 $\epsilon$ 缩并。如果 $\mathcal{A}$ 的分量彼此对易，这一项就是零，所以它只在规范群非阿贝尔时出现。` },
                  ] },
              ] },
          ] },
      ] },
  ],
};

// §13.3 去掉 v 之后的散度：反常相消看的就是它
export const FM_13_57 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "cov_div(<j>)[alpha] == anomaly", label: "有效作用量的规范变分，写成流的散度", role: "const",
  note: R`由 \eqref{13.56} 去掉任意的规范参数 $v^\alpha$ 得到。和手征反常 \eqref{13.33} 比有两处不同：$\mathcal{A}^3$ 前的系数，以及整体因子。`,
  kids: [
    { id: "lhs", tex: R`\mathcal{D}_\mu\langle j^\mu\rangle_\alpha`, w: 5, name: "cov_div(<current>)[alpha]", label: "流的期望值不守恒", role: "result",
      note: R`$\langle j^\mu\rangle_\alpha$ 是有效作用量 $W_r$ 对 $A_\mu{}^\alpha$ 的变分（\eqref{13.54}、\eqref{13.56}）。散度不为零，说明 $W_r$ 在规范变换下会变，经典的规范对称性没有保住。` },
    { id: "rhs", tex: R`#coef#body`, glyph: R`\times`, name: "coef * trace(...)", label: "反常：数值系数 × 规范场的迹", role: "const",
      note: R`被积式 $\dd[\mathcal{A}\dd\mathcal{A}+\frac12\mathcal{A}^3]$ 的分量形式。这条结果对费米子是线性可加的，多个手征费米子的总反常是各自贡献之和。`,
      kids: [
        { id: "coef", tex: R`\frac1{24\pi^2}`, w: 4, name: "overall_coef", label: "这里只是写下，§13.5 才定出", role: "const",
          note: R`\eqref{13.33} 的整体因子是 $\frac{\mathrm{i}}{4\pi^2}$。这里的系数不带显式的 $\mathrm{i}$，§13.5 用指标定理把它定出来。` },
        { id: "body", tex: R`${TR}\{#T#eps#deriv\}`, name: "trace(T * eps * d(form))", label: "欧氏约定下是纯虚数", role: "const",
          note: R`生成元反 Hermite，$\Tr(T_\alpha\{T_\beta,T_\gamma\})$ 取复共轭等于 $(-1)^3$ 乘自身，所以是纯虚数。主项因此是纯虚的，只有 $\mathrm{Im}\,W$ 随规范变换改变。`,
          kids: [
            { id: "T", tex: R`T_\alpha`, w: 5, name: "generator[alpha]", label: "三个生成元中的第一个", role: "const",
              note: R`把 $\mathcal{A}$ 按生成元展开后，主项的迹里有 $T_\alpha$ 和另外两个生成元。费米子的表示就通过这些生成元进入反常。` },
            { id: "eps", tex: R`\epsilon^{\kappa\lambda\mu\nu}`, w: 1.5, name: "levi_civita", label: "全反对称缩并", role: "const",
              note: R`把四个时空指标全反对称地缩并，这对应形式语言里的楔积。` },
            { id: "deriv", tex: R`\partial_\kappa[#prim+#cub]`, name: "d(A dA + (1/2) A^3)", label: "外导数作用在三形式上", role: "const",
              note: R`形式语言下就是 \eqref{13.56} 里的 $\dd[\mathcal{A}\dd\mathcal{A}+\frac12\mathcal{A}^3]$。`,
              kids: [
                { id: "prim", tex: R`\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu`, w: 8, name: "A dA", label: "主项：决定反常能否相消", role: "known",
                  note: R`**$\partial_\kappa$ 作用后得到两个 $\dd\mathcal{A}$，它们对称地出现，只挑出对称迹 $d_{\alpha\beta\gamma}(\boldsymbol r)=\frac12\Tr_{\boldsymbol r}(T_\alpha\{T_\beta,T_\gamma\})$。**反常相消的条件是 $\sum_kd_{\alpha\beta\gamma}(\boldsymbol r_k)=0$，实表示和赝实表示的 $d_{\alpha\beta\gamma}$ 为零。` },
                { id: "cub", tex: R`#half#aaa`, glyph: R`\times`, name: "(1/2) * A^3", label: "三次项：跟着主项走", role: "const",
                  note: R`三次项的系数由 Wess–Zumino 条件和主项捆绑在一起（§13.4），不提供独立的相消条件。`,
                  kids: [
                    { id: "half", tex: R`\tfrac12`, w: 3, name: "cubic_coef", label: R`\eqref{13.33} 里是 $\tfrac23$`, role: "const",
                      note: R`和手征反常的第一处不同。` },
                    { id: "aaa", tex: R`\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu`, w: 1.5, name: "A A A", label: "三个规范场的乘积", role: "known",
                      note: R`和 $\epsilon$ 缩并后，只有在 $\mathcal{A}$ 的分量不对易时才不为零。` },
                  ] },
              ] },
          ] },
      ] },
  ],
};

// §13.5 拓扑方法得到的结果：系数不再是输入
export const FM_13_105 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "cov_div(<j>)[alpha] == 2 pi i * Q1_4", label: "从指标定理推出的 Bardeen 反常", role: "const",
  note: R`\eqref{13.104} 令 $\theta=0$（$g=e$）得到。形式和 \eqref{13.56}、\eqref{13.57} 相同，但这回连系数都是推出来的，全程没有计算 Feynman 图。`,
  kids: [
    { id: "lhs", tex: R`\mathcal{D}_\mu\langle j^\mu\rangle_\alpha`, w: 3, name: "cov_div(<current>)[alpha]", label: "沿规范轨道一步的变化", role: "result",
      note: R`\eqref{13.103} 把沿规范轨道走一步时 $W$ 的变化写成了散度的形式。$\theta=0$ 时 $\mathcal{A}^{g(\theta)}$ 回到 $\mathcal{A}$，去掉鬼场 $\omega$，就得到这里的散度。` },
    { id: "rhs", tex: R`#coef#body`, glyph: R`\times`, name: "coef * trace(...)", label: R`$2\pi\mathrm{i}\int Q^1_4$ 的具体形式`, role: "const",
      note: R`右边就是 $Q^1_4$ 带上归一化。它来自六维的陈特征 $\mathrm{ch}_3$ 的一阶下降。`,
      kids: [
        { id: "coef", tex: R`\frac1{24\pi^2}`, w: 8, name: "normalization", label: "由整数指标定出，WZ 条件定不了", role: "const",
          note: R`**这是这条公式的收获。**$2\pi\mathrm{i}\cdot\frac16\big(\frac{\mathrm{i}}{2\pi}\big)^3=\frac1{24\pi^2}$，其中 $2\pi\mathrm{i}$ 来自 \eqref{13.103}，其余来自 $Q^1_4$。Wess–Zumino 条件只限制形式，定不出归一化；这里的归一化由指标是整数这一点保证。` },
        { id: "body", tex: R`${TR}\,#T#eps#deriv`, name: "trace(T * eps * d(form))", label: "$Q^1_4$ 里的迹", role: "const",
          note: R`对应 \eqref{13.104} 第二行的 $\Tr\,\omega\,\dd[\cdots]$，这里把形式写成了分量。`,
          kids: [
            { id: "T", tex: R`T_\alpha`, w: 2, name: "generator[alpha]", label: R`$\omega$ 的生成元`, role: "const",
              note: R`$\omega$ 取值于 Lie 代数，在 \eqref{13.104} 中处于迹的最前面。去掉系数 $\omega^\alpha$ 后，留下的是生成元 $T_\alpha$。` },
            { id: "eps", tex: R`\epsilon^{\kappa\lambda\mu\nu}`, w: 1.2, name: "levi_civita", label: "全反对称缩并", role: "const",
              note: R`形式语言里的楔积写成分量后，就是这个 $\epsilon$。` },
            { id: "deriv", tex: R`\partial_\kappa\Big[#prim+#cub\Big]`, name: "d(A dA + (1/2) A^3)", label: R`\eqref{13.104} 的方括号，$g=e$ 时`, role: "const",
              note: R`\eqref{13.82} 中的 $\omega\,\dd(\mathcal{A}\mathcal{F}_t)$ 对 $t$ 积分后的结果。这里 $l=2$，$\mathcal{F}_t=t\,\dd\mathcal{A}+t^2\mathcal{A}^2$，所以两项分别带 $t$ 和 $t^2$。`,
              kids: [
                { id: "prim", tex: R`\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu`, w: 2.5, name: "A dA", label: R`$\mathcal{F}_t$ 中 $t\,\dd\mathcal{A}$ 的贡献`, role: "known",
                  note: R`积分 $\int_0^1(1-t)t\,\delta t=\frac16$，这个 $\frac16$ 提到括号外面，所以这一项的系数是 1。` },
                { id: "cub", tex: R`#half#aaa`, glyph: R`\times`, name: "(1/2) * A^3", label: R`$\mathcal{F}_t$ 中 $t^2\mathcal{A}^2$ 的贡献`, role: "const",
                  note: R`比 $\mathcal{A}\dd\mathcal{A}$ 多一个 $t$，积分的值就不一样。`,
                  kids: [
                    { id: "half", tex: R`\frac12`, w: 5, name: "ratio_of_t_integrals", label: "两个 $t$ 积分之比", role: "const",
                      note: R`$\int_0^1(1-t)t^2\,\delta t=\frac1{12}$，它除以 $\frac16$ 正好是 $\frac12$。权重 $(1-t)$ 就是这个数的来源。` },
                    { id: "aaa", tex: R`\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu`, w: 1.5, name: "A A A", label: "三个规范场的乘积", role: "known",
                      note: R`对应 \eqref{13.104} 的 $(\mathcal{A}^{g})^3$，$g=e$ 时写成这样。` },
                  ] },
              ] },
          ] },
      ] },
  ],
};
