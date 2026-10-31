// 第 5 节 矩阵多项式（原文 pp.10–12）——主文件。
// 高层理解层在 _ch05_overview.jsx；正文：_ch05_s1.jsx（§5、§5.1、定理 5.1）、_ch05_s2.jsx（§5.2、§5.3）、_ch05_s4.jsx（§5.4）；
// 可运行示例在 _ch05_demos.jsx，纯计算函数在 _ch05_calc.jsx。
import { TextbookPage, Block, Hook, TxI, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, pageIds, StudyTable } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_EDGES, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch05_overview.jsx";
import { Sec5, Sec51 } from "./_ch05_s1.jsx";
import { Sec52, Sec53 } from "./_ch05_s2.jsx";
import { Sec54 } from "./_ch05_s4.jsx";

const R = String.raw;

export const meta = {
  id: "ch05", no: 5, title_en: "The matrix polynomial", title_zh: "矩阵多项式", pages: "10–12",
  one_liner: R`构造局部矩阵多项式 $J(t)$：$J(0)=X^{\otimes\ell}$，在每个特殊点 $t=i$ 处等于“$i$-好矩阵 + 同一个低秩矩阵 $E$”，而次数只有 $O(\sqrt{\ell\log\ell})$。`,
  big_question: R`精确地在 $\ell$ 个特殊点上变成 $i$-好，至少要 $\ell$ 次——那样 §3 的插值毫无节省。允许一个公共的低秩修正之后，次数能降到多低？低秩又从哪里来？`,
  why_it_matters: R`全文的指数节省完全来自 $d/\ell\ll1$（§3）。§4 已把问题化归为一个 $2^\ell\times2^\ell$ 的局部构造；本节用 Hadamard 换基与奇偶函数的低次插值完成它，次数 $d=O(\sqrt{\ell\log\ell})$，误差秩 $\le2^\ell/\ell^{100}$——这是 \sref{T5.1}，全文的代数核心。`,
  overview: R`本节分四步。**§5.1** 给出一个次数为 $\ell$ 的精确构造，并证明任何精确构造都至少 $\ell$ 次：$(x,\bar x)$ 元素在 $t=0$ 为 1、在 $t=1,\dots,\ell$ 为 0。随后陈述\sref{T5.1}。**§5.2** 引入 $X,Z,H$：Hadamard 共轭把对角的 $Z_j$ 变成翻转的 $X_j$，并且与取多项式可交换；函数 $g$ 对应对角阵 $D_g$，于是"两函数在多数输入上相等"等价于"换基后相差低秩"。**§5.3** 利用奇偶只依赖负坐标数 $k$，在 $\ell/2$ 附近 $d+1$ 个 $k$ 上插值出 $p$，二项尾界说明 $p(\sum x_j)$ 只在 $\ell^{-100}$ 比例的输入上不等于奇偶。**§5.4** 令 $J(t)=p(\sum_j(1-t/j)X_j)+E$：$t=i$ 时 $X_i$ 的系数消失，$K_i$ 自动 $i$-好；$E$ 换基后是对角阵，秩等于不一致的输入数。`,
  objectives: [
    R`说明为什么精确的 $i$-好变形至少 $\ell$ 次，以及这为什么使 §3 的插值失效`,
    R`证明 $H_\ell Z_jH_\ell=X_j$、共轭与多项式可交换 \eqref{5.2}，以及 $\rank(H_\ell(D_g-D_h)H_\ell)=|\{g\ne h\}|$ \eqref{5.4}`,
    R`构造奇偶插值多项式 $p$ 并用 Hoeffding 不等式推出 \eqref{5.6}，算出常数需要多大`,
    R`验证 \eqref{5.7} 的 $J(t)$ 满足\sref{T5.1} 的全部结论：$\deg\le d$、$J(0)=X^{\otimes\ell}$、$K_i=I_2\otimes p(S_i)$、$\rank E\le2^\ell/\ell^{100}$`,
  ],
  prereq: [
    { ch: "ch04", what: "§4：i-好矩阵（定义 4.2, 式 4.8）、引理 4.3、低秩在分解中保持 (4.9)" },
    { ch: "ch03", what: String.raw`§3：导数阶数 $h=\lfloor nd/\ell\rfloor+1$，节省来自 $d/\ell\ll1$` },
    { what: R`张量（Kronecker）积与混合乘积律；Lagrange 插值；Hoeffding 不等式` },
  ],
};

