// 附录 B §B.2–§B.6 —— 原文 pp.17–19
import { Sec, Eq, Box, Derivation, Stmt, Proof, Erratum, Tx } from "@kit";
import { QuarticGapDemo, VandermondeDemo, MixedCheckDemo, GreedyDemo } from "./_appB_run.jsx";

const R = String.raw;

export function SecB2() {
  return (
    <Sec n="B.2" title="Sparse quartic gaps" zh="稀疏四次多项式的 gap"
      gist={R`把 $(-1)^{Q(x)}$ 写成局部乘积 $\prod_e(1-2m_e(x))$，引入标记 $u$ 并模 $u^b$（$b=v+2$）截断，使次数降到 $O(v)$；被截掉的项被 $2^b$ 整除，而 $|\gap(Q)|\le2^v<2^{b-1}$，中心剩余即精确的 gap。`}
      why={R`\sref{LB.1} 要求 $\deg\Phi\le av$，可 $\prod_e(1-2m_e)$ 的次数可达 $4L=v\log^{O(1)}v$。必须在"不丢信息"的前提下降次。`}
      gives={["B.3"]}>
      <Tx>{R`对 $Q\in\F_2[x_1,\dots,x_v]$，定义`}</Tx>
      <Eq say={R`gap：多项式取 $0$ 的布尔点数减去取 $1$ 的布尔点数，是 $-2^v$ 到 $2^v$ 之间的普通整数。`}>{R`\gap(Q)=\sum_{x\in\{0,1\}^v}(-1)^{Q(x)}.`}</Eq>
      <Tx>{R`它的布尔零点个数为 $(2^v+\gap(Q))/2$（零点数 $+$ 非零点数 $=2^v$，零点数 $-$ 非零点数 $=\gap(Q)$）。数零点与算 gap 是一回事。`}</Tx>
      <Stmt id="TB.2">
        <Tx>{R`**证明。**先模 2 消去重复的单项式，把剩下的单项式列为 $m_1,\dots,m_L$。在布尔输入上，`}</Tx>
        <Eq say={R`把“和的奇偶”变成“局部因子之积”：每个取值为 $1$ 的单项式贡献一个 $-1$ 因子。`}>{R`(-1)^{Q(x)}=\prod_{e=1}^L\big(1-2m_e(x)\big).`}</Eq>
        <Tx>{R`（$m_e(x)\in\{0,1\}$ 时 $1-2m_e(x)=(-1)^{m_e(x)}$，而 $Q(x)\equiv\sum_em_e(x)\pmod 2$。）困难在于这个乘积的次数可以与 $L$ 成正比。引入标记 $u$，计算`}</Tx>
        <Eq n="B.3" keyEq title="带标记的截断乘积" say={R`给每个 $-2m_e$ 配一个标记 $u$，只保留 $u$ 的 $0$ 到 $b-1$ 次项：$u^k$ 项带着 $2^k$，丢掉的项全是 $2^b$ 的倍数，而保留的项次数至多 $4(b-1)$。`}>{R`\Phi(u,x)=\prod_{e=1}^L\big(1-2u\,m_e(x)\big)\pmod{u^b},\qquad b=v+2.`}</Eq>
        <Tx>{R`每个被省略的项的标记次数至少为 $b$，所以它在布尔输入上的系数被 $2^b$ 整除。**在**截断乘积算好**之后**，把次数 $<b$ 的代表元在 $u=1$ 处求值；再对 $x$ 求和，就得到 $\gap(Q)$ 模 $2^b$ 的值。由于 $|\gap(Q)|\le2^v<2^{b-1}$，中心剩余就是精确答案。`}</Tx>
        <Proof title="补全：整除性与中心剩余" steps={[
          { claim: R`展开：$\prod_e(1-2u\,m_e)=\sum_{k\ge0}(-2u)^ke_k\big(m_1(x),\dots,m_L(x)\big)$，$e_k$ 为第 $k$ 个初等对称多项式。`, fill: true },
          { claim: R`在布尔点上 $m_e(x)\in\{0,1\}$，$e_k(m(x))=\binom{\kappa(x)}{k}$ 为整数（$\kappa(x)$ 为取值 1 的单项式个数），所以 $u^k$ 的系数 $(-2)^k\binom{\kappa(x)}k$ 被 $2^k$ 整除。`, why: R`这正是"标记次数 $\ge b$ ⇒ 被 $2^b$ 整除"。`, fill: true },
          { claim: R`令 $\Phi_{<b}(1,x)=\sum_{k<b}(-2)^k\binom{\kappa(x)}k$，则 $(-1)^{Q(x)}-\Phi_{<b}(1,x)=\sum_{k\ge b}(-2)^k\binom{\kappa(x)}k\equiv0\pmod{2^b}$；对 $x$ 求和：`, tex: R`\sum_x\Phi_{<b}(1,x)\equiv\gap(Q)\pmod{2^b}`, fill: true },
          { claim: R`$|\gap(Q)|\le2^v=2^{b-2}<2^{b-1}$，而 $(-2^{b-1},2^{b-1}]$ 中每个模 $2^b$ 的剩余类恰有一个代表——它就是 $\gap(Q)$。`, why: R`若取 $b=v+1$，则 $2^v=2^{b-1}$ 恰在边界上：$\gap=2^v$（$Q\equiv0$）与 $\gap=-2^v$（$Q\equiv1$）模 $2^{v+1}$ 同余，无法区分。所以 $b=v+2$ 是最省事的安全选择。`, fill: true },
          { claim: R`顺序很重要：若先令 $u=1$ 再截断，什么也没截掉（乘积仍是 $4L$ 次）；必须在 $\Q[u]/(u^b)$ 中把乘积算完，最后才把系数相加。`, fill: true },
        ]} />
        <Tx>{R`**套用 \sref{LB.1}。**每个保留的项在独立输入出现上的次数至多 $4(b-1)=O(v)$（$u^k$ 项是 $k$ 个四次单项式之积）。把单项式划分成 $O(v)$ 组、每组 $O((\log v)^c)$ 个单项式。每组贡献一个多项式因子：作用域是 polylog 个变量，在 $\Q[u]/(u^b)$ 上有多项式规模的乘积电路。引理 B.1 在所需时间内算出 $\sum_x\Phi(u,x)$ 的系数向量。把这些系数相加，取模 $2^b$ 的中心剩余。$\square$`}</Tx>
        <Proof title={R`补全：\sref{LB.1} 的假设逐条核对`} steps={[
          { claim: R`变量数 $v$；单项式数 $L\le v(\log v)^c$，分成 $N=\lceil L/(\log v)^c\rceil\le v$ 组，满足 $N\le av$。`, uses: ["LB.1"], fill: true },
          { claim: R`每组因子 $\prod_{e\in\text{组}}(1-2u\,m_e)\bmod u^b$ 依赖至多 $4(\log v)^c$ 个变量，即 $(\log v)^{c'}$ 个。`, fill: true },
          { claim: R`$\Phi$ 在 $\Q[u]/(u^b)$ 上：$u^k$ 的系数是独立输入上 $\le4k$ 次的多项式，所以 $\deg\Phi\le4(b-1)=4(v+1)\le av$（取 $a=5$，$v\ge4$）。`, fill: true },
          { claim: R`系数环 $\Q[u]/(u^b)$ 中 $b=v+2$ 多项式有界；系数都是 $\le2^{O(v)}\cdot\binom{L}{b}$ 量级的整数，比特长多项式。`, fill: true },
        ]} />
      </Stmt>
      <QuarticGapDemo />
    </Sec>);
}

