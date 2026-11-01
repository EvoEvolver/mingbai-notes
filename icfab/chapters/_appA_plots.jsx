// 附录 A.1 的交互模型：n_i(T)、费米能级 / 电中性计算器、f(E)、冻析–本征区、费米能级随温度、电阻率、SRH。
import { useMemo, useState } from "react";
import { Plot, M } from "@kit";
import { MATS, Eg, NC, NV, ni, niSi112, kB, solveNeutral, gammaN, gammaP, ionized, rhoN, rhoP, muN, muP, sci } from "./_appA_phys.jsx";
import { COL, Svg, Elec, Hole } from "./_appA_figs.jsx";

const R = String.raw;
const box = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px", margin: "10px 0" };
const btn = on => ({ padding: "4px 10px", margin: "2px 3px", borderRadius: 6, border: `1px solid ${on ? "#2c4a6e" : "#bbb"}`, background: on ? "#e2eef7" : "#fff", cursor: "pointer", fontSize: 13 });
const lab = { display: "block", fontSize: 13, margin: "6px 0" };
function LogSlider({ label, value, set, min, max }) {
  return <label style={lab}><M>{`${label} = ${sci(value)}\\ \\mathrm{cm^{-3}}`}</M>
    <input type="range" min={Math.log10(min)} max={Math.log10(max)} step={0.01} value={Math.log10(Math.max(value, min))} onChange={e => set(Math.pow(10, +e.target.value))} style={{ width: "100%" }} /></label>;
}
function Slider({ tex, value, set, min, max, step = 1 }) {
  return <label style={lab}><M>{tex}</M><input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} style={{ width: "100%" }} /></label>;
}
const Out = ({ rows }) => <table className="tb-table" style={{ fontSize: 14 }}><tbody>{rows.map(([a, b], i) => <tr key={i}><td><M>{a}</M></td><td><M>{b}</M></td></tr>)}</tbody></table>;

// ---------- n_i(T)：图 A1.4 的交互重算 ----------
export function NiPlot() {
  return <Plot x={{ label: R`T\ (\mathrm{K})`, domain: [150, 1500] }} y={{ label: R`n_i\ (\mathrm{cm^{-3}})`, log: true, domain: [1e7, 1e20] }}
    params={[{ id: "T", label: "T", min: 150, max: 1500, step: 1, value: 300 }]}
    series={() => Object.keys(MATS).map(m => ({ label: R`\mathrm{${m}}`, f: T => ni(m, T), color: MATS[m].color }))}
    vlines={p => [{ x: p.T, label: R`T=${Math.round(p.T)}\,\mathrm K` }]}
    caption={R`由 Table A1.1 的 $E_G(T)$、$N_C$、$N_V$ 代入 \eqref{A1.12} 实时计算；移动鼠标读数，拖动滑块移动竖线。与原书图 A1.4 对照：曲线形状、相对次序与量级一致（例如硅在 $1000\,$K 约 $10^{17}$，$1400\,$K 约 $10^{18}$ 量级）。`} />;
}

export function NiCalc() {
  const [m, setM] = useState("Si"), [T, setT] = useState(300);
  const eg = Eg(m, T), v = ni(m, T);
  return <div style={box}>
    <div>{Object.keys(MATS).map(k => <button key={k} style={btn(k === m)} onClick={() => setM(k)}>{k}</button>)}</div>
    <Slider tex={R`T = ${T}\ \mathrm{K}\ (${T - 273}\,^\circ\mathrm{C})`} value={T} set={setT} min={50} max={1600} />
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{[[300, "室温"], [1173, "900 °C"], [1273, "1000 °C"], [1373, "1100 °C"]].map(([t, s]) => <button key={t} style={btn(T === t)} onClick={() => setT(t)}>{s}</button>)}</div>
    <Out rows={[
      [R`E_G(T)`, R`${eg.toFixed(4)}\ \mathrm{eV}`],
      [R`N_C,\ N_V`, R`${sci(NC(m, T))},\ ${sci(NV(m, T))}\ \mathrm{cm^{-3}}`],
      [R`n_i=\sqrt{N_CN_V}\,e^{-E_G/2kT}`, R`${sci(v)}\ \mathrm{cm^{-3}}`],
      ...(m === "Si" ? [[R`\text{(A1.12) 右端近似}`, R`${sci(niSi112(T))}\ \mathrm{cm^{-3}}`]] : []),
      [R`\text{Table A1.1 室温列}`, R`${sci(MATS[m].niRT)}\ \mathrm{cm^{-3}}`],
    ]} />
  </div>;
}

