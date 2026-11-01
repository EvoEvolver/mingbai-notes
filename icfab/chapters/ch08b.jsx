// 第 8 章（下）离子注入：损伤、退火与瞬态增强扩散（Plummer & Griffin, PDF pp. 390–423，§8.8–8.16）——主文件
// 高层理解层在 _ch08b_overview.jsx；符号词典在 _ch08b_notation.jsx；正文 _ch08b_s8 / s9 / s10；
// 交互模型 _ch08b_plots.jsx（数值函数 _ch08b_phys.jsx），自绘图 _ch08b_figs.jsx，三维晶格 _ch08b_three.jsx。
// §8.1–8.7 由 ch08 负责；公式编号接续 (8.32)。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch08b_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_DAMAGE, EQMAP_TED, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch08b_overview.jsx";
import { Sec88 } from "./_ch08b_s8.jsx";
import { Sec89 } from "./_ch08b_s9.jsx";
import { Sec810, Sec811, Sec812, Sec813, Sec814, Sec815 } from "./_ch08b_s10.jsx";

const R = String.raw;

export const meta = {
  id: "ch08b", no: 8, label: "第 8 章（下）", title_en: "Ion Implantation (II): Damage, Annealing and TED (§8.8–8.16)", title_zh: "离子注入（下）：损伤、退火与瞬态增强扩散", pages: "390–423",
  one_liner: R`注入的代价是损伤：每个离子撞出上千个原子，大剂量时晶格非晶化；退火修复了几乎一切，却留下"+1"个间隙原子——它们聚成 {311} 缺陷、慢慢蒸发，使杂质以正常速度的成千倍扩散，直到仓库清空。`,
  big_question: R`注入损伤有多少、在哪里、怎样被修复？修复之后残留的缺陷如何让杂质"反常"地扩散——为什么退火温度越低扩散反而越多？我们应当怎样设计退火？`,
  why_it_matters: R`在现代浅结工艺中，注入杂质在退火中移动多远主要不是由正常扩散、而是由瞬态增强扩散（TED）决定的。本章的 +1 模型与 {311} 溶解模型只用剂量、射程与温度几个量，就能定量预言 TED 的幅度（式 8.43）与持续时间（式 8.47），并解释了业界为什么从炉退火走向 RTA、尖峰与毫秒闪光退火。SIMOX 与 Smart Cut 则把注入变成制造 SOI 衬底的工具。`,
  overview: R`这是第 8 章的下半部分（§8.8–8.16；§8.1–8.7 的射程分布与阻止本领见第 8 章上）。**§8.8 损伤**：Kinchin–Pease 估计位移数 \eqref{8.32}；临界能量密度判据给出非晶化剂量 \eqref{8.34}；非晶层由固相外延修复 \eqref{8.35}，留下 EOR 位错环；阈值以下的区域只剩 +1 间隙原子，聚成 {311} 缺陷。**§8.9 TED**：团簇生长–蒸发 \eqref{8.37} 的平衡把间隙浓度钉在 $C_{\rm I}^{\max}$ \eqref{8.42}，过饱和度只依赖温度 \eqref{8.43}；表面复合通量决定持续时间 \eqref{8.47}；两者相乘得 TED 总量 \eqref{8.48}，其有效激活能为负。**§8.10–8.13** 闪光退火、其他半导体、SIMOX/Smart Cut 与等离子体浸没注入；**§8.14** 全章要点。`,
  objectives: [
    R`用 Kinchin–Pease 公式 \eqref{8.32} 与临界能量密度判据 \eqref{8.34} 估计位移数与非晶化剂量，并解释重离子与轻离子非晶化方式的差别`,
    R`描述 SPE 的速率规律 \eqref{8.35}、EOR 位错环的来源，以及低于 / 高于非晶化阈值时损伤模型的差别（图 8.34）`,
    R`陈述 +1 模型并说明 {311} 缺陷的作用；从团簇速率方程 \eqref{8.37} 推出稳态间隙浓度 \eqref{8.42} 与过饱和度 \eqref{8.43}`,
    R`由表面复合通量推出 TED 持续时间 \eqref{8.47}，并用 \eqref{8.48} 解释"低温扩散更多"、剂量与能量对 TED 的影响`,
    R`比较炉退火、RTA、尖峰与闪光退火的热预算，理解 SIMOX、Smart Cut 与 PIII 的原理与取舍`,
  ],
  prereq: [
    { ch: "ch08", what: R`第 8 章上：投影射程 $R_{\rm P}$、$\Delta R_{\rm P}$（表 8.1）、核阻止与电子阻止（式 8.28–8.31、图 8.19）` },
    { ch: "ch07b", what: R`第 7 章下：点缺陷辅助扩散，$f_{\rm I}$、$f_{\rm V}$（表 7.4），扩散系数与 $C_{\rm I}/C_{\rm I}^*$ 的关系` },
    { ch: "ch03", what: R`第 3 章：平衡点缺陷浓度（式 3.3）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="从损伤的产生，到修复，到残余缺陷引起的 TED，再到怎样退火与注入的其他用途。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两条线：损伤与非晶化（§8.8），以及 TED 的定量模型（§8.9）。每个节点是一个编号公式，箭头上写着推导用了什么。">
        <h3>损伤线：位移数 → 非晶化 → SPE</h3>
        <EqMap edges={EQMAP_DAMAGE} labels={EQMAP_LABELS} />
        <h3>TED 线：团簇反应 → 稳态过饱和度 → 持续时间 → 总量</h3>
        <EqMap edges={EQMAP_TED} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡分三组：损伤的产生与修复、残余缺陷与 TED、退火与应用。先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec88 />
      <Sec89 />
      <Sec810 />
      <Sec811 />
      <Sec812 />
      <Sec813 />
      <Sec814 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 9 章：刻蚀技术与化学机械抛光">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="plus1" /> · <C id="c311" /> · <C id="supersat" /> · <C id="ted" /> · <C id="spe" /> · <C id="flash" /></p>
      </Block>
      <Sec815 />
    </TextbookPage>);
}
