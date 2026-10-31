// 第 I 章补充材料（Cohen-Tannoudji《Quantum Mechanics》卷 I，PDF pp. 57–110）——主文件
// 高层理解层在 _ch01c_overview.jsx；符号词典 _ch01c_notation.jsx；正文 _ch01c_s_*.jsx；习题 _ch01c_ex.jsx；
// 交互图 _ch01c_plots.jsx（数值核心 _ch01c_phys.js）；自绘示意图 _ch01c_figs.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Tx, TxI, Eq, Box, pageUrl, extendInline } from "@kit";
import { NOTATION } from "./_ch01c_notation.jsx";
import { HOOK_TITLE, HOOK, GUIDE, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01c_overview.jsx";
import { SecA, SecB, SecC, SecD } from "./_ch01c_s_abcd.jsx";
import { SecE, SecF } from "./_ch01c_s_ef.jsx";
import { SecG } from "./_ch01c_s_g.jsx";
import { SecH } from "./_ch01c_s_h.jsx";
import { SecJ } from "./_ch01c_s_j.jsx";
import { SecK } from "./_ch01c_ex.jsx";

const R = String.raw;

// 跨页引用第 I 章正文：\mainref{C-7} → 第 I 章 (C-7)；\mainsec{C-2} → 第 I 章 §C-2
extendInline("mainref", (n, k) => <a key={k} className="ref ref-eq" href={pageUrl("ch01", "eq-" + n)} title="跳到第 I 章正文">第 I 章 ({n})</a>);
extendInline("mainsec", (n, k) => <a key={k} className="ref ref-sec" href={pageUrl("ch01", "sec-" + n)} title="跳到第 I 章正文">第 I 章 §{n}</a>);

export const meta = {
  id: "ch01c", no: 0, title_en: "Complements of Chapter I", title_zh: "第 I 章补充材料", pages: "33–86（PDF 57–110）",
  one_liner: R`把第 I 章的波包、不确定关系与方势变成能算出数字的工具：粒子波长、原子大小、波包扩散、反射与隧穿概率、反射延迟。`,
  big_question: R`量子效应在什么尺度上起作用？一个波包怎样随时间运动、变形、撞墙、分裂？方势中的定态如何精确求出，又怎样从中读出反射、隧穿与量子化？`,
  why_it_matters: R`正文给出的是图像与量级；这些补充材料给出可以核对的数字和可以精确求解的模型。其中 $\mathrm{H}_{\rm I}$（方势定态）与 $\mathrm{G}_{\rm I}$（高斯波包）是后面许多章节、补充材料和习题的直接出发点。`,
  overview: R`十个补充材料分四组。**量级组**（$\mathrm{A}_{\rm I}$–$\mathrm{C}_{\rm I}$）：算出典型粒子的 de Broglie 波长，衡量不确定关系在宏观与微观中的分量，并用它估出氢原子的大小与能量。**互补性**（$\mathrm{D}_{\rm I}$）：可动缝板思想实验说明不确定关系如何守住"路径信息与干涉不可兼得"。**波包组**（$\mathrm{E}_{\rm I}$–$\mathrm{G}_{\rm I}$）：二维波包的横向尺寸、三维推广与一维模型的依据、可精确求解的高斯波包与扩散。**方势组**（$\mathrm{H}_{\rm I}$、$\mathrm{J}_{\rm I}$）：定态的拼接法、势阶/势垒/势阱，以及波包在势阶上的反射延迟与透射压缩。最后是习题 $\mathrm{K}_{\rm I}$。`,
  objectives: [
    R`对给定速度、温度、加速电压或束流能量算出粒子的 de Broglie 波长，并判断何时须用相对论`,
    R`用不确定关系估算原子尺度与能量 \eqref{CI-6}–\eqref{CI-7}，并说明经典模型为何失败`,
    R`由稳相法求三维波包的中心与群速度，写出可分离势下的一维约化 \eqref{FI-22}`,
    R`推导高斯波包的演化 \eqref{GI-16a} 与扩散公式 \eqref{GI-20}，并给出经典解读`,
    R`用拼接法求势阶、势垒、势阱的定态，得到 $R$、$T$ \eqref{HI-18}、\eqref{HI-30} 与束缚能级的图解 \eqref{HI-47a}`,
    R`用波包解释全反射延迟 \eqref{JI-10} 与透射系数中的速度比因子 \eqref{JI-26}`,
  ],
  prereq: [
    { ch: "ch01", what: "第 I 章正文：de Broglie 关系、波包与稳相、不确定关系、Schrödinger 方程与方势的定性讨论" },
    { what: R`Fourier 变换与 Gauss 积分（附录 I）；复数与复指数` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Guide() {
  return (
    <Block id="guide" toc="阅读指南" kicker="阅读指南" title="这十个补充材料怎么读"
      lead="原书在补充材料前附有一页阅读指南，这里按本站的讲法重写：每个补充材料是干什么的、需要先读正文哪里、难度如何、建议怎样读。">
      <div className="tb-table-wrap"><table className="tb-table"><thead><tr><th>补充材料</th><th>讲什么</th><th>前置</th><th>难度</th><th>建议</th></tr></thead>
        <tbody>{GUIDE.map(g => <tr key={g.c}>
          <td><a href={"#sec-" + g.c.replace("_", "")}><TxI>{`$\\mathrm{${g.c[0]}}_{\\rm I}$`}</TxI></a><br /><small>{g.title}</small></td>
          <td><TxI>{g.role}</TxI></td><td><TxI>{g.pre}</TxI></td><td>{g.level}</td><td><TxI>{g.advice}</TxI></td></tr>)}</tbody></table></div>
      <Tx>{R`**三条推荐路线。**只想要物理直觉：$\mathrm{A}_{\rm I}\to \mathrm{B}_{\rm I}\to \mathrm{C}_{\rm I}\to \mathrm{E}_{\rm I}$，配合交互图，一两个小时即可。准备往下学第 II、III 章：$\mathrm{F}_{\rm I}$ §1 $\to \mathrm{G}_{\rm I}\to \mathrm{H}_{\rm I}\to \mathrm{J}_{\rm I}$ 是主干，$\mathrm{H}_{\rm I}$ 尤其不可跳过。喜欢思想实验与诠释问题：$\mathrm{D}_{\rm I}$ 与 $\mathrm{J}_{\rm I}$ 的"反射延迟"可以一起读。`}</Tx>
      <Box kind="note" title="从正文带来的工具">
        <Tx>{R`本页反复用到第 I 章正文的几条结果。为方便对照，这里重抄两个最常用的波包公式（编号沿用正文，点链接可跳回正文）。自由粒子的三维波包（正文 \mainref{C-6}）：`}</Tx>
        <Eq n="C-6" say={R`自由粒子的一般状态是平面波 $\mathrm e^{i(\mathbf k\cdot\mathbf r-\omega t)}$ 的叠加，叠加系数 $g(\mathbf k)$ 决定波包的形状与位置。`}>{R`\psi(\mathbf r,t)=\frac1{(2\pi)^{3/2}}\int g(\mathbf k)\,\mathrm e^{i[\mathbf k\cdot\mathbf r-\omega(k)t]}\,\mathrm d^3k`}</Eq>
        <Tx>{R`及其一维版本（正文 \mainref{C-7}）：`}</Tx>
        <Eq n="C-7" say={R`一维波包：只沿 $x$ 传播的平面波以 $g(k)$ 叠加。`}>{R`\psi(x,t)=\frac1{\sqrt{2\pi}}\int_{-\infty}^{+\infty}g(k)\,\mathrm e^{i[kx-\omega(k)t]}\,\mathrm dk`}</Eq>
        <Tx>{R`其余要用到的有：位置–动量不确定关系 \mainref{C-23}、波包中心的稳相条件 \mainref{C-15}–\mainref{C-16}、群速度 \mainref{C-31}–\mainref{C-32}、定态本征方程 \mainref{D-8} 与一般演化式 \mainref{D-14}。`}</Tx>
      </Box>
    </Block>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Guide />
      <Block id="roadmap" toc="路线图" kicker="路线图" title="十个补充材料的路线图" lead="每张卡对应一个补充材料；点击标题跳到该节，点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应两大主题。箭头上写着从上一式到下一式用了什么；悬停可看上下游。">
        <h3>量级与不确定关系（A–F）</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>波包与方势（G–J）</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起全部补充材料：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <SecE />
      <SecF />
      <SecG />
      <SecH />
      <SecJ />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 II 章：量子力学的数学工具">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="zero_point" /> · <C id="spreading" /> · <C id="tunnel" /> · <C id="reflection_delay" /></p>
      </Block>
      <SecK />
    </TextbookPage>);
}
