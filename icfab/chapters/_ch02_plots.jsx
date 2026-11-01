// 第 2 章交互图（浏览器内真算）。数值已用 node 与原书文字/图对照（见各函数注释）。
import { useState } from "react";
import { Plot, M } from "@kit";

const R = String.raw;
const q = 1.602e-19, eps0 = 8.854e-14, kB = 8.617e-5;   // C；F/cm；eV/K
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return "—"; const e = Math.floor(Math.log10(Math.abs(v))); const m = v / 10 ** e; return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : `${m.toFixed(d - 1)}\\times10^{${e}}`; };

// ---------- §2.3 ① 晶圆直径与每片芯片数 ----------
// DPW = π d²/(4A) − π d/√(2A)（d 为扣除边缘后的有效直径）。原书：硅片约 1 美元/英寸²，300 mm 片约 100 美元。
export const dpw = (d, A) => Math.max(0, Math.PI * d * d / (4 * A) - Math.PI * d / Math.sqrt(2 * A));
export function DiePlot() {
  return <Plot
    x={{ label: R`\text{晶圆直径}\ D_{\rm w}\ [\mathrm{mm}]`, domain: [75, 460] }}
    y={{ label: R`\text{每片芯片数}`, log: true, domain: [3, 3e4] }}
    params={[
      { id: "A", label: R`\text{芯片面积}\ A\,[\mathrm{mm^2}]`, min: 10, max: 600, log: true, value: 100 },
      { id: "e", label: R`\text{边缘去除}\ [\mathrm{mm}]`, min: 0, max: 6, step: 0.5, value: 3 },
    ]}
    series={p => {
      const d300 = 300 - 2 * p.e, n300 = dpw(d300, p.A), cost = Math.PI * (300 / 25.4) ** 2 / 4;   // 美元（1 美元/英寸²）
      return [
        { label: R`\text{可用整片芯片数}`, f: d => dpw(d - 2 * p.e, p.A) },
        { label: R`\text{面积比}\ \pi D_{\rm w}^2/4A\ (\text{无边缘损失})`, f: d => Math.PI * (d - 2 * p.e) ** 2 / (4 * p.A), dash: "dash" },
        { label: R`300\,\mathrm{mm}:\ ${Math.round(n300)}\ \text{颗，边缘损失}\ ${(100 * (1 - n300 * 4 * p.A / (Math.PI * d300 * d300))).toFixed(0)}\%\text{，硅片成本}\approx\$${(cost / Math.max(n300, 1e-9)).toFixed(2)}/\text{颗}`, f: () => NaN },
      ];
    }}
    vlines={() => [{ x: 150, label: "150" }, { x: 200, label: "200" }, { x: 300, label: "300 mm" }, { x: 450, label: "450" }]}
    samples={120} />;
}

