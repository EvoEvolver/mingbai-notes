// 第 12 章交互图（全部在浏览器内真算）：
//  1. FredholmLab      —— 有限维 Fredholm 指标：D: C^m → C^n，随意改秩/加扰动，dim ker D − dim ker D† ≡ m − n；非零谱配对 (12.105)；热核迹之差 (12.162) 与 β 无关
//  2. GaussBonnetLab   —— 数值积分 (1/2π)∫K dA（第一、第二基本形式），可变形的球面、椭球、环面：恒为 χ = 2 − 2g（例 12.3）
//  3. RiemannRochLab   —— 亏格 g 曲面上线丛：h⁰ − h¹ = d + 1 − g（(12.51) 改正后）；CP¹ 上的显式截面基
//  4. MonopoleDiracLab —— S² 上单极子背景的 Dirac 算子：有限差分数值求 D†D、DD† 的谱，零模数 = |n|（例 12.6）
//  5. HeatKernelS1     —— 例 12.7：S¹ 上热核迹 h̃(t) 与 √(π/t) ± 1
//  6. SpectralFlowLab  —— 例 12.8：λ_n(t)=n+t 的谱流、用 (12.120) 数值算 η(t)、$\theta$ 函数零模 (12.129)
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg, Plot } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const TAU = 2 * Math.PI;
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6 };
const sci = v => { const e = Math.floor(Math.log10(Math.abs(v) || 1e-300)); return `${(v / 10 ** e).toFixed(1)}\\times10^{${e}}`; };
const f4 = v => (Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(2) : v.toFixed(4));
const Txt = ({ x, y, children, color = INK, size = 12, anchor = "middle" }) => <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor}>{children}</text>;

// ---------- 线性代数小工具 ----------
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; }; }
const matmul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((a, v, k) => a + v * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(r => r[j]));
// 对称矩阵 Jacobi 本征值
function symEig(A0) {
  const n = A0.length, A = A0.map(r => r.slice());
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
    }
  }
  return A.map((r, i) => r[i]).sort((a, b) => a - b);
}

