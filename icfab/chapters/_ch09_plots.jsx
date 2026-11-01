// 第 9 章基于 <Plot> 的交互图（浏览器内真算）。数值已用 node 与原书例题/图核对（见各函数注释）。
import { Plot } from "@kit";

const R = String.raw;
const f0 = v => (+v).toFixed(0), f1 = v => (+v).toFixed(1), f2 = v => (+v).toFixed(2);

// ---------- 误差函数（Abramowitz–Stegun 7.1.26，误差 < 1.5e-7） ----------
function erfc(x) { const t = 1 / (1 + 0.3275911 * x), y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))); return y * Math.exp(-x * x); }
// 麦克斯韦分布中能量超过 E0 的电子比例：erfc(√u) + 2√(u/π) e^{-u}，u = E0/Te
export const fracAbove = (E0, Te) => { const u = E0 / Te; return erfc(Math.sqrt(u)) + 2 * Math.sqrt(u / Math.PI) * Math.exp(-u); };

// ---------- 1. 电子能量分布（图 9.11） ----------
export function EedfPlot() {
  return <Plot
    x={{ label: R`E\ (\mathrm{eV})`, domain: [0, 30] }}
    y={{ label: R`\text{电子能量分布}\ f(E)\ (\mathrm{eV^{-1}})`, domain: [0, 0.5] }}
    params={[
      { id: "Te", label: R`T_{\rm e}\ (\mathrm{eV})`, min: 1, max: 8, step: 0.1, value: 3 },
      { id: "Ed", label: R`E_{\rm diss}\ (\mathrm{eV})`, min: 5, max: 20, step: 0.5, value: 12 },
      { id: "Ei", label: R`E_{\rm iz}\ (\mathrm{eV})`, min: 10, max: 25, step: 0.5, value: 16 },
    ]}
    series={p => {
      const f = E => 2 / Math.sqrt(Math.PI) * Math.sqrt(E) / p.Te ** 1.5 * Math.exp(-E / p.Te);
      const fd = fracAbove(p.Ed, p.Te), fi = fracAbove(p.Ei, p.Te);
      return [
        { label: R`\text{麦克斯韦分布}`, f },
        { label: R`E>E_{\rm diss}:\ ${(fd * 100).toPrecision(2)}\%`, f: E => (E >= p.Ed ? f(E) : NaN), color: "#2c6e49", width: 5 },
        { label: R`E>E_{\rm iz}:\ ${(fi * 100).toPrecision(2)}\%\ (\text{比值}\ ${f1(fd / fi)})`, f: E => (E >= p.Ei ? f(E) : NaN), color: "#c0392b", width: 3 },
      ];
    }}
    vlines={p => [{ x: p.Te / 2, label: R`T_{\rm e}/2` }, { x: p.Ed, label: R`E_{\rm diss}` }, { x: p.Ei, label: R`E_{\rm iz}` }]}
    samples={300} height={330} />;
}

// ---------- 2. 电极电压波形与离子能量（图 9.8–9.9 的交互版） ----------
// 电容–鞘层模型：两鞘层的平均电压之和 ≈ V_rf，比值 = (A_g/A_p)^κ；接地鞘层 V_g(t)=V̄_g(1+sin)，被驱动鞘层 V_p(t)=V̄_p(1−sin)，
// 电极电压 = V_g − V_p = −V_DC + V_rf sin ωt；再加上维持电子约束的浮动势垒 V_f ≈ T_e[1/2 + ½ln(M/2πm)]（Ar：≈5.2 T_e）。
export const sheath = ({ Vrf, Rat, kap, Te }) => {
  const r = Math.pow(Rat, kap), Vg = Vrf / (1 + r), Vp = Vrf * r / (1 + r), Vf = Te * (0.5 + 0.5 * Math.log(40 * 1836.15 / (2 * Math.PI)));
  return { Vg, Vp, Vdc: Vp - Vg, Vf };
};
export function SheathPlot() {
  return <Plot
    x={{ label: R`\omega t/2\pi\ \text{（射频周期数）}`, domain: [0, 3] }}
    y={{ label: R`\text{电压}\ (\mathrm V)`, domain: [-1000, 600] }}
    params={[
      { id: "Vrf", label: R`V_{\rm rf}\ (\mathrm V)`, min: 50, max: 500, step: 5, value: 300 },
      { id: "Rat", label: R`A_{\rm g}/A_{\rm p}`, min: 1, max: 10, log: true, value: 3 },
      { id: "kap", label: R`\kappa`, min: 1, max: 4, step: 0.1, value: 2 },
      { id: "Te", label: R`T_{\rm e}\ (\mathrm{eV})`, min: 1, max: 6, step: 0.1, value: 3 },
    ]}
    series={p => {
      const s = sheath(p), w = x => 2 * Math.PI * x;
      return [
        { label: R`\text{被驱动电极}\ -V_{\rm DC}+V_{\rm rf}\sin\omega t`, f: x => -s.Vdc + p.Vrf * Math.sin(w(x)) },
        { label: R`\text{等离子体电位}\ V_{\rm P}(t)`, f: x => s.Vf + s.Vg * (1 + Math.sin(w(x))), color: "#c0392b" },
        { label: R`-V_{\rm DC}=-${f0(s.Vdc)}\ \mathrm V`, f: () => -s.Vdc, dash: "dash", color: "#2c4a6e" },
        { label: R`\text{离子能量：晶圆侧}\approx${f0(s.Vp + s.Vf)}\ \mathrm{eV}，\text{接地侧}\approx${f0(s.Vg + s.Vf)}\ \mathrm{eV}`, f: () => NaN, color: "#999" },
      ];
    }}
    samples={400} height={360} />;
}

