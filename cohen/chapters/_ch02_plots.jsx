// 第 II 章交互图。数值核心在 _ch02_linalg.js（已用 node 验证：Jacobi 对角化残差 ~1e-15，
// 三角函数正弦展开 c_1 与解析值 0.99274 一致，Bell 态 Schmidt 系数 1/√2，[[1,2],[3,4]] 的奇异值 0.99777/0.06682）。
import { useMemo, useState } from "react";
import { TxI, Slider, Seg, renderTex } from "@kit";
import * as L from "./_ch02_linalg.js";

const R = String.raw;
// 只做排版、不做符号标注的小公式
const K = ({ t, d = false }) => <span dangerouslySetInnerHTML={{ __html: renderTex(R`\nosym{` + t + "}", d) }} />;
const box = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 14px", margin: "8px 0" };
const row = { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" };
const okc = v => (v < 1e-9 ? "var(--green)" : v < 1e-5 ? "var(--gold)" : "var(--accent)");
const f4 = v => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);
const sci = v => (v === 0 ? "0" : v < 1e-3 ? v.toExponential(1).replace(/e([+-]\d+)/, R`\times10^{$1}`) : v.toFixed(4));

// 复数 → LaTeX
function fc([re, im], d = 3) {
  const r = Math.abs(re) < 5e-4 * 10 ** (3 - d) ? 0 : re, i = Math.abs(im) < 5e-4 * 10 ** (3 - d) ? 0 : im;
  const f = x => (+x.toFixed(d)).toString();
  if (i === 0) return f(r);
  if (r === 0) return (i < 0 ? "-" : "") + (Math.abs(+i.toFixed(d)) === 1 ? "" : f(Math.abs(i))) + "i";
  return f(r) + (i < 0 ? "-" : "+") + (Math.abs(+i.toFixed(d)) === 1 ? "" : f(Math.abs(i))) + "i";
}
const pm = (M, d = 3) => R`\begin{pmatrix}` + M.map(r => r.map(z => fc(z, d)).join("&")).join(R`\\`) + R`\end{pmatrix}`;
const colv = (v, d = 3) => R`\begin{pmatrix}` + v.map(z => fc(z, d)).join(R`\\`) + R`\end{pmatrix}`;

// 交互图外框（自绘内容，不用原书插图）
export function IFig({ id, title, caption, children }) {
  return (
    <figure className="tb-fig" id={"fig-" + id}>
      <div className="tb-fig-int">{children}</div>
      <figcaption><b><TxI>{title}</TxI></b>　<TxI>{caption}</TxI></figcaption>
    </figure>);
}

// ---------- 简单的 SVG 坐标系 ----------
function Axes({ W, H, pad, xr, yr, xl, yl, xt = [], yt = [] }) {
  const X = x => pad.l + (x - xr[0]) / (xr[1] - xr[0]) * (W - pad.l - pad.r);
  const Y = y => H - pad.b - (y - yr[0]) / (yr[1] - yr[0]) * (H - pad.t - pad.b);
  return <g fontSize="11" fill="var(--muted)">
    <line x1={pad.l} x2={W - pad.r} y1={Y(Math.max(yr[0], Math.min(0, yr[1])))} y2={Y(Math.max(yr[0], Math.min(0, yr[1])))} stroke="var(--line)" />
    <line x1={pad.l} x2={pad.l} y1={pad.t} y2={H - pad.b} stroke="var(--line)" />
    {xt.map(x => <text key={"x" + x} x={X(x)} y={H - pad.b + 14} textAnchor="middle">{x}</text>)}
    {yt.map(y => <text key={"y" + y} x={pad.l - 5} y={Y(y) + 4} textAnchor="end">{y}</text>)}
    {xl && <text x={W - pad.r} y={H - pad.b + 28} textAnchor="end" fontStyle="italic">{xl}</text>}
    {yl && <text x={pad.l + 4} y={pad.t + 2} fontStyle="italic">{yl}</text>}
  </g>;
}
const path = (pts, X, Y) => pts.map(([x, y], i) => (i ? "L" : "M") + X(x).toFixed(1) + "," + Y(y).toFixed(1)).join("");

