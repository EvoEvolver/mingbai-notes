// 第 10 章图解：旋律音与十二个根音上的和弦（原书图 10.3）。
// 原书只填了旋律音 C 这一列（每个根音各一个和弦）；把这一列平移到其他旋律音，就能把 12 × 12 的表格全部填满。
// 「斜线法」：直接把旋律音上的大三和弦放在任意低音上（C/C、C/D♭……C/B）。
import { useState } from "react";
import { play, pcName, mod12, parseChord, Play } from "@kit/audio";

// 旋律音为 C 时，以 C、D♭……B 为根音的和弦（原书第一列）：根音相对旋律音的音程 → 和弦类型
const TYPES = ["m7", "Δ", "7b5", "°7", "+", "7", "ø", "sus4", "7", "m7", "9", "7alt"];
const SHOW = { m7: "m7", "Δ": "Δ", "7b5": "7♭5", "°7": "°7", "+": "+", "7": "7", "ø": "ø", sus4: "sus", "9": "9", "7alt": "7alt" };
const ROLE = ["根音", "大七度", "七音（小七度）", "减七音", "增五音", "五音", "降五音（♭5）", "挂留四度", "三音", "小三音", "九音", "♭9（alt）"];
const SHARP_ROWS = new Set([3, 6]);   // 原书写作 D♯°7、F♯ø
const name = (r, off) => pcName(r, SHARP_ROWS.has(off) ? "sharp" : "flat");

function voicing(sym, mel, slash) {
  const c = parseChord(sym), top = 67 + mod12(mel - 67);
  const bassPc = slash != null ? slash : mod12(c.root);
  const bass = 36 + mod12(bassPc - 36);
  const pcs = [...new Set(c.notes.map(mod12))].filter(p => p !== mod12(mel) && (slash != null || p !== bassPc));
  const inner = pcs.map(p => top - 1 - mod12(top - 1 - p)).filter(m => m > top - 14).sort((a, b) => a - b);
  return { bass, inner, top };
}

export default function TwelveRoots() {
  const [mel, setMel] = useState(0), [slash, setSlash] = useState(false), [pick, setPick] = useState(null);
  const label = (r, m) => slash ? `${pcName(m, "flat")}/${pcName(r, "flat")}` : name(r, mod12(r - m)) + SHOW[TYPES[mod12(r - m)]];
  const sym = (r, m) => pcName(r, "flat") + TYPES[mod12(r - m)];
  const hit = (r, m) => {
    const v = slash ? voicing(pcName(m, "flat"), m, r) : voicing(sym(r, m), m);
    play([v.bass, ...v.inner], { dur: 1.8, arp: 0.03, velocity: 0.6 });
    play([v.top], { dur: 1.8, at: 0.12, velocity: 0.95 });
    setPick([r, m]);
  };
  const cell = { padding: "3px 4px", fontSize: 12.5, textAlign: "center", border: "1px solid var(--line)", whiteSpace: "nowrap" };
  return <div className="card">
    <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
      <span className="au-lab">旋律音</span>
      {Array.from({ length: 12 }, (_, m) => <button key={m} className={mel === m ? "on" : ""} onClick={() => setMel(m)}>{pcName(m, "flat")}</button>)}
      <button className={slash ? "on" : ""} onClick={() => setSlash(!slash)} title="把旋律音上的大三和弦直接放在各个低音上">斜线法</button>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", margin: "6px 0", minWidth: 720 }}>
        <thead><tr><th style={{ ...cell, background: "#4a7fb5", color: "#fff" }}>根音＼旋律</th>
          {Array.from({ length: 12 }, (_, m) => <th key={m} style={{ ...cell, background: m === mel ? "#4a7fb5" : "#dfe8f3", color: m === mel ? "#fff" : undefined, cursor: "pointer" }}
            onClick={() => setMel(m)}>{pcName(m, "flat")}</th>)}</tr></thead>
        <tbody>{Array.from({ length: 12 }, (_, r) => <tr key={r}>
          <th style={{ ...cell, background: "#dfe8f3" }}>{pcName(r, "both")}</th>
          {Array.from({ length: 12 }, (_, m) => {
            const isPick = pick && pick[0] === r && pick[1] === m, col = m === mel;
            return <td key={m} onClick={() => hit(r, m)} style={{ ...cell, cursor: "pointer", fontWeight: col ? 600 : 400,
              background: isPick ? "var(--gold)" : col ? "#eef3fa" : undefined, color: !col && !isPick ? "var(--muted)" : undefined }}>{label(r, m)}</td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
    <div className="au-info">
      {pick ? <>旋律音 <b>{pcName(pick[1], "flat")}</b> 配 <b>{label(...pick)}</b>：
        {slash ? <>上方仍是 {pcName(pick[1], "flat")} 大三和弦，只是低音换成了 {pcName(pick[0], "flat")}——最「简单粗暴」的重配。</>
          : <>旋律音是这个和弦的<b>{ROLE[mod12(pick[0] - pick[1])]}</b>。</>}</>
        : <>点表中任意格子：先响低音和内声部，再在最上方响旋律音。原书只给出旋律音 C 那一列（深色），其余各列是把它平移得到的一种填法。</>}
      <div className="au-hint">试试同一列从上到下逐个点：同一个旋律音，十二种完全不同的「背景色」。也可以先听 <Play notes="C5">旋律音 C</Play> 再点格子。</div>
    </div>
  </div>;
}
