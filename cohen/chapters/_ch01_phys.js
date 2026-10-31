// 第 I 章交互图用到的数值函数（纯 JS，无 React 依赖；复制为 .mjs 后可用 node 单独测试）。
// 单位约定：波包与散射部分取 ħ = m = 1（散射部分另以势垒高度 V0 为能量单位，见 scatter*）。

// ---------- 复数小工具 ----------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
export const cexp = a => { const r = Math.exp(a.re); return cx(r * Math.cos(a.im), r * Math.sin(a.im)); };
export const cabs2 = a => a.re * a.re + a.im * a.im;
export const csqrt = a => { const r = Math.hypot(a.re, a.im), re = Math.sqrt((r + a.re) / 2), im = Math.sign(a.im || 1) * Math.sqrt(Math.max(0, (r - a.re) / 2)); return cx(re, a.im === 0 && a.re < 0 ? Math.sqrt(-a.re) : im); };

// ---------- 可复现的伪随机数 ----------
export function mulberry32(seed) {
  return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// =====================================================================
// 1. 杨氏双缝（Fraunhofer 近似）：屏上坐标 u = x/(λL) 的无量纲形式
//    单缝振幅 E_j(u) = sinc(π a u) · e^{±iπ d u}（缝宽 a、缝距 d，以波长·距离为单位已吸收进 u）
//    I1 = I2 = sinc²(π a u)；两缝同开 I = |E1+E2|² = 4 sinc²(π a u) cos²(π d u)   —— 式 (A-3)–(A-5)
// =====================================================================
const sinc = z => (Math.abs(z) < 1e-9 ? 1 : Math.sin(z) / z);
export function slitField(u, a, d, which) {           // which: 1 或 2
  const s = sinc(Math.PI * a * u), ph = (which === 1 ? 1 : -1) * Math.PI * d * u;
  return cx(s * Math.cos(ph), s * Math.sin(ph));
}
// mode: "both"（两缝同开，不测路径）、"one"（只开 F1）、"which"（两缝同开但在缝后测路径 ⇒ 强度相加）
export function slitIntensity(u, a, d, mode) {
  const E1 = slitField(u, a, d, 1), E2 = slitField(u, a, d, 2);
  if (mode === "one") return cabs2(E1);
  if (mode === "which") return cabs2(E1) + cabs2(E2);
  return cabs2(cadd(E1, E2));
}
// 按强度分布逐个抽取光子落点（拒绝抽样；u ∈ [-U, U]），返回落点数组（固定种子 ⇒ 增加 N 时前面的点不变）
export function samplePhotons(n, a, d, mode, U, seed = 7) {
  const rnd = mulberry32(seed), out = [], Imax = mode === "one" ? 1 : mode === "which" ? 2 : 4;
  while (out.length < n) {
    const u = (2 * rnd() - 1) * U, y = rnd();
    if (rnd() * Imax <= slitIntensity(u, a, d, mode)) out.push([u, y]);
  }
  return out;
}

// =====================================================================
// 2. 偏振片上的单个光子（式 A-8、A-10）：每个光子以概率 cos²θ 通过
// =====================================================================
export function malusRun(n, theta, seed = 3) {
  const rnd = mulberry32(seed), p = Math.cos(theta) ** 2; let pass = 0; const seq = [];
  for (let i = 0; i < n; i++) { const ok = rnd() < p; pass += ok; if (i < 400) seq.push(ok); }
  return { pass, p, seq };
}

// =====================================================================
// 3. 波包的构造（式 C-8、C-10、C-12–C-16）：ψ(x,0) = (2π)^{-1/2} Σ g(k_j) e^{i k_j x} δk
//    g(k) = |g(k)| e^{iα(k)}，α(k) = −x0 (k−k0) + β (k−k0)²（β ≠ 0 ⇒ "啁啾"，波包变宽，ΔxΔk 增大）
// =====================================================================
export function packetComponents(mode, k0, dk, M) {
  // 返回 [{k, w}]，w 为实权重 |g(k)|·δk（离散叠加的系数）
  if (mode === "three") return [{ k: k0, w: 1 }, { k: k0 - dk / 2, w: 0.5 }, { k: k0 + dk / 2, w: 0.5 }];
  // 高斯 |g(k)|，半高全宽 = dk ⇒ σ = dk / (2√(2 ln 2))
  const s = dk / (2 * Math.sqrt(2 * Math.LN2)), out = [];
  const n = mode === "cont" ? 801 : M, span = mode === "cont" ? 6 * s : 2.4 * s;   // 有限 M 个波：等距铺在 k0 ± 2.4σ
  for (let j = 0; j < n; j++) {
    const k = n === 1 ? k0 : k0 - span + 2 * span * j / (n - 1);
    const dkj = n === 1 ? 1 : 2 * span / (n - 1);
    out.push({ k, w: Math.exp(-((k - k0) ** 2) / (2 * s * s)) * dkj });
  }
  return out;
}
export function packetPsi(comps, x, k0, x0 = 0, beta = 0, t = 0, disp = false) {
  let re = 0, im = 0;
  for (const { k, w } of comps) {
    const q = k - k0, ph = k * x - x0 * q + beta * q * q - (disp ? 0.5 * k * k * t : 0);   // 自由粒子 ω = k²/2（ħ = m = 1）
    re += w * Math.cos(ph); im += w * Math.sin(ph);
  }
  return cx(re / Math.sqrt(2 * Math.PI), im / Math.sqrt(2 * Math.PI));
}
// 数值测宽：半高全宽（对 |f|）与均方根宽度（对 |f|²）
export function widths(xs, f) {
  const a = xs.map(f), mx = Math.max(...a), half = mx / 2;
  const iMax = a.indexOf(mx);
  let l = iMax, r = iMax;
  while (l > 0 && a[l] > half) l--;
  while (r < a.length - 1 && a[r] > half) r++;
  const lin = (i, j) => xs[i] + (half - a[i]) * (xs[j] - xs[i]) / (a[j] - a[i]);
  const fwhm = (r > iMax && l < iMax) ? lin(r - 1, r) - lin(l, l + 1) : NaN;
  let s0 = 0, s1 = 0, s2 = 0;
  for (let i = 0; i < xs.length; i++) { const w = a[i] * a[i]; s0 += w; s1 += w * xs[i]; s2 += w * xs[i] * xs[i]; }
  const mean = s1 / s0, rms = Math.sqrt(Math.max(0, s2 / s0 - mean * mean));
  return { fwhm, rms, mean, peak: xs[iMax] };
}

// =====================================================================
// 4. 自由高斯波包（ħ = m = 1）：g(k) ∝ exp[−a²(k−k0)²/4]（补充材料 G_I 的约定）
//    解析解：ψ(x,t) = (2/πa²)^{1/4} (1+iτ)^{-1/2} e^{i(k0x−ω0t)} exp[−(x−v_G t)²/(a²(1+iτ))]，
//    τ = 2t/a²，ω0 = k0²/2，v_G = k0（= 2 v_φ，式 C-32），Δx(t) = (a/2)√(1+τ²)（|ψ|² 的均方根宽度）
// =====================================================================
export function gaussPsi(x, t, a, k0) {
  const tau = 2 * t / (a * a), vg = k0, w0 = 0.5 * k0 * k0;
  const den = cx(a * a, a * a * tau);                         // a²(1+iτ)
  const X = x - vg * t;
  const g = cdiv(cx(-X * X, 0), den);                         // −X²/(a²(1+iτ))
  const pre = cdiv(cx(Math.pow(2 / (Math.PI * a * a), 0.25), 0), csqrt(cx(1, tau)));
  return cmul(cmul(pre, cexp(cx(0, k0 * x - w0 * t))), cexp(g));
}
export const gaussWidth = (t, a) => (a / 2) * Math.sqrt(1 + (2 * t / (a * a)) ** 2);
// 直接数值积分 (C-7) 作为核对
export function gaussPsiNumeric(x, t, a, k0, n = 2000) {
  const s = 2 / a, L = 8 * s, h = 2 * L / n; let re = 0, im = 0;
  const norm = Math.sqrt(a) / Math.pow(2 * Math.PI, 0.25);   // ∫|g|²dk = 1
  for (let i = 0; i <= n; i++) {
    const k = k0 - L + i * h, w = (i === 0 || i === n ? 0.5 : 1) * h * norm * Math.exp(-a * a * (k - k0) ** 2 / 4);
    const ph = k * x - 0.5 * k * k * t; re += w * Math.cos(ph); im += w * Math.sin(ph);
  }
  return cx(re / Math.sqrt(2 * Math.PI), im / Math.sqrt(2 * Math.PI));
}

// =====================================================================
// 5. 一维方势（式 D-16、D-17）：分段常数势的定态散射，传递矩阵法
//    单位：ħ²/2m = 1，长度以 L 为单位（势垒/势阱宽度），能量以 V0 为单位时乘 g² ≡ 2mV0L²/ħ²
//    regions: [{x0, V}]（x0 为该区左端，第一个区从 −∞ 开始），E 为能量（同一单位）
//    返回 {T, R, coef}，coef[j] = {A, B, k}：区 j 中 φ = A e^{ik(x−x_j)} + B e^{−ik(x−x_j)}，k = √(E−V)（可为纯虚）
// =====================================================================
export function scatter(regions, E) {
  const n = regions.length;
  const ks = regions.map(r => csqrt(cx(E - r.V, 0)));
  // 从最右区出发：只有向右的透射波 A_n = 1, B_n = 0；向左逐个界面匹配 φ 与 φ'
  const coef = new Array(n);
  coef[n - 1] = { A: cx(1), B: cx(0), k: ks[n - 1] };
  for (let j = n - 2; j >= 0; j--) {
    const xb = regions[j + 1].x0;                      // 界面位置
    const kL = ks[j], kR = ks[j + 1], { A, B } = coef[j + 1];
    // 右区在界面处（x − x_{j+1} = 0）：φ = A + B，φ' = ik(A − B)
    const phi = cadd(A, B), dphi = cmul(cmul(cx(0, 1), kR), csub(A, B));
    // 左区以 x_j 为参考点（第一个区以界面为参考点）：φ = A' e^{ikL·Δ} + B' e^{−ikL·Δ}
    const ref = j === 0 ? xb : regions[j].x0, D = xb - ref;
    const ep = cexp(cmul(cx(0, 1), cmul(kL, cx(D)))), em = cexp(cmul(cx(0, -1), cmul(kL, cx(D))));
    const t = cdiv(dphi, cmul(cx(0, 1), kL));         // A'ep − B'em
    const Ap = cdiv(cmul(cx(0.5), cadd(phi, t)), ep), Bp = cdiv(cmul(cx(0.5), csub(phi, t)), em);
    coef[j] = { A: Ap, B: Bp, k: kL };
  }
  const k1 = ks[0], kn = ks[n - 1];
  const inc = cabs2(coef[0].A);
  const T = kn.im === 0 && kn.re > 0 && k1.re > 0 ? (kn.re / k1.re) / inc : 0;
  const R = cabs2(coef[0].B) / inc;
  return { T, R, coef, ks };
}
// 求区 j 中 φ(x)（归一化到入射波振幅 1）
export function scatterPhi(res, regions, x) {
  const n = regions.length; let j = 0;
  while (j < n - 1 && x >= regions[j + 1].x0) j++;
  const ref = j === 0 ? regions[1].x0 : regions[j].x0;
  const { A, B, k } = res.coef[j], D = x - ref;
  const phi = cadd(cmul(A, cexp(cmul(cx(0, 1), cmul(k, cx(D))))), cmul(B, cexp(cmul(cx(0, -1), cmul(k, cx(D))))));
  return cdiv(phi, res.coef[0].A);
}
// 三种势（能量以 V0 为单位：ε = E/V0；g² = 2mV0L²/ħ² ⇒ 以 L 为长度单位时势能 = g²·(V/V0)）
export function shape(kind, g) {
  const V = g * g;
  if (kind === "step") return [{ x0: -Infinity, V: 0 }, { x0: 0, V }];
  if (kind === "barrier") return [{ x0: -Infinity, V: 0 }, { x0: 0, V }, { x0: 1, V: 0 }];
  return [{ x0: -Infinity, V: 0 }, { x0: 0, V: -V }, { x0: 1, V: 0 }];        // well
}
// 解析公式（用于核对；补充材料 H_I 的结果）
export function analyticT(kind, eps, g) {
  if (kind === "step") { if (eps <= 1) return 0; const k1 = Math.sqrt(eps), k2 = Math.sqrt(eps - 1); return 4 * k1 * k2 / (k1 + k2) ** 2; }
  if (kind === "barrier") {
    if (eps > 1) { const s = Math.sin(g * Math.sqrt(eps - 1)); return 1 / (1 + s * s / (4 * eps * (eps - 1))); }
    if (eps < 1) { const s = Math.sinh(g * Math.sqrt(1 - eps)); return 1 / (1 + s * s / (4 * eps * (1 - eps))); }
    return 1 / (1 + g * g / 4);
  }
  const s = Math.sin(g * Math.sqrt(eps + 1)); return 1 / (1 + s * s / (4 * eps * (eps + 1)));
}
// 方势阱的束缚态（−1 < ε < 0）：偶宇称 q tan(q g/2) = κ，奇宇称 −q cot(q g/2) = κ，q = √(ε+1)，κ = √(−ε)（以 1/L·1/g 为单位）
export function wellBound(g) {
  const f = (eps, par) => { const q = Math.sqrt(eps + 1), K = Math.sqrt(-eps), z = q * g / 2; return par ? q * Math.sin(z) - K * Math.cos(z) : q * Math.cos(z) + K * Math.sin(z); };
  const out = [], N = 4000;
  for (const par of [1, 0]) {
    let e0 = -1 + 1e-9, f0 = f(e0, par);
    for (let i = 1; i <= N; i++) {
      const e1 = -1 + i / N * (1 - 2e-9), f1 = f(e1, par);
      if (f0 * f1 < 0) {
        let lo = e0, hi = e1; for (let it = 0; it < 80; it++) { const m = (lo + hi) / 2; if (f(m, par) * f(lo, par) <= 0) hi = m; else lo = m; }
        const r = (lo + hi) / 2, q = Math.sqrt(r + 1), z = q * g / 2;
        if (Math.abs(par ? Math.cos(z) : Math.sin(z)) > 1e-6) out.push(r);   // 排除 tan/cot 极点造成的伪根
      }
      e0 = e1; f0 = f1;
    }
  }
  return out.sort((a, b) => a - b);
}
// 天真的"驻波条件" x2−x1 = nλ/2（原书脚注 8 指出它不对）：q g = nπ ⇒ ε = (nπ/g)² − 1
export const naiveLevels = g => { const out = []; for (let n = 1; ; n++) { const e = (n * Math.PI / g) ** 2 - 1; if (e >= 0) break; out.push(e); } return out; };
