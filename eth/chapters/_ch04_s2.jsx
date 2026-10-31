// §4.2 Balanced labels by words —— 引理 4.1、式 (4.5)，原文 pp.8–9
import { Sec, Tx, Eq, Box, Stmt, Proof, Erratum } from "@kit";
import { BudgetDemo } from "./_ch04_run.jsx";

const R = String.raw;

export function Sub42() {
  return (
    <Sec n="4.2" title="Balanced labels by words" zh="用词做平衡标号"
      gist={R`贪心地给行列分配 $[q]^\ell$ 中的词，满足平衡、有序对互异、逐坐标不同（\sref{L4.1}）；于是每个坐标类至多 $3n/q$ 个。`}
      why={R`一个容易点不够；词的 $\ell$ 个坐标将给出 $\ell$ 个容易点，而块大小由逐坐标平衡控制。`}
      gives={["4.5"]}>
      <Tx>{R`**从颜色到词。**现在改用一个**更小**的字母表 $[q]$，给每一行、每一列分配一个长为 $\ell$ 的**词**（word）作为标号：`}</Tx>
      <Eq say={R`行标号 $\alpha(u)$ 与列标号 $\beta(v)$ 都是字母表 $[q]$ 上长为 $\ell$ 的词；词的总数是 $Q=q^\ell$。`}>{R`\alpha(u),\ \beta(v)\in[q]^\ell,\qquad Q=q^\ell.`}</Eq>
      <Tx>{R`直觉上，$Q$ 扮演 §4.1 中颜色数的角色（$Q\approx\sqrt n$ 量级），而 $q$ 是每个**坐标**上的字母表大小（§6 中取 $q=\lceil(\log n)^{10}\rceil$，远小于 $\sqrt n$）。我们要求三条性质：

**(i) 平衡**：每个词至多标记 $D=\lceil2n/Q\rceil$ 行，也至多标记 $D$ 列。

**(ii) 有序对互异**：不同的非零元有不同的有序标号对 $(\alpha(u),\beta(v))$。

**(iii) 逐坐标不同**：若 $A_{uv}\ne0$，则对每个 $i\in[\ell]$ 都有 $\alpha(u)_i\ne\beta(v)_i$。

于是 $A$ 被切成 $Q\times Q$ 个"词块"，每块至多一个非零元（由 (ii)）；而且只要一个块的两个词在**哪怕一个坐标**上相同，这个块就是零（由 (iii)）。(iii) 是 §4.1 中"两端异色"的加强版：它保证非零元的标号对 $(\alpha(u),\beta(v))$ 落在下一小节的中间坐标集合 $\Omega$ 里。`}</Tx>

      <Stmt id="L4.1">
        <Eq say={R`引理 4.1 的参数条件：词的总数 $Q$ 介于 $4\Delta\sqrt n$ 与 $n$ 之间；每个坐标的字母表至少 $4\Delta\ell$。`}>{R`4\Delta\sqrt n\le Q=q^\ell\le n,\qquad q\ge4\Delta\ell.`}</Eq>
        <Tx>{R`**证明的思路**：两轮贪心——先给所有行定标号，再给列定标号，每次都取"第一个可用的词"。要证明的只有一件事：每一步被排除的词总数 $<Q$。被排除的原因有三类，各占一份预算：满了的词 $<Q/2$，会造成重复有序对的词 $\le Q/4$，会与邻居在某坐标撞车的词 $\le Q/4$。`}</Tx>
        <Proof source="原文 p.8；计数细节本站补全" steps={[
          { claim: R`**满的词少于 $Q/2$ 个。**一个词在某一侧用满 $D$ 次后就不可再用。在给最后一个顶点标号之前，这一侧总共只标了 $\le n-1$ 次，所以满的词个数 $\le(n-1)/D<n/D$。`, tex: R`\#\{\text{满的词}\}<\frac nD\le\frac{n}{2n/Q}=\frac Q2`, why: R`$D=\lceil2n/Q\rceil\ge2n/Q$。`, fill: true },
          { claim: R`**先标行。**要求任意两行若共享一个非零列，则标号不同。行 $u$ 至多有 $\Delta$ 个非零列，每列至多还有 $\Delta-1$ 个其他行，所以 $u$ 至多与 $\Delta(\Delta-1)$ 个较早的行冲突，每个冲突排除一个词。`, tex: R`\#\{\text{排除}\}<\frac Q2+\Delta(\Delta-1)\le Q`, why: R`$Q\ge4\Delta\sqrt n$，$n$ 充分大时 $\Delta(\Delta-1)\le Q/2$（例如 $n\ge4\Delta^2$ 时 $Q\ge8\Delta^2$）。所以总有可用的词。`, fill: true },
          { claim: R`**再标列：重复有序对。**列 $v$ 至多与 $\Delta$ 个行相邻，这些行的标号两两不同（上一步的要求）。对每个相邻行标号 $\alpha(u)$，至多 $D$ 个行带这个标号，每行至多 $\Delta$ 个非零元，所以已和 $\alpha(u)$ 配过对的列标号至多 $\Delta D$ 个。为避免重复有序对，至多排除`, tex: R`\Delta\cdot\Delta D=\Delta^2D\ \text{个词}.`, why: R`有序对 $(\alpha(u),\beta(v))$ 若已被别的非零元用过，就不能再选这个 $\beta(v)$。`, fill: true },
          { claim: R`**$\Delta^2D\le Q/4$。**这是原文"our bounds imply"的一步，逐项展开：`, tex: R`\Delta^2D\le\Delta^2\Big(\frac{2n}{Q}+1\Big)=\frac{2n\Delta^2}{Q}+\Delta^2\le\frac Q8+\frac Q8=\frac Q4`, why: R`由 $Q\ge4\Delta\sqrt n$ 得 $Q^2\ge16\Delta^2n$，即 $2n\Delta^2/Q\le Q/8$；又 $n\ge4\Delta^2$ 时 $Q\ge4\Delta\sqrt n\ge8\Delta^2$，即 $\Delta^2\le Q/8$。`, fill: true },
          { claim: R`**再标列：坐标碰撞。**在第 $i$ 个坐标上与固定词 $w$ 相同的词有 $Q/q$ 个，对 $i\in[\ell]$ 取并至多 $\ell Q/q$ 个；对 $\Delta$ 个相邻行标号再取并：`, tex: R`\Delta\cdot\ell\frac Qq=\frac{\Delta\ell Q}{q}\le\frac Q4`, why: R`$q\ge4\Delta\ell$。`, fill: true },
          { claim: R`**合计 $<Q$**，所以总有可用词；取第一个。`, tex: R`\underbrace{<\tfrac Q2}_{\text{满}}+\underbrace{\le\tfrac Q4}_{\text{重复有序对}}+\underbrace{\le\tfrac Q4}_{\text{坐标碰撞}}<Q`, why: R`三类可能重叠，相加只会高估。` },
          { claim: R`**三条性质成立。**(i) 由"不选满的词"。(iii) 由"坐标碰撞"的排除。(ii) 分三种情形：两个非零元**同列不同行**——行标号已两两不同；**同行不同列**——标第二列时有序对 $(\alpha(u),\beta(v_1))$ 已被用过，排除了 $\beta(v_2)=\beta(v_1)$；**行列都不同**——标后一列时同样被"重复有序对"排除。`, fill: true },
          { claim: R`**多项式时间、确定性。**每个顶点扫描 $Q\le n$ 个词，对每个词检查 $O(\Delta\ell)$ 个条件。`, why: R`没有随机性：顺序与"第一个可用词"都是确定的。`, fill: true },
        ]} />
        <Erratum kind="note" loc="p.8 引理 4.1" title="两个隐含的细节">{R`(1) 条件 $Q\le n$ 在本引理的证明中**没有用到**；它用在紧接着的 \eqref{4.5} 的最后一步 $(2n+Q)/q\le3n/q$。

(2) "$n$ 充分大"可以写得很具体：$n\ge4\Delta^2$ 就够了。它保证 $\Delta^2\le Q/8$（用于 $\Delta^2D\le Q/4$）以及标行时 $\Delta(\Delta-1)\le Q/2$。`}</Erratum>
      </Stmt>

      <BudgetDemo />

      <Tx>{R`**坐标类与平衡。**最终的容易块不是按整个词分组，而是按词的**某一个坐标**分组。对每个位置 $i$ 和符号 $a$，令`}</Tx>
      <Eq say={R`$I_{i,a}$：第 $i$ 个符号为 $a$ 的行；$J_{i,a}$：第 $i$ 个符号为 $a$ 的列。固定 $i$，它们分别把行与列分成 $q$ 组。`}>{R`I_{i,a}=\{u:\alpha(u)_i=a\},\qquad J_{i,a}=\{v:\beta(v)_i=a\}.`}</Eq>
      <Stmt id="F:balance">
        <Tx>{R`第 $i$ 位固定为 $a$ 的词恰有 $Q/q$ 个，每个词至多标记 $D$ 行（列），所以`}</Tx>
        <Eq n="4.5" keyEq title="逐坐标平衡" say={R`任何一个坐标类（第 $i$ 个符号相同的行或列）至多 $3n/q$ 个：$Q/q$ 个词、每个至多用 $\lceil2n/Q\rceil$ 次，再用 $Q\le n$ 化简。这就是特殊点上块的大小。`}>{R`|I_{i,a}|,\ |J_{i,a}|\le\frac Qq\left\lceil\frac{2n}{Q}\right\rceil\le\frac{2n+Q}{q}\le\frac{3n}{q}.`}</Eq>
        <Proof title="逐个不等号" steps={[
          { claim: R`$|I_{i,a}|=\sum_{w:\,w_i=a}\#\{u:\alpha(u)=w\}\le\frac Qq\cdot D$。`, why: R`满足 $w_i=a$ 的词有 $q^{\ell-1}=Q/q$ 个；性质 (i)。`, uses: ["L4.1"], fill: true },
          { claim: R`$\frac Qq\lceil\frac{2n}Q\rceil\le\frac Qq\big(\frac{2n}Q+1\big)=\frac{2n+Q}q$。`, why: R`$\lceil x\rceil<x+1$。`, fill: true },
          { claim: R`$\frac{2n+Q}q\le\frac{3n}q$。`, why: R`\sref{L4.1} 的假设 $Q\le n$。`, fill: true },
        ]} />
      </Stmt>
      <Tx>{R`原文强调：控制容易块的是这种**逐坐标的平衡**，而不是单个词类的大小（单个词类只有 $\le D\approx2n/Q$ 个元素，但一个坐标类包含 $Q/q$ 个词）。取 §6 的参数，$3n/q=O(n/\log^{10}n)$——这就是\sref{P3.2} 中的块大小 $s$。`}</Tx>
    </Sec>);
}
