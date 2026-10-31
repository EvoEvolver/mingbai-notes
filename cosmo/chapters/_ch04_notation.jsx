// 第 4 章符号词典（决定公式中符号的可点击性）。
// 规则：sym 只写符号本身；「基底+下标」先精确匹配，否则回退到只有基底的通用条目。
// 同一字母多义时，用 \sym{ch04-<id>}{…} 指定（下方 S 对象给出常用写法，可在 R`` 模板中 ${S.xm} 插入）。
const R = String.raw;

// 公式中常用的「强制指定」写法
export const S = {
  n0: R`\sym{ch04-n0}{n}`,            // 零化学势（平衡）数密度 n^{(0)}
  xm: R`\sym{ch04-xm}{x}`,            // x = m_X/T
  xe: R`\sym{ch04-xe}{x}`,            // x = ε₀/T（习题 4.7）
  xi: R`\sym{ch04-xint}{x}`,          // 积分变量
  a2: R`\sym{ch04-alpha2}{\alpha}`,   // 复合率 α^{(2)}
  b2: R`\sym{ch04-beta2}{\beta}`,     // Lyman α 产生率 β^{(2)}
  pr: R`\sym{ch04-proton}{p}`,        // 质子
  ne: R`\sym{ch04-neutron}{n}`,       // 中子
  el: R`\sym{ch04-electron}{e}`,      // 电子 / 正电子
  mN: R`\sym{ch04-mnuc}{m}`,          // 习题 4.4 中的核子质量 m
};

