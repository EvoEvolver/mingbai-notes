// 第 4 章交互图。数值函数见 _ch04_phys.jsx（已用 node 与原书图 4.2 / 4.4 / 4.5 及文中数值核对）。
import { Plot, num } from "@kit";
import * as P from "./_ch04_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1000) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };
// 对数网格上的插值
const logInterp = (xs, ys) => { const lx = xs.map(Math.log); return x => num.interp(lx, ys, Math.log(x)); };

// ---------- 1. 图 4.2 交互版：中子–质子比 ----------
export function NeutronPlot() {
  return <Plot
    x={{ label: R`x=\mathcal Q/T\quad(\text{向右}=\text{更晚、更冷；}T=1.293\,\mathrm{MeV}/x)`, log: true, domain: [0.1, 100] }}
    y={{ label: R`n_n/n_p=X_n/(1-X_n)`, domain: [0, 1] }}
    params={[
      { id: "gs", label: R`g_*`, min: 8, max: 16, step: 0.05, value: 10.75 },
      { id: "tau", label: R`\tau_n\,[\mathrm s]`, min: 700, max: 1000, step: 1, value: 885.7 },
      { id: "Tn", label: R`T_{\rm nuc}\,[\mathrm{MeV}]`, min: 0.05, max: 0.1, step: 0.001, value: 0.07 },
    ]}
    series={p => {
      const sol = P.solveXn({ gstar: p.gs, tau: p.tau, x0: 0.05, x1: 300, n: 5000 });
      const Xn = logInterp(sol.xs, sol.X), Xinf = sol.X[sol.X.length - 1];
      const dec = x => Math.exp(-P.tOfT(P.Q_MEV / x) / p.tau);
      const xnuc = P.Q_MEV / p.Tn, XnNuc = Xn(xnuc) * dec(xnuc);
      const r = X => X / (1 - X);
      return [
        { label: R`\text{平衡}\ e^{-x}`, f: x => Math.exp(-x), dash: "dash", color: "#2c4a6e" },
        { label: R`\text{解 (4.26)：}X_n(\infty)=${f2(Xinf, 3)}`, f: x => r(Xn(x)), color: "#999", width: 1.5 },
        { label: R`\times e^{-t/\tau_n}\text{：}X_n(T_{\rm nuc})=${f2(XnNuc, 3)},\ Y_P=${f2(2 * XnNuc, 3)}`, f: x => x < xnuc ? r(Xn(x) * dec(x)) : NaN, color: "#c0392b" },
        { label: R`e^{-t/\tau_n}\times n/p(\infty)`, f: x => r(Xinf) * dec(x), dash: "dot", color: "#b8862b" },
      ];
    }}
    vlines={p => [
      { x: P.Q_MEV / 1, label: R`T=1\,\mathrm{MeV}` },
      { x: P.Q_MEV / p.Tn, label: R`T_{\rm nuc}` },
    ]}
    samples={240} />;
}

// ---------- 2. 氘的平衡丰度（式 4.16）与 T_nuc（式 4.29）----------
export function DeuteriumPlot() {
  return <Plot
    x={{ label: R`T\ [\mathrm{MeV}]`, log: true, domain: [0.03, 5] }}
    y={{ label: R`n_{\rm D}/n_{\rm b}`, log: true, domain: [1e-14, 1e4] }}
    params={[{ id: "eta", label: R`\eta_{\rm b}`, min: 1e-11, max: 1e-8, log: true, value: 6e-10 }]}
    series={p => [
      { label: R`\text{式 (4.16)，}\eta_{\rm b}=${sci(p.eta, 1)}\text{：}T_{\rm nuc}=${f2(P.Tnuc(p.eta), 3)}\,\mathrm{MeV},\ B_{\rm D}/T_{\rm nuc}=${f2(P.B_D / P.Tnuc(p.eta), 1)}`, f: T => P.nDoverNb(T, p.eta), color: "#c0392b" },
      { label: R`\eta_{\rm b}=1\ \text{（假想：光子与重子一样多）}`, f: T => P.nDoverNb(T, 1), dash: "dash", color: "#999" },
      { label: R`n_{\rm D}/n_{\rm b}=1`, f: () => 1, dash: "dot", color: "#1f1b16", width: 1.2 },
    ]}
    vlines={p => [
      { x: P.Tnuc(p.eta), label: R`T_{\rm nuc}` },
      { x: P.B_D, label: R`B_{\rm D}` },
    ]}
    samples={200} />;
}

const zHalf = f => { let lo = 500, hi = 1800; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (f(m) > 0.5) hi = m; else lo = m; } return lo; };
const zSaha = c => { let lo = 800, hi = 2500; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (P.XeSaha(m, c) > 0.5) hi = m; else lo = m; } return lo; };

