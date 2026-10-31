// §7.3 曲率与挠率 —— 式 (7.36)–(7.51)，例 7.2，习题 7.7，图 7.2–7.5
import { Sec, Sub, Tx, Eq, Box, Figure, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec73() {
  return (
    <Sec n="7.3" title="Curvature and torsion" zh="曲率与挠率"
      gist={R`$\Gamma$ 不是张量，不能刻画内禀几何 → 用联络构造两个真正的张量：挠率 $T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$ 与曲率 $R(X,Y)Z=[\nabla_X,\nabla_Y]Z-\nabla_{[X,Y]}Z$ → 分量 \eqref{7.41}、\eqref{7.42} → 几何意义：曲率 = 沿两条路径平行移动的差（\eqref{7.44}），挠率 = 无穷小平行四边形不闭合（\eqref{7.45}）→ 可平行化流形（$S^3$、李群）有挠率无曲率 → 缩并得 Ricci 张量与标量曲率。`}
      why={R`在极坐标里 $\Gamma\neq0$ 而平面是平的；我们需要不依赖坐标的"弯曲程度"。曲率是广义相对论里引力的真身（潮汐力），挠率则在 Einstein–Cartan 理论与可平行化流形中出现。`}
      gives={["7.36", "7.37", "7.39", "7.41", "7.42", "7.44", "7.45", "7.50b", "7.51"]}>
      <p className="muted">本节概念：<C id="curvature" /></p>
      <Sub n="7.3.1" title="Definitions" zh="定义">
        <Tx>{R`$\Gamma$ 不是张量，不可能具有内禀的几何意义来度量流形弯曲了多少。例如例 7.1 的联络系数在 Cartesian 坐标中为零，在极坐标中却不为零。作为内禀的对象，我们定义**挠率张量**（torsion tensor）$T:\mathcal{X}(M)\otimes\mathcal{X}(M)\to\mathcal{X}(M)$ 与 **Riemann 曲率张量**（Riemann curvature tensor，简称 Riemann 张量）$R:\mathcal{X}(M)\otimes\mathcal{X}(M)\otimes\mathcal{X}(M)\to\mathcal{X}(M)$：`}</Tx>
        <Eq n="7.36" title="挠率张量" say={R`挠率：沿 $X$ 求 $Y$ 的协变导数减去沿 $Y$ 求 $X$ 的，再减去李括号。若联络"对称"，这三者恰好相消。`}>{R`T(X,Y)\equiv\nabla_XY-\nabla_YX-[X,Y]`}</Eq>
        <Eq n="7.37" keyEq title="Riemann 曲率张量" say={R`曲率：两个协变导数的对易子，再扣除 $[X,Y]$ 方向的导数——协变导数不可交换的程度。`}>{R`R(X,Y,Z)\equiv\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z.`}</Eq>
        <Tx>{R`通常把 $R(X,Y,Z)$ 写成 $R(X,Y)Z$，使 $R$ 看起来像作用在 $Z$ 上的算子。显然它们满足`}</Tx>
        <Eq n="7.38" say={R`挠率与曲率都对前两个向量反对称。`}>{R`T(X,Y)=-T(Y,X),\qquad R(X,Y)Z=-R(Y,X)Z.`}</Eq>
        <Tx>{R`乍看之下 $T$ 与 $R$ 是微分算子，它们是否多重线性并不明显。我们来证明 $R$ 的张量性（对 $f,g,h\in\mathcal{F}(M)$）：

$$\begin{aligned}R(fX,gY)hZ&=f\nabla_X\{g\nabla_Y(hZ)\}-g\nabla_Y\{f\nabla_X(hZ)\}-fX[g]\nabla_Y(hZ)\\&\quad+gY[f]\nabla_X(hZ)-fg\nabla_{[X,Y]}(hZ)\\&=fg\nabla_X\{Y[h]Z+h\nabla_YZ\}-gf\nabla_Y\{X[h]Z+h\nabla_XZ\}\\&\quad-fg[X,Y][h]Z-fgh\nabla_{[X,Y]}Z\\&=fgh\{\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z\}\\&=fgh\,R(X,Y)Z.\end{aligned}$$

（第一个等号用 $[fX,gY]=fg[X,Y]+fX[g]Y-gY[f]X$ 与 \eqref{7.13c}；$fX[g]\nabla_Y$ 与 $gY[f]\nabla_X$ 两项正好抵消 $\nabla_X$、$\nabla_Y$ 落在 $g$、$f$ 上的导数。第二个等号后，$fg\{X[Y[h]]-Y[X[h]]\}Z=fg[X,Y][h]Z$ 抵消，各含一个 $h$ 导数的交叉项也成对抵消。）于是容易看出 $R$ 满足`}</Tx>
        <Eq n="7.39" say={R`曲率对三个变量都是函数线性的，所以只需知道它在基向量上的值：$R$ 是真正的张量，与求导的"路径"无关。`}>{R`R(X,Y)Z=X^\lambda Y^\mu Z^\nu R(e_\lambda,e_\mu)e_\nu`}</Eq>
        <Tx>{R`这就验证了 $R$ 的张量性。$R$ 把三个向量场映成一个向量场，所以是 $(1,3)$ 型张量场。`}</Tx>
        <Exercise n="7.7" title="挠率是张量" level="★"
          hint={R`只需证明 $T(fX,Y)=fT(X,Y)$；对 $Y$ 的线性由反对称性 \eqref{7.38} 得到。用 $[fX,Y]=f[X,Y]-Y[f]X$。`}
          solution={R`可加性显然（$\nabla$ 与李括号都双线性）。对 $f\in\mathcal{F}(M)$：

$$\begin{aligned}T(fX,Y)&=\nabla_{fX}Y-\nabla_Y(fX)-[fX,Y]\\&=f\nabla_XY-\big(Y[f]X+f\nabla_YX\big)-\big(f[X,Y]-Y[f]X\big)\\&=f\big(\nabla_XY-\nabla_YX-[X,Y]\big)=fT(X,Y).\end{aligned}$$

这里用了 \eqref{7.13c}、\eqref{7.13d} 以及 $[fX,Y]=f[X,Y]-Y[f]X$。由反对称性 $T(X,fY)=-T(fY,X)=-fT(Y,X)=fT(X,Y)$。所以 $T$ 对两个变量都函数线性，展开 $X=X^\mu e_\mu$、$Y=Y^\nu e_\nu$ 即得 \eqref{7.40}；$T$ 吃两个向量吐一个向量，是 $(1,2)$ 型张量场。

注意单独的 $\nabla_XY-\nabla_YX$ 或 $[X,Y]$ 都**不是**张量（各自多出 $\pm Y[f]X$），正是两者之差使非张量部分抵消。`}>
          {R`证明 \eqref{7.36} 定义的 $T$ 是多重线性的，`}
        </Exercise>
        <Eq n="7.40" say={R`挠率对两个变量都函数线性：它是 $(1,2)$ 型张量。`}>{R`T(X,Y)=X^\mu Y^\nu T(e_\mu,e_\nu)`}</Eq>
        <Tx>{R`因而是 $(1,2)$ 型张量场。

$T$ 与 $R$ 既然是张量，只要知道它们在基向量上的作用，就知道它们对任意向量的作用。在坐标基 $\{e_\mu\}$ 与对偶基 $\{\dd x^\mu\}$ 下，这些张量的分量为（坐标基向量的李括号为零）`}</Tx>
        <Eq n="7.41" say={R`挠率的分量就是联络系数关于两个下指标的反对称部分（的两倍）：联络对称当且仅当无挠。`}>{R`\begin{aligned}T^\lambda{}_{\mu\nu}&=\langle\dd x^\lambda,T(e_\mu,e_\nu)\rangle=\langle\dd x^\lambda,\nabla_\mu e_\nu-\nabla_\nu e_\mu\rangle\\&=\langle\dd x^\lambda,\Gamma^\eta{}_{\mu\nu}e_\eta-\Gamma^\eta{}_{\nu\mu}e_\eta\rangle=\Gamma^\lambda{}_{\mu\nu}-\Gamma^\lambda{}_{\nu\mu}\end{aligned}`}</Eq>
        <Tx>{R`以及`}</Tx>
        <Eq n="7.42" keyEq title="Riemann 张量的分量" say={R`曲率的分量：$\Gamma$ 的"旋度"（两项导数之差）加上 $\Gamma$ 的"对易子"（两项乘积之差）——与规范场强 $F=\partial A-\partial A+[A,A]$ 结构完全相同。`}>{R`\begin{aligned}R^\kappa{}_{\lambda\mu\nu}&=\langle\dd x^\kappa,R(e_\mu,e_\nu)e_\lambda\rangle=\langle\dd x^\kappa,\nabla_\mu\nabla_\nu e_\lambda-\nabla_\nu\nabla_\mu e_\lambda\rangle\\&=\langle\dd x^\kappa,\nabla_\mu(\Gamma^\eta{}_{\nu\lambda}e_\eta)-\nabla_\nu(\Gamma^\eta{}_{\mu\lambda}e_\eta)\rangle\\&=\langle\dd x^\kappa,(\partial_\mu\Gamma^\eta{}_{\nu\lambda})e_\eta+\Gamma^\eta{}_{\nu\lambda}\Gamma^\xi{}_{\mu\eta}e_\xi-(\partial_\nu\Gamma^\eta{}_{\mu\lambda})e_\eta-\Gamma^\eta{}_{\mu\lambda}\Gamma^\xi{}_{\nu\eta}e_\xi\rangle\\&=\partial_\mu\Gamma^\kappa{}_{\nu\lambda}-\partial_\nu\Gamma^\kappa{}_{\mu\lambda}+\Gamma^\eta{}_{\nu\lambda}\Gamma^\kappa{}_{\mu\eta}-\Gamma^\eta{}_{\mu\lambda}\Gamma^\kappa{}_{\nu\eta}.\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.42} 第二行的 $\Gamma^\eta{}_{\mu\lambda}$（p.275）`}>{R`原书第二行印作 $\nabla_\nu(\Gamma^\eta{}_{\mu\nu}e_\eta)$。由第一行 $\nabla_\nu\nabla_\mu e_\lambda=\nabla_\nu(\Gamma^\eta{}_{\mu\lambda}e_\eta)$，下标应为 $\mu\lambda$（第三行原书已写对 $\partial_\nu\Gamma^\eta{}_{\mu\lambda}$）。正文已改正。`}</Box>
        <Tx>{R`立即得到（参看 \eqref{7.38}）`}</Tx>
        <Eq n="7.43" say={R`分量形式的反对称性：挠率对两个下指标、曲率对最后两个指标反对称。`}>{R`T^\lambda{}_{\mu\nu}=-T^\lambda{}_{\nu\mu}\qquad R^\kappa{}_{\lambda\mu\nu}=-R^\kappa{}_{\lambda\nu\mu}.`}</Eq>
      </Sub>

      <Sub n="7.3.2" title="Geometrical meaning of the Riemann tensor and the torsion tensor" zh="Riemann 张量与挠率张量的几何意义">
        <Tx>{R`在继续之前，先看这两个张量的几何意义。先看 Riemann 张量。关键的观察是：若把 $p$ 点的向量 $V$ 沿两条不同曲线 $C$ 与 $C'$ 平行移动到 $q$，一般会在 $q$ 得到不同的向量（\figref{7.2}）。而在欧氏空间里按通常意义平行移动，结果与路径无关。我们预期平行移动的这种**不可积性**刻画了内禀的曲率概念，它不依赖于特别选取的坐标。`}</Tx>
        <Figure n="7.2" caption={R`把 $V$ 沿大圆平行移动时，自然的定义是保持 $V$ 与大圆的夹角不变。若 $p$ 点的 $V$ 分别沿大圆 $C$ 与 $C'$ 平行移动，到达 $q$ 时两个向量方向相反。`} width="55%" />
        <Figure n="7.3" caption={R`$p$ 点的向量 $V_0$ 沿 $C$ 与 $C'$ 平行移动，在 $r$ 点得到 $V_C(r)$ 与 $V_{C'}(r)$。曲率度量两者之差。`} width="55%" />
        <Tx>{R`取一个无穷小平行四边形 $pqrs$，四个顶点的坐标为 $\{x^\mu\}$、$\{x^\mu+\varepsilon^\mu\}$、$\{x^\mu+\varepsilon^\mu+\delta^\mu\}$、$\{x^\mu+\delta^\mu\}$，$\varepsilon^\mu$ 与 $\delta^\mu$ 为无穷小（\figref{7.3}）。把 $V_0\in T_pM$ 沿 $C=pqr$ 平行移动，得到 $V_C(r)\in T_rM$。由 \eqref{7.9}，$V_0$ 沿 $C$ 平行移动到 $q$ 为

$$V_C^\mu(q)=V_0^\mu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}(p)\varepsilon^\nu.$$

于是 $V_C^\mu(r)$ 为

$$\begin{aligned}V_C^\mu(r)&=V_C^\mu(q)-V_C^\kappa(q)\Gamma^\mu{}_{\nu\kappa}(q)\delta^\nu\\&=V_0^\mu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}\varepsilon^\nu-[V_0^\kappa-V_0^\rho\Gamma^\kappa{}_{\zeta\rho}(p)\varepsilon^\zeta]\times[\Gamma^\mu{}_{\nu\kappa}(p)+\partial_\lambda\Gamma^\mu{}_{\nu\kappa}(p)\varepsilon^\lambda]\delta^\nu\\&\simeq V_0^\mu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}(p)\varepsilon^\nu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}(p)\delta^\nu\\&\quad-V_0^\kappa[\partial_\lambda\Gamma^\mu{}_{\nu\kappa}(p)-\Gamma^\rho{}_{\lambda\kappa}(p)\Gamma^\mu{}_{\nu\rho}(p)]\varepsilon^\lambda\delta^\nu\end{aligned}$$

这里保留了 $\varepsilon$、$\delta$ 的二阶项（$\Gamma(q)$ 用 Taylor 展开；乘积中的 $V_0^\rho\Gamma^\kappa{}_{\zeta\rho}\varepsilon^\zeta\Gamma^\mu{}_{\nu\kappa}\delta^\nu$ 换哑指标名后成为 $\Gamma^\rho{}_{\lambda\kappa}\Gamma^\mu{}_{\nu\rho}$ 项）。类似地，$V_0$ 沿 $C'=psr$ 平行移动得到另一个向量 $V_{C'}(r)\in T_rM$（把上式中 $\varepsilon\leftrightarrow\delta$ 互换）：

$$\begin{aligned}V_{C'}^\mu(r)&\simeq V_0^\mu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}(p)\delta^\nu-V_0^\kappa\Gamma^\mu{}_{\nu\kappa}(p)\varepsilon^\nu\\&\quad-V_0^\kappa[\partial_\nu\Gamma^\mu{}_{\lambda\kappa}(p)-\Gamma^\rho{}_{\nu\kappa}(p)\Gamma^\mu{}_{\lambda\rho}(p)]\varepsilon^\lambda\delta^\nu.\end{aligned}$$

$r$ 点的这两个向量之差为`}</Tx>
        <Eq n="7.44" keyEq title="曲率 = 绕圈的差" say={R`沿两条路径把同一个向量搬到对角点，结果之差正比于所围的小面积元 $\varepsilon^\lambda\delta^\nu$，比例系数就是 Riemann 张量：曲率是平行移动的"路径依赖性"。`}>{R`\begin{aligned}V_{C'}(r)-V_C(r)&=V_0^\kappa[\partial_\lambda\Gamma^\mu{}_{\nu\kappa}(p)-\partial_\nu\Gamma^\mu{}_{\lambda\kappa}(p)\\&\quad-\Gamma^\rho{}_{\lambda\kappa}(p)\Gamma^\mu{}_{\nu\rho}(p)+\Gamma^\rho{}_{\nu\kappa}(p)\Gamma^\mu{}_{\lambda\rho}(p)]\varepsilon^\lambda\delta^\nu\\&=V_0^\kappa R^\mu{}_{\kappa\lambda\nu}\varepsilon^\lambda\delta^\nu.\end{aligned}`}</Eq>
        <Tx>{R`（最后一步与 \eqref{7.42} 比较：取 $\kappa\to\mu$、$\lambda\to\kappa$、$\mu\to\lambda$。）交互图 1 让你在球面上拖动一个有限大的回路，数值积分 \eqref{7.18b}，看到绕一圈后向量的转角正好等于所围面积乘曲率——这正是 \eqref{7.44} 对无穷小回路的积分版本。

**挠率的几何意义。**设 $p\in M$ 的坐标为 $\{x^\mu\}$，$X=\varepsilon^\mu e_\mu$、$Y=\delta^\mu e_\mu$ 是 $T_pM$ 中的无穷小向量。把它们看作小位移，就定义了 $p$ 附近的两点 $q$、$s$，坐标分别为 $\{x^\mu+\varepsilon^\mu\}$ 与 $\{x^\mu+\delta^\mu\}$（\figref{7.4}）。把 $X$ 沿线段 $ps$ 平行移动，得到向量 $sr_1$，其分量为 $\varepsilon^\mu-\varepsilon^\lambda\Gamma^\mu{}_{\nu\lambda}\delta^\nu$。连接 $p$ 与 $r_1$ 的位移向量为

$$pr_1=ps+sr_1=\delta^\mu+\varepsilon^\mu-\Gamma^\mu{}_{\nu\lambda}\varepsilon^\lambda\delta^\nu.$$

类似地，把 $\delta^\mu$ 沿 $pq$ 平行移动得到

$$pr_2=pq+qr_2=\varepsilon^\mu+\delta^\mu-\Gamma^\mu{}_{\lambda\nu}\varepsilon^\lambda\delta^\nu.$$

一般 $r_1$ 与 $r_2$ 不重合，从 $r_1$ 指向 $r_2$ 的差为`}</Tx>
        <Eq n="7.45" title="挠率 = 平行四边形不闭合" say={R`用平行移动搭一个无穷小"平行四边形"，两条边走完到达的终点不重合，缺口正比于面积元，比例系数是挠率。`}>{R`\overrightarrow{r_1r_2}=pr_2-pr_1=(\Gamma^\mu{}_{\nu\lambda}-\Gamma^\mu{}_{\lambda\nu})\varepsilon^\lambda\delta^\nu=T^\mu{}_{\nu\lambda}\varepsilon^\lambda\delta^\nu.`}</Eq>
        <Figure n="7.4" caption={R`向量 $qr_2$（$sr_1$）是向量 $ps$（$pq$）平行移动到 $q$（$s$）的结果。一般 $r_1\neq r_2$，挠率度量两者之差。`} width="55%" />
        <Tx>{R`所以，挠率张量度量的是"由小位移向量及其平行移动构成的平行四边形"不闭合的程度。（原书把这个差记作 $r_2r_1$；按 $pr_2-pr_1$ 的定义它是从 $r_1$ 指向 $r_2$ 的向量。）`}</Tx>
        <Box kind="example" n="7.2" title={R`保持与纬线夹角的"航海"联络：有挠无曲`}>
          <Tx>{R`设想在地球表面航行。我们规定：若向量与纬线的夹角在航行中保持不变，就说它被平行移动。［注：这不是通常的平行移动定义。例如这时的测地线不是大圆，而是 Mercator 投影上的直线（恒向线）。参看例 7.5。］设沿经线与纬线组成的小四边形 $pqrs$ 航行（\figref{7.5}(a)），把 $p$ 点的向量分别沿 $pqr$ 与 $psr$ 平行移动。按定义，两个向量在 $r$ 点必然一致，所以曲率张量为零。

为求挠率，按\figref{7.5}(b) 把 $p,q,r,s$ 参数化：$p=(\theta,\phi)$，$q=(\theta,\phi+\dd\phi)$（沿纬线），$s=(\theta-\dd\theta,\phi)$（沿经线向北）。按 \eqref{7.45} 计算 $pr_1$ 与 $pr_2$ 之差。把 $pq$ 沿 $ps$ 平行移动得到 $sr_1$，它仍沿纬线方向，长度为 $R\sin\theta\,\dd\phi$。而把 $ps$ 沿 $pq$ 平行移动得到 $qr_2=qr$（仍沿经线）。由于 $sr$ 的长度是 $R\sin(\theta-\dd\theta)\dd\phi\simeq R\sin\theta\,\dd\phi-R\cos\theta\,\dd\theta\,\dd\phi$，$r_1$ 比 $r_2=r$ 多走出 $R\cos\theta\,\dd\theta\,\dd\phi$，于是 $\overrightarrow{r_1r_2}$ 的长度为 $R\cos\theta\,\dd\theta\,\dd\phi$。由于 $\overrightarrow{r_1r_2}$ 平行于 $-\partial/\partial\phi$，联络有挠率分量 $T^\phi{}_{\theta\phi}$（见 \eqref{7.45}）。由 $g_{\phi\phi}=R^2\sin^2\theta$，$\overrightarrow{r_1r_2}$ 的坐标分量为 $(0,-\cot\theta\,\dd\theta\,\dd\phi)$。

现在仔细对照 \eqref{7.45}：$\varepsilon=\overrightarrow{pq}=(0,\dd\phi)$，$\delta=\overrightarrow{ps}=(-\dd\theta,0)$，于是 $\phi$ 分量为 $T^\phi{}_{\nu\lambda}\varepsilon^\lambda\delta^\nu=T^\phi{}_{\theta\phi}\,\dd\phi\,(-\dd\theta)$。令它等于 $-\cot\theta\,\dd\theta\,\dd\phi$，得

$$T^\phi{}_{\theta\phi}=\cot\theta\qquad(T^\phi{}_{\phi\theta}=-\cot\theta).$$`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 7.2 中 $T^\phi{}_{\theta\phi}$ 的符号（p.278）`}>{R`原书结论为 $T^\phi{}_{\theta\phi}=-\cot\theta$，漏掉了 $s$ 在 $\theta-\dd\theta$ 处这一事实，即 $\delta^\theta=-\dd\theta$。改正后为 $T^\phi{}_{\theta\phi}=+\cot\theta$。

**独立核对（不用图）：**这个联络的定义是"正交归一标架 $\hat e_\theta=R^{-1}\partial_\theta$、$\hat e_\phi=(R\sin\theta)^{-1}\partial_\phi$ 是平行的"，即 $\nabla\hat e_\theta=\nabla\hat e_\phi=0$。于是 $\nabla_{\partial_\theta}\partial_\phi=\nabla_{\partial_\theta}(R\sin\theta\,\hat e_\phi)=R\cos\theta\,\hat e_\phi=\cot\theta\,\partial_\phi$，$\nabla_{\partial_\phi}\partial_\theta=\nabla_{\partial_\phi}(R\hat e_\theta)=0$，所以 $\Gamma^\phi{}_{\theta\phi}=\cot\theta$、$\Gamma^\phi{}_{\phi\theta}=0$，由 \eqref{7.41}，$T^\phi{}_{\theta\phi}=\cot\theta$。正文已按此改正。`}</Box>
        <Figure n="7.5" caption={R`(a) 若向量在 $p$ 点与经线成角 $\alpha$，平行移动中保持这个角不变。(b) 向量 $sr_1$（$qr_2$）是向量 $pq$（$ps$）平行移动到 $s$（$q$）的结果。挠率不为零。`} width="70%" />
        <Tx>{R`注意基 $\{\partial/\partial\theta,\partial/\partial\phi\}$ 在两极没有定义。已知 $S^2$ 上不存在两个处处线性无关的向量场：$S^2$ 上任何向量场必在某处为零（"毛球定理"），在那里不可能与另一个向量场线性无关。若 $m$ 维流形 $M$ 上存在 $m$ 个处处线性无关的向量场，就说 $M$ 是**可平行化的**（parallelizable）。在可平行化流形上，可以用这 $m$ 个向量场在每点给出切空间的基。若 $V_p\in T_pM$ 在这组基下的全部分量等于 $V_q\in T_qM$ 的分量，就定义 $V_p$ 平行于 $V_q$。由于这些向量场在整个 $M$ 上有定义，这种平行性与连接 $p$、$q$ 的路径无关，因而 Riemann 曲率张量为零，但挠率一般不为零。对 $S^m$，这只在 $m=1,3,7$ 时可能，这与复数、四元数、八元数的存在密切相关。具体地，考虑嵌入 $(\R^4,\delta)$ 的

$$S^3=\Big\{(x^1,x^2,x^3,x^4)\ \Big|\ \sum_{i=1}^4(x^i)^2=1\Big\}.$$

三个正交归一的向量`}</Tx>
        <Eq n="7.46" say={R`$S^3$ 上三个处处正交归一、处处切于球面的向量场——它们证明 $S^3$ 可平行化（$S^2$ 做不到）。`}>{R`\begin{aligned}\boldsymbol{e}_1(\boldsymbol{x})&=(-x^2,x^1,-x^4,x^3)\\\boldsymbol{e}_2(\boldsymbol{x})&=(-x^3,x^4,x^1,-x^2)\\\boldsymbol{e}_3(\boldsymbol{x})&=(-x^4,-x^3,x^2,x^1)\end{aligned}`}</Eq>
        <Tx>{R`与 $\boldsymbol{x}=(x^1,x^2,x^3,x^4)$ 正交，且在 $S^3$ 上处处线性无关，因此张成切空间 $T_{\boldsymbol x}S^3$。若 $\boldsymbol{V}_1(\boldsymbol{x})=\sum c^i\boldsymbol{e}_i(\boldsymbol{x})$、$\boldsymbol{V}_2(\boldsymbol{y})=\sum c^i\boldsymbol{e}_i(\boldsymbol{y})$（系数相同），就说两者平行。

**挠率。**这个联络的定义是 $\nabla\boldsymbol{e}_i=0$，所以在标架 $\{\boldsymbol e_i\}$ 中联络系数全为零，挠率由 \eqref{7.36} 只剩李括号：$T(\boldsymbol e_i,\boldsymbol e_j)=-[\boldsymbol e_i,\boldsymbol e_j]$。原书用另一种方式算：沿小位移 $\varepsilon\boldsymbol e_1(\boldsymbol x)$，$\boldsymbol x$ 变为 $\boldsymbol x'=\boldsymbol x+\varepsilon\boldsymbol e_1(\boldsymbol x)=\{x^1-\varepsilon x^2,x^2+\varepsilon x^1,x^3-\varepsilon x^4,x^4+\varepsilon x^3\}$，两点的基向量（作为 $\R^4$ 中的向量）之差为

$$\boldsymbol e_2(\boldsymbol x')-\boldsymbol e_2(\boldsymbol x)=(-x^3+\varepsilon x^4,\ x^4+\varepsilon x^3,\ x^1-\varepsilon x^2,\ -x^2-\varepsilon x^1)-(-x^3,x^4,x^1,-x^2)=-\varepsilon\boldsymbol e_3(\boldsymbol x),$$

同理 $\boldsymbol e_1(\boldsymbol x+\varepsilon\boldsymbol e_2)-\boldsymbol e_1(\boldsymbol x)=+\varepsilon\boldsymbol e_3(\boldsymbol x)$。这两个量是标架在**外部欧氏空间**中的变化率，即 $D_{\boldsymbol e_1}\boldsymbol e_2=-\boldsymbol e_3$、$D_{\boldsymbol e_2}\boldsymbol e_1=\boldsymbol e_3$；它们之差就是李括号：$[\boldsymbol e_1,\boldsymbol e_2]=D_{\boldsymbol e_1}\boldsymbol e_2-D_{\boldsymbol e_2}\boldsymbol e_1=-2\boldsymbol e_3$。一般地 $[\boldsymbol e_i,\boldsymbol e_j]=-2\varepsilon_{ijk}\boldsymbol e_k$，于是

$$T^k{}_{ij}=+2\varepsilon_{ijk}:\qquad T^3{}_{12}=T^1{}_{23}=T^2{}_{31}=2,$$

即当 $(\lambda\mu\nu)$ 是 $(123)$ 的偶（奇）置换时 $T^\lambda{}_{\mu\nu}=2$（$-2$），其余为零。`}</Tx>
        <Box kind="warning" title={R`勘误：$S^3$ 平行化联络的挠率符号（p.280）`}>{R`(1) 原书 $\boldsymbol e_2(\boldsymbol x')$ 的第一个分量印作 $-x^3-\varepsilon x^4$，应为 $-(x^3-\varepsilon x^4)=-x^3+\varepsilon x^4$（否则差不等于 $-\varepsilon\boldsymbol e_3$）。

(2) 原书把"标架在 $\R^4$ 中的变化"$\boldsymbol e_2(\boldsymbol x')-\boldsymbol e_2(\boldsymbol x)=-\varepsilon\boldsymbol e_3$ 读作 $\varepsilon\Gamma^\mu{}_{12}\boldsymbol e_\mu$，得 $\Gamma^3{}_{12}=-1$、$\Gamma^3{}_{21}=1$、$T^3{}_{12}=-2$，并请读者验证"偶置换为 $-2$"。但按这个联络的定义，$\boldsymbol e_2(\boldsymbol x')$ **就是** $\boldsymbol e_2(\boldsymbol x)$ 的平行移动，由 \eqref{7.14}，$\nabla_{\boldsymbol e_1}\boldsymbol e_2=0$；上面算出的是外部平直导数 $D$，其反对称化给出李括号而非挠率。由 \eqref{7.36}，$T(\boldsymbol e_1,\boldsymbol e_2)=-[\boldsymbol e_1,\boldsymbol e_2]=+2\boldsymbol e_3$，所以偶置换为 $+2$、奇置换为 $-2$。我们用有限差分直接数值验证了 $[\boldsymbol e_1,\boldsymbol e_2]=-2\boldsymbol e_3$（在 $S^3$ 的随机点上逐分量相等）。正文已按此改正。这与例 7.2 的符号问题同源。`}</Box>
        <Tx>{R`**与四元数的关系。**看看 $S^3$ 的可平行化怎样与四元数的存在联系起来。四元数的乘法规则为`}</Tx>
        <Eq n="7.47" say={R`四元数乘法写成四个实分量：$(x^1,x^2,x^3,x^4)$ 对应 $x^1+x^2\mathrm{i}+x^3\mathrm{j}+x^4\mathrm{k}$。`}>{R`\begin{aligned}&(x^1,x^2,x^3,x^4)\cdot(y^1,y^2,y^3,y^4)\\&\quad=(x^1y^1-x^2y^2-x^3y^3-x^4y^4,\ x^1y^2+x^2y^1+x^3y^4-x^4y^3,\\&\qquad x^1y^3-x^2y^4+x^3y^1+x^4y^2,\ x^1y^4+x^2y^3-x^3y^2+x^4y^1).\end{aligned}`}</Eq>
        <Tx>{R`$S^3$ 可以定义为单位四元数的集合

$$S^3=\{(x^1,x^2,x^3,x^4)\mid\boldsymbol x\cdot\bar{\boldsymbol x}=1\}$$

其中 $x$ 的共轭定义为 $\bar{\boldsymbol x}=(x^1,-x^2,-x^3,-x^4)$。由 \eqref{7.46}，$\boldsymbol x_0=(1,0,0,0)$ 处的切空间由

$$\boldsymbol e_1=(0,1,0,0)\qquad\boldsymbol e_2=(0,0,1,0)\qquad\boldsymbol e_3=(0,0,0,1)$$

张成。于是 $\boldsymbol x=(x^1,x^2,x^3,x^4)$ 处切空间的基向量 \eqref{7.46} 可以表示为四元数乘积`}</Tx>
        <Eq n="7.48" say={R`$S^3$ 上任一点的切标架，都是单位元处的标架左乘到该点：$\mathrm{i}\boldsymbol x$、$\mathrm{j}\boldsymbol x$、$\mathrm{k}\boldsymbol x$。`}>{R`\boldsymbol e_1(\boldsymbol x)=\boldsymbol e_1\cdot\boldsymbol x\qquad\boldsymbol e_2(\boldsymbol x)=\boldsymbol e_2\cdot\boldsymbol x\qquad\boldsymbol e_3(\boldsymbol x)=\boldsymbol e_3\cdot\boldsymbol x.`}</Eq>
        <Tx>{R`（例如由 \eqref{7.47}，$(0,1,0,0)\cdot\boldsymbol x=(-x^2,x^1,-x^4,x^3)$，正是 $\boldsymbol e_1(\boldsymbol x)$。）由于这种代数结构，只要在某一点（例如 $\boldsymbol x_0=(1,0,0,0)$）给定一组基向量，就**总能**在 $S^3$ 的任意点给出一组基。同理，李群是可平行化的：若给定李群 $G$ 单位元 $e$ 处的基向量 $\{V_1,\ldots,V_n\}$，总可以用左平移 $\{V_\mu\}$ 得到 $T_gG$ 的基（见 §5.6），`}</Tx>
        <Eq n="7.49" say={R`李群上用左平移把单位元处的基搬到每一点，得到整体的标架场：李群都可平行化（$S^3\cong\mathrm{SU}(2)$ 是其特例）。`}>{R`\{V_1,\ldots,V_n\}\xrightarrow{L_{g*}}\{X_1|_g,\ldots,X_n|_g\}.`}</Eq>
      </Sub>

      <Sub n="7.3.3" title="The Ricci tensor and the scalar curvature" zh="Ricci 张量与标量曲率">
        <Tx>{R`对 Riemann 曲率张量的指标作缩并，可以构造新的张量。**Ricci 张量** $\sym{Ric}{\mathit{Ric}}$ 是 $(0,2)$ 型张量，定义为`}</Tx>
        <Eq n="7.50a" say={R`Ricci 张量：把曲率算子 $R(\,\cdot\,,Y)X$ 取迹。`}>{R`\sym{Ric}{\mathit{Ric}}(X,Y)\equiv\langle\dd x^\mu,R(e_\mu,Y)X\rangle`}</Eq>
        <Tx>{R`其分量为`}</Tx>
        <Eq n="7.50b" keyEq title="Ricci 张量" say={R`Ricci 张量是 Riemann 张量第一与第三个指标的缩并：它度量小球体积随测地线发散而偏离平直的程度，是 Einstein 方程的主角。`}>{R`\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\sym{Ric}{\mathit{Ric}}(e_\mu,e_\nu)=R^\lambda{}_{\mu\lambda\nu}.`}</Eq>
        <Tx>{R`进一步缩并指标得到**标量曲率**（scalar curvature）$\mathcal{R}$：`}</Tx>
        <Eq n="7.51" say={R`标量曲率：用逆度规把 Ricci 张量取迹。单位球面 $S^2$ 上 $\mathcal R=2$，Poincaré 上半平面 $\mathcal R=-2$。`}>{R`\mathcal{R}\equiv g^{\mu\nu}\sym{Ric}{\mathit{Ric}}(e_\mu,e_\nu)=g^{\mu\nu}\sym{Ric}{\mathit{Ric}}_{\mu\nu}.`}</Eq>
      </Sub>
    </Sec>);
}
