// §6.3 Poincaré 引理 —— 式 (6.28)–(6.34)，定理 6.3，例 6.4，交互图 3
import { Sec, Tx, Eq, Box, Stmt, Proof, Derivation, Erratum, C } from "@kit";
import { PoincareLab } from "./_ch06_demos.jsx";

const R = String.raw;

export function Sec63() {
  return (
    <Sec n="6.3" title="Poincaré's lemma" zh="Poincaré 引理"
      gist={R`在可缩坐标邻域上，闭 $r$ 形式（$r\ge1$）都是恰当的：$\omega=\dd(-PF^*\omega)$。工具是**同伦算子** $P$（把 $\dd t$ 方向积掉）与**同伦公式** $\dd P+P\dd=f_1^*-f_0^*$。推论：$H^r(\mathbb{R}^n)=0$（$r\ge1$）。`}
      why={R`它说明 de Rham 上同调只可能来自**整体**拓扑：局部上每个闭形式都有原形式。同一个同伦公式在 §6.4.5 还会给出上同调的同伦不变性。`}
      gives={["6.28", "6.29", "6.31", "6.32", "6.33", "6.34"]}>
      <p className="muted">本节概念：<C id="poincare_lemma" /> · <C id="closed_exact" /></p>
      <Tx>{R`恰当形式总是闭的，反之不一定。但下面的定理给出了逆命题成立的情形：只要区域可以收缩成一点。`}</Tx>
      <Stmt id="T6.3" />
      <Tx>{R`**证明的想法。**设 $U$ 可光滑收缩到 $p_0$：存在光滑映射 $F:U\times I\to U$ 使

$$F(x,0)=x,\qquad F(x,1)=p_0\qquad(x\in U).$$

想象 $U$ 中每个点 $x$ 沿曲线 $t\mapsto F(x,t)$ 被拉到 $p_0$。把闭形式 $\omega$ 拉回到"柱体" $U\times I$ 上，沿 $t$ 方向积分，就能把 $\omega$ 在 $t=0$（$\omega$ 本身）与 $t=1$（零）之间的差写成一个外微分。为此先在 $U\times I$ 上建立一个与 $\omega$ 无关的恒等式。

**柱体上的形式。**考虑 $U\times I$ 上的 $r$ 形式 $\eta\in\Omega^r(U\times I)$。它的每一项要么不含 $\dd t$，要么恰含一个 $\dd t$（把它移到最前面）：`}</Tx>
      <Eq n="6.28" say={R`柱体 $U\times I$ 上的任何 $r$ 形式都分成两部分：不含 $\dd t$ 的"水平"部分（系数 $a$）与含一个 $\dd t$ 的"竖直"部分（系数 $b$）。`}>{R`\begin{aligned}\eta&=a_{i_1\ldots i_r}(x,t)\,\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}\\&\quad+b_{j_1\ldots j_{r-1}}(x,t)\,\dd t\wedge\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}\end{aligned}`}</Eq>
      <Tx>{R`其中 $x$ 是 $U$ 的坐标，$t$ 是 $I$ 的坐标（指标重复求和，系数可取为全反对称）。定义映射 $P:\Omega^r(U\times I)\to\Omega^{r-1}(U)$：`}</Tx>
      <Eq n="6.29" say={R`同伦算子只看形式的竖直部分：把 $\dd t$ 拿掉，把系数沿 $t$ 从 0 积到 1，得到 $U$ 上低一阶的形式。`}>{R`P\eta\equiv\left(\int_0^1\dd s\,b_{j_1\ldots j_{r-1}}(x,s)\right)\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}.`}</Eq>
      <Tx>{R`再定义 $f_t:U\to U\times I$，$f_t(x)=(x,t)$（把 $U$ 放到柱体的第 $t$ 层）。$f_t$ 下 $t$ 是常数，$f_t^*\dd t=0$，所以拉回只保留 \eqref{6.28} 的第一项，得到 $\Omega^r(U)$ 的元素：`}</Tx>
      <Eq n="6.30" say={R`把柱体上的形式限制到第 $t$ 层：竖直部分消失，水平部分的系数取在高度 $t$ 处。`}>{R`f_t^*\eta=a_{i_1\ldots i_r}(x,t)\,\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}\in\Omega^r(U).`}</Eq>
      <Tx>{R`下面证明关键恒等式——**同伦公式**（homotopy formula）：`}</Tx>
      <Eq n="6.31" keyEq title="同伦公式" say={R`柱体顶层与底层的差可以写成"外微分与同伦算子的反对易子"：$\dd P+P\dd$ 等于沿 $t$ 方向的总变化。这是微积分基本定理的形式版本。`}>{R`\dd(P\eta)+P(\dd\eta)=f_1^*\eta-f_0^*\eta.`}</Eq>
      <Proof title={R`同伦公式 \eqref{6.31} 的证明`} steps={[
        { claim: R`**$\dd P\eta$。**$P\eta$ 的系数 $\int_0^1\dd s\,b(x,s)$ 只依赖 $x$，对它求外微分时把导数移进积分号：`, tex: R`\begin{aligned}\dd P\eta&=\dd\left(\int_0^1\dd s\,b_{j_1\ldots j_{r-1}}\right)\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}\\&=\int_0^1\dd s\left(\frac{\partial b_{j_1\ldots j_{r-1}}}{\partial x^{j_r}}\right)\dd x^{j_r}\wedge\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}\end{aligned}` },
        { claim: R`**$\dd\eta$。**对 \eqref{6.28} 逐项求外微分：水平部分对 $x$ 求导、对 $t$ 求导各给一项，竖直部分对 $x$ 求导给一项（对 $t$ 求导会出现 $\dd t\wedge\dd t=0$）：`, tex: R`\dd\eta=\frac{\partial a_{i_1\ldots i_r}}{\partial x^{i_{r+1}}}\dd x^{i_{r+1}}\wedge\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}+\frac{\partial a_{i_1\ldots i_r}}{\partial t}\dd t\wedge\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}+\frac{\partial b_{j_1\ldots j_{r-1}}}{\partial x^{j_r}}\dd x^{j_r}\wedge\dd t\wedge\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}` },
        { claim: R`**$P\dd\eta$。**$P$ 只取含 $\dd t$ 的项，并要求 $\dd t$ 在最前面。第一项不含 $\dd t$，被丢掉；第二项 $\dd t$ 已在最前；第三项要把 $\dd t$ 与 $\dd x^{j_r}$ 交换，多一个负号：`, tex: R`P\,\dd\eta=\left[\int_0^1\dd s\left(\frac{\partial a_{i_1\ldots i_r}}{\partial s}\right)\right]\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}-\left[\int_0^1\dd s\left(\frac{\partial b_{j_1\ldots j_{r-1}}}{\partial x^{j_r}}\right)\right]\dd x^{j_r}\wedge\dd x^{j_1}\wedge\ldots\wedge\dd x^{j_{r-1}}` },
        { claim: R`**相加。**$P\dd\eta$ 的第二项与 $\dd P\eta$ 恰好相消（这是证明的核心——竖直部分对 $x$ 的导数在两边各出现一次，符号相反）；剩下的用微积分基本定理：`, tex: R`\begin{aligned}\dd(P\eta)+P(\dd\eta)&=\left[\int_0^1\dd s\left(\frac{\partial a_{i_1\ldots i_r}}{\partial s}\right)\right]\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}\\&=\big[a_{i_1\ldots i_r}(x,1)-a_{i_1\ldots i_r}(x,0)\big]\dd x^{i_1}\wedge\ldots\wedge\dd x^{i_r}=f_1^*\eta-f_0^*\eta.\end{aligned}`, uses: ["6.30"] },
      ]} />
      <Box kind="note" title="同伦公式 = 柱体上的 Stokes 定理">{R`把 \eqref{6.31} 在一个 $r$ 链 $c\subset U$ 上积分，并记 $c\times I$ 为柱体链，则（不难验证）$\int_c P\eta=\int_{c\times I}\eta$（差一个定向符号），而 \eqref{6.31} 就变成 $\int_{\partial(c\times I)}\eta=\int_{c\times I}\dd\eta$，其中 $\partial(c\times I)=c\times\{1\}-c\times\{0\}\mp(\partial c)\times I$——柱体的边界是顶、底与侧面。同伦算子 $P$ 就是"乘以 $I$"这一链运算的对偶。`}</Box>
      <Tx>{R`**由同伦公式推出 Poincaré 引理。**设 $\omega$ 是可缩坐标卡 $U$ 上的闭 $r$ 形式。我们证明 $\omega$ 可以写成恰当形式`}</Tx>
      <Eq n="6.32" keyEq title="Poincaré 引理：显式原形式" say={R`可缩区域上的闭形式有显式的原形式：把它沿收缩拉回到柱体上，再用同伦算子积掉收缩方向（再取负号）。`}>{R`\omega=\dd(-PF^*\omega),`}</Eq>
      <Tx>{R`其中 $F$ 是光滑收缩映射。事实上，把 \eqref{6.31} 中的 $\eta$ 换成 $F^*\omega\in\Omega^r(U\times I)$：`}</Tx>
      <Eq n="6.33" say={R`把拉回的闭形式代入同伦公式：右边变成"收缩终点处的拉回"减去"收缩起点处的拉回"，即零减去 $\omega$ 本身。`}>{R`\begin{aligned}\dd PF^*\omega+P\,\dd F^*\omega&=f_1^*\circ F^*\omega-f_0^*\circ F^*\omega\\&=(F\circ f_1)^*\omega-(F\circ f_0)^*\omega\end{aligned}`}</Eq>
      <Proof steps={[
        { claim: R`第二个等号用了 $(f\circ g)^*=g^*\circ f^*$。` },
        { claim: R`$F\circ f_1:U\to U$ 是常值映射 $x\mapsto p_0$，所以 $(F\circ f_1)^*\omega=0$。`, why: R`常值映射的微分为零，把任何 $r\ge1$ 形式拉回为零。$r=0$ 时拉回得到常函数 $\omega(p_0)$，这一步不成立——所以定理需要 $r\ge1$。`, fill: true },
        { claim: R`$F\circ f_0=\mathrm{id}_U$，所以 $(F\circ f_0)^*:\Omega^r(U)\to\Omega^r(U)$ 是恒等映射。于是 \eqref{6.33} 的右边就是 $-\omega$。` },
        { claim: R`左边第二项为零，因为 $\omega$ 闭：$\dd F^*\omega=F^*\dd\omega=0$（用了 \eqref{5.75}）。`, uses: ["5.75"] },
        { claim: R`最后 \eqref{6.33} 变成 $\omega=-\dd PF^*\omega$，定理得证。` },
      ]} />
      <Erratum kind="erratum" loc="p.255 定理 6.3" title={R`需要 $r\ge1$`}>{R`原书陈述为"任何闭 $r$ 形式"。对 $r=0$：闭 0 形式是常数函数 $c$，而 $B^0(U)=\{0\}$（例 6.1），所以 $c\neq0$ 时不是恰当的；证明中"$(F\circ f_1)^*=0$"恰好在 $r=0$ 失效。这与例 6.4 末尾的提醒 $H^0(\mathbb{R}^n)=\mathbb{R}$ 一致。陈述已补上 $r\ge1$。`}</Erratum>
      <Derivation title={R`星形区域上的显式公式（$\mathbb{R}^2$ 中的一形式与二形式）`} collapsed steps={[
        { tex: R`F(x,t)=p_0+(1-t)(x-p_0),\qquad X\equiv x-p_0`, why: R`星形区域（关于 $p_0$）上的直线收缩：$F(x,0)=x$，$F(x,1)=p_0$。` },
        { tex: R`F^*\dd x^i=(1-t)\,\dd x^i-X^i\,\dd t`, why: R`$F^i=p_0^i+(1-t)X^i$ 求微分。` },
        { tex: R`\omega=\omega_i\dd x^i:\quad F^*\omega=(1-t)\,\omega_i(F)\,\dd x^i-\omega_i(F)X^i\,\dd t`, why: R`竖直部分的系数 $b=-\omega_i(F(x,t))X^i$。` },
        { tex: R`-PF^*\omega=\int_0^1\omega_i\big(p_0+(1-s)X\big)X^i\,\dd s=\int_0^1\omega_i(p_0+uX)\,X^i\,\dd u`, why: R`换元 $u=1-s$：这正是沿线段 $p_0\to x$ 的线积分 $\int_{p_0}^x\omega$——物理里熟悉的"势函数 = 从参考点出发的线积分"。` },
        { tex: R`\dd\omega=h\,\dd x\wedge\dd y:\quad F^*(\dd x\wedge\dd y)=(1-t)^2\dd x\wedge\dd y+(1-t)\,\dd t\wedge(X^2\dd x-X^1\dd y)`, why: R`两个 $F^*\dd x^i$ 楔起来，只保留至多一个 $\dd t$ 的项。` },
        { tex: R`-PF^*(h\,\dd x\wedge\dd y)=\left[\int_0^1u\,h(p_0+uX)\,\dd u\right](X^1\dd y-X^2\dd x)`, why: R`对二形式的 Poincaré 引理：例如 $h=2$、$p_0=0$ 给出 $x\,\dd y-y\,\dd x$，其外微分正是 $2\,\dd x\wedge\dd y$。` },
        { tex: R`\omega=\dd(-PF^*\omega)+\big(-PF^*\dd\omega\big)\quad(\text{对任意一形式，不必闭})`, why: R`由 \eqref{6.31} 与 $(F\circ f_1)^*\omega=0$：不闭时多出的就是同伦算子作用在 $\dd\omega$ 上的项。交互图 3 对"不闭"的选项数值核对了这个分解。` },
      ]} result={R`在 $\mathbb{R}^3$ 中这就是物理学的经典结论：无旋场 $\Rightarrow$ 有标势（一形式），无散场 $\Rightarrow$ 有矢势（二形式），都可以用"径向积分"显式写出（后者即 Poincaré 规范 $x\cdot A=0$ 下的矢势）。`} />
      <PoincareLab />
      <Tx>{R`**结论。**任何闭形式至少在**局部**是恰当的。因此 de Rham 上同调群可以看作闭形式**整体**恰当性的**障碍**（obstruction）：它记录的是"每一小块上都能找到原形式，但这些局部原形式无法拼成一个整体"的那部分信息（交互图 3 中 $\dd\theta$ 的割线跳变 $2\pi$ 就是一个例子）。`}</Tx>
      <Box kind="example" n="6.4" title={R`欧氏空间：$H^r(\mathbb{R}^n)=0$`}>
        <Tx>{R`$\mathbb{R}^n$ 是可缩的（$F(x,t)=(1-t)x$），由 Poincaré 引理`}</Tx>
        <Eq n="6.34" say={R`欧氏空间上一阶及以上的上同调全为零：在 $\mathbb{R}^n$ 上闭形式一定有原形式。`}>{R`H^r(\mathbb{R}^n)=0\qquad1\le r\le n.`}</Eq>
        <Tx>{R`但要注意 $H^0(\mathbb{R}^n)=\mathbb{R}$（$\mathbb{R}^n$ 连通，例 6.1）。所以 $\mathbb{R}^n$ 的上同调与一个点完全相同——这是同伦不变性（\sref{T6.4}）的一个特例。`}</Tx>
      </Box>
      <Box kind="physics" title="Poincaré 引理在物理中">{R`电磁学：$\dd F=0$（Bianchi 恒等式，第 5 章 \eqref{5.73} 之后）在可缩区域上推出 $F=\dd A$——矢势的存在性就是 Poincaré 引理。但在有磁单极的空间 $\mathbb{R}^3-\{0\}$ 中（不可缩），$F$ 闭而不恰当，单一的光滑 $A$ 不存在（例 6.7、第 10 章的 Wu–Yang 构造）。分析力学：辛形式 $\omega$ 闭，局部可写成 $\omega=\dd\theta$（典范一形式）；保辛流局部是 Hamilton 流（第 5 章例 5.12）。`}</Box>
    </Sec>);
}
