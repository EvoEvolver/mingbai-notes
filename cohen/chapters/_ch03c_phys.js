// 第 III 章补充材料（上）交互图的数值核心（纯 JS，无 React 依赖；复制为 .mjs 后可用 node 单独测试）。
// 单位约定：一律取 ħ = m = 1；A_III 中阱宽 a = 1；H_III 中电荷 q = 1。

// ---------- 复数小工具 ----------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => cx(a.re - b.re, a.im - b.im);
export const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export const cconj = a => cx(a.re, -a.im);
export const cscale = (a, s) => cx(a.re * s, a.im * s);
export const cabs2 = a => a.re * a.re + a.im * a.im;
export const cexpi = th => cx(Math.cos(th), Math.sin(th));

// =====================================================================
// A_III：无限深势阱（0 ≤ x ≤ 1）
// =====================================================================
export const E1 = Math.PI * Math.PI / 2;                 // 式 (1)，n = 1
export const En = n => n * n * E1;
export const TREV = 2 * Math.PI / E1;                    // 复现时间 4ma²/(πħ) = 4/π
export const phi = (n, x) => (x <= 0 || x >= 1) ? 0 : Math.SQRT2 * Math.sin(n * Math.PI * x);   // 式 (2)

// 式 (6)–(7)：动量表象波函数（a = ħ = 1）；返回概率密度 P̄_n(p)，式 (3)
export const Fdiff = p => (Math.abs(p) < 1e-9 ? 1 : Math.sin(p / 2) / (p / 2));
export function Pbar(n, p) {
  const s = Fdiff(p - n * Math.PI) + (n % 2 ? 1 : -1) * Fdiff(p + n * Math.PI);   // (−1)^{n+1}
  return s * s / (4 * Math.PI);
}
// 式 (11) 的近似（忽略干涉项）
export const PbarApprox = (n, p) => (Fdiff(p - n * Math.PI) ** 2 + Fdiff(p + n * Math.PI) ** 2) / (4 * Math.PI);

// 式 (32)：位置测量（精度 ε）之后测能量得到 E_n 的概率（a = 1）
export const PEn = (n, eps) => (n % 2 ? 8 / eps / (n * Math.PI) ** 2 * Math.sin(n * Math.PI * eps / 2) ** 2 : 0);

// 两态波包：式 (18)、(23)
export const W21 = 3 * Math.PI * Math.PI / 2;            // 式 (17)
export const dens2 = (x, t) => 0.5 * phi(1, x) ** 2 + 0.5 * phi(2, x) ** 2 + phi(1, x) * phi(2, x) * Math.cos(W21 * t);
export const xmean2 = t => 0.5 - 16 / (9 * Math.PI * Math.PI) * Math.cos(W21 * t);

