// 第 2 节可运行示例：全部用 _rat.js 的精确有理数（BigInt）在浏览器内真算。
import { useMemo, useState } from "react";
import { Plot, TxI, RunCard, Check, MatrixView, Slider, Seg } from "@kit";
import * as Q from "./_rat.js";
import * as G from "./_ch02_algo.jsx";

const R = String.raw;
const one = i => i + 1;                                  // 显示用 1 起编号
const setStr = S => (S.length ? "\\{" + S.map(one).join(",") + "\\}" : "\\varnothing");
const fmtInt = x => Number(x).toLocaleString("en-US");
const Row = ({ children }) => <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "flex-start" }}>{children}</div>;
const Ctl = ({ children }) => <div style={{ display: "grid", gap: 2, margin: "6px 0 10px" }}>{children}</div>;
const M_ = ({ t }) => <TxI>{"$" + t + "$"}</TxI>;

// ============ 1. 积和式实验室：定义式 / Ryser / Ryser(Gray) / 子集 DP ============
export function PermLab() {
  const [n, setN] = useState(5), [seed, setSeed] = useState(1), [dens, setDens] = useState(0.7), [sign, setSign] = useState("pm");
  const res = useMemo(() => {
    const rnd = Q.rng(seed * 7919 + n);
    const A = G.randMatrix(n, n, rnd, dens, sign === "pm" ? [-3, -2, -1, 1, 2, 3] : [1, 2, 3]);
    const run = (name, f, theory) => { const { R: ring, c } = G.countingRing(); const v = f(A, ring); return { name, v, add: c.add, mul: c.mul, theory }; };
    const n2 = 2 ** n, fac = Number(Q.fact(n));
    const rows = [
      run("定义式（枚举全部排列）", Q.permBrute, R`\approx n\cdot n!=${fmtInt(n * fac)}`),
      run(R`Ryser 公式 \eqref{2.1}，逐项计算`, Q.permRyser, R`\approx n^2 2^n=${fmtInt(n * n * n2)}`),
      run("Ryser 公式，Gray 码顺序", G.permRyserGray, R`\approx n2^n=${fmtInt(n * n2)}`),
      run("子集动态规划", Q.permDP, R`\le n2^n=${fmtInt(n * n2)}`),
    ];
    return { A, rows };
  }, [n, seed, dens, sign]);
  const v0 = res.rows[0].v, ok = res.rows.every(r => Q.qeq(r.v, v0));
  return (
    <RunCard title="积和式实验室：三种算法，同一个答案" lead={R`随机生成 $n\times n$ 整数矩阵（零元比例由"密度"控制），用定义式、Ryser 公式 \eqref{2.1}（朴素版与 Gray 码版）、子集 DP 分别精确计算 $\per(A)$，并**实际数出**每种方法做了多少次加法和乘法。`}>
      <Ctl>
        <Slider label="$n$" value={n} min={1} max={7} onChange={setN} />
        <Slider label="非零密度" value={dens} min={0.2} max={1} step={0.05} onChange={setDens} fmt={v => v.toFixed(2)} />
        <Slider label="随机种子" value={seed} min={1} max={50} onChange={setSeed} />
        <Seg options={[["pm", "元素可正可负"], ["pos", "元素为正"]]} value={sign} onChange={setSign} />
      </Ctl>
      <Row>
        <MatrixView M={res.A} title={R`$A$（蓝正红负，空白为 0）`} />
        <div style={{ flex: 1, minWidth: 320 }}>
          <table className="tb-table"><thead><tr><th>方法</th><th><M_ t={R`\per(A)`} /></th><th>加/减</th><th>乘</th><th>量级</th></tr></thead>
            <tbody>{res.rows.map(r => <tr key={r.name}><td><TxI>{r.name}</TxI></td><td><b>{Q.qstr(r.v)}</b></td><td>{fmtInt(r.add)}</td><td>{fmtInt(r.mul)}</td><td><M_ t={r.theory} /></td></tr>)}</tbody></table>
          <div style={{ marginTop: 8 }}><Check ok={ok} label={R`四种方法结果一致：$\per(A)=${Q.qstr(v0)}$`} /></div>
          <p className="muted" style={{ fontSize: 14 }}><TxI>{R`注：定义式与 Ryser 版本遇到零因子会提前跳过，所以稀疏时实际次数低于量级估计；子集 DP 只沿非零元转移。把 $n$ 从 6 拖到 7，看各列增长的倍数：定义式 $\times7$ 以上，其余约 $\times2$。`}</TxI></p>
        </div>
      </Row>
    </RunCard>);
}

