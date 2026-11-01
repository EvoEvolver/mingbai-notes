// 第 5 章（上）交互图。数值函数见 _ch05_phys.jsx（已用 node 与原书例题、文中数值核对）。
import { useMemo, useState } from "react";
import { Plot, Slider, Seg, renderTex, TxI } from "@kit";
import * as P from "./_ch05_phys.jsx";
import { Frame, COL } from "./_ch05_figs.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const H = ({ tex }) => <span dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />;

// ---------- 1. 图 5.20：Airy 斑 ----------
export function AiryPlot() {
  return <Plot
    x={{ label: R`r\,\mathrm{NA}/\lambda`, domain: [-2.2, 2.2] }}
    y={{ label: R`I/I_0`, domain: [0, 1.05] }}
    params={[
      { id: "lam", label: R`\lambda\,[\mathrm{nm}]`, min: 13.5, max: 436, step: 0.5, value: 193 },
      { id: "NA", label: R`\mathrm{NA}`, min: 0.1, max: 1.35, step: 0.01, value: 0.6 },
    ]}
    series={p => [
      { label: R`\text{圆孔：}[2J_1(v)/v]^2,\ r_1=0.61\lambda/\mathrm{NA}=${f2(0.61 * p.lam / p.NA, 1)}\,\mathrm{nm}`, f: u => P.airy(2 * Math.PI * u) },
      { label: R`\text{狭缝：}\mathrm{sinc}^2,\ \text{第一零点}\ 0.5\lambda/\mathrm{NA}`, f: u => { const v = 2 * Math.PI * u; return Math.abs(v) < 1e-9 ? 1 : (Math.sin(v) / v) ** 2; }, dash: "dash", color: "#999" },
      { label: R`\times 20\ \text{放大旁瓣}`, f: u => Math.min(1.05, 20 * P.airy(2 * Math.PI * u)), dash: "dot", color: COL.light, width: 1.2 },
    ]}
    vlines={[{ x: 0.61, label: R`0.61` }, { x: -0.61 }]}
    samples={260} />;
}

// ---------- 2. 图 5.22：两点的 Rayleigh 判据 ----------
export function TwoPointPlot() {
  return <Plot
    x={{ label: R`x\,\mathrm{NA}/\lambda`, domain: [-2.2, 2.2] }}
    y={{ label: R`I`, domain: [0, 1.6] }}
    params={[{ id: "s", label: R`\text{间距}/(0.61\lambda/\mathrm{NA})`, min: 0.3, max: 2, step: 0.01, value: 1 }]}
    series={p => {
      const d = 0.61 * p.s, A = u => P.airy(2 * Math.PI * (u + d / 2)), B = u => P.airy(2 * Math.PI * (u - d / 2));
      const dip = (A(0) + B(0)) / Math.max(1e-9, A(-d / 2) + B(-d / 2));
      return [
        { label: R`\text{两点之和（非相干）}:\ I_{\rm 中心}/I_{\rm 峰}=${f2(Math.min(dip, 9), 3)}`, f: u => A(u) + B(u), color: COL.ink },
        { label: R`\text{点 A}`, f: A, dash: "dot", color: COL.accent },
        { label: R`\text{点 B}`, f: B, dash: "dot", color: COL.blue },
      ];
    }}
    vlines={p => [{ x: -0.305 * p.s }, { x: 0.305 * p.s }]}
    samples={240} />;
}

