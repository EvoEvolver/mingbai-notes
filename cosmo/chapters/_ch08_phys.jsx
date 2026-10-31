// 第 8 章数值工具（纯函数，无 React）。单位：长度 Mpc（c = 1），k 以 Mpc^-1 计。
// 已用 node 核对（见交付报告）：Φ 大尺度 → 0.9（8.31）；辐射期 Φ 与 (8.46) 一致；δ_c 对数增长与 (8.52)、Meszaros 匹配解 (8.64)–(8.65)；
// D+/a(1) ≈ 0.78（ΩΛ=0.69）；EH98 转移函数 + (8.8) 给出 σ8 ≈ 0.82（原书 0.811）。

// ---------- 原书附录 B 的基准宇宙学（Planck 2018） ----------
export const FID = { h: 0.677, Om: 0.3106, Obh2: 0.022447, Och2: 0.11928, ns: 0.9682, lnAs: 3.048, kp: 0.05, OL: 0.6894 };
export const C_KMS = 299792.458;
export const H0of = h => h * 100 / C_KMS;                 // H0 [Mpc^-1]
export const Orh2 = 4.15e-5;                               // (2.85)：Ω_r h^2（光子 + 无质量中微子）

// 背景：返回 {H0, Om, Or, OL, w, aeq, keq, conformal Hubble 𝓗(a)=aH, η(a)}
export function cosmo({ h = FID.h, Om = FID.Om, OL = null, w = -1, rad = true } = {}) {
  const H0 = H0of(h), Or = rad ? Orh2 / (h * h) : 0, ODE = OL == null ? 1 - Om - Or : OL;
  const aeq = Orh2 / (Om * h * h);                         // (2.86)
  const keq = Math.sqrt(2 * Om * H0 * H0 / aeq);           // (8.70)/(8.87)
  const E2 = a => Om / a ** 3 + Or / a ** 4 + ODE * a ** (-3 * (1 + w)) + (1 - Om - Or - ODE) / (a * a);
  const H = a => H0 * Math.sqrt(E2(a));
  const cH = a => a * H(a);
  return { h, H0, Om, Or, OL: ODE, w, aeq, keq, E2, H, cH };
}
// 共形时间 η(a)（对 ln a 积分）
export function etaOf(c, a) {
  if (a <= 1e-12) return 0;
  const a0 = 1e-10, n = 600, x0 = Math.log(a0), x1 = Math.log(a);
  let s = a0 / (c.H0 * Math.sqrt(c.Or + c.Om * a0)) ;     // 极早期 a≪a_eq：η ≈ a/(H0√Ωr)
  if (c.Or === 0) s = 2 * Math.sqrt(a0) / (c.H0 * Math.sqrt(c.Om));
  const hh = (x1 - x0) / n; let acc = 0;
  for (let i = 0; i <= n; i++) { const aa = Math.exp(x0 + i * hh), f = 1 / c.cH(aa); acc += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
  return s + acc * hh / 3;
}
// 仅含物质 + 辐射时的解析 η(a)
export const etaMR = (c, a) => 2 * (Math.sqrt(a + c.aeq) - Math.sqrt(c.aeq)) / (c.H0 * Math.sqrt(c.Om));

// ---------- 自适应 RK45（Dormand–Prince）----------
const DP = {
  c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1],
  a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9], [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]],
  b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0],
  e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40],
};
export function rk45(f, y0, x0, x1, { rtol = 1e-7, atol = 1e-10, h0 = 1e-3, hmax = Infinity, onStep, maxSteps = 400000 } = {}) {
  let x = x0, y = y0.slice(), h = h0; const n = y.length; let steps = 0;
  while (x < x1 && steps < maxSteps) {
    if (x + h > x1) h = x1 - x;
    const K = [];
    for (let s = 0; s < 7; s++) {
      const yy = y.slice();
      for (let j = 0; j < s; j++) { const c = DP.a[s][j]; if (c) for (let i = 0; i < n; i++) yy[i] += h * c * K[j][i]; }
      K.push(f(x + DP.c[s] * h, yy));
    }
    const yn = y.slice(); let err = 0;
    for (let i = 0; i < n; i++) {
      let s = 0, e = 0; for (let j = 0; j < 7; j++) { s += DP.b[j] * K[j][i]; e += DP.e[j] * K[j][i]; }
      yn[i] += h * s; const sc = atol + rtol * Math.max(Math.abs(y[i]), Math.abs(yn[i])); err = Math.max(err, Math.abs(h * e) / sc);
    }
    if (err <= 1 || h < 1e-12) { x += h; y = yn; steps++; onStep && onStep(x, y); }
    const fac = err === 0 ? 5 : Math.min(5, Math.max(0.2, 0.9 * Math.pow(err, -0.2)));
    h = Math.min(h * fac, hmax);
  }
  return { x, y, steps };
}