// ============ 2. 加法公式 (2.2) 逐项展开 ============
export function AdditionLab() {
  const [n, setN] = useState(4), [kc, setKc] = useState(3), [seed, setSeed] = useState(2);
  const res = useMemo(() => {
    const rnd = Q.rng(seed * 104729 + n);
    const A = G.randMatrix(n, n, rnd, 0.85, [-2, -1, 1, 2, 3]);
    const nz = []; A.forEach((row, i) => row.forEach((x, j) => !Q.qzero(x) && nz.push([i, j])));
    const pickC = new Set(G.randSubset(nz.length, Math.min(kc, nz.length), rnd).map(t => nz[t].join(",")));
    const C = A.map((row, i) => row.map((x, j) => (pickC.has(i + "," + j) ? x : Q.Q0)));
    const B = Q.matsub(A, C);
    const { value, terms } = Q.permAddition(B, C);
    return { A, B, C, value, terms, perA: Q.permDP(A), pickC };
  }, [n, kc, seed]);
  let run = Q.Q0;
  const rows = res.terms.map(t => { const p = Q.qmul(t.pb, t.pc); run = Q.qadd(run, p); return { ...t, p, run }; });
  const nPairs = Q.range(n + 1).reduce((s, a) => s + Number(Q.binom(n, a)) ** 2, 0);
  return (
    <RunCard title={R`加法公式 \eqref{2.2}：按“边的来源”逐项展开`} lead={R`把随机矩阵 $A$ 的少数几个元素挪到 $C$，其余留在 $B=A-C$。列出所有 $\per(C[S,T])\ne0$ 的 $(S,T)$，逐项累加 $\per(B[S^c,T^c])\,\per(C[S,T])$，看它是否等于 $\per(A)$。`}>
      <Ctl>
        <Slider label="$n$" value={n} min={2} max={5} onChange={setN} />
        <Slider label="$C$ 中保留的元素个数" value={kc} min={1} max={6} onChange={setKc} />
        <Slider label="随机种子" value={seed} min={1} max={50} onChange={setSeed} />
      </Ctl>
      <Row>
        <MatrixView M={res.A} title="$A$（金框 = 挪到 $C$ 的元素）" highlight={(i, j) => res.pickC.has(i + "," + j)} />
        <MatrixView M={res.B} title="$B=A-C$" />
        <MatrixView M={res.C} title="$C$" />
      </Row>
      <p className="muted" style={{ fontSize: 14 }}><TxI>{R`共有 $\sum_a\binom{n}{a}^2=${nPairs}$ 对 $(S,T)$；$C$ 很稀疏时绝大多数 $\per(C[S,T])=0$，下表只列出非零的 ${rows.length} 项（编号从 1 开始）。`}</TxI></p>
      <div className="tb-table-wrap" style={{ maxHeight: 340, overflow: "auto" }}>
        <table className="tb-table"><thead><tr><th><M_ t="S" /></th><th><M_ t="T" /></th><th><M_ t={R`\per(C[S,T])`} /></th><th><M_ t={R`\per(B[S^c,T^c])`} /></th><th>乘积</th><th>累计</th></tr></thead>
          <tbody>{rows.map((t, i) => <tr key={i}><td><M_ t={setStr(t.S)} /></td><td><M_ t={setStr(t.T)} /></td><td>{Q.qstr(t.pc)}</td><td>{Q.qstr(t.pb)}</td><td>{Q.qstr(t.p)}</td><td>{Q.qstr(t.run)}</td></tr>)}</tbody></table>
      </div>
      <div style={{ marginTop: 8 }}>
        <Check ok={Q.qeq(res.value, res.perA)} label={R`逐项和 $=${Q.qstr(res.value)}=\per(A)$（子集 DP 独立计算）`} />
        <Check ok={rows.length > 0 && rows[0].S.length === 0} label={R`$S=T=\varnothing$ 项就是 $\per(B)$（空矩阵积和式为 1）`} />
      </div>
    </RunCard>);
}

