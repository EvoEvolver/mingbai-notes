// §11.1.2 的公式树图：式 (11.21)
const R = String.raw;

export const FM_11_21 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "红移空间的模式 = 实空间部分 + 速度部分", role: "const",
  note: R`\eqref{11.20} 里的导数已经算完，速度项写成了密度的积分。右边两项都正比于物质密度，所以只差一步就能合并成 \eqref{11.22}。`,
  kids: [
    { id: "lhs", tex: R`\delta_{\rm g,RSD}(\boldsymbol k)`, w: 5, name: "delta_gal(k)", label: "红移空间星系过密度", role: "result", note: R`观测到的星系过密度的一个 Fourier 模式，只计入红移空间畸变这一种效应（下标 RSD）。` },
    { id: "rhs", tex: R`#real+#vel`, name: "real + velocity", label: "右边：实空间项 + 本动速度修正", role: "const",
      note: R`第一项是没有本动速度时的成团；第二项来自 \eqref{11.19} 的速度梯度。\eqref{11.20} 中的 $-if$ 乘上求导拉下的 $i$，正好变成这里的 $+f$。`,
      kids: [
        { id: "real", tex: R`#bias#dk`, glyph: R`\times`, name: "real_space", label: "实空间项", role: "const",
          note: R`线性偏袒 \eqref{11.18} 的 Fourier 形式。这一项与视线无关。`,
          kids: [
            { id: "bias", tex: R`b_1`, w: 2.5, name: "bias", label: "线性偏袒", role: "known", note: R`星系过密度与物质过密度的比例系数，依赖所选的星系样本，一般也随红移变化。` },
            { id: "dk", tex: R`\delta_{\rm m}(\boldsymbol k)`, w: 2, name: "delta_m(k)", label: "k 处的物质密度", role: "known", note: R`左边要算的那个模式 $\boldsymbol k$ 上的物质过密度。` },
          ] },
        { id: "vel", tex: R`#f#outer`, glyph: R`\times`, name: "velocity_term", label: "本动速度带来的修正", role: "const",
          note: R`本动速度使星系在红移空间里沿视线移位，这一项就是由此带来的密度变化。`,
          kids: [
            { id: "f", tex: R`f`, w: 4.5, name: "growth_rate", label: "增长率：结构长得越快，修正越大", role: "known", note: R`$f=d\ln D_+/d\ln a$。来自速度–密度关系 \eqref{11.17}，其中的 $aH$ 已被抵消。这个系数使速度项携带增长率的信息。` },
            { id: "outer", tex: R`\int#meas#dmp#mu#xint`, name: "for k' in modes", label: "对所有模式 k′ 积分", role: "const",
              note: R`实空间的速度场是所有 Fourier 模式的叠加，所以这里有一个 $\boldsymbol k'$ 积分。积分并不真正起混合作用：最后的 $\boldsymbol x$ 积分只留下 $\boldsymbol k'=\boldsymbol k$。`,
              kids: [
                { id: "meas", tex: R`\frac{d^3k'}{(2\pi)^3}`, w: 1, name: "fourier_measure", label: "Fourier 积分的测度", role: "const", note: R`Fourier 约定带来的标准测度。` },
                { id: "dmp", tex: R`\delta_{\rm m}(\boldsymbol k')`, w: 2, name: "delta_m(k')", label: "k′ 处的物质密度", role: "known", note: R`由 \eqref{11.17}，速度完全由密度决定，所以速度项可以直接写成 $\delta_{\rm m}$。这样两项才能合并。` },
                { id: "mu", tex: R`\left(\hat{\boldsymbol k}'\cdot\hat{\boldsymbol e}_z\right)^2`, w: 7, name: "cos(k', line_of_sight)^2", label: "方向余弦平方：畸变只认视线方向", role: "const", note: R`**全式的物理核心，也是红移空间各向异性的来源。**速度 $\propto\boldsymbol k'/k'^2$ 投影到视线给一个 $\boldsymbol k'\cdot\hat{\boldsymbol e}_z$，沿视线求导又拉下一个，合起来正好是单位矢量点积的平方。波矢平行视线时取 1，垂直视线时为 0。$\hat{\boldsymbol e}_z$ 是远距观测者近似下固定的视线方向。` },
                { id: "xint", tex: R`\int d^3x\,e^{i(\boldsymbol k'-\boldsymbol k)\cdot\boldsymbol x}`, w: 3, name: "delta_D(k' - k)", label: "只留下 k′ = k", role: "const", note: R`这个积分给出 $(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k'-\boldsymbol k)$，把 $\boldsymbol k'$ 积分消掉，并抵消测度里的 $(2\pi)^3$。方向余弦平方因此变成 $\mu_k^2$，得到 \eqref{11.22}。` },
              ] },
          ] },
      ] },
  ],
};

