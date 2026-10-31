// 引言 + §1.1 分析力学 —— 式 (1.1)–(1.25)，例 1.1–1.4，习题 1.1，定理 1.1（Noether）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";
import { ActionLab } from "./_ch01_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="1.0" title="Quantum Physics" zh="引言：为什么一本几何书从量子物理讲起"
      gist={R`本章是全书的"物理词典"：从分析力学出发，经正则量子化走到**路径积分**，再用它处理玻色子、费米子（Grassmann 数）、标量场、Dirac 场，最后引入规范场、磁单极与瞬子——后面各章的几何与拓扑都要在这些物理对象上"落地"。`}
      why={R`后面章节里的纤维丛、联络、示性类与指标定理，物理原型就是本章的规范势、磁单极荷与瞬子数；而反常（第 13 章）与弦论（第 14 章）的计算语言是路径积分。先把物理讲清，几何才有用武之地。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="action" /> · <C id="path_integral" /></p>
      <Tx>{R`本章简要介绍**路径积分量子化**（path integral quantization）。原书作者说得很直白：熟悉这些内容的物理系学生、以及对物理没有兴趣的数学系学生，可以跳过本章直接读第 2 章。不过对多数读者来说，本章是理解后面"为什么要学这些几何"的钥匙。

原书的讲法是"速写式"的（sketchy）。更详细的讨论可以参看 Bailin and Love (1996)、Cheng and Li (1984)、Huang (1982)、Das (1993)、Kleinert (1990)、Ramond (1989)、Ryder (1986) 与 Swanson (1992)；本章主要依据 Alvarez (1995)、Bertlmann (1996)、Das (1993)、Nakahara (1998)、Rabin (1995)、Sakita (1985) 与 Swanson (1992)。本站在原书略写之处用折叠的推导补全了步骤，并把原书中的若干笔误直接改正（旁注勘误框）。

我们的路线是：**作用量**（§1.1）→ **算符与对易子**（§1.2）→ **对所有路径求和**（§1.3）→ 用谐振子把路径积分算到底（§1.4）→ 费米子需要**反对易的数**（§1.5）→ 场论（§1.6–1.7）→ 规范对称性、磁单极与瞬子（§1.8–1.10）。`}</Tx>
    </Sec>);
}

export function Sec11() {
  return (
    <Sec n="1.1" title="Analytical mechanics" zh="分析力学"
      gist={R`把 Newton 方程改写成**作用量的极值条件** $\delta S=0$（Euler–Lagrange 方程），再经 Legendre 变换得到一阶的 Hamilton 方程与 Poisson 括号；连续对称性 ⇒ 守恒量（Noether 定理）。`}
      why={R`量子力学不能直接从 Newton 力学"推出来"。正则量子化要用 Poisson 括号（换成对易子），路径积分要用**对任意轨道都有定义**的作用量 $S$——两者都只存在于分析力学的语言中。`}
      gives={["1.5", "1.7", "1.15", "1.17", "1.20", "1.23", "1.25"]}>
      <Tx>{R`本节介绍理解量子力学所需的 Lagrange 形式与 Hamilton 形式的基本原理。`}</Tx>

      <Sub n="1.1.1" title="Newtonian mechanics" zh="Newton 力学">
        <p className="muted">本小节概念：<C id="action" /></p>
        <Tx>{R`考虑质量为 $m$ 的粒子（下面简称"粒子 $m$"）在三维空间中的运动，记 $\boldsymbol{x}(t)$ 为它在时刻 $t$ 的位置。设粒子受外力 $\boldsymbol{F}(\boldsymbol{x})$ 作用，则 $\boldsymbol{x}(t)$ 满足二阶微分方程`}</Tx>
        <Eq n="1.1" say={R`Newton 第二定律：质量乘加速度等于此处所受的力；给定初位置与初速度，轨道就完全确定。`}>{R`m\frac{\dd^2\boldsymbol{x}(t)}{\dd t^2}=\boldsymbol{F}(\boldsymbol{x}(t))`}</Eq>
        <Tx>{R`称为 **Newton 方程**或**运动方程**（equation of motion）。

若力可以由一个标量函数 $V(\boldsymbol{x})$ 写成 $\boldsymbol{F}(\boldsymbol{x})=-\nabla V(\boldsymbol{x})$，就称它为**保守力**（conserved force），$V(\boldsymbol{x})$ 称为**势能**（potential energy）或简称**势**。对保守力，组合`}</Tx>
        <Eq n="1.2" say={R`动能加势能；只要力是某个势的负梯度，这个量沿真实运动守恒——这就是能量。`}>{R`E=\frac{m}{2}\left(\frac{\dd\boldsymbol{x}}{\dd t}\right)^2+V(\boldsymbol{x})`}</Eq>
        <Tx>{R`守恒。事实上，

$$\frac{\dd E}{\dd t}=\sum_{k=x,y,z}\left[m\frac{\dd x_k}{\dd t}\frac{\dd^2x_k}{\dd t^2}+\frac{\partial V}{\partial x_k}\frac{\dd x_k}{\dd t}\right]=\sum_k\left(m\frac{\dd^2x_k}{\dd t^2}+\frac{\partial V}{\partial x_k}\right)\frac{\dd x_k}{\dd t}=0,$$

最后一步用了运动方程（括号内恰为 $m\ddot x_k-F_k=0$）。函数 $E$——通常是动能与势能之和——称为**能量**（energy）。`}</Tx>
        <Box kind="example" n="1.1" title="一维谐振子">{R`设 $x$ 为坐标，作用在 $m$ 上的力为 $F(x)=-kx$，$k$ 为常数。这个力是保守的：取 $V(x)=\tfrac12kx^2$，就有 $F(x)=-\dd V(x)/\dd x=-kx$。一般地，**任何只依赖于 $x$ 的一维力 $F(x)$ 都是保守的**，势由

$$V(x)=-\int^xF(\xi)\,\dd\xi$$

给出（一维时"无旋"条件自动满足）。非保守力的例子是摩擦力 $F=-\eta\,\dd x/\dd t$——它依赖于速度。以下只讨论保守力。`}</Box>
      </Sub>

      <Sub n="1.1.2" title="Lagrangian formalism" zh="Lagrange 形式">
        <p className="muted">本小节概念：<C id="action" /> · <C id="hamilton" /></p>
        <Tx>{R`**为什么不满足于 Newton 力学？**它有以下困难：

1. 它建立在矢量方程 \eqref{1.1} 上，除非用正交坐标系，否则不好处理；
2. 运动方程是二阶的，系统的整体性质不容易看出；
3. 对称性分析不方便；
4. 约束不容易纳入。

此外，量子力学无法直接从 Newton 力学导出。为克服这些困难，我们引入 Lagrange 形式。

设系统的状态（例如各质点的位置）由 $N$ 个参数 $\{q_i\}$（$1\le i\le N$）描述。这些参数是某个**空间** $M$ 的元素（更准确地说是流形，见第 5 章）；$M$ 称为**位形空间**（configuration space），$\{q_i\}$ 称为**广义坐标**（generalized coordinates）。例如圆周上的粒子，广义坐标 $q$ 是角度 $\theta$，位形空间 $M$ 是一个圆周。**广义速度**定义为 $\dot q_i=\dd q_i/\dd t$。

**Lagrange 量**（Lagrangian）$L(q,\dot q)$ 是一个待定函数，下面由 Hamilton 原理来确定。为简单起见主要讨论一维情形，推广到高维是显然的。考虑满足 $q(t_i)=q_i$、$q(t_f)=q_f$ 的轨道 $q(t)$（$t\in[t_i,t_f]$），以及**泛函**（functional，"函数的函数"：给定一个函数 $f$，得到一个数 $F[f]$）`}</Tx>
        <Eq n="1.3" keyEq title="作用量" say={R`作用量：把 Lagrange 量沿整条轨道积分，任给一条轨道（不必是真实运动）都得到一个实数。`}>{R`S[q(t),\dot q(t)]=\int_{t_i}^{t_f}L(q,\dot q)\,\dd t`}</Eq>
        <Tx>{R`称为**作用量**（action）。给定轨道 $q(t)$ 与 $\dot q(t)$，作用量 $S[q,\dot q]$ 给出一个实数。**Hamilton 原理**（又称**最小作用量原理**）断言：物理上实现的轨道对应于作用量的**极值**。Lagrange 量要选得使 Hamilton 原理成立。

**把整体原理写成局部的微分方程。**设 $q(t)$ 使 $S$ 取极值，考虑端点固定的变分 $\delta q(t)$：$\delta q(t_i)=\delta q(t_f)=0$。作用量的变化为`}</Tx>
        <Eq n="1.4" say={R`作用量的一阶变分：分部积分把 $\delta\dot q$ 转移成 $\delta q$，端点项因端点固定而消失，只剩 Euler–Lagrange 表达式乘以 $\delta q$。`}>{R`\begin{aligned}\delta S&=\int_{t_i}^{t_f}L(q+\delta q,\dot q+\delta\dot q)\,\dd t-\int_{t_i}^{t_f}L(q,\dot q)\,\dd t\\&=\int_{t_i}^{t_f}\left(\frac{\partial L}{\partial q}-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q}\right)\delta q\,\dd t\end{aligned}`}</Eq>
        <Derivation title={R`从第一行到第二行（原书省略）`} collapsed steps={[
          { tex: R`L(q+\delta q,\dot q+\delta\dot q)-L(q,\dot q)=\frac{\partial L}{\partial q}\delta q+\frac{\partial L}{\partial\dot q}\delta\dot q+\mathcal{O}(\delta q^2)`, why: R`Taylor 展开到一阶。` },
          { tex: R`\frac{\partial L}{\partial\dot q}\delta\dot q=\frac{\dd}{\dd t}\left(\frac{\partial L}{\partial\dot q}\delta q\right)-\left(\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q}\right)\delta q`, why: R`$\delta\dot q=\dd(\delta q)/\dd t$：变分与求导可交换。` },
          { tex: R`\int_{t_i}^{t_f}\frac{\dd}{\dd t}\left(\frac{\partial L}{\partial\dot q}\delta q\right)\dd t=\left[\frac{\partial L}{\partial\dot q}\delta q\right]_{t_i}^{t_f}=0`, why: R`端点条件 $\delta q(t_i)=\delta q(t_f)=0$。` },
        ]} result={R`$\delta S=\int(\partial L/\partial q-\tfrac{\dd}{\dd t}\partial L/\partial\dot q)\,\delta q\,\dd t$，即 \eqref{1.4} 第二行。`} />
        <Tx>{R`由于 $q$ 使 $S$ 取极值，$\delta S$ 必须为零；而这对**任意** $\delta q$ 都成立，所以 \eqref{1.4} 最后一行的被积函数本身必须为零（变分法基本引理）。于是得到 **Euler–Lagrange 方程**`}</Tx>
        <Eq n="1.5" keyEq title="Euler–Lagrange 方程" say={R`作用量取极值的局部条件：广义力 $\partial L/\partial q$ 等于广义动量 $\partial L/\partial\dot q$ 的时间变化率。`}>{R`\frac{\partial L}{\partial q}-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q}=0`}</Eq>
        <Tx>{R`有 $N$ 个自由度时，对每个坐标都有一个方程：`}</Tx>
        <Eq n="1.6" say={R`每个广义坐标各有一条 Euler–Lagrange 方程，一共 $N$ 条二阶常微分方程。`}>{R`\frac{\partial L}{\partial q_k}-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_k}=0\qquad(1\le k\le N).`}</Eq>
        <Tx>{R`引入与坐标 $q_k$ **共轭的广义动量**（generalized momentum）`}</Tx>
        <Eq n="1.7" title="广义动量" say={R`广义动量定义为 Lagrange 量对广义速度的偏导数；对普通粒子它就是 $m\dot q$。`}>{R`p_k=\frac{\partial L}{\partial\dot q_k}`}</Eq>
        <Tx>{R`Euler–Lagrange 方程就写成`}</Tx>
        <Eq n="1.8" say={R`Euler–Lagrange 方程的"牛顿式"读法：广义动量的变化率等于广义力。`}>{R`\frac{\dd p_k}{\dd t}=\frac{\partial L}{\partial q_k}.`}</Eq>
        <Tx>{R`要求这个方程回到 Newton 方程，就能定出普通质点力学中 Lagrange 量的形式：取 $L=\tfrac12m\dot{\boldsymbol{q}}^2-V(\boldsymbol{q})$（动能减势能）。代入 Euler–Lagrange 方程：$\partial L/\partial q_k=-\partial V/\partial q_k$，$p_k=m\dot q_k$，于是`}</Tx>
        <Eq n="1.9" say={R`取 $L=$ 动能 $-$ 势能，Euler–Lagrange 方程恰好就是 Newton 方程。`}>{R`m\ddot q_k+\frac{\partial V}{\partial q_k}=0.`}</Eq>
        <Tx>{R`以一维谐振子为例，Lagrange 量为`}</Tx>
        <Eq n="1.10" say={R`一维谐振子的 Lagrange 量：动能 $\tfrac12m\dot x^2$ 减弹性势能 $\tfrac12kx^2$。`}>{R`L(x,\dot x)=\tfrac12m\dot x^2-\tfrac12kx^2`}</Eq>
        <Tx>{R`由此得 $m\ddot x+kx=0$。

