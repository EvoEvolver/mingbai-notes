// 第 II 章补充材料交互图的数值核心（纯 JS，无 React 依赖；复制为 .mjs 后用 node 单独测试）。
// 单位：ħ = 1。

// ---------- 复数 ----------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cconj = a => cx(a.re, -a.im);
export const cscale = (a, s) => cx(a.re * s, a.im * s);
export const cexpi = th => cx(Math.cos(th), Math.sin(th));
export const cabs = a => Math.hypot(a.re, a.im);
export const carg = a => Math.atan2(a.im, a.re);

// ---------- 小矩阵（复数，n×n，行主序二维数组） ----------
export const mzero = n => Array.from({ length: n }, () => Array.from({ length: n }, () => cx(0)));
export const meye = n => mzero(n).map((r, i) => r.map((_, j) => cx(i === j ? 1 : 0)));
export const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
export const msub = (A, B) => A.map((r, i) => r.map((z, j) => csub(z, B[i][j])));
export const mscale = (A, s) => A.map(r => r.map(z => (typeof s === "number" ? cscale(z, s) : cmul(z, s))));
export function mmul(A, B) {
  const n = A.length, m = B[0].length, k = B.length, C = [];
  for (let i = 0; i < n; i++) { C.push([]); for (let j = 0; j < m; j++) { let s = cx(0); for (let l = 0; l < k; l++) s = cadd(s, cmul(A[i][l], B[l][j])); C[i].push(s); } }
  return C;
}
export const mdag = A => A[0].map((_, j) => A.map(r => cconj(r[j])));
export const mnorm = A => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));     // Frobenius 范数
export const mcomm = (A, B) => msub(mmul(A, B), mmul(B, A));
// 矩阵指数：缩放–平方 + Taylor（小矩阵足够精确）
export function mexp(A) {
  const n = A.length, nr = mnorm(A);
  let s = 0; while (nr / 2 ** s > 0.25) s++;
  const As = mscale(A, 1 / 2 ** s);
  let term = meye(n), sum = meye(n);
  for (let k = 1; k <= 20; k++) { term = mscale(mmul(term, As), 1 / k); sum = madd(sum, term); }
  for (let i = 0; i < s; i++) sum = mmul(sum, sum);
  return sum;
}
export const mvec = (A, v) => A.map(r => r.reduce((s, z, j) => cadd(s, cmul(z, v[j])), cx(0)));
export const vdot = (u, v) => u.reduce((s, z, i) => cadd(s, cmul(cconj(z), v[i])), cx(0));     // ⟨u|v⟩
export const vnorm2 = v => v.reduce((s, z) => s + z.re * z.re + z.im * z.im, 0);

// ---------- 补充材料 C_II：幺正矩阵 ----------
// (21) 绕 Oz 转 θ 的实转动矩阵（3×3）
export const rotZ = th => [[cx(Math.cos(th)), cx(-Math.sin(th)), cx(0)], [cx(Math.sin(th)), cx(Math.cos(th)), cx(0)], [cx(0), cx(0), cx(1)]];
// (22) 自旋 1/2 的转动矩阵 R^{(1/2)}(α,β,γ) = e^{-iαS_z/ħ} e^{-iβS_y/ħ} e^{-iγS_z/ħ}（已改正左下角相位，见页面勘误框）
export function rotHalf(al, be, ga) {
  const c = Math.cos(be / 2), s = Math.sin(be / 2);
  return [[cscale(cexpi(-(al + ga) / 2), c), cscale(cexpi((ga - al) / 2), -s)],
          [cscale(cexpi((al - ga) / 2), s), cscale(cexpi((al + ga) / 2), c)]];
}
// 由三个 Euler 指数直接相乘得到（用于核对 rotHalf）
export function rotHalfProduct(al, be, ga) {
  const Rz = a => [[cexpi(-a / 2), cx(0)], [cx(0), cexpi(a / 2)]];
  const c = Math.cos(be / 2), s = Math.sin(be / 2), Ry = [[cx(c), cx(-s)], [cx(s), cx(c)]];
  return mmul(mmul(Rz(al), Ry), Rz(ga));
}
// 列正交归一检验 (20)：返回 Σ_k U*_{ki} U_{kj} 矩阵（应为单位阵）
export const gram = U => mmul(mdag(U), U);
// 新基 ṽ_i = U v_i 下的分量：c̃_i = ⟨ṽ_i|ψ⟩ = (U†ψ)_i
export const newComponents = (U, psi) => mvec(mdag(U), psi);

