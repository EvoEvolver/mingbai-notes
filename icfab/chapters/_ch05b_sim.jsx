// 第 5 章（下）交互模型（浏览器里真算）：空间像计算器、Fraunhofer 图样、Fresnel 近场、PSM 对比、
// 光刻胶曝光–PEB–显影截面、Dill 参数测量、CAR、BARC、浸没焦深。数值核心见 _ch05b_phys.jsx。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, Slider, Seg, TxI, num } from "@kit";
import * as P from "./_ch05b_phys.jsx";
import { COL, MiniPlot, Readout, Row, Svg, Txt, heat, rgb } from "./_ch05b_kit.jsx";

const R = String.raw;
const f = (v, d = 2) => (+v).toFixed(d);

// =====================================================================
// 1. 空间像计算器：一维线/间隔光栅，对衍射级求和（式 5.21–5.31）
// =====================================================================
const LAMBDAS = [[436, "g 线 436"], [365, "i 线 365"], [248, "KrF 248"], [193, "ArF 193"], [13.5, "EUV 13.5"]];
export function AerialCalc() {
  const [lam, setLam] = useState(193), [NA, setNA] = useState(0.8), [imm, setImm] = useState(false);
  const [type, setType] = useState("binary"), [shape, setShape] = useState("conv"), [sig, setSig] = useState(0.5);
  const [p, setP] = useState(200), [zf, setZf] = useState(0);
  const nMed = imm ? 1.44 : 1, NAmax = imm ? 1.35 : 0.93, NAe = Math.min(NA, lam < 20 ? 0.55 : NAmax);
  const opts = { type, p, w: p / 2, lambda: lam, NA: NAe, shape, sigma: sig, sigIn: 0.6, zf, nMed };
  const res = useMemo(() => {
    const r = P.aerial1D(opts), xs = Array.from({ length: 301 }, (_, i) => -p + 2 * p * i / 300);
    const pts = xs.map(x => [x / p, r.I(x)]), c = P.contrastOf(r.I, r.P, 160);
    return { r, pts, c };
  }, [lam, NAe, imm, type, shape, sig, p, zf]);
  const sweep = useMemo(() => {
    const out = [], pMin = lam * 0.25, pMax = lam * 6;
    for (let i = 0; i <= 90; i++) { const pp = pMin * Math.pow(pMax / pMin, i / 90); const r = P.aerial1D({ ...opts, p: pp, w: pp / 2 }); out.push([pp, P.contrastOf(r.I, r.P, 90).c]); }
    return out;
  }, [lam, NAe, imm, type, shape, sig, zf]);
  const ymax = Math.max(1, ...res.pts.map(q => q[1])) * 1.08;
  const k1 = (p / 2) * NAe / lam;
  const pCoh = (type === "alt" ? 0.5 : 1) * lam / NAe, pPart = pCoh / (1 + (shape === "coh" ? 0 : sig));
  const sweepMax = sweep[sweep.length - 1][0];
  return <div className="card" id="aerial-calc" style={{ padding: "0.8em" }}>
    <Row><span>波长</span><Seg options={LAMBDAS} value={lam} onChange={v => { setLam(v); if (v < 20) { setNA(0.33); setP(36); setImm(false); } else if (lam < 20) { setNA(0.8); setP(200); } }} /></Row>
    <Row><span>掩模</span><Seg options={[["binary", "二元铬掩模"], ["alt", "交替移相 PSM"], ["att", "衰减移相 6%"]]} value={type} onChange={setType} />
      <span>照明</span><Seg options={[["coh", "相干"], ["conv", "圆盘"], ["annular", "环形"], ["dipole", "偶极"]]} value={shape} onChange={setShape} /></Row>
    <Row>
      <Slider label={R`节距 $p$ (nm)`} value={p} min={lam < 20 ? 10 : 60} max={lam < 20 ? 200 : 2000} step={lam < 20 ? 1 : 5} onChange={setP} />
      <Slider label={R`$\mathrm{NA}$`} value={NAe} min={0.1} max={lam < 20 ? 0.55 : NAmax} step={0.01} onChange={setNA} />
      <Slider label={R`$\sigma$（照明半径/NA）`} value={sig} min={0} max={1} step={0.05} onChange={setSig} />
      <Slider label="离焦 (nm)" value={zf} min={-400} max={400} step={10} onChange={setZf} />
      <label style={{ fontSize: 14 }}><input type="checkbox" checked={imm} disabled={lam < 20} onChange={e => setImm(e.target.checked)} /> 水浸没（像方 n = 1.44，NA 可到 1.35）</label>
    </Row>
    <MiniPlot xd={[-1, 1]} yd={[0, ymax]} xl="x / p（两个周期；灰条 = 掩模透光区）" yl="相对光强" xticks={[-1, -0.5, 0, 0.5, 1]} yticks={[0, 0.25, 0.5, 0.75, 1, 1.25].filter(v => v < ymax)}
      series={[{ pts: res.pts, color: COL.red, width: 2.5 }]} hlines={[{ y: res.c.hi, label: "Imax", c: "#bbb" }, { y: res.c.lo, label: "Imin", c: "#bbb" }]}>
      {({ sx, sy, m, ih }) => {
        const bars = [];   // 掩模透光区（间隔）位置：binary/att 每个周期中心；alt 交替标 ±
        for (let k = -2; k <= 2; k++) { const c = k * 1; if (Math.abs(c) > 1.3) continue; const x0 = Math.max(-1, c - 0.25), x1 = Math.min(1, c + 0.25); if (x1 > x0) bars.push(<g key={k}><rect x={sx(x0)} y={m.t + ih - 7} width={sx(x1) - sx(x0)} height={7} fill={type === "alt" && Math.abs(k) % 2 ? "#7aa7d6" : "#bbb"} />{type === "alt" && <Txt x={sx(c)} y={m.t + ih - 10} s={10}>{Math.abs(k) % 2 ? "180°" : "0°"}</Txt>}</g>); }
        return bars;
      }}
    </MiniPlot>
    <Readout><TxI>{R`$k_1=\tfrac12 p\,\mathrm{NA}/\lambda=${f(k1)}$；每个光源点通过物镜的衍射级数：${res.r.nOrdMin}–${res.r.nOrdMax}；对比度（MTF）$=(I_{\max}-I_{\min})/(I_{\max}+I_{\min})=${f(res.c.c, 3)}$。相干照明下可分辨的最小节距 $${type === "alt" ? R`\lambda/2\mathrm{NA}` : R`\lambda/\mathrm{NA}`}=${f(pCoh, 0)}$ nm；部分相干/斜入射可延伸到约 $${f(pPart, 0)}$ nm。`}</TxI>
      {res.r.nOrdMax <= 1 && <b style={{ color: COL.red }}> 只有 0 级进入物镜：像是一片均匀的灰，图形完全丢失。</b>}</Readout>
    <MiniPlot h={220} xd={[Math.log10(lam * 0.25), Math.log10(sweepMax)]} yd={[0, 1.05]} xl="节距 p（nm，对数轴）——当前设置下对比度随节距的变化（即一维 MTF 曲线）" yl="对比度"
      series={[{ pts: sweep.map(([x, y]) => [Math.log10(x), y]), color: COL.blue, width: 2.5 }]} yticks={[0, 0.25, 0.5, 0.75, 1]}
      vlines={[{ x: Math.log10(pCoh), label: "相干截止", c: "#999" }, { x: Math.log10(p), label: "当前", c: COL.red }]}>
      {({ sx, m, ih }) => [50, 100, 200, 500, 1000, 2000].filter(v => Math.log10(v) > Math.log10(lam * 0.25) && Math.log10(v) < Math.log10(sweepMax)).concat(lam < 20 ? [10, 20, 50] : []).map(v => <Txt key={v} x={sx(Math.log10(v))} y={m.t + ih + 15} s={11}>{v}</Txt>)}
    </MiniPlot>
    <p className="muted" style={{ fontSize: 13 }}><TxI>{R`算法：把掩模透过率展开成傅里叶级数（式 5.21/5.23），按光瞳函数（式 5.25）筛掉 $|f|>\mathrm{NA}/\lambda$ 的级次，逆变换回像面（式 5.27）取模平方（式 5.28）；斜入射把整个频谱平移 $\sin\theta/\lambda$（式 5.29），对光源各点的强度加权平均（式 5.31）。离焦按波前相位误差 $2\pi z(\sqrt{n^2-(\lambda f)^2}-n)/\lambda$ 加到每个级次上。`}</TxI></p>
  </div>;
}

