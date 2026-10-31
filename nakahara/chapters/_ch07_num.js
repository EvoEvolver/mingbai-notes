// 第 7 章交互图的数值核心（纯函数，可在 node 中单独测试）：
//  · 二维度规的 Christoffel 符号、Riemann 张量、Gauss 曲率（有限差分；另用 Brioschi 公式独立核对）
//  · 球面与 Poincaré 上半平面的测地线（RK4 积分测地线方程 (7.19b)）
//  · 球面上沿闭合回路的平行移动（RK4 积分 (7.18b)，并用"投影到切平面"的外在方法独立核对）

// ---------- 通用 ----------
export function rk4(f, y, t, h) {
  const k1 = f(t, y), y2 = y.map((v, i) => v + h / 2 * k1[i]);
  const k2 = f(t + h / 2, y2), y3 = y.map((v, i) => v + h / 2 * k2[i]);
  const k3 = f(t + h / 2, y3), y4 = y.map((v, i) => v + h * k3[i]);
  const k4 = f(t + h, y4);
  return y.map((v, i) => v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => Math.hypot(a[0], a[1], a[2]);
const scale = (a, s) => a.map(v => v * s);
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
export const vec = { dot, cross, norm, scale, add, sub };

// ---------- 二维度规的曲率 ----------
// g(u,v) 返回 [g11, g12, g22]。返回 Christoffel Γ[k][i][j]、R^1_{212}、R_{1212}、K、Ric、标量曲率。
export function curvature2D(g, u, v, h = 1e-3) {
  const G = (a, b) => { const [E, F, H] = g(a, b); return [[E, F], [F, H]]; };
  const inv = M => { const d = M[0][0] * M[1][1] - M[0][1] * M[1][0]; return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]]; };
  // ∂_k g_ij（中心差分）
  const dg = (a, b) => {
    const pu = G(a + h, b), mu = G(a - h, b), pv = G(a, b + h), mv = G(a, b - h);
    return [0, 1].map(k => [0, 1].map(i => [0, 1].map(j => k === 0 ? (pu[i][j] - mu[i][j]) / (2 * h) : (pv[i][j] - mv[i][j]) / (2 * h))));
  };
  // Γ^k_ij = ½ g^{kl}(∂_i g_jl + ∂_j g_il − ∂_l g_ij)   (7.53)
  const Gam = (a, b) => {
    const gi = inv(G(a, b)), d = dg(a, b);
    return [0, 1].map(k => [0, 1].map(i => [0, 1].map(j => {
      let s = 0; for (let l = 0; l < 2; l++) s += 0.5 * gi[k][l] * (d[i][j][l] + d[j][i][l] - d[l][i][j]); return s;
    })));
  };
  const Gm = Gam(u, v), Gp = [Gam(u + h, v), Gam(u, v + h)], Gn = [Gam(u - h, v), Gam(u, v - h)];
  const dGam = (m, k, i, j) => (Gp[m][k][i][j] - Gn[m][k][i][j]) / (2 * h);
  // R^κ_{λμν} = ∂_μ Γ^κ_{νλ} − ∂_ν Γ^κ_{μλ} + Γ^η_{νλ}Γ^κ_{μη} − Γ^η_{μλ}Γ^κ_{νη}   (7.42)
  const Riem = (k, l, m, n) => {
    let s = dGam(m, k, n, l) - dGam(n, k, m, l);
    for (let e = 0; e < 2; e++) s += Gm[e][n][l] * Gm[k][m][e] - Gm[e][m][l] * Gm[k][n][e];
    return s;
  };
  const g0 = G(u, v), gi = inv(g0), det = g0[0][0] * g0[1][1] - g0[0][1] ** 2;
  const R1212up = Riem(0, 1, 0, 1);                       // R^1_{212}（指标 1=u, 2=v）
  const R1212 = g0[0][0] * R1212up + g0[0][1] * Riem(1, 1, 0, 1);  // R_{1212} = g_{1κ} R^κ_{212}
  const K = R1212 / det;                                   // (7.89)：R_{1212}=K(g11 g22 − g12²)
  const Ric = [0, 1].map(a => [0, 1].map(b => { let s = 0; for (let k = 0; k < 2; k++) s += Riem(k, a, k, b); return s; }));  // (7.50b)
  let scal = 0; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) scal += gi[a][b] * Ric[a][b];
  return { Gamma: Gm, R1212up, R1212, K, Ric, scalar: scal, det, g: g0 };
}