// ---------- §2.3 ② 掺杂浓度与电阻率 ----------
// Caughey–Thomas 迁移率拟合（300 K）：μ = μmin + (μmax−μmin)/(1+(N/Nref)^α)。核对：p 型 1e15 → 13.5 Ω·cm；n 型 1e15 → 4.6 Ω·cm（原书："约 1e15 对应 5–20 Ω·cm"）。
const mob = (N, a) => a[0] + (a[1] - a[0]) / (1 + (N / a[2]) ** a[3]);
const MU_N = [68.5, 1414, 9.2e16, 0.711], MU_P = [44.9, 470.5, 2.23e17, 0.719];
export const rhoP = N => 1 / (q * N * mob(N, MU_P)), rhoN = N => 1 / (q * N * mob(N, MU_N));
export function ResistivityPlot() {
  return <Plot
    x={{ label: R`\text{掺杂浓度}\ N\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e13, 1e20] }}
    y={{ label: R`\rho\ [\Omega\cdot\mathrm{cm}]`, log: true, domain: [5e-4, 2e3] }}
    params={[{ id: "N", label: R`N\,[\mathrm{cm^{-3}}]`, min: 1e13, max: 1e20, log: true, value: 1e15 }]}
    series={p => [
      { label: R`p\ \text{型（硼）}`, f: rhoP, color: "#c0392b" },
      { label: R`n\ \text{型（磷）}`, f: rhoN, color: "#2c4a6e" },
      { label: R`N=${sci(p.N)}:\ \rho_p=${sci(rhoP(p.N), 3)},\ \rho_n=${sci(rhoN(p.N), 3)}\ \Omega\cdot\mathrm{cm}`, f: () => NaN },
    ]}
    vlines={p => [{ x: p.N, label: R`N` }]}
    samples={160} />;
}

// ---------- §2.5 阱注入与推进退火（对照图 2.8） ----------
// 高斯注入 C = Q/(√(2π)ΔRp)·exp(−(x−Rp)²/2ΔRp²)；退火后 σ² = ΔRp² + 2Dt；硼本征扩散 D = 0.76 exp(−3.46 eV/kT) cm²/s。
// 默认参数（Q=1e13，ΔRp=9 nm，Rp=0，1000 °C 10 min）：注入峰 4.4e18、退火后表面 9.0e17、75 nm 处 2.1e17——与图 2.8 的 ≈4.5e18、≈9e17、≈2e17 一致。
export const DB = T => 0.76 * Math.exp(-3.46 / (kB * (T + 273.15)));
const gauss = (x, Q, Rp, s) => Q / (Math.sqrt(2 * Math.PI) * s) * Math.exp(-((x - Rp) ** 2) / (2 * s * s));
export function WellPlot() {
  return <Plot
    x={{ label: R`\text{深度}\ x\ [\mathrm{nm}]\ (\text{硅表面为 0})`, domain: [0, 80] }}
    y={{ label: R`N(x)\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 1e19] }}
    params={[
      { id: "Q", label: R`Q\,[\mathrm{cm^{-2}}]`, min: 1e12, max: 1e14, log: true, value: 1e13 },
      { id: "Rp", label: R`R_p\,[\mathrm{nm}]`, min: -10, max: 40, step: 1, value: 0 },
      { id: "dR", label: R`\Delta R_p\,[\mathrm{nm}]`, min: 3, max: 30, step: 0.5, value: 9 },
      { id: "T", label: R`T\,[^\circ\mathrm{C}]`, min: 800, max: 1150, step: 5, value: 1000 },
      { id: "t", label: R`t\,[\mathrm{min}]`, min: 0.1, max: 120, log: true, value: 10 },
    ]}
    series={p => {
      const Dt2 = 2 * DB(p.T) * p.t * 60 * 1e14;   // nm²
      const s = Math.sqrt(p.dR ** 2 + Dt2);
      return [
        { label: R`\text{注入后}`, f: x => gauss(x * 1e-7, p.Q, p.Rp * 1e-7, p.dR * 1e-7), dash: "dash", color: "#999" },
        { label: R`\text{退火后}`, f: x => gauss(x * 1e-7, p.Q, p.Rp * 1e-7, s * 1e-7), color: "#c0392b" },
        { label: R`D=${sci(DB(p.T))}\,\mathrm{cm^2/s},\ \sqrt{2Dt}=${Math.sqrt(Dt2).toFixed(1)}\,\mathrm{nm},\ \sigma=${s.toFixed(1)}\,\mathrm{nm}`, f: () => NaN },
      ];
    }}
    samples={160} />;
}

// ---------- §2.6 阈值调整：ΔV_TH = qQ_i/C_ox，C_ox = Kε0/d ----------
// 核对：Q=6e12 cm⁻²、2 nm SiO2 → C_ox=1.73e-6 F/cm²，ΔV=0.56 V。
export const dVth = (Q, tox, K) => q * Q * tox * 1e-7 / (K * eps0);
export function VtPlot() {
  return <Plot
    x={{ label: R`Q_i\ [\mathrm{cm^{-2}}]`, log: true, domain: [1e11, 3e13] }}
    y={{ label: R`\Delta V_{\rm TH}\ [\mathrm V]`, log: true, domain: [1e-3, 20] }}
    params={[
      { id: "tox", label: R`d\,[\mathrm{nm}]`, min: 0.8, max: 20, log: true, value: 2 },
      { id: "K", label: R`K`, min: 3.9, max: 25, step: 0.1, value: 3.9 },
    ]}
    series={p => [
      { label: R`d=${(+p.tox).toFixed(2)}\,\mathrm{nm},\ K=${(+p.K).toFixed(1)}`, f: Q => dVth(Q, p.tox, p.K), color: "#c0392b" },
      { label: R`1.2\,\mathrm{nm}\ \mathrm{SiO_2}`, f: Q => dVth(Q, 1.2, 3.9), dash: "dash", color: "#2c4a6e" },
      { label: R`10\,\mathrm{nm}\ \mathrm{SiO_2}`, f: Q => dVth(Q, 10, 3.9), dash: "dot", color: "#2c6e49" },
      { label: R`C_{\rm ox}=${sci(p.K * eps0 / (p.tox * 1e-7), 3)}\,\mathrm{F/cm^2};\ Q_i=6\times10^{12}:\ \Delta V_{\rm TH}=${dVth(6e12, p.tox, p.K).toFixed(3)}\,\mathrm V`, f: () => NaN },
    ]}
    vlines={() => [{ x: 6e12, label: R`6\times10^{12}` }]}
    samples={80} />;
}

