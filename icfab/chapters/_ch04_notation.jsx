// 第 4 章符号词典。同一字母多义时用 id，并在公式中写 \sym{ch04-<id>}{…}。
// 化学式、元素与缺陷记号（Si、Au_S、I、V、O_I…）一律写在 \mathrm{} 中，不参与符号匹配。
const R = String.raw;

export const NOTATION = [
  // ---------- 常数与通用 ----------
  { sym: R`q`, name: "元电荷", en: "elementary charge", def: R`$q=1.602\times10^{-19}\,\mathrm C$`, unit: "C" },
  { sym: R`k`, name: "玻尔兹曼常数", en: "Boltzmann constant", def: R`$k=8.617\times10^{-5}\,\mathrm{eV/K}$；室温 $kT/q\approx25.9\,\mathrm{mV}$`, unit: "eV/K" },
  { sym: R`T`, name: "绝对温度", en: "absolute temperature", def: R`Arrhenius 式中一律用开尔文；工艺上常说的 1000 ˚C 即 $T=1273\,\mathrm K$`, unit: "K" },
  { sym: R`t`, name: "时间", def: R`热处理或扩散的时间`, unit: "s" },
  { sym: R`x`, name: "深度坐标", def: R`到晶圆表面（或背面）的距离`, unit: "µm 或 cm" },
  { sym: R`z`, name: "离子电荷数", en: "ion charge number", def: R`金属离子 $\mathrm M^{z+}$ 的价数，或 Nernst–Einstein 关系 $\mu=zqD/kT$ 中离子所带的元电荷数`, unit: "无量纲", eq: "4.6" },
  { sym: R`i`, name: "工序编号", def: R`式 (4.26) 中第 $i$ 道（关键）工序；连乘/求和遍历所有"levels"`, unit: "无量纲", eq: "4.26" },
  { sym: R`\infty`, name: "无穷大", def: "极限或积分上限" },

  // ---------- MOS 阈值电压 (4.1) ----------
  { sym: R`V_{\rm TH}`, name: "阈值电压", en: "threshold voltage", def: R`MOS 晶体管开始导通的栅压；可动离子电荷使它漂移 $-qQ_{\rm M}/C_{\rm ox}$`, unit: "V", eq: "4.1" },
  { sym: R`V_{\rm FB}`, name: "平带电压", en: "flat-band voltage", def: R`使半导体能带不弯曲所需的栅压，由功函数差与固定氧化层电荷决定`, unit: "V", eq: "4.1" },
  { sym: R`V`, name: "电压", def: R`见 $V_{\rm TH}$、$V_{\rm FB}$` , unit: "V" },
  { sym: R`\phi_f`, name: "费米势", en: "Fermi potential", def: R`体内费米能级与本征能级之差除以 $q$；强反型条件为表面势达到 $2\phi_f$`, unit: "V", eq: "4.1" },
  { sym: R`\phi`, name: "电势", def: R`见 $\phi_f$`, unit: "V" },
  { sym: R`\varepsilon_S`, name: "半导体介电常数", en: "semiconductor permittivity", def: R`硅 $\varepsilon_S=11.7\,\varepsilon_0$`, unit: "F/cm", eq: "4.1" },
  { sym: R`\varepsilon`, name: "介电常数", def: R`$\varepsilon_{\rm ox}=3.9\,\varepsilon_0$（$\SiO$），$\varepsilon_0=8.854\times10^{-14}\,\mathrm{F/cm}$`, unit: "F/cm" },
  { sym: R`N_A`, name: "受主掺杂浓度", en: "acceptor concentration", def: R`P 型衬底的掺杂浓度`, unit: R`$\mathrm{cm^{-3}}$`, eq: "4.1" },
  { sym: R`C_{\rm ox}`, name: "单位面积栅氧电容", en: "oxide capacitance per area", def: R`$C_{\rm ox}=\varepsilon_{\rm ox}/t_{\rm ox}$；$t_{\rm ox}=2\,\mathrm{nm}$ 时约 $1.7\times10^{-6}\,\mathrm{F/cm^2}$`, unit: R`$\mathrm{F/cm^2}$`, eq: "4.1" },
  { sym: R`t_{\rm ox}`, name: "栅氧厚度", en: "oxide thickness", def: "栅介质的物理厚度", unit: "cm" },
  { sym: R`Q_{\rm M}`, name: "可动离子面密度", en: "mobile ion charge density", def: R`栅氧中 $\mathrm{Na^+}$、$\mathrm{K^+}$ 的个数面密度（每 $\mathrm{cm^2}$ 的电荷数）；乘以 $q$ 才是库仑每平方厘米`, unit: R`$\mathrm{cm^{-2}}$`, eq: "4.1" },

  // ---------- SRH 寿命 (4.2)(4.15)(4.16) ----------
  { sym: R`\tau_G`, name: "产生寿命", en: "generation lifetime", def: R`耗尽区中 SRH 中心热产生载流子的特征时间，$\tau_G=1/(\sigma v_{\rm th}N_t)$`, unit: "s", eq: "4.2" },
  { sym: R`\tau_R`, name: "复合寿命", en: "recombination lifetime", def: R`过剩少子经 SRH 中心复合的特征时间，同为 $1/(\sigma v_{\rm th}N_t)$`, unit: "s", eq: "4.16" },
  { sym: R`\tau`, name: "载流子寿命", en: "carrier lifetime", def: R`SRH 复合率式 (4.15) 中的寿命参数`, unit: "s", eq: "4.15" },
  { sym: R`\sigma`, name: "俘获截面", en: "capture cross-section", def: R`陷阱"抓住"一个载流子的有效面积，约为原子截面 $10^{-16}\,\mathrm{cm^2}$。注意：§4.7 中的 $\sym{ch04-sd}{\sigma}$ 是标准差`, unit: R`$\mathrm{cm^2}$`, eq: "4.2" },
  { id: "sd", sym: R`\sigma`, name: "标准差", en: "standard deviation", def: R`工艺参数正态分布的标准差；$\pm3\sym{ch04-sd}{\sigma}$ 内包含 99.7% 的样本`, unit: "同参数", eq: "4.27" },
  { sym: R`v_{\rm th}`, name: "热速度", en: "thermal velocity", def: R`少数载流子的热运动速度，室温约 $10^7\,\mathrm{cm/s}$`, unit: "cm/s", eq: "4.2" },
  { sym: R`v`, name: "速度", def: R`见 $v_{\rm th}$`, unit: "cm/s" },
  { sym: R`N_t`, name: "陷阱（深能级）浓度", en: "trap density", def: R`单位体积的 SRH 复合中心数，通常来自 Au、Cu、Fe 等过渡金属或辐照损伤`, unit: R`$\mathrm{cm^{-3}}$`, eq: "4.2" },
  { sym: R`U`, name: "净复合率", en: "net recombination rate", def: R`单位体积单位时间的净复合（$U>0$）或净产生（$U<0$）`, unit: R`$\mathrm{cm^{-3}\,s^{-1}}$`, eq: "4.15" },
  { sym: R`n`, name: "电子浓度", def: "导带电子浓度（§4.4.4 的级数中 $n$ 为奇数求和序号）", unit: R`$\mathrm{cm^{-3}}$`, eq: "4.15" },
  { sym: R`p`, name: "空穴浓度", def: "价带空穴浓度", unit: R`$\mathrm{cm^{-3}}$`, eq: "4.15" },
  { sym: R`n_i`, name: "本征载流子浓度", en: "intrinsic carrier concentration", def: R`硅在 300 K 时约 $10^{10}\,\mathrm{cm^{-3}}$；平衡时 $np=n_i^2$`, unit: R`$\mathrm{cm^{-3}}$`, eq: "4.15" },
  { sym: R`E_T`, name: "陷阱能级", en: "trap energy level", def: "深能级在禁带中的位置", unit: "eV", eq: "4.15" },
  { sym: R`E_i`, name: "本征费米能级", en: "intrinsic level", def: "大致位于禁带中央", unit: "eV", eq: "4.15" },
  { sym: R`E`, name: "能量", def: R`见 $E_A$、$E_B$、$E_T$、$E_i$`, unit: "eV" },

  // ---------- 颗粒与洁净室 (4.3) ----------
  { sym: R`N`, name: "ISO 洁净度等级", en: "ISO class number", def: R`ISO 14644-1 的等级数；每 $\mathrm{m^3}$ 中 $\geq0.1\,\mu\mathrm m$ 的颗粒上限为 $10^N$`, unit: "无量纲", eq: "4.3" },
  { id: "dsz", sym: R`D`, name: "颗粒直径", en: "particle diameter", def: R`式 (4.3) 中以 µm 为单位的颗粒尺寸阈值（统计"$\geq D$"的颗粒）`, unit: "µm", eq: "4.3" },

  // ---------- 水与离子 ----------
  { sym: R`\mu`, name: "迁移率", en: "mobility", def: R`离子在单位电场下的漂移速度；Nernst–Einstein：$\mu=zqD/kT$`, unit: R`$\mathrm{cm^2\,V^{-1}s^{-1}}$` },
  { sym: R`\rho`, name: "电阻率", en: "resistivity", def: R`$\rho=1/[q\sum_j n_j\mu_j]$；理论纯水约 $18\,\mathrm{M\Omega\,cm}$`, unit: R`$\Omega\,\mathrm{cm}$` },

  // ---------- 扩散与吸杂 ----------
  { sym: R`D`, name: "扩散系数", en: "diffusivity", def: R`Arrhenius 形式 $D=\sym{ch04-dpre}{D_{\rm O}}\exp(-E_A/kT)$（式 4.9）。注意本章 $D$ 还表示颗粒直径（式 4.3）与缺陷密度（式 4.21）`, unit: R`$\mathrm{cm^2/s}$`, eq: "4.9" },
  { id: "dpre", sym: R`D_{\rm O}`, name: "扩散系数指前因子", en: "pre-exponential factor", def: R`Arrhenius 式中 $1/T\to0$ 的外推值（原书与缺陷密度 $D_{\rm O}$ 同记号，含义不同）`, unit: R`$\mathrm{cm^2/s}$`, eq: "4.9" },
  { sym: R`E_A`, name: "激活能", en: "activation energy", def: R`扩散需越过的势垒；$\ln D$ 对 $1/T$ 作图的斜率为 $-E_A/k$`, unit: "eV", eq: "4.9" },
  { sym: R`C_{\rm O}^*`, name: "氧在硅中的平衡固溶度", en: "oxygen solubility", def: R`间隙氧的平衡浓度，熔点附近约 $1.2\times10^{18}$，1000 ˚C 约 $10^{17}\,\mathrm{cm^{-3}}$`, unit: R`$\mathrm{cm^{-3}}$`, eq: "4.10" },
  { sym: R`C`, name: "聚集因子", en: "clustering factor", def: R`负二项良率模型的参数，缺陷空间聚集程度的度量：$C\to\infty$ 无聚集（Poisson），$C=1$ 为 Seeds；工业常取 $C\approx2$。注意式 (4.18)–(4.20) 中的 $\sym{ch04-nchip}{C}$ 是芯片数`, unit: "无量纲", eq: "4.22" },
  { sym: R`C_i`, name: "第 i 道工序的聚集因子", def: R`式 (4.26) 中各工序的 $C$；近似式要求各 $C_i$ 取同一值 $C$`, unit: "无量纲", eq: "4.26" },
  { sym: R`D_{{\rm O}_{\rm I}}`, name: "间隙氧扩散系数", en: "interstitial oxygen diffusivity", def: R`$0.13\exp(-2.53\,\mathrm{eV}/kT)\,\mathrm{cm^2/s}$；1150 ˚C 时约 $1.4\times10^{-10}\,\mathrm{cm^2/s}$`, unit: R`$\mathrm{cm^2/s}$`, eq: "4.11" },
  { sym: R`\gamma`, name: "每个氧原子发射的自间隙原子数", def: R`式 (4.12)：每个 $\mathrm{O_I}$ 并入 $\SiO$ 沉淀时向晶格发射的 Si 自间隙原子 I 的个数`, unit: "无量纲", eq: "4.12" },
  { sym: R`\beta`, name: "每个氧原子吸收的空位数", def: R`式 (4.12)：每个 $\mathrm{O_I}$ 并入沉淀时消耗的空位 V 的个数`, unit: "无量纲", eq: "4.12" },
  { sym: R`K_1`, name: "陷阱释放的经验系数", def: R`式 (4.13) 中描述捕获细节的经验常数`, unit: "无量纲", eq: "4.13" },
  { sym: R`E_B`, name: "结合能", en: "binding energy", def: R`金属原子与吸杂陷阱之间的结合能；越大，高温下越不易逃逸`, unit: "eV", eq: "4.13" },

  // ---------- 良率 ----------
  { sym: R`Y`, name: "良率", en: "yield", def: R`功能完好的芯片所占比例`, unit: "无量纲", eq: "4.17" },
  { sym: R`f`, name: "函数 / 概率密度", def: R`式 (4.17) 中 $f$ 表示"某个函数"；式 (4.21) 中 $f(\sym{ch04-dd}{D})$ 是缺陷密度的归一化概率密度，$\int_0^\infty f\,\dd \sym{ch04-dd}{D}=1$` },
  { sym: R`D_{\rm O}`, name: "平均缺陷密度", en: "defect density", def: R`单位面积上的致命缺陷数（常写 $D_0$）；先进产线单步要求 $<0.01\,\mathrm{cm^{-2}}$`, unit: R`$\mathrm{cm^{-2}}$`, eq: "4.17" },
  { id: "dd", sym: R`D`, name: "缺陷密度（随机变量）", def: R`Murphy 积分中的积分变量：不同芯片、不同晶圆上实际的缺陷密度，按 $f(\sym{ch04-dd}{D})$ 分布，平均值为 $D_{\rm O}$`, unit: R`$\mathrm{cm^{-2}}$`, eq: "4.21" },
  { sym: R`A_C`, name: "关键面积", en: "critical area", def: R`芯片上一旦落入缺陷就会致命的那部分面积（不超过芯片面积）`, unit: R`$\mathrm{cm^2}$`, eq: "4.17" },
  { sym: R`A`, name: "面积", def: R`见 $A_C$` , unit: R`$\mathrm{cm^2}$` },
  { sym: R`A_{{\rm C}i}`, name: "第 i 道工序的关键面积", def: R`不同工序（层）的关键面积各不相同`, unit: R`$\mathrm{cm^2}$`, eq: "4.26" },
  { sym: R`D_{{\rm O}i}`, name: "第 i 道工序的缺陷密度", def: R`该工序引入的平均致命缺陷密度`, unit: R`$\mathrm{cm^{-2}}$`, eq: "4.26" },
  { id: "nchip", sym: R`C`, name: "晶圆上的芯片数", def: R`Poisson 模型推导（式 4.18–4.20）中晶圆上的芯片总数，最后取 $\sym{ch04-nchip}{C}\to\infty$`, unit: "无量纲", eq: "4.18" },
  { sym: R`M`, name: "缺陷总数", def: R`散落在晶圆上的致命缺陷个数，$M=\sym{ch04-nchip}{C}A_CD_{\rm O}$`, unit: "无量纲", eq: "4.18" },

  // ---------- 工艺能力 ----------
  { sym: R`C_p`, name: "工艺能力", en: "process capability", def: R`规格宽度与 $6\sym{ch04-sd}{\sigma}$ 之比，只看分布宽窄`, unit: "无量纲", eq: "4.27" },
  { sym: R`C_{pk}`, name: "工艺能力指数", en: "process capability index", def: R`均值到较近规格限的距离与 $3\sym{ch04-sd}{\sigma}$ 之比，同时反映宽窄与是否居中`, unit: "无量纲", eq: "4.27" },
  { sym: R`\bar X`, name: "样本均值", en: "mean", def: "工艺参数的平均值", unit: "同参数", eq: "4.27" },
  { sym: R`X`, name: "工艺参数", def: R`被监控的参数（方块电阻、氧化层厚度、线宽……）` },
  // ---------- 推导与交互中用到的辅助符号 ----------
  { sym: R`\theta`, name: "Gamma 分布的尺度参数", def: R`$\theta=D_{\rm O}/C$，使 Gamma 分布的均值为 $D_{\rm O}$`, unit: R`$\mathrm{cm^{-2}}$`, eq: "4.22" },
  { sym: R`\Gamma`, name: "Gamma 函数", def: R`$\Gamma(C)=\int_0^\infty x^{C-1}e^{-x}\dd x$；整数时 $\Gamma(n)=(n-1)!$` },
  { sym: R`\lambda`, name: "每颗芯片的平均缺陷数", def: R`$\lambda=A_CD_{\rm O}$；Poisson 模型中芯片上缺陷数服从均值为 $\lambda$ 的 Poisson 分布`, unit: "无量纲", eq: "4.20" },
  { sym: R`\Delta`, name: "增量", def: R`$\Delta n$：过剩载流子浓度；$\Delta V_{\rm TH}$：阈值电压漂移` },
  { sym: R`L`, name: "晶圆厚度", def: R`背面吸杂解析解中，从背面（陷阱）到正面（无流边界）的距离`, unit: "cm" },
  { sym: R`b_n`, name: "级数展开系数", def: R`扩散方程分离变量解的第 $n$ 项系数，$b_n=4C_0/(n\pi)$` },
  { sym: R`k_n`, name: "本征波数", def: R`$k_n=n\pi/(2L)$，$n$ 为奇数` },
  { sym: R`C_0`, name: "初始浓度", def: "热处理开始时晶圆中均匀分布的金属浓度", unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`u`, name: "展开变量", def: R`$\ln(1-u)=-u-u^2/2-\cdots$ 中的小量，这里 $u=1/\sym{ch04-nchip}{C}$` },
  { sym: R`s`, name: "积分参数", def: R`$\int_0^\infty x^{C-1}e^{-sx}\dd x=\Gamma(C)/s^C$ 中的参数` },
  { sym: R`\delta`, name: "狄拉克 delta 函数", def: R`$f(D)=\delta(D-D_{\rm O})$ 表示缺陷密度没有起伏` },
  { sym: R`P`, name: "概率", def: R`$P(k\ \text{个缺陷})$：一颗芯片上恰有 $k$ 个缺陷的概率` },
  { sym: R`K`, name: "平衡常数 / 模型常数", def: R`$K_{\rm ko}$、$K_{\rm FT}$ 为踢出与离解反应的平衡常数；图 4.21 示意模型中 $K$ 为无量纲强度系数` },
  { sym: R`K_{\rm ko}`, name: "踢出反应平衡常数", def: R`$[\mathrm{Au_i}]=K_{\rm ko}[\mathrm{Au_S}][\mathrm I]$`, eq: "4.7" },
  { sym: R`K_{\rm FT}`, name: "离解反应平衡常数", def: R`$[\mathrm{Au_i}][\mathrm V]=K_{\rm FT}[\mathrm{Au_S}]$`, eq: "4.8" },
  { sym: R`\Phi`, name: "标准正态分布函数", def: R`$\Phi(z)=\frac12[1+\mathrm{erf}(z/\sqrt2)]$；超规格比例约 $1-\Phi(3C_{pk})$` },
  { sym: R`\Omega`, name: "欧姆", def: "电阻单位" },
  { sym: R`I`, name: "硅自间隙原子", def: R`化学式中写作 $\mathrm I$；$[\mathrm I]$ 为其浓度` },
];
