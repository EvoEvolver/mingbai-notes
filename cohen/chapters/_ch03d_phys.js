// 第 III 章补充材料（下）交互图用到的数值函数（纯 JS，无 React 依赖；复制为 .mjs 后可用 node 单独测试）。
// 单位约定：
//   J_III（传播子）、K_III（衰减）取 ħ = m = 1；
//   M_III、N_III、O_III（一维定态）取 ħ²/2m = 1，于是 E = k²、方程写成 φ'' = [V(x) − E] φ，长度单位任取。

// ---------- 复数小工具 ----------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
export const cexpi = th => cx(Math.cos(th), Math.sin(th));
export const cconj = a => cx(a.re, -a.im);
export const cscale = (a, s) => cx(a.re * s, a.im * s);
export const cabs2 = a => a.re * a.re + a.im * a.im;
export const csqrt = a => { const r = Math.hypot(a.re, a.im), th = Math.atan2(a.im, a.re) / 2, s = Math.sqrt(r); return cx(s * Math.cos(th), s * Math.sin(th)); };
// 2×2 复矩阵 [[a,b],[c,d]]
export const mmul = (P, Q) => [[cadd(cmul(P[0][0], Q[0][0]), cmul(P[0][1], Q[1][0])), cadd(cmul(P[0][0], Q[0][1]), cmul(P[0][1], Q[1][1]))],
                               [cadd(cmul(P[1][0], Q[0][0]), cmul(P[1][1], Q[1][0])), cadd(cmul(P[1][0], Q[0][1]), cmul(P[1][1], Q[1][1]))]];
export const mdet = P => csub(cmul(P[0][0], P[1][1]), cmul(P[0][1], P[1][0]));

// =====================================================================
// J_III：自由粒子传播子（ħ = m = 1）
//   K(x,t; x',0) = (2πit)^{-1/2} exp[i (x−x')²/2t]
//   初始高斯波包 ψ0(x) = (2/πa²)^{1/4} e^{ik0 x} e^{−(x−x0)²/a²}
// =====================================================================
export const psi0 = (x, a, k0, x0) => { const A = Math.pow(2 / (Math.PI * a * a), 0.25) * Math.exp(-((x - x0) ** 2) / (a * a)); return cx(A * Math.cos(k0 * x), A * Math.sin(k0 * x)); };
// 解析解：a² → a² + 2it（复宽度），中心以 k0 运动
export function psiExact(x, t, a, k0, x0) {
  const w = cx(a * a, 2 * t);                                   // a² + 2it
  const pref = cscale(csqrt(cdiv(cx(a * a, 0), w)), Math.pow(2 / (Math.PI * a * a), 0.25));
  const u = x - x0 - k0 * t;
  const g = cdiv(cx(-u * u, 0), w);                             // −u²/(a²+2it)
  const ph = k0 * x - k0 * k0 * t / 2;
  return cmul(pref, cmul(cx(Math.exp(g.re) * Math.cos(g.im), Math.exp(g.re) * Math.sin(g.im)), cexpi(ph)));
}
// 数值卷积：ψ(x,t) = ∫ dx' K(x,t;x',0) ψ0(x')（Simpson；步长按被积函数的最大相位变化率自动选取）
export function psiConv(x, t, a, k0, x0) {
  if (t <= 0) return psi0(x, a, k0, x0);
  const lo = x0 - 5 * a, hi = x0 + 5 * a;
  const rate = Math.max(Math.abs(x - lo), Math.abs(x - hi)) / t + Math.abs(k0) + 4 / a;
  let n = Math.ceil((hi - lo) * rate / 0.25); n = Math.min(Math.max(n + (n % 2), 200), 40000);
  const h = (hi - lo) / n; let re = 0, im = 0;
  for (let j = 0; j <= n; j++) {
    const xp = lo + j * h, w = (j === 0 || j === n) ? 1 : (j % 2 ? 4 : 2);
    const A = Math.exp(-((xp - x0) ** 2) / (a * a)), ph = k0 * xp + (x - xp) ** 2 / (2 * t);
    re += w * A * Math.cos(ph); im += w * A * Math.sin(ph);
  }
  const N0 = Math.pow(2 / (Math.PI * a * a), 0.25) * h / 3;
  // (2πit)^{-1/2} = (2πt)^{-1/2} e^{-iπ/4}
  return cmul(cx(re * N0, im * N0), cscale(cexpi(-Math.PI / 4), 1 / Math.sqrt(2 * Math.PI * t)));
}
export const widthExact = (t, a) => a / 2 * Math.sqrt(1 + 4 * t * t / Math.pow(a, 4));
// 一组点上的 ⟨x⟩、Δx（梯形）
export function moments(xs, ys) {
  let s0 = 0, s1 = 0, s2 = 0;
  for (let i = 1; i < xs.length; i++) {
    const h = xs[i] - xs[i - 1], f0 = ys[i - 1], f1 = ys[i];
    s0 += h * (f0 + f1) / 2; s1 += h * (xs[i - 1] * f0 + xs[i] * f1) / 2; s2 += h * (xs[i - 1] ** 2 * f0 + xs[i] ** 2 * f1) / 2;
  }
  const m = s1 / s0; return { norm: s0, mean: m, width: Math.sqrt(Math.max(s2 / s0 - m * m, 0)) };
}
// 路径求和的 Cornu 螺线：自由粒子路径 x_cl + A sin(πt/T) 的作用量 S = S_cl + c A²，c = mπ²/4T（ħ 单位）
// 返回部分和 z(A) = ∫_{-Amax}^{A} e^{i c u²} du 的折线（复平面）
export function cornu(c, Amax, n = 1200) {
  const pts = [[0, 0]]; let re = 0, im = 0; const h = 2 * Amax / n;
  for (let j = 0; j < n; j++) {
    const u = -Amax + (j + 0.5) * h; re += h * Math.cos(c * u * u); im += h * Math.sin(c * u * u); pts.push([re, im]);
  }
  return pts;
}

