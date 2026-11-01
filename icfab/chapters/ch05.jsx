// 第 5 章（上）光刻：§5.1–5.4（Plummer & Griffin, Integrated Circuit Fabrication, PDF pp. 162–199）——主文件
// 高层理解层在 _ch05_overview.jsx；符号词典在 _ch05_notation.jsx；各节正文在 _ch05_s1.jsx … _ch05_s4.jsx；
// 自绘图在 _ch05_figs.jsx，交互图在 _ch05_plots.jsx（数值函数 _ch05_phys.jsx），三维扫描机示意在 _ch05_three.jsx。
// §5.5 以后（含本章 Summary of Key Ideas）由 ch05b 负责。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch05_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch05_overview.jsx";
import { Sec51 } from "./_ch05_s1.jsx";
import { Sec52 } from "./_ch05_s2.jsx";
import { Sec53 } from "./_ch05_s3.jsx";
import { Sec54 } from "./_ch05_s4.jsx";

const R = String.raw;

export const meta = {
  id: "ch05", no: 5, title_en: "Lithography (I): History, Optics and Photoresists (§5.1–5.4)", title_zh: "光刻（上）：发展、光学基础与光刻胶", pages: "PDF 162–199（原书第 5 章前半）",
  one_liner: R`第 5 章上篇：认识光刻机的光源、掩模、曝光方式和三代光刻胶，并从衍射出发推出投影光刻的三把"尺子"——分辨率 $R=k_1\lambda/\mathrm{NA}$、焦深 $\pm k_2\lambda/\mathrm{NA}^2$、空间像调制度 MTF——以及光刻胶的对比度 $\gamma$ 与临界 MTF。`,
  big_question: R`光穿过与波长相当的掩模开口必然衍射——那么一台光刻机最小能印多大的图形、焦深有多少？光刻胶又怎样把一幅边缘模糊的空间像变成边缘陡直的图形？`,
  why_it_matters: R`每一代工艺能做多小，首先由光刻决定；它也占晶圆制造成本的三分之一以上。本篇的估算公式（$R$、DOF、MTF、$\sigma$、$\gamma$、CMTF）是理解下篇的成像仿真、分辨率增强技术（OPC、相移、浸没、多重图形）与 EUV 的共同语言，也解释了为什么后续的刻蚀、CMP、薄膜工艺都在为"更薄的胶、更平的表面"服务。`,
  overview: R`本篇沿光路走一遍。**§5.1** 列出光刻必须同时满足的五项指标。**§5.2** 介绍整条链：CAD 设计、电子束写掩模、投影曝光；以**空间像**为界，把光刻拆成光源（汞灯 → 准分子激光 → EUV 锡等离子体，式 5.1）、掩模（4 倍铬掩模、保护膜、EUV 多层膜反射掩模）、曝光系统（接触 / 接近 / 投影 / 直写，式 5.2）和光刻胶（DNQ → 化学放大 → EUV 胶）。**§5.3** 转向光学：从光线追迹到衍射，由 Airy 斑与 Rayleigh 判据推出 $R=k_1\lambda/\mathrm{NA}$，由 $\lambda/4$ 光程差判据推出焦深，再引入 MTF 与部分相干因子 $\sigma$；接近式则由近场衍射给出 $W_{\min}\approx\sqrt{\lambda g}$。**§5.4** 回到胶：用对比度 $\gamma$ 与 CMTF 刻画胶"区分明暗"的能力，得到成像条件 $\mathrm{CMTF}<\mathrm{MTF}$，并走一遍完整的胶工艺流程。`,
  objectives: [
    R`说出 g/i 线、KrF、ArF、EUV 光源的波长与产生机理，用式 (5.1) 换算光子能量，并解释 EUV 为何必须用反射光学、真空与薄胶`,
    R`比较接触、接近、投影与直写四种图形化方式的分辨率、缺陷与产能，用式 (5.2) 估算电子束直写时间`,
    R`从 Airy 斑与 Rayleigh 判据推导 $R=0.61\lambda/\mathrm{NA}$，从 $\lambda/4$ 判据推导 $\mathrm{DOF}=\pm\lambda/2\mathrm{NA}^2$，并能用 $k_1$、$k_2$ 估算任一光刻机的分辨率与焦深`,
    R`用衍射级与数值孔径解释"分辨率 = 收集了多少衍射光"，理解部分相干 $\sigma$ 如何延伸小图形的成像`,
    R`由对比度曲线求 $\gamma$ 与 CMTF，判断 $\mathrm{CMTF}<\mathrm{MTF}$；解释化学放大胶为何灵敏度高、对 PEB 温度敏感`,
    R`列出光刻胶工艺各步（HMDS、旋涂、前烘、曝光、PEB、显影、坚膜）的目的与典型条件`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程中每一层光刻的作用（如接触孔一步，图 2.23）" },
    { ch: "ch04", what: "第 4 章：洁净室、颗粒缺陷与良率模型；晶圆清洗方法" },
    { what: R`大学物理光学：干涉、单缝/圆孔衍射、Snell 定律；正态分布的 $\sigma$` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本篇路线图" lead="沿光路走：指标 → 机器与材料 → 衍射光学 → 光刻胶。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`三条线：分辨率（Airy → Rayleigh → $k_1$ 公式）、焦深（$\lambda/4$ 判据 → 小角展开 → DOF），以及把光学和胶接起来的 MTF 与 CMTF。悬停看上下游，点击节点放大。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起本篇：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec51 />
      <Sec52 />
      <Sec53 />
      <Sec54 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 5 章（下）：曝光与光刻胶建模、分辨率增强、纳米压印">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="aerial" /> · <C id="rayleigh" /> · <C id="dof" /> · <C id="mtf" /> · <C id="sigma" /> · <C id="contrast" /> · <C id="car" /></p>
      </Block>
    </TextbookPage>);
}
