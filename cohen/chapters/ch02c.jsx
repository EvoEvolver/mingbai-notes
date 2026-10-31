// 第 II 章补充材料（Cohen-Tannoudji, Diu, Laloë, Quantum Mechanics I, 2nd ed., PDF pp. 183–236）——主文件
// 高层理解层在 _ch02c_overview.jsx；符号词典在 _ch02c_notation.jsx；各补充材料正文在 _ch02c_sA … _ch02c_sH.jsx；
// 交互图在 _ch02c_plots.jsx（数值核心 _ch02c_num.js）与 _ch02c_figs.jsx；跨页引用记号与 Fig 外框在 _ch02c_kit.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Table } from "@kit";
import "./_ch02c_kit.jsx";
import { NOTATION } from "./_ch02c_notation.jsx";
import { HOOK_TITLE, HOOK, GUIDE, ROADMAP, EQMAP_OPS, EQMAP_UNI, EQMAP_QP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02c_overview.jsx";
import { SecA } from "./_ch02c_sA.jsx";
import { SecB } from "./_ch02c_sB.jsx";
import { SecC } from "./_ch02c_sC.jsx";
import { SecD } from "./_ch02c_sD.jsx";
import { SecE } from "./_ch02c_sE.jsx";
import { SecF } from "./_ch02c_sF.jsx";
import { SecG } from "./_ch02c_sG.jsx";
import { SecH } from "./_ch02c_sH.jsx";

const R = String.raw;

export const meta = {
  id: "ch02c", no: 0, title_en: "Complements of Chapter II", title_zh: "第 II 章补充材料", pages: "159–211（PDF 183–236）",
  one_liner: R`第 II 章的工具箱与练习场：Schwarz 不等式、算符的迹/函数/导数与 Glauber 公式、幺正算符与生成元、位置与动量表象、只由 $[Q,P]=i\hbar$ 推出的平移算符、宇称与选择定则、二维方阱中的张量积与简并，以及十二道习题。`,
  big_question: R`正文给出了态空间、算符与表象的语言；要真正用它计算，还需要哪些规则——算符的函数怎么定义、指数什么时候能合并、"换基"和"对称操作"在数学上是什么、一条对易关系 $[Q,P]=i\hbar$ 究竟包含了多少信息？`,
  why_it_matters: R`后面每一章都在用这里的结果：$[X,F(P)]=i\hbar F'(P)$ 给出 Ehrenfest 定理，幺正算符给出时间演化与对称变换，平移算符与 Glauber 公式是谐振子相干态的基础，宇称与张量积是分析定态与简并的日常工具。`,
  overview: R`八份补充材料彼此相对独立。$\mathrm A_{\rm II}$、$\mathrm B_{\rm II}$ 是数学复习（$\mathrm B_{\rm II}$ 以后会被频繁引用）；$\mathrm C_{\rm II}$ 讲幺正算符——"复空间中的转动"、算符的幺正变换与无穷小生成元；$\mathrm D_{\rm II}$ 把位置、动量表象中的矩阵元算到底，得到两个表象中的 Schrödinger 方程；$\mathrm E_{\rm II}$ 只从 $[Q,P]=i\hbar$ 出发，借平移算符推出连续谱、$\frac\hbar i\frac{\mathrm d}{\mathrm dq}$ 与 Fourier 变换；$\mathrm F_{\rm II}$ 用宇称把第 II 章的概念完整演练一遍；$\mathrm G_{\rm II}$ 用张量积解二维无限深势阱并区分两类简并；$\mathrm H_{\rm II}$ 为习题。`,
  objectives: [
    R`用"减去投影"的办法证明 Schwarz 不等式 \eqref{AII-2}，说明它在概率解释中的作用`,
    R`证明迹与基无关、可循环 \eqref{BII-5} \eqref{BII-7a}；用本征基与幂级数定义算符函数 \eqref{BII-27}，推导 $[X,F(P)]=i\hbar F'(P)$ \eqref{BII-47} 与 Glauber 公式 \eqref{BII-63}`,
    R`说出幺正算符的三种等价刻画，写出算符的幺正变换 \eqref{CII-30} 与无穷小形式 \eqref{CII-42} \eqref{CII-44}`,
    R`在位置、动量表象中写出 $\mathbf R$、$\mathbf P$ 及其函数的矩阵元，导出两个表象中的 Schrödinger 方程 \eqref{DII-19} \eqref{DII-32}`,
    R`由 $[Q,P]=i\hbar$ 推出平移算符的作用 \eqref{EII-18}、$P\to\frac\hbar i\frac{\mathrm d}{\mathrm dq}$ \eqref{EII-23}，并论证有限维中不存在这样的一对算符`,
    R`用宇称投影算符分解态 \eqref{FII-19}，用偶/奇算符的选择定则 \eqref{FII-32} \eqref{FII-33} 判断矩阵元是否为零`,
    R`用张量积求二维无限深势阱的能级 \eqref{GII-9}，区分系统简并与偶然简并`,
  ],
  prereq: [
    { ch: "ch02", what: R`第 II 章正文：Dirac 记号、算符与可观测量（§B–§D）、$\{\ket{\mathbf r}\}$ 与 $\{\ket{\mathbf p}\}$ 表象（§E）、张量积（§F）` },
    { what: R`线性代数（矩阵、本征值、幺正与正交矩阵）；Fourier 变换与 $\delta$ 函数（附录 I、II）；一维无限深势阱（第 I 章补充材料 $\mathrm H_{\rm I}$）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Guide() {
  return (
    <Table head={[R`**补充材料**`, R`**讲什么、为什么读**`, R`**前置**`, R`**难度 / 建议**`]}
      rows={GUIDE.map(g => [g.name, g.role, g.pre, g.level])}
      caption={R`本站按自己的理解给出的阅读建议。各补充材料基本独立，可以按需挑读；$\mathrm B_{\rm II}$ 与 $\mathrm F_{\rm II}$ 最值得先读，$\mathrm E_{\rm II}$ 可以留到学完第 III 章再回头看。点击下方路线图中的标题可跳到对应补充材料。`} />);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="guide" toc="阅读指南" kicker="阅读指南" title="怎样读这一组补充材料" lead="每份补充材料的定位、需要先读什么、难度如何——用来决定先读哪几份。">
        <Guide />
      </Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="八份补充材料的路线" lead="从数学工具（A、B）到变换与对称（C、E、F），再到表象与应用（D、G），最后是习题（H）。点击标题跳转；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图：算符代数（A、B）；幺正变换与宇称（C、F）；正则对易、表象与张量积（D、E、G）。箭头上写着从上一式到下一式用了什么。">
        <h3>算符代数：Schwarz、对易子与 Glauber 公式</h3>
        <EqMap edges={EQMAP_OPS} labels={EQMAP_LABELS} />
        <h3>幺正变换与宇称</h3>
        <EqMap edges={EQMAP_UNI} labels={EQMAP_LABELS} />
        <h3>正则对易关系、表象与张量积</h3>
        <EqMap edges={EQMAP_QP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <SecE />
      <SecF />
      <SecG />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 III 章：量子力学的基本假设">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="opfunc" /> · <C id="unitary" /> · <C id="generator" /> · <C id="translation" /> · <C id="parity" /> · <C id="degeneracy" /></p>
      </Block>
      <SecH />
    </TextbookPage>);
}
