// 第 7 章（上）半导体掺杂：宏观扩散（Plummer & Griffin, Integrated Circuit Fabrication, PDF pp. 304–336/337，§7.1–7.11）——主文件
// 高层理解层在 _ch07_overview.jsx；符号词典在 _ch07_notation.jsx；正文在 _ch07_s1/s4/s6/s8/s11.jsx；
// 交互图在 _ch07_plots.jsx（数值函数 _ch07_phys.jsx），三维图在 _ch07_three.jsx，自绘示意图在 _ch07_figs.jsx。
// §7.12 起（原子尺度机制、点缺陷）由 ch07b 负责；本章 Summary of Key Ideas 与 References 归 ch07b。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch07_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_FICK, EQMAP_EXT, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch07_overview.jsx";
import { Sec71, Sec72, Sec73 } from "./_ch07_s1.jsx";
import { Sec74, Sec75 } from "./_ch07_s4.jsx";
import { Sec76, Sec77 } from "./_ch07_s6.jsx";
import { Sec78, Sec79, Sec710 } from "./_ch07_s8.jsx";
import { Sec711 } from "./_ch07_s11.jsx";

const R = String.raw;

export const meta = {
  id: "ch07", no: 7, label: "第 7 章（上）", title_en: "Doping in Semiconductors (I): Macroscopic Diffusion (§7.1–7.11)", title_zh: "半导体掺杂（上）：宏观扩散", pages: "292–325（PDF 304–337）",
  one_liner: R`用 Fick 定律把"多少度、多少分钟、多少剂量"翻译成"多深的结、多大的方块电阻"，再看高浓度、电场与界面如何修改这套翻译。`,
  big_question: R`杂质在高温硅中怎样移动？给定方块电阻与结深的指标，应当选择怎样的剂量、温度和时间——这些简单答案在什么时候失效？`,
  why_it_matters: R`每个晶体管的阱、沟道、源漏都是掺杂区；它们的深度与浓度决定阈值电压、漏电与驱动电流。本章的高斯/erfc 解、$D(T)$、$(Dt)_{\rm eff}$ 与 Irvin 设计流程是工艺整合的日常工具，而浓度依赖扩散、电场与分凝则解释了为什么今天的源漏分布只能靠数值模拟。`,
  overview: R`本章（上）沿"指标 → 方程 → 解 → 参数 → 设计 → 修正"推进。**指标**（§7.1–7.2）：方块电阻 $\rho_S=\rho/x_j$ 与结深相互制约，浓度又受电激活极限约束。**方程与解**（§7.3–7.4）：Fick 第一定律 + 守恒得到扩散方程；恒定剂量给高斯、恒定表面浓度给 erfc，二者只通过 $Dt$ 依赖工艺条件。**参数与设计**（§7.5–7.7）：$D=D^0e^{-E_A/kT}$，多步热处理 $(Dt)_{\rm eff}=\sum D_it_i$；用 Irvin 曲线从 $\rho_S$、$x_j$ 反推剂量、温度与时间。**修正**（§7.8–7.11）：从原子跳跃导出差分格式与稳定条件；浓度超过 $n_i$ 时加入电场因子 $h$ 与浓度依赖的 $D_A^{\rm eff}$；界面处用分凝系数 $m$ 作边界条件。为什么 $D$ 会依赖浓度？答案在本章（下）的点缺陷机制。`,
  objectives: [
    R`由 $\rho_S=\rho/x_j$ 与积分式 \eqref{7.4} 计算均匀层与扩散层的方块电阻，理解"浅结 vs 低电阻"的矛盾`,
    R`从 Fick 第一定律与质量守恒推出 \eqref{7.7}–\eqref{7.8}，并说明 $D$ 能否提到导数外的条件`,
    R`写出并使用高斯解 \eqref{7.15}–\eqref{7.16} 与 erfc 解 \eqref{7.26}–\eqref{7.27}，求结深、表面浓度与剂量`,
    R`用表 7.2 计算 $D(T)$，用 $(Dt)_{\rm eff}=\sum D_it_i$ 合并多步热处理、换算等效时间`,
    R`按 §7.7 例题的流程，从 $\rho_S$、$x_j$、$C_B$ 设计推进与预淀积条件，并检验假设`,
    R`实现显式/隐式差分并说明 $D\Delta t/\Delta x^2\le1/2$ 的来历；解释电场因子 $h$、浓度依赖扩散的箱形分布与分凝引起的堆积/耗尽`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程中的阱注入、推进与源漏形成；方块电阻与硅化物" },
    { ch: "ch03", what: "第 3 章：点缺陷及其电荷态（式 3.11–3.13）、CZ 生长中的分凝系数" },
    { ch: "ch06", what: "第 6 章：热氧化（Deal–Grove）与氧化剂的稳态扩散" },
    { what: R`半导体物理：载流子浓度、迁移率、本征载流子浓度 $n_i$；偏微分方程的基本解法` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="十一节、四步：指标 → 方程与解 → 参数与设计 → 修正。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图：左边是常扩散系数下的解析主线，右边是数值方法与三类修正。每个节点是一个编号公式（点击放大），箭头上写着推导所用的步骤。">
        <h3>主线：Fick 定律 → 高斯与 erfc → 热预算</h3>
        <EqMap edges={EQMAP_FICK} labels={EQMAP_LABELS} />
        <h3>延伸：原子跳跃与数值解 → 电场、浓度依赖、分凝</h3>
        <EqMap edges={EQMAP_EXT} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起本章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec71 />
      <Sec72 />
      <Sec73 />
      <Sec74 />
      <Sec75 />
      <Sec76 />
      <Sec77 />
      <Sec78 />
      <Sec79 />
      <Sec710 />
      <Sec711 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 7 章（下）：扩散的原子尺度机制">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fick_laws" /> · <C id="gaussian" /> · <C id="erfc" /> · <C id="diff_length" /> · <C id="conc_dep" /> · <C id="segregation" /></p>
      </Block>
    </TextbookPage>);
}
