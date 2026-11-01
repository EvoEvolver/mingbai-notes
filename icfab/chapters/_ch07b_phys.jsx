// 第 7 章（下）数值模型：全部为纯函数，供 _ch07b_plots.jsx 调用；已用 node 与原书图 7.30、7.35、表 7.4/7.5 核对。
// 单位：长度 cm（显示时换 µm），时间 s，能量 eV，浓度 cm^-3。

export const KB = 8.617e-5;                     // 玻尔兹曼常数 eV/K
export const C2K = c => c + 273.15;

// ---------- 表 7.4：f_I、f_V ----------
export const FI = { Si: 0.6, B: 1.0, P: 1.0, As: 0.4, Sb: 0.02 };
// 式 (7.52)：D_eff/D* = f_I s_I + f_V s_V
export const dRatio = (fI, sI, sV) => fI * sI + (1 - fI) * sV;

// ---------- 式 (7.64)(7.65)、表 7.5：GaAs 中的扩散率 ----------
export const arr = (D0, Ea) => T => D0 * Math.exp(-Ea / (KB * T));   // T 单位 K
export const GAAS_SELF = {
  Ga_Ghandhi: arr(0.1, 3.2),      // (7.64) 第一行
  As_Ghandhi: arr(0.7, 5.6),      // (7.64) 第二行
  Ga_Tan: arr(2.9e8, 6.0),        // (7.65)
};
export const GAAS_DOP = {
  Sn: arr(8e2, 4.1), Ge: arr(2e-3, 2.9), Si: arr(4e-2, 3.3),   // D^=（n 型，式 7.69）
  Zn: arr(0.6, 3.21), Be: arr(35, 3.86),                         // D^{++}（p 型，式 7.68）
};

// GaAs 本征载流子浓度（Blakemore 参数）：N_c、N_v ∝ T^{3/2}，E_g(T) = 1.519 − 5.405e-4 T²/(T+204)
export function niGaAs(T) {
  const r = Math.pow(T / 300, 1.5), Nc = 4.7e17 * r, Nv = 9.0e18 * r;
  const Eg = 1.519 - 5.405e-4 * T * T / (T + 204);
  return Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * KB * T));
}

// ---------- 三对角（Thomas）求解：a 下、b 主、c 上、d 右端 ----------
export function thomas(a, b, c, d) {
  const n = b.length, cp = new Float64Array(n), dp = new Float64Array(n), x = new Float64Array(n);
  cp[0] = c[0] / b[0]; dp[0] = d[0] / b[0];
  for (let i = 1; i < n; i++) { const m = b[i] - a[i] * cp[i - 1]; cp[i] = c[i] / m; dp[i] = (d[i] - a[i] * dp[i - 1]) / m; }
  x[n - 1] = dp[n - 1];
  for (let i = n - 2; i >= 0; i--) x[i] = dp[i] - cp[i] * x[i + 1];
  return x;
}

// 隐式（向后欧拉）一步：∂u/∂t = ∂/∂x( D(x) ∂u/∂x )，两端零通量；D 给在节点上（界面取平均）
function implicitStep(u, D, dx, dt) {
  const n = u.length, a = new Float64Array(n), b = new Float64Array(n), c = new Float64Array(n);
  const r = dt / (dx * dx);
  for (let i = 0; i < n; i++) {
    const Dl = i > 0 ? 0.5 * (D[i] + D[i - 1]) : 0, Dr = i < n - 1 ? 0.5 * (D[i] + D[i + 1]) : 0;
    a[i] = -r * Dl; c[i] = -r * Dr; b[i] = 1 + r * (Dl + Dr);
  }
  return thomas(a, b, c, u);
}

const gauss = (x, Q, Rp, dR) => Q / (Math.sqrt(2 * Math.PI) * dR) * Math.exp(-((x - Rp) ** 2) / (2 * dR * dR));

// ---------- 点缺陷复合动力学（零维，归一化 i = C_I/C_I*, v = C_V/C_V*） ----------
// di/dt = g − r(iv − 1) − (i − 1)/τ ；  dv/dt = − r(iv − 1) − (v − 1)/τ
// g：氧化注入速率（以 C_I* 每秒计），r = k_R C*（复合速率），τ：向表面/体内阱的弛豫时间。
// 向后欧拉 + 牛顿迭代（方程在 r 很大时是刚性的），时间步按对数增长。
export function recombine({ g, r, tau, t0 = 1e-3, t1 = 1e4, n = 500 }) {
  let i = 1, v = 1, tPrev = 0; const out = [];
  for (let k = 0; k <= n; k++) {
    const t = t0 * Math.pow(t1 / t0, k / n), h = t - tPrev; tPrev = t;
    let I = i, V = v;
    for (let it = 0; it < 30; it++) {
      const R = r * (I * V - 1);
      const F1 = I - i - h * (g - R - (I - 1) / tau), F2 = V - v - h * (-R - (V - 1) / tau);
      const a11 = 1 + h * (r * V + 1 / tau), a12 = h * r * I, a21 = h * r * V, a22 = 1 + h * (r * I + 1 / tau);
      const det = a11 * a22 - a12 * a21, dI = (F1 * a22 - F2 * a12) / det, dV = (a11 * F2 - a21 * F1) / det;
      I -= dI; V -= dV; if (V < 1e-9) V = 1e-9;
      if (Math.abs(dI) < 1e-10 * (1 + I) && Math.abs(dV) < 1e-10 * (1 + V)) break;
    }
    i = I; v = V; out.push([t, i, v]);
  }
  return out;
}

