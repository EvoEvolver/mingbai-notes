// 第 II 章补充材料的交互图。数值核心在 _ch02c_num.js（纯 JS；已复制为 .mjs 用 node 核对）：
// · C_II：改正后的 R^{(1/2)}(α,β,γ) 与 e^{-iασz/2}e^{-iβσy/2}e^{-iγσz/2} 在 50 组随机角下一致到 5e-16，U†U−1 ~ 1e-16；
//   原书左下角印法的 ‖U†U−1‖ 最大 1.41（不幺正）。R(θ) 列正交归一精确成立；标积 ⟨ψ1|ψ2⟩ 与模方在新旧基中相同（差 < 1e-15）。
// · B_II：Heisenberg 型 3×3 矩阵对 Glauber 公式偏差 0（精确到浮点）；Pauli 型 t = 0.5、1、2 时 ‖eᴬeᴮ − e^{A+B}e^{[A,B]/2}‖ = 0.24、1.47、0.87。
//   习题 6：e^{iασx} 数值与 cos α I + i sin α σx 一致到 1e-15。
// · E_II：N = 1024、L = 40 的 FFT 实现 S(λ)ψ 与解析 ψ(q−λ) 的最大偏差 ≤ 1.5e-14（三种波函数 × λ = 1.37、−3.2、7.5），
//   模方保持到 1e-6 显示位，⟨Q⟩ 精确增加 λ；P 的谱实现与解析 (k₀ + iq)ψ 一致到 5e-14。Taylor 截断 λ = 1.37 时 N = 30 达 1e-13。
// · F_II：偶奇分解 ⟨ψ+|ψ−⟩ ~ 1e-17，‖ψ+‖² + ‖ψ−‖² = ‖ψ‖²（6 位），⟨ψ±|X|ψ±⟩ ~ 1e-16，⟨X⟩ = 2⟨ψ+|X|ψ−⟩/‖ψ‖²。
// · G_II：b = a 时 ε = 5(1,2)、10(1,3)、…，ε = 50 = {(1,7),(5,5),(7,1)}，65 = {(1,8),(4,7),(7,4),(8,1)}；b = 2a 时 5 = {(1,4),(2,2)}。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as N from "./_ch02c_num.js";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49", GOLD = "#b8862b", VIOLET = "#7d3c98", GREY = "#9a948b", ORANGE = "#d35400";
const fx = (v, d = 3) => (Number.isFinite(+v) ? (+v).toFixed(d) : "—");
const fe = v => { if (!Number.isFinite(v)) return "—"; if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))); if (e > -3 && e < 4) return v.toFixed(Math.max(0, 3 - e)); const m = v / 10 ** e; return `${m.toFixed(1)}\\times10^{${e}}`; };
const fc = z => { const re = Math.abs(z.re) < 5e-13 ? 0 : z.re, im = Math.abs(z.im) < 5e-13 ? 0 : z.im; return `${re.toFixed(3)}${im < 0 ? "-" : "+"}${Math.abs(im).toFixed(3)}i`; };

function T({ tex, x, y, w = 160, h = 24, align = "left", color, size }) {
  const dx = align === "center" ? -w / 2 : align === "right" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible", pointerEvents: "none" }}>
    <div className="plot-tex" style={{ textAlign: align, color, fontSize: size, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
}
const Slider = ({ tex, min, max, step, value, set }) => <label className="plot-param"><span className="plot-plabel"><M>{tex}</M></span>
  <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} /></label>;
const Seg = ({ options, value, set }) => <div className="seg" style={{ marginBottom: 6 }}>{options.map(([v, l]) => <button key={v} className={v === value ? "on" : ""} onClick={() => set(v)}><TxI>{l}</TxI></button>)}</div>;
const Note = ({ children }) => <p style={{ margin: "0.35em 0", fontSize: 14.5 }}><TxI>{children}</TxI></p>;
const Arrow = ({ x1, y1, x2, y2, color, w = 2, id }) => <g>
  <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill={color} /></marker></defs>
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} markerEnd={`url(#${id})`} /></g>;

