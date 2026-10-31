// 第 10 章 偏振的 CMB（Modern Cosmology, 2nd ed., pp. 271–294）——主文件
// 高层理解层在 _ch10_overview.jsx；符号词典在 _ch10_notation.jsx；
// 各节正文：_ch10_s1.jsx（引言、10.1）、_s2（10.2–10.3）、_s4（10.4–10.5）、_s6（10.6–10.7），习题在 _ch10_ex.jsx；
// 交互图在 _ch10_plots.jsx，数值函数在 _ch10_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch10_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_EB, EQMAP_SC, EQMAP_BZ, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch10_overview.jsx";
import { Intro, Sec101 } from "./_ch10_s1.jsx";
import { Sec102, Sec103 } from "./_ch10_s2.jsx";
import { Sec104, Sec105 } from "./_ch10_s4.jsx";
import { Sec106, Sec107 } from "./_ch10_s6.jsx";
import { Exercises } from "./_ch10_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch10", no: 10, title_en: "The polarized CMB", title_zh: "偏振的 CMB", pages: "271–294",
  one_liner: R`Thomson 散射把电子看到的温度**四极**变成线偏振；按每个 Fourier 模式的方向把偏振分解为 E 与 B：线性标量扰动只产生 E，引力波还产生 B。`,
  big_question: R`CMB 光子为什么会偏振、偏振有多强？怎样用坐标无关的方式描述天空上的偏振图样？为什么 B 模偏振是暴胀引力波的"确凿证据"？`,
  why_it_matters: R`偏振把 CMB 的信息量翻倍：E 模与温度的互相关（TE）在大角度上为负，直接证明扰动在进入视界前就已存在；最低多极矩的 EE 测出再电离光深 $\tau_{\rm rei}$，打破它与原初振幅 $\mathcal A_s$ 的简并。B 模则是搜寻原初引力波、测量暴胀能标的主战场（BICEP/Keck、Simons Observatory、LiteBIRD、CMB-S4）。\secref{10.1} 的 E/B 数学在第 13 章的弱引力透镜中原样复用。`,
  overview: R`先建立描述偏振的语言：偏振张量 $I_{ij}$ 与 Stokes 参数 $Q$、$U$；它们依赖坐标，于是在平直天空近似下按二维波矢 $\boldsymbol l$ 把无迹部分分解为标量 $E$ 与赝标量 $B$（\secref{10.1}）。接着用图像说明 Compton 散射只把入射辐射的四极变成偏振（\secref{10.2}），并通过对入射方向积分把它变成公式：单个标量平面波产生 $Q=4\pi A\sin^2\theta_k\Theta_2$ 而无 $U$——纯 E 模（\secref{10.3}）。然后写出偏振的 Boltzmann 方程，用视线积分求出今天的 $E_l$，紧耦合下它正比于 $(k/\tau')\Theta_1$（\secref{10.4}）；叠加得到 $C_{EE}$、$C_{TE}$，讨论 TE 反相关与再电离凸起（\secref{10.5}）。最后证明张量扰动产生 B 模（\secref{10.6}）。`,
  objectives: [
    R`由"无头矢量"推出偏振张量 \eqref{10.1}–\eqref{10.2}，掌握 $Q$、$U$ 在坐标转动下的 $2\alpha$ 变换（\exref{10.1}）`,
    R`推导 E/B 分解 \eqref{10.5}–\eqref{10.11}，理解 E 为标量、B 为赝标量，能由图样判断 E 或 B`,
    R`用 Thomson 散射的偏振因子 \eqref{10.13} 推出 \eqref{10.19}–\eqref{10.20}，说明只有四极产生偏振`,
    R`对标量平面波算出 \eqref{10.25}、\eqref{10.27}–\eqref{10.29}，并从对称性理解"标量只产生 E"`,
    R`写出并求解偏振的 Boltzmann 方程 \eqref{10.31}，推导 $E_l$ 的近似 \eqref{10.40}–\eqref{10.42}，解释偏振的大小、相位与"无 ISW"`,
    R`理解 $C_{EE}$、$C_{TE}$ 的特征（TE 反相关、再电离凸起），以及张量模产生 B 模的几何 \eqref{10.50}`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：光子 Boltzmann 方程 \eqref{5.67}–\eqref{5.68}、多极矩定义 \eqref{5.66}、Compton 散射振幅 \eqref{5.18}` },
    { ch: "ch06", what: R`第 6 章：度规扰动的标量/矢量/张量分解（\secref{6.1}）与张量模的光子各向异性（\exref{6.14}、\figref{6.1}）` },
    { ch: "ch07", what: R`第 7 章：原初功率谱 $P_{\mathcal R}$ 与张量–标量比 $r$（\eqref{7.103}）` },
    { ch: "ch09", what: R`第 9 章：紧耦合 $\Theta_2=-\frac{4k}{9\tau'}\Theta_1$ \eqref{9.36}、视线积分 \eqref{9.49}、可见度函数 \eqref{9.56}、$C(l)$ 与转移函数 \eqref{9.72}、再电离（\secref{9.7.2}）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先学会描述偏振（10.1），再弄清偏振从哪来（10.2–10.3），然后解方程、算功率谱（10.4–10.5），最后看引力波如何留下 B 模（10.6）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图对应本章三条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>描述线：偏振张量 → E/B 分解</h3>
        <EqMap edges={EQMAP_EB} labels={EQMAP_LABELS} />
        <h3>散射线：偏振截面 → 只挑出四极 → 标量只给 E</h3>
        <EqMap edges={EQMAP_SC} labels={EQMAP_LABELS} />
        <h3>求解与观测线：Boltzmann 方程 → E 模多极矩 → 功率谱；张量 → B 模</h3>
        <EqMap edges={EQMAP_BZ} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec101 />
      <Sec102 />
      <Sec103 />
      <Sec104 />
      <Sec105 />
      <Sec106 />
      <Sec107 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 11 章：结构探针——示踪体">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="eb" /> · <C id="quad_source" /> · <C id="scalar_E" /> · <C id="tight_supp" /> · <C id="te_anti" /> · <C id="bmode_gw" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
