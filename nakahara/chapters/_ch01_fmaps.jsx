// 第 1 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §1.3 无穷小时间的振幅
export const FM_1_92 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "short_time_amp == norm * exp(i dS)", label: "走一小步的振幅：归一化因子乘作用量相位", role: "const",
  note: R`方括号里的主项趋于这一小段时间的作用量 $\Delta S$（\eqref{1.93}）。路径积分的全部内容，就是把这块砖一段段接起来。`,
  kids: [
    { id: "lhs", tex: R`\langle x|\mathrm{e}^{-\mathrm{i}\hat H\varepsilon}|y\rangle`, w: 3, name: "amp(y -> x, dt = eps)", label: R`时间 $\varepsilon$ 内从 $y$ 到 $x$ 的振幅`, role: "result",
      note: R`这是无穷小时间间隔的热核。有限时间的振幅由许多段这样的小振幅接成，见 \eqref{1.95}。` },
    { id: "rhs", tex: R`#pref\exp\left[#act+#err\right]`, glyph: R`\times`, name: "norm * exp(phase)", label: "归一化因子乘相位指数", role: "const",
      note: R`证明的做法是插入动量本征态，配方后做 Fresnel 积分（\sref{L1.2}），再把结果重新收回一个指数。`,
      kids: [
        { id: "pref", tex: R`\sqrt{\frac{m}{2\pi\mathrm{i}\varepsilon}}`, w: 2.5, name: "normalize", label: "动量积分留下的归一化", role: "const",
          note: R`它让 $\varepsilon\to0$ 时振幅退化成 $\delta(x-y)$（\eqref{1.94}）。每段贡献一个，$n$ 段累积成 \eqref{1.95} 的 $(m/2\pi\mathrm{i}\varepsilon)^{n/2}$。` },
        { id: "act", tex: R`#ie\left\{#kin-#pot\right\}`, glyph: R`\times`, name: "i * dt * lagrangian", label: "这一小段的作用量", role: "const",
          note: R`大括号是动能减势能，也就是 Lagrange 量。乘上时间步长 $\varepsilon$ 就是这一段的 $\Delta S$，所以振幅的相位由作用量决定。`,
          kids: [
            { id: "ie", tex: R`\mathrm{i}\varepsilon`, w: 2.5, name: "i * dt", label: "相位 = 时间步长 × Lagrange 量", role: "design",
              note: R`$\varepsilon$ 是我们切分时间时选的步长，最后要取 $\varepsilon\to0$。因子 $\mathrm{i}$ 让指数成为纯相位，而不是衰减。` },
            { id: "kin", tex: R`\frac{m}{2}\left(\frac{(x-y)}{\varepsilon}\right)^2`, w: 5, name: "kinetic(v = (x-y)/eps)", label: "动能：用平均速度计算", role: "known",
              note: R`$(x-y)/\varepsilon$ 是这一小段的平均速度。$|x-y|>\sqrt\varepsilon$ 时相位振荡极快，贡献相互抵消，所以起作用的只有 $x$、$y$ 靠近的区域。` },
            { id: "pot", tex: R`V\left(\frac{x+y}{2}\right)`, w: 6, name: "potential(midpoint)", label: "势能取在两端的中点", role: "known",
              note: R`**$V$ 的自变量是平均值 $(x+y)/2$，这种取法叫 Weyl 排序。**证明先得到 $V(x)-\tfrac12(x-y)V'(x)$，它正好是中点势能的一阶展开，余下的差别进入 $\mathcal{O}(\varepsilon(x-y)^2)$。` },
          ] },
        { id: "err", tex: R`\mathcal{O}(\varepsilon^2)+\mathcal{O}(\varepsilon(x-y)^2)`, w: 1.5, name: "higher_order", label: "比势能项高一阶的小量", role: "const",
          note: R`在起作用的区域 $|x-y|\lesssim\sqrt\varepsilon$ 内，这两项都是 $\varepsilon^2$ 量级。从 \eqref{1.95} 起不再写出它们。` },
      ] },
  ],
};

