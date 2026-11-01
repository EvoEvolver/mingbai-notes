// 第 3 章专用图解：
//   MinorLab —— 「三种小调实验台」：同主音 A 上切换自然 / 和声 / 旋律（爵士）小调，并可对照关系大调 C、同主音大调 A。
//                网格上标出调内音，下方列出音阶各级与七个调内和弦（三和弦/七和弦），点击即听。
//   DegreeSchemes —— 「d 小调的四套记号」：固定、顺阶、自然、首调四种级数方案对照。
import { useState } from "react";
import { Tonnetz, play, sequence, stop, useAudioState, SHARP, mod12 } from "@kit/audio";

const MODES = {
  nat: { label: "自然小调", sub: "a natural minor", tonic: 9, scale: [0, 2, 3, 5, 7, 8, 10], minor: true,
    fn: ["t", "s", "t/d", "s", "d", "s/t", "d"], prog: ["Am", "Dm", "Em", "Am"],
    note: "与 C 大调用同一组白键，只是主音换成了 A。7 级 G 离主音一个全音，是「下主音」而非导音，所以 v（Em）、VII（G）都推不动主音：属功能组乏力；而 6 级 F 只比 5 级高半音，下属功能组反而加强。" },
  harm: { label: "和声小调", sub: "a harmonic minor", tonic: 9, scale: [0, 2, 3, 5, 7, 8, 11], minor: true,
    fn: ["t", "s", "D", "s", "D", "s/t", "D"], prog: ["Am", "Dm", "E", "Am"],
    note: "把 7 级 G 升成 G♯，人工造出导音：属和弦变成大三和弦 E（V），7 级上是减三和弦 G♯°（vii°），3 级上出现增三和弦 C+。代价是 F–G♯ 之间的增二度——听上去带点「异域味」。" },
  mel: { label: "旋律（爵士）小调", sub: "a melodic / jazz minor", tonic: 9, scale: [0, 2, 3, 5, 7, 9, 11], minor: true,
    fn: ["", "", "", "", "", "", ""], prog: ["Am", "D", "E", "Am"],
    note: "上行时把 6、7 级一起升高（F♯、G♯），消除增二度；传统旋律小调下行时还原成自然小调。爵士乐则上下行都升高，并由此构造和弦：它等于 A 大调只把 3 级降半音，所以 IV（D）、V（E）都和同主音大调一样。" },
  rel: { label: "对照：关系大调 C", sub: "C major (relative)", tonic: 0, scale: [0, 2, 4, 5, 7, 9, 11], minor: false,
    fn: ["T", "S", "T/D", "S", "D", "T/S", "D"], prog: ["C", "F", "G", "C"],
    note: "C 大调与 a 自然小调七个音完全相同，网格上形状完全重合——只是「领导」从 A 换成了 C。大调的 6 级就是关系小调的主音，小调的 3 级就是关系大调的主音。" },
  par: { label: "对照：同主音大调 A", sub: "A major (parallel)", tonic: 9, scale: [0, 2, 4, 5, 7, 9, 11], minor: false,
    fn: ["T", "S", "T/D", "S", "D", "T/S", "D"], prog: ["A", "D", "E", "A"],
    note: "主音同为 A，但 3、6、7 级 C♯、F♯、G♯ 都比 a 自然小调高半音。网格上，同主音大小调的平行四边形上下相邻、共用一条边——这正是第 3-3、3-4 节「借用和弦」的来源。" },
};
const NAT = MODES.nat.scale.map(s => mod12(9 + s));
const ROM = ["I", "II", "III", "IV", "V", "VI", "VII"];
const TRI = { "4,7": ["", "M"], "3,7": ["m", "m"], "3,6": ["°", "d"], "4,8": ["+", "A"] };
const SEV = { "4,7,11": "Δ", "4,7,10": "7", "3,7,10": "m7", "3,6,10": "ø", "3,6,9": "°7", "3,7,11": "mΔ", "4,8,11": "+Δ" };
const SEVROM = { "Δ": "Δ", "7": "7", "m7": "7", "ø": "ø7", "°7": "°7", "mΔ": "Δ", "+Δ": "+Δ" };

function chordsOf(m, sev) {
  return m.scale.map((_, k) => {
    const pcs = [0, 2, 4, 6].slice(0, sev ? 4 : 3).map(d => m.scale[(k + d) % 7] + (k + d >= 7 ? 12 : 0));
    const iv = pcs.map(p => p - pcs[0]);
    const [suf, q] = TRI[iv[1] + "," + iv[2]] || ["?", "?"];
    let r = ROM[k]; if (q === "m" || q === "d") r = r.toLowerCase();
    const root = mod12(m.tonic + pcs[0]), name = SHARP[root];
    if (!sev) return { pcs: pcs.map(p => m.tonic + p), name: name + suf, roman: r + (q === "d" ? "°" : q === "A" ? "+" : ""), q, tri: q === "M" || q === "m" ? name + (q === "m" ? "m" : "") : null };
    const s7 = SEV[iv.slice(1).join(",")] || "?";
    return { pcs: pcs.map(p => m.tonic + p), name: name + s7, roman: r + SEVROM[s7], q, tri: q === "M" || q === "m" ? name + (q === "m" ? "m" : "") : null };
  });
}
// 根音落在 A3–G♯4 附近
const voice = pcs => { const base = 57 + mod12(pcs[0] - 57); return pcs.map(p => base + p - pcs[0]); };