// §11.1.3 观测坐标中的星系 Fourier 模式
export const FM_11_36 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "观测的模式 = Kaiser 公式在缩放后的波矢处取值", role: "const",
  note: R`\eqref{11.34} 说明错误宇宙学只改变波矢，再代入 \eqref{11.22} 的 Kaiser 公式，两种效应就合到了一起。`,
  kids: [
    { id: "lhs", tex: R`\delta_{\rm g,obs}(\boldsymbol k_{\rm obs})`, w: 3, name: "delta_obs(k_obs)", label: "按基准宇宙学算出的模式", role: "result",
      note: R`观测者用基准距离–红移关系赋予星系坐标，再做 Fourier 变换，得到的是这个量。宗量 $\boldsymbol k_{\rm obs}$ 不是真实波矢。` },
    { id: "rhs", tex: R`#kaiser#dm\Big|_{\boldsymbol k=#kmap}`, name: "kaiser(k) at k = scale(k_obs)", label: "在真实波矢处取值", role: "const",
      note: R`竖线左边是真实坐标中的结果，竖线下面说明真实波矢和观测波矢的关系。前面没有多余的因子：体积元的缩放和 Jacobian $\bar J$ 正好相消，因为星系数目不依赖坐标的选择。`,
      kids: [
        { id: "kaiser", tex: R`[#b1+#fmu]`, name: "kaiser_factor", label: "RSD：Kaiser 因子", role: "const",
          note: R`和 \eqref{11.22} 相同。这里的 $\mu_k$ 用的是真实波矢的方向。`,
          kids: [
            { id: "b1", tex: R`b_1`, w: 2, name: "linear_bias", label: "线性偏袒", role: "unknown", note: R`星系过密度与物质过密度之比，大尺度上是常数。` },
            { id: "fmu", tex: R`f\mu_k^2`, w: 3, name: "velocity_term", label: "本动速度的修正", role: "unknown", note: R`沿视线的模式增强最多，垂直视线的模式不受影响。$f$ 是增长率。` },
          ] },
        { id: "dm", tex: R`\delta_{\rm m}(\boldsymbol k)`, w: 3, name: "delta_matter(k)", label: "真实波矢处的物质模式", role: "known",
          note: R`星系观测最终要追溯到的物质涨落。错误的宇宙学不改变它本身，只改变我们在哪个波矢上读取它。` },
        { id: "kmap", tex: R`\left(#perp,\ #para\right)`, name: "scale(k_obs)", label: "观测波矢 → 真实波矢", role: "const",
          note: R`即 \eqref{11.35}。缩放在空间上是均匀的，所以和一阶的 RSD 不同，它是零阶效应，表现为宗量的简单替换。`,
          kids: [
            { id: "perp", tex: R`[1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs}`, w: 4.5, name: "transverse", label: "横向分量，由距离误差决定", role: "unknown",
              note: R`两个横向分量缩放相同。$\alpha_\perp$ 测的是距离：$\chi(\bar z)=\chi_{\rm fid}(\bar z)[1-\alpha_\perp]$，见 \eqref{11.32}。` },
            { id: "para", tex: R`[1+\alpha_\parallel]k^3_{\rm obs}`, w: 5, name: "line_of_sight", label: "视向分量，由哈勃率误差决定", role: "unknown",
              note: R`**$\alpha_\parallel$ 和 $\alpha_\perp$ 一般不相等，所以缩放不是各向同性的：**圆会变成椭圆。$\alpha_\parallel$ 测的是哈勃率：$H(\bar z)=H_{\rm fid}(\bar z)[1+\alpha_\parallel]$，见 \eqref{11.33}。` },
          ] },
      ] },
  ],
};

