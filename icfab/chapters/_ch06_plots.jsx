// 第 6 章交互图（全部在浏览器里真算）。数值函数见 _ch06_phys.jsx。
import { useState } from "react";
import { Plot, TxI } from "@kit";
import * as P from "./_ch06_phys.jsx";
import { panel, btn, row, Range, tex, COL } from "./_ch06_draw.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const TEMPS = [800, 900, 1000, 1100, 1200];
const TCOL = { 800: "#2c4a6e", 900: "#16808a", 1000: "#2c6e49", 1100: "#b8862b", 1200: "#c0392b" };
const nmOrUm = x => (x < 0.1 ? `${f2(x * 1000, 1)}\\ \\mathrm{nm}` : `${f2(x, 3)}\\ \\mu\\mathrm{m}`);

// ================= 1. Deal–Grove 氧化计算器 =================
export function DGCalculator() {
  const [amb, setAmb] = useState("wet"), [ori, setOri] = useState("100"), [Tc, setTc] = useState(1000);
  const [tmax, setTmax] = useState(120), [tm, setTm] = useState(60), [xi, setXi] = useState(0), [lP, setLP] = useState(0);
  const [mas, setMas] = useState(false), [lN, setLN] = useState(15);
  const Pa = Math.pow(10, lP), Nd = Math.pow(10, lN), T = P.TK(Tc);
  const vr = P.vacancyRatio(P.nOverNi(Nd, T), T);
  const p = P.dgParams({ amb, Tc, ori, P: Pa, dopeV: vr }), tau = P.tauOf(xi / 1000, p);
  const xAt = P.xDG(tm, p, tau), useMas = mas && amb === "dry" && xi === 0;
  const ts = Array.from({ length: 121 }, (_, i) => tmax * i / 120), xm = useMas ? P.xMassoud(ts, p, Tc) : null;
  const xmAt = useMas ? P.xMassoud([tm], p, Tc)[0] : null;
  const xTop = Math.max(P.xDG(tmax, p, tau), useMas ? xm[xm.length - 1] : 0) * 1.15;
  const regime = xAt < p.A / 10 ? "线性区（界面反应限制）" : xAt > 2 * p.A ? "抛物线区（扩散限制）" : "线性–抛物线过渡区";
  const series = () => [
    { label: R`x_o(t)\ \text{Deal–Grove}`, f: t => P.xDG(t, p, tau) * 1000 },
    { label: R`\text{线性极限}\ \tfrac{B}{A}(t+\tau)`, f: t => p.BA * (t + tau) * 1000, dash: "dash", color: COL.gold, width: 1.5 },
    { label: R`\text{抛物线极限}\ \sqrt{B(t+\tau)}`, f: t => Math.sqrt(p.B * (t + tau)) * 1000, dash: "dot", color: COL.blue, width: 1.5 },
    ...(useMas ? [{ label: R`\text{含 Massoud 修正 (6.15)}`, data: ts.map((t, i) => [t, xm[i] * 1000]), color: COL.red }] : []),
  ];
  return <div style={panel}>
    <div style={row}>
      <span>气氛</span>{[["dry", "干氧 O2"], ["wet", "湿氧 H2O"]].map(([k, t]) => <button key={k} style={btn(amb === k)} onClick={() => setAmb(k)}>{t}</button>)}
      <span style={{ marginLeft: 8 }}>晶向</span>{["100", "110", "111"].map(k => <button key={k} style={btn(ori === k)} onClick={() => setOri(k)}>({k})</button>)}
      <label style={{ marginLeft: 8, fontSize: 13.5 }}><input type="checkbox" checked={mas} onChange={e => setMas(e.target.checked)} /> 薄氧 Massoud 修正（仅干氧、无初始氧化层）</label>
    </div>
    <Range label="温度 $T$" value={Tc} min={700} max={1250} step={5} onChange={setTc} fmt={v => `${v} °C`} />
    <Range label="时间轴长度" value={tmax} min={5} max={1200} step={5} onChange={v => { setTmax(v); if (tm > v) setTm(v); }} fmt={v => `${v} min`} />
    <Range label="读数时刻 $t$" value={tm} min={0} max={tmax} step={Math.max(0.5, tmax / 240)} onChange={setTm} fmt={v => `${f2(v, 1)} min`} />
    <Range label="初始氧化层 $x_i$" value={xi} min={0} max={200} step={1} onChange={setXi} fmt={v => `${v} nm`} />
    <Range label="氧化剂分压 $P$" value={lP} min={-1} max={1.4} step={0.01} onChange={setLP} fmt={v => `${f2(Math.pow(10, v), 2)} atm`} />
    <Range label="衬底施主浓度 $N_D$" value={lN} min={15} max={20.6} step={0.05} onChange={setLN} fmt={v => <TxI>{R`$${f2(Math.pow(10, v - Math.floor(v)), 1)}\times10^{${Math.floor(v)}}\ \mathrm{cm^{-3}}$`}</TxI>} />
    <Plot x={{ label: R`t\ [\mathrm{min}]`, domain: [0, tmax] }} y={{ label: R`x_o\ [\mathrm{nm}]`, domain: [0, xTop * 1000] }}
      series={series} vlines={[{ x: tm, label: R`x_o=${f2(xAt * 1000, 1)}\,\mathrm{nm}` }]} samples={240} height={330} />
    <div style={{ fontSize: 13.5, lineHeight: 1.7 }}><TxI>{[
      R`$B=${tex(p.B, 3)}\ \mu\mathrm{m^2/min}$，$B/A=${tex(p.BA, 3)}\ \mu\mathrm{m/min}$，$A=${tex(p.A * 1000, 3)}\ \mathrm{nm}$，$\tau=${tex(tau, 3)}\ \mathrm{min}$。`,
      R`$t=${f2(tm, 1)}$ min 时 $x_o=${nmOrUm(xAt)}$${useMas ? R`（含 Massoud 修正：$${nmOrUm(xmAt)}$）` : ""}，处于**${regime}**；消耗硅 $${f2(0.44 * xAt * 1000, 1)}\ \mathrm{nm}$。`,
      amb === "dry" && Pa !== 1 ? R`干氧中 $B/A\propto P^{0.75}$、$B\propto P$（式 6.19，取 $n=0.75$）。` : "",
      vr > 1.05 ? R`高掺杂：$V^*/V_i^*=${f2(vr, 2)}$，式 (6.21) 使 $B/A$ 增大为本征值的 $${f2(P.dopingFactor(vr, T), 2)}$ 倍。` : "",
    ].join("")}</TxI></div>
  </div>;
}

