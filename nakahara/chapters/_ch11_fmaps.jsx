// 第 11 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §11.1 Chern–Weil 定理 (b) 的证明：沿插值联络求导
export const FM_11_18 = {
  id: "eq", tex: R`#lhs=#mid=#rhs.`, name: "d_dt(P_r(F_t)) == term_D + term_sq", label: "沿插值线求导，再拆成两项", role: "const",
  note: R`从左到右是两次代入：先把 $\frac{\dd}{\dd t}\mathcal{F}_t$ 放进第一个变元，再用多线性拆开。这样拆是为了分别处理：第一项对接 \eqref{11.19}，第二项对接那条含 $[\mathcal{F}_t,\theta]$ 的恒等式，合起来正好是恰当形式。`,
  kids: [
    { id: "lhs", tex: R`\frac{\dd}{\dd t}P_r(\mathcal{F}_t)`, w: 2.5, name: "d_dt(P_r(F_t))", label: "$t$ 处示性形式的变化率", role: "result",
      note: R`\eqref{11.17} 中要对 $t$ 积分的被积函数。把它写成某个形式的外微分，两个联络的 $P_r$ 之差就是恰当形式。` },
    { id: "mid", tex: R`#midP(#dF,#midF)`, name: "r * P_tilde(dF_dt, F_t, ...)", label: R`代入 $\mathcal{F}_t$ 的 $t$ 导数`, role: "const",
      note: R`\eqref{11.17} 的被积函数，此时 $\frac{\dd}{\dd t}\mathcal{F}_t$ 已经算出。`,
      kids: [
        { id: "midP", tex: R`r\tilde P_r`, w: 1.5, name: "r * polarization", label: "对称给出因子 $r$", role: "const",
          note: R`求导时导数轮流落在 $r$ 个变元上。$\tilde P_r$ 对变元对称，所以这 $r$ 项相等，合并成系数 $r$。` },
        { id: "dF", tex: R`\mathcal{D}\theta+2t\theta^2`, w: 3, name: "dF_t/dt", label: "插值曲率对 $t$ 的导数", role: "known",
          note: R`对 \eqref{11.16} 的 $\mathcal{F}_t=\mathcal{F}+t\mathcal{D}\theta+t^2\theta^2$ 求导。$\mathcal{F}$ 不含 $t$，一次项和二次项各留下一项。` },
        { id: "midF", tex: R`\mathcal{F}_t,\ldots,\mathcal{F}_t`, w: 1, name: "rest = [F_t] * (r-1)", label: "其余变元", role: "const",
          note: R`没有被求导的变元，仍然是插值曲率。` },
      ] },
    { id: "rhs", tex: R`#cov+#sq`, name: "term_D + term_sq", label: "用多线性拆成两项", role: "const",
      note: R`两项之和等于 $r\,\dd[\tilde P_r(\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)]$。`,
      kids: [
        { id: "cov", tex: R`r\tilde P_r(#covD,#covF)`, name: "r * P_tilde(D_theta, F_t, ...)", label: "协变导数项：外微分的主体", role: "const",
          note: R`$\tilde P_r$ 不变，所以 $\dd$ 作用在 $\tilde P_r(\theta,\mathcal{F}_t,\ldots)$ 上可以换成 $\mathcal{D}$。这一项就是落在 $\theta$ 上的那部分，见 \eqref{11.19}。`,
          kids: [
            { id: "covD", tex: R`\mathcal{D}\theta`, w: 6, name: "D(theta)", label: "恰当形式的来源", role: "known",
              note: R`**$\dd$ 落在 $\theta$ 上给出的正是它。**$\theta=\mathcal{A}'-\mathcal{A}$ 按伴随变换，$\mathcal{D}\theta=\dd\theta+[\mathcal{A},\theta]$，$\tilde P_r(\mathcal{D}\theta,\ldots)$ 是 \eqref{11.19} 右边的第一项。` },
            { id: "covF", tex: R`\mathcal{F}_t,\ldots,\mathcal{F}_t`, w: 1, name: "rest = [F_t] * (r-1)", label: "其余变元", role: "const",
              note: R`$\dd$ 落在这些变元上的部分不在这一项里，它由下面的平方项提供。` },
          ] },
        { id: "sq", tex: R`#sqc\tilde P_r(#sqT,#sqF)`, name: "2rt * P_tilde(theta^2, F_t, ...)", label: "平方项：补上剩余部分", role: "const",
          note: R`\eqref{11.19} 比 $\tilde P_r(\mathcal{D}\theta,\ldots)$ 多出一项 $-(r-1)t\tilde P_r(\theta,[\mathcal{F}_t,\theta],\ldots)$。乘上 $r$ 后，它正好等于这里的平方项。`,
          kids: [
            { id: "sqc", tex: R`2rt`, w: 1.5, name: "2 * r * t", label: "$2t$ 来自求导，$r$ 来自对称", role: "const",
              note: R`$t^2\theta^2$ 求导得 $2t\theta^2$，再乘上公共因子 $r$。其中的 2 和 $[\theta,\theta]=2\theta^2$ 的 2 配合。` },
            { id: "sqT", tex: R`\theta^2`, w: 5, name: "theta ^ theta", label: R`正比于 $[\theta,\theta]$`, role: "known",
              note: R`$\theta$ 是一形式，分次对易子 $[\theta,\theta]=2\theta^2$。把不变性 \eqref{11.12} 用到 $\tilde P_r(\theta,\mathcal{F}_t,\ldots)$ 上，就把 $\tilde P_r(\theta^2,\ldots)$ 换成了 \eqref{11.19} 多出的那一项。` },
            { id: "sqF", tex: R`\mathcal{F}_t,\ldots,\mathcal{F}_t`, w: 1, name: "rest = [F_t] * (r-1)", label: "其余变元", role: "const",
              note: R`和上一项相同，都是 $r-1$ 个插值曲率。` },
          ] },
      ] },
  ],
};

