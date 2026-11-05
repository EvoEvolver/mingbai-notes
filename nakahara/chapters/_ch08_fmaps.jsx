// 第 8 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §8.3 (r,s) 形式的分量
export const FM_8_38 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "component == form(basis_vectors)", label: "分量就是形式在基向量上的取值", role: "const",
  note: R`左边是展开式 \eqref{8.35} 里的系数，右边是一次求值。这条式子说明系数不用靠展开去猜，直接把基向量喂给 $\omega$ 就读出来了。`,
  kids: [
    { id: "lhs", tex: R`\omega_{#mu#nu}`, name: "omega[mu_list, nubar_list]", label: "要读出的分量：指标分成两组", role: "result",
      note: R`指标的写法已经说明了喂法：有 $r$ 个不带横线的指标和 $s$ 个带横线的指标。各组内部全反对称，所以只有两组的指标集合才是实质信息。`,
      kids: [
        { id: "mu", tex: R`\mu_1\ldots\mu_r`, w: 2, name: "mu_list", label: "$r$ 个全纯指标", role: "result", note: R`逐一对应右边前 $r$ 个槽位里的 $\partial/\partial z^{\mu_k}$。` },
        { id: "nu", tex: R`\bar\nu_1\ldots\bar\nu_s`, w: 2, name: "nubar_list", label: "$s$ 个反全纯指标", role: "result", note: R`逐一对应右边后 $s$ 个槽位里的 $\partial/\partial\bar z^{\nu_k}$。` },
      ] },
    { id: "rhs", tex: R`#form\left(#hol,#anti\right)`, name: "omega(*hol, *antihol)", label: "把 $q=r+s$ 个向量喂给形式", role: "const",
      note: R`形式是多重线性反对称的函数，这里把它在一组特定向量上求值，结果是一个函数，不再是形式。`,
      kids: [
        { id: "form", tex: R`\omega`, w: 2.5, name: "form", label: "被求值的复 $q$ 形式", role: "known",
          note: R`**即使 $\omega$ 含多个双次部分，这样求值也只读出 $(r,s)$ 块。**这正是分解 \eqref{8.36a} 唯一性的一种证法。` },
        { id: "hol", tex: R`\frac{\partial}{\partial z^{\mu_1}},\ldots,\frac{\partial}{\partial z^{\mu_r}}`, w: 5, name: "hol_basis[r]", label: R`$r$ 个全纯基向量：只有 $\dd z$ 能接住`, role: "known",
          note: R`**因为 $\langle\dd\bar z^\nu,\partial/\partial z^\mu\rangle=0$，这些槽位只能由 $\dd z$ 填上。**这就把形式中 $\dd z$ 的个数卡死为 $r$。` },
        { id: "anti", tex: R`\frac{\partial}{\partial\bar z^{\nu_1}},\ldots,\frac{\partial}{\partial\bar z^{\nu_s}}`, w: 5, name: "antihol_basis[s]", label: R`$s$ 个反全纯基向量：只有 $\dd\bar z$ 能接住`, role: "known",
          note: R`同理，$\langle\dd z^\mu,\partial/\partial\bar z^\nu\rangle=0$，这些槽位只能由 $\dd\bar z$ 填上，把 $\dd\bar z$ 的个数卡死为 $s$。` },
      ] },
  ],
};

