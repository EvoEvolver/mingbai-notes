// 第 12 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §12.2 零阶矩
export const FM_12_13 = {
  id: "eq", tex: R`#dt+#div-#int=0,`, name: "moment_0(vlasov) == 0", label: "Vlasov 方程乘 $m$ 后对动量积分：三项之和为零", role: "const",
  note: R`前两项已经是流体语言：密度的变化和质量流的散度。第三项还是对分布函数的积分，把它算出来，这条式子就是连续性方程 \eqref{12.14}。`,
  kids: [
    { id: "dt", tex: R`\frac{\partial}{\partial t}\rho_{\rm m}(\boldsymbol x,t)`, w: 2.5, name: "d_dt(density)", label: "某点质量密度随时间的变化", role: "unknown",
      note: R`时间导数可以提到动量积分外面，剩下的 $\int\frac{d^3p}{(2\pi)^3}m f_{\rm m}$ 正是质量密度。这里的 $\rho_{\rm m}$ 带 $\boldsymbol x$，是含全部涨落的完整密度。` },
    { id: "div", tex: R`\frac1a\frac{\partial}{\partial x^j}\left[#rho#u\right]`, name: "div(mass_flux) / a", label: "流入或流出该点的质量", role: "const",
      note: R`来自 Vlasov 方程的漂移项 $\frac{p^j}{ma}\partial_jf_{\rm m}$。因子 $1/a$ 把共动坐标的梯度换算成物理梯度。方括号是质量流，流出为正，密度随之下降。`,
      kids: [
        { id: "rho", tex: R`\rho_{\rm m}(\boldsymbol x,t)`, w: 1.5, name: "density", label: "完整密度", role: "unknown", note: R`质量流的第一个因子。它和速度相乘，所以这一项本身就是非线性的。` },
        { id: "u", tex: R`u^j_{\rm m}(\boldsymbol x,t)`, w: 1.5, name: "bulk_velocity", label: "流体速度", role: "unknown", note: R`由 $\langle p^j\rangle_{f_{\rm m}}=\rho_{\rm m}u^j_{\rm m}$ 换来，这样动量平均就写成了流体量。` },
      ] },
    { id: "int", tex: R`\int#meas#m\left[#hub+#grav\right]#dpf`, name: "integrate(m * dp_dt * df_dp)", label: "动量变化项：分部积分后才看得清", role: "const",
      note: R`Vlasov 方程里让粒子动量改变的那一项，方括号是 $-dp^j/dt$。它的值取决于方括号对 $p^j$ 求导得到什么，所以要分部积分。`,
      kids: [
        { id: "meas", tex: R`\frac{d^3p}{(2\pi)^3}`, w: 0.8, name: "for p in momenta", label: "动量积分测度", role: "const", note: R`把所有动量的粒子加起来。` },
        { id: "m", tex: R`m`, w: 0.8, name: "mass", label: "零阶矩的权重", role: "const", note: R`权重是 $m$，不含 $p$，所以这是零阶矩，得到的是质量守恒。下一条 \eqref{12.15} 把权重换成 $p^i$，就得到动量方程。` },
        { id: "hub", tex: R`Hp^j`, w: 6, name: "hubble_redshift(p)", label: "膨胀红移：贡献全部的 $3H\\rho_{\\rm m}$", role: "known",
          note: R`**这一项正比于 $p^j$，分部积分后留下 $\partial p^j/\partial p^j=3$，给出 \eqref{12.14} 中的 $3H\rho_{\rm m}$。**这个 3 是空间维数，对应膨胀造成的体积稀释。` },
        { id: "grav", tex: R`\frac ma\frac{\partial\Psi}{\partial x^j}`, w: 2.5, name: "gravity_kick", label: "引力：对质量守恒没有贡献", role: "known",
          note: R`势 $\Psi$ 只依赖 $t$ 和 $\boldsymbol x$，对 $p^j$ 求导为零，所以这一项在分部积分后消失。引力搬动粒子，但不改变质量的总账。` },
        { id: "dpf", tex: R`\frac{\partial}{\partial p^j}f_{\rm m}(\boldsymbol x,\boldsymbol p,t)`, w: 2.5, name: "df_dp", label: "分部积分要移走的导数", role: "unknown",
          note: R`把这个导数移到方括号上，留下 $f_{\rm m}$ 本身，积分就成了矩。边界项为零，因为动量无穷大处没有粒子。` },
      ] },
  ],
};

