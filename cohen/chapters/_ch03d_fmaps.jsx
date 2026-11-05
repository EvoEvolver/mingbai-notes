// 补充材料 J_III、M_III、O_III 长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;
const DL = R`\sym{dirac}{\delta}`;    // Dirac δ
const LA = R`\sym{LO}{L}`;            // O_III 的 L(α)

// J_III §2-d 算符作用到传播子上。两式左边结构相同，各自写全以便说明不同的重点。
export const FM_JIII_21 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "schrodinger_op(K) == leftover", label: "算符作用到 $K$ 上，只剩阶跃函数的导数", role: "const",
  note: R`把 Schrödinger 算符作用到 \eqref{JIII-18} 上。每个定态都满足 \eqref{JIII-19}，所以其余部分全部消去，右边只剩这一项。`,
  kids: [
    { id: "lhs", tex: R`#op#K`, glyph: R`\times`, name: "op applied to K", label: "算符作用到 $K$ 上", role: "const",
      note: R`算符只作用于 $\mathbf r_2$ 和 $t_2$，$\mathbf r_1,t_1$ 只是参数。`,
      kids: [
        { id: "op", tex: R`\Big[#dt-#ham\Big]`, name: "op", label: "Schrödinger 算符", role: "const",
          note: R`作用到任何一个 Schrödinger 方程的解上都得零。`,
          kids: [
            { id: "dt", tex: R`i\hbar\frac{\partial}{\partial t_2}`, w: 3, name: "i*hbar*d_dt2", label: "时间导数：会碰到阶跃函数", role: "const",
              note: R`$K$ 含阶跃函数 $\theta(t_2-t_1)$。时间导数落到它身上给出 \eqref{JIII-20} 的 $\delta$ 函数，右边那一项正是这样来的。` },
            { id: "ham", tex: R`H\Big(\mathbf r_2,\frac{\hbar}{i}\boldsymbol\nabla_2\Big)`, w: 1.8, name: "H(r2, p2)", label: "Hamilton 算符", role: "known",
              note: R`这里 $\boldsymbol\nabla_2$ 只作用于 $\mathbf r_2$。它和时间导数落在定态上的部分相互抵消。` },
          ] },
        { id: "K", tex: R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)`, w: 2.5, name: "K(2,1)", label: "传播子", role: "known",
          note: R`这里用的是 \eqref{JIII-18} 的形式：阶跃函数乘上对定态的求和。` },
      ] },
    { id: "rhs", tex: R`#ihb\,#delta#sum`, glyph: R`\times`, name: "ihbar * delta(t) * sum", label: "唯一漏网的一项", role: "const",
      note: R`前一个 $\delta$ 函数把这一项限制在 $t_2=t_1$，于是后面的求和可以在 $t_2=t_1$ 处取值，下一式 \eqref{JIII-22} 就由此化简而来。`,
      kids: [
        { id: "ihb", tex: R`i\hbar`, w: 0.9, name: "i*hbar", label: "时间导数带来的系数", role: "const",
          note: R`直接来自算符中的 $i\hbar\,\partial/\partial t_2$。` },
        { id: "delta", tex: R`${DL}(t_2-t_1)`, w: 7, name: "d_theta/dt", label: "阶跃函数的导数：只有这一项留下", role: "result",
          note: R`**这是整个计算留下的东西。**没有阶跃函数时 $K$ 本身就是方程的解，右边为零。$K$ 在 $t_2=t_1$ 处“开启”，于是只有那一瞬间方程不满足。` },
        { id: "sum", tex: R`\sum_n#c\,#p\,#e`, name: "for n in states", label: "封闭关系", role: "const",
          note: R`这个求和就是 \eqref{JIII-18} 去掉阶跃函数的部分。对所有定态求和，才能用上封闭关系。`,
          kids: [
            { id: "c", tex: R`\varphi_n^*(\mathbf r_1)`, w: 1.8, name: "conj(phi[n])", label: "起点的值（共轭）", role: "known",
              note: R`和下一个因子配对，得到封闭关系 \eqref{JIII-13} 夹在 $\langle\mathbf r_2|$ 与 $|\mathbf r_1\rangle$ 之间的形式。` },
            { id: "p", tex: R`\varphi_n(\mathbf r_2)`, w: 1.8, name: "phi[n]", label: "终点的值", role: "known",
              note: R`对 $n$ 求和后，这一对因子变成 $\delta(\mathbf r_2-\mathbf r_1)$。` },
            { id: "e", tex: R`\mathrm e^{-iE_n(t_2-t_1)/\hbar}`, w: 2.2, name: "phase[n](t2 - t1)", label: "有 $\\delta(t_2-t_1)$ 在，它就等于 1", role: "known",
              note: R`每个定态自己的相位因子。在 $t_2=t_1$ 处指数为零，这个因子变成 1，于是求和简化。` },
          ] },
      ] },
  ],
};

