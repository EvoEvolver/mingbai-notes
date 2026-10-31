// 附录 A 正文：§A（动机）、§A.1 计数恒等式 = 多项式配对、§A.2 插值泛函、§A.3 整个算法的空间。
import { Sec, Tx, TxI, Eq, Box, Table, Stmt, Proof, Erratum } from "@kit";
import { ThreeWaysDemo, PairingDemo, SpacePlot } from "./_appA_demos.jsx";

const R = String.raw;

// ======================= §A =======================
export function SecA() {
  return (
    <Sec n="A" title="Polynomial space" zh="多项式空间"
      gist={R`\sref{L2.1} 的颜色计数表可能需要超多项式空间；把同一个计数恒等式改用"数值插值、一次只做一次求值"来算，时间界不变，空间降为多项式。`}
      why={R`\sref{T6.1}（主定理）只说了时间。一个 $2^{o(n)}$ 时间、却要 $n^{O(r)}$ 内存的算法，在理论上与实际上都不如同时间、多项式空间的算法；附录 B 的 #3SAT 结论也声称多项式空间，要靠这里。`}>
      <Tx>{R`回忆 \sref{L2.1} 的算法：对每个块，枚举由 $B$ 匹配的 $S,T$，把剩下的端点着色，得到块表 $W_b(\nu,\xi)$；逐块把计数向量相加（卷积）得到总表 $W(\nu,\xi)$；最后 $\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$，即 \eqref{2.6}。

这张表的下标是一对计数向量 $\nu,\xi\in\{0,\dots,n\}^r$，所以它最多有 $(n+1)^{2r}$ 项（更精确地，$|\nu|,|\xi|\le n$ 的向量对有 $\binom{n+r}{r}^2$ 个，同为 $n^{\Theta(r)}$ 量级）。在第 6 节的参数下 $r\log n=o(n/\log^{10}n)$：这让**时间** $n^{O(r)}$ 是亚指数的，但表的**大小**同样是 $n^{\Theta(r)}$——超多项式。`}</Tx>
      <Box kind="key" title="附录 A 的一句话">{R`我们从头到尾只要表的一个"加权对角和"。把表看成多项式 $F$ 的系数，这个加权和就是 $F$ 上的一个**线性泛函**；而线性泛函可以写成 $F$ 在网格点上取值的加权和。于是只需**逐点求值、乘权重、累加、丢弃**——时间不变，空间只剩累加器。`}</Box>
      <Tx>{R`整个附录分三步：§A.1 把计数恒等式写成多项式配对，并说明单点求值很便宜；§A.2 把配对泛函"插值"成网格求和；§A.3 把这台多项式空间的机器装回完整的积和式算法。`}</Tx>
    </Sec>);
}

