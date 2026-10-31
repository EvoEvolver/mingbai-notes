// 第 5 页：§5.2 三个基本矩阵（Hadamard 换基）与 §5.3 奇偶插值多项式。
import { Sec, Tx, Eq, Box, Stmt, Proof, Erratum } from "@kit";
import { ParityTail } from "./_ch05_demos.jsx";
const R = String.raw;

export function Sec52() {
  return (
    <Sec n="5.2" title="Three elementary matrices" zh="三个基本矩阵"
      gist={R`$HZH=X$；共轭 $M\mapsto H_\ell MH_\ell$ 是代数同态，把 $Z_j$ 的多项式变成 $X_j$ 的多项式；函数 $g$ ↔ 对角阵 $D_g$；不依赖第 $i$ 位 ⇒ $i$-好；秩 = 不相等的输入数。`}
      why={R`§5.1 的障碍说明不能要求处处精确；我们需要一种语言，把"两个函数只在少数输入上不同"翻译成"两个矩阵相差低秩"。`}
      gives={["5.1", "5.2", "5.3", "5.4"]}>
      <Tx>{R`**三个 $2\times2$ 矩阵。** 翻转矩阵 $X$（Pauli $X$）、符号矩阵 $Z$（Pauli $Z$）与 Hadamard 矩阵 $H$：`}</Tx>
      <Eq say={R`$X$ 交换两个基向量（翻转一位）；$Z$ 给第二个基向量乘 $-1$（读出这一位的 $\pm1$ 符号）；$H$ 是归一化的 $2\times2$ Walsh 矩阵。`}>{R`X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.`}</Eq>
      <Tx>{R`直接相乘即得`}</Tx>
      <Eq say={R`$H$ 是自身的逆；用 $H$ 共轭，把对角的 $Z$ 变成翻转的 $X$。`}>{R`H^2=I_2,\qquad HZH=X.`}</Eq>
      <Tx>{R`对 $j\in[\ell]$，令 $X_j$、$Z_j$ 只作用在第 $j$ 个张量因子上：`}</Tx>
      <Eq say={R`$X_j$ 只翻转第 $j$ 位、其余位不动；$Z_j$ 只读第 $j$ 位的符号 $(-1)^{b_j}$，是对角阵。`}>{R`X_j=I_2^{\otimes(j-1)}\otimes X\otimes I_2^{\otimes(\ell-j)},\qquad Z_j=I_2^{\otimes(j-1)}\otimes Z\otimes I_2^{\otimes(\ell-j)}.`}</Eq>
      <Tx>{R`各 $X_j$ 两两可交换（它们作用在不同的因子上），$X_j$ 翻转第 $j$ 位而保持其余位；乘积 $X_1X_2\cdots X_\ell=X^{\otimes\ell}$ 翻转所有位。令 $H_\ell=H^{\otimes\ell}$，则`}</Tx>
      <Eq n="5.1" keyEq title="Hadamard 共轭" say={R`$\ell$ 位的 Hadamard 变换把“读第 $j$ 位符号”变成“翻转第 $j$ 位”，把“读全部符号之积”变成“翻转全部位”。`}>{R`H_\ell Z_jH_\ell=X_j,\qquad H_\ell Z^{\otimes\ell}H_\ell=X^{\otimes\ell}.`}</Eq>
      <Tx>{R`由此，对任何多项式 $p$ 与标量 $c_j$，`}</Tx>
      <Eq n="5.2" keyEq title="多项式的共轭" say={R`对 $Z_j$ 的线性组合取多项式（一个对角阵），再用 $H_\ell$ 共轭，等于对 $X_j$ 的同一个线性组合取同一个多项式：可以在对角的世界里分析，在翻转的世界里构造。`}>{R`H_\ell\,p\Big(\sum_jc_jZ_j\Big)H_\ell=p\Big(\sum_jc_jX_j\Big).`}</Eq>
      <Tx>{R`这只是"共轭保持加法与乘法"。**函数作为对角矩阵**（functions as diagonal matrices）：对 $g:\{-1,1\}^\ell\to\R$，定义对角阵 $D_g$：`}</Tx>
      <Eq say={R`把函数 $g$ 的 $2^\ell$ 个取值依次摆上对角线：二进制指标 $b$ 对应符号向量 $((-1)^{b_1},\dots,(-1)^{b_\ell})$。`}>{R`D_g[b,b]=g\big((-1)^{b_1},\dots,(-1)^{b_\ell}\big),\qquad b\in\{0,1\}^\ell.`}</Eq>
      <Tx>{R`$Z_1,\dots,Z_\ell$ 的联合对角元恰好不重不漏地走遍 $\{-1,1\}^\ell$。于是把 $g$ 写成多线性多项式后代入，`}</Tx>
      <Eq say={R`对角阵 $D_g$ 就是把 $g$ 的多线性展开中的 $x_j$ 换成 $Z_j$；再用 $H_\ell$ 共轭，就是把 $x_j$ 换成 $X_j$。`}>{R`D_g=g(Z_1,\dots,Z_\ell),\qquad H_\ell D_gH_\ell=g(X_1,\dots,X_\ell).`}</Eq>
      <Tx>{R`后面要用两个事实。第一，若 $g$ 不依赖第 $i$ 个坐标，把该坐标移到最前之后 $D_g=I_2\otimes D_{g'}$（$g'$ 是 $g$ 在其余 $\ell-1$ 个坐标上的限制），从而`}</Tx>
      <Eq n="5.3" title="不依赖第 i 位 ⇒ i-好" say={R`不看第 $i$ 位的函数，换基后仍然在第 $i$ 个因子上是恒等——正是 $i$-好的形式 $I_2\otimes B$。`}>{R`H_\ell D_gH_\ell=I_2\otimes(H_{\ell-1}D_{g'}H_{\ell-1}),`}</Eq>
      <Tx>{R`它是 $i$-好的（\sref{D4.2}）。第二，因为 $H_\ell$ 可逆，`}</Tx>
      <Eq n="5.4" keyEq title="秩 = 不一致的输入数" say={R`两个函数换基后的差矩阵，其秩恰好等于它们取值不同的输入个数：在多数输入上相等 ⇔ 相差一个低秩矩阵。`}>{R`\rank\big(H_\ell(D_g-D_h)H_\ell\big)=|\{x\in\{-1,1\}^\ell:g(x)\ne h(x)\}|.`}</Eq>
      <Tx>{R`换言之：**在大多数输入上相等，经过一次换基，就成了相差一个低秩矩阵。** 下面的登记陈述把这三件事收在一起。`}</Tx>
      <Stmt id="F:hadamard">
        <Proof title={R`式 \eqref{5.1}–\eqref{5.4}`} steps={[
          { claim: R`$H^2=I_2$ 且 $HZH=X$。`, tex: R`HZ=\tfrac1{\sqrt2}\begin{pmatrix}1&-1\\1&1\end{pmatrix},\qquad HZH=\tfrac12\begin{pmatrix}1-1&1+1\\1+1&1-1\end{pmatrix}=\begin{pmatrix}0&1\\1&0\end{pmatrix}.`, why: R`直接相乘；$H^2=\frac12\begin{pmatrix}2&0\\0&2\end{pmatrix}=I_2$ 同理。`, fill: true },
          { claim: R`\eqref{5.1}：由混合乘积律 $(A\otimes B)(C\otimes D)=AC\otimes BD$ 逐因子计算。`, tex: R`H_\ell Z_jH_\ell=(HI_2H)^{\otimes(j-1)}\otimes HZH\otimes(HI_2H)^{\otimes(\ell-j)}=I_2^{\otimes(j-1)}\otimes X\otimes I_2^{\otimes(\ell-j)}=X_j,`, why: R`$HI_2H=H^2=I_2$；同理 $H_\ell Z^{\otimes\ell}H_\ell=(HZH)^{\otimes\ell}=X^{\otimes\ell}$。`, fill: true },
          { claim: R`\eqref{5.2}：映射 $\varphi(M)=H_\ell MH_\ell$ 是代数同态：$\varphi(M+N)=\varphi(M)+\varphi(N)$，$\varphi(cM)=c\varphi(M)$，$\varphi(I)=I$，且`, tex: R`\varphi(M)\varphi(N)=H_\ell MH_\ell H_\ell NH_\ell=H_\ell MNH_\ell=\varphi(MN),`, why: R`$H_\ell^2=(H^2)^{\otimes\ell}=I$。于是对任意多项式 $p$，$\varphi(p(M))=p(\varphi(M))$；取 $M=\sum_jc_jZ_j$，由 \eqref{5.1} 得 $\varphi(M)=\sum_jc_jX_j$。`, fill: true },
          { claim: R`$D_g=g(Z_1,\dots,Z_\ell)$。把 $g$ 写成唯一的多线性展开 $g(x)=\sum_{S\subseteq[\ell]}\hat g(S)\prod_{j\in S}x_j$。每个 $Z_j$ 是对角阵，$Z_j[b,b]=(-1)^{b_j}$，所以 $\sum_S\hat g(S)\prod_{j\in S}Z_j$ 是对角阵，其 $[b,b]$ 元为 $g((-1)^{b_1},\dots,(-1)^{b_\ell})=D_g[b,b]$。`, why: R`对角阵的多项式逐元素计算；用多线性展开是自洽的，因为 $Z_j^2=I$ 恰对应 $x_j^2=1$。`, fill: true },
          { claim: R`$H_\ell D_gH_\ell=g(X_1,\dots,X_\ell)$。`, why: R`把第 3 步的同态性用于多元多项式 $\sum_S\hat g(S)\prod_{j\in S}Z_j$，并用 $\varphi(Z_j)=X_j$。`, fill: true },
          { claim: R`\eqref{5.3}：若 $g$ 不依赖坐标 $i$，其展开中只出现 $S\not\ni i$ 的项。把第 $i$ 个张量因子移到最前（这是一个置换相似 $P$；由于 $H_\ell$ 的各因子相同，$PH_\ell P^{\mathsf T}=H_\ell$），则 $D_g=I_2\otimes D_{g'}$，`, tex: R`H_\ell D_gH_\ell=(H\otimes H_{\ell-1})(I_2\otimes D_{g'})(H\otimes H_{\ell-1})=H^2\otimes H_{\ell-1}D_{g'}H_{\ell-1}=I_2\otimes(H_{\ell-1}D_{g'}H_{\ell-1}).`, why: R`这正是 \sref{D4.2} 的 $I_2\otimes B$ 形式，故为 $i$-好的。`, uses: ["D4.2"], fill: true },
          { claim: R`\eqref{5.4}：$H_\ell$ 可逆，左右乘可逆阵不改变秩，所以 $\rank(H_\ell(D_g-D_h)H_\ell)=\rank(D_g-D_h)$。对角阵的秩是非零对角元的个数，即 $g\ne h$ 的 $b$ 的个数；$b\mapsto x=((-1)^{b_1},\dots,(-1)^{b_\ell})$ 是 $\{0,1\}^\ell\to\{-1,1\}^\ell$ 的双射。`, fill: true },
        ]} />
      </Stmt>
      <Box kind="warning" title="秩只数个数，不看大小">{R`\eqref{5.4} 的右边是**个数**：$g$ 与 $h$ 在某个输入上差 $10^{-9}$ 还是差 $10^{9}$，对秩的贡献都是 1。因此"处处近似相等"（一致逼近）在这里毫无用处——只要每个输入都差一点点，差矩阵就是满秩的。我们需要的是"**在一个小例外集之外精确相等**"。`}</Box>
      <Box kind="note" title={R`$1/\sqrt2$ 只在证明中出现`}>{R`算法本身从不使用 $H$：它直接按 \eqref{5.7} 用有理矩阵 $X_j$ 计算。$H_\ell$ 只是分析 $E$ 的秩时的"眼镜"。实际验证时可以用 $\pm1$ 的 Walsh 矩阵 $W=\sqrt2^{\,\ell}H_\ell$，因为 $H_\ell MH_\ell=WMW/2^\ell$（见 §5.4 的示例）。`}</Box>
    </Sec>);
}

