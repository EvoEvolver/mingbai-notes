import { ManifoldRedraw } from "./_redraw_manifolds.jsx";
// 引言 + §5.1 流形 —— 式 (5.1)–(5.15)，定义 5.1，例 5.1–5.6，习题 5.1，图 5.1–5.5；交互图 1（S² 的两张球极投影卡）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Exercise, Derivation, C } from "@kit";
import { StereoLab } from "./_ch05_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="5.0" title="Introduction" zh="引言：局部像欧氏空间，整体未必"
      gist={R`流形是曲线、曲面向任意维的推广：**局部**同胚于 $\R^m$，**整体**可以不同。局部同胚让每点有 $m$ 个坐标；坐标之间的转换要求**光滑**——拓扑以连续性为基础，流形理论以光滑性为基础。`}
      why={R`物理里的位形空间、相空间、时空、规范群都不是 $\R^m$ 本身；要在上面做微积分（速度、梯度、积分、守恒律），就要一种"只用局部坐标、却与坐标无关"的语言。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="manifold" /></p>
      <Tx>{R`三维欧氏空间中的曲线在局部由一个参数 $t$ 描述，$(x(t),y(t),z(t))$；曲面由两个参数描述，$(x(u,v),y(u,v),z(u,v))$。于是可以说曲线局部同胚于 $\R$、曲面局部同胚于 $\R^2$。**流形**（manifold）把这一点推广到任意维：它是**局部**同胚于 $\R^m$ 的拓扑空间，但**整体**上可以与 $\R^m$ 不同。

局部同胚让我们能给流形上每一点指定 $m$ 个数——**（局部）坐标**。若流形整体上不同胚于 $\R^m$，就必须引入好几套局部坐标，于是同一个点可能有两套甚至更多坐标。我们要求从一套坐标到另一套的转换是**光滑的**——正是这一要求让我们能在流形上照常做微积分。一句话：*拓扑以连续性为基础，流形理论以光滑性为基础。*

本章内容是后面所有几何章节的地基：§5.1 定义流形并给出例子；§5.2 在流形上建立微积分——可微映射、切向量、一形式、张量与诱导映射；§5.3 由向量场生成流，并定义李导数与李括号；§5.4 微分形式与外微分；§5.5 微分形式的积分；§5.6 李群与李代数；§5.7 李群在流形上的作用。参考书：Crampin and Pirani (1986)、Matsushima (1972)、Schutz (1980)、Warner (1983)，以及 Wald (1984) 第 2 章与附录 B、C；Flanders (1963) 是微分形式的优美入门；Sattinger and Weaver (1986) 讲李群李代数并含大量物理应用。`}</Tx>
    </Sec>);
}

export function Sec51() {
  return (
    <Sec n="5.1" title="Manifolds" zh="流形"
      gist={R`用 $S^2$ 说明"单一坐标系做不到处处好用"→ 允许多张相互重叠的坐标卡，并要求重叠处的转移函数 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$ 光滑（\sref{D5.1}）→ 例子：$\R^m$、$S^1$、$S^n$、$\RP^n$、Grassmann 流形 $G_{k,n}(\R)$、乘积流形与环面 $T^n$。`}
      why={R`后面所有构造（向量、形式、积分、李群）都先在一张卡里用坐标写出，再证明与卡无关。要让"与卡无关"成立，卡之间的转换必须光滑。`}
      gives={["5.3", "5.9", "5.11", "5.13", "5.14"]}>
      <p className="muted">本节概念：<C id="manifold" /></p>

      <Sub n="5.1.1" title="Heuristic introduction" zh="启发性的引入">
        <Tx>{R`**一个熟悉的例子：球面上的坐标。**考虑 $\R^3$ 中的单位球面 $S^2$。给它的表面打坐标有很多办法，这里用两种：极坐标与球极投影坐标。极坐标 $\theta,\phi$ 的通常定义是（\figref{5.1}）`}</Tx>
        <Eq n="5.1" say={R`极坐标把球面上的点写成两个角：$\theta$ 是与北极方向的夹角，$\phi$ 是绕 $z$ 轴转过的经度。`}>{R`x=\sin\theta\cos\phi\qquad y=\sin\theta\sin\phi\qquad z=\cos\theta,`}</Eq>
        <Tx>{R`其中 $\phi$ 取 $0$ 到 $2\pi$，$\theta$ 取 $0$ 到 $\pi$。在球面上可以反解出`}</Tx>
        <Eq n="5.2" say={R`反过来由直角坐标求出两个角——但 $\tan^{-1}$ 只确定到象限，在两极与 $\phi=0$ 处出麻烦。`}>{R`\theta=\tan^{-1}\frac{\sqrt{x^2+y^2}}{z}\qquad\phi=\tan^{-1}\frac{y}{x}.`}</Eq>
        <Figure n="5.1" illustration={<ManifoldRedraw n="5.1"/>} caption={R`球面 $S^2$ 上一点 $P$ 的极坐标 $(\theta,\phi)$ 与球极投影坐标 $(X,Y)$。`} width="55%" />
        <Tx>{R`**球极投影坐标**（stereographic coordinates）则是从北极向赤道面投影得到的（\figref{5.1}）：连接北极 $(0,0,1)$ 与球面上的点 $P(x,y,z)$，延长这条直线直到与赤道面 $z=0$ 相交于 $Q(X,Y,0)$，$X$、$Y$ 就是 $P$ 的球极投影坐标。由相似三角形（直线上 $z$ 从 $1$ 降到 $z$ 时水平距离按比例 $1/(1-z)$ 放大）得到`}</Tx>
        <Eq n="5.3" keyEq title="北极球极投影" say={R`从北极看过去，球面上的点被"压"到赤道面：越靠近北极（$z\to1$），投影点跑得越远。`}>{R`X=\frac{x}{1-z}\qquad Y=\frac{y}{1-z}.`}</Eq>
        <Tx>{R`两套坐标的关系是`}</Tx>
        <Eq n="5.4" say={R`球极投影坐标与极坐标的换算：极角 $\theta$ 只通过 $\cot\frac12\theta$ 决定投影点离原点多远，经度 $\phi$ 决定方向。`}>{R`X=\cot\tfrac12\theta\cos\phi\qquad Y=\cot\tfrac12\theta\sin\phi.`}</Eq>
        <Derivation title={R`由 \eqref{5.1}、\eqref{5.3} 推出 \eqref{5.4}`} collapsed steps={[
          { tex: R`X=\frac{\sin\theta\cos\phi}{1-\cos\theta}`, why: R`把 \eqref{5.1} 代入 \eqref{5.3}。` },
          { tex: R`\frac{\sin\theta}{1-\cos\theta}=\frac{2\sin\frac\theta2\cos\frac\theta2}{2\sin^2\frac\theta2}=\cot\tfrac12\theta`, why: "半角公式。" },
          { tex: R`X=\cot\tfrac12\theta\cos\phi,\qquad Y=\cot\tfrac12\theta\sin\phi`, why: R`$Y$ 同理。` },
        ]} result={R`$X^2+Y^2=\cot^2\frac12\theta$：赤道（$\theta=\frac12\pi$）投到单位圆，南极投到原点，北极投到无穷远。`} />
        <Tx>{R`当然还可以用别的坐标：以别的轴为极轴的极坐标，或者从球面上别的点出发的投影。在做具体计算之前，坐标可以一直保持任意。［经度历史上从格林尼治算起，但完全可以从纽约或京都算起。］**坐标选取的这种任意性正是流形理论的基础：所有坐标系都一样好。**这与物理的基本原则相一致：*无论用什么坐标描述，物理系统的行为都相同。*

**单一坐标系的困难。**这个例子还说明：可能没有一套坐标能在所有地方同时好用。看 $S^2$ 上的极坐标。以赤道（$\theta=\frac12\pi$）为例：若让 $\phi$ 从 $0$ 跑到 $2\pi$，沿赤道走一圈时它连续变化，直到 $\phi=2\pi$ 处突然跳回 $0$——相邻的点有完全不同的 $\phi$ 值。若让 $\phi$ 越过 $2\pi$ 继续增加，又会遇到另一个困难：每一点都有无穷多个 $\phi$ 值，相差 $2\pi$ 的整数倍。两极处更糟，$\phi$ 根本没有定义。［站在极点上的探险家处于"无时间"状态，因为时间是由经度定义的。］球极投影坐标在北极（或任何投影点）同样有困难：投影点不落在赤道面上，而北极附近的点有相差极大的坐标。

因此，**不能用单一坐标系给球面上的点标号而同时满足**：

(i) 相邻的点总有相近的坐标；
(ii) 每一点有唯一的坐标。

不过，在 $S^2$ 的**一部分**上满足这两条的坐标有无穷多种。利用这一点：引入**两个或更多相互重叠**的坐标系，每个只覆盖球面的一部分，使得

(i′) 相邻的点至少在一个坐标系中有相近的坐标；
(ii′) 每一点在包含它的每个坐标系中都有唯一的坐标。

例如在 $S^2$ 上取两套球极投影坐标，一套从北极投影，一套从南极投影（\figref{5.5}）。

条件 (i′)(ii′) 足以发展出合理的流形理论吗？其实还需要一个条件：

(iii) 两个坐标系若有重叠，它们在重叠处以**足够光滑**的方式相互联系。

没有这一条，一个在某坐标系中可微的函数，换到另一坐标系中可能就不可微了。`}</Tx>
      </Sub>

      <Sub n="5.1.2" title="Definitions" zh="定义">
        <Tx>{R`把上面三个条件写成公理，就是微分流形的定义。`}</Tx>
        <Stmt id="D5.1" />
        <Figure n="5.2" illustration={<ManifoldRedraw n="5.2"/>} caption={R`同胚 $\varphi_i$ 把 $U_i$ 映到开子集 $U_i'\subset\R^m$，给 $p\in U_i$ 指定坐标。若 $U_i\cap U_j\neq\emptyset$，从一个坐标系到另一个的转换是光滑的。`} width="55%" />
        <Tx>{R`**术语。**对子 $(U_i,\varphi_i)$ 称为**卡**（chart），整族 $\{(U_i,\varphi_i)\}$ 称为**图册**（atlas）——这两个名字的来由显而易见。子集 $U_i$ 称为**坐标邻域**（coordinate neighbourhood），$\varphi_i$ 称为**坐标函数**，或简称**坐标**。同胚 $\varphi_i$ 由 $m$ 个函数 $\{x^1(p),\ldots,x^m(p)\}$ 表示，集合 $\{x^\mu(p)\}$ 也称为坐标。点 $p\in M$ 独立于它的坐标而存在；怎样给点指定坐标由我们决定。在只用一套坐标时，我们有时会随意地用 $x$ 表示坐标为 $\{x^1,\ldots,x^m\}$ 的点。

由 (ii)(iii)，$M$ **局部是欧氏的**：在每个坐标邻域 $U_i$ 中，$M$ 看起来像 $\R^m$ 的开子集，其元素为 $\{x^1,\ldots,x^m\}$。我们并不要求 $M$ 整体上就是 $\R^m$。我们生活在地球上，地表是 $S^2$，整体上不像 $\R^2$，局部却像 $\R^2$ 的开子集。只看伦敦地图，谁能说出我们住在球面上？［严格地说，城北两条经线之间的距离比城南略短，有人或许会怀疑自己住在弯曲的曲面上——住在南半球城市的人则情况相反。］

**转移函数。**若 $U_i$ 与 $U_j$ 重叠，$U_i\cap U_j$ 中的点有两套坐标。公理 (iv) 断言从一套到另一套的转换是光滑的（$C^\infty$）。$\varphi_i$ 给点 $p\in U_i\cap U_j$ 指定 $m$ 个坐标值 $x^\mu$（$1\le\mu\le m$），$\varphi_j$ 指定 $y^\nu$（$1\le\nu\le m$）；从 $x$ 到 $y$ 的转换 $y^\nu=y^\nu(x)$ 由 $m$ 个 $m$ 元函数给出，它正是映射 $\psi_{ji}=\varphi_j\circ\varphi_i^{-1}$ 的显式形式。于是可微性就是通常微积分意义下的可微性：每个函数 $y^\nu(x)$ 对每个 $x^\mu$ 可微。也可以只要求 $k$ 阶可微（$C^k$），但这不会带来什么有趣的结论；我们直接要求坐标变换**无穷次可微**，即 $C^\infty$。这样，无论我们怎样在 $M$ 上移动，所用的坐标都光滑地变化。`}</Tx>
        <Box kind="warning" title={R`勘误：$x$ 与 $y$ 的方向（p.193）`}>{R`原书此处写"$\varphi_i$ 给出 $x^\mu$、$\varphi_j$ 给出 $y^\nu$，从 $y$ 到 $x$ 的转换 $x^\mu=x^\mu(y)$ 是 $\psi_{ji}=\varphi_j\circ\varphi_i^{-1}$ 的显式形式"。按定义 $\psi_{ji}$ 从 $\varphi_i$ 的坐标（$x$）走到 $\varphi_j$ 的坐标（$y$），即 $y=y(x)$；而 $x=x(y)$ 是 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$。正文已按定义写成 $y^\nu=y^\nu(x)$。两种写法的光滑性要求等价（$\psi_{ij}=\psi_{ji}^{-1}$），结论不受影响。`}</Box>
        <Tx>{R`**微分结构。**若两个图册 $\{(U_i,\varphi_i)\}$ 与 $\{(V_j,\psi_j)\}$ 的并仍是图册，称它们**相容**（compatible）。相容是等价关系，其等价类称为**微分结构**（differentiable structure）。也就是说，相互相容的图册在 $M$ 上定义同一个微分结构。

**带边流形。**到目前为止我们假定坐标邻域 $U_i$ 同胚于 $\R^m$ 的开集。有些应用中这太严格，需要放宽。若拓扑空间 $M$ 被一族开集 $\{U_i\}$ 覆盖，每个 $U_i$ 同胚于

$$\mathbb{H}^m\equiv\{(x^1,\ldots,x^m)\in\R^m\mid x^m\ge0\}$$

的开集，则称 $M$ 为**带边流形**（manifold with a boundary），见\figref{5.3}。被映到 $x^m=0$ 的点的集合称为 $M$ 的**边界**，记作 $\partial M$；$\partial M$ 的坐标可以用 $m-1$ 个数 $(x^1,\ldots,x^{m-1},0)$ 给出。定义光滑性时要小心：映射 $\psi_{ij}:\varphi_j(U_i\cap U_j)\to\varphi_i(U_i\cap U_j)$ 一般定义在 $\mathbb{H}^m$ 的开集上；若它能在 $\R^m$ 中某个包含 $\varphi_j(U_i\cap U_j)$ 的开集上延拓为 $C^\infty$ 映射，就称它光滑。这个定义与我们对"边界"的直观一致：实心球 $D^3$ 的边界是球面 $S^2$，而球面的边界是空集。`}</Tx>
        <Figure n="5.3" illustration={<ManifoldRedraw n="5.3"/>} caption={R`带边流形。点 $p$ 在边界上。`} width="50%" />
      </Sub>

      <Sub n="5.1.3" title="Examples" zh="例子">
        <Tx>{R`下面给出几个例子来建立对流形的认识，它们与物理也有密切关系。`}</Tx>
        <Box kind="example" n="5.1" title={R`欧氏空间 $\R^m$`}>{R`欧氏空间 $\R^m$ 是最平凡的例子：一张卡覆盖整个空间，$\varphi$ 可以取为恒等映射。`}</Box>
        <Box kind="example" n="5.2" title={R`圆周 $S^1$ 的图册`}>
          <Tx>{R`设 $m=1$ 并要求 $M$ 连通。可能的流形只有两个：实直线 $\R$ 与圆周 $S^1$。我们为 $S^1$ 写出一个图册。具体取 $xy$ 平面中的圆 $x^2+y^2=1$。至少需要两张卡，可取\figref{5.4} 所示的两张。定义 $\varphi_1^{-1}:(0,2\pi)\to S^1$ 为`}</Tx>
          <Eq n="5.5a" say={R`第一张卡：用 $(0,2\pi)$ 中的角度标记除 $(1,0)$ 以外的点。`}>{R`\varphi_1^{-1}:\theta\mapsto(\cos\theta,\sin\theta)`}</Eq>
          <Tx>{R`其像是 $S^1-\{(1,0)\}$。再定义 $\varphi_2^{-1}:(-\pi,\pi)\to S^1$ 为`}</Tx>
          <Eq n="5.5b" say={R`第二张卡：同样的公式，但角度取在 $(-\pi,\pi)$，于是漏掉的是 $(-1,0)$。`}>{R`\varphi_2^{-1}:\theta\mapsto(\cos\theta,\sin\theta)`}</Eq>
          <Tx>{R`其像是 $S^1-\{(-1,0)\}$。显然 $\varphi_1^{-1}$ 与 $\varphi_2^{-1}$ 可逆，且 $\varphi_1,\varphi_2,\varphi_1^{-1},\varphi_2^{-1}$ 都连续，所以 $\varphi_1$、$\varphi_2$ 是同胚。

**验证转移函数光滑**（原书留给读者）。重叠区域 $U_1\cap U_2=S^1-\{(\pm1,0)\}$ 是上、下两段开弧。$\varphi_2(U_1\cap U_2)=(-\pi,0)\cup(0,\pi)$，在其上

$$\psi_{12}(\theta)=\varphi_1\circ\varphi_2^{-1}(\theta)=\begin{cases}\theta,&0<\theta<\pi\\ \theta+2\pi,&-\pi<\theta<0\end{cases}$$

在每一段上都只是平移，所以 $C^\infty$；$\psi_{21}=\psi_{12}^{-1}$ 同理（上半弧上为 $\theta$，下半弧 $(\pi,2\pi)$ 上为 $\theta-2\pi$）。注意转移函数在两段上取不同的常数平移——这正是"$\phi$ 绕一圈跳 $2\pi$"的困难被两张卡化解的方式。`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 5.2 的两处笔误（p.194）`}>{R`原书把圆写成 "$x^2+y^1=1$"，应为 $x^2+y^2=1$；第二张卡的引入句写作 "$\psi_2^{-1}:(-\pi,\pi)\to S^1$"，与紧接着的 \eqref{5.5b} 中的 $\varphi_2^{-1}$ 不一致，应为 $\varphi_2^{-1}$。正文已改正。`}</Box>
        <Figure n="5.4" illustration={<ManifoldRedraw n="5.4"/>} caption={R`圆周 $S^1$ 的两张卡。`} width="70%" />
        <Box kind="example" n="5.3" title={R`$n$ 维球面 $S^n$`}>
          <Tx>{R`$n$ 维球面 $S^n$ 是微分流形。它在 $\R^{n+1}$ 中实现为`}</Tx>
          <Eq n="5.6" say={R`$S^n$ 是 $\R^{n+1}$ 中到原点距离为 1 的点：$n+1$ 个坐标的平方和为 1，只剩 $n$ 个自由度。`}>{R`\sum_{i=0}^{n}(x^i)^2=1.`}</Eq>
          <Tx>{R`引入坐标邻域（每个坐标方向的两个开半球）`}</Tx>
          <Eq n="5.7a" say={R`第 $i$ 个坐标为正的开半球。`}>{R`U_{i+}\equiv\{(x^0,x^1,\ldots,x^n)\in S^n\mid x^i>0\}`}</Eq>
          <Eq n="5.7b" say={R`第 $i$ 个坐标为负的开半球。$2(n+1)$ 个半球合起来覆盖 $S^n$（每点至少有一个坐标非零）。`}>{R`U_{i-}\equiv\{(x^0,x^1,\ldots,x^n)\in S^n\mid x^i<0\}.`}</Eq>
          <Tx>{R`定义坐标映射 $\varphi_{i+}:U_{i+}\to\R^n$ 为`}</Tx>
          <Eq n="5.8a" say={R`把上半球垂直压到 $x^i=0$ 的平面：直接删去第 $i$ 个坐标。`}>{R`\varphi_{i+}(x^0,\ldots,x^n)=(x^0,\ldots,x^{i-1},x^{i+1},\ldots,x^n)`}</Eq>
          <Tx>{R`以及 $\varphi_{i-}:U_{i-}\to\R^n$ 为`}</Tx>
          <Eq n="5.8b" say={R`下半球用同一个公式，只是定义域不同；被删去的坐标可由 $x^i=\pm\sqrt{1-\sum_{j\neq i}(x^j)^2}$ 恢复，正负由所在半球决定。`}>{R`\varphi_{i-}(x^0,\ldots,x^n)=(x^0,\ldots,x^{i-1},x^{i+1},\ldots,x^n).`}</Eq>
          <Tx>{R`注意 $\varphi_{i+}$ 与 $\varphi_{i-}$ 的定义域不同。$\varphi_{i\pm}$ 是半球 $U_{i\pm}$ 向平面 $x^i=0$ 的投影。由 \eqref{5.8a}、\eqref{5.8b} 很容易得到转移函数。以 $S^2$ 为例，坐标邻域为 $U_{x\pm}$、$U_{y\pm}$、$U_{z\pm}$。转移函数 $\psi_{y-x+}\equiv\varphi_{y-}\circ\varphi_{x+}^{-1}$ 为`}</Tx>
          <Eq n="5.9" say={R`从"$x>0$ 半球"的坐标 $(y,z)$ 换到"$y<0$ 半球"的坐标 $(x,z)$：先用球面方程补回 $x=\sqrt{1-y^2-z^2}$，再删去 $y$。`}>{R`\psi_{y-x+}:(y,z)\mapsto\left(\sqrt{1-y^2-z^2},\,z\right)`}</Eq>
          <Tx>{R`它在 $U_{x+}\cap U_{y-}$ 上无穷次可微：那里 $1-y^2-z^2=x^2>0$，平方根的被开方数严格为正。`}</Tx>
        </Box>
        <Exercise n="5.1" title="两张球极投影卡构成微分结构" level="★"
          hint={R`先求南极投影坐标：连接南极 $(0,0,-1)$ 与 $P$，与赤道面交于 $(U,V)$。按\figref{5.5}，$U$ 轴与 $X$ 轴重合，而 $V$ 轴与 $Y$ 轴方向相反。再用 $X^2+Y^2=(1+z)/(1-z)$ 消去 $x,y,z$。`}
          solution={R`**两张卡。**北极投影 $\varphi_N:S^2-\{N\}\to\R^2$，$\varphi_N(x,y,z)=(X,Y)=\left(\frac{x}{1-z},\frac{y}{1-z}\right)$（\eqref{5.3}）。南极投影：连接 $S=(0,0,-1)$ 与 $P$，直线 $S+s(P-S)$ 在 $z=0$ 处 $s=1/(1+z)$，交点 $\left(\frac{x}{1+z},\frac{y}{1+z},0\right)$。\figref{5.5} 中 $U$ 轴与 $X$ 轴重合、$V$ 轴与 $Y$ 轴反向（从南极向上看时保持右手系），所以

$$\varphi_S(x,y,z)=(U,V)=\left(\frac{x}{1+z},\,-\frac{y}{1+z}\right),\qquad S^2-\{S\}\to\R^2.$$

两者都是同胚：$\varphi_N$ 的逆为 $x=\frac{2X}{1+X^2+Y^2}$，$y=\frac{2Y}{1+X^2+Y^2}$，$z=\frac{X^2+Y^2-1}{X^2+Y^2+1}$，连续；$\varphi_S$ 同理。两张卡覆盖 $S^2$。

**转移函数。**重叠区为 $S^2-\{N,S\}$，对应 $(X,Y)\neq(0,0)$。由 $x^2+y^2=1-z^2$，

$$X^2+Y^2=\frac{1-z^2}{(1-z)^2}=\frac{1+z}{1-z},$$

于是 $\frac{1}{1+z}=\frac{1}{1-z}\cdot\frac{1}{X^2+Y^2}$，

$$U=\frac{x}{1+z}=\frac{X}{X^2+Y^2},\qquad V=-\frac{y}{1+z}=-\frac{Y}{X^2+Y^2}.$$

对称地，$X=\frac{U}{U^2+V^2}$，$Y=-\frac{V}{U^2+V^2}$。在 $\R^2-\{0\}$ 上它们是分母不为零的有理函数，所以 $C^\infty$。于是 $\{(S^2-\{N\},\varphi_N),(S^2-\{S\},\varphi_S)\}$ 是图册，定义了 $S^2$ 上的微分结构。

**复数写法与 Jacobi 行列式。**令 $Z=X+\mathrm{i}Y$、$W=U+\mathrm{i}V$，则 $W=\bar Z/|Z|^2=1/Z$——转移函数是全纯的（这正是第 8 章例 8.1 把 $S^2$ 看成复流形 $\CP^1$ 的出发点）。Jacobi 行列式 $\det\frac{\partial(U,V)}{\partial(X,Y)}=\left|\frac{\dd W}{\dd Z}\right|^2=\frac{1}{(X^2+Y^2)^2}>0$。若不把 $V$ 轴反向，而取 $V=+y/(1+z)$，转移函数是关于单位圆的反演，仍然 $C^\infty$（同样定义微分结构），但 Jacobi 行列式为 $-1/(X^2+Y^2)^2<0$——这两张卡的定向相反（见 \secref{5.5.1}）。交互图 1 让你拖动点逐一核对这些公式。`}>
          {R`本章开头引入了 $S^2$ 上的球极投影坐标。同样可以定义从北极以外的点出发的球极投影。例如，$S^2-\{\text{南极}\}$ 中一点从南极投影得到的坐标 $(U,V)$，以及 $S^2-\{\text{北极}\}$ 中一点从北极投影得到的坐标 $(X,Y)$，如\figref{5.5} 所示。证明 $(U,V)$ 与 $(X,Y)$ 之间的转移函数是 $C^\infty$ 的，并且它们在 $S^2$ 上定义一个微分结构。另见例 8.1。`}
        </Exercise>
        <Figure n="5.5" illustration={<ManifoldRedraw n="5.5"/>} caption={R`$S^2$ 上的两个球极投影坐标系。点 $P$ 可以从北极 N 投影得到 $(X,Y)$，或从南极 S 投影得到 $(U,V)$。`} width="55%" />
        <StereoLab />
        <Box kind="example" n="5.4" title={R`实射影空间 $\RP^n$`}>
          <Tx>{R`**实射影空间** $\RP^n$ 是 $\R^{n+1}$ 中过原点的直线的集合。若 $x=(x^0,\ldots,x^n)\neq0$，$x$ 确定一条过原点的直线。若存在实数 $a\neq0$ 使 $y=ax$，则 $y\in\R^{n+1}$ 与 $x$ 确定同一条直线。引入等价关系：$x\sim y$ 当且仅当存在 $a\in\R-\{0\}$ 使 $y=ax$。于是 $\RP^n=(\R^{n+1}-\{0\})/\sim$。$n+1$ 个数 $x^0,x^1,\ldots,x^n$ 称为**齐次坐标**（homogeneous coordinates）。齐次坐标不是好的坐标系，因为 $\RP^n$ 是 $n$ 维流形（$n+1$ 维空间去掉一个自由度）。

卡的定义如下。先取坐标邻域 $U_i$ 为满足 $x^i\neq0$ 的直线的集合，再在 $U_i$ 上引入**非齐次坐标**（inhomogeneous coordinates）`}</Tx>
          <Eq n="5.10" say={R`在 $x^i\neq0$ 的直线上，用"除以第 $i$ 个坐标"去掉比例自由度：剩下的 $n$ 个比值就是好坐标。`}>{R`\xi^j_{(i)}=x^j/x^i.`}</Eq>
          <Tx>{R`非齐次坐标

$$\xi_{(i)}=(\xi^0_{(i)},\xi^1_{(i)},\ldots,\xi^{i-1}_{(i)},\xi^{i+1}_{(i)},\ldots,\xi^n_{(i)})$$

（略去恒为 1 的 $\xi^i_{(i)}$）在 $U_i$ 上有定义，因为 $x^i\neq0$；而且与等价类代表元的选取无关，因为 $y=ax$ 时 $x^j/x^i=y^j/y^i$。非齐次坐标 $\xi_{(i)}$ 给出坐标映射 $\varphi_i:U_i\to\R^n$：

$$\varphi_i:(x^0,\ldots,x^n)\mapsto(x^0/x^i,\ldots,x^{i-1}/x^i,x^{i+1}/x^i,\ldots,x^n/x^i),$$

其中略去了 $x^i/x^i=1$。对 $x=(x^0,x^1,\ldots,x^n)\in U_i\cap U_j$，有两套非齐次坐标 $\xi^k_{(i)}=x^k/x^i$ 与 $\xi^k_{(j)}=x^k/x^j$。坐标变换 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$ 为`}</Tx>
          <Eq n="5.11" say={R`射影空间的转移函数只是乘以一个比值 $x^j/x^i$；而它本身也可用 $j$ 卡的坐标写出（$x^j/x^i=1/\xi^i_{(j)}$），所以光滑。`}>{R`\psi_{ij}:\xi^k_{(j)}\mapsto\xi^k_{(i)}=(x^j/x^i)\xi^k_{(j)}.`}</Eq>
          <Tx>{R`这是乘以 $x^j/x^i$。**为什么它光滑**：$x^j/x^i=1/\xi^i_{(j)}$ 是 $j$ 卡中一个坐标的倒数，而在 $U_i\cap U_j$ 上 $\xi^i_{(j)}=x^i/x^j\neq0$；所以 $\xi^k_{(i)}=\xi^k_{(j)}/\xi^i_{(j)}$ 是分母不为零的有理函数，$C^\infty$。

在第 4 章例 4.12 中，我们把 $\RP^n$ 定义为把对径点粘合起来的球面 $S^n$。这一图像与这里的定义一致：作为等价类 $[x]$ 的代表元，可以取过原点直线上 $|x|=1$ 的点，即单位球面上的点。一条直线与 $S^n$ 交于两点，必须一致地选取其中一点，使相邻的直线由 $S^n$ 上相邻的点代表——这相当于取半球。但要注意，边界（$S^n$ 的赤道）上的对径点按定义是粘合的：$(x^0,\ldots,x^n)\sim-(x^0,\ldots,x^n)$。这个"半球"同胚于把边界 $S^{n-1}$ 上对径点粘合的球体 $D^n$。`}</Tx>
        </Box>
        <Box kind="example" n="5.5" title={R`Grassmann 流形 $G_{k,n}(\R)$`}>
          <Tx>{R`$\RP^n$ 的一个直接推广是 **Grassmann 流形**（Grassmann manifold）。$\RP^n$ 的元素是 $\R^{n+1}$ 中的一维子空间；Grassmann 流形 $G_{k,n}(\R)$ 是 $\R^n$ 中 $k$ 维平面的集合。注意 $G_{1,n+1}(\R)$ 就是 $\RP^n$。$G_{k,n}(\R)$ 的流形结构与 $\RP^n$ 的类似地定义。

设 $M_{k,n}(\R)$ 是秩为 $k$ 的 $k\times n$ 矩阵的集合（$k\le n$）。取 $A=(a_{ij})\in M_{k,n}(\R)$，定义 $\R^n$ 中 $k$ 个向量 $\boldsymbol{a}_i$（$1\le i\le k$）为 $\boldsymbol{a}_i=(a_{ij})$（$A$ 的行）。因为 $\operatorname{rank}A=k$，这 $k$ 个向量线性无关，张成 $\R^n$ 中的一个 $k$ 维平面。但 $M_{k,n}(\R)$ 中有无穷多个矩阵给出同一个 $k$ 平面：取 $g\in\mathrm{GL}(k,\R)$，矩阵 $\bar A=gA\in M_{k,n}(\R)$ 与 $A$ 定义同一个 $k$ 平面，因为 $g$ 只是在 $k$ 平面内部更换基底。引入等价关系：$\bar A\sim A$ 当且仅当存在 $g\in\mathrm{GL}(k,\R)$ 使 $\bar A=gA$。我们把 $G_{k,n}(\R)$ 等同于陪集空间 $M_{k,n}(\R)/\mathrm{GL}(k,\R)$。

**卡。**取 $A\in M_{k,n}(\R)$，设 $\{A_1,\ldots,A_l\}$（$l=\binom{n}{k}$）是 $A$ 的全部 $k\times k$ 子矩阵（minor）。因为 $\operatorname{rank}A=k$，存在某个 $A_\alpha$（$1\le\alpha\le l$）使 $\det A_\alpha\neq0$。例如设由前 $k$ 列组成的 $A_1$ 行列式不为零，写成`}</Tx>
          <Eq n="5.12" say={R`把 $k\times n$ 矩阵按列切成两块：左边一块是可逆的 $k\times k$ 方阵，右边是剩下的 $k\times(n-k)$ 块。`}>{R`A=(A_1,\widetilde{A}_1)`}</Eq>
          <Tx>{R`其中 $\widetilde{A}_1$ 是 $k\times(n-k)$ 矩阵。取该等价类的代表元为`}</Tx>
          <Eq n="5.13" say={R`用 $\mathrm{GL}(k)$ 的自由把左块化为单位阵：剩下右块的 $k(n-k)$ 个元素就是这个 $k$ 平面的坐标，而且不再有冗余。`}>{R`A_1^{-1}\cdot A=(I_k,A_1^{-1}\cdot\widetilde{A}_1)`}</Eq>
          <Tx>{R`其中 $I_k$ 是 $k\times k$ 单位矩阵。由于 $\det A_1\neq0$，$A_1^{-1}$ 总存在。于是真正的实自由度就是 $k\times(n-k)$ 矩阵 $A_1^{-1}\cdot\widetilde{A}_1$ 的元素。把 $G_{k,n}(\R)$ 的这个子集记作 $U_1$；$U_1$ 是坐标邻域，坐标由 $A_1^{-1}\cdot\widetilde{A}_1$ 的 $k(n-k)$ 个元素给出。由于 $U_1$ 同胚于 $\R^{k(n-k)}$，得到`}</Tx>
          <Eq n="5.14" title="Grassmann 流形的维数" say={R`$\R^n$ 中 $k$ 维平面的自由度是 $k(n-k)$：$k\times n$ 个矩阵元减去 $\mathrm{GL}(k)$ 的 $k^2$ 个冗余。$k=1$ 时回到 $\dim\RP^{n-1}=n-1$。`}>{R`\dim G_{k,n}(\R)=k(n-k).`}</Eq>
          <Tx>{R`若 $\det A_\alpha\neq0$，其中 $A_\alpha$ 由第 $(i_1,i_2,\ldots,i_k)$ 列组成，就乘以 $A_\alpha^{-1}$ 得到代表元`}</Tx>
          <Eq n="5.15" say={R`一般的卡：在第 $i_1,\ldots,i_k$ 列放单位矩阵，其余 $n-k$ 列的 $k(n-k)$ 个元素作为坐标。`}>{R`A_\alpha^{-1}\cdot A=\begin{pmatrix}\cdots&\overset{i_1}{1}&\cdots&\overset{i_2}{0}&\cdots\cdots&\overset{i_k}{0}&\cdots\\ \cdots&0&\cdots&1&\cdots\cdots&0&\cdots\\ \cdots&\vdots&\cdots&\vdots&\cdots\cdots&\vdots&\cdots\\ \cdots&0&\cdots&0&\cdots\cdots&1&\cdots\end{pmatrix}`}</Eq>
          <Tx>{R`其中没有明写出的元素组成一个 $k\times(n-k)$ 矩阵。把 $M_{k,n}(\R)$ 中满足 $\det A_\alpha\neq0$ 的子集（模去 $\mathrm{GL}(k,\R)$）记作 $U_\alpha$；这个 $k\times(n-k)$ 矩阵的元素就是 $U_\alpha$ 的坐标。在两张卡的重叠处，从 $U_\alpha$ 的代表元 $B=A_\alpha^{-1}A$ 换到 $U_\beta$ 的代表元，只需再左乘 $B_\beta^{-1}$（$B_\beta$ 为 $B$ 的第 $\beta$ 组列），而 $B_\beta^{-1}$ 的元素是 $B$ 的元素的有理函数（Cramer 法则），分母 $\det B_\beta\neq0$——所以转移函数光滑。

射影空间与 Grassmann 流形的关系一目了然。$M_{1,n+1}(\R)$ 的元素是向量 $A=(x^0,x^1,\ldots,x^n)$。由于 $A$ 的第 $\alpha$ 个"子矩阵" $A_\alpha$ 就是数 $x^\alpha$，条件 $\det A_\alpha\neq0$ 变成 $x^\alpha\neq0$。代表元 \eqref{5.15} 正是非齐次坐标：

$$(x^\alpha)^{-1}(x^0,x^1,\ldots,x^\alpha,\ldots,x^n)=(x^0/x^\alpha,x^1/x^\alpha,\ldots,x^\alpha/x^\alpha=1,\ldots,x^n/x^\alpha).$$`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：$\det A_\alpha\neq0$（p.197）`}>{R`原书在"存在某个 $A_\alpha$"之后写 "such that $\det A\neq0$"。$A$ 是 $k\times n$ 矩阵，没有行列式；应为 $\det A_\alpha\neq0$。正文已改正。`}</Box>
        <Tx>{R`**乘积流形。**设 $M$ 是带图册 $\{(U_i,\varphi_i)\}$ 的 $m$ 维流形，$N$ 是带图册 $\{(V_j,\psi_j)\}$ 的 $n$ 维流形。**乘积流形**（product manifold）$M\times N$ 是 $(m+n)$ 维流形，其图册为 $\{(U_i\times V_j),(\varphi_i,\psi_j)\}$。$M\times N$ 中的点写作 $(p,q)$，$p\in M$、$q\in N$，坐标函数 $(\varphi_i,\psi_j)$ 作用在 $(p,q)$ 上给出 $(\varphi_i(p),\psi_j(q))\in\R^{m+n}$。

验证乘积流形满足\sref{D5.1} 的公理（原书留给读者）：(i) $M\times N$ 取乘积拓扑；(ii)(iii) $U_i\times V_j$ 是开集，覆盖 $M\times N$，且 $(\varphi_i,\psi_j)$ 是 $U_i\times V_j$ 到 $\R^m\times\R^n$ 中开集 $U_i'\times V_j'$ 的同胚；(iv) 转移函数为 $(\varphi_i\circ\varphi_k^{-1},\ \psi_j\circ\psi_l^{-1})$，每个分量只依赖于各自的变量且都是 $C^\infty$，所以整体 $C^\infty$。`}</Tx>
        <Box kind="warning" title={R`勘误：$\psi_j(q)$（p.198）`}>{R`原书写 "$(\varphi_i(p),\psi_j(p))\in\R^{m+n}$"，第二个分量的 $p$ 应为 $q$（$\psi_j$ 是 $N$ 上的坐标函数，作用在 $q\in N$ 上）。正文已改正。`}</Box>
        <Box kind="example" n="5.6" title={R`环面 $T^2$ 与 $T^n$`}>{R`环面 $T^2$ 是两个圆周的乘积流形，$T^2=S^1\times S^1$。若把每个圆的极角记作 $\theta_i\bmod2\pi$（$i=1,2$），$T^2$ 的坐标就是 $(\theta_1,\theta_2)$。每个 $S^1$ 嵌入在 $\R^2$ 中，所以 $T^2$ 可嵌入 $\R^4$。我们常把 $T^2$ 想象成 $\R^3$ 中的甜甜圈表面，但那样就不可避免地引入了曲面的弯曲——这是"嵌入"带来的**外在**特征。说"环面是平坦流形"时，指的是嵌入 $\R^4$ 中的平坦曲面（详见\sref{D5.3}）。

也可以考虑 $n$ 个圆周的直积

$$T^n=\underbrace{S^1\times S^1\times\cdots\times S^1}_{n}.$$

显然 $T^n$ 是 $n$ 维流形，坐标为 $(\theta_1,\theta_2,\ldots,\theta_n)\bmod2\pi$。它可以看成对面粘合的 $n$ 维立方体（$n=2$ 的情形见第 2 章图 2.4）。`}</Box>
        <Box kind="physics" title="物理里的流形">{R`物理系统的**位形空间**往往天然是流形而不是 $\R^m$：平面双摆的位形空间是 $T^2$（两个角）；刚体转动的位形空间是 $\mathrm{SO}(3)$（§5.6）；$N$ 个全同粒子的位形空间要模去置换。**相空间**是位形空间的余切丛（例 5.12 中的 $(q^\mu,p_\mu)$）。广义相对论的时空是四维流形，"所有坐标系都一样好"正是广义协变性原理的数学表述。`}</Box>
      </Sub>
    </Sec>);
}