// =====================================================================
// 1. 补充材料 B_II：Glauber 公式的数值检验（式 BII-33、BII-63）
// =====================================================================
export function GlauberDemo() {
  const [mode, setMode] = useState("heis");
  const [a, setA] = useState(1.2), [b, setB] = useState(0.8), [al, setAl] = useState(0.7);
  const [A, B] = mode === "heis" ? N.heisPair(a, b) : N.pauliPair(al);
  const e = N.glauberErrors(A, B);
  const fmtM = Mx => R`\begin{pmatrix}${Mx.map(r => r.map(z => fc(z).replace(/\+0\.000i$|-0\.000i$/, "")).join("&")).join(R`\\`)}\end{pmatrix}`;
  return (
    <div className="plot card">
      <Seg value={mode} set={setMode} options={[["heis", R`Heisenberg 型：$[A,B]$ 与 $A$、$B$ 对易`], ["pauli", R`Pauli 型：$A=i\alpha\sigma_x$，$B=i\alpha\sigma_y$`]]} />
      <div className="plot-params">
        {mode === "heis" ? <>
          <Slider tex={R`a=${fx(a, 2)}`} min={-2} max={2} step={0.05} value={a} set={setA} />
          <Slider tex={R`b=${fx(b, 2)}`} min={-2} max={2} step={0.05} value={b} set={setB} />
        </> : <Slider tex={R`\alpha=${fx(al, 2)}`} min={0} max={2} step={0.02} value={al} set={setAl} />}
      </div>
      <div style={{ overflowX: "auto", fontSize: 14.5 }}>
        <p style={{ margin: "0.3em 0" }}><M>{R`[A,B]=${fmtM(e.C)}`}</M></p>
        <p style={{ margin: "0.3em 0" }}><M>{R`\mathrm e^A\mathrm e^B=${fmtM(e.L)}`}</M></p>
        <p style={{ margin: "0.3em 0" }}><M>{R`\mathrm e^{A+B}\,\mathrm e^{\frac12[A,B]}=${fmtM(e.G)}`}</M></p>
      </div>
      <table className="tb-table" style={{ fontSize: 14.5, marginTop: 6 }}><tbody>
        <tr><td><M>{R`\|[A,[A,B]]\|+\|[B,[A,B]]\|`}</M></td><td><M>{fe(e.commC)}</M></td><td>{e.commC < 1e-12 ? "条件满足" : "条件不满足"}</td></tr>
        <tr><td><M>{R`\|\mathrm e^A\mathrm e^B-\mathrm e^{A+B}\|`}</M></td><td><M>{fe(e.naive)}</M></td><td>天真的"指数相加"</td></tr>
        <tr><td><M>{R`\|\mathrm e^A\mathrm e^B-\mathrm e^{A+B}\mathrm e^{\frac12[A,B]}\|`}</M></td><td><M>{fe(e.glauber)}</M></td><td>Glauber 公式 (BII-63)</td></tr>
      </tbody></table>
      <Note>{mode === "heis"
        ? R`$[A,B]=ab\,E_{13}$ 与 $A$、$B$ 都对易：Glauber 公式在浮点精度内精确成立，而"直接相加"差了恰好 $\frac12ab$（$(1,3)$ 元）。这类矩阵是 $[X,P]=i\hbar$ 的有限维"影子"——但只是代数上的：它们不厄米，迹的矛盾（补充材料 $\mathrm E_{\rm II}$）在这里不出现，因为 $[A,B]$ 的迹为零而不是 $i\hbar N$。`
        : R`$[A,B]=-2\alpha^2\cdot i\sigma_z$ 不与 $A$、$B$ 对易，Glauber 公式不再成立；$\alpha$ 很小时两种偏差都是 $O(\alpha^2)$ 与 $O(\alpha^3)$ 量级（Glauber 修正了二阶项，三阶以上仍然出错）。与习题 7 对照。`}</Note>
    </div>);
}

