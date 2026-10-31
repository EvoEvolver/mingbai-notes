// 第 II 章 量子力学的数学工具（Cohen-Tannoudji, Diu, Laloë, Quantum Mechanics I, 2nd ed., pp. 87–157 / PDF 111–182）——主文件
// 高层理解层在 _ch02_overview.jsx；符号词典在 _ch02_notation.jsx；
// 正文：_ch02_s1.jsx（§A）… _ch02_s6.jsx（§F）；交互图在 _ch02_plots.jsx，数值核心在 _ch02_linalg.js。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch02_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02_overview.jsx";
import { SecA } from "./_ch02_s1.jsx";
import { SecB } from "./_ch02_s2.jsx";
import { SecC } from "./_ch02_s3.jsx";
import { SecD } from "./_ch02_s4.jsx";
import { SecE } from "./_ch02_s5.jsx";
import { SecF } from "./_ch02_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch02", no: 2, title_en: "The mathematical tools of quantum mechanics", title_zh: "量子力学的数学工具", pages: "87–157",
  one_liner: R`把"波函数"升级为抽象态矢量 $\ket{\psi}$：学会选基（表象）、用 Dirac 记号运算、对角化可观测量，并用张量积组装复合系统。`,
  big_question: R`一个量子态到底"是"什么——函数 $\psi(\mathbf r)$、它的 Fourier 变换，还是一串展开系数？测量对应的算符需要满足什么数学条件，才能给出实的结果、互斥的结局和总和为 1 的概率？`,
  why_it_matters: R`第 III 章的全部假设都用本章的语言陈述：态是右矢，可观测量是本征矢完备的厄米算符，测量概率由投影算符给出，位置与动量满足 $[X,P_x]=i\hbar$。没有这套工具，后面每一页都读不下去；有了它，许多计算变成"在合适的地方插入 $\mathbb 1$"。`,
  overview: R`本章是一章"工具章"，分三步走。**第一步（§A）**在熟悉的波函数上建立矢量空间的直觉：标量积、算符、对易子、正交归一基与封闭关系，并发现平面波和 $\delta$ 函数也能充当（连续的）基。**第二步（§B、§C）**抽象化：态是右矢，线性泛函是左矢，"并排书写"规则自动产生数、右矢或算符；选定一组基，右矢变列、算符变矩阵，换基是幺正变换。**第三步（§D、§E、§F）**进入物理上最要紧的内容：本征值问题与可观测量、对易可观测量的共同本征基与 CSCO；位置与动量这两个最重要的表象与算符；以及把几个子系统组装起来的张量积。`,
  objectives: [
    R`用正交归一关系 \eqref{A-18} 与封闭关系 \eqref{A-32} 判断一组函数是否为基，并在离散基、平面波基、$\delta$ 函数基下展开波函数`,
    R`熟练使用 Dirac 记号：区分 $\braket{\varphi|\psi}$（数）与 $\ket{\psi}\bra{\varphi}$（算符），按规则求厄米共轭 \eqref{B-55}`,
    R`在任意表象中写出右矢、左矢、算符的矩阵，并用幺正矩阵 $S$ 做表象变换 \eqref{C-56}`,
    R`用久期方程 \eqref{D-14} 求本征值；理解厄米算符、可观测量、谱分解 \eqref{D-36-b} 与 CSCO`,
    R`推出位置表象中 $\mathbf P=\frac\hbar i\boldsymbol\nabla$ 与正则对易关系 \eqref{E-30}；用张量积描述三维粒子与两粒子系统`,
  ],
  prereq: [
    { ch: "ch01", what: "第 I 章：波函数及其概率解释、Fourier 变换与波包" },
    { what: R`线性代数（矩阵、行列式、对角化）；附录 I（Fourier 变换）、附录 II（$\delta$ 函数）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="六节一条线：先在波函数上建立直觉，再抽象为 Dirac 记号与表象，最后处理本征值问题、位置/动量与张量积。点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="每个节点是一个编号公式（点击放大），箭头上写着从上一式到下一式用了什么。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十三张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <SecE />
      <SecF />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 III 章：量子力学的基本假设">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="closure" /> · <C id="observable" /> · <C id="csco" /> · <C id="canonical" /> · <C id="tensor" /></p>
      </Block>
    </TextbookPage>);
}