// ---------- 3. 图 5.21：接近式曝光的 Fresnel 衍射 ----------
export function FresnelPlot() {
  return <Plot
    x={{ label: R`x/W`, domain: [-1.2, 1.2] }}
    y={{ label: R`I/I_{\rm inc}`, domain: [0, 1.9] }}
    params={[
      { id: "lam", label: R`\lambda\,[\mathrm{nm}]`, min: 193, max: 436, step: 1, value: 365 },
      { id: "W", label: R`W\,[\mu\mathrm{m}]`, min: 0.5, max: 20, step: 0.1, value: 5 },
      { id: "g", label: R`g\,[\mu\mathrm{m}]`, min: 0.5, max: 100, log: true, value: 10 },
    ]}
    series={p => {
      const lam = p.lam / 1000, NF = p.W * p.W / (lam * p.g), wmin = Math.sqrt(lam * p.g);
      return [
        { label: R`\text{Fresnel}:\ N_F=W^2/\lambda g=${f2(NF, 1)},\ W_{\min}\approx\sqrt{\lambda g}=${f2(wmin, 2)}\,\mu\mathrm{m}`, f: u => P.fresnelSlit(u * p.W, p.W, p.g, lam), color: COL.accent },
        { label: R`\text{掩模开口}`, f: u => (Math.abs(u) < 0.5 ? 1 : 0), dash: "dot", color: "#999", width: 1.4 },
      ];
    }}
    vlines={[{ x: -0.5 }, { x: 0.5 }]}
    samples={360} />;
}

// ---------- 4. 图 5.27：三种曝光方式的空间像 ----------
export function ThreeSystemsPlot() {
  return <Plot
    x={{ label: R`x/W`, domain: [-1.5, 1.5] }}
    y={{ label: R`I`, domain: [0, 1.8] }}
    params={[
      { id: "W", label: R`W\,[\mu\mathrm{m}]`, min: 0.3, max: 6, step: 0.05, value: 1.5 },
      { id: "g", label: R`g\ (\text{接近式})\,[\mu\mathrm{m}]`, min: 1, max: 50, log: true, value: 10 },
      { id: "NA", label: R`\mathrm{NA}\ (\text{投影式})`, min: 0.1, max: 0.9, step: 0.01, value: 0.45 },
    ]}
    series={p => {
      const lam = 0.365;
      return [
        { label: R`\text{接触式（理想，}g\to0)`, f: u => (Math.abs(u) < 0.5 ? 1 : 0), color: COL.ink, width: 1.6 },
        { label: R`\text{接近式}\ g=${f2(p.g, 1)}\,\mu\mathrm{m}`, f: u => P.fresnelSlit(u * p.W, p.W, p.g, lam), color: COL.accent },
        { label: R`\text{投影式（相干）}\ \mathrm{NA}=${f2(p.NA)}`, f: u => P.coherentSlitImage(u * p.W, p.W, p.NA, lam), color: COL.blue },
      ];
    }}
    vlines={[{ x: -0.5 }, { x: 0.5 }]}
    samples={220} />;
}

