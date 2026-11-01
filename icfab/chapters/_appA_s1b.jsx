// A.1 平衡态半导体材料基础（下）：温度效应、不完全电离、补偿例题、SRH 复合。
import { useMemo } from "react";
import { Sub, Tx, Eq, Box, Figure, Derivation, Table } from "@kit";
import { FigA1_15, FigA1_16, FigA1_17 } from "./_appA_figs.jsx";
import { FreezeoutPlot, FermiTPlot, FermiCalc, IonizationPlot, SrhPlot } from "./_appA_plots.jsx";
import { solveNeutral } from "./_appA_phys.jsx";

const R = String.raw;

export function A1Temperature() {
  return <Sub n="A.1.6" zh="温度：冻析区、非本征区与本征区" title="Temperature dependence">
    <Tx>{R`以 $N_D=10^{15}\,\mathrm{cm^{-3}}$ 的浅施主硅为例，电子浓度随温度分成三段（图 A1.13）：

◆ **冻析区**（freezeout，约 100 K 以下）：热能不足以把每个施主的第 5 个电子（需要 $E_C-E_D$）都送进导带，$n<N_D$；

◆ **非本征区**（extrinsic）：施主全部电离，$n\approx N_D$，与温度几乎无关——**器件就工作在这里**，由掺杂说了算；

◆ **本征区**（intrinsic，约 600 K 以上）：$n_i$ 超过 $N_D$，$n\approx n_i$，掺杂失去控制力——**工艺温度常常落在这里**。

这个对比贯穿全书：器件物理里 $n_i$ 取室温值 $1.45\times10^{10}\,\mathrm{cm^{-3}}$；而在 $900$–$1100^\circ$C 的扩散、氧化、退火中，$n_i$ 高达 $10^{16}$–$10^{18}\,\mathrm{cm^{-3}}$ 以上，许多原本"重掺杂"的区域在工艺温度下其实是本征的。第 7 章的扩散系数依赖 $n/n_i$，根源就在这里。`}</Tx>
    <Figure n="A1.13" caption={R`自由电子浓度随温度的变化（以 As 掺杂硅、$N_D=10^{15}\,\mathrm{cm^{-3}}$ 为例）：冻析区、非本征区（器件工作）与本征区（工艺温度）。交互重绘，由 (A1.15) 与电中性实时求解。`} illustration={<FreezeoutPlot />} />
    <Box kind="warning" title={R`勘误：图号重复`}>{R`原书正文称此图为"Figure A1.13"，但图注印成了"Figure A1.14"，与下一幅（费米能级随温度）的图号重复。本页按正文与顺序编为图 A1.13。`}</Box>
    <Tx>{R`同样的事情也可以从费米能级的角度看（图 A1.14）。上下两条粗线是随温度收缩的带边（Table A1.1 的 $E_G(T)$），每条曲线是某个固定掺杂下 $E_F$ 随温度的轨迹：低温时 N 型的 $E_F$ 紧贴导带、P 型紧贴价带；温度升高，所有曲线都向中央（$E_i$）收拢——材料越来越本征。掺杂越重，收拢得越晚。

所以在**工艺建模**中，我们要用大得多的 $n_i$、明显更小的 $E_G$，并且面对的材料更常是本征的。`}</Tx>
    <Figure n="A1.14" caption={R`硅中给定掺杂下费米能级（相对禁带中心）随温度的变化。交互版由电中性方程逐点求解；"原书图"为原图。`} interactive={<FermiTPlot />} />
  </Sub>;
}

