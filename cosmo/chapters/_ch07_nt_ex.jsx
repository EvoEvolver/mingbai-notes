// 习题 7.1–7.18 补充符号（合并进 _ch07_notation.jsx；核心条目与各节条目优先）
const R = String.raw;
export const NT = [
  // ---------- 习题 7.1、7.3：平坦性与视界 ----------
  { sym: R`\Omega`, name: "（总）密度参数", en: "density parameter", def: R`$\Omega(t)\equiv8\pi G\rho(t)/3H^2(t)$ \eqref{7.111}，即能量密度与同时刻临界密度之比；由 Friedmann 方程 $\Omega-1=K/(aH)^2$`, unit: "无量纲", eq: "7.111" },
  { sym: R`\Omega_K`, name: "曲率密度参数", def: R`$\Omega_K\equiv1-\Omega_0=-K/H_0^2$（$a_0=1$）；习题 7.1 中 $\Omega_0=0.3$，故 $\Omega_K=0.7$`, unit: "无量纲" },
  { sym: R`\Omega_{\rm r}`, name: "今天的辐射密度参数", def: R`光子 + 无质量中微子：$\Omega_{\rm r}h^2=4.15\times10^{-5}$，$h=0.677$ 时 $\Omega_{\rm r}\approx9.1\times10^{-5}$`, unit: "无量纲" },
  { sym: R`\Omega_{\rm m}`, name: "今天的物质密度参数", def: R`暗物质 + 重子；基准宇宙学 $\Omega_{\rm m}=0.31$`, unit: "无量纲" },
  { sym: R`K`, name: "空间曲率常数", def: R`Friedmann 方程 $H^2=8\pi G\rho/3-K/a^2$ 中的曲率项；$K>0$ 闭合，$K<0$ 开放`, unit: R`共动长度$^{-2}$` },
  { sym: R`a_{\rm eq}`, name: "物质–辐射相等时的标度因子", def: R`$a_{\rm eq}=\Omega_{\rm r}/\Omega_{\rm m}=4.15\times10^{-5}/(\Omega_{\rm m}h^2)\approx2.9\times10^{-4}$`, unit: "无量纲" },
  { sym: R`g_*`, name: "相对论性有效自由度", def: R`$\rho=\frac{\pi^2}{30}g_*T^4$；标准模型在 $T\gg100\,\mathrm{GeV}$ 时 $g_*=106.75$，今天熵自由度为 3.91`, unit: "无量纲" },

  // ---------- 习题 7.4、7.6、7.9 ----------
  { sym: R`\mathcal L_\phi`, name: "标量场的拉氏量密度", en: "Lagrangian density", def: R`$\mathcal L_\phi=-\frac12g^{\mu\nu}\partial_\mu\phi\,\partial_\nu\phi-V(\phi)$ \eqref{7.112}：动能减势能，因 $g^{00}<0$ 动能项前带负号`, unit: R`质量$^4$`, eq: "7.112" },
  { sym: R`A_\phi`, name: "振荡振幅", def: R`习题 7.6 中重标量场 $\phi\simeq A_\phi(t)\cos(mt+\alpha)$ 的缓变振幅，$A_\phi\propto a^{-3/2}$`, unit: "质量" },
  { sym: R`\alpha`, name: "相位常数", def: R`习题 7.6 中振荡解的初相位；作上下标时是时空指标`, unit: "无量纲" },
  { sym: R`c_s`, name: "声速", en: "sound speed", def: R`$c_s^2\equiv d\mathcal P/d\rho=\dot{\mathcal P}/\dot\rho$ \eqref{7.118}；物质 0，辐射 1/3，慢滚标量场 $c_s^2=-1-\frac23\delta_{\rm sr}$`, unit: "无量纲（以光速为单位）", eq: "7.118" },
  { sym: R`Y`, name: "标量场扰动的辅助比值", def: R`习题 7.9 中 $Y\equiv(\delta\dot\phi-\dot{\bar\phi}\Psi)/(H\delta\phi)$；视界外它是慢滚小量`, unit: "无量纲" },

  // ---------- 习题 7.10、7.12：谐振子与模函数 ----------
  { id: "Eho", sym: R`E`, name: "谐振子能量", def: R`单位质量谐振子 $E=p^2/2+\omega^2x^2/2$；量子化后 $\hat E=\omega(\hat a^\dagger\hat a+\frac12)$`, unit: "能量" },
  { sym: R`\hat E`, name: "谐振子能量算符（哈密顿量）", def: R`$\hat E=\omega(\hat a^\dagger\hat a+\frac12)$；基态期望值即零点能 $\omega/2$`, unit: "能量" },
  { id: "pho", sym: R`p`, name: "谐振子动量", def: R`单位质量时 $p=dx/dt$；量子化后为 $\hat p$`, unit: "—" },
  { id: "pnu", sym: R`p`, name: "中微子动量大小", def: R`$\mathcal N(k,p,\mu,\eta)$ 的动量自变量；无质量时 $E_\nu(p)=p$，$\mathcal N$ 与 $p$ 无关`, unit: "能量" },
  { sym: R`\tilde v`, name: "约化模函数", def: R`$\tilde v\equiv v/\eta$（习题 7.12），满足一阶球 Bessel 方程`, unit: R`质量$^{-1/2}$长度$^{-1}$` },
  { id: "xke", sym: R`x`, name: R`无量纲时间 $k\eta$`, def: R`习题 7.12 中 $x\equiv k\eta$（暴胀期间为负）`, unit: "无量纲" },
  { sym: R`j_1`, name: "一阶球 Bessel 函数", def: R`$j_1(x)=\frac{\sin x}{x^2}-\frac{\cos x}{x}$（式 (C.13) 的正则解）`, unit: "无量纲" },
  { sym: R`y_1`, name: "一阶球 Neumann 函数", def: R`$y_1(x)=-\frac{\cos x}{x^2}-\frac{\sin x}{x}$（式 (C.13) 的第二个解）`, unit: "无量纲" },
  { id: "cA", sym: R`A`, name: R`$j_1$ 的系数`, def: R`习题 7.12 通解 $\tilde v=Aj_1+By_1$ 中的常数；由初条件定出 $A=-(k/2)^{1/2}$`, unit: "—" },
  { id: "cB", sym: R`B`, name: R`$y_1$ 的系数`, def: R`习题 7.12 通解中的常数；初条件要求 $A=iB$`, unit: "—" },

  // ---------- 习题 7.15–7.17：中微子与早期初条件 ----------
  { sym: R`T_\nu`, name: "中微子温度", def: R`正负电子湮灭后 $T_\nu=(4/11)^{1/3}T$`, unit: "能量" },
  { sym: R`E_\nu`, name: "中微子能量", def: R`$E_\nu(p)=\sqrt{p^2+m_\nu^2}$；忽略质量时 $E_\nu=p$`, unit: "能量" },
  { sym: R`\mathcal N_3`, name: "中微子温度八极矩", def: R`视界外 $\mathcal N_3\sim k\eta\,\mathcal N_2$，可从多极矩方程组中截断掉`, unit: "无量纲" },
  { sym: R`\mathcal P_0`, name: "零阶 Legendre 多项式", def: R`$\mathcal P_0(\mu)=1$`, unit: "无量纲" },
  { sym: R`\mathcal P_1`, name: "一阶 Legendre 多项式", def: R`$\mathcal P_1(\mu)=\mu$`, unit: "无量纲" },
  { sym: R`\mathcal P_l`, name: R`$l$ 阶 Legendre 多项式`, def: R`满足递推 $(2l+1)\mu\mathcal P_l=(l+1)\mathcal P_{l+1}+l\mathcal P_{l-1}$，正交归一 $\int_{-1}^1\frac{d\mu}{2}\mathcal P_l\mathcal P_{l'}=\frac{\delta_{ll'}}{2l+1}$`, unit: "无量纲" },
  { sym: R`R`, name: "重子–光子动量密度比", def: R`$1/R\equiv4\rho_\gamma/(3\rho_{\rm b})$ \eqref{5.74}；辐射主导早期 $R\propto a\to0$`, unit: "无量纲" },

  // ---------- 习题 7.18：二次势暴胀 ----------
  { sym: R`\phi_e`, name: "暴胀结束时的场值", def: R`由 $\epsilon_{\rm sr}=1$ 定义；二次势中 $\phi_e=m_{\rm Pl}/\sqrt{4\pi}\approx0.28\,m_{\rm Pl}$`, unit: "质量" },
  { sym: R`\phi_{\rm p}`, name: R`$k_{\rm p}$ 穿出视界时的场值`, def: R`二次势中 $\phi_{\rm p}^2=\frac{m_{\rm Pl}^2}{4\pi}(1+2N)$，约 $3\,m_{\rm Pl}$`, unit: "质量" },
  { sym: R`a_{\rm p}`, name: R`$k_{\rm p}$ 穿出视界时的标度因子`, def: R`$k_{\rm p}=a_{\rm p}H$，$a_{\rm p}=a_ee^{-N}$`, unit: "无量纲" },
  { sym: R`a_{\rm re}`, name: R`$k_{\rm p}$ 重新进入视界时的标度因子`, def: R`辐射主导时 $aH\propto a^{-1}$，故 $a_{\rm re}=a_ee^{N}$`, unit: "无量纲" },
];
