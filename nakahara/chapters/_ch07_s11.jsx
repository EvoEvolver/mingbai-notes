import { WorldsheetRedraw } from "./_redraw_ch06_08.jsx";
// §7.11 玻色弦理论 —— 式 (7.230)–(7.243)，习题 7.26–7.29，图 7.9
import { Sec, Sub, Tx, Eq, Box, Figure, Exercise, C } from "@kit";

const R = String.raw;

export function Sec711() {
  return (
    <Sec n="7.11" title="Bosonic string theory" zh="玻色弦理论"
      gist={R`点粒子的作用量 = 世界线长度，可改写成含辅助"一维度规"的二次形式 → 弦的 Nambu 作用量 = 世界面面积 → 等价的二次形式：Polyakov 作用量 $-\frac1{4\pi\alpha'}\int\sqrt{-g}g^{\alpha\beta}\partial_\alpha X\cdot\partial_\beta X$ → 对 $g_{\alpha\beta}$ 变分得 $T_{\alpha\beta}=0$，$g$ 与诱导度规共形，回到 Nambu → 对称性：重参数化、Weyl 重标度（只在二维存在）、Poincaré → 共形规范 $g_{\alpha\beta}=\eta_{\alpha\beta}$，$X^\mu$ 满足波动方程。`}
      why={R`这是本章几何工具（度规、诱导度规、体积元、等温坐标、Weyl 重标度）的一次"总演习"，也为第 14 章的弦量子化做准备：世界面上的二维 Riemann 几何决定了弦论的一切。`}
      gives={["7.230", "7.231", "7.232", "7.233", "7.234b", "7.236", "7.237a", "7.237b", "7.238", "7.239", "7.241", "7.242"]}>
      <p className="muted">本节概念：<C id="polyakov" /></p>
      <Tx>{R`量子场论（QFT）有时被称为粒子物理，因为它处理粒子的动力学。只要所涉及的高能过程的典型能量远小于 Planck 能量（$\sim10^{19}\,\mathrm{GeV}$），这种看法没有问题。然而一旦试图在这个框架中量子化引力，就会遇到无法逾越的障碍：我们不知道怎样重整化引力 QFT 中无处不在的紫外发散。20 世纪 80 年代初，人们试图引入超对称来构造自洽的引力理论。尽管有部分改善，所得的超引力仍不能完全驯服紫外行为。

20 世纪 60 年代末至 70 年代初，对偶共振模型作为强子的候选模型被广泛研究。在这个模型中，粒子被称为**弦**（strings）的一维对象代替。不幸的是，这个理论含有快子（虚质量粒子）与自旋 2 的粒子，而且只在 26 维时空中自洽！由于这些困难，理论被放弃，让位于量子色动力学（QCD）。然而少数人注意到，这个理论必然包含引力子，并认为它可能是量子引力理论的候选者。

如今超对称已被纳入弦论，形成**超弦理论**，它没有快子，在十维时空中自洽。有几个自洽超弦理论的候选者。有时有人提出，完全的数学自洽性将挑出唯一的"万物理论"（TOE）。

本书在最后一章研究玻色弦理论的初等方面，也研究一些与超弦有关的数学工具。经典的综述是 Scherk（1975）。第 14 章给出更多文献。`}</Tx>
      <Figure illustration={<WorldsheetRedraw />} n="7.9" caption={R`开弦 (a) 与闭弦 (b) 的轨迹。图中也画出了固定参数 $\tau_0$ 的截面。`} width="100%" />
      <Sub n="7.11.1" title="The string action" zh="弦的作用量">
        <Tx>{R`$D$ 维 Minkowski 时空中粒子的轨迹由 $D$ 个函数 $X^\mu(\tau)$（$1\le\mu\le D$）给出，$\tau$ 是轨迹的参数。弦是一维对象，其位形由两个数 $(\sigma,\tau)$ 参数化，$\sigma$ 类空、$\tau$ 类时。它在 $D$ 维 Minkowski 时空中的位置由 $X^\mu(\sigma,\tau)$ 给出，见\figref{7.9}。参数 $\sigma$ 可以归一化为 $\sigma\in[0,\pi]$。弦可以是开的或闭的。我们要找支配弦动力学的作用量。

先注意相对论性粒子的作用量是**世界线**的**长度**：`}</Tx>
        <Eq n="7.230" title="点粒子作用量" say={R`相对论性自由粒子的作用量正比于世界线的本征长度（本征时间）。`}>{R`S\equiv m\int_{s_{\rm i}}^{s_{\rm f}}\dd s=m\int_{\tau_{\rm i}}^{\tau_{\rm f}}\dd\tau\,(-\dot X^\mu\dot X_\mu)^{1/2}`}</Eq>
        <Tx>{R`其中 $\dot X^\mu\equiv\dd X^\mu/\dd\tau$。（常见约定在前面加负号，$S=-m\int\dd s$，使非相对论极限给出 $+\frac12mv^2$；这里与 \eqref{7.231} 的符号彼此一致，见习题 7.26。）对某些目的，采用另一个表达式更方便：`}</Tx>
        <Eq n="7.231" title="带辅助度规的粒子作用量" say={R`引入世界线上的"一维度规" $g=g_{\tau\tau}$：作用量对 $X$ 变成二次的，且 $m=0$ 时仍有意义。`}>{R`S=-\tfrac12\int\dd\tau\sqrt g(g^{-1}\dot X^\mu\dot X_\mu-m^2)`}</Eq>
        <Tx>{R`其中辅助变量 $g\equiv g_{\tau\tau}$ 被看作度规。`}</Tx>
        <Exercise n="7.26" title="消去辅助度规" level="★★"
          hint={R`$g$ 的方程是代数方程（$g$ 没有导数）。`}
          solution={R`拉氏量 $L=-\frac12(g^{-1/2}\dot X^\mu\dot X_\mu-g^{1/2}m^2)$。

**对 $X^\mu$：**$\frac{\dd}{\dd\tau}\big(g^{-1/2}\dot X_\mu\big)=0$——若选 $\tau$ 使 $g$ 为常数，就是自由运动 $\ddot X^\mu=0$。

**对 $g$：**$\frac{\partial L}{\partial g}=-\frac12\Big(-\frac12g^{-3/2}\dot X^2-\frac12g^{-1/2}m^2\Big)=\frac14g^{-3/2}(\dot X^2+gm^2)=0$，所以

$$g=-\frac{\dot X^\mu\dot X_\mu}{m^2}\qquad(\text{类时世界线 }\dot X^2<0\text{，故 }g>0).$$

**代回：**$\sqrt g=\sqrt{-\dot X^2}/m$，

$$L=-\frac12\Big(\frac{m\dot X^2}{\sqrt{-\dot X^2}}-m\sqrt{-\dot X^2}\Big)=-\frac12\big(-m\sqrt{-\dot X^2}-m\sqrt{-\dot X^2}\big)=m\sqrt{-\dot X^\mu\dot X_\mu},$$

即 \eqref{7.230}。$g$ 的方程说明 $g$ 就是世界线上的诱导度规 $\dot X^2$ 除以 $-m^2$（一维的"诱导度规"），这是 \eqref{7.238} 的一维版本。$X$ 的运动方程 $\frac{\dd}{\dd\tau}(\dot X_\mu/\sqrt{-\dot X^2})=0$ 与 \eqref{7.230} 直接变分的结果相同。`}>
          {R`写出 \eqref{7.231} 的 Euler–Lagrange 方程。用运动方程从 \eqref{7.231} 中消去 $g$，重现 \eqref{7.230}。`}
        </Exercise>
        <Tx>{R`\eqref{7.231} 比 \eqref{7.230} 好在哪里？首先，\eqref{7.231} 在 $m^2=0$ 时仍有意义，而 \eqref{7.230} 此时为零。其次，\eqref{7.231} 对 $X$ 是二次的，而 \eqref{7.230} 对 $X$ 的依赖相当复杂（平方根）。

Nambu（1970）提出一个描述弦的作用量，它正比于**世界面**（world sheet，弦的轨迹扫出的曲面）的**面积**。显然这是粒子世界线长度的推广。他提出 **Nambu 作用量**`}</Tx>
        <Eq n="7.232" title="Nambu 作用量" say={R`Nambu 作用量：世界面在时空中的面积，即诱导度规行列式的平方根的积分。`}>{R`S=-\frac1{2\pi\alpha'}\int_0^\pi\dd\sigma\int_{\tau_{\rm i}}^{\tau_{\rm f}}\dd\tau\,[-\det(\partial_\alpha X^\mu\partial_\beta X_\mu)]^{1/2}`}</Eq>
        <Tx>{R`其中 $\xi^0=\tau$、$\xi^1=\sigma$，$\partial_\alpha X^\mu\equiv\partial X^\mu/\partial\xi^\alpha$。参数 $\tau_{\rm i}$（$\tau_{\rm f}$）是 $\tau$ 的初（末）值，$\alpha'$ 是对应于弦张力倒数的参数（Regge 斜率）。（$h_{\alpha\beta}\equiv\partial_\alpha X^\mu\partial_\beta X_\mu$ 正是 \eqref{7.5} 意义下的诱导度规；对类时世界面 $\det h<0$。）`}</Tx>
        <Exercise n="7.27" title={R`$\alpha'$ 的量纲`} level="★"
          hint={R`$X^\mu$ 有长度量纲；无量纲的作用量意味着 $\hbar=c=1$。`}
          solution={R`$\sigma,\tau$ 无量纲，$\partial_\alpha X^\mu$ 的量纲与 $X^\mu$ 相同，为［长度］。$h_{\alpha\beta}=\partial_\alpha X^\mu\partial_\beta X_\mu$ 的量纲为［长度］$^2$，$2\times2$ 行列式为［长度］$^4$，其平方根为［长度］$^2$。积分 $\int\dd\sigma\dd\tau$ 无量纲。要使 $S$ 无量纲，$\frac1{2\pi\alpha'}\times$［长度］$^2$ 必须无量纲，故 $[\alpha']=$［长度］$^2$。恢复 $\hbar$、$c$：弦张力 $T=1/(2\pi\alpha'\hbar c)$ 的量纲是［能量/长度］，$\sqrt{\alpha'}$ 是"弦长"标度，Regge 轨迹 $J=\alpha'M^2$。`}>
          {R`要求作用量 $S$ 无量纲，且取 $\sigma$ 与 $\tau$ 无量纲。证明 $\alpha'$ 的量纲是［长度］$^2$。`}
        </Exercise>
        <Tx>{R`尽管这个作用量给出很好的几何图像，但它对 $X$ 不是二次的，量子化相当困难。仿照点粒子的情形，我们寻找一个更容易量子化的等价作用量。弦的二次作用量称为 **Polyakov 作用量**（Polyakov 1981）：`}</Tx>
        <Eq n="7.233" keyEq title="Polyakov 作用量" say={R`Polyakov 作用量：在世界面上引入独立的二维度规 $g_{\alpha\beta}$，作用量就是 $D$ 个"无质量标量场" $X^\mu$ 在这个二维弯曲空间中的动能。`}>{R`S=-\frac1{4\pi\alpha'}\int_0^\pi\dd\sigma\int_{\tau_{\rm i}}^{\tau_{\rm f}}\dd\tau\sqrt{-g}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu`}</Eq>
        <Tx>{R`其中 $g=\det g_{\alpha\beta}$，$g^{\alpha\beta}=(g^{-1})^{\alpha\beta}$。若弦是开的，轨迹是一张片；若是闭的，轨迹是一根管，见\figref{7.9}。下面将证明消去 $g$ 后作用量 \eqref{7.233} 与 \eqref{7.232} 一致。但要注意这只在拉氏量的层次成立，不保证在量子层次仍成立。已经证明，基于这两个拉氏量的量子理论只在 $D=26$ 时一致。作用量 \eqref{7.233} 在下列变换下不变：

(i) 世界面的局部重参数化`}</Tx>
        <Eq n="7.234a" say={R`世界面坐标可以任意重选：作用量是几何的，与参数化无关。`}>{R`\tau\to\tau'(\tau,\sigma)\qquad\sigma\to\sigma'(\tau,\sigma)`}</Eq>
        <Tx>{R`(ii) Weyl 重标度`}</Tx>
        <Eq n="7.234b" title="Weyl 不变性" say={R`世界面度规可以逐点任意缩放而作用量不变——只在二维成立，是弦论的核心对称性。`}>{R`g_{\alpha\beta}\to g'_{\alpha\beta}\equiv\mathrm{e}^{\phi(\sigma,\tau)}g_{\alpha\beta}`}</Eq>
        <Tx>{R`(iii) 整体 Poincaré 不变性`}</Tx>
        <Eq n="7.234c" say={R`目标时空的 Poincaré 对称性：对世界面而言是整体（常数）变换。`}>{R`X^\mu\to X^{\mu\prime}\equiv\Lambda^\mu{}_\nu X^\nu+a^\mu\qquad\Lambda\in\mathrm{SO}(D-1,1)\qquad a\in\R^D.`}</Eq>
        <Tx>{R`这些对称性将在下面讨论。`}</Tx>
        <Exercise n="7.28" title="共形规范下的运动方程" level="★★"
          hint={R`用 (i) 的两个函数自由度把 $g_{\alpha\beta}$ 化为 $\mathrm{e}^{2\sigma}\eta_{\alpha\beta}$（等温坐标，例 7.9），再用 (ii) 消去 $\mathrm{e}^{2\sigma}$。然后在 \eqref{7.237a} 中代入 $g_{\alpha\beta}=\eta_{\alpha\beta}$。`}
          solution={R`**规范固定。**二维度规有三个分量。由例 7.9（Lorentz 情形 \eqref{7.119}），通过重参数化 (i)（两个任意函数）可以局部地选取等温坐标，使 $g_{\alpha\beta}=\mathrm{e}^{2\sigma}\eta_{\alpha\beta}$；再用 Weyl 重标度 (ii)（一个任意函数）去掉 $\mathrm{e}^{2\sigma}$，得 $g_{\alpha\beta}=\eta_{\alpha\beta}$。（这正是 §7.11.2 末尾的计数 $3=2+1$。原书题面说"利用对称性 (i) 与 (iii)"，实际需要的是 (i) 与 (ii)：整体 Poincaré 变换 (iii) 作用在 $X^\mu$ 上，不改变世界面度规。）

**运动方程。**对 $X^\mu$ 变分 \eqref{7.233}：$\delta S=-\frac1{2\pi\alpha'}\int\sqrt{-g}g^{\alpha\beta}\partial_\alpha\delta X^\mu\partial_\beta X_\mu$，分部积分得 \eqref{7.237a}：$\partial_\alpha(\sqrt{-g}g^{\alpha\beta}\partial_\beta X_\mu)=0$（即 $X^\mu$ 满足世界面上的 Laplace–Beltrami 方程，参看 \eqref{7.188}）。代入 $g=\eta$（$\sqrt{-g}=1$）：

$$\eta^{\alpha\beta}\partial_\alpha\partial_\beta X^\mu=-\partial_\tau^2X^\mu+\partial_\sigma^2X^\mu=0,$$

即 \eqref{7.235}：一维波动方程，通解为左行波与右行波之和 $X^\mu=X^\mu_L(\tau+\sigma)+X^\mu_R(\tau-\sigma)$。注意 $g$ 的运动方程 \eqref{7.237b} 在规范固定后变成约束（Virasoro 约束）：$\dot X\cdot X'=0$，$\dot X^2+X'^2=0$。`}>
          {R`利用对称性 (i) 与 (ii)［原书作 (i) 与 (iii)，见解答］，总可以选 $g_{\alpha\beta}$ 为 $g_{\alpha\beta}=\eta_{\alpha\beta}$ 的形式。写出 $X^\mu$ 的运动方程，证明它满足方程`}
        </Exercise>
        <Eq n="7.235" say={R`共形规范下，弦的每个坐标都满足二维波动方程。`}>{R`\eta^{\alpha\beta}\partial_\alpha\partial_\beta X^\mu=0.`}</Eq>
      </Sub>

      <Sub n="7.11.2" title="Symmetries of the Polyakov strings" zh="Polyakov 弦的对称性">
        <Tx>{R`玻色弦理论定义在二维 Lorentz 流形 $(M,g)$ 上。嵌入 $f:M\to\R^D$ 由 $\xi^\alpha\mapsto X^\mu$ 定义，$\{\xi^\alpha\}=(\tau,\sigma)$ 是 $M$ 的局部坐标。为简单起见，假定物理时空是 Minkowski 的 $(\R^D,\eta)$。**Polyakov 作用量**`}</Tx>
        <Eq n="7.236" say={R`去掉常数因子的 Polyakov 作用量：$X^\mu$ 是二维流形到 $D$ 维 Minkowski 空间的映射。`}>{R`S=-\tfrac12\int\dd^2\xi\sqrt{-g}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X^\nu\eta_{\mu\nu}`}</Eq>
        <Tx>{R`在坐标重参数化 $\mathrm{Diff}(M)$ 下不变，因为体积元 $\sqrt{-g}\dd^2\xi$ 不变，而 $g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu$ 是标量。

现在可以推导运动方程。变分参数是**嵌入** $X^\mu$ 与几何 $g_{\alpha\beta}$。在变分 $\delta X^\mu$ 下得到 Euler–Lagrange 方程`}</Tx>
        <Eq n="7.237a" title="弦的运动方程" say={R`$X^\mu$ 的运动方程：每个坐标都是世界面上的调和函数（世界面上的 Laplace–Beltrami 方程）。`}>{R`\partial_\alpha(\sqrt{-g}g^{\alpha\beta}\partial_\beta X_\mu)=0.`}</Eq>
        <Tx>{R`在变分 $\delta g_{\alpha\beta}$ 下，$S$ 的被积函数改变为

$$\begin{aligned}\delta(\sqrt{-g}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu)&=\delta\sqrt{-g}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu+\sqrt{-g}\delta g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu\\&=-\tfrac12\sqrt{-g}g_{\gamma\delta}\delta g^{\gamma\delta}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu+\sqrt{-g}\delta g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu\end{aligned}$$

这里用了\sref{P7.2}（$\delta\sqrt{-g}=-\frac12\sqrt{-g}g_{\gamma\delta}\delta g^{\gamma\delta}$，由 \eqref{7.203}、\eqref{7.204}）。由于它对任意变分 $\delta g_{\alpha\beta}$ 都应为零，必须有`}</Tx>
        <Eq n="7.237b" title="世界面能动张量为零" say={R`世界面度规的运动方程：世界面上的能动张量为零（无迹且等于零）——$g$ 只能与诱导度规成比例。`}>{R`T_{\alpha\beta}=\partial_\alpha X^\mu\partial_\beta X_\mu-\tfrac12g_{\alpha\beta}(g^{\gamma\delta}\partial_\gamma X^\mu\partial_\delta X_\mu)=0.`}</Eq>
        <Tx>{R`解出 $g_{\alpha\beta}$（$h_{\alpha\beta}\equiv\partial_\alpha X^\mu\partial_\beta X^\nu\eta_{\mu\nu}=\frac12g_{\alpha\beta}(g^{\gamma\delta}h_{\gamma\delta})$，即 $h_{\alpha\beta}$ 与 $g_{\alpha\beta}$ 成比例），在 Weyl 重标度的自由下可取`}</Tx>
        <Eq n="7.238" say={R`世界面度规（在 Weyl 重标度意义下）就是嵌入诱导的度规。`}>{R`g_{\alpha\beta}=\partial_\alpha X^\mu\partial_\beta X^\nu\eta_{\mu\nu}`}</Eq>
        <Tx>{R`这说明诱导度规（右边）与 $g_{\alpha\beta}$ 一致。（严格说，\eqref{7.237b} 只决定 $g_{\alpha\beta}=\mathrm{e}^{\phi}h_{\alpha\beta}$；由于 \eqref{7.234b}，作用量与因子 $\mathrm{e}^\phi$ 无关，所以可以取 $\phi=0$。）把 \eqref{7.238} 代入 \eqref{7.236} 消去 $g_{\alpha\beta}$（二维中 $g^{\alpha\beta}h_{\alpha\beta}=2$），就回到 Nambu 作用量`}</Tx>
        <Eq n="7.239" say={R`把诱导度规代回 Polyakov 作用量，得到世界面面积——Nambu 作用量。`}>{R`S=-\int\dd^2\xi\sqrt{-\det(\partial_\alpha X^\mu\partial_\beta X_\mu)}.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.239} 的系数（p.325）`}>{R`原书印作 $S=-\frac12\int\dd^2\xi\sqrt{-\det(\partial_\alpha X^\mu\partial_\beta X_\mu)}$。代入 \eqref{7.238} 后 $\sqrt{-g}g^{\alpha\beta}h_{\alpha\beta}=\sqrt{-h}\,\delta^\alpha{}_\alpha=2\sqrt{-h}$，所以 $-\frac12\times2=-1$，系数应为 $-1$。这与 \eqref{7.233}（系数 $-\frac1{4\pi\alpha'}$）化为 \eqref{7.232}（系数 $-\frac1{2\pi\alpha'}$）时系数加倍一致。正文已改正。`}</Box>
        <Tx>{R`由构造，作用量 $S$ 在 $M$ 的局部重参数化 $\{\xi^\alpha\}\to\{\xi'^\alpha(\xi)\}$ 下不变。此外它还有别的不变性。在 $D$ 维时空中的整体 **Poincaré 变换**`}</Tx>
        <Eq n="7.240" say={R`目标空间的 Poincaré 变换。`}>{R`X^\mu\to X'^\mu\equiv\Lambda^\mu{}_\nu X^\nu+a^\mu`}</Eq>
        <Tx>{R`下，作用量 $S$ 变为

$$\begin{aligned}S&\to-\tfrac12\int\dd^2\xi\sqrt{-g}g^{\alpha\beta}\partial_\alpha(\Lambda^\mu{}_\kappa X^\kappa+a^\mu)\partial_\beta(\Lambda^\nu{}_\lambda X^\lambda+a^\nu)\eta_{\mu\nu}\\&=-\tfrac12\int\dd^2\xi\sqrt{-g}g^{\alpha\beta}\partial_\alpha X^\kappa\partial_\beta X^\lambda(\Lambda^\mu{}_\kappa\Lambda^\nu{}_\lambda\eta_{\mu\nu}).\end{aligned}$$

由 $\Lambda^\mu{}_\kappa\Lambda^\nu{}_\lambda\eta_{\mu\nu}=\eta_{\kappa\lambda}$，$S$ 在整体 Poincaré 变换下不变。作用量 $S$ 在 **Weyl 重标度** $g_{\alpha\beta}(\tau,\sigma)\to\mathrm{e}^{2\sigma(\tau,\sigma)}g_{\alpha\beta}(\tau,\sigma)$（保持 $(\tau,\sigma)$ 不变）下也不变。（这里的函数 $\sigma(\tau,\sigma)$ 是共形因子，不要与世界面坐标 $\sigma$ 混淆——原书沿用了同一字母。）事实上 $S$ 变为

$$S\to-\tfrac12\int\dd^2\xi\sqrt{-\mathrm{e}^{4\sigma}g}\,\mathrm{e}^{-2\sigma}g^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X^\nu\eta_{\mu\nu}$$

因而不变。（$m$ 维中 $\sqrt{-g}\to\mathrm{e}^{m\sigma}\sqrt{-g}$、$g^{\alpha\beta}\to\mathrm{e}^{-2\sigma}g^{\alpha\beta}$，只有 $m=2$ 时两者抵消。）注意 Weyl 重标度不变性只在 $M$ 是二维时存在，这使弦在膜等其他延展对象中显得突出。

由于 $\dim M=2$，总可以用等温坐标（例 7.9）参数化世界面，使`}</Tx>
        <Eq n="7.241" say={R`二维度规局部总是共形平坦的：等温坐标。`}>{R`g_{\alpha\beta}=\mathrm{e}^{2\sigma(\tau,\sigma)}\eta_{\alpha\beta}.`}</Eq>
        <Tx>{R`于是 Weyl 重标度不变性允许我们在世界面上选取标准度规 $\eta_{\alpha\beta}$。度规 $g_{\alpha\beta}$ 有三个独立分量，而重参数化有两个自由度，Weyl 标度不变性有一个。所以只要处理的是弦，就可以选取标准度规 $\eta_{\alpha\beta}$。

对 Polyakov 弦的分析到此为止。第 14 章将以最优雅的方式把 Polyakov 弦量子化。`}</Tx>
        <Exercise n="7.29" title="调和映射" level="★★★"
          hint={R`对 $\phi^\alpha\to\phi^\alpha+\delta\phi^\alpha$ 变分，注意 $h_{\alpha\beta}(\phi)$ 依赖 $\phi$。分部积分后乘 $h^{\gamma\alpha}$，用 \eqref{7.53} 识别出 $N$ 上的 Christoffel 符号。`}
          solution={R`记 $G_{\alpha\beta}=h_{\alpha\beta}$。变分

$$\delta S=\int\dd^mx\sqrt g\,g^{\mu\nu}\Big[h_{\alpha\beta}\partial_\mu\delta\phi^\alpha\partial_\nu\phi^\beta+\tfrac12\partial_\gamma h_{\alpha\beta}\,\delta\phi^\gamma\,\partial_\mu\phi^\alpha\partial_\nu\phi^\beta\Big]$$

（第一项用了 $g^{\mu\nu}$ 与 $h_{\alpha\beta}$ 的对称性合并两项）。对第一项分部积分（边界项为零）：

$$\delta S=\int\dd^mx\,\delta\phi^\gamma\Big[-\partial_\mu(\sqrt gg^{\mu\nu}h_{\gamma\beta}\partial_\nu\phi^\beta)+\tfrac12\sqrt gg^{\mu\nu}\partial_\gamma h_{\alpha\beta}\partial_\mu\phi^\alpha\partial_\nu\phi^\beta\Big].$$

展开 $\partial_\mu(h_{\gamma\beta}\ldots)=h_{\gamma\beta}\partial_\mu(\ldots)+\partial_\alpha h_{\gamma\beta}\,\partial_\mu\phi^\alpha(\ldots)$，并把 $\partial_\alpha h_{\gamma\beta}\partial_\mu\phi^\alpha\partial_\nu\phi^\beta g^{\mu\nu}$ 对称化为 $\frac12(\partial_\alpha h_{\gamma\beta}+\partial_\beta h_{\gamma\alpha})\ldots$。令 $\delta S=0$，除以 $\sqrt g$：

$$h_{\gamma\beta}\frac1{\sqrt g}\partial_\mu(\sqrt gg^{\mu\nu}\partial_\nu\phi^\beta)+\frac12(\partial_\alpha h_{\gamma\beta}+\partial_\beta h_{\gamma\alpha}-\partial_\gamma h_{\alpha\beta})\partial_\mu\phi^\alpha\partial_\nu\phi^\beta g^{\mu\nu}=0.$$

乘 $h^{\delta\gamma}$，第二项的系数正是 $N$ 上的 Christoffel 符号 $\Gamma^\delta{}_{\alpha\beta}(\phi)$（\eqref{7.53}），得

$$\frac1{\sqrt g}\partial_\mu[\sqrt gg^{\mu\nu}\partial_\nu\phi^\delta]+\Gamma^\delta{}_{\alpha\beta}(\phi)\partial_\mu\phi^\alpha\partial_\nu\phi^\beta g^{\mu\nu}=0,$$

即 \eqref{7.242}（改正指标后）。特例：$M=\R$（一维，$g=1$）时它就是 $N$ 上的测地线方程 \eqref{7.19b}——测地线是一维的调和映射；$N=\R^D$ 平直时它化为 $X^\mu$ 的 Laplace 方程 \eqref{7.237a}——Polyakov 弦是二维世界面到时空的调和映射（物理中称为非线性 $\sigma$ 模型）。`}>
          {R`设 $(M,g)$ 与 $(N,h)$ 是 Riemann 流形。取 $M$ 的一张卡 $U$，其中度规取形式 $g=g_{\mu\nu}(x)\dd x^\mu\otimes\dd x^\nu$；取 $N$ 的一张卡 $V$，其上 $h$ 取形式 $h=G_{\alpha\beta}(\phi)\dd\phi^\alpha\otimes\dd\phi^\beta$。由 $x\mapsto\phi(x)$ 定义的映射 $\phi:M\to N$ 若满足`}
        </Exercise>
        <Eq n="7.242" title="调和映射方程" say={R`调和映射方程：$M$ 上的 Laplace 算子作用在 $\phi$ 上，加上目标空间 $N$ 的 Christoffel 修正——测地线方程的高维推广。`}>{R`\frac1{\sqrt g}\partial_\mu[\sqrt gg^{\mu\nu}\partial_\nu\phi^\alpha]+\Gamma^\alpha{}_{\beta\gamma}\partial_\mu\phi^\beta\partial_\nu\phi^\gamma g^{\mu\nu}=0`}</Eq>
        <Tx>{R`就称为**调和映射**（harmonic map）。证明这个方程可以由作用量`}</Tx>
        <Eq n="7.243" say={R`调和映射的作用量（Dirichlet 能量）：$\phi$ 的"梯度平方"用两边的度规量出来再积分。`}>{R`S\equiv\tfrac12\int\dd^mx\sqrt gg^{\mu\nu}\partial_\mu\phi^\alpha\partial_\nu\phi^\beta h_{\alpha\beta}(\phi)`}</Eq>
        <Tx>{R`对 $\phi$ 变分得到。调和映射在物理中的应用见 Misner（1978）与 Sánchez（1988）。数学方面的综述见 Eells 与 Lemaire（1968）。`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{7.242} 第二项的指标（p.326）`}>{R`原书印作 $\Gamma^\alpha{}_{\beta\gamma}\partial_\mu\phi^\alpha\partial_\nu\phi^\beta g^{\mu\nu}$：自由指标 $\alpha$ 出现了两次，而 $\gamma$ 没有被缩并。由变分（习题 7.29 的解答）应为 $\Gamma^\alpha{}_{\beta\gamma}(\phi)\partial_\mu\phi^\beta\partial_\nu\phi^\gamma g^{\mu\nu}$，$\Gamma$ 是 $N$ 的度规 $h_{\alpha\beta}$（题中也记作 $G_{\alpha\beta}$）的 Christoffel 符号。正文已改正。`}</Box>
      </Sub>
    </Sec>);
}
