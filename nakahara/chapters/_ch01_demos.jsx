// 第 1 章交互图（全部在浏览器内真算）：
//  1. ActionLab      —— 谐振子：经典轨道 + 端点固定的扰动 a·sin(nπt/T)，数值积分 S(a)，验证 δS=0（式 1.4）、S_cl（式 1.135）与二阶变分的符号
//  2. PropagatorLab  —— 谐振子路径积分的时间切片：N 个短时核（式 1.92）逐个做 Gauss 积分（精确复合），与精确传播子（式 1.149 / Mehler 核）
//                       以及配分函数 1/(2 sinh(βω/2))（式 1.150–1.151）比较，误差随 N 的收敛阶
//  3. GrassmannLab   —— Grassmann 代数（2n 个生成元的外代数，按位掩码实现）：Berezin 积分 ∫dθ̄dθ exp(−θ̄Mθ) = det M（式 1.187），
//                       ∫dθ exp(½ θᵀAθ) = Pf(A)（命题 1.3），θ² = 0 与反对易；费米振子 det B_N（式 1.200–1.201）
//  4. InstantonLab   —— BPST 瞬子：有限差分算 F，自对偶、作用量密度、S = 8π²、Q = 1（式 1.294–1.305，含勘误核对）
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg, Plot } from "@kit";

const R = String.raw;
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const f4 = v => (Math.abs(v) < 1e-3 && v !== 0 ? v.toExponential(2) : v.toFixed(4));

// ============================================================
// 1. 作用量的变分（m = ω = 1）
// ============================================================
const QI = 0, QF = 1;
function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
export function ActionLab() {
  const [T, setT] = useState(2);
  const [n, setN] = useState(1);
  const [a, setA] = useState(0.4);
  const res = useMemo(() => {
    const sT = Math.sin(T);
    const qc = t => (QF * Math.sin(t) + QI * Math.sin(T - t)) / sT;           // (1.134)
    const vc = t => (QF * Math.cos(t) - QI * Math.cos(T - t)) / sT;
    const k = n * Math.PI / T, eta = t => Math.sin(k * t), deta = t => k * Math.cos(k * t);
    const S = A => simpson(t => { const v = vc(t) + A * deta(t), q = qc(t) + A * eta(t); return 0.5 * v * v - 0.5 * q * q; }, 0, T);
    const Scl = ((QF * QF + QI * QI) * Math.cos(T) - 2 * QF * QI) / (2 * sT);  // (1.135)
    const coef = T / 4 * (k * k - 1);                                           // δ²S 的系数：S = S_cl + a² T/4 ((nπ/T)² − 1)
    const h = 1e-3, dS = (S(h) - S(-h)) / (2 * h), d2 = (S(h) - 2 * S(0) + S(-h)) / (h * h) / 2;
    const pts = []; for (let i = 0; i <= 24; i++) { const A = -1 + i / 12; pts.push([A, S(A) - Scl]); }
    return { qc, eta, S0: S(0), Scl, coef, dS, d2, pts, Sa: S(a) };
  }, [T, n, a]);
  const near = Math.abs(Math.sin(T)) < 0.15;
  const trajSeries = [
    { label: R`x_{\rm c}(t)`, f: t => (t <= T ? res.qc(t) : NaN), color: "#1f1b16" },
    { label: R`x_{\rm c}+a\,\eta_n`, f: t => (t <= T ? res.qc(t) + a * res.eta(t) : NaN), color: "#c0392b", dash: "dash" },
  ];
  const sSeries = [
    { label: R`\text{解析：}a^2\tfrac T4\big[(n\pi/T)^2-1\big]`, f: A => res.coef * A * A, color: "#2c4a6e" },
    { label: R`\text{数值积分 }S(a)-S_{\rm c}`, data: res.pts, points: true, color: "#c0392b" },
  ];
  return (
    <RunCard title={R`交互图 1：扰动经典轨道，看作用量怎样变化`}
      lead={R`谐振子（$m=\omega=1$），端点 $x(0)=0$、$x(T)=1$。在经典轨道 $x_{\rm c}$（\eqref{1.134}）上叠加端点为零的扰动 $a\,\eta_n(t)=a\sin(n\pi t/T)$，用 Simpson 法数值计算 $S(a)=\int_0^T(\tfrac12\dot x^2-\tfrac12x^2)\dd t$。因为 $L$ 是二次的，$S(a)-S_{\rm c}=a^2\cdot\tfrac T4[(n\pi/T)^2-1]$：**没有一次项**（这就是 $\delta S=0$），二次项的符号在 $T=n\pi$ 处翻转。`}>
      <Row gap={24}>
        <div style={{ minWidth: 260, flex: "1 1 260px" }}>
          <Slider label={R`时间 $T$`} value={T} min={0.5} max={7} step={0.05} onChange={setT} fmt={v => v.toFixed(2)} />
          <Slider label={R`扰动幅度 $a$`} value={a} min={-1} max={1} step={0.05} onChange={setA} fmt={v => v.toFixed(2)} />
          <div style={{ margin: "6px 0" }}><TxI>{R`扰动模式 $n$：`}</TxI> <Seg options={[1, 2, 3, 4].map(k => [k, `$n=${k}$`])} value={n} onChange={setN} /></div>
          <p style={{ fontSize: 14 }}><TxI>{R`数值 $S(0)=${f4(res.S0)}$，公式 \eqref{1.135} 给出 $S_{\rm c}=${f4(res.Scl)}$；$\left.\dd S/\dd a\right|_{a=0}=${f4(res.dS)}$；$\tfrac12\dd^2S/\dd a^2=${f4(res.d2)}$，解析值 $${f4(res.coef)}$。`}</TxI></p>
          {near && <p className="muted" style={{ fontSize: 13 }}><TxI>{R`注意：$T$ 接近 $\pi$ 的整数倍，$\sin T\to0$，经典轨道 \eqref{1.134} 发散——这是**共轭点**（焦点）：从同一点出发的所有经典轨道在 $T=\pi$ 时重新汇聚。`}</TxI></p>}
        </div>
      </Row>
      <Row>
        <div style={{ flex: "1 1 320px", minWidth: 300 }}>
          <Plot x={{ label: R`t`, domain: [0, T] }} y={{ label: R`x(t)` }} series={trajSeries} samples={200} height={300} />
        </div>
        <div style={{ flex: "1 1 320px", minWidth: 300 }}>
          <Plot x={{ label: R`a`, domain: [-1, 1] }} y={{ label: R`S(a)-S_{\rm c}` }} series={sSeries} vlines={[{ x: a, label: R`a` }]} samples={120} height={300} />
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(res.dS) < 1e-6} label={R`$\delta S=0$：$|\dd S/\dd a|_{a=0}<10^{-6}$`} />
        <Check ok={Math.abs(res.S0 - res.Scl) < 1e-6 * Math.max(1, Math.abs(res.Scl))} label={R`数值 $S[x_{\rm c}]$ 与 \eqref{1.135} 一致`} />
        <Check ok={Math.abs(res.d2 - res.coef) < 1e-4 * Math.max(1, Math.abs(res.coef))} label={R`二阶变分 $=\tfrac T4[(n\pi/T)^2-1]$`} />
        <span className="muted" style={{ alignSelf: "center" }}><TxI>{res.coef > 0 ? R`当前：$S$ 在经典轨道处沿此方向取**极小**` : R`当前：$S$ 沿此方向**减小**——经典轨道不是最小值，只是稳定点`}</TxI></span>
      </div>
    </RunCard>);
}