export function A1Ionization() {
  return <Sub n="A.1.7" zh="不完全电离：回到完整的费米–狄拉克统计" title="Incomplete ionization">
    <Tx>{R`前面一直默认"杂质全电离"并用 Boltzmann 近似。有三类情况必须放弃这两个假设：(1) 杂质能级**不浅**——宽禁带材料 SiC、GaN 中所有实用的 P 型杂质都是深能级，室温下也只部分电离；(2) 掺杂很重，$E_F$ 逼近带边，即使是浅能级也会离 $E_F$ 很近；(3) 温度很低，浅杂质也会冻析。这时杂质能级本身的占据要用费米–狄拉克统计来算：`}</Tx>
    <Eq n="A1.15" keyEq title="电离杂质浓度" say="施主能级空着（已电离）的比例由 E_F 相对 E_D 的位置决定；E_F 比 E_D 低好几个 kT 时施主几乎全电离。受主对称。">{R`N_D^+=\frac{N_D}{1+g_De^{(E_F-E_D)/kT}}\qquad N_A^-=\frac{N_A}{1+g_Ae^{(E_A-E_F)/kT}}`}</Eq>
    <Tx>{R`$g_D$、$g_A$ 是**简并因子**（degeneracy factor）：施主能级可以被自旋向上或向下的电子占据（但不能同时两个），所以 $g_D=2$；受主还要计入价带顶的简并，一般取 $g_A=4$。

只有施主时，电中性给出 $n=N_D^+$。把 $E_F$ 用 $n$ 表示，就得到一个只含 $n$ 的方程：`}</Tx>
    <Eq n="A1.16" say="只有施主时，电子浓度等于电离施主浓度；把 E_F 换成 n 后，n 出现在等式两边，构成关于 n 的二次方程。">{R`n=N_D^+=\frac{N_D}{1+g_De^{(E_F-E_D)/kT}}=\frac{N_D}{1+g_De^{(E_F-E_D+E_C-E_C)/kT}}=\frac{N_D}{1+g_D\left(\frac{n}{N_C}\right)e^{(E_C-E_D)/kT}}`}</Eq>
    <Tx>{R`最后一步用了 \eqref{A1.8}：$e^{(E_F-E_C)/kT}=n/N_C$。记 $\gamma_n=\dfrac{N_C}{g_D}e^{-(E_C-E_D)/kT}$，上式化为 $n^2+\gamma_nn-\gamma_nN_D=0$，取正根：`}</Tx>
    <Eq n="A1.17" keyEq title="施主部分电离的解" say="电离施主浓度只由 $N_D$ 与参数 $\gamma_n$ 决定：$N_D\ll\gamma_n$ 时几乎全电离，$N_D\gg\gamma_n$ 时只电离约 $\sqrt{\gamma_nN_D}$。">{R`n=N_D^+=\frac{\gamma_n}{2}\left(\sqrt{1+\frac{4N_D}{\gamma_n}}-1\right)`}</Eq>
    <Tx>{R`受主完全对称：`}</Tx>
    <Eq n="A1.18" say="受主的部分电离公式与施主完全对称，只是换成价带有效态密度、受主能级深度和 g_A。">{R`p=N_A^-=\frac{\gamma_p}{2}\left(\sqrt{1+\frac{4N_A}{\gamma_p}}-1\right)\quad\text{where}\quad\gamma_p=\frac{N_V}{g_A}e^{-(E_A-E_V)/kT}`}</Eq>
    <Box kind="physics" title="两个极限看懂 (A1.17)">{R`**$N_D\ll\gamma_n$**：$\sqrt{1+x}\approx1+x/2$，得 $n\approx N_D$——全电离。硅中 As（49 meV）在 300 K：$\gamma_n=(3.2\times10^{19}/2)e^{-1.9}\approx2.4\times10^{18}$，所以 $10^{17}$ 以下基本全电离。

**$N_D\gg\gamma_n$**：$n\approx\sqrt{\gamma_nN_D}$——只电离一小部分，且按 $e^{-(E_C-E_D)/2kT}$ 随温度激活。这正是 SiC、GaN 中 P 型掺杂"放进去很多、导电很少"的原因。

注意：(A1.17)(A1.18) 假设材料里**只有一种**杂质。两种都有时要回到完整的电中性方程，见下面例题的 (c) 部分。`}</Box>
    <IonizationPlot />
    <Tx>{R`给定杂质能级与温度，就能算出电离比例，进而得到 $n$ 与 $p$。Table A1.2 列出了常用半导体中典型杂质的能级。`}</Tx>
    <Table head={["半导体", "施主", "$E_C-E_D$", "受主", "$E_A-E_V$"]} rows={[
      ["Si", "P, As, Sb", "44–49 meV", "B, Al, Ga / In", "45–65 meV / 160 meV"],
      ["Ge", "P, As, Sb", "10–12 meV", "B, Al, Ga", "10 meV"],
      ["GaAs", "Si, Ge, S, Sn", "6 meV", "Mg, Si, Be, C", "25–35 meV"],
      ["4H SiC", "N（C 位）/ P（Si 位）", "60–140 meV / 60–130 meV", "Al（Si 位）/ B（Si 位）", "200–240 meV / 280–350 meV"],
      ["GaN", "Si（Ga 位）", "15 meV", "Mg（Ga 位）/ Zn", "160 meV / 340 meV"],
    ]} caption="Table A1.2　几种半导体中典型施主与受主的能级。" />
  </Sub>;
}

