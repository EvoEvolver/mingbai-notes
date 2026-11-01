// 第 4 章谱例数据：旋律（含和弦记号）逐小节转写自原书页面图；低音谱表的柱式和弦由和弦记号自动生成。
import { CHORD_TYPES, mod12 } from "@kit/audio";

const NAT = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }, LET = "CDEFGAB";
const KEYACC = { C: {}, G: { F: 1 }, Bb: { B: -1, E: -1 }, F: { B: -1 } };

// midi + 字母 → ABC 音高（不含升降号）；返回 [abc, 升降(-2..2)]
function abcPitch(midi, letter) {
  const acc = (() => { let d = mod12(midi - NAT[letter]); return d > 6 ? d - 12 : d; })();
  const oct = Math.floor((midi - acc) / 12) - 1;
  let s = oct >= 5 ? letter.toLowerCase() + "'".repeat(oct - 5) : letter + ",".repeat(4 - oct);
  return [s, acc];
}
const ACC = { "-2": "__", "-1": "_", 0: "=", 1: "^", 2: "^^" };

// 和弦符号 → 低音谱表上的柱式和弦（根音在 E2–D♯3；上方音放在 F3–E4，七和弦省略五音）
function chordNotes(sym) {
  const m = sym.match(/^([A-G])([#b]?)(.*)$/);
  const rootPc = mod12(NAT[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0)), L = LET.indexOf(m[1]);
  const ivs = CHORD_TYPES[m[3]], letters = [0, 2, 4, 6];
  const out = [{ midi: 40 + mod12(rootPc - 40), letter: m[1] }];
  ivs.forEach((iv, k) => {
    if (ivs.length === 4 && k === 2) return;
    const pc = mod12(rootPc + iv); out.push({ midi: 53 + mod12(pc - 53), letter: LET[(L + letters[k]) % 7] });
  });
  return out.sort((a, b) => a.midi - b.midi);
}
const len = n => (n === 1 ? "" : String(n));
function bassBar(items, keyAcc) {
  const state = {};   // 本小节内已出现的临时记号：pitch → 升降
  return items.map(([sym, n]) => {
    if (sym === "z") return "z" + len(n);
    const ns = chordNotes(sym).map(({ midi, letter }) => {
      const [p, acc] = abcPitch(midi, letter);
      const cur = p in state ? state[p] : keyAcc[letter] || 0;
      state[p] = acc;
      return (acc !== cur ? ACC[acc] : "") + p;
    });
    return "[" + ns.join("") + "]" + len(n);
  }).join(" ");
}

// 生成大谱表 ABC。lines：[{ mel:"旋律正文（一行若干小节，不含行尾小节线）", bars:[[[和弦,时值],…],…], words? }]
export function grand({ key = "C", meter = "4/4", unit = "1/8", tempo = 80, lines, end = "|]" }) {
  const keyAcc = KEYACC[key] || {};
  const head = ["X:1", `M:${meter}`, `L:${unit}`, `Q:1/4=${tempo}`, "%%score {RH | LH}", `K:${key}`];
  const body = lines.flatMap((ln, i) => {
    const last = i === lines.length - 1, bar = last ? end : "|";
    const rh = ["V:RH clef=treble", ln.mel.trim() + " " + bar];
    if (ln.words) rh.push("w: " + ln.words);
    return [...rh, "V:LH clef=bass", ln.bars.map(b => bassBar(b, keyAcc)).join(" | ") + " " + bar];
  });
  return [...head, ...body].join("\n");
}

// 和弦序列（供 Progression）：把 lines 里的和弦按时值展开为 { chords, beats }（beatUnit：多少个 L 单位算一拍）
export function chordsOf(lines, beatUnit) {
  const chords = [], beats = [];
  lines.forEach(ln => ln.bars.forEach(b => b.forEach(([s, n]) => { if (s !== "z") { chords.push(s); beats.push(n / beatUnit); } })));
  return { chords, beats };
}

// ---------- 谱例 4.1 生日快乐（C 大调，3/4）----------
export const HAPPY = [
  { mel: '"C"G G | "Am"A2 "Em"G2 "F#°7"c2 | "G"B4 "Em"G G | "F"A2 "G"G2 "G7"d2 | "C"c4 "Em"G G',
    bars: [[["C", 2]], [["Am", 2], ["Em", 2], ["F#°7", 2]], [["G", 4], ["Em", 2]], [["F", 2], ["G", 2], ["G7", 2]], [["C", 4], ["Em", 2]]],
    words: "祝 你 生 日 快 乐 祝 你 生 日 快 乐 祝 你" },
  { mel: '"C"g2 "Am7"e2 "F#°7"c2 | "G"B2 "F"!fermata!A2 "Fm"f f | "E7"e2 "D7"c2 "G7"d2 | "C"c4',
    bars: [[["C", 2], ["Am7", 2], ["F#°7", 2]], [["G", 2], ["F", 2], ["Fm", 2]], [["E7", 2], ["D7", 2], ["G7", 2]], [["C", 4]]],
    words: "生 日 快 乐 * 祝 你 生 日 快 乐" },
];

// ---------- 谱例 4.2 国际歌（降 B 大调，4/4）----------
export const INTER = [
  { mel: 'd3/2 c/2 | "Bb"B4 F3 D | "Eb"G4 "Cm"E2 c3/2 B/2 | "F"A4 G2 F2 | "Bb"F6 F2',
    bars: [[["z", 2]], [["Bb", 8]], [["Eb", 4], ["Cm", 4]], [["F", 8]], [["Bb", 8]]] },
  { mel: '"Bb"d4 "F"c2 F2 | "Gm"B4 "Dm"A3 A | "Eb"G3 ^F "C7"G2 c2 | "F"c6 d3/2 c/2',
    bars: [[["Bb", 4], ["F", 4]], [["Gm", 4], ["Dm", 4]], [["Eb", 4], ["C7", 4]], [["F", 8]]] },
  { mel: '"Bb"B4 F3 D | "Eb"G4 "Cm"E2 c3/2 B/2 | "F"A4 G2 F2 | "D7"d6 d2',
    bars: [[["Bb", 8]], [["Eb", 4], ["Cm", 4]], [["F", 8]], [["D7", 8]]] },
  { mel: '"G7"f4 e2 d2 | "Cm"(c3 d) e2 z e | "Bb"d3 d "F7"c3 c | "Bb"B6',
    bars: [[["G7", 8]], [["Cm", 8]], [["Bb", 4], ["F7", 4]], [["Bb", 6]]] },
];

// ---------- 谱例 4.3 马赛曲（G 大调，4/4，以十六分音符为单位）----------
export const MARS = [
  { mel: '"G"z2 z D D3 D | "G"G4 G4 "D"A4 A4 | "G"d6 B2 G2 z G B3 G | "C"E4 "Am"c8 "D7"A3 F | "G"G8 z4 G3 A',
    bars: [[["G", 8]], [["G", 8], ["D", 8]], [["G", 16]], [["C", 4], ["Am", 8], ["D7", 4]], [["G", 16]]] },
  { mel: '"G"B4 B4 B4 "C"c3 B | "G"B4 "D"A4 z4 "E"A3 B | "Am"c4 c4 "D7"c4 d3 c | "G"B8 z4 d3 d | "G"d4 B3 G "Bm"d4 B3 G',
    bars: [[["G", 12], ["C", 4]], [["G", 4], ["D", 8], ["E", 4]], [["Am", 8], ["D7", 8]], [["G", 16]], [["G", 8], ["Bm", 8]]] },
  { mel: '"D"D8 z2 z D D3 F | "Am"A8 "D7"c4 A3 F | "G"A4 G4 "F"=F8 | "C"E4 G3 G "Cm"G4 F3 G | "D"A12 z2 A2',
    bars: [[["D", 16]], [["Am", 8], ["D7", 8]], [["G", 8], ["F", 8]], [["C", 8], ["Cm", 8]], [["D", 16]]] },
  { mel: '"Gm"_B6 B2 B2 B2 c2 d2 | "D"A12 "Eb"_B2 A2 | "Cm"G6 G2 "C7"G2 _B2 A2 G2 | "D7"G4 F8 z2 z d',
    bars: [[["Gm", 16]], [["D", 12], ["Eb", 4]], [["Cm", 8], ["C7", 8]], [["D7", 16]]] },
  { mel: '"G"d8- d3 d B3 G | "D"A12 z2 z d | "G"d8- d3 d B3 G | "D"A8- A2 z2 D4 | "G"G8 z4 "D"A4 | "G7"B8 z8',
    bars: [[["G", 16]], [["D", 16]], [["G", 16]], [["D", 16]], [["G", 12], ["D", 4]], [["G7", 16]]] },
  { mel: '"C"c8 "E7"d4 e4 | "Am7"A8- "D7"A2 z2 "F#ø"e4 | "E7"d8- "A7"d3 B "D7"c3 A | "G"!fermata!G12 z4',
    bars: [[["C", 8], ["E7", 8]], [["Am7", 8], ["D7", 4], ["F#ø", 4]], [["E7", 8], ["A7", 4], ["D7", 4]], [["G", 16]]] },
];
