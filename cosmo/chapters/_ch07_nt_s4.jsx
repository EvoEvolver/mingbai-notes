// §7.4 补充符号条目（核心条目见 _ch07_notation.jsx）
const R = String.raw;
export const NT = [
  { sym: R`\delta\phi`, name: "标量场扰动", en: "inflaton perturbation", def: R`$\phi(\boldsymbol x,t)=\bar\phi(t)+\delta\phi(\boldsymbol x,t)$ \eqref{7.44}；不计度规扰动（或在空间平直切片中）满足 $\delta\phi''+2aH\delta\phi'+k^2\delta\phi=0$ \eqref{7.54}，与引力波方程相同。它不是规范不变量（\eqref{6.10}）`, unit: "质量", eq: "7.44" },
  { sym: R`\bar\phi'`, name: "零阶场对 η 的导数", def: R`$\bar\phi'=a\dot{\bar\phi}$，所以 $\bar\phi_{,0}=\bar\phi'/a$；$\rho+\mathcal P=(\bar\phi'/a)^2$，且 $(aH/\bar\phi')^2=4\pi G/\epsilon_{\rm sr}$`, unit: R`质量$\times$长度$^{-1}$`, eq: "7.47" },
  { sym: R`\bar\phi''`, name: "零阶场对 η 的二阶导数", def: R`由 \eqref{7.15}：$\bar\phi''=-2aH\bar\phi'-a^2V_{,\phi}$`, unit: R`质量$\times$长度$^{-2}$`, eq: "7.15" },
  { sym: R`\dot{\bar\phi}`, name: "零阶场对 t 的导数", def: R`慢滚时 $\dot{\bar\phi}\simeq-V_{,\phi}/3H$：势越陡，场滚得越快。暴胀期间 $\bar\phi$ 单调变化，可以充当"时钟"`, unit: R`质量$^2$` },
  { sym: R`\mathcal P`, name: "压强（§7.4 记法）", en: "pressure", def: R`零阶压强，原书 §7.4 用花体 $\mathcal P$ 书写，与 \eqref{7.9} 的 $P$ 是同一个量；标量场 $\rho+\mathcal P=\dot{\bar\phi}^2$。$\delta\mathcal P=\delta T^i{}_i/3$ 为其一阶扰动`, unit: "能量密度", eq: "7.56" },
  { sym: R`\dot{\mathcal P}`, name: "零阶压强的时间变化率", def: R`$\dot{\mathcal P}=(d\mathcal P/d\bar\phi)\dot{\bar\phi}$；$\delta\mathcal P=(\dot{\mathcal P}/\dot\rho)\delta\rho$ 是 $\mathcal R$ 在视界外守恒的条件 \eqref{7.71}`, unit: R`能量密度$\times$时间$^{-1}$`, eq: "7.71" },
  { sym: R`\dot\rho`, name: "零阶能量密度的时间变化率", def: R`连续性方程 \eqref{2.56}：$\dot\rho=-3H(\rho+\mathcal P)$`, unit: R`能量密度$\times$时间$^{-1}$`, eq: "7.70" },
  { sym: R`\delta\rho`, name: "能量密度扰动", def: R`$\delta\rho=-\delta T^0{}_0$`, unit: "能量密度", eq: "7.70" },
  { sym: R`\dot\Psi`, name: R`$\Psi$ 对 t 的导数`, def: R`能量守恒方程 \eqref{7.56} 中唯一新出现的度规项 $3(\rho+\mathcal P)\dot\Psi$ 的来源（原为 $-3(\rho+\mathcal P)\dot\Phi$，用了 $\Phi=-\Psi$）`, unit: R`时间$^{-1}$`, eq: "7.56" },
  { sym: R`u_{\rm m}`, name: "物质速度", def: R`共形牛顿规范中物质的（纵向）速度；$u_{\rm m}=ik\mathcal V$`, unit: "无量纲", eq: "7.73" },
];
