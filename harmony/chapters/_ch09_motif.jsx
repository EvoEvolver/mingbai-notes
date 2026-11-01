// 第 9 章专属图解（一）：
//   MotifLab     「动机变形器」——选一个短动机，一键生成反复 / 增时 / 减时 / 倒影 / 逆行 / 逆行倒影，再叠加调内模进或完全模进，
//                 实时写成 ABC 交给 <Score> 渲染、播放（对应谱例 9.36「动机的各种发展」与 9-2 的变格卡农手法）
//   ParallelLab  「平行副旋律」——给《欢乐颂》在各种音程上做平行模仿（谱例 9.43），听协和度与独立性的此消彼长
import { useState } from "react";
import { Score } from "@kit/audio";

// ---------- 记谱工具：音 = { deg（以 C4 为 0 的自然音级序号）, acc（升降，半音）, d（时值，16 分音符个数）, rest } ----------
const NAT = [0, 2, 4, 5, 7, 9, 11], LET = "CDEFGAB";
const fl = (a, b) => Math.floor(a / b), md = (a, b) => ((a % b) + b) % b;
const natMidi = deg => 60 + 12 * fl(deg, 7) + NAT[md(deg, 7)];
export const midiOf = n => natMidi(n.deg) + n.acc;
// 调号：字母 → 升降
const KEYACC = { C: {}, Cm: { B: -1, E: -1, A: -1 }, D: { F: 1, C: 1 } };
const letterOf = deg => LET[md(deg, 7)];
// 某调内的自然音（按调号）
const inKey = (deg, key) => ({ deg, acc: KEYACC[key][letterOf(deg)] || 0 });
function pitchAbc(deg) {
  const L = letterOf(deg), o = 4 + fl(deg, 7);
  if (o >= 5) return L.toLowerCase() + "'".repeat(o - 5);
  return L + ",".repeat(4 - o);
}
const durAbc = d => (d === 1 ? "" : String(d));
// 把音列写成 ABC 正文；barLen 为每小节 16 分音符数，跨小节的音自动拆开并加连线；临时记号按小节追踪
export function toAbc(notes, { key = "C", barLen = 16, chords } = {}) {
  let pos = 0, out = "", state = {};
  const ka = KEYACC[key];
  for (const n of notes) {
    let left = n.d;
    while (left > 0) {
      const room = barLen - (pos % barLen), d = Math.min(left, room);
      if (pos % barLen === 0 && pos > 0) { out += " | "; state = {}; }
      if (chords && pos % barLen === 0 && chords[pos / barLen]) out += `"${chords[pos / barLen]}"`;
      if (n.rest) out += "z" + durAbc(d);
      else {
        const L = letterOf(n.deg), cur = state[L] ?? ka[L] ?? 0;
        let s = "";
        if (n.acc !== cur) { s = n.acc === 0 ? "=" : n.acc > 0 ? "^".repeat(n.acc) : "_".repeat(-n.acc); state[L] = n.acc; }
        out += s + pitchAbc(n.deg) + durAbc(d) + (left - d > 0 ? "-" : "");
      }
      left -= d; pos += d;
      if (n.rest || d >= 4 || pos % 8 === 0) out += " ";
    }
  }
  const rem = pos % barLen;
  if (rem) out += "z" + durAbc(barLen - rem) + " ";
  return out + "|]";
}

// ---------- 动机 ----------
const mk = (key, spec) => spec.map(([deg, d, rest]) => rest ? { deg: 0, acc: 0, d, rest: true } : { ...inKey(deg, key), d });
const MOTIFS = [
  { id: "book", label: "书中动机", sub: "谱例 9.36", key: "C", meter: "4/4", barLen: 16,
    notes: mk("C", [[11, 2], [10, 2], [9, 2], [8, 2], [7, 8]]),
    note: "G–F–E–D 四个八分音符级进下行，落在二分音符 C 上：一个「下行 + 长音收住」的小句。" },
  { id: "fate", label: "命运动机", sub: "贝多芬 · 谱例 9.1", key: "Cm", meter: "2/4", barLen: 8,
    notes: mk("Cm", [[0, 2, true], [4, 2], [4, 2], [4, 2], [2, 8]]),
    note: "空半拍后三个同音、再下跳三度到长音（原谱有延长记号）。节奏型「短短短—长」比音高更有辨识度。" },
  { id: "tiger", label: "两只老虎", sub: "谱例 9.3 首小节", key: "C", meter: "4/4", barLen: 16,
    notes: mk("C", [[0, 4], [1, 4], [2, 4], [0, 4]]),
    note: "C–D–E–C 四个四分音符：先级进上行，再跳回起点。" },
];

