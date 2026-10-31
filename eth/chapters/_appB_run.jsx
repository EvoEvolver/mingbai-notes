// 附录 B 的浏览器内可运行示例与交互图。纯计算在 _appB_calc.js（可在 node 中单独测试）。
import { useEffect, useMemo, useState } from "react";
import { Plot, TxI, RunCard, Check, Slider, Seg, MatrixView } from "@kit";
import * as K from "./_appB_calc.js";

const R = String.raw;
const lg = Math.log2;

// ---------------------------------------------------------------- σ 的选择（交互图）
export function SigmaPlot() {
  return (
    <figure className="card" style={{ padding: "8px 12px" }}>
      <Plot x={{ label: R`\log_2\log_2 n`, domain: [5, 100] }} y={{ label: R`\text{exponent}/n`, log: true, domain: [1e-12, 30] }} samples={200}
        series={[
          { label: R`\sigma=(\log n)^{-1/32}:\ \text{leaves}`, f: X => Math.pow(2, -X / 32) },
          { label: R`\sigma=(\log n)^{-1/32}:\ \text{per leaf}`, f: X => X * X * Math.pow(2, -7 * X / 32), dash: "dash" },
          { label: R`\rho(n)/n`, f: X => X * X * Math.pow(2, -X / 2) },
          { label: R`\sigma=1/\lceil\log n\rceil:\ \text{leaves}`, f: X => Math.pow(2, -X), dash: "dot" },
        ]}
        vlines={[{ x: 65, label: R`\text{crossover}` }]}
        caption={R`各项代价的指数除以 $n$（所有 $O(\cdot)$ 常数取 1，对数以 2 为底），横轴是 $\log_2\log_2n$——这些都是渐近量，曲线只在 $\log n$ 极大时才分出先后。直接稀疏化（$\sigma=(\log n)^{-1/32}$）的总代价是黑线（叶子数）与红虚线（每叶计数）中的较大者：由于 $(\log\log n)^2$ 因子，红虚线要到 $\log_2\log_2n\approx65$ 才落到黑线之下，此后叶子数主导，与原文"叶子数主导"的渐近结论一致。两者都远高于绿线 $\rho(n)/n$。附录 B 取 $\sigma=1/\lceil\log n\rceil$，叶子代价（点线 $1/\log n$）始终低于 $\rho(n)/n$，于是总代价由 $\rho(n)$ 决定。`} />
    </figure>);
}

