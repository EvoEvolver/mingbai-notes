// 第 2 章专属图解：「网格上的大调」
// 在 Tonnetz 横条上框出大调的 1×3 平行四边形；选任意一个大调，四边形沿五度线平移过去。
// 点调内三和弦（或七和弦）听它、看级数/功能组/稳定性/还出现在哪些调；按「性质」或「功能组」着色；一键播放音阶、七个和弦、I–IV–V–I、各功能组。
import { useState } from "react";
import { play, sequence, stop, useAudioState, mod12 } from "@kit/audio";

// 十二个大调按五度排列（与网格横线方向一致：往右多一个升号）
const KEYS = [
  { n: "D♭", pc: 1, f: -5 }, { n: "A♭", pc: 8, f: -4 }, { n: "E♭", pc: 3, f: -3 }, { n: "B♭", pc: 10, f: -2 }, { n: "F", pc: 5, f: -1 },
  { n: "C", pc: 0, f: 0 }, { n: "G", pc: 7, f: 1 }, { n: "D", pc: 2, f: 2 }, { n: "A", pc: 9, f: 3 }, { n: "E", pc: 4, f: 4 },
  { n: "B", pc: 11, f: 5 }, { n: "F♯", pc: 6, f: 6 },
];
const MAJ = [0, 2, 4, 5, 7, 9, 11];
const LET = ["C", "D", "E", "F", "G", "A", "B"], LPC = [0, 2, 4, 5, 7, 9, 11];
const ACC = { 0: "", 1: "♯", 2: "𝄪", 11: "♭", 10: "𝄫" };
// 调内七个音的正确拼写：七个字母各用一次
function spellKey(k) {
  const li = LET.indexOf(k.n[0]);
  return MAJ.map((iv, d) => { const L = LET[(li + d) % 7], diff = mod12(k.pc + iv - LPC[(li + d) % 7]); return L + ACC[diff]; });
}
const SHARPN = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"], FLATN = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

// 七个调内和弦（相对主音所在格点的坐标：i 沿五度横线，j 向上一格 = 大三度）
const CH = [
  { d: 0, rn: "I", sev: "IΔ", q: "", q7: "Δ", fn: ["T"], rank: 1, common: 3, tri: [[0, 0], [1, 0], [0, 1]], s7: [[0, 0], [1, 0], [1, 1], [0, 1]] },
  { d: 1, rn: "ii", sev: "ii7", q: "m", q7: "m7", fn: ["S"], rank: 4, common: 0, tri: [[-1, 0], [-1, 1], [-2, 1]], s7: [[-1, 0], [0, 0], [-1, 1], [-2, 1]] },
  { d: 2, rn: "iii", sev: "iii7", q: "m", q7: "m7", fn: ["T", "D"], rank: 5, common: 2, tri: [[1, 0], [1, 1], [0, 1]], s7: [[1, 0], [2, 0], [1, 1], [0, 1]] },
  { d: 3, rn: "IV", sev: "IVΔ", q: "", q7: "Δ", fn: ["S"], rank: 3, common: 1, tri: [[-1, 0], [0, 0], [-1, 1]], s7: [[-1, 0], [0, 0], [0, 1], [-1, 1]] },
  { d: 4, rn: "V", sev: "V7", q: "", q7: "7", fn: ["D"], rank: 6, common: 1, tri: [[1, 0], [2, 0], [1, 1]], s7: [[3, -1], [2, 0], [1, 1], [1, 0]] },
  { d: 5, rn: "vi", sev: "vi7", q: "m", q7: "m7", fn: ["S", "T"], rank: 2, common: 2, tri: [[0, 0], [0, 1], [-1, 1]], s7: [[0, 0], [1, 0], [0, 1], [-1, 1]] },
  { d: 6, rn: "vii°", sev: "viiø", q: "°", q7: "ø", fn: ["D"], rank: 7, common: 0, tri: [[3, -1], [2, 0], [1, 1]], s7: [[1, 1], [3, 0], [3, -1]] },
];
const FN = { T: { c: "#d49a1c", name: "主功能组 T" }, S: { c: "#3f8f55", name: "下属功能组 S" }, D: { c: "#7a4a9e", name: "属功能组 D" } };
const QNAME = { "": "大三和弦", m: "小三和弦", "°": "减三和弦", "Δ": "大七和弦", m7: "小七和弦", "7": "属七（大小七）和弦", "ø": "半减七和弦" };
// 这个三和弦还出现在哪些大调里（相对根音的主音距离与级数）
const HOMES = { "": [[0, "I"], [7, "IV"], [5, "V"]], m: [[10, "ii"], [8, "iii"], [3, "vi"]], "°": [[1, "vii°"]] };
const keyName = pc => KEYS.find(k => k.pc === mod12(pc)).n;