// ======================================================================
// 1. 盒中正弦基展开与 Parseval（§A-2）
// ======================================================================
const BOX_LABELS = [["tri", "三角形"], ["step", "方台（有跳变）"], ["gauss", "高斯包"], ["flat", "常数（边界不为零）"]];
export function BoxBasisPlot() {
  const [fk, setF] = useState("tri");
  const [N, setN] = useState(5);
  const ex = useMemo(() => L.boxExpansion(fk, 60), [fk]);
  const xs = useMemo(() => Array.from({ length: 601 }, (_, i) => i / 600), []);
  const fv = xs.map(ex.f), sv = xs.map(x => L.partialSum(ex.c, N, x));
  const sumN = ex.c.slice(0, N).reduce((s, c) => s + c * c, 0);
  // 直接数值计算 ∫|f − S_N|²，与 1 − Σ|c_n|² 对照（Parseval）
  const err = L.simpson(x => (ex.f(x) - L.partialSum(ex.c, N, x)) ** 2, 0, 1, 3000);
  const ymax = Math.max(...fv) * 1.25, ymin = Math.min(0, Math.min(...sv)) - 0.1;
  const W = 420, H = 230, pad = { l: 34, r: 10, t: 12, b: 34 };
  const X = x => pad.l + x * (W - pad.l - pad.r), Y = y => H - pad.b - (y - ymin) / (ymax - ymin) * (H - pad.t - pad.b);
  const W2 = 300, M = 30, bw = (W2 - 40) / M, cmax = Math.max(...ex.c.map(c => c * c));
  return (
    <div>
      <Seg options={BOX_LABELS} value={fk} onChange={setF} />
      <Slider label={R`保留项数 $N$`} value={N} min={1} max={60} step={1} onChange={setN} />
      <div style={row}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} style={{ maxWidth: "100%" }}>
          <Axes W={W} H={H} pad={pad} xr={[0, 1]} yr={[ymin, ymax]} xl="x" xt={[0, 0.5, 1]} />
          <path d={path(xs.map((x, i) => [x, fv[i]]), X, Y)} fill="none" stroke="#999" strokeWidth="2.5" />
          <path d={path(xs.map((x, i) => [x, sv[i]]), X, Y)} fill="none" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={W - 12} y={20} textAnchor="end" fontSize="12" fill="var(--accent)">部分和 (N = {N})</text>
          <text x={W - 12} y={36} textAnchor="end" fontSize="12" fill="#888">原函数（已归一化）</text>
        </svg>
        <div><div className="muted" style={{ fontSize: 13 }}>分量 <K t={R`|c_n|^2`} />（<K t={R`n=1,\dots,30`} />，深色为已保留的项）</div>
        <svg viewBox={`0 0 ${W2} ${H}`} width={W2} style={{ maxWidth: "100%" }}>
          {ex.c.slice(0, M).map((c, i) => {
            const h = (c * c) / cmax * (H - 60);
            return <rect key={i} x={30 + i * bw} y={H - 30 - h} width={bw * 0.8} height={Math.max(h, 0.5)} fill={i < N ? "var(--blue)" : "var(--line)"} />;
          })}
          {[1, 10, 20, 30].map(n => <text key={n} x={30 + (n - 1) * bw + bw * 0.4} y={H - 16} fontSize="10" textAnchor="middle" fill="var(--muted)">{n}</text>)}
          <line x1={28} x2={W2 - 6} y1={H - 30} y2={H - 30} stroke="var(--line)" />
        </svg></div>
      </div>
      <div style={box}>
        <div><K t={R`\sum_{n\le N}|c_n|^2=${sumN.toFixed(6)}`} />　　<K t={R`1-\sum_{n\le N}|c_n|^2=${sci(Math.max(0, 1 - sumN))}`} /></div>
        <div><K t={R`\int_0^1|\psi-S_N|^2\,\mathrm dx=${sci(err)}`} />　<span className="muted">（直接数值积分；按 Parseval 应等于上一项）</span></div>
        <div className="muted" style={{ fontSize: 13 }}>前三个分量：<K t={R`c_1=${f4(ex.c[0])},\ c_2=${f4(ex.c[1])},\ c_3=${f4(ex.c[2])}`} />{fk === "tri" && <>（解析值 <K t={R`c_1=4\sqrt6/\pi^2=0.9927`} />）</>}{fk === "flat" && <>（解析值 <K t={R`c_n=2\sqrt2/(n\pi)`} />，<K t={R`n`} /> 为奇数）</>}</div>
      </div>
    </div>);
}

