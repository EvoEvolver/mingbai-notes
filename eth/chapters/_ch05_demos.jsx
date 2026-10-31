// 第 5 页的三个浏览器内可运行示例：
//  VerifyT51     —— 定理 5.1 的完整小规模验证（精确有理数，ℓ = 3…6）
//  ParityTail    —— 奇偶插值多项式与二项尾（ℓ 到 2000，BigInt 精确尾概率）
//  ExactVsApprox —— §5.1 精确构造（次数 ℓ）与 (5.7)（次数 d）的对比
import { useEffect, useMemo, useState } from "react";
import { Plot, Table, TxI, RunCard, Check, MatrixView, Slider, Seg } from "@kit";
import * as Q from "./_rat.js";
import * as C from "./_ch05_calc.jsx";
const R = String.raw;
const { q, qtex, qstr, qzero, qeq, range } = Q;

// 多项式系数 → TeX
function polyTex(coef, v = "z") {
  const terms = [];
  coef.forEach((a, k) => {
    if (qzero(a)) return;
    const neg = a.n < 0n, abs = q(neg ? -a.n : a.n, a.d);
    const c = k > 0 && qeq(abs, Q.Q1) ? "" : qtex(abs);
    const mon = k === 0 ? "" : k === 1 ? v : `${v}^{${k}}`;
    terms.push({ neg, s: c + mon || "1" });
  });
  if (!terms.length) return "0";
  return terms.reverse().map((t, i) => (i === 0 ? (t.neg ? "-" : "") : t.neg ? " - " : " + ") + t.s).join("");
}
const sci = v => { if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))); return Math.abs(e) < 4 ? String(+v.toPrecision(4)) : `${(v / 10 ** e).toFixed(2)}\\times10^{${e}}`; };
const fmtLog = v => (v === -Infinity ? R`0\ (\text{窗口覆盖全部 }k)` : R`10^{${v.toFixed(1)}}`);