// §11.5 三维陈–Simons 形式
export const FM_11_106b = {
  id: "eq", tex: R`#lhs=#tform=#final.`, name: "Q3 == integrate_t(...) == closed_form", label: "$j=2$：先写 $t$ 积分，再积出来", role: "const",
  note: R`把 \eqref{11.105} 取 $j=2$，代入 $\mathcal{F}_t$ \eqref{11.104}，再逐项做 $t$ 积分。中间一段说明系数从哪里来，最后一段是常用的形式。`,
  kids: [
    { id: "lhs", tex: R`Q_3(\mathcal{A},\mathcal{F})`, w: 2.5, name: "Q3", label: R`$\mathrm{ch}_2$ 的局部原函数`, role: "result",
      note: R`一个三形式，满足 $\mathrm{ch}_2=\dd Q_3$。由于它靠零联络定义，只在丛平凡的坐标卡上成立。` },
    { id: "tform", tex: R`#pre#tint\mathrm{str}(#A,#Ft)`, name: "prefactor * integrate_t(str(A, F_t))", label: "$t$ 积分还没做的形式", role: "const",
      note: R`\eqref{11.105} 在 $j=2$ 时的样子。对称化迹只有两个变元，而 $\mathcal{F}_t$ 是偶次形式，可以在迹中循环，所以 $\mathrm{str}(\mathcal{A},X)=\Tr(\mathcal{A}X)$。`,
      kids: [
        { id: "pre", tex: R`\Big(\frac{\mathrm{i}}{2\pi}\Big)^2`, w: 1.4, name: "chern_norm ** 2", label: "陈特征的归一化", role: "const",
          note: R`$\frac1{(j-1)!}$ 在 $j=2$ 时等于 1，只剩这个因子。` },
        { id: "tint", tex: R`\int_0^1\dd t\,`, w: 2, name: "for t in [0,1]", label: R`把联络从 0 开到 $\mathcal{A}$`, role: "const",
          note: R`沿 $\mathcal{A}_t=t\mathcal{A}$ 走一遍。积分 $\int_0^1t\,\dd t=\frac12$ 和 $\int_0^1t^2\,\dd t=\frac13$ 决定了最后的系数。` },
        { id: "A", tex: R`\mathcal{A}`, w: 1.5, name: "A - 0", label: "两个联络之差", role: "known",
          note: R`一般的超渡在这里放两个联络之差 $\theta$。另一个联络取零，差就是 $\mathcal{A}$ 本身。` },
        { id: "Ft", tex: R`#Ft1+#Ft2`, name: "F_t", label: R`插值曲率 $\mathcal{F}_t$`, role: "const",
          note: R`就是 \eqref{11.104}。两项对 $t$ 的幂次不同，所以 $\mathcal{F}_t\neq t\mathcal{F}$，这也是最后系数不相等的原因。`,
          kids: [
            { id: "Ft1", tex: R`t\,\dd\mathcal{A}`, w: 2, name: "t * dA", label: R`线性部分，积出 $\frac12$`, role: "known",
              note: R`和前面的 $\mathcal{A}$ 相乘后积分，得 $\frac12\Tr(\mathcal{A}\,\dd\mathcal{A})$。` },
            { id: "Ft2", tex: R`t^2\mathcal{A}^2`, w: 2, name: "t^2 * A^2", label: R`非线性部分，积出 $\frac13$`, role: "known",
              note: R`和前面的 $\mathcal{A}$ 相乘后积分，得 $\frac13\Tr\mathcal{A}^3$。` },
          ] },
      ] },
    { id: "final", tex: R`#pre2\Tr\Big(#AdA+#cubic\Big)`, name: "closed_form", label: "积分后的常用形式", role: "const",
      note: R`后面最常用的就是这个形式。它不是规范不变的，这种偏差正是本节后半段要算的东西。`,
      kids: [
        { id: "pre2", tex: R`\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2`, w: 1.5, name: "prefactor", label: R`和 $\mathrm{ch}_2$ 同样的前因子`, role: "const",
          note: R`$\frac12$ 是 $\int_0^1t\,\dd t$ 的结果，提到了迹外面。$\mathrm{ch}_2=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr\mathcal{F}^2$ 恰好有同样的前因子，所以可以约去。` },
        { id: "AdA", tex: R`\mathcal{A}\,\dd\mathcal{A}`, w: 5, name: "A ^ dA", label: "阿贝尔部分：U(1) 时只剩它", role: "known",
          note: R`U(1) 时 $\mathcal{A}^3=0$，这一项就是全部的 Chern–Simons 形式。例 11.10 的拓扑质量项正是这种结构。` },
        { id: "cubic", tex: R`\frac23\mathcal{A}^3`, w: 6, name: "(2/3) * A^3", label: R`非阿贝尔部分：$\frac23$ 不能改`, role: "known",
          note: R`**系数 $\frac23$ 是 $\frac13$ 除以提出去的 $\frac12$。**只有这个相对系数才能让外微分给出 $\Tr\mathcal{F}^2$，见习题 11.4 的验证。` },
      ] },
  ],
};

