// 第 6 章 de Rham 上同调群（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 246–263）——主文件
// 高层理解层在 _ch06_overview.jsx；符号词典在 _ch06_notation.jsx；陈述登记表在 _ch06_stmts.js（经 book.js 合并）；
// 正文：_ch06_s1.jsx（引言 + §6.1）、_ch06_s2.jsx（§6.2）、_ch06_s3.jsx（§6.3）、_ch06_s4.jsx（§6.4）；本章原书无章末习题。
// 交互图在 _ch06_demos.jsx，数值核心在 _ch06_num.js（复用第 3 章的整数同调算法 _ch03_homology.js）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch06_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch06_overview.jsx";
import { Intro, Sec61 } from "./_ch06_s1.jsx";
import { Sec62 } from "./_ch06_s2.jsx";
import { Sec63 } from "./_ch06_s3.jsx";
import { Sec64 } from "./_ch06_s4.jsx";

const R = String.raw;

export const meta = {
  id: "ch06", no: 6, title_en: "de Rham Cohomology Groups", title_zh: "de Rham 上同调群", pages: "246–263",
  one_liner: R`把"闭形式"（$\dd\omega=0$）模去"恰当形式"（$\omega=\dd\psi$），得到 de Rham 上同调群 $H^r(M)$；Stokes 定理 $\int_c\dd\omega=\int_{\partial c}\omega$ 让它与第 3 章的同调群互为对偶，于是 Betti 数可以用微分方程来数。`,
  big_question: R`一个处处无旋（$\dd\omega=0$）的场，什么时候是某个势的梯度（$\omega=\dd\psi$）？答案为什么只取决于空间的拓扑——而且恰好由第 3 章用链数出的"洞"决定？`,
  why_it_matters: R`物理里的拓扑量几乎都是"闭而不恰当"的形式的积分：Aharonov–Bohm 相位 $\oint A$、磁单极荷 $\int_{S^2}F$、瞬子数、陈数。de Rham 上同调是它们的共同语言。本章的 Poincaré 对偶、上同调环、Künneth 公式与同伦不变性，是第 7 章 Hodge 理论、第 11 章示性类、第 12 章指标定理与第 13 章反常计算的直接工具。`,
  overview: R`本章分四步。**§6.1 Stokes 定理**：在标准单形上积分就是普通的重积分；把它光滑映入流形得到奇异单形与实系数链，用拉回定义 $\int_{s_r}\omega=\int_{\bar\sigma_r}f^*\omega$；然后在标准单形上直接计算，证明 $\int_c\dd\omega=\int_{\partial c}\omega$，并在 $\mathbb{R}^3$ 中还原经典的 Stokes 与 Gauss 定理。**§6.2 de Rham 上同调**：$H^r(M)=Z^r(M)/B^r(M)$；算出 $H^0$（数连通分支）、$H^1(\mathbb{R})=0$、$H^1(S^1)\cong\mathbb{R}$，以及平面去掉原点上的角形式 $\dd\theta$；积分配对 $\Lambda([c],[\omega])=\int_c\omega$ 由 Stokes 定理保证良定义，de Rham 定理说它非退化，于是 $b^r=b_r$、$\chi(M)=\sum(-1)^rb^r$。**§6.3 Poincaré 引理**：同伦算子 $P$ 与同伦公式 $\dd P+P\dd=f_1^*-f_0^*$，可缩区域上闭形式都恰当，$H^r(\mathbb{R}^n)=0$。**§6.4 结构**：Poincaré 对偶、上同调环、Künneth 公式（$T^n$ 的上同调）、拉回与同伦不变性、单连通 ⇒ $H^1=0$、球面的上同调与磁单极。四个交互图在浏览器里真算：Stokes 定理的数值验证、$\oint\dd\theta=2\pi\times$卷绕数、同伦算子构造原函数、Künneth 公式与乘积三角剖分的独立核对。`,
  objectives: [
    R`用拉回 \eqref{6.6} 计算链上的积分，并独立复述 Stokes 定理 \eqref{6.8} 在标准单形上的证明（尤其是两个 $(-1)^{r-1}$ 的来源）`,
    R`由定义 \eqref{6.11} 算出 $H^0(M)$、$H^1(\mathbb{R})$、$H^1(S^1)$，并用周期判断 $\mathbb{R}^2-\{0\}$ 上的 $\dd\theta$ 闭而不恰当`,
    R`解释 $(c,\dd\omega)=(\partial c,\omega)$ 为什么使 $\Lambda([c],[\omega])=\int_c\omega$ 良定义，并用 de Rham 定理（\sref{T6.2}）与推论 \sref{C6.1} 理解"周期 = 上同调类的坐标"`,
    R`推导同伦公式 \eqref{6.31}，由它证明 Poincaré 引理 \eqref{6.32} 与同伦不变性 \sref{T6.4}，并在星形区域上写出显式原形式`,
    R`运用 Poincaré 对偶、上积与 Künneth 公式计算 $T^n$、$S^n$、$S^2\times S^1$ 等的 Betti 数与 Euler 示性数，并说出每条结论需要的前提（紧致、可定向、$r\ge1$）`,
  ],
  prereq: [
    { ch: "ch03", what: R`第 3 章：链、边界算子与 $\partial^2=0$（引理 3.3）、同调群 $H_r=Z_r/B_r$、Betti 数与 Euler–Poincaré 定理 (3.57)、同态基本定理（定理 3.1）` },
    { ch: "ch04", what: R`第 4 章：同伦、基本群、单连通；$H_1$ 是 $\pi_1$ 的交换化（定理 4.9）` },
    { ch: "ch05", what: R`第 5 章：微分形式、外积、外微分与 $\dd^2=0$ (5.72)、拉回及 $\dd f^*=f^*\dd$ (5.75)、可定向性与单位分解` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["T6.1", "D6.1", "D6.2", "T6.2", "C6.1", "T6.3", "L6.1", "T6.4", "T6.5"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="积分工具 → Stokes 定理 → 上同调与对偶 → Poincaré 引理 → 结构。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着用了什么。主干是 Stokes 定理 \eqref{6.8} → 伴随关系 \eqref{6.20} → 配对 \eqref{6.21} → $b^r=b_r$；另一支是同伦公式 \eqref{6.31}，它同时推出 Poincaré 引理与同伦不变性；第三支是外积带来的结构（对偶、环、Künneth）。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "D5.5", "T4.9"]} highlight="ch06" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec61 />
      <Sec62 />
      <Sec63 />
      <Sec64 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 7 章：黎曼几何">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="stokes" /> · <C id="derham" /> · <C id="period" /> · <C id="poincare_lemma" /> · <C id="kunneth" /></p>
      </Block>
    </TextbookPage>);
}