// ---------- f(E)：图 A1.10 ----------
export function FermiDiracPlot() {
  return <Plot x={{ label: R`E-E_F\ (\mathrm{eV})`, domain: [-0.5, 0.5] }} y={{ label: R`f(E)`, domain: [0, 1.02] }}
    params={[{ id: "T", label: "T\\,(\\mathrm K)", min: 10, max: 1600, step: 1, value: 600 }]}
    series={p => [
      { label: R`0\,\mathrm K`, f: E => (E < 0 ? 1 : E > 0 ? 0 : 0.5), color: "#999" },
      { label: R`300\,\mathrm K`, f: E => 1 / (1 + Math.exp(E / (kB * 300))), color: COL.e },
      { label: R`1273\,\mathrm K`, f: E => 1 / (1 + Math.exp(E / (kB * 1273))), color: COL.h },
      { label: R`T`, f: E => 1 / (1 + Math.exp(E / (kB * p.T))), color: COL.ef, dash: "dash" },
      { label: R`\text{Boltzmann}\ (T)`, f: E => Math.min(1.02, Math.exp(-E / (kB * p.T))), color: "#b8862b", dash: "dot" },
    ]}
    caption={R`\eqref{A1.6} 的三条原书曲线（0 K、300 K、1273 K）加一条可调温度的曲线及其 Boltzmann 近似 \eqref{A1.7}。可以看到：只有当 $E-E_F$ 超过几个 $kT$ 时两者才重合。1273 K 时 $E-E_F=0.1\,$eV 处 $f\approx0.29$，与原书图一致。`} />;
}