// §11.1.3 观测星系功率谱
export const FM_11_37 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "观测功率谱 = RSD 谱在 AP 缩放处取值 + 噪声", role: "const",
  note: R`把 \eqref{11.36} 平方取平均，再加上 \eqref{11.23} 中的噪声项。一条式子同时包含本动速度和错误宇宙学两种效应。`,
  kids: [
    { id: "lhs", tex: R`P_{\rm g,obs}(\boldsymbol k_{\rm obs},\bar z)`, w: 3.5, name: "power_obs(k_obs, z)", label: "数据里直接测到的功率谱", role: "result",
      note: R`宗量是观测波矢，不只依赖其大小：沿视线和垂直视线不等价，所以它写成矢量的函数。$\bar z$ 是红移片的中心值。` },
    { id: "rhs", tex: R`#eval+#PN`, name: "signal + noise", label: "信号 + 噪声", role: "const",
      note: R`缩放只作用在括号里的信号上，噪声写在竖线之外。`,
      kids: [
        { id: "eval", tex: R`\left(#PL#kaiser\right)\Big|_{\boldsymbol k=#kmap}`, name: "P_rsd(k) at k = scale(k_obs)", label: "在缩放后的波矢处取值", role: "const",
          note: R`括号内是红移空间的谱 \eqref{11.23}（不含噪声）。$k$ 和 $\mu_k$ 都由缩放后的 $\boldsymbol k$ 算出，所以 $\alpha$ 既改变功率谱的读取位置，也改变夹角。`,
          kids: [
            { id: "PL", tex: R`P_{\rm L}(k,\bar z)`, w: 3.5, name: "linear_power(k, z)", label: "线性物质功率谱：谱形决定 AP 信号", role: "known",
              note: R`展开到 $\alpha$ 的一阶，AP 修正正比于 $d\ln P_{\rm L}/d\ln k$。谱形随 $k$ 变化，尤其在 BAO 振荡处，这样才能把 AP 和 RSD 分开。` },
            { id: "kaiser", tex: R`\left[#b1+#fmu\right]^2`, name: "kaiser^2", label: "RSD", role: "const",
              note: R`\eqref{11.36} 的因子平方。设 $f=0$ 可以形式上去掉速度，这时星系谱依然因 $\alpha_\parallel\ne\alpha_\perp$ 而各向异性。`,
              kids: [
                { id: "b1", tex: R`b_1`, w: 2, name: "linear_bias", label: "线性偏袒", role: "unknown", note: R`和功率谱的振幅简并：数据只约束 $b_1\sigma_8$。` },
                { id: "fmu", tex: R`f\mu_k^2`, w: 3.5, name: "velocity_term", label: "本动速度的角度依赖", role: "unknown", note: R`对幂律谱，AP 也只产生 $\mu^2$ 依赖，和这一项简并。真实的 $P_{\rm L}$ 不是幂律，简并才被打破。` },
              ] },
            { id: "kmap", tex: R`\left(#perp,\ #para\right)`, name: "scale(k_obs)", label: "AP：观测波矢 → 真实波矢", role: "const",
              note: R`错误宇宙学的全部影响都在这里。数据告诉我们这些缩放参数，也就告诉了我们真实的距离和哈勃率。`,
              kids: [
                { id: "perp", tex: R`[1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs}`, w: 5, name: "transverse", label: "横向缩放：给出距离", role: "unknown",
                  note: R`测得 $\alpha_\perp$，就由 \eqref{11.32} 得到 $\bar z$ 处的共动距离 $\chi(\bar z)$。` },
                { id: "para", tex: R`[1+\alpha_\parallel]k^3_{\rm obs}`, w: 6, name: "line_of_sight", label: "视向缩放：给出哈勃率", role: "unknown",
                  note: R`**这里是 AP 效应的来源：**只要 $\alpha_\parallel$ 和 $\alpha_\perp$ 不同，$\boldsymbol k_{\rm obs}$ 和 $\boldsymbol k$ 的关系就依赖方向，功率谱因此各向异性。测得 $\alpha_\parallel$，就由 \eqref{11.33} 得到 $H(\bar z)$。` },
              ] },
          ] },
        { id: "PN", tex: R`P_N`, w: 3, name: "white_noise", label: "噪声：两种效应都不影响它", role: "known",
          note: R`与尺度无关的常数，既不随方向变，也不随 $k$ 变，所以波矢的缩放对它没有作用。` },
      ] },
  ],
};