// ---------- 补充材料 B_II：Glauber 公式 (63) ----------
// Heisenberg 型：A = a E12, B = b E23（3×3 严格上三角），[A,B] = ab E13 与 A、B 都对易
export function heisPair(a, b) {
  const A = mzero(3), B = mzero(3); A[0][1] = cx(a); B[1][2] = cx(b); return [A, B];
}
// Pauli 型：A = iα σ_x, B = iα σ_y（[A,B] = -2α² · iσ_z，不与 A、B 对易）
export function pauliPair(al) {
  const A = [[cx(0), cx(0, al)], [cx(0, al), cx(0)]];
  const B = [[cx(0), cx(al)], [cx(-al), cx(0)]];       // iα σ_y = iα [[0,-i],[i,0]] = [[0, α],[-α, 0]]
  return [A, B];
}
// 三种乘积的偏差：‖e^A e^B − e^{A+B}‖ 与 ‖e^A e^B − e^{A+B} e^{[A,B]/2}‖
export function glauberErrors(A, B) {
  const L = mmul(mexp(A), mexp(B)), S = mexp(madd(A, B)), C = mcomm(A, B);
  const G = mmul(S, mexp(mscale(C, 0.5)));
  const cc = mnorm(mcomm(A, C)) + mnorm(mcomm(B, C));
  return { naive: mnorm(msub(L, S)), glauber: mnorm(msub(L, G)), commC: cc, L, S, G, C };
}

// ---------- FFT（基 2，原地，复数分开存储） ----------
export function fft(re, im, inv = false) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (inv ? 2 : -2) * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let ur = 1, ui = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2;
        const tr = re[b] * ur - im[b] * ui, ti = re[b] * ui + im[b] * ur;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const nr = ur * wr - ui * wi; ui = ur * wi + ui * wr; ur = nr;
      }
    }
  }
  if (inv) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
}

// ---------- 补充材料 E_II：平移算符 S(λ) = e^{-iλP/ħ} ----------
// 波函数样本：q ∈ [-L/2, L/2)，N 点（周期边界；所选波包远离边界）
export const WAVES = {
  gauss: { label: "高斯波包", f: (q, k0) => { const g = Math.exp(-q * q / 2); return [g * Math.cos(k0 * q), g * Math.sin(k0 * q)]; } },
  two: { label: "双峰（不对称）", f: (q, k0) => { const g = Math.exp(-((q + 1.5) ** 2) / 0.8) + 0.6 * Math.exp(-((q - 1.8) ** 2) / 0.3); return [g * Math.cos(k0 * q), g * Math.sin(k0 * q)]; } },
  hermite: { label: "第一激发态 $q\\,\\mathrm e^{-q^2/2}$", f: (q, k0) => { const g = q * Math.exp(-q * q / 2); return [g * Math.cos(k0 * q), g * Math.sin(k0 * q)]; } },
};
export function grid(N, L) { const q = new Float64Array(N); for (let i = 0; i < N; i++) q[i] = -L / 2 + L * i / N; return q; }
// 在动量空间乘以 m(p)，再变回坐标空间。p_j = 2π j / L（j 取 FFT 的正负频率排序）
export function applyMultiplier(re0, im0, L, mult) {
  const N = re0.length, re = Float64Array.from(re0), im = Float64Array.from(im0);
  fft(re, im, false);
  for (let j = 0; j < N; j++) {
    const jj = j < N / 2 ? j : j - N, p = 2 * Math.PI * jj / L, [mr, mi] = mult(p);
    const r = re[j] * mr - im[j] * mi, i2 = re[j] * mi + im[j] * mr; re[j] = r; im[j] = i2;
  }
  fft(re, im, true);
  return [re, im];
}
// S(λ)ψ：order = Infinity 为完整指数 e^{-iλp}；有限 order 为 Taylor 截断 Σ_{n≤order} (−iλp)^n / n!。
// 截断时先把模小于 1e-13×最大值的 Fourier 分量（纯舍入噪声）置零，否则噪声会被 (λp)^n/n! 放大；真实分量不受影响。
export function translate(re0, im0, L, lam, order = Infinity) {
  const N = re0.length, re = Float64Array.from(re0), im = Float64Array.from(im0);
  fft(re, im, false);
  let mx = 0; for (let j = 0; j < N; j++) mx = Math.max(mx, Math.hypot(re[j], im[j]));
  for (let j = 0; j < N; j++) {
    const jj = j < N / 2 ? j : j - N, p = 2 * Math.PI * jj / L;
    let mr, mi;
    if (order === Infinity) { mr = Math.cos(lam * p); mi = -Math.sin(lam * p); }
    else if (Math.hypot(re[j], im[j]) < 1e-13 * mx) { mr = 0; mi = 0; }
    else { let tr = 1, ti = 0; mr = 1; mi = 0; for (let n = 1; n <= order; n++) { const zi = -lam * p / n, r = -ti * zi, i = tr * zi; tr = r; ti = i; mr += tr; mi += ti; } }
    const r = re[j] * mr - im[j] * mi, i2 = re[j] * mi + im[j] * mr; re[j] = r; im[j] = i2;
  }
  fft(re, im, true);
  return [re, im];
}
// P ψ = (ħ/i) dψ/dq（谱方法）
export const momentumOp = (re0, im0, L) => applyMultiplier(re0, im0, L, p => [p, 0]);
export function sample(kind, k0, N, L, shift = 0) {
  const q = grid(N, L), re = new Float64Array(N), im = new Float64Array(N), f = WAVES[kind].f;
  for (let i = 0; i < N; i++) { const [a, b] = f(q[i] - shift, k0); re[i] = a; im[i] = b; }
  return [re, im, q];
}
export function maxDiff(r1, i1, r2, i2) { let m = 0; for (let i = 0; i < r1.length; i++) m = Math.max(m, Math.hypot(r1[i] - r2[i], i1[i] - i2[i])); return m; }
export function norm2(re, im, dq) { let s = 0; for (let i = 0; i < re.length; i++) s += re[i] * re[i] + im[i] * im[i]; return s * dq; }
// ⟨Q⟩ = ∫ q|ψ|² / ∫|ψ|²
export function meanQ(re, im, q) { let s = 0, w = 0; for (let i = 0; i < re.length; i++) { const d = re[i] * re[i] + im[i] * im[i]; s += q[i] * d; w += d; } return s / w; }

