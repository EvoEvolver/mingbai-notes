// §9.5 Inhomogeneities to anisotropies —— 式 (9.45)–(9.75)，图 9.9–9.10
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { VisibilityPlot } from "./_ch09_plots.jsx";

const R = String.raw;

export function Sec95() {
  return (
    <Sec n="9.5" title="Inhomogeneities to anisotropies" zh="从非均匀性到各向异性"
      gist={R`把 Boltzmann 方程写成积分形式（视线积分）：$\Theta_l(\eta_0)=\int d\eta\,S(k,\eta)j_l[k(\eta_0-\eta)]$。可见度函数 $g=-\tau'e^{-\tau}$ 尖锐地集中在复合，于是得到 \eqref{9.59}：今天的 $\Theta_l$ = 单极 $\times j_l$ + 偶极 $\times j_l'$ + ISW。再把天空展开为球谐函数，$a_{lm}$ 的方差 $C(l)=\frac2\pi\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2$。`}
      why={R`复合时的单极与偶极是三维空间中的扰动；我们只能在此时此地观测来自各个方向的光子。这一节完成"三维非均匀性 → 二维各向异性"的翻译，并把理论预言与可观测量 $C(l)$ 连接起来。`}
      gives={["9.45", "9.46", "9.47", "9.48", "9.49", "9.50", "9.51", "9.52", "9.53", "9.54", "9.55", "9.56", "9.57", "9.58", "9.59", "9.60", "9.61", "9.62", "9.63", "9.64", "9.65", "9.66", "9.67", "9.68", "9.69", "9.70", "9.71", "9.72", "9.73", "9.74", "9.75"]}>
      <p className="muted">本节概念：<C id="visibility" /> · <C id="freestream" /> · <C id="cl" /> · <C id="cosmicvar" /></p>
      <Tx>{R`**我们已经有了什么。**现在我们已经很好地掌握了复合时的光子扰动：给定初条件 $\Phi(\boldsymbol k,0)$（或等价地 $\mathcal R(\boldsymbol k)$），我们有 $\Theta_0(\boldsymbol k,\eta_*)$、$\Theta_1(\boldsymbol k,\eta_*)$ 的预言。是时候把这种理解转化为今天各向异性谱的预言了。第一步，在下一小节求出 $\eta_0$ 时的各阶矩 $\Theta_l$；第二步，花些时间把这些矩与可观测量联系起来。下面两个小节的主要目的是推出 \eqref{9.59}——它把今天的矩与复合时的单极、偶极联系起来——以及 \eqref{9.74}——它用这些今天的矩表示 CMB 功率谱。`}</Tx>

      <Sub n="9.5.1" title="Free streaming" zh="自由流">
        <Tx>{R`**形式解。**我们要用复合时的单极与偶极表示今天的光子矩 $\Theta_l(k,\eta_0)$。回到 \eqref{5.67} 可以得到一个形式解。两边减去 $\tau'\Theta$：`}</Tx>
        <Eq n="9.45" say={R`把 Boltzmann 方程中所有不含 $\Theta$ 本身的项挪到右边作为"源"：左边只剩自由流 $ik\mu$ 与散射消光 $-\tau'$。`}>{R`\Theta' + (ik\mu - \tau')\Theta = \hat S`}</Eq>
        <Tx>{R`其中源函数定义为`}</Tx>
        <Eq n="9.46" say={R`源项：势的时间变化（$-\Phi'$）、引力红移（$-ik\mu\Psi$），以及散射把单极、重子 Doppler 速度和偏振结构"注入"光子分布。`}>{R`\hat S \equiv -\Phi' - ik\mu\Psi - \tau'\left[\Theta_0 + \mu u_{\rm b} - \frac12\mathcal P_2(\mu)\Pi\right].`}</Eq>
        <Tx>{R`\eqref{9.45} 的左边可以写成`}</Tx>
        <Eq n="9.47" say={R`积分因子：左边恰好是 $\Theta e^{ik\mu\eta-\tau}$ 的全导数，乘上一个已知因子。`}>{R`\Theta' + (ik\mu - \tau')\Theta = e^{-ik\mu\eta+\tau}\frac{d}{d\eta}\left[\Theta e^{ik\mu\eta-\tau}\right].`}</Eq>
        <Tx>{R`利用它，把 \eqref{9.45} 两边乘以 $e^{ik\mu\eta-\tau}$ 再对 $\eta$ 积分，直接得到`}</Tx>
        <Eq n="9.48" say={R`今天的光子分布 = 初始分布被光深衰减后的残余 + 各时刻的源，各自带着自由流相位 $e^{ik\mu(\eta-\eta_0)}$ 与"逃逸概率" $e^{-\tau}$ 传到今天。`}>{R`\Theta(\eta_0) = \Theta(\eta_{\rm init})e^{ik\mu(\eta_{\rm init}-\eta_0)}e^{-\tau(\eta_{\rm init})} + \int_{\eta_{\rm init}}^{\eta_0}d\eta\,\hat S(\eta)e^{ik\mu(\eta-\eta_0)-\tau(\eta)}`}</Eq>
        <Tx>{R`这里用了 $\tau(\eta_0)=0$，因为 $\tau$ 定义为从今天 $\eta_0$ 往回积的散射光深。我们还知道，若初始时刻 $\eta_{\rm init}$ 足够早，光深 $\tau(\eta_{\rm init})$ 极大，因此 \eqref{9.48} 右边第一项消失——这对应于任何初始各向异性都被 Compton 散射完全抹去。出于同样的理由，可以把积分下限设为零：$\eta<\eta_{\rm init}$ 对被积函数的贡献完全可以忽略。于是各向异性的解为`}</Tx>
        <Eq n="9.49" title="视线积分的形式解" say={R`各向异性 = 沿视线（过去光锥）对源函数的积分：每一时刻的源被 $e^{-\tau}$ 加权（之后还会被散射掉的部分不计），并带着自由流相位。`}>{R`\Theta(k,\mu,\eta_0) = \int_0^{\eta_0}d\eta\,\hat S(k,\mu,\eta)e^{ik\mu(\eta-\eta_0)-\tau(\eta)}.`}</Eq>
        <Tx>{R`**投影到 Legendre 矩。**对光子方向的全部依赖现在都在右边的宗量 $\mu$ 中，所有复杂性都藏在源函数 $\hat S$ 里。暂时忘掉 $\hat S$ 对角度 $\mu$ 的依赖，就可以立刻把 \eqref{9.49} 变成每个 $\Theta_l$ 的方程：两边乘以 Legendre 多项式 $\mathcal P_l(\mu)$ 并对 $\mu$ 积分。由 \eqref{5.66}，左边给出 $(-i)^l\Theta_l$，右边则出现积分`}</Tx>
        <Eq n="9.50" say={R`平面波的 Legendre 投影就是球 Bessel 函数：一个 Fourier 模式在相距 $k|\eta-\eta_0|$ 处看到的第 $l$ 阶多极结构。`}>{R`\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)e^{ik\mu(\eta-\eta_0)} = \frac{1}{(-i)^l}j_l\left[k(\eta-\eta_0)\right]`}</Eq>
        <Tx>{R`其中 $j_l$ 是球 Bessel 函数。这种做法确实会成功，原因之一是 $\hat S$ 对 $\mu$ 的依赖很简单（归根结底是复合前紧耦合的结果）。所以继续求 $\Theta_l$ 的表达式：`}</Tx>
        <Eq n="9.51" say={R`若源不依赖方向：今天的第 $l$ 阶矩是源沿视线积分，并被 $j_l$ 投影。`}>{R`\Theta_l(k,\eta_0) = (-1)^l\int_0^{\eta_0}d\eta\,\hat S(k,\eta)e^{-\tau(\eta)}j_l[k(\eta-\eta_0)] \qquad (\text{no }\mu\text{-dependence}).`}</Eq>
        <Tx>{R`（系数 $(-1)^l=(-i)^{-2l}$：左边的 $(-i)^l$ 与右边的 $1/(-i)^l$ 合并。）

**处理 $\mu$ 依赖：换成导数。**注意到 \eqref{9.49} 中 $\hat S$ 乘的是指数 $e^{ik\mu(\eta-\eta_0)}$，因此在 $\hat S$ 中遇到的每个 $\mu$ 因子都可以换成对时间的导数：`}</Tx>
        <Eq n="9.52" say={R`在被 $e^{ik\mu\eta}$ 乘着的积分里，一个 $\mu$ 等价于对 $\eta$ 求导再除以 $ik$。`}>{R`\mu \to \frac{1}{ik}\frac{d}{d\eta}.`}</Eq>
        <Tx>{R`然后通过分部积分，把每个 $\mu$ 幂次变成作用在被积函数其余部分上的导数算符，这样就能做 Legendre 分解。以 $\hat S$ 中的 $-ik\mu\Psi$ 项为例明确演示，其积分为`}</Tx>
        <Eq n="9.53" say={R`以引力红移项为例：把 $\mu$ 换成导数并分部积分，导数从相位因子转移到 $\Psi e^{-\tau}$ 上，$\mu$ 依赖就消失了。`}>{R`\begin{aligned}-ik\int_0^{\eta_0}d\eta\,\mu\Psi e^{ik\mu(\eta-\eta_0)-\tau(\eta)} &= -\int_0^{\eta_0}d\eta\,\Psi e^{-\tau(\eta)}\frac{d}{d\eta}e^{ik\mu(\eta-\eta_0)}\\ &= \int_0^{\eta_0}d\eta\,e^{ik\mu(\eta-\eta_0)}\frac{d}{d\eta}\left[\Psi e^{-\tau(\eta)}\right]\end{aligned}`}</Eq>
        <Tx>{R`最后一行来自分部积分。注意边界项可以丢掉：在 $\eta=0$ 处它们被因子 $e^{-\tau(0)}$ 置零；在 $\eta=\eta_0$ 处它们并不小，但无关紧要，因为它们没有 $\mu$ 依赖——它们改变的是 CMB 的单极，而单极我们无法探测；换言之，可以把它们吸收进平均 CMB 温度 $T_0$ 的定义。因此，计入分部积分后，替换规则 \eqref{9.52} 要多一个负号，并理解为导数**不**作用在指数的振荡部分 $e^{ik\mu(\eta-\eta_0)}$ 上。于是 \eqref{9.51} 的解变为`}</Tx>
        <Eq n="9.54" keyEq={false} title="视线积分" say={R`今天的多极矩 = 不含方向的有效源 $S$ 沿视线的积分，用 $j_l[k(\eta_0-\eta)]$ 投影到角尺度上。`}>{R`\Theta_l(k,\eta_0) = \int_0^{\eta_0}d\eta\,S(k,\eta)j_l\left[k(\eta_0-\eta)\right]`}</Eq>
        <Tx>{R`其中源函数现在定义为`}</Tx>
        <Eq n="9.55" say={R`有效源：第一项是势变化与散射注入的单极；第二项（全导数）来自引力红移与重子 Doppler 速度；第三项来自偏振结构 $\Pi$。`}>{R`\begin{aligned}S(k,\eta) &\equiv e^{-\tau}\left[-\Phi' - \tau'\left(\Theta_0 + \frac14\Pi\right)\right]\\ &\quad+ \frac{d}{d\eta}\left[e^{-\tau}\left(\Psi - \frac{iu_{\rm b}\tau'}{k}\right)\right] - \frac{3}{4k^2}\frac{d^2}{d\eta^2}\left[e^{-\tau}\tau'\Pi\right].\end{aligned}`}</Eq>
        <Derivation title={R`逐项处理 $\hat S$ 中的 $\mu$ ⇒ \eqref{9.55}`} collapsed steps={[
          { tex: R`-\Phi'-\tau'\Theta_0\ \to\ e^{-\tau}(-\Phi'-\tau'\Theta_0)`, why: R`不含 $\mu$，直接乘 $e^{-\tau}$。` },
          { tex: R`-ik\mu\Psi\ \to\ \frac{d}{d\eta}\big[\Psi e^{-\tau}\big]`, why: R`即 \eqref{9.53}。` },
          { tex: R`-\tau'\mu u_{\rm b}\ \to\ -\frac{1}{ik}\cdot(-1)\frac{d}{d\eta}\big[\tau'u_{\rm b}e^{-\tau}\big]=\frac{d}{d\eta}\Big[e^{-\tau}\Big(-\frac{iu_{\rm b}\tau'}{k}\Big)\Big]`, why: R`$\mu\to-\frac1{ik}\frac d{d\eta}$（含分部积分的负号），$\frac1{i}=-i$。` },
          { tex: R`+\frac{\tau'}2\mathcal P_2\Pi=\frac{\tau'\Pi}{4}(3\mu^2-1)\ \to\ -\frac{\tau'\Pi}{4}e^{-\tau}+\frac34\Big(\frac{1}{ik}\Big)^2\frac{d^2}{d\eta^2}\big[e^{-\tau}\tau'\Pi\big]`, why: R`$\mu^2$ 需两次分部积分，两个负号相消；$(1/ik)^2=-1/k^2$，得 $-\frac{3}{4k^2}\frac{d^2}{d\eta^2}[\cdots]$。` },
        ]} />
        <Tx>{R`在 \eqref{9.54} 中还用了球 Bessel 函数的奇偶性 $j_l(x)=(-1)^lj_l(-x)$。

**可见度函数。**此时引入**可见度函数**（visibility function）很有用：`}</Tx>
        <Eq n="9.56" keyEq title="可见度函数" say={R`可见度函数等于散射率乘以之后不再被散射的概率：光子恰好在 $\eta$ 时刻最后一次散射的概率密度。`}>{R`g(\eta) \equiv -\tau'(\eta)e^{-\tau(\eta)}.`}</Eq>
        <Tx>{R`积分 $\int_0^{\eta_0}d\eta\,g(\eta)=1$（因为 $g=\frac{d}{d\eta}e^{-\tau}$，而 $e^{-\tau}$ 从 0 变到 1），所以可以把它看作概率密度：$g(\eta)$ 是光子在 $\eta$ 时刻最后一次被散射的概率。由于早期 $\tau$ 极大，这一概率在复合之前基本为零；复合之后它也迅速下降，因为前置因子 $-\tau'$（散射率）很小。\figref{9.9} 给出基准宇宙学中的可见度函数。

源函数 \eqref{9.55} 现在可以用可见度函数表示。若丢掉源中的偏振张量 $\Pi$（它很小），源函数变为`}</Tx>
        <Eq n="9.57" say={R`有效源的三部分：在最后散射面（$g$）上的单极 + 引力红移、重子 Doppler 速度，以及沿途势的变化（ISW）。`}>{R`\begin{aligned}S(k,\eta) &\simeq g(\eta)\left[\Theta_0(k,\eta) + \Psi(k,\eta)\right]\\ &\quad+ \frac{i}{k}\frac{d}{d\eta}\left[u_{\rm b}(k,\eta)g(\eta)\right]\\ &\quad+ e^{-\tau}\left[\Psi'(k,\eta) - \Phi'(k,\eta)\right].\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{9.55}（$\Pi=0$）⇒ \eqref{9.57}`} collapsed steps={[
          { tex: R`e^{-\tau}(-\tau')\Theta_0=g\,\Theta_0`, why: R`定义 \eqref{9.56}。` },
          { tex: R`\frac{d}{d\eta}\big[e^{-\tau}\Psi\big]=e^{-\tau}\Psi'-\tau'e^{-\tau}\Psi=e^{-\tau}\Psi'+g\Psi`, why: R`与 $-e^{-\tau}\Phi'$ 合并为 $e^{-\tau}(\Psi'-\Phi')$，并与 $g\Theta_0$ 合并为 $g(\Theta_0+\Psi)$。` },
          { tex: R`\frac{d}{d\eta}\Big[-\frac{iu_{\rm b}}{k}\tau'e^{-\tau}\Big]=\frac{i}{k}\frac{d}{d\eta}\big[u_{\rm b}\,g\big]`, why: R`$-\tau'e^{-\tau}=g$。` },
        ]} />
        <Tx>{R`**完成时间积分。**还可以把解析解再推进一步：在 \eqref{9.54} 中完成时间积分。正比于 $u_{\rm b}$ 的源项最好用分部积分处理。于是`}</Tx>
        <Eq n="9.58" say={R`今天的多极矩分三部分：最后散射面上的单极、Doppler 项（$u_{\rm b}$ 乘以 Bessel 函数的导数），以及沿整条视线的 ISW 积分。`}>{R`\begin{aligned}\Theta_l(k,\eta_0) &= \int_0^{\eta_0}d\eta\,g(\eta)\left[\Theta_0(k,\eta) + \Psi(k,\eta)\right]j_l\left[k(\eta_0-\eta)\right]\\ &\quad- \frac{i}{k}\int_0^{\eta_0}d\eta\,g(\eta)u_{\rm b}(k,\eta)\frac{d}{d\eta}j_l\left[k(\eta_0-\eta)\right]\\ &\quad+ \int_0^{\eta_0}d\eta\,e^{-\tau}\left[\Psi'(k,\eta) - \Phi'(k,\eta)\right]j_l\left[k(\eta_0-\eta)\right].\end{aligned}`}</Eq>
        <Tx>{R`**两类项。**\eqref{9.58} 中有两类项。前两行的积分以可见度函数加权，它们是主导项。最后一行的积分则以 $e^{-\tau}$ 加权，所以只要 $\tau\lesssim1$——即复合之后的所有时刻——被积函数都有贡献。注意，若复合后势为常数（物质主导期正是如此），最后一行的项为零。

**尖锐的可见度函数。**由于可见度函数峰值极其尖锐，前两项的积分变得非常简单。为看清这一点，考虑 \figref{9.9}：它画出 \eqref{9.58} 第一项（"单极"）被积函数的三个部分。可见度函数的变化比另两个函数快得多，所以可以把另两个函数在可见度函数的峰值处（$\eta=\eta_*$）取值、移出积分号。于是积分就是 $\int d\eta\,g(\eta)=1$。剩下`}</Tx>
        <Figure n="9.9" interactive={<VisibilityPlot />}
          caption={R`可见度函数 $g(\eta)$（黑实线）与 \eqref{9.58} 第一行被积函数的另两个部分的比较。可见度函数峰值尖锐，相对于单极 $\Theta_0+\Psi$（任意单位）与 Bessel 函数 $j_l(k[\eta-\eta_0])$ 变化很快。图中 $l=220$、$k=0.02\,\mathrm{Mpc^{-1}}$，对应 CMB 各向异性谱的第一峰。`} />
        <Eq n="9.59" keyEq title="今天的光子多极矩" say={R`今天的第 $l$ 阶矩 = 最后散射面上的（单极+引力红移）乘 $j_l$ + Doppler 项 $3\Theta_1$ 乘 $j_l'$ + 势随时间变化的积分（ISW）。这是 CMB 半解析计算的基石。`}>{R`\begin{aligned}\Theta_l(k,\eta_0) &\simeq \left[\Theta_0(k,\eta_*) + \Psi(k,\eta_*)\right]j_l\left[k(\eta_0-\eta_*)\right]\\ &\quad+ 3\Theta_1(k,\eta_*)\left(j_{l-1}\left[k(\eta_0-\eta_*)\right] - (l+1)\frac{j_l\left[k(\eta_0-\eta_*)\right]}{k(\eta_0-\eta_*)}\right)\\ &\quad+ \int_0^{\eta_0}d\eta\,e^{-\tau}\left[\Psi'(k,\eta) - \Phi'(k,\eta)\right]j_l\left[k(\eta_0-\eta)\right].\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{9.58} 第二行 ⇒ Doppler 项`} collapsed steps={[
          { tex: R`\frac{d}{d\eta}j_l[k(\eta_0-\eta)]=-k\,j_l'[k(\eta_0-\eta)]`, why: R`链式法则。` },
          { tex: R`-\frac ik\int d\eta\,g\,u_{\rm b}(-k)j_l'=i\,u_{\rm b}(\eta_*)\,j_l'=i(-3i\Theta_1)j_l'=3\Theta_1j_l'`, why: R`可见度函数尖锐，$\int g=1$；复合时 $u_{\rm b}\simeq-3i\Theta_1$。` },
          { tex: R`j_l'(x)=j_{l-1}(x)-\frac{l+1}{x}j_l(x)`, why: R`球 Bessel 函数恒等式 \eqref{C.19}。` },
        ]} />
        <Tx>{R`这里用了球 Bessel 函数恒等式 \eqref{C.19} 改写速度项中的 Bessel 函数导数，并用了 $\eta_*$ 时 $u_{\rm b}\simeq-3i\Theta_1$。

**改进阻尼因子。**在比 \figref{9.9} 所示更小的尺度上，由于复合前后阻尼尺度的急剧变化（见 \figref{9.8}），$\Theta_0+\Psi$ 变化得更快。简单地把 $(\Theta_0+\Phi)(k,\eta_*)$ 乘以 $e^{-k^2/k_D^2(\eta_*)}$ 不能准确地反映这一点。对阻尼尺度的快速变化，更好的近似是把乘法因子换成`}</Tx>
        <Eq n="9.60" say={R`阻尼因子按最后散射的概率加权平均：既计入复合期间 $k_D$ 的迅速变化，也计入最后散射面的有限厚度。`}>{R`e^{-k^2/k_D^2(\eta_*)} \to \int d\eta\,g(\eta)e^{-k^2/k_D^2(\eta)}.`}</Eq>
        <Tx>{R`**半解析计算的基础。**\eqref{9.59} 是各向异性谱半解析计算（Seljak 1994；Hu 与 Sugiyama 1995）的基础，其结果与数值解的差别在约 10% 以内。由 \eqref{9.59} 可见，要求今天的各向异性，必须知道复合时的单极（$\Theta_0$）、偶极（$\Theta_1$）与势（$\Psi$）。此外，若势随时间变化，还有修正；这些修正编码在 \eqref{9.59} 的最后一行，称为**积分 Sachs–Wolfe 项**。

**单极项与投影。**\eqref{9.59} 中的单极项正是 \secref{9.1} 粗略论证所预期的。第一，它包含温度各向异性与引力红移的组合 $\Theta_0+\Psi$。第二，球 Bessel 函数 $j_l[k(\eta_0-\eta_*)]$ 决定了一个波数为 $k$ 的平面波对角尺度 $l^{-1}$ 上的各向异性贡献多少。在很小的角尺度上，`}</Tx>
        <Eq n="9.61" say={R`当宗量远小于阶数时，球 Bessel 函数极小（按 $(x/l)^{l}$ 指数式压低）：大波长扰动几乎不贡献到很小的角尺度。`}>{R`j_l(x) \xrightarrow{x/l\to0} \frac1l\left(\frac{x}{l}\right)^{l-1/2}.`}</Eq>
        <Box kind="aside" title="关于 (9.61) 的精确形式">
          <Tx>{R`当 $x<\nu\equiv l+\frac12$ 时，Debye 渐近式（$x=\nu\,\mathrm{sech}\,\alpha$）给出 $j_l(x)\simeq\frac{e^{-\nu(\alpha-\tanh\alpha)}}{2\nu\sqrt{\mathrm{sech}\,\alpha\,\tanh\alpha}}$；在 $x/\nu\to0$ 时 $\alpha\to\ln(2\nu/x)$，于是 $j_l(x)\simeq\frac{1}{2\sqrt{x\nu}}\big(\frac{ex}{2\nu}\big)^{\nu}$（与小宗量级数 $x^l/(2l+1)!!$ 用 Stirling 公式化简的结果一致）。可见 \eqref{9.61} 漏掉了随 $l$ 指数变化的因子 $(e/2)^{l}$，只能看作示意性的写法；但它要表达的要点——$x$ 明显小于 $l$ 时 $j_l(x)$ 按 $x^{l}$ 指数式变小——是对的`}</Tx>
        </Box>
        <Tx>{R`也就是说，当 $x<l$ 时，大 $l$ 的 $j_l(x)$ 极小。在我们的情形中，这意味着 $l>k\eta_0$ 时 $\Theta_l(k,\eta_0)$ 非常接近零。这在物理上是合理的：回到 \figref{9.5}，很小的角尺度上几乎看不到来自大波长扰动的各向异性。反过来也成立：大于 $1/(k\eta_0)$ 的角尺度从这样的扰动得到的贡献也很少（另见 \figref{9.13}）。总之，**波数为 $k$ 的扰动主要贡献到 $l\sim k\eta_0$ 量级的角尺度上**。`}</Tx>
      </Sub>

      <Sub n="9.5.2" title="The angular power spectrum" zh="角功率谱">
        <Tx>{R`**问题。**今天观测到的各向异性图样，与相当抽象的、针对平面波扰动 $\boldsymbol k$ 的 $\Theta_l(k,\eta_0)$ 有什么关系？要回答这个问题，必须先描述今天如何刻画温度场，再把这种刻画与 $\Theta_l$ 联系起来。

回忆在 \eqref{5.2} 中，我们把宇宙中 CMB 辐射场的温度写成`}</Tx>
        <Eq n="9.62" say={R`任一时空点、任一方向上的辐射温度等于平均温度乘以 $(1+\Theta)$。`}>{R`T(\boldsymbol x,\hat{\boldsymbol p},\eta) = T(\eta)\left[1 + \Theta(\boldsymbol x,\hat{\boldsymbol p},\eta)\right].`}</Eq>
        <Tx>{R`这个场在每个时空点都有定义，但我们只能在此地（$\boldsymbol x_0$）此时（$\eta_0$）观测它（脚注：我们确实会离开这个时空点一点点——卫星不在地球上，各向异性测量也进行了 30 年；但与温度变化的尺度——几十 Mpc 与哈勃时间——相比，这些偏离完全可以忽略）。我们对各向异性的唯一把手是它对入射光子方向 $\hat{\boldsymbol p}$ 的依赖：观测到的全部丰富信息都来自温度随方向矢量 $\hat{\boldsymbol p}$ 的变化。观测者通常制作天图，给出许多入射方向（"天空位置"）上的温度。这些位置通常不用 $\hat{\boldsymbol p}$ 的分量 $\hat p_x,\hat p_y,\hat p_z$ 标记，而用极坐标 $\theta,\phi$；但在单位矢量 $\hat{\boldsymbol p}$ 与极坐标之间来回转换很简单，推导中继续使用熟悉的 $\hat{\boldsymbol p}$。

**球谐展开：球面上的 Fourier 变换。**现在把温度扰动按球谐函数展开：`}</Tx>
        <Eq n="9.63" say={R`把天空上的温度图分解为球谐函数：$l$ 越大，对应的角尺度越小；$a_{lm}$ 是各个"球面 Fourier 模式"的振幅。`}>{R`\Theta(\boldsymbol x,\hat{\boldsymbol p},\eta) = \sum_{l=1}^\infty\sum_{m=-l}^{l}a_{lm}(\boldsymbol x,\eta)Y_{lm}(\hat{\boldsymbol p}).`}</Eq>
        <Tx>{R`下标 $l$、$m$ 与实空间的单位矢量 $\hat{\boldsymbol p}$ 共轭，正如变量 $\boldsymbol k$ 与三维位置 $\boldsymbol x$ 共轭。我们已经熟悉 Fourier 变换，所以不妨把球谐展开看作一种二维 Fourier 变换：三维 Fourier 变换的完备本征函数组是 $e^{i\boldsymbol k\cdot\boldsymbol x}$，球面上展开的完备本征函数组则是 $Y_{lm}(\hat{\boldsymbol p})$（附录 C.2）。温度场 $T$ 中的全部信息也包含在依赖于 $(\boldsymbol x,\eta)$ 的振幅 $a_{lm}$ 中。

**信息计数的例子。**考虑一个以 $7^\circ$ 角分辨率测绘全天的实验。全天有 $4\pi$ 球面度 $\simeq41\,000$ 平方度，所以面积为 $(7^\circ)^2$ 的像素有 840 个，这样的实验有 840 个独立的信息。若改用 $a_{lm}$ 而非像素温度来刻画这些信息，就会存在某个 $l_{\max}$，其上没有信息。确定 $l_{\max}$ 的一种方法是令可恢复的 $a_{lm}$ 总数 $\sum_{l=0}^{l_{\max}}(2l+1)=(l_{\max}+1)^2=840$。所以这些信息同样可以由 $l_{\max}=28$ 以内的所有 $a_{lm}$ 刻画。顺便说，这相当贴切地刻画了发现 CMB 各向异性的 COBE 实验（Smoot 等 1992；Bennett 等 1996）：他们给出的温度数据像素要多得多，但这些像素相互重叠，独立信息只包含在 $l\sim30$ 以内的多极矩中。当前一代实验能把多极矩一直测到几千的 $l$；在那里原初 CMB 各向异性已被光子扩散充分阻尼，观测到的辐射由天体物理前景源（以及引力透镜，\secref{13.3}）主导。

**反演。**要把可观测量 $a_{lm}$ 与我们一直处理的温度分布的矩联系起来，可以利用球谐函数的正交性。$Y_{lm}$ 按 \eqref{C.11} 归一化：`}</Tx>
        <Eq n="9.64" say={R`球谐函数在全天积分下正交归一：不同 $(l,m)$ 互不重叠。`}>{R`\int d\Omega\,Y_{lm}(\hat{\boldsymbol p})Y^*_{l'm'}(\hat{\boldsymbol p}) = \delta_{ll'}\delta_{mm'}.`}</Eq>
        <Tx>{R`因此把 \eqref{9.63} 两边乘以 $Y^*_{lm}(\hat{\boldsymbol p})$ 并积分，就可以反演 $\Theta$ 的球谐展开：`}</Tx>
        <Eq n="9.65" say={R`$a_{lm}$ = 把各个 Fourier 模式的光子分布投影到 $Y_{lm}$ 上，再对所有模式求和（带上我们所在位置的相位 $e^{i\boldsymbol k\cdot\boldsymbol x}$）。`}>{R`a_{lm}(\boldsymbol x,\eta) = \int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\boldsymbol x}\int d\Omega\,Y^*_{lm}(\hat{\boldsymbol p})\Theta(\boldsymbol k,\hat{\boldsymbol p},\eta).`}</Eq>
        <Tx>{R`这里把右边写成了 Fourier 变换（$\Theta(\boldsymbol k)$ 而不是 $\Theta(\boldsymbol x)$），因为我们求出的正是它。

**只能预言分布。**与密度扰动一样，我们无法对任何具体的 $a_{lm}$ 作出预言，只能预言它们所服从的分布——一个可追溯到暴胀期间量子涨落的高斯分布。\figref{9.10} 画出了这个高斯分布。$a_{lm}$ 的均值为零，但方差不为零。$a_{lm}$ 的方差称为 $C(l)$。于是`}</Tx>
        <Figure n="9.10" width="60%" caption={R`$a_{lm}$ 所服从的分布：期望值为零、均方根宽度为 $[C(l)]^{1/2}$ 的高斯分布。`} />
        <Eq n="9.66" keyEq title="角功率谱的定义" say={R`$a_{lm}$ 均值为零；不同 $(l,m)$ 互不相关，同一 $l$ 的所有 $m$ 方差相同，记为 $C(l)$——统计各向同性的直接后果。`}>{R`\langle a_{lm}\rangle = 0;\qquad \langle a_{lm}a^*_{l'm'}\rangle = \delta_{ll'}\delta_{mm'}C(l),`}</Eq>
        <Tx>{R`其中 $\langle\cdot\rangle$ 现在表示系综平均，即在无穷大体积中测量的极限结果。

**宇宙方差。**非常重要的一点是：对给定的 $l$，每个 $a_{lm}$ 的方差都相同。例如 $l=100$ 时，全部 201 个 $a_{100,m}$ 来自同一分布。测量这 201 个系数，就是在对该分布抽样；201 个样本能很好地确定分布的方差（\secref{14.1} 会更严格地讨论）。另一方面，若测量四极矩（$l=2$）的五个分量，对其方差 $C(2)$ 的统计精度就差得多。因此，**我们能获得的关于 $C(l)$ 的知识存在根本的不确定性**。这种在低 $l$ 处最显著的不确定性称为**宇宙方差**（cosmic variance）。定量地说，不确定度按样本数平方根的倒数变化。更准确地说，它是用 $2l+1$ 个样本推断 $C(l)$ 时估计量的不确定度（第 14 章详述）：`}</Tx>
        <Eq n="9.67" keyEq title="宇宙方差" say={R`只有一个天空：每个 $l$ 只有 $2l+1$ 个独立样本，$C(l)$ 的估计有不可消除的相对误差 $\sqrt{2/(2l+1)}$（$l=2$ 时 63%，$l=100$ 时 10%）。`}>{R`\left(\frac{\Delta C(l)}{C(l)}\right)_{\text{cosmic variance}} = \sqrt{\frac{2}{2l+1}}.`}</Eq>
        <Derivation title={R`为什么是 $\sqrt{2/(2l+1)}$`} collapsed steps={[
          { tex: R`\hat C(l)=\frac{1}{2l+1}\sum_{m=-l}^{l}|a_{lm}|^2`, why: R`最自然的估计量；$\langle\hat C\rangle=C(l)$。` },
          { tex: R`\mathrm{Var}(\hat C)=\frac{1}{(2l+1)^2}\sum_m\mathrm{Var}(|a_{lm}|^2)=\frac{2C(l)^2}{2l+1}`, why: R`把 $2l+1$ 个实自由度看作独立高斯变量，$x^2$ 的方差为 $2\sigma^4$（卡方分布）。` },
          { tex: R`\frac{\Delta C}{C}=\sqrt{\frac{2}{2l+1}}`, why: R`即 \eqref{9.67}。` },
        ]} />
        <Tx>{R`实际上这一极限从未完全达到：即使仪器观测全天（如卫星实验 COBE、WMAP 和 Planck），银河系平面的强前景辐射也意味着部分天区必须被遮挡。基于天空比例 $f_{\rm sky}$ 的测量，误差棒大约放大 $1/\sqrt{f_{\rm sky}}$ 倍。

**用 $\Theta_l(k)$ 表示 $C(l)$。**现在可以求出用 $\Theta_l(k)$ 表示的 $C(l)$。你也许会担心这里的记号冲突，但我们会看到 $C(l)$ 与 $\Theta_l$ 中的指标 $l$ 确实是同一个。首先把 \eqref{9.65} 中的 $a_{lm}$ 平方并取分布的期望值。为此需要 $\langle\Theta(\boldsymbol k,\hat{\boldsymbol p})\Theta^*(\boldsymbol k',\hat{\boldsymbol p}')\rangle$，此后把 $\eta=\eta_0$ 的依赖隐去。这个期望值较复杂，因为它依赖两种不同的现象：(i) 扰动的初始振幅与相位，在暴胀期间从高斯分布中随机选取；(ii) 本章研究的、把初始扰动变成各向异性的演化。前者是随机变量，后者是确定的：给定扰动振幅与相位的初值，方程唯一地确定其演化。所以把两者分开是合理的：把光子分布写成 $\mathcal R\times(\Theta/\mathcal R)=\mathcal R\times\mathcal T$，其中原初曲率扰动 $\mathcal R$ 依赖于 $\boldsymbol k$ 而不依赖于方向矢量 $\hat{\boldsymbol p}$。比值`}</Tx>
        <Eq n="9.68" say={R`光子转移函数：今天的光子分布除以原初曲率扰动——与随机的初始振幅无关、完全确定的"响应"。`}>{R`\mathcal T(\boldsymbol k,\hat{\boldsymbol p}) \equiv \frac{\Theta(\boldsymbol k,\hat{\boldsymbol p},\eta_0)}{\mathcal R(\boldsymbol k)}`}</Eq>
        <Tx>{R`正是本章所求的：给定一个模式的初始振幅，我们已学会如何向前演化。$\mathcal T(\boldsymbol k,\hat{\boldsymbol p})$ **不**依赖每个模式的初始振幅，也不是随机的，所以可以从分布的平均中移出。因此`}</Tx>
        <Eq n="9.69" say={R`光子分布的两点关联 = 原初曲率扰动的功率谱（只在 $\boldsymbol k=\boldsymbol k'$ 时非零）乘以两个确定的转移函数。`}>{R`\begin{aligned}\langle\Theta(\boldsymbol k,\hat{\boldsymbol p})\Theta(\boldsymbol k',\hat{\boldsymbol p}')\rangle &= \langle\mathcal R(\boldsymbol k)\mathcal R^*(\boldsymbol k')\rangle\,\mathcal T(\boldsymbol k,\hat{\boldsymbol p})\mathcal T^*(\boldsymbol k',\hat{\boldsymbol p}')\\ &= (2\pi)^3\delta^{(3)}_{\rm D}(\boldsymbol k-\boldsymbol k')\,P_{\mathcal R}(k)\,\mathcal T(\boldsymbol k,\hat{\boldsymbol p})\mathcal T^*(\boldsymbol k,\hat{\boldsymbol p}'),\end{aligned}`}</Eq>
        <Tx>{R`第二个等号用了曲率扰动功率谱 $P_{\mathcal R}(k)$ 的定义。（左边原书印作 $\Theta\Theta$，按前文语义应为 $\Theta\Theta^*$。）现在再利用一个专门对我们关注的标量扰动成立的简化：比值（或转移函数）$\mathcal T$ 只通过 $\hat{\boldsymbol p}$ 与 $\hat{\boldsymbol k}$ 的夹角 $\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}$ 依赖于 $\hat{\boldsymbol p}$：`}</Tx>
        <Eq n="9.70" say={R`标量扰动关于波矢方向轴对称：转移函数只依赖光子方向与 $\hat{\boldsymbol k}$ 的夹角。`}>{R`\mathcal T(\boldsymbol k,\hat{\boldsymbol p}) = \mathcal T(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}).`}</Eq>
        <Tx>{R`这有助于下面做角积分。把 \eqref{9.65} 平方后，各向异性谱变为`}</Tx>
        <Eq n="9.71" say={R`$C(l)$ = 对所有 Fourier 模式求和：每个模式的功率乘以它的转移函数在 $Y_{lm}$ 上投影的模方。`}>{R`C(l) = \int\frac{d^3k}{(2\pi)^3}P_{\mathcal R}(k)\int d\Omega\,Y^*_{lm}(\hat{\boldsymbol p})\mathcal T(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})\int d\Omega'\,Y_{lm}(\hat{\boldsymbol p}')\mathcal T^*(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}').`}</Eq>
        <Tx>{R`现在用 \eqref{5.66} 的逆，把 $\mathcal T(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})$ 与 $\mathcal T(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}')$ 展开为 Legendre 多项式：`}</Tx>
        <Eq n="9.72" say={R`把转移函数按 Legendre 多项式展开，系数就是今天的多极矩 $\mathcal T_l=\Theta_l/\mathcal R$。`}>{R`\mathcal T(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}) = \sum_l(-i)^l(2l+1)\mathcal P_l(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})\mathcal T_l(k).`}</Eq>
        <Tx>{R`所以 $\mathcal T_l(k)=\Theta_l(k,\eta_0)/\mathcal R(\boldsymbol k)$。于是`}</Tx>
        <Eq n="9.73" say={R`代入 Legendre 展开：$C(l)$ 化为一对角积分，每个都把 Legendre 多项式投影到 $Y_{lm}$ 上。`}>{R`\begin{aligned}C(l) &= \int\frac{d^3k}{(2\pi)^3}P_{\mathcal R}(k)\sum_{l'l''}(-i)^{l'}(i)^{l''}(2l'+1)(2l''+1)\mathcal T_{l'}(k)\mathcal T^*_{l''}(k)\\ &\quad\times\int d\Omega\,\mathcal P_{l'}(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})Y^*_{lm}(\hat{\boldsymbol p})\int d\Omega'\,\mathcal P_{l''}(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}')Y_{lm}(\hat{\boldsymbol p}').\end{aligned}`}</Eq>
        <Tx>{R`这里的两个角积分（\exref{9.9}）是相同的。只有当 $l'=l$、$l''=l$ 时它们才不为零，此时分别等于 $4\pi Y_{lm}(\hat{\boldsymbol k})/(2l+1)$ 的复共轭与它本身。对 $\boldsymbol k$ 积分中的角向部分 $d\Omega$ 于是变成 $|Y_{lm}|^2$ 的积分，正好等于 1，剩下`}</Tx>
        <Eq n="9.74" keyEq title="角功率谱" say={R`$C(l)$ 等于原初功率乘以第 $l$ 阶转移函数的模方，对所有波数积分：每个 $l$ 收集了所有 $k$ 模式在该角尺度上的贡献。`}>{R`C(l) = \frac{2}{\pi}\int_0^\infty dk\,k^2P_{\mathcal R}(k)\left|\mathcal T_l(k)\right|^2.`}</Eq>
        <Derivation title={R`\eqref{9.73} ⇒ \eqref{9.74}`} collapsed steps={[
          { tex: R`\int d\Omega\,\mathcal P_{l'}(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})Y^*_{lm}(\hat{\boldsymbol p})=\frac{4\pi}{2l+1}Y^*_{lm}(\hat{\boldsymbol k})\delta_{ll'}`, why: R`\eqref{9.90}（加法定理 \eqref{C.12} + 正交性）。` },
          { tex: R`C(l)=\int\frac{k^2dk\,d\Omega_k}{(2\pi)^3}P_{\mathcal R}(-i)^l(i)^l(2l+1)^2|\mathcal T_l|^2\Big(\frac{4\pi}{2l+1}\Big)^2|Y_{lm}(\hat{\boldsymbol k})|^2`, why: R`只剩 $l'=l''=l$；$(-i)^l(i)^l=1$。` },
          { tex: R`=\frac{16\pi^2}{8\pi^3}\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2=\frac2\pi\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2`, why: R`$\int d\Omega_k|Y_{lm}|^2=1$。结果与 $m$ 无关——统计各向同性。` },
        ]} />
        <Tx>{R`于是对给定的 $l$，方差 $C(l)$ 是对所有 Fourier 模式的 $\Theta_l(\boldsymbol k)$ 方差的积分，后者等于 $|\mathcal T_l(k)|^2$ 乘以曲率扰动的方差。用 \eqref{9.59} 与 \eqref{9.74} 就可以计算今天的各向异性谱。

**一个例子：把阻尼放进紧耦合解。**作为例子，可以把紧耦合解 \eqref{9.26} 改写为`}</Tx>
        <Eq n="9.75" say={R`以原初曲率扰动为单位的复合前单极：势的直接贡献 + 余弦振荡 + 势驱动的声波积分，整体再乘上扩散阻尼因子。`}>{R`\Theta_0(\boldsymbol k,\eta) = \mathcal R(\boldsymbol k)\left[-\frac23\frac{\Phi(\boldsymbol k,\eta)}{\Phi(\boldsymbol k,0)} + \cos(kr_s) + \frac43\frac{k}{\sqrt3}\int_0^\eta d\tilde\eta\frac{\Phi(\boldsymbol k,\tilde\eta)}{\Phi(\boldsymbol k,0)}\sin[k(r_s(\eta)-r_s(\tilde\eta))]\right]e^{-k^2/k_D^2(\eta)}.`}</Eq>
        <Derivation title={R`\eqref{9.26} ⇒ \eqref{9.75}`} collapsed steps={[
          { tex: R`\Theta_0(0)+\Phi(0)=\tfrac12\Phi(0)+\Phi(0)=\tfrac32\Phi(0)=\mathcal R`, why: R`绝热初条件与 $\Phi(0)=\frac23\mathcal R$。` },
          { tex: R`\Phi-\Psi=2\Phi=\tfrac43\mathcal R\,\frac{\Phi}{\Phi(0)},\qquad -\Phi=-\tfrac23\mathcal R\,\frac{\Phi}{\Phi(0)}`, why: R`$\Psi=-\Phi$；把 \eqref{9.26} 左边的 $\Phi$ 移到右边。` },
          { tex: R`\Theta_0=\mathcal R\Big[-\tfrac23\tfrac{\Phi}{\Phi(0)}+\cos(kr_s)+\tfrac43\tfrac{k}{\sqrt3}\int d\tilde\eta\,\tfrac{\Phi}{\Phi(0)}\sin[\cdots]\Big]`, why: R`再乘以 $e^{-k^2/k_D^2}$（\eqref{9.41}）即 \eqref{9.75}。` },
        ]} />
        <Tx>{R`末尾的指数因子计入阻尼。偶极 \eqref{9.28} 的处理完全类似。然后把这些表达式代入用自由流把各向异性向前演化的 \eqref{9.59}，就得到 $\mathcal T_l(k)=\Theta_l(k,\eta_0)/\mathcal R(\boldsymbol k)$。`}</Tx>
      </Sub>
    </Sec>);
}
