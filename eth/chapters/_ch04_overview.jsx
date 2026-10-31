// 第 4 节高层理解层：开场、路线图、推导图、核心概念、小结与自测、通向 §5 的桥。
// 框架已用 Rich 渲染 Hook / Bridge / Takeaways / Quiz / 概念卡 / Roadmap 标题：数学一律写 $…$。
const R = String.raw;

export const HOOK_TITLE = "一块与输入无关的“配线板”";
export const HOOK = R`想象一个老式电话交换台。左边是 $n$ 个打电话的人（矩阵的行），右边是 $n$ 个接电话的人（矩阵的列）。矩阵 $A$ 的每个非零元 $A_{uv}$ 是一条"通话"：$u$ 打给 $v$。

现在我们这样布线：每个人都有一个"颜色"（后来是一个"词"）。行 $u$ 把它的每一通电话插到交换台上一个写着 **(自己的颜色, 对方的颜色)** 的插孔里——这是左因子 $L$；列 $v$ 则在写着 **(自己的颜色, 对方的颜色)** 的插孔上接听——这是右因子 $R'$。注意两边写的顺序是**反的**：行写 $(a,b)$，列写 $(b,a)$。于是交换台中间必须有一块"配线板"，把插孔 $(a,b)$ 接到插孔 $(b,a)$，所有通话才接得通。这块配线板就是 $\cJ$，它只是把每对插孔交叉连接，**与输入矩阵毫无关系**。

把配线板换成"直通"（单位阵），会发生什么？插孔 $(a,b)$ 只接到 $(a,b)$——行 $u$ 只能和"第一个颜色也是 $a$"的列通话，也就是和**同色**的列通话。原本错综复杂的矩阵瞬间变成了按颜色排开的块对角矩阵，积和式可以一块一块地算。

这一节的全部技巧就在这里：**所有依赖输入的东西都装进 $L$ 与 $R'$，中间只留一块结构简单、与输入无关的配线板**。之后（§5）我们只需要对这块 $2^\ell\times2^\ell$ 的小板做多项式变形，让它在 $t=0$ 时是"交叉"、在 $t=i$ 时在第 $i$ 个坐标上"直通"——外面的大矩阵就会自动按第 $i$ 个符号分块。`;