// ---------- 8.1.2 的五方程组：δc、uc、Θr0、Θr1、Φ（Ψ = −Φ，无重子，光子+中微子合并为单一辐射流体）----------
// 变量 U ≡ i u_c（实数）。自变量 x = ln a。物质全部当作 CDM（ρ_c → ρ_m），辐射 Ω_r 含中微子。
// 阶段 1（kη < 1）：用 (8.14) 演化 Φ；阶段 2：Φ 由代数式 (8.15) 给出，Φ' 由二者之差（0i 分量）给出；
// 阶段 3（kη > 200 且 a > 10 a_eq）：按习题 8.2 的建议停止跟踪辐射矩（视界内辐射扰动只振荡、对物质无贡献）。
export function solveMode(k, { c = cosmo(), a0 = 1e-9, a1 = 1, nOut = 240, rtol = 1e-6, dropRad = true } = {}) {
  const A = 1.5 * c.H0 * c.H0, Om = c.Om, Or = c.Or;
  const S = (a, Y, rad) => [A * (Om * Y[1] / a + (rad ? 4 * Or * Y[3] / (a * a) : 0)), A * (Om * Y[2] / a + (rad ? 4 * Or * Y[4] / (a * a) : 0))];
  const phiAlg = (a, Y, rad) => { const h = c.cH(a), [S0, S1] = S(a, Y, rad); return (S0 + 3 * h * S1 / k) / (k * k); };
  const f1 = (x, Y) => {
    const a = Math.exp(x), h = c.cH(a), [S0] = S(a, Y, true);
    const dphi = (S0 - k * k * Y[0]) / (3 * h) - h * Y[0];
    return [dphi / h, (-k * Y[2] - 3 * dphi) / h, (-h * Y[2] - k * Y[0]) / h, (-k * Y[4] - dphi) / h, (k / 3) * (Y[3] - Y[0]) / h, 1 / h];
  };
  const f2 = rad => (x, Y) => {
    const a = Math.exp(x), h = c.cH(a), [, S1] = S(a, Y, rad), phi = phiAlg(a, Y, rad);
    const dphi = -S1 / k - h * phi;
    return [0, (-k * Y[2] - 3 * dphi) / h, (-h * Y[2] - k * phi) / h, rad ? (-k * Y[4] - dphi) / h : 0, rad ? (k / 3) * (Y[3] - phi) / h : 0, 1 / h];
  };
  const a0c = c.cH(a0);
  let Y = [1, 1.5, -k / (2 * a0c), 0.5, -k / (6 * a0c), etaOf(c, a0)];
  const xs = Math.log(a0), xe = Math.log(a1);
  const grid = Array.from({ length: nOut }, (_, i) => xs + (xe - xs) * i / (nOut - 1));
  const out = { a: [], phi: [], delta: [], kEta: [], steps: 0 };
  let gi = 0, xPrev = xs, yPrev = Y.slice(), pPrev = 1;
  const rec = (x, Yn, phiNow) => {
    while (gi < grid.length && grid[gi] <= x + 1e-12) {
      const t = x === xPrev ? 1 : (grid[gi] - xPrev) / (x - xPrev);
      out.a.push(Math.exp(grid[gi])); out.phi.push(pPrev + (phiNow - pPrev) * t);
      out.delta.push(yPrev[1] + (Yn[1] - yPrev[1]) * t); out.kEta.push(k * (yPrev[5] + (Yn[5] - yPrev[5]) * t)); gi++;
    }
    xPrev = x; yPrev = Yn.slice(); pPrev = phiNow;
  };
  rec(xs, Y, 1);
  // 阶段 1：到 kη = 1（或终点）
  let x = xs;
  const xSwitch1 = (() => { const target = 1 / k; if (Y[5] >= target) return xs; let lo = xs, hi = xe; if (etaOf(c, Math.exp(hi)) < target) return xe; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (etaOf(c, Math.exp(m)) < target) lo = m; else hi = m; } return hi; })();
  let r = rk45(f1, Y, x, xSwitch1, { rtol, atol: 1e-12, h0: 1e-3, hmax: 0.05, onStep: (xx, Yn) => rec(xx, Yn, Yn[0]) });
  x = r.x; Y = r.y; out.steps += r.steps;
  // 阶段 2：代数 Φ，跟踪辐射，直到 kη > 200 且 a > 10 a_eq
  if (x < xe) {
    let xDrop = xe;
    if (dropRad) {
      const xa = Math.log(10 * c.aeq), target = 200 / k;
      let lo = xs, hi = xe;
      if (etaOf(c, Math.exp(hi)) > target) { for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (etaOf(c, Math.exp(m)) < target) lo = m; else hi = m; } xDrop = Math.min(xe, Math.max(hi, xa)); }
    }
    const fr = f2(true);
    r = rk45(fr, Y, x, Math.max(x, xDrop), { rtol, atol: 1e-12, h0: 1e-3, hmax: 0.05, onStep: (xx, Yn) => rec(xx, Yn, phiAlg(Math.exp(xx), Yn, true)), maxSteps: 2e6 });
    x = r.x; Y = r.y; out.steps += r.steps;
    if (x < xe) {
      const fm = f2(false);
      r = rk45(fm, Y, x, xe, { rtol, atol: 1e-12, h0: 1e-3, hmax: 0.05, onStep: (xx, Yn) => rec(xx, Yn, phiAlg(Math.exp(xx), Yn, false)) });
      out.steps += r.steps;
    }
  }
  return out;
}