// §1.3 例 1.5：自由粒子的离散路径积分
export const FM_1_102 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "free_amp == lim(norm * integrate(phase))", label: R`自由粒子的振幅写成 $n-1$ 重 Gauss 积分`, role: "const",
  note: R`这是 \eqref{1.95} 取 $V=0$ 的情形，$\Delta S_k$ 只剩动能。下一条 \eqref{1.103} 换元后，这个积分可以逐个算出。`,
  kids: [
    { id: "lhs", tex: R`\langle x_f,t_f|x_i,t_i\rangle`, w: 3.5, name: "amp(x_i -> x_f)", label: "要求的跃迁振幅", role: "result",
      note: R`正则量子化已经给出答案 \eqref{1.101}。这里换路径积分重算一遍，两边应该一致。` },
    { id: "rhs", tex: R`#lim#pref\int#meas\exp\left[#phase\right]`, glyph: R`\times`, name: "lim(norm * integrate(exp(i S)))", label: R`切成 $n$ 段，对中间位置积分`, role: "const",
      note: R`时间等分成 $n$ 段，$\varepsilon=T/n$。每条折线路径贡献一个相位，把所有折线加起来，再取 $n\to\infty$。`,
      kids: [
        { id: "lim", tex: R`\lim_{n\to\infty}`, w: 1.2, name: "n -> inf", label: "切分无穷细", role: "const",
          note: R`对自由粒子，算出的结果其实对每个 $n$ 都精确成立，所以这个极限是平凡的。` },
        { id: "pref", tex: R`\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{n/2}`, w: 3, name: "norm ** n", label: R`$n$ 段各带一个归一化`, role: "const",
          note: R`每段一个 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$（\eqref{1.92}），共 $n$ 个。单独看它在 $\varepsilon\to0$ 时发散，要和积分的结果合起来才有限。` },
        { id: "meas", tex: R`\dd x_1\ldots\dd x_{n-1}`, w: 4, name: "for x_k in interior_points", label: "只积中间点，端点固定", role: "unknown",
          note: R`$n$ 段之间有 $n-1$ 个连接点，它们取遍所有位置，就是对所有折线路径求和。$x_0=x_i$、$x_n=x_f$ 不参与积分。` },
        { id: "phase", tex: R`#ie\sum_{k=1}^n#mh\left(#vel\right)^2`, name: "i * sum(dt * kinetic_k)", label: "这条折线的作用量", role: "const",
          note: R`对 $k$ 求和是把各段的 $\Delta S_k$ 加起来。指数是 $x_k$ 的二次式，所以整个积分是 Gauss 型的。`,
          kids: [
            { id: "ie", tex: R`\mathrm{i}\varepsilon`, w: 1.5, name: "i * dt", label: "每段的时间步长", role: "design",
              note: R`和 $\frac{m}{2}$ 一起，在 \eqref{1.103} 中被吸收进新变量 $y_k$。` },
            { id: "mh", tex: R`\frac{m}{2}`, w: 1, name: "m / 2", label: "动能系数", role: "known",
              note: R`自由粒子的 Lagrange 量只有动能（\eqref{1.99}）。` },
            { id: "vel", tex: R`\frac{x_k-x_{k-1}}{\varepsilon}`, w: 6, name: "v_k = (x_k - x_{k-1}) / dt", label: R`第 $k$ 段的平均速度`, role: "unknown",
              note: R`**它把相邻两点耦合在一起，积分因此不能直接分开。**这正是下一步要逐个积分、用归纳法处理的原因。` },
          ] },
      ] },
  ],
};

