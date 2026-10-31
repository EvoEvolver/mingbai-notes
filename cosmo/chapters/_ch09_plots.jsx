// 第 9 章交互图。数值函数见 _ch09_phys.jsx（已用 node 核对，见交付报告）：
// 大尺度 Θ0+Ψ+ISW → −𝓡/5（−0.202）；物质期视界外 Φ → 0.602𝓡；可见度峰 z*=1092，r_s(η*)=144 Mpc，k_D(η*)=0.156 Mpc^-1；
// C(l) 近似模型峰位 l≈220/540/810/1130/1420/1730，高度 7.4/3.0/3.0/1.45/1.05/0.49（×1e-10，原书图 9.17：7.7/3.5/3.5/1.7/1.2/0.6）。
import { useEffect, useMemo, useState } from "react";
import { Plot, TxI, renderTex } from "@kit";
import * as P from "./_ch09_phys.jsx";

const R = String.raw;
const f2 = v => (Number.isFinite(v) ? (+v).toFixed(2) : R`\text{—}`);
const f3 = v => (Number.isFinite(v) ? (+v).toFixed(3) : R`\text{—}`);
const f0 = v => (Number.isFinite(v) ? (+v).toFixed(0) : R`\text{—}`);

// 自定义滑块（与 Plot 内置滑块同样式）
function Sl({ label, value, min, max, step, onChange, fmt = v => +(+v).toPrecision(3), log }) {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return <label className="plot-param">
    <span className="plot-plabel" dangerouslySetInnerHTML={{ __html: renderTex(`${label} = ${fmt(value)}`) }} />
    <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => onChange(fromS(+e.target.value))} />
  </label>;
}
const Note = ({ children }) => <p className="muted" style={{ margin: "0.4em 0 0", fontSize: 13.5 }}><TxI>{children}</TxI></p>;

// ---------- 1. 箱 9.1 / 图 9.3：受迫谐振子 ----------
export function OscillatorPlot() {
  const [F, setF] = useState(0.5), [w, setW] = useState(1);
  const A = -1;   // 初始位移与外力反向（与 Θ0+Ψ 的初值为负、引力把它推向正值相同）
  const cur = t => P.oscX(t, { A, F, w });
  const top = useMemo(() => () => [
    { label: R`F=0\ \text{（无外力）}`, f: t => P.oscX(t, { A, F: 0, w }), color: "#888", dash: "dot", width: 1.6 },
    { label: R`F=${f2(F)},\ \omega=${f2(w)}`, f: cur, color: "#1f1b16", width: 2.4 },
    { label: R`F=${f2(F)},\ 0.75\,\omega`, f: t => P.oscX(t, { A, F, w: 0.75 * w }), color: "#c0392b", dash: "dash", width: 1.6 },
    { label: R`F=${f2(F)},\ 1.5\,\omega`, f: t => P.oscX(t, { A, F, w: 1.5 * w }), color: "#2c6e49", dash: "dashdot", width: 1.6 },
  ], [F, w]);
  const bot = useMemo(() => () => [
    { label: R`x^2\ (F=0)`, f: t => P.oscX(t, { A, F: 0, w }) ** 2, color: "#888", dash: "dot", width: 1.6 },
    { label: R`x^2`, f: t => cur(t) ** 2, color: "#1f1b16", width: 2.4 },
    { label: R`0.75\,\omega`, f: t => P.oscX(t, { A, F, w: 0.75 * w }) ** 2, color: "#c0392b", dash: "dash", width: 1.6 },
    { label: R`1.5\,\omega`, f: t => P.oscX(t, { A, F, w: 1.5 * w }) ** 2, color: "#2c6e49", dash: "dashdot", width: 1.6 },
  ], [F, w]);
  const vl = useMemo(() => Array.from({ length: 6 }, (_, n) => ({ x: (n + 1) * Math.PI / w, label: n === 0 ? R`\pi/\omega` : "" })), [w]);
  const odd = (-A + F / (w * w)) ** 2, even = (A + F / (w * w)) ** 2;
  return <div>
    <div className="plot-params">
      <Sl label={R`F`} value={F} min={0} max={1} step={0.01} onChange={setF} />
      <Sl label={R`\omega=\sqrt{K/m}`} value={w} min={0.5} max={2} step={0.01} onChange={setW} />
    </div>
    <Plot x={{ label: R`t`, domain: [0, 20] }} y={{ label: R`x(t)`, domain: [-1.4, 3.6] }} series={top} vlines={vl} samples={400} height={260} />
    <Plot x={{ label: R`t`, domain: [0, 20] }} y={{ label: R`x^2(t)`, domain: [0, 6] }} series={bot} vlines={vl} samples={400} height={240} />
    <Note>{R`取 $A=-1$：振子从与外力反向的位移出发、初速为零（$\dot x(0)=0$ 只留下余弦模）。零点移到 $F/\omega^2=${f3(F / (w * w))}$；$x^2$ 的峰在 $t=n\pi/\omega$：奇数峰高 $(1+F/\omega^2)^2=${f3(odd)}$，偶数峰高 $(1-F/\omega^2)^2=${f3(even)}$。降低 $\omega$ 使零点偏移与奇偶不对称都变大。`}</Note>
  </div>;
}

