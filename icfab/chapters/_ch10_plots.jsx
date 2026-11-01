// 第 10 章交互图（<Plot>，浏览器内真算）。数值函数见 _ch10_phys.jsx。
import { Plot } from "@kit";
import * as P from "./_ch10_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const sci = v => { const e = Math.floor(Math.log10(v)), m = v / 10 ** e; return R`${m.toFixed(1)}\times10^{${e}}`; };
const xT = Tc => 1000 / P.TK(Tc);
const COL = { tot: "#1f1b16", ks: "#c0392b", hg: "#2c4a6e", ref: "#9a948a", op: "#b8862b" };

// ---------- 1. Grove 模型：图 10.6（APCVD）与图 10.17（降压 = LPCVD） ----------
export function GrovePlot({ lp = false }) {
  return <Plot
    x={{ label: R`1000/T\ \ [\mathrm{K^{-1}}]`, domain: [0.6, 1.3] }}
    y={{ label: R`\text{沉积速率}\ v\ [\mu\mathrm{m/min}]`, log: true, domain: [1e-4, 30] }}
    params={[
      { id: "EA", label: R`E_A\ [\mathrm{eV}]`, min: 0.5, max: 3, step: 0.05, value: 2 },
      { id: "lk0", label: R`\lg\,(k_0\,[\mathrm{cm/s}])`, min: 5, max: 13, step: 0.1, value: 9 },
      { id: "hG", label: R`h_G(760\,\mathrm{Torr})\ [\mathrm{cm/s}]`, min: 0.1, max: 30, log: true, value: 1 },
      { id: "Ptot", label: R`P_{\rm total}\ [\mathrm{Torr}]`, min: 0.1, max: 760, log: true, value: lp ? 1 : 760 },
      { id: "fd", label: R`\delta\ \text{增大倍数}\ (760\to1\,\mathrm{Torr})`, min: 3, max: 10, step: 0.5, value: 5 },
      { id: "Top", label: R`\text{工作点}\ T\ [^\circ\mathrm{C}]`, min: 500, max: 1250, step: 5, value: lp ? 750 : 900 },
    ]}
    series={p => {
      const pG = Math.min(1, p.Ptot), CG = P.CT_ATM * pG / 760;                // 反应物分压 1 Torr（总压低于 1 Torr 时取总压）
      const hg = P.hGofP(p.hG, p.Ptot, p.fd), CG760 = P.CT_ATM / 760;
      const k0 = 10 ** p.lk0, k = x => P.ks(k0, p.EA, 1000 / x);
      const v = x => P.groveV(k(x), hg, CG);
      const s = [
        { label: R`v\ \text{（式 10.7）}`, f: v, color: COL.tot, width: 2.5 },
        { label: R`k_S\,C_G/N\ \text{（式 10.8）}`, f: x => k(x) * CG / P.N_SI * 6e5, color: COL.ks, dash: "dash", width: 1.5 },
        { label: R`h_G\,C_G/N\ \text{（式 10.9）}`, f: () => hg * CG / P.N_SI * 6e5, color: COL.hg, dash: "dash", width: 1.5 },
      ];
      if (p.Ptot < 700) s.push({ label: R`760\ \mathrm{Torr}\ \text{对照}`, f: x => P.groveV(k(x), p.hG, CG760), color: COL.ref, dash: "dot", width: 1.5 });
      const vop = v(xT(p.Top)), d10 = P.tenDegree(T => P.groveV(P.ks(k0, p.EA, T), hg, CG), p.Top);
      s.push({ label: R`T=${p.Top}^\circ\mathrm{C}:\ v=${vop < 0.01 ? sci(vop) : f2(vop, 3)}\ \mu\mathrm{m/min},\ \Delta T=10^\circ\mathrm{C}\Rightarrow\Delta v/v=${f2(100 * d10, 1)}\%`, f: () => NaN, color: COL.op });
      s.push({ label: R`h_G=${f2(hg, hg < 10 ? 2 : 0)}\ \mathrm{cm/s}`, f: () => NaN, color: COL.hg });
      return s;
    }}
    vlines={p => {
      const hg = P.hGofP(p.hG, p.Ptot, p.fd), Tx = p.EA / (P.KB * Math.log(10 ** p.lk0 / hg));
      const out = [{ x: xT(p.Top), label: R`${p.Top}^\circ\mathrm{C}` }];
      if (Tx > 0) out.push({ x: 1000 / Tx, label: R`k_S=h_G:\ ${Math.round(Tx - 273.15)}^\circ\mathrm{C}` });
      return out;
    }}
    samples={200} />;
}