// §1.3 例 1.5：无量纲化之后
export const FM_1_103 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "free_amp == lim(norm * jacobian * integrate(phase))", label: "换元后，质量和步长全部移到前因子", role: "const",
  note: R`令 $y_k=(m/2\varepsilon)^{1/2}x_k$。指数变成不含任何参数的纯数学积分，物理量只留在前因子和端点 $y_0$、$y_n$ 里。`,
  kids: [
    { id: "lhs", tex: R`\langle x_f,t_f|x_i,t_i\rangle`, w: 3.5, name: "amp(x_i -> x_f)", label: "同一个振幅", role: "result",
      note: R`和 \eqref{1.102} 是同一个量，这里只换了积分变量。` },
    { id: "rhs", tex: R`#lim#pref#jac\int#meas\exp\left[#phase\right]`, glyph: R`\times`, name: "lim(norm * jacobian * integrate(exp(i S)))", label: "两个前因子乘一个无参数的积分", role: "const",
      note: R`积分可以用归纳法算出，等于 $[(\mathrm{i}\pi)^{n-1}/n]^{1/2}\mathrm{e}^{\mathrm{i}(y_n-y_0)^2/n}$。代回去就是 \eqref{1.104}。`,
      kids: [
        { id: "lim", tex: R`\lim_{n\to\infty}`, w: 1, name: "n -> inf", label: "切分无穷细", role: "const",
          note: R`最后 $n$ 的依赖全部消掉，这个极限是平凡的。` },
        { id: "pref", tex: R`\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{n/2}`, w: 2.5, name: "norm ** n", label: R`原来的 $n$ 个归一化`, role: "const",
          note: R`从 \eqref{1.102} 原样带下来。它有 $n$ 个因子，而 Gauss 积分只有 $n-1$ 个，抵消后多出一个，这就是最后的前因子的来源。` },
        { id: "jac", tex: R`\left(\frac{2\varepsilon}{m}\right)^{(n-1)/2}`, w: 4.5, name: "jacobian(x -> y)", label: "换元的 Jacobi 因子", role: "const",
          note: R`每个 $\dd x_k=(2\varepsilon/m)^{1/2}\dd y_k$，共 $n-1$ 个，所以指数是 $(n-1)/2$。它和积分给出的 $(\mathrm{i}\pi)^{(n-1)/2}$ 合成 $(2\pi\mathrm{i}\varepsilon/m)^{(n-1)/2}$，正好消掉前一个因子中的 $n-1$ 个。` },
        { id: "meas", tex: R`\dd y_1\ldots\dd y_{n-1}`, w: 2.5, name: "for y_k in interior_points", label: R`新变量上的 $n-1$ 重积分`, role: "unknown",
          note: R`仍然只积中间点。端点 $y_0$、$y_n$ 由 $x_i$、$x_f$ 标度而来，是固定的。` },
        { id: "phase", tex: R`\mathrm{i}\sum_{k=1}^n(y_k-y_{k-1})^2`, w: 7, name: "i * sum((y_k - y_{k-1}) ** 2)", label: "指数只剩相邻点差的平方和", role: "unknown",
          note: R`**$m$ 和 $\varepsilon$ 都从指数中消失了，这正是换元的目的。**相邻点仍然耦合，但配方可以一次积掉一个 $y_k$，每积一次，剩余的指数形状不变，所以能用归纳法。` },
      ] },
  ],
};