// =====================================================================
// 2. 图 5.33：狭缝、方孔、圆孔的 Fraunhofer 图样（浏览器内计算）
// =====================================================================
export function FraunhoferPatterns() {
  const [g, setG] = useState(0.35);
  const refs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const N = 180, L = 12;   // 显示范围 |u| ≤ L/2，u = w f
    const fns = [
      (u, v) => P.sinc(u) ** 2,
      (u, v) => (P.sinc(u) * P.sinc(v)) ** 2,
      (u, v) => { const r = Math.PI * Math.hypot(u, v) * 1.0; return r < 1e-6 ? 1 : (2 * P.besselJ1(r) / r) ** 2; },
    ];
    refs.forEach((rf, k) => {
      const cv = rf.current; if (!cv) return; const ctx = cv.getContext("2d"), img = ctx.createImageData(N, N);
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        const u = (i / (N - 1) - 0.5) * L, v = (j / (N - 1) - 0.5) * L, val = Math.pow(fns[k](u, v), g) * 255, o = 4 * (j * N + i);
        img.data[o] = img.data[o + 1] = img.data[o + 2] = Math.min(255, val); img.data[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    });
  }, [g]);
  const lab = ["长狭缝：$\\mathrm{sinc}^2(wf_x)$", R`方孔：两个 $\mathrm{sinc}^2$ 之积`, "圆孔：Airy 斑 $[2J_1(u)/u]^2$"];
  return <div>
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      {refs.map((r, k) => <div key={k} style={{ textAlign: "center", fontSize: 13 }}><canvas ref={r} width={180} height={180} style={{ width: 180, height: 180, background: "#000" }} /><div><TxI>{lab[k]}</TxI></div></div>)}
    </div>
    <Row><Slider label="显示伽马（压缩亮度以看清旁瓣）" value={g} min={0.15} max={1} step={0.05} onChange={setG} /></Row>
  </div>;
}

