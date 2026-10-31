// 第 9 章专属图解 B：社会投注的两极——偏执-法西斯极 ↔ 精神分裂-革命极（摆荡滑块 + 书中案例）
import { useState, useEffect, useRef, useMemo } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";
const CX = 320, CY = 172, RX = 232, RY = 120;

const CASES = [
  { id: "swing", label: "▶ 播放摆荡", from: null, note: "无意识在两极之间惊人地摆荡：预期中的革命力量有时恰恰从最陈旧的东西里挣脱出来；反过来，一切也可能转向法西斯、退回陈旧。这些地下通道——常常是两极并存——是精神分裂分析的主要对象之一。" },
  { id: "kerouac", label: "Kerouac", from: .92, to: .12, note: "书中例子：Kerouac 用最朴素的手段完成了革命性的「逃离」，后来却沉浸于「伟大美国」之梦，又去寻找自己属于「高等种族」的布列塔尼祖先——从逃逸极滑回偏执-法西斯极。" },
  { id: "celine", label: "Céline", from: .55, to: .06, note: "书中例子：Céline，谵妄的大受害者，在演变中与他父亲的偏执越来越相通——越走越靠向偏执极。" },
  { id: "amlit", label: "美国文学", from: .88, to: .32, loop: true, note: "书中例子：美国文学的命运似乎就是越过界限与边疆、让解域的欲望流动起来，却又总让这些流夹带着法西斯化的、道德化的、清教的、家庭主义的领土。两极同时在场。" },
];

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function useDots() {
  return useMemo(() => {
    const r = rng(42), dots = [];
    const rings = [[46, 8], [78, 13], [110, 17]];
    rings.forEach(([rad, n], ri) => {
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + ri * .2;
        const out = (dots.length % 3 === 0);
        const fr = out ? 1.1 + r() * .14 : .55 + r() * .38;
        const a2 = a + (r() - .5) * .5;
        dots.push({ px: CX + Math.cos(a) * rad * 1.35, py: CY + Math.sin(a) * rad * .85, sx: CX + Math.cos(a2) * RX * fr, sy: CY + Math.sin(a2) * RY * fr, out, a2 });
      }
    });
    return dots;
  }, []);
}