// ---------- 2. 紧耦合玩具解（常数势、常数 R）：Θ0+Ψ = RΦ − (1/2+R)Φ cos(k r_s) ----------
export function ToyAcousticPlot() {
  return <Plot
    x={{ label: R`k\,r_s(\eta_*)`, domain: [0, 16] }}
    y={{ label: R`[(\Theta_0+\Psi)/\Phi]^2`, domain: [0, 4.2] }}
    params={[
      { id: "R", label: R`R`, min: 0, max: 1.5, step: 0.01, value: 0.6 },
      { id: "kd", label: R`k_Dr_s`, min: 4, max: 40, step: 0.5, value: 40 },
    ]}
    series={p => {
      const d = x => Math.exp(-((x / p.kd) ** 2));
      return [
        { label: R`R=0`, f: x => (P.toyAcoustic(x, 0) * d(x)) ** 2, color: "#888", dash: "dash", width: 1.4 },
        { label: R`R=${f2(p.R)}`, f: x => ((p.R - (0.5 + p.R) * Math.cos(x)) * d(x)) ** 2, color: "#c0392b", width: 2.4 },
        { label: R`\text{奇数峰 }(\tfrac12+2R)^2=${f3((0.5 + 2 * p.R) ** 2)},\ \text{偶数峰 }(\tfrac12)^2=0.25`, f: () => NaN },
      ];
    }}
    vlines={Array.from({ length: 5 }, (_, n) => ({ x: (n + 1) * Math.PI, label: R`${n + 1}\pi` }))}
    samples={500} height={330}
    caption={R`玩具模型：令 $\Phi=-\Psi$ 与 $R$ 都为常数，\eqref{9.22} 的解为 $\Theta_0+\Phi=(2+R)\Phi+[\Theta_0(0)+\Phi(0)-(2+R)\Phi]\cos(kr_s)$；取 $\Theta_0(0)=\Phi/2$ 并减去 $2\Phi$ 得可观测量 $\Theta_0+\Psi=R\Phi-(\tfrac12+R)\Phi\cos(kr_s)$。峰恰在 $kr_s=n\pi$（\eqref{9.27}）；$R=0$ 时奇偶峰等高，$R>0$ 时奇数峰（压缩）变高。$k_Dr_s$ 滑块乘上阻尼因子 $e^{-k^2/k_D^2}$（\secref{9.4}）。真实情形中势随时间衰减（辐射驱动），见下一图的数值解。`} />;
}