// =====================================================================
// 3. Fresnel 近场（接近式曝光，式 5.32 对长狭缝的解析解）
// =====================================================================
export function FresnelPlot() {
  return <Plot
    x={{ label: R`x/W`, domain: [-1.5, 1.5] }}
    y={{ label: R`I/I_{\rm open}`, domain: [0, 1.9] }}
    params={[
      { id: "W", label: R`W\ (\mu\mathrm m)`, min: 0.5, max: 20, step: 0.1, value: 1 },
      { id: "g", label: R`g\ (\mu\mathrm m)`, min: 1, max: 150, step: 1, value: 5 },
      { id: "lam", label: R`\lambda\ (\mu\mathrm m)`, min: 0.193, max: 0.436, step: 0.001, value: 0.436 },
    ]}
    series={q => {
      const NF = q.W * q.W / (q.lam * q.g);
      return [
        { label: R`\text{Fresnel 衍射像}\ \ (W^2/\lambda g=${f(NF)})`, f: x => P.fresnelSlit(x * q.W, q.W, q.g, q.lam), color: COL.red },
        { label: R`\text{掩模（几何阴影）}`, f: x => (Math.abs(x) < 0.5 ? 1 : 0), dash: "dot", color: "#888" },
      ];
    }}
    vlines={[{ x: -0.5 }, { x: 0.5 }]}
    samples={400}
    caption={R`默认值对应原书图 5.44（$W=1\,\mu$m，$g=5\,\mu$m，g 线）：狭缝已经糊成一个宽包络；把 $g$ 降到 2 µm 或把 $\lambda$ 换成 0.193 µm 即复现图 5.45 的改善。拖到 $W=10$、$g=50$ 或 100 看图 5.42/5.43 的"振铃"。Fresnel 数 $W^2/\lambda g$ 越大越接近几何阴影。`} />;
}