**"最小"作用量其实只是"稳定"。**下面的交互图在谐振子上直接验证 \eqref{1.4}：固定端点，在经典轨道上叠加端点为零的扰动 $a\,\eta(t)$，数值计算 $S(a)$。因为谐振子的 $L$ 是二次的，$S(a)=S_{\rm cl}+a^2\,\delta^2S$ 是一条精确的抛物线，没有一次项——这就是 $\delta S=0$。当时间区间足够长，某些扰动模式会使 $S$ **减小**：经典轨道是鞍点而不是最小值。路径积分（§1.3）只用到"稳定"这一性质。`}</Tx>
        <ActionLab />
        <Tx>{R`**泛函导数。**为后面方便，引入**泛函导数**（functional derivative）的概念。为简单起见只考虑一个自由度。定义 $S$ 对 $q$ 的泛函导数为`}</Tx>
        <Eq n="1.11" say={R`泛函导数：在时刻 $s$ 处给轨道一个 $\delta$ 函数式的"戳"，看作用量变化多少；它是偏导数 $\partial f/\partial x_i$ 在"连续指标 $s$"上的推广。`}>{R`\frac{\delta S[q,\dot q]}{\delta q(s)}\equiv\lim_{\varepsilon\to0}\frac{\{S[q(t)+\varepsilon\delta(t-s),\dot q(t)+\varepsilon\frac{\dd}{\dd t}\delta(t-s)]-S[q(t),\dot q(t)]\}}{\varepsilon}.`}</Eq>
        <Tx>{R`由于

