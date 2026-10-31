// 第 9 章数值工具（纯函数，无 React）。单位：长度 Mpc（c = 1），k 以 Mpc^-1 计。
// 内容：背景宇宙学、复合（tanh 型电离分数近似）、可见度函数、声视界、扩散阻尼尺度 (9.42)/(9.44)、
// 紧耦合简化 Boltzmann 求解器（光子–重子紧耦合流体 + CDM + 截断中微子层级，Ψ = −Φ），
// 复合后转为自由流光子以得到早期 ISW；球 Bessel 函数；C(l) 的半解析投影（Bessel 振荡平均核）。
// 这些都是**简化模型**，用于展示物理趋势；数值精度约 10–20%，不能代替 CAMB/CLASS。

// ---------- 基准宇宙学（原书附录 B，Planck 2018）----------
export const FID = { h: 0.677, obh2: 0.022447, och2: 0.11928, onh2: 0.000645, ns: 0.9682, As: Math.exp(3.048) * 1e-10, tau: 0.0543, OK: 0, Tcmb: 2.7255, YP: 0.245, kp: 0.05 };
export const OGH2 = 4.48e-7 * 2.7255 ** 4;               // Ω_γ h² ≈ 2.47e-5
export const ONUH2 = 3.046 * (7 / 8) * (4 / 11) ** (4 / 3) * OGH2;   // 无质量中微子
export const H100 = 100 / 299792.458;                     // H0/h [Mpc^-1] = 3.336e-4

// ---------- 背景 ----------
const _bgCache = new Map();
export function cosmo(p = {}) {
  const q = { ...FID, ...p };
  const key = [q.h, q.obh2, q.och2, q.OK, q.onh2].map(v => (+v).toPrecision(6)).join(",");
  if (_bgCache.has(key)) return _bgCache.get(key);
  const h = q.h, H0 = H100 * h, h2 = h * h;
  const Ob = q.obh2 / h2, Oc = q.och2 / h2, Onm = q.onh2 / h2, Om = Ob + Oc + Onm;
  const Og = OGH2 / h2, Onu = ONUH2 / h2, Or = Og + Onu, OK = q.OK, OL = 1 - Om - Or - OK;
  const aeq = Or / Om;
  const E = a => Math.sqrt(Om / a ** 3 + Or / a ** 4 + OK / (a * a) + OL);
  const cH = a => a * H0 * E(a);                           // a'/a = aH
  // η(a) 与 r_s(a) 表（对 ln a 积分）
  const N = 1400, x0 = Math.log(1e-9), x1 = 0, dx = (x1 - x0) / N;
  const X = [], ETA = [], RS = [];
  const Rof = a => 3 * Ob * a / (4 * Og);
  let eta = 1e-9 / (H0 * Math.sqrt(Or)), rs = eta / Math.sqrt(3);
  for (let i = 0; i <= N; i++) {
    const x = x0 + i * dx; X.push(x); ETA.push(eta); RS.push(rs);
    if (i === N) break;
    const f = xx => { const a = Math.exp(xx); return 1 / cH(a); };
    const g = xx => { const a = Math.exp(xx); return 1 / (cH(a) * Math.sqrt(3 * (1 + Rof(a)))); };
    eta += dx / 6 * (f(x) + 4 * f(x + dx / 2) + f(x + dx));
    rs += dx / 6 * (g(x) + 4 * g(x + dx / 2) + g(x + dx));
  }
  const interp = (arr, a) => { const x = Math.log(a); if (x <= x0) return arr[0] * a / 1e-9; const t = (x - x0) / dx, i = Math.min(N - 1, Math.floor(t)), u = t - i; return arr[i] + u * (arr[i + 1] - arr[i]); };
  const etaOf = a => interp(ETA, a), rsOf = a => interp(RS, a);
  const eta0 = ETA[N];
  // 共动角直径距离（\eqref{2.39} 的共动版）：S_K(χ)
  const SK = chi => { const s = Math.sqrt(Math.abs(OK)) * H0; if (Math.abs(OK) < 1e-7) return chi; return OK > 0 ? Math.sinh(s * chi) / s : Math.sin(s * chi) / s; };
  const c = { ...q, H0, Ob, Oc, Onm, Om, Og, Onu, Or, OK, OL, aeq, E, cH, etaOf, rsOf, eta0, Rof, SK, keq: aeq * H0 * E(aeq) };
  if (_bgCache.size > 60) _bgCache.clear();
  _bgCache.set(key, c);
  return c;
}

