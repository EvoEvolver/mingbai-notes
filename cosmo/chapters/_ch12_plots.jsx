// 第 12 章交互图。数值函数见 _ch12_phys.jsx（已用 node 核对：σ8=0.832、σ_W(R)=1 于 R$\approx$6.0 h^-1Mpc、
// Φ_rms$\times$10^4$\approx$0.51；δ_lin(2π)=1.6865、1+δ_NL(π)=5.552；Tinker08 Δ=200 峰值 10^-1.21 于 M$\approx$10^13 h^-1 M_sun；
// NFW M200=10^12 M_sun 时 R200=311.5 kpc）。
import { useState } from "react";
import { Plot, M } from "@kit";
import * as P from "./_ch12_phys.jsx";

const R = String.raw;
const f3 = v => (Number.isFinite(v) ? (+v).toFixed(3) : R`\text{—}`);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };

// ---------- 1. 图 12.1：σ_W(R) ----------
export function SigmaPlot() {
  return <Plot
    x={{ label: R`R\ [h^{-1}\,\mathrm{Mpc}]`, log: true, domain: [0.3, 300] }}
    y={{ label: R`\sigma_W`, log: true, domain: [0.008, 12] }}
    params={[
      { id: "z", label: R`z`, min: 0, max: 3, step: 0.05, value: 0 },
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.2, max: 0.45, step: 0.005, value: 0.3106 },
    ]}
    series={p => {
      const m = P.model(p.Om), D = m.Dz(p.z);
      let lo = 0.05, hi = 200; for (let i = 0; i < 50; i++) { const mid = Math.sqrt(lo * hi); if (P.sigmaTH(m, mid, p.z) > 1) lo = mid; else hi = mid; }
      return [
        { label: R`\delta,\ \text{tophat}`, f: r => P.sigmaTH(m, r, p.z), color: "#1f1b16", width: 2.4 },
        { label: R`\delta,\ \text{sharp-}k\ (k_{\max}=\pi/R)`, f: r => Math.sqrt(P.sigma2(m, r, "sk")) * D, color: "#2c6e49", dash: "dashdot" },
        { label: R`\Phi,\ \text{tophat},\ \times10^4`, f: r => 1e4 * Math.sqrt(P.sigma2(m, r, "phi")) * D * (1 + p.z), color: "#c0392b", dash: "dash" },
        { label: R`\sigma_8=${f3(P.sigmaTH(m, 8, p.z))},\ \ \sigma_W=1\ \text{at}\ R=${lo.toFixed(2)}\,h^{-1}\mathrm{Mpc}`, f: () => NaN },
      ];
    }}
    vlines={[{ x: 8, label: R`R=8` }]}
    samples={90} height={400} />;
}

// ---------- 2. F2 / G2 核的角度依赖 ----------
export function KernelPlot() {
  return <Plot
    x={{ label: R`\mu=\hat{\boldsymbol k}_1\cdot\hat{\boldsymbol k}_2`, domain: [-1, 1] }}
    y={{ label: R`F_2,\ G_2`, domain: [-1.2, 3.2] }}
    params={[{ id: "r", label: R`r=k_2/k_1`, min: 0.1, max: 10, log: true, value: 1 }]}
    series={p => [
      { label: R`F_2(\mu,r)`, f: mu => P.F2(mu, p.r), color: "#1f1b16", width: 2.4 },
      { label: R`G_2(\mu,r)`, f: mu => P.G2(mu, p.r), color: "#2c4a6e", dash: "dash" },
      { label: R`\tfrac57+\tfrac27\mu^2\ (\text{去掉平移项})`, f: mu => 5 / 7 + 2 / 7 * mu * mu, color: "#b8862b", dash: "dot" },
      { label: R`\langle F_2\rangle_\mu=\tfrac{17}{21}`, f: () => 17 / 21, color: "#7d3c98", dash: "dashdot", width: 1.2 },
      { label: R`F_2(\mu{=}1)=${f3(P.F2(1, p.r))},\ F_2(\mu{=}{-}1)=${f3(P.F2(-1, p.r))}`, f: () => NaN },
    ]}
    caption={R`二阶密度核 $F_2$ 与速度核 $G_2$（\eqref{12.39}）随两个波矢夹角余弦 $\mu$ 的变化，滑块为模之比 $r=k_2/k_1$。$r=1$、$\mu=-1$（$\boldsymbol k_1=-\boldsymbol k_2$）时 $F_2=0$（\eqref{12.105}）；平行波矢耦合最强（$r=1$ 时 $F_2=2$）。$r$ 远离 1 时平移项 $\frac12\mu(r+1/r)$ 主导，但它对角度平均为零，平均值恒为 $17/21$。`}
    samples={200} height={340} />;
}