export function MinorLab() {
  const [mode, setMode] = useState("nat"), [sev, setSev] = useState(false), [cur, setCur] = useState(-1);
  useAudioState();
  const m = MODES[mode], chords = chordsOf(m, sev);
  const names = m.scale.map(s => SHARP[mod12(m.tonic + s)]);
  const base = m.tonic === 0 ? 60 : 69, scaleMidi = [...m.scale.map(s => base + s), base + 12];
  const playScale = desc => {
    stop();
    let notes = scaleMidi;
    if (desc) notes = mode === "mel" ? [...MODES.nat.scale.map(s => 69 + s), 81].reverse() : [...scaleMidi].reverse();
    sequence(notes.map(n => ({ notes: [n] })), { gap: 0.36, onStep: i => setCur(i < 0 ? -1 : desc ? 7 - i : i) });
  };
  const progChords = () => {
    const tri = chordsOf(m, false), idx = [0, 3, 4, 0];
    sequence(idx.map(k => ({ notes: [voice(tri[k].pcs)[0] - 12, ...voice(tri[k].pcs)] })), { gap: 1.0 });
  };
  const fnCol = f => (f.startsWith("t") || f.startsWith("T") ? "var(--accent)" : f.startsWith("s") || f.startsWith("S") ? "var(--green)" : f ? "var(--blue)" : "var(--muted)");
  return <div className="card ch3-lab">
    <style>{`
      .ch3-lab .row{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin:6px 0}
      .ch3-lab .cell{border:1px solid var(--line);border-radius:10px;padding:6px 4px;text-align:center;background:var(--paper);cursor:pointer;font:inherit;transition:all .15s}
      .ch3-lab .cell b{display:block;font-family:var(--serif);font-size:19px}
      .ch3-lab .cell small{display:block;font-size:12px;color:var(--muted)}
      .ch3-lab .cell.chg{background:#fbf1d9;border-color:var(--gold)}
      .ch3-lab .cell.on{background:var(--gold);color:#fff;border-color:#8a6215}
      .ch3-lab .cell.on small{color:#fff}
      .ch3-lab .chd.M{border-color:#e3c9c4;background:#fcf3f1}.ch3-lab .chd.m{border-color:#c8d3e3;background:#f2f5fa}
      .ch3-lab .chd.d{border-color:#cfc3dd;background:#f5f1fa}.ch3-lab .chd.A{border-color:#e6cf9a;background:#fbf4e3}
      .ch3-lab .chd i{font-style:normal;font-size:11px;font-weight:700}
      .ch3-lab .lbl{font-size:13px;color:var(--muted);margin-top:10px}
      @media (max-width:560px){.ch3-lab .cell b{font-size:15px}}
    `}</style>
    <div className="au-ctrl">
      {Object.entries(MODES).map(([k, v]) => <button key={k} className={mode === k ? "on" : ""} onClick={() => { stop(); setMode(k); setCur(-1); }}>{v.label}<small>{v.sub}</small></button>)}
    </div>
    <Tonnetz key={mode} cols={11} rows={5} center="A" unit={52} spell="sharp" compact
      notes={m.scale.map(s => m.tonic + s)} highlight={chordsOf(m, false).map(c => c.tri).filter(Boolean)} />
    <div className="lbl">音阶（金色交点 = 调内音；黄底格 = 与 a 自然小调不同的音）</div>
    <div className="row">
      {names.map((n, k) => <button key={k} className={"cell" + (NAT.includes(mod12(m.tonic + m.scale[k])) ? "" : " chg") + (cur === k || (cur === 7 && k === 0) ? " on" : "")}
        onClick={() => play([scaleMidi[k]], { dur: 1 })}>
        <b>{n}</b><small>{k + 1} 级</small><small>{["主音", "上主音", "中音", "下属音", "属音", "下中音", m.scale[6] === 11 ? "导音" : "下主音"][k]}</small>
      </button>)}
    </div>
    <div className="au-ctrl">
      <button className="au-go" onClick={() => playScale(false)}>▶ 上行音阶</button>
      <button className="au-go" onClick={() => playScale(true)}>▶ 下行音阶{mode === "mel" ? "（还原为自然小调）" : ""}</button>
      <button className="au-go" onClick={progChords}>▶ 基本进行 {m.prog.join("–")}</button>
      <span className="au-lab" style={{ marginLeft: 10 }}>和弦</span>
      <button className={!sev ? "on" : ""} onClick={() => setSev(false)}>三和弦</button>
      <button className={sev ? "on" : ""} onClick={() => setSev(true)}>七和弦</button>
    </div>
    <div className="lbl">调内和弦（红 = 大三，蓝 = 小三，紫 = 减，黄 = 增；下方字母为功能组：{m.minor ? "t/s/d 为小调、大写 D 为和声小调的强属功能" : "T 主、S 下属、D 属"}）</div>
    <div className="row">
      {chords.map((c, k) => <button key={k} className={"cell chd " + c.q} onClick={() => { stop(); play(voice(c.pcs), { arp: 0.05, dur: 1.8 }); }}>
        <b>{c.name}</b><small style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>{c.roman}</small>
        <i style={{ color: fnCol(m.fn[k]) }}>{m.fn[k] || "·"}</i>
      </button>)}
    </div>
    <div className="au-info">{m.note}</div>
  </div>;
}