// §12.2 一阶矩
export const FM_12_15 = {
  id: "eq", tex: R`#dt+#div-#int=0.`, name: "moment_1(vlasov) == 0", label: "Vlasov 方程乘 $p^i$ 后对动量积分", role: "const",
  note: R`结构和零阶矩 \eqref{12.13} 完全一样，只是权重从 $m$ 换成了 $p^i$。多出的一个动量因子带来了一个新的未知量。`,
  kids: [
    { id: "dt", tex: R`\frac{\partial}{\partial t}\left[\rho_{\rm m}u^i_{\rm m}(\boldsymbol x,t)\right]`, w: 3, name: "d_dt(momentum_density)", label: "动量密度随时间的变化", role: "unknown",
      note: R`一阶矩 $\langle p^i\rangle_{f_{\rm m}}$ 就是 $\rho_{\rm m}u^i_{\rm m}$，也就是单位体积内的动量。` },
    { id: "div", tex: R`\frac{1}{ma}\frac{\partial}{\partial x^j}#second`, name: "div(momentum_flux) / (m a)", label: "动量流的散度", role: "const",
      note: R`漂移项 $\frac{p^j}{ma}\partial_jf_{\rm m}$ 再乘上权重 $p^i$，两个动量相乘，于是出现二阶矩。`,
      kids: [
        { id: "second", tex: R`\left\langle p^ip^j\right\rangle_{f_{\rm m}}`, w: 7, name: "second_moment", label: "新的未知量：方程组不再封闭", role: "unknown",
          note: R`**零阶矩的方程含一阶矩，一阶矩的方程又含二阶矩。**每往上取一阶都多一个未知量，这就是矩方程不封闭的问题。要继续下去，必须对它做分解和近似，见 \eqref{12.17}。` },
      ] },
    { id: "int", tex: R`\int#meas#pi\left[#hub+#grav\right]#dpf`, name: "integrate(p_i * dp_dt * df_dp)", label: "力项：分部积分后变成 $4H$ 项和引力项", role: "const",
      note: R`和 \eqref{12.13} 的第三项只差权重 $p^i$。正因为这个权重也依赖动量，分部积分时多出一项，下一式的系数才是 $4H$ 而不是 $3H$。`,
      kids: [
        { id: "meas", tex: R`\frac{d^3p}{(2\pi)^3}`, w: 0.8, name: "for p in momenta", label: "动量积分测度", role: "const", note: R`把所有动量的粒子加起来。` },
        { id: "pi", tex: R`p^i`, w: 3.5, name: "weight = p_i", label: "一阶矩的权重", role: "const", note: R`这是和零阶矩唯一的不同。分部积分时导数也会作用到它身上，既让 $Hp^j$ 项多贡献一个 $H$，也让引力项留了下来。` },
        { id: "hub", tex: R`Hp^j`, w: 3, name: "hubble_redshift(p)", label: "膨胀让动量红移", role: "known", note: R`膨胀使粒子的动量衰减，下一式中变成阻尼项 $4H\rho_{\rm m}u^i_{\rm m}$。` },
        { id: "grav", tex: R`\frac ma\frac{\partial\Psi}{\partial x^j}`, w: 3, name: "gravity_kick", label: "引力改变动量", role: "known", note: R`在零阶矩里这一项消失了，这里因为有权重 $p^i$ 而保留下来：引力不改变质量，但改变动量。` },
        { id: "dpf", tex: R`\frac{\partial}{\partial p^j}f_{\rm m}(\boldsymbol x,\boldsymbol p,t)`, w: 1.5, name: "df_dp", label: "分部积分要移走的导数", role: "unknown", note: R`移走后留下 $f_{\rm m}$ 本身，积分就成了 $\langle p^i\rangle_{f_{\rm m}}$ 和 $\langle1\rangle_{f_{\rm m}}$ 这样的低阶矩。` },
      ] },
  ],
};

// §12.2 分部积分之后的动量方程
export const FM_12_16 = {
  id: "eq", tex: R`#dt+#div+#hub+#grav=0.`, name: "momentum_balance == 0", label: "动量密度的收支：四项之和为零", role: "const",
  note: R`\eqref{12.15} 的积分算完之后，方程里只剩下矩和势：动量密度的变化由动量流、膨胀阻尼和引力三者决定。`,
  kids: [
    { id: "dt", tex: R`\frac{\partial}{\partial t}\left[\rho_{\rm m}u^i_{\rm m}(\boldsymbol x,t)\right]`, w: 4.5, name: "d_dt(momentum_density)", label: "动量密度随时间的变化", role: "unknown", note: R`这里是动量密度的方程，还不是速度的方程。要得到速度的方程，后面还要减去连续性方程。` },
    { id: "div", tex: R`\frac{1}{ma}\frac{\partial}{\partial x^j}#second`, name: "div(momentum_flux) / (m a)", label: "动量流的散度", role: "const",
      note: R`这一项没有参与分部积分，从 \eqref{12.15} 原样带下来。`,
      kids: [
        { id: "second", tex: R`\left\langle p^ip^j\right\rangle_{f_{\rm m}}`, w: 5, name: "second_moment", label: "还没解决的未知量", role: "unknown", note: R`力项已经算完，这是方程里唯一还不是流体量的东西。下一步用 \eqref{12.17} 把它拆成整体流和应力。` },
      ] },
    { id: "hub", tex: R`#coef#mom`, glyph: R`\times`, name: "4H * momentum_density", label: "膨胀对动量密度的阻尼", role: "const",
      note: R`分部积分中 $Hp^j$ 项的结果。动量密度衰减得比密度快，多出来的部分正是速度受到的阻尼。`,
      kids: [
        { id: "coef", tex: R`4H`, w: 6, name: "3 + 1", label: "3 来自稀释，1 来自红移", role: "known",
          note: R`**系数是 4 而不是 3。**对 $p^ip^j$ 求导时，导数落在 $p^j$ 上给出维数 3，落在权重 $p^i$ 上再给出 1。前者是密度的体积稀释，减去连续性方程后会被消掉，剩下的 $H$ 就是 Euler 方程里的 Hubble 拖曳。` },
        { id: "mom", tex: R`\rho_{\rm m}u^i_{\rm m}(\boldsymbol x,t)`, w: 1.5, name: "momentum_density", label: "被阻尼的动量密度", role: "unknown", note: R`一阶矩 $\langle p^i\rangle_{f_{\rm m}}$ 分部积分后又回到了自身。` },
      ] },
    { id: "grav", tex: R`#ainv#rho#dpsi`, glyph: R`\times`, name: "density * gravity / a", label: "引力对动量密度的推动", role: "const",
      note: R`分部积分后 $\partial p^i/\partial p^j=\delta^{ij}$ 把指标从 $j$ 换成 $i$。力作用在每个粒子上，所以按密度加权。`,
      kids: [
        { id: "ainv", tex: R`\frac1a`, w: 0.8, name: "to_physical", label: "共动梯度换算成物理梯度", role: "known", note: R`势的梯度是对共动坐标求的，除以 $a$ 才是物理的力。` },
        { id: "rho", tex: R`\rho_{\rm m}(\boldsymbol x,t)`, w: 1.5, name: "density", label: "完整密度", role: "unknown", note: R`由零阶矩 $\langle m\rangle_{f_{\rm m}}$ 而来。密度越高，单位体积受到的总力越大。` },
        { id: "dpsi", tex: R`\frac{\partial\Psi(\boldsymbol x,t)}{\partial x^i}`, w: 3, name: "grad(potential)", label: "势梯度：驱动物质汇聚", role: "unknown", note: R`引力势的梯度，驱动物质流向势阱。$\Psi$ 由 Poisson 方程决定，所以它也是要解的量。` },
      ] },
  ],
};

