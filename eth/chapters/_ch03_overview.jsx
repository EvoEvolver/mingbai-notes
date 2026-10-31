// 第 3 页高层理解层：开场、路线图、核心概念、小结、自测、过渡。

const R = String.raw;

export const HOOK_TITLE = "只在几个点上知道一个多项式，怎样读出它在别处的值？";
export const HOOK = R`设想你要知道某个多项式 $P(t)$ 在 $t=0$ 的值，但 $P(0)$ 本身极难直接计算——它就是我们想要的 $\per(A)$。§2 给了你一件好工具：在少数几个"特殊点" $t=1,\dots,\ell$ 上，矩阵 $A(t)$ 恰好有"小块 + 低秩"的结构，于是那里的积和式（以及每个方子矩阵的积和式）都算得动。

问题是，$P(t)=\per(A(t))$ 的次数可以高达 $nd$，而 $\ell$ 只有 $\Theta(\log n/\log\log n)$ 那么多个点。中学里学的 Lagrange 插值要 $nd+1$ 个点的函数值——差得太远了。

出路是：**在每个点上多问几个问题**。不光问 $P(i)$，还问 $P'(i),P''(i),\dots,P^{(h-1)}(i)$。一个点上的 $h$ 个导数，和 $h$ 个不同点上的函数值携带同样多的信息（Hermite 插值）。只要 $\ell h>nd$，多项式就被唯一确定。

但导数从哪里来？$P'(i)$ 是 $\per(A(t))$ 的导数，看上去需要对 $A'(i)$——一个毫无结构的矩阵——做某种积和式计算。本页的第一个惊喜是：**不需要**。$P$ 的前 $h$ 阶导数只用到 $A(i)$ 的**子矩阵**积和式，而 §2 恰好保证了"每个方子矩阵"都好算。代价是要枚举大约 $\binom nh^2$ 对子矩阵——这就是全文最终运行时间里那个 $(n/h)^{O(h)}$ 的来源。`;

export const ROADMAP = [
  { sec: "3", title: "一阶导数的机制", gist: R`对积和式求导 = 对每个元素求偏导再乘上余子式的积和式：$P'(t_0)$ 只用到 $A_0$ 的 $(n-1)\times(n-1)$ 子矩阵积和式，而不是 $A'(t_0)$ 的积和式。`, next: R`把"删一行一列"推广到"删 $a$ 行 $a$ 列"，就得到高阶导数。` },
  { sec: "3", title: "高阶导数：加法公式 + 整除性", gist: R`令 $\Delta(z)=A(t_0+z)-A_0$；加法公式把 $P(t_0+z)$ 拆成子矩阵积和式之和，而 $\per(\Delta(z)[S,T])$ 被 $z^{|S|}$ 整除，所以 $j$ 阶导数只收 $|S|\le j$ 的项。`, gives: ["3.1"], next: R`于是只需枚举 $|S|=|T|<h$ 的子集对——数一数有多少。` },
  { sec: "3", title: R`代价：$(n/h)^{O(h)}$`, gist: R`子集对共 $\sum_{a<h}\binom na^2$ 个；每对一次大积和式（时间 $T$）与一次 $\Q[z]/(z^h)$ 上的小积和式；$h\le n/2$ 时总量 $\le T\poly(n)(n/h)^{O(h)}$。`, next: R`一个点上有了 $h$ 个导数，接下来把 $\ell$ 个点拼起来。` },
  { sec: "3.1", title: "Hermite 插值：用导数代替点", gist: R`$\deg P\le nd$；$\ell$ 个点上各 $h$ 阶导数，只要 $\ell h>nd$ 就唯一确定 $P$：两候选之差被 $\prod_i(t-i)^h$ 整除而次数更低。`, next: R`把 \sref{L2.1}、\sref{L3.1} 与插值串起来。` },
  { sec: "3.1", title: "命题 3.2：算法与代数分家", gist: R`取 $h=\lfloor nd/\ell\rfloor+1$，总时间 $\poly(n)2^{O(s+r\log n+h\log(n/h))}$。此后唯一的任务是构造 $d/\ell$ 小、特殊点有结构的 $A(t)$。`, gives: ["3.2"] },
];

export const groups = [
  { id: "deriv", label: "导数从哪里来" },
  { id: "interp", label: "插值与参数" },
];

