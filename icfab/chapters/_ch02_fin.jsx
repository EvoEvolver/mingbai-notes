// 第 2 章：简化 NMOS/PMOS FinFET 工艺的三维几何（自绘）。
// 每个实体是一个沿 z（沿鳍方向）或沿 x（沿栅方向）拉伸的凸多边形：
//   { m, ax:"z", poly:[[x,y]…], r:[z0,z1] }  或  { m, ax:"x", poly:[[z,y]…], r:[x0,x1] }
// 同一数据驱动 Three.js 场景与两张正交截面 SVG（无 WebGL 时的替代图，也是图 2.26–2.32 的自绘版）。
// 坐标（nm）：x 横跨鳍（栅走向），z 沿鳍（源—沟道—漏），y 向上，原始硅表面 y=0。
import { TxI } from "@kit";
import { MAT, rect } from "./_ch02_xsec.jsx";

const R = String.raw;

export const FSTEPS = [
  { id: "fwafer", sec: "2.13", t: "衬底预注入：鳍底防穿通重掺杂 + 阈值调整", proc: "离子注入 + 退火", mat: "p 型重掺杂层（鳍根部深度）", d: "鳍底部与衬底相连；在鳍根部深度先打一层重掺杂 p 型，防止相邻鳍经衬底相互导通。", ch: ["ch08"] },
  { id: "fhm", sec: "2.13", t: "氮化硅硬掩模定义鳍宽", proc: "沉积 + 昂贵的光刻（实际为多重图形化）+ 刻蚀", mat: R`$\mathrm{Si_3N_4}$`, d: "鳍宽远小于光波长，靠侧墙转移等多重图形化技术实现。", ch: ["ch05b", "ch09"], fig: "2.26(a)" },
  { id: "fetch", sec: "2.13", t: "深各向异性刻蚀出硅鳍", proc: "定向等离子刻蚀，停在隔离注入深度", mat: "Si 鳍", d: "可再做一次短氧化来减薄鳍并去除侧壁刻蚀损伤。", ch: ["ch09"], fig: "2.26(b)" },
  { id: "fox", sec: "2.13", t: "LPCVD 厚氧化物完全覆盖鳍", proc: "LPCVD", mat: R`$\mathrm{SiO_2}$`, d: "相当于平面工艺中 STI 的填充。", ch: ["ch10"], fig: "2.26(c)" },
  { id: "fcmp", sec: "2.13", t: "CMP 停在氮化硅上", proc: "CMP", mat: "—", d: "", ch: ["ch09"], fig: "2.27(a)" },
  { id: "freveal", sec: "2.13", t: "氧化物湿法回刻：露鳍（fin reveal）", proc: "湿法刻蚀", mat: "—", d: "露出的部分就是将来的沟道；周围的氧化物等效于 STI 隔离。", ch: ["ch09"], fig: "2.27(b)" },
  { id: "fpoly", sec: "2.13", t: "去氮化硅，长栅氧，厚多晶硅覆盖", proc: "湿法去氮化硅；热氧化；LPCVD 多晶硅", mat: "多晶硅（假栅）", d: "先进节点里栅氧/多晶硅终将被高 k/金属栅替换。", ch: ["ch06", "ch10"], fig: "2.27(c)" },
  { id: "fpcmp", sec: "2.13", t: "多晶硅 CMP 平坦化", proc: "CMP", mat: "—", d: "为下一步高分辨率光刻提供平面。", ch: ["ch09"], fig: "2.28(a)" },
  { id: "fhmn", sec: "2.13", t: "厚 CVD 氮化硅（栅刻蚀硬掩模）", proc: "CVD", mat: R`$\mathrm{Si_3N_4}$`, d: "", ch: ["ch10"], fig: "2.28(b)" },
  { id: "fgate", sec: "2.13", t: "栅光刻 + 硬掩模刻蚀 + 多晶硅各向异性刻蚀", proc: "又一次昂贵的光刻；刻蚀停在隔离氧化物", mat: "多晶硅假栅（与鳍垂直）", d: "栅从两侧和顶部包住沟道；栅外的鳍段成为源漏。随后做斜角 LDD 注入（顶面与侧壁都要掺到）。", ch: ["ch09", "ch08"], fig: "2.28(c)" },
  { id: "fspdep", sec: "2.13", t: "共形沉积薄氮化硅", proc: "共形沉积", mat: R`$\mathrm{Si_3N_4}$`, d: "", ch: ["ch10"], fig: "2.29(a)" },
  { id: "fspetch", sec: "2.13", t: "各向异性回刻成栅侧墙", proc: "定向刻蚀到隔离层", mat: "侧墙", d: "侧墙把源漏与栅边缘隔开一个偏移量，与 28 nm 平面工艺相同。", ch: ["ch09"], fig: "2.29(b)" },
  { id: "frecess", sec: "2.13", t: "刻掉侧墙外的鳍段", proc: "刻蚀", mat: "—", d: "注入难以均匀掺杂密集的高鳍（阴影效应），所以改为刻掉再外延。", ch: ["ch09"], fig: "2.30(b)" },
  { id: "fepi1", sec: "2.13", t: "SiGe 外延生长（约 30 s）", proc: "原位掺硼选择性外延", mat: "SiGe:B", d: "生长速率依赖晶向，晶面逐渐显现。", ch: ["ch10"], fig: "2.30(d)" },
  { id: "fepi2", sec: "2.13", t: "SiGe 外延生长（约 2 min）：菱形源漏", proc: "原位掺硼选择性外延", mat: "SiGe:B", d: "慢生长的 {111} 晶面围成典型的“菱形/三角形”外形；SiGe 同时给沟道施加压应变（PMOS）。", ch: ["ch10"], fig: "2.30(f)" },
  { id: "fild", sec: "2.13", t: "厚氧化物 + CMP 到氮化硅停止层", proc: "CVD + CMP", mat: R`$\mathrm{SiO_2}$`, d: "替换金属栅（RMG）的第一步。", ch: ["ch10", "ch09"], fig: "2.29(c)" },
  { id: "fnrm", sec: "2.13", t: "去除栅顶氮化硅停止层", proc: "刻蚀", mat: "—", d: "", ch: ["ch09"], fig: "2.31(a)" },
  { id: "fprm", sec: "2.13", t: "去除多晶硅假栅与栅氧", proc: "高选择比刻蚀", mat: "—", d: "露出被栅槽包围的鳍形沟道。", ch: ["ch09"], fig: "2.31(b)" },
  { id: "fhk", sec: "2.13", t: R`ALD 高 k 叠层（$\mathrm{HfO_2}$/TiN/TaN）`, proc: "ALD", mat: R`$\mathrm{HfO_2}$、TiN`, d: "ALD 的共形性在三维结构上尤其关键：鳍的顶面与两侧都要均匀覆盖。", ch: ["ch10"], fig: "2.31(c)" },
  { id: "fmg", sec: "2.13", t: "金属栅填充 + CMP：FinFET 完成", proc: "溅射金属叠层 + CMP", mat: "Al 等（设功函数）", d: "栅与鳍垂直交叉，从三面控制沟道。", ch: ["ch10", "ch09"], fig: "2.32" },
];
export const FI = Object.fromEntries(FSTEPS.map((s, i) => [s.id, i]));

