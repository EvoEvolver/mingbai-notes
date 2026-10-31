// 附录 B 引言与 §B.1（引理 B.1：局部乘积计数）——原文 pp.15–17
import { Sec, Sub, Eq, Box, Derivation, Table, Stmt, Proof, Erratum, Tx } from "@kit";
import { SigmaPlot, FiniteDiffDemo } from "./_appB_run.jsx";

const R = String.raw;

export function SecB() {
  return (
    <Sec n="B" title="Arbitrary #3SAT via sparse quartic gaps" zh="任意 #3SAT：稀疏四次多项式的 gap"
      gist={R`主定理只处理 $O(n)$ 个子句；要对任意 3-CNF 保住 $2^{O(\rho(n))}$，需要取 $\sigma=1/\lceil\log n\rceil$ 的稀疏化，并在**不为子句引入变量**的前提下给每片叶子计数。`}
      why={R`稀疏化后的叶子仍有 $n\log^{O(1)}n$ 个子句；沿用"归约到积和式"会让矩阵维数随子句数增长，代价超过 $2^n$。`}
      gives={[]}>
      <Tx>{R`全附录都用同一个目标指数：`}</Tx>
      <Eq say={R`附录 B 的目标指数：比线性函数 $v$ 小一个 $\sqrt{\log v}/(\log\log v)^2$ 的因子——所有代价都要压到 $2$ 的这么多次方以内。`}>{R`\rho(v)=\frac{v(\log\log v)^2}{\sqrt{\log v}}.`}</Eq>
      <Tx>{R`这正是 \eqref{1.1} 中的指数。附录 B 的每个引理都以 $2^{O(\rho(\cdot))}$ 为预算：凡是 $2^{o(\rho)}$ 的开销（如 $2^{O(n/\log n)}$、$2^{(\log n)^{O(1)}}$）都可以被"吸收"。

**先看看直接做能走多远。**\sref{T6.1} 与经典归约（\sref{F:reduce}）只认 $O(n)$ 个子句的 3-CNF。对任意 3-CNF，标准工具是**计数稀疏化**（counting sparsification）：`}</Tx>
      <Stmt id="X:sparsify" />
      <Tx>{R`取 $\sigma=(\log n)^{-1/32}$：叶子数 $2^{\sigma n}=2^{n/\log^{1/32}n}$，每片叶子有 $O(n\sigma^{-9})=O(n\log^{9/32}n)$ 个子句。把叶子归约成维数 $N'=O(n\log^{9/32}n)$ 的稀疏矩阵，用主定理需 $2^{O(\rho(N'))}=2^{O(n(\log\log n)^2/\log^{7/32}n)}$ 时间——渐近地比叶子数 $2^{n/\log^{1/32}n}$ 小（$7/32>1/32$，多出的 $(\log\log n)^2$ 不改变幂次比较）。所以**叶子数主导**，总时间 $2^{O(n/\log^{1/32}n)}$：已经是 $2^{o(n)}$，但比 $2^{O(\rho(n))}$ 弱得多。`}</Tx>
      <Derivation title="为什么是 1/32：两种代价的平衡" collapsed steps={[
        { tex: R`\sigma=(\log n)^{-\varepsilon}:\qquad \text{叶子数}=2^{n/\log^{\varepsilon}n},\qquad \text{每叶子句数}=O(n\log^{9\varepsilon}n)`, why: R`代入计数稀疏化的参数。` },
        { tex: R`\text{每叶代价}=2^{O(\rho(n\log^{9\varepsilon}n))}=2^{O\left(n(\log\log n)^2/\log^{1/2-9\varepsilon}n\right)}`, why: R`$\rho(N')$ 中 $\log N'=\Theta(\log n)$，只有前面的 $N'$ 多出 $\log^{9\varepsilon}n$ 倍。` },
        { tex: R`\varepsilon<\tfrac1{18}\ \Longrightarrow\ \tfrac12-9\varepsilon>\varepsilon\ \Longrightarrow\ \text{叶子数主导}`, why: R`原文取 $\varepsilon=1/32$（$1/2-9/32=7/32>1/32$）；最优平衡在 $\varepsilon\approx1/20$ 附近，但无论怎么选，叶子数 $2^{n/\log^{\varepsilon}n}$ 都远大于 $2^{\rho(n)}$。` },
      ]} result={R`只靠"稀疏化 + 主定理"最多得到 $2^{n/\log^{\Theta(1)}n}$ 量级；要得到 $2^{O(\rho(n))}$，叶子数必须降到 $2^{O(n/\log n)}$，即 $\sigma=1/\lceil\log n\rceil$。`} />
      <SigmaPlot />
      <Tx>{R`**要保住 $2^{O(\rho(n))}$，就取 $\sigma=1/\lceil\log n\rceil$。**此时叶子只有 $2^{O(n/\log n)}$ 片（可吸收），但每片有 $n\log^{O(1)}n$ 个子句，仍定义在原来的 $n$ 个变量上。附录 B 的任务就是：**在不引入与子句数成比例的新变量的前提下**，精确数出这样一片叶子的满足赋值。为此需要两样新东西：

◆ 一个**稀疏四次 $\F_2$ 多项式的计数器**（§B.1–B.2）——子句越多，多项式只是单项式越多，变量数不变；

◆ 一种**子句违反校验的确定性压缩**（§B.3–B.5）——把"$m$ 个子句全满足"压缩成 $O(n/\log n)$ 个稠密校验加 $O(n)$ 个短校验。`}</Tx>
      <Box kind="key" title="附录 B 的流水线（从下往上用）">{R`**§B.6** 稀疏化 → 每片叶子 $m\le n(\log n)^c$ 个子句

→ **§B.3** 违反向量 $v(x)\in\F_2^m$ + Vandermonde 稠密校验（$h_0=O(n/\log n)$ 个）

→ **§B.5** 用精确计数逐轮挑选 $3n$ 个短校验（每个涉及 $L=\log^{O(1)}n$ 个违反位）

→ **§B.4** 每次计数 = $2^{-h_0-s}\sum_u\gap(Q_u)$，$Q_u$ 是 $O(n)$ 个变量的稀疏四次多项式

→ **§B.2** 每个 gap = 模 $2^b$ 截断乘积之和的中心剩余

→ **§B.1** 截断乘积之和由"局部乘积计数器"在 $2^{O(\rho)}$ 时间算出（§3–§5 的机器）`}</Box>
    </Sec>);
}

