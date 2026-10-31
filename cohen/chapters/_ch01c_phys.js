// 第 I 章补充材料交互图用到的数值函数（纯 JS，无 React 依赖；复制为 .mjs 后可用 node 单独测试）。
// 单位约定：A_I、C_I、H_I 的数值例子用 SI / eV / Å；波包演化（G_I、J_I）取 ħ = m = 1。

// ---------- 复数小工具 ----------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
export const cexp = a => { const r = Math.exp(a.re); return cx(r * Math.cos(a.im), r * Math.sin(a.im)); };
export const cscale = (a, s) => cx(a.re * s, a.im * s);
export const cabs2 = a => a.re * a.re + a.im * a.im;
export const cpow = (a, p) => { const r = Math.pow(Math.hypot(a.re, a.im), p), th = Math.atan2(a.im, a.re) * p; return cx(r * Math.cos(th), r * Math.sin(th)); };

// ---------- 物理常数（CODATA 2018）----------
export const H = 6.62607015e-34, HBAR = H / (2 * Math.PI), C = 2.99792458e8, EV = 1.602176634e-19, KB = 1.380649e-23;
export const ME = 9.1093837015e-31, MP = 1.67262192369e-27, MN = 1.67492749804e-27;
export const HBARC_EVA = 1973.269804;     // ħc [eV·Å]
export const E2_EVA = 14.39964548;        // e² = q²/4πε0 [eV·Å]
export const MEC2_EV = 510998.95;         // m_e c² [eV]

// =====================================================================
// A_I：德布罗意波长。Ek 为动能 [J]，m 为静质量 [kg]
// =====================================================================
export const pRel = (Ek, m) => Math.sqrt(Ek * Ek + 2 * Ek * m * C * C) / C;   // 由 (10)：E = Ek + mc² = √(p²c²+m²c⁴)
export const pNR = (Ek, m) => Math.sqrt(2 * m * Ek);                          // 由 E = p²/2m
export const lambdaRel = (Ek, m) => H / pRel(Ek, m);
export const lambdaNR = (Ek, m) => H / pNR(Ek, m);
export const lambdaThermal = (T, m) => H / Math.sqrt(3 * m * KB * T);         // 式 (4)
export const lambdaWrong = (Ek, m) => C * H / (Ek + m * C * C);               // 常见错误：λ = c/ν，ν = E/h（含静能）

// =====================================================================
// C_I：E(r0) = ħ²/(2 m r0²) − Z e²/r0；单位 eV、Å；mu = m/m_e
// =====================================================================
export const Tmin = (r0, mu = 1) => HBARC_EVA * HBARC_EVA / (2 * mu * MEC2_EV * r0 * r0);
export const Vbar = (r0, Z = 1) => -Z * E2_EVA / r0;
export const a0Of = (mu = 1, Z = 1) => HBARC_EVA * HBARC_EVA / (mu * MEC2_EV * Z * E2_EVA);    // 式 (6)：ħ²/(m e²)
export const E0Of = (mu = 1, Z = 1) => -mu * MEC2_EV * Z * Z * E2_EVA * E2_EVA / (2 * HBARC_EVA * HBARC_EVA);   // 式 (7)

// =====================================================================
// D_I：板的位置有高斯不确定度 σ（以条纹间距 i = λd/a 为单位），屏上条纹被抹平
// I(x) ∝ 1 + V cos(2πx/i)，V = exp(−2π²σ²)；区分路径所需 Δp ≪ |p2−p1| = h/i，而 Δp ≥ ħ/(2σ)
// =====================================================================
export const fringeVis = s => Math.exp(-2 * Math.PI * Math.PI * s * s);
export const dpOverSplit = s => 1 / (4 * Math.PI * s);    // (ħ/2σ)/(h/i)，σ 以 i 为单位