// ================= 2. 图 6.10：B 与 B/A 的 Arrhenius 图 =================
export function ArrheniusPlot() {
  return <Plot
    x={{ label: R`1000/T\ [\mathrm{K^{-1}}]`, domain: [0.62, 1.0] }}
    y={{ label: R`B/A\ [\mu\mathrm{m/min}],\ \ B\ [\mu\mathrm{m^2/min}]`, log: true, domain: [1e-5, 1] }}
    params={[{ id: "ori", label: R`\text{晶向：}0{=}(111),1{=}(110),2{=}(100)`, min: 0, max: 2, step: 1, value: 0 }]}
    series={p => {
      const o = ["111", "110", "100"][Math.round(p.ori)], Tc = x => 1000 / x - 273.15;
      return [
        { label: R`\text{湿氧}\ B/A`, f: x => P.dgParams({ amb: "wet", Tc: Tc(x), ori: o }).BA, color: COL.blue },
        { label: R`\text{湿氧}\ B`, f: x => P.dgParams({ amb: "wet", Tc: Tc(x) }).B, color: COL.blue, dash: "dash" },
        { label: R`\text{干氧}\ B/A`, f: x => P.dgParams({ amb: "dry", Tc: Tc(x), ori: o }).BA, color: COL.red },
        { label: R`\text{干氧}\ B`, f: x => P.dgParams({ amb: "dry", Tc: Tc(x) }).B, color: COL.red, dash: "dash" },
      ];
    }}
    vlines={[1200, 1100, 1000, 900, 800].map(t => ({ x: 1000 / (t + 273.15), label: R`${t}^\circ\mathrm{C}` }))}
    samples={120} />;
}