export function SecB1() {
  return (
    <Sec n="B.1" title="A counter for products of local polynomials" zh="局部多项式乘积的计数器"
      gist={R`对 $\sum_{x\in\{0,1\}^v}\Phi(Cx)$——许多局部因子之积在全部布尔点上的和——给出 $2^{O(\rho(v))}$ 的确定性算法：把**拷贝矩阵** $C$ 当作稀疏矩阵变形成 $C(\theta)$，在特殊点做结构化求值，用布尔有限差分求导，再插值。`}
      why={R`这是附录 B 唯一新的算法原语：主文只会算积和式，而 gap 计数需要的是"乘积之和"。好在 §3–§5 的分解、变形、插值都只依赖于"一个稀疏矩阵"，拷贝矩阵正好是。`}
      gives={["B.1", "B.2"]}>
      <Tx>{R`**设定。**设 $\phi_1,\dots,\phi_N$ 是 $v$ 个布尔变量上的多项式因子，每个至多依赖其中 $(\log v)^c$ 个。当同一个变量出现在不同因子中时，把这些**出现**（occurrence）看作彼此独立的形式输入；$\Phi$ 是这些独立输入上的乘积，并假设 $\deg\Phi\le av$、$N\le av$（$a,c$ 为固定常数）。

系数允许取在 $\Q[u]/(u^b)$ 中（$b$ 多项式有界）——这是为 §B.2 的标记变量 $u$ 预留的。每个因子由多项式规模、无除法的算术电路给出，并且在下文用到的代入与截断下，系数运算保持多项式比特长度；§B.2 中用到的乘积满足这一点。`}</Tx>
      <Stmt id="LB.1">
        <Tx>{R`**证明的总体结构。**令 $C$ 为**拷贝矩阵**（copy matrix）：它把变量向量 $x$ 送到各个独立的输入出现上——出现 $(e,j)$（因子 $e$ 中变量 $j$ 的出现）对应的行只选出 $x_j$。目标是 $\sum_x\Phi(Cx)$。我们构造一个**多项式拷贝映射** $C(\theta)$，满足 $C(0)=C$，在结构化的点上求`}</Tx>
        <Eq say={R`变形后的目标函数：把拷贝矩阵换成依赖参数 $\theta$ 的多项式矩阵，再对所有布尔赋值求和；$\theta=0$ 时就是我们要的答案。`}>{R`P(\theta)=\sum_{x\in\{0,1\}^v}\Phi\big(C(\theta)x\big)`}</Eq>
        <Tx>{R`的导数，然后插值。$P$ 的次数不超过 $\deg\Phi$ 乘以 $C(\theta)$ 的次数。这与主文 $P(t)=\per(A(t))$ 的策略完全平行：`}</Tx>
        <Table head={["", "主文（积和式）", R`\sref{LB.1}（乘积之和）`]} rows={[
          ["对象", R`稀疏矩阵 $A$`, R`拷贝矩阵 $C$（因子–变量关联）`],
          ["变形", R`$A(t)=L(I_{\mathcal C}\otimes J(t))R'$`, R`$C(\theta)=L(I_{\mathcal C_*}\otimes J_*(\theta))R'$`],
          ["特殊点", R`分块 + 低秩（\sref{L2.1}）`, "变量分组 + 共享线性型（结构化求值）"],
          ["导数", R`加法公式（\sref{L3.1}）`, R`布尔有限差分 \eqref{B.2}`],
          ["恢复", R`Hermite 插值（\sref{P3.2}）`, "Hermite 插值"],
        ]} />
        <Tx>{R`下面按原文三个小标题逐段证明。`}</Tx>

        <Sub n="B.1.1" title="Structured evaluations" zh="第一段：结构化求值（对应引理 2.1 + 附录 A）">
          <Tx>{R`**我们要证明的。**假设在某一点，拷贝映射形如`}</Tx>
          <Eq say={R`特殊点处拷贝映射的结构：一个按变量组分块的局部部分，加上一个秩至多 $r$ 的修正。`}>{R`C_0=C_{\rm loc}+UV^{\mathsf T},`}</Eq>
          <Tx>{R`其中变量被划分成大小至多 $s$ 的组 $G_b$，并且对每个因子，它在 $C_{\rm loc}$ 下的全部局部输入只依赖**一个**变量组。$U,V$ 的 $r$ 列给出 $r$ 个**共享线性型** $V^{\mathsf T}x$。我们要在 $2^{O(s)}v^{O(r)}$ 时间（或多项式空间）内算出 $\sum_x\Phi(C_0x)$。

困难只来自共享线性型：没有它们，求和会按变量组分解成各组之积。办法是先把 $V^{\mathsf T}x$ 换成形式变量 $z\in\Q^r$。令 $D=\lceil av\rceil$，并定义截断指数`}</Tx>
          <Eq say={R`截断指数：指数函数泰勒级数只保留到 $D$ 次。$D$ 取得与 $\Phi$ 的次数上界一样大，所以截断不会损失任何需要的项。`}>{R`e_D(\sym{targ}{t})=\sum_{j=0}^D\sym{targ}{t}^j/j!.`}</Eq>
          <Tx>{R`附录 A 的阶乘配对 \eqref{A.2} $\cL_r(z^\nu w^\xi)=\nu!\,[\nu=\xi]$ 具有**替换律**（substitution property）：`}</Tx>
          <Eq n="B.1" keyEq title="截断指数的替换律" say={R`把形式变量 $z$ 与截断指数 $e_D(w\cdot y)$ 配对，效果就是把 $z$ 代换成 $y$：配对泛函在这里扮演“代入”的角色，前提是 $F$ 的次数不超过截断阶 $D$。`}>{R`\cL_r\big(F(z)e_D(w\cdot y)\big)=F(y)\qquad(\deg F\le D).`}</Eq>
          <Stmt id="F:subst">
            <Proof title={R`替换律 \eqref{B.1}`} steps={[
              { claim: R`多项式定理：$(w\cdot y)^k/k!=\sum_{|\nu|=k}w^\nu y^\nu/\nu!$，于是 $e_D(w\cdot y)=\sum_{|\nu|\le D}\frac{y^\nu}{\nu!}w^\nu$。`, tex: R`e_D(w\cdot y)=\sum_{k=0}^D\frac{1}{k!}\sum_{|\nu|=k}\binom{k}{\nu}w^\nu y^\nu=\sum_{|\nu|\le D}\frac{y^\nu}{\nu!}\,w^\nu`, why: R`$\binom{k}{\nu}=k!/\nu!$。这就是原文"$w^\nu$ 的系数是 $y^\nu/\nu!$"。`, fill: true },
              { claim: R`写 $F(z)=\sum_{|\mu|\le D}F_\mu z^\mu$，逐项配对：只有 $\nu=\mu$ 的项存活，权重 $\mu!$ 与 $1/\mu!$ 抵消。`, tex: R`\cL_r\big(F(z)e_D(w\cdot y)\big)=\sum_{|\mu|\le D}\ \sum_{|\nu|\le D}F_\mu\frac{y^\nu}{\nu!}\,\cL_r(z^\mu w^\nu)=\sum_{|\mu|\le D}F_\mu\frac{y^\mu}{\mu!}\,\mu!=F(y)`, why: R`$\cL_r$ 线性，且 $\cL_r(z^\mu w^\nu)=\mu!\,[\mu=\nu]$（\eqref{A.2}）。条件 $\deg F\le D$ 保证每个 $\mu$ 都能在 $e_D$ 的截断范围内找到配对的 $w^\mu$。`, uses: ["F:pairing", "A.2"], fill: true },
            ]} />
          </Stmt>
          <Tx>{R`**怎样用替换律做结构化求值。**对每个组 $G_b$：枚举它的全部 $2^{|G_b|}\le2^s$ 个赋值，把分配给这个组的因子在代入 $C_{\rm loc}x+Uz$ 后相乘，再乘上`}</Tx>
          <Eq say={R`每个变量组自己的截断指数：它只依赖本组变量 $x_{G_b}$，记录了本组对共享线性型 $V^{\mathsf T}x$ 的贡献。`}>{R`e_D\Big(w\cdot V_{G_b}^{\mathsf T}x_{G_b}\Big).`}</Eq>
          <Tx>{R`把各组得到的（$z,w$ 的）多项式相乘，再施加 $\cL_r$。各组截断指数之积与 $e_D(w\cdot V^{\mathsf T}x)$ 在 $w$ 的总次数 $\le D$ 内一致；更高的 $w$-次数无法与 $z$-次数 $\le D$ 的多项式配对。于是 \eqref{B.1} 给出所求之和。`}</Tx>
          <Proof title="结构化求值的正确性（逐步）" steps={[
            { claim: R`固定 $x$，令 $\Psi(x,z)=\prod_e\phi_e\big((C_{\rm loc}x+Uz)_{e}\big)$。则 $\Phi(C_0x)=\Psi(x,V^{\mathsf T}x)$，且 $\Psi(x,\cdot)$ 是 $z$ 的多项式，次数 $\le\deg\Phi\le av\le D$。`, why: R`$C_0x=C_{\rm loc}x+U(V^{\mathsf T}x)$；把 $V^{\mathsf T}x$ 记成 $z$ 后，每个输入是 $z$ 的一次式，乘积的 $z$-次数不超过输入总次数。`, fill: true },
            { claim: R`由 \eqref{B.1}（取 $y=V^{\mathsf T}x$）并对 $x$ 求和（$\cL_r$ 线性）：`, tex: R`\sum_x\Phi(C_0x)=\cL_r\Big(\sum_x\Psi(x,z)\,e_D\big(w\cdot V^{\mathsf T}x\big)\Big)`, uses: ["F:subst"], fill: true },
            { claim: R`$e_D(w\cdot V^{\mathsf T}x)$ 不能按组分解，但 $\exp$ 可以：$\exp(w\cdot V^{\mathsf T}x)=\prod_b\exp(w\cdot V_{G_b}^{\mathsf T}x_{G_b})$。两侧都截断到 $w$-总次数 $\le D$ 时一致：`, tex: R`\prod_be_D\big(w\cdot V_{G_b}^{\mathsf T}x_{G_b}\big)=e_D\big(w\cdot V^{\mathsf T}x\big)+\big(w\text{-次数}>D\text{ 的项}\big)`, why: R`每个 $e_D(\cdot)$ 与 $\exp(\cdot)$ 只差 $w$-次数 $>D$ 的项；乘积中低次部分只由各因子的低次部分决定。`, fill: true },
            { claim: R`$w$-次数 $>D$ 的项在配对中消失：$\Psi(x,z)$ 的 $z$-次数 $\le D$，而 $\cL_r(z^\mu w^\nu)=0$ 除非 $\mu=\nu$。所以可以把 $e_D(w\cdot V^{\mathsf T}x)$ 换成各组截断指数之积。`, fill: true },
            { claim: R`此时被求和式按组分解：每个因子的局部输入只依赖一个组 $G_{b(e)}$，于是 $\sum_x$ 变成各组和之积（不依赖任何组的因子可任意指派给某组）：`, tex: R`\sum_x\Phi(C_0x)=\cL_r\Big(\prod_b\ \sum_{x_{G_b}}\Big[\prod_{e:\,b(e)=b}\phi_e\big((C_{\rm loc}x+Uz)_e\big)\Big]e_D\big(w\cdot V_{G_b}^{\mathsf T}x_{G_b}\big)\Big)`, why: R`这就是原文"对每组枚举赋值、相乘、附上截断指数，再把组多项式相乘并施加 $\cL_r$"。`, fill: true },
          ]} />
          <Tx>{R`**代价。**每组 $2^s$ 个赋值；形式多项式有 $2r$ 个变量（$z,w$）、多项式次数。显式系数表的代价是 $2^{O(s)}v^{O(r)}$。也可以改用附录 A 的数值配对 \eqref{A.5}：在丢弃无用项之前，$w$ 的次数至多 $O(vD)$（至多 $v$ 个组、每组 $e_D$ 次数 $D$），仍是多项式，所以每个变量取多项式大小的网格即可；一次数值求值逐组完成，只用多项式空间。两种方法都允许**固定一部分变量**，也允许在各因子的输入出现上加任意**加性平移**——后面求导时正要用到这两点。`}</Tx>
          <Box kind="warning" title={R`与 \sref{L2.1} / 附录 A 的对应`}><Tx>{R`这一段就是 \sref{L2.1} 的"乘积之和"版本：分块 $B$ ↔ 变量分组 $G_b$；低秩 $E=UV^{\mathsf T}$ ↔ 共享线性型 $V^{\mathsf T}x$；颜色计数表 ↔ $z,w$ 的系数表；\eqref{A.3} 的 $\per(B+UV^{\mathsf T})=\cL_r(F)$ ↔ \eqref{B.1}。不同之处：附录 A 里 $\cL_r$ 负责"左右颜色数相等"，这里它负责"把 $z$ 代回 $V^{\mathsf T}x$"。`}</Tx></Box>
        </Sub>

        <Sub n="B.1.2" title="Constructing the deformed copy map" zh="第二段：构造变形拷贝映射（对应引理 4.1、4.3、定理 5.1）">
          <Tx>{R`**第一步：压低最大度。**考虑因子–变量**关联图**（incidence graph）：左边 $N\le av$ 个因子，右边 $v$ 个变量，每条边是一个输入出现。它有 $v\log^{O_{a,c}(1)}v$ 条边（每个因子 $\le(\log v)^c$ 条）。把度数超过"$\log v$ 乘以变量平均度"的变量固定下来：这样的变量至多 $v/\log v$ 个，枚举它们的取值花 $2^{O(v/\log v)}$。在每个分支中，剩余图两侧的最大度都是 $\Delta=\log^{O_{a,c}(1)}v$，顶点数 $O_a(v)$。`}</Tx>
          <Derivation title="补全：Markov 计数与分支代价" collapsed steps={[
            { tex: R`\#\{j:\deg(j)>\log v\cdot\overline{\deg}\}<\frac{\sum_j\deg(j)}{\log v\cdot\overline{\deg}}=\frac{v\,\overline{\deg}}{\log v\cdot\overline{\deg}}=\frac{v}{\log v}`, why: R`Markov 不等式：度数之和 $=v\,\overline{\deg}$。` },
            { tex: R`\Delta\le\max\Big((\log v)^c,\ \log v\cdot\frac{v\log^{O(1)}v}{v}\Big)=\log^{O_{a,c}(1)}v`, why: R`因子一侧的度 $\le(\log v)^c$；变量一侧被截到 $\log v$ 倍平均度。` },
            { tex: R`2^{O(v/\log v)}=2^{o(\rho(v))}`, why: R`$\rho(v)/(v/\log v)=\sqrt{\log v}(\log\log v)^2\to\infty$。被固定的变量直接代入各因子（"固定变量"在结构化求值中是允许的）。` },
          ]} />
          <Tx>{R`**第二步：贪心词标号。**照搬 \sref{L4.1} 的贪心证明，只是度数界换成 $\Delta$。取`}</Tx>
          <Eq say={R`附录 B 的标号参数：字母表大小是 $\log v$ 的一个大常数次幂，词长约为 $\log v/\log\log v$，使得词的总数 $Q$ 约为 $\Delta\sqrt v$（相差至多 $q_*$ 倍）。`}>{R`q_*=(\log v)^{\sym{Cexp}{C}}\ \text{rounded},\qquad \ell_*=\Theta(\log v/\log\log v),\qquad q_*^{\ell_*}=\Theta_a(\Delta\sqrt v)\ \text{up to a factor of }q_*.`}</Eq>
          <Tx>{R`这里 $\sym{Cexp}{C}$ 是一个充分大的固定常数（注意：它与拷贝矩阵 $C$ 无关，只是原文沿用了同一个字母）。贪心证明中三类被排除的标号数分别是：行冲突 $O(\Delta^2)$、重复有序对 $O(\Delta^2v/q_*^{\ell_*})$、坐标碰撞 $O(\Delta\ell_*q_*^{\ell_*}/q_*)$。所选参数让有效标号"与之前完全一样"地留存下来。`}</Tx>
          <Derivation title={R`补全：三项排除各不超过 $Q/4$`} collapsed steps={[
            { tex: R`Q:=q_*^{\ell_*},\qquad \Delta^2\le Q/4`, why: R`$Q=\Theta(\Delta\sqrt v)\gg\Delta^2=\log^{O(1)}v$。（与 \sref{L4.1} 中"每行至多与 $\Delta(\Delta-1)$ 个先前行冲突"相同。）` },
            { tex: R`\Delta^2\cdot\Big\lceil\frac{2\cdot O_a(v)}{Q}\Big\rceil=O\Big(\frac{\Delta^2v}{Q}\Big)\le\frac Q4\iff Q^2\gtrsim\Delta^2v`, why: R`每个词至多使用 $D'=\lceil2|\text{side}|/Q\rceil$ 次；这正是 $Q=\Theta_a(\Delta\sqrt v)$ 中隐含常数要足够大的原因。` },
            { tex: R`\Delta\ell_*\frac{Q}{q_*}\le\frac Q4\iff q_*\ge4\Delta\ell_*`, why: R`$\Delta\ell_*=\log^{O_{a,c}(1)}v$，所以只要 $\sym{Cexp}{C}$ 大于这个指数，$q_*=(\log v)^{\sym{Cexp}{C}}$ 就足够大——这是"$\sym{Cexp}{C}$ 充分大"的第一个用处。` },
            { tex: R`\ell_*=\log_{q_*}\Theta(\Delta\sqrt v)=\frac{\Theta(\log v)}{\sym{Cexp}{C}\log\log v}=\Theta\Big(\frac{\log v}{\log\log v}\Big)`, why: R`再加上"已满的词 $<Q/2$"，总排除 $<Q$，总有可用标号。` },
          ]} />
          <Tx>{R`**第三步：把 $C$ 写成主文的分解形式。**对每个关联 $(e,j)$，用它的"因子词–变量词"有序对作为中间坐标：$L$ 的对应行选出这个坐标，$R'$ 的第 $j$ 列选出它的**反向**坐标。于是`}</Tx>
          <Eq say={R`拷贝矩阵的分解：与主文 \eqref{4.7} 完全同形——中间的“全翻转” $X^{\otimes\ell_*}$ 把每个有序词对反向，正好把每个输入出现连回它自己的变量。`}>{R`C=L(I_{\mathcal C_*}\otimes X^{\otimes\ell_*})R'.`}</Eq>
          <Proof title="补全：为什么这个乘积恰好是拷贝矩阵" steps={[
            { claim: R`$L$ 的第 $(e,j)$ 行只在坐标 $(\alpha(e),\beta(j))$ 处为 1；$R'$ 的第 $j'$ 列在所有 $(\beta(j'),\alpha(e'))$（$(e',j')$ 为关联）处为 1。`, fill: true },
            { claim: R`$X^{\otimes\ell_*}$ 在同一个立方体内翻转所有方向位，即把有序对 $(a,b)$ 变成 $(b,a)$。所以第 $(e,j)$ 行经过中间矩阵后落在 $(\beta(j),\alpha(e))$。`, uses: ["4.6", "4.7"], fill: true },
            { claim: R`$R'$ 在 $(\beta(j),\alpha(e))$ 处的第 $j'$ 列为 1 ⇔ 存在关联 $(e',j')$ 使 $(\alpha(e'),\beta(j'))=(\alpha(e),\beta(j))$。由标号性质 (ii)（不同关联的有序对不同），$(e',j')=(e,j)$，故 $j'=j$。`, why: R`于是 $\big(L(I_{\mathcal C_*}\otimes X^{\otimes\ell_*})R'\big)[(e,j),j']=[j'=j]$——正是拷贝矩阵。`, uses: ["L4.1"], fill: true },
          ]} />
          <Tx>{R`中间维数为 $M_*=v\log^{O_{a,c}(1)}v$。对例外比例 $\ell_*^{-A}$（$A$ 为充分大的固定常数）应用 \sref{T5.1}，得到`}</Tx>
          <Eq say={R`变形拷贝映射：把中间的翻转矩阵换成 \sref{T5.1} 的低次矩阵多项式 $J_*(\theta)$。$\theta=0$ 时回到拷贝矩阵；次数只有 $\sqrt{\ell_*\log\ell_*}$ 量级。`}>{R`C(\theta)=L(I_{\mathcal C_*}\otimes J_*(\theta))R',\qquad \deg C\le d_*=O_{a,c}(\sqrt{\ell_*\log\ell_*}).`}</Eq>
          <Tx>{R`在 $\theta=i$ 处，局部部分把因子 $e$ 的每个输入只送到**第 $i$ 个符号与该因子的第 $i$ 个符号相同**的变量上——这恰好是结构化求值所需的分组结构，且`}</Tx>
          <Eq say={R`特殊点处的两个结构参数：变量组大小约 $v/q_*$，共享线性型个数约 $M_*/\ell_*^A$——两者都远小于 $\rho(v)$。`}>{R`s=O_a(v/q_*),\qquad r\le M_*/\ell_*^{A}.`}</Eq>
          <Tx>{R`选取 $\sym{Cexp}{C},A$ 使 $s+r\log v=o(\rho(v))$。`}</Tx>
          <Proof title="补全：特殊点的分组结构与参数界" steps={[
            { claim: R`$J_*(i)=K_i+E$，$K_i$ 为 $i$-好的、$\rank E\le2^{\ell_*}/\ell_*^A$（\sref{T5.1}，指数 100 换成 $A$）。于是 $C(i)=L(I_{\mathcal C_*}\otimes K_i)R'+L(I_{\mathcal C_*}\otimes E)R'=:C_{\rm loc}+UV^{\mathsf T}$。`, uses: ["T5.1", "4.9"] },
            { claim: R`局部部分的 $((e,j),j')$ 元非零 ⇒ $\alpha(e)_i=\beta(j')_i$：与 \sref{L4.3} 的证明一字不差——中间矩阵不离开立方体、保持第 $i$ 个方向位，所以第 $i$ 位的有序对不变，比较首符号即得。`, why: R`于是变量组 $G_a=\{j:\beta(j)_i=a\}$（$a\in[q_*]$），因子 $e$ 的全部局部输入只依赖组 $G_{\alpha(e)_i}$。`, uses: ["L4.3"], fill: true },
            { claim: R`组大小：与 \eqref{4.5} 相同的计数，$|G_a|\le3\cdot O_a(v)/q_*$，即 $s=O_a(v/q_*)=O(v/(\log v)^{\sym{Cexp}{C}})$。取 $\sym{Cexp}{C}>1/2$ 已使 $s=o(\rho(v))$。`, uses: ["4.5"], fill: true },
            { claim: R`秩：$r\le|\mathcal C_*|\cdot2^{\ell_*}/\ell_*^A=M_*/\ell_*^A$。由于 $M_*\le Q^2=v\log^{K}v$（某个 $K=O_{a,c}(1)$）且 $\ell_*^A=(\log v/\log\log v)^{\Theta(A)}$，取 $A>K+1$ 即得 $r\log v=o(\rho(v))$。`, why: R`这是"$A$ 充分大"的用处，对应主文 \eqref{6.1} 之后 $r\log n=o(n/\log^{10}n)$ 的估计。`, fill: true },
          ]} />
        </Sub>

        <Sub n="B.1.3" title="Derivatives by Boolean finite differences" zh="第三段：布尔有限差分求导（对应引理 3.1、命题 3.2）">
          <Tx>{R`主文在特殊点用积和式加法公式 \eqref{2.2} 求导数。这里的对象是 $\sum_x\Phi(\cdot)$，没有加法公式，但有一个同样好用的替代品。固定特殊点 $i$，令 $\Delta_i(\tau)=C(i+\tau)-C(i)$。对每个固定的布尔 $x$，`}</Tx>
          <Eq say={R`把扰动部分的 $x$ 换成独立的形式变量 $y$，取 $\tau^j$ 的系数：这个函数对 $y$ 的次数不超过 $j$，因为 $y$ 每出现一次就带一个 $\tau$。`}>{R`F_{x,j}(y)=[\tau^j]\Phi\big(C(i)x+\Delta_i(\tau)y\big)`}</Eq>
          <Tx>{R`对 $y$ 的次数至多为 $j$，因为 $y$ 的每次出现都带一个被 $\tau$ 整除的因子。在 $y$ 上做多线性化（不改变它在布尔点上的值）。次数至多 $j$ 的多线性多项式满足（Möbius 反演）`}</Tx>
          <Eq say={R`多线性多项式的 Möbius 展开：系数 $c_S$ 是 $F$ 在 $S$ 的子集指示向量上取值的交错和；次数 $\le j$ 意味着只需要 $|S|\le j$ 的项。`}>{R`F(x)=\sum_{\substack{S\subseteq[v]\\|S|\le j}}\Bigg(\sum_{T\subseteq S}(-1)^{|S|-|T|}F(\one_T)\Bigg)\prod_{a\in S}x_a.`}</Eq>
          <Tx>{R`对每个固定的 $x$ 用这个展开（取 $y=x$），再对 $x$ 求和，得到`}</Tx>
          <Eq n="B.2" keyEq title="布尔有限差分求导" say={R`特殊点处的 $j$ 阶 Taylor 系数，写成对少数 $(S,T)$ 的交错和；每一项是一次“固定 $x_S=\mathbf 1$、输入平移 $\Delta_i(\tau)\one_T$”的结构化求值——平移与求和变量无关，所以仍可分组计算。`}>{R`\frac{P^{(j)}(i)}{j!}=\sum_{\substack{S\subseteq[v]\\|S|\le j}}\ \sum_{T\subseteq S}(-1)^{|S|-|T|}\sum_{\substack{x\in\{0,1\}^v\\x_a=1\ (a\in S)}}[\tau^j]\Phi\big(C(i)x+\Delta_i(\tau)\one_T\big).`}</Eq>
          <Proof title={R`补全：\eqref{B.2} 的逐步推导`} steps={[
            { claim: R`Taylor：$P(i+\tau)=\sum_j\frac{P^{(j)}(i)}{j!}\tau^j$，而 $C(i+\tau)x=C(i)x+\Delta_i(\tau)x$，故 $\frac{P^{(j)}(i)}{j!}=\sum_x[\tau^j]\Phi(C(i)x+\Delta_i(\tau)x)=\sum_xF_{x,j}(x)$。`, fill: true },
            { claim: R`次数：$\Delta_i(\tau)$ 的每个元素是 $\tau$ 的倍数（$\Delta_i(0)=0$），所以 $\Phi(C(i)x+\Delta_i(\tau)y)$ 中 $y$ 的 $k$ 次单项式至少带 $\tau^k$；取 $[\tau^j]$ 后只剩 $k\le j$ 的单项式。`, why: R`这一步要求 $y$ 与 $x$ 是**不同**的变量：$x$ 在 $C(i)x$ 中出现时不带 $\tau$，若不分离就没有次数界。`, fill: true },
            { claim: R`多线性化：把 $y_a^k$（$k\ge1$）换成 $y_a$，布尔点上的值不变、次数不增。记结果为 $F$，它是次数 $\le j$ 的多线性多项式，$F(y)=\sum_{|S|\le j}c_S\prod_{a\in S}y_a$。`, fill: true },
            { claim: R`Möbius 反演：$F(\one_T)=\sum_{S\subseteq T}c_S$（布尔格上的 zeta 变换），其逆为 $c_S=\sum_{T\subseteq S}(-1)^{|S|-|T|}F(\one_T)$。又因 $\deg F\le j$，$|S|>j$ 的 $c_S$ 全为 0——这就是展开式只取 $|S|\le j$ 的原因。`, fill: true },
            { claim: R`代回 $y=x$ 并对 $x$ 求和：$\sum_x\prod_{a\in S}x_a\cdot F_{x,j}(\one_T)=\sum_{x:\,x_S=\mathbf 1}F_{x,j}(\one_T)$，而 $F_{x,j}(\one_T)=[\tau^j]\Phi(C(i)x+\Delta_i(\tau)\one_T)$。交换求和次序即得 \eqref{B.2}。`, fill: true },
          ]} />
          <Tx>{R`对固定的 $S,T$，扰动 $\Delta_i(\tau)\one_T$ 与被求和的变量 $x$ 无关。所以内层和是一次**带若干固定变量和一个加性平移**的结构化求值（第一段已说明这是允许的）。在额外的截断多项式环 $\Q[\tau]/(\tau^h)$ 上计算它——一次求值同时给出所有 $j<h$ 的 $\tau^j$ 系数。

对所有 $j<h\le v/2$，相关的 $(S,T)$ 对数至多`}</Tx>
          <Eq say={R`需要的 $(S,T)$ 对数：对每个阶数 $j$，$S$ 取 $j$ 元子集、$T$ 取 $S$ 的子集；总数只有 $(v/h)^{O(h)}$，与 \sref{L3.1} 中子矩阵个数同阶。`}>{R`\sum_{j<h}2^j\binom vj=(v/h)^{O(h)}.`}</Eq>
          <Derivation title={R`补全：$(S,T)$ 对数的估计`} collapsed steps={[
            { tex: R`\sum_{j<h}2^j\binom vj\le h\,2^h\binom vh\le h\,2^h\Big(\frac{ev}{h}\Big)^h`, why: R`$h\le v/2$ 时 $\binom vj$ 对 $j<h$ 递增；$\binom vh\le(ev/h)^h$。` },
            { tex: R`h\,(2e\,v/h)^h\le(v/h)^{O(h)}`, why: R`$v/h\ge2$，所以常数 $2e\le(v/h)^{\log_2(2e)}$，$h\le2^h\le(v/h)^h$。` },
          ]} />
          <Tx>{R`因此直到 $h-1$ 阶的导数总代价为`}</Tx>
          <Eq say={R`特殊点上求 $h$ 个导数的总代价：分组枚举 $2^{O(s)}$，共享线性型 $v^{O(r)}$，有限差分的 $(S,T)$ 对 $(v/h)^{O(h)}$——与主文 \eqref{3.2} 同形。`}>{R`2^{O(s)}v^{O(r)}(v/h)^{O(h)}`}</Eq>
          <Tx>{R`（相差多项式因子）。它们可以按顺序在多项式空间内逐个求值。

**插值。**最后，$\deg P\le Dd_*$。取 $h=\lfloor Dd_*/\ell_*\rfloor+1$（于是 $\ell_*h>Dd_*$，$\ell_*$ 个点上各 $h$ 个导数足以确定 $P$）。由于 $d_*=O(\sqrt{\log v})$，`}</Tx>
          <Eq say={R`导数阶数 $h$ 与它的代价：$h$ 比 $v$ 小一个 $\sqrt{\log v}/\log\log v$ 因子，$h\log(v/h)$ 正好落在目标指数 $\rho(v)$ 内。`}>{R`h=O\Bigg(\frac{v\log\log v}{\sqrt{\log v}}\Bigg),\qquad h\log(v/h)=O(\rho(v)).`}</Eq>
          <Derivation title={R`补全：$h$ 与 $h\log(v/h)$ 的估计`} collapsed steps={[
            { tex: R`d_*=O\big(\sqrt{\ell_*\log\ell_*}\big)=O\Big(\sqrt{\tfrac{\log v}{\log\log v}\cdot\log\log v}\Big)=O(\sqrt{\log v})`, why: R`$\log\ell_*=\Theta(\log\log v)$。` },
            { tex: R`h\le\frac{Dd_*}{\ell_*}+1=O\Big(\frac{v\sqrt{\log v}}{\log v/\log\log v}\Big)=O\Big(\frac{v\log\log v}{\sqrt{\log v}}\Big)`, why: R`$D=\lceil av\rceil=O(v)$。` },
            { tex: R`h\log\frac vh=O\Big(\frac{v\log\log v}{\sqrt{\log v}}\Big)\cdot O(\log\log v)=O(\rho(v))`, why: R`$v/h=\Omega(\sqrt{\log v}/\log\log v)$，$\log(v/h)=O(\log\log v)$；且 $x\log(v/x)$ 在 $x\le v/e$ 时递增，用上界代入合法。` },
            { tex: R`2^{O(v/\log v)}\cdot\ell_*\cdot2^{O(s)}v^{O(r)}(v/h)^{O(h)}=2^{O(v/\log v+s+r\log v+h\log(v/h))}=2^{O(\rho(v))}`, why: R`高度变量的枚举、$\ell_*$ 个特殊点都被吸收（对应 \eqref{3.2}）。` },
          ]} />
          <Tx>{R`Hermite 插值恢复 $P(0)$。高度变量的枚举被同一个界吸收。从外部固定的变量可以直接先代入各因子。$\square$`}</Tx>
          <FiniteDiffDemo />
        </Sub>
      </Stmt>
      <Erratum kind="note" loc="p.16–17 引理 B.1 证明" title="同一字母的多重含义">{R`原文在 \sref{LB.1} 的证明中复用了若干字母：$C$ 既是拷贝矩阵，又是 $q_*=(\log v)^{C}$ 中的常数（本页写作 $\sym{Cexp}{C}$）；$j$ 既是出现 $(e,j)$ 中的变量下标，又是导数阶数；$b$ 是组下标 $G_b$，而 §B.2 中又是截断阶 $b=v+2$；$a$ 是常数（$\deg\Phi\le av$），在 Möbius 展开中又是变量下标 $x_a$。这些都只是记号复用，不影响论证；点击公式中的符号可看到本页采用的含义。`}</Erratum>
    </Sec>);
}