// =====================================================================
// 2. 补充材料 C_II：幺正变换 = 换一组正交归一基（式 CII-3、CII-12、CII-20—22）
// =====================================================================
const PSI1 = [N.cx(0.62, 0.18), N.cx(-0.31, 0.47), N.cx(0.35, 0)];
const PSI2 = [N.cx(0.1, -0.55), N.cx(0.6, 0.2), N.cx(-0.25, 0.4)];
const PSI1r = [N.cx(0.46), N.cx(0.72), N.cx(0.41)], PSI2r = [N.cx(-0.3), N.cx(0.75), N.cx(0.2)];
export function BasisRotationDemo() {
  const [mode, setMode] = useState("real");
  const [th, setTh] = useState(30);
  const [al, setAl] = useState(40), [be, setBe] = useState(60), [ga, setGa] = useState(-30);
  const d2r = Math.PI / 180;
  const U = mode === "real" ? N.rotZ(th * d2r) : N.rotHalf(al * d2r, be * d2r, ga * d2r);
  const p1 = mode === "real" ? PSI1r : PSI1.slice(0, 2), p2 = mode === "real" ? PSI2r : PSI2.slice(0, 2);
  const n1 = N.newComponents(U, p1), n2 = N.newComponents(U, p2);
  const ipOld = N.vdot(p1, p2), ipNew = N.vdot(n1, n2);
  const gramErr = N.mnorm(N.msub(N.gram(U), N.meye(U.length)));
  const dim = U.length;
  // ----- 图：real 模式画 xy 平面上的新旧基与 ψ1 的投影；spin 模式画各分量的复平面相量 -----
  const W = 680, H = 250;
  let pic;
  if (mode === "real") {
    const cx0 = 140, cy0 = 130, L = 95;
    const P = (x, y) => [cx0 + L * x, cy0 - L * y];
    const e1 = [U[0][0].re, U[1][0].re], e2 = [U[0][1].re, U[1][1].re];
    const v = [p1[0].re, p1[1].re];
    pic = <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      <Arrow x1={cx0} y1={cy0} x2={P(1, 0)[0]} y2={P(1, 0)[1]} color={GREY} id="c2ca1" />
      <Arrow x1={cx0} y1={cy0} x2={P(0, 1)[0]} y2={P(0, 1)[1]} color={GREY} id="c2ca2" />
      <Arrow x1={cx0} y1={cy0} x2={P(...e1)[0]} y2={P(...e1)[1]} color={RED} id="c2ca3" />
      <Arrow x1={cx0} y1={cy0} x2={P(...e2)[0]} y2={P(...e2)[1]} color={RED} id="c2ca4" />
      <Arrow x1={cx0} y1={cy0} x2={P(...v)[0]} y2={P(...v)[1]} color={BLUE} w={2.6} id="c2ca5" />
      {/* ψ1 在新轴上的投影 */}
      {[e1, e2].map((e, i) => { const c = v[0] * e[0] + v[1] * e[1]; const q = P(c * e[0], c * e[1]); return <line key={i} x1={P(...v)[0]} y1={P(...v)[1]} x2={q[0]} y2={q[1]} stroke={RED} strokeDasharray="3 3" />; })}
      <T tex={R`\ket{v_1}`} x={P(1, 0)[0] + 4} y={P(1, 0)[1] + 12} w={40} color={GREY} />
      <T tex={R`\ket{v_2}`} x={P(0, 1)[0] + 6} y={P(0, 1)[1]} w={40} color={GREY} />
      <T tex={R`\ket{\tilde v_1}`} x={P(...e1)[0] + 4} y={P(...e1)[1] - 8} w={40} color={RED} />
      <T tex={R`\ket{\tilde v_2}`} x={P(...e2)[0] - 40} y={P(...e2)[1] - 8} w={40} color={RED} />
      <T tex={R`\ket{\psi_1}\ (xy\ \text{投影})`} x={P(...v)[0] + 6} y={P(...v)[1] - 10} w={140} color={BLUE} />
      <T tex={R`\text{绕}\ Oz\ \text{转}\ \theta=${th}^\circ`} x={cx0 - 60} y={H - 14} w={160} />
      <T tex={R`\text{灰：旧基}\ \{\ket{v_i}\}`} x={330} y={40} w={330} color="#6b6257" size={13} />
      <T tex={R`\text{红：新基}\ \ket{\tilde v_i}=U\ket{v_i}\ (\ket{\tilde v_3}=\ket{v_3})`} x={330} y={66} w={330} color="#6b6257" size={13} />
      <T tex={R`\text{红虚线：}\ket{\psi_1}\text{ 在新基矢上的投影}`} x={330} y={92} w={330} color="#6b6257" size={13} />
      <T tex={R`\text{（即新分量）；矢量本身不动，只是"读数"变了}`} x={330} y={118} w={330} color="#6b6257" size={13} />
    </svg>;
  } else {
    const comps = [[p1, "\\psi_1\\ \\text{旧}"], [n1, "\\psi_1\\ \\text{新}"], [p2, "\\psi_2\\ \\text{旧}"], [n2, "\\psi_2\\ \\text{新}"]];
    const r = 46;
    pic = <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      {comps.map(([v, lab], k) => {
        const cx0 = 85 + k * 165, cy0 = 120;
        return <g key={k}>
          <circle cx={cx0} cy={cy0} r={r} fill="none" stroke="#e1d8c6" />
          <line x1={cx0 - r - 6} x2={cx0 + r + 6} y1={cy0} y2={cy0} stroke="#e1d8c6" />
          <line y1={cy0 - r - 6} y2={cy0 + r + 6} x1={cx0} x2={cx0} stroke="#e1d8c6" />
          {v.map((z, i) => <Arrow key={i} x1={cx0} y1={cy0} x2={cx0 + r * z.re} y2={cy0 - r * z.im} color={i ? RED : BLUE} w={2.2} id={`c2cs${k}${i}`} />)}
          <T tex={lab} x={cx0} y={cy0 + r + 22} w={120} align="center" />
          <T tex={R`|c_1|^2+|c_2|^2=${fx(N.vnorm2(v), 4)}`} x={cx0} y={cy0 - r - 18} w={150} align="center" size={12} />
        </g>;
      })}
      <T tex={R`\text{复平面上的分量：蓝}=c_1\text{，红}=c_2\text{（圆半径}=1\text{）}`} x={10} y={H - 12} w={400} color="#6b6257" />
    </svg>;
  }
  const row = (lab, v) => <tr><td><M>{lab}</M></td>{v.map((z, i) => <td key={i}><M>{fc(z)}</M></td>)}<td><M>{fx(N.vnorm2(v), 6)}</M></td></tr>;
  return (
    <div className="plot card">
      <Seg value={mode} set={setMode} options={[["real", R`实三维转动 $R(\theta)$ (CII-21)`], ["spin", R`自旋 1/2：$R^{(1/2)}(\alpha,\beta,\gamma)$ (CII-22)`]]} />
      <div className="plot-params">
        {mode === "real" ? <Slider tex={R`\theta=${th}^\circ`} min={-180} max={180} step={1} value={th} set={setTh} /> : <>
          <Slider tex={R`\alpha=${al}^\circ`} min={-180} max={180} step={1} value={al} set={setAl} />
          <Slider tex={R`\beta=${be}^\circ`} min={0} max={180} step={1} value={be} set={setBe} />
          <Slider tex={R`\gamma=${ga}^\circ`} min={-180} max={180} step={1} value={ga} set={setGa} /></>}
      </div>
      {pic}
      <div style={{ overflowX: "auto" }}>
        <table className="tb-table" style={{ fontSize: 14 }}>
          <thead><tr><th>分量</th>{Array.from({ length: dim }, (_, i) => <th key={i}><M>{R`i=${i + 1}`}</M></th>)}<th><M>{R`\sum_i|c_i|^2`}</M></th></tr></thead>
          <tbody>
            {row(R`\braket{v_i|\psi_1}`, p1)}
            {row(R`\braket{\tilde v_i|\psi_1}`, n1)}
            {row(R`\braket{v_i|\psi_2}`, p2)}
            {row(R`\braket{\tilde v_i|\psi_2}`, n2)}
          </tbody>
        </table>
      </div>
      <Note>{R`标积：旧基中 $\sum_ic_i^{(1)*}c_i^{(2)}=${fc(ipOld)}$，新基中 $=${fc(ipNew)}$（\eqref{CII-3}，差 $${fe(Math.hypot(ipOld.re - ipNew.re, ipOld.im - ipNew.im))}$）。列正交归一 \eqref{CII-20}：$\|U^\dagger U-\mathbb 1\|=${fe(gramErr)}$。${mode === "spin" ? R`矩阵按改正后的 (CII-22) 计算；与 $\mathrm e^{-i\alpha\sigma_z/2}\mathrm e^{-i\beta\sigma_y/2}\mathrm e^{-i\gamma\sigma_z/2}$ 之差 $${fe(N.mnorm(N.msub(U, N.rotHalfProduct(al * d2r, be * d2r, ga * d2r))))}$。注意 $\beta=0$ 时只有 $\alpha+\gamma$ 起作用，而 $\alpha$ 或 $\gamma$ 转一整圈（$360^\circ$）矩阵变号——自旋 1/2 的"双值性"。` : ""}`}</Note>
    </div>);
}

