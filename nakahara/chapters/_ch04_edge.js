// 第 4 章的计算核心（纯函数，无 React）：多面体的边群 G(K;L)（§4.4.2 的“游戏规则”）、
// Tietze 消元化简群表示、交换化（Smith 标准形）与第 3 章整数同调 H_1 的对照。
// 词（word）用整数数组表示：+k 表示第 k 个生成元（从 1 起），−k 表示其逆。
import { smith, makeComplex, homology } from "./_ch03_homology.js";

const R = String.raw;
const key2 = (a, b) => (a < b ? a + "," + b : b + "," + a);

// ---------- 词的约化 ----------
export function freeReduce(w) {
  const out = [];
  for (const x of w) { if (out.length && out[out.length - 1] === -x) out.pop(); else out.push(x); }
  return out;
}
// 关系子是循环意义下的：去掉首尾相消的字母
export function cycReduce(w) {
  let r = freeReduce(w);
  while (r.length >= 2 && r[0] === -r[r.length - 1]) r = r.slice(1, -1);
  return r;
}
export const inv = w => [...w].reverse().map(x => -x);

// ---------- 由复形与子复形 L 读出生成元与关系（原书规则 (1)–(5)） ----------
// K = { verts: [顶点标号…], edges: [[a,b]…], tris: [[a,b,c]…] }（标号即原书图中的数字）
// Ledges：L 中的 1 单形；省略时自动取极大树（从 base 出发的宽度优先生成树，引理 4.3）。
export function maximalTree(K, base) {
  const adj = new Map(K.verts.map(v => [v, []]));
  for (const [a, b] of K.edges) { adj.get(a).push(b); adj.get(b).push(a); }
  for (const l of adj.values()) l.sort((x, y) => x - y);
  const seen = new Set([base]), tree = [], Q = [base];
  while (Q.length) { const v = Q.shift(); for (const u of adj.get(v)) if (!seen.has(u)) { seen.add(u); tree.push([v, u]); Q.push(u); } }
  return tree;
}
export function edgeGroup(K, Ledges) {
  const inL = new Set(Ledges.map(([a, b]) => key2(a, b)));
  const gens = K.edges.filter(([a, b]) => !inL.has(key2(a, b))).map(([a, b]) => (a < b ? [a, b] : [b, a]))
    .sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const gi = new Map(gens.map(([a, b], i) => [a + "," + b, i + 1]));
  const g = (a, b) => { const k = gi.get(key2(a, b)); if (!k) return []; return a < b ? [k] : [-k]; };   // L 中的棱 → 空词（=1）
  const rels = K.tris.map(t => {
    const [i, j, k] = [...t].sort((x, y) => x - y);
    return { tri: [i, j, k], lhs: [[i, j], [j, k]], rhs: [i, k], word: [...g(i, j), ...g(j, k), ...inv(g(i, k))] };
  }).filter(r => !(inL.has(key2(r.tri[0], r.tri[1])) && inL.has(key2(r.tri[1], r.tri[2])) && inL.has(key2(r.tri[0], r.tri[2]))));   // L 中的三角形不给关系
  return { gens, rels, inL };
}

