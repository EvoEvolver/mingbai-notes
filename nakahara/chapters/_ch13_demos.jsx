// 第 13 章交互图（全部在浏览器内真算）：
//  1. FujikawaLab       —— §13.2：环面 T² 上通量 N 的常磁场，Dirac 算子的 Landau 谱；Gauss 截断后 Σψ†γψ e^{−λ²/M²} 与 M 无关且 = N = ∫ch₁
//  2. DescentLab        —— §13.4.4：用精确有理数展开陈–Simons 形式 Q_{2l+1} 与下降方程的 Q¹_{2l}（命题 13.1），核对分部积分恒等式与 2/3 vs 1/2
//  3. EtaLab            —— §13.6：S¹ 上 i∂_θ + t（例 12.8）的 Pauli–Villars 虚部 Im W(M) → (π/2)η，η = 1 − 2{t}；谱流 = ½Δη + Δt
//  4. AnomalyCancelLab  —— §13.3：标准模型一代费米子的规范反常相消计算器（可改超荷）
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg, Plot } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6 };
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const f4 = v => (!Number.isFinite(v) ? "—" : Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e5 || Math.abs(v) < 1e-3 ? v.toExponential(3) : v.toFixed(4));

// ================= 有理数（小整数，精确） =================
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const Q = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
const qadd = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
const qmul = (a, b) => Q(a.n * b.n, a.d * b.d);
const qdiv = (a, b) => Q(a.n * b.d, a.d * b.n);
const qtex = (a, plus = false) => a.n === 0 ? "0" : `${a.n < 0 ? "-" : plus ? "+" : ""}${a.d === 1 ? Math.abs(a.n) : `\\tfrac{${Math.abs(a.n)}}{${a.d}}`}`;
const qval = a => a.n / a.d;
const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
const binom = (n, k) => fact(n) / (fact(k) * fact(n - k));
function parseQ(s) {
  const t = String(s).trim().replace("−", "-");
  let m = t.match(/^(-?\d+)\s*\/\s*(\d+)$/); if (m && +m[2] !== 0) return Q(+m[1], +m[2]);
  m = t.match(/^-?\d+$/); if (m) return Q(+t, 1);
  return null;
}

