// 第 7 章（上）交互图用到的数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。
// 单位：长度 cm、时间 s、浓度 cm^-3、剂量 cm^-2、能量 eV、温度输入为 ˚C。
// 已核对：B 在 1100˚C 的 D=1.42e-13（原书读图 1.5e-13）；As 1000˚C 表 7.3 全式 1.43e-15 / 1.66e-14（原书例题）；
//         n_i(1000˚C)=7.13e18（原书 7.14e18）；高斯/erfc 解与有限差分解在 r=0.4 时相对误差 < 1%。

export const KB = 8.617e-5;                       // 玻尔兹曼常数 [eV/K]
export const Q_E = 1.602e-19;                     // 电子电荷 [C]
export const TK = Tc => Tc + 273.15;

// ---------- 表 7.2：本征扩散系数的 Arrhenius 拟合 ----------
export const TABLE72 = {
  Si: { D0: 560, Ea: 4.76 }, B: { D0: 1.0, Ea: 3.5 }, In: { D0: 1.2, Ea: 3.5 },
  As: { D0: 9.17, Ea: 3.99 }, Sb: { D0: 4.58, Ea: 3.88 }, P: { D0: 4.70, Ea: 3.68 },
};
export const Dint = (dop, Tc) => { const r = TABLE72[dop]; return r.D0 * Math.exp(-r.Ea / (KB * TK(Tc))); };

// ---------- 表 7.3：按点缺陷电荷态拆开的扩散系数 ----------
// 每项 [D(0) cm^2/s, D(E) eV]；p 型杂质用 Dp（D^+），n 型用 Dm（D^-）与 Dmm（D^=）
export const TABLE73 = {
  Si: { D0: [560, 4.76] },
  B: { D0: [0.05, 3.5], Dp: [0.95, 3.5], type: "p" },
  In: { D0: [0.6, 3.5], Dp: [0.6, 3.5], type: "p" },
  As: { D0: [0.011, 3.44], Dm: [31.0, 4.15], type: "n" },
  Sb: { D0: [0.214, 3.65], Dm: [15.0, 4.08], type: "n" },
  P: { D0: [3.85, 3.66], Dm: [4.44, 4.0], Dmm: [44.2, 4.37], type: "n" },
};
const arr = (pair, Tc) => (pair ? pair[0] * Math.exp(-pair[1] / (KB * TK(Tc))) : 0);
// 各项在给定温度下的数值
export function terms73(dop, Tc) {
  const r = TABLE73[dop];
  return { D0: arr(r.D0, Tc), Dp: arr(r.Dp, Tc), Dm: arr(r.Dm, Tc), Dmm: arr(r.Dmm, Tc), type: r.type };
}
// 式 (7.43)/(7.44)：载流子浓度比 eta = n/n_i（或 p/n_i）下的有效扩散系数
export function Deff73(dop, Tc, eta) {
  const t = terms73(dop, Tc);
  return t.type === "p" ? t.D0 + t.Dp * eta : t.D0 + t.Dm * eta + t.Dmm * eta * eta;
}

// ---------- 本征载流子浓度（常用拟合式；1000˚C 给 7.13e18，与原书 7.14e18 一致）----------
export const ni = Tc => { const T = TK(Tc); return 3.9e16 * Math.pow(T, 1.5) * Math.exp(-0.605 / (KB * T)); };
// 电中性 + 全电离：n = C/2 + sqrt(C^2/4 + n_i^2)
export const nFree = (C, n_i) => C / 2 + Math.sqrt(C * C / 4 + n_i * n_i);
// 式 (7.41)：电场增强因子
export const hField = (C, n_i) => 1 + C / Math.sqrt(C * C + 4 * n_i * n_i);