$$\begin{aligned}S\left[q(t)+\varepsilon\delta(t-s),\dot q(t)+\varepsilon\frac{\dd}{\dd t}\delta(t-s)\right]&=\int\dd t\,L\left(q(t)+\varepsilon\delta(t-s),\dot q(t)+\varepsilon\frac{\dd}{\dd t}\delta(t-s)\right)\\&=\int\dd t\,L(q,\dot q)+\varepsilon\int\dd t\left(\frac{\partial L}{\partial q}\delta(t-s)+\frac{\partial L}{\partial\dot q}\frac{\dd}{\dd t}\delta(t-s)\right)+\mathcal{O}(\varepsilon^2)\\&=S[q,\dot q]+\varepsilon\left(\frac{\partial L}{\partial q}(s)-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q}(s)\right)+\mathcal{O}(\varepsilon^2),\end{aligned}$$

（最后一步对含 $\tfrac{\dd}{\dd t}\delta$ 的项分部积分，$s$ 取在区间内部），Euler–Lagrange 方程可以写成`}</Tx>
        <Eq n="1.12" say={R`Euler–Lagrange 方程等价于：作用量对每个时刻的轨道值的泛函导数都为零。`}>{R`\frac{\delta S}{\delta q(s)}=\frac{\partial L}{\partial q}(s)-\frac{\dd}{\dd t}\left(\frac{\partial L}{\partial\dot q}\right)(s)=0.`}</Eq>
        <Tx>{R`**对称性与守恒量。**设 Lagrange 量 $L$ 不依赖于某个坐标 $q_k$（当然可以依赖 $\dot q_k$，否则这个坐标根本与我们无关）。这样的坐标称为**循环坐标**（cyclic coordinate）。与循环坐标共轭的动量守恒：由 $\partial L/\partial q_k=0$，`}</Tx>
        <Eq n="1.13" say={R`若 Lagrange 量不含某个坐标，与之共轭的动量就不随时间变化。`}>{R`\frac{\dd p_k}{\dd t}=\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_k}=\frac{\partial L}{\partial q_k}=0.`}</Eq>
        <Tx>{R`这个论证可以更数学化。设 $L$ 有一个**连续**参数化的对称性：作用量 $S=\int\dd t\,L$ 在作用于 $q_k(t)$ 的对称操作下不变。考虑轨道上的无穷小对称操作 $q_k(t)\to q_k(t)+\delta q_k(t)$（对称性连续，所以总能定义无穷小操作；注意这里 $\delta q(t_i)$、$\delta q(t_f)$ 一般**不**为零）。若 $q_k(t)$ 使作用量取极值，则 $q_k+\delta q_k$ 也是极值轨道。由于 $S$ 在此变化下不变，