export function SecB3() {
  return (
    <Sec n="B.3" title="Dense checks exclude small violation sets" zh="稠密校验排除小违反集"
      gist={R`把满足赋值写成 $v(x)=0$；在 $\F_{2^b}$ 中施加 $w$ 个 Vandermonde 方程（展开为 $h_0=bw=O(n/\log n)$ 个二元校验），使每个通过的非零违反向量重量 $>w$。`}
      why={R`随机短校验只能以常数概率抓住"违反很多子句"的赋值；违反子句很少的假赋值必须先被一次性排除。`}
      gives={[]}>
      <Tx>{R`设 $F$ 是 $n$ 个变量上的 3-CNF，有 $m\le n(\log n)^c$ 个子句（这里的 $F$ 是公式，与 §B.1 的多项式 $F$ 无关）。记`}</Tx>
      <Eq say={R`子句违反向量：第 $e$ 位为 $1$ 当且仅当赋值 $x$ 违反第 $e$ 个子句；满足赋值就是违反向量为零的赋值。`}>{R`v(x)=(v_1(x),\dots,v_m(x))\in\F_2^m`}</Eq>
      <Tx>{R`为它的子句违反向量。每个 $v_e$ 是次数至多 3、至多 8 个单项式的多项式；满足赋值恰好是 $v(x)=0$ 的那些。`}</Tx>
      <Box kind="example" title="补全：为什么 $v_e$ 至多 8 个单项式">{R`子句 $\ell_1\vee\ell_2\vee\ell_3$ 被违反 ⇔ 三个文字都为假。文字 $x_i$ 为假 ⇔ $1+x_i=1$，文字 $\neg x_i$ 为假 ⇔ $x_i=1$（在 $\F_2$ 中）。所以 $v_e$ 是三个形如 $1+x_i$ 或 $x_i$ 的因子之积，例如 $(x_1\vee\neg x_2\vee x_3)$ 给出 $v_e=(1+x_1)x_2(1+x_3)=x_2+x_1x_2+x_2x_3+x_1x_2x_3$。三个二项式之积至多 $2^3=8$ 个单项式，次数 $\le3$。`}</Box>
      <Tx>{R`我们先对 $v(x)$ 施加少量（可能稠密的）线性校验，使每个幸存的非零违反向量都有很大的支撑。令`}</Tx>
      <Eq say={R`重量门槛 $w$：大约是 $n$ 除以 $\log^2(n+m)$。稠密校验保证任何“假”幸存者至少违反 $w+1$ 个子句。`}>{R`w=\Bigg\lfloor\frac{n}{(\log(n+m))^2}\Bigg\rfloor.`}</Eq>
      <Tx>{R`当 $m\le w$ 时，直接逐位校验每个违反位即可；下面假设 $m>w$。`}</Tx>
      <Stmt id="LB.3">
        <Tx>{R`**证明。**令 $b=\lceil\log_2(m+1)\rceil$，取互异的非零元 $\alpha_1,\dots,\alpha_m\in\F_{2^b}$（$\F_{2^b}$ 有 $2^b-1\ge m$ 个非零元）。施加 $w$ 个域方程`}</Tx>
        <Eq say={R`Vandermonde 校验：用互异的域元素的前 $w$ 个幂作为权重，要求违反向量的加权和为零——这正是 Reed–Solomon / BCH 码的校验方程。`}>{R`\sum_{e=1}^m\alpha_e^jv_e=0,\qquad j=0,\dots,w-1.`}</Eq>
        <Tx>{R`按二元基展开，得到 $h_0=bw=O(n/\log n)$ 个校验。若某个非零向量的支撑 $k\le w$，前 $k$ 个方程会给出一个系数矩阵为可逆 $k\times k$ Vandermonde 矩阵的齐次方程组，矛盾。域可以在多项式时间内构造，例如枚举并检验 $b$ 次不可约多项式。$\square$`}</Tx>
        <Proof title="补全：三个细节" steps={[
          { claim: R`**二元展开。**$\F_{2^b}$ 是 $\F_2$ 上的 $b$ 维向量空间。$v_e\in\F_2$，故 $\sum_e\alpha_e^jv_e=0$ 等价于对 $\alpha_e^j$ 的每个二元坐标 $k<b$ 都有 $\sum_e[\alpha_e^j]_kv_e=0$——$b$ 个 $\F_2$ 线性校验。共 $h_0=bw$ 个。`, fill: true },
          { claim: R`**规模。**$b\le\log_2(n+m)+1$，所以 $h_0=bw\le O(\log(n+m))\cdot\frac{n}{\log^2(n+m)}=O\big(\frac{n}{\log(n+m)}\big)=O\big(\frac n{\log n}\big)$。`, fill: true },
          { claim: R`**Vandermonde。**设支撑为 $\{e_1,\dots,e_k\}$，$k\le w$。前 $k$ 个方程（$j=0,\dots,k-1$）为 $\sum_{t=1}^k\alpha_{e_t}^jv_{e_t}=0$，系数矩阵 $(\alpha_{e_t}^j)_{j,t}$ 的行列式 $\prod_{s<t}(\alpha_{e_t}-\alpha_{e_s})\ne0$（$\alpha$ 互异），所以 $v_{e_1}=\dots=v_{e_k}=0$，与"支撑为 $k$"矛盾。`, fill: true },
        ]} />
        <Erratum kind="note" loc="p.18 引理 B.3 证明" title="“非零”这个条件其实用不到">{R`由于方程从 $j=0$ 开始（第一行全为 1），Vandermonde 论证只需要 $\alpha_e$ **互异**，并不需要非零；若方程从 $j=1$ 开始（BCH 码的常见写法），才需要非零以保证 $\prod_t\alpha_{e_t}\ne0$。原文同时要求两者，并取 $b=\lceil\log_2(m+1)\rceil$ 以保证有 $m$ 个非零元可选——这是安全且无害的。`}</Erratum>
      </Stmt>
      <VandermondeDemo />
      <Box kind="aside" title="示例里看到的“秩 < $h_0$”">{R`示例中二元校验矩阵的秩往往明显小于 $h_0=bw$。原因有二：$j=0$ 的方程是 $\sum_ev_e=0$，展开后只有一行非零；更重要的是特征 2 中的 Frobenius 恒等式——对 $v_e\in\F_2$ 有 $\sum_e\alpha_e^{2j}v_e=\big(\sum_e\alpha_e^jv_e\big)^2$，所以偶数次幂的方程被低次方程蕴含（这正是 BCH 码比 Reed–Solomon 码省一半校验的原因）。这只会让 $h_0$ 更小，对 \sref{LB.3} 的结论与 $h_0=O(n/\log n)$ 的上界没有任何影响。`}</Box>
    </Sec>);
}