// =====================================================================
// K_III：指数衰减与 Lorentz 线形（ħ = 1）
//   c(t) = e^{−iE0 t} e^{−Γt/2}（t ≥ 0）；|c|² = e^{−Γt}；τ = 1/Γ
//   能量分布 = |∫_0^∞ c(t) e^{iEt} dt|² ·Γ/2π = (Γ/2π)/[(E−E0)² + Γ²/4]
// =====================================================================
export const lorentz = (E, E0, G) => (G / (2 * Math.PI)) / ((E - E0) ** 2 + G * G / 4);
export function spectrumNum(E, E0, G) {                     // 数值 Fourier 变换（Simpson，积到 40τ）
  const Tm = 40 / G, n = 4000, h = Tm / n; let re = 0, im = 0;
  for (let j = 0; j <= n; j++) {
    const t = j * h, w = (j === 0 || j === n) ? 1 : (j % 2 ? 4 : 2), A = Math.exp(-G * t / 2), ph = (E - E0) * t;
    re += w * A * Math.cos(ph); im += w * A * Math.sin(ph);
  }
  re *= h / 3; im *= h / 3;
  return (re * re + im * im) * G / (2 * Math.PI);
}
export function fwhm(f, lo, hi, n = 2000) {                 // 数值半高全宽
  let mx = -Infinity, xm = lo; const xs = [], ys = [];
  for (let i = 0; i <= n; i++) { const x = lo + (hi - lo) * i / n, y = f(x); xs.push(x); ys.push(y); if (y > mx) { mx = y; xm = x; } }
  const half = mx / 2; let L = NaN, Rr = NaN;
  for (let i = 1; i <= n; i++) {
    if (ys[i - 1] < half && ys[i] >= half && xs[i] <= xm) L = xs[i - 1] + (half - ys[i - 1]) / (ys[i] - ys[i - 1]) * (xs[i] - xs[i - 1]);
    if (ys[i - 1] >= half && ys[i] < half && xs[i] >= xm) { Rr = xs[i - 1] + (half - ys[i - 1]) / (ys[i] - ys[i - 1]) * (xs[i] - xs[i - 1]); break; }
  }
  return Rr - L;
}
export function meanLife(G) {                               // ∫ t e^{−Γt} Γ dt 数值，应为 1/Γ
  const Tm = 50 / G, n = 4000, h = Tm / n; let s = 0;
  for (let j = 0; j <= n; j++) { const t = j * h, w = (j === 0 || j === n) ? 1 : (j % 2 ? 4 : 2); s += w * t * Math.exp(-G * t) * G; }
  return s * h / 3;
}

