// 第 10 章交互图的数值核心（纯函数，无 React；已在 node 中逐项核对，见文件末尾注释）。
//  A. 球面上的平行移动与和乐（Levi-Civita 联络 = 标架丛 SO(2) 联络）：RK4 积分 / 局部联络线积分 / 立体角（面积）
//  B. Dirac 单极子：A_N、A_S 的 Wilson 圈、转移函数的卷绕；自旋 1/2 的 Berry 相位（离散重叠积 + 含时 Schrödinger 方程）
//  C. SU(2) 规范场：F = dA + A∧A 的三种算法（矩阵公式 / 分量公式 / 小方圈和乐）、规范协变、Bianchi 恒等式
//  D. 瞬子：映射度 n = (1/24π²)∫_{S³} tr(g⁻¹dg)³ 的数值积分

const TAU = 2 * Math.PI;
export const wrap = a => { let x = (a + Math.PI) % TAU; if (x < 0) x += TAU; return x - Math.PI; };   // → (−π, π]

// ---------------- 三维向量 ----------------
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const add = (a, b, s = 1) => [a[0] + s * b[0], a[1] + s * b[1], a[2] + s * b[2]];
const scl = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const nrm = a => scl(a, 1 / Math.hypot(a[0], a[1], a[2]));
export const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];

// ============================================================
// A. 球面上的闭路：每条闭路是若干光滑段 [{x(s), dx(s)}]，s∈[0,1]
// ============================================================
function slerpSeg(a, b) {   // 大圆弧 a→b
  const om = Math.acos(Math.max(-1, Math.min(1, dot(a, b)))), so = Math.sin(om);
  return {
    x: s => add(scl(a, Math.sin((1 - s) * om) / so), b, Math.sin(s * om) / so),
    dx: s => add(scl(a, -om * Math.cos((1 - s) * om) / so), b, om * Math.cos(s * om) / so),
  };
}
// 以 c（极角 α）为中心、角半径 ρ 的小圆；从外面看绕 c 逆时针
function circleSeg(al, rho) {
  const c = [Math.sin(al), 0, Math.cos(al)], e1 = [Math.cos(al), 0, -Math.sin(al)], e2 = [0, 1, 0];
  const cr = Math.cos(rho), sr = Math.sin(rho);
  return {
    x: s => add(add(scl(c, cr), e1, sr * Math.cos(TAU * s)), e2, sr * Math.sin(TAU * s)),
    dx: s => add(scl(e1, -TAU * sr * Math.sin(TAU * s)), e2, TAU * sr * Math.cos(TAU * s)),
  };
}
export function makeLoop(kind, p) {
  if (kind === "lat") return { segs: [circleSeg(0, p.th0)], exact: TAU * (1 - Math.cos(p.th0)) };
  if (kind === "tilt") return { segs: [circleSeg(p.al, p.rho)], exact: TAU * (1 - Math.cos(p.rho)) };
  // 测地三角形（"橘瓣"）：北极 → 赤道 φ=0 → 赤道 φ=Δ → 北极；Gauss–Bonnet：面积 = 内角和 − π = Δ
  const N = [0, 0, 1], A = [1, 0, 0], B = [Math.cos(p.dphi), Math.sin(p.dphi), 0];
  return { segs: [slerpSeg(N, A), slerpSeg(A, B), slerpSeg(B, N)], exact: p.dphi };
}
export function loopPoints(loop, per = 200) {
  const pts = [];
  loop.segs.forEach(sg => { for (let k = 0; k < per; k++) pts.push(sg.x(k / per)); });
  return pts;
}
// (1) 平行移动 ODE：dv/ds = −(v·ẋ) x（保持 v 与球面相切、长度不变），RK4
export function transport(loop, v0, steps = 400, keep = 24) {
  let v = v0.slice(); const trail = [];
  loop.segs.forEach(sg => {
    const f = (s, w) => scl(sg.x(s), -dot(w, sg.dx(s)));
    const h = 1 / steps;
    for (let k = 0; k < steps; k++) {
      const s = k * h;
      if (k % Math.round(steps / keep) === 0) trail.push({ x: sg.x(s), v: v.slice() });
      const k1 = f(s, v), k2 = f(s + h / 2, add(v, k1, h / 2)), k3 = f(s + h / 2, add(v, k2, h / 2)), k4 = f(s + h, add(v, k3, h));
      v = add(v, add(add(k1, k4), add(k2, k3), 2), h / 6);
    }
  });
  return { v, trail };
}
// 有向转角：从 a 转到 b、绕外法向 n 逆时针为正
export const angleAbout = (a, b, n) => Math.atan2(dot(cross(a, b), n), dot(a, b));
// (2) 北极正则标架下的局部联络：和乐角 = ∮(1 − cosθ) dφ（"g = 1 的单极子势"）
export function lineIntegralNorth(pts) {
  let s = 0;
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k], b = pts[(k + 1) % pts.length];
    const m = nrm(add(a, b));                                   // 中点
    const dphi = wrap(Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]));
    s += (1 - m[2]) * dphi;
  }
  return s;
}
// (3) 立体角：以闭路"中心"为公共顶点做三角扇，逐个用 Van Oosterom–Strackee 公式求有向球面三角形面积
export function solidAngle(pts) {
  let c = [0, 0, 0]; pts.forEach(p => { c = add(c, p); }); c = nrm(c);
  let s = 0;
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k], b = pts[(k + 1) % pts.length];
    s += 2 * Math.atan2(dot(c, cross(a, b)), 1 + dot(c, a) + dot(a, b) + dot(b, c));
  }
  return s;
}
// 切向量的初值：在基点取"指向北"的切向（基点在北极时取 x 方向）
export function tangentAt(x) {
  const t = add([0, 0, 1], x, -x[2]);
  return Math.hypot(...t) < 1e-9 ? [1, 0, 0] : nrm(t);
}