// §12.2 引入应力张量
export const FM_12_18 = {
  id: "eq", tex: R`#dt+#div+#hub+#grav=0.`, name: "momentum_balance == 0", label: "二阶矩拆开之后的动量方程", role: "const",
  note: R`和 \eqref{12.16} 的唯一区别在第二项：$\langle p^ip^j\rangle_{f_{\rm m}}$ 用 \eqref{12.17} 拆成了两部分，其余各项不变。`,
  kids: [
    { id: "dt", tex: R`\frac{\partial}{\partial t}\left[\rho_{\rm m}u^i_{\rm m}(\boldsymbol x,t)\right]`, w: 2.5, name: "d_dt(momentum_density)", label: "动量密度随时间的变化", role: "unknown", note: R`和下面的 $\rho_{\rm m}u^iu^j$、$4H$ 项合起来，减去连续性方程后就成了速度的方程 \eqref{12.19}。` },
    { id: "div", tex: R`\frac1a\frac{\partial}{\partial x^j}\left[#bulk+#stress\right]`, name: "div(bulk_flow + stress) / a", label: "动量流 = 整体流 + 弥散", role: "const",
      note: R`前因子从 $\frac{1}{ma}$ 变成 $\frac1a$，因为 \eqref{12.17} 已经把二阶矩除以了 $m$。`,
      kids: [
        { id: "bulk", tex: R`\rho_{\rm m}u^i_{\rm m}u^j_{\rm m}`, w: 3.5, name: "bulk_flow_flux", label: "整体流动带走的动量", role: "unknown", note: R`流体以速度 $u^j_{\rm m}$ 搬运自身的动量。它只含 $\rho_{\rm m}$ 和 $u^i_{\rm m}$，已经是闭合的流体量。` },
        { id: "stress", tex: R`\sigma^{ij}_{\rm m}`, w: 7, name: "stress_tensor", label: "相对平均速度的弥散：决定方程能否封闭", role: "unknown",
          note: R`**未知量都藏到了这里。**它是粒子动量相对平均速度的弥散，作用相当于广义的压强。冷分布函数 \eqref{12.9} 给出 $\sigma^{ij}_{\rm m}=0$，丢掉它，方程组就封闭了。真实情形下能不能丢，要到有效流体 \eqref{12.52} 再回答。` },
      ] },
    { id: "hub", tex: R`#coef#mom`, glyph: R`\times`, name: "4H * momentum_density", label: "膨胀对动量密度的阻尼", role: "const",
      note: R`从 \eqref{12.16} 原样带下来。`,
      kids: [
        { id: "coef", tex: R`4H`, w: 3, name: "3 + 1", label: "下一步变成 $H$", role: "known", note: R`减去 $u^i_{\rm m}$ 乘连续性方程 \eqref{12.14} 时，其中的 $3H$ 正好抵消，只剩下 $H$。` },
        { id: "mom", tex: R`\rho_{\rm m}u^i_{\rm m}(\boldsymbol x,t)`, w: 1.2, name: "momentum_density", label: "被阻尼的动量密度", role: "unknown", note: R`单位体积内的动量。` },
      ] },
    { id: "grav", tex: R`#pre#dpsi`, glyph: R`\times`, name: "density * gravity / a", label: "引力对动量密度的推动", role: "const",
      note: R`从 \eqref{12.16} 原样带下来。减去连续性方程不会改动这一项。`,
      kids: [
        { id: "pre", tex: R`\frac1a\rho_{\rm m}(\boldsymbol x,t)`, w: 1.2, name: "density / a", label: "按密度加权", role: "unknown", note: R`力按密度加权，$1/a$ 把共动梯度换算成物理梯度。` },
        { id: "dpsi", tex: R`\frac{\partial\Psi(\boldsymbol x,t)}{\partial x^i}`, w: 2.5, name: "grad(potential)", label: "势梯度", role: "unknown", note: R`引力势的梯度，驱动物质流向势阱。` },
      ] },
  ],
};