export const FM_JIII_22 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "schrodinger_op(K) == point_source", label: "$K$ 是 Schrödinger 算符的 Green 函数", role: "const",
  note: R`右边正比于四维 $\delta$ 函数的方程，其解称为 Green 函数。单靠这个方程定不出 $K$，还需要 \eqref{JIII-23} 的因果条件。`,
  kids: [
    { id: "lhs", tex: R`#op#K`, glyph: R`\times`, name: "op applied to K", label: "算符作用到 $K$ 上", role: "const",
      note: R`左边和 \eqref{JIII-21} 完全相同，变化全在右边。`,
      kids: [
        { id: "op", tex: R`\Big[#dt-#ham\Big]`, name: "op", label: "Schrödinger 算符", role: "const",
          note: R`和 Poisson 方程里的 Laplace 算符地位相同，它决定 Green 函数属于哪一个方程。`,
          kids: [
            { id: "dt", tex: R`i\hbar\frac{\partial}{\partial t_2}`, w: 1.8, name: "i*hbar*d_dt2", label: "时间导数", role: "const",
              note: R`只作用于 $t_2$。` },
            { id: "ham", tex: R`H\Big(\mathbf r_2,\frac{\hbar}{i}\boldsymbol\nabla_2\Big)`, w: 1.8, name: "H(r2, p2)", label: "Hamilton 算符", role: "known",
              note: R`其中 $\boldsymbol\nabla_2$ 只作用于 $\mathbf r_2$。` },
          ] },
        { id: "K", tex: R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)`, w: 6, name: "K(2,1) = green(2,1)", label: "传播子：点源产生的响应", role: "unknown",
          note: R`**把 $K$ 看作这个方程的解，它就是 Green 函数。**$\mathbf r_1,t_1$ 标明点源的位置，$\mathbf r_2,t_2$ 是观察响应的地方。\eqref{JIII-1} 中传播子和初始波函数的关系，就对应静电学中势与电荷密度的卷积。` },
      ] },
    { id: "rhs", tex: R`#ihb\,#dt1\,#dr1`, glyph: R`\times`, name: "ihbar * delta(t) * delta(r)", label: "时空中的一个点源", role: "const",
      note: R`时间 $\delta$ 乘空间 $\delta$，相当于粒子在 $(\mathbf r_1,t_1)$ 处突然出现。`,
      kids: [
        { id: "ihb", tex: R`i\hbar`, w: 0.9, name: "i*hbar", label: "时间导数带来的系数", role: "const",
          note: R`和 \eqref{JIII-21} 中相同。` },
        { id: "dt1", tex: R`${DL}(t_2-t_1)`, w: 4.5, name: "delta(t2 - t1)", label: "源只在 $t_1$ 这一瞬间作用", role: "const",
          note: R`来自阶跃函数的导数，见 \eqref{JIII-20}。` },
        { id: "dr1", tex: R`${DL}(\mathbf r_2-\mathbf r_1)`, w: 4.5, name: "delta(r2 - r1)", label: "源只在 $\\mathbf r_1$ 这一点作用", role: "const",
          note: R`由 \eqref{JIII-21} 的定态求和在 $t_2=t_1$ 处经封闭关系得到。` },
      ] },
  ],
};

