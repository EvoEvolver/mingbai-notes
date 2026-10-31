// §7.1–7.2 补充符号（合并进 _ch07_notation.jsx；核心条目优先）
const R = String.raw;
export const NT = [
  { id: "hred", sym: R`h`, name: "无量纲哈勃常数", en: "reduced Hubble constant", def: R`$H_0=100\,\sym{ch07-hred}{h}\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$，$\sym{ch07-hred}{h}\approx0.68$；距离常以 $\sym{ch07-hred}{h}^{-1}\,\mathrm{Mpc}$ 为单位`, unit: "无量纲" },
  { sym: R`\mathcal P`, name: "压强", en: "pressure", def: R`本书正文中压强记作 $\mathcal P$（与 $P$ 同义）；标量场 $\mathcal P=\frac12\dot\phi^2-V$ \eqref{7.9}。加速膨胀需要 $\rho+3\mathcal P<0$`, unit: "能量密度", eq: "7.9" },
  { sym: R`\mathcal L`, name: "拉氏量密度", en: "Lagrangian density", def: R`正则标量场 $\mathcal L=-\frac12g^{\mu\nu}\partial_\mu\phi\,\partial_\nu\phi-V(\phi)$；由它导出能动张量 \eqref{7.6}（\exref{7.4}）`, unit: R`质量$^4$`, eq: "7.6" },
  { sym: R`N`, name: "e 倍数", en: "number of e-folds", def: R`$N=\int H\,dt=\ln(a_{\rm end}/a)$：从某时刻到暴胀结束标度因子增长的 e 倍数。解决视界问题约需 $N\approx60$（$10^{27}\simeq e^{62}$）`, unit: "无量纲" },
];