// ============ 3a. 秩二红蓝小插图：着色后同色任意配对，权重不变 ============
export function RedBlueFigure() {
  const [seed, setSeed] = useState(3);
  const n = 4;
  const d = useMemo(() => {
    const rnd = Q.rng(seed * 31 + 5);
    const u = Q.range(n).map(() => 1 + Math.floor(rnd() * 3)), w = Q.range(n).map(() => 1 + Math.floor(rnd() * 3));
    const v = Q.range(n).map(() => 1 + Math.floor(rnd() * 3)), z = Q.range(n).map(() => 1 + Math.floor(rnd() * 3));
    const k = 1 + Math.floor(rnd() * (n - 1));
    const L = G.randSubset(n, k, rnd), Rr = G.randSubset(n, k, rnd);       // 红色端点
    const colL = Q.range(n).map(i => (L.includes(i) ? "r" : "b")), colR = Q.range(n).map(j => (Rr.includes(j) ? "r" : "b"));
    return { u, v, w, z, k, colL, colR };
  }, [seed]);
  const [perm, setPerm] = useState(0);
  // 第 perm 种保色配对：红色左端点按红色右端点的某个排列配对，蓝色同理
  const pairing = useMemo(() => {
    const rnd = Q.rng(perm * 977 + seed + 1);
    const sh = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const lr = Q.range(n).filter(i => d.colL[i] === "r"), rr = sh(Q.range(n).filter(j => d.colR[j] === "r"));
    const lb = Q.range(n).filter(i => d.colL[i] === "b"), rb = sh(Q.range(n).filter(j => d.colR[j] === "b"));
    return [...lr.map((i, t) => [i, rr[t], "r"]), ...lb.map((i, t) => [i, rb[t], "b"])];
  }, [perm, d, seed]);
  const wt = pairing.reduce((s, [i, j, c]) => s * (c === "r" ? d.u[i] * d.v[j] : d.w[i] * d.z[j]), 1);
  const fixed = Q.range(n).reduce((s, i) => s * (d.colL[i] === "r" ? d.u[i] : d.w[i]) * (d.colR[i] === "r" ? d.v[i] : d.z[i]), 1);
  const col = c => (c === "r" ? "#c0392b" : "#2c4a6e");
  const W = 360, H = 230, xl = 70, xr = 290, y = i => 35 + i * 52;
  return (
    <figure className="card" style={{ padding: 12, margin: "16px 0" }}>
      <figcaption><b>秩二：先着色，再同色配对。</b> <TxI>{R`$n=4$，权重 $u,w$（左）与 $v,z$（右）是小正整数。左右各有 $k=${d.k}$ 个红色端点。点"换一种配对"：保色配对随之改变，但匹配权重不变——它只依赖端点颜色。`}</TxI></figcaption>
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%" }}>
          {pairing.map(([i, j, c], t) => <line key={t} x1={xl} y1={y(i)} x2={xr} y2={y(j)} stroke={col(c)} strokeWidth={2.5} />)}
          {Q.range(n).map(i => <g key={"l" + i}><circle cx={xl} cy={y(i)} r={13} fill={col(d.colL[i])} /><text x={xl - 22} y={y(i) + 5} textAnchor="end" fontSize="13">{`行${i + 1}  ${d.colL[i] === "r" ? "u" : "w"}=${d.colL[i] === "r" ? d.u[i] : d.w[i]}`}</text></g>)}
          {Q.range(n).map(j => <g key={"r" + j}><circle cx={xr} cy={y(j)} r={13} fill={col(d.colR[j])} /><text x={xr + 20} y={y(j) + 5} fontSize="13">{`${d.colR[j] === "r" ? "v" : "z"}=${d.colR[j] === "r" ? d.v[j] : d.z[j]}  列${j + 1}`}</text></g>)}
        </svg>
        <div style={{ minWidth: 240 }}>
          <p><button onClick={() => setPerm(perm + 1)}>换一种配对</button> <button onClick={() => { setSeed(seed + 1); setPerm(0); }}>换一种着色</button></p>
          <p><TxI>{R`本配对的权重 $=\prod(\text{红边 }u_iv_j)\prod(\text{蓝边 }w_iz_j)=${wt}$`}</TxI></p>
          <p><TxI>{R`只看端点颜色的乘积 $=${fixed}$`}</TxI></p>
          <Check ok={wt === fixed} label="权重与配对方式无关" />
          <p className="muted" style={{ fontSize: 14 }}><TxI>{R`同样的着色共有 $k!\,(n-k)!=${Number(Q.fact(d.k) * Q.fact(n - d.k))}$ 种保色配对，全部权重相同——这就是 \eqref{2.4} 中的 $k!\,(n-k)!$。`}</TxI></p>
        </div>
      </Row>
    </figure>);
}

