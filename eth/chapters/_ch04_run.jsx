// §4 的可运行示例（全部精确有理数运算，_rat.js；构造在 _ch04_algo.js）。
//  1. Ell1Demo     ——ℓ = 1 的分解动画：着色 → A = LR → LIR → L𝒥R′ → B = LIR′（块对角）；一对颜色的 2×2 视角。
//  2. BudgetDemo   ——引理 4.1 的贪心：每一列被排除的词数（三类）与证明中的预算。
//  3. NiceChecker  ——i-好矩阵检查器：对 I、X^{⊗ℓ}、I₂⊗B、只保持第 i 位、X_j、随机，逐个 i 检查 (4.8)。
//  4. WordsDemo    ——词标号 + i-好分块：L(I_C⊗K)R′ 按第 i 个符号分块（引理 4.3），K = X^{⊗ℓ} 时恢复 A，加低秩误差验证 (4.9)。
import { useMemo, useState } from "react";
import { Table, TxI, RunCard, Check, MatrixView, Slider, Seg } from "@kit";
import { Q0, Q1, qstr, qeq, qzero, eye, range } from "./_rat.js";
import * as G from "./_ch04_algo.js";

const R = String.raw;
const row = { display: "flex", flexWrap: "wrap", gap: "10px 18px", alignItems: "flex-start" };
const ctl = { display: "flex", flexWrap: "wrap", gap: "8px 22px", alignItems: "center", margin: "6px 0 10px" };
const btn = { padding: "3px 12px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer" };
const note = { fontSize: 14, color: "var(--muted)", margin: "6px 0" };

// 找一个贪心能成功的种子（从给定种子开始往后试）
function labeledInstance(n, q, ell, seed) {
  for (let s = seed; s < seed + 40; s++) {
    const A = G.randomSparse(n, 2, s), lab = G.greedyLabel(A, q, ell);
    if (lab.ok) return { A, lab, seed: s, tried: s - seed };
  }
  const A = G.randomSparse(n, 2, seed); return { A, lab: G.greedyLabel(A, q, ell), seed, tried: 40 };
}

