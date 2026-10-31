// 第 1 章 量子物理（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 21–86）——主文件
// 高层理解层在 _ch01_overview.jsx；符号词典在 _ch01_notation.jsx；陈述登记表在 _ch01_stmts.js（经 book.js 合并）；
// 正文：_ch01_s1.jsx（引言 + §1.1）、_s2（§1.2）、_s3（§1.3）、_s4（§1.4）、_s5（§1.5）、_s6（§1.6–1.7）、_s8（§1.8–1.10）、_ex（章末习题）；
// 交互图在 _ch01_demos.jsx（作用量变分、路径积分切片、Grassmann 积分、BPST 瞬子）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch01_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01_overview.jsx";
import { Intro, Sec11 } from "./_ch01_s1.jsx";
import { Sec12 } from "./_ch01_s2.jsx";
import { Sec13 } from "./_ch01_s3.jsx";
import { Sec14 } from "./_ch01_s4.jsx";
import { Sec15 } from "./_ch01_s5.jsx";
import { Sec16, Sec17 } from "./_ch01_s6.jsx";
import { Sec18, Sec19, Sec110 } from "./_ch01_s8.jsx";
import { Problems } from "./_ch01_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch01", no: 1, title_en: "Quantum Physics", title_zh: "量子物理", pages: "21–86",
  one_liner: R`从作用量 $S=\int L\,\dd t$ 出发，经正则量子化走到路径积分 $\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$；玻色子给出 $(\det)^{-1/2}$、费米子（Grassmann 数）给出 $\det$；规范场则携带拓扑整数——Dirac 量子化 $2eg/\hbar c\in\mathbb{Z}$ 与瞬子数 $Q$。`,
  big_question: R`量子力学能否完全用经典的作用量来表述？这种表述怎样处理费米子、场与规范对称性？为什么规范场里会自然地出现整数（磁荷、瞬子数）——这些整数背后是什么样的几何与拓扑？`,
  why_it_matters: R`本章是全书的"物理词典"。后面每个数学概念都会在这里找到物理原型：相空间的辛结构（第 5 章），Grassmann 代数 = 外代数（第 5–6 章），磁单极的两张坐标卡 = U(1) 纤维丛（第 9–10 章），瞬子数 = 第二 Chern 数（第 11 章），费米子行列式与反周期/周期边界 = 指标定理与反常（第 12–13 章），函数行列式与 $\zeta$ 正规化 = 弦论的配分函数（第 14 章）。`,
  overview: R`**§1.1 分析力学**：Hamilton 原理、Euler–Lagrange 方程、Legendre 变换与正则方程、Poisson 括号、Noether 定理。**§1.2 正则量子化**：Hilbert 空间、五条公理、两种绘景、波函数与 $\langle x|p\rangle$、谐振子的代数解法。**§1.3 路径积分**：短时传播子（命题 1.2）、$\int\mathcal{D}x\,\mathrm{e}^{\mathrm{i}S}$、虚时间与配分函数、编时乘积与生成泛函。**§1.4 谐振子**：精确的传播子、Jacobi 行列式的相消、$\zeta$ 函数正规化。**§1.5 费米子**：Grassmann 代数、Berezin 积分、Gauss 积分与 Pfaffian、相干态、反周期边界与 $2\cosh(\beta\omega/2)$。**§1.6–1.7 场论**：标量场与 Dirac 场的生成泛函、传播子与行列式。**§1.8–1.10 规范场与拓扑**：Abel 与非 Abel 规范理论、Higgs 机制、Dirac 与 Wu–Yang 磁单极、BPST 瞬子。四个交互图让你在浏览器里亲手验证：作用量的稳定性、路径积分切片的收敛、Grassmann 积分给出行列式与 Pfaffian、瞬子的自对偶与 $S=8\pi^2$。本章改正了原书约二十处笔误（见各节勘误框）。`,
  objectives: [
    R`由 $\delta S=0$ 推出 Euler–Lagrange 方程 \eqref{1.5}，经 Legendre 变换得到 Hamilton 方程 \eqref{1.17}，并用 Poisson 括号证明 Noether 定理（\sref{T1.1}）`,
    R`从正则对易关系 \eqref{1.32} 推出 $\hat p=-\mathrm{i}\,\dd/\dd x$ 与 $\langle x|p\rangle$（\sref{P1.1}），用升降算符求出谐振子谱 \eqref{1.66}`,
    R`推导短时传播子 \eqref{1.92} 并由此写出路径积分 \eqref{1.95}–\eqref{1.97}；说明为什么路径积分自动给出编时乘积 \eqref{1.118}`,
    R`用路径积分算出谐振子的传播子 \eqref{1.149} 与配分函数 \eqref{1.150}，并用 $\zeta$ 函数正规化计算函数行列式 \eqref{1.162}`,
    R`熟练进行 Grassmann 积分：$\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*M\theta}=\det M$、$\det a=\operatorname{Pf}(a)^2$，并解释费米子配分函数中的反周期边界条件`,
    R`写出 Abel 与非 Abel 规范变换、协变导数与场强 \eqref{1.264}，并由 Wu–Yang 构造推出 Dirac 量子化条件 \eqref{1.287}；解释瞬子的 Bogomolny 下界 \eqref{1.299}`,
  ],
  prereq: [
    { what: R`本科分析力学（Lagrange 方程、Hamilton 方程）与量子力学（Schrödinger 方程、谐振子）；线性代数（行列式、本征值、对角化）；复变函数（Cauchy 定理）；Maxwell 方程` },
    { what: R`后续章节会用到的预告：第 5 章的微分形式与辛结构、第 9–10 章的纤维丛与联络、第 11 章的示性类——本章只需直观理解，不需要预先掌握` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["T1.1", "L1.1", "P1.1", "L1.2", "P1.2", "P1.3", "L1.3", "L1.4"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="分析力学 → 正则量子化 → 路径积分 → 谐振子 → 费米子 → 场 → 规范场与拓扑。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。主干是"作用量 → 路径积分"，三条支线分别通向配分函数与 $\zeta$ 正规化、Grassmann 积分与费米子行列式、规范场的拓扑整数。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定理、引理与命题的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={OWN} highlight="ch01" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec11 />
      <Sec12 />
      <Sec13 />
      <Sec14 />
      <Sec15 />
      <Sec16 />
      <Sec17 />
      <Sec18 />
      <Sec19 />
      <Sec110 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 2 章：数学预备">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="path_integral" /> · <C id="grassmann" /> · <C id="gauge" /> · <C id="monopole" /> · <C id="instanton" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
