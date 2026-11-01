// 第 8 章小实验台：「和弦音升降台」。三和弦（可加第四个音成七和弦）的每个音都能单独升降半音，
// 实时识别和弦名称（列出所有等音写法，如 C6 = Am7），并在网格上标出这组音（对应原书 8-2 图 8.15–8.18、8-3 图 8.28–8.33）。
import { useState } from "react";
import { play, sequence, stop, Tonnetz, mod12 } from "@kit/audio";

const NAME = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const TYPES = [
  [[0, 4, 7], "", "大三"], [[0, 3, 7], "m", "小三"], [[0, 3, 6], "°", "减三"], [[0, 4, 8], "+", "增三"],
  [[0, 4, 6], "♭5", "大三降五"], [[0, 3, 8], "m♯5", "小三升五"], [[0, 5, 7], "sus4", "挂四"], [[0, 2, 7], "sus2", "挂二"],
  [[0, 4, 11], "Δno5", "省五音大七"], [[0, 3, 10], "m7no5", "省五音小七"], [[0, 4, 10], "7no5", "省五音属七"], [[0, 4, 5], "add4no5", "加四省五"],
  [[0, 4, 7, 11], "Δ", "大七"], [[0, 4, 7, 10], "7", "属七"], [[0, 3, 7, 10], "m7", "小七"], [[0, 3, 6, 10], "ø", "半减七"],
  [[0, 3, 6, 9], "°7", "减七"], [[0, 3, 7, 11], "mΔ", "小大七"], [[0, 4, 8, 11], "+Δ", "增大七"], [[0, 4, 8, 10], "+7", "增七"],
  [[0, 4, 7, 9], "6", "大六"], [[0, 3, 7, 9], "m6", "小六"], [[0, 4, 7, 8], "♭6", "大三加小六"], [[0, 3, 7, 8], "m♭6", "小三加小六"],
  [[0, 4, 6, 10], "7♭5", "属七降五"], [[0, 3, 6, 11], "°Δ", "减大七"], [[0, 4, 6, 11], "Δ♭5", "大七降五"], [[0, 3, 8, 10], "m7♯5", "小七升五"],
];
// 非低音根音的解释只保留常见类型（避免把 C 和弦也读成 Em♯5）
const COMMON = new Set(["", "m", "°", "+", "sus4", "sus2", "Δ", "7", "m7", "ø", "°7", "mΔ", "+Δ", "+7", "6", "m6", "7♭5"]);
const ROLE = ["根音", "三音", "五音", "七音"];
// 识别：所有能解释这组音级的（根音，类型）；低音为根的排在最前
function identify(midis) {
  const set = [...new Set(midis.map(mod12))].sort((a, b) => a - b), bass = mod12(Math.min(...midis)), out = [];
  for (let r = 0; r < 12; r++) for (const [iv, suf, zh] of TYPES) {
    if (iv.length !== set.length) continue;
    const pcs = iv.map(x => mod12(r + x)).sort((a, b) => a - b);
    if (pcs.every((p, k) => p === set[k]) && (r === bass || COMMON.has(suf))) out.push({ name: NAME[r] + suf, zh, root: r });
  }
  return out.sort((a, b) => (b.root === bass) - (a.root === bass));
}
const PRESETS = [["C", [60, 64, 67]], ["Cm", [60, 63, 67]], ["C+", [60, 64, 68]], ["C°", [60, 63, 66]], ["C7", [60, 64, 67, 70]], ["B°7", [59, 62, 65, 68]]];

export default function ToneLab() {
  const [v, setV] = useState([60, 64, 67]), [hist, setHist] = useState([]);
  const names = identify(v), label = names.length ? names.map(n => n.name).join(" = ") : "（非三度叠置）";
  const set = nv => { stop(); setHist(h => [...h.slice(-9), label]); setV(nv); play(nv, { arp: 0.03, dur: 1.3 }); };
  const bump = (k, d) => set(v.map((m, i) => (i === k ? m + d : m)));
  return <div className="card">
    <div className="au-ctrl">
      <span className="au-lab">起点</span>
      {PRESETS.map(([n, ns]) => <button key={n} onClick={() => { setHist([]); set(ns); }}>{n}</button>)}
      <button onClick={() => set(v.length === 3 ? [...v, v[0] + 12] : v.slice(0, 3))}>{v.length === 3 ? "＋ 第四个音（重复最低音）" : "－ 去掉第四个音"}</button>
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "8px 0" }}>
      {v.map((m, k) => <div key={k} style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "6px 10px", textAlign: "center", minWidth: 74, background: "var(--paper)" }}>
        <div className="au-hint">{ROLE[k]}</div>
        <button className="au-mini" onClick={() => bump(k, 1)}>▲ 升半音</button>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--serif)", cursor: "pointer" }} onClick={() => play([m], { dur: 0.9 })}>{NAME[mod12(m)]}</div>
        <button className="au-mini" onClick={() => bump(k, -1)}>▼ 降半音</button>
      </div>)}
      <div style={{ flex: "1 1 220px" }} className="au-info">
        <div style={{ fontSize: 22, fontWeight: 700 }}>{label}</div>
        <div className="au-hint">{names.map(n => n.name + "：" + n.zh).join("；") || "这组音不能按三度叠置解释为常见和弦。"}</div>
        <div className="au-ctrl" style={{ marginTop: 6 }}>
          <button className="au-go" onClick={() => { stop(); play(v, { arp: 0.04, dur: 1.5 }); }}>▶ 听和弦</button>
          <button onClick={() => { stop(); sequence(v.map(m => ({ notes: [m] })), { gap: 0.3 }); }}>分解</button>
        </div>
      </div>
    </div>
    {hist.length > 0 && <div className="au-seq"><span className="au-lab">刚才：</span>{hist.map((h, k) => <span key={k}>{h}</span>)}<span className="on">{label}</span></div>}
    <Tonnetz cols={9} rows={4} center="C" notes={v.map(mod12)} unit={52} compact />
    <div className="au-hint">网格上金色的点就是当前这组音。升降一个音，就看着形状怎样变：三角形 → 一条线（增三、减七在网格上都是直线）→ 四边形（七和弦）。</div>
  </div>;
}