// =====================================================================
// 4. 图 5.66：二元掩模 vs 交替移相掩模（相干照明，场与强度）
// =====================================================================
function coherentField(type, p, lambda, NA, xs) {
  const mask = P.gratingMask(type, p, p / 2), Pp = mask.P, fc = NA / lambda, N = Math.ceil(fc * Pp) + 1, cs = [];
  for (let n = -N; n <= N; n++) if (Math.abs(n / Pp) <= fc) cs.push([n, P.fourierCoef(mask, n)]);
  return xs.map(x => { let re = 0; for (const [n, c] of cs) { const a = 2 * Math.PI * n * x / Pp; re += c.re * Math.cos(a) - c.im * Math.sin(a); } return re; });
}
export function PSMCompare() {
  const [r, setR] = useState(0.8);   // p / (λ/NA)
  const lambda = 193, NA = 0.8, p = r * lambda / NA;
  const xs = Array.from({ length: 241 }, (_, i) => -p + 2 * p * i / 240);
  const panel = type => {
    const m = P.gratingMask(type, p, p / 2), mk = xs.map(x => { let v = m.bg.re; for (const [a, b, c] of m.segs) for (const s of [-2, -1, 0, 1, 2]) if (x >= a + s * m.P && x <= b + s * m.P) v = c.re; return v; });
    const E = coherentField(type, p, lambda, NA, xs), I = E.map(e => e * e), Imax = Math.max(...I), Imin = Math.min(...I);
    const X = xs.map(x => x / p);
    return { mk: X.map((x, i) => [x, mk[i]]), E: X.map((x, i) => [x, E[i]]), I: X.map((x, i) => [x, I[i]]), c: (Imax - Imin) / (Imax + Imin || 1) };
  };
  const b = panel("binary"), a = panel("alt");
  const col = (d, title) => <div style={{ flex: "1 1 300px", minWidth: 280 }}>
    <div style={{ textAlign: "center", fontWeight: 600 }}>{title}</div>
    <MiniPlot w={340} h={130} xd={[-1, 1]} yd={[-1.2, 1.2]} xl="掩模处电场" yl="E" series={[{ pts: d.mk, color: COL.ink }]} yticks={[-1, 0, 1]} />
    <MiniPlot w={340} h={130} xd={[-1, 1]} yd={[-1.2, 1.2]} xl="晶圆处电场（低通后）" yl="E" series={[{ pts: d.E, color: COL.blue }]} yticks={[-1, 0, 1]} />
    <MiniPlot w={340} h={130} xd={[-1, 1]} yd={[0, 1.2]} xl={`晶圆处光强，对比度 ${f(d.c, 2)}`} yl="I" series={[{ pts: d.I, color: COL.red, width: 2.5 }]} yticks={[0, 0.5, 1]} />
  </div>;
  return <div>
    <Row><Slider label={R`节距 $p$ / $(\lambda/\mathrm{NA})$`} value={r} min={0.55} max={2.5} step={0.01} onChange={setR} /><span style={{ fontSize: 13 }}>（λ = 193 nm、NA = 0.8、相干照明；p = {f(p, 0)} nm）</span></Row>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{col(b, "二元掩模")}{col(a, "交替移相掩模（相邻开口差 180°）")}</div>
    <p className="muted" style={{ fontSize: 13 }}><TxI>{R`当 $0.5<p/(\lambda/\mathrm{NA})<1$ 时，二元掩模只剩 0 级通过，晶圆上一片均匀；移相掩模把真实周期变成 2p、消掉了 0 级，$\pm1$ 级恰好能进入物镜，相邻两峰之间电场必过零，光强出现真正的暗线。`}</TxI></p>
  </div>;
}