// J_III §3-b 复合律
export const FM_JIII_27 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "K(2,1) == sum_over_paths", label: "传播子可以拆成一段段传播再求和", role: "const",
  note: R`把 \eqref{JIII-26} 的分段演化夹在 $\langle\mathbf r_2|$ 与 $|\mathbf r_1\rangle$ 之间，在每个中间时刻插入位置表象的封闭关系，就得到这个式子。$N\to\infty$ 时，它就成为对时空路径的求和。`,
  kids: [
    { id: "lhs", tex: R`K(2,1)`, w: 2.8, name: "K(2,1)", label: "从点 1 到点 2 的传播子", role: "result",
      note: R`点 1、点 2 是 $(\mathbf r_1,t_1)$ 和 $(\mathbf r_2,t_2)$ 的简写。` },
    { id: "rhs", tex: R`#ints\;#prod`, glyph: R`\times`, name: "for all midpoints: amplitude", label: "对中间位置积分一条路径的振幅", role: "const",
      note: R`被积函数是沿一串指定中间点的振幅，积分对这些点的一切可能位置求和。`,
      kids: [
        { id: "ints", tex: R`\int\mathrm d^3r_{\alpha_N}\int\mathrm d^3r_{\alpha_{N-1}}\dots\int\mathrm d^3r_{\alpha_2}\int\mathrm d^3r_{\alpha_1}`, w: 7, name: "for r[i] in all_space", label: "每个中间时刻走遍全部位置", role: "const",
          note: R`**相加的是振幅，不是概率，所以不同路径之间会干涉。**每个积分来自一次封闭关系的插入。` },
        { id: "prod", tex: R`#kN\,#kM\dots#k2\,#k1`, glyph: R`\times`, name: "chain of segments", label: "依次经过各中间点的振幅", role: "const",
          note: R`这个乘积就是 \eqref{JIII-28}。从右往左读是时间先后。各段的时间差都为正，所以阶跃函数都等于 1。`,
          kids: [
            { id: "kN", tex: R`K(2,\alpha_N)`, w: 2.2, name: "last_segment", label: "最后一段：到达点 2", role: "known",
              note: R`终点固定为 $(\mathbf r_2,t_2)$，不参与积分。` },
            { id: "kM", tex: R`K(\alpha_N,\alpha_{N-1})`, w: 1.8, name: "segment", label: "相邻中间点之间的一段", role: "known",
              note: R`和下一段共用一个 $\alpha$，正是对这个 $\alpha$ 的积分把两段接起来。` },
            { id: "k2", tex: R`K(\alpha_2,\alpha_1)`, w: 1.8, name: "segment", label: "相邻中间点之间的一段", role: "known",
              note: R`形式相同的一段。中间的省略号代表其余各段。` },
            { id: "k1", tex: R`K(\alpha_1,1)`, w: 2.2, name: "first_segment", label: "第一段：从点 1 出发", role: "known",
              note: R`起点固定为 $(\mathbf r_1,t_1)$，不参与积分。` },
          ] },
      ] },
  ],
};

// M_III §2 能量的平均值形式
export const FM_MIII_9 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "<phi|H|phi> == E <phi|phi>", label: "本征方程乘 $\\varphi^*$ 后积分", role: "const",
  note: R`把微分方程 \eqref{MIII-1} 变成积分的关系。这样就能分别估计动能和势能的大小，从而证明能级高于阱底。`,
  kids: [
    { id: "lhs", tex: R`#kin+#pot`, name: "kinetic + potential", label: "两项：动能和势能", role: "const",
      note: R`左边来自 Hamilton 算符的两项。下面的 \eqref{MIII-10} 把它们读作 $\langle T\rangle$ 和 $\langle V\rangle$。`,
      kids: [
        { id: "kin", tex: R`-#c\int_{-\infty}^{+\infty}\mathrm dx\,#phis#d2#phi`, name: "<T>", label: "动能项", role: "const",
          note: R`将成为 $\langle T\rangle$。这个形式还看不出符号。分部积分后才能看出它是正的，见 \eqref{MIII-11}。`,
          kids: [
            { id: "c", tex: R`\frac{\hbar^2}{2m}`, w: 0.9, name: "hbar^2/2m", label: "动能的常数系数", role: "const",
              note: R`前面的负号和它一起来自本征方程的动能项。` },
            { id: "phis", tex: R`\varphi^*(x)`, w: 1.2, name: "conj(phi)", label: "两边都乘上的因子", role: "design",
              note: R`这是证明时选择的做法：乘上 $\varphi^*$ 再积分，方程就变成平均值的形式。` },
            { id: "d2", tex: R`\frac{\mathrm d^2}{\mathrm dx^2}`, w: 2.8, name: "d2_dx2", label: "二阶导数：波函数的弯曲", role: "known",
              note: R`动能算符作用的方式。分部积分时移走一个导数，这一项就变成斜率平方的积分。` },
            { id: "phi", tex: R`\varphi(x)`, w: 1.2, name: "phi", label: "束缚态波函数", role: "known",
              note: R`满足 \eqref{MIII-1}，并且在 $|x|\to\infty$ 时趋于零。` },
          ] },
        { id: "pot", tex: R`\int_{-\infty}^{+\infty}\mathrm dx\,#V\,#rho`, name: "<V>", label: "势能项", role: "const",
          note: R`将成为 $\langle V\rangle$：势能按概率密度加权平均，可以直接估计。`,
          kids: [
            { id: "V", tex: R`V(x)`, w: 3, name: "V", label: "势能，处处不低于 $-V_0$", role: "known",
              note: R`\eqref{MIII-16} 用的正是这个下界。它让 $\langle V\rangle\ge-V_0$。` },
            { id: "rho", tex: R`|\varphi(x)|^2`, w: 2.2, name: "density", label: "权重：位置的概率密度", role: "known",
              note: R`波函数越集中在阱底，平均势能越低，但动能会随之增大。` },
          ] },
      ] },
    { id: "rhs", tex: R`#E\int_{-\infty}^{+\infty}\mathrm dx\,#norm`, glyph: R`\times`, name: "E * norm", label: "能量乘归一化积分", role: "const",
      note: R`$E$ 是常数，可以提到积分外面。`,
      kids: [
        { id: "E", tex: R`E`, w: 7, name: "E", label: "能级：要给它定下限", role: "unknown",
          note: R`**整式的目的就是把 $E$ 单独留在一边。**这样它就等于平均动能与平均势能之和，下一式 \eqref{MIII-10} 写的正是这一点。` },
        { id: "norm", tex: R`|\varphi(x)|^2`, w: 1.8, name: "normalization", label: "束缚态可归一化，积分为 1", role: "const",
          note: R`束缚态可以归一化，这个积分等于 1，于是从 \eqref{MIII-10} 起右边只写 $E$。` },
      ] },
  ],
};

