// 附录 B 可运行示例用到的纯函数（不含 JSX，可在 node 中单独测试）。
// 1) 稀疏四次 F2 多项式的 gap：直接枚举 vs (B.3) 的模 2^b 截断技巧（BigInt）
// 2) GF(2^b) 与 Vandermonde 校验（引理 B.3）
// 3) 随机 3-CNF、违反向量、混合校验计数恒等式 (B.4)、§B.5 的贪心短校验
// 4) 布尔有限差分恒等式 (B.2) 的小规模验证（Z[τ]/(τ^h)，BigInt）
import { rng } from "./_rat.js";
export { rng };

export const popcount = x => { let c = 0; while (x) { x &= x - 1; c++; } return c; };
export const parity = x => popcount(x) & 1;
const ri = (rnd, k) => Math.floor(rnd() * k);

// ---------------------------------------------------------------- 1. 四次 gap
// 单项式 = 变量子集的位掩码（0 = 常数 1）。模 2 消去重复单项式。
export function randQuartic(v, L, rnd, maxDeg = 4) {
  const set = new Set();
  let guard = 0;
  while (set.size < L && guard++ < 50 * L) {
    const d = 1 + ri(rnd, maxDeg); let m = 0;
    while (popcount(m) < Math.min(d, v)) m |= 1 << ri(rnd, v);
    if (set.has(m)) set.delete(m); else set.add(m);     // 模 2 消去
  }
  return [...set];
}
export function gapDirect(mons, v) {
  let g = 0;
  for (let x = 0; x < 1 << v; x++) { let p = 0; for (const m of mons) if ((x & m) === m) p ^= 1; g += p ? -1 : 1; }
  return g;
}
const binomB = (n, k) => { if (k < 0 || k > n) return 0n; let r = 1n; for (let i = 0; i < k; i++) r = r * BigInt(n - i) / BigInt(i + 1); return r; };
// (B.3)：在 Z[u]/(u^b) 中求 Σ_x Φ(u,x) 的系数向量。
// 在布尔输入上 Π_e (1 − 2u m_e(x)) = (1 − 2u)^{k(x)}，k(x) = 取值为 1 的单项式个数；u^t 的系数 (−2)^t C(k,t)。
// （引理 B.1 用结构化求值算出同一个系数向量；这里用逐点枚举作为参照。）
export function gapTrunc(mons, v, b) {
  const coef = Array(b).fill(0n);
  let tail = 0n;                       // 被截掉的项（u 次数 ≥ b）在 u=1 处的总和
  let maxK = 0;
  for (let x = 0; x < 1 << v; x++) {
    let k = 0; for (const m of mons) if ((x & m) === m) k++;
    maxK = Math.max(maxK, k);
    for (let t = 0; t <= k; t++) {
      const c = (t % 2 ? -1n : 1n) * (1n << BigInt(t)) * binomB(k, t);
      if (t < b) coef[t] += c; else tail += c;
    }
  }
  const sum = coef.reduce((s, c) => s + c, 0n);
  const mod = 1n << BigInt(b);
  let r = ((sum % mod) + mod) % mod;
  if (r > mod / 2n) r -= mod;          // 中心剩余，落在 (−2^{b−1}, 2^{b−1}]
  const val2 = c => { if (c === 0n) return Infinity; let k = 0; while (c % 2n === 0n) { c /= 2n; k++; } return k; };
  return { coef, sum, tail, residue: r, mod, maxK, divisible: coef.every((c, t) => val2(c) >= t), tailDivisible: tail % mod === 0n };
}