// ---------- 5. 分辨率与焦深计算器 ----------
const GEN_COLOR = { g: "#7d3c98", i: "#2c4a6e", krf: "#16808a", arf: "#2c6e49", arfi: "#b8862b", euv: "#c0392b" };
export function ResolutionCalc() {
  const [sid, setSid] = useState("arf");
  const src = P.SOURCES.find(s => s.id === sid);
  const [NA, setNA] = useState(0.6), [k1, setK1] = useState(0.75), [k2, setK2] = useState(0.5);
  const na = Math.min(NA, src.naMax);
  const Rn = P.resolution(src.lam, na, k1), D = P.dof(src.lam, na, k2);
  const E = P.photonEnergy(src.lam);
  const sinA = na / src.n;
  return <Frame>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
      <Seg options={P.SOURCES.map(s => [s.id, `${s.name} ${s.lam} nm`])} value={sid} onChange={v => { setSid(v); const s = P.SOURCES.find(q => q.id === v); if (NA > s.naMax) setNA(s.naMax); }} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0 18px", marginTop: 8 }}>
      <Slider label={`数值孔径 $\\mathrm{NA}$（上限 ${src.naMax}）`} value={na} min={0.1} max={src.naMax} step={0.01} onChange={setNA} />
      <Slider label="工艺因子 $k_1$" value={k1} min={0.25} max={0.9} step={0.01} onChange={setK1} />
      <Slider label="焦深因子 $k_2$" value={k2} min={0.3} max={1} step={0.01} onChange={setK2} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginTop: 10, textAlign: "center" }}>
      {[[R`R=k_1\lambda/\mathrm{NA}`, `${Rn.toFixed(Rn < 20 ? 1 : 0)} nm`, COL.accent], [R`\mathrm{DOF}=\pm k_2\lambda/\mathrm{NA}^2`, `\u00b1 ${D.toFixed(D < 20 ? 1 : 0)} nm`, COL.blue], [R`E=hc/\lambda`, `${E.toFixed(E < 10 ? 2 : 1)} eV`, COL.green], [R`\sin\alpha=\mathrm{NA}/n`, `${sinA.toFixed(2)}（${(Math.asin(Math.min(1, sinA)) * 180 / Math.PI).toFixed(0)} 度）`, COL.muted]].map(([t, v, c], i) =>
        <div key={i} style={{ background: "#fff", border: "1px solid #e4dfd4", borderRadius: 8, padding: "6px 4px" }}><div style={{ fontSize: 12.5 }}><H tex={t} /></div><div style={{ fontSize: 20, fontWeight: 600, color: c }}>{v}</div></div>)}
    </div>
    <p style={{ fontSize: 13, color: COL.muted, margin: "8px 0 0" }}>
      {src.n > 1 ? <TxI>{R`浸没式在镜头与晶圆之间充水（$n\approx1.44$），$\mathrm{NA}=n\sin\alpha$ 可以超过 1——式 (5.6) 里那个"为一般性而保留"的 $n$ 在这里真正派上用场。`}</TxI>
        : src.id === "euv" ? <TxI>{R`EUV 用反射镜，目前量产 $\mathrm{NA}=0.33$，High-NA 机型 $\mathrm{NA}=0.55$。分辨率高，但焦深只有十几到几十纳米，胶必须很薄。`}</TxI>
        : <TxI>{R`原书例题：$\lambda=193\,\mathrm{nm}$、$\mathrm{NA}=0.6$、$k_1=0.75$、$k_2=0.5$ 给出 $R=241\,\mathrm{nm}$、$\mathrm{DOF}=\pm268\,\mathrm{nm}$（书中取 $\pm270$）。`}</TxI>}
    </p>
  </Frame>;
}
// R 与 DOF 随 NA 的曲线，并标出历代机台
export function ResolutionVsNA({ which = "R" }) {
  const isR = which === "R";
  return <Plot
    x={{ label: R`\mathrm{NA}`, domain: [0.2, 1.4] }}
    y={{ label: isR ? R`R\,[\mathrm{nm}]` : R`|\mathrm{DOF}|\,[\mathrm{nm}]`, log: true, domain: isR ? [5, 3000] : [5, 20000] }}
    params={[isR ? { id: "k", label: R`k_1`, min: 0.25, max: 0.9, step: 0.01, value: 0.61 } : { id: "k", label: R`k_2`, min: 0.3, max: 1, step: 0.01, value: 0.5 }]}
    series={p => [
      ...P.SOURCES.map(s => ({ label: R`${s.lam}\,\mathrm{nm}${s.n > 1 ? R`\ (\text{水})` : ""}`, f: na => (na <= s.naMax ? (isR ? P.resolution(s.lam, na, p.k) : P.dof(s.lam, na, p.k)) : NaN), color: GEN_COLOR[s.id], dash: s.n > 1 ? "dash" : undefined })),
      ...(isR ? [{ label: R`\text{历代量产机台（典型 }k_1\text{）}`, data: P.GENERATIONS.map(g => [g.na, P.resolution(g.lam, g.na, g.k1)]), points: true, color: "#555" }] : []),
    ]}
    samples={200} />;
}
// 历代机台表
export const GEN_ROWS = P.GENERATIONS.map(g => [String(g.year), g.node, R`$${g.lam}$`, R`$${g.na}$`, R`$${g.k1}$`, R`$${P.resolution(g.lam, g.na, g.k1).toFixed(0)}$`, R`$\pm${P.dof(g.lam, g.na, 0.5).toFixed(0)}$`]);