// §12.2 减去连续性方程
export const FM_12_19 = {
  id: "eq", tex: R`#dt+#adv+#hub+#grav+#stress=0.`, name: "density * euler == 0", label: "减去连续性方程后：每项都作用在速度上", role: "const",
  note: R`\eqref{12.18} 减去 $u^i_{\rm m}$ 乘 \eqref{12.14} 的结果。除应力项外每一项都带一个 $\rho_{\rm m}$，再除以它就是 Euler 方程 \eqref{12.20}。这里的 $\rho_{\rm m}$ 仍是含涨落的完整密度。`,
  kids: [
    { id: "dt", tex: R`\rho_{\rm m}\frac{\partial}{\partial t}u^i_{\rm m}`, w: 2.5, name: "density * d_dt(velocity)", label: "速度随时间的变化", role: "unknown",
      note: R`$\partial_t(\rho_{\rm m}u^i_{\rm m})$ 展开后，含 $\partial_t\rho_{\rm m}$ 的部分被连续性方程消掉，只剩下导数落在速度上的这一半。` },
    { id: "adv", tex: R`#pre#uj#grad`, glyph: R`\times`, name: "advection", label: "对流：速度场搬运自身", role: "const",
      note: R`同样由乘积求导得来：$\partial_j(\rho_{\rm m}u^iu^j)$ 中导数落在 $\rho_{\rm m}u^j$ 上的部分也被消掉。它和前一项合起来是速度的物质导数，也是这条方程里的二次非线性项。`,
      kids: [
        { id: "pre", tex: R`\frac1a\rho_{\rm m}`, w: 1, name: "density / a", label: "密度与坐标换算", role: "unknown", note: R`除以 $\rho_{\rm m}$ 后只剩 $1/a$。` },
        { id: "uj", tex: R`u^j_{\rm m}`, w: 3, name: "carrier_velocity", label: "负责搬运的速度", role: "unknown", note: R`流体沿自身速度的方向移动，下一个因子是它沿途看到的速度变化。` },
        { id: "grad", tex: R`\frac{\partial}{\partial x^j}u^i_{\rm m}`, w: 3, name: "grad(velocity)", label: "被搬运的速度梯度", role: "unknown", note: R`和 $u^j_{\rm m}$ 相乘后是速度的二次项，线性理论里没有它，微扰论 \eqref{12.24} 处理的正是这类项。` },
      ] },
    { id: "hub", tex: R`#H#mom`, glyph: R`\times`, name: "hubble_drag", label: "Hubble 拖曳", role: "const",
      note: R`\eqref{12.18} 的 $4H$ 减去连续性方程的 $3H$，剩下这一项。`,
      kids: [
        { id: "H", tex: R`H`, w: 5.5, name: "4H - 3H", label: "$3H$ 算稀释，只剩 $H$ 算阻尼", role: "known",
          note: R`**这一步最值得看的结果。**$3H$ 是密度的稀释，已经由连续性方程负责；速度真正感受到的只有 $H$。没有其他力时，速度就按 $1/a$ 衰减。` },
        { id: "mom", tex: R`\rho_{\rm m}u^i_{\rm m}`, w: 1.6, name: "momentum_density", label: "被阻尼的动量密度", role: "unknown", note: R`除以 $\rho_{\rm m}$ 后就是速度 $u^i_{\rm m}$ 本身。` },
      ] },
    { id: "grav", tex: R`#pre2#dpsi`, glyph: R`\times`, name: "density * gravity / a", label: "引力", role: "const",
      note: R`减去连续性方程时没有变化。除以 $\rho_{\rm m}$ 后就是单位质量受的力，和粒子的多少无关。`,
      kids: [
        { id: "pre2", tex: R`\frac1a\rho_{\rm m}`, w: 1, name: "density / a", label: "密度与坐标换算", role: "unknown", note: R`力按密度加权，$1/a$ 把共动梯度换算成物理梯度。` },
        { id: "dpsi", tex: R`\frac{\partial\Psi}{\partial x^i}`, w: 3, name: "grad(potential)", label: "势梯度：驱动物质汇聚", role: "unknown", note: R`驱动物质流向势阱的力，也是结构增长的来源。` },
      ] },
    { id: "stress", tex: R`\frac1a\frac{\partial}{\partial x^j}#sig`, name: "div(stress) / a", label: "应力：广义的压强力", role: "const",
      note: R`唯一不带 $\rho_{\rm m}$ 因子的一项，所以除以密度后变成 $\frac{1}{\rho_{\rm m}a}\partial_j\sigma^{ij}_{\rm m}$。`,
      kids: [
        { id: "sig", tex: R`\sigma^{ij}_{\rm m}`, w: 4, name: "stress_tensor", label: "冷物质为零，丢掉后方程封闭", role: "unknown", note: R`如果它是对角的，这一项就是压强梯度的力。标准微扰论丢掉它，从而封闭方程组；代价要到有效流体 \eqref{12.52} 才补回来。` },
      ] },
  ],
};

