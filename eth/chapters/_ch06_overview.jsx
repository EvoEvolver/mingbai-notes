// 第 6 页高层理解层。
const R = String.raw;

export const HOOK_TITLE = "所有零件都在了，现在来算账";
export const HOOK = R`前五节造好了全部零件：§2 的结构化积和式引擎，§3 的导数与插值，§4 的分解与分块，§5 的低次矩阵多项式。但"$2^{o(n)}$"不是任何一个零件单独给出的——它是几个相互拉扯的参数之间的平衡：$q$ 越大块越小，但标号词越短、特殊点越少；$\ell$ 越大插值越省，但 $d=O(\sqrt{\ell\log\ell})$ 也随之变大；误差秩要乘上 $\log n$ 才是代价……

本节把 \eqref{6.1} 的取值代进去，逐项核对每个引理的前提，算出每一步的代价，并说明为什么最后是导数项 $h\log(n/h)$ 说了算。之后再走两步"出口"：从稀疏积和式到 #3SAT，以及一个关于非确定时间的推论。`;

export const ROADMAP = [
  { sec: "6", title: "选参数、验前提", gist: R`$q=\lceil(\log n)^{10}\rceil$、$\ell=\lceil\log_q(16\Delta\sqrt n)\rceil$、$d=\lceil100\sqrt{\ell\log\ell}\rceil$；检查引理 4.1 的条件，得 $\ell,M,d$ 的量级。`, gives: ["6.1"], next: R`参数定了，把零件拼起来。` },
  { sec: "6", title: "拼出 A(t) 并记账", gist: R`$A(t)=L(I_C\otimes J(t))R'$；特殊点上 $s\le3n/q$、$r\le M/\ell^{100}$；子矩阵代价 $2^{O(n/\log^{10}n)}$；导数代价 $h\log(n/h)$ 占主导。`, gives: ["6.2"], next: R`于是定理 6.1；还要说明精确算术只带来多项式开销。` },
  { sec: "6", title: "从稀疏积和式到 #3SAT", gist: R`Valiant/Ben-Dor–Halevi 归约 + 路径小工具把度数降到 3；稀疏 3-CNF 在 \eqref{1.1} 时间内计数。`, gives: [], next: R`最后一个推论：非确定时间。` },
  { sec: "6", title: "非确定时间的推论", gist: R`借助 [Sub26]：$\NTIME(T)\subseteq\DTIME\big(2^{O(T(\log\log T)^3/\sqrt{\log T})}\big)$。`, gives: [] },
];

export const groups = [{ id: "param", label: "参数" }, { id: "cost", label: "代价" }, { id: "out", label: "出口" }];