// ============================================================
// 1. Fujikawa 正规化：环面上的常磁场
// ============================================================
// 单位：ℏ = 1，电荷吸收进规范势。面积 A，通量 Φ = 2πN（N = ∫ch₁(𝓕) ∈ ℤ），|B| = 2π|N|/A。
// (i∇̸)² 在两个手征子空间上：主手征（sgn N）谱 {2|B|k, k≥0}，另一手征 {2|B|k, k≥1}，每个能级简并 |N|（Aharonov–Casher / Landau）。
// N = 0：自由环面 (2π/L)²(n₁²+n₂²)，两个手征相同。
function torusFree(Ar, Mreg, w) {   // N = 0 时每个手征的 Σ w(E)，E = (2π/L)²(n₁²+n₂²)
  const L = Math.sqrt(Ar), c = (2 * Math.PI / L) ** 2, nmax = Math.ceil(Math.sqrt(60 * Mreg * Mreg / c)) + 2;
  let s = 0; for (let a = -nmax; a <= nmax; a++) for (let b = -nmax; b <= nmax; b++) s += w(c * (a * a + b * b)); return s;
}
export function FujikawaLab() {
  const [N, setN] = useState(2);
  const [Ar, setAr] = useState(40);
  const [lM, setLM] = useState(0.3);           // log10 M
  const [reg, setReg] = useState("gauss");
  const Mreg = 10 ** lM, aN = Math.abs(N), sg = Math.sign(N);
  const B = 2 * Math.PI * aN / Ar;
  const w = E => reg === "sharp" ? (E <= Mreg * Mreg + 1e-12 ? 1 : 0) : Math.exp(-E / (Mreg * Mreg));
  const res = useMemo(() => {
    if (N === 0) { const s = torusFree(Ar, Mreg, w); return { big: s, small: s, nlev: null }; }
    const kmax = Math.ceil(80 * Mreg * Mreg / (2 * B)) + 5;
    let big = 0, small = 0;
    if (reg === "count") {   // 错误的"正规化"：每个手征各取同样多的模（按各自谱从低到高）
      const K = aN * (Math.floor(Mreg * Mreg / (2 * B)) + 1);   // 主手征中 E ≤ M² 的模数
      return { big: K, small: K, nlev: null, K };
    }
    for (let k = 0; k <= kmax; k++) { const E = 2 * B * k; big += aN * w(E); if (k >= 1) small += aN * w(E); }
    return { big, small };
  }, [N, Ar, Mreg, reg]);   // eslint-disable-line
  const trP = N >= 0 ? res.big : res.small, trM = N >= 0 ? res.small : res.big;
  const trG = trP - trM;
  // Gauss 截断的闭式与渐近式
  const x = 2 * B / (Mreg * Mreg);
  const closedBig = N === 0 ? NaN : aN / (-Math.expm1(-x)), closedSmall = N === 0 ? NaN : aN / Math.expm1(x);
  const asym = Ar * Mreg * Mreg / (4 * Math.PI);
  // 谱图：i∇̸ 的本征值 ±√(2|B|k)
  const Lam = 3.2 * Mreg, W = 640, H = 210, padL = 40, padR = 14, base = 170;
  const sx = l => padL + (l + Lam) / (2 * Lam) * (W - padL - padR);
  const stems = [];
  if (N !== 0) {
    for (let k = 1; k < 4000; k++) { const l = Math.sqrt(2 * B * k); if (l > Lam) break; stems.push({ l, k }); }
  }
  const wt = l => reg === "gauss" ? Math.exp(-l * l / (Mreg * Mreg)) : reg === "sharp" ? (l <= Mreg ? 1 : 0) : 1;
  const hh = 120;
  const series = () => {
    if (N === 0) return [{ label: R`\mathrm{Tr}\,\gamma\,\mathrm{e}^{-(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})^2/M^2}`, f: () => 0, color: RED }];
    const tp = m => { const xx = 2 * B / (m * m); return N > 0 ? aN / (-Math.expm1(-xx)) : aN / Math.expm1(xx); };
    const tm = m => { const xx = 2 * B / (m * m); return N > 0 ? aN / Math.expm1(xx) : aN / (-Math.expm1(-xx)); };
    return [
      { label: R`\mathrm{Tr}_+-\tfrac{AM^2}{4\pi}`, f: m => tp(m) - Ar * m * m / (4 * Math.PI), color: BLUE },
      { label: R`\mathrm{Tr}_--\tfrac{AM^2}{4\pi}`, f: m => tm(m) - Ar * m * m / (4 * Math.PI), color: GOLD },
      { label: R`\mathrm{Tr}_+-\mathrm{Tr}_-`, f: m => tp(m) - tm(m), color: RED },
    ];
  };
  return (
    <RunCard title={R`交互图 1：Fujikawa 正规化——环面上的常磁场`}
      lead={R`在面积为 $A$ 的二维环面上放磁通 $\Phi=2\pi N$ 的均匀磁场（$N=\int\mathrm{ch}_1(\mathcal{F})\in\Z$）。$(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})^2$ 在两个手征子空间上的谱是 Landau 能级：一个手征为 $\{0,2|B|,4|B|,\ldots\}$，另一个为 $\{2|B|,4|B|,\ldots\}$，每级简并 $|N|$。于是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的非零本征值 $\pm\sqrt{2|B|k}$ 成对出现，零模有 $|N|$ 个、手征为 $\mathrm{sgn}\,N$。下面计算 \eqref{13.26} 的二维版本 $\sum_i\psi_i^\dagger\gamma^3\psi_i\,w(\lambda_i)=\mathrm{Tr}_+w-\mathrm{Tr}_-w$，看它怎样与 $M$ 无关地等于 $N$（记 $x=2|B|/M^2$）。`}>
      <Row gap={24}>
        <Slider label={R`磁通量子数 $N$`} value={N} min={-4} max={4} step={1} onChange={setN} />
        <Slider label={R`面积 $A$`} value={Ar} min={10} max={120} step={1} onChange={setAr} />
        <Slider label={R`截断 $M$`} value={lM} min={-1} max={1.4} step={0.01} onChange={setLM} fmt={() => Mreg.toFixed(3)} />
      </Row>
      <div><TxI>{R`正规化方式：`}</TxI><Seg options={[["gauss", R`Gauss $\mathrm{e}^{-\lambda^2/M^2}$`], ["sharp", R`硬截断 $|\lambda|\le M$`], ["count", R`每个手征各取同样多的模（错误）`]]} value={reg} onChange={setReg} /></div>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
        <line x1={padL} y1={base} x2={W - padR} y2={base} stroke={INK} />
        <line x1={sx(0)} y1={base} x2={sx(0)} y2={base - hh - 12} stroke={GRAY} strokeDasharray="3 3" />
        {[-Mreg, Mreg].map((v, i) => <line key={i} x1={sx(v)} y1={base + 4} x2={sx(v)} y2={base - hh - 6} stroke={GREEN} strokeDasharray="5 4" />)}
        {reg !== "count" && Array.from({ length: 121 }, (_, i) => -Lam + 2 * Lam * i / 120).map((l, i, arr) => i > 0 &&
          <line key={i} x1={sx(arr[i - 1])} y1={base - hh * wt(arr[i - 1])} x2={sx(l)} y2={base - hh * wt(l)} stroke={GREEN} strokeWidth="1.2" opacity="0.6" />)}
        {stems.map(({ l, k }) => [l, -l].map((v, j) => <g key={k + "_" + j}>
          <line x1={sx(v)} y1={base} x2={sx(v)} y2={base - hh * wt(l)} stroke={GRAY} strokeWidth="2" />
          <circle cx={sx(v)} cy={base - hh * wt(l)} r="2.6" fill={GRAY} /></g>))}
        {N !== 0 && <g><line x1={sx(0)} y1={base} x2={sx(0)} y2={base - hh} stroke={N > 0 ? BLUE : GOLD} strokeWidth="4" />
          <text x={sx(0) + 6} y={base - hh + 4} fontSize="12" fill={N > 0 ? BLUE : GOLD}>零模 ×{aN}（手征 {N > 0 ? "+" : "−"}）</text></g>}
        <text x={sx(Mreg) + 3} y={base - hh - 8} fontSize="11" fill={GREEN}>M</text>
        <text x={padL} y={H - 8} fontSize="11" fill={GRAY}>横轴：Dirac 算子的本征值 λ（灰：非零模，±λ 各 |N| 重，⟨ψ|γ|ψ⟩=0）；纵轴：权重 w(λ)；绿线：w 的形状</text>
        <text x={W - padR} y={base + 16} fontSize="11" fill={GRAY} textAnchor="end">λ = ±{f4(Lam)}</text>
      </svg>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`$\mathrm{Tr}_+w$（正手征）`}</TxI></td><td>{f4(trP)}</td><td>{reg === "gauss" && N !== 0 ? <TxI>{R`闭式 $\,${N > 0 ? R`|N|/(1-\mathrm{e}^{-x})` : R`|N|\mathrm{e}^{-x}/(1-\mathrm{e}^{-x})`}$ = ${f4(N > 0 ? closedBig : closedSmall)}`}</TxI> : reg === "count" ? `前 ${res.K} 个模` : ""}</td></tr>
          <tr><td><TxI>{R`$\mathrm{Tr}_-w$（负手征）`}</TxI></td><td>{f4(trM)}</td><td>{reg === "gauss" && N !== 0 ? <TxI>{R`闭式 = ${f4(N > 0 ? closedSmall : closedBig)}`}</TxI> : reg === "count" ? `前 ${res.K} 个模` : ""}</td></tr>
          <tr><td><TxI>{R`渐近 $\frac{AM^2}{4\pi}$（热核首项）`}</TxI></td><td>{f4(asym)}</td><td><TxI>{R`$\mathrm{Tr}_\pm\approx\frac{AM^2}{4\pi}\pm\frac N2+O(M^{-2})$：各自发散`}</TxI></td></tr>
          <tr><td><TxI>{R`$\int\boldsymbol A=\mathrm{Tr}_+w-\mathrm{Tr}_-w$`}</TxI></td><td><b>{f4(trG)}</b></td><td><TxI>{reg === "count" ? R`手征各取等量模：结果恒为 0，反常"消失"了——这种截断不是用 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 构造的，不规范协变` : R`= 指标 $\nu_+-\nu_-$，与 $M$、$A$ 无关`}</TxI></td></tr>
          <tr><td><TxI>{R`$\int\mathrm{ch}_1(\mathcal{F})=\frac{\mathrm{i}}{2\pi}\int\mathcal{F}$`}</TxI></td><td>{N}</td><td><TxI>{R`\eqref{13.35} 取 $l=1$`}</TxI></td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={reg === "count" ? Math.abs(trG) < 1e-9 : Math.abs(trG - N) < 1e-8} label={reg === "count" ? R`错误截断给出 $0\neq N$（预期如此）` : R`$\mathrm{Tr}_+-\mathrm{Tr}_-=N$（对当前 $M$）`} />
        {reg === "gauss" && N !== 0 && <Check ok={Math.abs(trP - (N > 0 ? closedBig : closedSmall)) < 1e-6 * Math.max(1, trP)} label="数值求和 = 闭式" />}
        {reg === "gauss" && N !== 0 && Mreg > 3 && <Check ok={Math.abs(trP - asym - N / 2) < 0.05 * aN + 1e-6} label={R`$\mathrm{Tr}_+-\frac{AM^2}{4\pi}\approx\frac N2$`} />}
      </div>
      <Plot x={{ label: R`M`, log: true, domain: [0.1, 25] }} y={{ label: R`\text{迹（减去 }AM^2/4\pi\text{）}` }} series={series}
        vlines={[{ x: Mreg, label: R`M` }]} height={300}
        caption={R`Gauss 截断（闭式）：减去发散的面积项 $AM^2/4\pi$ 后，$\mathrm{Tr}_\pm$ 在大 $M$ 时趋于 $\pm N/2$（热核系数 $a_1=\pm\frac1{4\pi}\int B$）；二者之差（红线）对所有 $M$ 严格等于 $N$。小 $M$ 时只有零模存活，$\mathrm{Tr}_+-\mathrm{Tr}_-$ 仍是 $N$——这就是 \eqref{13.28} 推导中"非零模成对抵消"的含义。`} />
    </RunCard>);
}