export function A1Example() {
  const s298 = useMemo(() => solveNeutral({ T: 298, ND: 1e16, NA: 3e16, dED: 0.049, dEA: 0.045, full: false }), []);
  const s1273 = useMemo(() => solveNeutral({ T: 1273, ND: 1e16, NA: 3e16, dED: 0.049, dEA: 0.045 }), []);
  const s50 = useMemo(() => solveNeutral({ T: 50, ND: 1e16, NA: 3e16, dED: 0.049, dEA: 0.045 }), []);
  // 室温按原书取 n_i = 1.45e10 计算少子
  const s298b = { ...s298, p: 2e16, n: (1.45e10) ** 2 / 2e16 };
  return <Sub n="A.1.8" zh="例题：补偿掺杂的硅在三个温度下" title="Worked example">
    <Box kind="example" title={R`补偿硅中的 $n$、$p$ 与 $E_F$`}>{R`一块硅同时掺有 $[\mathrm{As}]=1\times10^{16}\,\mathrm{cm^{-3}}$（$E_C-E_D=0.049$ eV）和 $[\mathrm{B}]=3\times10^{16}\,\mathrm{cm^{-3}}$（$E_A-E_V=0.045$ eV），见图 A1.15。求 (a) 室温（器件工作）、(b) $1000^\circ$C（典型工艺温度）、(c) 50 K（即使是浅杂质也可能不完全电离）下的 $n$、$p$ 和 $E_F$。`}</Box>
    <Figure n="A1.15" caption="同时含 N 型与 P 型杂质的硅样品及其杂质能级。自绘。" illustration={<FigA1_15 />} />
    <Tx>{R`**思路**。若杂质全电离（$N_D^+=N_D$、$N_A^-=N_A$），未知量是 $n$、$p$、$E_F$ 三个（$n_i$ 由温度直接从 \eqref{A1.12} 算出）。三个独立方程是：电中性 $p+N_D^+=n+N_A^-$ 与质量作用定律联立解出的 $n$（或 $p$），费米能级关系，以及 $np=n_i^2$：`}</Tx>
    <Eq n="A1.19" say="电中性加质量作用定律解出的电子浓度：净施主为正且远大于 n_i 时 n 约等于净掺杂，净掺杂远小于 n_i 时 n 约等于 n_i。">{R`n=\frac12\left[(N_D^+-N_A^-)+\sqrt{(N_D^+-N_A^-)^2+4n_i^2}\right]`}</Eq>
    <Eq n="A1.20" say="同理解出的空穴浓度：P 型净掺杂远大于 n_i 时 $p\approx N_A^--N_D^+$。">{R`p=\frac12\left[(N_A^--N_D^+)+\sqrt{(N_A^--N_D^+)^2+4n_i^2}\right]`}</Eq>
    <Eq n="A1.21" say="与 (A1.13) 相同：由 n 求费米能级。">{R`n=n_i\exp\left(\frac{E_F-E_i}{kT}\right)`}</Eq>
    <Eq n="A1.22" say="与 (A1.14) 相同：由 p 求费米能级。">{R`p=n_i\exp\left(\frac{E_i-E_F}{kT}\right)`}</Eq>
    <Eq say="第三个关系仍是质量作用定律 (A1.11)。">{R`np=n_i^2\qquad\text{(A1.11)}`}</Eq>
    <Derivation collapsed title="补全：(A1.19)(A1.20) 怎么来" steps={[
      { tex: R`n+N_A^-=p+N_D^+`, why: "电中性：负电荷（电子、电离受主）与正电荷（空穴、电离施主）相等" },
      { tex: R`n-\frac{n_i^2}{n}=N_D^+-N_A^-\ \Rightarrow\ n^2-(N_D^+-N_A^-)n-n_i^2=0`, why: R`用 $p=n_i^2/n$ 消去 $p$` },
      { tex: R`n=\frac12\left[(N_D^+-N_A^-)+\sqrt{(N_D^+-N_A^-)^2+4n_i^2}\right]`, why: "取正根即 (A1.19)；对 p 做同样的事得 (A1.20)。两式通过 (A1.11) 相互关联，并不独立" },
    ]} />
    <Tx>{R`式中只出现**差** $N_D^+-N_A^-$，这就是**补偿**（compensation）：施主放出的电子会"掉"进更低的受主能级 $E_A$，一个施主和一个受主相互抵消，起作用的只是净掺杂。实际中通常靠物理判断就能把联立方程化简到不必硬解；化简不了时交给程序（下面的计算器就是这样一个程序）。

**(a) 室温。** As、B 都是浅杂质，假定全电离。净掺杂是 P 型，$N_A-N_D=2\times10^{16}\gg n_i$，由 (A1.20) 与 (A1.11)：
$$p=N_A-N_D=2\times10^{16}\,\mathrm{cm^{-3}},\qquad n=\frac{n_i^2}{p}=\frac{2.1\times10^{20}}{2\times10^{16}}=1.05\times10^{4}\,\mathrm{cm^{-3}}$$
再由 (A1.22)：
$$E_i-E_F=kT\ln\frac{p}{n_i}=(8.62\times10^{-5}\,\mathrm{eV/K})(298\,\mathrm{K})\ln\frac{2\times10^{16}}{1.45\times10^{10}}=0.36\,\mathrm{eV}$$
检查自洽：粗略地说，$E_F$ 以上的能级是空的、以下是满的。$E_F$ 远在 $E_D$ 之下——施主能级空着，确实已电离；$E_F$ 又远在 $E_A$ 之上——受主能级被电子填上，也已电离。假设成立。（若用 (A1.15) 严格算，受主约有 2–3% 尚未电离，$p$ 约为 $1.93\times10^{16}$，对结论无影响。）

**(b) $1000^\circ$C。** 由 (A1.12)，$n_i=7.14\times10^{18}\,\mathrm{cm^{-3}}$，远大于两种杂质浓度，材料是本征的：$n=p\approx n_i$，$E_F$ 基本在禁带中央。这时 $E_G$ 也明显变小（由 Table A1.1 约 0.77 eV）。$E_F$ 远低于 $E_D$、远高于 $E_A$，杂质全电离同样自洽。

**(c) 50 K。** 这时受主可能电离不全；但材料仍是净 P 型，$E_F$ 在禁带下半部、远低于 $E_D$，所以施主全电离。由 Table A1.1，$N_V=3.5\times10^{15}T^{1.5}=1.23\times10^{18}\,\mathrm{cm^{-3}}$，
$$\gamma_p=\frac{N_V}{g_A}e^{-(E_A-E_V)/kT}=\frac{1.23\times10^{18}}{4}\exp\left(-\frac{0.045}{(8.62\times10^{-5})(50)}\right)=8.98\times10^{12}\,\mathrm{cm^{-3}}$$
$$n_i^2=N_CN_V\exp\left(-\frac{E_G}{kT}\right)=(2.19\times10^{18})(1.23\times10^{18})\exp\left(-\frac{1.17}{(8.62\times10^{-5})(50)}\right)\approx0\ \Rightarrow\ n\approx0$$
接下来要算有多少受主电离。**关键在于补偿**：全部 $10^{16}$ 个施主电子都已落进受主能级，所以电中性是 $p+N_D=N_A^-$，而不是"把净受主 $2\times10^{16}$ 代入单杂质公式 (A1.18)"。用 $N_A^-=N_A/(1+p/\gamma_p)$（由 (A1.15) 与 (A1.9) 得到）代入，得到关于 $p$ 的二次方程：
$$p^2+(\gamma_p+N_D)\,p-\gamma_p(N_A-N_D)=0\ \Rightarrow\ p\approx\frac{\gamma_p(N_A-N_D)}{N_D}=\frac{(8.98\times10^{12})(2\times10^{16})}{10^{16}}\approx1.8\times10^{13}\,\mathrm{cm^{-3}}$$
费米能级由 (A1.9)：
$$E_F-E_V=kT\ln\frac{N_V}{p}=(8.62\times10^{-5})(50)\ln\frac{1.23\times10^{18}}{1.8\times10^{13}}\approx0.048\,\mathrm{eV}$$
即 $E_F$ 被"钉"在受主能级附近（$0.045$ eV）略上方：电离受主数 $N_A^-=N_D+p\approx N_D$，只占受主总数的约 1/3，也就是 $1+g_Ae^{(E_A-E_F)/kT}\approx3$，$E_F\approx E_A+kT\ln2$。大部分受主仍未电离。`}</Tx>
    <Box kind="warning" title={R`勘误：(c) 部分的处理与一个笔误`}>{R`**处理**：原书在 (c) 中把"净受主 $N_A=2\times10^{16}$"直接代入**单一杂质**公式 (A1.18)，得到 $p=4.19\times10^{14}\,\mathrm{cm^{-3}}$、$E_F-E_V=0.0344$ eV（低于 $E_A$）。但 (A1.18) 来自 $p=N_A^-$，只在没有施主时成立；有补偿时电中性是 $p+N_D^+=N_A^-$，那 $10^{16}$ 个被施主电子填上的受主能级不能再"放出"空穴。按完整的电中性方程（本页正文与下方计算器，二者一致）得 $p\approx1.8\times10^{13}\,\mathrm{cm^{-3}}$、$E_F-E_V\approx0.048$ eV，比原书小 20 多倍。（只有在 $N_D\ll p$ 的弱补偿情形，原书的做法才是好近似。）

**笔误**：原书最后一步写成 "$E_F-E_i=kT\ln(N_V/p)$"，由 (A1.9) 应为 $E_F-E_V$。`}</Box>
    <Figure n="A1.16" caption={R`例题在室温、$1000^\circ$C 与 50 K 下的解（能带图中标出 $E_D$、$E_A$、$E_F$；50 K 采用自洽的补偿解，见勘误框）。自绘，数值由本页电中性求解器给出（室温少子按原书取 $n_i=1.45\times10^{10}$）。`} illustration={<FigA1_16 s298={s298b} s1273={s1273} s50={s50} />} />
    <Tx>{R`**费米能级 / 电中性计算器**。下面的工具对任意材料、温度、掺杂与杂质能级求解完整的电中性方程（杂质按 (A1.15) 不完全电离，载流子用 Boltzmann 式）。点"原书例题"三个按钮可以复现 (a)(b)(c)，也可以试试：把 $N_D$ 降到 $10^{12}$（弱补偿），50 K 的 $p$ 会回到原书的 $4\times10^{14}$ 附近；把材料换成 4H-SiC、受主能级拉到 0.2 eV，看看室温下还有多少受主电离。`}</Tx>
    <FermiCalc />
  </Sub>;
}