// ---------- 3. NFW 轮廓 ----------
export function NFWPlot() {
  return <Plot
    x={{ label: R`r\ [\mathrm{kpc}]`, log: true, domain: [0.5, 2000] }}
    y={{ label: R`\rho_{\rm h}(r)/\rho_{\rm m}(t_0)`, log: true, domain: [0.05, 3e7] }}
    params={[
      { id: "c", label: R`c_{200}`, min: 2, max: 30, log: true, value: 8 },
      { id: "lM", label: R`\log_{10}(M_{200}/M_\odot)`, min: 10, max: 15, step: 0.05, value: 12 },
    ]}
    series={p => {
      const Mh = 10 ** p.lM, h = P.nfw(Mh, p.c), refs = [4, 8, 16].map((c, i) => { const q = P.nfw(Mh, c); return { label: R`c=${c}`, f: r => q.rho(r) / q.rhom, color: ["#c0392b", "#2c6e49", "#2c4a6e"][i], dash: "dot", width: 1.2 }; });
      return [
        ...refs,
        { label: R`c_{200}=${(+p.c).toFixed(1)}`, f: r => h.rho(r) / h.rhom, color: "#1f1b16", width: 2.6 },
        { label: R`\propto r^{-1},\ r^{-3}\ \text{渐近线}`, f: r => r < h.rs ? h.rhos / h.rhom * h.rs / r : h.rhos / h.rhom * (h.rs / r) ** 3, color: "#999", dash: "dash", width: 1 },
        { label: R`R_{200}=${h.R.toFixed(1)}\,\mathrm{kpc},\ r_s=${h.rs.toFixed(1)}\,\mathrm{kpc},\ \rho_s/\rho_{\rm m}=${sci(h.rhos / h.rhom)}`, f: () => NaN },
      ];
    }}
    vlines={p => { const h = P.nfw(10 ** p.lM, p.c); return [{ x: h.rs, label: R`r_s` }, { x: h.R, label: R`R_{200}` }]; }}
    caption={R`NFW 轮廓 \eqref{12.62}（\exref{12.8} 要的那张图）。给定 $M_{200}$（$\Delta=200$，相对今天的平均物质密度，基准 $\Omega_{\rm m}=0.311$、$h=0.677$）与浓度 $c_{200}$，由 \secref{12.4.1} 折叠推导中的公式求出 $R_{200}$、$r_s=R_{200}/c$、$\rho_s$。点线为 $c=4,8,16$。$M_{200}=10^{12}M_\odot$ 时 $R_{200}=312\,\mathrm{kpc}$（共动 $=z=0$ 物理）。注意曲线在 $R_{200}$ 之外仍按 $r^{-3}$ 延伸——真实晕在那里更陡。`}
    samples={160} height={380} />;
}

// ---------- 4. 图 12.7：球坍缩 ----------
export function CollapsePlot() {
  const [th, setTh] = useState(Math.PI);
  const c = P.cyc(th), dl = P.deltaLin(th), dn = P.deltaNL(th);
  const curve = Array.from({ length: 241 }, (_, i) => { const t = 0.0001 + i / 240 * (2 * Math.PI - 0.0002); return P.cyc(t); });
  const lin = Array.from({ length: 241 }, (_, i) => { const t = 0.02 + i / 240 * (2 * Math.PI - 0.02); return [P.cyc(t).t, P.deltaLin(t)]; });
  const nl = Array.from({ length: 241 }, (_, i) => { const t = 0.02 + i / 240 * (2 * Math.PI - 0.06); return [P.cyc(t).t, 1 + P.deltaNL(t)]; });
  return (
    <div>
      <div className="plot-params card" style={{ padding: "0.5em 1em" }}>
        <label className="plot-param"><span className="plot-plabel"><M>{R`\theta=${(th / Math.PI).toFixed(3)}\pi`}</M></span>
          <input type="range" min={0.05} max={2 * Math.PI} step={0.005} value={th} onChange={e => setTh(+e.target.value)} /></label>
        <span><M>{R`t/t_{\rm ta}=${c.t.toFixed(3)},\ r/r_{\rm ta}=${c.r.toFixed(3)},\ \delta^{(1)}=${dl.toFixed(3)},\ 1+\delta_{\rm NL}=${th > 2 * Math.PI - 1e-3 ? R`\infty` : sci(1 + dn)}`}</M></span>
      </div>
      <Plot x={{ label: R`t/t_{\rm ta}`, domain: [0, 2] }} y={{ label: R`r/r_{\rm ta}`, domain: [0, 1.08] }}
        series={() => [
          { label: R`r(t)\ \text{摆线 (12.68)}`, data: curve.map(q => [q.t, q.r]), color: "#2c4a6e", width: 2.4 },
          { label: R`\text{当前时刻}`, data: [[c.t, c.r]], points: true, color: "#c0392b" },
          { label: R`\text{未扰动 Hubble 流 }r\propto t^{2/3}`, data: curve.filter(q => q.t < 1.0).map(q => [q.t, Math.cbrt((6 * Math.PI * q.t) ** 2) / 4]), color: "#999", dash: "dot", width: 1 },
        ]}
        vlines={[{ x: c.t, label: R`t` }]} samples={10} height={260} />
      <Plot x={{ label: R`t/t_{\rm ta}`, domain: [0, 2] }} y={{ label: R`\delta`, log: true, domain: [0.01, 1000] }}
        series={() => [
          { label: R`1+\delta_{\rm NL}\ \text{(非线性)}`, data: nl, color: "#c0392b", width: 2.4 },
          { label: R`\delta^{(1)}\ \text{(线性外推)}`, data: lin, color: "#1f1b16", width: 2.4 },
          { label: R`\delta_{\rm cr}=1.686`, f: () => 1.686, color: "#2c6e49", dash: "dash", width: 1.2 },
          { label: R`\Delta_{\rm vir}=18\pi^2=${(18 * Math.PI * Math.PI).toFixed(1)}`, f: () => 18 * Math.PI * Math.PI, color: "#7d3c98", dash: "dash", width: 1.2 },
          { label: R`\text{当前时刻}`, data: [[c.t, Math.max(dl, 0.0101)], [c.t, th < 2 * Math.PI - 0.05 ? 1 + dn : 999]], points: true, color: "#d35400" },
        ]}
        vlines={[{ x: c.t, label: R`t` }, { x: 1, label: R`t_{\rm ta}` }]} samples={60} height={300} />
    </div>);
}

