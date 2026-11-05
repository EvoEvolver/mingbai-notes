// 第 2 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §2.1 换到新坐标后的自由粒子方程
export const FM_2_18 = {
  id: "eq", tex: R`#lhs=#rhs=0.`, name: "d_dt(matrix * velocity) == 0", label: "把 $d/dt$ 分给两个因子：多出一项", role: "const",
  note: R`左边是 \eqref{2.16} 里还没算开的时间导数，中间是乘积求导的结果，最右的 0 来自笛卡尔坐标中的 \eqref{2.13}。这一行说明了新坐标里的方程为什么不再是“加速度为零”。`,
  kids: [
    { id: "lhs", tex: R`\frac{d}{dt}\left[#mat#vel\right]`, name: "d_dt(v_old)", label: "旧坐标的加速度", role: "const",
      note: R`方括号由链式法则 \eqref{2.14} 而来，它就是旧坐标的速度 $dx^i/dt$。所以整个左边是笛卡尔加速度，它等于零。`,
      kids: [
        { id: "mat", tex: R`\frac{\partial x^i}{\partial x'^j}`, w: 2, name: "jacobian", label: "变换矩阵，随位置变化", role: "known",
          note: R`极坐标下它的元素依赖 $r$ 和 $\theta$，见 \eqref{2.15}。粒子在移动，所以它也随时间变化，$d/dt$ 不能跳过它。` },
        { id: "vel", tex: R`\frac{dx'^j}{dt}`, w: 1.5, name: "new_velocity", label: "新坐标的速度", role: "unknown",
          note: R`方括号里第二个随时间变化的因子，$d/dt$ 作用在它上面就是新坐标的加速度。` },
      ] },
    { id: "rhs", tex: R`#acc+#curv`, name: "product_rule(acc, extra)", label: "乘积求导得到的两项", role: "const",
      note: R`导数落在速度上得到第一项，落在变换矩阵上得到第二项。第二项用了 \eqref{2.17}。`,
      kids: [
        { id: "acc", tex: R`#matb#ddx`, glyph: R`\times`, name: "jacobian * acc", label: "加速度项", role: "const",
          note: R`如果变换矩阵是常数，就只有这一项，方程仍是 $d^2x'^j/dt^2=0$。`,
          kids: [
            { id: "matb", tex: R`\frac{\partial x^i}{\partial x'^j}`, w: 1.5, name: "jacobian", label: "下一步要乘逆矩阵消掉", role: "known",
              note: R`它正好是加速度前面的系数。整个方程左乘它的逆，加速度就单独出来了，这就是 \eqref{2.19}。` },
            { id: "ddx", tex: R`\frac{d^2x'^j}{dt^2}`, w: 3.5, name: "new_acceleration", label: "新坐标的加速度", role: "unknown",
              note: R`我们想求的量。它不再等于零，因为还要和后面一项相抵。` },
          ] },
        { id: "curv", tex: R`#hess#vk#vj`, glyph: R`\times`, name: "hessian * v * v", label: "坐标带来的新项", role: "const",
          note: R`自由粒子没有受力，这一项完全来自坐标的选取。它和速度的平方成正比。`,
          kids: [
            { id: "hess", tex: R`\frac{\partial^2x^i}{\partial x'^j\partial x'^k}`, w: 6.5, name: "d_jacobian / dx'", label: "变换矩阵随位置怎么变", role: "known",
              note: R`**整条方程的关键。**线性变换的二阶偏导为零，这一项就消失了；极坐标不是线性变换，所以它留了下来。它乘上逆矩阵，就是 \eqref{2.19} 方括号里的 Christoffel 符号。` },
            { id: "vk", tex: R`\frac{dx'^k}{dt}`, w: 1.5, name: "velocity[k]", label: "矩阵变化的快慢", role: "unknown",
              note: R`粒子移动得越快，它感受到的变换矩阵变化也越快。这个因子来自 \eqref{2.17}。` },
            { id: "vj", tex: R`\frac{dx'^j}{dt}`, w: 1.2, name: "velocity[j]", label: "方括号里的速度", role: "unknown",
              note: R`矩阵的导数仍要乘上方括号里原有的速度，于是这一项对速度是二次的。` },
          ] },
      ] },
  ],
};