export const concepts = [
  {
    id: "perpoly", name_zh: String.raw`积和式多项式 $P(t)$`, name_en: "Permanent polynomial", icon: "📈", section_id: "3", group: "deriv",
    plain: R`把输入矩阵放进一族矩阵 $A(t)$ 里，看 $\per(A(t))$ 作为 $t$ 的多项式。`,
    explain: R`$A(t)$ 的每个元素是 $t$ 的多项式（次数 $\le d$），$\per$ 是 $n$ 个元素乘积之和，所以 $P(t)=\per(A(t))$ 是次数 $\le nd$ 的多项式。我们想要的是 $P(0)=\per(A)$。整个策略是：在别的点（特殊点）上收集 $P$ 的信息，再用插值"推回" $t=0$。

这种"把难题嵌入多项式族、在容易的点上求值、插值回来"的思路在复杂性理论中很常见（例如积和式的随机自归约），但这里的特殊之处是：容易的点很少（$\ell$ 个），所以每个点要榨出很多信息（$h$ 阶导数）。`,
    analogy: "想知道一条山路在某处的海拔，但那里进不去；你在几个能到达的观测站量出海拔、坡度、曲率……只要量得够多，就能把整条路的形状拼出来。",
    book_example: { what: R`§3 开头："令 $A(t)$ 为 $n\times n$ 多项式矩阵，$P(t)=\per(A(t))$"；§3.1：$\deg P\le nd$。`, point: R`$P$ 的次数预算 $nd$ 决定了要收集多少信息。` },
    misconception: R`$P(t)$ 不是对 $t$ 逐个元素求积和式；$A(t)$ 是先在 $t$ 处取值再求积和式，所以 $P$ 的次数是 $n$ 乘以元素次数。`,
  },
  {
    id: "minor_deriv", name_zh: "导数只需子矩阵积和式", name_en: "Derivatives via submatrix permanents", icon: "✂️", section_id: "3", group: "deriv",
    plain: R`$P'(t_0)=\sum_{u,v}A'_{uv}(t_0)\cdot\per(A_0$ 删去第 $u$ 行第 $v$ 列$)$。`,
    explain: R`积和式对每个元素都是一次的（每个乘积项里每个元素至多出现一次），所以按链式法则，$P'(t_0)=\sum_{u,v}\frac{\partial\per}{\partial a_{uv}}\cdot A'_{uv}(t_0)$，而 $\partial\per/\partial a_{uv}$ 正是删去第 $u$ 行、第 $v$ 列后的积和式（"余子式积和式"）。

关键观察：导数矩阵 $A'(t_0)$ 只以**数值系数**的身份出现，它不需要任何结构；需要结构的只是 $A_0=A(t_0)$ 的子矩阵。这就是为什么 \sref{L2.1} 要证明"每个方子矩阵"的积和式都好算。`,
    analogy: R`求一个乘积 $x_1x_2\cdots x_n$ 的变化率：每次只让一个因子变，其余因子原样相乘。被"删去"的那个因子换成它的变化率，剩下的就是一个更小的乘积。`,
    book_example: { what: R`\sref{L3.1} 证明的第一个公式。`, point: R`这一行就揭示了整个机制："要的是 $A_0$ 的子矩阵积和式，而不是 $A'(t_0)$ 的积和式"。` },
    misconception: R`不是 $P'=\per(A')$。即使 $n=2$ 也能验证：$\per$ 的导数是四项之和，而不是 $\per(A')$。`,
  },
  {
    id: "increment", name_zh: String.raw`增量矩阵 $\Delta(z)$`, name_en: "Increment matrix", icon: "➕", section_id: "3", group: "deriv",
    plain: R`$\Delta(z)=A(t_0+z)-A_0$：每个元素都是 $z$ 的倍数。`,
    explain: R`把 $A(t_0+z)$ 看成"一个常数矩阵 $A_0$ 加上一个小扰动 $\Delta(z)$"。因为 $\Delta(0)=0$，每个元素作为 $z$ 的多项式没有常数项，即被 $z$ 整除。于是 $\Delta(z)$ 的任意 $a\times a$ 子矩阵的积和式——每项是 $a$ 个元素的乘积——被 $z^a$ 整除。

这个整除性就是"$j$ 阶导数只看 $|S|\le j$ 的子矩阵"的全部原因：大的子集 $S$ 对低阶 Taylor 系数没有贡献。`,
    analogy: R`把一个数写成"大数 + 微小修正"：只关心一阶精度时，两个修正量的乘积可以扔掉；关心 $j$ 阶精度时，最多保留 $j$ 个修正量的乘积。`,
    book_example: { what: R`\sref{L3.1} 证明："Every entry of $\Delta(z)$ is divisible by $z$."`, point: "\"小扰动的阶\"直接转化为\"子集大小的上限\"。" },
    misconception: R`$\Delta$ 在本页是增量矩阵，与 §4 起的最大度常数 $\Delta$ 无关。`,
  },
  {
    id: "addition", name_zh: String.raw`加法公式与 \eqref{3.1}`, name_en: "Addition formula → (3.1)", icon: "🧩", section_id: "3", group: "deriv",
    plain: R`$\per(A_0+\Delta)$ 按"哪些行列用 $\Delta$ 匹配"展开成子矩阵积和式乘积之和。`,
    explain: R`§2 的加法公式 \eqref{2.2} 取 $B=A_0$、$C=\Delta(z)$：$P(t_0+z)=\sum_{|S|=|T|}\per(A_0[S^c,T^c])\cdot\per(\Delta(z)[S,T])$。前一个因子是数，后一个是 $z$ 的多项式（被 $z^{|S|}$ 整除）。取 $z^j$ 的系数并乘 $j!$，就得到 \eqref{3.1}：$P^{(j)}(t_0)$ 是有限个"大子矩阵积和式 × 小积和式的一个系数"之和，只涉及 $|S|\le j$。`,
    analogy: R`像二项式展开 $(x+y)^n$ 的矩阵版本：每一项选一部分位置取 $y$（这里是 $\Delta$），其余取 $x$（这里是 $A_0$）。只要低阶项时，选 $y$ 的位置不能太多。`,
    book_example: { what: R`\eqref{3.1}。`, point: "它把\"求导\"这个分析操作彻底变成了\"枚举子集 + 调用子矩阵积和式\"的组合操作。" },
    misconception: R`求和中 $S$ 和 $T$ 是独立选取的（只要求大小相等），所以第 $a$ 层有 $\binom na^2$ 对，而不是 $\binom na$ 对。`,
  },
  {
    id: "truncring", name_zh: String.raw`截断多项式环 $\Q[z]/(z^h)$`, name_en: "Truncated power series ring", icon: "✂", section_id: "3", group: "deriv",
    plain: R`只保留 $z^0,\dots,z^{h-1}$ 的系数做算术——小积和式在这里算。`,
    explain: R`我们只需要 $[z^j]\per(\Delta(z)[S,T])$ 对 $j<h$，所以可以在"$z^h=0$"的环里计算：每个元素是长度 $h$ 的系数向量，乘法是截断卷积。Ryser 公式或子集 DP 只用加、减、乘，在任何交换环上都成立，于是 $a\times a$ 的小积和式只需 $2^{O(a)}$ 次环运算，每次环运算 $O(h^2)$ 次有理运算。`,
    analogy: R`做精确到小数点后 $h$ 位的计算：比 $h$ 位更细的部分一律舍去，因为它们根本影响不到我们要的答案。`,
    book_example: { what: R`"Compute the small $a\times a$ permanent by subset DP or Ryser over $\Q[z]/(z^h)$"。`, point: R`截断让小积和式的代价与 $\Delta(z)$ 的真实次数无关。` },
    misconception: R`截断不会丢信息：我们要的 Taylor 系数恰好都在 $j<h$ 范围内，舍去的高阶部分本来就不用。`,
  },
  {
    id: "cost", name_zh: String.raw`子集对计数 $(n/h)^{O(h)}$`, name_en: "Counting subset pairs", icon: "🧮", section_id: "3", group: "deriv",
    plain: R`$\sum_{a<h}\binom na^2\le(n/h)^{O(h)}$，前提是 $h\le n/2$。`,
    explain: R`$h\le n/2$ 时 $\binom na$ 在 $a\le h$ 上递增，所以总和 $\le h\binom nh^2\le h(\mathrm{e}n/h)^{2h}$；再用 $n/h\ge2$ 把 $h\cdot2^{O(h)}$ 吸收进 $(n/h)^{O(h)}$。用熵函数表达更直观：$\log_2\binom nh\approx nH(h/n)$，当 $h/n\to0$ 时它约为 $h\log_2(n/h)$，远小于 $n$。

在 §6 的参数下 $h/n\approx d/\ell\to0$，这一项是 $2^{O(h\log(n/h))}=2^{o(n)}$——全文运行时间的主项。`,
    analogy: R`从 $n$ 个人里选不超过 $h$ 个人组队：$h$ 远小于 $n$ 时，选法数大约是 $(n/h)^h$ 量级，而不是 $2^n$。`,
    book_example: { what: R`\sref{L3.1} 证明末尾的不等式。`, point: R`这是本页唯一的"指数"代价，$h/n$ 越小越省。` },
    misconception: R`$h>n/2$ 时界不成立（总和趋于 $\binom{2n}{n}\approx4^n$），这就是引理要求 $h\le n/2$ 的原因。`,
  },
  {
    id: "hermite", name_zh: "Hermite 插值", name_en: "Hermite interpolation", icon: "📍", section_id: "3.1", group: "interp",
    plain: R`$\ell$ 个点上各给出 $0,\dots,h-1$ 阶导数，就能唯一确定一个次数 $<\ell h$ 的多项式。`,
    explain: R`Lagrange 插值用 $N$ 个点的函数值确定次数 $<N$ 的多项式；Hermite 插值把"一个点的值"换成"一个点的若干阶导数"。唯一性一句话：两个候选之差 $D$ 在每个点 $i$ 处 $0,\dots,h-1$ 阶导数都为零，即 $(t-i)^h\mid D$；这些因子两两互素，所以 $\prod_i(t-i)^h\mid D$，而 $\deg D<\ell h$，只能 $D=0$。

存在性与计算：未知系数 $c_0,\dots,c_{\ell h-1}$ 满足一个 $\ell h\times\ell h$ 线性方程组（合流 Vandermonde 矩阵），唯一性 ⇒ 矩阵非奇异 ⇒ 高斯消元求解，多项式时间。`,
    analogy: "确定一条抛物线，可以给三个点；也可以只给一个点，但同时说出那里的高度、坡度和弯曲程度。",
    book_example: { what: "§3.1 第一段。", point: R`信息总量 $\ell h$ 必须超过次数预算 $nd$。` },
    misconception: R`导数阶数是 $0,\dots,h-1$（共 $h$ 个，含函数值本身），整除因子是 $(t-i)^h$，不是 $(t-i)^{h-1}$。`,
  },
  {
    id: "budget", name_zh: String.raw`次数预算 $\ell h>nd$ 与 $d/\ell$`, name_en: "Degree budget", icon: "⚖️", section_id: "3.1", group: "interp",
    plain: R`$h=\lfloor nd/\ell\rfloor+1\approx n\cdot(d/\ell)$：$d/\ell$ 越小，每个点要的导数越少。`,
    explain: R`$\deg P\le nd$，$\ell$ 个点各 $h$ 个数据，需要 $\ell h>nd$，最省的选择是 $h=\lfloor nd/\ell\rfloor+1$。于是 $h/n\approx d/\ell$，而代价 $(n/h)^{O(h)}=2^{O(n\cdot(d/\ell)\cdot\log(\ell/d))}$。要让它是 $2^{o(n)}$，必须 $d/\ell\to0$：矩阵多项式的次数必须远小于特殊点个数。

§5 的 \sref{T5.1} 正是在这里发力：它造出次数 $d=O(\sqrt{\ell\log\ell})$ 的局部矩阵多项式，于是 $d/\ell=O(\sqrt{\log\ell/\ell})\to0$。`,
    analogy: R`预算固定（$nd$ 个未知量），观测站个数 $\ell$ 固定，每站要测的项目数 $h$ 就被决定了；想减少每站的工作量，只能降低 $d$。`,
    book_example: { what: R`\sref{P3.2} 中的 $h=\lfloor nd/\ell\rfloor+1\le n/2$，以及结尾一句"construct $A(t)$ … with $d/\ell$ small"。`, point: R`整篇论文剩下的工作，就是把 $d/\ell$ 压小，同时保住特殊点的结构。` },
    misconception: R`$\ell$ 不是越大越好那么简单：特殊点越多，$A(t)$ 越难构造（要在更多点上同时有结构），§4–§5 用 $\ell$ 位长的标号与 $\ell$ 维布尔立方体来平衡这一点。`,
  },
  {
    id: "separation", name_zh: "算法与代数分家", name_en: "Separating algorithm from algebra", icon: "🔀", section_id: "3.1", group: "interp",
    plain: R`\sref{P3.2} 之后，问题只剩下：构造一个好的 $A(t)$。`,
    explain: R`\sref{P3.2} 是一个"黑盒"接口：输入任何满足 $A(0)=A$、$\deg\le d$、且在 $1,\dots,\ell$ 处为"小块 + 低秩"的矩阵多项式，它就输出 $\per(A)$，时间 $\poly(n)\cdot2^{O(s+r\log n+h\log(n/h))}$。算法部分（\sref{L2.1}、\sref{L3.1}、插值）从此封装完毕。

剩下的全是代数构造：§4 把 $A$ 分解为 $L\cdot(\text{中间矩阵})\cdot R'$，让中间矩阵在第 $i$ 个特殊点"$i$-好"从而外层分块；§5 造出低次 $J(t)$；§6 选参数让 $s$、$r\log n$、$h\log(n/h)$ 都是 $o(n)$。`,
    analogy: R`像先写好一个通用的"引擎"，再去设计"燃料"：引擎的规格（$s$、$r$、$d/\ell$ 的要求）一旦写定，后面只需要造出符合规格的燃料。`,
    book_example: { what: "§3.1 最后一段：\"We have now separated the algorithmic task from the algebraic one\"。", point: R`读 §4–§5 时，时刻记住它们在为 \sref{P3.2} 的三个参数服务。` },
    misconception: R`\sref{P3.2} 本身并不给出亚指数算法；它把"亚指数"归结为三个参数都足够小，而参数能否同时做小要到 §6 才见分晓。`,
  },
];