// =====================================================================
// M_III：任意形状势阱的束缚态（ħ²/2m = 1）。势在 [x1, x2] 外取 0。
// =====================================================================
// 不连续点放在积分网格点上，并在跳变点处取左右极限的平均值，保证 RK4 的精度
const jump = (c, lo, hi, x) => (Math.abs(x - c) < 1e-9 ? (lo + hi) / 2 : null);
export const WELLS = {
  square: { lab: "方势阱", X: 1.25, n: 500, V: (x, V0) => (Math.abs(Math.abs(x) - 1) < 1e-9 ? -V0 / 2 : Math.abs(x) < 1 ? -V0 : 0) },
  gauss: { lab: "高斯阱", X: 5.0, n: 600, V: (x, V0) => -V0 * Math.exp(-x * x) },
  sech2: { lab: "Pöschl–Teller 阱", X: 8.0, n: 800, V: (x, V0) => -V0 / Math.cosh(x) ** 2 },
  asym: { lab: "不对称阱", X: 1.5, n: 600, V: (x, V0) => jump(-1, 0, -V0, x) ?? (x < -1 || x > 1.5 ? 0 : x < 0 ? -V0 : -V0 * (1 - x / 1.5)) },
  double: { lab: "双阱", X: 2.0, n: 500, V: (x, V0) => jump(-2, 0, -V0, x) ?? jump(2, -V0, 0, x) ?? jump(-0.4, -V0, -0.3 * V0, x) ?? jump(0.4, -0.3 * V0, -V0, x) ?? (Math.abs(x) > 2 ? 0 : Math.abs(x) < 0.4 ? -0.3 * V0 : -V0) },
};
// 从 x1 = −X 处的 e^{ρx}（取 φ=1, φ'=ρ）出发，RK4 积分到 x2 = X；返回 B̃、B̃' 与网格上的 φ
export function shoot(Vf, V0, X, E, n = 800, keep = false) {
  const rho = Math.sqrt(-E), h = 2 * X / n;
  let x = -X, y = 1, yp = rho; const xs = keep ? [x] : null, ys = keep ? [y] : null, yps = keep ? [yp] : null;
  const f = (x, y) => (Vf(x, V0) - E) * y;
  for (let i = 0; i < n; i++) {
    x = -X + i * h;
    const k1y = yp, k1p = f(x, y);
    const k2y = yp + h / 2 * k1p, k2p = f(x + h / 2, y + h / 2 * k1y);
    const k3y = yp + h / 2 * k2p, k3p = f(x + h / 2, y + h / 2 * k2y);
    const k4y = yp + h * k3p, k4p = f(x + h, y + h * k3y);
    y += h / 6 * (k1y + 2 * k2y + 2 * k3y + k4y); yp += h / 6 * (k1p + 2 * k2p + 2 * k3p + k4p); x = -X + (i + 1) * h;
    if (keep) { xs.push(x); ys.push(y); yps.push(yp); }
  }
  // x ≥ x2 时 φ = B̃ e^{ρx} + B̃' e^{−ρx}；返回 B = B̃ e^{ρx2}、Bp = B̃' e^{−ρx2}（即两项在 x2 处的取值，避免溢出）
  const B = (rho * y + yp) / (2 * rho), Bp = (rho * y - yp) / (2 * rho);
  return { B, Bp, rho, xs, ys, yps };
}
export const Bnorm = (Vf, V0, X, E, n = 500) => { const s = shoot(Vf, V0, X, E, n); return s.B / Math.hypot(s.B, s.Bp); };
// 振荡定理（Sturm）：从左侧衰减解出发的 φ_E(x) 在整条实轴上的零点数 = 低于 E 的束缚能级数。
// 网格内数符号变化；x > x2 的解析尾巴 B̃e^{ρx} + B̃'e^{−ρx} 若 B̃、B̃' 异号且零点落在 x2 右侧，再加 1。
export function countBelow(Vf, V0, X, E, n = 500) {
  const s = shoot(Vf, V0, X, E, n, true); let c = 0;
  for (let i = 1; i < s.ys.length; i++) if ((s.ys[i] < 0) !== (s.ys[i - 1] < 0)) c++;
  // 尾巴零点：B e^{ρ(x−x2)} + Bp e^{−ρ(x−x2)} = 0 ⇔ e^{2ρ(x−x2)} = −Bp/B，要求 > 1
  if (s.B !== 0 && -s.Bp / s.B > 1) c++;
  return c;
}
// 束缚能级：对每个 n 用二分法求 countBelow 从 n 跳到 n+1 的能量（近简并的双阱能级对也不会漏掉）
export function boundLevels(Vf, V0, X, n = 500) {
  const lo = -V0, hi = -1e-7, N = countBelow(Vf, V0, X, hi, n), out = [];
  for (let j = 0; j < N; j++) {
    let a = lo, b = hi;
    for (let k = 0; k < 64; k++) { const m = (a + b) / 2; if (countBelow(Vf, V0, X, m, n) > j) b = m; else a = m; }
    out.push((a + b) / 2);
  }
  return out;
}
// 能级 E 的归一化波函数：左右两侧分别从衰减尾巴向内积分，在势最低点 x_m 处拼接（避免向外积分时增长解淹没衰减解）。
// 返回取样点、节点数、⟨T⟩ = ∫|φ'|²、⟨V⟩ = ∫V|φ|²（ħ²/2m = 1）
function rk4path(Vf, V0, E, xa, xb, y, yp, n) {
  const h = (xb - xa) / n, f = (x, y) => (Vf(x, V0) - E) * y; let x = xa;
  const xs = [x], ys = [y], ps = [yp];
  for (let i = 0; i < n; i++) {
    x = xa + i * h;
    const k1y = yp, k1p = f(x, y);
    const k2y = yp + h / 2 * k1p, k2p = f(x + h / 2, y + h / 2 * k1y);
    const k3y = yp + h / 2 * k2p, k3p = f(x + h / 2, y + h / 2 * k2y);
    const k4y = yp + h * k3p, k4p = f(x + h, y + h * k3y);
    y += h / 6 * (k1y + 2 * k2y + 2 * k3y + k4y); yp += h / 6 * (k1p + 2 * k2p + 2 * k3p + k4p); x = xa + (i + 1) * h;
    xs.push(x); ys.push(y); ps.push(yp);
  }
  return { xs, ys, ps };
}
export function boundState(Vf, V0, X, E, tail = 3, n = 800) {
  n = 2 * Math.round(n / 2);
  const rho = Math.sqrt(-E);
  // 拼接点取最右边的经典转折点（V = E）附近的网格点：右侧只需穿过衰减尾巴向内积分；
  // 用 (φ, φ') 两个分量做最小二乘匹配
  let im = 0;
  for (let i = 1; i < n; i++) if (Vf(-X + 2 * X * i / n, V0) < E) im = i;
  const nl = Math.min(Math.max(im, 10), n - 10), nr = n - nl, xm = -X + 2 * X * nl / n;
  const L = rk4path(Vf, V0, E, -X, xm, 1, rho, nl), Rr = rk4path(Vf, V0, E, X, xm, 1, -rho, nr);
  const ly = L.ys[nl], lp = L.ps[nl], ry = Rr.ys[nr], rp = Rr.ps[nr];
  const s = (ly * ry + lp * rp) / (ry * ry + rp * rp);
  const xs = [], ys = [], dys = [], nt = 120;
  for (let i = 0; i < nt; i++) { const x = -X - tail + tail * i / nt, e = Math.exp(rho * (x + X)); xs.push(x); ys.push(e); dys.push(rho * e); }
  for (let i = 0; i < L.xs.length; i++) { xs.push(L.xs[i]); ys.push(L.ys[i]); dys.push(L.ps[i]); }
  for (let i = Rr.xs.length - 2; i >= 0; i--) { xs.push(Rr.xs[i]); ys.push(s * Rr.ys[i]); dys.push(s * Rr.ps[i]); }
  for (let i = 1; i <= nt; i++) { const x = X + tail * i / nt, e = s * Math.exp(-rho * (x - X)); xs.push(x); ys.push(e); dys.push(-rho * e); }
  let nrm = 0, T = 0, V = 0;
  for (let i = 1; i < xs.length; i++) { const h = xs[i] - xs[i - 1]; nrm += h * (ys[i] ** 2 + ys[i - 1] ** 2) / 2; T += h * (dys[i] ** 2 + dys[i - 1] ** 2) / 2; V += h * (Vf(xs[i], V0) * ys[i] ** 2 + Vf(xs[i - 1], V0) * ys[i - 1] ** 2) / 2; }
  const tl = Math.exp(-2 * rho * tail) / (2 * rho), tr = s * s * Math.exp(-2 * rho * tail) / (2 * rho);
  nrm += tl + tr; T += rho * rho * (tl + tr);
  const c = 1 / Math.sqrt(nrm), yN = ys.map(v => v * c), mx = Math.max(...yN.map(Math.abs));
  let nodes = 0, sg = 0; for (let i = 0; i < yN.length; i++) { if (Math.abs(yN[i]) < 1e-4 * mx) continue; const g = yN[i] > 0 ? 1 : -1; if (sg && g !== sg) nodes++; sg = g; }
  return { xs, ys: yN, T: T / nrm, V: V / nrm, nodes };
}
// 解析对照：(i) 方势阱 |x|≤1、深 V0：偶态 k tan k = ρ，奇态 −k cot k = ρ，k² + ρ² = V0
export function squareWellExact(V0) {
  const out = [], K = Math.sqrt(V0);
  const fe = k => k * Math.tan(k) - Math.sqrt(Math.max(V0 - k * k, 0));
  const fo = k => -k / Math.tan(k) - Math.sqrt(Math.max(V0 - k * k, 0));
  for (let j = 0; j * Math.PI / 2 < K; j++) {
    const a = j * Math.PI / 2 + 1e-12, b = Math.min((j + 1) * Math.PI / 2 - 1e-12, K);
    const f = j % 2 === 0 ? fe : fo;
    if ((f(a) < 0) !== (f(b) < 0)) { let lo = a, hi = b; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if ((f(m) < 0) === (f(lo) < 0)) lo = m; else hi = m; } const k = (lo + hi) / 2; out.push(k * k - V0); }
  }
  return out;
}
// (ii) Pöschl–Teller：V = −V0 sech²x，E_n = −(s−n)²，s(s+1) = V0
export function sech2Exact(V0) { const s = (-1 + Math.sqrt(1 + 4 * V0)) / 2, out = []; for (let n = 0; n < s; n++) out.push(-((s - n) ** 2)); return out; }

