// 附录 A 可运行示例的纯计算部分（无 JSX；用 node 单独测试过）。
// 三种算法算同一个 per(B + U V^T)：
//   (a) 直接子集 DP；(b) 展开 F = ∏_b F_b 的系数表（= 引理 2.1 的 W(ν,ξ)），套 𝓛_r；(c) 网格求和 (A.5)，逐点累加。
import * as Q from "./_rat.js";

const { q, Q0, Q1, qadd, qmul, qint, fact, range, subsets, sub, permDP, permRyser, rng, peval, lagrange } = Q;

// ---------------- 示例实例 ----------------
// 对应块可以不是方的（行组、列组大小不同），只要总数都是 n。
export const BLOCK_SHAPES = {
  4: { rows: [2, 2], cols: [3, 1] },
  5: { rows: [2, 3], cols: [3, 2] },
  6: { rows: [2, 2, 2], cols: [3, 1, 2] },
};
function cut(sizes) { let s = 0; return sizes.map(k => { const g = range(k).map(i => s + i); s += k; return g; }); }

export function makeInstance(n, r, seed) {
  const R = rng(seed * 7919 + n * 31 + r);
  const ri = (lo, hi) => lo + Math.floor(R() * (hi - lo + 1));
  const shape = BLOCK_SHAPES[n];
  const rg = cut(shape.rows), cg = cut(shape.cols);
  const blocks = rg.map((rows, b) => ({ rows, cols: cg[b] }));
  const B = range(n).map(() => range(n).map(() => Q0));
  blocks.forEach(({ rows, cols }) => rows.forEach(i => cols.forEach(j => { let x = ri(-2, 3); if (x === 0) x = 1; B[i][j] = qint(x); })));
  const U = range(n).map(() => range(r).map(() => qint(ri(-2, 2))));
  const V = range(n).map(() => range(r).map(() => qint(ri(-2, 2))));
  const A = range(n).map(i => range(n).map(j => range(r).reduce((s, a) => qadd(s, qmul(U[i][a], V[j][a])), B[i][j])));
  const rowGroup = range(n).map(i => blocks.findIndex(bl => bl.rows.includes(i)));
  const colGroup = range(n).map(j => blocks.findIndex(bl => bl.cols.includes(j)));
  return { n, r, B, U, V, A, blocks, rowGroup, colGroup };
}

// 每块的 (S,T) 选择与 per(B[S,T])（|S|=|T|，per≠0 的才保留）
export function blockChoices(inst) {
  return inst.blocks.map(({ rows, cols }) => {
    const out = [];
    for (let a = 0; a <= Math.min(rows.length, cols.length); a++)
      for (const Si of subsets(rows.length, a)) for (const Ti of subsets(cols.length, a)) {
        const S = Si.map(i => rows[i]), T = Ti.map(j => cols[j]);
        const p = permRyser(sub(inst.B, S, T));
        if (p.n === 0n) continue;
        out.push({ S, T, per: p, restR: rows.filter(x => !S.includes(x)), restC: cols.filter(x => !T.includes(x)) });
      }
    return out;
  });
}

// ---------------- (b) 系数表：F 的多项式展开 ----------------
// 多项式 = Map("ν|ξ" → 有理数)，ν、ξ ∈ N^r。
const key = (nu, xi) => nu.join(",") + "|" + xi.join(",");
const unkey = k => k.split("|").map(s => s.split(",").map(Number));
function polyMul(P, Qp) {
  const out = new Map();
  for (const [k1, c1] of P) { const [n1, x1] = unkey(k1); for (const [k2, c2] of Qp) { const [n2, x2] = unkey(k2);
    const k = key(n1.map((v, i) => v + n2[i]), x1.map((v, i) => v + x2[i])); out.set(k, qadd(out.get(k) ?? Q0, qmul(c1, c2))); } }
  for (const [k, c] of out) if (c.n === 0n) out.delete(k);
  return out;
}
// 乘以一个线性型 Σ_a coef[a]·(z_a 或 w_a)
function mulLinear(P, coef, side) {
  const out = new Map();
  for (const [k, c] of P) { const [nu, xi] = unkey(k);
    coef.forEach((u, a) => { if (u.n === 0n) return; const v = side === "z" ? nu : xi; v[a]++; const kk = key(nu, xi); v[a]--; out.set(kk, qadd(out.get(kk) ?? Q0, qmul(c, u))); }); }
  for (const [k, c] of out) if (c.n === 0n) out.delete(k);
  return out;
}
export function coeffTable(inst, choices = blockChoices(inst)) {
  const { r, U, V } = inst, zero = Array(r).fill(0);
  let F = new Map([[key(zero, zero), Q1]]);
  const perBlock = [];
  for (const ch of choices) {
    let Fb = new Map();
    for (const { per, restR, restC } of ch) {
      let t = new Map([[key(zero, zero), per]]);
      for (const i of restR) t = mulLinear(t, U[i], "z");
      for (const j of restC) t = mulLinear(t, V[j], "w");
      for (const [k, c] of t) Fb.set(k, qadd(Fb.get(k) ?? Q0, c));
    }
    for (const [k, c] of Fb) if (c.n === 0n) Fb.delete(k);
    perBlock.push(Fb.size);
    F = polyMul(F, Fb);
  }
  return { F, perBlock };
}
// 𝓛_r：z^ν w^ξ ↦ ν! [ν=ξ]
export function applyL(F) {
  let s = Q0;
  for (const [k, c] of F) { const [nu, xi] = unkey(k); if (nu.join() !== xi.join()) continue; s = qadd(s, qmul(c, q(nu.reduce((p, x) => p * fact(x), 1n)))); }
  return s;
}
// 与引理 2.1 的颜色计数 DP（colorTable + 逐块卷积）独立地算出 W(ν,ξ)，用于核对"F 的系数 = W"
export function lemmaTable(inst, choices = blockChoices(inst)) {
  const { r, U, V } = inst, zero = Array(r).fill(0);
  let W = new Map([[key(zero, zero), Q1]]);
  for (const ch of choices) {
    const Wb = new Map();
    for (const { per, restR, restC } of ch) {
      const tl = Q.colorTable(restR.map(i => U[i]), r), tr = Q.colorTable(restC.map(j => V[j]), r);
      for (const [kl, vl] of tl) for (const [kr, vr] of tr) { const k = kl + "|" + kr; Wb.set(k, qadd(Wb.get(k) ?? Q0, qmul(per, qmul(vl, vr)))); }
    }
    W = polyMul(W, Wb);
  }
  for (const [k, c] of W) if (c.n === 0n) W.delete(k);
  return W;
}
export const sameTable = (P, W) => P.size === W.size && [...P].every(([k, c]) => { const d = W.get(k); return d && d.n === c.n && d.d === c.d; });