export function SecB4() {
  return (
    <Sec n="B.4" title="Count assignments passing mixed checks" zh="对通过混合校验的赋值计数"
      gist={R`每个校验用 $\one\{\sym{bbit}{b}=0\}=\frac12\sum_{\sym{abit}{a}}(-1)^{\sym{abit}{a}\sym{bbit}{b}}$ 写成特征和；稠密校验的选择 $u\in\F_2^{h_0}$ 显式枚举，短校验引入新变量 $z_j$，得到 \eqref{B.4}：计数 $=2^{-h_0-s}\sum_u\gap(Q_u)$。`}
      why={R`§B.5 需要在挑选短校验的过程中反复精确计数"通过当前全部校验的赋值"。`}
      gives={["B.4"]}>
      <Tx>{R`稠密校验之后还会加上 $O(n)$ 个短校验。我们需要在挑选它们的同时数出幸存的赋值。`}</Tx>
      <Stmt id="LB.4">
        <Tx>{R`**证明。**令 $C\in\F_2^{h_0\times m}$ 为稠密校验矩阵（这里的 $C$ 与 §B.1 的拷贝矩阵无关），$a_1,\dots,a_s\in\F_2^m$ 为短校验行。对 $u\in\F_2^{h_0}$ 定义`}</Tx>
        <Eq say={R`混合多项式：稠密校验按 $u$ 选出一个组合（三次、稠密），每个短校验乘上自己的新变量 $z_j$（四次、稀疏）。整个式子在 $\F_2$ 上，次数至多 $4$。`}>{R`Q_u(x,z)=(u^{\mathsf T}C)\cdot v(x)+\sum_{j=1}^sz_j\big(a_j\cdot v(x)\big)\quad\text{over }\F_2,`}</Eq>
        <Tx>{R`其中 $z\in\F_2^s$。对每个校验使用恒等式`}</Tx>
        <Eq say={R`指示函数的特征和表示：比特为 $0$ 时两项都是 $+1$，平均为 $1$；比特为 $1$ 时 $+1$ 与 $-1$ 抵消，平均为 $0$。`}>{R`\one\{\sym{bbit}{b}=0\}=\frac12\sum_{\sym{abit}{a}\in\F_2}(-1)^{\sym{abit}{a}\sym{bbit}{b}},`}</Eq>
        <Tx>{R`得到`}</Tx>
        <Eq n="B.4" keyEq title="混合校验计数恒等式" say={R`通过全部校验的赋值数，等于 $2^{h_0}$ 个稀疏四次多项式的 gap 之和再除以 $2^{h_0+s}$：稠密校验的选择 $u$ 被显式枚举，短校验的选择 $z$ 变成了多项式里的变量。`}>{R`\#\{x:\text{all checks pass}\}=2^{-h_0-s}\sum_{u\in\F_2^{h_0}}\gap(Q_u).`}</Eq>
        <Proof title={R`补全：\eqref{B.4} 的推导`} steps={[
          { claim: R`记稠密校验行为 $c_1,\dots,c_{h_0}$（$C$ 的行）。$x$ 通过全部校验 ⇔ 所有 $c_k\cdot v(x)=0$ 且所有 $a_j\cdot v(x)=0$。逐个代入特征和恒等式：`, tex: R`\one\{\text{all pass}\}=\prod_{k=1}^{h_0}\frac12\sum_{u_k\in\F_2}(-1)^{u_k(c_k\cdot v(x))}\ \prod_{j=1}^s\frac12\sum_{z_j\in\F_2}(-1)^{z_j(a_j\cdot v(x))}`, fill: true },
          { claim: R`展开乘积、合并指数：$\sum_ku_k(c_k\cdot v(x))=(u^{\mathsf T}C)\cdot v(x)$，于是指数之和恰为 $Q_u(x,z)$（奇偶只需模 2）。`, tex: R`\one\{\text{all pass}\}=2^{-h_0-s}\sum_{u\in\F_2^{h_0}}\sum_{z\in\F_2^s}(-1)^{Q_u(x,z)}`, fill: true },
          { claim: R`对 $x$ 求和、交换次序：$\sum_x\sum_z(-1)^{Q_u(x,z)}=\gap(Q_u)$，其中 gap 取在全部 $n+s$ 个变量 $(x,z)$ 上。`, fill: true },
        ]} />
        <Tx>{R`每个 $Q_u$ 有 $n+s=O(n)$ 个变量，次数至多 4。它的稠密三次部分至多 $8m$ 个单项式，其余部分至多 $8sL$ 个，总计 $n\log^{O(1)}n$。对每个 $u$ 应用 \sref{TB.2}。$u$ 只有 $2^{O(n/\log n)}$ 种选择，这一开销被吸收。$\square$`}</Tx>
        <Derivation title="补全：代价核算" collapsed steps={[
          { tex: R`\#\text{mon}(Q_u)\le8m+8sL\le8n(\log n)^c+8\cdot O(n)\cdot\log^{O(1)}n=n\log^{O(1)}n`, why: R`$(u^{\mathsf T}C)\cdot v(x)$ 是至多 $m$ 个 $v_e$ 之和；$z_j(a_j\cdot v(x))$ 是 $z_j$ 乘至多 $L$ 个 $v_e$。` },
          { tex: R`v':=n+s=O(n):\qquad \#\text{mon}\le v'(\log v')^{c'},\qquad 2^{O(\rho(v'))}=2^{O(\rho(n))}`, why: R`\sref{TB.2} 的假设成立；$\rho$ 在常数倍伸缩下只变常数倍。` },
          { tex: R`2^{h_0}\cdot2^{O(\rho(n))}=2^{O(n/\log n)+O(\rho(n))}=2^{O(\rho(n))}`, why: R`$n/\log n=o(\rho(n))$。各 $u$ 依次计算、只累加，故仍是多项式空间。` },
        ]} />
        <Box kind="warning" title="为什么稠密校验枚举、短校验变量化">{R`若把 $u$ 也作为变量，$u_k\cdot(c_k\cdot v(x))$ 会让每个 $u_k$ 乘上多达 $8m$ 个单项式，总数达 $h_0\cdot8m=n^2/\mathrm{polylog}$——不再稀疏。反过来，若把短校验也枚举，就要 $2^s=2^{O(n)}$ 个 gap。两种处理恰好各取所长：稠密的少（$2^{h_0}=2^{o(\rho)}$），短的稀疏（$8sL$ 个单项式）。`}</Box>
      </Stmt>
      <MixedCheckDemo />
    </Sec>);
}