// ================= 3. 图 6.11：厚度–时间 =================
export function ThicknessTimePlot({ amb }) {
  return <Plot
    x={{ label: R`t\ [\mathrm{min}]`, domain: [0, 600] }}
    y={{ label: R`x_o\ [\mu\mathrm{m}]`, domain: amb === "dry" ? [0, 0.7] : [0, 2] }}
    params={[{ id: "P", label: R`P\ [\mathrm{atm}]`, min: 0.1, max: 20, log: true, value: 1 }, { id: "ori", label: R`\text{晶向：}0{=}(100),1{=}(111)`, min: 0, max: 1, step: 1, value: 0 }]}
    series={p => TEMPS.map(Tc => { const q = P.dgParams({ amb, Tc, ori: p.ori > 0.5 ? "111" : "100", P: p.P }); return { label: R`${Tc}^\circ\mathrm{C}`, f: t => P.xDG(t, q), color: TCOL[Tc] }; })}
    samples={150} height={340} />;
}

// ================= 4. 图 6.12：700 °C 干氧的薄氧异常 =================
const DATA612 = [[15, 17], [15, 18.5], [24, 18], [24, 20.5], [32, 26.5], [32, 27.5], [48, 33], [48, 34.5], [80, 43], [80, 44], [94, 45], [94, 46.5], [120, 51], [120, 53.5]];
export function ThinOxidePlot() {
  return <Plot
    x={{ label: R`t\ [\mathrm{h}]`, domain: [0, 130] }} y={{ label: R`x_o\ [\mathrm{nm}]`, domain: [0, 65] }}
    params={[{ id: "xi", label: R`x_i\ [\mathrm{nm}]`, min: 0, max: 40, step: 0.5, value: 23 }]}
    series={pv => {
      const p = P.dgParams({ amb: "dry", Tc: 700, ori: "111" }), tau = P.tauOf(pv.xi / 1000, p);
      const ts = Array.from({ length: 131 }, (_, i) => i), xm = P.xMassoud(ts.map(t => t * 60), p, 700);
      return [
        { label: R`\text{DG，从裸硅开始}`, f: t => P.xDG(t * 60, p) * 1000, color: "#999", dash: "dot" },
        { label: R`\text{DG}+x_i\ (\tau=${f2(tau / 60, 0)}\,\mathrm{h})`, f: t => P.xDG(t * 60, p, tau) * 1000 },
        { label: R`\text{Massoud (6.15)}`, data: ts.map((t, i) => [t, xm[i] * 1000]), color: COL.gold, dash: "dash" },
        { label: R`\text{实验点（读自原图）}`, data: [[0, 0], ...DATA612], points: true, color: COL.red },
      ];
    }}
    samples={140} height={330} />;
}