export const FM_MIII_11 = {
  id: "eq", tex: R`#T=#curv=#slope`, name: "<T> == curvature_form == slope_form", label: "平均动能的两种写法", role: "const",
  note: R`第二个等号是分部积分，边界项因 $|x|\to\infty$ 时 $\varphi\to0$ 而消失。两种写法相等，但只有后一种能直接看出符号。`,
  kids: [
    { id: "T", tex: R`\langle T\rangle`, w: 2.5, name: "<T>", label: "平均动能", role: "result",
      note: R`也可写成 $\langle\varphi|P^2/2m|\varphi\rangle$，见 \eqref{MIII-13}。` },
    { id: "curv", tex: R`-#c1\int_{-\infty}^{+\infty}\mathrm dx\,#phis#d2#phi`, name: "curvature_form", label: "原形式：看不出正负", role: "const",
      note: R`这就是 \eqref{MIII-9} 的第一项。$\varphi^*\varphi''$ 可正可负，所以这样写无法判断符号。`,
      kids: [
        { id: "c1", tex: R`\frac{\hbar^2}{2m}`, w: 0.9, name: "hbar^2/2m", label: "动能的常数系数", role: "const",
          note: R`前面带负号。分部积分后负号消失。` },
        { id: "phis", tex: R`\varphi^*(x)`, w: 1.1, name: "conj(phi)", label: "接收一个导数", role: "known",
          note: R`一个导数从 $\varphi$ 移到它身上，正好凑成模方。` },
        { id: "d2", tex: R`\frac{\mathrm d^2}{\mathrm dx^2}`, w: 2.2, name: "d2_dx2", label: "二阶导数：要移走一个", role: "known",
          note: R`分部积分把这个二阶导数拆到两个因子上，各一阶。` },
        { id: "phi", tex: R`\varphi(x)`, w: 1.1, name: "phi", label: "束缚态波函数", role: "known",
          note: R`在无穷远处趋于零，所以分部积分的边界项为零。` },
      ] },
    { id: "slope", tex: R`#c2\int_{-\infty}^{+\infty}\mathrm dx\,#sq`, name: "slope_form", label: "新形式：非负被积函数", role: "const",
      note: R`常数系数为正，被积函数非负，所以 $\langle T\rangle\ge0$。`,
      kids: [
        { id: "c2", tex: R`\frac{\hbar^2}{2m}`, w: 0.9, name: "hbar^2/2m", label: "系数，现在是正的", role: "const",
          note: R`负号已经在分部积分中用掉。` },
        { id: "sq", tex: R`\Big|\frac{\mathrm d}{\mathrm dx}\varphi(x)\Big|^2`, w: 7, name: "abs(slope)**2", label: "斜率的平方：决定 $\\langle T\\rangle>0$", role: "known",
          note: R`**它不可能处处为零，否则 $\varphi$ 是常数，又要趋于零，只能恒为零。**所以 $\langle T\rangle$ 严格为正，见 \eqref{MIII-15}。波函数变化越陡，动能越大。` },
      ] },
  ],
};