// ---------- 费米能级 / 电中性计算器 ----------
const DOP = { As: 0.049, P: 0.045, Sb: 0.039, B: 0.045, Al: 0.057, Ga: 0.065, In: 0.16 };
export function FermiCalc() {
  const [m, setM] = useState("Si"), [T, setT] = useState(298), [ND, setND] = useState(1e16), [NA, setNA] = useState(3e16);
  const [dED, setDED] = useState(0.049), [dEA, setDEA] = useState(0.045), [full, setFull] = useState(true);
  const s = useMemo(() => solveNeutral({ m, T, ND, NA, dED, dEA, full }), [m, T, ND, NA, dED, dEA, full]);
  const preset = (t) => { setM("Si"); setND(1e16); setNA(3e16); setDED(0.049); setDEA(0.045); setFull(true); setT(t); };
  const H = 200, y = E => 20 + (1 - E / s.Eg) * (H - 40);
  const yF = Math.max(5, Math.min(H - 5, y(s.EF)));
  return <div style={box}>
    <div style={{ fontSize: 13 }}>材料：{["Si", "Ge", "GaAs", "4H-SiC", "GaN"].map(k => <button key={k} style={btn(k === m)} onClick={() => setM(k)}>{k}</button>)}</div>
    <div style={{ fontSize: 13 }}>原书例题：{[[298, "(a) 室温"], [1273, "(b) 1000 °C"], [50, "(c) 50 K"]].map(([t, l]) => <button key={t} style={btn(false)} onClick={() => preset(t)}>{l}</button>)}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "0 18px" }}>
      <div>
        <Slider tex={R`T = ${T}\ \mathrm{K}`} value={T} set={setT} min={40} max={1600} />
        <LogSlider label="N_D" value={ND} set={setND} min={1e12} max={1e19} />
        <LogSlider label="N_A" value={NA} set={setNA} min={1e12} max={1e19} />
        <Slider tex={R`E_C-E_D = ${(dED * 1000).toFixed(0)}\ \mathrm{meV}`} value={dED} set={setDED} min={0.005} max={0.4} step={0.001} />
        <Slider tex={R`E_A-E_V = ${(dEA * 1000).toFixed(0)}\ \mathrm{meV}`} value={dEA} set={setDEA} min={0.005} max={0.4} step={0.001} />
        <div style={{ fontSize: 12 }}>施主：{["As", "P", "Sb"].map(k => <button key={k} style={btn(Math.abs(dED - DOP[k]) < 1e-4)} onClick={() => setDED(DOP[k])}>{k}</button>)}　受主：{["B", "Al", "Ga", "In"].map(k => <button key={k} style={btn(Math.abs(dEA - DOP[k]) < 1e-4)} onClick={() => setDEA(DOP[k])}>{k}</button>)}</div>
        <label style={{ fontSize: 13 }}><input type="checkbox" checked={full} onChange={e => setFull(e.target.checked)} /> 用 (A1.15) 计算杂质的不完全电离（取消则假设全部电离）</label>
      </div>
      <div>
        <Svg w={300} h={H} title="能带图中的费米能级位置">
          <rect x={30} y={0} width={200} height={20} fill="#d9d6cf" /><rect x={30} y={H - 20} width={200} height={20} fill="#d9d6cf" />
          <text x={236} y={24} fontSize="12">E<tspan dy="3" fontSize="9">C</tspan></text><text x={236} y={H - 16} fontSize="12">E<tspan dy="3" fontSize="9">V</tspan></text>
          <line x1={30} x2={230} y1={y(s.Eg - dED)} y2={y(s.Eg - dED)} stroke={COL.as} strokeDasharray="6 5" /><text x={236} y={y(s.Eg - dED) + 10} fontSize="12" fill={COL.as}>E<tspan dy="3" fontSize="9">D</tspan></text>
          <line x1={30} x2={230} y1={y(dEA)} y2={y(dEA)} stroke={COL.b} strokeDasharray="6 5" /><text x={236} y={y(dEA) - 2} fontSize="12" fill={COL.b}>E<tspan dy="3" fontSize="9">A</tspan></text>
          <line x1={30} x2={230} y1={y(s.Ei)} y2={y(s.Ei)} stroke="#999" strokeDasharray="2 4" /><text x={4} y={y(s.Ei) + 4} fontSize="12" fill="#777">E<tspan dy="3" fontSize="9">i</tspan></text>
          <line x1={30} x2={230} y1={yF} y2={yF} stroke={COL.ef} strokeWidth="2.5" /><text x={4} y={yF + 4} fontSize="12" fill={COL.ef}>E<tspan dy="3" fontSize="9">F</tspan></text>
          {Array.from({ length: Math.min(12, Math.round(Math.max(0, Math.log10(s.n + 1)) - 2)) }, (_, i) => <Elec key={i} x={45 + i * 15} y={8} r={4} />)}
          {Array.from({ length: Math.min(12, Math.round(Math.max(0, Math.log10(s.p + 1)) - 2)) }, (_, i) => <Hole key={i} x={45 + i * 15} y={H - 9} r={4} />)}
        </Svg>
        <Out rows={[
          [R`E_G,\ kT`, R`${s.Eg.toFixed(3)}\ \mathrm{eV},\ ${(s.kT * 1000).toFixed(2)}\ \mathrm{meV}`],
          [R`n_i`, R`${sci(s.ni)}`],
          [R`n`, R`${sci(s.n)}\ \mathrm{cm^{-3}}`], [R`p`, R`${sci(s.p)}\ \mathrm{cm^{-3}}`],
          [R`E_F-E_V`, R`${s.EF.toFixed(4)}\ \mathrm{eV}`], [R`E_F-E_i`, R`${(s.EF - s.Ei).toFixed(4)}\ \mathrm{eV}`],
          [R`N_D^+/N_D,\ N_A^-/N_A`, R`${(s.NDp / ND * 100).toFixed(1)}\%,\ ${(s.NAm / NA * 100).toFixed(1)}\%`],
        ]} />
      </div>
    </div>
    <p style={{ fontSize: 12, margin: 0 }}>求解：对 <M>{R`E_F`}</M> 二分，使 <M>{R`p+N_D^+-n-N_A^-=0`}</M>；<M>{R`n,p`}</M> 用 Boltzmann 式 (A1.8)(A1.9)，<M>{R`N_C,N_V,E_G`}</M> 取 Table A1.1，<M>{R`g_D=2,\ g_A=4`}</M>。注意 Table A1.1 给出的室温硅 <M>{R`n_i\approx8.7\times10^9`}</M>，比原书常用的 <M>{R`1.45\times10^{10}`}</M> 小，所以室温下的少子浓度会与例题略有出入。</p>
  </div>;
}

