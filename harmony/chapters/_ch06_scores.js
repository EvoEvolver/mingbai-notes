// 第 6 章谱例数据：四部和声大谱表，逐和弦转写自原书页面图（p.177–217）。
// 写法：bars = [[和弦, 和弦…], …]；和弦 = [记号, "低音谱表音 | 高音谱表音", 时值(以 unit 计), 下方标注?]
//   例：["G7", "G2 B3 | F4 D5", 2]  → 低音谱表 G2、B3，高音谱表 F4、D5，二分音符（unit=1/4）。
//   音名用 C4 = 中央 C；升降号写 # / b（"Bb2"、"F#4"）。同一小节内自动补还原号/临时记号。
const NAT = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const KEYSIG = { C: {}, Am: {}, D: { F: 1, C: 1 }, Em: { F: 1 }, G: { F: 1 } };
const ACC = { "-2": "__", "-1": "_", 0: "=", 1: "^", 2: "^^" };

function parse(n) {
  const m = n.match(/^([A-G])(bb|b|##|#)?(-?\d)$/);
  if (!m) throw new Error("bad note " + n);
  const acc = { bb: -2, b: -1, "#": 1, "##": 2 }[m[2]] || 0;
  return { letter: m[1], acc, oct: +m[3] };
}
function abcOf({ letter, oct }) {
  return oct >= 5 ? letter.toLowerCase() + "'".repeat(oct - 5) : letter + ",".repeat(4 - oct);
}
// 一个谱表上的一组音 → ABC（state：本小节已有的临时记号）
function staffToken(notes, dur, state, ks) {
  const len = dur === 1 ? "" : String(dur);
  if (!notes.length) return "z" + len;
  const toks = notes.map(n => {
    const p = parse(n), key = p.letter + p.oct;
    const cur = key in state ? state[key] : (ks[p.letter] || 0);
    let s = abcOf(p);
    if (p.acc !== cur) { s = ACC[p.acc] + s; state[key] = p.acc; }
    return s;
  });
  return (toks.length > 1 ? "[" + toks.join("") + "]" : toks[0]) + len;
}
const q = s => s.replace(/"/g, "'");

// 返回 { abc, bass }（大谱表的高音谱表与低音谱表正文）
export function grand(bars, { key = "C", end = "|]" } = {}) {
  const ks = KEYSIG[key] || {};
  const tr = [], bs = [];
  for (const bar of bars) {
    const st = {}, sb = {}, t = [], b = [];
    for (const [lab, notes, dur, below] of bar) {
      const [lo, hi = []] = notes.split("|").map(x => x.trim().split(/\s+/).filter(Boolean));
      const ann = (lab ? `"${q(lab)}"` : "") + (below ? `"_${q(below)}"` : "");
      t.push(ann + staffToken(hi, dur, st, ks));
      b.push(staffToken(lo, dur, sb, ks));
    }
    tr.push(t.join(" ")); bs.push(b.join(" "));
  }
  return { abc: tr.join(" | ") + " " + end, bass: bs.join(" | ") + " " + end };
}

// 把若干和弦转成 midi 数组（供 Play / 实验台）
export function midis(notes) {
  return notes.replace("|", " ").trim().split(/\s+/).filter(Boolean).map(n => {
    const p = parse(n); return 12 * (p.oct + 1) + NAT[p.letter] + p.acc;
  });
}

// ───────── 6-2 音的排列 ─────────
export const EX63 = grand([
  [["", "C3 C4 | G4 E5", 4, "①开放"]], [["", "C3 | E4 G4 C5", 4, "②密集"]], [["", "C4 | E4 G4 C5", 4, "③偏高"]],
  [["", "C3 E3 G3 | C4", 4, "④低音区密集"]], [["", "C2 E2 G2 | C4", 4, "⑤更低、脱节"]],
]);
export const EX65 = grand([[["Em", "E2 G2 B2 G3 | G4 E5 G5 B5", 4]]], { key: "Em" });
export const EX67 = grand([
  [["G7", "G2 F3 | B3 D4", 4]], [["G7", "G2 B3 | F4 D5", 4]], [["G7", "G2 D4 | F4 B4", 4]], [["G7", "G2 F3 | D4 B4", 4]],
  [["B°7♭3", "B2 F3 | Db4 Ab4", 4]], [["B°7♭3", "B2 Db4 | F4 Ab4", 4]], [["B°7♭3", "B3 Db4 | F4 Ab4", 4]], [["B°7♭3/D♭", "Db3 B3 | Ab4 F5", 4]],
]);
// 谱例 6.8：七音的「时间差」（2/4，unit 1/8）
export const EX68 = {
  abc: `"G7"[DF]4 | "G"[DG]2 "7"[DF]2 | "G"[DG]4 | "G"[DG]2 "7"[Df]2 | "G"[GB]2 "7"[GBf]2 | "G"GBd "7"f |]`,
  bass: `[G,,B,]4 | [G,,B,]4 | [G,,B,]3 "7"[F,,B,] | [G,,B,]4 | [G,,D]2 [G,,B,]2 | [G,,D,]4 |]`,
};
export const EX612 = grand([
  [["C", "C3 C4 | G4 E5", 4, "重复根音"]], [["C", "C3 G3 | G4 E5", 4, "重复五音"]],
  [["G7", "G2 D3 | F4 B4", 4, "完整"]], [["G7no5", "G2 G3 | F4 B4", 4, "省五音、重复根音"]],
]);
export const EX613 = grand([[["A♭7", "Ab2 C4 | F#4 Eb5", 4, "C: Gr+6"]], [["G7no5", "G2 B3 | G4 F5", 4, "V7"]], [["C", "C3 C4 | G4 E5", 4, "I"]]]);

// ───────── 6-3 声部连接 ─────────
export const EX616 = {
  harm: grand([
    [["C", "C3 G3 | E4 C5", 2], ["Am", "A2 A3 | E4 C5", 2]],
    [["F", "F3 A3 | F4 C5", 2], ["C", "C3 G3 | E4 C5", 2]],
    [["G", "G2 G3 | D4 B4", 2], ["C", "C3 G3 | E4 C5", 2]],
  ]),
  mel: grand([
    [["C", "C3 C4 | E4 G4", 2], ["F", "F3 A3 | F4 A4", 2]],
    [["G7", "G2 B3 | F4 D5", 2], ["Am", "A2 A3 | E4 C5", 2]],
    [["E7", "E3 D4 | G#4 B4", 2], ["F", "F3 C4 | F4 A4", 2, "增二度！"]],
  ]),
  third: grand([
    [["C", "C3 C4 | G4 E5", 2], ["G", "G3 D4 | G4 B4", 2]],
    [["C", "C3 G3 | C4 E4", 2], ["F", "F2 F3 | C4 A4", 2]],
    [["G", "G2 B3 | G4 D5", 2], ["C", "C3 E4 | G4 C5", 2]],
  ]),
};
export const EX617 = [
  { title: "四部同向 · 声部交错 · 声部超越", ...grand([
    [["Bø", "B2 A3 | F4 D5", 2], ["C", "C3 C4 | G4 E5", 2]],
    [["G", "G2 B3 | D4 G4", 2], ["Am", "A2 C4 | A3 E4", 2]],
    [["G/D", "D3 G3 | B3 G4", 2], ["C", "C3 C4 | E4 G4", 2]],
  ]) },
  { title: "平行八度 · 平行五度 · 反向八度", ...grand([
    [["G7", "G2 F3 | B3 G4", 2], ["C", "C3 E3 | C4 C5", 2]],
    [["E", "E3 G#3 | B4 E5", 2], ["Am", "A2 A3 | E4 C5", 2]],
    [["F", "F2 C4 | A4 F5", 2], ["C", "C3 C4 | G4 C5", 2]],
  ]) },
  { title: "反向五度 · 隐伏八度 · 隐伏五度", ...grand([
    [["G", "G2 D4 | G4 B4", 2], ["C", "C3 G3 | E4 C5", 2]],
    [["F", "F3 C4 | A4 C5", 2], ["G", "G3 D4 | B4 G5", 2]],
    [["Bø", "B2 F3 | A3 D4", 2], ["C", "C3 E3 | C4 G4", 2]],
  ]) },
];
export const EX618 = grand([
  [["B°7", "B2 Ab3 | F4 D5", 2], ["C", "C3 G3 | E4 C5", 2]],
  [["Dm7", "D3 C4 | F4 D5", 2], ["G7", "G2 B3 | F4 D5", 2]], [["C", "C3 C4 | E4 C5", 4]],
  [["G7", "G2 B3 | F4 D5", 2], ["Bø", "B2 A3 | F4 D5", 2]], [["Am", "A2 A3 | E4 C5", 4]],
  [["FΔ", "F3 A3 | E4 C5", 2], ["G7/B", "B2 G3 | F4 D5", 2]], [["C", "C3 G3 | G4 E5", 4]],
]);
export const EX620 = grand([
  [["F", "F3 C4 | F4 A4", 2], ["Fm", "F3 Ab3 | C4 F4", 2]], [["C", "C3 C4 | E4 G4", 4, "对斜：A（女高）→ A♭（男高）"]],
  [["F", "F3 C4 | F4 A4", 2], ["Fm", "F3 C4 | F4 Ab4", 2]], [["C", "C3 C4 | E4 G4", 4, "纠正：A→A♭ 留在同一声部"]],
]);
export const EX622 = grand([
  [["A♭+6", "Ab2 C4 | Eb4 F#4", 2], ["G", "G2 B3 | D4 G4", 2]],
  [["A♭7", "Ab2 C4 | Eb4 Gb4", 2], ["D♭", "Db3 Db4 | F4 Ab4", 2]],
  [["G♯5♭5/D♭", "Db3 B3 | G4 D#5", 2], ["C", "C3 C4 | G4 E5", 2]],
  [["B°7♭3", "B2 Ab3 | F4 Db5", 2], ["C", "C3 G3 | E4 C5", 2]],
]);
export const EX624 = {
  v7: grand([
    [["G7", "G2 B3 | F4 D5", 2], ["C", "C3 C4 | E4 C5", 2, "省略五音"]],
    [["G7", "G2 B3 | F4 D5", 2], ["C", "C3 G3 | E4 C5", 2, "导音跳进"]],
    [["G7", "G2 B3 | G4 F5", 2], ["C", "C3 C4 | G4 E5", 2, "重复根音"]],
    [["G7/B", "B2 G3 | F4 D5", 2], ["C", "C3 G3 | E4 C5", 2, "第一转位"]],
  ]),
  vii: grand([
    [["Bø", "B2 F3 | D4 A4", 2], ["C", "C3 E3 | C4 G4", 2, "平行五度"]],
    [["Bø", "B2 A3 | F4 D5", 2], ["C", "C3 G3 | E4 C5", 2, "声部交换"]],
    [["Bø", "B2 F3 | D4 A4", 2], ["C", "C3 E3 | E4 G4", 2, "重复三音"]],
    [["B°7", "B2 F3 | D4 Ab4", 2], ["Cm", "C3 Eb3 | Eb4 G4", 2, "重复三音"]],
  ]),
};
export const EX625 = grand([
  [["A♭+6", "Ab3 Eb4 | C5 F#5", 2], ["G", "G3 D4 | B4 G5", 2, "莫扎特五度"]],
  [["A♭+6♭5", "Ab3 D4 | C5 F#5", 2], ["G", "G3 D4 | B4 G5", 2, "改用 Fr+6"]],
  [["A♭+6no5", "Ab3 C4 | C5 F#5", 2], ["G", "G3 D4 | B4 G5", 2, "改用 It+6"]],
  [["A♭+6/E♭", "Eb3 Ab3 | C4 F#4", 2], ["G/D", "D3 G3 | B3 G4", 2, "五度转位成四度"]],
]);

// ───────── 6-4 和弦转位 ─────────
export const EX627 = grand([
  [["C", "C3 G3 | E4 C5", 2, "I"], ["F", "F2 A3 | F4 C5", 2, "IV"]],
  [["C/G", "G2 G3 | E4 C5", 2, "K64"], ["G", "G2 G3 | D4 B4", 2, "V"]],
  [["C", "C3 G3 | E4 C5", 4, "I"]],
]);
export const EX628 = grand([
  [["C", "C2 C3 |", 1], ["Dm7/F", "F2 F3 | D4 A4 C5", 1]],
  [["C/G", "G2 G3 | E4 G4 C5", 1], ["G7", "G1 G2 | D4 F4 B4", 1]],
  [["C", "C2 C3 | C4 E4 G4 C5", 2]],
]);
export const EX631 = {
  triads: grand([
    [["B°", "B3 D4 | F4 B4", 2], ["Am", "A3 C4 | E4 A4", 2]],
    [["G", "G3 B3 | D4 G4", 2], ["F", "F3 A3 | C4 F4", 2]],
    [["Em", "E3 G3 | B3 E4", 2], ["Dm", "D3 F3 | A3 D4", 2]],
    [["C", "C3 E3 | G3 C4", 4]],
  ]),
  sixths: grand([
    [["B°/D", "D3 B3 | F4 B4", 2], ["Am/C", "C3 C4 | E4 A4", 2]],
    [["G/B", "B2 G3 | D4 G4", 2], ["F/A", "A2 A3 | C4 F4", 2]],
    [["Em/G", "G2 E3 | B3 E4", 2], ["Dm/F", "F2 F3 | A3 D4", 2]],
    [["C/E", "E2 C3 | G3 C4", 4]],
  ]),
  outer: grand([
    [["G/B", "B3 | G5", 2], ["F/A", "A3 | F5", 2]],
    [["Em/G", "G3 | E5", 2], ["Dm/F", "F3 | D5", 2]],
    [["C/E", "E3 | C5", 2], ["B°/D", "D3 | B4", 2]],
    [["C", "C3 | C5", 4]],
  ]),
};
export const EX633 = grand([
  [["G7", "G2 B3 | F4 D5", 2], ["C", "C3 C4 | E4 C5", 2]],
  [["G7/B", "B2 G3 | F4 D5", 2], ["C", "C3 G3 | E4 C5", 2]],
  [["G7/D", "D3 G3 | F4 B4", 2], ["C", "C3 G3 | E4 C5", 2]],
  [["G7/F", "F3 B3 | G4 D5", 2], ["C/E", "E3 C4 | G4 C5", 2]],
]);
export const EX634 = {
  root: grand([
    [["C", "C3 C4 | G4 E5", 2], ["G", "G2 B3 | G4 D5", 2]],
    [["Am", "A2 A3 | E4 C5", 2], ["Em", "E2 G3 | E4 B4", 2]],
    [["F", "F2 F3 | C4 A4", 2], ["C", "C2 E3 | C4 G4", 2]],
    [["Dm", "D2 F3 | D4 A4", 2], ["G", "G2 G3 | D4 B4", 2]],
  ]),
  inv: grand([
    [["C", "C3 C4 | G4 E5", 2], ["G/B", "B2 D4 | G4 D5", 2]],
    [["Am", "A2 A3 | E4 C5", 2], ["Em/G", "G2 B3 | E4 B4", 2]],
    [["F", "F2 F3 | C4 A4", 2], ["C/E", "E2 G3 | C4 G4", 2]],
    [["Dm", "D2 F3 | D4 A4", 2], ["G", "G2 G3 | D4 B4", 2]],
  ]),
};
export const EX636 = {
  a: grand([
    [["C", "C3 C4 | G4 E5", 2], ["CΔ/B", "B2 C4 | G4 E5", 2]],
    [["C7/B♭", "Bb2 C4 | G4 E5", 2], ["F/A", "A2 C4 | F4 F5", 2]],
    [["Fm/A♭", "Ab2 C4 | F4 F5", 2], ["C/G", "G2 C4 | G4 E5", 2]],
    [["Dm7/F", "F2 A3 | F4 D5", 2], ["G7", "G2 B3 | F4 D5", 2]],
    [["C", "C3 C4 | E4 C5", 4]],
  ]),
  b: grand([
    [["C", "C3 C4 | G4 E5", 2], ["G/B", "B2 D4 | G4 D5", 2]],
    [["B♭", "Bb2 D4 | F4 D5", 2], ["F7/A", "A2 C4 | F4 Eb5", 2]],
    [["A♭7", "Ab2 C4 | F#4 D#5", 2], ["C/G", "G2 C4 | G4 E5", 2]],
    [["D7/F♯", "F#2 C4 | A4 D5", 2], ["G7/F", "F2 B3 | G4 D5", 2]],
    [["C/E", "E2 C4 | G4 C5", 4]],
  ]),
};
export const EX643 = {
  root: grand([
    [["F♯7", "F#3 C#4 | A#4 E5", 2], ["B7", "B2 B3 | A4 D#5", 2]],
    [["E7", "E3 B3 | G#4 D5", 2], ["A7", "A2 A3 | G4 C#5", 2]],
    [["D7", "D3 A3 | F#4 C5", 2], ["G7", "G2 G3 | F4 B4", 2]],
    [["C7", "C3 G3 | E4 Bb4", 4]],
  ]),
  inv: grand([
    [["F♯7", "F#3 C#4 | A#4 E5", 2], ["B7/F♯", "F#3 B3 | A4 D#5", 2]],
    [["E7", "E3 B3 | G#4 D5", 2], ["A7/E", "E3 A3 | G4 C#5", 2]],
    [["D7", "D3 A3 | F#4 C5", 2], ["G7/D", "D3 G3 | F4 B4", 2]],
    [["C7", "C3 G3 | E4 Bb4", 4]],
  ]),
};

// 谱例 6.29：贝多芬《欢乐颂》（D 大调）旋律 + 原书和弦记号（unit 1/8）
export const ODE = `"D"F2 F2 G2 A2 | "A"A2 G2 F2 E2 | "D/A"D2 D2 E2 F2 | "D/A"F3 E "A"E4 |
"D"F2 F2 G2 A2 | "A"A2 G2 F2 E2 | "D/A"D2 D2 E2 F2 | "A7"E3 D "D"D4 |
"A"E2 E2 "D/A"F2 D2 | "A"E2 FG "D"F2 D2 | "A"E2 FG "F#7/A#"F2 E2 | "Bm"D2 "E"E2 "A"A,2 "D/A"F2- |
"D"F2 F2 G2 A2 | "A"A2 G2 F2 E2 | "D/F#"D2 D2 "D/A"E2 F2 | "A7"E3 D "D"D4 |]`;

// 谱例 6.46：《生日快乐》改编（四声部，3/4，unit 1/8）
export const HB46 = `X:1
M:3/4
L:1/8
Q:1/4=96
%%score {(S A) | (T B)}
K:C
V:S clef=treble
"C"G G | "Am/C"A2 "Em/B"G2 "F#°7/A"c2 | "G"B4 "C/G"G G | "F/A"A2 "G7/B"G2 "G7"d2 | "C"c4 "C/E"G G |
"Em"g2 "Am7/E"e2 "F#°7/Eb"c2 | "G/D"B2 "F/C"!fermata!A2 "Fm"f f | "E7/B"e2 "D7"c2 "G7"d2 | "C"c4 |]
V:A clef=treble
E2 | E2 E2 _E2 | D4 C2 | C2 D2 F2 | E4 E2 |
B2 G2 ^F2 | G2 F2 _A2 | ^G2 ^F2 =F2 | E4 |]
V:T clef=bass
C2 | A,2 G,2 ^F,2 | G,4 E,2 | F,2 F,2 G,2 | G,4 C2 |
B,2 C2 A,2 | G,2 A,2 C2 | D2 C2 B,2 | C4 |]
V:B clef=bass
C,2 | C,2 B,,2 A,,2 | G,,4 G,,2 | A,,2 B,,2 G,,2 | C,4 E,2 |
E,2 E,2 _E,2 | D,2 C,2 C,2 | B,,2 D,2 G,,2 | C,4 |]`;

// 谱例 6.1：《生日快乐》原始的柱式和弦（对照用，unit 1/8；和弦依谱例 4.1）
export const HB61 = `X:1
M:3/4
L:1/8
Q:1/4=96
%%score {RH | LH}
K:C
V:RH clef=treble
"C"G G | "Am"A2 "Em"G2 "F#°7"c2 | "G"B4 "Em"G G | "F"A2 "G"G2 "G7"d2 | "C"c4 "Em"G G |
"C"g2 "Am7"e2 "F#°7"c2 | "G"B2 "F"!fermata!A2 "Fm"f f | "E7"e2 "D7"c2 "G7"d2 | "C"c4 |]
V:LH clef=bass
[C,E,G,]2 | [A,,C,E,]2 [E,G,B,]2 [^F,A,C_E]2 | [G,B,D]4 [E,G,B,]2 | [F,A,C]2 [G,B,D]2 [G,B,DF]2 | [C,E,G,]4 [E,G,B,]2 |
[C,E,G,]2 [A,,C,E,G,]2 [^F,A,C_E]2 | [G,B,D]2 [F,A,C]2 [F,_A,C]2 | [E,^G,B,D]2 [D,^F,A,C]2 [G,B,DF]2 | [C,E,G,]4 |]`;