// =====================================================================
// 3. 补充材料 E_II：平移算符 S(λ) = e^{-iλP/ħ}（式 EII-18、EII-23；ħ = 1）
// =====================================================================
const NG = 1024, LG = 40, DQ = LG / NG;
export function TranslationDemo() {
  const [kind, setKind] = useState("two");
  const [k0, setK0] = useState(1.5);
  const [lam, setLam] = useState(3.5);
  const [mode, setMode] = useState("exact");
  const [order, setOrder] = useState(12);
  const lamEff = mode === "exact" ? lam : Math.max(-1.5, Math.min(1.5, lam));
  const res = useMemo(() => {
    const [re, im, q] = N.sample(kind, k0, NG, LG);
    const [r2, i2] = N.translate(re, im, LG, lamEff, mode === "exact" ? Infinity : order);
    const [r3, i3] = N.sample(kind, k0, NG, LG, lamEff);
    return { re, im, q, r2, i2, r3, i3, err: N.maxDiff(r2, i2, r3, i3), n0: N.norm2(re, im, DQ), n1: N.norm2(r2, i2, DQ), dQ: N.meanQ(r2, i2, q) - N.meanQ(re, im, q) };
  }, [kind, k0, lamEff, mode, order]);
  const idx = x => Math.round((x + LG / 2) / DQ);
  const at = (arr, x) => { const i = idx(x); return i >= 0 && i < NG ? arr[i] : NaN; };
  return (
    <div className="plot card">
      <Seg value={kind} set={setKind} options={Object.entries(N.WAVES).map(([k, v]) => [k, v.label])} />
      <Seg value={mode} set={m => { setMode(m); if (m === "taylor") { setKind("gauss"); setLam(1); setOrder(10); } }} options={[["exact", R`完整指数 $\mathrm e^{-i\lambda p}$`], ["taylor", R`Taylor 截断 $\sum_{n\le N}(-i\lambda p)^n/n!$`]]} />
      <div className="plot-params">
        <Slider tex={mode === "exact" ? R`\lambda=${fx(lam, 2)}` : R`\lambda=${fx(lamEff, 2)}\ (|\lambda|\le1.5)`} min={mode === "exact" ? -8 : -1.5} max={mode === "exact" ? 8 : 1.5} step={0.01} value={mode === "exact" ? lam : lamEff} set={setLam} />
        <Slider tex={R`k_0=${fx(k0, 2)}`} min={0} max={3} step={0.05} value={k0} set={setK0} />
        {mode === "taylor" && <Slider tex={R`N=${order}`} min={0} max={60} step={1} value={order} set={setOrder} />}
      </div>
      <Plot
        x={{ label: R`q`, domain: [-12, 12] }}
        y={{ label: R`\mathrm{Re}\,\psi,\ |\psi|`, domain: [-1.3, 1.3] }}
        series={() => [
          { label: R`|\psi(q)|\ \text{(原)}`, f: x => Math.hypot(at(res.re, x), at(res.im, x)), color: GREY, width: 1.5 },
          { label: R`\mathrm{Re}\,[S(\lambda)\psi](q)`, f: x => Math.max(-1.3, Math.min(1.3, at(res.r2, x))), color: BLUE, width: 1.3 },
          { label: R`|S(\lambda)\psi|`, f: x => Math.min(1.3, Math.hypot(at(res.r2, x), at(res.i2, x))), color: INK, width: 2.2 },
          { label: R`|\psi(q-\lambda)|\ \text{(直接计算)}`, f: x => Math.hypot(at(res.r3, x), at(res.i3, x)), color: RED, dash: "dash", width: 1.4 },
        ]}
        vlines={() => [{ x: 0, label: R`q=0` }, { x: lamEff, label: R`q=\lambda` }]}
        samples={700} height={330} />
      <Note>{R`$\max_q|S(\lambda)\psi-\psi(q-\lambda)|=${fe(res.err)}$；$\|\psi\|^2=${fx(res.n0, 6)}$，$\|S\psi\|^2=${fx(res.n1, 6)}$；$\langle Q\rangle$ 增加 $${fx(res.dQ, 4)}$（应为 $\lambda=${fx(lamEff, 4)}$）。${mode === "exact" ? R`完整的 $\mathrm e^{-i\lambda P/\hbar}$ 是幺正的：模长精确保持，波形整体右移 $\lambda$，误差只剩舍入。` : R`截断级数**不是**幺正的（模长不守恒），阶数不够时波形还会畸变；$N$ 增大到 $\lambda p$ 典型值的几倍后才收敛——这就是 $\psi(q-\lambda)=\sum_n\frac{(-\lambda)^n}{n!}\psi^{(n)}(q)$ 的 Taylor 级数。`}`}</Note>
    </div>);
}

