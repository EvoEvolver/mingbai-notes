import { FoundationsRedraw } from "./_redraw_foundations.jsx";
// §1.3 玻色粒子的路径积分量子化 —— 式 (1.79)–(1.129)，引理 1.2，命题 1.2，例 1.5，图 1.1–1.2
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Figure, Details, C, FormulaMap } from "@kit";
import { FM_1_92, FM_1_102, FM_1_103 } from "./_ch01_fmaps.jsx";

const R = String.raw;

export function Sec13() {
  return (
    <Sec n="1.3" title="Path integral quantization of a Bose particle" zh="玻色粒子的路径积分量子化"
      gist={R`把跃迁振幅 $\langle x_f|\mathrm{e}^{-\mathrm{i}\hat H(t_f-t_i)}|x_i\rangle$ 切成 $n$ 段无穷小时间，每段的振幅是 $\sqrt{m/2\pi\mathrm{i}\varepsilon}\,\mathrm{e}^{\mathrm{i}\Delta S_k}$；对中间位置全部积分，得到"对所有路径求 $\mathrm{e}^{\mathrm{i}S}$ 之和"。转到虚时间得到配分函数（周期路径上的积分），加上外源 $J$ 得到生成泛函 $Z[J]$，它的泛函导数给出编时乘积的矩阵元。`}
      why={R`正则量子化中唱主角的是 Hamilton 量，Lagrange 量根本没有出现。路径积分则完全建立在 Lagrange 量与作用量之上：对称性显然、经典极限显然（稳相点就是经典轨道），而且可以推广到场论、规范场与费米子——后面所有的反常与指标计算都用这种语言。`}
      gives={["1.87", "1.88", "1.92", "1.95", "1.97", "1.104", "1.109", "1.113", "1.118", "1.122", "1.129"]}>
      <Tx>{R`上一节讨论了经典系统的正则量子化，那里的主角是 Hamilton 量，Lagrange 量根本没有出现。本节说明存在另一种量子化程序——**路径积分量子化**——它主要依赖 Lagrange 量。`}</Tx>

      <Sub n="1.3.1" title="Path integral quantization" zh="路径积分量子化">
        <p className="muted">本小节概念：<C id="path_integral" /> · <C id="action" /></p>
        <Tx>{R`从一维系统开始。设 $\hat x(t)$ 是 Heisenberg 绘景中的位置算符。若粒子在时刻 $t_i$（$>0$）位于 $x_i$，则在稍后的时刻 $t_f$（$>t_i$）于 $x_f$ 找到它的概率幅为`}</Tx>
        <Eq n="1.79" say={R`跃迁振幅：$t_i$ 时在 $x_i$ 的粒子，$t_f$ 时出现在 $x_f$ 的概率幅。`}>{R`\langle x_f,t_f|x_i,t_i\rangle`}</Eq>
        <Tx>{R`其中矢量是 Heisenberg 绘景中的（下标 S、H 已省略）：`}</Tx>
        <Eq n="1.80" say={R`$|x_i,t_i\rangle$ 是 $t_i$ 时刻位置算符的瞬时本征态，本征值 $x_i$。`}>{R`\hat x(t_i)|x_i,t_i\rangle=x_i|x_i,t_i\rangle`}</Eq>
        <Eq n="1.81" say={R`同理，$|x_f,t_f\rangle$ 是 $t_f$ 时刻位置算符的瞬时本征态。`}>{R`\hat x(t_f)|x_f,t_f\rangle=x_f|x_f,t_f\rangle.`}</Eq>
        <Tx>{R`注意 $|x_i,t_i\rangle$ 是**瞬时**本征矢，以测量位置的时刻 $t_i$ 为参数；它不应与 Schrödinger 绘景中波函数的动力学时间依赖相混淆。概率幅 \eqref{1.79} 也称为**跃迁振幅**（transition amplitude）。

**改写到 Schrödinger 绘景。**令 $\hat x=\hat x(0)$ 为位置算符，其本征矢为`}</Tx>
        <Eq n="1.82" say={R`Schrödinger 绘景的位置本征态，不随时间变化。`}>{R`\hat x|x\rangle=x|x\rangle.`}</Eq>
        <Tx>{R`$\hat x$ 不依赖于时间，所以它的本征矢也不依赖于时间。把`}</Tx>
        <Eq n="1.83" say={R`Heisenberg 算符由 Schrödinger 算符经时间演化"夹"出来（\eqref{1.39}）。`}>{R`\hat x(t_i)=\mathrm{e}^{\mathrm{i}\hat Ht_i}\hat x\mathrm{e}^{-\mathrm{i}\hat Ht_i}`}</Eq>
        <Tx>{R`代入 \eqref{1.80}，得 $\mathrm{e}^{\mathrm{i}\hat Ht_i}\hat x\mathrm{e}^{-\mathrm{i}\hat Ht_i}|x_i,t_i\rangle=x_i|x_i,t_i\rangle$。左乘 $\mathrm{e}^{-\mathrm{i}\hat Ht_i}$：

$$\hat x[\mathrm{e}^{-\mathrm{i}\hat Ht_i}|x_i,t_i\rangle]=x_i[\mathrm{e}^{-\mathrm{i}\hat Ht_i}|x_i,t_i\rangle].$$

这说明两种本征矢的关系为`}</Tx>
        <Eq n="1.84" say={R`Heisenberg 绘景的瞬时本征态 = 把 Schrödinger 绘景本征态"倒演化"到时刻 $t_i$。`}>{R`|x_i,t_i\rangle=\mathrm{e}^{\mathrm{i}\hat Ht_i}|x_i\rangle.`}</Eq>
        <Tx>{R`同理`}</Tx>
        <Eq n="1.85" say={R`末态的同样关系。`}>{R`|x_f,t_f\rangle=\mathrm{e}^{\mathrm{i}\hat Ht_f}|x_f\rangle,`}</Eq>
        <Tx>{R`由此`}</Tx>
        <Eq n="1.86" say={R`取 Hermite 共轭得到末态的左矢。`}>{R`\langle x_f,t_f|=\langle x_f|\mathrm{e}^{-\mathrm{i}\hat Ht_f}.`}</Eq>
        <Tx>{R`于是在 Schrödinger 绘景中，概率幅表示为`}</Tx>
        <Eq n="1.87" title="跃迁振幅（算符形式）" say={R`跃迁振幅就是时间演化算符在两个位置本征态之间的矩阵元，只依赖于时间差。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=\langle x_f|\mathrm{e}^{-\mathrm{i}\hat H(t_f-t_i)}|x_i\rangle.`}</Eq>
        <Tx>{R`一般地，函数`}</Tx>
        <Eq n="1.88" title="热核" say={R`热核：$\mathrm{e}^{-\beta\hat H}$ 在位置表象中的核；它满足"热方程" $\partial_\beta h=-\hat H_xh$。`}>{R`h(x,y;\beta)\equiv\langle x|\mathrm{e}^{-\hat H\beta}|y\rangle`}</Eq>
        <Tx>{R`称为 $\hat H$ 的**热核**（heat kernel）。这个名字源于 Schrödinger 方程与热方程的相似（对自由粒子，$\partial_\beta h=\tfrac{1}{2m}\partial_x^2h$ 就是扩散方程）。振幅 \eqref{1.87} 是 $\beta$ 取虚数时的热核：`}</Tx>
        <Eq n="1.89" say={R`实时间的跃迁振幅 = 热核在虚"温度参数" $\beta=\mathrm{i}(t_f-t_i)$ 处的值。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=h(x_f,x_i;\mathrm{i}(t_f-t_i)).`}</Eq>
        <Tx>{R`**无穷小时间段的振幅。**现在把 \eqref{1.87} 写成路径积分。为此先考虑 $t_f-t_i=\varepsilon$ 为无穷小正数的情形。为简化记号令 $x_i=x$、$x_f=y$，并设 Hamilton 量的形式为`}</Tx>
        <Eq n="1.90" say={R`标准的"动能 + 势能"型 Hamilton 量。`}>{R`\hat H=\frac{\hat p^2}{2m}+V(\hat x).`}</Eq>
        <Tx>{R`我们需要一个 Gauss 积分的"振荡版本"。`}</Tx>
        <Figure n="1.1" illustration={<FoundationsRedraw n="1.1"/>} caption={R`积分围道。路径 1 沿实轴从 $0$ 到 $R$，路径 2 是半径 $R$ 的八分之一圆弧，路径 3 沿直线 $y=-x$ 回到原点并继续到左上方，路径 4 是左侧的圆弧回到 $-R$。`} width="55%" />
        <Stmt id="L1.2">
          <Eq n="1.91" title="Fresnel 积分" say={R`系数为纯虚数的 Gauss 积分：结果与普通 Gauss 积分同形，只是 $a$ 换成 $\mathrm{i}a$（相位 $\mathrm{e}^{-\mathrm{i}\pi/4}$）。`}>{R`\int_{-\infty}^{\infty}\mathrm{e}^{-\mathrm{i}ap^2}\,\dd p=\sqrt{\frac{\pi}{\mathrm{i}a}}.`}</Eq>
          <Proof steps={[
            { claim: R`这个积分与普通 Gauss 积分的区别在于 $p^2$ 的系数是纯虚数。把 $p$ 换成复变量 $z=x+\mathrm{i}y$；被积函数 $\exp(-\mathrm{i}az^2)$ 在整个 $z$ 平面解析。把积分围道从实轴改为 \figref{1.1} 所示的闭合围道。` },
            { claim: R`沿路径 1 有 $\dd z=\dd x$，它（连同从 $-R$ 到 $0$ 的那段）给出原积分 \eqref{1.91}。` },
            { claim: R`路径 2、4 的贡献在 $R\to\infty$ 时趋于零。`, fill: true, why: R`在路径 2 上 $z=R\mathrm{e}^{\mathrm{i}\varphi}$，$-\pi/4\le\varphi\le0$：$|\mathrm{e}^{-\mathrm{i}az^2}|=\mathrm{e}^{aR^2\sin2\varphi}$，$\sin2\varphi\le0$。用 $|\sin2\varphi|\ge\tfrac{4}{\pi}|\varphi|$（Jordan 不等式），弧上积分 $\le R\int_0^{\pi/4}\mathrm{e}^{-4aR^2\varphi/\pi}\dd\varphi\le\tfrac{\pi}{4aR}\to0$。路径 4 同理。` },
            { claim: R`路径 3 上 $z=(1-\mathrm{i})x$，$z^2=-2\mathrm{i}x^2$，$\mathrm{e}^{-\mathrm{i}az^2}=\mathrm{e}^{-2ax^2}$，$x$ 从 $+\infty$ 走到 $-\infty$：`, tex: R`(1-\mathrm{i})\int_{\infty}^{-\infty}\mathrm{e}^{-2ax^2}\,\dd x=-\mathrm{e}^{-\mathrm{i}\pi/4}\sqrt{\frac{\pi}{a}}`, why: R`$1-\mathrm{i}=\sqrt2\,\mathrm{e}^{-\mathrm{i}\pi/4}$，$\int\mathrm{e}^{-2ax^2}\dd x=\sqrt{\pi/2a}$。` },
            { claim: R`由 Cauchy 定理，闭合围道上的积分为零，故`, tex: R`\int_{-\infty}^{\infty}\dd p\,\mathrm{e}^{-\mathrm{i}ap^2}=\mathrm{e}^{-\mathrm{i}\pi/4}\sqrt{\frac{\pi}{a}}=\sqrt{\frac{\pi}{\mathrm{i}a}}`, why: R`$\sqrt{\mathrm{i}}=\mathrm{e}^{\mathrm{i}\pi/4}$（取主值）。` },
          ]} />
        </Stmt>
        <Tx>{R`下面用这个引理求出无穷小时间间隔的热核。`}</Tx>
        <Stmt id="P1.2">
          <FormulaMap n="1.92" title="短时传播子" say={R`无穷小时间 $\varepsilon$ 内的跃迁振幅 = 归一化因子乘 $\mathrm{e}^{\mathrm{i}\Delta S}$，其中 $\Delta S$ 是沿直线路径的作用量（势能取在中点，即 Weyl 排序）。`} tree={FM_1_92} start="pot" />
          <Proof steps={[
            { claim: R`在左边插入动量本征矢的完备性关系（用 \eqref{1.55}）：`, tex: R`\langle x|\mathrm{e}^{-\mathrm{i}\hat H\varepsilon}|y\rangle=\int\dd k\,\langle x|\mathrm{e}^{-\mathrm{i}\varepsilon\hat H}|k\rangle\langle k|y\rangle=\int\frac{\dd k}{2\pi}\mathrm{e}^{-\mathrm{i}ky}\mathrm{e}^{-\mathrm{i}\varepsilon\hat H_x}\mathrm{e}^{\mathrm{i}kx}`, why: R`其中 $\hat H_x=-\dfrac{1}{2m}\dfrac{\dd^2}{\dd x^2}+V(x)$ 是坐标表象中的 Hamilton 算符。`, uses: ["1.36", "1.55", "1.56"] },
            { claim: R`由 $\partial_x\equiv\dd/\dd x$ 与 $\mathrm{e}^{\mathrm{i}kx}$ 的对易关系 $\partial_x\mathrm{e}^{\mathrm{i}kx}=\mathrm{i}k\mathrm{e}^{\mathrm{i}kx}+\mathrm{e}^{\mathrm{i}kx}\partial_x=\mathrm{e}^{\mathrm{i}kx}(\mathrm{i}k+\partial_x)$，反复使用得 $\partial_x^n\mathrm{e}^{\mathrm{i}kx}=\mathrm{e}^{\mathrm{i}kx}(\mathrm{i}k+\partial_x)^n$，因而`, tex: R`\mathrm{e}^{-\mathrm{i}\varepsilon[-\partial_x^2/2m+V(x)]}\mathrm{e}^{\mathrm{i}kx}=\mathrm{e}^{\mathrm{i}kx}\mathrm{e}^{-\mathrm{i}\varepsilon[-(\mathrm{i}k+\partial_x)^2/2m+V(x)]}` },
            { claim: R`于是（末尾的"$\cdot1$"提醒 $\partial_x1=0$）`, tex: R`\begin{aligned}\langle x|\mathrm{e}^{-\mathrm{i}\hat H\varepsilon}|y\rangle&=\int\frac{\dd k}{2\pi}\mathrm{e}^{\mathrm{i}k(x-y)}\mathrm{e}^{-\mathrm{i}\varepsilon[-(\mathrm{i}k+\partial_x)^2/2m+V(x)]}\\&=\int\frac{\dd k}{2\pi}\mathrm{e}^{-\mathrm{i}[\varepsilon k^2/2m-k(x-y)]}\mathrm{e}^{-\mathrm{i}\varepsilon[-\mathrm{i}k\partial_x/m-\partial_x^2/2m+V(x)]}\cdot1\end{aligned}`, why: R`$-(\mathrm{i}k+\partial_x)^2=k^2-2\mathrm{i}k\partial_x-\partial_x^2$。把 $k^2$ 项拆出来是合法的，因为它是 c 数，与其余算符对易。` },
            { claim: R`令 $p=\sqrt{\varepsilon/2m}\,k$（即 $k=\sqrt{2m/\varepsilon}\,p$），配方并展开最后一个指数：`, tex: R`\langle x|\mathrm{e}^{-\mathrm{i}\varepsilon\hat H}|y\rangle=\sqrt{\frac{2m}{\varepsilon}}\mathrm{e}^{\mathrm{i}m(x-y)^2/2\varepsilon}\int\frac{\dd p}{2\pi}\mathrm{e}^{-\mathrm{i}[p-\sqrt{m/2\varepsilon}(x-y)]^2}\times\sum_{n=0}^{\infty}\frac{(-\mathrm{i}\varepsilon)^n}{n!}\left[-\mathrm{i}\sqrt{\frac{2}{\varepsilon m}}p\partial_x-\frac{\partial_x^2}{2m}+V(x)\right]^n\cdot1`, why: R`$\varepsilon k^2/2m-k(x-y)=p^2-2p\sqrt{m/2\varepsilon}(x-y)=[p-\sqrt{m/2\varepsilon}(x-y)]^2-m(x-y)^2/2\varepsilon$；$-\mathrm{i}k\partial_x/m=-\mathrm{i}\sqrt{2/\varepsilon m}\,p\partial_x$。原书这两处符号都印反了（$[p+\cdots]^2$ 与 $+\mathrm{i}\sqrt{2/\varepsilon m}\,p\partial_x$），两个错误恰好相互抵消，所以最终结果不受影响。` },
            { claim: R`令 $q=p-\sqrt{m/2\varepsilon}(x-y)$，保留到所需阶，再用 \sref{L1.2}：`, tex: R`\begin{aligned}\langle x|\mathrm{e}^{-\mathrm{i}\varepsilon\hat H}|y\rangle&=\sqrt{\frac{2m}{\varepsilon}}\mathrm{e}^{\mathrm{i}m(x-y)^2/2\varepsilon}\int\frac{\dd q}{2\pi}\mathrm{e}^{-\mathrm{i}q^2}\\&\quad\times\left[1+(-\mathrm{i}\varepsilon)V(x)+\frac{(-\varepsilon^2)}{2}\frac{(-\mathrm{i})}{\varepsilon}(x-y)\partial_xV(x)+\mathcal{O}(\varepsilon^2)+\mathcal{O}(\varepsilon|x-y|^2)\right]\\&=\sqrt{\frac{m}{2\pi\mathrm{i}\varepsilon}}\mathrm{e}^{\mathrm{i}\varepsilon(m/2)[(x-y)/\varepsilon]^2}\times\exp\left[-\mathrm{i}\varepsilon V\left(\frac{x+y}{2}\right)+\mathcal{O}(\varepsilon^2)+\mathcal{O}(\varepsilon|x-y|^2)\right]\end{aligned}`, uses: ["L1.2"], fill: true, why: R`逐项看：$n=1$ 项作用在 $1$ 上只剩 $-\mathrm{i}\varepsilon V(x)$。$n=2$ 项中有 $\tfrac{(-\mathrm{i}\varepsilon)^2}{2}\cdot(-\mathrm{i})\sqrt{2/\varepsilon m}\,p\,\partial_xV$；把 $p=q+\sqrt{m/2\varepsilon}(x-y)$ 代入，含 $q$ 的一次项对 $q$ 积分为零，余下 $\tfrac{-\varepsilon^2}{2}\cdot\tfrac{-\mathrm{i}}{\varepsilon}(x-y)V'(x)=\tfrac{\mathrm{i}\varepsilon}{2}(x-y)V'(x)$。更高阶项是 $\mathcal{O}(\varepsilon^2)$ 或 $\mathcal{O}(\varepsilon|x-y|^2)$（$q^2$ 项积分后给 $\mathcal{O}(\varepsilon^2)$）。$q$ 积分：$\tfrac{1}{2\pi}\sqrt{\pi/\mathrm{i}}\cdot\sqrt{2m/\varepsilon}=\sqrt{m/2\pi\mathrm{i}\varepsilon}$。最后 $-\mathrm{i}\varepsilon[V(x)-\tfrac12(x-y)V'(x)]=-\mathrm{i}\varepsilon V(\tfrac{x+y}{2})+\mathcal{O}(\varepsilon|x-y|^2)$。` },
          ]} />
        </Stmt>
        <Box kind="warning" title={R`勘误：\eqref{1.92} 的归一化因子`}>{R`原书 \eqref{1.92} 的前因子印作 $1/\sqrt{2\pi\mathrm{i}\varepsilon}$，漏了质量 $m$。证明最后一行（原书 p.43）得到的是 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$，后面 \eqref{1.95} 用的也是 $(m/2\pi\mathrm{i}\varepsilon)^{n/2}$；量纲上 $\langle x|y\rangle=\delta(x-y)$ 的量纲是 [长度]$^{-1}$，在 $\hbar=1$ 时 $m/\varepsilon$ 的量纲正是 [长度]$^{-2}$。正文已改为 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$。

另外，证明中间一步（原书 p.42 末）的配方 $[p+\sqrt{m/2\varepsilon}(x-y)]^2$ 与算符 $+\mathrm{i}\sqrt{2/\varepsilon m}\,p\partial_x$ 的符号都印反了；两处同时改正后结论不变（见证明第 4 步的说明）。`}</Box>
        <Tx>{R`注意 \eqref{1.92} 中 $V$ 的自变量是平均值 $(x+y)/2$，这种取法常称为 **Weyl 排序**（Weyl ordering）。

**为什么指数趋于作用量。**由 \eqref{1.92}，当 $|x-y|>\sqrt\varepsilon$ 时被积函数振荡极快，在分布意义下可视为零（Riemann–Lebesgue 定理）。所以在 $\varepsilon\to0$ 时起作用的只是 $x-y$ 小的区域，\eqref{1.92} 的指数趋于无穷小时间间隔 $[0,\varepsilon]$ 上的作用量`}</Tx>
        <Eq n="1.93" say={R`短时间内的作用量：动能用平均速度、势能用平均位置，乘以时间间隔。`}>{R`\Delta S=\int_0^\varepsilon\dd t\left[\frac{m}{2}v^2-V(x)\right]\simeq\left[\frac{m}{2}v^2-V(x)\right]\varepsilon`}</Eq>
        <Tx>{R`其中 $v=(x-y)/\varepsilon$ 是平均速度，$x$ 是平均位置。\eqref{1.92} 还满足 $\varepsilon\to0$ 时的边界条件`}</Tx>
        <Eq n="1.94" say={R`时间间隔趋于零时，传播子退化为位置本征态的内积，即 $\delta$ 函数。`}>{R`\langle x|\mathrm{e}^{-\mathrm{i}\hat H\varepsilon}|y\rangle\ \xrightarrow{\varepsilon\to0}\ \langle x|y\rangle=\delta(x-y).`}</Eq>
        <Tx>{R`理由：$\int_{-\infty}^{\infty}\dd x\sqrt{\dfrac{m}{2\pi\mathrm{i}\varepsilon}}\mathrm{e}^{\mathrm{i}m(x-y)^2/2\varepsilon}=1$（\sref{L1.2}，$a=-m/2\varepsilon$ 时同理），而宽度 $\sim\sqrt\varepsilon\to0$。

**把有限时间切成小段。**有限时间间隔的跃迁振幅 \eqref{1.79} 可以由无穷小时间间隔的振幅无穷次地接连起来得到。把 $t_f-t_i$ 等分为 $n$ 段，$\varepsilon=(t_f-t_i)/n$；令 $t_0=t_i$，$t_k=t_0+\varepsilon k$（$0\le k\le n$），显然 $t_n=t_f$。在每个时刻 $t_k$ 插入完备性关系 $1=\int\dd x_k\,|x_k,t_k\rangle\langle x_k,t_k|$（$1\le k\le n-1$）：

$$\langle x_f,t_f|x_i,t_i\rangle=\langle x_f,t_f|\int\dd x_{n-1}|x_{n-1},t_{n-1}\rangle\langle x_{n-1},t_{n-1}|\times\int\dd x_{n-2}|x_{n-2},t_{n-2}\rangle\cdots\int\dd x_1|x_1,t_1\rangle\langle x_1,t_1|x_0,t_0\rangle.$$

考虑极限 $\varepsilon\to0$，即 $n\to\infty$。\sref{P1.2} 说，对无穷小的 $\varepsilon$，

$$\langle x_k,t_k|x_{k-1},t_{k-1}\rangle\simeq\sqrt{\frac{m}{2\pi\mathrm{i}\varepsilon}}\mathrm{e}^{\mathrm{i}\Delta S_k},\qquad\Delta S_k=\varepsilon\left[\frac{m}{2}\left(\frac{x_k-x_{k-1}}{\varepsilon}\right)^2-V\left(\frac{x_{k-1}+x_k}{2}\right)\right].$$

因此`}</Tx>
        <Eq n="1.95" title="路径积分的离散定义" say={R`路径积分的严格定义：把时间切成 $n$ 段，每段贡献归一化因子与 $\mathrm{e}^{\mathrm{i}\Delta S_k}$，对所有中间位置积分，再取 $n\to\infty$。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=\lim_{n\to\infty}\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{n/2}\int\prod_{j=1}^{n-1}\dd x_j\exp\left(\mathrm{i}\sum_{k=1}^n\Delta S_k\right).`}</Eq>
        <Tx>{R`若固定 $n-1$ 个点 $x_1,x_2,\ldots,x_{n-1}$，就得到一条经过这些点、从 $x_0$ 到 $x_n$ 的折线路径。定义 $S(\{x_k\})=\sum_k\Delta S_k$，在 $n\to\infty$ 的极限下可以写成`}</Tx>
        <Eq n="1.96" say={R`折线路径上的离散作用量，在切分无穷细时形式上趋于连续作用量。`}>{R`S(\{x_k\})\ \xrightarrow{n\to\infty}\ S[x(t)]=\int_{t_i}^{t_f}\dd t\left[\frac{m}{2}v^2-V(x)\right].`}</Eq>
        <Tx>{R`不过要注意，这样定义的 $S[x(t)]$ 是**形式上的**：$x_k$ 与 $x_{k-1}$ 不必相互接近，因而 $v=(x_k-x_{k-1})/\varepsilon$ 可以发散。跃迁振幅*符号地*写作`}</Tx>
        <Eq n="1.97" keyEq title="路径积分" say={R`路径积分：跃迁振幅等于对连接两端点的所有路径，以相位 $\mathrm{e}^{\mathrm{i}S}$ 为权重求和。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle&=\int\mathcal{D}x\,\exp\left[\mathrm{i}\int_{t_i}^{t_f}\dd t\left(\frac{m}{2}v^2-V(x)\right)\right]\\&=\int\mathcal{D}x\,\exp\left[\mathrm{i}\int_{t_i}^{t_f}\dd t\,L(x,\dot x)\right]\end{aligned}`}</Eq>
        <Tx>{R`称为跃迁振幅的**路径积分**（path integral）表示。再强调一次："$v$" 没有良好定义，这个表达式只是极限 \eqref{1.95} 的符号表示。积分测度理解为`}</Tx>
        <Eq n="1.98" say={R`路径积分测度的含义：对所有端点固定的路径求和。`}>{R`\int\mathcal{D}x=\text{对所有满足 }x(t_i)=x_i,\ x(t_f)=x_f\text{ 的路径 }x(t)\text{ 求和}`}</Eq>
        <Figure n="1.2" illustration={<FoundationsRedraw n="1.2"/>} caption={R`路径积分要考虑所有端点固定的路径，被积函数 $\exp[\mathrm{i}S(\{x_k\})]$ 对这些路径积分。`} width="55%" />
        <Tx>{R`见 \figref{1.2}。尽管在 $n\to\infty$ 时 $\mathcal{D}x$ 与 $S(\{x_k\})$ 各自都没有良好定义，由它们**合起来**构成的振幅 $\langle x_f,t_f|x_i,t_i\rangle$ 却是良定义的，因而有意义。下面的例子说明这一点。`}</Tx>
        <Box kind="physics" title="稳相：经典轨道从哪里来">{R`恢复 $\hbar$，权重是 $\mathrm{e}^{\mathrm{i}S/\hbar}$。$\hbar\to0$ 时相位变化极快，相邻路径的贡献相互抵消；只有在 $S$ 取**稳定值**的路径附近，相位才不随路径变化、贡献同相叠加。于是经典轨道 $\delta S=0$（\eqref{1.4}）作为路径积分的稳相点自然出现——这正是 §1.1 末尾说"作用量对任意轨道都有定义"之所以重要的原因。`}</Box>
        <Box kind="example" n="1.5" title="自由粒子：两种方法算同一个振幅">
          <Tx>{R`计算在实轴上运动、Lagrange 量为`}</Tx>
          <Eq n="1.99" say={R`自由粒子的 Lagrange 量：只有动能。`}>{R`L=\tfrac12m\dot x^2`}</Eq>
          <Tx>{R`的自由粒子的跃迁振幅。正则共轭动量为 $p=\partial L/\partial\dot x=m\dot x$，Hamilton 量为`}</Tx>
          <Eq n="1.100" say={R`自由粒子的 Hamilton 量：动能 $p^2/2m$。`}>{R`H=p\dot x-L=\frac{p^2}{2m}.`}</Eq>
          <Tx>{R`**正则量子论的算法**（$T=t_f-t_i$）：插入动量本征态，用 \eqref{1.55} 与 \sref{L1.2}：`}</Tx>
          <Eq n="1.101" title="自由粒子传播子" say={R`自由粒子的传播子：Gauss 型振幅，指数恰好是经典作用量 $m(x_f-x_i)^2/2T$。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle&=\langle x_f|\mathrm{e}^{-\mathrm{i}\hat HT}|x_i\rangle=\int\dd p\,\langle x_f|\mathrm{e}^{-\mathrm{i}\hat HT}|p\rangle\langle p|x_i\rangle\\&=\int\frac{\dd p}{2\pi}\mathrm{e}^{\mathrm{i}p(x_f-x_i)}\mathrm{e}^{-\mathrm{i}T(p^2/2m)}\\&=\sqrt{\frac{m}{2\pi\mathrm{i}T}}\exp\left(\frac{\mathrm{i}m(x_f-x_i)^2}{2T}\right)\end{aligned}`}</Eq>
          <Tx>{R`（最后一步对 $p$ 配方后用 \eqref{1.91}，$a=T/2m$。）

**路径积分的算法**：振幅表示为`}</Tx>
          <FormulaMap n="1.102" say={R`自由粒子的离散路径积分：$n-1$ 个中间位置上的 Gauss 积分。`} tree={FM_1_102} start="vel" />
          <Tx>{R`其中 $\varepsilon=T/n$。把坐标标度为 $y_k=(m/2\varepsilon)^{1/2}x_k$，振幅变为`}</Tx>
          <FormulaMap n="1.103" say={R`无量纲化后，指数只剩相邻点差的平方和；前因子记录了测度的标度。`} tree={FM_1_103} start="phase" />
          <Tx>{R`可以用归纳法证明（原书留作习题）`}</Tx>
          <Derivation title={R`归纳法：$\int\dd y_1\ldots\dd y_{n-1}\exp[\mathrm{i}\sum_{k=1}^n(y_k-y_{k-1})^2]=[(\mathrm{i}\pi)^{n-1}/n]^{1/2}\mathrm{e}^{\mathrm{i}(y_n-y_0)^2/n}$`} collapsed steps={[
            { tex: R`n=1:\quad\text{没有积分，左边}=\mathrm{e}^{\mathrm{i}(y_1-y_0)^2}=\text{右边}`, why: "归纳起点。" },
            { tex: R`I_{n+1}=\int\dd y_n\,I_n(y_n,y_0)\,\mathrm{e}^{\mathrm{i}(y_{n+1}-y_n)^2}=\left[\frac{(\mathrm{i}\pi)^{n-1}}{n}\right]^{1/2}\int\dd y_n\,\mathrm{e}^{\mathrm{i}(y_n-y_0)^2/n+\mathrm{i}(y_{n+1}-y_n)^2}`, why: R`假设对 $n$ 成立，再对 $y_n$ 积分。` },
            { tex: R`\frac{(y_n-y_0)^2}{n}+(y_{n+1}-y_n)^2=\frac{n+1}{n}\left(y_n-\frac{y_0+ny_{n+1}}{n+1}\right)^2+\frac{(y_{n+1}-y_0)^2}{n+1}`, why: R`配方（展开两边比较 $y_n^2$、$y_n$ 与常数项即可验证）。` },
            { tex: R`\int\dd y_n\,\mathrm{e}^{\mathrm{i}\frac{n+1}{n}u^2}=\sqrt{\frac{\mathrm{i}\pi n}{n+1}}`, why: R`\eqref{1.91} 取 $a=-(n+1)/n$，即 $\sqrt{\pi/(-\mathrm{i}a)}=\sqrt{\mathrm{i}\pi n/(n+1)}$。` },
            { tex: R`I_{n+1}=\left[\frac{(\mathrm{i}\pi)^{n-1}}{n}\cdot\frac{\mathrm{i}\pi n}{n+1}\right]^{1/2}\mathrm{e}^{\mathrm{i}(y_{n+1}-y_0)^2/(n+1)}=\left[\frac{(\mathrm{i}\pi)^{n}}{n+1}\right]^{1/2}\mathrm{e}^{\mathrm{i}(y_{n+1}-y_0)^2/(n+1)}`, why: R`即 $n+1$ 时的公式。` },
          ]} />
          <Tx>{R`取极限 $n\to\infty$，最终得到`}</Tx>
          <Eq n="1.104" say={R`路径积分算出的自由粒子传播子与正则量子化的结果 \eqref{1.101} 完全一致；$n$ 依赖全部相消。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle&=\lim_{n\to\infty}\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{n/2}\left(\frac{2\pi\mathrm{i}\varepsilon}{m}\right)^{(n-1)/2}\frac{1}{\sqrt n}\mathrm{e}^{\mathrm{i}m(x_f-x_i)^2/(2n\varepsilon)}\\&=\sqrt{\frac{m}{2\pi\mathrm{i}T}}\exp\left[\frac{\mathrm{i}m(x_f-x_i)^2}{2T}\right].\end{aligned}`}</Eq>
          <Tx>{R`（$n$ 个前因子 $\sqrt{m/2\pi\mathrm{i}\varepsilon}$ 中有 $n-1$ 个被 Gauss 积分抵消，剩下 $\sqrt{m/2\pi\mathrm{i}\varepsilon}/\sqrt n=\sqrt{m/2\pi\mathrm{i}T}$；指数中 $n\varepsilon=T$。实际上对自由粒子，这个结果对**每个** $n$ 都精确成立，取极限是平凡的。）

值得注意的是**指数就是经典作用量**。平均速度 $v=(x_f-x_i)/(t_f-t_i)$，经典作用量为

$$S_{\rm cl}=\int_{t_i}^{t_f}\dd t\,\frac12mv^2=\frac{m(x_f-x_i)^2}{2(t_f-t_i)}.$$`}</Tx>
        </Box>
        <Tx>{R`在许多可精确求解的系统中，跃迁振幅都取如下形式：`}</Tx>
        <Eq n="1.105" say={R`可解系统的传播子 = 前因子乘以经典作用量的相位；量子涨落的全部效应都装在前因子里。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=A\mathrm{e}^{\mathrm{i}S_{\rm cl}},`}</Eq>
        <Tx>{R`量子涨落的所有效应都包含在前因子 $A$ 中。§1.4 的谐振子是又一个例子。`}</Tx>
      </Sub>

      <Sub n="1.3.2" title="Imaginary time and partition function" zh="虚时间与配分函数">
        <p className="muted">本小节概念：<C id="euclid" /></p>
        <Tx>{R`设 Hamilton 量 $\hat H$ 的谱有下界。那么总可以给 Hamilton 量加一个正常数，使 $\hat H$ 正定：`}</Tx>
        <Eq n="1.106" say={R`把能量零点移到基态之下，使所有本征值为正（基态非简并）。`}>{R`\operatorname{Spec}\hat H=\{0<E_0\le E_1\le E_2\le\cdots\}.`}</Eq>
        <Tx>{R`为简单起见假定基态非简并。$\mathrm{e}^{-\mathrm{i}\hat Ht}$ 的谱分解`}</Tx>
        <Eq n="1.107" say={R`演化算符的谱分解：每个能量本征态以自己的频率转动相位。`}>{R`\mathrm{e}^{-\mathrm{i}\hat Ht}=\sum_n\mathrm{e}^{-\mathrm{i}E_nt}|n\rangle\langle n|`}</Eq>
        <Tx>{R`在 $t$ 的下半平面解析（$\hat H|n\rangle=E_n|n\rangle$；$t=-\mathrm{i}\tau$、$\tau>0$ 时每项 $\mathrm{e}^{-E_n\tau}$ 指数衰减，级数收敛）。通过替换`}</Tx>
        <Eq n="1.108" title="Wick 转动" say={R`Wick 转动：把实时间转到负虚轴，振荡的相位变成衰减的指数。`}>{R`t=-\mathrm{i}\tau\qquad(\tau\in\mathbb{R}_+)`}</Eq>
        <Tx>{R`引入 **Wick 转动**（Wick rotation），$\mathbb{R}_+$ 是正实数集。变量 $\tau$ 称为虚时间，也称 **Euclid 时间**，因为世界间隔从 $t^2-\boldsymbol{x}^2$ 变为 $-(\tau^2+\boldsymbol{x}^2)$。在这个变量替换下，各物理量变为

$$\dot x=\frac{\dd x}{\dd t}=\mathrm{i}\frac{\dd x}{\dd\tau},\qquad\mathrm{e}^{-\mathrm{i}\hat Ht}=\mathrm{e}^{-\hat H\tau},$$

$$\mathrm{i}\int_{t_i}^{t_f}\dd t\left[\frac12m\dot x^2-V(x)\right]=\mathrm{i}(-\mathrm{i})\int_{\tau_i}^{\tau_f}\dd\tau\left[-\frac12m\left(\frac{\dd x}{\dd\tau}\right)^2-V(x)\right]=-\int_{\tau_i}^{\tau_f}\dd\tau\left[\frac12m\left(\frac{\dd x}{\dd\tau}\right)^2+V(x)\right].$$

于是路径积分用新变量表示为`}</Tx>
        <Eq n="1.109" title="Euclid 路径积分" say={R`虚时间的路径积分：相位 $\mathrm{e}^{\mathrm{i}S}$ 变成实的衰减权重 $\mathrm{e}^{-S_E}$，$S_E$ 是动能加势能的积分。`}>{R`\begin{aligned}\langle x_f,\tau_f|x_i,\tau_i\rangle&=\langle x_f|\mathrm{e}^{-\hat H(\tau_f-\tau_i)}|x_i\rangle\\&=\int\bar{\mathcal{D}}x\,\mathrm{e}^{-\int_{\tau_i}^{\tau_f}\dd\tau\left[\frac12m\left(\frac{\dd x}{\dd\tau}\right)^2+V(x)\right]},\end{aligned}`}</Eq>
        <Tx>{R`$\bar{\mathcal{D}}$ 是虚时间 $\tau$ 中的积分测度。

**配分函数。**对给定的 Hamilton 量 $\hat H$，**配分函数**（partition function）定义为`}</Tx>
        <Eq n="1.110" title="配分函数" say={R`配分函数：Boltzmann 算符 $\mathrm{e}^{-\beta\hat H}$ 的迹，$\beta$ 是逆温度。`}>{R`Z(\beta)=\Tr\,\mathrm{e}^{-\beta\hat H}\qquad(\beta>0),`}</Eq>
        <Tx>{R`迹取遍与 $\hat H$ 相联系的 Hilbert 空间。取 $\hat H$ 的本征态 $\{|E_n\rangle\}$ 作为 Hilbert 空间的基，$\hat H|E_n\rangle=E_n|E_n\rangle$，$\langle E_m|E_n\rangle=\delta_{mn}$，配分函数为`}</Tx>
        <Eq n="1.111" say={R`在能量本征基中，配分函数就是各能级的 Boltzmann 因子之和。`}>{R`Z(\beta)=\sum_n\langle E_n|\mathrm{e}^{-\beta\hat H}|E_n\rangle=\sum_n\langle E_n|\mathrm{e}^{-\beta E_n}|E_n\rangle=\sum_n\mathrm{e}^{-\beta E_n}.`}</Eq>
        <Tx>{R`配分函数也可以用 $\hat x$ 的本征矢 $|x\rangle$ 表示：`}</Tx>
        <Eq n="1.112" say={R`在位置基中取迹：热核的对角元对 $x$ 积分。`}>{R`Z(\beta)=\int\dd x\,\langle x|\mathrm{e}^{-\beta\hat H}|x\rangle.`}</Eq>
        <Tx>{R`若把 $\beta$ 等同于 Euclid 时间，令 $\beta=\mathrm{i}T$，则 $\langle x_f|\mathrm{e}^{-\mathrm{i}\hat HT}|x_i\rangle=\langle x_f|\mathrm{e}^{-\beta\hat H}|x_i\rangle$，由此得到配分函数的路径积分表示：`}</Tx>
        <Eq n="1.113" keyEq title="配分函数的路径积分" say={R`配分函数 = 对虚时间长度为 $\beta$ 的所有**周期**路径求 $\mathrm{e}^{-S_E}$ 之和：取迹就是把首尾粘起来。`}>{R`\begin{aligned}Z(\beta)&=\int\dd y\int_{x(0)=x(\beta)=y}\bar{\mathcal{D}}x\,\exp\left\{-\int_0^\beta\dd\tau\left(\frac12m\dot x^2+V(x)\right)\right\}\\&=\int_{\rm periodic}\bar{\mathcal{D}}x\,\exp\left\{-\int_0^\beta\dd\tau\left(\frac12m\dot x^2+V(x)\right)\right\},\end{aligned}`}</Eq>
        <Tx>{R`这里 $\dot x$ 表示 $\dd x/\dd\tau$，最后一行的积分取遍 $[0,\beta]$ 上所有周期路径。§1.4.2 将对谐振子算出它，§1.5 将看到费米子对应**反周期**路径。`}</Tx>
      </Sub>

      <Sub n="1.3.3" title="Time-ordered product and generating functional" zh="编时乘积与生成泛函">
        <p className="muted">本小节概念：<C id="euclid" /></p>
        <Tx>{R`定义 Heisenberg 算符 $A(t)$、$B(t)$ 的 **$T$ 乘积**（编时乘积，time-ordered product）`}</Tx>
        <Eq n="1.114" say={R`编时乘积：总是把时间较晚的算符放在左边。`}>{R`T[A(t_1)B(t_2)]=A(t_1)B(t_2)\theta(t_1-t_2)+B(t_2)A(t_1)\theta(t_2-t_1)`}</Eq>
        <Tx>{R`其中 $\theta(t)$ 是 Heaviside 函数（$x<0$ 时 $\theta(x)=0$，$x\ge0$ 时 $\theta(x)=1$）。推广到多个算符是平凡的：括号内的算符重新排列，使时间参数从左到右递减。$n$ 个算符的 $T$ 乘积展开为 $n!$ 项，每项正比于 $n-1$ 个 Heaviside 函数之积。量子力学中一个重要的量是 $T$ 乘积的矩阵元`}</Tx>
        <Eq n="1.115" say={R`编时乘积在两个位置本征态之间的矩阵元：路径积分最自然算出的就是它。`}>{R`\langle x_f,t_f|T[\hat x(t_1)\hat x(t_2)\cdots\hat x(t_n)]|x_i,t_i\rangle,\qquad(t_i<t_1,t_2,\ldots,t_n<t_f).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.115} 中的 $\hat x(t_f)$`}>{R`原书 \eqref{1.115} 印作 $T[\hat x(t_1)\hat x(t_f)\cdots\hat x(t_n)]$。第二个算符应为 $\hat x(t_2)$（$t_f$ 是末时刻，不在 $T$ 乘积之中）。正文已改正。`}</Box>
        <Tx>{R`设 \eqref{1.115} 中 $t_i<t_1\le t_2\le\cdots\le t_n<t_f$。插入完备性关系 $1=\int_{-\infty}^{\infty}\dd x_k\,|x_k,t_k\rangle\langle x_k,t_k|$（$k=1,2,\ldots,n$），得`}</Tx>
        <Eq n="1.116" say={R`在每个算符的时刻插入位置完备基，Heisenberg 算符就变成它的本征值 $x_k$。`}>{R`\begin{aligned}&\langle x_f,t_f|\hat x(t_n)\cdots\hat x(t_1)|x_i,t_i\rangle\\&=\langle x_f,t_f|\hat x(t_n)\int\dd x_n|x_n,t_n\rangle\langle x_n,t_n|\cdots\hat x(t_1)\int\dd x_1|x_1,t_1\rangle\langle x_1,t_1|x_i,t_i\rangle\\&=\int\dd x_1\ldots\dd x_n\,x_1\ldots x_n\langle x_f,t_f|x_n,t_n\rangle\cdots\langle x_1,t_1|x_i,t_i\rangle\end{aligned}`}</Eq>
        <Tx>{R`这里用了本征值方程 $\hat x(t_k)|x_k,t_k\rangle=x_k|x_k,t_k\rangle$。把最后一行中的每个 $\langle x_k,t_k|x_{k-1},t_{k-1}\rangle$ 都写成路径积分，得`}</Tx>
        <Eq n="1.117" say={R`算符乘积的矩阵元 = 在路径积分中插入路径在相应时刻的取值。`}>{R`\langle x_f,t_f|\hat x(t_n)\ldots\hat x(t_1)|x_i,t_i\rangle=\int\mathcal{D}x\,x(t_1)\ldots x(t_n)\mathrm{e}^{\mathrm{i}S}.`}</Eq>
        <Tx>{R`关键是要注意：左边的 $\hat x(t_k)$ 是 Heisenberg **算符**，而右边的 $x(t_k)$（$=x_k$）是经典路径 $x(t)$ 在时刻 $t_k$ 的**实数值**。所以右边对任何时间顺序都成立——只要左边的 Heisenberg 算符按 $T$ 乘积的方式排列。于是路径积分表达式**自动**考虑了 $T$ 乘积的排序：`}</Tx>
        <Eq n="1.118" title="路径积分自动编时" say={R`路径积分中的被积函数是普通的数，次序无关；它算出的永远是编时乘积的矩阵元。`}>{R`\langle x_f,t_f|T[\hat x(t_n)\ldots\hat x(t_1)]|x_i,t_i\rangle=\int\mathcal{D}x\,x(t_1)\ldots x(t_n)\mathrm{e}^{\mathrm{i}S}.`}</Eq>
        <Details summary={R`原书建议读者对 $n=2$ 明确验证：展开看看`}>{R`取 $t_1>t_2$。路径积分 $\int\mathcal{D}x\,x(t_1)x(t_2)\mathrm{e}^{\mathrm{i}S}$ 按时间切片时，时刻较早的 $t_2$ 先被插入：

$$\int\dd x_1\dd x_2\,x_1x_2\langle x_f,t_f|x_1,t_1\rangle\langle x_1,t_1|x_2,t_2\rangle\langle x_2,t_2|x_i,t_i\rangle=\langle x_f,t_f|\hat x(t_1)\hat x(t_2)|x_i,t_i\rangle.$$

若 $t_2>t_1$，同样的路径积分（被积函数 $x(t_1)x(t_2)=x(t_2)x(t_1)$ 不变）给出 $\langle x_f,t_f|\hat x(t_2)\hat x(t_1)|x_i,t_i\rangle$。两者合起来正是 $\langle x_f,t_f|T[\hat x(t_1)\hat x(t_2)]|x_i,t_i\rangle$，与 \eqref{1.114} 一致。`}</Details>
        <Tx>{R`**生成泛函。**为高效地得到 $T$ 乘积的矩阵元，定义**生成泛函**（generating functional）$Z[J]$ 很方便。把**外场** $J(t)$（也称**源**，source）以 $x(t)J(t)$ 的形式耦合到 Lagrange 量中，$J(t)$ 定义在区间 $[t_i,t_f]$ 上。定义带源的作用量`}</Tx>
        <Eq n="1.119" say={R`带外源的作用量：在 Lagrange 量中加上源与坐标的耦合 $xJ$。`}>{R`S[x(t),J(t)]=\int_{t_i}^{t_f}\dd t\,[\tfrac12m\dot x^2-V(x)+xJ].`}</Eq>
        <Tx>{R`存在 $J(t)$ 时的跃迁振幅为`}</Tx>
        <Eq n="1.120" say={R`有源时的跃迁振幅：路径积分的权重中多了 $\mathrm{e}^{\mathrm{i}\int xJ}$。`}>{R`\langle x_f,t_f|x_i,t_i\rangle_J=\int\mathcal{D}x\,\exp\left[\mathrm{i}\int_{t_i}^{t_f}\dd t\,(\tfrac12m\dot x^2-V(x)+xJ)\right].`}</Eq>
        <Tx>{R`对 $J(t)$（$t_i<t<t_f$）求泛函导数：`}</Tx>
        <Eq n="1.121" say={R`对源求一次泛函导数，就在路径积分中"拉下"一个因子 $\mathrm{i}x(t)$。`}>{R`\frac{\delta}{\delta J(t)}\langle x_f,t_f|x_i,t_i\rangle_J=\int\mathcal{D}x\,\mathrm{i}x(t)\exp\left[\mathrm{i}\int_{t_i}^{t_f}\dd t\,(\tfrac12m\dot x^2-V(x)+xJ)\right].`}</Eq>
        <Tx>{R`更高阶的泛函导数很容易得到：$\delta/\delta J(t)$ 每作用一次，路径积分的被积函数中就出现一个因子 $\mathrm{i}x(t_k)$。这正是存在源 $J(t)$ 时 Heisenberg 算符 $\hat x(t)$ 的 $T$ 乘积的矩阵元。所以计算的最后令 $J(t)=0$，得`}</Tx>
        <Eq n="1.122" say={R`编时乘积的矩阵元 = 对源求 $n$ 次泛函导数、乘 $(-\mathrm{i})^n$、再令源为零。`}>{R`\langle x_f,t_f|T[x(t_n)\ldots x(t_1)]|x_i,t_i\rangle=(-\mathrm{i})^n\frac{\delta^n}{\delta J(t_1)\ldots\delta J(t_n)}\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S[x(t),J(t)]}\bigg|_{J=0}.`}</Eq>
        <Tx>{R`**基态之间的振幅。**物理应用中常需要的是一般态之间、特别是**基态**之间的跃迁振幅，而不是坐标本征态之间的。设系统在 $t_i$ 处于基态 $|0\rangle$，计算它在稍后的 $t_f$ 仍处于基态的概率幅。设 $J(t)$ 只在区间 $[a,b]\subset[t_i,t_f]$ 上非零（这个假设的理由马上就清楚）。有源时的跃迁振幅可由 Hamilton 量 $H^J=H-x(t)J(t)$ 及其幺正演化算符 $U^J(t_f,t_i)$ 得到。坐标本征态之间的跃迁振幅为`}</Tx>
        <Eq n="1.123" say={R`有源时的演化拆成三段：源打开之前与关闭之后只用无源的 $H$ 演化。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle_J&=\langle x_f|U^J(t_f,t_i)|x_i\rangle\\&=\langle x_f|\mathrm{e}^{-\mathrm{i}H(t_f-b)}U^J(b,a)\mathrm{e}^{-\mathrm{i}H(a-t_i)}|x_i\rangle,\end{aligned}`}</Eq>
        <Tx>{R`这里用了在 $[a,b]$ 之外 $H^J=H$。插入能量本征矢的完备性关系 $\sum_n|n\rangle\langle n|=1$：`}</Tx>
        <Eq n="1.124" say={R`在源打开前后各插入一组能量本征态：每个本征态带一个相位因子 $\mathrm{e}^{-\mathrm{i}E(\ldots)}$。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle_J&=\sum_{m,n}\langle x_f|\mathrm{e}^{-\mathrm{i}H(t_f-b)}|m\rangle\langle m|U^J(b,a)|n\rangle\langle n|\mathrm{e}^{-\mathrm{i}H(a-t_i)}|x_i\rangle\\&=\sum_{m,n}\mathrm{e}^{-\mathrm{i}E_m(t_f-b)}\mathrm{e}^{-\mathrm{i}E_n(a-t_i)}\langle x_f|m\rangle\langle n|x_i\rangle\langle m|U^J(b,a)|n\rangle.\end{aligned}`}</Eq>
        <Tx>{R`现在作 Wick 转动 $t\to-\mathrm{i}\tau$，指数函数变为 $\mathrm{e}^{-\mathrm{i}Et}\to\mathrm{e}^{-E\tau}$。于是极限 $\tau_f\to\infty$、$\tau_i\to-\infty$ 只挑出基态 $m=n=0$（其余各项相对于基态项被 $\mathrm{e}^{-(E_n-E_0)|\tau|}$ 压低）。另一种做法：在 Hamilton 量中加一个小的虚项 $-\mathrm{i}\varepsilon x^2$，使本征值有小的负虚部；于是在 $t_f\to\infty$、$t_i\to-\infty$ 时只有基态在对 $m,n$ 的求和中存活。

总之我们证明了`}</Tx>
        <Eq n="1.125" say={R`时间区间趋于无穷长时，有源振幅只剩基态贡献：两端的基态波函数乘以基态到基态的振幅 $Z[J]$。`}>{R`\lim_{\substack{t_f\to\infty\\t_i\to-\infty}}\langle x_f,t_f|x_i,t_i\rangle_J=\langle x_f|0\rangle\langle0|x_i\rangle Z[J]`}</Eq>
        <Tx>{R`其中定义了**生成泛函**`}</Tx>
        <Eq n="1.126" title="生成泛函" say={R`生成泛函：在源的作用下，系统从遥远过去的基态仍回到遥远未来的基态的振幅。`}>{R`Z[J]=\langle0|U^J(b,a)|0\rangle=\lim_{\substack{t_f\to\infty\\t_i\to-\infty}}\langle0|U^J(t_f,t_i)|0\rangle.`}</Eq>
        <Box kind="note" title={R`关于 \eqref{1.125} 中省去的相位`}>{R`严格地说，\eqref{1.124} 中 $m=n=0$ 项还带有与 $J$ 无关的因子 $\mathrm{e}^{-\mathrm{i}E_0(t_f-b)}\mathrm{e}^{-\mathrm{i}E_0(a-t_i)}$（Wick 转动后为 $\mathrm{e}^{-E_0(\tau_f-b)-E_0(a-\tau_i)}$），\eqref{1.126} 第二个等号也同样要求把 $\langle0|U^J(t_f,t_i)|0\rangle$ 中这个相位去掉（或按 \eqref{1.106} 之前那样移动能量零点）。原书把它省略了；它与 $J$ 无关，最终由 \eqref{1.128} 中的归一化常数 $\mathcal{N}$（要求 $Z[0]=1$）吸收，不影响任何 $T$ 乘积。`}</Box>
        <Tx>{R`生成泛函也可以表示为`}</Tx>
        <Eq n="1.127" say={R`生成泛函 = 有源跃迁振幅除以与源无关的基态波函数因子，在无穷长时间极限下取值。`}>{R`Z[J]=\lim_{\substack{t_f\to\infty\\t_i\to-\infty}}\frac{\langle x_f,t_f|x_i,t_i\rangle_J}{\langle x_f|0\rangle\langle0|x_i\rangle}.`}</Eq>
        <Tx>{R`分母只是与 $J$ 无关的常数。于是得到 $Z[J]$ 的路径积分表示`}</Tx>
        <Eq n="1.128" title="生成泛函的路径积分" say={R`生成泛函的路径积分表示：对任意固定端点的路径求带源作用量的 $\mathrm{e}^{\mathrm{i}S}$，再归一化到 $Z[0]=1$。`}>{R`Z[J]=\mathcal{N}\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S[x,J]}`}</Eq>
        <Tx>{R`其中路径积分取遍端点 $x_i$、$x_f$ 任意固定的路径（无穷长时间后端点的影响只在常数中）。归一化常数 $\mathcal{N}$ 选得使 $Z[0]=1$，即

$$\mathcal{N}^{-1}=\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S[x,0]}.$$

容易证明 $Z[J]$ 生成基态之间的 $T$ 乘积矩阵元（把 \eqref{1.122} 两边除以 $\langle x_f|0\rangle\langle0|x_i\rangle$ 再取极限）：`}</Tx>
        <Eq n="1.129" keyEq title="由生成泛函求关联函数" say={R`基态间的 $n$ 点编时关联函数，就是生成泛函对源的 $n$ 阶泛函导数（乘 $(-\mathrm{i})^n$）在零源处的值。`}>{R`\langle0|T[x(t_1)\cdots x(t_n)]|0\rangle=(-\mathrm{i})^n\frac{\delta^n}{\delta J(t_1)\cdots\delta J(t_n)}Z[J]\bigg|_{J=0}.`}</Eq>
      </Sub>
    </Sec>);
}
