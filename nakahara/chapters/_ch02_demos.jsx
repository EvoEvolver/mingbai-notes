// 第 2 章交互图（全部在浏览器内真算）：
//  1. GluingLab     —— 多边形边粘合：输入/点选边界字 → 并查集求粘合后的顶点类，数 V、E、F，得 χ；判断可定向性、边界分支数、
//                      顶点链接是否为圆周/弧（是否为曲面）；按曲面分类定理给出结果（圆盘、柱面、Möbius 带、T²、Klein 瓶、RP²、Σ_g …）
//  2. ContinuityLab —— 式 (2.27) 的分段函数：移动 Y 中的开区间，精确算出逆像并判断是否为开集（定义 2.4）
//  3. InvariantLab  —— 拓扑不变量判别器：本章出现的 31 个空间，逐项比较紧致、连通分支数、单连通、维数、χ、可定向、边界、割点
//  4. EulerLab      —— Euler 示性数计算器：由真实的顶点坐标与面表数 V、E、F；三种初等细分；正多面体 (p,q) 判别（习题 2.4）
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GREY = "#8a8170";
const LABCOL = ["#2c4a6e", "#9b2c1f", "#2c6e49", "#b8862b", "#6b3fa0", "#1f7a7a", "#a0522d", "#4b5d16"];
const VCOL = ["#d1495b", "#00798c", "#edae49", "#30638e", "#6a4c93", "#8ac926", "#ff7f50", "#3d405b", "#b5838d", "#2a9d8f", "#e76f51", "#264653"];
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const card = { border: "1px solid #e8e0d0", borderRadius: 6, background: "#fffdf8" };
const chip = on => ({ cursor: "pointer", padding: "3px 9px", margin: "2px", borderRadius: 14, border: "1px solid " + (on ? BLUE : "#c9bfa8"), background: on ? "#e6edf5" : "#fffdf8", fontSize: 13 });

// ---------- 并查集 ----------
function makeUF(n) {
  const p = [...Array(n).keys()];
  const find = x => (p[x] === x ? x : (p[x] = find(p[x])));
  const union = (a, b) => { a = find(a); b = find(b); if (a !== b) p[Math.max(a, b)] = Math.min(a, b); };
  return { find, union };
}

