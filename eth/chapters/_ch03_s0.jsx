// §3 Derivatives and interpolation —— 引理 3.1 及其证明（原文 p.5 下半 – p.6 上半）
import { Sec, Tx, Eq, Box, Derivation, C, Stmt, Proof, Erratum } from "@kit";
import { DerivDemo } from "./_ch03_demos.jsx";

const R = String.raw;

export function Sec3() {
  return (
    <Sec n="3" title="Derivatives and interpolation" zh="导数与插值"
      gist={R`$P(t)=\per(A(t))$ 在一点 $t_0$ 的前 $h$ 阶导数，可以只用 $A(t_0)$ 的**子矩阵积和式**算出：枚举 $\sum_{a<h}\binom na^2$ 对子集，代价 $T\poly(n)(n/h)^{O(h)}$。`}
      why={R`特殊点只有 $\ell$ 个，远少于 $\deg P$；必须在每个点上榨出 $h$ 个导数才够插值。而 §2 只保证特殊点上"每个方子矩阵的积和式"好算——本节说明这恰好就是求导数所需的全部。`}
      gives={["3.1"]}>
      <p className="muted">本节概念：<C id="perpoly" /> · <C id="minor_deriv" /> · <C id="increment" /> · <C id="addition" /> · <C id="truncring" /> · <C id="cost" /></p>

      <Tx>{R`**我们站在哪里。**§2 的 \sref{L2.1} 给了一台"计算引擎"：只要一个矩阵是"小块 + 低秩"，它的积和式——以及它的**每个方子矩阵**的积和式——都能算得很快。可输入矩阵 $A$ 本身并没有这种结构。全文的策略是把 $A$ 嵌进一族**多项式矩阵**（polynomial matrix）$A(t)$：每个元素是 $t$ 的多项式，$A(0)=A$，而在少数"特殊点" $t=1,\dots,\ell$ 上，$A(t)$ 恰好有引擎需要的结构。

记 $n\times n$ 多项式矩阵 $A(t)$ 的积和式为`}</Tx>
      <Eq>{R`P(t)=\per(A(t)).`}</Eq>
      <Tx>{R`它是 $t$ 的一个多项式，我们要的是 $P(0)=\per(A)$。如果能在足够多的点上知道 $P$，插值就能把 $P(0)$ 读出来。麻烦在于"足够多"：$P$ 的次数可达 $nd$（$d$ 是元素的次数），而特殊点只有 $\ell$ 个，$\ell$ 远小于 $nd$。

解决办法是在每个特殊点上**求导数**——一个点上的 $h$ 阶导数提供 $h$ 条线性信息。可是"$\per(A(t))$ 的导数"听起来要涉及导数矩阵 $A'(t)$，而 $A'(t)$ 在特殊点上毫无结构可言。下面的引理说明这种担心是多余的：导数只需要 $A(t_0)$ 的子矩阵积和式。原文的说法是，这解释了为什么"高效的子矩阵积和式"是**正确的假设**——§2 刻意证明"每个方子矩阵"都好算，正是为这里准备的。`}</Tx>

      <Stmt id="L3.1">
        <Tx>{R`引理要一并算出的是这 $h$ 个数：`}</Tx>
        <Eq>{R`P(t_0),\ P'(t_0),\ \dots,\ P^{(h-1)}(t_0)`}</Eq>
        <Tx>{R`读引理时注意三个量：$T$ 是"一个子矩阵积和式"的单价（在特殊点上由 \sref{L2.1} 给出）；$h$ 是要的导数个数；$(n/h)^{O(h)}$ 是要调用多少次单价——它只与 $n,h$ 有关，与矩阵的结构无关。条件 $h\le n/2$ 只在最后估计子集对个数时用到。`}</Tx>
        <Box kind="warning" title="同一个字母 T 的两种含义">{R`原文在本引理中让 $T$ 同时表示**时间**（每个方子矩阵积和式的计算时间）与**列子集**（$S,T\subseteq[n]$）。两者从上下文很好区分：出现在 $\per(\cdot[S,T])$、$T^c$、$|T|$ 里的是列子集；出现在代价式 $T\,\poly(n)\cdots$ 里的是时间。`}</Box>

        <h3>一阶导数：机制已经全部显露</h3>
        <Tx>{R`记 $A_0=A(t_0)$。先看最简单的情形 $h=2$，即一阶导数。原文直接写出：`}</Tx>
        <Eq>{R`P'(t_0)=\sum_{u,v}A'_{uv}(t_0)\,\per(A_0\text{ with row }u\text{ and column }v\text{ deleted}).`}</Eq>
        <Tx>{R`这个公式的道理是：积和式 $\per(X)=\sum_{\pi}\prod_uX_{u\pi(u)}$ 的每一项里，每个元素**至多出现一次**，所以 $\per$ 作为 $n^2$ 个元素的函数对每个元素都是一次的。对一次函数求偏导，就是"把这个元素换成 1、其余照旧"，得到的正是删去该元素所在行列后的积和式。再用链式法则乘上 $A'_{uv}(t_0)$ 并求和即可。下面的推导把这一步写完整。`}</Tx>
        <Derivation title="补全：$P'(t_0)$ 公式的推导" collapsed steps={[
          { tex: R`P(t)=\sum_{\pi\in S_n}\prod_{u=1}^{n}A_{u\pi(u)}(t)`, why: R`积和式的定义（与行列式相同，只是没有符号）。` },
          { tex: R`P'(t)=\sum_{\pi\in S_n}\sum_{u=1}^{n}A'_{u\pi(u)}(t)\prod_{u'\ne u}A_{u'\pi(u')}(t)`, why: R`对 $n$ 个因子之积用乘积求导法则：每次只对一个因子求导。` },
          { tex: R`=\sum_{u,v}A'_{uv}(t)\sum_{\pi:\,\pi(u)=v}\ \prod_{u'\ne u}A_{u'\pi(u')}(t)`, why: R`交换求和次序，按 $v=\pi(u)$ 分组。` },
          { tex: R`=\sum_{u,v}A'_{uv}(t)\,\per(A(t)\text{ with row }u\text{ and column }v\text{ deleted})`, why: R`满足 $\pi(u)=v$ 的排列，限制在其余 $n-1$ 行上恰好是"删去第 $u$ 行、第 $v$ 列"后的 $(n-1)\times(n-1)$ 矩阵的全部排列。取 $t=t_0$ 即得原文公式。` },
        ]} />
        <Tx>{R`**这一行公式告诉我们什么。**导数矩阵 $A'(t_0)$ 只以**数值系数** $A'_{uv}(t_0)$ 的身份出现，它不需要任何结构；真正要算的积和式全部是 $A_0$ 的子矩阵积和式。原文的话：要紧的是 $A_0$ 的子矩阵积和式，而**不是** $A'(t_0)$ 的积和式。若把 $P'(t_0)$ 误当成"某个与 $A'(t_0)$ 有关的积和式"，就会以为需要 $A'(t_0)$ 也有结构——而那是我们无法保证的。`}</Tx>

        <h3>高阶导数：加法公式 + 整除性</h3>
        <Tx>{R`一阶导数是"删一行一列"；$j$ 阶导数自然应该涉及"删至多 $j$ 行 $j$ 列"。为了把这个直觉变成公式，引入**增量矩阵**（increment matrix）`}</Tx>
        <Eq>{R`\Delta(z)=A(t_0+z)-A_0.`}</Eq>
        <Tx>{R`它的每个元素是 $z$ 的多项式，并且在 $z=0$ 处为零，所以**每个元素都被 $z$ 整除**。现在 $A(t_0+z)=A_0+\Delta(z)$ 是"常数矩阵 + 扰动"，正好套用 §2 的积和式加法公式 \sref{F:add}（取 $B=A_0$，$C=\Delta(z)$），并按子集大小 $a=|S|=|T|$ 分层：`}</Tx>
        <Eq>{R`P(t_0+z)=\sum_{a=0}^{n}\sum_{\substack{S,T\subseteq[n]\\|S|=|T|=a}}\per(A_0[S^c,T^c])\,\per(\Delta(z)[S,T]).`}</Eq>
        <Tx>{R`右边每一项是"一个数"（$A_0$ 的 $(n-a)\times(n-a)$ 子矩阵积和式）乘以"一个 $z$ 的多项式"（$\Delta(z)$ 的 $a\times a$ 子矩阵积和式）。后者的每个乘积项由 $a$ 个 $\Delta$ 的元素相乘，每个元素贡献至少一个 $z$，所以 $\per(\Delta(z)[S,T])$ 被 $z^a$ 整除。$j$ 阶导数只关心 $z^j$ 的系数，因此**只有 $a\le j$ 的层有贡献**。写出来就是`}</Tx>
        <Eq n="3.1" keyEq title="导数的子矩阵展开" say={R`$P$ 在 $t_0$ 的 $j$ 阶导数，等于 $j!$ 乘以“$A_0$ 的大子矩阵积和式 × $\Delta(z)$ 的小子矩阵积和式的 $z^j$ 系数”之和；只需枚举大小 $a\le j$ 的行列子集对。`}>{R`P^{(j)}(t_0)=j!\sum_{a=0}^{j}\sum_{\substack{S,T\subseteq[n]\\|S|=|T|=a}}\per(A_0[S^c,T^c])\,[z^j]\,\per(\Delta(z)[S,T]).`}</Eq>
        <Tx>{R`这里 $[z^j]f$ 表示多项式 $f$ 中 $z^j$ 的系数。前面的 $j!$ 来自 Taylor 展开：$P$ 是多项式，所以 $P(t_0+z)=\sum_j\frac{P^{(j)}(t_0)}{j!}z^j$ **精确**成立，从而 $P^{(j)}(t_0)=j!\,[z^j]P(t_0+z)$。对照检查：$j=0$ 时只有 $a=0$ 一层，$\per(\Delta[\varnothing,\varnothing])=1$，给出 $P(t_0)=\per(A_0)$；$j=1$ 时 $a=0$ 层的 $z^1$ 系数为 0，$a=1$ 层的 $[z^1]\Delta_{uv}(z)=A'_{uv}(t_0)$，恰好还原上面的 $P'(t_0)$ 公式。`}</Tx>
        <Box kind="key" title={R`\eqref{3.1} 的意义`}>{R`求导这个**分析**操作，被完全变成了**组合**操作：枚举大小 $<h$ 的行子集 $S$ 与列子集 $T$，对每一对调用一次"大子矩阵积和式"（预言机，单价 $T$），再算一个 $a\times a$ 的小积和式。所有的结构要求都落在 $A_0$ 上，扰动 $\Delta(z)$ 可以是任意的。`}</Box>

        <h3>算法与代价</h3>
        <Tx>{R`对每个 $a<h$ 与每对 $S,T$：用单价 $T$ 算出大的结构化积和式 $\per(A_0[S^c,T^c])$；在**截断多项式环** $\Q[z]/(z^h)$（只保留 $z^0,\dots,z^{h-1}$ 的系数）上用子集 DP 或 Ryser 公式算出小的 $a\times a$ 积和式，代价 $2^{O(a)}\poly(n)$；然后把它对所有 $j<h$ 的贡献累加进 \eqref{3.1}。总代价至多`}</Tx>
        <Eq>{R`T\,\poly(n)\sum_{a<h}2^{O(a)}\binom{n}{a}^2\le T\,\poly(n)\,(n/h)^{O(h)}.`}</Eq>
        <Tx>{R`其中 $\binom na^2$ 是第 $a$ 层子集对的个数（$S$ 与 $T$ **独立**选取）。原文只写出了不等式的结论，下面的证明把它和其余细节补全。`}</Tx>

        <Proof title="引理 3.1 的完整证明" source="原文 pp.5–6；补全步骤标「补全」" steps={[
          { claim: R`**Taylor 展开。**因为 $P$ 是多项式，$P(t_0+z)=\sum_{j\ge0}\frac{P^{(j)}(t_0)}{j!}z^j$ 精确成立，故 $P^{(j)}(t_0)=j!\,[z^j]\,P(t_0+z)$。`, fill: true, why: R`有限和，无收敛问题；在有理数上成立。` },
          { claim: R`**一阶情形。**$P'(t_0)=\sum_{u,v}A'_{uv}(t_0)\,\per(A_0$ 删去第 $u$ 行第 $v$ 列$)$。`, why: R`积和式对每个元素是一次的；链式法则（见上方补全的推导）。它显示导数只需 $A_0$ 的子矩阵积和式。` },
          { claim: R`**增量矩阵。**令 $\Delta(z)=A(t_0+z)-A_0$；每个元素被 $z$ 整除。`, why: R`$\Delta_{uv}(z)$ 是多项式且 $\Delta_{uv}(0)=0$。` },
          { claim: R`**加法公式。**$P(t_0+z)=\per(A_0+\Delta(z))=\sum_{a}\sum_{|S|=|T|=a}\per(A_0[S^c,T^c])\per(\Delta(z)[S,T])$。`, uses: ["F:add"], why: R`取 $B=A_0$、$C=\Delta(z)$；该恒等式只用到交换环的运算，在 $\Q[z]$ 上成立。` },
          { claim: R`**整除性。**$z^a\mid\per(\Delta(z)[S,T])$（$|S|=a$）。`, fill: true, tex: R`\per(\Delta(z)[S,T])=\sum_{\sigma}\prod_{k=1}^{a}\Delta_{s_k\sigma(s_k)}(z),\qquad z\mid\Delta_{s_k\sigma(s_k)}(z)`, why: R`每个乘积项是 $a$ 个被 $z$ 整除的多项式之积。` },
          { claim: R`**式 \eqref{3.1}。**对第 4 步两边取 $[z^j]$ 并乘以 $j!$；由第 5 步，$a>j$ 的层贡献为零。`, uses: ["3.1"], why: R`第 1 步把左边变成 $P^{(j)}(t_0)$。` },
          { claim: R`**单项代价。**每对 $(S,T)$：大积和式 $\per(A_0[S^c,T^c])$ 由假设花时间 $T$；小积和式在 $\Q[z]/(z^h)$ 上用 Ryser 公式需 $O(2^aa^2)$ 次环运算，每次环运算 $O(h^2)$ 次有理运算，合计 $2^{O(a)}\poly(n)$。`, fill: true, why: R`$h\le n$；$\Delta(z)\bmod z^h$ 的元素就是各元素在 $t_0$ 处的前 $h$ 个 Taylor 系数，由"多项式规模的描述与次数"可在 $\poly(n)$ 时间内求出；Ryser 公式只用加减乘，适用于任何交换环。` },
          { claim: R`**总代价。**$\sum_{a<h}\binom na^2\,(T+2^{O(a)}\poly(n))\le T\,\poly(n)\sum_{a<h}2^{O(a)}\binom na^2$。`, why: R`$T\ge1$；对 $j<h$ 的贡献累加只多出 $\poly(n)$ 因子。` },
          { claim: R`**单调性。**因 $a<h\le n/2$，$\binom na\le\binom nh$；于是 $\sum_{a<h}2^{O(a)}\binom na^2\le h\cdot2^{O(h)}\binom nh^2$。`, fill: true, why: R`$\binom n{a+1}/\binom na=\frac{n-a}{a+1}\ge1$ 当且仅当 $a\le\frac{n-1}2$；$h\le n/2$ 保证从 $a=0$ 到 $a=h$ 一路不减。这是 $h\le n/2$ 唯一被用到的地方。` },
          { claim: R`**二项式估计。**$\binom nh\le\frac{n^h}{h!}\le\left(\frac{\mathrm{e}n}{h}\right)^h$。`, fill: true, why: R`$h!\ge(h/\mathrm{e})^h$（由 $\mathrm{e}^h=\sum_kh^k/k!\ge h^h/h!$）。` },
          { claim: R`**吸收常数。**$h\cdot2^{O(h)}\left(\frac{\mathrm{e}n}{h}\right)^{2h}\le(n/h)^{O(h)}$。`, fill: true, tex: R`h\cdot2^{ch}\cdot\mathrm{e}^{2h}\cdot(n/h)^{2h}\ \le\ (n/h)^{h}\cdot(n/h)^{ch}\cdot(n/h)^{2h\log_2\mathrm{e}}\cdot(n/h)^{2h}=(n/h)^{O(h)}`, why: R`由 $h\le n/2$ 得 $n/h\ge2$，所以任何 $2^{xh}\le(n/h)^{xh}$；另有 $h\le2^h$。` },
        ]} />

        <Erratum kind="note" title="为什么必须 $h\le n/2$">{R`这个条件不是装饰。若 $h$ 接近 $n$，子集对总数 $\sum_{a<h}\binom na^2$ 趋于 $\sum_{a=0}^{n}\binom na^2=\binom{2n}{n}\approx4^n/\sqrt{\pi n}$（范德蒙德恒等式），而 $(n/h)^{O(h)}$ 在 $h=n$ 时等于 1——界显然不再成立。$h\le n/2$ 保证 $n/h\ge2$，从而 $2^{O(h)}$ 一类的因子能被 $(n/h)^{O(h)}$ 吸收（证明第 9–11 步）。更精细地，$\log_2\binom nh\approx nH(h/n)$（$H$ 为二元熵），所以子集对个数约为 $2^{2nH(h/n)}$：只有 $h/n$ 小时它才远小于 $2^n$。下方的曲线图把这一点画了出来。`}</Erratum>
        <Box kind="note" title="“时间”与“算术运算”"><Tx>{R`\sref{L2.1} 数的是**算术运算**次数，本引理说的是**时间**。两者相差每次运算的位代价：所有数都是多项式规模的有理数（输入描述与次数多项式有界；$n\times n$ 积和式的位长至多是元素位长的 $n$ 倍再加 $O(n\log n)$），所以每次运算 $\poly(n)$ 时间，这个因子被 $\poly(n)$ 吸收。`}</Tx></Box>
      </Stmt>

      <DerivDemo />
    </Sec>);
}
