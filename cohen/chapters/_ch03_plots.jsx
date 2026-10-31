// 第 III 章交互图。数值核心在 _ch03_phys.js（已用 node 核对：测量频率收敛、RK4 与 (D-68) 一致到 1e-8、
// Crank–Nicolson 范数守恒到 1e-13、谐振子 ⟨X⟩ 与经典解相差 < 0.5%、连续性方程残差 ~1e-4）。
import { useMemo, useState } from "react";
import { Plot, TxI, Slider, Seg } from "@kit";
import * as P from "./_ch03_phys.js";
import { TexAt } from "./_ch03_kit.jsx";

const R = String.raw;
const f = (v, d = 3) => (+v).toFixed(d);
const ex = v => { const [m, e] = (+v).toExponential(1).split("e"); return `${m}\\times10^{${+e}}`; };
const DEG = Math.PI / 180;
const COL = { ink: "#1f1b16", red: "#c0392b", green: "#2c6e49", blue: "#2c4a6e", gold: "#b8862b", violet: "#7d3c98", teal: "#16808a" };

// =====================================================================
// 1. 测量模拟器（第四、第五假设；§C-4 平均值与方均根偏差）
//    四维态空间：|u_1⟩ (a_1=-1)，|u_2^1⟩、|u_2^2⟩ (a_2=0，二重简并)，|u_3⟩ (a_3=2)
// =====================================================================
const LEVEL = [0, 1, 1, 2], AV = [-1, 0, 2];
const BASIS = [R`\ket{u_1}`, R`\ket{u_2^1}`, R`\ket{u_2^2}`, R`\ket{u_3}`];
const AN = [R`a_1=-1`, R`a_2=0\ (g_2=2)`, R`a_3=2`];
export function MeasureSim() {
  const [mag, setMag] = useState([0.5, 0.6, 0.4, 0.45]);
  const [ph, setPh] = useState([0, 90, 200, 45]);
  const [cnt, setCnt] = useState([0, 0, 0]);
  const [hist, setHist] = useState([]);          // [N, 样本平均]
  const [seed, setSeed] = useState(7);
  const [sys, setSys] = useState(null);           // 单个系统：{c, seq}
  const c = mag.map((r, k) => P.polar(r, ph[k] * DEG));
  const norm = Math.sqrt(c.reduce((s, z) => s + P.cabs2(z), 0)) || 1;
  const cn = c.map(z => [z[0] / norm, z[1] / norm]);
  const Pth = P.levelProbs(cn, LEVEL, 3), mA = P.mean(Pth, AV), dA = P.rms(Pth, AV);
  const N = cnt.reduce((a, b) => a + b, 0);
  const sMean = N ? cnt.reduce((s, k, n) => s + k * AV[n], 0) / N : 0;
  const sRms = N ? Math.sqrt(cnt.reduce((s, k, n) => s + k * (AV[n] - sMean) ** 2, 0) / N) : 0;
  const reset = () => { setCnt([0, 0, 0]); setHist([]); setSys(null); };
  const measure = M => {
    const rng = P.mulberry32(seed); const nc = [...cnt]; const h = [...hist]; let tot = N, sum = cnt.reduce((s, k, n) => s + k * AV[n], 0);
    for (let i = 0; i < M; i++) { const n = P.pick(Pth, rng()); nc[n]++; tot++; sum += AV[n]; if (tot <= 20 || tot % Math.ceil(tot / 40) === 0) h.push([tot, sum / tot]); }
    setCnt(nc); setHist(h); setSeed(seed + 1);
  };
  const single = () => {
    const rng = P.mulberry32(seed + 1000); setSeed(seed + 1);
    const cur = sys ? sys.c : cn, Pc = P.levelProbs(cur, LEVEL, 3), n = P.pick(Pc, rng());
    setSys({ c: P.collapse(cur, LEVEL, n), seq: [...(sys ? sys.seq : []), n] });
  };
  const upd = (arr, set, k) => v => { const a = [...arr]; a[k] = v; set(a); reset(); };
  // 柱状图
  const W = 420, H = 190, bw = 70;
  const bars = [0, 1, 2].map(n => {
    const x = 50 + n * 125, fr = N ? cnt[n] / N : 0;
    return <g key={n}>
      <rect x={x} y={170 - 150 * Pth[n]} width={bw} height={150 * Pth[n]} fill="none" stroke={COL.red} strokeWidth="2" strokeDasharray="5 3" />
      <rect x={x + 10} y={170 - 150 * fr} width={bw - 20} height={150 * fr} fill={COL.blue} opacity="0.75" />
      <TexAt x={x + bw / 2} y={190} anchor="middle" size={12} tex={AN[n]} w={120} />
      <text x={x + bw / 2} y={165 - 150 * Math.max(Pth[n], fr)} textAnchor="middle" fontSize="11" fill={COL.ink}>{N ? f(fr) : ""}</text>
    </g>;
  });
  // 收敛曲线
  const CW = 420, CH = 150, lx = v => 40 + 370 * Math.log10(v) / 4, ly = v => 75 - 30 * (v - mA);
  return (
    <div className="plot card">
      <div className="muted" style={{ fontSize: 13.5, marginBottom: 6 }}><TxI>{R`态 $\ket{\psi}=\sum c\,\ket{u}$ 的四个分量（模与辐角；程序自动归一）。$\ket{u_2^1},\ket{u_2^2}$ 张成 $a_2=0$ 的二维本征子空间。`}</TxI></div>
      <div className="plot-params">
        {[0, 1, 2, 3].map(k => <div key={k} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Slider label={R`$|c(${BASIS[k]})|$`} value={mag[k]} min={0} max={1} step={0.01} onChange={upd(mag, setMag, k)} fmt={v => f(v, 2)} />
          <Slider label={R`$\arg c(${BASIS[k]})$`} value={ph[k]} min={0} max={360} step={5} onChange={upd(ph, setPh, k)} fmt={v => v + "°"} />
        </div>)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
        <div>
          <div className="seg" style={{ marginBottom: 4 }}>
            <button onClick={() => measure(1)}>测 1 次</button><button onClick={() => measure(100)}>测 100 次</button>
            <button onClick={() => measure(1000)}>测 1000 次</button><button onClick={() => measure(10000)}>测 10000 次</button><button onClick={reset}>清零</button>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 6}`} style={{ width: "100%", maxWidth: 440 }}>
            <line x1="40" x2="410" y1="170" y2="170" stroke="#999" />
            {bars}
          </svg>
          <div style={{ fontSize: 13 }}><TxI>{R`虚线框：理论 $\mathcal P(a_n)$ \eqref{B-7}；蓝柱：频率 $\mathcal N(a_n)/N$ \eqref{C-5}。`}</TxI></div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.9, minWidth: 240 }}>
          <TxI>{R`$N=${N}$`}</TxI><br />
          {[0, 1, 2].map(n => <span key={n}><TxI>{R`$${AN[n]}$：$\mathcal P=${f(Pth[n])}$${N ? R`，频率 $${f(cnt[n] / N)}$` : ""}`}</TxI><br /></span>)}
          <TxI>{R`$\langle A\rangle=\bra{\psi}A\ket{\psi}=${f(mA)}$；样本平均 $${N ? f(sMean) : "—"}$`}</TxI><br />
          <TxI>{R`$\Delta A=${f(dA)}$；样本方均根 $${N ? f(sRms) : "—"}$`}</TxI>
        </div>
      </div>
      {hist.length > 1 && <svg viewBox={`0 0 ${CW} ${CH}`} style={{ width: "100%", maxWidth: 440 }}>
        <line x1="40" x2="410" y1={ly(mA)} y2={ly(mA)} stroke={COL.red} strokeDasharray="5 3" />
        <TexAt x={410} y={ly(mA) - 6} anchor="end" size={12} color={COL.red} tex={R`\langle A\rangle`} w={40} />
        <path d={hist.map(([n, m], i) => `${i ? "L" : "M"}${lx(n).toFixed(1)},${Math.max(5, Math.min(145, ly(m))).toFixed(1)}`).join("")} fill="none" stroke={COL.blue} strokeWidth="1.8" />
        {[1, 10, 100, 1000, 10000].map(v => <text key={v} x={lx(v)} y={CH - 2} fontSize="10" textAnchor="middle" fill="#888">{v}</text>)}
        <TexAt x={40} y={16} size={12} color="#555" w={370} tex={R`\text{样本平均随}\ N\ \text{（对数轴）收敛到}\ \langle A\rangle`} />
      </svg>}
      <div style={{ borderTop: "1px solid var(--line)", marginTop: 10, paddingTop: 10 }}>
        <b style={{ fontSize: 14 }}>同一个系统上的相继测量（第五假设）</b>
        <div className="seg" style={{ margin: "6px 0" }}>
          <button onClick={single}>{sys ? "立即再测一次" : "制备一个体系并测量一次"}</button>
          <button onClick={() => setSys(null)}>重新制备初态</button>
        </div>
        {sys && <div style={{ fontSize: 14 }}>
          <TxI>{R`结果序列：$${sys.seq.map(n => AV[n]).join(",\\ ")}$。测量后的态（分量的模与辐角）：`}</TxI>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 4 }}>
            {sys.c.map((z, k) => <span key={k}><TxI>{R`$${BASIS[k]}$：$${f(Math.sqrt(P.cabs2(z)))}\angle ${P.cabs2(z) > 1e-12 ? ((Math.atan2(z[1], z[0]) / DEG + 360) % 360).toFixed(0) : "0"}^\circ$`}</TxI></span>)}
          </div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}><TxI>{R`第一次测量随机地给出某个 $a_n$，态被投影并归一化 \eqref{B-31}；之后无论再测多少次，结果都不变。若结果是简并的 $a_2=0$，两个分量的**相对**模与相对辐角被原样保留——测量后的态是 $\ket{\psi}$ 在子空间中的投影，而不是子空间中任意一个矢量。`}</TxI></div>
        </div>}
      </div>
    </div>);
}

// =====================================================================
// 2. 图 2：概率密度 ρ(α)、平均值 ⟨A⟩、峰值 α_m、方均根偏差 ΔA（式 C-27）
// =====================================================================
export function RhoPlot() {
  return <Plot
    x={{ label: R`\alpha`, domain: [-4, 4] }}
    y={{ label: R`\rho(\alpha)`, domain: [0, 0.75] }}
    params={[
      { id: "w", label: R`\text{左肩权重}`, min: 0, max: 0.9, step: 0.01, value: 0.45 },
      { id: "d", label: R`\text{左肩偏移}`, min: 0, max: 3, step: 0.05, value: 1.6 },
    ]}
    series={p => { const s = P.rhoStats(p.w, p.d); return [
      { label: R`\rho(\alpha):\ \langle A\rangle=${f(s.mean)},\ \alpha_m=${f(s.am)},\ \Delta A=${f(s.dA)}`, f: a => P.rhoSkew(a, p.w, p.d) / s.norm, color: COL.ink },
    ]; }}
    vlines={p => { const s = P.rhoStats(p.w, p.d); return [{ x: s.mean, label: R`\langle A\rangle` }, { x: s.am, label: R`\alpha_m` }, { x: s.mean - s.dA, label: R`-\Delta A` }, { x: s.mean + s.dA, label: R`+\Delta A` }]; }}
    samples={300} height={320} />;
}

// =====================================================================
// 3. 图 3：两个不相容可观测量的相继测量（二维实矢量空间）
// =====================================================================
export function NonCommuteFig() {
  const [th, setTh] = useState(35), [be, setBe] = useState(30);
  const t = th * DEG, b = be * DEG;
  const S = 150, O = [60, 200], pt = (x, y) => [O[0] + S * x, O[1] - S * y];
  const u1 = [1, 0], u2 = [0, 1], v1 = [Math.cos(b), -Math.sin(b)], v2 = [Math.sin(b), Math.cos(b)], psi = [Math.cos(t), Math.sin(t)];
  const dot = (a, c) => a[0] * c[0] + a[1] * c[1];
  const H1 = dot(psi, u1), H2 = dot(psi, v2), K = dot(u1, v2);
  const Pab = H1 * H1 * K * K, Pba = H2 * H2 * K * K;
  const arrow = (v, col, lab, w = 2) => { const [x, y] = pt(...v); return <g><line x1={O[0]} y1={O[1]} x2={x} y2={y} stroke={col} strokeWidth={w} markerEnd="url(#ah3)" /><TexAt x={x + 4} y={y - 2} color={col} tex={lab} w={50} /></g>; };
  const P1 = pt(H1, 0), P2 = pt(H2 * v2[0], H2 * v2[1]), Ps = pt(...psi), Kp = pt(K * v2[0], K * v2[1]), U1 = pt(1, 0);
  return <div className="plot card">
    <div className="plot-params">
      <Slider label={R`$\ket{\psi}$ 的方向角`} value={th} min={-80} max={170} step={1} onChange={setTh} fmt={v => v + "°"} />
      <Slider label={R`$B$ 的本征基相对 $A$ 的转角 $\beta$`} value={be} min={0} max={90} step={1} onChange={setBe} fmt={v => v + "°"} />
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <svg viewBox="0 0 300 330" style={{ width: 300 }}>
        <defs><marker id="ah3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="context-stroke" /></marker></defs>
        {arrow(u1, COL.ink, R`\ket{u_1}`)}{arrow(u2, COL.ink, R`\ket{u_2}`)}{arrow(v1, COL.green, R`\ket{v_1}`)}{arrow(v2, COL.green, R`\ket{v_2}`)}{arrow(psi, COL.red, R`\ket{\psi}`, 3)}
        <line x1={Ps[0]} y1={Ps[1]} x2={P1[0]} y2={P1[1]} stroke={COL.red} strokeDasharray="3 3" />
        <line x1={Ps[0]} y1={Ps[1]} x2={P2[0]} y2={P2[1]} stroke={COL.red} strokeDasharray="3 3" />
        <line x1={U1[0]} y1={U1[1]} x2={Kp[0]} y2={Kp[1]} stroke="#888" strokeDasharray="3 3" />
        <circle cx={P1[0]} cy={P1[1]} r="3" fill={COL.red} /><TexAt x={P1[0] - 6} y={P1[1] + 18} size={12} tex={R`\mathrm{H}_1`} w={30} />
        <circle cx={P2[0]} cy={P2[1]} r="3" fill={COL.red} /><TexAt x={P2[0] - 24} y={P2[1]} size={12} tex={R`\mathrm{H}_2`} w={30} />
        <circle cx={Kp[0]} cy={Kp[1]} r="3" fill="#888" /><TexAt x={Kp[0] - 24} y={Kp[1] + 6} size={12} tex={R`\mathrm{K}_2`} w={30} />
        <text x={O[0] - 14} y={O[1] + 4} fontSize="13">O</text>
      </svg>
      <div style={{ fontSize: 14, lineHeight: 2 }}>
        <TxI>{R`$|\mathrm{OH}_1|=|\braket{u_1|\psi}|=${f(Math.abs(H1))}$`}</TxI><br />
        <TxI>{R`$|\mathrm{OH}_2|=|\braket{v_2|\psi}|=${f(Math.abs(H2))}$`}</TxI><br />
        <TxI>{R`$|\mathrm{OK}_1|=|\mathrm{OK}_2|=|\braket{v_2|u_1}|=\sin\beta=${f(Math.abs(K))}$`}</TxI><br />
        <TxI>{R`先 $A$ 后 $B$：$\mathcal P(a_1,b_2)=${f(Pab)}$，末态 $\ket{v_2}$`}</TxI><br />
        <TxI>{R`先 $B$ 后 $A$：$\mathcal P(b_2,a_1)=${f(Pba)}$，末态 $\ket{u_1}$`}</TxI><br />
        <span className="muted"><TxI>{be === 0 ? R`$\beta=0$：两组基重合，$[A,B]=0$，两种次序完全等价。` : R`$\beta\neq0$：一般 $\mathcal P(a_1,b_2)\neq\mathcal P(b_2,a_1)$ \eqref{C-49}，末态也不同。`}</TxI></span>
      </div>
    </div>
  </div>;
}

// =====================================================================
// 4. 三能级保守体系：⟨B⟩(t) 的 Bohr 频率振荡（D-68）与一般公式 (D-27) 的数值核验
// =====================================================================
const C0 = [P.polar(Math.sqrt(0.5), 0), P.polar(Math.sqrt(0.3), 0.4), P.polar(Math.sqrt(0.2), 1.1)];
const r2 = 1 / Math.SQRT2;
const BMAT = {
  lx: [[[0, 0], [r2, 0], [0, 0]], [[r2, 0], [0, 0], [r2, 0]], [[0, 0], [r2, 0], [0, 0]]],
  full: [[[0.3, 0], [r2, 0], [0.5, 0]], [[r2, 0], [-0.2, 0], [r2, 0]], [[0.5, 0], [r2, 0], [0.1, 0]]],
  comm: [[[1, 0], [0, 0], [0, 0]], [[0, 0], [-0.5, 0], [0, 0]], [[0, 0], [0, 0], [0.4, 0]]],
};
export function BohrPlot() {
  const [mode, setMode] = useState("lx");
  const B = BMAT[mode], T = 30;
  return <div>
    <Seg options={[["lx", R`$B_{13}=0$（选择定则）`], ["full", "全部矩阵元非零"], ["comm", R`$[B,H]=0$（运动常量）`]]} value={mode} onChange={setMode} />
    <Plot key={mode}
      x={{ label: R`t\ \ (\hbar=1)`, domain: [0, T] }}
      y={{ label: R`\langle B\rangle(t),\ \ \tfrac{d}{dt}\langle B\rangle`, domain: [-1.4, 1.4] }}
      params={[
        { id: "E2", label: R`E_2\ (E_1=0)`, min: 0.2, max: 3, step: 0.05, value: 1.0 },
        { id: "E3", label: R`E_3`, min: 0.5, max: 5, step: 0.05, value: 2.7 },
      ]}
      series={p => {
        const E = [0, p.E2, p.E3], H = E.map((e, i) => E.map((_, j) => [i === j ? e : 0, 0]));
        const sol = P.schrodRK4(H, C0, T, 3000);
        const pts = [], dpts = [];
        for (let k = 0; k < sol.t.length; k += 60) pts.push([sol.t[k], P.expectB(B, sol.y[k])]);
        for (let k = 30; k < sol.t.length - 1; k += 60) { const h = sol.t[1] - sol.t[0]; dpts.push([sol.t[k], (P.expectB(B, sol.y[k + 1]) - P.expectB(B, sol.y[k - 1])) / (2 * h)]); }
        const lines = P.bohrLines(E, C0, B).filter(l => l.omega > 1e-9);
        const tag = lines.map(l => R`\omega_{${l.m + 1}${l.n + 1}}=${f(l.omega, 2)}:\ ${f(l.amp, 2)}`).join(",\\ ");
        return [
          { label: R`\langle B\rangle(t)\ \text{按 (D-68)}`, f: t => P.bohrExpect(E, C0, B, t), color: COL.ink },
          { label: R`\text{RK4 直接积分 Schrödinger 方程}`, data: pts, points: true, color: COL.red },
          { label: R`\tfrac{1}{i\hbar}\langle[B,H]\rangle\ \text{(D-27)}`, f: t => P.commExpect(E, B, C0.map((z, n) => P.cmul(z, P.polar(1, -E[n] * t)))), color: COL.green, dash: "dash", width: 1.5 },
          { label: R`\text{RK4 数值导数}`, data: dpts, points: true, color: COL.teal },
          { label: R`\text{振荡分量振幅}\ 2|c_nc_{n'}B_{n'n}|:\ ${tag}`, f: () => NaN },
        ];
      }}
      samples={600} height={360} />
  </div>;
}

// =====================================================================
// 5. Ehrenfest 定理：波包中心 vs 经典轨道（V = x²/2 + κx⁴/4，ħ = m = 1）
// =====================================================================
const EHR_CACHE = new Map();
function ehrRun(k, s, x0) {
  const key = [k, s, x0].join();
  if (!EHR_CACHE.has(key)) {
    const dV = x => x + k * x ** 3, V = x => 0.5 * x * x + 0.25 * k * x ** 4;
    const q = P.runTDSE({ V, dV, x0, p0: 0, s, L: 9, N: 900, dt: 0.005, T: 12.6, every: 8 });
    const cl = P.classical(dV, x0, 0, 12.6, 2520);
    const dtr = q.t[1] - q.t[0]; let e1 = 0, e2 = 0;
    for (let i = 1; i < q.t.length - 1; i++) { e1 = Math.max(e1, Math.abs((q.X[i + 1] - q.X[i - 1]) / (2 * dtr) - q.P[i])); e2 = Math.max(e2, Math.abs((q.P[i + 1] - q.P[i - 1]) / (2 * dtr) - q.F[i])); }
    if (EHR_CACHE.size > 30) EHR_CACHE.clear();
    EHR_CACHE.set(key, { q, cl, e1, e2, dn: Math.max(...q.norm) - Math.min(...q.norm) });
  }
  return EHR_CACHE.get(key);
}
export function EhrenfestPlot() {
  return <Plot
    x={{ label: R`t`, domain: [0, 12.6] }}
    y={{ label: R`\langle X\rangle,\ x_{\rm cl};\ \ \langle F\rangle`, domain: [-4.5, 4.5] }}
    params={[
      { id: "k", label: R`\kappa\ \ (V=\tfrac12x^2+\tfrac14\kappa x^4)`, min: 0, max: 0.6, step: 0.05, value: 0.3 },
      { id: "s", label: R`\text{初始宽度}\ \sigma`, min: 0.2, max: 1.2, step: 0.05, value: 0.5 },
      { id: "x0", label: R`\text{初始中心}\ x_0`, min: 0.5, max: 2.5, step: 0.1, value: 2.0 },
    ]}
    series={p => {
      const r = ehrRun(p.k, p.s, p.x0);
      return [
        { label: R`\langle X\rangle(t)\ \text{（数值解 Schrödinger 方程）}`, data: r.q.t.map((t, i) => [t, r.q.X[i]]), color: COL.blue },
        { label: R`x_{\rm cl}(t)\ \text{（经典轨道，同初值）}`, data: r.cl.t.map((t, i) => [t, r.cl.X[i]]), color: COL.red, dash: "dash" },
        { label: R`\langle -V'(X)\rangle\ \text{(D-35 右边)}`, data: r.q.t.map((t, i) => [t, r.q.F[i]]), color: COL.green, width: 1.3 },
        { label: R`-V'(\langle X\rangle)\ \text{(D-38)}`, data: r.q.t.map((t, i) => [t, r.q.Fcl[i]]), color: COL.gold, dash: "dot", width: 1.3 },
        { label: R`\max|\tfrac{d}{dt}\langle X\rangle-\langle P\rangle|=${f(r.e1, 4)},\ \max|\tfrac{d}{dt}\langle P\rangle-\langle F\rangle|=${f(r.e2, 4)},\ \text{范数漂移}\ ${ex(r.dn)}`, f: () => NaN },
      ];
    }}
    samples={2} height={400} />;
}