// §8.4 降指标后的 Hermite 曲率（共轭类型）
export const FM_8_76b = {
  id: "eq", tex: R`#lhs\equiv#low=#rhs`, name: "R_lowered := g * R_up == formula(g)", label: "曲率全部用度规及其导数写出", role: "const",
  note: R`先用定义降指标，再用 \eqref{8.75b} 算出结果。右边没有联络系数，只有度规、度规的逆和度规的一、二阶导数。`,
  kids: [
    { id: "lhs", tex: R`R_{\kappa\bar\lambda\mu\bar\nu}`, w: 2, name: "R_lowered", label: "全部降下来的曲率分量", role: "result",
      note: R`指标类型依次是全纯、反全纯、全纯、反全纯。它是 \eqref{8.76a} 的复共轭类型，由 \eqref{8.74} 可知这是少数不为零的类型之一。` },
    { id: "low", tex: R`#gdown#Rup`, glyph: R`\times`, name: "lower_index(R_up)", label: "定义：用度规把第一个指标降下来", role: "const",
      note: R`这一段是定义，还没有开始计算。`,
      kids: [
        { id: "gdown", tex: R`g_{\kappa\bar\xi}`, w: 1.2, name: "metric", label: R`度规：把 $\bar\xi$ 换成 $\kappa$`, role: "known", note: R`对 $\bar\xi$ 求和。Hermite 度规只有混合分量，所以上指标 $\bar\xi$ 降下来变成不带横线的 $\kappa$。` },
        { id: "Rup", tex: R`R^{\bar\xi}{}_{\bar\lambda\mu\bar\nu}`, w: 2, name: "R_up", label: R`\eqref{8.75b} 给出的曲率`, role: "known", note: R`\eqref{8.75b} 把它写成 $\partial_\mu(g^{\bar\xi\eta}\partial_{\bar\nu}g_{\eta\bar\lambda})$。下面的两项就是这个导数按乘积法则展开的结果。` },
      ] },
    { id: "rhs", tex: R`#second-#quad`, name: "d2_metric - quad(d_metric)", label: "二阶导数项减去一阶导数的二次项", role: "const",
      note: R`$\partial_\mu$ 落在 $\partial_{\bar\nu}g$ 上得到第一项，落在度规的逆上得到第二项。`,
      kids: [
        { id: "second", tex: R`\partial_\mu\partial_{\bar\nu}g_{\bar\lambda\kappa}`, w: 6, name: "d_dbar(metric)", label: "度规的混合二阶导数：曲率的主体", role: "known",
          note: R`**在度规一阶导数为零的点，第二项消失，曲率就只剩这一项。**两个求导指标正好是曲率的后两个指标 $\mu$、$\bar\nu$。` },
        { id: "quad", tex: R`#ginv#dg1#dg2`, glyph: R`\times`, name: "ginv * dg * dbar_g", label: "一阶导数的二次修正", role: "const",
          note: R`前面的负号来自恒等式 $g_{\kappa\bar\xi}\partial_\mu g^{\bar\xi\eta}=-g^{\bar\xi\eta}\partial_\mu g_{\kappa\bar\xi}$，也就是对 $gg^{-1}=1$ 求导。`,
          kids: [
            { id: "ginv", tex: R`g^{\eta\bar\xi}`, w: 1.5, name: "metric_inverse", label: "度规的逆：把两个因子缩并起来", role: "known", note: R`$\bar\xi$ 和 $\eta$ 都是哑指标，分别与后面两个因子缩并。` },
            { id: "dg1", tex: R`\partial_\mu g_{\kappa\bar\xi}`, w: 2.5, name: "d(metric)", label: R`带走外指标 $\kappa$ 和 $\mu$`, role: "known", note: R`度规的全纯一阶导数。外指标 $\kappa$ 来自降指标用的度规，$\mu$ 来自 \eqref{8.75b} 最外层的求导。` },
            { id: "dg2", tex: R`\partial_{\bar\nu}g_{\bar\lambda\eta}`, w: 2.5, name: "dbar(metric)", label: R`带走外指标 $\bar\lambda$ 和 $\bar\nu$`, role: "known", note: R`度规的反全纯一阶导数，就是联络系数 $\Gamma^{\bar\xi}{}_{\bar\nu\bar\lambda}$ 里的那个导数。` },
          ] },
      ] },
  ],
};