// ============ 3b. 低秩颜色计数 (2.5) ============
export function LowRankLab() {
  const [n, setN] = useState(6), [r, setR] = useState(2), [seed, setSeed] = useState(1), [sign, setSign] = useState("pm");
  const res = useMemo(() => {
    const rnd = Q.rng(seed * 65537 + n * 13 + r);
    const vals = sign === "pm" ? [-2, -1, 1, 2, 3] : [1, 2, 3];
    const U = G.randMatrix(n, r, rnd, 1, vals), V = G.randMatrix(n, r, rnd, 1, vals);
    const E = Q.matmul(U, Q.range(r).map(a => V.map(row => row[a])));
    const { R: ring, c } = G.countingRing();
    const Ls = G.colorLayers(U, r, ring), Rs = G.colorLayers(V, r, ring);
    let tot = Q.Q0; const top = [];
    for (const [key, dl] of Ls[n]) { const dr = Rs[n].get(key); if (!dr) continue; const f = G.nuFact(key); const t = Q.qmul(Q.q(f), Q.qmul(dl, dr)); tot = Q.qadd(tot, t); top.push({ key, f, dl, dr, t }); }
    const k2 = G.countingRing(); const pd = Q.permDP(E, k2.R);
    return { U, V, E, Ls, tot, top, ops: c.add + c.mul, pd, dpOps: k2.c.add + k2.c.mul, rank: Q.rank(E) };
  }, [n, r, seed, sign]);
  const sizes = res.Ls.map(m => m.size), total = sizes.reduce((s, x) => s + x, 0), want = Number(Q.binom(n + r, r));
  return (
    <RunCard title={R`低秩颜色计数 \eqref{2.5}：状态数是 $\binom{n+r}{r}$，不是 $2^n$`} lead={R`随机取 $n\times r$ 整数矩阵 $U,V$，令 $E=UV^{\mathsf T}$。按递推 $D_L(j,\nu)=\sum_aU_{ja}D_L(j-1,\nu-e_a)$ 逐层建表，统计每层的状态数，再按 \eqref{2.5} 求和，与子集 DP 直接算的 $\per(E)$ 比较。$r=2$ 时，颜色 1 = 红、颜色 2 = 蓝，下表就是 \eqref{2.4}。`}>
      <Ctl>
        <Slider label="$n$" value={n} min={1} max={10} onChange={setN} />
        <Slider label="$r$（颜色数）" value={r} min={1} max={4} onChange={setR} />
        <Slider label="随机种子" value={seed} min={1} max={50} onChange={setSeed} />
        <Seg options={[["pm", "因子可正可负"], ["pos", "因子为正"]]} value={sign} onChange={setSign} />
      </Ctl>
      <Row>
        <MatrixView M={res.U} title="$U$" />
        <MatrixView M={res.V} title="$V$" />
        <MatrixView M={res.E} title={`$E=UV^{\\mathsf T}$（秩 ${res.rank}）`} />
      </Row>
      <Row>
        <div>
          <table className="tb-table"><thead><tr><th>层 <M_ t="j" /></th>{sizes.map((_, j) => <th key={j}>{j}</th>)}<th>合计</th></tr></thead>
            <tbody>
              <tr><td>状态数</td>{sizes.map((x, j) => <td key={j}>{x}</td>)}<td><b>{total}</b></td></tr>
              <tr><td><M_ t={R`\binom{j+r-1}{r-1}`} /></td>{sizes.map((_, j) => <td key={j}>{String(Q.binom(j + r - 1, r - 1))}</td>)}<td><M_ t={R`\binom{n+r}{r}=${want}`} /></td></tr>
            </tbody></table>
          <p><Check ok={total === want} label={R`状态总数 $${total}=\binom{n+r}{r}=${want}$`} /> <span className="muted">对比子集 DP 的 <M_ t={R`2^n=${2 ** n}`} /> 个状态；颜色 DP 实际运算 {fmtInt(res.ops)} 次，子集 DP {fmtInt(res.dpOps)} 次。</span></p>
        </div>
      </Row>
      <div className="tb-table-wrap" style={{ maxHeight: 300, overflow: "auto" }}>
        <table className="tb-table"><thead><tr><th><M_ t={R`\nu`} /></th><th><M_ t={R`\nu!`} /></th><th><M_ t={R`D_L(n,\nu)`} /></th><th><M_ t={R`D_R(n,\nu)`} /></th><th>项</th></tr></thead>
          <tbody>{res.top.map(t => <tr key={t.key}><td>({t.key})</td><td>{String(t.f)}</td><td>{Q.qstr(t.dl)}</td><td>{Q.qstr(t.dr)}</td><td>{Q.qstr(t.t)}</td></tr>)}</tbody></table>
      </div>
      <div style={{ marginTop: 8 }}>
        <Check ok={Q.qeq(res.tot, res.pd)} label={R`$\sum_\nu\nu!\,D_L(n,\nu)D_R(n,\nu)=${Q.qstr(res.tot)}=\per(E)$（子集 DP）`} />
        {sign === "pm" && <span className="muted"> 因子含负数：恒等式照样成立。</span>}
      </div>
    </RunCard>);
}

