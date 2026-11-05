// 补充材料 F_I、G_I、H_I 长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;
const A = R`\sym{aG}{a}`;          // 高斯宽度参数，同 _ch01c_s_g.jsx
const AL = R`\sym{alG}{\alpha}`;   // 积分复参数
const PH = R`\sym{phG}{\varphi}`;  // 整体相位

// §F_I 稳相：相位对波矢的一阶展开
export const FM_FI_9 = {
  id: "eq", tex: R`#lhs\simeq#rhs`, name: "taylor_1st(phase)", label: "分波相位在波矢域内的一阶展开", role: "const",
  note: R`稳相论证的起点：把每列分波的总相位 \eqref{FI-8} 在峰值 $\mathbf k_0$ 附近展开。$\simeq$ 表示略去了高阶项，这要靠 $D_k$ 足够小。`,
  kids: [
    { id: "lhs", tex: R`\delta\xi(\mathbf k,\mathbf r,t)`, w: 3, name: "phase_shift(k)", label: R`分波 $\mathbf k$ 相对峰值的相位差`, role: "result",
      note: R`如果在 $D_k$ 内它几乎不变，分波就同相相加，$|\psi|$ 最大；如果它扫过的范围大了，分波就互相抵消。` },
    { id: "rhs", tex: R`#x+#y+#z`, name: "sum(axis in x, y, z)", label: "三个方向各贡献一项", role: "const",
      note: R`写成矢量就是 $\delta\mathbf k\cdot[\nabla_{\mathbf k}\xi]_{\mathbf k=\mathbf k_0}$，见 \eqref{FI-10}。$\delta\mathbf k$ 的方向任意，所以要让相位不变，三个方括号必须分别为零。`,
      kids: [
        { id: "x", tex: R`#dkx\left[#gx\right]_{\mathbf k=\mathbf k_0}`, glyph: R`\times`, name: "x_term", label: "偏离量 × 相位斜率", role: "const",
          note: R`下标 $\mathbf k=\mathbf k_0$ 表示导数在峰值处取值，所以方括号对所有分波都一样，只依赖 $\mathbf r$ 和 $t$。不同分波的差别全在 $\delta k_x$ 里。`,
          kids: [
            { id: "dkx", tex: R`\delta k_x`, w: 1.5, name: "offset_x", label: "偏离峰值的量", role: "known", note: R`$\mathbf k-\mathbf k_0$ 的 $x$ 分量，也就是展开用的小量。它的范围由 $D_k$ 的尺寸 $\Delta k_x$ 决定。` },
            { id: "gx", tex: R`\frac{\partial}{\partial k_x}\xi(\mathbf k,\mathbf r,t)`, w: 5.5, name: "d_phase/d_kx", label: "相位对 $k_x$ 的斜率", role: "unknown",
              note: R`**决定波包中心的量。**由 \eqref{FI-8}，这个导数等于 $x+\partial\alpha/\partial k_x$。它为零的 $x$ 就是这个方向上分波同相的位置，三个方向合起来给出中心 \eqref{FI-11}。` },
          ] },
        { id: "y", tex: R`#dky\left[#gy\right]_{\mathbf k=\mathbf k_0}`, glyph: R`\times`, name: "y_term", label: "$y$ 方向的同一结构", role: "const",
          note: R`和 $x$ 方向的项形式相同。`,
          kids: [
            { id: "dky", tex: R`\delta k_y`, w: 1.2, name: "offset_y", label: "偏离峰值的量", role: "known", note: R`$\mathbf k-\mathbf k_0$ 的 $y$ 分量。` },
            { id: "gy", tex: R`\frac{\partial}{\partial k_y}\xi(\mathbf k,\mathbf r,t)`, w: 3, name: "d_phase/d_ky", label: "相位对 $k_y$ 的斜率", role: "unknown", note: R`等于 $y+\partial\alpha/\partial k_y$，为零时定出中心的 $y$ 坐标。` },
          ] },
        { id: "z", tex: R`#dkz\left[#gz\right]_{\mathbf k=\mathbf k_0}`, glyph: R`\times`, name: "z_term", label: "$z$ 方向的同一结构", role: "const",
          note: R`和 $x$ 方向的项形式相同。`,
          kids: [
            { id: "dkz", tex: R`\delta k_z`, w: 1.2, name: "offset_z", label: "偏离峰值的量", role: "known", note: R`$\mathbf k-\mathbf k_0$ 的 $z$ 分量。` },
            { id: "gz", tex: R`\frac{\partial}{\partial k_z}\xi(\mathbf k,\mathbf r,t)`, w: 3, name: "d_phase/d_kz", label: "相位对 $k_z$ 的斜率", role: "unknown", note: R`等于 $z+\partial\alpha/\partial k_z$，为零时定出中心的 $z$ 坐标。` },
          ] },
      ] },
  ],
};

