// 第 7 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §7.2 标量场的能动张量
export const FM_7_6 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "T == flow - isotropic", label: "能动张量 = 梯度乘积 − 正比于单位张量的部分", role: "const",
  note: R`对任何标量场都成立，还没有假设均匀。下面 \eqref{7.7}、\eqref{7.8}、\eqref{7.9} 都从它取均匀场极限得到。`,
  kids: [
    { id: "lhs", tex: R`T^\alpha{}_\beta`, w: 2.5, name: "stress_energy", label: "一个指标在上的能动张量", role: "result",
      note: R`读法：$T^0{}_0=-\rho$，$T^i{}_j=\delta_{ij}\mathcal P$。要判断这个场能否驱动暴胀，就看它的 $\rho+3\mathcal P$ 能否为负。` },
    { id: "rhs", tex: R`#flow-#iso`, name: "flow - isotropic", label: "两部分：有方向的和各向同性的", role: "const",
      note: R`第一部分只在有梯度的方向上不为零，第二部分对所有对角分量一视同仁。$\rho$ 和 $\mathcal P$ 的差别全部来自第一部分。`,
      kids: [
        { id: "flow", tex: R`#ginv#dnu#dbeta`, glyph: R`\times`, name: "grad * grad", label: "场梯度的乘积", role: "const",
          note: R`对均匀场，指标 $\nu,\beta$ 都只能取 0，所以这一项只进入 $T^0{}_0$，值为 $-\dot\phi^2$。它让 $T^0{}_0$ 比空间分量多出一块，于是动能在 $\rho$ 和 $\mathcal P$ 中符号相同。`,
          kids: [
            { id: "ginv", tex: R`g^{\alpha\nu}`, w: 1.2, name: "metric_inverse", label: "把指标升上去", role: "const",
              note: R`号差 $(-,+,+,+)$ 下 $g^{00}=-1$，第一项的负号由此而来。换成相反的号差，这一项的符号也要跟着变。` },
            { id: "dnu", tex: R`\frac{\partial\phi}{\partial x^\nu}`, w: 1.5, name: "dphi[nu]", label: "场的梯度", role: "unknown",
              note: R`经 $g^{\alpha\nu}$ 升指标后，这个因子的方向就是 $\alpha$。` },
            { id: "dbeta", tex: R`\frac{\partial\phi}{\partial x^\beta}`, w: 1.5, name: "dphi[beta]", label: "场的梯度", role: "unknown",
              note: R`和上一个因子成对出现，所以这一项是场的二次式。背景上只有时间导数，空间导数要到扰动才出现。` },
          ] },
        { id: "iso", tex: R`#delta\left[#kin+#pot\right]`, name: "delta * (kinetic + V)", label: R`各向同性部分：方括号即 $-\mathcal L$`, role: "const",
          note: R`标量场的拉氏量密度是 $\mathcal L=-\frac12g^{\mu\nu}\partial_\mu\phi\,\partial_\nu\phi-V$，方括号正好是它的相反数。连同前面的负号，这一项就是 $\delta^\alpha{}_\beta\mathcal L$。`,
          kids: [
            { id: "delta", tex: R`\delta^\alpha{}_\beta`, w: 1.5, name: "kronecker", label: "所有对角分量相同", role: "const",
              note: R`这个因子保证方括号以同样的值进入 $T^0{}_0$ 和每个 $T^i{}_i$，没有优先的方向。` },
            { id: "kin", tex: R`\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}`, w: 3, name: "kinetic_term", label: "动能项（含梯度）", role: "const",
              note: R`对均匀场等于 $-\frac12\dot\phi^2$，连同前面的负号变成 $+\frac12\dot\phi^2$，也就是 \eqref{7.7} 方括号的第一项。对 $\mu,\nu$ 求和，空间梯度也算在内。` },
            { id: "pot", tex: R`V(\phi)`, w: 7, name: "potential", label: "势能：负压的来源", role: "design",
              note: R`**$V$ 只出现在各向同性部分。**所以它在 $T^0{}_0$ 和 $T^i{}_i$ 中都是 $-V$，读出来就是给 $\rho$ 贡献 $+V$，给 $\mathcal P$ 贡献 $-V$。势能主导时 $\mathcal P\simeq-\rho$，这正是加速膨胀所需要的。$V$ 的形式由所选的模型决定。` },
          ] },
      ] },
  ],
};