// §12.2 树图双谱
export const FM_12_51 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "三点关联 = 三角形约束 × 引力耦合的形状", role: "const",
  note: R`线性场是 Gauss 的，三点关联为零（\eqref{12.47}）。右边非零完全来自非线性演化，所以它是领头阶的结果。`,
  kids: [
    { id: "lhs", tex: R`\left\langle#d1#d2#d3\right\rangle`, name: "three_point(delta_m)", label: "Fourier 空间的三点关联", role: "result",
      note: R`三个波数处密度场乘积的系综平均。去掉 Dirac $\delta$ 约束和 $(2\pi)^3$ 之后，剩下的就是双谱。`,
      kids: [
        { id: "d1", tex: R`\delta_{\rm m}(\boldsymbol k_1,\eta)`, w: 2, name: "density(k1)", label: "三角形的第一条边", role: "result", note: R`波数 $\boldsymbol k_1$ 处的密度模式。` },
        { id: "d2", tex: R`\delta_{\rm m}(\boldsymbol k_2,\eta)`, w: 2, name: "density(k2)", label: "三角形的第二条边", role: "result", note: R`波数 $\boldsymbol k_2$ 处的密度模式。` },
        { id: "d3", tex: R`\delta_{\rm m}(\boldsymbol k_3,\eta)`, w: 2, name: "density(k3)", label: "三角形的第三条边", role: "result", note: R`波数 $\boldsymbol k_3$ 处的密度模式。三个模式一起决定一个三角形。` },
      ] },
    { id: "rhs", tex: R`#norm#dirac\times\left[#tree+#perm\right]`, name: "constraint × bispectrum", label: "约束 × 双谱", role: "const",
      note: R`前一半决定哪些波矢组合能有信号，方括号决定信号有多大。`,
      kids: [
        { id: "norm", tex: R`(2\pi)^3`, w: 0.8, name: "fourier_norm", label: "Fourier 约定的因子", role: "const", note: R`和 Dirac $\delta$ 配套的归一化。` },
        { id: "dirac", tex: R`\delta_{\rm D}^{(3)}(\boldsymbol k_1+\boldsymbol k_2+\boldsymbol k_3)`, w: 4, name: "triangle_closes", label: "三个波矢必须首尾相接", role: "const",
          note: R`只有三个波矢的矢量和为零，也就是构成闭合三角形时才有信号。这是统计均匀性的结果，所以双谱是三角形形状和大小的函数。` },
        { id: "tree", tex: R`#two#F#Pa#Pb`, glyph: R`\times`, name: "tree_term", label: "一个二阶场配两个线性场", role: "const",
          note: R`$\delta^{(2)}$ 中的两个 $\delta_0$ 分别和另外两个线性场缩并，每个缩并给出一个功率谱。`,
          kids: [
            { id: "two", tex: R`2`, w: 0.8, name: "n_pairings", label: "两种配对方式", role: "const", note: R`$\delta^{(2)}$ 里的两个 $\delta_0$ 和另外两个线性场有两种配法，贡献相同。` },
            { id: "F", tex: R`F_2(\boldsymbol k_1,\boldsymbol k_2)`, w: 8, name: "gravity_kernel", label: "引力的指纹：决定形状依赖", role: "known",
              note: R`**全式的物理都在这里。**二阶核 \eqref{12.39} 依赖两个波矢的夹角和长度比，它让双谱的幅度随三角形形状变化，这是引力非线性演化的特征。它与时间无关，只有 $P_{\rm L}$ 携带时间。` },
            { id: "Pa", tex: R`P_{\rm L}(k_1,\eta)`, w: 2.5, name: "linear_power(k1)", label: "线性功率谱", role: "known", note: R`第一个缩并的结果。两个功率谱合起来给出幅度，使双谱随时间按 $D_+^4$ 增长。` },
            { id: "Pb", tex: R`P_{\rm L}(k_2,\eta)`, w: 2.5, name: "linear_power(k2)", label: "线性功率谱", role: "known", note: R`第二个缩并的结果。双谱的量级是功率谱的平方，这正是二次非线性的标志。` },
          ] },
        { id: "perm", tex: R`2\ \text{perm.}`, w: 1.5, name: "other_two_pairs", label: "另外两种波矢组合", role: "const", note: R`二阶场可以落在三个波数中的任何一个上，所以还要加上 $(\boldsymbol k_2,\boldsymbol k_3)$ 和 $(\boldsymbol k_3,\boldsymbol k_1)$ 两项，结果对三个波矢对称。` },
      ] },
  ],
};

// §12.6 星系的第 n 阶场
export const FM_12_86 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "星系第 $n$ 阶场：$n$ 个线性场经核耦合", role: "const",
  note: R`骨架和物质的 \eqref{12.40} 完全相同。把星系形成的无知全部装进核 $F_{{\rm g},n}$，物质微扰论的工具就能照搬过来。`,
  kids: [
    { id: "lhs", tex: R`\delta^{(n)}_{\rm g}(\boldsymbol k,\eta)`, w: 3, name: "galaxy_density[order n]", label: "星系过密度的第 $n$ 阶", role: "result",
      note: R`\eqref{12.85} 展开中的一项，含线性场的 $n$ 次幂。$n=1$ 时就是 $b_1\delta^{(1)}$。` },
    { id: "rhs", tex: R`#growth#meas#cons\times#kernel#fields`, glyph: R`\times`, name: "growth × convolution", label: "增长 × 卷积 × 核 × $n$ 个线性场", role: "const",
      note: R`时间依赖主要由 $D_+^n$ 提出；波数上是一个带动量守恒的 $n$ 重卷积。`,
      kids: [
        { id: "growth", tex: R`D_+^n(\eta)`, w: 3.5, name: "growth ** n", label: "$n$ 个线性场带来 $n$ 次增长", role: "known", note: R`每个线性场贡献一个 $D_+$，所以第 $n$ 阶正比于 $D_+^n$，阶数越高增长越快。` },
        { id: "meas", tex: R`\left[\prod_{i=1}^n\int\frac{d^3k_i}{(2\pi)^3}\right]`, w: 2, name: "for k_i in modes", label: "对 $n$ 个波矢积分", role: "const", note: R`所有能组合出 $\boldsymbol k$ 的 $n$ 个模式都要加进来。` },
        { id: "cons", tex: R`(2\pi)^3\delta_{\rm D}^{(3)}\Big(\boldsymbol k-\sum_{i=1}^n\boldsymbol k_i\Big)`, w: 3.5, name: "momentum_conservation", label: "$n$ 个波矢之和必须等于 $\\boldsymbol k$", role: "const", note: R`实空间里场的乘积，到 Fourier 空间就成了波矢相加的卷积。这个 $\delta$ 函数保证 $n$ 个波矢之和等于 $\boldsymbol k$。` },
        { id: "kernel", tex: R`#F(#ks;#eta)`, glyph: R`F_{{\rm g},n}`, name: "galaxy_kernel(k...; eta)", label: "星系核：所有差别都在这里", role: "const",
          note: R`把 \eqref{12.40} 的 $F_n$ 换成 $F_{{\rm g},n}$。自变量分号之后多了一个时间，这是和物质核的第二个差别。`,
          kids: [
            { id: "F", tex: R`F_{{\rm g},n}`, w: 8, name: "kernel_with_bias", label: "含偏袒参数：把星系形成的无知参数化", role: "unknown",
              note: R`**和物质的主要差别。**它既有物质自身的非线性，也有偏袒参数。这些参数对给定质量的晕可以算，对观测到的星系则要由数据确定。二阶的具体形式见 \eqref{12.87}。` },
            { id: "ks", tex: R`\boldsymbol k_1,\cdots,\boldsymbol k_n`, w: 1.2, name: "modes", label: "参与耦合的波矢", role: "const", note: R`核依赖这些波矢的大小和夹角，决定不同模式之间耦合的强弱。` },
            { id: "eta", tex: R`\eta`, w: 3, name: "bias_time_dependence", label: "物质核没有这个时间自变量", role: "known", note: R`物质的 $F_n$ 与时间无关，而偏袒参数随时间变化（如 \eqref{12.87} 中的 $b_1(\eta)$），所以 $D_+^n$ 不能把星系核的时间依赖全部提走。` },
          ] },
        { id: "fields", tex: R`\delta_0(\boldsymbol k_1)\cdots\delta_0(\boldsymbol k_n)`, w: 2.5, name: "initial_fields", label: "$n$ 个线性场相乘", role: "known", note: R`换算到 $D_+=1$ 的线性密度场。$n$ 个相乘正是第 $n$ 阶的含义，统计量要靠它们的 Wick 缩并算出来。` },
      ] },
  ],
};

