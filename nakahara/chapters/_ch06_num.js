// 第 6 章交互图的数值核心（纯函数，无 React；可在 node 中单独测试）。
//  · 闭曲线（闭合 Catmull–Rom 样条）的采样、∮dθ（逐段精确的有向角）、卷绕数（射线穿越计数，独立算法）
//  · 平面区域上的 Stokes 定理：边界线积分（分段 Gauss–Legendre）与面积分（极坐标 / 张量积 Gauss–Legendre）
//  · Poincaré 引理的同伦算子：φ(x) = −P F^*ω = ∫_0^1 ω_i(p0+uX) X^i du；以及 −P F^*(h dx∧dy)
//  · Künneth：Betti 数卷积；乘积复形的阶梯（staircase）三角剖分，交给第 3 章的整数同调算法独立核对
import * as H from "./_ch03_homology.js";

// ---------- Gauss–Legendre 节点（[0,1] 上） ----------
function glNodes(n) {
  const x = [], w = [];
  for (let i = 1; i <= n; i++) {
    let z = Math.cos(Math.PI * (i - 0.25) / (n + 0.5)), pp = 0;
    for (let it = 0; it < 100; it++) {
      let p1 = 1, p2 = 0;
      for (let j = 1; j <= n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j - 1) * z * p2 - (j - 1) * p3) / j; }
      pp = n * (z * p1 - p2) / (z * z - 1);
      const z1 = z; z = z1 - p1 / pp; if (Math.abs(z - z1) < 1e-15) break;
    }
    x.push((1 - z) / 2); w.push(1 / ((1 - z * z) * pp * pp));
  }
  return { x, w };
}
export const GL4 = glNodes(4), GL8 = glNodes(8), GL16 = glNodes(16);
// ∫_a^b g，分成 m 段，每段 GL 规则 G
export function quad(g, a, b, m = 8, G = GL8) {
  let s = 0; const h = (b - a) / m;
  for (let k = 0; k < m; k++) { const a0 = a + k * h; for (let i = 0; i < G.x.length; i++) s += G.w[i] * g(a0 + h * G.x[i]); }
  return s * h;
}

// ---------- 闭曲线 ----------
// 闭合 Catmull–Rom 样条：控制点 P[0..n-1]，每段 K 个采样，返回闭合折线点列（不重复首点）
export function closedSpline(P, K = 40) {
  const n = P.length, out = [];
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    for (let k = 0; k < K; k++) {
      const t = k / K, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}
// ∮ dθ 沿闭合折线：每条直线段上 dθ 的积分恰为它对原点张开的有向角（精确）
export function angleIntegral(pts, o = [0, 0]) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const ax = a[0] - o[0], ay = a[1] - o[1], bx = b[0] - o[0], by = b[1] - o[1];
    s += Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
  }
  return s;
}
// 卷绕数（Sunday 的射线穿越算法；与角积分完全独立）
export function windingNumber(pts, o = [0, 0]) {
  let w = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const isLeft = (b[0] - a[0]) * (o[1] - a[1]) - (o[0] - a[0]) * (b[1] - a[1]);
    if (a[1] <= o[1]) { if (b[1] > o[1] && isLeft > 0) w++; }
    else if (b[1] <= o[1] && isLeft < 0) w--;
  }
  return w;
}
// 一般一形式 P dx + Q dy 沿闭合折线的积分（每段 4 点 Gauss–Legendre；对多项式系数 ≤ 7 次精确）
export function lineIntegral(pts, P, Q) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], dx = b[0] - a[0], dy = b[1] - a[1];
    for (let k = 0; k < 4; k++) { const t = GL4.x[k], x = a[0] + t * dx, y = a[1] + t * dy; s += GL4.w[k] * (P(x, y) * dx + Q(x, y) * dy); }
  }
  return s;
}

// ---------- 平面区域上的 Stokes 定理 ----------
// 区域：{ kind: "disk"|"ellipse"|"annulus"|"square", cx, cy, R }
// 边界：若干条带定向的参数曲线 γ(τ), τ∈[0,1]（外边界逆时针、内边界顺时针）
export function boundaryCurves(D) {
  const { kind, cx, cy, R } = D, T = 2 * Math.PI;
  const circ = (r, sgn, ry = r) => ({ g: t => [cx + r * Math.cos(sgn * T * t), cy + ry * Math.sin(sgn * T * t)], dg: t => [-r * sgn * T * Math.sin(sgn * T * t), ry * sgn * T * Math.cos(sgn * T * t)] });
  if (kind === "disk") return [circ(R, 1)];
  if (kind === "ellipse") return [circ(R, 1, 0.6 * R)];
  if (kind === "annulus") return [circ(R, 1), circ(0.45 * R, -1)];
  // 正方形 [cx−R, cx+R]×[cy−R, cy+R]，逆时针四条边
  const V = [[cx - R, cy - R], [cx + R, cy - R], [cx + R, cy + R], [cx - R, cy + R]];
  return V.map((a, i) => { const b = V[(i + 1) % 4]; return { g: t => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])], dg: () => [b[0] - a[0], b[1] - a[1]] }; });
}
export function boundaryIntegral(D, P, Q, m = 256) {
  let s = 0;
  for (const { g, dg } of boundaryCurves(D)) s += quad(t => { const [x, y] = g(t), [u, v] = dg(t); return P(x, y) * u + Q(x, y) * v; }, 0, 1, m, GL8);
  return s;
}
// ∫∫_D h dx dy
export function areaIntegral(D, h, mr = 24, mth = 512) {
  const { kind, cx, cy, R } = D;
  if (kind === "square") return quad(x => quad(y => h(x, y), cy - R, cy + R, mr, GL8), cx - R, cx + R, mr, GL8);
  const r0 = kind === "annulus" ? 0.45 * R : 0, sy = kind === "ellipse" ? 0.6 : 1;
  // 极坐标（椭圆用 x=cx+ρcosφ, y=cy+0.6ρ sinφ，Jacobian 0.6ρ）；角度方向用梯形法（周期函数，指数收敛）
  let s = 0;
  for (let k = 0; k < mth; k++) {
    const ph = 2 * Math.PI * k / mth, c = Math.cos(ph), sn = Math.sin(ph);
    s += quad(rho => h(cx + rho * c, cy + sy * rho * sn) * rho * sy, r0, R, mr, GL8);
  }
  return s * 2 * Math.PI / mth;
}
// 点 o 是否在区域 D 内（不含洞）
export function inside(D, x, y) {
  const { kind, cx, cy, R } = D, dx = x - cx, dy = y - cy;
  if (kind === "square") return Math.abs(dx) < R && Math.abs(dy) < R;
  if (kind === "ellipse") return (dx / R) ** 2 + (dy / (0.6 * R)) ** 2 < 1;
  const r = Math.hypot(dx, dy);
  return kind === "annulus" ? r < R && r > 0.45 * R : r < R;
}

