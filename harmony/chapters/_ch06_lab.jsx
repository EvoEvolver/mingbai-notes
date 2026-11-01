// 第 6 章专属图解「声部连接实验台」：两个四部和弦（S/A/T/B），逐音升降半音，
// 实时检测平行/反向/隐伏五八度、四部同向、声部交错与超越、声部脱节、超出音域，并画出「连线图」（原书图 6.17 的连线法）。
import { useState } from "react";
import { Score, play, sequence, stop, mod12, CHORD_TYPES, SHARP, FLAT } from "@kit/audio";
import { grand, midis } from "./_ch06_scores.js";

const V = [
  { k: "B", zh: "男低", lo: 40, hi: 60, color: "#2f6fb0" },
  { k: "T", zh: "男高", lo: 48, hi: 67, color: "#3c8f5a" },
  { k: "A", zh: "女低", lo: 55, hi: 74, color: "#b07a1e" },
  { k: "S", zh: "女高", lo: 60, hi: 81, color: "#b8432f" },
];
const nm = (m, sp) => (sp === "flat" ? FLAT : SHARP)[mod12(m)].replace("♯", "#").replace("♭", "b") + (Math.floor(m / 12) - 1);
const pretty = s => s.replace(/#/g, "♯").replace(/([A-G])b/g, "$1♭");

export const PRESETS = [
  { id: "v7", label: "G7 → C（经典解决）", a: "G2 B3 F4 D5", b: "C3 C4 E4 C5", note: "导音 B 上行到 C，七音 F 下行到 E，五音 D 下行到 C：主和弦省略五音、三个声部唱主音。" },
  { id: "harm", label: "C → Am（和声连接法）", a: "C3 G3 E4 C5", b: "A2 A3 E4 C5", note: "共同音 C、E 原地保持，只有男高音 G 走一步到 A——最平稳的连接。" },
  { id: "p5", label: "E → Am（平行五度）", a: "E3 G#3 B4 E5", b: "A2 A3 E4 C5", note: "男低 E→A 与女低 B→E 都下行，两者之间始终是纯五度（复音程）：声部「合并」，音响空洞。" },
  { id: "p8", label: "G7 → C（平行八度）", a: "G2 F3 B3 G4", b: "C3 E3 C4 C5", note: "外声部 G→C 一起上行，始终相隔两个八度：女高音像是在给低音「加厚」，少了一个独立声部。" },
  { id: "all", label: "Bø → C（四部同向）", a: "B2 A3 F4 D5", b: "C3 C4 G4 E5", note: "四个声部全部上行，听起来「一边倒」。试着让女高音 D 下行到 C，或保持一个共同音。" },
  { id: "cross", label: "G → Am（声部交错）", a: "G2 B3 D4 G4", b: "A2 C4 A3 E4", note: "女低音落到 A3，比男高音的 C4 还低：两条线在耳朵里缠成一团。" },
  { id: "over", label: "G/D → C（声部超越）", a: "D3 G3 B3 G4", b: "C3 C4 E4 G4", note: "男高音的 C4 高过了前一个和弦女低音的 B3，同样让声部线条不清。" },
  { id: "hid", label: "F → G（隐伏八度）", a: "F3 C4 A4 C5", b: "G3 D4 B4 G5", note: "外声部同向进入八度，而且女高音大跳——传统上要避免。" },
  { id: "moz", label: "A♭+6 → G（莫扎特五度）", a: "Ab3 Eb4 C5 F#5", b: "G3 D4 B4 G5", sp: "flat", note: "德国增六和弦解决到属和弦时，A♭–E♭ → G–D 形成平行五度；因音响复杂而被容许，但能避免就避免。把 E♭ 改成 D 试试（法国增六）。" },
  { id: "vii", label: "Bø → C（导七的平行五度）", a: "B2 F3 D4 A4", b: "C3 E3 C4 G4", note: "三音 D 与七音 A 相距纯五度，都按趋向解决就成了平行五度。把女低 D 移到 A 的上方（D5→C5）就变成允许的平行四度。" },
];

// 识别和弦：返回 { name, inv, double }
const TYPES = [["", "大三"], ["m", "小三"], ["°", "减三"], ["+", "增三"], ["7", "属七"], ["maj7", "大七"], ["m7", "小七"], ["ø", "半减七"], ["°7", "减七"], ["mM7", "小大七"]];
const ROLE = ["根音", "三音", "五音", "七音"];
function identify(ch, sp) {
  const pcs = [...new Set(ch.map(mod12))];
  for (const full of [true, false]) for (const [t, zh] of TYPES) for (let r = 0; r < 12; r++) {
    const iv = CHORD_TYPES[t]; if (!iv) continue;
    const set = iv.map(i => mod12(r + i));
    const need = full ? set : set.filter((_, k) => k !== 2);   // 允许省略五音
    if (pcs.every(p => set.includes(p)) && need.every(p => pcs.includes(p)) && (full ? pcs.length === set.length : true)) {
      const bassRole = set.indexOf(mod12(ch[0]));
      const counts = set.map(p => ch.filter(m => mod12(m) === p).length);
      const dbl = counts.map((c, k) => (c > 1 ? ROLE[k] : null)).filter(Boolean);
      const omit = counts.map((c, k) => (c === 0 ? ROLE[k] : null)).filter(Boolean);
      const root = pretty(nm(r, sp).replace(/-?\d+$/, ""));
      const disp = root + t.replace("maj7", "Δ7").replace("ø", "ø7");
      const inv = bassRole === 0 ? "原位" : ["", "第一转位", "第二转位", "第三转位"][bassRole];
      return { name: disp + (bassRole ? "/" + pretty(nm(ch[0], sp).replace(/-?\d+$/, "")) : ""), zh, inv, dbl, omit };
    }
  }
  return null;
}

const PCLASS = x => { const a = Math.abs(x); if (a === 0) return "同度"; const p = a % 12; return p === 0 ? "八度" : p === 7 ? "五度" : null; };
function analyze(c1, c2) {
  const out = [], bad = new Set();   // bad：涉及问题的声部下标
  const d = c2.map((m, i) => m - c1[i]);
  const sgn = x => Math.sign(x);
  // 音域
  [c1, c2].forEach((c, ci) => c.forEach((m, i) => {
    if (m < V[i].lo || m > V[i].hi) out.push({ lv: "warn", t: `第 ${ci + 1} 个和弦的${V[i].zh}（${pretty(nm(m))}）超出常用音域 ${pretty(nm(V[i].lo))}–${pretty(nm(V[i].hi))}` });
  }));
  // 交错（和弦内上下颠倒）与脱节
  [c1, c2].forEach((c, ci) => {
    for (let i = 0; i < 3; i++) if (c[i] > c[i + 1]) { out.push({ lv: "bad", t: `声部交错：第 ${ci + 1} 个和弦里${V[i].zh}高过了${V[i + 1].zh}` }); bad.add(i); bad.add(i + 1); }
    for (let i = 1; i < 3; i++) if (c[i + 1] - c[i] > 12) out.push({ lv: "warn", t: `声部脱节：第 ${ci + 1} 个和弦的${V[i].zh}与${V[i + 1].zh}相距超过八度（男低与男高之间不受此限）` });
  });
  // 超越
  for (let i = 0; i < 3; i++) {
    if (c2[i] > c1[i + 1]) { out.push({ lv: "bad", t: `声部超越：${V[i].zh}走到了前一和弦${V[i + 1].zh}的上方` }); bad.add(i); }
    if (c2[i + 1] < c1[i]) { out.push({ lv: "bad", t: `声部超越：${V[i + 1].zh}走到了前一和弦${V[i].zh}的下方` }); bad.add(i + 1); }
  }
  // 两两声部的五八度
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    const a = PCLASS(c1[j] - c1[i]), b = PCLASS(c2[j] - c2[i]);
    if (!b || d[i] === 0 && d[j] === 0) continue;
    const pair = `${V[i].zh}–${V[j].zh}`, kind = b === "五度" ? "五度" : "八度";
    if (a && (a === b || (a !== "五度" && b !== "五度")) && d[i] !== 0 && d[j] !== 0) {
      if (sgn(d[i]) === sgn(d[j])) { out.push({ lv: "bad", t: `平行${kind}：${pair}（${pretty(nm(c1[i]))}–${pretty(nm(c1[j]))} → ${pretty(nm(c2[i]))}–${pretty(nm(c2[j]))}）` }); bad.add(i); bad.add(j); }
      else { out.push({ lv: "bad", t: `反向${kind}：${pair}` }); bad.add(i); bad.add(j); }
    } else if (!a && d[i] !== 0 && d[j] !== 0 && sgn(d[i]) === sgn(d[j]) && i === 0 && j === 3) {
      if (Math.abs(d[3]) > 2) { out.push({ lv: "bad", t: `隐伏${kind}：外声部同向进入${kind}，且女高音跳进` }); bad.add(0); bad.add(3); }
      else out.push({ lv: "ok", t: `隐伏${kind}出现在外声部，但女高音是级进——传统上允许` });
    }
  }
  if (d.every(x => x > 0) || d.every(x => x < 0)) out.push({ lv: "bad", t: "四部同向：所有声部朝同一方向运动，至少保持一个共同音或让一个声部反向" });
  // 旋律进行
  d.forEach((x, i) => {
    const a = Math.abs(x);
    if (i > 0 && a > 7) out.push({ lv: "warn", t: `${V[i].zh}大跳 ${a} 个半音：内声部宜平稳` });
    if (i > 0 && a === 6) out.push({ lv: "warn", t: `${V[i].zh}做了三全音跳进` });
  });
  return { out, bad, d };
}