// ======================================================================
// 2. 图 1 交互版：尖峰函数 ξ^(ε)_{x0} 与 δ 左矢（§B-2-c）
// ======================================================================
const psiEx = x => Math.exp(-((x - 0.6) ** 2));
const peak = (eps, x) => { const s = eps / 14; return (Math.tanh((x + eps / 2) / s) - Math.tanh((x - eps / 2) / s)) / (2 * eps); };
export function PeakPlot() {
  const [le, setLe] = useState(-0.3);
  const eps = 10 ** le;
  const ov = L.simpson(x => peak(eps, x) * psiEx(x), -2 * eps, 2 * eps, 4000);
  const nrm = L.simpson(x => peak(eps, x) ** 2, -2 * eps, 2 * eps, 4000);
  const W = 460, H = 220, pad = { l: 34, r: 10, t: 12, b: 30 }, ymax = 2.4;
  const X = x => pad.l + (x + 2) / 4 * (W - pad.l - pad.r), Y = y => H - pad.b - Math.min(y, ymax * 1.02) / ymax * (H - pad.t - pad.b);
  const xs = Array.from({ length: 1601 }, (_, i) => -2 + 4 * i / 1600);
  const xp = Array.from({ length: 801 }, (_, i) => -2 * eps + 4 * eps * i / 800);
  return (
    <div>
      <Slider label={R`宽度 $\varepsilon$`} value={le} min={-2} max={0.3} step={0.01} onChange={setLe} fmt={v => (10 ** v).toPrecision(3)} />
      <svg viewBox={`0 0 ${W} ${H}`} width={W} style={{ maxWidth: "100%" }}>
        <Axes W={W} H={H} pad={pad} xr={[-2, 2]} yr={[0, ymax]} xl="x" xt={[-2, -1, 0, 1, 2]} yt={[0, 1, 2]} />
        <path d={path(xs.map(x => [x, psiEx(x)]), X, Y)} fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeDasharray="6 4" />
        <path d={path([[-2, 0], ...xp.map(x => [x, peak(eps, x)]), [2, 0]], X, Y)} fill="rgba(155,44,31,.12)" stroke="var(--accent)" strokeWidth="1.8" />
        {1 / eps > ymax && <text x={X(0) + 6} y={pad.t + 12} fontSize="11" fill="var(--accent)">峰高 {(1 / eps).toFixed(1)}（已截断）</text>}
      </svg>
      <div className="muted" style={{ fontSize: 13 }}>实线：<K t={R`\xi^{(\varepsilon)}_{x_0}(x)`} />，<K t={R`x_0=0`} />；虚线：示例波函数 <K t={R`\psi(x)=e^{-(x-0.6)^2}`} />。</div>
      <div style={box}>
        <div><K t={R`\langle\xi^{(\varepsilon)}_{x_0}|\psi\rangle=${ov.toFixed(5)}`} />　→　<K t={R`\psi(x_0)=${psiEx(0).toFixed(5)}`} />　<span className="muted">（相对偏差 {sci(Math.abs(ov / psiEx(0) - 1))}）</span></div>
        <div><K t={R`\langle\xi^{(\varepsilon)}_{x_0}|\xi^{(\varepsilon)}_{x_0}\rangle=${nrm.toFixed(2)}`} />　<span className="muted"><K t={R`\approx1/\varepsilon=${(1 / eps).toFixed(2)}`} />（<K t={R`\varepsilon\to0`} /> 时发散）</span></div>
      </div>
    </div>);
}