// ---------------------------------------------------------------- 2. GF(2^b) 与 Vandermonde
export const IRRED = { 2: 0b111, 3: 0b1011, 4: 0b10011, 5: 0b100101, 6: 0b1000011, 7: 0b10000011, 8: 0b100011011 };
export const irredTex = { 2: "t^2+t+1", 3: "t^3+t+1", 4: "t^4+t+1", 5: "t^5+t^2+1", 6: "t^6+t+1", 7: "t^7+t+1", 8: "t^8+t^4+t^3+t+1" };
export function gfMul(a, c, b) {
  const P = IRRED[b]; let r = 0;
  while (c) { if (c & 1) r ^= a; c >>= 1; a <<= 1; if (a >> b) a ^= P; }
  return r;
}
export function gfPow(a, j, b) { let r = 1; for (let i = 0; i < j; i++) r = gfMul(r, a, b); return r; }
// 检验 IRRED[b] 不可约（逐个试除低次多项式；对应原文"枚举并检验 b 次不可约多项式"）
export function isIrreducible(P, b) {
  const deg = p => 31 - Math.clz32(p);
  const mod = (a, d) => { while (a && deg(a) >= deg(d)) a ^= d << (deg(a) - deg(d)); return a; };
  for (let d = 2; d < 1 << (Math.floor(b / 2) + 1); d++) if (deg(d) >= 1 && deg(d) <= b / 2 && mod(P, d) === 0) return false;
  return true;
}
// 二元校验矩阵：第 (j,k) 行 = α_e^j 的第 k 个二进制位（j < w, k < b）；h0 = b·w 行，m 列
export function vandermondeBinary(alphas, w, b) {
  const rows = [];
  for (let j = 0; j < w; j++) for (let k = 0; k < b; k++) rows.push(alphas.map(a => (gfPow(a, j, b) >> k) & 1));
  return rows;
}
export function rankF2(rows) {           // rows: 0/1 数组
  const R = rows.map(r => r.reduce((s, x, i) => s | (x << i), 0)); let rank = 0;
  const m = rows[0]?.length || 0;
  for (let c = 0; c < m; c++) {
    const p = R.findIndex((r, i) => i >= rank && (r >> c) & 1); if (p < 0) continue;
    [R[rank], R[p]] = [R[p], R[rank]];
    for (let i = 0; i < R.length; i++) if (i !== rank && (R[i] >> c) & 1) R[i] ^= R[rank];
    rank++;
  }
  return rank;
}
// 枚举 F2^m 全部向量（Gray 码），返回通过全部 Vandermonde 方程的向量的重量分布
export function vandermondeScan(alphas, w, b) {
  const m = alphas.length;
  const col = alphas.map(a => Array.from({ length: w }, (_, j) => gfPow(a, j, b)));
  const syn = new Int32Array(w); const hist = Array(m + 1).fill(0);
  hist[0] = 1; let prev = 0, minW = Infinity, witness = null;
  for (let k = 1; k < 1 << m; k++) {
    const g = k ^ (k >> 1), e = 31 - Math.clz32(g ^ prev); prev = g;
    for (let j = 0; j < w; j++) syn[j] ^= col[e][j];
    let ok = true; for (let j = 0; j < w; j++) if (syn[j]) { ok = false; break; }
    if (ok) { const wt = popcount(g); hist[wt]++; if (wt < minW) { minW = wt; witness = g; } }
  }
  return { hist, minW, witness, passing: hist.reduce((s, x) => s + x, 0) };
}

// ---------------------------------------------------------------- 3. 3-CNF 与校验
// 子句 = [[var, neg], ×3]；文字 x（neg=0）或 ¬x（neg=1）。违反 ⇔ 三个文字全为假。
export function randCNF(n, m, rnd) {
  const cl = [];
  for (let e = 0; e < m; e++) {
    const vs = new Set(); while (vs.size < Math.min(3, n)) vs.add(ri(rnd, n));
    cl.push([...vs].map(i => [i, ri(rnd, 2)]));
  }
  return cl;
}
export const violated = (c, x) => c.every(([i, neg]) => ((x >> i) & 1) === neg);
// 违反向量表：viol[x] = 长度 m 的 0/1 数组（Uint8Array 平铺）
export function violTable(cl, n) {
  const m = cl.length, N = 1 << n, V = new Uint8Array(N * m);
  for (let x = 0; x < N; x++) for (let e = 0; e < m; e++) V[x * m + e] = violated(cl[e], x) ? 1 : 0;
  return V;
}
// v_e(x) 作为 F2 多项式：Π (1 + x_i)（正文字）或 Π x_i（负文字）展开，单项式为变量位掩码
export function clausePoly(c) {
  let mons = new Map([[0, 1]]);
  for (const [i, neg] of c) {
    const nx = new Map();
    const add = k => nx.set(k, (nx.get(k) || 0) ^ 1);
    for (const [k] of mons) { if (!neg) add(k); add(k | (1 << i)); }   // 正文字：(1 + x_i)；负文字：x_i
    mons = new Map([...nx].filter(([, c]) => c));
  }
  return [...mons.keys()];
}

