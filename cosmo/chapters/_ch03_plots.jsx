// 第 3 章交互图。数值函数见 _ch03_phys.jsx（已用 node 与解析解核对，见各图下方"读图与数值核对"）。
import { useState } from "react";
import { Plot, num } from "@kit";
import * as P from "./_ch03_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const OR_H2 = 4.15e-5;   // Ω_r h²（光子 + 3 代无质量中微子，式 2.85）

// ---------- 1. Friedmann 方程的数值解 a(t)（式 3.14）----------
export function FriedmannPlot() {
  return <Plot
    x={{ label: R`t\ [\mathrm{Gyr}]`, domain: [0, 100] }}
    y={{ label: R`a(t)`, domain: [0, 4] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0, max: 3, step: 0.01, value: 0.3 },
      { id: "OL", label: R`\Omega_\Lambda`, min: -0.5, max: 1.5, step: 0.01, value: 0.7 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.01, value: 0.7 },
      { id: "rad", label: R`\text{辐射开关}\ (\Omega_{\rm r}h^2=4.15\times10^{-5})`, min: 0, max: 1, step: 1, value: 0 },
    ]}
    series={p => {
      const Or = p.rad ? OR_H2 / (p.h * p.h) : 0;
      const q = { Om: p.Om, OL: p.OL, Or }, G = P.HUBBLE_GYR / (100 * p.h), s = P.solveA(q, 0);
      const T = s.t.map(t => t * G), OK = 1 - p.Om - p.OL - Or;
      const tag = s.fate === "bounce" ? R`\text{无大爆炸解（反弹宇宙）}` : s.t0 ? R`t_0=${f2(s.t0 * G)}\,\mathrm{Gyr}` : R`\text{从未达到}\ a=1`;
      const H0t = t => t / G;
      return [
        { label: R`a(t):\ \Omega_{\rm K}=${f2(OK)},\ ${tag}${s.fate === "crunch" ? R`,\ \text{大挤压于}\ ${f2(s.t.at(-1) * G, 1)}\,\mathrm{Gyr}` : ""}`, f: t => (T.length && t <= T.at(-1) ? num.interp(T, s.a, t) : NaN) },
        { label: R`\text{EdS}:\ a=(\tfrac32H_0t)^{2/3}`, f: t => Math.pow(1.5 * H0t(t), 2 / 3), dash: "dot", color: "#999", width: 1.5 },
        { label: R`\text{今天处的指数切线}:\ a=e^{H_0(t-t_0)}`, f: t => (s.t0 ? Math.exp(H0t(t) - s.t0) : NaN), dash: "dash", color: "#2c6e49", width: 1.5 },
      ];
    }}
    vlines={p => {
      const Or = p.rad ? OR_H2 / (p.h * p.h) : 0, s = P.solveA({ Om: p.Om, OL: p.OL, Or }, 0), G = P.HUBBLE_GYR / (100 * p.h);
      return s.t0 ? [{ x: s.t0 * G, label: R`\text{今天}` }] : [];
    }}
    samples={400} />;
}

// ---------- 2. 各成分在 H² 中的份额 Ω_s(a)（式 3.14 逐项）----------
export function FractionPlot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-6, 10] }}
    y={{ label: R`\Omega_s(a)=\Omega_s a^{-3(1+w_s)}/(H/H_0)^2`, domain: [-0.1, 1.05] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 1, step: 0.005, value: 0.31 },
      { id: "OL", label: R`\Omega_\Lambda`, min: 0, max: 1.2, step: 0.005, value: 0.69 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.01, value: 0.68 },
    ]}
    series={p => {
      const q = { Om: p.Om, OL: p.OL, Or: OR_H2 / (p.h * p.h) };
      const fr = a => P.fractions(a, q);
      return [
        { label: R`\text{辐射}\ \Omega_{\rm r}(a)`, f: a => fr(a).r, color: "#c0392b" },
        { label: R`\text{物质}\ \Omega_{\rm m}(a)`, f: a => fr(a).m, color: "#1f1b16" },
        { label: R`\Lambda\ \Omega_\Lambda(a)`, f: a => fr(a).L, color: "#2c6e49" },
        { label: R`\text{曲率}\ \Omega_{\rm K}(a)`, f: a => fr(a).K, color: "#7d3c98", dash: "dash" },
      ];
    }}
    vlines={p => {
      const Or = OR_H2 / (p.h * p.h), q = { Om: p.Om, OL: p.OL, Or }, aacc = P.aAcc(q), out = [{ x: Or / p.Om, label: R`a_{\rm eq}=${(Or / p.Om * 1e4).toFixed(2)}\times10^{-4}` }];
      if (Number.isFinite(aacc)) out.push({ x: aacc, label: R`\ddot a=0:\ a=${f2(aacc, 3)}` });
      return out;
    }}
    samples={300} />;
}