export function SecB5() {
  return (
    <Sec n="B.5" title="Choose short checks by exact counting" zh="用精确计数挑选短校验"
      gist={R`随机短校验（$L=\lceil m/w\rceil$ 个子句的列表 + 包含位）以 $>\frac12(1-e^{-1})>\frac14$ 的概率拒绝任一假幸存者；逐轮枚举全部 $(2m)^L$ 个候选、用 \sref{LB.4} 计数、选最小者。$3n$ 轮后假幸存者 $<2^n(3/4)^{3n}<1$。`}
      why={R`我们需要 $O(n)$ 个短校验，让"通过全部校验"⇔"满足"；概率方法说明它们存在，精确计数把它们确定性地找出来。`}
      gives={[]}>
      <Tx>{R`稠密校验之后，每个**假幸存者**（通过稠密校验但 $v(x)\ne0$ 的赋值）都违反超过 $w$ 个子句。令`}</Tx>
      <Eq say={R`短校验的长度：子句数除以重量门槛，只有 $\polylog n$。`}>{R`L=\lceil m/w\rceil=\log^{O(1)}n.`}</Eq>
      <Tx>{R`一个**候选短校验**选一个长度为 $L$ 的子句列表（允许重复），并为每个出现选一个包含位；它检验被包含的违反位的奇偶。候选个数为`}</Tx>
      <Eq say={R`候选短校验的总数：每个位置 $m$ 种子句 $\times\,2$ 种包含位，共 $L$ 个位置；只是 $2$ 的 $\polylog n$ 次方。`}>{R`(2m)^L=2^{(\log n)^{O(1)}}.`}</Eq>
      <Stmt id="F:select">
        <Tx>{R`**一个随机候选淘汰假幸存者的概率。**对一个固定的假幸存者，随机列表命中某个被违反子句的概率大于 $1-e^{-1}$。在命中的条件下，首个命中位置的独立包含位使被检验的奇偶均匀分布。因此随机候选以大于 $1/4$ 的概率拒绝该赋值。`}</Tx>
        <Proof title={R`补全：拒绝概率 $>1/4$`} steps={[
          { claim: R`设该赋值违反 $k>w$ 个子句。列表的 $L$ 个位置独立均匀地从 $m$ 个子句中取，一个都不命中的概率：`, tex: R`\Big(1-\frac km\Big)^L\le e^{-kL/m}<e^{-1}`, why: R`$1-t\le e^{-t}$；且 $k\ge w+1$、$L\ge m/w$ 给出 $kL/m\ge(w+1)/w>1$。`, fill: true },
          { claim: R`条件于"命中"，令 $t^\star$ 为第一个命中的位置。被检验的奇偶 $=\beta_{t^\star}\cdot1+(\text{其余位置的贡献})$，其余贡献只依赖列表与其他位置的包含位，与 $\beta_{t^\star}$ 独立。所以奇偶为 1（拒绝）的条件概率恰为 $\frac12$。`, why: R`列表中同一子句可能重复出现，但每个**出现**有自己的包含位，所以 $\beta_{t^\star}$ 总是独立的。`, fill: true },
          { claim: R`合起来：`, tex: R`\Pr[\text{拒绝}]\ge\Pr[\text{命中}]\cdot\tfrac12>\tfrac12\big(1-e^{-1}\big)\approx0.316>\tfrac14`, fill: true },
        ]} />
        <Tx>{R`**确定性挑选。**对每个候选，用引理 B.4 数出通过全部已有校验**和**该候选的赋值数，选使之最小的候选。每个真满足赋值通过每个候选；所以最小化总数也就最小化了假幸存者，而平均论证保证每轮假幸存者至少缩小为原来的 $3/4$ 以内。$3n$ 轮后假幸存者少于`}</Tx>
        <Eq say={R`$3n$ 轮之后假幸存者的上界：$2^n(3/4)^{3n}=(27/32)^n<1$——整数个假幸存者只能是 $0$。`}>{R`2^n(3/4)^{3n}<1.`}</Eq>
        <Proof title="补全：平均论证与轮数" steps={[
          { claim: R`设当前假幸存者集合为 $\mathcal S$，$|\mathcal S|=f>0$。对均匀随机候选取期望：$\mathbb E[\#\{x\in\mathcal S:\text{通过}\}]=\sum_{x\in\mathcal S}\Pr[\text{通过}]<f\cdot\big(1-0.316\big)<\tfrac34f$。`, fill: true },
          { claim: R`于是存在候选使假幸存者 $<\tfrac34f$。真满足赋值 $v(x)=0$ 使任何线性校验为 0，计数 $=\#\text{SAT}+\#\{\text{剩余假幸存者}\}$，第一项与候选无关——"计数最小"的候选正是"剩余假幸存者最少"的候选，它也 $<\tfrac34f$。`, fill: true },
          { claim: R`初始假幸存者 $\le2^n$。$3n$ 轮后 $f<2^n(3/4)^{3n}=(27/32)^n<1$，故 $f=0$。`, tex: R`2^n\Big(\frac34\Big)^{3n}=\Big(\frac{2\cdot27}{64}\Big)^n=\Big(\frac{27}{32}\Big)^n<1`, fill: true },
          { claim: R`短校验总数 $s=3n=O(n)$，每个涉及至多 $L$ 个违反位，符合 \sref{LB.4} 的假设。`, uses: ["LB.4"], fill: true },
        ]} />
        <Tx>{R`最后一次计数恰好就是满足赋值的个数。总共至多 $3n(2m)^L+1$ 次混合校验计数，全部开销都被 $2^{O(\rho(n))}$ 吸收。当 $m\le w$ 时，$m$ 个逐位违反校验本身就是短校验，可以跳过稠密校验直接用 \sref{LB.4}。`}</Tx>
        <Box kind="physics" title="直观：考官与作弊者">{R`把满足赋值看作"诚实考生"，假幸存者看作"作弊者"。每道题（短校验）诚实考生必然答对；作弊者以 $>1/4$ 的概率答错——但考官不知道谁是谁。办法：把所有可能的题都试一遍，精确统计每道题的"答对人数"，挑答对人数最少的那道。平均论证保证这道题至少淘汰四分之一的作弊者。这里没有"以高概率正确"：随机性只出现在**存在性证明**里，算法本身每一步都是精确计数。`}</Box>
      </Stmt>
      <GreedyDemo />
    </Sec>);
}