// ---------------------------------------------------------------- (B.2) 布尔有限差分
export function FiniteDiffDemo() {
  const [v, setV] = useState(5), [N, setN] = useState(6), [i, setI] = useState(2), [h, setH] = useState(4), [seed, setSeed] = useState(1);
  const r = useMemo(() => {
    const inst = K.fdInstance(v, N, K.rng(seed * 97 + v * 13 + N));
    const d = K.fdDirect(inst, i, h), e = K.fdB2(inst, i, h);
    const xs = 5 % (1 << v);
    const mob = K.mobiusCheck(inst, i, h, xs);
    return { d, e, mob, bound: K.pairBound(v, h), xs, inst };
  }, [v, N, i, h, seed]);
  const ok = r.d.every((x, j) => x === r.e.val[j]);
  return (
    <RunCard title={R`\eqref{B.2} 的小规模验证：布尔有限差分 = Taylor 系数`}
      lead={R`随机取 $v$ 个变量、$N$ 个因子（每个因子 $\phi_e(y_1,y_2)=c_0+c_1y_1+c_2y_2+c_3y_1y_2$ 读两个输入出现），拷贝映射取任意多项式变形 $C(\theta)=C+\theta A_1+\theta^2A_2$（整数矩阵）。左列直接在 $\mathbb Z[\tau]/(\tau^h)$ 中展开 $P(i+\tau)=\sum_x\Phi(C(i)x+\Delta_i(\tau)x)$；右列只用 $|S|<h$ 的 $(S,T)$ 对按 \eqref{B.2} 计算。\eqref{B.2} 对**任意** $C(\theta)$ 成立，不依赖 \sref{T5.1} 的特殊构造。`}>
      <div className="run-row">
        <div style={{ minWidth: 300, flex: 1 }}>
          <Slider label="$v$（变量数）" value={v} min={3} max={6} onChange={setV} />
          <Slider label="$N$（因子数）" value={N} min={2} max={8} onChange={setN} />
          <Slider label="特殊点 $i$" value={i} min={1} max={3} onChange={setI} />
          <Slider label="$h$（导数个数）" value={h} min={1} max={5} onChange={setH} />
          <button className="run-btn" onClick={() => setSeed(seed + 1)}>换一个随机实例</button>
        </div>
        <div className="run-out" style={{ flex: 1.4, minWidth: 320 }}>
          <table><thead><tr><th><TxI>{String.raw`$j$`}</TxI></th><th>直接展开</th><th><TxI>{R`按 \eqref{B.2}`}</TxI></th></tr></thead>
            <tbody>{r.d.map((x, j) => <tr key={j}><td>{j}</td><td>{String(x)}</td><td>{String(r.e.val[j])}</td></tr>)}</tbody></table>
          <div style={{ marginTop: 6 }}>
            <Check ok={ok} label="两列逐项相等：$P^{(j)}(i)/j!$" />
            <Check ok={BigInt(r.e.pairs) === r.bound} label={`用到的 $(S,T)$ 对数 ${r.e.pairs} $=\\sum_{j<h}2^j\\binom vj$`} />
          </div>
        </div>
      </div>
      <div className="run-out" style={{ marginTop: 8 }}>
        <TxI>{R`**次数界的直接检验**（固定 $x=$ `}</TxI><code>{r.xs.toString(2).padStart(v, "0")}</code><TxI>{R`）：对 $F_{x,j}(y)=[\tau^j]\Phi(C(i)x+\Delta_i(\tau)y)$ 的多线性化做**全部** $2^v$ 个 Möbius 系数 $c_S$，看次数是否 $\le j$。`}</TxI>
        <table><thead><tr><th><TxI>{String.raw`$j$`}</TxI></th><th>多线性次数</th><th><TxI>{String.raw`$\max_{|S|>j}|c_S|$`}</TxI></th></tr></thead>
          <tbody>{r.mob.map(m => <tr key={m.j}><td>{m.j}</td><td>{m.deg}</td><td>{String(m.maxHigh)}</td></tr>)}</tbody></table>
        <Check ok={r.mob.every(m => m.deg <= m.j && m.maxHigh === 0n)} label="每个 $F_{x,j}$ 对 $y$ 的次数 $\le j$（$|S|>j$ 的系数全为 0）" />
      </div>
    </RunCard>);
}

