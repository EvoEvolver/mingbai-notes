// §4.4 多面体的基本群 —— 式 (4.14)–(4.34)，定理 4.7–4.9，引理 4.3，推论 4.2–4.3，例 4.4–4.11，习题 4.3–4.5，图 4.10–4.16，交互图 3（EdgeGroupLab）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Erratum, Exercise, Table, Derivation, C } from "@kit";
import { EdgeGroupLab } from "./_ch04_demos.jsx";

const R = String.raw;

export function Sec44() {
  return (
    <Sec n="4.4" title="Fundamental groups of polyhedra" zh="多面体的基本群"
      gist={R`把空间三角剖分后，$\pi_1$ 变成可机械计算的**群表示**：取一棵包含全部顶点的单连通子复形 $L$（如极大树），$K-L$ 的每条棱 $\langle v_iv_j\rangle$（$i<j$）给一个生成元 $g_{ij}$，每个 2 单形 $\langle v_iv_jv_k\rangle$ 给一个关系 $g_{ij}g_{jk}=g_{ik}$。交换化后恰好是第 3 章的 $H_1$（\sref{T4.9}）。`}
      why={R`§4.3 的计算是"就事论事"的。对可三角剖分的空间，我们需要一个**算法**；它还顺便揭示了 $\pi_1$ 与 $H_1$ 的精确关系。`}
      gives={["4.19", "4.20", "4.22", "4.27", "4.30", "4.31", "4.32"]}>
      <Sub n="4.4.1" title="Free groups and relations" zh="自由群与关系">
        <p className="muted">本小节概念：<C id="presentation" /></p>
        <Tx>{R`这里定义的自由群**不必交换**，群运算用乘法记号。群 $G$ 的子集 $X=\{x_j\}$ 若使 $G$ 中每个元素 $g\in G-\{e\}$ 都**唯一地**写成`}</Tx>
        <Eq n="4.14" say="自由群的每个非单位元素都唯一地写成生成元的整数次幂的乘积，相邻的字母不同。">{R`g=x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}`}</Eq>
        <Tx>{R`（$n$ 有限，$i_k\in\mathbb{Z}$），则称 $X$ 为 $G$ 的**自由生成元集**（free set of generators）。这里约定相邻的 $x_j$ 不相同：$x_j\neq x_{j+1}$。若 $i_j=1$，$x_j^1$ 简写为 $x_j$；若 $i_j=0$，项 $x_j^0$ 应从 $g$ 中删去。例如 $g=a^3b^{-2}cb^3$ 是合格的写法，$h=a^3a^{-2}cb^0$ 则不是；为了写法唯一，$h$ 必须约化为 $h=ac$。若 $G$ 有自由生成元集，则称 $G$ 为**自由群**（free group）。

反过来，给定集合 $X$，可以构造以 $X$ 为自由生成元集的自由群 $G$。称 $X$ 的每个元素为一个**字母**（letter）。乘积`}</Tx>
        <Eq n="4.15" say="字母的整数次幂按顺序排成一串，就是一个“词”。">{R`w=x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}`}</Eq>
        <Tx>{R`（$x_j\in X$，$i_j\in\mathbb{Z}$）称为一个**词**（word）。若 $i_j\neq0$ 且 $x_j\neq x_{j+1}$，称为**既约词**（reduced word）。任何词都能经有限步约化。例如

$$a^{-2}b^{-3}b^3a^4b^3c^{-2}c^4=a^{-2}b^0a^4b^3c^2=a^2b^3c^2.$$

不含字母的词称为**空词**（empty word），记作 $1$；例如约化 $w=a^0$ 就得到它。

两个词的乘积定义为简单地并列。既约词的并列不一定既约，但总能约化。例如 $v=a^2c^{-3}b^2$、$w=b^{-2}c^2b^3$ 时，

$$vw=a^2c^{-3}b^2b^{-2}c^2b^3=a^2c^{-3}c^2b^3=a^2c^{-1}b^3.$$

于是全体既约词构成一个良定义的自由群，称为由 $X$ **生成的自由群**，记作 $F[X]$。乘法是"并列再约化"，单位元是空词，$w=x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}$ 的逆是

$$w^{-1}=x_n^{-i_n}\cdots x_2^{-i_2}x_1^{-i_1}.$$`}</Tx>
        <Exercise n="4.3" title={R`一个字母的自由群`} level="★"
          hint={R`既约词只能是 $a^n$。考虑 $\phi:a^n\mapsto n$。`}
          solution={R`$X=\{a\}$ 时，相邻字母必须不同，所以既约词只有空词 $1$ 与 $a^n$（$n\in\mathbb{Z}-\{0\}$）；约定 $a^0=1$。定义 $\phi:F[\{a\}]\to\mathbb{Z}$，$\phi(a^n)=n$。乘法是并列再约化：$a^ma^n=a^{m+n}$，故 $\phi(a^ma^n)=m+n=\phi(a^m)+\phi(a^n)$，$\phi$ 是同态；它显然是双射（逆为 $n\mapsto a^n$）。所以 $F[\{a\}]\cong\mathbb{Z}$。这也说明一个生成元的自由群恰好交换——自由群的非交换性从两个生成元才开始出现。`}>
          {R`设 $X=\{a\}$。证明由 $X$ 生成的自由群同构于 $\mathbb{Z}$。`}
        </Exercise>
        <Tx>{R`一般地，任意群 $G$ 由生成元以及它们必须满足的某些约束来确定。若 $\{x_k\}$ 是生成元集，约束最常写成`}</Tx>
        <Eq n="4.16" say="关系是生成元组成的、在群中等于单位元的词——它告诉我们哪些“绕法”其实可以缩成一点。">{R`r=x_{k_1}^{i_1}x_{k_2}^{i_2}\cdots x_{k_n}^{i_n}=1`}</Eq>
        <Tx>{R`称为**关系**（relations）。例如由 $x$ 生成的 $n$ 阶循环群（乘法记号）满足关系 $x^n=1$。

更正式地说，设群 $G$ 由 $X=\{x_k\}$ 生成。任一元素 $g\in G$ 都写成 $g=x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}$，但这里不要求写法唯一（$G$ 不一定自由）。例如在 $\mathbb{Z}_n$ 中 $x^i=x^{n+i}$。设 $F[X]$ 是由 $X$ 生成的自由群，则有从 $F[X]$ **到** $G$ 上的自然同态 $\varphi$：`}</Tx>
        <Eq n="4.17" say={R`把自由群中的一个词“拿到群 $G$ 里去算”：这是满同态，但一般不是单射。`}>{R`x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}\xrightarrow{\ \varphi\ }x_1^{i_1}x_2^{i_2}\cdots x_n^{i_n}\in G.`}</Eq>
        <Tx>{R`它不是同构，因为左边的写法与右边的元素不是一一对应的；$\varphi$ 是满射，因为 $X$ 同时生成 $F[X]$ 与 $G$。$F[X]$ 虽然不同构于 $G$，$F[X]/\ker\varphi$ 却同构于 $G$（同态基本定理 \sref{T3.1} 在非交换群上同样成立）：`}</Tx>
        <Eq n="4.18" say={R`任何群都是一个自由群模去一个正规子群：生成元给出自由群，关系生成被模掉的部分。`}>{R`F[X]/\ker\varphi\cong G.`}</Eq>
        <Tx>{R`在这个意义上，生成元集 $X$ 与 $\ker\varphi$ 完全决定了群 $G$。`}</Tx>
        <Derivation title={R`$\ker\varphi$ 是正规子群（商群 $F[X]/\ker\varphi$ 才有定义）`} steps={[
          { tex: R`\ker\varphi\ \text{是}\ F[X]\ \text{的子群}`, why: R`\sref{L3.1} 的证明不用交换律，对乘法记号逐字成立。` },
          { tex: R`r\in\ker\varphi,\ x\in F[X]\ \Rightarrow\ \varphi(x^{-1}rx)=\varphi(x^{-1})\varphi(r)\varphi(x)=\varphi(x)^{-1}\varphi(r)\varphi(x)=1`, why: R`$\varphi(r)=1$。` },
          { tex: R`x^{-1}rx\in\ker\varphi`, why: "对共轭封闭，即正规。" },
        ]} />
        <Tx>{R`这样，由 $X$ 生成的群 $G$ 由关系确定。生成元与关系的并列`}</Tx>
        <Eq n="4.19" keyEq title="群的表示" say="一张“生成元 + 关系”的清单就确定了一个群：生成元的所有词，模去由关系生成的正规子群。">{R`(x_1,\ldots,x_p;r_1,\ldots,r_q)`}</Eq>
        <Tx>{R`称为 $G$ 的一个**表示**（presentation）。例如 $\mathbb{Z}_n=(x;x^n)$，$\mathbb{Z}=(x;\emptyset)$。（原书在分隔生成元与关系时混用了"；"与"："，本站统一写作"；"。）`}</Tx>
        <Box kind="example" n="4.4" title={R`$\mathbb{Z}\oplus\mathbb{Z}$ 的表示`}>{R`设 $\mathbb{Z}\oplus\mathbb{Z}=\{x^ny^m\mid n,m\in\mathbb{Z}\}$ 是由 $X=\{x,y\}$ 生成的自由 Abel 群。于是 $xy=yx$。由 $xyx^{-1}y^{-1}=1$ 得到关系 $r=xyx^{-1}y^{-1}$。$\mathbb{Z}\oplus\mathbb{Z}$ 的表示是 $(x,y;xyx^{-1}y^{-1})$。

注意：$(x,y;\emptyset)$ 是**两个生成元的自由群**，它非交换、比 $\mathbb{Z}\oplus\mathbb{Z}$ 大得多；交换关系 $xyx^{-1}y^{-1}$（**换位子**）正是把它压成 $\mathbb{Z}\oplus\mathbb{Z}$ 的那一条关系。`}</Box>
      </Sub>

      <Sub n="4.4.2" title="Calculating fundamental groups of polyhedra" zh="多面体基本群的计算">
        <p className="muted">本小节概念：<C id="edge_group" /></p>
        <Tx>{R`为了不陷入技术细节，这里只作概略的介绍，讲法依照 Armstrong (1983)；有兴趣的读者可参考该书或任何一本代数拓扑教科书。如上一章所述，多面体 $|K|$ 在同胚意义下很好地近似给定的拓扑空间 $X$。基本群是拓扑不变量（\sref{C4.1}），所以 $\pi_1(X)=\pi_1(|K|)$。我们假定 $X$ 弧连通并省去基点。于是只要有系统计算 $\pi_1(|K|)$ 的办法，也就得到了 $\pi_1(X)$。

我们先定义单纯复形的**边群**（edge group），它对应于拓扑空间的基本群；再介绍一个计算它的简便办法。设 $f:|K|\to X$ 是 $X$ 的三角剖分。$X$ 的基本群的元素可以用 $X$ 中的圈表示，可以期望 $|K|$ 中存在类似的圈。由于 $|K|$ 中的圈可以由 1 单形拼成，我们考察 $|K|$ 中全体 1 单形，在其上赋予一个群结构，称为 $K$ 的边群。

单纯复形 $K$ 中的一条**棱道路**（edge path）是 $|K|$ 的顶点序列 $v_0v_1\ldots v_k$，其中相邻一对 $v_iv_{i+1}$ 是 $|K|$ 的 0 单形或 1 单形。（出于技术原因允许 $v_i=v_{i+1}$，此时相应的单形是 0 单形 $v_i=v_{i+1}$。）若 $v_0=v_k\ (=v)$，称此棱道路为 $v$ 处的**棱圈**（edge loop）。若两个棱圈 $\alpha$ 与 $\beta$ 能通过有限次重复下列操作从一个得到另一个，就称它们等价：

(1) 若顶点 $u,v,w$ 张成 $K$ 中的一个 **2 单形**，棱道路 $uvw$ 可以换成 $uw$，反之亦然（\figref{4.10}(a)）。

(2) 作为特例，若 (1) 中 $u=w$，棱道路 $uvw$ 意味着先沿 $uv$ 走、再从 $v$ 退回 $w=u$。这条棱道路 $uvu$ 可以换成 0 单形 $u$，反之亦然（\figref{4.10}(b)）。`}</Tx>
        <Figure n="4.10" caption={R`棱圈可能的形变。(a) 中 $uvw$ 换成 $uw$；(b) 中 $uvu$ 换成 $u$。`} width="80%" />
        <Tx>{R`把 $vv_1\ldots v_{k-1}v$ 所在的 $v$ 处棱圈等价类记作 $\{vv_1\ldots v_{k-1}v\}$。等价类在如下乘积下构成群：`}</Tx>
        <Eq n="4.20" say="两个棱圈相乘，就是在基点处把顶点序列接起来——这是道路乘积的离散版本。">{R`\{vu_1\ldots u_{k-1}v\}*\{vv_1\ldots v_{i-1}v\}=\{vu_1\ldots u_{k-1}vv_1\ldots v_{i-1}v\}.`}</Eq>
        <Tx>{R`单位元是等价类 $\{v\}$，$\{vv_1\ldots v_{k-1}v\}$ 的逆是 $\{vv_{k-1}\ldots v_1v\}$。这个群称为 $K$ 在 $v$ 处的**边群**，记作 $E(K;v)$。`}</Tx>
        <Stmt id="T4.7" />
        <Tx>{R`证明可在 Armstrong (1983) 等书中找到。同构 $\varphi:E(K;v)\to\pi_1(|K|;v)$ 就是把 $K$ 中的棱圈看成 $|K|$ 中的圈。要求出 $E(K;v)$，需要读出它的生成元与关系。设 $L$ 是 $K$ 的单纯子复形，满足

(a) $L$ 包含 $K$ 的所有顶点（0 单形）；

(b) 多面体 $|L|$ 弧连通且单连通。

给定弧连通的单纯复形 $K$，总存在满足这些条件的子复形 $L$。弧连通且单连通的一维单纯复形称为**树**（tree）。若树 $T_M$ 不是其他树的真子集，就称为 $K$ 的**极大树**（maximal tree）。`}</Tx>
        <Stmt id="L4.3">
          <Proof steps={[
            { claim: R`反设 $T_M$ 不含某个顶点 $w$。` },
            { claim: R`$K$ 弧连通，从 $T_M$ 的某个顶点到 $w$ 有一条棱道路；取这条道路上第一条离开 $T_M$ 的棱，得到 $K$ 中的 1 单形 $vw'$，$v\in T_M$、$w'\notin T_M$（不妨就记 $w'$ 为 $w$）。`, fill: true },
            { claim: R`$T_M\cup\{vw\}\cup\{w\}$ 是 $K$ 的一维子复形，弧连通、单连通（新棱只在端点 $v$ 处与 $T_M$ 相交，不产生回路），且真包含 $T_M$——与 $T_M$ 的极大性矛盾。`, why: R`"单连通"一句是本站补充的理由。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`假定已经找到子复形 $L$。由于 $|L|$ 单连通，$|L|$ 中的棱圈对 $E(K;v)$ 没有贡献，所以计算中可以实际上忽略 $L$ 中的单形。设 $v_0\ (=v),v_1,\ldots,v_n$ 是 $K$ 的顶点。对每个有序顶点对 $v_i,v_j$，若 $\langle v_iv_j\rangle$ 是 $K$ 的 1 单形，就指定一个"对象" $g_{ij}$。令 $G(K;L)$ 是由全体 $g_{ij}$ 生成的群。关系是什么？有下面两类：

(1) 由于忽略 $L$ 中的单形：若 $\langle v_iv_j\rangle\in L$，令 $g_{ij}=1$。

(2) 若 $\langle v_iv_jv_k\rangle$ 是 $K$ 的 2 单形，绕 $v_iv_jv_k$ 没有非平凡的圈，于是有关系 $g_{ij}g_{jk}g_{ki}=1$。

生成元 $\{g_{ij}\}$ 与这组关系完全确定了群 $G(K;L)$。`}</Tx>
        <Stmt id="T4.8" />
        <Tx>{R`实际上还可以更省事。例如 $g_{ii}$ 应令为 $1$，因为它对应顶点 $v_i$，而 $v_i$ 属于 $L$。又由 $g_{ij}g_{ji}=g_{ii}=1$ 得 $g_{ij}=g_{ji}^{-1}$。因此只需对 $\langle v_iv_j\rangle\in K-L$ 且 $i<j$ 的顶点对引入生成元 $g_{ij}$。由于没有 $\langle v_iv_j\rangle\in L$ 的生成元，第一类关系可以略去。若 $\langle v_iv_jv_k\rangle$ 是 $K-L$ 中 $i<j<k$ 的 2 单形，相应的关系**唯一地**写成 $g_{ij}g_{jk}=g_{ik}$，因为我们只涉及 $i<j$ 的 $\langle v_iv_j\rangle$。`}</Tx>
        <Box kind="key" title="游戏规则（原书的五步）">{R`(1) 找一个三角剖分 $f:|K|\to X$。

(2) 找一个弧连通、单连通、包含 $K$ 全部顶点的子复形 $L$。

(3) 对 $K-L$ 中每个 $i<j$ 的 1 单形 $\langle v_iv_j\rangle$ 指定一个生成元 $g_{ij}$。

(4) 若有 $i<j<k$ 的 2 单形 $\langle v_iv_jv_k\rangle$，就加上关系 $g_{ij}g_{jk}=g_{ik}$。若 $v_i,v_j,v_k$ 中有两个顶点构成 $L$ 的 1 单形，相应的生成元令为 $1$。

(5) 于是 $\pi_1(X)$ 同构于 $G(K;L)$——由 $\{g_{ij}\}$ 生成、满足 (4) 中关系的群。

**计数检验**（本站补充）：$L$ 可缩，所以 $L$ 的 Euler 示性数为 $1$。若 $K$ 是曲面的剖分（$I_0,I_1,I_2$ 个顶点、棱、三角形），$L$ 含 $I_0$ 个顶点、$e_L$ 条棱、$f_L$ 个三角形，则生成元个数 $=I_1-e_L$，关系个数 $=I_2-f_L$，二者之差为 $(I_1-e_L)-(I_2-f_L)=I_1-I_2-(e_L-f_L)=I_1-I_2-(I_0-1)=1-\chi(K)$。`}</Box>
        <Tx>{R`下面计算几个例子。`}</Tx>
        <Box kind="example" n="4.5" title={R`2 骨架；$\pi_1(S^n)$`}>
          <Tx>{R`由构造可见，$E(K;v)$ 与 $G(K;L)$ 只涉及 $K$ 的 0、1、2 单形。因此若 $K^{(2)}$ 表示 $K$ 的 **2 骨架**（2-skeleton，$K$ 中全体 0、1、2 单形的集合），应当有`}</Tx>
          <Eq n="4.21" say="基本群只看得见二维以下的单形：把三维以上的单形全部拿掉，基本群不变。">{R`\pi_1(|K|)\cong\pi_1(|K^{(2)}|).`}</Eq>
          <Tx>{R`这在实际计算中很有用。例如 3 单形与它的边界有相同的 2 骨架。3 单形是实心球 $D^3$ 的多面体 $|K|$，它的边界 $|L|$ 是球面 $S^2$ 的多面体。$D^3$ 可缩，故 $\pi_1(|K|)\cong\{e\}$。由 \eqref{4.21} 得 $\pi_1(S^2)\cong\pi_1(|K|)\cong\{e\}$。一般地，对 $n\ge2$，$(n+1)$ 单形 $\sigma_{n+1}$ 与它的边界有相同的 2 骨架。注意 $\sigma_{n+1}$ 可缩，而它的边界是 $S^n$ 的多面体，于是得到公式`}</Tx>
          <Eq n="4.22" keyEq title={R`$n\ge2$ 的球面单连通`} say={R`二维及以上的球面上，任何圈都能缩成一点：一维的“套索”从球面上滑脱。`}>{R`\pi_1(S^n)\cong\{e\}\qquad n\ge2.`}</Eq>
        </Box>
        <Figure n="4.11" caption={R`3-花束的三角剖分。粗线表示极大树 $L$。`} width="52%" />
        <Box kind="example" n="4.6" title="圆周">
          <Tx>{R`设 $K\equiv\{v_1,v_2,v_3,\langle v_1v_2\rangle,\langle v_1v_3\rangle,\langle v_2v_3\rangle\}$ 是圆周 $S^1$ 的单纯复形，取 $v_1$ 为基点。极大树可取 $L=\{v_1,v_2,v_3,\langle v_1v_2\rangle,\langle v_1v_3\rangle\}$。只有一个生成元 $g_{23}$。$K$ 中没有 2 单形，关系为空。于是`}</Tx>
          <Eq n="4.23" say="三角形三条边构成的圆周：只剩一条不在树上的棱，它生成一个没有关系的群，即整数。">{R`\pi_1(S^1)\cong G(K;L)=(g_{23};\emptyset)\cong\mathbb{Z}`}</Eq>
          <Tx>{R`与 \sref{T4.5} 一致。`}</Tx>
        </Box>
        <Box kind="example" n="4.7" title={R`$n$-花束：自由群`}>
          <Tx>{R`$n$ 个圆周的一点并称为 **$n$-花束**（$n$-bouquet）。例如 \figref{4.11} 是 3-花束的三角剖分。取公共点 $v$ 为基点，\figref{4.11} 中的粗线构成极大树 $L$。$G(K;L)$ 的生成元是 $g_{12}$、$g_{34}$ 与 $g_{56}$，没有关系，于是`}</Tx>
          <Eq n="4.24" say="三个圆周捏在一点：三个独立的绕法，彼此之间没有任何关系——自由群。">{R`\pi_1(\text{3-bouquet})=G(K;L)=(x,y,z;\emptyset).`}</Eq>
          <Tx>{R`注意这是自由群，但不是自由 **Abel** 群。非交换性可以这样看出：考虑在 $v$ 处绕不同洞的圈 $\alpha$ 与 $\beta$。显然乘积 $\alpha*\beta*\alpha^{-1}$ 不能连续地变形为 $\beta$，所以 $[\alpha]*[\beta]*[\alpha]^{-1}\neq[\beta]$，即`}</Tx>
          <Eq n="4.25" title="基本群可以不交换" say="先绕左边的洞再绕右边的洞，与先右后左，是两种不同的绕法。">{R`[\alpha]*[\beta]\neq[\beta]*[\alpha].`}</Eq>
          <Tx>{R`一般地，$n$-花束有 $n$ 个生成元 $g_{12},\ldots,g_{2n-1\,2n}$，基本群同构于 $n$ 个生成元、没有关系的自由群。`}</Tx>
        </Box>
        <Box kind="example" n="4.8" title="圆盘">{R`设 $D^2$ 是二维圆盘。$D^2$ 的一个三角剖分 $K$ 由包括内部的三角形给出。显然 $K$ 本身可以作为 $L$，$K-L$ 为空。于是 $\pi_1(K)\cong\{e\}$。`}</Box>
        <Figure n="4.12" caption={R`环面的一个三角剖分。`} width="52%" />
        <Box kind="example" n="4.9" title="环面">
          <Tx>{R`\figref{4.12} 是环面 $T^2$ 的三角剖分，阴影区取为子复形 $L$。（验证它包含全部顶点，并且弧连通、单连通：它是左上 $2\times2$ 个方格拼成的一块圆盘，9 个顶点在其中两两不同。）共有 11 个生成元、10 个关系。令 $x=g_{02}$、$y=g_{04}$，写出关系（第二、三列标出已知的值，$L$ 中的棱记为 1）：`}</Tx>
          <Table head={["", "2 单形给出的关系", "已知值", "结论"]} rows={[
            ["(a)", R`$g_{02}\,g_{27}=g_{07}$`, R`$g_{02}=x,\ g_{27}=1$`, R`$g_{07}=x$`],
            ["(b)", R`$g_{03}\,g_{37}=g_{07}$`, R`$g_{03}=1,\ g_{07}=x$`, R`$g_{37}=x$`],
            ["(c)", R`$g_{37}\,g_{78}=g_{38}$`, R`$g_{37}=x,\ g_{78}=1$`, R`$g_{38}=x$`],
            ["(d)", R`$g_{34}\,g_{48}=g_{38}$`, R`$g_{34}=1,\ g_{38}=x$`, R`$g_{48}=x$`],
            ["(e)", R`$g_{24}\,g_{48}=g_{28}$`, R`$g_{48}=x$`, R`$g_{24}x=g_{28}$`],
            ["(f)", R`$g_{02}\,g_{24}=g_{04}$`, R`$g_{02}=x,\ g_{04}=y$`, R`$xg_{24}=y$`],
            ["(g)", R`$g_{04}\,g_{46}=g_{06}$`, R`$g_{04}=y,\ g_{46}=1$`, R`$g_{06}=y$`],
            ["(h)", R`$g_{01}\,g_{16}=g_{06}$`, R`$g_{01}=1,\ g_{06}=y$`, R`$g_{16}=y$`],
            ["(i)", R`$g_{16}\,g_{68}=g_{18}$`, R`$g_{16}=y,\ g_{68}=1$`, R`$g_{18}=y$`],
            ["(j)", R`$g_{12}\,g_{28}=g_{18}$`, R`$g_{12}=1,\ g_{18}=y$`, R`$g_{28}=y$`],
          ]} />
          <Tx>{R`由 (e)、(f) 得 $x^{-1}yx=g_{28}$（(f) 给 $g_{24}=x^{-1}y$，代入 (e)）。最后得到

$$g_{02}=g_{07}=g_{37}=g_{38}=g_{48}=x,\qquad g_{04}=g_{06}=g_{16}=g_{18}=g_{28}=y,\qquad g_{24}=x^{-1}y,$$

以及一个关系 $x^{-1}yx=y$（由 (j) 的 $g_{28}=y$），即`}</Tx>
          <Eq n="4.26" say="环面上两个基本圈满足的唯一关系：它们可以交换次序。">{R`xyx^{-1}y^{-1}=1.`}</Eq>
          <Tx>{R`这说明 $G(K;L)$ 由两个可交换（$xy=yx$）的生成元生成，因此（参见例 4.4）`}</Tx>
          <Eq n="4.27" title={R`环面：$(x,y;xyx^{-1}y^{-1})$`} say="用剖分算出的环面基本群：两个生成元加一条交换关系，恰是两份整数，与积空间的结果一致。">{R`G(K;L)=(x,y;xyx^{-1}y^{-1})\cong\mathbb{Z}\oplus\mathbb{Z}`}</Eq>
          <Tx>{R`与 \eqref{4.11} 一致。

直观图像如下。考虑圈 $\alpha=0\to1\to2\to0$ 与 $\beta=0\to3\to4\to0$。由于 $g_{12}=g_{01}=1$，圈 $\alpha$ 对应 $x=g_{02}$；$\beta$ 对应 $y=g_{04}$。$\alpha$ 与 $\beta$ 是独立的非平凡圈，它们生成 $\pi_1(T^2)$。用它们表示，关系写成`}</Tx>
          <Eq n="4.28" say={R`沿正方形的四条边依次走 $\alpha$、$\beta$、$\alpha$ 的反向、$\beta$ 的反向，这条路可以在正方形内部缩成一点。`}>{R`\alpha*\beta*\alpha^{-1}*\beta^{-1}\sim c_v`}</Eq>
          <Tx>{R`其中 $c_v$ 是 $v$ 处的常值圈，见 \figref{4.13}。`}</Tx>
        </Box>
        <Figure n="4.13" caption={R`圈 $\alpha$ 与 $\beta$ 满足关系 $\alpha*\beta*\alpha^{-1}*\beta^{-1}\sim c_v$。`} width="85%" />
        <Tx>{R`更一般地，设 $\Sigma_g$ 是亏格 $g$ 的环面。如第 2 章章末题 2.1 所示，$\Sigma_g$ 可以表示为 $\mathbb{R}^2$ 中的 $4g$ 边形，边界作适当粘合。$\Sigma_g$ 的基本群由 $2g$ 个圈 $\alpha_i,\beta_i$（$1\le i\le g$）生成。与 \eqref{4.28} 类似，可以验证`}</Tx>
        <Eq n="4.29" say={R`沿 $4g$ 边形的边界走一圈（依次经过每个环柄的 $\alpha_i,\beta_i,\alpha_i^{-1},\beta_i^{-1}$），这条路在多边形内部可以缩成一点。`}>{R`\prod_{i=1}^{g}(\alpha_i*\beta_i*\alpha_i^{-1}*\beta_i^{-1})\sim c_v`}</Eq>
        <Tx>{R`若把对应 $\alpha_i$ 的生成元记为 $x_i$、对应 $\beta_i$ 的记为 $y_i$，它们之间只有一个关系：`}</Tx>
        <Eq n="4.30" keyEq title={R`亏格 $g$ 曲面的基本群`} say={R`亏格 $g$ 的曲面：$2g$ 个生成元，只有一条关系——所有环柄的换位子之积为 1。$g\ge2$ 时这个群不交换。`}>{R`\prod_{i=1}^{g}(x_iy_ix_i^{-1}y_i^{-1})=1.`}</Eq>
        <Figure n="4.14" caption={R`Klein 瓶的一个三角剖分。`} width="52%" />
        <Exercise n="4.4" title="Klein 瓶的基本群" level="★★"
          hint={R`与例 4.9 的唯一区别在于最下一行顶点的顺序是 $0,2,1,0$（底边与顶边**反向**粘合）。阴影区 $L$ 与例 4.9 相同。逐个三角形写出 $g_{ij}g_{jk}=g_{ik}$，从 $x=g_{02}$、$y=g_{04}$ 出发依次求出其余生成元。`}
          solution={R`顶点排布：第一行 $0,1,2,0$；第二行 $3,5,7,3$；第三行 $4,6,8,4$；最下一行 $0,2,1,0$。每个小方格沿左下—右上对角线切开。$L$ 是左上 $2\times2$ 个方格（16 条棱、8 个三角形），$K$ 共 27 条棱、18 个三角形，故有 $27-16=11$ 个生成元、$18-8=10$ 个关系。$L$ 中的 16 条棱（记为 1）：横向 $01,12,35,57,46,68$，纵向 $03,15,27,34,56,78$，对角 $13,25,45,67$。

右列两个方格与例 4.9 相同：
$$\begin{aligned}&g_{02}g_{27}=g_{07}\Rightarrow g_{07}=x;\quad g_{03}g_{37}=g_{07}\Rightarrow g_{37}=x;\\ &g_{37}g_{78}=g_{38}\Rightarrow g_{38}=x;\quad g_{34}g_{48}=g_{38}\Rightarrow g_{48}=x.\end{aligned}$$
最下一行三个方格（上排 $4,6,8,4$，下排 $0,2,1,0$）给出六个三角形 $\{0,4,6\},\{0,2,6\},\{2,6,8\},\{1,2,8\},\{1,4,8\},\{0,1,4\}$：
$$\begin{aligned}&g_{04}g_{46}=g_{06}\Rightarrow g_{06}=y;\qquad g_{02}g_{26}=g_{06}\Rightarrow g_{26}=x^{-1}y;\\ &g_{26}g_{68}=g_{28}\Rightarrow g_{28}=x^{-1}y;\qquad g_{12}g_{28}=g_{18}\Rightarrow g_{18}=x^{-1}y;\\ &g_{14}g_{48}=g_{18}\Rightarrow g_{14}x=x^{-1}y\Rightarrow g_{14}=x^{-1}yx^{-1};\\ &g_{01}g_{14}=g_{04}\Rightarrow g_{14}=y.\end{aligned}$$
最后两行给出 $x^{-1}yx^{-1}=y$，即 $yx^{-1}=xy$，亦即 $xyxy^{-1}=1$。其余 9 个生成元都已用 $x,y$ 表示，所以
$$\pi_1(\text{Klein bottle})\cong(x,y;xyxy^{-1}).$$
这个群**不交换**：若 $xy=yx$，关系会变成 $x^2=1$，而 $x$ 在交换化中恰好是 2 阶元（例 4.11），并非单位元。交互图 3 选"Klein 瓶"即可看到同样的 10 个关系与化简过程（算法输出的关系子 $xy^{-1}xy$ 与 $xyxy^{-1}$ 等价：由 $yxy^{-1}=x^{-1}$ 两边取共轭得 $y^{-1}xy=x^{-1}$）。`}>
          <Tx>{R`\figref{4.14} 是 Klein 瓶的三角剖分，阴影区是子复形 $L$。共有 11 个生成元、10 个关系。取 $x=g_{02}$、$y=g_{04}$，写出各 2 单形给出的关系，证明`}</Tx>
          <Eq n="4.31" title="Klein 瓶的基本群" say={R`Klein 瓶的两个基本圈满足 $yxy^{-1}=x^{-1}$：沿 $y$ 方向绕一圈，$x$ 方向被反转——这就是“不可定向”的代数签名。`}>{R`\pi_1(\text{Klein bottle})\cong(x,y;xyxy^{-1}).`}</Eq>
        </Exercise>
        <Figure n="4.15" caption={R`射影平面的一个三角剖分。`} width="50%" />
        <Box kind="example" n="4.10" title={R`射影平面 $\sym{RP}{\RP^2}$`}>
          <Tx>{R`\figref{4.15} 是射影平面 $\sym{RP}{\RP^2}$ 的三角剖分，阴影区是子复形 $L$。共有六个生成元、六个关系（见下面的勘误）。取 $x=g_{23}$，写出关系：`}</Tx>
          <Table head={["", "2 单形给出的关系", "已知值", "结论"]} rows={[
            ["(a)", R`$g_{23}\,g_{34}=g_{24}$`, R`$g_{23}=x,\ g_{34}=1$`, R`$g_{24}=x$`],
            ["(b)", R`$g_{24}\,g_{46}=g_{26}$`, R`$g_{24}=x,\ g_{46}=1$`, R`$g_{26}=x$`],
            ["(c)", R`$g_{12}\,g_{26}=g_{16}$`, R`$g_{12}=1,\ g_{26}=x$`, R`$g_{16}=x$`],
            ["(d)", R`$g_{13}\,g_{36}=g_{16}$`, R`$g_{13}=1,\ g_{16}=x$`, R`$g_{36}=x$`],
            ["(e)", R`$g_{35}\,g_{56}=g_{36}$`, R`$g_{56}=1,\ g_{36}=x$`, R`$g_{35}=x$`],
            ["(f)", R`$g_{23}\,g_{35}=g_{25}$`, R`$g_{23}=x,\ g_{35}=x,\ g_{25}=1$`, R`$x^2=1$`],
          ]} />
          <Tx>{R`于是`}</Tx>
          <Eq n="4.32" keyEq title={R`$\pi_1(\sym{RP}{\RP^2})\cong\mathbb{Z}_2$`} say="射影平面上有一个绕一次不能缩、绕两次就能缩成一点的圈：基本群是二阶循环群。">{R`\pi_1(\sym{RP}{\RP^2})\cong(x;x^2)\cong\mathbb{Z}_2.`}</Eq>
        </Box>
        <Erratum kind="erratum" loc="p.162，例 4.10" title={R`勘误："seven generators" 应为"六个生成元"`}>{R`\figref{4.15} 的复形有 $I_0=6$ 个顶点、$I_1=15$ 条棱、$I_2=10$ 个三角形。阴影区 $L$ 由三角形 $\langle v_1v_3v_4\rangle,\langle v_1v_4v_5\rangle,\langle v_4v_5v_6\rangle,\langle v_1v_2v_5\rangle$ 组成，含 9 条棱：$13,14,34,15,45,46,56,12,25$。所以 $K-L$ 只有 $15-9=6$ 条棱：$g_{16},g_{23},g_{24},g_{26},g_{35},g_{36}$，正是原书关系 (a)–(f) 中出现的那些（原书在 (c)、(f) 中也确实用了 $g_{12}=g_{25}=1$）。关系数 $10-4=6$ 无误。上面框中的计数检验也给出：生成元数 − 关系数 $=1-\chi(\sym{RP}{\RP^2})=0$。交互图 3 对同一剖分自动得到 6 个生成元、6 个关系。`}</Erratum>
        <Tx>{R`循环群的出现可以直观地这样理解。\figref{4.16}(a) 是 $\sym{RP}{\RP^2}$ 的示意图（圆盘，边界上的对径点粘合）。取圈 $\alpha$ 与 $\beta$。容易看出 $\alpha$ 可以连续地变形为一点，因而是 $\pi_1(\sym{RP}{\RP^2})$ 的平凡元。由于 $\sym{RP}{\RP^2}$ 中直径两端的点被等同，$\beta$ 实际上是一条闭合的圈；它不能缩成一点，是 $\pi_1(\sym{RP}{\RP^2})$ 的非平凡元。

乘积呢？$\beta*\beta$ 是从 $P$ 到 $Q\sim P$ 走两遍的圈。从 \figref{4.16}(b) 可以读出 $\beta*\beta$ 能连续地缩成一点，因而属于平凡类：把第二段的端点沿边界转动，两段在对径点处的"接头"一起转动半圈后重合，整个圈就收进了一点。这说明对应于 $\beta$ 的同伦类的生成元 $x$ 满足 $x^2=1$，验证了上面的结果。`}</Tx>
        <Figure n="4.16" caption={R`(a) $\alpha$ 是平凡圈，而圈 $\beta$ 不能缩成一点。(b) $\beta*\beta$ 可以连续地缩成一点。`} width="90%" />
        <Tx>{R`同样的图可以用来说明`}</Tx>
        <Eq n="4.33" say={R`三维实射影空间也有一个绕两次才能缩掉的圈；因为它就是三维转动群，这就是“转 360° 不能复原、转 720° 可以复原”的拓扑原因。`}>{R`\pi_1(\sym{RP}{\RP^3})\cong\mathbb{Z}_2`}</Eq>
        <Tx>{R`其中 $\sym{RP}{\RP^3}$ 是 $S^3$ 把直径两端的点粘合：$\sym{RP}{\RP^3}=S^3/(x\sim-x)$。取 $S^3$ 的半球作代表，$\sym{RP}{\RP^3}$ 可以表示为实心球 $D^3$，球面上的对径点粘合。把 \figref{4.16} 中的圆盘 $D^2$ 理解为实心球 $D^3$，同样的图就验证了 \eqref{4.33}。`}</Tx>
        <Box kind="physics" title={R`$\pi_1(\mathrm{SO}(3))\cong\mathbb{Z}_2$：Dirac 的皮带`}>{R`例 4.12 将说明 $\sym{RP}{\RP^3}\cong\mathrm{SO}(3)$。于是 \eqref{4.33} 是说：在转动群中，绕一根轴转 $2\pi$ 的一族转动是一个**不能**收缩的圈，而转 $4\pi$ 的圈可以收缩。这就是"Dirac 皮带戏法"——把皮带一端固定、另一端转 $360°$ 后皮带打了一个解不开的结，转 $720°$ 却能不转动端点就把结解开。它也是自旋 $\frac12$ 粒子转 $2\pi$ 后波函数变号的拓扑背景：$\mathrm{SU}(2)$ 是 $\mathrm{SO}(3)$ 的二重万有覆叠（§4.6.5）。`}</Box>
        <Exercise n="4.5" title="Möbius 带的基本群：按规则计算" level="★★"
          hint={R`用第 3 章 \figref{3.8} 的剖分（6 个顶点 $p_0,\ldots,p_5$，12 条棱，6 个三角形）。极大树有 5 条棱，于是有 7 个生成元、6 个关系。从最短的关系开始逐个消去。`}
          solution={R`**剖分。**三角形（顶点按升序）：$\langle p_0p_1p_2\rangle,\langle p_1p_2p_4\rangle,\langle p_2p_3p_4\rangle,\langle p_3p_4p_5\rangle,\langle p_1p_3p_5\rangle,\langle p_0p_1p_5\rangle$。棱共 12 条：$01,02,12,14,24,23,34,35,45,13,15,05$。

**极大树。**取 $L=\{\langle p_0p_1\rangle,\langle p_0p_2\rangle,\langle p_0p_5\rangle,\langle p_1p_3\rangle,\langle p_1p_4\rangle\}$ 及全部顶点。它含 6 个顶点、5 条棱、无回路，是极大树（\sref{L4.3}）。

**生成元**（$K-L$ 中 $i<j$ 的棱，共 7 个）：$g_{12},g_{15},g_{23},g_{24},g_{34},g_{35},g_{45}$。

**关系**（每个三角形 $g_{ij}g_{jk}=g_{ik}$，$L$ 中的棱记 1）：
$$\begin{aligned}&\langle 012\rangle:\ g_{01}g_{12}=g_{02}\Rightarrow g_{12}=1;\qquad \langle 015\rangle:\ g_{01}g_{15}=g_{05}\Rightarrow g_{15}=1;\\ &\langle 124\rangle:\ g_{12}g_{24}=g_{14}\Rightarrow g_{24}=1;\qquad \langle 135\rangle:\ g_{13}g_{35}=g_{15}\Rightarrow g_{35}=1;\\ &\langle 234\rangle:\ g_{23}g_{34}=g_{24}\Rightarrow g_{23}=g_{34}^{-1};\qquad \langle 345\rangle:\ g_{34}g_{45}=g_{35}\Rightarrow g_{34}=g_{45}^{-1}.\end{aligned}$$
所有生成元都可用 $z\equiv g_{45}$ 表示（$g_{34}=z^{-1}$，$g_{23}=z$，其余为 1），且没有剩余关系。所以
$$\pi_1(\text{Möbius strip})\cong(z;\emptyset)\cong\mathbb{Z}.$$
生成元 $g_{45}$ 对应棱圈 $p_0\to p_1\to p_4\to p_5\to p_0$——正是第 3 章例 3.10 中的中线 $z$。交互图 3 选"Möbius 带"会自动得到相同的结果（它用宽度优先搜索取的极大树与这里相同）。`}>
          <Tx>{R`Möbius 带的一个三角剖分由第 3 章 \figref{3.8} 给出。求出极大树，并证明`}</Tx>
          <Eq n="4.34" say="Möbius 带与圆周同伦型相同，基本群是整数：沿中线绕的圈数。">{R`\pi_1(\text{Möbius strip})\cong\mathbb{Z}.`}</Eq>
          <Tx>{R`（注：Möbius 带当然与 $S^1$ 同伦型相同，所以 \eqref{4.34} 是平凡的。这里要求读者按常规程序得到它。）`}</Tx>
        </Exercise>
      </Sub>

      <Sub n="4.4.3" title={R`Relations between $H_1(K)$ and $\pi_1(|K|)$`} zh={R`$H_1(K)$ 与 $\pi_1(|K|)$ 的关系`}>
        <p className="muted">本小节概念：<C id="hurewicz" /></p>
        <Tx>{R`读者也许已经注意到第一同调群 $H_1(K)$ 与基本群 $\pi_1(|K|)$ 之间有某种相似。例如许多空间（圆周、圆盘、$n$ 维球面、环面等等）的基本群与相应的第一同调群相同。但在某些情形下它们不同，例如 $H_1(\text{2-bouquet})\cong\mathbb{Z}\oplus\mathbb{Z}$，而 $\pi_1(\text{2-bouquet})=(x,y;\emptyset)$。注意 $H_1(\text{2-bouquet})$ 是自由 **Abel** 群，$\pi_1(\text{2-bouquet})$ 是自由群。下面的定理把 $\pi_1(|K|)$ 与 $H_1(K)$ 联系起来。`}</Tx>
        <Stmt id="T4.9" />
        <Tx>{R`设群 $G$ 的表示为 $(x_i;r_m)$。$G$ 的**换位子群**（commutator subgroup）$F$ 是由形如 $x_ix_jx_i^{-1}x_j^{-1}$ 的元素生成的（正规）子群。于是 $G/F$ 是由 $\{x_i\}$ 生成、满足关系 $\{r_m\}$ 与 $\{x_ix_jx_i^{-1}x_j^{-1}\}$ 的群。定理是说：若 $\pi_1(|K|)=(x_i;r_m)$，则 $H_1(K)\cong(x_i;r_m,x_ix_jx_i^{-1}x_j^{-1})$。例如由 $\pi_1(\text{2-bouquet})=(x,y;\emptyset)$ 得

$$\pi_1(\text{2-bouquet})/F\cong(x,y;xyx^{-1}y^{-1})\cong\mathbb{Z}\oplus\mathbb{Z},$$

它同构于 $H_1(\text{2-bouquet})$。\sref{T4.9} 的证明见 Greenberg and Harper (1981)，Croom (1978) 中也有概要。`}</Tx>
        <Box kind="note" title="换位子群的精确定义">{R`严格地说，$F=[G,G]$ 是由**所有**换位子 $aba^{-1}b^{-1}$（$a,b\in G$）生成的子群，它自动是正规子群，而且 $G/F$ 是 $G$ 的"最大交换商群"。只取生成元的换位子 $x_ix_jx_i^{-1}x_j^{-1}$ 生成的子群一般更小、也未必正规；但它的**正规闭包**就是 $[G,G]$，所以在群表示中只需添加 $x_ix_jx_i^{-1}x_j^{-1}$ 这些关系（关系总是生成正规子群）——原书的说法在这个意义下是对的。

**加法记号下的算法：**交换化之后，每个关系子只剩下各生成元的**指数和**，于是 $G/F\cong\mathbb{Z}^p/(\text{关系矩阵的行生成的子群})$，用第 3 章的 Smith 标准形即可读出 $\mathbb{Z}^f\oplus\mathbb{Z}_{k_1}\oplus\cdots$。交互图 3 正是这样把本章的 $\pi_1$ 与第 3 章的 $H_1$ 逐一对照的。`}</Box>
        <Box kind="example" n="4.11" title="Klein 瓶的交换化">
          <Tx>{R`由 $\pi_1(\text{Klein bottle})\cong(x,y;xyxy^{-1})$ 得

$$\pi_1(\text{Klein bottle})/F\cong(x,y;xyxy^{-1},xyx^{-1}y^{-1}).$$

两个关系可以换成 $x^2=1$ 与 $xyx^{-1}y^{-1}=1$（在 $xy=yx$ 之下，$xyxy^{-1}=x^2yy^{-1}=x^2$），得到

$$\pi_1(\text{Klein bottle})/F\cong(x,y;xyx^{-1}y^{-1},x^2)\cong\mathbb{Z}\oplus\mathbb{Z}_2\cong H_1(\text{Klein bottle}),$$

其中因子 $\mathbb{Z}$ 由 $y$ 生成，$\mathbb{Z}_2$ 由 $x$ 生成。这与第 3 章 \eqref{3.51} 一致。用关系矩阵说：指数和矩阵为 $(2\ \ 0)$（$xyxy^{-1}$ 中 $x$ 出现 2 次、$y$ 净出现 0 次），Smith 标准形 $\mathrm{diag}(2)$，于是 $\mathbb{Z}^2/\langle(2,0)\rangle\cong\mathbb{Z}_2\oplus\mathbb{Z}$。`}</Tx>
        </Box>
        <Stmt id="C4.2" />
        <Stmt id="C4.3" />
        <EdgeGroupLab />
      </Sub>
    </Sec>);
}
