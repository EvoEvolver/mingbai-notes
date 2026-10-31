// 第 11 章交互图（全部在浏览器内真算；计算核心在 _ch11_alg.js）：
//  1. MonopoleLab   —— 例 11.2：S² 上单极子丛的第一陈数。两张卡上的势 A_N、A_S（可加整体扰动 α 与北卡规范变换 dλ），
//                       数值差分求场强、分卡积分；核对 (1/2π)∫F = 2g、c₁ = (i/2π)∫𝓕 = −2g，以及边界公式 ∮(A_N − A_S)
//  2. SplitLab      —— 分裂原理计算器：由陈根 x_i 符号展开 ch、Td（复）与 L、Â（实），与原书 (11.51c)(11.67)(11.92)(11.96) 逐项比对；
//                       数值核对 (11.75) 的迹公式、Pfaffian 与 det、(11.94) 的系数勘误
//  3. GaussBonnetLab —— (11.83)：任意旋转曲面上 ∫e = (1/2π)∫K dA，鼓包球面/椭球恒为 2，环面恒为 0
import { useMemo, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg } from "@kit";
import * as Al from "./_ch11_alg.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6 };
const f4 = v => (Math.abs(v) < 5e-10 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(3) : v.toFixed(5));
const Tbl = ({ head, rows }) => (
  <div className="tb-table-wrap"><table className="tb-table">
    <thead><tr>{head.map((h, i) => <th key={i}><TxI>{h}</TxI></th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "string" ? <TxI>{c}</TxI> : c}</td>)}</tr>)}</tbody>
  </table></div>);
// 发散色标：负 → 蓝，零 → 米白，正 → 红
function diverge(v, vmax) {
  const t = Math.max(-1, Math.min(1, v / (vmax || 1)));
  const base = [250, 246, 236], pos = [178, 58, 42], neg = [44, 90, 150];
  const c = t >= 0 ? pos : neg, s = Math.abs(t);
  return `rgb(${base.map((b, i) => Math.round(b + (c[i] - b) * s)).join(",")})`;
}

