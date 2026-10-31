// 第 10 章数值函数（纯 JS，无 JSX）：散射偏振的立体角积分、E/B 偏振棒图样、球 Bessel 函数。
// 已用 node 核对：(10.25) Q=4πAΘ2；(10.27)–(10.28) 的 sin²θk cos2φk 依赖；张量 h× 给出 U=-(16π/15)cosα（与改正后的 (10.50) 一致；原书误印 (16/15)(π/2)）；
// h+ 在 k 位于 x–z 平面时 U=0（习题 10.6）；Exercise 10.5 紧耦合 Π=5Θ2/2。

// ---------- Gauss–Legendre 节点（cosθ 方向）----------
function gaussLegendre(n) {
  const x = new Array(n), w = new Array(n);
  for (let i = 0; i < n; i++) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5)), pp = 0;
    for (let it = 0; it < 100; it++) {
      let p1 = 1, p2 = 0;
      for (let j = 0; j < n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j + 1) * z * p2 - j * p3) / (j + 1); }
      pp = n * (z * p1 - p2) / (z * z - 1);
      const z1 = z; z = z1 - p1 / pp; if (Math.abs(z - z1) < 1e-15) break;
    }
    x[i] = z; w[i] = 2 / ((1 - z * z) * pp * pp);
  }
  return { x, w };
}
const GL = gaussLegendre(40);
const NPHI = 72;

// 入射强度 f(n') 的立体角积分：返回书中归一化（A=1）的
//   Q = ∫dΩ' f Σ_j(|e_x·ε'_j|²-|e_y·ε'_j|²) = -∫dΩ' f sin²θ' cos2φ'         (10.15)/(10.19)
//   U = -∫dΩ' f sin²θ' sin2φ'                                                (10.20)
//   Itot = ∫dΩ' f Σ_{i,j}|ε_i·ε'_j|² = ∫dΩ' f (1+cos²θ')   （出射 I_xx+I_yy，用于偏振度）
export function scatter(f) {
  let Q = 0, U = 0, I = 0;
  for (let a = 0; a < GL.x.length; a++) {
    const c = GL.x[a], s2 = 1 - c * c, st = Math.sqrt(s2);
    for (let b = 0; b < NPHI; b++) {
      const ph = 2 * Math.PI * (b + 0.5) / NPHI, w = GL.w[a] * 2 * Math.PI / NPHI;
      const n = [st * Math.cos(ph), st * Math.sin(ph), c];
      const v = f(n, c, ph) * w;
      Q += -v * s2 * Math.cos(2 * ph); U += -v * s2 * Math.sin(2 * ph); I += v * (1 + c * c);
    }
  }
  return { Q, U, I };
}

// 几种入射辐射场（n = 入射方向单位矢量 n'）
const P2 = m => (3 * m * m - 1) / 2;
export const FIELDS = {
  iso: () => () => 1,
  // 偶极：沿 x–y 平面内方向 β 的偶极（热端在 +β 方向）
  dip: ({ beta }) => n => n[0] * Math.cos(beta) + n[1] * Math.sin(beta),
  // 标量平面波的四极：Θ = -5Θ2 P2(k̂·n')，Θ2=1；k̂ = (sinθk cosφk, sinθk sinφk, cosθk)     (10.22)
  scal: ({ thk, phk }) => n => -5 * P2(Math.sin(thk) * Math.cos(phk) * n[0] + Math.sin(thk) * Math.sin(phk) * n[1] + Math.cos(thk) * n[2]),
  // 张量 h×：k 沿 z 时 Θ ∝ 2 n_x n_y；k̂ = cosα e_z + sinα e_x 时 n_x → cosα n_x - sinα n_z   (10.48)–(10.49)
  hx: ({ alpha }) => n => 2 * (Math.cos(alpha) * n[0] - Math.sin(alpha) * n[2]) * n[1],
  // 张量 h+：k 沿 z 时 Θ ∝ n_x² - n_y²；旋转同上                                           (A.136)–(A.137)
  hp: ({ alpha }) => n => (Math.cos(alpha) * n[0] - Math.sin(alpha) * n[2]) ** 2 - n[1] * n[1],
};
// 解析结果（同一归一化，A=1）
export const ANALYTIC = {
  iso: () => ({ Q: 0, U: 0 }),
  dip: () => ({ Q: 0, U: 0 }),
  scal: ({ thk, phk }) => ({ Q: 4 * Math.PI * Math.sin(thk) ** 2 * Math.cos(2 * phk), U: 4 * Math.PI * Math.sin(thk) ** 2 * Math.sin(2 * phk) }),   // (10.28)
  hx: ({ alpha }) => ({ Q: 0, U: -16 * Math.PI / 15 * Math.cos(alpha) }),
  hp: ({ alpha }) => ({ Q: -8 * Math.PI / 15 * (1 + Math.cos(alpha) ** 2), U: 0 }),
};
// 单向光束（图 10.5 左）：从 x–y 平面内方向 β 入射，Q=-cos2β，U=-sin2β，Itot=1
export const beam = beta => ({ Q: -Math.cos(2 * beta), U: -Math.sin(2 * beta), I: 1 });