// §G_I t 时刻的高斯波包
export const FM_GI_16a = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "配方积分后的精确解：仍是高斯形", role: "const",
  note: R`自由粒子的色散是 $k$ 的二次式，加进指数后积分仍是高斯积分，所以能精确算出。和 $t=0$ 相比，变化集中在高斯的宽度参数变成了复数。`,
  kids: [
    { id: "lhs", tex: R`\psi(x,t)`, w: 2.5, name: "psi(x, t)", label: "$t$ 时刻的波函数", role: "result", note: R`由 \eqref{GI-15} 的积分算出。下面的因子依次管归一、振幅和整体相位、平面波、高斯包络。` },
    { id: "rhs", tex: R`#norm#amp\,#wave#env`, glyph: R`\times`, name: "norm * amp * wave * envelope", label: "常数 × 振幅相位 × 平面波 × 包络", role: "const",
      note: R`前几个因子都不改变包络的形状。$x$ 只出现在平面波和最后的指数里。`,
      kids: [
        { id: "norm", tex: R`\left(\frac{2${A}^2}{\pi}\right)^{1/4}`, w: 1, name: "norm_const", label: "与时间无关的常数", role: "const", note: R`\eqref{GI-15} 的前因子和高斯积分的常数合并后的结果，它和下一个因子的分母一起保证总概率为 1。` },
        { id: "amp", tex: R`\frac{#phase}{#den}`, name: "phase / shrink", label: "整体相位和下降的峰值", role: "const",
          note: R`这个因子来自高斯积分给出的 $\sqrt\pi/${AL}$，而 $${AL}$ 是复数：它的模进入分母，辐角进入相位。这里 $x$ 不出现。`,
          kids: [
            { id: "phase", tex: R`\mathrm e^{i${PH}}`, w: 2, name: "global_phase(t)", label: "只依赖时间的相位", role: "const", note: R`$${PH}$ 是实数且与 $x$ 无关，由 \eqref{GI-16b} 给出。它不影响 $|\psi|^2$。` },
            { id: "den", tex: R`\left(${A}^4+\dfrac{4\hbar^2t^2}{m^2}\right)^{1/4}`, w: 3, name: "shrink(t)", label: "随 $|t|$ 增大，波包峰值下降", role: "const", note: R`它正是复宽度参数 $${A}^2+2i\hbar t/m$ 的模再开方。波包变宽的同时峰必须变低，这样面积才能保持不变。` },
          ] },
        { id: "wave", tex: R`\mathrm e^{ik_0x}`, w: 2, name: "plane_wave(k0)", label: "中心波数的平面波", role: "known", note: R`携带平均动量 $\hbar k_0$。模为 1，所以不影响概率密度。` },
        { id: "env", tex: R`\exp\left\{-\frac{\left[#center\right]^2}{#cw}\right\}`, name: "gaussian_envelope", label: "包络：复宽度的高斯", role: "const",
          note: R`形式上和 $t=0$ 的高斯相同。中心平移由分子负责，变宽和相位弯曲由分母负责。`,
          kids: [
            { id: "center", tex: R`x-\dfrac{\hbar k_0}{m}t`, w: 3.5, name: "x - v0 * t", label: "到运动中心的距离", role: "known", note: R`中心以 $\hbar k_0/m$ 匀速运动，这就是正文的群速度，见 \eqref{GI-19}。` },
            { id: "cw", tex: R`#a2+#im`, name: "complex_width", label: "复数的宽度参数", role: "const",
              note: R`把 $1/(${A}^2+2i\hbar t/m)$ 的分子分母同乘共轭，就分成实部和虚部。实部决定 \eqref{GI-17} 的衰减，虚部给出和位置有关的相位。`,
              kids: [
                { id: "a2", tex: R`${A}^2`, w: 2, name: "width_at_t0", label: "$t=0$ 的宽度", role: "design", note: R`$t=0$ 时分母只剩它，波包就是初始的实高斯。$${A}$ 由初态选定。` },
                { id: "im", tex: R`\dfrac{2i\hbar t}{m}`, w: 7, name: "dispersion_term", label: "色散的后果：波包扩散的来源", role: "known",
                  note: R`**全式的关键。**它来自 $\omega=\hbar k^2/2m$ 的二次相位，是虚数且正比于 $t$。正是这一项让宽度随 $|t|$ 增大，并让相位依赖位置。$t=0$ 时它消失，所以此刻才是最小不确定度波包。` },
              ] },
          ] },
      ] },
  ],
};