// ---------- 复合：Hu & Sugiyama (1996) 的 z* 拟合；tanh 型电离分数 ----------
export function zStarHS(obh2, omh2) {
  const g1 = 0.0783 * obh2 ** -0.238 / (1 + 39.5 * obh2 ** 0.763), g2 = 0.560 / (1 + 21.1 * obh2 ** 1.81);
  return 1048 * (1 + 0.00124 * obh2 ** -0.738) * (1 + g1 * omh2 ** g2);
}
// x_e(z)：每个重子的自由电子数 /(1−Y/2)。复合前 = 1；tanh 过渡；冻结余量 5e-4。
export const XE = { zr: 1277, dz: 180, floor: 5e-4 };   // 可见度峰 z≈1090、半高全宽 Δz≈200、x_e(z*)≈0.11
export const xeTanh = z => XE.floor + (1 - XE.floor) * 0.5 * (1 + Math.tanh((z - XE.zr) / XE.dz));
// n_e σ_T a [Mpc^-1]，全电离（9.43）：2.3e-5 Ω_b h² a^-2 (1−Y_P/2)
export const neSigmaTa = (a, c, xe = 1) => 2.304e-5 * c.obh2 * (1 - c.YP / 2) * xe / (a * a);

// 复合历史表：τ(η)、g(η)、k_D(η)（全电离与 tanh 两种）
const _recCache = new Map();
export function recHistory(c) {
  const key = [c.h, c.obh2, c.och2, c.OK].join(",");
  if (_recCache.has(key)) return _recCache.get(key);
  // 网格：a 从 1e-5 到 0.02（对数）
  const N = 2400, la0 = Math.log(1e-5), la1 = Math.log(0.02), d = (la1 - la0) / N;
  const A = [], ETA = [], TP = [], KD2 = [], KD2ion = [];
  let kd2 = 0, kd2ion = 0;
  const integrand = (a, xe) => { const R = c.Rof(a); return (R * R / (1 + R) + 8 / 9) / (6 * (1 + R) * neSigmaTa(a, c, xe)) / c.cH(a); };   // dη = d ln a /(aH)
  // 从 a=1e-9 到 1e-5 的全电离部分（解析近似可忽略，直接小步积分）
  { const n = 200, l0 = Math.log(1e-9), dd = (la0 - l0) / n; for (let i = 0; i < n; i++) { const l = l0 + (i + 0.5) * dd, a = Math.exp(l); const v = integrand(a, 1) * dd; kd2 += v; kd2ion += v; } }
  for (let i = 0; i <= N; i++) {
    const la = la0 + i * d, a = Math.exp(la), z = 1 / a - 1, xe = xeTanh(z);
    A.push(a); ETA.push(c.etaOf(a)); TP.push(-neSigmaTa(a, c, xe)); KD2.push(kd2); KD2ion.push(kd2ion);
    if (i < N) { const am = Math.exp(la + d / 2), zm = 1 / am - 1; kd2 += integrand(am, xeTanh(zm)) * d; kd2ion += integrand(am, 1) * d; }
  }
  // τ(η)：从 a=0.02 往回积（此后到今天的贡献在本模型中只来自再电离，单独处理）
  const TAU = new Array(N + 1).fill(0);
  for (let i = N - 1; i >= 0; i--) TAU[i] = TAU[i + 1] + 0.5 * (-TP[i] - TP[i + 1]) * (ETA[i + 1] - ETA[i]);
  const G = TP.map((t, i) => -t * Math.exp(-TAU[i]));
  let im = 0; for (let i = 1; i <= N; i++) if (G[i] > G[im]) im = i;
  // 归一化检查与可见度加权阻尼 (9.60) 的辅助量
  let gint = 0; for (let i = 0; i < N; i++) gint += 0.5 * (G[i] + G[i + 1]) * (ETA[i + 1] - ETA[i]);
  const r = { A, ETA, TP, TAU, G, KD2, KD2ion, aStar: A[im], zStar: 1 / A[im] - 1, etaStar: ETA[im], gint, kD2Star: KD2[im] };
  // (9.60)：∫dη g e^{-k²/k_D²(η)}
  r.dampAvg = k => { let s = 0; for (let i = 0; i < N; i++) { const e = 0.5 * (G[i] * Math.exp(-k * k * KD2[i]) + G[i + 1] * Math.exp(-k * k * KD2[i + 1])); s += e * (ETA[i + 1] - ETA[i]); } return s / gint; };
  if (_recCache.size > 60) _recCache.clear();
  _recCache.set(key, r);
  return r;
}
// (9.44)：k_D^{-2} = C a^{5/2} f_D(a/a_eq) (Ω_b h²)^{-1} (1−Y_P/2)^{-1} (Ω_m h²)^{-1/2}
export const fD = y => { const u = 1 + 1 / y; return 5 * Math.sqrt(u) - (20 / 3) * u ** 1.5 + (8 / 3) * (u ** 2.5 - y ** -2.5); };
// 由 (9.42)、(9.43) 直接推得的系数：(4/27)(2/5)/(2.304e-5 × 3.336e-4) ≈ 7.7e6 Mpc²；原书印作 3.1e6
export const KD_COEF_DERIVED = (4 / 27) * (2 / 5) / (2.304e-5 * H100);
export const kD944 = (a, c, coef = 3.1e6) => { const omh2 = c.Om * c.h * c.h; return 1 / Math.sqrt(coef * a ** 2.5 * fD(a / c.aeq) / (c.obh2 * (1 - c.YP / 2) * Math.sqrt(omh2))); };

