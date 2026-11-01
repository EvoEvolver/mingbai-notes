// 第 5 章（下）光刻：曝光与光刻胶建模、分辨率增强、纳米压印（Plummer & Griffin, PDF pp. 200–253）——主文件
// §5.1–5.4 在 ch05.jsx（第 5 章上）。公式编号接续第 5 章：(5.17)–(5.65)，图 5.31–5.80，表 5.1。
// 高层理解层：_ch05b_overview.jsx；符号词典：_ch05b_notation.jsx；正文：_ch05b_s5/s6/s7.jsx；
// 交互模型：_ch05b_sim.jsx（数值核心 _ch05b_phys.jsx）、_ch05b_three.jsx（Three.js 空间像曲面）；自绘插图：_ch05b_figs.jsx；
// 页内引用记号 \eqb \figb \secb 与跨页 \eqa \figa \seca：_ch05b_kit.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import "./_ch05b_kit.jsx";
import { NOTATION } from "./_ch05b_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_OPT, EQMAP_RES, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch05b_overview.jsx";
import { Sec55 } from "./_ch05b_s5.jsx";
import { Sec56 } from "./_ch05b_s6.jsx";
import { Sec57, Sec58, Sec59 } from "./_ch05b_s7.jsx";

const R = String.raw;

export const meta = {
  id: "ch05b", no: 5, label: "第 5 章（下）", title_en: "Lithography (II): Modeling, Resolution Enhancement, Nanoimprint (§5.5–5.9)", title_zh: "光刻（下）：曝光与光刻胶建模、分辨率增强、纳米压印", pages: "200–253",
  one_liner: R`把"掩模 → 空间像 → 潜像 → 胶轮廓"写成可计算的方程链（傅里叶光学 + Dill 胶化学），再用它解释 193 nm 光刻怎样靠"掩模不像图形"印出 20 nm 级图形。`,
  big_question: R`给定一块掩模和一台光刻机，胶里最终会留下什么形状？反过来，要印出比波长小十倍的图形，掩模、光源、胶和工艺该怎样设计？`,
  why_it_matters: R`今天每一张先进芯片的掩模都由计算光刻软件反解成像方程生成；工艺工程师调剂量、焦距、PEB、BARC 时依赖的也正是本章的模型。理解 $I_{\rm i}=|\mathcal F^{-1}\{\mathcal F\{t\}P\}|^2$、$\alpha=Am+B$ 与 $k_1$ 的含义，是读懂 OPC、多重图形化与 EUV 取舍的前提。`,
  overview: R`本页是第 5 章的下半部分（§5.5–5.9），公式与图号接续上半部分。**光学线**（§5.5）：单色光场的复振幅 → 掩模的远场衍射就是傅里叶变换 → 物镜光瞳是截止频率 $\mathrm{NA}/\lambda$ 的低通滤波器 → 逆变换取模平方得空间像；斜入射平移频谱、部分相干按强度叠加；接近式曝光用 Fresnel 积分。**化学线**（§5.6）：Helmholtz 方程给出胶内光强（含驻波），Dill 的 $A$、$B$、$C$ 描述 DNQ 胶的吸收、漂白与曝光，CAR 用产酸 + PEB 催化去保护；PEB 的扩散抹平驻波；显影速率模型把潜像变成轮廓。**应用**（§5.7）：离轴/Köhler 照明、浸没、多层胶与 BARC、设计规则、OPC、移相掩模、计算光刻、多重图形化与 SADP，把 193 nm 光刻的 $k_1$ 从 0.6 压到约 0.1。最后介绍绕开光学的纳米压印（§5.8）并总结全章（§5.9）。页面上有一维空间像计算器、二维空间像三维曲面、曝光–PEB–显影截面仿真等可交互模型。`,
  objectives: [
    R`写出投影成像的运算链 \eqb{5.21}–\eqb{5.28}，说明光瞳为何是低通滤波器、为何相干照明下可分辨节距为 $\lambda/\mathrm{NA}$`,
    R`用斜入射（\eqb{5.29}）与部分相干叠加（\eqb{5.31}）解释离轴照明如何把极限推到 $\lambda/2\mathrm{NA}$；用 Fresnel 数判断接近式曝光的分辨能力`,
    R`由 Lambert 定律推出 Dill 模型 $\alpha=Am+B$、$dm/dt=-CIm$，并能从透过率曲线反推 $A$、$B$、$C$（\eqb{5.45}–\eqb{5.47}）`,
    R`说明 CAR 的产酸–催化去保护（\eqb{5.51}、\eqb{5.55}），PEB 扩散长度（\eqb{5.53}）对驻波的作用，以及 Dill/Mack 显影模型`,
    R`计算浸没的焦深增益（\eqb{5.58}）、临界角（\eqb{5.59}）、BARC 反射率（\eqb{5.62}）与移相层厚度（\eqb{5.65}）；解释 OPC、PSM、多重图形化与 SADP 的原理和代价`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章（上）：Rayleigh 分辨率 $k_1\lambda/\mathrm{NA}$（式 5.8）、焦深（式 5.12）、MTF（式 5.13）、部分相干（图 5.26）、DNQ 胶与 CAR 的化学（§5.2.4）` },
    { what: R`傅里叶变换与卷积的基本性质；一级反应动力学与扩散长度 $\sqrt{2Dt}$` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="第 5 章下半部分五步走：先算光，再算胶，然后用这套工具解释各种分辨率增强手段，最后看一条绕开光学的路线。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>光学线：掩模 → 频谱 → 空间像</h3>
        <EqMap edges={EQMAP_OPT} labels={EQMAP_LABELS} />
        <h3>化学线：吸收 → 潜像 → PEB → 显影；以及 BARC</h3>
        <EqMap edges={EQMAP_RES} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起本章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec55 />
      <Sec56 />
      <Sec57 />
      <Sec58 />
      <Sec59 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 6 章：半导体/绝缘体界面——热氧化">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fourier_optics" /> · <C id="pupil_lowpass" /> · <C id="dill_abc" /> · <C id="opc" /> · <C id="psm" /> · <C id="multipatterning" /></p>
      </Block>
    </TextbookPage>);
}
