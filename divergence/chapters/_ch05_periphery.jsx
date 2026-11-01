// 第 5 章专属图解 ②：边缘地区为什么会「用完」——斯密式交换的天花板（示意模型 + 原书史实锚点）
import { useEffect, useRef, useState } from "react";

const COL = { core: "var(--blue)", free: "var(--accent)", bound: "var(--gold)", nw: "var(--green)" };

// s ∈ [0,1]：从约 1700 到约 1800 的示意时间。数值全部是「示意指数」，不是原书数据。
const TYPES = {
  free: {
    label: "自由劳动的边缘", sub: "长江中上游、华北、日本「第二区域」",
    color: COL.free,
    Q: s => 1.0 + 0.35 * s,               // 土地密集型产品总产出：增长有限
    C: s => 0.45 + 0.85 * Math.pow(s, 1.1), // 本地自用：人口增长 + 进口替代后自己也要吃粮、用棉
    why: [
      "人口增长快：自由劳动、可自由迁移与成家，边缘地区越来越稠密（如湖南 1775–1850 年人口约增 40%）。",
      "进口替代：技术差距小、无专利、固定资本少、运费天然保护——边缘农户自己纺纱织布，不再需要核心区的布。",
      "报酬递减：木材要拖得越来越远（陕西有的原木要拖 65 英里才到河边），劳力越来越贵。",
      "制度与文化推一把：清廷鼓励边区垦殖、派江南织工去教学、对新垦地宽免赋税；「男耕女织」的理想让内地家庭自己织布。",
    ],
    anchor: "长江中游的余米越来越少流向江南；华北自己纺织后，输往江南的原棉大减；日本第二区域 18 世纪木材产量停滞。",
  },
  bound: {
    label: "不自由的边缘", sub: "东欧、波罗的海（农奴制庄园）",
    color: COL.bound,
    Q: s => 0.72 + 0.06 * s,              // 供给僵化：休耕、公地、强迫劳动低效
    C: s => 0.42 + 0.08 * s,              // 人口与手工业增长慢，本地自用增长也慢
    why: [
      "人口与进口替代都慢：领主控制婚姻与迁徙（奥匈的农民到 1781 年才可不经领主干预结婚），城镇与乡村手工业弱。",
      "但供给也僵化：强迫劳动低效、无人投资改良；哈布斯堡领地的休耕地从约 1750 年的 33% 到 1850 年只降到 25%。",
      "需求太小：农奴几乎不进入现金经济，城里人少、贵族不多——西欧从东欧的进口约三分之一只能用白银支付。",
    ],
    anchor: "东西欧贸易自 17 世纪中叶起就停在差不多的水平，规模远小于中国境内粮食、木材、肥料的长途流动。",
  },
  nw: {
    label: "新大陆（第 6 章预告）", sub: "加勒比种植园、北美",
    color: COL.nw,
    Q: s => 0.75 + 2.3 * Math.pow(s, 1.6),
    C: s => 0.3 + 0.15 * s,
    why: [
      "下一章的主题：奴隶种植园专门生产出口品，粮食与制成品要从外面买——边缘的需求由制度「锁定」在进口上。",
      "这正是旧世界边缘做不到的：既能源源不断出口土地密集型产品，又持续购买核心区的制成品。",
    ],
    anchor: "这里只是预告的形状，具体机制与数字见第 6 章。",
  },
};

const D = s => 0.4 + 0.9 * s; // 核心区（英格兰 / 江南）对土地密集型产品的需求：人口 + 原工业化

const W = 660, H = 290, L = 42, R = 16, T = 18, B = 250, YMAX = 1.6;
const xs = s => L + s * (W - L - R);
const ys = v => B - Math.min(v, YMAX) / YMAX * (B - T);

function series(f) { const pts = []; for (let i = 0; i <= 50; i++) { const s = i / 50; pts.push([s, f(s)]); } return pts; }
const line = pts => pts.map((p, i) => `${i ? "L" : "M"}${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`).join(" ");

