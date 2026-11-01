// 第 10 章数值模型（纯函数，无 React）。全部在浏览器里真算；数值已用 node 与原书例题、图 10.6/10.8/10.13/10.17/10.42 核对。
// 单位约定：长度 µm（另注明者除外），温度输入 °C、内部用 K，能量 eV，沉积速率 µm/min。

export const KB = 8.617e-5;                 // 玻尔兹曼常数 eV/K
export const TK = Tc => Tc + 273.15;
export const N_SI = 5e22;                   // 硅原子密度 cm^-3
export const CT_ATM = 1e19;                 // 原书例题：1 atm 时气相总浓度 C_T = 1e19 cm^-3
const CMS_TO_UMMIN = 1e4 * 60;              // cm/s → µm/min

// ---------------- Grove 模型：式 (10.5)–(10.11) ----------------
export const ks = (k0, EA, T) => k0 * Math.exp(-EA / (KB * T));               // 式 (10.11)，T 为 K
export const series = (a, b) => a * b / (a + b);                                // 两个"电导"串联
// 生长速度（µm/min）：式 (10.7)，C_T·Y = C_G 为反应物浓度
export const groveV = (ksv, hG, CG, N = N_SI) => series(ksv, hG) * CG / N * CMS_TO_UMMIN;
// LPCVD：D_G ∝ 1/P（式 10.18），边界层 δ 在 760→1 Torr 时增大 fδ 倍（原书：3–10 倍），按 ln P 插值
export function hGofP(hG760, P, fdelta) {
  const r = Math.log(760 / P) / Math.log(760);           // P=760 → 0；P=1 → 1
  return hG760 * (760 / P) / Math.pow(fdelta, r);
}
// 10 °C 变化引起的相对变化（数值差分）
export function tenDegree(vfun, Tc) { const a = vfun(TK(Tc)), b = vfun(TK(Tc + 10)); return b / a - 1; }

// ---------------- 图 10.8：四种硅源的 Grove 拟合（从原图读取的点，约值） ----------------
// 原图点（1000/T [K^-1], 归一化速率 µm/min）；读图误差约 ±10%
export const FIG108 = {
  SiH4: [[0.663, 0.79], [0.735, 0.64], [0.811, 0.35], [0.865, 0.177], [0.919, 0.080], [0.973, 0.034], [1.057, 0.0122]],
  SiH2Cl2: [[0.663, 0.48], [0.735, 0.40], [0.811, 0.213], [0.865, 0.096], [0.919, 0.043], [0.991, 0.0119]],
  SiHCl3: [[0.654, 0.35], [0.735, 0.31], [0.811, 0.147], [0.865, 0.069], [0.919, 0.030], [0.957, 0.0119]],
  SiCl4: [[0.643, 0.171], [0.681, 0.157], [0.735, 0.102], [0.789, 0.049], [0.843, 0.0206], [0.898, 0.0098]],
};
// v = 1 / (1/(A·exp(-E/kT)) + 1/H)，E 以 eV、A 与 H 以 µm/min 计（拟合值，见 fit108）
export const v108 = (p, x) => { const T = 1000 / x, k = p.A * Math.exp(-p.E / (KB * T)); return 1 / (1 / k + 1 / p.H); };
export function fit108(pts) {
  let best = null;
  for (let E = 0.8; E <= 2.4; E += 0.02) for (let lh = -1.0; lh <= 0.2; lh += 0.01) {
    const H = 10 ** lh;
    // 对给定 E、H，最优 ln A 用一维搜索
    for (let la = 2; la <= 12; la += 0.02) {
      const p = { A: 10 ** la, E, H };
      let s = 0; for (const [x, y] of pts) { const d = Math.log(v108(p, x) / y); s += d * d; }
      if (!best || s < best.s) best = { ...p, s };
    }
  }
  return best;
}
// 预先拟合的结果（node 运行 fit108 得到，避免浏览器里重复搜索）
export const FIT108 = {
  SiH4: { A: 1.20e5, E: 1.32, H: 1.00 },
  SiH2Cl2: { A: 9.55e5, E: 1.58, H: 0.55 },
  SiHCl3: { A: 5.01e6, E: 1.78, H: 0.38 },
  SiCl4: { A: 4.79e4, E: 1.48, H: 0.24 },
};