export function SecB6() {
  return (
    <Sec n="B.6" title="Counting sparsification and the final bound" zh="计数稀疏化与最终界"
      gist={R`参数 $1/\lceil\log n\rceil$ 的不交计数稀疏化给出 $2^{O(n/\log n)}$ 个公式；每个按 §B.3–B.5 精确计数后相加，得到 \sref{TB.5}。`}
      why={R`把"每片叶子 $n\log^{O(1)}n$ 个子句"的计数器拼回任意 3-CNF。`}
      gives={[]}>
      <Tx>{R`以参数 $1/\lceil\log n\rceil$ 应用不交计数稀疏化引理（[CIP06, Section 6]、[DHMTW14, Appendix A]）。它给出至多 $2^{O(n/\log n)}$ 个定义在同样 $n$ 个变量上的公式，每个有 $n\log^{O(1)}n$ 个子句，并且它们的满足赋值划分原公式的满足赋值。用上面的流程给每个公式计数，再把答案相加。`}</Tx>
      <Stmt id="TB.5">
        <Tx>{R`定理 B.5 的时间界为`}</Tx>
        <Eq say={R`全文的最终界：任意 $n$ 变量 3-CNF 的满足赋值数可在这个时间内精确算出——指数是 $n$ 乘以 $(\log\log n)^2/\sqrt{\log n}$，所以是 $2^{o(n)}$。`}>{R`2^{O\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right)}`}</Eq>
        <Proof title={R`\sref{TB.5} 的组装`} steps={[
          { claim: R`稀疏化：$\sigma=1/\lceil\log n\rceil$，叶子数 $\le2^{\sigma n}=2^{O(n/\log n)}$，每叶 $m=O(n\sigma^{-9})=O(n\log^9n)$ 个子句，即 §B.3 中 $c=9$。`, uses: ["X:sparsify"] },
          { claim: R`每片叶子：$m\le w$ 时直接逐位校验；否则构造 Vandermonde 稠密校验（\sref{LB.3}），再按 §B.5 挑选 $3n$ 个短校验，共 $\le3n(2m)^L+1$ 次混合校验计数（\sref{LB.4}），每次 $2^{O(\rho(n))}$。`, uses: ["LB.3", "LB.4", "F:select"] },
          { claim: R`总时间：`, tex: R`2^{O(n/\log n)}\cdot\big(3n(2m)^L+1\big)\cdot2^{O(\rho(n))}=2^{O(n/\log n)+(\log n)^{O(1)}+O(\rho(n))}=2^{O(\rho(n))}`, fill: true },
          { claim: R`空间：叶子按顺序生成并逐个计数、只累加答案；每次计数都是多项式空间（\sref{LB.1} → \sref{TB.2} → \sref{LB.4}）。`, uses: ["LB.1", "TB.2"], fill: true },
        ]} />
      </Stmt>
      <Tx>{R`没有任何一步丢弃秩误差或计数误差：主文与引理 B.1 中的低秩修正被精确计算，定理 B.2 的截断误差被中心剩余精确消去，§B.5 的每一轮都是精确计数。唯一的概率论证是一个平均论证，用来证明"通过枚举与精确计数确定性地选出的短校验"是好的。`}</Tx>
      <Tx>{R`这就是 \sref{C:ETH} 所需的**最后一块**：由定理 B.5，任意 3-CNF 都能在 $2^{o(n)}$ 时间内计数，从而判定可满足性。`}</Tx>
    </Sec>);
}