$$\delta S=\int_{t_i}^{t_f}\sum_k\delta q_k\left(\frac{\partial L}{\partial q_k}-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_k}\right)+\sum_k\left[\delta q_k\frac{\partial L}{\partial\dot q_k}\right]_{t_i}^{t_f}=0.$$

中间的积分项因 $q$ 满足 Euler–Lagrange 方程而为零。于是得到`}</Tx>
        <Eq n="1.14" say={R`对称变换下，$\sum_k\delta q_k\,p_k$ 在初末时刻相等；由于时刻任取，它就是一个守恒量。`}>{R`\sum_k\delta q_k(t_i)p_k(t_i)=\sum_k\delta q_k(t_f)p_k(t_f)`}</Eq>
        <Tx>{R`这里用了 $p_k=\partial L/\partial\dot q_k$。由于 $t_i$、$t_f$ 任意，这个等式说明 $\sum_k\delta q_k(t)p_k(t)$ 与 $t$ 无关，即守恒。`}</Tx>
        <Box kind="example" n="1.2" title="中心势中的粒子：角动量守恒">{R`粒子 $m$ 在球对称势 $V(r)$ 中运动，$r,\theta,\phi$ 为三维球坐标。Lagrange 量为

$$L=\tfrac12m[\dot r^2+r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)]-V(r).$$

$q_k=\phi$ 是循环坐标（$L$ 只含 $\dot\phi$），对称操作 $\phi\to\phi+\delta\phi$（$\delta\phi$ 为常数）给出守恒律

$$\delta\phi\frac{\partial L}{\partial\dot\phi}\propto mr^2\sin^2\theta\,\dot\phi=\text{常数}.$$

这正是绕 $z$ 轴的角动量。类似的论证（绕 $x$、$y$ 轴的转动也是对称操作，只是对应的坐标不再是循环坐标）表明绕 $x$、$y$ 轴的角动量也守恒。`}</Box>
        <Tx>{R`**两点注记。**

