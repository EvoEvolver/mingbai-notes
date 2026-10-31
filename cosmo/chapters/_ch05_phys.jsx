// 第 5 章交互图用到的数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。

// Legendre 多项式 P_l(x)，用 Bonnet 递推 (n+1)P_{n+1} = (2n+1) x P_n − n P_{n−1}
export function legendre(l, x) {
  if (l === 0) return 1;
  let p0 = 1, p1 = x;
  for (let n = 1; n < l; n++) { const p2 = ((2 * n + 1) * x * p1 - n * p0) / (n + 1); p0 = p1; p1 = p2; }
  return p1;
}
// P_l 在 (−1,1) 内的零点个数（数值计数，用于验证"P_l 恰有 l 个零点"）
export function countZeros(l, n = 4001) {
  let c = 0, prev = legendre(l, -1 + 1 / n);
  for (let i = 1; i < n; i++) { const v = legendre(l, -1 + (2 * i + 1) / n); if ((v < 0) !== (prev < 0)) c++; prev = v; }
  return c;
}

// 复数小工具
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const ipow = l => [[1, 0], [0, 1], [-1, 0], [0, -1]][((l % 4) + 4) % 4];     // i^l
export const mipow = l => ipow(-l);                                                  // (−i)^l = i^{−l}

// 按定义 (5.66) 数值计算多极矩：Θ_l = (−i)^{−l} ∫_{−1}^{1} dμ/2 P_l(μ) Θ(μ)
// theta(μ) 返回 [Re, Im]。Simpson 积分。
export function multipole(l, theta, n = 1200) {
  if (n % 2) n++;
  const h = 2 / n; let sr = 0, si = 0;
  for (let i = 0; i <= n; i++) {
    const mu = -1 + i * h, w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2, P = legendre(l, mu), t = theta(mu);
    sr += w * P * t[0]; si += w * P * t[1];
  }
  const I = [sr * h / 3 / 2, si * h / 3 / 2];
  return cmul(ipow(l), I);            // 1/(−i)^l = i^l
}
// 由多极矩重建：Θ(μ) = Σ_l (−i)^l (2l+1) Θ_l P_l(μ)
export function rebuild(mu, thl) {
  let re = 0, im = 0;
  thl.forEach((t, l) => { const c = cmul(mipow(l), t), P = (2 * l + 1) * legendre(l, mu); re += c[0] * P; im += c[1] * P; });
  return [re, im];
}

// 球 Bessel 函数 j_l(x)（参考值：Miller 向下递推，用 j_0 归一）
export function sphj(l, x) {
  if (Math.abs(x) < 1e-8) return l === 0 ? 1 : 0;
  const j0 = Math.sin(x) / x;
  if (l === 0) return j0;
  if (x > l) {      // 向上递推稳定
    let a = j0, b = Math.sin(x) / (x * x) - Math.cos(x) / x;
    for (let n = 1; n < l; n++) { const c = (2 * n + 1) / x * b - a; a = b; b = c; }
    return b;
  }
  const N = l + Math.ceil(Math.sqrt(40 * l)) + 30;
  let jp = 0, j = 1e-30, out = 0;
  for (let n = N; n > 0; n--) { const jm = (2 * n + 1) / x * j - jp; jp = j; j = jm; if (n - 1 === l) out = j; if (Math.abs(j) > 1e250) { j *= 1e-250; jp *= 1e-250; out *= 1e-250; } }
  return out * j0 / j;
}

// ---- 紧耦合声学振荡玩具模型（Ψ、Φ、R 取常数，忽略 ℋR 项与四极矩）----
// 由 (5.35) 的单极、偶极矩与 (5.72) 在 τ' → −∞ 时：Θ0' = −kΘ1，Θ1' = kΘ0/[3(1+R)] + kΨ/3
// ⇒ Θ0'' + k² c_s² Θ0 = −k²Ψ/3，c_s² = 1/[3(1+R)]
export const cs = R => 1 / Math.sqrt(3 * (1 + R));
export function acousticExact(x, R, Psi, th0) {   // x = kη，初始 Θ1(0) = 0
  return (th0 + (1 + R) * Psi) * Math.cos(cs(R) * x) - (1 + R) * Psi;
}
export function acousticRK4(xmax, R, Psi, th0, n = 2000) {
  const f = y => [-y[1], y[0] / (3 * (1 + R)) + Psi / 3];   // y = [Θ0, Θ1]，自变量 kη
  const h = xmax / n, out = [[0, th0]]; let y = [th0, 0];
  for (let i = 0; i < n; i++) {
    const k1 = f(y), k2 = f(y.map((v, j) => v + h / 2 * k1[j])), k3 = f(y.map((v, j) => v + h / 2 * k2[j])), k4 = f(y.map((v, j) => v + h * k3[j]));
    y = y.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    out.push([(i + 1) * h, y[0]]);
  }
  return out;
}