// =====================================================================
// 5. 光刻胶曝光 → PEB → 显影：二维截面（仿图 5.48、5.51–5.53、5.61）
// =====================================================================
const SUBS = { SiO2: [P.cx(1.47), R`$\mathrm{SiO_2}$ 衬底（弱反射）`], Si: [P.cx(6.5, -2.7), "Si 衬底（强反射）"], BARC: [P.cx(1.7), "理想 BARC（无反射）"] };
export function ResistSim() {
  const [sub, setSub] = useState("SiO2"), [dose, setDose] = useState(200), [sig, setSig] = useState(0), [tdev, setTdev] = useState(60), [NA, setNA] = useState(0.43);
  const NX = 70, NZ = 60, D = 0.5, X0 = 0, X1 = 2.8, XC = 1.4;
  const aerial = useMemo(() => P.aerial1D({ type: "binary", p: 5000, w: 1000, lambda: 365, NA, shape: "conv", sigma: 0.5 }), [NA]);
  const xs = useMemo(() => Array.from({ length: NX }, (_, i) => X0 + (X1 - X0) * (i + 0.5) / NX), []);
  const raw = useMemo(() => xs.map(x => P.dillExpose({ ns: SUBS[sub][0], dose: dose * aerial.I((x - XC) * 1000), D, Nz: NZ, Ne: 50 })), [sub, dose, aerial]);
  const mxz = useMemo(() => {
    const z = raw[0].z, sz = sig / 1000;
    let cols = raw.map(r => P.gaussSmooth(z, r.m, sz));
    if (sz > 0) {   // x 方向同样扩散
      const xg = xs.map(x => x), rows = z.map((_, j) => P.gaussSmooth(xg, cols.map(c => c[j]), sz));
      cols = xs.map((_, i) => rows.map(r => r[i]));
    }
    return { z, cols };
  }, [raw, sig]);
  // 竖直方向显影：t(z) = ∫ dz / R(m)
  const depth = mxz.cols.map(c => { let t = 0, dz = D / NZ * 1000; for (let j = 0; j < NZ; j++) { const dt = dz / P.mackRate(c[j]); if (t + dt > tdev) return (j + (tdev - t) / dt) / NZ * D; t += dt; } return D; });
  const cleared = xs.filter((_, i) => depth[i] >= D - 1e-9);
  const openW = cleared.length ? Math.max(...cleared) - Math.min(...cleared) + (X1 - X0) / NX : null;
  const W = 640, H = 300, ox = 50, oy = 30, pw = 560, ph = 200, cw = pw / NX, ch = ph / NZ * 0.6;   // 胶层占 60% 高度
  const center = Math.floor(NX / 2), prof = raw[center];
  return <div className="card" id="resist-sim" style={{ padding: "0.8em" }}>
    <Row><Seg options={Object.entries(SUBS).map(([k, v]) => [k, v[1]])} value={sub} onChange={setSub} /></Row>
    <Row>
      <Slider label={R`剂量 $E$ (mJ/cm$^2$)`} value={dose} min={0} max={300} step={5} onChange={setDose} />
      <Slider label={R`PEB 扩散长度 $\sigma$ (nm)`} value={sig} min={0} max={100} step={5} onChange={setSig} />
      <Slider label="显影时间 (s)" value={tdev} min={0} max={120} step={1} onChange={setTdev} />
      <Slider label={R`$\mathrm{NA}$（i 线）`} value={NA} min={0.2} max={0.65} step={0.01} onChange={setNA} />
    </Row>
    <Svg w={W} h={H} title="光刻胶截面中未曝光 PAC 相对浓度 m(x,z) 与显影轮廓">
      {mxz.cols.map((c, i) => c.map((v, j) => <rect key={i + "-" + j} x={ox + i * cw} y={oy + j * ch} width={cw + 0.6} height={ch + 0.6} fill={rgb(heat(v))} />))}
      <rect x={ox} y={oy + NZ * ch} width={pw} height={ph * 0.35} fill={sub === "Si" ? COL.si : COL.ox} />
      <Txt x={ox + pw - 6} y={oy + NZ * ch + 20} a="end" s={12}>{sub === "Si" ? "Si" : sub === "SiO2" ? "SiO₂" : "BARC / 衬底"}</Txt>
      {/* 显影后剩余胶轮廓 */}
      <path d={depth.map((d, i) => `${i ? "L" : "M"}${(ox + i * cw).toFixed(1)},${(oy + d / D * NZ * ch).toFixed(1)}L${(ox + (i + 1) * cw).toFixed(1)},${(oy + d / D * NZ * ch).toFixed(1)}`).join("")} fill="none" stroke="#fff" strokeWidth={2.5} />
      <path d={depth.map((d, i) => `${i ? "L" : "M"}${(ox + i * cw).toFixed(1)},${(oy + d / D * NZ * ch).toFixed(1)}L${(ox + (i + 1) * cw).toFixed(1)},${(oy + d / D * NZ * ch).toFixed(1)}`).join("")} fill="none" stroke={COL.ink} strokeWidth={1.2} strokeDasharray="4 3" />
      {/* 掩模上的铬线（1 µm） */}
      <rect x={ox} y={8} width={(XC - 0.5 - X0) / (X1 - X0) * pw} height={8} fill={COL.chrome} /><rect x={ox + (XC + 0.5 - X0) / (X1 - X0) * pw} y={8} width={(X1 - XC - 0.5) / (X1 - X0) * pw} height={8} fill={COL.chrome} />
      <Txt x={ox + (XC - X0) / (X1 - X0) * pw} y={26} s={11}>掩模开口 1 µm（两侧为铬）</Txt>
      {[0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8].map(v => <Txt key={v} x={ox + v / (X1 - X0) * pw} y={oy + NZ * ch + ph * 0.35 + 14} s={11}>{v}</Txt>)}
      <Txt x={ox + pw / 2} y={H - 2} s={12}>x (µm)　　颜色 = 未曝光 PAC 的相对浓度 m（亮 = 未曝光）；虚线 = 显影后剩余胶的上表面</Txt>
      <Txt x={20} y={oy + NZ * ch / 2} s={11} transform={`rotate(-90 20 ${oy + NZ * ch / 2})`}>胶 0.5 µm</Txt>
    </Svg>
    <MiniPlot h={200} xd={[0, D * 1000]} yd={[0, Math.max(2.4, ...prof.I) * 1.05]} xl="深度 z (nm)，取开口中心的一列" yl="相对值"
      series={[{ pts: prof.z.map((z, i) => [z * 1000, prof.I[i]]), color: COL.light, width: 2 }, { pts: prof.z.map((z, i) => [z * 1000, mxz.cols[center][i]]), color: COL.pr, width: 2.5 }]} xticks={[0, 100, 200, 300, 400, 500]} yticks={[0, 0.5, 1, 1.5, 2]}
      hlines={[]} />
    <Readout><TxI>{R`黄线 = 曝光结束时胶内光强 $I(z)/I_0$，紫线 = PEB 后的 $m(z)$。驻波周期 $\lambda/2n=365/(2\times1.7)\approx107$ nm；衬底反射系数 $|\rho|=${f(Math.sqrt(P.cabs2(raw[0].rho)), 2)}$。显影 ${tdev} s 后显透的开口宽约 ${openW == null ? "（尚未显透）" : f(openW, 2) + " µm"}（设计 1 µm）。`}</TxI></Readout>
    <p className="muted" style={{ fontSize: 13 }}><TxI>{R`模型：每一列用该处空间像（i 线、NA 可调、$\sigma=0.5$，掩模为 1 µm 孤立开口，同图 5.51–5.53）乘剂量，按式 5.43–5.44 逐剂量步迭代（吸收 $\alpha=Am+B$ 随漂白变化，向下与衬底反射的向上两束光相干叠加——这是 Helmholtz 方程（式 5.33）在正入射分层介质中的解）；PEB 按式 5.53 做高斯平滑；显影用 Mack 模型（式 5.57，$R_{\max}=100$ nm/s，$R_{\min}=0.1$ nm/s，$n=5$，$m_{\rm th}=0.5$），只算竖直方向推进、忽略侧向显影。Dill 参数取典型 i 线 DNQ 胶 $A=0.8\,\mu\mathrm m^{-1}$、$B=0.05\,\mu\mathrm m^{-1}$、$C=0.016$ cm$^2$/mJ（原书未给出 AZ1350J 的具体数值）。`}</TxI></p>
  </div>;
}