// ---------- 6. 调制度（MTF）随半周期变化：部分相干 σ 的作用 ----------
export function MTFPlot() {
  return <Plot
    x={{ label: R`\text{半周期}\ k_1=\tfrac{p}{2}\,\mathrm{NA}/\lambda`, domain: [0.2, 1.0] }}
    y={{ label: R`\mathrm{MTF}=(I_{\rm MAX}-I_{\rm MIN})/(I_{\rm MAX}+I_{\rm MIN})`, domain: [0, 1.05] }}
    params={[{ id: "z", label: R`\text{离焦}\ \delta/(\lambda/\mathrm{NA}^2)`, min: 0, max: 1.5, step: 0.05, value: 0 }]}
    series={p => [0, 0.3, 0.6, 0.9].map((s, i) => ({
      label: R`\sigma=${s}`, color: [COL.ink, COL.blue, COL.accent, COL.green][i], dash: i === 0 ? "dash" : undefined,
      f: k => P.gratingMTF({ p: 2 * k / 0.5, lam: 1, NA: 0.5, sigma: s, z: p.z / 0.25, ns: 5 }),
    }))}
    vlines={[{ x: 0.5, label: R`\sigma=0\ \text{截止}` }, { x: 0.5 / 1.6, label: R`\sigma=0.6\ \text{截止}` }]}
    samples={70} />;
}
// 空间像本身（图 5.25 交互版）
export function AerialImagePlot() {
  return <Plot
    x={{ label: R`x/p`, domain: [0, 2] }}
    y={{ label: R`I(x)`, domain: [0, 1.4] }}
    params={[
      { id: "k", label: R`k_1=\tfrac p2\mathrm{NA}/\lambda`, min: 0.25, max: 1.5, step: 0.01, value: 0.6 },
      { id: "s", label: R`\sigma`, min: 0, max: 1, step: 0.05, value: 0.5 },
      { id: "z", label: R`\delta/(\lambda/\mathrm{NA}^2)`, min: 0, max: 1.5, step: 0.05, value: 0 },
    ]}
    series={p => {
      const f = P.gratingImage({ p: 2 * p.k / 0.5, lam: 1, NA: 0.5, sigma: p.s, z: p.z / 0.25, nx: 120, ns: 7 }), pp = 2 * p.k / 0.5;
      return [
        { label: R`\text{空间像}:\ \mathrm{MTF}=${f2(f.mtf)}`, f: u => f(u * pp), color: COL.accent },
        { label: R`\text{掩模透过率}`, f: u => (Math.abs(((u % 1) + 1) % 1 - 0.5) < 0.25 ? 1 : 0), dash: "dot", color: "#999", width: 1.3 },
      ];
    }}
    samples={240} />;
}