// ============================================================
// B. Dirac 单极子与 Berry 相位
// ============================================================
// A_N = g(1−cosθ)dφ，A_S = −g(1+cosθ)dφ（实势；原书的 𝒜 = iA）。沿采样闭路做线积分。
export function wilson(pts, g) {
  let aN = 0, aS = 0, nearS = false, nearN = false;
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k], b = pts[(k + 1) % pts.length], m = nrm(add(a, b));
    const dphi = wrap(Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]));
    aN += g * (1 - m[2]) * dphi; aS += -g * (1 + m[2]) * dphi;
    if (m[2] < -0.999) nearS = true; if (m[2] > 0.999) nearN = true;
  }
  return { aN, aS, nearS, nearN };
}
// 盖帽（闭路左侧区域）内的磁通 ∫ g sinθ dθ dφ = g × 立体角（这里直接用立体角，独立于线积分）
// 自旋 1/2：H = R·σ，取本征值 +|R| 的本征矢（数值对角化 + 随机相位，演示规范无关）
function eigUp(R, phase) {
  const [x, y, z] = R, r = Math.hypot(x, y, z);
  // (H − r)v = 0 的两种写法，选数值稳定的一种
  let v = z > -0.5 * r ? [[r + z, 0], [x, y]] : [[x, -y], [r - z, 0]];
  const n = Math.hypot(v[0][0], v[0][1], v[1][0], v[1][1]);
  const c = Math.cos(phase), s = Math.sin(phase);
  return v.map(([re, im]) => [(re * c - im * s) / n, (re * s + im * c) / n]);
}
const ip = (u, v) => [u[0][0] * v[0][0] + u[0][1] * v[0][1] + u[1][0] * v[1][0] + u[1][1] * v[1][1],
  u[0][0] * v[0][1] - u[0][1] * v[0][0] + u[1][0] * v[1][1] - u[1][1] * v[1][0]];   // ⟨u|v⟩