// 一般波包：把 ψ0(x) 投影到前 N 个本征态
export function wellCoeffs(psi0, N = 80, M = 1200) {
  const c = [];
  for (let n = 1; n <= N; n++) {
    let re = 0, im = 0;
    for (let j = 0; j <= M; j++) {
      const x = j / M, w = (j === 0 || j === M) ? 1 : (j % 2 ? 4 : 2), f = psi0(x), s = phi(n, x);
      re += w * f.re * s; im += w * f.im * s;
    }
    c.push(cx(re / (3 * M), im / (3 * M)));
  }
  const nrm = Math.sqrt(c.reduce((s, z) => s + cabs2(z), 0));
  return c.map(z => cscale(z, 1 / nrm));
}
// 高斯初态：中心 x0、宽 s、平均波数 k0
export const gaussPsi0 = (x0, s, k0) => x => { const g = Math.exp(-((x - x0) ** 2) / (4 * s * s)); return cx(g * Math.cos(k0 * x), g * Math.sin(k0 * x)); };
// 两态初态（式 14）
export const twoState = () => [cx(Math.SQRT1_2), cx(Math.SQRT1_2)];
// ψ(x,t) = Σ c_n e^{−iE_n t} φ_n(x)
export function wellPsi(c, x, t) {
  let re = 0, im = 0;
  for (let k = 0; k < c.length; k++) {
    const n = k + 1, ph = -En(n) * t, s = phi(n, x);
    re += (c[k].re * Math.cos(ph) - c[k].im * Math.sin(ph)) * s;
    im += (c[k].re * Math.sin(ph) + c[k].im * Math.cos(ph)) * s;
  }
  return cx(re, im);
}
// 自相关 |⟨ψ(0)|ψ(t)⟩|² = |Σ |c_n|² e^{−iE_n t}|²
export function autocorr(c, t) {
  let re = 0, im = 0;
  c.forEach((z, k) => { const w = cabs2(z), ph = -En(k + 1) * t; re += w * Math.cos(ph); im += w * Math.sin(ph); });
  return re * re + im * im;
}
// ⟨X⟩(t)：用矩阵元 X_nm = ∫ x φ_n φ_m dx 的解析式
export function Xnm(n, m) {
  if (n === m) return 0.5;
  if ((n + m) % 2 === 0) return 0;
  return -8 * n * m / (Math.PI * Math.PI * (n * n - m * m) ** 2);
}
export function xmean(c, t) {
  let s = 0;
  for (let i = 0; i < c.length; i++) for (let j = 0; j < c.length; j++) {
    const X = Xnm(i + 1, j + 1); if (!X) continue;
    // Re{ c_i* c_j e^{−i(E_j−E_i)t} } X_ij
    const a = cmul(cconj(c[i]), c[j]), ph = -(En(j + 1) - En(i + 1)) * t;
    s += (a.re * Math.cos(ph) - a.im * Math.sin(ph)) * X;
  }
  return s;
}
export const meanE = c => c.reduce((s, z, k) => s + cabs2(z) * En(k + 1), 0);

// =====================================================================
// B_III：势阶上的概率流（ħ = m = 1）
// =====================================================================
// 一维，E > V0：入射振幅 1。返回 {k1,k2,Ar,At,R,T}
export function step1D(E, V0) {
  const k1 = Math.sqrt(2 * E), k2 = Math.sqrt(2 * (E - V0));
  const Ar = (k1 - k2) / (k1 + k2), At = 2 * k1 / (k1 + k2);
  return { k1, k2, Ar, At, R: Ar * Ar, T: k2 / k1 * At * At };
}
// 由波函数数值求流 J = Im(ψ* ψ')（ħ = m = 1），用于核对式 (4)、(7)
export function currentNum(psi, x, h = 1e-5) {
  const a = psi(x), b = psi(x + h), c = psi(x - h);
  const d = cx((b.re - c.re) / (2 * h), (b.im - c.im) / (2 * h));
  return a.re * d.im - a.im * d.re;
}
// 二维斜入射全反射：E1 < V0（只用比值 e = E1/V0）；以 ħk_y|A|²/m 为流的单位、1/k_x 为长度单位
export function oblique(e) {
  const theta = Math.atan(Math.sqrt((1 - e) / e));       // 式 (22)
  const rhoOverK = Math.tan(theta);
  return {
    theta,
    JyI: X => 2 + 2 * Math.cos(2 * X + 2 * theta),        // 式 (25)，X = k_x x
    JyII: X => 4 * Math.cos(theta) ** 2 * Math.exp(-2 * rhoOverK * X),   // 式 (26)
    densI: X => 2 + 2 * Math.cos(2 * X + 2 * theta),
  };
}