// ---------- 3. 图 9.1：四个模式的 Θ0+Ψ 演化（简化 Boltzmann 数值解）----------
const C0 = P.cosmo(), REC0 = P.recHistory(C0);
const modeCache = new Map();
const modeOf = k => { const key = (+k).toPrecision(4); if (!modeCache.has(key)) { if (modeCache.size > 80) modeCache.clear(); modeCache.set(key, P.solveMode(k, C0, REC0, { aEnd: 0, nOut: 160, aOut: [1e-6] })); } return modeCache.get(key); };
const etaStar0 = C0.etaOf(REC0.aStar);
const REFK = [[0.005, "#1f1b16", "", "视界外"], [0.020, "#c0392b", "dash", "第 1 峰"], [0.031, "#2c6e49", "dashdot", "第 1 谷"], [0.039, "#2c4a6e", "", "第 2 峰"]];
export function ModesPlot() {
  return <Plot
    x={{ label: R`\eta/\eta_*`, domain: [0, 1] }}
    y={{ label: R`(\Theta_0+\Psi)/\Phi(k,\eta=0)`, domain: [-0.8, 1.2] }}
    params={[{ id: "k", label: R`k\ [\mathrm{Mpc^{-1}}]`, min: 0.001, max: 0.15, log: true, value: 0.06 }]}
    series={p => {
      const refs = REFK.map(([k, col, dash, name]) => { const m = modeOf(k); return { label: R`\text{${name}：}k=${k}`, data: m.out.a.map((a, i) => [C0.etaOf(a) / etaStar0, m.out.th0psi[i]]), color: col, dash, width: 1.6 }; });
      const m = modeOf(p.k);
      return [...refs,
        { label: R`k=${f3(p.k)}\ \mathrm{Mpc^{-1}}`, data: m.out.a.map((a, i) => [C0.etaOf(a) / etaStar0, m.out.th0psi[i]]), color: "#d35400", width: 3 },
        { label: R`(\Theta_0+\Psi)(\eta_*)=${f3(m.th0psiStar)},\ kr_s(\eta_*)/\pi=${f2(p.k * C0.rsOf(REC0.aStar) / Math.PI)}`, f: () => NaN }];
    }}
    samples={10} height={380} />;
}

// ---------- 4. 图 9.2 / 9.7：复合时的单极与偶极随 k 的分布 ----------
const specCache = new Map();
function recSpec(obh2, och2) {
  const key = obh2.toFixed(4) + "," + och2.toFixed(4);
  if (specCache.has(key)) return specCache.get(key);
  const c = P.cosmo({ obh2, och2 }), rec = P.recHistory(c), rs = c.rsOf(rec.aStar);
  const K = [], M = [], D = [], DF = [];
  for (let k = 0.3 / c.eta0; k <= 1600 / c.eta0; k += 0.3 / rs) { const s = P.solveMode(k, c, rec, { aEnd: 0, rtol: 1e-4 }); K.push(k); M.push(s.th0psiStar); D.push(3 * s.th1Star); DF.push(rec.dampAvg(k)); }
  const r = { c, rec, rs, K, M, D, DF };
  if (specCache.size > 40) specCache.clear();
  specCache.set(key, r); return r;
}
export function RecSpectrumPlot({ dipole = false }) {
  return <Plot
    x={{ label: R`k\eta_0`, domain: [0, 1500] }}
    y={{ label: dipole ? R`[\Theta_0+\Psi]^2,\ [3\Theta_1]^2\ \ (/\Phi(k,0)^2)` : R`[(\Theta_0+\Psi)/\Phi(k,\eta=0)]^2`, domain: [0, 1.6] }}
    params={[
      { id: "ob", label: R`\Omega_{\rm b}h^2`, min: 0.0022, max: 0.04, step: 0.0002, value: P.FID.obh2 },
      { id: "oc", label: R`\Omega_{\rm c}h^2`, min: 0.05, max: 0.2, step: 0.001, value: P.FID.och2 },
    ]}
    series={p => {
      const s = recSpec(p.ob, p.oc), e0 = s.c.eta0, f = s0 => s0.K.map((k, i) => [k * s0.c.eta0, s0.M[i] ** 2 * s0.DF[i] ** 2]);
      const out = [
        { label: dipole ? R`\Theta_0+\Psi\ \text{（含阻尼）}` : R`\text{当前参数（含阻尼 (9.60)）}`, data: f(s), color: "#1f1b16", width: 2.4 },
        { label: R`\text{未计阻尼}`, data: s.K.map((k, i) => [k * e0, s.M[i] ** 2]), color: "#888", dash: "dot", width: 1.2 },
      ];
      if (dipole) out.push({ label: R`3\Theta_1\ \text{（含阻尼）}`, data: s.K.map((k, i) => [k * e0, (s.D[i] * s.DF[i]) ** 2]), color: "#c0392b", dash: "dash", width: 2 });
      else {
        const b = recSpec(P.FID.obh2 / 10, P.FID.och2), cc = recSpec(P.FID.obh2, P.FID.och2 / 2);
        out.push({ label: R`\Omega_{\rm b}=\Omega_{\rm b}^{\rm fid}/10`, data: f(b), color: "#c0392b", dash: "dash", width: 1.4 });
        out.push({ label: R`\Omega_{\rm c}=\Omega_{\rm c}^{\rm fid}/2`, data: f(cc), color: "#2c6e49", dash: "dashdot", width: 1.4 });
      }
      out.push({ label: R`r_s(\eta_*)=${f0(s.rs)}\,\mathrm{Mpc},\ \eta_0=${f0(e0)}\,\mathrm{Mpc},\ \pi\eta_0/r_s=${f0(Math.PI * e0 / s.rs)},\ R_*=${f2(s.c.Rof(s.rec.aStar))}`, f: () => NaN });
      return out;
    }}
    vlines={p => { const s = recSpec(p.ob, p.oc); return [1, 2, 3, 4].map(n => ({ x: n * Math.PI * s.c.eta0 / s.rs, label: n === 1 ? R`n\pi\eta_0/r_s` : "" })); }}
    samples={10} height={400} />;
}

