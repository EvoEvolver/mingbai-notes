// 第 III 章 量子力学的基本假设（Cohen-Tannoudji, Diu, Laloë, Quantum Mechanics I, 2nd ed., PDF pp. 237–290）——主文件
// 高层理解层在 _ch03_overview.jsx；符号词典在 _ch03_notation.jsx；各节正文在 _ch03_sA.jsx … _ch03_sE.jsx；
// 交互图在 _ch03_plots.jsx（数值核心 _ch03_phys.js），自绘示意图在 _ch03_figs.jsx，假设框等小组件在 _ch03_kit.jsx。
// 各假设框的锚点：postulate-1 … postulate-6，以及 postulate-4b、postulate-4c（第四假设的一般/连续谱形式）、postulate-5c（连续谱的约化）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, TxI } from "@kit";
import { NOTATION } from "./_ch03_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_MEAS, EQMAP_DYN, EQMAP_SUP, EQMAP_LABELS, POSTULATES, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03_overview.jsx";
import { SecA } from "./_ch03_sA.jsx";
import { SecB } from "./_ch03_sB.jsx";
import { SecC } from "./_ch03_sC.jsx";
import { SecD } from "./_ch03_sD.jsx";
import { SecE } from "./_ch03_sE.jsx";

const R = String.raw;

export const meta = {
  id: "ch03", no: 3, title_en: "The Postulates of Quantum Mechanics", title_zh: "量子力学的基本假设", pages: "213–266（PDF 237–290）",
  one_liner: R`把第 II 章的数学与实验挂钩：态是右矢，物理量是可观测量，测量给出本征值、概率是投影的模方、并使态约化；两次测量之间态按 Schrödinger 方程确定地演化。`,
  big_question: R`一个量子体系的“态”到底是什么？知道了态，能对测量结果预言到什么程度？测量和时间演化又怎样改变态？`,
  why_it_matters: R`本书以后的一切计算——谐振子、角动量、氢原子、微扰论、散射——都是这六条假设的应用。本章还推出了贯穿全书的工具：平均值 \eqref{C-4} 与不确定度 \eqref{C-23}、对易与相容性、概率流 \eqref{D-17}、Ehrenfest 定理 \eqref{D-34}–\eqref{D-35}、定态与 Bohr 频率 \eqref{D-68}，以及“加振幅还是加概率”的判据。`,
  overview: R`本章分三步。**陈述**（§A–§B）：先把经典力学对体系的描述拆成“态—物理量—测量—演化”几个零件，再给出量子力学对应的六条假设与量子化规则。**测量**（§C）：用第三—第五假设重现波函数的概率解释，定义平均值和方均根偏差，推出 Heisenberg 不等式，并用相继测量说明对易量“相容”、不对易量“不相容”。**演化与叠加**（§D–§E）：从 Schrödinger 方程推出确定性、概率的整体与局域守恒、平均值的演化方程（Ehrenfest 定理与经典极限）、保守体系的定态、运动常量、Bohr 频率与时间–能量关系；最后考察叠加原理的物理后果——干涉、对中间态的振幅求和——并把测量假设推广到分辨率有限的仪器与连续谱。`,
  objectives: [
    R`准确陈述六条假设（尤其是第四、第五假设的简并与连续谱形式），并说明为什么物理量必须是**可观测量**`,
    R`用 $\mathcal P(a_n)=\bra\psi P_n\ket\psi$ 计算测量概率，用 $P_n\ket\psi/\|P_n\psi\|$ 写出测量后的态；解释整体相位与相对相位的区别`,
    R`由谱分解推出 $\langle A\rangle=\bra\psi A\ket\psi$、$\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}$，并证明 $\Delta X\Delta P_x\geq\hbar/2$`,
    R`说明对易与相容性的关系、相继测量的次序问题，以及为什么态的制备需要 ECOC`,
    R`从 Schrödinger 方程推出范数守恒、连续性方程与概率流 \eqref{D-17}、平均值演化方程 \eqref{D-27} 与 Ehrenfest 定理，并说明经典极限的条件`,
    R`求解保守体系的演化 \eqref{D-54}；理解定态、运动常量、Bohr 频率、选择定则与 $\Delta t\cdot\Delta E\gtrsim h$`,
    R`区分叠加与统计混合；判断何时对概率幅求和、何时对概率求和`,
  ],
  prereq: [
    { ch: "ch02", what: "第 II 章：Dirac 记号、厄米算符与可观测量、投影算符、封闭关系、对易可观测量与 ECOC、$\\{\\ket{\\mathbf r}\\}$ 与 $\\{\\ket{\\mathbf p}\\}$ 表象、$[R_i,P_j]=i\\hbar\\delta_{ij}$" },
    { ch: "ch01", what: "第 I 章：偏振光子实验、波函数的概率解释、Schrödinger 方程、波包与群速度、不确定关系" },
    { what: R`经典力学的 Lagrange 与 Hamilton 形式（附录 III）；Fourier 变换（附录 I）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="postulates" toc="六条假设一览" kicker="一页纸" title="六条假设一览" lead="每条假设在正文中都有一个醒目的框（锚点 postulate-1 … postulate-6，可从其他页直接链接）。点击下面的链接跳到原文位置。">
        <table className="tb-table"><thead><tr><th>假设</th><th>关于</th><th>内容</th></tr></thead>
          <tbody>{POSTULATES.map(p => <tr key={p.id}><td style={{ whiteSpace: "nowrap" }}><a href={`#${p.id}`}>第{p.k}假设</a></td><td style={{ whiteSpace: "nowrap" }}>{p.what}</td><td><PostRow tex={p.text} /></td></tr>)}</tbody></table>
      </Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="陈述（§A–B）→ 测量的推论（§C）→ 演化的推论（§D）→ 叠加原理（§E）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图对应本章的三条主线。每个节点是一个编号公式（点击放大），箭头上写着从上一式到下一式用了什么。">
        <h3>测量线：谱分解 → 投影 → 约化 → 平均值与不确定度</h3>
        <EqMap edges={EQMAP_MEAS} labels={EQMAP_LABELS} />
        <h3>演化线：Schrödinger 方程 → 守恒律 → Ehrenfest → 保守体系</h3>
        <EqMap edges={EQMAP_DYN} labels={EQMAP_LABELS} />
        <h3>叠加线：振幅相加 → 干涉项；正交末态 → 概率相加</h3>
        <EqMap edges={EQMAP_SUP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十四张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <SecE />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 补充材料与第 IV 章：自旋 1/2 与两能级体系">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="born_rule" /> · <C id="reduction" /> · <C id="schrodinger" /> · <C id="ehrenfest" /> · <C id="bohr" /> · <C id="amplitude" /></p>
      </Block>
    </TextbookPage>);
}

const PostRow = ({ tex }) => <TxI>{tex}</TxI>;