// §1.4.1 谐振子的振幅
export const FM_1_146 = {
  id: "eq", tex: R`#lhs=#rhs.`, name: "osc_amp == lim(jacobian * norm * classical * modes)", label: "谐振子振幅：经典相位乘各模式的 Gauss 积分", role: "const",
  note: R`自由粒子也是经典相位乘涨落积分（\eqref{1.144}），$J_N$ 正是用它校准的。涨落部分唯一的变化，是每个模式的系数多了 $-\omega^2$。`,
  kids: [
    { id: "lhs", tex: R`\langle x_f,T|x_i,0\rangle`, w: 4, name: "amp(x_i -> x_f, T)", label: "要求的跃迁振幅", role: "result",
      note: R`时间已平移，使 $t_i=0$，$T=t_f-t_i$。` },
    { id: "rhs", tex: R`\lim_{N\to\infty}#JN#pref#cl\times#modes`, glyph: R`\times`, name: "lim(jacobian * norm * classical * modes)", label: "前因子、经典相位、涨落积分", role: "const",
      note: R`作用量围绕经典轨道的展开是精确的（\eqref{1.138}），所以经典部分和涨落部分可以完全分开。$J_N$ 和前因子各自发散，极限只对它们的组合才有意义。`,
      kids: [
        { id: "JN", tex: R`J_N`, w: 3, name: "jacobian(y -> a)", label: "换到模式系数的 Jacobi 行列式", role: "known",
          note: R`变量替换和势无关，所以直接沿用自由粒子定出的值 \eqref{1.145}。不必直接计算这个行列式，是这一推导的巧妙之处。` },
        { id: "pref", tex: R`\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{N/2}`, w: 2, name: "norm ** N", label: "路径积分测度的归一化", role: "const",
          note: R`来自 \eqref{1.95}，这里 $\varepsilon=T/N$。代入后和 $J_N$ 合并，见 \eqref{1.147}。` },
        { id: "cl", tex: R`\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}`, w: 4, name: "exp(i * S_classical)", label: "经典轨道的相位：端点只进这里", role: "known",
          note: R`$S[x_{\rm c}]$ 由 \eqref{1.135} 给出。涨落 $y$ 的端点恒为零，所以振幅对 $x_i$、$x_f$ 的依赖全部在这个因子里。` },
        { id: "modes", tex: R`\int#meas\exp\left[#coef\left\{#free-#om\right\}\right]`, name: "integrate(exp(sum(mode_n)))", label: R`$N-1$ 个相互独立的模式`, role: "const",
          note: R`正弦函数的正交性让各模式之间没有交叉项，指数成了对 $n$ 的求和，多重积分就拆成了 $N-1$ 个一维 Gauss 积分。`,
          kids: [
            { id: "meas", tex: R`\dd a_1\ldots\dd a_{N-1}`, w: 2, name: "for a_n in modes", label: "对模式系数积分", role: "unknown",
              note: R`$a_n$ 是涨落 $y(t)$ 的正弦展开系数（\eqref{1.141}），它们替代了各时刻的位置 $y_k$。独立变量有 $N-1$ 个，所以 $n>N-1$ 的系数取为零。` },
            { id: "coef", tex: R`\mathrm{i}\frac{mT}{4}\sum_{n=1}^{N-1}a_n^2`, w: 2, name: "sum(mode_coef * a_n ** 2)", label: "每个模式都是 $a_n$ 的平方", role: "const",
              note: R`$m/2$ 来自涨落作用量，$T/2$ 来自 $\sin^2$ 在 $[0,T]$ 上的积分。只有平方项，所以每个模式都是 Gauss 积分，用 \sref{L1.2} 即可。` },
            { id: "free", tex: R`\left(\frac{n\pi}{T}\right)^2`, w: 3, name: "free_mode", label: "自由粒子本来就有的部分", role: "known",
              note: R`来自动能 $\dot y^2$。这一部分积分后的发散因子和自由粒子完全相同，因此与 $J_N$ 等一起被消掉（\eqref{1.147}）。` },
            { id: "om", tex: R`\omega^2`, w: 6, name: "oscillator_shift", label: "涨落部分与自由粒子的唯一区别", role: "known",
              note: R`**来自势能 $-\omega^2y^2$，涨落积分对 $\omega$ 的依赖全在这一项。**积分后给出收敛的乘积 $\prod[1-(\omega T/n\pi)^2]^{-1/2}$，也就是最后的 $\sin\omega T$。积分要求 $n\pi/T>\omega$，$\omega T=\pi$ 时第一个模式的系数变号。` },
          ] },
      ] },
  ],
};