// ---------- §2.7 多晶硅栅刻蚀：选择比与栅氧损失 ----------
// 以最厚处刚好刻穿为基准再过刻 f；最薄处的栅氧暴露时间对应多晶硅厚度 t_p[(1+u)(1+f) − (1−u)]。
// 核对：t_p=200 nm、f=20%、u=5%、t_ox=2 nm → 需 S ≥ 31。
export const oxLoss = (S, tp, f, u) => tp * ((1 + u) * (1 + f) - (1 - u)) / S;
export function SelectivityPlot() {
  return <Plot
    x={{ label: R`\text{选择比}\ S=\text{多晶硅刻速}/\text{氧化物刻速}`, log: true, domain: [3, 3000] }}
    y={{ label: R`\text{栅氧被刻掉的厚度}\ [\mathrm{nm}]`, log: true, domain: [0.01, 100] }}
    params={[
      { id: "tp", label: R`t_{\rm p}\,[\mathrm{nm}]`, min: 20, max: 250, step: 5, value: 200 },
      { id: "f", label: R`\text{过刻}\ f`, min: 0, max: 0.5, step: 0.01, value: 0.2 },
      { id: "u", label: R`\text{厚度不均匀}\ \pm u`, min: 0, max: 0.15, step: 0.005, value: 0.05 },
      { id: "tox", label: R`t_{\rm ox}\,[\mathrm{nm}]`, min: 1, max: 5, step: 0.1, value: 2 },
    ]}
    series={p => [
      { label: R`\text{栅氧损失}`, f: S => oxLoss(S, p.tp, p.f, p.u), color: "#c0392b" },
      { label: R`\text{栅氧厚度}\ t_{\rm ox}`, f: () => p.tox, dash: "dash", color: "#2c4a6e" },
      { label: R`S_{\min}=${(oxLoss(1, p.tp, p.f, p.u) / p.tox).toFixed(0)}\ (\text{刚好刻穿});\ \text{只许损失一半需}\ S\ge${(2 * oxLoss(1, p.tp, p.f, p.u) / p.tox).toFixed(0)}`, f: () => NaN },
    ]}
    vlines={p => [{ x: oxLoss(1, p.tp, p.f, p.u) / p.tox, label: R`S_{\min}` }]}
    samples={80} />;
}

