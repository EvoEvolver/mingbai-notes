// 第 1 页可运行示例：积和式 = 二部图完美匹配的权重和（与行列式对照）。
import { useMemo, useState } from "react";
import { TxI, RunCard, Check, Slider } from "@kit";
import { q, qstr, qadd, qmul, qsub, Q0, Q1, permRyser, rng } from "./_rat.js";

const R = String.raw;
function matchings(A) {
  const n = A.length, out = [], used = Array(n).fill(false), cur = [];
  const go = u => {
    if (u === n) { out.push(cur.slice()); return; }
    for (let v = 0; v < n; v++) if (!used[v] && A[u][v] !== 0) { used[v] = true; cur.push(v); go(u + 1); cur.pop(); used[v] = false; }
  };
  go(0); return out;
}
const sign = p => { let s = 1; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) if (p[i] > p[j]) s = -s; return s; };

export function MatchingDemo() {
  const [n, setN] = useState(4), [seed, setSeed] = useState(3), [dens, setDens] = useState(0.55);
  const [sel, setSel] = useState(0);
  const A = useMemo(() => { const g = rng(seed * 7919 + n); return Array.from({ length: n }, () => Array.from({ length: n }, () => (g() < dens ? 1 + Math.floor(g() * 3) : 0))); }, [n, seed, dens]);
  const [edits, setEdits] = useState({});
  const M = A.map((r, i) => r.map((x, j) => edits[`${n}-${seed}-${i}-${j}`] ?? x));
  const ms = useMemo(() => matchings(M), [JSON.stringify(M)]);
  const weight = p => p.reduce((s, v, u) => s * M[u][v], 1);
  const per = ms.reduce((s, p) => s + weight(p), 0), det = ms.reduce((s, p) => s + sign(p) * weight(p), 0);
  const ryser = Number(permRyser(M.map(r => r.map(x => q(x)))).n);
  const cur = ms[Math.min(sel, ms.length - 1)];
  const W = 360, H = 40 + n * 46, xl = 70, xr = 290, y = i => 34 + i * 46;
  const cycle = (i, j) => setEdits(e => ({ ...e, [`${n}-${seed}-${i}-${j}`]: (M[i][j] + 1) % 4 }));
  return (
    <RunCard title="积和式就是完美匹配的权重和" lead={R`点击矩阵元素可循环改为 0–3；右侧二部图中的每条边是一个非零元。列表中每一行是一个完美匹配（一个排列 $\pi$），积和式把它们的权重**全部相加**，行列式则按排列的奇偶加减。`}>
      <div className="run-row">
        <div>
          <Slider label="$n$" value={n} min={2} max={6} onChange={v => { setN(v); setSel(0); }} />
          <Slider label="密度" value={dens} min={0.2} max={1} step={0.05} onChange={setDens} fmt={v => v.toFixed(2)} />
          <button className="run-btn" onClick={() => { setSeed(seed + 1); setSel(0); }}>换一个随机矩阵</button>
          <table className="tb-table" style={{ width: "auto", marginTop: 10 }}><tbody>{M.map((r, i) => <tr key={i}>{r.map((x, j) => <td key={j} onClick={() => cycle(i, j)} style={{ cursor: "pointer", textAlign: "center", width: 30, background: cur && cur[i] === j ? "#fdf0c8" : x ? "#eef2f8" : undefined, fontWeight: cur && cur[i] === j ? 700 : 400 }}>{x}</td>)}</tr>)}</tbody></table>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: "100%" }}>
          <text x={xl} y={16} textAnchor="middle" fontSize="12" fill="#6b6257">行 u</text>
          <text x={xr} y={16} textAnchor="middle" fontSize="12" fill="#6b6257">列 v</text>
          {M.map((r, i) => r.map((x, j) => x ? <line key={i + "-" + j} x1={xl} y1={y(i)} x2={xr} y2={y(j)} stroke={cur && cur[i] === j ? "#9b2c1f" : "#cbbfa8"} strokeWidth={cur && cur[i] === j ? 3 : 1 + x * 0.4} /> : null))}
          {M.map((_, i) => <g key={i}><circle cx={xl} cy={y(i)} r={11} fill="#2c4a6e" /><text x={xl} y={y(i) + 4} textAnchor="middle" fontSize="11" fill="#fff">{i + 1}</text>
            <circle cx={xr} cy={y(i)} r={11} fill="#3c6b4a" /><text x={xr} y={y(i) + 4} textAnchor="middle" fontSize="11" fill="#fff">{i + 1}</text></g>)}
        </svg>
        <div className="run-out" style={{ minWidth: 220 }}>
          <b>完美匹配 {ms.length} 个</b>
          <div style={{ maxHeight: 220, overflow: "auto" }}><table><tbody>{ms.map((p, k) => <tr key={k} onMouseEnter={() => setSel(k)} style={{ background: k === sel ? "#fdf0c8" : undefined, cursor: "pointer" }}>
            <td><TxI>{`$\\pi=(${p.map(v => v + 1).join("\\,")})$`}</TxI></td><td>权重 {weight(p)}</td><td className="muted">{sign(p) > 0 ? "偶" : "奇"}</td></tr>)}</tbody></table></div>
          <div style={{ marginTop: 6 }}><TxI>{`$\\per(A)=${per}$，$\\det(A)=${det}$`}</TxI></div>
          <Check ok={ryser === per} label={`Ryser 公式 (2.1) 给出 ${ryser}`} />
        </div>
      </div>
    </RunCard>);
}
