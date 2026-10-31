// 第 III 章交互图的数值核心（纯 JS，无 React 依赖，可直接用 node 测试）。
// 单位约定：ħ = m = 1。复数用 [re, im] 表示。

export const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const cconj = a => [a[0], -a[1]];
export const cabs2 = a => a[0] * a[0] + a[1] * a[1];
export const polar = (r, ph) => [r * Math.cos(ph), r * Math.sin(ph)];

// ---------- 可复现的伪随机数 ----------
export function mulberry32(seed) {
  return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// =====================================================================
// 1. 测量模拟（第四、第五假设）
//    基矢 k = 0..K-1，各属于本征值组 level[k]；c 为复振幅（未必归一）。
//    P(a_n) = Σ_{k∈n} |c_k|² / Σ_k |c_k|²                         —— (B-7)/(B-19)
//    坍缩：保留属于 n 的分量并归一                                  —— (B-30)/(B-31)
// =====================================================================
export function levelProbs(c, level, nLev) {
  const norm = c.reduce((s, z) => s + cabs2(z), 0), P = Array(nLev).fill(0);
  c.forEach((z, k) => { P[level[k]] += cabs2(z) / norm; });
  return P;
}
export function pick(P, u) { let s = 0; for (let n = 0; n < P.length; n++) { s += P[n]; if (u < s) return n; } return P.length - 1; }
export function collapse(c, level, n) {
  const kept = c.map((z, k) => (level[k] === n ? z : [0, 0]));
  const nn = Math.sqrt(kept.reduce((s, z) => s + cabs2(z), 0));
  return kept.map(z => [z[0] / nn, z[1] / nn]);
}
export const mean = (P, a) => P.reduce((s, p, n) => s + p * a[n], 0);
export const rms = (P, a) => { const m = mean(P, a); return Math.sqrt(P.reduce((s, p, n) => s + p * (a[n] - m) ** 2, 0)); };

// =====================================================================
// 2. 保守体系：H = diag(E)，可观测量 B（厄米矩阵）
//    ⟨B⟩(t) = Σ_{n,n'} c*_{n'} c_n B_{n'n} e^{i(E_{n'}-E_n)t}            —— (D-68)，t0=0
//    同时用 RK4 直接积分 iħ dψ/dt = Hψ 做对照
// =====================================================================
export function expectB(B, c) {   // ⟨c|B|c⟩（实数）
  let s = 0;
  for (let i = 0; i < c.length; i++) for (let j = 0; j < c.length; j++) { const t = cmul(cmul(cconj(c[i]), B[i][j]), c[j]); s += t[0]; }
  return s;
}
export function bohrExpect(E, c0, B, t) {
  const ct = c0.map((z, n) => cmul(z, polar(1, -E[n] * t)));
  return expectB(B, ct);
}
// dψ/dt = -i H ψ（H 为复矩阵）
export function schrodRK4(H, c0, T, steps) {
  const K = c0.length, h = T / steps;
  const f = y => { const out = []; for (let i = 0; i < K; i++) { let re = 0, im = 0; for (let j = 0; j < K; j++) { const t = cmul(H[i][j], y[j]); re += t[0]; im += t[1]; } out.push([im, -re]); } return out; };
  const add = (y, k, s) => y.map((z, i) => [z[0] + k[i][0] * s, z[1] + k[i][1] * s]);
  let y = c0.map(z => [...z]); const ts = [0], ys = [y];
  for (let s = 0; s < steps; s++) {
    const k1 = f(y), k2 = f(add(y, k1, h / 2)), k3 = f(add(y, k2, h / 2)), k4 = f(add(y, k3, h));
    y = y.map((z, i) => [z[0] + h / 6 * (k1[i][0] + 2 * k2[i][0] + 2 * k3[i][0] + k4[i][0]), z[1] + h / 6 * (k1[i][1] + 2 * k2[i][1] + 2 * k3[i][1] + k4[i][1])]);
    ts.push((s + 1) * h); ys.push(y);
  }
  return { t: ts, y: ys };
}
// (1/iħ)⟨[B,H]⟩，H = diag(E)：[B,H]_{ij} = B_ij (E_j - E_i)
export function commExpect(E, B, c) {
  const K = c.length, C = B.map((row, i) => row.map((b, j) => [b[0] * (E[j] - E[i]), b[1] * (E[j] - E[i])]));
  let s = [0, 0];
  for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) { const t = cmul(cmul(cconj(c[i]), C[i][j]), c[j]); s = [s[0] + t[0], s[1] + t[1]]; }
  return cmul(s, [0, -1])[0];   // 乘以 1/i = -i，取实部
}
// 各 Bohr 频率的权重：振荡项 2|c_n c_{n'} B_{n'n}| cos(ω t + φ)
export function bohrLines(E, c0, B) {
  const out = [];
  for (let n = 0; n < E.length; n++) for (let m = n + 1; m < E.length; m++) {
    const w = cmul(cmul(cconj(c0[m]), c0[n]), B[m][n]);
    out.push({ n, m, omega: Math.abs(E[m] - E[n]), amp: 2 * Math.hypot(w[0], w[1]) });
  }
  return out;
}

