// 第 6 章数值函数（纯 JS，无 React）。单位 H0 = 1（η 以 1/H0 为单位，k 以 H0 为单位）。
// 已用 node 核对：纯辐射宇宙中 h(kη) 与 j0(kη) 的最大偏差、纯物质宇宙中与 3 j1(kη)/(kη) 的最大偏差均 < 1e-6。

export const OMR_H2 = 4.15e-5;                 // Ω_r h²（光子 + 3 代无质量中微子），同第 2 章 (2.85)

// 球 Bessel 函数 j0、j1（小 x 用级数，避免相消误差）
export const j0 = x => (Math.abs(x) < 1e-3 ? 1 - x * x / 6 : Math.sin(x) / x);
export const j1 = x => (Math.abs(x) < 1e-2 ? x / 3 - x * x * x / 30 : Math.sin(x) / (x * x) - Math.cos(x) / x);
export const hRD = x => j0(x);                 // 辐射主导解（习题 6.12），h(0)=1
export const hMD = x => (Math.abs(x) < 1e-2 ? 1 - x * x / 10 : 3 * j1(x) / x);   // 物质主导解，h(0)=1

// 背景：平直宇宙，Ω_Λ = 1 − Ω_m − Ω_r；da/dη = a² E(a)，E = H/H0
export const Ea = (a, c) => Math.sqrt(c.Or / (a * a * a * a) + c.Om / (a * a * a) + c.OL);

// 求解张量模方程 (6.73)：h'' + 2(a'/a) h' + k² h = 0，初值 h=1、h'=0（超视界常数解）。
// 自变量为 η，状态 [a, h, h']；步长 dη = min(0.04/k, 0.02 η)，RK4。
// 返回 { eta:[], h:[], a:[], eta0 }（积分到 a = aEnd 或 η = etaEnd，取先到者；默认今天 a=1）。
export function tensorMode(k, c, { aEnd = 1, etaEnd = Infinity, etaStart } = {}) {
  const sr = Math.sqrt(c.Or);
  let eta = etaStart ?? Math.min(1e-6, 1e-3 / k);
  // 初值：无 Λ 时 a(η) = √Ω_r η + Ω_m η²/4 是精确解；h 用超视界级数 h ≈ 1 − (kη)²/6（RD）
  let a = sr * eta + c.Om * eta * eta / 4;
  const rd = c.Or > 0 ? 1 / 6 : 1 / 10;
  let h = 1 - rd * k * k * eta * eta, hp = -2 * rd * k * k * eta;
  const f = (e, s) => {
    const [A, H, Hp] = s, ap = A * A * Ea(A, c);      // a' = da/dη
    return [ap, Hp, -2 * (ap / A) * Hp - k * k * H];
  };
  const E = [eta], Hs = [h], As = [a];
  let s = [a, h, hp];
  for (let it = 0; it < 2e6 && s[0] < aEnd && eta < etaEnd; it++) {
    let dt = Math.min(0.04 / k, 0.02 * eta, etaEnd - eta);
    const k1 = f(eta, s), k2 = f(eta + dt / 2, s.map((v, i) => v + dt / 2 * k1[i])), k3 = f(eta + dt / 2, s.map((v, i) => v + dt / 2 * k2[i])), k4 = f(eta + dt, s.map((v, i) => v + dt * k3[i]));
    const n = s.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    if (n[0] > aEnd) {        // 最后一步按 a 线性插值到 aEnd
      const w = (aEnd - s[0]) / (n[0] - s[0]);
      eta += w * dt; s = s.map((v, i) => v + w * (n[i] - v));
    } else { eta += dt; s = n; }
    E.push(eta); Hs.push(s[1]); As.push(s[0]);
  }
  return { eta: E, h: Hs, a: As, eta0: eta };
}

// 今天的共形时间 η0 = ∫ da / (a² E(a))（以 1/H0 为单位）
export function eta0(c, aEnd = 1) {
  const n = 4000, u0 = Math.log(1e-9), u1 = Math.log(aEnd); let s = 0;
  for (let i = 0; i <= n; i++) {
    const u = u0 + (u1 - u0) * i / n, a = Math.exp(u), w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2;
    s += w * 1 / (a * Ea(a, c));         // da/(a²E) = du/(a E)
  }
  return s * (u1 - u0) / n / 3 + 1e-9 / Math.sqrt(c.Or);   // 加上 a<1e-9 的辐射段 a/√Ω_r
}

// 线性插值（xs 递增）
export function interp(xs, ys, x) {
  let lo = 0, hi = xs.length - 1;
  if (x <= xs[0]) return ys[0]; if (x >= xs[hi]) return ys[hi];
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] > x) hi = m; else lo = m; }
  const t = (x - xs[lo]) / (xs[hi] - xs[lo]); return ys[lo] + t * (ys[hi] - ys[lo]);
}

export const cosmo = (Om, h = 0.7) => { const Or = OMR_H2 / (h * h); return { Om, Or, OL: 1 - Om - Or }; };

// ---------- 规范变换（§6.2）：物质主导宇宙中的单个 Fourier 模 ----------
// 共形牛顿规范中 Ψ = 常数、Φ = −Ψ（无各向异性应力），B = E = 0。
// 取 ζ(η) = z·a·η、ξ(η) = x·η²（z、x 以 Ψ 为单位），由 (6.17)–(6.18)（MD：a'/a = 2/η）：
//   Â = Ψ − 3z，  k B̂ = kη(2x − z)，  D̂ = −Ψ − 2z，  k² Ê = (kη)² x
// Bardeen 变量 (6.19) 恒为 Φ_A = Ψ、Φ_H = Ψ。
export function gaugeMD(Psi, z, x, keta) {
  const A = Psi - 3 * z, kB = keta * (2 * x - z), D = -Psi - 2 * z, k2E = keta * keta * x;
  // 直接按 (6.19) 计算（用 a ∝ η²）：Φ_A = A + (1/a) d/dη[a(E' − B)]，Φ_H = −D + (a'/a)(B − E')
  // E' − B = 2xη − η(2x − z) = zη ⇒ (1/a) d/dη(a z η) = 3z；B − E' = −zη ⇒ (2/η)(−zη) = −2z
  const PhiA = A + 3 * z, PhiH = -D - 2 * z;
  return { A, kB, D, k2E, PhiA, PhiH };
}
export const GAUGES = {
  newton: { z: 0, x: 0 },                       // 共形牛顿：B = E = 0
  flat: { z: -0.5, x: 0 },                      // 空间平坦：D̂ = Ê = 0 ⇒ z = −Ψ/2
  sync: { z: 1 / 3, x: 1 / 6 },                 // 同步：Â = B̂ = 0 ⇒ z = Ψ/3，x = z/2
};
