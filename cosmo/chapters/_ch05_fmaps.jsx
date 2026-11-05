// 第 5 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §5.1 Θ 方程的左边
export const FM_5_9 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "df_dt[order=1]", label: "光子分布沿路径的一阶变化", role: "const",
  note: R`把 $f$ 的展开代入 Boltzmann 方程的左边，背景红移的部分已经相消，只剩下四项和一个公共因子。这是光子方程的左边，碰撞项在下一节计算。`,
  kids: [
    { id: "lhs", tex: R`\left.\frac{df}{dt}\right|_{\text{first order}}`, w: 3.5, name: "df_dt[order=1]", label: "$df/dt$ 的一阶部分", role: "result",
      note: R`只保留对 $\Theta$、$\Phi$、$\Psi$ 为线性的项。零阶部分已经给出 $T\propto1/a$，见 \eqref{5.6}。` },
    { id: "rhs", tex: R`#pref\left[#stream+#grav\right]`, name: "prefactor * [stream + gravity]", label: "公共因子乘两组效应", role: "const",
      note: R`方括号不含 $p$ 的大小，所以光子的温度扰动 $\Theta$ 可以脱离动量来解。`,
      kids: [
        { id: "pref", tex: R`-p\frac{\partial f^{(0)}}{\partial p}`, w: 1.5, name: "blackbody_shape", label: "黑体谱的形状，最后约去", role: "known",
          note: R`碰撞项 \eqref{5.22} 里有同样的因子，两边相等时它被约去，得到 \eqref{5.23}。` },
        { id: "stream", tex: R`#tdot+#adv`, name: "free_streaming", label: R`自由流：沿光线的 $d\Theta/dt$`, role: "const",
          note: R`这两项合起来是沿光线的全导数。如果只有它们，$\Theta$ 沿光线守恒，光子带着出发处的温度一路传播。`,
          kids: [
            { id: "tdot", tex: R`\dot\Theta`, w: 3, name: "d_dt(Theta)", label: "固定点上扰动的变化", role: "unknown",
              note: R`$\Theta$ 的时间导数，就是这条方程要解的量。$\partial_t$ 作用在 $\partial_pf^{(0)}$ 上的部分已经和背景红移项相消。` },
            { id: "adv", tex: R`\frac{\hat p^i}{a}\frac{\partial\Theta}{\partial x^i}`, w: 5, name: "advection(Theta)", label: "光子带着温度移动", role: "unknown",
              note: R`**光子沿 $\hat p^i$ 方向运动，把别处的温度扰动带过来。**物理距离是 $ax$，所以共动梯度要除以 $a$。到 Fourier 空间它变成 \eqref{5.35} 的 $ik\mu\Theta$。` },
          ] },
        { id: "grav", tex: R`#phi+#psi`, name: "gravity_sources", label: "度规扰动造成的红移", role: "const",
          note: R`这两项和 $\Theta$ 无关，是扰动的引力效应，它们充当 $\Theta$ 的源。`,
          kids: [
            { id: "phi", tex: R`\dot\Phi`, w: 3, name: "d_dt(Phi)", label: "像局域多了一点膨胀", role: "known",
              note: R`空间度规扰动随时间变化，效果就像局域多了一点膨胀，让光子额外红移。` },
            { id: "psi", tex: R`\frac{\hat p^i}{a}\frac{\partial\Psi}{\partial x^i}`, w: 4, name: "climb(Psi)", label: "爬出或落入势阱", role: "known",
              note: R`光子沿 $\Psi$ 的梯度运动，爬出势阱损失能量，落入势阱获得能量。它和自由流项有同样的方向因子。` },
          ] },
      ] },
  ],
};