// =====================================================================
// 3. 一维含时 Schrödinger 方程（Crank–Nicolson，ħ = m = 1）
//    H = -½ ∂²/∂x² + V(x)；(1 + i dt H/2) ψ^{n+1} = (1 - i dt H/2) ψ^n
// =====================================================================
export function grid(L, N) { const dx = 2 * L / (N - 1); return { x: Array.from({ length: N }, (_, j) => -L + j * dx), dx }; }
export function gaussian(x, x0, p0, s) {
  const out = x.map(v => { const g = Math.exp(-((v - x0) ** 2) / (4 * s * s)); return [g * Math.cos(p0 * v), g * Math.sin(p0 * v)]; });
  const dx = x[1] - x[0], nn = Math.sqrt(out.reduce((a, z) => a + cabs2(z), 0) * dx);
  return out.map(z => [z[0] / nn, z[1] / nn]);
}
// 预分解三对角矩阵 A = 1 + i dt H/2（对角 a_j，非对角 b），返回求解器
function cnSolver(V, dx, dt) {
  const N = V.length, off = -1 / (2 * dx * dx);
  const ad = V.map(v => [1, dt / 2 * (1 / (dx * dx) + v)]);   // 1 + i dt/2 (1/dx² + V)
  const ab = [0, dt / 2 * off];                                // i dt/2 · off
  const bd = V.map(v => [1, -dt / 2 * (1 / (dx * dx) + v)]), bb = [0, -dt / 2 * off];
  // Thomas 预分解：c'_j, 分母
  const cp = new Array(N), den = new Array(N);
  const cdiv = (a, b) => { const d = cabs2(b); return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  den[0] = ad[0]; cp[0] = cdiv(ab, den[0]);
  for (let j = 1; j < N; j++) { const t = cmul(ab, cp[j - 1]); den[j] = [ad[j][0] - t[0], ad[j][1] - t[1]]; cp[j] = cdiv(ab, den[j]); }
  return psi => {
    const r = psi.map((z, j) => {
      let s = cmul(bd[j], z);
      if (j > 0) { const t = cmul(bb, psi[j - 1]); s = [s[0] + t[0], s[1] + t[1]]; }
      if (j < N - 1) { const t = cmul(bb, psi[j + 1]); s = [s[0] + t[0], s[1] + t[1]]; }
      return s;
    });
    const dp = new Array(N);
    dp[0] = cdiv(r[0], den[0]);
    for (let j = 1; j < N; j++) { const t = cmul(ab, dp[j - 1]); dp[j] = cdiv([r[j][0] - t[0], r[j][1] - t[1]], den[j]); }
    const out = new Array(N); out[N - 1] = dp[N - 1];
    for (let j = N - 2; j >= 0; j--) { const t = cmul(cp[j], out[j + 1]); out[j] = [dp[j][0] - t[0], dp[j][1] - t[1]]; }
    return out;
  };
}
// 期望值：⟨X⟩、⟨P⟩、⟨F⟩ = ⟨-V'(X)⟩、范数
export function moments(psi, x, dV) {
  const dx = x[1] - x[0], N = psi.length;
  let n = 0, X = 0, P = 0, F = 0;
  for (let j = 0; j < N; j++) {
    const r = cabs2(psi[j]); n += r; X += x[j] * r; F += -dV(x[j]) * r;
    if (j > 0 && j < N - 1) { const d = [(psi[j + 1][0] - psi[j - 1][0]) / (2 * dx), (psi[j + 1][1] - psi[j - 1][1]) / (2 * dx)]; P += psi[j][0] * d[1] - psi[j][1] * d[0]; }   // Re(ψ* (-i) ψ') = Im(ψ* ψ')
  }
  return { norm: n * dx, X: X * dx, P: P * dx, F: F * dx };
}
// 运行到 T，每 every 步记录一次
export function runTDSE({ V, dV, x0, p0, s, L = 12, N = 600, dt = 0.005, T = 10, every = 20, keep = false }) {
  const { x, dx } = grid(L, N), Vx = x.map(V), step = cnSolver(Vx, dx, dt);
  let psi = gaussian(x, x0, p0, s);
  const steps = Math.round(T / dt), rec = { t: [], X: [], P: [], F: [], Fcl: [], norm: [], psi: [] };
  for (let k = 0; k <= steps; k++) {
    if (k % every === 0) {
      const m = moments(psi, x, dV);
      rec.t.push(k * dt); rec.X.push(m.X); rec.P.push(m.P); rec.F.push(m.F); rec.Fcl.push(-dV(m.X)); rec.norm.push(m.norm);
      if (keep) rec.psi.push(psi);
    }
    if (k < steps) psi = step(psi);
  }
  return { x, dx, ...rec };
}
// 经典轨道（同一初值 x0, p0）
export function classical(dV, x0, p0, T, n = 2000) {
  const h = T / n; let q = x0, p = p0; const t = [0], X = [q], P = [p];
  for (let i = 0; i < n; i++) {
    const k1q = p, k1p = -dV(q), k2q = p + h / 2 * k1p, k2p = -dV(q + h / 2 * k1q), k3q = p + h / 2 * k2p, k3p = -dV(q + h / 2 * k2q), k4q = p + h * k3p, k4p = -dV(q + h * k3q);
    q += h / 6 * (k1q + 2 * k2q + 2 * k3q + k4q); p += h / 6 * (k1p + 2 * k2p + 2 * k3p + k4p);
    t.push((i + 1) * h); X.push(q); P.push(p);
  }
  return { t, X, P };
}
// 概率流快照：在时刻 t 附近取 ψ(t-dt), ψ(t), ψ(t+dt)，返回 ρ、J、-∂ρ/∂t、∂J/∂x
export function currentSnapshots({ V, x0, p0, s, L = 15, N = 700, dt = 0.004, T = 6, frames = 61 }) {
  const { x, dx } = grid(L, N), Vx = x.map(V), step = cnSolver(Vx, dx, dt);
  let psi = gaussian(x, x0, p0, s);
  const steps = Math.round(T / dt), per = Math.round(steps / (frames - 1)), out = [];
  let prev = null;
  for (let k = 0; k <= steps + 1; k++) {
    const next = step(psi);                                        // prev = ψ(t-dt)，psi = ψ(t)，next = ψ(t+dt)
    if (k % per === 0 && out.length < frames) {
      const rho = psi.map(cabs2), J = new Array(N).fill(0), dJ = new Array(N).fill(0), drho = new Array(N).fill(0);
      for (let j = 1; j < N - 1; j++) {
        const d = [(psi[j + 1][0] - psi[j - 1][0]) / (2 * dx), (psi[j + 1][1] - psi[j - 1][1]) / (2 * dx)];
        J[j] = psi[j][0] * d[1] - psi[j][1] * d[0];                 // (ħ/m) Im(ψ* ∂ψ/∂x)   —— (D-17)
      }
      for (let j = 2; j < N - 2; j++) dJ[j] = (J[j + 1] - J[j - 1]) / (2 * dx);
      if (prev) for (let j = 0; j < N; j++) drho[j] = -(cabs2(next[j]) - cabs2(prev[j])) / (2 * dt);
      out.push({ t: k * dt, rho, J, dJ, mdrho: drho, valid: !!prev });
    }
    prev = psi; psi = next;
  }
  return { x, dx, frames: out };
}

// =====================================================================
// 4. 叠加 vs 统计混合（§E-1）
// =====================================================================
// 光子偏振：|ψ⟩ = cosθ |x⟩ + e^{iφ} sinθ |y⟩，检偏器方向 χ（线偏振）
export function polarSup(th, ph, chi) { const re = Math.cos(th) * Math.cos(chi) + Math.cos(ph) * Math.sin(th) * Math.sin(chi), im = Math.sin(ph) * Math.sin(th) * Math.sin(chi); return re * re + im * im; }
export function polarMix(th, chi) { return (Math.cos(th) * Math.cos(chi)) ** 2 + (Math.sin(th) * Math.sin(chi)) ** 2; }
// 自旋 1/2（xz 平面内的方向）：初态 |+z⟩，中间可观测量 B 沿 β，末态测 C 沿 γ 得 +
export function spinDirect(gam) { return Math.cos(gam / 2) ** 2; }
export function spinVia(beta, gam) { return Math.cos(beta / 2) ** 2 * Math.cos((gam - beta) / 2) ** 2 + Math.sin(beta / 2) ** 2 * Math.sin((gam - beta) / 2) ** 2; }

// =====================================================================
// 5. 连续谱的“截断”（§E-2-d）：⟨v_α|ψ⟩ 取几个高斯之和
// =====================================================================
export function packet(al) { return 0.9 * Math.exp(-((al - 0.6) ** 2) / 0.5) + 1.0 * Math.exp(-((al - 2.2) ** 2) / 0.45) + 0.75 * Math.exp(-((al - 3.6) ** 2) / 0.35); }
export const PACK_NORM = (() => { let s = 0; const h = 0.001; for (let a = -4; a <= 9; a += h) s += packet(a) ** 2 * h; return s; })();
export function pYes(a0, da) { let s = 0; const n = 400, h = da / n; for (let i = 0; i < n; i++) { const a = a0 - da / 2 + (i + 0.5) * h; s += packet(a) ** 2 * h; } return s / PACK_NORM; }

// 图 2：ρ(α) 的平均值、最大值处、方均根偏差（数值积分）
export function rhoSkew(al, w, d) { return (1 - w) * Math.exp(-((al - 1) ** 2) / 0.5) + w * Math.exp(-((al - 1 + d) ** 2) / 1.2); }
export function rhoStats(w, d) {
  const h = 0.002; let n = 0, m1 = 0, m2 = 0, best = -1, am = 0;
  for (let a = -8; a <= 6; a += h) { const r = rhoSkew(a, w, d); n += r * h; m1 += a * r * h; m2 += a * a * r * h; if (r > best) { best = r; am = a; } }
  const mean = m1 / n; return { norm: n, mean, am, dA: Math.sqrt(m2 / n - mean * mean) };
}