export default function KeyGrid() {
  useAudioState();
  const [ki, setKi] = useState(5), [mode, setMode] = useState("quality"), [sev, setSev] = useState(false);
  const [sel, setSel] = useState(0), [cur, setCur] = useState(null);
  const key = KEYS[ki], names = spellKey(key), flat = key.f < 0;
  const U = 54, H = U * Math.sqrt(3) / 2, X0 = -7.5, X1 = 9.5;
  const xy = (i, j) => [(i + j / 2) * U, -j * H];
  const nodes = [];
  for (let j = -1; j <= 2; j++) for (let i = Math.ceil(X0 - j / 2); i <= Math.floor(X1 - j / 2); i++) nodes.push({ i, j, pc: mod12(7 * i + 4 * j) });
  const degOf = pc => MAJ.findIndex(iv => mod12(key.pc + iv) === pc);
  const label = pc => { const d = degOf(pc); return d >= 0 ? names[d] : flat ? FLATN[pc] : key.f > 0 ? SHARPN[pc] : SHARPN[pc] + "/" + FLATN[pc]; };
  const tonicMidi = 60 + key.pc - (key.pc > 6 ? 12 : 0);
  const sc = d => tonicMidi + MAJ[d % 7] + 12 * Math.floor(d / 7);
  const chordMidi = (c, seventh = sev) => (seventh ? [0, 2, 4, 6] : [0, 2, 4]).map(k => sc(c.d + k));
  const chordName = (c, seventh = sev) => names[c.d] + (seventh ? c.q7 : c.q);
  const hit = c => { stop(); setSel(c.d); setCur(c.d); play(chordMidi(c), { arp: 0.03, dur: 1.6 }); setTimeout(() => setCur(x => (x === c.d ? null : x)), 1500); };
  const run = (ds, gap = 0.9) => { stop(); sequence(ds.map(d => ({ notes: chordMidi(CH[d]) })), { gap, onStep: i => setCur(i < 0 ? null : ds[i]) }); };
  const scale = () => { stop(); sequence([0, 1, 2, 3, 4, 5, 6, 7].map(d => ({ notes: [sc(d)] })), { gap: 0.36 }); };
  const T = key.f * U;   // 平行四边形随主音平移
  const pts = arr => arr.map(([i, j]) => xy(i, j).join(",")).join(" ");
  const fillOf = c => {
    if (mode === "quality" && sev) return { "Δ": "#d4574a", m7: "#5d82b3", "7": "#5a9e4b", "ø": "#8e5bb5" }[c.q7];
    if (mode === "quality") return c.q === "" ? "#d4574a" : c.q === "m" ? "#5d82b3" : "#e2b33c";
    return c.fn.length > 1 ? `url(#g-${c.fn.join("")})` : FN[c.fn[0]].c;
  };
  const selC = CH[sel];
  const xsAll = nodes.map(n => xy(n.i, n.j)[0]);
  const vb = [Math.min(...xsAll) - 22, -2 * H - 30, Math.max(...xsAll) - Math.min(...xsAll) + 44, 3 * H + 56];
  const groups = [["S", -0.5], ["T", 0.5], ["D", 1.5]];   // 三个功能组的圆心横坐标（相对主音，单位：格）
  return <div className="card kg">
    <div className="au-ctrl">
      <span className="au-lab">选择大调（左右按五度排列）</span>
      {KEYS.map((k, i) => <button key={k.n} className={i === ki ? "on" : ""} onClick={() => { setKi(i); stop(); setCur(null); }}>
        {k.n}<small>{k.f === 0 ? "无升降" : k.f > 0 ? k.f + "♯" : -k.f + "♭"}</small></button>)}
    </div>
    <svg viewBox={vb.join(" ")} style={{ width: "100%", display: "block", userSelect: "none" }}>
      <defs>
        <linearGradient id="g-TD"><stop offset="50%" stopColor={FN.T.c} /><stop offset="50%" stopColor={FN.D.c} /></linearGradient>
        <linearGradient id="g-ST"><stop offset="50%" stopColor={FN.S.c} /><stop offset="50%" stopColor={FN.T.c} /></linearGradient>
      </defs>
      {nodes.flatMap(n => [[1, 0], [0, 1], [-1, 1]].map(([di, dj], k) => {
        const m = nodes.find(q => q.i === n.i + di && q.j === n.j + dj); if (!m) return null;
        const [x1, y1] = xy(n.i, n.j), [x2, y2] = xy(m.i, m.j);
        return <line key={n.i + "," + n.j + k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d6cfc2" strokeDasharray={k ? "4 4" : null} />;
      }))}
      <g style={{ transform: `translateX(${T}px)`, transition: "transform .6s cubic-bezier(.5,0,.3,1)" }}>
        <polygon points={pts([[-1, 0], [2, 0], [1, 1], [-2, 1]])} fill="#00000008" stroke="#6b645a" strokeWidth="2.2" />
        {mode === "function" && groups.map(([g, cx]) => { const x = cx * U, y = -H / 2; return <g key={g}>
          <circle cx={x} cy={y} r={U * 1.02} fill="none" stroke={FN[g].c} strokeWidth="2" opacity=".85" />
          <text x={x} y={y - U * 1.08} textAnchor="middle" fontSize="15" fontWeight="700" fill={FN[g].c}>{g}</text></g>; })}
        {CH.map(c => {
          const on = cur === c.d, isSel = sel === c.d;
          if (sev) return <polygon key={c.d} points={pts(c.s7)} fill={fillOf(c)} opacity={on ? 0.95 : isSel ? 0.75 : 0.18} stroke={isSel ? "#2b2620" : "none"} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => hit(c)} />;
          if (c.q === "°") { const [a, , b] = c.tri.map(([i, j]) => xy(i, j));
            return <line key={c.d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={fillOf(c)} strokeWidth={on || isSel ? 16 : 12} strokeLinecap="round" opacity={on || isSel ? 1 : 0.8} style={{ cursor: "pointer" }} onClick={() => hit(c)} />; }
          return <polygon key={c.d} points={pts(c.tri)} fill={fillOf(c)} opacity={on ? 1 : 0.82} stroke={on || isSel ? "#2b2620" : "#fff"} strokeWidth={on || isSel ? 2.5 : 1} style={{ cursor: "pointer", filter: on ? "brightness(1.15)" : null }} onClick={() => hit(c)} />;
        })}
        {!sev && CH.map(c => { const p = c.q === "°" ? [xy(2.35, 0.25)] : c.tri.map(([i, j]) => xy(i, j));
          const x = p.reduce((s, q) => s + q[0], 0) / p.length, y = p.reduce((s, q) => s + q[1], 0) / p.length;
          return <text key={"t" + c.d} x={x + (c.q === "°" ? 14 : 0)} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={c.q === "°" ? "#6b4a00" : "#fff"} pointerEvents={c.q === "°" ? "auto" : "none"} className={c.q === "°" ? "kg-dim" : null} style={c.q === "°" ? { cursor: "pointer" } : null} onClick={c.q === "°" ? () => hit(c) : null}>{c.rn}</text>; })}
      </g>
      {nodes.map(n => {
        const [x, y] = xy(n.i, n.j), d = degOf(n.pc), lab = label(n.pc), long = lab.length > 2;
        return <g key={n.i + "," + n.j} opacity={d >= 0 ? 1 : 0.4} style={{ cursor: "pointer" }} onClick={() => play([60 + n.pc - (n.pc > 6 ? 12 : 0)], { dur: 1 })}>
          <circle cx={x} cy={y} r={d >= 0 ? 13 : 11} fill={d === 0 ? "#fbe3dc" : "#fffdf8"} stroke={d >= 0 ? "#8f877a" : "#c9c1b3"} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize={long ? 7.5 : 11.5} fontWeight="600" fill="#2b2620" pointerEvents="none">{lab}</text>
          {d >= 0 && <text x={x + 13} y={y + 18} fontSize="10.5" fontWeight="700" fill="#c0392b" pointerEvents="none">{d + 1}</text>}
        </g>;
      })}
    </svg>
    <div className="au-ctrl">
      <button className={mode === "quality" ? "on" : ""} onClick={() => setMode("quality")}>按性质着色<small>{sev ? "大七红 · 小七蓝 · 属七绿 · 半减七紫" : "大红 · 小蓝 · 减黄"}</small></button>
      <button className={mode === "function" ? "on" : ""} onClick={() => setMode("function")}>按功能组着色<small>T 金 · S 绿 · D 紫</small></button>
      <button className={sev ? "on" : ""} onClick={() => setSev(!sev)}>{sev ? "七和弦" : "三和弦"}<small>点击切换</small></button>
    </div>
    <div className="au-ctrl">
      <button className="au-go" onClick={scale}>▶ {key.n} 大调音阶</button>
      <button className="au-go" onClick={() => run([0, 1, 2, 3, 4, 5, 6], 0.8)}>▶ 七个{sev ? "七" : "三"}和弦</button>
      <button className="au-go" onClick={() => run([0, 3, 4, 0], 1)}>▶ I–IV–V–I</button>
      <button onClick={() => run([5, 0, 2])} style={{ borderColor: FN.T.c }}>T 组<small>vi · I · iii</small></button>
      <button onClick={() => run([1, 3, 5])} style={{ borderColor: FN.S.c }}>S 组<small>ii · IV · vi</small></button>
      <button onClick={() => run([2, 4, 6])} style={{ borderColor: FN.D.c }}>D 组<small>iii · V · vii°</small></button>
    </div>
    <div className="au-info">
      <b>{chordName(selC)}</b>（{key.n} 大调的 <b>{sev ? selC.sev : selC.rn}</b>）：{QNAME[sev ? selC.q7 : selC.q]}，组成音 {chordMidi(selC).map((_, k) => names[(selC.d + 2 * k) % 7]).join("–")}。
      功能组：{selC.fn.map(f => <span key={f} style={{ color: FN[f].c, fontWeight: 700 }}>{FN[f].name} </span>)}
      {selC.fn.length > 1 && "（两组兼有）"}；与主和弦共同音 {selC.common} 个；三和弦稳定性排第 {selC.rank} 位（I &gt; vi &gt; IV &gt; ii &gt; iii &gt; V &gt; vii°）。
      {!sev && <> 这个三和弦还出现在：{HOMES[selC.q].map(([off, r]) => <span key={r}>{keyName(key.pc + MAJ[selC.d] + off)} 大调（{r}） </span>)}{selC.q === "°" && "——减三和弦只属于一个大调。"}</>}
    </div>
    <div className="au-hint" style={{ marginTop: 6 }}>灰框是大调的 1×3 平行四边形：下排 4·1·5·2，上排 2·6·3·7；红色小数字是音级。换一个调，四边形沿五度横线平移，调内音与调外音（淡色）随之「洗牌」。黄色线段是减三和弦 vii°，在网格上不是三角形。</div>
  </div>;
}
