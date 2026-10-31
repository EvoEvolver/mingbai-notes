// 第 3 章交互图（全部在浏览器内用 _ch03_homology.js 的 BigInt 整数算法真算）：
//  1. BoundaryLab —— 选 r 单形并重排顶点：∂σ（式 3.20）、定向符号（式 3.14）、∂∂σ 的逐项相消配对（式 3.26）
//  2. ChainLab    —— 在圆周 / 圆盘 / Möbius 带 / RP² / 环面 / Klein 瓶上点选棱构造 1 链、点选三角形构造 2 链：
//                    ∂c、是否闭链、是否边缘、[c] 在 H₁ 中的阶与坐标、"n c = ∂d" 的见证 2 链（重做例 3.10–3.13）
//  3. HomologyLab —— 任选原书中的复形或"球面 + h 环柄 + c 交叉帽 + q 洞"：边界矩阵、Smith 标准形、H_r、Betti 数、Euler–Poincaré 校验
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, MatrixView, Slider, Seg } from "@kit";
import * as H from "./_ch03_homology.js";

const R = String.raw;
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const sgnTex = s => (s > 0 ? "+" : "-");
const faceTex = (seq, names) => "(" + seq.map(v => names ? names[v] : `p_{${v}}`).join("") + ")";
// 链的 TeX：系数数组 + 单形列表
function chainTex(simps, coeffs, names) {
  const parts = [];
  coeffs.forEach((c, i) => {
    if (!c) return;
    const a = Math.abs(c), body = faceTex(simps[i], names);
    parts.push((c < 0 ? "-" : parts.length ? "+" : "") + (a === 1 ? "" : a) + body);
  });
  return parts.length ? parts.join("") : "0";
}
// SVG 中的顶点名 p_i
const PLabel = ({ x, y, i, dx = 0, dy = 0, size = 13 }) => (
  <text x={x + dx} y={y + dy} fontSize={size} fontStyle="italic" textAnchor="middle" fill="#1f1b16">p<tspan fontSize={size * 0.72} dy="3">{i}</tspan></text>);
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49";
function Arrow({ x1, y1, x2, y2, color, w = 2.5, label }) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, s = 7;
  return <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} />
    <path d={`M${mx + ux * s},${my + uy * s} L${mx - ux * s - uy * s * 0.7},${my - uy * s + ux * s * 0.7} L${mx - ux * s + uy * s * 0.7},${my - uy * s - ux * s * 0.7} Z`} fill={color} />
    {label && <text x={mx - uy * 13} y={my + ux * 13 + 4} fontSize="12" textAnchor="middle" fill={color} fontWeight="bold">{label}</text>}
  </g>;
}

