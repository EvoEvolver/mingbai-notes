// 第 3 章符号词典。sym 只写符号本身；「基底+下标」先精确匹配，否则回退到只有基底的通用条目。
// 一字多义：潜热用 \sym{ch03-Lh}{L}，Stefan–Boltzmann 常数用 \sym{ch03-sSB}{\sigma}；缺陷种类（V、I）在公式中写成 \mathrm{V}、\mathrm{I}。
const R = String.raw;

export const NOTATION = [
  // ---------- 晶体与光 ----------
  { sym: R`a`, name: "晶格常数", en: "lattice constant", def: R`立方晶胞的边长：Si $5.431\,$Å，Ge $5.658\,$Å，GaAs $5.653\,$Å。六方晶系（Miller–Bravais）中 $a_1,a_2,a_3$ 表示底面上互成 120° 的三根轴`, unit: "长度（Å）" },
  { sym: R`\lambda`, name: "光子波长", en: "photon wavelength", def: R`带间直接复合发出的光子波长，$\lambda=hc/E_G$`, unit: "nm 或 µm", eq: "3.1" },
  { sym: R`h`, name: "普朗克常数", en: "Planck constant", def: R`$h=6.626\times10^{-34}\,\mathrm{J\,s}=4.136\times10^{-15}\,\mathrm{eV\,s}$；$hc=1239.8\,\mathrm{eV\,nm}$`, eq: "3.1" },
  { sym: R`c`, name: "光速", en: "speed of light", def: R`$c=2.998\times10^{8}\,\mathrm{m\,s^{-1}}$`, eq: "3.1" },
  { sym: R`E_G`, name: "禁带宽度", en: "bandgap", def: R`$E_G=E_C-E_V$；Si 室温约 $1.12\,$eV，随温度升高而变窄（附录 A 表 A1.1）`, unit: "eV", eq: "3.1" },
  { sym: R`E_C`, name: "导带底", en: "conduction-band edge", def: R`导带最低能量`, unit: "eV" },
  { sym: R`E_V`, name: "价带顶", en: "valence-band edge", def: R`价带最高能量（注意：与空位能级 $E_{V^+}$ 等的下标不同）`, unit: "eV" },

  // ---------- 热应力 ----------
  { sym: R`\sigma`, name: "热应力", en: "thermal stress", def: R`温度不均引起的应力 $\sigma\approx\alpha Y\Delta T$；硅在工艺温度下的屈服强度约 $0.5\times10^9\,\mathrm{dyn\,cm^{-2}}$（约 50 MPa）`, unit: R`$\mathrm{dyn\,cm^{-2}}$`, eq: "3.2" },
  { sym: R`\alpha`, name: "热膨胀系数", en: "thermal expansion coefficient", def: R`硅约 $2.6\times10^{-6}\,\mathrm{K^{-1}}$（室温），高温下略增大`, unit: R`$\mathrm{K^{-1}}$`, eq: "3.2" },
  { sym: R`Y`, name: "杨氏模量", en: "Young's modulus", def: R`硅约 $1.3$–$1.9\times10^{12}\,\mathrm{dyn\,cm^{-2}}$（130–190 GPa，随晶向而异）`, unit: R`$\mathrm{dyn\,cm^{-2}}$`, eq: "3.2" },
  { sym: R`\Delta`, name: "温差", en: "temperature difference", def: R`$\Delta T$：晶片内相关区域两端的温度差（原书称"温度梯度"，量纲上应理解为跨约 1 cm 的温差）`, unit: "K", eq: "3.2" },

  // ---------- 点缺陷 ----------
  { sym: R`C_{V^0}`, name: "中性空位平衡浓度", en: "equilibrium neutral vacancy concentration", def: R`上标 $*$ 表示平衡值；$C_{V^0}^*\cong2.31\times10^{21}\exp(-1.08\,\mathrm{eV}/kT)$。只依赖温度，不依赖掺杂`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.5" },
  { sym: R`C_{I^0}`, name: "中性间隙原子平衡浓度", en: "equilibrium neutral interstitial concentration", def: R`$C_{I^0}^*\cong5\times10^{22}\exp(-2.36\,\mathrm{eV}/kT)$；只依赖温度`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.4" },
  { sym: R`C_{V^+}`, name: "正一价空位平衡浓度", en: "positive vacancy concentration", def: R`$C_{V^+}^*=(p/n_i)\,C_{V^0}^*\exp[-(E_i-E_{V^+})/kT]$，P 型材料中增多`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.12" },
  { sym: R`C_{V^-}`, name: "负一价空位平衡浓度", en: "negative vacancy concentration", def: R`$C_{V^-}^*=(n/n_i)\,C_{V^0}^*\exp[-(E_{V^-}-E_i)/kT]$，N 型材料中增多`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.11" },
  { sym: R`C_{V^=}`, name: "负二价空位平衡浓度", en: "doubly negative vacancy concentration", def: R`$C_{V^=}^*=(n/n_i)^2C_{V^0}^*\exp[-(E_{V^-}-E_i)/kT]\exp[-(E_{V^=}-E_i)/kT]$，随 $(n/n_i)^2$ 增长`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.13" },
  { sym: R`C`, name: "浓度（通用）", en: "concentration", def: R`$C^*$ 泛指点缺陷的平衡浓度（上标 $*$ 表示平衡）；带下标时见各具体条目`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.3" },
  { sym: R`G`, name: "Gibbs 自由能", en: "Gibbs free energy", def: R`$G=H-TS$；推导式 (3.3) 时把它写成缺陷数 $n_d$ 的函数并求极小`, unit: "eV" },
  { sym: R`W`, name: "构型数", en: "number of configurations", def: R`把 $n_d$ 个缺陷放到 $N_S$ 个格点上的方式数，$W=N_S!/[n_d!(N_S-n_d)!]$；构型熵为 $k\ln W$` },
  { sym: R`n_d`, name: "缺陷数", en: "number of defects", def: R`单位体积中某种点缺陷的个数，平衡时即 $C^*$`, unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`m`, name: "热导率温度指数", def: R`推导式 (3.14) 时假设 $\kappa=k_M(T/T_M)^m$；原书系数 2/3 对应 $m=1$`, unit: "无量纲" },
  { sym: R`v`, name: "生长（提拉）速率", en: "growth rate", def: R`固液界面推进的速度；其上限为 $v_{\rm PMAX}$`, unit: R`$\mathrm{cm\,h^{-1}}$`, eq: "3.14" },
  { sym: R`N_S`, name: "晶格格点密度", en: "density of lattice sites", def: R`硅约 $5\times10^{22}\,\mathrm{cm^{-3}}$`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.3" },
  { sym: R`S`, name: "缺陷形成熵", en: "formation entropy", def: R`式 (3.3) 中的 $S^f$（上标 f 表示 formation）。$\exp(S^f/k)$ 是浓度的指前因子的一部分；V 与 I 的 $S^f$ 不同`, unit: R`$k$ 的倍数`, eq: "3.3" },
  { sym: R`H`, name: "缺陷形成焓", en: "formation enthalpy", def: R`式 (3.3) 中的 $H^f$：在晶格中造出一个该种缺陷所需的能量，决定 Arrhenius 斜率`, unit: "eV", eq: "3.3" },
  { sym: R`k`, name: "玻尔兹曼常数", en: "Boltzmann constant", def: R`$k=8.617\times10^{-5}\,\mathrm{eV\,K^{-1}}$；$kT$ 在 1000 ℃ 时约 $0.110\,$eV`, unit: R`$\mathrm{eV\,K^{-1}}$` },
  { sym: R`T`, name: "温度", en: "temperature", def: R`绝对温度（K）；图中常以 $1000/T$ 作横轴（Arrhenius 图）`, unit: "K" },
  { sym: R`D_I`, name: "硅自间隙原子扩散率", en: "interstitial diffusivity", def: R`$D_I\cong600\exp(-2.44\,\mathrm{eV}/kT)\,\mathrm{cm^2s^{-1}}$`, unit: R`$\mathrm{cm^2\,s^{-1}}$`, eq: "3.6" },
  { sym: R`D_V`, name: "空位扩散率", en: "vacancy diffusivity", def: R`$D_V\cong13\exp(-2.92\,\mathrm{eV}/kT)\,\mathrm{cm^2s^{-1}}$`, unit: R`$\mathrm{cm^2\,s^{-1}}$`, eq: "3.7" },
  { sym: R`D`, name: "扩散率", en: "diffusivity", def: R`一般的扩散系数；$\sqrt{Dt}$ 是时间 $t$ 内的特征扩散长度`, unit: R`$\mathrm{cm^2\,s^{-1}}$` },
  { sym: R`t`, name: "时间", en: "time", def: R`工艺或退火时间`, unit: "s" },
  { sym: R`E_{V^+}`, name: R`空位施主能级 $\mathrm{V}^+$`, en: "vacancy donor level", def: R`$E_F$ 低于此能级时空位失去电子成为 $\mathrm{V}^+$；图 3.11 中位于 $E_i$ 下方`, unit: "eV", eq: "3.8" },
  { sym: R`E_{V^-}`, name: R`空位受主能级 $\mathrm{V}^-$`, en: "vacancy acceptor level", def: R`$E_F$ 高于此能级时空位俘获电子成为 $\mathrm{V}^-$；图 3.11 中位于 $E_i$ 上方`, unit: "eV", eq: "3.9" },
  { sym: R`E_{V^=}`, name: R`空位二重受主能级 $\mathrm{V}^=$`, en: "vacancy double-acceptor level", def: R`$\mathrm{V}^-$ 再俘获一个电子成为 $\mathrm{V}^=$ 的能级，靠近导带`, unit: "eV", eq: "3.10" },
  { sym: R`E_F`, name: "费米能级", en: "Fermi level", def: R`电子占据概率为 1/2 的能量；本征时 $E_F=E_i$，N 型上移、P 型下移`, unit: "eV" },
  { sym: R`E_i`, name: "本征费米能级", en: "intrinsic Fermi level", def: R`本征材料（$n=p=n_i$）中的费米能级，约在禁带中央`, unit: "eV" },
  { sym: R`n`, name: "电子浓度", en: "electron concentration", def: R`$n=n_i\exp[(E_F-E_i)/kT]$（附录 A 式 A1.13）`, unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`p`, name: "空穴浓度", en: "hole concentration", def: R`$p=n_i\exp[(E_i-E_F)/kT]$（附录 A 式 A1.14）；$np=n_i^2$`, unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`n_i`, name: "本征载流子浓度", en: "intrinsic carrier concentration", def: R`$n_i^2\approx1.52\times10^{33}T^3\exp(-1.21\,\mathrm{eV}/kT)$（附录 A 式 A1.12）；1000 ℃ 时约 $7.14\times10^{18}\,\mathrm{cm^{-3}}$`, unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`N_D`, name: "施主浓度", en: "donor concentration", def: R`浅施主（P、As、Sb）掺杂浓度`, unit: R`$\mathrm{cm^{-3}}$` },
  { sym: R`N_A`, name: "受主浓度", en: "acceptor concentration", def: R`浅受主（B）掺杂浓度`, unit: R`$\mathrm{cm^{-3}}$` },

  // ---------- CZ 拉速 ----------
  { sym: R`v_{\rm PMAX}`, name: "最大拉速", en: "maximum pull rate", def: R`由界面热平衡给出的晶体最大提拉速度，$\propto r^{-1/2}$；150 mm 晶锭约 24 cm/h`, unit: R`$\mathrm{cm\,h^{-1}}$`, eq: "3.14" },
  { id: "Lh", sym: R`L`, name: "熔化潜热", en: "latent heat of fusion", def: R`硅约 $1.8\times10^3\,\mathrm{J\,g^{-1}}$（50 kJ/mol）；式 (3.14) 中与密度 $N$ 相乘得单位体积潜热`, unit: R`$\mathrm{J\,g^{-1}}$`, eq: "3.14" },
  { sym: R`N`, name: "硅的密度", en: "density of silicon", def: R`式 (3.14) 中取质量密度 $2.33\,\mathrm{g\,cm^{-3}}$（与 $L$ 的单位配套）`, unit: R`$\mathrm{g\,cm^{-3}}$`, eq: "3.14" },
  { id: "sSB", sym: R`\sigma`, name: "Stefan–Boltzmann 常数", en: "Stefan–Boltzmann constant", def: R`$5.67\times10^{-12}\,\mathrm{W\,cm^{-2}K^{-4}}$`, eq: "3.14" },
  { sym: R`\varepsilon`, name: "发射率", en: "emissivity", def: R`硅表面热辐射发射率，约 0.5–0.6`, unit: "无量纲", eq: "3.14" },
  { sym: R`k_M`, name: "熔点处硅的热导率", en: "thermal conductivity at melting point", def: R`约 $0.22\,\mathrm{W\,cm^{-1}K^{-1}}$`, unit: R`$\mathrm{W\,cm^{-1}K^{-1}}$`, eq: "3.14" },
  { sym: R`\kappa`, name: "热导率（随温度变化）", en: "thermal conductivity", def: R`推导中用 $\kappa(T)$ 表示晶体热导率，熔点处 $\kappa(T_M)=k_M$`, unit: R`$\mathrm{W\,cm^{-1}K^{-1}}$` },
  { sym: R`T_M`, name: "硅的熔点", en: "melting temperature", def: R`$1417\,$℃（约 $1690\,$K；常见文献值 1414 ℃）`, unit: "K", eq: "3.14" },
  { sym: R`r`, name: "晶锭半径", en: "crystal radius", def: R`150 mm 晶锭 $r=7.5\,$cm`, unit: "cm", eq: "3.14" },
  { sym: R`z`, name: "沿晶锭的坐标", en: "axial coordinate", def: R`推导拉速时从固液界面沿晶锭向上量的距离`, unit: "cm" },
  { sym: R`A`, name: "晶锭截面积", en: "cross-sectional area", def: R`$A=\pi r^2$`, unit: R`$\mathrm{cm^2}$` },
  { sym: R`P`, name: "截面周长", en: "perimeter", def: R`$P=2\pi r$，用于辐射散热`, unit: "cm" },

  // ---------- 分凝 ----------
  { sym: R`k_O`, name: "平衡分凝系数", en: "equilibrium segregation coefficient", def: R`$k_O=C_S/C_L$（界面两侧）；Si 中多数杂质 $k_O<1$（B 0.8，P 0.35，As 0.3，Sb 0.023，表 3.1）`, unit: "无量纲", eq: "3.16" },
  { sym: R`k_{\rm eff}`, name: "有效分凝系数", en: "effective segregation coefficient", def: R`远离平衡（如凝固很快、界面有溶质边界层）时实测的分凝系数，介于 $k_O$ 与 1 之间`, unit: "无量纲" },
  { sym: R`C_S`, name: "固相杂质浓度", en: "impurity concentration in solid", def: R`紧贴固液界面固体一侧的浓度；CZ 中为凝固分数 $f$ 的函数，FZ 中为位置 $x$ 的函数`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.16" },
  { sym: R`C_L`, name: "液相杂质浓度", en: "impurity concentration in liquid", def: R`熔体（或熔区）中的浓度，假设充分混合而均匀`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.16" },
  { sym: R`C_O`, name: "初始杂质浓度", en: "initial concentration", def: R`CZ：熔体初始浓度；FZ：原料棒的均匀浓度`, unit: R`$\mathrm{cm^{-3}}$`, eq: "3.22" },
  { sym: R`V`, name: "体积", en: "volume", def: R`$dV$：新凝固的一小块熔体体积`, unit: R`$\mathrm{cm^3}$`, eq: "3.17" },
  { sym: R`V_O`, name: "熔体初始体积", en: "initial melt volume", def: R`坩埚中熔体的初始体积`, unit: R`$\mathrm{cm^3}$`, eq: "3.17" },
  { sym: R`V_S`, name: "已凝固体积", en: "solidified volume", def: R`已长成晶体的体积；$V_L=V_O-V_S$`, unit: R`$\mathrm{cm^3}$`, eq: "3.17" },
  { sym: R`V_L`, name: "剩余熔体体积", en: "melt volume", def: R`$V_L=V_O-V_S$`, unit: R`$\mathrm{cm^3}$` },
  { sym: R`I`, name: "杂质数目", en: "number of impurities", def: R`CZ：熔体中的杂质原子数；FZ：熔区中单位截面积的杂质原子数（$C_L=I/L$）`, unit: "个（或 $\\mathrm{cm^{-2}}$）", eq: "3.17" },
  { sym: R`I_L`, name: "熔体中杂质数", en: "impurities in liquid", def: R`生长过程中熔体里剩余的杂质数，$C_L=I_L/(V_O-V_S)$`, unit: "个", eq: "3.17" },
  { sym: R`I_O`, name: "初始杂质数", en: "initial impurities", def: R`CZ：$I_O=C_OV_O$；FZ：熔区刚形成时 $I_O=C_OL$`, unit: "个", eq: "3.19" },
  { sym: R`f`, name: "凝固分数", en: "fraction solidified", def: R`$f=V_S/V_O$，0（籽晶端）到 1（尾端）`, unit: "无量纲", eq: "3.22" },
  { sym: R`g`, name: "末熔区凝固分数", en: "fraction of last zone frozen", def: R`区熔最后一个熔区按正常凝固冻结时，已冻结部分占该熔区的比例`, unit: "无量纲" },
  { sym: R`x`, name: "熔区位置", en: "zone position", def: R`熔区已扫过的距离（从棒的起始端量起）；常用 $x/L$ 表示"已凝固的熔区长度数"`, unit: "cm", eq: "3.23" },
  { sym: R`L`, name: "熔区长度", en: "zone length", def: R`区熔中液态熔区的长度，典型约 2 cm`, unit: "cm", eq: "3.23" },

  // ---------- 核反应 ----------
  { sym: R`\gamma`, name: R`$\gamma$ 光子`, en: "gamma photon", def: R`$(\mathrm{n},\gamma)$ 表示俘获一个中子并放出 $\gamma$ 光子的核反应`, eq: "3.26" },
  { sym: R`\beta`, name: R`$\beta$ 粒子`, en: "beta particle", def: R`$\beta^-$：$\beta$ 衰变放出的电子；$^{31}$Si 半衰期约 2.6 h`, eq: "3.26" },
];