// §5.3 温度扰动的完整方程
export const FM_5_23 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "streaming + gravity == scattering", label: "左边是传播，右边是散射", role: "const",
  note: R`\eqref{5.9} 等于 \eqref{5.22}，公共因子 $-p\,\partial f^{(0)}/\partial p$ 已约去。这时还是宇宙时和实空间的形式，下面再换到共形时间和 Fourier 空间。`,
  kids: [
    { id: "lhs", tex: R`#stream+#grav`, name: "streaming + gravity", label: "沿光线的变化", role: "const",
      note: R`只有这一边时，光子无碰撞地传播，同时受引力红移影响。`,
      kids: [
        { id: "stream", tex: R`#tdot+#adv`, name: "free_streaming", label: "自由流", role: "const",
          note: R`两项合起来是沿光线的全导数 $d\Theta/dt$。`,
          kids: [
            { id: "tdot", tex: R`\dot\Theta`, w: 2.5, name: "d_dt(Theta)", label: "要解的量", role: "unknown", note: R`某点某方向的温度扰动随时间的变化。` },
            { id: "adv", tex: R`\frac{\hat p^i}{a}\frac{\partial\Theta}{\partial x^i}`, w: 3.5, name: "advection(Theta)", label: "光子带着温度移动", role: "unknown",
              note: R`它把不同位置的 $\Theta$ 联系起来，这也是后面转到 Fourier 空间的原因。乘以 $a$ 换到共形时间后，$1/a$ 就消失了，见 \eqref{5.24}。` },
          ] },
        { id: "grav", tex: R`#phi+#psi`, name: "gravity_sources", label: "引力红移", role: "const",
          note: R`度规扰动造成的能量变化，它们是 $\Theta$ 的源。`,
          kids: [
            { id: "phi", tex: R`\dot\Phi`, w: 2, name: "d_dt(Phi)", label: "局域膨胀", role: "known", note: R`空间度规扰动的变化让光子额外红移。` },
            { id: "psi", tex: R`\frac{\hat p^i}{a}\frac{\partial\Psi}{\partial x^i}`, w: 2.5, name: "climb(Psi)", label: "爬出或落入势阱", role: "known", note: R`光子沿势梯度运动，能量随之改变。` },
          ] },
      ] },
    { id: "rhs", tex: R`#rate\left[#mono-#theta+#dop\right]`, name: "rate * [target - Theta]", label: R`散射把 $\Theta$ 拉向目标`, role: "const",
      note: R`方括号是当前值和目标 $\Theta_0+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}$ 的差，前面的 $n_e\sigma_{\rm T}$ 是拉回的速率。`,
      kids: [
        { id: "rate", tex: R`n_e\sigma_{\rm T}`, w: 6, name: "scattering_rate", label: "散射率：决定耦合强弱", role: "known",
          note: R`**它决定光子是否被拉住。**很大时方括号必须接近零，$\Theta$ 被锁定在目标值上；复合后 $n_e$ 骤降，右边关闭，只剩左边的自由流。换到共形时间后它写成 $-\tau'$，见 \eqref{5.34}。` },
        { id: "mono", tex: R`\Theta_0`, w: 3, name: "monopole", label: "散射进来的光子", role: "unknown",
          note: R`散射后光子方向被打乱，所以进入方向 $\hat{\boldsymbol p}$ 的光子带着该点所有方向的平均扰动，定义见 \eqref{5.20}。` },
        { id: "theta", tex: R`\Theta`, w: 3, name: "Theta(direction)", label: "散射出去的光子", role: "unknown",
          note: R`带着本方向 $\Theta$ 的光子被散射走。如果 $\Theta$ 大于平均值，这一项就把它压回去。` },
        { id: "dop", tex: R`\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}`, w: 3, name: "doppler(u_b)", label: "电子运动的多普勒项", role: "unknown",
          note: R`电子有整体速度 $\boldsymbol u_{\rm b}$，散射光子时产生和方向有关的多普勒效应。这一项让光子和重子的速度相互耦合。` },
      ] },
  ],
};