export function Sec53() {
  return (
    <Sec n="5.3" title="A polynomial agreeing with parity on most inputs" zh="在绝大多数输入上等于奇偶性的多项式"
      gist={R`$\chi(x)=x_1\cdots x_\ell=(-1)^k$ 只依赖负坐标个数 $k$；在以 $\ell/2$ 为中心的 $d+1$ 个 $k$ 上插值 $p(\ell-2k)=(-1)^k$，二项尾界给出失败概率 $\le2e^{-d^2/8\ell}\le\ell^{-100}$。`}
      why={R`由 \eqref{5.4}，$E$ 的秩将等于 $p(\sum x_j)\ne\chi(x)$ 的输入数；所以需要一个低次 $p$，在几乎所有输入上与奇偶精确相等。`}
      gives={["5.5", "5.6"]}>
      <Tx>{R`令 $\chi(x)=x_1\cdots x_\ell$ 为**奇偶函数**（parity），$x\in\{-1,1\}^\ell$。若 $x$ 恰有 $k$ 个负坐标，则`}</Tx>
      <Eq say={R`坐标和与奇偶都只依赖负坐标的个数 $k$：和是 $\ell-2k$，奇偶是 $(-1)^k$。`}>{R`x_1+\cdots+x_\ell=\ell-2k,\qquad \chi(x)=(-1)^k.`}</Eq>
      <Tx>{R`所以"关于 $\sum_jx_j$ 的单变量多项式"就足以描述奇偶：只要在点 $z=\ell-2k$ 上让 $p(z)=(-1)^k$。要对全部 $\ell+1$ 个 $k$ 都对，必须 $\ell$ 次（$p$ 要在 $\ell+1$ 个点上交替变号）；但我们只要求在**中间**的若干层上对。取`}</Tx>
      <Eq say={R`次数选择：比 $\sqrt\ell$ 多一个 $\sqrt{\log\ell}$ 因子，常数 100 留有充足余量。`}>{R`d=\lceil100\sqrt{\ell\log\ell}\rceil.`}</Eq>
      <Tx>{R`对充分大的 $\ell$，在以 $\ell/2$ 为中心的 $d+1$ 个连续整数 $k$ 上插值`}</Tx>
      <Eq n="5.5" keyEq title="奇偶插值" say={R`在中间 $d+1$ 层上，令单变量多项式 $p$ 在坐标和 $\ell-2k$ 处等于奇偶 $(-1)^k$；$d+1$ 个条件确定唯一一个次数 $\le d$ 的 $p$。`}>{R`p(\ell-2k)=(-1)^k`}</Eq>
      <Tx>{R`得到次数至多 $d$ 的 $p\in\Q[z]$。所选区间包含所有满足 $|k-\ell/2|\le d/4$ 的整数 $k$。对均匀随机的 $x$，负坐标个数服从 $\Bin(\ell,1/2)$，于是初等的二项尾界给出`}</Tx>
      <Eq n="5.6" keyEq title="例外概率" say={R`随机输入落在插值窗口之外（从而 $p$ 可能不等于奇偶）的概率，被 Hoeffding 尾界 $2\exp(-d^2/8\ell)$ 控制，而 $d$ 的取法使它不超过 $\ell^{-100}$。`}>{R`\Pr_x\Big[p\Big(\sum_jx_j\Big)\ne\chi(x)\Big]\le2\exp\Big(-\frac{d^2}{8\ell}\Big)\le\ell^{-100}.`}</Eq>
      <Stmt id="F:parity">
        <Proof title={R`式 \eqref{5.5}–\eqref{5.6}`} steps={[
          { claim: R`若 $x\in\{-1,1\}^\ell$ 恰有 $k$ 个 $-1$，则 $\sum_jx_j=(\ell-k)-k=\ell-2k$，$\chi(x)=(-1)^k$。`, fill: true },
          { claim: R`取窗口 $k_0=\lceil(\ell-d)/2\rceil$，$\mathcal W=\{k_0,k_0+1,\dots,k_0+d\}$（需 $d\le\ell$ 才落在 $\{0,\dots,\ell\}$ 内——这就是"充分大 $\ell$"）。节点 $z_k=\ell-2k$ 互不相同，Lagrange 插值给出唯一的 $p$，$\deg p\le d$，满足 \eqref{5.5}。`, tex: R`p(z)=\sum_{k\in\mathcal W}(-1)^k\prod_{k'\in\mathcal W,\,k'\ne k}\frac{z-(\ell-2k')}{2(k'-k)}.`, why: R`节点是整数、取值是 $\pm1$，第 $k$ 个基函数的分母是 $\prod_{k'\ne k}2|k'-k|=2^d(k-k_0)!\,(k_0+d-k)!$，整除 $2^dd!$；分子是至多 $d$ 个 $O(\log\ell)$ 比特整数之积。系数比特长度 $O(d\log\ell)$——多项式比特。`, fill: true },
          { claim: R`窗口包含所有 $|k-\ell/2|\le d/4$ 的整数 $k$（$d\ge2$ 时）。`, tex: R`k_0\le\frac{\ell-d+1}{2},\quad k_0+d\ge\frac{\ell+d}{2}\ \Longrightarrow\ \mathcal W\supseteq\Big[\frac\ell2-\frac{d-1}2,\ \frac\ell2+\frac d2\Big]\supseteq\Big[\frac\ell2-\frac d4,\ \frac\ell2+\frac d4\Big].`, why: R`最后一步即 $(d-1)/2\ge d/4\iff d\ge2$。`, fill: true },
          { claim: R`若 $p(\sum_jx_j)\ne\chi(x)$，则 $x$ 的负坐标数 $k\notin\mathcal W$，从而 $|k-\ell/2|>d/4$。`, why: R`在窗口内 $p(\ell-2k)=(-1)^k$ 精确成立（第 1、2 步）。` },
          { claim: R`$x$ 均匀随机时各坐标独立、各以 $1/2$ 概率为 $-1$，故 $k\sim\Bin(\ell,1/2)$。Hoeffding 不等式（$\ell$ 个取值于 $[0,1]$ 的独立变量之和）给出`, tex: R`\Pr\big[|k-\ell/2|\ge s\big]\le2\exp\!\big(-2s^2/\ell\big)\ \xrightarrow{\ s=d/4\ }\ 2\exp\!\Big(-\frac{2(d/4)^2}{\ell}\Big)=2\exp\Big(-\frac{d^2}{8\ell}\Big).`, why: R`原文只说"初等二项尾界"；这里写出所用的具体不等式。`, fill: true },
          { claim: R`代入 $d\ge100\sqrt{\ell\log\ell}$：`, tex: R`\frac{d^2}{8\ell}\ge1250\log_2\ell=\frac{1250}{\ln2}\ln\ell>1803\ln\ell\ \Longrightarrow\ 2e^{-d^2/8\ell}\le2\ell^{-1803}\le\ell^{-100}\quad(\ell\ge2).`, why: R`取 $\log=\log_2$；若 $\log$ 指自然对数，则得 $2\ell^{-1250}$，结论相同。`, fill: true },
        ]} />
      </Stmt>
      <Box kind="warning" title="例外集外精确相等，而不是一致逼近">{R`在窗口外的 $k$ 上，$p(\ell-2k)$ 与 $(-1)^k$ 可以相差极大——下面示例中取 $\ell=60$、$c=1$（$d=19$）时 $\max|p|\approx5\times10^{16}$。这无关紧要：\eqref{5.4} 只数不相等的输入个数。Lagrange 插值在整数点 \eqref{5.5} 上给出的系数是有理数，比特长度为多项式。`}</Box>
      <Erratum kind="note" title="常数 100 有很大余量" loc={R`p.11 (5.6)`}>{R`若取 $d=\lceil c\sqrt{\ell\log_2\ell}\rceil$，则 $d^2/8\ell\ge\frac{c^2}{8\ln2}\ln\ell$；要 $2e^{-d^2/8\ell}\le\ell^{-100}$，只需 $\frac{c^2}{8\ln2}\ge100+\log_\ell2$，即 $c\ge\sqrt{800\ln2}\approx23.6$ 再加一点余量（$c=24$ 对所有 $\ell\ge2$ 都够）。一般地，把指数 100 换成 $A$，取 $c=\sqrt{8(A+1)\ln2}$ 即可——这就是定理所说"只改变次数界中的常数"。此外 Hoeffding 只用了窗口半宽 $d/4$，而实际窗口半宽约 $d/2$，真实尾概率还要小得多（见下方示例的精确值）。`}</Erratum>
      <ParityTail />
    </Sec>);
}