// ---------- 3. 物理溅射产额随入射角（图 9.16 的交互版；Yamamura 型经验式） ----------
// Y(θ)/Y(0) = x^f exp[−Σ(x−1)]，x = 1/cos θ，Σ = f cos θ_opt ⇒ 极大值恰在 θ_opt。
export function SputterPlot() {
  return <Plot
    x={{ label: R`\theta\ (^\circ)`, domain: [0, 89] }}
    y={{ label: R`Y(\theta)/Y(0)`, domain: [0, 3] }}
    params={[
      { id: "f", label: R`f\ \text{（经验指数）}`, min: 1, max: 4, step: 0.1, value: 2 },
      { id: "to", label: R`\theta_{\max}\ (^\circ)`, min: 40, max: 75, step: 1, value: 60 },
    ]}
    series={p => {
      const Sg = p.f * Math.cos(p.to * Math.PI / 180), Y = th => { const x = 1 / Math.cos(th * Math.PI / 180); return Math.pow(x, p.f) * Math.exp(-Sg * (x - 1)); };
      return [{ label: R`Y(\theta)/Y(0),\ \text{峰值}\ ${f2(Y(p.to))}`, f: Y }];
    }}
    vlines={p => [{ x: p.to, label: R`\theta_{\max}` }]}
    samples={300} height={300} />;
}

// ---------- 4. IECE 模型：离子通量对 Si 刻蚀速率的增强（式 9.15–9.18） ----------
const iece = (Jn, Ji, d, Sc, x) => Jn * Sc / x * (Ji + d) / (Jn + Ji + d);   // R_Si = J_n S_C/x · (1 − θ_SS)
export function IecePlot() {
  return <Plot
    x={{ label: R`J_{\rm i}/J_{\rm n}`, domain: [0, 2] }}
    y={{ label: R`R_{\rm Si}(J_{\rm i})/R_{\rm Si}(0)`, domain: [0, 20] }}
    params={[
      { id: "d", label: R`d_{\rm By}/J_{\rm n}`, min: 0.01, max: 1, log: true, value: 0.08 },
    ]}
    series={p => [
      { label: R`\text{增强倍数}\ (\infty:\ ${f1((1 + p.d) / p.d)})`, f: r => iece(1, r, p.d, 1, 1) / iece(1, 0, p.d, 1, 1) },
      { label: R`\theta_{\rm SS}\times 10`, f: r => 10 / (1 + r + p.d), dash: "dash", color: "#2c6e49" },
    ]}
    samples={200} height={300} />;
}
// 离子"产额"随中性/离子通量比饱和（对照图 9.19(b) 的形状）
export function IeceYieldPlot() {
  return <Plot
    x={{ label: R`J_{\rm n}/J_{\rm i}`, domain: [0, 500] }}
    y={{ label: R`\text{每个离子多去除的 Si 原子数（相对）}`, domain: [0, 1.1] }}
    params={[
      { id: "d", label: R`d_{\rm By}/J_{\rm i}`, min: 0.01, max: 2, log: true, value: 0.05 },
      { id: "eff", label: R`\text{离子脱附效率}\ \eta`, min: 0.005, max: 1, log: true, value: 0.02 },
    ]}
    series={p => {
      // 以 J_i=1 为单位；离子增强脱附的有效速率 ηJ_i（每个离子并非都能带走一个产物）
      const Y = Jn => (iece(Jn, p.eff, p.d, 1, 1) - iece(Jn, 0, p.d, 1, 1)) / p.eff;
      return [{ label: R`\Delta R_{\rm Si}/(\eta J_{\rm i})`, f: Y }];
    }}
    samples={300} height={300} />;
}