◆ 设 $Q(q)$ 是 $q$ 的任意函数，则 Lagrange 量 $L$ 与 $L+\dd Q/\dd t$ 给出同一个 Euler–Lagrange 方程。事实上（$\dd Q/\dd t=\sum_j(\partial Q/\partial q_j)\dot q_j$）

$$\begin{aligned}&\frac{\partial}{\partial q_k}\left(L+\frac{\dd Q}{\dd t}\right)-\frac{\dd}{\dd t}\left[\frac{\partial}{\partial\dot q_k}\left(L+\frac{\dd Q}{\dd t}\right)\right]\\&=\frac{\partial L}{\partial q_k}+\frac{\partial}{\partial q_k}\frac{\dd Q}{\dd t}-\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_k}-\frac{\dd}{\dd t}\frac{\partial}{\partial\dot q_k}\left(\sum_j\frac{\partial Q}{\partial q_j}\dot q_j\right)\\&=\frac{\partial}{\partial q_k}\frac{\dd Q}{\dd t}-\frac{\dd}{\dd t}\frac{\partial Q}{\partial q_k}=0.\end{aligned}$$

（第二行前后两项按 Euler–Lagrange 方程相消；最后一步：两者都等于 $\sum_j\partial^2Q/\partial q_k\partial q_j\,\dot q_j$。）从作用量看更直接：$\int\dd t\,\dd Q/\dd t=Q(q_f)-Q(q_i)$ 只依赖于端点，不影响变分。

◆ 一个有趣的观察：Newton 力学是作用量的极值，但作用量本身**对任意轨道都有定义**。这一事实在量子论的路径积分表述中起关键作用。`}</Tx>
      </Sub>

      <Sub n="1.1.3" title="Hamiltonian formalism" zh="Hamilton 形式">
        <p className="muted">本小节概念：<C id="hamilton" /></p>
        <Tx>{R`Lagrange 形式给出二阶常微分方程（ODE）。相比之下，Hamilton 形式给出关于时间**一阶**的运动方程，因而可以在后面定义的**相空间**里引入"流"。更重要的是，Hamilton 形式使**辛结构**（symplectic structure）显现出来，这将在例 5.12 中说明。

给定 Lagrange 量 $L$，对应的 **Hamilton 量**由变量的 Legendre 变换定义：`}</Tx>
        <Eq n="1.15" title="Hamilton 量（Legendre 变换）" say={R`Hamilton 量是 Lagrange 量的 Legendre 变换：用动量 $p$ 取代速度 $\dot q$ 作自变量；对普通粒子它就是能量。`}>{R`H(q,p)\equiv\sum_kp_k\dot q_k-L(q,\dot q),`}</Eq>
        <Tx>{R`其中左边的 $\dot q$ 已利用动量定义 $p_k=\partial L(q,\dot q)/\partial\dot q_k$ 换成 $p$ 的函数。要使这个变换有定义（能把 $\dot q$ 反解为 $p$ 的函数），Jacobi 行列式必须满足

$$\det\left(\frac{\partial p_i}{\partial\dot q_j}\right)=\det\left(\frac{\partial^2L}{\partial\dot q_i\partial\dot q_j}\right)\neq0.$$

以 $(q_k,p_k)$ 为坐标的空间称为**相空间**（phase space）。

考虑由 $\delta q_k$、$\delta p_k$ 引起的 Hamilton 量的无穷小变化：

$$\begin{aligned}\delta H&=\sum_k\left[\delta p_k\dot q_k+p_k\delta\dot q_k-\frac{\partial L}{\partial q_k}\delta q_k-\frac{\partial L}{\partial\dot q_k}\delta\dot q_k\right]\\&=\sum_k\left[\delta p_k\dot q_k-\frac{\partial L}{\partial q_k}\delta q_k\right]\end{aligned}$$