// ============================================================
// 1. 有限维 Fredholm 指标
// ============================================================
export function FredholmLab() {
  const [m, setM] = useState(5), [n, setN] = useState(3), [r, setR] = useState(2), [eps, setEps] = useState(0), [seed, setSeed] = useState(7), [beta, setBeta] = useState(0.5);
  const rr = Math.min(r, m, n);
  const res = useMemo(() => {
    const g = rng(seed * 7919 + 13);
    const A = Array.from({ length: n }, () => Array.from({ length: rr }, g)), B = Array.from({ length: rr }, () => Array.from({ length: m }, g));
    const E = Array.from({ length: n }, () => Array.from({ length: m }, g));
    const D = rr ? matmul(A, B) : Array.from({ length: n }, () => Array(m).fill(0));
    const Dp = D.map((row, i) => row.map((v, j) => v + eps * E[i][j]));
    const DtD = matmul(tr(Dp), Dp), DDt = matmul(Dp, tr(Dp));
    const ev1 = symEig(DtD).map(v => Math.max(v, 0)), ev2 = symEig(DDt).map(v => Math.max(v, 0));
    const scale = Math.max(1, ...ev1, ...ev2), tol = 1e-9 * scale;
    const k1 = ev1.filter(v => v < tol).length, k2 = ev2.filter(v => v < tol).length;
    const nz1 = ev1.filter(v => v >= tol), nz2 = ev2.filter(v => v >= tol);
    const pairErr = nz1.length === nz2.length ? Math.max(0, ...nz1.map((v, i) => Math.abs(v - nz2[i]) / scale)) : Infinity;
    return { D: Dp, ev1, ev2, tol, k1, k2, pairErr };
  }, [m, n, rr, eps, seed]);
  const heat = res.ev1.reduce((a, v) => a + Math.exp(-beta * v), 0) - res.ev2.reduce((a, v) => a + Math.exp(-beta * v), 0);
  const W = 300, H = 210, maxL = Math.max(1e-6, ...res.ev1, ...res.ev2), ys = v => H - 24 - (Math.log10(v + 1e-3) + 3) / (Math.log10(maxL + 1e-3) + 3) * (H - 44);
  const Col = ({ x, ev, label }) => <g>
    <Txt x={x} y={H - 6} size={11}>{label}</Txt>
    <line x1={x - 50} x2={x + 50} y1={H - 24} y2={H - 24} stroke={GRAY} />
    {ev.map((v, i) => { const z = v < res.tol, xx = x - 40 + (ev.length > 1 ? 80 * i / (ev.length - 1) : 40); return <g key={i}>
      <line x1={x - 45} x2={x + 45} y1={ys(v)} y2={ys(v)} stroke={z ? RED : BLUE} strokeWidth={z ? 2.5 : 1.6} opacity={0.85} />
      {z && <circle cx={xx} cy={ys(v)} r={4} fill={RED} />}</g>; })}
  </g>;
  return (
    <RunCard title={R`交互图 1：有限维 Fredholm 指标——$\dim\ker D-\dim\ker D^\dagger\equiv m-n$`}
      lead={R`$D=AB+\varepsilon E$ 是 $n\times m$ 实矩阵（$\C^m\to\C^n$），$AB$ 的秩为 $r$，$E$ 为随机扰动。下面数值对角化 $D^\dagger D$（$m\times m$，左列）与 $DD^\dagger$（$n\times n$，右列）：红线是零本征值（零模），蓝线是非零本征值（纵轴为对数刻度）。无论怎样改 $r$、加扰动、换随机种子，零模数会变，但差永远是 $m-n$；非零本征值在两边逐一配对——这就是 \eqref{12.105} 与定理 12.4 的有限维版本。`}>
      <Row gap={20}>
        <Slider label={R`$m=\dim(\text{定义域})$`} value={m} min={1} max={7} onChange={setM} />
        <Slider label={R`$n=\dim(\text{目标})$`} value={n} min={1} max={7} onChange={setN} />
        <Slider label={R`秩 $r$`} value={r} min={0} max={7} onChange={setR} fmt={() => rr} />
        <Slider label={R`扰动 $\varepsilon$`} value={eps} min={0} max={0.5} step={0.01} onChange={setEps} fmt={v => v.toFixed(2)} />
        <Slider label={R`热核参数 $\beta$`} value={beta} min={0.01} max={5} step={0.01} onChange={setBeta} fmt={v => v.toFixed(2)} />
        <button onClick={() => setSeed(s => s + 1)} style={{ alignSelf: "center" }}>换一组随机矩阵</button>
      </Row>
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <Col x={80} ev={res.ev1} label="左列" />
          <Col x={220} ev={res.ev2} label="右列" />
        </svg>
        <div style={{ fontSize: 14, lineHeight: 1.9 }}>
          <div><TxI>{R`$\dim\ker D$（$D^\dagger D$ 的零本征值数）`}</TxI> = <b>{res.k1}</b></div>
          <div><TxI>{R`$\dim\ker D^\dagger$（$DD^\dagger$ 的零本征值数）`}</TxI> = <b>{res.k2}</b></div>
          <div><TxI>{R`$\ind D=\dim\ker D-\dim\ker D^\dagger$`}</TxI> = <b>{res.k1 - res.k2}</b>，<TxI>{R`$m-n$`}</TxI> = <b>{m - n}</b></div>
          <div><TxI>{R`$\mathrm{Tr}\,\mathrm{e}^{-\beta D^\dagger D}-\mathrm{Tr}\,\mathrm{e}^{-\beta DD^\dagger}$`}</TxI> = <b>{heat.toFixed(10)}</b></div>
          <div><TxI>{R`非零谱的最大相对差`}</TxI> = {Number.isFinite(res.pairErr) ? res.pairErr.toExponential(1) : "—"}</div>
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={res.k1 - res.k2 === m - n} label={R`$\ind D=m-n$`} />
        <Check ok={Math.abs(heat - (m - n)) < 1e-7} label={R`热核迹之差 $=\ind D$（与 $\beta$ 无关，\eqref{12.162}）`} />
        <Check ok={res.pairErr < 1e-8} label={R`$\mathrm{Spec}'D^\dagger D=\mathrm{Spec}'DD^\dagger$`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：取 $m=5,n=3,r=1$，再把 $\varepsilon$ 从 0 调大：$\dim\ker D$ 从 4 降到 2，$\dim\ker D^\dagger$ 从 2 降到 0——零模"成对地"离开。无穷维时 $m-n$ 失去意义，AS 定理给出它的替代物。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. Gauss–Bonnet：数值积分 (1/2π)∫K dA
// ============================================================
const SURF = {
  sphere: { label: "凸起的球面", g: 0, per: [true, false], vr: [0, Math.PI],
    f: (u, v, a, b) => { const rho = 1 + a * Math.pow(Math.sin(v), 3) * Math.cos(3 * u) + b * Math.cos(v) * Math.cos(v); return [rho * Math.sin(v) * Math.cos(u), rho * Math.sin(v) * Math.sin(u), rho * Math.cos(v)]; } },
  ellip: { label: "椭球", g: 0, per: [true, false], vr: [0, Math.PI],
    f: (u, v, a, b) => [(1 + a) * Math.sin(v) * Math.cos(u), (1 - 0.6 * a) * Math.sin(v) * Math.sin(u), (1 + 1.5 * b) * Math.cos(v)] },
  torus: { label: "变形的环面", g: 1, per: [true, true], vr: [0, TAU],
    f: (u, v, a, b) => { const r = 0.45 * (1 + 0.6 * a * Math.cos(3 * u)), Rr = 1.2; return [(Rr + r * Math.cos(v)) * Math.cos(u), (Rr + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v) + b * 0.6 * Math.sin(2 * u)]; } },
};
const sub = (p, q) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]], dot = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const cross = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
function curv(F, u, v) {   // 返回 [K, dA/(du dv)]
  const h = 1e-3, c = F(u, v);
  const pu = F(u + h, v), mu = F(u - h, v), pv = F(u, v + h), mv = F(u, v - h);
  const ru = sub(pu, mu).map(x => x / (2 * h)), rv = sub(pv, mv).map(x => x / (2 * h));
  const ruu = [0, 1, 2].map(i => (pu[i] - 2 * c[i] + mu[i]) / (h * h)), rvv = [0, 1, 2].map(i => (pv[i] - 2 * c[i] + mv[i]) / (h * h));
  const pp = F(u + h, v + h), pm = F(u + h, v - h), mp = F(u - h, v + h), mm = F(u - h, v - h);
  const ruv = [0, 1, 2].map(i => (pp[i] - pm[i] - mp[i] + mm[i]) / (4 * h * h));
  const N = cross(ru, rv), nn = Math.hypot(...N), n = N.map(x => x / nn);
  const E = dot(ru, ru), Fm = dot(ru, rv), G = dot(rv, rv), L = dot(ruu, n), Mm = dot(ruv, n), Nn = dot(rvv, n);
  return [(L * Nn - Mm * Mm) / (E * G - Fm * Fm), nn];
}
export function GaussBonnetLab() {
  const [kind, setKind] = useState("sphere"), [a, setA] = useState(0.25), [b, setB] = useState(0.2), [az, setAz] = useState(0.6);
  const S = SURF[kind], F = (u, v) => S.f(u, v, a, b);
  const integ = useMemo(() => {
    const Nu = 180, Nv = 120, du = TAU / Nu, dv = (S.vr[1] - S.vr[0]) / Nv;
    let tot = 0, pos = 0, neg = 0;
    for (let i = 0; i < Nu; i++) for (let j = 0; j < Nv; j++) {
      const u = (i + 0.5) * du, v = S.vr[0] + (j + 0.5) * dv, [K, dA] = curv(F, u, v), w = K * dA * du * dv;
      tot += w; if (w > 0) pos += w; else neg += w;
    }
    return { tot: tot / TAU, pos: pos / TAU, neg: neg / TAU };
  }, [kind, a, b]);   // eslint-disable-line
  const quads = useMemo(() => {
    const nu = 54, nv = kind === "torus" ? 30 : 26, el = 0.45, out = [];
    const P = ([x, y, z]) => { const xr = x * Math.cos(az) - y * Math.sin(az), yr = x * Math.sin(az) + y * Math.cos(az); return [190 + 72 * xr, 150 - 72 * (z * Math.cos(el) + yr * Math.sin(el)), yr * Math.cos(el) - z * Math.sin(el)]; };
    for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
      const u0 = TAU * i / nu, u1 = TAU * (i + 1) / nu, v0 = S.vr[0] + (S.vr[1] - S.vr[0]) * j / nv, v1 = S.vr[0] + (S.vr[1] - S.vr[0]) * (j + 1) / nv;
      const pts = [F(u0, v0), F(u1, v0), F(u1, v1), F(u0, v1)].map(P), K = curv(F, (u0 + u1) / 2, (v0 + v1) / 2)[0];
      out.push({ pts, d: pts.reduce((s, p) => s + p[2], 0) / 4, K });
    }
    return out.sort((p, q) => q.d - p.d);
  }, [kind, a, b, az]);   // eslint-disable-line
  const col = K => { const t = Math.min(1, Math.abs(K) / 2.5); return K >= 0 ? `rgba(155,44,31,${0.15 + 0.75 * t})` : `rgba(44,74,110,${0.15 + 0.75 * t})`; };
  const chi = 2 - 2 * S.g;
  return (
    <RunCard title={R`交互图 2：Gauss–Bonnet——不管怎样变形，$\frac1{2\pi}\int_MK\,\dd A=\chi(M)$`}
      lead={R`曲面用参数 $(u,v)$ 给出，在 $180\times120$ 的网格上用有限差分算第一、第二基本形式，$K=(LN-M^2)/(EG-F^2)$，$\dd A=|r_u\times r_v|\,\dd u\,\dd v$，再用中点法则积分。红色为 $K>0$，蓝色为 $K<0$（颜色深浅表示 $|K|$）。拖动形变参数：局部的曲率分布剧烈变化，总量却锁定在 $2\pi\chi$。`}>
      <Row gap={20}>
        <Seg options={Object.keys(SURF).map(k => [k, SURF[k].label])} value={kind} onChange={setKind} />
        <Slider label={R`形变 $a$`} value={a} min={kind === "ellip" ? -0.5 : 0} max={kind === "ellip" ? 1 : 0.6} step={0.01} onChange={setA} fmt={v => v.toFixed(2)} />
        <Slider label={R`形变 $b$`} value={b} min={kind === "ellip" ? -0.5 : -0.5} max={kind === "ellip" ? 1 : 0.6} step={0.01} onChange={setB} fmt={v => v.toFixed(2)} />
        <Slider label="视角" value={az} min={-3.1} max={3.1} step={0.02} onChange={setAz} fmt={v => v.toFixed(2)} />
      </Row>
      <Row>
        <svg viewBox="0 0 380 300" width={380} height={300} style={svgStyle}>
          {quads.map((q, i) => <path key={i} d={"M" + q.pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") + "Z"} fill={col(q.K)} stroke="#d8cfbf" strokeWidth="0.3" />)}
        </svg>
        <div style={{ fontSize: 14, lineHeight: 1.9 }}>
          <div><TxI>{R`$\frac1{2\pi}\int K\,\dd A$（数值）`}</TxI> = <b>{integ.tot.toFixed(5)}</b></div>
          <div><TxI>{R`其中 $K>0$ 部分`}</TxI> = {integ.pos.toFixed(4)}，<TxI>{R`$K<0$ 部分`}</TxI> = {integ.neg.toFixed(4)}</div>
          <div><TxI>{R`亏格 $g$`}</TxI> = {S.g}，<TxI>{R`$\chi=2-2g$`}</TxI> = <b>{chi}</b></div>
        </div>
      </Row>
      <Check ok={Math.abs(integ.tot - chi) < 2e-3} label={R`$\frac1{2\pi}\int_MK\,\dd A=\chi(M)$（误差 $<2\times10^{-3}$）`} />
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`环面上外侧 $K>0$、内侧 $K<0$，两者恰好抵消（$\chi=0$）；球面的凸起把一部分正曲率挤成负曲率的"鞍"，但正部分随之增加。这就是 \eqref{12.42a}：右边是曲率（局部几何），左边是拓扑。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. Riemann–Roch：h⁰ − h¹ = d + 1 − g
// ============================================================
function rrDims(g, d, special) {
  if (g === 0) return { h0: Math.max(0, d + 1), h1: Math.max(0, -d - 1), note: R`$\CP^1$ 上 $\deg d$ 的线丛就是 $\mathcal{O}(d)$：全纯截面是次数 $\le d$ 的多项式（$d\ge0$）；$h^1$ 由 Serre 对偶 $h^1(\mathcal{O}(d))=h^0(\mathcal{O}(-2-d))$ 给出。` };
  if (special === "O" && d === 0) return { h0: 1, h1: g, note: R`平凡丛 $\mathcal{O}$：$h^0=1$（常数），$h^1=g$（$h^{0,1}$，即全纯一形式的个数）。` };
  if (special === "K" && d === 2 * g - 2) return { h0: g, h1: 1, note: R`典范丛 $K$：$h^0(K)=g$（全纯一形式），$h^1(K)=h^0(\mathcal{O})=1$（Serre 对偶）。` };
  if (d < 0) return { h0: 0, h1: g - 1 - d, note: R`$d<0$：没有非零全纯截面，$h^1$ 由指标定出。` };
  if (d > 2 * g - 2) return { h0: d + 1 - g, h1: 0, note: R`$d>2g-2$：$\deg(K-L)<0$，由 Serre 对偶 $h^1=h^0(K-L)=0$。` };
  const h0 = Math.max(0, d + 1 - g); return { h0, h1: h0 - (d + 1 - g), note: R`$0\le d\le2g-2$：一般（generic）线丛 $h^0=\max(0,d+1-g)$；特殊线丛 $h^0$ 可以更大，但 $h^0-h^1$ 不变。` };
}
export function RiemannRochLab() {
  const [g, setG] = useState(0), [d, setD] = useState(2), [special, setSpecial] = useState("gen");
  const r = rrDims(g, d, special), idx = d + 1 - g;
  const ds = Array.from({ length: 15 }, (_, i) => i - 4);
  const W = 420, H = 220, x0 = 40, sx = (W - 60) / 14, sy = 14, base = 150, X = dd => x0 + (dd + 4) * sx, Y = v => base - v * sy;
  return (
    <RunCard title={R`交互图 3：Riemann–Roch——$h^0(L)-h^1(L)=d+1-g$`}
      lead={R`亏格 $g$ 的紧 Riemann 面上，取 $\deg L=d$ 的全纯线丛（\eqref{12.51} 中 $V=L$，$\dim V=1$）。$h^0=\dim H^{0,0}(M;L)$ 是全纯截面数，$h^1=\dim H^{0,1}(M;L)$ 是"障碍"数。单独的 $h^0$、$h^1$ 随 $L$ 而变，二者之差只依赖于 $d$ 与 $g$。灰色虚线是原书印错的 $(2-g)+d$。`}>
      <Row gap={20}>
        <Slider label={R`亏格 $g$`} value={g} min={0} max={3} onChange={setG} />
        <Slider label={R`度数 $d=\int_Mc_1(L)$`} value={d} min={-4} max={10} onChange={setD} />
        {g > 0 && <Seg options={[["gen", "一般线丛"], ["O", R`平凡丛 $\mathcal{O}$（$d=0$）`], ["K", R`典范丛 $K$（$d=2g-2$）`]]} value={special} onChange={v => { setSpecial(v); if (v === "O") setD(0); if (v === "K") setD(2 * g - 2); }} />}
      </Row>
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={x0 - 10} x2={W - 10} y1={base} y2={base} stroke={GRAY} />
          {ds.map(dd => { const q = rrDims(g, dd, "gen"); return <g key={dd}>
            <rect x={X(dd) - 9} y={Y(q.h0)} width={8} height={q.h0 * sy} fill={BLUE} rx={2} opacity={dd === d ? 1 : 0.45} />
            <rect x={X(dd) + 1} y={base} width={8} height={q.h1 * sy} fill={GOLD} rx={2} opacity={dd === d ? 1 : 0.45} />
            <Txt x={X(dd)} y={H - 6} size={10} color={dd === d ? INK : GRAY}>{dd}</Txt></g>; })}
          <polyline points={ds.map(dd => `${X(dd)},${Y(dd + 1 - g)}`).join(" ")} fill="none" stroke={RED} strokeWidth="2" />
          <polyline points={ds.map(dd => `${X(dd)},${Y(dd + 2 - g)}`).join(" ")} fill="none" stroke={GRAY} strokeWidth="1.5" strokeDasharray="5 4" />
          <rect x={X(d) - 12} y={6} width={24} height={H - 26} fill="none" stroke={INK} strokeDasharray="3 3" />
          <Txt x={x0} y={16} anchor="start" size={11} color={BLUE}>■ h⁰（向上）</Txt>
          <Txt x={x0 + 90} y={16} anchor="start" size={11} color={GOLD}>■ h¹（向下）</Txt>
          <Txt x={x0 + 180} y={16} anchor="start" size={11} color={RED}>— d+1−g</Txt>
        </svg>
        <div style={{ fontSize: 14, lineHeight: 1.9, maxWidth: 330 }}>
          <div><TxI>{R`$h^0$`}</TxI> = <b>{r.h0}</b>，<TxI>{R`$h^1$`}</TxI> = <b>{r.h1}</b></div>
          <div><TxI>{R`$h^0-h^1$`}</TxI> = <b>{r.h0 - r.h1}</b>，<TxI>{R`$d+1-g$`}</TxI> = <b>{idx}</b>，原书 <TxI>{R`$(2-g)+d$`}</TxI> = {d + 2 - g}</div>
          <div style={{ fontSize: 13 }}><TxI>{r.note}</TxI></div>
          {g === 0 && d >= 0 && <div style={{ fontSize: 13 }}><TxI>{R`截面基：$1,z,\ldots,z^{${d}}$（在 $z=\infty$ 处用 $w=1/z$ 换卡后 $z^k\mapsto w^{d-k}$ 仍全纯）。单极子 $n$ 背景中 $S^2$ 上的正手征 Dirac 零模就是 $\mathcal{O}(n-1)$ 的截面：共 $n$ 个（交互图 4）。`}</TxI></div>}
        </div>
      </Row>
      <Check ok={r.h0 - r.h1 === idx} label={R`$h^0-h^1=d+1-g$（\eqref{12.51} 改正后）`} />
    </RunCard>);
}

// ============================================================
// 4. S² 上单极子背景中的 Dirac 零模（数值本征值）
// ============================================================
// 自旋权 s 的函数、方位量子数 m：H_s = −d/dx((1−x²)d/dx) + (m + s x)²/(1−x²)（x = cos θ），本征值 l(l+1) − s²
// 正手征 Δ⁺ 取自旋权 s = q − 1/2（q = n/2）：D†D = H_s − s，本征值 (l−s)(l+s+1)；负手征 s' = s + 1：DD† = H_{s'} + s'
function tridEig(d, o, k) {
  const N = d.length; let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < N; i++) { const r = (i > 0 ? Math.abs(o[i - 1]) : 0) + (i < N - 1 ? Math.abs(o[i]) : 0); lo = Math.min(lo, d[i] - r); hi = Math.max(hi, d[i] + r); }
  const cnt = x => { let c = 0, q = 1; for (let i = 0; i < N; i++) { q = d[i] - x - (i > 0 ? o[i - 1] * o[i - 1] / q : 0); if (q === 0) q = 1e-300; if (q < 0) c++; } return c; };
  const out = []; for (let j = 0; j < k; j++) { let a = lo, b = hi; for (let it = 0; it < 56; it++) { const c = (a + b) / 2; if (cnt(c) > j) b = c; else a = c; } out.push((a + b) / 2); } return out;
}
function Hs(s, m, N = 300, k = 3) {
  const h = 2 / N, d = [], o = [];
  for (let i = 0; i < N; i++) { const x = -1 + h * (i + 0.5), pl = 1 - (-1 + h * i) ** 2, pr = 1 - (-1 + h * (i + 1)) ** 2; d.push((pl + pr) / h / h + (m + s * x) ** 2 / (1 - x * x)); if (i < N - 1) o.push(-pr / h / h); }
  return tridEig(d, o, k);
}
function levels(list, tol = 0.06) { const s = list.slice().sort((a, b) => a - b), out = []; for (const v of s) { const L = out[out.length - 1]; if (L && Math.abs(v - L.v) < tol) { L.n++; L.v = (L.v * (L.n - 1) + v) / L.n; } else out.push({ v, n: 1 }); } return out; }
function sideSpec(w, shift) { const f = ((w % 1) + 1) % 1, all = []; for (let m = -5.5 + (f === 0.5 ? 0 : 0.5); m <= 5.5; m += 1) for (const e of Hs(w, m)) all.push(e + shift); return levels(all).slice(0, 3); }
function exactSpec(w, s) { const out = []; for (let l = Math.abs(w); out.length < 3; l++) out.push({ v: (l - s) * (l + s + 1), n: 2 * l + 1 }); return out; }
export function MonopoleDiracLab() {
  const [n, setN] = useState(2);
  const q = n / 2, s = q - 0.5, sp = s + 1;
  const num = useMemo(() => ({ A: sideSpec(s, -s), B: sideSpec(sp, sp) }), [n]);   // eslint-disable-line
  const ex = { A: exactSpec(s, s), B: exactSpec(sp, s) };
  const z = L => L.filter(x => Math.abs(x.v) < 0.05).reduce((a, x) => a + x.n, 0);
  const nuP = z(num.A), nuM = z(num.B);
  const lim = Math.min(Math.max(...num.A.map(x => x.v)), Math.max(...num.B.map(x => x.v))) + 0.01;
  const pairOK = num.A.filter(x => x.v > 0.05 && x.v <= lim).every(x => num.B.some(y => Math.abs(y.v - x.v) < 0.06 && y.n === x.n));
  const W = 360, H = 230, top = Math.max(...num.A.map(x => x.v), ...num.B.map(x => x.v)) * 1.1 + 0.5, Y = v => H - 30 - v / top * (H - 50);
  const Col = ({ x, L, label }) => <g>
    <Txt x={x} y={H - 10} size={11}>{label}</Txt>
    {L.map((l, i) => <g key={i}><line x1={x - 55} x2={x + 55} y1={Y(l.v)} y2={Y(l.v)} stroke={Math.abs(l.v) < 0.05 ? RED : BLUE} strokeWidth={Math.abs(l.v) < 0.05 ? 3 : 1.8} />
      <Txt x={x + 60} y={Y(l.v) + 4} anchor="start" size={10} color={GRAY}>{`(${l.n})`}</Txt></g>)}
  </g>;
  return (
    <RunCard title={R`交互图 4：$S^2$ 上单极子背景中的 Dirac 零模——$\nu_+-\nu_-=n$`}
      lead={R`单极子数 $n=\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathcal{F}$。按方位量子数 $m$ 分解后，$D^\dagger D$（作用于 $\Delta^+$）与 $DD^\dagger$（作用于 $\Delta^-$）化为 $x=\cos\theta$ 上的一维 Sturm–Liouville 算子 $-\frac{\dd}{\dd x}(1-x^2)\frac{\dd}{\dd x}+\frac{(m+sx)^2}{1-x^2}$（自旋权 $s=\frac n2\mp\frac12$）。这里用 300 格点有限差分 + Sturm 二分法**数值**求最低几个能级（左：$D^\dagger D$ 作用于 $\Delta^+$；右：$DD^\dagger$ 作用于 $\Delta^-$；括号内为简并度），并与解析谱 $(j+\frac12)^2-\frac{n^2}4$（简并度 $2j+1$）对照。`}>
      <Slider label={R`单极子数 $n$`} value={n} min={-4} max={4} onChange={setN} />
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={20} x2={W - 20} y1={Y(0)} y2={Y(0)} stroke={GRAY} strokeDasharray="3 3" />
          <Col x={95} L={num.A} label="左：正手征" />
          <Col x={255} L={num.B} label="右：负手征" />
        </svg>
        <div style={{ fontSize: 13.5, lineHeight: 1.8 }}>
          <table className="tb-table"><thead><tr><th></th><th>数值能级 ×简并</th><th>解析能级 ×简并</th></tr></thead><tbody>
            <tr><td><TxI>{R`$D^\dagger D$`}</TxI></td><td>{num.A.map(x => `${x.v.toFixed(3)}×${x.n}`).join("，")}</td><td>{ex.A.map(x => `${x.v.toFixed(3)}×${x.n}`).join("，")}</td></tr>
            <tr><td><TxI>{R`$DD^\dagger$`}</TxI></td><td>{num.B.map(x => `${x.v.toFixed(3)}×${x.n}`).join("，")}</td><td>{ex.B.map(x => `${x.v.toFixed(3)}×${x.n}`).join("，")}</td></tr>
          </tbody></table>
          <div><TxI>{R`$\nu_+$`}</TxI> = <b>{nuP}</b>，<TxI>{R`$\nu_-$`}</TxI> = <b>{nuM}</b>，<TxI>{R`$\nu_+-\nu_-$`}</TxI> = <b>{nuP - nuM}</b></div>
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={nuP - nuM === n} label={R`$\nu_+-\nu_-=n=\frac{\mathrm{i}}{2\pi}\int\mathcal{F}$（\eqref{12.89}）`} />
        <Check ok={nuP * nuM === 0} label={R`零模只出现在一种手征中（消没定理）`} />
        <Check ok={pairOK} label={R`非零能级两边配对（\eqref{12.105}）`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`$n=0$ 时没有零模，最低 Dirac 本征值 $\pm1$（单位球面）。每增加一个磁通量子，就有一个能级被"压"到零；零模数 $|n|$ 正是 Riemann–Roch 给出的 $h^0(\mathcal{O}(|n|-1))=|n|$。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 5. 例 12.7：S¹ 上的热核迹
// ============================================================
const hS1 = t => { let s = 1; for (let n = 1; n < 4000; n++) { const v = Math.exp(-n * n * t); s += 2 * v; if (v < 1e-17) break; } return s; };
export function HeatKernelS1() {
  return (
    <Plot x={{ label: R`t`, log: true, domain: [0.003, 8] }} y={{ label: R`\tilde h(t)`, log: true, domain: [0.5, 50] }}
      series={() => [
        { label: R`\tilde h(t)=\sum_n\mathrm{e}^{-n^2t}`, f: hS1 },
        { label: R`\sqrt{\pi}\,t^{-1/2}`, f: t => Math.sqrt(Math.PI / t), dash: "dash" },
        { label: R`\sqrt{\pi}\,t^{-1/2}+1`, f: t => Math.sqrt(Math.PI / t) + 1, dash: "dot", color: GRAY },
        { label: R`\sqrt{\pi}\,t^{-1/2}-1`, f: t => Math.sqrt(Math.PI / t) - 1, dash: "dot", color: GRAY },
        { label: R`n_0=1`, f: () => 1, dash: "dashdot", color: GREEN },
      ]} samples={240} height={320}
      caption={R`$S^1$ 上 $\Delta=-\partial_\theta^2$ 的热核迹（数值求和）。小 $t$ 时 $\tilde h\to\sqrt{\pi/t}$（\eqref{12.117}，渐近展开从 $t^{-\dim M/2}$ 开始；$t=0.05$ 时 $\tilde h-\sqrt{\pi/t}$ 约为 $10^{-85}$），始终夹在 $\sqrt{\pi/t}\pm1$ 之间；大 $t$ 时 $\tilde h\to1$，即零模（常数函数）的个数 $n_0$（\eqref{12.98}）。`} />);
}

// ============================================================
// 6. 例 12.8：谱流、$\eta$ 不变量与 $\theta$ 函数零模
// ============================================================
// η(t) 由 (12.120) 在 s=0 处数值积分：η = (2/√π) ∫_0^∞ Σ_n λ_n e^{−x²λ_n²} dx，λ_n = n + t（在 ln x 上用 Simpson）
function etaNum(t) {
  const lam = []; for (let n = -150; n <= 150; n++) { const l = n + t; if (Math.abs(l) > 1e-12) lam.push(l); }
  const lmin = Math.min(...lam.map(Math.abs)), a = Math.log(0.03), b = Math.log(12 / lmin), N = 800, h = (b - a) / N;
  let s = 0;
  for (let i = 0; i <= N; i++) { const x = Math.exp(a + i * h); let f = 0; for (const l of lam) { const e = x * x * l * l; if (e < 60) f += l * Math.exp(-e); } s += f * x * (i === 0 || i === N ? 1 : i % 2 ? 4 : 2); }
  return 2 / Math.sqrt(Math.PI) * s * h / 3;
}
const etaExact = t => { const fr = t - Math.floor(t); return fr === 0 ? 0 : 1 - 2 * fr; };
const phi0 = (th, t) => { let re = 0, im = 0; for (let n = -12; n <= 12; n++) { const g = Math.exp(-(n + t) * (n + t) / 2); re += g * Math.cos(n * th); im -= g * Math.sin(n * th); } return [re, im]; };
export function SpectralFlowLab() {
  const [t, setT] = useState(0.3);
  const samples = useMemo(() => Array.from({ length: 25 }, (_, i) => { const tt = -0.97 + 2.94 * i / 24; return [tt, etaNum(tt)]; }), []);
  const etaT = useMemo(() => etaNum(t), [t]);
  // D†φ0 的残差（有限差分）与准周期性
  const chk = useMemo(() => {
    let res = 0, nor = 0, qp = 0; const h = 1e-4;
    for (let k = 0; k < 24; k++) { const th = TAU * k / 24;
      const [r0, i0] = phi0(th, t), [rtp, itp] = phi0(th, t + h), [rtm, itm] = phi0(th, t - h), [rap, iap] = phi0(th + h, t), [ram, iam] = phi0(th - h, t);
      const dtR = (rtp - rtm) / (2 * h), dtI = (itp - itm) / (2 * h), daR = (rap - ram) / (2 * h), daI = (iap - iam) / (2 * h);
      // D† = i∂_t − ∂_θ + i t
      const outR = -dtI - daR - t * i0, outI = dtR - daI + t * r0;
      res = Math.max(res, Math.hypot(outR, outI)); nor = Math.max(nor, Math.hypot(r0, i0));
      const [r1, i1] = phi0(th, t + 1), er = Math.cos(th) * r0 - Math.sin(th) * i0, ei = Math.sin(th) * r0 + Math.cos(th) * i0;
      qp = Math.max(qp, Math.hypot(r1 - er, i1 - ei)); }
    return { res: res / nor, qp: qp / nor };
  }, [t]);
  const W = 300, H = 230, X = tt => 30 + (tt + 1) / 3 * (W - 45), Yl = l => H / 2 - l * 32, Ye = e => H / 2 - e * 70;
  const heat = useMemo(() => { const cells = [], nT = 60, nA = 36; let mx = 0; const vals = [];
    for (let i = 0; i < nT; i++) for (let j = 0; j < nA; j++) { const tt = -1 + 3 * (i + 0.5) / nT, th = TAU * (j + 0.5) / nA, [re, im] = phi0(th, tt), v = Math.hypot(re, im); mx = Math.max(mx, v); vals.push([i, j, v]); }
    for (const [i, j, v] of vals) cells.push({ i, j, a: v / mx }); return { cells, nT, nA }; }, []);
  const lmax = 2;
  return (
    <RunCard title={R`交互图 5：谱流、$\eta$ 不变量与指标（例 12.8）`}
      lead={R`$\mathrm{i}\nabla_t=\mathrm{i}\partial_\theta+t$ 的本征值 $\lambda_n(t)=n+t$。左：本征值随 $t$ 的运动（图 12.2）。中：$\eta$ 不变量——点是用 \eqref{12.120}（$s=0$）对 $|n|\le150$ 的模式**数值积分**得到的，实线是 Hurwitz $\zeta$ 函数的解析值 $1-2\{t\}$。右：$\ker D^\dagger$ 的 $\theta$ 函数零模的实部 $\mathrm{Re}\,\phi_0(\theta,t)$（红正蓝负；$|\phi_0|$ 近似为以 $\theta=0$ 为中心的高斯包，相位 $\approx\mathrm{e}^{\mathrm{i}t\theta}$ 随 $t$ 旋转）。`}>
      <Slider label={R`$t$`} value={t} min={-1} max={2} step={0.01} onChange={setT} fmt={v => v.toFixed(2)} />
      <Row gap={10}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={20} x2={W - 10} y1={Yl(0)} y2={Yl(0)} stroke={GRAY} />
          {[-1, 0, 1, 2].map(tt => <g key={tt}><line x1={X(tt)} x2={X(tt)} y1={H - 22} y2={H - 16} stroke={GRAY} /><Txt x={X(tt)} y={H - 4} size={10} color={GRAY}>{tt}</Txt></g>)}
          {[-4, -3, -2, -1, 0, 1, 2].map(nn => { const pts = [[-1, nn - 1], [2, nn + 2]].map(([tt, l]) => [X(tt), Yl(l)]); return <line key={nn} x1={pts[0][0]} y1={pts[0][1]} x2={pts[1][0]} y2={pts[1][1]} stroke={nn === 0 ? RED : BLUE} strokeWidth={nn === 0 ? 2 : 1.3} />; })}
          <rect x={0} y={0} width={W} height={Yl(lmax + 0.6)} fill="#fffdf8" /><rect x={0} y={Yl(-lmax - 0.6)} width={W} height={H} fill="#fffdf8" />
          <line x1={X(t)} x2={X(t)} y1={10} y2={H - 22} stroke={GOLD} strokeWidth="2" />
          <Txt x={W / 2} y={14} size={11}>本征值</Txt>
        </svg>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={20} x2={W - 10} y1={Ye(0)} y2={Ye(0)} stroke={GRAY} />
          {[-1, 0, 1, 2].map(tt => <Txt key={tt} x={X(tt)} y={H - 4} size={10} color={GRAY}>{tt}</Txt>)}
          {[-1, 0, 1].map(k => <line key={k} x1={X(k + 0.001)} y1={Ye(etaExact(k + 0.001))} x2={X(k + 0.999)} y2={Ye(etaExact(k + 0.999))} stroke={INK} strokeWidth="1.5" />)}
          {samples.map(([tt, e], i) => <circle key={i} cx={X(tt)} cy={Ye(e)} r={3.5} fill={GREEN} />)}
          <circle cx={X(t)} cy={Ye(etaT)} r={6} fill={RED} stroke="#fff" strokeWidth="1.5" />
          <line x1={X(t)} x2={X(t)} y1={10} y2={H - 22} stroke={GOLD} strokeWidth="1.5" />
          <Txt x={W / 2} y={14} size={11}>eta 不变量</Txt>
        </svg>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          {heat.cells.map((c, k) => <rect key={k} x={X(-1 + 3 * c.i / heat.nT)} y={20 + (H - 45) * c.j / heat.nA} width={(W - 45) / heat.nT + 0.5} height={(H - 45) / heat.nA + 0.5} fill={c.a >= 0 ? `rgba(155,44,31,${0.05 + 0.9 * c.a})` : `rgba(44,74,110,${0.05 - 0.9 * c.a})`} />)}
          <line x1={X(t)} x2={X(t)} y1={20} y2={H - 25} stroke={GOLD} strokeWidth="2" />
          {[-1, 0, 1, 2].map(tt => <Txt key={tt} x={X(tt)} y={H - 4} size={10} color={GRAY}>{tt}</Txt>)}
          <Txt x={W / 2} y={14} size={11}>θ 函数零模的实部（纵轴为角坐标）</Txt>
        </svg>
      </Row>
      <div style={{ fontSize: 14 }}>
        <TxI>{R`当前 $t$：数值 $\eta$`}</TxI> = <b>{etaT.toFixed(5)}</b>，<TxI>{R`解析 $1-2\{t\}$`}</TxI> = <b>{etaExact(t).toFixed(5)}</b>；<TxI>{R`$t$ 从 $-\varepsilon$ 到 $1-\varepsilon$：谱流 $=+1$（$\lambda_0$ 在 $t=0$ 由负变正），$\ind D=\dim\ker D-\dim\ker D^\dagger=0-1=-1=-$谱流`}</TxI>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(etaT - etaExact(t)) < 2e-3 || Math.abs(t - Math.round(t)) < 0.02} label={R`\eqref{12.120} 数值积分 $=1-2\{t\}$`} />
        <Check ok={chk.res < 1e-5} label={R`$D^\dagger\phi_0=0$（相对残差 $${sci(chk.res)}$）`} />
        <Check ok={chk.qp < 1e-10} label={R`$\phi_0(\theta,t+1)=\mathrm{e}^{\mathrm{i}\theta}\phi_0(\theta,t)$（\eqref{12.128}）`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`$\eta$ 的连续部分斜率 $\dot\eta_c=-2$，每个单位 $t$ 下降 2，又在整数 $t$ 处跳 $+2$——所以 $\eta(1-\varepsilon)-\eta(-\varepsilon)=0=-2+2\times1$，与 \eqref{12.121} 一致；APS 公式 \eqref{12.123} 给出 $\ind=\frac12\int\dot\eta_c\,\dd t-\frac12\Delta\eta=-1$。$\theta$ 函数在每个周期中只有一个"高斯包"——它就是那唯一的零模。`}</TxI></p>
    </RunCard>);
}
