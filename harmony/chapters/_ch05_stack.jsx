// 第 5 章：高叠和弦「搭积木」——从 G 三和弦逐层三度叠到 G13，并可升降五、九、十一、十三音；
// 标出每个音的层级（骨干 / 导引音 / 延伸音 / 变化音 / 避免音），可单独听躯壳排列。
import { useState } from "react";
import { play, sequence, stop, useAudioState } from "@kit/audio";

const ROOT = 43; // G2
// 每层：度数、字母、自然半音数、可选变化
const LAYERS = [
  { deg: 1, letter: "G", st: 0, alts: [] },
  { deg: 3, letter: "B", st: 4, alts: [] },
  { deg: 5, letter: "D", st: 7, alts: [-1, 1] },
  { deg: 7, letter: "F", st: 10, alts: [] },
  { deg: 9, letter: "A", st: 14, alts: [-1, 1] },
  { deg: 11, letter: "C", st: 17, alts: [1] },
  { deg: 13, letter: "E", st: 21, alts: [-1] },
];
const NAMES = { 3: "三和弦 G", 4: "属七 G7", 5: "属九 G9", 6: "属十一 G11", 7: "属十三 G13" };
const acc = a => (a < 0 ? "♭" : a > 0 ? "♯" : "");

export default function StackBuilder() {
  const { active } = useAudioState();
  const [n, setN] = useState(4), [alt, setAlt] = useState({});
  const layers = LAYERS.slice(0, n).map(L => {
    const a = alt[L.deg] || 0;
    const midi = ROOT + L.st + a;
    const role = L.deg === 1 ? "根音" : L.deg === 3 || L.deg === 7 ? "导引音" : L.deg === 5 && !a ? "五音（可省）" : a ? "变化音" : L.deg === 11 ? "避免音" : "延伸音";
    return { ...L, a, midi, role, name: acc(a) + L.letter, label: acc(a) + L.deg };
  });
  const altTxt = layers.filter(l => l.a).map(l => l.label).join("");
  const name = (NAMES[n] || "") + (altTxt ? " " + altTxt : "");
  const col = r => r === "根音" ? "var(--ink)" : r === "导引音" ? "var(--accent)" : r === "变化音" ? "var(--violet, #6b4aa0)" : r === "避免音" ? "#b04a2a" : r.startsWith("五音") ? "#8a8170" : "var(--blue)";
  const midis = layers.map(l => l.midi);
  const toggle = (deg, a) => setAlt({ ...alt, [deg]: alt[deg] === a ? 0 : a });
  return <div className="card">
    <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
      <span className="au-lab">叠到</span>
      {[3, 4, 5, 6, 7].map(k => <button key={k} className={n === k ? "on" : ""} onClick={() => { setN(k); play(LAYERS.slice(0, k).map(L => ROOT + L.st + (alt[L.deg] || 0)), { arp: 0.05, dur: 2 }); }}>
        {["", "", "", "三和弦", "七和弦", "九和弦", "十一和弦", "十三和弦"][k]}</button>)}
    </div>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column-reverse", gap: 4, flex: "1 1 260px", maxWidth: 420 }}>
        {layers.map(l => <div key={l.deg} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => play([l.midi], { dur: 1.2 })} style={{ flex: 1, textAlign: "left", padding: "6px 10px", borderRadius: 6, cursor: "pointer",
            border: "2px solid " + col(l.role), background: active.has(l.midi) ? "var(--gold)" : "#fff" }}>
            <b style={{ display: "inline-block", width: 36 }}>{l.label}</b><b style={{ display: "inline-block", width: 34 }}>{l.name}</b>
            <small style={{ color: col(l.role) }}>{l.role}</small>
          </button>
          <span style={{ width: 100, display: "flex", gap: 3 }}>{l.alts.map(a => <button key={a} className={"au-mini" + (l.a === a ? " on" : "")}
            style={l.a === a ? { background: "var(--violet, #6b4aa0)", color: "#fff" } : null}
            onClick={() => { toggle(l.deg, a); play([ROOT + l.st + (l.a === a ? 0 : a)], { dur: 1 }); }}>{acc(a)}{l.deg}</button>)}</span>
        </div>)}
      </div>
      <div style={{ flex: "1 1 220px" }}>
        <div className="au-info"><b>{name}</b>：{layers.map(l => l.name).join("–")}。
          {n >= 6 && !alt[11] && <> 十一音 C 与三音 B 构成小九度，是属和弦上的<b>避免音</b>；试试把它升成 ♯11。</>}
          {alt[9] === 1 && <> ♯9 与三音并存，「大小三度同时响」是蓝调式的辣味。</>}
        </div>
        <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
          <button className="au-go" onClick={() => { stop(); sequence([...midis.map(m => ({ notes: [m] })), { notes: midis }], { gap: 0.32 }); }}>▶ 逐层叠上去</button>
          <button className="au-go" onClick={() => play(midis, { dur: 2.4 })}>▶ 整体</button>
          <button onClick={() => play([ROOT, ROOT + 16, ROOT + 22], { dur: 2 })}>躯壳 1–3–7</button>
          <button onClick={() => { stop(); sequence([{ notes: midis }, { notes: [48, 52, 55, 59, 62] }], { gap: 1.4 }); }}>解决到 CΔ9</button>
          <button onClick={() => setAlt({})}>清除变化音</button>
        </div>
        <div className="au-hint">按钮颜色：红 = 导引音（3、7）· 蓝 = 延伸音 · 紫 = 变化音 · 棕 = 避免音。点 ♭9、♯11 等给和弦「加香料」。</div>
      </div>
    </div>
  </div>;
}