（$p_k\delta\dot q_k$ 与 $-\tfrac{\partial L}{\partial\dot q_k}\delta\dot q_k$ 按动量定义相消——这正是 Legendre 变换的用意：$H$ 不依赖于 $\delta\dot q$）。由此`}</Tx>
        <Eq n="1.16" say={R`Legendre 变换的直接后果：$H$ 对 $p$ 的偏导数给出速度，对 $q$ 的偏导数是 $L$ 对 $q$ 偏导数的负值——这只是换了自变量，还没有用运动方程。`}>{R`\frac{\partial H}{\partial p_k}=\dot q_k,\qquad\frac{\partial H}{\partial q_k}=-\frac{\partial L}{\partial q_k}`}</Eq>
        <Tx>{R`这只不过是自变量的替换。若再用 Euler–Lagrange 方程 \eqref{1.8} 把第二式的右边换成 $-\dot p_k$，就得到 **Hamilton 运动方程**：`}</Tx>
        <Eq n="1.17" keyEq title="Hamilton 正则方程" say={R`Hamilton 正则方程：$2N$ 个一阶方程，速度是 $H$ 对动量的偏导，力是 $H$ 对坐标偏导的负值；相空间中每一点都有唯一的流向。`}>{R`\dot q_k=\frac{\partial H}{\partial p_k}\qquad\dot p_k=-\frac{\partial H}{\partial q_k}.`}</Eq>
        <Box kind="example" n="1.3" title="谐振子的 Hamilton 形式"><Tx>{R`一维谐振子，Lagrange 量 $L=\tfrac12m\dot q^2-\tfrac12m\omega^2q^2$，其中 $\omega^2=k/m$。与 $q$ 共轭的动量为 $p=\partial L/\partial\dot q=m\dot q$，可解出 $\dot q=p/m$。Hamilton 量为`}</Tx>
          <Eq n="1.18" say={R`谐振子的 Hamilton 量：动能 $p^2/2m$ 加势能 $\tfrac12m\omega^2q^2$，即总能量。`}>{R`H(q,p)=p\dot q-L(q,\dot q)=\frac{p^2}{2m}+\frac12m\omega^2q^2.`}</Eq>
          <Tx>{R`Hamilton 运动方程为`}</Tx>
          <Eq n="1.19" say={R`谐振子的正则方程：相空间中的点沿椭圆 $H=$ 常数以角频率 $\omega$ 旋转。`}>{R`\frac{\dd p}{\dd t}=-m\omega^2q\qquad\frac{\dd q}{\dd t}=\frac{p}{m}.`}</Eq>
          <Tx>{R`两式合起来即 $\ddot q=-\omega^2q$，解为 $q=A\cos(\omega t+\phi)$。`}</Tx>
        </Box>
        <Tx>{R`**Poisson 括号。**取相空间上的两个函数 $A(q,p)$、$B(q,p)$，定义 **Poisson 括号**（Poisson bracket）`}</Tx>
        <Eq n="1.20" title="Poisson 括号" say={R`Poisson 括号：两个相空间函数的"辛内积"，坐标导数与动量导数交叉相乘再相减；它是量子对易子的经典原型。`}>{R`[A,B]=\sum_k\left(\frac{\partial A}{\partial q_k}\frac{\partial B}{\partial p_k}-\frac{\partial A}{\partial p_k}\frac{\partial B}{\partial q_k}\right).`}</Eq>
        <Tx>{R`（后面引入算符的对易子 $[A,B]$ 后，为避免混淆，Poisson 括号将记作 $[A,B]_{\rm PB}$。）`}</Tx>
        <Exercise n="1.1" title="Poisson 括号是 Lie 括号" level="★"
          hint={R`线性与反对称直接由定义 \eqref{1.20} 看出。Jacobi 恒等式：把 $[[A,B],C]$ 展开后，每一项都恰好含一个二阶导数；按"二阶导数落在哪个函数上"分组，证明落在 $A$ 上的项在三个循环项中相消（另两组由轮换对称性同理）。`}
          solution={R`**(1.21a) 线性。**$\partial(c_1B_1+c_2B_2)/\partial p_k=c_1\partial B_1/\partial p_k+c_2\partial B_2/\partial p_k$，对 $q_k$ 同理，代入 \eqref{1.20} 即得。

**(1.21b) 反对称。**交换 $A,B$ 时 \eqref{1.20} 括号内两项互换，整体变号。

**(1.21c) Jacobi 恒等式。**为书写方便记 $\xi=(q_1,\ldots,q_N,p_1,\ldots,p_N)$，$[A,B]=\sum_{a,b}\omega_{ab}\,\partial_aA\,\partial_bB$，其中 $\omega_{ab}$ 是常数反对称矩阵（$\omega_{q_kp_k}=1$，$\omega_{p_kq_k}=-1$，其余为零）。则

$$[[A,B],C]=\sum_{a,b,c,d}\omega_{cd}\,\omega_{ab}\,\partial_c(\partial_aA\,\partial_bB)\,\partial_dC=\sum\omega_{cd}\omega_{ab}\big(\partial_c\partial_aA\,\partial_bB\,\partial_dC+\partial_aA\,\partial_c\partial_bB\,\partial_dC\big).$$

看含 $A$ 的**二阶**导数的项。它们来自 $[[A,B],C]$ 的第一项与 $[[C,A],B]$ 中 $A$ 被求导的项（$[[B,C],A]$ 中 $A$ 只出现一阶导数）：

$$T_1=\sum\omega_{cd}\omega_{ab}\,\partial_c\partial_aA\,\partial_bB\,\partial_dC,\qquad T_2=\sum\omega_{cd}\omega_{ab}\,\partial_aC\,\partial_c\partial_bA\,\partial_dB.$$

把两者的哑指标都改写成 $\partial_x\partial_yA\,\partial_uB\,\partial_vC$ 的形式：$T_1$ 中令 $(c,a,b,d)\to(x,y,u,v)$，$T_2$ 中令 $(c,b,d,a)\to(x,y,u,v)$，得

$$T_1=\sum\omega_{xv}\omega_{yu}\,\partial_x\partial_yA\,\partial_uB\,\partial_vC=\sum\omega_{yv}\omega_{xu}\,\partial_x\partial_yA\,\partial_uB\,\partial_vC,\qquad T_2=\sum\omega_{xu}\omega_{vy}\,\partial_x\partial_yA\,\partial_uB\,\partial_vC,$$

