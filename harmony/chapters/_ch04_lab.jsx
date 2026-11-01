// 第 4 章专用互动图解：
//   TempTonic   「临时主音」——任选调内和弦当临时主和弦，自动求出它的副属 / 副导 / 副上主 / 副下属和弦，播放解决并在网格上画路线
//   ChordHunter 「和弦猎头」——标出几个旋律音，列出所有包含它们的三和弦 / 七和弦（4-2 小调曲例的「看图找和弦」方法）
import { useState } from "react";
import { Tonnetz, play, sequence, stop, voiceChord, parseChord, romanOf, mod12, CHORD_TYPES, pcName } from "@kit/audio";

const NAT = [0, 2, 4, 5, 7, 9, 11], LET = "CDEFGAB";
const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10];
// 按字母拼写音名：letter 为字母序号（0=C），pc 为音级 → "F#" / "Bb"
function spell(letter, pc) {
  const l = ((letter % 7) + 7) % 7; let d = mod12(pc - NAT[l]); if (d > 6) d -= 12;
  return LET[l] + (d > 0 ? "#".repeat(d) : "b".repeat(-d));
}
const pretty = s => s.replace(/#/g, "♯").replace(/([A-G])b/g, "$1♭").replace(/([A-G]♭)b/g, "$1♭");
const LETOFF = [0, 2, 4, 6];
// 和弦：根音字母、音级、类型 → { sym（可解析）, name（显示）, tones:[{name,pc}] }
function mk(letter, pc, type) {
  const root = spell(letter, pc), sym = root + type;
  const tones = CHORD_TYPES[type].map((iv, k) => ({ pc: mod12(pc + iv), name: pretty(spell(letter + LETOFF[k], pc + iv)) }));
  return { sym, name: pretty(sym), tones, rootPc: mod12(pc) };
}

const KEYS = {
  C: { label: "C 大调", letter: 0, pc: 0, minor: false, spell: "sharp" },
  G: { label: "G 大调", letter: 4, pc: 7, minor: false, spell: "sharp" },
  F: { label: "F 大调", letter: 3, pc: 5, minor: false, spell: "flat" },
  Am: { label: "a 小调", letter: 5, pc: 9, minor: true, spell: "sharp" },
};
function keyInfo(k) {
  const K = KEYS[k], steps = K.minor ? MIN : MAJ;
  const deg = steps.map((s, i) => ({ letter: K.letter + i, pc: mod12(K.pc + s) }));
  const triads = deg.map((d, i) => {
    const third = mod12(deg[(i + 2) % 7].pc - d.pc), fifth = mod12(deg[(i + 4) % 7].pc - d.pc);
    const type = third === 4 ? "" : fifth === 6 ? "°" : "m";
    const c = mk(d.letter, d.pc, type);
    return { ...c, i, roman: romanOf(c.sym, k) };
  });
  return { ...K, scale: deg.map(d => d.pc), triads };
}
// 以 X 为临时主和弦的副调和弦
function secondaries(X, keyName) {
  const L = X.tones[0].name, letter = LET.indexOf(L[0]), r = X.rootPc, minor = X.sym.endsWith("m");
  const R = romanOf(X.sym, keyName);
  const list = [
    { id: "V", role: "副属三和弦", label: "V/" + R, c: mk(letter + 4, r + 7, "") },
    { id: "V7", role: "副属七和弦", label: "V7/" + R, c: mk(letter + 4, r + 7, "7") },
    { id: "vii", role: "副导七和弦", label: "vii°7/" + R, c: mk(letter + 6, r + 11, "°7") },
    { id: "ii", role: "副上主和弦", label: (minor ? "iiø7/" : "ii7/") + R, c: mk(letter + 1, r + 2, minor ? "ø" : "m7") },
    { id: "IV", role: "副下属和弦", label: (minor ? "iv/" : "IV/") + R, c: mk(letter + 3, r + 5, minor ? "m" : "") },
  ];
  return list;
}

// 播放若干和弦（平滑连接 + 低音），onStep 驱动网格上的路线
function playChords(syms, setCur, gap = 1.15) {
  stop(); let prev;
  const steps = syms.map(s => {
    const up = voiceChord(s, { prev, style: "smooth" }); prev = up;
    const root = mod12(parseChord(s).root);
    return { notes: [40 + mod12(root - 40), ...up] };
  });
  sequence(steps, { gap, onStep: i => setCur(i) });
}

const box = { border: "1px solid var(--line)", borderRadius: 12, padding: "8px 10px", background: "var(--paper)", cursor: "pointer", textAlign: "left", font: "inherit" };

export function TempTonic() {
  const [key, setKey] = useState("C");
  const info = keyInfo(key);
  const targets = info.triads.filter(t => t.i !== 0 && !t.sym.endsWith("°"));
  const [ti, setTi] = useState(1);
  const X = info.triads[ti] && !info.triads[ti].sym.endsWith("°") && ti !== 0 ? info.triads[ti] : targets[0];
  const sec = secondaries(X, key);
  const by = id => sec.find(s => s.id === id).c;
  const tonic = info.triads[0], keyV7 = mk(info.letter + 4, info.pc + 7, "7");
  const [path, setPath] = useState(null), [cur, setCur] = useState(-1), [what, setWhat] = useState("");
  const go = (syms, label) => { setPath(syms); setWhat(label); playChords(syms, setCur); };
  const scaleSet = new Set(info.scale);
  const outside = c => c.tones.filter(t => !scaleSet.has(t.pc)).map(t => t.name);
  const XR = romanOf(X.sym, key);
  const ctx = X.i === 4 ? [tonic.sym, by("V7").sym, keyV7.sym, tonic.sym] : [tonic.sym, by("V7").sym, X.sym, keyV7.sym, tonic.sym];
  const actions = [
    { label: `V7/${XR} → ${XR}`, syms: [by("V7").sym, X.sym], note: "副属七和弦解决到临时主和弦：网格上从 X 右边一格的三角形（上方纯五度）落回 X。" },
    { label: `vii°7/${XR} → ${XR}`, syms: [by("vii").sym, X.sym], note: "副导七和弦：根音比 X 低半音（「七级代五」），四个音在网格上围成一个菱形，三个半音一齐向 X 收拢。" },
    { label: `ii–V 替换 → ${XR}`, syms: [by("ii").sym, by("V7").sym, X.sym], note: "二五替换：用 X 调的「2-5-1」代替一个 X——根音沿五度圈连走两步。" },
    { label: `IV–V7 → ${XR}`, syms: [by("IV").sym, by("V7").sym, X.sym], note: "副调里的正格进行：下属 → 属七 → 临时主和弦，是一段「缩小版」的终止。" },
    { label: "放回本调里听", syms: ctx, note: "从主和弦出发，借道副属和弦强调 X，最后仍回到本调主和弦——这就是「离调」：短暂偏离，不喧宾夺主。" },
  ];
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">本调</span>
      {Object.entries(KEYS).map(([k, v]) => <button key={k} className={k === key ? "on" : ""} onClick={() => { stop(); setKey(k); setTi(1); setPath(null); setCur(-1); }}>{v.label}</button>)}
    </div>
    <div className="au-ctrl"><span className="au-lab">临时主和弦 X</span>
      {targets.map(t => <button key={t.i} className={t.i === X.i ? "on" : ""} onClick={() => { stop(); setTi(t.i); setPath(null); setCur(-1); play(voiceChord(t.sym), { arp: 0.04 }); }}>
        {t.name}<small>{t.roman}</small></button>)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8, margin: "8px 0" }}>
      {sec.map(s => {
        const out = outside(s.c), inKey = romanOf(s.c.sym, key);
        return <button key={s.id} style={{ ...box, borderColor: s.id === "V7" || s.id === "vii" ? "var(--accent)" : "var(--line)" }}
          onClick={() => go([s.c.sym, X.sym], `${s.label} → ${XR}`)}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.role}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700 }}>{s.c.name} <small style={{ fontSize: 13, fontWeight: 400 }}>{s.label}</small></div>
          <div style={{ fontSize: 13 }}>{s.c.tones.map((t, k) => <span key={k} style={{ marginRight: 5, color: scaleSet.has(t.pc) ? "var(--ink)" : "var(--accent)", fontWeight: scaleSet.has(t.pc) ? 400 : 700 }}>{t.name}</span>)}</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{out.length ? "调外音 " + out.join(" ") : "全是调内音（无离调感）"} · 本调级数 {inKey}</div>
        </button>;
      })}
    </div>
    <div className="au-ctrl">
      {actions.map((a, k) => <button key={k} className="au-go" onClick={() => go(a.syms, a.label)}>▶ {a.label}</button>)}
      <button onClick={() => { stop(); setCur(-1); }}>■</button>
    </div>
    <Tonnetz cols={11} rows={5} unit={50} center={pcName(info.pc, info.spell)} spell={info.spell} notes={info.scale} compact
      path={path || [by("V7").sym, X.sym]} current={cur} />
    <div className="au-info">
      {path ? <><b>{what}</b>：{path.map(s => pretty(s)).join(" → ")}。{actions.find(a => a.label === what)?.note || "点上方卡片或按钮换一个听。"}</>
        : <>金色交点是 {info.label} 的七个调内音，淡色交点是调外音。选好 X 后，点卡片或按钮听「副调和弦 → X」的解决；
          X = <b>{X.name}</b>（{XR}）的副属和弦是 <b>{by("V").name}</b>/<b>{by("V7").name}</b>，副导七和弦是 <b>{by("vii").name}</b>
          {outside(by("V7")).length ? <>，它们带来的调外音 <b style={{ color: "var(--accent)" }}>{[...new Set([...outside(by("V7")), ...outside(by("vii"))])].join("、")}</b> 正是离调感的来源</> : null}。</>}
    </div>
  </div>;
}