// =====================================================================
// 4. 补充材料 F_II：偶奇分解与选择定则（式 FII-15—FII-23、FII-32、FII-33）
// =====================================================================
export function ParityDemo() {
  const [kind, setKind] = useState("shifted");
  const [s, setS] = useState(0.8);
  const d = useMemo(() => N.parityDecompose(kind, s), [kind, s]);
  const nP = d.xs.length, X = 6;
  const at = (arr, x) => { const i = Math.round((x + X) / (2 * X) * (nP - 1)); return i >= 0 && i < nP ? arr[i] : NaN; };
  return (
    <div className="plot card">
      <Seg value={kind} set={setKind} options={Object.entries(N.PARITY_FUNS).map(([k, v]) => [k, v.label])} />
      <div className="plot-params"><Slider tex={R`s=${fx(s, 2)}`} min={-2} max={2} step={0.02} value={s} set={setS} /></div>
      <Plot
        x={{ label: R`x`, domain: [-6, 6] }}
        y={{ label: R`\psi,\ \psi_+,\ \psi_-`, domain: [-1.25, 1.35] }}
        series={() => [
          { label: R`\psi(x)`, f: x => at(d.f, x), color: INK, width: 2.4 },
          { label: R`\psi(-x)`, f: x => at(d.f, -x), color: GREY, dash: "dot", width: 1.3 },
          { label: R`\psi_+=\tfrac12[\psi(x)+\psi(-x)]`, f: x => at(d.fp, x), color: BLUE, width: 1.8 },
          { label: R`\psi_-=\tfrac12[\psi(x)-\psi(-x)]`, f: x => at(d.fm, x), color: RED, width: 1.8 },
        ]}
        vlines={() => [{ x: 0, label: R`x=0` }]}
        samples={801} height={320} />
      <table className="tb-table" style={{ fontSize: 14.5 }}><tbody>
        <tr><td><TxI>{R`正交 \eqref{FII-17}`}</TxI></td><td><M>{R`\braket{\psi_+|\psi_-}=${fe(d.cross)}`}</M></td></tr>
        <tr><td>勾股（投影完备）</td><td><M>{R`\|\psi_+\|^2+\|\psi_-\|^2=${fx(d.Np, 4)}+${fx(d.Nm, 4)}=${fx(d.Np + d.Nm, 6)},\quad\|\psi\|^2=${fx(d.N, 6)}`}</M></td></tr>
        <tr><td>宇称平均值</td><td><M>{R`\langle\Pi\rangle=\frac{\|\psi_+\|^2-\|\psi_-\|^2}{\|\psi\|^2}=${fx(d.Pi, 4)}`}</M></td></tr>
        <tr><td>选择定则（<M>{R`X`}</M> 为奇算符）</td><td><M>{R`\braket{\psi_+|X|\psi_+}=${fe(d.xp)},\ \ \braket{\psi_-|X|\psi_-}=${fe(d.xm)}`}</M></td></tr>
        <tr><td><M>{R`\langle X\rangle`}</M> 全部来自交叉项</td><td><M>{R`\langle X\rangle=${fx(d.xmean, 4)}=\frac{2\braket{\psi_+|X|\psi_-}}{\|\psi\|^2}=${fx(2 * d.xpm / d.N, 4)}`}</M></td></tr>
      </tbody></table>
      <Note>{R`把 $s$ 调到使 $\psi$ 本身为偶（如平移高斯取 $s=0$）或为奇时，另一部分消失，$\langle\Pi\rangle=\pm1$、$\langle X\rangle=0$：有确定宇称的态中奇算符的平均值为零 \eqref{FII-33}。`}</Note>
    </div>);
}