// ======================================================================
// 3. 图 2（自绘）：伴随算符的定义
// ======================================================================
const Arrow = ({ w = 150 }) => <svg width={w} height="18" viewBox={`0 0 ${w} 18`}><line x1="2" y1="6" x2={w - 10} y2="6" stroke="var(--ink)" /><line x1="2" y1="10" x2={w - 10} y2="10" stroke="var(--ink)" /><path d={`M${w - 14},2 L${w - 2},8 L${w - 14},14`} fill="none" stroke="var(--ink)" /></svg>;
const Wavy = () => <svg width="18" height="60" viewBox="0 0 18 60"><path d="M9,4 C17,12 1,20 9,28 C17,36 1,44 9,52" fill="none" stroke="var(--accent)" strokeWidth="1.4" /><path d="M5,8 L9,2 L13,8 M5,50 L9,56 L13,50" fill="none" stroke="var(--accent)" strokeWidth="1.2" /></svg>;
export function AdjointDiagram() {
  const cell = { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 30 };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: "2px 18px", justifyContent: "center", fontSize: 18, padding: "10px 0" }}>
      <div style={cell}><K t={R`\ket{\psi}`} /></div>
      <div style={{ ...cell, flexDirection: "column" }}><K t="A" /><Arrow /></div>
      <div style={cell}><K t={R`\ket{\psi'}=A\ket{\psi}`} /></div>
      <div style={cell}><Wavy /></div><div /><div style={cell}><Wavy /></div>
      <div style={cell}><K t={R`\bra{\psi}`} /></div>
      <div style={{ ...cell, flexDirection: "column" }}><Arrow /><K t={R`A^\dagger`} /></div>
      <div style={cell}><K t={R`\bra{\psi'}=\bra{\psi}A^\dagger`} /></div>
    </div>);
}

