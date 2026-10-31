// §2.3 小块 + 低秩：引理 2.1 —— 原文 pp.4–5，式 (2.6)
import { Sec, Tx, Eq, Box, Derivation, C, Stmt, Proof, Erratum } from "@kit";
import { BlockLab } from "./_ch02_run.jsx";

const R = String.raw;

export function Sec23() {
  return (
    <Sec n="2.3" title="Small blocks plus low rank" zh="小块 + 低秩：引理 2.1"
      gist={R`$B$ 有大小 $\le s$ 的对应对角块、$\rank E\le r$：每块枚举由 $B$ 匹配的 $(S,T)$，其余端点着色得表 $W_a(\nu,\xi)$；各块按计数向量卷积，$\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$；代价 $\poly(n)2^{O(s)}n^{O(r)}$，对每个方子矩阵同样成立。`}
      why={R`特殊点上的矩阵正是 $A(i)=B_i+E_{\rm out}$（§4–§6）：$B_i$ 按第 $i$ 个标号符号分块，$E_{\rm out}$ 低秩。§3 还要求在这些点上**每个方子矩阵**都好算。`}
      gives={["2.6"]}>
      <p className="muted">本节概念：<C id="diagblocks" /> · <C id="blockconv" /> · <C id="subclosure" /></p>
      <Tx>{R`**定义：对应对角块。**说矩阵 $B$ 有**大小至多 $s$ 的对应对角块**（corresponding diagonal blocks of size at most $s$），是指它的行被划分为 $I_1,\dots,I_b$、列被划分为 $J_1,\dots,J_b$，并且`}</Tx>
      <Eq title="对应对角块">{R`B[I_a,J_c]=0\quad(a\ne c),\qquad |I_a|,|J_a|\le s.`}</Eq>
      <Tx>{R`也就是说，非零元只可能出现在"对应"的块 $I_a\times J_a$ 内。两点需要留意：行组与列组不必相邻（任意划分，只是排列行列后才像分块对角）；对应的行组与列组**可以大小不同**。

如果 $B$ 自己有一个非方的块，则 $\per(B)=0$；否则它的积和式就是各块积和式之积 $\prod_a\per(B[I_a,J_a])$。`}</Tx>
      <Derivation title={R`补全：非方块为何使 $\per(B)=0$`} collapsed steps={[
        { tex: R`B_{u\pi(u)}\ne0\ \ \forall u\ \Longrightarrow\ \pi(I_a)\subseteq J_a\ \ \forall a`, why: R`一个排列的项非零，要求每行 $u\in I_a$ 匹配到的列落在 $J_a$ 中（块外为 0）。` },
        { tex: R`|I_a|=|\pi(I_a)|\le|J_a|\ \ \forall a,\qquad \sum_a|I_a|=\sum_a|J_a|=n\ \Longrightarrow\ |I_a|=|J_a|\ \ \forall a`, why: R`$\pi$ 是单射；不等式逐项成立而总和相等，只能处处取等。` },
        { tex: R`\exists a:\ |I_a|\ne|J_a|\ \Longrightarrow\ \per(B)=0;\qquad \text{否则}\ \per(B)=\prod_a\per(B[I_a,J_a])`, why: R`所有块都是方的时，$\pi$ 分解为各块上的双射之积，求和因式分解。` },
      ]} />
      <Tx>{R`单独的分块矩阵很好算（每块 $2^{O(s)}$），单独的低秩矩阵也很好算（$n^{O(r)}$）。下面的引理说：两者之和**仍然**好算。`}</Tx>

      <Stmt id="L2.1">
        <Tx>{R`**证明思路。**把 $\per(B+E)$ 的每个匹配中的边分成两类：**$B$-边**（这一行取了 $B$ 的元素）与 **$E$-边**（取了 $E$ 的元素，并进一步选一种颜色）。$B$-边只能落在块内，所以它们可以逐块枚举；$E$-边可能跨块，但根据 §2.2，它们只通过**颜色计数**相互作用。于是每块交出一张"剩余端点的颜色计数表"，各块的表相加（卷积）即可。`}</Tx>
        <Tx>{R`按原文的顺序：分解 $E=UV^{\mathsf T}$，用上面的 $r$ 种颜色。在每个块 $I_a\times J_a$ 中选子集 $S\subseteq I_a$、$T\subseteq J_a$，$|S|=|T|$，这些端点用 $B$ 匹配，贡献 $\per(B[S,T])$；其余端点都将用 $E$ 匹配——给它们着色并乘上相应的端点权重。令 $W_a(\nu,\xi)$ 为块 $a$ 中所有这些选择的总权重，其中剩余左端点的颜色计数为 $\nu$、剩余右端点的颜色计数为 $\xi$：`}</Tx>
        <Eq title="块表 $W_a$（本站补写的显式形式）">{R`W_a(\nu,\xi)=\sum_{\substack{S\subseteq I_a,\ T\subseteq J_a\\|S|=|T|}}\per(B[S,T])\;D_L^{I_a\setminus S}(\nu)\;D_R^{J_a\setminus T}(\xi),`}</Eq>
        <Tx>{R`这里 $D_L^{X}(\nu)$ 表示只对行集 $X$ 做 §2.2 的颜色 DP（用 $U$ 的这些行）所得的表，$D_R^{Y}(\xi)$ 同理用 $V$。$S,T$ 至多 $2^{2s}$ 种；对每种，$\per(B[S,T])$ 用子集 DP 在 $O(s2^s)$ 内算，颜色 DP 的表至多 $(s+1)^r$ 项。所以 $W_a$ 在 $2^{O(s)}n^{O(r)}$ 次运算内算出。

**合并各块。**把各块的计数向量相加，即做普通的表卷积：`}</Tx>
        <Eq title="逐块卷积（本站补写的显式形式）">{R`W(\nu,\xi)=\sum_{\substack{\nu^{(1)}+\cdots+\nu^{(b)}=\nu\\ \xi^{(1)}+\cdots+\xi^{(b)}=\xi}}\ \prod_{a=1}^{b}W_a\big(\nu^{(a)},\xi^{(a)}\big).`}</Eq>
        <Tx>{R`每张表的项数至多 $(n+1)^{2r}$（$\nu,\xi$ 的每个分量在 $0,\dots,n$ 之间），所以即使朴素地两两卷积，每块也只需 $n^{O(r)}$ 次运算。最后`}</Tx>
        <Eq n="2.6" keyEq title="小块 + 低秩的积和式" say={R`把各块交来的“剩余端点颜色计数表”卷积成总表 $W$，只保留左右计数相同（$\nu=\xi$）的项，乘上同色配对数 $\nu!$，求和就是 $\per(B+E)$。`}>{R`\per(B+E)=\sum_{\nu}\nu!\,W(\nu,\nu).`}</Eq>
        <Tx>{R`阶乘 $\nu!$ 负责在每种颜色内部把仍未匹配的端点配对。为什么每一项恰好被计一次？原文一句话：一项的 $B$-边决定各块的局部匹配，$E$-边决定端点颜色与最终配对。下面的证明把这句话展开成一个双射。`}</Tx>
        <Proof title="引理 2.1" steps={[
          { claim: R`**分解。**用有理高斯消元求 $E=UV^{\mathsf T}$，$U,V\in\Q^{n\times r}$（秩小于 $r$ 时补零列）。`, why: R`多项式时间，位长保持多项式（约定 (4)）。` },
          { claim: R`**展开成"项"。**每一项由三样东西确定：排列 $\pi$；用 $B$ 的行集 $F\subseteq[n]$；以及每个 $u\notin F$ 的颜色 $c(u)\in[r]$。其权重为`, tex: R`\prod_{u\in F}B_{u\pi(u)}\ \prod_{u\notin F}U_{u,c(u)}V_{\pi(u),c(u)},\qquad \per(B+E)=\sum_{(\pi,F,c)}(\text{权重})`, why: R`$\prod_u(B_{u\pi(u)}+\sum_aU_{ua}V_{\pi(u)a})$ 完全展开（同 \sref{F:add} 与 \sref{F:lowrank} 证明的第一步）。`, uses: ["F:add", "F:lowrank"], fill: true },
          { claim: R`**$B$-边留在块内。**若某个 $u\in F\cap I_a$ 有 $\pi(u)\notin J_a$，则 $B_{u\pi(u)}=0$，该项为零，可以丢弃。于是剩下的项满足：$S_a:=F\cap I_a$，$T_a:=\pi(S_a)\subseteq J_a$，且 $\sigma_a:=\pi|_{S_a}$ 是 $S_a\to T_a$ 的双射。`, why: R`$B[I_a,J_c]=0$（$a\ne c$）。`, fill: true },
          { claim: R`**$E$-边给出着色与配对。**左端点 $u\notin F$ 着色 $c(u)$；右端点 $\pi(u)$ 着同色。所有剩余右端点恰好是 $\bigcup_a(J_a\setminus T_a)$。$\tau:=\pi|_{F^c}$ 是剩余左端点到剩余右端点的**保色**双射。`, why: R`每条 $E$-边两端同色；$E$-边可以跨块，也可以落在同一块内（那是与"取 $B$"不同的另一项）。`, fill: true },
          { claim: R`**双射。**非零项 $(\pi,F,c)$ $\longleftrightarrow$ 数据 $\big((S_a,T_a,\sigma_a)_{a},\ \text{剩余左端点着色},\ \text{剩余右端点着色},\ \tau\big)$，其中两侧着色的总计数相同、$\tau$ 保色。`, why: R`由 $\pi=(\bigcup_a\sigma_a)\cup\tau$、$F=\bigcup_aS_a$、$c=$ 左侧着色即可还原；两个方向互逆。`, fill: true },
          { claim: R`**权重分解且与 $\tau$ 无关。**`, tex: R`\text{权重}=\prod_a\Big(\prod_{u\in S_a}B_{u\sigma_a(u)}\Big)\cdot\prod_a\Big(\prod_{u\in I_a\setminus S_a}U_{u,c(u)}\prod_{j\in J_a\setminus T_a}V_{j,c'(j)}\Big)`, why: R`把 $V$ 的因子按右端点 $j=\pi(u)$ 重新归属（$c'$ 为右端点颜色）。$\tau$ 不出现在权重里——这就是"同色任意配对"。`, fill: true },
          { claim: R`**逐项求和。**对 $\sigma_a$ 求和得 $\per(B[S_a,T_a])$；对保色的 $\tau$ 求和得因子 $\nu!$（$\nu$ 为总计数）；对各块的 $(S_a,T_a)$ 与块内着色求和得 $W_a(\nu^{(a)},\xi^{(a)})$；块与块之间的唯一耦合是"总计数 $\sum_a\nu^{(a)}=\sum_a\xi^{(a)}=\nu$"。`, tex: R`\per(B+E)=\sum_\nu\nu!\sum_{\sum_a\nu^{(a)}=\nu,\ \sum_a\xi^{(a)}=\nu}\ \prod_aW_a(\nu^{(a)},\xi^{(a)})=\sum_\nu\nu!\,W(\nu,\nu)`, why: R`即 \eqref{2.6}。注意每块内部 $\nu^{(a)}$ 与 $\xi^{(a)}$ 不必相等（$E$-边跨块），只有总和必须相等。`, uses: ["2.6"], fill: true },
          { claim: R`**代价。**每块：$\le2^{2s}$ 对 $(S,T)$，每对 $O(s2^s)$ 算 $\per(B[S,T])$ 加 $O\big(r(s+1)^{2r}\big)$ 做颜色表外积；卷积：每块 $\le(n+1)^{2r}\cdot(s+1)^{2r}\le(n+1)^{4r}$ 次乘加。共 $b\le2n$ 个非空块。`, tex: R`b\cdot\Big(2^{2s}\cdot\big(s2^s+r(s+1)^{2r}\big)+(n+1)^{4r}\Big)=\poly(n)\,2^{O(s)}n^{O(r)}`, why: R`$s\le n$、$r\le n$。`, fill: true },
          { claim: R`**每个方子矩阵。**删去行集 $R_0$、列集 $C_0$（$|R_0|=|C_0|$）后，$I_a\setminus R_0$、$J_a\setminus C_0$ 仍是大小 $\le s$ 的对应对角块，块外仍为零；低秩部分变成 $U[R_0^c,:]\,V[C_0^c,:]^{\mathsf T}$，秩 $\le r$。同一算法照用。`, why: R`删去行列可能让块变成**非方的**——算法从未要求块是方的（这正是定义允许行组、列组大小不同的用处）。`, fill: true },
          { claim: R`**秩零。**$r=0$ 时只有空计数向量，$W$ 只有一项，\eqref{2.6} 退化为普通的分块计算 $\prod_a\per(B[I_a,J_a])$（有非方块时为 0）。`, why: R`每块必须 $S=I_a$、$T=J_a$，否则剩余端点无法用 $E$ 匹配（$D_L$ 在空颜色集上只对空端点集为 1）。` },
        ]} />
      </Stmt>
      <Box kind="warning" title="合并的是计数表，不是积和式">{R`"$B$ 好算、$E$ 好算"本身并不能推出"$B+E$ 好算"——积和式对加法不是线性的，$\per(B+E)\ne\per(B)+\per(E)$，也不能由二者的积和式拼出。真正有用的事实是：**颜色计数表可以一次合并一个块**。$E$-边虽然把各块缠在一起，但它们与块的相互作用只经过一个 $r$ 维计数向量；这个"窄接口"让跨块的耦合只付出 $n^{O(r)}$。`}</Box>
      <Erratum kind="note" loc="p.5 引理 2.1 证明" title="块内的 $E$-边">{R`容易产生的疑问：如果块 $a$ 内的某个左端点用 $E$ 匹配到**同一块**的右端点，会不会和"$B$ 匹配"的那一项重复？不会。$B_{uv}+E_{uv}$ 展开后，"取 $B_{uv}$"和"取 $E_{uv}$ 的颜色 $a$"是**不同的项**；前者把 $u,v$ 放入 $S,T$，后者让 $u,v$ 作为剩余端点着色。$W_a$ 对 $(S,T)$ 的枚举与剩余端点的着色恰好区分了这两种情形——这也是每个块内 $\nu^{(a)}$ 与 $\xi^{(a)}$ 可以相等也可以不等的原因。`}</Erratum>

      <BlockLab />

      <Tx>{R`**小结与在全文中的位置。**\sref{L2.1} 是特殊点上的计算引擎：§4 的分解与 §5 的矩阵多项式保证在 $t=i$ 处 $A(i)=B_i+E_{\rm out}$，其中块大小 $s\le3n/q$、$q=\lceil(\log n)^{10}\rceil$，而 $r=\rank(E_{\rm out})$ 足够小，使得 $2^{O(s)}n^{O(r)}=2^{O(n/\log^{10}n)}$（见 §6 的参数）。但特殊点 $t=1,\dots,\ell$ 并不是我们要的 $t=0$。下一节说明怎样从特殊点上的"子矩阵积和式"得到 $P(t)$ 的导数，再用插值走回 $t=0$。`}</Tx>
    </Sec>);
}