// ---------------------------------------------------------------- 定理 B.2：模 2^b 技巧
export function QuarticGapDemo() {
  const [v, setV] = useState(10), [L, setL] = useState(30), [db, setDb] = useState(2), [seed, setSeed] = useState(1);
  const b = v + db;
  const r = useMemo(() => {
    const mons = K.randQuartic(v, L, K.rng(seed * 131 + v * 7 + L));
    const g = K.gapDirect(mons, v), t = K.gapTrunc(mons, v, b);
    return { mons, g, t };
  }, [v, L, b, seed]);
  const { g, t, mons } = r;
  const monTex = mons.slice(0, 8).map(m => [...Array(v).keys()].filter(k => (m >> k) & 1).map(k => `x_{${k + 1}}`).join("")).join("+");
  const exact = BigInt(g) === t.residue;
  return (
    <RunCard title={R`\sref{TB.2} 的模 $2^b$ 技巧：截断乘积之和的中心剩余 = gap`}
      lead={R`随机生成 $v$ 个变量上至多 $L$ 个、次数 $\le4$ 的单项式（模 2 消去重复）。左：直接枚举 $\gap(Q)=\sum_x(-1)^{Q(x)}$。右：按 \eqref{B.3} 在 $\mathbb Z[u]/(u^b)$ 中求 $\sum_x\Phi(u,x)$ 的系数向量（这里逐点求，\sref{LB.1} 用结构化求值算出同一向量），把系数相加，取模 $2^b$ 的中心剩余。拖动"$b-v$"看看 $b$ 太小时会怎样。`}>
      <div className="run-row">
        <div style={{ minWidth: 300, flex: 1 }}>
          <Slider label="$v$（变量数）" value={v} min={4} max={12} onChange={setV} />
          <Slider label="$L$（单项式数上限）" value={L} min={4} max={80} onChange={setL} />
          <Slider label="$b-v$" value={db} min={-3} max={3} onChange={setDb} fmt={x => (x > 0 ? "+" + x : x)} />
          <button className="run-btn" onClick={() => setSeed(seed + 1)}>换一个随机多项式</button>
          <div className="muted" style={{ fontSize: 13.5, marginTop: 6 }}><TxI>{`$Q=${monTex}${mons.length > 8 ? "+\\cdots" : ""}$（共 ${mons.length} 个单项式；满乘积次数可达 ${4 * mons.length}）`}</TxI></div>
        </div>
        <div className="run-out" style={{ flex: 1.3, minWidth: 330, overflow: "hidden" }}>
          <div><TxI>{`直接枚举：$\\gap(Q)=${g}$，零点数 $(2^{${v}}+\\gap)/2=${(2 ** v + g) / 2}$`}</TxI></div>
          <div><TxI>{`$b=${b}$：$\\sum_x\\Phi(1,x)=${t.sum}$，模 $2^{${b}}=${t.mod}$ 的中心剩余 $=${t.residue}$`}</TxI></div>
          <div><TxI>{`被截掉的部分 $\\sum_x\\sum_{k\\ge b}(-2)^k\\binom{\\kappa(x)}{k}=${t.tail}$；两者之和 $=${t.sum + t.tail}$`}</TxI></div>
          <div style={{ overflowX: "auto", maxWidth: "100%" }}><table style={{ marginTop: 6 }}><thead><tr><th><TxI>{String.raw`$k$`}</TxI></th>{t.coef.map((_, k) => <th key={k}>{k}</th>)}</tr></thead>
            <tbody><tr><td><TxI>{String.raw`$u^k$ 系数`}</TxI></td>{t.coef.map((c, k) => <td key={k} style={{ fontSize: 12 }}>{String(c)}</td>)}</tr></tbody></table></div>
          <div style={{ marginTop: 6 }}>
            <Check ok={t.divisible} label="$u^k$ 的系数被 $2^k$ 整除" />
            <Check ok={t.tailDivisible} label="截掉的部分被 $2^b$ 整除" />
            <Check ok={t.sum + t.tail === BigInt(g)} label="保留 + 截掉 = gap（恒等式）" />
            <Check ok={exact} label={exact ? "中心剩余 = gap（精确）" : "中心剩余 $\\ne$ gap"} />
            <Check ok={Math.abs(g) < 2 ** (b - 1)} label={`$|\\gap|<2^{b-1}=${2 ** (b - 1)}$`} />
          </div>
          {db < 2 && <div className="muted" style={{ fontSize: 13.5 }}><TxI>{R`$b<v+2$ 时，只要 $|\gap|<2^{b-1}$ 结果碰巧仍然正确；但 $b=v+2$ 是对最坏情形 $|\gap|=2^v$ 的保证。试试小 $L$（例如 $L=4$，gap 往往很大）。`}</TxI></div>}
        </div>
      </div>
    </RunCard>);
}