// ---------- 自适应 RK45（Dormand–Prince）----------
const DP = {
  c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1],
  a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9], [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]],
  b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0],
  e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40],
};
export function rk45(f, y0, x0, x1, { rtol = 1e-6, atol = 1e-9, h0 = 1e-3, hmax = Infinity, onStep, maxSteps = 200000 } = {}) {
  let x = x0, y = y0.slice(), h = h0; const n = y.length; let steps = 0;
  const K = Array.from({ length: 7 }, () => new Array(n)), yy = new Array(n);
  while (x < x1 - 1e-14 && steps < maxSteps) {
    if (x + h > x1) h = x1 - x;
    for (let s = 0; s < 7; s++) {
      for (let i = 0; i < n; i++) { let v = y[i]; for (let j = 0; j < s; j++) { const cc = DP.a[s][j]; if (cc) v += h * cc * K[j][i]; } yy[i] = v; }
      const r = f(x + DP.c[s] * h, yy); for (let i = 0; i < n; i++) K[s][i] = r[i];
    }
    const yn = y.slice(); let err = 0;
    for (let i = 0; i < n; i++) {
      let s = 0, e = 0; for (let j = 0; j < 7; j++) { s += DP.b[j] * K[j][i]; e += DP.e[j] * K[j][i]; }
      yn[i] += h * s; const sc = atol + rtol * Math.max(Math.abs(y[i]), Math.abs(yn[i])); err = Math.max(err, Math.abs(h * e) / sc);
    }
    if (err <= 1 || h < 1e-10) { x += h; y = yn; steps++; onStep && onStep(x, y); }
    const fac = err === 0 ? 5 : Math.min(5, Math.max(0.2, 0.9 * Math.pow(err, -0.2)));
    h = Math.min(h * fac, hmax);
  }
  return { x, y, steps };
}