// ============================================================
// 2. 谐振子路径积分的时间切片（m = ω = 1）
// ============================================================
const cx = (re, im = 0) => ({ re, im });
const cadd = (a, b) => cx(a.re + b.re, a.im + b.im), csub = (a, b) => cx(a.re - b.re, a.im - b.im);
const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const csqrt = a => { const r = Math.hypot(a.re, a.im), t = Math.atan2(a.im, a.re); return cx(Math.sqrt(r) * Math.cos(t / 2), Math.sqrt(r) * Math.sin(t / 2)); };
const cexp = a => cx(Math.exp(a.re) * Math.cos(a.im), Math.exp(a.re) * Math.sin(a.im));
// Gauss 核 K(x,y) = C exp(−(a x² + d y² − 2 b x y))；两个核复合 = 对中间变量做 Gauss 积分（精确）
function compose(K1, K2) {
  const s = cadd(K1.d, K2.a);
  return { C: cmul(cmul(K1.C, K2.C), csqrt(cdiv(cx(Math.PI), s))), a: csub(K1.a, cdiv(cmul(K1.b, K1.b), s)), d: csub(K2.d, cdiv(cmul(K2.b, K2.b), s)), b: cdiv(cmul(K1.b, K2.b), s) };
}
// 一段短时核：虚时间 exp(−ε[(x−y)²/2ε² + V])；实时间 √(1/2πiε) exp(iε[(x−y)²/2ε² − V])；V = ½·(中点)² 或 ½·(端点平方的平均)
function shortKernel(eps, real, rule) {
  // 中点规则 V((x+y)/2)=(x²+2xy+y²)/8·… 带交叉项 ±ε/8；端点平均 (V(x)+V(y))/2 无交叉项
  const kin = 1 / (2 * eps), pv = rule === "mid" ? eps / 8 : eps / 4, px = rule === "mid" ? eps / 8 : 0;
  if (!real) return { C: cx(Math.sqrt(1 / (2 * Math.PI * eps))), a: cx(kin + pv), d: cx(kin + pv), b: cx(kin - px) };
  return { C: cmul(cx(Math.cos(-Math.PI / 4), Math.sin(-Math.PI / 4)), cx(Math.sqrt(1 / (2 * Math.PI * eps)))), a: cx(0, -(kin - pv)), d: cx(0, -(kin - pv)), b: cx(0, -(kin + px)) };
}
function sliced(N, tau, real, rule) { const k = shortKernel(tau / N, real, rule); let K = k; for (let i = 1; i < N; i++) K = compose(K, k); return K; }
const evalK = (K, x, y) => cmul(K.C, cexp(csub(cx(0), cadd(cadd(cmul(K.a, cx(x * x)), cmul(K.d, cx(y * y))), cmul(cx(-2 * x * y), K.b)))));
const exactK = (x, y, tau, real) => real
  ? cmul(csqrt(cdiv(cx(1), cx(0, 2 * Math.PI * Math.sin(tau)))), cexp(cx(0, ((x * x + y * y) * Math.cos(tau) - 2 * x * y) / (2 * Math.sin(tau)))))
  : cx(Math.sqrt(1 / (2 * Math.PI * Math.sinh(tau))) * Math.exp(-((x * x + y * y) * Math.cosh(tau) - 2 * x * y) / (2 * Math.sinh(tau))));