// =====================================================================
// N_III：传递矩阵 M(k)（ħ²/2m = 1，E = k²）。势在 |x| ≤ l/2 内任意，外面为 0。
// =====================================================================
// 复数 RK4：从 x = −l/2 处的初值 (φ, φ') 积分到 +l/2
function cshoot(Vf, l, E, phi, dphi, n) {
  const h = l / n; let x = -l / 2, y = phi, yp = dphi;
  const f = (x, y) => cscale(y, Vf(x) - E);
  for (let i = 0; i < n; i++) {
    x = -l / 2 + i * h;
    const k1y = yp, k1p = f(x, y);
    const k2y = cadd(yp, cscale(k1p, h / 2)), k2p = f(x + h / 2, cadd(y, cscale(k1y, h / 2)));
    const k3y = cadd(yp, cscale(k2p, h / 2)), k3p = f(x + h / 2, cadd(y, cscale(k2y, h / 2)));
    const k4y = cadd(yp, cscale(k3p, h)), k4p = f(x + h, cadd(y, cscale(k3y, h)));
    y = cadd(y, cscale(cadd(cadd(k1y, cscale(k2y, 2)), cadd(cscale(k3y, 2), k4y)), h / 6));
    yp = cadd(yp, cscale(cadd(cadd(k1p, cscale(k2p, 2)), cadd(cscale(k3p, 2), k4p)), h / 6));
    x += h;
  }
  return [y, yp];
}
// 把 x = +l/2 处的 (φ, φ') 分解为 a e^{ikx} + b e^{−ikx}
function decomp(k, x, y, yp) {
  const ik = cx(0, k), e = cexpi(-k * x), ei = cexpi(k * x);
  const a = cmul(cdiv(cadd(cmul(ik, y), yp), cscale(ik, 2)), e);
  const b = cmul(cdiv(csub(cmul(ik, y), yp), cscale(ik, 2)), ei);
  return [a, b];
}
// 数值 M(k)：由 v_k 得 F, G；由 v'_k 独立得 F', G'（不借助复共轭关系）
export function Mnum(Vf, l, k, n = 600) {
  const x0 = -l / 2;
  const v = cshoot(Vf, l, k * k, cexpi(k * x0), cmul(cx(0, k), cexpi(k * x0)), n);
  const vp = cshoot(Vf, l, k * k, cexpi(-k * x0), cmul(cx(0, -k), cexpi(-k * x0)), n);
  const [F, G] = decomp(k, l / 2, v[0], v[1]);
  const [Fp, Gp] = decomp(k, l / 2, vp[0], vp[1]);
  return [[F, Fp], [G, Gp]];
}
// 解析 M(k)：方势垒/阱，|x| < l/2 内 V = V0（式 NIII-34 与改正后的 NIII-38）
export function Msquare(V0, l, k) {
  const E = k * k, em = cexpi(-k * l), ep = cexpi(k * l);
  if (E < V0) {
    const r = Math.sqrt(V0 - E), k02 = V0, c = Math.cosh(r * l), s = Math.sinh(r * l), q = (k * k - r * r) / (2 * k * r);
    const F = cmul(cx(c, q * s), em), G = cx(0, k02 / (2 * k * r) * s);
    return [[F, cconj(G)], [G, cconj(F)]];
  }
  const kp = Math.sqrt(E - V0), c = Math.cos(kp * l), s = Math.sin(kp * l), q = (k * k + kp * kp) / (2 * k * kp);
  const F = cmul(cx(c, q * s), em), G = cx(0, V0 / (2 * k * kp) * s);    // ε k0² = V0（ħ²/2m = 1）
  return [[F, cconj(G)], [G, cconj(F)]];
}
// 对照：Complement H_I 的势垒透射系数（E>V0 与 E<V0），宽 l、高 V0
export function barrierT_HI(V0, l, E) {
  if (E > V0) { const k1 = Math.sqrt(E), k2 = Math.sqrt(E - V0); return 4 * k1 * k1 * k2 * k2 / (4 * k1 * k1 * k2 * k2 + (k1 * k1 - k2 * k2) ** 2 * Math.sin(k2 * l) ** 2); }
  const k1 = Math.sqrt(E), r = Math.sqrt(V0 - E); return 4 * k1 * k1 * r * r / (4 * k1 * k1 * r * r + (k1 * k1 + r * r) ** 2 * Math.sinh(r * l) ** 2);
}
export const BARRIERS = {
  square: { lab: "方势垒", l: 2, V: (x, V0) => V0 },
  well: { lab: "方势阱", l: 2, V: (x, V0) => -V0 },
  double: { lab: "双势垒（共振隧穿）", l: 5, V: (x, V0) => (Math.abs(Math.abs(x) - 1.5) < 1e-9 ? V0 / 2 : Math.abs(x) > 1.5 ? V0 : 0) },
  gauss: { lab: "高斯势垒", l: 8, V: (x, V0) => V0 * Math.exp(-x * x) },
  ramp: { lab: "不对称（斜坡）势垒", l: 3, V: (x, V0) => V0 * (x + 1.5) / 3 },
};