// =====================================================================
// 6. 概率流与连续性方程 (D-9)–(D-18)：高斯波包撞上势垒
// =====================================================================
const CUR_CACHE = new Map();
function curRun(V0) {
  const key = String(V0);
  if (!CUR_CACHE.has(key)) { if (CUR_CACHE.size > 20) CUR_CACHE.clear(); CUR_CACHE.set(key, P.currentSnapshots({ V: x => V0 * Math.exp(-x * x / 0.5), x0: -5, p0: 1.5, s: 1, L: 15, N: 700, dt: 0.004, T: 6, frames: 61 })); }
  return CUR_CACHE.get(key);
}
export function CurrentPlot() {
  return <Plot
    x={{ label: R`x\ \ (\hbar=m=1)`, domain: [-10, 8] }}
    y={{ label: R`\rho,\ J;\ \ -\partial\rho/\partial t,\ \partial J/\partial x`, domain: [-0.35, 0.5] }}
    params={[
      { id: "t", label: R`t`, min: 0.1, max: 5.9, step: 0.1, value: 2.5 },
      { id: "V0", label: R`\text{势垒高度}\ V_0\ (E\approx1.25)`, min: 0, max: 2.5, step: 0.25, value: 1.25 },
    ]}
    series={p => {
      const r = curRun(p.V0), fr = r.frames[Math.round(p.t / 0.1)], x = r.x;
      const sel = arr => x.map((v, j) => [v, arr[j]]).filter((_, j) => j > 2 && j < x.length - 3);
      let res = 0, mx = 0; for (let j = 3; j < x.length - 3; j++) { res = Math.max(res, Math.abs(fr.dJ[j] - fr.mdrho[j])); mx = Math.max(mx, Math.abs(fr.dJ[j])); }
      let tot = 0; for (let j = 0; j < x.length; j++) tot += fr.rho[j] * r.dx;
      return [
        { label: R`\rho(x,t)\ \ (\textstyle\int\rho\,dx=${f(tot, 6)})`, data: sel(fr.rho), color: COL.ink },
        { label: R`J(x,t)\ \text{(D-17)}`, data: sel(fr.J), color: COL.blue },
        { label: R`-\partial\rho/\partial t\ \text{（相邻时刻差分）}`, data: sel(fr.mdrho), color: COL.red, width: 3 },
        { label: R`\partial J/\partial x\ \ (\max|{\rm 残差}|=${ex(res)},\ \text{相对}\ ${ex(res / mx)})`, data: sel(fr.dJ), color: COL.gold, dash: "dash" },
        { label: R`V(x)/10`, data: x.map(v => [v, p.V0 * Math.exp(-v * v / 0.5) / 10]), color: "#999", dash: "dot", width: 1.2 },
      ];
    }}
    samples={2} height={380} />;
}