// O_III §3-b 允许带的边缘相位
export const FM_OIII_44 = {
  id: "eq", tex: R`#lhs=#arg`, name: "Theta = phase_of(ratio)", label: "把边缘的影响收进一个相位", role: "const",
  note: R`从 \eqref{OIII-43} 解出 $\mathrm e^{2iNkl}$，右边是模为 1 的比值。定义 $\Theta$ 后，量子化条件就简化成 \eqref{OIII-45}。`,
  kids: [
    { id: "lhs", tex: R`\Theta(\alpha)`, w: 3, name: "edge_phase", label: "边缘相位，只让能级小幅平移", role: "result",
      note: R`它在 \eqref{OIII-46} 中以 $\Theta/2Nl$ 出现，$N$ 很大时可以忽略。这就是体能谱不受表面影响的原因。` },
    { id: "arg", tex: R`\operatorname{Arg}\Big\{\frac{#num}{#den}\Big\}`, name: "arg(num / conj(num))", label: "取比值的辐角", role: "const",
      note: R`分子和分母互为共轭，比值的模恒为 1，所以只有相位这一个信息。辐角正好是分子辐角的两倍。`,
      kids: [
        { id: "num", tex: R`#t1-#t2`, name: "num", label: "两个分量各带半个边界相位", role: "const",
          note: R`上下同乘 $\mathrm e^{-i\chi'/2}$ 后的形式，这样分子和分母才显出共轭关系。`,
          kids: [
            { id: "t1", tex: R`#f1\,#p1`, glyph: R`\times`, name: "conj(f1) * e^(+)", label: "第一项", role: "const",
              note: R`第一个本征分量的共轭，配上正的半相位。`,
              kids: [
                { id: "f1", tex: R`f_1^*(\alpha)`, w: 2, name: "conj(f1)", label: "第一本征分量（共轭）", role: "known",
                  note: R`$f_1,f_2$ 由 \eqref{OIII-35} 定义。它们由 $Q(\alpha)$ 的本征矢和从左边界出发的系数决定，所以左边缘的 $\chi$ 通过它们进入。` },
                { id: "p1", tex: R`\mathrm e^{i\chi'(\alpha)/2}`, w: 4, name: "right_edge_phase(+)", label: "右边缘的相位，半个", role: "known",
                  note: R`**右边缘的势只通过 $\chi'$ 进入**，见 \eqref{OIII-38b}。$\chi'$ 是 $\alpha$ 的实函数，所以这个因子的模为 1。` },
              ] },
            { id: "t2", tex: R`#f2\,#p2`, glyph: R`\times`, name: "f2 * e^(-)", label: "第二项", role: "const",
              note: R`第二个本征分量，配上负的半相位。`,
              kids: [
                { id: "f2", tex: R`f_2(\alpha)`, w: 2, name: "f2", label: "第二本征分量", role: "known",
                  note: R`允许带中对应 $\mathrm e^{-i(n-1)kl}$ 那一列 Bloch 波的系数，见 \eqref{OIII-41}。` },
                { id: "p2", tex: R`\mathrm e^{-i\chi'(\alpha)/2}`, w: 2.5, name: "right_edge_phase(-)", label: "同一相位，反号", role: "known",
                  note: R`和第一项的相位因子互为共轭。` },
              ] },
          ] },
        { id: "den", tex: R`#d1-#d2`, name: "conj(num)", label: "分母就是分子的共轭", role: "const",
          note: R`逐项对照可见，把分子取复共轭就得到分母。这保证比值是一个纯相位。`,
          kids: [
            { id: "d1", tex: R`f_1(\alpha)\,\mathrm e^{-i\chi'(\alpha)/2}`, w: 2.5, name: "conj(term1)", label: "分子第一项的共轭", role: "const", note: R`$f_1^*$ 变成 $f_1$，相位因子反号。` },
            { id: "d2", tex: R`f_2^*(\alpha)\,\mathrm e^{i\chi'(\alpha)/2}`, w: 2.5, name: "conj(term2)", label: "分子第二项的共轭", role: "const", note: R`$f_2$ 变成 $f_2^*$，相位因子反号。` },
          ] },
      ] },
  ],
};