// ---------------- 自掺杂：式 (10.12)、(10.13) ----------------
// Numerical Recipes erfcc，全域相对误差 < 1.2e-7（对数坐标下的尾部也准确）
export function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
export const outdiff = (C, sqrtDt, x) => C / 2 * erfc(x / (2 * sqrtDt));      // 式 (10.12)
export const autodope = (Cs, L, x) => Cs * Math.exp(-x / L);                   // 式 (10.13)

// ---------------- 临界厚度：式 (10.14)、(10.15) ----------------
export const aSiGe = x => 0.5431 + 0.0200 * x + 0.0027 * x * x;               // nm（Dismukes 近似）
export const misfit = x => (aSiGe(x) - 0.5431) / 0.5431;                         // 式 (10.15)
// 求 h = A·g(h) 的较大根（g 为对数项）；hmin 为 h − A g(h) 的极小点
function bigRoot(F, hmin) {
  if (F(hmin) >= 0) return hmin;
  let a = hmin, b = 1e7;
  for (let i = 0; i < 200; i++) { const m = Math.sqrt(a * b); if (F(m) < 0) a = m; else b = m; }
  return Math.sqrt(a * b);
}
const TH = 60 * Math.PI / 180, PH = Math.acos(1 / Math.sqrt(3));             // 60° 位错；{111} 滑移面相对 (001) 倾 54.7°
// Matthews–Blakeslee 标准形式：h = b(1−ν cos²θ)/(8π f (1+ν) sinθ cosφ)·[ln(h/b)+1]
export function hcMB(f, nu = 0.28, b = 0.384) {
  const A = b * (1 - nu * Math.cos(TH) ** 2) / (8 * Math.PI * f * (1 + nu) * Math.sin(TH) * Math.cos(PH));
  return bigRoot(h => h - A * (Math.log(h / b) + 1), A);
}
// 式 (10.14) 照印形式：对数项为 ln(h/r0 − 1)，取 r0 = b
export function hcBook(f, nu = 0.28, r0 = 0.384) {
  const A = r0 * (1 - nu * Math.cos(TH) ** 2) / (8 * Math.PI * f * (1 + nu) * Math.sin(TH) * Math.cos(PH));
  const F = h => h - A * Math.log(h / r0 - 1);
  return F(A + r0) >= 0 ? NaN : bigRoot(F, A + r0);           // 无解（失配大于约 1.6%）时不画
}
// People–Bean 能量平衡：h = (1−ν)/(1+ν)·b²/(16π√2 a)·ln(h/b)/f²
export function hcPB(f, nu = 0.28, b = 0.4, a = 0.5658) {
  const A = (1 - nu) / (1 + nu) * b * b / (16 * Math.PI * Math.SQRT2 * a) / (f * f);
  return bigRoot(h => h - A * Math.log(h / b), A);
}

// ---------------- 等离子体：式 (10.25)、(10.29) ----------------
export const mfpElectron = P => 0.005 / P;                                       // cm，P 以 Torr
export const sheathRatio = (A2overA1, q = 4) => Math.pow(A2overA1, q);

// ---------------- 溅射产额（补充模型，非原书）：Bohdansky 形状 × 500 eV 实测值归一 ----------------
// 靶材：Z、M（amu）、升华能 Us（eV）、Ar⁺ 500 eV 实测产额（Laegreid & Wehner 1961，常见教科书引用值，约值）
export const TARGETS = {
  Al: { Z: 13, M: 26.98, Us: 3.39, Y500: 1.05 },
  Si: { Z: 14, M: 28.09, Us: 4.63, Y500: 0.50 },
  Ti: { Z: 22, M: 47.87, Us: 4.85, Y500: 0.51 },
  Cu: { Z: 29, M: 63.55, Us: 3.49, Y500: 2.35 },
  W: { Z: 74, M: 183.84, Us: 8.90, Y500: 0.57 },
  Au: { Z: 79, M: 196.97, Us: 3.81, Y500: 2.40 },
};
export const ION_AR = { Z: 18, M: 39.95 };
const snZBL = e => (e <= 30 ? Math.log(1 + 1.1383 * e) / (2 * (e + 0.01321 * Math.pow(e, 0.21226) + 0.19593 * Math.sqrt(e))) : Math.log(e) / (2 * e));
export function eth(t, ion = ION_AR) {
  const r = ion.M / t.M, g = 4 * ion.M * t.M / (ion.M + t.M) ** 2;
  return r <= 0.3 ? t.Us / (g * (1 - g)) : 8 * t.Us * Math.pow(r, 0.4);
}
function shape(t, E, ion = ION_AR) {
  const Et = eth(t, ion); if (E <= Et) return 0;
  const eps = 0.03254 * E * t.M / ((ion.M + t.M) * ion.Z * t.Z * (Math.pow(ion.Z, 0.23) + Math.pow(t.Z, 0.23)));
  return snZBL(eps) * (1 - Math.pow(Et / E, 2 / 3)) * (1 - Et / E) ** 2;
}
export const sputterYield = (t, E, ion = ION_AR) => t.Y500 * shape(t, E, ion) / shape(t, 500, ion);