// (B.4) 验证：m ≤ 30（违反向量用整数位掩码），稠密校验矩阵 Cmat（h0×m，0/1），短校验 aMasks（位掩码）
export function mixedCheck(cl, n, Cmat, aMasks) {
  const m = cl.length, N = 1 << n, h0 = Cmat.length, s = aMasks.length;
  const Vx = new Int32Array(N);
  for (let x = 0; x < N; x++) { let mk = 0; for (let e = 0; e < m; e++) if (violated(cl[e], x)) mk |= 1 << e; Vx[x] = mk; }
  const Crow = Cmat.map(r => r.reduce((s, b, e) => s | (b << e), 0));
  // 直接计数
  let direct = 0, sat = 0;
  for (let x = 0; x < N; x++) {
    if (!Vx[x]) sat++;
    if (Crow.every(r => !parity(r & Vx[x])) && aMasks.every(a => !parity(a & Vx[x]))) direct++;
  }
  // 按 (B.4)：对每个 u 枚举 (x,z) 求 gap(Q_u)
  const gaps = []; let total = 0;
  for (let u = 0; u < 1 << h0; u++) {
    let ru = 0; for (let k = 0; k < h0; k++) if ((u >> k) & 1) ru ^= Crow[k];
    let g = 0;
    for (let x = 0; x < N; x++) {
      const p0 = parity(ru & Vx[x]);
      let pm = 0; for (let j = 0; j < s; j++) if (parity(aMasks[j] & Vx[x])) pm |= 1 << j;
      for (let z = 0; z < 1 << s; z++) g += (p0 ^ parity(z & pm)) ? -1 : 1;
    }
    gaps.push(g); total += g;
  }
  const viaB4 = total / 2 ** (h0 + s);
  return { direct, sat, gaps, total, viaB4, N };
}
// Q_u 的显式单项式（n 个 x 变量 + s 个 z 变量；z_j 是第 n+j 位）：返回单项式个数与最高次数
export function QuPoly(cl, n, uRowMask, aMasks) {
  const acc = new Map(); const tog = k => acc.set(k, (acc.get(k) || 0) ^ 1);
  const polys = cl.map(clausePoly);
  let dense = 0, short = 0;
  cl.forEach((_, e) => { if ((uRowMask >> e) & 1) { polys[e].forEach(tog); dense += polys[e].length; } });
  aMasks.forEach((a, j) => cl.forEach((_, e) => { if ((a >> e) & 1) { polys[e].forEach(k => tog(k | (1 << (n + j)))); short += polys[e].length; } }));
  const mons = [...acc].filter(([, c]) => c).map(([k]) => k);
  return { mons, count: mons.length, maxDeg: Math.max(0, ...mons.map(popcount)), denseRaw: dense, shortRaw: short };
}

