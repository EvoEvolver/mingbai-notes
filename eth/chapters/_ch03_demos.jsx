// 第 3 页的可运行示例（全部用 _rat.js 的 BigInt 有理数精确计算）：
//  1. DerivDemo   —— 按 (3.1) 由子矩阵积和式求 P(t0),…,P^{(h-1)}(t0)，对照"在 Q[z]/(z^{nd+1}) 上直接求积和式"
//  2. HermiteDemo —— ℓ 个点 × h 阶导数 → Hermite 插值恢复 P(0)；ℓh ≤ nd 时展示另一个同数据的候选
//  3. CostPlot    —— log₂ Σ_{a<h} C(n,a)² 与 h log₂(n/h)、2h log₂(en/h)、2nH(h/n)、n 的对比
import { useMemo, useState } from "react";
import { TxI, Plot, RunCard, Check, MatrixView, Slider } from "@kit";
import * as Q from "./_rat.js";
import { randomMatrixPoly, taylorEntries, A0of, derivBy31, derivDirect, pairCount, confluentVandermonde, logPairPrefix } from "./_ch03_calc.js";

const R = String.raw;
const { q, qint, qadd, qsub, qmul, qeq, qstr, Q0, Q1, fact, binom, range, permDP, sub, complement } = Q;
const short = x => { const s = qstr(x); return s.length > 22 ? s.slice(0, 9) + "…" + s.slice(-9) + ` (${s.replace("-", "").length} 位)` : s; };
const btn = { marginLeft: 8, padding: "2px 10px", cursor: "pointer" };

// ======================= 示例 1 =======================
export function DerivDemo() {
  const [n, setN] = useState(5), [h, setH] = useState(2), [t0, setT0] = useState(1), [seed, setSeed] = useState(1);
  const hh = Math.min(h, n);
  const res = useMemo(() => {
    const G = randomMatrixPoly(n, seed), E = taylorEntries(G, t0);
    const A0 = A0of(E), A1 = E.map(r => r.map(c => c[1]));         // A1 = A'(t0)（z 的一次系数）
    const by = derivBy31(E, hh), dir = derivDirect(E);
    // 一阶导数公式：Σ A'_{uv}(t0) per(A0 删去 u 行 v 列)
    let p1 = Q0;
    for (let u = 0; u < n; u++) for (let v = 0; v < n; v++) if (!Q.qzero(A1[u][v])) p1 = qadd(p1, qmul(A1[u][v], permDP(sub(A0, complement([u], n), complement([v], n)))));
    return { G, A0, A1, by, dir, p1 };
  }, [n, hh, t0, seed]);
  const { A0, A1, by, dir, p1 } = res;
  const allOk = by.ders.every((x, j) => qeq(x, dir[j]));
  const total = binom(2 * n, n);
  return (
    <RunCard title={R`示例 1：由子矩阵积和式求导数（\eqref{3.1}）`}
      lead={R`$A(t)=G_0+tG_1+t^2G_2$（$d=2$，稀疏随机整数）。左栏按 \eqref{3.1} 计算：枚举 $|S|=|T|=a<h$，大子矩阵积和式 $\per(A_0[S^c,T^c])$ 用子集 DP（扮演"单价 $T$ 的预言机"），小积和式 $\per(\Delta(z)[S,T])$ 用 Ryser 公式在 $\Q[z]/(z^h)$ 上算。右栏对照：在 $\Q[z]/(z^{nd+1})$ 上直接求 $\per(A(t_0+z))$，得到全部 Taylor 系数。`}>
      <div className="demo-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: "0.5em 1.5em", alignItems: "center" }}>
        <Slider label="$n$" value={n} min={3} max={6} onChange={v => { setN(v); setH(Math.min(h, v)); }} />
        <Slider label="$h$" value={hh} min={1} max={n} onChange={setH} />
        <Slider label="$t_0$" value={t0} min={0} max={3} onChange={setT0} />
        <span>随机种子 {seed}<button style={btn} onClick={() => setSeed(seed + 1)}>换一个矩阵</button></span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        <MatrixView M={A0} title={R`$A_0=A(t_0)$`} />
        <MatrixView M={A1} title={R`$A'(t_0)=[z^1]\Delta(z)$`} />
      </div>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th><TxI>{R`$j$`}</TxI></th><th><TxI>{R`按 \eqref{3.1}`}</TxI></th><th>直接法</th><th>一致</th></tr></thead>
        <tbody>{by.ders.map((x, j) => <tr key={j}>
          <td><TxI>{`$P^{(${j})}(t_0)$`}</TxI></td><td className="mono">{short(x)}</td><td className="mono">{short(dir[j])}</td><td>{qeq(x, dir[j]) ? "✔" : "✘"}</td></tr>)}</tbody>
      </table></div>
      <p><TxI>{R`**各层贡献**（行 = 导数阶 $j$，列 = 子集大小 $a$；"—"表示 $a>j$ 的层对 $z^j$ 系数恒为零——这就是整除性 $z^a\mid\per(\Delta(z)[S,T])$）：`}</TxI></p>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th></th>{range(by.contrib[0].length).map(a => <th key={a}><TxI>{`$a=${a}$`}</TxI></th>)}</tr></thead>
        <tbody>{by.contrib.map((row, j) => <tr key={j}><td><TxI>{`$j=${j}$`}</TxI></td>{row.map((x, a) => <td key={a} className="mono" style={{ color: a > j ? "#bbb" : undefined }}>{a > j ? "—" : short(x)}</td>)}</tr>)}</tbody>
      </table></div>
      <p><TxI>{R`枚举的子集对：$\sum_{a<h}\binom na^2=$ **${pairCount(n, hh)}**（其中小积和式非零的 ${by.nonzero} 对）；若不截断（所有 $a\le n$），共 $\binom{2n}{n}=$ ${total} 对。`}</TxI></p>
      {hh > n / 2 && <p className="muted"><TxI>{R`当前 $h>n/2$：式 \eqref{3.1} 照样精确成立，但 \sref{L3.1} 的代价界 $(n/h)^{O(h)}$ 不再适用——子集对数已接近全部 $\binom{2n}n$。`}</TxI></p>}
      <div className="chk-row">
        <Check ok={allOk} label={R`\eqref{3.1} = 直接法（全部 ${hh} 个导数）`} />
        {hh >= 2 && <Check ok={qeq(p1, by.ders[1])} label={R`$\sum_{u,v}A'_{uv}(t_0)\per(A_0\text{ 删去 }u\text{ 行 }v\text{ 列})=P'(t_0)$`} />}
        <Check ok={qeq(by.ders[0], permDP(A0))} label={R`$j=0$：$P(t_0)=\per(A_0)$`} />
      </div>
    </RunCard>);
}