// §7.4 不计度规扰动时，用 δφ 写出的能量守恒
export const FM_7_52 = {
  id: "eq", tex: R`#en-#flux-#press=0.`, name: "energy_conservation(dphi) == 0", label: R`能量守恒换成 $\delta\phi$ 的写法：三项之和为零`, role: "const",
  note: R`把 \eqref{7.47}、\eqref{7.50}、\eqref{7.51} 代入守恒方程 \eqref{7.45} 的结果，时间导数换成了共形时间。求导合并后就是 $\delta\phi$ 的方程 \eqref{7.53}，再化简得到 \eqref{7.54}。`,
  kids: [
    { id: "en", tex: R`\left(#dt+#dil\right)\left(#kin-#pot\right)`, glyph: R`\times`, name: "(d_dt + 3H) * dT00", label: "能量密度扰动的变化与稀释", role: "const",
      note: R`第二个括号是 $\delta T^0{}_0$，即 \eqref{7.50}。第一个括号是作用在它上面的算符，把 \eqref{7.45} 中的 $\partial_t$ 和 $3H$ 两项合写在一起。`,
      kids: [
        { id: "dt", tex: R`\frac1a\frac{\partial}{\partial\eta}`, w: 3, name: "d_dt", label: R`$\partial/\partial t$ 的共形写法`, role: "const",
          note: R`唯一要小心的是它也作用在 $\bar\phi'$、$a^{-2}$ 和 $V_{,\phi}$ 上。后者随背景演化，$\partial V_{,\phi}/\partial\eta=V_{,\phi\phi}\bar\phi'$，这就是 \eqref{7.53} 中 $V_{,\phi\phi}$ 的来源。` },
        { id: "dil", tex: R`3H`, w: 2, name: "dilution", label: "膨胀稀释", role: "known",
          note: R`作用在 $V_{,\phi}\delta\phi$ 上的部分，和第三项中的同类项正好抵消。` },
        { id: "kin", tex: R`\frac{-\bar\phi'\delta\phi'}{a^2}`, w: 6, name: "kinetic_part", label: "动能扰动：二阶导数从这里来", role: "unknown",
          note: R`**时间导数落到 $\delta\phi'$ 上，给出全式唯一的 $\delta\phi''$，方程由此成为二阶的。**它的符号和第三项里的同类项相反，所以 $3H$ 的两部分不抵消而是相加，得到 $-6H/a^2$；和求导 $a^{-2}$ 得到的 $+2H/a^2$ 合并，就是 \eqref{7.53} 中的 $-4aH$。` },
        { id: "pot", tex: R`V_{,\phi}\delta\phi`, w: 2, name: "potential_part", label: "势能扰动", role: "unknown",
          note: R`势的展开 $V(\bar\phi)+V_{,\phi}\delta\phi$ 的一阶项。$V_{,\phi}$ 取在背景 $\bar\phi$ 处。` },
      ] },
    { id: "flux", tex: R`#kfac#bg`, glyph: R`\times`, name: "div(energy_flux)", label: "能流的散度", role: "const",
      note: R`即 \eqref{7.45} 中的 $ik_i\delta T^i{}_0$。\eqref{7.47} 的 $\delta T^i{}_0$ 本身带一个 $ik_i$，两个 $i$ 相乘给出这里的负号和 $k^2$。`,
      kids: [
        { id: "kfac", tex: R`\frac{k^2}{a^3}`, w: 5, name: "k2 / a3", label: "$k^2$：后来决定模式如何振荡", role: "const",
          note: R`全式唯一依赖波数的地方。它在 \eqref{7.54} 中变成 $k^2\delta\phi$，决定模式在视界内以频率 $k$ 振荡。` },
        { id: "bg", tex: R`\bar\phi'\delta\phi`, w: 2.5, name: "bg_velocity * dphi", label: "背景速度 × 场涨落", role: "unknown",
          note: R`暴胀子的动量密度正比于背景速度。用零阶方程化简后，\eqref{7.53} 的每一项都含 $\bar\phi'$，两边除以它就得到 \eqref{7.54}。` },
      ] },
    { id: "press", tex: R`#H3\left(#kin2-#pot2\right)`, glyph: R`\times`, name: "3H * dPressure", label: "压强扰动的做功", role: "const",
      note: R`即 \eqref{7.45} 中的 $-H\delta T^i{}_i$。\eqref{7.51} 的 $\delta_{ij}$ 求迹得 3，所以系数是 $3H$。括号是压强扰动，它和 $\delta T^0{}_0$ 的差别只在动能部分的符号。`,
      kids: [
        { id: "H3", tex: R`3H`, w: 2, name: "3H", label: "膨胀率 × 迹", role: "known", note: R`和第一个括号里的 $3H$ 大小相同，但来源不同：一个是稀释，一个是做功。` },
        { id: "kin2", tex: R`\frac{\bar\phi'\delta\phi'}{a^2}`, w: 3.5, name: "kinetic_part", label: "动能扰动，符号为正", role: "unknown",
          note: R`和 $\delta T^0{}_0$ 中的同类项反号。两者不抵消，在 \eqref{7.53} 的摩擦系数里叠加。` },
        { id: "pot2", tex: R`V_{,\phi}\delta\phi`, w: 1.5, name: "potential_part", label: "与第一项的同类项抵消", role: "unknown",
          note: R`在 $\delta T^0{}_0$ 和 $\delta\mathcal P$ 中符号相同，所以两个 $3H$ 项相减后消失。` },
      ] },
  ],
};