// ---------- 5. 图 9.8：阻尼尺度 ----------
export function DampingPlot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-4, 1.1e-3] }}
    y={{ label: R`k_D^{-1}\ [h^{-1}\mathrm{Mpc}]`, log: true, domain: [0.06, 30] }}
    params={[{ id: "ob", label: R`\Omega_{\rm b}h^2`, min: 0.01, max: 0.04, step: 0.0005, value: P.FID.obh2 }]}
    series={p => {
      const c = P.cosmo({ obh2: p.ob }), rec = P.recHistory(c), h = c.h;
      const pick = arr => rec.A.map((a, i) => [a, Math.sqrt(arr[i]) * h]).filter(([a]) => a >= 0.95e-4 && a <= 1.12e-3);
      const kdS = Math.sqrt(rec.kD2Star);
      return [
        { label: R`\text{(9.42)，含复合（tanh 型 }x_e\text{）}`, data: pick(rec.KD2), color: "#1f1b16", width: 2.4 },
        { label: R`\text{(9.42)，全电离、含 }R`, data: pick(rec.KD2ion), color: "#c0392b", dash: "dash", width: 2 },
        { label: R`\text{(9.44)，系数 }7.7\times10^6`, f: a => h / P.kD944(a, c), color: "#2c6e49", dash: "dashdot", width: 1.6 },
        { label: R`\text{原书误印系数 }3.1\times10^6`, f: a => h / P.kD944(a, c, 3.1e6), color: "#7d3c98", dash: "dot", width: 1.6 },
        { label: R`k_D(\eta_*)=${f3(1 / kdS)}\,\mathrm{Mpc^{-1}},\ k_D\eta_0=${f0(c.eta0 / kdS)}`, f: () => NaN },
      ];
    }}
    vlines={p => { const rec = P.recHistory(P.cosmo({ obh2: p.ob })); return [{ x: rec.aStar, label: R`a_*` }]; }}
    samples={120} height={380} />;
}