// ======================= 示例 2 =======================
export function HermiteDemo() {
  const n = 4, d = 2, nd = n * d;
  const [seed, setSeed] = useState(1), [ell, setEll] = useState(3), [h, setH] = useState(3);
  const G = useMemo(() => randomMatrixPoly(n, seed), [seed]);
  const truth = useMemo(() => {                       // P(t) 在 0 处的系数（对照用）
    const D0 = derivDirect(taylorEntries(G, 0));
    const coef = D0.map((x, j) => Q.qdiv(x, q(fact(j))));
    let deg = coef.length - 1; while (deg > 0 && Q.qzero(coef[deg])) deg--;
    return { coef, deg, per0: permDP(G[0]) };
  }, [G]);
  const data = useMemo(() => range(ell).map(i => ({ x: qint(i + 1), ders: derivBy31(taylorEntries(G, i + 1), h).ders })), [G, ell, h]);
  const N = ell * h, enough = N > nd;
  const sol = useMemo(() => {
    const c = Q.hermite(data);
    const rk = Q.rank(confluentVandermonde(range(ell).map(i => i + 1), h));
    // 另一个候选：P~ = P + ∏(t−i)^h（次数 ℓh），在 0 处多出 ∏(−i)^h
    let prod = Q1; for (let i = 1; i <= ell; i++) prod = qmul(prod, Q.qpow(qint(-i), h));
    return { c, rk, alt0: qadd(truth.per0, prod) };
  }, [data, ell, h, truth]);
  const polyOk = enough && sol.c.every((x, k) => qeq(x, truth.coef[k] ?? Q0));
  return (
    <RunCard title={R`示例 2：Hermite 插值恢复 $P(0)=\per(A)$`}
      lead={R`同样的构造，$n=4$、$d=2$，故 $\deg P\le nd=8$。在 $t=1,\dots,\ell$ 每点用 \eqref{3.1} 算出 $P,P',\dots,P^{(h-1)}$，再解 $\ell h\times\ell h$ 的合流 Vandermonde 方程组。我们**从不**在 $t=0$ 求值；$\per(A)=\per(G_0)$ 只用来核对。`}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em 1.5em", alignItems: "center" }}>
        <Slider label="$\ell$" value={ell} min={1} max={9} onChange={setEll} />
        <Slider label="$h$" value={h} min={1} max={9} onChange={setH} />
        <button style={btn} onClick={() => setH(Math.floor(nd / ell) + 1)}><TxI>{R`按命题 3.2 取 $h=\lfloor nd/\ell\rfloor+1$`}</TxI></button>
        <span>种子 {seed}<button style={btn} onClick={() => setSeed(seed + 1)}>换一个矩阵</button></span>
      </div>
      <p><TxI>{R`数据量 $\ell h=${N}$，次数预算 $nd=${nd}$：${enough ? "**$\\ell h>nd$，数据足以唯一确定 $P$。**" : "**$\\ell h\\le nd$，数据不足。**"}（本例 $P$ 的实际次数为 ${truth.deg}；算法事先并不知道这一点，只能按上界 $nd$ 做账。）`}</TxI></p>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>点</th>{range(h).map(j => <th key={j}><TxI>{`$P^{(${j})}$`}</TxI></th>)}</tr></thead>
        <tbody>{data.map((p, i) => <tr key={i}><td><TxI>{`$t=${i + 1}$`}</TxI></td>{p.ders.map((x, j) => <td key={j} className="mono">{short(x)}</td>)}</tr>)}</tbody>
      </table></div>
      {enough ? <>
        <p><TxI>{R`插值得到 $P(0)=c_0=$ **${short(sol.c[0])}**；真值 $\per(A)=$ ${short(truth.per0)}。`}</TxI></p>
        <div className="chk-row">
          <Check ok={qeq(sol.c[0], truth.per0)} label={R`插值的 $P(0)=\per(A)$`} />
          <Check ok={polyOk} label={R`恢复的全部系数与真实 $P$ 一致（次数 $>${truth.deg}$ 的系数为 0）`} />
          <Check ok={sol.rk === N} label={R`合流 Vandermonde 矩阵满秩（${sol.rk} = ${N}）`} />
        </div>
      </> : <>
        <p><TxI>{R`信息不足的直接证据：$\widetilde P(t)=P(t)+\prod_{i=1}^{${ell}}(t-i)^{${h}}$ 的次数是 $\ell h=${N}\le nd$，同样是一个"合法候选"，它在每个点的 $0,\dots,${h - 1}$ 阶导数与 $P$ **完全相同**（多出的项在每个点都有 $h$ 重零点），但 $\widetilde P(0)=$ ${short(sol.alt0)} $\ne$ $P(0)=$ ${short(truth.per0)}。只看数据，无法区分二者。`}</TxI></p>
        <p className="muted"><TxI>{R`若硬解 $\ell h\times\ell h$ 方程组，得到的是次数 $<\ell h$ 的那个插值多项式，它在 0 处给出 ${short(sol.c[0])}${qeq(sol.c[0], truth.per0) ? `——这里碰巧正确，只是因为本例 $P$ 的实际次数 ${truth.deg} $<\\ell h$；对一般的次数 $\\le nd$ 的 $P$ 没有保证` : "，与真值不符"}。`}</TxI></p>
        <Check ok={false} label={R`$\ell h\le nd$：不能保证恢复`} />
      </>}
    </RunCard>);
}