// §11.5 五维陈–Simons 形式
export const FM_11_106c = {
  id: "eq", tex: R`#lhs=#tform=#final.`, name: "Q5 == integrate_t(...) == closed_form", label: "$j=3$：展开平方，再逐项积分", role: "const",
  note: R`和 $Q_3$ 的做法相同，只是 $\mathcal{F}_t$ 现在出现两次，展开后有三种 $t$ 幂次，所以迹内有三项。`,
  kids: [
    { id: "lhs", tex: R`Q_5(\mathcal{A},\mathcal{F})`, w: 3, name: "Q5", label: R`$\mathrm{ch}_3$ 的局部原函数`, role: "result",
      note: R`一个五形式，满足 $\mathrm{ch}_3=\dd Q_5$，同样只在丛平凡的坐标卡上成立。` },
    { id: "tform", tex: R`#pre#tint\mathrm{str}[#A,#Ft]`, name: "prefactor * integrate_t(str(A, F_t, F_t))", label: "$t$ 积分还没做的形式", role: "const",
      note: R`\eqref{11.105} 在 $j=3$ 时的样子。$\mathcal{F}_t$ 是偶次形式，所以对称化迹可以直接写成 $\Tr[\mathcal{A}\mathcal{F}_t^2]$。`,
      kids: [
        { id: "pre", tex: R`\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^3`, w: 1, name: "prefactor", label: "阶乘因子乘归一化", role: "const",
          note: R`$j=3$ 时 $\frac1{(j-1)!}=\frac12$，后面是陈特征的归一化因子。` },
        { id: "tint", tex: R`\int_0^1\dd t\,`, w: 2, name: "for t in [0,1]", label: R`把联络从 0 开到 $\mathcal{A}$`, role: "const",
          note: R`$t$ 的幂次是 2、3、4，分别积出 $\frac13$、$\frac14$、$\frac15$。` },
        { id: "A", tex: R`\mathcal{A}`, w: 1.2, name: "A - 0", label: "两个联络之差", role: "known",
          note: R`另一个联络取零，所以这里就是 $\mathcal{A}$ 本身。它贡献一次形式，其余四次来自 $\mathcal{F}_t^2$。` },
        { id: "Ft", tex: R`(t\,\dd\mathcal{A}+t^2\mathcal{A}^2)^2`, w: 6, name: "F_t ** 2", label: "三项结构的来源", role: "known",
          note: R`**展开得 $t^2(\dd\mathcal{A})^2+t^3(\dd\mathcal{A}\,\mathcal{A}^2+\mathcal{A}^2\dd\mathcal{A})+t^4\mathcal{A}^4$。**$j$ 增大时 $\mathcal{F}_t$ 的幂次跟着增加，高维 CS 形式的项数就是这样多起来的。` },
      ] },
    { id: "final", tex: R`#pre2\Tr\Big[#t1+#t2+#t3\Big]`, name: "closed_form", label: "积分后的三项", role: "const",
      note: R`三项都是五形式。提出公因子 $\frac13$ 后，相对系数是 $1,\frac32,\frac35$。`,
      kids: [
        { id: "pre2", tex: R`\frac16\Big(\frac{\mathrm{i}}{2\pi}\Big)^3`, w: 1, name: "prefactor", label: R`$\frac12\times\frac13$`, role: "const",
          note: R`前面的 $\frac12$ 乘上提出来的 $\frac13$。` },
        { id: "t1", tex: R`\mathcal{A}(\dd\mathcal{A})^2`, w: 3.5, name: "A dA dA", label: "$t^2$ 项：U(1) 时只剩它", role: "known",
          note: R`$\int_0^1t^2\,\dd t=\frac13$，提出 $\frac13$ 后系数为 1。U(1) 时 $\mathcal{A}^3$ 和 $\mathcal{A}^5$ 都为零，只有这一项留下。` },
        { id: "t2", tex: R`\frac32\mathcal{A}^3\dd\mathcal{A}`, w: 3.5, name: "(3/2) * A^3 dA", label: "$t^3$ 项：两个交叉项合并", role: "known",
          note: R`$\dd\mathcal{A}\,\mathcal{A}^2$ 和 $\mathcal{A}^2\dd\mathcal{A}$ 的迹相等，因为偶次形式 $\mathcal{A}^2$ 可以循环移动。于是 $2\times\frac14=\frac12$，除以 $\frac13$ 得 $\frac32$。` },
        { id: "t3", tex: R`\frac35\mathcal{A}^5`, w: 2.5, name: "(3/5) * A^5", label: "$t^4$ 项：最高非线性", role: "known",
          note: R`$\int_0^1t^4\,\dd t=\frac15$，除以 $\frac13$ 得 $\frac35$。` },
      ] },
  ],
};