// §12.6 星系双谱
export const FM_12_88 = {
  id: "eq", tex: R`#lhs=#rhs,`, name: "equals", label: "星系三点关联：物质的结构，加偏袒和噪声", role: "const",
  note: R`和物质的 \eqref{12.51} 相比有三处变化：外线带 $b_1^2$，核换成 $F_{{\rm g},2}$，多了噪声项。`,
  kids: [
    { id: "lhs", tex: R`\left\langle#d1#d2#d3\right\rangle`, name: "three_point(delta_g)", label: "星系场的三点关联", role: "result",
      note: R`去掉 Dirac $\delta$ 约束和 $(2\pi)^3$ 之后，剩下的就是星系双谱。这里还没有计入红移空间畸变。`,
      kids: [
        { id: "d1", tex: R`\delta_{\rm g}(\boldsymbol k_1,\eta)`, w: 2, name: "galaxy_density(k1)", label: "三角形的第一条边", role: "result", note: R`波数 $\boldsymbol k_1$ 处的星系密度模式。` },
        { id: "d2", tex: R`\delta_{\rm g}(\boldsymbol k_2,\eta)`, w: 2, name: "galaxy_density(k2)", label: "三角形的第二条边", role: "result", note: R`波数 $\boldsymbol k_2$ 处的星系密度模式。` },
        { id: "d3", tex: R`\delta_{\rm g}(\boldsymbol k_3,\eta)`, w: 2, name: "galaxy_density(k3)", label: "三角形的第三条边", role: "result", note: R`波数 $\boldsymbol k_3$ 处的星系密度模式。三个模式一起决定一个三角形。` },
      ] },
    { id: "rhs", tex: R`#norm#dirac\times\left[#tree+#noise+#perm\right]`, name: "constraint × bispectrum", label: "约束 × 星系双谱", role: "const",
      note: R`方括号里的两类项有不同的来源：一类来自引力和偏袒，一类来自噪声。`,
      kids: [
        { id: "norm", tex: R`(2\pi)^3`, w: 0.8, name: "fourier_norm", label: "Fourier 约定的因子", role: "const", note: R`和 Dirac $\delta$ 配套的归一化。` },
        { id: "dirac", tex: R`\delta_{\rm D}^{(3)}(\boldsymbol k_1+\boldsymbol k_2+\boldsymbol k_3)`, w: 2.5, name: "triangle_closes", label: "三个波矢必须首尾相接", role: "const", note: R`和物质一样，只有闭合三角形才有信号。偏袒不改变这个约束。` },
        { id: "tree", tex: R`#two#bsq#F#Pa#Pb`, glyph: R`\times`, name: "tree_term", label: "一个二阶场配两个线性场", role: "const",
          note: R`$\delta^{(2)}_{\rm g}$ 和两个 $\delta^{(1)}_{\rm g}=b_1\delta^{(1)}$ 的树图贡献。`,
          kids: [
            { id: "two", tex: R`2`, w: 0.8, name: "n_pairings", label: "两种配对方式", role: "const", note: R`和物质双谱中的因子 2 同一来源。` },
            { id: "bsq", tex: R`b_1^2`, w: 5, name: "outer_lines_bias", label: "两条外线各带一个 $b_1$", role: "unknown", note: R`两个线性场是星系场而不是物质场，每个贡献一个 $b_1$。核的内部还有偏袒，这个因子和它们是分开算的。` },
            { id: "F", tex: R`F_{{\rm g},2}(\boldsymbol k_1,\boldsymbol k_2;\eta)`, w: 8, name: "galaxy_kernel_2", label: "形状依赖：物质非线性 + 两种偏袒", role: "unknown",
              note: R`**决定形状的一项。**由 \eqref{12.87}，它含 $b_1F_2$、$\frac12b_2$ 和潮汐偏袒 $b_{K^2}$ 三部分，各自的三角形形状依赖不同。` },
            { id: "Pa", tex: R`P_{\rm L}(k_1,\eta)`, w: 2, name: "linear_power(k1)", label: "线性功率谱", role: "known", note: R`第一个缩并的结果。` },
            { id: "Pb", tex: R`P_{\rm L}(k_2,\eta)`, w: 2, name: "linear_power(k2)", label: "线性功率谱", role: "known", note: R`第二个缩并的结果。` },
          ] },
        { id: "noise", tex: R`B_N(k_1,\eta)`, w: 3.5, name: "noise_term", label: "噪声：物质双谱里没有这一项", role: "unknown", note: R`由 \eqref{12.89} 给出，类似功率谱中的噪声 $P_N$。它含 $\frac13B_{N0}$，三个轮换加起来恰好是一个常数 $B_{N0}$。` },
        { id: "perm", tex: R`2\ \text{perm.}`, w: 1.2, name: "other_two_pairs", label: "另外两种波矢组合", role: "const", note: R`括号内的两项都要对三个波矢轮换，结果对称。` },
      ] },
  ],
};