// ---------- 7. 图 5.28：对比度曲线 ----------
export function ContrastPlot() {
  return <Plot
    x={{ label: R`\text{曝光剂量}\ Q\ [\mathrm{mJ\,cm^{-2}}]`, log: true, domain: [1, 1000] }}
    y={{ label: R`\text{显影后剩余厚度分数}`, domain: [-0.02, 1.08] }}
    params={[
      { id: "Q0", label: R`Q_0`, min: 1, max: 100, log: true, value: 40 },
      { id: "Qf", label: R`Q_f`, min: 2, max: 500, log: true, value: 100 },
    ]}
    series={p => {
      const Qf = Math.max(p.Qf, p.Q0 * 1.05), g = P.gammaOf(p.Q0, Qf);
      return [
        { label: R`\text{正胶}:\ \gamma=${f2(g)},\ \mathrm{CMTF}=${f2(P.cmtf(g))}`, f: D => P.remainingPositive(D, p.Q0, Qf), color: COL.resistDark },
        { label: R`\text{负胶（同样的 }Q_0,Q_f)`, f: D => P.remainingNegative(D, p.Q0, Qf), color: COL.green, dash: "dash" },
      ];
    }}
    vlines={p => [{ x: p.Q0, label: R`Q_0` }, { x: Math.max(p.Qf, p.Q0 * 1.05), label: R`Q_f` }]}
    samples={300} />;
}
// CMTF(γ)（式 5.16）
export function CMTFPlot() {
  return <Plot
    x={{ label: R`\gamma`, domain: [1, 12] }}
    y={{ label: R`\mathrm{CMTF}`, domain: [0, 0.85] }}
    series={[
      { label: R`\mathrm{CMTF}=(10^{1/\gamma}-1)/(10^{1/\gamma}+1)`, f: P.cmtf, color: COL.resistDark },
      { label: R`\text{g/i 线 DNQ 胶}\ (\gamma=2\text{–}3)`, data: [[2, P.cmtf(2)], [2.5, P.cmtf(2.5)], [3, P.cmtf(3)]], points: true, color: COL.blue },
      { label: R`\text{DUV 化学放大胶}\ (\gamma=5\text{–}10)`, data: [[5, P.cmtf(5)], [7.5, P.cmtf(7.5)], [10, P.cmtf(10)]], points: true, color: COL.accent },
      { label: R`\text{典型曝光系统}\ \mathrm{MTF}\ge0.5`, f: () => 0.5, dash: "dot", color: "#999" },
    ]}
    samples={160} />;
}

// ---------- 8. 图 5.29：空间像 + 对比度 → 胶的边缘 ----------
export function ResistEdgePlot() {
  return <Plot
    x={{ label: R`x/p`, domain: [0, 1.5] }}
    y={{ label: R`\text{相对剂量}\ Q/Q_f\ \ /\ \ \text{剩余厚度}`, domain: [0, 1.45] }}
    params={[
      { id: "k", label: R`\text{像质}\ k_1`, min: 0.3, max: 1.2, step: 0.01, value: 0.8 },
      { id: "g", label: R`\gamma`, min: 1.5, max: 10, step: 0.1, value: 3 },
      { id: "dose", label: R`\text{峰值剂量}/Q_f`, min: 0.6, max: 2, step: 0.01, value: 1.2 },
    ]}
    series={p => {
      const pp = 2 * p.k / 0.5, f = P.gratingImage({ p: pp, lam: 1, NA: 0.5, sigma: 0.5, nx: 160, ns: 6 });
      const Q0 = Math.pow(10, -1 / p.g), E = u => p.dose * f(u * pp - pp / 2) / f.max;
      let n = 0, nT = 0; for (let i = 0; i < 400; i++) { const e = E(i / 400); if (e > Q0 && e < 1) nT++; n++; }
      return [
        { label: R`\text{空间像}\times\text{剂量}\ (\mathrm{MTF}=${f2(f.mtf)})`, f: E, color: COL.light },
        { label: R`\text{显影后正胶厚度}:\ \text{过渡区占周期}\ ${(100 * nT / n).toFixed(0)}\%`, f: u => P.remainingPositive(E(u), Q0, 1), color: COL.resistDark, width: 2.6 },
        { label: R`Q_f`, f: () => 1, dash: "dash", color: "#777", width: 1 },
        { label: R`Q_0=10^{-1/\gamma}Q_f`, f: () => Q0, dash: "dot", color: "#777", width: 1 },
      ];
    }}
    samples={300} />;
}