// §G_I t 时刻的概率密度
export const FM_GI_17 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "取模平方：相位消失，只剩实高斯", role: "const",
  note: R`对 \eqref{GI-16a} 取模平方。相位因子全部消失，复宽度也变成了实数，一眼就能读出中心和宽度。`,
  kids: [
    { id: "lhs", tex: R`|\psi(x,t)|^2`, w: 2.5, name: "prob_density(x, t)", label: "$t$ 时刻的概率密度", role: "result", note: R`曲线下的面积始终为 1。不用积分也能论证这一点，见 \eqref{GI-18} 之后的讨论。` },
    { id: "rhs", tex: R`#norm\,#height\,#env`, glyph: R`\times`, name: "norm * height * envelope", label: "常数 × 峰高 × 高斯", role: "const",
      note: R`前两个因子决定峰的高度，它们不含 $x$；形状全在指数里。`,
      kids: [
        { id: "norm", tex: R`\sqrt{\frac{2}{\pi${A}^2}}`, w: 1, name: "peak_at_t0", label: "$t=0$ 的峰高", role: "const", note: R`初始波包越窄，峰越高。` },
        { id: "height", tex: R`\frac{1}{\sqrt{1+\dfrac{4\hbar^2t^2}{m^2${A}^4}}}`, w: 3.5, name: "peak_decay(t)", label: "峰高按宽度成反比下降", role: "const", note: R`根号和 \eqref{GI-20} 中的完全相同，所以峰高正比于 $1/\Delta x(t)$。宽度和峰高此消彼长，面积不变。` },
        { id: "env", tex: R`\exp\left\{-\frac{#pre\left(#center\right)^2}{#den}\right\}`, name: "gaussian_envelope", label: "实高斯：中心和宽度都在这里", role: "const",
          note: R`和 \eqref{GI-11} 对照，指数可以写成 $-(x-\hbar k_0t/m)^2/2\Delta x^2(t)$，这就是读出 \eqref{GI-20} 的地方。`,
          kids: [
            { id: "pre", tex: R`2${A}^2`, w: 1, name: "real_part_factor", label: "实部带来的因子", role: "const", note: R`复宽度的倒数取实部时得到 $${A}^2$，模平方再带来因子 2。` },
            { id: "center", tex: R`x-\dfrac{\hbar k_0}{m}t`, w: 3.5, name: "x - v0 * t", label: "到运动中心的距离", role: "known", note: R`峰在 $x=\hbar k_0t/m$，匀速运动，没有意外。` },
            { id: "den", tex: R`#a4+#grow`, name: "width_squared", label: "分母就是宽度的平方（差常数）", role: "const",
              note: R`除以 $4${A}^2$ 就是 $\Delta x^2(t)$。两项之和意味着宽度是 $t$ 的双曲线：早期平缓，晚期线性增长。`,
              kids: [
                { id: "a4", tex: R`${A}^4`, w: 2, name: "initial_width", label: "早期主导：初始宽度", role: "design", note: R`它给双曲线的“圆底”，也就是 $\Delta x\geq${A}/2$，这是不确定关系的印记。` },
                { id: "grow", tex: R`\dfrac{4\hbar^2t^2}{m^2}`, w: 7, name: "spreading(t)", label: "晚期主导：波包扩散", role: "known",
                  note: R`**全式的关键。**它不含 $k_0$，且只依赖 $|t|$，所以波包在 $t=0$ 前收缩、之后膨胀。质量越大增长越慢。晚期它压过 $${A}^4$，宽度随 $|t|$ 线性增长，和经典速度弥散的结果相同。` },
              ] },
          ] },
      ] },
  ],
};

