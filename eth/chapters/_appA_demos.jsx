// 附录 A 的可运行示例与交互图。计算全部在 _appA_calc.jsx（精确有理数）。
import { useEffect, useMemo, useState } from "react";
import { Plot, TxI, RunCard, Check, MatrixView, Slider, Seg } from "@kit";
import { qtex, qeq, qstr, binom, range } from "./_rat.js";
import { runAll, pairingDemo } from "./_appA_calc.jsx";

const R = String.raw;
const M = ({ children }) => <TxI>{"$" + children + "$"}</TxI>;
const polyTex = (c, v) => {
  const parts = [];
  c.forEach((x, k) => { if (x.n === 0n) return; const s = x.n < 0n ? "-" : "+"; const a = x.n < 0n ? -x.n : x.n;
    const coef = a === 1n && k > 0 ? "" : String(a); parts.push(`${s}${coef}${k === 0 ? "" : k === 1 ? v : `${v}^{${k}}`}`); });
  if (!parts.length) return "0";
  const s = parts.join(""); return s.startsWith("+") ? s.slice(1) : s;
};
const vec = a => `(${a.join(",")})`;

// ---------------- 示例 1：三种算法同一结果 ----------------
export function ThreeWaysDemo() {
  const [n, setN] = useState(5), [r, setR] = useState(2), [seed, setSeed] = useState(1);
  const o = useMemo(() => runAll(n, r, seed), [n, r, seed]);
  const N = o.grid.N;
  const [k, setK] = useState(N), [play, setPlay] = useState(false);
  useEffect(() => { setK(N); setPlay(false); }, [N, seed]);
  useEffect(() => {
    if (!play) return;
    const step = Math.max(1, Math.round(N / 240));
    const id = setInterval(() => setK(x => { if (x + step >= N) { setPlay(false); return N; } return x + step; }), 40);
    return () => clearInterval(id);
  }, [play, N]);
  const cur = o.grid.terms[Math.max(0, k - 1)];
  const ok1 = qeq(o.direct, o.viaTable), ok2 = qeq(o.direct, o.grid.value), ok3 = qeq(o.direct, o.lemma.value);
  const tableBound = (n + 1) ** (2 * r), tableExact = Number(binom(n + r, r)) ** 2;
  const nb = o.inst.blocks.length;
  const gridStore = (n + 1) ** 2 + 2 * r + 2 * n + 2 + nb;
  const lab = p => range(n).map(i => p + (i + 1));
  return (
    <RunCard title="三种算法，同一个 $\per(B+UV^{\mathsf T})$" lead={R`(a) 直接子集 DP；(b) 展开 $F=\prod_bF_b$ 的系数表（即 \sref{L2.1} 的 $W(\nu,\xi)$）再套 $\cL_r$，即 \eqref{A.3}；(c) 网格求和 \eqref{A.5}：逐点求 $F(a,b)$、乘权重、累加。全部为精确有理数运算。对应块故意取成非方的（行组、列组大小不同），这在 \sref{L2.1} 中是允许的。`}>
      <div className="demo-ctl" style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <span><M>n</M>：<Seg options={[4, 5, 6]} value={n} onChange={setN} /></span>
        <span><M>r</M>：<Seg options={[1, 2]} value={r} onChange={setR} /></span>
        <button onClick={() => setSeed(seed + 1)}>换一组随机矩阵（#{seed}）</button>
      </div>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
        <MatrixView M={o.inst.B} rowGroups={o.inst.rowGroup} colGroups={o.inst.colGroup} title={`$B$（块：行 ${o.inst.blocks.map(b => b.rows.length).join("+")}，列 ${o.inst.blocks.map(b => b.cols.length).join("+")}）`} cell={26} />
        <MatrixView M={o.inst.U} title="$U$" cell={26} />
        <MatrixView M={o.inst.V} title="$V$" cell={26} />
        <MatrixView M={o.inst.A} rowGroups={o.inst.rowGroup} colGroups={o.inst.colGroup} title={R`$A=B+UV^{\mathsf T}$`} cell={30} />
      </div>
      <table className="tb-table" style={{ marginTop: 10 }}>
        <thead><tr><th>方法</th><th>结果</th><th>需要同时保存的数</th></tr></thead>
        <tbody>
          <tr><td>(a) 子集 DP（直接）</td><td><M>{qtex(o.direct)}</M></td><td>子集状态至多 <M>{`2^n=${2 ** n}`}</M> 个</td></tr>
          <tr><td>(b) 系数表 + <M>\cL_r</M></td><td><M>{qtex(o.viaTable)}</M></td><td>表中非零项 <b>{o.F.size}</b>（可能的下标对 <M>{R`\binom{n+r}{r}^2=${tableExact}`}</M>，原文上界 <M>{R`(n+1)^{2r}=${tableBound}`}</M>）；各块 <M>F_b</M> 的非零系数 {o.perBlock.join(", ")}</td></tr>
          <tr><td>(c) 网格求和 <TxI>{R`\eqref{A.5}`}</TxI></td><td><M>{qtex(o.grid.value)}</M></td><td><M>\kappa</M> 表 <M>{R`(n+1)^2=${(n + 1) ** 2}`}</M> + 当前点 <M>{R`2r=${2 * r}`}</M> + 线性型值 <M>{R`2n`}</M> + 块部分积 + 累加器，合计 <M>{R`\approx${gridStore}`}</M>，与 <M>r</M> 的指数无关</td></tr>
        </tbody>
      </table>
      <div className="chk-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "8px 0" }}>
        <Check ok={ok1} label="(a) = (b)" />
        <Check ok={ok2} label="(a) = (c)" />
        <Check ok={ok3} label={R`(a) = \sref{L2.1} 的 permBlockLowRank`} />
        <Check ok={o.F.size === o.W.size && [...o.F].every(([kk, c]) => qeq(c, o.W.get(kk)))} label={R`$F$ 的系数表 = \sref{L2.1} 颜色计数 DP 逐块卷积得到的 $W(\nu,\xi)$`} />
      </div>
      <h4 style={{ margin: "14px 0 6px" }}>网格求和的累加过程</h4>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
        <MatrixView M={o.K} title={`$\\kappa_{ab}$（$${n + 1}\\times${n + 1}$，只依赖 $n$）`} cell={n <= 4 ? 56 : 30} show={n <= 4} rowLabels={range(n + 1).map(String)} colLabels={range(n + 1).map(String)} />
        <div style={{ flex: "1 1 300px", minWidth: 280 }}>
          <Slider label={`已处理网格点（共 $(n+1)^{2r}=${N}$）`} value={k} min={1} max={N} onChange={v => { setPlay(false); setK(v); }} />
          <button onClick={() => { if (k >= N) setK(1); setPlay(!play); }}>{play ? "暂停" : "▶ 播放累加"}</button>
          {cur && <div style={{ marginTop: 8, lineHeight: 1.9 }}>
            <div>当前点 <M>{`a=${vec(cur.a)},\\ b=${vec(cur.b)}`}</M></div>
            <div>权重 <M>{`\\prod_c\\kappa_{a_cb_c}=${qtex(cur.wt)}`}</M></div>
            <div><M>{`F(a,b)=${qtex(cur.F)}`}</M></div>
            <div>累加器 <M>{`\\textstyle\\sum=${qtex(cur.acc)}`}</M> {k === N && <Check ok={ok2} label="最终 = 直接积和式" />}</div>
            <div className="muted" style={{ fontSize: "0.88em" }}>中途的部分和可以很怪（分数、巨大数值）——只有走完全部网格点，抵消才完成。算法本身只保留"当前点"和"累加器"；这里保留全部项只是为了让你能拖动回看。</div>
          </div>}
        </div>
      </div>
    </RunCard>);
}