export const relations = [
  { from: "perpoly", to: "minor_deriv", label: "求导" },
  { from: "minor_deriv", to: "addition", label: "推广到高阶" },
  { from: "increment", to: "addition", label: "C = Δ(z)" },
  { from: "addition", to: "truncring", label: "小积和式在此计算" },
  { from: "addition", to: "cost", label: "枚举 |S|<h" },
  { from: "perpoly", to: "hermite", label: String.raw`$\deg\le nd$` },
  { from: "hermite", to: "budget", label: String.raw`$\ell h>nd$` },
  { from: "cost", to: "budget", label: String.raw`$h/n\approx d/\ell$` },
  { from: "budget", to: "separation", label: "命题 3.2" },
];

export const TAKEAWAYS = [
  R`**导数 = 子矩阵积和式的组合。**$P^{(j)}(t_0)=j!\sum_{a\le j}\sum_{|S|=|T|=a}\per(A_0[S^c,T^c])\,[z^j]\per(\Delta(z)[S,T])$（\eqref{3.1}）。导数矩阵只以系数的身份出现，不需要结构；需要结构的是 $A_0$ 的子矩阵——这正是 \sref{L2.1} 保证的。`,
  R`**截断的原因是整除性。**$\Delta(z)$ 每个元素被 $z$ 整除 ⇒ $\per(\Delta(z)[S,T])$ 被 $z^{|S|}$ 整除 ⇒ 前 $h$ 阶导数只涉及 $|S|<h$。小积和式在 $\Q[z]/(z^h)$ 上用 Ryser 或子集 DP 计算。`,
  R`**代价 $(n/h)^{O(h)}$。**子集对共 $\sum_{a<h}\binom na^2$ 个；$h\le n/2$ 时 $\le h(\mathrm{e}n/h)^{2h}=(n/h)^{O(h)}$。指数约为 $2nH(h/n)$，$h/n\to0$ 时远小于 $n$。`,
  R`**Hermite 插值。**$\ell$ 个点各 $h$ 阶导数确定任何次数 $<\ell h$ 的多项式；取 $h=\lfloor nd/\ell\rfloor+1$ 保证 $\ell h>nd\ge\deg P$。`,
  R`**分界线。**\sref{P3.2}：总时间 $\poly(n)\,2^{O(s+r\log n+h\log(n/h))}$。之后只需构造一个 $A(t)$：特殊点上"小块 + 低秩"，且 $d/\ell$ 小。`,
];