// ======================= 示例 1：定理 5.1 的完整验证 =======================
export function VerifyT51() {
  const [ell, setEll] = useState(4), [d, setD] = useState(2), [res0, setRes] = useState(null), [busy, setBusy] = useState(false), [iSel, setISel] = useState(1);
  const run = (l = ell, dd = d) => { setBusy(true); setTimeout(() => { setRes(C.verifyT51(l, dd)); setBusy(false); }, 30); };
  useEffect(() => { setRes(null); if (ell <= 5) run(ell, d); }, [ell, d]);
  const setL = l => { setEll(l); if (d > l) setD(Math.min(d, l)); if (iSel > l) setISel(1); };
  const res = res0 && res0.ell === ell && res0.d === d ? res0 : null;   // 参数刚改变、旧结果尚未清除时不渲染
  const n = 1 << ell;
  const perm = useMemo(() => C.moveBitFirst(Math.min(iSel, ell), ell), [iSel, ell]);
  const allOk = res && res.J0ok && res.nice.every(x => x.ok) && res.rk === res.mism && res.isDiag && res.diagMatch && res.commute && res.prodOk;
  return (
    <RunCard title="定理 5.1 的完整小规模验证（精确有理数）"
      lead={R`选 $\ell$ 与 $d\le\ell$：在以 $\ell/2$ 为中心的 $d+1$ 个 $k$ 上用 Lagrange 插值求 $p$；用 Kronecker 积造出 $2^\ell\times2^\ell$ 的 $X_j$；对 $t=0,1,\dots,\ell$ 计算 $\widetilde J(t)=p(\sum_j(1-t/j)X_j)$（矩阵 Horner 法），令 $E=X^{\otimes\ell}-\widetilde J(0)$，逐项检验 \sref{T5.1} 的每个结论。$H_\ell EH_\ell$ 用 $\pm1$ 的 Walsh 矩阵算成 $WEW/2^\ell$，全程无 $\sqrt2$。`}>
      <div className="ctl-row" style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "center" }}>
        <span><TxI>{R`$\ell$：`}</TxI><Seg options={[3, 4, 5, 6]} value={ell} onChange={setL} /></span>
        <span><TxI>{R`$d$：`}</TxI><Seg options={range(ell).map(x => x + 1)} value={d} onChange={setD} /></span>
        {ell === 6 && <button onClick={() => run()} disabled={busy}>{busy ? "计算中…" : res ? "重新运行" : <TxI>{R`▶ 运行（$64\times64$ 有理矩阵，约 1 秒）`}</TxI>}</button>}
        {busy && ell <= 5 && <span className="muted">计算中…</span>}
      </div>
      {!res && !busy && <p className="muted"><TxI>{R`$\ell=6$ 时计算量较大，点击按钮开始。`}</TxI></p>}
      {res && <>
        <p><TxI>{R`插值窗口 $k\in\{${res.ks.join(",")}\}$；$p(z)=${polyTex(res.coef)}$，$\deg p\le${d}$。用时 ${res.ms.toFixed(0)} ms。`}</TxI></p>
        <Table head={[R`$k$`, R`$z=\ell-2k$`, R`$(-1)^k$`, R`$p(z)$`, R`窗口内？`, R`输入个数 $\binom{\ell}{k}$`]}
          rows={range(ell + 1).map(k => { const v = Q.peval(res.coef, q(ell - 2 * k)); const ok = qeq(v, q(C.sgn(k))); return [String(k), String(ell - 2 * k), String(C.sgn(k)), R`$${qtex(v)}$${ok ? "" : " ✘"}`, res.ks.includes(k) ? "是" : "否", String(Q.binom(ell, k))]; })} />
        <div className="chk-row" style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", margin: "10px 0" }}>
          <Check ok={res.commute} label={R`$X_j$ 两两交换`} />
          <Check ok={res.prodOk} label={R`$X_1\cdots X_\ell=X^{\otimes\ell}$`} />
          <Check ok={res.J0ok} label={R`$J(0)=X^{\otimes\ell}$`} />
          {res.nice.map((r, i) => <Check key={i} ok={r.ok} label={R`$K_{${i + 1}}$ 是 ${i + 1}-好的`} detail={`第 ${i + 1} 位不同处全为 0：${r.offZero}；两块相同：${r.same}`} />)}
          <Check ok={res.isDiag} label={R`$H_\ell EH_\ell$ 是对角阵`} />
          <Check ok={res.diagMatch} label={R`对角元 $=\chi(x)-p(\sum x_j)$`} />
          <Check ok={res.rk === res.mism} label={R`$\rank E=${res.rk}=\#\{p\ne\chi\}=${res.mism}$`} />
          {d < ell && <Check ok={res.anti} label={R`$E[x,\bar x]=1$（障碍被 $E$ 吸收）`} />}
        </div>
        <p><TxI>{R`$\rank E=${res.rk}$，占 $2^\ell=${n}$ 的 ${(100 * res.rk / n).toFixed(1)}%；二项计数 $\sum_{k\notin\text{窗口}}\binom{\ell}{k}=${res.binomMism}$。${allOk ? "**全部检验通过。**" : "**有检验未通过！**"}`}</TxI></p>
        <p className="muted"><TxI>{R`小 $\ell$ 下比例当然不小（这里 $d$ 远未达到 $100\sqrt{\ell\log\ell}$）；要看的是**结构**：秩恰好等于不一致的输入数，且 $E$ 与 $i$ 无关。比例随 $\ell$ 增长的变化见下一个示例。`}</TxI></p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
          <MatrixView M={res.E} title={R`$E=X^{\otimes\ell}-\widetilde J(0)$`} maxPx={340} />
          <MatrixView M={res.HEH} title={R`$H_\ell EH_\ell=WEW/2^\ell$（对角）`} maxPx={340} />
        </div>
        <div style={{ marginTop: 10 }}>
          <TxI>{R`查看 $K_i$（行列按"第 $i$ 位在最前"重排，分隔线按第 $i$ 位分组）：`}</TxI> <Seg options={range(ell).map(x => [x + 1, `$i=${x + 1}$`])} value={iSel} onChange={setISel} />
          <MatrixView M={perm.map(r => perm.map(c => res.Jt[iSel][r][c]))} rowGroups={perm.map(x => C.bitOf(x, iSel, ell))} colGroups={perm.map(x => C.bitOf(x, iSel, ell))}
            title={R`$K_{${iSel}}=\widetilde J(${iSel})$：两个相同的对角块、非对角块为零 —— 即 $I_2\otimes p(S_{${iSel}})$`} maxPx={400} />
        </div>
      </>}
    </RunCard>);
}