// 离散 Berry 相位：η = −arg Π⟨ψ_k|ψ_{k+1}⟩（与 η = i∮⟨R|d|R⟩ 一致）；seed≠0 时每点乘随机相位
export function berryDiscrete(pts, seed = 0) {
  let rnd = seed || 1; const rand = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647;
  const psi = pts.map(p => eigUp(p, seed ? TAU * rand() : 0));
  let re = 1, im = 0;
  for (let k = 0; k < psi.length; k++) {
    const [a, b] = ip(psi[k], psi[(k + 1) % psi.length]);
    [re, im] = [re * a - im * b, re * b + im * a];
  }
  return -Math.atan2(im, re);
}
// 含时 Schrödinger 方程 i dψ/dt = H(R(t))ψ，R(t) 沿纬圈 θ0 转一圈，总时间 T；返回 Berry 相位估计 η = arg⟨ψ0|ψT⟩ + E T（E = |R| = 1）
// xs：s∈[0,1] ↦ 单位球面上的点（闭路），R(t) = xs(t/T)
export function berryDynamic(xs, T, dt = 0.01) {
  const H = t => { const [x, y, z] = xs(t / T); return [[z, 0], [x, -y], [x, y], [-z, 0]]; };   // [[H11],[H12],[H21],[H22]] 复数
  const rhs = (t, s) => {   // −i H ψ
    const h = H(t);
    const a = [h[0][0] * s[0][0] - h[0][1] * s[0][1] + h[1][0] * s[1][0] - h[1][1] * s[1][1], h[0][0] * s[0][1] + h[0][1] * s[0][0] + h[1][0] * s[1][1] + h[1][1] * s[1][0]];
    const b = [h[2][0] * s[0][0] - h[2][1] * s[0][1] + h[3][0] * s[1][0] - h[3][1] * s[1][1], h[2][0] * s[0][1] + h[2][1] * s[0][0] + h[3][0] * s[1][1] + h[3][1] * s[1][0]];
    return [[a[1], -a[0]], [b[1], -b[0]]];
  };
  const ax = (s, k, h) => s.map((c, i) => [c[0] + h * k[i][0], c[1] + h * k[i][1]]);
  const psi0 = eigUp(xs(0), 0); let s = psi0.map(c => c.slice());
  const n = Math.ceil(T / dt), h = T / n;
  for (let k = 0; k < n; k++) {
    const t = k * h, k1 = rhs(t, s), k2 = rhs(t + h / 2, ax(s, k1, h / 2)), k3 = rhs(t + h / 2, ax(s, k2, h / 2)), k4 = rhs(t + h, ax(s, k3, h));
    s = s.map((c, i) => [c[0] + h / 6 * (k1[i][0] + 2 * k2[i][0] + 2 * k3[i][0] + k4[i][0]), c[1] + h / 6 * (k1[i][1] + 2 * k2[i][1] + 2 * k3[i][1] + k4[i][1])]);
  }
  const [re, im] = ip(psi0, s);
  return { eta: wrap(Math.atan2(im, re) + T), fid: Math.hypot(re, im) };
}

