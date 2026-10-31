// §5.3 流与李导数 —— 式 (5.39)–(5.58)，定理 5.1，命题 5.1，例 5.9，习题 5.7–5.12，图 5.12–5.13；交互图 2（李括号 = 平行四边形缺口）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Exercise, Derivation, C } from "@kit";
import { BracketLab } from "./_ch05_demos.jsx";

const R = String.raw;

export function Sec53() {
  return (
    <Sec n="5.3" title="Flows and Lie derivatives" zh="流与李导数"
      gist={R`向量场 $X$ 的积分曲线 = 解 ODE $\dd x^\mu/\dd t=X^\mu(x)$ → 流 $\sigma(t,x)$ 构成单参数变换群（\sref{T5.1}），可写成 $\exp(tX)$ → 用 $(\sigma_{-\varepsilon})_*$ 把邻点的向量拉回来再相减，得到**李导数** $\mathcal{L}_XY=[X,Y]$ → 几何意义：沿 $X$ 走 $\varepsilon$、沿 $Y$ 走 $\delta$ 的"平行四边形"缺口 $\varepsilon\delta[X,Y]$ → 一形式、函数、一般张量的李导数（\sref{P5.1}）。`}
      why={R`流形上不同点的切空间互不相同，"向量场的导数"不能直接把两点的向量相减。李导数用向量场自己生成的流来搬运向量——不需要任何额外结构（度规、联络），所以是流形上最基本的导数。`}
      gives={["5.39", "5.41", "5.42", "5.43", "5.47", "5.49a", "5.49b", "5.50", "5.53", "5.55", "5.56"]}>
      <p className="muted">本节概念：<C id="flow" /> · <C id="lie_derivative" /></p>
      <Tx>{R`设 $X$ 是 $M$ 上的向量场。$X$ 的**积分曲线**（integral curve）$x(t)$ 是 $M$ 中这样一条曲线：它在 $x(t)$ 处的切向量就是 $X|_x$。给定卡 $(U,\varphi)$，这意味着`}</Tx>
      <Eq n="5.39" keyEq title="积分曲线" say={R`积分曲线处处顺着向量场走：曲线的坐标速度等于该点向量场的分量——一组一阶自治常微分方程。`}>{R`\frac{\dd x^\mu}{\dd t}=X^\mu(x(t))`}</Eq>
      <Tx>{R`其中 $x^\mu(t)$ 是 $\varphi(x(t))$ 的第 $\mu$ 个分量，$X=X^\mu\partial/\partial x^\mu$。注意记号的滥用：$x$ 既表示 $M$ 中的点，也表示它的坐标。［为了后面方便，假定点 $x(0)$ 在 $U$ 中。］换句话说，**求向量场 $X$ 的积分曲线等价于解自治常微分方程组（ODE）**\eqref{5.39}。初始条件 $x^\mu_0=x^\mu(0)$ 对应积分曲线在 $t=0$ 时的坐标。ODE 的存在唯一性定理（\sref{X:ODE-uniq}）保证 \eqref{5.39} 以 $x^\mu_0$ 为初值的解唯一存在，至少在局部如此。积分曲线可能只在 $\R$ 的一个子集上有定义，这时要注意参数 $t$ 不越出给定区间。下面假定 $t$ 已最大限度地延拓。已知若 $M$ 紧致，积分曲线对一切 $t\in\R$ 存在。

设 $\sigma(t,x_0)$ 是 $X$ 在 $t=0$ 时通过 $x_0$ 的积分曲线，其坐标记作 $\sigma^\mu(t,x_0)$。方程 \eqref{5.39} 变成`}</Tx>
      <Eq n="5.40a" say={R`把积分曲线看成"起点 $x_0$ 与时间 $t$ 的函数"：对时间的导数等于所在点的向量场。`}>{R`\frac{\dd}{\dd t}\sigma^\mu(t,x_0)=X^\mu(\sigma(t,x_0))`}</Eq>
      <Tx>{R`以及初始条件`}</Tx>
      <Eq n="5.40b" say={R`时间为零时还在起点。`}>{R`\sigma^\mu(0,x_0)=x^\mu_0.`}</Eq>
      <Tx>{R`映射 $\sigma:\R\times M\to M$ 称为由 $X\in\mathcal{X}(M)$ 生成的**流**（flow）。流满足规则`}</Tx>
      <Eq n="5.41" keyEq title="流的群性质" say={R`先流 $s$ 再流 $t$，等于一口气流 $t+s$：因为向量场不随时间变，从中途出发与从头出发走的是同一条路。`}>{R`\sigma(t,\sigma(s,x_0))=\sigma(t+s,x_0)`}</Eq>
      <Tx>{R`其中 $s,t\in\R$ 使两边都有意义。这可以由 ODE 解的唯一性看出。事实上，固定 $s$，把两边都看作 $t$ 的曲线：

$$\frac{\dd}{\dd t}\sigma^\mu(t,\sigma(s,x_0))=X^\mu(\sigma(t,\sigma(s,x_0))),\qquad\sigma(0,\sigma(s,x_0))=\sigma(s,x_0)$$

而

$$\frac{\dd}{\dd t}\sigma^\mu(t+s,x_0)=\frac{\dd}{\dd(t+s)}\sigma^\mu(t+s,x_0)=X^\mu(\sigma(t+s,x_0)),\qquad\sigma(0+s,x_0)=\sigma(s,x_0).$$

于是 \eqref{5.41} 两边满足同一个 ODE 与同一个初始条件，由解的唯一性它们相同。我们得到如下定理。`}</Tx>
      <Stmt id="T5.1">
        <Proof steps={[
          { claim: R`(i)(ii)：对每个 $x$，取 $t\mapsto\sigma(t,x)$ 为 \eqref{5.40a} 以 $x$ 为初值的解；它存在且唯一，所以 $\sigma$ 是良定义的映射，且 $\sigma(0,x)=x$。`, uses: ["X:ODE-uniq", "5.40a", "5.40b"], why: R`对初值的光滑依赖性（ODE 理论的标准结果）保证 $\sigma$ 作为 $(t,x)$ 的函数可微。` },
          { claim: R`(iii)：固定 $s$，令 $\alpha(t)=\sigma(t,\sigma(s,x))$、$\beta(t)=\sigma(t+s,x)$。二者都满足 $\dot\gamma^\mu=X^\mu(\gamma)$。`, tex: R`\dot\alpha^\mu(t)=X^\mu(\alpha(t)),\qquad\dot\beta^\mu(t)=\frac{\dd\sigma^\mu}{\dd u}\Big|_{u=t+s}=X^\mu(\beta(t))`, why: R`$\alpha$ 由定义；$\beta$ 用链式法则 $\dd(t+s)/\dd t=1$，并且方程**自治**（$X$ 不显含时间）。`, fill: true },
          { claim: R`初值相同：$\alpha(0)=\sigma(0,\sigma(s,x))=\sigma(s,x)=\beta(0)$。`, uses: ["5.40b"], fill: true },
          { claim: R`由唯一性 $\alpha\equiv\beta$，即 $\sigma(t,\sigma(s,x))=\sigma(t+s,x)$。`, uses: ["X:ODE-uniq"] },
        ]} />
      </Stmt>
      <Tx>{R`［注：这里用 $x$ 而不是 $x_0$ 表示初始点，以强调 $\sigma$ 是映射 $\R\times M\to M$。］可以把流想象成一股（定常的）水流：$t=0$ 时在点 $x$ 观察到的粒子，到时刻 $t$ 会出现在 $\sigma(t,x)$。`}</Tx>
      <Box kind="example" n="5.9" title="转动流">{R`设 $M=\R^2$，$X((x,y))=-y\,\partial/\partial x+x\,\partial/\partial y$ 是 $M$ 上的向量场。容易验证

$$\sigma(t,(x,y))=(x\cos t-y\sin t,\ x\sin t+y\cos t)$$

是 $X$ 生成的流：对 $t$ 求导得 $(-x\sin t-y\cos t,\ x\cos t-y\sin t)=(-\sigma^2,\sigma^1)$，正是 $X$ 在 $\sigma$ 处的分量 $(X^1,X^2)=(-y,x)|_\sigma$；且 $t=0$ 时回到 $(x,y)$。过 $(x,y)$ 的流是以原点为圆心的圆。显然 $t=2n\pi$（$n\in\Z$）时 $\sigma(t,(x,y))=(x,y)$。若 $(x,y)=(0,0)$，流停在 $(0,0)$ 不动。`}</Box>
      <Exercise n="5.7" title={R`$X=y\partial_x+x\partial_y$ 的流`} level="★"
        hint={R`解 $\dot x=y$、$\dot y=x$。考虑 $x\pm y$ 各自满足什么方程。`}
        solution={R`方程 \eqref{5.39} 为 $\dot x=y$，$\dot y=x$。令 $u=x+y$、$v=x-y$，则 $\dot u=u$、$\dot v=-v$，所以 $u=u_0\mathrm{e}^t$、$v=v_0\mathrm{e}^{-t}$。换回 $x,y$：

$$\sigma(t,(x,y))=(x\cosh t+y\sinh t,\ x\sinh t+y\cosh t).$$

检验：$\frac{\dd}{\dd t}\sigma^1=x\sinh t+y\cosh t=\sigma^2$ ✓，$\frac{\dd}{\dd t}\sigma^2=\sigma^1$ ✓，$\sigma(0,(x,y))=(x,y)$ ✓。

流线是双曲线 $x^2-y^2=$ 常数（以及渐近线 $y=\pm x$ 本身）：$(\sigma^1)^2-(\sigma^2)^2=x^2-y^2$ 守恒。与例 5.9 的转动不同，这个流**没有周期**，单参数变换群同构于 $\R$ 而不是 $\mathrm{SO}(2)$。若把 $(x,y)$ 读作 $(ct,x)$，这就是 $1+1$ 维的 Lorentz boost，$t$ 是快度（rapidity）。`}>
        {R`设 $M=\R^2$，$X=y\,\partial/\partial x+x\,\partial/\partial y$ 是 $M$ 上的向量场。求 $X$ 生成的流。`}
      </Exercise>

      <Sub n="5.3.1" title="One-parameter group of transformations" zh="单参数变换群">
        <Tx>{R`对固定的 $t\in\R$，流 $\sigma(t,x)$ 是从 $M$ 到 $M$ 的微分同胚，记作 $\sigma_t:M\to M$。重要的是，$\sigma_t$ 在下列规则下构成**交换群**：

(i) $\sigma_t(\sigma_s(x))=\sigma_{t+s}(x)$，即 $\sigma_t\circ\sigma_s=\sigma_{t+s}$；
(ii) $\sigma_0=$ 恒等映射（$=$ 单位元）；
(iii) $\sigma_{-t}=(\sigma_t)^{-1}$。

这个群称为**单参数变换群**（one-parameter group of transformations）。它局部看起来像加法群 $\R$，但整体上不一定同构于 $\R$。事实上，例 5.9 中 $\sigma_{2\pi n+t}$ 与 $\sigma_t$ 是同一个映射，单参数群同构于 $\mathrm{SO}(2)$——形如

$$\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}$$

的 $2\times2$ 实矩阵构成的乘法群——或同构于 $\mathrm{U}(1)$，即模为 1 的复数 $\mathrm{e}^{\mathrm{i}\theta}$ 构成的乘法群。

在 $\sigma_\varepsilon$（$\varepsilon$ 为无穷小）的作用下，由 \eqref{5.40a}、\eqref{5.40b}，坐标为 $x^\mu$ 的点 $x$ 被映到`}</Tx>
        <Eq n="5.42" keyEq title="无穷小变换" say={R`流一小段时间 $\varepsilon$，点沿向量场方向移动 $\varepsilon X$：向量场就是这族变换的"无穷小生成元"。`}>{R`\sigma^\mu_\varepsilon(x)=\sigma^\mu(\varepsilon,x)=x^\mu+\varepsilon X^\mu(x).`}</Eq>
        <Tx>{R`（准确到 $\varepsilon$ 的一阶。）在这个意义下，向量场 $X$ 称为变换 $\sigma_t$ 的**无穷小生成元**（infinitesimal generator）。

给定向量场 $X$，对应的流 $\sigma$ 常称为 $X$ 的**指数化**（exponentiation），记作`}</Tx>
        <Eq n="5.43" say={R`流是向量场的"指数"：把无穷小生成元 $X$ 累积 $t$ 这么长，就得到有限的变换。`}>{R`\sigma^\mu(t,x)=\exp(tX)x^\mu.`}</Eq>
        <Tx>{R`"指数化"之名可以这样理解。取参数 $t$，计算沿流 $\sigma$ 与初始点 $x=\sigma(0,x)$ 相隔参数距离 $t$ 的点的坐标。$\sigma(t,x)$ 的坐标是（Taylor 展开）`}</Tx>
        <Eq n="5.44" say={R`沿流的 Taylor 展开恰好是指数级数：每次对 $s$ 求导就是作用一次 $X$。`}>{R`\begin{aligned}\sigma^\mu(t,x)&=x^\mu+t\left.\frac{\dd}{\dd s}\sigma^\mu(s,x)\right|_{s=0}+\frac{t^2}{2!}\left(\frac{\dd}{\dd s}\right)^2\left.\sigma^\mu(s,x)\right|_{s=0}+\cdots\\&=\left[1+t\frac{\dd}{\dd s}+\frac{t^2}{2!}\left(\frac{\dd}{\dd s}\right)^2+\cdots\right]\left.\sigma^\mu(s,x)\right|_{s=0}\\&\equiv\exp\left(t\frac{\dd}{\dd s}\right)\left.\sigma^\mu(s,x)\right|_{s=0}.\end{aligned}`}</Eq>
        <Tx>{R`沿积分曲线对 $s$ 求导就是用 $X$ 作用：对任意函数 $f$，$\frac{\dd}{\dd s}f(\sigma(s,x))=X[f]|_{\sigma(s,x)}$（\eqref{5.21}），所以 $\left(\frac{\dd}{\dd s}\right)^k\sigma^\mu(s,x)\big|_{s=0}=X^k[x^\mu](x)$。最后一个表达式因此也可以写成 $\sigma^\mu(t,x)=\exp(tX)x^\mu$，与 \eqref{5.43} 一致（对解析的 $X$ 与足够小的 $t$）。流 $\sigma$ 满足以下指数性质：`}</Tx>
        <Eq n="5.45a" say={R`流零时间就是不动：$\exp(0)$ 是恒等。`}>{R`\text{(i)}\qquad\sigma(0,x)=x=\exp(0X)x`}</Eq>
        <Eq n="5.45b" say={R`对时间求导就是"拉下"一个 $X$，和普通指数函数 $\frac{\dd}{\dd t}\mathrm{e}^{ta}=a\mathrm{e}^{ta}$ 一样。`}>{R`\text{(ii)}\qquad\frac{\dd\sigma(t,x)}{\dd t}=X\exp(tX)x=\frac{\dd}{\dd t}[\exp(tX)x]`}</Eq>
        <Eq n="5.45c" say={R`指数的乘法法则：$\exp(tX)\exp(sX)=\exp((t+s)X)$，这正是流的群性质 \eqref{5.41}。`}>{R`\text{(iii)}\qquad\begin{aligned}\sigma(t,\sigma(s,x))&=\sigma(t,\exp(sX)x)=\exp(tX)\exp(sX)x\\&=\exp\{(t+s)X\}x=\sigma(t+s,x).\end{aligned}`}</Eq>
        <Box kind="example" title={R`检验：转动流的指数级数（本站补充）`}>{R`对例 5.9 的 $X=-y\partial_x+x\partial_y$：$X[x]=-y$，$X^2[x]=X[-y]=-x$，$X^3[x]=y$，$X^4[x]=x$……于是

$$\exp(tX)x=x-ty-\frac{t^2}{2!}x+\frac{t^3}{3!}y+\cdots=x\cos t-y\sin t,$$

同理 $\exp(tX)y=x\sin t+y\cos t$，正是例 5.9 的流。`}</Box>
      </Sub>

      <Sub n="5.3.2" title="Lie derivatives" zh="李导数">
        <Tx>{R`**问题：向量场的变化率怎样定义？**设 $\sigma(s,x)$ 与 $\tau(t,x)$ 是由向量场 $X$ 与 $Y$ 生成的两个流：`}</Tx>
        <Eq n="5.46a" say={R`$\sigma$ 是 $X$ 的流。`}>{R`\frac{\dd\sigma^\mu(s,x)}{\dd s}=X^\mu(\sigma(s,x))`}</Eq>
        <Eq n="5.46b" say={R`$\tau$ 是 $Y$ 的流。`}>{R`\frac{\dd\tau^\mu(t,x)}{\dd t}=Y^\mu(\tau(t,x)).`}</Eq>
        <Tx>{R`我们来计算向量场 $Y$ 沿 $\sigma(s,x)$ 的变化。为此要把点 $x$ 处的向量 $Y$ 与邻近点 $x'=\sigma_\varepsilon(x)$ 处的向量比较（\figref{5.12}）。但不能简单地把两点处 $Y$ 的分量相减，因为它们属于不同的切空间 $T_xM$ 与 $T_{\sigma_\varepsilon(x)}M$；不同点上的向量直接相减**没有定义**（换一套坐标，分量之差就按不同点的 Jacobi 矩阵变换，不再是向量）。

为了得到有意义的导数，先用 $(\sigma_{-\varepsilon})_*:T_{\sigma_\varepsilon(x)}M\to T_xM$ 把 $Y|_{\sigma_\varepsilon(x)}$ 搬到 $T_xM$，再求两个向量 $(\sigma_{-\varepsilon})_*Y|_{\sigma_\varepsilon(x)}$ 与 $Y|_x$ 之差——二者都是 $T_xM$ 中的向量。向量场 $Y$ 沿 $X$ 的流 $\sigma$ 的**李导数**（Lie derivative）定义为`}</Tx>
        <Eq n="5.47" keyEq title="李导数的定义" say={R`把邻点 $\sigma_\varepsilon(x)$ 处的 $Y$ 用流"倒推"回 $x$，与 $x$ 处原有的 $Y$ 相减，再除以 $\varepsilon$：这是同一切空间里的差商，所以有意义。`}>{R`\mathcal{L}_XY=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[(\sigma_{-\varepsilon})_*Y|_{\sigma_\varepsilon(x)}-Y|_x\right].`}</Eq>
        <Figure n="5.12" caption={R`要比较向量 $Y|_x$ 与 $Y|_{\sigma_\varepsilon(x)}$，后者必须用微分映射 $(\sigma_{-\varepsilon})_*$ 搬回到 $x$。`} width="60%" />
        <Exercise n="5.8" title="李导数的另两种写法" level="★★"
          hint={R`第一种：在 \eqref{5.47} 中把 $\varepsilon$ 换成 $-\varepsilon$。第二种：用 $(\sigma_\varepsilon)_*$ 作用在 \eqref{5.47} 的方括号上，并用坐标验证到 $O(\varepsilon)$。`}
          solution={R`**第一种写法。**在 \eqref{5.47} 中作替换 $\varepsilon\to-\varepsilon$（极限 $\varepsilon\to0$ 不变）：

$$\mathcal{L}_XY=\lim_{\varepsilon\to0}\frac{1}{-\varepsilon}\left[(\sigma_\varepsilon)_*Y|_{\sigma_{-\varepsilon}(x)}-Y|_x\right]=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[Y|_x-(\sigma_\varepsilon)_*Y|_{\sigma_{-\varepsilon}(x)}\right].$$

**第二种写法。**方括号 $Y|_{\sigma_\varepsilon(x)}-(\sigma_\varepsilon)_*Y|_x$ 是 $\sigma_\varepsilon(x)$ 处的向量，它等于 $(\sigma_\varepsilon)_*$ 作用在 \eqref{5.47} 的方括号上（$(\sigma_\varepsilon)_*(\sigma_{-\varepsilon})_*=(\sigma_0)_*=\mathrm{id}$，由 \eqref{5.34} 与流的群性质）。$\varepsilon\to0$ 时 $(\sigma_\varepsilon)_*\to\mathrm{id}$、$\sigma_\varepsilon(x)\to x$，所以除以 $\varepsilon$ 后极限相同。用坐标直接核对：$Y|_{\sigma_\varepsilon(x)}$ 的分量为 $Y^\nu(x+\varepsilon X)\simeq Y^\nu+\varepsilon X^\mu\partial_\mu Y^\nu$；由 \eqref{5.33}，$(\sigma_\varepsilon)_*Y|_x$ 的分量为 $Y^\mu\partial_\mu(x^\nu+\varepsilon X^\nu)=Y^\nu+\varepsilon Y^\mu\partial_\mu X^\nu$。相减除以 $\varepsilon$：

$$X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu,$$

与下面的 \eqref{5.49a} 一致。三种写法的区别只是"在哪个切空间做减法"，到一阶没有区别。`}>
          {R`证明 $\mathcal{L}_XY$ 也可写成 $\mathcal{L}_XY=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[Y|_x-(\sigma_\varepsilon)_*Y|_{\sigma_{-\varepsilon}(x)}\right]=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[Y|_{\sigma_\varepsilon(x)}-(\sigma_\varepsilon)_*Y|_x\right]$。`}
        </Exercise>
        <Tx>{R`**在坐标中计算。**设 $(U,\varphi)$ 是坐标为 $x$ 的卡，$X=X^\mu\partial/\partial x^\mu$、$Y=Y^\mu\partial/\partial x^\mu$ 是 $U$ 上的向量场。则 $\sigma_\varepsilon(x)$ 的坐标为 $x^\mu+\varepsilon X^\mu(x)$，且

$$Y|_{\sigma_\varepsilon(x)}=Y^\mu(x^\nu+\varepsilon X^\nu(x))e_\mu|_{x+\varepsilon X}\simeq[Y^\mu(x)+\varepsilon X^\nu(x)\partial_\nu Y^\mu(x)]e_\mu|_{x+\varepsilon X},$$

其中 $\{e_\mu\}=\{\partial/\partial x^\mu\}$ 是坐标基，$\partial_\nu\equiv\partial/\partial x^\nu$。用 $(\sigma_{-\varepsilon})_*$ 把这个 $\sigma_\varepsilon(x)$ 处的向量映到 $x$（\eqref{5.33}，映射 $\sigma_{-\varepsilon}$ 的坐标表示为 $x^\nu\mapsto x^\nu-\varepsilon X^\nu(x)$），得到`}</Tx>
        <Eq n="5.48" say={R`把邻点的 $Y$ 推回 $x$：分量先因位置不同多出 $\varepsilon X\cdot\partial Y$，再因流的 Jacobi 矩阵少掉 $\varepsilon Y\cdot\partial X$。`}>{R`\begin{aligned}&[Y^\mu(x)+\varepsilon X^\lambda(x)\partial_\lambda Y^\mu(x)]\partial_\mu[x^\nu-\varepsilon X^\nu(x)]e_\nu|_x\\&\quad=[Y^\mu(x)+\varepsilon X^\lambda(x)\partial_\lambda Y^\mu(x)][\delta^\nu_\mu-\varepsilon\partial_\mu X^\nu(x)]e_\nu|_x\\&\quad=Y^\mu(x)e_\mu|_x+\varepsilon[X^\mu(x)\partial_\mu Y^\nu(x)-Y^\mu(x)\partial_\mu X^\nu(x)]e_\nu|_x+O(\varepsilon^2).\end{aligned}`}</Eq>
        <Tx>{R`（Jacobi 矩阵应在 $\sigma_\varepsilon(x)$ 处取值，但它与在 $x$ 处取值只差 $O(\varepsilon)$，乘上已有的 $\varepsilon$ 后进入 $O(\varepsilon^2)$。）由 \eqref{5.47} 与 \eqref{5.48} 得到`}</Tx>
        <Eq n="5.49a" keyEq title="李导数的分量" say={R`$Y$ 沿 $X$ 的李导数 = "$Y$ 沿 $X$ 方向的普通导数"减去"$X$ 沿 $Y$ 方向的普通导数"：第二项来自流把坐标网格本身拉伸扭转。`}>{R`\mathcal{L}_XY=(X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu)e_\nu.`}</Eq>
        <Exercise n="5.9" title="李括号" level="★"
          hint={R`把 $X[Y[f]]$ 与 $Y[X[f]]$ 用分量展开，二阶导数项因混合偏导可交换而相消。`}
          solution={R`用 \eqref{5.21}：

$$X[Y[f]]=X^\mu\partial_\mu(Y^\nu\partial_\nu f)=X^\mu(\partial_\mu Y^\nu)\partial_\nu f+X^\mu Y^\nu\partial_\mu\partial_\nu f,$$
$$Y[X[f]]=Y^\mu(\partial_\mu X^\nu)\partial_\nu f+Y^\mu X^\nu\partial_\mu\partial_\nu f.$$

两式的二阶导数项相等（$X^\mu Y^\nu\partial_\mu\partial_\nu f=Y^\mu X^\nu\partial_\mu\partial_\nu f$，交换求和指标并用 $\partial_\mu\partial_\nu f=\partial_\nu\partial_\mu f$），相减后消去：

$$[X,Y]f=(X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu)\partial_\nu f.$$

这是一阶微分算子，系数是光滑函数，所以 $[X,Y]$ 是向量场，分量为 $X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu$。与 \eqref{5.49a} 比较即得 $\mathcal{L}_XY=[X,Y]$。`}>
          <>
            <Tx>{R`设 $X=X^\mu\partial/\partial x^\mu$、$Y=Y^\mu\partial/\partial x^\mu$ 是 $M$ 上的向量场。用`}</Tx>
            <Eq n="5.50" keyEq title="李括号" say={R`李括号是两个方向导数的"对易子"：先沿 $Y$ 求导再沿 $X$ 求导，减去反过来的次序。`}>{R`[X,Y]f=X[Y[f]]-Y[X[f]]`}</Eq>
            <Tx>{R`定义**李括号**（Lie bracket）$[X,Y]$，其中 $f\in\mathcal{F}(M)$。证明 $[X,Y]$ 是向量场，由 $(X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu)e_\nu$ 给出。`}</Tx>
          </>
        </Exercise>
        <Tx>{R`这道习题说明 $Y$ 沿 $X$ 的李导数就是`}</Tx>
        <Eq n="5.49b" keyEq title="李导数 = 李括号" say={R`向量场沿另一个向量场的李导数，就是二者的对易子。`}>{R`\mathcal{L}_XY=[X,Y].`}</Eq>
        <Tx>{R`［注：$XY$ 与 $YX$ 都不是向量场，因为它们是二阶微分算子；但组合 $[X,Y]$ 是一阶微分算子，确实是向量场。］`}</Tx>
        <Exercise n="5.10" title="李括号的代数性质" level="★"
          hint={R`(a)(b) 由定义 \eqref{5.50} 直接看出。(c) 把三个二重括号都作用在 $f$ 上展开成 12 项，逐对相消。`}
          solution={R`**(a) 双线性。**向量场作为微分算子是线性的：$[X,c_1Y_1+c_2Y_2]f=X[c_1Y_1[f]+c_2Y_2[f]]-(c_1Y_1+c_2Y_2)[X[f]]=c_1[X,Y_1]f+c_2[X,Y_2]f$（常数 $c_i$ 可以提出微分号）。对第一个变量同理。

**(b) 反对称**由定义显然：$[Y,X]f=Y[X[f]]-X[Y[f]]=-[X,Y]f$。

**(c) Jacobi 恒等式。**记 $XYf\equiv X[Y[f]]$。

$$[[X,Y],Z]f=XYZf-YXZf-ZXYf+ZYXf,$$
$$[[Z,X],Y]f=ZXYf-XZYf-YZXf+YXZf,$$
$$[[Y,Z],X]f=YZXf-ZYXf-XYZf+XZYf.$$

三式相加，十二项两两相消（$XYZf$、$YXZf$、$ZXYf$、$ZYXf$、$XZYf$、$YZXf$ 各出现一次正、一次负），和为零。`}>
          {R`证明李括号满足 (a) 双线性：$[X,c_1Y_1+c_2Y_2]=c_1[X,Y_1]+c_2[X,Y_2]$，$[c_1X_1+c_2X_2,Y]=c_1[X_1,Y]+c_2[X_2,Y]$（$c_1,c_2$ 为任意常数）；(b) 反对称：$[X,Y]=-[Y,X]$；(c) Jacobi 恒等式：$[[X,Y],Z]+[[Z,X],Y]+[[Y,Z],X]=0$。`}
        </Exercise>
        <Exercise n="5.11" title={R`李括号与函数、与映射`} level="★★"
          hint={R`(a) 作用在测试函数 $g$ 上，用 Leibniz 律 $X[fh]=X[f]h+fX[h]$。(b) 关键一步：$Y[g\circ f]=((f_*Y)[g])\circ f$。`}
          solution={R`**(a)** 对测试函数 $g$：

$$[fX,Y]g=fX[Y[g]]-Y[fX[g]]=fX[Y[g]]-Y[f]X[g]-fY[X[g]]=(f[X,Y]-Y[f]X)g,$$

即 $\mathcal{L}_{fX}Y=f[X,Y]-Y[f]X$。同理

$$[X,fY]g=X[fY[g]]-fY[X[g]]=X[f]Y[g]+fX[Y[g]]-fY[X[g]]=(f[X,Y]+X[f]Y)g.$$

**(b)** 这里 $f_*X$ 要成为 $N$ 上的向量场，需要 $f$ 是微分同胚（或更一般地，$X$ 与 $N$ 上某个向量场 $f$-相关）；下面在这一前提下证明。对 $g\in\mathcal{F}(N)$，由 \eqref{5.31}，$Y[g\circ f](p)=(f_*Y)|_{f(p)}[g]$，即 $Y[g\circ f]=((f_*Y)[g])\circ f$。同理对任意 $h\in\mathcal{F}(N)$ 有 $X[h\circ f]=((f_*X)[h])\circ f$。于是

$$\begin{aligned}(f_*[X,Y])[g]\circ f&=[X,Y][g\circ f]=X[Y[g\circ f]]-Y[X[g\circ f]]\\&=X[((f_*Y)[g])\circ f]-Y[((f_*X)[g])\circ f]\\&=\big((f_*X)[(f_*Y)[g]]-(f_*Y)[(f_*X)[g]]\big)\circ f=([f_*X,f_*Y][g])\circ f.\end{aligned}$$

$g$ 任意，故 $f_*[X,Y]=[f_*X,f_*Y]$。这条性质在 §5.6 中用来证明左不变向量场的括号仍左不变（\eqref{5.112}）。`}>
          <>
            <Tx>{R`(a) 设 $X,Y\in\mathcal{X}(M)$，$f\in\mathcal{F}(M)$。证明`}</Tx>
            <Eq n="5.51a" say={R`把 $X$ 乘上函数后求李导数，除了乘上 $f$ 外还多出一项——因为流本身被函数"调速"了。`}>{R`\mathcal{L}_{fX}Y=f[X,Y]-Y[f]X`}</Eq>
            <Eq n="5.51b" say={R`对 $fY$ 求李导数满足 Leibniz 律：$f$ 被 $X$ 求导，$Y$ 被李导数作用。`}>{R`\mathcal{L}_X(fY)=f[X,Y]+X[f]Y.`}</Eq>
            <Tx>{R`(b) 设 $X,Y\in\mathcal{X}(M)$，$f:M\to N$。证明`}</Tx>
            <Eq n="5.52" keyEq title="推前保持李括号" say={R`李括号是"自然的"：先求括号再推前，与先推前再求括号相同。`}>{R`f_*[X,Y]=[f_*X,f_*Y].`}</Eq>
          </>
        </Exercise>
        <Box kind="warning" title={R`注意：$\mathcal{L}_XY$ 对 $X$ 不是函数线性的`}>{R`由 \eqref{5.51a}，$\mathcal{L}_{fX}Y\neq f\mathcal{L}_XY$：李导数在一点的值不仅依赖 $X$ 在该点的值，还依赖 $X$ 在附近怎样变化。这与第 7 章的协变导数 $\nabla_XY$ 不同（$\nabla_{fX}Y=f\nabla_XY$）。李导数不需要联络，代价就是这一点"非张量性"。`}</Box>

        <Tx>{R`**几何意义：平行四边形的缺口。**几何上，李括号刻画两个流的**不可交换性**。这可以从下面的考虑看出。设 $\sigma(s,x)$ 与 $\tau(t,x)$ 是向量场 $X$ 与 $Y$ 生成的两个流（\figref{5.13}）。若先沿流 $\sigma$ 移动小参数距离 $\varepsilon$，再沿 $\tau$ 移动 $\delta$，到达的点的坐标是

$$\begin{aligned}\tau^\mu(\delta,\sigma(\varepsilon,x))&\simeq\tau^\mu(\delta,x^\nu+\varepsilon X^\nu(x))\\&\simeq x^\mu+\varepsilon X^\mu(x)+\delta Y^\mu(x^\nu+\varepsilon X^\nu(x))\\&\simeq x^\mu+\varepsilon X^\mu(x)+\delta Y^\mu(x)+\varepsilon\delta X^\nu(x)\partial_\nu Y^\mu(x).\end{aligned}$$

若先沿 $\tau$ 移动 $\delta$，再沿 $\sigma$ 移动 $\varepsilon$，到达

$$\begin{aligned}\sigma^\mu(\varepsilon,\tau(\delta,x))&\simeq\sigma^\mu(\varepsilon,x^\nu+\delta Y^\nu(x))\\&\simeq x^\mu+\delta Y^\mu(x)+\varepsilon X^\mu(x^\nu+\delta Y^\nu(x))\\&\simeq x^\mu+\delta Y^\mu(x)+\varepsilon X^\mu(x)+\varepsilon\delta Y^\nu(x)\partial_\nu X^\mu(x).\end{aligned}$$

两点坐标之差正比于李括号：

$$\tau^\mu(\delta,\sigma(\varepsilon,x))-\sigma^\mu(\varepsilon,\tau(\delta,x))=\varepsilon\delta[X,Y]^\mu.$$

（略去的是 $\varepsilon^2$、$\delta^2$ 与更高阶项。$\varepsilon^2$ 项 $\frac12\varepsilon^2X^\nu\partial_\nu X^\mu$ 与 $\delta^2$ 项在两条路径中相同，相减后抵消，所以差的领头项确实是 $\varepsilon\delta$ 阶。）`}</Tx>
        <Box kind="warning" title={R`勘误：指标 $\partial_\nu Y^\mu$（p.213）`}>{R`原书第一条路径的最后一行印作 "$\varepsilon\delta X^\nu(x)\partial_\nu Y^\nu(x)$"，被求导的分量指标应为自由指标 $\mu$：$\varepsilon\delta X^\nu(x)\partial_\nu Y^\mu(x)$（与第二条路径中的 $\varepsilon\delta Y^\nu\partial_\nu X^\mu$ 对应）。否则 $\nu$ 出现三次，表达式无意义。正文已改正；交互图 2 用数值积分验证了改正后的式子。`}</Box>
        <Figure n="5.13" caption={R`李括号 $[X,Y]$ 度量平行四边形不闭合的程度。`} width="55%" />
        <Tx>{R`$X$ 与 $Y$ 的李括号度量\figref{5.13} 中平行四边形**不闭合**的程度。容易看出 $\mathcal{L}_XY=[X,Y]=0$ 当且仅当`}</Tx>
        <Eq n="5.53" keyEq title="流可交换的判据" say={R`两个流可以交换次序（四边形处处闭合），当且仅当两个向量场的李括号为零。`}>{R`\sigma(s,\tau(t,x))=\tau(t,\sigma(s,x)).`}</Eq>
        <Derivation title={R`\eqref{5.53} 的证明（原书说"容易看出"，本站补全两个方向）`} collapsed steps={[
          { tex: R`\sigma_s\circ\tau_t=\tau_t\circ\sigma_s\ \ \forall s,t\ \Rightarrow\ [X,Y]=0`, why: R`把两边在 $x$ 处对 $s$、$t$ 展开到 $st$ 阶：由上面的计算，差的 $st$ 项系数就是 $[X,Y]^\mu$，它必须为零。` },
          { tex: R`\frac{\dd}{\dd s}\Big[(\sigma_{-s})_*Y|_{\sigma_s(x)}\Big]=(\sigma_{-s})_*\big(\mathcal{L}_XY\big)|_{\sigma_s(x)}`, why: R`在 $s$ 处求导，用群性质 $\sigma_{-s-\varepsilon}=\sigma_{-s}\circ\sigma_{-\varepsilon}$ 与 \eqref{5.34}，差商化为 $(\sigma_{-s})_*$ 作用在 \eqref{5.47} 的差商上。` },
          { tex: R`[X,Y]=0\ \Rightarrow\ (\sigma_{-s})_*Y|_{\sigma_s(x)}=Y|_x\quad\forall s`, why: R`上式右边为零，所以左边对 $s$ 是常数，等于 $s=0$ 时的值。即 $\sigma_s$ 把 $Y$ 映成 $Y$：$(\sigma_s)_*Y=Y$。` },
          { tex: R`\frac{\dd}{\dd t}\sigma_s(\tau_t(x))=(\sigma_s)_*Y|_{\tau_t(x)}=Y|_{\sigma_s(\tau_t(x))}`, why: R`所以曲线 $t\mapsto\sigma_s(\tau_t(x))$ 是 $Y$ 的积分曲线，起点为 $\sigma_s(x)$。` },
          { tex: R`\sigma_s(\tau_t(x))=\tau_t(\sigma_s(x))`, why: R`由 ODE 解的唯一性（\sref{X:ODE-uniq}），它与 $Y$ 从 $\sigma_s(x)$ 出发的积分曲线 $\tau_t(\sigma_s(x))$ 相同。` },
        ]} result={R`$[X,Y]=0\iff$ 两个流处处可交换。由此可证：若 $m$ 个线性无关的向量场两两对易，则存在局部坐标使它们是 $\partial/\partial x^\mu$——非坐标基 $\{\hat e_i\}$ 不能来自坐标的判据就是 $[\hat e_i,\hat e_j]\neq0$。`} />
        <BracketLab />

        <Tx>{R`**一形式的李导数。**也可以定义一形式 $\omega\in\Omega^1(M)$ 沿 $X\in\mathcal{X}(M)$ 的李导数：`}</Tx>
        <Eq n="5.54" keyEq title="一形式的李导数" say={R`一形式用拉回 $(\sigma_\varepsilon)^*$ 从邻点搬回来（方向与向量相反），再做差商。`}>{R`\mathcal{L}_X\omega\equiv\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[(\sigma_\varepsilon)^*\omega|_{\sigma_\varepsilon(x)}-\omega|_x\right]`}</Eq>
        <Tx>{R`其中 $\omega|_x\in T^*_xM$ 是 $\omega$ 在 $x$ 处的值。令 $\omega=\omega_\mu\dd x^\mu$，重复与前面类似的分析（\eqref{5.37}，映射 $\sigma_\varepsilon$ 的 Jacobi 矩阵为 $\delta^\nu_\mu+\varepsilon\partial_\mu X^\nu$）：

$$(\sigma_\varepsilon)^*\omega|_{\sigma_\varepsilon(x)}=\omega_\nu(x+\varepsilon X)\,[\delta^\nu_\mu+\varepsilon\partial_\mu X^\nu]\dd x^\mu=\omega_\mu(x)\dd x^\mu+\varepsilon[X^\nu(x)\partial_\nu\omega_\mu(x)+\partial_\mu X^\nu(x)\omega_\nu(x)]\dd x^\mu+O(\varepsilon^2),$$

于是`}</Tx>
        <Eq n="5.55" keyEq title="一形式李导数的分量" say={R`一形式的李导数：分量沿 $X$ 的普通导数，加上流的 Jacobi 矩阵带来的修正——符号与向量的情形相反。`}>{R`\mathcal{L}_X\omega=(X^\nu\partial_\nu\omega_\mu+\partial_\mu X^\nu\omega_\nu)\dd x^\mu.`}</Eq>
        <Tx>{R`显然 $\mathcal{L}_X\omega\in T^*_xM$，因为它是同一点 $x$ 处两个一形式之差。

**函数的李导数。**$f\in\mathcal{F}(M)$ 沿 $X$ 生成的流 $\sigma_s$ 的李导数为`}</Tx>
        <Eq n="5.56" keyEq title="函数的李导数" say={R`函数的李导数就是通常的方向导数：函数沿流的变化率。`}>{R`\begin{aligned}\mathcal{L}_Xf&\equiv\lim_{\varepsilon\to0}\frac{1}{\varepsilon}[f(\sigma_\varepsilon(x))-f(x)]\\&=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}[f(x^\mu+\varepsilon X^\mu(x))-f(x^\mu)]\\&=X^\mu(x)\frac{\partial f}{\partial x^\mu}=X[f]\end{aligned}`}</Eq>
        <Tx>{R`即通常的 $f$ 沿 $X$ 的方向导数。

**一般张量。**一般张量的李导数由下面的命题得到。`}</Tx>
        <Stmt id="P5.1">
          <Eq n="5.57a" say="李导数是线性的。">{R`\mathcal{L}_X(t_1+t_2)=\mathcal{L}_Xt_1+\mathcal{L}_Xt_2`}</Eq>
          <Eq n="5.57b" keyEq title="李导数的 Leibniz 律" say={R`李导数对张量积满足乘积法则：轮流作用在每个因子上。`}>{R`\mathcal{L}_X(t_1\otimes t_2)=(\mathcal{L}_Xt_1)\otimes t_2+t_1\otimes(\mathcal{L}_Xt_2)`}</Eq>
          <Proof steps={[
            { claim: R`(a) 显然：$(\sigma_{-\varepsilon})_*$（或 $(\sigma_\varepsilon)^*$）是线性映射，差商与极限都是线性的。` },
            { claim: R`(b) 不写满是指标的一般证明，取一个推广到一般情形显而易见的例子：$Y\in\mathcal{X}(M)$、$\omega\in\Omega^1(M)$，作张量积 $Y\otimes\omega$。用 $(\sigma_{-\varepsilon})_*\otimes(\sigma_\varepsilon)^*$ 把 $(Y\otimes\omega)|_{\sigma_\varepsilon(x)}$ 映到 $x$ 处的张量：`, tex: R`[(\sigma_{-\varepsilon})_*\otimes(\sigma_\varepsilon)^*](Y\otimes\omega)|_{\sigma_\varepsilon(x)}=[(\sigma_{-\varepsilon})_*Y\otimes(\sigma_\varepsilon)^*\omega]|_x`, why: R`$(\sigma_\varepsilon)^*$ 把 $\sigma_\varepsilon(x)$ 处的一形式拉回到 $x$；对微分同胚，它与 $(\sigma_{-\varepsilon})_*$ 方向一致。` },
            { claim: R`差商中加一项、减一项 $(\sigma_{-\varepsilon})_*Y\otimes\omega$（Leibniz 律的标准技巧）：`, tex: R`\begin{aligned}\mathcal{L}_X(Y\otimes\omega)&=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[\{(\sigma_{-\varepsilon})_*Y\otimes(\sigma_\varepsilon)^*\omega\}|_x-(Y\otimes\omega)|_x\right]\\&=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left[(\sigma_{-\varepsilon})_*Y\otimes\{(\sigma_\varepsilon)^*\omega-\omega\}+\{(\sigma_{-\varepsilon})_*Y-Y\}\otimes\omega\right]\end{aligned}`, fill: true },
            { claim: R`逐项取极限：第一项中 $(\sigma_{-\varepsilon})_*Y|_{\sigma_\varepsilon(x)}\to Y|_x$，差商 $\to\mathcal{L}_X\omega$；第二项差商 $\to\mathcal{L}_XY$。`, tex: R`=Y\otimes(\mathcal{L}_X\omega)+(\mathcal{L}_XY)\otimes\omega`, uses: ["5.47", "5.54"], why: R`张量积对每个因子连续（双线性），所以极限可以分配到因子上。`, fill: true },
            { claim: R`一般情形：对 $t_1\otimes t_2$，把 $t_1$、$t_2$ 各自的"搬运映射"取为 $(\sigma_{-\varepsilon})_*$ 在向量因子上、$(\sigma_\varepsilon)^*$ 在一形式因子上的张量积，重复同样的"加一项减一项"即可。` },
          ]} />
        </Stmt>
        <Tx>{R`这个命题让我们能计算一般张量场的李导数。例如设 $t=t_\mu{}^\nu\dd x^\mu\otimes e_\nu\in\mathcal{T}^1_1(M)$，\sref{P5.1} 给出

$$\mathcal{L}_Xt=X[t_\mu{}^\nu]\dd x^\mu\otimes e_\nu+t_\mu{}^\nu(\mathcal{L}_X\dd x^\mu)\otimes e_\nu+t_\mu{}^\nu\dd x^\mu\otimes(\mathcal{L}_Xe_\nu).$$

其中由 \eqref{5.55}，$\mathcal{L}_X\dd x^\mu=\partial_\lambda X^\mu\dd x^\lambda$；由 \eqref{5.49a}，$\mathcal{L}_Xe_\nu=[X,\partial_\nu]=-\partial_\nu X^\lambda e_\lambda$。代入并重新命名哑指标，

$$(\mathcal{L}_Xt)_\mu{}^\nu=X^\lambda\partial_\lambda t_\mu{}^\nu+\partial_\mu X^\lambda\,t_\lambda{}^\nu-\partial_\lambda X^\nu\,t_\mu{}^\lambda,$$

正是习题 5.18 的 \eqref{5.87} 的特例：每个下指标贡献一个 $+\partial X$ 项，每个上指标贡献一个 $-\partial X$ 项。`}</Tx>
        <Exercise n="5.12" title={R`$\mathcal{L}_{[X,Y]}=[\mathcal{L}_X,\mathcal{L}_Y]$`} level="★★★"
          hint={R`两边都是"张量代数上与缩并可交换、满足 Leibniz 律的导子"。这样的导子由它在函数与向量场上的作用唯一决定。先在函数、向量场上验证（后者就是 Jacobi 恒等式），再用 $\langle\mathcal{L}_X\omega,Z\rangle=X\langle\omega,Z\rangle-\langle\omega,[X,Z]\rangle$ 推到一形式。`}
          solution={R`记 $D=\mathcal{L}_X\mathcal{L}_Y-\mathcal{L}_Y\mathcal{L}_X$。

**函数：**$Df=X[Y[f]]-Y[X[f]]=[X,Y]f=\mathcal{L}_{[X,Y]}f$（\eqref{5.56}）。

**向量场：**$DZ=[X,[Y,Z]]-[Y,[X,Z]]$。由 Jacobi 恒等式（习题 5.10）$[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0$，得 $[X,[Y,Z]]-[Y,[X,Z]]=-[Z,[X,Y]]=[[X,Y],Z]=\mathcal{L}_{[X,Y]}Z$。

**一形式：**先由 \eqref{5.55} 与 \eqref{5.49a} 验证 $\langle\mathcal{L}_X\omega,Z\rangle=X[\langle\omega,Z\rangle]-\langle\omega,[X,Z]\rangle$：左边 $=(X^\nu\partial_\nu\omega_\mu+\partial_\mu X^\nu\omega_\nu)Z^\mu$，右边 $=X^\nu\partial_\nu(\omega_\mu Z^\mu)-\omega_\nu(X^\mu\partial_\mu Z^\nu-Z^\mu\partial_\mu X^\nu)$，展开相等。反复使用它：

$$\begin{aligned}\langle\mathcal{L}_X\mathcal{L}_Y\omega,Z\rangle&=X\langle\mathcal{L}_Y\omega,Z\rangle-\langle\mathcal{L}_Y\omega,[X,Z]\rangle\\&=XY\langle\omega,Z\rangle-X\langle\omega,[Y,Z]\rangle-Y\langle\omega,[X,Z]\rangle+\langle\omega,[Y,[X,Z]]\rangle.\end{aligned}$$

交换 $X\leftrightarrow Y$ 相减，中间两项对称而相消：

$$\langle D\omega,Z\rangle=[X,Y]\langle\omega,Z\rangle-\langle\omega,[X,[Y,Z]]-[Y,[X,Z]]\rangle=[X,Y]\langle\omega,Z\rangle-\langle\omega,[[X,Y],Z]\rangle=\langle\mathcal{L}_{[X,Y]}\omega,Z\rangle.$$

$Z$ 任意，故 $D\omega=\mathcal{L}_{[X,Y]}\omega$。

**一般张量：**$D$ 是两个满足 Leibniz 律 \eqref{5.57b} 的线性算子的对易子，仍满足 Leibniz 律：$D(t_1\otimes t_2)=(Dt_1)\otimes t_2+t_1\otimes(Dt_2)$（交叉项 $\mathcal{L}_Xt_1\otimes\mathcal{L}_Yt_2$ 在对易子中相消）。任意张量场局部是函数、向量场 $e_\mu$、一形式 $\dd x^\mu$ 的张量积之和，$D$ 与 $\mathcal{L}_{[X,Y]}$ 在这些"积木"上相同，满足同样的 Leibniz 律，所以处处相同：$\mathcal{L}_{[X,Y]}t=\mathcal{L}_X\mathcal{L}_Yt-\mathcal{L}_Y\mathcal{L}_Xt$。`}>
          <>
            <Tx>{R`设 $t$ 是张量场。证明`}</Tx>
            <Eq n="5.58" say={R`李导数作为算子的对易子，等于沿李括号的李导数：$X\mapsto\mathcal{L}_X$ 是李代数同态。`}>{R`\mathcal{L}_{[X,Y]}t=\mathcal{L}_X\mathcal{L}_Yt-\mathcal{L}_Y\mathcal{L}_Xt.`}</Eq>
          </>
        </Exercise>
        <Box kind="physics" title="李导数在物理中">{R`(1) **对称性与守恒**：若度规满足 $\mathcal{L}_Kg=0$，$K$ 是 Killing 向量场，对应一个守恒量（第 7 章）。(2) **流体力学**："冻结在流体中"的量（如理想磁流体的磁场）满足 $\partial_t B+\mathcal{L}_vB=0$。(3) **量子力学**：$[X,Y]$ 与对易子 $[\hat A,\hat B]$ 的类比不是巧合——角动量算符 $\hat L_i$ 就是转动生成元 $-\mathrm{i}\hbar X_i^\sharp$（例 5.19），它们的对易关系就是这些向量场的李括号。`}</Box>
      </Sub>
    </Sec>);
}