// ======================================================================
// 4. 厄米矩阵的谱分解与封闭关系（§D-2-b）
// ======================================================================
const H_PRESETS = {
  gen3: { n: 3, d: [2, -1, 0.5], o: [[1, -1], [0, 0.5], [0.3, 0]], lab: R`$3\times3$ 一般` },
  deg3: { n: 3, d: [1, 1, 1], o: [[1, 0], [1, 0], [1, 0]], lab: R`$3\times3$ 简并（本征值 0, 0, 3）` },
  sy: { n: 2, d: [0, 0], o: [[0, -1], [0, 0], [0, 0]], lab: R`$2\times2$ 泡利 $\sigma_y$` },
  gen2: { n: 2, d: [1, -0.5], o: [[0.8, 0.6], [0, 0], [0, 0]], lab: R`$2\times2$ 一般` },
};
// 上三角非对角元的位置：(0,1),(0,2),(1,2)
const OFF = [[0, 1], [0, 2], [1, 2]];
function det3(A) {
  const n = A.length, m = L.cmul, s = L.csub, a = L.cadd;
  if (n === 2) return s(m(A[0][0], A[1][1]), m(A[0][1], A[1][0]));
  return a(s(m(A[0][0], s(m(A[1][1], A[2][2]), m(A[1][2], A[2][1]))), m(A[0][1], s(m(A[1][0], A[2][2]), m(A[1][2], A[2][0])))), m(A[0][2], s(m(A[1][0], A[2][1]), m(A[1][1], A[2][0]))));
}
const num = { width: 58, font: "inherit", fontSize: 13, padding: "1px 3px", border: "1px solid var(--line)", borderRadius: 4, background: "var(--paper)" };
export function HermitianPlot() {
  const [st, setSt] = useState(H_PRESETS.gen3);
  const n = st.n;
  const A = useMemo(() => {
    const M = L.zeros(n);
    for (let i = 0; i < n; i++) M[i][i] = [+st.d[i] || 0, 0];
    OFF.forEach(([i, j], k) => { if (j < n) { M[i][j] = [+st.o[k][0] || 0, +st.o[k][1] || 0]; M[j][i] = L.cconj(M[i][j]); } });
    return M;
  }, [st]);
  const E = useMemo(() => L.eigh(A), [A]);
  const P = L.projectors(E, 1e-6);
  const I = L.eye(n);
  let S = L.zeros(n), Rc = L.zeros(n);
  for (const p of P) { S = L.madd(S, p.P); Rc = L.madd(Rc, L.mscale(p.P, p.val)); }
  const eClos = L.maxAbs(L.msub(S, I)), eSpec = L.maxAbs(L.msub(Rc, A)), eOrth = L.maxAbs(L.msub(L.matmul(L.dagger(E.vecs), E.vecs), I));
  const eChar = Math.max(...E.vals.map(l => L.cabs(det3(L.msub(A, L.mscale(I, l))))));
  const setD = (i, v) => setSt({ ...st, d: st.d.map((x, k) => (k === i ? v : x)) });
  const setO = (k, c, v) => setSt({ ...st, o: st.o.map((x, kk) => (kk === k ? x.map((y, cc) => (cc === c ? v : y)) : x)) });
  const offIdx = (i, j) => OFF.findIndex(([a, b]) => a === i && b === j);
  return (
    <div>
      <Seg options={Object.entries(H_PRESETS).map(([k, v]) => [k, v.lab])} value={Object.keys(H_PRESETS).find(k => H_PRESETS[k].lab === st.lab) || ""} onChange={k => setSt(H_PRESETS[k])} />
      <div style={row}>
        <div style={box}>
          <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>编辑矩阵 <K t="A" />（上三角输入 实部 / 虚部；下三角自动取共轭）</div>
          <table style={{ borderCollapse: "collapse" }}><tbody>{Array.from({ length: n }, (_, i) =>
            <tr key={i}>{Array.from({ length: n }, (_, j) => {
              const td = { padding: "3px 4px", border: "1px dotted var(--line)", textAlign: "center", fontSize: 13 };
              if (i === j) return <td key={j} style={td}><input type="number" step="0.1" style={num} value={st.d[i]} onChange={e => setD(i, e.target.value)} /></td>;
              if (i < j) { const k = offIdx(i, j); return <td key={j} style={td}><input type="number" step="0.1" style={num} value={st.o[k][0]} onChange={e => setO(k, 0, e.target.value)} />+<input type="number" step="0.1" style={num} value={st.o[k][1]} onChange={e => setO(k, 1, e.target.value)} />i</td>; }
              return <td key={j} style={{ ...td, color: "var(--muted)" }}><K t={fc(A[i][j], 2)} /></td>;
            })}</tr>)}</tbody></table>
        </div>
        <div style={box}>
          <div style={{ fontSize: 13 }} className="muted">本征值（谱）与简并度</div>
          {P.map((p, k) => <div key={k}><K t={R`a_{${k + 1}}=${p.val.toFixed(4)}`} />　<span className="muted">{p.deg > 1 ? `${p.deg} 重简并` : "非简并"}，<K t={R`\operatorname{Tr}P_{${k + 1}}=${(p.P.reduce((s, r, i) => s + r[i][0], 0)).toFixed(3)}`} /></span></div>)}
          <div style={{ marginTop: 6 }}><K t={R`\max|\mathrm{Det}(A-\lambda I)|=${sci(eChar)}`} /> <span className="muted">（久期方程 (D-14)）</span></div>
        </div>
      </div>
      <div style={row}>
        <div style={box}><div className="muted" style={{ fontSize: 13 }}>正交归一本征矢（列，按本征值升序）</div><K d t={R`V=` + pm(E.vecs)} /></div>
        {P.map((p, k) => <div key={k} style={box}><div className="muted" style={{ fontSize: 13 }}>投影算符 <K t={R`P_{${k + 1}}`} /></div><K d t={R`P_{${k + 1}}=` + pm(p.P, 3)} /></div>)}
      </div>
      <div style={box}>
        <div style={{ color: okc(eOrth) }}><K t={R`\max|V^\dagger V-I|=${sci(eOrth)}`} />　正交归一 (D-34)</div>
        <div style={{ color: okc(eClos) }}><K t={R`\max\big|\textstyle\sum_nP_n-\mathbb 1\big|=${sci(eClos)}`} />　封闭关系 (D-35)</div>
        <div style={{ color: okc(eSpec) }}><K t={R`\max\big|\textstyle\sum_na_nP_n-A\big|=${sci(eSpec)}`} />　谱分解 (D-36-b)</div>
      </div>
    </div>);
}