// ---------- 冻析 / 非本征 / 本征：图 A1.13 ----------
export function FreezeoutPlot() {
  return <Plot x={{ label: R`T\ (\mathrm{K})`, domain: [20, 800] }} y={{ label: R`n\ /\ 10^{15}\ \mathrm{cm^{-3}}`, domain: [0, 4.2] }}
    params={[{ id: "lg", label: "\\log_{10}N_D", min: 14, max: 17, step: 0.05, value: 15 }, { id: "dE", label: "E_C-E_D\\,(\\mathrm{eV})", min: 0.01, max: 0.2, step: 0.001, value: 0.049 }]}
    series={p => [
      { label: R`n`, f: T => (T < 40 ? NaN : solveNeutral({ T, ND: 10 ** p.lg, NA: 0, dED: p.dE }).n / 1e15), color: COL.e },
      { label: R`n_i`, f: T => ni("Si", T) / 1e15, color: "#999", dash: "dash" },
      { label: R`N_D`, f: () => 10 ** p.lg / 1e15, color: COL.as, dash: "dot" },
    ]}
    caption={R`施主（默认 As，$N_D=10^{15}\,\mathrm{cm^{-3}}$）硅中电子浓度随温度：低温"冻析"（施主未全部电离），中温 $n\approx N_D$ 的非本征平台（器件工作区），高温 $n_i$ 超过 $N_D$ 进入本征区（工艺温度）。由 (A1.15) 与电中性实时求解；40 K 以下数值太小不画。`} />;
}

// ---------- 费米能级随温度：图 A1.14 ----------
export function FermiTPlot() {
  const Ns = [1e15, 1e16, 1e17, 1e18, 1e19], cs = ["#2c4a6e", "#2f6f73", "#3c6b4a", "#b8862b", "#8a5a2b"];
  return <Plot x={{ label: R`T\ (\mathrm{K})`, domain: [60, 1000] }} y={{ label: R`E-\tfrac12(E_C+E_V)\ (\mathrm{eV})`, domain: [-0.62, 0.62] }}
    series={() => [
      { label: R`E_C`, f: T => Eg("Si", T) / 2, color: "#555", width: 3 },
      { label: R`E_V`, f: T => -Eg("Si", T) / 2, color: "#555", width: 3 },
      ...Ns.map((N, i) => ({ label: R`N_D=10^{${15 + i}}`, f: T => { const s = solveNeutral({ T, ND: N, NA: 0, dED: 0.045 }); return s.EF - s.Eg / 2; }, color: cs[i] })),
      ...Ns.map((N, i) => ({ f: T => { const s = solveNeutral({ T, ND: 0, NA: N, dEA: 0.045 }); return s.EF - s.Eg / 2; }, color: cs[i], dash: "dash" })),
    ]}
    caption={R`实线：N 型（$N_D=10^{15}$–$10^{19}\,\mathrm{cm^{-3}}$）；虚线：同浓度的 P 型。由电中性方程逐点求解，带边按 Table A1.1 收缩。每条曲线随温度升高都向禁带中央靠拢——材料越来越"本征"。$10^{18}$–$10^{19}$ 的曲线在低温端已进入 Boltzmann 近似失效的简并区，只作定性参考（这一点原书图同样如此）。`} />;
}

// ---------- 电阻率：图 A1.6 ----------
export function ResistivityPlot() {
  return <Plot x={{ label: R`N\ (\mathrm{cm^{-3}})`, log: true, domain: [1e12, 1e20] }} y={{ label: R`\rho\ (\mathrm{\Omega}\,\mathrm{cm})`, log: true, domain: [1e-4, 1e4] }}
    series={() => [
      { label: R`\text{N 型 (As)}`, f: rhoN, color: COL.e, dash: "dash" },
      { label: R`\text{P 型 (B)}`, f: rhoP, color: COL.h },
    ]}
    caption={R`由 \eqref{A1.1}（只保留多子项）与 Masetti 等人的掺杂–迁移率经验式实时计算。读数：$10^{15}$ 时 N 型约 $4.6\,\mathrm{\Omega}\,\mathrm{cm}$、P 型约 $13.5\,\mathrm{\Omega}\,\mathrm{cm}$；$10^{19}$ 时分别约 $0.006$ 与 $0.009\,\mathrm{\Omega}\,\mathrm{cm}$——与原书图 A1.6 的两条曲线吻合。P 型更"贵"是因为 $\mu_p<\mu_n$。`} />;
}
export function MobilityPlot() {
  return <Plot x={{ label: R`N\ (\mathrm{cm^{-3}})`, log: true, domain: [1e13, 5e20] }} y={{ label: R`\mu\ (\mathrm{cm^2/V\,s})`, log: true, domain: [20, 2000] }}
    series={() => [{ label: R`\mu_n`, f: muN, color: COL.e }, { label: R`\mu_p`, f: muP, color: COL.h }]}
    caption={R`本页 Irvin 曲线与电阻率计算所用的 300 K 迁移率（Masetti 1983 拟合，电子取 As、空穴取 B）。轻掺杂极限 $\mu_n\approx1417$、$\mu_p\approx470$，与 A.5 表一致。`} />;
}