// =====================================================================
// 6. 图 5.50 交互版：Dill 参数测量与反推
// =====================================================================
export function DillMeasurePlot() {
  return <Plot
    x={{ label: R`E\ (\mathrm{mJ/cm^2})`, domain: [0, 400] }}
    y={{ label: R`T\ (\text{以}\ T_{12}\ \text{归一化})`, domain: [0, 1.05] }}
    params={[
      { id: "A", label: R`A\ (\mu\mathrm m^{-1})`, min: 0.2, max: 1.5, step: 0.01, value: 0.96 },
      { id: "B", label: R`B\ (\mu\mathrm m^{-1})`, min: 0, max: 0.3, step: 0.005, value: 0.06 },
      { id: "C", label: R`C\ (\mathrm{cm^2/mJ})`, min: 0.005, max: 0.05, step: 0.001, value: 0.025 },
      { id: "D", label: R`D\ (\mu\mathrm m)`, min: 0.3, max: 2, step: 0.05, value: 1 },
    ]}
    series={q => {
      const d = P.dillTransmission({ ...q, Emax: 400, Ne: 400 }), T0 = d.T[0], Ti = Math.exp(-q.B * q.D);
      const slope = (d.T[1] - d.T[0]) / (d.E[1] - d.E[0]);
      const A = Math.log(Ti / T0) / q.D, B = -Math.log(Ti) / q.D, C = (A + B) / (A * T0 * (1 - T0) * d.T12) * slope;
      return [
        { label: R`T(E)\ \text{数值解}`, f: E => num.interp(d.E, d.T, E), color: COL.red },
        { label: R`T_0=${f(T0, 3)},\ T_\infty=${f(Ti, 3)}\ \Rightarrow\ A=${f(A, 3)},\ B=${f(B, 3)},\ C=${f(C, 4)}`, f: () => NaN },
        { label: R`T_\infty`, f: () => Ti, dash: "dash", color: "#999" },
        { label: R`T_0`, f: () => T0, dash: "dot", color: "#999" },
      ];
    }}
    samples={200}
    caption={R`在浏览器里"做一次 Dill 实验"：按式 5.43–5.44 解出均匀照明下胶膜透过率随剂量的上升（漂白），再用式 5.45–5.47 从曲线的两个平台和初始斜率**反推** $A$、$B$、$C$——图例中反推值应与滑块设定值一致（$C$ 的小偏差来自数值斜率的有限步长）。默认参数给出与原书图 5.50 相近的 $T_0\approx0.36$。`} />;
}

