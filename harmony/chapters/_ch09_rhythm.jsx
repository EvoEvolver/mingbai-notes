// 第 9 章图解（三）：节拍与律动实验台——拍层强弱（谱例 9.47–9.49）、5/4 拍、附加节奏 3+3+2（谱例 9.62）、
// 摇摆节奏的不均等划分（谱例 9.60）、复节奏二对三 / 三对四（赫米奥拉、《幻想即兴曲》）。用纯音「敲击」循环播放，强弱 = 音量 + 音高。
import { useEffect, useState } from "react";
import { play, stop, later, onStop } from "@kit/audio";

// 强弱等级 4 最强 … 1 最弱。steps：每个循环的细分格数；rows：[{label, hits:[[格, 强弱]]}]
const lv = (arr) => arr.map((w, i) => [i, w]);
const PATS = [
  { id: "24", label: "2/4", sub: "单二拍子", steps: 4, beat: 2, rows: [{ label: "八分音符", hits: lv([4, 1, 2, 1]) }],
    count: ["1", "&", "2", "&"], note: "强—弱。每拍再二等分，前一半强、后一半弱。与步伐相合，有行进感，常用于进行曲。" },
  { id: "34", label: "3/4", sub: "单三拍子", steps: 6, beat: 2, rows: [{ label: "八分音符", hits: lv([4, 1, 2, 1, 2, 1]) }],
    count: ["1", "&", "2", "&", "3", "&"], note: "强—弱—弱，三个「二等分」的拍：圆舞曲、华尔兹的拍子，轻巧优雅。" },
  { id: "44", label: "4/4", sub: "单四拍子", steps: 8, beat: 2, rows: [{ label: "八分音符", hits: lv([4, 1, 2, 1, 3, 1, 2, 1]) }],
    count: ["1", "&", "2", "&", "3", "&", "4", "&"], note: "两个「大拍」再各分两拍：强—弱—次强—弱。第三拍比第一拍弱、比二四拍强。再细分八个八分音符，就是做操时的「一二三四五六七八」：1 最强，5 次之，3、7 再次。" },
  { id: "68", label: "6/8", sub: "复二拍子", steps: 6, beat: 3, rows: [{ label: "八分音符", hits: lv([4, 1, 1, 3, 1, 1]) }],
    count: ["1", "2", "3", "4", "5", "6"], note: "看似六拍，真正的一拍是附点四分音符：两大拍、每拍三等分，强—弱—弱—次强—弱—弱。和 3/4 小节一样长，律动却是「3+3」而不是「2+2+2」——对比上一个按钮听听。" },
  { id: "54", label: "5/4 = 3+2", sub: "《小白菜》", steps: 5, beat: 1, rows: [{ label: "四分音符", hits: lv([4, 1, 1, 3, 1]) }],
    count: ["1", "2", "3", "4", "5"], note: "五拍子常可拆成常用拍子的组合（合成节拍）：《小白菜》每句三个字加两拍衬词，就是 3/4 + 2/4：强、弱、弱、次强、弱。" },
  { id: "332", label: "3+3+2", sub: "附加节奏", steps: 8, beat: 2, rows: [{ label: "八分音符", hits: lv([4, 1, 1, 3, 1, 1, 3, 1]) }],
    count: ["1", "2", "3", "1", "2", "3", "1", "2"], note: "同样八个八分音符，按 3+3+2 重新分组：重音落在 1、4、7 的位置，听起来更像 3/8+3/8+2/8——拉美、非洲节奏的常见做法。" },
  { id: "hem", label: "二对三", sub: "赫米奥拉", steps: 6, beat: 6, rows: [{ label: "上声部 · 3", hits: [[0, 4], [2, 2], [4, 2]] }, { label: "下声部 · 2", hits: [[0, 4], [3, 3]] }],
    count: ["1", "", "", "", "", ""], note: "一个声部走两拍的时间里，另一个声部走三拍：两条律动交错，只在小节开头重合。" },
  { id: "34p", label: "三对四", sub: "《幻想即兴曲》", steps: 12, beat: 12, rows: [{ label: "右手 · 4", hits: [[0, 4], [3, 2], [6, 3], [9, 2]] }, { label: "左手 · 3", hits: [[0, 4], [4, 2], [8, 2]] }],
    count: ["1"], note: "肖邦《幻想即兴曲》：右手八个十六分音符对左手六连音，每拍形成 4 对 3 的交错节奏——「左手画圆、右手画方」。" },
];
const SWING = [
  { id: "st", label: "Straight 1:1", r: 0.5 },
  { id: "55", label: "55 : 45", r: 0.55 },
  { id: "21", label: "2 : 1（三连音式）", r: 2 / 3 },
  { id: "31", label: "3 : 1", r: 0.75 },
];
const PITCH = [[84, 76], [64, 52]];   // 每行：[强音高, 弱音高]

