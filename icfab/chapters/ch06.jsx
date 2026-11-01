// 第 6 章 半导体/绝缘体界面：热氧化（Plummer & Griffin, PDF pp. 254–303）——主文件
// 高层理解层在 _ch06_overview.jsx；符号词典在 _ch06_notation.jsx；数值模型在 _ch06_phys.jsx；
// 自绘图在 _ch06_draw.jsx，交互图在 _ch06_plots.jsx，三维场景在 _ch06_three.jsx；正文在 _ch06_s1.jsx … _ch06_s5.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx } from "@kit";
import { NOTATION } from "./_ch06_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_KIN, EQMAP_EL, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch06_overview.jsx";
import { Sec61, Sec62 } from "./_ch06_s1.jsx";
import { Sec63, Sec64, Sec65, Sec66, Sec67 } from "./_ch06_s2.jsx";
import { Sec68, Sec69 } from "./_ch06_s3.jsx";
import { Sec610 } from "./_ch06_s4.jsx";
import { Sec611, Sec612 } from "./_ch06_s5.jsx";

const R = String.raw;

export const meta = {
  id: "ch06", no: 6, title_en: "Semiconductor/Insulator Interfaces", title_zh: "半导体/绝缘体界面：热氧化", pages: "254–303",
  one_liner: R`氧化剂穿过氧化层扩散、在 Si/SiO$_2$ 界面反应：由串联通量推出 Deal–Grove 线性–抛物线律，再加上薄氧、压强、晶向、掺杂与应力修正；最后用 C–V 看清界面电荷，并走向高 k 与 SiC。`,
  big_question: R`一层几纳米到一微米的 SiO$_2$ 是怎样“长”出来的——厚度怎样随温度、时间、气氛、晶向、掺杂和形貌变化？长出来的界面有多“干净”，又怎样在每 $10^4$ 个原子才一个缺陷的水平上把它测出来？`,
  why_it_matters: R`热氧化是硅工艺的基石：栅介质、垫氧、场氧、掩蔽层都靠它；工艺模拟器中的氧化模型就是本章的式 (6.8)–(6.25)。C–V 是监控每一道氧化与退火的标准手段，而 EOT 与高 k 是今天先进逻辑工艺的核心。本章的“串联阻力”思想还会在第 7 章（OED）和第 10 章（CVD）中反复出现。`,
  overview: R`本章沿两条线展开。**生长线**（§6.2–§6.8）：从氧化剂“先穿过、再反应”的图景出发，稳态 $F_2=F_3$ 给出 $dx_o/dt=B/(2x_o+A)$，积分得线性–抛物线律 \eqref{6.9}；$B$ 管扩散、$B/A$ 管界面，二者服从 Arrhenius 律；然后依次加上干氧薄氧异常（Massoud）、压强（Henry 定律）、晶向、重掺杂（空位）、点缺陷注入与二维应力。**界面线**（§6.9–§6.12）：四类氧化层电荷的来源与消除；MOS 电容 C–V 的积累–耗尽–反型、高低频与深耗尽、平移与拉伸、准静态测 $D_{it}$；隧穿把 SiO$_2$ 逼到极限后，EOT 与高 k 介质接班；最后把 Deal–Grove 推广到放出 CO 的 SiC 氧化。`,
  objectives: [
    R`从 $F_2=D(C^*-C_i)/x_o$ 与 $F_3=k_sC_i$ 出发推导 \eqref{6.8}–\eqref{6.11}，说出 $A$、$B$、$B/A$、$\tau$ 的物理含义，并判断给定条件处于线性区还是抛物线区`,
    R`用表 6-1 的 Arrhenius 参数计算任意温度、气氛、晶向、分压下的氧化层厚度与硅消耗量（0.44 $x_o$），包括两步氧化`,
    R`解释薄氧异常、压强、晶向、重掺杂、二维应力各自修改的是 $B$ 还是 $B/A$，以及原因`,
    R`区分 $Q_f$、$Q_m$、$Q_{ot}$、$Q_{it}$ 的位置、来源与消除方法；读懂理想与非理想的 C–V 曲线，从中提取 $C_{ox}$、$N_D$、$V_{FB}$、$Q_f$、$D_{it}$`,
    R`用 EOT 关系设计高 k 栅叠层，说明高 k 材料的选择约束；写出 SiC 氧化的修正 Deal–Grove 模型`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 工艺中栅氧、STI 衬垫氧化、间隔层等氧化层的用途" },
    { ch: "ch03", what: "第 3 章：晶向、点缺陷（空位、间隙原子）及其荷电态统计（式 3.8–3.13）" },
    { ch: "ch04", what: "第 4 章：可动离子沾污与阈值漂移（式 4.1）、清洗形成的化学氧化层" },
    { what: R`半导体物理基础：费米能级、耗尽近似、MOS 结构；Fick 第一定律` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Sec613() {
  return (
    <Sec n="6.13" title="Summary of Key Ideas" zh="要点总结"
      gist={R`热氧化把硅与其他半导体区分开来；生长遵循线性–抛物线律并已推广到薄氧、掺杂、二维形貌；氧化会通过点缺陷影响扩散；C–V 是表征任何半导体/绝缘体界面的通用工具；SiO$_2$ 栅介质缩小的终点由铪基高 k 接替。`}
      why={R`把一章的模型放回整个工艺流程中看：它们最终都进入工艺模拟器，并与其他工序耦合。`}
      gives={["6.9", "6.31", "6.39"]}>
      <Tx>{R`**为什么是硅。**能轻松长出 SiO$_2$，正是硅技术与其他一切半导体的分水岭。SiO$_2$ 附着牢、化学惰性较好、能掩蔽扩散与注入、易于图形化；但它真正的力量在于与硅之间近乎完美的电学界面：电荷少且可重复，界面几乎原子级突变。所以硅表面的结能被近乎理想地钝化，依赖表面性质的器件（尤其 MOS）容易做出来；即使双极晶体管这类不以表面为主的器件，也不会被寄生表面效应拖累。没有第二种半导体/绝缘体界面集齐了这些优点。

**怎么长。**基本机理是氧化剂穿过 SiO$_2$ 输运到 Si/SiO$_2$ 界面，在那里发生简单的化学反应生成新的氧化层，一般遵循线性–抛物线律。这一基本模型已被推广到原始形式失灵的情形：重掺杂衬底、二维效应、薄氧化层；同样的思想也用于工艺中常被氧化的多晶硅与硅化物。本章还引入了氧化与其他工序（如扩散）相互作用的概念：氧化增强/阻滞扩散（OED/ORD），以及氧化中的杂质再分布与分凝——第 7 章讲完杂质扩散的基本概念后再详谈。

**怎么测。**C–V 法被广泛使用、极为有用，能表征一切半导体/绝缘体界面上的电荷与缺陷。本章以近乎完美的 Si/SiO$_2$ 为例，但同样的方法在其他材料体系中给出同样有用的信息。

**往哪去。**约 2005 年 MOS 栅介质的 SiO$_2$ 厚度缩小走到尽头，业界大举寻找替代的高 k 介质；约 2008 年起铪基介质结构被证明可行并进入量产，第 2 章的 CMOS 流程就用了这样的工艺。

**模型的归宿。**本章的许多模型与物理机理都已写进工艺模拟器，今天它们能准确预言超大规模集成（VLSI）结构中的氧化过程；随着对极小结构的理解加深，新模型不断被加入。当 OED 这类耦合现象出现时，模拟器尤其有力——它们能同时追踪相互作用的多种现象与相应模型。`}</Tx>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="两条线：先“怎么长”（§6.2–§6.8），再“长得好不好、怎么测、往哪去”（§6.9–§6.12）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>生长线：串联通量 → Deal–Grove → 各种修正</h3>
        <EqMap edges={EQMAP_KIN} labels={EQMAP_LABELS} />
        <h3>界面线：C–V 与 EOT</h3>
        <EqMap edges={EQMAP_EL} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec61 />
      <Sec62 />
      <Sec63 />
      <Sec64 />
      <Sec65 />
      <Sec66 />
      <Sec67 />
      <Sec68 />
      <Sec69 />
      <Sec610 />
      <Sec611 />
      <Sec612 />
      <Sec613 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 7 章：半导体掺杂——宏观扩散">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="three_fluxes" /> · <C id="linear_parabolic" /> · <C id="point_defects" /> · <C id="cv_method" /> · <C id="high_k" /></p>
      </Block>
    </TextbookPage>);
}