// ============================================================
// 1. 边界算子实验室
// ============================================================
const POS3 = [[150, 26], [40, 150], [170, 222], [268, 124]];
export function BoundaryLab() {
  const [r, setR] = useState(2);
  const [seq, setSeq] = useState([0, 1, 2]);
  const setRank = k => { setR(k); setSeq([...Array(k + 1).keys()]); };
  const swap = k => { if (k >= r) return; const s = [...seq];[s[k], s[k + 1]] = [s[k + 1], s[k]]; setSeq(s); };
  const res = useMemo(() => {
    const sg = H.orderSign(seq);
    // ∂ 按 (3.20) 作用于当前顺序；再把每个面化为升序（按 (3.14) 乘符号）
    const faces = seq.map((_, i) => { const f = seq.filter((__, j) => j !== i), s = i % 2 ? -1 : 1, asc = [...f].sort((a, b) => a - b); return { i, f, s, asc, ns: s * H.orderSign(f) }; });
    const canon = [...Array(r + 1).keys()].map(k => ({ k, s: k % 2 ? -1 : 1 }));   // ∂(p0…pr) 中删去 p_k 的面系数
    const consistent = faces.every(F => { const k = [...Array(r + 1).keys()].find(v => !F.f.includes(v)); return F.ns === sg * canon[k].s; });
    // ∂∂：对每对被删去的顶点 {a<b}，两条删除路径
    const pairs = [];
    for (let a = 0; a <= r; a++) for (let b = a + 1; b <= r; b++) {
      const path = (u, v) => {           // 先删 u 再删 v（按当前顺序中的位置）
        const i = seq.indexOf(u), f = seq.filter(x => x !== u), j = f.indexOf(v), g = f.filter(x => x !== v);
        return { s: (i % 2 ? -1 : 1) * (j % 2 ? -1 : 1) * H.orderSign(g), i, j, g: [...g].sort((x, y) => x - y) };
      };
      pairs.push({ a, b, p1: path(a, b), p2: path(b, a) });
    }
    const allCancel = pairs.every(p => p.p1.s + p.p2.s === 0);
    return { sg, faces, consistent, pairs, allCancel };
  }, [r, seq]);
  const seqTex = faceTex(seq), canonTex = faceTex([...Array(r + 1).keys()]);
  return (
    <RunCard title={R`交互图 1：边界算子 $\partial$、定向与 $\partial^2=0$`}
      lead={R`选单形的维数 $r$，点击相邻两个顶点之间的"⇄"交换它们（相邻对换），观察 (i) 定向符号 $\operatorname{sgn}(P)$（\eqref{3.14}）；(ii) 按 \eqref{3.20} 算出的 $\partial_r\sigma$ 化成标准顺序后恰为 $\operatorname{sgn}(P)\,\partial_r(p_0\ldots p_r)$；(iii) $\partial_{r-1}\partial_r\sigma$ 中每个"删去两个顶点"的面都恰好出现两次、符号相反（\eqref{3.26}）。`}>
      <Row>
        <div>
          <Seg options={[1, 2, 3, 4, 5].map(k => [k, `$r=${k}$`])} value={r} onChange={setRank} />
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", margin: "4px 0 10px" }}>
            <span style={{ marginRight: 6 }}><TxI>{R`$\sigma=$`}</TxI></span>
            {seq.map((v, k) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ padding: "2px 9px", border: "1px solid #c9bfa8", borderRadius: 6, background: "#fffdf8" }}><M>{`p_{${v}}`}</M></span>
              {k < r && <button title="交换这两个相邻顶点" onClick={() => swap(k)} style={{ cursor: "pointer", border: "none", background: "none", color: BLUE, fontSize: 15 }}>⇄</button>}
            </span>)}
            <button style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => setSeq([...Array(r + 1).keys()])}>复原</button>
          </div>
          <p><TxI>{R`$${seqTex}=${res.sg > 0 ? "+" : "-"}${canonTex}$，因为把 $0,1,\ldots,${r}$ 变成当前顺序的置换是**${res.sg > 0 ? "偶" : "奇"}**置换。`}</TxI></p>
        </div>
        {r <= 3 && <BoundaryPicture r={r} faces={res.faces} />}
      </Row>
      <p style={{ marginTop: 8 }}><b>按 (3.20) 逐项计算：</b></p>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>删去第 i 个</th><th><TxI>{R`$(-1)^i\times$面`}</TxI></th><th>化为升序（乘 sgn）</th></tr></thead>
        <tbody>{res.faces.map(F => <tr key={F.i}>
          <td><TxI>{`$i=${F.i}$：删 $p_{${seq[F.i]}}$`}</TxI></td>
          <td><M>{`${sgnTex(F.s)}${faceTex(F.f)}`}</M></td>
          <td><M>{`${sgnTex(F.ns)}${faceTex(F.asc)}`}</M></td>
        </tr>)}</tbody>
      </table></div>
      <p><TxI>{"$\\partial_" + r + "\\sigma=" + res.faces.map((F, k) => (F.ns > 0 ? (k ? "+" : "") : "-") + faceTex(F.asc)).join("") + "$"}</TxI></p>
      <p style={{ marginTop: 8 }}><b>再取一次边界：每个 (r−2) 维面出现两次</b></p>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>删去的两个顶点</th><th>先删前者再删后者</th><th>先删后者再删前者</th><th>合计</th></tr></thead>
        <tbody>{res.pairs.map(p => <tr key={p.a + "-" + p.b}>
          <td><TxI>{`$p_{${p.a}},\\ p_{${p.b}}$`}</TxI></td>
          <td><M>{`${sgnTex(p.p1.s)}${faceTex(p.p1.g)}`}</M> <span className="muted" style={{ fontSize: 12 }}><TxI>{`（位置 $${p.p1.i},${p.p1.j}$）`}</TxI></span></td>
          <td><M>{`${sgnTex(p.p2.s)}${faceTex(p.p2.g)}`}</M> <span className="muted" style={{ fontSize: 12 }}><TxI>{`（位置 $${p.p2.i},${p.p2.j}$）`}</TxI></span></td>
          <td>{p.p1.s + p.p2.s === 0 ? "0 ✔" : "不为 0 ✘"}</td>
        </tr>)}</tbody>
      </table></div>
      <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={res.consistent} label={R`$\partial(\text{重排})=\operatorname{sgn}(P)\,\partial(\text{标准顺序})$`} />
        <Check ok={res.allCancel} label={R`$\partial_{${r - 1}}\partial_{${r}}\sigma=0$（${res.pairs.length} 对全部相消）`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：在"位置"一栏里，第二次删除时的位置号要么与原来相同（被删顶点排在前一个被删顶点之前），要么减了 1（排在之后）——这正是 \eqref{3.26} 第二行中 $(-1)^j$ 与 $(-1)^{j-1}$ 的区别。`}</TxI></p>
    </RunCard>);
}
function BoundaryPicture({ r, faces }) {
  const P = POS3;
  const W = 300, Ht = 280;
  return (
    <svg viewBox={`0 0 ${W} ${Ht}`} width={W} height={Ht} style={{ maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6 }}>
      {r === 3 && faces.map(F => { const pts = F.asc.map(v => P[v]); const cx = pts.reduce((s, p) => s + p[0], 0) / 3, cy = pts.reduce((s, p) => s + p[1], 0) / 3; return <g key={F.i}>
        <polygon points={pts.map(p => p.join(",")).join(" ")} fill={F.ns > 0 ? "rgba(44,74,110,0.10)" : "rgba(155,44,31,0.10)"} stroke="#c9bfa8" />
        <text x={cx} y={cy + 4} fontSize="13" textAnchor="middle" fill={F.ns > 0 ? BLUE : RED} fontWeight="bold">{F.ns > 0 ? "+" : "−"}</text></g>; })}
      {r === 3 && [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].map(([a, b]) => <line key={a + "" + b} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke={INK} strokeDasharray={a === 1 && b === 3 ? "5 4" : undefined} strokeWidth="1.2" />)}
      {r === 2 && <polygon points={[0, 1, 2].map(v => P[v].join(",")).join(" ")} fill="rgba(184,134,43,0.12)" />}
      {r === 2 && faces.map(F => { const [a, b] = F.asc, [u, v] = F.ns > 0 ? [a, b] : [b, a]; return <Arrow key={F.i} x1={P[u][0]} y1={P[u][1]} x2={P[v][0]} y2={P[v][1]} color={F.ns > 0 ? BLUE : RED} />; })}
      {r === 1 && <><line x1={P[0][0]} y1={P[0][1]} x2={P[1][0]} y2={P[1][1]} stroke={GOLD} strokeWidth="3" />
        {faces.map(F => { const v = F.asc[0]; return <text key={F.i} x={P[v][0] + 18} y={P[v][1] + 4} fontSize="16" fontWeight="bold" fill={F.ns > 0 ? BLUE : RED}>{F.ns > 0 ? "+" : "−"}</text>; })}</>}
      {[...Array(r + 1).keys()].map(v => <g key={v}><circle cx={P[v][0]} cy={P[v][1]} r="4" fill={INK} /><PLabel x={P[v][0]} y={P[v][1]} i={v} dx={v === 3 ? 18 : v === 1 ? -16 : v === 2 ? 14 : 0} dy={v === 0 ? -9 : v === 2 ? 16 : 18} /></g>)}
      <text x={8} y={Ht - 8} fontSize="11" fill="#7a6e5a">{r === 1 ? "端点：+ 终点，− 起点" : r === 2 ? "箭头：边界在每条边上诱导的方向" : "每个面上的符号：它在边界链中的系数"}</text>
    </svg>);
}

// ============================================================
// 2. 链与同调类（在原书的剖分图上点选）
// ============================================================
const grid = lab => { const pos = [], L = []; for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { pos.push([30 + 110 * x, 30 + 110 * y]); L.push(lab[y][x]); } const T = []; for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { const id = (X, Y) => Y * 4 + X; T.push([id(x, y), id(x, y + 1), id(x + 1, y)], [id(x, y + 1), id(x + 1, y + 1), id(x + 1, y)]); } return { pos, lab: L, tris: T, W: 390, Ht: 390 }; };
const SURF = {
  circle: { name: R`$S^1$（例 3.8）`, facets: [[0, 1], [1, 2], [2, 0]], draw: { pos: [[200, 30], [60, 262], [340, 262]], lab: [0, 1, 2], tris: [], edges: [[0, 1], [1, 2], [2, 0]], W: 400, Ht: 290 },
    gens: [{ name: "g", tex: R`g=(p_0p_1)+(p_1p_2)+(p_2p_0)`, e: [[0, 1], [1, 2], [2, 0]], range: 8 }], presets: [["$g$", [[0, 1], [1, 2], [2, 0]]], ["$2g$", [[0, 1, 2], [1, 2, 2], [2, 0, 2]]]] },
  disk: { name: "圆盘（例 3.9）", facets: [[0, 1, 2]], draw: { pos: [[200, 30], [60, 262], [340, 262]], lab: [0, 1, 2], tris: [[0, 1, 2]], W: 400, Ht: 290 },
    gens: [], presets: [["绕一圈", [[0, 1], [1, 2], [2, 0]]]] },
  mobius: { name: R`Möbius 带（例 3.10，图 3.8）`, facets: H.MOBIUS_F, draw: { pos: [[30, 40], [150, 40], [270, 40], [390, 40], [30, 170], [150, 170], [270, 170], [390, 170]], lab: [0, 2, 3, 1, 1, 4, 5, 0], tris: [[0, 4, 1], [4, 5, 1], [1, 5, 2], [5, 6, 2], [2, 6, 3], [6, 7, 3]], W: 420, Ht: 205 },
    gens: [{ name: "z", tex: R`z=(p_0p_1)+(p_1p_4)+(p_4p_5)+(p_5p_0)`, e: [[0, 1], [1, 4], [4, 5], [5, 0]], range: 8 }],
    presets: [["$z$", [[0, 1], [1, 4], [4, 5], [5, 0]]], ["$z'$", [[1, 2], [2, 3], [3, 5], [5, 1]]], ["$z''$（边界）", [[1, 4], [4, 5], [5, 0], [0, 2], [2, 3], [3, 1]]]] },
  rp2: { name: R`$\sym{RP}{\mathbb{R}P^2}$（例 3.11，图 3.9）`, facets: H.RP2_F, draw: { pos: [[225, 25], [62, 167], [225, 167], [387, 167], [145, 307], [307, 307], [25, 373], [430, 373], [227, 445]], lab: [5, 4, 0, 3, 1, 2, 3, 4, 5], tris: [[2, 4, 5], [2, 1, 4], [2, 0, 1], [2, 3, 0], [2, 5, 3], [5, 7, 3], [5, 8, 7], [5, 4, 8], [4, 6, 8], [4, 1, 6]], W: 455, Ht: 470 },
    gens: [{ name: "z", tex: R`z=(p_3p_5)+(p_5p_4)+(p_4p_3)`, e: [[3, 5], [5, 4], [4, 3]], range: 1 }], presets: [["$z$", [[3, 5], [5, 4], [4, 3]]], ["$2z$", [[3, 5, 2], [5, 4, 2], [4, 3, 2]]], ["绕 $p_0$ 一圈", [[1, 2], [2, 3], [3, 5], [5, 4], [4, 1]]]] },
  torus: { name: R`环面 $T^2$（例 3.12）`, facets: null, lab: H.TORUS_LAB, draw: grid(H.TORUS_LAB),
    gens: [{ name: "a", tex: R`a=(p_0p_1)+(p_1p_2)+(p_2p_0)`, e: [[0, 1], [1, 2], [2, 0]], range: 6 }, { name: "b", tex: R`b=(p_0p_3)+(p_3p_4)+(p_4p_0)`, e: [[0, 3], [3, 4], [4, 0]], range: 6 }],
    presets: [["$a$", [[0, 1], [1, 2], [2, 0]]], ["$b$", [[0, 3], [3, 4], [4, 0]]], ["$a'$（中间一行）", [[4, 5], [5, 6], [6, 4]]], ["对角线", [[0, 7], [7, 6], [6, 0]]]] },
  klein: { name: R`Klein 瓶（例 3.13，图 3.12）`, facets: null, lab: H.KLEIN_LAB, draw: grid(H.KLEIN_LAB),
    gens: [{ name: "a", tex: R`a=(p_0p_1)+(p_1p_2)+(p_2p_0)`, e: [[0, 1], [1, 2], [2, 0]], range: 1 }, { name: "b", tex: R`b=(p_0p_3)+(p_3p_4)+(p_4p_0)`, e: [[0, 3], [3, 4], [4, 0]], range: 6 }],
    presets: [["$a$", [[0, 1], [1, 2], [2, 0]]], ["$2a$", [[0, 1, 2], [1, 2, 2], [2, 0, 2]]], ["$b$", [[0, 3], [3, 4], [4, 0]]], ["中间一行", [[4, 5], [5, 6], [6, 4]]]] },
};
function buildSurf(id) {
  const S = SURF[id], d = S.draw;
  const facets = S.facets || d.tris.map(t => t.map(i => d.lab[i]));
  const nv = Math.max(...facets.flat()) + 1;
  const K = H.makeComplex(facets, Array.from({ length: nv }, (_, i) => `p_{${i}}`));
  const keyOf = s => [...s].sort((a, b) => a - b).join(",");
  // 画出的棱：三角形各边（去重，按画布顶点对）+ 显式棱
  const seen = new Set(), dEdges = [];
  const addE = (u, v) => { const k = Math.min(u, v) + "-" + Math.max(u, v); if (seen.has(k)) return; seen.add(k); dEdges.push({ u, v, e: K.index[1].get(keyOf([d.lab[u], d.lab[v]])) }); };
  (d.edges || []).forEach(([u, v]) => addE(u, v));
  d.tris.forEach(([a, b, c]) => { addE(a, b); addE(b, c); addE(c, a); });
  const dTris = d.tris.map(t => ({ t, f: K.index[2]?.get(keyOf(t.map(i => d.lab[i]))) }));
  const P = K.simp[2]?.length ? H.prepClass(K, 1) : { rank: 0, D: [], U: null, V: [], cols: 0 };
  const vec = list => { const c = Array(K.simp[1].length).fill(0); for (const [a, b, k = 1] of list) { const i = K.index[1].get(keyOf([a, b])); c[i] += (K.simp[1][i][0] === a ? 1 : -1) * k; } return c; };
  const gens = S.gens.map(g => ({ ...g, v: vec(g.e) }));
  return { S, d, K, dEdges, dTris, P, vec, gens };
}
// 在参考生成元上分解：c ∼ Σ n_i g_i（暴力搜索小范围系数）
function decompose(B, c) {
  const gs = B.gens; if (!gs.length) return null;
  const rec = (k, acc, coeffs) => {
    if (k === gs.length) { const o = H.classOrder(B.P, acc); return o.order === 1 ? coeffs : null; }
    const order = [0]; for (let n = 1; n <= gs[k].range; n++) order.push(n, -n);     // 先试 0, 1, -1, 2, …：挠类取最小的非负代表
    for (const n of order) { const r = rec(k + 1, acc.map((x, i) => x - n * gs[k].v[i]), [...coeffs, n]); if (r) return r; }
    return null;
  };
  return rec(0, c, []);
}
export function ChainLab() {
  const [sid, setSid] = useState("mobius");
  const B = useMemo(() => buildSurf(sid), [sid]);
  const [c1, setC1] = useState(() => B.vec(SURF.mobius.presets[0][1]));
  const [c2, setC2] = useState(() => Array(B.K.simp[2]?.length || 0).fill(0));
  const [mode, setMode] = useState("edge");
  const [showW, setShowW] = useState(true);
  const choose = id => { const nb = buildSurf(id); setSid(id); setC1(nb.vec(SURF[id].presets[0][1])); setC2(Array(nb.K.simp[2]?.length || 0).fill(0)); };
  const cyc = v => (v === 0 ? 1 : v === 1 ? -1 : 0);
  const clickEdge = e => { if (mode !== "edge") return; const c = [...c1]; c[e] = cyc(c[e]); setC1(c); };
  const clickTri = f => { if (mode !== "tri" || f === undefined) return; const c = [...c2]; c[f] = cyc(c[f]); setC2(c); };
  const st = useMemo(() => {
    const bd = H.applyBoundary(B.K, 1, c1), isCycle = bd.every(x => !x), zero = c1.every(x => !x);
    const d2 = c2.length ? H.applyBoundary(B.K, 2, c2) : [];
    let cls = null, dec = null;
    if (isCycle && !zero) { cls = B.K.simp[2]?.length ? H.classOrder(B.P, c1) : { order: Infinity }; dec = decompose(B, c1); }
    return { bd, isCycle, zero, d2, cls, dec };
  }, [B, c1, c2]);
  const names = B.K.names, E = B.K.simp[1];
  const W = B.d.W, Ht = B.d.Ht, pos = B.d.pos;
  const witness = st.cls?.witness;
  const triLabel = f => (mode === "tri" ? c2[f] : showW && witness ? witness[f] : 0);
  const edgeVal = e => c1[e];
  return (
    <RunCard title={R`交互图 2：链、闭链、边缘与同调类——重做例 3.8–3.13`}
      lead={R`在原书的剖分图上点**棱**构造 1 链 $c$（每点一次：$0\to+1\to-1\to0$，$+1$ 表示沿箭头方向 $p_a\to p_b$，$a<b$），或切到"2 链"模式点**三角形**构造 $d$ 并把 $\partial d$ 加到 $c$ 上（不改变同调类）。程序实时给出 $\partial_1c$、$c$ 是否闭链、是否边缘、$[c]$ 的阶，以及 $nc=\partial_2d$ 的**见证** 2 链。被粘合的棱在图中出现多次，点任何一处都一样。`}>
      <Seg options={Object.keys(SURF).map(k => [k, SURF[k].name])} value={sid} onChange={choose} />
      <Row>
        <svg viewBox={`0 0 ${W} ${Ht}`} width={Math.min(W, 460)} style={{ maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, userSelect: "none" }}>
          {B.dTris.map(({ t, f }, k) => { const pts = t.map(i => pos[i]); const v = triLabel(f); const cx = pts.reduce((s, p) => s + p[0], 0) / 3, cy = pts.reduce((s, p) => s + p[1], 0) / 3;
            return <g key={k} onClick={() => clickTri(f)} style={{ cursor: mode === "tri" ? "pointer" : "default" }}>
              <polygon points={pts.map(p => p.join(",")).join(" ")} fill={v > 0 ? "rgba(44,110,73,0.22)" : v < 0 ? "rgba(155,44,31,0.18)" : "rgba(184,134,43,0.06)"} stroke="none" />
              {v !== 0 && <text x={cx} y={cy + 4} fontSize="12" textAnchor="middle" fill={v > 0 ? GREEN : RED} fontWeight="bold">{v > 0 ? "+" + v : v}</text>}
            </g>; })}
          {B.dEdges.map(({ u, v, e }, k) => { const val = edgeVal(e), s = E[e]; const [a, b] = [pos[u], pos[v]];
            const fromU = B.d.lab[u] === s[0];   // 该画布棱的 u 端是否为登记定向的起点
            const [p, q] = (val > 0) === fromU ? [a, b] : [b, a];
            const bdv = mode === "tri" ? st.d2[e] : 0;
            return <g key={k} onClick={() => clickEdge(e)} style={{ cursor: mode === "edge" ? "pointer" : "default" }}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="transparent" strokeWidth="14" />
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8a7e6a" strokeWidth="1.2" />
              {bdv !== 0 && (() => { const [pp, qq] = (bdv > 0) === fromU ? [a, b] : [b, a]; return <Arrow x1={pp[0]} y1={pp[1]} x2={qq[0]} y2={qq[1]} color={GOLD} w={5} label={Math.abs(bdv) > 1 ? String(Math.abs(bdv)) : null} />; })()}
              {val !== 0 && <Arrow x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} color={BLUE} label={Math.abs(val) > 1 ? String(Math.abs(val)) : null} />}
            </g>; })}
          {pos.map((p, i) => { const lb = B.d.lab[i], bad = st.bd[lb]; return <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={bad ? 7 : 4} fill={bad ? RED : INK} />
            <PLabel x={p[0]} y={p[1]} i={lb} dy={p[1] < Ht / 2 ? -9 : 20} dx={p[0] < 40 ? -10 : p[0] > W - 40 ? 10 : 0} />
            {bad ? <text x={p[0] + 10} y={p[1] + 4} fontSize="11" fill={RED} fontWeight="bold">{bad > 0 ? "+" + bad : bad}</text> : null}
          </g>; })}
        </svg>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Seg options={[["edge", "编辑 1 链 c"], ["tri", "编辑 2 链 d"]]} value={mode} onChange={setMode} />
          {mode === "edge" && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            <span className="muted" style={{ fontSize: 13 }}>原书中的闭链：</span>
            {B.S.presets.map(([n, list]) => <button key={n} style={{ cursor: "pointer" }} onClick={() => setC1(B.vec(list))}><TxI>{n}</TxI></button>)}
            <button style={{ cursor: "pointer" }} onClick={() => setC1(Array(E.length).fill(0))}>清空</button>
          </div>}
          {mode === "tri" && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            <button style={{ cursor: "pointer" }} onClick={() => setC2(Array(c2.length).fill(1))}>全部三角形 +1</button>
            <button style={{ cursor: "pointer" }} onClick={() => setC2(Array(c2.length).fill(0))}>清空 d</button>
            <button style={{ cursor: "pointer" }} disabled={c2.every(x => !x)} onClick={() => setC1(c1.map((x, i) => x + st.d2[i]))}><TxI>{R`$c\mapsto c+\partial_2d$`}</TxI></button>
          </div>}
          <p style={{ margin: "4px 0" }}><TxI>{"$c=" + chainTex(E, c1, names) + "$"}</TxI></p>
          <p style={{ margin: "4px 0" }}><TxI>{"$\\partial_1c=" + chainTex(B.K.simp[0], st.bd, names) + "$"}</TxI>{!st.isCycle && <span className="muted">（红点：边界不为零的顶点）</span>}</p>
          {mode === "tri" && <p style={{ margin: "4px 0" }}><TxI>{"$d=" + chainTex(B.K.simp[2] || [], c2, names) + "$，金色：$\\partial_2d=" + chainTex(E, st.d2, names) + "$"}</TxI></p>}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "8px 0" }}>
            <Check ok={st.isCycle} label={st.isCycle ? R`$c$ 是闭链（$\partial_1c=0$）` : R`$c$ 不是闭链`} />
            {st.isCycle && !st.zero && <Check ok={st.cls.order === 1} label={st.cls.order === 1 ? R`$c$ 是边缘：$[c]=0$` : st.cls.order === Infinity ? R`$c$ 不是边缘：$[c]$ 的阶为 $\infty$（自由类）` : R`$c$ 不是边缘，但 $${st.cls.order}c$ 是：$[c]$ 的阶为 $${st.cls.order}$（挠）`} />}
          </div>
          {st.isCycle && !st.zero && st.dec && <p><TxI>{"**同调类：**$c\\sim " + (st.dec.map((n, i) => (n ? (n === 1 ? "" : n === -1 ? "-" : n) + B.gens[i].name : "")).filter(Boolean).join("+").replace(/\+-/g, "-") || "0") + "$，其中 " + B.gens.map(g => "$" + g.tex + "$").join("，")}</TxI></p>}
          {st.isCycle && !st.zero && witness && <p><label style={{ cursor: "pointer" }}><input type="checkbox" checked={showW} onChange={e => setShowW(e.target.checked)} /> 在图中显示见证 </label><TxI>{"$" + (st.cls.order > 1 ? st.cls.order : "") + "c=\\partial_2\\big[" + chainTex(B.K.simp[2], witness, names) + "\\big]$"}</TxI></p>}
          {sid === "disk" && <p className="muted"><TxI>{R`圆盘上每个闭链都是边缘（$H_1=0$，\eqref{3.40}）：试试"绕一圈"。`}</TxI></p>}
          {sid === "rp2" && <p className="muted"><TxI>{R`试试 $z$ 与 $2z$：$z$ 不是边缘，$2z$ 是，见证就是 \eqref{3.47} 中"全部三角形之和"（定向按原书）。"绕 $p_0$ 一圈"则同调于 0。`}</TxI></p>}
          {sid === "mobius" && <p className="muted"><TxI>{R`试试 $z''$（Möbius 带的边界）：它同调于 $2z$，与原书一致；见证 2 链正是原书写出的六个三角形。`}</TxI></p>}
        </div>
      </Row>
    </RunCard>);
}

// ============================================================
// 3. 同调计算器
// ============================================================
function expectedSurface(h, c, q) {
  const free = c === 0 ? (q === 0 ? 2 * h : 2 * h + q - 1) : (q === 0 ? 2 * h + c - 1 : 2 * h + c + q - 1);
  const tor = c > 0 && q === 0 ? [2] : [];
  const H2 = c === 0 && q === 0 ? 1 : 0;
  return [R`\mathbb{Z}`, H.groupTex({ free, torsion: tor }), H.groupTex({ free: H2, torsion: [] })];
}
const alt = xs => xs.map((x, i) => (i ? (i % 2 ? "-" : "+") : "") + x).join("");
const diagSummary = D => { if (!D.length) return "—"; const m = new Map(); D.forEach(d => m.set(d, (m.get(d) || 0) + 1)); return [...m].map(([d, k]) => `${d}^{\\times${k}}`).join(",\\ "); };
export function HomologyLab() {
  const [src, setSrc] = useState("book");
  const [bid, setBid] = useState("rp2");
  const [h, setH] = useState(1), [c, setC] = useState(0), [q, setQ] = useState(0);
  const [mr, setMr] = useState(2);
  const res = useMemo(() => {
    const K = src === "book" ? H.bookComplex(bid) : H.surface(h, c, q);
    const hom = H.homology(K);
    const expect = src === "book" ? H.BOOK.find(b => b.id === bid).expect : expectedSurface(h, c, q);
    return { K, hom, expect };
  }, [src, bid, h, c, q]);
  const { K, hom, expect } = res;
  const got = hom.H.map(H.groupTex);
  const okExpect = expect.every((e, i) => e === got[i]);
  const r = Math.min(Math.max(1, mr), K.dim || 1);
  const Mtx = K.dim >= 1 ? hom.mats[r].map(row => row.map(Number)) : null;
  const small = Mtx && Mtx.length <= 16 && (Mtx[0]?.length ?? 0) <= 16;
  const lab = s => s.join("");
  const info = src === "book" ? H.BOOK.find(b => b.id === bid) : null;
  return (
    <RunCard title={R`交互图 3：同调计算器——Smith 标准形、Betti 数与 Euler–Poincaré`}
      lead={R`对所选单纯复形，程序写出边界矩阵 $\partial_r$（整数），用整数行列变换化为 Smith 标准形 $U\,\partial_{r+1}V=\Delta$，读出 $H_r\cong\mathbb{Z}^{b_r}\oplus\bigoplus_{k_i>1}\mathbb{Z}_{k_i}$（\eqref{3.54}），并检验 \eqref{3.57}。"曲面构造器"从四面体表面出发，依次与 7 顶点环面（环柄）、图 3.9 的射影平面（交叉帽）做连通和，再挖洞——用来验证章末题 3.1、3.2 的答案。`}>
      <Seg options={[["book", "原书中的复形"], ["surf", "曲面构造器（章末题）"]]} value={src} onChange={setSrc} />
      {src === "book" ? <Seg options={H.BOOK.map(b => [b.id, b.label])} value={bid} onChange={setBid} /> :
        <div style={{ display: "flex", gap: "0.4em 1.6em", flexWrap: "wrap", margin: "4px 0 10px" }}>
          <Slider label="环柄数 $h$" value={h} min={0} max={4} onChange={setH} />
          <Slider label="交叉帽数 $c$" value={c} min={0} max={4} onChange={setC} />
          <Slider label="洞数 $q$" value={q} min={0} max={4} onChange={setQ} />
        </div>}
      <p className="muted" style={{ margin: "2px 0 8px" }}><TxI>{src === "book" ? `出处：${info.src}。` : R`构造得到的单纯复形：$I_0=${hom.H[0].I}$，$I_1=${hom.H[1].I}$，$I_2=${hom.H[2]?.I ?? 0}$。`}</TxI></p>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th><TxI>{R`$r$`}</TxI></th><th><TxI>{R`$I_r$`}</TxI></th><th><TxI>{R`$\operatorname{rank}\partial_r$`}</TxI></th><th><TxI>{R`$\operatorname{rank}Z_r$`}</TxI></th><th><TxI>{R`$\operatorname{rank}B_r$`}</TxI></th><th><TxI>{R`$\partial_{r+1}$ 的 Smith 对角元`}</TxI></th><th><TxI>{R`$H_r(K)$`}</TxI></th><th><TxI>{R`$b_r$`}</TxI></th><th>原书 / 公式</th></tr></thead>
        <tbody>{hom.H.map((x, i) => <tr key={i}>
          <td>{x.r}</td><td>{x.I}</td><td>{x.rankD}</td><td>{x.Z}</td><td>{x.B}</td>
          <td><M>{diagSummary(x.diag)}</M></td>
          <td><M>{got[i]}</M></td><td>{x.free}</td>
          <td>{expect[i] !== undefined ? <><M>{expect[i]}</M> {expect[i] === got[i] ? "✔" : "✘"}</> : "—"}</td>
        </tr>)}</tbody>
      </table></div>
      <p><TxI>{R`$\chi=\sum_r(-1)^rI_r=${alt(hom.H.map(x => x.I))}=${hom.chi}$，$\quad\sum_r(-1)^rb_r=${alt(hom.H.map(x => x.free))}=${hom.chiB}$`}</TxI>{src === "surf" && <TxI>{R`$\quad$（公式 $2-2h-c-q=${2 - 2 * h - c - q}$）`}</TxI>}</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "6px 0" }}>
        <Check ok={hom.chi === hom.chiB} label={R`Euler–Poincaré \eqref{3.57}：$\sum(-1)^rI_r=\sum(-1)^rb_r$`} />
        <Check ok={okExpect} label={src === "book" ? `与原书结果一致（${info.src}）` : R`与章末题答案一致`} />
        {src === "surf" && <Check ok={hom.chi === 2 - 2 * h - c - q} label={R`$\chi=2-2h-c-q$`} />}
      </div>
      {K.dim >= 1 && <>
        <div style={{ marginTop: 10 }}><Seg options={[...Array(K.dim).keys()].map(k => [k + 1, `$\\partial_{${k + 1}}$ 的矩阵`])} value={r} onChange={setMr} /></div>
        <Row>
          <MatrixView M={Mtx} cell={small ? 22 : 8} show={small} title={R`$\partial_{${r}}:C_{${r}}\to C_{${r - 1}}$（$${Mtx.length}\times${Mtx[0]?.length ?? 0}$；蓝 $+1$，红 $-1$）`}
            rowLabels={small ? K.simp[r - 1].map(lab) : undefined} colLabels={small ? K.simp[r].map(lab) : undefined} />
          <div style={{ flex: 1, minWidth: 240 }} className="muted">
            <TxI>{R`每一列是一个 $${r}$ 单形 $\sigma$ 的边界 $\partial_{${r}}\sigma$（\eqref{3.20}）：恰有 $${r + 1}$ 个 $\pm1$。行列标签是顶点下标（如 "013" 表示 $(p_0p_1p_3)$）。

$\operatorname{rank}\partial_{${r}}=${hom.H[r].rankD}$；Smith 对角元：$${diagSummary(hom.H[r - 1].diag)}$。${hom.H[r - 1].torsion.length ? `出现 $k_i>1$，所以 $H_{${r - 1}}$ 有挠 $${hom.H[r - 1].torsion.map(k => `\\mathbb{Z}_{${k}}`).join("\\oplus")}$——在有理数上 $\\partial_{${r}}$ 的像比整数上"大"。` : `全部对角元为 1：$H_{${r - 1}}$ 无挠。`}`}</TxI>
          </div>
        </Row>
      </>}
    </RunCard>);
}