// ---------- §2.8 侧墙形成：共形沉积 + 各向异性回刻（SVG 交互） ----------
export function SpacerDemo() {
  const [t, setT] = useState(10), [e, setE] = useState(0);
  const h = 30, wg = 26, x0 = -60, x1 = 60, sc = 4.6, ox = 300, oy = 230;
  const top = x => { const dx = Math.abs(x) - wg / 2; if (dx <= 0) return h + t; if (dx < t) return Math.max(t, h + Math.sqrt(t * t - dx * dx)); return t; };
  const bot = x => (Math.abs(x) <= wg / 2 ? h : 0);
  // 按列采样剩余薄膜，连续段组成多边形
  const xs = []; for (let x = x0; x <= x1 + 1e-9; x += 0.25) xs.push(+x.toFixed(2));
  const runs = []; let cur = null;
  for (const x of xs) { const z1 = top(x) - e, z0 = bot(x); if (z1 > z0 + 1e-6) { (cur ??= []).push([x, z0, z1]); } else if (cur) { runs.push(cur); cur = null; } }
  if (cur) runs.push(cur);
  const P = (x, z) => `${(ox + x * sc).toFixed(1)},${(oy - z * sc).toFixed(1)}`;
  const base = e <= h ? t : Math.sqrt(Math.max(0, t * t - (e - h) ** 2));
  const flat = Math.max(0, t - e);
  return <div className="card" style={{ padding: 12 }}>
    <label style={{ display: "block", fontSize: 14 }}>沉积膜厚 <M>{R`t_{\rm d}`}</M> = {t} nm<input type="range" min={4} max={20} step={1} value={t} onChange={ev => setT(+ev.target.value)} style={{ width: "100%" }} /></label>
    <label style={{ display: "block", fontSize: 14 }}>各向异性回刻深度 <M>{R`e`}</M> = {e.toFixed(1)} nm（竖直方向均匀刻掉）<input type="range" min={0} max={h + 22} step={0.5} value={e} onChange={ev => setE(+ev.target.value)} style={{ width: "100%" }} /></label>
    <svg viewBox="0 0 600 270" style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif" }} role="img" aria-label="侧墙形成：共形沉积与各向异性回刻">
      <rect x="0" y={oy} width="600" height="40" fill="#c9c9c9" />
      <rect x={ox - wg / 2 * sc} y={oy - h * sc} width={wg * sc} height={h * sc} fill="#9a5a3a" stroke="#333" strokeWidth=".6" />
      {runs.map((r, i) => <polygon key={i} points={[...r.map(([x, , z1]) => P(x, z1)), ...r.slice().reverse().map(([x, z0]) => P(x, z0))].join(" ")} fill="#86c58a" stroke="#2f6b33" strokeWidth=".8" />)}
      <text x="10" y="22" fontSize="14" fill="#333">{flat > 0 ? `平面处剩余膜厚 ${flat.toFixed(1)} nm` : "平面处已清干净"}</text>
      <text x="10" y="42" fontSize="14" fill="#333">{e >= t ? `侧墙底宽约 ${base.toFixed(1)} nm，侧墙高 ${Math.max(0, h + t - e).toFixed(1)} nm` : "继续回刻……"}</text>
      <text x={ox} y={oy - h * sc / 2} textAnchor="middle" fontSize="13" fill="#fff">多晶硅栅</text>
      <text x="590" y={oy + 26} textAnchor="end" fontSize="13" fill="#333">硅衬底</text>
    </svg>
    <div style={{ fontSize: 13, color: "#555" }}>回刻深度刚好等于 <M>{R`t_{\rm d}`}</M> 时平面被清干净，此时侧墙底宽恰为 <M>{R`t_{\rm d}`}</M>：侧墙尺寸由<b>膜厚</b>而非光刻决定。继续过刻只会让侧墙变矮、上端变窄（台阶高 30 nm）。</div>
  </div>;
}