// ============================================================
// 2. 下降方程：陈–Simons 形式与 Q¹_{2l} 的系数
// ============================================================
export function DescentLab() {
  const [l, setL] = useState(2);
  const data = useMemo(() => {
    // Q_{2l+1} = (i/2π)^{l+1} (1/l!) Σ_k C(l,k) ∫ t^{l+k} dt · str(A (dA)^{l−k} (A²)^k)
    const cs = []; for (let k = 0; k <= l; k++) cs.push(Q(binom(l, k), (l + k + 1) * fact(l)));
    // Q¹_{2l} = (i/2π)^{l+1} (1/(l−1)!) Σ_k C(l−1,k) ∫(1−t) t^{l+k} … wait: A F_t^{l−1} → t^{(l−1−k)+2k} · t? (A 本身无 t)
    //   A F_t^{l−1}: F_t^{l−1} 的项 C(l−1,k) t^{l−1−k} t^{2k} (dA)^{l−1−k}(A²)^k，∫(1−t) t^{l−1+k} dt = 1/((l+k)(l+k+1))
    const an = []; for (let k = 0; k <= l - 1; k++) an.push(qdiv(Q(binom(l - 1, k), 1), Q((l + k) * (l + k + 1) * fact(l - 1), 1)));
    // 分部积分恒等式：∫[t^{l+k} + (t−1)(l+k) t^{l+k−1}] dt = 1/(l+k+1) + (l+k)/(l+k+1) − 1 = 0
    const ibp = []; for (let k = 0; k <= l; k++) { const p = l + k; const v = qadd(qadd(Q(1, p + 1), Q(p, p + 1)), Q(-1, 1)); ibp.push({ k, p, v }); }
    return { cs, an, ibp };
  }, [l]);
  // 单项式 A (dA)^a (A²)^k（在 str 下次序已对称化）；a = 0 时合并为 A^{2k+1}
  const mono = (a, k) => a === 0 ? (k === 0 ? "A" : `A^{${2 * k + 1}}`) : `A\\,${a === 1 ? "\\dd A" : `(\\dd A)^{${a}}`}${k === 0 ? "" : k === 1 ? "\\,A^2" : `\\,A^{${2 * k}}`}`;
  const term = (rel, k, m) => (k === 0 ? "" : rel.n < 0 ? "-" : "+") + (Math.abs(rel.n) === 1 && rel.d === 1 ? "" : qtex(Q(Math.abs(rel.n), rel.d))) + m;
  const csTex = data.cs.map((c, k) => term(qdiv(c, data.cs[0]), k, mono(l - k, k))).join("");
  const anTex = data.an.map((c, k) => term(qdiv(c, data.an[0]), k, mono(l - 1 - k, k))).join("");
  // 2l 维一致反常的整体系数 2πi (i/2π)^{l+1} c₀，c₀ = 1/((l−1)! l (l+1)) → i^{l+2} / ((2π)^l (l+1)!)
  const ph = ["1", "\\mathrm{i}", "-1", "-\\mathrm{i}"][(l + 2) % 4];
  const coefAn = `${ph === "1" ? "" : ph === "-1" ? "-" : ph}\\frac{1}{${(l + 1) === 1 ? "" : fact(l + 1) + "\\cdot"}(2\\pi)^{${l}}}`;
  const numAn = 1 / (fact(l + 1) * (2 * Math.PI) ** l);
  return (
    <RunCard title={R`交互图 2：下降方程——$\frac23$ 与 $\frac12$ 从哪里来`}
      lead={R`选定 $l$（时空维数 $m=2l$）。上面一行是 $\mathrm{ch}_{l+1}$ 的陈–Simons 形式 $Q_{2l+1}=\frac1{l!}(\frac{\mathrm{i}}{2\pi})^{l+1}\int_0^1\mathrm{str}(A\mathcal{F}_t^{\,l})\dd t$（式 (11.105)），下面一行是命题 13.1 的 $Q^1_{2l}=\frac1{(l-1)!}(\frac{\mathrm{i}}{2\pi})^{l+1}\int_0^1(1-t)\,\mathrm{str}[\omega\,\dd(A\mathcal{F}_t^{\,l-1})]\dd t$。把 $\mathcal{F}_t=t\,\dd A+t^2A^2$ 按二项式展开，逐项做 $t$ 积分（精确分数），并核对证明中的分部积分恒等式。`}>
      <div><TxI>{R`半维数 $l$：`}</TxI><Seg options={[[1, R`$l=1$（2 维）`], [2, R`$l=2$（4 维）`], [3, R`$l=3$（6 维）`], [4, R`$l=4$（8 维）`]]} value={l} onChange={setL} /></div>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>对象</th><th><TxI>{R`逐项系数（$t$ 积分）`}</TxI></th><th>归一化到首项</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`陈–Simons $Q_{2l+1}$`}</TxI></td>
            <td><M>{data.cs.map((c, k) => `\\int_0^1 \\tbinom{${l}}{${k}}t^{${l + k}}\\tfrac{\\dd t}{${l}!}=${qtex(c)}`).join(",\\ ")}</M></td>
            <td><M>{`\\mathrm{str}\\big(${csTex}\\big)`}</M></td></tr>
          <tr><td><TxI>{R`一致反常 $Q^1_{2l}$`}</TxI></td>
            <td><M>{data.an.map((c, k) => `\\int_0^1 \\tbinom{${l - 1}}{${k}}(1-t)t^{${l - 1 + k}}\\tfrac{\\dd t}{${l - 1}!}=${qtex(c)}`).join(",\\ ")}</M></td>
            <td><M>{`\\mathrm{str}\\big[\\omega\\,\\dd\\big(${anTex}\\big)\\big]`}</M></td></tr>
          <tr><td><TxI>{R`$2l$ 维阿贝尔反常（$\mathrm{ch}_l$ 的 CS 首项）`}</TxI></td>
            <td colSpan={2}><TxI>{l === 1 ? R`$\mathrm{ch}_1=\frac{\mathrm{i}}{2\pi}\Tr\dd A$：没有非线性项` : R`对照上一行取 $l\to l-1$ 的陈–Simons 系数：三次项 $\frac23$（$l=2$ 时即 \eqref{13.5}、\eqref{13.33}）`}</TxI></td></tr>
          <tr><td><TxI>{R`$2\pi\mathrm{i}\,Q^1_{2l}$ 的整体系数`}</TxI></td>
            <td><M>{`2\\pi\\mathrm{i}\\cdot\\Big(\\frac{\\mathrm{i}}{2\\pi}\\Big)^{${l + 1}}\\cdot${qtex(data.an[0])}=${coefAn}`}</M></td>
            <td><TxI>{l === 2 ? R`$=\frac1{24\pi^2}$：与 \eqref{13.56}、\eqref{13.104} 一致` : l === 1 ? R`$=-\frac{\mathrm{i}}{4\pi}$：二维一致反常（见 \eqref{13.83a} 勘误）` : `数值 |·| = ${numAn.toExponential(4)}`}</TxI></td></tr>
          <tr><td><TxI>{R`$\mathrm{ch}_{l+1}$ 的归一化`}</TxI></td><td colSpan={2}><M>{`\\mathrm{ch}_{${l + 1}}=\\frac{1}{${fact(l + 1)}}\\Tr\\Big(\\frac{\\mathrm{i}F}{2\\pi}\\Big)^{${l + 1}}`}</M></td></tr>
        </tbody>
      </table></div>
      <div style={{ fontSize: 14 }}><TxI>{R`命题 13.1 证明中的分部积分：$\int_0^1[t^{p}+(t-1)\,p\,t^{p-1}]\dd t=\frac1{p+1}+\frac{p}{p+1}-1$，对 $\mathcal{F}^l_t$ 展开中出现的每个幂次 $p=l+k$ 都应为 0：`}</TxI></div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {data.ibp.map(({ k, p, v }) => <Check key={k} ok={v.n === 0} label={R`$p=${p}$：$${qtex(Q(1, p + 1))}+${qtex(Q(p, p + 1))}-1=${qtex(v)}$`} />)}
        {l === 1 && <Check ok={data.an[0].n === 1 && data.an[0].d === 2} label={R`$Q^1_2$ 的系数为 $\frac12$（\eqref{13.83a} 改正）`} />}
        {l === 2 && <Check ok={qval(qdiv(data.an[1], data.an[0])) === 0.5} label={R`$Q^1_4\propto A\dd A+\frac12A^3$（\eqref{13.83b}）`} />}
        {l === 1 && <Check ok={qval(qdiv(data.cs[1], data.cs[0])) === 2 / 3} label={R`$Q_3\propto A\dd A+\frac23A^3$（陈–Simons）`} />}
        {l === 2 && <Check ok={Math.abs(numAn - 1 / (24 * Math.PI ** 2)) < 1e-15} label={R`$2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3=\frac1{24\pi^2}$`} />}
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：两行的差别只在 $t$ 积分的权重——陈–Simons 用 $1$，下降方程用 $(1-t)$。$l=1$ 时上一行给出 $Q_3\propto A\dd A+\frac23A^3$（阿贝尔反常 \eqref{13.5} 的 $\frac23$），$l=2$ 时下一行给出 $\omega\,\dd(A\dd A+\frac12A^3)$（非阿贝尔反常 \eqref{13.9} 的 $\frac12$）。四维的阿贝尔反常来自 $\mathrm{ch}_2$（$l=1$ 的上一行），四维的非阿贝尔反常来自六维的 $\mathrm{ch}_3$（$l=2$ 的下一行）——"高两维"由此而来。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. η 不变量与 Pauli–Villars：S¹ 上的 i∂_θ + t（例 12.8）
// ============================================================
// 本征函数 e^{inθ}，本征值 λ_n = t − n。∏(λ_n + iM)/λ_n = sin π(t+iM) / sin πt ⇒ Im W = arg = atan(cot(πt) tanh(πM))。
const frac = t => t - Math.floor(t);
const etaExact = t => { const f = frac(t); return f < 1e-12 ? 0 : 1 - 2 * f; };   // 整数 t 处有零模，按 (13.111) 略去零模后 η = 0（左右极限 ∓1 的平均）
const imW = (t, Mm) => { const s = Math.sin(Math.PI * t); if (Math.abs(s) < 1e-14) return 0; return Math.atan(Math.cos(Math.PI * t) / s * Math.tanh(Math.PI * Mm)); };
function imWsum(t, Mm, K) { let s = 0; for (let n = -K; n <= K; n++) { const l = t - n; if (Math.abs(l) > 1e-14) s += Math.atan(Mm / l); } return s; }
export function EtaLab() {
  const [t, setT] = useState(0.3);
  const [lM, setLM] = useState(0.5);
  const [t0] = useState(0.5);
  const Mm = 10 ** lM, K = 20000;
  const ps = useMemo(() => imWsum(t, Mm, K), [t, Mm]);
  const cf = imW(t, Mm), eta = etaExact(t);
  const sf = Math.floor(t) - Math.floor(t0);           // 从 t0 到 t 穿过零的本征值净数（λ_n = t − n 由负变正）
  const dEta = etaExact(t) - etaExact(t0);
  // 谱条
  const W = 640, H = 120, cx = W / 2, sc = 60;
  const lams = []; for (let n = Math.floor(t) - 6; n <= Math.floor(t) + 6; n++) lams.push(t - n);
  return (
    <RunCard title={R`交互图 3：宇称反常与 $\eta$ 不变量——$S^1$ 上的 $\mathrm{i}\partial_\theta+t$`}
      lead={R`取 §12.8 例 12.8 的算子 $\mathrm{i}\nabla_t=\mathrm{i}\partial_\theta+t$（$\theta\in S^1$），本征函数 $\mathrm{e}^{\mathrm{i}n\theta}$，本征值 $\lambda_n=t-n$。Pauli–Villars：$\mathrm{Im}\,W=\sum_n\tan^{-1}(M/\lambda_n)$（\eqref{13.110}）。由 $\prod_n\frac{\lambda_n+\mathrm{i}M}{\lambda_n}=\frac{\sin\pi(t+\mathrm{i}M)}{\sin\pi t}$ 得闭式 $\mathrm{Im}\,W=\tan^{-1}[\cot(\pi t)\tanh(\pi M)]$，$M\to\infty$ 时趋于 $\frac\pi2(1-2\{t\})=\frac\pi2\eta$（$\{t\}$ 为小数部分）。$t\to t+1$ 是大规范变换 $\mathrm{e}^{\mathrm{i}\theta}$：谱不变、$\eta$ 不变，但中途有一个本征值穿过零——谱流。`}>
      <Row gap={24}>
        <Slider label={R`$t$`} value={t} min={-1.2} max={2.2} step={0.005} onChange={setT} fmt={v => v.toFixed(3)} />
        <Slider label={R`Pauli–Villars 质量 $M$`} value={lM} min={-1} max={1.3} step={0.01} onChange={setLM} fmt={() => Mm.toFixed(3)} />
      </Row>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
        <line x1={20} y1={70} x2={W - 20} y2={70} stroke={INK} />
        <line x1={cx} y1={20} x2={cx} y2={100} stroke={GRAY} strokeDasharray="3 3" />
        <text x={cx + 4} y={30} fontSize="11" fill={GRAY}>λ = 0</text>
        {lams.map((l, i) => { const X = cx + sc * l; if (X < 20 || X > W - 20) return null; const a = Math.abs(l) < 1e-12 ? 0 : Math.atan(Mm / l) / (Math.PI / 2);
          return <g key={i}><line x1={X} y1={70} x2={X} y2={70 - 40 * a} stroke={l > 0 ? BLUE : l < 0 ? RED : INK} strokeWidth="3" />
            <circle cx={X} cy={70} r="4" fill={l > 0 ? BLUE : l < 0 ? RED : INK} /></g>; })}
        <text x={20} y={H - 6} fontSize="11" fill={GRAY}>圆点：本征值 λ_n = t − n（蓝正、红负）；竖条：tan⁻¹(M/λ_n)/(π/2)，M→∞ 时变成 ±1</text>
      </svg>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`$\sum_{|n|\le K}\tan^{-1}(M/\lambda_n)$，$K=2\times10^4$`}</TxI></td><td>{f4(ps)}</td><td>直接对本征值求和（截尾误差约 M/K）</td></tr>
          <tr><td><TxI>{R`闭式 $\tan^{-1}[\cot(\pi t)\tanh(\pi M)]$`}</TxI></td><td>{f4(cf)}</td><td><TxI>{R`$=\arg\frac{\sin\pi(t+\mathrm{i}M)}{\sin\pi t}$`}</TxI></td></tr>
          <tr><td><TxI>{R`$\frac\pi2\eta$，$\eta=1-2\{t\}$`}</TxI></td><td>{f4(Math.PI / 2 * eta)}</td><td><TxI>{R`$\zeta$ 正规化 \eqref{13.111}：$\eta=\zeta_H(0,\{t\})-\zeta_H(0,1-\{t\})$`}</TxI></td></tr>
          <tr><td><TxI>{R`$\frac2\pi\mathrm{Im}\,W$ 与 $\eta$ 之差`}</TxI></td><td>{f4(2 / Math.PI * cf - eta)}</td><td><TxI>{R`$\to0$（$M\to\infty$）；有限 $M$ 时是光滑化的锯齿`}</TxI></td></tr>
          <tr><td><TxI>{R`从 $t_0=0.5$ 到 $t$ 的谱流 SF`}</TxI></td><td>{sf}</td><td><TxI>{R`本征值由负变正的净个数（在整数 $t$ 处穿过零）`}</TxI></td></tr>
          <tr><td><TxI>{R`$\frac12\Delta\eta+\Delta t$`}</TxI></td><td>{f4(dEta / 2 + (t - t0))}</td><td><TxI>{R`APS 型恒等式：谱流 $=\frac12\Delta\eta+$ 局部项（这里局部项 $=\frac1{2\pi}\oint\Delta\mathcal{A}_\theta\,\dd\theta=\Delta t$）`}</TxI></td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(ps - cf) < 3 * Mm / K + 1e-9} label="本征值求和 = 闭式" />
        {Mm > 5 && Math.abs(frac(t)) > 0.02 && Math.abs(frac(t) - 1) > 0.02 && <Check ok={Math.abs(cf - Math.PI / 2 * eta) < 1e-3} label={R`$\mathrm{Im}\,W\approx\frac\pi2\eta$（大 $M$）`} />}
        {Math.abs(frac(t)) > 1e-9 && <Check ok={Math.abs(dEta / 2 + (t - t0) - sf) < 1e-9} label={R`$\mathrm{SF}=\frac12\Delta\eta+\Delta t$`} />}
      </div>
      <Plot x={{ label: R`t`, domain: [-1.2, 2.2] }} y={{ label: R`\eta`, domain: [-1.25, 1.25] }} samples={700}
        series={() => [
          { label: R`\eta(t)=1-2\{t\}`, f: tt => (Math.abs(frac(tt)) < 2e-3 || Math.abs(frac(tt) - 1) < 2e-3 ? NaN : etaExact(tt)), color: INK },
          { label: R`\tfrac2\pi\mathrm{Im}\,W(t;M)`, f: tt => 2 / Math.PI * imW(tt, Mm), color: RED },
        ]}
        vlines={[{ x: t, label: R`t` }]} height={280}
        caption={R`黑：$\zeta$ 正规化的 $\eta$（锯齿，在整数 $t$ 处一个本征值穿过零，$\eta$ 跳 2）；红：当前 $M$ 下 Pauli–Villars 给出的 $\frac2\pi\mathrm{Im}\,W$。$M$ 越大，红线越贴近锯齿。$t$ 与 $t+1$ 规范等价（谱相同、$\eta$ 相同），但从 $t$ 走到 $t+1$ 谱流为 1——\eqref{13.119} 的一维缩影。`} />
    </RunCard>);
}

