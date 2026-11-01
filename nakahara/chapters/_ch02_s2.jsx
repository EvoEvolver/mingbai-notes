import { FoundationsRedraw } from "./_redraw_foundations.jsx";
// §2.2 向量空间 —— 式 (2.6)–(2.24)，定理 2.1–2.2，习题 2.8–2.12，图 2.9
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Exercise, Erratum, Derivation, C } from "@kit";

const R = String.raw;

export function Sec22() {
  return (
    <Sec n="2.2" title="Vector spaces" zh="向量空间"
      gist={R`基与分量；**维数公式** $\dim V=\dim\ker f+\dim\operatorname{im}f$；对偶空间 $V^*$、对偶基 $e^{*i}(e_j)=\delta^i{}_j$ 与**拉回** $f^*(g)=g\circ f$；内积 $g:V\to V^*$ 给出**伴随** $\tilde f=g^{-1}f^{\rm t}G^{\rm t}$ 与**玩具指标定理**；$(p,q)$ 型**张量**、张量积与缩并。`}
      why={R`流形在每一点附近"像" $\mathbb{R}^n$：切向量构成向量空间，微分形式是对偶向量，度规是 $(0,2)$ 型张量，曲率是 $(1,3)$ 型张量。这一节是后面所有微分几何计算的语法。`}
      gives={["2.8", "2.10", "2.12", "2.13", "2.19", "2.21", "2.23"]}>
      <Sub n="2.2.1" title="Vectors and vector spaces" zh="向量与向量空间">
        <Tx>{R`域 $K$ 上的**向量空间**（vector space，或线性空间 linear space）$V$ 是一个集合，其上定义了两种运算：加法，以及与 $K$ 中元素（称为**标量** scalar）的乘法。（本书主要关心 $K=\mathbb{R}$ 与 $\mathbb{C}$。）$V$ 的元素称为**向量**（vector），满足下列公理：

(i) $\boldsymbol{u}+\boldsymbol{v}=\boldsymbol{v}+\boldsymbol{u}$；

(ii) $(\boldsymbol{u}+\boldsymbol{v})+\boldsymbol{w}=\boldsymbol{u}+(\boldsymbol{v}+\boldsymbol{w})$；

(iii) 存在零向量 $\boldsymbol{0}$，使 $\boldsymbol{v}+\boldsymbol{0}=\boldsymbol{v}$；

(iv) 对任意 $\boldsymbol{u}$，存在 $-\boldsymbol{u}$，使 $\boldsymbol{u}+(-\boldsymbol{u})=\boldsymbol{0}$；

(v) $c(\boldsymbol{u}+\boldsymbol{v})=c\boldsymbol{u}+c\boldsymbol{v}$；

(vi) $(c+d)\boldsymbol{u}=c\boldsymbol{u}+d\boldsymbol{u}$；

(vii) $(cd)\boldsymbol{u}=c(d\boldsymbol{u})$；

(viii) $1\boldsymbol{u}=\boldsymbol{u}$。

这里 $\boldsymbol{u},\boldsymbol{v},\boldsymbol{w}\in V$，$c,d\in K$，$1$ 是 $K$ 的单位元。前四条说 $V$ 对加法是 Abel 群，后四条说数乘与加法相容。

**线性相关与线性无关。**设 $\{\boldsymbol{v}_i\}$ 是 $k\,(>0)$ 个向量构成的集合。若方程`}</Tx>
        <Eq n="2.6" say="一组向量的线性组合等于零：若只能所有系数都为零，这组向量就线性无关；否则就相关。">{R`x_1\boldsymbol{v}_1+x_2\boldsymbol{v}_2+\cdots+x_k\boldsymbol{v}_k=\boldsymbol{0}`}</Eq>
        <Tx>{R`有非平凡解（某个 $x_i\neq0$），就称向量组 $\{\boldsymbol{v}_j\}$ **线性相关**（linearly dependent）；若 \eqref{2.6} 只有平凡解（所有 $x_i=0$），称 $\{\boldsymbol{v}_i\}$ **线性无关**（linearly independent）。只要其中有一个是零向量 $\boldsymbol{0}$，向量组就一定线性相关（给零向量系数 1、其余系数 0）。

**基与分量。**一组线性无关的向量 $\{\boldsymbol{e}_i\}$ 若能把任意 $\boldsymbol{v}\in V$ **唯一地**写成它们的线性组合，就称为 $V$ 的**基**（basis）：`}</Tx>
        <Eq n="2.7" say={R`任何向量都能唯一地按基展开；展开系数 $v^i$ 就是它在这组基下的“坐标”。`}>{R`\boldsymbol{v}=v^1\boldsymbol{e}_1+v^2\boldsymbol{e}_2+\cdots+v^n\boldsymbol{e}_n.`}</Eq>
        <Tx>{R`数 $v^i\in K$ 称为 $\boldsymbol{v}$ 关于基 $\{\boldsymbol{e}_j\}$ 的**分量**（components）。若基中有 $n$ 个元素，就说 $V$ 的**维数**是 $n$，记作 $\dim V=n$。$n$ 维 $K$ 上的向量空间通常记作 $V(n,K)$（若 $n$、$K$ 由上下文可知，简记为 $V$）。我们总假定 $n$ 有限。

注意记号：分量带**上**指标 $v^i$，基向量带**下**指标 $\boldsymbol{e}_i$。这是为了配合**求和约定**：同一项中一上一下重复出现的指标自动求和，如 $v^i\boldsymbol{e}_i\equiv\sum_iv^i\boldsymbol{e}_i$。本章后面的 \eqref{2.11}、\eqref{2.12} 起都这样写。`}</Tx>
      </Sub>

      <Sub n="2.2.2" title="Linear maps, images and kernels" zh="线性映射、像与核">
        <p className="muted">本小节概念：<C id="linmap" /></p>
        <Tx>{R`给定向量空间 $V$、$W$，映射 $f:V\to W$ 若对任意 $a_1,a_2\in K$ 与 $\boldsymbol{v}_1,\boldsymbol{v}_2\in V$ 满足 $f(a_1\boldsymbol{v}_1+a_2\boldsymbol{v}_2)=a_1f(\boldsymbol{v}_1)+a_2f(\boldsymbol{v}_2)$，就称为**线性映射**（linear map）。线性映射是同态的一个例子：它保持向量加法与数乘。

$f$ 的**像**是 $f(V)\subset W$，**核**是 $\{\boldsymbol{v}\in V\mid f(\boldsymbol{v})=\boldsymbol{0}\}$，分别记作 $\operatorname{im}f$ 与 $\ker f$。$\ker f$ 不会是空集，因为总有 $f(\boldsymbol{0})=\boldsymbol{0}$。若 $W$ 就是域 $K$ 本身，$f$ 称为**线性函数**（linear function）。若 $f$ 是同构，就说 $V$ 与 $W$ **同构**，记作 $V\cong W$，此时 $\dim V=\dim W$。事实上，所有 $n$ 维向量空间都同构于 $K^n$，可视为同一个向量空间；向量空间之间的同构是 $\mathrm{GL}(n,K)$ 的元素。

下面这条定理是本节的主力，它告诉我们：一个线性映射"压扁"了多少维与"保留"了多少维，加起来正好是原空间的维数。`}</Tx>
        <Stmt id="T2.1">
          <Eq n="2.8" keyEq title="维数公式（秩–零化度定理）" say="线性映射丢掉的维数（核）加上留下的维数（像）等于原空间的总维数——维数守恒。">{R`\dim V=\dim(\ker f)+\dim(\operatorname{im}f).`}</Eq>
          <Proof steps={[
            { claim: R`$\ker f$ 与 $\operatorname{im}f$ 都是向量空间（习题 2.8(1)）。`, tex: R`f(a\boldsymbol{v}_1+b\boldsymbol{v}_2)=af(\boldsymbol{v}_1)+bf(\boldsymbol{v}_2)`, why: R`若 $\boldsymbol{v}_1,\boldsymbol{v}_2\in\ker f$，右边为 $\boldsymbol{0}$，故 $a\boldsymbol{v}_1+b\boldsymbol{v}_2\in\ker f$；对像，$af(\boldsymbol{v}_1)+bf(\boldsymbol{v}_2)$ 恰是 $a\boldsymbol{v}_1+b\boldsymbol{v}_2$ 的像。`, fill: true },
            { claim: R`取 $\ker f$ 的基 $\{\boldsymbol{g}_1,\ldots,\boldsymbol{g}_r\}$ 与 $\operatorname{im}f$ 的基 $\{\boldsymbol{h}'_1,\ldots,\boldsymbol{h}'_s\}$。对每个 $i$（$1\le i\le s$）取 $\boldsymbol{h}_i\in V$ 使 $f(\boldsymbol{h}_i)=\boldsymbol{h}'_i$，考虑向量组 $\{\boldsymbol{g}_1,\ldots,\boldsymbol{g}_r,\boldsymbol{h}_1,\ldots,\boldsymbol{h}_s\}$。`, why: R`$\boldsymbol{h}'_i\in\operatorname{im}f$，所以原像存在（不必唯一）。` },
            { claim: R`它们张成 $V$。任取 $\boldsymbol{v}\in V$，$f(\boldsymbol{v})\in\operatorname{im}f$ 可展开为`, tex: R`f(\boldsymbol{v})=c^i\boldsymbol{h}'_i=c^if(\boldsymbol{h}_i)\ \Rightarrow\ f(\boldsymbol{v}-c^i\boldsymbol{h}_i)=\boldsymbol{0}\ \Rightarrow\ \boldsymbol{v}-c^i\boldsymbol{h}_i\in\ker f`, why: R`于是 $\boldsymbol{v}-c^i\boldsymbol{h}_i=a^j\boldsymbol{g}_j$，即 $\boldsymbol{v}=a^j\boldsymbol{g}_j+c^i\boldsymbol{h}_i$：$V$ 由这 $r+s$ 个向量张成。` },
            { claim: R`它们线性无关。设 $a^i\boldsymbol{g}_i+b^i\boldsymbol{h}_i=\boldsymbol{0}$，两边作用 $f$：`, tex: R`\boldsymbol{0}=f(\boldsymbol{0})=f(a^i\boldsymbol{g}_i+b^i\boldsymbol{h}_i)=b^if(\boldsymbol{h}_i)=b^i\boldsymbol{h}'_i`, why: R`$f(\boldsymbol{g}_i)=\boldsymbol{0}$；$\{\boldsymbol{h}'_i\}$ 线性无关，所以 $b^i=0$；再由 $a^i\boldsymbol{g}_i=\boldsymbol{0}$ 与 $\{\boldsymbol{g}_i\}$ 线性无关得 $a^i=0$。` },
            { claim: R`所以它们是 $V$ 的基，`, tex: R`\dim V=r+s=\dim(\ker f)+\dim(\operatorname{im}f)` },
          ]} />
        </Stmt>
        <Erratum kind="note" loc="p.97 定理 2.1 后的注" title={R`"正交补"应理解为"一个补空间"`}>{R`原书注记说：$\{\boldsymbol{h}_1,\ldots,\boldsymbol{h}_s\}$ 张成的空间称为 $\ker f$ 的**正交补**，记作 $(\ker f)^\perp$。在没有内积的向量空间里谈不上"正交"；而且 $\boldsymbol{h}_i$ 可以随意加上 $\ker f$ 中的向量，所张成的空间并不唯一。准确的说法是：它是 $\ker f$ 的**一个补空间**，$V=\ker f\oplus\operatorname{span}\{\boldsymbol{h}_i\}$。只有在给定内积（§2.2.4）之后，才有唯一的正交补 $(\ker f)^\perp$——选 $\boldsymbol{h}_i$ 与 $\ker f$ 正交即可，它同构于 $\operatorname{im}f$。`}</Erratum>
        <Box kind="example" title="一个具体的检验">{R`$f:\mathbb{R}^3\to\mathbb{R}^2$，$f(x,y,z)=(x+y,\,y+z)$。核：$x+y=0=y+z$ ⇒ $(x,y,z)=t(1,-1,1)$，$\dim\ker f=1$。像：$f(1,0,0)=(1,0)$、$f(0,0,1)=(0,1)$，所以 $\operatorname{im}f=\mathbb{R}^2$，$\dim\operatorname{im}f=2$。$1+2=3=\dim\mathbb{R}^3$ ✓。证明中的 $\boldsymbol{h}_i$ 可取 $(1,0,0)$、$(0,0,1)$；与 $\boldsymbol{g}_1=(1,-1,1)$ 合起来确是 $\mathbb{R}^3$ 的基。`}</Box>
        <Exercise n="2.8" title="核、像与同构" level="★"
          hint={R`(1) 验证对线性组合封闭。(2) "⇐"：先证单射，再用维数公式证满射。`}
          solution={R`**(1)** $f(\boldsymbol{0})=f(0\cdot\boldsymbol{0})=0\cdot f(\boldsymbol{0})=\boldsymbol{0}$，故 $\boldsymbol{0}\in\ker f$、$\boldsymbol{0}\in\operatorname{im}f$。若 $\boldsymbol{v}_1,\boldsymbol{v}_2\in\ker f$，则 $f(a\boldsymbol{v}_1+b\boldsymbol{v}_2)=af(\boldsymbol{v}_1)+bf(\boldsymbol{v}_2)=\boldsymbol{0}$；若 $\boldsymbol{w}_1=f(\boldsymbol{v}_1)$、$\boldsymbol{w}_2=f(\boldsymbol{v}_2)$，则 $a\boldsymbol{w}_1+b\boldsymbol{w}_2=f(a\boldsymbol{v}_1+b\boldsymbol{v}_2)\in\operatorname{im}f$。两者都对线性组合封闭，是子空间（公理 (i)–(viii) 从 $V$、$W$ 继承）。

**(2)** "⇒"：同构是双射，特别是单射；$f(\boldsymbol{0})=\boldsymbol{0}$，所以没有别的向量被送到 $\boldsymbol{0}$，$\ker f=\{\boldsymbol{0}\}$。

"⇐"：设 $\ker f=\{\boldsymbol{0}\}$。单射：$f(\boldsymbol{v})=f(\boldsymbol{v}')\Rightarrow f(\boldsymbol{v}-\boldsymbol{v}')=\boldsymbol{0}\Rightarrow\boldsymbol{v}=\boldsymbol{v}'$。满射：由 \eqref{2.8}，$\dim\operatorname{im}f=\dim V-0=\dim V$；$\operatorname{im}f$ 是 $V$ 中维数与 $V$ 相同的子空间，故 $\operatorname{im}f=V$。于是 $f$ 是线性双射；其逆 $f^{-1}$ 也线性（$f(af^{-1}(\boldsymbol{w}_1)+bf^{-1}(\boldsymbol{w}_2))=a\boldsymbol{w}_1+b\boldsymbol{w}_2$），所以 $f$ 是同构。

（有限维是关键：在无穷维空间中，"右移算子" $(x_1,x_2,\ldots)\mapsto(0,x_1,x_2,\ldots)$ 核为零却不是满射。）`}>
          {R`(1) 设 $f:V\to W$ 是线性映射。证明 $\ker f$ 与 $\operatorname{im}f$ 都是向量空间。(2) 证明线性映射 $f:V\to V$ 是同构当且仅当 $\ker f=\{\boldsymbol{0}\}$。`}
        </Exercise>
      </Sub>

      <Sub n="2.2.3" title="Dual vector space" zh="对偶向量空间">
        <p className="muted">本小节概念：<C id="dual" /></p>
        <Tx>{R`对偶向量空间已经在 §1.2 量子力学的语境中出现过（bra 与 ket）。这里的讲法更数学化，可与那里互补。

设 $f:V\to K$ 是域 $K$ 上向量空间 $V(n,K)$ 上的线性函数。取基 $\{\boldsymbol{e}_i\}$ 与任意向量 $\boldsymbol{v}=v^1\boldsymbol{e}_1+\cdots+v^n\boldsymbol{e}_n$。由线性，$f(\boldsymbol{v})=v^1f(\boldsymbol{e}_1)+\cdots+v^nf(\boldsymbol{e}_n)$。所以**只要知道 $f$ 在每个基向量上的值 $f(\boldsymbol{e}_i)$，就知道它对任何向量的作用**。值得注意的是，线性函数的全体本身构成向量空间：两个线性函数的线性组合仍是线性函数，`}</Tx>
        <Eq n="2.9" say="线性函数可以相加、数乘：组合后的函数作用在向量上，就是各自作用的结果再组合。">{R`(a_1f_1+a_2f_2)(\boldsymbol{v})=a_1f_1(\boldsymbol{v})+a_2f_2(\boldsymbol{v})`}</Eq>
        <Tx>{R`这个线性空间称为 $V(n,K)$ 的**对偶向量空间**（dual vector space），记作 $V^*(n,K)$，或简记为 $V^*$。若 $\dim V$ 有限，则 $\dim V^*=\dim V$。

为 $V^*$ 引入基 $\{e^{*i}\}$。由于 $e^{*i}$ 是线性函数，给出所有 $e^{*i}(\boldsymbol{e}_j)$ 就完全确定了它。我们选取**对偶基**（dual basis）：`}</Tx>
        <Eq n="2.10" keyEq title="对偶基" say={R`第 $i$ 个对偶基向量的作用就是“读出第 $i$ 个分量”：吃到第 $i$ 个基向量给 1，吃到其余基向量给 0。`}>{R`e^{*i}(\boldsymbol{e}_j)=\delta^i{}_j.`}</Eq>
        <Tx>{R`任何线性函数 $f$（在这一语境下称为**对偶向量** dual vector）都可以按 $\{e^{*i}\}$ 展开：`}</Tx>
        <Eq n="2.11" say={R`对偶向量按对偶基展开，系数 $f_i=f(\boldsymbol{e}_i)$ 带下指标。`}>{R`f=f_ie^{*i}.`}</Eq>
        <Tx>{R`（两边作用在 $\boldsymbol{e}_j$ 上即知 $f_j=f(\boldsymbol{e}_j)$，所以 $\{e^{*i}\}$ 张成 $V^*$；若 $f_ie^{*i}=0$，作用在 $\boldsymbol{e}_j$ 上得 $f_j=0$，所以线性无关——这正说明 $\dim V^*=n$。）$f$ 对 $\boldsymbol{v}$ 的作用可以解释为一个**行向量与一个列向量的内积**：`}</Tx>
        <Eq n="2.12" keyEq title="对偶向量与向量的配对" say={R`对偶向量吃一个向量，结果就是分量对分量相乘再求和——行向量乘列向量，无需任何度规。`}>{R`f(\boldsymbol{v})=f_ie^{*i}(v^j\boldsymbol{e}_j)=f_iv^je^{*i}(\boldsymbol{e}_j)=f_iv^i.`}</Eq>
        <Tx>{R`有时用记号 $\langle\ ,\ \rangle:V^*\times V\to K$ 表示这个配对，$\langle f,\boldsymbol{v}\rangle\equiv f(\boldsymbol{v})$。

**拉回。**设 $V$、$W$ 是向量空间，$f:V\to W$ 是线性映射，$g:W\to K$ 是 $W$ 上的线性函数（$g\in W^*$）。易见复合 $g\circ f$ 是 $V$ 上的线性函数。于是 $f$ 与 $g$ 给出一个元素 $h\in V^*$：`}</Tx>
        <Eq n="2.13" keyEq title="拉回" say={R`要在 $V$ 上得到一个线性函数，先用 $f$ 把向量送到 $W$，再用 $W$ 上的函数 $g$ 求值——方向与 $f$ 相反。`}>{R`h(\boldsymbol{v})\equiv g(f(\boldsymbol{v}))\qquad\boldsymbol{v}\in V.`}</Eq>
        <Tx>{R`给定 $g\in W^*$，映射 $f:V\to W$ 诱导出 $h\in V^*$。相应地，我们得到诱导映射 $f^*:W^*\to V^*$，$f^*:g\mapsto h=f^*(g)$，见 \figref{2.9}。$h$ 称为 $g$ 被 $f^*$ 的**拉回**（pullback）。`}</Tx>
        <Figure n="2.9" illustration={<FoundationsRedraw n="2.9"/>} caption={R`函数 $g$ 的拉回是函数 $f^*(g)=g\circ f$。`} width="45%" />
        <Tx>{R`注意箭头方向：$f$ 从 $V$ 指向 $W$，$f^*$ 却从 $W^*$ 指回 $V^*$。函数是"被动"的东西，只能沿着映射**往回拉**。分量形式：若 $f(\boldsymbol{e}_i)=f^\alpha{}_i\boldsymbol{f}_\alpha$（$\{\boldsymbol{f}_\alpha\}$ 为 $W$ 的基），则 $(f^*g)_i=(f^*g)(\boldsymbol{e}_i)=g(f(\boldsymbol{e}_i))=g_\alpha f^\alpha{}_i$——拉回就是用 $f$ 的矩阵从右边去乘行向量 $g_\alpha$。

**向量空间与其对偶空间的同构不是典范的。**由于 $\dim V^*=\dim V$，$V$ 与 $V^*$ 之间存在同构。然而这个同构**不是典范的**（not canonical）：必须先在 $V$ 中指定一个内积，才能定义 $V$ 与 $V^*$ 之间的同构，反之亦然（见下一小节）。（例如把基 $\boldsymbol{e}_i\mapsto e^{*i}$ 定义成同构，换一组基后得到的是另一个同构。）向量空间与其对偶空间的这种"等价"会在后文中反复出现。`}</Tx>
        <Exercise n="2.9" title="对偶基的变换规律" level="★"
          hint={R`两个线性函数相等，只需它们在一组基上取值相同。把两边都作用到 $\boldsymbol{f}_k$ 上。`}
          solution={R`左边：$e^{*i}(\boldsymbol{f}_k)=e^{*i}(A_k{}^j\boldsymbol{e}_j)=A_k{}^j\delta^i{}_j=A_k{}^i$。

右边：$(f^{*j}A_j{}^i)(\boldsymbol{f}_k)=f^{*j}(\boldsymbol{f}_k)A_j{}^i=\delta^j{}_kA_j{}^i=A_k{}^i$。

两个线性函数在基 $\{\boldsymbol{f}_k\}$ 上取值相同，故 $e^{*i}=f^{*j}A_j{}^i$。

**读法：**基向量按 $\boldsymbol{f}_i=A_i{}^j\boldsymbol{e}_j$ 变换（矩阵 $A$），对偶基按 $f^{*i}=e^{*j}(A^{-1})_j{}^i$ 变换（矩阵 $A^{-1}$，即"逆变"）。这保证了配对 $f_iv^i$ 与基的选取无关——这是"上指标、下指标"之分的根源。`}>
          {R`设 $\{\boldsymbol{f}_j\}$ 是 $V$ 的另一组基，$\{f^{*i}\}$ 是相应的对偶基。用旧基表示，$\boldsymbol{f}_i=A_i{}^j\boldsymbol{e}_j$，其中 $A\in\mathrm{GL}(n,K)$。证明两组对偶基的关系为 $e^{*i}=f^{*j}A_j{}^i$。`}
        </Exercise>
      </Sub>

      <Sub n="2.2.4" title="Inner product and adjoint" zh="内积与伴随">
        <p className="muted">本小节概念：<C id="adjoint" /></p>
        <Tx>{R`上一小节说，$V\cong V^*$ 需要额外的数据。现在我们把这个数据正式引进来——它就是**内积**，也就是物理里的**度规**。

设 $V=V(m,K)$ 是有基 $\{\boldsymbol{e}_i\}$ 的向量空间，$g$ 是向量空间同构 $g:V\to V^*$，其中 $g$ 是 $\mathrm{GL}(m,K)$ 的任意元素。$g$ 的分量表示为`}</Tx>
        <Eq n="2.14" say={R`度规把向量的分量 $v^j$ 变成对偶向量的分量 $g_{ij}v^j$——“降指标”。`}>{R`\sym{gm}{g}:v^j\to\sym{gm}{g}_{ij}v^j.`}</Eq>
        <Tx>{R`一旦给定这个同构，就可以定义两个向量 $\boldsymbol{v}_1,\boldsymbol{v}_2\in V$ 的**内积**（inner product）：`}</Tx>
        <Eq n="2.15" say={R`内积 = 先用度规把第一个向量变成对偶向量，再让它去吃第二个向量。`}>{R`\sym{gm}{g}(\boldsymbol{v}_1,\boldsymbol{v}_2)\equiv\langle \sym{gm}{g}\boldsymbol{v}_1,\boldsymbol{v}_2\rangle.`}</Eq>
        <Tx>{R`为确定起见，设域 $K$ 是实数 $\mathbb{R}$。则 \eqref{2.15} 的分量表达式为`}</Tx>
        <Eq n="2.16" say={R`实内积的分量形式：两个向量的分量夹着度规矩阵求和。`}>{R`\sym{gm}{g}(\boldsymbol{v}_1,\boldsymbol{v}_2)=v_1{}^i\sym{gm}{g}_{ji}v_2{}^j.`}</Eq>
        <Derivation title={R`从 \eqref{2.14}、\eqref{2.15} 到 \eqref{2.16}`} collapsed steps={[
          { tex: R`(\sym{gm}{g}\boldsymbol{v}_1)_j=\sym{gm}{g}_{ji}v_1{}^i`, why: R`\eqref{2.14}（把哑指标改名 $i\leftrightarrow j$）：$\sym{gm}{g}\boldsymbol{v}_1$ 是对偶向量，分量带下指标。` },
          { tex: R`\langle \sym{gm}{g}\boldsymbol{v}_1,\boldsymbol{v}_2\rangle=(\sym{gm}{g}\boldsymbol{v}_1)_jv_2{}^j=v_1{}^i\sym{gm}{g}_{ji}v_2{}^j`, why: R`配对 \eqref{2.12}：对偶向量的分量乘向量的分量。` },
        ]} />
        <Tx>{R`我们要求矩阵 $(g_{ij})$ **正定**，使 $g(\boldsymbol{v},\boldsymbol{v})$ 具有 $\boldsymbol{v}$ 的长度平方的意义；还要求度规**对称**：$g_{ij}=g_{ji}$，使 $g(\boldsymbol{v}_1,\boldsymbol{v}_2)=g(\boldsymbol{v}_2,\boldsymbol{v}_1)$。（由于对称，\eqref{2.16} 中 $g_{ji}$ 与 $g_{ij}$ 无区别。）

**伴随。**再设 $W=W(n,\mathbb{R})$ 是有基 $\{\boldsymbol{f}_\alpha\}$ 的向量空间，带有向量空间同构 $G:W\to W^*$（$W$ 上的度规）。给定映射 $f:V\to W$，定义 $f$ 的**伴随**（adjoint）$\tilde f:W\to V$：`}</Tx>
        <Eq n="2.17" say={R`伴随的定义：把 $f$ 从内积的一边“挪”到另一边，就变成 $\tilde f$；它把 $W$ 送回 $V$。`}>{R`G(\boldsymbol{w},f\boldsymbol{v})=\sym{gm}{g}(\boldsymbol{v},\tilde f\boldsymbol{w})`}</Eq>
        <Tx>{R`其中 $\boldsymbol{v}\in V$，$\boldsymbol{w}\in W$。容易看出 $\tilde{\tilde f}=f$（伴随的伴随是自身，见下面的推导）。\eqref{2.17} 的分量表达式为`}</Tx>
        <Eq n="2.18" say={R`伴随定义的分量形式：左边用 $W$ 的度规夹 $f$ 的矩阵，右边用 $V$ 的度规夹 $\tilde f$ 的矩阵。`}>{R`w^\alpha G_{\alpha\beta}f^\beta{}_iv^i=v^i\sym{gm}{g}_{ij}\tilde f^j{}_\alpha w^\alpha`}</Eq>
        <Tx>{R`其中 $f^\beta{}_i$ 与 $\tilde f^j{}_\alpha$ 分别是 $f$ 与 $\tilde f$ 的矩阵表示。若 $g_{ij}=\delta_{ij}$、$G_{\alpha\beta}=\delta_{\alpha\beta}$（正交归一基），伴随 $\tilde f$ 就化为矩阵 $f$ 的**转置** $f^{\rm t}$。

**$\dim\operatorname{im}f=\dim\operatorname{im}\tilde f$。**由于 \eqref{2.18} 对任意 $\boldsymbol{v}\in V$、$\boldsymbol{w}\in W$ 都成立，系数必须相等：$G_{\alpha\beta}f^\beta{}_i=g_{ij}\tilde f^j{}_\alpha$，即`}</Tx>
        <Eq n="2.19" keyEq title="伴随的矩阵" say={R`伴随就是“转置再用两边的度规修正”：正交归一基下 $g$、$G$ 都是单位矩阵，伴随就是转置。`}>{R`\tilde f=\sym{gm}{g}^{-1}f^{\rm t}G^{\rm t}.`}</Eq>
        <Derivation title={R`从 \eqref{2.18} 读出 \eqref{2.19}，并验证 $\tilde{\tilde f}=f$`} collapsed steps={[
          { tex: R`G_{\alpha\beta}f^\beta{}_i=\sym{gm}{g}_{ij}\tilde f^j{}_\alpha`, why: R`取 $\boldsymbol{v}=\boldsymbol{e}_i$、$\boldsymbol{w}=\boldsymbol{f}_\alpha$（即 $v^k=\delta^k{}_i$、$w^\beta=\delta^\beta{}_\alpha$）代入 \eqref{2.18}。` },
          { tex: R`(f^{\rm t}G^{\rm t})_{i\alpha}=f^\beta{}_iG_{\alpha\beta}=(\sym{gm}{g}\tilde f)_{i\alpha}`, why: R`把左边看成矩阵 $f^{\rm t}$（$m\times n$）乘 $G^{\rm t}$（$n\times n$）的 $(i,\alpha)$ 元；右边是 $g$（$m\times m$）乘 $\tilde f$（$m\times n$）。` },
          { tex: R`\tilde f=\sym{gm}{g}^{-1}f^{\rm t}G^{\rm t}`, why: R`$g\in\mathrm{GL}(m,\mathbb{R})$ 可逆，左乘 $g^{-1}$。` },
          { tex: R`\tilde{\tilde f}=G^{-1}\tilde f^{\rm t}\sym{gm}{g}^{\rm t}=G^{-1}(G\,f\,(\sym{gm}{g}^{-1})^{\rm t})\sym{gm}{g}^{\rm t}=f`, why: R`$\tilde f:W\to V$ 的伴随要交换 $g$ 与 $G$ 的角色；用 $(ABC)^{\rm t}=C^{\rm t}B^{\rm t}A^{\rm t}$ 与 $(g^{-1})^{\rm t}=(g^{\rm t})^{-1}$。` },
        ]} />
        <Tx>{R`利用下面习题的结果，得到 $\operatorname{rank}f=\operatorname{rank}\tilde f$，其中映射的秩定义为相应矩阵的秩（注意 $g\in\mathrm{GL}(m,\mathbb{R})$、$G\in\mathrm{GL}(n,\mathbb{R})$）。显然 $\dim\operatorname{im}f$ 就是表示 $f$ 的矩阵的秩（像由矩阵的列张成），所以 $\dim\operatorname{im}f=\dim\operatorname{im}\tilde f$。`}</Tx>
        <Exercise n="2.10" title="秩在转置与可逆乘法下不变" level="★★"
          hint={R`(a) 列秩 = 行秩：把矩阵写成"列空间的基乘以系数矩阵"。(b) 左乘可逆矩阵是像空间上的单射；右乘可逆矩阵不改变像。`}
          solution={R`把 $f$ 看成 $n\times m$ 矩阵（从 $\mathbb{R}^m$ 到 $\mathbb{R}^n$），则 $f^{\rm t}$ 是 $m\times n$ 矩阵，$Mf^{\rm t}N$ 也是 $m\times n$ 矩阵。

**$\operatorname{rank}f=\operatorname{rank}f^{\rm t}$（列秩 = 行秩）。**设 $f$ 的列空间维数为 $r$，取其一组基排成 $n\times r$ 矩阵 $B$。$f$ 的每一列都是 $B$ 的列的组合，故 $f=BC$，$C$ 为 $r\times m$ 系数矩阵。于是 $f$ 的每一**行**都是 $C$ 的 $r$ 行的组合，行空间维数 $\le r$，即 $\operatorname{rank}f^{\rm t}\le\operatorname{rank}f$。对 $f^{\rm t}$ 用同一论证得反向不等式，故相等。

**左乘可逆矩阵不改变秩。**$\operatorname{im}(MA)=M(\operatorname{im}A)$，而 $M$ 是同构，把子空间映成同维数的子空间：$\operatorname{rank}(MA)=\operatorname{rank}A$。

**右乘可逆矩阵不改变秩。**$N$ 是满射，所以 $\operatorname{im}(AN)=A(\operatorname{im}N)=A(\mathbb{R}^n)=\operatorname{im}A$。

合起来：$\operatorname{rank}(Mf^{\rm t}N)=\operatorname{rank}f^{\rm t}=\operatorname{rank}f$。应用到 \eqref{2.19}（$M=g^{-1}$、$N=G^{\rm t}$）就得到 $\operatorname{rank}\tilde f=\operatorname{rank}f$。`}>
          {R`设 $V=V(m,\mathbb{R})$、$W=W(n,\mathbb{R})$，$f$ 是对应于线性映射 $V\to W$ 的矩阵。验证 $\operatorname{rank}f=\operatorname{rank}f^{\rm t}=\operatorname{rank}(Mf^{\rm t}N)$，其中 $M\in\mathrm{GL}(m,\mathbb{R})$，$N\in\mathrm{GL}(n,\mathbb{R})$。`}
        </Exercise>
        <Exercise n="2.11" title="复向量空间：Hermite 内积与伴随" level="★★"
          hint={R`写出 $g(\boldsymbol{v},\tilde f\boldsymbol{w})$ 与 $\overline{G(\boldsymbol{w},f\boldsymbol{v})}$ 的分量，取 $\boldsymbol{v}=\boldsymbol{e}_i$、$\boldsymbol{w}=\boldsymbol{f}_\alpha$ 比较系数。秩在复共轭下不变。`}
          solution={R`**$g$ 必须是 Hermite 矩阵。**$\overline{g(\boldsymbol{v}_2,\boldsymbol{v}_1)}=v_2{}^i\,\bar g_{ij}\,\overline{v_1}{}^j$。要求它等于 $g(\boldsymbol{v}_1,\boldsymbol{v}_2)=\overline{v_1}{}^jg_{ji}v_2{}^i$ 对一切 $\boldsymbol{v}_1,\boldsymbol{v}_2$ 成立，得 $g_{ji}=\bar g_{ij}$，即 $g^\dagger=g$；正定性则保证 $g(\boldsymbol{v},\boldsymbol{v})>0$（$\boldsymbol{v}\neq\boldsymbol{0}$）。

**(a)** 分量：$g(\boldsymbol{v},\tilde f\boldsymbol{w})=\overline{v}{}^ig_{ij}\tilde f^j{}_\alpha w^\alpha$；而 $\overline{G(\boldsymbol{w},f\boldsymbol{v})}=w^\alpha\,\bar G_{\alpha\beta}\,\bar f^\beta{}_i\,\overline{v}{}^i$（对 $\overline{w}{}^\alpha G_{\alpha\beta}f^\beta{}_iv^i$ 逐个因子取共轭）。对任意 $\boldsymbol{v},\boldsymbol{w}$ 相等，比较 $\overline{v}{}^iw^\alpha$ 的系数：

$$g_{ij}\tilde f^j{}_\alpha=\bar f^\beta{}_i\,\bar G_{\alpha\beta}=(f^\dagger)_{i\beta}(G^\dagger)_{\beta\alpha},$$

即 $g\tilde f=f^\dagger G^\dagger$，$\tilde f=g^{-1}f^\dagger G^\dagger$。（因 $G$ 是 Hermite 的，$G^\dagger=G$。）

**(b)** 复共轭把线性无关的列映成线性无关的列（若 $\sum_k c_k\bar a_k=0$，取共轭得 $\sum_k\bar c_ka_k=0$），所以 $\operatorname{rank}\overline f=\operatorname{rank}f$；再由习题 2.10 的论证（对 $\mathbb{C}$ 同样成立）$\operatorname{rank}(g^{-1}f^\dagger G^\dagger)=\operatorname{rank}f^\dagger=\operatorname{rank}\overline f^{\rm t}=\operatorname{rank}f$。故 $\dim\operatorname{im}f=\dim\operatorname{im}\tilde f$。`}>
          <Tx>{R`设 $V$ 是 $\mathbb{C}$ 上的向量空间。两个向量 $\boldsymbol{v}_1$ 与 $\boldsymbol{v}_2$ 的内积定义为`}</Tx>
          <Eq n="2.20" say={R`复内积要对第一个向量取复共轭，这样 $g(\boldsymbol{v},\boldsymbol{v})$ 才是非负实数——长度的平方。`}>{R`\sym{gm}{g}(\boldsymbol{v}_1,\boldsymbol{v}_2)=\overline{v_1}{}^i\sym{gm}{g}_{ij}v_2{}^j`}</Eq>
          <Tx>{R`其中横线表示复共轭。由内积的正定性与"对称性" $g(\boldsymbol{v}_1,\boldsymbol{v}_2)=\overline{g(\boldsymbol{v}_2,\boldsymbol{v}_1)}$，向量空间同构 $g:V\to V^*$ 必须是正定 Hermite 矩阵。设 $f:V\to W$ 是（复）线性映射，$G:W\to W^*$ 是向量空间同构。$f$ 的伴随定义为 $g(\boldsymbol{v},\tilde f\boldsymbol{w})=\overline{G(\boldsymbol{w},f\boldsymbol{v})}$。重复上面的分析，证明 (a) $\tilde f=g^{-1}f^\dagger G^\dagger$，其中 $\dagger$ 表示 Hermite 共轭；(b) $\dim\operatorname{im}f=\dim\operatorname{im}\tilde f$。`}</Tx>
        </Exercise>
        <Tx>{R`现在可以陈述本节最漂亮的结果。它的左边两项各自依赖于映射 $f$ 的细节，右边却只依赖于两个空间的维数。`}</Tx>
        <Stmt id="T2.2">
          <Eq n="2.21" keyEq title="玩具指标定理" say={R`$f$ 的零模个数减去其伴随的零模个数，只由两个空间的维数决定——与 $f$ 的细节无关。这是指标定理的有限维原型。`}>{R`\dim\ker f-\dim\ker\tilde f=\dim V-\dim W.`}</Eq>
          <Proof steps={[
            { claim: R`对 $f:V\to W$ 用 \sref{T2.1}：`, tex: R`\dim V=\dim\ker f+\dim\operatorname{im}f`, uses: ["T2.1"] },
            { claim: R`对 $\tilde f:W\to V$ 用 \sref{T2.1}：`, tex: R`\dim W=\dim\ker\tilde f+\dim\operatorname{im}\tilde f`, uses: ["T2.1"] },
            { claim: R`像的维数相等。`, tex: R`\dim\operatorname{im}f=\operatorname{rank}f=\operatorname{rank}(\sym{gm}{g}^{-1}f^{\rm t}G^{\rm t})=\dim\operatorname{im}\tilde f`, why: R`\eqref{2.19} 与习题 2.10（转置、左右乘可逆矩阵不改变秩）。`, uses: ["2.19"], fill: true },
            { claim: R`两式相减，像的维数消去：`, tex: R`\dim V-\dim\ker f=\dim W-\dim\ker\tilde f`, why: R`移项即得 \eqref{2.21}。` },
          ]} />
        </Stmt>
        <Tx>{R`注意在 \eqref{2.21} 中，左边每一项都依赖于映射 $f$ 的细节；右边却说，**两项之差与 $f$ 无关**！这可以看作指标定理的有限维类比，见第 12 章。`}</Tx>
        <Box kind="physics" title="为什么叫“指标定理”">{R`第 12 章的指标定理研究的是无穷维空间之间的微分算子 $D$（例如 Dirac 算子）。定义**解析指标** $\operatorname{ind}D=\dim\ker D-\dim\ker D^\dagger$：$\ker D$ 是"零模"（零能量解）的个数。单独看，$\dim\ker D$ 会随着背景场的细节跳来跳去；但差值是一个**拓扑不变量**，可以用示性类的积分算出来（Atiyah–Singer）。在无穷维情形，"$\dim V-\dim W$"变成了 $\infty-\infty$，失去意义，取而代之的正是流形与丛的拓扑。规范场论中的反常（第 13 章）就是这个指标的物理表现。

有限维的例子：$f:\mathbb{R}^5\to\mathbb{R}^3$。不管 $f$ 是什么矩阵，$\dim\ker f-\dim\ker\tilde f=2$。若 $f$ 满秩（秩 3），则 $\dim\ker f=2$、$\dim\ker\tilde f=0$；若秩只有 1，则 $4$ 与 $2$——各自变了，差不变。`}</Box>
      </Sub>

      <Sub n="2.2.5" title="Tensors" zh="张量">
        <p className="muted">本小节概念：<C id="tensor" /></p>
        <Tx>{R`对偶向量是把一个向量映成标量的线性对象。把它推广，就得到称为**张量**（tensors）的多重线性对象：它把若干个向量与对偶向量映成一个标量。$(p,q)$ 型张量 $T$ 是把 $p$ 个对偶向量与 $q$ 个向量映到 $\mathbb{R}$ 的多重线性映射：`}</Tx>
        <Eq n="2.22" say={R`$(p,q)$ 型张量是一台有 $p$ 个“对偶向量插口”和 $q$ 个“向量插口”的机器，每个插口都是线性的，输出一个实数。`}>{R`T:\bigotimes^pV^*\bigotimes^qV\to\mathbb{R}.`}</Eq>
        <Tx>{R`例如 $(0,1)$ 型张量把一个向量映成实数，可以等同于对偶向量；类似地，$(1,0)$ 型张量就是向量（$V^{**}\cong V$：向量 $\boldsymbol{v}$ 通过 $f\mapsto f(\boldsymbol{v})$ 吃对偶向量）。若 $\omega$ 把一个对偶向量与两个向量映成标量，$\omega:V^*\times V\times V\to\mathbb{R}$，则 $\omega$ 是 $(1,2)$ 型的。

$(p,q)$ 型张量的全体称为 $(p,q)$ 型**张量空间**（tensor space），记作 $\mathscr{T}^p_q$。**张量积**（tensor product）$\tau=\mu\otimes\nu\in\mathscr{T}^p_q\otimes\mathscr{T}^{p'}_{q'}$ 是 $\mathscr{T}^{p+p'}_{q+q'}$ 的元素，定义为`}</Tx>
        <Eq n="2.23" keyEq title="张量积" say="张量积把两台机器并排放：插口合起来，输出相乘。">{R`\begin{aligned}&\tau(\omega_1,\ldots,\omega_p,\xi_1,\ldots,\xi_{p'};u_1,\ldots,u_q,v_1,\ldots,v_{q'})\\&\qquad=\mu(\omega_1,\ldots,\omega_p;u_1,\ldots,u_q)\,\nu(\xi_1,\ldots,\xi_{p'};v_1,\ldots,v_{q'}).\end{aligned}`}</Eq>
        <Tx>{R`张量空间中的另一种运算是**缩并**（contraction）：从 $(p,q)$ 型张量空间到 $(p-1,q-1)$ 型张量空间的映射，定义为`}</Tx>
        <Eq n="2.24" say={R`缩并：把一个对偶向量插口与一个向量插口分别填上成对的对偶基与基，再对指标求和——一上一下两个指标被“消掉”。`}>{R`\tau(\ldots,e^{*i},\ldots;\ldots,\boldsymbol{e}_i,\ldots)`}</Eq>
        <Tx>{R`其中 $\{\boldsymbol{e}_i\}$ 与 $\{e^{*i}\}$ 是彼此对偶的基，重复指标 $i$ 求和；其余插口保持空着，所以结果仍是张量，类型降为 $(p-1,q-1)$。

**分量写法与例子。**$(1,1)$ 型张量 $\tau$ 的分量 $\tau^i{}_j=\tau(e^{*i};\boldsymbol{e}_j)$；它的缩并 $\tau(e^{*i};\boldsymbol{e}_i)=\tau^i{}_i$ 就是矩阵的**迹**，与基的选取无关（由习题 2.9 的变换规律：$\tau^i{}_j\to(A^{-1})\tau A$ 型的相似变换不改变迹）。张量积的分量就是分量相乘：$(\mu\otimes\nu)^{ij}{}_{kl}=\mu^i{}_k\nu^j{}_l$。`}</Tx>
        <Exercise n="2.12" title={R`线性映射是 $(1,1)$ 型张量`} level="★"
          hint={R`给定 $f$，构造一个吃一个对偶向量、一个向量的双线性函数。`}
          solution={R`定义 $T_f(\omega;\boldsymbol{v})\equiv\omega(f(\boldsymbol{v}))$，$\omega\in W^*$，$\boldsymbol{v}\in V$。对 $\omega$ 线性显然（$(a\omega_1+b\omega_2)(f\boldsymbol{v})=a\omega_1(f\boldsymbol{v})+b\omega_2(f\boldsymbol{v})$，即 \eqref{2.9}）；对 $\boldsymbol{v}$ 线性由 $f$ 的线性与 $\omega$ 的线性得到。所以 $T_f$ 是一个对偶向量插口、一个向量插口的双线性映射，即 $(1,1)$ 型张量（当 $W\neq V$ 时，对偶向量插口取自 $W^*$，是"混合"型的 $(1,1)$ 张量；$W=V$ 时就是 \eqref{2.22} 意义下的 $(1,1)$ 型）。

分量：$T_f(f^{*\alpha};\boldsymbol{e}_i)=f^{*\alpha}(f(\boldsymbol{e}_i))=f^\alpha{}_i$——正是 $f$ 的矩阵，一个上指标、一个下指标。

反过来，任给这样的双线性 $T$，对固定的 $\boldsymbol{v}$，$\omega\mapsto T(\omega;\boldsymbol{v})$ 是 $W^*$ 上的线性函数，即 $W^{**}\cong W$ 中的一个向量，记为 $f(\boldsymbol{v})$；这样得到的 $f$ 是线性映射。所以"线性映射 $V\to W$"与"$(1,1)$ 型张量"是同一回事。`}>
          {R`设 $V$、$W$ 是向量空间，$f:V\to W$ 是线性映射。证明 $f$ 是 $(1,1)$ 型张量。`}
        </Exercise>
      </Sub>
    </Sec>);
}