// ---------- 简化 Boltzmann 求解器 ----------
// 变量（实数）：0 Φ，1 δ_c，2 v_c≡i u_c，3 Θ0，4 Θ1（光子；紧耦合时 v_b = 3Θ1、δ_b = 3Θ0），
// 5..5+LN 中微子 N0..N_LN，最后为 η。复合后改为：δ_c,v_c, δ_b,v_b, 光子 Θ0..Θ_LG（自由流）, N0..N_LN。
// 引力势：Φ 由 00 分量（kη < 0.5）或代数式 k²Φ = S0 + 3aH S1/k 给出；Ψ 由各向异性应力方程
// k²(Φ+Ψ) = −32πGa²(ρ_γΘ2 + ρ_ν N2) 给出（紧耦合期 Θ2 = 0）。归一化 Φ(k, η→0) = 1。
// 原初关系：Φ(0) = (2/3)(1+2f_ν/5)/(1+4f_ν/15) 𝓡（f_ν = ρ_ν/ρ_r）；不计中微子时回到 \eqref{8.32} 前的 Φ = 2𝓡/3。
const LN = 5, LG = 5;
export const fNu = c => c.Onu / c.Or;
export const phi0PerR = c => { const f = fNu(c); return (2 / 3) * (1 + 0.4 * f) / (1 + 4 * f / 15); };
export function solveMode(k, c, rec, { aEnd = 0.03, nOut = 0, rtol = 1e-5, aOut = null, hist = null } = {}) {
  const A = 1.5 * c.H0 * c.H0, Ob = c.Ob, Oc = c.Oc + c.Onm, Og = c.Og, On = c.Onu, f = fNu(c);
  const aStar = rec.aStar;
  const iN = 5, nTC = 5 + LN + 1 + 1, ie = nTC - 1;
  const S0tc = (a, Y) => A * ((Oc * Y[1] + Ob * 3 * Y[3]) / a + 4 * (Og * Y[3] + On * Y[iN]) / (a * a));
  const S1tc = (a, Y) => A * ((Oc * Y[2] + Ob * 3 * Y[4]) / a + 4 * (Og * Y[4] + On * Y[iN + 1]) / (a * a));
  const psiTC = (a, Y, phi) => -phi - 8 * A * On * Y[iN + 2] / (k * k * a * a);     // 32πGa²ρ_ν = 8·(3/2)H0²Ω_ν/a²
  const hier = (Y, d, j0, L, psi, dphi, h, eta) => {   // 自由流层级 (9.11) 取 τ' = 0
    d[j0] = (-k * Y[j0 + 1] - dphi) / h;
    d[j0 + 1] = ((k / 3) * Y[j0] - (2 * k / 3) * Y[j0 + 2] + k * psi / 3) / h;
    for (let l = 2; l < L; l++) d[j0 + l] = (k / (2 * l + 1)) * (l * Y[j0 + l - 1] - (l + 1) * Y[j0 + l + 1]) / h;
    const nx = (2 * L + 1) / (k * eta) * Y[j0 + L] - Y[j0 + L - 1];
    d[j0 + L] = (k / (2 * L + 1)) * (L * Y[j0 + L - 1] - (L + 1) * nx) / h;
  };
  const kEtaSwitch = 0.5;
  const potTC = (phase, a, h, Y) => {
    let phi, dphi, psi;
    if (phase === 1) { phi = Y[0]; psi = psiTC(a, Y, phi); dphi = (S0tc(a, Y) - k * k * phi) / (3 * h) + h * psi; }
    else { phi = (S0tc(a, Y) + 3 * h * S1tc(a, Y) / k) / (k * k); psi = psiTC(a, Y, phi); dphi = -S1tc(a, Y) / k + h * psi; }
    return [phi, dphi, psi];
  };
  const fTC = phase => (x, Y) => {
    const a = Math.exp(x), h = c.cH(a), R = c.Rof(a), d = new Array(nTC).fill(0);
    const [, dphi, psi] = potTC(phase, a, h, Y);
    d[0] = phase === 1 ? dphi / h : 0;
    d[1] = (-k * Y[2] - 3 * dphi) / h;
    d[2] = (-h * Y[2] + k * psi) / h;
    d[3] = (-k * Y[4] - dphi) / h;                                                     // (9.13)
    d[4] = (-h * R / (1 + R) * Y[4] + k * Y[3] / (3 * (1 + R)) + k * psi / 3) / h;      // (9.18)
    hier(Y, d, iN, LN, psi, dphi, h, Y[ie]);
    d[ie] = 1 / h;
    return d;
  };
  // 绝热初条件（辐射期、视界外）：Ψ = −Φ/(1+2f_ν/5)，Θ0 = N0 = −Ψ/2，δ = −3Ψ/2，Θ1 = N1 = v/3 = kΨ/(6aH)，N2 = −(Φ+Ψ)(kη)²/(12 f_ν)
  const a0 = Math.min(1e-8, 0.01 / (k * 3e4)), h0 = c.cH(a0), eta0i = c.etaOf(a0);
  const psi0 = -1 / (1 + 0.4 * f);
  let Y = new Array(nTC).fill(0);
  Y[0] = 1; Y[1] = -1.5 * psi0; Y[2] = k * psi0 / (2 * h0); Y[3] = -psi0 / 2; Y[4] = k * psi0 / (6 * h0);
  Y[iN] = -psi0 / 2; Y[iN + 1] = k * psi0 / (6 * h0); Y[iN + 2] = -(1 + psi0) * (k * eta0i) ** 2 / (12 * f);
  Y[ie] = eta0i;
  const out = { k, a: [], th0psi: [], th1: [], phi: [], psi: [] };
  const xs = Math.log(a0), xStar = Math.log(aStar), xEnd = Math.log(Math.max(aEnd, aStar * 1.0001));
  const grid = nOut ? Array.from({ length: nOut }, (_, i) => Math.log(aOut ? aOut[0] : a0) + (xStar - Math.log(aOut ? aOut[0] : a0)) * i / (nOut - 1)) : [];
  let gi = 0, xPrev = xs, yPrev = Y.slice(), qPrev = [1, psi0];
  const rec_ = (phase, x, Yn) => {
    if (!grid.length) return;
    const a = Math.exp(x), [phi, , psi] = potTC(phase, a, c.cH(a), Yn);
    while (gi < grid.length && grid[gi] <= x + 1e-12) {
      const t = x === xPrev ? 1 : (grid[gi] - xPrev) / (x - xPrev), L = (u, v) => u + (v - u) * t;
      const ps = L(qPrev[1], psi);
      out.a.push(Math.exp(grid[gi])); out.phi.push(L(qPrev[0], phi)); out.psi.push(ps); out.th0psi.push(L(yPrev[3], Yn[3]) + ps); out.th1.push(L(yPrev[4], Yn[4])); gi++;
    }
    xPrev = x; yPrev = Yn.slice(); qPrev = [phi, psi];
  };
  const etaSw = kEtaSwitch / k;
  const findX = (lo, hi) => { for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (c.etaOf(Math.exp(m)) < etaSw) lo = m; else hi = m; } return hi; };
  const xSw = c.etaOf(aStar) > etaSw ? findX(xs, xStar) : xStar;
  let r = rk45(fTC(1), Y, xs, xSw, { rtol, atol: 1e-10, h0: 1e-2, hmax: 0.1, onStep: (xx, Yn) => rec_(1, xx, Yn) });
  Y = r.y; let steps = r.steps;
  if (xSw < xStar) { r = rk45(fTC(2), Y, xSw, xStar, { rtol, atol: 1e-10, h0: 1e-3, hmax: 0.1, onStep: (xx, Yn) => rec_(2, xx, Yn) }); Y = r.y; steps += r.steps; }
  const [phiStar, , psiStar] = potTC(xSw < xStar ? 2 : 1, aStar, c.cH(aStar), Y);
  const res = { k, phiStar, psiStar, th0psiStar: Y[3] + psiStar, th1Star: Y[4], th0Star: Y[3], steps, out };
  if (!(aEnd > aStar)) return res;
  // 复合后：光子自由流，重子无压流体；继续求势，得早期 ISW (9.81)
  const nP = 1 + 2 + 2 + (LG + 1) + (LN + 1) + 1;
  const jc = 1, jb = 3, jg = 5, jn = 5 + LG + 1, je = nP - 1;
  let Z = new Array(nP).fill(0);
  Z[0] = phiStar; Z[jc] = Y[1]; Z[jc + 1] = Y[2]; Z[jb] = 3 * Y[3]; Z[jb + 1] = 3 * Y[4]; Z[jg] = Y[3]; Z[jg + 1] = Y[4];
  for (let l = 0; l <= LN; l++) Z[jn + l] = Y[iN + l];
  Z[je] = Y[ie];
  const S0p = (a, Z) => A * ((Oc * Z[jc] + Ob * Z[jb]) / a + 4 * (Og * Z[jg] + On * Z[jn]) / (a * a));
  const S1p = (a, Z) => A * ((Oc * Z[jc + 1] + Ob * Z[jb + 1]) / a + 4 * (Og * Z[jg + 1] + On * Z[jn + 1]) / (a * a));
  const psiP = (a, Z, phi) => -phi - 8 * A * (Og * Z[jg + 2] + On * Z[jn + 2]) / (k * k * a * a);
  const potP = (phase, a, h, Z) => {
    let phi, dphi, psi;
    if (phase === 1) { phi = Z[0]; psi = psiP(a, Z, phi); dphi = (S0p(a, Z) - k * k * phi) / (3 * h) + h * psi; }
    else { phi = (S0p(a, Z) + 3 * h * S1p(a, Z) / k) / (k * k); psi = psiP(a, Z, phi); dphi = -S1p(a, Z) / k + h * psi; }
    return [phi, dphi, psi];
  };
  const fP = phase => (x, Z) => {
    const a = Math.exp(x), h = c.cH(a), d = new Array(nP).fill(0);
    const [, dphi, psi] = potP(phase, a, h, Z);
    d[0] = phase === 1 ? dphi / h : 0;
    d[jc] = (-k * Z[jc + 1] - 3 * dphi) / h; d[jc + 1] = (-h * Z[jc + 1] + k * psi) / h;
    d[jb] = (-k * Z[jb + 1] - 3 * dphi) / h; d[jb + 1] = (-h * Z[jb + 1] + k * psi) / h;
    hier(Z, d, jg, LG, psi, dphi, h, Z[je]); hier(Z, d, jn, LN, psi, dphi, h, Z[je]);
    d[je] = 1 / h; return d;
  };
  // 记录复合后 (Ψ−Φ)(η) − (Ψ−Φ)(η*) 在给定 a 网格上的值（用于带相位的早期 ISW）
  const hx = hist ? hist.map(Math.log) : [], hv = hist ? new Array(hist.length).fill(0) : null;
  let hi_ = 0, hxPrev = xStar, hvPrev = 0;
  while (hi_ < hx.length && hx[hi_] <= xStar) hi_++;
  const recH = (phase, xx, Zn) => {
    if (!hist) return;
    const [ph, , ps] = potP(phase, Math.exp(xx), c.cH(Math.exp(xx)), Zn), v = (ps - ph) - (psiStar - phiStar);
    while (hi_ < hx.length && hx[hi_] <= xx + 1e-12) { const t = (hx[hi_] - hxPrev) / (xx - hxPrev || 1); hv[hi_] = hvPrev + t * (v - hvPrev); hi_++; }
    hxPrev = xx; hvPrev = v;
  };
  let xa = xStar, phase = 2;
  if (c.etaOf(aStar) < etaSw) {
    const xSw2 = c.etaOf(Math.exp(xEnd)) > etaSw ? findX(xStar, xEnd) : xEnd;
    r = rk45(fP(1), Z, xStar, xSw2, { rtol: Math.max(rtol, 1e-5), atol: 1e-10, h0: 1e-3, hmax: 0.2, onStep: (xx, Zn) => recH(1, xx, Zn) });
    Z = r.y; xa = r.x; steps += r.steps; phase = 1;
    if (xa < xEnd - 1e-9) { Z[0] = potP(1, Math.exp(xa), c.cH(Math.exp(xa)), Z)[0]; }
  }
  if (xa < xEnd - 1e-9) { r = rk45(fP(2), Z, xa, xEnd, { rtol: Math.max(rtol, 1e-4), atol: 1e-9, h0: 1e-3, hmax: 0.2, onStep: (xx, Zn) => recH(2, xx, Zn) }); Z = r.y; steps += r.steps; phase = 2; }
  const [phiEnd, , psiEnd] = potP(phase, Math.exp(xEnd), c.cH(Math.exp(xEnd)), Z);
  res.phiEnd = phiEnd; res.psiEnd = psiEnd; res.steps = steps;
  res.eISW = (psiEnd - psiStar) - (phiEnd - phiStar);      // (9.81)，以 Φ(k,0) 为单位
  if (hist) { for (let i = hi_; i < hv.length; i++) hv[i] = res.eISW; res.hist = hv; }
  return res;
}