// ---------------- (c) 网格求和 (A.5) ----------------
// Lagrange 基系数 C[a][k] = [t^k]Λ_a(t)，节点 0..n
export function lagrangeCoeffs(n) {
  const xs = range(n + 1).map(qint);
  return range(n + 1).map(a => lagrange(xs, range(n + 1).map(c => (c === a ? Q1 : Q0))));
}
// κ_ab = Σ_k k! [t^k]Λ_a [t^k]Λ_b   (A.4)
export function kappa(n, C = lagrangeCoeffs(n)) {
  return range(n + 1).map(a => range(n + 1).map(b => range(n + 1).reduce((s, k) => qadd(s, qmul(q(fact(k)), qmul(C[a][k], C[b][k]))), Q0)));
}
// 在数值点 (z, w) 处求 F = ∏_b F_b（按 (A.1) 枚举 S,T；per(B[S,T]) 已用 Ryser 求好）
export function evalF(inst, choices, z, w) {
  const { U, V, r } = inst;
  const ui = U.map(row => range(r).reduce((s, a) => qadd(s, qmul(row[a], z[a])), Q0));
  const vj = V.map(row => range(r).reduce((s, a) => qadd(s, qmul(row[a], w[a])), Q0));
  let F = Q1;
  for (const ch of choices) {
    let Fb = Q0;
    for (const { per, restR, restC } of ch) {
      let t = per;
      for (const i of restR) t = qmul(t, ui[i]);
      for (const j of restC) t = qmul(t, vj[j]);
      Fb = qadd(Fb, t);
    }
    F = qmul(F, Fb);
    if (F.n === 0n) break;
  }
  return F;
}
// 逐点累加；返回每个网格点的 {a, b, wt, F, acc}（只为可视化而保留——算法本身只需要最后的 acc）
export function gridSum(inst, choices = blockChoices(inst), K = kappa(inst.n)) {
  const { n, r } = inst, N = (n + 1) ** (2 * r), terms = [];
  let acc = Q0;
  for (let idx = 0; idx < N; idx++) {
    const dig = []; let x = idx; for (let c = 0; c < 2 * r; c++) { dig.push(x % (n + 1)); x = Math.floor(x / (n + 1)); }
    const a = dig.slice(0, r), b = dig.slice(r);
    let wt = Q1; for (let c = 0; c < r; c++) wt = qmul(wt, K[a[c]][b[c]]);
    const F = evalF(inst, choices, a.map(qint), b.map(qint));
    acc = qadd(acc, qmul(wt, F));
    terms.push({ a, b, wt, F, acc });
  }
  return { value: acc, terms, N };
}

export function runAll(n, r, seed) {
  const inst = makeInstance(n, r, seed), choices = blockChoices(inst);
  const direct = permDP(inst.A);
  const { F, perBlock } = coeffTable(inst, choices);
  const viaTable = applyL(F);
  const W = lemmaTable(inst, choices);
  const lemma = Q.permBlockLowRank(inst.B, inst.U, inst.V, inst.blocks);
  const K = kappa(n);
  const grid = gridSum(inst, choices, K);
  return { inst, choices, direct, F, perBlock, viaTable, W, lemma, K, grid };
}

// ---------------- 单变量配对泛函 ----------------
export function randPoly(n, seed) { const R = rng(seed); return range(n + 1).map(() => qint(Math.floor(R() * 7) - 3)); }
export function pairingDemo(n, seed) {
  const C = lagrangeCoeffs(n), K = kappa(n, C);
  const f = randPoly(n, seed * 2 + 1), g = randPoly(n, seed * 2 + 2);
  const fv = range(n + 1).map(a => peval(f, qint(a))), gv = range(n + 1).map(b => peval(g, qint(b)));
  let lhs = Q0; for (let a = 0; a <= n; a++) for (let b = 0; b <= n; b++) lhs = qadd(lhs, qmul(K[a][b], qmul(fv[a], gv[b])));
  let rhs = Q0; for (let k = 0; k <= n; k++) rhs = qadd(rhs, qmul(q(fact(k)), qmul(f[k], g[k])));
  // 单项式检验：Σ κ_ab a^i b^j = i! [i=j]
  let monoOK = true;
  for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) {
    let s = Q0; for (let a = 0; a <= n; a++) for (let b = 0; b <= n; b++) s = qadd(s, qmul(K[a][b], qmul(Q.qpow(qint(a), i), Q.qpow(qint(b), j))));
    const want = i === j ? q(fact(i)) : Q0; if (s.n !== want.n || s.d !== want.d) monoOK = false;
  }
  return { C, K, f, g, fv, gv, lhs, rhs, monoOK };
}