// §7.4 用 R 消去引力势后的超视界能量守恒
export const FM_7_68 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: R`超视界能量守恒：右边换成了 $\mathcal R$ 的变化率`, role: "const",
  note: R`把 \eqref{7.65} 右边的 $\dot\Psi$ 用 \eqref{7.67} 换掉。这只是改写，目的是让 $\dot{\mathcal R}$ 单独出现，看它何时为零。`,
  kids: [
    { id: "lhs", tex: R`#dt+#dil-#press`, name: "energy_budget", label: "左边不变", role: "const",
      note: R`能流散度正比于 $k^2$，超视界时已经扔掉，所以这条式子只在视界外成立。`,
      kids: [
        { id: "dt", tex: R`\frac{\partial}{\partial t}\delta T^0{}_0`, w: 3.5, name: "d_dt(dT00)", label: "下一步被消去", role: "unknown",
          note: R`右边第二项展开后正好有一个相同的项，两边相消，\eqref{7.69} 中就不再有 $\delta T^0{}_0$ 的时间导数。` },
        { id: "dil", tex: R`3H\delta T^0{}_0`, w: 2, name: "dilution", label: "膨胀稀释", role: "unknown",
          note: R`$\delta T^0{}_0=-\delta\rho$，下一步会和连续性方程带来的项相消。` },
        { id: "press", tex: R`H\delta T^i{}_i`, w: 2.5, name: "pressure_work", label: "压强扰动做功", role: "unknown",
          note: R`$\delta T^i{}_i/3$ 是压强扰动 $\delta\mathcal P$，所以这一项是 $3H\delta\mathcal P$。它留到 \eqref{7.70}，成为非绝热压强的一部分。` },
      ] },
    { id: "rhs", tex: R`#rdot+#quot`, name: "from(-3(rho+P) dPsi_dt)", label: R`右边：$-3(\rho+\mathcal P)\dot\Psi$ 拆成两部分`, role: "const",
      note: R`由 \eqref{7.67} 有 $\Psi=-\mathcal R-\frac13\delta T^0{}_0/(\rho+\mathcal P)$，对时间求导再乘以 $-3(\rho+\mathcal P)$，得到这两项。`,
      kids: [
        { id: "rdot", tex: R`#pre#dR`, glyph: R`\times`, name: "3(rho+P) * dR_dt", label: R`想要的项：$\mathcal R$ 的变化率`, role: "const",
          note: R`把其他项都移到另一边之后，这一项就是左边那些项的总和。`,
          kids: [
            { id: "pre", tex: R`3(\rho+\mathcal P)`, w: 1.5, name: "3(rho+P)", label: "背景前因子", role: "known",
              note: R`背景量，和 \eqref{7.65} 右边的系数一样，只是符号因代换而变正。` },
            { id: "dR", tex: R`\frac{\partial\mathcal R}{\partial t}`, w: 7, name: "dR_dt", label: "目标：证明它在视界外为零", role: "unknown",
              note: R`**这一节要证明的就是它为零。**接下来的 \eqref{7.69}、\eqref{7.70} 把另一边化简成非绝热压强，由此得到 $\mathcal R$ 守恒的条件 \eqref{7.71}。` },
          ] },
        { id: "quot", tex: R`#pre2\frac{\partial}{\partial t}\left[#ratio\right]`, name: "quotient_term", label: "代换带来的另一项", role: "const",
          note: R`按商的求导法则展开，得到 $\partial_t\delta T^0{}_0-\delta T^0{}_0(\dot\rho+\dot{\mathcal P})/(\rho+\mathcal P)$。前者和左边第一项相消，后者移到左边，就是 \eqref{7.69}。`,
          kids: [
            { id: "pre2", tex: R`(\rho+\mathcal P)`, w: 1.2, name: "rho + P", label: "背景前因子", role: "known",
              note: R`$-3$ 乘上 \eqref{7.67} 中的 $-\frac13$，只剩这个因子。` },
            { id: "ratio", tex: R`\frac{\delta T^0{}_0}{\rho+\mathcal P}`, w: 3.5, name: "dT00 / (rho+P)", label: "分子分母都随时间变", role: "unknown",
              note: R`这个比值在 \eqref{7.67} 中把 $\mathcal R$ 和 $\Psi$ 联系起来。分母是背景量，同样随时间演化，所以求导后多出的一项要用连续性方程来处理。` },
          ] },
      ] },
  ],
};