// ---------- 解析结果 ----------
export const phiSuper = y => (y < 1e-3 ? 1 - y / 16 : (16 * Math.sqrt(1 + y) + 9 * y ** 3 + 2 * y * y - 8 * y - 16) / (10 * y ** 3));   // (8.31)，Φ/Φ(0)
export const j1x = x => (x < 1e-3 ? 1 / 3 - x * x / 30 : (Math.sin(x) - x * Math.cos(x)) / x ** 3);
export const phiRad = kEta => 3 * j1x(kEta / Math.sqrt(3));   // (8.46) 除以 Φ(0)=2R/3
export const Dplus = y => y + 2 / 3;                          // (8.60)（以 a_eq 为单位）
export const Dminus = y => (y + 2 / 3) * Math.log((Math.sqrt(1 + y) + 1) / (Math.sqrt(1 + y) - 1)) - 2 * Math.sqrt(1 + y);   // (8.63)
export const dDplus = () => 1;
export const dDminus = y => { const s = Math.sqrt(1 + y); return Math.log((s + 1) / (s - 1)) + (y + 2 / 3) * (-1 / (y * s)) - 1 / s; };
// y_H = a_H/a_eq（习题 8.6）：a_H H(a_H) = k
export const yHof = (k, keq) => { const e = keq * keq / (2 * k * k); return (e + Math.sqrt(e * e + 4 * e)) / 2; };
// Meszaros 匹配 (8.65)：返回 (C1, C2)，以 AR 为单位
export function meszarosMatch(yH, ym, B) {
  const L = Math.log(B * ym / yH), Dp = Dplus(ym), Dm = Dminus(ym), dDp = 1, dDm = dDminus(ym), det = Dp * dDm - dDp * Dm;
  return [(dDm * L - Dm / ym) / det, (Dp / ym - dDp * L) / det];
}
// (8.69) 与 (8.71)
export const Tsmall = (k, keq, A = 6.4, B = 0.44) => (15 / 4) * (1 / 2) * (keq * keq / (k * k)) * A * Math.log(4 * B * Math.exp(-3) * Math.SQRT2 * k / keq);
export const Tsmall871 = (k, keq) => 12.0 * keq * keq / (k * k) * Math.log(0.12 * k / keq);