// §2.3 能动张量守恒
export const FM_2_45 = {
  id: "eq", tex: R`#lhs\equiv#rhs=0.`, name: "covariant_div(T) == 0", label: "能量动量守恒的广义相对论形式", role: "const",
  note: R`普通的坐标导数依赖坐标，不能直接用，所以换成协变导数。这里 $\nu$ 取 0 到 3，共四个方程。$\nu=0$ 就是能量守恒。`,
  kids: [
    { id: "lhs", tex: R`\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu`, w: 2.5, name: "covariant_div(T)", label: "能动张量的协变散度", role: "result",
      note: R`左边只是一个简写，定义在 $\equiv$ 右边。它按张量变换，所以“等于零”这句话在任何坐标系中都成立。` },
    { id: "rhs", tex: R`#div+#up-#low`, name: "div + fix[upper] - fix[lower]", label: "普通散度加两个修正，每个指标一个", role: "const",
      note: R`$T^\mu{}_\nu$ 有一个上指标和一个下指标，所以有两个 Christoffel 项：上指标取正，下指标取负。规则见 \eqref{2.52}。`,
      kids: [
        { id: "div", tex: R`\frac{\partial \sym{ch02-Tmn}{T}^\mu{}_\nu}{\partial x^\mu}`, w: 2.5, name: "ordinary_div(T)", label: "没有引力时的守恒律", role: "unknown",
          note: R`只有这一项时，就是连续性方程和欧拉方程的合写。在光滑宇宙中取 $\nu=0$，它只剩 $-\partial\rho/\partial t$。` },
        { id: "up", tex: R`#gama#ta`, glyph: R`\times`, name: "fix[upper]", label: R`产生 $3H\rho$`, role: "const",
          note: R`取 $\nu=0$ 时这一项给出 $-3H\rho$，见 \eqref{2.55} 和 \eqref{2.56}。它对应连续性方程里的体积稀释。`,
          kids: [
            { id: "gama", tex: R`\Gamma^\mu{}_{\alpha\mu}`, w: 4.5, name: "gamma[contracted]", label: "收缩后等于体积膨胀率", role: "known",
              note: R`**膨胀就是从这里进入守恒律的。**取 $\alpha=0$ 时，三个空间方向各贡献一个 $\dot a/a$，所以 $\Gamma^\mu{}_{0\mu}=3\dot a/a$。` },
            { id: "ta", tex: R`\sym{ch02-Tmn}{T}^\alpha{}_\nu`, w: 1.5, name: "T[alpha][nu]", label: R`$\nu=0$ 时只剩 $-\rho$`, role: "unknown",
              note: R`各向同性使 $T^i{}_0=0$，所以取 $\nu=0$ 时 $\alpha$ 只能是 0，$T^0{}_0=-\rho$。` },
          ] },
        { id: "low", tex: R`#gamb#tb`, glyph: R`\times`, name: "fix[lower]", label: R`产生 $3H\mathcal P$`, role: "const",
          note: R`取 $\nu=0$ 时给出 $-3H\mathcal P$。它和上一项合起来，就是连续性方程 \eqref{2.56} 里的 $3H(\rho+\mathcal P)$。`,
          kids: [
            { id: "gamb", tex: R`\Gamma^\alpha{}_{\nu\mu}`, w: 3, name: "gamma[nu]", label: R`$\nu=0$ 时只在空间对角上非零`, role: "known",
              note: R`$\Gamma^\alpha{}_{0\mu}$ 只有 $\alpha=\mu$ 为空间指标时才不为零，这时等于 $\dot a/a$。` },
            { id: "tb", tex: R`\sym{ch02-Tmn}{T}^\mu{}_\alpha`, w: 2, name: "T[mu][alpha]", label: "挑出压强", role: "unknown",
              note: R`和上面的 $\Gamma$ 收缩后只留下空间对角元之和 $\sum_iT^i{}_i=3\mathcal P$。压强进入能量方程靠的就是这一项。` },
          ] },
      ] },
  ],
};