// ---------- 球 Bessel 函数 j_l(x)（l 可到数千）----------
export function sphJ(l, x) {
  if (x === 0) return l === 0 ? 1 : 0;
  const j0 = Math.sin(x) / x;
  if (l === 0) return j0;
  if (x > l) {   // 向上递推稳定
    let a = j0, b = Math.sin(x) / (x * x) - Math.cos(x) / x;
    for (let n = 1; n < l; n++) { const c = (2 * n + 1) / x * b - a; a = b; b = c; }
    return b;
  }
  // x ≤ l：Miller 向下递推
  const L = l + Math.ceil(Math.sqrt(40 * l)) + 30;
  let jp = 0, j = 1e-300, out = 0, scale = 1;
  for (let n = L; n > 0; n--) {
    const jm = (2 * n + 1) / x * j - jp; jp = j; j = jm;
    if (Math.abs(j) > 1e250) { j *= 1e-250; jp *= 1e-250; out *= 1e-250; }
    if (n - 1 === l) out = j;
  }
  return out * (j0 / j);
}
// (j_l + j_l'')(x)：由球 Bessel 方程 (C.13) 精确计算
export function jPlusJpp(l, x) {
  const jl = sphJ(l, x), jm = sphJ(l - 1, x);
  const jp = jm - (l + 1) / x * jl;
  const jpp = -2 / x * jp - (1 - l * (l + 1) / (x * x)) * jl;
  return jl + jpp;
}
// (10.39) 右边三项
export const kernelTerms = (l, x) => {
  const jl = sphJ(l, x), jm = sphJ(l - 1, x);
  return { t1: -2 / x * jm, t2: 2 * (l + 1) / (x * x) * jl, t3: l * (l + 1) / (x * x) * jl, approx: l * l / (x * x) * jl };
};

// ---------- E/B 偏振棒图样 ----------
// 单个平面波（方向 φl，相位 χ）在点 θ 处的 Q、U（由 (10.11)，取实部）：
export function planeQU(th, phl, E, B, l0 = 1, chi = 0) {
  const ph = l0 * (Math.cos(phl) * th[0] + Math.sin(phl) * th[1]) + chi, c = Math.cos(ph);
  return [(Math.cos(2 * phl) * E - Math.sin(2 * phl) * B) * c, (Math.sin(2 * phl) * E + Math.cos(2 * phl) * B) * c];
}
// 径向波：N 个等振幅、原点同相、方向均匀分布的平面波之和（图 10.4）
export function radialQU(th, E, B, l0 = 1, N = 48) {
  let Q = 0, U = 0;
  for (let i = 0; i < N; i++) { const [q, u] = planeQU(th, 2 * Math.PI * i / N, E, B, l0); Q += q / N; U += u / N; }
  return [Q, U];
}
export function radialAmp(th, l0 = 1, N = 48) {
  let s = 0; for (let i = 0; i < N; i++) { const p = 2 * Math.PI * i / N; s += Math.cos(l0 * (Math.cos(p) * th[0] + Math.sin(p) * th[1])) / N; } return s;
}