// ============================================================
// 4. 标准模型一代费米子的反常相消
// ============================================================
// 全部写成左手 Weyl 场：c3 = SU(3) 表示（1, 3, -3 表示 3̄），d2 = SU(2) 维数（1 或 2），Y = 超荷
const SM = [
  { id: "Q", name: R`\sym{smQ}{Q}`, c3: 3, d2: 2, Y: "1/6" },
  { id: "uc", name: R`\sym{smu}{u}^c`, c3: -3, d2: 1, Y: "-2/3" },
  { id: "dc", name: R`\sym{smd}{d}^c`, c3: -3, d2: 1, Y: "1/3" },
  { id: "L", name: R`\sym{smL}{L}`, c3: 1, d2: 2, Y: "-1/2" },
  { id: "ec", name: R`\sym{sme}{e}^c`, c3: 1, d2: 1, Y: "1" },
];
const NUC = { id: "nc", name: R`\sym{smnu}{\nu}^c`, c3: 1, d2: 1, Y: "0" };
const PRESETS = {
  sm: () => SM.map(f => ({ ...f, on: true })),
  nu: () => [...SM, NUC].map(f => ({ ...f, on: true })),
  quarks: () => SM.map(f => ({ ...f, on: ["Q", "uc", "dc"].includes(f.id) })),
  leptons: () => SM.map(f => ({ ...f, on: ["L", "ec"].includes(f.id) })),
  scale: () => SM.map(f => { const q = parseQ(f.Y); return { ...f, on: true, Y: qtex(qmul(q, Q(6))).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, "$1/$2") }; }),
  bad: () => SM.map(f => ({ ...f, on: true, Y: f.id === "Q" ? "1/3" : f.Y })),
};
export function AnomalyCancelLab() {
  const [fs, setFs] = useState(PRESETS.sm());
  const [preset, setPreset] = useState("sm");
  const apply = k => { setPreset(k); setFs(PRESETS[k]()); };
  const rows = fs.map(f => {
    const y = parseQ(f.Y), d3 = Math.abs(f.c3), col = d3 === 3;
    const A3 = f.c3 === 3 ? 1 : f.c3 === -3 ? -1 : 0;           // SU(3) 三次 Casimir 指标 A(3)=1, A(3̄)=−1
    const T3 = col ? Q(1, 2) : Q(0), T2 = f.d2 === 2 ? Q(1, 2) : Q(0);
    const mult = d3 * f.d2;
    if (!y) return { ...f, bad: true };
    return { ...f, y, mult,
      c333: Q(A3 * f.d2), c33Y: qmul(qmul(T3, Q(f.d2)), y), c22Y: qmul(qmul(T2, Q(d3)), y),
      cYYY: qmul(Q(mult), qmul(y, qmul(y, y))), cgrav: qmul(Q(mult), y), dbl: f.d2 === 2 ? d3 : 0 };
  });
  const ok = rows.every(r => !r.bad);
  const sum = key => rows.filter(r => r.on && !r.bad).reduce((a, r) => qadd(a, r[key]), Q(0));
  const S = ok ? { c333: sum("c333"), c33Y: sum("c33Y"), c22Y: sum("c22Y"), cYYY: sum("cYYY"), cgrav: sum("cgrav") } : null;
  const nd = rows.filter(r => r.on && !r.bad).reduce((a, r) => a + r.dbl, 0);
  const cols = [["c333", R`[\mathrm{SU}(3)]^3`, R`\sum A(\boldsymbol r_3)\dim\boldsymbol r_2`], ["c33Y", R`[\mathrm{SU}(3)]^2\mathrm{U}(1)`, R`\sum T(\boldsymbol r_3)\dim\boldsymbol r_2\,Y`],
    ["c22Y", R`[\mathrm{SU}(2)]^2\mathrm{U}(1)`, R`\sum T(\boldsymbol r_2)\dim\boldsymbol r_3\,Y`], ["cYYY", R`[\mathrm{U}(1)]^3`, R`\sum\dim\cdot Y^3`], ["cgrav", R`\text{引力}^2\mathrm{U}(1)`, R`\sum\dim\cdot Y`]];
  const setY = (i, v) => { setPreset(""); setFs(fs.map((f, j) => j === i ? { ...f, Y: v } : f)); };
  const toggle = i => { setPreset(""); setFs(fs.map((f, j) => j === i ? { ...f, on: !f.on } : f)); };
  return (
    <RunCard title={R`交互图 4：标准模型一代费米子的反常相消`}
      lead={R`每一代费米子全部写成左手 Weyl 场。对每个场计算它对各类三角反常（$d_{\alpha\beta\gamma}$ 的独立分量）的贡献：$[\mathrm{SU}(3)]^3$ 用三次指标 $A(\boldsymbol3)=1$、$A(\bar{\boldsymbol3})=-1$；混合反常用二次指标 $T(\boldsymbol3)=T(\boldsymbol2)=\frac12$；$[\mathrm{U}(1)]^3$ 与引力反常数分量。超荷可直接编辑（格式 a/b），也可勾掉某些场。`}>
      <div><TxI>{R`预设：`}</TxI><Seg options={[["sm", "标准模型一代"], ["nu", R`加 $\nu^c$（$Y=0$）`], ["quarks", "只有夸克"], ["leptons", "只有轻子"], ["scale", R`$Y\to6Y$`], ["bad", R`改 $Y_Q=\frac13$`]]} value={preset} onChange={apply} /></div>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>计入</th><th>场</th><th><TxI>{R`$(\mathrm{SU}(3),\mathrm{SU}(2))$`}</TxI></th><th>Y</th>{cols.map(([k, t]) => <th key={k}><M>{t}</M></th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => <tr key={r.id} style={{ opacity: r.on ? 1 : 0.4 }}>
            <td><input type="checkbox" checked={r.on} onChange={() => toggle(i)} /></td>
            <td><M>{r.name}</M></td>
            <td><M>{`(${r.c3 === -3 ? "\\bar{\\boldsymbol3}" : "\\boldsymbol" + Math.abs(r.c3)},\\boldsymbol${r.d2})`}</M></td>
            <td><input value={r.Y} onChange={e => setY(i, e.target.value)} style={{ width: 52, fontFamily: "inherit", border: r.bad ? "1px solid " + RED : "1px solid #ccc" }} /></td>
            {cols.map(([k]) => <td key={k}>{r.bad ? "?" : <M>{qtex(r[k])}</M>}</td>)}
          </tr>)}
          {S && <tr style={{ fontWeight: 600, borderTop: "2px solid #888" }}><td></td><td>合计</td><td></td><td></td>
            {cols.map(([k]) => <td key={k} style={{ color: S[k].n === 0 ? GREEN : RED }}><M>{qtex(S[k])}</M></td>)}</tr>}
        </tbody>
      </table></div>
      {!ok && <p style={{ color: RED }}>有超荷无法解析，请输入整数或 a/b。</p>}
      {S && <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {cols.map(([k, t, f]) => <Check key={k} ok={S[k].n === 0} label={R`$${t}$：$${f}=${qtex(S[k])}$`} />)}
        <Check ok={nd % 2 === 0} label={R`Witten $\mathrm{SU}(2)$ 整体反常：二重态（计颜色）个数 $=${nd}$ 为偶数`} />
      </div>}
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：只保留夸克或只保留轻子，$[\mathrm{SU}(2)]^2\mathrm{U}(1)$、$[\mathrm{U}(1)]^3$ 与引力项都不为零——两者的反常彼此抵消，所以一代中夸克与轻子必须成套出现（$[\mathrm{SU}(2)]^2\mathrm{U}(1)$：$3\cdot\frac16+(-\frac12)=0$ 把夸克与轻子超荷锁定为 $Y_L=-3Y_Q$）。把所有 $Y$ 乘同一个数不影响相消（各条件对 $Y$ 齐次）；加入 $Y=0$ 的 $\nu^c$ 也不影响。在给定的表示内容下（不含 $\nu^c$），这些条件（差一个整体归一化）基本上唯一地确定了观测到的超荷，从而 $Q=T_3+Y$ 给出分数电荷 $\frac23,-\frac13$。`}</TxI></p>
    </RunCard>);
}