// ---------- SRH：复合率对陷阱能级的依赖 ----------
export function SrhPlot() {
  return <Plot x={{ label: R`E_T-E_i\ (\mathrm{eV})`, domain: [-0.55, 0.55] }} y={{ label: R`U/U_{\max}`, domain: [0, 1.05] }}
    params={[{ id: "T", label: "T\\,(\\mathrm K)", min: 250, max: 1300, step: 1, value: 300 }, { id: "lg", label: "\\log_{10}N_D", min: 12, max: 18, step: 0.1, value: 15 }]}
    series={p => {
      const kT = kB * p.T, n_i = ni("Si", p.T), N = 10 ** p.lg, n = N / 2 + Math.sqrt(N * N / 4 + n_i * n_i), pp = n_i * n_i / n;
      const pe = Math.max(1e-3 * n, 1e10), nn = n + pe, ph = pp + pe;     // 小注入：多加 1e10 或 0.1% 的过剩载流子
      const U = d => (nn * ph - n_i * n_i) / (ph + nn + 2 * n_i * Math.cosh(d / kT));
      const Um = U(0);
      return [{ label: R`U(E_T)`, f: d => U(d) / Um, color: COL.ef }];
    }}
    caption={R`按 \eqref{A1.24}，在 N 型硅中加入少量过剩载流子后，净复合率随陷阱能级位置的变化。分母中的 $2n_i\cosh[(E_T-E_i)/kT]$ 在 $E_T=E_i$ 时最小，所以靠近禁带中央的深能级（Au、Fe 等）是最有效的复合–产生中心；浅能级几乎不起作用。在 N 型材料中曲线顶部是一个平台：只要 $2n_i\cosh[(E_T-E_i)/kT]$ 仍小于 $n$（即 $|E_T-E_i|\lesssim kT\ln(n/n_i)$），陷阱都同样有效；越过这个范围效率才指数下降。温度越高、$n_i$ 越大，这个"选择性"越弱。`} />;
}

// ---------- (A1.17)/(A1.18) 的小计算：电离比例 ----------
export function IonizationPlot() {
  return <Plot x={{ label: R`T\ (\mathrm{K})`, domain: [20, 500] }} y={{ label: R`N^+_D/N_D`, domain: [0, 1.02] }}
    params={[{ id: "lg", label: "\\log_{10}N_D", min: 14, max: 19, step: 0.05, value: 16 }, { id: "dE", label: "E_C-E_D\\,(\\mathrm{eV})", min: 0.005, max: 0.35, step: 0.001, value: 0.045 }]}
    series={p => [
      { label: R`\text{Si}`, f: T => ionized(10 ** p.lg, gammaN("Si", T, p.dE)) / 10 ** p.lg, color: COL.e },
      { label: R`\text{4H-SiC}`, f: T => ionized(10 ** p.lg, gammaN("4H-SiC", T, p.dE)) / 10 ** p.lg, color: COL.b, dash: "dash" },
    ]}
    caption={R`式 \eqref{A1.17} 给出的施主电离比例。默认浅施主（45 meV）在 $10^{16}$ 的硅里，室温下几乎全电离；把 $E_C-E_D$ 拉到 0.2–0.3 eV（宽禁带材料中的深受主，Table A1.2），即使室温也只有一小部分电离——这正是 SiC、GaN 做 P 型的难点。`} />;
}