export const concepts = [
  { id: "choice", name_zh: "参数的选择", name_en: "parameter choice (6.1)", icon: "🎛️", group: "param",
    plain: R`$q$ 取 $(\log n)^{10}$，$\ell$ 让 $q^\ell$ 刚好超过 $16\Delta\sqrt n$，$d$ 取 $100\sqrt{\ell\log\ell}$。`,
    explain: R`$q$ 必须是 polylog：$q$ 太小，块大小 $3n/q$ 不够小；$q$ 太大，$\ell=\log_q\sqrt n$ 变短，特殊点太少。$q=(\log n)^{10}$ 给出 $\ell\approx\log n/(20\log\log n)$。

$d$ 由 \sref{T5.1} 决定：$d=\Theta(\sqrt{\ell\log\ell})=\Theta(\sqrt{\log n})$。于是 $d/\ell=\Theta(\log\log n/\sqrt{\log n})\to0$，这就是全部节省的来源。`,
    analogy: R`像调相机：光圈（$q$）、快门（$\ell$）、感光度（$d$）彼此牵制，只有一组搭配能拍清楚。`,
    book_example: { what: R`式 \eqref{6.1} 与随后的 $\ell,M,d$ 量级。`, point: R`$16\Delta\sqrt n\le Q<16\Delta q\sqrt n$ 保证 \sref{L4.1} 适用。` },
    misconception: R`指数 10 和常数 100 并不"精调"：任何足够大的常数都行，只影响 $O(\cdot)$ 中的常数和 $n$ 要多大才进入渐近区。` },
  { id: "blocks_cost", name_zh: "特殊点的代价", name_en: "special-point cost", icon: "🧱", group: "cost",
    plain: R`每个特殊点的子矩阵积和式只需 $2^{O(n/\log^{10}n)}$，可以忽略。`,
    explain: R`$s\le3n/q=O(n/\log^{10}n)$，所以 $2^{O(s)}$ 很小；$r\le M/\ell^{100}=O\big(n(\log\log n)^{100}/(\log n)^{80}\big)$，乘 $\log n$ 后仍是 $o(n/\log^{10}n)$。

两项都远小于主项 $h\log(n/h)$。`,
    analogy: "主菜之外的配菜：存在，但不决定总账单。",
    book_example: { what: R`§6 中 $s$ 与 $r\log n$ 的界。`, point: R`$\ell^{100}$ 对 $M\approx n\log^{20}n$ 的压制是关键。` },
    misconception: R`$r$ 本身仍然很大（与 $n$ 同量级、只差 polylog 因子），只是 $r\log n$ 比主项小。` },
  { id: "deriv_cost", name_zh: "导数的代价（主项）", name_en: "derivative cost", icon: "📐", group: "cost",
    plain: R`$h\log(n/h)=\Theta\big(n(\log\log n)^2/\sqrt{\log n}\big)$——最终指数。`,
    explain: R`$h=\lfloor nd/\ell\rfloor+1=\Theta(n\log\log n/\sqrt{\log n})$；子矩阵对数 $\sum_{a<h}\binom na^2\le(n/h)^{O(h)}=2^{O(h\log(n/h))}$。

$\log(n/h)=\Theta(\log\log n)$，两个 $\log\log n$ 相乘得到 $(\log\log n)^2$。`,
    analogy: "插值需要的“观测数据量”决定了总时间。",
    book_example: { what: R`§6："The derivative cost dominates"。`, point: R`主定理的界正是 $h\log(n/h)$。` },
    misconception: "Hermite 插值本身是多项式时间，贵的是求导时枚举的子矩阵。" },
  { id: "exact", name_zh: "精确算术", name_en: "exact arithmetic", icon: "🔢", group: "cost",
    plain: "所有中间数都只有多项式比特，只带来多项式开销。",
    explain: R`$p$ 的 Lagrange 系数、$L$ 与 $R'$、秩分解（有理高斯消元）、Hermite 方程组的解，都由多项式规模的有理线性系统给出，行列式界保证多项式比特长度；积和式 DP 把多项式多个这样的数相乘相加，阶乘权重也只加多项式比特。`,
    analogy: "账本里每个数都写得下，不会因为位数爆炸而拖慢。",
    book_example: { what: "§6 “Exact arithmetic” 段。", point: "算法确定性且精确，无舍入误差。" },
    misconception: R`$1/\sqrt2$ 只出现在秩的证明里（Hadamard 换基），算法中不出现无理数。` },
  { id: "gadget", name_zh: "路径小工具", name_en: "path gadget", icon: "🔗", group: "out",
    plain: R`度为 $k$ 的顶点换成 $2k-1$ 个顶点的路径，积和式不变、度数变 3。`,
    explain: R`原边接在路径的奇数位置。偶数位置顶点只有路径边，奇数位置比偶数位置多一个，所以恰好一个奇数位置使用外部边；它两侧各是偶数长的路径，完美匹配唯一。

对两侧都替换后最大度为 3，规模线性（\sref{F:reduce}）。`,
    analogy: "把一个繁忙的十字路口改成一串单行道：每辆车（匹配）仍然只能选一个出口，而且一旦选定，其余道路的走法是唯一的。",
    book_example: { what: "§6 “To bound individual degrees” 段；本页可运行示例。", point: R`Valiant/BH93 的矩阵只保证总非零元 $O(n)$，不保证单点度数。` },
    misconception: "不是任意二部图变换都保持积和式；这里关键是“内部完成唯一且权为 1”。" },
  { id: "ntime", name_zh: "非确定时间推论", name_en: "NTIME consequence", icon: "🕰️", group: "out",
    plain: R`$\NTIME(T)\subseteq\DTIME\big(2^{O(T(\log\log T)^3/\sqrt{\log T})}\big)$。`,
    explain: R`[Sub26] 的调度条件编码把时间 $T$ 的非确定多带机归约为 $2^{O(T\log\log T/\log T)}$ 个公式，每个 $O(T\log\log T)$ 个变量与子句；对每个公式用稀疏公式算法。

多出的 $\log\log T$ 来自公式规模 $N=T\log\log T$。`,
    analogy: "先把一次长计算切成许多片段，再用快速计数器逐片检查。",
    book_example: { what: "§6 最后一段。", point: "非平凡成分是 [Sub26] 的编码，与积和式算法无关。" },
    misconception: "这不是说 NP ⊆ P；右边仍是超多项式时间。" },
];