const motion = x => (x === 0 ? "保持" : Math.abs(x) <= 2 ? (x > 0 ? "级进↑" : "级进↓") : (x > 0 ? `跳进↑${x}` : `跳进↓${-x}`));

export default function VoiceLeadingLab() {
  const [pi, setPi] = useState(0);
  const P = PRESETS[pi] || null;
  const [c, setC] = useState([midis(PRESETS[0].a), midis(PRESETS[0].b)]);
  const [sp, setSp] = useState(PRESETS[0].sp || "sharp");
  const [sel, setSel] = useState([1, 3]);
  const load = i => { stop(); setPi(i); setC([midis(PRESETS[i].a), midis(PRESETS[i].b)]); setSp(PRESETS[i].sp || "sharp"); };
  const bump = (ci, vi, dx) => {
    const n = c.map(x => [...x]); n[ci][vi] = Math.max(31, Math.min(88, n[ci][vi] + dx)); setC(n); setPi(-1); setSel([ci, vi]);
    stop(); play([n[ci][vi]], { dur: 0.7 });
  };
  const { out, bad, d } = analyze(c[0], c[1]);
  const id = c.map(ch => identify(ch, sp));
  const pos = ch => (ch[3] - ch[1] < 12 ? "密集排列" : "开放排列");
  const label = (k) => id[k] ? id[k].name : "?";
  const sc = grand([[[label(0), c[0].slice(0, 2).map(m => nm(m, sp)).join(" ") + " | " + c[0].slice(2).map(m => nm(m, sp)).join(" "), 2],
    [label(1), c[1].slice(0, 2).map(m => nm(m, sp)).join(" ") + " | " + c[1].slice(2).map(m => nm(m, sp)).join(" "), 2]]]);
  // 连线图
  const W = 360, H = 260, lo = 38, hi = 84, y = m => H - 16 - (m - lo) / (hi - lo) * (H - 32), X = [110, 250];
  const playVoice = i => { stop(); sequence([{ notes: [c[0][i]] }, { notes: [c[1][i]] }], { gap: 0.6 }); };
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">例子</span>
      <select value={pi} onChange={e => load(+e.target.value)} style={{ font: "inherit", maxWidth: "100%" }}>
        {pi === -1 && <option value={-1}>（已修改）</option>}
        {PRESETS.map((p, i) => <option key={p.id} value={i}>{p.label}</option>)}
      </select>
      <button className={sp === "flat" ? "on" : ""} onClick={() => setSp(sp === "flat" ? "sharp" : "flat")}>{sp === "flat" ? "降号拼写" : "升号拼写"}</button>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: "1 1 300px", maxWidth: 420, background: "var(--paper)", borderRadius: 10 }}>
        {[40, 48, 60, 72, 84].filter(m => m >= lo && m <= hi).map(m => <g key={m}>
          <line x1={40} x2={W - 20} y1={y(m)} y2={y(m)} stroke="var(--line)" strokeDasharray={m === 60 ? "" : "3 4"} />
          <text x={6} y={y(m) + 4} fontSize={11} fill="var(--muted)">{nm(m)}</text></g>)}
        {X.map((x, k) => <text key={k} x={x} y={14} fontSize={12} textAnchor="middle" fill="var(--ink)">{label(k)}</text>)}
        {V.map((v, i) => <g key={i}>
          <line x1={X[0]} y1={y(c[0][i])} x2={X[1]} y2={y(c[1][i])} stroke={bad.has(i) ? "#d0312d" : v.color} strokeWidth={bad.has(i) ? 4 : 2.2} strokeDasharray={bad.has(i) ? "" : ""} opacity={0.9} />
          {[0, 1].map(k => <g key={k} style={{ cursor: "pointer" }} onClick={() => { setSel([k, i]); stop(); play([c[k][i]], { dur: 0.8 }); }}>
            <circle cx={X[k]} cy={y(c[k][i])} r={sel[0] === k && sel[1] === i ? 9 : 7} fill={v.color} stroke={sel[0] === k && sel[1] === i ? "var(--ink)" : "#fff"} strokeWidth={2} />
            <text x={X[k] + (k ? 14 : -14)} y={y(c[k][i]) + 4} fontSize={11} textAnchor={k ? "start" : "end"} fill={v.color}>{v.k} {pretty(nm(c[k][i], sp))}</text>
          </g>)}
        </g>)}
      </svg>
      <div style={{ flex: "1 1 260px" }}>
        <table style={{ borderCollapse: "collapse", fontSize: 14, width: "100%" }}><tbody>
          <tr><th></th><th>和弦 1</th><th>和弦 2</th><th>进行</th></tr>
          {[3, 2, 1, 0].map(i => <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
            <td style={{ color: V[i].color, fontWeight: 700, padding: "3px 4px" }}><button className="au-mini" onClick={() => playVoice(i)} title="单听这个声部">▶</button> {V[i].k} {V[i].zh}</td>
            {[0, 1].map(k => <td key={k} style={{ whiteSpace: "nowrap", background: sel[0] === k && sel[1] === i ? "#fbeee9" : "" }}>
              <button onClick={() => bump(k, i, -1)} aria-label="降半音">−</button>
              <b style={{ display: "inline-block", minWidth: 44, textAlign: "center" }}>{pretty(nm(c[k][i], sp))}</b>
              <button onClick={() => bump(k, i, 1)} aria-label="升半音">+</button></td>)}
            <td style={{ color: bad.has(i) ? "#d0312d" : "var(--muted)" }}>{motion(d[i])}</td>
          </tr>)}
        </tbody></table>
        <div className="au-ctrl" style={{ marginTop: 6 }}>
          <button className="au-go" onClick={() => { stop(); sequence([{ notes: c[0] }, { notes: c[1] }], { gap: 1.2 }); }}>▶ 听连接</button>
          <button onClick={() => { stop(); play(c[0], { dur: 1.6 }); }}>和弦 1</button>
          <button onClick={() => { stop(); play(c[1], { dur: 1.6 }); }}>和弦 2</button>
          <button onClick={() => { stop(); sequence([{ notes: [c[0][0], c[0][3]] }, { notes: [c[1][0], c[1][3]] }], { gap: 1 }); }}>只听外声部</button>
          <button onClick={() => stop()}>■</button>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          {id.map((x, k) => <div key={k}>和弦 {k + 1}：{x ? <><b style={{ color: "var(--ink)" }}>{x.name}</b>（{x.zh}和弦 · {x.inv} · {pos(c[k])}{x.dbl.length ? " · 重复" + x.dbl.join("、") : ""}{x.omit.length ? " · 省略" + x.omit.join("、") : ""}）</> : "不是常见的三和弦/七和弦"}</div>)}
        </div>
      </div>
    </div>
    <div className="au-info">
      {P && <p style={{ margin: "0 0 6px" }}>{P.note}</p>}
      {out.length === 0 ? <span style={{ color: "#3c8f5a" }}>✓ 没有发现传统四部和声里的不良进行。</span> :
        <ul style={{ margin: 0, paddingLeft: 18 }}>{out.map((o, k) => <li key={k} style={{ color: o.lv === "bad" ? "#d0312d" : o.lv === "warn" ? "#a06a00" : "#3c8f5a" }}>{o.t}</li>)}</ul>}
      <div className="au-hint" style={{ marginTop: 6 }}>点 − / + 把任一声部升降半音（会单独发声），连线图与检测结果实时更新。红色粗线 = 卷入不良进行的声部。</div>
    </div>
    <Score abc={sc.abc} bass={sc.bass} unit="1/4" meter="4/4" scale={0.9} caption="当前两个和弦的五线谱" />
  </div>;
}
