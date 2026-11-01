// 第 2 章 现代 CMOS 工艺（Plummer & Griffin, Integrated Circuit Fabrication, PDF pp. 46–76）——主文件
// 高层理解层：_ch02_overview.jsx；符号词典：_ch02_notation.jsx；正文：_ch02_s1…s4.jsx；
// 截面几何与自绘图：_ch02_xsec.jsx（平面）、_ch02_fin.jsx（FinFET）、_ch02_figs.jsx；分步搭建器（Three.js）：_ch02_build.jsx；交互图：_ch02_plots.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch02_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, FlowMap, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02_overview.jsx";
import { ProcessBuilder } from "./_ch02_build.jsx";
import { Sec21, Sec22, Sec23, Sec24 } from "./_ch02_s1.jsx";
import { Sec25, Sec26, Sec27, Sec28 } from "./_ch02_s2.jsx";
import { Sec29, Sec210, Sec211, Sec212 } from "./_ch02_s3.jsx";
import { Sec213, Sec214 } from "./_ch02_s4.jsx";

const R = String.raw;

export const meta = {
  id: "ch02", no: 2, title_en: "Modern CMOS Technology", title_zh: "现代 CMOS 工艺", pages: "46–76（PDF）",
  one_liner: R`沿着一枚 28 nm 平面高 k 金属栅 CMOS 反相器，从裸硅片走到第一层铜互连，再看 FinFET——全书的"工艺流程地图"。`,
  big_question: R`上百亿个晶体管是怎样在同一片硅上"同时"做出来的？几十道工序为什么必须按这个顺序排？每一步又由后面哪一章的物理来支撑？`,
  why_it_matters: R`后面每一章（晶体生长、光刻、氧化、扩散、注入、刻蚀与 CMP、沉积、互连）讲的都是这条流程中的某几步。先看清全局，才知道 Deal–Grove、Fick 定律、射程理论、选择比、共形性这些模型各自在为哪个结构服务；也才理解"热预算"和"自对准"为什么支配了整条流程的先后次序。`,
  overview: R`本章按工艺顺序推进：**选衬底**（\secref{2.3}）→ **浅沟槽隔离**（\secref{2.4}）→ **阱**（\secref{2.5}）与**阈值调整**（\secref{2.6}，式 \eqref{2.1}）→ **栅氧与多晶硅假栅**（\secref{2.7}）→ **halo、延伸区、侧墙、深源漏与毫秒退火**（\secref{2.8}）→ **应变源漏**（\secref{2.9}）→ **自对准硅化物**（\secref{2.10}）→ **高 k 金属栅（后栅）**（\secref{2.11}，式 \eqref{2.2}）→ **W 接触与双大马士革铜互连**（\secref{2.12}）→ **FinFET**（\secref{2.13}）。本章只有两个编号公式，真正的"推导主线"是工艺顺序本身，所以页首用一个可前后翻步骤、可旋转观察的三维**工艺搭建器**和一张**工艺流程地图**代替推导图，每一步都链接到深入讲解的章节。`,
  objectives: [
    R`按正确顺序复述平面 28 nm 高 k 金属栅 CMOS 的主要工艺步骤，并用"热预算"与"自对准"解释这一顺序`,
    R`说明 STI 中垫氧、氮化硅、衬垫氧化、CVD 填充与 CMP 各自的作用`,
    R`用高斯模型估算注入与推进后的阱分布，用 $\Delta V_{\rm TH}=qQ_i/C_{\rm ox}$ 估算阈值调整量`,
    R`解释侧墙、LDD、halo 如何得到亚光刻尺寸的结构，以及为何源漏要用毫秒级退火`,
    R`用 $C=K\varepsilon_0/d$ 说明高 k 介质的动机，说出后栅（RMG）流程的步骤；说明铜互连为何必须用大马士革工艺`,
    R`描述简化的 FinFET 流程，并计算 $W_{\rm eff}=(2H_{\rm fin}+W_{\rm fin})/P_{\rm fin}$`,
  ],
  prereq: [
    { ch: "ch01", what: "第 1 章：摩尔定律、Dennard 缩放、技术节点与栅长（表 1.1）、FinFET/GAA 的发展（§1.6）" },
    { what: R`MOSFET 的基本工作原理（阈值电压、源漏、沟道）；pn 结与掺杂类型` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="builder" toc="工艺搭建器" kicker="动手" title="分步工艺搭建器：从裸硅片到 M1" lead="拖动滑块或点「下一步」，看器件一层层长出来；拖动画面旋转、滚轮缩放。每一步给出工艺、材料、原因、对应原书图号，以及深入讲解它的章节。可切换到 FinFET 模式对比；无 WebGL 时自动显示二维截面。">
        <ProcessBuilder />
      </Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="十四节按工艺顺序排列。点击标题跳到该节；本章的两个编号公式在 §2.6 与 §2.11。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="flowmap" toc="流程地图" kicker="工艺流程地图" title="每一步在哪一章深入讲" lead="本章是全书的地图：下表把流程分成十一段，列出对应的原书图与后续章节（点击跳转）。">
        <FlowMap />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="两个公式之间的关系" lead="本章只有两个编号公式：平板电容 (2.2) 给出栅电容，代入 (2.1) 就得到阈值调整注入造成的阈值移动。点击节点放大。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整条流程：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec21 />
      <Sec22 />
      <Sec23 />
      <Sec24 />
      <Sec25 />
      <Sec26 />
      <Sec27 />
      <Sec28 />
      <Sec29 />
      <Sec210 />
      <Sec211 />
      <Sec212 />
      <Sec213 />
      <Sec214 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 3 章：半导体材料——晶体生长、晶圆制备与材料性质">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="flow" /> · <C id="sti" /> · <C id="implant" /> · <C id="spacer" /> · <C id="hkmg" /> · <C id="finfet" /></p>
      </Block>
    </TextbookPage>);
}