// ---------- 3. 图 4.4 交互版：X_e(z)，Saha vs Peebles ----------
export function RecombPlot() {
  return <Plot
    x={{ label: R`z\quad(\text{向左}=\text{更晚})`, log: true, domain: [100, 3000] }}
    y={{ label: R`X_e`, log: true, domain: [1e-4, 1.5] }}
    params={[
      { id: "ob", label: R`\Omega_{\rm b}h^2`, min: 0.01, max: 0.04, step: 0.0005, value: 0.022 },
      { id: "om", label: R`\Omega_{\rm m}h^2`, min: 0.08, max: 0.2, step: 0.001, value: 0.14 },
    ]}
    series={p => {
      const c = P.cosmoRec({ obh2: p.ob, omh2: p.om, h: 0.7 });
      const mk = pe => { const s = P.solveXe(c, { peebles: pe, z0: 1800, z1: 90, n: 2500 }); return logInterp(s.zs.map(z => 1 + z).reverse(), s.X.slice().reverse()); };
      const XP = mk(true), XB = mk(false);
      const fP = z => z >= 1800 ? P.XeSaha(z, c) : XP(1 + z), fB = z => z >= 1800 ? P.XeSaha(z, c) : XB(1 + z);
      return [
        { label: R`\text{Saha (4.34)：}z_{1/2}=${Math.round(zSaha(c))}`, f: z => P.XeSaha(z, c), dash: "dot", color: "#1f1b16" },
        { label: R`\text{(4.36)}\times C\ \text{(Peebles)：}z_{1/2}=${Math.round(zHalf(fP))},\ X_e(100)=${sci(fP(100))}`, f: fP, color: "#c0392b" },
        { label: R`\text{(4.36)，}C=1\text{：}X_e(100)=${sci(fB(100))}`, f: fB, dash: "dash", color: "#2c4a6e" },
      ];
    }}
    vlines={p => {
      const c = P.cosmoRec({ obh2: p.ob, omh2: p.om, h: 0.7 });
      const s = P.solveXe(c, { peebles: true, z0: 1800, z1: 90, n: 2500 });
      const j = s.zs.findIndex((z, k) => P.scatOverHexact(z, s.X[k], c) < 1);
      return [
        { x: s.zs[j], label: R`z_{\rm dec}=${Math.round(s.zs[j])}` },
      ];
    }}
    samples={160} />;
}

// ---------- 4. 图 4.5 交互版：WIMP 冻结 ----------
let REFC = null;
const REF = () => REFC || (REFC = [1e5, 1e9].map(l => { const r = P.solveY(l, { x0: 1, x1: 1000, n: 3000 }); return logInterp(r.xs, r.Y); }));
export function WimpPlot() {
  return <Plot
    x={{ label: R`x=m_X/T`, log: true, domain: [1, 1000] }}
    y={{ label: R`Y=n_X/T^3`, log: true, domain: [1e-14, 0.1] }}
    params={[
      { id: "lam", label: R`\lambda`, min: 1e3, max: 1e13, log: true, value: 1.26e11 },
      { id: "m", label: R`m_X\,[\mathrm{GeV}]`, min: 10, max: 1e4, log: true, value: 100 },
    ]}
    series={p => {
      const sol = P.solveY(p.lam, { x0: 1, x1: 1000, n: 3000 }), Y = logInterp(sol.xs, sol.Y);
      const ref = REF();
      const Yinf = sol.Y[sol.Y.length - 1], xf = P.xFreeze(sol), sv = P.sigvFromLam(p.lam, p.m);
      return [
        { label: R`Y_{\rm EQ}`, f: x => P.Yeq(x), dash: "dot", color: "#1f1b16" },
        { label: R`\lambda=10^{5},\,10^{9}\ \text{(原书)}`, f: ref[0], color: "#999", width: 1.5 },
        { f: ref[1], color: "#999", width: 1.5, dash: "dash" },
        { label: R`\lambda=${sci(p.lam, 1)}\text{：}Y_\infty=${sci(Yinf)},\ x_f=${f2(xf, 1)}`, f: Y, color: "#c0392b" },
        { label: R`x_f/\lambda\ (x_f=20)`, f: () => 20 / p.lam, dash: "dash", color: "#2c6e49", width: 1.5 },
        { label: R`\langle\sigma v\rangle=${sci(sv)}\,\mathrm{cm^3s^{-1}}\Rightarrow\Omega_Xh^2=${sci(P.OmegaXh2(Yinf, p.m))}\ \text{（式 4.57：}${sci(P.OmegaXh2Book(sv, xf))}\text{）}`, f: () => NaN },
      ];
    }}
    vlines={p => { const xf = P.xFreeze(P.solveY(p.lam, { x0: 1, x1: 1000, n: 3000 })); return [{ x: xf, label: R`x_f` }]; }}
    samples={220} />;
}

// ---------- 5. 习题 4.2：e± 能量密度 / 光子能量密度 ----------
const ME = 0.511;
function epmRatio(T) {
  const y = ME / T, I = num.integrate(q => { const E = Math.sqrt(q * q + y * y); return q * q * E / (Math.exp(E) + 1); }, 0, 50 + y, 600);
  return 4 / (2 * Math.PI ** 2) * I / (Math.PI ** 2 / 15);
}
export function EpmPlot() {
  return <Plot
    x={{ label: R`T\ [\mathrm{MeV}]`, log: true, domain: [0.01, 3] }}
    y={{ label: R`\text{相对光子}`, log: true, domain: [1e-12, 5] }}
    params={[{ id: "eta", label: R`\eta_{\rm b}`, min: 1e-11, max: 1e-8, log: true, value: 6e-10 }]}
    series={p => [
      { label: R`\rho_{e^\pm}/\rho_\gamma`, f: epmRatio, color: "#c0392b" },
      { label: R`n_{e^-}^{(0)}/n_\gamma`, f: T => { const y = ME / T; return num.integrate(q => q * q / (Math.exp(Math.sqrt(q * q + y * y)) + 1), 0, 50 + y, 600) / (2 * P.ZETA3); }, color: "#2c4a6e", dash: "dash" },
      { label: R`\eta_{\rm b}\ (=n_{e^-}\text{ 的下限})`, f: () => p.eta, color: "#999", dash: "dot" },
      { label: R`1\%`, f: () => 0.01, color: "#1f1b16", dash: "dot", width: 1 },
    ]}
    samples={160} />;
}