// ---------- 2. 图 10.8 交互版：四种硅源 ----------
const GAS = [["SiH4", R`\mathrm{SiH_4}`, "#1f1b16"], ["SiH2Cl2", R`\mathrm{SiH_2Cl_2}`, "#c0392b"], ["SiHCl3", R`\mathrm{SiHCl_3}`, "#2c6e49"], ["SiCl4", R`\mathrm{SiCl_4}`, "#2c4a6e"]];
export function Fig108Plot() {
  return <Plot
    x={{ label: R`1000/T\ \ [\mathrm{K^{-1}}]`, domain: [0.6, 1.3] }}
    y={{ label: R`\text{归一化沉积速率}\ [\mu\mathrm{m/min}]`, log: true, domain: [0.008, 1.3] }}
    params={[{ id: "dE", label: R`\text{各曲线}\ E_A\ \text{同加}\ \Delta E\ [\mathrm{eV}]`, min: -0.5, max: 0.5, step: 0.05, value: 0 }]}
    series={p => GAS.flatMap(([k, tex, c]) => {
      const q = { ...P.FIT108[k] }; const T1 = 1000 / 0.95; q.A = q.A * Math.exp(p.dE / (P.KB * T1)); q.E += p.dE;   // 以 1000/T=0.95 为支点转动
      return [
        { label: R`${tex}:\ E_A=${f2(q.E)}\,\mathrm{eV},\ h_G\text{项}=${f2(q.H)}`, f: x => P.v108(q, x), color: c },
        { data: P.FIG108[k], points: true, color: c },
      ];
    })}
    vlines={[{ x: xT(1200), label: R`1200^\circ` }, { x: xT(1000), label: R`1000^\circ` }, { x: xT(800), label: R`800^\circ` }, { x: xT(600), label: R`600^\circ` }]}
    samples={160} />;
}

// ---------- 3. 图 10.7 交互版：外扩散 + 自掺杂 ----------
export function AutodopePlot() {
  return <Plot
    x={{ label: R`\text{进入外延层的距离}\ x\ [\mu\mathrm{m}]`, domain: [0, 4] }}
    y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e13, 3e19] }}
    params={[
      { id: "lC", label: R`\lg C\ \text{（衬底，}\mathrm{cm^{-3}}\text{）}`, min: 18, max: 19.5, step: 0.05, value: 19 },
      { id: "sDt", label: R`\sqrt{Dt}\ [\mu\mathrm{m}]`, min: 0.01, max: 1, log: true, value: 0.1 },
      { id: "lCs", label: R`\lg C_S^*`, min: 15, max: 19, step: 0.05, value: 17.5 },
      { id: "L", label: R`L\ [\mu\mathrm{m}]`, min: 0.1, max: 2, step: 0.05, value: 0.4 },
      { id: "lN", label: R`\lg N_{\rm epi}\ \text{（目标掺杂）}`, min: 14, max: 17, step: 0.05, value: 15 },
    ]}
    series={q => {
      const p = { ...q, C: 10 ** q.lC, Cs: 10 ** q.lCs, Nepi: 10 ** q.lN };
      const a = x => P.outdiff(p.C, p.sDt, x), b = x => P.autodope(p.Cs, p.L, x);
      return [
        { label: R`\text{总和}`, f: x => a(x) + b(x) + p.Nepi, color: "#1f1b16", width: 2.5 },
        { label: R`\text{固相外扩散（式 10.12）}`, f: a, color: "#c0392b", dash: "dash" },
        { label: R`\text{气相自掺杂（式 10.13）}`, f: b, color: "#2c4a6e", dash: "dash" },
        { label: R`N_{\rm epi}`, f: () => p.Nepi, color: "#9a948a", dash: "dot" },
      ];
    }}
    vlines={q => {
      const p = { ...q, C: 10 ** q.lC, Cs: 10 ** q.lCs, Nepi: 10 ** q.lN };
      // 过渡区宽度：总浓度降到 2 N_epi 处
      let x = 0; for (; x < 4; x += 0.002) if (P.outdiff(p.C, p.sDt, x) + P.autodope(p.Cs, p.L, x) < p.Nepi) break;
      return x < 4 ? [{ x, label: R`x_{\rm tr}=${f2(x)}\,\mu\mathrm{m}` }] : [];
    }}
    samples={240} />;
}