// =====================================================================
// 1. 多边形粘合
// =====================================================================
// 边界字：沿多边形逆时针（从底边开始）依次列出各边。token = {lab: "a" | null(不粘合的自由边), inv: 是否为逆（箭头与逆时针方向相反）}
export function parseWord(str) {
  const toks = String(str).trim().split(/[\s,]+/).filter(Boolean);
  const out = [];
  for (const t of toks) {
    if (t === "_" || t === "-") { out.push({ lab: null, inv: false }); continue; }
    const m = t.match(/^([A-Za-z][A-Za-z0-9]*)('|\^-1|\^\{-1\}|-1)?$/);
    if (!m) return { err: `无法识别的记号 "${t}"` };
    out.push({ lab: m[1], inv: !!m[2] });
  }
  if (out.length < 2) return { err: "至少需要 2 条边" };
  if (out.length > 16) return { err: "最多 16 条边" };
  return { toks: out };
}
const labTex = l => { const m = l.match(/^([A-Za-z]+)(\d+)$/); return m ? `${m[1]}_{${m[2]}}` : l; };
const tokTex = t => (t.lab ? labTex(t.lab) + (t.inv ? "^{-1}" : "") : "\\_");
const wordStr = toks => toks.map(t => (t.lab ? t.lab + (t.inv ? "'" : "") : "_")).join(" ");

export function analyzeWord(toks) {
  const n = toks.length;
  // 第 i 条边沿逆时针从角 i 走到角 i+1；箭头起点/终点
  const arrow = toks.map((t, i) => (t.inv ? [(i + 1) % n, i] : [i, (i + 1) % n]));
  const groups = {};
  toks.forEach((t, i) => { if (t.lab) (groups[t.lab] = groups[t.lab] || []).push(i); });
  const bad = Object.entries(groups).filter(([, v]) => v.length !== 2).map(([k, v]) => [k, v.length]);
  const uf = makeUF(n);
  const pairs = Object.values(groups).filter(v => v.length === 2);
  for (const [i, j] of pairs) { uf.union(arrow[i][0], arrow[j][0]); uf.union(arrow[i][1], arrow[j][1]); }
  const roots = [...new Set([...Array(n).keys()].map(uf.find))];
  const vclass = [...Array(n).keys()].map(c => roots.indexOf(uf.find(c)));
  const free = toks.map((t, i) => (t.lab ? -1 : i)).filter(i => i >= 0);
  const V = roots.length, E = free.length + pairs.length, F = 1, chi = V - E + F;
  // 可定向：某个字母的两次出现指数相同 ⇒ 不可定向（单个多边形的标准判据）
  const orientable = pairs.every(([i, j]) => toks[i].inv !== toks[j].inv);
  // 边界分支：自由边在顶点类上构成的图的连通分支数
  const bu = makeUF(V);
  free.forEach(i => bu.union(vclass[i], vclass[(i + 1) % n]));
  const bverts = new Set(free.flatMap(i => [bu.find(vclass[i]), bu.find(vclass[(i + 1) % n])]));
  const b = bverts.size;
  // 顶点链接：结点 = (棱类, 箭头端 s/e)，每个角连接其前后两条边在该角处的端点；每个顶点类的链接须连通
  const ekey = i => (toks[i].lab ? "L" + toks[i].lab : "F" + i);
  const endAt = (i, c) => ekey(i) + ":" + (arrow[i][0] === c ? "s" : "e");   // n ≥ 2 时一条边的两个角不同
  const nodeIdx = new Map(); const nid = k => { if (!nodeIdx.has(k)) nodeIdx.set(k, nodeIdx.size); return nodeIdx.get(k); };
  const arcs = [];
  for (let c = 0; c < n; c++) arcs.push([nid(endAt((c - 1 + n) % n, c)), nid(endAt(c, c)), c]);
  const lu = makeUF(nodeIdx.size);
  arcs.forEach(([a, bb]) => lu.union(a, bb));
  let manifold = true;
  const linkComp = Array(V).fill(0);
  for (let v = 0; v < V; v++) {
    const comps = new Set(arcs.filter(([, , c]) => vclass[c] === v).map(([a]) => lu.find(a)));
    linkComp[v] = comps.size; if (comps.size > 1) manifold = false;
  }
  let name = null, detail = null;
  if (!bad.length && manifold) {
    if (orientable) {
      const g = (2 - chi - b) / 2;
      const known = { "0,0": R`球面 $S^2$`, "0,1": R`圆盘 $D^2$`, "0,2": R`柱面（环带）$S^1\times[0,1]$`, "1,0": R`环面 $T^2$`, "1,1": R`挖去一个圆盘的环面` };
      name = known[`${g},${b}`] || (b === 0 ? R`亏格 ${g} 的闭曲面 $\Sigma_{${g}}$` : R`亏格 ${g}、${b} 个边界圆周的可定向曲面`);
      detail = R`可定向，亏格 $g=(2-\chi-b)/2=${g}$`;
    } else {
      const k = 2 - chi - b;
      const known = { "1,0": R`射影平面 $\sym{RP}{\RP^2}$`, "1,1": R`Möbius 带`, "2,0": R`Klein 瓶`, "2,1": R`挖去一个圆盘的 Klein 瓶` };
      name = known[`${k},${b}`] || (b === 0 ? R`${k} 个交叉帽的闭曲面（$${k}$ 个 $\sym{RP}{\RP^2}$ 的连通和）` : R`${k} 个交叉帽、${b} 个边界圆周的不可定向曲面`);
      detail = R`不可定向，交叉帽数 $k=2-\chi-b=${k}$`;
    }
  }
  return { n, arrow, groups, bad, pairs, vclass, V, E, F, chi, orientable, b, manifold, linkComp, name, detail };
}

const PRESETS = [
  ["圆盘", "_ _ _ _", R`不粘合`],
  ["柱面", "_ a _ a'", R`图 2.3(a)：$(-1,y)\sim(1,y)$`],
  ["Möbius 带", "_ a _ a", R`图 2.3(b)：$(-1,-y)\sim(1,y)$`],
  ["环面", "b a b' a'", R`图 2.4(b)`],
  ["Klein 瓶", "b' a b' a'", R`图 2.5(a)`],
  ["射影平面", "b' a b' a", R`图 2.5(b)`],
  ["球面（邻边粘合）", "a a' b' b", R`$aa^{-1}b^{-1}b$`],
  ["球面（二边形）", "a a'", R`图 2.8 的变体`],
  ["射影平面（二边形）", "a a", R`圆盘边界对径点粘合`],
  ["Klein 瓶（两个交叉帽）", "a a b b", R`$\sym{RP}{\RP^2}\sharp\sym{RP}{\RP^2}$`],
  [R`$\Sigma_2$ 八边形`, "a1 b1 a1' b1' a2 b2 a2' b2'", R`图 2.7(a)`],
  [R`$\Sigma_3$ 十二边形`, "a1 b1 a1' b1' a2 b2 a2' b2' a3 b3 a3' b3'", R`图 2.13(a)，$g=3$`],
];
const CYCLE = [null, "a", "a'", "b", "b'", "c", "c'", "d", "d'"];

function polyCorners(n, cx, cy, Rr) {
  if (n === 2) return [[cx - Rr, cy], [cx + Rr, cy]];
  const a0 = -Math.PI / 2 - Math.PI / n;
  return [...Array(n).keys()].map(i => { const a = a0 + (2 * Math.PI * i) / n; return [cx + Rr * Math.cos(a), cy - Rr * Math.sin(a)]; });
}

export function GluingLab() {
  const [word, setWord] = useState("b a b' a'");
  const [text, setText] = useState("b a b' a'");
  const parsed = useMemo(() => parseWord(word), [word]);
  const toks = parsed.toks || [];
  const res = useMemo(() => (parsed.toks ? analyzeWord(parsed.toks) : null), [parsed]);
  const setW = w => { setWord(w); setText(w); };
  const cycleEdge = i => {
    const cur = toks[i].lab ? toks[i].lab + (toks[i].inv ? "'" : "") : null;
    const k = CYCLE.indexOf(cur); const nx = CYCLE[(k + 1) % CYCLE.length];
    const nt = toks.map((t, j) => (j === i ? (nx ? { lab: nx[0], inv: nx.length > 1 } : { lab: null, inv: false }) : t));
    setW(wordStr(nt));
  };
  const resize = d => { const n = toks.length + d; if (n < 2 || n > 16) return; const nt = d > 0 ? [...toks, { lab: null, inv: false }] : toks.slice(0, -1); setW(wordStr(nt)); };
  const W = 320, H = 300, cx = 160, cy = 150, Rr = 112;
  const P = polyCorners(toks.length, cx, cy, Rr);
  const labs = Object.keys(res?.groups || {});
  const colOf = t => (t.lab ? LABCOL[labs.indexOf(t.lab) % LABCOL.length] : GREY);
  return (
    <RunCard title={R`交互图 1：粘合多边形的边——商空间、$\chi$ 与可定向性`}
      lead={R`边界字沿逆时针（从底边开始）列出各边：字母相同的两条边粘在一起，带 $'$（即 $^{-1}$）的边箭头与逆时针方向相反，"_" 表示不粘合的自由边。**点击图中的边**可以循环改变它的标签。程序用并查集求出粘合后重合的顶点类（同色圆点），数出 $V$、$E$、$F=1$，再判断可定向性（某字母两次出现指数相同 ⇒ 不可定向）、边界圆周数 $b$，并检查每个顶点处的"链接"确实是一个圆周或一段弧（保证结果是曲面）。`}>
      <div style={{ marginBottom: 8 }}>
        {PRESETS.map(([nm, w, note]) => <button key={nm} title={note.replace(/\$/g, "")} style={chip(word === w)} onClick={() => setW(w)}><TxI>{nm}</TxI></button>)}
      </div>
      <Row>
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%", ...card }}>
            <polygon points={toks.length > 2 ? P.map(p => p.join(",")).join(" ") : ""} fill="rgba(44,74,110,0.06)" />
            {toks.length === 2 && <path d={`M${P[0][0]},${P[0][1]} Q${cx},${cy + Rr} ${P[1][0]},${P[1][1]} Q${cx},${cy - Rr} ${P[0][0]},${P[0][1]}`} fill="rgba(44,74,110,0.06)" stroke="none" />}
            {res && toks.map((t, i) => {
              const a = P[i], bb = P[(i + 1) % toks.length], col = colOf(t);
              let ctrl = null, mid, dir;
              if (toks.length === 2) { ctrl = [cx, i === 0 ? cy + Rr : cy - Rr]; mid = [(a[0] + 2 * ctrl[0] + bb[0]) / 4, (a[1] + 2 * ctrl[1] + bb[1]) / 4]; dir = [bb[0] - a[0], bb[1] - a[1]]; }
              else { mid = [(a[0] + bb[0]) / 2, (a[1] + bb[1]) / 2]; dir = [bb[0] - a[0], bb[1] - a[1]]; }
              const L = Math.hypot(dir[0], dir[1]) || 1; let ux = dir[0] / L, uy = dir[1] / L; if (t.inv) { ux = -ux; uy = -uy; }
              const nx = mid[0] - cx, ny = mid[1] - cy, NL = Math.hypot(nx, ny) || 1;
              const lx = mid[0] + (nx / NL) * 17, ly = mid[1] + (ny / NL) * 17 + 4, s = 8;
              const d = ctrl ? `M${a[0]},${a[1]} Q${ctrl[0]},${ctrl[1]} ${bb[0]},${bb[1]}` : `M${a[0]},${a[1]} L${bb[0]},${bb[1]}`;
              return <g key={i} style={{ cursor: "pointer" }} onClick={() => cycleEdge(i)}>
                <path d={d} stroke="transparent" strokeWidth="16" fill="none" />
                <path d={d} stroke={col} strokeWidth={t.lab ? 3 : 2} strokeDasharray={t.lab ? "" : "5 4"} fill="none" />
                {t.lab && <path d={`M${mid[0] + ux * s},${mid[1] + uy * s} L${mid[0] - ux * s - uy * s * 0.7},${mid[1] - uy * s + ux * s * 0.7} L${mid[0] - ux * s + uy * s * 0.7},${mid[1] - uy * s - ux * s * 0.7} Z`} fill={col} />}
                <text x={lx} y={ly} fontSize="14" fontStyle="italic" textAnchor="middle" fill={col}>{t.lab ? t.lab.replace(/(\d+)$/, "") : ""}<tspan fontSize="10" dy="3">{t.lab && /\d+$/.test(t.lab) ? t.lab.match(/\d+$/)[0] : ""}</tspan></text>
              </g>;
            })}
            {res && P.map((p, c) => <circle key={c} cx={p[0]} cy={p[1]} r="6.5" fill={VCOL[res.vclass[c] % VCOL.length]} stroke="#fff" strokeWidth="1.5" />)}
          </svg>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
            <span className="muted" style={{ fontSize: 13 }}>边数</span>
            <button onClick={() => resize(-1)}>−</button><b>{toks.length}</b><button onClick={() => resize(+1)}>+</button>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <label style={{ fontSize: 13 }} className="muted">边界字（空格分隔；a' 或 a^-1 表示逆；_ 表示自由边）</label>
          <div style={{ display: "flex", gap: 6, margin: "4px 0 8px" }}>
            <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && setWord(text)} style={{ flex: 1, fontFamily: "monospace", padding: "3px 6px" }} />
            <button onClick={() => setWord(text)}>粘合</button>
          </div>
          {parsed.err && <p style={{ color: RED }}>{parsed.err}</p>}
          {res && <>
            <p><TxI>{`边界字：$${toks.map(tokTex).join("\\,")}$`}</TxI></p>
            {res.bad.length > 0 && <p style={{ color: RED }}><TxI>{`字母 ${res.bad.map(([k, c]) => `$${labTex(k)}$ 出现 ${c} 次`).join("、")}：每个字母必须恰好出现两次才能配对粘合。`}</TxI></p>}
            <div className="tb-table-wrap"><table className="tb-table"><tbody>
              <tr><td>粘合后的顶点 <M>{"V"}</M></td><td><b>{res.V}</b> <span className="muted" style={{ fontSize: 12 }}>（{res.n} 个角分成 {res.V} 类，见同色圆点）</span></td></tr>
              <tr><td>粘合后的棱 <M>{"E"}</M></td><td><b>{res.E}</b> <span className="muted" style={{ fontSize: 12 }}>（{res.pairs.length} 对粘合 + {res.E - res.pairs.length} 条自由边）</span></td></tr>
              <tr><td>面 <M>{"F"}</M></td><td><b>1</b></td></tr>
              <tr><td><M>{R`\chi=V-E+F`}</M></td><td><b><M>{`${res.V}-${res.E}+1=${res.chi}`}</M></b></td></tr>
              <tr><td>可定向？</td><td>{res.orientable ? "是" : <span>否 <span className="muted" style={{ fontSize: 12 }}>（{res.pairs.filter(([i, j]) => toks[i].inv === toks[j].inv).map(([i]) => toks[i].lab).join("、")} 两次出现方向相同）</span></span>}</td></tr>
              <tr><td>边界圆周数 <M>{"b"}</M></td><td><b>{res.b}</b></td></tr>
            </tbody></table></div>
            {!res.manifold && <p style={{ color: RED }}>有顶点的链接不连通（{res.linkComp.map((k, v) => (k > 1 ? `第 ${v + 1} 类顶点处 ${k} 片` : null)).filter(Boolean).join("、")}）：粘合后在该点"捏"在一起，不是曲面。</p>}
            {res.name && <div style={{ padding: "8px 12px", background: "#eef4ea", borderRadius: 6, border: "1px solid #b9d3b0" }}>
              <b>结果：</b><TxI>{res.name}</TxI><br /><span className="muted" style={{ fontSize: 13 }}><TxI>{`${res.detail}；$\\chi=${res.chi}$，$b=${res.b}$。`}</TxI></span>
            </div>}
            <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Check ok={res.bad.length === 0} label="每个字母恰好出现两次" />
              <Check ok={res.manifold} label="每个顶点的链接连通（是曲面）" />
            </div>
          </>}
        </div>
      </Row>
      <p className="muted" style={{ fontSize: 13, marginTop: 8 }}><TxI>{R`读法：曲面分类定理说，紧致连通曲面由三样东西完全决定——可定向与否、$\chi$、边界圆周数 $b$。可定向时亏格 $g=(2-\chi-b)/2$，不可定向时交叉帽数 $k=2-\chi-b$。试试把"环面"的一条边改成反向（变成 Klein 瓶），或把 $\Sigma_2$ 的八边形打乱顺序，看 $V$ 与 $\chi$ 怎样变化。`}</TxI></p>
    </RunCard>);
}

// =====================================================================
// 2. 连续性：开集的逆像
// =====================================================================
const fmt = x => { const v = Math.round(x * 1000) / 1000; return (Object.is(v, -0) ? 0 : v).toString(); };
export function preimage(lo, hi, b2) {
  // f(x) = 1 - x (x ≤ 0)；f(x) = b2 - x (x > 0)。返回逆像的区间列表 {a, b, ca, cb}（ca/cb：端点是否属于集合）
  const out = [];
  let A = 1 - hi, B = 1 - lo;                          // 第一支：x ∈ (A, B) ∩ (-∞, 0]
  if (A < 0) out.push(B <= 0 ? { a: A, b: B, ca: false, cb: false } : { a: A, b: 0, ca: false, cb: true });
  A = b2 - hi; B = b2 - lo;                            // 第二支：x ∈ (A, B) ∩ (0, ∞)
  if (B > 0) out.push(A >= 0 ? { a: A, b: B, ca: false, cb: false } : { a: 0, b: B, ca: false, cb: false });
  // 合并 (…,0] 与 (0,…)
  if (out.length === 2 && out[0].b === 0 && out[0].cb && out[1].a === 0) return [{ a: out[0].a, b: out[1].b, ca: false, cb: false }];
  return out;
}
const isOpenSet = ivs => ivs.every(I => !I.ca && !I.cb);
const ivTex = I => `${I.ca ? "[" : "("}${fmt(I.a)},${fmt(I.b)}${I.cb ? "]" : ")"}`;

export function ContinuityLab() {
  const [c, setC] = useState(1);
  const [r, setR] = useState(0.25);
  const [mode, setMode] = useState("jump");
  const b2 = mode === "jump" ? 0.5 : 1;
  const lo = c - r, hi = c + r;
  const ivs = preimage(lo, hi, b2);
  const open = isOpenSet(ivs);
  const W = 560, H = 330, m = { l: 46, r: 14, t: 14, b: 34 };
  const X0 = -2, X1 = 2, Y0 = -1.6, Y1 = 3.1;
  const sx = x => m.l + ((x - X0) / (X1 - X0)) * (W - m.l - m.r), sy = y => m.t + ((Y1 - y) / (Y1 - Y0)) * (H - m.t - m.b);
  const clipX = x => Math.max(X0, Math.min(X1, x));
  return (
    <RunCard title={R`交互图 2：连续性 = 开集的逆像是开集（式 2.27）`}
      lead={R`在纵轴上移动开区间 $(c-r,\,c+r)\subset Y$，程序精确算出它在 \eqref{2.27} 下的逆像，并判断是不是开集。当区间含 $f(0)=1$、却不含 $\tfrac12$ 下方紧邻的值时，逆像在 $0$ 处带一个闭端点——这就是间断。切换到"连续版本"（$x>0$ 时也取 $-x+1$）对照：此时无论怎么移动，逆像总是开集。`}>
      <Seg options={[["jump", R`式 (2.27)：$x>0$ 时 $-x+\tfrac12$`], ["cont", R`连续版本：处处 $-x+1$`]]} value={mode} onChange={setMode} />
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%", ...card }}>
          {/* 坐标轴 */}
          <line x1={sx(X0)} y1={sy(0)} x2={sx(X1)} y2={sy(0)} stroke="#bbb" />
          <line x1={sx(0)} y1={sy(Y0)} x2={sx(0)} y2={sy(Y1)} stroke="#bbb" />
          {[-2, -1, 1, 2].map(x => <text key={x} x={sx(x)} y={sy(0) + 14} fontSize="11" textAnchor="middle" fill={GREY}>{x}</text>)}
          {[-1, 1, 2, 3].map(y => <text key={y} x={sx(0) - 6} y={sy(y) + 4} fontSize="11" textAnchor="end" fill={GREY}>{y}</text>)}
          <text x={sx(0) - 6} y={sy(0.5) + 4} fontSize="11" textAnchor="end" fill={GREY}>½</text>
          {/* Y 中的开区间 */}
          <rect x={m.l} y={sy(Math.min(hi, Y1))} width={W - m.l - m.r} height={Math.max(0, sy(Math.max(lo, Y0)) - sy(Math.min(hi, Y1)))} fill="rgba(184,134,43,0.13)" />
          <line x1={sx(0) - 4} y1={sy(hi)} x2={sx(0) + 4} y2={sy(hi)} stroke={GOLD} strokeWidth="2" />
          <line x1={sx(0) - 4} y1={sy(lo)} x2={sx(0) + 4} y2={sy(lo)} stroke={GOLD} strokeWidth="2" />
          <line x1={sx(0)} y1={sy(Math.min(hi, Y1))} x2={sx(0)} y2={sy(Math.max(lo, Y0))} stroke={GOLD} strokeWidth="4" opacity="0.7" />
          {/* 函数图像 */}
          <line x1={sx(X0)} y1={sy(1 - X0)} x2={sx(0)} y2={sy(1)} stroke={BLUE} strokeWidth="2.5" />
          <circle cx={sx(0)} cy={sy(1)} r="4.5" fill={BLUE} />
          <line x1={sx(0)} y1={sy(b2)} x2={sx(X1)} y2={sy(b2 - X1)} stroke={BLUE} strokeWidth="2.5" />
          {mode === "jump" && <circle cx={sx(0)} cy={sy(b2)} r="4.5" fill="#fff" stroke={BLUE} strokeWidth="2" />}
          {/* 逆像 */}
          {ivs.map((I, k) => <g key={k}>
            <line x1={sx(clipX(I.a))} y1={sy(0)} x2={sx(clipX(I.b))} y2={sy(0)} stroke={open ? GREEN : RED} strokeWidth="6" opacity="0.8" />
            {[[I.a, I.ca], [I.b, I.cb]].map(([x, cl], j) => x >= X0 && x <= X1 && <circle key={j} cx={sx(x)} cy={sy(0)} r="5" fill={cl ? (open ? GREEN : RED) : "#fff"} stroke={open ? GREEN : RED} strokeWidth="2" />)}
          </g>)}
          <text x={W - m.r} y={sy(0) - 8} fontSize="12" textAnchor="end" fill={INK} fontStyle="italic">x</text>
        </svg>
        <div style={{ flex: "1 1 220px", minWidth: 220 }}>
          <Slider label="$c$（区间中心）" value={c} min={-1} max={2.8} step={0.01} onChange={setC} fmt={v => v.toFixed(2)} />
          <Slider label="$r$（半宽）" value={r} min={0.02} max={1} step={0.01} onChange={setR} fmt={v => v.toFixed(2)} />
          <p><TxI>{`$U=(${fmt(lo)},\\,${fmt(hi)})$`}</TxI></p>
          <p><TxI>{`$f^{-1}(U)=${ivs.length ? ivs.map(ivTex).join("\\cup") : "\\emptyset"}$`}</TxI></p>
          <Check ok={open} label={open ? "逆像是开集" : R`逆像不是开集：$0$ 属于它，但 $0$ 右侧任意近处都不属于它`} />
          <div style={{ marginTop: 10 }}>
            <button style={chip(false)} onClick={() => { setMode("jump"); setC(1.75); setR(0.25); }}><TxI>{R`原书：$U=(3/2,2)$`}</TxI></button>
            <button style={chip(false)} onClick={() => { setMode("jump"); setC(1); setR(0.25); }}><TxI>{R`原书：$U=(3/4,5/4)$`}</TxI></button>
          </div>
        </div>
      </Row>
    </RunCard>);
}

// =====================================================================
// 3. 拓扑不变量判别器
// =====================================================================
// 字段：tex 名称；cls 同胚类；ht 同伦型；cpt 紧致；comp 连通分支数；sc 单连通（每个分支）；dim 维数；chi Euler 示性数；chiH χ 是否只按同伦型定义（非紧）；
// ori 可定向（仅对曲面列出）；bd 边界分支数（非流形为 null）；cut 是否存在割点（去掉后分支数增加的点）
const SP = [
  { id: "pt", tex: R`一点 $\{0\}$`, cls: "pt", ht: "pt", cpt: 1, comp: 1, sc: 1, dim: 0, chi: 1, bd: 0, cut: 0 },
  { id: "I", tex: R`闭区间 $[-1,1]$`, cls: "I", ht: "pt", cpt: 1, comp: 1, sc: 1, dim: 1, chi: 1, bd: 2, cut: 1 },
  { id: "half", tex: R`半开区间 $[0,1)$`, cls: "half", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 1, chi: 1, chiH: 1, bd: 1, cut: 1 },
  { id: "open", tex: R`开区间 $(-1,1)$`, cls: "line", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 1, chi: 1, chiH: 1, bd: 0, cut: 1 },
  { id: "R", tex: R`直线 $\mathbb{R}$`, cls: "line", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 1, chi: 1, chiH: 1, bd: 0, cut: 1 },
  { id: "para", tex: R`抛物线 $y=x^2$`, cls: "line", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 1, chi: 1, chiH: 1, bd: 0, cut: 1 },
  { id: "2pt", tex: R`两点 $\{0,1\}$`, cls: "2pt", ht: "2pt", cpt: 1, comp: 2, sc: 1, dim: 0, chi: 2, bd: 0, cut: 0 },
  { id: "hyp", tex: R`双曲线 $x^2-y^2=1$`, cls: "2line", ht: "2pt", cpt: 0, comp: 2, sc: 1, dim: 1, chi: 2, chiH: 1, bd: 0, cut: 1 },
  { id: "Rm0", tex: R`$\mathbb{R}-\{0\}$`, cls: "2line", ht: "2pt", cpt: 0, comp: 2, sc: 1, dim: 1, chi: 2, chiH: 1, bd: 0, cut: 1 },
  { id: "S1", tex: R`圆周 $S^1$`, cls: "S1", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 1, chi: 0, bd: 0, cut: 0 },
  { id: "sq", tex: R`正方形的边 $I^2$`, cls: "S1", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 1, chi: 0, bd: 0, cut: 0 },
  { id: "ell", tex: R`椭圆 $E$`, cls: "S1", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 1, chi: 0, bd: 0, cut: 0 },
  { id: "eight", tex: R`8 字形 $S^1\vee S^1$`, cls: "eight", ht: "wedge", cpt: 1, comp: 1, sc: 0, dim: 1, chi: -1, bd: null, cut: 1 },
  { id: "theta", tex: R`$\theta$ 字形（三条弧共端点）`, cls: "theta", ht: "wedge", cpt: 1, comp: 1, sc: 0, dim: 1, chi: -1, bd: null, cut: 0 },
  { id: "ring2", tex: R`分开的两个环`, cls: "2S1", ht: "2S1", cpt: 1, comp: 2, sc: 0, dim: 1, chi: 0, bd: 0, cut: 0 },
  { id: "link", tex: R`相扣的两个环（图 2.10(b)）`, cls: "2S1", ht: "2S1", cpt: 1, comp: 2, sc: 0, dim: 1, chi: 0, bd: 0, cut: 0 },
  { id: "odisc", tex: R`开圆盘 $D^2$`, cls: "plane", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 2, chi: 1, chiH: 1, ori: 1, bd: 0, cut: 0 },
  { id: "R2", tex: R`平面 $\mathbb{R}^2$`, cls: "plane", ht: "pt", cpt: 0, comp: 1, sc: 1, dim: 2, chi: 1, chiH: 1, ori: 1, bd: 0, cut: 0 },
  { id: "cdisc", tex: R`闭圆盘 $\bar D^2$`, cls: "cdisc", ht: "pt", cpt: 1, comp: 1, sc: 1, dim: 2, chi: 1, ori: 1, bd: 1, cut: 0 },
  { id: "R2m0", tex: R`$\mathbb{R}^2-\{\boldsymbol{0}\}$`, cls: "punct", ht: "S1", cpt: 0, comp: 1, sc: 0, dim: 2, chi: 0, chiH: 1, ori: 1, bd: 0, cut: 0 },
  { id: "cylinf", tex: R`无限长柱面 $S^1\times\mathbb{R}$`, cls: "punct", ht: "S1", cpt: 0, comp: 1, sc: 0, dim: 2, chi: 0, chiH: 1, ori: 1, bd: 0, cut: 0 },
  { id: "cyl", tex: R`有限柱面 $S^1\times[-1,1]$（图 2.3(a)）`, cls: "annulus", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 2, chi: 0, ori: 1, bd: 2, cut: 0 },
  { id: "mob", tex: R`Möbius 带（图 2.3(b)）`, cls: "mob", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 2, chi: 0, ori: 0, bd: 1, cut: 0 },
  { id: "S2", tex: R`球面 $S^2$`, cls: "S2", ht: "S2", cpt: 1, comp: 1, sc: 1, dim: 2, chi: 2, ori: 1, bd: 0, cut: 0 },
  { id: "T2", tex: R`环面 $T^2$`, cls: "T2", ht: "T2", cpt: 1, comp: 1, sc: 0, dim: 2, chi: 0, ori: 1, bd: 0, cut: 0 },
  { id: "K", tex: R`Klein 瓶`, cls: "K", ht: "K", cpt: 1, comp: 1, sc: 0, dim: 2, chi: 0, ori: 0, bd: 0, cut: 0 },
  { id: "RP2", tex: R`射影平面 $\sym{RP}{\RP^2}$`, cls: "RP2", ht: "RP2", cpt: 1, comp: 1, sc: 0, dim: 2, chi: 1, ori: 0, bd: 0, cut: 0 },
  { id: "S22", tex: R`$\Sigma_2$`, cls: "S22", ht: "S22", cpt: 1, comp: 1, sc: 0, dim: 2, chi: -2, ori: 1, bd: 0, cut: 0 },
  { id: "dough", tex: R`实心甜甜圈（实心环）`, cls: "stor", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 3, chi: 0, bd: 1, cut: 0 },
  { id: "cup", tex: R`咖啡杯（图 2.10(a)）`, cls: "stor", ht: "S1", cpt: 1, comp: 1, sc: 0, dim: 3, chi: 0, bd: 1, cut: 0 },
  { id: "R3m0", tex: R`$\mathbb{R}^3-\{\boldsymbol{0}\}$`, cls: "R3m0", ht: "S2", cpt: 0, comp: 1, sc: 1, dim: 3, chi: 2, chiH: 1, bd: 0, cut: 0 },
];
const HT_NAME = { pt: "一点", "2pt": "两点", S1: R`$S^1$`, "2S1": "两个圆周", wedge: R`$S^1\vee S^1$`, S2: R`$S^2$`, T2: R`$T^2$`, K: "Klein 瓶", RP2: R`$\sym{RP}{\RP^2}$`, S22: R`$\Sigma_2$` };
const WITNESS = {
  line: R`$(-1,1)\to\mathbb{R}$：$x\mapsto\tan(\pi x/2)$（例 2.13(e)）；抛物线 $\to\mathbb{R}$：$(x,x^2)\mapsto x$。`,
  "2line": R`双曲线的每一支都同胚于 $\mathbb{R}$（右支 $(\cosh t,\sinh t)\mapsto t$），$\mathbb{R}-\{0\}$ 的两条开射线也各同胚于 $\mathbb{R}$（$x\mapsto\ln|x|$）；两支分别对应即可。`,
  S1: R`正方形 $\to S^1$：$(x,y)\mapsto(x/r,y/r)$（\eqref{2.30}）；$S^1\to E$：$(x,y)\mapsto(ax,by)$（习题 2.18）。`,
  "2S1": R`两个圆周分别对应；同胚不关心它们在 $\mathbb{R}^3$ 中是否相扣（习题 2.3）。`,
  plane: R`$D^2\to\mathbb{R}^2$：\eqref{2.28}，逆为 \eqref{2.29}。`,
  punct: R`$\mathbb{R}^2-\{\boldsymbol{0}\}\to S^1\times\mathbb{R}$：$\boldsymbol{x}\mapsto(\boldsymbol{x}/|\boldsymbol{x}|,\,\ln|\boldsymbol{x}|)$。`,
  stor: R`把杯身捏进杯柄，就是实心环（图 2.10(a)）。`,
};
const ROWS = [
  ["cpt", "紧致", s => (s.cpt ? "是" : "否")],
  ["comp", "连通分支数", s => String(s.comp)],
  ["sc", "单连通（每个分支）", s => (s.sc ? "是" : "否")],
  ["dim", "维数", s => String(s.dim)],
  ["chi", R`Euler 示性数 $\chi$`, s => `$${s.chi}$` + (s.chiH ? "（按同伦型）" : "")],
  ["ori", "可定向（曲面）", s => (s.ori == null ? "—" : s.ori ? "是" : "否")],
  ["bd", "边界分支数", s => (s.bd == null ? "—（非流形）" : String(s.bd))],
  ["cut", "存在割点", s => (s.cut ? "是" : "否")],
];
const REASON = {
  cpt: "一个紧致、一个不紧致；紧致性是拓扑不变量。",
  comp: "连通分支数不同；连通性（及分支数）是拓扑不变量。",
  sc: "一个单连通、一个不是；单连通性是拓扑不变量。",
  dim: "维数不同（维数的拓扑不变性是 Brouwer 的区域不变性定理，原书未证）。",
  chi: R`Euler 示性数不同（定理 2.6；对非紧空间按同伦型计算）。`,
  ori: "一个可定向、一个不可定向。",
  bd: "边界分支数不同（同胚把边界点映成边界点）。",
  cut: R`一个有割点（去掉后分支变多的点）、一个没有；同胚 $f$ 把 $X-\{p\}$ 同胚地映到 $Y-\{f(p)\}$（例 2.13(d) 的论证）。`,
};

export function InvariantLab() {
  const [a, setA] = useState("S1");
  const [b, setB] = useState("I");
  const [slot, setSlot] = useState(0);
  const A = SP.find(s => s.id === a), B = SP.find(s => s.id === b);
  const diffs = ROWS.filter(([k]) => String(A[k]) !== String(B[k]));
  const homeo = A.cls === B.cls, htSame = A.ht === B.ht;
  // 数据自检：同一同胚类内不变量一致；同伦型相同 ⇒ χ 相同
  const selfCheck = useMemo(() => {
    let ok1 = true, ok2 = true;
    for (const s of SP) for (const t of SP) {
      if (s.cls === t.cls && ROWS.some(([k]) => String(s[k]) !== String(t[k]))) ok1 = false;
      if (s.ht === t.ht && s.chi !== t.chi) ok2 = false;
    }
    return [ok1, ok2];
  }, []);
  const pick = id => { if (slot === 0) { setA(id); setSlot(1); } else { setB(id); setSlot(0); } };
  return (
    <RunCard title="交互图 3：拓扑不变量判别器"
      lead={R`先点"空间 A"或"空间 B"选定要填的槽，再点下面的空间（填完自动切到另一个槽）。表中逐项比较本章的拓扑不变量。**只要有一项不同，就证明了两者不同胚**；全部相同时，程序查它内置的同胚类给出结论——这一步不是由不变量推出的（我们没有完全的不变量集），而是给出了具体的同胚映射。`}>
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
        <button style={{ ...chip(slot === 0), fontWeight: 600 }} onClick={() => setSlot(0)}>空间 A：<TxI>{A.tex}</TxI></button>
        <button style={{ ...chip(slot === 1), fontWeight: 600 }} onClick={() => setSlot(1)}>空间 B：<TxI>{B.tex}</TxI></button>
      </div>
      <div style={{ maxHeight: 150, overflowY: "auto", ...card, padding: 4, marginBottom: 8 }}>
        {SP.map(s => <button key={s.id} style={{ ...chip(s.id === a || s.id === b), fontSize: 12 }} onClick={() => pick(s.id)}><TxI>{s.tex}</TxI></button>)}
      </div>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>不变量</th><th><TxI>{A.tex}</TxI></th><th><TxI>{B.tex}</TxI></th><th></th></tr></thead>
        <tbody>{ROWS.map(([k, label, f]) => { const d = String(A[k]) !== String(B[k]); return <tr key={k} style={d ? { background: "#fbeceb" } : null}>
          <td><TxI>{label}</TxI></td><td><TxI>{f(A)}</TxI></td><td><TxI>{f(B)}</TxI></td><td>{d ? <b style={{ color: RED }}>不同</b> : <span className="muted">相同</span>}</td></tr>; })}
          <tr><td>同伦型</td><td><TxI>{HT_NAME[A.ht]}</TxI></td><td><TxI>{HT_NAME[B.ht]}</TxI></td><td>{htSame ? <span className="muted">相同</span> : <span className="muted">不同</span>}</td></tr>
        </tbody>
      </table></div>
      <div style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid " + (homeo ? "#b9d3b0" : "#e3b8b2"), background: homeo ? "#eef4ea" : "#fbf1ef" }}>
        {a === b ? <TxI>同一个空间。</TxI>
          : diffs.length ? <><b>不同胚。</b><TxI>{` 理由（${diffs.length} 条）：`}</TxI><ul style={{ margin: "4px 0 0 1.2em" }}>{diffs.map(([k]) => <li key={k}><TxI>{REASON[k]}</TxI></li>)}</ul></>
            : homeo ? <><b>同胚。</b> <TxI>{WITNESS[A.cls] || "同一类空间。"}</TxI></>
              : <><b>本表的不变量全部相同，但它们并不同胚</b>——已知不变量只是"部分集合"。</>}
        {a !== b && !homeo && htSame && <p style={{ margin: "6px 0 0" }} className="muted"><TxI>{R`注意：两者**同伦型相同**（都 $\simeq$ ${HT_NAME[A.ht]}），所以 $\chi$ 必然相同（例 2.16(b)）——同伦型比同胚粗。`.replace("${HT_NAME[A.ht]}", HT_NAME[A.ht])}</TxI></p>}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Check ok={selfCheck[0]} label="数据自检：同一同胚类内所有不变量一致" />
        <Check ok={selfCheck[1]} label={R`数据自检：同伦型相同 $\Rightarrow$ $\chi$ 相同`} />
      </div>
      <p className="muted" style={{ fontSize: 13, marginTop: 6 }}><TxI>{R`值得一试的组合：$[-1,1]$ 与 $S^1$（例 2.13(d)）；抛物线与双曲线（例 2.13(c)）；开区间与 $\mathbb{R}$（例 2.13(e)）；柱面与 Möbius 带（同伦型相同、不同胚）；8 字形与 $\theta$ 字形（$\chi$ 都是 $-1$，只有割点能区分）；两点与 $S^2$（$\chi$ 都是 2）；咖啡杯与实心甜甜圈。`}</TxI></p>
    </RunCard>);
}

// =====================================================================
// 4. Euler 示性数计算器
// =====================================================================
const PHI = (1 + Math.sqrt(5)) / 2;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const nrm = a => Math.hypot(a[0], a[1], a[2]);
// 凸包的面（共面顶点合并为多边形面），只用于小点集
function hullFaces(P) {
  const n = P.length, faces = [], seen = new Set();
  const c0 = P.reduce((s, p) => [s[0] + p[0] / n, s[1] + p[1] / n, s[2] + p[2] / n], [0, 0, 0]);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    let N = cross(sub(P[j], P[i]), sub(P[k], P[i])); const L = nrm(N); if (L < 1e-9) continue; N = N.map(x => x / L);
    const d = P.map(p => dot(N, sub(p, P[i])));
    if (!(d.every(x => x <= 1e-7) || d.every(x => x >= -1e-7))) continue;
    const S = d.map((x, m) => (Math.abs(x) < 1e-7 ? m : -1)).filter(m => m >= 0), key = S.join(",");
    if (seen.has(key)) continue; seen.add(key);
    if (dot(N, sub(P[i], c0)) < 0) N = N.map(x => -x);          // 外法向
    const cc = S.reduce((s, m) => [s[0] + P[m][0] / S.length, s[1] + P[m][1] / S.length, s[2] + P[m][2] / S.length], [0, 0, 0]);
    let u = sub(P[S[0]], cc); u = u.map(x => x / nrm(u)); const w = cross(N, u);
    faces.push([...S].sort((x, y) => Math.atan2(dot(sub(P[x], cc), w), dot(sub(P[x], cc), u)) - Math.atan2(dot(sub(P[y], cc), w), dot(sub(P[y], cc), u))));
  }
  return faces;
}
const scaleTo = (P, rad = 1.6) => { const m = Math.max(...P.map(nrm)); return P.map(p => p.map(x => (x * rad) / m)); };
function makeSolid(id) {
  let P;
  if (id === "tet") P = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
  else if (id === "cube") { P = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) P.push([x, y, z]); }
  else if (id === "oct") P = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  else if (id === "ico") { P = []; for (const s of [-1, 1]) for (const t of [-1, 1]) P.push([0, s, t * PHI], [s, t * PHI, 0], [t * PHI, 0, s]); }
  else if (id === "dod") {
    P = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) P.push([x, y, z]);
    for (const s of [-1, 1]) for (const t of [-1, 1]) P.push([0, s / PHI, t * PHI], [s / PHI, t * PHI, 0], [t * PHI, 0, s / PHI]);
  }
  else if (id === "prism") { P = []; for (let k = 0; k < 3; k++) for (const z of [-1, 1]) P.push([Math.cos((2 * Math.PI * k) / 3) * 1.2, Math.sin((2 * Math.PI * k) / 3) * 1.2, z]); }
  else if (id === "pyr") P = [[1, 1, -0.7], [1, -1, -0.7], [-1, -1, -0.7], [-1, 1, -0.7], [0, 0, 1.1]];
  if (id === "frame") {                                                  // 图 2.11(a)：画框环面，16 顶点、32 棱、16 面
    const sq = s => [[s, s], [-s, s], [-s, -s], [s, -s]];
    const Ot = sq(1.6).map(([x, y]) => [x, y, 0.35]), It = sq(0.8).map(([x, y]) => [x, y, 0.35]);
    const Ob = sq(1.6).map(([x, y]) => [x, y, -0.35]), Ib = sq(0.8).map(([x, y]) => [x, y, -0.35]);
    P = [...Ot, ...It, ...Ob, ...Ib];                                      // 0–3 外上，4–7 内上，8–11 外下，12–15 内下
    const F = [];
    for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; F.push([i, j, 4 + j, 4 + i], [8 + i, 12 + i, 12 + j, 8 + j], [i, 8 + i, 8 + j, j], [4 + i, 4 + j, 12 + j, 12 + i]); }
    return { P, F };
  }
  P = scaleTo(P);
  return { P, F: hullFaces(P) };
}
const SOLIDS = [["tet", "正四面体"], ["cube", "立方体"], ["oct", "正八面体"], ["dod", "正十二面体"], ["ico", "正二十面体"], ["prism", "三棱柱"], ["pyr", "四棱锥"], ["frame", "画框环面（图 2.11(a)）"]];
function edgesOf(F) { const s = new Set(); F.forEach(f => f.forEach((v, i) => { const w = f[(i + 1) % f.length]; s.add(v < w ? v + "-" + w : w + "-" + v); })); return [...s].map(k => k.split("-").map(Number)); }
const counts = M => ({ V: M.P.length, E: edgesOf(M.F).length, F: M.F.length });
function newell(P, f) { let n = [0, 0, 0]; f.forEach((v, i) => { const a = P[v], b = P[f[(i + 1) % f.length]]; n = [n[0] + (a[1] - b[1]) * (a[2] + b[2]), n[1] + (a[2] - b[2]) * (a[0] + b[0]), n[2] + (a[0] - b[0]) * (a[1] + b[1])]; }); const L = nrm(n) || 1; return n.map(x => x / L); }
// 三种初等细分（返回新网格）
function opEdge(M) {
  const E = edgesOf(M.F); let best = E[0], bl = -1;
  E.forEach(([u, w]) => { const l = nrm(sub(M.P[u], M.P[w])); if (l > bl + 1e-9) { bl = l; best = [u, w]; } });
  const [u, w] = best, m = M.P.length, P = [...M.P, M.P[u].map((x, i) => (x + M.P[w][i]) / 2)];
  const F = M.F.map(f => { const out = []; f.forEach((v, i) => { const nx = f[(i + 1) % f.length]; out.push(v); if ((v === u && nx === w) || (v === w && nx === u)) out.push(m); }); return out; });
  return { P, F };
}
function opDiag(M) {
  let k = -1, best = 3; M.F.forEach((f, i) => { if (f.length > best) { best = f.length; k = i; } });
  if (k < 0) return null;
  const f = M.F[k], F = [...M.F.slice(0, k), [f[0], f[1], f[2]], [f[0], ...f.slice(2)], ...M.F.slice(k + 1)];
  return { P: M.P, F };
}
function opStar(M) {
  let k = 0; M.F.forEach((f, i) => { if (f.length > M.F[k].length) k = i; });
  const f = M.F[k], c = f.reduce((s, v) => s.map((x, i) => x + M.P[v][i] / f.length), [0, 0, 0]), nn = newell(M.P, f);
  const m = M.P.length, P = [...M.P, c.map((x, i) => x + nn[i] * 0.12)];
  const F = [...M.F.slice(0, k), ...f.map((v, i) => [v, f[(i + 1) % f.length], m]), ...M.F.slice(k + 1)];
  return { P, F };
}

