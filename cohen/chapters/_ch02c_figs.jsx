// 第 II 章补充材料自绘插图：图 A-1（Schwarz 不等式的几何：减去投影后的余量）
import { useState } from "react";
import { M, renderTex } from "@kit";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREY = "#9a948b", GOLD = "#b8862b";
function T({ tex, x, y, w = 160, h = 24, align = "left", color, size }) {
  const dx = align === "center" ? -w / 2 : align === "right" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible", pointerEvents: "none" }}>
    <div className="plot-tex" style={{ textAlign: align, color, fontSize: size, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
}

// 实二维中的 φ1、φ2；ψ(λ) = φ1 + λ φ2，|ψ|² 关于 λ 的抛物线在 λ* = −(φ2·φ1)/(φ2·φ2) 处最小
const P1 = [1.0, 1.6], P2 = [2.2, 0.5];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export function ProjectionSketch() {
  const [lam, setLam] = useState(-0.2);
  const lStar = -dot(P2, P1) / dot(P2, P2);
  const psi = [P1[0] + lam * P2[0], P1[1] + lam * P2[1]];
  const n2 = dot(psi, psi), nMin = dot(P1, P1) - dot(P1, P2) ** 2 / dot(P2, P2);
  const W = 680, H = 260, ox = 110, oy = 200, s = 70;
  const X = v => ox + s * v[0], Y = v => oy - s * v[1];
  const ar = (v, w0, c, id, from = [0, 0]) => <g>
    <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill={c} /></marker></defs>
    <line x1={X(from)} y1={Y(from)} x2={X(v)} y2={Y(v)} stroke={c} strokeWidth={w0} markerEnd={`url(#${id})`} /></g>;
  // 右侧：|ψ|² 随 λ 的抛物线
  const px0 = 420, pw = 240, py0 = 220, ph = 180, lmin = -1.5, lmax = 1, nmax = 10;
  const PX = l => px0 + (l - lmin) / (lmax - lmin) * pw, PY = v => py0 - v / nmax * ph;
  let d = ""; for (let i = 0; i <= 120; i++) { const l = lmin + (lmax - lmin) * i / 120, q = [P1[0] + l * P2[0], P1[1] + l * P2[1]]; d += `${i ? "L" : "M"}${PX(l).toFixed(1)},${PY(Math.min(nmax, dot(q, q))).toFixed(1)}`; }
  const foot = [-lStar * P2[0], -lStar * P2[1]];          // φ1 在 φ2 方向上的投影
  return (
    <div className="plot card">
      <div className="plot-params">
        <label className="plot-param"><span className="plot-plabel"><M>{R`\lambda=${lam.toFixed(2)}`}</M></span>
          <input type="range" min={lmin} max={lmax} step={0.01} value={lam} onChange={e => setLam(+e.target.value)} /></label>
        <button className="plot-reset" onClick={() => setLam(+lStar.toFixed(4))}>取最优 <M>{R`\lambda`}</M>（式 AII-5）</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <line x1={X([-1.2 * P2[0], -1.2 * P2[1]])} y1={Y([-1.2 * P2[0], -1.2 * P2[1]])} x2={X([1.5 * P2[0], 1.5 * P2[1]])} y2={Y([1.5 * P2[0], 1.5 * P2[1]])} stroke="#e1d8c6" strokeDasharray="4 4" />
        <line x1={X([P1[0] + lmin * P2[0], P1[1] + lmin * P2[1]])} y1={Y([P1[0] + lmin * P2[0], P1[1] + lmin * P2[1]])} x2={X([P1[0] + lmax * P2[0], P1[1] + lmax * P2[1]])} y2={Y([P1[0] + lmax * P2[0], P1[1] + lmax * P2[1]])} stroke={GOLD} strokeDasharray="2 3" />
        {ar(P2, 2, GREY, "a2c1")}
        {ar(P1, 2.4, INK, "a2c2")}
        {ar(foot, 1.6, GREY, "a2c3")}
        <line x1={X(foot)} y1={Y(foot)} x2={X(P1)} y2={Y(P1)} stroke={GREY} strokeDasharray="3 3" />
        {ar(psi, 2.6, BLUE, "a2c4")}
        {ar(psi, 1.2, RED, "a2c5", P1)}
        <T tex={R`\ket{\varphi_1}`} x={X(P1) + 6} y={Y(P1) - 8} w={60} />
        <T tex={R`\ket{\varphi_2}`} x={X(P2) + 4} y={Y(P2) + 12} w={60} color={GREY} />
        <T tex={R`\ket\psi=\ket{\varphi_1}+\lambda\ket{\varphi_2}`} x={X(psi) - 6} y={Y(psi) - 14} w={190} align="right" color={BLUE} />
        <T tex={R`\lambda\ket{\varphi_2}`} x={(X(P1) + X(psi)) / 2 + 6} y={(Y(P1) + Y(psi)) / 2 - 4} w={60} color={RED} />
        {/* 抛物线 */}
        <line x1={px0} x2={px0 + pw} y1={py0} y2={py0} stroke={INK} />
        <line x1={PX(0)} x2={PX(0)} y1={py0} y2={py0 - ph} stroke="#e1d8c6" />
        <path d={d} fill="none" stroke={INK} strokeWidth={1.8} />
        <line x1={px0} x2={px0 + pw} y1={PY(nMin)} y2={PY(nMin)} stroke={GOLD} strokeDasharray="4 3" />
        <circle cx={PX(lam)} cy={PY(Math.min(nmax, n2))} r={5} fill={BLUE} />
        <T tex={R`\braket{\psi|\psi}`} x={px0 - 4} y={py0 - ph - 4} w={80} align="right" />
        <T tex={R`\lambda`} x={px0 + pw + 4} y={py0} w={20} />
        <T tex={R`\min=\braket{\varphi_1|\varphi_1}-\frac{|\braket{\varphi_1|\varphi_2}|^2}{\braket{\varphi_2|\varphi_2}}=${nMin.toFixed(3)}`} x={px0 + pw} y={PY(nMin) - 16} w={300} align="right" color={GOLD} size={12} />
      </svg>
      <p style={{ margin: "0.3em 0", fontSize: 14.5 }}><M>{R`\braket{\psi|\psi}=${n2.toFixed(3)}\ \ge\ ${nMin.toFixed(3)}\ \ (\lambda^*=${lStar.toFixed(3)})`}</M>；由此 <M>{R`\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}=${(dot(P1, P1) * dot(P2, P2)).toFixed(3)}\ \ge\ \braket{\varphi_1|\varphi_2}^2=${(dot(P1, P2) ** 2).toFixed(3)}`}</M></p>
    </div>);
}