// =====================================================================
// G_I：高斯波包（ħ = m = 1）。式 (17) 解析解与式 (15) 的数值积分
// =====================================================================
export function gaussDensity(x, t, a, k0) {               // 式 (17)
  const s = 1 + 4 * t * t / Math.pow(a, 4), xc = k0 * t;
  return Math.sqrt(2 / (Math.PI * a * a)) / Math.sqrt(s) * Math.exp(-2 * a * a * (x - xc) ** 2 / (Math.pow(a, 4) + 4 * t * t));
}
export const gaussWidth = (t, a) => a / 2 * Math.sqrt(1 + 4 * t * t / Math.pow(a, 4));   // 式 (20)
// 式 (15) 的直接数值积分：ψ(x,t) = √a/(2π)^{3/4} ∫ e^{−a²(k−k0)²/4} e^{i[kx − k²t/2]} dk
export function gaussPsiNum(x, t, a, k0, n = 240) {
  const L = 6 / a, h = 2 * L / n; let re = 0, im = 0;
  for (let j = 0; j <= n; j++) {
    const k = k0 - L + j * h, w = (j === 0 || j === n) ? 1 : (j % 2 ? 4 : 2);
    const amp = Math.exp(-a * a * (k - k0) ** 2 / 4), ph = k * x - k * k * t / 2;
    re += w * amp * Math.cos(ph); im += w * amp * Math.sin(ph);
  }
  const f = Math.sqrt(a) / Math.pow(2 * Math.PI, 0.75) * h / 3;
  return cx(re * f, im * f);
}
// 式 (16-a) 的闭式复振幅（用于核对相位 φ 与 θ）
export function gaussPsiExact(x, t, a, k0) {
  const theta = 0.5 * Math.atan2(2 * t, a * a), phi = -theta - k0 * k0 * t / 2;
  const pref = Math.pow(2 * a * a / Math.PI, 0.25) / Math.pow(Math.pow(a, 4) + 4 * t * t, 0.25);
  const num = cx(-((x - k0 * t) ** 2), 0), den = cx(a * a, 2 * t);
  const ex = cdiv(num, den);
  return cmul(cx(pref * Math.cos(phi + k0 * x), pref * Math.sin(phi + k0 * x)), cexp(ex));
}
// 网格上的均值与方差（用于由数值解求 Δx）
export function moments(xs, ys) {
  let s0 = 0, s1 = 0, s2 = 0;
  for (let i = 1; i < xs.length; i++) {
    const h = xs[i] - xs[i - 1], y = (ys[i] + ys[i - 1]) / 2, x = (xs[i] + xs[i - 1]) / 2;
    s0 += y * h; s1 += x * y * h; s2 += x * x * y * h;
  }
  const m = s1 / s0; return { norm: s0, mean: m, sd: Math.sqrt(Math.max(0, s2 / s0 - m * m)) };
}

// =====================================================================
// H_I：方势（以 ħ = 2m = 1 的约化单位，或直接用 k、ρ 表示）
// =====================================================================
// 势阶 E > V0：式 (13)(14)(17)(18)
export const stepR = (k1, k2) => ((k1 - k2) / (k1 + k2)) ** 2;
export const stepT = (k1, k2) => 4 * k1 * k2 / (k1 + k2) ** 2;
// 方势垒的透射系数，e = E/V0，g = √(2mV0)·l/ħ（势垒"强度"）：式 (29)/(30)
export function barrierT(e, g) {
  if (e <= 0) return 0;
  if (Math.abs(e - 1) < 1e-9) return 1 / (1 + g * g / 4);       // E = V0 的极限
  if (e > 1) { const s = Math.sin(g * Math.sqrt(e - 1)); return 4 * e * (e - 1) / (4 * e * (e - 1) + s * s); }
  const s = Math.sinh(g * Math.sqrt(1 - e)); return 4 * e * (1 - e) / (4 * e * (1 - e) + s * s);
}
// 由矩阵匹配直接数值求 A1、A1'（A3 = 1，A3' = 0），用来核对式 (27)
export function barrierAmps(k1, k2, l) {
  // 在 x = l：A2 e^{ik2 l} + A2' e^{−ik2 l} = e^{ik1 l}；ik2(A2 e^{ik2 l} − A2' e^{−ik2 l}) = ik1 e^{ik1 l}
  const E1 = cexp(cx(0, k1 * l)), Ep = cexp(cx(0, k2 * l)), Em = cexp(cx(0, -k2 * l));
  const A2 = cdiv(cscale(E1, (1 + k1 / k2) / 2), Ep), A2p = cdiv(cscale(E1, (1 - k1 / k2) / 2), Em);
  // 在 x = 0：A1 + A1' = A2 + A2'；k1(A1 − A1') = k2(A2 − A2')
  const s = cadd(A2, A2p), d = cscale(csub(A2, A2p), k2 / k1);
  return { A1: cscale(cadd(s, d), 0.5), A1p: cscale(csub(s, d), 0.5), A2, A2p };
}
// 有限深方势阱的束缚态：u0 = k0 a。返回 [{n, parity, z = ka/2, eps = E/V0（−1…0）}]
export function wellLevels(u0) {
  const out = [], R = u0 / 2;
  if (!(R > 0)) return out;
  for (let n = 1; (n - 1) * Math.PI / 2 < R; n++) {
    const even = n % 2 === 1, lo = (n - 1) * Math.PI / 2, hi = Math.min(n * Math.PI / 2, R);
    // 偶：cos z = z/R（在 (nπ, nπ+π/2) 中 tan>0），奇：|sin z| = z/R（tan<0）
    const f = even ? z => Math.abs(Math.cos(z)) - z / R : z => Math.abs(Math.sin(z)) - z / R;
    let a = lo + 1e-12, b = hi - 1e-12;
    if (f(a) * f(b) > 0) { if (hi === R) { b = R; } else continue; }
    for (let i = 0; i < 100; i++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; }
    const z = (a + b) / 2, kk = 2 * z / u0;      // k/k0
    out.push({ n, parity: even ? "even" : "odd", z, ka: 2 * z, eps: -(1 - kk * kk) });
  }
  return out;
}
// 束缚态波函数（未归一化，x 以 a 为单位，阱在 |x| < 1/2）
export function wellPsi(x, lev, u0) {
  const k = lev.ka, rho = u0 * Math.sqrt(Math.max(0, 1 - (k / u0) ** 2));   // 以 1/a 为单位
  const even = lev.parity === "even", inside = even ? Math.cos(k * x) : Math.sin(k * x);
  if (Math.abs(x) <= 0.5) return inside;
  const edge = even ? Math.cos(k / 2) : Math.sin(k / 2) * Math.sign(x);
  return edge * Math.exp(-rho * (Math.abs(x) - 0.5));
}
// 直接核对式 (40)(41)：给定 ρ、k、a、B1=1，算 A2、A2'、B3、B3'
export function wellAmps(rho, k, a) {
  const B1 = cx(1);
  const A2 = cmul(cexp(cx(-rho * a / 2, k * a / 2)), cdiv(cx(rho, k), cx(0, 2 * k)));
  const A2p = cscale(cmul(cexp(cx(-rho * a / 2, -k * a / 2)), cdiv(cx(rho, -k), cx(0, 2 * k))), -1);
  const B3 = cmul(cdiv(cx(Math.exp(-rho * a), 0), cx(0, 4 * k * rho)), csub(cmul(cpow(cx(rho, k), 2), cexp(cx(0, k * a))), cmul(cpow(cx(rho, -k), 2), cexp(cx(0, -k * a)))));
  const B3p = cx((rho * rho + k * k) / (2 * k * rho) * Math.sin(k * a));
  return { B1, A2, A2p, B3, B3p };
}