// =====================================================================
// 5. 补充材料 G_II：二维无限深势阱的能级与本征函数（式 GII-9、GII-11、GII-15、GII-17）
// =====================================================================
const KCOL = { single: INK, systematic: BLUE, mixed: VIOLET, accidental: ORANGE };
const NLEV = 24;
const mixCol = (c, a) => `rgb(${c.map(x => Math.round(255 + (x - 255) * a)).join(",")})`;     // 与白色按比例混合（不透明，避免相邻格子重叠处出现网纹）
const KLAB = { single: "不简并", systematic: "系统简并", mixed: "系统 + 偶然", accidental: "偶然简并" };
export function Well2DDemo() {
  const [ratio, setRatio] = useState(1);
  const [sel, setSel] = useState(1);
  const [mix, setMix] = useState(0);
  const levels = useMemo(() => N.wellLevels(ratio, 14, NLEV), [ratio]);
  const L = levels[Math.min(sel, levels.length - 1)];
  const st = L.states;
  const th = mix * Math.PI / 180;
  const f = (x, y) => st.length > 1
    ? Math.cos(th) * N.phi2d(st[0].n, st[0].p, ratio)(x, y) + Math.sin(th) * N.phi2d(st[1].n, st[1].p, ratio)(x, y)
    : N.phi2d(st[0].n, st[0].p, ratio)(x, y);
  // 热图：x ∈ [0,1]（a = 1），y ∈ [0, ratio]
  const G = 44, X0 = 425, Wb = ratio >= 1 ? 220 / ratio : 220, Hb = ratio >= 1 ? 220 : 220 * ratio;
  const cells = [];
  let mx = 1e-9; const vals = [];
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) { const v = f((i + 0.5) / G, (j + 0.5) / G * ratio); vals.push(v); mx = Math.max(mx, Math.abs(v)); }
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
    const v = vals[i * G + j] / mx, a = Math.abs(v);
    cells.push(<rect key={i * G + j} x={X0 + i * Wb / G} y={40 + Hb - (j + 1) * Hb / G} width={Wb / G + 0.6} height={Hb / G + 0.6} shapeRendering="crispEdges" fill={mixCol(v >= 0 ? [192, 57, 43] : [44, 74, 110], a)} />);
  }
  const W = 680, RH = 15, H = 30 + NLEV * RH + 10, sy = k => 30 + (NLEV - 1 - k) * RH + RH / 2;     // 能级按次序等距排列（非等比例）
  const exact = r => <button className="plot-reset" onClick={() => setRatio(r)}><TxI>{r === 1 ? R`$b=a$` : r === 2 ? R`$b=2a$` : R`$b=\sqrt2\,a$`}</TxI></button>;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider tex={R`b/a=${fx(ratio, 3)}`} min={0.5} max={2.5} step={0.005} value={ratio} set={setRatio} />
        {exact(1)}{exact(Math.SQRT2)}{exact(2)}
        {st.length > 1 && <Slider tex={R`\text{混合角}\ ${mix}^\circ`} min={0} max={180} step={1} value={mix} set={setMix} />}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <T tex={R`\varepsilon=n^2+p^2(a/b)^2\ \ (\text{自下而上递增，等距排列})`} x={6} y={14} w={320} size={12} />
        {levels.map((l, k) => {
          const y = sy(k), c = KCOL[l.kind], on = k === sel;
          return <g key={k} onClick={() => { setSel(k); setMix(0); }} style={{ cursor: "pointer" }}>
            <rect x={0} y={y - RH / 2} width={410} height={RH} fill={on ? "#f3ead8" : "transparent"} />
            <text x={44} y={y + 4} fontSize="11.5" textAnchor="end" fill="#6b6257">{fx(l.e, 2)}</text>
            <line x1={52} x2={112} y1={y} y2={y} stroke={c} strokeWidth={on ? 3.5 : 2.2} />
            <text x={120} y={y + 4} fontSize="12" fill={c}>{l.states.map(s => `(${s.n},${s.p})`).join(" ")}{l.states.length > 1 ? `  ${l.states.length} 重 · ${KLAB[l.kind]}` : ""}</text>
          </g>;
        })}
        <rect x={X0 - 1} y={39} width={Wb + 2} height={Hb + 2} fill="none" stroke={INK} strokeWidth={2} />
        {cells}
        <T tex={st.length > 1 ? R`\cos\vartheta\,\Phi_{${st[0].n},${st[0].p}}+\sin\vartheta\,\Phi_{${st[1].n},${st[1].p}}` : R`\Phi_{${st[0].n},${st[0].p}}(x,y)`} x={X0 + Wb / 2} y={Hb + 62} w={260} align="center" />
        <T tex={R`a`} x={X0 + Wb / 2} y={30} w={20} align="center" size={12} />
        <T tex={R`b`} x={X0 + Wb + 6} y={40 + Hb / 2} w={20} size={12} />
      </svg>
      <Note>{R`当前能级 $\varepsilon=${fx(L.e, 4)}$（单位 $\pi^2\hbar^2/2ma^2$），${st.length} 个态：${st.map(s => `$(${s.n},${s.p})$`).join("、")}。${ratio === 1 ? R`正方形：$n\neq p$ 的能级成对简并（$x\leftrightarrow y$ 对称）；表的上端 $\varepsilon=50$ 的 $(1,7),(5,5),(7,1)$ 与 $\varepsilon=65$ 的 $(1,8),(4,7),(7,4),(8,1)$ 是偶然重合（紫色）。把 $b/a$ 略调离 1：系统简并的成对能级与偶然重合同时分裂。` : Math.abs(ratio - 2) < 1e-12 ? R`$b=2a$：$\varepsilon=n^2+p^2/4$，如 $(1,4)$ 与 $(2,2)$ 都是 5——与对称性无关的偶然简并。` : Math.abs(ratio - Math.SQRT2) < 1e-12 ? R`$b=\sqrt2\,a$：$\varepsilon=n^2+p^2/2$，如 $(1,5)$ 与 $(3,3)$ 都是 13.5。` : R`矩形盒：$x\leftrightarrow y$ 对称性被破坏，$(n,p)$ 与 $(p,n)$ 分裂 \eqref{GII-18}。`}${st.length > 1 ? R` 调混合角：简并子空间中任何组合都是同一能量的本征函数，图样可以与两个"乘积态"都不像。` : ""}`}</Note>
    </div>);
}