// ---------- 3. 图 3.2 交互版：谐振势（可加非谐项）中的相空间演化 ----------
const BLOB = P.blob(300, 1.0, 0.2, 0.05, 7);
const RING = (() => { const r = P.mulberry32(11), out = []; for (let i = 0; i < 300; i++) { const th = 2 * Math.PI * r(), E = 0.5 * (1.02 ** 2) * (0.97 + 0.06 * r()), A = Math.sqrt(2 * E); out.push([A * Math.cos(th), -A * Math.sin(th)]); } return out; })();
export function PhaseSpacePlot() {
  const [shape, setShape] = useState("blob");
  const init = shape === "blob" ? BLOB : RING;
  return <div>
    <div className="seg" style={{ marginBottom: 8 }}>
      <button className={shape === "blob" ? "on" : ""} onClick={() => setShape("blob")}>图 3.2 的偏心云团（非平衡）</button>
      <button className={shape === "ring" ? "on" : ""} onClick={() => setShape("ring")}>沿等能线铺开的环（平衡分布）</button>
    </div>
    <Plot key={shape}
      x={{ label: R`x`, domain: [-1.4, 1.4] }}
      y={{ label: R`p`, domain: [-1.1, 1.1] }}
      params={[
        { id: "t", label: R`t\ \ (m=k=1)`, min: 0, max: 12.57, step: 0.01, value: 3.0 },
        { id: "lam", label: R`\text{非谐系数}\ \sym{ch03-lamanh}{\lambda}\ (V=\tfrac12x^2+\tfrac14\sym{ch03-lamanh}{\lambda} x^4)`, min: 0, max: 3, step: 0.05, value: 0 },
      ]}
      series={p => {
        const now = init.map(q => P.evolve(q, p.t, p.lam));
        const c = [1.0, 0.2], E0 = P.energy(c, p.lam), path = [];
        for (let i = 0; i <= 200; i++) { const t = 2 * Math.PI * i / 200; path.push(P.evolve(c, t, p.lam)); }
        const A0 = P.hullArea(init), A1 = P.hullArea(now);
        return [
          { label: R`t_1=0`, data: init, points: true, color: "#bbb" },
          { label: R`t=${f2(p.t)}\ \ (\text{凸包面积}\ ${f2(A1, 3)}\ /\ \text{初始}\ ${f2(A0, 3)})`, data: now, points: true, color: "#2c4a6e" },
          { label: R`\text{云团中心的等能线}\ E=${f2(E0, 3)}`, data: path, color: "#c0392b", dash: "dot", width: 1.2 },
        ];
      }}
      height={420} samples={2} />
  </div>;
}