// ================= 5. 式 (6.21)：重掺杂增强 =================
export function DopingPlot() {
  return <Plot
    x={{ label: R`N_D\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e17, 5e20] }}
    y={{ label: R`(B/A)_{\rm doping}/(B/A)_i`, log: true, domain: [0.9, 30] }}
    series={() => [800, 900, 1000, 1100].map(Tc => { const T = P.TK(Tc); return { label: R`${Tc}^\circ\mathrm{C}`, f: N => P.dopingFactor(P.vacancyRatio(P.nOverNi(N, T), T), T), color: TCOL[Tc] }; })}
    vlines={[1000, 900].map(Tc => ({ x: P.niSi(P.TK(Tc)), label: R`n_i(${Tc}^\circ\mathrm{C})` }))}
    samples={160} height={320} />;
}

// ================= 6. 式 (6.23)–(6.25)：应力修正因子的形状 =================
export function StressFactorPlot() {
  return <Plot
    x={{ label: R`\text{无量纲应力}\ s=\sigma V/kT`, domain: [-6, 6] }} y={{ label: R`\text{相对无应力值的倍数}`, log: true, domain: [0.01, 10] }}
    series={() => [
      { label: R`B/A\ \text{或}\ D:\ e^{-s}`, f: s => Math.exp(-s), color: COL.red },
      { label: R`\mu/\mu_0=u/\sinh u,\ u=s/2`, f: s => (Math.abs(s) < 1e-6 ? 1 : (s / 2) / Math.sinh(s / 2)), color: COL.blue },
    ]}
    samples={200} height={280} />;
}

// ================= 7. MOS C–V 实验室（图 6.29、6.30、6.31） =================
export function CVLab({ preset = "ideal" }) {
  const base = [
    { id: "tox", label: R`t_{ox}\ [\mathrm{nm}]`, min: 5, max: 200, step: 1, value: 50 },
    { id: "lND", label: R`\log_{10}N_D\ [\mathrm{cm^{-3}}]`, min: 14, max: 17, step: 0.05, value: 16 },
  ];
  const extra = preset === "nonideal" ? [
    { id: "Qf", label: R`Q_f\ [10^{10}\,\mathrm{cm^{-2}}]`, min: 0, max: 100, step: 1, value: 30 },
    { id: "phiMS", label: R`\phi_{MS}\ [\mathrm{V}]`, min: -1, max: 0.5, step: 0.01, value: -0.25 },
    { id: "lD", label: R`\log_{10}D_{it}(E_i)\ [\mathrm{cm^{-2}eV^{-1}}]`, min: 9, max: 12, step: 0.05, value: 11.3 },
    { id: "Qm", label: R`Q_m\ [10^{10}\,\mathrm{cm^{-2}}]`, min: 0, max: 100, step: 1, value: 0 },
    { id: "xm", label: R`Q_m\ \text{质心}\ \bar x/t_{ox}`, min: 0, max: 1, step: 0.05, value: 1 },
  ] : preset === "quasi" ? [{ id: "lD", label: R`\log_{10}D_{it}(E_i)\ [\mathrm{cm^{-2}eV^{-1}}]`, min: 9, max: 12.3, step: 0.05, value: 11.5 }] : [];
  return <Plot
    x={{ label: R`V_G\ [\mathrm{V}]`, domain: [-6, 4] }} y={{ label: R`C/C_{ox}`, domain: [0, 1.05] }}
    params={[...base, ...extra]}
    series={p => {
      const par = { tox: p.tox, ND: 10 ** p.lND, Qf: (p.Qf || 0) * 1e10, phiMS: p.phiMS || 0, Dmid: p.lD ? 10 ** p.lD : 0, Qm: (p.Qm || 0) * 1e10, xm: p.xm ?? 1 };
      if (preset === "ideal") {
        const c = P.mosCV(par);
        return [
          { label: R`\text{理想 LF}`, data: c.lf, color: COL.blue },
          { label: R`\text{理想 HF}\ (C_{\min}/C_{ox}=${f2(c.Cmin)})`, data: c.hf, color: COL.ink },
          { label: R`\text{深耗尽}`, data: c.dd, color: COL.red, dash: "dash" },
        ];
      }
      if (preset === "nonideal") {
        const id = P.mosCV({ tox: p.tox, ND: par.ND }), sh = P.mosCV({ ...par, Dmid: 0 }), real = P.mosCV(par);
        return [
          { label: R`\text{理想 HF}`, data: id.hf, color: "#999", dash: "dot" },
          { label: R`\text{平移：}\phi_{MS}-qQ_f/C_{ox}\ (V_{FB}=${f2(sh.VFB)}\,\mathrm{V})`, data: sh.hf, color: COL.blue, dash: "dash" },
          { label: R`\text{再加}\ D_{it}\text{：被“拉伸”}`, data: real.hf, color: COL.red },
        ];
      }
      const c = P.mosCV(par);
      return [{ label: R`\text{LF（准静态）}`, data: c.lf, color: COL.blue }, { label: R`\text{HF}`, data: c.hf, color: COL.ink }];
    }}
    vlines={p => {
      const par = { tox: p.tox, ND: 10 ** p.lND, Qf: (p.Qf || 0) * 1e10, phiMS: p.phiMS || 0, Dmid: p.lD ? 10 ** p.lD : 0, Qm: (p.Qm || 0) * 1e10, xm: p.xm ?? 1 }, c = P.mosCV(par);
      return [{ x: c.VTH, label: R`V_{TH}=${f2(c.VTH)}` }, { x: c.VFB, label: R`V_{FB}` }];
    }}
    samples={10} height={360} />;
}
// 准静态法反推 D_it：C_it = (1/C_LF − 1/C_ox)^{-1} − (1/C_HF − 1/C_ox)^{-1}
export function DitExtractPlot() {
  return <Plot
    x={{ label: R`E_F-E_i\ \text{（表面处）}\ [\mathrm{eV}]`, domain: [-0.45, 0.45] }} y={{ label: R`D_{it}\ [\mathrm{cm^{-2}eV^{-1}}]`, log: true, domain: [1e9, 1e13] }}
    params={[{ id: "lD", label: R`\log_{10}D_{it}(E_i)\ \text{真值}`, min: 9, max: 12.3, step: 0.05, value: 11.5 }, { id: "tox", label: R`t_{ox}\ [\mathrm{nm}]`, min: 5, max: 200, step: 1, value: 50 }]}
    series={p => {
      const Dm = 10 ** p.lD, m = P.mosSetup({ tox: p.tox, ND: 1e16, Dmid: Dm }), VT = P.MOS.VT, pts = [];
      for (let i = 0; i <= 120; i++) {
        const E = -0.45 + 0.9 * i / 120, psi = E - m.phiF, u = psi / VT;
        const Clf = m.ser(m.Cox, m.Cs(u) + m.Cit(psi)), Chf = m.ser(m.Cox, m.Cmaj(u));
        const Cit = 1 / (1 / Clf - 1 / m.Cox) - 1 / (1 / Chf - 1 / m.Cox);
        pts.push([E, Cit / P.MOS.Q]);
      }
      return [{ label: R`D_{it}\ \text{真值}`, f: E => P.ditOf(E, Dm), color: "#999", dash: "dot" }, { label: R`\text{由 HF/LF 差反推}`, data: pts, color: COL.red }];
    }}
    samples={100} height={300} />;
}

// ================= 8. 式 (6.37)–(6.39)：EOT =================
export function EOTPlot() {
  return <Plot
    x={{ label: R`\kappa_{\rm hi\text{-}K}`, domain: [3.9, 80] }} y={{ label: R`t_{\rm hi\text{-}K}\ [\mathrm{nm}]`, domain: [0, 20] }}
    params={[{ id: "eot", label: R`\text{目标 EOT}\ [\mathrm{nm}]`, min: 0.5, max: 3, step: 0.05, value: 1 }, { id: "il", label: R`\text{界面 SiO}_2\ t_{IL}\ [\mathrm{nm}]`, min: 0, max: 0.9, step: 0.05, value: 0 }]}
    series={p => [
      { label: R`t_{\rm hi\text{-}K}=(\mathrm{EOT}-t_{IL})\,\kappa/3.9`, f: k => (p.eot - p.il) * k / 3.9 },
      { label: R`\text{纯 SiO}_2\ (\kappa=3.9)`, f: () => p.eot, dash: "dot", color: "#999" },
    ]}
    vlines={[[7, R`\mathrm{Si_3N_4}`], [9, R`\mathrm{Al_2O_3}`], [16, R`\kappa=16`], [25, R`\mathrm{HfO_2}`], [80, R`\mathrm{TiO_2}`]].map(([x, l]) => ({ x, label: l }))}
    samples={120} height={300} />;
}

// ================= 9. 图 6.36：SiC 两个晶面的氧化 =================
export function SiCPlot({ face }) {
  return <Plot
    x={{ label: R`t\ [\mathrm{h}]`, domain: [0, 6.5] }} y={{ label: R`x_o\ [\mu\mathrm{m}]`, domain: face === "C" ? [0, 0.32] : [0, 0.05] }}
    series={() => [1150, 1100, 1050].flatMap((Tc, i) => {
      const q = P.sicParams(face, Tc), c = ["#c0392b", "#2c6e49", "#2c4a6e"][i];
      return [{ label: R`${Tc}^\circ\mathrm{C}`, f: t => P.xDG(t, q), color: c }, { data: P.SIC_DATA[face][Tc], points: true, color: c }];
    })}
    samples={120} height={300} />;
}

// ================= 10. 图 6.24 附：反射谱 =================
export function ReflectancePlot() {
  return <Plot
    x={{ label: R`\lambda\ [\mathrm{nm}]`, domain: [380, 780] }} y={{ label: R`R(\lambda)`, domain: [0, 0.6] }}
    params={[{ id: "d", label: R`d_{ox}\ [\mathrm{nm}]`, min: 0, max: 600, step: 2, value: 120 }]}
    series={p => [{ label: R`d=${p.d}\,\mathrm{nm}`, f: l => P.reflect(l, p.d) }, { label: R`\text{裸硅}`, f: l => P.reflect(l, 0), dash: "dot", color: "#999" }]}
    samples={200} height={280} />;
}