const XB = 35, ZB = 45, YB = -80;          // 块体半宽、半长、底面
const GZ = 11, SPW = 4, OXT = -22;          // 栅半长、侧墙宽、露鳍后氧化物顶面
const fin = (o = 0, ytop = 0, ybot = -45) => { const k = (6.5 - 4) / 45, hw = y => 4 + k * (-y); return [[-(hw(ybot) + o), ybot], [hw(ybot) + o, ybot], [hw(ytop) + o, ytop + o], [-(hw(ytop) + o), ytop + o]]; };
const Zs = (m, poly, z0 = -ZB, z1 = ZB) => ({ m, ax: "z", poly, r: [z0, z1] });
const Xs = (m, poly, x0 = -XB, x1 = XB) => ({ m, ax: "x", poly, r: [x0, x1] });

export function finfet(k) {
  const at = id => k >= FI[id], bf = id => k < FI[id];
  const L = [];
  // 衬底与氧化物
  L.push(Zs("si", rect(-XB, YB, XB, at("fetch") ? -45 : 0)));
  if (at("fox")) {
    const top = at("freveal") ? OXT : at("fcmp") ? 8 : 30;
    L.push(Zs("ox", rect(-XB, -45, XB, top)));
  }
  // 多晶硅假栅（全面覆盖 → 栅条）
  if (at("fpoly") && bf("fprm")) {
    const top = at("fpcmp") ? 30 : 40;
    if (bf("fgate")) L.push(Zs("poly", rect(-XB, OXT, XB, top)));
    else L.push(Xs("poly", rect(-GZ, OXT, GZ, 30)));
  }
  // 栅顶氮化硅
  if (at("fhmn") && bf("fnrm")) L.push(bf("fgate") ? Zs("nit", rect(-XB, 30, XB, 52)) : Xs("nit", rect(-GZ, 30, GZ, 52)));
  // 共形氮化硅 / 侧墙
  if (at("fspdep") && bf("fspetch")) { L.push(Zs("nit", rect(-XB, OXT, XB, OXT + 3))); L.push(Zs("nit", fin(3, 0, OXT))); L.push(Xs("nit", rect(-GZ - 3, OXT, GZ + 3, 55))); L.push(Xs("poly", rect(-GZ, OXT, GZ, 30))); L.push(Xs("nit", rect(-GZ, 30, GZ, 52))); }
  if (at("fspetch")) { L.push(Xs("nit", rect(-GZ - SPW, OXT, -GZ, 52))); L.push(Xs("nit", rect(GZ, OXT, GZ + SPW, 52))); }
  // 层间氧化物（栅两侧）
  if (at("fild")) { L.push(Xs("ox", rect(-ZB, OXT, -GZ - SPW, 52))); L.push(Xs("ox", rect(GZ + SPW, OXT, ZB, 52))); }
  // 金属栅
  if (at("fmg")) L.push(Xs("al", rect(-GZ + 3.5, OXT + 3.5, GZ - 3.5, 52)));
  if (at("fhk")) {
    L.push(Xs("hfo", rect(-GZ, OXT, GZ, OXT + 1.5)), Xs("hfo", rect(-GZ, OXT, -GZ + 1.5, 52)), Xs("hfo", rect(GZ - 1.5, OXT, GZ, 52)));
    L.push(Xs("tin", rect(-GZ + 1.5, OXT + 1.5, GZ - 1.5, OXT + 3.5)), Xs("tin", rect(-GZ + 1.5, OXT + 1.5, -GZ + 3.5, 52)), Xs("tin", rect(GZ - 3.5, OXT + 1.5, GZ - 1.5, 52)));
    L.push(Zs("tin", fin(3.5, 0, OXT), -GZ + 1.5, GZ - 1.5), Zs("hfo", fin(1.5, 0, OXT), -GZ + 1.5, GZ - 1.5));
  }
  // 栅氧（包住鳍，多晶硅去除后消失）
  if (at("fpoly") && bf("fprm")) L.push(Zs("tox", fin(1, 0, OXT), at("frecess") ? -GZ - SPW : -ZB, at("frecess") ? GZ + SPW : ZB));
  // SiGe 外延源漏
  if (at("fepi1")) {
    const big = at("fepi2"), P = big ? [[-6, OXT], [6, OXT], [15, -8], [7, 7], [-7, 7], [-15, -8]] : [[-5.5, OXT], [5.5, OXT], [9, -10], [5, -2], [-5, -2], [-9, -10]];
    L.push(Zs("sige", P, -ZB, -GZ - SPW), Zs("sige", P, GZ + SPW, ZB));
  }
  // 硅鳍（最后画：在截面上可见）
  if (at("fetch")) {
    if (at("frecess")) { L.push(Zs("si", fin(0, OXT, -45))); L.push(Zs("si", fin(0, 0, OXT), -GZ - SPW, GZ + SPW)); }
    else L.push(Zs("si", fin()));
  }
  if (at("fhm") && bf("fpoly")) L.push(Zs("nit", at("fetch") ? [[-4, 0], [4, 0], [4, 8], [-4, 8]] : rect(-4, 0, 4, 8)));
  // 防穿通重掺杂层（半透明）
  L.push(Zs("pl", at("fetch") ? rect(-XB, -50, XB, -45) : rect(-XB, -50, XB, -40)));
  if (at("fetch")) L.push(Zs("pl", fin(0, -40, -45)));
  return L;
}