// =====================================================================
// O_III：N 个相同"势垒"的周期结构。单元 = 宽 b、高 V0 的方势垒，周期 l（Kronig–Penney 型）
// =====================================================================
export function cellM(V0, b, a) { return Msquare(V0, b, a); }            // 以单元中心为原点
export const Dmat = (a, l) => [[cexpi(a * l), cx(0)], [cx(0), cexpi(-a * l)]];
export function Xof(V0, b, l, a) { const F = cellM(V0, b, a)[0][0]; return cmul(cexpi(a * l), F).re; }   // 式 (21)
export function TN(V0, b, l, a, N) {
  const M = cellM(V0, b, a), Q = mmul(Dmat(a, l), M);
  let W = M; for (let i = 1; i < N; i++) W = mmul(W, Q);                 // M (DM)^{N−1}，式 (15)
  return 1 / cabs2(W[0][0]);
}
export function bandEdges(V0, b, l, aMax, n = 4000) {                    // 允许带区间 [α_lo, α_hi]
  const out = []; let inBand = false, start = 0;
  const g = a => Math.abs(Xof(V0, b, l, a)) - 1;
  const edge = (lo, hi) => { for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if ((g(m) <= 0) === (g(lo) <= 0)) lo = m; else hi = m; } return (lo + hi) / 2; };
  for (let i = 1; i <= n; i++) {
    const a = aMax * i / n, ok = g(a) <= 0;
    if (ok && !inBand) { inBand = true; start = i > 1 ? edge(aMax * (i - 1) / n, a) : a; }
    if (!ok && inBand) { inBand = false; out.push([start, edge(aMax * (i - 1) / n, a)]); }
  }
  if (inBand) out.push([start, aMax]);
  return out;
}