// ---------- 5. 线性组合模型例题（§9.9.5） ----------
export function LinearEtchPlot() {
  return <Plot
    x={{ label: R`t\ (\mathrm{min})`, domain: [0, 10] }}
    y={{ label: R`\text{刻蚀深度}\ (\mu\mathrm m)`, domain: [0, 2] }}
    params={[
      { id: "FI", label: R`F_{\rm I}\ (10^{18}\,\mathrm{cm^{-2}s^{-1}})`, min: 0.1, max: 5, step: 0.1, value: 2.5 },
      { id: "Sc", label: R`S_{\rm C}`, min: 0.001, max: 0.1, log: true, value: 0.01 },
      { id: "KI", label: R`K_{\rm I}`, min: 0.05, max: 1, step: 0.05, value: 0.2 },
      { id: "FA", label: R`F_{\rm A}\ (10^{16}\,\mathrm{cm^{-2}s^{-1}})`, min: 0, max: 5, step: 0.1, value: 1 },
      { id: "KA", label: R`K_{\rm A}`, min: 0, max: 3, step: 0.1, value: 1 },
    ]}
    series={p => {
      const N = 5e22, iso = p.Sc * p.KI * p.FI * 1e18 / N, ani = p.KA * p.FA * 1e16 / N;   // cm/s
      const v = (iso + ani) * 60 * 1e4, l = iso * 60 * 1e4;                                // µm/min
      const A = v > 0 ? 1 - l / v : 0;
      return [
        { label: R`\text{纵向}\ ${f2(v)}\ \mu\mathrm{m/min}\ (5\ \text{min}:\ ${f2(5 * v)}\ \mu\mathrm m)`, f: t => v * t },
        { label: R`\text{横向（掩模下）}\ ${f2(l)}\ \mu\mathrm{m/min}\ (5\ \text{min}:\ ${f2(5 * l)}\ \mu\mathrm m)`, f: t => l * t, color: "#c0392b", dash: "dash" },
        { label: R`A=${f2(A)},\ \ S_{\rm C}K_{\rm I}F_{\rm I}\ \text{占比}\ ${f2(v > 0 ? l / v : 0)}`, f: () => NaN, color: "#999" },
      ];
    }}
    vlines={() => [{ x: 5, label: R`5\ \text{min}` }]}
    samples={50} height={320} />;
}

// ---------- 6. Langmuir 吸附动力学（式 9.20，图 9.39） ----------
export function LangmuirPlot() {
  return <Plot
    x={{ label: R`t\ (\mathrm s)`, domain: [0, 30] }}
    y={{ label: R`\text{覆盖率}\ \theta`, domain: [0, 1.05] }}
    params={[
      { id: "kp", label: R`KP\ \text{（热吸附）}\ (\mathrm{s^{-1}})`, min: 0.05, max: 1, log: true, value: 0.2 },
      { id: "boost", label: R`\text{等离子体加速倍数}`, min: 1, max: 100, log: true, value: 20 },
    ]}
    series={p => [
      { label: R`\text{热吸附：}\ t_{99\%}=${f1(Math.log(100) / p.kp)}\ \mathrm s`, f: t => 1 - Math.exp(-p.kp * t) },
      { label: R`\text{等离子体：}\ t_{99\%}=${f2(Math.log(100) / (p.kp * p.boost))}\ \mathrm s`, f: t => 1 - Math.exp(-p.kp * p.boost * t), color: "#c0392b", dash: "dash" },
    ]}
    samples={300} height={300} />;
}

// ---------- 7. ALE 循环：总刻蚀量随时间的台阶（图 9.38 的交互版，示意参数） ----------
// 改性步：θ = 1 − e^{−KP t_mod}；去除步：被改性层按 1 − e^{−t/τ(E)} 去除，τ 随离子能量减小；
// 能量超过溅射阈 E_sp 时额外以 s(E−E_sp) 溅射未改性 Si。单位：单原子层（ML）。
export function AleCyclePlot() {
  return <Plot
    x={{ label: R`t\ (\mathrm s)`, domain: [0, 40] }}
    y={{ label: R`\text{累计刻蚀量（单原子层）}`, domain: [0, 8] }}
    params={[
      { id: "tm", label: R`t_{\text{改性}}\ (\mathrm s)`, min: 0.2, max: 6, step: 0.1, value: 2 },
      { id: "te", label: R`t_{\text{去除}}\ (\mathrm s)`, min: 0.2, max: 6, step: 0.1, value: 2 },
      { id: "E", label: R`\text{离子能量}\ E\ (\mathrm{eV})`, min: 10, max: 120, step: 1, value: 50 },
      { id: "kp", label: R`KP\ (\mathrm{s^{-1}})`, min: 0.2, max: 5, log: true, value: 2 },
    ]}
    series={p => {
      const Eth = 20, Esp = 70, purge = 1;
      const kr = p.E > Eth ? (p.E - Eth) / 15 : 0, sp = p.E > Esp ? 0.02 * (p.E - Esp) : 0; // s^-1，ML/s
      const th = 1 - Math.exp(-p.kp * p.tm), period = p.tm + p.te + 2 * purge;
      const epc = th * (1 - Math.exp(-kr * p.te)) + sp * p.te;
      const F = t => { const n = Math.floor(t / period), u = t - n * period; let v = n * epc;
        if (u > p.tm + purge && u <= p.tm + purge + p.te) { const s = u - p.tm - purge; v += th * (1 - Math.exp(-kr * s)) + sp * s; } else if (u > p.tm + purge + p.te) v += epc; return v; };
      return [{ label: R`\mathrm{EPC}=${f2(epc)}\ \text{层/周期}`, f: F }];
    }}
    samples={600} height={300} />;
}
