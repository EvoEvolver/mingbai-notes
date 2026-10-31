// 参数账本 / 复杂度计算器：拖动 n（以 log₂n 计），按 \eqref{6.1} 选参数，逐项列出各阶段代价（以 n 的比例表示的 2 的指数）。
// 所有量在对数空间里算，因而 n 可以取到 2^{10^{12}}。常数（q 的指数 10、d 的常数 100、误差指数 100）可调，用来体会"为什么这样选"。
import { useMemo, useState } from "react";
import { TxI, Plot, Slider } from "@kit";

const R = String.raw;
const lg = Math.log2;
const H2 = p => (p <= 0 || p >= 1 ? 0 : -p * lg(p) - (1 - p) * lg(1 - p));   // 二元熵

// 按论文 (6.1) 计算全部参数；L = log₂ n
export function params(L, { Delta = 3, aq = 10, cd = 100, A = 100 } = {}) {
  const qr = Math.pow(L, aq), q = qr < 1e15 ? Math.ceil(qr) : qr, lq = lg(q);
  const ell = Math.max(1, Math.ceil((L / 2 + lg(16 * Delta)) / lq));
  const lQ = ell * lq;
  const d = Math.ceil(cd * Math.sqrt(ell * Math.max(lg(ell), 1e-9)));
  const lM = ell * (lq + lg(Math.max(q - 1, 1)));
  const hn = Math.min(1, d / ell);                         // h/n ≈ d/ℓ
  const sn = 3 / q;                                         // s/n
  const lr = Math.min(lM - A * lg(ell), L);                 // log₂ r（r ≤ M/ℓ^A，且秩不超过 n）
  const lrLn = lr + lg(L) - L, rLn = Math.pow(2, Math.min(60, lrLn));    // r·log n / n（同时保留其对数）
  const deriv = hn <= 0.5 ? 2 * H2(hn) : 2;                 // log₂ Σ_{a<h} C(n,a)² / n（h > n/2 时退化为 ≈ 4^n）
  const asym = hn < 1 ? hn * lg(1 / hn) : 0;                // h·log(n/h)/n
  const point = 3 * sn + 4 * rLn;                           // 每个特殊点：2^{2s}·2^{s} 与 (n+1)^{4r}
  const total = deriv + point;
  const tail = Math.log(2) - d * d / (8 * ell) <= -A * Math.log(ell);   // 2e^{-d²/8ℓ} ≤ ℓ^{-A}
  return {
    L, q, lq, ell, lQ, d, lM, hn, sn, lr, rLn, lrLn, deriv, asym, point, total, tail,
    conds: [
      { ok: lQ <= L, tex: R`Q\le n`, why: "引理 4.1 / (4.5)" },
      { ok: q >= 4 * Delta * ell, tex: R`q\ge4\Delta\ell`, why: "引理 4.1" },
      { ok: d <= ell, tex: R`d\le\ell`, why: R`(5.5) 的插值窗口放得进 $[0,\ell]$` },
      { ok: tail, tex: R`2e^{-d^2/8\ell}\le\ell^{-A}`, why: "(5.6)" },
      { ok: hn <= 0.5, tex: R`h\le n/2`, why: "命题 3.2" },
    ],
  };
}
const fmtPow = l => (l < 40 ? (Math.pow(2, l) < 1e6 ? String(Math.round(Math.pow(2, l))) : `2^{${l.toFixed(1)}}`) : `2^{${l < 1e5 ? l.toFixed(0) : l.toExponential(2).replace(/e\+?(\d+)/, "\\times10^{$1}")}}`);
const fmtLog = l => (l > -9 ? fmtN(Math.pow(2, l)) : `2^{${l > -1e5 ? l.toFixed(0) : l.toExponential(2).replace(/e\+?(-?)(\d+)/, "\\times10^{$1$2}")}}`);
const fmtN = v => (v === 0 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(2).replace(/e\+?(-?)(\d+)/, "\\times10^{$1$2}") : String(+v.toPrecision(3)));

