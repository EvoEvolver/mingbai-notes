// 第 14 章交互图的数值核心（纯函数，无 React；已在 node 中逐项核对，见文件末尾注释）。
//  A. 复数运算、Möbius 变换、约化到 SL(2,Z) 的基本区域
//  B. Dedekind η 函数（乘积形式）、单圈被积函数 f(τ)=τ₂^{-12}|η(τ)|^{-48}、det′Δ/τ₂ ∝ τ₂|η|⁴、环面 Laplace 谱
//  C. 特殊函数：ln Γ（Lanczos）、ζ(x)（Euler–Maclaurin）、K_ν(x)（积分表示）
//  D. 非全纯 Eisenstein 级数 E(τ,s)：直接格点求和 / Chowla–Selberg（Fourier–Bessel）展开 / Kronecker 第一极限公式
//  E. 1/η²⁴ 的 q 展开系数（弦的态计数）、Riemann–Roch 计数

const TAU = 2 * Math.PI;
// ---------------- A. 复数 ----------------
export const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
export const cabs = a => Math.hypot(a[0], a[1]);
export const cexp = a => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; };
export const csqrt = a => { const r = Math.sqrt(cabs(a)), th = Math.atan2(a[1], a[0]) / 2; return [r * Math.cos(th), r * Math.sin(th)]; };  // 主支：Re ≥ 0
export const mob = (M, t) => cdiv([M[0][0] * t[0] + M[0][1], M[0][0] * t[1]], [M[1][0] * t[0] + M[1][1], M[1][0] * t[1]]);
const mm2 = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
// 反复用 T^n、S 把 τ 移进基本区域 F = {|Re τ| ≤ 1/2, |τ| ≥ 1}；返回 τ′ 与 M（τ′ = M·τ）
export function reduce(t0) {
  let t = t0, M = [[1, 0], [0, 1]];
  for (let it = 0; it < 300; it++) {
    const n = -Math.round(t[0]);
    if (n !== 0) { t = [t[0] + n, t[1]]; M = mm2([[1, n], [0, 1]], M); }
    if (t[0] * t[0] + t[1] * t[1] < 1 - 1e-12) { t = cdiv([-1, 0], t); M = mm2([[0, -1], [1, 0]], M); } else break;
  }
  if (M[1][0] < 0 || (M[1][0] === 0 && M[1][1] < 0)) M = M.map(r => r.map(v => -v));
  return { t, M };
}

// ---------------- B. η 函数与单圈振幅 ----------------
// η(τ) = e^{iπτ/12} ∏_{n≥1} (1 − qⁿ)，q = e^{2πiτ}
export function eta(t) {
  const q = cexp([-TAU * t[1], TAU * t[0]]), aq = cabs(q);
  const N = Math.min(4000, Math.ceil(36 / -Math.log(aq)) + 5);
  let P = [1, 0], qn = [1, 0];
  for (let n = 1; n <= N; n++) { qn = cmul(qn, q); P = cmul(P, [1 - qn[0], -qn[1]]); }
  return cmul(cexp([-Math.PI * t[1] / 12, Math.PI * t[0] / 12]), P);
}
// ln|η(τ)| = −πτ₂/12 + Σ ln|1 − qⁿ|（不经过复数乘积，τ₂ 很小时也不下溢）
export function logAbsEta(t) {
  const aq = Math.exp(-TAU * t[1]), N = Math.min(20000, Math.ceil(36 / (TAU * t[1])) + 5);
  let s = -Math.PI * t[1] / 12;
  for (let n = 1; n <= N; n++) { const r = Math.pow(aq, n), th = TAU * n * t[0]; s += 0.5 * Math.log(1 - 2 * r * Math.cos(th) + r * r); }
  return s;
}
// 单圈被积函数（不含测度 d²τ/τ₂²）：f(τ) = τ₂^{-12}|η(τ)|^{-48}；返回 ln f
export const lnF1 = t => -12 * Math.log(t[1]) - 48 * logAbsEta(t);
// det′Δ/τ₂ = (2π)² τ₂|η(τ)|⁴（式 (14.141) 保留常数）；返回 ln
export const lnDetOverArea = t => 2 * Math.log(TAU) + Math.log(t[1]) + 4 * logAbsEta(t);
// 环面 C/(Z+τZ)、平坦度规下 Δ = −2∂∂̄ 的本征值 λ_{m,n} = (2π²/τ₂²)|m + τn|²，取最低的 k 个（不含零模）
export function torusSpectrum(t, k = 8, R = 12) {
  const L = [];
  for (let m = -R; m <= R; m++) for (let n = -R; n <= R; n++) {
    if (m === 0 && n === 0) continue;
    const re = m + t[0] * n, im = t[1] * n;
    L.push(2 * Math.PI * Math.PI / (t[1] * t[1]) * (re * re + im * im));
  }
  return L.sort((a, b) => a - b).slice(0, k);
}