export const notation = notationFor("ch05", [
  { sym: R`\one`, name: "指示函数", def: R`$\one\{x_i=y_i\}$：条件成立为 1，否则为 0（式 4.8）。` },
  { sym: R`c`, name: "次数常数", def: R`$d=\lceil c\sqrt{\ell\log_2\ell}\rceil$ 中的常数；论文取 $c=100$，$c\approx24$ 已足够得到 $\ell^{-100}$。` },
  { sym: R`W`, name: "Walsh 矩阵", def: R`$W=\begin{pmatrix}1&1\\1&-1\end{pmatrix}^{\otimes\ell}=\sqrt2^{\,\ell}H_\ell$；$H_\ell MH_\ell=WMW/2^\ell$。` },
  { sym: R`D_h`, name: "函数 h 的对角矩阵", def: R`$D_h[b,b]=h((-1)^{b_1},\dots,(-1)^{b_\ell})$，与 $D_g$ 同样定义。`, eq: "5.4" },
  { sym: R`D_{g'}`, name: "限制函数的对角矩阵", def: R`$g$ 不依赖第 $i$ 位时，$g'$ 为其在其余 $\ell-1$ 位上的限制，$D_g=I_2\otimes D_{g'}$。`, eq: "5.3" },
  { sym: R`H_{\ell-1}`, name: "低一维的 Hadamard 矩阵", def: R`$H^{\otimes(\ell-1)}$，作用在去掉第 $i$ 位后的其余坐标上。`, eq: "5.3" },
  { sym: R`K_i`, name: "特殊点的 i-好部分", def: R`$K_i=\widetilde J(i)=p\big(\sum_{j\ne i}(1-i/j)X_j\big)=I_2\otimes p(S_i)$。` },
  { sym: R`X_j`, name: "翻转第 j 位", def: R`$X_j=I_2^{\otimes(j-1)}\otimes X\otimes I_2^{\otimes(\ell-j)}$；$X'_j$ 为去掉第 $i$ 个因子后的版本。` },
  { sym: R`Z_j`, name: "第 j 位的符号", def: R`$Z_j=I_2^{\otimes(j-1)}\otimes Z\otimes I_2^{\otimes(\ell-j)}$，对角阵，$Z_j[b,b]=(-1)^{b_j}$。` },
  { sym: R`\mathcal W`, name: "插值窗口", def: R`$\mathcal W=\{k_0,\dots,k_0+d\}$，$k_0=\lceil(\ell-d)/2\rceil$：以 $\ell/2$ 为中心的 $d+1$ 个连续整数。`, eq: "5.5" },
  { sym: R`k_0`, name: "窗口左端", def: R`$k_0=\lceil(\ell-d)/2\rceil$。` },
  { sym: R`s`, name: "偏差阈值", def: R`Hoeffding 不等式中的偏差 $s$，取 $s=d/4$。` },
  { sym: R`f`, name: "障碍元素", def: R`§5.1 证明中 $f(t)=J(t)[x,\bar x]$，单个元素作为 $t$ 的多项式。` },
  { sym: R`\varphi`, name: "共轭映射", def: R`$\varphi(M)=H_\ell MH_\ell$，代数同态。` },
  { sym: R`\hat g`, name: "多线性系数", def: R`$g(x)=\sum_S\hat g(S)\prod_{j\in S}x_j$ 中的系数（Fourier–Walsh 系数）。` },
  { sym: R`P`, name: "置换矩阵", def: R`把第 $i$ 个张量因子移到最前的置换；$PH_\ell P^{\mathsf T}=H_\ell$。` },
  { sym: R`M`, name: "一般矩阵", def: R`§5 证明中泛指的 $2^\ell\times2^\ell$ 矩阵（共轭 $\varphi(M)$ 等）。` },
  { sym: R`N`, name: "一般矩阵", def: R`与 $M$ 并列的另一个矩阵。` },
  { sym: R`A`, name: "张量积中的一般矩阵", def: R`§5 中混合乘积律 $(A\otimes B)(C\otimes D)=AC\otimes BD$ 里的一般矩阵；§5 不涉及输入矩阵。` },
  { sym: R`B`, name: "i-好矩阵的块", def: R`$K=I_2\otimes B$（\sref{D4.2}）；§5.4 中 $B=p(S_i)$。` },
  { sym: R`C`, name: "立方体指标集 / 一般矩阵", def: R`$I_C\otimes K$ 中的立方体指标集（§4）；混合乘积律中的一般矩阵。` },
  { sym: R`S`, name: "坐标子集", def: R`$S\subseteq[\ell]$，多线性单项式 $\prod_{j\in S}x_j$ 的指标集；也作 $(I_2\otimes S)^m$ 中的一般矩阵。` },
]);
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={<TxI>{HOOK_TITLE}</TxI>}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本节路线图" lead="四步：障碍 → 换基语言 → 奇偶插值 → 拼装。点击标题跳到该小节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="proofmap" toc="证明结构" kicker="证明结构" title="本节陈述在全文证明中的位置" lead={R`\sref{T5.1} 依赖 $i$-好的定义与本节两个事实，并被 §6 的 \eqref{6.2} 使用。悬停节点看上下游，点击看陈述。`}>
        <DepGraph ids={pageIds("ch05")} highlight="ch05" />
        <StudyTable ids={["T5.1", "F:hadamard", "F:parity"]} />
        <h3>编号公式如何推出</h3>
        <EqMap edges={EQMAP_EDGES} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十张卡串起本节：先读一句话版本，点开看深入解释、类比、文中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec5 />
      <Sec51 />
      <Sec52 />
      <Sec53 />
      <Sec54 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ §6：参数选择与推论">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="exact_barrier" /> · <C id="Dg" /> · <C id="binom_conc" /> · <C id="vanish" /> · <C id="common_E" /></p>
      </Block>
    </TextbookPage>);
}