// ---------- 源函数表：S(k)、V(k)（以 𝓡 为单位）----------
// k 网格：低 k 对数分布，高 k 线性分布（Δk·r_s ≲ 0.35，保证声学振荡被充分采样）
export function kGrid(rs = 145, kmax = 0.42) {
  const K = []; const kb = 0.01;
  for (let i = 0; i < 26; i++) K.push(2e-4 * (kb / 2e-4) ** (i / 26));
  const dk = 0.38 / rs; for (let k = kb; k <= kmax + 1e-9; k += dk) K.push(k);
  return K;
}
const _srcCache = new Map();
export function sources(p = {}, { kmax = 0.42 } = {}) {
  const c = cosmo(p), rec = recHistory(c);
  const key = [c.h, c.obh2, c.och2, kmax].map(v => (+v).toPrecision(5)).join(",");
  if (_srcCache.has(key)) return _srcCache.get(key);
  const conv = phi0PerR(c);
  const K = kGrid(c.rsOf(rec.aStar), kmax), M = [], D = [], I = [], DF = [], PH = [], PS = [];
  // 复合后的势演化（早期 ISW）只对 k ≤ kI 显式求解；更小尺度上 ISW 很小，按 Φ(η*) 等比例外推
  const kI = 0.12; let iswRef = null;
  const aE = 0.012, NH = 28, HA = Array.from({ length: NH }, (_, i) => rec.aStar * (aE / rec.aStar) ** ((i + 1) / NH));
  const etaS = c.etaOf(rec.aStar), HE = HA.map(a => c.etaOf(a) - etaS), H = [];
  for (const k of K) {
    const s = solveMode(k, c, rec, { aEnd: k <= kI ? aE : 0, rtol: 1e-4, hist: k <= kI ? HA : null });
    let isw = s.eISW;
    if (k <= kI) { iswRef = [s.eISW, s.phiStar]; H.push(s.hist.map(v => v * conv)); } else isw = iswRef[0] * s.phiStar / iswRef[1];
    M.push(s.th0psiStar * conv); D.push(3 * s.th1Star * conv); I.push(isw * conv); PH.push(s.phiStar); PS.push(s.psiStar); DF.push(rec.dampAvg(k));
  }
  const r = { c, rec, K, M, D, I, DF, PH, PS, lk: K.map(Math.log), conv, HE, H, nH: H.length };
  if (_srcCache.size > 30) _srcCache.clear();
  _srcCache.set(key, r);
  return r;
}
const lin = (xs, ys, x) => { let lo = 0, hi = xs.length - 1; if (x <= xs[0]) return ys[0]; if (x >= xs[hi]) return ys[hi]; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] > x) hi = m; else lo = m; } const t = (x - xs[lo]) / (xs[hi] - xs[lo]); return ys[lo] + t * (ys[hi] - ys[lo]); };