// =====================================================================
// E_III：两能级（qubit）密度矩阵。矩阵为 [[a,b],[c,d]]，元素为复数
// =====================================================================
export const blochKet = (th, ph) => [cx(Math.cos(th / 2)), cscale(cexpi(ph), Math.sin(th / 2))];
export const proj = v => v.map(a => v.map(b => cmul(a, cconj(b))));               // |v⟩⟨v|
export const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
export const mscale = (A, s) => A.map(r => r.map(z => cscale(z, s)));
export const mmul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, z, k) => cadd(s, cmul(z, B[k][j])), cx(0))));
export const mdag = A => A[0].map((_, j) => A.map(r => cconj(r[j])));
export const trace = A => A.reduce((s, r, i) => cadd(s, r[i]), cx(0));
export const purity = A => trace(mmul(A, A)).re;
// Bloch 矢量：r = (2 Re ρ01, −2 Im ρ01, ρ00 − ρ11)  （ρ01 = ⟨0|ρ|1⟩）
export const blochVec = A => [2 * A[0][1].re, -2 * A[0][1].im, A[0][0].re - A[1][1].re];
// 两态的统计混合（式 28）
export function mixture(p, th1, ph1, th2, ph2) {
  return madd(mscale(proj(blochKet(th1, ph1)), p), mscale(proj(blochKet(th2, ph2)), 1 - p));
}
// 二体纯态 |Ψ⟩ = cosα |0⟩|χa⟩ + sinα |1⟩|χb⟩，|χa⟩ = |0⟩，|χb⟩ = cosγ|0⟩ + sinγ|1⟩
// 基序 |00⟩,|01⟩,|10⟩,|11⟩（第一个指标属体系 1）
export function twoBodyPsi(al, ga) {
  const c = Math.cos(al), s = Math.sin(al);
  return [cx(c), cx(0), cx(s * Math.cos(ga)), cx(s * Math.sin(ga))];
}
// 部分迹（式 56、59）：rho 为 4×4，返回 2×2
export function ptrace2(rho) {   // Tr_2
  const r = [[cx(0), cx(0)], [cx(0), cx(0)]];
  for (let n = 0; n < 2; n++) for (let np = 0; np < 2; np++) for (let p = 0; p < 2; p++) r[n][np] = cadd(r[n][np], rho[2 * n + p][2 * np + p]);
  return r;
}
export function ptrace1(rho) {   // Tr_1
  const r = [[cx(0), cx(0)], [cx(0), cx(0)]];
  for (let p = 0; p < 2; p++) for (let pp = 0; pp < 2; pp++) for (let n = 0; n < 2; n++) r[p][pp] = cadd(r[p][pp], rho[2 * n + p][2 * n + pp]);
  return r;
}
export function kron(A, B) {
  const out = [];
  for (let i = 0; i < 4; i++) { out.push([]); for (let j = 0; j < 4; j++) out[i].push(cmul(A[i >> 1][j >> 1], B[i & 1][j & 1])); }
  return out;
}
export const mdist = (A, B) => Math.sqrt(A.reduce((s, r, i) => s + r.reduce((t, z, j) => t + cabs2(csub(z, B[i][j])), 0), 0));   // Frobenius 距离