// §11.4 本章总结式
export const FM_11_63 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "equals", label: "全章汇总：线性谱 × Kaiser × AP 缩放 + 噪声", role: "const",
  note: R`和 \eqref{11.37} 是同一个结果。这里按信息来源来读：每个因子分别对应一个可测的宇宙学量，或者一个还没论证的假设。`,
  kids: [
    { id: "lhs", tex: R`P_{\rm g,obs}(\boldsymbol k_{\rm obs},\bar z)`, w: 5, name: "power_obs(k_obs, z)", label: "光谱巡天给出的三维功率谱", role: "result",
      note: R`只有光谱巡天的红移才够精确，能得到这个三维统计量。测光巡天只能得到它的投影 $w_{\rm g}$、$C_{\rm g}$，BAO 和 RSD 在投影中被抹平。` },
    { id: "rhs", tex: R`#eval+#PN`, name: "signal + noise", label: "信号 + 噪声", role: "const",
      note: R`线性理论够不够用，取决于大尺度上是否只需要 $b_1$ 和 $P_N$ 这两个参数来描述星系。`,
      kids: [
        { id: "eval", tex: R`#PL#kaiser\Big|_{\boldsymbol k=#kmap}`, name: "P_rsd(k) at k = scale(k_obs)", label: "信号，在真实波矢处取值", role: "const",
          note: R`三层结构：物质谱，乘上星系与物质的关系，再换到观测坐标。`,
          kids: [
            { id: "PL", tex: R`P_{\rm L}(k,\bar z)`, w: 6, name: "linear_power(k, z)", label: "线性物质功率谱，含 BAO 标准尺", role: "known",
              note: R`**其余部分都是对它的修饰。**它带着复合后印下的 BAO 特征，这把标准尺让距离–红移关系可以精确测量，也不需要距离阶梯定标。谱若完全平滑，就很难从 AP 中提取距离。` },
            { id: "kaiser", tex: R`\left[#b1+#fmu\right]^2`, name: "kaiser^2", label: "星系如何示踪物质", role: "const",
              note: R`平方来自功率谱是过密度的二次量。`,
              kids: [
                { id: "b1", tex: R`b_1`, w: 4.5, name: "linear_bias", label: "关键假设：一个常数偏袒", role: "unknown",
                  note: R`假设大尺度上星系功率谱就是物质功率谱乘以常数。考虑到星系形成的复杂性这看起来过于简单，本章没有论证，要到下一章才说明为什么成立。` },
                { id: "fmu", tex: R`f\mu_k^2`, w: 4.5, name: "velocity_term", label: R`RSD：测结构增长 $f\sigma_8$`, role: "unknown",
                  note: R`本动速度带来特征性的 $\mu$ 依赖。由此测得速度的振幅，进而测得结构形成的速率 $f\sigma_8$，其中 $f=d\ln D_+/d\ln a$。` },
              ] },
            { id: "kmap", tex: R`\left(#perp,\ #para\right)`, name: "scale(k_obs)", label: "AP：假设的距离关系有误", role: "const",
              note: R`赋予星系三维坐标时必须假设一个距离–红移关系，它的误差就表现为这个缩放。这种畸变也是各向异性的。`,
              kids: [
                { id: "perp", tex: R`[1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs}`, w: 3, name: "transverse", label: "横向：给定红移处的距离", role: "unknown",
                  note: R`$\alpha_\perp$ 对应到红移 $\bar z$ 的距离，见 \eqref{11.32}。` },
                { id: "para", tex: R`[1+\alpha_\parallel]k^3_{\rm obs}`, w: 3, name: "line_of_sight", label: "视向：该红移处的哈勃率", role: "unknown",
                  note: R`$\alpha_\parallel$ 对应红移 $\bar z$ 处的哈勃率，见 \eqref{11.33}。` },
              ] },
          ] },
        { id: "PN", tex: R`P_N`, w: 3, name: "white_noise", label: "关键假设：常数噪声", role: "known",
          note: R`和 $b_1$ 一样是这条式子的基本假设：除去畸变，星系谱只比物质谱多一个与尺度无关的常数。` },
      ] },
  ],
};