export function RhythmLab() {
  const [pi, setPi] = useState(2), [mode, setMode] = useState("meter"), [sw, setSw] = useState(0), [back, setBack] = useState(false);
  const [cur, setCur] = useState(null), [playing, setPlaying] = useState(false);
  useEffect(() => onStop(() => { setPlaying(false); setCur(null); }), []);
  const P = mode === "swing"
    ? { steps: 8, beat: 2, rows: [{ label: "八分音符", hits: lv([4, 1, 2, 1, 3, 1, 2, 1]) }], count: ["1", "&", "2", "&", "3", "&", "4", "&"] }
    : PATS[pi];
  const ratio = SWING[sw].r;
  // 第 k 格的时间位置（以「拍」为单位）：摇摆时把每拍的两个八分音符按 ratio 分配
  const at = k => mode === "swing" ? Math.floor(k / 2) + (k % 2 ? ratio : 0) : k / P.beat;
  const beats = mode === "swing" ? 4 : P.steps / P.beat;
  const spb = mode === "swing" ? 0.55 : P.id === "34p" ? 1.1 : P.id === "hem" ? 1.6 : P.id === "54" ? 0.5 : 0.55;
  const vel = (w, k) => mode === "swing" && back ? (k % 2 ? 0.85 : 0.4) : [0, 0.32, 0.5, 0.72, 0.95][w];
  const go = () => {
    if (playing) { stop(); return; }
    stop(); const reps = 4, cyc = beats * spb;
    for (let r = 0; r < reps; r++) P.rows.forEach((row, ri) => row.hits.forEach(([k, w]) => {
      const t = r * cyc + at(k) * spb + 0.05;
      play([w >= 3 ? PITCH[ri][0] : PITCH[ri][1]], { at: t, dur: 0.12, velocity: vel(w, k), timbre: "sine" });
      if (ri === 0) later(() => setCur(k), t * 1000);
    }));
    setPlaying(true);
    later(() => { setPlaying(false); setCur(null); }, reps * cyc * 1000 + 300);
  };
  const W = 640, L = 92, rowH = 46, H = 70 + P.rows.length * rowH;
  const X = k => L + (at(k) / beats) * (W - L - 20);
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">节拍</span>
      {PATS.map((p, i) => <button key={p.id} className={mode === "meter" && i === pi ? "on" : ""} onClick={() => { stop(); setMode("meter"); setPi(i); }}>{p.label}<small>{p.sub}</small></button>)}
    </div>
    <div className="au-ctrl"><span className="au-lab">摇摆</span>
      {SWING.map((s, i) => <button key={s.id} className={mode === "swing" && i === sw ? "on" : ""} onClick={() => { stop(); setMode("swing"); setSw(i); }}>{s.label}</button>)}
      <button className={back ? "on" : ""} disabled={mode !== "swing"} onClick={() => setBack(!back)}>前轻后重</button>
      <button className="au-go" onClick={go}>{playing ? "■ 停止" : "▶ 循环 4 遍"}</button>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {Array.from({ length: beats + 1 }, (_, b) => <line key={b} x1={L + b / beats * (W - L - 20)} x2={L + b / beats * (W - L - 20)} y1={4} y2={H - 4} stroke="var(--line)" strokeDasharray={b % beats ? "3 3" : "none"} />)}
      {P.rows.map((row, ri) => <g key={ri}>
        <text x={4} y={60 + ri * rowH + 4} fontSize="12" fill="var(--muted)">{row.label}</text>
        {row.hits.map(([k, w]) => {
          const h = (mode === "swing" && back ? (k % 2 ? 4 : 1.5) : w) * 9, x = X(k), y0 = 60 + ri * rowH;
          const on = ri === 0 && cur === k;
          return <g key={k}>
            {ri === 0 && <rect x={x - 9} y={46 - h} width={18} height={h} rx={3} fill={on ? "var(--accent)" : "#d9c9a8"} />}
            <circle cx={x} cy={y0} r={4 + w * 2} fill={on ? "var(--accent)" : ri ? "#2c6e9e" : "#9b2c1f"} opacity={0.35 + w * 0.15} />
            {ri === 0 && P.count[k] !== undefined && <text x={x} y={y0 + 4} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">{P.count[k]}</text>}
          </g>;
        })}
      </g>)}
    </svg>
    <div className="au-info">
      {mode === "swing"
        ? <><b>摇摆（Swing）{SWING[sw].label}</b>：把每拍的两个八分音符「前长后短」地不均等划分，速度本身不变。{ratio === 0.5 ? "现在是均等的 Straight eighth，作对照。" : `前一个音占一拍的 ${Math.round(ratio * 100)}%。`}
          {back ? "「前轻后重」：把重音放到后半拍，现代爵士更常这样处理。" : "可以打开「前轻后重」再听。"}</>
        : <><b>{P.label}</b>：{P.note}</>}
      <div className="au-hint" style={{ marginTop: 4 }}>柱高 = 逻辑强弱（各拍层强弱叠加的结果）；播放时强拍音更高、更响。</div>
    </div>
  </div>;
}