// 带相位的早期 ISW：∫dη (Ψ−Φ)' j_l(k(η0−η))，把 j_l 在 η* 附近展开为 sinφ cos(kΔη·t) − cosφ sin(kΔη·t)（t = tanh u = dφ/dx）
// 返回 [与单极同相部分 I_c, 与偶极同相部分 I_s]；k 超出显式求解范围时返回 null（改用 (9.81) 的同相近似）
function iswPhase(src, k, t) {
  if (!src.nH || k > src.K[src.nH - 1]) return null;
  let j = 0; while (j < src.nH - 2 && src.K[j + 1] < k) j++;
  const u = Math.max(0, Math.min(1, (k - src.K[j]) / (src.K[j + 1] - src.K[j]))), h0 = src.H[j], h1 = src.H[j + 1];
  let Ic = 0, Is = 0, prev = 0, ePrev = 0;
  for (let i = 0; i < src.HE.length; i++) {
    const v = h0[i] + u * (h1[i] - h0[i]), e = src.HE[i], em = 0.5 * (e + ePrev), dv = v - prev;
    Ic += dv * Math.cos(k * em * t); Is += dv * Math.sin(k * em * t); prev = v; ePrev = e;
  }
  return [Ic, Is];
}

// ---------- C(l) 的半解析投影 ----------
// 对 j_l² 与 (j_l')² 在一个振荡周期上平均（大 l 渐近式），交叉项平均为零（习题 9.11）：
//   C(l) ≈ (2π/ν²) ∫_0^∞ du Δ²_𝓡(k) [S(k)² + V(k)² tanh²u] / cosh²u,   k = ν cosh u / D_A,  ν = l + 1/2
// 其中 S = (Θ0+Ψ)·阻尼 + 早期 ISW，V = 3Θ1·阻尼；D_A 为到最后散射面的共动角直径距离。
// 取 S = −1/5（常数）、n_s = 1 时恰好给出 l(l+1)C ≈ 2π𝒜_s/25（见 (9.80) 的勘误说明）。
export function clModel(p = {}, ls, { dipole = true, isw = true, damping = true, reion = true } = {}) {
  const q = { ...FID, ...p };
  const src = sources({ h: q.h, obh2: q.obh2, och2: q.och2 });
  const cK = cosmo({ h: q.h, obh2: q.obh2, och2: q.och2, OK: q.OK || 0 });
  const recK = recHistory(cK);
  const chi = cK.eta0 - cK.etaOf(recK.aStar), DA = cK.SK(chi);
  const nu = 40, umax = 3.2, du = umax / nu;
  const out = [];
  for (const l of ls) {
    const v = l + 0.5; let s = 0;
    for (let i = 0; i <= nu; i++) {
      const u = i * du, ch = Math.cosh(u), th = Math.tanh(u), k = v * ch / DA, lk = Math.log(k);
      const df = damping ? lin(src.lk, src.DF, lk) : 1;
      let Ic = 0, Is = 0;
      if (isw) {
        const iswAt = isw === "coherent" ? null : iswPhase(src, k, th);
        if (iswAt) [Ic, Is] = iswAt; else Ic = lin(src.lk, src.I, lk);
      }
      const S = lin(src.lk, src.M, lk) * df + Ic;
      const V = (dipole ? lin(src.lk, src.D, lk) * df : 0) * th - Is;
      const D2 = q.As * (k / q.kp) ** (q.ns - 1);
      const f = D2 * (S * S + V * V) / (ch * ch);
      s += f * (i === 0 || i === nu ? 1 : i % 2 ? 4 : 2);
    }
    let C = 2 * Math.PI / (v * v) * s * du / 3;
    if (reion) { const lr = 10, e = Math.exp(-2 * (q.tau ?? FID.tau)); C *= e + (1 - e) / (1 + (l / lr) ** 2); }
    out.push(C);
  }
  return { C: out, DA, chi, rsStar: cK.rsOf(recK.aStar), zStar: recK.zStar, etaStar: cK.etaOf(recK.aStar), eta0: cK.eta0 };
}
export const Dl = (l, C) => l * (l + 1) * C / (2 * Math.PI);

