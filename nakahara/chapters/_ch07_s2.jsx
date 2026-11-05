import { PolarTransportRedraw } from "./_redraw_ch06_08.jsx";
// §7.2 平行移动、联络与协变导数 —— 式 (7.8a)–(7.35)，定义 7.2，例 7.1，习题 7.3–7.6，图 7.1
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Exercise, Derivation, C, FormulaMap } from "@kit";
import { FM_7_10, FM_7_29 } from "./_ch07_fmaps.jsx";

const R = String.raw;

export function Sec72() {
  return (
    <Sec n="7.2" title="Parallel transport, connection and covariant derivative" zh="平行移动、联络与协变导数"
      gist={R`不同点的向量不能直接相减 → 规定"平行移动"$\widetilde V^\mu=V^\mu-V^\lambda\Gamma^\mu{}_{\nu\lambda}\Delta x^\nu$ → 协变导数 $\nabla_\mu W^\lambda=\partial_\mu W^\lambda+\Gamma^\lambda{}_{\mu\nu}W^\nu$ → 公理化为仿射联络（\sref{D7.2}）→ 平行移动方程与测地线方程 → 推广到任意张量 → $\Gamma$ 的非齐次变换律 → 要求度规协变常数，解出 $\Gamma$ = Christoffel 符号 + 挠率项。`}
      why={R`李导数 $\mathcal{L}_VX=[V,X]$ 依赖 $V$ 的导数，不是方向导数。要在流形上对张量求"沿某方向的导数"，必须额外给一个结构——联络。它也是规范场论中规范势的几何原型（第 10 章）。`}
      gives={["7.9", "7.10", "7.14", "7.15", "7.16", "7.18b", "7.19b", "7.26", "7.29", "7.30b", "7.33", "7.34"]}>
      <p className="muted">本节概念：<C id="connection" /> · <C id="geodesic" /></p>
      <Tx>{R`向量 $X$ 是作用在 $f\in\mathcal{F}(M)$ 上的方向导数 $X:f\mapsto X[f]$。但是，**流形的微分结构并不自然地给出作用在 $(p,q)$ 型张量场上的方向导数**。［注意李导数 $\mathcal{L}_VX=[V,X]$ 不是方向导数，因为它依赖于 $V$ 的**导数**：$\mathcal{L}_{fV}X=f\mathcal{L}_VX-X[f]V$。］我们需要一个额外的结构，称为**联络**（connection），它规定张量怎样沿曲线被搬运。`}</Tx>

      <Sub n="7.2.1" title="Heuristic introduction" zh="启发式引入">
        <Tx>{R`先启发式地介绍平行移动与协变导数。我们已多次强调：不同点上的两个向量不能直接比较。看看欧氏空间 $\R^m$ 中向量场的导数是怎么定义的。向量场 $\boldsymbol{V}=V^\mu\boldsymbol{e}_\mu$ 对 $x^\nu$ 的导数的第 $\mu$ 个分量为

$$\frac{\partial V^\mu}{\partial x^\nu}=\lim_{\Delta x\to0}\frac{V^\mu(\ldots,x^\nu+\Delta x^\nu,\ldots)-V^\mu(\ldots,x^\nu,\ldots)}{\Delta x^\nu}.$$

分子第一项定义在 $x+\Delta x=(x^1,\ldots,x^\nu+\Delta x^\nu,\ldots,x^m)$，第二项定义在 $x=(x^\mu)$。要从 $V^\mu(x+\Delta x)$ 中减去 $V^\mu(x)$，必须先把 $V^\mu(x)$ **原封不动地**搬到 $x+\Delta x$ 再求差。这种搬运称为**平行移动**（parallel transport）。我们在不知不觉中假定了：$V|_x$ 平行移动到 $x+\Delta x$ 后分量仍是 $V^\mu(x)$。然而在一般流形上**没有自然的平行移动方式**，必须人为规定向量怎样从一点平行移动到另一点。

记 $\widetilde V|_{x+\Delta x}$ 为 $V|_x$ 平行移动到 $x+\Delta x$ 得到的向量。我们要求其分量满足`}</Tx>
        <Eq n="7.8a" say={R`平行移动造成的分量变化与位移成正比：位移趋于零时，搬运后的向量趋于原向量。`}>{R`\widetilde V^\mu(x+\Delta x)-V^\mu(x)\propto\Delta x`}</Eq>
        <Eq n="7.8b" say={R`平行移动是线性的：先相加再搬运，等于分别搬运再相加。`}>{R`\big(\nosym{\widetilde{V^\mu+W^\mu}}\big)(x+\Delta x)=\widetilde V^\mu(x+\Delta x)+\widetilde W^\mu(x+\Delta x).`}</Eq>
        <Tx>{R`取下面的形式就满足这两个条件（对 $\Delta x$ 一阶、对 $V$ 线性的最一般形式）：`}</Tx>
        <Eq n="7.9" title="无穷小平行移动" say={R`把向量平行移动一小步 $\Delta x$，分量的改变量对 $V$ 和 $\Delta x$ 都是线性的，比例系数就是联络系数 $\Gamma$。`}>{R`\widetilde V^\mu(x+\Delta x)=V^\mu(x)-V^\lambda(x)\Gamma^\mu{}_{\nu\lambda}(x)\Delta x^\nu.`}</Eq>
        <Tx>{R`$V$ 对 $x^\nu$ 的**协变导数**（covariant derivative）定义为`}</Tx>
        <FormulaMap n="7.10" say={R`协变导数 = 同一点上"实际的场值"与"从邻点平行搬来的值"之差除以位移：普通偏导数加上一项 $\Gamma$ 修正。`} tree={FM_7_10} start="G" />
        <Tx>{R`这个量是 $x+\Delta x$ 处的向量：它是**同一点** $x+\Delta x$ 上两个向量 $V|_{x+\Delta x}$ 与 $\widetilde V|_{x+\Delta x}$ 之差。每选一个 $\Gamma$，就有一种平行移动规则，可能性很多。若流形带有度规，则存在一个优选的 $\Gamma$，称为 **Levi-Civita 联络**，见例 7.1 与 §7.4。`}</Tx>
        <Box kind="example" n="7.1" title={R`平面极坐标中的平行移动`}>
          <Tx>{R`看一个简单例子：二维欧氏空间 $(\R^2,\delta)$。按初等几何的通常意义定义平行移动。在 Cartesian 坐标系 $(x,y)$ 中，$\Gamma$ 的所有分量都为零，因为对任意 $\Delta x$、$\Delta y$ 都有 $\widetilde V^\mu(x+\Delta x,y+\Delta y)=V^\mu(x,y)$。下面改用极坐标 $(r,\phi)$。把 $(r,\phi)\mapsto(r\cos\phi,r\sin\phi)$ 看作嵌入，得到诱导度规`}</Tx>
          <Eq n="7.11" say={R`平面在极坐标下的度规：径向走 $\dd r$ 长 $\dd r$，角向转 $\dd\phi$ 要走弧长 $r\,\dd\phi$。`}>{R`g=\dd r\otimes\dd r+r^2\,\dd\phi\otimes\dd\phi.`}</Eq>
          <Tx>{R`设 $\boldsymbol{V}=V^r\partial/\partial r+V^\phi\partial/\partial\phi$ 是 $(r,\phi)$ 处的向量。把它平行移动到 $(r+\Delta r,\phi)$，得到新向量 $\widetilde{\boldsymbol{V}}=\widetilde V^r\,\partial/\partial r|_{(r+\Delta r,\phi)}+\widetilde V^\phi\,\partial/\partial\phi|_{(r+\Delta r,\phi)}$（\figref{7.1}(a)）。注意 $V^r=V\cos\theta$、$V^\phi=V(\sin\theta/r)$，其中 $V=\sqrt{g(\boldsymbol{V},\boldsymbol{V})}$，$\theta$ 是 $\boldsymbol{V}$ 与 $\partial/\partial r$ 的夹角（$\partial/\partial\phi$ 的长度是 $r$，所以角向分量要除以 $r$）。沿径向移动时这个夹角不变，于是 $\widetilde V^r=V^r$，且

$$\widetilde V^\phi=\frac{r}{r+\Delta r}V^\phi\simeq V^\phi-\frac{\Delta r}{r}V^\phi.$$

与 \eqref{7.9}（取 $\Delta x=(\Delta r,0)$）比较，立即得到`}</Tx>
          <Eq n="7.12a" say={R`沿径向搬运时，只有角向分量因"基向量 $\partial_\phi$ 随 $r$ 变长"而需要修正：$\Gamma^\phi{}_{r\phi}=1/r$。`}>{R`\Gamma^r{}_{rr}=0\qquad\Gamma^r{}_{r\phi}=0\qquad\Gamma^\phi{}_{rr}=0\qquad\Gamma^\phi{}_{r\phi}=\frac1r.`}</Eq>
          <Tx>{R`类似地，把 $V$ 平行移动到 $(r,\phi+\Delta\phi)$，得到

$$\widetilde{\boldsymbol{V}}=\widetilde V^r\frac{\partial}{\partial r}\Big|_{(r,\phi+\Delta\phi)}+\widetilde V^\phi\frac{\partial}{\partial\phi}\Big|_{(r,\phi+\Delta\phi)}$$

其中（新位置的径向转过了 $\Delta\phi$，所以向量与 $\partial_r$ 的夹角变为 $\theta-\Delta\phi$，\figref{7.1}(b)）

$$\widetilde V^r=V\cos(\theta-\Delta\phi)\simeq V\cos\theta+V\sin\theta\,\Delta\phi=V^r+V^\phi r\,\Delta\phi$$

以及

$$\widetilde V^\phi=V\frac{\sin(\theta-\Delta\phi)}{r}\simeq V\frac{\sin\theta}{r}-V\cos\theta\frac{\Delta\phi}{r}=V^\phi-V^r\frac{\Delta\phi}{r}.$$

与 \eqref{7.9}（取 $\Delta x=(0,\Delta\phi)$）比较得`}</Tx>
          <Eq n="7.12b" say={R`沿角向搬运时，径向与角向分量互相混合：$\Gamma^r{}_{\phi\phi}=-r$ 是"向心"修正，$\Gamma^\phi{}_{\phi r}=1/r$ 与 \eqref{7.12a} 中的 $\Gamma^\phi{}_{r\phi}$ 相等。`}>{R`\Gamma^r{}_{\phi r}=0\qquad\Gamma^r{}_{\phi\phi}=-r\qquad\Gamma^\phi{}_{\phi r}=\frac1r\qquad\Gamma^\phi{}_{\phi\phi}=0.`}</Eq>
          <Tx>{R`注意这些 $\Gamma$ 满足对称性 $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$。我们还暗中假定了平行移动下向量的长度不变（夹角与 $V$ 都保持）。满足这两个条件的平行移动规则称为 **Levi-Civita 联络**，见 §7.4。这个直观的处理引向仿射联络的正式定义。`}</Tx>
        </Box>
        <Figure illustration={<PolarTransportRedraw />} n="7.1" caption={R`自绘极坐标平行移动：笛卡尔向量保持不变，沿径向或角向改变底点时，比较极坐标基及分量。`} width="100%" />
      </Sub>

      <Sub n="7.2.2" title="Affine connections" zh="仿射联络">
        <Stmt id="D7.2" />
        <Eq n="7.13a" say={R`对被求导的向量场可加。`}>{R`\nabla_X(Y+Z)=\nabla_XY+\nabla_XZ`}</Eq>
        <Eq n="7.13b" say={R`对求导方向可加。`}>{R`\nabla_{(X+Y)}Z=\nabla_XZ+\nabla_YZ`}</Eq>
        <Eq n="7.13c" say={R`对求导方向是函数线性的：方向乘一个函数，导数就乘那个函数——所以 $\nabla_XY|_p$ 只依赖 $X$ 在 $p$ 点的值。`}>{R`\nabla_{(fX)}Y=f\nabla_XY`}</Eq>
        <Eq n="7.13d" say={R`对被求导的场满足 Leibniz 律：函数因子被普通地求方向导数。`}>{R`\nabla_X(fY)=X[f]Y+f\nabla_XY`}</Eq>
        <Tx>{R`其中 $f\in\mathcal{F}(M)$，$X,Y,Z\in\mathcal{X}(M)$。

**联络系数。**取卡 $(U,\varphi)$，坐标 $x=\varphi(p)$，定义 $m^3$ 个函数 $\Gamma^\lambda{}_{\nu\mu}$，称为**联络系数**（connection coefficients）：`}</Tx>
        <Eq n="7.14" title="联络系数" say={R`联络系数记录坐标基向量从一点到邻点怎样变化：沿 $e_\nu$ 方向对 $e_\mu$ 求协变导数，结果按基展开的系数就是 $\Gamma^\lambda{}_{\nu\mu}$（第一个下标是求导方向）。`}>{R`\nabla_\nu e_\mu\equiv\nabla_{e_\nu}e_\mu=e_\lambda\Gamma^\lambda{}_{\nu\mu}`}</Eq>
        <Tx>{R`其中 $\{e_\mu\}=\{\partial/\partial x^\mu\}$ 是 $T_pM$ 的坐标基。一旦规定了 $\nabla$ 在基向量上的作用，就能算出它在任意向量上的作用。设 $V=V^\mu e_\mu$、$W=W^\nu e_\nu$ 是 $T_p(M)$ 的元素，由 \eqref{7.13a}–\eqref{7.13d}，`}</Tx>
        <Eq n="7.15" say={R`任意向量场的协变导数 = 分量的普通方向导数 + 基向量自身变化带来的 $\Gamma$ 项；它只用到 $V$ 在该点的值。`}>{R`\begin{aligned}\nabla_VW&=V^\mu\nabla_{e_\mu}(W^\nu e_\nu)=V^\mu\big(e_\mu[W^\nu]e_\nu+W^\nu\nabla_{e_\mu}e_\nu\big)\\&=V^\mu\left(\frac{\partial W^\lambda}{\partial x^\mu}+W^\nu\Gamma^\lambda{}_{\mu\nu}\right)e_\lambda.\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.15} 第一行中的 $e_\mu[W^\nu]$（p.270）`}>{R`原书第一行印作 $V^\mu(e_\mu[W^\mu]e_\nu+\ldots)$，被求导的分量应带求和指标 $\nu$：$e_\mu[W^\nu]e_\nu$（它与 $e_\nu$ 缩并）。写成 $W^\mu$ 会与外面的 $V^\mu$ 重复指标。第二行结果不受影响。正文已改正。`}</Box>
        <Tx>{R`这一联络系数的定义与前面的启发式结果 \eqref{7.10} 一致。按定义，$\nabla$ 把两个向量 $V$、$W$ 映成 \eqref{7.15} 右边的新向量，其第 $\lambda$ 个分量为 $V^\mu\nabla_\mu W^\lambda$，其中`}</Tx>
        <Eq n="7.16" keyEq title="向量的协变导数" say={R`向量分量的协变导数：偏导数加 $\Gamma$ 乘向量本身。物理书里的 $W^\lambda{}_{;\mu}$ 就是它。`}>{R`\nabla_\mu W^\lambda\equiv\frac{\partial W^\lambda}{\partial x^\mu}+\Gamma^\lambda{}_{\mu\nu}W^\nu.`}</Eq>
        <Tx>{R`注意 $\nabla_\mu W^\lambda$ 是向量 $\nabla_\mu W=\nabla_\mu W^\lambda e_\lambda$ 的第 $\lambda$ 个分量，**不要**把它误解为对**分量函数** $W^\lambda$ 的协变导数（那只是 $\partial_\mu W^\lambda$）。与李导数 $\mathcal{L}_VW=[V,W]$ 不同，$\nabla_VW$ 不依赖 $V$ 的导数。在这个意义上，协变导数才是函数的方向导数向张量的恰当推广。`}</Tx>
      </Sub>

      <Sub n="7.2.3" title="Parallel transport and geodesics" zh="平行移动与测地线">
        <Tx>{R`给定流形 $M$ 中的曲线，就可以定义向量沿曲线的平行移动。设 $c:(a,b)\to M$ 是 $M$ 中的曲线。为简单起见，假定其像被单张卡 $(U,\varphi)$ 覆盖，坐标 $x=\varphi(p)$。设 $X$ 是（至少）沿 $c(t)$ 定义的向量场，`}</Tx>
        <Eq n="7.17" say={R`只需要向量场在曲线上有定义：每个时刻一个向量。`}>{R`X|_{c(t)}=X^\mu(c(t))\,e_\mu|_{c(t)}`}</Eq>
        <Tx>{R`其中 $e_\mu=\partial/\partial x^\mu$。若 $X$ 满足条件`}</Tx>
        <Eq n="7.18a" say={R`沿曲线的切方向，向量场的协变导数处处为零：向量在每一小步里都"不转不缩"地被搬运。`}>{R`\nabla_VX=0\qquad\text{对任意 }t\in(a,b)`}</Eq>
        <Tx>{R`就称 $X$ 沿 $c(t)$ **平行移动**（parallel transported），其中 $V=\dd/\dd t=(\dd x^\mu(c(t))/\dd t)\,e_\mu|_{c(t)}$ 是 $c(t)$ 的切向量。用分量写，条件 \eqref{7.18a} 为（由 \eqref{7.15}，$V^\mu\partial_\mu X^\lambda=\dd X^\lambda/\dd t$）`}</Tx>
        <Eq n="7.18b" title="平行移动方程" say={R`平行移动方程是关于分量 $X^\mu(t)$ 的一阶线性常微分方程：给定起点的向量，沿曲线的搬运结果唯一确定。`}>{R`\frac{\dd X^\mu}{\dd t}+\Gamma^\mu{}_{\nu\lambda}\frac{\dd x^\nu(c(t))}{\dd t}X^\lambda=0.`}</Eq>
        <Tx>{R`**测地线。**若切向量 $V(t)$ 本身沿 $c(t)$ 平行移动，即`}</Tx>
        <Eq n="7.19a" say={R`测地线是"速度向量自己平行于自己"的曲线：不拐弯、也不加速。`}>{R`\nabla_VV=0`}</Eq>
        <Tx>{R`则称曲线 $c(t)$ 为**测地线**（geodesic）。在某种意义上，测地线是 Riemann 流形中"尽可能直"的曲线。用分量写，测地线方程 \eqref{7.19a} 成为`}</Tx>
        <Eq n="7.19b" keyEq title="测地线方程" say={R`测地线方程：坐标的"加速度"由 $\Gamma$ 与速度的二次项抵消。在广义相对论中，$\Gamma$ 项就是引力（加上惯性力）。`}>{R`\frac{\dd^2x^\mu}{\dd t^2}+\Gamma^\mu{}_{\nu\lambda}\frac{\dd x^\nu}{\dd t}\frac{\dd x^\lambda}{\dd t}=0`}</Eq>
        <Tx>{R`其中 $\{x^\mu\}$ 是 $c(t)$ 的坐标。也许有人觉得 \eqref{7.19a} 作为"最直的曲线"的条件太强，而要求较弱的条件`}</Tx>
        <Eq n="7.20" say={R`较弱的"直"：速度只沿自身方向变化（可以变快变慢，但不转弯）。`}>{R`\nabla_VV=fV`}</Eq>
        <Tx>{R`其中 $f\in\mathcal{F}(M)$。"$V$ 的变化平行于 $V$"也是直线的一个特征。然而在重新参数化 $t\to t'$ 下，切向量的分量变为

$$\frac{\dd x^\mu}{\dd t}\to\frac{\dd t}{\dd t'}\frac{\dd x^\mu}{\dd t},$$

而若 $t'$ 满足

$$\frac{\dd^2t'}{\dd t^2}=f\frac{\dd t'}{\dd t},$$

\eqref{7.20} 就化为 \eqref{7.19a}。［验证：记 $V'=\dd/\dd t'=(\dd t/\dd t')V$，则 $\nabla_{V'}V'=(\dd t/\dd t')^2\nabla_VV+(\dd t/\dd t')V[\dd t/\dd t']V=(\dd t/\dd t')^2\big[f-\frac{\dd^2t'/\dd t^2}{\dd t'/\dd t}\big]V$，取上式即为零。］所以总能重新参数化曲线，使测地线方程取 \eqref{7.19a} 的形式。`}</Tx>
        <Exercise n="7.3" title="仿射重参数化" level="★"
          hint={R`令 $s=at+b$，用链式法则把 $\dd/\dd t$ 换成 $a\,\dd/\dd s$。`}
          solution={R`设 $s=at+b$（$a\neq0$）。则 $\dfrac{\dd x^\mu}{\dd t}=a\dfrac{\dd x^\mu}{\dd s}$，$\dfrac{\dd^2x^\mu}{\dd t^2}=a^2\dfrac{\dd^2x^\mu}{\dd s^2}$。代入 \eqref{7.19b}：

$$a^2\left[\frac{\dd^2x^\mu}{\dd s^2}+\Gamma^\mu{}_{\nu\lambda}\frac{\dd x^\nu}{\dd s}\frac{\dd x^\lambda}{\dd s}\right]=0,$$

由于 $a^2\neq0$，方括号为零，即 $x^\mu(s)$ 也满足 \eqref{7.19b}。反之，若 $s=s(t)$ 不是仿射的，则多出一项 $\ddot s\,\dd x^\mu/\dd s$，方程变为 \eqref{7.20} 的形式（$f\propto\ddot s/\dot s$），不再是 \eqref{7.19b}。保持 \eqref{7.19b} 形式的参数称为**仿射参数**（affine parameter）；对 Levi-Civita 联络，弧长 $s$ 就是仿射参数（§7.4.3）。`}>
          {R`证明在仿射重参数化 $t\to at+b$（$a,b\in\R$）下，\eqref{7.19b} 保持不变。`}
        </Exercise>
      </Sub>

      <Sub n="7.2.4" title="The covariant derivative of tensor fields" zh="张量场的协变导数">
        <Tx>{R`$\nabla_X$ 既然有导数的含义，自然地用通常的方向导数定义 $f\in\mathcal{F}(M)$ 的协变导数：`}</Tx>
        <Eq n="7.21" say={R`函数的协变导数就是普通的方向导数——标量没有"基向量"需要修正。`}>{R`\nabla_Xf=X[f].`}</Eq>
        <Tx>{R`于是 \eqref{7.13d} 看起来完全就是 Leibniz 法则：

$$\nabla_X(fY)=(\nabla_Xf)Y+f\nabla_XY.\qquad(7.13\text{d}')$$

我们要求它对任意张量之积都成立：`}</Tx>
        <Eq n="7.22" say={R`协变导数对张量积满足乘积法则：这一条决定了它在所有张量上的作用。`}>{R`\nabla_X(T_1\otimes T_2)=(\nabla_XT_1)\otimes T_2+T_1\otimes(\nabla_XT_2)`}</Eq>
        <Tx>{R`其中 $T_1$、$T_2$ 是任意类型的张量场。\eqref{7.22} 在部分指标被缩并时也成立（即 $\nabla_X$ 与缩并交换）。有了这些要求，就能算出一形式 $\omega\in\Omega^1(M)$ 的协变导数。由于对 $Y\in\mathcal{X}(M)$ 有 $\langle\omega,Y\rangle\in\mathcal{F}(M)$，应有

$$X[\langle\omega,Y\rangle]=\nabla_X[\langle\omega,Y\rangle]=\langle\nabla_X\omega,Y\rangle+\langle\omega,\nabla_XY\rangle.$$

左边是 $X^\mu\partial_\mu(\omega_\nu Y^\nu)=X^\mu(\partial_\mu\omega_\nu)Y^\nu+X^\mu\omega_\nu\partial_\mu Y^\nu$，右边第二项由 \eqref{7.15} 是 $\omega_\lambda X^\mu(\partial_\mu Y^\lambda+\Gamma^\lambda{}_{\mu\nu}Y^\nu)$。两边的 $\omega\,\partial Y$ 项相消，对任意 $Y$ 比较系数得`}</Tx>
        <Eq n="7.23" say={R`一形式的协变导数：偏导数减去 $\Gamma$ 项——符号与向量相反，正是为了让配对 $\langle\omega,Y\rangle$ 的导数退化为普通导数。`}>{R`(\nabla_X\omega)_\nu=X^\mu\partial_\mu\omega_\nu-X^\mu\Gamma^\lambda{}_{\mu\nu}\omega_\lambda.`}</Eq>
        <Tx>{R`特别地，取 $X=e_\mu$，`}</Tx>
        <Eq n="7.24" say={R`下指标分量的协变导数：每个下指标贡献一个带负号的 $\Gamma$ 项。`}>{R`(\nabla_\mu\omega)_\nu=\partial_\mu\omega_\nu-\Gamma^\lambda{}_{\mu\nu}\omega_\lambda.`}</Eq>
        <Tx>{R`对 $\omega=\dd x^\nu$（参看 \eqref{7.14}），得`}</Tx>
        <Eq n="7.25" say={R`坐标一形式的协变导数：与 \eqref{7.14} 对偶，系数取负号，保证 $\langle\dd x^\nu,e_\mu\rangle=\delta^\nu_\mu$ 的导数为零。`}>{R`\nabla_\mu\dd x^\nu=-\Gamma^\nu{}_{\mu\lambda}\dd x^\lambda.`}</Eq>
        <Tx>{R`这些结果容易推广为`}</Tx>
        <Eq n="7.26" title="一般张量的协变导数" say={R`一般张量的协变导数：每个上指标配一个 $+\Gamma$，每个下指标配一个 $-\Gamma$，再加上分量的偏导数。`}>{R`\begin{aligned}\nabla_\nu t^{\lambda_1\ldots\lambda_p}{}_{\mu_1\ldots\mu_q}&=\partial_\nu t^{\lambda_1\ldots\lambda_p}{}_{\mu_1\ldots\mu_q}+\Gamma^{\lambda_1}{}_{\nu\kappa}t^{\kappa\lambda_2\ldots\lambda_p}{}_{\mu_1\ldots\mu_q}+\cdots\\&\quad+\Gamma^{\lambda_p}{}_{\nu\kappa}t^{\lambda_1\ldots\lambda_{p-1}\kappa}{}_{\mu_1\ldots\mu_q}-\Gamma^\kappa{}_{\nu\mu_1}t^{\lambda_1\ldots\lambda_p}{}_{\kappa\mu_2\ldots\mu_q}-\cdots\\&\quad-\Gamma^\kappa{}_{\nu\mu_q}t^{\lambda_1\ldots\lambda_p}{}_{\mu_1\ldots\mu_{q-1}\kappa}.\end{aligned}`}</Eq>
        <Exercise n="7.4" title="度规的协变导数" level="★"
          hint={R`在 \eqref{7.26} 中取 $p=0$、$q=2$，$t_{\lambda\mu}=g_{\lambda\mu}$。或者：$g=g_{\lambda\mu}\dd x^\lambda\otimes\dd x^\mu$，用 \eqref{7.22} 与 \eqref{7.25}。`}
          solution={R`$g=g_{\lambda\mu}\,\dd x^\lambda\otimes\dd x^\mu$。由 Leibniz 律 \eqref{7.22} 与 \eqref{7.21}、\eqref{7.25}：

$$\nabla_\nu g=(\partial_\nu g_{\lambda\mu})\dd x^\lambda\otimes\dd x^\mu+g_{\kappa\mu}(-\Gamma^\kappa{}_{\nu\lambda}\dd x^\lambda)\otimes\dd x^\mu+g_{\lambda\kappa}\dd x^\lambda\otimes(-\Gamma^\kappa{}_{\nu\mu}\dd x^\mu),$$

（第二、三项中把哑指标重新命名）读出 $\dd x^\lambda\otimes\dd x^\mu$ 的系数：

$$(\nabla_\nu g)_{\lambda\mu}=\partial_\nu g_{\lambda\mu}-\Gamma^\kappa{}_{\nu\lambda}g_{\kappa\mu}-\Gamma^\kappa{}_{\nu\mu}g_{\lambda\kappa},$$

即 \eqref{7.27}。这正是 \eqref{7.26} 在两个下指标情形的特例。`}>
          {R`设 $g$ 是度规张量。验证`}
        </Exercise>
        <Eq n="7.27" say={R`度规的协变导数：两个下指标各贡献一个负的 $\Gamma$ 项。`}>{R`(\nabla_\nu g)_{\lambda\mu}=\partial_\nu g_{\lambda\mu}-\Gamma^\kappa{}_{\nu\lambda}g_{\kappa\mu}-\Gamma^\kappa{}_{\nu\mu}g_{\lambda\kappa}.`}</Eq>
      </Sub>

      <Sub n="7.2.5" title="The transformation properties of connection coefficients" zh="联络系数的变换性质">
        <Tx>{R`引入另一张卡 $(V,\psi)$，$U\cap V\neq\emptyset$，坐标 $y=\psi(p)$。令 $\{e_\mu\}=\{\partial/\partial x^\mu\}$、$\{f_\alpha\}=\{\partial/\partial y^\alpha\}$ 分别为两套坐标的基，$y$ 坐标中的联络系数记作 $\widetilde\Gamma^\alpha{}_{\beta\gamma}$。基向量 $f_\alpha$ 满足`}</Tx>
        <Eq n="7.28" say={R`在新坐标里重复联络系数的定义。`}>{R`\nabla_{f_\alpha}f_\beta=\widetilde\Gamma^\gamma{}_{\alpha\beta}f_\gamma.`}</Eq>
        <Tx>{R`把 $f_\alpha=(\partial x^\mu/\partial y^\alpha)e_\mu$ 代入，左边成为

$$\begin{aligned}\nabla_{f_\alpha}f_\beta&=\nabla_{f_\alpha}\left(\frac{\partial x^\mu}{\partial y^\beta}e_\mu\right)=\frac{\partial^2x^\mu}{\partial y^\alpha\partial y^\beta}e_\mu+\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\nabla_{e_\lambda}e_\mu\\&=\left(\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}+\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\Gamma^\nu{}_{\lambda\mu}\right)e_\nu.\end{aligned}$$

（第一步用 \eqref{7.13d}，$f_\alpha[\partial x^\mu/\partial y^\beta]=\partial^2x^\mu/\partial y^\alpha\partial y^\beta$；第二步用 \eqref{7.13c}。）由于 \eqref{7.28} 的右边等于 $\widetilde\Gamma^\gamma{}_{\alpha\beta}(\partial x^\nu/\partial y^\gamma)e_\nu$，两边乘 $\partial y^\gamma/\partial x^\nu$，联络系数必须按如下规则变换：`}</Tx>
        <FormulaMap n="7.29" title={R`$\Gamma$ 的变换律`} say={R`联络系数不是张量：第一项像 $(1,2)$ 型张量那样变换，第二项是只依赖坐标变换的二阶导数的"非齐次项"。正因如此，$\Gamma$ 可以在一点处被坐标变换消掉。`} tree={FM_7_29} start="d2" />
        <Tx>{R`读者应当验证这个变换规则确实使 $\nabla_XY$ 成为向量，即

$$\widetilde X^\alpha(\widetilde\partial_\alpha\widetilde Y^\gamma+\widetilde\Gamma^\gamma{}_{\alpha\beta}\widetilde Y^\beta)f_\gamma=X^\lambda(\partial_\lambda Y^\nu+\Gamma^\nu{}_{\lambda\mu}Y^\mu)e_\nu.$$`}</Tx>
        <Derivation title={R`验证 $\nabla_XY$ 与坐标无关（原书留给读者）`} collapsed steps={[
          { tex: R`\widetilde X^\alpha=\frac{\partial y^\alpha}{\partial x^\lambda}X^\lambda,\qquad\widetilde Y^\beta=\frac{\partial y^\beta}{\partial x^\mu}Y^\mu,\qquad\widetilde X^\alpha\widetilde\partial_\alpha=X^\lambda\partial_\lambda`, why: R`向量分量的变换律 \eqref{5.23}；方向导数与坐标无关。` },
          { tex: R`\widetilde X^\alpha\widetilde\partial_\alpha\widetilde Y^\gamma=X^\lambda\partial_\lambda\Big(\frac{\partial y^\gamma}{\partial x^\mu}Y^\mu\Big)=\frac{\partial y^\gamma}{\partial x^\mu}X^\lambda\partial_\lambda Y^\mu+X^\lambda Y^\mu\frac{\partial^2y^\gamma}{\partial x^\lambda\partial x^\mu}`, why: R`乘积法则：偏导数一项"漏"出了二阶导数——这就是 $\partial_\lambda Y^\mu$ 本身不是张量的原因。` },
          { tex: R`\widetilde X^\alpha\widetilde\Gamma^\gamma{}_{\alpha\beta}\widetilde Y^\beta=\frac{\partial y^\gamma}{\partial x^\nu}\Gamma^\nu{}_{\lambda\mu}X^\lambda Y^\mu+X^\lambda Y^\mu\frac{\partial y^\alpha}{\partial x^\lambda}\frac{\partial y^\beta}{\partial x^\mu}\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}`, why: R`代入 \eqref{7.29}，Jacobi 矩阵与其逆相消。` },
          { tex: R`\frac{\partial y^\alpha}{\partial x^\lambda}\frac{\partial y^\beta}{\partial x^\mu}\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}=-\frac{\partial^2y^\gamma}{\partial x^\lambda\partial x^\mu}`, why: R`对恒等式 $\frac{\partial y^\gamma}{\partial x^\nu}\frac{\partial x^\nu}{\partial y^\beta}=\delta^\gamma_\beta$ 关于 $y^\alpha$ 求导，再乘两个 Jacobi 矩阵。` },
          { tex: R`\widetilde X^\alpha(\widetilde\partial_\alpha\widetilde Y^\gamma+\widetilde\Gamma^\gamma{}_{\alpha\beta}\widetilde Y^\beta)=\frac{\partial y^\gamma}{\partial x^\nu}X^\lambda(\partial_\lambda Y^\nu+\Gamma^\nu{}_{\lambda\mu}Y^\mu)`, why: R`两处二阶导数相消；剩下的正是向量分量的变换律，乘 $f_\gamma=(\partial x^\rho/\partial y^\gamma)e_\rho$ 即得所要证的等式。` },
        ]} result={R`$\Gamma$ 的非齐次变换项恰好抵消偏导数 $\partial Y$ 的非张量部分。`} />
        <Tx>{R`文献中常把联络系数**定义**为按 \eqref{7.29} 变换的对象。按我们的观点，则是：为了使 $\nabla_XY$ 与坐标选取无关，它们**必须**按 \eqref{7.29} 变换。`}</Tx>
        <Exercise n="7.5" title="联络之差是张量" level="★★"
          hint={R`\eqref{7.29} 的非齐次项不依赖 $\Gamma$。`}
          solution={R`**(i)** 设 $\Gamma$ 按 \eqref{7.29} 变换，$t^\lambda{}_{\mu\nu}$ 是 $(1,2)$ 型张量，即 $\widetilde t^\gamma{}_{\alpha\beta}=\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}t^\nu{}_{\lambda\mu}$。则 $\Gamma'=\Gamma+t$ 满足

$$\widetilde\Gamma'^\gamma{}_{\alpha\beta}=\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}(\Gamma^\nu{}_{\lambda\mu}+t^\nu{}_{\lambda\mu})+\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu},$$

正是 \eqref{7.29} 的形式，所以 $\Gamma+t$ 也是联络系数（它定义的 $\nabla'_XY=\nabla_XY+t(X,Y)$ 同样满足 \eqref{7.13a}–\eqref{7.13d}，因为 $t$ 对两个变量都函数线性）。

**(ii)** 设 $\Gamma$ 与 $\bar\Gamma$ 都按 \eqref{7.29} 变换。相减时非齐次项 $\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}$ 完全相同而抵消，剩下

$$\widetilde\Gamma^\gamma{}_{\alpha\beta}-\widetilde{\bar\Gamma}{}^\gamma{}_{\alpha\beta}=\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}(\Gamma^\nu{}_{\lambda\mu}-\bar\Gamma^\nu{}_{\lambda\mu}),$$

这正是 $(1,2)$ 型张量的变换律。无坐标的说法：$S(X,Y)\equiv\nabla_XY-\bar\nabla_XY$ 对 $X$ 与 $Y$ 都函数线性（Leibniz 项 $X[f]Y$ 相消），所以是张量。联络的集合因此是一个**仿射空间**：任取一个联络作原点，其余联络与它相差一个张量——"仿射联络"之名由此而来。`}>
          {R`设 $\Gamma$ 是任意联络系数。证明：若 $t^\lambda{}_{\mu\nu}$ 是张量场，则 $\Gamma^\lambda{}_{\mu\nu}+t^\lambda{}_{\mu\nu}$ 是另一个联络系数。反之，设 $\Gamma^\lambda{}_{\mu\nu}$ 与 $\bar\Gamma^\lambda{}_{\mu\nu}$ 都是联络系数，证明 $\Gamma^\lambda{}_{\mu\nu}-\bar\Gamma^\lambda{}_{\mu\nu}$ 是 $(1,2)$ 型张量的分量。`}
        </Exercise>
      </Sub>

      <Sub n="7.2.6" title="The metric connection" zh="度规联络">
        <Tx>{R`到目前为止 $\Gamma$ 是任意的。现在流形带有度规，可以对联络加上合理的限制。我们要求度规 $g_{\mu\nu}$ **协变常数**（covariantly constant）：若两个向量 $X$、$Y$ 沿任意曲线平行移动，它们之间的内积在平行移动下保持不变。［例 7.1 中已经假定了这个合理的条件。］设 $V$ 是任一曲线的切向量，向量沿这条曲线平行移动。则

$$\begin{aligned}0=\nabla_V[g(X,Y)]&=V^\kappa[(\nabla_\kappa g)(X,Y)+g(\nabla_\kappa X,Y)+g(X,\nabla_\kappa Y)]\\&=V^\kappa X^\mu Y^\nu(\nabla_\kappa g)_{\mu\nu}\end{aligned}$$

这里用了 $\nabla_\kappa X=\nabla_\kappa Y=0$。由于这对任意曲线与向量都成立，必有`}</Tx>
        <Eq n="7.30a" title="度规相容" say={R`度规相容：度规在平行移动下不变，于是长度与夹角都被平行移动保持。`}>{R`(\nabla_\kappa g)_{\mu\nu}=0`}</Eq>
        <Tx>{R`或者由习题 7.4，`}</Tx>
        <Eq n="7.30b" say={R`度规相容条件的分量形式：度规的偏导数被两个 $\Gamma$ 项恰好抵消。`}>{R`\partial_\lambda g_{\mu\nu}-\Gamma^\kappa{}_{\lambda\mu}g_{\kappa\nu}-\Gamma^\kappa{}_{\lambda\nu}g_{\kappa\mu}=0.`}</Eq>
        <Tx>{R`若 \eqref{7.30a} 成立，就说仿射联络 $\nabla$ 与度规**相容**（metric compatible），或简称为**度规联络**（metric connection）。我们只讨论度规联络。对 $(\lambda,\mu,\nu)$ 作轮换，得`}</Tx>
        <Eq n="7.30c" say={R`同一条件，指标轮换一次。`}>{R`\partial_\mu g_{\nu\lambda}-\Gamma^\kappa{}_{\mu\nu}g_{\kappa\lambda}-\Gamma^\kappa{}_{\mu\lambda}g_{\kappa\nu}=0`}</Eq>
        <Eq n="7.30d" say={R`同一条件，指标再轮换一次。`}>{R`\partial_\nu g_{\lambda\mu}-\Gamma^\kappa{}_{\nu\lambda}g_{\kappa\mu}-\Gamma^\kappa{}_{\nu\mu}g_{\kappa\lambda}=0.`}</Eq>
        <Tx>{R`组合 $-(7.30\text{b})+(7.30\text{c})+(7.30\text{d})$ 给出（$g_{\kappa\nu}$ 的系数 $\Gamma^\kappa{}_{\lambda\mu}-\Gamma^\kappa{}_{\mu\lambda}$，$g_{\kappa\mu}$ 的系数 $\Gamma^\kappa{}_{\lambda\nu}-\Gamma^\kappa{}_{\nu\lambda}$，$g_{\kappa\lambda}$ 的系数 $-\Gamma^\kappa{}_{\mu\nu}-\Gamma^\kappa{}_{\nu\mu}$）`}</Tx>
        <Eq n="7.31" say={R`三个轮换式的组合把联络系数分成"对称部分"与"反对称部分（挠率）"两块，度规的导数只与对称部分配对。`}>{R`-\partial_\lambda g_{\mu\nu}+\partial_\mu g_{\nu\lambda}+\partial_\nu g_{\lambda\mu}+T^\kappa{}_{\lambda\mu}g_{\kappa\nu}+T^\kappa{}_{\lambda\nu}g_{\kappa\mu}-2\Gamma^\kappa{}_{(\mu\nu)}g_{\kappa\lambda}=0`}</Eq>
        <Tx>{R`其中 $T^\kappa{}_{\lambda\mu}\equiv2\Gamma^\kappa{}_{[\lambda\mu]}\equiv\Gamma^\kappa{}_{\lambda\mu}-\Gamma^\kappa{}_{\mu\lambda}$，$\Gamma^\kappa{}_{(\mu\nu)}\equiv\frac12(\Gamma^\kappa{}_{\nu\mu}+\Gamma^\kappa{}_{\mu\nu})$。张量 $T^\kappa{}_{\lambda\mu}$ 关于下指标反对称，$T^\kappa{}_{\lambda\mu}=-T^\kappa{}_{\mu\lambda}$，称为**挠率张量**（torsion tensor），见习题 7.6；下一节将详细研究。从 \eqref{7.31} 解出 $\Gamma^\kappa{}_{(\mu\nu)}$（乘 $\frac12g^{\kappa\lambda}$）：`}</Tx>
        <Eq n="7.32" say={R`联络的对称部分 = Christoffel 符号 + 一个由挠率决定的修正。`}>{R`\Gamma^\kappa{}_{(\mu\nu)}=\left\{{\kappa\atop\mu\nu}\right\}+\frac12\left(T_\nu{}^\kappa{}_\mu+T_\mu{}^\kappa{}_\nu\right)`}</Eq>
        <Tx>{R`其中 $T_\nu{}^\kappa{}_\mu\equiv g_{\nu\rho}g^{\kappa\lambda}T^\rho{}_{\lambda\mu}$，$\left\{{\kappa\atop\mu\nu}\right\}$ 是 **Christoffel 符号**（Christoffel symbols），定义为`}</Tx>
        <Eq n="7.33" title="Christoffel 符号" say={R`Christoffel 符号完全由度规及其一阶导数决定：三个导数项"两加一减"，再用逆度规升指标。`}>{R`\left\{{\kappa\atop\mu\nu}\right\}=\frac12g^{\kappa\lambda}\left(\partial_\mu g_{\nu\lambda}+\partial_\nu g_{\mu\lambda}-\partial_\lambda g_{\mu\nu}\right).`}</Eq>
        <Tx>{R`最后，联络系数 $\Gamma$ 为`}</Tx>
        <Eq n="7.34" title="度规联络的一般形式" say={R`任何度规相容的联络都是 Christoffel 符号加上切扭（contorsion）张量：度规固定后，联络只剩挠率这一点自由。`}>{R`\begin{aligned}\Gamma^\kappa{}_{\mu\nu}&=\Gamma^\kappa{}_{(\mu\nu)}+\Gamma^\kappa{}_{[\mu\nu]}\\&=\left\{{\kappa\atop\mu\nu}\right\}+\frac12\left(T_\nu{}^\kappa{}_\mu+T_\mu{}^\kappa{}_\nu+T^\kappa{}_{\mu\nu}\right).\end{aligned}`}</Eq>
        <Tx>{R`\eqref{7.34} 最后一式的第二项称为**切扭**（contorsion），记作 $K^\kappa{}_{\mu\nu}$：`}</Tx>
        <Eq n="7.35" say={R`切扭张量：度规联络与 Levi-Civita 联络之差，完全由挠率决定。`}>{R`K^\kappa{}_{\mu\nu}\equiv\tfrac12\left(T^\kappa{}_{\mu\nu}+T_\mu{}^\kappa{}_\nu+T_\nu{}^\kappa{}_\mu\right).`}</Eq>
        <Tx>{R`若流形 $M$ 上挠率张量为零，度规联络 $\nabla$ 就称为 **Levi-Civita 联络**。Levi-Civita 联络是经典曲面几何中所定义联络的自然推广，见 §7.4。`}</Tx>
        <Exercise n="7.6" title="挠率与切扭的张量性" level="★★"
          hint={R`在 \eqref{7.29} 中交换 $\alpha\leftrightarrow\beta$ 后相减：非齐次项对 $\alpha,\beta$ 对称。$K$ 的性质直接由 $T^\kappa{}_{\mu\nu}=-T^\kappa{}_{\nu\mu}$ 展开验证。`}
          solution={R`**$T$ 是张量。**\eqref{7.29} 的非齐次项 $\frac{\partial^2x^\nu}{\partial y^\alpha\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}$ 关于 $\alpha,\beta$ 对称。于是

$$\widetilde T^\gamma{}_{\alpha\beta}=\widetilde\Gamma^\gamma{}_{\alpha\beta}-\widetilde\Gamma^\gamma{}_{\beta\alpha}=\frac{\partial y^\gamma}{\partial x^\nu}\left(\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\Gamma^\nu{}_{\lambda\mu}-\frac{\partial x^\lambda}{\partial y^\beta}\frac{\partial x^\mu}{\partial y^\alpha}\Gamma^\nu{}_{\lambda\mu}\right)=\frac{\partial x^\lambda}{\partial y^\alpha}\frac{\partial x^\mu}{\partial y^\beta}\frac{\partial y^\gamma}{\partial x^\nu}T^\nu{}_{\lambda\mu},$$

（第二项中交换哑指标 $\lambda\leftrightarrow\mu$）这正是 $(1,2)$ 型张量的变换律。

**$K^\kappa{}_{[\mu\nu]}=\frac12T^\kappa{}_{\mu\nu}$。**由 \eqref{7.35}，

$$K^\kappa{}_{\mu\nu}-K^\kappa{}_{\nu\mu}=\tfrac12\big(T^\kappa{}_{\mu\nu}-T^\kappa{}_{\nu\mu}\big)+\tfrac12\big(T_\mu{}^\kappa{}_\nu-T_\nu{}^\kappa{}_\mu\big)+\tfrac12\big(T_\nu{}^\kappa{}_\mu-T_\mu{}^\kappa{}_\nu\big)=T^\kappa{}_{\mu\nu},$$

所以 $K^\kappa{}_{[\mu\nu]}=\frac12(K^\kappa{}_{\mu\nu}-K^\kappa{}_{\nu\mu})=\frac12T^\kappa{}_{\mu\nu}$。这与 \eqref{7.34} 一致：联络的反对称部分 $\Gamma^\kappa{}_{[\mu\nu]}=\frac12T^\kappa{}_{\mu\nu}$ 全部来自切扭。

**$K_{\kappa\mu\nu}=-K_{\nu\mu\kappa}$。**记 $T_{\kappa\mu\nu}\equiv g_{\kappa\rho}T^\rho{}_{\mu\nu}$（关于后两个指标反对称）。降指标后 \eqref{7.35} 为 $K_{\kappa\mu\nu}=\frac12(T_{\kappa\mu\nu}+T_{\mu\kappa\nu}+T_{\nu\kappa\mu})$。于是

$$K_{\kappa\mu\nu}+K_{\nu\mu\kappa}=\tfrac12\big[(T_{\kappa\mu\nu}+T_{\kappa\nu\mu})+(T_{\mu\kappa\nu}+T_{\mu\nu\kappa})+(T_{\nu\kappa\mu}+T_{\nu\mu\kappa})\big]=0.$$

几何意义：$K_{\kappa\mu\nu}$ 对第一、三个指标反对称，所以 $\nabla_\mu=\mathring\nabla_\mu+K\cdot$ 中附加的项是"无穷小转动"，不改变长度——这正是度规相容联络可以带挠率的原因。`}>
          {R`证明 $T^\kappa{}_{\mu\nu}$ 服从张量的变换规则。［提示：用 \eqref{7.29}。］再证明 $K^\kappa{}_{[\mu\nu]}=\frac12T^\kappa{}_{\mu\nu}$，以及 $K_{\kappa\mu\nu}=-K_{\nu\mu\kappa}$，其中 $K_{\kappa\mu\nu}=g_{\kappa\lambda}K^\lambda{}_{\mu\nu}$。`}
        </Exercise>
      </Sub>
    </Sec>);
}
