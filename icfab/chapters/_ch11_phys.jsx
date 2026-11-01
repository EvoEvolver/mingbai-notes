// 第 11 章（上）数值模型。纯函数，供 _ch11_plots.jsx 使用；已用 node 与原书例题（25.1 ns）、图 11.5 读数核对。
// 单位约定：长度 cm，电阻率 Ω·cm，电容 F，时间 s。

export const EPS0 = 8.854e-14;        // F/cm（原书例题取 8.86e-14）
export const KB_EV = 8.617e-5;        // eV/K
export const UM = 1e-4;               // 1 µm = 1e-4 cm
export const NM = 1e-7;               // 1 nm = 1e-7 cm

// 表 11.1 中常用材料的薄膜电阻率（µΩ·cm，取典型值）
export const RHO = { Cu: 1.7, Ag: 1.6, Au: 2.2, Al: 3.0, "Al(Cu)": 3.5, W: 10, TiSi2: 15, NiSi: 15, CoSi2: 18, WSi2: 30, TiN: 100, Poly: 500 };

// 式 (11.1)：R = ρL/(WH)
export const lineR = (rho, L, W, H) => rho * L / (W * H);
// 式 (11.2)：C = K ε0 WL/x_D + K ε0 HL/L_S（两项分别为 C_S、C_I）
export const lineC = (K, L, W, H, xD, LS) => ({ CS: K * EPS0 * W * L / xD, CI: K * EPS0 * H * L / LS });
// 式 (11.5)：τ = ρ L² K ε0 (1/(H x_D) + 1/(W L_S))
export const tau = (rho, K, L, W, H, xD, LS) => rho * L * L * K * EPS0 * (1 / (H * xD) + 1 / (W * LS));

// 图 11.5 的简化模型：W = H = L_S = F_min，x_D 固定 1 µm，最长连线 L = √A
export function tauGlobal(rhoMicro, Fum, Amm2, K = 3.9, xDum = 1) {
  const F = Fum * UM, L = Math.sqrt(Amm2) * 0.1;    // mm → cm
  return tau(rhoMicro * 1e-6, K, L, F, F, xDum * UM, F);
}
// 图 11.5 中虚线（栅延迟）的三个读数：1 µm → 1.7e-10 s，0.5 µm → 7e-11 s，0.25 µm → 3e-11 s；按幂律 F^1.25 拟合
export const tauGate = Fum => 1.7e-10 * Math.pow(Fum, 1.25);

// 中继器：把长度为 L 的线分成 n 段，每段 RC 延迟为原来 1/n²；每个中继器附加固定延迟 τ_rep
export const repeaterDelay = (tauWire, n, tauRep) => tauWire / n + n * tauRep;
export const nOpt = (tauWire, tauRep) => Math.max(1, Math.sqrt(tauWire / tauRep));

// 细线电阻率的尺寸效应（简化：Fuchs–Sondheimer 表面散射 + Mayadas–Shatzkes 晶界散射的常用近似式）
// ρ/ρ0 ≈ 1 + (3/8)(1−p)λ(1/W+1/H) + (3/2)·R/(1−R)·λ/d，晶粒尺寸 d ≈ min(W,H)；Cu 的电子平均自由程 λ ≈ 39 nm
export function rhoSize(rho0, Wnm, Hnm, { lambda = 39, p = 0, Rg = 0.3 } = {}) {
  const d = Math.min(Wnm, Hnm);
  return rho0 * (1 + 0.375 * (1 - p) * lambda * (1 / Wnm + 1 / Hnm) + 1.5 * Rg / (1 - Rg) * lambda / d);
}
// 阻挡层占去截面：导体有效宽、高各减去侧壁/底部阻挡层厚度 b（nm），顶部为介质帽层
export const effArea = (Wnm, Hnm, b) => Math.max(0, Wnm - 2 * b) * Math.max(0, Hnm - b);

// Black 方程：MTTF = A J^{-n} exp(Ea/kT)；返回相对于参考条件 (J0, T0) 的比值
export const blackRatio = (J, TK, n, Ea, J0, T0K) => Math.pow(J / J0, -n) * Math.exp(Ea / KB_EV * (1 / TK - 1 / T0K));

// 金属–半导体接触的比接触电阻率（热电子–场发射统一近似，Padovani–Stratton 形式）
// E00 = (qħ/2)·sqrt(N/(m* ε_s))，E0 = E00·coth(E00/kT)，ρ_c ≈ (k/(q A* T))·exp(qφ_B/E0)
export function E00eV(Ncm3, mr = 0.26, er = 11.7) {
  const q = 1.602e-19, hbar = 1.0546e-34, m = mr * 9.109e-31, es = er * 8.854e-12, N = Ncm3 * 1e6;
  return (q * hbar / 2) * Math.sqrt(N / (m * es)) / q;
}
export function rhoC(Ncm3, phiB, TK = 300, Astar = 112) {
  const kT = KB_EV * TK, e00 = E00eV(Ncm3), x = e00 / kT;
  const E0 = x > 1e-6 ? e00 / Math.tanh(x) : kT;
  return KB_EV / (Astar * TK) * Math.exp(phiB / E0);
}

// Clausius–Mossotti 式 (11.8)：(K−1)/(K+2) = Nα/(3ε0)。孔隙率 P 使 N → (1−P)N
export const cmX = K => (K - 1) / (K + 2);
export const cmK = x => (1 + 2 * x) / (1 - x);
export const porousK = (K0, P) => cmK((1 - P) * cmX(K0));

// 平坦化度 DOP，式 (11.6)
export const DOP = (xi, xf) => 1 - xf / xi;