// ---------- §2.9 SiGe 的晶格失配 ----------
// Dismukes 拟合：a(x) = 5.431 + 0.20x + 0.027x² Å（x 为 Ge 摩尔分数）；x=1 时 5.658 Å。
export const aSiGe = x => 5.431 + 0.2 * x + 0.027 * x * x;
export function MisfitPlot() {
  return <Plot
    x={{ label: R`\text{Ge 含量}\ x_{\rm Ge}`, domain: [0, 1] }}
    y={{ label: R`\text{失配}\ (a_{\rm SiGe}-a_{\rm Si})/a_{\rm Si}\ [\%]`, domain: [0, 4.4] }}
    params={[{ id: "x", label: R`x_{\rm Ge}`, min: 0, max: 1, step: 0.01, value: 0.3 }]}
    series={p => [
      { label: R`\text{实测拟合}`, f: x => 100 * (aSiGe(x) - 5.431) / 5.431, color: "#2c6e49" },
      { label: R`\text{Vegard 线性插值}`, f: x => 100 * 0.227 * x / 5.431, dash: "dash", color: "#999" },
      { label: R`x_{\rm Ge}=${(+p.x).toFixed(2)}:\ a=${aSiGe(p.x).toFixed(4)}\,\text{\AA},\ \text{失配}\ ${(100 * (aSiGe(p.x) - 5.431) / 5.431).toFixed(2)}\%`, f: () => NaN },
    ]}
    vlines={p => [{ x: 0.2, label: "20%" }, { x: 0.6, label: "60%" }, { x: p.x, label: "" }]}
    samples={60} />;
}
// 应变示意：两侧 SiGe 源漏的晶格大于沟道硅，把沟道沿电流方向压缩（放大 10 倍显示）
export function StrainSketch() {
  const [x, setX] = useState(0.3);
  const f = (aSiGe(x) - 5.431) / 5.431, amp = 10;
  const a0 = 22, aS = a0 * (1 + amp * f), nC = 7, aC = a0 * (1 - amp * f * 0.35);
  const cw = (nC - 1) * aC, cx0 = 300 - cw / 2;
  const atoms = [];
  for (let r = 0; r < 4; r++) {
    for (let i = 0; i < nC; i++) atoms.push({ x: cx0 + i * aC, y: 120 + r * a0, c: "#9a9a9a" });
    for (let i = 1; i <= 4; i++) { atoms.push({ x: cx0 - i * aS - (aS - aC) * 0.5, y: 120 + r * a0, c: "#3f8f86" }); atoms.push({ x: cx0 + cw + i * aS + (aS - aC) * 0.5, y: 120 + r * a0, c: "#3f8f86" }); }
  }
  return <div className="card" style={{ padding: 12 }}>
    <label style={{ fontSize: 14 }}>源漏中的 Ge 含量 <M>{R`x_{\rm Ge}`}</M> = {(x * 100).toFixed(0)}%（晶格常数差放大 10 倍显示）<input type="range" min={0} max={0.6} step={0.01} value={x} onChange={e => setX(+e.target.value)} style={{ width: "100%" }} /></label>
    <svg viewBox="0 0 600 240" style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif" }} role="img" aria-label="SiGe 源漏对沟道施加压应变的示意">
      <rect x={cx0 - 8} y="70" width={cw + 16} height="22" fill="#e3cf8f" stroke="#555" /><text x="300" y="86" textAnchor="middle" fontSize="13">栅</text>
      {atoms.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r="6.5" fill={a.c} stroke="#333" strokeWidth=".5" />)}
      <text x={cx0 - 2.5 * aS} y="62" textAnchor="middle" fontSize="13" fill="#2d6d66">SiGe 源</text><text x={cx0 + cw + 2.5 * aS} y="62" textAnchor="middle" fontSize="13" fill="#2d6d66">SiGe 漏</text>
      <text x="300" y="225" textAnchor="middle" fontSize="13" fill="#444">{x > 0.005 ? `沟道沿电流方向受单轴压应变（示意），空穴迁移率提高；晶格失配 ${(100 * f).toFixed(2)}%` : "x = 0：无失配，无应变"}</text>
      {x > 0.005 && <g stroke="#c0392b" strokeWidth="2.5" fill="#c0392b">
        <line x1={cx0 - 70} y1="200" x2={cx0 - 16} y2="200" /><polygon points={`${cx0 - 10},200 ${cx0 - 20},195 ${cx0 - 20},205`} />
        <line x1={cx0 + cw + 70} y1="200" x2={cx0 + cw + 16} y2="200" /><polygon points={`${cx0 + cw + 10},200 ${cx0 + cw + 20},195 ${cx0 + cw + 20},205`} />
      </g>}
    </svg>
  </div>;
}

// ---------- §2.11 高 k：相同电容下的物理厚度与隧穿 ----------
// 等效氧化层厚度 EOT = t_IL + d_hk·3.9/K；直接隧穿按矩形势垒 WKB 只保留指数：J ∝ exp(−2κ_ox t_IL − 2κ_hk d_hk)，κ = √(2m*φ_B)/ħ。
const kap = (m, phi) => Math.sqrt(2 * m * 9.109e-31 * phi * q) / 1.0546e-34 * 1e-9;   // nm⁻¹
export const K_OX = kap(0.4, 3.1);   // ≈ 5.70 nm⁻¹
export function HighKPlot() {
  return <Plot
    x={{ label: R`\text{等效氧化层厚度}\ \mathrm{EOT}\ [\mathrm{nm}]`, domain: [0.5, 3] }}
    y={{ label: R`J/J_{\mathrm{SiO_2}}(\mathrm{EOT}=1.2\,\mathrm{nm})`, log: true, domain: [1e-12, 1e4] }}
    params={[
      { id: "K", label: R`K_{\rm hk}`, min: 8, max: 30, step: 0.5, value: 20 },
      { id: "til", label: R`t_{\rm IL}\,[\mathrm{nm}]`, min: 0, max: 1, step: 0.05, value: 0.5 },
      { id: "phi", label: R`\phi_B^{\rm hk}\,[\mathrm{eV}]`, min: 0.8, max: 3, step: 0.05, value: 1.5 },
      { id: "m", label: R`m^*_{\rm hk}/m_0`, min: 0.05, max: 0.5, step: 0.01, value: 0.15 },
    ]}
    series={p => {
      const kh = kap(p.m, p.phi), ref = Math.exp(-2 * K_OX * 1.2);
      const hk = e => e < p.til ? NaN : Math.exp(-2 * K_OX * p.til - 2 * kh * (e - p.til) * p.K / 3.9) / ref;
      return [
        { label: R`\mathrm{SiO_2}\ (d=\mathrm{EOT})`, f: e => Math.exp(-2 * K_OX * e) / ref, color: "#2c4a6e" },
        { label: R`\text{界面层}+\mathrm{HfO_2}`, f: hk, color: "#c0392b" },
        { label: R`\mathrm{EOT}=1.0:\ d_{\rm hk}=${((1 - p.til) * p.K / 3.9).toFixed(2)}\,\mathrm{nm},\ J_{\rm hk}/J_{\mathrm{SiO_2}}=${sci(hk(1) / (Math.exp(-2 * K_OX) / ref))}`, f: () => NaN },
      ];
    }}
    vlines={() => [{ x: 1.0, label: R`1.0` }, { x: 1.2, label: R`1.2\ (65\,\mathrm{nm})` }]}
    samples={120} />;
}