// §12.2 非线性 Euler 方程
export const FM_12_20 = {
  id: "eq", tex: R`#dt+#adv+#hub+#grav+#stress=0.`, name: "euler == 0", label: "流体速度的收支：五项之和为零", role: "const",
  note: R`\eqref{12.19} 除以 $\rho_{\rm m}$ 的结果。和线性的 \eqref{5.50} 相比多了对流项和应力项。丢掉应力后，它和连续性、Poisson 方程一起对 $\rho_{\rm m}$、$u^i_{\rm m}$、$\Psi$ 封闭。`,
  kids: [
    { id: "dt", tex: R`\frac{\partial}{\partial t}u^i_{\rm m}`, w: 2.5, name: "d_dt(velocity)", label: "固定共动位置上的速度变化", role: "unknown",
      note: R`这里盯着共动坐标中的一个固定点，而不是跟着流体走。跟着流体元看到的变化，要再加上下一项对流。` },
    { id: "adv", tex: R`#uj#grad`, glyph: R`\times`, name: "advection", label: "对流：速度场搬运自身", role: "const",
      note: R`和前一项合起来是作用在 $u^i_{\rm m}$ 上的物质导数。它是速度的二次项，所以线性的 \eqref{5.50} 里没有它。`,
      kids: [
        { id: "uj", tex: R`\frac1au^j_{\rm m}`, w: 7, name: "carrier_velocity / a", label: "速度充当搬运者：非线性从这里进入", role: "unknown",
          note: R`**这一项让方程成为非线性的。**速度既是被搬运的量，又是搬运者，所以这一项是速度的二次式。$1/a$ 把共动梯度换算成物理梯度。` },
        { id: "grad", tex: R`\frac{\partial}{\partial x^j}u^i_{\rm m}`, w: 3, name: "grad(velocity)", label: "沿途看到的速度变化", role: "unknown",
          note: R`流体元沿 $u^j_{\rm m}$ 移动时经过的速度梯度。速度场均匀时这一项为零。` },
      ] },
    { id: "hub", tex: R`Hu^i_{\rm m}`, w: 3.5, name: "hubble_drag", label: "Hubble 拖曳：速度按 $1/a$ 衰减", role: "known",
      note: R`没有扰动时，它让速度按 $1/a$ 衰减。系数是 $H$ 而不是 $4H$，因为 $3H$ 已由连续性方程负责（\eqref{12.19}）。` },
    { id: "grav", tex: R`\frac1a\frac{\partial\Psi}{\partial x^i}`, w: 3.5, name: "gravity / a", label: "引力：线性阶也有的驱动力", role: "unknown",
      note: R`形式和线性阶相同。用物理间隔 $dr^i=a\,dx^i$ 写，它就是牛顿引力。除以密度后这是单位质量受的力，和粒子多少无关。$\Psi$ 由 Poisson 方程决定。` },
    { id: "stress", tex: R`#pre\frac{\partial}{\partial x^j}#sig`, glyph: R`\times`, name: "div(stress)", label: "应力项：广义的压强力", role: "const",
      note: R`若 $\sigma^{ij}_{\rm m}$ 是对角的，等于 $\mathcal P_{\rm m}\delta_{ij}$，这一项就是压强梯度力 $(\partial\mathcal P_{\rm m}/\partial x^i)/(\rho_{\rm m}a)$。`,
      kids: [
        { id: "pre", tex: R`\frac{1}{\rho_{\rm m}a}`, w: 1.6, name: "1 / (density * a)", label: "除以密度，换算到物理梯度", role: "unknown",
          note: R`这一项在 \eqref{12.19} 中不带 $\rho_{\rm m}$，除过之后 $\rho_{\rm m}$ 留在了分母。这里的 $\rho_{\rm m}$ 是含涨落的完整密度。` },
        { id: "sig", tex: R`\sigma^{ij}_{\rm m}`, w: 5.5, name: "stress_tensor", label: "冷物质为零，丢掉后方程组封闭", role: "unknown",
          note: R`把冷分布函数 \eqref{12.9} 代入 \eqref{12.17} 得到 $\sigma^{ij}_{\rm m}=0$，所以标准做法是丢掉它，让连续性、Euler、Poisson 三个方程封闭。真的能忽略它吗？这个问题留到后面的有效流体 \eqref{12.52} 再回答。` },
      ] },
  ],
};