// ——— d 小调的四套记号 ———
const D_NOTES = ["D", "E", "F", "G", "A", "B♭", "C"], D_CH = ["Dm", "E°", "F", "Gm", "Am", "B♭", "C"];
const D_PCS = [2, 4, 5, 7, 9, 10, 0];
const SCHEMES = [
  { k: "顺阶", nums: ["1", "2", "3", "4", "5", "6", "7"], rom: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
    who: "古典和声（「二元制」：大小调各有一套 1–7）", pro: "大小调平起平坐，主音永远是 1，级数就是和弦罗马数字的来源。本书小调默认用它。", con: "数字看不出音程：同是「3 级」，大调是大三度、小调是小三度，要另记。" },
  { k: "自然（关系大调）", nums: ["6", "7", "1", "2", "3", "4", "5"], rom: ["vi", "vii°", "I", "ii", "iii", "IV", "V"],
    who: "简谱、纳什维尔数字、不少流行和声书（La-based minor）", pro: "全是自然音、没有升降号；关系大小调可以共用一套数字，「4536」「4156」这类套路直接通用。", con: "主音记作 6（la），1 不再是主音；和声小调要写 ♯5。" },
  { k: "首调（同主音大调）", nums: ["1", "2", "♭3", "4", "5", "♭6", "♭7"], rom: ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"],
    who: "爵士和声（Do-based minor）；本书讲「借用」时用它", pro: "主音仍为 1，数字直接反映与主音的音程，一眼看出和同主音大调差在哪几级——讲调式交替最方便。", con: "自然小调就要带三个降号，读唱略繁。" },
  { k: "固定", nums: ["2", "3", "4", "5", "6", "♭7", "1"], rom: D_CH,
    who: "固定唱名（Fixed do）、五线谱思维、绝对音感者", pro: "数字 = 实际音高，C 永远是 1；无调性、频繁转调时最可靠。", con: "每个调写法都不同，d 小调和 a 小调的共同规律看不出来，不能当级数用。" },
];
export function DegreeSchemes() {
  const [s, setS] = useState(0), sc = SCHEMES[s];
  const ch = k => { const r = D_PCS[k], q = D_CH[k]; const iv = q.endsWith("°") ? [0, 3, 6] : q.endsWith("m") ? [0, 3, 7] : [0, 4, 7]; return iv.map(i => 62 + mod12(r - 2) + i); };
  return <div className="card ch3-lab">
    <div className="au-ctrl">{SCHEMES.map((x, i) => <button key={i} className={s === i ? "on" : ""} onClick={() => setS(i)}>{x.k}</button>)}</div>
    <div className="row" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
      {D_NOTES.map((n, k) => <button key={k} className="cell" style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "6px 4px", background: k === 0 ? "#fbf1d9" : "var(--paper)", cursor: "pointer", font: "inherit" }}
        onClick={() => { stop(); play(ch(k), { arp: 0.05, dur: 1.6 }); }}>
        <small style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>{n}</small>
        <b style={{ display: "block", fontFamily: "var(--serif)", fontSize: 22, color: "var(--accent)" }}>{sc.nums[k]}</b>
        <small style={{ display: "block", fontFamily: "var(--serif)", fontSize: 15 }}>{sc.rom[k]}</small>
      </button>)}
    </div>
    <div className="au-info"><b>{sc.k}</b> · {sc.who}<br />优点：{sc.pro}<br />不便：{sc.con}</div>
    <div className="au-hint">点任一格听该音上的和弦（D 小调：Dm、E°、F、Gm、Am、B♭、C）。无论数字怎么写，音和和弦一个都没变。</div>
  </div>;
}