export function A1Srh() {
  return <Sub n="A.1.9" zh="直接与间接带隙、SRH 复合与少子寿命" title="Recombination">
    <Tx>{R`一维能带图省掉了一个维度。完整的能带图横轴是**晶体动量** $k$，纵轴是能量；一般来说导带最低点与价带最高点并不在同一个 $k$ 上。电子在两带之间跃迁时，**能量和动量都必须守恒**。

两带极值在同一 $k$ 的材料叫**直接带隙**（direct bandgap）半导体：电子落回价带与空穴复合时，能量可以全部交给一个光子（光子几乎不带动量）——所以发光二极管（LED）基本只能用直接带隙材料，如 GaAs，以及今天照明 LED 的主角 GaN。Si、Ge、SiC 是**间接带隙**（indirect bandgap）：直接复合需要同时处理一大份动量，概率很低。于是复合主要借道禁带中的一个**中间能级**（如金原子）：它先俘获一个载流子、再俘获另一个，多余的动量交给晶格振动（声子）。这种既守能量又守动量的过程以三位提出者命名为 **Shockley–Read–Hall（SRH）复合**。

理解 SRH 对工艺至关重要：Au、Cu、Fe 等重金属，以及空位、自间隙原子等晶格缺陷（第 3 章），都在硅的禁带中引入这类深能级，充当复合的"催化剂"——**陷阱**（traps）。`}</Tx>
    <Figure n="A1.17" caption={R`SRH 复合：陷阱能级 $E_T$ 先后分别俘获电子和空穴完成复合。N 型材料中箭头粗细表示多子（电子）很容易被俘获、少子（空穴）很难被俘获。自绘。`} illustration={<FigA1_17 />} />
    <Tx>{R`以 N 型材料为例。电子极多，陷阱遇到电子的机会远大于遇到空穴，所以陷阱的常态是"已经抓住一个电子、在等一个空穴路过"。**少子的俘获是整个复合过程的瓶颈**，因此我们常说"少子寿命"，把它当作复合所需的时间。能带图给出同样的结论：N 型中 $E_F$ 在禁带上半部、高于 $E_T$，而 $E_F$ 以下的能级几乎总被电子占据——陷阱通常是满的，等的是空穴。P 型中则是俘获少子电子成为瓶颈。

一阶近似下，体寿命为`}</Tx>
    <Eq n="A1.23" keyEq title="SRH 复合寿命" say="少子寿命等于'一个少子扫过陷阱的速率'的倒数：陷阱截面、热速度、陷阱密度三者之积越大，少子活得越短。">{R`\tau_R=\frac{1}{\sigma v_{th}N_t}`}</Eq>
    <Tx>{R`$\sigma$ 是陷阱的**俘获截面**（约为原子截面，$10^{-16}\,\mathrm{cm^2}$），$v_{th}$ 是少子热速度（约 $10^7\,\mathrm{cm/s}$），$N_t$ 是陷阱的体密度。量级感：$N_t=10^{12}\,\mathrm{cm^{-3}}$ 时 $\tau_R=1/(10^{-16}\cdot10^7\cdot10^{12})=10^{-3}$ s；污染到 $10^{15}$ 时降到 $1\,\mu$s。第 4 章（§4.2）正是用这个式子估算硅晶体能容忍多少重金属污染。

SRH 复合对依赖少子的器件尤其重要：双极晶体管，以及功率器件中的晶闸管、IGBT（绝缘栅双极晶体管）。

反过来，陷阱也能**产生**载流子：先发射一个电子（或空穴），再发射另一个，周而复始——这在间接带隙材料中往往是主要的产生机制，耗尽区就是典型场合。此时用**产生寿命** $\tau_G$ 刻画。由于"俘获自由载流子"与"从陷阱发射载流子"过程不同，一般 $\tau_G\ne\tau_R$，硅中 $\tau_G$ 通常更长；本书多数场合不加区分。SRH 理论给出净复合（产生）率：`}</Tx>
    <Eq n="A1.24" keyEq title="SRH 净复合率" say="净复合率正比于 $np$ 偏离 $n_i^2$ 的程度：有过剩载流子就净复合，载流子被抽空就净产生；陷阱越靠近禁带中央，分母越小、速率越大。">{R`U=\frac{np-n_i^2}{\tau\left(p+n+2n_i\cosh\left(\frac{E_T-E_i}{kT}\right)\right)}`}</Eq>
    <Tx>{R`三个要点：平衡时 $np=n_i^2$，$U=0$，复合与产生恰好抵消；有过剩载流子时 $np>n_i^2$，$U>0$（净复合）；$np<n_i^2$（如耗尽区）时 $U<0$（净产生）。分母中的 $\cosh$ 在 $E_T=E_i$ 时最小，所以**禁带中央附近的陷阱最有效**。`}</Tx>
    <SrhPlot />
    <Tx>{R`表面上晶格中断（硅器件里通常终止于热氧化的 $\mathrm{SiO_2}$），界面陷阱同样是 SRH 中心。与 (A1.23) 对应的表面量是`}</Tx>
    <Eq n="A1.25" say="表面复合速度等于界面陷阱截面、热速度与界面陷阱面密度之积：界面越'脏'，载流子在表面消失得越快。">{R`s=\sigma_Sv_{th}N_{it}`}</Eq>
    <Tx>{R`$\sigma_S$ 是界面陷阱的俘获截面，$N_{it}$ 是单位面积的界面陷阱数。$s$ 的单位是 cm/s，称**表面复合速度**（surface recombination velocity），它刻画载流子在表面复合的快慢，地位相当于体内的 $1/\tau_R$。表面主导时，净复合（产生）率（单位面积、单位时间）为`}</Tx>
    <Eq n="A1.26" say="表面净复合率与体内公式同形，只是把 $1/\tau$ 换成表面复合速度 s，结果是单位面积的速率。">{R`U=\frac{s(np-n_i^2)}{p+n+2n_i\cosh\left(\frac{E_T-E_i}{kT}\right)}`}</Eq>
    <Box kind="warning" title={R`勘误：$\sigma_S$ 的单位`}>{R`原书写 $\sigma_S$ 的单位为 "$\mathrm{cm^{-2}}$"。俘获截面是面积，单位应为 $\mathrm{cm^2}$；这样 $s=\sigma_Sv_{th}N_{it}$ 的单位才是 $\mathrm{cm^2}\cdot\mathrm{cm/s}\cdot\mathrm{cm^{-2}}=\mathrm{cm/s}$。`}</Box>
    <Tx>{R`$\tau_R\propto1/N_t$ 意味着：在间接带隙材料里，**寿命是一个可以设计的参数**。有时要寿命尽量长，就用吸杂（gettering，第 4 章）把 $N_t$ 压低；有时要一个特定的寿命——例如功率开关器件中寿命决定导通电阻与开关速度之间的折中——就在工艺中有控制地引入陷阱（受控掺金，或用电子辐照等轻微损伤晶格，第 4 章也会讨论）。而在 GaAs 这类直接带隙材料中，载流子无需陷阱即可复合，少子寿命很短（纳秒量级），而且是材料的固有性质，器件和工艺设计者无法调节。

本附录内容的通用参考书是 C. Hu, *Modern Semiconductor Devices for Integrated Circuits*（Pearson, 2010），其他半导体器件教材也都有涉及。`}</Tx>
  </Sub>;
}