// =====================================================================
// 7. 化学放大胶：曝光产酸（式 5.51）与 PEB 去保护（式 5.55）
// =====================================================================
export function CARPlot() {
  return <Plot
    x={{ label: R`\text{剂量}\ E=It\ (\mathrm{mJ/cm^2})`, domain: [0, 60] }}
    y={{ label: R`\text{相对浓度}`, domain: [0, 1.05] }}
    params={[
      { id: "C", label: R`C\ (\mathrm{cm^2/mJ})`, min: 0.005, max: 0.1, step: 0.001, value: 0.03 },
      { id: "k", label: R`C_{\rm PEB}[\mathrm{PAG}]_0\,t_{\rm PEB}`, min: 0.5, max: 20, step: 0.1, value: 5 },
    ]}
    series={q => [
      { label: R`[\mathrm H]/[\mathrm{PAG}]_0\ \ \text{(5.51)}`, f: E => 1 - Math.exp(-q.C * E), color: COL.light },
      { label: R`\text{去保护比例}\ ([\mathrm M_0]-[\mathrm M])/[\mathrm M_0]\ \ \text{(5.55)}`, f: E => 1 - Math.exp(-q.k * (1 - Math.exp(-q.C * E))), color: COL.pr },
    ]}
    caption={R`光生酸只是"种子"：PEB 中每个酸分子催化许多次去保护反应（式 5.54 中 $[\mathrm H]$ 不被消耗），所以去保护曲线（紫）远比产酸曲线（黄）陡——这就是化学放大使 CAR 剂量只需 DNQ 胶几分之一的原因。`} />;
}

