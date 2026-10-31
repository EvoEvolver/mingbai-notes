// §7.7 Killing 向量场与共形 Killing 向量场 —— 式 (7.120a)–(7.130)，例 7.10–7.12，习题 7.17–7.18
import { Sec, Sub, Tx, Eq, Box, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec77() {
  return (
    <Sec n="7.7" title="Killing vector fields and conformal Killing vector fields" zh="Killing 向量场与共形 Killing 向量场"
      gist={R`无穷小等距 $x^\mu\to x^\mu+\varepsilon X^\mu$ ⇒ Killing 方程 $\mathcal{L}_Xg=0$，即 $\nabla_\mu X_\nu+\nabla_\nu X_\mu=0$ → Minkowski 时空有 10 个（平移、转动、boost），$m$ 维最多 $m(m+1)/2$ 个（最大对称空间）→ Killing 场构成李代数；$S^2$ 的三个 Killing 场生成 $\mathfrak{so}(3)$ → 无穷小共形变换给出共形 Killing 方程 $\mathcal{L}_Xg=\psi g$，例：伸缩场 $D=x^\mu\partial_\mu$。`}
      why={R`连续对称性的无穷小版本。每个 Killing 场给出测地线上的一个守恒量（如 \eqref{7.69} 的 $x'/y^2$），在广义相对论中对应能量、角动量；共形 Killing 场是共形场论的出发点。`}
      gives={["7.120a", "7.120b", "7.121", "7.122", "7.127", "7.128a", "7.129a", "7.129b"]}>
      <p className="muted">本节概念：<C id="killing" /></p>
      <Sub n="7.7.1" title="Killing vector fields" zh="Killing 向量场">
        <Tx>{R`设 $(M,g)$ 是 Riemann 流形，$X\in\mathcal{X}(M)$。若位移 $\varepsilon X$（$\varepsilon$ 为无穷小）生成一个等距，就称向量场 $X$ 为 **Killing 向量场**（Killing vector field）。在这个位移下，点 $p\in M$ 的坐标 $x^\mu$ 变为 $x^\mu+\varepsilon X^\mu(p)$，见 \eqref{5.42}。若 $f:x^\mu\mapsto x^\mu+\varepsilon X^\mu$ 是等距，它满足 \eqref{7.96b}：

$$\frac{\partial(x^\kappa+\varepsilon X^\kappa)}{\partial x^\mu}\frac{\partial(x^\lambda+\varepsilon X^\lambda)}{\partial x^\nu}g_{\kappa\lambda}(x+\varepsilon X)=g_{\mu\nu}(x).$$

展开到 $\varepsilon$ 的一阶（$(\delta^\kappa_\mu+\varepsilon\partial_\mu X^\kappa)(\delta^\lambda_\nu+\varepsilon\partial_\nu X^\lambda)(g_{\kappa\lambda}+\varepsilon X^\xi\partial_\xi g_{\kappa\lambda})$），零阶项两边相同，一阶项给出 **Killing 方程**`}</Tx>
        <Eq n="7.120a" title="Killing 方程" say={R`Killing 方程：度规沿 $X$ 的流不变——度规分量的变化被坐标基的变化恰好抵消。`}>{R`X^\xi\partial_\xi g_{\mu\nu}+\partial_\mu X^\kappa g_{\kappa\nu}+\partial_\nu X^\lambda g_{\mu\lambda}=0.`}</Eq>
        <Tx>{R`由李导数的定义（\eqref{5.47} 及其对 $(0,2)$ 型张量的推广），它可紧凑地写作`}</Tx>
        <Eq n="7.120b" say={R`Killing 场就是使度规的李导数为零的向量场。`}>{R`(\mathcal{L}_Xg)_{\mu\nu}=0.`}</Eq>
        <Tx>{R`设 $\phi_t:M\to M$ 是生成 Killing 场 $X$ 的单参数变换群。\eqref{7.120b} 说明沿 $\phi_t$ 移动时局部几何不变。在这个意义下，Killing 向量场代表流形的**对称方向**。

若一组 Killing 向量场中的某一个可以写成其余的**常系数**线性组合，就说它们线性相关。因此 Killing 向量场的个数可以多于流形的维数。［独立对称性的个数与 $\dim M$ 没有直接联系，但其**最大**个数有，见例 7.10。］`}</Tx>
        <Exercise n="7.17" title="Killing 方程的协变形式" level="★"
          hint={R`把 $X_\nu=g_{\nu\kappa}X^\kappa$ 代入 $\partial_\mu X_\nu+\partial_\nu X_\mu$，再用 \eqref{7.53} 写出 $2\Gamma^\lambda{}_{\mu\nu}X_\lambda$。`}
          solution={R`由 \eqref{7.24}，$(\nabla_\mu X)_\nu=\partial_\mu X_\nu-\Gamma^\lambda{}_{\mu\nu}X_\lambda$，对称化即得 \eqref{7.121} 的中间表达式（$\Gamma$ 对称）。下面证明它等于 \eqref{7.120a} 的左边。用 $X_\nu=g_{\nu\kappa}X^\kappa$：

$$\partial_\mu X_\nu+\partial_\nu X_\mu=(\partial_\mu g_{\nu\kappa}+\partial_\nu g_{\mu\kappa})X^\kappa+g_{\nu\kappa}\partial_\mu X^\kappa+g_{\mu\kappa}\partial_\nu X^\kappa,$$

$$2\Gamma^\lambda{}_{\mu\nu}X_\lambda=2g_{\lambda\kappa}\Gamma^\lambda{}_{\mu\nu}X^\kappa=(\partial_\mu g_{\kappa\nu}+\partial_\nu g_{\kappa\mu}-\partial_\kappa g_{\mu\nu})X^\kappa.$$

相减，$\partial_\mu g_{\nu\kappa}$、$\partial_\nu g_{\mu\kappa}$ 项相消，剩下

$$\partial_\mu X_\nu+\partial_\nu X_\mu-2\Gamma^\lambda{}_{\mu\nu}X_\lambda=X^\kappa\partial_\kappa g_{\mu\nu}+g_{\kappa\nu}\partial_\mu X^\kappa+g_{\mu\kappa}\partial_\nu X^\kappa=(\mathcal{L}_Xg)_{\mu\nu}.$$

所以 Killing 方程等价于 \eqref{7.121}。一般地 $(\mathcal L_Xg)_{\mu\nu}=\nabla_\mu X_\nu+\nabla_\nu X_\mu$ 对 Levi-Civita 联络成立：李导数中的偏导数可以换成无挠联络的协变导数。`}>
          {R`设 $\nabla$ 是 Levi-Civita 联络。证明 Killing 方程可写成`}
        </Exercise>
        <Eq n="7.121" keyEq title="Killing 方程（协变形式）" say={R`Killing 方程的协变形式：$X$ 的协变导数（降指标后）是反对称矩阵——无穷小等距在每点只是"转动 + 平移"。`}>{R`(\nabla_\mu X)_\nu+(\nabla_\nu X)_\mu=\partial_\mu X_\nu+\partial_\nu X_\mu-2\Gamma^\lambda{}_{\mu\nu}X_\lambda=0.`}</Eq>
        <Exercise n="7.18" title={R`$(\R^2,\delta)$ 的 Killing 向量场`} level="★"
          hint={R`$\Gamma=0$，Killing 方程为 $\partial_\mu X_\nu+\partial_\nu X_\mu=0$。先由 $\mu=\nu$ 的分量得到 $X_1$ 不依赖 $x$、$X_2$ 不依赖 $y$。`}
          solution={R`方程：$\partial_xX_x=0$，$\partial_yX_y=0$，$\partial_xX_y+\partial_yX_x=0$。前两式给出 $X_x=a(y)$、$X_y=b(x)$，第三式 $b'(x)+a'(y)=0$ 要求 $b'(x)=-a'(y)=$ 常数 $c$。于是 $a=-cy+a_0$，$b=cx+b_0$：

$$X=a_0\,\partial_x+b_0\,\partial_y+c\,(-y\,\partial_x+x\,\partial_y).$$

三个独立的 Killing 场为 $\partial_x$、$\partial_y$（两个平移）与 $-y\partial_x+x\partial_y$（绕原点的转动，正是例 5.9 的转动流的生成元）。它们的李括号：$[\partial_x,\partial_y]=0$，$[\partial_x,-y\partial_x+x\partial_y]=\partial_y$，$[\partial_y,-y\partial_x+x\partial_y]=-\partial_x$——平面 Euclid 群 $E^2$ 的李代数。个数 $3=2\cdot3/2$，$\R^2$ 是最大对称空间。`}>
          {R`求 $(\R^2,\delta)$ 的三个 Killing 向量场。证明其中两个对应平移，第三个对应转动；参看下一例。`}
        </Exercise>
        <Box kind="example" n="7.10" title="Minkowski 时空的 Killing 向量场">
          <Tx>{R`求 Minkowski 时空 $(\R^4,\eta)$ 的 Killing 向量场，那里所有 Levi-Civita 联络系数为零。Killing 方程成为`}</Tx>
          <Eq n="7.122" say={R`平直时空的 Killing 方程：$\partial_\mu X_\nu$ 关于两个指标反对称。`}>{R`\partial_\mu X_\nu+\partial_\nu X_\mu=0.`}</Eq>
          <Tx>{R`容易看出 $X_\mu$ 至多是 $x$ 的一次函数。［求导：$\partial_\lambda\partial_\mu X_\nu$ 对 $\mu\nu$ 反对称、对 $\lambda\mu$ 对称，一个对称一个反对称的三指标量轮换三次回到自身时变号，所以为零。］常数解`}</Tx>
          <Eq n="7.123a" say={R`四个常数 Killing 场：时空平移。`}>{R`X^\mu_{(i)}=\delta^\mu_i\qquad(0\le i\le3)`}</Eq>
          <Tx>{R`对应时空平移。其次设 $X_\mu=a_{\mu\nu}x^\nu$，$a_{\mu\nu}$ 为常数。\eqref{7.122} 意味着 $a_{\mu\nu}$ 关于 $\mu\leftrightarrow\nu$ 反对称。由于 $\binom42=6$，这种形式有六个独立解，其中三个`}</Tx>
          <Eq n="7.123b" say={R`三个空间转动的生成元：绕 $x^j$ 轴转动。`}>{R`X_{(j)0}=0\qquad X_{(j)m}=\varepsilon_{jmn}x^n\qquad(1\le j,m,n\le3)`}</Eq>
          <Tx>{R`对应绕 $x^j$ 轴的空间转动，另外三个`}</Tx>
          <Eq n="7.123c" say={R`三个 Lorentz boost 的生成元：时间与第 $k$ 个空间坐标"混合转动"。`}>{R`X_{(k)0}=x^k\qquad X_{(k)m}=-\delta_{km}x^0\qquad(1\le k,m\le3)`}</Eq>
          <Tx>{R`对应沿 $x^k$ 轴的 Lorentz boost。（原书写"$X_\mu=a_{\mu\nu}x^\mu$"，求和指标应为 $x^\nu$。）

在 $m$ 维 Minkowski 时空（$m\ge2$）中有 $m(m+1)/2$ 个 Killing 向量场：$m$ 个生成平移，$(m-1)$ 个生成 boost，$(m-1)(m-2)/2$ 个生成空间转动——合起来就是 Poincaré 群的李代数。具有 $m(m+1)/2$ 个 Killing 向量场的空间（时空）称为**最大对称空间**（maximally symmetric spaces）。（这是上限：Killing 场由一点处的 $X_\mu$（$m$ 个数）与反对称的 $\nabla_\mu X_\nu$（$m(m-1)/2$ 个数）完全确定。）`}</Tx>
        </Box>
        <Tx>{R`设 $X$ 与 $Y$ 是两个 Killing 向量场。容易验证：

(i) 线性组合 $aX+bY$（$a,b\in\R$）是 Killing 向量场；
(ii) 李括号 $[X,Y]$ 是 Killing 向量场。

(i) 由协变导数（或李导数对 $X$）的线性显然。证明 (ii) 要用 \eqref{5.58}：$\mathcal{L}_{[X,Y]}g=\mathcal{L}_X\mathcal{L}_Yg-\mathcal{L}_Y\mathcal{L}_Xg=0$，因为 $\mathcal{L}_Xg=\mathcal{L}_Yg=0$。于是全体 Killing 向量场构成流形 $M$ 上对称操作的李代数，见下例。`}</Tx>
        <Box kind="example" n="7.11" title={R`$S^2$ 的 Killing 向量场与 $\mathfrak{so}(3)$`}>
          <Tx>{R`设 $g=\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi$ 是 $S^2$ 的标准度规。由 \eqref{7.57}，Killing 方程 \eqref{7.121}（下指标分量 $X_\theta=X^\theta$，$X_\phi=\sin^2\theta X^\phi$）为：`}</Tx>
          <Eq n="7.124a" say={R`$\theta\theta$ 分量：$X_\theta$ 不依赖 $\theta$。`}>{R`\partial_\theta X_\theta+\partial_\theta X_\theta=0`}</Eq>
          <Eq n="7.124b" say={R`$\phi\phi$ 分量：含 $-2\Gamma^\theta{}_{\phi\phi}X_\theta$ 修正。`}>{R`\partial_\phi X_\phi+\partial_\phi X_\phi+2\sin\theta\cos\theta X_\theta=0`}</Eq>
          <Eq n="7.124c" say={R`$\theta\phi$ 分量：含 $-2\Gamma^\phi{}_{\theta\phi}X_\phi$ 修正。`}>{R`\partial_\theta X_\phi+\partial_\phi X_\theta-2\cot\theta X_\phi=0.`}</Eq>
          <Tx>{R`由 \eqref{7.124a}，$X_\theta$ 与 $\theta$ 无关：$X_\theta(\theta,\phi)=f(\phi)$。代入 \eqref{7.124b}，得`}</Tx>
          <Eq n="7.125" say={R`对 $\phi$ 积分 \eqref{7.124b}：积分"常数"是 $\theta$ 的任意函数 $g(\theta)$。`}>{R`X_\phi=-F(\phi)\sin\theta\cos\theta+g(\theta)`}</Eq>
          <Tx>{R`其中 $F(\phi)=\int^\phi f(\phi)\dd\phi$。把 \eqref{7.125} 代入 \eqref{7.124c}，得

$$-F(\phi)(\cos^2\theta-\sin^2\theta)+\frac{\dd g}{\dd\theta}+\frac{\dd f}{\dd\phi}+2\cot\theta(F(\phi)\sin\theta\cos\theta-g(\theta))=0.$$

$F$ 的项合并为 $F(-\cos^2\theta+\sin^2\theta+2\cos^2\theta)=F$，于是这个方程可以分离变量为

$$\frac{\dd g}{\dd\theta}-2\cot\theta\,g(\theta)=-\frac{\dd f}{\dd\phi}-F(\phi).$$

两边必须分别为常数（$\equiv C$）：`}</Tx>
          <Eq n="7.126a" say={R`$\theta$ 部分：一阶线性 ODE。`}>{R`\frac{\dd g}{\dd\theta}-2\cot\theta\,g(\theta)=C`}</Eq>
          <Eq n="7.126b" say={R`$\phi$ 部分：求导后给出简谐方程 $f''+f=0$。`}>{R`\frac{\dd f}{\dd\phi}+F(\phi)=-C.`}</Eq>
          <Tx>{R`两边乘 $\exp(-\int\dd\theta\,2\cot\theta)=\sin^{-2}\theta$，使 \eqref{7.126a} 左边成为全导数：

$$\frac{\dd}{\dd\theta}\left(\frac{g(\theta)}{\sin^2\theta}\right)=\frac{C}{\sin^2\theta}.$$

解容易求得：

$$g(\theta)=(C_1-C\cot\theta)\sin^2\theta.$$

再对 \eqref{7.126b} 求导（$F'=f$），得 $f''+f=0$，$f$ 是简谐函数：

$$X_\theta(\phi)=f(\phi)=A\sin\phi+B\cos\phi\qquad F(\phi)=-A\cos\phi+B\sin\phi-C.$$

把这些结果代入 \eqref{7.125}：

$$\begin{aligned}X_\phi(\theta,\phi)&=-(-A\cos\phi+B\sin\phi-C)\sin\theta\cos\theta+(C_1-C\cot\theta)\sin^2\theta\\&=(A\cos\phi-B\sin\phi)\sin\theta\cos\theta+C_1\sin^2\theta.\end{aligned}$$

一般的 Killing 向量（$X^\phi=X_\phi/\sin^2\theta$）为`}</Tx>
          <Eq n="7.127" say={R`$S^2$ 的一般 Killing 场：三个任意常数 $A,B,C_1$——三维的对称性。`}>{R`\begin{aligned}X&=X^\theta\frac{\partial}{\partial\theta}+X^\phi\frac{\partial}{\partial\phi}\\&=A\left(\sin\phi\frac{\partial}{\partial\theta}+\cos\phi\cot\theta\frac{\partial}{\partial\phi}\right)+B\left(\cos\phi\frac{\partial}{\partial\theta}-\sin\phi\cot\theta\frac{\partial}{\partial\phi}\right)+C_1\frac{\partial}{\partial\phi}.\end{aligned}`}</Eq>
          <Tx>{R`基向量`}</Tx>
          <Eq n="7.128a" say={R`绕 $x$ 轴的转动 $y\partial_z-z\partial_y$ 在球坐标中的表示：它在 $x$ 轴与球面的交点 $(\pm1,0,0)$ 处为零。`}>{R`L_x=-\sin\phi\frac{\partial}{\partial\theta}-\cot\theta\cos\phi\frac{\partial}{\partial\phi}`}</Eq>
          <Eq n="7.128b" say={R`绕 $y$ 轴的转动 $z\partial_x-x\partial_z$，在 $(0,\pm1,0)$ 处为零。`}>{R`L_y=\cos\phi\frac{\partial}{\partial\theta}-\cot\theta\sin\phi\frac{\partial}{\partial\phi}`}</Eq>
          <Eq n="7.128c" say={R`绕 $z$ 轴的转动：沿纬圈平移，$\phi$ 方向的平移对称。`}>{R`L_z=\frac{\partial}{\partial\phi}`}</Eq>
          <Tx>{R`分别生成绕 $x$、$y$、$z$ 轴的转动（它们是 \eqref{7.127} 中 $A=-1$、$B=1$、$C_1=1$ 的三个基）。`}</Tx>
          <Box kind="warning" title={R`勘误：$L_x$ 与 $L_y$ 的表达式（p.301）`}>{R`原书写 $L_x=-\cos\phi\,\partial_\theta+\cot\theta\sin\phi\,\partial_\phi$、$L_y=\sin\phi\,\partial_\theta+\cot\theta\cos\phi\,\partial_\phi$。但原书的 "$L_x$" 在 $(0,\pm1,0)$（$\theta=\pi/2$、$\phi=\pm\pi/2$）处为零、在 $(1,0,0)$ 处等于 $-\partial_\theta\neq0$，所以它生成的是绕 **$y$** 轴的转动；同理原书的 "$L_y$" 生成绕 $x$ 轴的转动——两者名称对调了（还差一个负号）。

我们按 $\R^3$ 中的转动生成元 $L_x=y\partial_z-z\partial_y$、$L_y=z\partial_x-x\partial_z$、$L_z=x\partial_y-y\partial_x$ 换到球坐标（\eqref{7.128a}–\eqref{7.128c}）。验证：在 $(0,1,0)$ 处 $y\partial_z=\partial_z=-\partial_\theta$，与 \eqref{7.128a} 在 $\phi=\pi/2$ 的值 $-\partial_\theta$ 一致。直接计算对易子：$[L_x,L_y]=-L_z$、$[L_y,L_z]=-L_x$、$[L_z,L_x]=-L_y$（向量场的括号与"$\mathrm{i}\hbar$ 角动量算符"的对易关系差一个符号约定），即 $\mathfrak{so}(3)$。正文已改正。`}</Box>
          <Tx>{R`这些向量生成李代数 $\mathfrak{so}(3)$。这反映了 $S^2$ 是齐性空间 $\mathrm{SO}(3)/\mathrm{SO}(2)$，且 $S^2$ 上的度规保持了这个 $\mathrm{SO}(3)$ 对称性（见例 5.18(a)）。一般地，带通常度规的 $S^n=\mathrm{SO}(n+1)/\mathrm{SO}(n)$ 有 $\dim\mathrm{SO}(n+1)=n(n+1)/2$ 个 Killing 向量，它们构成李代数 $\mathfrak{so}(n+1)$。带通常度规的球面 $S^n$ 是最大对称空间。我们可以把 $S^n$ **压扁**（squash）使它的对称性减少。例如，若把这里的 $S^2$ 沿 $z$ 轴压扁，它只剩绕 $z$ 轴的转动对称，只有一个 Killing 向量场 $L_z=\partial/\partial\phi$。`}</Tx>
        </Box>
      </Sub>

      <Sub n="7.7.2" title="Conformal Killing vector fields" zh="共形 Killing 向量场">
        <Tx>{R`设 $(M,g)$ 是 Riemann 流形，$X\in\mathcal{X}(M)$。若无穷小位移 $\varepsilon X$ 生成共形变换，就称向量场 $X$ 为**共形 Killing 向量场**（conformal Killing vector field，CKV）。在位移 $x^\mu\to x^\mu+\varepsilon X^\mu$ 下，这个条件写作

$$\frac{\partial(x^\kappa+\varepsilon X^\kappa)}{\partial x^\mu}\frac{\partial(x^\lambda+\varepsilon X^\lambda)}{\partial x^\nu}g_{\kappa\lambda}(x+\varepsilon X)=\mathrm{e}^{2\sigma}g_{\mu\nu}(x).$$

注意 $\sigma\propto\varepsilon$，令 $\sigma=\varepsilon\psi/2$，$\psi\in\mathcal{F}(M)$。于是 $g_{\mu\nu}$ 与 $X^\mu$ 满足`}</Tx>
        <Eq n="7.129a" title="共形 Killing 方程" say={R`共形 Killing 方程：度规沿 $X$ 的李导数正比于度规本身——只伸缩、不变形。`}>{R`\mathcal{L}_Xg_{\mu\nu}=X^\xi\partial_\xi g_{\mu\nu}+\partial_\mu X^\kappa g_{\kappa\nu}+\partial_\nu X^\lambda g_{\mu\lambda}=\psi g_{\mu\nu}.`}</Eq>
        <Tx>{R`用 $g^{\mu\nu}$ 对 \eqref{7.129a} 取迹（$g^{\mu\nu}g_{\mu\nu}=m$），立即解出 $\psi$：`}</Tx>
        <Eq n="7.129b" say={R`伸缩率 $\psi$ 由 $X$ 的"散度"决定。`}>{R`\psi=\frac{X^\xi g^{\mu\nu}\partial_\xi g_{\mu\nu}+2\partial_\mu X^\mu}{m}`}</Eq>
        <Tx>{R`其中 $m=\dim M$。（用 \eqref{7.204} 的 $g^{\mu\nu}\partial_\xi g_{\mu\nu}=\partial_\xi\ln|g|$，可写成 $\psi=\frac2m\nabla_\mu X^\mu$。）容易验证：

(i) CKV 的线性组合是 CKV：$(\mathcal{L}_{aX+bY}g)_{\mu\nu}=(a\varphi+b\psi)g_{\mu\nu}$，其中 $a,b\in\R$，$\mathcal{L}_Xg_{\mu\nu}=\varphi g_{\mu\nu}$，$\mathcal{L}_Yg_{\mu\nu}=\psi g_{\mu\nu}$；

(ii) CKV 的李括号 $[X,Y]$ 仍是 CKV：$\mathcal{L}_{[X,Y]}g_{\mu\nu}=(X[\psi]-Y[\varphi])g_{\mu\nu}$。

［(ii) 的验证：$\mathcal L_X\mathcal L_Yg=\mathcal L_X(\psi g)=X[\psi]g+\psi\varphi g$，$\mathcal L_Y\mathcal L_Xg=Y[\varphi]g+\varphi\psi g$，相减并用 \eqref{5.58}。］`}</Tx>
        <Box kind="example" n="7.12" title="伸缩向量场">
          <Tx>{R`设 $x^\mu$ 是 $(\R^m,\delta)$ 的坐标。向量`}</Tx>
          <Eq n="7.130" say={R`伸缩（dilatation）向量场：从原点向外均匀"吹气"，它的流是 $x\mapsto\mathrm{e}^tx$。`}>{R`D\equiv x^\mu\frac{\partial}{\partial x^\mu}`}</Eq>
          <Tx>{R`（**伸缩向量**，dilatation vector）是 CKV。事实上，

$$\mathcal{L}_D\delta_{\mu\nu}=\partial_\mu x^\kappa\delta_{\kappa\nu}+\partial_\nu x^\lambda\delta_{\mu\lambda}=2\delta_{\mu\nu}.$$

所以 $\psi=2$，与 \eqref{7.129b} 一致（$2\partial_\mu x^\mu/m=2$）。（$m\ge3$ 时 $\R^m$ 的 CKV 除了 Killing 场与 $D$ 之外还有 $m$ 个"特殊共形变换" $K_\nu=2x_\nu x^\mu\partial_\mu-x^2\partial_\nu$，合起来生成 $\mathrm{SO}(m+1,1)$；$m=2$ 时任何全纯函数都给出 CKV，这正是例 7.8 的无穷小版本，也是二维共形场论威力的来源。）`}</Tx>
        </Box>
      </Sub>
    </Sec>);
}
