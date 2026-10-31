// 第 III 章补充材料（上）A_III–H_III（Cohen-Tannoudji《Quantum Mechanics》卷 I，PDF pp. 291–359）——主文件
// 高层理解层在 _ch03c_overview.jsx；符号词典 _ch03c_notation.jsx；正文 _ch03c_sA/B/C/D/E/FG/H.jsx；
// 交互图 _ch03c_plots.jsx（数值核心 _ch03c_phys.js）；自绘示意图 _ch03c_figs.jsx；跨页链接记号与插图外壳 _ch03c_kit.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Tx, TxI } from "@kit";
import "./_ch03c_kit.jsx";
import { NOTATION } from "./_ch03c_notation.jsx";
import { HOOK_TITLE, HOOK, GUIDE, ROADMAP, EQMAP_1, EQMAP_2, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03c_overview.jsx";
import { SecA } from "./_ch03c_sA.jsx";
import { SecB } from "./_ch03c_sB.jsx";
import { SecC } from "./_ch03c_sC.jsx";
import { SecD } from "./_ch03c_sD.jsx";
import { SecE } from "./_ch03c_sE.jsx";
import { SecF, SecG } from "./_ch03c_sFG.jsx";
import { SecH } from "./_ch03c_sH.jsx";

const R = String.raw;

export const meta = {
  id: "ch03c", no: 0, title_en: "Complements of Chapter III (A–H)", title_zh: "第 III 章补充材料（A–H）", pages: "267–334（PDF 291–359）",
  one_liner: R`把第 III 章的假设用到能算到底的问题上（势阱、势阶、不确定关系、复合体系），再打开四扇通往进阶量子力学的门：密度算符、演化算符、两种绘景、规范不变性。`,
  big_question: R`假设在具体体系中给出什么数字？态只部分已知、或者只是大体系的一部分时，怎样描述？时间依赖放在态上还是算符上？电磁势不唯一，物理预言会不会也不唯一？`,
  why_it_matters: R`前四篇是第 III 章最直接的练习，其中 $\mathrm C_{\rm III}$ 给出不确定关系的严格证明。后四篇的工具——密度算符 \eqref{EIII-28}、演化算符 \eqref{FIII-1}、Heisenberg 方程 \eqref{GIII-8}、规范变换 \eqref{HIII-44}——是统计物理、散射、含时微扰论、原子与光相互作用、量子场论的共同语言。`,
  overview: R`八个补充材料分两组。**应用组**（$\mathrm A_{\rm III}$–$\mathrm D_{\rm III}$，难度较低）：无限深阱里的测动量、波包振荡与位置测量的扰动；行波与倏逝波的概率流；只用对易关系证明 $\Delta P\Delta Q\ge\hbar/2$ 并刻画高斯最小波包；只测复合体系一部分时的概率、测后态与关联。**进阶组**（$\mathrm E_{\rm III}$–$\mathrm H_{\rm III}$，除 $\mathrm F_{\rm III}$ 外难度较高）：统计混合与密度算符、部分迹；演化算符的组合律与幺正性；Schrödinger 与 Heisenberg 绘景；经典与量子力学中的规范不变性。`,
  objectives: [
    R`由 Fourier 变换求无限深阱定态的动量分布 \eqref{AIII-6}，解释 $\Delta P_n=n\pi\hbar/a$ 与高能级的两个尖峰`,
    R`写出两能级叠加的演化 \eqref{AIII-18}、\eqref{AIII-23}，并用有限精度的测量后态正确计算 \eqref{AIII-32}`,
    R`用概率流的两条规则读出 $R$、$T$ 与全反射中的流结构 \eqref{BIII-25}–\eqref{BIII-26}`,
    R`证明 $\Delta P\Delta Q\ge\hbar/2$ 与 Robertson 不等式 \eqref{CIII-11}，并推出最小波包必为高斯 \eqref{CIII-22}`,
    R`用延拓的投影算符计算只测子体系的概率与测后态 \eqref{DIII-7}–\eqref{DIII-9}；区分积态与关联态`,
    R`构造密度算符，熟练使用 $\Tr\rho A$、$i\hbar\dot\rho=[H,\rho]$、纯度、布居与相干、热平衡与部分迹`,
    R`由组合律与无穷小算符推出 $U$ 的幺正性；说明含时 $H$ 时为何 $U\ne\mathrm e^{-\frac i\hbar\int H}$`,
    R`在两种绘景间转换并推出 Heisenberg 方程 \eqref{GIII-8}；证明规范变换下预言、密度与流不变`,
  ],
  prereq: [
    { ch: "ch03", what: "第 III 章正文：六条假设、平均值与方均根偏差、概率流、Schrödinger 方程与保守体系、叠加原理" },
    { ch: "ch02", what: "第 II 章：Dirac 记号、投影算符、迹、张量积（§F）、幺正变换（补充材料 $\\mathrm C_{\\rm II}$）、算符函数（$\\mathrm B_{\\rm II}$）" },
    { ch: "ch01c", what: "第 I 章补充材料 $\\mathrm H_{\\rm I}$（方势定态）、$\\mathrm J_{\\rm I}$（势阶上的波包）、$\\mathrm F_{\\rm I}$ §2（可分离势）" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Guide() {
  return (
    <Block id="guide" toc="阅读指南" kicker="阅读指南" title="这八个补充材料怎么读"
      lead="原书在补充材料前附有一份阅读指南，这里按本站的讲法重写：每篇解决什么问题、要先读哪里、难度如何、建议怎样读。">
      <div className="tb-table-wrap"><table className="tb-table"><thead><tr><th>补充材料</th><th>讲什么</th><th>前置</th><th>难度</th><th>建议</th></tr></thead>
        <tbody>{GUIDE.map(g => <tr key={g.c}>
          <td><a href={"#sec-" + g.c}><TxI>{`$\\mathrm{${g.t}}_{\\rm III}$`}</TxI></a><br /><small>{g.title}</small></td>
          <td><TxI>{g.role}</TxI></td><td><TxI>{g.pre}</TxI></td><td>{g.level}</td><td><TxI>{g.advice}</TxI></td></tr>)}</tbody></table></div>
      <Tx>{R`**两组，两种读法。**$\mathrm A$–$\mathrm D$ 是第 III 章的直接应用，计算具体、篇幅短，第一遍学习时就该读（$\mathrm C_{\rm III}$、$\mathrm D_{\rm III}$ 稍形式化，可以先记结论）。$\mathrm E$–$\mathrm H$ 的层次高于本书其余部分，是进阶课程的入门；读过第 III 章就能读懂，但完全可以留到以后。其中 $\mathrm F_{\rm III}$ 最简单，而且是 $\mathrm G_{\rm III}$ 的前提。

**三条推荐路线。**(1) 只想把假设"用熟"：$\mathrm A\to\mathrm B\to\mathrm C$，配合交互图。(2) 准备学统计物理或量子信息：$\mathrm D\to\mathrm E$（重点 §4、§5-b），再看 $\mathrm F$。(3) 准备学原子物理、散射或场论：$\mathrm F\to\mathrm G\to\mathrm H$。`}</Tx>
      <Tx>{R`本页引用第 III 章正文公式时写成 \mainref{D-54} 这样的形式，点击即跳回正文；本页自己的公式带补充材料前缀，如 \eqref{EIII-28}。`}</Tx>
    </Block>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Guide />
      <Block id="roadmap" toc="路线图" kicker="路线图" title="八个补充材料的路线图" lead="每张卡对应一个补充材料；点击标题跳到该节，点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应两组补充材料。箭头上写着从上一式到下一式用了什么；悬停可看上下游。">
        <h3>应用组（A–D）</h3>
        <EqMap edges={EQMAP_1} labels={EQMAP_LABELS} />
        <h3>进阶组（E–H）</h3>
        <EqMap edges={EQMAP_2} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十三张卡串起八个补充材料：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
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
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 III 章补充材料（下）">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="density_op" /> · <C id="partial_trace" /> · <C id="pictures" /> · <C id="gauge" /></p>
      </Block>
    </TextbookPage>);
}
