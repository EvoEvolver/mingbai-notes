// 第 2 节可运行示例用到的纯函数（不含 JSX，可在 node 中单独测试）。
// 积和式算法本身来自共享库 _rat.js；这里只加：运算计数环、Gray 码 Ryser、随机实例生成、分块生成、对数组合数。
import * as Q from "./_rat.js";

// 带计数的有理数环：把 RQ 的 add/sub/mul 包一层计数器，用来"数"各算法实际做了多少次算术运算
export function countingRing() {
  const c = { add: 0, mul: 0 };
  const R = {
    ...Q.RQ,
    add: (a, b) => { c.add++; return Q.qadd(a, b); },
    sub: (a, b) => { c.add++; return Q.qsub(a, b); },
    mul: (a, b) => { c.mul++; return Q.qmul(a, b); },
    scale: (k, a) => { c.mul++; return Q.qmul(Q.qint(k), a); },
  };
  return { R, c };
}

// Ryser 公式按 Gray 码顺序枚举列子集 S：相邻两个 S 只差一列，n 个行和各更新一次 → 每个 S 花 O(n)，总计 O(n 2^n)
export function permRyserGray(A, R = Q.RQ) {
  const n = A.length; if (!n) return R.one;
  const rs = Array(n).fill(R.zero);           // rs[u] = Σ_{v∈S} A_{uv}
  let tot = R.zero, prev = 0, sz = 0;
  for (let k = 1; k < 1 << n; k++) {
    const g = k ^ (k >> 1), v = 31 - Math.clz32(g ^ prev), add = (g >> v) & 1;
    for (let u = 0; u < n; u++) if (!R.isZero(A[u][v])) rs[u] = add ? R.add(rs[u], A[u][v]) : R.sub(rs[u], A[u][v]);
    sz += add ? 1 : -1; prev = g;
    let prod = R.one;
    for (let u = 0; u < n && !R.isZero(prod); u++) prod = R.mul(prod, rs[u]);
    if (R.isZero(prod)) continue;
    tot = (n - sz) % 2 ? R.sub(tot, prod) : R.add(tot, prod);
  }
  return tot;
}

// 随机整数（含/不含 0、可正可负）
export const pick = (rnd, xs) => xs[Math.floor(rnd() * xs.length)];
export function randMatrix(n, m, rnd, density = 1, vals = [-3, -2, -1, 1, 2, 3]) {
  return Q.range(n).map(() => Q.range(m).map(() => (rnd() < density ? Q.qint(pick(rnd, vals)) : Q.Q0)));
}

// 随机"对应对角块"：b 个行组、b 个列组，每组大小在 [1, s]（行组与列组大小可以不同）
function composition(n, b, s, rnd) {          // 把 n 拆成 b 个 [1,s] 中的整数（假定 b ≤ n ≤ b s）
  const parts = Array(b).fill(1); let left = n - b;
  while (left > 0) { const i = Math.floor(rnd() * b); if (parts[i] < s) { parts[i]++; left--; } }
  return parts;
}
export function randBlocks(n, s, rnd) {
  const bmin = Math.ceil(n / s);
  const b = bmin + Math.floor(rnd() * (Math.min(n, bmin + 2) - bmin + 1));
  const rp = composition(n, b, s, rnd), cp = composition(n, b, s, rnd);
  const blocks = []; let r0 = 0, c0 = 0;
  for (let a = 0; a < b; a++) { blocks.push({ rows: Q.range(rp[a]).map(i => r0 + i), cols: Q.range(cp[a]).map(j => c0 + j) }); r0 += rp[a]; c0 += cp[a]; }
  return blocks;
}
// 块内随机填数、块外为 0
export function blockMatrix(n, blocks, rnd, density = 0.8) {
  const B = Q.zeros(n);
  for (const { rows, cols } of blocks) for (const i of rows) for (const j of cols) if (rnd() < density) B[i][j] = Q.qint(pick(rnd, [-2, -1, 1, 2, 3]));
  return B;
}
// 删行列后的块划分：每块与保留的行列取交，并重新编号
export function restrictBlocks(blocks, keepR, keepC) {
  const ri = new Map(keepR.map((x, i) => [x, i])), ci = new Map(keepC.map((x, i) => [x, i]));
  return blocks.map(({ rows, cols }) => ({ rows: rows.filter(x => ri.has(x)).map(x => ri.get(x)), cols: cols.filter(x => ci.has(x)).map(x => ci.get(x)) }));
}
export function randSubset(n, k, rnd) {
  const a = Q.range(n);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, k).sort((x, y) => x - y);
}

// 低秩颜色 DP，逐层记录状态数（与 _rat.js 的 colorTable 相同，但返回每层的表）
export function colorLayers(U, r, R = Q.RQ) {
  let f = new Map([[Array(r).fill(0).join(","), R.one]]); const layers = [f];
  for (const row of U) {
    const g = new Map();
    for (const [key, val] of f) {
      const nu = key.split(",").map(Number);
      for (let a = 0; a < r; a++) { if (R.isZero(row[a])) continue; nu[a]++; const k = nu.join(","); nu[a]--; g.set(k, R.add(g.get(k) ?? R.zero, R.mul(val, row[a]))); }
    }
    f = g; layers.push(f);
  }
  return layers;
}
export const nuFact = key => key.split(",").reduce((s, x) => s * Q.fact(+x), 1n);

// 对数 Γ（Lanczos），用于连续 n 上的 log2 C(n+r, r)
const LG = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
export function lgamma(x) {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
  x -= 1; let a = 0.99999999999980993; const t = x + 7.5;
  LG.forEach((c, i) => (a += c / (x + i + 1)));
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
export const log2binom = (n, k) => (lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)) / Math.LN2;
