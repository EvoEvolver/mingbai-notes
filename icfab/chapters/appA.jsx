// 附录 A：常数、材料性质与常用图表（Plummer & Griffin, PDF 588–627）——主文件
// 高层理解层在 _appA_overview.jsx；符号词典 _appA_notation.jsx；A.1 正文 _appA_s1.jsx / _appA_s1b.jsx；
// A.2–A.11 在 _appA_s2.jsx；自绘图 _appA_figs.jsx / _appA_lattice3d.jsx；交互 _appA_plots.jsx / _appA_tools.jsx；数值 _appA_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx } from "@kit";
import { NOTATION } from "./_appA_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_appA_overview.jsx";
import { A1Bonds, A1Doping, A1Bands, A1Stats, A1Carriers } from "./_appA_s1.jsx";
import { A1Temperature, A1Ionization, A1Example, A1Srh } from "./_appA_s1b.jsx";
import { SecA2, SecA3, SecA4, SecA5, SecA6, SecA7, SecA8, SecA9, SecA10, SecA11 } from "./_appA_s2.jsx";

const R = String.raw;

export const meta = {
  id: "appA", no: "A", title_en: "Appendices", title_zh: "附录：常数、材料性质与常用图表", pages: "588–627",
  one_liner: R`全书的工具箱：用最少的物理讲清平衡态半导体中的 $n$、$p$、$E_F$、$n_i(T)$、电离与复合，再把常数、材料性质、氧化层色卡、Irvin 曲线和误差函数做成能在浏览器里算的工具。`,
  big_question: R`掺杂原子怎样决定载流子浓度与费米能级？为什么同一块硅在器件温度下是"非本征"的，在工艺温度下却常常是"本征"的？`,
  why_it_matters: R`后面各章不断用到这里的结果：扩散系数依赖 $n/n_i$（第 7 章），金属污染通过 $\tau_R=1/\sigma v_{th}N_t$ 缩短寿命（第 4 章），恒定表面源扩散的解是 erfc，扩散层用 Irvin 曲线表征，氧化层用颜色快速估厚度（第 6 章）。`,
  overview: R`A.1 是一段完整的"平衡态半导体物理速成"：键模型 → 掺杂与电阻率 → 能带模型 → 态密度与费米–狄拉克统计 → 载流子浓度与质量作用定律 → 温度效应 → 不完全电离 → 补偿例题 → SRH 复合。A.2–A.11 是数据与图表：词头、换算、常数、硅和介质的性质、热氧化 $\mathrm{SiO_2}$ 颜色–厚度表、Irvin 曲线、误差函数表、符号与缩写。本页对原书若干公式与数值错误做了改正（均有勘误框说明）。`,
  objectives: [
    R`由态密度 \eqref{A1.4} 与费米–狄拉克分布 \eqref{A1.6} 推出 $n$、$p$ 的 Boltzmann 表达式与 $N_C$、$N_V$`,
    R`用 $np=n_i^2$ 与 \eqref{A1.12} 计算任意温度下的本征浓度与少子浓度，判断材料处在冻析、非本征还是本征区`,
    R`用 \eqref{A1.15}–\eqref{A1.18} 与完整的电中性方程处理不完全电离和补偿掺杂`,
    R`理解 SRH 复合：寿命 \eqref{A1.23}、复合率 \eqref{A1.24} 与表面复合速度 \eqref{A1.25}`,
    R`会用氧化层色卡估厚度、用 Irvin 曲线由 $\rho_Sx_j$ 求表面浓度、用 erf/erfc 表与近似式`,
  ],
  prereq: [
    { ch: "ch01", what: "第 1 章：扩散与掺杂的历史背景（图 1.5–1.7）" },
    { what: "大学物理中的量子力学与统计力学初步（能级、玻尔兹曼因子）" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function SecA1({ children }) {
  return <Sec n="A.1" title="Basics of Semiconductor Materials in Equilibrium" zh="平衡态半导体材料基础"
    gist={R`从共价键和能带出发，算出平衡时的载流子浓度 $n$、$p$、费米能级 $E_F$ 与本征浓度 $n_i(T)$，并处理不完全电离、补偿与 SRH 复合。`}
    why={R`全书的工艺模型（扩散、氧化、注入激活、吸杂）都以这些量为输入；而工艺温度下它们的取值与器件物理里熟悉的室温值差别极大。`}
    gives={["A1.1", "A1.6", "A1.8", "A1.11", "A1.12", "A1.13", "A1.15", "A1.17", "A1.23", "A1.24"]}>
    <Tx>{R`熟悉半导体器件物理的读者可以略读本节，把它当作查阅用的参考；但请至少留意两件事：**温度**（工艺温度下的 $n_i$、$E_G$、$E_F$）与**本页改正的几处原书错误**。`}</Tx>
    {children}
  </Sec>;
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="附录路线图" lead="A.1 九步走完平衡态半导体物理；A.2–A.11 是可查可算的数据工具。点击标题跳到该节。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="从态密度和费米–狄拉克分布出发，一路推到 n_i(T)、电离杂质与 SRH 复合率。点击节点放大公式。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡：九张讲平衡态半导体物理，三张讲工艺中常用的数据工具。">
        <ConceptGrid />
      </Block>
      <SecA1>
        <A1Bonds />
        <A1Doping />
        <A1Bands />
        <A1Stats />
        <A1Carriers />
        <A1Temperature />
        <A1Ionization />
        <A1Example />
        <A1Srh />
      </SecA1>
      <SecA2 />
      <SecA3 />
      <SecA4 />
      <SecA5 />
      <SecA6 />
      <SecA7 />
      <SecA8 />
      <SecA9 />
      <SecA10 />
      <SecA11 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 回到正文各章">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fermi" /> · <C id="mass_action" /> · <C id="ni_T" /> · <C id="ionization" /> · <C id="srh" /> · <C id="irvin" /></p>
      </Block>
    </TextbookPage>);
}