其中 $T_1$ 的第二种写法交换了哑指标 $x\leftrightarrow y$（$\partial_x\partial_yA$ 对称）。于是 $T_1+T_2=\sum\omega_{xu}(\omega_{yv}+\omega_{vy})\,\partial_x\partial_yA\,\partial_uB\,\partial_vC=0$，因为 $\omega$ 反对称。$B$、$C$ 的二阶导数项由轮换对称性同样相消。所有项都含恰好一个二阶导数，因此总和为零。

**结论**：Poisson 括号满足 Lie 括号的三条公理。几何上这是因为 Poisson 括号由一个**闭**的辛形式定义（第 5 章例 5.12）——Jacobi 恒等式等价于辛形式的闭性。`}>
          <Tx>{R`证明 Poisson 括号是 **Lie 括号**（Lie bracket），即满足`}</Tx>
          <Eq n="1.21a" say={R`线性：Poisson 括号对第二个参数是线性的（由反对称性，对第一个参数也是）。`}>{R`[A,c_1B_1+c_2B_2]=c_1[A,B_1]+c_2[A,B_2]\qquad\text{线性}`}</Eq>
          <Eq n="1.21b" say={R`反对称：交换两个函数，括号变号；特别地 $[A,A]=0$。`}>{R`[A,B]=-[B,A]\qquad\text{反对称}`}</Eq>
          <Eq n="1.21c" say={R`Jacobi 恒等式：三个函数的二重括号轮换求和为零，这保证 Poisson 括号像矩阵对易子一样构成 Lie 代数。`}>{R`[[A,B],C]+[[C,A],B]+[[B,C],A]=0\qquad\textbf{Jacobi 恒等式}`}</Eq>
        </Exercise>
        <Tx>{R`**基本 Poisson 括号**为`}</Tx>
        <Eq n="1.22" title="基本 Poisson 括号" say={R`坐标与坐标、动量与动量的括号为零，同一自由度的坐标与动量的括号为 1——量子化时它将变成 $[\hat q,\hat p]=\mathrm{i}$。`}>{R`[p_i,p_j]=[q_i,q_j]=0\qquad[q_i,p_j]=\delta_{ij}.`}</Eq>
        <Tx>{R`重要的是，物理量 $A(q,p)$（不显含时间）的时间演化可以用 Poisson 括号表示：`}</Tx>
        <Eq n="1.23" title="用 Poisson 括号写时间演化" say={R`任何物理量的变化率等于它与 Hamilton 量的 Poisson 括号：Hamilton 量"生成"时间平移。`}>{R`\begin{aligned}\frac{\dd A}{\dd t}&=\sum_k\left(\frac{\partial A}{\partial q_k}\frac{\dd q_k}{\dd t}+\frac{\partial A}{\partial p_k}\frac{\dd p_k}{\dd t}\right)\\&=\sum_k\left(\frac{\partial A}{\partial q_k}\frac{\partial H}{\partial p_k}-\frac{\partial A}{\partial p_k}\frac{\partial H}{\partial q_k}\right)\\&=[A,H].\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.23} 中的偏导数`}>{R`原书 \eqref{1.23} 第一、二行把 $\partial A/\partial q_k$、$\partial A/\partial p_k$ 印成了全导数记号 $\dd A/\dd q_k$、$\dd A/\dd p_k$。$A(q,p)$ 是相空间上的函数，这里应为偏导数，已改正。`}</Box>
        <Tx>{R`若 $[A,H]=0$，则 $A$ 守恒，$\dd A/\dd t=0$。Hamilton 方程本身可以写成`}</Tx>
        <Eq n="1.24" say={R`正则方程的括号形式：$\dot p_k$、$\dot q_k$ 都是它们与 $H$ 的 Poisson 括号。`}>{R`\frac{\dd p_k}{\dd t}=[p_k,H]\qquad\frac{\dd q_k}{\dd t}=[q_k,H].`}</Eq>
        <Stmt id="T1.1">
          <Eq n="1.25" keyEq title="Noether 荷" say={R`若 Hamilton 量在坐标的无穷小变换 $q_k\to q_k+\varepsilon f_k$ 下不变，则动量沿变换方向的投影 $\sum_kp_kf_k$ 守恒。`}>{R`Q=\sum_kp_kf_k(q)`}</Eq>
          <Proof steps={[
            { claim: R`按定义 $H(q_k,p_k)=H(q'_k,p'_k)$。由 $q'_k=q_k+\varepsilon f_k(q)$，坐标变换的 Jacobi 矩阵准确到 $\mathcal{O}(\varepsilon)$ 为`, tex: R`\Lambda_{ij}=\frac{\partial q'_i}{\partial q_j}\simeq\delta_{ij}+\varepsilon\frac{\partial f_i(q)}{\partial q_j}` },
            { claim: R`动量作为余切矢量按逆矩阵变换（这样 $\sum_kp_k\dot q_k$ 不变）：`, tex: R`p_i\to\sum_jp_j\Lambda^{-1}_{ji}\simeq p_i-\varepsilon\sum_jp_j\frac{\partial f_j}{\partial q_i}`, why: R`$\Lambda^{-1}\simeq1-\varepsilon\,\partial f/\partial q$，准确到一阶。` },
            { claim: R`把 $H$ 在 $(q_k,p_k)$ 处展开到一阶（重复指标求和）：`, tex: R`\begin{aligned}0&=H(q'_k,p'_k)-H(q_k,p_k)=\frac{\partial H}{\partial q_k}\varepsilon f_k(q)-\frac{\partial H}{\partial p_j}\varepsilon p_i\frac{\partial f_i}{\partial q_j}\\&=\varepsilon\left[\frac{\partial H}{\partial q_k}f_k(q)-\frac{\partial H}{\partial p_j}p_i\frac{\partial f_i}{\partial q_j}\right]\end{aligned}` },
            { claim: R`方括号恰为 Poisson 括号 $[H,Q]$：$\partial Q/\partial p_k=f_k$，$\partial Q/\partial q_j=\sum_ip_i\,\partial f_i/\partial q_j$。再用 \eqref{1.23} 与反对称性：`, tex: R`0=\varepsilon[H,Q]=-\varepsilon[Q,H]=-\varepsilon\frac{\dd Q}{\dd t}`, uses: ["1.20", "1.23", "1.21b"], fill: true, why: R`原书最后一步写成 $\varepsilon[H,Q]=\varepsilon\,\dd Q/\dd t$，漏了一个负号（见下方勘误）；结论不受影响。` },
            { claim: R`所以 $\dd Q/\dd t=0$，$Q$ 守恒。` },
          ]} />
        </Stmt>
        <Box kind="warning" title={R`勘误：Noether 定理证明的最后一步差一个符号`}>{R`原书 p.28 写作 "$=\varepsilon[H,Q]=\varepsilon\,\dd Q/\dd t$"，并把第一项写成 $\tfrac{\partial H}{\partial q_k}\varepsilon f(q)$（漏了下标 $k$）。由 \eqref{1.23}，$\dd Q/\dd t=[Q,H]=-[H,Q]$，所以应为 $\varepsilon[H,Q]=-\varepsilon\,\dd Q/\dd t$。因为左边等于零，符号不影响"$Q$ 守恒"的结论。本站正文已改正。`}</Box>
        <Tx>{R`**解读。**这个定理说明：**找守恒量等价于找使 Hamilton 量不变的变换。**而且守恒量 $Q$ 正是这个变换的"**生成元**"（generator）：