// ---------- 路线图：每小节一张 ----------
export const ROADMAP = [
  { sec: "4.1", title: "一种颜色：第一次看到分块", gist: R`给行列着色，使非零元两端异色、不同非零元的有序颜色对不同；于是 $A=LR=LIR=L\cJ R'$。把 $\cJ$ 换成 $I$ 得到块对角的 $B=LIR'$。`, gives: ["4.1", "4.2", "4.3", "4.4"], next: R`一个容易的点不够：插值需要很多个容易的点。把颜色换成长为 $\ell$ 的"词"，每个坐标给出一个容易的点。` },
  { sec: "4.2", title: "用词做平衡标号", gist: R`贪心地给行列分配 $[q]^\ell$ 中的词，满足 (i) 平衡、(ii) 有序对互异、(iii) 非零元两端逐坐标不同（\sref{L4.1}）。逐坐标平衡给出组大小 $\le3n/q$。`, gives: ["4.5"], next: R`有了词标号，中间坐标就是"逐坐标不同的词对"——它们恰好组成许多份布尔立方体。` },
  { sec: "4.3", title: "中间坐标是布尔立方体的拷贝", gist: R`$\Omega\cong C\times\{0,1\}^\ell$：每个位置一个无序对 + 一个方向位。交换两个词 = 翻转全部方向位 = $X^{\otimes\ell}$。于是 $A=L(I_C\otimes X^{\otimes\ell})R'$。`, gives: ["4.6", "4.7"], next: R`中间矩阵在每个立方体上都是同一个 $2^\ell\times2^\ell$ 矩阵；什么样的中间矩阵会让外面分块？` },
  { sec: "4.4", title: R`$i$-好性：坐标恒等 ⇒ 分块`, gist: R`$K$ 在第 $i$ 个坐标上是恒等（$i$-好）⇒ $L(I_C\otimes K)R'$ 按第 $i$ 个符号分块（\sref{L4.3}）；再加一个秩 $\le\varepsilon2^\ell$ 的误差，外面只多出秩 $\le\varepsilon M$ 的修正 \eqref{4.9}。`, gives: ["4.8", "4.9"], next: R`剩下的纯代数问题交给 §5：构造低次的 $J(t)$，$J(0)=X^{\otimes\ell}$，$J(i)$ = $i$-好 + 低秩。` },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "4.1", to: "4.2", label: R`每个非零元一个中间坐标 $(a,b)$` },
  { from: "4.2", to: "4.3", label: R`插入 $I$；$R'=\cJ R$，$\cJ^2=I$` },
  { from: "4.3", to: "4.4", label: R`$\cJ$ 换成 $I$` },
  { from: "4.2", to: "4.7", label: "颜色换成词" },
  { from: "4.6", to: "4.7", label: R`$\cJ=I_C\otimes X^{\otimes\ell}$` },
  { from: "4.4", to: "4.8", label: R`只要求第 $i$ 个坐标恒等` },
  { from: "4.7", to: "4.9", label: R`中间换成 $K_i+E$` },
  { from: "4.8", to: "4.9", label: R`\sref{L4.3}` },
  { from: "4.5", to: "4.9", label: R`块大小 $\le3n/q$` },
];
export const EQMAP_LABELS = {
  "4.1": "按颜色排序的 A", "4.2": "L、R 的定义", "4.3": String.raw`$A=LR=LIR=L\cJ R'$`, "4.4": String.raw`$B=LIR'$ 块对角`,
  "4.5": "逐坐标平衡", "4.6": String.raw`$\Omega\cong C\times\{0,1\}^\ell$`, "4.7": "经立方体的分解", "4.8": String.raw`$i$-好矩阵`, "4.9": "低秩在分解中保持",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "label", label: "组合：标号" },
  { id: "factor", label: "代数：分解" },
  { id: "block", label: "结构：好性与分块" },
];