// ======================================================================
// 5. 对易可观测量：共同本征基与 CSCO（§D-3）
// ======================================================================
const C_PRESETS = {
  csco: { a: [1, 1, 3], b: [2, -1, -1], lab: "A、B 各自简并，合起来完全" },
  bfix: { a: [1, 1, 3], b: [0, 2, 0], lab: "B 消除 A 的简并" },
  inc: { a: [1, 1, 3], b: [2, 2, -1], lab: "不完全：(1,2) 出现两次" },
  anon: { a: [-1, 0.5, 2], b: [1, 1, 1], lab: "A 单独构成 CSCO" },
};
const KAPPA = (Math.sqrt(5) - 1) / 2;
export function CommutingPlot() {
  const [st, setSt] = useState(C_PRESETS.csco);
  const [th, setTh] = useState(0.7), [ph, setPh] = useState(0.4);
  const U = L.rotation3(th, ph), Ud = L.dagger(U);
  const A = L.matmul(U, L.matmul(L.diag(st.a.map(Number)), Ud)), B = L.matmul(U, L.matmul(L.diag(st.b.map(Number)), Ud));
  const comm = L.maxAbs(L.msub(L.matmul(A, B), L.matmul(B, A)));
  const EA = L.eigh(A), EB = L.eigh(B);
  const gA = L.projectors(EA, 1e-6), gB = L.projectors(EB, 1e-6);
  // 共同本征基：对角化 A + κB（κ 为无理数）
  const EK = L.eigh(L.madd(A, L.mscale(B, KAPPA)));
  const ev = (M, v) => L.inner(v, L.matmul(M, v.map(z => [z])).map(r => r[0]))[0];
  const common = [0, 1, 2].map(j => { const v = L.col(EK.vecs, j); return { v, a: ev(A, v), b: ev(B, v) }; });
  const key = c => c.a.toFixed(5) + "|" + c.b.toFixed(5);
  const counts = {}; common.forEach(c => (counts[key(c)] = (counts[key(c)] || 0) + 1));
  const complete = Object.values(counts).every(x => x === 1);
  // A 单独对角化所得本征矢中，有几个恰好也是 B 的本征矢
  const isEigB = v => { const Bv = L.matmul(B, v.map(z => [z])).map(r => r[0]); const b = ev(B, v); return Math.max(...Bv.map((z, i) => L.cabs(L.csub(z, L.cscale(v[i], b))))) < 1e-6; };
  const nA = [0, 1, 2].filter(j => isEigB(L.col(EA.vecs, j))).length;
  const spec = g => g.map(p => `${p.val.toFixed(3)}${p.deg > 1 ? R`\,(\times${p.deg})` : ""}`).join(R`,\ `);
  const setE = (w, i, v) => setSt({ ...st, lab: "", [w]: st[w].map((x, k) => (k === i ? v : x)) });
  return (
    <div>
      <Seg options={Object.entries(C_PRESETS).map(([k, v]) => [k, v.lab])} value={Object.keys(C_PRESETS).find(k => C_PRESETS[k].lab === st.lab) || ""} onChange={k => setSt(C_PRESETS[k])} />
      <div style={row}>
        <div style={box}>
          <div className="muted" style={{ fontSize: 13 }}>共同本征基中预设的本征值</div>
          <table><tbody>
            <tr><td><K t="a_k" /></td>{st.a.map((x, i) => <td key={i}><input type="number" step="0.5" style={num} value={x} onChange={e => setE("a", i, e.target.value)} /></td>)}</tr>
            <tr><td><K t="b_k" /></td>{st.b.map((x, i) => <td key={i}><input type="number" step="0.5" style={num} value={x} onChange={e => setE("b", i, e.target.value)} /></td>)}</tr>
          </tbody></table>
          <Slider label={R`转角 $\theta$`} value={th} min={0} max={3.14} step={0.01} onChange={setTh} fmt={v => v.toFixed(2)} />
          <Slider label={R`转角 $\phi$`} value={ph} min={0} max={3.14} step={0.01} onChange={setPh} fmt={v => v.toFixed(2)} />
        </div>
        <div style={box}><K d t={R`A=` + pm(A, 3)} /><K d t={R`B=` + pm(B, 3)} /><div style={{ color: okc(comm) }}><K t={R`\max|[A,B]|=${sci(comm)}`} /></div></div>
      </div>
      <div style={row}>
        <div style={box}>
          <div><K t={R`\text{spec}\,A:\ ${spec(gA)}`} /></div>
          <div><K t={R`\text{spec}\,B:\ ${spec(gB)}`} /></div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>单独对角化 <K t="A" /> 得到的 3 个本征矢中，有 {nA} 个恰好也是 <K t="B" /> 的本征矢{gA.some(p => p.deg > 1) && nA < 3 ? "——简并子空间中的本征矢一般不是 B 的本征矢（定理 III 前的说明）" : ""}。</div>
        </div>
        <div style={box}>
          <div className="muted" style={{ fontSize: 13 }}>共同本征基（对角化 <K t={R`A+\kappa B`} />，<K t={R`\kappa=0.618\ldots`} />）</div>
          {common.map((c, j) => <div key={j}><K t={colv(c.v, 3) + R`\ \to\ (a,b)=(${c.a.toFixed(3)},\,${c.b.toFixed(3)})`} /></div>)}
          <div style={{ marginTop: 6, fontWeight: 600, color: complete ? "var(--green)" : "var(--accent)" }}>
            {complete ? "所有本征值对互不相同：{A, B} 构成 CSCO，共同本征基唯一（差相位）。" : "有本征值对重复出现：{A, B} 不完全，相应二维子空间中的基仍可任意旋转，需再加一个可观测量。"}
          </div>
        </div>
      </div>
    </div>);
}