// ---------------- 示例 2：单变量配对泛函 ----------------
export function PairingDemo() {
  const [n, setN] = useState(3), [seed, setSeed] = useState(1);
  const o = useMemo(() => pairingDemo(n, seed), [n, seed]);
  const sym = o.K.every((row, a) => row.every((x, b) => qeq(x, o.K[b][a])));
  return (
    <RunCard title="单变量配对：$\sum_{a,b}\kappa_{ab}f(a)g(b)=\sum_kk!\,f_kg_k$" lead={R`选节点数 $n+1$，下面列出 Lagrange 基 $\Lambda_a$ 的系数矩阵 $C_{ak}=[t^k]\Lambda_a$ 与由 \eqref{A.4} 算出的 $\kappa$；再取两个次数 $\le n$ 的随机整系数多项式 $f,g$，比较"网格值加权和"与"系数的阶乘配对"。`}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ minWidth: 240 }}><Slider label="$n$" value={n} min={1} max={8} onChange={setN} /></div>
        <button onClick={() => setSeed(seed + 1)}>换一对随机多项式（#{seed}）</button>
      </div>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
        <MatrixView M={o.C} title={R`$C_{ak}=[t^k]\Lambda_a(t)$（行 $a$，列 $k$）`} cell={n > 5 ? 52 : 44} rowLabels={range(n + 1).map(String)} colLabels={range(n + 1).map(String)} show={n <= 5} />
        <MatrixView M={o.K} title={R`$\kappa_{ab}$`} cell={n > 5 ? 52 : 44} rowLabels={range(n + 1).map(String)} colLabels={range(n + 1).map(String)} show={n <= 5} />
      </div>
      {n > 5 && <div className="muted"><TxI>{`（$n>5$ 时矩阵项太长，只显示颜色；例如 $\\kappa_{00}=${qtex(o.K[0][0])}$。）`}</TxI></div>}
      <div style={{ lineHeight: 2 }}>
        <div><M>{`f(t)=${polyTex(o.f, "t")}`}</M>，<M>{`g(t)=${polyTex(o.g, "t")}`}</M></div>
        <div>网格值 <M>{`f(0..n)=(${o.fv.map(qstr).join(",")})`}</M>，<M>{`g(0..n)=(${o.gv.map(qstr).join(",")})`}</M></div>
        <div>左边 <M>{`\\sum_{a,b}\\kappa_{ab}f(a)g(b)=${qtex(o.lhs)}`}</M>　右边 <M>{`\\sum_k k!\\,f_kg_k=${qtex(o.rhs)}`}</M></div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Check ok={qeq(o.lhs, o.rhs)} label="左边 = 右边" />
        <Check ok={o.monoOK} label={`对全部单项式：$\\sum_{a,b}\\kappa_{ab}a^ib^j=i!\\,[i=j]$（$0\\le i,j\\le ${n}$）`} />
        <Check ok={sym} label="$\kappa$ 对称" />
      </div>
    </RunCard>);
}