// ---------- Tietze 化简 ----------
// keep：尽量保留的生成元编号（如原书取 x = g02、y = g04）。返回化简后的生成元、关系子与消元记录。
export function simplify(nGen, relators, keep = []) {
  let rels = relators.map(r => cycReduce(r)).filter(r => r.length);
  const alive = new Set(Array.from({ length: nGen }, (_, i) => i + 1));
  const log = [];
  const subst = (w, k, expr) => freeReduce(w.flatMap(x => (x === k ? expr : x === -k ? inv(expr) : [x])));
  for (let guard = 0; guard < 500; guard++) {
    // 选一个“某生成元恰好出现一次”的关系子：先挑最短的；生成元优先挑不在 keep 中的
    let best = null;
    rels.forEach((r, ri) => {
      const cnt = new Map(); for (const x of r) cnt.set(Math.abs(x), (cnt.get(Math.abs(x)) || 0) + 1);
      for (const [k, c] of cnt) if (c === 1) {
        const score = r.length * 10 + (keep.includes(k) ? 5 : 0);
        if (!best || score < best.score) best = { ri, k, score };
      }
    });
    if (!best) break;
    const r = rels[best.ri], k = best.k, p = r.findIndex(x => Math.abs(x) === k);
    // r = A·g^{±1}·B = 1  ⇒  g^{±1} = A^{-1} B^{-1}
    const A = r.slice(0, p), B = r.slice(p + 1);
    let expr = freeReduce([...inv(A), ...inv(B)]);
    if (r[p] < 0) expr = inv(expr);
    log.push({ k, expr });
    rels = rels.filter((_, i) => i !== best.ri).map(w => cycReduce(subst(w, k, expr))).filter(w => w.length);
    alive.delete(k);
  }
  // 关系子去重（循环置换与取逆视为相同）
  const canon = w => { const all = []; for (const v of [w, inv(w)]) for (let s = 0; s < v.length; s++) all.push([...v.slice(s), ...v.slice(0, s)].join(" ")); return all.sort()[0]; };
  const seen = new Set(); rels = rels.filter(w => { const c = canon(w); if (seen.has(c)) return false; seen.add(c); return true; });
  // 显示用：把每个关系子循环轮换到以编号最小的正生成元开头
  rels = rels.map(w => { let b = 0; w.forEach((x, i) => { if (x > 0 && (w[b] < 0 || x < w[b])) b = i; }); return [...w.slice(b), ...w.slice(0, b)]; });
  return { gens: [...alive].sort((a, b) => a - b), rels, log };
}
// 消元记录 → 每个被消去的生成元用存活生成元表示（逐个回代）
export function expressAll(log) {
  const val = new Map();
  for (let i = log.length - 1; i >= 0; i--) {
    const { k, expr } = log[i];
    val.set(k, freeReduce(expr.flatMap(x => { const a = Math.abs(x); if (!val.has(a)) return [x]; return x > 0 ? val.get(a) : inv(val.get(a)); })));
  }
  return val;
}

// ---------- 交换化：关系矩阵的 Smith 标准形 ----------
// G/F 由同一组生成元生成，关系 = 原关系 + 所有交换子；在加法记号下即整数矩阵（每行：一个关系子中各生成元的指数和）
export function abelianize(gens, rels) {
  const n = gens.length, col = new Map(gens.map((k, i) => [k, i]));
  if (!n) return { free: 0, torsion: [] };
  const rows = rels.map(w => { const r = Array(n).fill(0n); for (const x of w) r[col.get(Math.abs(x))] += x > 0 ? 1n : -1n; return r; });
  const { D } = smith(rows.length ? rows : [Array(n).fill(0n)]);
  return { free: n - D.length, torsion: D.filter(d => d > 1n).map(Number), matrix: rows };
}
// 第 3 章算法：同一个复形的整数同调 H_1
export function H1(K) {
  const idx = new Map(K.verts.map((v, i) => [v, i]));
  const used = new Set(K.tris.flatMap(t => [key2(t[0], t[1]), key2(t[1], t[2]), key2(t[0], t[2])]));
  const facets = [...K.tris.map(t => t.map(v => idx.get(v))), ...K.edges.filter(([a, b]) => !used.has(key2(a, b))).map(e => e.map(v => idx.get(v)))];
  const C = makeComplex(facets.length ? facets : [[0]]);
  const h = homology(C).H;
  const h1 = h[1] || { free: 0, torsion: [] };
  return { free: h1.free, torsion: h1.torsion, I: h.map(x => x.I) };
}