// Brioschi 公式（只用 E,F,G 及其一、二阶导数）——与上面的 (7.42) 路线完全独立
export function brioschiK(g, u, v, h = 1e-3) {
  const f = (a, b) => g(a, b);
  const d1 = (i, a, b, dir) => dir === 0 ? (f(a + h, b)[i] - f(a - h, b)[i]) / (2 * h) : (f(a, b + h)[i] - f(a, b - h)[i]) / (2 * h);
  const d2 = (i, a, b, d) => {
    if (d === "uu") return (f(a + h, b)[i] - 2 * f(a, b)[i] + f(a - h, b)[i]) / (h * h);
    if (d === "vv") return (f(a, b + h)[i] - 2 * f(a, b)[i] + f(a, b - h)[i]) / (h * h);
    return (f(a + h, b + h)[i] - f(a + h, b - h)[i] - f(a - h, b + h)[i] + f(a - h, b - h)[i]) / (4 * h * h);
  };
  const [E, F, G] = f(u, v);
  const Eu = d1(0, u, v, 0), Ev = d1(0, u, v, 1), Fu = d1(1, u, v, 0), Fv = d1(1, u, v, 1), Gu = d1(2, u, v, 0), Gv = d1(2, u, v, 1);
  const Evv = d2(0, u, v, "vv"), Fuv = d2(1, u, v, "uv"), Guu = d2(2, u, v, "uu");
  const det3 = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const A = det3([[-Evv / 2 + Fuv - Guu / 2, Eu / 2, Fu - Ev / 2], [Fv - Gu / 2, E, F], [Gv / 2, F, G]]);
  const B = det3([[0, Ev / 2, Gu / 2], [Ev / 2, E, F], [Gu / 2, F, G]]);
  return (A - B) / (E * G - F * F) ** 2;
}

// ---------- 测地线 ----------
// 球面 g = dθ² + sin²θ dφ²，Γ^θ_φφ = −sinθ cosθ，Γ^φ_θφ = cotθ   (7.57)
export const sphereGamma = th => ({ t_pp: -Math.sin(th) * Math.cos(th), p_tp: Math.cos(th) / Math.sin(th) });
export function sphereGeodesic(th0, ph0, ang, L, n = 600) {
  // 初速度：单位速度，与 ∂θ 方向成角 ang（正交归一基 ê_θ, ê_φ）
  let y = [th0, ph0, Math.cos(ang), Math.sin(ang) / Math.sin(th0)];
  const f = (t, [th, ph, dth, dph]) => [dth, dph, Math.sin(th) * Math.cos(th) * dph * dph, -2 * Math.cos(th) / Math.sin(th) * dth * dph];  // (7.62)
  const pts = [y.slice()], h = L / n;
  for (let i = 0; i < n; i++) { y = rk4(f, y, i * h, h); pts.push(y.slice()); if (Math.sin(y[0]) < 1e-3) break; }
  return pts;
}
// Poincaré 上半平面 g = (dx² + dy²)/y²：Γ^x_xy = −1/y，Γ^y_xx = 1/y，Γ^y_yy = −1/y
// bookTypo=true 时用原书印的 (7.68b) y'' − (x'²+3y'²)/y = 0，用于对比
export function halfPlaneGeodesic(x0, y0, ang, L, n = 800, bookTypo = false) {
  let y = [x0, y0, y0 * Math.cos(ang), y0 * Math.sin(ang)];       // 单位速度：(x'²+y'²)/y² = 1
  const f = (t, [x, yy, dx, dy]) => [dx, dy, 2 * dx * dy / yy, bookTypo ? (dx * dx + 3 * dy * dy) / yy : (dy * dy - dx * dx) / yy];
  const pts = [y.slice()], h = L / n;
  for (let i = 0; i < n; i++) { y = rk4(f, y, i * h, h); pts.push(y.slice()); if (y[1] < 1e-4 || y[1] > 1e4 || !Number.isFinite(y[1])) break; }
  return pts;
}