export default function TwoPoles() {
  const [p, setP] = useState(.15);
  const [ci, setCi] = useState(null);
  const raf = useRef(0);
  const dots = useDots();
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function play(i) {
    cancelAnimationFrame(raf.current);
    setCi(i);
    const c = CASES[i], t0 = performance.now();
    const step = now => {
      const s = (now - t0) / 1000;
      if (c.id === "swing") { setP(.5 - .46 * Math.cos(s * 1.4)); if (s < 9) raf.current = requestAnimationFrame(step); return; }
      if (c.loop) { const k = .5 - .5 * Math.cos(s * 1.6); setP(c.from + (c.to - c.from) * k); if (s < 8) raf.current = requestAnimationFrame(step); return; }
      const k = Math.min(1, s / 2.6), e = k * k * (3 - 2 * k);
      setP(c.from + (c.to - c.from) * e);
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }
  function drag(v) { cancelAnimationFrame(raf.current); setCi(null); setP(v); }

  const pos = dots.map(d => ({ x: d.px + (d.sx - d.px) * p, y: d.py + (d.sy - d.py) * p }));
  const gap = Math.max(0, (p - .35) / .65);
  const dash = gap <= 0 ? "none" : `${Math.max(14, 80 - gap * 60)} ${gap * 46}`;
  const left = 1 - p, right = p;
  const pole = p < .4 ? 0 : p > .6 ? 2 : 1;

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox="0 0 640 345" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <text x="20" y="24" fontSize="13" fill={BLUE} opacity={.4 + .6 * left} fontWeight="700">偏执-法西斯极 · 克分子 · 隔离</text>
        <text x="620" y="24" fontSize="13" fill={RED} opacity={.4 + .6 * right} fontWeight="700" textAnchor="end">精神分裂-革命极 · 分子 · 游牧</text>

        {/* 社会体的墙 */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill={BLUE} fillOpacity={.05 * left} stroke={INK} strokeWidth={3 - gap * 1.4} strokeDasharray={dash} opacity=".75" />
        <text x={CX} y={338} textAnchor="middle" fontSize="12" fill={MUTED}>社会体（socius）的「墙」：大地 / 专制者 / 资本</text>

        {/* 偏执极：整齐的同心队列 + 指向中心的箭头 */}
        <g opacity={clamp(1 - p * 1.8)}>
          {[46, 78, 110].map(r => <ellipse key={r} cx={CX} cy={CY} rx={r * 1.35} ry={r * .85} fill="none" stroke={BLUE} strokeDasharray="3 5" opacity=".5" />)}
        </g>
        <g opacity={clamp(1 - p * 1.4)}>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="30">👑</text>
          <text x={CX} y={CY + 30} textAnchor="middle" fontSize="11" fill={BLUE}>中央主权</text>
        </g>

        {/* 精神分裂极：逃逸线 */}
        <g opacity={clamp((p - .35) / .5)}>
          {dots.map((d, j) => d.out && <line key={j} x1={CX + Math.cos(d.a2) * RX * .82} y1={CY + Math.sin(d.a2) * RY * .82} x2={pos[j].x} y2={pos[j].y}
            stroke={RED} strokeWidth="1.6" strokeDasharray="5 4" opacity=".7" />)}
          {/* 边缘的熔合群体：相邻点相连 */}
          {dots.map((d, j) => { const k = (j + 3) % dots.length; return !d.out && j % 2 === 0 && Math.hypot(pos[j].x - pos[k].x, pos[j].y - pos[k].y) < 120 &&
            <line key={"g" + j} x1={pos[j].x} y1={pos[j].y} x2={pos[k].x} y2={pos[k].y} stroke={VIOLET} strokeWidth="1.2" opacity=".45" />; })}
        </g>

        {dots.map((d, j) => {
          const col = p < .5 ? BLUE : d.out ? RED : VIOLET;
          const ang = Math.atan2(CY - pos[j].y, CX - pos[j].x);
          return <g key={j}>
            <circle cx={pos[j].x} cy={pos[j].y} r={5.5} fill={col} opacity=".9" />
            {p < .3 && <line x1={pos[j].x} y1={pos[j].y} x2={pos[j].x + Math.cos(ang) * 11} y2={pos[j].y + Math.sin(ang) * 11} stroke={BLUE} strokeWidth="1.6" opacity={1 - p * 3} />}
          </g>;
        })}

      </svg>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 14, color: BLUE, fontWeight: 600 }}>偏执</span>
        <input type="range" min="0" max="100" value={Math.round(p * 100)} onChange={e => drag(+e.target.value / 100)} aria-label="两极" style={{ width: "100%", accentColor: "var(--accent)" }} />
        <span style={{ fontSize: 14, color: RED, fontWeight: 600 }}>精神分裂</span>
      </div>

      <div className="seg" style={{ marginBottom: 0 }}>
        {CASES.map((c, i) => <button key={c.id} className={ci === i ? "on" : ""} onClick={() => play(i)}>{c.label}</button>)}
      </div>
      {ci !== null && <p style={{ margin: 0, fontSize: 15, background: "var(--card)", borderLeft: "4px solid var(--gold)", padding: "8px 12px", borderRadius: 8 }}>{CASES[ci].note}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
        <PoleCard on={pole === 0} col={BLUE} title="偏执-法西斯极" rows={[
          ["投注方式", "超投注中央主权，把它当作历史上一切社会形式的永恒终极原因；反投注飞地与边缘；撤除对欲望一切自由形象的投注。"],
          ["无意识的独白", "「是的，我是你们一类的，我属于高等的种族和阶级。」"],
          ["物理学", "宏观物理：大数、群众、组织化的人群——偏执狂是克分子大集合的艺术家。"],
          ["群体", <><C id="subject_group">臣服群体</C>：结构在上，欲望被压抑。</>],
          ["与家庭", "俄狄浦斯是偏执领土性的附属：把社会投注压平为「爸爸-妈妈」的人格化形象。"],
        ]} />
        <PoleCard on={pole === 2} col={RED} title="精神分裂-革命极" rows={[
          ["投注方式", <>追随欲望的<C id="line_of_escape">逃逸线</C>，冲破墙让流动起来，在飞地与边缘组装自己的机器和「熔合群体」。</>],
          ["无意识的独白", "「我不是你们一类的，我永远属于劣等种族，我是一头野兽。」"],
          ["物理学", "微观物理：不再服从统计规律的流与局部对象，无穷小的逃逸线。"],
          ["群体", <><C id="subject_group">主体群体</C>：横贯的多样体，欲望作为分子现象流通。</>],
          ["与家庭", "家庭被撑开、喘不过气，摊在一个不再闭合的社会场上：母亲的眼睛里是罢工、战争、饥荒与脑叶切除术。"],
        ]} />
      </div>
      {pole === 1 && <p style={{ margin: 0, color: MUTED, fontSize: 15 }}>⚖️ 中间并没有一个稳定的「第三极」：无意识总在两极之间摆荡，常常两者并存——但摆荡不抹去两者在本性上的差异（游牧 vs 隔离）。</p>}
      <p style={{ margin: 0, fontSize: 13, color: MUTED }}>示意图：点的排布、墙的缺口只是视觉化；「偏执」「精神分裂」在这里指社会投注的两种类型，不是临床诊断。三个案例与两句独白取自原著，中文为改写。</p>
    </div>
  );
}

function PoleCard({ on, col, title, rows }) {
  return <div style={{ border: `2px solid ${on ? col : "var(--line)"}`, borderRadius: 14, padding: "12px 14px", background: on ? "var(--card)" : "transparent", opacity: on ? 1 : .72, transition: ".3s" }}>
    <div style={{ fontFamily: "var(--serif)", fontSize: 19, color: col, marginBottom: 6 }}>{title}</div>
    {rows.map(([k, v]) => <div key={k} style={{ fontSize: 14.5, margin: "4px 0" }}><b style={{ color: MUTED, fontWeight: 600 }}>{k}：</b>{v}</div>)}
  </div>;
}

function clamp(x) { return Math.max(0, Math.min(1, x)); }