// ======================= 示例 2：奇偶多项式与二项尾 =======================
export function ParityTail() {
  const [ell, setEll] = useState(400), [c, setC] = useState(1.5);
  const d = Math.min(C.dOf(c, ell), ell);
  const ks = C.windowKs(ell, d), k0 = ks[0], k1 = ks[ks.length - 1];
  const pts = useMemo(() => { const row = C.binomRow(ell), l2 = ell * Math.log10(2); return row.map((b, k) => [k, C.log10Big(b) - l2]); }, [ell]);
  const tail = C.log10TailOutside(ell, d), hoef = C.log10Hoeff(ell, d), target = -100 * Math.log10(ell);
  const pOut = useMemo(() => {
    if (ell > 60 || d >= ell) return null;
    const coef = C.parityPoly(ell, d);
    const outs = range(ell + 1).filter(k => k < k0 || k > k1);
    const vals = outs.map(k => ({ k, v: Q.peval(coef, q(ell - 2 * k)) }));
    const big = vals.reduce((m, x) => Math.max(m, Math.abs(Q.qnum(x.v))), 0);
    return { vals, big };
  }, [ell, d, k0, k1]);
  return (
    <RunCard title="奇偶插值与二项尾：窗口外有多少概率质量？"
      lead={R`取 $d=\lceil c\sqrt{\ell\log_2\ell}\rceil$（论文 $c=100$；为看清窗口，这里允许小 $c$）。图为 $\log_{10}\Pr[k]$，$k\sim\Bin(\ell,1/2)$；竖线为插值窗口端点与 $\ell/2\pm d/4$。窗口外概率用 BigInt **精确**求和，再与 Hoeffding 界 $2e^{-d^2/8\ell}$ 及 $\ell^{-100}$ 比较。`}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 30px" }}>
        <Slider label={R`$\ell$`} value={ell} min={10} max={2000} step={10} onChange={setEll} />
        <Slider label={R`$c$`} value={c} min={0.5} max={100} step={0.5} onChange={setC} />
      </div>
      <Plot x={{ label: R`k\ (\text{负坐标个数})`, domain: [0, ell] }} y={{ label: R`\log_{10}\Pr[k]` }}
        series={() => [
          { label: R`\Bin(\ell,1/2)`, data: pts, points: true, color: "#2c4a6e" },
          { label: R`\text{窗口外}`, data: pts.filter(([k]) => k < k0 || k > k1), points: true, color: "#c0392b" },
        ]}
        vlines={() => [{ x: k0, label: R`k_0` }, { x: k1, label: "" }, { x: ell / 2 - d / 4, label: "" }, { x: ell / 2 + d / 4, label: "" }]}
        samples={2} height={320} />
      <Table head={["量", "值"]} rows={[
        [R`$d$`, R`$${d}$${C.dOf(c, ell) > ell ? "（$c\\sqrt{\\ell\\log\\ell}>\\ell$，截为 $\\ell$：精确插值）" : ""}`],
        [R`窗口 $\{k_0,\dots,k_0+d\}$`, R`$\{${k0},\dots,${k1}\}$；标准差 $\sqrt\ell/2=${(Math.sqrt(ell) / 2).toFixed(1)}$`],
        [R`窗口外概率（精确） $=\Pr[p(\sum x_j)\ne\chi(x)]$ 的上界`, R`$${fmtLog(tail)}$`],
        [R`Hoeffding 界 $2e^{-d^2/8\ell}$`, R`$10^{${hoef.toFixed(1)}}$`],
        [R`目标 $\ell^{-100}$`, R`$10^{${target.toFixed(1)}}$`],
      ]} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", margin: "8px 0" }}>
        <Check ok={tail <= hoef + 1e-9} label={R`精确尾 $\le$ Hoeffding 界`} />
        <Check ok={hoef <= target} label={R`Hoeffding 界 $\le\ell^{-100}$`} detail="小 c 时不成立是预期的；c ≥ 24 时对所有 ℓ 成立" />
      </div>
      {pOut ? <p><TxI>{R`**$p$ 在窗口外的值**（$\ell\le60$ 时精确计算）：$\max_{k\notin\text{窗口}}|p(\ell-2k)|\approx${sci(pOut.big)}$；例如 ${pOut.vals.slice(0, 3).map(({ k, v }) => R`$p(${ell - 2 * k})=${sci(Q.qnum(v))}$（应为 $${C.sgn(k)}$）`).join("，")}。这些输入上 $p$ 与奇偶相差巨大，但对秩的贡献每个只有 1。`}</TxI></p>
        : <p className="muted"><TxI>{R`把 $\ell$ 调到 60 以下（且 $d<\ell$）可精确计算 $p$ 在窗口外的值。`}</TxI></p>}
    </RunCard>);
}