// ---------------- C. 特殊函数 ----------------
const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
export function lnGamma(x) {   // x > 0
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lnGamma(1 - x);
  x -= 1; let a = LG[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += LG[i] / (x + i);
  return 0.5 * Math.log(TAU) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
export function gamma(x) {     // 实数 x（非正整数）
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  return Math.exp(lnGamma(x));
}
// Riemann ζ(x)，x ≠ 1：Euler–Maclaurin，N = 20，Bernoulli 修正到 B₁₂
const B2k = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730];
export function zeta(x) {
  const N = 20; let s = 0;
  for (let k = 1; k < N; k++) s += Math.pow(k, -x);
  s += Math.pow(N, 1 - x) / (x - 1) + 0.5 * Math.pow(N, -x);
  let fact = 1, poch = x;                     // poch = x(x+1)…(x+2j−2)
  for (let j = 1; j <= 6; j++) {
    fact *= (2 * j - 1) * (2 * j);
    s += B2k[j - 1] / fact * poch * Math.pow(N, -x - 2 * j + 1);
    poch *= (x + 2 * j - 1) * (x + 2 * j);
  }
  return s;
}
// K_ν(x) = ∫₀^∞ e^{−x cosh u} cosh(νu) du（x > 0；梯形法，被积函数双指数衰减）
export function besselK(nu, x) {
  const h = 0.02; let s = 0.5 * Math.exp(-x);
  for (let k = 1; k < 4000; k++) { const u = k * h, v = Math.exp(-x * Math.cosh(u)) * Math.cosh(nu * u); s += v; if (v < 1e-300 || v < 1e-18 * s) break; }
  return s * h;
}

// ---------------- D. Eisenstein 级数 E(τ,s) = Σ′ τ₂ˢ/|m+τn|^{2s} ----------------
// 1) 直接格点求和：|m+τn| ≤ Rc 内求和，外部用积分 ∫_{|w|>Rc} d²w (τ₂ˢ/|w|^{2s})/τ₂ = 2π τ₂^{s−1} Rc^{2−2s}/(2s−2) 补尾
export function eisDirect(t, s, Rc = 60) {
  let sum = 0; const y = t[1], nmax = Math.ceil(Rc / y) + 1;
  for (let n = -nmax; n <= nmax; n++) {
    const yn = y * n; if (Math.abs(yn) > Rc) continue;
    const half = Math.sqrt(Rc * Rc - yn * yn), c = -t[0] * n;
    for (let m = Math.ceil(c - half); m <= Math.floor(c + half); m++) {
      if (m === 0 && n === 0) continue;
      const re = m + t[0] * n, r2 = re * re + yn * yn;
      sum += Math.pow(r2, -s);
    }
  }
  return Math.pow(y, s) * sum + TAU * Math.pow(y, s - 1) * Math.pow(Rc, 2 - 2 * s) / (2 * s - 2);
}
// 2) Chowla–Selberg 展开（对 m 用 Poisson 求和）：
// E = 2ζ(2s)yˢ + 2√π Γ(s−½)ζ(2s−1) y^{1−s}/Γ(s) + (8πˢ√y/Γ(s)) Σ_{N≥1} N^{s−½} σ_{1−2s}(N) cos(2πNx) K_{s−½}(2πNy)
export function eisFourier(t, s, Nmax) {
  const x = t[0], y = t[1];
  const NM = Nmax || Math.min(400, Math.ceil(40 / (TAU * y)) + 3);
  let S = 0;
  for (let N = 1; N <= NM; N++) {
    let sig = 0; for (let d = 1; d <= N; d++) if (N % d === 0) sig += Math.pow(d, 1 - 2 * s);
    S += Math.pow(N, s - 0.5) * sig * Math.cos(TAU * N * x) * besselK(s - 0.5, TAU * N * y);
  }
  const G = gamma(s);
  return 2 * zeta(2 * s) * Math.pow(y, s) + 2 * Math.sqrt(Math.PI) * gamma(s - 0.5) * zeta(2 * s - 1) * Math.pow(y, 1 - s) / G
    + 8 * Math.pow(Math.PI, s) * Math.sqrt(y) / G * S;
}
// 3) Kronecker 第一极限公式 (14.136) 的 Laurent 近似：π/(s−1) + 2π[γ − ln2 − ln(√τ₂|η|²)]
export const EULER_GAMMA = 0.5772156649015329;
export const kroneckerConst = t => TAU * (EULER_GAMMA - Math.log(2) - (0.5 * Math.log(t[1]) + 2 * logAbsEta(t)));
export const eisLaurent = (t, s) => Math.PI / (s - 1) + kroneckerConst(t);

// ---------------- E. 弦的态计数与 Riemann–Roch ----------------
// 1/∏(1−qⁿ)^{24} = Σ d_N q^N（横向 24 个振子的态数）
export function partitions24(Nmax = 12) {
  const c = new Array(Nmax + 1).fill(0); c[0] = 1;
  for (let k = 0; k < 24; k++) for (let n = 1; n <= Nmax; n++) for (let N = n; N <= Nmax; N++) c[N] += c[N - n];
  return c;
}
// 数值核对能级匹配：∫_{−1/2}^{1/2} dτ₁ |η(τ)|^{−48}  vs  Σ_N d_N² e^{−4πτ₂(N−1)}
export function levelMatch(y, M = 400) {
  let I = 0;
  for (let k = 0; k < M; k++) { const x = -0.5 + (k + 0.5) / M; I += Math.exp(-48 * logAbsEta([x, y])); }
  I /= M;
  const d = partitions24(30); let S = 0;
  for (let N = 0; N <= 30; N++) S += d[N] * d[N] * Math.exp(-2 * TAU * y * (N - 1));
  return { I, S };
}
// h⁰(K^m)：亏格 g 的紧 Riemann 面上全纯 m 次微分的复维数（K 为典范丛；deg K^m = m(2g−2)）
export function h0K(g, m) {
  if (g === 0) return Math.max(0, 1 - 2 * m);       // K = O(−2)，K^m = O(−2m)
  if (g === 1) return 1;                             // K 平凡
  if (m < 0) return 0;
  if (m === 0) return 1;
  if (m === 1) return g;
  return (2 * m - 1) * (g - 1);
}
// 指标 (14.27)：dim ker ∇_z^{(n)} − dim ker ∇^z_{(n−1)} = h⁰(K^n) − h⁰(K^{1−n})
export const rrIndex = (g, n) => h0K(g, n) - h0K(g, 1 - n);

/* node 核对（2026-10-31）：
   η(i) = Γ(1/4)/(2π^{3/4}) = 0.768225422…           ✓ eta([0,1]) = 0.7682254223
   η(τ+1)/η(τ) = e^{iπ/12}、η(−1/τ)/η(τ) = (−iτ)^{1/2}  ✓ 相对误差 < 1e-13（τ = 0.3+0.8i 等）
   lnF1 在 τ→τ+1、−1/τ 下不变                          ✓ 差 < 1e-11
   eisDirect(τ,2) vs eisFourier(τ,2)                  ✓ 相对差 ~1e-6（Rc=60）
   eisFourier(τ,1+ε) − π/ε → kroneckerConst(τ)        ✓ ε=1e-4 时差 ~3e-4（= O(ε) 项）
   partitions24 = 1, 24, 324, 3200, 25650, 176256, …  ✓
   levelMatch(1.0)：I 与 S 相对差 < 1e-10              ✓
   rrIndex(g,n) = (2n−1)(g−1) 对 g=0…8、n=−4…4          ✓ */