const traceZ = K => cmul(K.C, csqrt(cdiv(cx(Math.PI), csub(cadd(K.a, K.d), cmul(cx(2), K.b)))));
const NS = [1, 2, 4, 8, 16, 32, 64, 128, 256];
const XG = Array.from({ length: 121 }, (_, i) => -3 + i / 20);
function supErr(N, tau, real, rule, y) {
  const K = sliced(N, tau, real, rule); let e = 0, m = 0;
  for (const x of XG) { const a = evalK(K, x, y), b = exactK(x, y, tau, real); e = Math.max(e, Math.hypot(a.re - b.re, a.im - b.im)); m = Math.max(m, Math.hypot(b.re, b.im)); }
  return e / m;
}
export function PropagatorLab() {
  const [real, setReal] = useState(false);
  const [rule, setRule] = useState("mid");
  const [N, setN] = useState(4);
  const [tau, setTau] = useState(1.5);
  const [y, setY] = useState(0.5);
  const t = real ? Math.min(tau, 2.8) : tau;
  const res = useMemo(() => {
    const K = sliced(N, t, real, rule);
    const err = { mid: NS.map(n => [n, supErr(n, t, real, "mid", y)]), end: NS.map(n => [n, supErr(n, t, real, "end", y)]) };
    const slope = r => Math.log(err[r][8][1] / err[r][6][1]) / Math.log(4);
    const Z = real ? null : traceZ(K).re, Zex = 1 / (2 * Math.sinh(t / 2));
    return { K, err, slope, Z, Zex, e256: err[rule][8][1] };
  }, [N, t, real, rule, y]);
  const series = real ? [
    { label: R`\mathrm{Re}\,K\ \text{精确}`, f: x => exactK(x, y, t, true).re, color: "#1f1b16" },
    { label: R`\mathrm{Im}\,K\ \text{精确}`, f: x => exactK(x, y, t, true).im, color: "#2c6e49" },
    { label: R`\mathrm{Re}\,K_N`, f: x => evalK(res.K, x, y).re, color: "#c0392b", dash: "dash" },
    { label: R`\mathrm{Im}\,K_N`, f: x => evalK(res.K, x, y).im, color: "#b8862b", dash: "dash" },
  ] : [
    { label: R`h(x,y;\beta)\ \text{精确}`, f: x => exactK(x, y, t, false).re, color: "#1f1b16" },
    { label: R`K_N\ (N=${N})`, f: x => evalK(res.K, x, y).re, color: "#c0392b", dash: "dash" },
  ];
  const errSeries = [
    { label: R`\text{中点（Weyl，式 1.92）}`, data: res.err.mid, points: true, color: "#c0392b" },
    { label: R`\text{端点平均}`, data: res.err.end, points: true, color: "#2c4a6e" },
    { label: R`\propto1/N`, f: n => res.err.mid[0][1] / n, color: "#c0392b", dash: "dot" },
    { label: R`\propto1/N^2`, f: n => res.err.end[0][1] / (n * n), color: "#2c4a6e", dash: "dot" },
  ];
  return (
    <RunCard title={R`交互图 2：把谐振子的路径积分切成 $N$ 段`}
      lead={R`$m=\omega=1$。把时间切成 $N$ 段，每段用短时核 \eqref{1.92}，然后对 $N-1$ 个中间位置**逐个精确地**做 Gauss 积分（每次积分把两个 Gauss 核复合成一个），得到 $K_N(x,y)$；与精确传播子比较：虚时间是热核 $h(x,y;\beta)=\big(2\pi\sinh\beta\big)^{-1/2}\exp\{-[(x^2+y^2)\cosh\beta-2xy]/2\sinh\beta\}$（\eqref{1.149} 的 Wick 转动），实时间是 \eqref{1.149} 本身。右图是最大相对误差随 $N$ 的变化（对数坐标）。`}>
      <Row gap={24}>
        <div style={{ flex: "1 1 280px" }}>
          <Seg options={[[false, "虚时间 $\\beta$"], [true, "实时间 $T$"]]} value={real} onChange={setReal} />
          <div style={{ marginTop: 6 }}><Seg options={[["mid", "势取中点（原书）"], ["end", "势取端点平均"]]} value={rule} onChange={setRule} /></div>
          <div style={{ marginTop: 6 }}><TxI>{R`切片数 $N$：`}</TxI> <Seg options={NS.slice(0, 8).map(k => [k, String(k)])} value={N} onChange={setN} /></div>
          <Slider label={real ? R`$T$` : R`$\beta$`} value={t} min={0.2} max={real ? 2.8 : 6} step={0.05} onChange={setTau} fmt={v => v.toFixed(2)} />
          <Slider label={R`起点 $y=x_i$`} value={y} min={-1.5} max={1.5} step={0.05} onChange={setY} fmt={v => v.toFixed(2)} />
          {!real && <p style={{ fontSize: 14 }}><TxI>{R`配分函数（对角元积分，\eqref{1.112}）：$Z_N=${f4(res.Z)}$，精确 $1/(2\sinh\tfrac\beta2)=${f4(res.Zex)}$。$-\tfrac1\beta\ln Z_N=${f4(-Math.log(res.Z) / t)}$（$\beta\to\infty$ 时趋于基态能 $\tfrac12$）。`}</TxI></p>}
          {real && <p className="muted" style={{ fontSize: 13 }}><TxI>{R`实时间限制 $T<\pi$：$T=\pi$ 是焦点，\eqref{1.149} 的 $1/\sin\omega T$ 发散，越过它要加 Maslov 相位。`}</TxI></p>}
        </div>
      </Row>
      <Row>
        <div style={{ flex: "1 1 320px", minWidth: 300 }}>
          <Plot x={{ label: R`x=x_f`, domain: [-3, 3] }} y={{ label: real ? R`K(x,y)` : R`h(x,y;\beta)` }} series={series} samples={241} height={300} />
        </div>
        <div style={{ flex: "1 1 320px", minWidth: 300 }}>
          <Plot x={{ label: R`N`, log: true, domain: [1, 256] }} y={{ label: R`\max_x|K_N-K|/\max_x|K|`, log: true }} series={errSeries} samples={60} height={300} />
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={res.e256 < 3e-2} label={R`$N=256$ 时最大相对误差 $=${res.e256.toExponential(1)}$`} />
        <Check ok={-res.slope("mid") > 0.8} label={R`中点规则：经验收敛阶 $\approx${(-res.slope("mid")).toFixed(2)}$（渐近 $\propto1/N$）`} />
        <Check ok={Math.abs(res.slope("end") + 2) < 0.2} label={R`端点平均：收敛阶 $\approx${(-res.slope("end")).toFixed(2)}$（$\propto1/N^2$）`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：两种取法在 $N\to\infty$ 时都收敛到同一个精确传播子——这就是"路径积分与离散化细节无关"的含义；但收敛速度不同：势取中点时每段的误差是 $\mathcal{O}(\varepsilon\cdot\varepsilon)$（来自 \eqref{1.92} 中的 $\mathcal{O}(\varepsilon(x-y)^2)$，而 $(x-y)^2\sim\varepsilon$），$N$ 段累积为 $\mathcal{O}(\varepsilon)$；端点平均恰好对应把 $\mathrm{e}^{-\varepsilon V/2}\mathrm{e}^{-\varepsilon\hat p^2/2m}\mathrm{e}^{-\varepsilon V/2}$ 对称分裂，误差 $\mathcal{O}(\varepsilon^2)$。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. Grassmann 代数实验室
// ============================================================
// 元素 = 长度 2^G 的系数数组；下标的二进制位表示单项式 θ_{i1}θ_{i2}…（i1<i2<…，按生成元编号升序排列）
const popc = x => { let c = 0; while (x) { x &= x - 1; c++; } return c; };
function grass(G) {
  const D = 1 << G;
  const zero = () => new Float64Array(D);
  const gen = i => { const z = zero(); z[1 << i] = 1; return z; };
  const one = () => { const z = zero(); z[0] = 1; return z; };
  const sgn = (A, B) => { let s = 0; for (let j = 0; j < G; j++) if (B >> j & 1) s += popc(A >> (j + 1)); return s & 1 ? -1 : 1; };   // 把 B 的生成元逐个移过 A 中编号更大的生成元
  const nz = x => { const o = []; for (let a = 0; a < D; a++) if (x[a]) o.push(a); return o; };
  const mul = (x, y) => { const z = zero(), ix = nz(x), iy = nz(y); for (const a of ix) for (const b of iy) if (!(a & b)) z[a | b] += sgn(a, b) * x[a] * y[b]; return z; };
  const add = (x, y, c = 1) => { const z = zero(); for (let a = 0; a < D; a++) z[a] = x[a] + c * y[a]; return z; };
  const scale = (x, c) => x.map(v => v * c);
  const der = (i, x) => { const z = zero(); for (let a = 0; a < D; a++) if (x[a] && (a >> i & 1)) z[a ^ (1 << i)] += (popc(a & ((1 << i) - 1)) & 1 ? -1 : 1) * x[a]; return z; };   // 左导数 (1.174)–(1.175)
  const integ = (order, x) => { let y = x; for (let k = order.length - 1; k >= 0; k--) y = der(order[k], y); return y[0]; };   // ∫dθ_{o0}dθ_{o1}… = ∂_{o0}∂_{o1}…  (1.180)
  const exp = x => { const c0 = x[0], N = x.slice(); N[0] = 0; let term = one(), sum = one(); for (let k = 1; k <= G; k++) { term = scale(mul(term, N), 1 / k); if (!nz(term).length) break; sum = add(sum, term); } return scale(sum, Math.exp(c0)); };
  return { D, zero, gen, one, mul, add, scale, der, integ, exp, nz };
}
function detM(A) { const n = A.length; if (!n) return 1; const M = A.map(r => r.slice()); let d = 1; for (let i = 0; i < n; i++) { let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r; if (Math.abs(M[p][i]) < 1e-14) return 0; if (p !== i) { [M[p], M[i]] = [M[i], M[p]]; d = -d; } d *= M[i][i]; for (let r = i + 1; r < n; r++) { const f = M[r][i] / M[i][i]; for (let c = i; c < n; c++) M[r][c] -= f * M[i][c]; } } return d; }
function perms(n) { if (n === 1) return [[0]]; const out = []; for (const p of perms(n - 1)) for (let k = 0; k <= p.length; k++) out.push([...p.slice(0, k), n - 1, ...p.slice(k)]); return out; }
const permSign = p => { let s = 1; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) if (p[i] > p[j]) s = -s; return s; };
function pfDef(a) {   // 按定义 (1.188)：1/(2^n n!) Σ_P sgn(P) a_{i1 i2}…a_{i_{2n-1} i_{2n}}
  const m = a.length, n = m / 2; let s = 0;
  for (const p of perms(m)) { let t = permSign(p); for (let k = 0; k < m; k += 2) t *= a[p[k]][p[k + 1]]; s += t; }
  let f = 1; for (let k = 2; k <= n; k++) f *= k; return s / (Math.pow(2, n) * f);
}
const randInt = () => Math.floor(Math.random() * 7) - 3;
const fmtN = v => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(6));
const matTex = A => R`\begin{pmatrix}` + A.map(r => r.map(v => fmtN(v)).join("&")).join(R`\\`) + R`\end{pmatrix}`;
const DET0 = [[2, 1, 0], [-1, 1, 3], [0, -2, 1]];
const PF0 = [[0, 1, 2, -1, 0, 3], [-1, 0, 1, 2, -2, 0], [-2, -1, 0, 1, 1, -1], [1, -2, -1, 0, 2, 1], [0, 2, -1, -2, 0, 1], [-3, 0, 1, -1, -1, 0]];
export function GrassmannLab() {
  const [mode, setMode] = useState("det");
  const [n, setN] = useState(2);
  const [seed, setSeed] = useState(0);
  const [NB, setNB] = useState(4);
  const [bw, setBw] = useState(1.5);
  const A = useMemo(() => {
    if (mode === "det") return seed ? Array.from({ length: n }, () => Array.from({ length: n }, randInt)) : DET0.slice(0, n).map(r => r.slice(0, n));
    if (mode === "pf") {
      const m = 2 * n; if (!seed) return PF0.slice(0, m).map(r => r.slice(0, m));
      const a = Array.from({ length: m }, () => Array(m).fill(0)); for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) { const v = randInt(); a[i][j] = v; a[j][i] = -v; } return a;
    }
    return null;
  }, [mode, n, seed]);
  const res = useMemo(() => {
    if (mode === "det") {
      const g = grass(2 * n), th = i => g.gen(2 * i), ts = i => g.gen(2 * i + 1);
      let E = g.zero(); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (A[i][j]) E = g.add(E, g.scale(g.mul(ts(i), th(j)), -A[i][j]));
      const eE = g.exp(E), order = []; for (let i = 0; i < n; i++) order.push(2 * i + 1, 2 * i);
      return { I: g.integ(order, eE), terms: g.nz(eE).length, ref: detM(A), dim: g.D };
    }
    if (mode === "pf") {
      const m = 2 * n, g = grass(m); let E = g.zero();
      for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) if (A[i][j]) E = g.add(E, g.scale(g.mul(g.gen(i), g.gen(j)), A[i][j] / 2));
      const eE = g.exp(E), I = g.integ([...Array(m).keys()].reverse(), eE);
      return { I, terms: g.nz(eE).length, pf: pfDef(A), det: detM(A), dim: g.D };
    }
    const N = NB, eps = bw / N, y = -1 + eps;   // ω = 1
    const B = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => (i === j ? 1 : 0)));
    for (let i = 1; i < N; i++) B[i][i - 1] = y; if (N > 1) B[0][N - 1] = -y; else B[0][0] = 1 - y;   // N = 1：θ_1 与 θ_0 = −θ_1 合并到对角元
    const g = grass(2 * N), th = i => g.gen(2 * i), ts = i => g.gen(2 * i + 1);
    let E = g.zero(); for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (B[i][j]) E = g.add(E, g.scale(g.mul(ts(i), th(j)), -B[i][j]));
    const order = []; for (let i = 0; i < N; i++) order.push(2 * i + 1, 2 * i);
    const I = g.integ(order, g.exp(E));
    return { B, I, det: detM(B), closed: 1 + Math.pow(1 - eps, N), Z: Math.exp(bw / 2) * I, Zex: 2 * Math.cosh(bw / 2), dim: g.D };
  }, [mode, A, NB, bw]);
  // 基本规则自检：θ1θ2 = −θ2θ1，θ1² = 0，∫dθ1dθ2 θ2θ1 = 1
  const rules = useMemo(() => { const g = grass(2), a = g.mul(g.gen(0), g.gen(1)), b = g.mul(g.gen(1), g.gen(0)), sq = g.mul(g.gen(0), g.gen(0)); return { anti: a[3] === -b[3] && a[3] !== 0, nil: g.nz(sq).length === 0, int: g.integ([0, 1], b) === 1 }; }, []);
  const zSeries = [
    { label: R`\mathrm{e}^{\beta\omega/2}\det B_N`, data: Array.from({ length: 40 }, (_, k) => { const N = k + 1; return [N, Math.exp(bw / 2) * (1 + Math.pow(1 - bw / N, N))]; }), points: true, color: "#c0392b" },
    { label: R`2\cosh(\beta\omega/2)`, f: () => 2 * Math.cosh(bw / 2), color: "#1f1b16" },
  ];
  return (
    <RunCard title={R`交互图 3：Grassmann 积分——行列式、Pfaffian 与费米子配分函数`}
      lead={R`浏览器内实现了完整的 Grassmann 代数：$2^G$ 维，每个单项式按生成元编号排序，乘法按 \eqref{1.173} 记录交换符号，积分按 \eqref{1.179}–\eqref{1.180} 实现为从右到左的左导数。下面的积分都是**逐项展开 $\exp$ 再积分**真算出来的，再与行列式（Gauss 消元）、Pfaffian（按定义 \eqref{1.188} 对全部置换求和）比较。`}>
      <Seg options={[["det", "$\\int\\dd\\theta^*\\dd\\theta\\,\\mathrm{e}^{-\\theta^*M\\theta}$"], ["pf", "Pfaffian"], ["Z", "费米子配分函数"]]} value={mode} onChange={v => { setMode(v); setSeed(0); }} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "6px 0" }}>
        <Check ok={rules.anti} label={R`$\theta_1\theta_2=-\theta_2\theta_1$`} />
        <Check ok={rules.nil} label={R`$\theta_1^2=0$`} />
        <Check ok={rules.int} label={R`$\int\dd\theta_1\dd\theta_2\,\theta_2\theta_1=1$`} />
      </div>
      {mode !== "Z" && <>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <TxI>{mode === "det" ? R`矩阵阶数 $n$：` : R`矩阵阶数 $2n$：`}</TxI>
          <Seg options={(mode === "det" ? [1, 2, 3, 4] : [1, 2, 3]).map(k => [k, mode === "det" ? `$${k}$` : `$${2 * k}$`])} value={n} onChange={v => setN(v)} />
          <button style={{ cursor: "pointer" }} onClick={() => setSeed(seed + 1)}>🎲 随机整数矩阵</button>
          <button style={{ cursor: "pointer" }} onClick={() => setSeed(0)}>复原</button>
        </div>
        <Row>
          <div style={{ fontSize: 15 }}><M>{(mode === "det" ? "M=" : "a=") + matTex(A)}</M></div>
          <div style={{ flex: "1 1 280px", fontSize: 15 }}>
            {mode === "det" ? <>
              <p><TxI>{R`Grassmann 代数维数 $2^{${2 * n}}=${res.dim}$；$\mathrm{e}^{-\sum\theta_i^*M_{ij}\theta_j}$ 展开后有 $${res.terms}$ 个非零单项式。`}</TxI></p>
              <p><TxI>{R`$\displaystyle\int\dd\theta_1^*\dd\theta_1\cdots\dd\theta_n^*\dd\theta_n\,\mathrm{e}^{-\theta^*M\theta}=${fmtN(res.I)}$`}</TxI></p>
              <p><TxI>{R`Gauss 消元：$\det M=${fmtN(res.ref)}$`}</TxI></p>
            </> : <>
              <p><TxI>{R`Grassmann 代数维数 $2^{${2 * n}}=${res.dim}$；$\mathrm{e}^{\frac12\theta a\theta}$ 展开后有 $${res.terms}$ 个非零单项式。`}</TxI></p>
              <p><TxI>{R`$\displaystyle\int\dd\theta_{2n}\cdots\dd\theta_1\,\mathrm{e}^{\frac12\sum\theta_ia_{ij}\theta_j}=${fmtN(res.I)}$`}</TxI></p>
              <p><TxI>{R`按定义 \eqref{1.188}（对 $${2 * n}!$ 个置换求和）：$\operatorname{Pf}(a)=${fmtN(res.pf)}$`}</TxI></p>
              <p><TxI>{R`$\operatorname{Pf}(a)^2=${fmtN(res.pf * res.pf)}$，$\det a=${fmtN(res.det)}$`}</TxI></p>
            </>}
          </div>
        </Row>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {mode === "det" && <Check ok={Math.abs(res.I - res.ref) < 1e-9 * Math.max(1, Math.abs(res.ref))} label={R`Grassmann 积分 $=\det M$（\eqref{1.187}）`} />}
          {mode === "pf" && <Check ok={Math.abs(res.I - res.pf) < 1e-9 * Math.max(1, Math.abs(res.pf))} label={R`Grassmann 积分 $=\operatorname{Pf}(a)$`} />}
          {mode === "pf" && <Check ok={Math.abs(res.pf * res.pf - res.det) < 1e-9 * Math.max(1, Math.abs(res.det))} label={R`$\det a=\operatorname{Pf}(a)^2$（\eqref{1.189}）`} />}
        </div>
        {mode === "det" && <p className="muted" style={{ fontSize: 13 }}><TxI>{R`对比：普通（复）Gauss 积分给出 $\pi^n/\det M$（\eqref{1.153}），Grassmann 积分给出 $\det M$——行列式从分母跑到了分子。$M$ 不需要任何对称性。`}</TxI></p>}
      </>}
      {mode === "Z" && <>
        <Row gap={24}>
          <div style={{ flex: "1 1 260px" }}>
            <div><TxI>{R`时间切片数 $N$（Grassmann 生成元 $2N$ 个）：`}</TxI> <Seg options={[1, 2, 3, 4, 5].map(k => [k, String(k)])} value={NB} onChange={setNB} /></div>
            <Slider label={R`$\beta\omega$`} value={bw} min={0.1} max={4} step={0.05} onChange={setBw} fmt={v => v.toFixed(2)} />
            <p style={{ fontSize: 15 }}><M>{"B_{" + NB + "}=" + matTex(res.B)}</M></p>
          </div>
          <div style={{ flex: "1 1 280px", fontSize: 15 }}>
            <p><TxI>{R`Grassmann 积分 $\int\prod_k\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\theta^\dagger B\theta}=${f4(res.I)}$`}</TxI></p>
            <p><TxI>{R`$\det B_N=${f4(res.det)}$；公式 $1+(1-\beta\omega/N)^N=${f4(res.closed)}$`}</TxI></p>
            <p><TxI>{R`$\mathrm{e}^{\beta\omega/2}\times$积分 $=${f4(res.Z)}$；精确值 $2\cosh(\beta\omega/2)=${f4(res.Zex)}$`}</TxI></p>
          </div>
        </Row>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Check ok={Math.abs(res.I - res.det) < 1e-9} label={R`Grassmann 积分 $=\det B_N$`} />
          <Check ok={Math.abs(res.det - res.closed) < 1e-9} label={R`$\det B_N=1+(1-\beta\omega/N)^N$`} />
        </div>
        <Plot x={{ label: R`N`, domain: [1, 40] }} y={{ label: R`Z_N` }} series={zSeries} samples={80} height={260}
          caption={R`$N\to\infty$ 时 $\mathrm{e}^{\beta\omega/2}[1+(1-\beta\omega/N)^N]\to2\cosh(\beta\omega/2)$（\eqref{1.201}）。$N\le5$ 的点同时由上面的显式 Grassmann 积分核对。`} />
      </>}
    </RunCard>);
}