// ---------- 球面上的平行移动 ----------
const toXYZ = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const toTP = p => [Math.acos(Math.max(-1, Math.min(1, p[2]))), Math.atan2(p[1], p[0])];
export const sph = { toXYZ, toTP };
// 两点之间的大圆弧（slerp），参数 s∈[0,1]
export function slerp(a, b, s) {
  const om = Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
  if (om < 1e-9) return a.slice();
  const A = Math.sin((1 - s) * om) / Math.sin(om), B = Math.sin(s * om) / Math.sin(om);
  return add(scale(a, A), scale(b, B));
}
// 闭合测地多边形（顶点为单位向量）上的路径采样
export function polygonPath(V, perEdge = 400) {
  const pts = [];
  for (let i = 0; i < V.length; i++) { const a = V[i], b = V[(i + 1) % V.length]; for (let k = 0; k < perEdge; k++) pts.push(slerp(a, b, k / perEdge)); }
  pts.push(V[0].slice());
  return pts;
}
export function latitudePath(th0, n = 2000) {
  const pts = []; for (let k = 0; k <= n; k++) pts.push(toXYZ(th0, 2 * Math.PI * k / n)); return pts;
}
// 坐标法：在 (θ,φ) 坐标中积分 (7.18b)：dX^μ/dt + Γ^μ_{νλ} (dx^ν/dt) X^λ = 0
// 路径用 (θ(s),φ(s)) 的分段线性插值（φ 展开为连续），每小段内导数为常数，用 RK4 推进
export function transportCoord(pathXYZ, X0) {
  const tp = pathXYZ.map(toTP);
  for (let i = 1; i < tp.length; i++) { while (tp[i][1] - tp[i - 1][1] > Math.PI) tp[i][1] -= 2 * Math.PI; while (tp[i][1] - tp[i - 1][1] < -Math.PI) tp[i][1] += 2 * Math.PI; }
  let X = X0.slice(), minSin = 1;
  for (let i = 0; i + 1 < tp.length; i++) {
    const [t0, p0] = tp[i], [t1, p1] = tp[i + 1], dth = t1 - t0, dph = p1 - p0;
    const f = (s, [a, b]) => { const th = t0 + s * dth, G = sphereGamma(th); return [-G.t_pp * dph * b, -G.p_tp * (dth * b + dph * a)]; };
    X = rk4(f, X, 0, 1);
    minSin = Math.min(minSin, Math.sin(t1));
  }
  return { X, tpEnd: tp[tp.length - 1], tpStart: tp[0], minSin };
}
// 外在法（Levi-Civita 的经典图像，§7.4.2）：相邻两点 p→q 之间，把切向量绕轴 p×q 转过 p、q 的夹角
// （= 沿这段短大圆弧的精确平行移动：切平面"不打转"地滚过去）；与坐标法完全独立
export function transportExtrinsic(pathXYZ, V0) {
  let V = V0.slice();
  for (let i = 1; i < pathXYZ.length; i++) {
    const p = pathXYZ[i - 1], q = pathXYZ[i], k = cross(p, q), s = norm(k);
    if (s < 1e-15) continue;
    const c = dot(p, q), u = scale(k, 1 / s);           // Rodrigues：V cosω + (u×V) sinω + u(u·V)(1−cosω)
    V = add(add(scale(V, c), scale(cross(u, V), s)), scale(u, dot(u, V) * (1 - c)));
  }
  return V;
}
// 切向量的坐标分量 ↔ R³ 向量
export const tpToVec = (th, ph, [a, b]) => add(scale([Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)], a), scale([-Math.sin(ph), Math.cos(ph), 0], b * Math.sin(th)));
// 有向转角：从 V0 到 V1，以外法向 p 为轴（逆时针为正）
export const signedAngle = (V0, V1, p) => Math.atan2(dot(p, cross(V0, V1)), dot(V0, V1));
// 测地多边形的面积（Gauss–Bonnet / Girard：内角和 − (n−2)π），顶点按逆时针（从外看）排列时为正
export function polygonArea(V) {
  const n = V.length; let s = 0;
  for (let i = 0; i < n; i++) {
    const P = V[i], A = V[(i + n - 1) % n], B = V[(i + 1) % n];
    const ta = sub(A, scale(P, dot(A, P))), tb = sub(B, scale(P, dot(B, P)));
    s += Math.atan2(dot(P, cross(tb, ta)), dot(tb, ta)) < 0 ? 2 * Math.PI + Math.atan2(dot(P, cross(tb, ta)), dot(tb, ta)) : Math.atan2(dot(P, cross(tb, ta)), dot(tb, ta));
  }
  return s - (n - 2) * Math.PI;
}
export const wrap = a => { let x = a % (2 * Math.PI); if (x > Math.PI) x -= 2 * Math.PI; if (x <= -Math.PI) x += 2 * Math.PI; return x; };
