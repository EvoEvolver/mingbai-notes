// 第 7 章符号词典（决定公式中符号的可点击性）。
// 规则：sym 只写符号本身；「基底+下标」先精确匹配，否则回退到只有基底的通用条目。本章条目优先于他章同名条目。
// 同一字母多义时，在公式中用 \sym{ch07-<id>}{…} 指定（见带 id 的条目）。
// 核心条目在本文件；各节补充条目在 _ch07_nt_*.jsx（NT 数组），在此合并去重（核心优先）。
import { NT as NT1 } from "./_ch07_nt_s1.jsx";
import { NT as NT3 } from "./_ch07_nt_s3.jsx";
import { NT as NT4 } from "./_ch07_nt_s4.jsx";
import { NT as NT5 } from "./_ch07_nt_s5.jsx";
import { NT as NTE } from "./_ch07_nt_ex.jsx";

const R = String.raw;

const CORE = [
  // ---------- 时间、坐标、视界 ----------
  { sym: R`t`, name: "宇宙时", en: "cosmic time", def: R`共动观测者的固有时；带点的量 $\dot X\equiv\partial X/\partial t$。谐振子一节中 $t$ 是振子的时间`, unit: "时间" },
  { sym: R`\eta`, name: "共形时间 / 共动视界", en: "conformal time", def: R`$d\eta=dt/a$。\secref{7.1} 中 $\eta(a)$ 是从 $t=0$ 起算的共动视界 \eqref{7.3}；此后按 \eqref{7.5} 重新定义，使 $\eta=0$ 对应暴胀结束，暴胀期间 $\eta<0$ 且 $\eta\simeq-1/(aH)$ \eqref{7.16}。撇号 $X'\equiv\partial X/\partial\eta$`, unit: R`共动长度（$c=1$）`, eq: "7.5" },
  { sym: R`\eta_*`, name: "复合时的共动视界", def: R`$\eta_*=\eta(a_*)\approx281\,\mathrm{Mpc}$（只含物质与辐射、一直追溯到 $t=0$ 时；原书误印为 $h^{-1}\,\mathrm{Mpc}$，见 §7.1 勘误）`, unit: "共动长度", eq: "7.2" },
  { sym: R`\eta_0`, name: "今天的共动视界", def: R`$\eta_0\approx14200\,\mathrm{Mpc}$，约为 $\eta_*$ 的 50 倍`, unit: "共动长度", eq: "7.2" },
  { sym: R`\eta_i`, name: "初始时刻", def: R`设定初始条件的某个很早的共形时间（$k\eta_i\ll1$）`, unit: "共动长度", eq: "7.90" },
  { sym: R`a`, name: "标度因子", en: "scale factor", def: R`今天 $a_0=1$；物理距离 $=a\times$ 共动距离`, unit: "无量纲" },
  { sym: R`a_e`, name: "暴胀结束时的标度因子", def: R`$t=t_e$ 时的 $a$；暴胀中 $a(t)=a_ee^{H_{\rm inf}(t-t_e)}$ \eqref{7.4}`, unit: "无量纲", eq: "7.4" },
  { sym: R`a_0`, name: "今天的标度因子", def: R`$a_0=1$`, unit: "无量纲" },
  { sym: R`a_*`, name: "复合时的标度因子", def: R`最后散射时刻，$a_*\approx1/1100$`, unit: "无量纲" },
  { sym: R`a'`, name: "标度因子对 η 的导数", def: R`$a'=da/d\eta=a^2H$；暴胀期间 $a'\simeq-a/\eta$，$a''/a\simeq2/\eta^2$ \eqref{7.38}；辐射期 $a\propto\eta$，$a'/a=1/\eta$`, unit: R`长度$^{-1}$` },
  { sym: R`\dot a`, name: "标度因子对 t 的导数", def: R`$\dot a=aH$；共动哈勃半径 $(aH)^{-1}=\dot a^{-1}$，所以它减小 $\Leftrightarrow\ddot a>0$（加速膨胀）`, unit: R`时间$^{-1}$` },
  { sym: R`\ddot a`, name: "标度因子的二阶导数", def: R`$\ddot a>0$ 即加速膨胀——暴胀的定义性条件`, unit: R`时间$^{-2}$` },
  { sym: R`H`, name: "哈勃率", en: "Hubble rate", def: R`$H=\dot a/a=d\ln a/dt$。暴胀期间近似为常数 $H_{\rm inf}$；$1/(aH)$ 为共动哈勃半径`, unit: R`时间$^{-1}$` },
  { sym: R`H_{\rm inf}`, name: "暴胀期间的哈勃率", def: R`慢滚暴胀时几乎不变的 $H$；张量功率谱 $P_h\propto H_{\rm inf}^2$ 直接测量它`, unit: R`时间$^{-1}$`, eq: "7.4" },
  { sym: R`H_e`, name: "暴胀结束时的哈勃率", def: R`$H_e\equiv H(t_e)$`, unit: R`时间$^{-1}$` },
  { sym: R`H_0`, name: "今天的哈勃常数", def: R`$H_0=100h\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$；$H_0^{-1}$ 为今天的（共动）哈勃半径`, unit: R`时间$^{-1}$` },
  { sym: R`H'`, name: "哈勃率对 η 的导数", def: R`$H'=-aH^2\epsilon_{\rm sr}$（\eqref{7.17}）`, unit: R`时间$^{-1}$长度$^{-1}$`, eq: "7.17" },
  { sym: R`t_e`, name: "暴胀结束时刻", def: R`宇宙时；在新的共形时间约定 \eqref{7.5} 中对应 $\eta=0$`, unit: "时间", eq: "7.4" },
  { sym: R`\chi`, name: "共动距离", en: "comoving distance", def: R`$\chi(\theta)$：最后散射面上张角 $\theta$ 的两点之间的共动距离`, unit: "共动长度", eq: "7.1" },
  { sym: R`\chi_*`, name: "到最后散射面的共动距离", def: R`$\chi_*=\eta_0-\eta_*$`, unit: "共动长度", eq: "7.1" },
  { sym: R`\theta`, name: "天空张角", def: R`CMB 天图上两块区域之间的角距离（小角近似）`, unit: "弧度", eq: "7.1" },
  { sym: R`x`, name: "共动坐标 / 振子坐标", def: R`$x^i$ 为共动空间坐标；图 7.1 中的横轴。§7.3.1 中 $x$ 是一维谐振子的位置，量子化后为算符 $\hat x$`, unit: "共动长度" },
  { sym: R`x^\mu`, name: "时空坐标", def: R`$x^0=t$，$x^i$ 为共动空间坐标；$\phi_{,\nu}\equiv\partial\phi/\partial x^\nu$`, unit: "—" },
  { sym: R`\boldsymbol x`, name: "共动位置矢量", def: R`场与扰动的空间自变量`, unit: "共动长度" },
  { sym: R`\boldsymbol k`, name: "波矢", en: "wavevector", def: R`Fourier 模式的共动波矢；每个 $\boldsymbol k$ 对应一个独立的"谐振子"`, unit: R`共动长度$^{-1}$` },
  { sym: R`k`, name: "波数", en: "wavenumber", def: R`$k=|\boldsymbol k|$。模式在 $k=aH$（暴胀中即 $k|\eta|=1$）时穿出视界；$k\eta\ll1$ 表示超视界`, unit: R`共动长度$^{-1}$` },
  { sym: R`k_i`, name: "波矢分量", def: R`Fourier 空间中 $\partial_i\to ik_i$`, unit: R`共动长度$^{-1}$` },
  { sym: R`k_{\rm p}`, name: "枢轴尺度", en: "pivot scale", def: R`定义 $\mathcal A_s$、$n_s$ 的参考波数；本书与 Planck 一致取 $k_{\rm p}=0.05\,\mathrm{Mpc}^{-1}$`, unit: R`$\mathrm{Mpc}^{-1}$`, eq: "7.99" },
  { sym: R`i`, name: "虚数单位", def: R`$i=\sqrt{-1}$；作上下标时是空间指标 1–3`, unit: "无量纲" },
  { sym: R`\mu`, name: "方向余弦 / 时空指标", def: R`光子方程中 $\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}$；作上下标时是时空指标 0–3`, unit: "无量纲" },

  // ---------- 标量场（暴胀子） ----------
  { sym: R`\phi`, name: "标量场（暴胀子）", en: "scalar field / inflaton", def: R`驱动暴胀的标量场 $\phi(\boldsymbol x,t)=\bar\phi(t)+\delta\phi(\boldsymbol x,t)$。**不要**与度规扰动 $\Phi$ 混淆。§7.2 中 $\phi(t)$ 即零阶均匀场`, unit: R`质量（$\hbar=c=1$）`, eq: "7.44" },
  { sym: R`\bar\phi`, name: "零阶（均匀）标量场", def: R`$\bar\phi(t)$，满足 $\bar\phi''+2aH\bar\phi'+a^2V_{,\phi}=0$ \eqref{7.15}；暴胀期间它就是"时钟"`, unit: "质量", eq: "7.44" },
  { sym: R`\dot\phi`, name: "场的时间导数", def: R`"速度"；$\frac12\dot\phi^2$ 是动能密度。慢滚时 $\dot\phi^2\ll V$`, unit: R`质量$^2$` },
  { sym: R`\ddot\phi`, name: "场的二阶时间导数", def: R`"加速度"；慢滚时 $|\ddot\phi|\ll|3H\dot\phi|$，$\delta_{\rm sr}=\ddot\phi/(H\dot\phi)$`, unit: R`质量$^3$` },
  { sym: R`V`, name: "标量场势", en: "potential", def: R`$V(\phi)$；例如质量为 $m$ 的自由场 $V=m^2\phi^2/2$。慢滚时势能主导，$\rho\simeq V$`, unit: R`质量$^4$`, eq: "7.6" },
  { sym: R`V_{,\phi}`, name: "势的一阶导数", def: R`$V_{,\phi}\equiv dV/d\phi$，在 $\bar\phi$ 处取值；势越陡，场滚得越快`, unit: R`质量$^3$`, eq: "7.13" },
  { sym: R`V_{,\phi\phi}`, name: "势的二阶导数", def: R`$d^2V/d\phi^2$，即场的有效质量平方；正比于慢滚参数，所以在 \eqref{7.53} 中可忽略`, unit: R`质量$^2$`, eq: "7.53" },
  { sym: R`m`, name: "标量场质量", def: R`$V=m^2\phi^2/2$ 中的质量`, unit: "质量" },
  { sym: R`\epsilon_{\rm sr}`, name: "第一慢滚参数", en: "slow-roll parameter", def: R`$\epsilon_{\rm sr}\equiv\frac{d}{dt}\frac1H=-\frac{H'}{aH^2}$ \eqref{7.17}：一个 e 倍膨胀中 $H$ 的相对变化。$\epsilon_{\rm sr}<1\Leftrightarrow$ 加速膨胀；辐射期为 2；决定 $r=16\epsilon_{\rm sr}$`, unit: "无量纲", eq: "7.17" },
  { sym: R`\delta_{\rm sr}`, name: "第二慢滚参数", def: R`$\delta_{\rm sr}\equiv\frac{1}{H}\frac{\ddot\phi}{\dot\phi}$ \eqref{7.18}：场的"加速度"与哈勃摩擦之比；$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$`, unit: "无量纲", eq: "7.18" },
  { sym: R`\delta`, name: R`扰动 / 克罗内克 $\delta$`, def: R`写在量前面表示一阶扰动（$\delta\phi$、$\delta\rho$、$\delta T^\mu{}_\nu$、$\delta P$）；带上下指标 $\delta^\alpha{}_\beta$ 时为克罗内克 $\delta$`, unit: "—" },
  { sym: R`\delta_{ij}`, name: "克罗内克 δ", def: R`$i=j$ 为 1，否则为 0`, unit: "无量纲" },
  { sym: R`\delta_{\rm D}`, name: "Dirac δ 函数", def: R`$\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')$：保证不同 Fourier 模式互不相关`, unit: R`共动长度$^3$` },

  // ---------- 能动张量与背景 ----------
  { sym: R`T`, name: "能动张量", en: "energy-momentum tensor", def: R`$T^\alpha{}_\beta$；对标量场见 \eqref{7.6}。$T^0{}_0=-\rho$，$T^i{}_i=P$（不求和）。$\delta T^\mu{}_\nu$ 为其一阶扰动。（温度另记，见 $T_0$、$T_e$）`, unit: "能量密度", eq: "7.6" },
  { id: "temp", sym: R`T`, name: "温度", def: R`光子温度，$T\propto a^{-1}$；$k_{\rm B}=1$`, unit: "能量" },
  { sym: R`T_0`, name: "今天的 CMB 温度", def: R`$T_0=2.7255\,\mathrm K\approx2.3\times10^{-4}\,\mathrm{eV}$`, unit: "能量" },
  { sym: R`T_e`, name: "暴胀结束（再加热）后的温度", def: R`数量级估计中取 $T_e=10^{14}\,\mathrm{GeV}$`, unit: "能量" },
  { sym: R`g`, name: "度规", def: R`$g_{\mu\nu}$、$g^{\mu\nu}$；背景 $g_{00}=-1$，$g_{ij}=a^2\delta_{ij}$，号差 $(-,+,+,+)$`, unit: "—" },
  { sym: R`g_{\mu\nu}`, name: "度规张量", def: R`号差 $(-,+,+,+)$；不同号差约定会改变 \eqref{7.6} 中各项的符号`, unit: "—" },
  { sym: R`\Gamma`, name: "Christoffel 符号", def: R`$\Gamma^\mu{}_{\alpha\beta}$；FLRW 中只有 $\Gamma^0{}_{ij}=\delta_{ij}a^2H$、$\Gamma^i{}_{0j}=\Gamma^i{}_{j0}=\delta_{ij}H$ 非零（\eqref{2.24}–\eqref{2.25}）`, unit: R`时间$^{-1}$` },
  { sym: R`\nabla`, name: "协变导数", def: R`$\nabla_\mu T^\mu{}_\nu=0$ 为能动量守恒`, unit: "—" },
  { sym: R`\partial`, name: "偏导数", def: R`$\partial/\partial x^\mu$；也记作 $_{,\mu}$`, unit: "—" },
  { sym: R`\rho`, name: "能量密度", en: "energy density", def: R`零阶能量密度；标量场 $\rho=\frac12\dot\phi^2+V$ \eqref{7.8}`, unit: "能量密度", eq: "7.8" },
  { sym: R`\rho_{\rm inf}`, name: "暴胀物质的能量密度", def: R`驱动暴胀的成分的能量密度，暴胀期间近似为常数（图 7.4）`, unit: "能量密度" },
  { sym: R`\rho_{\rm r}`, name: "辐射能量密度", def: R`光子 + 中微子；早期主导`, unit: "能量密度" },
  { sym: R`\rho_s`, name: "成分 s 的能量密度", def: R`$s$ 遍历光子、中微子、暗物质、重子；绝热扰动：$\delta\rho_s/\rho_s$ 对所有 $s$ 相同 \eqref{7.43}`, unit: "能量密度", eq: "7.43" },
  { sym: R`P`, name: "功率谱（泛指）", en: "power spectrum", def: R`$\langle X(\boldsymbol k)X^*(\boldsymbol k')\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')P(k)$；尺度不变谱 $k^3P(k)=$ 常数。（压强在本书第 2 版记作 $\mathcal P$）`, unit: R`共动长度$^3$`, eq: "7.98" },
  { sym: R`\mathcal P`, name: "压强", en: "pressure", def: R`本书第 2 版以 $\mathcal P$ 记零阶压强（区别于功率谱 $P$）；标量场 $\mathcal P=\frac12\dot\phi^2-V$ \eqref{7.9}。加速膨胀需要 $\rho+3\mathcal P<0$；$\delta\mathcal P$ 为压强扰动`, unit: "能量密度", eq: "7.9" },
  { sym: R`w`, name: "物态方程参数", en: "equation of state", def: R`$w=P/\rho$；慢滚标量场 $w\simeq-1$，在势的极小值附近振荡时 $w\simeq0$`, unit: "无量纲", eq: "7.10" },
  { sym: R`G`, name: "引力常数", def: R`Newton 常数；$m_{\rm Pl}^2=1/G$`, unit: R`质量$^{-2}$` },
  { sym: R`m_{\rm Pl}`, name: "Planck 质量", def: R`$m_{\rm Pl}=G^{-1/2}\approx1.22\times10^{19}\,\mathrm{GeV}$`, unit: "质量" },
  { sym: R`n`, name: "数密度", def: R`有质量粒子 $n\propto a^{-3}$；暴胀中 $\propto e^{-3H_{\rm inf}t}$，指数式稀释`, unit: R`长度$^{-3}$` },

  // ---------- 量子谐振子 ----------
  { sym: R`\omega`, name: "振子频率", def: R`$\ddot x+\omega^2x=0$；对 Fourier 模式 $\omega(k)$`, unit: R`时间$^{-1}$`, eq: "7.19" },
  { sym: R`\hat x`, name: "位置算符", def: R`$\hat x=v\hat a+v^*\hat a^\dagger$ \eqref{7.20}；对应到场 $\phi$`, unit: "—", eq: "7.20" },
  { sym: R`\hat p`, name: "动量算符", def: R`与 $\hat x$ 共轭，$[\hat x,\hat p]=i$ \eqref{7.22}`, unit: "—", eq: "7.22" },
  { sym: R`\hat a`, name: "湮灭算符", en: "annihilation operator", def: R`$\hat a|0\rangle=0$；$[\hat a,\hat a^\dagger]=1$。每个 Fourier 模式有自己的 $\hat a_{\boldsymbol k}$；$\hat a^\dagger$ 为产生算符`, unit: "无量纲", eq: "7.21" },
  { sym: R`v`, name: "模函数", en: "mode function", def: R`算符展开中 $\hat a$ 的系数：谐振子 $v=e^{-i\omega t}/\sqrt{2\omega}$ \eqref{7.23}；de Sitter 中 $v=\frac{e^{-ik\eta}}{\sqrt{2k}}\left[1-\frac{i}{k\eta}\right]$ \eqref{7.40}。$|v|^2$ 就是真空涨落的方差`, unit: R`质量$^{-1/2}$`, eq: "7.40" },
  { sym: R`p`, name: "幂指数", def: R`超视界解的试探形式 $\Phi=\eta^p$ \eqref{7.88}：$p=0$（常数模）或 $p=-3$（衰减模）`, unit: "无量纲", eq: "7.88" },

  // ---------- 张量扰动 ----------
  { sym: R`h`, name: "张量扰动（引力波）", en: "tensor perturbation", def: R`$h_+$ 或 $h_\times$ 之一，满足 $h''+2\frac{a'}ah'+k^2h=0$ \eqref{7.27}；视界外为常数`, unit: "无量纲", eq: "7.27" },
  { sym: R`h_+`, name: R`$+$ 偏振张量模`, def: R`两种引力波偏振之一（第 6 章）`, unit: "无量纲", eq: "7.27" },
  { sym: R`h_\times`, name: R`$\times$ 偏振张量模`, def: R`两种引力波偏振之一，与 $h_+$ 不相关`, unit: "无量纲", eq: "7.27" },
  { sym: R`h_{ij}`, name: "张量度规扰动", def: R`$h^{\rm TT}_{ij}$：横向无迹部分，由 $h_+$、$h_\times$ 组成（\eqref{6.49}）`, unit: "无量纲", eq: "7.101" },
  { sym: R`\mathfrak h`, name: "规范化的张量场", def: R`$\mathfrak h\equiv ah/\sqrt{16\pi G}$ \eqref{7.28}：乘 $a$ 去掉摩擦项，除 $\sqrt{16\pi G}$ 使其具有标量场的量纲`, unit: "质量", eq: "7.28" },
  { sym: R`\hat{\mathfrak h}`, name: R`$\mathfrak h$ 的量子算符`, def: R`$\hat{\mathfrak h}=v\hat a_{\boldsymbol k}+v^*\hat a^\dagger_{\boldsymbol k}$ \eqref{7.32}`, unit: "质量", eq: "7.32" },
  { sym: R`P_h`, name: "张量功率谱（单一偏振）", def: R`$P_h=16\pi G|v|^2/a^2$；视界外 $P_h=8\pi GH^2/k^3$ \eqref{7.42}，$H$ 取在 $k|\eta|=1$ 时`, unit: R`共动长度$^3$`, eq: "7.42" },
  { sym: R`\Delta`, name: "无量纲功率谱", def: R`$\Delta^2_h=\frac{k^3}{2\pi^2}P_h$ \eqref{7.36}：对数波数间隔内的方差`, unit: "无量纲", eq: "7.36" },
  { sym: R`P_{\rm T}`, name: "总张量功率谱", def: R`$P_{\rm T}=4P_h=\frac{32\pi}{k^3}\frac{H^2}{m_{\rm Pl}^2}$ \eqref{7.102}`, unit: R`共动长度$^3$`, eq: "7.102" },
  { sym: R`\mathcal A_{\rm T}`, name: "张量振幅", def: R`$P_{\rm T}=2\pi^2\mathcal A_{\rm T}k^{-3}(k/k_{\rm p})^{n_{\rm T}}$`, unit: "无量纲", eq: "7.102" },
  { sym: R`n_{\rm T}`, name: "张量谱指数", def: R`$n_{\rm T}=-2\epsilon_{\rm sr}$ \eqref{7.108}；尺度不变对应 $n_{\rm T}=0$`, unit: "无量纲", eq: "7.108" },
  { sym: R`r`, name: "张标比", en: "tensor-to-scalar ratio", def: R`$r=P_{\rm T}/P_{\mathcal R}|_{k_{\rm p}}=\mathcal A_{\rm T}/\mathcal A_s=16\epsilon_{\rm sr}$`, unit: "无量纲", eq: "7.103" },

  // ---------- 标量扰动 ----------
  { sym: R`\Phi`, name: "空间曲率扰动（牛顿规范）", def: R`共形牛顿规范 $g_{ij}=a^2\delta_{ij}(1+2\Phi)$。无各向异性应力时 $\Phi=-\Psi$；辐射期超视界常数模 $\Phi=2\Theta_{{\rm r},0}$`, unit: "无量纲" },
  { sym: R`\Psi`, name: "牛顿势", def: R`共形牛顿规范 $g_{00}=-(1+2\Psi)$；$\Psi=-\Phi$（忽略四极矩时）`, unit: "无量纲" },
  { sym: R`P_\Phi`, name: R`$\Phi$ 的功率谱`, def: R`暴胀后 $P_\Phi=\frac{8\pi G}{9k^3}\frac{H^2}{\epsilon_{\rm sr}}\big|_{aH=k}=\frac49P_{\mathcal R}$`, unit: R`共动长度$^3$`, eq: "7.62" },
  { sym: R`P_\Psi`, name: R`$\Psi$ 的功率谱`, def: R`$\Psi=-\Phi$ 故 $P_\Psi=P_\Phi$`, unit: R`共动长度$^3$`, eq: "7.62" },
  { sym: R`P_{\delta\phi}`, name: R`$\delta\phi$ 的功率谱`, def: R`$P_{\delta\phi}=H^2/(2k^3)$ \eqref{7.55}，$H$ 取在视界穿出时`, unit: R`质量$^2\times$长度$^3$`, eq: "7.55" },
  { sym: R`\mathcal R`, name: "曲率扰动", en: "curvature perturbation", def: R`规范不变量 $\mathcal R\equiv-\mathcal H+aH\mathcal V$ \eqref{7.75}；牛顿规范中为 \eqref{7.57}。单场暴胀中视界外守恒；暴胀中 $\mathcal R=-aH\delta\phi/\bar\phi'$，辐射期 $\mathcal R=-\frac32\Psi=\frac32\Phi$`, unit: "无量纲", eq: "7.57" },
  { sym: R`P_{\mathcal R}`, name: "曲率扰动功率谱", def: R`$P_{\mathcal R}=\frac{2\pi GH^2}{\epsilon_{\rm sr}k^3}\big|_{aH=k}=2\pi^2\mathcal A_sk^{-3}(k/k_{\rm p})^{n_s-1}$`, unit: R`共动长度$^3$`, eq: "7.78" },
  { sym: R`\mathcal A_s`, name: "标量振幅", def: R`$\mathcal A_s=\frac{k_{\rm p}^3}{2\pi^2}P_{\mathcal R}(k_{\rm p})\simeq2.1\times10^{-9}$`, unit: "无量纲", eq: "7.100" },
  { sym: R`n_s`, name: "标量谱指数", en: "scalar spectral index", def: R`$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$ \eqref{7.110}；$n_s=1$ 为尺度不变，观测值约 0.965（红倾斜）`, unit: "无量纲", eq: "7.110" },
  { sym: R`\mathcal H`, name: "Bardeen 曲率变量", def: R`Bardeen 的规范不变量 \eqref{6.19}（**不是**共形哈勃率）；共形牛顿规范中 $\mathcal H=-\Phi$，空间平直切片中 $\mathcal H=aHB$。等时空间曲率为 $4k^2\mathcal H/a^2$`, unit: "无量纲", eq: "7.75" },
  { sym: R`\mathcal V`, name: "Bardeen 速度变量", def: R`$\mathcal V\equiv B+\frac{ik_i}{k^2}\frac{a\,\delta T^i{}_0}{\rho+P}$ \eqref{7.73}；物质在牛顿规范中 $u_{\rm m}=ik\mathcal V$`, unit: "共动长度", eq: "7.73" },
  { sym: R`A`, name: "空间平直规范的时–时扰动", def: R`$g_{00}=-(1+2A)$ \eqref{7.72}`, unit: "无量纲", eq: "7.72" },
  { sym: R`B`, name: "空间平直规范的时–空扰动", def: R`$g_{0i}=-aB_{,i}$ \eqref{7.72}；牛顿规范中 $B=0$`, unit: "共动长度", eq: "7.72" },
  { sym: R`D`, name: "Bardeen 度规函数", def: R`\eqref{6.19} 中空间度规的迹部分；空间平直切片中 $D=0$`, unit: "无量纲" },
  { sym: R`E`, name: "Bardeen 度规函数", def: R`\eqref{6.19} 中空间度规的无迹标量部分；空间平直切片中 $E=0$`, unit: "无量纲" },

  // ---------- 早期 Einstein–Boltzmann 方程 ----------
  { sym: R`\Theta`, name: "光子温度扰动", def: R`$\Theta(k,\mu,\eta)$；早期 $k\eta\ll1$ 时只有单极矩 $\Theta_0$ 重要`, unit: "无量纲" },
  { sym: R`\Theta_0`, name: "光子温度单极矩", def: R`绝热初条件：$\Theta_0=\mathcal N_0=\Phi/2$`, unit: "无量纲", eq: "7.91" },
  { sym: R`\Theta_1`, name: "光子温度偶极矩", def: R`初始 $\Theta_1=-\frac{k}{6aH}\Phi$ \eqref{7.95}`, unit: "无量纲", eq: "7.95" },
  { sym: R`\Theta_{{\rm r},0}`, name: "辐射总单极矩", def: R`光子与中微子单极矩按能量密度加权 \eqref{6.79}；早期 $\Phi=2\Theta_{{\rm r},0}$`, unit: "无量纲", eq: "7.89" },
  { sym: R`\Theta_{{\rm r},1}`, name: "辐射总偶极矩", def: R`光子与中微子偶极矩按能量密度加权；辐射期 $ik_i\delta T^i{}_0=-4k\rho_{\rm r}\Theta_{{\rm r},1}/a$`, unit: "无量纲", eq: "7.59" },
  { sym: R`\mathcal N_0`, name: "中微子温度单极矩", def: R`绝热：$\mathcal N_0=\Theta_0$`, unit: "无量纲", eq: "7.90" },
  { sym: R`\mathcal N_1`, name: "中微子温度偶极矩", def: R`初始与 $\Theta_1$ 相等 \eqref{7.95}`, unit: "无量纲", eq: "7.95" },
  { sym: R`\delta_{\rm c}`, name: "暗物质过密度", def: R`绝热初条件 $\delta_{\rm c}=3\Theta_0=\frac32\Phi$`, unit: "无量纲", eq: "7.94" },
  { sym: R`\delta_{\rm b}`, name: "重子过密度", def: R`绝热：$\delta_{\rm b}=\delta_{\rm c}$`, unit: "无量纲", eq: "7.94" },
  { sym: R`u_{\rm b}`, name: "重子速度", def: R`Fourier 空间速度势；初始 $u_{\rm b}=-3i\Theta_1$`, unit: "无量纲", eq: "7.95" },
  { sym: R`u_{\rm c}`, name: "暗物质速度", def: R`初始 $u_{\rm c}=u_{\rm b}$`, unit: "无量纲", eq: "7.95" },
  { sym: R`\tau`, name: "光深", def: R`$\tau'=-n_e\sigma_{\rm T}a$（第 5 章）`, unit: "无量纲" },
  { sym: R`\Pi`, name: "四极 + 偏振源项", def: R`$\Pi=\Theta_2+\Theta_{P,2}+\Theta_{P,0}$（\eqref{5.68}）`, unit: "无量纲" },
  { sym: R`\mathcal P_2`, name: "二阶 Legendre 多项式", def: R`$\mathcal P_2(\mu)=(3\mu^2-1)/2$`, unit: "无量纲" },
  { sym: R`n_{\rm c}`, name: "暗物质数密度", def: R`$n_{\rm c}=\bar n_{\rm c}(1+\delta_{\rm c})$`, unit: R`长度$^{-3}$`, eq: "7.93" },
  { sym: R`n_\gamma`, name: "光子数密度", def: R`$n_\gamma\propto T^3$，所以 $n_\gamma=\bar n_\gamma(1+3\Theta_0)$`, unit: R`长度$^{-3}$`, eq: "7.93" },
  { sym: R`\bar n_{\rm c}`, name: "暗物质零阶数密度", def: R`$\propto a^{-3}$`, unit: R`长度$^{-3}$`, eq: "7.93" },
  { sym: R`\bar n_\gamma`, name: "光子零阶数密度", def: R`$\propto a^{-3}$；$\bar n_{\rm c}/\bar n_\gamma$ 在时空中都是常数`, unit: R`长度$^{-3}$`, eq: "7.93" },
  // ---------- 通用记号（正文与习题中零星出现）----------
  { sym: R`l`, name: "多极阶数", def: R`Legendre 多极矩的阶 $l=0,1,2,\dots$（$\Theta_l$、$\mathcal N_l$）；早期 $k\eta\ll1$ 时 $l\geq1$ 的矩可忽略`, unit: "无量纲" },
  { sym: R`s`, name: "成分标记", def: R`$\rho_s$ 中的 $s$ 遍历光子、中微子、暗物质、重子等成分`, unit: "—" },
  { sym: R`X`, name: "任意量", def: R`泛指某个物理量或算符（如 $\dot X\equiv\partial X/\partial t$，$\langle\hat X\rangle$ 为真空期望值）`, unit: "—" },
  { sym: R`\hat X`, name: "任意算符", def: R`$\langle\hat X\rangle\equiv\langle0|\hat X|0\rangle$：真空期望值；后续章节同一记号表示系综平均`, unit: "—" },
  { sym: R`\dot X`, name: "对宇宙时的导数", def: R`$\dot X\equiv\partial X/\partial t$；撇号 $X'$ 表示对共形时间的导数`, unit: "—" },
  { sym: R`\hbar`, name: "约化 Planck 常数", def: R`本书取 $\hbar=c=k_{\rm B}=1$`, unit: "—" },
  { sym: R`c`, name: "光速", def: R`取 $c=1$`, unit: "—" },
  { sym: R`\nu`, name: "时空指标 / 中微子", def: R`作上下标时为时空指标 0–3；下标 $\nu$ 也表示中微子（$\rho_\nu$、$T_\nu$）`, unit: "—" },
  { sym: R`\alpha`, name: "时空指标", def: R`$T^\alpha{}_\beta$ 等中的指标，取 0–3`, unit: "—" },
  { sym: R`\beta`, name: "时空指标", def: R`$T^\alpha{}_\beta$ 等中的指标，取 0–3`, unit: "—" },
  { sym: R`j`, name: "空间指标", def: R`取 1–3；$\delta T^i{}_j$`, unit: "—" },
  { sym: R`\mathcal O`, name: "量级记号", def: R`$\mathcal O(x)$：与 $x$ 同量级的项`, unit: "—" },
  { sym: R`z`, name: "红移 / 坐标", def: R`红移 $1+z=1/a$；图 7.1 中 $y,z$ 也指被略去的两个空间方向`, unit: "无量纲" },
  { sym: R`z_*`, name: "复合红移", def: R`$z_*\approx1090$，$a_*=1/(1+z_*)$`, unit: "无量纲" },
  { sym: R`y`, name: "空间坐标", def: R`图 7.1 中被略去的空间方向之一`, unit: "共动长度" },
  { sym: R`u`, name: "流体速度", def: R`Fourier 空间中的速度（势）；$u_{\rm b}$、$u_{\rm c}$、$u_{\rm m}$ 分别为重子、暗物质、物质`, unit: "无量纲" },
  { sym: R`\sigma`, name: "截面 / 标准差", def: R`$\sigma_{\rm T}$ 为 Thomson 截面；单独出现时指涨落的标准差 $\sigma=\sqrt{\text{方差}}$`, unit: "—" },
  { sym: R`\sigma_T`, name: "Thomson 截面", def: R`$\sigma_{\rm T}=0.665\times10^{-24}\,\mathrm{cm^2}$；$\tau'=-n_e\sigma_{\rm T}a$`, unit: "面积" },
  { sym: R`\sigma_{\rm T}`, name: "Thomson 截面", def: R`$\sigma_{\rm T}=0.665\times10^{-24}\,\mathrm{cm^2}$；$\tau'=-n_e\sigma_{\rm T}a$`, unit: "面积" },
  { sym: R`\hat{\boldsymbol k}`, name: "波矢方向", def: R`单位矢量 $\boldsymbol k/k$；$\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol p}$`, unit: "无量纲" },
  { sym: R`\hat{\boldsymbol p}`, name: "光子传播方向", def: R`单位矢量`, unit: "无量纲" },
  { sym: R`\Lambda`, name: "宇宙学常数", def: R`$\Lambda$；它会导致永不结束的加速膨胀，所以不能驱动暴胀`, unit: R`时间$^{-2}$` },
  { sym: R`\hat z`, name: "z 方向单位矢量", def: R`取 $\boldsymbol k\parallel\hat z$`, unit: "无量纲" },
];

// 合并：核心在前；补充条目按 sym+id 去重
const seen = new Set();
const key = e => (e.id || "") + "|" + e.sym.replace(/\s+/g, "");
export const NOTATION = [...CORE, ...NT1, ...NT3, ...NT4, ...NT5, ...NTE].filter(e => { const k = key(e); if (seen.has(k)) return false; seen.add(k); return true; });