// ============ 3c. 运算量对比图 ============
const lg = Math.log2;
export function CostPlotN() {
  return <Plot
    x={{ label: R`n`, domain: [4, 400] }}
    y={{ label: R`\log_2(\text{运算次数})`, domain: [0, 420] }}
    params={[{ id: "r", label: R`r`, min: 1, max: 30, step: 1, value: 4 }]}
    series={p => [
      { label: R`n2^n\ (\text{子集 DP})`, f: n => n + lg(n) },
      { label: R`r\binom{n+r}{r}\ (\text{颜色 DP})`, f: n => lg(p.r) + G.log2binom(n + p.r, p.r), color: "#2c6e49" },
      { label: R`rn^r\ (r\ \text{固定时的上界})`, f: n => lg(p.r) + p.r * lg(n), dash: "dash", color: "#2c4a6e" },
    ]}
    caption={R`固定颜色数 $r$，运算量随 $n$ 的增长：子集 DP 是一条斜率为 1 的直线（指数），颜色 DP 只按 $\log n$ 增长（多项式）。交叉点随 $r$ 右移：$r=4$ 时 $n\ge8$ 颜色 DP 就更省，$r=30$ 时要到 $n\approx94$——"多项式"只有在 $n\gg r$ 时才占上风。`} />;
}
export function CostPlotR() {
  return <Plot
    x={{ label: R`r/n`, domain: [0.005, 1] }}
    y={{ label: R`\tfrac1n\log_2(\text{运算次数})`, domain: [0, 2.2] }}
    params={[{ id: "n", label: R`n`, min: 50, max: 2000, step: 50, value: 400 }]}
    series={p => [
      { label: R`\tfrac1n\log_2(n2^n)`, f: () => 1 + lg(p.n) / p.n },
      { label: R`\tfrac1n\log_2\big(r\binom{n+r}{r}\big)`, f: x => { const r = Math.max(1, x * p.n); return (lg(r) + G.log2binom(p.n + r, r)) / p.n; }, color: "#2c6e49" },
      { label: R`2\ (\text{即 }4^n)`, f: () => 2, dash: "dot", color: "#999" },
    ]}
    caption={R`固定 $n$，横轴为秩与维数之比 $r/n$，纵轴是"每个维度付出的比特数"。颜色 DP 在 $r=n$ 时约为 $4^n$（纵轴 $\approx2$），仍是 $2^{O(n)}$，但底数不是 2；两条曲线在 $r/n\approx0.3$ 处相交，此后颜色 DP 反而更贵。\sref{L2.1} 要的是 $n^{O(r)}=2^{O(r\log n)}$ 远小于 $2^n$，即 $r\ll n/\log n$——位于本图的最左端。`} />;
}

