// 第 2 章 膨胀的宇宙（Modern Cosmology, 2nd ed., pp. 21–56）——主文件
// 高层理解层在 _ch02_overview.jsx；符号词典在 _ch02_notation.jsx；
// 各节正文在 _ch02_s1.jsx … _ch02_s5.jsx、习题在 _ch02_ex.jsx；交互图在 _ch02_plots.jsx，数值函数在 _ch02_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Eq, Box } from "@kit";
import { NOTATION } from "./_ch02_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_GEOM, EQMAP_MATTER, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02_overview.jsx";
import { Sec21 } from "./_ch02_s1.jsx";
import { Sec22 } from "./_ch02_s2.jsx";
import { Sec23 } from "./_ch02_s3.jsx";
import { Sec24 } from "./_ch02_s4.jsx";
import { Sec25 } from "./_ch02_s5.jsx";
import { Exercises } from "./_ch02_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch02", no: 2, title_en: "The expanding universe", title_zh: "膨胀的宇宙", pages: "21–56",
  one_liner: R`给"均匀膨胀的宇宙"配上两套语言——度规与分布函数——由此推出红移、各种距离、各成分密度的演化，并清点宇宙的家底。`,
  big_question: R`如果宇宙只是在均匀地"变大"，光的能量、天体的距离、各种成分的密度和温度会怎样随之改变？今天的宇宙里各有多少光子、中微子、重子、暗物质和暗能量？`,
  why_it_matters: R`后面所有章节研究的扰动，都是叠加在这个"零阶宇宙"上的小涨落。本章得到的 $E\propto1/a$、$\chi(z)$、$\rho\propto a^{-3(1+w)}$、$T_\nu/T$ 和 $a_{\rm eq}$ 是全书反复使用的基本工具与参数；而超新星与 BAO 之所以能证明暗能量存在，靠的正是本章定义的"距离"。`,
  overview: R`本章分两条线推进。**几何线**：用度规描述膨胀的空间（FLRW 度规），用测地线方程追踪粒子，得到光子能量按 $1/a$ 红移；再沿光线积分得到共动距离、共形时间、角直径距离与光度距离。**物质线**：用能动张量守恒得到各成分密度随 $a$ 的演化 $\rho_s\propto a^{-3(1+w_s)}$，用分布函数把密度、压强与温度联系起来，并证明共动熵守恒。两条线在 §2.4 汇合：逐项清点光子、重子、暗物质、中微子与暗能量，求出物质–辐射相等时刻 $a_{\rm eq}$，并说明距离测量如何揭示暗能量。`,
  objectives: [
    R`由 FLRW 度规 \eqref{2.12} 和 Christoffel 符号公式 \eqref{2.21} 算出 $\Gamma^\mu{}_{\alpha\beta}$，并用测地线方程证明无质量粒子能量 $E\propto 1/a$`,
    R`写出共动距离 $\chi(z)$、共形时间 $\eta$、角直径距离 $d_A$ 与光度距离 $d_L$ 的定义并数值计算它们`,
    R`从能动张量守恒 $\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ 推出连续性方程 \eqref{2.56}，进而得到 $\rho_s\propto a^{-3(1+w_s)}$ 与熵密度 $s\propto a^{-3}$`,
    R`用分布函数计算光子能量密度 $\rho_\gamma=\pi^2T^4/15$、$\Omega_\gamma h^2$，并用熵守恒推出 $T_\nu/T=(4/11)^{1/3}$`,
    R`估算 $\Omega_\nu h^2=\sum m_\nu/94\,\mathrm{eV}$、物质–辐射相等时刻 $a_{\rm eq}$，并理解超新星、BAO 对暗能量的证据`,
  ],
  prereq: [
    { ch: "ch01", what: "第 1 章：标度因子 a(t)、哈勃率 H、Friedmann 方程 (1.3) 与临界密度 (1.4)" },
    { what: R`狭义相对论的四矢量与 Minkowski 度规；量子统计（玻色–爱因斯坦 / 费米–狄拉克分布）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="2.0" title="Introduction" zh="引言：零阶宇宙"
      gist={R`本章只研究一个**光滑**（空间均匀）且各成分处于**平衡分布**的宇宙——"零阶宇宙"；并从此采用自然单位制 $\hbar=c=k_{\rm B}=1$。`}
      why={R`后续各章的一切结构都是对这个零阶宇宙的微小偏离；不先把背景弄透，扰动就无从谈起。`}
      gives={["2.1"]}>
      <Tx>{R`第 1 章我们用"膨胀的网格"和几个手势论证，大致知道了宇宙在变大、光会红移、物质和辐射会以不同速率稀释。这一章要把这些直觉变成**能算的工具**。打个比方：远洋航海者光知道"地球是圆的"还不够，他需要六分仪和航海表。我们需要的两件仪器是：

◆ **度规**（metric）——广义相对论的语言，用来描述"空间本身在变大"这件事，以及光和粒子在其中如何运动；

◆ **分布函数**（distribution function）——统计力学的语言，用来描述宇宙中成群的粒子：它们有多少、能量多大、压强多大。

用这两件工具，我们会依次得到：光的红移；膨胀宇宙中几种不同的"距离"（理解暗能量证据离不开它们）；各成分能量密度随标度因子的演化；最后做一次**宇宙清点**（cosmic inventory），算出第 1 章图 1.3 里那个物质–辐射相等的时刻 $a_{\rm eq}$。`}</Tx>
      <Box kind="key" title="整章的两个前提">{R`**(1) 空间均匀**（spatially homogeneous）：物质、辐射等各成分的密度不随位置变化——宇宙是"光滑的"。

**(2) 平衡分布**（equilibrium distribution，见 \secref{2.3}）：各成分的粒子按热平衡的统计分布。

这两条与观测相符，而且其成立的原因也已被理解。它们定义了宇宙学家的"**零阶宇宙**"。后面各章研究的扰动都是围绕它展开的：偏离均匀、偏离平衡，正是宇宙中一切丰富结构的来源。所以先把零阶宇宙吃透，是后面一切的地基。`}</Box>
      <Tx>{R`在动手之前先约定单位。从本章开始全书采用**自然单位制**：`}</Tx>
      <Eq n="2.1" say="把光速、约化普朗克常数和玻尔兹曼常数都设为 1：长度、时间、质量、能量、温度从此可以用同一种单位（通常是 eV 的幂次）表示。">{R`\hbar = c = k_{\rm B} = 1.`}</Eq>
      <Tx>{R`研究论文大多用这套单位，越早习惯越好。它的意思并不是这些常数"不存在"，而是我们把它们吸收进单位的定义里：需要回到实验室单位时，按量纲把 $\hbar$、$c$、$k_{\rm B}$ 的幂次补回去即可。如果你对此感到不安，请先做 \exref{2.1}。`}</Tx>
      <Box kind="note" title="自然单位制下的换算">{R`令 $\hbar=c=k_{\rm B}=1$ 后，常用换算：$1\,\mathrm{eV}=11605\,\mathrm K$（温度），$\hbar c=1.973\times10^{-5}\,\mathrm{eV\,cm}$（长度 $\leftrightarrow$ 能量$^{-1}$），$1\,\mathrm{eV}=1.783\times10^{-33}\,\mathrm{g}$（质量），$\hbar=6.582\times10^{-16}\,\mathrm{eV\,s}$（时间 $\leftrightarrow$ 能量$^{-1}$）。`}</Box>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="两条线（几何、物质）七步走。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章的两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。悬停看上下游。">
        <h3>几何线：度规 → 红移 → 距离</h3>
        <EqMap edges={EQMAP_GEOM} labels={EQMAP_LABELS} />
        <h3>物质线：守恒律与统计 → 熵 → 宇宙清点</h3>
        <EqMap edges={EQMAP_MATTER} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec21 />
      <Sec22 />
      <Sec23 />
      <Sec24 />
      <Sec25 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 3 章：Einstein 方程与 Boltzmann 方程">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="flrw" /> · <C id="redshift" /> · <C id="distances" /> · <C id="eos" /> · <C id="entropy_nu" /> · <C id="dark_energy" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