export default function PeripheryRunsOut() {
  const [k, setK] = useState("free");
  const [s, setS] = useState(0);
  const [play, setPlay] = useState(false);
  const raf = useRef();
  useEffect(() => {
    if (!play) return;
    let last = performance.now();
    const tick = now => {
      const dt = (now - last) / 1000; last = now;
      setS(v => { const n = v + dt / 6; if (n >= 1) { setPlay(false); return 1; } return n; });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const P = TYPES[k];
  const E = x => Math.max(0, P.Q(x) - P.C(x));
  const e = E(s), d = D(s), gap = Math.max(0, d - e);
  const year = Math.round(1700 + s * 100);
  const area = (() => { const pts = series(E); return line(pts) + ` L${xs(1)},${ys(0)} L${xs(0)},${ys(0)} Z`; })();
  const flowW = v => 2 + Math.min(v, 1.6) * 9;

  return <div className="card pr">
    <style>{`
      .pr-top{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:6px}
      .pr-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13.5px;color:var(--muted);margin:4px 0 2px}
      .pr-ctrl input{width:220px}
      .pr-ctrl b{color:var(--ink);font-variant-numeric:tabular-nums}
      .pr-btn{border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:3px 14px;font:inherit;font-size:13px;cursor:pointer;color:var(--ink)}
      .pr-cols{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:14px;align-items:start}
      .pr-why{font-size:14px;line-height:1.6;margin:0;padding-left:18px}
      .pr-why li{margin-bottom:4px}
      .pr-anchor{font-size:13.5px;background:var(--paper);border-radius:10px;padding:8px 12px;margin-top:8px}
      .pr-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin-top:2px}
      .pr-legend i{display:inline-block;width:14px;height:3px;margin-right:5px;vertical-align:3px}
      .pr-tag{display:inline-block;font-size:11.5px;padding:1px 8px;border-radius:99px;border:1px dashed var(--muted);color:var(--muted);margin-left:6px}
      .pr-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0;font-size:12.5px;color:var(--muted);text-align:center}
      .pr-stats b{display:block;font-size:18px;color:var(--ink);font-variant-numeric:tabular-nums}
      @media (max-width:720px){.pr-cols{grid-template-columns:1fr}}
    `}</style>
    <div className="pr-top">
      <div className="seg" style={{ marginBottom: 0 }}>{Object.entries(TYPES).map(([id, t]) => <button key={id} className={k === id ? "on" : ""} onClick={() => setK(id)}>{t.label}</button>)}</div>
      <span className="pr-tag">示意模型 · 非原书数据</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--muted)" }}>{P.sub}</div>

    <div className="pr-cols">
      <div>
        {/* 交换示意：核心区 ⇄ 边缘 */}
        <svg viewBox="0 0 660 120" style={{ width: "100%" }} role="img" aria-label="核心区与边缘的交换">
          <rect x="10" y="20" width="170" height="80" rx="14" fill="var(--paper)" stroke={COL.core} strokeWidth="2" />
          <text x="95" y="54" textAnchor="middle" fontSize="15" fontWeight="700" style={{ fill: "var(--ink)" }}>核心区</text>
          <text x="95" y="76" textAnchor="middle" fontSize="12" style={{ fill: "var(--muted)" }}>英格兰 / 江南</text>
          <rect x="480" y="20" width="170" height="80" rx="14" fill="var(--paper)" stroke={P.color} strokeWidth="2" />
          <text x="565" y="54" textAnchor="middle" fontSize="15" fontWeight="700" style={{ fill: "var(--ink)" }}>边缘</text>
          <text x="565" y="76" textAnchor="middle" fontSize="12" style={{ fill: "var(--muted)" }}>{k === "free" ? "湖南 / 华北" : k === "bound" ? "波兰 / 普鲁士" : "加勒比 / 北美"}</text>
          {/* 原料：边缘 → 核心 */}
          <line x1="476" y1="45" x2="186" y2="45" stroke={P.color} strokeWidth={flowW(e)} strokeDasharray="10 8" strokeLinecap="round" opacity={e < .02 ? .15 : .9}>
            <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1s" repeatCount="indefinite" />
          </line>
          <text x="330" y={36 - flowW(e) / 2} textAnchor="middle" fontSize="12.5" style={{ fill: "var(--ink)" }}>{k === "nw" ? "糖、棉、木材" : k === "bound" ? "谷物、木材、牲畜" : "米、木材、原棉"} ← {e.toFixed(2)}</text>
          {/* 制成品：核心 → 边缘 */}
          <line x1="186" y1="82" x2="476" y2="82" stroke={COL.core} strokeWidth={flowW(k === "bound" ? e * 0.67 : e)} strokeDasharray="10 8" strokeLinecap="round" opacity={e < .02 ? .15 : .9}>
            <animate attributeName="stroke-dashoffset" from="0" to="36" dur="1s" repeatCount="indefinite" />
          </line>
          <text x="330" y={104 + flowW(e) / 2} textAnchor="middle" fontSize="12.5" style={{ fill: "var(--ink)" }}>布等制成品 →{k === "bound" ? "（约 1/3 只能付白银）" : ""}</text>
        </svg>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 320 }} role="img" aria-label="边缘的可出口剩余与核心区需求">
          {[0, .4, .8, 1.2, 1.6].map(t => <g key={t}><line x1={L} x2={W - R} y1={ys(t)} y2={ys(t)} stroke="var(--line)" strokeWidth=".7" />
            <text x={L - 6} y={ys(t) + 4} textAnchor="end" fontSize="11" style={{ fill: "var(--muted)" }}>{t}</text></g>)}
          {[0, .25, .5, .75, 1].map(t => <text key={t} x={xs(t)} y={B + 18} textAnchor="middle" fontSize="11" style={{ fill: "var(--muted)" }}>{1700 + t * 100}</text>)}
          <path d={area} fill={P.color} opacity=".18" />
          <path d={line(series(P.Q))} fill="none" stroke={P.color} strokeWidth="1.6" strokeDasharray="4 4" />
          <path d={line(series(P.C))} fill="none" stroke="var(--muted)" strokeWidth="1.6" strokeDasharray="2 4" />
          <path d={line(series(E))} fill="none" stroke={P.color} strokeWidth="2.4" />
          <path d={line(series(D))} fill="none" stroke={COL.core} strokeWidth="2.4" />
          {k === "nw" && <text x={xs(.66)} y={T + 14} textAnchor="end" fontSize="12" fontWeight="700" style={{ fill: "var(--ink)" }}>↑ 继续上升，冲出旧世界的天花板</text>}
          {/* 当前时刻 */}
          <line x1={xs(s)} x2={xs(s)} y1={T} y2={B} stroke="var(--ink)" strokeWidth="1" opacity=".5" />
          {gap > 0.01 && <line x1={xs(s)} x2={xs(s)} y1={ys(d)} y2={ys(e)} stroke="var(--ink)" strokeWidth="5" opacity=".25" />}
          <circle cx={xs(s)} cy={ys(e)} r="5.5" fill={P.color} stroke="var(--card)" strokeWidth="2" />
          <circle cx={xs(s)} cy={ys(d)} r="5.5" fill={COL.core} stroke="var(--card)" strokeWidth="2" />
          <text x={L + 4} y={T - 4} fontSize="11" style={{ fill: "var(--muted)" }}>示意指数（无单位）</text>
        </svg>
        <div className="pr-legend">
          <span><i style={{ background: COL.core }} />核心区需求</span>
          <span><i style={{ background: P.color }} />边缘可出口剩余（实线，阴影）</span>
          <span><i style={{ background: P.color, opacity: .6 }} />边缘总产出（虚线）</span>
          <span><i style={{ background: "var(--muted)" }} />边缘自用（点线）</span>
        </div>
        <div className="pr-ctrl">
          <button className="pr-btn" onClick={() => { if (s >= 1) setS(0); setPlay(!play); }}>{play ? "⏸ 暂停" : s >= 1 ? "↺ 重放" : "▶ 播放"}</button>
          <input type="range" min="0" max="1" step="0.01" value={s} onChange={e => { setPlay(false); setS(+e.target.value); }} aria-label="时间" />
          <b>约 {year} 年</b>
        </div>
        <div className="pr-stats">
          <div><b>{e.toFixed(2)}</b>可出口剩余</div>
          <div><b>{d.toFixed(2)}</b>核心区需求</div>
          <div><b style={{ color: gap > 0.4 ? "var(--accent)" : "var(--ink)" }}>{gap.toFixed(2)}</b>缺口</div>
        </div>
      </div>
      <div>
        <b style={{ fontSize: 14.5 }}>为什么是这个形状？</b>
        <ul className="pr-why">{P.why.map((w, i) => <li key={i}>{w}</li>)}</ul>
        <div className="pr-anchor"><b>原书史实：</b>{P.anchor}</div>
      </div>
    </div>
    <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "10px 0 0" }}>曲线是为说明机制而画的示意，不代表任何真实统计；右栏的人口、休耕、白银比例等才是原书数字。彭慕兰的要点：两种旧世界边缘都给核心区的「斯密式」交换设了天花板——自由的边缘会自己长大、自己织布；不自由的边缘长不大、也买不起。</p>
  </div>;
}