// ---------- 两张正交截面（SVG） ----------
function span(poly, i, c) {   // 凸多边形与直线 coord[i]=c 的交线段，返回另一坐标的 [lo,hi]
  let lo = Infinity, hi = -Infinity; const j = 1 - i;
  for (let a = 0; a < poly.length; a++) { const p = poly[a], q = poly[(a + 1) % poly.length];
    if ((p[i] - c) * (q[i] - c) <= 0 && p[i] !== q[i]) { const t = (c - p[i]) / (q[i] - p[i]), v = p[j] + t * (q[j] - p[j]); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    else if (p[i] === c) { lo = Math.min(lo, p[j]); hi = Math.max(hi, p[j]); } }
  return lo < hi ? [lo, hi] : null;
}
// 截面 A：z=zc 平面（横跨鳍）；截面 B：x=xc 平面（沿鳍中心）
export function cutA(S, zc = 0) { return S.flatMap(s => { if (s.ax === "z") return s.r[0] <= zc && zc <= s.r[1] ? [{ m: s.m, p: s.poly }] : []; const v = span(s.poly, 0, zc); return v ? [{ m: s.m, p: rect(s.r[0], v[0], s.r[1], v[1]) }] : []; }); }
export function cutB(S, xc = 0) { return S.flatMap(s => { if (s.ax === "x") return s.r[0] <= xc && xc <= s.r[1] ? [{ m: s.m, p: s.poly }] : []; const v = span(s.poly, 0, xc); return v ? [{ m: s.m, p: rect(s.r[0], v[0], s.r[1], v[1]) }] : []; }); }

const SC = 2.6, Y0 = 58, Y1 = -80;
function Panel({ L, u0, u1, ox, label, axis }) {
  const X = u => ox + (u - u0) * SC, Y = y => 22 + (Y0 - y) * SC;
  return <g>
    <rect x={X(u0)} y={Y(Y0)} width={(u1 - u0) * SC} height={(Y0 - Y1) * SC} fill="#fbfbfd" stroke="#bbb" />
    {L.map((o, i) => <polygon key={i} points={o.p.map(([u, y]) => `${X(u).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")} fill={MAT[o.m].c} stroke={MAT[o.m].dope ? "none" : "rgba(0,0,0,.35)"} strokeWidth=".6" />)}
    <text x={X((u0 + u1) / 2)} y={14} textAnchor="middle" fontSize="13" fill="#333">{label}</text>
    <text x={X((u0 + u1) / 2)} y={Y(Y1) + 16} textAnchor="middle" fontSize="12" fill="#666">{axis}</text>
  </g>;
}
export function FinCuts({ k }) {
  const S = finfet(k), wA = 2 * XB * SC, wB = 2 * ZB * SC, W = 20 + wA + 30 + wB + 10, H = 22 + (Y0 - Y1) * SC + 24;
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`FinFET 截面：${FSTEPS[k].t}`} style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif", background: "#fff" }}>
    <Panel L={cutA(S, 0)} u0={-XB} u1={XB} ox={20} label="A：过栅中心、横切鳍" axis="← x（沿栅）→" />
    <Panel L={cutB(S, 0)} u0={-ZB} u1={ZB} ox={20 + wA + 30} label="B：沿鳍中心纵切" axis="源 ← z（沿鳍）→ 漏" />
  </svg>;
}
export function FinLegend({ ks }) {
  const used = [...new Set(ks.flatMap(k => finfet(k).map(o => o.m)))];
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 13, marginTop: 6 }}>
    {used.map(m => <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 14, height: 11, background: MAT[m].c, border: "1px solid rgba(0,0,0,.3)", display: "inline-block" }} /><TxI>{m === "pl" ? "鳍底防穿通 p 型重掺杂" : MAT[m].n}</TxI></span>)}
  </div>;
}
// 图 2.26–2.32 的自绘版（两张正交截面；三维版见本章 FinFET 搭建器）
export function FinPanels({ ids, labels }) {
  const ks = ids.map(id => FI[id]);
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 10 }}>
      {ks.map((k, i) => <div key={i}><div style={{ fontSize: 13, color: "#555", margin: "0 0 2px 4px" }}>{labels ? labels[i] + "　" : ""}<TxI>{FSTEPS[k].t}</TxI></div><FinCuts k={k} /></div>)}
    </div>
    <FinLegend ks={ks} />
  </div>;
}
