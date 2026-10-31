// 第 III 章补充材料（下）（Cohen-Tannoudji《Quantum Mechanics》卷 I，PDF pp. 359–415）——主文件
// 高层理解层在 _ch03d_overview.jsx；符号词典 _ch03d_notation.jsx；正文 _ch03d_sJ/K/L/M/N/O.jsx；
// 交互图 _ch03d_plots.jsx（数值核心 _ch03d_phys.js）；自绘示意图 _ch03d_figs.jsx；跨页链接记号 _ch03d_kit.jsx。
import "./_ch03d_kit.jsx";
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Tx, TxI, Box } from "@kit";
import { NOTATION } from "./_ch03d_notation.jsx";
import { HOOK_TITLE, HOOK, GUIDE, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03d_overview.jsx";
import { SecJ } from "./_ch03d_sJ.jsx";
import { SecK } from "./_ch03d_sK.jsx";
import { SecL } from "./_ch03d_sL.jsx";
import { SecM } from "./_ch03d_sM.jsx";
import { SecN } from "./_ch03d_sN.jsx";
import { SecO } from "./_ch03d_sO.jsx";

const R = String.raw;

export const meta = {
  id: "ch03d", no: 0, title_en: "Complements of Chapter III (J–O)", title_zh: "第 III 章补充材料（J–O）", pages: "335–391（PDF 359–415）",
  one_liner: R`把演化写成传播子与路径求和，用复能量描述衰变与线宽；再对任意形状的一维势，求出束缚能级、散射的传递矩阵，以及周期结构中的能带。`,
  big_question: R`有限时间之后的波函数能否"一步"写出？不稳定的态怎样放进量子力学？对形状任意的势，哪些结论不依赖于形状——能级为何分立、透射为何左右相同、周期排列为何产生能带？`,
  why_it_matters: R`$\mathrm J_{\rm III}$ 是 Green 函数、微扰论与路径积分的入口；$\mathrm K_{\rm III}$ 给出谱线宽度的物理来源；$\mathrm M_{\rm III}$–$\mathrm O_{\rm III}$ 用同一个"传递矩阵"思想统一处理束缚、散射与周期势，后者是固体能带论最简单的完整模型。中间的 $\mathrm L_{\rm III}$ 习题覆盖了第 III 章的全部假设。`,
  overview: R`六个补充材料分两组。**时间演化**（$\mathrm J_{\rm III}$、$\mathrm K_{\rm III}$）：传播子 $K(2,1)$ 的定义、谱表示、Green 函数方程与 Feynman 的路径求和；不稳定态的指数衰减、寿命、自然宽度与复能量。**习题**（$\mathrm L_{\rm III}$）：十九道覆盖测量、演化、概率流、位力定理与密度算符的题。**再访一维问题**（$\mathrm M_{\rm III}$–$\mathrm O_{\rm III}$）：任意势阱的束缚能级（打靶法、基态高于阱底）；任意势的散射（传递矩阵、$\det M=1$、左右对称的透射、$S$ 矩阵）；$N$ 个相同势垒的周期结构（迭代矩阵、允许带与禁带、Bragg 反射、有限晶体的能级与边缘态）。`,
  objectives: [
    R`从演化算符推出传播子 \eqref{JIII-6} 与它的定态展开 \eqref{JIII-18}，并证明它满足 Green 函数方程 \eqref{JIII-22}`,
    R`解释路径求和 \eqref{JIII-27}–\eqref{JIII-30} 怎样在 $S\gg\hbar$ 时退化为最小作用量原理`,
    R`由恒定衰变率推出指数衰减律，用复能量 \eqref{KIII-10} 唯象地描述寿命，并算出 Lorentz 线宽 $\hbar/\tau$`,
    R`说明任意势阱的束缚能级为何分立（$\tilde B(E)=0$）且高于阱底 \eqref{MIII-17}`,
    R`由"势为实"与"流守恒"导出传递矩阵的结构 \eqref{NIII-18}、\eqref{NIII-21}，以及 $T=1/|F|^2$ 与入射方向无关`,
    R`用迭代矩阵的本征值 \eqref{OIII-20}–\eqref{OIII-30} 区分允许带与禁带，解释 Bragg 反射 \eqref{OIII-34} 与有限晶体的能级 \eqref{OIII-48}`,
  ],
  prereq: [
    { ch: "ch03", what: "第 III 章正文：测量假设、Schrödinger 方程、定态、概率流、能量–时间不确定关系" },
    { ch: "ch03c", what: R`$\mathrm E_{\rm III}$（密度算符）、$\mathrm F_{\rm III}$（演化算符）` },
    { ch: "ch01c", what: R`$\mathrm H_{\rm I}$（方势中的定态）、$\mathrm J_{\rm I}$（势阶上的波包）、$\mathrm G_{\rm I}$（高斯波包）` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Guide() {
  return (
    <Block id="guide" toc="阅读指南" kicker="阅读指南" title="这六个补充材料怎么读"
      lead="下表是本站为这一页写的导读：每个补充材料讲什么、需要先读哪里、难度如何、建议怎样读。">
      <div className="tb-table-wrap"><table className="tb-table"><thead><tr><th>补充材料</th><th>讲什么</th><th>前置</th><th>难度</th><th>建议</th></tr></thead>
        <tbody>{GUIDE.map(g => <tr key={g.c}>
          <td><a href={"#sec-" + g.c}><TxI>{`$\\mathrm{${g.c[0]}}_{\\rm III}$`}</TxI></a><br /><small>{g.title}</small></td>
          <td><TxI>{g.role}</TxI></td><td><TxI>{g.pre}</TxI></td><td>{g.level}</td><td><TxI>{g.advice}</TxI></td></tr>)}</tbody></table></div>
      <Tx>{R`**三条路线。**(1) 想尽快看到物理：$\mathrm K_{\rm III}\to\mathrm M_{\rm III}\to\mathrm N_{\rm III}$ §1–2 $\to\mathrm O_{\rm III}$ §1–2，配合交互图，两三个小时可以把"能级、透射、能带"串起来。(2) 准备学后面的微扰论与散射理论：$\mathrm J_{\rm III}$ §2 与 $\mathrm N_{\rm III}$ 的 $S$ 矩阵是重点。(3) 检验自己是否掌握了第 III 章：直接做 $\mathrm L_{\rm III}$，建议至少做 3、4、10、12、14、16。

**这几个补充材料之间的线索。**$\mathrm M_{\rm III}$、$\mathrm N_{\rm III}$、$\mathrm O_{\rm III}$ 是一个整体（原书在它们之前单独插了一页"再访一维问题"的说明，本站把它并入 $\mathrm M_{\rm III}$ 的开头）：都在势为零的区域写出指数解，用"左边的系数"表出"右边的系数"，再让边界条件或周期性决定物理。$\mathrm J_{\rm III}$ 与 $\mathrm K_{\rm III}$ 则从时间的角度补充正文：前者把演化写成积分形式，后者处理正文没有涵盖的"会衰变的态"。`}</Tx>
      <Box kind="note" title="编号与链接约定">{R`本页公式编号沿用原书并加补充材料前缀：$\mathrm M_{\rm III}$ 的式 (8) 记作 \eqref{MIII-8}。引用第 III 章正文写作 \mainref{D-54} 这样的链接；引用其他补充材料（如 \IIIc{FIII}、\Ic{HI}）也直接链到相应页面。`}</Box>
    </Block>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Guide />
      <Block id="roadmap" toc="路线图" kicker="路线图" title="六个补充材料的路线图" lead="每张卡对应一个补充材料；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应两大主题。箭头上写着从上一式到下一式用了什么。">
        <h3>时间演化：传播子与衰变（J–K）</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>一维问题：束缚、散射与能带（M–O）</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十三张卡串起全部补充材料：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <SecJ />
      <SecK />
      <SecL />
      <SecM />
      <SecN />
      <SecO />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 IV 章：自旋 1/2 与二能级系统">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="propagator" /> · <C id="natural_width" /> · <C id="transfer_matrix" /> · <C id="bands" /></p>
      </Block>
    </TextbookPage>);
}