// =====================================================================
// J_I：势阶上的波包（ħ = m = 1，K0 = √(2V0) 取 1 ⇒ V0 = 1/2）
// 定态（A1 = 1）：x<0：e^{ikx} + r(k) e^{−ikx}；x>0：τ(k) e^{iqx}（k>K0）或 τ(k) e^{−ρx}（k<K0）
// =====================================================================
export function stepAmps(k, K0) {
  if (k > K0) { const q = Math.sqrt(k * k - K0 * K0); return { r: cx((k - q) / (k + q)), t: cx(2 * k / (k + q)), q, rho: 0 }; }
  const rho = Math.sqrt(K0 * K0 - k * k);
  return { r: cdiv(cx(k, -rho), cx(k, rho)), t: cdiv(cx(2 * k), cx(k, rho)), q: 0, rho };   // 式 (22)(23)
}
// 波包 ψ(x,t) = (1/√2π) ∫ g(k) φ_k(x) e^{−ik²t/2} dk，g 为以 k0 为中心、宽 dk 的高斯（只取 k>0 部分）
// 返回网格 xs 上的 |ψ|²。pre：预先算好的 k 网格与振幅
export function stepPrep(k0, dk, K0, nk = 260) {
  const lo = Math.max(1e-4, k0 - 5 * dk), hi = k0 + 5 * dk, h = (hi - lo) / nk, ks = [];
  for (let j = 0; j <= nk; j++) {
    const k = lo + j * h, w = ((j === 0 || j === nk) ? 1 : (j % 2 ? 4 : 2)) * h / 3;
    // g(k) = (2π)^{1/4}/√(… ) 归一化：∫|g|² dk = 1，g = (2π dk²)^{−1/4} e^{−(k−k0)²/(4dk²)}
    const g = Math.pow(2 * Math.PI * dk * dk, -0.25) * Math.exp(-((k - k0) ** 2) / (4 * dk * dk));
    ks.push({ k, w: w * g / Math.sqrt(2 * Math.PI), ...stepAmps(k, K0) });
  }
  return ks;
}
export function stepPsi2(x, t, ks) {
  let re = 0, im = 0;
  for (const s of ks) {
    const ph = -s.k * s.k * t / 2;
    let fr, fi;
    if (x < 0) {
      const a = s.k * x + ph, b = -s.k * x + ph;
      fr = Math.cos(a) + s.r.re * Math.cos(b) - s.r.im * Math.sin(b);
      fi = Math.sin(a) + s.r.re * Math.sin(b) + s.r.im * Math.cos(b);
    } else if (s.q > 0) {
      const a = s.q * x + ph; fr = s.t.re * Math.cos(a) - s.t.im * Math.sin(a); fi = s.t.re * Math.sin(a) + s.t.im * Math.cos(a);
    } else {
      const e = Math.exp(-s.rho * x); fr = e * (s.t.re * Math.cos(ph) - s.t.im * Math.sin(ph)); fi = e * (s.t.re * Math.sin(ph) + s.t.im * Math.cos(ph));
    }
    re += s.w * fr; im += s.w * fi;
  }
  return re * re + im * im;
}
export const stepDelay = (k0, K0) => 2 / (k0 * Math.sqrt(K0 * K0 - k0 * k0));    // 式 (10)，ħ = m = 1
