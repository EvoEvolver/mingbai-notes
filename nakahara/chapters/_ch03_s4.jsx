// §3.4 同调群的一般性质 —— 式 (3.52)–(3.57)，定理 3.6–3.7，推论 3.1，定义 3.6
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Erratum, Derivation, C } from "@kit";
import { HomologyLab } from "./_ch03_demos.jsx";

const R = String.raw;

export function Sec34() {
  return (
    <Sec n="3.4" title="General properties of homology groups" zh="同调群的一般性质"
      gist={R`同调按连通分支直和分解，$H_0\cong\mathbb{Z}^{N}$ 数分支；$H_r$ = 自由部分 $\oplus$ **挠子群**，挠只有整数系数看得见；**Betti 数** $b_r=\dim H_r(K;\mathbb{R})$；**Euler–Poincaré 定理** $\sum(-1)^rI_r=\sum(-1)^rb_r$。`}
      why={R`前面是一个一个地算；这一节提炼出对所有复形都成立的结构性结论，并把同调群和本章开头的 Euler 示性数接上。`}
      gives={["3.52", "3.53", "3.54", "3.55", "3.56", "3.57"]}>
      <Sub n="3.4.1" title="Connectedness and homology groups" zh="连通性与同调群">
        <p className="muted">本小节概念：<C id="betti_euler" /></p>
        <Tx>{R`设 $K=\{p_0\}$、$L=\{p_0,p_1\}$。由例 3.6 与习题 3.1，$H_0(K)=\mathbb{Z}$、$H_0(L)=\mathbb{Z}\oplus\mathbb{Z}$。一般地有：`}</Tx>
        <Stmt id="T3.6">
          <Eq n="3.52" say="不相交的几块各自算同调，再直和起来：同调群对连通分支是可加的。">{R`H_r(K)=H_r(K_1)\oplus H_r(K_2)\oplus\cdots\oplus H_r(K_N).`}</Eq>
          <Proof steps={[
            { claim: R`链群按分支直和分解。设 $C_r(K)=\{\sum_{i=1}^{I_r}c_i\sigma_{r,i}\mid c_i\in\mathbb{Z}\}$，$I_r$ 为 $K$ 中（线性无关的）$r$ 单形个数。把 $\sigma_{r,i}$ 重新排序，使属于 $K_1$ 的在前、$K_2$ 的其次……于是`, tex: R`C_r(K)=C_r(K_1)\oplus C_r(K_2)\oplus\cdots\oplus C_r(K_N)` },
            { claim: R`$\partial$ 不跨分支：$K_i$ 中单形的面仍在 $K_i$ 中，所以 $\partial_rC_r(K_i)\subset C_{r-1}(K_i)$——边界矩阵是**分块对角**的。`, fill: true, why: R`复形的条件 (i) 加上 $K_i\cap K_j=\emptyset$。` },
            { claim: R`因而核与像都按分支分解：`, tex: R`\begin{aligned}Z_r(K)&=Z_r(K_1)\oplus Z_r(K_2)\oplus\cdots\oplus Z_r(K_N)\\ B_r(K)&=B_r(K_1)\oplus B_r(K_2)\oplus\cdots\oplus B_r(K_N)\end{aligned}`, why: R`$c=\sum_ic^{(i)}$（$c^{(i)}\in C_r(K_i)$）满足 $\partial c=0$ ⇔ 每个 $\partial c^{(i)}=0$（它们落在不同的直和项里）；$\partial d$ 的第 $i$ 分量 $=\partial d^{(i)}$。` },
            { claim: R`对每个分支定义 $H_r(K_i)=Z_r(K_i)/B_r(K_i)$，良定义因为 $Z_r(K_i)\supset B_r(K_i)$。`, uses: ["T3.3"] },
            { claim: R`商与直和交换（分子、分母按同一分解拆开）：`, tex: R`\begin{aligned}H_r(K)&=Z_r(K)/B_r(K)=Z_r(K_1)\oplus\cdots\oplus Z_r(K_N)/B_r(K_1)\oplus\cdots\oplus B_r(K_N)\\ &=\{Z_r(K_1)/B_r(K_1)\}\oplus\cdots\oplus\{Z_r(K_N)/B_r(K_N)\}=H_r(K_1)\oplus\cdots\oplus H_r(K_N)\end{aligned}`, why: R`同态 $\sum_iz^{(i)}\mapsto([z^{(1)}],\ldots,[z^{(N)}])$ 是满射，核恰为 $\bigoplus_iB_r(K_i)$，再用同态基本定理。`, uses: ["T3.1"] },
          ]} />
        </Stmt>
        <Stmt id="C3.1">
          <Eq n="3.53" title={R`$H_0$ 数连通分支`} say="零维同调群的秩就是连通分支的个数：每个分支贡献一份整数。">{R`H_0(K)\cong\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{N\text{ 个}}.`}</Eq>
          <Proof steps={[
            { claim: R`(a) 对每个连通分支 $K_i$ 有 $H_0(K_i)\cong\mathbb{Z}$，代入 \eqref{3.52}。`, uses: ["T3.5", "T3.6"] },
            { claim: R`(b) 若 $K$ 有 $N$ 个分支，则 $H_0(K)\cong\mathbb{Z}^N$；$\mathbb{Z}^N\cong\mathbb{Z}$ 迫使 $N=1$。`, why: R`自由 Abel 群的秩是同构不变量：张量 $\mathbb{R}$（或模 2）后比较维数即可。`, fill: true },
          ]} />
        </Stmt>
      </Sub>

      <Sub n="3.4.2" title="Structure of homology groups" zh="同调群的结构">
        <p className="muted">本小节概念：<C id="torsion" /> · <C id="fg_abelian" /></p>
        <Tx>{R`$Z_r(K)$ 与 $B_r(K)$ 是自由 Abel 群 $C_r(K)$ 的子群，所以也是自由 Abel 群（\sref{L3.2}）。但这**不**意味着商 $H_r(K)=Z_r(K)/B_r(K)$ 也是自由的。按 \sref{T3.2}，$H_r(K)$ 最一般的形式是`}</Tx>
        <Eq n="3.54" keyEq title="同调群的结构" say={R`任何同调群都是 $f$ 份整数（自由部分）加上若干有限循环群（挠子群）。`}>{R`H_r(K)\cong\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{f}\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}.`}</Eq>
        <Tx>{R`由前面的经验，$H_r(K)$ 的生成元个数数的是 $|K|$ 中 "$(r+1)$ 维的洞"（被 $r$ 维闭链围住的洞）。前 $f$ 个因子构成秩 $f$ 的自由 Abel 群，后 $p$ 个因子称为 $H_r(K)$ 的**挠子群**（torsion subgroup）。例如射影平面 $H_1(K)\cong\mathbb{Z}_2$，Klein 瓶 $H_1(K)\cong\mathbb{Z}\oplus\mathbb{Z}_2$。某种意义上，挠子群探测多面体 $|K|$ 中的"**扭转**"（twisting）。

**怎样从边界矩阵读出 \eqref{3.54}？**对 $\partial_{r+1}$ 的整数矩阵做 Smith 标准形 $U\,\partial_{r+1}V=\Delta=\mathrm{diag}(k_1,\ldots,k_s,0,\ldots)$。则

$$f=\dim Z_r-s=I_r-\operatorname{rank}\partial_r-\operatorname{rank}\partial_{r+1},\qquad\text{挠子群}=\bigoplus_{k_i>1}\mathbb{Z}_{k_i}.$$

理由：$U^{-1}$ 的各列给出 $C_r$ 的一组新基 $u_1,u_2,\ldots$，在这组基下 $B_r=\operatorname{im}\partial_{r+1}$ 由 $k_1u_1,\ldots,k_su_s$ 生成。每个 $u_i$（$i\le s$）本身也是闭链：$k_i\,\partial_ru_i=\partial_r(k_iu_i)=0$，而 $C_{r-1}$ 是自由群、没有挠，故 $\partial_ru_i=0$。于是 $Z_r=\langle u_1,\ldots,u_s\rangle\oplus\big(Z_r\cap\langle u_{s+1},\ldots\rangle\big)$；商 $Z_r/B_r$ 中前一部分给出 $\bigoplus_i\mathbb{Z}_{k_i}$，后一部分（秩 $\dim Z_r-s$）原封不动地给出自由部分。\secref{3.4.3} 末尾的计算器就是这样算的。`}</Tx>
        <Tx>{R`**为什么要用 $\mathbb{Z}$ 系数，而不是 $\mathbb{Z}_2$ 或 $\mathbb{R}$ 系数？**用 $\mathbb{R}$ 系数时看不到挠子群，因为对任何 $m\in\mathbb{Z}-\{0\}$ 都有 $\mathbb{R}/m\mathbb{R}\cong\{0\}$（对任意 $a,b\in\mathbb{R}$ 都存在 $c\in\mathbb{R}$ 使 $a-b=mc$）——在实数里可以除以 $m$，$\sym{RP}{\mathbb{R}P^2}$ 中 "$2z$ 是边界" 立刻推出 "$z$ 是边界"。若 $H_r(K;\mathbb{Z})$ 由 \eqref{3.54} 给出，则`}</Tx>
        <Eq n="3.55" say={R`改用实数系数后，挠因子全部消失，只剩自由部分：$f$ 维实向量空间。`}>{R`H_r(K;\mathbb{R})\cong\underbrace{\mathbb{R}\oplus\mathbb{R}\oplus\cdots\oplus\mathbb{R}}_{f}.`}</Eq>
        <Tx>{R`\eqref{3.55} 的理由：$\partial$ 的矩阵在 $\mathbb{R}$ 上与在 $\mathbb{Z}$ 上秩相同（Smith 标准形的 $U,V$ 在 $\mathbb{R}$ 上同样可逆，而非零的 $k_i$ 在 $\mathbb{R}$ 中可逆），所以 $\dim H_r(K;\mathbb{R})=I_r-\operatorname{rank}\partial_r-\operatorname{rank}\partial_{r+1}=f$。`}</Tx>
        <Erratum kind="note" loc="p.138 §3.4.2" title={R`$\mathbb{Z}_2$ 系数为何看不见挠——原书的理由需要修正`}>{R`原书说"由于 $\mathbb{Z}_2$ 没有非平凡子群，挠子群永远无法被识别"。这句话的结论大体对，理由不准确。用 $\mathbb{Z}_2$ 系数时，边界矩阵模 2 化简：Smith 标准形中**奇数** $k_i$ 变成可逆元（$\mathbb{Z}_{k_i}$ 消失），**偶数** $k_i$ 变成 $0$（$\mathbb{Z}_{k_i}$ 变成一个 $\mathbb{Z}_2$，并且还会在 $H_{r+1}$ 中多出一个 $\mathbb{Z}_2$）。例如 $H_1(\sym{RP}{\mathbb{R}P^2};\mathbb{Z}_2)\cong\mathbb{Z}_2$、$H_2(\sym{RP}{\mathbb{R}P^2};\mathbb{Z}_2)\cong\mathbb{Z}_2$——这里的 $\mathbb{Z}_2$ 与自由部分模 2 后的 $\mathbb{Z}_2$ 无法区分，所以我们分辨不出"它原来是挠还是自由"。这才是 $\mathbb{Z}_2$ 系数看不到挠结构的真正原因（严格表述是万有系数定理）。不过 $\mathbb{Z}_2$ 系数也有好处：它对不可定向曲面同样能"看到"整个曲面这个 2 闭链。`}</Erratum>
      </Sub>

      <Sub n="3.4.3" title="Betti numbers and the Euler–Poincaré theorem" zh="Betti 数与 Euler–Poincaré 定理">
        <p className="muted">本小节概念：<C id="betti_euler" /></p>
        <Stmt id="D3.6">
          <Eq n="3.56" keyEq title="Betti 数" say={R`第 $r$ 个 Betti 数就是实系数同调群的维数：数一数被 $r$ 维闭链围住的独立的“洞”，不管挠。`}>{R`b_r(K)\equiv\dim H_r(K;\mathbb{R}).`}</Eq>
        </Stmt>
        <Tx>{R`换言之，$b_r(K)$ 是 $H_r(K;\mathbb{Z})$ 自由 Abel 部分的秩（由 \eqref{3.55}）。例如环面 $T^2$ 的 Betti 数是（例 3.12）$b_0(K)=1$、$b_1(K)=2$、$b_2(K)=1$；球面 $S^2$ 的是（习题 3.3）$b_0(K)=1$、$b_1(K)=0$、$b_2(K)=1$。

下面的定理把 Euler 示性数与 Betti 数联系起来——这是本章开头许下的承诺。`}</Tx>
        <Stmt id="T3.7">
          <Eq n="3.57" keyEq title="Euler–Poincaré 定理" say="数单形的交错和等于 Betti 数的交错和：左边依赖剖分、容易数，右边是拓扑不变量——所以 Euler 示性数与剖分无关。">{R`\chi(K)\equiv\sum_{r=0}^{n}(-1)^rI_r=\sum_{r=0}^{n}(-1)^rb_r(K).`}</Eq>
          <Proof steps={[
            { claim: R`考虑实系数的边界同态 $\partial_r:C_r(K;\mathbb{R})\to C_{r-1}(K;\mathbb{R})$，并规定 $C_{-1}(K;\mathbb{R})=\{0\}$。两边都是向量空间，用秩–零化度定理：`, tex: R`\begin{aligned}I_r=\dim C_r(K;\mathbb{R})&=\dim(\ker\partial_r)+\dim(\operatorname{im}\partial_r)\\ &=\dim Z_r(K;\mathbb{R})+\dim B_{r-1}(K;\mathbb{R})\end{aligned}`, why: R`$\ker\partial_r=Z_r$，$\operatorname{im}\partial_r=B_{r-1}$；规定 $B_{-1}(K)$ 为平凡群。`, uses: ["X:T2.1", "D3.3", "D3.4"] },
            { claim: R`又由 Betti 数的定义：`, tex: R`b_r(K)=\dim H_r(K;\mathbb{R})=\dim\big(Z_r(K;\mathbb{R})/B_r(K;\mathbb{R})\big)=\dim Z_r(K;\mathbb{R})-\dim B_r(K;\mathbb{R})`, uses: ["D3.6"] },
            { claim: R`把第一式代入交错和：`, tex: R`\chi(K)=\sum_{r=0}^{n}(-1)^rI_r=\sum_{r=0}^{n}(-1)^r\big(\dim Z_r(K;\mathbb{R})+\dim B_{r-1}(K;\mathbb{R})\big)` },
            { claim: R`对 $B_{r-1}$ 那一半换元 $r\to r+1$：$\sum_{r=0}^{n}(-1)^r\dim B_{r-1}=\sum_{r=-1}^{n-1}(-1)^{r+1}\dim B_r=-\sum_{r=0}^{n}(-1)^r\dim B_r$，因为 $B_{-1}=0$ 且 $B_n=0$（没有 $(n+1)$ 单形）。`, fill: true },
            { claim: R`于是`, tex: R`\chi(K)=\sum_{r=0}^{n}\big\{(-1)^r\dim Z_r(K;\mathbb{R})-(-1)^r\dim B_r(K;\mathbb{R})\big\}=\sum_{r=0}^{n}(-1)^rb_r(K)` },
          ]} />
        </Stmt>
        <Tx>{R`第一个等号是一般多面体 $|K|$ 的 Euler 示性数的**定义**，它推广了 §2.4 中为曲面定义的 Euler 示性数（第 2 章 \eqref{2.31}）。

由于 Betti 数是拓扑不变量，$\chi(K)$ 在同胚下也不变。特别地，若 $f:|K|\to X$、$g:|K'|\to X$ 是 $X$ 的两个三角剖分，则 $\chi(K)=\chi(K')$。因此用任意三角剖分 $(K,f)$ 定义 $X$ 的 Euler 示性数 $\chi(X)\equiv\chi(K)$ 是有意义的。`}</Tx>
        <Derivation title="用 Euler–Poincaré 定理检验本章的结果" collapsed steps={[
          { tex: R`S^2:\ 4-6+4=2=1-0+1`, why: R`四面体表面（习题 3.3）。` },
          { tex: R`T^2:\ 9-27+18=0=1-2+1`, why: R`$3\times3$ 方格剖分（交互计算器中的环面）。` },
          { tex: R`\sym{RP}{\mathbb{R}P^2}:\ 6-15+10=1=1-0+0`, why: R`图 3.9；$H_1\cong\mathbb{Z}_2$ 对 $b_1$ 没有贡献。` },
          { tex: R`\text{Klein}:\ 9-27+18=0=1-1+0`, why: R`图 3.12；$H_1\cong\mathbb{Z}_2\oplus\mathbb{Z}$，$b_1=1$。` },
          { tex: R`\text{Möbius}:\ 6-12+6=0=1-1+0`, why: R`图 3.8。` },
        ]} result={R`五个曲面全部吻合；注意 $\sym{RP}{\mathbb{R}P^2}$ 与 Klein 瓶的挠对 $\chi$ 没有任何贡献。`} />
        <Box kind="physics" title="Euler 示性数在物理中">{R`$\chi$ 是本书后半部分的主角之一：第 11 章它变成 Euler 类的积分（Gauss–Bonnet 定理 $\frac1{2\pi}\int_{\nosym{M}}\nosym{K}\,\dd \nosym{A}=\chi(\nosym{M})$），第 12 章它是 de Rham 复形的**指标**——"Euler–Poincaré 定理"正是指标定理最简单的特例：左边是"组合数据"，右边是"拓扑数据"。弦论中（第 14 章）世界面的 Euler 示性数 $\chi=2-2g$ 则给出微扰展开中弦耦合常数的幂次。`}</Box>
        <HomologyLab />
      </Sub>
    </Sec>);
}