export function Ledger({ initial = 9 }) {
  const [x, setX] = useState(initial);            // x = log10(log2 n)
  const [Delta, setDelta] = useState(3), [aq, setAq] = useState(10), [cd, setCd] = useState(100), [A, setA] = useState(100);
  const L = Math.pow(10, x);
  const P = useMemo(() => params(L, { Delta, aq, cd, A }), [L, Delta, aq, cd, A]);
  const rows = [
    { k: R`q`, f: R`\lceil(\log n)^{${aq}}\rceil`, v: fmtPow(P.lq), eq: "6.1" },
    { k: R`\ell`, f: R`\lceil\log_q(16\Delta\sqrt n)\rceil`, v: String(P.ell), eq: "6.1" },
    { k: R`Q=q^\ell`, f: R`16\Delta\sqrt n\le Q<16\Delta q\sqrt n`, v: fmtPow(P.lQ) },
    { k: R`M=(q(q-1))^\ell`, f: R`\le Q^2`, v: fmtPow(P.lM) },
    { k: R`d`, f: R`\lceil${cd}\sqrt{\ell\log\ell}\rceil`, v: String(P.d), eq: "6.1" },
    { k: R`h/n`, f: R`\approx d/\ell`, v: fmtN(P.hn) },
    { k: R`s/n`, f: R`\le 3/q`, v: fmtN(P.sn) },
    { k: R`r/n`, f: R`r\le M/\ell^{${A}}`, v: P.lr < 0 ? R`r<1\ (\Rightarrow r=0)` : fmtLog(P.lr - P.L) },
  ];
  const costs = [
    { k: "导数：子矩阵对的个数", f: R`\textstyle\sum_{a<h}\binom na^2\approx2^{2nH(h/n)}`, v: P.deriv, asym: R`h\log(n/h)=${fmtN(P.asym)}\,n` },
    { k: "特殊点：块内枚举", f: R`2^{2s}\cdot2^{s}`, v: 3 * P.sn, lv: lg(3) - P.lq },
    { k: "特殊点：颜色表", f: R`(n+1)^{4r}`, v: 4 * P.rLn, lv: 2 + P.lrLn },
  ];
  const mx = Math.max(...costs.map(c => c.v), 1);
  const verdict = P.conds.every(c => c.ok) && P.total < 1;
  return (
    <div className="ledger card">
      <div className="ledger-top">
        <Slider label={R`$\log_2 n$`} value={x} min={1} max={12} step={0.05} onChange={setX} fmt={() => (L < 1e6 ? Math.round(L).toLocaleString() : `10^${x.toFixed(2)}`)} />
        <Slider label={R`$\Delta$`} value={Delta} min={2} max={20} onChange={setDelta} />
        <Slider label={R`$q$ 的指数`} value={aq} min={1} max={20} step={0.5} onChange={setAq} />
        <Slider label={R`$d$ 的常数`} value={cd} min={5} max={120} onChange={setCd} />
        <Slider label={R`$\varepsilon=\ell^{-A}$ 的 $A$`} value={A} min={2} max={150} onChange={setA} />
      </div>
      <table><thead><tr><th>参数</th><th>取法</th><th>当前值</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}><td><TxI>{`$${r.k}$`}</TxI></td><td><TxI>{`$${r.f}$`}</TxI>{r.eq && <span className="muted"> · <TxI>{`\\eqref{${r.eq}}`}</TxI></span>}</td><td className="num"><TxI>{`$${r.v}$`}</TxI></td></tr>)}</tbody></table>
      <div style={{ marginTop: 8 }}>{P.conds.map((c, i) => <span key={i} className={"cond " + (c.ok ? "ok" : "bad")}>{c.ok ? "✔" : "✘"} <TxI>{`$${c.tex}$`}</TxI> <span className="muted">（<TxI>{c.why}</TxI>）</span></span>)}</div>
      <table><thead><tr><th><TxI>{R`代价项（$\log_2$ 代价 $\div n$）`}</TxI></th><th>来源</th><th>值</th><th style={{ width: "28%" }}></th></tr></thead>
        <tbody>{costs.map((c, i) => <tr key={i} className={c.v === mx ? "dom" : ""}><td>{c.k}</td><td><TxI>{`$${c.f}$`}</TxI>{c.asym && <div className="muted"><TxI>{`渐近式 $${c.asym}$`}</TxI></div>}</td><td className="num"><TxI>{`$${c.lv != null && c.v < 1e-9 ? fmtLog(c.lv) : fmtN(c.v)}$`}</TxI></td><td><div className="bar" style={{ width: `${Math.min(100, 100 * c.v / mx)}%` }} /></td></tr>)}
          <tr><td><b>合计（指数 ÷ n）</b></td><td><TxI>{R`对比 Ryser：$\log_2(n2^n)/n\approx1$`}</TxI></td><td className="num"><b><TxI>{`$${fmtN(P.total)}$`}</TxI></b></td><td /></tr></tbody></table>
      <div className="ledger-verdict"><TxI>{verdict
        ? R`在这个 $n$ 上，全部条件成立，且总指数 $\approx ${fmtN(P.total)}\,n<n$：算法比 $2^n$ 快。主项是导数项——正如第 6 节所说"导数代价占主导"。`
        : R`在这个 $n$ 上${P.conds.some(c => !c.ok) ? "仍有条件不成立" : "条件都成立，但总指数还没有低于 n"}。论文的界是**渐近**的（"for sufficiently large n"）：按文中的显式常数，要到 $\log_2 n$ 极大时各项才进入渐近区。把 $d$ 的常数调小（约 24 已足以保证 (5.6)）可以看到门槛大幅下降。`}</TxI></div>
    </div>);
}

// 总指数 / n 随 log₂n 的变化（对数横轴）
export function LedgerPlot() {
  return <Plot
    x={{ label: R`\log_2 n`, log: true, domain: [1e2, 1e12] }}
    y={{ label: R`\log_2(\text{代价})/n`, log: true, domain: [1e-6, 10] }}
    params={[
      { id: "cd", label: R`d\ \text{的常数}`, min: 10, max: 100, step: 1, value: 100 },
      { id: "aq", label: R`q\ \text{的指数}`, min: 2, max: 12, step: 0.5, value: 10 },
      { id: "A", label: R`A`, min: 5, max: 100, step: 1, value: 100 },
    ]}
    samples={260}
    series={p => [
      { label: R`\text{总计}`, f: L => params(L, p).total, width: 2.6 },
      { label: R`2H(h/n)\ (\text{导数})`, f: L => params(L, p).deriv, dash: "dash" },
      { label: R`3s/n`, f: L => 3 * params(L, p).sn, dash: "dot" },
      { label: R`4r\log n/n`, f: L => Math.max(1e-9, 4 * params(L, p).rLn), dash: "dashdot" },
      { label: R`\text{Ryser}\ (=1)`, f: () => 1, color: "#999" },
      { label: R`(\log\log n)^2/\sqrt{\log n}`, f: L => lg(L) ** 2 / Math.sqrt(L), color: "#16808a", dash: "dot" },
    ]}
    caption={R`横轴 $\log_2 n$ 取对数刻度（$10^2$ 到 $10^{12}$）。每条曲线是一项代价的以 2 为底的指数除以 $n$。总计曲线低于灰线（Ryser）时算法才真正比 $2^n$ 快；青色点线是定理中的渐近形状 $(\log\log n)^2/\sqrt{\log n}$（不含常数）。`}
  />;
}
