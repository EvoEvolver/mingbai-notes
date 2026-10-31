// 第 5 章 流形（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 189–245）——主文件
// 高层理解层在 _ch05_overview.jsx；符号词典在 _ch05_notation.jsx；陈述登记表在 _ch05_stmts.js（经 book.js 合并）；
// 正文：_ch05_s1.jsx（引言 + §5.1）、_ch05_s2.jsx（§5.2）、_ch05_s3.jsx（§5.3）、_ch05_s4.jsx（§5.4）、_ch05_s5.jsx（§5.5）、
// _ch05_s6.jsx（§5.6）、_ch05_s7.jsx（§5.7）、_ch05_ex.jsx（章末习题）；交互图在 _ch05_demos.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch05_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch05_overview.jsx";
import { Intro, Sec51 } from "./_ch05_s1.jsx";
import { Sec52 } from "./_ch05_s2.jsx";
import { Sec53 } from "./_ch05_s3.jsx";
import { Sec54 } from "./_ch05_s4.jsx";
import { Sec55 } from "./_ch05_s5.jsx";
import { Sec56 } from "./_ch05_s6.jsx";
import { Sec57 } from "./_ch05_s7.jsx";
import { Problems } from "./_ch05_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch05", no: 5, title_en: "Manifolds", title_zh: "流形", pages: "189–245",
  one_liner: R`流形是用一叠光滑衔接的坐标卡拼成的空间；在上面，向量是方向导数、形式是可积分的反对称张量，流与李导数描述"沿向量场的变化"，李群把对称性也变成流形。`,
  big_question: R`怎样在一个整体上不是 $\R^m$ 的空间（球面、相空间、时空、转动群）上做微积分——求导、积分、谈论对称性——并且保证结果与坐标的选取无关？`,
  why_it_matters: R`本章是全书几何部分的地基。黎曼几何（第 7 章）在流形上加度规；de Rham 上同调（第 6 章）用本章的 $\dd^2=0$ 与 Stokes 定理；纤维丛与规范场（第 9–10 章）用李群、李代数、群作用与 Maurer–Cartan 形式。物理上，广义协变性、Maxwell 方程的形式写法 $F=\dd A$、Hamilton 力学的辛结构、旋量的来源 $\mathrm{SL}(2,\C)\to$ Lorentz 群，都在本章第一次出现。`,
  overview: R`**§5.1** 用 $S^2$ 说明需要多张坐标卡，定义微分流形并给出 $S^n$、$\RP^n$、Grassmann 流形、环面等例子。**§5.2** 在流形上建立微积分：可微映射、切向量（方向导数）、一形式、张量，以及映射诱导的推前 $f_*$ 与拉回 $f^*$。**§5.3** 把向量场积分成流，用流定义李导数，得到 $\mathcal{L}_XY=[X,Y]$ 及其几何意义。**§5.4** 定义微分形式、楔积、外微分与内积，证明 $\dd^2=0$ 与 Cartan 公式，并重写 Maxwell 方程与 Hamilton 力学。**§5.5** 讨论定向，并用单位分解定义积分。**§5.6** 李群、左不变向量场与李代数、指数映射、Maurer–Cartan 方程。**§5.7** 李群在流形上的作用、轨道与迷向群、齐性空间、诱导向量场与伴随表示。三个交互图让你拖动球面上的点核对两张卡的转移函数、亲眼看到李括号是流的"平行四边形缺口"、对随机多项式形式验证 $\dd^2=0$ 与 Stokes 定理。`,
  objectives: [
    R`写出 $S^1$、$S^n$、$\RP^n$ 的图册并验证转移函数光滑；解释 $\dim G_{k,n}(\R)=k(n-k)$（\eqref{5.14}）`,
    R`把切向量理解为方向导数，推出向量与一形式分量的变换律 \eqref{5.23}、\eqref{5.28}；用 Jacobi 矩阵计算推前 \eqref{5.33} 与拉回 \eqref{5.37}`,
    R`由向量场求流（\sref{T5.1}），用定义 \eqref{5.47} 推出 $\mathcal{L}_XY=[X,Y]$，并说明 $[X,Y]$ 是"平行四边形缺口"`,
    R`熟练计算楔积、外微分与内积；证明 $\dd^2=0$（\eqref{5.72}）与 Cartan 公式 \eqref{5.82}；用形式写出 Maxwell 方程与 Liouville 定理`,
    R`说明可定向性与积分的关系（\eqref{5.99}）；会用单位分解计算积分`,
    R`对矩阵群算出李代数（例 5.15）与指数映射；证明 Maurer–Cartan 方程；用"群模迷向群"识别齐性空间 $S^n$、$\RP^n$、$G_{k,n}(\R)$`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：拓扑空间、同胚、连续映射；向量空间、对偶空间与拉回（§2.2）；秩–零化度定理（定理 2.1）" },
    { ch: "ch04", what: R`第 4 章：$\RP^n$ 作为对径点粘合的球面（例 4.12）；万有覆叠群（§4.6）` },
    { what: R`多元微积分（链式法则、Jacobi 行列式、换元公式）；常微分方程解的存在唯一性；线性代数（矩阵指数、行列式）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D5.1", "D5.2", "D5.3", "T5.1", "P5.1", "D5.4", "D5.5", "D5.6", "D5.7", "D5.8", "T5.2", "D5.9", "D5.10", "D5.11", "D5.12", "D5.13", "P5.2", "T5.3", "D5.14", "D5.15", "D5.16", "T5.4", "D5.17"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="流形 → 微积分 → 流与李导数 → 微分形式 → 积分 → 李群 → 群作用。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。主干是"方向导数 \eqref{5.21}"：它分出推前/拉回、流与李导数、李群的左不变场三支；另一支从楔积 \eqref{5.62} 出发到外微分、积分与 Maurer–Cartan 方程。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "X:ODE-uniq", "X:Poincare-lemma", "X:T2.1"]} highlight="ch05" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec51 />
      <Sec52 />
      <Sec53 />
      <Sec54 />
      <Sec55 />
      <Sec56 />
      <Sec57 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 6 章：de Rham 上同调群">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="manifold" /> · <C id="lie_derivative" /> · <C id="ext_derivative" /> · <C id="lie_algebra" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
