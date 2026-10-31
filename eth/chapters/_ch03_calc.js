// 第 3 页示例共用的精确计算（纯函数，可在 node 中单独测试）。
// 矩阵多项式 A(t) = G0 + t G1 + t^2 G2（d = 2，稀疏随机整数），在 t0 处：
//   · derivBy31：按 (3.1) 用"大子矩阵积和式 × 小 Δ(z) 积和式（在 Q[z]/(z^h) 上）"求 P(t0),…,P^{(h-1)}(t0)；
//   · derivDirect：在 Q[z]/(z^{nd+1}) 上直接求 per(A(t0+z))，得到全部 Taylor 系数（对照用）。
import * as Q from "./_rat.js";

const { q, qint, qmul, qadd, Q0, RQ, RT, sub, complement, subsets, permDP, permRyser, fact, binom, range } = Q;

// 可复现的稀疏随机整数矩阵多项式：每行每列大约 density 比例的非零元，取值 {−2,…,2}\{0}
export function randomMatrixPoly(n, seed, d = 2, density = 0.45) {
  const rnd = Q.rng(seed * 7919 + n * 104729 + 17);
  const val = () => { const v = Math.floor(rnd() * 4) - 2; return qint(v >= 0 ? v + 1 : v); };   // −2,−1,1,2
  return range(d + 1).map(k => range(n).map(() => range(n).map(() => (rnd() < (k === 0 ? 0.7 : density) ? val() : Q0))));
}

// A(t0+z) 的每个元素按 z 展开：返回 n×n 数组，元素为长度 d+1 的系数表 [c0, c1, …, cd]（c0 即 A0 的元素）
export function taylorEntries(G, t0) {
  const d = G.length - 1, n = G[0].length, T0 = qint(t0);
  // (t0+z)^k = Σ_m C(k,m) t0^{k-m} z^m
  return range(n).map(u => range(n).map(v => range(d + 1).map(m => {
    let s = Q0;
    for (let k = m; k <= d; k++) s = qadd(s, qmul(qmul(q(binom(k, m)), Q.qpow(T0, k - m)), G[k][u][v]));
    return s;
  })));
}
export const A0of = E => E.map(r => r.map(c => c[0]));

// 按 (3.1)：P^{(j)}(t0) = j! Σ_{a≤j} Σ_{|S|=|T|=a} per(A0[S^c,T^c]) [z^j] per(Δ(z)[S,T])，j < h
// 返回 { ders: [P(t0),…,P^{(h-1)}(t0)], contrib[j][a]（第 a 层对 P^{(j)} 的贡献）, pairs, nonzero, bigCalls }
export function derivBy31(E, h) {
  const n = E.length, Rh = RT(h), A0 = A0of(E);
  const Dz = E.map(r => r.map(c => Rh.of([Q0, ...c.slice(1)])));           // Δ(z) mod z^h：常数项为 0
  const contrib = range(h).map(() => Array(Math.min(h, n + 1)).fill(Q0));
  let pairs = 0, nonzero = 0;
  for (let a = 0; a < h && a <= n; a++) for (const S of subsets(n, a)) for (const T of subsets(n, a)) {
    pairs++;
    const small = permRyser(sub(Dz, S, T), Rh);                             // a×a，在 Q[z]/(z^h) 上
    if (Rh.isZero(small)) continue;
    nonzero++;
    const big = permDP(sub(A0, complement(S, n), complement(T, n)));         // (n−a)×(n−a)，"每个方子矩阵"预言机
    for (let j = a; j < h; j++) if (!Q.qzero(small[j])) contrib[j][a] = qadd(contrib[j][a], qmul(q(fact(j)), qmul(big, small[j])));
  }
  const ders = contrib.map(row => row.reduce(qadd, Q0));
  return { ders, contrib, pairs, nonzero };
}

// 直接法：在 Q[z]/(z^{N}) 上求 per(A(t0+z))，N = nd+1 足以容纳全部系数；返回 P^{(j)}(t0) = j!·[z^j]，j = 0..N−1
export function derivDirect(E) {
  const n = E.length, d = E[0][0].length - 1, N = n * d + 1, RN = RT(N);
  const c = permDP(E.map(r => r.map(x => RN.of(x))), RN);
  return c.map((x, j) => qmul(q(fact(j)), x));
}

// (S,T) 对数：Σ_{a<h} C(n,a)²（BigInt）
export const pairCount = (n, h) => range(Math.min(h, n + 1)).reduce((s, a) => s + binom(n, a) ** 2n, 0n);

// Hermite 系统的系数矩阵（合流 Vandermonde）：行 = (点 x_i, 阶 j)，列 = 系数 c_k，k < N
export function confluentVandermonde(xs, h) {
  const N = xs.length * h, rows = [];
  for (const x of xs) for (let j = 0; j < h; j++)
    rows.push(range(N).map(k => (k < j ? Q0 : qmul(q(fact(k) / fact(k - j)), Q.qpow(qint(x), k - j)))));
  return rows;
}

// log₂ Σ_{a<h} C(n,a)² 对所有 h = 1..H 的前缀（浮点，log-sum-exp），供曲线图用
const cache = new Map();
export function logPairPrefix(n, H = Math.floor(n / 2)) {
  const key = n + ":" + H; if (cache.has(key)) return cache.get(key);
  const out = new Float64Array(H + 1); out[0] = -Infinity;
  let lc = 0, acc = -Infinity;           // lc = log₂ C(n,a)；acc = log₂ Σ_{a'≤a} C(n,a')²
  for (let a = 0; a < H; a++) {
    if (a > 0) lc += Math.log2((n - a + 1) / a);
    const t = 2 * lc;
    acc = acc === -Infinity ? t : Math.max(acc, t) + Math.log2(1 + 2 ** (-Math.abs(acc - t)));
    out[a + 1] = acc;                    // h = a+1：求和到 a < h
  }
  if (cache.size > 8) cache.clear();
  cache.set(key, out); return out;
}
