// 第 1 章符号词典。sym 只写符号本身；「基底+下标」先精确匹配，否则回退到只有基底的通用条目。
// 注意：原书把缩放因子与玻尔兹曼常数都写作 k；本页把缩放因子改记为 κ，以免混淆。
const R = String.raw;

export const NOTATION = [
  // ---------- 常数与热电压 ----------
  { sym: R`k`, name: "玻尔兹曼常数", en: "Boltzmann constant", def: R`$k=1.381\times10^{-23}\,\mathrm{J/K}=8.617\times10^{-5}\,\mathrm{eV/K}$。原书在图 1.16 中也用 $k$ 表示缩放因子，本页改记为 $\kappa$`, unit: R`$\mathrm{J/K}$`, eq: "1.1" },
  { sym: R`T`, name: "绝对温度", en: "temperature", def: R`室温取 $T=300\,\mathrm K$，此时 $kT/q=25.9\,\mathrm{mV}$`, unit: R`$\mathrm K$`, eq: "1.1" },
  { sym: R`q`, name: "元电荷", en: "elementary charge", def: R`$q=1.602\times10^{-19}\,\mathrm C$；$kT/q$ 是热电压`, unit: R`$\mathrm C$`, eq: "1.1" },
  { sym: R`\phi_t`, name: "热电压", en: "thermal voltage", def: R`$\phi_t\equiv kT/q$，室温约 $25.9\,\mathrm{mV}$；亚阈区电流每变化 $e$ 倍，栅压至少要变 $\phi_t$`, unit: R`$\mathrm V$`, eq: "1.1" },
  { sym: R`n`, name: "亚阈理想因子", en: "subthreshold ideality factor", def: R`$n\ge1$：栅压中真正用来压低源—沟道势垒的比例的倒数。双极晶体管 $n=1$；MOSFET 因栅通过栅介质间接控制势垒而 $n>1$`, unit: "无量纲", eq: "1.1" },
  { sym: R`S`, name: "亚阈摆幅", en: "subthreshold swing (inverse slope)", def: R`$S=n(kT/q)\ln10$，使亚阈电流改变 10 倍所需的栅压；室温下限约 $60\,\mathrm{mV/dec}$`, unit: R`$\mathrm{mV/decade}$`, eq: "1.1" },

  { sym: R`\Phi_{\rm B}`, name: "源—沟道势垒高度", en: "source–channel barrier", def: R`N$^+$ 源区电子进入沟道必须越过的势垒（以电压计）；栅压把它压低，能越过的电子数 $\propto e^{-q\Phi_{\rm B}/kT}$（热发射）`, unit: R`$\mathrm V$`, eq: "1.1" },
  { sym: R`C_{\rm dep}`, name: "耗尽层电容", en: "depletion capacitance", def: R`单位面积耗尽层电容 $\varepsilon_{\rm s}/W_{\rm dep}$；与 $C_{\rm ox}$ 组成分压器，$n=1+C_{\rm dep}/C_{\rm ox}$`, unit: R`$\mathrm{F/cm^2}$`, eq: "1.1" },
  { sym: R`f_{\max}`, name: "最高工作频率", def: R`约为门延迟的倒数，$f_{\max}\propto1/\tau$`, unit: R`$\mathrm{Hz}$` },

  // ---------- 电压、电流 ----------
  { sym: R`V`, name: "电压（通用）", en: "voltage", def: R`缩放分析中的工作电压；平均电场 $\mathcal E=V/L$`, unit: R`$\mathrm V$`, eq: "1.S3" },
  { sym: R`V_{\rm G}`, name: "栅压", en: "gate voltage", def: R`加在栅极上的电压（相对源/衬底）`, unit: R`$\mathrm V$` },
  { sym: R`V_{\rm GS}`, name: "栅源电压", en: "gate-to-source voltage", def: R`栅相对源的电压，是控制 MOSFET 开关的输入量`, unit: R`$\mathrm V$`, eq: "1.S9" },
  { sym: R`V_{\rm D}`, name: "漏压", en: "drain voltage", def: R`加在漏极上的电压`, unit: R`$\mathrm V$` },
  { sym: R`V_{\rm TH}`, name: "阈值电压", en: "threshold voltage", def: R`晶体管"开启"的栅压：源—沟道势垒被压到约为零、表面开始强反型；图 1.18 中约 $0.45\,\mathrm V$`, unit: R`$\mathrm V$`, eq: "1.S9" },
  { sym: R`V_{\rm DD}`, name: "电源电压", en: "supply voltage", def: R`CMOS 电路的电源电压，也就是逻辑"1"的电平与栅压摆幅上限；表 1.1 中由 1.5–1.8 V（2000）降到 0.5–0.7 V（2018 预测）`, unit: R`$\mathrm V$`, eq: "1.S11" },
  { sym: R`V_{\rm FB}`, name: "平带电压", en: "flat-band voltage", def: R`使半导体表面能带平直（既不积累也不耗尽）的栅压；N$^+$ 多晶硅栅、无界面电荷时 $V_{\rm FB}\approx-(0.56\,\mathrm V+\phi_{\rm F})$`, unit: R`$\mathrm V$` },
  { sym: R`I`, name: "电流（通用）", en: "current", def: R`缩放分析中晶体管的导通电流`, unit: R`$\mathrm A$`, eq: "1.S6" },
  { sym: R`I_{\rm DS}`, name: "漏源电流", en: "drain-to-source current", def: R`从漏流向源的沟道电流，即开关电流`, unit: R`$\mathrm A$`, eq: "1.S6" },
  { sym: R`I_0`, name: "阈值处的电流", def: R`亚阈指数律 \eqref{1.S9} 在 $V_{\rm GS}=V_{\rm TH}$ 处的电流（图 1.18 中约 $10^{-4}\,\mathrm A$）`, unit: R`$\mathrm A$`, eq: "1.S9" },
  { sym: R`I_{\rm ON}`, name: "开态电流", en: "on-current", def: R`$V_{\rm GS}=V_{\rm DD}$ 时的电流；决定电路速度（给电容充放电）`, unit: R`$\mathrm A$`, eq: "1.S10" },
  { sym: R`I_{\rm OFF}`, name: "关态电流（漏电）", en: "off-current", def: R`$V_{\rm GS}=0$ 时的电流；决定静态功耗。图 1.18 中 $3.5\times10^{-10}\,\mathrm A$`, unit: R`$\mathrm A$`, eq: "1.S10" },
  { sym: R`\Delta V_{\rm G}`, name: "栅压摆幅", en: "gate voltage swing", def: R`在关态与开态之间栅压必须变化的量`, unit: R`$\mathrm V$`, eq: "1.S10" },

  // ---------- 几何与材料 ----------
  { sym: R`L`, name: "沟道长度", en: "channel length", def: R`源与漏之间的距离（栅长）；也是电压降落的距离`, unit: R`$\mathrm{nm}$`, eq: "1.S3" },
  { sym: R`W`, name: "沟道宽度", en: "channel width", def: R`垂直于电流方向的沟道尺寸`, unit: R`$\mathrm{nm}$`, eq: "1.S4" },
  { sym: R`W_{\rm eff}`, name: "有效沟道宽度", en: "effective width", def: R`受栅控制的沟道表面周长之和，见 \eqref{1.S14}`, unit: R`$\mathrm{nm}$`, eq: "1.S14" },
  { sym: R`W_{\rm fin}`, name: "鳍宽", en: "fin width", def: R`FinFET 中硅鳍的厚度`, unit: R`$\mathrm{nm}$`, eq: "1.S14" },
  { sym: R`H_{\rm fin}`, name: "鳍高", en: "fin height", def: R`FinFET 中露出在隔离氧化层之上、被栅包住的鳍高度`, unit: R`$\mathrm{nm}$`, eq: "1.S14" },
  { sym: R`N_{\rm sh}`, name: "纳米片数", en: "number of nanosheets", def: R`GAA 器件中垂直堆叠的硅纳米片片数（原书图 1.22、1.23 中为 3）`, unit: "无量纲", eq: "1.S14" },
  { sym: R`W_{\rm sh}`, name: "纳米片宽度", en: "sheet width", unit: R`$\mathrm{nm}$`, def: R`单片纳米片沿沟道宽度方向的尺寸`, eq: "1.S14" },
  { sym: R`T_{\rm sh}`, name: "纳米片厚度", en: "sheet thickness", unit: R`$\mathrm{nm}$`, def: R`单片纳米片的厚度（几 nm）`, eq: "1.S14" },
  { sym: R`t_{\rm ox}`, name: "栅介质厚度", en: "gate oxide thickness", def: R`栅与沟道之间绝缘层的厚度；Dennard 缩放中与 $L$ 同比缩小`, unit: R`$\mathrm{nm}$`, eq: "1.S4" },
  { sym: R`N_{\rm A}`, name: "衬底受主浓度", en: "acceptor concentration", def: R`P 型衬底的掺杂浓度；恒定电场缩放要求它增大 $\kappa$ 倍，使耗尽层宽度同比缩小`, unit: R`$\mathrm{cm^{-3}}$`, eq: "1.S4" },
  { sym: R`\varepsilon`, name: "介电常数", en: "permittivity", def: R`栅介质的介电常数；$\varepsilon_{\rm ox}=3.9\varepsilon_0$（$\SiO$）`, unit: R`$\mathrm{F/cm}$`, eq: "1.S5" },
  { sym: R`\varepsilon_{\rm s}`, name: "硅的介电常数", def: R`$\varepsilon_{\rm s}=11.7\varepsilon_0$`, unit: R`$\mathrm{F/cm}$` },
  { sym: R`A`, name: "栅面积", en: "gate area", def: R`$A=WL$`, unit: R`$\mathrm{cm^2}$`, eq: "1.S5" },
  { sym: R`C`, name: "电容", en: "capacitance", def: R`被驱动的电容：缩放分析中为栅电容 $\varepsilon A/t_{\rm ox}$；在 $P=CV^2f$ 中为整个芯片翻转的总电容`, unit: R`$\mathrm F$`, eq: "1.S5" },
  { sym: R`C_{\rm ox}`, name: "单位面积栅电容", en: "gate capacitance per area", def: R`$C_{\rm ox}=\varepsilon/t_{\rm ox}$`, unit: R`$\mathrm{F/cm^2}$`, eq: "1.S6" },
  { sym: R`\mu`, name: "载流子迁移率", en: "mobility", def: R`沟道中电子（或空穴）的迁移率；应变硅（2003 年起）通过提高 $\mu$ 提高 $I_{\rm ON}$`, unit: R`$\mathrm{cm^2/(V\,s)}$`, eq: "1.S6" },
  { sym: R`v_{\rm sat}`, name: "饱和漂移速度", en: "saturation velocity", def: R`强电场下载流子漂移速度的上限，硅中约 $10^7\,\mathrm{cm/s}$；短沟道器件中 $I\propto WC_{\rm ox}v_{\rm sat}(V_{\rm GS}-V_{\rm TH})$`, unit: R`$\mathrm{cm/s}$` },
  { sym: R`\mathcal E`, name: "平均电场", en: "electric field", def: R`$\mathcal E=V/L$：电压除以电压降落的距离`, unit: R`$\mathrm{V/cm}$`, eq: "1.S3" },
  { sym: R`\psi_{\rm s}`, name: "表面势", en: "surface potential", def: R`半导体表面相对体内的电势；强反型开始时 $\psi_{\rm s}=2\phi_{\rm F}$`, unit: R`$\mathrm V$` },
  { sym: R`\phi_{\rm F}`, name: "费米势", en: "Fermi potential", def: R`$\phi_{\rm F}=(kT/q)\ln(N_{\rm A}/n_i)$`, unit: R`$\mathrm V$` },
  { sym: R`\gamma`, name: "体效应系数", en: "body-effect coefficient", def: R`$\gamma=\sqrt{2q\varepsilon_{\rm s}N_{\rm A}}/C_{\rm ox}$`, unit: R`$\mathrm{V^{1/2}}$` },
  { sym: R`W_{\rm dep}`, name: "耗尽层宽度", en: "depletion width", def: R`$W_{\rm dep}=\sqrt{2\varepsilon_{\rm s}\psi_{\rm s}/qN_{\rm A}}$`, unit: R`$\mathrm{nm}$` },
  { sym: R`D`, name: "扩散系数", en: "diffusivity", def: R`杂质在硅中的扩散系数（第 7 章）；结深随 $\sqrt{Dt}$ 增长`, unit: R`$\mathrm{cm^2/s}$` },

  // ---------- 缩放 ----------
  { sym: R`\kappa`, name: "尺寸缩放因子", en: "scaling factor", def: R`所有尺寸缩小为原来的 $1/\kappa$（原书图 1.16 记作 $k$，例子取 $k=2$）`, unit: "无量纲", eq: "1.S4" },
  { sym: R`\alpha`, name: "电压缩放因子", en: "voltage scaling factor", def: R`电压缩小为原来的 $1/\alpha$；恒定电场缩放 $\alpha=\kappa$，恒定电压缩放 $\alpha=1$`, unit: "无量纲", eq: "1.S13" },
  { sym: R`\tau`, name: "门延迟", en: "gate delay", def: R`$\tau=CV/I$：用电流 $I$ 把电容 $C$ 充电到 $V$ 所需的时间`, unit: R`$\mathrm s$`, eq: "1.S7" },
  { sym: R`P`, name: "功耗", en: "power", def: R`单管功耗 $P=VI$；芯片动态功耗 $P=CV^2f$；静态功耗 $P=NI_{\rm OFF}V_{\rm DD}$`, unit: R`$\mathrm W$`, eq: "1.S8" },
  { sym: R`f`, name: "时钟频率", en: "clock frequency", def: R`电路翻转的频率；约 2005 年后饱和在几 GHz（图 1.19）`, unit: R`$\mathrm{Hz}$`, eq: "1.S12" },
  { sym: R`N`, name: "芯片上的晶体管（元件）数", en: "transistor count", def: R`每个芯片集成的元件数；摩尔定律说它按 \eqref{1.S1} 指数增长`, unit: "无量纲", eq: "1.S1" },
  { sym: R`t`, name: "时间（年份）", en: "time", def: R`在摩尔定律中是日历年份；在扩散中是扩散时间`, unit: R`年 / $\mathrm s$`, eq: "1.S1" },
  { sym: R`t_0`, name: "参考年份", def: R`摩尔定律拟合的起点年份`, unit: "年", eq: "1.S1" },
  { sym: R`T_2`, name: "翻倍周期", en: "doubling period", def: R`晶体管数翻一倍所需的年数：Moore 1965 年估计约 1 年，1975 年修正为约 2 年`, unit: "年", eq: "1.S1" },
  { sym: R`T_{\rm g}`, name: "代际周期", en: "node cadence", def: R`相邻技术节点之间的年数：1995 年前约 3 年，之后约 2 年`, unit: "年" },
  { sym: R`\lambda`, name: "特征尺寸 / 技术节点", en: "feature size", def: R`一代工艺的最小特征尺寸；约 2000 年以前与节点名大致相等，之后节点名只是代号（图 1.21）`, unit: R`$\mathrm{nm}$`, eq: "1.S2" },
  { sym: R`j`, name: "代序号", def: R`技术代的编号，$\lambda_{j+1}$ 是 $\lambda_j$ 的下一代`, unit: "无量纲", eq: "1.S2" },
  { sym: R`\beta`, name: "电压缩放指数", def: R`交互图中令 $\alpha=\kappa^\beta$：$\beta=1$ 为恒定电场，$\beta=0$ 为恒定电压`, unit: "无量纲" },
  { sym: R`m`, name: "电流—电压幂次", def: R`$I\propto V^m$：长沟道 $m=2$，速度饱和 $m=1$`, unit: "无量纲", eq: "1.S13" },
];