// ============================================================
// C. 2×2 复矩阵与 SU(2) 规范场
// ============================================================
// 复矩阵 [a, b, c, d]，每个元素 [re, im]
const C = (re, im = 0) => [re, im];
const cm = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
const ca = (x, y) => [x[0] + y[0], x[1] + y[1]];
export const M = {
  zero: () => [C(0), C(0), C(0), C(0)], id: () => [C(1), C(0), C(0), C(1)],
  add: (A, B, s = 1) => A.map((x, i) => [x[0] + s * B[i][0], x[1] + s * B[i][1]]),
  scale: (A, s) => A.map(x => [x[0] * s, x[1] * s]),
  mul: (A, B) => [ca(cm(A[0], B[0]), cm(A[1], B[2])), ca(cm(A[0], B[1]), cm(A[1], B[3])), ca(cm(A[2], B[0]), cm(A[3], B[2])), ca(cm(A[2], B[1]), cm(A[3], B[3]))],
  comm: (A, B) => M.add(M.mul(A, B), M.mul(B, A), -1),
  dag: A => [[A[0][0], -A[0][1]], [A[2][0], -A[2][1]], [A[1][0], -A[1][1]], [A[3][0], -A[3][1]]],
  norm: A => Math.sqrt(A.reduce((s, x) => s + x[0] * x[0] + x[1] * x[1], 0)),
  tr: A => ca(A[0], A[3]),
};
// T_a = σ_a / (2i)：T1 = [[0,−i/2],[−i/2,0]]，T2 = [[0,−1/2],[1/2,0]]，T3 = [[−i/2,0],[0,i/2]]
export const T = [
  [C(0), C(0, -0.5), C(0, -0.5), C(0)],
  [C(0), C(-0.5), C(0.5), C(0)],
  [C(0, -0.5), C(0), C(0), C(0, 0.5)],
];
export const fromComp = v => M.add(M.add(M.scale(T[0], v[0]), T[1], v[1]), T[2], v[2]);
export const toComp = A => [-2 * A[1][1], 2 * A[2][0], -2 * A[0][1]];   // 反解 A = A^a T_a（A 为 su(2) 元时精确）
// SU(2) 的指数：exp(v·T) = cos(|v|/2) − i sin(|v|/2) n·σ
export function expT(v) {
  const r = Math.hypot(v[0], v[1], v[2]); if (r < 1e-15) return M.id();
  const c = Math.cos(r / 2), s = Math.sin(r / 2) / r;
  return [C(c, -s * v[2]), C(-s * v[1], -s * v[0]), C(s * v[1], -s * v[0]), C(c, s * v[2])];
}
// 示例规范势：A_μ^a(x)，x ∈ R³；λ 控制非阿贝尔项的强弱
export function gaugeField(lam, x) {
  const [X, Y, Z] = x;
  return [
    [lam * Math.sin(Y + 0.3 * Z), 0.5 * lam * X * Y, lam * Math.cos(Z) - 0.2],
    [0.4 * lam * Z, lam * Math.cos(X) * Math.exp(-0.2 * Y * Y), 0.6 * lam * Math.sin(X + Y)],
    [lam * (X - Y) * 0.5, 0.3 * lam * Math.cos(Y * Z), lam * Math.sin(X) * 0.7],
  ];   // [μ][a]
}
const Amat = (lam, x, mu, gfun) => {
  const a = gaugeField(lam, x)[mu]; let A = fromComp(a);
  if (gfun) {   // A' = g⁻¹ A g + g⁻¹ ∂_μ g
    const g = gfun(x), gi = M.dag(g), h = 1e-5, xp = x.slice(), xm = x.slice(); xp[mu] += h; xm[mu] -= h;
    const dg = M.scale(M.add(gfun(xp), gfun(xm), -1), 1 / (2 * h));
    A = M.add(M.mul(gi, M.mul(A, g)), M.mul(gi, dg));
  }
  return A;
};
const dA = (lam, x, nu, mu, gfun, h = 1e-4) => {   // ∂_ν A_μ（中心差分）
  const xp = x.slice(), xm = x.slice(); xp[nu] += h; xm[nu] -= h;
  return M.scale(M.add(Amat(lam, xp, mu, gfun), Amat(lam, xm, mu, gfun), -1), 1 / (2 * h));
};
// (10.39)：F_{μν} = ∂_μ A_ν − ∂_ν A_μ + [A_μ, A_ν]
export function Fmat(lam, x, mu, nu, gfun) {
  return M.add(M.add(dA(lam, x, mu, nu, gfun), dA(lam, x, nu, mu, gfun), -1), M.comm(Amat(lam, x, mu, gfun), Amat(lam, x, nu, gfun)));
}
// (10.106c)：F_{μν}^a = ∂_μ A_ν^a − ∂_ν A_μ^a + ε_{abc} A_μ^b A_ν^c（只用实分量，不用矩阵）
export function Fcomp(lam, x, mu, nu) {
  const h = 1e-4, d = (n, m) => { const xp = x.slice(), xm = x.slice(); xp[n] += h; xm[n] -= h; const p = gaugeField(lam, xp)[m], q = gaugeField(lam, xm)[m]; return p.map((v, i) => (v - q[i]) / (2 * h)); };
  const A = gaugeField(lam, x), am = A[mu], an = A[nu], dmn = d(mu, nu), dnm = d(nu, mu);
  const cr = cross(am, an);
  return [0, 1, 2].map(a => dmn[a] - dnm[a] + cr[a]);
}
// 小方圈（基点 x0，在 μ–ν 平面内逆时针，边长 ε）的和乐 U：dg/dt = −A(ẋ) g（式 10.13b），路径排序乘积
export function plaquette(lam, x0, mu, nu, eps, nsub = 60) {
  const corners = [[0, 0], [eps, 0], [eps, eps], [0, eps], [0, 0]];
  let U = M.id();
  for (let k = 0; k < 4; k++) {
    const [a1, b1] = corners[k], [a2, b2] = corners[k + 1];
    for (let j = 0; j < nsub; j++) {
      const s = (j + 0.5) / nsub, x = x0.slice();
      x[mu] += a1 + (a2 - a1) * s; x[nu] += b1 + (b2 - b1) * s;
      const comp = gaugeField(lam, x), v = [0, 1, 2].map(a => -(comp[mu][a] * (a2 - a1) + comp[nu][a] * (b2 - b1)) / nsub);
      U = M.mul(expT(v), U);     // 后到者乘在左边
    }
  }
  return U;
}
// Bianchi：D_λ F_{μν} + 循环 = 0，D_λ F = ∂_λ F + [A_λ, F]
export function bianchi(lam, x) {
  const h = 1e-3, DF = (l, m, n) => {
    const xp = x.slice(), xm = x.slice(); xp[l] += h; xm[l] -= h;
    const d = M.scale(M.add(Fmat(lam, xp, m, n), Fmat(lam, xm, m, n), -1), 1 / (2 * h));
    return M.add(d, M.comm(Amat(lam, x, l), Fmat(lam, x, m, n)));
  };
  const s = M.add(M.add(DF(0, 1, 2), DF(1, 2, 0)), DF(2, 0, 1));
  const ord = M.add(M.add(DF(0, 1, 2), M.scale(M.comm(Amat(lam, x, 0), Fmat(lam, x, 1, 2)), -1)), M.zero());   // 只为给出量级
  return { res: M.norm(s), scale: M.norm(ord) + M.norm(DF(1, 2, 0)) + M.norm(DF(2, 0, 1)) };
}
export const gaugeFun = (beta) => x => expT([beta * Math.sin(x[0] + 0.5 * x[2]), beta * x[1] * Math.cos(x[0]), beta * (0.7 + 0.5 * x[2] * x[0])]);
export { Amat };

