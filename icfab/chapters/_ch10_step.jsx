// 台阶覆盖模拟器（图 10.42 交互版）：沟槽（2D）与通孔（3D 圆柱）中，按到达角分布 cosⁿθ 与粘附系数 S_C
// 计算各处的"初始"沉积速率（视角因子 + 余弦再发射的线性方程组）。数值核心见 _ch10_phys.jsx。
import { useDeferredValue, useMemo, useState } from "react";
import { M } from "@kit";
import { trenchCoverage, viaCoverage, summarize } from "./_ch10_phys.jsx";
import { Svg, T, C, box, Range } from "./_ch10_svg.jsx";

const R = String.raw;

function Section({ x0, kind, res, AR, title }) {
  const sc = Math.min(110, 210 / AR), W = sc, D = AR * sc, top = 40, tv = 0.16 * sc;   // tv：平面处膜厚（示意放大）
  const xL = x0 + 60, xR = xL + W, yB = top + D;
  const el = res.el, g = res.g, parts = [];
  // 衬底
  parts.push(<path key="sub" d={`M ${x0} ${top} L ${xL} ${top} L ${xL} ${yB} L ${xR} ${yB} L ${xR} ${top} L ${xR + 60} ${top} L ${xR + 60} ${yB + 30} L ${x0} ${yB + 30} Z`} fill={C.si} stroke="#555" />);
  // 平面上的膜（相对厚度 1）
  parts.push(<rect key="fl" x={x0} y={top - tv} width={60} height={tv} fill={C.ox} stroke={C.oxD} strokeWidth={0.6} />);
  parts.push(<rect key="fr" x={xR} y={top - tv} width={60} height={tv} fill={C.ox} stroke={C.oxD} strokeWidth={0.6} />);
  el.forEach((e, i) => {
    const t = Math.max(0, g[i]) * tv;
    if (kind === "trench") {
      if (e.part === "L") parts.push(<rect key={i} x={xL} y={top + (e.t - 0.5 / (el.filter(q => q.part === "L").length)) * D} width={t} height={D * e.s / AR + 0.6} fill={C.ox} />);
      else if (e.part === "R") parts.push(<rect key={i} x={xR - t} y={top + (e.t - 0.5 / (el.filter(q => q.part === "R").length)) * D} width={t} height={D * e.s / AR + 0.6} fill={C.ox} />);
      else parts.push(<rect key={i} x={xL + (e.x - e.s / 2) * W} y={yB - t} width={e.s * W + 0.6} height={t} fill={C.ox} />);
    } else {
      if (e.wall) {
        const y = top + (e.t - 0.5 / el.filter(q => q.wall).length) * D, h = D / el.filter(q => q.wall).length + 0.6;
        parts.push(<rect key={`a${i}`} x={xL} y={y} width={t} height={h} fill={C.ox} />, <rect key={`b${i}`} x={xR - t} y={y} width={t} height={h} fill={C.ox} />);
      } else {
        const a = e.r0 * W, b = e.r1 * W, cx = (xL + xR) / 2;
        parts.push(<rect key={`c${i}`} x={cx + a} y={yB - t} width={b - a + 0.6} height={t} fill={C.ox} />, <rect key={`d${i}`} x={cx - b} y={yB - t} width={b - a + 0.6} height={t} fill={C.ox} />);
      }
    }
  });
  parts.push(<text key="tt" x={x0 + 60 + W / 2} y={18} textAnchor="middle" fontSize={14} fontWeight={600}>{title}</text>);
  return <g>{parts}</g>;
}

export function StepCoverage() {
  const [AR, setAR] = useState(4 / 3), [n, setN] = useState(3), [lsc, setLsc] = useState(Math.log10(0.2));
  const q = useDeferredValue({ AR, n, Sc: 10 ** lsc });
  const tr = useMemo(() => trenchCoverage(q.AR, q.n, q.Sc), [q.AR, q.n, q.Sc]);
  const vi = useMemo(() => viaCoverage(q.AR, q.n, q.Sc), [q.AR, q.n, q.Sc]);
  const st = summarize(tr, "trench"), sv = summarize(vi, "via");
  const sc = Math.min(110, 210 / AR), h = 40 + AR * sc + 40;
  const row = (k, a, b) => <tr key={k}><td style={{ padding: "2px 10px" }}>{k}</td><td style={{ textAlign: "right", padding: "2px 10px" }}>{a.toFixed(2)}</td><td style={{ textAlign: "right", padding: "2px 10px" }}>{b.toFixed(2)}</td></tr>;
  return <div style={box}>
    <Svg title="沟槽与通孔中的初始沉积厚度分布（相对平面处），浅蓝为沉积膜（厚度放大示意）" h={Math.max(200, h)}>
      <Section x0={40} kind="trench" res={tr} AR={q.AR} title="沟槽（2D，沿纸面方向无限长）" />
      <Section x0={380} kind="via" res={vi} AR={q.AR} title="圆柱通孔（3D）" />
    </Svg>
    <Range label={<M>{R`\text{深宽比 AR}=H/W`}</M>} value={AR} set={setAR} min={0.25} max={5} step={0.05} fmt={v => v.toFixed(2)} />
    <Range label={<M>{R`\text{到达角分布}\ \cos^n\theta\ \text{的}\ n`}</M>} value={n} set={setN} min={1} max={30} step={1} />
    <Range label={<M>{R`\text{粘附系数}\ S_C`}</M>} value={lsc} set={setLsc} min={-2} max={0} step={0.02} fmt={v => (10 ** v).toFixed(v < -1 ? 3 : 2)} />
    <table style={{ fontSize: 14, borderCollapse: "collapse", margin: "6px auto" }}>
      <thead><tr><th style={{ textAlign: "left", padding: "2px 10px" }}>相对平面的厚度</th><th style={{ padding: "2px 10px" }}>沟槽</th><th style={{ padding: "2px 10px" }}>通孔</th></tr></thead>
      <tbody>{row("侧壁顶端", st.wallTop, sv.wallTop)}{row("侧壁中点", st.wallMid, sv.wallMid)}{row("侧壁最薄处（台阶覆盖率）", st.wallMin, sv.wallMin)}{row("底部中心", st.bottomCenter, sv.bottomCenter)}</tbody>
    </table>
    <p style={{ fontSize: 13, margin: 0, color: "#5f5a52" }}>简化模型：几何固定为理想矩形/圆柱（只算沉积初期的速率分布，不追踪轮廓演化，故算不出鼓包与锁孔）；粒子沿直线飞行（分子流）；未粘附者按理想余弦分布再发射，可多次弹跳；同一 <M>{R`S_C`}</M> 用于所有表面。核对：<M>{R`n=1,\ S_C=1,\ \text{AR}=1`}</M> 时沟槽底部中心为 <M>{R`\sin\alpha=1/\sqrt5=0.447`}</M>、通孔为 <M>{R`\sin^2\alpha=0.2`}</M>；<M>{R`S_C\to0`}</M> 时处处趋于 1。</p>
  </div>;
}