// ---------- 补充材料 F_II：宇称分解 ----------
// 在对称网格 x_i = −X + 2X i/(n−1) 上，f(−x_i) = f(x_{n−1−i})
export const PARITY_FUNS = {
  shifted: { label: "平移的高斯 $\\mathrm e^{-(x-s)^2}$", f: (x, s) => Math.exp(-((x - s) ** 2)) },
  step: { label: "台阶加斜坡", f: (x, s) => (x > s ? 1 : 0) * Math.exp(-x * x / 6) + 0.3 * x * Math.exp(-x * x / 4) },
  sum: { label: "$\\cos x+s\\sin 2x$（乘包络）", f: (x, s) => (Math.cos(x) + s * Math.sin(2 * x)) * Math.exp(-x * x / 8) },
};
export function parityDecompose(kind, s, n = 801, X = 6) {
  const xs = [], f = [], fp = [], fm = [], F = PARITY_FUNS[kind].f;
  for (let i = 0; i < n; i++) { const x = -X + 2 * X * i / (n - 1); xs.push(x); f.push(F(x, s)); }
  for (let i = 0; i < n; i++) { const r = f[n - 1 - i]; fp.push((f[i] + r) / 2); fm.push((f[i] - r) / 2); }
  const h = 2 * X / (n - 1);
  const integ = arr => { let t = 0; for (let i = 0; i < n; i++) t += (i === 0 || i === n - 1 ? 0.5 : 1) * arr[i]; return t * h; };
  const N = integ(f.map(v => v * v)), Np = integ(fp.map(v => v * v)), Nm = integ(fm.map(v => v * v));
  const cross = integ(fp.map((v, i) => v * fm[i]));
  const xmean = integ(f.map((v, i) => xs[i] * v * v)) / N;
  const xp = integ(fp.map((v, i) => xs[i] * v * v)), xm = integ(fm.map((v, i) => xs[i] * v * v));
  const xpm = integ(fp.map((v, i) => xs[i] * v * fm[i]));       // ⟨ψ+|X|ψ−⟩（未归一）
  return { xs, f, fp, fm, N, Np, Nm, cross, xmean, xp, xm, xpm, Pi: (Np - Nm) / N };
}

// ---------- 补充材料 G_II：二维无限深势阱 ----------
// 以 π²ħ²/(2ma²) 为能量单位：ε(n,p) = n² + p² (a/b)²
export function wellLevels(ratio, nmax = 12, count = 14, tol = 1e-9) {
  const r2 = 1 / (ratio * ratio), st = [];             // ratio = b/a
  for (let n = 1; n <= nmax; n++) for (let p = 1; p <= nmax; p++) st.push({ n, p, e: n * n + p * p * r2 });
  st.sort((u, v) => u.e - v.e || u.n - v.n);
  const levels = [];
  for (const s of st) {
    const L = levels[levels.length - 1];
    if (L && Math.abs(L.e - s.e) < tol * Math.max(1, s.e)) L.states.push(s); else levels.push({ e: s.e, states: [s] });
  }
  for (const L of levels) {
    const pairs = L.states.every(s => L.states.some(t => t.n === s.p && t.p === s.n));
    L.kind = L.states.length === 1 ? "single" : (Math.abs(ratio - 1) < 1e-12 && L.states.length === 2 && pairs) ? "systematic" : (Math.abs(ratio - 1) < 1e-12 && L.states.every(s => L.states.some(t => t.n === s.p && t.p === s.n)) ? "mixed" : "accidental");
  }
  return levels.slice(0, count);
}
// 本征函数（不归一的形状）：sin(nπx/a) sin(pπy/b)，x∈[0,a]、y∈[0,b]，以 a = 1
export const phi2d = (n, p, ratio) => (x, y) => Math.sin(n * Math.PI * x) * Math.sin(p * Math.PI * y / ratio);