// §H_I 跳变点两侧导数之差
export const FM_HI_7 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "integrate(schrodinger, x1 - eta, x1 + eta)", label: "定态方程在跳变点附近积分一次", role: "const",
  note: R`把 \eqref{HI-6} 在 $x_1$ 周围宽 $2\eta$ 的小区间上积分，再移项。二阶导数积成了一阶导数之差。下一步令小区间缩小，得到 \eqref{HI-8}。`,
  kids: [
    { id: "lhs", tex: R`#right-#left`, name: "slope_jump", label: "跨过小区间后斜率的变化", role: "result",
      note: R`这正是我们想知道的量：势能跳变处，波函数的斜率到底会不会跃变。`,
      kids: [
        { id: "right", tex: R`\frac{\mathrm d\varphi_\varepsilon}{\mathrm dx}(x_1+\eta)`, w: 2.5, name: "slope(x1 + eta)", label: "区间右端的斜率", role: "result", note: R`$\varphi''$ 积分的上限项。` },
        { id: "left", tex: R`\frac{\mathrm d\varphi_\varepsilon}{\mathrm dx}(x_1-\eta)`, w: 2.5, name: "slope(x1 - eta)", label: "区间左端的斜率", role: "result", note: R`$\varphi''$ 积分的下限项。` },
      ] },
    { id: "rhs", tex: R`#coef#integ`, glyph: R`\times`, name: "coef * integral", label: "系数 × 小区间上的积分", role: "const",
      note: R`左边斜率之差的大小，完全由这个积分决定。`,
      kids: [
        { id: "coef", tex: R`\frac{2m}{\hbar^2}`, w: 1.6, name: "coef", label: "定态方程的系数", role: "const", note: R`来自 \eqref{HI-6}，有限且和 $\eta$ 无关，不影响趋于零的结论。` },
        { id: "integ", tex: R`\int_{x_1-\eta}^{x_1+\eta}[#V-#E]\,#phi\,\mathrm dx`, name: "integrate(bounded, width = 2 eta)", label: "有界函数在窄区间上的积分", role: "const",
          note: R`$x_1$ 是跳变点，$\eta$ 是论证中自己选的小量。被积函数有界，而积分区间宽 $2\eta$，所以 $\eta\to0$ 时积分趋于零。这就是斜率连续的全部理由。`,
          kids: [
            { id: "V", tex: R`V_\varepsilon(x)`, w: 7, name: "smoothed_potential", label: "光滑化的势：必须有界", role: "known",
              note: R`**论证成败的前提。**要求它在过渡区内有界，且界不随 $\varepsilon$ 变化。如果势无界，结论就会失败：$\alpha\delta(x)$ 的积分趋于 $\frac{2m}{\hbar^2}\alpha\varphi(0)$，斜率有跃变。` },
            { id: "E", tex: R`E`, w: 1.5, name: "energy", label: "定态能量", role: "known", note: R`常数，有限，对积分的极限没有影响。` },
            { id: "phi", tex: R`\varphi_\varepsilon(x)`, w: 3, name: "wavefunction", label: "假定有界的解", role: "unknown", note: R`这是光滑势方程的解，要假定它在 $x_1$ 附近保持有界。这样被积函数才是整体有界的。` },
          ] },
      ] },
  ],
};