// ---------- 变形 ----------
const BASE = [
  { id: "orig", label: "原形", f: n => n },
  { id: "aug", label: "增时", f: n => n.map(x => ({ ...x, d: x.d * 2 })), note: "所有时值按比例拉长一倍：轮廓不变，变得舒展、庄重（增时卡农用的就是它）。" },
  { id: "dim", label: "减时", f: n => { const h = n.map(x => ({ ...x, d: x.d / 2 })); return [...h, ...h]; }, note: "时值缩短一半，并连做两次填满原来的长度：同样的轮廓，变得急促、紧凑。" },
  { id: "inv", label: "倒影", f: (n, key) => { const ax = n.find(x => !x.rest).deg; return n.map(x => x.rest ? x : inKey(2 * ax - x.deg, key)).map((y, i) => ({ ...y, d: n[i].d, rest: n[i].rest })); },
    note: "以第一个音为轴，上下翻转：原来往下走几级，现在就往上走几级（调内倒影，度数不变、性质随调变化）。" },
  { id: "ret", label: "逆行", f: n => [...n].reverse(), note: "从最后一个音倒着走回第一个音，节奏也一起倒过来——「螃蟹卡农」的做法。" },
  { id: "ri", label: "逆行倒影", f: (n, key) => [...BASE[3].f(n, key)].reverse(), note: "先倒影、再逆行：上下、前后都翻转。" },
];
const DEV = [
  { id: "none", label: "不发展" },
  { id: "rep", label: "反复", note: "原样再来一次：最简单、也最「洗脑」的发展。" },
  { id: "seqd", label: "调内模进 ↓", note: "每次整体下移一个音级，留在 C 大调（或原调）里：音程度数不变，大小随调式自动调整——这就是调内（自然）模进。" },
  { id: "sequ", label: "调内模进 ↑", note: "每次整体上移一个音级，仍然只用调内音。" },
  { id: "real", label: "完全模进 ↑", note: "每次严格上移一个大二度（两个半音），所有音程原样平移：很快就出现调外音（升号、降号），产生离调感——谱例 9.7 第二行正是这样。" },
];
function shiftDia(n, k, key) { return n.map(x => x.rest ? x : { ...inKey(x.deg + k, key), d: x.d }); }
function shiftReal(n, dia, semi) { return n.map(x => { if (x.rest) return x; const deg = x.deg + dia, m = midiOf(x) + semi; return { deg, acc: m - natMidi(deg), d: x.d }; }); }
function develop(n, dev, key) {
  if (dev === "rep") return [...n, ...n];
  if (dev === "seqd") return [0, -1, -2, -3].flatMap(k => shiftDia(n, k, key));
  if (dev === "sequ") return [0, 1, 2, 3].flatMap(k => shiftDia(n, k, key));
  if (dev === "real") return [0, 1, 2].flatMap(k => shiftReal(n, k, 2 * k));
  return n;
}
// 让旋律落在合适的音区（最高音不超过 A5，最低不低于 G3）
function fit(n) {
  const ds = n.filter(x => !x.rest).map(x => x.deg); if (!ds.length) return n;
  let s = 0; const hi = Math.max(...ds), lo = Math.min(...ds);
  if (hi > 12) s = -7; else if (lo < -3) s = 7;
  return s ? n.map(x => x.rest ? x : { ...x, deg: x.deg + s }) : n;
}