export const concepts = [
  {
    id: "coloring", name_zh: "颜色 / 词标号", name_en: "Coloring / word labels", icon: "🎨", section_id: "4.1", group: "label",
    plain: R`给每一行、每一列贴一个标签：§4.1 是一种颜色，§4.2 起是长为 $\ell$ 的词。`,
    explain: R`标签要满足三条：每个标签用得不太多（平衡）；同一个非零元两端的标签在每个坐标上都不同；不同非零元的“(行标签, 列标签)”有序对互不相同。

第三条让每个非零元在中间坐标里有唯一的“地址”；第二条保证这个地址真的存在于 $\Omega$ 中（$\Omega$ 只收逐坐标不同的词对）。只有非零元的位置影响标号，数值不影响。`,
    analogy: "像给一场相亲会的每个人发号码牌：同一对约会者的号码牌不能撞色，任意两对约会者的“(男方色, 女方色)”组合也不能重复——这样主持人只看一对颜色就能叫出唯一的那一对。",
    book_example: { what: R`§4.1 用 $q=\Theta(\sqrt n)$ 种颜色；§4.2 换成 $[q]^\ell$ 中的词，并由 \sref{L4.1} 的贪心算法确定性地找到。`, point: "从颜色到词，是为了让每个坐标都提供一个“容易点”。" },
    misconception: "标号不是图着色问题里的“相邻异色”那么简单：还要求有序颜色对全局互异，这是“每块至多一个非零元”的来源。",
  },
  {
    id: "balance", name_zh: "逐坐标平衡", name_en: "Coordinatewise balance", icon: "⚖️", section_id: "4.2", group: "label",
    plain: R`每个词至多用 $D=\lceil2n/Q\rceil$ 次，所以“第 $i$ 个符号是 $a$”的行至多 $3n/q$ 个。`,
    explain: R`最终的容易块是按“第 $i$ 个符号”分组的，不是按整个词分组。第 $i$ 位固定为 $a$ 的词有 $Q/q$ 个，每个至多用 $D$ 次，于是每组至多 $(Q/q)\lceil2n/Q\rceil\le(2n+Q)/q\le3n/q$ 个行（列同理）。

这正是 §6 中特殊点上块大小 $s\le3n/q$ 的来源；取 $q=(\log n)^{10}$，每块的积和式只需 $2^{O(n/\log^{10}n)}$ 时间。`,
    analogy: R`把学生按学号的第 $i$ 位分班：只要每个学号最多发给 $D$ 个人，任何一个班的人数都不会太多，无论按哪一位分。`,
    book_example: { what: R`式 \eqref{4.5}。最后一步用到 $Q\le n$。`, point: "控制块大小的是坐标类，而不是单个词类。" },
    misconception: R`以为块大小是 $D$（一个词的使用次数）。实际上一个块包含 $Q/q$ 个词的全部行，大小约 $2n/q$。`,
  },
  {
    id: "intermediate", name_zh: String.raw`中间坐标与 $A=LR$`, name_en: "Intermediate coordinates", icon: "🔌", section_id: "4.1", group: "factor",
    plain: R`给每个非零元开一个中间坐标：$L$ 在那里存数值，$R$ 在那里存“列指示”，相乘恰好还原 $A$。`,
    explain: R`$L[u,e]=A_{uv}$，$R[e,v]=1$：乘积 $(LR)_{uv}$ 只经过坐标 $e$，得到 $A_{uv}$。用有序标号对给坐标命名后，还要把“没用到的标号对”也作为全零的坐标补进来，使中间维数 $M$ 只依赖 $q$、$\ell$，而中间坐标集合有整齐的结构。`,
    analogy: "每通电话分配一个交换台插孔：打电话的人插进去，接电话的人从同一个插孔接出来。",
    book_example: { what: R`式 \eqref{4.2}；§4.1 中 $M=q(q-1)$，§4.3 中 $M=(q(q-1))^\ell$。`, point: "把输入“摊开”到一个与输入无关、结构整齐的中间空间。" },
    misconception: R`$M$ 不是非零元个数；它是所有可能标号对的个数（包括没用到的），这样中间空间才是一组完整的布尔立方体。`,
  },
  {
    id: "reversal", name_zh: String.raw`反转技巧：$R'=\cJ R$`, name_en: "The reversal trick", icon: "🔁", section_id: "4.1", group: "factor",
    plain: R`把 $R$ 的每对行互换得到 $R'$，中间再放一个“换回来”的 $\cJ$，乘积不变。`,
    explain: R`因为 $\cJ^2=I$，所以 $LR=L\cJ\cJ R=L\cJ R'$。表面上什么都没做，但现在 $L$ 与 $R'$ 在同一个中间坐标 $(a,b)$ 上读的是同一个“第一个颜色” $a$：$L$ 的 $(a,b)$ 列用 $a$ 色的行，$R'$ 的 $(a,b)$ 行用 $a$ 色的列。

于是一旦把中间的 $\cJ$ 换成 $I$，行只能与同色的列相连——分块就出现了。`,
    analogy: "把信封上的“寄件人/收件人”栏对调印刷，再让邮局把它们对调回来——邮件照常送达；但如果邮局不对调，每封信就会回到与寄件人同一个街区。",
    book_example: { what: R`式 \eqref{4.3} 与那张“中间坐标/行颜色/列颜色”的表。`, point: R`$L$ 与 $R'$ 使用标号的同一个分量，是全部分块现象的根源。` },
    misconception: R`$\cJ$ 不是为了改变 $A$，而是为了改变“$L$ 与 $R'$ 对标号的读法”。`,
  },
  {
    id: "cube", name_zh: "布尔立方体的拷贝", name_en: "Copies of a Boolean cube", icon: "🧊", section_id: "4.3", group: "factor",
    plain: R`逐坐标不同的词对 $(a,b)$ = 每个位置一个无序对 + 一个方向位：$\Omega\cong C\times\{0,1\}^\ell$。`,
    explain: R`固定 $\ell$ 个无序对 $\{a_1,b_1\},\dots,\{a_\ell,b_\ell\}$，剩下的自由度就是每个位置的方向（按递增顺序为 0，反过来为 1），恰好是一个 $\ell$ 维布尔立方体。所有这样的立方体共有 $|C|=\binom q2^\ell$ 个，故 $M=|C|\cdot2^\ell=(q(q-1))^\ell$。

交换两个词 $(a,b)\mapsto(b,a)$ 不改变无序对，只把每个方向位取反——这正是 $X^{\otimes\ell}$。`,
    analogy: R`每个位置是一枚硬币：硬币的“面值对”固定（哪两个符号），正反面决定谁在前。交换两个词 = 把 $\ell$ 枚硬币全部翻面。`,
    book_example: { what: R`式 \eqref{4.6}、$\cJ=I_C\otimes X^{\otimes\ell}$。`, point: R`输入相关的大矩阵被化归为同一个 $2^\ell\times2^\ell$ 小矩阵的 $|C|$ 份拷贝。` },
    misconception: "方向位不是词的某个比特；它是“该位置两个符号谁在前”的记录。",
  },
  {
    id: "middle", name_zh: "与输入无关的中间矩阵", name_en: "Input-independent middle", icon: "🧩", section_id: "4.3", group: "factor",
    plain: R`$A=L(I_C\otimes X^{\otimes\ell})R'$：所有输入信息在 $L$、$R'$ 里，中间每个立方体上放同一个小矩阵。`,
    explain: R`这把问题彻底分离：§5 只需研究 $2^\ell\times2^\ell$ 的矩阵多项式 $J(t)$，完全不看输入 $A$；然后令 $A(t)=L(I_C\otimes J(t))R'$，$A(t)$ 的次数就是 $J(t)$ 的次数，$A(0)=A$。`,
    analogy: R`像一台通用的变速箱：发动机（$L$）和车轮（$R'$）因车而异，但中间的齿轮组对所有车都一样——只要设计好齿轮组的换挡方式。`,
    book_example: { what: R`式 \eqref{4.7} 之后：“All input dependence lies in $L$, $R'$; the middle blocks are identical.”`, point: R`这是 §5 能“完全不看 $A$”的原因。` },
    misconception: R`中间矩阵并不需要对每个立方体分别设计；正因为所有立方体用同一个 $K$，误差的秩才能乘以 $|C|$ 整体控制。`,
  },
  {
    id: "nice", name_zh: String.raw`$i$-好矩阵`, name_en: "i-nice matrix", icon: "🎯", section_id: "4.4", group: "block",
    plain: R`在第 $i$ 个坐标上是恒等、在其余坐标上随便做什么（且与第 $i$ 位取值无关）：$K=I_2\otimes\sym{Bs}{B}$（第 $i$ 个因子）。`,
    explain: R`等价地 $K[x,y]=\one\{x_i=y_i\}\,\sym{Bs}{B}[x_{-i},y_{-i}]$。按第 $i$ 位分组，$K$ 是两个相同的对角块。$I$ 对所有 $i$ 都是 $i$-好的；$X^{\otimes\ell}$ 对任何 $i$ 都不是；只翻第 $j$ 位的 $X_j$ 对每个 $i\ne j$ 都是 $i$-好的——这提示了 §5 的构造：在 $t=i$ 时让 $X_i$ 的系数消失。`,
    analogy: R`一台多声道调音台：第 $i$ 个声道的推子固定在“直通”，其他声道怎么混都行，只要混法不看第 $i$ 声道当前的信号。`,
    book_example: { what: R`\sref{D4.2} 与式 \eqref{4.8}。$\ell=1$ 时 $i$-好矩阵只有 $I_2$ 的数量倍。`, point: "“坐标恒等”是 §5 能够低次逼近的那种结构。" },
    misconception: R`\sref{L4.3} 的证明其实只用到“保持第 $i$ 位”，两块相同是 §5 的构造自然给出的更强性质。`,
  },
  {
    id: "blocks", name_zh: "坐标恒等 ⇒ 分块", name_en: "Niceness gives blocks", icon: "🧱", section_id: "4.4", group: "block",
    plain: R`中间矩阵保持第 $i$ 个方向位 ⇒ 外层矩阵只在“行、列第 $i$ 个符号相同”处非零。`,
    explain: R`$(u,v)$ 处的贡献经过中间标号 $(\alpha(u),\beta(v'))$ 和 $(\beta(v),\alpha(u'))$。中间矩阵不出立方体，所以第 $i$ 个位置的无序对相同；保持方向位 $i$，所以有序对也相同；比较第一个分量就得到 $\alpha(u)_i=\beta(v)_i$。

于是行按 $I_{i,a}$、列按 $J_{i,a}$ 分组后，矩阵是块对角的（块可以不是方的）。`,
    analogy: R`如果配线板在第 $i$ 个插孔维度上是直通的，那么第 $i$ 个号码相同的人才可能接通。`,
    book_example: { what: R`\sref{L4.3}。`, point: R`$\ell$ 个坐标 → $\ell$ 个不同的分块方式 → $\ell$ 个容易的插值点。` },
    misconception: R`不同的 $i$ 给出不同的分组：$t=1$ 时按第 1 个符号分块，$t=2$ 时按第 2 个符号分块……它们不是同一个分块。`,
  },
  {
    id: "lowrank", name_zh: "低秩误差的继承", name_en: "Low rank survives", icon: "📉", section_id: "4.4", group: "block",
    plain: R`中间矩阵 = $i$-好 + 秩 $\le\varepsilon2^\ell$ 的误差 ⇒ 外层 = 块对角 + 秩 $\le\varepsilon M$ 的修正。`,
    explain: R`线性性把外层矩阵拆成两部分；误差部分 $L(I_C\otimes E)R'$ 的秩不超过 $\rank(I_C\otimes E)=|C|\rank(E)\le|C|\,\varepsilon2^\ell=\varepsilon M$。这个修正不是被丢掉，而是作为 \sref{L2.1} 的“低秩部分”被精确处理。`,
    analogy: R`每个立方体上都有一点“污渍”，污渍的总面积是每块的面积乘以块数；只要每块污渍占比 $\varepsilon$，总占比也是 $\varepsilon$。`,
    book_example: { what: R`式 \eqref{4.9}。§6 取 $\varepsilon=\ell^{-100}$，得 $r\le M/\ell^{100}$。`, point: R`正是低秩的余地，让 §5 能把次数从 $\ell$ 降到 $O(\sqrt{\ell\log\ell})$。` },
    misconception: R`$\varepsilon M$ 看起来很大（$M\approx Q^2$ 可能远大于 $n$），但 $M=(q(q-1))^\ell$，而 §6 的参数使 $M/\ell^{100}$ 相对 $n/\log n$ 可以忽略。`,
  },
];