export const NOTATION = [
  // ---------- 单位、常数 ----------
  { sym: R`G`, name: "牛顿引力常数", en: "Newton's constant", def: R`自然单位下 $G=m_{\rm Pl}^{-2}$，$m_{\rm Pl}=1.22\times10^{19}\,\mathrm{GeV}$；出现在 $H=\sqrt{8\pi G\rho/3}$ 中`, eq: "4.24" },
  { sym: R`G_{\rm F}`, name: "费米常数", en: "Fermi constant", def: R`弱相互作用强度，$G_{\rm F}=1.166\times10^{-5}\,\mathrm{GeV}^{-2}$；决定中子–质子转化率与中子寿命`, unit: R`能量$^{-2}$`, eq: "4.58" },
  { sym: R`g_A`, name: "核子轴矢耦合", en: "axial-vector coupling", def: R`核子的轴矢流耦合常数，$g_A\simeq1.27$；弱过程矩阵元正比于 $1+3g_A^2$`, unit: "无量纲", eq: "4.58" },
  { sym: R`\alpha`, name: "精细结构常数", en: "fine-structure constant", def: R`$\alpha=e^2/4\pi\simeq1/137$；复合率 $\alpha^{(2)}\propto\alpha^2/m_e^2$（\eqref{4.39}）`, unit: "无量纲", eq: "4.39" },
  { sym: R`\sigma_{\rm T}`, name: "汤姆孙截面", en: "Thomson cross section", def: R`光子–自由电子散射截面 $\sigma_{\rm T}=8\pi\alpha^2/3m_e^2=0.665\times10^{-24}\,\mathrm{cm^2}$`, unit: R`面积`, eq: "4.40" },

  // ---------- 时间、尺度、膨胀 ----------
  { sym: R`t`, name: "宇宙时", en: "cosmic time", def: R`共动观测者的固有时；辐射主导期 $t=1/2H$；e$^\pm$ 湮灭后 $t=132\,\mathrm s\,(0.1\,\mathrm{MeV}/T)^2$（\eqref{4.27}）`, unit: "时间" },
  { sym: R`a`, name: "标度因子", en: "scale factor", def: R`今天 $a_0=1$；$n_1a^3$ 是一个共动体积内的粒子数，$a^{-3}d(n_1a^3)/dt$ 去掉了单纯膨胀稀释的效应`, unit: "无量纲" },
  { sym: R`a_0`, name: "今天的标度因子", def: R`$a_0=1$`, unit: "无量纲", eq: "4.54" },
  { sym: R`a_1`, name: "冻结完成后某时刻的标度因子", def: R`选在 $Y$ 已达渐近值 $Y_\infty$ 之后的任一时刻`, unit: "无量纲", eq: "4.54" },
  { sym: R`a_{\rm eq}`, name: "物质–辐射相等时的标度因子", def: R`$a_{\rm eq}=4.15\times10^{-5}/\Omega_{\rm m}h^2$，$1/a_{\rm eq}\simeq3360\,(\Omega_{\rm m}h^2/0.14)$（\eqref{2.86}）`, unit: "无量纲", eq: "4.43" },
  { sym: R`z`, name: "红移", en: "redshift", def: R`$1+z=1/a$；复合约在 $z_*\sim1100$`, unit: "无量纲" },
  { sym: R`z_*`, name: "复合（最后散射）红移", def: R`$z_*\sim1000$–$1100$，对应 $T_*\sim0.25\,\mathrm{eV}$`, unit: "无量纲" },
  { sym: R`z_{\rm decouple}`, name: "退耦红移", en: "decoupling redshift", def: R`光子散射率 $n_e\sigma_{\rm T}$ 降到膨胀率 $H$ 以下的红移；若宇宙一直电离，$1+z_{\rm decouple}\approx39$（\eqref{4.44}）`, unit: "无量纲", eq: "4.44" },
  { sym: R`H`, name: "哈勃率", en: "Hubble rate", def: R`$H=\dot a/a=\sqrt{8\pi G\rho/3}$；辐射主导时 $H\propto T^2$，可写作 $H(x)=H(x=1)/x^2$。$H(\cdot)$ 括号内为温度或 $x$ 的取值，如 $H(m_X)$ 为 $T=m_X$ 时的哈勃率`, unit: R`时间$^{-1}$`, eq: "4.24" },
  { sym: R`H_0`, name: "哈勃常数", def: R`今天的哈勃率 $H_0=100h\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$；$H_0/c=1.08\times10^{-28}h\,\mathrm{cm^{-1}}$`, unit: R`时间$^{-1}$`, eq: "4.42" },
  { sym: R`h`, name: "约化哈勃常数", def: R`$H_0=100h\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$，$h\simeq0.7$`, unit: "无量纲" },

  // ---------- 分布函数与 Boltzmann 方程 ----------
  { sym: R`n`, name: "数密度", en: "number density", def: R`$n_s$：物种 $s$ 的数密度；下标 1–4 指反应 $1+2\leftrightarrow3+4$ 中的四种粒子（见表 4.1）`, unit: R`长度$^{-3}$`, eq: "4.4" },
  { id: "n0", sym: R`n`, name: "零化学势（平衡）数密度", en: "equilibrium number density", def: R`$n_s^{(0)}\equiv g_s\int\frac{d^3p}{(2\pi)^3}e^{-E_s/T}$：同温度、$\mu_s=0$ 时的数密度；非相对论 $g_s(m_sT/2\pi)^{3/2}e^{-m_s/T}$，相对论 $g_sT^3/\pi^2$；于是 $e^{\mu_s/T}=n_s/n_s^{(0)}$`, unit: R`长度$^{-3}$`, eq: "4.5" },
  { sym: R`f`, name: "相空间分布函数", en: "distribution function", def: R`$f_i=f_i(p_i,t)$：动量为 $p_i$ 的相空间单元中第 $i$ 种粒子的平均数目；动力学平衡且 $T\ll E-\mu$ 时 $f\to e^{\mu/T}e^{-E/T}$`, unit: "无量纲", eq: "4.2" },
  { sym: R`p`, name: "动量（大小）", en: "momentum", def: R`$p_i=|\boldsymbol p_i|$；$d^3p_i$ 为动量空间体元。在下标中 $p$ 则代表质子（如 $n_p$、$m_p$）`, unit: "能量" },
  { sym: R`\boldsymbol p`, name: "动量矢量", def: R`第 $i$ 种粒子的三维动量 $\boldsymbol p_i$；$\delta_{\rm D}^{(3)}$ 保证三动量守恒`, unit: "能量", eq: "4.1" },
  { sym: R`E`, name: "能量", en: "energy", def: R`$E_i=E_i(p_i)=\sqrt{p_i^2+m_i^2}$；非相对论时 $E_i\simeq m_i+p^2/2m_i$`, unit: "能量" },
  { sym: R`\delta_{\rm D}`, name: R`狄拉克 $\delta_{\rm D}$ 函数`, en: "Dirac delta", def: R`$\delta_{\rm D}^{(3)}$ 保证三动量守恒、$\delta_{\rm D}^{(1)}$ 保证能量守恒（上标为维数）`, eq: "4.1" },
  { sym: R`\mathcal M`, name: "散射振幅", en: "scattering amplitude", def: R`反应 $1+2\leftrightarrow3+4$ 的不变振幅；$|\mathcal M|^2$ 由粒子物理决定（如习题 4.4：$|\mathcal M|^2=32G_{\rm F}^2(1+3g_A^2)m_p^2p_\nu p_e$）`, eq: "4.1" },
  { sym: R`\mu`, name: "化学势", en: "chemical potential", def: R`$\mu_s$：动力学平衡下分布 $f=e^{(\mu-E)/T}$ 中的唯一"自由度"之一；化学平衡要求 $\mu_1+\mu_2=\mu_3+\mu_4$`, unit: "能量", eq: "4.2" },
  { sym: R`T`, name: "温度", en: "temperature", def: R`光子（等离子体）温度，取 $k_{\rm B}=1$ 以能量计；大体 $T\propto a^{-1}$，但粒子湮灭会使其下降变慢`, unit: "能量" },
  { sym: R`T_0`, name: "今天的 CMB 温度", def: R`$T_0=2.725\,\mathrm K=2.35\times10^{-4}\,\mathrm{eV}$；$T_0^3=1685\,\mathrm{cm^{-3}}$（自然单位）`, unit: "能量", eq: "4.54" },
  { sym: R`T_1`, name: "冻结完成后某时刻的温度", def: R`与 $a_1$ 对应的光子温度`, unit: "能量", eq: "4.54" },
  { sym: R`T_{\rm nuc}`, name: "核合成温度", en: "nucleosynthesis temperature", def: R`氘的平衡丰度升到 $\mathcal O(1)$、轻元素开始大量生成的温度，由 \eqref{4.29} 估计为 $\sim0.07\,\mathrm{MeV}$`, unit: "能量", eq: "4.29" },
  { sym: R`T_{\rm dm}`, name: "暗物质（动力学）温度", def: R`脱耦后的非相对论粒子 $T_{\rm dm}\propto a^{-2}\propto T^2$（习题 4.10）`, unit: "能量" },
  { sym: R`g`, name: "简并度", en: "degeneracy", def: R`$g_s$：物种 $s$ 的内部自由度（自旋态）数，如 $g_\gamma=2$，电子 $g_{e^-}=2$，三代中微子+反中微子 $g_\nu=6$，D 为 3，$p$、$n$ 各为 2`, unit: "无量纲", eq: "4.4" },
  { sym: R`g_*`, name: "有效相对论自由度数", en: "effective relativistic degrees of freedom", def: R`$\rho=g_*\frac{\pi^2}{30}T^4$，$g_*=\sum_{\rm bosons}g_s+\frac78\sum_{\rm fermions}g_s$（只计相对论物种）；$T\sim1\,\mathrm{MeV}$ 时 10.75，e$^\pm$ 湮灭后 3.36，$T\gtrsim100\,\mathrm{GeV}$ 时约 100`, unit: "无量纲", eq: "4.25" },
  { sym: R`g_{*s}`, name: "熵的有效自由度数", def: R`$s=\frac{2\pi^2}{45}g_{*s}T^3$；与 $g_*$ 的区别在于退耦粒子按 $(T_i/T)^3$ 而非 $(T_i/T)^4$ 加权，今天 $g_{*s}=3.91$（$g_*=3.36$）`, unit: "无量纲" },
  { sym: R`\mathcal P`, name: "压强", en: "pressure", def: R`相对论气体 $\mathcal P=\rho/3$；熵密度 $s=(\rho+\mathcal P)/T$`, unit: R`能量$^4$` },
  { sym: R`\rho`, name: "能量密度", en: "energy density", def: R`辐射主导时 $\rho=g_*\pi^2T^4/30$`, unit: R`能量$^4$`, eq: "4.25" },
  { sym: R`\rho_{\rm cr}`, name: "临界密度", en: "critical density", def: R`$\rho_{\rm cr}=3H_0^2/8\pi G=1.879\times10^{-29}h^2\,\mathrm{g\,cm^{-3}}=1.054\times10^{-5}h^2\,\mathrm{GeV\,cm^{-3}}$`, unit: R`质量/体积`, eq: "4.55" },
  { sym: R`\sigma`, name: "截面", en: "cross section", def: R`反应截面；$\langle\sigma v\rangle$ 为热平均截面 $\times$ 相对速度（\eqref{4.7}）`, unit: "面积", eq: "4.7" },
  { sym: R`v`, name: "相对速度", en: "relative velocity", def: R`在 $\langle\sigma v\rangle$ 中与截面相乘、按热分布平均；习题 4.10 中为暗物质粒子的热速度`, unit: R`无量纲（以 $c$ 为单位）`, eq: "4.7" },

  // ---------- 粒子标记 ----------
  { id: "proton", sym: R`p`, name: "质子", en: "proton", def: R`$m_p=938.27\,\mathrm{MeV}$；即氢原子核 $^1$H`, eq: "4.12" },
  { id: "neutron", sym: R`n`, name: "中子", en: "neutron", def: R`$m_n=939.57\,\mathrm{MeV}$；自由中子寿命 $\tau_n=885.7\,\mathrm s$`, eq: "4.12" },
  { id: "electron", sym: R`e`, name: "电子 / 正电子", en: "electron / positron", def: R`$e^-$ 电子、$e^+$ 正电子，$m_e=0.511\,\mathrm{MeV}$`, eq: "4.12" },
  { sym: R`\nu`, name: "中微子", en: "neutrino", def: R`作下标时也表示中微子（$g_\nu$、$p_\nu$）；$\nu_e$ 为电子中微子；BBN 前（$T$ 略高于 1 MeV）已脱耦`, eq: "4.12" },
  { sym: R`\bar\nu`, name: "反中微子", en: "antineutrino", def: R`中微子的反粒子`, eq: "4.12" },
  { sym: R`\gamma`, name: "光子", en: "photon", def: R`作下标时表示光子：$n_\gamma$、$g_\gamma=2$` },
  { sym: R`X`, name: "重的稳定粒子（WIMP）", en: "heavy stable particle", def: R`§4.4 中一般的弱相互作用大质量粒子；作下标时（$n_X$、$m_X$、$\Omega_X$）指该粒子`, eq: "4.45" },
  { sym: R`\psi`, name: "轻的标准模型粒子", def: R`$X$ 湮灭产生的（近似无质量的）粒子，处于完全（化学+动力学）平衡，$n_\psi=n_\psi^{(0)}$`, eq: "4.45" },

  // ---------- 数密度与丰度 ----------
  { sym: R`n_\gamma`, name: "光子数密度", def: R`玻尔兹曼近似 $n_\gamma^{(0)}=2T^3/\pi^2$；精确值 $2\zeta(3)T^3/\pi^2$，今天 $411\,\mathrm{cm^{-3}}$`, unit: R`长度$^{-3}$`, eq: "4.10" },
  { sym: R`n_{\rm b}`, name: "重子数密度", en: "baryon number density", def: R`$n_{\rm b}=\rho_{\rm cr}\Omega_{\rm b}a^{-3}/m_p=1.12\times10^{-5}\,\Omega_{\rm b}h^2a^{-3}\,\mathrm{cm^{-3}}$；忽略氦时等于氢核总数 $n_p+n_{\rm H}$`, unit: R`长度$^{-3}$`, eq: "4.10" },
  { sym: R`n_n`, name: "中子数密度", def: R`自由中子的数密度`, unit: R`长度$^{-3}$`, eq: "4.13" },
  { sym: R`n_p`, name: "（自由）质子数密度", def: R`§4.2 中为自由质子；§4.3 中为未与电子结合的自由质子`, unit: R`长度$^{-3}$`, eq: "4.13" },
  { sym: R`n_e`, name: "自由电子数密度", def: R`电中性要求 $n_e=n_p$；$n_e=X_en_{\rm b}$`, unit: R`长度$^{-3}$`, eq: "4.32" },
  { sym: R`n_{\rm H}`, name: "中性氢数密度", def: R`已结合成氢原子的数密度；习题 4.7 中可取 $n_{\rm H}=n_{\rm b}(1-X_e)$`, unit: R`长度$^{-3}$`, eq: "4.32" },
  { sym: R`n_{\rm D}`, name: "氘核数密度", def: R`氘核 D = $^2$H（一个质子 + 一个中子）`, unit: R`长度$^{-3}$`, eq: "4.13" },
  { sym: R`n_X`, name: "WIMP 数密度", def: R`重粒子 $X$ 的数密度，本节唯一的未知函数`, unit: R`长度$^{-3}$`, eq: "4.45" },
  { sym: R`n_l`, name: "轻子数密度", def: R`与中子–质子转化有关的轻子（$\nu_e$、$e^\pm$），处于完全平衡 $n_l=n_l^{(0)}$`, unit: R`长度$^{-3}$`, eq: "4.21" },
  { sym: R`\eta_{\rm b}`, name: "重子–光子比", en: "baryon-to-photon ratio", def: R`$\eta_{\rm b}\equiv n_{\rm b}/n_\gamma=6.0\times10^{-10}(\Omega_{\rm b}h^2/0.022)$；膨胀中保持不变（e$^\pm$ 湮灭之后）`, unit: "无量纲", eq: "4.10" },
  { sym: R`\Omega`, name: "密度参数", def: R`$\Omega_s=\rho_s(t_0)/\rho_{\rm cr}$`, unit: "无量纲" },
  { sym: R`\Omega_{\rm b}`, name: "重子密度参数", def: R`$\Omega_{\rm b}h^2\simeq0.022$`, unit: "无量纲", eq: "4.10" },
  { sym: R`\Omega_{\rm m}`, name: "物质密度参数", def: R`$\Omega_{\rm m}h^2\simeq0.14$`, unit: "无量纲", eq: "4.43" },
  { sym: R`\Omega_{\rm c}`, name: "冷暗物质密度参数", def: R`$\Omega_{\rm c}\simeq0.26$，$\Omega_{\rm c}h^2\simeq0.12$`, unit: "无量纲" },
  { sym: R`\Omega_X`, name: "WIMP 遗迹密度参数", en: "relic density", def: R`$\Omega_X=\rho_{X,0}/\rho_{\rm cr}$；要充当全部暗物质需 $\Omega_Xh^2\simeq0.1$–$0.12$`, unit: "无量纲", eq: "4.55" },
  { sym: R`\rho_{X,0}`, name: "今天的 WIMP 能量密度", def: R`$\rho_{X,0}=m_XY_\infty T_0^3(a_1T_1/a_0T_0)^3\simeq m_XY_\infty T_0^3/30$`, unit: R`质量/体积`, eq: "4.54" },

  // ---------- 质量、能量 ----------
  { sym: R`m`, name: "质量", en: "mass", def: R`$m_s$ 为物种 $s$ 的质量；下标 $p,n,e$ 分别为质子、中子、电子` },
  { id: "mnuc", sym: R`m`, name: "核子质量", def: R`习题 4.4 中 $\pi/4m^2$ 的 $m$：核子质量 $m\simeq m_p\simeq m_n$`, unit: "能量", eq: "4.58" },
  { sym: R`m_p`, name: "质子质量", def: R`$m_p=938.27\,\mathrm{MeV}$`, unit: "能量" },
  { sym: R`m_n`, name: "中子质量", def: R`$m_n=939.57\,\mathrm{MeV}$`, unit: "能量" },
  { sym: R`m_e`, name: "电子质量", def: R`$m_e=0.511\,\mathrm{MeV}$`, unit: "能量" },
  { sym: R`m_{\rm D}`, name: "氘核质量", def: R`$m_{\rm D}=1875.62\,\mathrm{MeV}$，比 $m_n+m_p=1877.84\,\mathrm{MeV}$ 少 $B_{\rm D}$`, unit: "能量", eq: "4.14" },
  { sym: R`m_{\rm N}`, name: "原子核质量", def: R`由 $Z$ 个质子、$A-Z$ 个中子组成的原子核的质量`, unit: "能量", eq: "4.11" },
  { sym: R`m_{\rm H}`, name: "氢原子质量", def: R`$m_{\rm H}=m_e+m_p-\epsilon_0$`, unit: "能量", eq: "4.34" },
  { sym: R`m_X`, name: "WIMP 质量", def: R`典型取 $\gtrsim100\,\mathrm{GeV}$；设定冻结时的温度尺度`, unit: "能量", eq: "4.48" },
  { sym: R`\mathcal Q`, name: "中子–质子质量差", def: R`$\mathcal Q\equiv m_n-m_p=1.293\,\mathrm{MeV}$`, unit: "能量", eq: "4.18" },
  { sym: R`B`, name: "结合能", en: "binding energy", def: R`原子核的结合能（氦比氘大，因子 $e^{B/T}$ 偏向生成氦）`, unit: "能量", eq: "4.11" },
  { sym: R`B_{\rm N}`, name: "原子核结合能", def: R`$B_{\rm N}\equiv Zm_p+(A-Z)m_n-m_{\rm N}$；轻核在 MeV 量级`, unit: "能量", eq: "4.11" },
  { sym: R`B_{\rm D}`, name: "氘结合能", def: R`$B_{\rm D}=m_n+m_p-m_{\rm D}=2.22\,\mathrm{MeV}$`, unit: "能量", eq: "4.15" },
  { sym: R`Z`, name: "原子序数", en: "atomic number", def: R`核内质子数（即核电荷数），决定元素`, unit: "无量纲", eq: "4.11" },
  { sym: R`A`, name: "质量数", en: "mass number", def: R`核内中子与质子总数；同 $Z$ 不同 $A$ 的核互为同位素`, unit: "无量纲", eq: "4.11" },
  { sym: R`\epsilon_0`, name: "氢的电离能", en: "hydrogen binding energy", def: R`$\epsilon_0=m_e+m_p-m_{\rm H}=13.6\,\mathrm{eV}$`, unit: "能量", eq: "4.34" },

  // ---------- §4.2 BBN ----------
  { sym: R`X_n`, name: "中子丰度（中子比例）", en: "neutron fraction", def: R`$X_n\equiv n_n/(n_n+n_p)$；冻结值约 0.15，核合成开始时约 0.11`, unit: "无量纲", eq: "4.19" },
  { sym: R`X_{n,\rm EQ}`, name: "平衡中子丰度", def: R`$X_{n,\rm EQ}=1/(1+e^{\mathcal Q/T})$`, unit: "无量纲", eq: "4.20" },
  { sym: R`\lambda_{np}`, name: R`中子→质子转化率`, en: "neutron-to-proton conversion rate", def: R`$\lambda_{np}=n_l^{(0)}\langle\sigma v\rangle$；习题 4.4 给出 $\lambda_{np}=\frac{255}{\tau_nx^5}(12+6x+x^2)$，$x=1$ 时 5.5 s$^{-1}$；低温时 $\propto T^3$`, unit: R`时间$^{-1}$`, eq: "4.22" },
  { sym: R`x`, name: R`无量纲时间变量 $x=\mathcal Q/T$`, def: R`§4.2 中 $x\equiv\mathcal Q/T$（\eqref{4.23}），随时间增大；§4.4 中则改记为 $x\equiv m_X/T$（见对应条目）`, unit: "无量纲", eq: "4.23" },
  { sym: R`u`, name: "积分变量（高斯积分）", def: R`本推导中的积分变量：§4.1 低温极限的推导用 $\int_0^\infty u^2e^{-u^2}du=\sqrt\pi/4$，其中 $u=p/\sqrt{2m_sT}$`, unit: "无量纲" },
  { sym: R`q`, name: "无量纲动量（习题 4.2）", def: R`本推导中的积分变量 $q\equiv p/T$`, unit: "无量纲" },
  { sym: R`y`, name: "电子质量与温度之比（习题 4.2）", def: R`$y\equiv m_e/T$：$y\ll1$ 时 $e^\pm$ 相对论，$\rho_{e^\pm}/\rho_\gamma\to1.75$；$y\gg1$ 时被玻尔兹曼因子 $e^{-y}$ 压低`, unit: "无量纲" },
  { id: "muon", sym: R`\mu`, name: R`$\mu$ 子`, en: "muon", def: R`第二代带电轻子 $\mu^\pm$，$m_\mu=105.7\,\mathrm{MeV}$（习题 4.9 的相对论自由度计数）` },
  { sym: R`\tau`, name: R`$\tau$ 子`, en: "tau lepton", def: R`第三代带电轻子 $\tau^\pm$，$m_\tau=1.777\,\mathrm{GeV}$（习题 4.9 的相对论自由度计数）` },
  { id: "xm", sym: R`x`, name: R`无量纲时间变量 $x=m_X/T$`, def: R`$x\equiv m_X/T$（\eqref{4.48}）；$x\ll1$ 时 $X$ 相对论、$Y\simeq Y_{\rm EQ}$；冻结约在 $x_f\simeq20$；$dx/dt=Hx$`, unit: "无量纲", eq: "4.48" },
  { id: "xe", sym: R`x`, name: R`无量纲时间变量 $x=\epsilon_0/T$`, def: R`习题 4.7 中 $x\equiv\epsilon_0/T$；复合约在 $x\approx40$–$55$`, unit: "无量纲" },
  { id: "xint", sym: R`x`, name: "积分变量", def: R`\eqref{4.59} 中 $x$ 为以 $m_e$ 为单位的电子能量；推导中也用 $x=p/T$ 等`, unit: "无量纲", eq: "4.59" },
  { sym: R`x_f`, name: R`冻结时刻的 $x$`, en: "freeze-out", def: R`$x_f=m_X/T_f$；数量级估计 $x_f\simeq20$，更精确可由 $n^{(0)}(x_f)\langle\sigma v\rangle=H(x_f)$ 求（习题 4.8）`, unit: "无量纲", eq: "4.52" },
  { sym: R`\tau_n`, name: "中子寿命", en: "neutron lifetime", def: R`$\tau_n=(885.7\pm0.8)\,\mathrm s$；衰变把中子丰度乘以 $e^{-t/\tau_n}$`, unit: "时间", eq: "4.60" },
  { sym: R`Y_P`, name: "原初氦质量分数", en: "primordial helium mass fraction", def: R`$Y_P\equiv4n({}^4{\rm He})/n_{\rm b}=2X_n(T_{\rm nuc})\approx0.22$–$0.25$`, unit: "无量纲", eq: "4.30" },

  // ---------- §4.3 复合 ----------
  { sym: R`X_e`, name: "自由电子比例", en: "free electron fraction", def: R`$X_e\equiv n_e/(n_e+n_{\rm H})=n_p/(n_p+n_{\rm H})$；复合前 $\approx1$，复合后冻结在 $\sim10^{-4}$–$10^{-3}$`, unit: "无量纲", eq: "4.33" },
  { sym: R`\beta`, name: "电离率", en: "ionization rate", def: R`$\beta\equiv\langle\sigma v\rangle(m_eT/2\pi)^{3/2}e^{-\epsilon_0/T}$：一个中性原子单位时间被电离的概率`, unit: R`时间$^{-1}$`, eq: "4.37" },
  { id: "alpha2", sym: R`\alpha`, name: "复合系数（到激发态）", en: "case-B recombination coefficient", def: R`$\alpha^{(2)}\equiv\langle\sigma v\rangle$，只计复合到 $n\ge2$ 能级（到基态的复合放出的光子立即再电离邻近原子，净效果为零）；近似 $\alpha^{(2)}=9.78\frac{\alpha^2}{m_e^2}(\epsilon_0/T)^{1/2}\ln(\epsilon_0/T)$`, unit: R`体积/时间`, eq: "4.38" },
  { id: "beta2", sym: R`\beta`, name: R`从 $n=2$ 能级的电离率`, def: R`$\beta^{(2)}=\beta\,e^{3\epsilon_0/4T}$：处于 $n=2$ 激发态（结合能 $\epsilon_0/4$）的原子被电离的速率`, unit: R`时间$^{-1}$`, eq: "4.62" },
  { sym: R`C`, name: "Peebles 修正因子", en: "Peebles correction factor", def: R`$C=\frac{\Lambda_\alpha+\Lambda_{2\gamma}}{\Lambda_\alpha+\Lambda_{2\gamma}+\beta^{(2)}}$：处于 $n=2$ 的原子最终落到基态（而不是被再电离）的概率`, unit: "无量纲", eq: "4.62" },
  { sym: R`\Lambda_\alpha`, name: R`Lyman $\alpha$ 逃逸率`, def: R`$\Lambda_\alpha=H(3\epsilon_0)^3/[n_{\rm H}(8\pi)^2]$：膨胀把 Ly$\alpha$ 光子红移出共振线的速率`, unit: R`时间$^{-1}$`, eq: "4.63" },
  { sym: R`\Lambda_{2\gamma}`, name: "双光子衰变率", def: R`$2s\to1s$ 双光子衰变率 $\Lambda_{2\gamma}=8.227\,\mathrm{s^{-1}}$`, unit: R`时间$^{-1}$`, eq: "4.62" },

  // ---------- §4.4 暗物质 ----------
  { sym: R`Y`, name: "WIMP 共动丰度", def: R`$Y\equiv n_X/T^3$：若 $T\propto a^{-1}$，则 $Y$ 正比于共动体积内的 $X$ 粒子数`, unit: "无量纲", eq: "4.46" },
  { sym: R`Y_{\rm EQ}`, name: "平衡丰度", def: R`$Y_{\rm EQ}\equiv n_X^{(0)}/T^3$；$x\ll1$ 时 $\sim1$，$x\gg1$ 时 $\propto x^{3/2}e^{-x}$`, unit: "无量纲", eq: "4.47" },
  { sym: R`Y_\infty`, name: "冻结后的渐近丰度", def: R`$Y_\infty\equiv Y(x=\infty)\simeq x_f/\lambda$`, unit: "无量纲", eq: "4.52" },
  { sym: R`Y_f`, name: "冻结时的丰度", def: R`$Y_f=Y(x_f)$，通常 $\gg Y_\infty$`, unit: "无量纲", eq: "4.52" },
  { sym: R`\lambda`, name: "湮灭率/膨胀率之比", def: R`$\lambda\equiv m_X^3\langle\sigma v\rangle/H(m_X)$；典型 WIMP 的 $\lambda\sim10^{11}$`, unit: "无量纲", eq: "4.50" },
  { sym: R`\lambda_0`, name: "中子衰变相空间积分", def: R`$\lambda_0\equiv\int_1^{\mathcal Q/m_e}dx\,x(x-\mathcal Q/m_e)^2(x^2-1)^{1/2}=1.636$`, unit: "无量纲", eq: "4.59" },
  { sym: R`s`, name: "熵密度 / 物种标记", en: "entropy density", def: R`作为物理量：熵密度 $s=(\rho+\mathcal P)/T$，按 $a^{-3}$ 标度（\eqref{2.70}），今天 $n_{\rm b}/s\sim10^{-10}$；作下标（$n_s$、$g_s$、$m_s$）时为物种标记`, unit: R`长度$^{-3}$` },
  { sym: R`i`, name: "粒子编号", def: R`$i=1,2,3,4$ 标记反应 $1+2\leftrightarrow3+4$ 中的粒子` },
  { sym: R`\Gamma`, name: R`单粒子反应率 / $\Gamma$ 函数`, en: "interaction rate", def: R`$\Gamma\equiv n_2\langle\sigma v\rangle$：单个粒子 1 每单位时间发生反应的次数，与 $H$ 比较决定平衡还是冻结；在 $\Gamma(3)=2$ 这类写法中为 $\Gamma$ 函数 $\Gamma(n)=(n-1)!$`, unit: R`时间$^{-1}$` },
  { sym: R`\zeta`, name: R`黎曼 $\zeta$ 函数`, en: "Riemann zeta function", def: R`$\zeta(3)=1.202$；光子精确数密度 $n_\gamma=2\zeta(3)T^3/\pi^2$`, unit: "无量纲" },
  { sym: R`\Delta`, name: "差 / 步长", def: R`$\Delta m\equiv m_n-m_p=\mathcal Q$（图 4.2 原图记号）；$\Delta x$ 为数值积分步长` },
  { sym: R`\Lambda`, name: "宇宙学常数", def: R`$\Lambda$CDM 中的宇宙学常数（暗能量）；带下标的 $\Lambda_\alpha$、$\Lambda_{2\gamma}$ 见各自条目` },
  { sym: R`c`, name: "光速", def: R`$c=2.998\times10^{10}\,\mathrm{cm\,s^{-1}}$；自然单位取 $c=1$，换回 cgs 时 $1\,\mathrm{GeV^{-2}}\to(\hbar c)^2c=1.17\times10^{-17}\,\mathrm{cm^3s^{-1}}$` },
  { sym: R`\hbar`, name: "约化普朗克常数", def: R`$\hbar=6.582\times10^{-22}\,\mathrm{MeV\,s}$，$\hbar c=1.973\times10^{-5}\,\mathrm{eV\,cm}$；自然单位取 $\hbar=1$` },
  { sym: R`k_{\rm B}`, name: "玻尔兹曼常数", def: R`取 $k_{\rm B}=1$：$1\,\mathrm{eV}=11605\,\mathrm K$` },
  { sym: R`\mathcal O`, name: "量级记号", def: R`$\mathcal O(1)$ 表示"1 的量级"` },
  { sym: R`W`, name: "W 玻色子", def: R`弱相互作用的带电规范玻色子，$m_W\simeq80\,\mathrm{GeV}$` },
];