// ---------- Eisenstein & Hu (1998) 转移函数（含重子；k 以 Mpc^-1）----------
export function ehTransfer(k, { h = FID.h, Om = FID.Om, fb = FID.Obh2 / (FID.Om * FID.h ** 2), Tcmb = 2.7255 } = {}) {
  const omh2 = Om * h * h, obh2 = fb * omh2, och2 = omh2 - obh2, th = Tcmb / 2.7, fc = 1 - fb;
  if (fb < 1e-6) return ehZeroBaryon(k, { h, Om, Tcmb });
  const zeq = 2.5e4 * omh2 / th ** 4, keqE = 7.46e-2 * omh2 / (th * th);
  const b1 = 0.313 * omh2 ** -0.419 * (1 + 0.607 * omh2 ** 0.674), b2 = 0.238 * omh2 ** 0.223;
  const zd = 1291 * omh2 ** 0.251 / (1 + 0.659 * omh2 ** 0.828) * (1 + b1 * obh2 ** b2);
  const Rf = z => 31.5 * obh2 / th ** 4 * (1000 / z);
  const Req = Rf(zeq), Rd = Rf(zd);
  const s = 2 / (3 * keqE) * Math.sqrt(6 / Req) * Math.log((Math.sqrt(1 + Rd) + Math.sqrt(Rd + Req)) / (1 + Math.sqrt(Req)));
  const ksilk = 1.6 * obh2 ** 0.52 * omh2 ** 0.73 * (1 + (10.4 * omh2) ** -0.95);
  const q = k / (13.41 * keqE);
  const a1 = (46.9 * omh2) ** 0.670 * (1 + (32.1 * omh2) ** -0.532), a2 = (12.0 * omh2) ** 0.424 * (1 + (45.0 * omh2) ** -0.582);
  const ac = a1 ** -fb * a2 ** -(fb ** 3);
  const bb1 = 0.944 / (1 + (458 * omh2) ** -0.708), bb2 = (0.395 * omh2) ** -0.0266;
  const bc = 1 / (1 + bb1 * (fc ** bb2 - 1));
  const T0 = (q, a, b) => { const C = 14.2 / a + 386 / (1 + 69.9 * q ** 1.08), L = Math.log(Math.E + 1.8 * b * q); return L / (L + C * q * q); };
  const f = 1 / (1 + (k * s / 5.4) ** 4);
  const Tc = f * T0(q, 1, bc) + (1 - f) * T0(q, ac, bc);
  const y = (1 + zeq) / (1 + zd), Gy = y * (-6 * Math.sqrt(1 + y) + (2 + 3 * y) * Math.log((Math.sqrt(1 + y) + 1) / (Math.sqrt(1 + y) - 1)));
  const ab = 2.07 * keqE * s * (1 + Rd) ** -0.75 * Gy;
  const bnode = 8.41 * omh2 ** 0.435, bbet = 0.5 + fb + (3 - 2 * fb) * Math.sqrt((17.2 * omh2) ** 2 + 1);
  const st = s / Math.cbrt(1 + (bnode / (k * s)) ** 3);
  const ks = k * st, j0 = ks < 1e-8 ? 1 : Math.sin(ks) / ks;
  const Tb = (T0(q, 1, 1) / (1 + (k * s / 5.2) ** 2) + ab / (1 + (bbet / (k * s)) ** 3) * Math.exp(-((k / ksilk) ** 1.4))) * j0;
  return fb * Tb + fc * Tc;
}
// 无重子极限（EH98 式 29 取 f_b=0：Γ=Ω_m h）
export function ehZeroBaryon(k, { h = FID.h, Om = FID.Om, Tcmb = 2.7255 } = {}) {
  const th = Tcmb / 2.7, q = k * th * th / (Om * h * h);
  const L = Math.log(2 * Math.E + 1.8 * q), C = 14.2 + 731 / (1 + 62.5 * q);
  return L / (L + C * q * q);
}