// ---------- 误差函数（Numerical Recipes erfcc，相对误差 < 1.2e-7，适合对数坐标）----------
export function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
export const erf = x => 1 - erfc(x);
// erfc 的反函数（y∈(0,2)），对数二分
export function erfcinv(y) {
  if (y >= 1) return -erfcinv(2 - y);
  let lo = 0, hi = 30;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (erfc(m) > y) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

// ---------- 解析解 ----------
export const gaussSurf = (x, Q, Dt) => Q / Math.sqrt(Math.PI * Dt) * Math.exp(-x * x / (4 * Dt));       // 式 (7.15)
export const erfcSurf = (x, Cs, Dt) => Cs * erfc(x / (2 * Math.sqrt(Dt)));                               // 式 (7.26)
export const doseErfc = (Cs, Dt) => 2 * Cs / Math.sqrt(Math.PI) * Math.sqrt(Dt);                         // 式 (7.27)
export const xjGauss = (Cs, CB, Dt) => (Cs > CB ? 2 * Math.sqrt(Dt) * Math.sqrt(Math.log(Cs / CB)) : 0);
export const xjErfc = (Cs, CB, Dt) => (Cs > CB ? 2 * Math.sqrt(Dt) * erfcinv(CB / Cs) : 0);

// ---------- 迁移率（Masetti 型经验式，300 K）与 Irvin 曲线 ----------
export const muHole = N => 44.9 + (470.5 - 44.9) / (1 + Math.pow(N / 2.23e17, 0.719));
export const muElec = N => 68.5 + (1414 - 68.5) / (1 + Math.pow(N / 9.2e16, 0.711));
// 式 (7.4)：平均电导率 σ̄ = 1/(ρ_S x_j)。对高斯/erfc 分布它只依赖 C_S 与 C_B（与 Dt 无关）
export function sigmaBar(Cs, CB, shape = "gauss", carrier = "p", n = 400) {
  if (Cs <= CB) return NaN;
  const mu = carrier === "p" ? muHole : muElec;
  const f = shape === "gauss" ? u => Cs * Math.exp(-u * u) : u => Cs * erfc(u);
  const uj = shape === "gauss" ? Math.sqrt(Math.log(Cs / CB)) : erfcinv(CB / Cs);
  let s = 0; const h = uj / n;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) * h, C = f(u); s += (C - CB) * mu(C + CB) * h; }
  return Q_E * s / uj;
}
// 反查：给定 σ̄ 与 C_B，求 C_S（σ̄ 随 C_S 单调增）
export function csFromSigma(sig, CB, shape = "gauss", carrier = "p") {
  let lo = Math.log(CB * 1.0001), hi = Math.log(1e22);
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (sigmaBar(Math.exp(m), CB, shape, carrier, 200) < sig) lo = m; else hi = m; }
  return Math.exp((lo + hi) / 2);
}

// ---------- 三对角（Thomas）求解：a_i C_{i-1} + b_i C_i + c_i C_{i+1} = d_i ----------
function thomas(a, b, c, d) {
  const n = d.length, cp = new Float64Array(n), dp = new Float64Array(n), x = new Float64Array(n);
  cp[0] = c[0] / b[0]; dp[0] = d[0] / b[0];
  for (let i = 1; i < n; i++) { const m = b[i] - a[i] * cp[i - 1]; cp[i] = c[i] / m; dp[i] = (d[i] - a[i] * dp[i - 1]) / m; }
  x[n - 1] = dp[n - 1];
  for (let i = n - 2; i >= 0; i--) x[i] = dp[i] - cp[i] * x[i + 1];
  return x;
}

// ---------- §7.8 一维有限差分：式 (7.37) 显式，或向后 Euler 隐式 ----------
// 无量纲：x 以 Δx 计，r = DΔt/Δx²。bc: "reflect"（零通量表面，剂量守恒）或 "fixed"（C_0 固定）
export function fdRun(C0, r, steps, method = "explicit", bc = "reflect") {
  let C = Float64Array.from(C0); const n = C.length;
  for (let s = 0; s < steps; s++) {
    if (method === "explicit") {
      const N = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        const L = i === 0 ? (bc === "reflect" ? C[1] : C[0]) : C[i - 1], Rr = i === n - 1 ? C[n - 2] : C[i + 1];
        N[i] = C[i] + r * (L - 2 * C[i] + Rr);
      }
      if (bc === "fixed") N[0] = C0[0];
      C = N;
    } else {
      const a = new Float64Array(n).fill(-r), b = new Float64Array(n).fill(1 + 2 * r), c = new Float64Array(n).fill(-r), d = Float64Array.from(C);
      if (bc === "reflect") { c[0] = -2 * r; } else { a[0] = 0; b[0] = 1; c[0] = 0; d[0] = C0[0]; }
      a[n - 1] = -2 * r;
      C = thomas(a, b, c, d);
    }
  }
  return C;
}