// ---------------------------------------------------------------- 引理 B.3：Vandermonde 校验
export function VandermondeDemo() {
  const [b, setB] = useState(4), [m, setM] = useState(12), [w, setW] = useState(3), [mode, setMode] = useState("ok");
  const mm = Math.min(m, 2 ** b - 1), ww = Math.min(w, mm);
  const r = useMemo(() => {
    const alphas = Array.from({ length: mm }, (_, e) => e + 1);
    if (mode === "dup" && mm >= 2) alphas[1] = alphas[0];
    const H = K.vandermondeBinary(alphas, ww, b);
    const sc = K.vandermondeScan(alphas, ww, b);
    return { alphas, H, sc, rank: K.rankF2(H) };
  }, [b, mm, ww, mode]);
  const { H, sc, rank, alphas } = r;
  const toBits = x => x.toString(2).padStart(b, "0");
  return (
    <RunCard title={R`\sref{LB.3}：$\F_{2^b}$ 中的 Vandermonde 校验`}
      lead={R`在 $\F_{2^b}=\F_2[t]/(p(t))$ 中实现乘法（$p$ 为不可约多项式，页面内已检验不可约），取 $\alpha_e=e$（即二进制表示为 $e$ 的域元素，$e=1,\dots,m$），施加 $\sum_e\alpha_e^jv_e=0$（$j<w$），二元展开得 $h_0=bw$ 行的校验矩阵。然后**枚举全部 $2^m$ 个向量**，统计通过校验的非零向量的最小重量。`}>
      <div className="run-row">
        <div style={{ minWidth: 290, flex: 1 }}>
          <Slider label="$b$" value={b} min={3} max={4} onChange={setB} />
          <Slider label="$m$（子句数，$\le2^b-1$）" value={mm} min={2} max={2 ** b - 1} onChange={setM} />
          <Slider label="$w$（门槛）" value={ww} min={1} max={mm} onChange={setW} />
          <Seg options={[["ok", R`$\alpha$ 互异`], ["dup", R`故意令 $\alpha_1=\alpha_2$`]]} value={mode} onChange={setMode} />
          <div className="muted" style={{ fontSize: 13.5, marginTop: 6 }}><TxI>{`$p(t)=${K.irredTex[b]}$，不可约：${K.isIrreducible(K.IRRED[b], b) ? "是" : "否"}；$\\alpha=(${alphas.map(toBits).join(",")})$`}</TxI></div>
        </div>
        <div className="run-out" style={{ flex: 1, minWidth: 300 }}>
          <div><TxI>{`$h_0=bw=${b * ww}$ 个二元校验，秩 $=${rank}$；通过的向量数 $=${sc.passing}=2^{m-\\rank}=${2 ** (mm - rank)}$`}</TxI></div>
          <div><TxI>{`通过校验的非零向量的最小重量：$${sc.minW === Infinity ? "\\infty\\ (\\text{none})" : sc.minW}$`}</TxI>{sc.witness != null && <span className="muted">（例：<code>{sc.witness.toString(2).padStart(mm, "0")}</code>）</span>}</div>
          <div style={{ fontSize: 13.5 }}><TxI>{`重量分布（重量: 个数）：${sc.hist.map((c, k) => (c ? `${k}:${c}` : null)).filter(Boolean).join("，")}`}</TxI></div>
          <Check ok={sc.minW > ww} label={`最小重量 $>w=${ww}$`} />
          <Check ok={sc.passing === 2 ** (mm - rank)} label="通过数 = $2^{m-\rank}$" />
          {mode === "dup" && <div className="muted" style={{ fontSize: 13.5 }}><TxI>{R`$\alpha_1=\alpha_2$ 时，向量 $(1,1,0,\dots,0)$ 对每个 $j$ 都满足 $\alpha_1^j+\alpha_2^j=0$，于是重量 $2$ 的向量通过校验——互异性不可缺。`}</TxI></div>}
        </div>
      </div>
      <MatrixView M={H} rowGroups={H.map((_, k) => Math.floor(k / b))} cell={20} show={false}
        title={`二元校验矩阵（$h_0\\times m=${H.length}\\times${mm}$；每 $b$ 行对应一个 $j$，蓝色 = 1）`}
        colLabels={alphas.map((_, e) => String(e + 1))} />
    </RunCard>);
}