// ============ 4. 引理 2.1：小块 + 低秩，及其每个方子矩阵 ============
export function BlockLab() {
  const [n, setN] = useState(7), [s, setS] = useState(2), [r, setR] = useState(1), [seed, setSeed] = useState(4), [trial, setTrial] = useState(0);
  const res = useMemo(() => {
    const rnd = Q.rng(seed * 1009 + n * 17 + s * 3 + r);
    const blocks = G.randBlocks(n, s, rnd);
    const B = G.blockMatrix(n, blocks, rnd);
    const U = G.randMatrix(n, r, rnd, 1, [-2, -1, 1, 2]), V = G.randMatrix(n, r, rnd, 1, [-2, -1, 1, 2]);
    const E = r ? Q.matmul(U, Q.range(r).map(a => V.map(row => row[a]))) : Q.zeros(n);
    const A = Q.matadd(B, E);
    const out = Q.permBlockLowRank(B, U, V, blocks), pd = Q.permDP(A);
    const rg = Array(n), cg = Array(n); blocks.forEach((b, a) => { b.rows.forEach(i => (rg[i] = a)); b.cols.forEach(j => (cg[j] = a)); });
    return { blocks, B, U, V, E, A, out, pd, rg, cg };
  }, [n, s, r, seed]);
  const subs = useMemo(() => {
    const rnd = Q.rng(trial * 7 + seed + 100);
    return Q.range(20).map(() => {
      const k = Math.floor(rnd() * (n + 1));
      const kr = G.randSubset(n, k, rnd), kc = G.randSubset(n, k, rnd);
      const bl = G.restrictBlocks(res.blocks, kr, kc);
      const o = Q.permBlockLowRank(Q.sub(res.B, kr, kc), kr.map(i => res.U[i]), kc.map(j => res.V[j]), bl);
      const p = Q.permDP(Q.sub(res.A, kr, kc));
      return { kr, kc, k, v: o.value, p, ok: Q.qeq(o.value, p), nonsq: bl.filter(b => b.rows.length !== b.cols.length).length, maxb: Math.max(0, ...bl.map(b => Math.max(b.rows.length, b.cols.length))) };
    });
  }, [res, trial, seed, n]);
  const allOk = subs.every(x => x.ok);
  const sq = res.blocks.every(b => b.rows.length === b.cols.length);
  return (
    <RunCard title={R`\sref{L2.1}：小块 + 低秩，以及每个方子矩阵`} lead={R`随机生成有对应对角块（每组 $\le s$ 行/列，行组与列组大小可以不同）的 $B$，加上秩 $r$ 的 $E=UV^{\mathsf T}$。按证明中的算法：每块枚举 $(S,T)$、剩余端点着色得 $W_a$，逐块卷积，最后 $\sum_\nu\nu!\,W(\nu,\nu)$ \eqref{2.6}；与子集 DP 直接计算 $\per(A)$ 对比。再随机抽 20 个方子矩阵逐一验证。`}>
      <Ctl>
        <Slider label="$n$" value={n} min={3} max={9} onChange={setN} />
        <Slider label="块大小上界 $s$" value={s} min={1} max={3} onChange={setS} />
        <Slider label="秩 $r$" value={r} min={0} max={2} onChange={setR} />
        <Slider label="随机种子" value={seed} min={1} max={50} onChange={setSeed} />
      </Ctl>
      <Row>
        <MatrixView M={res.B} title={`$B$：${res.blocks.length} 个块（行组大小 ${res.blocks.map(b => b.rows.length).join(",")}；列组 ${res.blocks.map(b => b.cols.length).join(",")}）`} rowGroups={res.rg} colGroups={res.cg} />
        <MatrixView M={res.E} title={`$E=UV^{\\mathsf T}$，秩 $\\le ${r}$`} />
        <MatrixView M={res.A} title="$A=B+E$（金框 = 块内位置）" rowGroups={res.rg} colGroups={res.cg} highlight={(i, j) => res.rg[i] === res.cg[j]} />
      </Row>
      <table className="tb-table" style={{ maxWidth: 640 }}><tbody>
        <tr><td>各块枚举的非零 <M_ t="(S,T)" /> 对数合计</td><td>{res.out.choices}</td><td className="muted">至多 <M_ t={R`\sum_a2^{|I_a|+|J_a|}=${res.blocks.reduce((t, b) => t + 2 ** (b.rows.length + b.cols.length), 0)}`} />（每块 <M_ t={R`\le2^{2s}`} />）</td></tr>
        <tr><td>最终表 <M_ t={R`W(\nu,\xi)`} /> 的项数</td><td>{res.out.tableSize}</td><td className="muted"><M_ t={R`\le (n+1)^{2r}=${(n + 1) ** (2 * r)}`} /></td></tr>
        <tr><td><M_ t={R`\sum_\nu\nu!\,W(\nu,\nu)`} /></td><td><b>{Q.qstr(res.out.value)}</b></td><td></td></tr>
        <tr><td>子集 DP 直接算 <M_ t={R`\per(A)`} /></td><td><b>{Q.qstr(res.pd)}</b></td><td></td></tr>
      </tbody></table>
      <p><Check ok={Q.qeq(res.out.value, res.pd)} label={R`\eqref{2.6} $=\per(A)$`} /> {!sq && <span className="muted">本例 <M_ t="B" /> 有非方块，故 <M_ t={R`\per(B)=0`} />，但 <M_ t={R`\per(B+E)`} /> 一般不为 0。</span>}</p>
      <h4 style={{ margin: "10px 0 4px" }}>每个方子矩阵 <button onClick={() => setTrial(trial + 1)} style={{ marginLeft: 8 }}>重新抽 20 个</button></h4>
      <div className="tb-table-wrap" style={{ maxHeight: 280, overflow: "auto" }}>
        <table className="tb-table"><thead><tr><th>保留的行</th><th>保留的列</th><th>非方块数</th><th>最大块</th><th>算法 <TxI>{R`\eqref{2.6}`}</TxI></th><th>子集 DP</th><th></th></tr></thead>
          <tbody>{subs.map((x, i) => <tr key={i}><td><M_ t={setStr(x.kr)} /></td><td><M_ t={setStr(x.kc)} /></td><td>{x.nonsq}</td><td>{x.maxb}</td><td>{Q.qstr(x.v)}</td><td>{Q.qstr(x.p)}</td><td>{x.ok ? "✔" : "✘"}</td></tr>)}</tbody></table>
      </div>
      <p><Check ok={allOk} label={`20 个随机方子矩阵全部一致`} /> <span className="muted"><TxI>{R`删行列后块只会变小（"最大块" $\le s$），但常常变成非方的——算法照样正确。`}</TxI></span></p>
    </RunCard>);
}