// =====================================================================
// F_III / G_III：旋转磁场中的自旋 1/2，H(t) = ½[ω0 σz + ω1 (cos ωt σx + sin ωt σy)]（ħ = 1）
// =====================================================================
const I2 = [[cx(1), cx(0)], [cx(0), cx(1)]];
export const SX = [[cx(0), cx(1)], [cx(1), cx(0)]], SY = [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]], SZ = [[cx(1), cx(0)], [cx(0), cx(-1)]];
// exp(−i (n·σ) θ) 对实矢量 v = nθ：cos|v| 𝟙 − i sin|v| (v̂·σ)
export function expSigma(vx, vy, vz) {
  const th = Math.hypot(vx, vy, vz); if (th < 1e-15) return I2;
  const c = Math.cos(th), s = Math.sin(th) / th;
  return [[cx(c, -s * vz), cx(-s * vy, -s * vx)], [cx(s * vy, -s * vx), cx(c, s * vz)]];
}
export const field = (w0, w1, w, t) => [w1 * Math.cos(w * t), w1 * Math.sin(w * t), w0];   // Ω(t)，H = ½ Ω·σ
// 演化算符：把 [0,t] 切成 n 段，逐段乘以中点处的短时传播子（式 10、16 的离散版）
export function Uprod(w0, w1, w, t, n = 400) {
  let U = I2; const dt = t / n;
  for (let k = 0; k < n; k++) { const [a, b, c] = field(w0, w1, w, (k + 0.5) * dt); U = mmul(expSigma(a * dt / 2, b * dt / 2, c * dt / 2), U); }
  return U;
}
// 解析解（转到以 ω 旋转的参考系）：U = e^{−iωtσz/2} e^{−i[(ω0−ω)σz + ω1σx]t/2}
export const Uexact = (w0, w1, w, t) => mmul(expSigma(0, 0, w * t / 2), expSigma(w1 * t / 2, 0, (w0 - w) * t / 2));
// 错误的“直接积分”：V = exp(−i ∫H dt')（注释 i，式 20）
export function Unaive(w0, w1, w, t) {
  const ix = Math.abs(w) < 1e-12 ? w1 * t : w1 * Math.sin(w * t) / w, iy = Math.abs(w) < 1e-12 ? 0 : w1 * (1 - Math.cos(w * t)) / w;
  return expSigma(ix / 2, iy / 2, w0 * t / 2);
}
export const apply = (U, v) => U.map(r => r.reduce((s, z, k) => cadd(s, cmul(z, v[k])), cx(0)));
export const expect = (A, v) => v.reduce((s, z, i) => s + cmul(cconj(z), apply(A, v)[i]).re, 0);
// Schrödinger 绘景：⟨ψ(t)|A|ψ(t)⟩；Heisenberg 绘景：⟨ψ(0)|U†AU|ψ(0)⟩
export const meanS = (U, A, psi0) => expect(A, apply(U, psi0));
export const meanH = (U, A, psi0) => expect(mmul(mdag(U), mmul(A, U)), psi0);
// 平均值的运动方程（由 G_III 式 8 取平均）：d⟨σ⟩/dt = Ω(t) × ⟨σ⟩，RK4 独立积分
export function blochRK4(w0, w1, w, s0, t, n = 2000) {
  const f = (tt, s) => { const [a, b, c] = field(w0, w1, w, tt); return [b * s[2] - c * s[1], c * s[0] - a * s[2], a * s[1] - b * s[0]]; };
  let s = s0.slice(); const h = t / n; let tt = 0;
  for (let k = 0; k < n; k++) {
    const k1 = f(tt, s), k2 = f(tt + h / 2, s.map((v, i) => v + h / 2 * k1[i])), k3 = f(tt + h / 2, s.map((v, i) => v + h / 2 * k2[i])), k4 = f(tt + h, s.map((v, i) => v + h * k3[i]));
    s = s.map((v, i) => v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); tt += h;
  }
  return s;
}
export const unitarityErr = U => mdist(mmul(mdag(U), U), I2);

// =====================================================================
// H_III：规范变换（一维，ħ = m = q = 1）。初始规范 A = 0、U = 0；χ(x) = g sin(κx)
// =====================================================================
export const packet = (x0, s, k0) => x => { const g = Math.exp(-((x - x0) ** 2) / (4 * s * s)) / Math.pow(2 * Math.PI * s * s, 0.25); return cx(g * Math.cos(k0 * x), g * Math.sin(k0 * x)); };
export const gaugeChi = (g, kap) => x => g * Math.sin(kap * x);
export const gaugeA = (g, kap) => x => g * kap * Math.cos(kap * x);        // A' = ∂χ/∂x（式 2）
export const gaugeTransform = (psi, chi) => x => cmul(cexpi(chi(x)), psi(x));   // 式 (44)
// 网格上的 ⟨P⟩ 与 ⟨Π⟩ = ⟨P − qA⟩（式 29、30），以及 ∫|ψ|²
export function gaugeMoments(psi, A, L = 12, M = 4000) {
  const h = 2 * L / M; let n = 0, P = 0, Pi = 0, X = 0;
  for (let j = 1; j < M; j++) {
    const x = -L + j * h, a = psi(x), b = psi(x + h), c = psi(x - h);
    const d = cx((b.re - c.re) / (2 * h), (b.im - c.im) / (2 * h));
    const rho = cabs2(a), jx = a.re * d.im - a.im * d.re;    // Re[ψ* (−i d/dx) ψ] = Im(ψ* ψ')
    n += rho * h; P += jx * h; Pi += (jx - A(x) * rho) * h; X += x * rho * h;
  }
  return { norm: n, P, Pi, X };
}
// 概率流（式 72）：J = Re[ψ*(−i∂x − qA)ψ] = Im(ψ*ψ') − A|ψ|²
export function gaugeCurrent(psi, A, x, h = 1e-4) {
  const a = psi(x), b = psi(x + h), c = psi(x - h);
  const d = cx((b.re - c.re) / (2 * h), (b.im - c.im) / (2 * h));
  return a.re * d.im - a.im * d.re - A(x) * cabs2(a);
}