$$[q_i,Q]=\sum_k\left[\frac{\partial q_i}{\partial q_k}\frac{\partial Q}{\partial p_k}-\frac{\partial q_i}{\partial p_k}\frac{\partial Q}{\partial q_k}\right]=\sum_k\delta_{ik}f_k(q)=f_i(q),$$

即 $\delta q_i=\varepsilon f_i(q)=\varepsilon[q_i,Q]$。比较 \eqref{1.24}：$H$ 生成时间平移，$Q$ 生成对称变换。

举几个例子。自由粒子 $H=p^2/2m$ 不依赖于 $q$，在 $q\mapsto q+\varepsilon\cdot1$、$p\mapsto p$ 下不变，所以 $Q=p\cdot1=p$ 守恒——这就是线动量。`}</Tx>
        <Box kind="example" n="1.4" title="平面中心势：角动量">{R`粒子 $m$ 在二维平面内运动，势 $V(r)$ 轴对称。在极坐标 $(r,\theta)$ 下 Lagrange 量为

$$L(r,\theta)=\tfrac12m(\dot r^2+r^2\dot\theta^2)-V(r).$$

正则共轭动量为 $p_r=m\dot r$，$p_\theta=mr^2\dot\theta$。Hamilton 量为

$$H=p_r\dot r+p_\theta\dot\theta-L=\frac{p_r^2}{2m}+\frac{p_\theta^2}{2mr^2}+V(r).$$

它显然不依赖于 $\theta$，因而在变换 $\theta\mapsto\theta+\varepsilon\cdot1$、$p_\theta\mapsto p_\theta$ 下不变。对应的守恒量为

$$Q=p_\theta\cdot1=mr^2\dot\theta,$$

即角动量。`}</Box>
        <Box kind="warning" title={R`勘误：例 1.4 的 Lagrange 量`}>{R`原书 p.28 把 Lagrange 量印作 $L(r,\theta)=\tfrac12m(\dot r^2+r^2\dot\phi^2)-V(r)$。坐标是 $(r,\theta)$，角速度应为 $\dot\theta$（随后的 $p_\theta=mr^2\dot\theta$ 也表明如此）。本站已改为 $\dot\theta$。`}</Box>
      </Sub>
    </Sec>);
}