// ---------------- 反应溅射迟滞：Berg 模型（无量纲，补充模型） ----------------
// 参数：S 抽速，Ac 收集面积/靶面积，Yc 化合物产额/金属产额；离子流 J=1，金属产额 Ym=1，粘附 α=1
export function bergPoint(F, { S, Ac, Yc }) {
  const th = F / (F + Yc);                               // 靶面化合物覆盖率
  const Rm = 1 - th, Rc = Yc * th;                        // 金属、化合物溅射率
  const tc = (F * Ac + Rc) / (F * Ac + Rc + Rm);          // 收集面化合物覆盖率
  const Q = F * (1 - th) + F * (1 - tc) * Ac + S * F;     // 总供气 = 靶消耗 + 收集面消耗 + 抽走
  return { Q, R: Rm + Rc, th };
}
export function bergCurves(p, Fmax = 12, n = 900) {
  Fmax = Math.max(Fmax, 2 / p.S);
  const pts = []; for (let i = 0; i <= n; i++) { const F = Fmax * (i / n) ** 2; pts.push(bergPoint(F, p)); }
  // 找 Q(F) 的局部极大与极小（存在时即有迟滞）
  let iMax = -1, iMin = -1;
  for (let i = 1; i < pts.length - 1; i++) {
    if (iMax < 0 && pts[i].Q > pts[i - 1].Q && pts[i].Q >= pts[i + 1].Q) iMax = i;
    if (iMax >= 0 && iMin < 0 && pts[i].Q < pts[i - 1].Q && pts[i].Q <= pts[i + 1].Q) iMin = i;
  }
  const curve = pts.map(p => [p.Q, p.R]);
  if (iMax < 0 || iMin < 0) return { curve, up: curve, down: curve, hyst: false };
  const Qmax = pts[iMax].Q, Qmin = pts[iMin].Q;
  const jUp = pts.findIndex((p, i) => i > iMin && p.Q >= Qmax);        // 跳到的上方支（高覆盖支）点
  const jDn = pts.findIndex(p => p.Q >= Qmin);                         // 回跳落点（低覆盖支）
  if (jUp < 0 || jDn < 0) return { curve, up: curve, down: curve, hyst: false };
  const up = [...pts.slice(0, iMax + 1).map(p => [p.Q, p.R]), [Qmax, pts[jUp].R], ...pts.slice(jUp).map(p => [p.Q, p.R])];
  const down = [...pts.slice(iMin).map(p => [p.Q, p.R]).reverse(), [Qmin, pts[jDn].R], ...pts.slice(0, jDn + 1).map(p => [p.Q, p.R]).reverse()];
  return { curve, up, down, hyst: true, Qmax, Qmin };
}

// ---------------- ALD 自限制（Langmuir 型饱和，补充模型） ----------------
// 剂量以 Langmuir（1 L = 1e-6 Torr·s）计；TMA 在 300 K 的碰撞通量 Φ = P/√(2π m kT) ≈ 2.39e20 cm^-2 s^-1 Torr^-1
export const PHI_TMA = 2.39e20;
export const aldCoverage = (doseL, s, n0 = 4.6e14) => 1 - Math.exp(-s * PHI_TMA * doseL * 1e-6 / n0);