// ============================================================
// D. 瞬子：映射 g: S³ → SU(2) 的映射度
// ============================================================
// S³ 的超球坐标：x4 = cos χ，x = sin χ (sinθ cosφ, sinθ sinφ, cosθ)
// g1(x) = x4 I + i x·σ（原书 (10.117b) 漏了 i，见勘误）；gn = g1^n
const g1At = (ch, th, ph) => {
  const x4 = Math.cos(ch), s = Math.sin(ch), x1 = s * Math.sin(th) * Math.cos(ph), x2 = s * Math.sin(th) * Math.sin(ph), x3 = s * Math.cos(th);
  return [C(x4, x3), C(x2, x1), C(-x2, x1), C(x4, -x3)];   // x4 + i(x1σ1 + x2σ2 + x3σ3)
};
const mpow = (A, n) => { let R = M.id(), B = n >= 0 ? A : M.dag(A); for (let k = 0; k < Math.abs(n); k++) R = M.mul(R, B); return R; };
// 映射族：kind = "pow"（g1^n）| "split"（g1N·g1S：两个各自只在一个半球上变化的 1 度映射之积，式 10.126 的论证）
//        | "twist"（g1^n 再乘上一个可缩的扭曲 exp(λ h(x)·T)，映射度不应改变）
export function mapAt(kind, n, lam, ch, th, ph) {
  if (kind === "split") {
    const gN = M.scale(g1At(Math.min(Math.PI, 2 * ch), th, ph), -1);   // 北半球 χ<π/2 上走遍 SU(2)，南半球上 ≡ e
    const gS = g1At(Math.max(0, 2 * ch - Math.PI), th, ph);           // 北半球上 ≡ e，南半球上走遍 SU(2)
    return M.mul(gN, gS);
  }
  const g = mpow(g1At(ch, th, ph), n);
  if (kind === "twist") { const x = [Math.sin(ch) * Math.cos(th), Math.cos(ch), Math.sin(th) * Math.sin(ph)]; return M.mul(g, expT([lam * 3 * x[0] * x[1], lam * 2 * Math.sin(3 * x[2]), lam * x[0]])); }
  return g;
}
// n = (1/24π²)∫ tr(g⁻¹dg)³；g⁻¹dg = A_a dχ^a，(g⁻¹dg)³ = ε^{abc} tr(A_a A_b A_c) dχ dθ dφ = 3 tr(A_χ[A_θ, A_φ]) dχ dθ dφ
export function degree(kind, n, lam, N = 36) {
  const nc = N, nt = N, np = 2 * N, h = 1e-5;
  let sum = 0, dmin = Infinity, dmax = -Infinity; const prof = new Array(nc).fill(0);
  for (let i = 0; i < nc; i++) {
    const ch = (i + 0.5) * Math.PI / nc;
    for (let j = 0; j < nt; j++) {
      const th = (j + 0.5) * Math.PI / nt;
      for (let k = 0; k < np; k++) {
        const ph = (k + 0.5) * TAU / np, f = (a, b, c) => mapAt(kind, n, lam, a, b, c);
        const g = f(ch, th, ph), gi = M.dag(g);
        const Ac = M.mul(gi, M.scale(M.add(f(ch + h, th, ph), f(ch - h, th, ph), -1), 1 / (2 * h)));
        const At = M.mul(gi, M.scale(M.add(f(ch, th + h, ph), f(ch, th - h, ph), -1), 1 / (2 * h)));
        const Ap = M.mul(gi, M.scale(M.add(f(ch, th, ph + h), f(ch, th, ph - h), -1), 1 / (2 * h)));
        const v = 3 * M.tr(M.mul(Ac, M.comm(At, Ap)))[0];
        sum += v; prof[i] += v;
        if (kind === "pow" && n === 1) { const den = v / (Math.sin(ch) ** 2 * Math.sin(th)); dmin = Math.min(dmin, den); dmax = Math.max(dmax, den); }
      }
    }
  }
  const dV = (Math.PI / nc) * (Math.PI / nt) * (TAU / np);
  // prof：沿 χ 的分布密度 dn/dχ（对 θ、φ 积掉），∫prof dχ = n
  return { n: sum * dV / (24 * Math.PI * Math.PI), raw: sum * dV, dmin, dmax, prof: prof.map(v => v * dV / (24 * Math.PI * Math.PI) / (Math.PI / nc)) };
}

// ---------------- node 核对记录（2026-10-31） ----------------
// 纬圈 θ0=1.0：RK4 和乐角 = 2π(1−cos1) − 2π = −3.1199 ≡ 2.88838（mod 2π）；∮(1−cosθ)dφ = 2.88838；立体角 2.88838。
// 测地三角形 Δ=1.2：三者均为 1.2000（误差 < 1e-6）。倾斜小圆 α=2.5, ρ=0.7：三者均 = 2π(1−cos0.7) = 1.4776（mod 2π）。
// Berry：θ0=1.0 时离散重叠积 η = −1.44419 = −π(1−cos1)；随机规范相位不改变结果；含时方程 T=200 时 |Δη| ≈ 3e-3。
// SU(2)：矩阵公式与分量公式之差 ~1e-10；方圈 −(U−1)/ε² 在 ε=0.01 时与 F₁₂ 相差 O(ε)；规范协变残差 ~1e-8；Bianchi 残差 ~1e-6。
// 瞬子：g1 → 1.0000，g1² → 2.0000，g1⁻¹ → −1.0000，挤压/扭曲后不变；g1 的密度 tr A³/体元 ≡ 12（式 10.124）。