// ============================================================
// 4. BPST 瞬子的数值核对（g = 1）
// ============================================================
const Z2 = { re: 0, im: 0 };
const c2 = (re, im = 0) => ({ re, im });
const m2 = f => [[f(0, 0), f(0, 1)], [f(1, 0), f(1, 1)]];
const mmul = (A, B) => m2((i, j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j])));
const madd = (A, B, s = 1) => m2((i, j) => cadd(A[i][j], cmul(B[i][j], c2(s))));
const mscale = (A, z) => m2((i, j) => cmul(A[i][j], z));
const mdag = A => m2((i, j) => c2(A[j][i].re, -A[j][i].im));
const mtr = A => cadd(A[0][0], A[1][1]);
const PAULI = [[[c2(0), c2(1)], [c2(1), c2(0)]], [[c2(0), c2(0, -1)], [c2(0, 1), c2(0)]], [[c2(1), c2(0)], [c2(0), c2(-1)]]];
function Ux(x) { const r = Math.hypot(...x); let A = m2((i, j) => c2(i === j ? x[3] / r : 0)); for (let k = 0; k < 3; k++) A = madd(A, mscale(PAULI[k], c2(0, -x[k] / r))); return A; }   // (1.301b)
const HH = 1e-4;
function Avec(x, mu, lam, withI) {
  const r2 = x.reduce((s, v) => s + v * v, 0), f = r2 / (r2 + lam * lam);
  const xp = x.slice(), xm = x.slice(); xp[mu] += HH; xm[mu] -= HH;
  const dU = mscale(madd(Ux(xp), Ux(xm), -1), c2(1 / (2 * HH)));
  let A = mmul(mdag(Ux(x)), dU); if (withI) A = mscale(A, c2(0, 1));
  return mscale(A, c2(f));
}
function Fall(x, lam, withI) {
  const A = [0, 1, 2, 3].map(m => Avec(x, m, lam, withI));
  const dA = (m, n) => { const xp = x.slice(), xm = x.slice(); xp[m] += HH; xm[m] -= HH; return mscale(madd(Avec(xp, n, lam, withI), Avec(xm, n, lam, withI), -1), c2(1 / (2 * HH))); };
  const F = [0, 1, 2, 3].map(() => [0, 1, 2, 3].map(() => m2(() => Z2)));
  for (let m = 0; m < 4; m++) for (let n = m + 1; n < 4; n++) { const v = madd(madd(dA(m, n), dA(n, m), -1), madd(mmul(A[m], A[n]), mmul(A[n], A[m]), -1)); F[m][n] = v; F[n][m] = mscale(v, c2(-1)); }
  return F;
}
const eps4 = (a, b, c, d) => { const p = [a, b, c, d]; if (new Set(p).size < 4) return 0; let s = 1; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (p[i] > p[j]) s = -s; return s; };
function instantonAt(x, lam, withI) {
  const F = Fall(x, lam, withI); let sd = 0, asd = 0, fn = 0, dens = 0, qd = 0;
  for (let m = 0; m < 4; m++) for (let n = 0; n < 4; n++) {
    let st = m2(() => Z2); for (let k = 0; k < 4; k++) for (let l = 0; l < 4; l++) { const e = eps4(m, n, k, l); if (e) st = madd(st, F[k][l], 0.5 * e); }
    const d1 = madd(F[m][n], st, -1), d2 = madd(F[m][n], st, 1);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { sd = Math.max(sd, Math.hypot(d1[i][j].re, d1[i][j].im)); asd = Math.max(asd, Math.hypot(d2[i][j].re, d2[i][j].im)); fn = Math.max(fn, Math.hypot(F[m][n][i][j].re, F[m][n][i][j].im)); }
    dens += -0.5 * mtr(mmul(F[m][n], F[m][n])).re; qd += -mtr(mmul(F[m][n], st)).re / (16 * Math.PI * Math.PI);
  }
  return { sd: sd / fn, asd: asd / fn, dens, qd, F };
}
const DIR = (() => { const v = [0.3, -0.5, 0.7, 0.4], n = Math.hypot(...v); return v.map(a => a / n); })();
export function InstantonLab() {
  const [withI, setWithI] = useState(false);
  const [lam, setLam] = useState(1);
  const [r, setR] = useState(0.8);
  const res = useMemo(() => {
    const pt = instantonAt(DIR.map(a => a * r), lam, withI);
    const expect = 48 * lam ** 4 / (r * r + lam * lam) ** 4;
    // F_12 与 (1.305) 的比较：4iλ²/(r²+λ²)² σ_12，σ_12 = σ_3/2
    const k = 4 * lam * lam / (r * r + lam * lam) ** 2, F12 = pt.F[0][1];
    const pred = mscale(PAULI[2], c2(0, k / 2));
    let e12 = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) e12 = Math.max(e12, Math.hypot(F12[i][j].re - pred[i][j].re, F12[i][j].im - pred[i][j].im));
    // 沿射线的径向积分（球对称时即为全空间积分）：r = λ t/(1−t)
    const M = 120; let S = 0, Q = 0; const pts = [];
    for (let i = 0; i <= M; i++) {
      const t = i / M * 0.995, rr = lam * t / (1 - t), J = lam / (1 - t) ** 2, w = (i === 0 || i === M ? 1 : i % 2 ? 4 : 2) * (0.995 / M) / 3;
      const p = rr > 0 ? instantonAt(DIR.map(a => a * rr), lam, withI) : { dens: 0, qd: 0 };
      S += w * J * 2 * Math.PI * Math.PI * rr ** 3 * p.dens; Q += w * J * 2 * Math.PI * Math.PI * rr ** 3 * p.qd;
      if (i % 4 === 0 && rr <= 4 * lam) pts.push([rr, rr ** 3 * p.dens]);
    }
    return { ...pt, expect, e12: e12 / k, S, Q, pts };
  }, [withI, lam, r]);
  const series = [
    { label: R`r^3\cdot48\lambda^4/(r^2+\lambda^2)^4`, f: x => x ** 3 * 48 * lam ** 4 / (x * x + lam * lam) ** 4, color: "#1f1b16" },
    { label: R`r^3\cdot(-\tfrac12\Tr\mathcal{F}\mathcal{F})\ \text{数值}`, data: res.pts, points: true, color: "#c0392b" },
  ];
  return (
    <RunCard title={R`交互图 4：BPST 瞬子——自对偶、$S=8\pi^2$、$Q=1$ 的数值核对`}
      lead={R`取 $g=1$、反 Hermite 约定。在 $\mathbb{R}^4$ 中沿固定方向的点 $x=r\hat n$ 上，用有限差分从 \eqref{1.304} 的规范势真算出全部 $\mathcal{F}_{\mu\nu}$（含对易子项），再计算 $*\mathcal{F}$、作用量密度与瞬子数密度，并沿径向积分（$\mathrm{d}^4x=2\pi^2r^3\mathrm{d}r$）。切换到"原书写法"可以看到多出的 $\mathrm{i}$ 破坏了这一切。`}>
      <Row gap={24}>
        <div style={{ flex: "1 1 260px" }}>
          <Seg options={[[false, "本站：$\\mathcal{A}=fU^{-1}\\partial U$"], [true, "原书：$\\mathcal{A}=\\mathrm{i}fU^{-1}\\partial U$"]]} value={withI} onChange={setWithI} />
          <Slider label={R`瞬子大小 $\lambda$`} value={lam} min={0.5} max={2} step={0.05} onChange={setLam} fmt={v => v.toFixed(2)} />
          <Slider label={R`取样点半径 $r$`} value={r} min={0.1} max={4} step={0.05} onChange={setR} fmt={v => v.toFixed(2)} />
        </div>
        <div style={{ flex: "1 1 300px", fontSize: 15 }}>
          <p><TxI>{R`自对偶残差 $\max|\mathcal{F}-*\mathcal{F}|/\max|\mathcal{F}|=${res.sd.toExponential(1)}$`}</TxI></p>
          <p><TxI>{R`反自对偶残差 $\max|\mathcal{F}+*\mathcal{F}|/\max|\mathcal{F}|=${res.asd.toExponential(1)}$`}</TxI></p>
          <p><TxI>{R`作用量密度 $-\tfrac12\Tr\mathcal{F}_{\mu\nu}\mathcal{F}_{\mu\nu}=${f4(res.dens)}$；公式 $48\lambda^4/(r^2+\lambda^2)^4=${f4(res.expect)}$`}</TxI></p>
          <p><TxI>{R`$\mathcal{F}_{12}$ 与改正后的 \eqref{1.305} 的相对偏差：$${res.e12.toExponential(1)}$`}</TxI></p>
          <p><TxI>{R`径向积分：$S=${f4(res.S)}$（$8\pi^2=${f4(8 * Math.PI * Math.PI)}$），$Q=${f4(res.Q)}$`}</TxI></p>
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={res.sd < 1e-5} label={R`自对偶 $\mathcal{F}=*\mathcal{F}$`} />
        <Check ok={Math.abs(res.dens - res.expect) < 1e-5 * Math.max(1, res.expect)} label={R`作用量密度 $=48\lambda^4/(r^2+\lambda^2)^4$`} />
        <Check ok={res.e12 < 1e-5} label={R`$\mathcal{F}_{12}=\tfrac{4\mathrm{i}\lambda^2}{(r^2+\lambda^2)^2}\sigma_{12}$`} />
        <Check ok={Math.abs(res.S / (8 * Math.PI * Math.PI) - 1) < 2e-3 && Math.abs(res.Q - 1) < 2e-3} label={R`$S=8\pi^2$，$Q=1$`} />
      </div>
      <Plot x={{ label: R`r`, domain: [0, 4 * lam] }} y={{ label: R`r^3\,s(r)` }} series={series} samples={200} height={260}
        caption={R`径向分布 $r^3\times$ 作用量密度：在 $r\sim\lambda$ 处达到峰值。曲线下面积乘 $2\pi^2$ 即作用量。`} />
    </RunCard>);
}