// ---------- 点缺陷梯度驱动的"上坡扩散"（由式 7.59） ----------
// F = −D* ∂(C_A S)/∂x，S = C_I/C_I*（给定、不随时间变）；∂C/∂t = D* ∂²(S C)/∂x²，两端零通量。
// 隐式：(1 − dt D* Δ S)C^{n+1} = C^n。x ∈ [0, L]，S(x) = 1 + (Smax − 1)(1 − e^{−x/λ})。
export function uphill({ Smax, lam, L = 0.3e-4, Dt, n = 160, steps = 200 }) {
  const dx = L / (n - 1), xs = Array.from({ length: n }, (_, k) => k * dx);
  const S = xs.map(x => 1 + (Smax - 1) * (1 - Math.exp(-x / lam)));
  let C = new Float64Array(n).fill(1);
  const dt = Dt / steps, r = dt / (dx * dx);
  for (let s = 0; s < steps; s++) {
    const a = new Float64Array(n), b = new Float64Array(n), c = new Float64Array(n);
    for (let k = 0; k < n; k++) {
      // 零通量：∂(SC)/∂x = 0 于两端（镜像节点）
      if (k === 0) { b[k] = 1 + 2 * r * S[k]; c[k] = -2 * r * S[k + 1]; }
      else if (k === n - 1) { a[k] = -2 * r * S[k - 1]; b[k] = 1 + 2 * r * S[k]; }
      else { a[k] = -r * S[k - 1]; b[k] = 1 + 2 * r * S[k]; c[k] = -r * S[k + 1]; }
    }
    C = thomas(a, b, c, C);
  }
  // 稳态：S·C = 常数，按总量守恒归一
  const inv = S.map(s => 1 / s), mean = (inv.reduce((p, q) => p + q, 0) - (inv[0] + inv[n - 1]) / 2) / (n - 1);   // 梯形权重（与零通量格式的守恒量一致）
  return { xs, S, C: Array.from(C), Cinf: inv.map(q => q / mean) };
}

// ---------- 多晶硅两股流模型（式 7.61–7.63） ----------
// 晶粒内 Cg、晶界 Cb（均以单位总体积计）；k_eff(t) = π² D_grain / L_g(t)²（本页的建模假设：
// 晶粒内向晶界扩散的最低本征模），L_g(t) = sqrt(L_go² + 2σt)（式 7.63）。算子分裂：隐式扩散 + 精确交换。
export function poly({ tMin, ratio, Lg0nm, sigma, seg, Dg = 1e-16, film = 0.3e-4, Q = 1e15, Rp = 0.04e-4, dR = 0.015e-4, n = 121, steps = 240 }) {
  const dx = film / (n - 1), xs = Array.from({ length: n }, (_, k) => k * dx);
  let Cg = Float64Array.from(xs, x => gauss(x, Q, Rp, dR)), Cb = new Float64Array(n), Cx = Float64Array.from(Cg);
  const Db = Dg * ratio, T = tMin * 60, dt = T / steps;
  const DgA = new Float64Array(n).fill(Dg), DbA = new Float64Array(n).fill(Db), D100 = new Float64Array(n).fill(100 * Dg);
  let C100 = Float64Array.from(Cg);
  for (let s = 0; s < steps; s++) {
    const tm = (s + 0.5) * dt, Lg = Math.sqrt((Lg0nm * 1e-7) ** 2 + 2 * sigma * 1e-14 * tm);   // σ 以 nm²/s 输入
    const k = Math.PI * Math.PI * Dg / (Lg * Lg);
    Cg = implicitStep(Cg, DgA, dx, dt); Cb = implicitStep(Cb, DbA, dx, dt);
    const f = Math.exp(-k * (1 + 1 / seg) * dt);
    for (let i = 0; i < n; i++) {
      const tot = Cg[i] + Cb[i], q = (Cg[i] - Cb[i] / seg) * f;
      Cb[i] = (tot - q) * seg / (seg + 1); Cg[i] = tot - Cb[i];
    }
    Cx = implicitStep(Cx, DgA, dx, dt); C100 = implicitStep(C100, D100, dx, dt);
  }
  const LgEnd = Math.sqrt((Lg0nm * 1e-7) ** 2 + 2 * sigma * 1e-14 * T);
  return { xs, Cg: Array.from(Cg), Cb: Array.from(Cb), Cx: Array.from(Cx), C100: Array.from(C100), LgEnd };
}

// ---------- GaAs 中 Zn 的平方律浓度依赖扩散（式 7.67） ----------
// ∂C/∂t = ∂/∂x[ D^{++} (p/n_i)² ∂C/∂x ]，p = C/2 + sqrt(C²/4 + n_i²)（全部 Zn 电离、忽略补偿与析出）。
// 系数滞后（上一步浓度）的隐式格式，时间步几何增长；初始为高斯注入分布。
export function znBox({ TC, tMin, Q, Rp = 0.05e-4, dR = 0.03e-4, L = 1.6e-4, n = 321, steps = 300, Dpp = GAAS_DOP.Zn, bg = 1e16 }) {
  const T = C2K(TC), ni = niGaAs(T), D0 = Dpp(T), dx = L / (n - 1);
  const xs = Array.from({ length: n }, (_, k) => k * dx);
  let C = Float64Array.from(xs, x => gauss(x, Q, Rp, dR));
  const tEnd = tMin * 60, gr = 1.03, h0 = tEnd * (gr - 1) / (Math.pow(gr, steps) - 1);
  let h = h0;
  const D = new Float64Array(n);
  for (let s = 0; s < steps; s++) {
    for (let i = 0; i < n; i++) { const p = C[i] / 2 + Math.sqrt(C[i] * C[i] / 4 + ni * ni); D[i] = D0 * (p / ni) ** 2; }
    C = implicitStep(C, D, dx, h); h *= gr;
  }
  return { xs, C: Array.from(C, c => c + bg), ni, D0 };
}
