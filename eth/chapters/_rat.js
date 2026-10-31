// 精确算术与积和式算法（浏览器内可运行的小规模验证共用）。
// 有理数用 BigInt 分数；所有积和式算法对"环"参数化（有理数环 RQ，或截断多项式环 RT(h) = Q[z]/(z^h)），
// 这样同一份代码既能算数值积和式，也能算论文 (3.1) 里的 per(Δ(z)[S,T]) 系数。

// ---------------- 有理数 ----------------
const babs = x => (x < 0n ? -x : x);
function bgcd(a, b) { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; }
export function q(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error("division by zero");
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
export const Q0 = q(0), Q1 = q(1);
export const qadd = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
export const qsub = (a, b) => q(a.n * b.d - b.n * a.d, a.d * b.d);
export const qmul = (a, b) => q(a.n * b.n, a.d * b.d);
export const qdiv = (a, b) => q(a.n * b.d, a.d * b.n);
export const qneg = a => q(-a.n, a.d);
export const qeq = (a, b) => a.n === b.n && a.d === b.d;
export const qzero = a => a.n === 0n;
export const qnum = a => Number(a.n) / Number(a.d);
export const qstr = a => (a.d === 1n ? String(a.n) : `${a.n}/${a.d}`);
export const qtex = a => (a.d === 1n ? String(a.n) : `${a.n < 0n ? "-" : ""}\\tfrac{${babs(a.n)}}{${a.d}}`);
export const qint = k => q(BigInt(k));

// ---------------- 环 ----------------
export const RQ = { zero: Q0, one: Q1, add: qadd, sub: qsub, mul: qmul, isZero: qzero, scale: (k, a) => qmul(qint(k), a) };
// 截断多项式环 Q[z]/(z^h)：元素是长度 h 的系数数组（低次在前）
export function RT(h) {
  const Z = Array(h).fill(Q0);
  return {
    h, zero: Z, one: [Q1, ...Z.slice(1)],
    add: (a, b) => a.map((x, i) => qadd(x, b[i])),
    sub: (a, b) => a.map((x, i) => qsub(x, b[i])),
    mul: (a, b) => { const c = Z.slice(); for (let i = 0; i < h; i++) if (!qzero(a[i])) for (let j = 0; i + j < h; j++) if (!qzero(b[j])) c[i + j] = qadd(c[i + j], qmul(a[i], b[j])); return c; },
    isZero: a => a.every(qzero),
    scale: (k, a) => a.map(x => qmul(qint(k), x)),
    of: arr => { const c = Z.slice(); arr.slice(0, h).forEach((x, i) => (c[i] = x)); return c; },
  };
}

// ---------------- 矩阵工具 ----------------
export const sub = (A, rows, cols) => rows.map(r => cols.map(c => A[r][c]));
export const range = n => Array.from({ length: n }, (_, i) => i);
export const complement = (S, n) => range(n).filter(i => !S.includes(i));
export function* subsets(n, k) {           // [n] 的所有 k 元子集（字典序）
  const s = range(k);
  if (k > n) return;
  while (true) {
    yield s.slice();
    let i = k - 1; while (i >= 0 && s[i] === n - k + i) i--;
    if (i < 0) return;
    s[i]++; for (let j = i + 1; j < k; j++) s[j] = s[j - 1] + 1;
  }
}
export const fact = k => { let f = 1n; for (let i = 2n; i <= BigInt(k); i++) f *= i; return f; };
export const binom = (n, k) => (k < 0 || k > n ? 0n : fact(n) / (fact(k) * fact(n - k)));

// ---------------- 积和式算法 ----------------
// 定义式：对所有排列求和（n ≤ 8）
export function permBrute(A, R = RQ) {
  const n = A.length; if (!n) return R.one;
  let tot = R.zero; const used = Array(n).fill(false);
  const go = (u, acc) => {
    if (u === n) { tot = R.add(tot, acc); return; }
    for (let v = 0; v < n; v++) if (!used[v] && !R.isZero(A[u][v])) { used[v] = true; go(u + 1, R.mul(acc, A[u][v])); used[v] = false; }
  };
  go(0, R.one); return tot;
}
// Ryser 容斥公式 (2.1)
export function permRyser(A, R = RQ) {
  const n = A.length; if (!n) return R.one;
  let tot = R.zero;
  for (let mask = 1; mask < 1 << n; mask++) {
    let prod = R.one, sz = 0;
    for (let v = 0; v < n; v++) if (mask >> v & 1) sz++;
    for (let u = 0; u < n && !R.isZero(prod); u++) {
      let s = R.zero; for (let v = 0; v < n; v++) if (mask >> v & 1) s = R.add(s, A[u][v]);
      prod = R.mul(prod, s);
    }
    tot = (n - sz) % 2 ? R.sub(tot, prod) : R.add(tot, prod);
  }
  return tot;
}
// 子集动态规划：逐行处理，记录已用列集合，O(n 2^n)
export function permDP(A, R = RQ) {
  const n = A.length; if (!n) return R.one;
  let f = new Map([[0, R.one]]);
  for (let u = 0; u < n; u++) {
    const g = new Map();
    for (const [m, val] of f) for (let v = 0; v < n; v++) if (!(m >> v & 1) && !R.isZero(A[u][v])) {
      const k = m | 1 << v; g.set(k, R.add(g.get(k) ?? R.zero, R.mul(val, A[u][v])));
    }
    f = g;
  }
  return f.get((1 << n) - 1) ?? R.zero;
}
// 加法公式 (2.2)：per(B+C) = Σ_{|S|=|T|} per(B[S^c,T^c]) per(C[S,T])；返回 {value, terms}
export function permAddition(B, C, R = RQ, perm = permDP) {
  const n = B.length; let tot = R.zero; const terms = [];
  for (let a = 0; a <= n; a++) for (const S of subsets(n, a)) for (const T of subsets(n, a)) {
    const pc = perm(sub(C, S, T), R); if (R.isZero(pc)) continue;
    const pb = perm(sub(B, complement(S, n), complement(T, n)), R);
    const t = R.mul(pb, pc); tot = R.add(tot, t); terms.push({ S, T, pb, pc });
  }
  return { value: tot, terms };
}
// 低秩颜色计数 DP (2.5)：E = U V^T（U, V 为 n×r），per(E) = Σ_{|ν|=n} ν! D_L(n,ν) D_R(n,ν)
export function colorTable(U, r, R = RQ) {   // 返回 Map(ν 的字符串 → 总权重)，ν 为 r 维颜色计数
  let f = new Map([[Array(r).fill(0).join(","), R.one]]);
  for (const row of U) {
    const g = new Map();
    for (const [key, val] of f) {
      const nu = key.split(",").map(Number);
      for (let a = 0; a < r; a++) { if (R.isZero(row[a])) continue; nu[a]++; const k = nu.join(","); nu[a]--; g.set(k, R.add(g.get(k) ?? R.zero, R.mul(val, row[a]))); }
    }
    f = g;
  }
  return f;
}
export function permLowRank(U, V, R = RQ) {
  const r = U[0]?.length ?? 0; if (!U.length) return { value: R.one, states: 1 };
  const L = colorTable(U, r, R), Rt = colorTable(V, r, R);
  let tot = R.zero;
  for (const [k, a] of L) { const b = Rt.get(k); if (!b) continue; const nf = k.split(",").reduce((s, x) => s * fact(+x), 1n); tot = R.add(tot, R.scale(nf, R.mul(a, b))); }
  return { value: tot, states: L.size + Rt.size };
}
// 引理 2.1 的算法：A = B + U V^T，B 的行/列按 blocks=[{rows:[…], cols:[…]}] 分块（块外为 0）。
// 每块枚举 S⊆I_a、T⊆J_a（|S|=|T|）由 B 匹配，其余端点着色；逐块卷积 (ν,ξ) 表，最后 Σ ν! W(ν,ν) —— 式 (2.6)。
export function permBlockLowRank(B, U, V, blocks, R = RQ) {
  const r = U[0]?.length ?? 0;
  const key = (nu, xi) => nu.join(",") + "|" + xi.join(",");
  let W = new Map([[key(Array(r).fill(0), Array(r).fill(0)), R.one]]);
  let choices = 0;
  for (const { rows, cols } of blocks) {
    const Wa = new Map();
    for (let a = 0; a <= Math.min(rows.length, cols.length); a++) for (const Si of subsets(rows.length, a)) for (const Ti of subsets(cols.length, a)) {
      const S = Si.map(i => rows[i]), T = Ti.map(i => cols[i]);
      const pb = permDP(sub(B, S, T), R); if (R.isZero(pb)) continue;
      choices++;
      const restR = rows.filter(x => !S.includes(x)), restC = cols.filter(x => !T.includes(x));
      const tl = r ? colorTable(restR.map(i => U[i]), r, R) : new Map([["", restR.length ? R.zero : R.one]]);
      const tr = r ? colorTable(restC.map(j => V[j]), r, R) : new Map([["", restC.length ? R.zero : R.one]]);
      for (const [kl, vl] of tl) for (const [kr, vr] of tr) {
        const k = kl + "|" + kr; Wa.set(k, R.add(Wa.get(k) ?? R.zero, R.mul(pb, R.mul(vl, vr))));
      }
    }
    const NW = new Map();     // 卷积：颜色计数向量相加
    for (const [k1, v1] of W) for (const [k2, v2] of Wa) {
      const [a1, b1] = k1.split("|").map(s => (s ? s.split(",").map(Number) : [])), [a2, b2] = k2.split("|").map(s => (s ? s.split(",").map(Number) : []));
      const k = key(a1.map((x, i) => x + a2[i]), b1.map((x, i) => x + b2[i]));
      NW.set(k, R.add(NW.get(k) ?? R.zero, R.mul(v1, v2)));
    }
    W = NW;
  }
  let tot = R.zero;
  for (const [k, v] of W) { const [nu, xi] = k.split("|"); if (nu !== xi) continue; const nf = nu ? nu.split(",").reduce((s, x) => s * fact(+x), 1n) : 1n; tot = R.add(tot, R.scale(nf, v)); }
  return { value: tot, tableSize: W.size, choices };
}

// ---------------- 线性代数 ----------------
export function rank(A) {                    // 有理数矩阵的秩（高斯消元）
  const M = A.map(r => r.slice()); let rk = 0; const m = M.length, n = M[0]?.length ?? 0;
  for (let c = 0; c < n && rk < m; c++) {
    let p = rk; while (p < m && qzero(M[p][c])) p++;
    if (p === m) continue;
    [M[rk], M[p]] = [M[p], M[rk]];
    for (let i = rk + 1; i < m; i++) if (!qzero(M[i][c])) { const f = qdiv(M[i][c], M[rk][c]); for (let j = c; j < n; j++) M[i][j] = qsub(M[i][j], qmul(f, M[rk][j])); }
    rk++;
  }
  return rk;
}
export function solve(A, b) {                // 解方阵线性方程组 A x = b（有理数，A 可逆）
  const n = A.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; while (p < n && qzero(M[p][c])) p++;
    if (p === n) throw new Error("singular");
    [M[c], M[p]] = [M[p], M[c]];
    const inv = qdiv(Q1, M[c][c]); for (let j = c; j <= n; j++) M[c][j] = qmul(M[c][j], inv);
    for (let i = 0; i < n; i++) if (i !== c && !qzero(M[i][c])) { const f = M[i][c]; for (let j = c; j <= n; j++) M[i][j] = qsub(M[i][j], qmul(f, M[c][j])); }
  }
  return M.map(r => r[n]);
}
export const matmul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => (qzero(x) ? s : qadd(s, qmul(x, B[k][j]))), Q0)));
export const matadd = (A, B) => A.map((r, i) => r.map((x, j) => qadd(x, B[i][j])));
export const matsub = (A, B) => A.map((r, i) => r.map((x, j) => qsub(x, B[i][j])));
export const matscale = (k, A) => A.map(r => r.map(x => qmul(k, x)));
export const eye = n => range(n).map(i => range(n).map(j => (i === j ? Q1 : Q0)));
export const zeros = (m, n = m) => range(m).map(() => Array(n).fill(Q0));
export function kron(A, B) {
  const m = A.length, n = A[0].length, p = B.length, s = B[0].length;
  return range(m * p).map(i => range(n * s).map(j => qmul(A[Math.floor(i / p)][Math.floor(j / s)], B[i % p][j % s])));
}