// ---------------------------------------------------------------- 引理 B.4：混合校验恒等式
export function MixedCheckDemo() {
  const [n, setN] = useState(9), [m, setM] = useState(12), [w, setW] = useState(1), [s, setS] = useState(3), [seed, setSeed] = useState(1);
  const r = useMemo(() => {
    const rnd = K.rng(seed * 71 + n * 5 + m);
    const cl = K.randCNF(n, m, rnd);
    const b = Math.max(2, Math.ceil(lg(m + 1)));
    const alphas = Array.from({ length: m }, (_, e) => e + 1);
    const C = K.vandermondeBinary(alphas, w, b);
    const L = Math.ceil(m / w);
    const aMasks = Array.from({ length: s }, () => { let a = 0; for (let t = 0; t < L; t++) if (rnd() < 0.5) a ^= 1 << Math.floor(rnd() * m); return a; });
    const res = K.mixedCheck(cl, n, C, aMasks);
    const urow = C.reduce((acc, row, k) => (k % 2 === 0 ? acc ^ row.reduce((x, bit, e) => x | (bit << e), 0) : acc), 0);
    const qp = K.QuPoly(cl, n, urow, aMasks);
    return { cl, b, C, L, aMasks, res, qp };
  }, [n, m, w, s, seed]);
  const { res, qp, C, L, b, aMasks } = r;
  const h0 = C.length;
  return (
    <RunCard title={R`\sref{LB.4}：混合校验计数恒等式 \eqref{B.4}`}
      lead={R`随机 3-CNF（$n$ 个变量、$m$ 个子句）；稠密校验取 Vandermonde（$h_0=bw$ 行），再加 $s$ 个随机短校验（每个由 $L=\lceil m/w\rceil$ 个随机位置异或而成）。左：直接枚举 $x$ 数通过全部校验的赋值。右：按 \eqref{B.4}，对每个 $u\in\F_2^{h_0}$ 枚举全部 $(x,z)\in\F_2^{n+s}$ 求 $\gap(Q_u)$，再乘 $2^{-h_0-s}$。`}>
      <div className="run-row">
        <div style={{ minWidth: 290, flex: 1 }}>
          <Slider label="$n$" value={n} min={4} max={10} onChange={setN} />
          <Slider label="$m$" value={m} min={4} max={15} onChange={setM} />
          <Slider label="$w$" value={w} min={1} max={2} onChange={setW} />
          <Slider label="$s$（短校验数）" value={s} min={0} max={4} onChange={setS} />
          <button className="run-btn" onClick={() => setSeed(seed + 1)}>换一个随机实例</button>
        </div>
        <div className="run-out" style={{ flex: 1.3, minWidth: 330 }}>
          <div><TxI>{`$b=${b}$，$h_0=${h0}$，$L=${L}$；共枚举 $2^{h_0+n+s}=2^{${h0 + n + s}}$ 个 $(u,x,z)$`}</TxI></div>
          <div><TxI>{`直接计数：${res.direct}　（其中满足赋值 ${res.sat} 个）`}</TxI></div>
          <div><TxI>{`$\\sum_u\\gap(Q_u)=${res.total}$，$2^{-${h0}-${s}}\\cdot${res.total}=${res.viaB4}$`}</TxI></div>
          <div style={{ fontSize: 13.5 }}><TxI>{`前几个 $\\gap(Q_u)$：${res.gaps.slice(0, 8).join("，")}${res.gaps.length > 8 ? "，…" : ""}`}</TxI></div>
          <div style={{ fontSize: 13.5 }}><TxI>{`某个 $Q_u$ 展开后：${qp.count} 个单项式，最高次数 ${qp.maxDeg}（稠密部分展开前 ${qp.denseRaw} $\\le8m=${8 * m}$，短校验部分 ${qp.shortRaw} $\\le8sL=${8 * s * L}$）`}</TxI></div>
          <Check ok={res.direct === res.viaB4} label={R`\eqref{B.4} = 直接计数`} />
          <Check ok={qp.maxDeg <= 4} label="$\deg Q_u\le4$" />
          <Check ok={qp.denseRaw <= 8 * m && qp.shortRaw <= 8 * s * L} label="单项式数 $\le8m+8sL$" />
          <div className="muted" style={{ fontSize: 13.5 }}>{aMasks.length ? `短校验支撑大小：${aMasks.map(K.popcount).join("，")}` : ""}</div>
        </div>
      </div>
    </RunCard>);
}