// ======================= 示例 3：曲线图 =======================
export function CostPlot() {
  return (
    <RunCard title={R`示例 3：子集对个数何时远小于 $2^n$`}
      lead={R`纵轴是"以 $n$ 为单位的指数"：画出 $\frac1n\log_2(\cdot)$。$y=1$ 就是 $2^n$ 的水平（Ryser 公式的代价）。实线是精确的 $\frac1n\log_2\sum_{a<h}\binom na^2$（$h=\mathrm{round}(n\cdot h/n)$，log-sum-exp 精确累加）；它贴近 $2H(h/n)$，并夹在 $h\log_2(n/h)$ 与 $2h\log_2(\mathrm{e}n/h)$ 之间——这就是 $(n/h)^{O(h)}$ 的含义。拖动 $n$：曲线几乎不动，说明指数只取决于比例 $h/n$。`}>
      <Plot
        x={{ label: R`h/n`, log: true, domain: [1e-4, 0.5] }}
        y={{ label: R`\tfrac1n\log_2(\cdot)`, log: true, domain: [5e-4, 4] }}
        params={[{ id: "n", label: R`n`, min: 100, max: 1000000, log: true, value: 1000 }]}
        samples={220}
        series={p => {
          const n = Math.round(p.n), pre = logPairPrefix(n);
          const H2 = x => -x * Math.log2(x) - (1 - x) * Math.log2(1 - x);
          return [
            { label: R`\tfrac1n\log_2\sum_{a<h}\binom na^2`, f: x => { const h = Math.round(x * n); return h < 1 || h > n / 2 ? NaN : pre[h] / n; }, width: 2.5 },
            { label: R`2H(h/n)`, f: x => 2 * H2(x), dash: "dot", color: "#b8862b", width: 2 },
            { label: R`\tfrac hn\log_2\tfrac nh`, f: x => x * Math.log2(1 / x), dash: "dash" },
            { label: R`\tfrac{2h}{n}\log_2\tfrac{\mathrm{e}n}{h}`, f: x => 2 * x * Math.log2(Math.E / x), dash: "dashdot" },
            { label: R`1\ (2^n)`, f: () => 1, color: "#9b2c1f", width: 1.5 },
          ];
        }}
        vlines={p => {
          const n = Math.round(p.n), pre = logPairPrefix(n);
          for (let h = 1; h < pre.length; h++) if (pre[h] >= n) return [{ x: h / n, label: R`\approx${(h / n).toFixed(3)}` }];
          return [];
        }} />
      <p className="muted"><TxI>{R`读图：子集对个数在 $h/n\approx0.11$（$2H(h/n)=1$ 处）就追上了 $2^n$——过了这里，"求导数再插值"还不如直接用 Ryser。全文的参数让 $h/n\approx d/\ell\to0$：例如 $h/n=10^{-3}$ 时指数只有约 $0.02\,n$。`}</TxI></p>
    </RunCard>);
}