// ======================================================================
// 6. 两比特态的 Schmidt 分解与可分性（§F-2-a）
// ======================================================================
const S_PRESETS = {
  prod: { c: [1, 1, 0, 0], ph: 0, lab: "乘积态" },
  bell: { c: [1, 0, 0, 1], ph: 0, lab: "Bell 态" },
  part: { c: [0.9, 0.2, -0.1, 0.4], ph: 0.8, lab: "部分纠缠" },
  f31: { c: [0, 1, 1, 0], ph: 0, lab: "(F-31) 的例子" },
  prod2: { c: [0.6, 0.3, 0.8, 0.4], ph: 0, lab: "乘积态（藏起来的）" },
};
export function SchmidtPlot() {
  const [st, setSt] = useState(S_PRESETS.part);
  const C = [[[st.c[0], 0], [st.c[1], 0]], [[st.c[2], 0], L.cscale([Math.cos(st.ph), Math.sin(st.ph)], st.c[3])]];
  const zero = C.flat().every(z => L.cabs(z) < 1e-12);
  if (zero) C[0][0] = [1, 0];
  const r = L.schmidt(C);
  let err = 0;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    let z = [0, 0];
    for (let k = 0; k < 2; k++) if (r.b[k]) z = L.cadd(z, L.cscale(L.cmul(r.a[k][i], r.b[k][j]), r.s[k]));
    err = Math.max(err, L.cabs(L.csub(z, r.Cn[i][j])));
  }
  const sep = r.s[1] < 1e-7;
  const set = (i, v) => setSt({ ...st, lab: "", c: st.c.map((x, k) => (k === i ? v : x)) });
  const lbl = ["c_{00}", "c_{01}", "c_{10}", R`|c_{11}|`];
  const ket = (Cn) => [[0, 0], [0, 1], [1, 0], [1, 1]].filter(([i, j]) => L.cabs(Cn[i][j]) > 5e-4).map(([i, j]) => `(${fc(Cn[i][j], 3)})\\ket{${i}}\\ket{${j}}`).join("+") || "0";
  const W = 300, Hh = 26;
  return (
    <div>
      <Seg options={Object.entries(S_PRESETS).map(([k, v]) => [k, v.lab])} value={Object.keys(S_PRESETS).find(k => S_PRESETS[k].lab === st.lab) || ""} onChange={k => setSt(S_PRESETS[k])} />
      <div style={row}>
        <div style={{ ...box, minWidth: 280 }}>
          {st.c.map((x, i) => <Slider key={i} label={"$" + lbl[i] + "$"} value={x} min={-1} max={1} step={0.01} onChange={v => set(i, v)} fmt={v => v.toFixed(2)} />)}
          <Slider label={R`$c_{11}$ 的相位`} value={st.ph} min={0} max={6.28} step={0.01} onChange={v => setSt({ ...st, lab: "", ph: v })} fmt={v => v.toFixed(2)} />
        </div>
        <div style={box}>
          <div className="muted" style={{ fontSize: 13 }}>归一化后的态与系数矩阵</div>
          <div><K t={R`\ket{\psi}=` + ket(r.Cn)} /></div>
          <K d t={R`\mathsf C=` + pm(r.Cn, 3) + R`,\quad\det\mathsf C=${fc(r.det, 4)}`} />
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Schmidt 系数（<K t={R`s_k^2`} /> 为 <K t={R`\rho_1=\mathsf C\mathsf C^\dagger`} /> 的本征值）</div>
          <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`}>
            <rect x="0" y="0" width={W * r.s[0] ** 2} height={Hh} fill="var(--blue)" />
            <rect x={W * r.s[0] ** 2} y="0" width={W * r.s[1] ** 2} height={Hh} fill="var(--gold)" />
          </svg>
          <div style={{ fontSize: 13 }}><span style={{ color: "var(--blue)" }}><K t={R`s_1^2=${(r.s[0] ** 2).toFixed(4)}`} /></span>　<span style={{ color: "var(--gold)" }}><K t={R`s_2^2=${(r.s[1] ** 2).toFixed(4)}`} /></span></div>
          <div><K t={R`s_1=${r.s[0].toFixed(4)},\ s_2=${r.s[1].toFixed(4)},\ \ S=${r.S.toFixed(4)}\ \text{bit},\ \ 2|\det\mathsf C|=${r.conc.toFixed(4)}=2s_1s_2`} /></div>
        </div>
      </div>
      <div style={box}>
        <div style={{ overflowX: "auto" }}><K t={R`\ket{\psi}=${r.s[0].toFixed(4)}\,` + colv(r.a[0], 3) + R`\otimes` + colv(r.b[0], 3) + (r.b[1] ? R`+${r.s[1].toFixed(4)}\,` + colv(r.a[1], 3) + R`\otimes` + colv(r.b[1], 3) : "")} /></div>
        <div className="muted" style={{ fontSize: 13 }}>重构误差 <K t={R`\max|\textstyle\sum_ks_k\,a_k b_k^{\mathsf T}-\mathsf C|=${sci(err)}`} /></div>
        <div style={{ marginTop: 6, fontWeight: 600, color: sep ? "var(--green)" : "var(--accent)" }}>
          {sep ? <>Schmidt 秩 = 1：这是一个乘积态，可写成 <K t={R`\ket{\varphi(1)}\ket{\chi(2)}`} />（式 F-6）。</> : <>Schmidt 秩 = 2：不能写成任何 <K t={R`\ket{\varphi(1)}\ket{\chi(2)}`} />——不是张量积的矢量（纠缠态）。</>}
        </div>
      </div>
    </div>);
}