// Box 2.2 混合张量的协变导数
export const FM_2_52 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "covariant_derivative(T)", label: "每个指标配一个 Christoffel 项", role: "const",
  note: R`这是一条可以照搬的规则：上指标取正，下指标取负。$T^\mu{}_\nu$ 的守恒律 \eqref{2.45} 也按这条规则写出。`,
  kids: [
    { id: "lhs", tex: R`\nabla_\mu \sym{ch02-Tmn}{T}_\nu{}^\kappa`, w: 3, name: "nabla[mu](T)", label: "按张量变换的导数", role: "result",
      note: R`比 $T$ 多一个下指标 $\mu$，而且按张量变换律变换。普通导数做不到这一点。` },
    { id: "rhs", tex: R`#pd-#low+#up`, name: "partial - fix[lower] + fix[upper]", label: "普通导数加指标修正", role: "const",
      note: R`后两项抵消普通导数里的非张量部分，所以结果才是张量。`,
      kids: [
        { id: "pd", tex: R`\partial_\mu \sym{ch02-Tmn}{T}_\nu{}^\kappa`, w: 2, name: "partial[mu](T)", label: "普通导数：本身不是张量", role: "unknown",
          note: R`换坐标时它多出一些二阶偏导的项，和 Box 2.2 中 $\partial_\mu A_\nu$ 的问题一样。` },
        { id: "low", tex: R`#gaml#tl`, glyph: R`\times`, name: "fix[nu]", label: R`下指标 $\nu$ 的修正，取负号`, role: "const",
          note: R`和协变矢量的 \eqref{2.50} 相同：$\nu$ 跑到 $\Gamma$ 上，$T$ 里原来的位置换成求和指标 $\lambda$。`,
          kids: [
            { id: "gaml", tex: R`\Gamma^\lambda{}_{\mu\nu}`, w: 4.5, name: "gamma[lower]", label: "负号项的系数", role: "known",
              note: R`**负号由下指标决定。**它的两个下指标是求导方向 $\mu$ 和被修正的 $\nu$。` },
            { id: "tl", tex: R`\sym{ch02-Tmn}{T}_\lambda{}^\kappa`, w: 2, name: "T[lambda][kappa]", label: R`$\nu$ 换成哑指标 $\lambda$`, role: "unknown",
              note: R`上指标 $\kappa$ 不动，只替换正在修正的那个下指标。` },
          ] },
        { id: "up", tex: R`#gamu#tu`, glyph: R`\times`, name: "fix[kappa]", label: R`上指标 $\kappa$ 的修正，取正号`, role: "const",
          note: R`和逆变矢量的 \eqref{2.51} 相同：$\kappa$ 跑到 $\Gamma$ 上，$T$ 里原来的位置换成求和指标 $\lambda$。`,
          kids: [
            { id: "gamu", tex: R`\Gamma^\kappa{}_{\mu\lambda}`, w: 4.5, name: "gamma[upper]", label: "正号项的系数", role: "known",
              note: R`**正号由上指标决定。**这里 $\kappa$ 在上，下指标是求导方向 $\mu$ 和求和指标 $\lambda$。` },
            { id: "tu", tex: R`\sym{ch02-Tmn}{T}_\nu{}^\lambda`, w: 2, name: "T[nu][lambda]", label: R`$\kappa$ 换成哑指标 $\lambda$`, role: "unknown",
              note: R`下指标 $\nu$ 不动，只替换正在修正的那个上指标。` },
          ] },
      ] },
  ],
};
