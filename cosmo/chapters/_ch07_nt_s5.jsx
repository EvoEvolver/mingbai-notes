// §7.5–§7.6 补充符号（核心词典 _ch07_notation.jsx 未收录者）
const R = String.raw;
export const NT = [
  { sym: R`\Theta_2`, name: "光子温度四极矩", def: R`$l=2$ 多极矩（\eqref{5.66}）；早期被 $k\eta$ 与 Compton 散射双重压低，可忽略`, unit: "无量纲" },
  { sym: R`\Theta_l`, name: R`光子温度第 $l$ 阶多极矩`, def: R`定义见 \eqref{5.66}；超视界时 $\Theta_l\sim(k\eta)^l\Theta_0$`, unit: "无量纲" },
  { sym: R`\mathcal N`, name: "中微子温度扰动", def: R`$\mathcal N(k,\mu,\eta)$；忽略中微子质量时与 $p$ 无关，满足无碰撞的 Boltzmann 方程 \eqref{5.73}`, unit: "无量纲" },
  { sym: R`\mathcal N_2`, name: "中微子温度四极矩", def: R`视界外 $\mathcal N_2\propto(k\eta)^2$；它产生的各向异性应力使 $\Phi=-(1+\frac{2f_\nu}{5})\Psi$（\exref{7.16}）`, unit: "无量纲" },
  { sym: R`\mathcal N_l`, name: R`中微子第 $l$ 阶多极矩`, def: R`与光子 \eqref{5.66} 同样定义`, unit: "无量纲" },
  { sym: R`f_\nu`, name: "中微子能量占比", def: R`中微子在辐射能量密度中的占比（\exref{7.15}），约 0.41`, unit: "无量纲" },
  { sym: R`\rho_\gamma`, name: "光子能量密度", def: R`$\rho_\gamma\propto T^4$；$\delta\rho_\gamma/\rho_\gamma=4\Theta_0$`, unit: "能量密度" },
  { sym: R`\rho_\nu`, name: "中微子能量密度", def: R`$\rho_{\rm r}\Theta_{{\rm r},0}=\rho_\gamma\Theta_0+\rho_\nu\mathcal N_0$（\eqref{6.79}）`, unit: "能量密度" },
  { sym: R`\rho_{\rm c}`, name: "暗物质能量密度", def: R`早期远小于辐射，故 \eqref{6.41} 中的物质项可略`, unit: "能量密度" },
  { sym: R`\rho_{\rm b}`, name: "重子能量密度", def: R`早期远小于辐射；$R=3\rho_{\rm b}/(4\rho_\gamma)$`, unit: "能量密度" },
  { sym: R`\Delta_{\mathcal R}`, name: "曲率扰动的无量纲功率谱", def: R`$\Delta^2_{\mathcal R}=\frac{k^3}{2\pi^2}P_{\mathcal R}=\mathcal A_s(k/k_{\rm p})^{n_s-1}$`, unit: "无量纲", eq: "7.99" },
  { sym: R`\Delta_{\rm T}`, name: "张量无量纲功率谱", def: R`$\Delta^2_{\rm T}=\frac{k^3}{2\pi^2}P_{\rm T}=r\mathcal A_s(k/k_{\rm p})^{n_{\rm T}}$`, unit: "无量纲", eq: "7.102" },
  { sym: R`h^{\rm TT}_{ij}`, name: "横向无迹张量扰动", def: R`$\boldsymbol k\parallel\hat z$ 时 $h^{\rm TT}_{11}=-h^{\rm TT}_{22}=h_+$，$h^{\rm TT}_{12}=h^{\rm TT}_{21}=h_\times$（\eqref{6.49}）；$\sum_{ij}|h^{\rm TT}_{ij}|^2=2|h_+|^2+2|h_\times|^2$`, unit: "无量纲", eq: "7.101" },
  { sym: R`\chi_*`, name: "到最后散射面的共动距离", def: R`约 $14\,\mathrm{Gpc}$；$\ell\sim k\chi_*$`, unit: "共动长度" },
  { sym: R`\ell`, name: "CMB 多极矩", def: R`天球上的角波数，$\ell\sim k\chi_*$`, unit: "无量纲" },
];