// §1.4.2 函数行列式写成本征值之积
export const FM_1_156 = {
  id: "eq", tex: R`#det=#eig=#full=#split.`, name: "Det == prod(eigs) == split", label: "行列式 → 本征值之积 → 发散部分 × 收敛部分", role: "const",
  note: R`这条链式的目的是最后一步：把一个形式上发散的乘积，拆成可以单独用 $\zeta$ 函数正规化的部分和本身收敛的部分。`,
  kids: [
    { id: "det", tex: R`\operatorname{Det}_{\rm D}\left(#kin+#mass\right)`, name: "Det_D(op)", label: "涨落算符的函数行列式", role: "result",
      note: R`路径积分等于它的 $-1/2$ 次方（\eqref{1.154}）。下标 D 表示本征值按 Dirichlet 边界条件 $y(0)=y(\beta)=0$ 求得。`,
      kids: [
        { id: "kin", tex: R`-\frac{\dd^2}{\dd\tau^2}`, w: 2.5, name: "-d2/dtau2", label: "虚时间的动能算符", role: "known",
          note: R`作用在正弦模式 $\sin(n\pi\tau/\beta)$ 上，给出本征值 $(n\pi/\beta)^2$。` },
        { id: "mass", tex: R`\omega^2`, w: 1.5, name: "omega ** 2", label: "谐振子的势能", role: "known",
          note: R`它只是个常数，把每个本征值平移 $\omega^2$，不改变本征函数。Wick 转动后符号由负变正，所以算符是正的。` },
      ] },
    { id: "eig", tex: R`\prod_{n=1}^{\infty}\lambda_n`, w: 2, name: "prod(eigs)", label: "按定义：所有本征值之积", role: "const",
      note: R`这是有限维 $\det A=\prod\lambda_k$ 的形式推广。在这一步它还只是个记号，乘积本身并不收敛。` },
    { id: "full", tex: R`\prod_{n=1}^{\infty}\left[#free+#om\right]`, name: "prod(lambda_n)", label: "代入本征值的显式形式", role: "const",
      note: R`$\lambda_n=(n\pi/\beta)^2+\omega^2$。$n$ 越大因子越大，所以这个乘积发散。`,
      kids: [
        { id: "free", tex: R`\left(\frac{n\pi}{\beta}\right)^2`, w: 2.5, name: "free_eigenvalue", label: R`随 $n$ 增长的部分`, role: "known",
          note: R`发散的来源。把它从每个因子中提出来，就得到最后一步的拆分。` },
        { id: "om", tex: R`\omega^2`, w: 1.5, name: "omega ** 2", label: "固定不变的平移", role: "known",
          note: R`$n$ 很大时它远小于前一项，这正是提出前一项后余下的乘积能收敛的原因。` },
      ] },
    { id: "split", tex: R`#divp#conv`, glyph: R`\times`, name: "det_free * correction", label: "自由部分 × 谐振子修正", role: "const",
      note: R`从每个因子提出 $(n\pi/\beta)^2$。这一步只是形式操作，因为第一个乘积本身发散，要靠正规化赋值。`,
      kids: [
        { id: "divp", tex: R`\prod_{n=1}^{\infty}\left(\frac{n\pi}{\beta}\right)^2`, w: 4.5, name: "Det(-d2/dtau2)", label: "发散部分：等于自由算符的行列式", role: "unknown",
          note: R`它就是 $\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2)$，与 $\omega$ 无关。接下来用 $\zeta$ 函数正规化，赋值为 $2\beta$（\eqref{1.162}）。` },
        { id: "conv", tex: R`\prod_{p=1}^{\infty}\left[1+\left(\frac{\beta\omega}{p\pi}\right)^2\right]`, w: 7, name: "correction(omega)", label: R`收敛部分：所有 $\omega$ 依赖都在这里`, role: "unknown",
          note: R`**因子按 $1/p^2$ 趋于 1，所以乘积收敛，不需要正规化。**$\omega\to0$ 时它趋于 1，回到自由情形。和 \eqref{1.151} 比较后可以得到它的值 $\sinh(\beta\omega)/\beta\omega$。` },
      ] },
  ],
};