// ---------- 4. 图 10.13 交互版：SiGe/Si 临界厚度 ----------
export function HcPlot() {
  return <Plot
    x={{ label: R`\mathrm{Si_{1-x}Ge_x}\ \text{中的}\ x\ \ (f\approx4.2\%\cdot x)`, domain: [0.03, 1] }}
    y={{ label: R`h_c\ [\mathrm{nm}]`, log: true, domain: [0.5, 5000] }}
    params={[{ id: "nu", label: R`\nu`, min: 0.2, max: 0.35, step: 0.01, value: 0.28 }]}
    series={p => [
      { label: R`\text{力学平衡（Matthews–Blakeslee，}\ln(h_c/b)+1\text{）}`, f: x => P.hcMB(P.misfit(x), p.nu), color: "#1f1b16", width: 2.5 },
      { label: R`\text{式 (10.14) 照印：}\ln(h_c/r_0-1)`, f: x => P.hcBook(P.misfit(x), p.nu), color: "#7d3c98", dash: "dot" },
      { label: R`\text{能量平衡（People–Bean）}`, f: x => P.hcPB(P.misfit(x), p.nu), color: "#c0392b", dash: "dash" },
      { label: R`\text{图 10.11 两个样品}`, data: [[0.12, 494], [0.42, 75]], points: true, color: "#b8862b" },
    ]}
    samples={160} />;
}

// ---------- 5. 式 (10.25)：电子平均自由程与气压 ----------
export function MfpPlot() {
  return <Plot
    x={{ label: R`P\ [\mathrm{Torr}]`, log: true, domain: [1e-3, 10] }}
    y={{ label: R`\lambda\ [\mathrm{cm}]`, log: true, domain: [3e-4, 10] }}
    params={[{ id: "d", label: R`\text{电极间距}\ d\ [\mathrm{cm}]`, min: 0.3, max: 6, step: 0.1, value: 2 }]}
    series={p => [
      { label: R`\lambda=0.005/P\ \text{（式 10.25）}`, f: P.mfpElectron, color: "#1f1b16", width: 2.5 },
      { label: R`d`, f: () => p.d, color: "#2c4a6e", dash: "dash" },
      { label: R`\lambda=d\ \text{于}\ P=${f2(1000 * 0.005 / p.d, 1)}\ \mathrm{mTorr}`, f: () => NaN, color: "#2c4a6e" },
    ]}
    vlines={[{ x: 0.005, label: R`\text{HD-PECVD}` }, { x: 0.05, label: R`\text{PECVD 下限}` }, { x: 1, label: R`\text{PECVD 上限}` }]}
    samples={120} />;
}

// ---------- 6. 式 (10.29)：鞘层电压比与电极面积比 ----------
export function SheathPlot() {
  return <Plot
    x={{ label: R`A_2/A_1`, domain: [1, 10] }}
    y={{ label: R`V_1/V_2`, log: true, domain: [1, 1e4] }}
    params={[{ id: "q", label: R`\text{指数}\ q`, min: 1, max: 4, step: 0.1, value: 1.5 }]}
    series={p => [
      { label: R`q=4\ \text{（理论，式 10.29）}`, f: x => P.sheathRatio(x, 4), color: "#9a948a", dash: "dash" },
      { label: R`q=1,\,2\ \text{（实测范围）}`, f: x => P.sheathRatio(x, 1), color: "#2c6e49", dash: "dot" },
      { f: x => P.sheathRatio(x, 2), color: "#2c6e49", dash: "dot" },
      { label: R`V_1/V_2=(A_2/A_1)^{${f2(p.q, 1)}}`, f: x => P.sheathRatio(x, p.q), color: "#c0392b", width: 2.5 },
    ]}
    samples={100} />;
}

// ---------- 7. 溅射产额与离子能量（补充模型） ----------
const TCOL = { Al: "#b8862b", Si: "#7d8fae", Ti: "#2c6e49", Cu: "#c0392b", W: "#1f1b16", Au: "#7d3c98" };
export function YieldPlot() {
  return <Plot
    x={{ label: R`\mathrm{Ar^+}\ \text{离子能量}\ E\ [\mathrm{eV}]`, domain: [0, 1500] }}
    y={{ label: R`\text{溅射产额}\ Y\ [\text{原子/离子}]`, domain: [0, 5.5] }}
    params={[{ id: "E", label: R`\text{读数能量}\ E\ [\mathrm{eV}]`, min: 20, max: 1500, step: 10, value: 500 }]}
    series={p => Object.entries(P.TARGETS).map(([k, t]) => ({
      label: R`\mathrm{${k}}:\ Y(${p.E})=${f2(P.sputterYield(t, p.E))},\ E_{\rm th}\approx${Math.round(P.eth(t))}`, f: E => P.sputterYield(t, E), color: TCOL[k],
    }))}
    vlines={p => [{ x: p.E, label: R`${p.E}\,\mathrm{eV}` }]}
    samples={220} />;
}