// ---------------- 多项式 ----------------
export const peval = (c, x) => c.reduceRight((s, a) => qadd(qmul(s, x), a), Q0);   // c 为系数（低次在前）
export function lagrange(xs, ys) {           // 过 (xs[i], ys[i]) 的插值多项式系数
  const n = xs.length; let res = Array(n).fill(Q0);
  for (let i = 0; i < n; i++) {
    let basis = [Q1], den = Q1;
    for (let j = 0; j < n; j++) if (j !== i) {
      basis = [...basis.map((_, k) => qsub(k ? basis[k - 1] : Q0, qmul(xs[j], basis[k]))), basis[basis.length - 1]];
      den = qmul(den, qsub(xs[i], xs[j]));
    }
    res = res.map((r, k) => qadd(r, qmul(qdiv(ys[i], den), basis[k] ?? Q0)));
  }
  return res;
}
// Hermite 插值：pts=[{x, ders:[P(x), P'(x), …, P^{(h-1)}(x)]}]，返回次数 < Σh 的多项式系数
export function hermite(pts) {
  const N = pts.reduce((s, p) => s + p.ders.length, 0), rows = [], rhs = [];
  for (const { x, ders } of pts) ders.forEach((val, j) => {
    // 第 j 阶导数在 x 处：Σ_k c_k k!/(k-j)! x^{k-j}
    rows.push(range(N).map(k => (k < j ? Q0 : qmul(q(fact(k) / fact(k - j)), qpow(x, k - j)))));
    rhs.push(val);
  });
  return solve(rows, rhs);
}
export function qpow(x, k) { let r = Q1; for (let i = 0; i < k; i++) r = qmul(r, x); return r; }

// ---------------- 伪随机（可复现的示例）----------------
export function rng(seed = 1) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