// §5.6 中微子分布的无碰撞演化
export const FM_5_63 = {
  id: "eq", tex: R`#lhs=#rhs=0.`, name: "collisionless_boltzmann(f_nu)", label: "中微子的无碰撞 Boltzmann 方程", role: "const",
  note: R`中微子脱耦后，非引力相互作用可以忽略，所以等于零。这是有质量粒子的 \eqref{3.76}，形式和暗物质的 \eqref{5.36} 相同，质量体现在 $E_\nu(p)$ 上。`,
  kids: [
    { id: "lhs", tex: R`\frac{df_\nu}{dt}`, w: 2.5, name: "df_dt", label: "沿粒子路径的全导数", role: "result",
      note: R`没有碰撞时，分布函数沿粒子的路径不变。` },
    { id: "rhs", tex: R`#dt+#stream-#force`, name: "d_dt + stream - dp_dt", label: "链式法则的三类项", role: "const",
      note: R`分别是 $f_\nu$ 对时间、位置、动量大小的变化，后两项各乘上位置和动量的变化率。`,
      kids: [
        { id: "dt", tex: R`\frac{\partial f_\nu}{\partial t}`, w: 2, name: "partial_t(f)", label: "显式的时间变化", role: "unknown", note: R`固定位置和动量时分布函数的变化。` },
        { id: "stream", tex: R`#vel#adv`, glyph: R`\times`, name: "speed * advection(f)", label: "自由流", role: "const",
          note: R`和光子的方程相比，这里多了一个速度因子，这是质量带来的第一个区别。`,
          kids: [
            { id: "vel", tex: R`\frac{p}{E_\nu(p)}`, w: 5, name: "speed", label: "速度：慢粒子流动得慢", role: "known",
              note: R`**相对论性时等于 1，和光子相同。**温度降到 $m_\nu$ 以下后它小于 1，自由流变慢。` },
            { id: "adv", tex: R`\frac{\hat p^i}{a}\frac{\partial f_\nu}{\partial x^i}`, w: 2.5, name: "advection(f)", label: "沿运动方向的空间变化", role: "unknown",
              note: R`物理距离是 $ax$，所以共动梯度要除以 $a$。背景分布与位置无关，所以这个梯度是一阶小量。` },
          ] },
        { id: "force", tex: R`\left[#hub+#phi+#psi\right]#dfdp`, name: "dp_dt * df_dp", label: "动量的变化", role: "const",
          note: R`方括号乘 $p$ 就是 $-dp/dt$。动量随膨胀红移，也受度规扰动影响。`,
          kids: [
            { id: "hub", tex: R`H`, w: 2.5, name: "hubble", label: "背景红移", role: "known",
              note: R`零阶就有的一项。因为 $\mathcal N$ 依赖 $p$，代入后它不会完全相消，在 \eqref{5.64} 中留下 $-Hp\,\partial\mathcal N/\partial p$。` },
            { id: "phi", tex: R`\dot\Phi`, w: 1.5, name: "d_dt(Phi)", label: "局域膨胀", role: "known", note: R`空间度规扰动的变化，作用和 $H$ 一样，都让动量改变。这一项和质量无关。` },
            { id: "psi", tex: R`\frac{E_\nu(p)}{ap}\hat p^i\Psi_{,i}`, w: 5, name: "E/(a p) * grad(Psi)", label: "慢粒子受势阱影响更大", role: "known",
              note: R`**质量带来的第二个区别。**$E_\nu/p$ 是速度因子的倒数，慢中微子在势阱中停留更久，受势阱的影响更大。$\hat p^i\Psi_{,i}$ 是势沿运动方向的变化，逗号表示对 $x^i$ 求偏导。` },
            { id: "dfdp", tex: R`p\frac{\partial f_\nu}{\partial p}`, w: 2, name: "p * df_dp", label: "分布沿动量的变化", role: "unknown",
              note: R`动量变化之后 $f_\nu$ 改变多少，由这个斜率决定。代入 \eqref{5.62} 后，零阶部分和 $H$ 项一起与时间导数相消。` },
          ] },
      ] },
  ],
};