export function MotifLab() {
  const [mi, setMi] = useState(0), [b, setB] = useState("orig"), [dv, setDv] = useState("none");
  const M = MOTIFS[mi], B = BASE.find(x => x.id === b), D = DEV.find(x => x.id === dv);
  const notes = fit(develop(B.f(M.notes, M.key), dv, M.key));
  const body = toAbc(notes, { key: M.key, barLen: M.barLen });
  const abc = `X:1\nM:${M.meter}\nL:1/16\nQ:1/4=84\nK:${M.key}\n${body}`;
  const name = [b !== "orig" && B.label, dv !== "none" && D.label].filter(Boolean).join(" + ") || "原形";
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">① 动机</span>
      {MOTIFS.map((m, i) => <button key={m.id} className={i === mi ? "on" : ""} onClick={() => setMi(i)}>{m.label}<small>{m.sub}</small></button>)}
    </div>
    <div className="au-ctrl"><span className="au-lab">② 变形</span>
      {BASE.map(x => <button key={x.id} className={x.id === b ? "on" : ""} onClick={() => setB(x.id)}>{x.label}</button>)}
    </div>
    <div className="au-ctrl"><span className="au-lab">③ 发展</span>
      {DEV.map(x => <button key={x.id} className={x.id === dv ? "on" : ""} onClick={() => setDv(x.id)}>{x.label}</button>)}
    </div>
    <Score abc={abc} caption={`${M.label}：${name}`} />
    <div className="au-info">
      <b>{M.label}</b>：{M.note}
      {b !== "orig" && <><br /><b>{B.label}</b>：{B.note}</>}
      {dv !== "none" && <><br /><b>{D.label}</b>：{D.note}</>}
      {b === "orig" && dv === "none" && <><br />先听原形，再点「变形」与「发展」两排按钮组合：书中谱例 9.36 的「倒影 + 模进」「逆行 + 模进」都能拼出来。</>}
    </div>
  </div>;
}

// ---------- 平行副旋律（谱例 9.43） ----------
const ODE = [[9, 4], [9, 4], [10, 4], [11, 4], [11, 4], [10, 4], [9, 4], [8, 4], [7, 4], [7, 4], [8, 4], [9, 4], [9, 6], [8, 2], [8, 8]];
const PAR = [
  { id: "u", label: "同度", k: 0, v: "同度听起来就是一个声部：像齐唱，副旋律完全没有独立性，只起加强作用。" },
  { id: "o", label: "下方八度", k: -7, v: "八度也几乎融成一个音，声音更厚了，但仍谈不上「两条旋律」。" },
  { id: "5d", label: "下方五度", k: -4, v: "四、五度很协和，比八度丰富一些，却显得空洞单薄，适合营造空灵、古朴的效果。" },
  { id: "4d", label: "下方四度", k: -3, v: "与五度类似：空、透、协和，但不够丰满。" },
  { id: "3d", label: "下方三度", k: -2, v: "三度（以及六度）效果最好：两条线合起来就是省略五音的三和弦，既协和又丰满，又保留一点独立性——伴唱最常用。" },
  { id: "6d", label: "下方六度", k: -5, v: "六度是三度的转位，同样饱满温暖，是伴唱的另一主力。" },
  { id: "3u", label: "上方三度", k: 2, v: "副旋律在主旋律上方时要注意音量、音色，以免盖过主旋律。" },
  { id: "2d", label: "下方二度", k: -1, v: "二度（七度）非常不协和，两条线像各唱各的，听起来像走调。" },
  { id: "tt", label: "三全音（严格）", real: [-4, -6], v: "补充：严格平移增四度/减五度——最不协和、「跑调感」最强。" },
];
export function ParallelLab() {
  const [pi, setPi] = useState(4);
  const P = PAR[pi];
  const mel = ODE.map(([deg, d]) => ({ deg, acc: 0, d }));
  const low = P.real ? mel.map(x => { const deg = x.deg + P.real[0], m = midiOf(x) + P.real[1]; return { deg, acc: m - natMidi(deg), d: x.d }; })
    : mel.map(x => ({ deg: x.deg + P.k, acc: 0, d: x.d }));
  const upper = P.k > 0 ? low : mel, lower = P.k > 0 ? mel : low;
  const abc = `X:1\nM:4/4\nL:1/16\nQ:1/4=96\n%%staves [1 2]\nK:C\nV:1 clef=treble\n${toAbc(upper)}\nV:2 clef=treble\n${toAbc(lower)}`;
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">副旋律与主旋律的距离</span>
      {PAR.map((p, i) => <button key={p.id} className={i === pi ? "on" : ""} onClick={() => setPi(i)}>{p.label}</button>)}
    </div>
    <Score abc={abc} caption={`《欢乐颂》＋${P.label}平行副旋律（${P.k > 0 ? "上行谱表为副旋律" : "下行谱表为副旋律"}）`} />
    <div className="au-info"><b>{P.label}</b>：{P.v}<br />
      <span className="au-hint">顺序正是欣德米特「音序 2」：同度/八度 → 五度/四度 → 三度/六度 → 二度/七度 → 三全音，越往后越不协和，两条线也越「各自独立」。</span></div>
  </div>;
}