export const QUIZ = [
  {
    q: R`\sref{L3.1} 中，计算 $P'(t_0)$ 需要哪类积和式？`,
    options: [R`$A'(t_0)$ 的积和式`, R`$A_0=A(t_0)$ 删去一行一列后的 $(n-1)\times(n-1)$ 子矩阵积和式`, R`$A_0+A'(t_0)$ 的积和式`, R`$A(t)$ 在 $n$ 个不同点处的积和式`],
    answer: 1, why: R`积和式对每个元素是一次的，偏导数 $\partial\per/\partial a_{uv}$ 就是删去第 $u$ 行第 $v$ 列的积和式；$A'_{uv}(t_0)$ 只作为数值系数出现。`,
  },
  {
    q: R`为什么 $j$ 阶导数 $P^{(j)}(t_0)$ 只收到 $|S|\le j$ 的项？`,
    options: ["因为加法公式只对小子集成立", R`因为 $\Delta(z)$ 每个元素被 $z$ 整除，所以 $\per(\Delta(z)[S,T])$ 被 $z^{|S|}$ 整除，它的 $z^j$ 系数在 $|S|>j$ 时为零`, R`因为 $A_0$ 的大子矩阵积和式为零`, R`因为 $h\le n/2$`],
    answer: 1, why: R`$a\times a$ 积和式的每一项是 $a$ 个元素之积，每个元素至少含一个 $z$ 因子。`,
  },
  {
    q: R`$n=6$、$h=3$ 时，\sref{L3.1} 要枚举多少对 $(S,T)$？`,
    options: [R`$1+6+15=22$`, R`$1+36+225=262$`, R`$\binom{12}{6}=924$`, R`$2^6=64$`],
    answer: 1, why: R`$a=0,1,2$ 层分别有 $\binom6a^2=1,36,225$ 对；$S$ 与 $T$ 独立选取。全部层合计才是 $\binom{12}{6}=924$（范德蒙德恒等式）。`,
  },
  {
    q: R`$\deg P\le nd$。若在 $\ell=4$ 个点各取 $h$ 阶以内的导数（$0,\dots,h-1$），$n=5$、$d=2$ 时最小需要 $h=\,?$`,
    options: ["2", "3", "4", "10"],
    answer: 1, why: R`需要 $\ell h>nd=10$，即 $h>2.5$；$h=\lfloor10/4\rfloor+1=3$。`,
  },
  {
    q: R`\sref{P3.2} 要求 $h=\lfloor nd/\ell\rfloor+1\le n/2$。这个条件在全文参数下意味着什么？`,
    options: [R`对所有 $n$ 都自动成立`, R`要求 $d/\ell$ 小于约 $1/2$，只在 $n$ 极大时成立（渐近条件）`, R`要求 $d>\ell$`, R`要求 $s\le r$`],
    answer: 1, why: R`$h\approx n\cdot d/\ell$，所以 $h\le n/2\iff d/\ell\lesssim1/2$。按 \eqref{6.1}，$d/\ell=\Theta(\sqrt{\log\ell/\ell})\to0$，但常数 100 使它在 $\log_2n$ 达到约 $5\times10^8$ 后才低于 $1/2$。`,
  },
];

export const BRIDGE = R`到这里，"算法"部分已经完全封装进 \sref{P3.2}：只要给我一个矩阵多项式 $A(t)$，满足 $A(0)=A$、次数 $\le d$、在 $t=1,\dots,\ell$ 处是"块大小 $\le s$ 的分块矩阵 + 秩 $\le r$ 的矩阵"，并且 $d/\ell$ 足够小，我们就能在 $2^{O(s+r\log n+h\log(n/h))}$ 时间内算出 $\per(A)$。

剩下的是一个纯粹的**代数构造**问题。§4 迈出第一步：把输入的稀疏矩阵分解为 $L\cdot(\text{中间矩阵})\cdot R'$，并证明只要中间矩阵在第 $i$ 个点"$i$-好"，外层矩阵就自动按第 $i$ 个标号符号分块（$s\le3n/q$）。§5 再造出这样一族次数很低的中间矩阵。`;