// ---------- Poincaré 引理：同伦算子 ----------
// φ(x) = −P F^*ω = ∫_0^1 ω_i(p0 + uX) X^i du，X = x − p0（沿 p0→x 的直线段的线积分）
export function homotopyPotential(P, Q, p0, x, y, m = 4, G = GL16) {
  const X1 = x - p0[0], X2 = y - p0[1];
  return quad(u => { const px = p0[0] + u * X1, py = p0[1] + u * X2; return P(px, py) * X1 + Q(px, py) * X2; }, 0, 1, m, G);
}
// −P F^*(h dx∧dy) = k(x)(X^1 dy − X^2 dx)，k = ∫_0^1 u h(p0+uX) du；返回 [dx 分量, dy 分量]
export function homotopyOfTwoForm(h, p0, x, y, m = 4, G = GL16) {
  const X1 = x - p0[0], X2 = y - p0[1];
  const k = quad(u => u * h(p0[0] + u * X1, p0[1] + u * X2), 0, 1, m, G);
  return [-k * X2, k * X1];
}

// ---------- Künneth ----------
export function convolve(a, b) {
  const out = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y; }));
  return out;
}
export const eulerChar = b => b.reduce((s, x, r) => s + (r % 2 ? -x : x), 0);
const binom = (n, k) => { let c = 1; for (let i = 1; i <= k; i++) c = c * (n - k + i) / i; return Math.round(c); };
// 阶梯三角剖分：facets1、facets2 为两个复形的极大单形（顶点编号；按编号排序后使用）
export function productFacets(F1, F2, n2) {
  const out = [];
  for (const s0 of F1) for (const t0 of F2) {
    const s = [...s0].sort((a, b) => a - b), t = [...t0].sort((a, b) => a - b), p = s.length - 1, q = t.length - 1;
    // 枚举从 (0,0) 到 (p,q) 的单调格路：每步 i+1 或 j+1
    const walk = (i, j, path) => {
      path.push(s[i] * n2 + t[j]);
      if (i === p && j === q) out.push([...path]);
      else { if (i < p) walk(i + 1, j, path); if (j < q) walk(i, j + 1, path); }
      path.pop();
    };
    walk(0, 0, []);
  }
  return out;
}
export const productSize = (F1, F2) => F1.reduce((s, a) => s + F2.reduce((u, b) => u + binom(a.length + b.length - 2, a.length - 1), 0), 0);
// 由极大单形求整数同调（第 3 章算法）：返回 { betti, torsion: [[k…] 每维], chi }
export function homologyOf(F) {
  const nv = Math.max(...F.flat()) + 1;
  const K = H.makeComplex(F, Array.from({ length: nv }, (_, i) => `p_{${i}}`));
  const h = H.homology(K);
  return { betti: h.H.map(x => x.free), torsion: h.H.map(x => x.torsion), chi: h.chi, nv, dim: K.dim, counts: h.H.map(x => x.I) };
}
const S3 = [[0, 1, 2, 3], [0, 1, 2, 4], [0, 1, 3, 4], [0, 2, 3, 4], [1, 2, 3, 4]];
const grid3 = lab => { const F = []; for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { const TL = lab[y][x], TR = lab[y][x + 1], BL = lab[y + 1][x], BR = lab[y + 1][x + 1]; F.push([TL, BL, TR], [BL, BR, TR]); } return F; };
// 因子流形（三角剖分取自第 3 章；S³ 为 4 单形的边界）；orient: 是否可定向
export const FACTORS = [
  { id: "pt", tex: R0`\mathrm{pt}`, facets: [[0]], orient: true },
  { id: "S1", tex: R0`S^1`, facets: [[0, 1], [1, 2], [0, 2]], orient: true },
  { id: "S2", tex: R0`S^2`, facets: [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], orient: true },
  { id: "T2", tex: R0`T^2`, facets: grid3(H.TORUS_LAB), orient: true },
  { id: "S3", tex: R0`S^3`, facets: S3, orient: true },
  { id: "RP2", tex: R0`\mathbb{R}P^2`, facets: H.RP2_F, orient: false },
  { id: "K", tex: R0`\text{Klein}`, facets: grid3(H.KLEIN_LAB), orient: false },
];
function R0(s) { return String.raw(s); }