// §11.5 ch_2 = dQ_3 的分量形式
export const FM_11_107 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "instanton_density == div(cs_current)", label: "瞬子密度是一个流的散度", role: "const",
  note: R`把 $\mathrm{ch}_2=\dd Q_3$ 写成分量，两边的前因子已约去。左边规范不变，右边的流不是，但它的散度是。`,
  kids: [
    { id: "lhs", tex: R`\Tr[#eps#FF]`, name: "tr(eps * F * F)", label: "瞬子密度", role: "result",
      note: R`$\Tr\mathcal{F}^2$ 的分量形式，差一个因子 $\frac14$，来自 $\mathcal{F}=\frac12\mathcal{F}_{\kappa\lambda}\dd x^\kappa\wedge\dd x^\lambda$。`,
      kids: [
        { id: "eps", tex: R`\epsilon^{\kappa\lambda\mu\nu}`, w: 1, name: "wedge_to_density", label: "四形式变成标量密度", role: "const",
          note: R`$\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\epsilon^{\kappa\lambda\mu\nu}\dd^4x$，外积的反对称性都由它承担。` },
        { id: "FF", tex: R`\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}`, w: 3.5, name: "F * F", label: "两个场强分量", role: "known",
          note: R`含 $\mathcal{A}$ 的导数和对易子。代入展开后，四次项 $\epsilon\Tr(\mathcal{A}_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)$ 因 $\epsilon$ 的反对称性为零，右边因此不需要四次项。` },
      ] },
    { id: "rhs", tex: R`#div\big[#four#epsR\Tr\big(#kin+#cub\big)\big]`, name: "div(4 * eps * tr(cs))", label: "Chern–Simons 流的散度", role: "const",
      note: R`方括号里是 $Q_3$ 的分量，也就是 Chern–Simons 流。积分时可以用 Stokes 定理把体积分化成边界积分。`,
      kids: [
        { id: "div", tex: R`\partial_\kappa`, w: 6, name: "div", label: "全导数：拓扑荷住在边界", role: "const",
          note: R`**这个导数是整条式子的意义所在。**被积函数是全导数，所以瞬子数只由无穷远处的场决定，局部改变场不会改变它。` },
        { id: "four", tex: R`4`, w: 2, name: "from (1/2)^2", label: R`系数来自两个 $\frac12$`, role: "const",
          note: R`左边有 $\Tr\mathcal{F}^2=\frac14\epsilon\Tr\mathcal{F}\mathcal{F}\,\dd^4x$，右边的 $\dd$ 没有这个 $\frac14$。阿贝尔情形可以直接验证，详见下方勘误。` },
        { id: "epsR", tex: R`\epsilon^{\kappa\lambda\mu\nu}`, w: 1, name: "wedge_to_density", label: "把外微分写成分量", role: "const",
          note: R`$\dd$ 在三形式前面加上 $\partial_\kappa\dd x^\kappa$，四个 $\dd x$ 合成 $\epsilon^{\kappa\lambda\mu\nu}\dd^4x$。` },
        { id: "kin", tex: R`\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu`, w: 3.5, name: "A * dA", label: R`$\mathcal{A}\,\dd\mathcal{A}$ 的分量`, role: "known",
          note: R`U(1) 时只有这一项，式子变成 $F\tilde F$ 是 Chern–Simons 流散度这一熟知结果。` },
        { id: "cub", tex: R`\tfrac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu`, w: 3, name: "(2/3) * A^3", label: R`$\frac23\mathcal{A}^3$ 的分量`, role: "known",
          note: R`非阿贝尔部分。$\partial_\kappa$ 落在三个 $\mathcal{A}$ 上给出三个相等的项，$\frac83\cdot3=8$，正好等于左边展开的交叉项系数。` },
      ] },
  ],
};
