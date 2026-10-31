// 第 1 章 协调宇宙学模型（Modern Cosmology, 2nd ed., pp. 1–20）——主文件
// 高层理解层在 _ch01_overview.jsx；符号词典在 _ch01_notation.jsx；
// 正文：_ch01_s1.jsx（开篇 + §1.1）、_ch01_s2.jsx（§1.2–1.4）、_ch01_s3.jsx（§1.5–1.7）；习题 _ch01_ex.jsx；
// 交互图 _ch01_plots.jsx，数值函数 _ch01_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch01_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01_overview.jsx";
import { Sec10, Sec11 } from "./_ch01_s1.jsx";
import { Sec12, Sec13, Sec14 } from "./_ch01_s2.jsx";
import { Sec15, Sec16, Sec17 } from "./_ch01_s3.jsx";
import { Exercises } from "./_ch01_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch01", no: 1, title_en: "The concordance model of cosmology", title_zh: "协调宇宙学模型", pages: "1–20",
  one_liner: R`用最少的公式讲完宇宙史：膨胀（$a$、$z$、$H$）、四根观测支柱（哈勃图、核合成、微波背景、大尺度结构），以及由此拼出的 $\Lambda$CDM 协调模型——并给出全书的路线图。`,
  big_question: R`我们凭什么说宇宙起源于一个炽热、致密、光滑的状态，并在膨胀中冷却、成团成今天的样子？要让所有观测自洽，宇宙里必须有哪些成分——其中哪些是标准模型之外的？`,
  why_it_matters: R`这是全书的"地图"。后面十三章的每一个计算——度规与距离、Boltzmann 方程、核合成与复合、扰动方程、暴胀、转移函数、CMB 功率谱、星系成团与透镜——都是为了亲手算出本章图 1.3、1.6、1.9、1.10 中的理论曲线。本章引入的 $a$、$z$、$H_0$、$h$、$\rho_{\rm cr}$、$T=T_0/a$ 与 Friedmann 方程是贯穿全书的基本语言。`,
  overview: R`本章先建立描述光滑宇宙的语言：标度因子 $a(t)$ 与红移 \eqref{1.1}、哈勃率 \eqref{1.2}、Friedmann 方程 \eqref{1.3} 与临界密度 \eqref{1.4}；由各成分的标度律（物质 $a^{-3}$、辐射 $a^{-4}$、$\Lambda$ 常数）得出宇宙史的三个时期与温度 $T=T_0/a$ \eqref{1.5}。然后依次介绍四根观测支柱：哈勃图 \eqref{1.8}、大爆炸核合成（重子只占约 5%）、宇宙微波背景（黑体谱 \eqref{1.9} 与 $10^{-5}$ 的各向异性）、大尺度结构（功率谱 \eqref{1.10} 与引力不稳定性）。§1.6 把它们拼成 $\Lambda$CDM：平直 + 冷暗物质 + 宇宙学常数 + 暴胀；§1.7 用时间线（图 1.11）把整段历史串起来，并用图 1.12 给出全书路线。`,
  objectives: [
    R`解释共动距离与物理距离、标度因子与红移的关系 \eqref{1.1}，并在 $t$、$a$、$z$、$T$ 之间互相换算`,
    R`写出 Friedmann 方程 \eqref{1.3} 与临界密度 \eqref{1.4}，说明物质 $\propto a^{-3}$、辐射 $\propto a^{-4}$ 的物理原因，由此得到 $a\propto t^{1/2}$、$t^{2/3}$ 与 $T\propto1/a$`,
    R`在 $\mathrm{km\,s^{-1}\,Mpc^{-1}}$、年与 eV 之间换算 $H_0$（\eqref{1.6}），算出 $\rho_{\rm cr}$ 与纯物质 / $\Lambda$CDM 宇宙的年龄（\exref{1.2}）`,
    R`说明哈勃图、BBN、CMB 黑体谱与各向异性、星系功率谱各自测量了什么，以及 BBN 如何论证非重子暗物质`,
    R`说出 $\Lambda$CDM 的成分与数值，以及为什么它们都超出粒子物理标准模型；理解宇宙学常数的精细调节与真空能问题（\exref{1.1}、\exref{1.5}）`,
  ],
  prereq: [
    { what: R`经典力学与牛顿引力；狭义相对论的基本概念（光速、静质量能 $mc^2$）` },
    { what: R`统计物理中的黑体辐射（普朗克公式）；傅里叶变换的基本概念` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="七节加习题：先建立膨胀的语言，再看四根观测支柱，最后拼出协调模型并画出全书路线。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="本章公式不多，但每个都是全书的基本工具。箭头上写着从一式到另一式用了什么；悬停看上下游。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡覆盖膨胀的背景、观测支柱、结构与 $\Lambda$CDM 的成分：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec10 />
      <Sec11 />
      <Sec12 />
      <Sec13 />
      <Sec14 />
      <Sec15 />
      <Sec16 />
      <Sec17 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 2 章：膨胀的宇宙">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="scale_factor" /> · <C id="friedmann" /> · <C id="cmb" /> · <C id="power_spectrum" /> · <C id="lcdm" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