// ======================= 示例 3：精确 vs 近似 =======================
const ROWS = [1e2, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10];
export function ExactVsApprox() {
  const [ell, setEll] = useState(4), [d, setD] = useState(2);
  const small = useMemo(() => {
    const n = 1 << ell, coef = C.parityPoly(ell, d), Xs = range(ell).map(j => C.Xj(ell, j + 1)), XL = C.Xell(ell);
    const Jt = range(ell + 1).map(t => C.polyOfMatrix(coef, C.linComb(ell, q(t), Xs)));
    const E = Q.matsub(XL, Jt[0]);
    return range(ell + 1).map(t => {
      const Ex = C.exactJ(ell, q(t));
      const niceEx = t === 0 ? null : C.niceReport(Ex, t, ell).ok, niceK = t === 0 ? null : C.niceReport(Jt[t], t, ell).ok;
      return { t, ex: Ex[0][n - 1], jt: Jt[t][0][n - 1], e: E[0][n - 1], j: Q.qadd(Jt[t][0][n - 1], E[0][n - 1]), niceEx, niceK };
    });
  }, [ell, d]);
  const tableRows = useMemo(() => ROWS.map(L => {
    const d100 = C.dOf(100, L), d24 = C.dOf(24, L);
    const tl = d24 < L && L <= 1e6 ? C.log10TailOutside(L, d24) : null;
    return [R`$10^{${Math.log10(L)}}$`, String(d100), d100 >= L ? R`$\ge1$（精确插值）` : (d100 / L).toPrecision(2), String(d24), d24 >= L ? R`$\ge1$` : (d24 / L).toPrecision(2),
      tl == null ? (d24 >= L ? R`$0$` : "—") : R`$10^{${tl.toFixed(0)}}$`, R`$10^{${(-100 * Math.log10(L)).toFixed(0)}}$`];
  }), []);
  return (
    <RunCard title={R`精确构造（次数 $\ell$）与定理 5.1 的构造（次数 $d$）`}
      lead={R`上半部分：在小 $\ell$ 上逐点比较 $(x,\bar x)=(0\cdots0,1\cdots1)$ 这个"障碍元素"。下半部分：$d/\ell$ 随 $\ell$ 的变化——这就是 §3 中导数阶数相对 $n$ 的节省比例。`}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "center" }}>
        <span><TxI>{R`$\ell$：`}</TxI><Seg options={[3, 4, 5]} value={ell} onChange={l => { setEll(l); if (d > l) setD(l); }} /></span>
        <span><TxI>{R`$d$：`}</TxI><Seg options={range(ell).map(x => x + 1)} value={d} onChange={setD} /></span>
      </div>
      <Table head={[R`$t$`, R`精确构造 $[x,\bar x]=\prod_j(1-t/j)$`, R`精确构造 $t$-好？`, R`$\widetilde J(t)[x,\bar x]$`, R`$E[x,\bar x]$`, R`$J(t)[x,\bar x]$`, R`$\widetilde J(t)$ 为 $t$-好？`]}
        rows={small.map(r => [String(r.t), R`$${qtex(r.ex)}$`, r.niceEx == null ? "—" : r.niceEx ? "✔" : "✘", R`$${qtex(r.jt)}$`, R`$${qtex(r.e)}$`, R`$${qtex(r.j)}$`, r.niceK == null ? "—" : r.niceK ? "✔" : "✘"])} />
      <p className="muted"><TxI>{R`精确构造的障碍元素是 $\ell$ 次多项式 $\prod_j(1-t/j)$：$t=0$ 处为 1，$t=1,\dots,\ell$ 处为 0。\sref{T5.1} 的构造里（$d<\ell$ 时）$\widetilde J(t)$ 的这个元素恒为 0，整列由常数 $E[x,\bar x]=1$ 承担；$\widetilde J(i)$ 本身在每个特殊点都**精确** $i$-好。`}</TxI></p>
      <Plot x={{ label: R`\ell`, log: true, domain: [10, 1e12] }} y={{ label: R`d/\ell`, log: true, domain: [1e-4, 30] }}
        params={[{ id: "c", label: R`c`, min: 1, max: 100, step: 0.5, value: 24 }]}
        series={p => [
          { label: R`\text{精确：}d=\ell`, f: () => 1, color: "#8a7e6a", dash: "dash" },
          { label: R`c=100`, f: L => C.dOf(100, L) / L, color: "#9b2c1f" },
          { label: R`c=24`, f: L => C.dOf(24, L) / L, color: "#2c6e49" },
          { label: R`c=${p.c}`, f: L => C.dOf(p.c, L) / L, color: "#2c4a6e", dash: "dot" },
        ]}
        vlines={p => { let L = 4; while (C.dOf(p.c, L) > L && L < 1e13) L *= 1.05; return [{ x: L, label: R`d=\ell\ (c=${p.c})` }]; }}
        samples={200} height={320} />
      <Table head={[R`$\ell$`, R`$d\ (c=100)$`, R`$d/\ell$`, R`$d\ (c=24)$`, R`$d/\ell$`, R`窗口外概率（$c=24$，精确）`, R`$\ell^{-100}$`]} rows={tableRows}
        caption={R`$d/\ell<1$ 才有节省：$c=100$ 时需 $\ell\ge174096$，$c=24$ 时需 $\ell\ge7404$。窗口外概率即 $\rank E/2^\ell$ 的上界；"—"表示 $\ell$ 太大未做精确求和。`} />
    </RunCard>);
}
