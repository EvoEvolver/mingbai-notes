// 第 12 章 结构增长：超越线性理论（Modern Cosmology, 2nd ed., pp. 325–372）——主文件
// 高层理解层在 _ch12_overview.jsx；符号词典在 _ch12_notation.jsx；
// 各节正文：_ch12_s1（12.1）、_s2（12.2）、_s3（12.3）、_s4（12.4）、_s5（12.5）、_s6（12.6）、_s7（12.7–12.8）；习题在 _ch12_ex.jsx；
// 交互图在 _ch12_plots.jsx，数值函数在 _ch12_phys.jsx（线性功率谱沿用 _ch08_phys.jsx）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch12_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_PT, EQMAP_HALO, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch12_overview.jsx";
import { Sec121 } from "./_ch12_s1.jsx";
import { Sec122 } from "./_ch12_s2.jsx";
import { Sec123 } from "./_ch12_s3.jsx";
import { Sec124 } from "./_ch12_s4.jsx";
import { Sec125 } from "./_ch12_s5.jsx";
import { Sec126 } from "./_ch12_s6.jsx";
import { Sec127, Sec128 } from "./_ch12_s7.jsx";
import { Exercises } from "./_ch12_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch12", no: 12, title_en: "Growth of structure: beyond linear theory", title_zh: "结构增长：超越线性理论", pages: "325–372",
  one_liner: R`小尺度上 $\delta\gtrsim1$ 而势仍只有 $10^{-5}$：保留线性度规、牛顿引力，对物质求解完全非线性的 Vlasov–Poisson 方程——大尺度用微扰论，小尺度用 N 体模拟与暗物质晕，并由此理解质量函数、星系团与偏袒。`,
  big_question: R`线性理论在 $k\gtrsim k_{\rm NL}$ 失效之后，物质分布如何演化？为什么结构层级式地形成暗物质晕，晕的丰度为何对 $\sigma_8$ 指数敏感？星系这种复杂天体凭什么能用"偏袒 $\times$ 物质"描述大尺度成团？`,
  why_it_matters: R`几乎所有晚期宇宙的观测——星系成团（BAO、RSD）、星系团计数、弱引力透镜——都受非线性演化影响。本章给出第 11 章线性偏袒与无偏速度假设的依据，给出星系团宇宙学的理论（质量函数、球坍缩），也为第 13 章透镜所需的非线性物质功率谱打下基础。`,
  overview: R`先确定尺度：平滑方差 $\sigma_W(R)$ 在小尺度超过 1，但势处处很小，于是得到 Vlasov–Poisson 方程组（\secref{12.1}）。**微扰论**：取矩得到冷流体方程，迭代得 $F_n$ 核解，进而算单圈功率谱与双谱，并用有效流体声速修补被忽略的应力（\secref{12.2}）。**模拟**：壳层交叉使流体失效；N 体用蛙跳积分相空间薄片（\secref{12.3}）。**晕**：质量定义与 NFW 轮廓；球坍缩给出 $\delta_{\rm cr}=1.686$、$\Delta_{\rm vir}\approx180$；Press–Schechter 质量函数（\secref{12.4}）。**应用**：星系团的找寻与称重（\secref{12.5}）；峰–背景分离偏袒与星系的偏袒展开（\secref{12.6}）；晕模型（\secref{12.7}）。`,
  objectives: [
    R`由 \eqref{12.4} 计算 $\sigma_W(R)$，解释为何密度非线性而势仍线性，并从测地线方程推出 Vlasov 方程 \eqref{12.8}`,
    R`对 Vlasov 方程取矩得到非线性连续性 \eqref{12.14} 与 Euler 方程 \eqref{12.20}，理解应力张量与冷流体假设`,
    R`推导二阶解与核 $F_2$、$G_2$（\eqref{12.33}–\eqref{12.39}），用 Wick 定理写出单圈功率谱 \eqref{12.49} 与树图双谱 \eqref{12.51}`,
    R`理解壳层交叉、相空间薄片与 N 体蛙跳格式 \eqref{12.57}–\eqref{12.60}`,
    R`推导球坍缩摆线解、$\delta_{\rm cr}$ 与 $\Delta_{\rm vir}$，以及 Press–Schechter 质量函数 \eqref{12.73}；会用 NFW 轮廓`,
    R`由峰–背景分离推出偏袒 \eqref{12.80}–\eqref{12.81}，理解偏袒展开 \eqref{12.83}、\eqref{12.87} 与晕模型 \eqref{12.97}`,
  ],
  prereq: [
    { ch: "ch08", what: R`第 8 章：线性功率谱 \eqref{8.8}、增长因子方程 \eqref{8.75} 与增长率 \eqref{8.78}、$\sigma_R$ 与 $k_{\rm NL}$` },
    { ch: "ch05", what: R`第 5 章：无碰撞 Boltzmann 方程与取矩得到的连续性 \eqref{5.41}、Euler \eqref{5.50} 方程` },
    { ch: "ch03", what: R`第 3 章：测地线方程 \eqref{3.69}、相空间体积守恒（\secref{3.2.1}）与 Friedmann 方程 \eqref{3.90}` },
    { ch: "ch11", what: R`第 11 章：线性偏袒、噪声与红移空间畸变的假设，SZ 效应（\secref{11.3}）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先确定哪里非线性、哪里可以近似（12.1）；再走两条路：微扰论（12.2）与数值模拟（12.3）；然后研究模拟中涌现的暗物质晕（12.4），并把它们用于星系团（12.5）、星系偏袒（12.6）与晕模型（12.7）。点击标题跳到该节。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>微扰论线：Vlasov 方程 → 冷流体 → 二阶核 → 功率谱与双谱</h3>
        <EqMap edges={EQMAP_PT} labels={EQMAP_LABELS} />
        <h3>晕线：球坍缩 → 坍缩阈值 → 质量函数 → 偏袒 → 晕模型</h3>
        <EqMap edges={EQMAP_HALO} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec121 />
      <Sec122 />
      <Sec123 />
      <Sec124 />
      <Sec125 />
      <Sec126 />
      <Sec127 />
      <Sec128 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 13 章：引力透镜">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="vlasov" /> · <C id="spt" /> · <C id="spherical_collapse" /> · <C id="press_schechter" /> · <C id="bias" /> · <C id="halo_model" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