// §12.2 功率谱按阶展开
export const FM_12_41 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "非线性功率谱 = 各阶场两两关联之和", role: "const",
  note: R`把两个 $\delta_{\rm m}$ 都按阶展开再相乘。每一项都能用线性场的统计性质算出来，但一共有无穷多项，只有能在有限项后截断时才有用。`,
  kids: [
    { id: "lhs", tex: R`\left\langle#d#dp\right\rangle`, name: "two_point", label: "完整密度场的两点关联", role: "result",
      note: R`同一时刻 $\eta$、两个波数上的系综平均。功率谱就由它给出。`,
      kids: [
        { id: "d", tex: R`\delta_{\rm m}(\boldsymbol k,\eta)`, w: 2, name: "density(k)", label: "第一个完整密度场", role: "result", note: R`包含所有阶的非线性演化，不只是线性部分。` },
        { id: "dp", tex: R`\delta_{\rm m}(\boldsymbol k',\eta)`, w: 2, name: "density(k')", label: "第二个完整密度场", role: "result", note: R`同一时刻，波数换成 $\boldsymbol k'$。` },
      ] },
    { id: "rhs", tex: R`\sum_{#range}^{#parity}\left\langle#dn#dl\right\rangle`, name: "sum over (n, l)", label: "对各阶组合求和", role: "const",
      note: R`一个组合就是一对阶数 $(n,l)$，它的贡献是这两阶场的关联。`,
      kids: [
        { id: "range", tex: R`n,l=1,2,\cdots`, w: 2.5, name: "for n, l in orders", label: "阶数不封顶：无穷多项", role: "const",
          note: R`展开从线性阶开始，没有上限。微扰论要有意义，求和必须能在有限项后截断，而且丢掉的项要比保留的小，所以下一式 \eqref{12.42} 只看前几项。` },
        { id: "parity", tex: R`n+l\ \text{even}`, w: 7, name: "if (n + l) % 2 == 0", label: "奇数项为零：只留偶数个 Gauss 场", role: "known",
          note: R`**这个条件消掉了所有奇数项。**$\delta^{(n)}$ 含 $n$ 个 $\delta_0$（\eqref{12.40}），所以每项含 $n+l$ 个 Gauss 场，而奇数个 Gauss 场的期望值为零（\eqref{12.44}）。例如 $(1,2)$ 消失，第一个非线性修正要到 $(2,2)$ 和 $(1,3)$ 才出现。` },
        { id: "dn", tex: R`\delta^{(n)}(\boldsymbol k,\eta)`, w: 3, name: "order_n(k)", label: R`第 $n$ 阶场：含 $n$ 个 $\delta_0$`, role: "known",
          note: R`由 \eqref{12.40} 给出：$D_+^n$ 乘上 $n$ 个线性场经核 $F_n$ 的卷积。` },
        { id: "dl", tex: R`\delta^{(l)}(\boldsymbol k',\eta)`, w: 3, name: "order_l(k')", label: R`第 $l$ 阶场：含 $l$ 个 $\delta_0$`, role: "known",
          note: R`同样由 \eqref{12.40} 给出。两阶不必相同，例如 $(1,3)$ 项就是一个线性场和一个三阶场的关联。` },
      ] },
  ],
};

// §12.3 冷初条件
export const FM_12_55 = {
  id: "eq", tex: R`#lhs\xrightarrow{t\to0}#rhs.`, name: "initial_condition", label: "早期：分布函数趋于一张冷薄片", role: "const",
  note: R`求解 Vlasov–Poisson 方程组的初条件。箭头表示这只在 $t\to0$ 时成立：之后速度不再保持单值，但物质仍留在一张薄片上。`,
  kids: [
    { id: "lhs", tex: R`f_{\rm m}(\boldsymbol x,\boldsymbol p,t)`, w: 3, name: "f(x, p, t)", label: "要解的量：相空间分布函数", role: "unknown",
      note: R`Vlasov–Poisson 方程组 \eqref{12.54} 的求解目标，同时依赖位置和动量。这里给出它在早期的形式。` },
    { id: "rhs", tex: R`#nbar\left[#over\right]#norm#dirac`, glyph: R`\times`, name: "number_density × momentum_peak", label: "每点的粒子数 × 动量空间的尖峰", role: "const",
      note: R`形式和冷流体的 \eqref{12.9} 相同，只是把完整密度拆成了背景乘 $1+\delta_{\rm m}$。对动量积分后 $\delta_{\rm D}$ 和 $(2\pi)^3$ 消失，只剩下数密度。`,
      kids: [
        { id: "nbar", tex: R`\frac{\rho_{\rm m}}{m}`, w: 1.5, name: "mean_n", label: "平均数密度", role: "known",
          note: R`这里的 $\rho_{\rm m}$ 不带 $\boldsymbol x$，是背景密度。除以 $m$ 后是单位体积的平均粒子数。` },
        { id: "over", tex: R`1+\delta_{\rm m}(\boldsymbol x,t)`, w: 3, name: "1 + overdensity", label: "当地的密度涨落", role: "known",
          note: R`和前一个因子相乘就是当地的完整数密度。` },
        { id: "norm", tex: R`(2\pi)^3`, w: 0.8, name: "momentum_measure_norm", label: "与动量积分测度配套", role: "const",
          note: R`和积分测度 $\frac{d^3p}{(2\pi)^3}$ 中的因子相消。` },
        { id: "dirac", tex: R`\delta_{\rm D}^{(3)}\left(#p-#mu\right)`, name: "only_if p == m u", label: "动量必须等于当地流体动量", role: "const",
          note: R`除了 $\boldsymbol p=m\boldsymbol u_{\rm m}$ 之外处处为零，也就是没有速度弥散。动量空间里没有宽度，所以物质在相空间中是一张没有厚度的薄片。`,
          kids: [
            { id: "p", tex: R`\boldsymbol p`, w: 2.2, name: "momentum", label: "相空间的动量坐标", role: "const",
              note: R`和 $\boldsymbol x$ 一样是 $f_{\rm m}$ 的自变量。` },
            { id: "mu", tex: R`m\boldsymbol u_{\rm m}(\boldsymbol x,t)`, w: 7, name: "one_momentum_per_point", label: "每点只有一个动量：薄片由此而来", role: "known",
              note: R`**这是“冷”的全部含义。**空间每一点只对应一个动量，物质就落在相空间的一张薄片上。壳层交叉后速度不再单值，流体描述失效，N 体模拟离散并跟踪的正是这张薄片。` },
          ] },
      ] },
  ],
};