// O_III §3-c 禁带的边缘函数
export const FM_OIII_57 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "L(alpha) := edge_ratio", label: "禁带能级方程的右边", role: "const",
  note: R`\eqref{OIII-55} 解出 $\mathrm e^{-2N\rho l}$，再上下同乘 $\mathrm e^{-i\chi'/2}$，就得到这个函数。式中没有 $N$，所以这类能级的数目与 $N$ 无关。`,
  kids: [
    { id: "lhs", tex: R`${LA}(\alpha)`, w: 3, name: "L(alpha)", label: "它的零点就是禁带中的能级", role: "result",
      note: R`\eqref{OIII-56} 中它等于一个随 $N$ 指数变小的数，所以 $N\gg1$ 时能级方程化为 $L(\alpha)=0$，见 \eqref{OIII-58}。` },
    { id: "rhs", tex: R`-\frac{#num}{#den}`, name: "-num / den", label: "两个纯虚数之比，所以是实函数", role: "const",
      note: R`分子和分母都是“一个数减去它的共轭”，都是纯虚数，比值是实数。负号是解方程时移项留下的。`,
      kids: [
        { id: "num", tex: R`#t1-#t2`, name: "num", label: "只含增长分量 $f_1$：决定零点", role: "const",
          note: R`$L=0$ 就是这个分子为零。可以看出它只含 $f_1$ 和右边缘的相位，不含 $N$。`,
          kids: [
            { id: "t1", tex: R`#f1s\,#p1`, glyph: R`\times`, name: "conj(f1) * e^(+)", label: "第一项", role: "const",
              note: R`和第二项互为共轭。`,
              kids: [
                { id: "f1s", tex: R`f_1^*(\alpha)`, w: 2, name: "conj(f1)", label: "增长分量（共轭）", role: "known",
                  note: R`由 \eqref{OIII-54}，它等于 $f_1'(\alpha)$。` },
                { id: "p1", tex: R`\mathrm e^{i\chi'(\alpha)/2}`, w: 2.5, name: "right_edge_phase(+)", label: "右边缘的相位，半个", role: "known",
                  note: R`边缘相位在这里起决定作用，这一点和允许带不同，因此可以预期这些态局域在边缘。` },
              ] },
            { id: "t2", tex: R`#f1\,#p2`, glyph: R`\times`, name: "f1 * e^(-)", label: "第二项", role: "const",
              note: R`两项相减为零时，就得到 \eqref{OIII-59}：要么 $f_1/f_1^*=\mathrm e^{i\chi'}$，要么 $f_1=0$。`,
              kids: [
                { id: "f1", tex: R`f_1(\alpha)`, w: 3.5, name: "f1", label: "增长分量：区分两种边缘态", role: "known",
                  note: R`**$f_1\ne0$ 时，增长的本征分量自身满足右边界条件，态局域在右端。$f_1=0$ 时，态只由衰减的分量构成，局域在左端。**` },
                { id: "p2", tex: R`\mathrm e^{-i\chi'(\alpha)/2}`, w: 2, name: "right_edge_phase(-)", label: "同一相位，反号", role: "known",
                  note: R`和第一项的相位因子互为共轭。` },
              ] },
          ] },
        { id: "den", tex: R`#d1-#d2`, name: "den", label: "同样的结构，换成衰减分量 $f_2$", role: "const",
          note: R`和分子形式相同，只是把 $f_1$ 换成 $f_2$，同样是一个数减去它的共轭。能级方程 $L=0$ 不要求它满足什么条件。`,
          kids: [
            { id: "d1", tex: R`f_2^*(\alpha)\,\mathrm e^{i\chi'(\alpha)/2}`, w: 2.5, name: "conj(f2) * e^(+)", label: "分母第一项", role: "const", note: R`衰减分量的共轭，配上正的半相位。` },
            { id: "d2", tex: R`f_2(\alpha)\,\mathrm e^{-i\chi'(\alpha)/2}`, w: 2.5, name: "f2 * e^(-)", label: "分母第二项", role: "const", note: R`和前一项互为共轭。` },
          ] },
      ] },
  ],
};