// ============================================================
// 1. 单极子丛的第一陈数（例 11.2，式 11.52–11.53）
// ============================================================
export function MonopoleLab() {
  const [g2, setG2] = useState(1);        // 磁荷 2g（= 转移函数的卷绕数 n）
  const [eps, setEps] = useState(0);      // 整体扰动 α 的强度
  const [kap, setKap] = useState(0);      // 北卡规范变换 λ_N 的强度
  const [th0, setTh0] = useState(Math.PI / 2);   // 两卡分界的纬度
  const [az, setAz] = useState(0.5);
  const res = useMemo(() => Al.monopoleFlux({ g2, eps, kappa: kap, theta0: th0 }), [g2, eps, kap, th0]);
  const TAU = 2 * Math.PI;
  const flux = res.flux / TAU, fN = res.fluxN / TAU, fS = res.fluxS / TAU, bnd = res.bnd / TAU;
  const integer = Math.abs(g2 - Math.round(g2)) < 1e-9;
  // 正交投影的球面着色（只画朝向读者的半球）
  const cells = useMemo(() => {
    const out = [], nT = 30, nP = 48, el = 0.35, cx = 150, cy = 150, sc = 118;
    const P = (th, ph) => {
      const x = Math.sin(th) * Math.cos(ph - az), y = Math.sin(th) * Math.sin(ph - az), z = Math.cos(th);
      return [cx + sc * y, cy - sc * (z * Math.cos(el) - x * Math.sin(el)), x * Math.cos(el) + z * Math.sin(el)];
    };
    let vmax = 0; const vals = [];
    for (let i = 0; i < nT; i++) for (let j = 0; j < nP; j++) {
      const th = (i + 0.5) * Math.PI / nT, ph = (j + 0.5) * TAU / nP, v = res.field(th, ph);
      vals.push(v); vmax = Math.max(vmax, Math.abs(v));
    }
    let q = 0;
    for (let i = 0; i < nT; i++) for (let j = 0; j < nP; j++) {
      const a = i * Math.PI / nT, b = (i + 1) * Math.PI / nT, c = j * TAU / nP, d = (j + 1) * TAU / nP;
      const pts = [P(a, c), P(b, c), P(b, d), P(a, d)];
      const depth = (pts[0][2] + pts[1][2] + pts[2][2] + pts[3][2]) / 4;
      const v = vals[q++];
      if (depth > -0.02) out.push({ pts, fill: diverge(v, 1.6 * Math.max(vmax, 0.6)) });
    }
    const ring = []; for (let k = 0; k <= 120; k++) { const p = P(th0, k * TAU / 120); ring.push(p[2] > 0 ? p : null); }
    const pole = (th) => P(th, 0);
    return { out, ring, N: pole(0), S: pole(Math.PI), vmax };
  }, [res, az, th0]);   // eslint-disable-line
  const ringPath = (() => { let d = "", pen = false; for (const p of cells.ring) { if (!p) { pen = false; continue; } d += (pen ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); pen = true; } return d; })();
  return (
    <RunCard title={R`交互图 1：单极子丛的第一陈数 $c_1=\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathcal{F}$`}
      lead={R`取 §10.5 的 Wu–Yang 势 $\mathcal{A}_{\rm N}=\mathrm{i}g(1-\cos\theta)\dd\phi$、$\mathcal{A}_{\rm S}=-\mathrm{i}g(1+\cos\theta)\dd\phi$（$\mathcal{A}=\mathrm{i}A$）。程序**不用**解析的场强，而是对势的分量做数值差分求 $F_{\theta\phi}=\partial_\theta A_\phi-\partial_\phi A_\theta$，在纬度 $\theta_0$ 以北用 $A_{\rm N}$、以南用 $A_{\rm S}$ 分别积分。你可以给两卡同时加一个整体光滑的一形式 $\alpha$（换联络）、给北卡加规范变换 $\dd\lambda_{\rm N}$、移动分界线——积分始终等于 $2g$。`}>
      <Row>
        <svg viewBox="0 0 300 300" width={300} height={300} style={svgStyle}>
          <circle cx={150} cy={150} r={118} fill="#f4efe4" stroke={GRAY} />
          {cells.out.map((c, i) => <path key={i} d={"M" + c.pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") + "Z"} fill={c.fill} stroke={c.fill} strokeWidth="0.6" />)}
          <path d={ringPath} fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 3" />
          {cells.N[2] > 0 && <><circle cx={cells.N[0]} cy={cells.N[1]} r="3" fill={INK} /><text x={cells.N[0] + 5} y={cells.N[1] - 4} fontSize="12" fill={INK}>N</text></>}
          <text x={8} y={292} fontSize="11" fill={GRAY}>颜色 = 径向场 F_θφ/sinθ；金色虚线 = 分界 θ₀</text>
        </svg>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <Slider label={R`磁荷 $2g$`} value={g2} min={-3} max={3} step={0.5} onChange={setG2} fmt={v => v.toFixed(1)} />
          <Slider label={R`换联络：整体一形式 $\alpha$ 的强度 $\varepsilon$`} value={eps} min={0} max={1.5} step={0.05} onChange={setEps} fmt={v => v.toFixed(2)} />
          <Slider label={R`北卡规范变换 $\lambda_{\rm N}$ 的强度 $\kappa$`} value={kap} min={0} max={2} step={0.05} onChange={setKap} fmt={v => v.toFixed(2)} />
          <Slider label={R`分界纬度 $\theta_0$`} value={th0} min={0.5} max={2.6} step={0.02} onChange={setTh0} fmt={v => (v / Math.PI).toFixed(2) + "π"} />
          <Slider label="视角" value={az} min={-3.1} max={3.1} step={0.02} onChange={setAz} fmt={v => v.toFixed(2)} />
        </div>
      </Row>
      <Tbl head={["量", "数值", "说明"]} rows={[
        [R`$\frac1{2\pi}\int_{\theta<\theta_0}\dd A_{\rm N}$`, f4(fN), R`北卡贡献（随 $\theta_0$、$\kappa$、$\varepsilon$ 改变）`],
        [R`$\frac1{2\pi}\int_{\theta>\theta_0}\dd A_{\rm S}$`, f4(fS), "南卡贡献"],
        [R`$\frac1{2\pi}\int_{S^2}F$（合计）`, <b>{f4(flux)}</b>, R`磁通 $/2\pi$ $=2g$`],
        [R`$\frac1{2\pi}\oint_{\theta_0}(A_{\rm N}-A_{\rm S})$`, f4(bnd), R`Stokes：只剩分界线上两势之差（\eqref{10.94}）`],
        [R`$c_1=\frac{\mathrm{i}}{2\pi}\int\mathcal{F}=-\frac1{2\pi}\int F$`, <b>{f4(-flux)}</b>, R`第一陈数 $=-2g$（见例 11.2 的注）`],
        [R`转移函数 $t_{\rm NS}=\mathrm{e}^{\mathrm{i}2g\phi}$`, integer ? "单值" : "不单值", integer ? R`卷绕数 $n=2g$` : R`$2g\notin\Z$：不是丛！`],
      ]} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(flux - g2) < 2e-3} label={R`$\frac1{2\pi}\int F=2g$（与 $\varepsilon,\kappa,\theta_0$ 无关）`} detail={`偏差 ${(flux - g2).toExponential(1)}`} />
        <Check ok={Math.abs(bnd - g2) < 1e-6} label={R`边界公式 $\frac1{2\pi}\oint(A_{\rm N}-A_{\rm S})=2g$`} />
        <Check ok={integer} label={integer ? R`$2g\in\Z$：$c_1=-2g$ 是整数` : R`$2g\notin\Z$：积分仍算得出，但它不是任何丛的陈数`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：(1) 把 $\varepsilon$ 拉大，球面上的颜色（场强分布）明显变得不均匀，但合计不变——这就是\sref{T11.1}(b)：换联络只改变一个恰当形式 $\dd\alpha$，它在闭流形上积分为零。(2) 拖动 $\theta_0$，北、南两卡各自的贡献此消彼长，合计不变。(3) 取 $2g=\pm1$：$c_1=\mp1$；$2g=1$ 的丛正是 Hopf 丛，与例 11.4 中 $\CP^1$ 上典范线丛的 $\mathrm{Ch}_1=-1$ 一致。(4) 取 $2g=0.5$：数值积分照样得 $0.5$，但转移函数在赤道上不单值——陈数的整数性来自"能粘成一个丛"，不是来自积分本身。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. 分裂原理计算器
// ============================================================
const SYM = (() => {      // 符号展开只算一次
  const td = Al.multiplicative(Al.seriesTodd(5), 5), ch = Al.chernCharacter(4);
  const L = Al.multiplicative(Al.seriesL(3), 3), Ah = Al.multiplicative(Al.seriesAhat(3), 3);
  return { td: [null, 1, 2, 3, 4, 5].map(j => j && Al.pdeg(td, j)), ch, L: [null, 1, 2, 3].map(j => j && Al.pdeg(L, j)), Ah: [null, 1, 2, 3].map(j => j && Al.pdeg(Ah, j)) };
})();
const toNum = s => s.map(q => Al.qnum(q));

export function SplitLab() {
  const [mode, setMode] = useState("C");
  const [k, setK] = useState(3);
  const [xs, setXs] = useState([0.7, -0.4, 0.25, 0.55, -0.3]);
  const roots = mode === "C" ? xs.slice(0, k) : xs.slice(0, Math.floor(k / 2));
  const setX = (i, v) => setXs(xs.map((x, j) => (j === i ? v : x)));
  const e = Al.elemSym(roots);
  const cvals = [1, 2, 3, 4, 5].map(j => e[j] || 0);
  const ys = roots.map(x => x * x), ey = Al.elemSym(ys), pvals = [1, 2, 3, 4, 5].map(j => ey[j] || 0);

  let body;
  if (mode === "C") {
    const chDirect = j => roots.reduce((s, x) => s + x ** j, 0) / [1, 1, 2, 6, 24][j];
    const tdNum = Al.prodSeriesNum(toNum(Al.seriesTodd(5)), roots, 5);
    const symRows = [
      [R`$\mathrm{ch}_1$`, <M>{Al.ptex(SYM.ch[1])}</M>, R`$c_1$ \eqref{11.51b}`, <Check ok={Al.peq(SYM.ch[1], Al.pfrom([[1, 1, [1]]]))} label="一致" />],
      [R`$\mathrm{ch}_2$`, <M>{Al.ptex(SYM.ch[2])}</M>, R`$\frac12[c_1^2-2c_2]$ \eqref{11.51c}`, <Check ok={Al.peq(SYM.ch[2], Al.BOOK.ch2)} label="一致" />],
      [R`$\mathrm{ch}_3$`, <M>{Al.ptex(SYM.ch[3])}</M>, "（原书未列）", ""],
      [R`$\mathrm{ch}_4$`, <M>{Al.ptex(SYM.ch[4])}</M>, "（原书未列）", ""],
      ...[1, 2, 3, 4, 5].map(j => [R`$\mathrm{Td}_${j}$`, <M>{Al.ptex(SYM.td[j])}</M>, <M>{Al.ptex(Al.BOOK.Td[j])}</M>, <Check ok={Al.peq(SYM.td[j], Al.BOOK.Td[j])} label={`(11.67${"bcdef"[j - 1]})`} />]),
    ];
    const numRows = [1, 2, 3, 4].map(j => {
      const viaC = Al.peval(SYM.ch[j], cvals), dir = chDirect(j), tdv = j <= 5 ? Al.peval(SYM.td[j], cvals) : 0;
      return [String(j), f4(cvals[j - 1]), f4(dir), f4(viaC), f4(tdNum[j]), f4(tdv),
        <Check ok={Math.abs(dir - viaC) < 1e-12 && Math.abs(tdNum[j] - tdv) < 1e-12} label="" />];
    });
    const st = Al.seriesTodd(6);
    body = <>
      <h4 style={{ margin: "0.6em 0 0.2em" }}><TxI>{R`符号展开（陈类 $c_j$ = 陈根 $x_i$ 的初等对称函数）`}</TxI></h4>
      <Tbl head={["项", "由分裂原理算出", "原书", "比对"]} rows={symRows} />
      <h4 style={{ margin: "0.6em 0 0.2em" }}>数值检验（当前陈根）</h4>
      <Tbl head={[R`阶 $j$`, R`$c_j=S_j(x)$`, R`$\mathrm{ch}_j$：$\frac1{j!}\sum x_i^j$`, R`$\mathrm{ch}_j$：由 $c$ 的公式`, R`$\mathrm{Td}_j$：展开 $\prod\frac{x_i}{1-\mathrm{e}^{-x_i}}$`, R`$\mathrm{Td}_j$：由 $c$ 的公式`, ""]} rows={numRows} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[1, 2, 3].map(kk => <Check key={kk} ok={Al.qeq(st[2 * kk], Al.bookToddCoef(kk))} label={R`\eqref{11.66}：$x^{${2 * kk}}$ 系数 $(-1)^{k-1}B_k/(2k)!=$ ` + (Al.qnum(st[2 * kk])).toPrecision(6)} />)}
        <Check ok={Math.abs(Al.prodSeriesNum(toNum(Al.sExp(4)), roots, 4)[0] - 1) < 1e-15} label={R`$\mathrm{ch}_0=k=$ ` + k} />
      </div>
    </>;
  } else {
    const l = Math.floor(k / 2);
    const Lnum = Al.prodSeriesNum(toNum(Al.seriesL(3)), ys, 3), Anum = Al.prodSeriesNum(toNum(Al.seriesAhat(3)), ys, 3);
    const symRows = [1, 2, 3].flatMap(j => [
      [R`$L_${j}$`, <M>{Al.ptex(SYM.L[j], "p")}</M>, <M>{Al.ptex(Al.BOOK.L[j], "p")}</M>, <Check ok={Al.peq(SYM.L[j], Al.BOOK.L[j])} label="(11.92)" />],
      [R`$\hat A_${j}$`, <M>{Al.ptex(SYM.Ah[j], "p")}</M>, <M>{Al.ptex(Al.BOOK.Ahat[j], "p")}</M>, <Check ok={Al.peq(SYM.Ah[j], Al.BOOK.Ahat[j])} label="(11.96)" />],
    ]);
    // 矩阵检验：A = S Λ S^t 是 k×k 实反对称矩阵（代表 𝓕/2π），块元为 x_i
    const A = Al.skewFromRoots(roots, k);
    const T = j => Al.trace(Al.matPow(A, 2 * j));
    const pTrace = [null, -T(1) / 2, (T(1) ** 2 - 2 * T(2)) / 8, (-(T(1) ** 3) + 6 * T(1) * T(2) - 8 * T(3)) / 48,
      (T(1) ** 4 - 12 * T(1) ** 2 * T(2) + 32 * T(1) * T(3) + 12 * T(2) ** 2 - 48 * T(4)) / 384];
    const IpA = Al.ident(k).map((r, i) => r.map((v, j) => v + A[i][j]));
    const pf = Al.pfaffian(A), prodx = roots.reduce((s, x) => s * x, 1);
    const matRows = [1, 2, 3, 4].filter(j => j <= l).map(j => [R`$p_${j}$`, f4(pvals[j - 1]), f4(pTrace[j]), <Check ok={Math.abs(pvals[j - 1] - pTrace[j]) < 1e-9} label={`(11.75${"abcd"[j - 1]})`} />]);
    matRows.push([R`$\det(I+A)$`, f4(ys.reduce((s, y) => s * (1 + y), 1)), f4(Al.det(IpA)), <Check ok={Math.abs(ys.reduce((s, y) => s * (1 + y), 1) - Al.det(IpA)) < 1e-9} label="(11.73)" />]);
    if (k % 2 === 0) {
      matRows.push([R`$\mathrm{Pf}(A)$ vs $e=\prod x_i$`, f4(prodx), f4(pf), <Check ok={Math.abs(pf - prodx) < 1e-9} label="(11.89)，标准 Pf" />]);
      matRows.push([R`$\mathrm{Pf}(A)^2$ vs $\det A$ vs $p_l$`, f4(pf * pf), f4(Al.det(A)), <Check ok={Math.abs(pf * pf - Al.det(A)) < 1e-9 && Math.abs(pf * pf - pvals[l - 1]) < 1e-9} label="(11.80)(11.84)" />]);
    }
    if (k === 4) {
      const lhs = (T(1) ** 2 - 2 * T(2)) * (2 * Math.PI) ** 4 / (128 * Math.PI ** 4);   // 把 A 当作曲率 𝓡 = 2πA 代入
      const RA = A.map(r => r.map(v => 2 * Math.PI * v)), eaa = Al.epsAA(RA);
      const rhsFix = (eaa / (2 * (4 * Math.PI) ** 2)) ** 2, rhsBook = (eaa / (2 * (4 * Math.PI) ** 4)) ** 2;
      matRows.push([R`$\frac{1}{128\pi^4}[(\Tr\mathcal{R}^2)^2-2\Tr\mathcal{R}^4]$`, f4(lhs), "", ""]);
      matRows.push([R`$\big(\frac{1}{2(4\pi)^2}\epsilon^{ijkl}\mathcal{R}_{ij}\mathcal{R}_{kl}\big)^2$（改正后）`, f4(rhsFix), "", <Check ok={Math.abs(lhs - rhsFix) < 1e-9} label="相等" />]);
      matRows.push([R`$\big(\frac{1}{2(4\pi)^4}\epsilon^{ijkl}\mathcal{R}_{ij}\mathcal{R}_{kl}\big)^2$（原书印法）`, f4(rhsBook), "", <Check ok={Math.abs(lhs - rhsBook) < 1e-9} label={Math.abs(lhs - rhsBook) < 1e-9 ? "相等" : "不等：原书笔误"} />]);
    }
    const sa = Al.seriesAhat(3), sl = Al.seriesL(3);
    body = <>
      <h4 style={{ margin: "0.6em 0 0.2em" }}><TxI>{R`符号展开（Pontrjagin 类 $p_j$ = $x_i^2$ 的初等对称函数）`}</TxI></h4>
      <Tbl head={["项", "由分裂原理算出", "原书", "比对"]} rows={symRows} />
      <h4 style={{ margin: "0.6em 0 0.2em" }}><TxI>{R`数值检验：$${k}\times${k}$ 实反对称矩阵 $A=S\Lambda S^{\rm t}$（代表 $\mathcal{F}/2\pi$）`}</TxI></h4>
      <Tbl head={["量", R`由 $x_i$`, "由矩阵直接算", ""]} rows={matRows} />
      <Tbl head={[R`阶 $j$`, R`$p_j$`, R`$L_j$：展开 $\prod\frac{x}{\tanh x}$`, R`$L_j$：\eqref{11.92}`, R`$\hat A_j$：展开 $\prod\frac{x/2}{\sinh(x/2)}$`, R`$\hat A_j$：\eqref{11.96}`]} rows={[1, 2, 3].map(j => [String(j), f4(pvals[j - 1]), f4(Lnum[j]), f4(Al.peval(Al.BOOK.L[j], pvals)), f4(Anum[j]), f4(Al.peval(Al.BOOK.Ahat[j], pvals))])} />
      <Tbl head={[R`$n$`, R`$\frac{x}{\tanh x}$ 中 $x^{2n}$ 系数`, R`\eqref{11.91}`, R`$\frac{x/2}{\sinh(x/2)}$ 中 $x^{2n}$ 系数`, R`原书 \eqref{11.94} 印法`, R`改正后（乘 $2^{-2n}$）`]}
        rows={[1, 2, 3].map(n => [String(n), Al.qnum(sl[n]).toPrecision(6), <Check ok={Al.qeq(sl[n], Al.bookLCoef(n))} label={Al.qnum(Al.bookLCoef(n)).toPrecision(6)} />,
          Al.qnum(sa[n]).toPrecision(6), <Check ok={Al.qeq(sa[n], Al.bookAhatCoef(n))} label={Al.qnum(Al.bookAhatCoef(n)).toPrecision(6)} />, <Check ok={Al.qeq(sa[n], Al.fixedAhatCoef(n))} label={Al.qnum(Al.fixedAhatCoef(n)).toPrecision(6)} />])} />
    </>;
  }
  const nr = mode === "C" ? k : Math.floor(k / 2);
  return (
    <RunCard title="交互图 2：分裂原理计算器"
      lead={R`分裂原理（\sref{X:splitting}）说：计算示性类时可以假装曲率已经对角化，$\mathrm{i}\mathcal{F}/2\pi\to\mathrm{diag}(x_1,\ldots,x_k)$（实丛：$\mathcal{F}/2\pi$ 化为 $2\times2$ 块，块元 $\pm x_i$）。程序先用 Newton 恒等式与有理数级数运算，把 $\prod_if(x_i)$ 或 $\sum_ix_i^j/j!$ **符号地**改写成陈类 $c_j$（或 Pontrjagin 类 $p_j$）的多项式，与原书逐项比对；再对你给定的数值陈根逐阶核对。`}>
      <Row>
        <div><Seg options={[["C", "复向量丛：c、ch、Td"], ["R", "实向量丛：p、L、Â、e"]]} value={mode} onChange={setMode} /></div>
        <Slider label={mode === "C" ? R`纤维维数 $k$` : R`实纤维维数 $k$`} value={k} min={mode === "C" ? 1 : 2} max={mode === "C" ? 5 : 8} step={1} onChange={setK} />
      </Row>
      <Row gap={10}>
        {Array.from({ length: nr }, (_, i) => <Slider key={i} label={R`$x_${i + 1}$`} value={xs[i] ?? 0.3} min={-1.2} max={1.2} step={0.05} onChange={v => setX(i, v)} fmt={v => v.toFixed(2)} />)}
      </Row>
      {body}
      <p className="muted" style={{ fontSize: 13 }}><TxI>{mode === "C"
        ? R`观察：$\mathrm{Td}$ 是乘性的（对 $\oplus$ 相乘，习题 11.2），$\mathrm{ch}$ 是加性的；$\mathrm{Td}_j$ 中出现的 $c_j$ 次数不超过 $j$ 的"权重"——$c_j$ 是 $2j$ 形式。把 $k$ 调小（如 $k=1$），高阶陈类自动为零，公式仍成立：分裂原理给出的是对所有 $k$ 都成立的"万有"公式。`
        : R`观察：(1) 矩阵 $A$ 不是块对角的（经过一个转动 $S$），但它的迹 $\Tr A^{2j}$ 代入 \eqref{11.75a}–\eqref{11.75d} 恰好给出 $x_i^2$ 的初等对称函数；(2) 标准 Pfaffian 满足 $\mathrm{Pf}(A)=\prod x_i$、$\mathrm{Pf}^2=\det A=p_l$——若按原书 \eqref{11.85} 加相位 $(-1)^l$，$l$ 为奇数时符号会反过来（见 §11.4.2 勘误）；(3) 最后一张表显示原书 \eqref{11.94} 的通项漏了因子 $2^{-2n}$，而 \eqref{11.96} 的结果本身正确。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. Gauss–Bonnet：∫ e(M) = χ(M)（式 11.81–11.83）
// ============================================================
export function GaussBonnetLab() {
  const [shape, setShape] = useState("sphere");
  const [a, setA] = useState(0.2), [b, setB] = useState(0.15), [kk, setKk] = useState(3);
  const prof = useMemo(() => Al.surfaceProfile(shape, a, b, kk), [shape, a, b, kk]);
  const gb = useMemo(() => Al.gaussBonnet(prof), [prof]);
  const chi = shape === "torus" ? 0 : 2;
  // 剖面图
  const W = 300, H = 300;
  const pts = gb.samples.map(s => ({ ...s, p: prof.f(s.u) }));
  const ext = Math.max(...pts.map(s => Math.max(Math.abs(s.p[0]), Math.abs(s.p[1])))) * 1.1;
  const X = r => W / 2 + (r / ext) * (W / 2 - 10), Y = z => H / 2 - (z / ext) * (H / 2 - 10);
  const Kmax = Math.max(...pts.map(s => Math.abs(s.K)), 1e-9);
  // 累积积分图
  const CW = 320, CH = 200, [u0, u1] = prof.range;
  const cmin = Math.min(0, ...pts.map(s => s.cum)), cmax = Math.max(2.2, ...pts.map(s => s.cum));
  const cx = u => 40 + (u - u0) / (u1 - u0) * (CW - 55), cy = c => CH - 25 - (c - cmin) / (cmax - cmin) * (CH - 45);
  return (
    <RunCard title={R`交互图 3：Gauss–Bonnet——$\int_Me(M)=\chi(M)$`}
      lead={R`二维时 Euler 形式就是 $e=\mathrm{Pf}(\mathcal{R}/2\pi)=\frac{K}{2\pi}\dd A$（例 11.6：单位球面 $K=1$，$e=\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi$）。下面对一族旋转曲面（剖面 $(\rho(u),z(u))$ 绕 $z$ 轴转一圈）用数值差分求 Gauss 曲率 $K=\frac{z'(\rho'z''-\rho''z')}{\rho(\rho'^2+z'^2)^2}$，再积分 $\int e=\int K\rho\sqrt{\rho'^2+z'^2}\,\dd u$。`}>
      <Row>
        <Seg options={[["sphere", "鼓包球面"], ["ellipsoid", "椭球"], ["torus", "环面"]]} value={shape} onChange={setShape} />
      </Row>
      <Row>
        <Slider label={shape === "ellipsoid" ? "赤道半径增量 a" : "鼓包幅度 a"} value={a} min={0} max={0.45} step={0.01} onChange={setA} fmt={v => v.toFixed(2)} />
        <Slider label={shape === "ellipsoid" ? "两极压扁 b" : "不对称 b"} value={b} min={0} max={0.4} step={0.01} onChange={setB} fmt={v => v.toFixed(2)} />
        {shape !== "ellipsoid" && <Slider label="鼓包个数 k" value={kk} min={1} max={8} step={1} onChange={setKk} />}
      </Row>
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={W / 2} y1={8} x2={W / 2} y2={H - 8} stroke={GRAY} strokeDasharray="4 3" />
          {[1, -1].map(sg => pts.slice(1).map((s, i) => {
            const q = pts[i];
            return <line key={sg + "-" + i} x1={X(sg * q.p[0])} y1={Y(q.p[1])} x2={X(sg * s.p[0])} y2={Y(s.p[1])} stroke={diverge(s.K, Math.min(Kmax, 1.5))} strokeWidth={sg > 0 ? 4 : 2} opacity={sg > 0 ? 1 : 0.5} />;
          }))}
          <text x={8} y={H - 8} fontSize="11" fill={GRAY}>右：剖面（颜色 = K，红正蓝负）；左：镜像</text>
        </svg>
        <svg viewBox={`0 0 ${CW} ${CH}`} width={CW} height={CH} style={svgStyle}>
          <line x1={40} y1={cy(0)} x2={CW - 15} y2={cy(0)} stroke={GRAY} />
          <line x1={40} y1={cy(chi)} x2={CW - 15} y2={cy(chi)} stroke={GREEN} strokeDasharray="5 3" />
          <text x={CW - 15} y={cy(chi) - 4} fontSize="11" fill={GREEN} textAnchor="end">χ = {chi}</text>
          <path d={"M" + pts.map(s => cx(s.u).toFixed(1) + "," + cy(s.cum).toFixed(1)).join("L")} fill="none" stroke={BLUE} strokeWidth="2.2" />
          <text x={42} y={14} fontSize="11" fill={INK}>累积 ∫₀ᵘ e（u 从一端扫到另一端）</text>
          <text x={36} y={cy(0) + 4} fontSize="10" fill={GRAY} textAnchor="end">0</text>
          <text x={CW - 15} y={CH - 8} fontSize="10" fill={GRAY} textAnchor="end">u</text>
        </svg>
      </Row>
      <Tbl head={["量", "数值", "说明"]} rows={[
        [R`$\int_Me=\frac1{2\pi}\int K\,\dd A$`, <b>{f4(gb.total)}</b>, R`数值积分（3000 个剖面点）`],
        [R`$\chi(M)$`, String(chi), shape === "torus" ? R`环面 $T^2$：$\chi=0$` : R`球面 $S^2$：$\chi=2$（§2.4）`],
        [R`$\max|K|$`, f4(Kmax), "曲率可以很不均匀，甚至变号"],
      ]} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(gb.total - chi) < 1e-3} label={R`$\int e=\chi$`} detail={`偏差 ${(gb.total - chi).toExponential(1)}`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：把鼓包调大、个数调多，球面上出现负曲率（蓝色）的"鞍形"环带，但正负贡献总是精确地凑成 2。环面外侧 $K>0$、内侧 $K<0$，合计恒为 0——与原书"平坦环面 $e\equiv0$"给出同一个整数，尽管这里的度规并不平坦。把 $S^2$ 看作 $\CP^1$，切丛是复线丛，$e(TS^2)=c_1(T\CP^1)$，所以 $\int_{\CP^1}c_1(T\CP^1)=2$；对照例 11.4 典范线丛的 $-1$：$T\CP^1$ 与典范线丛的负二次幂（$L^{-2}=(L^*)^{\otimes2}$）同构。`}</TxI></p>
    </RunCard>);
}