// ---------- §7.9–7.10 浓度依赖扩散（隐式，D 取上一步值）----------
// opts: {Cs, CB(仅用于结深), n_i, Dfun(C)->D [cm^2/s], field:boolean, t [s], L [cm], N, steps}
// 表面恒定浓度 Cs（预淀积型边界），深处零通量。返回 {x:[cm], C:[cm^-3], dose}
export function concDepRun({ Cs, n_i, Dfun, field = false, t, L, N = 240, steps = 300 }) {
  const dx = L / (N - 1); let C = new Float64Array(N); C[0] = Cs;
  // 时间步按 t^2 加密：早期梯度陡
  let tPrev = 0;
  for (let s = 1; s <= steps; s++) {
    const tNow = t * (s / steps) * (s / steps), dt = tNow - tPrev; tPrev = tNow;
    const D = new Float64Array(N);
    for (let i = 0; i < N; i++) D[i] = Dfun(Math.max(C[i], 0)) * (field ? hField(Math.max(C[i], 0), n_i) : 1);
    const a = new Float64Array(N), b = new Float64Array(N), c = new Float64Array(N), d = Float64Array.from(C);
    a[0] = 0; b[0] = 1; c[0] = 0; d[0] = Cs;
    for (let i = 1; i < N; i++) {
      const Dl = (D[i - 1] + D[i]) / 2, Dr = i < N - 1 ? (D[i] + D[i + 1]) / 2 : 0, k = dt / (dx * dx);
      a[i] = -k * Dl; c[i] = i < N - 1 ? -k * Dr : 0; b[i] = 1 + k * (Dl + Dr);
    }
    C = thomas(a, b, c, d);
  }
  let dose = 0; for (let i = 0; i < N - 1; i++) dose += (C[i] + C[i + 1]) / 2 * dx;
  return { x: Array.from({ length: N }, (_, i) => i * dx), C: Array.from(C), dose };
}

// ---------- §7.11 分凝 + 移动界面（氧化消耗硅，"雪犁"堆积或耗尽）----------
// 坐标随 Si/SiO2 界面移动：y=0 为界面，y>0 为硅。氧化层厚 X（终值），线性生长；每生长 1 单位氧化层消耗 0.44 单位硅。
// 界面平衡：C_ox = C_Si(0)/m（式 7.50 的定义），氧化层中扩散忽略。
// 返回 {y, C（硅中）, ox:[[位置(负值), 浓度]]（氧化层中，冻结的历史）}
export function segregationRun({ C0, m, D, t, X, L, N = 260, steps = 600 }) {
  const dy = L / (N - 1), dt = t / steps, vSi = 0.44 * X / t, vOx = X / t;
  let C = new Float64Array(N).fill(C0); const oxLayers = [];
  for (let s = 0; s < steps; s++) {
    // 1) 对流（界面系中硅向界面流动）+ 界面边界：氧化层带走 C(0)/m·vOx
    const k = vSi * dt / dy, N2 = Float64Array.from(C);
    for (let i = 0; i < N; i++) {
      const inflow = i < N - 1 ? C[i + 1] : C0, out = i === 0 ? (vSi > 0 ? C[0] * vOx / (m * vSi) : 0) : C[i];
      N2[i] = C[i] + k * (inflow - out);
    }
    if (X > 0) oxLayers.push(C[0] / m);
    C = N2;
    // 2) 隐式扩散（界面处零扩散通量，深处固定为本体浓度）
    const r = D * dt / (dy * dy);
    const a = new Float64Array(N).fill(-r), b = new Float64Array(N).fill(1 + 2 * r), c = new Float64Array(N).fill(-r), d = Float64Array.from(C);
    a[0] = 0; c[0] = -2 * r; a[N - 1] = 0; b[N - 1] = 1; c[N - 1] = 0; d[N - 1] = C0;
    C = thomas(a, b, c, d);
  }
  // 氧化层：最早长成的在最外侧（y = -X），最新的贴着界面（y = 0）
  const ox = oxLayers.map((v, i) => [-X + (i + 0.5) * X / steps, v]);
  return { y: Array.from({ length: N }, (_, i) => i * dy), C: Array.from(C), ox };
}