// ---------- 9. 化学放大：灵敏度示意 ----------
export function CARPlot() {
  return <Plot
    x={{ label: R`\text{剂量}\ [\mathrm{mJ\,cm^{-2}}]`, log: true, domain: [1, 500] }}
    y={{ label: R`\text{已转化（可溶）比例}`, domain: [0, 1.05] }}
    params={[
      { id: "N", label: R`\text{每个酸催化次数}\ N`, min: 1, max: 300, log: true, value: 100 },
      { id: "ell", label: R`\text{PAG/保护基}\ \ell`, min: 0.01, max: 0.2, step: 0.005, value: 0.05 },
      { id: "q", label: R`\text{淬灭剂}\ q`, min: 0, max: 0.5, step: 0.01, value: 0 },
    ]}
    series={p => [
      { label: R`\text{DNQ（量子效率 0.3，无放大）}`, f: P.dnqConv, color: COL.blue, dash: "dash" },
      { label: R`\text{化学放大胶}`, f: D => P.carConv(D, { N: p.N, ell: p.ell, q: p.q }), color: COL.accent },
    ]}
    vlines={p => {
      const d90c = P.D1 / (0.3 * p.ell) * (Math.log(10) / p.N + p.q * p.ell);
      return [{ x: Math.log(10) * P.D1 / 0.3, label: R`\text{DNQ 90\%}` }, { x: d90c, label: R`\text{CAR 90\%}=${f2(d90c, 0)}` }];
    }}
    samples={240} />;
}

// ---------- 10. 电子束直写时间（式 5.2） ----------
export function EbeamCalc() {
  const [dose, setDose] = useState(500), [cur, setCur] = useState(350), [area, setArea] = useState(1);
  const t = P.ebeamTime(dose, area, cur), wafer = P.ebeamTime(dose, Math.PI * 15 * 15, cur);
  const fmtT = s => s < 120 ? `${s.toFixed(0)} s` : s < 7200 ? `${(s / 60).toFixed(1)} min` : s < 172800 ? `${(s / 3600).toFixed(1)} h` : `${(s / 86400).toFixed(1)} 天`;
  return <Frame>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0 18px" }}>
      <Slider label={`胶的剂量 $${dose}\\,\\mu\\mathrm{C\\,cm^{-2}}$`} value={dose} min={50} max={1500} step={10} onChange={setDose} />
      <Slider label={`束流 $${cur}\\,\\mathrm{nA}$`} value={cur} min={1} max={1000} step={1} onChange={setCur} />
      <Slider label={`面积 $${area}\\,\\mathrm{cm^2}$`} value={area} min={0.01} max={10} step={0.01} onChange={setArea} />
    </div>
    <p style={{ textAlign: "center", fontSize: 15, margin: "6px 0" }}>写这块面积：<b style={{ color: COL.accent }}>{fmtT(t)}</b>　　写满整片 300 mm 晶圆（<H tex={R`707\,\mathrm{cm^2}`} />）：<b style={{ color: COL.accent }}>{fmtT(wafer)}</b></p>
    <p style={{ fontSize: 12.5, color: COL.muted, margin: 0 }}>假设束流全部有效、无换场与回扫开销，所以是下限。对比：一台扫描式投影光刻机每小时可曝光约 250 片 300 mm 晶圆。</p>
  </Frame>;
}

// ---------- 11. EUV 多次反射后的剩余能量 ----------
export function MirrorPlot() {
  return <Plot
    x={{ label: R`\text{反射次数}\ \sym{kk}{k}\ (\text{掩模}+\text{反射镜})`, domain: [1, 14] }}
    y={{ label: R`\text{到达晶圆的能量比例}\ R_{\rm m}^{\,\sym{kk}{k}}`, log: true, domain: [1e-4, 1] }}
    params={[{ id: "Rm", label: R`R_{\rm m}`, min: 0.3, max: 0.95, step: 0.01, value: 0.7 }]}
    series={p => [
      { label: R`R_{\rm m}=${f2(p.Rm)}:\ 11\ \text{次后剩}\ ${(100 * Math.pow(p.Rm, 11)).toFixed(2)}\%`, f: k => Math.pow(p.Rm, k), color: COL.accent },
      { label: R`R_{\rm m}=0.5\ (\text{对照})`, f: k => Math.pow(0.5, k), dash: "dot", color: "#999" },
      { label: R`2\%\ (\text{原书：约 98\% 损失})`, f: () => 0.02, dash: "dash", color: COL.blue, width: 1.2 },
    ]}
    vlines={[{ x: 11, label: R`11` }]}
    samples={140} />;
}