// ======================= §A.1 =======================
export function SecA1() {
  return (
    <Sec n="A.1" title="The counting identity as a polynomial pairing" zh="计数恒等式 = 多项式配对"
      gist={R`给颜色配形式变量：块多项式 $F_b$ 的系数就是块表，$F=\prod_bF_b$ 的系数就是 $W(\nu,\xi)$，积和式等于阶乘配对 $\cL_r(F)$；而在一个数值点求 $F$ 只需多项式空间。`}
      why={R`"表"无法流式处理，"多项式"可以：多项式能代入数值求值。这一步只是翻译，不省任何东西，但为 §A.2 的插值做好了准备。`}
      gives={["A.1", "A.2", "A.3"]}>
      <Tx>{R`**设定。** 写 $A=B+UV^{\mathsf T}$，$U,V$ 各有 $r$ 列；$B$ 的行分成 $I_1,I_2,\dots$，列分成对应的 $J_1,J_2,\dots$，块外为零、每块至多 $s$ 行 $s$ 列（\sref{L2.1} 的假设；对应块不必是方的）。引入两组颜色变量 $z,w\in\Q^r$ 与线性型`}</Tx>
      <Eq say="给左端点 $i$ 选颜色 $a$ 的权重是 $U_{ia}$，并用变量 $z_a$ 记下“颜色 $a$ 用了一次”；右端点同理，用 $w_a$ 记账。">{R`u_i(z)=\sum_{a=1}^{r}U_{ia}z_a,\qquad v_j(w)=\sum_{a=1}^{r}V_{ja}w_a.`}</Eq>
      <Tx>{R`对每个对应块 $I_b\times J_b$，定义块多项式`}</Tx>
      <Eq n="A.1" keyEq title="块生成多项式" say="块 $b$ 内：先选由 $B$ 匹配的行列子集 $S,T$（贡献小积和式 $\per(B[S,T])$），剩下的每个左端点乘一个 $u_i(z)$、每个右端点乘一个 $v_j(w)$——展开后，$z^\nu w^\xi$ 的系数就是“剩余端点着色、左右颜色计数分别为 $\nu,\xi$”的总权重。">{R`F_b(z,w)=\sum_{\substack{S\subseteq I_b,\ T\subseteq J_b\\|S|=|T|}}\per(B[S,T])\prod_{i\in I_b\setminus S}u_i(z)\prod_{j\in J_b\setminus T}v_j(w).`}</Eq>
      <Tx>{R`为什么系数就是计数表？展开 $\prod_{i\in I_b\setminus S}u_i(z)$ 时，每个因子 $u_i(z)$ 里恰选一项 $U_{ia}z_a$——这正是"给端点 $i$ 着颜色 $a$、记权重 $U_{ia}$"。乘完之后 $z_a$ 的指数恰好等于颜色 $a$ 被用的次数。所以 $F_b$ 的 $z^\nu w^\xi$ 系数就是 \sref{L2.1} 证明中的块表 $W_b(\nu,\xi)$；多项式相乘时指数相加，正好是"逐块把计数向量相加"的卷积。于是 $F=\prod_bF_b$ 的 $z^\nu w^\xi$ 系数正是表项 $W(\nu,\xi)$。

接下来把 \eqref{2.6} 中"取对角、乘阶乘、求和"这个操作写成一个线性泛函（多重指标约定 $\nu!=\prod_a\nu_a!$）：`}</Tx>
      <Eq n="A.2" keyEq title="阶乘配对泛函" say="只有左右颜色计数完全相同的单项式才能配成完美匹配（每种颜色内左右端点一一配对），它的权重是同色内配对方式数 $\nu!$；其余单项式一律记零。">{R`\cL_r(z^\nu w^\xi)=\begin{cases}\nu!, & \nu=\xi,\\ 0, & \nu\neq\xi.\end{cases}`}</Eq>
      <Tx>{R`于是结构化积和式的恒等式就简单地成为`}</Tx>
      <Eq n="A.3" keyEq title="积和式 = 多项式配对" say="\sref{L2.1} 的整套“着色—卷积—取对角加阶乘”，压缩成一句话：结构化积和式等于生成多项式 $F$ 的阶乘配对。">{R`\per(B+UV^{\mathsf T})=\cL_r(F).`}</Eq>
      <Stmt id="F:pairing">
        <Proof title={R`系数 = 颜色计数表，配对 = \eqref{2.6}`} source="原文 p.14 §A.1 一句话断言；本站逐步展开" steps={[
          { claim: R`固定一块 $b$ 与一对 $S,T$。展开左端点的乘积：每个 $i\in I_b\setminus S$ 选一种颜色 $\chi(i)\in[r]$，`, tex: R`\prod_{i\in I_b\setminus S}u_i(z)=\sum_{\chi:\,I_b\setminus S\to[r]}\Big(\prod_{i}U_{i\chi(i)}\Big)z^{\nu(\chi)},\qquad \nu(\chi)_a=\big|\chi^{-1}(a)\big|.`, why: R`分配律：$r$ 项的线性型连乘，每个因子恰取一项。$z_a$ 的指数 = 取到第 $a$ 项的因子个数 = 颜色 $a$ 的使用次数。`, fill: true },
          { claim: R`右端点同理。于是 $[z^\nu w^\xi]F_b$ = $\sum_{S,T}\per(B[S,T])\times$（剩余左端点着色、计数为 $\nu$ 的总权重）$\times$（剩余右端点着色、计数为 $\xi$ 的总权重）$=W_b(\nu,\xi)$。`, why: R`这正是 \sref{L2.1} 证明中块表 $W_b$ 的定义：枚举由 $B$ 匹配的 $S,T$，其余端点按 $U,V$ 着色。`, uses: ["L2.1"], fill: true },
          { claim: R`多块相乘：单项式相乘时指数相加，`, tex: R`[z^\nu w^\xi]\prod_bF_b=\sum_{\substack{\nu^{(1)}+\nu^{(2)}+\cdots=\nu\\ \xi^{(1)}+\xi^{(2)}+\cdots=\xi}}\ \prod_bW_b\big(\nu^{(b)},\xi^{(b)}\big)=W(\nu,\xi).`, why: R`右边正是 \sref{L2.1} 中"逐块把计数向量相加"的卷积。`, fill: true },
          { claim: R`由线性，$\cL_r(F)=\sum_{\nu,\xi}W(\nu,\xi)\,\cL_r(z^\nu w^\xi)=\sum_\nu\nu!\,W(\nu,\nu)$。`, why: R`\eqref{A.2} 只保留 $\nu=\xi$ 的项并乘 $\nu!$。`, uses: ["A.2"] },
          { claim: R`由 \eqref{2.6}，右边等于 $\per(B+UV^{\mathsf T})$。这就是 \eqref{A.3}。`, why: R`\eqref{2.6} 的组合含义：同色的未匹配端点在颜色内部任意配对（$\nu!$ 种），每条 $E$-边 $(i,j)$ 取颜色 $a$ 时权重 $U_{ia}V_{ja}$，对 $a$ 求和恰为 $E_{ij}$；每个 $B+E$ 的展开项恰被数一次。`, uses: ["2.6", "L2.1"] },
        ]} />
      </Stmt>
      <Box kind="example" title={R`手算：两个 $1\times1$ 块，$r=1$（为什么需要 $\nu!$）`}>{R`取 $n=2$，$B=\diag(\beta_1,\beta_2)$（两个 $1\times1$ 块），$U=(u_1,u_2)^{\mathsf T}$，$V=(v_1,v_2)^{\mathsf T}$。每块有两种选择：$S=T=\{\text{该行列}\}$ 贡献 $\beta_b$，$S=T=\varnothing$ 贡献 $u_bv_b\,zw$。于是

$$F=(\beta_1+u_1v_1zw)(\beta_2+u_2v_2zw)=\beta_1\beta_2+(\beta_1u_2v_2+\beta_2u_1v_1)\,zw+u_1v_1u_2v_2\,z^2w^2,$$

$$\cL_1(F)=\beta_1\beta_2+(\beta_1u_2v_2+\beta_2u_1v_1)+2!\,u_1v_1u_2v_2.$$

直接展开 $\per\begin{pmatrix}\beta_1+u_1v_1&u_1v_2\\u_2v_1&\beta_2+u_2v_2\end{pmatrix}=(\beta_1+u_1v_1)(\beta_2+u_2v_2)+u_1v_2u_2v_1$，恰好也是上式：最后那个 $2!$ 来自两条 $E$-边"直配"和"交叉配"两种方式。`}</Box>
      <Erratum loc="p.14 §A.1" title={R`"the table entry $W(\nu,\xi)$ from (2.6)"`}>{R`$W(\nu,\xi)$ 是在 \eqref{2.6} 之前一段（p.5）定义的卷积表；\eqref{2.6} 本身只用到它的对角项 $W(\nu,\nu)$。原文"from (2.6)"指的就是那张表，读的时候回到 p.5 "Combine the blocks…" 一段即可。另外，表的下标包括 $\nu\ne\xi$ 的项：它们在 $F$ 中确实出现（左右颜色计数不同的着色），只是被 $\cL_r$ 记为零。`}</Erratum>
      <h3><TxI>{R`在一个数值点求 $F$`}</TxI></h3>
      <Tx>{R`$F$ 的系数很多，但 $F$ 的**值**很好算。固定数值 $z,w$：先算出 $n$ 个 $u_i(z)$ 与 $n$ 个 $v_j(w)$；对每块按 \eqref{A.1} 枚举 $S,T$，用 Ryser 公式算小积和式 $\per(B[S,T])$（$|S|\le s$，$2^{O(s)}$ 时间、$O(s)$ 空间），乘上剩余端点的线性型值并累加，得到 $F_b(z,w)$；再把各块乘起来。每块至多 $2^{|I_b|+|J_b|}\le2^{2s}$ 对 $S,T$，块数至多 $n$，所以**一次求值 $F$ 花 $2^{O(s)}\poly(n)$ 时间与多项式空间**。

剩下的问题是：怎样在**不存储 $F$ 的系数**的前提下计算 $\cL_r(F)$？`}</Tx>
      <Box kind="warning" title={R`$\cL_r$ 不是"在某一点取值"`}>{R`一个自然的误解是：既然 $F$ 好求值，或许 $\cL_r(F)$ 就是 $F$ 在某个特殊点的值？不是。点取值是乘法同态（$(FG)(p)=F(p)G(p)$），而 $\cL_r$ 不是：例如 $r=1$ 时 $\cL_1(zw)=1$，但 $\cL_1(zw\cdot zw)=\cL_1(z^2w^2)=2\ne1\cdot1$。所以必须把 $\cL_r$ 写成**许多**点取值的线性组合——这正是 §A.2 做的事。`}</Box>
    </Sec>);
}

