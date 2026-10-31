// §1.4 谐振子 —— 式 (1.130)–(1.165)，习题 1.5
import { Sec, Sub, Tx, Eq, Box, Derivation, Exercise, C } from "@kit";
import { PropagatorLab } from "./_ch01_demos.jsx";

const R = String.raw;

export function Sec14() {
  return (
    <Sec n="1.4" title="Harmonic oscillator" zh="谐振子的路径积分"
      gist={R`作用量是二次的，所以围绕经典轨道展开在二阶就**精确**截断：$\langle x_f|x_i\rangle=A\,\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}$，前因子由涨落的 Gauss 积分给出 $\big(m\omega/2\pi\mathrm{i}\sin\omega T\big)^{1/2}$。再用两种方法算配分函数 $1/(2\sinh(\beta\omega/2))$：直接取迹，或用函数行列式与 $\zeta$ 函数正规化（$\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2)=2\beta$），顺便"证明"了 $\sinh$ 的无穷乘积公式。`}
      why={R`谐振子是能把路径积分算到底的少数例子，所有"发散"的因子（Jacobi 行列式 $J_N$、无穷乘积）在这里都能看到如何相互抵消。函数行列式与 $\zeta$ 函数正规化是后面反常（第 13 章）与弦论（第 14 章）中计算行列式的标准工具。`}
      gives={["1.135", "1.138", "1.148", "1.149", "1.150", "1.154", "1.159", "1.162", "1.165"]}>
      <Tx>{R`本节对谐振子做路径积分量子化——这是路径积分能精确算出的系统之一。我们还将引入 **$\zeta$ 函数正规化**（zeta function regularization），它在理论物理的许多领域都是有用的工具。`}</Tx>

      <Sub n="1.4.1" title="Transition amplitude" zh="跃迁振幅">
        <p className="muted">本小节概念：<C id="path_integral" /> · <C id="oscillator" /></p>
        <Tx>{R`一维谐振子的 Lagrange 量为`}</Tx>
        <Eq n="1.130" say={R`谐振子的 Lagrange 量（用角频率 $\omega$ 写势能）。`}>{R`L=\tfrac12m\dot x^2-\tfrac12m\omega^2x^2.`}</Eq>
        <Tx>{R`跃迁振幅为`}</Tx>
        <Eq n="1.131" say={R`谐振子的跃迁振幅写成路径积分。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S[x(t)]},`}</Eq>
        <Tx>{R`其中 $S[x(t)]=\int_{t_i}^{t_f}L\,\dd t$ 是作用量。**策略：围绕极值展开。**把 $S[x]$ 在它的极值 $x_{\rm c}(t)$ 附近展开，$x_{\rm c}$ 满足`}</Tx>
        <Eq n="1.132" say={R`经典轨道是作用量的稳定点。`}>{R`\left.\frac{\delta S[x]}{\delta x}\right|_{x=x_{\rm c}(t)}=0.`}</Eq>
        <Tx>{R`显然 $x_{\rm c}(t)$ 就是连接 $(x_i,t_i)$ 与 $(x_f,t_f)$ 的经典路径，满足 Euler–Lagrange 方程`}</Tx>
        <Eq n="1.133" say={R`谐振子的经典运动方程。`}>{R`\ddot x_{\rm c}+\omega^2x_{\rm c}=0.`}</Eq>
        <Tx>{R`满足 $x_{\rm c}(t_i)=x_i$、$x_{\rm c}(t_f)=x_f$ 的解很容易求得：`}</Tx>
        <Eq n="1.134" say={R`端点固定的经典轨道：两个正弦函数的组合，分别在 $t_i$、$t_f$ 处为零，系数由端点定出。`}>{R`x_{\rm c}(t)=\frac{1}{\sin\omega T}[x_f\sin\omega(t-t_i)+x_i\sin\omega(t_f-t)]`}</Eq>
        <Tx>{R`其中 $T=t_f-t_i$（要求 $\sin\omega T\neq0$）。把这个解代入作用量，得到（原书留作习题）`}</Tx>
        <Eq n="1.135" title="谐振子的经典作用量" say={R`经典轨道上的作用量：端点的二次型，系数由 $\cot\omega T$ 与 $1/\sin\omega T$ 给出。`}>{R`S_{\rm c}\equiv S[x_{\rm c}]=\frac{m\omega}{2\sin\omega T}[(x_f^2+x_i^2)\cos\omega T-2x_fx_i].`}</Eq>
        <Derivation title={R`推导 \eqref{1.135}`} collapsed steps={[
          { tex: R`S[x_{\rm c}]=\frac m2\int_{t_i}^{t_f}(\dot x_{\rm c}^2-\omega^2x_{\rm c}^2)\dd t=\frac m2\big[x_{\rm c}\dot x_{\rm c}\big]_{t_i}^{t_f}-\frac m2\int x_{\rm c}(\ddot x_{\rm c}+\omega^2x_{\rm c})\dd t`, why: R`对动能项分部积分。` },
          { tex: R`S[x_{\rm c}]=\frac m2\big[x_f\dot x_{\rm c}(t_f)-x_i\dot x_{\rm c}(t_i)\big]`, why: R`经典轨道满足 \eqref{1.133}，积分项为零。` },
          { tex: R`\dot x_{\rm c}(t_f)=\frac{\omega}{\sin\omega T}(x_f\cos\omega T-x_i),\qquad\dot x_{\rm c}(t_i)=\frac{\omega}{\sin\omega T}(x_f-x_i\cos\omega T)`, why: R`对 \eqref{1.134} 求导。` },
          { tex: R`S[x_{\rm c}]=\frac{m\omega}{2\sin\omega T}\big[x_f^2\cos\omega T-x_fx_i-x_ix_f+x_i^2\cos\omega T\big]`, why: "代入整理即得 (1.135)。" },
        ]} />
        <Tx>{R`**二阶展开是精确的。**$S[x]$ 在 $x=x_{\rm c}$ 附近的展开为`}</Tx>
        <Eq n="1.136" say={R`围绕经典轨道的泛函 Taylor 展开：一阶项因稳定性消失，二次作用量没有三阶以上的项，所以这里没有省略任何东西。`}>{R`S[x_{\rm c}+y]=S[x_{\rm c}]+\frac{1}{2!}\int\dd t_1\dd t_2\,y(t_1)y(t_2)\left.\frac{\delta^2S[x]}{\delta x(t_1)\delta x(t_2)}\right|_{x=x_{\rm c}}`}</Eq>
        <Tx>{R`其中 $y(t)$ 满足边界条件 $y(t_i)=y(t_f)=0$。注意：(1) 一阶项消失，因为在 $x=x_{\rm c}$ 处 $\delta S[x]/\delta x=0$；(2) 三阶及更高阶的项不存在，因为作用量是 $x$ 的二次式。因此这个展开是**精确**的，问题可以精确求解。

利用

$$\frac{\delta}{\delta x(t_1)}\int_{t_i}^{t_f}\dd t\left[\frac12m\dot x(t)^2-\frac12m\omega^2x(t)^2\right]=-m\frac{\dd^2}{\dd t_1^2}x(t_1)-m\omega^2x(t_1)=-m\left(\frac{\dd^2}{\dd t_1^2}+\omega^2\right)x(t_1)$$

以及 $\delta x(t_1)/\delta x(t_2)=\delta(t_1-t_2)$，得到二阶泛函导数`}</Tx>
        <Eq n="1.137" say={R`作用量的二阶泛函导数是一个微分算符 $-m(\dd^2/\dd t^2+\omega^2)$ 的核：涨落"感受"到的就是这个算符。`}>{R`\frac{\delta^2S[x]}{\delta x(t_1)\delta x(t_2)}=-m\left(\frac{\dd^2}{\dd t_1^2}+\omega^2\right)\delta(t_1-t_2).`}</Eq>
        <Tx>{R`代入 \eqref{1.136}：`}</Tx>
        <Eq n="1.138" title="涨落作用量" say={R`作用量 = 经典作用量 + 涨落 $y$ 自己的谐振子作用量（端点为零）：经典部分与涨落部分完全分离。`}>{R`\begin{aligned}S[x_{\rm c}+y]&=S[x_{\rm c}]-\frac{m}{2!}\int\dd t_1\dd t_2\,y(t_1)y(t_2)\left(\frac{\dd^2}{\dd t_1^2}+\omega^2\right)\delta(t_1-t_2)\\&=S[x_{\rm c}]+\frac m2\int\dd t\,(\dot y^2-\omega^2y^2),\end{aligned}`}</Eq>
        <Tx>{R`这里用了边界条件 $y(t_i)=y(t_f)=0$（分部积分时边界项为零）。由于 $\mathcal{D}x$ 是平移不变的（对所有满足 $x(t_i)=x_i$、$x(t_f)=x_f$ 的路径 $x(t)$ 积分，等价于对所有满足 $y(t_i)=y(t_f)=0$ 的路径 $y(t)$ 积分，$x=x_{\rm c}+y$），可以把 $\mathcal{D}x$ 换成 $\mathcal{D}y$：`}</Tx>
        <Eq n="1.139" say={R`跃迁振幅 = 经典相位 $\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}$ 乘以与端点无关的涨落积分。`}>{R`\langle x_f,t_f|x_i,t_i\rangle=\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\int_{y(t_i)=y(t_f)=0}\mathcal{D}y\,\mathrm{e}^{\mathrm{i}\frac m2\int_{t_i}^{t_f}\dd t\,(\dot y^2-\omega^2y^2)}.`}</Eq>
        <Tx>{R`**计算涨落部分。**把时间平移使 $t_i$ 变成 $t=0$，计算`}</Tx>
        <Eq n="1.140" say={R`涨落积分：只依赖于时间长度 $T$，不依赖于端点位置。`}>{R`I_f=\int_{y(0)=y(T)=0}\mathcal{D}y\,\mathrm{e}^{\mathrm{i}\frac m2\int_0^T\dd t\,(\dot y^2-\omega^2y^2)}`}</Eq>
        <Tx>{R`按边界条件把 $y(t)$ 展开为正弦级数：`}</Tx>
        <Eq n="1.141" say={R`端点为零的涨落按正弦模式展开：每个模式是一个独立的"振子"。`}>{R`y(t)=\sum_{n\in\mathbb{N}}a_n\sin\frac{n\pi t}{T}`}</Eq>
        <Tx>{R`代入指数中的积分，由正弦函数的正交性得

$$\int_0^T\dd t\,(\dot y^2-\omega^2y^2)=\frac T2\sum_{n\in\mathbb{N}}a_n^2\left[\left(\frac{n\pi}{T}\right)^2-\omega^2\right].$$

（交互图 1 正是这个式子对单个模式的数值验证：系数 $\tfrac T4[(n\pi/T)^2-\omega^2]$ 在 $T=\pi/\omega$ 时第一次变号。）

从 $y(t)$ 到 $\{a_n\}$ 的 Fourier 变换可以看作积分变量的替换。要使这个变换良定义，变量个数必须相同。设时间切片数为 $N+1$（含 $t=0$ 与 $t=T$），独立的 $y_k$ 有 $N-1$ 个，相应地对 $n>N-1$ 必须令 $a_n=0$。这个变量替换的 Jacobi 行列式为`}</Tx>
        <Eq n="1.142" say={R`从各时刻的位置到 Fourier 系数的变量替换的 Jacobi 行列式：正弦函数在格点上的取值组成的矩阵的行列式。`}>{R`J_N=\det\frac{\partial y_k}{\partial a_n}=\det\left[\sin\left(\frac{n\pi t_k}{T}\right)\right]`}</Eq>
        <Tx>{R`$t_k$ 是把 $[0,T]$ 分成 $N$ 个无穷小步时的第 $k$ 个时刻。

**用自由粒子定出 $J_N$。**变换 $\{y_k\}\to\{a_n\}$ 与势无关，所以 Jacobi 行列式对谐振子和自由粒子相同；而自由粒子的振幅已由 \eqref{1.104} 求得：`}</Tx>
        <Eq n="1.143" say={R`自由粒子的振幅（\eqref{1.104}）：用它来"校准"测度。`}>{R`\langle x_f,T|x_i,0\rangle=\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}\exp\left[\mathrm{i}\frac{m}{2T}(x_f-x_i)^2\right]=\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}.`}</Eq>
        <Tx>{R`写成路径积分是`}</Tx>
        <Eq n="1.144" say={R`同一个自由粒子振幅的路径积分写法：经典相位乘以 $\omega=0$ 的涨落积分。`}>{R`\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\int_{y(0)=y(T)=0}\mathcal{D}y\,\mathrm{e}^{\mathrm{i}\frac m2\int_0^T\dd t\,\dot y^2}.`}</Eq>
        <Tx>{R`比较两式，并注意 $\dfrac m2\int_0^T\dd t\,\dot y^2\to m\sum_{n=1}^N\dfrac{a_n^2n^2\pi^2}{4T}$，得到等式

$$\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}=\int_{y(0)=y(T)=0}\mathcal{D}y\,\mathrm{e}^{\mathrm{i}\frac m2\int_0^T\dd t\,\dot y^2}=\lim_{N\to\infty}J_N\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{N/2}\int\dd a_1\ldots\dd a_{N-1}\exp\left(\mathrm{i}m\sum_{n=1}^{N-1}\frac{a_n^2\pi^2n^2}{4T}\right).$$

做完 Gauss 积分（每个 $\int\dd a_n\,\mathrm{e}^{\mathrm{i}ma_n^2\pi^2n^2/4T}=\tfrac1n(4\pi\mathrm{i}T/m\pi^2)^{1/2}$，\sref{L1.2}）：

$$\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}=\lim_{N\to\infty}J_N\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{N/2}\prod_{n=1}^{N-1}\frac1n\left(\frac{4\pi\mathrm{i}T}{m\pi^2}\right)^{1/2}=\lim_{N\to\infty}J_N\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{N/2}\frac{1}{(N-1)!}\left(\frac{4\pi\mathrm{i}T}{m\pi^2}\right)^{(N-1)/2},$$

由此（$\varepsilon=T/N$）对**有限** $N$ 得到`}</Tx>
        <Eq n="1.145" say={R`Jacobi 行列式的显式值：与 $m$、$T$ 都无关，$N\to\infty$ 时发散——但它只以与其他发散因子的组合出现。`}>{R`J_N=N^{-N/2}2^{-(N-1)/2}\pi^{N-1}(N-1)!.`}</Eq>
        <Derivation title={R`验证 \eqref{1.145} 中 $m$、$T$ 全部相消`} collapsed steps={[
          { tex: R`J_N=\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}\left(\frac{2\pi\mathrm{i}T}{mN}\right)^{N/2}(N-1)!\left(\frac{m\pi^2}{4\pi\mathrm{i}T}\right)^{(N-1)/2}`, why: "由上式解出。" },
          { tex: R`\left(\frac{\mathrm{i}T}{m}\right)^{-\frac12+\frac N2-\frac{N-1}2}=\left(\frac{\mathrm{i}T}{m}\right)^0=1`, why: R`$\mathrm{i}T/m$ 的幂次相消。` },
          { tex: R`(2\pi)^{-\frac12+\frac N2}\left(\frac\pi4\right)^{\frac{N-1}2}N^{-\frac N2}=2^{-\frac{N-1}2}\pi^{N-1}N^{-\frac N2}`, why: R`$2$ 的幂：$\tfrac{N-1}{2}-(N-1)$；$\pi$ 的幂：$\tfrac{N-1}2+\tfrac{N-1}2$。` },
        ]} />
        <Tx>{R`$J_N$ 在 $N\to\infty$ 时显然发散。但这完全无关紧要：我们关心的不是 $J_N$ 本身，而是它与其他（同样发散的）因子的组合。

**谐振子的振幅。**现在谐振子的跃迁振幅为`}</Tx>
        <Eq n="1.146" say={R`谐振子振幅：同一个 Jacobi 行列式，Gauss 积分中每个模式的系数多了 $-\omega^2$。`}>{R`\langle x_f,T|x_i,0\rangle=\lim_{N\to\infty}J_N\left(\frac{m}{2\pi\mathrm{i}\varepsilon}\right)^{N/2}\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\times\int\dd a_1\ldots\dd a_{N-1}\exp\left[\mathrm{i}\frac{mT}{4}\sum_{n=1}^{N-1}a_n^2\left\{\left(\frac{n\pi}{T}\right)^2-\omega^2\right\}\right].`}</Eq>
        <Tx>{R`对 $a_n$ 的积分是简单的 Gauss 积分（$n\pi/T>\omega$ 时用 \sref{L1.2}）：

$$\int\dd a_n\exp\left[\frac{\mathrm{i}mT}{4}a_n^2\left\{\left(\frac{n\pi}{T}\right)^2-\omega^2\right\}\right]=\left(\frac{4\mathrm{i}T}{m\pi n^2}\right)^{1/2}\left[1-\left(\frac{\omega T}{n\pi}\right)^2\right]^{-1/2}.$$

代入 \eqref{1.146}：`}</Tx>
        <Eq n="1.147" say={R`发散因子与自由粒子完全相同，相消后只剩自由粒子的前因子乘一个收敛的无穷乘积。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle&=\lim_{N\to\infty}J_N\left(\frac{mN}{2\pi\mathrm{i}T}\right)^{N/2}\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\times\prod_{k=1}^{N-1}\left[\frac1k\left(\frac{4\mathrm{i}T}{m\pi}\right)^{1/2}\right]\prod_{n=1}^{N-1}\left[1-\left(\frac{\omega T}{n\pi}\right)^2\right]^{-1/2}\\&=\left(\frac{m}{2\pi\mathrm{i}T}\right)^{1/2}\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\prod_{n=1}^{N-1}\left[1-\left(\frac{\omega T}{n\pi}\right)^2\right]^{-1/2}.\end{aligned}`}</Eq>
        <Tx>{R`对 $n$ 的无穷乘积是熟知的（$\sin$ 的 Euler 乘积公式）：`}</Tx>
        <Eq n="1.148" say={R`$\sin$ 的无穷乘积：$\sin z$ 的零点恰在 $z=n\pi$。`}>{R`\lim_{N\to\infty}\prod_{n=1}^{N}\left[1-\left(\frac{\omega T}{n\pi}\right)^2\right]=\frac{\sin\omega T}{\omega T}`}</Eq>
        <Tx>{R`注意 $J_N$ 的发散与其他项的发散相消，给出有限值。最终我们证明了`}</Tx>
        <Eq n="1.149" keyEq title="谐振子传播子" say={R`谐振子传播子（Mehler 核）：前因子 $\sqrt{m\omega/2\pi\mathrm{i}\sin\omega T}$ 乘以经典作用量的相位；$\omega\to0$ 回到自由粒子 \eqref{1.104}。`}>{R`\begin{aligned}\langle x_f,t_f|x_i,t_i\rangle&=\left(\frac{m\omega}{2\pi\mathrm{i}\sin\omega T}\right)^{1/2}\mathrm{e}^{\mathrm{i}S[x_{\rm c}]}\\&=\left(\frac{m\omega}{2\pi\mathrm{i}\sin\omega T}\right)^{1/2}\exp\left[\frac{\mathrm{i}m\omega}{2\sin\omega T}\{(x_f^2+x_i^2)\cos\omega T-2x_ix_f\}\right].\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：§1.4.1 中丢失的质量 $m$`}>{R`原书在 \eqref{1.143}–\eqref{1.149} 的前因子中实际取了 $m=1$（例如 \eqref{1.143} 写作 $(1/2\pi\mathrm{i}T)^{1/2}\exp[\mathrm{i}\tfrac{m}{2T}(x_f-x_i)^2]$，\eqref{1.149} 写作 $(\omega/2\pi\mathrm{i}\sin\omega T)^{1/2}\exp[\tfrac{\mathrm{i}\omega}{2\sin\omega T}\{\cdots\}]$），却在指数与 \eqref{1.135} 中保留 $m$，前后不一致。本站全部恢复 $m$：前因子为 $(m/2\pi\mathrm{i}T)^{1/2}$ 与 $(m\omega/2\pi\mathrm{i}\sin\omega T)^{1/2}$，\eqref{1.149} 的指数为 $\mathrm{i}m\omega/2\sin\omega T$——这样 \eqref{1.149} 的两行才与 \eqref{1.135} 一致，$\omega\to0$ 时才回到 \eqref{1.101}。$J_N$（\eqref{1.145}）与 $m$ 无关，原式不变。`}</Box>
        <Tx>{R`**检验。**(i) $\omega\to0$：$\sin\omega T\to\omega T$，$\cos\omega T\to1$，\eqref{1.149} 回到自由粒子 \eqref{1.101}。(ii) 它是 $A\mathrm{e}^{\mathrm{i}S_{\rm cl}}$ 型（\eqref{1.105}），前因子 $A$ 只依赖 $T$。(iii) $\omega T=\pi$ 时前因子发散：从同一点出发的所有经典轨道在半周期后重新汇聚（焦点）。这里的推导要求 $0<\omega T<\pi$；越过焦点时 $[1-(\omega T/n\pi)^2]^{-1/2}$ 中有负数开方，振幅多出一个相位 $\mathrm{e}^{-\mathrm{i}\pi/2}$（Maslov 指数）。`}</Tx>
      </Sub>

      <Sub n="1.4.2" title="Partition function" zh="配分函数">
        <p className="muted">本小节概念：<C id="euclid" /> · <C id="zeta_reg" /></p>
        <Tx>{R`谐振子的配分函数很容易由本征值 $E_n=(n+1/2)\omega$ 求出：`}</Tx>
        <Eq n="1.150" title="谐振子配分函数" say={R`谐振子的配分函数：几何级数求和，得到 $1/(2\sinh(\beta\omega/2))$；低温时由基态能 $\tfrac12\omega$ 主导。`}>{R`\Tr\,\mathrm{e}^{-\beta\hat H}=\sum_{n=0}^{\infty}\mathrm{e}^{-\beta(n+1/2)\omega}=\frac{1}{2\sinh(\beta\omega/2)}.`}</Eq>
        <Tx>{R`令 $\mathrm{i}T=\beta$，逆温度 $\beta$ 就可以看作虚时间，于是可以从路径积分的观点计算配分函数。

**方法 1：**在 $\{|x\rangle\}$ 上取迹。由 \eqref{1.149}（$T=-\mathrm{i}\beta$，$\sin\omega T=-\mathrm{i}\sinh\beta\omega$，$\cos\omega T=\cosh\beta\omega$）：`}</Tx>
        <Eq n="1.151" say={R`在位置基中取迹：把热核的对角元对 $x$ 做 Gauss 积分，质量 $m$ 相消，结果与 \eqref{1.150} 相同。`}>{R`\begin{aligned}Z(\beta)&=\int\dd x\,\langle x|\mathrm{e}^{-\beta\hat H}|x\rangle\\&=\left(\frac{m\omega}{2\pi\mathrm{i}(-\mathrm{i}\sinh\beta\omega)}\right)^{1/2}\times\int\dd x\,\exp\mathrm{i}\left[\frac{m\omega}{-2\mathrm{i}\sinh\beta\omega}(2x^2\cosh\beta\omega-2x^2)\right]\\&=\left(\frac{m\omega}{2\pi\sinh\beta\omega}\right)^{1/2}\left[\frac{\pi}{m\omega\tanh(\beta\omega/2)}\right]^{1/2}\\&=\frac{1}{2\sinh(\beta\omega/2)}\end{aligned}`}</Eq>
        <Tx>{R`（用了 $(\cosh\beta\omega-1)/\sinh\beta\omega=\tanh(\beta\omega/2)$ 与 $\sinh\beta\omega\tanh(\beta\omega/2)=2\sinh^2(\beta\omega/2)$。原书此处取 $m=1$；如上所见 $m$ 本来就相消。）

下面的交互图把这一切在浏览器里"切片"实算：把 $\beta$ 切成 $N$ 段，每段用 \eqref{1.92}，逐个做 Gauss 积分，看 $K_N$ 怎样收敛到 \eqref{1.149} 的 Wick 转动（热核）以及 $Z_N$ 怎样收敛到 \eqref{1.150}。`}</Tx>
        <PropagatorLab />
        <Tx>{R`下面的习题是方法 2 的准备。`}</Tx>
        <Exercise n="1.5" title="多维 Gauss 积分" level="★"
          hint={R`(1) 实对称矩阵可以用正交矩阵 $O$ 对角化，$x=Oy$ 的 Jacobi 行列式为 1，积分分解为 $n$ 个一维 Gauss 积分。(2) Hermite 矩阵用幺正矩阵对角化；对每个复变量 $\int\dd z\dd\bar z\,\mathrm{e}^{-\lambda|z|^2}=\pi/\lambda$（测度取 $\dd z\dd\bar z\equiv\dd(\mathrm{Re}\,z)\,\dd(\mathrm{Im}\,z)$）。`}
          solution={R`**(1)** 设 $A=O^{\rm t}\Lambda O$，$O$ 正交，$\Lambda=\mathrm{diag}(\lambda_1,\ldots,\lambda_n)$，$\lambda_i>0$。令 $y=Ox$，$|\det O|=1$ 故 $\dd^nx=\dd^ny$，$\sum x_iA_{ij}x_j=\sum_i\lambda_iy_i^2$。于是

$$\int\dd^nx\,\mathrm{e}^{-x^{\rm t}Ax}=\prod_i\int\dd y_i\,\mathrm{e}^{-\lambda_iy_i^2}=\prod_i\sqrt{\frac{\pi}{\lambda_i}}=\pi^{n/2}(\det A)^{-1/2}.$$

**(2)** 设 $A=U^\dagger\Lambda U$，$U$ 幺正，$w=Uz$。幺正变换保持 $\mathbb{C}^n\cong\mathbb{R}^{2n}$ 上的体积（作为实线性映射，其行列式为 $|\det U|^2=1$），所以 $\prod\dd z_i\dd\bar z_i=\prod\dd w_i\dd\bar w_i$，$\bar z^{\rm t}Az=\sum_i\lambda_i|w_i|^2$。每个因子：$w=u+\mathrm{i}v$，

$$\int\dd u\,\dd v\,\mathrm{e}^{-\lambda(u^2+v^2)}=\frac{\pi}{\lambda}.$$

所以积分等于 $\prod_i\pi/\lambda_i=\pi^n(\det A)^{-1}$。

**注**：若把测度理解为 $\dd z\,\dd\bar z=2\mathrm{i}\,\dd u\,\dd v$（形式微分的楔积），结果会多出 $(2\mathrm{i})^n$；原书采用的是上面的约定。与实情形相比，复 Gauss 积分给出 $(\det A)^{-1}$ 而不是 $(\det A)^{-1/2}$——每个复变量相当于两个实变量。§1.5 的 Grassmann 积分则给出 $(\det A)^{+1}$。`}>
          <Tx>{R`(1) 设 $A$ 是对称正定的 $n\times n$ 矩阵。证明`}</Tx>
          <Eq n="1.152" title="实 Gauss 积分" say={R`多维实 Gauss 积分等于 $\pi^{n/2}$ 除以矩阵行列式的平方根：对角化后就是 $n$ 个一维积分之积。`}>{R`\int\dd x_1\ldots\dd x_n\exp\left(-\sum_{i,j}x_iA_{ij}x_j\right)=\pi^{n/2}(\det A)^{-1/2}=\pi^{n/2}\prod_i\lambda_i^{-1/2}`}</Eq>
          <Tx>{R`其中 $\lambda_i$ 是 $A$ 的本征值。

(2) 设 $A$ 是正定的 $n\times n$ Hermite 矩阵。证明`}</Tx>
          <Eq n="1.153" say={R`复 Gauss 积分：每个复变量贡献 $\pi/\lambda$，所以得到 $\pi^n/\det A$（行列式的一次方）。`}>{R`\int\dd z_1\dd\bar z_1\ldots\dd z_n\dd\bar z_n\exp\left(-\sum_{i,j}\bar z_iA_{ij}z_j\right)=\pi^n(\det A)^{-1}=\pi^n\prod_i\lambda_i^{-1}.`}</Eq>
        </Exercise>
        <Tx>{R`**方法 2：**借助**函数行列式**（functional determinant）与 **$\zeta$ 函数正规化**计算涨落的路径积分，从而得到配分函数。引入虚时间 $\tau=\mathrm{i}t$，把路径积分改写为（取 $m=1$）

$$\int_{y(0)=y(T)=0}\mathcal{D}y\exp\left[\frac{\mathrm{i}}{2}\int\dd t\,y\left(-\frac{\dd^2}{\dd t^2}-\omega^2\right)y\right]\to\int_{y(0)=y(\beta)=0}\bar{\mathcal{D}}y\,\exp\left[-\frac12\int\dd\tau\,y\left(-\frac{\dd^2}{\dd\tau^2}+\omega^2\right)y\right],$$

边界条件为 $y(0)=y(\beta)=0$，$\bar{\mathcal{D}}$ 表示虚时间的路径积分测度。

设 $A$ 是本征值 $\lambda_k$（$1\le k\le n$）都为正的 $n\times n$ 实对称矩阵。对实变量 $x_k$，由习题 1.5（略去数值因子）

$$\prod_{k=1}^n\left(\int_{-\infty}^{\infty}\dd x_k\right)\mathrm{e}^{-\frac12\sum_{p,q}x_pA_{pq}x_q}=\prod_{k=1}^n\frac{1}{\sqrt{\lambda_k}}=\frac{1}{\sqrt{\det A}}.$$

这是熟知的 Gauss 积分 $\int_{-\infty}^{\infty}\dd x\,\mathrm{e}^{-\frac12\lambda x^2}=\sqrt{2\pi/\lambda}$（$\lambda>0$）的推广。定义算符 $\mathcal{O}$ 的行列式为其本征值 $\lambda_k$ 的（适当正规化的）无穷乘积：$\operatorname{Det}\mathcal{O}=\prod_k\lambda_k$。（全书用 $\det$ 表示有限维矩阵的行列式，$\operatorname{Det}$ 表示算符的（形式）行列式；类似地 $\Tr$ 有限维矩阵的迹记作 tr，算符的迹记作 Tr。）于是上面的路径积分写成`}</Tx>
        <Eq n="1.154" title="函数行列式" say={R`Gauss 型路径积分等于算符函数行列式的 $-1/2$ 次方——有限维公式 $1/\sqrt{\det A}$ 的无穷维推广。`}>{R`\int_{y(0)=y(\beta)=0}\bar{\mathcal{D}}y\exp\left[-\frac12\int\dd\tau\,y\left(-\frac{\dd^2}{\dd\tau^2}+\omega^2\right)y\right]=\frac{1}{\sqrt{\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2+\omega^2)}},`}</Eq>
        <Tx>{R`下标 D 表示本征值按 Dirichlet 边界条件 $y(0)=y(\beta)=0$ 求得。满足边界条件的一般解写成`}</Tx>
        <Eq n="1.155" say={R`Dirichlet 边界条件下的完备正交展开：正弦模式，归一化因子 $1/\sqrt\beta$。`}>{R`y(\tau)=\frac{1}{\sqrt\beta}\sum_{n\in\mathbb{N}}y_n\sin\frac{n\pi\tau}{\beta}.`}</Eq>
        <Tx>{R`$y(\tau)$ 是实函数，故 $y_n\in\mathbb{R}$。本征函数 $\sin(n\pi\tau/\beta)$ 的本征值是 $\lambda_n=(n\pi/\beta)^2+\omega^2$，所以函数行列式形式上写作`}</Tx>
        <Eq n="1.156" say={R`函数行列式 = 所有本征值之积；把它拆成自由部分 $\prod(n\pi/\beta)^2$（发散）与一个收敛的乘积。`}>{R`\operatorname{Det}_{\rm D}\left(-\frac{\dd^2}{\dd\tau^2}+\omega^2\right)=\prod_{n=1}^{\infty}\lambda_n=\prod_{n=1}^{\infty}\left[\left(\frac{n\pi}{\beta}\right)^2+\omega^2\right]=\prod_{n=1}^{\infty}\left(\frac{n\pi}{\beta}\right)^2\prod_{p=1}^{\infty}\left[1+\left(\frac{\beta\omega}{p\pi}\right)^2\right].`}</Eq>
        <Tx>{R`最后一行的第一个无穷乘积就是 $\operatorname{Det}_{\rm D}(-\dd^2/\dd\tau^2)$。我们用 $\zeta$ 函数正规化来计算它。设 $\mathcal{O}$ 是本征值 $\lambda_n$ 都为正的算符，则*形式上*有`}</Tx>
        <Eq n="1.157" say={R`行列式的对数 = 对数的迹 = 本征值对数之和（形式上，求和通常发散）。`}>{R`\log\operatorname{Det}\mathcal{O}=\Tr\log\mathcal{O}=\sum_n\log\lambda_n.`}</Eq>
        <Tx>{R`定义**谱 $\zeta$ 函数**（spectral $\zeta$-function）`}</Tx>
        <Eq n="1.158" title={R`谱 $\zeta$ 函数`} say={R`谱 $\zeta$ 函数：本征值的 $-s$ 次幂之和；$\mathrm{Re}\,s$ 足够大时收敛，再解析延拓到 $s=0$。`}>{R`\zeta_{\mathcal{O}}(s)\equiv\sum_n\frac{1}{\lambda_n^s}.`}</Eq>
        <Tx>{R`右边在 $\mathrm{Re}\,s$ 足够大时收敛，$\zeta_{\mathcal{O}}(s)$ 在该区域对 $s$ 解析；而且它可以解析延拓到除可能有限个点之外的整个 $s$ 平面。注意到（形式上，对每项 $\tfrac{\dd}{\dd s}\lambda_n^{-s}=-\lambda_n^{-s}\log\lambda_n$）

$$\left.\frac{\dd\zeta_{\mathcal{O}}(s)}{\dd s}\right|_{s=0}=-\sum_n\log\lambda_n,$$

我们得到表达式`}</Tx>
        <Eq n="1.159" title={R`$\zeta$ 函数正规化的行列式`} say={R`$\zeta$ 函数正规化的行列式：用谱 $\zeta$ 函数在 $s=0$ 处（解析延拓后）的导数来定义发散的无穷乘积。`}>{R`\operatorname{Det}\mathcal{O}=\exp\left[-\left.\frac{\dd\zeta_{\mathcal{O}}(s)}{\dd s}\right|_{s=0}\right].`}</Eq>
        <Tx>{R`现在把 $\mathcal{O}$ 换成 $-\dd^2/\dd\tau^2$，得到`}</Tx>
        <Eq n="1.160" say={R`$-\dd^2/\dd\tau^2$ 的谱 $\zeta$ 函数就是 Riemann $\zeta$ 函数乘一个标度因子。`}>{R`\zeta_{-\dd^2/\dd\tau^2}(s)=\sum_{n\ge1}\left(\frac{n\pi}{\beta}\right)^{-2s}=\left(\frac\beta\pi\right)^{2s}\zeta(2s)`}</Eq>
        <Tx>{R`其中 $\zeta$ 是著名的 **Riemann $\zeta$ 函数** $\zeta(s)=\sum_{n\ge1}n^{-s}$，它在整个复平面上除 $s=1$ 处的单极点外都解析（所以 $\zeta(2s)$ 在 $s=0$ 附近解析）。由熟知的值`}</Tx>
        <Eq n="1.161" say={R`Riemann $\zeta$ 函数在 0 处的值与导数（由函数方程得到）："$1+1+1+\cdots=-\tfrac12$"。`}>{R`\zeta(0)=-\tfrac12\qquad\zeta'(0)=-\tfrac12\log(2\pi)`}</Eq>
        <Tx>{R`得到

$$\zeta'_{-\dd^2/\dd\tau^2}(0)=2\log\left(\frac\beta\pi\right)\zeta(0)+2\zeta'(0)=-\log(2\beta).$$

最终我们证明了`}</Tx>
        <Eq n="1.162" keyEq title={R`$\zeta$ 正规化：$\operatorname{Det}(-\dd^2/\dd\tau^2)=2\beta$`} say={R`$\zeta$ 正规化给出 $-\dd^2/\dd\tau^2$（Dirichlet）的行列式为 $2\beta$：一个发散的无穷乘积被赋予了有限值。`}>{R`\operatorname{Det}_{\rm D}\left(-\frac{\dd^2}{\dd\tau^2}\right)=\mathrm{e}^{\log(2\beta)}=2\beta`}</Eq>
        <Tx>{R`以及`}</Tx>
        <Eq n="1.163" say={R`谐振子涨落算符的行列式 = $2\beta$ 乘一个收敛的无穷乘积。`}>{R`\operatorname{Det}_{\rm D}\left(-\frac{\dd^2}{\dd\tau^2}+\omega^2\right)=2\beta\prod_{p=1}^{\infty}\left[1+\left(\frac{\beta\omega}{p\pi}\right)^2\right].`}</Eq>
        <Box kind="note" title={R`$\zeta$ 正规化的结果为什么可信`}>{R`(1) 检验：$2\beta$ 与离散化的答案一致。把 $[0,\beta]$ 切成 $N$ 段，Dirichlet 边界下 $-\dd^2/\dd\tau^2$ 的差分算符是 $(N-1)\times(N-1)$ 三对角矩阵 $\varepsilon^{-2}\,\mathrm{tridiag}(-1,2,-1)$，其行列式为 $N\varepsilon^{-2(N-1)}=\beta\,\varepsilon^{-(2N-1)}$（$\mathrm{tridiag}(-1,2,-1)$ 的 $k$ 阶行列式为 $k+1$）。除去只依赖于切片宽度 $\varepsilon$、被测度吸收的因子之外，它正比于 $\beta$——与 $\zeta$ 正规化的 $2\beta$ 只差一个常数。

(2) "$1+1+1+\cdots=\zeta(0)=-\tfrac12$" 看似荒谬，但它只用来给发散乘积赋值；物理上有意义的是**比值**（例如 \eqref{1.163} 与 \eqref{1.162} 之比是收敛的）或对参数的依赖。`}</Box>
        <Tx>{R`这个方程中的无穷乘积是熟知的，但我们**假装不知道**它。配分函数现在表示为（经典部分对 $x$ 的积分如方法 1，给出 $[\pi/\omega\tanh(\beta\omega/2)]^{1/2}$）`}</Tx>
        <Eq n="1.164" say={R`配分函数 = 涨落行列式的 $-1/2$ 次方乘以经典部分对端点的积分。`}>{R`\Tr\,\mathrm{e}^{-\beta H}=\left[2\beta\prod_{p=1}^{\infty}\left\{1+\left(\frac{\beta\omega}{p\pi}\right)^2\right\}\right]^{-1/2}\left[\frac{\pi}{\omega\tanh(\beta\omega/2)}\right]^{1/2}.`}</Eq>
        <Box kind="warning" title={R`勘误与注记：\eqref{1.164}`}>{R`原书 \eqref{1.164} 中乘积的因子印作 $1+(\beta\pi/p\pi)^2$，应为 $1+(\beta\omega/p\pi)^2$（与 \eqref{1.163} 一致），已改正。

另外，\eqref{1.164} 与 \eqref{1.151} 相比多一个常数因子 $\sqrt\pi$（来自方法 2 中"略去的数值因子"，即测度的归一化）。严格地说，比较两式只能把乘积确定到一个与 $\beta,\omega$ 无关的常数 $c$；而 $\omega\to0$ 时乘积显然 $\to1$，这就定出了 $c$。直接验证：把 $\prod=\sinh(\beta\omega)/(\beta\omega)$ 代入 \eqref{1.164} 得 $\sqrt\pi/(2\sinh(\beta\omega/2))$，与 \eqref{1.151} 恰差常数 $\sqrt\pi$。因此下面的乘积公式确实被"证明"了。`}</Box>
        <Tx>{R`与 \eqref{1.151} 比较，我们就*证明*了公式

$$\prod_{n=1}^{\infty}\left[1+\left(\frac{\beta\omega}{n\pi}\right)^2\right]=\frac{\sinh(\beta\omega)}{\beta\omega},$$

即`}</Tx>
        <Eq n="1.165" title="sinh 的无穷乘积" say={R`$\sinh$ 的无穷乘积公式：由玻色谐振子配分函数的两种算法比较而得；它是 \eqref{1.148} 中 $x\to\mathrm{i}x$ 的版本。`}>{R`\prod_{n=1}^{\infty}\left(1+\frac{x^2}{n^2}\right)=\frac{\sinh(\pi x)}{\pi x}.`}</Eq>
        <Box kind="warning" title={R`勘误：乘积公式的系数`}>{R`原书 \eqref{1.165} 之前一行写作 $\prod[1+(\beta\omega/n\pi)^2]=\dfrac{\pi}{\beta\omega}\sinh(\beta\omega)$，多了一个因子 $\pi$；令 $x=\beta\omega/\pi$ 后应为 $\sinh(\beta\omega)/(\beta\omega)=\sinh(\pi x)/(\pi x)$，这才与原书 \eqref{1.165} 本身一致（$x\to0$ 时两边都 $\to1$）。正文已改正。`}</Box>
        <Tx>{R`那么 $\cosh$ 的无穷乘积展开呢？它要用**费米子**的路径积分得到——这是下一节的内容（\eqref{1.205}）。`}</Tx>
      </Sub>
    </Sec>);
}