// ======================= 1. ℓ = 1 的分解动画 =======================
export function Ell1Demo() {
  const [n, setN] = useState(10), [q, setQ] = useState(8), [seed, setSeed] = useState(1), [step, setStep] = useState(0), [pair, setPair] = useState(0);
  const D = useMemo(() => {
    const { A, lab, seed: s, tried } = labeledInstance(n, q, 1, seed);
    if (!lab.ok) return { A, lab, s, tried };
    const V = G.verifyLabels(A, lab, q, 1), F = G.factorization(A, lab, q, 1), { M } = F.om;
    const col = lab.alpha, ccol = lab.beta;                            // 行颜色、列颜色（0..q-1）
    const rows = range(n).sort((a, b) => col[a] - col[b] || a - b), cols = range(n).sort((a, b) => ccol[a] - ccol[b] || a - b);
    const LR = G.spmul(F.L, F.R), LIR = G.spmul(G.spmul(F.L, eye(M)), F.R), LJRp = G.spmul(G.spmul(F.L, F.J), F.Rp);
    const J2 = G.matEq(G.spmul(F.J, F.J), eye(M));
    const revOK = G.nonzeros(A).every(([u, v]) => qeq(F.Rp[F.om.index(ccol[v], col[u])][v], Q1));
    const B = G.spmul(F.L, F.Rp);
    const bc = G.blockCheck(B, col, ccol, range(q));
    const sq = G.squareSub(B, bc, seed);
    const diagZero = G.nonzeros(A).every(([u, v]) => col[u] !== ccol[v]);
    const perBlock = range(q).flatMap(a => range(q).filter(b => b !== a).map(b => G.nonzeros(A).filter(([u, v]) => col[u] === a && ccol[v] === b).length));
    const labs = range(M).map(j => { const l = F.om.label(j); return l.a + l.b; });
    // 一对颜色 {a,b} 的贡献
    const pairs = F.om.pairs.map(([a, b], k) => ({ a, b, k, used: G.nonzeros(A).some(([u, v]) => (col[u] === a && ccol[v] === b) || (col[u] === b && ccol[v] === a)) })).filter(p => p.used);
    return { A, lab, s, tried, V, F, M, col, ccol, rows, cols, LR, LIR, LJRp, J2, revOK, B, bc, sq, diagZero, maxPerBlock: Math.max(...perBlock), labs, pairs, perA: G.permDP(A) };
  }, [n, q, seed]);
  const ok = D.lab.ok;
  const P = ok ? D.pairs[Math.min(pair, D.pairs.length - 1)] : null;
  const PC = useMemo(() => {
    if (!ok || !P) return null;
    const keep = new Set([2 * P.k, 2 * P.k + 1]);
    const Ls = D.F.L.map(r => r.map((x, j) => (keep.has(j) ? x : Q0)));
    const viaX = G.spmul(G.spmul(Ls, D.F.J), D.F.Rp), viaI = G.spmul(Ls, D.F.Rp);
    const inAB = (u, v) => (D.col[u] === P.a && D.ccol[v] === P.b) || (D.col[u] === P.b && D.ccol[v] === P.a);
    const Arest = D.A.map((r, u) => r.map((x, v) => (inAB(u, v) ? x : Q0)));
    const diagOnly = viaI.every((r, u) => r.every((x, v) => qzero(x) || (D.col[u] === D.ccol[v] && (D.col[u] === P.a || D.col[u] === P.b))));
    return { viaX, viaI, okX: G.matEq(viaX, Arest), diagOnly };
  }, [D, P, ok]);
  const srt = Mx => G.permute(Mx, D.rows, D.cols);
  const rg = ok ? D.rows.map(u => D.col[u]) : [], cg = ok ? D.cols.map(v => D.ccol[v]) : [];
  const rl = ok ? D.rows.map(u => String(D.col[u] + 1)) : [], cl = ok ? D.cols.map(v => String(D.ccol[v] + 1)) : [];
  const pg = ok ? range(D.M).map(j => Math.floor(j / 2)) : [];
  const steps = ["着色与 (4.1)", "First：$A=LR$", "Next：$A=LIR$", R`Then：$A=L\cJ R'$`, "Finally：$B=LIR'$"];
  return (
    <RunCard title={R`$\ell=1$：把 $A$ 拆成 $L\cdot(\text{中间矩阵})\cdot R'$，再把中间换成 $I$`} lead={R`随机生成每行每列至多 $\Delta=2$ 个非零元的 $n\times n$ 矩阵（元素 1–3），用\sref{L4.1} 的贪心（$\ell=1$）着 $q$ 色，然后逐步构造 \eqref{4.2}–\eqref{4.4}。所有矩阵乘法都是精确有理数运算；行列都按颜色排好序，灰线是颜色分组，左/上方数字是颜色。`}>
      <div style={ctl}>
        <Slider label="$n$" value={n} min={8} max={12} onChange={setN} />
        <Slider label="$q$" value={q} min={6} max={10} onChange={setQ} />
        <button style={btn} onClick={() => setSeed(seed + 41)}>换一个随机矩阵</button>
      </div>
      {!ok ? <div style={note}>❗ 连试 40 个随机矩阵，贪心都卡住了（第 {D.lab.fail.index + 1} 个{D.lab.fail.side === "row" ? "行" : "列"}找不到可用颜色）。<TxI>{R`\sref{L4.1}`}</TxI> 保证成功的条件是 <TxI>{R`$q\ge4\Delta\sqrt n$`}</TxI>；小规模时大约要 <TxI>{R`$q\gtrsim\sqrt{4n}$`}</TxI>。请增大 <TxI>{"$q$"}</TxI>——这正是"一种颜色"需要 <TxI>{R`$q=\Theta(\sqrt n)$`}</TxI> 的直观原因。</div> : <>
        <div style={note}>种子 {D.s}{D.tried ? `（前 ${D.tried} 个随机矩阵贪心卡住，已自动跳过）` : ""}；<TxI>{R`$D=\lceil2n/q\rceil=$`}</TxI> {D.lab.D}，<TxI>{R`$M=q(q-1)=$`}</TxI> {D.M}；<TxI>{R`$\per(A)=$`}</TxI> {qstr(D.perA)}。</div>
        <Seg options={steps.map((s, i) => [i, s])} value={step} onChange={setStep} />
        <div style={{ marginTop: 10 }}>
          {step === 0 && <>
            <div style={row}><MatrixView M={srt(D.A)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title={R`$A$（行列按颜色排序）——式 \eqref{4.1}`} /></div>
            <Check ok={D.V.i} label={`每种颜色至多用 $D=${D.lab.D}$ 次（实际行 ${D.V.maxRow}、列 ${D.V.maxCol}）`} />
            <Check ok={D.diagZero} label="对角块全为零（非零元两端异色）" />
            <Check ok={D.maxPerBlock <= 1 && D.V.ii} label={`每个颜色块至多一个非零元（最多 ${D.maxPerBlock} 个）`} />
          </>}
          {step === 1 && <>
            <div style={row}>
              <MatrixView M={G.permute(D.F.L, D.rows, range(D.M))} rowGroups={rg} colGroups={pg} rowLabels={rl} title={`$L$（$${n}\\times${D.M}$；列按 $(1,2),(2,1);(1,3),(3,1);\\dots$ 排列）`} />
              <MatrixView M={G.permute(D.F.R, range(D.M), D.cols)} rowGroups={pg} colGroups={cg} colLabels={cl} title={`$R$（$${D.M}\\times${n}$）`} />
            </div>
            <div style={note}>每个非零元 <TxI>{"$A_{uv}=w$"}</TxI> 落在块 <TxI>{"$(a,b)$"}</TxI>：<TxI>{"$L[u,(a,b)]=w$"}</TxI>、<TxI>{"$R[(a,b),v]=1$"}</TxI>；空块对应全零的列/行。</div>
            <Check ok={G.matEq(D.LR, D.A)} label="$LR=A$" />
          </>}
          {step === 2 && <>
            <div style={row}><MatrixView M={eye(D.M)} rowGroups={pg} colGroups={pg} show={false} title={`$I$（$${D.M}\\times${D.M}$，按无序颜色对分成 $2\\times2$ 块）`} /></div>
            <Check ok={G.matEq(D.LIR, D.A)} label="$LIR=A$（什么都没变）" />
          </>}
          {step === 3 && <>
            <div style={row}>
              <MatrixView M={D.F.J} rowGroups={pg} colGroups={pg} show={false} title={R`$\cJ=\diag(X,\dots,X)$`} />
              <MatrixView M={G.permute(D.F.Rp, range(D.M), D.cols)} rowGroups={pg} colGroups={cg} colLabels={cl} title={R`$R'=\cJ R$（每对行互换）`} />
            </div>
            <Check ok={D.J2} label={R`$\cJ^2=I$`} />
            <Check ok={D.revOK} label={R`每个非零元现在出现在 $R'[(b,a),v]=1$`} />
            <Check ok={G.matEq(D.LJRp, D.A)} label={R`$L\cJ R'=A$ —— 式 \eqref{4.3}`} />
          </>}
          {step === 4 && <>
            <div style={row}>
              <MatrixView M={srt(D.B)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title={R`$B=LIR'$（同样的行列顺序）——式 \eqref{4.4}`} />
              <MatrixView M={srt(D.A)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title="对照：$A=L\cJ R'$" />
            </div>
            <Check ok={D.bc.off === 0} label={`块外非零元：${D.bc.off} 个`} />
            <Check ok={qeq(D.bc.per, D.bc.prod)} label={`$\\per(B)=\\prod_a\\per(B_a)$：${qstr(D.bc.per)} = ${qstr(D.bc.prod)}`} />
            <Check ok={qeq(D.sq.per, D.sq.prod)} label={`方子矩阵（每块取 $\\min(|I_a|,|J_a|)$ 行列）：$\\per(B[S,T])=${qstr(D.sq.per)}=\\prod_a\\per(\\cdot)=${qstr(D.sq.prod)}$`} />
            <div style={note}>各块尺寸（行 <TxI>{R`$\times$`}</TxI> 列）：<TxI>{D.bc.blocks.map(b => `${b.a + 1}: $${b.rows.length}\\times${b.cols.length}$`).join("，")}</TxI>。行数与列数不等的块积和式为 0，于是整个 <TxI>{"$\\per(B)$"}</TxI> 常常是 0——这无妨：<TxI>{R`\sref{L2.1}`}</TxI> 处理的是"块 + 低秩"的**方子矩阵**，块只需"对应"，不必是方的。注意 <TxI>{"$\\per(B)$"}</TxI> 与 <TxI>{"$\\per(A)$"}</TxI> 毫无关系（原文："One easy matrix is not enough"）。</div>
          </>}
        </div>
        <h4 style={{ margin: "16px 0 4px" }}>一对颜色的视角：<TxI>{R`$L_{\{a,b\}}XR'_{\{a,b\}}$ 与 $L_{\{a,b\}}I_2R'_{\{a,b\}}$`}</TxI></h4>
        <Seg options={D.pairs.map((p, i) => [i, `$\\{${p.a + 1},${p.b + 1}\\}$`])} value={Math.min(pair, D.pairs.length - 1)} onChange={setPair} />
        {PC && <><div style={row}>
          <MatrixView M={srt(PC.viaX)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title={`中间放 $X$：块 $(${P.a + 1},${P.b + 1})$ 与 $(${P.b + 1},${P.a + 1})$ 原样还原`} />
          <MatrixView M={srt(PC.viaI)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title={`中间放 $I_2$：落到对角块 $(${P.a + 1},${P.a + 1})$ 与 $(${P.b + 1},${P.b + 1})$`} />
        </div>
          <Check ok={PC.okX} label={R`$L_{\{a,b\}}XR'_{\{a,b\}}$ = $A$ 在块 $(a,b),(b,a)$ 上的部分`} />
          <Check ok={PC.diagOnly} label={R`$L_{\{a,b\}}I_2R'_{\{a,b\}}$ 只在对角块 $(a,a),(b,b)$ 上非零`} />
          <div style={note}>若块 <TxI>{"$(b,a)$"}</TxI> 是空的，<TxI>{R`$u_{ab}v_{ba}^{\mathsf T}=0$`}</TxI>：块 <TxI>{"$(a,b)$"}</TxI> 的那个元素在 <TxI>{"$B$"}</TxI> 中"消失"了——原文所说"a contribution may disappear when the reverse block is empty"。</div>
        </>}
      </>}
    </RunCard>);
}

// ======================= 2. 引理 4.1 的排除预算 =======================
const CONFIGS = [["2,4", R`$\ell=2,\ q=4$`], ["3,3", R`$\ell=3,\ q=3$`], ["2,3", R`$\ell=2,\ q=3$`], ["1,9", R`$\ell=1,\ q=9$`]];
export function BudgetDemo() {
  const [cfg, setCfg] = useState("2,4"), [n, setN] = useState(12), [seed, setSeed] = useState(1);
  const [ell, q] = cfg.split(",").map(Number);
  const D = useMemo(() => {
    const A = G.randomSparse(n, 2, seed), lab = G.greedyLabel(A, q, ell), Qw = q ** ell, Dl = lab.D, Delta = 2;
    const cs = lab.colStats;
    const mx = k => (cs.length ? Math.max(...cs.map(c => c[k])) : 0);
    return { lab, Qw, Dl, Delta, cs, full: mx("full"), pair: mx("pair"), coord: mx("coord"), V: lab.ok ? G.verifyLabels(A, lab, q, ell) : null };
  }, [cfg, n, seed]);
  const { Qw, Dl, Delta } = D;
  const cond1 = 4 * Delta * Math.sqrt(n) <= Qw && Qw <= n, cond2 = q >= 4 * Delta * ell;
  return (
    <RunCard title="引理 4.1 的贪心：每一列被排除了多少个词？" lead={R`对 $\Delta=2$ 的随机矩阵运行贪心（先标行、再标列、取第一个可用词），统计每一列选词时三类被排除的词数，并与证明里的预算比较。小规模时引理的充分条件通常**不**满足，但贪心往往照样成功——条件只是保证"永远成功"。`}>
      <div style={ctl}>
        <Seg options={CONFIGS} value={cfg} onChange={setCfg} />
        <Slider label="$n$" value={n} min={8} max={16} onChange={setN} />
        <button style={btn} onClick={() => setSeed(seed + 1)}>换一个随机矩阵（种子 {seed}）</button>
      </div>
      <div style={note}><TxI>{`$Q=q^\\ell=${Qw}$，$D=\\lceil2n/Q\\rceil=${Dl}$。`}</TxI>引理条件：<TxI>{`$4\\Delta\\sqrt n=${(4 * Delta * Math.sqrt(n)).toFixed(1)}\\le Q\\le n$`}</TxI> {cond1 ? "✔" : "✘"}；<TxI>{`$q\\ge4\\Delta\\ell=${4 * Delta * ell}$`}</TxI> {cond2 ? "✔" : "✘"}。</div>
      <Table head={["排除原因", "本次运行（各列最大值）", "证明中的上界", "上界的来源"]} rows={[
        ["已用满 $D$ 次的词", String(D.full), `$<n/D\\le Q/2=${Qw / 2}$`, "总共只标了 $<n$ 次"],
        ["与相邻行标号组成已用有序对", String(D.pair), `$\\le\\Delta^2D=${Delta * Delta * Dl}$`, "每个相邻行标号 $\\le\\Delta D$ 个"],
        ["与相邻行标号在某坐标相同", String(D.coord), `$\\le\\Delta\\ell Q/q=${Delta * ell * Qw / q}$`, "每坐标固定符号的词 $Q/q$ 个"],
        ["合计（可能重叠）", String(D.full + D.pair + D.coord), `$Q=${Qw}$`, "只要合计 $<Q$ 就有可用词"],
      ]} />
      {D.lab.ok
        ? <><Check ok label="贪心成功" /><Check ok={D.V.i} label="(i) 平衡" /><Check ok={D.V.ii} label="(ii) 有序对互异" /><Check ok={D.V.iii} label="(iii) 逐坐标不同" /></>
        : <Check ok={false} label={`贪心在第 ${D.lab.fail.index + 1} 个${D.lab.fail.side === "row" ? "行" : "列"}卡住（小规模时预算超支）`} />}
      <div style={note}>"合计"一栏是三类的简单相加（同一个词可能被多类同时排除），证明里也正是用这个和去和 <TxI>{"$Q$"}</TxI> 比较；和 <TxI>{"$<Q$"}</TxI> 是充分条件，和超过 <TxI>{"$Q$"}</TxI> 时（因为重叠）贪心也可能照样成功。试试 <TxI>{R`$\ell=2,q=3$`}</TxI>：坐标约束几乎排除了所有词（<TxI>{R`$\Delta\ell Q/q=12>Q=9$`}</TxI>），贪心多半卡住——这就是条件 <TxI>{R`$q\ge4\Delta\ell$`}</TxI> 的作用。</div>
    </RunCard>);
}

// ======================= 3. i-好矩阵检查器 =======================
function makeK(kind, ell, i, j, seed) {
  const h = 2 ** (ell - 1);
  switch (kind) {
    case "I": return G.KI(ell);
    case "X": return G.KX(ell);
    case "nice": return G.Knice(ell, i, G.randomSmall(h, seed));
    case "pres": return G.Kpreserve(ell, i, G.randomSmall(h, seed), G.randomSmall(h, seed + 17));
    case "flip": return G.Kflip(ell, j);
    default: return G.randomSmall(2 ** ell, seed, 0.5);
  }
}
const KOPTS = [["I", "$I$"], ["X", R`$X^{\otimes\ell}$`], ["nice", R`$I_2\otimes B$（第 $i$ 位）`], ["pres", "只保持第 $i$ 位"], ["flip", "$X_j$（只翻第 $j$ 位）"], ["rand", "随机"]];

export function NiceChecker() {
  const [ell, setEll] = useState(3), [kind, setKind] = useState("nice"), [i, setI] = useState(2), [j, setJ] = useState(1), [seed, setSeed] = useState(3);
  const ii = Math.min(i, ell), jj = Math.min(j, ell);
  const K = useMemo(() => makeK(kind, ell, ii, jj, seed), [kind, ell, ii, jj, seed]);
  const res = range(ell).map(k => G.niceness(K, ell, k + 1));
  const order = G.groupByBit(ell, ii), N = 2 ** ell;
  const Kg = G.permute(K, order, order), grp = order.map(x => G.bit(x, ii, ell));
  const labs = range(N).map(x => G.bitStr(x, ell)), labsG = order.map(x => G.bitStr(x, ell));
  const h = N / 2, B0 = range(h).map(a => range(h).map(b => Kg[a][b])), B1 = range(h).map(a => range(h).map(b => Kg[h + a][h + b]));
  return (
    <RunCard title="$i$-好矩阵检查器" lead={R`选一个 $2^\ell\times2^\ell$ 矩阵 $K$（行列以 $x\in\{0,1\}^\ell$ 为指标，位置 1 为最高位），对每个 $i$ 按 \eqref{4.8} 检查：(a) $x_i\ne y_i$ 处全为零（保持第 $i$ 位）；(b) $K[x,y]=K[x\oplus e_i,y\oplus e_i]$（对其余位的作用与第 $i$ 位取值无关）。两条都成立才是 $i$-好的。`}>
      <div style={ctl}>
        <Seg options={[[2, "$\\ell=2$"], [3, "$\\ell=3$"]]} value={ell} onChange={setEll} />
        <Seg options={KOPTS} value={kind} onChange={setKind} />
      </div>
      <div style={ctl}>
        <Slider label="分组用的 $i$" value={ii} min={1} max={ell} onChange={setI} />
        {kind === "flip" && <Slider label="$j$" value={jj} min={1} max={ell} onChange={setJ} />}
        {["nice", "pres", "rand"].includes(kind) && <button style={btn} onClick={() => setSeed(seed + 1)}>换随机元素</button>}
      </div>
      <Table head={["$i$", "保持第 $i$ 位", "两块相同", "$i$-好？"]} rows={res.map((r, k) => [String(k + 1), r.preserves ? "✔" : "✘", r.preserves ? (r.nice ? "✔" : "✘") : "—", r.nice ? "**是**" : "否"])} />
      <div style={row}>
        <MatrixView M={K} rowLabels={labs} colLabels={labs} title="$K$（原顺序）" />
        <MatrixView M={Kg} rowGroups={grp} colGroups={grp} rowLabels={labsG} colLabels={labsG} title={`按第 $${ii}$ 位分组（先 $x_{${ii}}=0$，再 $x_{${ii}}=1$）`} />
      </div>
      <Check ok={res[ii - 1].preserves} label={`非对角的两块为零（保持第 $${ii}$ 位）`} />
      <Check ok={G.matEq(B0, B1)} label="两个对角块相同" />
      <div style={note}>观察：<TxI>{"$I$"}</TxI> 对每个 <TxI>{"$i$"}</TxI> 都是 <TxI>{"$i$"}</TxI>-好的；<TxI>{R`$X^{\otimes\ell}$`}</TxI> 对哪个都不是；<TxI>{"$X_j$"}</TxI> 恰好对 <TxI>{R`$i\ne j$`}</TxI> 是 <TxI>{"$i$"}</TxI>-好的——§5 的 <TxI>{R`$J(t)=p\big(\sum_j(1-t/j)X_j\big)+E$`}</TxI> 在 <TxI>{"$t=i$"}</TxI> 处让 <TxI>{"$X_i$"}</TxI> 的系数变成 0，正是利用了这一点。"只保持第 <TxI>{"$i$"}</TxI> 位"的矩阵不是 <TxI>{"$i$"}</TxI>-好的，但在下一个示例里你会看到它照样让外层分块（<TxI>{R`\sref{L4.3}`}</TxI> 的证明只用到保持第 <TxI>{"$i$"}</TxI> 位）。</div>
    </RunCard>);
}

// ======================= 4. 词标号 + i-好分块 =======================
export function WordsDemo() {
  const [cfg, setCfg] = useState("2,4"), [n, setN] = useState(12), [seed, setSeed] = useState(1), [i, setI] = useState(1), [kind, setKind] = useState("nice"), [withE, setWithE] = useState(false), [kseed, setKseed] = useState(5);
  const [ell, q] = cfg.split(",").map(Number);
  const ii = Math.min(i, ell), jj = ii === 1 ? Math.min(2, ell) : 1;
  const base = useMemo(() => {
    const { A, lab, seed: s, tried } = labeledInstance(n, q, ell, seed);
    if (!lab.ok) return { A, lab, s, tried };
    const V = G.verifyLabels(A, lab, q, ell), F = G.factorization(A, lab, q, ell);
    return { A, lab, s, tried, V, F, perA: G.permDP(A) };
  }, [cfg, n, seed]);
  const ok = base.lab.ok;
  const out = useMemo(() => {
    if (!ok) return null;
    const { A, lab, F } = base;
    const K0 = makeK(kind, ell, ii, jj, kseed);
    const E = withE ? G.rankOne(2 ** ell, kseed) : null;
    const K = E ? G.matAdd(K0, E) : K0;
    const O = G.outer(F, K);
    const rk = lab.alpha.map(w => G.digit(w, ii, q, ell)), ck = lab.beta.map(w => G.digit(w, ii, q, ell));
    const nb = G.niceness(K0, ell, ii);
    const Eout = E ? G.outer(F, E) : null;
    const Bpart = E ? G.outer(F, K0) : O;
    const bc = G.blockCheck(Bpart, rk, ck, range(q), nb.preserves);
    const sq = nb.preserves ? G.squareSub(Bpart, bc, kseed) : null;
    const rankE = E ? G.rank(E) : 0, rankEout = E ? G.rank(Eout) : 0;
    const offO = G.blockCheck(O, rk, ck, range(q), false).off;
    return { K0, K, O, rk, ck, nb, bc, sq, E, Eout, rankE, rankEout, offO, isA: G.matEq(O, A) };
  }, [base, kind, ii, jj, kseed, withE]);
  if (!ok) return <RunCard title="词标号 + $i$-好分块"><div style={note}>贪心未能成功，请换参数。</div></RunCard>;
  const { A, lab, F } = base, Qw = q ** ell, bound = (Qw / q) * lab.D;
  const rows = out.bc.rows, cols = out.bc.cols;
  const rg = rows.map(u => out.rk[u]), cg = cols.map(v => out.ck[v]);
  const rl = rows.map(u => String(out.rk[u] + 1)), cl = cols.map(v => String(out.ck[v] + 1));
  const ws = w => G.wordStr(w, q, ell);
  const cube = range(F.om.M).map(j => Math.floor(j / F.om.two));
  const order = G.groupByBit(ell, ii), kg = order.map(x => G.bit(x, ii, ell)), kl = order.map(x => G.bitStr(x, ell));
  return (
    <RunCard title={R`词标号 + $i$-好分块：$L(I_C\otimes K)R'$ 按第 $i$ 个符号分块`} lead={R`用\sref{L4.1} 的贪心给行列分配 $[q]^\ell$ 中的词，构造 \eqref{4.6}–\eqref{4.7} 的 $\Omega$、$L$、$R'$；然后任选中间矩阵 $K$，计算 $L(I_C\otimes K)R'$，把行按 $\alpha(u)_i$、列按 $\beta(v)_i$ 分组（左/上方数字是第 $i$ 个符号）。切换 $i$ 看分块方式如何改变；把 $K$ 换成 $X^{\otimes\ell}$ 则恢复 $A$。`}>
      <div style={ctl}>
        <Seg options={CONFIGS.slice(0, 2)} value={cfg} onChange={setCfg} />
        <Slider label="$n$" value={n} min={8} max={16} onChange={setN} />
        <button style={btn} onClick={() => setSeed(seed + 41)}>换一个随机矩阵</button>
      </div>
      <div style={note}>种子 {base.s}；<TxI>{`$Q=${Qw}$，$D=${lab.D}$，$|C|=\\binom{${q}}{2}^{${ell}}=${F.om.nCube}$，$M=(q(q-1))^\\ell=${F.om.M}$`}</TxI>；<TxI>{R`$\per(A)=$`}</TxI> {qstr(base.perA)}。</div>
      <Table head={["", ...range(n).map(k => String(k + 1))]} rows={[["行标号 $\\alpha(u)$", ...lab.alpha.map(ws)], ["列标号 $\\beta(v)$", ...lab.beta.map(ws)]]} />
      <Check ok={base.V.i} label={`(i) 每个词至多 $D=${lab.D}$ 行、$D$ 列（实际 ${base.V.maxRow}、${base.V.maxCol}）`} />
      <Check ok={base.V.ii} label="(ii) 不同非零元的有序标号对互异" />
      <Check ok={base.V.iii} label="(iii) 每个非零元两端逐坐标不同" />
      <Check ok={G.matEq(G.spmul(F.L, F.R), A)} label="$LR=A$" />
      <Check ok={G.matEq(G.outer(F, G.KX(ell)), A)} label={R`$L(I_C\otimes X^{\otimes\ell})R'=A$ —— 式 \eqref{4.7}`} />
      <div style={row}>
        <MatrixView M={F.L} colGroups={cube} show={false} maxPx={640} title={`$L$（$${n}\\times${F.om.M}$，灰线分隔 $${F.om.nCube}$ 个立方体，每个 $2^${ell}$ 列）`} />
      </div>
      <h4 style={{ margin: "14px 0 4px" }}>选中间矩阵 <TxI>{"$K$"}</TxI> 与分组坐标 <TxI>{"$i$"}</TxI></h4>
      <div style={ctl}>
        <Seg options={KOPTS} value={kind} onChange={setKind} />
        <Slider label="$i$" value={ii} min={1} max={ell} onChange={setI} />
        <label><input type="checkbox" checked={withE} onChange={e => setWithE(e.target.checked)} /> 加一个秩 1 误差 <TxI>{"$E$"}</TxI></label>
        <button style={btn} onClick={() => setKseed(kseed + 1)}>换 <TxI>{"$K$"}</TxI> 的随机元素</button>
      </div>
      {kind === "flip" && <div style={note}>这里取 <TxI>{`$j=${jj}\\ne i$`}</TxI>。</div>}
      <div style={row}>
        <MatrixView M={G.permute(out.K, order, order)} rowGroups={kg} colGroups={kg} rowLabels={kl} colLabels={kl} title={`$K${withE ? "=K_0+E" : ""}$（按第 $${ii}$ 位分组）`} />
        <MatrixView M={G.permute(out.O, rows, cols)} rowGroups={rg} colGroups={cg} rowLabels={rl} colLabels={cl} title={`$L(I_C\\otimes K)R'$，按第 $${ii}$ 个符号分组`} />
        {withE && <MatrixView M={G.permute(out.Eout, rows, cols)} rowGroups={rg} colGroups={cg} title={R`$E_{\rm out}=L(I_C\otimes E)R'$`} />}
      </div>
      <div>
        <Check ok={out.nb.nice} label={`$K${withE ? "_0" : ""}$ 是 $${ii}$-好的`} />
        {out.nb.preserves
          ? <><Check ok={out.bc.off === 0} label={`${withE ? "$B_i=L(I_C\\otimes K_0)R'$" : "外层矩阵"} 块外非零元 ${out.bc.off} 个 —— \\sref{L4.3}`} />
            <Check ok={out.bc.maxRows <= bound && out.bc.maxCols <= bound} label={`块尺寸 $\\le(Q/q)D=${bound}$（实际最大 ${out.bc.maxRows} 行、${out.bc.maxCols} 列）—— 式 \\eqref{4.5}`} />
            <Check ok={qeq(out.bc.per, out.bc.prod)} label={`$\\per=\\prod_a\\per(\\text{块})$：${qstr(out.bc.per)} = ${qstr(out.bc.prod)}`} />
            <Check ok={qeq(out.sq.per, out.sq.prod)} label={`方子矩阵 $\\per(B[S,T])=${qstr(out.sq.per)}=\\prod_a=${qstr(out.sq.prod)}$`} /></>
          : <Check ok={out.offO > 0 || out.isA} label={`$K$ 不保持第 $${ii}$ 位：块外有 ${out.offO} 个非零元，不分块`} />}
        {out.isA && <Check ok label="外层矩阵 $=A$（中间是 $X^{\otimes\ell}$）" />}
        {withE && <><Check ok={out.rankEout <= F.om.nCube * out.rankE} label={`$\\rank(E_{\\rm out})=${out.rankEout}\\le|C|\\rank(E)=${F.om.nCube}\\cdot${out.rankE}$ —— 式 \\eqref{4.9}`} />
          <Check ok={G.matEq(G.matAdd(G.outer(F, out.K0), out.Eout), out.O)} label="外层 = $B_i+E_{\rm out}$（线性）" /></>}
      </div>
      <div style={note}>块尺寸列表（第 <TxI>{"$i$"}</TxI> 个符号 <TxI>{R`$=1,\dots,q$`}</TxI>）：<TxI>{out.bc.blocks.map(b => `${b.a + 1}: $${b.rows.length}\\times${b.cols.length}$`).join("，")}</TxI>。小规模下 <TxI>{R`$(Q/q)D$`}</TxI> 才是紧的界；<TxI>{R`$3n/q$`}</TxI> 需要 <TxI>{R`$Q\le n$`}</TxI>（此处 {Qw <= n ? "满足" : "不满足"}）。</div>
    </RunCard>);
}