export const relations = [
  { from: "choice", to: "blocks_cost", label: "定 s, r" },
  { from: "choice", to: "deriv_cost", label: "定 h" },
  { from: "exact", to: "deriv_cost", label: "仅多项式开销" },
  { from: "deriv_cost", to: "gadget", label: "主定理" },
  { from: "gadget", to: "ntime", label: "稀疏公式计数" },
];

export const TAKEAWAYS = [
  R`参数 \eqref{6.1}：$q=\lceil(\log n)^{10}\rceil$，$\ell=\Theta(\log n/\log\log n)$，$M=O(n\log^{20}n)$，$d=\Theta(\sqrt{\log n})$；满足引理 4.1 的前提。`,
  R`特殊点：$s=O(n/\log^{10}n)$，$r\log n=o(n/\log^{10}n)$，子矩阵积和式 $2^{O(n/\log^{10}n)}$。`,
  R`主项是导数：$h\log(n/h)=O\big(n(\log\log n)^2/\sqrt{\log n}\big)$，命题 3.2 给出定理 6.1。`,
  R`路径小工具把归约得到的矩阵变成最大度 3，于是稀疏 3-CNF 在 \eqref{1.1} 时间内可计数；ETH 不成立。`,
  R`渐近界：参数账本显示，按文中常数，$n$ 要非常大时各条件才全部成立——这是定理"for sufficiently large n"的含义，与结论本身无关。`,
];

export const QUIZ = [
  { q: R`为什么取 $q=\lceil(\log n)^{10}\rceil$，而不是 $q=\Theta(\sqrt n)$（§4.1 的取法）？`, options: ["为了让块更小", R`为了让 $\ell$ 足够大：$\ell=\log_q\sqrt n$ 是特殊点的个数，$q$ 是 polylog 时 $\ell=\Theta(\log n/\log\log n)$`, "为了让 M 更小", "为了让 Ryser 更快"], answer: 1, why: R`$\ell=1$ 时只有一个特殊点，插值毫无节省（§4.1 末"One easy matrix is not enough"）。` },
  { q: "最终运行时间的主项来自哪一步？", options: ["特殊点上的块内枚举", "颜色计数表", "导数：枚举 |S|=|T|<h 的子矩阵对", "Hermite 插值的线性方程组"], answer: 2, why: R`$(n/h)^{O(h)}=2^{O(h\log(n/h))}$，而另两项是 $2^{O(n/\log^{10}n)}$。` },
  { q: R`$r\log n=O\big(n(\log\log n)^{100}/(\log n)^{79}\big)$ 中的 79 从哪里来？`, options: ["100 − 20 − 1", "100 − 21", "80 − 1", "以上都对"], answer: 3, why: R`$r\le M/\ell^{100}$，$M=O(n\log^{20}n)$，$\ell^{100}=\Theta((\log n/\log\log n)^{100})$，得 $r=O(n(\log\log n)^{100}/\log^{80}n)$，再乘 $\log n$。` },
  { q: "路径小工具中，为什么恰好有一条外部边被使用？", options: ["因为权重为 1", "偶数位置顶点只连路径边；两个外部边会留下奇数长区间，零个会留下奇数个顶点", "因为图是二部图", "因为 k 是奇数"], answer: 1, why: "奇偶性论证；之后内部完成唯一。" },
  { q: R`$\NTIME(T)$ 推论里的指数多了一个 $\log\log T$，原因是？`, options: ["导数阶数更高", R`每个公式有 $N=O(T\log\log T)$ 个变量，$\rho(N)$ 中 $N$ 自带一个 $\log\log T$`, "稀疏化损失", "公式个数太多"], answer: 1, why: R`$\rho(N)=N(\log\log N)^2/\sqrt{\log N}$。` },
];

export const BRIDGE = R`主定理到此证毕。附录 A 说明同一算法可以只用多项式空间：把颜色计数表看成一个多项式的系数，不存表、只对它"插值泛函"。附录 B 则去掉"子句数线性"的限制，对任意 3-CNF 给出同样的 $2^{O(\rho(n))}$ 界。`;