// ---------- 6. 图 9.9：可见度函数与积分核的另外两部分 ----------
export function VisibilityPlot() {
  const d = useMemo(() => {
    const c = C0, rec = REC0, h = c.h, k = 0.02, l = 220;
    const g = rec.A.map((a, i) => [1 / a - 1, rec.G[i] / h]).filter(([z]) => z >= 500 && z <= 1500).reverse();
    const late = P.solveMode(k, c, { ...rec, aStar: 1 / 501 }, { aEnd: 0, nOut: 200, aOut: [1 / 1601] });
    const th = late.out.a.map((a, i) => [1 / a - 1, late.out.th0psi[i]]).reverse();
    const sc = 0.018 / Math.max(...th.filter(([z]) => z > 900 && z < 1200).map(([, v]) => Math.abs(v)));
    const jj = g.map(([z]) => { const eta = c.etaOf(1 / (1 + z)); return [z, P.jl(l, k * (c.eta0 - eta))]; });
    let gm = 0, zm = 0; for (const [z, v] of g) if (v > gm) { gm = v; zm = z; }
    const half = g.filter(([, v]) => v > gm / 2).map(([z]) => z);
    return { g, th: th.map(([z, v]) => [z, v * sc]), jj, gm, zm, fwhm: Math.max(...half) - Math.min(...half) };
  }, []);
  return <Plot
    x={{ label: R`z`, domain: [550, 1450] }}
    y={{ label: R`\text{被积函数的三部分}`, domain: [-0.01, 0.04] }}
    series={() => [
      { label: R`g\ [h\,\mathrm{Mpc^{-1}}]`, data: d.g, color: "#1f1b16", width: 2.4 },
      { label: R`\Theta_0+\Psi\ \text{[任意单位]}`, data: d.th, color: "#c0392b", dash: "dash", width: 1.8 },
      { label: R`j_{220}[k(\eta_0-\eta)]`, data: d.jj, color: "#2c6e49", dash: "dot", width: 1.8 },
      { label: R`g\ \text{峰值 }z=${f0(d.zm)},\ \text{半高全宽 }\Delta z=${f0(d.fwhm)}`, f: () => NaN },
    ]}
    samples={10} height={360}
    caption={R`$l=220$、$k=0.02\,\mathrm{Mpc^{-1}}$（第一峰）。横轴为红移（原书图中 $z$ 从左到右递减）。$g(\eta)$ 由 tanh 型电离分数 $x_e(z)$ 计算（峰位 $z\approx1090$、宽度 $\Delta z\approx200$，与标准复合历史相近）；$\Theta_0+\Psi$ 为紧耦合解，复合之后的部分仅作示意。$g$ 的变化远快于另两者，所以可以把它们在 $\eta_*$ 处取值后提出积分号。`} />;
}