// ---------------- 蒸发均匀性：图 10.34、10.35 ----------------
// θ：自源点量起、相对竖直方向的发射角（rad）。返回相对厚度（θ=0 处为 1）
export const sphereCos = (th, n) => Math.pow(Math.cos(th), n - 1);          // 平面源位于球底，晶圆贴球面：cosⁿθ·cosθ/(L0 cosθ)²
export const flatCos = (th, n) => Math.pow(Math.cos(th), n + 3);            // 平面源正对平面晶圆：cosⁿθ·cosθ·cos²θ/h²
export const flatPoint = th => Math.pow(Math.cos(th), 3);                   // 各向同性点源正对平面晶圆

// ---------------- 台阶覆盖：视角因子 + 粘附系数（再发射为理想余弦） ----------------
// 几何：沟槽（2D，沿 y 无限长）宽 W=1、深 H=AR；通孔（圆柱）直径 1、深 H=AR。
// 入射分布（原书约定）：穿过水平面、每球面度的粒子数 ∝ cosⁿθ；n = 1 即理想余弦（Lambert）分布。
// 归一：∫cosⁿθ dΩ = 2π/(n+1)，使开阔平面的到达通量 = 1；对法向为 n_s 的面元，到达通量 = ∫ (n+1)/(2π)·cosⁿ⁻¹θ·(u·n_s) dΩ。
// 只计算"初始"沉积速率（薄膜极限）：几何不随沉积改变。
function dirGrid(n, Nt = 90, Np = 96) {
  const out = [], dt = Math.PI / 2 / Nt, dp = 2 * Math.PI / Np, c = (n + 1) / (2 * Math.PI);
  for (let i = 0; i < Nt; i++) {
    const th = (i + 0.5) * dt, st = Math.sin(th), ct = Math.cos(th), w = c * Math.pow(ct, n - 1) * st * dt * dp;
    for (let j = 0; j < Np; j++) { const ph = (j + 0.5) * dp; out.push([st * Math.cos(ph), st * Math.sin(ph), ct, w]); }
  }
  return out;
}
// 线性方程组（高斯消元，部分选主元）
function solve(A, b) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    [M[k], M[p]] = [M[p], M[k]];
    for (let i = k + 1; i < n; i++) { const f = M[i][k] / M[k][k]; if (f) for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j]; x[i] = s / M[i][i]; }
  return x;
}
// 沟槽：元素沿 左壁(自上而下)→底(左→右)→右壁(自下而上)
export function trenchCoverage(AR, n, Sc, nb = 20) {
  const W = 1, H = AR, nw = Math.max(4, Math.min(60, Math.round(nb * H))), el = [];
  for (let k = 0; k < nw; k++) el.push({ x: 0, z: -(k + 0.5) * H / nw, nx: 1, nz: 0, s: H / nw, part: "L", t: (k + 0.5) / nw });
  for (let k = 0; k < nb; k++) el.push({ x: (k + 0.5) * W / nb, z: -H, nx: 0, nz: 1, s: W / nb, part: "B", t: (k + 0.5) / nb });
  for (let k = nw - 1; k >= 0; k--) el.push({ x: W, z: -(k + 0.5) * H / nw, nx: -1, nz: 0, s: H / nw, part: "R", t: (k + 0.5) / nw });
  const dirs = dirGrid(n);
  const g0 = el.map(e => {
    let f = 0;
    for (const [ux, , uz, w] of dirs) {
      const dot = ux * e.nx + uz * e.nz; if (dot <= 0) continue;
      const xe = e.x + ux * (-e.z) / uz; if (xe >= 0 && xe <= W) f += w * dot;
    }
    return f;
  });
  // 2D 余弦再发射核：K_ij = cosθ_i cosθ_j /(2r)·ds_j（对 j 细分 4 段积分）
  const N = el.length, K = Array.from({ length: N }, () => new Array(N).fill(0));
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const a = el[i], b = el[j]; if (a.part === b.part) continue;
    let s = 0; const tx = b.nz !== 0 ? 1 : 0, tz = b.nz !== 0 ? 0 : 1;   // b 的切向
    for (let m = 0; m < 4; m++) {
      const off = (m + 0.5) / 4 - 0.5, px = b.x + tx * off * b.s, pz = b.z + tz * off * b.s;
      const dx = px - a.x, dz = pz - a.z, r = Math.hypot(dx, dz);
      const ci = (a.nx * dx + a.nz * dz) / r, cj = -(b.nx * dx + b.nz * dz) / r;
      if (ci > 0 && cj > 0) s += ci * cj / (2 * r) * b.s / 4;
    }
    K[i][j] = s;
  }
  const A = K.map((row, i) => row.map((v, j) => (i === j ? 1 : 0) - (1 - Sc) * v));
  const G = solve(A, g0);
  return { el, g: G, g0 };
}
// 通孔（圆柱，半径 0.5）：元素 = 侧壁环带（自上而下）+ 底部圆环（中心→边缘）
export function viaCoverage(AR, n, Sc, nb = 10) {
  const a = 0.5, H = AR * 2 * a, nw = Math.max(4, Math.min(50, Math.round(2 * nb * AR))), el = [];
  for (let k = 0; k < nw; k++) el.push({ wall: true, rho: a, z: -(k + 0.5) * H / nw, dz: H / nw, area: 2 * Math.PI * a * H / nw, t: (k + 0.5) / nw });
  for (let k = 0; k < nb; k++) { const r0 = k * a / nb, r1 = (k + 1) * a / nb; el.push({ wall: false, rho: (r0 + r1) / 2, r0, r1, z: -H, area: Math.PI * (r1 * r1 - r0 * r0), t: (k + 0.5) / nb }); }
  const dirs = dirGrid(n);
  const g0 = el.map(e => {
    let f = 0; const px = e.wall ? a * 0.999 : e.rho, nx = e.wall ? -1 : 0, nz = e.wall ? 0 : 1;
    for (const [ux, uy, uz, w] of dirs) {
      const dot = ux * nx + uz * nz; if (dot <= 0) continue;
      const s = -e.z / uz, X = px + ux * s, Y = uy * s; if (X * X + Y * Y <= a * a) f += w * dot;
    }
    return f;
  });
  const N = el.length, M = 64, K = Array.from({ length: N }, () => new Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    const A = el[i], pi = A.wall ? [a, 0, A.z] : [A.rho, 0, A.z], ni = A.wall ? [-1, 0, 0] : [0, 0, 1];
    for (let j = 0; j < N; j++) {
      const B = el[j]; if (!A.wall && !B.wall) continue;
      let s = 0; const sub = 2;
      for (let q = 0; q < sub; q++) for (let m = 0; m < M; m++) {
        const ph = (m + 0.5) * 2 * Math.PI / M, c = Math.cos(ph), sn = Math.sin(ph);
        let pj, nj;
        if (B.wall) { const z = B.z + ((q + 0.5) / sub - 0.5) * B.dz; pj = [a * c, a * sn, z]; nj = [-c, -sn, 0]; }
        else { const r = B.r0 + (q + 0.5) / sub * (B.r1 - B.r0); pj = [r * c, r * sn, B.z]; nj = [0, 0, 1]; }
        const d = [pj[0] - pi[0], pj[1] - pi[1], pj[2] - pi[2]], r2 = d[0] ** 2 + d[1] ** 2 + d[2] ** 2; if (r2 < 1e-12) continue;
        const r = Math.sqrt(r2), ci = (ni[0] * d[0] + ni[1] * d[1] + ni[2] * d[2]) / r, cj = -(nj[0] * d[0] + nj[1] * d[1] + nj[2] * d[2]) / r;
        if (ci > 0 && cj > 0) s += ci * cj / (Math.PI * r2) * B.area / (M * sub);
      }
      K[i][j] = s;
    }
  }
  const Am = K.map((row, i) => row.map((v, j) => (i === j ? 1 : 0) - (1 - Sc) * v));
  return { el, g: solve(Am, g0), g0, H };
}
// 汇总读数：底部中心、侧壁中点、侧壁最小值（相对平面）
export function summarize(res, kind) {
  const W = res.el.filter(e => kind === "via" ? e.wall : e.part === "L"), Wi = res.el.map((e, i) => i).filter(i => kind === "via" ? res.el[i].wall : res.el[i].part === "L");
  const Bi = res.el.map((e, i) => i).filter(i => kind === "via" ? !res.el[i].wall : res.el[i].part === "B");
  const wall = Wi.map(i => res.g[i]), bot = Bi.map(i => res.g[i]);
  const mid = wall[Math.floor(wall.length / 2)];
  const bc = kind === "via" ? bot[0] : bot[Math.floor(bot.length / 2)];
  return { wallMid: mid, wallMin: Math.min(...wall), wallTop: wall[0], bottomCenter: bc, bottomMin: Math.min(...bot), n: W.length };
}