// ---------- 球 Bessel 函数 ----------
// 返回 j_0..j_L 在 x 处的值：x > L 用向上递推，否则用 Miller 向下递推并以 j_0 归一
export function jlArray(L, x) {
  const out = new Array(L + 1).fill(0);
  if (x < 1e-8) { out[0] = 1; return out; }
  const j0 = Math.sin(x) / x;
  if (x > L) {
    out[0] = j0; if (L >= 1) out[1] = Math.sin(x) / (x * x) - Math.cos(x) / x;
    for (let l = 1; l < L; l++) out[l + 1] = (2 * l + 1) / x * out[l] - out[l - 1];
    return out;
  }
  const start = L + 20 + Math.ceil(Math.sqrt(40 * (L + 1)));
  let jp = 0, jc = 1e-300; const tmp = new Array(start + 2).fill(0);
  for (let l = start; l >= 1; l--) { const jm = (2 * l + 1) / x * jc - jp; jp = jc; jc = jm; tmp[l - 1] = jm; if (Math.abs(jc) > 1e250) { jc *= 1e-250; jp *= 1e-250; for (let m = l - 1; m <= Math.min(start, L + 1); m++) tmp[m] *= 1e-250; } }
  const norm = j0 / tmp[0];
  for (let l = 0; l <= L; l++) out[l] = tmp[l] * norm;
  return out;
}
export const jl = (l, x) => jlArray(l, x)[l];

