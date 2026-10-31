// §3.1 Recovering the value at zero —— Hermite 插值、命题 3.2 及证明、过渡段（原文 p.6）
import { Sec, Eq, Box, C, TxI, Stmt, Proof, Erratum, Tx } from "@kit";
import { HermiteDemo, CostPlot } from "./_ch03_demos.jsx";

const R = String.raw;

export function Sec31() {
  return (
    <Sec n="3.1" title="Recovering the value at zero" zh="恢复零点处的值"
      gist={R`$\deg P\le nd$；在 $\ell$ 个点各取 $0,\dots,h-1$ 阶导数，$\ell h>nd$ 时 Hermite 插值唯一确定 $P$，读出 $P(0)=\per(A)$。取 $h=\lfloor nd/\ell\rfloor+1$，总时间为 \eqref{3.2}。`}
      why={R`\sref{L3.1} 只给出"一个点上的局部信息"；要得到 $t=0$ 处的值，必须把 $\ell$ 个点的信息拼成整个多项式，并核算信息量够不够。`}
      gives={["3.2"]}>
      <p className="muted">本节概念：<C id="hermite" /> · <C id="budget" /> · <C id="separation" /></p>

      <Tx>{R`**信息量核算。**若 $A(t)$ 的每个元素次数至多 $d$，则 $\per(A(t))$ 的每个乘积项是 $n$ 个这样的元素之积，于是 $\deg P\le nd$。一个次数 $\le nd$ 的多项式有 $nd+1$ 个未知系数。\sref{L3.1} 在每个点给出 $h$ 个数，$\ell$ 个点共 $\ell h$ 个数——只要 $\ell h>nd$，信息量就够了。

但"个数够"还不等于"唯一确定"：还要说明这 $\ell h$ 个数据确实能把多项式钉死。这就是 **Hermite 插值**（Hermite interpolation）：Lagrange 插值的推广，允许在同一点上同时给出函数值和若干阶导数。`}</Tx>

      <Stmt id="F:hermite">
        <Tx>{R`原文的唯一性论证只有一句话：两个候选多项式之差会被`}</Tx>
        <Eq>{R`\prod_{i=1}^{\ell}(t-i)^h`}</Eq>
        <Tx>{R`整除，因而为零；求解相应的非奇异线性方程组就是普通的 Hermite 插值。下面把这两句话展开。`}</Tx>
        <Proof title="Hermite 插值的唯一性与可计算性" steps={[
          { claim: R`设 $P_1,P_2$ 都满足 $\deg<\ell h$，且在每个 $i\in[\ell]$ 处 $0,\dots,h-1$ 阶导数相同。令 $D=P_1-P_2$，则 $\deg D<\ell h$，且 $D^{(j)}(i)=0$（$j<h$，$i\in[\ell]$）。`, fill: true, why: R`求导是线性的。` },
          { claim: R`对每个 $i$：$(t-i)^h\mid D$。`, fill: true, tex: R`D(t)=\sum_{k\ge0}\frac{D^{(k)}(i)}{k!}(t-i)^k=\sum_{k\ge h}\frac{D^{(k)}(i)}{k!}(t-i)^k`, why: R`在 $t=i$ 处的 Taylor 展开（多项式，精确成立）；前 $h$ 项系数为零。` },
          { claim: R`$\prod_{i=1}^{\ell}(t-i)^h\mid D$。`, fill: true, why: R`不同的 $i$ 给出两两互素的因子 $(t-i)^h$；$\Q[t]$ 是唯一分解整环。` },
          { claim: R`$D=0$。`, why: R`非零多项式不能被次数比它高的多项式整除：$\deg\prod_i(t-i)^h=\ell h>\deg D$。` },
          { claim: R`**线性方程组。**记 $N=\ell h$，未知数为系数 $c_0,\dots,c_{N-1}$；数据给出 $N$ 个方程：`, fill: true, tex: R`P^{(j)}(i)=\sum_{k=j}^{N-1}\frac{k!}{(k-j)!}\,c_k\,i^{\,k-j}\qquad(i\in[\ell],\ 0\le j<h)`, why: R`对 $\sum_kc_kt^k$ 逐项求 $j$ 阶导数再代入 $t=i$。` },
          { claim: R`这个 $N\times N$ 系数矩阵（**合流 Vandermonde 矩阵**，confluent Vandermonde）非奇异，于是高斯消元在 $\poly(N)$ 次有理运算内求出唯一解。`, fill: true, why: R`若 $Mc=0$ 有非零解，对应的非零多项式在所有点的 $0,\dots,h-1$ 阶导数都为零，与第 1–4 步矛盾。方阵的单射即可逆。` },
        ]} />
      </Stmt>

      <Tx>{R`把 \sref{L2.1}（特殊点上的引擎）、\sref{L3.1}（导数）和 Hermite 插值串在一起，就得到本页的主结论。`}</Tx>

      <Stmt id="P3.2">
        <Eq n="3.2" keyEq title="算法部分的总代价" say={R`恢复 $\per(A)$ 的总时间：多项式因子 × 块大小带来的 $2^{O(s)}$ × 低秩带来的 $n^{O(r)}$ × 导数枚举带来的 $(n/h)^{O(h)}$；三者都写成 2 的幂后，指数相加。`}>{R`\poly(n)\,2^{O(s)}n^{O(r)}(n/h)^{O(h)}=\poly(n)\,2^{O(s+r\log n+h\log(n/h))}`}</Eq>
        <Tx>{R`读这个式子：三个指数项各有来源。$s$ 来自 \sref{L2.1} 中每块枚举 $2^{2s}$ 个 $(S,T)$；$r\log n$ 来自颜色计数表的 $(n+1)^{2r}$ 个状态；$h\log(n/h)$ 来自 \sref{L3.1} 的子集对枚举。要让总时间是 $2^{o(n)}$，三者都必须是 $o(n)$——§4 负责 $s$，§5 负责 $r$ 与 $d$（从而 $h$），§6 把账算平。`}</Tx>
        <Proof title="命题 3.2 的证明" source="原文 p.6；补全步骤标「补全」" steps={[
          { claim: R`固定特殊点 $i\in[\ell]$。$A(i)=B_i+E_i$，$B_i$ 的块大小 $\le s$，$\rank E_i\le r$；所以 $A(i)$ 的**每个方子矩阵**的积和式都能在 $T=\poly(n)\,2^{O(s)}n^{O(r)}$ 次运算内算出。`, uses: ["L2.1"], why: R`\sref{L2.1} 明确覆盖每个方子矩阵：删去行列保持块划分、不增加秩。` },
          { claim: R`在 $t_0=i$ 处用 \sref{L3.1}，算出 $P(i),P'(i),\dots,P^{(h-1)}(i)$，时间 $T\,\poly(n)\,(n/h)^{O(h)}$。`, uses: ["L3.1"], why: R`假设 $1\le h\le n/2$；元素是次数 $\le d$（多项式有界）、系数多项式规模的多项式。` },
          { claim: R`对全部 $\ell$ 个点重复，时间乘以 $\ell$。`, why: R`$\ell$ 多项式有界，并入 $\poly(n)$。` },
          { claim: R`$\ell h>nd\ge\deg P$。`, fill: true, tex: R`\ell h=\ell\left(\left\lfloor\frac{nd}{\ell}\right\rfloor+1\right)>\ell\cdot\frac{nd}{\ell}=nd`, why: R`$\lfloor x\rfloor+1>x$；$\deg P\le nd$ 因为每个乘积项是 $n$ 个次数 $\le d$ 的元素之积。` },
          { claim: R`Hermite 插值恢复 $P$ 的全部系数，读出 $P(0)=\per(A(0))=\per(A)$。`, uses: ["F:hermite"], why: R`$\ell h\times\ell h$ 线性方程组，$\ell h\le\ell(nd+1)$ 多项式有界，所以插值只花多项式时间。` },
          { claim: R`合计：$\ell\cdot T\,\poly(n)\,(n/h)^{O(h)}+\poly(n)=\poly(n)\,2^{O(s)}n^{O(r)}(n/h)^{O(h)}$；再写成 2 的幂即得 \eqref{3.2}。`, fill: true, tex: R`n^{O(r)}=2^{O(r\log n)},\qquad (n/h)^{O(h)}=2^{O(h\log(n/h))}`, why: R`$x^y=2^{y\log_2x}$；三个 $2^{O(\cdot)}$ 相乘时指数相加。` },
        ]} />
        <Erratum kind="note" loc="p.6 命题 3.2" title="$h\le n/2$ 是一个渐近条件">
          <Tx>{R`命题要求 $h=\lfloor nd/\ell\rfloor+1\le n/2$，这大致就是 $d/\ell\le1/2$。在 §6 的参数 \eqref{6.1} 下 $d=\lceil100\sqrt{\ell\log\ell}\rceil$，所以 $d/\ell\approx100\sqrt{\log\ell/\ell}\to0$，条件对充分大的 $n$ 成立；但常数 100 让"充分大"非常大——按 \eqref{6.1} 逐项代入，大约要 $\log_2n\gtrsim5\times10^8$ 时才有 $d/\ell\le1/2$。这与论文的渐近陈述完全一致（所有界都是 $n\to\infty$ 的），只是提醒读者：这里的 $h\le n/2$ 不能在小规模上验证。`}</Tx>
          <p>可以在第 6 页的 <a href="#/ch06">参数账本</a> 里<TxI>{R`拖动 $\log_2 n$，查看条件「$h\le n/2$」何时变绿。`}</TxI></p>
        </Erratum>
        <Box kind="warning" title="易错：'特殊点'不包括 0">
          <Tx>{R`插值节点是 $t=1,\dots,\ell$，我们**从不在 $t=0$ 求值**——$A(0)=A$ 本身没有结构，那里的积和式正是要求的东西。插值完成后 $P(0)$ 只是把已知系数代入 $t=0$：$P(0)=c_0$。`}</Tx>
        </Box>
      </Stmt>

      <HermiteDemo />

      <h3>小结：算法任务与代数任务分家</h3>
      <Tx>{R`原文用一句话结束本节：我们已经把**算法任务**与**代数任务**分开了。剩下的只是：构造一个 $A(t)$，它在许多点上取结构化的值，而且 $d/\ell$ 很小。

为什么是 $d/\ell$？因为 $h\approx nd/\ell$，所以 $h/n\approx d/\ell$，而 \eqref{3.2} 中的导数项是 $2^{O(h\log(n/h))}=2^{O(n\cdot\frac d\ell\log\frac\ell d)}$。只要 $d/\ell\to0$，这一项就是 $2^{o(n)}$。下面的曲线图把"子集对个数"与 $2^n$ 放在同一把尺子上比较。`}</Tx>
      <CostPlot />
      <Box kind="physics" title="直观图景：两个旋钮">
        <Tx>{R`可以把 \sref{P3.2} 想成一台机器，前面板上有两组旋钮：**结构旋钮** $(s,r)$——特殊点上的矩阵有多"好"；**次数旋钮** $d/\ell$——多项式族有多"平缓"。§4 的标号与分解把 $s$ 压到 $3n/q$；§5 的局部矩阵多项式 $J(t)$ 把 $d$ 压到 $O(\sqrt{\ell\log\ell})$，代价是一个秩很小的误差 $r$。两组旋钮互相牵制，§6 选参数 \eqref{6.1} 让三者同时为 $o(n)$。`}</Tx>
      </Box>
    </Sec>);
}
