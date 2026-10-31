// 第 6 页可运行示例：度数约简的路径小工具（§6 "To bound individual degrees"）。
import { useMemo, useState } from "react";
import { TxI, RunCard, Check, Slider, MatrixView } from "@kit";
import { rng } from "./_rat.js";
import { fromMatrix, expand, maxDeg, perSparse } from "./_ch06_gadget.js";

const R = String.raw;
const toMat = G => { const M = [...Array(G.nl)].map(() => Array(G.nr).fill(0)); G.E.forEach(e => (M[e.l][e.r] = Number(e.w))); return M; };

export function GadgetDemo() {
  const [seed, setSeed] = useState(1), [thr, setThr] = useState(3), [dens, setDens] = useState(0.6);
  const A = useMemo(() => {   // 取第一个积和式非零的随机矩阵，演示才有意义
    for (let t = 0; ; t++) { const g = rng(seed * 104729 + 17 + t * 7); const M = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => (g() < dens ? 1 + Math.floor(g() * 3) : 0))); if (t > 200 || perSparse(fromMatrix(M)).value !== 0n) return M; }
  }, [seed, dens]);
  const res = useMemo(() => {
    const G0 = fromMatrix(A), G1 = expand(G0, "l", thr), G2 = expand(G1, "r", thr);
    return { G0, G1, G2, p0: perSparse(G0), p2: perSparse(G2) };
  }, [A, thr]);
  const { G0, G2, p0, p2 } = res;
  const M2 = toMat(G2);
  return (
    <RunCard title="把高度顶点换成路径：积和式不变，最大度变成 3" lead={R`随机 $4\times4$ 矩阵（二部图）。度 $\ge$ 阈值的每个顶点先在左侧、再在右侧被换成 $2k-1$ 个顶点的路径（原边接在奇数位置，路径边权 1）。然后用精确的稀疏 DP 分别计算两个积和式。`}>
      <div className="run-row">
        <div style={{ minWidth: 260 }}>
          <Slider label="替换阈值 $k\ge$" value={thr} min={2} max={4} onChange={setThr} />
          <Slider label="密度" value={dens} min={0.3} max={0.9} step={0.05} onChange={setDens} fmt={v => v.toFixed(2)} />
          <button className="run-btn" onClick={() => setSeed(seed + 1)}>换一个随机矩阵</button>
          <MatrixView M={A} title="原矩阵 $A$（4×4）" cell={30} />
        </div>
        <div>
          <MatrixView M={M2} title={`替换后（${G2.nl}×${G2.nr}），路径边为 1`} cell={18} show={G2.nl <= 24} maxPx={460}
            rowLabels={G2.nl <= 24 ? G2.origin.l : undefined} colLabels={G2.nr <= 24 ? G2.origin.r : undefined} />
        </div>
        <div className="run-out">
          <table><tbody>
            <tr><td>维数</td><td>{G0.nl} → {G2.nl}</td></tr>
            <tr><td>非零元</td><td>{G0.E.length} → {G2.E.length}</td></tr>
            <tr><td>最大度</td><td>{maxDeg(G0)} → {maxDeg(G2)}</td></tr>
            <tr><td><TxI>{R`$\per$`}</TxI></td><td>{String(p0.value)} → {String(p2.value)}</td></tr>
          </tbody></table>
          <Check ok={p0.value === p2.value} label="加权匹配和不变" />
          <Check ok={thr > 3 || maxDeg(G2) <= 3} label="最大度 $\le 3$" />
          <Check ok={G2.nl - G0.nl === (G2.E.length - G0.E.length) / 2} label="新增顶点数 = 新增路径边数 / 2（线性规模）" />
          <p className="muted" style={{ fontSize: 13 }}>行/列标签 r2·3 表示"原第 2 行的路径上第 3 个位置"。阈值取 4 时度为 3 的顶点保留，最大度可能仍为 3。</p>
        </div>
      </div>
    </RunCard>);
}