// ---------------------------------------------------------------- §B.5：用精确计数挑选短校验
export function GreedyDemo() {
  const [n, setN] = useState(13), [m, setM] = useState(45), [w, setW] = useState(1), [Kc, setKc] = useState(200), [seed, setSeed] = useState(1);
  const [res, setRes] = useState(null);
  const run = () => {
    const rnd = K.rng(seed * 31 + n * 3 + m);
    const cl = K.randCNF(n, m, rnd);
    const t0 = performance.now();
    const g = K.greedyShortChecks({ cl, n, w, K: Kc, rnd });
    setRes({ ...g, ms: Math.round(performance.now() - t0), n, m, w, Kc });
  };
  useEffect(() => { run(); }, []);   // 首次加载自动运行一次
  const series = res ? (() => {
    const f0 = Math.max(1, res.hist[0]);
    const pts = res.hist.map((f, t) => [t, f]).filter(([, f]) => f > 0);
    return [
      { label: R`\text{false survivors } f_t`, data: pts, points: true, color: "#c0392b" },
      { label: R`f_0(3/4)^t`, f: t => f0 * Math.pow(0.75, t), dash: "dash", color: "#2c4a6e" },
      { label: R`f_0\big(1-\tfrac12(1-e^{-1})\big)^t`, f: t => f0 * Math.pow(1 - 0.5 * (1 - Math.exp(-1)), t), dash: "dot", color: "#2c6e49" },
    ];
  })() : [];
  const zeroAt = res ? res.hist.findIndex(f => f === 0) : -1;
  return (
    <RunCard title="§B.5：逐轮挑选短校验，假幸存者指数下降"
      lead={R`随机 3-CNF。先施加 Vandermonde 稠密校验（门槛 $w$），剩下的"假幸存者"都违反 $>w$ 个子句。每轮生成候选短校验（$L=\lceil m/w\rceil$ 个子句 + 包含位），对每个候选**精确计数**通过全部校验的赋值，选计数最小者。原文枚举全部 $(2m)^L$ 个候选；候选总数不超过上限 $K$ 时这里也全部枚举，否则随机抽 $K$ 个代替（存在性论证同样适用于抽样平均）。`}>
      <div className="run-row">
        <div style={{ minWidth: 290, flex: 1 }}>
          <Slider label="$n$" value={n} min={6} max={14} onChange={setN} />
          <Slider label="$m$" value={m} min={10} max={60} onChange={setM} />
          <Slider label="$w$" value={w} min={1} max={4} onChange={setW} />
          <Slider label="候选上限 $K$" value={Kc} min={20} max={600} step={20} onChange={setKc} />
          <button className="run-btn" onClick={() => setSeed(seed + 1)}>换实例</button>{" "}
          <button className="run-btn" onClick={run}>▶ 运行 {3 * n} 轮</button>
        </div>
        {res && <div className="run-out" style={{ flex: 1.3, minWidth: 330 }}>
          <div><TxI>{`$n=${res.n}$，$m=${res.m}$，$w=${res.w}$：$b=${res.b}$，$h_0=${res.h0}$，$L=${res.L}$，候选总数 $(2m)^L\\approx${res.totalCand.toExponential(2)}$（${res.enumerate ? "全部枚举" : `每轮抽 ${res.Kc} 个`}）`}</TxI></div>
          <div><TxI>{`稠密校验后：假幸存者 $f_0=${res.hist[0]}$，其中最少违反 ${res.minViol ?? "—"} 个子句（应 $>w$）`}</TxI></div>
          <div><TxI>{`假幸存者序列：${res.hist.slice(0, 16).join(" → ")}${res.hist.length > 16 ? " → …" : ""}`}</TxI></div>
          <div><TxI>{`候选的平均淘汰率（各轮）：${res.avgRej.filter(x => x != null).map(x => x.toFixed(2)).join("，") || "—"}（理论下界 $\\tfrac12(1-e^{-1})\\approx0.316$）`}</TxI></div>
          <div><TxI>{`最终计数 $=${res.finalCount}$，直接枚举的满足赋值数 $=${res.sat}$（用时 ${res.ms} ms）`}</TxI></div>
          <Check ok={res.minViol == null || res.minViol > res.w} label="假幸存者都违反 $>w$ 个子句" />
          <Check ok={res.avgRej.every(x => x == null || x > 0.25)} label="每轮平均淘汰率 $>1/4$" />
          <Check ok={res.hist.every((f, t) => f <= res.hist[0] * Math.pow(0.75, t) + 1e-9)} label="$f_t\le f_0(3/4)^t$" />
          <Check ok={res.finalCount === res.sat} label={`$3n$ 轮后最终计数 = #SAT${zeroAt >= 0 ? `（第 ${zeroAt} 轮已归零）` : ""}`} />
        </div>}
      </div>
      {res && <Plot x={{ label: R`\text{round } t`, domain: [0, Math.max(4, Math.min(3 * res.n, (zeroAt > 0 ? zeroAt : 3 * res.n) + 3))] }}
        y={{ label: R`\text{count}`, log: true, domain: [0.5, Math.max(2, res.hist[0]) * 1.5] }} series={series} height={300} samples={120} />}
    </RunCard>);
}