// ---------- 7. 图 9.13：球 Bessel 函数平方 ----------
export function BesselPlot() {
  const jsq = x => { const L = Math.ceil(1.25 * x) + 5, arr = P.jlArray(L, x); return arr.map((v, l) => [l, 1e4 * v * v]); };
  return <Plot
    x={{ label: R`l`, domain: [0, 260] }}
    y={{ label: R`[j_l(x)]^2\times10^4`, domain: [0, 16] }}
    params={[{ id: "x", label: R`x`, min: 20, max: 200, step: 1, value: 100 }]}
    series={p => {
      const a = jsq(50), b = jsq(p.x);
      let lp = 0, vm = 0; for (const [l, v] of b) if (v > vm) { vm = v; lp = l; }
      return [
        { label: R`x=50`, data: a, color: "#2c4a6e", dash: "dash", width: 1.2 },
        { label: R`x=${p.x}`, data: b, color: "#d35400", width: 2 },
        { label: R`\text{峰值 }l_{\rm pk}=${lp},\ l_{\rm pk}/x=${f3(lp / p.x)};\ \text{渐近式 }l_{\rm pk}\approx x-0.81\,x^{1/3}-\tfrac12=${f2(p.x - 0.808 * p.x ** (1 / 3) - 0.5)}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: p.x, label: R`l=x` }]}
    samples={10} height={360} />;
}

// ---------- 8. 图 9.11：大角度 SW 高原 ----------
const lowCache = new Map();
const lowOf = (ns, OL, isw) => { const k = [ns, OL, isw].join(","); if (!lowCache.has(k)) { if (lowCache.size > 40) lowCache.clear(); lowCache.set(k, P.lowL({ ns, OL, isw })); } return lowCache.get(k); };
export function SWPlot() {
  return <Plot
    x={{ label: R`l`, domain: [2, 30] }}
    y={{ label: R`[l(l+1)/2\pi]C(l)\times10^{10}`, domain: [0, 2.5] }}
    params={[
      { id: "ns", label: R`n_s`, min: 0.9, max: 1.1, step: 0.005, value: 0.965 },
      { id: "OL", label: R`\Omega_\Lambda`, min: 0, max: 0.9, step: 0.01, value: 0.69 },
    ]}
    series={p => {
      const r0 = lowOf(p.ns, p.OL, false), r1 = lowOf(p.ns, p.OL, true), As = P.FID.As;
      const pts = (C) => C.map((v, l) => [l, l * (l + 1) * v / (2 * Math.PI) * 1e10]).slice(2);
      return [
        { label: R`\text{SW，精确 Bessel 积分 (9.78)}`, data: pts(r0.Csw), color: "#1f1b16", width: 2.2 },
        { label: R`\text{SW + 晚期 ISW}`, data: pts(r1.Cl), color: "#c0392b", width: 2.2 },
        { label: R`\text{(9.79) 解析式}`, data: Array.from({ length: 29 }, (_, i) => { const l = i + 2; return [l, l * (l + 1) * P.clSW979(l, { ns: p.ns, As, eta0: r0.chiStar }) / (2 * Math.PI) * 1e10]; }), color: "#2c6e49", dash: "dash", width: 1.6 },
        { label: R`\text{(9.80)：}\tfrac{2\pi}{25}\mathcal A_s\ (n_s=1)`, f: () => As / 25 * 1e10, color: "#2c4a6e", dash: "dot", width: 1.6 },
        { label: R`\text{原书误印：}\tfrac{8}{25}\mathcal A_s`, f: () => 8 / 25 * As / (2 * Math.PI) * 1e10, color: "#7d3c98", dash: "dashdot", width: 1.2 },
      ];
    }}
    samples={60} height={380} />;
}

// ---------- 9. 图 9.12：单极、偶极、早期 ISW 的贡献 ----------
const LS = (() => { const o = []; for (let l = 2; l < 30; l += 2) o.push(l); for (let l = 30; l <= 2500; l += 10) o.push(l); return o; })();
export function ClContribPlot() {
  const d = useMemo(() => {
    const get = o => { const r = P.clModel({}, LS, { reion: false, ...o }); return LS.map((l, i) => [l, P.Dl(l, r.C[i]) * 1e10]); };
    return { m: get({ dipole: false, isw: false }), md: get({ isw: false }), all: get({}), coh: get({ isw: "coherent" }) };
  }, []);
  return <Plot
    x={{ label: R`l`, domain: [2, 1000] }}
    y={{ label: R`[l(l+1)/2\pi]C(l)\times10^{10}`, domain: [0, 9] }}
    series={() => [
      { label: R`\text{只有单极 }\Theta_0+\Psi`, data: d.m, color: "#1f1b16", width: 2.2 },
      { label: R`\text{+ 偶极}`, data: d.md, color: "#c0392b", dash: "dash", width: 2 },
      { label: R`\text{+ 早期 ISW（带相位）}`, data: d.all, color: "#2c6e49", dash: "dashdot", width: 2 },
      { label: R`\text{+ 早期 ISW（按 (9.81) 全部同相）}`, data: d.coh, color: "#7d3c98", dash: "dot", width: 1.4 },
    ]}
    samples={10} height={380} />;
}

// ---------- 10. 图 9.15–9.18：参数依赖（近似模型）----------
const PARAMS = {
  OK: { label: R`\Omega_K`, min: -0.1, max: 0.1, step: 0.005, fid: 0 },
  obh2: { label: R`\Omega_{\rm b}h^2`, min: 0.012, max: 0.035, step: 0.0005, fid: P.FID.obh2 },
  och2: { label: R`\Omega_{\rm c}h^2`, min: 0.07, max: 0.2, step: 0.002, fid: P.FID.och2 },
  tau: { label: R`\tau_{\rm rei}`, min: 0, max: 0.15, step: 0.002, fid: P.FID.tau },
  ns: { label: R`n_s`, min: 0.9, max: 1.05, step: 0.002, fid: P.FID.ns },
  lnAs: { label: R`\ln(10^{10}\mathcal A_s)`, min: 2.8, max: 3.3, step: 0.005, fid: 3.048 },
};
export function ClParamPlot({ focus = ["obh2"], lmax = 2000 }) {
  const order = [...focus, ...Object.keys(PARAMS).filter(k => !focus.includes(k))];
  const init = Object.fromEntries(Object.entries(PARAMS).map(([k, v]) => [k, v.fid]));
  const [p, setP] = useState(init), [pc, setPc] = useState(init), [busy, setBusy] = useState(false);
  useEffect(() => {
    if (JSON.stringify(p) === JSON.stringify(pc)) return;
    setBusy(true);
    const t = setTimeout(() => { setPc(p); setBusy(false); }, 160);
    return () => clearTimeout(t);
  }, [p]);
  const fid = useMemo(() => { const r = P.clModel({}, LS); return LS.map((l, i) => [l, P.Dl(l, r.C[i]) * 1e10]); }, []);
  const cur = useMemo(() => {
    const q = { OK: pc.OK, obh2: pc.obh2, och2: pc.och2, tau: pc.tau, ns: pc.ns, As: Math.exp(pc.lnAs) * 1e-10 };
    const r = P.clModel(q, LS);
    const D = LS.map((l, i) => [l, P.Dl(l, r.C[i]) * 1e10]);
    const pk = []; for (let i = 1; i < D.length - 1; i++) if (D[i][1] > D[i - 1][1] && D[i][1] >= D[i + 1][1] && D[i][0] > 120) pk.push(D[i]);
    return { D, r, pk: pk.slice(0, 3) };
  }, [pc]);
  const series = useMemo(() => () => [
    { label: R`\text{基准（Planck 2018）}`, data: fid, color: "#999", width: 1.6 },
    { label: R`\text{当前参数}`, data: cur.D, color: "#c0392b", width: 2.4 },
    { label: R`\text{峰：}${cur.pk.map(([l, v]) => `${l}\\,(${f2(v)})`).join(",\\ ")};\ r_s=${f0(cur.r.rsStar)}\,\mathrm{Mpc},\ D_A=${f0(cur.r.DA)}\,\mathrm{Mpc}`, f: () => NaN },
  ], [cur]);
  return <div>
    <div className="plot-params">
      {order.map(k => <Sl key={k} label={PARAMS[k].label} value={p[k]} min={PARAMS[k].min} max={PARAMS[k].max} step={PARAMS[k].step} onChange={v => setP(s => ({ ...s, [k]: v }))} fmt={v => +(+v).toFixed(k === "obh2" ? 4 : 3)} />)}
      <button className="plot-reset" onClick={() => setP(init)}>重置</button>
      {busy && <span className="muted" style={{ fontSize: 13 }}>计算中…</span>}
    </div>
    <Plot x={{ label: R`l`, domain: [2, lmax] }} y={{ label: R`[l(l+1)/2\pi]C(l)\times10^{10}`, domain: [0, 9.5] }} series={series} samples={10} height={400} />
  </div>;
}

// ---------- 11. 图 9.14：曲率与角直径距离 ----------
export function CurvatureGeometry() {
  const [OK, setOK] = useState(0.3);
  const c0 = P.cosmo(), cK = P.cosmo({ OK });
  const chi0 = c0.eta0 - c0.etaOf(REC0.aStar), recK = P.recHistory(cK), chiK = cK.eta0 - cK.etaOf(recK.aStar), DA = cK.SK(chiK);
  const ratio = chi0 / DA;                       // θ_K / θ_Eucl（同一物理尺度）
  const W = 520, H = 360, cx = W / 2, cy = 330, Rr = 300;
  const thE = 0.62, thK = thE * ratio;           // 示意：把角度放大到可见
  const P1 = [cx - Rr * Math.sin(thE / 2), cy - Rr * Math.cos(thE / 2)], P2 = [cx + Rr * Math.sin(thE / 2), cy - Rr * Math.cos(thE / 2)];
  const ctrl = s => { const L = Rr * 0.5; return [cx + s * L * Math.sin(thK / 2), cy - L * Math.cos(thK / 2)]; };
  const C1 = ctrl(-1), C2 = ctrl(1);
  const arc = (r, a) => `M${cx - r * Math.sin(a / 2)},${cy - r * Math.cos(a / 2)} A${r},${r} 0 0 1 ${cx + r * Math.sin(a / 2)},${cy - r * Math.cos(a / 2)}`;
  return <div className="plot card">
    <div className="plot-params"><Sl label={R`\Omega_K`} value={OK} min={-0.3} max={0.3} step={0.01} onChange={setOK} /></div>
    <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      <path d={`M${cx - Rr},${cy} A${Rr},${Rr} 0 0 1 ${cx + Rr},${cy}`} fill="none" stroke="#1f1b16" strokeWidth={2} />
      <line x1={cx} y1={cy} x2={P1[0]} y2={P1[1]} stroke="#1f1b16" strokeWidth={1.8} />
      <line x1={cx} y1={cy} x2={P2[0]} y2={P2[1]} stroke="#1f1b16" strokeWidth={1.8} />
      {Math.abs(OK) > 1e-3 && <path d={`M${cx},${cy} Q${C1[0]},${C1[1]} ${P1[0]},${P1[1]}`} fill="none" stroke="#c0392b" strokeWidth={1.8} strokeDasharray="6 4" />}
      {Math.abs(OK) > 1e-3 && <path d={`M${cx},${cy} Q${C2[0]},${C2[1]} ${P2[0]},${P2[1]}`} fill="none" stroke="#c0392b" strokeWidth={1.8} strokeDasharray="6 4" />}
      <path d={arc(70, thE)} fill="none" stroke="#1f1b16" strokeWidth={1.2} />
      {Math.abs(OK) > 1e-3 && <path d={arc(45, thK)} fill="none" stroke="#c0392b" strokeWidth={1.4} />}
      <circle cx={cx} cy={cy} r={6} fill="#2c4a6e" />
      <line x1={P1[0]} y1={P1[1]} x2={P2[0]} y2={P2[1]} stroke="#d35400" strokeWidth={4} opacity={0.5} />
      <foreignObject x={cx - 60} y={P1[1] - 34} width={120} height={26}><div style={{ textAlign: "center", fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderTex(R`\text{同一物理尺度}`) }} /></foreignObject>
      <foreignObject x={cx + 40} y={cy - 100} width={130} height={26}><div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderTex(R`\theta_{\rm Eucl}`) }} /></foreignObject>
      {Math.abs(OK) > 1e-3 && <foreignObject x={cx - 140} y={cy - 80} width={110} height={26}><div style={{ fontSize: 13, color: "#c0392b", textAlign: "right" }} dangerouslySetInnerHTML={{ __html: renderTex(OK > 0 ? R`\theta_{\rm open}` : R`\theta_{\rm closed}`) }} /></foreignObject>}
    </svg>
    <Note>{R`黑色实线：平直宇宙中的光线（直线）；红色虚线：${OK > 0 ? "开放宇宙中的光线（向外发散——从观测者看，同一对端点的张角变小）" : OK < 0 ? "闭合宇宙中的光线（会聚——张角变大）" : "（$\\Omega_K=0$，两者重合）"}。保持 $h$、$\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$ 不变、用 $\Omega_\Lambda$ 补偿：$\chi_*=${f0(chiK)}\,\mathrm{Mpc}$，角直径距离 $D_A=${f0(DA)}\,\mathrm{Mpc}$（平直基准 $${f0(chi0)}\,\mathrm{Mpc}$）。$\theta_K/\theta_{\rm Eucl}=${f3(ratio)}$，第一峰 $l\approx220\times${f3(1 / ratio)}=${f0(220 / ratio)}$。图中角度为示意性放大。`}</Note>
  </div>;
}