// ---------- 原书中的复形（顶点标号与图 4.11、4.12、4.14、4.15、3.8 一致） ----------
const gridTris = lab => { const T = []; for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { const TL = lab[y][x], TR = lab[y][x + 1], BL = lab[y + 1][x], BR = lab[y + 1][x + 1]; T.push([TL, BL, TR], [BL, BR, TR]); } return T; };
export function fromTris(tris, extraEdges = []) {
  const E = new Map();
  for (const t of tris) for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[0], t[2]]]) E.set(key2(a, b), a < b ? [a, b] : [b, a]);
  for (const [a, b] of extraEdges) E.set(key2(a, b), a < b ? [a, b] : [b, a]);
  const verts = [...new Set([...E.values()].flat())].sort((a, b) => a - b);
  return { verts, edges: [...E.values()].sort((p, q) => p[0] - q[0] || p[1] - q[1]), tris };
}
const TORUS_LAB = [[0, 1, 2, 0], [3, 5, 7, 3], [4, 6, 8, 4], [0, 1, 2, 0]];
const KLEIN_LAB = [[0, 1, 2, 0], [3, 5, 7, 3], [4, 6, 8, 4], [0, 2, 1, 0]];
// 图 4.12 / 4.14 中的阴影区 L：左上 2×2 个方格（9 个顶点、16 条棱、8 个三角形）
const BLOCK = [[0, 1, 2], [3, 5, 7], [4, 6, 8]];
const blockEdges = () => { const E = []; for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { if (x < 2) E.push([BLOCK[y][x], BLOCK[y][x + 1]]); if (y < 2) E.push([BLOCK[y][x], BLOCK[y + 1][x]]); if (x < 2 && y < 2) E.push([BLOCK[y + 1][x], BLOCK[y][x + 1]]); } return E; };
const MOB = [[0, 1, 2], [2, 1, 4], [2, 4, 3], [3, 4, 5], [3, 5, 1], [1, 5, 0]];   // 图 3.8（与第 3 章同一剖分）
const RP2 = [[1, 3, 4], [2, 3, 4], [1, 4, 5], [2, 4, 6], [4, 5, 6], [1, 2, 6], [1, 3, 6], [3, 5, 6], [2, 3, 5], [1, 2, 5]];

export const BOOK = [
  { id: "circle", label: R`$S^1$`, src: "例 4.6", K: fromTris([], [[1, 2], [1, 3], [2, 3]]), L: [[1, 2], [1, 3]], base: 1, keep: [], expect: R`(g_{23};\emptyset)\cong\mathbb{Z}` },
  { id: "bouquet", label: R`3-花束`, src: R`例 4.7，图 4.11`, K: fromTris([], [[0, 1], [0, 2], [1, 2], [0, 3], [0, 4], [3, 4], [0, 5], [0, 6], [5, 6]]), L: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]], base: 0, keep: [], expect: R`(x,y,z;\emptyset)`, vname: v => (v ? `v_${v}` : "v") },
  { id: "disc", label: R`圆盘 $D^2$`, src: "例 4.8", K: fromTris([[0, 1, 2]]), L: null, base: 0, keep: [], expect: R`\{e\}` },
  { id: "S2", label: R`$S^2$（四面体表面）`, src: R`例 4.5，式 (4.22)`, K: fromTris([[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]), L: null, base: 0, keep: [], expect: R`\{e\}` },
  { id: "torus", label: R`环面 $T^2$`, src: R`例 4.9，图 4.12`, K: fromTris(gridTris(TORUS_LAB)), L: blockEdges(), base: 0, keep: [[0, 2], [0, 4]], expect: R`(x,y;xyx^{-1}y^{-1})\cong\mathbb{Z}\oplus\mathbb{Z}` },
  { id: "klein", label: R`Klein 瓶`, src: R`习题 4.4，图 4.14`, K: fromTris(gridTris(KLEIN_LAB)), L: blockEdges(), base: 0, keep: [[0, 2], [0, 4]], expect: R`(x,y;xyxy^{-1})` },
  { id: "rp2", label: R`射影平面 $\RP^2$`, src: R`例 4.10，图 4.15`, K: fromTris(RP2), L: [[1, 3], [1, 4], [3, 4], [1, 5], [4, 5], [4, 6], [5, 6], [1, 2], [2, 5]], base: 1, keep: [[2, 3]], expect: R`(x;x^2)\cong\mathbb{Z}_2` },
  { id: "mobius", label: R`Möbius 带`, src: R`习题 4.5，图 3.8`, K: fromTris(MOB), L: null, base: 0, keep: [], expect: R`\mathbb{Z}`, vname: v => `p_${v}` },
];
// 一次完整计算（供交互图与 node 自检使用）
export function run(item, useBookL = true) {
  const K = item.K;
  const L = useBookL && item.L ? item.L : maximalTree(K, item.base);
  const E = edgeGroup(K, L);
  const keepIdx = (item.keep || []).map(([a, b]) => E.gens.findIndex(([p, q]) => p === Math.min(a, b) && q === Math.max(a, b)) + 1).filter(k => k > 0);
  const S = simplify(E.gens.length, E.rels.map(r => r.word), keepIdx);
  const ab = abelianize(S.gens, S.rels);
  const h = H1(K);
  return { L, E, S, ab, h, keepIdx, expr: expressAll(S.log) };
}