// =====================================================================
// 8. BARC 反射率（式 5.61–5.64，已勘误）
// =====================================================================
export function BarcPlot() {
  return <Plot
    x={{ label: R`\text{BARC 厚度}\ D\ (\mathrm{nm})`, domain: [0, 160] }}
    y={{ label: R`R_{\rm total}`, domain: [0, 0.7] }}
    params={[
      { id: "n2", label: R`n_2\ (\text{BARC 实部})`, min: 1.3, max: 2.4, step: 0.01, value: 1.8 },
      { id: "k2", label: R`\kappa_2\ (\text{BARC 消光})`, min: 0, max: 0.8, step: 0.01, value: 0.5 },
    ]}
    series={q => {
      const n1 = P.cx(1.7), n2 = P.cx(q.n2, -q.k2), si = P.cx(0.88, -2.78), tr = P.cx(2.5), n2i = P.cx(Math.sqrt(1.7 * 2.5));
      return [
        { label: R`\text{Si 衬底（193 nm：}0.88-2.78j\text{）}`, f: D => P.barcR({ n1, n2, n3: si, D, lambda: 193 }), color: COL.red },
        { label: R`\text{透明衬底}\ n_3=2.5,\ \text{透明 BARC}\ n_2=\sqrt{n_1n_3}`, f: D => P.barcR({ n1, n2: n2i, n3: tr, D, lambda: 193 }), color: COL.blue, dash: "dash" },
      ];
    }}
    vlines={[{ x: 193 / (4 * Math.sqrt(1.7 * 2.5)), label: R`\lambda/4n_2` }]}
    caption={R`胶 $n_1=1.7$，波长 193 nm。蓝虚线是式 5.60/5.64 的理想情形：四分之一波长处反射严格为零。红线是真实的 Si 衬底：衬底折射率是复数，透明 BARC 无法完全消反射；给 BARC 加一点吸收（$\kappa_2\approx0.3$–0.5），在 30–40 nm 附近即可把反射压到 1% 以下，且对厚度波动不敏感（厚 BARC 本身就把光吃掉）。`} />;
}

// =====================================================================
// 9. 浸没对焦深的改善（式 5.58）
// =====================================================================
export function DofPlot() {
  return <Plot
    x={{ label: R`\lambda/p`, domain: [0.02, 0.98] }}
    y={{ label: R`\mathrm{DOF}_{\rm imm}/\mathrm{DOF}_{\rm dry}`, domain: [1, 3] }}
    params={[{ id: "n", label: R`n\ (\text{浸没液})`, min: 1.0, max: 1.7, step: 0.01, value: 1.44 }]}
    series={q => [
      { label: R`\text{式 (5.58)}`, f: s => (1 - Math.sqrt(1 - s * s)) / (q.n - Math.sqrt(q.n * q.n - s * s)), color: COL.blue },
      { label: R`n\ (\text{大节距极限})`, f: () => q.n, dash: "dot", color: "#999" },
    ]}
    caption={R`同一个干式能印的节距（$\lambda/p<1$），换成水浸没后焦深至少提高 $n$ 倍；节距越接近 $\lambda$（一级衍射角越大），提高越多——在 $\lambda/p\to1$ 时约为 $1/(n-\sqrt{n^2-1})\approx2.5$。`} />;
}
