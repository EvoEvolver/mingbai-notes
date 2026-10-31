// 第 11 章 示性类（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 439–472）——主文件
// 高层理解层在 _ch11_overview.jsx；符号词典在 _ch11_notation.jsx；陈述登记表在 _ch11_stmts.js（经 book.js 合并）；
// 正文：_ch11_s1.jsx（引言 + §11.1）、_ch11_s2.jsx（§11.2）、_ch11_s3.jsx（§11.3）、_ch11_s4.jsx（§11.4）、_ch11_s5.jsx（§11.5）、_ch11_s6.jsx（§11.6）；
// 交互图在 _ch11_demos.jsx，计算核心（有理数多项式代数、分裂原理、数值积分）在 _ch11_alg.js。本章无章末习题（Problems）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch11_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch11_overview.jsx";
import { Intro, Sec111 } from "./_ch11_s1.jsx";
import { Sec112 } from "./_ch11_s2.jsx";
import { Sec113 } from "./_ch11_s3.jsx";
import { Sec114 } from "./_ch11_s4.jsx";
import { Sec115 } from "./_ch11_s5.jsx";
import { Sec116 } from "./_ch11_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch11", no: 11, title_en: "Characteristic Classes", title_zh: "示性类", pages: "439–472",
  one_liner: R`把曲率代入规范不变的多项式，得到与联络无关的上同调类——示性类；它们的积分是整数（磁荷、瞬子数、Euler 示性数），量出丛被"拧"了多少。`,
  big_question: R`曲率是依赖于联络、逐点变化的局部量。怎样从中提取只属于丛本身的拓扑信息？为什么某些曲率积分只能取整数，而且不受场的连续形变影响？哪些拓扑信息是曲率根本看不见的？`,
  why_it_matters: R`示性类把第 9、10 章的"丛与联络"变成可以计算的整数：单极子的磁荷是 $\int c_1$，瞬子数是 $\int\mathrm{ch}_2$，球面的 Euler 示性数是 $\int e$。它们是第 12 章 Atiyah–Singer 指标定理右边的全部原料（$\mathrm{ch}$、$\mathrm{Td}$、$L$、$\hat A$、$e$），陈–Simons 形式是第 13 章规范反常与三维拓扑场论的出发点，而 Stiefel–Whitney 类决定一个时空能否容纳费米子。`,
  overview: R`**§11.1** 定义不变多项式（共轭不变的对称多线性型及其对角化），证明 Chern–Weil 定理：$P(\mathcal{F})$ 闭，且换联络只差超渡形式的外微分；由此得到示性类、Weil 同态与自然性。**§11.2** 定义陈类 $c=\det(I+\mathrm{i}\mathcal{F}/2\pi)$，用陈根把它化为初等对称函数，证明 Whitney 和公式，引入分裂原理、Grassmann 流形上的万有丛与陈类的公理。**§11.3** 定义陈特征 $\mathrm{ch}=\Tr\exp(\mathrm{i}\mathcal{F}/2\pi)$（对 $\oplus$ 可加、对 $\otimes$ 可乘），计算单极子、瞬子与 $\CP^1$ 典范线丛的拓扑荷，并定义 Todd 类。**§11.4** 处理实丛：Pontrjagin 类、与陈类的关系、Euler 类（Pfaffian）与 Gauss–Bonnet 定理、Hirzebruch $L$ 多项式与 $\hat A$ 亏格。**§11.5** 研究陈–Simons 形式、Cartan 同伦公式与 CS 形式的规范变换，以及三维拓扑质量。**§11.6** 用 $\Z_2$ 系数的 Čech 上同调定义 Stiefel–Whitney 类，说明 $w_1$、$w_2$ 分别是定向与自旋结构的障碍。三个交互图：在 $S^2$ 上数值积分单极子丛的曲率；分裂原理的符号计算器（复现 $\mathrm{Td}$、$L$、$\hat A$ 的系数并揭示原书的笔误）；任意旋转曲面上的 Gauss–Bonnet。`,
  objectives: [
    R`理解不变多项式与极化；能复述并证明 Chern–Weil 定理（\sref{T11.1}）的两部分，写出超渡形式 \eqref{11.21}`,
    R`由 \eqref{11.25} 计算陈类，用陈根与 Newton 恒等式得到 \eqref{11.31}；证明 Whitney 和公式并会用分裂原理`,
    R`计算陈特征与 Todd 类的前几阶（\eqref{11.51c}、\eqref{11.67a}–\eqref{11.67f}）；计算单极子丛与 $\CP^1$ 典范线丛的第一陈数`,
    R`由反对称矩阵的块对角形推出 Pontrjagin 类的迹公式 \eqref{11.75a}–\eqref{11.75d}；理解 Pfaffian、Euler 类与 Gauss–Bonnet 定理`,
    R`由超渡推出陈–Simons 形式 \eqref{11.105}–\eqref{11.106c}；用 Cartan 同伦公式推出 CS 形式的规范变化 \eqref{11.118}；说明三维 CS 项给出拓扑质量`,
    R`用 Čech 上同调定义 $w_1$、$w_2$，证明它们分别是可定向性与自旋结构的障碍（\sref{T11.6}、\sref{T11.7}）`,
  ],
  prereq: [
    { ch: "ch06", what: R`第 6 章：de Rham 上同调、Stokes 定理（\sref{T6.1}）、Poincaré 引理（\sref{T6.3}）` },
    { ch: "ch07", what: R`第 7 章：正交标架与 Cartan 结构方程、球面的曲率二形式（例 7.14）` },
    { ch: "ch08", what: R`第 8 章：$\CP^n$、Fubini–Study 度规与 Grassmann 流形（例 8.4、8.8）` },
    { ch: "ch09", what: R`第 9 章：纤维丛、转移函数、拉回丛、Whitney 和、主丛与相伴丛、自旋丛` },
    { ch: "ch10", what: R`第 10 章：联络与规范势 $\mathcal{A}$、曲率 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}^2$、相容条件 \eqref{10.9}、Bianchi 恒等式 \eqref{10.46}、单极子与瞬子（§10.5）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["F:charclass", "T11.1", "T11.2", "C11.1", "T11.3", "X:splitting", "X:chern1979", "T11.4", "F:chern-axioms", "T11.5", "F:pfaffian", "X:gauss-bonnet", "X:signature", "F:cartan-homotopy", "F:cs-gauge", "T11.6", "T11.7"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="不变多项式 → 陈类 → 陈特征 → Pontrjagin/Euler → 陈–Simons → Stiefel–Whitney。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`主干是 Chern–Weil：不变性 \eqref{11.3} → 闭性 \eqref{11.14} 与联络无关性 \eqref{11.20} → 积分不变 \eqref{11.22}。从这里分出三支：取 $\det$ 得陈类与分裂原理，取 $\Tr\exp$ 得陈特征，取实丛的 $\det$ 与 Pfaffian 得 Pontrjagin 类与 Euler 类；超渡又引出陈–Simons 形式。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "T6.1", "T6.3", "D6.2", "D2.10", "P1.3", "T9.1", "D5.6", "L10.3", "T10.7"]} highlight="ch11" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec111 />
      <Sec112 />
      <Sec113 />
      <Sec114 />
      <Sec115 />
      <Sec116 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 12 章：指标定理">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="chern_weil" /> · <C id="chern_class" /> · <C id="chern_character" /> · <C id="euler_class" /> · <C id="chern_simons" /> · <C id="stiefel_whitney" /></p>
      </Block>
    </TextbookPage>);
}