// ---------- 和弦猎头 ----------
const HUNT_TYPES = [
  { t: "", zh: "大三" }, { t: "m", zh: "小三" }, { t: "°", zh: "减三" }, { t: "+", zh: "增三" },
  { t: "7", zh: "属七" }, { t: "Δ", zh: "大七" }, { t: "m7", zh: "小七" }, { t: "ø", zh: "半减七" }, { t: "°7", zh: "减七" }, { t: "mM7", zh: "小大七" },
];
const ROLE = ["根", "三", "五", "七"];
export function ChordHunter({ initial = [3, 0, 7], center = "C" }) {
  const [sel, setSel] = useState(initial), [sev, setSev] = useState(true), [pick, setPick] = useState(null);
  const toggle = pc => { setPick(null); setSel(sel.includes(pc) ? sel.filter(x => x !== pc) : [...sel, pc]); play([60 + pc], { dur: 0.8 }); };
  const found = [];
  if (sel.length) for (const ty of HUNT_TYPES) {
    if (!sev && ty.t.length && !["m", "°", "+"].includes(ty.t)) continue;
    for (let r = 0; r < 12; r++) {
      const ivs = CHORD_TYPES[ty.t], pcs = ivs.map(i => mod12(r + i));
      if (sel.every(p => pcs.includes(p))) found.push({ name: pcName(r, "flat") + ty.t, zh: ty.zh, pcs, roles: sel.map(p => pcName(p, "flat") + "=" + ROLE[pcs.indexOf(p)]), size: ivs.length });
    }
  }
  const tri = found.filter(f => f.size === 3), sv = found.filter(f => f.size === 4);
  const chip = f => <button key={f.name} style={{ ...box, padding: "4px 10px", background: pick === f.name ? "#fbeee9" : "var(--paper)", borderColor: pick === f.name ? "var(--accent)" : "var(--line)" }}
    onClick={() => { setPick(f.name); stop(); play(voiceChord(f.name), { arp: 0.05, dur: 1.8 }); }}>
    <b style={{ fontFamily: "var(--serif)", fontSize: 17 }}>{f.name.replace(/mM7$/, "mΔ7").replace(/Δ$/, "Δ7").replace(/ø$/, "ø7")}</b> <small style={{ color: "var(--muted)" }}>{f.zh} · {f.roles.join(" ")}</small></button>;
  const pickF = found.find(f => f.name === pick);
  const hl = pickF && pickF.size === 3 && ["", "m"].includes(pick.replace(/^[A-G]♭?/, "")) ? [pick] : [];
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">旋律音</span>
      {Array.from({ length: 12 }, (_, pc) => <button key={pc} className={sel.includes(pc) ? "on" : ""} onClick={() => toggle(pc)}>{pcName(pc, "flat")}</button>)}
      <button className={sev ? "on" : ""} onClick={() => setSev(!sev)}>含七和弦</button>
    </div>
    <Tonnetz cols={11} rows={5} unit={48} center={center} notes={sel.length ? sel : undefined} highlight={hl} compact key={hl.join()} />
    <div className="au-info">
      {sel.length === 0 ? "先点几个旋律音。" : <>包含 <b>{sel.map(p => pcName(p, "flat")).join("、")}</b> 的三和弦 {tri.length} 个{sev ? <>、七和弦 {sv.length} 个</> : null}{found.length === 0 ? "——没有一个和弦能全部覆盖，得让某个音当和弦外音。" : "（点一个试听，标注为各音在和弦中的身份）："}</>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>{tri.map(chip)}</div>
      {sev && sv.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>{sv.map(chip)}</div>}
    </div>
  </div>;
}