// ---------------- 交互图：存储量随 r 的增长 ----------------
export function SpacePlot() {
  return (
    <figure style={{ margin: "1.2em 0" }}>
      <Plot
        x={{ label: R`r\ (\text{颜色数 / 秩})`, domain: [1, 12] }}
        y={{ label: R`\text{需同时保存的数的个数}`, log: true, domain: [10, 1e60] }}
        params={[{ id: "n", label: R`n`, min: 8, max: 10000, log: true, value: 100 }]}
        series={p => {
          const n = Math.round(p.n), rs = range(12).map(i => i + 1);
          const lb = (a, b) => { let s = 0; for (let i = 1; i <= b; i++) s += Math.log(a - b + i) - Math.log(i); return s; };
          return [
            { label: R`(n+1)^{2r}\ (\text{原文上界 = 网格点数 = 时间})`, data: rs.map(r => [r, Math.pow(n + 1, 2 * r)]) },
            { label: R`\binom{n+r}{r}^2\ (\text{系数表的精确下标数})`, data: rs.map(r => [r, Math.exp(2 * lb(n + r, r))]), dash: "dash" },
            { label: R`(n+1)^2+2r+2n+O(1)\ (\text{(A.5) 方案})`, data: rs.map(r => [r, (n + 1) ** 2 + 2 * r + 2 * n + 4]), color: "#2c6e49" },
          ];
        }}
        caption={R`系数表方案的存储随 $r$ 指数增长（对数纵轴上是直线），网格求和方案几乎不随 $r$ 变化。两条上方曲线同时也是两种方案的**时间**——网格点数与表的大小同阶，所以时间没有损失。拖动 $n$ 观察。`} />
    </figure>);
}