// ---------- 5. 图 12.9：质量函数 ----------
export function MassFunctionPlot() {
  return <Plot
    x={{ label: R`M\ [h^{-1}M_\odot]`, log: true, domain: [1e10, 1e16] }}
    y={{ label: R`(M^2/\rho_{\rm m})\,dn/dM`, log: true, domain: [3e-4, 0.15] }}
    params={[{ id: "z", label: R`z`, min: 0, max: 3, step: 0.05, value: 0 }]}
    series={p => {
      const m = P.model(), g = (M, f) => { const s = P.sigmaM(m, M, p.z); return f(s) * Math.abs(P.dlnsdlnM(m, M)); };
      // M_*：ν=1
      let lo = 1e6, hi = 1e17; for (let i = 0; i < 60; i++) { const mid = Math.sqrt(lo * hi); if (P.sigmaM(m, mid, p.z) > P.DCR) lo = mid; else hi = mid; }
      return [
        { label: R`\text{Tinker+08}\ (\Delta=200)`, f: M => g(M, s => P.fTinker(s, p.z)), color: "#1f1b16", width: 2.6 },
        { label: R`\text{Sheth–Tormen}`, f: M => g(M, s => P.fST(P.DCR / s)), color: "#2c6e49", dash: "dashdot" },
        { label: R`\text{Press–Schechter (12.73)}`, f: M => g(M, s => P.fPS(P.DCR / s)), color: "#c0392b", dash: "dash" },
        { label: R`M_*(\nu{=}1)=${sci(lo)}\,h^{-1}M_\odot,\ \ \sigma(10^{15})=${f3(P.sigmaM(m, 1e15, p.z))}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: 1e15, label: R`10^{15}` }]}
    samples={120} height={400} />;
}

// ---------- 6. 线性偏袒 b1(M) ----------
export function BiasPlot() {
  return <Plot
    x={{ label: R`M\ [h^{-1}M_\odot]`, log: true, domain: [1e10, 1e16] }}
    y={{ label: R`b_1`, log: true, domain: [0.3, 30] }}
    params={[{ id: "z", label: R`z`, min: 0, max: 3, step: 0.05, value: 0 }]}
    series={p => {
      const m = P.model(), nu = M => P.DCR / P.sigmaM(m, M, p.z);
      return [
        { label: R`1+b_1^{\rm PS}\ (\text{欧拉})`, f: M => 1 + P.b1PS(nu(M)), color: "#c0392b", width: 2.2 },
        { label: R`b_1^{\rm PS}=(\nu^2-1)/\delta_{\rm cr}\ (12.81,\ \text{拉格朗日})`, f: M => P.b1PS(nu(M)), color: "#c0392b", dash: "dot" },
        { label: R`\text{Sheth–Tormen (欧拉)}`, f: M => P.b1ST(nu(M)), color: "#2c6e49", dash: "dashdot", width: 2.2 },
        { label: R`b_1=1`, f: () => 1, color: "#999", dash: "dash", width: 1 },
        { label: R`1+b_1^{\rm PS}(10^{14})=${f3(1 + P.b1PS(nu(1e14)))},\ \ (10^{15})=${f3(1 + P.b1PS(nu(1e15)))}`, f: () => NaN },
      ];
    }}
    caption={R`峰–背景分离给出的晕线性偏袒随质量的变化（\eqref{12.80}–\eqref{12.81}；$\sigma(M,z)$ 同 \figref{12.9}）。红点线是 \eqref{12.81} 本身——相对于初始场的拉格朗日偏袒，$\nu<1$ 时为负；红实线是随物质运动后的欧拉偏袒 $1+b_1^{\rm PS}$；绿线为 Sheth–Tormen 质量函数对应的偏袒。$\nu=\delta_{\rm cr}/\sigma\gg1$ 的稀有晕偏袒很大，且同一质量的晕在高红移更稀有、偏袒更大（拖动 $z$）。`}
    samples={100} height={340} />;
}