// ======================= §A.2 =======================
export function SecA2() {
  return (
    <Sec n="A.2" title="Interpolate the functional, not the coefficient table" zh="插值泛函，而不是系数表"
      gist={R`$F$ 每个变量次数 $\le n$，所以由它在网格 $\{0,\dots,n\}^{2r}$ 上的值决定；$\cL_r$ 按坐标分解，单坐标权重为 $\kappa_{ab}$。于是 $\cL_r(F)$ 是网格值的加权和 \eqref{A.5}：逐点求值、累加、丢弃。`}
      why={R`我们要的只是一个数 $\cL_r(F)$，而非 $F$ 的全部系数。像数值积分用求积公式代替原函数的展开一样，把泛函直接写成函数值的加权和。`}
      gives={["A.4", "A.5"]}>
      <Tx>{R`**次数。** $F$ 的每个单独变量的次数都 $\le n$：事实上 $F$ 在 $z$ 上的总次数就是 $\sum_b|I_b\setminus S_b|\le n$（每个左端点至多贡献一个 $u_i(z)$），$w$ 同理。所以对每个变量各用 $n+1$ 个节点插值就够了。取节点 $0,1,\dots,n$ 上的单变量 Lagrange 基`}</Tx>
      <Eq say="$\Lambda_a$ 是次数为 $n$ 的多项式，在节点 $a$ 取 1、在其余节点 $0,\dots,n$ 取 0；任何次数 $\le n$ 的 $f$ 都满足 $f=\sum_af(a)\Lambda_a$。">{R`\Lambda_a(t)=\prod_{\substack{0\le c\le n\\ c\neq a}}\frac{t-c}{a-c}\qquad(a=0,\dots,n)`}</Eq>
      <Tx>{R`并预先算出 $(n+1)^2$ 个数`}</Tx>
      <Eq n="A.4" keyEq title="单坐标配对权重" say="$\kappa_{ab}$ 是阶乘配对作用在“左边取 $\Lambda_a$、右边取 $\Lambda_b$”上的值：把两者同次的系数相乘、乘以 $k!$、再求和。它只依赖 $n$，可以一次算好。">{R`\kappa_{ab}=\sum_{k=0}^{n}k!\,[t^k]\Lambda_a(t)\,[t^k]\Lambda_b(t).`}</Eq>
      <Tx>{R`多元插值之后，在每个坐标上分别施加 \eqref{A.2}，得到`}</Tx>
      <Eq n="A.5" keyEq title="网格求和公式" say="阶乘配对 = 网格上 $F$ 的值的加权和：走遍 $(n+1)^{2r}$ 个网格点 $(a,b)$，每点的权重是 $r$ 个单坐标权重 $\kappa_{a_cb_c}$ 的乘积。一次只需一个点的值。">{R`\cL_r(F)=\sum_{a,b\in\{0,\dots,n\}^r}\left(\prod_{c=1}^{r}\kappa_{a_cb_c}\right)F(a,b).`}</Eq>
      <Erratum loc="p.14 (A.4)–(A.5)" title="同一批字母在本附录里身兼数职">{R`读 \eqref{A.4}–\eqref{A.5} 时，字母的含义与 \eqref{A.1} 不同：

◆ 在 \eqref{A.1} 与 $u_i(z)$ 中，$a\in[r]$ 是**颜色**，$b$ 是**块**的编号；

◆ 在 $\Lambda_a$ 与 \eqref{A.4} 中，$a,b\in\{0,\dots,n\}$ 是**插值节点**，$c$ 是乘积里跑遍其余节点的哑指标；

◆ 在 \eqref{A.5} 中，$a,b\in\{0,\dots,n\}^r$ 是**网格向量**，$a_c,b_c$ 是它们的第 $c$ 个**坐标**（$c$ 跑遍颜色 $1,\dots,r$），$F(a,b)$ 表示把 $z=a$、$w=b$ 代入 $F$。

所以 $F(a,b)$ 中的 $b$ 与 $F_b$ 中的 $b$ 毫无关系。原文的数学没有问题，只是需要按上下文区分。`}</Erratum>
      <Stmt id="F:numpair">
        <Proof title="张量积插值 + 配对按坐标分解" source="原文 p.14 两句话；本站补全每一步" steps={[
          { claim: R`$F(z,w)$ 是 $2r$ 个变量 $z_1,\dots,z_r,w_1,\dots,w_r$ 的多项式，每个变量的次数 $\le n$。`, why: R`$z$ 上的总次数 $\le\sum_b|I_b|=n$；$w$ 同理。`, fill: true },
          { claim: R`张量积 Lagrange 插值：`, tex: R`F(z,w)=\sum_{a,b\in\{0,\dots,n\}^r}F(a,b)\prod_{c=1}^{r}\Lambda_{a_c}(z_c)\Lambda_{b_c}(w_c).`, why: R`两边都是每变量次数 $\le n$ 的多项式，并在整个网格 $\{0,\dots,n\}^{2r}$ 上取值相同（右边在网格点 $(a',b')$ 处只有 $(a,b)=(a',b')$ 一项非零）。对变量个数归纳：每变量次数 $\le n$ 且在网格上为零的多项式，按最后一个变量看是 $n+1$ 个零点的次数 $\le n$ 的单变量多项式，系数（关于其余变量的多项式）都在较小网格上为零，故恒为零。`, fill: true },
          { claim: R`$\cL_r$ 是线性的：`, tex: R`\cL_r(F)=\sum_{a,b}F(a,b)\ \cL_r\Big(\prod_{c=1}^{r}\Lambda_{a_c}(z_c)\Lambda_{b_c}(w_c)\Big).`, why: R`$F(a,b)$ 是数，可以提出来。`, fill: true },
          { claim: R`$\cL_r$ 在坐标上分解：若 $g_c$ 只含 $z_c,w_c$，则 $\cL_r\big(\prod_cg_c\big)=\prod_c\cL_1(g_c)$。`, tex: R`\cL_r(z^\nu w^\xi)=\nu!\,[\nu=\xi]=\prod_{c=1}^{r}\nu_c!\,[\nu_c=\xi_c]=\prod_{c=1}^{r}\cL_1\big(z_c^{\nu_c}w_c^{\xi_c}\big).`, why: R`单项式上成立（$\nu!=\prod_c\nu_c!$，且 $\nu=\xi$ 当且仅当每个坐标相等）；两边对每个 $g_c$ 都是线性的，展开成单项式即得一般情形。这就是原文的"the factorial pairing factors across coordinates"。`, uses: ["A.2"], fill: true },
          { claim: R`单坐标的值就是 $\kappa_{ab}$：`, tex: R`\cL_1\big(\Lambda_a(z)\Lambda_b(w)\big)=\sum_{k,l}[t^k]\Lambda_a\,[t^l]\Lambda_b\ \cL_1(z^kw^l)=\sum_{k=0}^{n}k!\,[t^k]\Lambda_a\,[t^k]\Lambda_b=\kappa_{ab}.`, why: R`$\cL_1(z^kw^l)=k!\,[k=l]$；$\Lambda_a$ 次数为 $n$。`, uses: ["A.4"], fill: true },
          { claim: R`代回第 3 步：每个网格点的权重是 $\prod_c\kappa_{a_cb_c}$，即得 \eqref{A.5}。结合 \eqref{A.3}，$\per(B+UV^{\mathsf T})$ 等于这个网格和。`, uses: ["A.3"] },
        ]} />
      </Stmt>
      <Box kind="aside" title={R`$\kappa$ 的矩阵形式`}>{R`记 Vandermonde 矩阵 $\mathrm{Vd}_{ck}=c^k$（$0\le c,k\le n$），Lagrange 系数矩阵 $C_{ak}=[t^k]\Lambda_a$。条件 $\Lambda_a(c)=[a=c]$ 就是 $C\,\mathrm{Vd}^{\mathsf T}=I$，即 $C=\mathrm{Vd}^{-\mathsf T}$。于是

$$\kappa=C\,\diag(0!,1!,\dots,n!)\,C^{\mathsf T}=\mathrm{Vd}^{-\mathsf T}\diag(0!,\dots,n!)\,\mathrm{Vd}^{-1}.$$

它是对称矩阵；等价地，对任意次数 $\le n$ 的 $f,g$ 有 $\sum_{a,b}\kappa_{ab}f(a)g(b)=\sum_kk!\,f_kg_k$。下面第二个可运行示例逐项验证这一点。`}</Box>
      <PairingDemo />
      <h3>代价：时间不变，空间降为多项式</h3>
      <Proof title={R`\eqref{A.5} 的资源账`} source="原文 p.14 末段；本站补全比特长度的估计" steps={[
        { claim: R`网格点共 $(n+1)^{2r}=n^{O(r)}$ 个（$n\ge1$）。`, why: R`$a,b$ 各有 $(n+1)^r$ 种取值。` },
        { claim: R`每个网格点：权重是 $r$ 个预存 $\kappa$ 的乘积；$F(a,b)$ 按 §A.1 求值，花 $2^{O(s)}\poly(n)$。总时间 $2^{O(s)}n^{O(r)}\poly(n)$——与 \sref{L2.1} 的界相同。`, uses: ["L2.1"] },
        { claim: R`空间：$\kappa$ 表 $(n+1)^2$ 个数；当前网格点 $2r$ 个整数；一次求值 $F$ 的工作区（$2n$ 个线性型值、当前块的部分和、一个 Ryser 求和）；一个累加器。每处理完一点就丢弃 $F(a,b)$。`, fill: true },
        { claim: R`比特长度是多项式的：$\Lambda_a$ 的分母是 $\prod_{c\ne a}(a-c)=\pm a!\,(n-a)!$，故 $\kappa_{ab}$ 的分母整除 $(n!)^2$ 一类的量，分子分母都是 $O(n\log n)$ 位；$F(a,b)$ 是有界整数点处的多项式值，次数 $\le 2n$、系数来自多项式比特的输入；对 $(n+1)^{2r}$ 项求和只再多出 $O(r\log n)$ 位。`, why: R`这就是原文"by the same degree and denominator bounds used in the main algorithm"所指。`, fill: true },
      ]} />
      <SpacePlot />
      <ThreeWaysDemo />
    </Sec>);
}