// §B.5：稠密 Vandermonde 校验后，逐轮挑选短校验。返回每轮假幸存者数、平均淘汰率等。
// 候选 = 长 L 的子句列表（可重复）+ 每个位置的包含位；校验 = 所含违反位的奇偶。
export function greedyShortChecks({ cl, n, w, K, rnd, rounds }) {
  const m = cl.length, N = 1 << n;
  const V = violTable(cl, n);
  const b = Math.max(2, Math.ceil(Math.log2(m + 1)));
  const alphas = Array.from({ length: m }, (_, e) => e + 1);
  const pw = alphas.map(a => Array.from({ length: w }, (_, j) => gfPow(a, j, b)));
  let sat = 0, surv = [];
  for (let x = 0; x < N; x++) {
    let isSat = true; const syn = Array(w).fill(0);
    for (let e = 0; e < m; e++) if (V[x * m + e]) { isSat = false; for (let j = 0; j < w; j++) syn[j] ^= pw[e][j]; }
    if (isSat) sat++;
    else if (syn.every(s => !s)) surv.push(x);
  }
  const minViol = surv.length ? Math.min(...surv.map(x => { let k = 0; for (let e = 0; e < m; e++) k += V[x * m + e]; return k; })) : null;
  const L = Math.ceil(m / w);
  const totalCand = Math.pow(2 * m, L);
  const enumerate = totalCand <= K;
  const hist = [surv.length], avgRej = [];
  const T = rounds ?? 3 * n;
  for (let t = 0; t < T; t++) {
    if (!surv.length) { hist.push(0); avgRej.push(null); continue; }
    let best = null, bestPass = Infinity, rejSum = 0;
    const nc = enumerate ? totalCand : K;
    for (let c = 0; c < nc; c++) {
      const idx = [], bits = [];
      if (enumerate) { let r = c; for (let p = 0; p < L; p++) { const d = r % (2 * m); r = Math.floor(r / (2 * m)); idx.push(d >> 1); bits.push(d & 1); } }
      else for (let p = 0; p < L; p++) { idx.push(ri(rnd, m)); bits.push(ri(rnd, 2)); }
      const inc = []; idx.forEach((e, p) => { if (bits[p]) inc.push(e); });
      let pass = 0;
      for (const x of surv) { let par = 0; for (const e of inc) par ^= V[x * m + e]; if (!par) pass++; }
      rejSum += 1 - pass / surv.length;
      if (pass < bestPass) { bestPass = pass; best = inc; }
    }
    avgRej.push(rejSum / nc);
    surv = surv.filter(x => { let par = 0; for (const e of best) par ^= V[x * m + e]; return !par; });
    hist.push(surv.length);
  }
  return { sat, hist, avgRej, L, b, h0: b * w, minViol, totalCand, enumerate, finalCount: sat + surv.length };
}

