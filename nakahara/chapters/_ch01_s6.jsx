// §1.6 标量场的量子化 + §1.7 Dirac 场的量子化 —— 式 (1.207)–(1.240)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function Sec16() {
  return (
    <Sec n="1.6" title="Quantization of a scalar field" zh="标量场的量子化"
      gist={R`把路径积分推广到无穷多自由度：场 $\phi(x)$ 的作用量 $S=\int\dd x\,\mathcal{L}$，Euler–Lagrange 方程给出 Klein–Gordon 方程。自由场的生成泛函是 Gauss 积分：$Z_0[J]=Z_0[0]\exp[-\tfrac{\mathrm{i}}2\int J\Delta J]$，传播子 $\Delta$ 是 $\square-m^2$ 的逆，$Z_0[0]=[\operatorname{Det}(\bar\square-m^2)]^{-1/2}$。相互作用用 $V(\tfrac1{\mathrm{i}}\delta/\delta J)$ 微扰展开；$W=-\log Z$ 生成连通图，其 Legendre 变换 $\Gamma$ 生成单粒子不可约图。`}
      why={R`规范场、反常与弦论都是场论；它们的计算骨架就是这一节的"Gauss 积分 + 源 + 行列式"。§1.4 的谐振子就是一个场模式。`}
      gives={["1.208", "1.210", "1.211", "1.215", "1.216", "1.218", "1.227", "1.228"]}>
      <Sub n="1.6.1" title="Free scalar field" zh="自由标量场">
        <p className="muted">本小节概念：<C id="path_integral" /></p>
        <Tx>{R`前面几节的分析可以很容易地推广到多自由度的情形。我们特别感兴趣的是**无穷多**自由度的系统——**量子场论**（quantum field theory，QFT）。从最简单的标量场论开始。设 $\phi(x)$ 是时空坐标 $x=(\boldsymbol{x},x^0)$ 处的实标量场，$\boldsymbol{x}$ 为空间坐标，$x^0$ 为时间坐标。作用量依赖于 $\phi$ 及其导数 $\partial_\mu\phi(x)=\partial\phi(x)/\partial x^\mu$：`}</Tx>
        <Eq n="1.207" say={R`场论的作用量：Lagrange 密度对整个时空积分——每个空间点都是一个"自由度"。`}>{R`S=\int\dd x\,\mathcal{L}(\phi,\partial_\mu\phi).`}</Eq>
        <Tx>{R`$\mathcal{L}$ 是 **Lagrange 密度**（Lagrangian density）。Euler–Lagrange 方程现在取如下形式：`}</Tx>
        <Eq n="1.208" title="场的 Euler–Lagrange 方程" say={R`场的 Euler–Lagrange 方程：\eqref{1.5} 中的时间导数换成对所有时空坐标的散度。`}>{R`\frac{\partial}{\partial x^\mu}\left(\frac{\partial\mathcal{L}}{\partial(\partial_\mu\phi)}\right)-\frac{\partial\mathcal{L}}{\partial\phi}=0.`}</Eq>
        <Tx>{R`（推导与 \eqref{1.4} 完全相同：对 $\delta\phi$ 变分，分部积分，边界项因 $\delta\phi$ 在无穷远为零而消失。）自由标量场的 Lagrange 密度为（度规 $\eta=\mathrm{diag}(-1,1,1,1)$）`}</Tx>
        <Eq n="1.209" say={R`自由实标量场的 Lagrange 密度：动能项减去梯度能与质量项（用度规 $(-,+,+,+)$ 写成协变形式）。`}>{R`\mathcal{L}_0(\phi,\partial_\mu\phi)=-\tfrac12(\partial_\mu\phi\partial^\mu\phi+m^2\phi^2).`}</Eq>
        <Tx>{R`由它导出的 Euler–Lagrange 方程是 **Klein–Gordon 方程**`}</Tx>
        <Eq n="1.210" title="Klein–Gordon 方程" say={R`Klein–Gordon 方程：相对论性的波动方程，平面波解满足 $E^2=\boldsymbol{k}^2+m^2$。`}>{R`(\square-m^2)\phi=0,`}</Eq>
        <Tx>{R`其中 $\square=\partial^\mu\partial_\mu=-\partial_0^2+\nabla^2$。（由 \eqref{1.208}：$\partial\mathcal{L}_0/\partial(\partial_\mu\phi)=-\partial^\mu\phi$，$\partial\mathcal{L}_0/\partial\phi=-m^2\phi$，故 $-\square\phi+m^2\phi=0$。）

**生成泛函。**有源 $J$ 时，真空到真空的振幅有路径积分表示 $\langle0,\infty|0,-\infty\rangle^J\propto Z_0[J]$，其中`}</Tx>
        <Eq n="1.211" title="自由标量场的生成泛函" say={R`自由场的生成泛函：对所有场位形求 $\mathrm{e}^{\mathrm{i}S}$ 之和，加源 $J\phi$；$\mathrm{i}\varepsilon$ 项使积分收敛并选出 Feynman 边界条件。`}>{R`Z_0[J]=\int\mathcal{D}\phi\exp\left[\mathrm{i}\int\dd x\left(\mathcal{L}_0+J\phi+\frac{\mathrm{i}}{2}\varepsilon\phi^2\right)\right]`}</Eq>
        <Tx>{R`这里加上 $\mathrm{i}\varepsilon$ 项是为了正规化路径积分（$\mathrm{i}\cdot\tfrac{\mathrm{i}}{2}\varepsilon\phi^2=-\tfrac12\varepsilon\phi^2$ 给出衰减因子；也可以改用虚时间 $\tau=\mathrm{i}x^0$ 作 Wick 转动）。分部积分得`}</Tx>
        <Eq n="1.212" say={R`分部积分后，作用量写成场的二次型 $\tfrac12\phi(\square-m^2+\mathrm{i}\varepsilon)\phi$ 加源项。`}>{R`Z_0[J]=\int\mathcal{D}\phi\exp\left[\mathrm{i}\int\dd x\,(\tfrac12\{\phi(\square-m^2)\phi+\mathrm{i}\varepsilon\phi^2\}+J\phi)\right].`}</Eq>
        <Tx>{R`设 $\phi_{\rm c}$ 是有源时 Klein–Gordon 方程的经典解：`}</Tx>
        <Eq n="1.213" say={R`有源的经典场方程：源 $J$ 激发出经典场 $\phi_{\rm c}$。`}>{R`(\square-m^2+\mathrm{i}\varepsilon)\phi_{\rm c}=-J.`}</Eq>
        <Tx>{R`其解很容易求得：`}</Tx>
        <Eq n="1.214" say={R`经典解 = 传播子与源的卷积：每一点的源通过 $\Delta$ 向外"传播"。`}>{R`\phi_{\rm c}(x)=-\int\dd y\,\Delta(x-y)J(y)`}</Eq>
        <Tx>{R`其中 $\Delta(x-y)$ 是 **Feynman 传播子**`}</Tx>
        <Eq n="1.215" title="Feynman 传播子" say={R`Feynman 传播子：$\square-m^2$ 的逆（Green 函数）在动量空间就是 $-1/(k^2+m^2-\mathrm{i}\varepsilon)$。`}>{R`\Delta(x-y)=\frac{-1}{(2\pi)^d}\int\dd^dk\,\frac{\mathrm{e}^{\mathrm{i}k(x-y)}}{k^2+m^2-\mathrm{i}\varepsilon}.`}</Eq>
        <Tx>{R`$d$ 表示时空维数。注意 $\Delta(x-y)$ 满足

$$(\square-m^2+\mathrm{i}\varepsilon)\Delta(x-y)=\delta^d(x-y)$$

（$(\square-m^2+\mathrm{i}\varepsilon)\mathrm{e}^{\mathrm{i}kx}=-(k^2+m^2-\mathrm{i}\varepsilon)\mathrm{e}^{\mathrm{i}kx}$，与分母相消，余下 $\int\dd^dk\,\mathrm{e}^{\mathrm{i}k(x-y)}/(2\pi)^d=\delta^d(x-y)$）。容易证明（原书留作习题）泛函 $Z_0[J]$ 现在写成`}</Tx>
        <Eq n="1.216" title="自由场生成泛函的显式形式" say={R`自由场的生成泛函是源的 Gauss 型泛函：源与源之间通过传播子相互作用。`}>{R`Z_0[J]=Z_0[0]\exp\left[-\frac{\mathrm{i}}{2}\int\dd x\,\dd y\,J(x)\Delta(x-y)J(y)\right].`}</Eq>
        <Derivation title={R`证明 \eqref{1.216}：平移到经典解`} collapsed steps={[
          { tex: R`\phi=\phi_{\rm c}+\varphi,\qquad\mathcal{D}\phi=\mathcal{D}\varphi`, why: R`平移不改变测度（与 \eqref{1.139} 同理）。记 $K=\square-m^2+\mathrm{i}\varepsilon$，它在分部积分下是对称的。` },
          { tex: R`\tfrac12\phi K\phi+J\phi=\tfrac12\varphi K\varphi+\varphi(K\phi_{\rm c}+J)+\tfrac12\phi_{\rm c}K\phi_{\rm c}+J\phi_{\rm c}`, why: R`展开（积分号下，$\int\phi_{\rm c}K\varphi=\int\varphi K\phi_{\rm c}$）。` },
          { tex: R`=\tfrac12\varphi K\varphi+\tfrac12J\phi_{\rm c}`, why: R`由 \eqref{1.213}，$K\phi_{\rm c}=-J$：线性项消失，$\tfrac12\phi_{\rm c}(-J)+J\phi_{\rm c}=\tfrac12J\phi_{\rm c}$。` },
          { tex: R`\mathrm{i}\int\dd x\,\tfrac12J\phi_{\rm c}=-\frac{\mathrm{i}}{2}\int\dd x\,\dd y\,J(x)\Delta(x-y)J(y)`, why: R`代入 \eqref{1.214}。` },
          { tex: R`Z_0[J]=\mathrm{e}^{-\frac{\mathrm{i}}2\int J\Delta J}\int\mathcal{D}\varphi\,\mathrm{e}^{\mathrm{i}\int\frac12\varphi K\varphi}=\mathrm{e}^{-\frac{\mathrm{i}}2\int J\Delta J}Z_0[0]`, why: R`剩下的路径积分与 $J$ 无关，正是 $Z_0[0]$。` },
        ]} />
        <Tx>{R`反过来，传播子可以由 $Z_0[J]$ 的泛函导数得到，这一点很有启发性：`}</Tx>
        <Eq n="1.217" say={R`传播子 = 生成泛函对源的二阶泛函导数（归一化后乘 $\mathrm{i}$），即两点编时关联函数。`}>{R`\Delta(x-y)=\frac{\mathrm{i}}{Z_0[0]}\left.\frac{\delta^2Z_0[J]}{\delta J(x)\delta J(y)}\right|_{J=0}.`}</Eq>
        <Tx>{R`（由 \eqref{1.216}：二阶导数在 $J=0$ 处为 $-\mathrm{i}\Delta(x-y)Z_0[0]$，乘 $\mathrm{i}/Z_0[0]$ 即得。对照 \eqref{1.129}，这说明 $\langle0|T[\phi(x)\phi(y)]|0\rangle=\mathrm{i}\Delta(x-y)$。）

振幅 $Z_0[0]$ 是没有源时真空到真空的振幅，计算如下。引入虚时间 $x^4=\tau=\mathrm{i}x^0$，得`}</Tx>
        <Eq n="1.218" title="自由场的真空振幅" say={R`没有源时的真空振幅是 Klein–Gordon 算符函数行列式的 $-1/2$ 次方（\eqref{1.154} 的场论版）。`}>{R`Z_0[0]=\int\bar{\mathcal{D}}\phi\exp\left[\tfrac12\int\dd x\,\phi(\bar\square-m^2)\phi\right]=[\operatorname{Det}(\bar\square-m^2)]^{-1/2},`}</Eq>
        <Tx>{R`其中 $\bar\square=\partial_\tau^2+\nabla^2$，行列式按 §1.4 的意义理解，即在适当边界条件下本征值之积（由于 $-\bar\square+m^2$ 是正算符，$\operatorname{Det}(\bar\square-m^2)$ 中的整体符号被吸收进归一化）。

**复标量场。**自由复标量场的 Lagrange 密度为（含源项）`}</Tx>
        <Eq n="1.219" say={R`自由复标量场：$\phi$ 与 $\phi^*$ 看作独立变量，各自耦合一个源。`}>{R`\mathcal{L}_0=-\partial_\mu\phi^*\partial^\mu\phi-m^2|\phi|^2+J\phi^*+J^*\phi`}</Eq>
        <Tx>{R`生成泛函为`}</Tx>
        <Eq n="1.220" say={R`复标量场的生成泛函：对 $\phi$ 与 $\phi^*$ 的路径积分，二次型算符仍是 $\square-m^2+\mathrm{i}\varepsilon$。`}>{R`\begin{aligned}Z_0[J,J^*]&=\int\mathcal{D}\phi\mathcal{D}\phi^*\exp\left[\mathrm{i}\int\dd x\,(\mathcal{L}_0+\mathrm{i}\varepsilon|\phi|^2)\right]\\&=\int\mathcal{D}\phi\mathcal{D}\phi^*\exp\left[\mathrm{i}\int\dd x\,\{\phi^*(\square-m^2+\mathrm{i}\varepsilon)\phi+J^*\phi+J\phi^*\}\right].\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.220} 与 \eqref{1.224} 中 $\mathrm{i}\varepsilon$ 项的符号`}>{R`原书 \eqref{1.220} 第一行写作 $\mathcal{L}_0-\mathrm{i}\varepsilon|\phi|^2$：乘以 $\mathrm{i}$ 后得到 $+\varepsilon|\phi|^2$，会使路径积分发散，也与第二行的 $\phi^*(\square-m^2+\mathrm{i}\varepsilon)\phi$ 不符（对比实标量场 \eqref{1.211} 的 $+\tfrac{\mathrm{i}}2\varepsilon\phi^2$）。应为 $+\mathrm{i}\varepsilon|\phi|^2$。同样，\eqref{1.224} 第一行原书写作 $\exp[-\mathrm{i}\int\phi^*(\square-m^2-\mathrm{i}\varepsilon)\phi]$，与 \eqref{1.220} 在 $J=J^*=0$ 时的形式不一致，应为 $\exp[\mathrm{i}\int\phi^*(\square-m^2+\mathrm{i}\varepsilon)\phi]$。两处已改正，结论 $Z_0[0,0]=[\operatorname{Det}(\bar\square-m^2)]^{-1}$ 不变。`}</Box>
        <Tx>{R`传播子现在由下式给出：`}</Tx>
        <Eq n="1.221" say={R`复标量场的传播子：对 $J^*$ 与 $J$ 各求一次泛函导数。`}>{R`\Delta(x-y)=\frac{\mathrm{i}}{Z_0[0,0]}\left.\frac{\delta^2Z_0[J,J^*]}{\delta J^*(x)\delta J(y)}\right|_{J=J^*=0}.`}</Eq>
        <Tx>{R`代入 Klein–Gordon 方程`}</Tx>
        <Eq n="1.222" say={R`复标量场的经典解满足的方程：$\phi_{\rm c}$ 由 $J$ 激发，$\phi_{\rm c}^*$ 由 $J^*$ 激发。`}>{R`(\square-m^2)\phi_{\rm c}=-J\qquad(\square-m^2)\phi_{\rm c}^*=-J^*`}</Eq>
        <Tx>{R`就把生成泛函分离为`}</Tx>
        <Eq n="1.223" say={R`复场的生成泛函：没有 \eqref{1.216} 中的 $\tfrac12$，因为 $J^*$ 与 $J$ 是两个独立的源。`}>{R`Z_0[J,J^*]=Z_0[0,0]\exp\left[-\mathrm{i}\int\dd x\,\dd y\,J^*(x)\Delta(x-y)J(y)\right]`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="1.224" say={R`复标量场的真空振幅是行列式的 $-1$ 次方——一个复场 = 两个实场（对照习题 1.5 (2)）。`}>{R`Z_0[0,0]=\int\mathcal{D}\phi\,\mathcal{D}\phi^*\exp\left[\mathrm{i}\int\dd x\,\phi^*(\square-m^2+\mathrm{i}\varepsilon)\phi\right]=[\operatorname{Det}(\bar\square-m^2)]^{-1}.`}</Eq>
        <Tx>{R`最后一步作了 Wick 转动。`}</Tx>
      </Sub>

      <Sub n="1.6.2" title="Interacting scalar field" zh="相互作用标量场">
        <Tx>{R`可以在自由场 Lagrange 密度 \eqref{1.209} 上加入相互作用项：`}</Tx>
        <Eq n="1.225" say={R`相互作用场论：自由 Lagrange 密度减去势 $V(\phi)$。`}>{R`\mathcal{L}(\phi,\partial_\mu\phi)=\mathcal{L}_0(\phi,\partial_\mu\phi)-V(\phi).`}</Eq>
        <Tx>{R`$V(\phi)$ 的可能形式受理论的对称性与可重整性限制。$V$ 的典型形式是多项式

$$V(\phi)=\frac{g}{n!}\phi^n\qquad(n\ge3,\ n\in\mathbb{N}),$$

常数 $g\in\mathbb{R}$ 控制相互作用的强度。生成泛函与自由理论类似地定义为`}</Tx>
        <Eq n="1.226" say={R`相互作用场论的生成泛函：作用量中多了 $-V(\phi)$。`}>{R`Z[J]=\int\mathcal{D}\phi\exp\left[\mathrm{i}\int\dd x\,\{\tfrac12\phi(\square-m^2)\phi-V(\phi)+J\phi\}\right].`}</Eq>
        <Tx>{R`$V(\phi)$ 的存在使事情稍微复杂一些，但至少可以微扰地处理：`}</Tx>
        <Eq n="1.227" title="微扰展开" say={R`相互作用的生成泛函 = 把 $V$ 中的场换成 $\tfrac1{\mathrm{i}}\delta/\delta J$ 作用在自由生成泛函上，再按 $V$ 的次数展开——这就是 Feynman 图展开的来源。`}>{R`\begin{aligned}Z[J]&=\int\mathcal{D}\phi\exp\left[-\mathrm{i}\int\dd x\,V(\phi)\right]\exp\left[\mathrm{i}\int\dd x\,\{\mathcal{L}_0+J\phi\}\right]\\&=\exp\left[-\mathrm{i}\int\dd x\,V\left(\frac1{\mathrm{i}}\frac{\delta}{\delta J(x)}\right)\right]\int\mathcal{D}\phi\exp\left[\mathrm{i}\int\dd x\,\{\mathcal{L}_0+J\phi\}\right]\\&=\exp\left[-\mathrm{i}\int\dd x\,V\left(\frac1{\mathrm{i}}\frac{\delta}{\delta J(x)}\right)\right]Z_0[J]\\&=\sum_{k=0}^\infty\int\dd x_1\ldots\int\dd x_k\frac{(-\mathrm{i})^k}{k!}\times V\left(\frac1{\mathrm{i}}\frac{\delta}{\delta J(x_1)}\right)\ldots V\left(\frac1{\mathrm{i}}\frac{\delta}{\delta J(x_k)}\right)Z_0[J].\end{aligned}`}</Eq>
        <Tx>{R`（第二行的关键：$\tfrac1{\mathrm{i}}\tfrac{\delta}{\delta J(x)}$ 作用在 $\mathrm{e}^{\mathrm{i}\int J\phi}$ 上恰好"拉下"一个 $\phi(x)$，所以任何 $\phi$ 的函数都可以换成源导数的函数，提到路径积分之外。）

生成泛函 $Z[J]$ 生成场算符 $T$ 乘积的真空期望值，也称为 **Green 函数** $G_n(x_1,\ldots,x_n)$：`}</Tx>
        <Eq n="1.228" title="Green 函数" say={R`$n$ 点 Green 函数 = 场的编时乘积的真空期望值 = 生成泛函的 $n$ 阶泛函导数（\eqref{1.129} 的场论版）。`}>{R`G_n(x_1,\ldots,x_n)\equiv\langle0|T[\phi(x_1)\ldots\phi(x_n)]|0\rangle=\left.\frac{(-\mathrm{i})^n\delta^n}{\delta J(x_1)\ldots\delta J(x_n)}Z[J]\right|_{J=0}.`}</Eq>
        <Tx>{R`由于这是 $Z[J]$ 在 $J=0$ 附近的 $n$ 阶泛函导数，得到 $Z[J]$ 的泛函 Taylor 展开`}</Tx>
        <Eq n="1.229" say={R`生成泛函的泛函 Taylor 展开：各阶系数就是 Green 函数；整体可写成 $\mathrm{e}^{\mathrm{i}\int J\phi}$ 的编时真空期望值。`}>{R`Z[J]=\sum_{n=0}^\infty\frac{\mathrm{i}^n}{n!}\left[\prod_{i=1}^n\int\dd x_i\,J(x_i)\right]\langle0|T[\phi(x_1)\ldots\phi(x_n)]|0\rangle=\langle0|T\mathrm{e}^{\mathrm{i}\int\dd x\,J(x)\phi(x)}|0\rangle.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.229}`}>{R`原书印作 $Z[J]=\sum_{n=1}^\infty\tfrac1{n!}[\prod\int\dd x_iJ(x_i)]\langle0|T[\phi\ldots\phi]|0\rangle=\langle0|T\mathrm{e}^{\int\dd x\,J\phi}|0\rangle$。与 \eqref{1.228} 相容要求每一项带 $\mathrm{i}^n$（因为 $\delta^nZ/\delta J^n|_0=\mathrm{i}^nG_n$），求和应从 $n=0$ 开始（$Z[0]=1$ 那一项），指数中应为 $\mathrm{i}\int J\phi$（与 \eqref{1.211} 的源项 $\mathrm{e}^{\mathrm{i}\int J\phi}$ 一致）。已改正。`}</Box>
        <Tx>{R`**连通函数与有效作用量。**连通 $n$ 点函数由 $W[J]$ 生成，定义为`}</Tx>
        <Eq n="1.230" say={R`连通图的生成泛函 $W$ 是 $Z$ 的对数（取 Euclid 约定的符号）：非连通图是连通图的乘积，取对数后只剩连通部分。`}>{R`Z[J]=\mathrm{e}^{-W[J]}.`}</Eq>
        <Tx>{R`**有效作用量**（effective action）$\Gamma[\phi_{\rm cl}]$ 由 Legendre 变换定义：`}</Tx>
        <Eq n="1.231" say={R`有效作用量：$W[J]$ 对源的 Legendre 变换，自变量从源 $J$ 换成场的期望值 $\phi_{\rm cl}$——与 \eqref{1.15} 从 $\dot q$ 换到 $p$ 如出一辙。`}>{R`\Gamma[\phi_{\rm cl}]\equiv W[J]-\int\dd\tau\,\dd\boldsymbol{x}\,J\phi_{\rm cl}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="1.232" say={R`经典场 = 有源时场的期望值 = $W$ 对源的泛函导数。`}>{R`\phi_{\rm cl}\equiv\langle\phi\rangle^J=\frac{\delta W[J]}{\delta J}.`}</Eq>
        <Tx>{R`泛函 $\Gamma[\phi_{\rm cl}]$ 生成**单粒子不可约**（one-particle irreducible，1PI）图。（这几式取的是 Euclid 约定：$Z=\int\bar{\mathcal{D}}\phi\,\mathrm{e}^{-S_E+\int J\phi}$。严格地说，按这个约定 $\langle\phi\rangle^J=\delta\log Z/\delta J=-\delta W/\delta J$；不同文献对 $W$ 的符号取法不同，原书在此未加区分，我们照录并提醒读者注意。）`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec17() {
  return (
    <Sec n="1.7" title="Quantization of a Dirac field" zh="Dirac 场的量子化"
      gist={R`Dirac 场满足反对易关系，所以在路径积分中是 Grassmann 值的函数。生成泛函是 Grassmann Gauss 积分：$Z_0[\bar\eta,\eta]=Z_0[0,0]\exp[-\mathrm{i}\int\bar\eta S\eta]$，而真空振幅是 Dirac 算符的**行列式**（不是行列式的倒数）$Z_0[0,0]=\operatorname{Det}(\mathrm{i}\partial\!\!\!/-m)$。`}
      why={R`费米子行列式 $\operatorname{Det}(\mathrm{i}\partial\!\!\!/-m)$——更准确地说，与规范场耦合时的 $\operatorname{Det}(\mathrm{i}\nabla\!\!\!\!/)$——是第 12 章指标定理与第 13 章反常的主角：反常就是这个行列式的相位在规范变换下不能保持不变。`}
      gives={["1.233", "1.234", "1.236", "1.237", "1.239", "1.240"]}>
      <p className="muted">本节概念：<C id="fermion_det" /> · <C id="path_integral" /></p>
      <Tx>{R`自由 **Dirac 场** $\psi$ 的 Lagrange 密度为`}</Tx>
      <Eq n="1.233" say={R`自由 Dirac 场的 Lagrange 密度：$\bar\psi$ 与 $\psi$ 之间夹 Dirac 算符。`}>{R`\mathcal{L}_0=\bar\psi(\mathrm{i}\partial\!\!\!/-m)\psi,`}</Eq>
      <Tx>{R`其中 $\partial\!\!\!/=\gamma^\mu\partial_\mu$。一般地 $A\!\!\!/\equiv\gamma^\mu A_\mu$。对 $\bar\psi$ 变分得到 **Dirac 方程**`}</Tx>
      <Eq n="1.234" title="Dirac 方程" say={R`Dirac 方程：一阶的相对论性波动方程，作用两次（适当约定下）回到 Klein–Gordon 方程。`}>{R`(\mathrm{i}\partial\!\!\!/-m)\psi=0.`}</Eq>
      <Tx>{R`在正则量子化中，Dirac 场满足反对易关系`}</Tx>
      <Eq n="1.235" say={R`Dirac 场的等时反对易关系：费米场是 \eqref{1.167} 的无穷多自由度版本。`}>{R`\{\bar\psi(x^0,\boldsymbol{x}),\psi(x^0,\boldsymbol{y})\}=\delta(\boldsymbol{x}-\boldsymbol{y}).`}</Eq>
      <Tx>{R`（原书此处的写法省略了旋量指标与 $\gamma^0$ 因子；标准形式是 $\{\psi_a(x^0,\boldsymbol{x}),\psi_b^\dagger(x^0,\boldsymbol{y})\}=\delta_{ab}\delta(\boldsymbol{x}-\boldsymbol{y})$。）因此在路径积分中它表示为 Grassmann 数值的函数。生成泛函为`}</Tx>
      <Eq n="1.236" title="Dirac 场的生成泛函" say={R`Dirac 场的生成泛函：对 Grassmann 值的场 $\psi,\bar\psi$ 做路径积分，源 $\eta,\bar\eta$ 也是 Grassmann 的。`}>{R`Z_0[\bar\eta,\eta]=\int\mathcal{D}\bar\psi\mathcal{D}\psi\exp\left[\mathrm{i}\int\dd x\,\left(\bar\psi(\mathrm{i}\partial\!\!\!/-m)\psi+\bar\psi\eta+\bar\eta\psi\right)\right]`}</Eq>
      <Tx>{R`其中 $\eta$、$\bar\eta$ 是 Grassmann 源。传播子由对源的泛函导数给出：`}</Tx>
      <Eq n="1.237" say={R`Dirac 传播子：对两个 Grassmann 源求导；它是 Dirac 算符的逆，可写成 $(\mathrm{i}\partial\!\!\!/+m)$ 作用在标量传播子上。`}>{R`\begin{aligned}S(x-y)&=-\frac{\delta^2Z_0[\bar\eta,\eta]}{\delta\bar\eta(x)\delta\eta(y)}\\&=\frac{1}{(2\pi)^d}\int\dd^dk\,\frac{\mathrm{e}^{\mathrm{i}k(x-y)}}{k\!\!\!/-m-\mathrm{i}\varepsilon}=(\mathrm{i}\partial\!\!\!/+m+\mathrm{i}\varepsilon)\Delta(x-y)\end{aligned}`}</Eq>
      <Box kind="warning" title={R`勘误与存疑：\eqref{1.237}`}>{R`**勘误**：原书积分中的指数印作 $\mathrm{e}^{\mathrm{i}kx}$，应为 $\mathrm{e}^{\mathrm{i}k(x-y)}$（左边依赖于 $x-y$），已改正；第一行按 \eqref{1.217} 的约定还应除以 $Z_0[0,0]$。

**存疑**：\eqref{1.237} 各项之间的符号与 $\mathrm{i}\varepsilon$ 的位置依赖于 $\gamma$ 矩阵的约定（$\{\gamma^\mu,\gamma^\nu\}=\pm2\eta^{\mu\nu}$）与 Fourier 约定；在度规 $\mathrm{diag}(-1,1,1,1)$ 下，$\partial\!\!\!/\to\mathrm{i}k\!\!\!/$，$(\mathrm{i}\partial\!\!\!/+m)$ 作用在 $\mathrm{e}^{\mathrm{i}k(x-y)}$ 上给出 $(-k\!\!\!/+m)$，要与 $1/(k\!\!\!/-m)$ 一致需要 $k\!\!\!/^2=-(k^2)$，即 $\{\gamma^\mu,\gamma^\nu\}=-2\eta^{\mu\nu}$，此时还会差一个整体符号。原书本章没有固定这些约定（\eqref{1.233} 与 \eqref{1.247} 的质量项符号也相反），本站照录原式，不作改动。结构性的结论——$S$ 是 Dirac 算符的逆、可由 $\Delta$ 得到——不受影响。`}</Box>
      <Tx>{R`其中 $\Delta(x-y)$ 是标量场的传播子。利用 Dirac 方程`}</Tx>
      <Eq n="1.238" say={R`有 Grassmann 源时的经典 Dirac 方程：$\psi$ 由 $\eta$ 激发，$\bar\psi$ 由 $\bar\eta$ 激发（箭头表示导数向左作用）。`}>{R`(\mathrm{i}\partial\!\!\!/-m)\psi=-\eta\qquad\bar\psi(\mathrm{i}\overleftarrow{\partial\!\!\!/}+m)=\bar\eta`}</Eq>
      <Tx>{R`生成泛函化为`}</Tx>
      <Eq n="1.239" say={R`自由 Dirac 场的生成泛函：Grassmann 源之间通过传播子 $S$ 耦合（\eqref{1.191} 的场论版）。`}>{R`Z_0[\bar\eta,\eta]=Z_0[0,0]\exp\left[-\mathrm{i}\int\dd x\,\dd y\,\bar\eta(x)S(x-y)\eta(y)\right].`}</Eq>
      <Tx>{R`作 Wick 转动 $\tau=\mathrm{i}x^0$ 后，归一化因子为`}</Tx>
      <Eq n="1.240" keyEq title="费米子行列式" say={R`费米场的真空振幅是 Dirac 算符的行列式（本征值之积）——与玻色场的 $(\operatorname{Det})^{-1/2}$ 或 $(\operatorname{Det})^{-1}$ 相反，这正是 Grassmann 积分 \eqref{1.187} 的结果。`}>{R`Z_0[0,0]=\operatorname{Det}(\mathrm{i}\partial\!\!\!/-m)=\prod_i\lambda_i`}</Eq>
      <Tx>{R`其中 $\lambda_i$ 是 Dirac 算符 $\mathrm{i}\partial\!\!\!/-m$ 的第 $i$ 个本征值。`}</Tx>
      <Box kind="physics" title="玻色子在分母，费米子在分子">{R`把 \eqref{1.218}、\eqref{1.224} 与 \eqref{1.240} 放在一起：实标量场贡献 $(\operatorname{Det})^{-1/2}$，复标量场贡献 $(\operatorname{Det})^{-1}$，Dirac 场贡献 $(\operatorname{Det})^{+1}$。如果一个理论中玻色与费米自由度的算符谱"配对"，这些行列式就相互抵消——超对称量子力学正是利用这一点，把 $\Tr(-1)^F\mathrm{e}^{-\beta H}$ 化为只与零模有关的整数，即第 12 章的 Atiyah–Singer 指标。`}</Box>
    </Sec>);
}