// ---------- 增长因子 ----------
// (8.75) 写成 ln a 的方程：D'' + (2 + dlnH/dlna) D' − (3/2) Ω_m H0²/(a³H²) D = 0（′ = d/dlna）
export function growth({ Om = FID.Om, OL = 1 - FID.Om, w = -1, a0 = 1e-3, n = 400 } = {}) {
  const OK = 1 - Om - OL, E2 = a => Om / a ** 3 + OL * a ** (-3 * (1 + w)) + OK / (a * a);
  const dlnE = a => (-3 * Om / a ** 3 - 3 * (1 + w) * OL * a ** (-3 * (1 + w)) - 2 * OK / (a * a)) / (2 * E2(a));
  const f = (x, [D, dD]) => { const a = Math.exp(x); return [dD, -(2 + dlnE(a)) * dD + 1.5 * Om / (a ** 3 * E2(a)) * D]; };
  const xs = Math.log(a0), h = -xs / n; let y = [a0, a0], x = xs; const A = [a0], D = [a0], F = [1];
  for (let i = 0; i < n; i++) {
    const k1 = f(x, y), k2 = f(x + h / 2, [y[0] + h / 2 * k1[0], y[1] + h / 2 * k1[1]]), k3 = f(x + h / 2, [y[0] + h / 2 * k2[0], y[1] + h / 2 * k2[1]]), k4 = f(x + h, [y[0] + h * k3[0], y[1] + h * k3[1]]);
    y = [y[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), y[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])]; x += h;
    A.push(Math.exp(x)); D.push(y[0]); F.push(y[1] / y[0]);
  }
  return { a: A, D, f: F, E2 };
}
// (8.77) 积分解
export function growthIntegral(a, { Om = FID.Om, OL = 1 - FID.Om, w = -1 } = {}) {
  const OK = 1 - Om - OL, E = x => Math.sqrt(Om / x ** 3 + OL * x ** (-3 * (1 + w)) + OK / (x * x));
  // ∫_0^a da'/(a'E)^3：小 a 时被积函数 ≈ a'^{3/2}/Ωm^{3/2}；换元 a' = u²
  const n = 400; let s = 0; const U = Math.sqrt(a), hh = U / n;
  for (let i = 0; i <= n; i++) { const u = i * hh, x = u * u; const g = i === 0 ? 0 : 2 * u / (x * E(x)) ** 3; s += g * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
  return 2.5 * Om * E(a) * s * hh / 3;
}
export const OmegaMa = (a, { Om = FID.Om, OL = 1 - FID.Om, w = -1 } = {}) => { const OK = 1 - Om - OL; return Om / a ** 3 / (Om / a ** 3 + OL * a ** (-3 * (1 + w)) + OK / (a * a)); };

// ---------- 功率谱 (8.8)、Δ² (8.9)、σ_R（习题 8.13）----------
// 返回 P_L(k) [Mpc^3]，k [Mpc^-1]；Tfun(k) 为转移函数，D 为 D+(a)
export function PL(k, { As = Math.exp(FID.lnAs) * 1e-10, ns = FID.ns, kp = FID.kp, Om = FID.Om, h = FID.h, D = 1, Tfun }) {
  const H0 = H0of(h), T = Tfun(k);
  return 8 * Math.PI ** 2 / 25 * As / (Om * Om) * D * D * T * T * k ** ns / (H0 ** 4 * kp ** (ns - 1));
}
export const Delta2 = (k, P) => k ** 3 * P / (2 * Math.PI ** 2);
export const Wth = x => (x < 1e-3 ? 1 - x * x / 10 : 3 * (Math.sin(x) - x * Math.cos(x)) / x ** 3);
// σ_R²=∫dlnk Δ²(k) W²(kR)；R 以 Mpc
export function sigmaR(R, Pk, { kmin = 1e-5, kmax = 1e2, n = 2000 } = {}) {
  const x0 = Math.log(kmin), x1 = Math.log(kmax), hh = (x1 - x0) / n; let s = 0;
  for (let i = 0; i <= n; i++) { const k = Math.exp(x0 + i * hh), g = Delta2(k, Pk(k)) * Wth(k * R) ** 2; s += g * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
  return Math.sqrt(s * hh / 3);
}
// k_NL：Δ²(k_NL)=1（对数二分）
export function kNL(Pk, { lo = 1e-3, hi = 50 } = {}) {
  const g = k => Delta2(k, Pk(k)) - 1; if (g(lo) > 0 || g(hi) < 0) return NaN;
  for (let i = 0; i < 80; i++) { const m = Math.sqrt(lo * hi); if (g(m) < 0) lo = m; else hi = m; } return Math.sqrt(lo * hi);
}
// 中微子自由流尺度 (8.83)，返回 h Mpc^-1
export const kfs = (a, mnu, { Om = FID.Om, OL = 1 - FID.Om } = {}) => 0.063 * (mnu / 0.1) * a * a * Math.sqrt(Om / a ** 3 + OL);