export function EulerLab() {
  const [sid, setSid] = useState("cube");
  const [ops, setOps] = useState([]);
  const [yaw, setYaw] = useState(0.6);
  const [p, setP] = useState(5), [q, setQ] = useState(3);
  const hist = useMemo(() => {
    let M = makeSolid(sid); const h = [{ op: "初始", M, ...counts(M) }];
    for (const o of ops) { const N = o === "edge" ? opEdge(M) : o === "diag" ? opDiag(M) : opStar(M); if (!N) continue; M = N; h.push({ op: o, M, ...counts(M) }); }
    return h;
  }, [sid, ops]);
  const cur = hist[hist.length - 1], mesh = cur.M;
  const chi0 = hist[0].V - hist[0].E + hist[0].F, chi = cur.V - cur.E + cur.F;
  const canDiag = mesh.F.some(f => f.length > 3);
  // 投影
  const pitch = 0.45, W = 340, H = 300, S = 70;
  const proj = v => { const [x, y, z] = v; const x1 = x * Math.cos(yaw) - y * Math.sin(yaw), y1 = x * Math.sin(yaw) + y * Math.cos(yaw); const y2 = y1 * Math.cos(pitch) - z * Math.sin(pitch), z2 = y1 * Math.sin(pitch) + z * Math.cos(pitch); return [W / 2 + x1 * S, H / 2 - z2 * S, y2]; };
  const Q = mesh.P.map(proj);
  const order = mesh.F.map((f, i) => [i, f.reduce((s, v) => s + Q[v][2], 0) / f.length]).sort((a, b) => b[1] - a[1]);
  const OPN = { edge: R`棱上加点：$\Delta V=+1,\ \Delta E=+1$`, diag: R`面上加对角线：$\Delta E=+1,\ \Delta F=+1$`, star: R`面内加点连向各顶点（$n$ 边形）：$\Delta V=+1,\ \Delta E=+n,\ \Delta F=n-1$` };
  // 正多面体判别
  const den = 2 * p + 2 * q - p * q, ok = den > 0, E = ok ? (2 * p * q) / den : null, V = ok ? (2 * E) / q : null, F = ok ? (2 * E) / p : null;
  const PNAME = { "3,3": "正四面体", "4,3": "立方体（正六面体）", "3,4": "正八面体", "5,3": "正十二面体", "3,5": "正二十面体" };
  return (
    <RunCard title={R`交互图 4：Euler 示性数计算器——$\chi=V-E+F$ 与剖分无关`}
      lead={R`选一个多面体（顶点坐标给定，凸多面体的面由凸包算出），程序直接从面表中数出 $V$、$E$、$F$。再反复施加三种"初等细分"，记录每一步的变化——$\chi$ 始终不变，这是定理 2.4 的组合核心。拖动滑块旋转视角。`}>
      <div style={{ marginBottom: 6 }}>{SOLIDS.map(([id, nm]) => <button key={id} style={chip(sid === id)} onClick={() => { setSid(id); setOps([]); }}>{nm}</button>)}</div>
      <Row>
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%", ...card }}>
            {order.map(([i]) => { const f = mesh.F[i]; return <polygon key={i} points={f.map(v => Q[v].slice(0, 2).join(",")).join(" ")} fill="rgba(44,74,110,0.10)" stroke={BLUE} strokeWidth="1.2" strokeLinejoin="round" />; })}
            {Q.map((v, i) => <circle key={i} cx={v[0]} cy={v[1]} r={i >= hist[0].V ? 3.6 : 2.6} fill={i >= hist[0].V ? RED : INK} />)}
          </svg>
          <Slider label="旋转" value={yaw} min={0} max={6.28} step={0.02} onChange={setYaw} fmt={v => v.toFixed(2)} />
        </div>
        <div style={{ flex: "1 1 280px", minWidth: 260 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            <button onClick={() => setOps([...ops, "edge"])}>棱上加点</button>
            <button disabled={!canDiag} onClick={() => setOps([...ops, "diag"])}>面上加对角线</button>
            <button onClick={() => setOps([...ops, "star"])}>面内加点</button>
            <button onClick={() => setOps([])}>复原</button>
          </div>
          <div className="tb-table-wrap" style={{ maxHeight: 210, overflowY: "auto" }}><table className="tb-table">
            <thead><tr><th>操作</th><th><M>{"V"}</M></th><th><M>{"E"}</M></th><th><M>{"F"}</M></th><th><M>{R`\chi`}</M></th></tr></thead>
            <tbody>{hist.map((h, i) => <tr key={i}><td style={{ fontSize: 12 }}>{i === 0 ? "初始" : <TxI>{OPN[h.op]}</TxI>}</td><td>{h.V}</td><td>{h.E}</td><td>{h.F}</td><td><b>{h.V - h.E + h.F}</b></td></tr>)}</tbody>
          </table></div>
          <p><TxI>{`$\\chi=${cur.V}-${cur.E}+${cur.F}=${chi}$`}</TxI></p>
          <Check ok={chi === chi0} label={`${hist.length - 1} 次细分后 $\\chi$ 仍为 $${chi0}$`} />
        </div>
      </Row>
      <h4 style={{ margin: "14px 0 4px" }}>正多面体判别（章末习题 2.4）</h4>
      <Row>
        <div style={{ minWidth: 220 }}>
          <Slider label="$p$（每个面的边数）" value={p} min={3} max={8} onChange={setP} />
          <Slider label="$q$（每个顶点处的面数）" value={q} min={3} max={8} onChange={setQ} />
        </div>
        <div style={{ flex: "1 1 260px" }}>
          <p><TxI>{`$\\dfrac1p+\\dfrac1q-\\dfrac12=\\dfrac{2p+2q-pq}{2pq}=\\dfrac{${den}}{${2 * p * q}}$`}</TxI></p>
          {ok ? <p><TxI>{`$E=\\dfrac{2pq}{2p+2q-pq}=${E}$，$V=2E/q=${V}$，$F=2E/p=${F}$；$V-E+F=${V - E + F}$。`}</TxI> <b>{PNAME[`${p},${q}`]}</b></p>
            : <p><TxI>{R`$\dfrac1p+\dfrac1q\le\dfrac12$：不存在这样的凸多面体（等号对应平面镶嵌，小于号对应双曲平面镶嵌）。`}</TxI></p>}
          <Check ok={ok === Boolean(PNAME[`${p},${q}`])} label="与“只有五种”一致" />
        </div>
      </Row>
    </RunCard>);
}