// ---------- 4. 扰动时空中光子能量的变化（式 3.71）----------
export function PhotonPlot() {
  return <Plot
    x={{ label: R`\text{光子位置}\ x/\sigma\ \ (\text{势井中心在}\ 0)`, domain: [-5, 5] }}
    y={{ label: R`\delta\ln(ap)\ \text{与}\ \Psi\ \ [\text{以}\ \Psi_0\ \text{为单位}]`, domain: [-1.3, 2.2] }}
    params={[
      { id: "eps", label: R`\varepsilon\ \ (\text{势井变浅}>0,\ \text{加深}<0)`, min: -0.6, max: 0.6, step: 0.01, value: 0.3 },
      { id: "tau", label: R`\tau/\sigma\ \ (\text{势变化的时标})`, min: 0.3, max: 6, step: 0.1, value: 3 },
    ]}
    series={p => {
      const gr = P.photonTrack({ eps: p.eps, tau: p.tau, ratio: -1 }), nw = P.photonTrack({ eps: p.eps, tau: p.tau, ratio: 0 });
      const st = P.photonTrack({ eps: 0, tau: 1, ratio: -1 });
      return [
        { label: R`\delta\ln(ap),\ \Phi=-\Psi\ \ (\text{终值}\ ${f2(gr.lnp.at(-1), 3)}\,\Psi_0)`, f: x => num.interp(gr.xs, gr.lnp, x), color: "#c0392b" },
        { label: R`\delta\ln(ap),\ \text{只有}\ \Psi\ (\Phi=0)\ \ (\text{终值}\ ${f2(nw.lnp.at(-1), 3)}\,\Psi_0)`, f: x => num.interp(nw.xs, nw.lnp, x), color: "#b8862b", dash: "dash" },
        { label: R`\text{静态势井}\ (\varepsilon=0)`, f: x => num.interp(st.xs, st.lnp, x), color: "#999", dash: "dot", width: 1.5 },
        { label: R`\text{光子所见的}\ \Psi(x(t),t)/\Psi_0`, f: x => num.interp(gr.xs, gr.psi, x), color: "#2c4a6e", dash: "dashdot", width: 1.5 },
      ];
    }}
    samples={300} />;
}

// ---------- 5. 引力偏折：光 vs 慢速粒子（式 3.72）----------
export function DeflectionPlot() {
  return <Plot
    x={{ label: R`v=p/E`, log: true, domain: [0.1, 1] }}
    y={{ label: R`\text{偏折角}\ \sym{ch03-defl}{\alpha}\ [\text{角秒}]`, log: true, domain: [0.1, 120] }}
    params={[{ id: "b", label: R`\text{碰撞参数}\ b/R_\odot\ (\text{太阳})`, min: 1, max: 10, step: 0.1, value: 1 }]}
    series={p => [
      { label: R`\text{GR}:\ \sym{ch03-defl}{\alpha}=(1+1/v^2)\,2GM/b\ \ (v=1:\ ${f2(P.deflGR(1, p.b), 3)}'')`, f: v => P.deflGR(v, p.b), color: "#c0392b" },
      { label: R`\text{牛顿}:\ \sym{ch03-defl}{\alpha}=(1/v^2)\,2GM/b\ \ (v=1:\ ${f2(P.deflNewton(1, p.b), 3)}'')`, f: v => P.deflNewton(v, p.b), color: "#1f1b16", dash: "dash" },
    ]}
    vlines={() => [{ x: 1, label: R`\text{光}` }]}
    samples={120} />;
}

// ---------- 6. 习题 3.9：有质量中微子的分布函数 ----------
export function NeutrinoFPlot() {
  return <Plot
    x={{ label: R`p\ [\mathrm{eV}]`, log: true, domain: [1e-6, 3e-2] }}
    y={{ label: R`f_\nu^{(0)}(p)`, domain: [0, 0.52] }}
    params={[
      { id: "m", label: R`m_\nu\ [\mathrm{eV}]`, min: 0, max: 0.3, step: 0.005, value: 0.06 },
      { id: "la", label: R`\log_{10}a_{\rm dec}`, min: -10, max: -2, step: 0.1, value: -9 },
    ]}
    series={p => {
      const ad = Math.pow(10, p.la), col = ["#c0392b", "#b8862b", "#2c6e49", "#2c4a6e"];
      return [
        ...[100, 10, 1, 0].map((z, i) => ({ label: R`z=${z}`, f: x => P.fnu(x, 1 / (1 + z), p.m, ad), color: col[i] })),
        ...[100, 0].map((z, i) => ({ label: R`m_\nu=0,\ z=${z}`, f: x => P.fnu(x, 1 / (1 + z), 0, ad), color: col[3 * i], dash: "dot", width: 1.5 })),
        { label: R`\text{错误的}\ 1/(e^{E/T_\nu}+1),\ z=100`, f: x => P.fnuWrong(x, 1 / 101, p.m), color: "#7d3c98", dash: "dash", width: 1.5 },
      ];
    }}
    vlines={p => [{ x: p.m || 1e-9, label: R`p=m_\nu` }]}
    samples={240} />;
}