// ---------------------------------------------------------------- 4. 布尔有限差分 (B.2)
// 截断多项式 Z[τ]/(τ^h)：BigInt 数组（低次在前）
const tz = h => Array(h).fill(0n);
const tadd = (a, c) => a.map((x, i) => x + c[i]);
const tmul = (a, c) => { const h = a.length, r = tz(h); for (let i = 0; i < h; i++) if (a[i]) for (let j = 0; i + j < h; j++) r[i + j] += a[i] * c[j]; return r; };
const tconst = (h, k) => { const r = tz(h); r[0] = BigInt(k); return r; };
// 随机实例：v 个变量，N 个因子，每个因子依赖 2 个变量（两个输入出现），φ_e(y1,y2)=c0+c1y1+c2y2+c3y1y2；
// 拷贝映射 C(θ) = C + θA1 + θ²A2（任意多项式变形；(B.2) 对任意 C(θ) 成立）
export function fdInstance(v, N, rnd) {
  const occ = [], fac = [];
  for (let e = 0; e < N; e++) {
    const a = ri(rnd, v); let c = ri(rnd, v - 1); if (c >= a) c++;
    fac.push({ occ: [occ.length, occ.length + 1], coef: [1 + ri(rnd, 2), ri(rnd, 5) - 2, ri(rnd, 5) - 2, ri(rnd, 5) - 2] });
    occ.push(a, c);
  }
  const rnd3 = () => ri(rnd, 3) - 1;
  const A1 = occ.map(() => Array.from({ length: v }, rnd3)), A2 = occ.map(() => Array.from({ length: v }, () => (rnd() < 0.3 ? rnd3() : 0)));
  return { v, N, occ, fac, A1, A2 };
}
// 输入出现 k 的值 = Σ_var M_k,var(τ) · y_var，M(τ) 为 τ 的多项式矩阵
function PhiEval(inst, inputs) {   // inputs: 每个出现的 Z[τ]/(τ^h) 值
  const h = inputs[0].length; let prod = tconst(h, 1);
  for (const f of inst.fac) {
    const [p, q] = f.occ.map(k => inputs[k]); const [c0, c1, c2, c3] = f.coef.map(BigInt);
    const val = tadd(tadd(tadd(tconst(h, c0), p.map(t => t * c1)), q.map(t => t * c2)), tmul(p, q).map(t => t * c3));
    prod = tmul(prod, val);
  }
  return prod;
}
// C(i+τ) 与 Δ_i(τ)：第 k 个出现对变量 var 的系数（τ 多项式）
function Cmats(inst, i, h) {
  const { occ, A1, A2, v } = inst, I = BigInt(i);
  const Ci = occ.map((o, k) => Array.from({ length: v }, (_, a) => BigInt(o === a ? 1 : 0) + BigInt(A1[k][a]) * I + BigInt(A2[k][a]) * I * I));
  const Di = occ.map((_, k) => Array.from({ length: v }, (_, a) => { const r = tz(h); if (h > 1) r[1] = BigInt(A1[k][a]) + 2n * BigInt(A2[k][a]) * I; if (h > 2) r[2] = BigInt(A2[k][a]); return r; }));
  return { Ci, Di };
}
function inputsAt(inst, Ci, Di, x, y, h) {
  return inst.occ.map((_, k) => {
    let r = tz(h);
    for (let a = 0; a < inst.v; a++) {
      if ((x >> a) & 1) r[0] += Ci[k][a];
      if ((y >> a) & 1) r = tadd(r, Di[k][a]);
    }
    return r;
  });
}
// 直接：P(i+τ) = Σ_x Φ(C(i)x + Δ_i(τ)x) 的 τ 系数 = P^{(j)}(i)/j!
export function fdDirect(inst, i, h) {
  const { Ci, Di } = Cmats(inst, i, h); let acc = tz(h);
  for (let x = 0; x < 1 << inst.v; x++) acc = tadd(acc, PhiEval(inst, inputsAt(inst, Ci, Di, x, x, h)));
  return acc;
}
// 按 (B.2)：Σ_{|S|≤j} Σ_{T⊆S} (−1)^{|S|−|T|} Σ_{x: x_S=1} [τ^j] Φ(C(i)x + Δ_i(τ)1_T)
export function fdB2(inst, i, h) {
  const { Ci, Di } = Cmats(inst, i, h), v = inst.v, out = tz(h);
  let pairs = 0;
  const inner = new Map();      // (T,S) → Σ_{x ⊇ S} Φ(...)（整个 τ 多项式，一次结构化求值同时给出所有 j）
  for (let S = 0; S < 1 << v; S++) {
    const sz = popcount(S); if (sz >= h) continue;
    for (let T = S; ; T = (T - 1) & S) {
      pairs++;
      let acc = tz(h);
      for (let x = 0; x < 1 << v; x++) if ((x & S) === S) acc = tadd(acc, PhiEval(inst, inputsAt(inst, Ci, Di, x, T, h)));
      const sign = (sz - popcount(T)) % 2 ? -1n : 1n;
      for (let j = sz; j < h; j++) out[j] += sign * acc[j];
      inner.set(S + "," + T, acc);
      if (T === 0) break;
    }
  }
  return { val: out, pairs };
}
// 固定 x，F_{x,j}(y) 的多线性 Möbius 系数 c_S = Σ_{T⊆S} (−1)^{|S|−|T|} F(1_T)；返回 |S|>j 的最大 |c_S|（应为 0）
export function mobiusCheck(inst, i, h, x) {
  const { Ci, Di } = Cmats(inst, i, h), v = inst.v;
  const F = []; for (let T = 0; T < 1 << v; T++) F.push(PhiEval(inst, inputsAt(inst, Ci, Di, x, T, h)));
  const rows = [];
  for (let j = 0; j < h; j++) {
    let maxHigh = 0n, nonzeroLow = 0, deg = 0;
    for (let S = 0; S < 1 << v; S++) {
      let c = 0n; for (let T = S; ; T = (T - 1) & S) { c += ((popcount(S) - popcount(T)) % 2 ? -1n : 1n) * F[T][j]; if (T === 0) break; }
      const a = c < 0n ? -c : c;
      if (c !== 0n) deg = Math.max(deg, popcount(S));
      if (popcount(S) > j) { if (a > maxHigh) maxHigh = a; } else if (c !== 0n) nonzeroLow++;
    }
    rows.push({ j, deg, maxHigh, nonzeroLow });
  }
  return rows;
}
export function pairBound(v, h) { let s = 0n; for (let j = 0; j < h; j++) s += (1n << BigInt(j)) * binomB(v, j); return s; }
