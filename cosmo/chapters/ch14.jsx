// 第 14 章 分析与推断（Modern Cosmology, 2nd ed., pp. 401–432）——主文件
// 高层理解层在 _ch14_overview.jsx；符号词典在 _ch14_notation.jsx；
// 各节正文：_ch14_s1.jsx（14.1）、_s2（14.2–14.3）、_s4（14.4）、_s5（14.5–14.7）；习题 _ch14_ex.jsx；
// 交互图 _ch14_plots.jsx，数值函数 _ch14_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx } from "@kit";
import { NOTATION } from "./_ch14_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch14_overview.jsx";
import { Sec141 } from "./_ch14_s1.jsx";
import { Sec142, Sec143 } from "./_ch14_s2.jsx";
import { Sec144 } from "./_ch14_s4.jsx";
import { Sec145, Sec146, Sec147 } from "./_ch14_s5.jsx";
import { Exercises } from "./_ch14_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch14", no: 14, title_en: "Analysis and inference", title_zh: "分析与推断", pages: "401–432",
  one_liner: R`从似然出发：最大化给出估计量，曲率给出误差；用 $m$ 个样本测方差有不可消除的 $\sqrt{2/m}$ 宇宙方差；再用 Fisher 矩阵预言误差、用 MCMC 画出后验。`,
  big_question: R`一个实验记录了 $10^{12}$ 个读数，怎样把它们一步步压缩成"$\Omega_{\rm m}=0.315\pm0.007$"？每一步的最优做法是什么，误差从哪里来——为什么即使仪器完美，$l=2$ 的 $C(l)$ 仍有 63% 的误差？在几十维参数空间里，又怎样真正算出边缘化的误差棒？`,
  why_it_matters: R`前 13 章算出了理论两点函数；本章给出把它们与数据对接的全部统计机器：最优制图、功率谱估计量及其协方差（宇宙方差 + 噪声）、高斯似然、Fisher 预测与 MCMC。读懂任何一篇 CMB、星系巡天或弱透镜的参数约束论文，都需要这一章。`,
  overview: R`用称体重的例子建立似然、Bayes 定理、估计量、误差与边缘化（\secref{14.1}）；概览从原始数据到参数约束的流水线（\secref{14.2}，\figref{14.1}）；推导最优地图 \eqref{14.30}（\secref{14.3}）；构造 CMB 角功率谱与星系功率谱的估计量并求协方差 \eqref{14.48}、\eqref{14.59}（\secref{14.4}）；引入 Fisher 矩阵，区分条件误差与边缘化误差（\secref{14.5}）；最后用细致平衡与 Metropolis–Hastings 算法对后验采样（\secref{14.6}）。`,
  objectives: [
    R`写出独立高斯测量的似然 \eqref{14.2}，用 Bayes 定理得到后验 \eqref{14.5}，理解先验（包括"均匀先验"）的作用`,
    R`由最大似然推出估计量 \eqref{14.8}、\eqref{14.10}，由对数似然的曲率得到误差 \eqref{14.13}；推导方差估计的误差 $\sqrt{2/m}\,\sigma_w^2$ \eqref{14.21}，并理解它就是宇宙方差`,
    R`推导最优地图 $\hat s=C_NP^\top N^{-1}d$ 与其协方差 \eqref{14.30}–\eqref{14.31}`,
    R`推导 CMB 功率谱的似然 \eqref{14.42}、估计量 \eqref{14.44} 与协方差 \eqref{14.48}；星系功率谱的模式计数 \eqref{14.53} 与协方差 \eqref{14.59}`,
    R`构造 Fisher 矩阵 \eqref{14.68}–\eqref{14.69}，证明边缘化误差为 $\sqrt{(F^{-1})_{11}}$ \eqref{14.71}，并能做简单的实验预测`,
    R`理解 MCMC 的细致平衡条件 \eqref{14.74}，实现 Metropolis–Hastings \eqref{14.75}，会判断步长、burn-in 与样本相关`,
  ],
  prereq: [
    { ch: "ch09", what: R`第 9 章：$a_{lm}$ 的高斯分布与角功率谱 $C(l)$（\secref{9.5.2}）` },
    { ch: "ch11", what: R`第 11 章：星系功率谱与红移空间畸变 \eqref{11.23}` },
    { ch: "ch12", what: R`第 12 章：Wick 定理（Box 12.1）与非线性功率谱 \eqref{12.48}` },
    { ch: "ch05", what: R`第 5 章：Boltzmann 方程碰撞项与细致平衡（\secref{5.1}）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="14.0" title="Introduction" zh="引言：为什么要专门讲数据分析"
      gist={R`数据量呈指数增长：$m^2$ 算法很快不可行；统计误差按 $m^{-1/2}$ 下降，曾被大误差棒掩盖的系统误差浮出水面。本章给出应对大数据的分析工具：似然、两点函数估计、Fisher 矩阵、MCMC。`}
      why={R`宇宙学已进入"精确时代"：CMB 有几十个实验，星系巡天从 SDSS、2dF 发展到 DES、KiDS、HSC，2020 年代由 DESI、Euclid、Rubin/LSST 主导。数据的质与量决定了分析方法必须同步升级。`}>
      <Tx>{R`**为什么现在。**宇宙学家越来越多地关注一个基本问题：怎样最好地分析一组数据。主要原因是过去几十年数据的质量与数量都有了巨大提升，而且完全有理由相信这一趋势会持续。CMB 温度各向异性已经被几十个实验测量，下一代实验正在启动。物质的大尺度成团通过多种方式探测，这方面的活动同样毫无放缓迹象。斯隆数字巡天（SDSS）与 2dF 星系红移巡天完成之后，人们开展了千平方度巡天（KiDS）、暗能量巡天（DES）、Hyper Suprime-Cam 巡天等大型星系透镜巡天，以及 SDSS 的光谱后续。2020 年代，暗能量光谱仪（DESI）、Euclid 卫星与 Vera Rubin 天文台的时空遗产巡天（LSST）将主导这一领域。这些巡天交付的海量数据为分析带来了新的挑战。

**两个层面的困难。**数据集越大，传统使用的简单算法就越不够用。其一，数据集的规模以与计算能力相近的时间尺度指数增长。设想你的实验使用一个按 $m^2$ 增长的算法（$m$ 为数据点数）。比如两年后数据量翻倍，分析所需的运算次数变为四倍；即使你现在用上了快一倍的计算机，分析仍要花两倍的时间。大多数分析需要在给定数据集或模拟它的数据上运行多次，这使问题更加严重。其二，在更深的层面上，数据集越大，统计精度越高：我们将看到，量的统计误差通常按 $m^{-1/2}$ 下降。统计误差降低以后，以前埋在大误差棒下面、从未被考虑的各种问题都必须计入——这就是所谓**系统误差**，它不按 $m^{-1/2}$ 下降。重要的是，这既包括仪器伪迹，也包括理论预言中没有正确建模的物理效应。系统误差高度依赖于具体仪器与技术，本章不深入讨论。

**本章路线。**本章聚焦的分析技术是为应对当前宇宙学数据的复杂性而发展的，但也广泛适用于许多涉及大数据集的研究领域。\secref{14.1} 通过一个简单例子介绍似然、先验与后验的概念，不熟悉这些术语的读者应首先阅读。\secref{14.2} 概述这些概念在宇宙学中最常见的一种应用：通过测得的某种功率谱约束宇宙学参数。本章其余部分充实 \figref{14.1} 所示这一典型例子中的各个步骤：\secref{14.3} 与 \secref{14.4} 讨论怎样构造功率谱的估计量及其似然。忽略其他所有实验问题与系统误差，这在原则上就是由功率谱推断宇宙学参数所需的全部。不过，包括上面提到的数据规模在内的现实问题会带来额外障碍。为此我们介绍两种关键技术：**Fisher 矩阵**（\secref{14.5}）是得到参数预期误差近似估计的捷径；**Markov 链 Monte Carlo**（MCMC）采样（\secref{14.6}）即使对非常复杂的似然也能高效地确定最佳拟合参数与误差棒。这两种技术的适用范围远不止宇宙学或天体物理。`}</Tx>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先在最简单的例子里建立统计语言（14.1），再沿图 14.1 的流水线走一遍：制图（14.3）→ 两点函数及其协方差（14.4）→ Fisher 预测（14.5）→ MCMC 采样（14.6）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>统计语言线：似然 → 后验、估计量、误差、宇宙方差、边缘化</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>分析流水线：数据 → 地图 → 两点函数与协方差 → 似然 → Fisher / MCMC</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec141 />
      <Sec142 />
      <Sec143 />
      <Sec144 />
      <Sec145 />
      <Sec146 />
      <Sec147 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 全书回顾">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="likelihood" /> · <C id="cosmic_variance" /> · <C id="fisher" /> · <C id="mcmc" /> · <C id="marginal" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