// §8.5 两张卡上的 Kähler 势
export const FM_8_84 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "metric_in_chart_j == metric_in_chart_i", label: "同一个度规在两张卡上的分量相等", role: "const",
  note: R`度规是整体定义的，但势 $\mathcal{K}_i$、$\mathcal{K}_j$ 各属一张卡。这条式子是对势的约束，由它得出两个势只能相差全纯函数加反全纯函数。`,
  kids: [
    { id: "lhs", tex: R`#jw#jwb#gw`, glyph: R`\times`, name: "jacobian * jacobian_bar * g_w", label: "$w$ 卡的度规分量换算到 $z$ 坐标", role: "const",
      note: R`张量 $\dd w^\alpha\otimes\dd\bar w^\beta$ 用 $\dd z^\mu\otimes\dd\bar z^\nu$ 展开时带出两个 Jacobi 因子，指标 $\alpha,\beta$ 求和。`,
      kids: [
        { id: "jw", tex: R`\frac{\partial w^\alpha}{\partial z^\mu}`, w: 3, name: "jacobian", label: "全纯 Jacobi 矩阵", role: "known", note: R`坐标变换是全纯的，所以 $\dd w^\alpha$ 只含 $\dd z$，不会混进 $\dd\bar z$。` },
        { id: "jwb", tex: R`\frac{\partial\bar w^\beta}{\partial\bar z^\nu}`, w: 3, name: "jacobian_bar", label: "它的复共轭", role: "known", note: R`同理，$\dd\bar w^\beta$ 只含 $\dd\bar z$。度规的混合类型 $g_{\mu\bar\nu}$ 因此在换卡后保持不变。` },
        { id: "gw", tex: R`#ddw#Kj`, glyph: R`\times`, name: "d_dbar_w(K_j)", label: R`$U_j$ 上的度规 $g_{\alpha\bar\beta}$`, role: "const",
          note: R`这就是 \eqref{8.83} 在 $w$ 坐标下的写法。`,
          kids: [
            { id: "ddw", tex: R`\frac{\partial}{\partial w^\alpha}\frac{\partial}{\partial\bar w^\beta}`, w: 2.5, name: "d_dbar_w", label: "$w$ 坐标下的混合二阶导数", role: "const", note: R`$w$ 是 $z$ 的全纯函数，所以把两个 Jacobi 因子乘上去，它就正好成为 $\partial_{z^\mu}\partial_{\bar z^\nu}$ 作用在同一个函数上。` },
            { id: "Kj", tex: R`\mathcal{K}_j`, w: 3.5, name: "kahler_potential_j", label: "$U_j$ 上的 Kähler 势", role: "unknown", note: R`它和 $\mathcal{K}_i$ 的关系正是这条式子要推出的：$\mathcal{K}_j=\mathcal{K}_i+\phi_{ij}(z)+\psi_{ij}(\bar z)$。` },
          ] },
      ] },
    { id: "rhs", tex: R`#ddz#Ki`, glyph: R`\times`, name: "d_dbar_z(K_i)", label: R`$U_i$ 上的度规 $g_{\mu\bar\nu}$`, role: "const",
      note: R`这是 \eqref{8.83} 本身。两边因此都是同一个算符分别作用在 $\mathcal{K}_j$ 和 $\mathcal{K}_i$ 上。`,
      kids: [
        { id: "ddz", tex: R`\frac{\partial}{\partial z^\mu}\frac{\partial}{\partial\bar z^\nu}`, w: 5, name: "d_dbar_z", label: R`$\partial\bar\partial$ 决定势的自由度`, role: "const",
          note: R`**全纯函数和反全纯函数都被这个算符消灭，所以势只确定到这样的差。**反过来，差 $f=\mathcal{K}_j-\mathcal{K}_i$ 满足 $\partial_\mu\partial_{\bar\nu}f=0$，局部积分就得到这个形式。因此 Kähler 势一般不是整体函数。` },
        { id: "Ki", tex: R`\mathcal{K}_i`, w: 3.5, name: "kahler_potential_i", label: "$U_i$ 上的 Kähler 势", role: "unknown", note: R`实函数，只在卡 $U_i$ 上定义。$\CP^m$ 上不同卡的势就不能拼成整体函数。` },
      ] },
  ],
};