// ---------- 8. 反应溅射迟滞（Berg 模型，补充） ----------
export function BergPlot() {
  return <Plot
    x={{ label: R`\text{反应气体供给}\ Q\ \text{（无量纲）}`, domain: [0, 0.9] }}
    y={{ label: R`\text{沉积速率（相对纯金属靶）}`, domain: [0, 1.08] }}
    params={[
      { id: "S", label: R`\text{抽速}\ S`, min: 0.02, max: 2, log: true, value: 0.08 },
      { id: "Ac", label: R`A_c/A_t\ \text{（收集面积/靶面积）}`, min: 2, max: 30, step: 1, value: 10 },
      { id: "Yc", label: R`Y_c/Y_m\ \text{（化合物/金属产额）}`, min: 0.03, max: 0.5, step: 0.01, value: 0.1 },
    ]}
    series={p => {
      const c = P.bergCurves({ S: p.S, Ac: p.Ac, Yc: p.Yc });
      return [
        { label: R`\text{稳态 S 形曲线}`, data: c.curve, color: "#9a948a", dash: "dot", width: 1.5 },
        { label: R`\text{增大流量}`, data: c.up, color: "#c0392b", width: 2.5 },
        { label: R`\text{减小流量}`, data: c.down, color: "#2c4a6e", width: 2.5, dash: "dash" },
        { label: c.hyst ? R`\text{迟滞区}\ ${f2(c.Qmin, 3)}<Q<${f2(c.Qmax, 3)}` : R`\text{无迟滞（抽速足够大）}`, f: () => NaN, color: "#1f1b16" },
      ];
    }}
    samples={10} />;
}

// ---------- 9. ALD 自限制：每周期生长量与前驱体剂量 ----------
export function AldPlot() {
  return <Plot
    x={{ label: R`\text{TMA 剂量}\ [\mathrm{L}=10^{-6}\,\mathrm{Torr\cdot s}]`, log: true, domain: [1, 1e6] }}
    y={{ label: R`\text{每周期生长量 GPC}\ [\text{Å}]`, domain: [0, 2.2] }}
    params={[
      { id: "s", label: R`\text{反应粘附概率}\ s`, min: 1e-4, max: 0.1, log: true, value: 5e-3 },
      { id: "kp", label: R`\text{前驱体热分解（CVD 分量）}\ [\text{Å}/10^5\,\mathrm{L}]`, min: 0, max: 1, step: 0.02, value: 0 },
    ]}
    series={p => {
      const ald = d => 1.0 * P.aldCoverage(d, p.s);
      const sat = Math.log(100) * 4.6e14 / (p.s * P.PHI_TMA * 1e-6);       // 99% 饱和所需剂量
      return [
        { label: R`\text{理想 ALD（自限制）}`, f: ald, color: "#2c6e49", width: 2.5 },
        { label: R`\text{叠加热分解}`, f: d => ald(d) + p.kp * d / 1e5, color: "#c0392b", dash: "dash" },
        { label: R`99\%\ \text{饱和剂量}\approx${sci(sat)}\ \mathrm{L}`, f: () => NaN, color: "#2c6e49" },
      ];
    }}
    vlines={p => [{ x: Math.log(100) * 4.6e14 / (p.s * P.PHI_TMA * 1e-6), label: R`99\%` }]}
    samples={160} />;
}

// ---------- 10. 图 10.35 交互版：蒸发厚度均匀性 ----------
export function SpherePlot() {
  return <Plot
    x={{ label: R`\text{发射角}\ \theta\ [^\circ]`, domain: [0, 80] }}
    y={{ label: R`\text{相对厚度}\ t(\theta)/t(0)`, domain: [0, 1.15] }}
    params={[{ id: "n", label: R`\text{源的方向性}\ n\ \ (\cos^n\theta)`, min: 1, max: 6, step: 0.1, value: 1 }]}
    series={p => {
      const r = d => d * Math.PI / 180;
      return [
        { label: R`\text{平面源在球底，晶圆贴球面：}\cos^{n-1}\theta`, f: d => P.sphereCos(r(d), p.n), color: "#2c6e49", width: 2.5 },
        { label: R`\text{平面源正对平面晶圆：}\cos^{n+3}\theta`, f: d => P.flatCos(r(d), p.n), color: "#c0392b" },
        { label: R`\text{点源正对平面晶圆：}\cos^{3}\theta`, f: d => P.flatPoint(r(d)), color: "#2c4a6e", dash: "dash" },
        { label: R`\text{点源在球心：常数}`, f: () => 1, color: "#9a948a", dash: "dot" },
      ];
    }}
    samples={120} />;
}