export const relations = [
  { from: "coloring", to: "intermediate", label: "有序对 = 地址" },
  { from: "intermediate", to: "reversal", label: String.raw`插入 $\cJ\cJ=I$` },
  { from: "reversal", to: "blocks", label: String.raw`$\cJ\to I$ 即分块` },
  { from: "coloring", to: "balance", label: String.raw`每词 $\le D$ 次` },
  { from: "intermediate", to: "cube", label: "Ω 的结构" },
  { from: "cube", to: "middle", label: String.raw`$I_C\otimes X^{\otimes\ell}$` },
  { from: "middle", to: "nice", label: "只需设计小矩阵" },
  { from: "nice", to: "blocks", label: "引理 4.3" },
  { from: "balance", to: "blocks", label: String.raw`块 $\le3n/q$` },
  { from: "blocks", to: "lowrank", label: "加上误差" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**分离**：$A=LR=LIR=L\cJ R'$。输入只出现在 $L$（行的数值）与 $R'$（反向标号处的列指示）中；中间是与输入无关的 $\cJ=I_C\otimes X^{\otimes\ell}$。`,
  R`**反转制造分块**：$R'=\cJ R$ 使 $L$ 与 $R'$ 读取标号的同一个分量；把 $\cJ$ 换成 $I$，行只与同标号的列相连——\eqref{4.4}。`,
  R`**词标号**（\sref{L4.1}）：$4\Delta\sqrt n\le Q=q^\ell\le n$、$q\ge4\Delta\ell$ 时贪心可行；排除的词 $<Q/2+Q/4+Q/4=Q$。逐坐标平衡给出 $|I_{i,a}|,|J_{i,a}|\le3n/q$ \eqref{4.5}。`,
  R`**立方体**：$\Omega\cong C\times\{0,1\}^\ell$，交换两个词 = 翻转全部方向位 = $X^{\otimes\ell}$ \eqref{4.6}。`,
  R`**好性 ⇒ 分块**（\sref{L4.3}）：中间矩阵在第 $i$ 个坐标上恒等 ⇒ 外层按第 $i$ 个符号分块，块 $\le3n/q$；误差秩 $\le\varepsilon2^\ell$ ⇒ 外层修正秩 $\le\varepsilon M$ \eqref{4.9}。`,
];

export const QUIZ = [
  {
    q: R`在 $B=LIR'$ 中，为什么行 $u$ 与列 $v$ 颜色不同时 $B_{uv}=0$？`,
    options: [
      R`因为原矩阵 $A$ 的对角块为零`,
      R`因为 $L$ 的 $(a,b)$ 列只用 $a$ 色的行，$R'$ 的 $(a,b)$ 行也只用 $a$ 色的列——二者读同一个"第一个颜色"`,
      R`因为 $I$ 是对角阵，所以 $B$ 也是对角阵`,
      R`因为每个颜色块至多一个非零元`,
    ],
    answer: 1, why: R`$B_{uv}=\sum_{a\ne b}L[u,(a,b)]R'[(a,b),v]$，非零需要 $u$ 的颜色是 $a$、$v$ 的颜色也是 $a$。反转 $R'=\cJ R$ 正是为此而设。注意 $B$ 的块是"新的块"，不是 $A$ 的零对角块。`,
  },
  {
    q: R`\sref{L4.1} 的证明中，给一列选词时被排除的词有三类。下面哪一项**不是**其中之一？`,
    options: [
      R`已经用满 $D$ 次的词（$<Q/2$ 个）`,
      R`会与某个相邻行标号组成已用有序对的词（$\le\Delta^2D$ 个）`,
      R`与某个相邻行标号在某个坐标上相同的词（$\le\Delta\ell Q/q$ 个）`,
      R`与其他列的标号在某个坐标上相同的词`,
    ],
    answer: 3, why: R`列与列之间没有逐坐标的约束；约束 (iii) 只针对同一个非零元的两端。三类排除合计 $<Q/2+Q/4+Q/4=Q$。`,
  },
  {
    q: R`$|\Omega|=(q(q-1))^\ell$ 与 $|C|\cdot2^\ell$ 相等，因为……`,
    options: [
      R`每个位置有 $q(q-1)$ 个有序对，等于 $\binom q2$ 个无序对乘以 2 个方向`,
      R`$\Omega$ 恰好包含所有词对`,
      R`$C$ 是 $\Omega$ 的子集`,
      R`$X^{\otimes\ell}$ 有 $2^\ell$ 行`,
    ],
    answer: 0, why: R`$q(q-1)=2\binom q2$，逐位置相乘得 $(q(q-1))^\ell=\binom q2^\ell2^\ell=|C|2^\ell$。这正是同构 \eqref{4.6}。`,
  },
  {
    q: R`$\ell=2$。下列中间矩阵中，哪一个是 1-好的但**不是** 2-好的？`,
    options: [R`$I_4$`, R`$X\otimes X$`, R`$I_2\otimes X$（只翻转第 2 位）`, R`$X\otimes I_2$（只翻转第 1 位）`],
    answer: 2, why: R`$I_2\otimes X$ 保持第 1 位、对第 2 位做 $X$，形如 $I_2\otimes B$（$B=X$），故 1-好；它翻转第 2 位，所以不是 2-好的。$I_4$ 两者都是，$X\otimes X$ 两者都不是。`,
  },
  {
    q: R`\sref{L4.3} 的证明真正用到了 $K$ 的什么性质？`,
    options: [
      R`$K$ 可逆`,
      R`$K$ 保持第 $i$ 个方向位（$x_i\ne y_i$ 时 $K[x,y]=0$）`,
      R`$K$ 的两个对角块相同`,
      R`$K$ 的元素都是 0 或 1`,
    ],
    answer: 1, why: R`只要保持第 $i$ 位，第 $i$ 个位置的有序对就不变，比较第一个分量即得 $\alpha(u)_i=\beta(v)_i$。"两块相同"是 §5 的构造自然给出的更强形式（原文 p.10 的说明）。本页示例 3 可以直接验证这一点。`,
  },
  {
    q: R`若 $K=K_i+E$，$\rank(E)\le\varepsilon2^\ell$，外层误差 $E_{\rm out}=L(I_C\otimes E)R'$ 的秩上界为什么是 $\varepsilon M$？`,
    options: [
      R`因为 $L$ 和 $R'$ 是稀疏的`,
      R`因为 $I_C\otimes E$ 是 $|C|$ 份 $E$ 的分块对角阵，秩为 $|C|\rank(E)\le|C|\varepsilon2^\ell=\varepsilon M$，左右乘不增秩`,
      R`因为 $E$ 与 $t$ 无关`,
      R`因为 $M\le n$`,
    ],
    answer: 1, why: R`分块对角阵的秩等于各块秩之和；$|C|2^\ell=M$。注意 $M$ 可能大于 $n$，这时界是平凡的——§6 的参数保证 $\varepsilon M$ 远小于 $n$。`,
  },
];

export const BRIDGE = R`§4 把整个问题压缩成一个**与输入无关**的小问题：在 $2^\ell\times2^\ell$ 的矩阵上找一个矩阵多项式 $J(t)$，使

◆ $J(0)=X^{\otimes\ell}$（于是 $A(0)=L(I_C\otimes J(0))R'=A$）；

◆ 每个特殊点 $t=i$ 处 $J(i)=K_i+E$，$K_i$ 是 $i$-好的，$E$ 的秩 $\le2^\ell/\ell^{100}$ 且**对所有 $i$ 相同**（于是由\sref{L4.3} 与 \eqref{4.9}，$A(i)$ 是"块 $\le3n/q$ + 低秩"）；

◆ 次数 $d$ 远小于 $\ell$（于是\sref{P3.2} 中 $h\approx nd/\ell=o(n)$）。

精确的 $i$-好要求次数至少 $\ell$——那就毫无收益。§5 的关键是：允许一个公共的低秩误差后，用一个在中间几层上逼近奇偶函数的低次多项式 $p$，令 $J(t)=p\big(\sum_j(1-t/j)X_j\big)+E$，次数降到 $O(\sqrt{\ell\log\ell})$。`;