// ---------- 二维掩模窗口扩散（无量纲，长度以 $2\sqrt{Dt}$ 计）----------
// 窗口半宽 a，横向 x∈[-W,W]，纵向 z∈[0,H]。返回 {nx, nz, xs, zs, C(Float64Array, 行主序 z*nx+x)，已归一到 C_S 或峰值}
export function mask2D({ mode = "drive", a = 1, W = 4, H = 3.5, nx = 81, nz = 41 }) {
  const xs = Array.from({ length: nx }, (_, i) => -W + 2 * W * i / (nx - 1)), zs = Array.from({ length: nz }, (_, j) => H * j / (nz - 1));
  const C = new Float64Array(nx * nz);
  if (mode === "drive") {
    // 窗口内表面剂量 Q，表面反射：C = Q/√(πDt)·exp(-z²/4Dt)·½[erf((a-x)/2√Dt)+erf((a+x)/2√Dt)]；以 2√Dt=1 计，归一到窗口中心表面值
    const norm = erf(a);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const x = xs[i], z = zs[j];
      C[j * nx + i] = Math.exp(-z * z) * 0.5 * (erf(a - x) + erf(a + x)) / norm;
    }
  } else {
    // 恒定表面浓度（仅窗口内 C=1），掩模下零通量：显式二维有限差分；以 4Dt = 1 → Dt = 1/4
    const dx = xs[1] - xs[0], dz = zs[1] - zs[0], h = Math.min(dx, dz), Dt = 0.25;
    const dtau = 0.2 * h * h, steps = Math.ceil(Dt / dtau), rx = (Dt / steps) / (dx * dx), rz = (Dt / steps) / (dz * dz);
    let U = new Float64Array(nx * nz), V = new Float64Array(nx * nz);
    const inWin = i => Math.abs(xs[i]) <= a;
    for (let i = 0; i < nx; i++) if (inWin(i)) U[i] = 1;
    for (let s = 0; s < steps; s++) {
      for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
        const id = j * nx + i;
        if (j === 0 && inWin(i)) { V[id] = 1; continue; }
        const L = U[j * nx + Math.max(i - 1, 0)], Rr = U[j * nx + Math.min(i + 1, nx - 1)];
        const Up = j === 0 ? U[nx + i] : U[(j - 1) * nx + i], Dn = j === nz - 1 ? 0 : U[(j + 1) * nx + i];
        V[id] = U[id] + rx * (L - 2 * U[id] + Rr) + rz * (Up - 2 * U[id] + Dn);
      }
      [U, V] = [V, U];
    }
    C.set(U);
  }
  return { nx, nz, xs, zs, C };
}
// 从二维场中读结深（窗口中心，z 方向）与横向扩散（表面，x 方向，超出窗口边缘的距离）
export function junction2D(f, a, cb) {
  const { nx, nz, xs, zs, C } = f, ic = Math.floor(nx / 2);
  let zj = NaN; for (let j = 1; j < nz; j++) { const c0 = C[(j - 1) * nx + ic], c1 = C[j * nx + ic]; if (c0 >= cb && c1 < cb) { zj = zs[j - 1] + (zs[j] - zs[j - 1]) * Math.log(c0 / cb) / Math.log(c0 / c1); break; } }
  let xl = NaN; for (let i = ic + 1; i < nx; i++) { const c0 = C[i - 1], c1 = C[i]; if (c0 >= cb && c1 < cb) { xl = xs[i - 1] + (xs[i] - xs[i - 1]) * Math.log(c0 / cb) / Math.log(c0 / c1) - a; break; } }
  return { zj, xl };
}

// ---------- 小工具 ----------
export const sci = (v, d = 2) => {
  if (!Number.isFinite(v)) return "—";
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e);
  return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : `${m.toFixed(d)}\\times10^{${e}}`;
};
export const fmtTime = s => (s < 120 ? `${s.toPrecision(3)}\\ \\mathrm{s}` : s < 7200 ? `${(s / 60).toPrecision(3)}\\ \\mathrm{min}` : `${(s / 3600).toPrecision(3)}\\ \\mathrm{h}`);