// =====================================================================
// 7. 叠加 vs 统计混合（§E-1-a）：光子偏振
// =====================================================================
export function MixturePlot() {
  return <Plot
    x={{ label: R`\text{检偏器方向}\ \chi\ [^\circ]`, domain: [0, 180] }}
    y={{ label: R`\text{通过概率}`, domain: [-0.55, 1.05] }}
    params={[
      { id: "th", label: R`\theta\ [^\circ]\ \ (|\lambda_1|=\cos\theta,\ |\lambda_2|=\sin\theta)`, min: 0, max: 90, step: 1, value: 45 },
      { id: "ph", label: R`\text{相对相位}\ \varphi\ [^\circ]`, min: 0, max: 360, step: 5, value: 0 },
    ]}
    series={p => [
      { label: R`\text{叠加态}\ \cos\theta\,\mathbf e_x+e^{i\varphi}\sin\theta\,\mathbf e_y\ \text{(E-9)}`, f: c => P.polarSup(p.th * DEG, p.ph * DEG, c * DEG), color: COL.blue },
      { label: R`\text{统计混合}\ \{\cos^2\theta:\mathbf e_x,\ \sin^2\theta:\mathbf e_y\}\ \text{(E-5)}`, f: c => P.polarMix(p.th * DEG, c * DEG), color: COL.red, dash: "dash" },
      { label: R`\text{干涉项}\ 2\,\mathrm{Re}\{\lambda_1\lambda_2^*\braket{u_n|\psi_1}\braket{u_n|\psi_2}^*\}`, f: c => P.polarSup(p.th * DEG, p.ph * DEG, c * DEG) - P.polarMix(p.th * DEG, c * DEG), color: COL.green, dash: "dot" },
    ]}
    vlines={[{ x: 45, label: R`\mathbf e` }, { x: 135, label: R`\mathbf e'` }]}
    samples={361} height={340} />;
}