// ---------- §2.12 互连 RC（第 11 章式 11.5 的简化形式） ----------
// τ = ρ L² K ε0 [1/(H x_D) + 1/(W L_S)]，取 L_S = W，H = x_D = AR·W；忽略尺寸效应导致的电阻率上升。
export const tauRC = (rho, K, W, AR, L) => { const w = W * 1e-7, H = AR * w; return rho * L * L * K * eps0 * (1 / (H * H) + 1 / (w * w)); };
export function RCPlot() {
  return <Plot
    x={{ label: R`\text{线宽 = 线间距}\ W\ [\mathrm{nm}]`, log: true, domain: [10, 1000] }}
    y={{ label: R`\tau\ [\mathrm{ps}]`, log: true, domain: [0.1, 1e5] }}
    params={[
      { id: "L", label: R`L\,[\mathrm{mm}]`, min: 0.05, max: 5, log: true, value: 1 },
      { id: "AR", label: R`H/W`, min: 1, max: 3, step: 0.1, value: 2 },
      { id: "K", label: R`K_{\text{低 k}}`, min: 2, max: 3.9, step: 0.1, value: 2.7 },
    ]}
    series={p => [
      { label: R`\mathrm{Al}\,(3\,\mu\Omega\,\mathrm{cm})/\mathrm{SiO_2}`, f: W => tauRC(3e-6, 3.9, W, p.AR, p.L / 10) * 1e12, color: "#999" },
      { label: R`\mathrm{Cu}\,(1.7\,\mu\Omega\,\mathrm{cm})/\mathrm{SiO_2}`, f: W => tauRC(1.7e-6, 3.9, W, p.AR, p.L / 10) * 1e12, color: "#d9782d", dash: "dash" },
      { label: R`\mathrm{Cu}/\text{低 k}\ (K=${(+p.K).toFixed(1)})`, f: W => tauRC(1.7e-6, p.K, W, p.AR, p.L / 10) * 1e12, color: "#c0392b" },
    ]}
    vlines={() => [{ x: 50, label: R`50\,\mathrm{nm}` }]}
    samples={100} />;
}

// ---------- §2.13 FinFET 每单位版图宽度的有效沟道宽度 ----------
// W_eff/版图宽度 = (2H_fin + W_fin)/P_fin；Intel 22 nm（P=60, H=34, W=8）→ 1.27；Intel 14 nm（P=42, H=42, W=8）→ 2.19。
export function FinPlot() {
  return <Plot
    x={{ label: R`\text{鳍高}\ H_{\rm fin}\ [\mathrm{nm}]`, domain: [5, 60] }}
    y={{ label: R`W_{\rm eff}/\text{同样版图宽度的平面器件}`, domain: [0, 3.5] }}
    params={[
      { id: "P", label: R`P_{\rm fin}\,[\mathrm{nm}]`, min: 20, max: 80, step: 1, value: 42 },
      { id: "W", label: R`W_{\rm fin}\,[\mathrm{nm}]`, min: 4, max: 15, step: 0.5, value: 8 },
    ]}
    series={p => [
      { label: R`(2H_{\rm fin}+W_{\rm fin})/P_{\rm fin}`, f: H => (2 * H + p.W) / p.P, color: "#c0392b" },
      { label: R`\text{平面器件}`, f: () => 1, dash: "dash", color: "#999" },
      { label: R`\text{Intel 22/14 nm}`, data: [[34, (2 * 34 + 8) / 60], [42, (2 * 42 + 8) / 42]], points: true, color: "#2c4a6e" },
    ]}
    samples={60} />;
}