// ======================= §A.3 =======================
export function SecA3() {
  return (
    <Sec n="A.3" title="Space for the complete permanent algorithm" zh="整个积和式算法的空间"
      gist={R`在 \eqref{3.1} 中，大子矩阵积和式用 \eqref{A.5}、小扰动积和式在 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$ 上用 Ryser；特殊点、行列子集全部顺序枚举，只保留 $\ell h$ 个导数值。\sref{T6.1} 因此在多项式空间内成立。`}
      why={R`§A.2 只处理了一个结构化积和式。主算法（\sref{P3.2} → \sref{T6.1}）要在 $\ell$ 个特殊点上、对 $2^{o(n)}$ 个子矩阵各算一次；必须确认每一层都不需要存储中间表。`}>
      <Tx>{R`回忆 \sref{L3.1}：在特殊点 $t_0=i$，令 $A_0=A(i)$、$\Delta(\sym{zh}{z})=A(i+\sym{zh}{z})-A_0$，则`}</Tx>
      <Eq say={R`（引自 §3 的 \eqref{3.1}）第 $j$ 阶导数 = 对所有大小为 $a\le j$ 的行列子集 $S,T$：大子矩阵积和式 × 小扰动积和式的 $\sym{zh}{z}^j$ 系数，再乘 $j!$。`}>{R`P^{(j)}(t_0)=j!\sum_{a=0}^{j}\sum_{\substack{S,T\subseteq[n]\\|S|=|T|=a}}\per(A_0[S^c,T^c])\,[\sym{zh}{z}^j]\per(\Delta(\sym{zh}{z})[S,T]).`}</Eq>
      <Tx>{R`在特殊点，$A_0=B_i+E_{\rm out}$ 是"小块 + 低秩"；删去行列 $S,T$ 后仍然如此（块结构保留，秩不增）。所以每个大子矩阵积和式都可以用 §A.1–A.2 的网格求和在多项式空间内算出。`}</Tx>
      <Stmt id="C:space">
        <Proof title="逐层检查：每一层枚举都是顺序的" source="原文 p.15 §A.3；本站把每一层的存储列清楚" steps={[
          { claim: R`最外层：顺序枚举特殊点 $i=1,\dots,\ell$。每个点维护 $h$ 个累加器 $c_0,\dots,c_{h-1}$（最终 $P^{(j)}(i)=j!\,c_j$）。`, uses: ["L3.1"], fill: true },
          { claim: R`中层：对 $a=0,\dots,h-1$，按字典序顺序枚举 $|S|=|T|=a$ 的行列子集对（\sref{L3.1} 中共 $\sum_{a<h}\binom na^2\le(n/h)^{O(h)}$ 对）。一个子集只需 $O(n)$ 位来表示，"下一个子集"可就地生成。`, fill: true },
          { claim: R`大积和式 $\per(A_0[S^c,T^c])$：子矩阵仍是"块 + 低秩"，用 \eqref{A.5} 的网格求和——时间 $2^{O(s)}n^{O(r)}\poly(n)$，多项式空间。`, why: R`子矩阵的大小 $m=n-a\le n$，每变量次数 $\le m$；可以直接用 $m$（或仍用 $n$）个节点的 $\kappa$。`, uses: ["F:numpair", "L2.1"] },
          { claim: R`小积和式 $\per(\Delta(\sym{zh}{z})[S,T])$：在截断环 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$ 中用 Ryser 公式，遍历 $2^a$ 个列子集，每次累乘 $a$ 个行和；工作区是 $O(a)$ 个长度为 $h$ 的系数向量。`, why: R`子集 DP 需要存 $2^a$ 个状态，Ryser 只需流式累加——这是为了空间而选 Ryser 的原因。`, fill: true },
          { claim: R`把乘积的前 $h$ 个系数加进 $c_0,\dots,c_{h-1}$，然后丢弃两个积和式。`, why: R`由 \eqref{3.1}，$z^j$ 系数只对 $j\ge a$ 非零。` },
          { claim: R`全部特殊点处理完后只剩 $\ell h$ 个导数值。Hermite 插值的线性方程组是 $\ell h\times\ell h$ 的（$\ell h=O(nd)$，多项式规模），用无分数（fraction-free）的 Gauss 消元（如 Bareiss）在多项式空间内求解，读出 $P(0)=\per(A)$。`, uses: ["F:hermite"], fill: true },
          { claim: R`时间：与 \sref{P3.2} 的界 \eqref{3.2} 相同（每个大积和式的代价不变）。空间：上述各层工作区之和，是多项式的。故 \sref{T6.1} 在同一时间界与多项式空间内成立。`, uses: ["P3.2", "T6.1"] },
        ]} />
      </Stmt>
      <Erratum loc="p.15 §A.3" title={R`"$\Q[z]/(z^h)$" 中的 $z$ 不是 §A.1 的颜色变量`}>{R`§A.3 的 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$ 沿用 §3 的记号：$\sym{zh}{z}$ 是展开变量，$\Delta(\sym{zh}{z})=A(t_0+\sym{zh}{z})-A_0$。它与 §A.1 中的颜色变量向量 $z\in\Q^r$ 无关；两者出现在算法的不同层次（前者在 \eqref{3.1} 的小积和式里，后者在大积和式的网格求和里）。本页公式中点击 $z$ 可看到对应的含义。`}</Erratum>
      <Table head={["存什么", R`\sref{L2.1} 原算法`, R`附录 A 版本`]} rows={[
        [R`大积和式的中间量`, R`颜色计数表 $W(\nu,\xi)$：至多 $(n+1)^{2r}$ 个数`, R`$\kappa$ 表 $(n+1)^2$ 个数 + 当前网格点 + 累加器`],
        [R`块内小积和式 $\per(B[S,T])$`, R`子集 DP：$2^{s}$ 个状态`, R`Ryser：$O(s)$ 个数`],
        [R`小扰动积和式 $\per(\Delta(\sym{zh}{z})[S,T])$`, R`子集 DP 或 Ryser`, R`Ryser 于 $\Q[\sym{zh}{z}]/(\sym{zh}{z}^h)$：$O(ah)$ 个系数`],
        [R`导数值`, R`$\ell h$ 个`, R`$\ell h$ 个`],
        [R`最后的 Hermite 方程组`, R`$\ell h\times\ell h$`, R`$\ell h\times\ell h$`],
      ]} caption="两种实现需要同时保存的量（时间界相同）。" />
    </Sec>);
}