// =====================================================================
// 8. 对中间态求和（§E-1-b）：自旋 1/2，A 沿 z 得 +，B 沿 β，C 沿 γ
// =====================================================================
export function PathSumPlot() {
  return <Plot
    x={{ label: R`\text{中间可观测量 B 的方向}\ \beta\ [^\circ]`, domain: [0, 360] }}
    y={{ label: R`\text{概率}`, domain: [-0.55, 1.05] }}
    params={[{ id: "g", label: R`\text{末态可观测量 C 的方向}\ \gamma\ [^\circ]`, min: 0, max: 360, step: 5, value: 180 }]}
    series={p => [
      { label: R`\text{实验 1（不测 B）}:\ \mathcal P_a(c)=|\braket{v_c|u_a}|^2\ \text{(E-15)}`, f: () => P.spinDirect(p.g * DEG), color: COL.blue },
      { label: R`\text{实验 2（测 B）}:\ \sum_b\mathcal P_a(b,c)\ \text{(E-18 右边)}`, f: b => P.spinVia(b * DEG, p.g * DEG), color: COL.red, dash: "dash" },
      { label: R`\text{交叉项（E-21 第二项）}`, f: b => P.spinDirect(p.g * DEG) - P.spinVia(b * DEG, p.g * DEG), color: COL.green, dash: "dot" },
    ]}
    samples={361} height={330} />;
}