// ---------- 大角度：精确 Bessel 积分的 Sachs–Wolfe + 晚期 ISW ----------
// Θ_l(k)/𝓡 = −(1/5) j_l(kχ*) − (6/5)∫dη (dg/dη) j_l(k(η0−η))，g(a) = (D+/a)/(D+/a)_物质期（Λ 使势衰减）
export function lowL({ ns = FID.ns, As = FID.As, OL = 0.69, lmax = 30, isw = true } = {}) {
  const Om = 1 - OL, h = FID.h, H0 = H100 * h;
  // 物质 + Λ 背景（忽略辐射；大角度只关心晚期）
  const E = a => Math.sqrt(Om / a ** 3 + OL);
  const N = 400, aa = Array.from({ length: N + 1 }, (_, i) => 1e-3 * (1 / 1e-3) ** (i / N));
  // η(a)
  const eta = [2 / (H0 * Math.sqrt(Om)) * Math.sqrt(aa[0])]; for (let i = 1; i <= N; i++) { const am = Math.sqrt(aa[i] * aa[i - 1]); eta.push(eta[i - 1] + (Math.log(aa[i]) - Math.log(aa[i - 1])) / (am * H0 * E(am))); }
  const eta0 = eta[N];
  // 增长因子 g = D+/a：(8.77) 积分形式 D ∝ H ∫ da/(aH)^3
  const I = [0]; for (let i = 1; i <= N; i++) { const am = Math.sqrt(aa[i] * aa[i - 1]); I.push(I[i - 1] + (aa[i] - aa[i - 1]) / (am * E(am)) ** 3); }
  const I0 = 0.4 * aa[0] ** 2.5 / Om ** 1.5;
  const g = aa.map((a, i) => 2.5 * Om * E(a) * (I[i] + I0) / a);
  const g0 = g[0]; for (let i = 0; i <= N; i++) g[i] /= g0;
  const chiStar = eta0 - eta[0];
  const nk = 520, kmin = 0.05 / eta0, kmax = 12 * lmax / eta0;
  const Cl = new Array(lmax + 1).fill(0), Csw = new Array(lmax + 1).fill(0);
  for (let ik = 0; ik < nk; ik++) {
    const lk = Math.log(kmin) + (Math.log(kmax) - Math.log(kmin)) * (ik + 0.5) / nk, k = Math.exp(lk), dlk = (Math.log(kmax) - Math.log(kmin)) / nk;
    const jS = jlArray(lmax, k * chiStar);
    const th = jS.map(v => -v / 5), sw = th.slice();
    if (isw) for (let i = 1; i <= N; i++) { const dg = g[i] - g[i - 1]; if (Math.abs(dg) < 1e-12) continue; const em = 0.5 * (eta[i] + eta[i - 1]); const jj = jlArray(lmax, k * (eta0 - em)); for (let l = 2; l <= lmax; l++) th[l] += -(6 / 5) * dg * jj[l]; }
    const D2 = As * (k / FID.kp) ** (ns - 1);
    for (let l = 2; l <= lmax; l++) { Cl[l] += 4 * Math.PI * D2 * th[l] * th[l] * dlk; Csw[l] += 4 * Math.PI * D2 * sw[l] * sw[l] * dlk; }
  }
  return { Cl, Csw, eta0, chiStar };
}
// (9.79)：解析 SW（Γ 函数）
export function lnGamma(z) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z); z -= 1; let x = c[0]; for (let i = 1; i < g + 2; i++) x += c[i] / (z + i); const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x); }
export function clSW979(l, { ns = FID.ns, As = FID.As, eta0 = 14000, kp = FID.kp } = {}) {
  return 2 ** (ns - 2) * Math.PI ** 2 / 25 * As * (eta0 * kp) ** (1 - ns) * Math.exp(lnGamma(l + ns / 2 - 0.5) - lnGamma(l + 2.5 - ns / 2) + lnGamma(3 - ns) - 2 * lnGamma(2 - ns / 2));
}

// ---------- 箱 9.1：受迫谐振子 (9.3) ----------
export const oscX = (t, { A = 1, F = 0, w = 1 } = {}) => A * Math.cos(w * t) + F / (w * w);
// 常数势、常数 R 的紧耦合玩具解（由 (9.22) 得到）：Θ0+Ψ = RΦ − (1/2 + R)Φ cos(k r_s)（以 Φ 为单位）
export const toyAcoustic = (krs, R) => R - (0.5 + R) * Math.cos(krs);
export const clearCaches = () => { _bgCache.clear(); _recCache.clear(); _srcCache.clear(); };
