// §3.2 单形与单纯复形 —— 式 (3.11)–(3.12)，例 3.4–3.5，图 3.2–3.5
import { Sec, Sub, Tx, Eq, Box, Figure, Derivation, Erratum, C } from "@kit";

const R = String.raw;

export function Sec32() {
  return (
    <Sec n="3.2" title="Simplexes and simplicial complexes" zh="单形与单纯复形"
      gist={R`用**单形**（点、线段、三角形、四面体……）作标准积木；满足"面也在内、两两之交为公共面"的单形集合叫**单纯复形** $K$；与 $X$ 同胚的多面体 $|K|$ 给出 $X$ 的**三角剖分**。`}
      why={R`"数顶点、棱、面"这一手续要推广到任意维数并配上群结构，就必须先把"多面体"标准化：每一块都是单形，而且拼接方式受到严格限制。`}
      gives={["3.11", "3.12"]}>
      <p className="muted">本节概念：<C id="simplex" /></p>
      <Tx>{R`回忆第 2 章怎样算曲面的 Euler 示性数：先做一个与曲面同胚的多面体，再数顶点、棱、面，代入第 2 章 \eqref{2.31}。现在把这个手续抽象化，让图形的每一部分都由某种**标准**对象表示。我们选三角形及其在其他维数中的类比——**单形**（simplex）——作为标准对象。正是这种标准化，使我们能给每个图形配上 Abel 群结构。`}</Tx>

      <Sub n="3.2.1" title="Simplexes" zh="单形">
        <Tx>{R`单形是多面体的积木。0 单形 $\langle p_0\rangle$ 是一个点（顶点），1 单形 $\langle p_0p_1\rangle$ 是一条线段（棱），2 单形 $\langle p_0p_1p_2\rangle$ 是**连同内部**的三角形，3 单形 $\langle p_0p_1p_2p_3\rangle$ 是实心四面体（\figref{3.2}）。0 单形常省去括号，$\langle p_0\rangle$ 也写作 $p_0$。照此可以继续构造任意的 $r$ 单形 $\langle p_0p_1\ldots p_r\rangle$。`}</Tx>
        <Figure n="3.2" caption={R`0 单形、1 单形、2 单形与 3 单形。`} width="80%" />
        <Tx>{R`要让 $r$ 单形真的是 $r$ 维的，顶点必须**几何独立**（geometrically independent）：没有任何 $(r-1)$ 维超平面能同时包含这 $r+1$ 个点（三点不共线、四点不共面……）。设 $p_0,\ldots,p_r$ 是 $\mathbb{R}^m$（$m\ge r$）中几何独立的点，$r$ 单形 $\sigma_r=\langle p_0,\ldots,p_r\rangle$ 就是它们的凸包：`}</Tx>
        <Eq n="3.11" keyEq title="r 单形" say={R`$r$ 单形就是 $r+1$ 个顶点的所有“加权平均”：权重非负、总和为 1。权重就是点的重心坐标。`}>{R`\sigma_r=\left\{x\in\mathbb{R}^m\ \middle|\ x=\sum_{i=0}^{r}c_ip_i,\ c_i\ge0,\ \sum_{i=0}^{r}c_i=1\right\}.`}</Eq>
        <Tx>{R`$(c_0,\ldots,c_r)$ 称为 $x$ 的**重心坐标**（barycentric coordinate）。想象在各顶点放上质量 $c_i$，$x$ 就是质心。由于 $\sigma_r$ 是 $\mathbb{R}^m$ 中的有界闭集，它是**紧致**的。`}</Tx>
        <Erratum kind="note" loc="p.118 式 (3.11)" title="上标与下标">{R`原书式 \eqref{3.11} 左边印作 $\sigma^r$（上标），而正文前后一律写 $\sigma_r$（下标）。两者指同一个 $r$ 单形，本站统一写作 $\sigma_r$。`}</Erratum>
        <Tx>{R`**面。**设 $0\le q\le r$。从 $p_0,\ldots,p_r$ 中挑出 $q+1$ 个点 $p_{i_0},\ldots,p_{i_q}$，它们张成一个 $q$ 单形 $\sigma_q=\langle p_{i_0},\ldots,p_{i_q}\rangle$，称为 $\sigma_r$ 的 **$q$ 面**（$q$-face），记作 $\sigma_q\le\sigma_r$。若 $\sigma_q\neq\sigma_r$，称为**真面**（proper face），记作 $\sigma_q<\sigma_r$。\figref{3.3} 画出了 3 单形 $\langle p_0p_1p_2p_3\rangle$ 的一个 0 面 $p_0$ 和一个 2 面 $\langle p_1p_2p_3\rangle$。3 单形共有一个 3 面、四个 2 面、六个 1 面、四个 0 面。0 单形规定没有真面。`}</Tx>
        <Figure n="3.3" caption={R`3 单形 $\langle p_0p_1p_2p_3\rangle$ 的一个 0 面 $p_0$ 与一个 2 面 $\langle p_1p_2p_3\rangle$。`} width="45%" />
        <Derivation title={R`$r$ 单形的 $q$ 面个数为 $\binom{r+1}{q+1}$（原书留给读者验证）`} collapsed steps={[
          { tex: R`\sigma_q\le\sigma_r\ \longleftrightarrow\ \{p_{i_0},\ldots,p_{i_q}\}\subset\{p_0,\ldots,p_r\}`, why: R`一个 $q$ 面由它的 $q+1$ 个顶点唯一确定（几何独立保证不同的顶点集给出不同的面）。` },
          { tex: R`\#\{q\text{ 面}\}=\binom{r+1}{q+1}`, why: R`从 $r+1$ 个顶点中选 $q+1$ 个。` },
          { tex: R`r=3:\ \binom41,\binom42,\binom43,\binom44=4,6,4,1`, why: "与四面体的计数一致；总数 $2^{r+1}-1=15$，正是式 (3.12) 中列出的 15 个单形。" },
        ]} />
      </Sub>

      <Sub n="3.2.2" title="Simplicial complexes and polyhedra" zh="单纯复形与多面体">
        <Tx>{R`设 $K$ 是 $\mathbb{R}^m$ 中**有限个**单形的集合。若这些单形"拼得好"，就称 $K$ 为**单纯复形**（simplicial complex）。"拼得好"指：

(i) $K$ 中单形的任何面也属于 $K$：若 $\sigma\in K$ 且 $\sigma'\le\sigma$，则 $\sigma'\in K$；

(ii) $K$ 中任意两个单形 $\sigma,\sigma'$ 的交要么是空集，要么是两者的公共面：$\sigma\cap\sigma'=\emptyset$，或者 $\sigma\cap\sigma'\le\sigma$ 且 $\sigma\cap\sigma'\le\sigma'$。

例如 \figref{3.4}(a) 是单纯复形，(b) 不是：(b) 中竖直的棱从上方三角形底边的**中间**伸出，二者之交不是任何一方的面；右下的线段与三角形的棱在棱的内部相交，也违反 (ii)。单纯复形 $K$ 的**维数**定义为其中单形的最大维数。`}</Tx>
        <Figure n="3.4" caption={R`(a) 是单纯复形，(b) 不是。`} width="60%" />
        <Box kind="example" n="3.4" title="一个单形的所有面构成单纯复形">
          <Tx>{R`设 $\sigma_r$ 是 $r$ 单形，$K=\{\sigma'\mid\sigma'\le\sigma_r\}$ 是它所有面的集合。$K$ 是 $r$ 维单纯复形（条件 (i) 显然；两个面之交是它们公共顶点张成的面，故 (ii) 成立）。例如取 $\sigma_3=\langle p_0p_1p_2p_3\rangle$（\figref{3.3}），则`}</Tx>
          <Eq n="3.12" say="实心四面体作为单纯复形：4 个顶点、6 条棱、4 个三角形和它自身，共 15 个单形。">{R`\begin{aligned}K=\{&p_0,\ p_1,\ p_2,\ p_3,\ \langle p_0p_1\rangle,\ \langle p_0p_2\rangle,\ \langle p_0p_3\rangle,\\ &\langle p_1p_2\rangle,\ \langle p_1p_3\rangle,\ \langle p_2p_3\rangle,\ \langle p_0p_1p_2\rangle,\ \langle p_0p_1p_3\rangle,\\ &\langle p_0p_2p_3\rangle,\ \langle p_1p_2p_3\rangle,\ \langle p_0p_1p_2p_3\rangle\}.\end{aligned}`}</Eq>
        </Box>
        <Tx>{R`**多面体与三角剖分。**单纯复形 $K$ 是一个**集合**，它的元素是单形。若把每个单形看成 $\mathbb{R}^m$（$m\ge\dim K$）的子集，所有单形的并就是 $\mathbb{R}^m$ 的一个子集，称为 $K$ 的**多面体**（polyhedron）$|K|$。作为 $\mathbb{R}^m$ 的子集，$|K|$ 的维数与 $K$ 相同：$\dim|K|=\dim K$。

设 $X$ 是拓扑空间。若存在单纯复形 $K$ 与同胚 $f:|K|\to X$，称 $X$ **可三角剖分**（triangulable），$(K,f)$ 称为 $X$ 的一个**三角剖分**（triangulation）。同一个空间的三角剖分远非唯一。本章只讨论可三角剖分的空间。`}</Tx>
        <Box kind="example" n="3.5" title="圆柱面：什么样的剖分才合格">
          <Tx>{R`\figref{3.5}(a) 是圆柱面 $S^1\times[0,1]$ 的一个三角剖分：长条的左右两边按箭头粘合，三个小正方形各沿对角线切成两个三角形，共 6 个顶点、12 条棱、6 个三角形。

读者也许觉得 \figref{3.5}(b) 更简单。但它**不是**三角剖分：对 $\sigma_2=\langle p_0p_1p_2\rangle$ 与 $\sigma_2'=\langle p_2p_3p_0\rangle$，粘合后 $\sigma_2\cap\sigma_2'=\langle p_0\rangle\cup\langle p_2\rangle$——两个分离的点，既不是空集也不是一个单形，违反条件 (ii)。

**教训**：粘合图（左右边、上下边等同）里，每个正方形必须切得足够细，才能保证没有两个单形"从两处相碰"。后面的 Möbius 带（\figref{3.8}）、射影平面（\figref{3.9}）、Klein 瓶（\figref{3.12}）都遵守这一点。`}</Tx>
        </Box>
        <Figure n="3.5" caption={R`(a) 是圆柱面的三角剖分，(b) 不是。`} width="85%" />
      </Sub>
    </Sec>);
}