// =====================================================================
// 9. 图 9：连续谱测量的“截断”（E-39）–（E-40），以及 Δα → 0 时回到 (B-17)
// =====================================================================
export function TruncPlot() {
  const s = Math.sqrt(P.PACK_NORM);
  return <Plot
    x={{ label: R`\alpha`, domain: [-1.5, 5.5] }}
    y={{ label: R`\braket{v_\alpha|\psi},\ \ \braket{v_\alpha|\psi'}`, domain: [0, 1.6] }}
    params={[
      { id: "a0", label: R`\alpha_0`, min: -0.5, max: 4.5, step: 0.05, value: 2.2 },
      { id: "da", label: R`\Delta\alpha`, min: 0.02, max: 3, step: 0.02, value: 0.6 },
    ]}
    series={p => {
      const py = P.pYes(p.a0, p.da), inn = a => Math.abs(a - p.a0) <= p.da / 2;
      return [
        { label: R`\braket{v_\alpha|\psi}`, f: a => P.packet(a) / s, color: COL.ink },
        { label: R`\braket{v_\alpha|\psi'}=\braket{v_\alpha|P_{\Delta\alpha}(\alpha_0)|\psi}/\sqrt{\mathcal P}`, f: a => (inn(a) ? P.packet(a) / s / Math.sqrt(py) : 0), color: COL.red },
        { label: R`\mathcal P(\text{yes})=${f(py, 4)};\ \ \mathcal P/\Delta\alpha=${f(py / p.da)}\ \text{vs}\ \rho(\alpha_0)=${f(P.packet(p.a0) ** 2 / P.PACK_NORM)}`, f: () => NaN },
      ];
    }}
    samples={1400} height={330} />;
}
